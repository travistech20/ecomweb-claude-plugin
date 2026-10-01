// Checks the marketplace and plugin structure Claude Code expects, plus our
// own rules. Exits non-zero with every problem listed.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const problems = [];
const fail = (msg) => problems.push(msg);
const readJson = (rel) => {
  const file = path.join(root, rel);
  if (!existsSync(file)) {
    fail(`missing ${rel}`);
    return null;
  }
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch (e) {
    fail(`${rel}: invalid JSON (${e.message})`);
    return null;
  }
};
const frontmatter = (file) => /^---\n([\s\S]*?)\n---\n/.exec(readFileSync(file, "utf8"))?.[1] ?? null;
const field = (front, name) => new RegExp(`^${name}:\\s*(.+)$`, "m").exec(front ?? "")?.[1]?.trim();

const market = readJson(".claude-plugin/marketplace.json");
if (market) {
  if (!market.name) fail("marketplace.json: name is required");
  if (!market.owner?.name) fail("marketplace.json: owner.name is required");
  if (!Array.isArray(market.plugins) || !market.plugins.length) fail("marketplace.json: plugins[] is required");
  for (const p of market.plugins ?? []) {
    const dir = path.join(root, p.source ?? "");
    if (!p.name || !p.source) fail(`marketplace.json: plugin needs name and source`);
    else if (!existsSync(path.join(dir, ".claude-plugin/plugin.json"))) fail(`${p.source}: missing .claude-plugin/plugin.json`);
  }
}

const pluginDir = "plugins/ecomweb";
const plugin = readJson(`${pluginDir}/.claude-plugin/plugin.json`);
if (plugin) {
  if (plugin.name !== "ecomweb") fail(`plugin.json: name must be "ecomweb"`);
  if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(plugin.version ?? "")) fail("plugin.json: version must be semver");
  if (!plugin.description) fail("plugin.json: description is required");
}

const commandsDir = path.join(root, pluginDir, "commands");
const commands = existsSync(commandsDir) ? readdirSync(commandsDir).filter((f) => f.endsWith(".md")) : [];
for (const name of ["new.md", "check.md", "update.md"]) if (!commands.includes(name)) fail(`missing commands/${name}`);
for (const name of commands) {
  if (!field(frontmatter(path.join(commandsDir, name)), "description")) fail(`commands/${name}: frontmatter description is required`);
}

const skill = path.join(root, pluginDir, "skills/ecomweb/SKILL.md");
if (!existsSync(skill)) fail("missing skills/ecomweb/SKILL.md");
else {
  const front = frontmatter(skill);
  if (field(front, "name") !== "ecomweb") fail("skills/ecomweb/SKILL.md: name must be ecomweb");
  if (!field(front, "description")) fail("skills/ecomweb/SKILL.md: description is required");
}

// The project skill's name belongs to every storefront project; never define it here.
const walk = (dir) =>
  existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
      )
    : [];
for (const file of walk(path.join(root, pluginDir))) {
  if (file.endsWith("SKILL.md") && field(frontmatter(file), "name") === "ecomweb-storefront") {
    fail(`${path.relative(root, file)}: must not define the ecomweb-storefront skill`);
  }
}

// A command must never start a long-running server: Claude Code's shell would
// block on it, then kill it. The user runs pnpm dev themselves.
for (const name of commands) {
  const text = readFileSync(path.join(commandsDir, name), "utf8");
  if (/storefront init[^\n`]*--dev\b/.test(text)) fail(`commands/${name}: must not pass --dev to storefront init`);
}
// There is no browser login: nothing may promise one.
for (const file of walk(path.join(root, pluginDir)).filter((f) => f.endsWith(".md"))) {
  if (/opens the browser|logs (you|them) in/i.test(readFileSync(file, "utf8"))) {
    fail(`${path.relative(root, file)}: promises a browser login that doesn't exist`);
  }
}

if (problems.length) {
  console.error(problems.map((p) => `- ${p}`).join("\n"));
  process.exit(1);
}
console.log("plugin OK");
