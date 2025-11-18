import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Check if slug is actually an ID (cuid format)
    const isId = slug.startsWith('c') && slug.length > 20;
    
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
  } catch (error) {
    console.error("Product API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
