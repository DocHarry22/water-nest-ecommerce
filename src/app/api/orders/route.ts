import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!prisma) {
      return NextResponse.json(
        { error: "Database unavailable during build" },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");

    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {};

    // Only show user's orders if not admin
    if (session.user.role !== "ADMIN") {
      where.userId = session.user.id;
    }

    if (status) {
      where.status = status as Prisma.EnumOrderStatusFilter;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
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
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Orders API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();

    if (!prisma) {
      return NextResponse.json(
        { error: "Database unavailable during build" },
        { status: 503 }
      );
    }

    const {
      items,
      shippingInfo,
      paymentMethod,
      subtotal,
      shipping,
      tax,
      total,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one item" },
        { status: 400 }
      );
    }

    if (!shippingInfo) {
      return NextResponse.json(
        { error: "Shipping information is required" },
        { status: 400 }
      );
    }

    // Validate stock availability
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        select: { price: true, name: true, images: true, sku: true, stock: true },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        );
      }

      const itemTotal = product.price * item.quantity;

      orderItems.push({
        productId: item.productId,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        total: itemTotal,
        image: product.images[0] || null,
        sku: product.sku,
      });
    }

    // Generate order number
    const orderNumber = `WN-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session?.user?.id,
        email: shippingInfo.email,
        phone: shippingInfo.phone,
        subtotal,
        tax,
        shipping,
        total,
        shippingAddress: {
          firstName: shippingInfo.firstName,
          lastName: shippingInfo.lastName,
          streetAddress: shippingInfo.streetAddress || shippingInfo.address,
          suburb: shippingInfo.suburb || "",
          apartment: shippingInfo.apartment || "",
          city: shippingInfo.city,
          province: shippingInfo.province,
          postalCode: shippingInfo.postalCode,
          country: "South Africa",
          deliveryNotes: shippingInfo.deliveryNotes || "",
        },
        billingAddress: {
          firstName: shippingInfo.firstName,
          lastName: shippingInfo.lastName,
          streetAddress: shippingInfo.streetAddress || shippingInfo.address,
          suburb: shippingInfo.suburb || "",
          apartment: shippingInfo.apartment || "",
          city: shippingInfo.city,
          province: shippingInfo.province,
          postalCode: shippingInfo.postalCode,
          country: "South Africa",
        },
        notes: shippingInfo.deliveryNotes || "",
        paymentStatus: "PENDING",
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    // Create payment record
    await prisma.payment.create({
      data: {
        orderId: order.id,
        amount: total,
        method: paymentMethod || "card",
        status: "PENDING",
      },
    });

    // Update product stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    // Clear user's cart after successful order
    if (session?.user?.id) {
      await prisma.cart.deleteMany({
        where: { userId: session.user.id },
      });
    }

    // TODO: Send order confirmation email
    // TODO: Process payment with Stripe

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
