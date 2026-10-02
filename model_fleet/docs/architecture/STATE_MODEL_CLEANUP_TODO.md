# Model Fleet State-Model Cleanup — DAG Execution Ledger

Status: M7/M8/M9 COMPLETE — fixed point verified
Repository: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Baseline extension HEAD reviewed: `02183c4668c214e2a130747ab9b9820b6272cd43`
Primary implementation surface: `extension/background.js`
Dependency-file changes expected: **none**

This document replaces the earlier loose checklist with one execution DAG and one explicit state-authority model.

The cleanup is architectural, not cosmetic. The goal is to preserve every necessary state machine while removing overlapping authority, ambiguous names, and ad-hoc transition writes.

---

## 1. Problem statement

Model Fleet legitimately has several different state machines:

- durable task progress;
- semantic-message delivery;
- assignment custody;
- worker/browser runtime observations;
- worker availability;
- protocol/result verdicts;
- external project/ledger state.

The defect is **not** that there are many states.

The defect is that multiple concepts currently share generic names such as `status`, while assignment custody is spread across several worker/task/message fields and many direct mutation sites.

Current worker custody is distributed across:

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

Current worker execution/availability semantics are also split across:

```text
worker.status
worker.lifecycle
worker.busy
worker.heartbeatAt
liveHeartbeats
worker.lastDispatchError
worker.chatRotationPending
```

That permits contradictory combinations and makes race reasoning harder than necessary.

The recent custody-race repair proved the architectural requirement:

> assignment custody, heartbeat observation, worker availability, and task progress must remain separate facts with explicit reconciliation boundaries.

---

## 2. Review corrections to the first draft

The first draft had the correct direction, but several details were too broad or would have created unnecessary migration risk.

### 2.1 Task phases must preserve current semantics first

Current production task lifecycle is:

```text
pending
running
done
blocked
cancelled
```

`cancelled` is reachable today through `releaseWorkerAssignment(..., requeue: false)`; operator cancellation uses the default terminal status `cancelled`.

Target:

```text
TaskPhase =
  pending
  running
  done
  blocked
  cancelled
```

The refactor preserves this existing cancellation behavior; it does not invent a new task-cancellation feature.

### 2.2 Message phases must preserve operator `delivered`

Current production message lifecycle includes:

```text
queued
running
done
blocked
cancelled
delivered
```

`delivered` is used for messages whose destination is the operator and is a terminal delivery state.

Target:

```text
MessagePhase =
  queued
  running
  done
  blocked
  cancelled
  delivered
```

Do not collapse `delivered` into `done` during this refactor.

### 2.3 Do not invent a new worker lifecycle vocabulary during custody migration

Current `worker.lifecycle` values include:

```text
idle
waiting
activating
running
warm-idle
rotating
rotation-failed
stale
offline
manual
```

Current `worker.status` values include:

```text
idle
waiting
activating
running
blocked
stale
offline
cancelling
```

`sleeping` and `parking` are legacy v1 lifecycle inputs accepted at
normalization ingress and converted to `idle`; they are not current generated
steady-state lifecycle outputs.

The first draft proposed replacing these immediately with a new lifecycle vocabulary. That combines two changes:

1. custody authority cleanup;
2. worker-runtime semantic redesign.

Those MUST be separated.

The cleanup first makes worker availability derived while preserving existing observable behavior. Only after custody is canonical may obsolete lifecycle/status values be removed.

### 2.4 Do not reconstruct live v1 assignments during schema cutover

The first draft proposed reconstructing active task/message/control assignments from distributed v1 fields.

That is unnecessary high-risk work.

Canonical migration policy:

> v1 -> v2 storage cutover occurs only at verified fleet quiescence.

If v1 storage contains active assignment custody or running task/message state at cutover time, migration MUST fail closed and perform no storage rewrite.

Active-v1 reconstruction is therefore a **negative test**, not a supported migration path.

### 2.5 Assignment records are active-custody records, not permanent history

Do not create an ever-growing assignment archive in `chrome.storage.local`.

Target:

```text
state.assignments
  = currently active/reserved assignment custody only
```

Terminal assignment history remains in the bounded Journal.

When an assignment is durably released, its active record is removed after all task/message/control transitions succeed.

### 2.6 Project ledger state remains external

`PARALLEL_ARCHITECTURE_REFACTOR_TODO.md` belongs to the Canon repository and remains project-specific execution/acceptance authority.

The extension MUST NOT ingest Canon states such as `VERIFY` or `DONE` into scheduler state.

A fleet task may mention a project node such as `D2`, but:

```text
T-74 task phase != D2 ledger state
```

They are different authorities.

---

## 3. Authority model

Every mutable fact must have exactly one canonical owner.

| Concern                | Canonical authority                                               | Derived/observed only           |
| ---                    | ---                                                               | ---                             |
| Task progress          | `task.phase`                                                      | UI labels, counts               |
| Message delivery       | `message.phase`                                                   | UI labels, queue counts         |
| Assignment ownership   | `state.assignments[id]` + reciprocal `worker.currentAssignmentId` | prompt reconstruction           |
| Browser heartbeat      | `worker.runtime` observation                                      | never ownership by itself       |
| Worker block/fault     | explicit `worker.fault`                                           | UI exception text               |
| Worker availability    | derived function                                                  | never persisted as authority    |
| Agent verdict words    | protocol/result text                                              | never scheduler phase           |
| Project DAG node state | external repository ledger                                        | never extension scheduler state |
| UI status              | `publicSnapshot()` projection                                     | never fed back as authority     |

---

## 4. Canonical target state

### 4.1 Fleet schema

Target persisted schema:

```text
state.version = 2

state.workers
state.tasks
state.messages
state.assignments
state.journal
state.roleActivity
state.policy
state.topology
state.goal
...
```

### 4.2 Task

Target authoritative fields:

```text
task = {
  id,
  role,
  title,
  prompt,
  dependencies,
  priority,

  phase: pending | running | done | blocked | cancelled,

  assignedWorkerId,
  completedByWorkerId,

  createdAt,
  startedAt,
  completedAt,

  result,
  statusNote,
  recovery metadata...
}
```

Rules:

- `phase` is task progress authority.
- Do not persist an authoritative `task.assignmentId` after final cleanup.
- While compatibility work is incomplete, any legacy assignment field is migration input only.
- Task dependency semantics do not change.

### 4.3 Message

Target authoritative fields:

