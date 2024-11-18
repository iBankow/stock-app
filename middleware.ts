import NextAuth from "next-auth";
import { authConfig } from "./auth.config";


export default NextAuth(authConfig).auth;

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
