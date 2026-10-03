# Progressive State Memory P7 — Independent Verification 01

Status: REPAIR_REQUIRED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Verified HEAD: `741d4c2bdca35d0ce47424c859e7a6084ce70f0f`
Verified: 2026-10-03
Candidate report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P7_RESPONSE_01.md`

## Verdict

P7 is not independently accepted. Focused P7 and combined P1-P7 regressions are green, and the reported full-suite failure is indeed an unrelated stale source-substring assertion. However, independent falsification found three P7-owned semantic/validator defects.

P8 must remain PENDING.

## Passing evidence

- P7 focused: 8/8 PASS
- P1-P7 combined: 68/68 PASS
- P7 syntax: PASS
- git diff --check: PASS
- invalid P6 chain, metadata-only edges, missing-reference preservation, deduplication, immutability, and existing forged-index tests pass.

## External full-suite blocker independently confirmed

`extension/tests/worker-liveness-recovery.test.cjs` still asserts the removed literal:

`busy: !!active || !!pendingCompletion || isStreaming()`

while the current pre-existing dirty `fleet-worker.js` computes:

`const busy = !!active || !!pendingCompletion || isStreaming();`

inside `sampleTurnLiveness()` and spreads the liveness object into heartbeat/bridge responses.

Focused worker-liveness result: 14/15 PASS; the only failure is that stale source-substring assertion. P7 modifies neither file.

## Blocking P7 falsifier 1 — observed supersession target need not be prior

P1 admits `supersedes` only when the target event is already in prior history. P7 can observe both source and target establishing events, so it must preserve that invariant when both ends are present.

Independent chain:

- target `goal-1` observed at establishing sequence 1;
- later checkpoint contains source `goal-2`, but forged source establishing sequence is also 1;
- source explicitly supersedes `goal-1`;
- P4/P5/P6 accept the locally-shaped chain;
- P7 accepts it and emits the supersession edge plus negative memory.

Observed:

`SUPERSEDES_NONPRIOR_TARGET=FAIL_ACCEPTED`

P7 must reject an observed supersession edge unless source sequence > target sequence and source time >= target time.

## Blocking P7 falsifier 2 — observed conflict target need not be prior

P1 also requires every `conflictsWith` target to refer to a prior event.

Independent chain with source and target both at establishing sequence 1 produced:

`CONFLICT_NONPRIOR_TARGET=FAIL_ACCEPTED`

P7 emitted an unresolved conflict edge instead of rejecting the impossible observed relation.

When both ends are observed, P7 must require source sequence > target sequence and source time >= target time for conflicts too. Missing targets remain unresolved references because their ordering cannot be proven locally.

## Blocking P7 falsifier 3 — fixed goal/frontier identities are forgeable in standalone validator

`validateSupersessionConflictIndexV1()` accepts an observed goal version whose wrapper `factId` is changed from canonical `goal` to `not-goal` while its typed goal fact is otherwise valid.

Observed:

`FORGED_GOAL_FACT_ID=FAIL_ACCEPTED`

The validator must enforce `factType=goal -> factId=goal` and `factType=frontier -> factId=frontier`, matching P4/P7 build semantics.

## Required bounded repair

Stay in P7. Do not start P8.

1. When a supersedes target is observed, require the source establishing event to be strictly later by P1 sequence (`source.sequence > target.sequence`) and nondecreasing in event time (`source.at >= target.at`). Reject otherwise.
2. Apply the same observed-prior invariant to each observed conflictsWith target.
3. Do not apply this ordering rejection to missing targets; preserve them as unresolved references for P8/archive hydration later.
4. Enforce fixed fact identities in the validator:
   - goal -> `goal`
   - frontier -> `frontier`.
5. Add adversarial tests for equal/lower source sequence on observed supersession/conflict targets and forged goal/frontier fact IDs.
6. Preserve all current explicit-relation-only semantics, negative memory, conflict classification, deduplication, deterministic ordering, P6 verification, and no-P8 boundary.
7. Do not modify `fleet-worker.js` or `worker-liveness-recovery.test.cjs` as part of the P7 semantic repair. That unrelated full-suite blocker will be handled separately after the P7 repair candidate is independently clean.

No hydration, runtime wiring, persistence, commit, push, merge, deploy, or reload is authorized.