```text
message = {
  id,
  fromWorkerId,
  toWorkerId,
  taskId,
  body,

  phase: queued | running | done | blocked | cancelled | delivered,

  createdAt,
  deliveredAt,
  completedAt,

  routing / repair metadata...
}
```

Rules:

- `delivered` remains the terminal operator-delivery phase.
- Do not persist an authoritative `message.assignmentId` after final cleanup.
- Batched worker delivery is represented by the active Assignment record.

### 4.4 Assignment custody

Target active assignment record:

```text
assignment = {
  id,
  workerId,

  kind: task | message | control,
  taskId: string | null,
  messageIds: string[],
  controlNoticeIds: string[],

  phase:
    reserved
    activating
    running
    completing,

  reservedAt,
  dispatchAttemptAt,
  acceptedAt,
  startedAt,
  responseTerminalAt,

  recoveryAttempt,
  metadata...
}
```

Meaning:

- `reserved`: scheduler owns a durable reservation, no accepted page send yet.
- `activating`: page accepted the assignment/send path but matching heartbeat custody is not yet confirmed.
- `running`: a matching heartbeat confirms the page reports this exact assignment.
- `completing`: terminal assistant output exists and the page retains assignment identity until durable background acknowledgment.

Terminal assignments are removed from `state.assignments` only after release is durably complete.

Journal events preserve assignment history.

### 4.5 Worker

Target worker authority is deliberately small.

```text
worker = {
  id,
  role,
  enabled,

  tabId,
  windowId,
  title,
  url,

  currentAssignmentId,

  runtime: {
    lastHeartbeatAt,
    busy,
    reportedAssignmentId
  },

  fault: null | {
    code,
    message,
    at,
    assignmentId
  },

  chatTurnCount,
  chatRotationPending,
  rotation metadata,
  topology metadata,
  controlInbox,
  ...
}
```

After migration, these legacy custody fields must disappear:

```text
currentAssignmentKind
currentAssignmentStartedAt
currentTaskId
currentMessageId
currentMessageIds
currentControlNoticeIds
```

### 4.6 Worker availability is derived

Canonical projection:

```text
deriveWorkerAvailability(state, worker)
  -> offline
   | blocked
   | running
   | busy
   | idle
```

Suggested precedence:

```text
if worker disabled / stale / tab unavailable
    => offline

else if worker.fault != null
    => blocked

else if worker.currentAssignmentId != null
    => running

else if worker.runtime.busy == true and heartbeat is fresh
    => busy

else
    => idle
```

This is a projection only.

No scheduler or storage mutation may use a persisted availability string as authority.

### 4.7 Runtime/heartbeat observation

Heartbeat data is observation:

```text
worker.runtime.lastHeartbeatAt
worker.runtime.busy
worker.runtime.reportedAssignmentId
```

`liveHeartbeats` may remain an in-memory coalescing/debounce cache, but after flush the canonical persisted observation is `worker.runtime`.

Remove persisted top-level `worker.busy` and `worker.heartbeatAt` only after all readers migrate.

Heartbeat rules:

- heartbeat may confirm assignment custody;
- heartbeat may provide evidence of custody loss;
- heartbeat may detect a mismatch;
- heartbeat MUST NOT silently overwrite assignment ownership;
- missing heartbeat is not, by itself, proof of assignment loss;
- activating reservation + null/idle heartbeat remains protected from premature release;
- non-null mismatched assignment identity fails closed.

### 4.8 Worker lifecycle/rotation cleanup

Do not rename lifecycle values in the first implementation node.

After assignment custody and availability are canonical, review whether `worker.lifecycle` is still needed.

Target preference:

- assignment phases own work progress;
- `worker.runtime` owns heartbeat observation;
- `worker.fault` owns block/error state;
- explicit rotation fields own rotation state;
- derived availability owns UI/scheduler availability.

If those facts fully replace `worker.lifecycle`, remove it rather than inventing a second renamed lifecycle enum.

This decision is deferred to DAG node M6.

### 4.9 Agent verdict vocabulary

These remain natural-language/protocol result vocabulary only:

```text
IMPLEMENTED
VERIFIED
PENDING_FINAL_REVERIFY
BLOCKED
SUPERSEDED
ALREADY_REPAIRED / NO CHANGE
```

They must never become values of:

- TaskPhase;
- MessagePhase;
- AssignmentPhase;
- worker availability;
- project ledger state.

---

## 5. Transition API

Direct lifecycle writes are the main cleanup target.

Target mutation boundary:

```text
transitionTask(state, taskId, event)
transitionMessage(state, messageId, event)
transitionAssignment(state, assignmentId, event)
reconcileHeartbeat(state, workerId, observation)
setWorkerFault(state, workerId, fault)
clearWorkerFault(state, workerId, expectedCode?)
deriveWorkerAvailability(state, worker)
assertFleetInvariants(state)
```

Events should be semantic, not arbitrary setters.

Examples:

```text
TaskEvent:
  reserve
  start
  complete
  block
  requeue

MessageEvent:
  reserve
  start
  complete
  block
  cancel
  deliver_to_operator
  requeue

AssignmentEvent:
  reserve
  dispatch_attempt
  accept
  confirm_custody
  begin_completion
  release
  fail
  cancel
  recover
```

Illegal transitions fail closed with a concrete error.

No transition helper may infer authority from timing alone.

---

## 6. Core invariants

`assertFleetInvariants(state)` must mechanically enforce at least:

### Assignment ownership

- [ ] Every active assignment ID is unique.
- [ ] Every assignment references exactly one existing worker.
- [ ] Every worker has at most one `currentAssignmentId`.
- [ ] If `worker.currentAssignmentId = A`, then `state.assignments[A].workerId === worker.id`.
- [ ] If `state.assignments[A].workerId = W`, then `state.workers[W].currentAssignmentId === A`.
- [ ] No assignment references more than one task.
- [ ] A message batch contains only messages intended for the assigned worker.
- [ ] Control notice IDs referenced by an assignment exist in that worker's control inbox.

### Task/message consistency

- [ ] A `running` task has exactly one active task assignment referencing it.
- [ ] A `running` worker-directed message has exactly one active message assignment referencing it.
- [ ] A terminal task is not referenced by an active assignment.
- [ ] A terminal message is not referenced by an active assignment.
- [ ] An operator-`delivered` message has no active assignment.
- [ ] A pending task is not owned by an active task assignment.
- [ ] A queued message is not owned by an active message assignment.

### Assignment phase consistency

