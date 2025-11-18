"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";
import {
  ArrowRight,
  ShoppingBag,
  Star,
  ThumbsUp,
  Zap
} from "lucide-react";

const featuredProducts = [
  { 
    id: "2",
    name: "Portable Treatment Plant", 
    desc: "Mobile water purification - ideal for events, construction sites & emergencies", 
    price: "R24,999", 
    oldPrice: "R32,999", 
    saving: "Save R8,000" 
  },
  { 
    id: "3",
    name: "Industrial Water Softener", 
    desc: "High-capacity resin softener - removes hardness for commercial use", 
    price: "R15,499", 
    oldPrice: "R19,999", 
    saving: "Save R4,500" 
  },
  { 
    id: "1",
    name: "6-Stage RO System", 
    desc: "Reverse osmosis with UV sterilization - perfect for homes", 
    price: "R4,999", 
    oldPrice: "R6,999", 
    saving: "Save R2,000" 
  }
];

export function FeaturedProducts() {
  const router = useRouter();
  const { addToCart, isLoading } = useCart();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const handleAddToCart = async (productId: string, productName: string) => {
    setAddingToCart(productId);
    try {
      await addToCart(productId, 1);
      toast.success(`${productName} added to cart!`, {
        action: {
          label: "View Cart",
          onClick: () => router.push("/cart"),
        },
      });
    } catch (error) {
      toast.error("Failed to add to cart", {
        description: "Please try again",
      });
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12 lg:mb-16">
          <div>
            <Badge className="mb-3 bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200 transition-colors">
              <Zap className="h-3 w-3 mr-1 inline" />
              Hot Sellers
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              Lekker Deals on <span className="text-sky-600">Water Tech</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Top-quality purification systems that won&apos;t break the bank
            </p>
          </div>
          <Link href="/products" className="group">
            <Button variant="outline" size="lg" className="border-2 border-sky-600 text-sky-700 hover:bg-sky-50 hover:border-sky-700 transition-all">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-sky-200 cursor-pointer transform hover:-translate-y-2">
              <div className="relative h-56 md:h-64 overflow-hidden bg-linear-to-br from-sky-100 to-cyan-100">
                <Image
                  src={`https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80`}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <Badge className="absolute top-4 right-4 bg-green-600 text-white border-0 shadow-lg" variant="success">
                  <ThumbsUp className="h-3 w-3 mr-1 inline" />
                  In Stock
                </Badge>
                <Badge className="absolute top-4 left-4 bg-orange-600 text-white border-0 shadow-lg">
                  {product.saving}
                </Badge>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl group-hover:text-sky-700 transition-colors">{product.name}</CardTitle>
                <CardDescription className="text-base">
                  {product.desc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <span className="text-2xl md:text-3xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">{product.oldPrice}</span>
                  </div>
                  <Button 
                    className="bg-sky-600 hover:bg-sky-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    disabled={addingToCart === product.id || isLoading}
                    onClick={() => handleAddToCart(product.id, product.name)}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    {addingToCart === product.id ? "Adding..." : "Add to Cart"}
                  </Button>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    4.8 (120 reviews)
                  </span>
                  <span className="text-green-700 font-semibold">Free Delivery</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
