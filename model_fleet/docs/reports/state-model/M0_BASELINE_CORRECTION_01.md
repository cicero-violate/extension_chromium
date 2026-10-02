# M0 Baseline Correction 01

## Assigned scope

Repair the M0 baseline inventory only. Correct worker lifecycle/status characterization and add synthetic manual/cancelling worker fixtures. Keep M0 and M1 at `VERIFY`, M2 at `TODO`. Do not change production behavior, M1 semantics, schema-v2 persistence, live browser/fleet state, dependencies, commit state, or push state.

## Worktree and HEAD

HEAD before and after: `02183c4668c214e2a130747ab9b9820b6272cd43`

Status before:

```text
?? model_fleet/extension/.#STATE_MODEL_CLEANUP_TODO.md
?? model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md
?? model_fleet/extension/fleet-state-model-m1.cjs
?? model_fleet/extension/tests/fleet-state-model-m0.test.cjs
?? model_fleet/extension/tests/fleet-state-model-m1.test.cjs
```

Status after: identical. No files are staged. No commit or push was performed.

Ledger after correction:

```text
M0 = VERIFY
M1 = VERIFY
M2 = TODO
```

## Corrected inventory

`docs/architecture/STATE_MODEL_CLEANUP_TODO.md` now records current generated/persisted worker lifecycle values as:

```text
idle, waiting, activating, running, warm-idle,
rotating, rotation-failed, stale, offline, manual
```

Current generated/persisted worker status values are recorded as:

```text
idle, waiting, activating, running, blocked, stale, offline, cancelling
```

The inventory separately documents `sleeping` and `parking` as legacy v1 lifecycle inputs accepted at normalization ingress and converted to `idle`; they are not current generated steady-state lifecycle outputs. This matches `background.js` normalization behavior and does not alter it.

Production evidence was inspected only:

- operator focus can assign `worker.lifecycle = 'manual'` when no assignment is active;
- operator cancellation sets `worker.status = 'cancelling'` while active custody remains;
- normalization accepts legacy `sleeping`/`parking` lifecycle values and converts them to `idle`.

## Synthetic M0 fixture semantics

`model_fleet/extension/tests/fleet-state-model-m0.test.cjs` now includes:

- `manualWorker`: lifecycle `manual`, no assignment custody; migration is allowed as quiescent v1 state;
- `cancellingActiveAssignment`: status `cancelling`, current assignment/task custody, and running task; migration is rejected with `active-worker-custody`;
- existing stale/rotating/offline and all prior active/terminal custody fixtures remain unchanged.

No `sleeping`/`parking` fixtures were added because the requested characterization is already captured by the source inventory and normalization evidence; no production normalization semantics were changed.

## Files changed

- `model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md`
- `model_fleet/extension/tests/fleet-state-model-m0.test.cjs`

Production files and M1 model/tests were not changed in this correction. No dependency files changed.

## Validation

Exact final commands and results:

```text
rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs
6 passed, 0 failed

rtk node --test model_fleet/extension/tests/fleet-state-model-m1.test.cjs
10 passed, 0 failed

rtk node --test model_fleet/extension/tests/fleet-*.test.cjs
141 passed, 0 failed

rtk node --check model_fleet/extension/background.js
exit 0

rtk node --check model_fleet/extension/fleet-worker.js
exit 0

rtk git diff --check
exit 0
```

No browser/CDP or live fleet interaction was performed.

## Risks and blockers

No blocker remains for this bounded M0 correction. M0 remains pending independent review because the baseline inventory was corrected in this turn. M1 remains `VERIFY` and M2 remains `TODO`; neither was promoted or started.

## Acceptance

M0 correction result: `READY_FOR_VERIFY`. Independent verification must review the lifecycle/status inventory and the manual/cancelling fixture semantics before promoting M0.

## Recommended next action

Independently review this corrected M0 baseline. If accepted, restore M0 to DONE and separately assess whether M1 can be promoted; do not start M2 until both gates are accepted.

## Dependency status

No dependency files changed. No dependency installation or lockfile update was performed.