- [ ] `reserved` does not require page heartbeat custody.
- [ ] `activating` preserves reservation across an old/null heartbeat.
- [ ] `running` requires a matching reported assignment identity at the point custody was confirmed.
- [ ] A later missing heartbeat does not automatically invalidate running custody.
- [ ] `completing` retains assignment identity until durable completion acknowledgment.
- [ ] Completion acknowledgment must match the exact assignment ID.

### Worker projection

- [ ] Worker with an assignment derives `running`.
- [ ] Worker without an assignment cannot derive `running`.
- [ ] Explicit fault derives `blocked`.
- [ ] Stale/missing tab derives `offline`.
- [ ] `publicSnapshot()` cannot mutate authoritative state.

### Separation of duty

- [ ] Coordinator/Implementation/Review role contracts remain unchanged.
- [ ] Review independence rules remain unchanged.
- [ ] Task dependency gating remains unchanged.
- [ ] Goal-continuation rules remain unchanged.

---

## 7. Storage migration law

### 7.1 Versioning

Current:

```text
state.version = 1
```

Target:

```text
state.version = 2
```

### 7.2 Cutover rule

Supported cutover is **quiescent only**.

A v1 -> v2 persistent rewrite may run only when all are true:

```text
no worker.currentAssignmentId
no worker-owned active assignment custody
no running tasks
no running worker-directed messages
no reserved control assignment
no worker reports a live activeAssignmentId
no pending page completion handoff for a fleet assignment
no worker.lifecycle == rotating
no worker.chatRotationPending == true
```

Rotation is not quiescent. `rotateWorkerChat()` performs awaited browser/tab
readiness and bridge-reinjection work before later durable state writes, so a
cutover MUST reject both an in-progress `rotating` lifecycle and a pending
`chatRotationPending` marker. The source-faithful `rotation-failed` shape
retains `status=blocked` and `chatRotationPending=true`, so it is rejected by
the pending-rotation gate. `manual` with no assignment is quiescent.

If the precondition is not proven:

```text
migration = BLOCKED
storage remains version 1
no inferred repair
no partial rewrite
```

### 7.3 What migration preserves

- worker IDs;
- roles;
- worker registration/topology;
- task IDs and dependency DAG;
- message IDs and routing history;
- goal;
- policy;
- generation;
- journal;
- role activity;
- pending/blocked/done/cancelled tasks;
- queued/blocked/done/cancelled/delivered messages;
- terminal worker-directed done/blocked/cancelled message assignment IDs as historical IDs;
- control inboxes;
- chat rotation counters/metadata.

### 7.4 What migration removes

Because cutover is quiescent, v2 storage does not need to reconstruct active v1 assignment custody.

Migration strips obsolete quiescent legacy custody fields:

```text
worker.currentAssignmentKind
worker.currentAssignmentStartedAt
worker.currentTaskId
worker.currentMessageId
worker.currentMessageIds
worker.currentControlNoticeIds
task.assignmentId
message.assignmentId
```

Important v1 compatibility fact: successful completion currently leaves `task.assignmentId` / `message.assignmentId` (and task `assignedWorkerId`) on terminal records even after worker custody is cleared. Those terminal references are historical residue, not active custody. Quiescent migration MUST preserve terminal task/message semantics while removing those obsolete assignment references. It MUST NOT reject an otherwise-quiescent v1 state merely because a terminal `done | blocked | cancelled` task/message still carries its historical assignment ID.

By contrast, assignment/custody markers on `pending`, `queued`, or `running` work without exact reciprocal active worker custody are contradictory and migration-blocking.

`worker.currentAssignmentId` remains `null` at cutover and becomes the sole worker-side active-assignment reference in v2.

The M0 cutover gate also fails closed on these malformed v1 residues, even when no active assignment is otherwise visible:

- a worker has `currentAssignmentId = null` and a non-empty `currentAssignmentKind`;
- a worker has `currentAssignmentStartedAt > 0`;
- an operator-directed message has `status = delivered` together with an `assignmentId`.

These checks prevent stale custody markers from being mistaken for quiescence. Terminal worker-directed `done | blocked | cancelled` message assignment IDs remain preserved as historical IDs in the M0 fixture/test contract.

### 7.5 Non-quiescent v1 fixtures

Tests MUST include active v1 task/message/control fixtures.

The M0 migration matrix MUST also include malformed residues that are not
active custody by themselves but contradict the v1 authority model:

- `worker.currentAssignmentId = null` with non-empty `worker.currentAssignmentKind`;
- `worker.currentAssignmentId = null` with `worker.currentAssignmentStartedAt > 0`;
- operator-directed `status = delivered` message with an `assignmentId`.

Expected result:

```text
migration rejected / deferred
v1 bytes/state unchanged
clear diagnostic reason
```

Do not support live-assignment reconstruction merely to make migration tests pass.

### 7.6 No long-lived dual authority

M2 through M6 are preparatory, isolated, non-deployable work. During those
nodes:

- `freshFleetState()` remains version 1;
- production `loadFleetState()`, `saveFleetState()`, and `mutateFleet()` remain v1;
- no v2 write reaches `chrome.storage`;
- no schema-writing build is loaded or reloaded into the live extension;
- isolated tests may exercise v2 codecs, transitions, and projections only.

There is no feature flag, dual runtime path, or v1/v2 mirror authority.

M7 is the ONE canonical authority cutover. Only after M2, M3, M4, M5A, M5B,
and M6 are independently DONE and strengthened quiescence is re-proven may
M7 atomically:

- migrate persisted v1 to v2 exactly once;
- switch production load/save/mutate to v2;
- wire the prepared v2 operations;
- stop all legacy authoritative writes in the same cutover;
- remove/strip obsolete legacy custody/status authority as specified.

There must be no period in which both v1 and v2 are writable authorities.
Intermediate M2-M6 snapshots are explicitly NON-DEPLOYABLE to the live
extension.

After the atomic M7 cutover:

- all scheduler writes use v2 transitions;
- v1 fields are not written;
- v1 is accepted only as one-time migration input;
- v2 code does not continuously mirror v1 fields.

---

## 8. Current source inventory

Reviewed at extension HEAD `02183c4668c214e2a130747ab9b9820b6272cd43`.

### Current schema

- `freshFleetState()` writes `version: 1`.
- no durable `state.assignments` map exists.
- `normalizeFleetState()` rewrites legacy worker IDs and normalizes existing fields.

### Current assignment reconstruction

