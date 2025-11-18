"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";
import {
  ShoppingBag,
  Heart,
  Star,
  ThumbsUp,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Check,
  Minus,
  Plus,
  Phone,
  MessageCircle,
  ChevronLeft,
  Info,
  Award,
  Zap,
  Package
} from "lucide-react";

// Mock product data (in real app, this would come from API/database)
const getProduct = (slug: string) => {
  const products = {
    "6-stage-ro-system": {
      id: "1",
      name: "6-Stage RO System",
      slug: "6-stage-ro-system",
      description: "Our premium 6-Stage Reverse Osmosis system combines cutting-edge filtration technology with UV sterilization to deliver pure, safe drinking water for your home. This comprehensive system removes up to 99% of contaminants including chlorine, heavy metals, bacteria, viruses, and dissolved solids.",
      shortDescription: "Advanced RO with UV protection",
      price: 4999,
      compareAtPrice: 6999,
      sku: "RO-6STAGE-001",
      stock: 45,
      category: "Purification Systems",
      categorySlug: "purification-systems",
      featured: true,
      rating: 4.8,
      reviews: 120,
      images: [
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
        "https://images.unsplash.com/photo-1584622781867-f8178b0c2229?w=800&q=80",
        "https://images.unsplash.com/photo-1582719366941-a26f6f69c9af?w=800&q=80"
      ],
      tags: ["bestseller", "home", "ro-system"],
      specifications: {
        "Filtration Capacity": "250 liters per day",
        "Filtration Stages": "6 stages (Sediment, Pre-carbon, RO membrane, Post-carbon, Mineralizer, UV)",
        "Membrane Type": "TFC (Thin Film Composite) 75 GPD",
        "Storage Tank": "12 liters pressurized tank",
        "Operating Pressure": "40-80 PSI",
        "Power Supply": "220V AC for UV lamp",
        "Dimensions": "450mm x 380mm x 450mm",
        "Warranty": "2 years comprehensive",
        "Certifications": "SABS, NSF/ANSI 58"
      },
      features: [
        "6-stage advanced filtration process",
        "UV sterilization kills 99.99% of bacteria and viruses",
        "TDS reduction from 1000+ ppm to < 50 ppm",
        "Mineralizer adds essential minerals back",
        "Auto shut-off when tank is full",
        "Quick-change filter design",
        "12L pressurized storage tank",
        "SABS and NSF certified",
        "2-year comprehensive warranty",
        "Free installation included"
      ],
      whatsInBox: [
        "6-Stage RO Unit with UV lamp",
        "12L Pressurized Storage Tank",
        "Designer Faucet (Chrome/Matt finish)",
        "Complete Installation Kit",
        "Pre-filter Set (3 filters)",
        "RO Membrane 75 GPD",
        "UV Sterilizer 11W",
        "User Manual & Warranty Card",
        "Filter Replacement Schedule Guide"
      ],
      relatedProducts: ["whole-house-filter", "uv-sterilization-unit", "countertop-purifier"]
    },
    "portable-treatment-plant": {
      id: "2",
      name: "Portable Treatment Plant",
      slug: "portable-treatment-plant",
      description: "Industrial-grade mobile water treatment system perfect for construction sites, events, emergency relief, and temporary installations. Fully containerized for rapid deployment anywhere in South Africa.",
      shortDescription: "Rapid deployment purification",
      price: 24999,
      compareAtPrice: 32999,
      sku: "PTP-MOB-500",
      stock: 8,
      category: "Portable Treatment Plants",
      categorySlug: "portable-treatment-plants",
      featured: true,
      rating: 4.9,
      reviews: 34,
      images: [
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
        "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80"
      ],
      tags: ["industrial", "portable", "rental"],
      specifications: {
        "Treatment Capacity": "500 - 50,000 liters per hour",
        "Container Size": "20ft / 40ft ISO container options",
        "Treatment Process": "Multi-stage: Filtration, Softening, RO, UV",
        "Power Requirement": "380V 3-phase / Generator compatible",
        "Water Source": "Borehole, river, dam, municipal",
        "Output Quality": "Potable water (SANS 241 compliant)",
        "Deployment Time": "24-48 hours fully operational",
        "Maintenance": "Monthly service contracts available"
      },
      features: [
        "Fully containerized - easy transport",
        "Rapid deployment (24-48 hours)",
        "Capacities from 500L/h to 50,000L/h",
        "SANS 241 compliant output",
        "Rental or purchase options",
        "Automatic backwash cycles",
        "Remote monitoring available",
        "Trained operator support",
        "Generator compatible",
        "Weatherproof construction"
      ],
      whatsInBox: [
        "Complete Treatment System in Container",
        "Pre-filter Stage (Sand/Carbon)",
        "Water Softener Unit",
        "RO System (if specified)",
        "UV Sterilization Unit",
        "Storage Tanks (500L - 5000L)",
        "Control Panel & Automation",
        "Distribution Pump System",
        "Operator Training Manual",
        "3-Month Service Package"
      ],
      relatedProducts: ["industrial-water-softener", "uv-sterilization-unit", "water-testing-kit-pro"]
    },
    "industrial-water-softener": {
      id: "3",
      name: "Industrial Water Softener",
      slug: "industrial-water-softener",
      description: "High-capacity commercial water softener designed for businesses, hotels, laundries, and industrial applications. Uses premium-grade ion exchange resin to eliminate hardness and protect your equipment.",
      shortDescription: "Remove hardness at scale",
      price: 15499,
      compareAtPrice: 19999,
      sku: "SOFT-IND-1000",
      stock: 12,
      category: "Specialized Equipment",
      categorySlug: "specialized-equipment",
      featured: true,
      rating: 4.7,
      reviews: 67,
      images: [
        "https://images.unsplash.com/photo-1582719366941-a26f6f69c9af?w=800&q=80",
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
        "https://images.unsplash.com/photo-1584622781867-f8178b0c2229?w=800&q=80"
      ],
      tags: ["industrial", "softener", "commercial"],
      specifications: {
        "Softening Capacity": "10,000 liters per day",
        "Resin Type": "High-grade ion exchange resin",
        "Resin Volume": "100 liters",
        "Flow Rate": "25 liters per minute",
        "Operating Pressure": "2-8 bar",
        "Hardness Removal": "Up to 500 ppm CaCO3",
        "Regeneration": "Time or meter-controlled",
        "Salt Consumption": "2-3 kg per regeneration",
        "Dimensions": "600mm x 500mm x 1800mm",
        "Warranty": "3 years on tank & valve"
      },
      features: [
        "10,000L/day capacity",
        "Premium ion exchange resin",
        "Automatic regeneration",
        "Hardness monitoring",
        "Bypass valve included",
        "Time or meter-controlled",
        "Salt-saving technology",
        "Corrosion-resistant tank",
        "3-year warranty",
        "Free site survey"
      ],
      whatsInBox: [
        "FRP Softener Tank (100L resin)",
        "Automatic Control Valve",
        "Brine Tank (200L capacity)",
        "Bypass Valve Assembly",
        "Salt Funnel & Grid",
        "Installation Fittings",
        "Hardness Test Kit",
        "User Manual",
        "Commissioning Service"
      ],
      relatedProducts: ["portable-treatment-plant", "water-testing-kit-pro", "replacement-filter-set"]
    }
  };

  return products[slug as keyof typeof products] || null;
};

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  const router = useRouter();
  const { addToCart, isLoading } = useCart();

  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const savingsPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await addToCart(product.id, quantity);
      toast.success(`${product.name} added to cart!`, {
        description: `Quantity: ${quantity}`,
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
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <section className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-sky-600 transition-colors">Products</Link>
            <span>/</span>
            <Link href={`/products?category=${product.categorySlug}`} className="hover:text-sky-600 transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Link href="/products" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 mb-6 transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-linear-to-br from-sky-100 to-cyan-100 border-2 border-gray-200">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {savingsPercent > 0 && (
                  <Badge className="absolute top-4 left-4 bg-green-600 text-white border-0 shadow-lg text-base px-3 py-1">
                    Save {savingsPercent}%
                  </Badge>
                )}
                {product.featured && (
                  <Badge className="absolute top-4 right-4 bg-purple-600 text-white border-0 shadow-lg">
                    <Zap className="h-4 w-4 mr-1 inline" />
                    Featured
                  </Badge>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-sky-600 ring-2 ring-sky-200"
                        : "border-gray-200 hover:border-sky-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-3">
                  {product.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-lg md:text-xl text-gray-600">
                  {product.shortDescription}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  <span className="font-semibold text-gray-900">{product.rating}</span> ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="pb-4 border-b border-gray-200">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-gray-900">
                    R{product.price.toLocaleString()}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      R{product.compareAtPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {product.compareAtPrice && (
                  <p className="text-green-700 font-semibold">
                    You save R{(product.compareAtPrice - product.price).toLocaleString()} ({savingsPercent}% off)
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                {product.stock > 0 ? (
                  <>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      <ThumbsUp className="h-3 w-3 mr-1 inline" />
                      In Stock
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {product.stock} units available
                    </span>
                  </>
                ) : (
                  <Badge className="bg-red-100 text-red-700 border-red-200">
                    Out of Stock
                  </Badge>
                )}
                <span className="text-sm text-gray-600">SKU: {product.sku}</span>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-semibold">Quantity:</span>
                  <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="flex-1 bg-sky-600 hover:bg-sky-700 text-white shadow-lg hover:shadow-xl transition-all text-lg h-14"
                    disabled={product.stock === 0 || isAddingToCart || isLoading}
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {isAddingToCart ? "Adding..." : "Add to Cart"}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-sky-600 text-sky-700 hover:bg-sky-50 h-14"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-300 hover:bg-gray-50 h-14"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/contact" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Request Quote
                    </Button>
                  </Link>
                  <Link href="/contact" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-purple-600 text-purple-700 hover:bg-purple-50"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Ask Expert
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
                <div className="flex flex-col items-center text-center p-3 bg-sky-50 rounded-lg">
                  <Truck className="h-6 w-6 text-sky-600 mb-2" />
                  <span className="text-xs font-semibold text-gray-900">Free Delivery</span>
                  <span className="text-xs text-gray-600">On orders &gt;R1000</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-green-50 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600 mb-2" />
                  <span className="text-xs font-semibold text-gray-900">Warranty</span>
                  <span className="text-xs text-gray-600">{(product.specifications as Record<string, string>).Warranty || "2 years"}</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-purple-50 rounded-lg">
                  <RotateCcw className="h-6 w-6 text-purple-600 mb-2" />
                  <span className="text-xs font-semibold text-gray-900">Returns</span>
                  <span className="text-xs text-gray-600">30-day policy</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-amber-50 rounded-lg">
                  <Award className="h-6 w-6 text-amber-600 mb-2" />
                  <span className="text-xs font-semibold text-gray-900">SABS Certified</span>
                  <span className="text-xs text-gray-600">Quality assured</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-12 lg:mt-16">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid mb-8">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="whats-in-box">What&apos;s in Box</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-sky-600" />
                      Product Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-sky-600" />
                      Technical Specifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex flex-col p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="text-sm text-gray-600 mb-1">{key}</span>
                          <span className="font-semibold text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-sky-600" />
                      Key Features & Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-sky-50 rounded-lg">
                          <Check className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                          <span className="text-gray-900">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="whats-in-box">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-sky-600" />
                      Package Contents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {product.whatsInBox.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span className="text-gray-900">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Related Products</h2>
            <p className="text-gray-600 mb-8">Complete your water treatment system</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Related products would be rendered here */}
              <Card className="text-center p-8 border-2 border-dashed border-gray-300">
                <p className="text-gray-500">Related products coming soon</p>
              </Card>
            </div>
          </section>
        </div>
      </section>

      {/* Sticky Add to Cart Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-sky-200 p-4 lg:hidden shadow-2xl z-50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-2xl font-bold text-gray-900">R{product.price.toLocaleString()}</div>
            {product.compareAtPrice && (
              <div className="text-sm text-gray-500 line-through">
                R{product.compareAtPrice.toLocaleString()}
              </div>
            )}
          </div>
          <Button
            size="lg"
            className="flex-1 bg-sky-600 hover:bg-sky-700 text-white shadow-lg"
            disabled={product.stock === 0 || isAddingToCart || isLoading}
            onClick={handleAddToCart}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
