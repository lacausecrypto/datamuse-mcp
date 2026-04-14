import { readFileSync } from "node:fs";

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

const pkg = readJson(new URL("../package.json", import.meta.url));
const server = readJson(new URL("../server.json", import.meta.url));

const errors = [];
const warnings = [];

if (!pkg.name) {
  errors.push("package.json: missing 'name'.");
}

if (!pkg.version) {
  errors.push("package.json: missing 'version'.");
}

if (!pkg.mcpName) {
  errors.push("package.json: missing 'mcpName'.");
}

if (typeof pkg.mcpName === "string" && pkg.mcpName.includes("YOUR_GITHUB_USERNAME")) {
  errors.push("package.json: replace placeholder in 'mcpName' before publishing.");
}

if (typeof pkg.repository?.url === "string" && pkg.repository.url.includes("YOUR_GITHUB_USERNAME")) {
  errors.push("package.json: replace placeholder in 'repository.url' before publishing.");
}

if (pkg.mcpName !== server.name) {
  errors.push("Mismatch: package.json 'mcpName' must equal server.json 'name'.");
}

if (pkg.version !== server.version) {
  errors.push("Mismatch: package.json 'version' must equal server.json 'version'.");
}

if (server.repository?.source !== "github") {
  warnings.push("server.json: 'repository.source' is not 'github'.");
}

const npmPackage = Array.isArray(server.packages)
  ? server.packages.find((p) => p?.registryType === "npm")
  : undefined;

if (!npmPackage) {
  errors.push("server.json: missing npm package entry in 'packages'.");
} else {
  if (npmPackage.identifier !== pkg.name) {
    errors.push("Mismatch: server.json npm package 'identifier' must equal package.json 'name'.");
  }
  if (npmPackage.version !== pkg.version) {
    errors.push("Mismatch: server.json npm package 'version' must equal package.json 'version'.");
  }
  if (npmPackage.transport?.type !== "stdio") {
    errors.push("server.json: npm package transport.type must be 'stdio'.");
  }
}

if (typeof server.name === "string" && server.name.includes("YOUR_GITHUB_USERNAME")) {
  errors.push("server.json: replace placeholder in 'name' before publishing.");
}

if (typeof server.repository?.url === "string" && server.repository.url.includes("YOUR_GITHUB_USERNAME")) {
  errors.push("server.json: replace placeholder in 'repository.url' before publishing.");
}

if (errors.length > 0) {
  console.error("Release checks failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  if (warnings.length > 0) {
    console.error("Warnings:");
    for (const warning of warnings) {
      console.error(`- ${warning}`);
    }
  }
  process.exit(1);
}

if (warnings.length > 0) {
  console.warn("Release check warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

console.log("Release checks passed.");
