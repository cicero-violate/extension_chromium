# M7 C8 Response 01

## Result

C8 is READY_FOR_VERIFY. M7 remains ACTIVE; C9+ was not started.

Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`

Base HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`

## Files changed in this slice

- `extension/fleet-state-model-m7-c8.js` — browser-compatible pure v2 authority-revoke composition.
- `extension/background.js` — C8 import, v2 kill handler boundary, durable revoke/adopt path, and bounded assignment-scoped post-commit page cleanup; v1 remains delegated to the saved legacy function.
- `extension/tests/fleet-state-model-m7-c8.test.cjs` — C8 parity, protection, immutability, response, and source-scan tests.
- `extension/fleet-state-model-m5b.cjs` — copied manifest line coverage updated for the added C8 overlay shift.

## Authority-disable atomic law

The C8 pure composition normalizes through C3 before any decision, sets `policy.authorityEnabled=false` and `policy.paused=true` in the candidate transaction, then enumerates canonical `state.assignments`. Every non-completing assignment is cancelled through the accepted C6/M4 cancel operation. Completing assignments are not touched and remain owned/completing. Queued unassigned worker messages and unrelated control notices remain unchanged.

One explicit-time `authority.killed` journal records cancelled IDs, protected completing IDs, and counts. The background adopts the composed state in one `mutateFleet` commit and returns the exact minimal v2 result:

`{ killed, cancelledActive, protectedCompleting, activeAssignments, transportWarnings }`

Internal transport intents are removed before returning.

## Cancellation parity and completion protection

Task, message, and control cancellation results use the exact M4/C6 shape `{ok:true,released:true,assignmentId,disposition:'cancel'}`. Task started time reset, message phases, control inbox preservation, worker custody clearing, and non-authoritative runtime/lifecycle projection follow C6/M4 semantics. Invalid C3/M4 timelines reject before policy or custody mutation. Completing custody is protected while authority disable still commits.

## Response compatibility

The message boundary returns the legacy `{snapshot: legacyPublicSnapshot}` wrapper for v1. For v2, the handler returns the minimal C8 result directly and does not call `publicSnapshot`.

## Assignment-scoped post-commit transport

Only durably cancelled assignments produce page intents. After commit, each intent is processed independently with:

`{type:'fleet:cancel-current', reason:'authority revoked', expectedAssignmentId}`

Fresh proof requires authority disabled, paused, same worker/tab, and no replacement assignment. Completing assignments never produce an intent. Cleanup uses the accepted 10-second bounded timeout and fail-soft warning stages for alarm cleanup, state read, send timeout/failure, and diagnostic-journal failure. A warning cannot roll back `killed:true`, alter custody, or prevent later intents.

## Validation

- C8 focused: 7/7 pass.
- C7-C1 focused: 105/105 pass when run together with C8 (C8 total combined focused run: 241/241).
- M0-M6 focused: 129/129 pass.
- All `fleet-*`: 366/366 pass.
- All candidate tests: 419/419 pass.
- `node --check` passed for `background.js`, `fleet-worker.js`, and `fleet-state-model-m7-c8.js`.
- `git diff --check` passed.
- C8 browser/hidden-time/legacy scans passed; C8 module and C8 background range contain no forbidden legacy authority, cancellation, or publicSnapshot references.
- Actual kill-authority handler scan confirms explicit v1/v2 response branching.
- Assignment-scoped expected-ID protocol behavior remains covered by the accepted C7/C6 worker tests.

## Candidate/main status

No browser/CDP/live storage was touched. No commit or push was made. The authoritative main checkout has no tracked production changes. The detached candidate remains inert and non-authoritative.

Remaining scope is C9+ (registration/stale binding and later cutover families). No C9 work was started.

Status: `C8 READY_FOR_VERIFY`, `M7 ACTIVE`.
