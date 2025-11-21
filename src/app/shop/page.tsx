"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";
import {
  Search,
  SlidersHorizontal,
  Grid3x3,
  List,
  Star,
  ShoppingCart,
  Heart,
  Filter,
  X
} from "lucide-react";

// Mock products data
const allProducts = [
  {
    id: "1",
    name: "6-Stage Reverse Osmosis System",
    category: "Purification Systems",
    price: 4500,
    originalPrice: 5200,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
    sku: "RO-6STG-001"
  },
  {
    id: "2",
    name: "Commercial Water Softener",
    category: "Specialized Equipment",
    price: 8900,
    originalPrice: 8900,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    featured: true,
    sku: "SOFT-COM-023"
  },
  {
    id: "3",
    name: "UV Sterilization Unit",
    category: "Purification Systems",
    price: 2800,
    originalPrice: 3100,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    featured: false,
    sku: "UV-STER-015"
  },
  {
    id: "4",
    name: "Whole House Water Filter",
    category: "Water Filtration Systems",
    price: 3200,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80",
    rating: 4.6,
    reviews: 98,
    inStock: true,
    featured: false,
    sku: "FILT-WH-003"
  },
  {
    id: "5",
    name: "Portable Treatment Plant",
    category: "Portable Treatment Plants",
    price: 125000,
    originalPrice: 125000,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80",
    rating: 5.0,
    reviews: 34,
    inStock: true,
    featured: true,
    sku: "PORT-COMP-100"
  },
  {
    id: "6",
    name: "Industrial Ice Machine",
    category: "Specialized Equipment",
    price: 45000,
    originalPrice: 52000,
    image: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=600&q=80",
    rating: 4.8,
    reviews: 67,
    inStock: true,
    featured: false,
    sku: "ICE-IND-500"
  },
  {
    id: "7",
    name: "Sediment Filter Cartridge",
    category: "Testing & Maintenance",
    price: 450,
    originalPrice: 450,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80",
    rating: 4.5,
    reviews: 234,
    inStock: true,
    featured: false,
    sku: "FILT-SED-10"
  },
  {
    id: "8",
    name: "Water Testing Kit Professional",
    category: "Testing & Maintenance",
    price: 1850,
    originalPrice: 2100,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80",
    rating: 4.7,
    reviews: 145,
    inStock: true,
    featured: false,
    sku: "TEST-PRO-015"
  }
];

const categories = [
  "All Products",
  "Water Filtration Systems",
  "Purification Systems",
  "Portable Treatment Plants",
  "Specialized Equipment",
  "Testing & Maintenance"
];

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under R1,000", min: 0, max: 1000 },
  { label: "R1,000 - R5,000", min: 1000, max: 5000 },
  { label: "R5,000 - R20,000", min: 5000, max: 20000 },
  { label: "R20,000 - R50,000", min: 20000, max: 50000 },
  { label: "Over R50,000", min: 50000, max: Infinity }
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
  { label: "Most Reviews", value: "reviews" },
  { label: "Newest", value: "newest" }
];

