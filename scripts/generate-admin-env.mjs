import { randomBytes, scryptSync } from "node:crypto";
import { readFileSync } from "node:fs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: npm run admin:env -- <admin-password>");
  process.exit(1);
}

const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url)));
const email = process.env.TSL_ADMIN_EMAIL || `admin@${packageJson.name}.local`;
const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");
const sessionSecret = randomBytes(32).toString("hex");

console.log(`TSL_ADMIN_EMAIL=${email}`);
console.log(`TSL_ADMIN_PASSWORD_HASH=scrypt:${salt}:${hash}`);
console.log(`TSL_ADMIN_SESSION_SECRET=${sessionSecret}`);
