# BRANCH-X Protection Tree

BRANCH-X is the repository-native branch governance layer for Mirror-Nest.

From initialization onward, `main` and `release/**` are canonical branches. Canonical adoption requires a pull request, one approving review, stale-approval dismissal, conversation resolution, linear history, and passing `BRANCH-X Protection Tree` plus `Mirror-Nest Validation Tree` checks. Force-pushes and deletion are prohibited for canonical branches.

The BRANCH-X workflow verifies the policy continuously. The Mirror-Nest validation workflow verifies the exchange contract, lineage, authority boundaries, and required repository control plane.

GitHub-native branch protection/rulesets remain the authoritative host-level enforcement layer when administration credentials are available. A missing native setting is treated as a protection gap, not as compliance.

## Free host-level closure

GitHub confirms that protected branches and repository rulesets are available on GitHub Free for public repositories. The remaining gap is administrative configuration, not a paid-plan requirement.

Create a repository ruleset named **BRANCH-X Canonical** with enforcement set to **Active** and target patterns:

- `main`
- `release/**`

Configure these rules:

- Require a pull request before merging.
- Require at least 1 approving review.
- Dismiss stale pull-request approvals when new commits are pushed.
- Require conversation resolution before merging.
- Require the following status checks:

```
BRANCH-X Protection Tree
Mirror-Nest Validation Tree
Mirror-Nest Intake Gate
```

- Require linear history.
- Block force pushes.
- Restrict deletions.
- Do not configure any bypass actors unless an explicit governance exception is later approved.

Create a second ruleset named **BRANCH-X Automation** for:

- `automation/**`
- `audit/**`
- `ci/**`

Configure it to block force pushes and deletions, require conversation resolution, and require the same three status checks.

Leave ordinary development branches outside these rulesets.

## Verification after configuration

After saving the rulesets, verify that the repository exposes the active rulesets and that their target patterns and rules match `config/branch-protection.tree.json`.

The BRANCH-X and Mirror-Nest workflows should remain green. A missing or drifted native rule must continue to be treated as a protection gap rather than compliance.

Mirror-Nest itself has no canonical production, production-backend, or automatic promotion authority.
