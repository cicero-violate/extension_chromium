# M0 Response 01 — Baseline, Fixtures, and Cutover Preconditions

## Assigned node/scope

M0 only: inventory and characterization, synthetic v1 fixtures, and a pure migration-quiescence predicate specification.

No production behavior, schema persistence, live extension state, browser profile, dependency file, commit, or push was changed.

## Exact repository state

Before work:

```text
HEAD: 02183c4668c214e2a130747ab9b9820b6272cd43
branch: main
worktree: clean except for the pre-existing untracked STATE_MODEL_CLEANUP_TODO.md
```

After work:

```text
HEAD: 02183c4668c214e2a130747ab9b9820b6272cd43
```

Untracked files now present:

```text
model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md
model_fleet/extension/tests/fleet-state-model-m0.test.cjs
```

No tracked files are modified. Nothing is staged.

## Files inspected

- `model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md`
- `model_fleet/extension/background.js`
- `model_fleet/extension/fleet-worker.js`
- `model_fleet/extension/control-pane.js`
- `model_fleet/extension/tests/*`

## File changed

Only this new test file was added:

```text
model_fleet/extension/tests/fleet-state-model-m0.test.cjs
```

The test is synthetic and test-only. It does not call production normalization, write `chrome.storage`, or reconstruct active assignments.

## Current schema and authority inventory

`background.js:freshFleetState()` around lines 301–320 currently creates schema `version: 1` with:

```text
workers
tasks
messages
journal
roleActivity
policy
topology
goal
```

There is no durable `state.assignments` map.

`normalizeFleetState()` around lines 323–405 currently normalizes worker IDs and legacy worker fields, including:

```text
worker.currentAssignmentId
worker.currentAssignmentKind
worker.currentAssignmentStartedAt
worker.currentTaskId
worker.currentMessageId
worker.currentMessageIds
worker.currentControlNoticeIds
```

It does not perform a v1-to-v2 cutover.

`mutateFleet()` around lines 549–570 is the serialized storage-write boundary, but its callback currently permits direct domain-field mutation.

## Task lifecycle mutation inventory

Task construction and initial state:

- `createTaskInState()` around lines 2015–2059 creates `status: pending`.
- `fleet:create-task` handler around lines 3779–3792 creates tasks and kicks scheduling.

Task reservation and running transition:

- `chooseDispatches()` around lines 2455–2480 sets task status to `running`, assigns the worker, writes `task.assignmentId`, increments attempts, and creates the dispatch record.

Task completion/blocking:

- `completeAssignment()` around lines 2933–2942 sets a task to `done` or `blocked`, records result/timestamps, and journals `task.done`/`task.blocked`.

Task requeue/recovery/cancellation:

- Dispatch failure handling around lines 2533–2564 returns tasks to `pending`.
- Bridge/page recovery around lines 1467–1515 requeues running tasks.
- `releaseWorkerAssignment()` around lines 3440–3460 requeues or terminally cancels/blocks tasks.
- `fleet:retry-task` around lines 3819–3830 resets non-running tasks to `pending`.
- Automatic recovery around lines 3937–3978 requeues or exhausts task recovery.

Task scheduling/read consumers:

- `taskRunnable()`/workflow gates around lines 1706–1735.
- Task selection in `chooseDispatches()` around lines 2450–2470.
- Scheduler checks around lines 2749–2780.
- Goal-frontier fingerprinting around lines 2110–2117.

## Message lifecycle mutation inventory

Message construction:

- `queueSemanticMessage()` around lines 2062–2092 creates worker messages as `queued` and operator messages as `delivered`.
- Protocol repair, Coordinator routing, operator controls, and goal continuation all call this constructor.

Message reservation/start:

- Message batching in `chooseDispatches()` around lines 2398–2429 sets selected messages to `running`, assigns `message.assignmentId`, and records delivery time.

Message completion/blocking:

