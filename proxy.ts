import { NextResponse, NextRequest } from "next/server";

export function proxy(request: NextRequest) {

    // un-comment the commented code when, the integration of backend is started to be done.

    // const { pathname } = request.nextUrl;
    // const token = request.cookies.get("access-token")?.value;

    // const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard")

    // If no token, redirect to /login
    // if (isProtectedRoute && !token) {
    //     return NextResponse.redirect(new URL("/login", request.url));
    // }

    // if(){ ... }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/dashboard/:path*",
        "/auth/:path*",
    ],
};
