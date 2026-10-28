import { readFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const atRoot = (path) => resolve(root, path);

const required = [
  "START-HERE.md", "installer.md", "OPERATIONS-MANUAL.md", "README.md",
  "VERSION", "CHANGELOG.md", "kit.json", "package.json", "ledger/follow-ups.md",
  "skills/inbox/SKILL.md", "skills/inbox/scripts/ledger-report.mjs",
  "skills/inbox/workflows/triage.md", "skills/inbox/workflows/backlog-sweep.md",
  "skills/inbox/workflows/draft-reply.md", "skills/inbox/workflows/whos-waiting.md",
  "skills/inbox/workflows/follow-up-report.md", "examples/01-hvac-backlog-sweep.md",
  "examples/02-bookkeeper-single-triage.md",
];

try {
  await Promise.all(required.map((path) => access(atRoot(path))));
  const version = (await readFile(atRoot("VERSION"), "utf8")).trim();
  const manifest = JSON.parse(await readFile(atRoot("kit.json"), "utf8"));
  const pkg = JSON.parse(await readFile(atRoot("package.json"), "utf8"));
  const installer = await readFile(atRoot("installer.md"), "utf8");
  const changelog = await readFile(atRoot("CHANGELOG.md"), "utf8");
  if (manifest.version !== version || pkg.version !== version || !installer.includes(`**Version:** ${version}`) || !changelog.includes(`## [${version}]`)) throw new Error(`version drift around ${version}`);
  const buyerFiles = await Promise.all(required.filter((path) => path.endsWith(".md") || path.endsWith(".json")).map((path) => readFile(atRoot(path), "utf8")));
  if (buyerFiles.some((text) => /\bbun(?:\s+run|\s+test|x\s)/i.test(text))) throw new Error("buyer-facing Bun command found");
  console.log(`PASS inbox-follow-up@${version}: ${required.length} required files, versions aligned, no buyer Bun commands`);
} catch (error) {
  console.error(`ERROR verify-install: ${error.message}`);
  process.exitCode = error.code === "ENOENT" ? 3 : 1;
}
