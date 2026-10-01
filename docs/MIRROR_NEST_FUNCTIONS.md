# Mirror-Nest Functions

Mirror-Nest is the lightweight mirror-exchange repository in the DataNest estate.

## Functions

### Canonical snapshot intake
Record an explicitly identified DataNest main commit as mirror lineage. Full commit SHA is mandatory.

### Provenance and evidence
Maintain source identity, mirror identity, validation state, and handoff evidence. These records do not confer production authority.

### Contract validation
Run the Mirror-Nest Validation Tree against repository identity, lineage, boundary rules, manifest shape, and governance controls.

### Controlled handoff
Use handoff/ for candidate material prepared for explicit review and adoption by the governed DataNest repository. Automatic reverse promotion is disabled.

### Authority separation
Mirror-Nest does not own canonical production deployment, production backend writes, canonical governance, secrets, or direct pushes into DataNest.

## Layout

- snapshots/ — declared mirror snapshot material and references
- handoff/ — candidate material for governed review
- evidence/ — validation and lineage evidence
- config/ — machine-readable repository contracts
- scripts/ — deterministic validators
- .datanest/coordination/ — canonical lineage records

Mirror-Nest is an exchange and evidence surface, not a second system of record.


## Intake rules

All proposed Mirror-Nest changes pass the intake contract before governed adoption.

Accepted material must remain under the declared repository control, snapshot, handoff, evidence, or documentation roots. Credential files, environment files, private keys, database files, live backend state, and similar sensitive runtime state are rejected.

A handoff identifies its canonical DataNest commit, source path, destination repository, validation evidence, and explicit non-automatic adoption mode. The handoff contract cannot authorize production on its own.
