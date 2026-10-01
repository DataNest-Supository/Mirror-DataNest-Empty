# Mirror-Nest

Mirror-Nest (`DataNest-Supository/MirrorNest`) is the lightweight mirror-exchange surface for the DataNest estate.

It is intentionally **not** a second production system of record. Its functions are:

- canonical DataNest snapshot lineage
- mirror provenance and evidence
- deterministic contract validation
- controlled candidate handoff into governed DataNest review

## Authority boundary

- Canonical source: `DataNest-Supository/DataNest`
- Mirror exchange: `DataNest-Supository/MirrorNest`
- Production authority: DataNest only
- Canonical release authority: DataNest only
- Automatic reverse promotion: disabled
- Production secrets and live backend state: excluded

## Core contracts

- `config/mirror-nest.policy.json` — machine-readable role and boundary policy
- `config/mirror-nest.manifest.json` — current declared canonical source snapshot
- `.datanest/coordination/canonical-lineage.json` — provenance record
- `.github/workflows/mirror-nest-validation.yml` — functional validation gate
- `config/branch-protection.tree.json` — BRANCH-X branch governance
- `docs/MIRROR_NEST_FUNCTIONS.md` — operating model
- `config/mirror-nest-intake.contract.json` — accepted/forbidden intake contract
- `.github/workflows/mirror-nest-intake.yml` — pre-handoff intake gate

## Directories

- `snapshots/` — declared mirror snapshot material
- `handoff/` — owner-directed candidate material for governed review
- `evidence/` — validation and provenance evidence

Mirror-Nest exchanges evidence and candidate material; it does not decide canonical adoption.
