import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const session = await auth();

  // Public paths that don't require authentication
  const publicPaths = ["/sign-in", "/api/auth", "/_next", "/images", "/favicon.ico", "/"];
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // If the path is public, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }

  // If user is not logged in and trying to access protected route, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
