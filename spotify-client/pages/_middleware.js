import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  console.log(token);

  const { pathname } = req.nextUrl;

  // Redirect to home page if accessing login when already authenticated
  if (pathname.includes("/login") && token) {
    return NextResponse.redirect("/");
  }

  // Allow request if request for session & provider is fetching or if token exists
  if (pathname.includes("/api/auth" || token)) {
    return NextResponse.next();
  }

  // Redirect to login if user is trying to access protected route and has not been authenticated
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
