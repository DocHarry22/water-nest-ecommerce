import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import crypto from "crypto";
import { z } from "zod";
import { rateLimit, getClientIdentifier, getRateLimitHeaders } from "@/lib/rate-limit";

const requestResetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Request password reset
export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting - 3 requests per hour per IP
    const identifier = getClientIdentifier(request);
    const rateLimitResult = await rateLimit(identifier, 'passwordReset');
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Too many password reset attempts",
          message: `Please try again after ${new Date(rateLimitResult.reset).toLocaleTimeString()}`,
        },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      );
    }

    const body = await request.json();
    const validatedData = requestResetSchema.parse(body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json(
        { message: "If an account exists, a password reset link has been sent" },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set expiry to 1 hour from now
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    // Store token in database
    await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        token: hashedToken,
        expires,
      },
    });

    // TODO: Send password reset email with token
    // const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;
    // await sendPasswordResetEmail(user.email, resetUrl);

    console.log(`Password reset token for ${user.email}: ${resetToken}`);
    console.log(`Reset URL: ${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`);

    return NextResponse.json(
      { message: "If an account exists, a password reset link has been sent" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Password reset request error:", error);
    return NextResponse.json(
      { error: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}

// Reset password with token
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = resetPasswordSchema.parse(body);

    // Hash the provided token
    const hashedToken = crypto
      .createHash("sha256")
      .update(validatedData.token)
      .digest("hex");

    // Find valid token
    const tokenRecord = await prisma.verificationToken.findUnique({
      where: { token: hashedToken },
    });

    if (!tokenRecord || tokenRecord.expires < new Date()) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: tokenRecord.identifier },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Hash new password
    const hashedPassword = await hash(validatedData.password, 10);

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    // Invalidate all sessions for this user (security measure)
    await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    // Delete used token
    await prisma.verificationToken.delete({
      where: { token: hashedToken },
    });

    // TODO: Send password changed notification email
    // await sendPasswordChangedEmail(user.email);

    return NextResponse.json(
      { message: "Password reset successfully. All sessions have been invalidated. Please log in again." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
