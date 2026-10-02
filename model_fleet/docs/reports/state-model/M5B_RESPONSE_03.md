# M5B response 03

## Scope and status

- Assigned scope: repair M5B only; M6/M7 not started.
- Before: ledger M0–M5A = DONE, M5B = VERIFY, M6/M7 = TODO. HEAD was `02183c4668c214e2a130747ab9b9820b6272cd43`; branch `main`.
- After: ledger remains M0–M5A = DONE, M5B = VERIFY, M6/M7 = TODO. M5B was not marked DONE.
- Production behavior was not changed. No browser/CDP/live fleet interaction, dependency change, commit, push, staging, or reset occurred.

## Repairs

### Exact dispatch-failure assignment binding

`applyDispatchFailureFaultV2()` now requires a non-empty assignment ID and validates all of the following before mutation:

1. `worker.currentAssignmentId` exactly equals the reported ID;
2. `state.assignments[assignmentId]` exists;
3. the assignment belongs to the supplied worker;
4. the assignment phase is `reserved`, matching the pre-acceptance `failDispatch`/M4 release path.

No-owner, wrong-ID, missing-ID, wrong-worker, and wrong-phase inputs leave state unchanged or fail with deterministic M5B diagnostics. Only the exact canonical reservation can reset runtime busy and create the policy-derived `dispatch-failed` fault, whose assignment ID comes from the validated custody record.

### Proof-bearing fault clearing

Fault clearing now validates the evidence against the canonical worker and existing fault:

- matching-heartbeat proof requires the same worker, timestamp at or after `fault.at`, explicit identity, `busy=true`, a current assignment, exact reported/current assignment identity, and compatible fault assignment ID;
- bridge/M4 recovery proof requires an explicit proof token (`bridge-reattached` or `m4-custody-confirmed`), same worker, timestamp, and assignment consistency;
- rotation proof requires `rotation-complete` evidence plus a rotation-failed source intent/state.

Free-form tags, stale evidence, null/omitted/mismatched heartbeat evidence, wrong-worker evidence, and no-owner matching-heartbeat evidence fail closed.

### Rotation failure and heartbeat fault authority

`applyRotationFailureFaultV2()` now requires an enabled, bound, unassigned worker with `chatRotationPending=true` and `lifecycle='rotating'`; it resets only runtime busy and returns the M7 rotation intent. The public free-form `applyHeartbeatMismatchFaultV2()` export was removed. `applyM4FaultIntentV2()` now requires the intent assignment ID to equal the worker’s canonical pointer, or null when the worker has no assignment.

### Legacy conversion vocabulary

Legacy worker status is now validated before conversion. The accepted current vocabulary is exactly:

`idle`, `waiting`, `blocked`, `stale`, `offline`, `activating`, `running`, `cancelling`.

Unknown and non-string values reject deterministically. Existing blocked conversion still requires a source-faithful timestamp or explicit migration observation time; no timestamp is invented.

### Exact M7 worker manifest boundaries

Named manifest entries were corrected to lexical function ranges, including:

- `normalizeFleetState` 323–414;
- `roleActivityCounts` 421–440;
- `publicSnapshot` 471–531;
- `beginWarmIdle` 1159–1186;
- `settleWorkerIdle` 1301–1317;
- `failDispatch` 2527–2570;
- `focusWorker` 3407–3425;
- `releaseWorkerAssignment` 3429–3501;
- `cancelWorkerDispatch` 3502–3547;
- `stopAndFlushStaleWork` 3549–3603.

Neighboring authority occurrences are separate `site:` entries. The manifest test now requires each named entry to start on the declared function declaration and end at its lexical closing brace; broad occurrence coverage remains a separate assertion.

## Tests and commands

Passed:

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m5b.test.cjs` — 12/12.
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m5a.test.cjs model_fleet/extension/tests/fleet-state-model-m4.test.cjs model_fleet/extension/tests/fleet-state-model-m3.test.cjs model_fleet/extension/tests/fleet-state-model-m2.test.cjs model_fleet/extension/tests/fleet-state-model-m1.test.cjs model_fleet/extension/tests/fleet-state-model-m0.test.cjs` — 74/74.
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — 211/211.
- `rtk node --check model_fleet/extension/fleet-state-model-m5b.cjs` — pass.
- `rtk node --check model_fleet/extension/background.js` — pass.
- `rtk node --check model_fleet/extension/fleet-worker.js` — pass.
- `rtk git diff --check` — pass.
- Production import/load scan for `fleet-state-model-m5b` — pass.
- M5B Chrome-API scan — pass.
- M5B custody/task/message authority-mutation scan — pass.
- Exact named-function boundary and broad worker-authority manifest scan — pass.

The focused M0–M5B total is 86/86 when the 12 M5B tests are combined with the 74 M0–M5A tests.

## Worktree and dependency state

No tracked files were changed by this turn. The existing isolated untracked M0–M5B artifacts and TODO files remain present; no unrelated files were staged or modified. Dependency files remain unchanged. Browser/account/profile state remains untouched.

## Acceptance result

M5B is **READY_FOR_VERIFY**. Independent verification must decide whether to promote M5B to DONE. M6 remains TODO and must not start before that acceptance.

