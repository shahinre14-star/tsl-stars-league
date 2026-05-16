import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_COOKIE = "tsl_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export type AdminSession = {
  email: string;
  expiresAt: number;
};

export function isAdminAuthConfigured() {
  return Boolean(process.env.TSL_ADMIN_EMAIL && process.env.TSL_ADMIN_PASSWORD);
}

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function adminEmail() {
  return requiredEnv("TSL_ADMIN_EMAIL").trim().toLowerCase();
}

function sessionSecret() {
  return process.env.TSL_ADMIN_SESSION_SECRET ?? requiredEnv("TSL_ADMIN_PASSWORD");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function sign(value: string) {
  return createHmac("sha256", sessionSecret()).update(value).digest("base64url");
}

export function createAdminSessionToken(email: string) {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = Buffer.from(
    JSON.stringify({ email: email.trim().toLowerCase(), expiresAt }),
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

export function getAdminSessionCookieName() {
  return SESSION_COOKIE;
}

export function verifyAdminCredentials(email: string, password: string) {
  if (!isAdminAuthConfigured()) {
    return false;
  }

  const emailMatches = email.trim().toLowerCase() === adminEmail();
  const expectedPassword = requiredEnv("TSL_ADMIN_PASSWORD");

  return emailMatches && safeEqual(password.trim(), expectedPassword);
}

export async function createAdminSession(email: string) {
  const cookieStore = await cookies();

  cookieStore.set(
    SESSION_COOKIE,
    createAdminSessionToken(email),
    getAdminSessionCookieOptions(),
  );
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  if (!isAdminAuthConfigured()) {
    return null;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature || !safeEqual(signature, sign(payload))) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as AdminSession;

    if (session.email !== adminEmail() || session.expiresAt < Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}
