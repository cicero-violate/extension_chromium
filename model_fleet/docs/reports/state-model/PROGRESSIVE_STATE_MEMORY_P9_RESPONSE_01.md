# Progressive State Memory P9 Response 01

Status: READY_FOR_VERIFY
Node: P9 — Restart bootstrap integration
Date: 2026-10-03

## Candidate boundary

P9 adds the isolated browser-compatible module
`extension/progressive-state-memory-m7-p9.js` and focused tests at
`extension/tests/progressive-state-memory-p9.test.cjs`. It performs offline
integration only. It does not import background runtime code, use `chrome.*`,
write storage, hydrate evidence, reload an extension, or select a live next
action.

The module verifies the supplied P6 Merkle chain, rebuilds P7 from that
verified chain, reconstructs the latest P4 capsule through P5/P6, and checks
the caller-supplied project reality envelope against that capsule. Optional
P8 bundles are validated against the exact rebuilt P7 source and are accepted
only for evidence still relevant to the latest capsule. No resolver is
invoked.

## Bootstrap contract

`RestartBootstrapV1` has an exact schema containing the source root/tip and
generation, project envelope, latest P4 watermark and capsule, P7 final
current event IDs, exact negative-memory IDs, unresolved conflicts and
references, optional source-bound hydrated bundles, and the explicit action
gap. The current accepted P2/P3 model encodes no authoritative next action,
so P9 emits:

```text
nextAction: null
nextActionStatus: not-encoded-by-p2-p3
state: structurally-valid-action-gap
```

The validator rebuilds and compares all derived guardrails, rejects invented
actions, rejects stale reality, malformed or tampered chains, forged or
missing negative-memory entries, omitted/forged unresolved guards, irrelevant
hydrated evidence, duplicate hydrated event IDs, and unknown nested fields.
The P1 accepted-event archive is not copied into the bootstrap.

Rendering uses recursively canonicalized compact JSON and reports exact UTF-8
bytes. A positive safe-integer `maxBytes` is required; overflow fails closed
without truncation or fact omission. The ordinary fixture rendered within the
12,288-byte target used by the focused test.

## Validation evidence

- Focused P9: **7/7 PASS**.
- Combined P1–P9: **85/85 PASS**, zero skipped/failures.
- Full extension Node suite: **382/382 PASS**, zero skipped/failures.
- `node --check extension/progressive-state-memory-m7-p9.js`: PASS.
- `node --check extension/tests/progressive-state-memory-p9.test.cjs`: PASS.
- `git diff --check`: PASS.
- Durable DAG JSON: parsed and reconciled with P9 `READY_FOR_VERIFY`; P10–P13
  remain pending and live restart remains unauthorized.

Focused coverage includes invalid/tampered P6 chains, all project-reality
drift dimensions, exact P4 replay, P7 negative-memory and unresolved guards,
optional P8 source/relevance binding, action-gap rejection, deterministic
rendering and byte budgeting, unknown/malformed schemas, and input
immutability.

## Repository and scope status

The candidate was evaluated on branch `main` at HEAD
`6423b39e50abcc7cb890a9f662eb2fb49c56216e`. The worktree contains the
pre-existing accepted runtime/UI/PSM evidence changes plus the P9 module,
focused test, DAG reconciliation, and this report. No unrelated files were
reverted or normalized. No commit, push, merge, deploy, reload, live-storage
mutation, or runtime wiring was performed.

P10 remains PENDING. Independent verification is required before any later
PSM node begins.
