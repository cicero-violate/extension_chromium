# Progressive State Memory P8 Repair Response 02

Status: READY_FOR_VERIFY
Date: 2026-10-03
Scope: P8 repair only; P9 remains PENDING.

## Repairs

`extension/progressive-state-memory-m7-p8.js` now preserves the exact request
identity in every hydrated bundle:

- `HydratedEvidenceBundleV1` includes the validated positive safe-integer
  `byteBudget` from the request/plan;
- bundle validation requires that field and rejects malformed or missing
  budgets;
- validation rejects any bundle whose `totalByteLength` exceeds its budget;
- otherwise-identical evidence hydration under different budgets produces
  distinct valid bundles.

Resolver calls now receive a fresh descriptor copy frozen with
`Object.freeze`. The caller's index, request, plan, and source objects are not
frozen or mutated. Resolver mutation attempts cannot alter the descriptor or
the resulting bundle.

All prior P8 boundaries remain intact: P7 validation precedes planning and
hydration, only observed evidence facts are hydratable, source envelopes and
event IDs remain exact, SHA-256 verification is performed over returned bytes,
budgets fail closed without truncation or partial results, and no persistence,
cache, runtime, connector, or P9 behavior was added.

## Validation evidence

- Focused repaired P8: **8/8 PASS**
- Combined P1-P8: **78/78 PASS**
- Full extension suite: **375/375 PASS**, zero skipped
- `node --check extension/progressive-state-memory-m7-p8.js`: PASS
- `node --check extension/tests/progressive-state-memory-p8.test.cjs`: PASS
- durable DAG JSON validation: PASS
- `git diff --check`: PASS

The focused repair tests cover byte-budget identity at 3 versus 100 bytes,
missing/malformed/under-total bundle budgets, frozen resolver descriptors,
descriptor mutation attempts, exact digest and byte accounting, source
binding, resolver failure, duplicate/non-evidence rejection, and caller
immutability.

P8 is set to `READY_FOR_VERIFY`; P9-P13 remain `PENDING`. No extension reload,
live storage mutation, commit, push, deploy, or later-node work was performed.

Independent verification is required before P8 can become DONE_ACCEPTED.
