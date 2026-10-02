# M7 C9 Response 01

## Result

C9 is READY_FOR_VERIFY. M7 remains ACTIVE; C10+ was not started.

Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`

Base HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`

## Files changed in this slice

- `extension/fleet-state-model-m7-c9.js` — pure v2 binding-loss and unregister semantics.
- `extension/background.js` — v1/v2 mark-stale, reconcile, unregister boundaries, identity-scoped notification, and fail-soft cleanup.
- `extension/fleet-worker.js` — page-local `registeredWorkerId` and expected-worker identity guard for registration removal.
- `extension/tests/fleet-state-model-m7-c9.test.cjs` — C9 parity, protection, race/protocol, immutability, and source-scan tests.
- `extension/fleet-state-model-m5b.cjs` — copied manifest range update caused by the candidate overlay.

## Stale-binding release/protection law

`releaseWorkerBindingV2` normalizes through C3 and requires the exact expected tab. A rebound/mismatched tab is a typed no-op with zero mutation. For a non-completing assignment it uses C6/M4 generic requeue semantics, then preserves source diagnostics with explicit task/message requeue journals. Control notices remain in the stale worker inbox. Binding fields are retired, lifecycle becomes stale, runtime busy/report identity/heartbeat observation are cleared, and one explicit-time `worker.stale` journal records the old tab, reason, and release/protection result.

Completing custody is protected: the Assignment, worker pointer, and task/message/control work remain unchanged while only binding/observation fields become stale. The result reports `protectedCompleting` and never invents completion or cancellation evidence.

## Reconciliation TOCTOU law

The v2 reconciliation preview captures worker ID and expected tab only for enabled integer-bound workers whose supported-tab probe fails. The single mutation transaction revalidates existence, enabled state, and exact tab equality before each release. Rebound, disabled, removed, or changed candidates are skipped. Heartbeat buffers, alarms, and scheduling are cleaned only for actually transitioned workers after commit.

## Unregister law

`unregisterWorkerV2` is immutable and C3-validated. Missing IDs are deterministic idempotent `removed:false`. Completing custody returns `unregister-completion-custody-protected` with zero mutation and no cleanup/notification. Non-completing custody is released through C6/M4 before worker deletion; task/message authoritative fields match requeue semantics, control notices are reported as dropped only when worker deletion removes their inbox, and queued unassigned target messages are preserved. An explicit `worker.unregistered` journal is appended at the supplied time.

Post-commit heartbeat deletion, alarm clearing, badge update, schedule, and page notification are fail-soft. A v2 unregister notification is assignment-independent and sends `{registered:false, expectedWorkerId: workerId}` only after a fresh same-tab rebound check. Cleanup failures become warnings and cannot invert `removed:true`.

## Identity-scoped page protocol

`fleet-worker` tracks `registeredWorkerId`. A removal message with `expectedWorkerId` is accepted only for the matching page identity; an old worker ID against a rebound page returns a typed no-op and does not stop heartbeat or alter registration. Omitted expected identity retains the legacy behavior. Matching removal clears registration and heartbeat. v2 stale-binding release sends no registration-changed notification.

## Validation

- C9 focused: 8/8 pass.
- C1-C9 focused: 249/249 pass.
- M0-M6 focused: 129/129 pass.
- All `fleet-*`: 374/374 pass.
- All candidate tests: 427/427 pass.
- `node --check` passed for `background.js`, `fleet-worker.js`, and `fleet-state-model-m7-c9.js`.
- `git diff --check` passed.
- C9 browser/hidden-time/legacy scans passed; the C9 module and actual C9 background range contain no forbidden legacy authority, distributed custody, or publicSnapshot references.
- Actual unregister handler/path and expected-worker page protocol scans passed.

## Candidate/main status

No browser/CDP/live storage was touched. No commit or push was made. The authoritative main checkout has no tracked production changes. The detached candidate remains inert and non-authoritative.

Remaining scope is C10+ (registration/upsert, general APIs, snapshot/UI, and final persistence cutover). No C10 work was started.

Status: `C9 READY_FOR_VERIFY`, `M7 ACTIVE`.
