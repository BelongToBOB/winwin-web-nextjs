import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Skip auth pages
  const publicPages = ["/learn/login", "/learn/register", "/learn/forgot-password", "/learn/reset-password"];
  if (publicPages.includes(pathname)) return NextResponse.next();

  // Protect /learn/* and /admin/* — must be logged in
  if ((pathname.startsWith("/learn") || pathname.startsWith("/admin")) && !req.auth) {
    return NextResponse.redirect(new URL("/learn/login", req.url));
  }

  // Protect /admin/* — must have admin role
  if (pathname.startsWith("/admin")) {
    const role = (req.auth?.user as any)?.role;
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/learn", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/learn/:path*", "/admin/:path*"],
};
