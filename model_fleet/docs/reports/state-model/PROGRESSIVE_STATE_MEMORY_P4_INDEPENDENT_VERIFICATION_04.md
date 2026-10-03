# Progressive State Memory P4 — Independent Verification 04

Status: REPAIR_REQUIRED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Verified HEAD: `741d4c2bdca35d0ce47424c859e7a6084ce70f0f`
Verified: 2026-10-03
Repair candidate: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P4_RESPONSE_04.md`
Prior verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P4_INDEPENDENT_VERIFICATION_03.md`

## Verdict

The third P4 repair closes the declared event-kind/source-policy/provenance-vocabulary and watermark falsifiers. P4 remains REPAIR_REQUIRED because parsed `establishedBy` metadata is still not fully constrained to records that could actually have passed accepted P1 admission.

P5 must remain PENDING.

## Passing evidence

- P4 focused: 15/15 PASS
- P1-P4 combined: 43/43 PASS
- full extension suite: 328/328 PASS
- syntax / durable DAG / git diff checks: PASS
- wrong establishing event kind: rejected
- unauthorized source kind: rejected
- watermark sequence regression: rejected
- watermark time regression: rejected
- omitted latest event watermark: accepted as intended

## Blocking falsifier — parsed provenance metadata not P1-attainable

P4 now validates event/source/provenance vocabularies, but it does not yet reproduce the accepted P1 identity/provenance admission invariants for the embedded establishing event metadata.

Independent probes on a valid goal capsule:

- `establishedBy.eventId = " bad id "` -> FAIL_ACCEPTED
- `establishedBy.source.id = " bad id "` -> FAIL_ACCEPTED
- `establishedBy.provenance = []` -> FAIL_ACCEPTED
- duplicate identical provenance entry -> FAIL_ACCEPTED

All four records are impossible under accepted P1:

- P1 event/source IDs must satisfy the canonical identifier grammar;
- P1 provenance is mandatory/non-empty;
- P1 rejects duplicate provenance identities.

A serialized capsule that parses successfully must not claim an establishing event that could never have existed in the authoritative P1 ledger.

## Required bounded repair

Stay in P4. Do not start P5.

1. Reuse or exactly mirror the accepted P1 identifier grammar for `establishedBy.eventId` and `establishedBy.source.id`.
2. Require `establishedBy.provenance` to be non-empty.
3. Reject duplicate provenance entries using the same `(kind, ref, digest)` identity as P1.
4. Preserve existing kind/source-policy/provenance-vocabulary checks and watermark lower-bound behavior.
5. Add parser adversarial tests for invalid event ID, invalid source ID, empty provenance, and duplicate provenance.
6. Keep all existing P4 boundaries and prior repairs unchanged.

No P5/P6 work, runtime wiring, persistence, commit, push, merge, deploy, reload, or live storage mutation is authorized.
