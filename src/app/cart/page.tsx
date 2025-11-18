"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/cart-context";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Heart,
  ArrowRight,
  Tag,
  Truck,
  Shield,
  AlertCircle,
  X,
  Loader2
} from "lucide-react";

export default function CartPage() {
  const { cart, isLoading, updateQuantity: updateCartQuantity, removeFromCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const cartItems = cart?.items || [];

  const handleUpdateQuantity = async (itemId: string, change: number) => {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
      const newQuantity = Math.max(1, Math.min(item.product.stock, item.quantity + change));
      await updateCartQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (confirm("Remove this item from your cart?")) {
      await removeFromCart(itemId);
    }
  };

  const applyCoupon = () => {
    // Mock coupon validation
    if (couponCode.toUpperCase() === "WATER10") {
      setAppliedCoupon({ code: "WATER10", discount: 10 });
    } else if (couponCode.toUpperCase() === "NEST20") {
      setAppliedCoupon({ code: "NEST20", discount: 20 });
    } else {
      alert("Invalid coupon code");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const savings = 0; // Calculate from compareAtPrice if added to schema
  const couponDiscount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const shipping = subtotal > 5000 ? 0 : 250;
  const tax = (subtotal - couponDiscount) * 0.15; // 15% VAT
  const total = subtotal - couponDiscount + shipping + tax;

  if (isLoading && cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-sky-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some products to get started!</p>
              <Link href="/products">
                <Button size="lg" className="bg-sky-600 hover:bg-sky-700">
                  Browse Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Free Shipping Banner */}
              {subtotal < 5000 && (
                <Card className="bg-sky-50 border-sky-200">
                  <CardContent className="py-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="h-5 w-5 text-sky-600" />
                      <span className="text-gray-700">
                        Add <strong className="text-sky-700">R{(5000 - subtotal).toFixed(2)}</strong> more for FREE shipping
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-sky-200 rounded-full h-2">
                      <div
                        className="bg-sky-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((subtotal / 5000) * 100, 100)}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Cart Items List */}
              {cartItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.product.images[0] || '/images/placeholder.jpg'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Link href={`/products/${item.product.slug}`}>
                              <h3 className="font-semibold text-gray-900 hover:text-sky-600 transition-colors">
                                {item.product.name}
                              </h3>
                            </Link>
                            {item.product.sku && (
                              <p className="text-xs text-gray-500">SKU: {item.product.sku}</p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            disabled={isLoading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              disabled={item.quantity <= 1 || isLoading}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const newQty = parseInt(e.target.value) || 1;
                                updateCartQuantity(item.id, newQty);
                              }}
                              className="w-16 text-center h-8"
                              min={1}
                              max={item.product.stock}
                              disabled={isLoading}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              disabled={item.quantity >= item.product.stock || isLoading}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              R{(item.product.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">
                              R{item.product.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>

                        {/* Stock Warning */}
                        {item.product.stock < 5 && (
                          <div className="mt-2 flex items-center gap-1 text-xs text-amber-700">
                            <AlertCircle className="h-3 w-3" />
                            Only {item.product.stock} left in stock
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Continue Shopping */}
              <Link href="/products">
                <Button variant="outline" className="w-full border-2">
                  ← Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-4">
                {/* Summary Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Coupon Code */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        Have a coupon code?
                      </label>
                      {appliedCoupon ? (
                        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <Tag className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700 flex-1">
                            {appliedCoupon.code} ({appliedCoupon.discount}% off)
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={removeCoupon}
                            className="h-6 w-6 p-0 text-green-700 hover:text-green-900"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="Enter code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            onClick={applyCoupon}
                            variant="outline"
                            disabled={!couponCode}
                          >
                            Apply
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium text-gray-900">R{subtotal.toFixed(2)}</span>
                      </div>

                      {savings > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600">You save</span>
                          <span className="font-medium text-green-600">-R{savings.toFixed(2)}</span>
                        </div>
                      )}

                      {appliedCoupon && (
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600">Coupon discount</span>
                          <span className="font-medium text-green-600">-R{couponDiscount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium text-gray-900">
                          {shipping === 0 ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            `R${shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">VAT (15%)</span>
                        <span className="font-medium text-gray-900">R{tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-sky-600">R{total.toFixed(2)}</span>
                      </div>

                      <Link href="/checkout">
                        <Button size="lg" className="w-full bg-sky-600 hover:bg-sky-700">
                          Proceed to Checkout
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="pt-4 border-t space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Shield className="h-4 w-4 text-green-600" />
                        Secure Checkout
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Truck className="h-4 w-4 text-blue-600" />
                        Free shipping on orders over R5,000
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Heart className="h-4 w-4 text-red-600" />
                        2-year warranty on all products
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Accepted Payment Methods */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Accepted Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['Visa', 'Mastercard', 'EFT', 'PayPal', 'SnapScan'].map((method) => (
                        <Badge key={method} variant="outline" className="text-xs">
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
