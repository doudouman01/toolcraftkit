import { NextRequest, NextResponse } from "next/server";

const CANONICAL = "https://toolcraftkit.com";

export function middleware(request: NextRequest) {
  const { hostname, pathname, search } = request.nextUrl;

  // ── 1. Redirect .vercel.app → canonical domain ──
  if (hostname.endsWith(".vercel.app")) {
    return NextResponse.redirect(`${CANONICAL}${pathname}${search}`, 301);
  }

  // ── 2. Redirect www → non-www ──
  if (hostname === "www.toolcraftkit.com") {
    return NextResponse.redirect(`${CANONICAL}${pathname}${search}`, 301);
  }

  // ── 3. Add security & SEO headers ──
  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|manifest).*)",
  ],
};
