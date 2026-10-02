# M7 C6 Response 02

Status: C6 READY_FOR_VERIFY; M7 remains ACTIVE; C7 not started.

## Candidate and protection

- Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`
- Base HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
- No browser/CDP/live `chrome.storage` access.
- No commit or push.
- Authoritative main tracked production files remain unchanged.
- Candidate production edit: `extension/background.js`; C6 semantic/test artifacts remain detached candidate artifacts. Copied M5A/M5B coverage metadata was updated only for shifted candidate source lines.

## Sender-tab and phase proof

Worker-origin `fleet:assignment-cancelled` captures the sender tab and candidate worker, then revalidates inside the same durable mutation callback:

1. `workerIdForTabInState(state, tabId)` must equal the captured worker ID.
2. The fresh worker must still have the exact tab ID.
3. The current worker pointer and Assignment worker ID must still match.
4. Completing custody is protected.

Failure is a typed stale/tab-rebound or ownership result and cannot touch replacement custody.

Operator cancellation applies the same proof at request, immediately before transport, and settle. The request and pre-send boundaries require the exact worker, Assignment, tab, worker ownership, and non-completing phase. A transport failure is diagnostic only; it cannot authorize release.

## Receipt provenance and races

Cancellation receipts now persist and require `lastCancellationAssignmentId`, reason, time, disposition, and `lastCancellationTabId`. Historical idempotent settle is accepted only for the exact captured assignment, reason, and originating tab. A same-assignment worker-origin release may therefore satisfy the original operator settle, while tab rebound, replacement custody, worker removal, completion transition, or stale duplicate callbacks fail closed.

## M4 parity

The C6 focused suite compares task, message-batch, and control cancellation/generic release outcomes against the accepted M4 custody operations, including completing protection. Existing C6 recovery tests retain the max assignment/item attempt law, retry/exhaustion behavior, invalid-counter rejection, and input immutability. C6 adds only documented non-authoritative receipt/runtime diagnostics around the M4 result.

## Validation evidence

- C6 focused: 13/13 pass.
- C1-C5 focused: 83/83 pass.
- M0-M6 focused: 129/129 pass.
- All copied `fleet-*` tests: 350/350 pass.
- All candidate tests: 403/403 pass.
- `node --check` for background and C6 module: pass.
- `git diff --check`: pass.
- C6 browser/hidden-time/legacy-authority scans: pass.
- Main tracked-production protection check: pass.

## Remaining scope

C7+ remains for stop/flush-stale, unregister/registration removal, authority-revoke bulk cancellation, remaining general APIs, public snapshot/UI wiring, final persistence connection, and global zero-legacy proof. No C7 work was started.

READY_FOR_VERIFY
