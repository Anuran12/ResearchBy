import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup");

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/research", request.url));
    }
    return NextResponse.next();
  }

  if (!token && request.nextUrl.pathname.startsWith("/research")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/research/:path*", "/login", "/signup"],
};
