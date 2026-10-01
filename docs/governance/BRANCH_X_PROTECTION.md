# BRANCH-X Protection Tree

BRANCH-X is the repository-native branch governance layer for Mirror-Nest.

From initialization onward, `main` and `release/**` are canonical branches. Canonical adoption requires a pull request, one approving review, stale-approval dismissal, conversation resolution, linear history, and passing `BRANCH-X Protection Tree` plus `Mirror-Nest Validation Tree` checks. Force-pushes and deletion are prohibited for canonical branches.

The BRANCH-X workflow verifies the policy continuously. The Mirror-Nest validation workflow verifies the exchange contract, lineage, authority boundaries, and required repository control plane.

GitHub-native branch protection/rulesets remain the authoritative host-level enforcement layer when administration credentials are available. A missing native setting is treated as a protection gap, not as compliance.

## Free host-level closure

GitHub confirms that repository rulesets and protected branches are available for public repositories on GitHub Free. citeturn718149search4turn718149search6

Import `.github/rulesets/BRANCH-X-Canonical.json` and set it to **Active** for `main` and `release/**`. The definition enforces pull requests, one approval, stale-review dismissal, conversation resolution, the three Mirror-Nest status checks, linear history, no force pushes, and no deletions.

Import `.github/rulesets/BRANCH-X-Automation.json` and set it to **Active** for `automation/**`, `audit/**`, and `ci/**`. This host-level ruleset blocks non-fast-forward updates and branch deletion while retaining direct automation writes. It also carries the protected-automation validation/intake status checks declared in `config/branch-protection.tree.json`; review/conversation-resolution requirements remain scoped to canonical PR changes.

No bypass actors are configured in either definition.
