import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Only apply to the exact root path
  if (request.nextUrl.pathname === "/") {
    // Redirect directly to applynow page
    const redirectUrl = new URL("/applynow", request.url)
    redirectUrl.search = request.nextUrl.search // Preserve all query parameters including UTMs

    // Set a cookie to remember the redirect
    const response = NextResponse.redirect(redirectUrl, {
      status: 302, // Temporary redirect
    })

    // Store the redirect in a cookie
    response.cookies.set("root-redirect", "applynow", {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    })

    return response
  }

  return NextResponse.next()
}

// Only run middleware on the home route
export const config = {
  matcher: "/",
}
