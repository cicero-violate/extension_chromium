# M4 response 04

## Result and scope

M4 is `READY_FOR_VERIFY`; the ledger remains `M4 = VERIFY`. M0-M3 remain DONE and M5A/M5B remain TODO. This repair changed only isolated M4 artifacts and the M4 plan wording. No production source, storage, dependency, browser/CDP, live-fleet, commit, or push operation was performed.

Before and after:

- branch: `main`
- HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43` before and after
- prior untracked M0-M4 artifacts and editor backup were preserved
- final untracked set is unchanged in family: `STATE_MODEL_CLEANUP_TODO.md`, editor backup, M1-M4 model files, and M0-M4 focused tests
- no dependency files changed

## Recovery authority and counter semantics

The prepared operation now mirrors production `background.js:3937-3954`:

| Assignment kind | Authoritative recovery items | Piggyback control notices |
| --- | --- | --- |
| task | referenced task only | retained and untouched |
| message | referenced messages only | retained and untouched |
| control | referenced control notices only | not applicable |

`assignment.recoveryAttempt` and each selected item's `autoRecoveryAttempts` are validated as finite nonnegative integers; absent item counters mean zero. No arbitrary `Number()` coercion occurs. `used` is the maximum validated value across the authoritative family and the assignment counter. With `MAX_AUTO_RECOVERY_ATTEMPTS = 1`:

- `used < 1`: requeue, increment only the authoritative items to `used + 1`, and return `retryScheduled: true` with that attempt number;
- `used >= 1`: block/release, do not increment any counter, and return `retryScheduled: false` with `recoveryAttempt: used`.

Thus task/message piggyback notices remain unchanged, control-only notices become 1 on the first retry and remain 1 on exhaustion, and no result reports a nonexistent second retry. Malformed assignment or item counters reject with `invalid-recovery-attempt` or `invalid-auto-recovery-attempts` before mutation; rejected inputs remain unchanged.

## Release authority surface and phase matrix

The generic `releaseAssignment` helper is now private (`releaseAssignmentInternal`) and is not exported. The public release surface is path-specific: `releaseDispatchFailure`, `releaseHeartbeatLoss`, `releaseBridgeAssignment`, `cancelAssignment`, `applyAutomaticRecovery`, and fixed-semantics `flushActiveAssignments(state)`.

| Operation | Legal phase(s) | Policy |
| --- | --- | --- |
| dispatch failure | reserved, with `dispatchAttemptAt > 0` | requeue; preserve task `startedAt` and attempts |
| heartbeat loss | running only | requeue; reset task `startedAt` |
| bridge release | reserved/activating/running | requeue; reset task `startedAt`; never completing |
| operator cancel | any non-completing active phase | cancel; reset task `startedAt` |
| automatic recovery | active assignment through bounded retry/exhaustion | source-faithful counter policy; reset task `startedAt` |
| stop/flush | all non-completing active assignments | fixed cancellation; reset task `startedAt` |

`flushActiveAssignments` no longer accepts caller disposition. It always cancels active assignments and retains its atomic completing-custody pre-scan. Export-surface and illegal-phase tests cover these boundaries.

## Plan update

The M4 TODO now states that bounded retry uses the production authority family: task-only, message-only, or control-only counters; piggyback notices are retained but not counted; counters increment only when a retry is actually queued; exhaustion leaves the used counter unchanged.

## Validation

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m4.test.cjs` — **24/24 pass**.
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs model_fleet/extension/tests/fleet-state-model-m1.test.cjs model_fleet/extension/tests/fleet-state-model-m2.test.cjs model_fleet/extension/tests/fleet-state-model-m3.test.cjs` — **40/40 pass**.
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **189/189 pass**.
- `rtk node --check model_fleet/extension/fleet-state-model-m4.cjs` — pass.
- `rtk node --check model_fleet/extension/background.js` — pass.
- `rtk node --check model_fleet/extension/fleet-worker.js` — pass.
- `rtk git diff --check` — pass.
- Production M4 import/load scan over `background.js`, `fleet-worker.js`, `control-pane.js`, and `manifest.json` — no matches.
- M4 Chrome API scan — no `chrome.` references.

## Remaining risk / next action

Independent verification remains required before M4 can be promoted to DONE. M4 remains isolated and non-deployable; M5A/M5B must not start until that acceptance occurs.
