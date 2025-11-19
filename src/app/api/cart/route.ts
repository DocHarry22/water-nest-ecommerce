import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                price: true,
                images: true,
                stock: true,
                sku: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      // Create cart if doesn't exist
      const newCart = await prisma.cart.create({
        data: {
          userId: session.user.id,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
      return NextResponse.json(newCart);
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Cart API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🛒 [API] Cart POST request received');
    const session = await auth();
    console.log('👤 [API] Session:', session?.user ? `Logged in as ${session.user.email}` : 'Not authenticated');

    if (!session?.user) {
      console.log('❌ [API] Unauthorized - no session');
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('📦 [API] Request body:', body);
    const { productId, quantity } = body;

    if (!productId || !quantity || quantity < 1) {
      console.log('❌ [API] Invalid input:', { productId, quantity });
      return NextResponse.json(
        { error: "Invalid product or quantity" },
        { status: 400 }
      );
    }

    // Get or create cart
    console.log('🔍 [API] Finding cart for user:', session.user.id);
    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    });

    if (!cart) {
      console.log('➕ [API] Creating new cart');
      cart = await prisma.cart.create({
        data: { userId: session.user.id },
      });
    } else {
      console.log('✅ [API] Cart found:', cart.id);
    }

    // Check if product exists and has stock
    console.log('🔍 [API] Looking up product:', productId);
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, name: true, stock: true },
    });

    if (!product) {
      console.log('❌ [API] Product not found:', productId);
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    console.log('✅ [API] Product found:', product.name, '- Stock:', product.stock);

    if (product.stock < quantity) {
      console.log('❌ [API] Insufficient stock:', product.stock, '<', quantity);
      return NextResponse.json(
        { error: "Insufficient stock" },
        { status: 400 }
      );
    }

    // Check if item already in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem) {
      // Update quantity
      console.log('📝 [API] Updating existing cart item');
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      // Create new cart item
      console.log('➕ [API] Creating new cart item');
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    // Return updated cart
    console.log('📥 [API] Fetching updated cart');
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                price: true,
                images: true,
                stock: true,
              },
            },
          },
        },
      },
    });

    console.log('✅ [API] Cart updated successfully, items count:', updatedCart?.items.length);
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error("❌ [API] Add to cart error:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: "Failed to add item to cart", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("itemId");

    if (!itemId) {
      // Clear entire cart
      await prisma.cartItem.deleteMany({
        where: {
          cart: {
            userId: session.user.id,
          },
        },
      });
    } else {
      // Remove specific item
      await prisma.cartItem.delete({
        where: {
          id: itemId,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Remove from cart error:", error);
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}
