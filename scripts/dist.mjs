import { cpSync, mkdirSync, rmSync } from "node:fs";
import { execSync } from "node:child_process";

const DIST = "dist";

rmSync(DIST, { recursive: true, force: true });

execSync("npm run build", { stdio: "inherit" });

mkdirSync(DIST, { recursive: true });
cpSync("package.json", `${DIST}/package.json`);
cpSync("package-lock.json", `${DIST}/package-lock.json`);
cpSync(".env.example", `${DIST}/.env.example`);
cpSync("build", `${DIST}/build`, { recursive: true });

execSync("npm ci --omit=dev", { cwd: DIST, stdio: "inherit" });

console.log("\nDist ready: ./dist/");
console.log("  1. Rename .env.example to .env and fill in the values");
console.log("  2. Run: npm run start");
