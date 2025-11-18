import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  categoryId: z.string(),
  images: z.array(z.string()).optional(),
  mainImage: z.string().optional(),
  additionalImages: z.array(z.string()).optional(),
  manualPdfUrl: z.string().optional(),
  msdsPdfUrl: z.string().optional(),
  published: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const body = await request.json();
    console.log("Received product data:", JSON.stringify(body, null, 2));
    
    const validatedData = productSchema.parse(body);
    console.log("Validated product data:", JSON.stringify(validatedData, null, 2));

    const product = await prisma.product.create({
      data: validatedData,
      include: {
        category: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.issues);
      return NextResponse.json(
        { error: "Invalid product data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
