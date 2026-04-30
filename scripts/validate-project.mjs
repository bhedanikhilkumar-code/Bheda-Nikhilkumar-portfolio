import { readFileSync } from "node:fs";
import { access } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "src/app.js",
  "src/data.js",
  "src/portfolio.js",
  "src/styles.css",
  "tests/portfolio.test.mjs",
  "package.json",
  ".github/workflows/app-quality.yml",
  ".github/workflows/repository-health.yml",
  "README.md",
  "docs/ARCHITECTURE.md",
  "docs/QUALITY.md",
];

const missing = [];
for (const file of requiredFiles) {
  try {
    await access(file);
  } catch {
    missing.push(file);
  }
}

if (missing.length) {
  console.error("Missing required portfolio files:");
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

const readme = readFileSync("README.md", "utf8");
const readmeChecks = [
  "Working Portfolio Website",
  "npm test",
  "app-quality.yml",
  "src/portfolio.js",
  "Featured Projects",
];
const failedReadmeChecks = readmeChecks.filter((token) => !readme.includes(token));
if (failedReadmeChecks.length) {
  console.error("README is missing expected portfolio details:");
  for (const token of failedReadmeChecks) console.error(`- ${token}`);
  process.exit(1);
}

console.log("Portfolio project validation passed.");
