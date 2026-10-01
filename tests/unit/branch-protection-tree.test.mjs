import test from "node:test";
import assert from "node:assert/strict";
import { classifyBranch, assertPolicyShape } from "../../scripts/branch-protection-tree.mjs";
test("main is canonical",()=>assert.equal(classifyBranch("main").name,"canonical"));
test("release branches are canonical",()=>assert.equal(classifyBranch("release/example").name,"canonical"));
test("automation branches are protected",()=>assert.equal(classifyBranch("automation/example").name,"protected_automation"));
test("ordinary branches remain ordinary",()=>assert.equal(classifyBranch("feat/example").name,"ordinary"));
test("canonical policy retains hard protection floors",()=>{assert.doesNotThrow(assertPolicyShape);const p=classifyBranch("main").policy;assert.equal(p.pullRequestRequired,true);assert.equal(p.requiredApprovingReviews,1);assert.equal(p.dismissStaleReviews,true);assert.equal(p.requireConversationResolution,true);assert.equal(p.requireLinearHistory,true);assert.equal(p.allowForcePushes,false);assert.equal(p.allowDeletions,false);assert.equal(p.enforceAdmins,true);assert.ok(p.requiredStatusChecks.includes("BRANCH-X Protection Tree"));});
