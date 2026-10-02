# M7 C7 Response 01

Status: C7 READY_FOR_VERIFY; M7 remains ACTIVE; C8 not started.

## Candidate and protection

- Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`
- Base HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
- Candidate production edit: `extension/background.js`.
- Added candidate module/test: `extension/fleet-state-model-m7-c7.js`, `extension/tests/fleet-state-model-m7-c7.test.cjs`.
- Copied M5B manifest ranges were updated only for candidate source-line shifts.
- No browser/CDP/live `chrome.storage` access.
- No commit or push.
- Authoritative main tracked production files remain unchanged.

## Atomic v2 stop law

`composeStopAndFlushV2(state, { at })` validates one explicit positive stop time, normalizes/asserts v2 state, rejects any completing Assignment before cloning or changing state, and otherwise performs the canonical active flush followed by queued-message cancellation in one detached state composition.

Active custody is released only through the C7 M4-equivalent flush: task/message work becomes cancelled, Assignment records are deleted, worker custody pointers clear, and all control inbox notices are returned and consumed by the flush. The policy is then paused, affected workers receive only non-authoritative runtime/lifecycle cleanup, and explicit `message.cancelled` plus `authority.stale_work_stop` journals are appended at `stopAt`.

Queued cancellation matches M5A: only queued non-operator messages not referenced by an Assignment are cancelled, with `completedAt=stopAt` and `lastDeferredReason='stale queued worker message'`. Operator, running, terminal, and Assignment-owned messages remain untouched.

## Completing zero-write proof

The completing check occurs before policy pause, active release, queued cancellation, control-inbox clearing, journaling, or state adoption. A completing Assignment produces `flush-completing-custody-protected`; the source state remains byte-equivalent and the background wrapper performs no page transport.

## Post-commit page transport

The v2 background path commits the composed stop through exactly one `mutateFleet` transaction before any `chrome.tabs.sendMessage`. It captures only detached worker/Assignment/tab intents. After commit it clears affected warm-idle alarms and re-reads state before each best-effort `fleet:cancel-current` send, requiring paused policy, the same worker/tab, and no replacement Assignment. Rebound, replacement, missing, or unpaused workers are skipped.

Transport failures append only diagnostic `assignment.flush.transport_failed` warnings when the exact stopped worker/tab remains present; they cannot roll back or alter canonical flushed custody. The v2 stop path never calls the C6 cancellation operation and never requires a worker-origin cancellation callback. The v1 handler remains the legacy branch.

## Counts and idempotence

The returned v2 result derives counts from actual semantic transitions: released active Assignments, cancelled queued messages, and exact flushed control notice IDs. A second stop with no active or queued work produces zero cancellation counts while preserving paused authority effects.

## Tests and validation

- C7 focused: 5/5 pass.
- C1-C6 focused: 97/97 pass.
- M0-M6 focused: 129/129 pass.
- All copied `fleet-*` tests: 356/356 pass.
- All candidate tests: 409/409 pass.
- `node --check` for background and C7 module: pass.
- `git diff --check`: pass.
- C7 hidden-time/browser/legacy-authority scans: pass.
- Actual stop handler/path scan: pass.
- Main tracked-production protection check: pass.

## Remaining scope

C8+ remains for authority revoke, unregister/stale binding and registration APIs, policy/general APIs, clear-completed, public snapshot/UI wiring, final persistence connection, and global zero-legacy proof. No C8 work was started.

READY_FOR_VERIFY
