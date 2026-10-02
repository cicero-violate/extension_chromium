# M7 C7 Response 02

Status: C7 READY_FOR_VERIFY; M7 remains ACTIVE; C8 not started.

## Candidate and protection

- Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`
- Base HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
- Candidate production edits: `extension/background.js`, `extension/fleet-worker.js`.
- Candidate C7 module/test: `extension/fleet-state-model-m7-c7.js`, `extension/tests/fleet-state-model-m7-c7.test.cjs`.
- No browser/CDP/live `chrome.storage` access.
- No commit or push.
- Authoritative main tracked production files remain unchanged.

## Exact M4 parity and timeline law

C7 now validates through the accepted C3 timeline validator before any flush decision or transport-intent capture. This rejects nonfinite/negative timelines, dispatch-before-reservation, reserved terminal fields, activating order errors, running accepted/started regressions, and completing order errors.

The browser-safe flush ports M4 cancellation semantics: task Assignments transition to cancelled, clear ownership, and reset `startedAt` to zero; message Assignments transition each assigned message to cancelled; control notices are cleared exactly by the active flush; Assignment records are removed and worker `currentAssignmentId` pointers are cleared. The active result entries are exactly:

`{ ok: true, released: true, assignmentId, disposition: 'cancel' }`

Transport intents are kept separately and never overload the M4 result shape. Deep task/message/control/worker custody parity is tested against M4 for reserved, activating, and running assignments. Malformed timeline candidates fail before policy pause, journaling, custody changes, or page transport.

## Atomic stop and queued-message parity

Completing custody is checked before all state changes. A completing Assignment causes `flush-completing-custody-protected` with zero mutation. Successful composition then pauses policy, applies the exact M5A queued-message law, preserves operator/running/terminal/Assignment-owned messages, resets only affected worker runtime/lifecycle projection fields, and appends explicit-time cancellation/stop journals.

Queued messages use `phase === 'queued'`, non-operator destination, and no canonical Assignment reference; they receive `phase='cancelled'`, `completedAt=stopAt`, and the exact stale-work reason. M5A deep parity and explicit stop-time tests pass.

## Assignment-scoped post-commit transport

After the single durable v2 stop mutation commits, each page command includes:

`{ type: 'fleet:cancel-current', reason: 'stale work stop', expectedAssignmentId: intent.assignmentId }`

`fleet-worker` accepts the optional expected identity. With it, an active different Assignment returns a typed mismatch without stopping, clearing recovery state, emitting `assignment-cancelled`, or signaling idle-ready. With no active Assignment it returns a no-op. A matching active Assignment preserves the existing cancellation behavior. Omitted expected identity remains compatible with C6/operator and automatic-recovery callers.

The background rechecks paused policy, worker identity/tab, and no replacement custody before each send. The page-side identity check closes the unavoidable race between that read and the external send. Transport failures produce only explicit diagnostic warnings and cannot roll back or create C6 receipts.

## Tests and validation

- C7 focused: 7/7 pass.
- C1-C6 focused: 97/97 pass.
- M0-M6 focused: 129/129 pass.
- All copied `fleet-*` tests: 358/358 pass.
- All candidate tests: 411/411 pass.
- `node --check` for background, fleet-worker, and C7 module: pass.
- `git diff --check`: pass.
- C7 hidden-time/browser/legacy-authority scans: pass.
- Assignment-scoped cancel-current protocol scan: pass.
- Actual stop handler/path scan: pass.
- Main tracked-production protection check: pass.

## Remaining scope

C8+ remains for authority revoke, unregister/stale binding and registration APIs, policy/general APIs, clear-completed, public snapshot/UI wiring, final persistence connection, and global zero-legacy proof. No C8 work was started.

READY_FOR_VERIFY
