import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { auth } from "@/lib/auth";

// Helper function to sanitize filename
function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, "_")
    .replace(/_{2,}/g, "_")
    .toLowerCase();
}

// Helper function to generate unique filename
function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  const ext = originalName.split(".").pop();
  const nameWithoutExt = originalName.replace(`.${ext}`, "");
  const sanitized = sanitizeFilename(nameWithoutExt);
  return `${sanitized}-${timestamp}-${random}.${ext}`;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    // Check authentication
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string; // 'image' or 'pdf'

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    const allowedPdfTypes = ["application/pdf"];
    
    if (type === "image" && !allowedImageTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed." },
        { status: 400 }
      );
    }

    if (type === "pdf" && !allowedPdfTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF files are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (10MB for images, 20MB for PDFs)
    const maxSize = type === "image" ? 10 * 1024 * 1024 : 20 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large. Max size: ${maxSize / (1024 * 1024)}MB` },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const uniqueFilename = generateUniqueFilename(file.name);

    // Determine upload directory
    const uploadDir = type === "image" 
      ? join(process.cwd(), "public", "uploads", "products", "images")
      : join(process.cwd(), "public", "uploads", "products", "documents");

    // Create directory if it doesn't exist
    await mkdir(uploadDir, { recursive: true });

    // Save file
    const filePath = join(uploadDir, uniqueFilename);
    await writeFile(filePath, buffer);

    // Return public URL
    const publicUrl = type === "image"
      ? `/uploads/products/images/${uniqueFilename}`
      : `/uploads/products/documents/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFilename,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

// Delete uploaded file
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get("url");

    if (!fileUrl) {
      return NextResponse.json(
        { error: "No file URL provided" },
        { status: 400 }
      );
    }

    // Security check: ensure file is in uploads directory
    if (!fileUrl.startsWith("/uploads/products/")) {
      return NextResponse.json(
        { error: "Invalid file path" },
        { status: 400 }
      );
    }

    const filePath = join(process.cwd(), "public", fileUrl);
    
    // Delete file using fs/promises
    const { unlink } = await import("fs/promises");
    await unlink(filePath);

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
