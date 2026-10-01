import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const readJson = (name) => JSON.parse(readFileSync(path.join(ROOT, name), "utf8"));
const policy = readJson("config/mirror-nest.policy.json");
const manifest = readJson("config/mirror-nest.manifest.json");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

export function validateMirrorNest() {
  assert(policy.schemaVersion === "mirror-nest-v1", "unsupported Mirror-Nest policy schema");
  assert(policy.repository === "DataNest-Supository/MirrorNest", "repository identity mismatch");
  assert(policy.canonicalRepository === "DataNest-Supository/DataNest", "canonical repository mismatch");
  assert(policy.authorities.production === false, "Mirror-Nest cannot be production authority");
  assert(policy.authorities.canonicalRelease === false, "Mirror-Nest cannot be canonical release authority");
  assert(policy.boundaries.canonicalDirectPush === false, "canonical direct push must remain forbidden");
  assert(policy.boundaries.productionSecrets === false, "production secrets must remain forbidden");
  assert(policy.boundaries.reverseAutomaticSync === false, "automatic reverse sync must remain disabled");
  assert(manifest.source.repository === policy.canonicalRepository, "manifest source must equal canonical repository");
  assert(manifest.source.branch === "main", "canonical source branch must remain main");
  assert(/^[0-9a-f]{40}$/.test(manifest.source.sha), "manifest source SHA must be a full commit SHA");
  assert(manifest.scope.productionArtifactsIncluded === false, "production artifacts are outside Mirror-Nest scope");
  assert(manifest.scope.secretsIncluded === false, "secrets are outside Mirror-Nest scope");
  assert(manifest.scope.backendStateIncluded === false, "backend state is outside Mirror-Nest scope");
  assert(manifest.handoff.automaticPromotion === false, "automatic promotion must remain disabled");

  const required = [
    ".github/workflows/branch-protection-tree.yml",
    ".github/workflows/mirror-nest-validation.yml",
    ".github/workflows/mirror-nest-intake.yml",
    ".github/CODEOWNERS",
    "config/branch-protection.tree.json",
    "config/mirror-nest.policy.json",
    "config/mirror-nest.manifest.json",
    "config/mirror-nest-intake.contract.json",
    "scripts/branch-protection-tree.mjs",
    "tests/unit/branch-protection-tree.test.mjs",
    "tests/unit/mirror-nest-contract.test.mjs",
    "tests/unit/mirror-nest-intake.test.mjs",
    "docs/governance/BRANCH_X_PROTECTION.md",
    "docs/MIRROR_NEST_FUNCTIONS.md"
  ];
  const missing = required.filter((p) => !existsSync(path.join(ROOT, p)));
  assert(missing.length === 0, "Mirror-Nest required files missing: " + missing.join(", "));

  return {
    schemaVersion: policy.schemaVersion,
    repository: policy.repository,
    canonicalSource: manifest.source.repository + "@" + manifest.source.sha,
    role: policy.role,
    automaticPromotion: manifest.handoff.automaticPromotion,
    productionAuthority: policy.authorities.production
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  console.log(JSON.stringify(validateMirrorNest(), null, 2));
}