export default function ShopPage() {
  const router = useRouter();
  const { addToCart, isLoading } = useCart();
  const [products, setProducts] = useState(allProducts);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const formattedProducts = data.products.map((p: any) => ({
            id: p.id,
            name: p.name,
            category: p.category?.name || "Uncategorized",
            price: p.price,
            originalPrice: p.compareAtPrice || p.price,
            image: p.images?.[0] || "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80",
            rating: p.averageRating || 0,
            reviews: p.reviewCount || 0,
            inStock: p.stock > 0,
            featured: p.featured,
            sku: p.sku
          }));
          setProducts(formattedProducts);
        }
      } catch {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
    } catch {
      toast.error("Failed to add to cart", {
        description: "Please try again",
      });
    } finally {
      setAddingToCart(null);
    }
  };

  // Filter products
  let filteredProducts = products.filter((product) => {
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Products" || 
      product.category === selectedCategory;
    
    const matchesPrice = product.price >= selectedPriceRange.min && 
      product.price <= selectedPriceRange.max;
    
    const matchesStock = !inStockOnly || product.inStock;
    
    const matchesSale = !onSaleOnly || product.originalPrice > product.price;

    return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesSale;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviews - a.reviews;
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSelectedCategory("All Products");
    setSelectedPriceRange(priceRanges[0]);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-linear-to-r from-sky-600 via-cyan-600 to-sky-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop</h1>
          <p className="text-lg text-sky-100">
            Browse our complete range of water treatment products and equipment
          </p>
        </div>
      </section>

      {/* Search & Filters Bar */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Sort */}
            <div className="flex gap-2 w-full lg:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex h-12 w-full lg:w-48 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* View Toggle */}
              <div className="hidden md:flex gap-1 border rounded-md p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-10 w-10 p-0"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-10 w-10 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden h-12"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
            <span>
              <strong className="text-gray-900">{filteredProducts.length}</strong> products found
            </span>
            {(selectedCategory !== "All Products" || selectedPriceRange.min > 0 || inStockOnly || onSaleOnly) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-sky-600 hover:text-sky-700"
              >
                <X className="h-4 w-4 mr-1" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-24 space-y-6">
                {/* Categories */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedCategory === category
                              ? "bg-sky-100 text-sky-700 font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Price Range */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <button
                          key={range.label}
                          onClick={() => setSelectedPriceRange(range)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedPriceRange.label === range.label
                              ? "bg-sky-100 text-sky-700 font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Filters */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-gray-900 mb-4">Filters</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={inStockOnly}
                          onChange={(e) => setInStockOnly(e.target.checked)}
                          className="w-4 h-4 text-sky-600"
                        />
                        <span className="text-sm text-gray-700">In Stock Only</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={onSaleOnly}
                          onChange={(e) => setOnSaleOnly(e.target.checked)}
                          className="w-4 h-4 text-sky-600"
                        />
                        <span className="text-sm text-gray-700">On Sale</span>
                      </label>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Products Grid/List */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <Card className="text-center py-16">
                  <CardContent>
                    <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                    <Button onClick={clearFilters} variant="outline">
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }>
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all border-2 hover:border-sky-300">
                      {viewMode === "grid" ? (
                        // Grid View
                        <>
                          <div className="relative h-48 bg-gray-100 overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            />
                            {product.originalPrice > product.price && (
                              <Badge className="absolute top-2 left-2 bg-red-600 text-white">
                                Save R{(product.originalPrice - product.price).toFixed(0)}
                              </Badge>
                            )}
                            {product.featured && (
                              <Badge className="absolute top-2 right-2 bg-amber-600 text-white">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                            <Link href={`/products/${product.sku.toLowerCase()}`}>
                              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-sky-600 transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-1 mb-3">
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < Math.floor(product.rating)
                                        ? "text-yellow-500 fill-yellow-500"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-600">
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                            <div className="mb-4">
                              {product.originalPrice > product.price && (
                                <p className="text-xs text-gray-500 line-through">
                                  R{product.originalPrice.toFixed(2)}
                                </p>
                              )}
                              <p className="text-xl font-bold text-gray-900">
                                R{product.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                className="flex-1 bg-sky-600 hover:bg-sky-700"
                                disabled={!product.inStock || addingToCart === product.id || isLoading}
                                onClick={() => handleAddToCart(product.id, product.name)}
                              >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                {addingToCart === product.id ? "Adding..." : "Add to Cart"}
                              </Button>
                              <Button variant="outline" size="icon" className="border-2 border-sky-600 text-sky-600 hover:bg-sky-50">
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </>
                      ) : (
                        // List View
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="relative w-32 h-32 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="128px"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                              <Link href={`/products/${product.sku.toLowerCase()}`}>
                                <h3 className="font-semibold text-lg text-gray-900 mb-2 hover:text-sky-600 transition-colors">
                                  {product.name}
                                </h3>
                              </Link>
                              <div className="flex items-center gap-2 mb-3">
                                <div className="flex">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < Math.floor(product.rating)
                                          ? "text-yellow-500 fill-yellow-500"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                  {product.rating} ({product.reviews} reviews)
                                </span>
                                {product.featured && (
                                  <Badge className="bg-amber-600 text-white text-xs">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  {product.originalPrice > product.price && (
                                    <p className="text-sm text-gray-500 line-through">
                                      R{product.originalPrice.toFixed(2)}
                                    </p>
                                  )}
                                  <p className="text-2xl font-bold text-gray-900">
                                    R{product.price.toFixed(2)}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    className="bg-sky-600 hover:bg-sky-700"
                                    disabled={!product.inStock || addingToCart === product.id || isLoading}
                                    onClick={() => handleAddToCart(product.id, product.name)}
                                  >
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    {addingToCart === product.id ? "Adding..." : "Add to Cart"}
                                  </Button>
                                  <Button variant="outline" size="icon" className="border-2 border-sky-600 text-sky-600 hover:bg-sky-50">
                                    <Heart className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
