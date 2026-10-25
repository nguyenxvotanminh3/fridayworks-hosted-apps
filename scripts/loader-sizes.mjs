// Rewrites `startupBytes` in loader.html: for each app folder, the decoded size of
// the .wasm, .js and .part-* files it downloads before it runs. Run it after
// replacing an app: node scripts/loader-sizes.mjs
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const counted = /\.(?:wasm|js)$|\.part-[a-z]+$/;

function startupBytes(dir) {
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "licenses") total += startupBytes(file);
    else if (entry.isFile() && counted.test(entry.name)) total += statSync(file).size;
  }
  return total;
}

const loader = path.join(root, "loader.html");
const html = readFileSync(loader, "utf8");
const current = JSON.parse(html.match(/const startupBytes = (\{[^}]*\});/)[1]);
const next = Object.fromEntries(Object.keys(current).map((app) => [app, startupBytes(path.join(root, app))]));
writeFileSync(loader, html.replace(/const startupBytes = \{[^}]*\};/, `const startupBytes = ${JSON.stringify(next)};`));
console.log(next);
