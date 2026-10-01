import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const contract = JSON.parse(readFileSync("config/mirror-nest-intake.contract.json", "utf8"));
const snapshot = JSON.parse(readFileSync("snapshots/SNAPSHOT-TEMPLATE.json", "utf8"));
const handoff = JSON.parse(readFileSync("handoff/HANDOFF-TEMPLATE.json", "utf8"));
const evidence = JSON.parse(readFileSync("evidence/EVIDENCE-TEMPLATE.json", "utf8"));

test("intake contract identifies canonical DataNest", () => {
  assert.equal(contract.repository, "DataNest-Supository/MirrorNest");
  assert.equal(contract.handoff.destinationRepository, "DataNest-Supository/DataNest");
});

test("snapshot template is provenance-shaped and non-production", () => {
  assert.equal(snapshot.kind, "mirror-snapshot");
  assert.match(snapshot.canonicalSha, /^[0-9a-f]{40}$/);
  assert.equal(snapshot.scope.secretsIncluded, false);
  assert.equal(snapshot.scope.backendStateIncluded, false);
});

test("handoff template cannot auto-promote", () => {
  assert.equal(handoff.kind, "governed-handoff");
  assert.equal(handoff.destinationRepository, "DataNest-Supository/DataNest");
  assert.equal(handoff.automaticPromotion, false);
});

test("evidence template preserves authority separation", () => {
  assert.equal(evidence.kind, "validation-evidence");
  assert.equal(evidence.canonicalRepository, "DataNest-Supository/DataNest");
});
