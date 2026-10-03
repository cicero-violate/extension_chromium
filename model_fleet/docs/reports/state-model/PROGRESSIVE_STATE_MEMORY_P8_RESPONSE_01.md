# Progressive State Memory P8 Response 01

Status: READY_FOR_VERIFY
Date: 2026-10-03
Scope: P8 lazy evidence hydration only; P9 remains PENDING.

## Implementation

Added the isolated browser-compatible module
`extension/progressive-state-memory-m7-p8.js` and focused test
`extension/tests/progressive-state-memory-p8.test.cjs`.

The module validates the supplied P7 index before planning or hydration,
selects only observed `factType: evidence` versions by their establishing
event IDs, and binds requests, plans, and bundles to the exact P7
`rootDigest`/`tipDigest`/`generation` source envelope.

Hydration is explicit and resolver-injected. The resolver receives immutable
descriptor copies in sorted event-ID order. It may return only plain byte
arrays; P8 verifies the exact bytes with browser Web Crypto SHA-256, enforces
per-item and cumulative budgets, and returns no partial bundle on failure.
There is no persistence, cache, global resolver, connector, filesystem,
network, runtime, or P9 bootstrap behavior.

Strict validators reject unknown fields, non-evidence requests, duplicate or
unsorted IDs/items, source mismatches, forged descriptors, altered bytes or
lengths, digest mismatches, malformed resolver results, resolver failures,
budget overflow, and invalid P7 input. Unresolved P7 references and artifacts
without an explicit ref+digest contract are not hydratable.

## Validation evidence

- Focused P8: **7/7 PASS**
- Combined P1-P8: **77/77 PASS**
- Full extension suite: **371/371 PASS**, zero skipped
- `node --check extension/progressive-state-memory-m7-p8.js`: PASS
- `node --check extension/tests/progressive-state-memory-p8.test.cjs`: PASS
- durable DAG JSON validation: PASS
- `git diff --check`: PASS

Focused coverage includes planner zero-I/O behavior, exact evidence selection,
deterministic resolver order, SHA-256 acceptance/rejection, source binding,
resolver failure and malformed-byte fail-closed behavior, byte-budget
overflow, strict bundle validation, input immutability, and invalid/non-
evidence P7 rejection.

P0-P7 remain accepted; P8 is set to `READY_FOR_VERIFY`; P9-P13 remain
`PENDING`. No live storage, extension reload, runtime wiring, commit, push,
deploy, or later-node work was performed.

Independent verification is required before P8 can become DONE_ACCEPTED.
