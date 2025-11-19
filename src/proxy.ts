import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// Routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/checkout",
  "/orders",
  "/wishlist",
];

// Routes that require admin role
const adminRoutes = [
  "/admin",
];

// Routes that should redirect authenticated users
const authRoutes = [
  "/auth/login",
  "/auth/register",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get session
  const session = await auth();
  
  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !session?.user) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }
  
  // Check admin authorization
  if (isAdminRoute && (!session?.user || session.user.role !== "ADMIN")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  // Redirect authenticated users from auth routes
  if (isAuthRoute && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)",
  ],
};
