# Progressive State Memory P10 Response 01

Status: REPAIR_REQUIRED
Node: P10 — Adversarial / stale-context regression matrix
Date: 2026-10-03

## Scope and implementation boundary

Added only the dedicated adversarial test matrix:
`extension/tests/progressive-state-memory-p10-adversarial.test.cjs`.

No P1–P9 production module, background/runtime file, persistence boundary,
storage key, or live state was changed. P11, P12, and P13 were not started.

## Matrix results

The executable matrix has seven grouped tests and all seven detector tests
pass. The grouped coverage is:

- Matrix A/B: P1 history/state validation, deterministic reduction, P3 input
  validation, P4 schema/action-gap rejection — PASS.
- Matrix C: P5 generation/project/watermark lineage, P6 Merkle tamper/order
  checks, compaction link, and five repeated compaction/re-root cycles — PASS.
- Matrix D: cross-node compaction-memory preservation — **FALSIFIED**.
- Matrix E: P7 relation ordering, negative memory, identity, and conservative
  metadata handling — PASS.
- Matrix F: P8 evidence identity/source/digest/bytes/budget/laziness — PASS.
- Matrix G/J/H: P9 stale reality/source binding/action gap and the distinction
  between direct serialization and validated restart material — PASS.
- Matrix I/K: five repeated deterministic projections plus offline/isolation
  scan across P1–P9 — PASS.

## First falsifier and reproducer

The required Matrix D history contains an observed older `goal-1`, a later
`goal-2` explicitly superseding it, and an unresolved `goal-2` conflict
reference. The original two-node P6 chain produces P7 negative memory
`["goal-1"]` and unresolved conflict/reference guardrails.

The valid P5 compaction and P6 compaction bridge succeed. Re-rooting a new P6
chain at the compacted latest-generation base, then rebuilding P7 and P9,
silently drops the historical `doNotResurrectEventIds` and unresolved
guardrails. P9 still accepts the rebuilt chain and emits a structurally valid
bootstrap. This is the prohibited outcome: latest P4 content remains equal,
but restart guardrails are lost.

Earliest owning boundary: the P6/P7/P9 compaction-provenance composition.
P6 exposes a compaction bridge, but P7 rebuild from the compacted chain does
not consume that bridge and P9 has no bridge input/requirement. P10 does not
patch upstream semantics.

## Validation counts

- P10 focused matrix: **7/7 PASS as executable detector tests**; Matrix D
  records the detected falsifier above.
- Combined P1–P10: **92/92 PASS**, zero skipped/failures.
- Full extension Node suite: **394/394 PASS**, zero skipped/failures.
- `node --check extension/tests/progressive-state-memory-p10-adversarial.test.cjs`:
  PASS.
- `git diff --check`: PASS.
- Durable PSM DAG JSON: valid; P10 is `REPAIR_REQUIRED`; P11–P13 remain
  `PENDING`; live restart remains unauthorized.

## Safety and remaining scope

The matrix also confirms stale project reality, substituted source, forged
action, P8 resolver/digest/budget, P7 identity/relation, P5/P6 lineage, and
offline-isolation attacks fail closed. No runtime/live-storage/reload/commit/
push/deploy action occurred.

P10 cannot become READY_FOR_VERIFY until the compaction-memory falsifier is
addressed at its owning boundary by a separately authorized P10 repair. P11
must not start.
