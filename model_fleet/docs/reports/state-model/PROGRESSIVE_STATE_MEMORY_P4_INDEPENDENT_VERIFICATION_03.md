# Progressive State Memory P4 — Independent Verification 03

Status: REPAIR_REQUIRED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Verified HEAD: `741d4c2bdca35d0ce47424c859e7a6084ce70f0f`
Verified: 2026-10-03
Repair candidate: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P4_RESPONSE_03.md`
Prior verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P4_INDEPENDENT_VERIFICATION_02.md`

## Verdict

The second P4 repair successfully closes wrapper/fact identity mismatch and duplicate selected IDs. P4 remains REPAIR_REQUIRED because parsed selected-fact provenance and watermark consistency are still only shape-checked, allowing impossible P2/P3 projections.

P5 must remain PENDING.

## Passing evidence

- P4 focused: 12/12 PASS
- P1-P4 combined: 40/40 PASS
- full extension suite: 325/325 PASS, 0 failed, 0 skipped
- P1-P4 syntax: PASS
- durable DAG assertions: PASS
- git diff --check: PASS
- goal/frontier/constraint/task/message/decision/evidence wrapper mismatches: rejected
- duplicate task wrapper ID: rejected

## Blocking falsifier 1 — establishing event kind/source can contradict the fact

P4 validates the shape of `fact.establishedBy` but does not bind its event kind/source to accepted P1/P2 semantics.

Independent probes on a valid goal capsule:

- change `goal.fact.establishedBy.kind` from `goal.changed` to `task.accepted` -> FAIL_ACCEPTED
- change `goal.fact.establishedBy.source.kind` from `operator` to `report` -> FAIL_ACCEPTED

A P2 goal fact cannot be established by `task.accepted`, and P1 does not authorize `report` as a source for `goal.changed`.

## Blocking falsifier 2 — watermark can regress below selected facts

A valid capsule watermark was replaced with `{ sequence: 0, eventId: null, at: 0 }` while selected facts were established by later positive-sequence events.

Observed:

`WATERMARK_REGRESSION=FAIL_ACCEPTED`

This violates P4's claimed watermark binding and permits an internally impossible restart capsule.

## Repository drift authentication

HEAD moved during verification from `6ee3bf81...` to `741d4c2b...` via commit `fix(model-fleet): self-heal stale worker registration`.

Changed paths were limited to:
- `extension/background.js`
- `extension/fleet-state-model-m7-c2.js`
- `extension/fleet-worker.js`
- `extension/tests/worker-liveness-recovery.test.cjs`

No PSM source/test/report/DAG path was changed by that commit.

## Required bounded repair

Stay in P4. Do not start P5.

1. Reuse accepted P1 event/source policy semantics in P4 validation.
2. Bind fact type to allowed establishing event kind:
   - goal -> `goal.changed`
   - frontier -> `frontier.changed`
   - constraint -> `constraint.accepted`
   - task -> `task.accepted` | `task.blocked` | `task.completed`
   - message -> `message.accepted`
   - artifact -> `artifact.accepted`
   - evidence -> `evidence.linked`
   - decision -> `operator.decision`.
3. Require establishedBy.source.kind to be allowed by P1 EVENT_SOURCE_POLICY for that event kind, and require P1 source/provenance vocabularies.
4. Enforce watermark lower-bound consistency against every selected fact: watermark.sequence >= establishedBy.sequence and watermark.at >= establishedBy.at.
5. Do not require watermark.eventId to be selected; the latest admitted event may be outside the working set.
6. Preserve all already-fixed nested schemas, identity binding, duplicate IDs, selection reasons, literal text, deterministic rendering, round-trip, byte sizing, and budget behavior.

No P5/P6 work, runtime wiring, persistence, commit, push, merge, deploy, reload, or live storage mutation is authorized.
