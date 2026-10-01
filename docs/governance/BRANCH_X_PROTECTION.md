# BRANCH-X Protection Tree

BRANCH-X is the repository-native branch governance layer for Mirror-DataNest-Empty.

From initialization onward, `main` and `release/**` are canonical branches. Canonical adoption requires a pull request, one approving review, stale-approval dismissal, conversation resolution, linear history, and a passing `BRANCH-X Protection Tree` check. Force-pushes and deletion are prohibited for canonical branches.

The workflow and unit contract verify these requirements continuously. GitHub-native branch protection/rulesets remain the authoritative host-level enforcement layer when administration credentials are available. A missing native setting is treated as a protection gap, not as compliance.
