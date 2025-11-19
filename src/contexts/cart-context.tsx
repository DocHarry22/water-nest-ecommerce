"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
    stock: number;
    sku?: string | null;
  };
}

interface Cart {
  id: string;
  items: CartItem[];
}

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from API when user is logged in
  useEffect(() => {
    if (status === "authenticated") {
      loadCart();
    } else if (status === "unauthenticated") {
      // Load from localStorage for guests
      const savedCart = localStorage.getItem("guest-cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, [status]);

  const loadCart = async () => {
    try {
      const response = await fetch("/api/cart");
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    setIsLoading(true);
    
    try {
      if (session?.user) {
        // Add to database cart
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, quantity }),
        });

        if (response.ok) {
          const responseData = await response.json();
          setCart(responseData);
        } else {
          const responseData = await response.json();
          throw new Error(responseData.error || "Failed to add to cart");
        }
      } else {
        // Add to guest cart (localStorage) - optimized
        const guestCart = localStorage.getItem("guest-cart");
        const currentCart: Cart = guestCart 
          ? JSON.parse(guestCart) 
          : { id: "guest", items: [] };

        const existingItemIndex = currentCart.items.findIndex(
          item => item.productId === productId
        );

        if (existingItemIndex > -1) {
          // Just update quantity, no need to fetch product again
          currentCart.items[existingItemIndex].quantity += quantity;
          localStorage.setItem("guest-cart", JSON.stringify(currentCart));
          setCart(currentCart);
        } else {
          // Only fetch product details for new items
          const productResponse = await fetch(`/api/products/${productId}`);
          
          if (productResponse.ok) {
            const product = await productResponse.json();
            currentCart.items.push({
              id: `guest-${Date.now()}`,
              productId,
              quantity,
              product,
            });
            localStorage.setItem("guest-cart", JSON.stringify(currentCart));
            setCart(currentCart);
          } else {
            throw new Error("Failed to fetch product");
          }
        }
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    setIsLoading(true);
    try {
      if (session?.user) {
        const response = await fetch(`/api/cart?itemId=${itemId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          await loadCart();
        }
      } else {
        const guestCart = localStorage.getItem("guest-cart");
        if (guestCart) {
          const currentCart: Cart = JSON.parse(guestCart);
          currentCart.items = currentCart.items.filter(item => item.id !== itemId);
          localStorage.setItem("guest-cart", JSON.stringify(currentCart));
          setCart(currentCart);
        }
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }

    setIsLoading(true);
    try {
      if (session?.user) {
        // Update in database
        const item = cart?.items.find(i => i.id === itemId);
        if (item) {
          await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              productId: item.productId, 
              quantity: quantity - item.quantity 
            }),
          });
          await loadCart();
        }
      } else {
        // Update in localStorage
        const guestCart = localStorage.getItem("guest-cart");
        if (guestCart) {
          const currentCart: Cart = JSON.parse(guestCart);
          const itemIndex = currentCart.items.findIndex(item => item.id === itemId);
          if (itemIndex > -1) {
            currentCart.items[itemIndex].quantity = quantity;
            localStorage.setItem("guest-cart", JSON.stringify(currentCart));
            setCart(currentCart);
          }
        }
      }
    } catch (error) {
      console.error("Update quantity error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      if (session?.user) {
        await fetch("/api/cart", { method: "DELETE" });
      } else {
        localStorage.removeItem("guest-cart");
      }
      setCart(null);
    } catch (error) {
      console.error("Clear cart error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const total = cart?.items.reduce((sum, item) => 
    sum + (item.product.price * item.quantity), 0
  ) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
