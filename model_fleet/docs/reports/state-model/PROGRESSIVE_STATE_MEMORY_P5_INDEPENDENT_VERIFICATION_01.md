# Progressive State Memory P5 — Independent Verification 01

Status: REPAIR_REQUIRED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Verified HEAD: `741d4c2bdca35d0ce47424c859e7a6084ce70f0f`
Verified: 2026-10-03
Candidate report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P5_RESPONSE_01.md`

## Verdict

P5 is not independently accepted. All declared focused/combined/full regression gates pass and the normal base/delta/replay/compaction path is sound, but independent falsification found two P5-owned lineage defects.

P6 must remain PENDING.

## Passing evidence

- P5 focused: 8/8 PASS
- P1-P5 combined: 52/52 PASS
- full extension suite: 346/346 PASS, 0 failed, 0 skipped
- P5 syntax: PASS
- durable DAG assertions: PASS
- git diff --check: PASS
- ordinary generation/watermark binding, deterministic change sets, replay, compaction, no-op rejection, and input immutability all pass existing coverage.

## Blocking falsifier 1 — unsafe generation integers collapse parent + 1

P5 accepts any nonnegative `Number.isInteger` generation. JavaScript integers above `Number.MAX_SAFE_INTEGER` do not preserve unit increments.

Independent probe:

- `unsafe = 9007199254740992`
- `unsafe + 1 === unsafe` -> true
- base generation `unsafe` -> FAIL_ACCEPTED
- create delta with parentGeneration `unsafe` -> accepted with `generation === parentGeneration`
- handcrafted delta with repeated unsafe parent/generation -> FAIL_ACCEPTED

Observed:

`UNSAFE_DELTA=FAIL_ACCEPTED:parent=9007199254740992,generation=9007199254740992,strictlyGreater=false`

This breaks P5's core invariant that every delta generation is exactly and strictly parentGeneration + 1.

## Blocking falsifier 2 — delta is not structurally project-bound

P5 checks parent/child project equality when creating a delta, but the serialized DeltaCheckpointV1 contains no project binding. Application validates only parentGeneration and parentWatermark.

Independent probe:

1. Create a valid delta from project A.
2. Clone the parent capsule into project B with different id/path/branch/head but the same generation and watermark.
3. Apply project A's delta to project B.

Observed:

`CROSS_PROJECT_TRANSPLANT=ACCEPTED:q:updated`

The child inherits project B metadata and the delta applies successfully. This violates the P5 requirement that project metadata remain fixed/bound across a delta chain and that project mismatch fail closed.

This is not a P6 hash/Merkle concern: P6 will bind exact content identity, but P5 already owns the non-cryptographic structural project-chain contract.

## Required bounded repair

Stay in P5. Do not start P6.

1. Require all P5 generation values to be `Number.isSafeInteger` and nonnegative; delta generation must be a safe integer and strictly equal to parentGeneration + 1 without precision collapse.
2. Reject creation when parentGeneration is `Number.MAX_SAFE_INTEGER` because no representable safe next generation exists.
3. Add explicit structural project binding to DeltaCheckpointV1, using the exact validated P4 project envelope (for example `project` or `parentProject`).
4. `createDeltaCheckpointV1` must store the canonical project binding after proving parent and child project metadata are equal.
5. `validateDeltaCheckpointV1` must strictly validate the project binding shape through the P4-compatible project contract or an exact P5 structural equivalent.
6. `applyDeltaCheckpointV1` must require the actual parent capsule project to exactly equal the delta project binding before changes are applied.
7. Replay must therefore reject cross-project transplanted deltas even when generation/watermark match.
8. Keep project metadata immutable through `changes`; a project metadata change still requires a fresh base checkpoint.
9. Add adversarial tests for unsafe base/delta generations, MAX_SAFE parent exhaustion, repeated unsafe generation, and cross-project delta transplant.
10. Preserve all existing deterministic replay/compaction, watermark-only delta, no-op rejection, P4 validation, and no-P6-hash boundaries.

No P6/P7 work, cryptographic IDs, runtime wiring, persistence, commit, push, merge, deploy, reload, or live storage mutation is authorized.
