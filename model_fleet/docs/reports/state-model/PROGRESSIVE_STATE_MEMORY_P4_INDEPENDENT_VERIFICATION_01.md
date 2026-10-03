# Progressive State Memory P4 — Independent Verification 01

Status: REPAIR_REQUIRED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Baseline/current HEAD: `6ee3bf81a9700c4c3a3b5b00851f911585512248`
Verified: 2026-10-03
Candidate report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P4_RESPONSE_01.md`

## Verdict

P4 is not independently accepted. Focused, combined, full-suite, syntax, durable-state, and diff checks all pass, but independent parsing falsification found a nested-schema/history-leak hole.

P5 must remain PENDING.

## Passing evidence

- P4 focused: 9/9 PASS
- P1-P4 combined: 37/37 PASS
- full extension suite: 316/316 PASS, zero failed/skipped
- P4 syntax: PASS
- durable DAG JSON assertions: PASS
- git diff --check: PASS

The alternate determinism concern was also checked: a caller-reordered P2 materialized fact is rejected by P2 as `canonical-state-does-not-match-replay`, so P4 cannot render that forged/reordered state.

## Blocking falsifier — nested accepted-event archive passes parser validation

`parseRestartCapsule()` validates the capsule envelope and selected-entry wrapper, but each selected `fact` is accepted as any plain object.

A crafted capsule containing:

`goal.fact.acceptedEvents = [{ forged: true }]`

passed parsing and validation.

Observed:

`NESTED_ARCHIVE_FACT=FAIL_ACCEPTED`

This violates the explicit P4 contract:

1. unknown top-level/nested fields must fail closed;
2. the restart capsule must not contain the P1 accepted-event archive or an archive path;
3. parse/validate must enforce the typed RestartCapsuleV1 schema, not only its outer wrapper.

The existing top-level-only `acceptedEvents` absence test is insufficient.

## Required bounded repair

Stay in P4. Do not start P5.

1. Make parse/validate enforce the exact allowed nested fact schemas for each capsule slot/collection, or validate parsed selected facts through one reusable accepted P2/P3 fact-shape authority without creating a duplicate semantic authority.
2. Explicitly reject structural `acceptedEvents` archive fields/paths anywhere in parsed capsule structure while continuing to preserve the literal string `acceptedEvents` when it appears only as ordinary domain text.
3. Validate selection reason codes/via shape against the exact P3-produced working-set contract so a parsed capsule cannot invent arbitrary selection semantics.
4. Add adversarial tests for:
   - nested `goal.fact.acceptedEvents` rejection;
   - nested archive-like fields in task/message/constraint/evidence facts rejection;
   - arbitrary selection-code tampering rejection;
   - literal `acceptedEvents` text still preserved;
   - valid build/render/parse round-trip unchanged.
5. Preserve all existing P4 boundaries: no P5 parent/delta semantics, no P6 digest/Merkle semantics, no runtime/persistence wiring.

No commit/push/merge/deploy/reload/live storage mutation is authorized.
