# M0 Response 02 — Independent-Review Repair

## Assigned node/scope

Repair M0 only: correct terminal-history cutover semantics, add cancelled-task/offline-worker characterization, reject dangling nonterminal custody, and rerun M0 validation.

No production behavior, schema persistence, live extension state, browser profile, dependency file, commit, or push was changed.

## Exact repository state

Before repair:

```text
HEAD: 02183c4668c214e2a130747ab9b9820b6272cd43
branch: main
worktree: untracked files only:
  model_fleet/extension/.#STATE_MODEL_CLEANUP_TODO.md
  model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md
  model_fleet/extension/tests/fleet-state-model-m0.test.cjs
```

After repair:

```text
HEAD: 02183c4668c214e2a130747ab9b9820b6272cd43
branch: main
same three untracked files; no tracked files modified; nothing staged
```

The pre-existing `.#STATE_MODEL_CLEANUP_TODO.md` file was not touched.

## Files inspected and changed

Inspected:

- `model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md` (reread before repair)
- `model_fleet/extension/background.js`
- `model_fleet/extension/fleet-worker.js`
- `model_fleet/extension/control-pane.js`
- `model_fleet/extension/tests/fleet-state-model-m0.test.cjs`
- existing `model_fleet/extension/tests/fleet-*.test.cjs`

Changed only:

```text
model_fleet/extension/tests/fleet-state-model-m0.test.cjs
```

No production source changed.

## Corrected current implementation inventory

Current task lifecycle is:

```text
pending | running | done | blocked | cancelled
```

`cancelled` is production behavior: `releaseWorkerAssignment()` defaults `terminalStatus` to `cancelled` around `background.js:3429`, and operator cancellation uses that path with `requeue: false`.

Current message lifecycle is:

```text
queued | running | done | blocked | cancelled | delivered
```

`delivered` is the operator terminal-delivery state. `blocked` is used for exhausted protocol repair.

Current worker lifecycle includes:

```text
idle | waiting | activating | running | warm-idle | rotating |
rotation-failed | stale | offline
```

`offline` is a real value used by disabled/unavailable and dispatch-failure paths. No lifecycle redesign was attempted.

Current worker custody remains distributed across:

```text
worker.currentAssignmentId
worker.currentAssignmentKind
worker.currentAssignmentStartedAt
worker.currentTaskId
worker.currentMessageId
worker.currentMessageIds
worker.currentControlNoticeIds
task.assignmentId
message.assignmentId
```

There is no durable `state.assignments` map.

Mutation inventory:

- schema/normalization: `background.js:301-405`;
- public snapshot/projections: `background.js:471-530`;
- assignment reconstruction/clear/requeue: `background.js:856-970`;
- bridge, registration, lifecycle, and rotation recovery: approximately `background.js:1095-1691`;
- task/message construction: `background.js:2015-2092`;
- message/task/control reservation: `background.js:2377-2504`;
- dispatch failure and scheduling: `background.js:2533-2830`;
- completion and release: `background.js:2833-3005`;
- heartbeat and hello reconciliation: `background.js:3038-3190`;
- cancellation/flush: `background.js:3429-3564`;
- retry and automatic recovery: `background.js:3819-3830` and `3937-3996`.

Legacy-field consumers include the same background helper/scheduler/recovery paths and `control-pane.js` around lines 223–225, 327–367, 445–511, 529–537, 583–599, 626–686, and 695–702. `fleet-worker.js` does not directly read durable worker custody fields; it consumes assignment IDs and runtime completion/heartbeat messages.

## Repaired M0 predicate semantics

The test-only `migrationDecisionV1()` is a specification for the future M2 gate. It does not call production normalization or write storage.

It rejects:

- active worker custody in `currentAssignmentId`, `currentTaskId`, `currentMessageId(s)`, or `currentControlNoticeIds`;
- live heartbeat `activeAssignmentId`;
- pending completion handoff;
- `running` tasks;
- `pending` tasks carrying `assignedWorkerId` or `assignmentId`;
- `running` messages;
- `queued` messages carrying an assignment ID.

It allows:

- pending, done, blocked, and cancelled task records;
- done, blocked, and cancelled worker-message records;
- terminal historical `assignmentId` and `assignedWorkerId` references;
- multiple terminal tasks historically associated with the same worker;
- operator `delivered` messages;
- stale, rotating, and offline workers without active custody.

Terminal historical references remain in the v1 fixture and are designated for M2 stripping during quiescent migration. They are not treated as active custody.

## Repaired fixture matrix

The synthetic M0 fixture file now covers:

- empty state;
- idle registered workers;
- pending task DAG;
- queued worker messages;
- operator-delivered message;
- blocked protocol-repair message;
- stale, rotating, and offline workers;
- cancelled task;
- done, blocked, and cancelled terminal tasks with historical assignment/worker references;
- three terminal tasks historically associated with the same worker;
- done, blocked, and cancelled terminal worker messages with historical assignment references;
- active task assignment;
- active batched-message assignment;
- active control assignment;
- heartbeat mismatch/live reported custody;
- pending completion handoff;
- contradictory active ownership;
- pending task with dangling `assignedWorkerId` and `assignmentId`;
- queued message with dangling `assignmentId`.

Active v1 custody fixtures are explicitly migration-reject cases. No active assignment is reconstructed.

## Exact commands and results

```text
rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs
```

Result: **5 passed, 0 failed**.

```text
rtk node --test model_fleet/extension/tests/fleet-*.test.cjs
```

Result: **130 passed, 0 failed**.

```text
rtk node --check model_fleet/extension/background.js
rtk node --check model_fleet/extension/fleet-worker.js
```

Result: both passed.

```text
rtk git diff --check
```

Result: passed.

## Safety and dependency status

- No production behavior changed.
- No schema v2 persistence enabled.
- No storage writes performed.
- No live browser/fleet interaction.
- No browser profile/account changes.
- No commit or push.
- No dependency files changed.
- No files staged.

## Acceptance status

The reviewed M0 gaps are repaired:

- cancelled task phase is characterized;
- terminal historical task/message assignment references are allowed;
- repeated terminal worker history is allowed;
- dangling pending/queued custody is rejected;
- operator `delivered` remains allowed;
- offline lifecycle is recorded;
- focused and relevant tests are green.

M0 result: **READY_FOR_VERIFY**. Implementation does not mark the node DONE.

## Recommended next DAG state/action

Independent verification should review this report and promote M0 to DONE if accepted. Next executable node: M1 — pure state vocabularies, legal transition tables, availability derivation, and invariant helpers. M1 must remain behavior-neutral and must not enable schema v2 persistence.

## Dependency-file status

No dependency files changed. Expected dependency changes remain none.
