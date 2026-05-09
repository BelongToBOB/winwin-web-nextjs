import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Skip login page
  if (pathname === "/learn/login") return NextResponse.next();

  // Protect all /learn/* routes
  if (pathname.startsWith("/learn") && !req.auth) {
    const loginUrl = new URL("/learn/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/learn/:path*"],
};
