import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Get all active sessions for the authenticated user
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if prisma is available (may be undefined during build)
    if (!prisma) {
      return NextResponse.json(
        { error: "Database unavailable during build" },
        { status: 503 }
      );
    }

    const sessions = await prisma.session.findMany({
      where: {
        userId: session.user.id,
        expires: {
          gt: new Date(), // Only active sessions
        },
      },
      select: {
        id: true,
        sessionToken: true,
        expires: true,
        // Note: Device tracking fields will be available after migration
        // ipAddress: true,
        // userAgent: true,
        // device: true,
        // browser: true,
        // os: true,
        // country: true,
        // city: true,
        // lastActive: true,
      },
      orderBy: {
        expires: "desc",
      },
    });

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Get sessions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}

// DELETE - Revoke a specific session or all other sessions
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if prisma is available (may be undefined during build)
    if (!prisma) {
      return NextResponse.json(
        { error: "Database unavailable during build" },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const revokeAll = searchParams.get("revokeAll") === "true";

    if (revokeAll) {
      // Revoke all sessions except the current one
      // Note: We can't get current session token directly from NextAuth
      // So we'll delete all sessions and the user will need to log in again
      await prisma.session.deleteMany({
        where: {
          userId: session.user.id,
        },
      });

      return NextResponse.json({
        message: "All sessions revoked successfully. Please log in again.",
        loggedOut: true,
      });
    }

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Delete specific session
    const deletedSession = await prisma.session.deleteMany({
      where: {
        id: sessionId,
        userId: session.user.id, // Ensure user can only delete their own sessions
      },
    });

    if (deletedSession.count === 0) {
      return NextResponse.json(
        { error: "Session not found or already expired" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Session revoked successfully",
    });
  } catch (error) {
    console.error("Delete session error:", error);
    return NextResponse.json(
      { error: "Failed to revoke session" },
      { status: 500 }
    );
  }
}
