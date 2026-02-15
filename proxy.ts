import { NextResponse, NextRequest } from "next/server";

/**
 * This proxy runs before requests are completed.
 * It can redirect or rewrite requests based on logic.
 */
export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1) Redirect root to /dashboard
    if (pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // 2) Allow public routes without auth check
    const publicPaths = [
        "/login",
        "/signup",
        "/api/",
        "/_next/",
        "/favicon.ico",
    ];
    if (publicPaths.some((p) => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    // 3) Check if user is authenticated
    const token = request.cookies.get("sb-token")?.value;

    if (!token) {
        // Not authenticated → send to login
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 4) If authenticated, continue normally
    return NextResponse.next();
}
