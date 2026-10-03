# Progressive State Memory P2 — Independent Verification 01

Status: REPAIR_REQUIRED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Baseline/current HEAD: `6ee3bf81a9700c4c3a3b5b00851f911585512248`
Verified: 2026-10-03
Candidate report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P2_RESPONSE_01.md`

## Verdict

P2 is not independently accepted. The P1/P2 focused tests, full extension suite, syntax checks, durable-state assertions, and diff hygiene are green, but independent falsification found a canonical-authority break in the public state-validation/reduceEvent path.

P3 must remain PENDING.

## Passing evidence

- P2 focused: 7/7 PASS
- P1+P2 focused: 21/21 PASS
- full extension suite: 300/300 PASS
- P1/P2 syntax: PASS
- durable PSM JSON/status assertions: PASS
- git diff --check: PASS

The P2 module remains isolated from background/runtime/live storage.

## Blocking falsifier — forged materialized state accepted as canonical

P2 stores both the admitted event history under `state.provenance.acceptedEvents` and materialized current facts such as `state.goal` and `state.tasks`.
The accepted design requires the reducer to be the only authority for current truth. Materialized facts therefore must be provably derived from the admitted history.

Independent probe:
1. Build a valid ledger with `goal.changed -> canonical`.
2. Reduce it to a valid P2 state.
3. Modify only `state.goal.goal` to `FORGED`, leaving accepted history/watermark unchanged.
4. Call `validateState(forged)`.
5. Call `reduceEvent(forged, valid next event)`.

Observed:
- `FORGED_FACT_VALIDATE=FAIL_ACCEPTED`
- `FORGED_BASE_REDUCE=FAIL_ACCEPTED:FORGED`

The forged materialized fact survives into subsequent reduction even though accepted event history still says `canonical`.

This creates a second writable truth path: ledger -> reducer -> facts, and caller-edited CanonicalState -> reduceEvent -> future facts.
That violates the invariant that one canonical reducer determines current state.

## Additional structural falsifier

An unknown top-level state field was accepted:
- input: `state.unauthorized = second-authority`
- observed: `EXTRA_STATE_FIELD_VALIDATE=FAIL_ACCEPTED`

`validateState` does not enforce an exact canonical state shape.

## Required bounded repair

Stay in P2. Do not start P3.

1. Make `validateState` prove that supplied CanonicalStateV1 equals the deterministic projection of its own accepted-event history, or otherwise restrict/remove the incremental state-input path so materialized facts cannot be authored independently of replay.
2. Reject unknown top-level and nested canonical-state fields.
3. Ensure `reduceEvent` cannot extend a forged/inconsistent state.
4. Add adversarial tests that mutate goal/frontier/task facts while history is unchanged and require rejection; inject unknown state fields and require rejection; prove valid replayed state still supports incremental reduction; and prove incremental reduction equals full replay after each event.
5. Preserve P1 authority, P2 isolation, determinism, semantic payload contracts, provenance, and watermarks.
6. Do not implement P3 or later nodes.

No commit/push/deploy/reload/live storage mutation is authorized.