- `completeAssignment()` around lines 2946–2965 marks source messages `done`, or `blocked` when bounded protocol repair is exhausted.

Message requeue/cancel:

- `requeueAssignmentMessages()` around lines 887–905 returns assigned messages to `queued`.
- Bridge/recovery release paths around lines 1467–1525 requeue messages.
- `releaseWorkerAssignment()` around lines 3462–3474 requeues or terminally cancels messages.
- Authority stop/flush around lines 3553–3564 cancels queued worker messages.
- Automatic recovery around lines 3937–3978 requeues or blocks messages.

Message scheduling/read consumers:

- `chooseDispatches()` selects queued worker messages around lines 2390–2405.
- `schedule()` checks queued messages around lines 2749–2778.
- Goal-frontier fingerprinting reads message status around lines 2115–2117.
- `publicSnapshot()` and queue diagnostics read message status around lines 492–519.

## Worker and assignment custody mutation inventory

Assignment meaning is currently reconstructed rather than stored as a first-class record.

Reconstruction/helper family:

- `assignmentMessageIds()` around lines 856–864.
- `assignmentMessages()` around lines 866–869.
- `assignmentControlNoticeIds()` around lines 871–874.
- `clearWorkerAssignmentState()` around lines 876–884.
- `consumeAssignmentControlNotices()` around lines 918–927.
- `assignmentForWorker()` around lines 911–950.
- `releaseUnrecoverableBridgeAssignment()` around lines 954–970.

Reservation writes:

- Message assignment: lines 2411–2421.
- Task assignment: lines 2460–2470.
- Control assignment: lines 2496–2504.

Dispatch/activation writes:

- Dispatch activation and failure handling around lines 2533–2665.
- Worker wake/idle and bridge lifecycle around lines 1095–1171.
- Rotation lifecycle and failure paths around lines 1283–1455.
- Registration/reconciliation around lines 1577–1691.

Completion/release writes:

- Exact assignment ownership check and completion parsing: lines 2833–2860.
- Task/message terminal updates: lines 2933–2965.
- Worker release/idle transition: approximately lines 2990–3005.
- Explicit release/cancel path: lines 3429–3477.
- Stop/flush path: lines 3506–3564.

Heartbeat/reconciliation writes:

- Heartbeat observation and batching: lines 3038–3110 and `updateWorkerHeartbeat()` around 3118–3130.
- Durable heartbeat reconciliation: lines 3038–3105.
- Hello/restart reconciliation: lines 3130–3190.

## Legacy custody consumers

Production `background.js` consumers of the legacy custody fields include:

- `publicSnapshot()` and queue diagnostics: lines 471–519.
- `assignmentMessageIds()`, `assignmentMessages()`, `assignmentForWorker()`: lines 856–950.
- bridge recovery and dispatch authorization: lines 954–1171 and 1334–1455.
- worker registration/reconciliation: lines 1577–1691.
- worker eligibility/ranking: lines 1731–1780.
- message/task/control reservation: lines 2377–2504.
- dispatch failure and schedule diagnostics: lines 2533–2665 and 2719–2830.
- completion: lines 2833–3005.
- heartbeat/reconciliation: lines 3038–3190.
- cancellation/flush: lines 3429–3564.
- automatic recovery: lines 3937–3996.

`fleet-worker.js` does not directly read durable worker custody fields. It consumes assignment IDs, completion handoff markers, heartbeat observations, and negative acknowledgments through the runtime message protocol.

## Public snapshot and control-pane consumers

`publicSnapshot()` exposes or derives:

- worker `status`, `lifecycle`, `busy`, `heartbeatAt`;
- `currentAssignmentId`;
- `currentTaskId`/`currentMessageId` and message counts;
- queue counts and active-assignment counts;
- task `status` plus workflow-block reasons;
- message `status`;
- journal and diagnostics.

Relevant `background.js` projection lines are approximately 471–530.

`control-pane.js` consumes these legacy projections at least at:

