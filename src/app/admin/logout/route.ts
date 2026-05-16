import { getAdminSessionCookieName } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/admin", request.url), {
    status: 303,
  });

  response.cookies.delete(getAdminSessionCookieName());

  return response;
}
