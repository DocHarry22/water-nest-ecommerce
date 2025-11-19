import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                images: true,
                slug: true,
              },
            },
          },
        },
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Check authorization
    if (
      session.user.role !== "ADMIN" &&
      order.userId !== session.user.id
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('🔄 [API] PATCH /api/orders/' + id);
    
    const session = await auth();
    console.log('👤 [API] Session:', session?.user ? `${session.user.role} - ${session.user.email}` : 'Not authenticated');

    if (!session?.user || session.user.role !== "ADMIN") {
      console.log('❌ [API] Unauthorized - role:', session?.user?.role);
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('📦 [API] Request body:', body);
    const { status, trackingNumber } = body;

    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        ...(status && { status }),
        ...(trackingNumber && { trackingNumber }),
      },
    });

    console.log('✅ [API] Order updated successfully:', order.orderNumber);
    return NextResponse.json(order);
  } catch (error) {
    console.error("❌ [API] Update order error:", error);
    return NextResponse.json(
      { error: "Failed to update order", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
