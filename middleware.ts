"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to login and register pages if no cookie exists
  if (
    (pathname === "/login" || pathname === "/register") &&
    !request.cookies.has("accessToken")
  ) {
    return NextResponse.next(); 
  }

  // Redirect from login/register if the cookie already exists
  if (
    (pathname === "/login" || pathname === "/register") &&
    request.cookies.has("accessToken")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect other routes
  if (
    (pathname === "/" || pathname === "/accounts") &&
    !request.cookies.has("accessToken")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/accounts", "/login", "/register"], // Add other protected routes here
};