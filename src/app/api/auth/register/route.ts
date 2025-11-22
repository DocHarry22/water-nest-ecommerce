import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { z } from "zod";
import { rateLimit, getClientIdentifier, getRateLimitHeaders } from "@/lib/rate-limit";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
  company: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check if prisma is available (may be undefined during build)
    if (!prisma) {
      return NextResponse.json(
        { error: "Database unavailable during build" },
        { status: 503 }
      );
    }

    // Apply rate limiting - 3 registrations per hour per IP
    const identifier = getClientIdentifier(request);
    const rateLimitResult = await rateLimit(identifier, 'register');
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Too many registration attempts",
          message: `Please try again after ${new Date(rateLimitResult.reset).toLocaleTimeString()}`,
        },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      );
    }
    
    const body = await request.json();
    
    // Validate input
    const validatedData = registerSchema.parse(body);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }
    
    // Hash password
    const hashedPassword = await hash(validatedData.password, 10);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        phone: validatedData.phone,
        role: "CUSTOMER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    
    return NextResponse.json(
      { 
        message: "Account created successfully",
        user,
      },
      { status: 201 }
    );
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
