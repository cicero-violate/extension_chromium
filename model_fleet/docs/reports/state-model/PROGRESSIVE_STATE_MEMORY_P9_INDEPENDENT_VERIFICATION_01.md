# Progressive State Memory P9 — Independent Verification 01

Status: DONE_ACCEPTED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Verified HEAD: `4ecf9232ad8e4fa2009b02c6f1c3e5f4da8894ac`
Verified: 2026-10-03
Candidate report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P9_RESPONSE_01.md`

## Verdict

P9 is independently accepted. The restart-bootstrap layer is a deterministic offline projection over verified P6/P7/P8 material, binds exactly to caller-supplied project reality, preserves restart guardrails, and explicitly retains the current authoritative next-action gap without inferring a task.

P10 may become ACTIVE. P11-P13 remain PENDING.

## Independent validation

- P9 focused: 7/7 PASS
- P1-P9 combined candidate run: 85/85 PASS
- current full extension suite under final verified HEAD: 386/386 PASS, 0 failed, 0 skipped
- P9 syntax: PASS
- git diff --check: PASS

## Direct adversarial checks

- project id drift -> rejected as stale-restart-context;
- repositoryPath drift -> rejected;
- branch drift -> rejected;
- head drift -> rejected;
- invented non-null nextAction -> rejected by validator;
- forged final-current IDs -> rejected;
- forged negative memory -> rejected;
- omitted unresolved conflict -> rejected;
- forged source tip -> rejected;
- changed/tampered P6 chain after bootstrap -> rejected;
- ordinary fixture render size: 2821 UTF-8 bytes;
- action gap preserved exactly: nextAction=null, nextActionStatus=not-encoded-by-p2-p3, state=structurally-valid-action-gap.

## Real negative-memory proof

An independently constructed two-checkpoint chain contained explicit supersession of `goal-old` by `goal-new`.

- P7 doNotResurrectEventIds: [`goal-old`]
- P9 doNotResurrectEventIds: [`goal-old`]
- exact preservation: true
- removing the real negative-memory entry from bootstrap -> rejected.

## Repository custody

HEAD changed during verification due unrelated Model Fleet runtime/liveness work. Each stale-context transition failed closed before mutation. Final verification ran at `4ecf9232...`.

The final intervening commit `fix(model-fleet): detect interrupted chat turns` changed runtime/control-plane/liveness files only and did not touch PSM source/test/report/DAG paths.

## Durable-state reconciliation

The candidate report claimed durable P9 READY_FOR_VERIFY, while the canonical node-list entry remained `P9=ACTIVE`. This was a bookkeeping inconsistency in the candidate evidence, not an implementation defect. Independent acceptance reconciles the canonical node list directly to P9 DONE_ACCEPTED and activates P10.

## Accepted P9 properties

- verifies P6 rather than trusting a caller-supplied capsule;
- rebuilds P7 guardrails from the verified chain;
- validates optional P8 bundles against that exact P7 source;
- exact project reality id/path/branch/head binding;
- exact latest P4 capsule and watermark preservation;
- final-current, do-not-resurrect, unresolved-conflict, and unresolved-reference guards are derived and validated;
- hydrated evidence is limited to latest/bootstrap-relevant evidence and deduplicated;
- no automatic hydration/resolver behavior;
- no next-action inference;
- canonical deterministic compact rendering with explicit byte budget;
- structural validity is explicitly distinguished from action sufficiency;
- no runtime/background/live-state integration.

## P10 boundary

P10 only may become ACTIVE: adversarial and stale-context regression matrix.

P10 should attack the complete P1-P9 contract composition, including stale repository reality, chain substitution, compaction/replay drift, negative-memory resurrection, unresolved-conflict loss, evidence-source confusion, byte-budget boundaries, deterministic restart reproducibility, repeated compaction/restart stability, and the requirement that serialized output is never treated as validated restart authority without chain+reality validation.
