# M7 C10 Response 01

## Status and candidate

C10 is `READY_FOR_VERIFY`; M7 remains `ACTIVE`. C11 was not started.

Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`  
Base HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`

The authoritative checkout `/workspace/ai_sandbox/extension_chromium` remains unchanged in tracked production files. No browser/CDP/live Chrome state, authenticated storage, commit, or push was used.

## Worker identity selection

`upsertWorkerBindingV2` is immutable and normalizes/finalizes through the accepted C3 boundary. Selection is deterministic:

1. worker already bound to the requested tab;
2. explicit existing tabless `patch.workerId`;
3. tabless worker whose `lastTabId` matches;
4. tabless topology-managed worker with the canonical requested role;
5. the next unoccupied durable `W-SNNNN` slot.

An explicit worker bound to another tab fails with `requested-worker-already-bound`; it is never hijacked. New allocation advances `nextWorkerSlot` once, while re-registration and reattachment do not allocate.

## Canonical worker shape and custody

New v2 workers contain only canonical binding/runtime/custody fields: durable identity, tab/window metadata, canonical role, capabilities, `currentAssignmentId`, `controlInbox`, runtime heartbeat facts, typed fault, lifecycle projection, rotation/progress/completion metrics, and registration/stale metadata. Legacy status, top-level busy/heartbeat, and distributed current-task/message/control fields are not created.

Existing workers preserve assignments, control inboxes, typed faults, metrics, rotation state, and other durable metadata. Registration sets the exact tab binding, fresh tab metadata, `enabled=true`, and stale-binding cleanup fields. A worker with custody cannot change role; a completing assignment is rebound without changing the Assignment, work item, terminal timestamp, or worker custody pointer. Registration never treats patch busy/heartbeat fields as runtime evidence and never clears a fault merely because the worker registered.

## Durable boundary and post-commit bridge work

`registerTabC10` obtains one supported-tab snapshot and one explicit registration time, then performs one `mutateFleet` transaction. The transaction applies the pure C10 binding operation and explicit `worker.registered` journal before any badge, window, bridge, or page effects. The minimal v2 result is `{worker, bindingMode, cleanupWarnings}`; it does not invoke `publicSnapshot`.

Post-commit badge, dedicated-window preparation, bridge setup, fresh-state proof, and registration notification are bounded by the accepted ten-second cleanup/transport timeout. Failures become deterministic cleanup warnings and cannot roll back or invert the durable binding. The v2 path does not invoke `cleanupLegacySleepTabs` or `reconcileBridgeRuntimeState`; bridge ping is observation only. Window projection is revalidated inside its mutation for the same worker and tab. Scheduling is fire-and-forget after the durable bind.

The registration notification is sent only after a successful fresh read proves the worker still owns the captured tab and no second worker owns it. A read or binding-proof failure skips the send. The message contains `registered:true`, the minimal canonical worker, and `expectedWorkerId`.

## Page registration race defense

`fleet-worker` now applies the v2 registration=true identity guard: an expected worker is accepted when the page identity is null or already equal; a stale expected worker conflicts with an existing different `registeredWorkerId` and returns `registration-identity-conflict` without overwriting identity or starting another recovery/heartbeat path. Omitted `expectedWorkerId` retains v1 behavior. The existing identity-scoped registration=false behavior remains intact.

## Candidate files changed

- `extension/fleet-state-model-m7-c10.js`
- `extension/tests/fleet-state-model-m7-c10.test.cjs`
- `extension/background.js`
- `extension/fleet-worker.js`
- copied manifest accounting updates in `extension/fleet-state-model-m5a.cjs`, `extension/fleet-state-model-m5b.cjs`, and `extension/fleet-state-model-m6.cjs`

## Validation evidence

- C10 focused: 8/8
- C1-C10 plus M0-M6 focused command: 258/258
- M0-M6 focused: 129/129
- all copied `fleet-*`: 383/383
- all candidate tests: 436/436
- `node --check` background, fleet-worker, and C10 module: pass
- `git diff --check`: pass
- C10 zero-legacy/browser-safe scan and registration identity scans: pass
- authoritative main tracked-production protection scan: pass

## Remaining scope

C11+ remains out of scope: role/enabled/policy/topology mutation APIs, clear-completed, public snapshot/control-pane wiring, final C1 persistence/load-save authority cutover, and global zero-legacy proof.

`C10 READY_FOR_VERIFY`  
`M7 ACTIVE`
