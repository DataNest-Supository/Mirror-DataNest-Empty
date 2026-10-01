import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTRACT = JSON.parse(
  readFileSync(path.join(ROOT, "config/mirror-nest-intake.contract.json"), "utf8")
);

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

function changedFiles(base, head) {
  const out = execFileSync(
    "git",
    ["diff", "--name-only", "--diff-filter=ACMR", base + "..." + head],
    { cwd: ROOT, encoding: "utf8" }
  );
  return out.split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
}

function forbidden(file) {
  return CONTRACT.forbiddenPatterns.some((pattern) => new RegExp(pattern, "i").test(file));
}

function allowed(file) {
  if (forbidden(file)) return false;
  return CONTRACT.acceptedRoots.some((root) => file.startsWith(root));
}

function validateJsonTemplate(relativePath, requiredFields, expectedKind) {
  assert(existsSync(path.join(ROOT, relativePath)), "missing " + relativePath);
  const value = JSON.parse(readFileSync(path.join(ROOT, relativePath), "utf8"));
  for (const field of requiredFields) assert(Object.prototype.hasOwnProperty.call(value, field), relativePath + " missing " + field);
  assert(value.kind === expectedKind, relativePath + " kind mismatch");
  assert(value.canonicalRepository === "DataNest-Supository/DataNest", relativePath + " canonical repository mismatch");
  assert(/^[0-9a-f]{40}$/.test(value.canonicalSha), relativePath + " canonicalSha must be a full SHA");
  return value;
}

export function validateIntake({ base = process.env.GITHUB_BASE_SHA, head = process.env.GITHUB_HEAD_SHA } = {}) {
  assert(base && head, "GITHUB_BASE_SHA and GITHUB_HEAD_SHA are required for intake validation");
  const files = changedFiles(base, head);

  for (const file of files) {
    assert(allowed(file), "Mirror-Nest intake rejected path: " + file);
  }

  validateJsonTemplate(
    "snapshots/SNAPSHOT-TEMPLATE.json",
    CONTRACT.snapshot.requiredFields,
    CONTRACT.snapshot.kind
  );
  validateJsonTemplate(
    "handoff/HANDOFF-TEMPLATE.json",
    CONTRACT.handoff.requiredFields,
    CONTRACT.handoff.kind
  );
  validateJsonTemplate(
    "evidence/EVIDENCE-TEMPLATE.json",
    CONTRACT.evidence.requiredFields,
    CONTRACT.evidence.kind
  );

  const handoffTemplate = JSON.parse(readFileSync(path.join(ROOT, "handoff/HANDOFF-TEMPLATE.json"), "utf8"));
  assert(handoffTemplate.destinationRepository === "DataNest-Supository/DataNest", "handoff destination must remain canonical DataNest");
  assert(handoffTemplate.automaticPromotion === false, "automatic promotion must remain disabled");

  return { base, head, changedFiles: files, result: "pass" };
}

const args = process.argv.slice(2);
const arg = (name) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
};

console.log(JSON.stringify(validateIntake({
  base: arg("--base") ?? process.env.GITHUB_BASE_SHA,
  head: arg("--head") ?? process.env.GITHUB_HEAD_SHA
}), null, 2));
