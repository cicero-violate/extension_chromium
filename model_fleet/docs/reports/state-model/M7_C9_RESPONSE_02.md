# M7 C9 Response 02

## Status

C9 is `READY_FOR_VERIFY`; M7 remains `ACTIVE`. C10 was not started.

Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`  
Base HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`

## Bounded post-commit cleanup

The durable C9 mutation is the irreversible success boundary. Mark-stale, reconcile, and unregister now use the bounded `c9BoundedCleanup` helper with the accepted C7/C8 ten-second timeout. Alarm, badge, state-read, and page-send cleanup cannot invert a committed stale transition or removal.

`markWorkerBindingStale` deletes the exact heartbeat synchronously, schedules independently of alarm cleanup, and reports bounded alarm failures. Reconciliation isolates cleanup per transitioned worker, so one hung alarm cannot prevent later workers or the final schedule. Unregister returns `removed:true` after its durable commit; alarm, badge, fresh-state proof, and notification are independently bounded/fail-soft.

Warning stages are deterministic: `warm-idle-alarm-clear-timeout`, `warm-idle-alarm-clear-failed`, `badge-update-timeout`, `badge-update-failed`, `pre-send-state-read`, `send-timeout`, and `send-failed`. Returned warnings are completed synchronously; no asynchronous mutation occurs after return.

## Unregister pre-send proof

The v2 unregister notification is sent only after a successful fresh state read proves that no worker is bound to the old tab. A failed or timed-out read records `pre-send-state-read` and skips notification. When sent, `expectedWorkerId` remains the page-side identity race defense. The v1 path and response shape remain unchanged.

## Preserved C9 authority laws

Exact expected-tab revalidation remains inside the stale mutation; reconcile revalidates worker existence, enabled state, and expected tab inside one transaction. C6/M4 requeue semantics and source diagnostics are retained. Completing custody is protected during stale binding and unregister, queued unassigned target messages are preserved, and v2 paths contain no legacy worker authority or public-snapshot dependency.

## Validation

- C9 focused: 9/9
- C1-C9 focused: 250/250
- M0-M6 focused: 129/129
- copied `fleet-*`: 375/375
- all candidate tests: 428/428
- changed JavaScript syntax checks: pass
- `git diff --check`: pass
- C9 hidden-time/browser/legacy scans: pass
- main tracked production protection: pass; no authoritative production files changed

The behavioral coverage includes bounded hanging alarm cleanup, per-worker reconcile isolation, unregister read-failure no-send, bounded notification timeout/rejection, fail-soft badge cleanup, completing zero-cleanup behavior, and expected-worker page identity behavior.

## Candidate changes and remaining scope

This slice changed the candidate C9 implementation/tests and the copied manifest accounting for the shifted C5 range: `background.js`, `fleet-worker.js`, `fleet-state-model-m7-c9.js`, `tests/fleet-state-model-m7-c9.test.cjs`, and the copied `fleet-state-model-m5b.cjs` manifest entry. No browser/CDP/live storage was used; no commit or push was made.

C10+ remains out of scope. Main checkout remains protected.

`C9 READY_FOR_VERIFY`  
`M7 ACTIVE`