`assignmentForWorker()` reconstructs active assignment meaning from:

- `worker.currentAssignmentId`;
- `worker.currentTaskId`;
- task `assignmentId`;
- `worker.currentMessageIds`;
- message `assignmentId`;
- `worker.currentAssignmentKind`;
- `worker.currentControlNoticeIds`.

### Current assignment helper family

- `assignmentMessageIds()`
- `assignmentMessages()`
- `assignmentControlNoticeIds()`
- `clearWorkerAssignmentState()`
- `requeueAssignmentMessages()`
- `consumeAssignmentControlNotices()`
- `assignmentForWorker()`
- `releaseUnrecoverableBridgeAssignment()`
- `completeAssignment()`
- `releaseWorkerAssignment()`

### Current direct lifecycle writes

Production code directly mutates task/message/worker status and lifecycle at reservation, dispatch, completion, heartbeat, recovery, cancellation, registration, rotation, and flush boundaries.

These direct writes are migration targets.

### Current UI coupling

`publicSnapshot()` and `control-pane.js` consume current status/lifecycle/custody projections.

The UI must migrate after the internal v2 model is authoritative, not before.

---

# 9. Execution DAG

High-level DAG:

```text
M0  Baseline + quiescence/migration fixtures
 |
 v
M1  Pure state vocabulary + transition/invariant engine
 |
 v
M2  Pure v2 schema + v1->v2 migration codec/gate (isolated, non-deployable)
 |
 v
M3  Prepare canonical v2 assignment reservation/custody operations
 |
 v
M4  Prepare v2 heartbeat/completion/recovery/cancellation operations
 |   heartbeat / completion / recovery / cancellation / dispatch failure
 +-------------------+
 |                   |
 v                   v
M5A                M5B
Prepare task/       Prepare worker runtime/
message transition  fault/availability integration
integration           |
 |                   |
 +---------+---------+
           |
           v
M6  Prepare v2 publicSnapshot/UI/diagnostic projection contract
 |
 v
M7  ATOMIC AUTHORITY CUTOVER (only persistence/runtime switch)
 |
 v
M8  Mechanical file/module split only
 |
 v
M9  Full live verification + fixed point
```

Dependencies:

```text
M0 -> M1
M1 -> M2
M2 -> M3
M3 -> M4
M4 -> M5A
M4 -> M5B
M5A + M5B -> M6
M2 + M3 + M4 + M5A + M5B + M6 -> M7
M7 -> M8
M8 -> M9
```

M5A and M5B may proceed as logically independent isolated v2 contract/test work after M4 is DONE. They must not wire or modify production `background.js`, `fleet-worker.js`, or `control-pane.js` behavior before M7. If they share isolated v2 helper/test files, coordinate file ownership or integrate serially only for those preparatory artifacts; production hunk overlap is not a pre-M7 concern because production wiring is deferred to M7.

---

## 10. DAG state table

| Node | Depends on               | Status | Purpose                                                                       |
| ---  | ---                      | ---:   | ---                                                                           |
| M0   | —                        | DONE   | Freeze current behavior and define safe migration fixtures                    |
| M1   | M0                       | DONE   | Add pure state vocabularies, transitions, availability derivation, invariants |
| M2   | M1                       | DONE   | Pure v2 schema + v1->v2 codec/gate; isolated and non-deployable               |
| M3   | M2                       | DONE   | Prepare canonical v2 assignment reservation/custody operations                |
| M4   | M3                       | DONE   | Prepare v2 heartbeat/completion/recovery/cancellation operations              |
| M5A  | M4                       | DONE   | Prepare v2 task/message transition integration                                |
| M5B  | M4                       | DONE   | Prepare v2 worker runtime/fault/availability integration                      |
| M6   | M5A, M5B                 | DONE   | Prepare v2 public snapshot, UI, diagnostics projection contract               |
| M7   | M2, M3, M4, M5A, M5B, M6 | ACTIVE | Atomic authority cutover and only v2 persistence switch                       |
| M8   | M7                       | TODO   | Mechanical module/file split without semantic change                          |
| M9   | M8                       | TODO   | End-to-end live proof and cleanup fixed point                                 |

Status vocabulary for this ledger:

```text
TODO
READY
ACTIVE
VERIFY
DONE
BLOCKED
DROPPED
```

Implementation does not mark a node DONE. A node reaches VERIFY after its focused evidence passes; independent verification promotes VERIFY -> DONE.

---

# 11. Node definitions

## M0 — Baseline, fixtures, and cutover preconditions

Status: DONE

Objective:

Freeze the current externally observable behavior before changing state authority.

Work:

- [ ] Record exact HEAD and clean/dirty status.
- [ ] Inventory every task/message/worker/assignment status mutation site.
- [ ] Inventory every consumer of legacy custody fields.
- [ ] Inventory every `publicSnapshot()` field consumed by UI/tests.
- [ ] Add synthetic v1 storage fixtures:
  - [ ] empty;
  - [ ] idle registered workers;
  - [ ] pending task DAG;
  - [ ] completed/blocked/cancelled tasks with historical `assignmentId` / `assignedWorkerId`;
  - [ ] queued worker messages;
  - [ ] completed/blocked/cancelled messages with historical `assignmentId`;
  - [ ] cancelled tasks remain in the migration preserve set and test matrix;
  - [ ] operator delivered message;
  - [ ] blocked protocol-repair message;
  - [ ] stale worker;
  - [ ] rotating worker;
  - [ ] pending chat rotation with idle/waiting lifecycle;
  - [ ] source-faithful rotation-failed worker with pending rotation;
  - [ ] manual worker with no assignment;
  - [ ] active task assignment;
  - [ ] active batched-message assignment;
  - [ ] active control assignment;
  - [ ] cancelling worker with active assignment;
  - [ ] heartbeat mismatch;
  - [ ] completion pending/handoff;
  - [ ] contradictory ownership.
- [ ] Fixtures must use synthetic text/IDs; do not commit real user conversations.
- [ ] Add a pure `isFleetQuiescentForMigration()` test specification.
- [ ] Prove active-v1 fixtures are rejected by the future migration gate.

Acceptance:

- exact baseline behavior is characterized;
- no production behavior changed;
- fixture coverage exists for every high-risk legacy shape;
- current full fleet/recovery suite remains green.

Focused validation:

```bash
node --check extension/background.js
node --check extension/fleet-worker.js
node --test extension/tests/fleet-*.test.cjs
git diff --check
```

