// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl?.pathname;
  if (pathname == null || typeof pathname !== "string") {
    return NextResponse.next();
  }

  // Check for auth token in cookies or headers
  const token =
    request.cookies.get("auth_token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  // Protected routes
  // , "/checkout"
  const protectedPaths = ["/my-account"]; 
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedPath && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
// , "/checkout/:path*"
export const config = {
  matcher: ["/my-account/:path*"],
};
