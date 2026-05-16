const password = process.argv[2];
const email = process.argv[3] || process.env.TSL_ADMIN_EMAIL || "tslstaff@tsl.com";

if (!password) {
  console.error("Usage: npm run admin:env -- <admin-password> [admin-email]");
  process.exit(1);
}

console.log(`TSL_ADMIN_EMAIL=${email}`);
console.log(`TSL_ADMIN_PASSWORD=${password}`);
