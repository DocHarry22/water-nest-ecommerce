import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    if (!prisma) {
      return NextResponse.json(
        { error: "Database unavailable during build" },
        { status: 503 }
      );
    }

    // Fetch all stats in parallel
    const [
      totalProducts,
      totalUsers,
      totalOrders,
      revenueData,
      pendingOrders,
      lowStockProducts,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.user.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: {
          total: true,
        },
        where: {
          status: {
            in: ["DELIVERED", "SHIPPED", "PROCESSING"],
          },
        },
      }),
      prisma.order.count({
        where: {
          status: {
            in: ["PENDING", "PROCESSING"],
          },
        },
      }),
      prisma.product.count({
        where: {
          stock: {
            lt: 10,
          },
        },
      }),
    ]);

    const stats = {
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue: revenueData._sum.total || 0,
      pendingOrders,
      lowStockProducts,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
}
