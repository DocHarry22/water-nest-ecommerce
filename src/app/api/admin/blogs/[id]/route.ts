import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const blogUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().min(1).optional(),
  authorId: z.string().optional(),
  published: z.boolean().optional(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "STAFF")) {
      return NextResponse.json(
        { error: "Unauthorized. Admin or Staff access required." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const blogId = id;

    const body = await request.json();
    const validatedData = blogUpdateSchema.parse(body);

    const blog = await prisma.blogPost.update({
      where: { id: blogId },
      data: validatedData,
    });

    return NextResponse.json(blog);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid blog data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "STAFF")) {
      return NextResponse.json(
        { error: "Unauthorized. Admin or Staff access required." },
        { status: 403 }
      );
    }

    const { id } = await params;

    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
