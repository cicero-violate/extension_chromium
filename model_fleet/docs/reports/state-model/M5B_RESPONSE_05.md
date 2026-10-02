# M5B response 05

## Scope and status

- Assigned scope: repair M5B only; M6/M7 were not started.
- Before: M0–M5A = DONE, M5B = VERIFY, M6/M7 = TODO; HEAD `02183c4668c214e2a130747ab9b9820b6272cd43`, branch `main`.
- After: M0–M5A = DONE, M5B = VERIFY, M6/M7 = TODO. M5B was not promoted to DONE.
- No production source, browser/CDP/live fleet, dependency, staging, commit, push, or reset operation was performed.

## Repaired contracts

### Actual M4 recovery result composition

M5B recovery-clear validation now consumes the actual M4 result unchanged. It does not require M4 to inject `workerId` or `observedAt` into the result. The recovery event/input facts are supplied separately and are checked for worker identity and, when present, a timestamp at or after the fault time.

Allowed M4 result outcomes are only:

- `reattached-running`;
- `reattached`;
- `completion-reattached`;
- `no-owner`.

For reattached outcomes, the post-M4 canonical assignment and phase must match. Completion reattachment requires completing custody. For `no-owner`, the current pointer must be null and the separate recovery evidence must explicitly establish omitted/null page identity. Preservation, pending-proof, and unrecoverable-release outcomes reject.

Focused tests call `m4.reconcileRecoveryCustody()` and pass its real result object unchanged for running, completing, and no-owner cases.

### No-fault and wrong-fault clear behavior

Clear APIs now return unchanged no-op results before proof validation when there is no worker fault (`{ cleared:false, reason:'no-fault' }`) or when the existing fault code is outside that API’s scope (`fault-not-clearable`). They no longer dereference `worker.fault.at` when fault is null and do not throw generic TypeErrors.

### Canonical rotation completion

Rotation clearing now requires canonical pre-clear state:

- `fault.code='chat-rotation-failed'`;
- no active assignment;
- `lifecycle='rotation-failed'`;
- `chatRotationPending=true`;
- integer `tabId` matching the evidence;
- completion time at or after the fault time.

A caller-provided rotation intent cannot substitute for that state. Tests emulate the M7 composition step by applying the returned failure intent to a cloned candidate before successful rotation completion; immediate clearing while lifecycle remains `rotating` rejects.

### Durable no-owner heartbeat contradiction

For `contradictory-page-identity`, `applyM4FaultIntentV2()` now requires no current assignment, a durable runtime heartbeat time at or after the intent time, and durable `runtime.reportedAssignmentId` equal to the explicit reported identity. A fabricated no-owner intent without the accepted heartbeat observation rejects. Active mismatch and reserved claim structural checks remain enforced.

## Tests and validation

Passed:

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m5b.test.cjs` — 19/19.
- M0–M5A focused command — 74/74.
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — 218/218.
- `rtk node --check model_fleet/extension/fleet-state-model-m5b.cjs` — pass.
- `rtk node --check model_fleet/extension/background.js` — pass.
- `rtk node --check model_fleet/extension/fleet-worker.js` — pass.
- `rtk git diff --check` — pass.
- Production M5B import/load scan — pass.
- M5B Chrome-API scan — pass.
- M5B custody/task/message authority-mutation scan — pass.
- Exact manifest-boundary and broad worker-authority coverage scan — pass.

New focused coverage includes actual M4 reattached-running, completion-reattached, and no-owner results; rejection of preservation-only outcomes; no-fault/wrong-fault no-ops; canonical rotation-failed-to-complete sequencing; fabricated rotation proof rejection; and durable no-owner heartbeat contradiction composition.

## Worktree and dependencies

The worktree retains the existing isolated untracked M0–M5B artifacts and TODO files. No unrelated files were staged, reset, or discarded. Dependency files remain unchanged. Browser/account/profile state remains untouched.

## Acceptance result

M5B is **READY_FOR_VERIFY**. Independent verification remains required before promotion to DONE. M6 and M7 remain TODO.

