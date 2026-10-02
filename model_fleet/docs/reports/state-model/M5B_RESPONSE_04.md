# M5B response 04

## Scope and status

- Assigned scope: repair M5B only; M6/M7 were not started.
- Before: M0–M5A = DONE, M5B = VERIFY, M6/M7 = TODO; HEAD `02183c4668c214e2a130747ab9b9820b6272cd43`, branch `main`.
- After: M0–M5A = DONE, M5B = VERIFY, M6/M7 = TODO. M5B was not promoted to DONE.
- No production source, browser/CDP/live fleet, dependency, staging, commit, push, or reset operation was performed.

## Repaired contracts

### Dispatch attempt/timeline composition

`applyDispatchFailureFaultV2()` now requires the exact reserved assignment and a recorded positive `dispatchAttemptAt`. The supplied failure time must be finite, positive, and no earlier than both `dispatchAttemptAt` and `reservedAt`. Only then may M5B reset runtime busy or create the policy-derived fault.

The focused sequence now proves:

`M3 reserve -> M4 recordDispatchAttempt -> M5B applyDispatchFailureFaultV2 -> M4 releaseDispatchFailure`

The same assignment identity and monotonic timeline are accepted by both modules. Reservation without an attempt and failure before the attempt reject deterministically.

### Omitted heartbeat identity

Current-observation checks now use only explicit identity evidence from the current heartbeat. An omitted identity may preserve the prior `runtime.reportedAssignmentId`, but it cannot create a fresh mismatch or reserved-claim signal. Its M4 reconciliation result explicitly reports `hasAssignmentIdentity=false`. Explicit null and explicit non-null identities remain distinct fresh observations.

### Durable-state-bound fault clearing

Matching-heartbeat clearing now requires:

- same worker and compatible fault assignment;
- `observedAt` present, finite, positive, and exactly equal to the evidence event time;
- observed time at or after `fault.at`;
- durable runtime heartbeat time at or after `observedAt`;
- durable runtime `busy=true`;
- durable runtime reported assignment equal to the current assignment;
- explicit evidence identity, busy state, and assignment matching the durable runtime.

Thus a constructed evidence object cannot clear a fault before `applyHeartbeatObservationV2()` has accepted and persisted the matching observation.

Bridge/M4 clearing now requires a structured successful result with `ok=true`, a proven outcome (`reattached-running`, `reattached`, `completion-reattached`, or `no-owner`), same worker, valid recovery time, and assignment consistency. Preservation-only or pending-proof outcomes are insufficient. Rotation clearing requires explicit completion time, matching worker/tab when supplied, and a supported rotation-failed source state/intent.

### Validated M4 fault intent

`applyM4FaultIntentV2()` no longer accepts code plus assignment ID. It requires the validated heartbeat-produced contract: source, reason, worker, observed time, explicit identity, expected assignment, reported assignment, and canonical target. Active mismatches require a reported ID different from the current pointer; no-owner contradictions require a null expected/target; reserved claim contradictions require the exact reserved assignment and `claim-before-acceptance` reason. Fault time is derived from `observedAt`.

### Legacy stale/offline conversion

Legacy `stale` status now requires `lifecycle='stale'`; legacy `offline` status requires `lifecycle='offline'`. Contradictory status/lifecycle pairs reject with `legacy-status-lifecycle-contradiction`. Matching lifecycle values are preserved, so the converted worker remains offline under the M5B availability projection.

### Rotation tab binding

Rotation failure now requires an enabled, unassigned worker with pending rotation, `lifecycle='rotating'`, and an integer `tabId`. `tabAvailable=true` cannot substitute for the concrete tab binding required by the production rotation claim path.

## Tests and validation

Passed:

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m5b.test.cjs` — 15/15.
- M0–M5A focused command — 74/74.
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — 214/214.
- `rtk node --check model_fleet/extension/fleet-state-model-m5b.cjs` — pass.
- `rtk node --check model_fleet/extension/background.js` — pass.
- `rtk node --check model_fleet/extension/fleet-worker.js` — pass.
- `rtk git diff --check` — pass.
- Production M5B import/load scan — pass.
- M5B Chrome-API scan — pass.
- M5B custody/task/message authority-mutation scan — pass.
- Exact manifest-boundary and broad worker-authority coverage scan — pass.

New focused coverage includes no-attempt and pre-attempt dispatch failures, true M3/M4/M5B composition, preserved prior identity with omitted heartbeat identity, durable runtime proof requirements, fabricated M4-intent rejection, matching/contradictory stale/offline conversion, and missing/non-integer rotation tabs.

## Worktree and dependencies

The worktree retains the existing isolated untracked M0–M5B artifacts and TODO files. No unrelated files were staged, reset, or discarded. Dependency files are unchanged. Browser/account/profile state is untouched.

## Acceptance result

M5B is **READY_FOR_VERIFY**. Independent verification remains required before promotion to DONE. M6 and M7 remain TODO.

