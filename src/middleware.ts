import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// Define protected routes and their required roles
const protectedRoutes = {
  admin: {
    paths: ["/admin"],
    roles: ["ADMIN"],
  },
  staff: {
    paths: ["/staff"],
    roles: ["ADMIN", "STAFF"],
  },
  customer: {
    paths: ["/dashboard", "/orders", "/profile"],
    roles: ["CUSTOMER", "ADMIN", "STAFF"],
  },
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for public routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/auth") ||
    pathname === "/" ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/services") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/shop") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/blog")
  ) {
    return NextResponse.next();
  }

  // Get session
  const session = await auth();

  // Check if user is authenticated
  if (!session?.user) {
    const signInUrl = new URL("/auth/login", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Check role-based access
  for (const config of Object.values(protectedRoutes)) {
    if (config.paths.some(path => pathname.startsWith(path))) {
      if (!config.roles.includes(session.user.role)) {
        // Redirect to appropriate dashboard based on role
        const redirectUrl = new URL(
          session.user.role === "ADMIN" ? "/admin" :
          session.user.role === "STAFF" ? "/staff/dashboard" :
          "/dashboard",
          request.url
        );
        return NextResponse.redirect(redirectUrl);
      }
      break;
    }
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
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