- lines 223–225: role counts using assignment/lifecycle/status;
- lines 327–367: task/message status predicates;
- lines 445–511: worker lifecycle, status, assignment, and queue rendering;
- lines 529–537: task status rendering;
- lines 583–599: assignment/queue diagnostics;
- lines 626–686: invariant/exception diagnostics;
- lines 695–702: active/live worker counts.

The UI is currently a consumer/projection, but it reads several fields that will require migration after the internal v2 authority is established.

## M0 synthetic fixture matrix

Added to `fleet-state-model-m0.test.cjs`:

Allowed quiescent v1 characterization fixtures:

- empty state;
- idle registered workers;
- pending task DAG;
- queued worker messages;
- operator-delivered message;
- blocked protocol-repair message;
- stale worker;
- rotating worker.

Rejected future-cutover fixtures:

- active task assignment;
- active batched-message assignment;
- active control assignment;
- heartbeat-reported active custody;
- active worker custody/heartbeat mismatch;
- pending completion handoff;
- contradictory task ownership.

The rejected cases are explicitly migration-reject cases. The test does not reconstruct any active assignment and does not write storage.

## Pure migration-quiescence predicate specification

The test-only `migrationDecisionV1()` specification allows v1-to-v2 cutover only when:

- input is explicitly version 1;
- no pending completion handoff exists;
- no worker has assignment/task/message/control custody fields set;
- no heartbeat reports a live assignment ID;
- no task is running or assigned;
- no worker-directed message is running or assigned;
- no contradictory task ownership is present.

It returns a structured allow/reject result with a concrete reason. It never mutates the fixture. This is intentionally a specification for M2, not a production migration gate.

## Commands and results

Focused M0 test:

```text
rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs
```

Result: 4 passed, 0 failed.

Relevant existing fleet/recovery suite:

```text
rtk node --test model_fleet/extension/tests/fleet-*.test.cjs
```

Result: 129 passed, 0 failed.

Syntax checks:

```text
rtk node --check model_fleet/extension/background.js
rtk node --check model_fleet/extension/fleet-worker.js
```

Result: both passed.

Diff validation:

```text
rtk git diff --check
```

Result: passed.

## Production/live-state safety

- No production source changed.
- No schema v2 persistence was enabled.
- No `chrome.storage` was modified.
- No live browser/fleet interaction occurred.
- No browser profile/account state was touched.
- No dependency files changed.
- No commit or push occurred.

## Risks and blockers

No M0 blocker was found.

Important M1/M2 risks recorded for the next node:

- Current v1 custody is distributed across worker, task, message, and control fields; active states must remain rejected during cutover.
- Operator `delivered` messages and blocked protocol-repair messages must remain distinct.
- Activating reservations intentionally tolerate an old/null heartbeat before custody confirmation.
- Missing heartbeat alone must not prove custody loss.
- `mutateFleet()` serializes persistence but does not yet enforce domain transitions.
- UI and diagnostics directly consume legacy projections and must not be migrated before internal authority is ready.

## Acceptance status

M0 implementation criteria are met for this turn:

- baseline HEAD/worktree recorded;
- lifecycle mutation and legacy-field consumer inventory recorded;
- synthetic fixture matrix added;
- active v1 cases reject migration rather than reconstructing custody;
- pure quiescence predicate specification added;
- production behavior unchanged;
- focused and relevant suites green;
- dependency-file status unchanged.

Per the execution protocol, this node is not marked DONE. Result: **READY_FOR_VERIFY**.

## Recommended next DAG state/action

Independent verification should review this report and the synthetic fixture matrix. If accepted, promote M0 to DONE and mark M1 READY.

Next implementation node: M1 — pure state vocabularies, transition tables, availability derivation, and invariant engine. M1 must remain behavior-neutral and must not enable schema v2 persistence.

## Dependency-file status

No dependency files changed. Expected dependency changes remain none.
