// Rewrites `startupBytes` in loader.html: for each app folder, the decoded size of
// the .wasm, .js and .part-* files it downloads before it runs. Run it after
// replacing an app: node scripts/loader-sizes.mjs
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
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
const next = Object.fromEntries(Object.keys(current).map((app) => {
  const dir = path.join(root, app);
  const pointer = path.join(dir, "current-build.json");
  const active = existsSync(pointer) ? path.resolve(dir, JSON.parse(readFileSync(pointer, "utf8")).path) : dir;
  if (active !== dir && !active.startsWith(dir + path.sep)) throw new Error("Build path must stay inside its app");
  return [app, startupBytes(active)];
}));
writeFileSync(loader, html.replace(/const startupBytes = \{[^}]*\};/, `const startupBytes = ${JSON.stringify(next)};`));
console.log(next);
