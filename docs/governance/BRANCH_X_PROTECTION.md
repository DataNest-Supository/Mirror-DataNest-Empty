# BRANCH-X Protection Tree

BRANCH-X is the repository-native branch governance layer for Mirror-Nest.

From initialization onward, `main` and `release/**` are canonical branches. Canonical adoption requires a pull request, one approving review, stale-approval dismissal, conversation resolution, linear history, and passing `BRANCH-X Protection Tree` plus `Mirror-Nest Validation Tree` checks. Force-pushes and deletion are prohibited for canonical branches.

The BRANCH-X workflow verifies the policy continuously. The Mirror-Nest validation workflow verifies the exchange contract, lineage, authority boundaries, and required repository control plane.

GitHub-native branch protection/rulesets remain the authoritative host-level enforcement layer when administration credentials are available. A missing native setting is treated as a protection gap, not as compliance.

Mirror-Nest itself has no canonical production, production-backend, or automatic promotion authority.
