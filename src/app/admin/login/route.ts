import {
  createAdminSessionToken,
  getAdminSessionCookieName,
  getAdminSessionCookieOptions,
  isAdminAuthConfigured,
  verifyAdminCredentials,
} from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!isAdminAuthConfigured()) {
    return NextResponse.redirect(new URL("/admin?error=config", request.url), {
      status: 303,
    });
  }

  try {
    if (!verifyAdminCredentials(email, password)) {
      return NextResponse.redirect(
        new URL("/admin?error=invalid", request.url),
        {
          status: 303,
        },
      );
    }
  } catch {
    return NextResponse.redirect(new URL("/admin?error=invalid", request.url), {
      status: 303,
    });
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), {
    status: 303,
  });

  response.cookies.set(
    getAdminSessionCookieName(),
    createAdminSessionToken(email),
    getAdminSessionCookieOptions(),
  );

  return response;
}