Next: M1 independent verification

---

## M1 — Pure state vocabulary, transitions, and invariants

Status: DONE

Objective:

Introduce pure state-model functions without changing live scheduling behavior.

Work:

- [x] Define TaskPhase constants.
- [x] Define MessagePhase constants.
- [x] Define AssignmentPhase constants.
- [x] Implement pure legal-transition tables.
- [x] Implement:
  - [x] `transitionTask()`;
  - [x] `transitionMessage()`;
  - [x] `transitionAssignment()`;
  - [x] `deriveWorkerAvailability()`;
  - [x] `assertFleetInvariants()`.
- [x] Add explicit invalid-transition failures.
- [x] Test all legal and illegal edges.
- [x] Do not route production writes through these helpers yet.

Acceptance:

- pure helpers have exhaustive focused tests;
- helpers do not mutate unrelated state;
- invariants detect contradictory assignment/task/message/worker relationships;
- no live behavior change.

Next: M2

---

## M2 — Schema v2 and quiescent migration

Status: DONE

Objective:

Create the pure, isolated v2 schema and v1->v2 migration codec/gate without
changing production storage or live behavior. M2 is preparatory and
NON-DEPLOYABLE.

M2 owns removal of quiescent task/message/worker-custody fields only. It
explicitly preserves worker `status`, `lifecycle`, `busy`, and `heartbeatAt`
for the isolated M5B runtime/fault/availability conversion; M2 does not invent
the final v2 worker runtime representation.

Work:

- [x] Add isolated v2 `state.assignments = {}` model.
- [x] Define isolated v2 `version: 2` codec representation.
- [x] Implement `canMigrateV1ToV2()`.
- [x] Implement pure `migrateFleetStateV1ToV2()`.
- [x] Require quiescence.
- [x] Reject/defer non-quiescent v1 without mutation.
- [x] Preserve operator `delivered`.
- [x] Preserve blocked/cancelled message states.
- [x] Preserve all IDs/history/topology/policy/goal.
- [x] Strip obsolete quiescent legacy custody fields.
- [x] Make v2 normalization/round-trip idempotent; the v1->v2 entrypoint accepts v1 only.
- [x] Prove v2 -> normalize -> v2 round trip.
- [x] Add explicit migration diagnostics.
- [ ] Keep `freshFleetState()` at version 1.
- [ ] Keep production `loadFleetState()`, `saveFleetState()`, and `mutateFleet()` at version 1.
- [x] Prove no v2 write reaches `chrome.storage`.

Acceptance:

- migration succeeds only from proven safe state;
- active v1 state cannot be partially rewritten;
- migrated v2 satisfies `assertFleetInvariants()`;
- M2-owned removed legacy task/message/custody fields are not regenerated after
  migration; non-custody worker `status`, `lifecycle`, `busy`, and `heartbeatAt`
  remain preserved for the later M5B runtime conversion. The v2 codec rejects
  reintroduction of every M2-owned removed legacy authority field, while those
  M5B-owned worker non-custody fields remain temporarily valid in isolated v2
  candidates.

Deployment gate: M2 output is NON-DEPLOYABLE. Do not load or reload it into
the live extension; no production storage path changes are permitted.

Next: M3 (after isolated M2 verification; M2 output remains non-deployable)

---

## M3 — Canonical assignment reservation

Status: DONE

Objective:

Prepare `state.assignments` as the source of truth for newly reserved work in
an isolated, NON-DEPLOYABLE v2 implementation. Do not wire production writes.

Work:

- [ ] Define pure reservation/custody operations that create exactly one Assignment record.
- [ ] Define the v2 worker `currentAssignmentId` contract.
- [ ] Define task/message/control assignment input adapters.
- [ ] Define pure prompt-input contracts consuming assignment + referenced task/messages/notices.
- [ ] Define pure reservation rollback and concurrency mapping contracts.
- [ ] Preserve assignment-ID format and journal-event mapping unless a versioned change is required.
- [ ] Enumerate every production replacement point for M7; do not replace `assignmentForWorker()` or prompt builders here.

Acceptance:

- isolated contracts prove one worker cannot receive two active assignments;
- isolated contracts prove one assignment cannot bind two workers;
- task/message/control prompt inputs are byte/semantic compatible where required;
- production `assignmentForWorker()`, reservation writes, and prompt builders remain unchanged until M7;
- no live browser/CDP test is required or performed.

Next: M4 (preparatory/non-deployable)

---

## M4 — Custody consumers

Status: DONE

Objective:

Prepare every high-risk assignment lifecycle boundary for canonical v2
Assignment records without switching production custody or storage. This node
is NON-DEPLOYABLE until M7.

Work:

### Dispatch

- [ ] `reserved -> activating` only at the defined dispatch boundary.
- [ ] Dispatch attempt is recorded first; repeated equal-time attempts are idempotent and acceptance cannot skip that authority.
- [ ] Attempt, acceptance, heartbeat, terminal, and acknowledgment timestamps are finite, positive, and monotonic.
- [ ] Accepted page send does not prematurely claim heartbeat custody.

### Heartbeat

- [ ] Prepare pure `reconcileHeartbeat()` operations and custody observations.
- [ ] Matching heartbeat confirms `activating -> running`.
- [ ] Activating + null heartbeat preserves reservation.
- [ ] Non-null mismatch fails closed.
- [ ] Idle/null evidence after confirmed running follows bounded release/requeue law.
- [ ] Omitted heartbeat identity is observational; explicit null + busy=true is a mismatch, while explicit null + busy=false is idle/loss evidence.
- [ ] A custody-mutating heartbeat is fresh relative to `max(reservedAt, dispatchAttemptAt, acceptedAt, startedAt)`; stale idle evidence is preserved without release.
- [ ] Missing heartbeat alone is not ownership authority.

### Completion

- [ ] Page terminal response enters `completing`.
- [ ] Worker remains assignment-busy until exact durable acknowledgment.
- [ ] Exact ID mismatch returns structured negative acknowledgment.
- [ ] Terminal stale handoff may retire only when background proves no owner remains.

### Recovery

