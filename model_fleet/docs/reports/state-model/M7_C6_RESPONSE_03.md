# M7 C6 Response 03

Status: C6 READY_FOR_VERIFY; M7 remains ACTIVE; C7 not started.

## Candidate and protection

- Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`
- Base HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
- No browser/CDP/live `chrome.storage` access.
- No commit or push.
- Authoritative main tracked production files remain unchanged.

## Callback versus operator receipt ordering

`c6ApplyCancellationInState` now has two intentionally distinct receipt laws.

Worker-origin callbacks first prove the sender-tab binding, then inspect live `worker.currentAssignmentId`:

- a non-null different current assignment returns `assignment_ownership_mismatch` immediately;
- an exact current assignment follows the live canonical Assignment path, so a historical receipt cannot bypass phase or completion checks;
- only a null current assignment may use an exact assignment/reason/tab receipt for idempotent success;
- no owner without that exact receipt returns `stale-no-owner`.

Operator settle retains the deliberate historical-receipt short-circuit. An exact receipt for the captured original assignment, reason, and originating tab may acknowledge the worker-origin release even if replacement custody now exists; it never mutates the replacement.

## Sender-tab and replacement proof

The worker callback re-resolves `workerIdForTabInState(state, tabId)` inside the same `mutateFleet` callback and requires the fresh worker’s exact `tabId`. Receipts now include `lastCancellationTabId`, and exact receipt matching requires assignment ID, reason, tab ID, and a positive receipt time.

This covers delayed A callbacks with no owner, A callbacks after replacement B on the same worker/tab, old-tab callbacks after tab rebound, reason mismatch, and operator settle after worker-origin release. Replacement Assignment B is never released, acknowledged as an idempotent A cancellation, or used to trigger the idempotent scheduling path.

## M4 recovery parity

The focused parity matrix compares C6 automatic recovery for task, message, and control Assignments at recovery attempts 0 and 1 against M4. Assignment custody, task/message phases and ownership, control inbox identity, outcome, and retry scheduling match M4. C6-only status notes, deferred-reason fields, recovery-reason history, and runtime/lifecycle diagnostics are intentionally excluded from the authoritative parity comparison.

Cancellation and generic release parity remains covered for task, message-batch, and control custody, including completion protection and input immutability.

## Tests and validation

- C6 focused: 14/14 pass.
- C1-C5 focused: 83/83 pass.
- M0-M6 focused: 129/129 pass.
- All copied `fleet-*` tests: 351/351 pass.
- All candidate tests: 404/404 pass.
- `node --check` for changed background and C6 module: pass.
- `git diff --check`: pass.
- C6 hidden-time/browser/legacy-authority scans: pass.
- Main tracked-production protection check: pass.

## Remaining scope

C7+ remains for stop/flush-stale, unregister/registration removal, authority-revoke bulk cancellation, remaining general APIs, public snapshot/UI wiring, final persistence connection, and global zero-legacy proof. No C7 work was started.

READY_FOR_VERIFY
