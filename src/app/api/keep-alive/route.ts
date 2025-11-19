import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Simple query to keep database awake
    const result = await prisma.$queryRaw`SELECT 1 as ping, NOW() as timestamp`;
    
    return NextResponse.json({
      status: "alive",
      timestamp: new Date().toISOString(),
      database: result,
    });
  } catch (error) {
    console.error("Keep-alive ping failed:", error);
    
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Database ping failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
