import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "@/app/common/constant";

const cookieName = process.env.CMS_SESSION_COOKIE ?? "cms_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = request.cookies.get(cookieName)?.value === "true";

  const isLoginPage = pathname === ROUTES.CMS_LOGIN;

  // 1. If trying to access login while already logged in -> Dashboard
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL(ROUTES.CMS_DASHBOARD, request.url));
  }

  // 2. If trying to access protected routes while NOT logged in -> Login
  // We exclude the login page itself from this check to prevent loops
  if (!isLoginPage && !isLoggedIn) {
    const loginUrl = new URL(ROUTES.CMS_LOGIN, request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/cms/:path*']
};