- [ ] Simulate service-worker restart reading canonical assignment directly.
- [ ] Simulate bridge reattachment proving exact assignment identity.
- [ ] Reserved custody rejects page claims before acceptance; activating custody requires exact identity plus reattach/prompt proof.
- [ ] Completing custody is reattached only with explicit pending-completion proof; otherwise it remains completion-proof-pending.
- [ ] Keep activating custody unresolved when recovery has no identity; preserve completing custody with exact pending-completion proof.
- [ ] Simulate unrecoverable bridge release/requeue as exact and idempotent.
- [ ] Simulate bounded automatic retry using the production authority family: task assignments count only the task, message assignments count only their messages, and control-only assignments count only their notices; piggyback notices remain untouched, retry increments only when queued, and exhaustion leaves the used counter unchanged.

### Cancellation / flush

- [ ] Stop/flush releases assignment exactly once.
- [ ] Stop/flush fails closed atomically when any assignment is `completing`; it must not partially release other assignments.
- [ ] A safe stop/flush clears every worker control inbox, including idle/unrelated notices, and returns the flushed notice IDs/count.
- [ ] Requeue semantics remain task/message specific.
- [ ] Control notices are consumed or retained according to existing semantics.

Release policy characterization (prepared, not production wiring): transport
failure preserves task `startedAt` and `attempts`; active-page preflight resets
`startedAt` and decrements the reservation attempt once; heartbeat loss, bridge
failure, operator cancellation, automatic recovery, and stop/flush reset
`startedAt`. Terminal cancel/block follows the latter reset policy.

Completion disposition contracts reject arbitrary control dispositions and
require per-message disposition maps to contain exactly the assignment's
message IDs. Exact acknowledgment is the only custody-removal boundary.

Every M4 operation validates the assignment timeline before applying custody
logic: reserved fields cannot contain acceptance/start/terminal timestamps;
activating requires dispatch attempt and acceptance but no start/terminal time;
running requires monotonic start and no terminal time; completing requires a
positive terminal time not earlier than start. Malformed persisted custody is
rejected with deterministic M4 diagnostics.

Acceptance:

- pure simulations and contract tests cover custody-race behavior;
- prepared operations do not reconstruct assignments from distributed legacy fields;
- simulations prove no duplicate send/requeue under heartbeat/completion races;
- service-worker, bridge, background, and fleet-worker production integration remains unchanged until M7;
- no live browser/CDP test is required or performed.

Next: M5A and M5B (preparatory/non-deployable)

---

## M5A — Task/message transition authority

Status: DONE

Objective:

Prepare v2 task/message transition integration without switching production
writes. This node is NON-DEPLOYABLE until M7.

Work:

- [ ] Define pure v2 task/message transition adapters for reservation/start/complete/block/requeue/cancel/deliver.
- [ ] Add exhaustive equivalence fixtures for task dependency behavior.
- [ ] Add equivalence fixtures for review independence gating.
- [ ] Add equivalence fixtures for peer-routing repair and operator delivery.
- [ ] Add equivalence fixtures for goal-continuation quiescence detection.
- [ ] Enumerate the production `status` readers/writers and exact M7 phase-wiring replacements.

Acceptance:

- isolated equivalence tests cover all current task/message lifecycle semantics;
- current protocol parser semantics are unchanged;
- production `task.status`/`message.status` readers and writers remain unchanged until M7;
- no live browser/CDP test is required or performed.

Next: M6 after M5B (preparatory/non-deployable)

---

## M5B — Worker runtime, fault, and availability projection

Status: DONE

Objective:

Prepare v2 worker runtime, fault, and availability integration without
switching production authority. This node is NON-DEPLOYABLE until M7.

Work:

- [ ] Define isolated v2 `worker.runtime` and fault adapters.
- [ ] Define pure heartbeat-observation and availability projection mappings.
- [ ] Define dispatch/custody/rotation failure-to-fault mappings.
- [ ] Add equivalence fixtures for every current lifecycle/status value, including manual, cancelling, rotating, and rotation-failed.
- [ ] Enumerate scheduler `worker.status` readers and exact M7 replacements with `deriveWorkerAvailability()`.
- [ ] Enumerate assignment-/rotation-derived lifecycle mappings for M7.
- [ ] Preserve optional heartbeat metadata by presence: omitted/empty title and URL preserve prior values, and only explicit integer window IDs update.
- [ ] Require a valid bound tab for online/dispatchable projection; treat warm-idle as a retained-window lifecycle, not a dispatch cooldown.
- [ ] Keep dispatch-failure policy canonical, expose M4 heartbeat reconciliation evidence, and require proof-bearing fault-clear events.
- [ ] Dispatch-failure preparation must require a recorded attempt and return, without persisting, the source-faithful M7 lifecycle intent (`idle`/`offline`, busy false, warm-idle timestamps zero).
- [ ] Legacy activating/running/cancelling status may migrate only with an exact canonical assignment owned by the worker and a compatible assignment phase; runtime-reported identity alone is never custody.
- [ ] Bind dispatch-failure faulting to the exact reserved assignment: the supplied assignment ID is required, must equal the worker pointer, must resolve to the same worker, and mismatches must leave runtime/fault state unchanged.
- [ ] Require a recorded positive dispatch attempt and a non-regressing failure timestamp before applying the dispatch-failure runtime/fault projection; M4 release must accept the same candidate.
- [ ] Keep heartbeat mismatch faulting on the single M4-intent path; validate intent assignment identity against canonical custody and reject fabricated identities.
- [ ] Treat omitted heartbeat identity as no fresh identity evidence even when a prior runtime identity is retained; only explicit null/non-null identity participates in the current M4 observation.
- [ ] Require rotation-failure evidence to prove an enabled, bound, unassigned worker with `chatRotationPending=true` and `lifecycle='rotating'`.
- [ ] Validate legacy worker.status against the current vocabulary (`idle`, `waiting`, `blocked`, `stale`, `offline`, `activating`, `running`, `cancelling`); reject unknown/non-string values during conversion.
- [ ] Require fault-clear evidence to identify the same worker, meet the fault timestamp, and prove matching heartbeat, bridge/M4 recovery, or completed rotation semantics; tags alone are insufficient.
- [ ] Bind matching-heartbeat clearing to an accepted durable runtime observation, and require structured M4 recovery outcomes rather than caller-supplied proof tokens.
- [ ] Feed the actual M4 recovery result unchanged, with recovery event facts carried separately; validate the post-M4 canonical state and reject preservation-only outcomes.
- [ ] Bind each accepted M4 recovery outcome to the exact input proof that produces it: reattached outcomes require explicit matching identity plus reattach/prompt proof; completion reattach requires pending-completion proof; no-owner permits omitted or explicit-null identity only.
- [ ] Require rotation completion clearing to observe canonical `rotation-failed` state, pending rotation, no custody, and the concrete bound tab; a returned intent alone is not proof.
- [ ] For legacy `rotation-failed`, never use `lastDispatchFailureAt` as the fault timestamp; use explicit fault evidence or conversion-time observation only.
- [ ] Require stale/offline legacy status to agree with its lifecycle during conversion; preserve the matching lifecycle so availability remains offline.
- [ ] Keep named M7 manifest entries at exact lexical function boundaries; use separate `site:` entries for neighboring authority occurrences.

