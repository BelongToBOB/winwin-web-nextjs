import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Skip login and register pages
  if (pathname === "/learn/login" || pathname === "/learn/register")
    return NextResponse.next();

  // Protect /learn/* and /admin/*
  if ((pathname.startsWith("/learn") || pathname.startsWith("/admin")) && !req.auth) {
    const loginUrl = new URL("/learn/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/learn/:path*", "/admin/:path*"],
};
