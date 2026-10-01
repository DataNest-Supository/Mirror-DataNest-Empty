import test from "node:test";
import assert from "node:assert/strict";
import { validateMirrorNest } from "../../scripts/mirror-nest-validate.mjs";

test("Mirror-Nest remains a non-production mirror exchange surface", () => {
  const evidence = validateMirrorNest();
  assert.equal(evidence.role, "mirror-exchange");
  assert.equal(evidence.productionAuthority, false);
  assert.equal(evidence.automaticPromotion, false);
  assert.match(evidence.canonicalSource, /^DataNest-Supository\/DataNest@/);
});
