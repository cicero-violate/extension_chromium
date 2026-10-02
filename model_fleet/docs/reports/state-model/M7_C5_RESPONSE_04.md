# M7 C5 Response 04

## Result

C5 is READY_FOR_VERIFY. C1-C4 remain DONE; M7 remains ACTIVE. C6 was not started.

Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`

Candidate base HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`

The authoritative main checkout remains unchanged in tracked production files. No browser/CDP/live Chrome or `chrome.storage` access occurred. No dependency, commit, or push was made.

## Inactive-only capacity law

C5 message routing now treats a message as a safe pruning victim only when it is both unreferenced by every canonical Assignment and terminal/inactive (`done`, `blocked`, `cancelled`, or source-permitted `delivered`). Queued and running messages cannot be silently removed. Control notices have no inferred terminal state, so a full inbox fails closed with `completion-control-capacity-active`; it never evicts an unassigned pending notice. Assignment-owned identities remain protected, and capacity failures occur inside the Phase-B mutation so completing custody remains durable for retry.

## Post-commit positive-ack law

The successful `mutateFleet` return is the Phase-B commit boundary. C5 uses `phaseB.state` for fire-and-forget warm-idle/rotation scheduling and returns a minimal deterministic `{ok:true, assignmentId, completed:true}` response immediately. It no longer performs a second `loadFleetState()` or calls legacy `publicSnapshot()` before acknowledging. Therefore post-commit load/projection failure cannot invert a durable acknowledgment or cause the page to retain pending completion. Routing, release lag, progress, and custody removal remain inside the single Phase-B mutation and are not repeated on retry.

## Exact M5B rotation race law

C5 rotation uses an in-memory exact operation claim containing worker identity, bound tab, reason, and claim token. Both success and failure settlement require the claim to remain current and require the worker to be enabled, assignment-free, still rotation-pending, lifecycle `rotating`, bound to the claimed integer tab, and free of an incompatible fault. Failure settlement applies the same typed `chat-rotation-failed` shape and bounded fault message law only while those preconditions hold; otherwise it is a typed stale no-op. Success likewise cannot reset rotation state after disable, pending-clear, assignment replacement, tab rebound, replacement fault, or stale second response. No legacy worker status/busy/heartbeat authority is written.

## Validation

- C5 focused: 16/16 pass, including capacity, committed-state acknowledgment, and rotation-claim checks.
- C1-C4 focused: 65/65 pass.
- Copied M0-M6 baseline: 129/129 pass.
- Full candidate test inventory: 382/382 counted Node test cases pass, 0 failures; all candidate test scripts completed successfully.
- `node --check` passed for changed candidate JavaScript.
- `git diff --check` passed.
- C5 hidden-time/legacy-authority scan passed.
- Candidate background C5 range/callee scan passed; no C5 call to legacy `beginWarmIdle` or `rotateWorkerChat` remains.
- M5B manifest coverage was updated for the exact v2 post-completion lifecycle and rotation-dispatch sites.
- Main tracked production protection check passed.

## Candidate status

Candidate changes are limited to the detached C5 overlay/module/tests and required candidate manifest coverage, with copied M0-M6 artifacts preserved. `C5=READY_FOR_VERIFY`, `M7=ACTIVE`, `C6=TODO`.

