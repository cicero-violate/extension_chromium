# Progressive State Memory P2 Repair — Replay-Consistent Canonical State

Status: READY_FOR_VERIFY
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
P0: DONE_ACCEPTED
P1: DONE_ACCEPTED
P2: READY_FOR_VERIFY
P3-P13: PENDING

## Repair scope

This repair addresses only the independent P2 falsifiers. The isolated P2
module remains browser-compatible, depends on accepted P1 validation, and is
not imported by `background.js`. No P3 or later implementation, runtime
wiring, live storage, reload, commit, push, merge, or deployment was performed.

Changed repair files:

* `extension/progressive-state-memory-m7-p2.js`
* `extension/tests/progressive-state-memory-p2.test.cjs`
* P2 DAG/report metadata and this report

## Replay-consistent state boundary

`validateState` now enforces the exact CanonicalStateV1 top-level shape and
exact provenance/watermark shape. It validates the indexed admitted events
through `ProgressiveStateMemoryM7P1.validateLedger`, checks event-index keys and
watermarks, deterministically replays that history through the P2 reducer, and
requires the supplied state to equal the replayed projection.

Consequences:

* forged goal, frontier, task, collection, or other materialized facts fail
  with `canonical-state-does-not-match-replay`;
* unknown top-level, provenance, watermark, collection, and nested fact fields
  fail closed;
* malformed event-index entries or mismatched event keys/watermarks fail
  before reduction;
* `reduceEvent` validates the supplied state first, so an inconsistent state
  cannot be extended into future canonical truth;
* valid replayed states continue to support incremental reduction.

The P1 ledger remains the admitted-history authority. P2 materialized facts
are accepted only as the deterministic replay result, not as an independent
input authority. Supersession and conflict metadata remain preserved without
implementing P7 contradiction policy.

## Adversarial coverage

Focused repair tests explicitly:

* mutate goal, frontier, and task facts while history is unchanged and require
  rejection;
* add unknown top-level, provenance, watermark, and nested task fields and
  require rejection;
* prove a valid replayed state supports incremental reduction;
* compare incremental reduction with full ledger replay after every admitted
  event;
* preserve prior semantic payload, provenance, watermark, immutability, and
  P1-reuse tests.

## Validation

```text
node --test extension/tests/progressive-state-memory-p2.test.cjs
9/9 PASS, 0 failed, 0 skipped

node --test extension/tests/progressive-state-memory-p1.test.cjs \
  extension/tests/progressive-state-memory-p2.test.cjs
23/23 PASS, 0 failed, 0 skipped

node --test extension/tests/*.test.cjs
302/302 PASS, 0 failed, 0 skipped

node --check extension/progressive-state-memory-m7-p2.js
node --check extension/tests/progressive-state-memory-p2.test.cjs
PASS

durable PSM JSON and P0/P1/P2/P3 status assertions
PASS

git diff --check
PASS
```

No live state/storage mutation or runtime integration was performed. P3-P13
remain pending and independent verification is required.

P2 stops at **READY_FOR_VERIFY**.
