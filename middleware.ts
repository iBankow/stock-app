import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function middleware(req: NextRequest) {
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/"],
};