Acceptance:

- isolated adapters provide one availability derivation function;
- heartbeat observation cannot directly invent assignment custody;
- equivalence fixtures match blocked/offline/busy/running/idle projections;
- warm-idle remains dispatchable when other eligibility facts allow it, while page-busy cooldown remains a real scheduler gate;
- exact manifest ranges identify their named production functions and site regions without overlapping stale labels;
- dispatch-failure, M4 heartbeat-intent, rotation-failure, and legacy-status conversions fail closed on contradictory or unproven authority;
- production scheduler/status/lifecycle wiring remains unchanged until M7;
- no live browser/CDP test is required or performed.

Next: M6 after independent M5B verification (preparatory/non-deployable)

---

## M6 — Public snapshot, UI, diagnostics

Status: DONE

Objective:

Prepare all operator surfaces to consume v2 projections rather than internal
authority fields. This node is NON-DEPLOYABLE until M7.

Work:

- [x] Define a pure v2 `publicSnapshot()` projection contract.
- [x] Define pure assignment, availability, task/message, queue, exception, and diagnostic projections.
- [x] Add control-pane/Overview/Tasks/Messages renderer fixtures against the projection contract.
- [x] Add projection tests without changing `publicSnapshot()` or `control-pane.js` production wiring.
- [x] Enumerate every production snapshot/UI reader and exact M7 replacement.
- [x] Do not expose mutable compatibility fields merely to avoid the M7 cutover.

Acceptance:

- pure projection and renderer fixtures render correct v2-shaped state;
- UI fixtures cannot feed derived status back as scheduler authority;
- diagnostics fixtures surface invariant failures and migration blockage clearly;
- production `publicSnapshot()`, `control-pane.js`, and related UI wiring remain unchanged until M7;
- no live browser/CDP test is required or performed.

Next: M7 atomic cutover candidate; this turn failed closed before production edits because the current v1 runtime has not been converted atomically.

---

## M7 — Atomic authority cutover

Status: ACTIVE

Objective:

Perform the one and only production authority cutover after M2, M3, M4, M5A,
M5B, and M6 are independently DONE and the strengthened quiescence gate is
proven again. There is no dual runtime path and no feature flag.

Work:

- [ ] Verify no active assignment, running task/message, completion handoff, live heartbeat custody, rotating worker, or pending chat rotation.
- [ ] Migrate persisted v1 -> v2 exactly once.
- [ ] Switch production load/save/mutate to v2.
- [ ] Wire the prepared v2 assignment/task/message/worker/projection operations.
- [ ] Stop all legacy authoritative writes in the same cutover.
- [ ] Strip obsolete legacy authority as specified.
- [ ] Create and execute the production wiring manifest for every prepared replacement:
  - [ ] exact legacy source file/function/site;
  - [ ] prepared v2 replacement module/adapter/contract;
  - [ ] atomic cutover action in `background.js`, `fleet-worker.js`, or `control-pane.js`;
  - [ ] validation proving no production writer/reader was omitted.
- [ ] Prove no interval exists where v1 and v2 are both writable authorities.

This is the only deployable persistence/runtime authority transition.

## M7 legacy-authority completion checklist

Delete/stop persisting:

- [ ] `worker.status` as authority;
- [ ] `worker.busy` top-level;
- [ ] `worker.heartbeatAt` top-level;
- [ ] `worker.currentAssignmentKind`;
- [ ] `worker.currentAssignmentStartedAt`;
- [ ] `worker.currentTaskId`;
- [ ] `worker.currentMessageId`;
- [ ] `worker.currentMessageIds`;
- [ ] `worker.currentControlNoticeIds`;
- [ ] `task.status`;
- [ ] `message.status`;
- [ ] `task.assignmentId`;
- [ ] `message.assignmentId`;
- [ ] assignment reconstruction from distributed fields.

Work:

- [ ] Source search proves zero production writers/readers.
- [ ] v2 normalization rejects unexpected legacy authority instead of silently using it.
- [ ] Keep only explicitly documented v1 migration reader code.
- [ ] Full state round-trip remains stable.

Acceptance:

```text
one concept = one stored authority
one transition path per lifecycle
zero live dual-write compatibility
```

Next: M8 after the atomic M7 cutover

---

## M8 — File/module split

Status: TODO

Objective:

Split responsibilities only after semantic cleanup is complete.

Preferred layout:

```text
extension/
  fleet-state.js
      schema v2
      v1 migration
      transitions
      invariants
      availability projection

  fleet-protocol.js
      FLEET_TASK
      FLEET_MESSAGE
      FLEET_STATUS
      prompt protocol rendering
      parse/repair logic

  background.js
      Chrome runtime wiring
      scheduler
      browser/tab orchestration
      storage transaction boundary
      dispatch/recovery coordination
```

Rules:

- [ ] No behavior changes bundled with file movement.
- [ ] Preserve Manifest V3 service-worker compatibility.
- [ ] Prefer simple deterministic loading over introducing a build system.
- [ ] No new npm/Rust dependencies.
- [ ] Move tests with responsibility boundaries where useful.

Acceptance:

- source ownership is obvious;
- no circular authority;
- full tests unchanged across mechanical split.

Next: M9

---

## M9 — End-to-end verification / fixed point

Status: TODO

Objective:

Prove the refactor did not change fleet semantics while removing overlapping state authority.

Required automated proof:

- [ ] all fleet tests pass;
- [ ] all recovery tests pass;
- [ ] protocol repair tests pass;
- [ ] goal-continuation tests pass;
- [ ] worker turn detector tests pass;
- [ ] connector tests remain unaffected;
- [ ] syntax checks pass;
- [ ] `git diff --check` passes;
- [ ] legacy-field source inventory is zero outside migration fixtures/reader.

Required live proof on existing authenticated CDP 9222 browser:

