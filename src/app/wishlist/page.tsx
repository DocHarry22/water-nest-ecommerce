"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ShoppingCart,
  X,
  Star,
  Sparkles
} from "lucide-react";

// Mock wishlist items
const initialWishlistItems = [
  {
    id: "1",
    name: "Industrial Ice Machine 500kg/day",
    category: "Specialized Equipment",
    price: 45000,
    originalPrice: 52000,
    image: "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=400&q=80",
    inStock: true,
    rating: 4.8,
    reviews: 24,
    sku: "ICE-IND-500"
  },
  {
    id: "2",
    name: "Compact Portable Treatment Plant",
    category: "Portable Treatment Plants",
    price: 125000,
    originalPrice: 125000,
    image: "https://images.unsplash.com/photo-1581092918484-8313e1f6d145?w=400&q=80",
    inStock: true,
    rating: 5.0,
    reviews: 12,
    sku: "PORT-COMP-100"
  },
  {
    id: "3",
    name: "Whole House Filtration System",
    category: "Water Filtration Systems",
    price: 8500,
    originalPrice: 9200,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80",
    inStock: false,
    rating: 4.6,
    reviews: 45,
    sku: "FILT-WH-003"
  },
  {
    id: "4",
    name: "Professional Water Testing Kit",
    category: "Testing & Maintenance",
    price: 1850,
    originalPrice: 2100,
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=400&q=80",
    inStock: true,
    rating: 4.7,
    reviews: 67,
    sku: "TEST-PRO-015"
  }
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (id: string) => {
    // Mock add to cart - In production, this would update cart state
    alert(`Added ${wishlistItems.find(item => item.id === id)?.name} to cart`);
  };

  const addAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock);
    alert(`Added ${inStockItems.length} items to cart`);
  };

  const clearWishlist = () => {
    if (confirm("Are you sure you want to clear your entire wishlist?")) {
      setWishlistItems([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Heart className="h-8 w-8 text-red-600 fill-red-600" />
                My Wishlist
              </h1>
              <p className="text-gray-600">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>

            {wishlistItems.length > 0 && (
              <div className="flex gap-2">
                <Button
                  onClick={addAllToCart}
                  className="bg-sky-600 hover:bg-sky-700"
                  disabled={wishlistItems.filter(item => item.inStock).length === 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add All to Cart
                </Button>
                <Button
                  onClick={clearWishlist}
                  variant="outline"
                  className="border-2 border-red-600 text-red-600 hover:bg-red-50"
                >
                  Clear Wishlist
                </Button>
              </div>
            )}
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          // Empty Wishlist
          <Card className="text-center py-16">
            <CardContent>
              <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">Save products you love for later!</p>
              <Link href="/products">
                <Button size="lg" className="bg-sky-600 hover:bg-sky-700">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Discover Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          // Wishlist Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden hover:shadow-xl transition-all border-2 hover:border-sky-300 relative">
                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 z-10 h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-lg rounded-full"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </Button>

                {/* Product Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-2">
                    {item.originalPrice > item.price && (
                      <Badge className="bg-red-600 text-white">
                        Save R{(item.originalPrice - item.price).toFixed(0)}
                      </Badge>
                    )}
                    {!item.inStock && (
                      <Badge className="bg-gray-800 text-white">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-4">
                  {/* Category */}
                  <p className="text-xs text-gray-500 mb-1">{item.category}</p>

                  {/* Product Name */}
                  <Link href={`/products/${item.sku.toLowerCase()}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-sky-600 transition-colors">
                      {item.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(item.rating)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      {item.rating} ({item.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    {item.originalPrice > item.price && (
                      <p className="text-xs text-gray-500 line-through">
                        R{item.originalPrice.toFixed(2)}
                      </p>
                    )}
                    <p className="text-xl font-bold text-gray-900">
                      R{item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => addToCart(item.id)}
                      disabled={!item.inStock}
                      className="flex-1 bg-sky-600 hover:bg-sky-700 disabled:bg-gray-300"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {item.inStock ? 'Add to Cart' : 'Unavailable'}
                    </Button>
                  </div>

                  {/* SKU */}
                  <p className="text-xs text-gray-400 mt-2">SKU: {item.sku}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {wishlistItems.length > 0 && (
          <div className="mt-12">
            <Card className="bg-linear-to-r from-sky-50 to-cyan-50 border-2 border-sky-200">
              <CardContent className="py-8 text-center">
                <Sparkles className="h-12 w-12 text-sky-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Ready to complete your collection?
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Explore more water treatment solutions and specialized equipment tailored to your needs
                </p>
                <Link href="/products">
                  <Button size="lg" className="bg-sky-600 hover:bg-sky-700">
                    Browse All Products
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
