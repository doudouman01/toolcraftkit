import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { hostname, pathname, search } = request.nextUrl;

  // ── Redirect .vercel.app → canonical domain ──
  if (hostname.endsWith(".vercel.app")) {
    return NextResponse.redirect(
      `https://toolcraftkit.com${pathname}${search}`,
      301
    );
  }

  // ── Security headers ──
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|manifest).*)",
  ],
};
