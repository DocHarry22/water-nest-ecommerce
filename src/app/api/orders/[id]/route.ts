import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        id: params.id,
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
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { status, trackingNumber } = body;

    const order = await prisma.order.update({
      where: {
        id: params.id,
      },
      data: {
        ...(status && { status }),
        ...(trackingNumber && { trackingNumber }),
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
