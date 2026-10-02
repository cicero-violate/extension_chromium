# M7 C3 Response 01

## Result

C3 is `READY_FOR_VERIFY`; M7 remains `ACTIVE`. C4+ work was not started.

Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`  
HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`

The authoritative main checkout remains unchanged. No browser/CDP/live
`chrome.storage` access, dependency change, commit, or push occurred.

## Files changed

- `extension/fleet-state-model-m7-c3.js`
- `extension/tests/fleet-state-model-m7-c3.test.cjs`
- candidate `extension/background.js` C3 import and v2 transport overlay

C1 and C2 artifacts remain preserved. The C3 overlay stops at dispatch
acceptance; heartbeat, recovery, completion, cancellation, flush, and public
snapshot work remain later slices.

## Attempt and authorization law

`recordDispatchAttempt()` validates normalized v2 state, exact worker pointer,
exact Assignment ownership, reserved phase, and `attemptedAt >= reservedAt`.
The same timestamp is idempotent; a different second attempt rejects.

`authorizeDispatch()` validates the durable reservation before transport:
worker/assignment identity, reserved phase, kind and task/message/control
payload identity, active policy, enabled worker, and concrete integer tab
binding. The payload is a projection and cannot become a second authority.

`acceptDispatch()` requires the previously recorded attempt, exact ownership,
reserved phase, and monotonic `acceptedAt`; it transitions only the Assignment
to `activating` and leaves `startedAt` at zero.

## Active-page deferral

The C3 preflight calls the distinct reserved-assignment deferral operation.
Task work returns to pending with owner cleared, `startedAt` reset, and one
attempt rewind. Message batches return to queued. Control custody is released
without consuming inbox notices. The Assignment and reciprocal worker pointer
are removed, page cooldown is projected from the explicit observation time,
and a bounded recheck is scheduled. No legacy worker custody/status fields are
written by the C3 module or C3 v2 wrapper.

## Failure composition and stale races

Dispatch failure is composed in the required order: exact M5B-equivalent fault
and runtime reset first, followed by exact M4-equivalent reserved-assignment
release. Transport failure preserves task `startedAt` and attempts while
requeuing work. Active authority produces a typed `dispatch-failed` fault with
the historical Assignment ID; paused, disabled, or authority-disabled policy
does not invent a blocking fault, while runtime reset remains source-equivalent.

If ownership changed, failure returns a typed stale/no-op result and cannot
fault or release the replacement Assignment. The same exact authorization
check is performed immediately before acceptance, so a stale successful
acknowledgement cannot mutate replacement custody.

## Candidate transport wiring

The v2 schedule wrapper commits the short C2 reservation mutation, releases
the scheduling lock, and launches returned dispatches independently with
`Promise.allSettled`; one slow transport does not serialize unrelated worker
admission. Attempt, active-page deferral, external send, acceptance, and
failure paths use explicit event times and C3 journal projections. The v1
schedule/transport branch remains isolated for later conversion.

## Tests and validation

- C3 focused: **7/7 pass**
- C2 focused: **17/17 pass**
- C1 focused: **18/18 pass**
- M0-M6 focused: **129/129 pass**
- all copied `fleet-*`: **296/296 pass**
- `node --check` C3, C2, C1, and candidate `background.js`: pass
- `git diff --check`: pass
- C3 Chrome/hidden-time/legacy-authority scan: pass
- candidate v2 dispatch wiring/transport identity scan: pass
- authoritative main tracked production protection check: pass

## Remaining C4+ families

Heartbeat observation/reconciliation, bridge recovery, completion handoff and
acknowledgement, automatic recovery, cancellation/flush, broader task/message
routing, public snapshot/control-pane, final persistence connection, and global
zero-legacy proof remain intentionally outside C3.

## Status

`C3 READY_FOR_VERIFY`  
`M7 ACTIVE`  
`M8/M9 TODO`

Blocker: none.
