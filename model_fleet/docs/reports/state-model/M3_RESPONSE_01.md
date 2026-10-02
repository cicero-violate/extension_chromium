# M3 response 01

## Result

M3 is `READY_FOR_VERIFY`. The ledger records M0/M1/M2 as `DONE`, M3 as
`VERIFY`, and M4 as `TODO`. M3 remains isolated and NON-DEPLOYABLE. No
production source, storage path, scheduler, browser, live fleet, or dependency
file was changed.

## APIs and canonical assignment shape

Added `model_fleet/extension/fleet-state-model-m3.cjs` with pure APIs:

- `reserveTaskAssignment(state, { workerId, taskId, reservedAt, controlNoticeIds, metadata })`
- `reserveMessageAssignment(state, { workerId, messageIds, reservedAt, controlNoticeIds, metadata })`
- `reserveControlAssignment(state, { workerId, controlNoticeIds, reservedAt, metadata })`
- `assignmentForWorkerV2(state, workerId)`
- `resolveAssignmentPromptInputs(state, assignmentId)`
- `rollbackReservedAssignment(state, assignmentId)`
- `activeAssignmentCount(state)`
- `M7_REPLACEMENT_MANIFEST`

Every reservation creates exactly one record:

```text
{
  id, workerId, kind,
  taskId: string|null,
  messageIds: [],
  controlNoticeIds: [],
  phase: "reserved",
  reservedAt,
  dispatchAttemptAt: 0,
  acceptedAt: 0,
  startedAt: 0,
  responseTerminalAt: 0,
  recoveryAttempt: 0,
  metadata: {}
}
```

Task IDs are `A-` + task ID + `-` + `(generation + 1)`. Message IDs are
`A-M-` + first deterministically ordered message ID + `-` + `(generation + 1)`.
Control IDs are `A-C-` + worker ID + `-` + `(generation + 1)`. Collisions fail
closed. Timestamps are explicit finite positive inputs; no clock is used.

## Reservation and rollback semantics

All APIs first validate/clone an M2 v2 state and use M1 transitions at the
reservation boundary. They preserve input immutability and leave worker
status/lifecycle/busy/heartbeat fields untouched.

- Task reservation requires a pending, unowned task; transitions it to running,
  sets `assignedWorkerId`, `startedAt`, and increments `attempts`; it never
  creates `task.assignmentId` or legacy worker custody fields.
- Message reservation requires a nonempty unique batch of queued messages,
  sorts it by `createdAt` then ID, requires one non-operator recipient matching
  the worker, transitions all to running, and sets `deliveredAt`; it never
  creates `message.assignmentId`.
- Control reservation requires at least one unique notice present in the
  worker inbox and changes no task/message phase.
- Task/message assignments may carry validated control notice IDs.
- Every successful reservation sets only `worker.currentAssignmentId` and
  leaves the control inbox unconsumed.
- `assignmentForWorkerV2()` and `activeAssignmentCount()` validate reciprocal
  assignment invariants and never reconstruct from legacy distributed fields.
- `resolveAssignmentPromptInputs()` returns canonical assignment, worker,
  task or deterministically ordered messages, referenced notices, and the
  required top-level context without rendering or duplicating production prompt
  text.
- `rollbackReservedAssignment()` accepts only `reserved` assignments, removes
  exactly the assignment, clears the reciprocal worker pointer, requeues task or
  messages, clears task ownership, preserves attempts/history timestamps, and
  leaves control notices in the inbox. Missing/second calls and contradictions
  fail deterministically.

## M7 production replacement manifest

The exported manifest records the exact current replacement boundaries without
changing them:

| Current source site | Legacy authority | Prepared M3 replacement | M7 action |
|---|---|---|---|
| `background.js:2377-2525`, `chooseDispatches` | reservation writes in worker/task/message fields | three pure reservation APIs | replace task/message/control branches atomically |
| `background.js:855-883`, custody helpers | distributed worker custody and message assignment lookup | assignment map plus v2 lookup/rollback | remove distributed reconstruction and use pointer/map |
| `background.js:910-948`, `assignmentForWorker` | worker fields determine assignment kind | `assignmentForWorkerV2` and prompt inputs | switch lookup authority |
| `background.js:1823-1927`, prompt builders and lines 2430/2479/2514 | legacy dispatch-local prompt inputs | resolved v2 input contract | preserve rendering semantics while changing authority |
| `background.js:434-517`, `2379-2385`, `2741-2770` | worker-pointer active counts/eligibility | `activeAssignmentCount` plus M5B adapter | replace scheduler custody counts at M7 |
| `background.js:2527-2668`, `3429-3501` | legacy rollback/release cleanup | M3 reservation rollback plus later M4 lifecycle operations | map each path atomically with no dual writer |

M3 does not modify any listed production site. M4 owns later dispatch,
heartbeat, completion, recovery, and cancellation lifecycle behavior.

## Tests and isolation

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m3.test.cjs` — **10/10 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m2.test.cjs` — **10/10 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m1.test.cjs` — **10/10 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs` — **6/6 pass**
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **161/161 pass**
- `rtk node --check model_fleet/extension/fleet-state-model-m3.cjs` — pass
- `rtk node --check model_fleet/extension/fleet-state-model-m2.cjs` — pass
- `rtk node --check model_fleet/extension/background.js` — pass
- `rtk node --check model_fleet/extension/fleet-worker.js` — pass
- `rtk git diff --check` — pass
- production import/load scan — pass; no M3 reference in `background.js`,
  `fleet-worker.js`, `control-pane.js`, or `manifest.json`
- M3 browser-API scan — pass; no `chrome.` access in the M3 module

The focused tests cover all three reservation kinds, exact IDs, side effects,
piggyback notices, collisions, ownership and malformed input rejection,
prompt-input resolution, canonical lookup, all rollback kinds, contradictions,
second calls, active counts, invariants, immutability, legacy-custody absence,
and the M7 manifest.

## Worktree and dependency state

HEAD is unchanged. Existing unrelated untracked M0/M1/M2/plan artifacts remain
untouched. New M3 artifacts are:

- `model_fleet/extension/fleet-state-model-m3.cjs`
- `model_fleet/extension/tests/fleet-state-model-m3.test.cjs`
- updated `model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md`

Nothing is staged or committed. No dependency files changed. No browser/CDP or
live fleet interaction occurred.

## Next action

M3 is ready for independent verification only. Do not mark M3 `DONE` or start
M4 until this report and the isolated implementation are independently
accepted.
