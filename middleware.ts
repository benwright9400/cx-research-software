import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (pathname === "/login" || pathname.startsWith("/public") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Allow authenticated users
  return NextResponse.next();
}

// Apply to all routes except _next/static and /favicon.ico
export const config = {
  matcher: ["/((?!_next/static|favicon.ico|login|api/auth).*)"],
};
