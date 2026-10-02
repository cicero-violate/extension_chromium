# M0 Response 03

## Assigned scope

Repair M0 only. Address the three independent-review gaps in the synthetic v1 migration specification/tests and correct the authoritative M0 documentation. Do not start M1, change production behavior, commit, push, reload the extension, touch live browser/fleet state, or change dependencies.

## Repository state

HEAD before and after: `02183c4668c214e2a130747ab9b9820b6272cd43`

Status before:

```text
?? model_fleet/extension/.#STATE_MODEL_CLEANUP_TODO.md
?? model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md
?? model_fleet/extension/tests/fleet-state-model-m0.test.cjs
```

Status after: identical. The `.#STATE_MODEL_CLEANUP_TODO.md` file was not touched. No files are staged.

## Files inspected and changed

Changed only:

- `model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md`
- `model_fleet/extension/tests/fleet-state-model-m0.test.cjs`

Production files inspected but unchanged:

- `model_fleet/extension/background.js`
- `model_fleet/extension/fleet-worker.js`

No dependency files changed.

## Repairs

The M0 specification now rejects all three malformed v1 residues fail-closed:

1. A worker with `currentAssignmentId = null` and non-empty `currentAssignmentKind` is rejected as `orphaned-worker-assignment-kind`.
2. A worker with `currentAssignmentId = null` and `currentAssignmentStartedAt > 0` is rejected as `stale-worker-assignment-start`.
3. An operator-directed message with `toWorkerId = "operator"`, `status = "delivered"`, and an `assignmentId` is rejected as `delivered-operator-assignment`.

The started-at predicate is explicitly scoped to null assignment custody. The test also asserts the exact synthetic fixture shapes, including the operator destination/status/assignment combination.

The TODO document now explicitly includes:

- `cancelled` tasks in the migration preserve list;
- both null-worker-assignment dangling-marker rejection rules;
- operator-delivered messages carrying `assignmentId` as contradictory;
- all three cases in the M0 and migration test matrices.

Existing M0 behavior remains intact: terminal `done | blocked | cancelled` task/message historical assignment references are allowed as migration input and designated for stripping during M2; repeated terminal history for one worker is not treated as contradictory; active/pending/queued custody remains migration-rejecting; operator-delivered messages without assignment IDs remain allowed; and synthetic v1 fixtures are not persisted or mutated.

## Validation

Exact commands and results:

```text
rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs
6 passed, 0 failed

rtk node --test model_fleet/extension/tests/fleet-*.test.cjs
131 passed, 0 failed

rtk node --check model_fleet/extension/background.js
exit 0

rtk node --check model_fleet/extension/fleet-worker.js
exit 0

rtk git diff --check
exit 0
```

No browser/CDP command was run. No live fleet state was touched.

## Risks and blockers

No blocker for M0 verification. This remains a test/specification-only cutover contract; production normalization and v2 persistence are intentionally not implemented. The authoritative TODO and M0 test artifacts are untracked in the worktree and were not committed.

## Acceptance

M0 is `READY_FOR_VERIFY`, not DONE. Independent verification must authorize any later DAG transition.

## Recommended next action

Run independent verification of M0 against this report and the exact synthetic fixture/test matrix. If accepted, proceed to the next authorized DAG node only; do not begin M1 as part of this repair.

## Dependency status

No dependency files changed. No dependency installation or lockfile update was performed.
