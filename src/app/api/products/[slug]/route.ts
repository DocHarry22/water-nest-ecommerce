import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Mock products for development when database is unavailable
const mockProducts: Record<string, {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  stock: number;
  sku: string;
}> = {
  "1": {
    id: "1",
    name: "6-Stage Reverse Osmosis System",
    slug: "6-stage-reverse-osmosis-system",
    price: 4500,
    images: ["https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80"],
    stock: 10,
    sku: "RO-6STG-001",
  },
  "2": {
    id: "2",
    name: "Portable Treatment Plant",
    slug: "portable-treatment-plant",
    price: 24999,
    images: ["https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80"],
    stock: 5,
    sku: "PORT-COMP-100",
  },
  "3": {
    id: "3",
    name: "Industrial Water Softener",
    slug: "industrial-water-softener",
    price: 15499,
    images: ["https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80"],
    stock: 8,
    sku: "SOFT-IND-001",
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Check if slug is actually an ID (cuid format or simple number)
    const isId = slug.match(/^[0-9]+$/) || (slug.startsWith('c') && slug.length > 20);
    
    try {
      const product = await prisma.product.findUnique({
        where: isId ? { id: slug } : { slug: slug },
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          reviews: {
            include: {
              user: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 10,
          },
          variants: true,
        },
      });

      if (!product) {
        // Fallback to mock products if database product not found
        const mockProduct = mockProducts[slug];
        if (mockProduct) {
          return NextResponse.json(mockProduct);
        }
        
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }

      // For slug-based lookups, check if published
      if (!isId && !product.published) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }

      // Calculate average rating
      const avgRating =
        product.reviews.length > 0
          ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
            product.reviews.length
          : 0;

      return NextResponse.json({
        ...product,
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: product.reviews.length,
      });
    } catch (dbError) {
      // Database error - return mock product if available
      console.warn("Database unavailable, using mock data:", dbError);
      const mockProduct = mockProducts[slug];
      if (mockProduct) {
        return NextResponse.json(mockProduct);
      }
      throw dbError;
    }
  } catch (error) {
    console.error("Product API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