- [ ] atomic M7 v1 -> v2 cutover performed exactly once and only at strengthened quiescence;
- [ ] extension reload succeeds;
- [ ] registered workers survive;
- [ ] one task assignment completes;
- [ ] one semantic message assignment completes;
- [ ] one reviewer handoff completes;
- [ ] worker returns idle with no active assignment;
- [ ] heartbeat custody matches during running;
- [ ] no stale completion handoff remains;
- [ ] no duplicate send;
- [ ] no duplicate requeue;
- [ ] no stuck RUNNING projection;
- [ ] Journal shows coherent reserve -> activate -> run -> complete -> release sequence.

Final invariant:

```text
task progress
message delivery
assignment custody
heartbeat observation
worker availability
agent verdict
project ledger state

are distinct,
have explicit owners,
and cannot silently overwrite each other.
```

Completion condition:

M9 may be DONE only after an independent verifier confirms the exact committed snapshot.

---

# 12. Required test matrix

## State transitions

- [ ] every legal TaskPhase transition;
- [ ] every illegal TaskPhase transition;
- [ ] every legal MessagePhase transition;
- [ ] every illegal MessagePhase transition;
- [ ] every legal AssignmentPhase transition;
- [ ] every illegal AssignmentPhase transition.

## Migration

- [ ] empty v1;
- [ ] quiescent populated v1;
- [ ] operator-delivered messages;
- [ ] done/blocked/cancelled messages, including historical assignment references;
- [ ] pending/blocked/done/cancelled tasks;
- [ ] cancelled tasks remain preserved as terminal history;
- [ ] terminal worker-directed done/blocked/cancelled message assignment IDs remain historical IDs;
- [ ] terminal task historical assignment/worker references are stripped, not treated as active custody;
- [ ] stale/rotating workers;
- [ ] rotating workers reject migration;
- [ ] pending `chatRotationPending` rejects migration even when lifecycle is idle/waiting;
- [ ] source-faithful rotation-failed worker (`status=blocked`, `chatRotationPending=true`) rejects migration;
- [ ] manual worker with no assignment remains quiescent;
- [ ] legacy worker-ID normalization;
- [ ] active task assignment rejects migration;
- [ ] active message assignment rejects migration;
- [ ] active control assignment rejects migration;
- [ ] contradictory ownership rejects migration;
- [ ] null worker assignment with non-empty `currentAssignmentKind` rejects migration;
- [ ] positive `currentAssignmentStartedAt` rejects migration;
- [ ] operator `delivered` message with `assignmentId` rejects migration;
- [ ] duplicate assignment ownership rejects migration;
- [ ] idempotent v2 normalization;
- [ ] v2 storage round trip.

## Assignment custody

- [ ] one assignment per worker;
- [ ] one worker per assignment;
- [ ] activating + old/null heartbeat;
- [ ] matching heartbeat confirmation;
- [ ] non-null heartbeat mismatch;
- [ ] idle/null post-running reconciliation;
- [ ] completion before heartbeat flush;
- [ ] heartbeat before completion acknowledgment;
- [ ] negative completion acknowledgment;
- [ ] pending completion handoff retry;
- [ ] stale terminal handoff retirement;
- [ ] bridge reinjection;
- [ ] automatic retry budget;
- [ ] hard assignment timeout;
- [ ] Stop/flush cancellation.

## Scheduler

- [ ] max concurrency from active assignments;
- [ ] task dependency gating;
- [ ] review independence;
- [ ] message batching;
- [ ] control-notice delivery;
- [ ] target blocked;
- [ ] target busy;
- [ ] stale/offline worker;
- [ ] goal continuation only at quiescence;
- [ ] unchanged-frontier suppression.

## UI/projection

- [ ] availability projection;
- [ ] active assignment counts;
- [ ] role utilization;
- [ ] queue pressure;
- [ ] exceptions;
- [ ] task/message phase rendering;
- [ ] diagnostics invariants;
- [ ] migration-blocked diagnostic.

---

# 13. File impact map

Expected production files by final completion:

```text
extension/background.js
extension/fleet-worker.js
extension/control-pane.js
extension/control-pane.html          only if labels/diagnostics require it
extension/fleet-state.js             introduced at M8
extension/fleet-protocol.js          introduced at M8
extension/manifest.json              only if loading order requires it
extension/tests/*
```

Files that should not require changes:

```text
Cargo.toml
Cargo.lock
package dependency files
Canon repository files
PARALLEL_ARCHITECTURE_REFACTOR_TODO.md
```

Dependency changes: **none expected**.

---

# 14. Execution rules

- Work one DAG node at a time unless an explicitly independent branch is assigned.
- Do not start a dependent node until prerequisites are DONE.
- Do not combine semantic state changes with the M8 mechanical file split.
- Preserve current wire protocol:
  - `FLEET_TASK`;
  - `FLEET_MESSAGE`;
  - `FLEET_STATUS`;
  - current legacy JSON terminal compatibility.
- Preserve role/separation-of-duty contracts.
- Preserve durable IDs.
- Preserve bounded recovery.
- Fail closed on contradictory migration/custody evidence.
- Do not infer success from timing.
- Do not use UI projection as authority.
- Do not modify Canon project-ledger semantics.
- Do not load a schema-writing migration build into the live fleet while assignments are active.
- M2, M3, M4, M5A, M5B, and M6 outputs are explicitly NON-DEPLOYABLE and must not be loaded/reloaded into the live extension.
- M7 is the only node permitted to switch production persistence/runtime authority from v1 to v2.
- Before each live reload, record exact extension Git HEAD and fleet quiescence evidence.
- Each node ends with exact files changed, tests run, result, and next READY node.

---

# 15. Immediate next action

M0, M1, M2, M3, M4, M5A, M5B, and M6 are DONE. M7/M8/M9 are complete at the
accepted fixed point recorded below. No further milestone execution is
authorized from this ledger.

```text
M7/M8/M9 — COMPLETE; fixed-point verification accepted
```

## 16. Post-fixed-point closure

The accepted M7/M8/M9 runtime snapshot is committed at:

```text
56b68a7ff4e90e51423f597ebaa0c1f5abef7f27
```

The committed runtime consists of the exact 25-file allowlist verified by
the independent M7/M8/M9 final review. The v2 runtime is the sole writable
authority; no further migration, reload, live-storage mutation, deployment,
or milestone execution is authorized by this ledger.

The former M1-M6 CommonJS/reference modules, M0-M6 test artifacts, and editor
lock residue were post-fixed-point cleanup residue and were removed after
dependency/reference checks. This ledger remains as historical verification
record and is intentionally uncommitted.
