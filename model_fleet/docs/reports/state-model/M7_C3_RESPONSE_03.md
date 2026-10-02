# M7 C3 response 03

## Candidate and scope

- Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`
- Base HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
- Scope: C3 dispatch transport only; C4 was not started.
- M0-M6: DONE; C1/C2: DONE; C3: VERIFY; M7: ACTIVE.
- No browser/CDP session, live extension reload, or `chrome.storage` mutation was performed.
- The authoritative main checkout production files remain unchanged.

## Files changed in this C3 slice

- `extension/fleet-state-model-m7-c3.js`
- `extension/tests/fleet-state-model-m7-c3.test.cjs`
- `extension/background.js` (candidate-only C3 transport overlay)

The copied C1/C2 artifacts and prior reports remain in the detached candidate and were not removed or rewritten.

## M4 timeline parity

C3 normalizes and validates every assignment before every successful operation and applies the M4 timeline law globally:

- all five timeline fields are finite and nonnegative;
- `reservedAt` is positive;
- any nonzero `dispatchAttemptAt` is at least `reservedAt`, regardless of assignment phase;
- reserved, activating, running, and completing phase-specific ordering and zero-field rules match M4.

The dispatch attempt and acceptance paths remain exact-custody operations. Same-time attempt recording is idempotent; a different repeat attempt is rejected. Acceptance requires a recorded attempt and preserves `startedAt=0` until later heartbeat/recovery work.

## Pre-attempt rollback law

Authorization and reservation ownership are checked before the durable attempt. If authorization becomes stale before an attempt is recorded, C3 performs a typed, exact reservation rollback rather than composing transport failure:

- task returns to pending, clears owner, resets `startedAt`, and rewinds the reservation attempt exactly once;
- all message batch members return to queued;
- control custody is released while the worker inbox remains unchanged;
- no dispatch-failed fault, failure count, or false `dispatch.failed` entry is created.

If the exact assignment/worker pointer has already vanished or changed, the result is a typed stale no-op and replacement custody is untouched. Only an assignment with `dispatchAttemptAt > 0` can enter M5B-fault-then-M4-release composition.

## Lock-before-launch law

The v2 schedule wrapper holds the scheduling lock only around the reservation mutation. It captures the returned dispatch projections, clears `scheduling`, resolves pending scheduling once, and only then launches independent transport promises. A slow transport therefore cannot hold the global admission lock. The C3 test checks the source ordering and the candidate path contains no legacy transport helper call.

## Attempt, authorization, wake, and acceptance

The candidate records the durable attempt and `dispatch.attempt` journal before clearing warm-idle alarms or invoking page/window/bridge effects. Authorization is checked before wake, immediately before send, and again before acknowledgement. It binds:

- worker and assignment ownership;
- assignment kind and task/message/control identities;
- exact integer dispatch tab ID to the durable worker tab ID;
- enabled worker, policy authority, non-paused policy, and reserved phase.

The wake path does not call legacy activation/authorization helpers and does not write legacy status, top-level busy/heartbeat, or distributed current-work fields. `acceptDispatch` is the only C3 acceptance transition and moves the assignment to activating.

## Active-page deferral

Deferral validates positive `deferredAt` before deriving state and requires `pageBusyUntil >= deferredAt`; the background orchestration sets it to `deferredAt + FLEET_PAGE_BUSY_RECHECK_MS`. M4-equivalent custody release is used for task, message-batch, and control assignments. Tasks rewind exactly once, messages requeue, control inbox entries remain untouched, and the deferred journal uses the explicit event timestamp.

## Failure composition and stale-worker law

For an exact attempted reservation, C3 applies M5B dispatch-failure faulting first and then M4 release. The result preserves task `attempts` and `startedAt`, requeues message batches, releases control custody, resets runtime busy, and retains the typed historical assignment ID on an active-authority fault. Policy-paused, authority-disabled, and disabled-worker cases reset runtime without inventing a blocking fault.

Failure diagnostics preserve source-equivalent non-authoritative data:

- worker last error, failure count, and failure timestamp;
- per-message error/count and `target worker blocked after dispatch failure: ...` deferred reason;
- task note `dispatch failed on WORKER: ERROR`;
- lifecycle/warm-idle reset intent only, without legacy status authority;
- `dispatch.failed` text `ASSIGNMENT failed: ERROR`, explicit detail, and message IDs.

External error text is bounded to 2000 characters before typed fault composition. Falsy transport error messages use the M5B default `dispatch failed`. Missing worker, missing assignment, cleared pointer, changed owner, and replacement-assignment races return typed stale outcomes without faulting or releasing replacement custody.

## Success bookkeeping and journals

All C3 success journals use explicit `acceptedAt`. The candidate preserves count-once chat bookkeeping through `lastCountedAssignmentId`, increments turns once, applies the role turn threshold, sets the rotation-pending projection, and records `worker.chat_limit_reached` only on threshold transition. It emits:

- `dispatch.accepted`;
- `MESSAGE_ID sent to WORKER` or `N messages (FIRST…LAST) sent to WORKER`;
- task started and control started entries.

Journal IDs, timestamps, details, and ordering are generated through the explicit-time C3 append helper and remain bounded by the existing journal limit.

## Tests and validation

- C3 focused: **14/14 pass**
- copied M0-M6 + C1 + C2 focused: **164/164 pass**
- copied `fleet-*`: **303/303 pass**
- `node --check` candidate background/C1/C2/C3: pass
- `git diff --check`: pass
- C3 browser/hidden-time scan: pass
- C3 legacy-authority and legacy-transport-helper scan in the C3 candidate range: pass
- attempt-before-side-effect and lock-before-transport source-order checks: pass
- authoritative main tracked production protection check: pass

The detached candidate has no dependency, commit, or push changes. Its copied artifact files are intentionally untracked candidate work; no broad cleanup was performed.

## Result

**C3 READY_FOR_VERIFY.** M7 remains ACTIVE. C4 was not started.
