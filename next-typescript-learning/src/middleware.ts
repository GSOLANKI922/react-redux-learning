import { auth } from "@/auth";
import { ROUTES } from "./constants";
import { NextResponse } from "next/server";

export default auth((req) => {
  // if (!req.auth) {
  //   const url = req.url.replace(req.nextUrl.pathname, "/login");
  //   return NextResponse.redirect(url);
  // }
  // if (req.nextUrl.pathname === ROUTES.MAIN) {
  //   return NextResponse.rewrite(new URL(ROUTES.DASHBOARD, req.url));
  // }
});

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
