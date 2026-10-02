# M4 response 01

## Result

M4 is `READY_FOR_VERIFY`. The ledger records M0/M1/M2/M3 as `DONE`, M4 as
`VERIFY`, and M5A/M5B as `TODO`. The implementation is isolated and
NON-DEPLOYABLE. No production source, storage path, browser, live fleet, or
dependency file was changed.

## Pure APIs

Added `model_fleet/extension/fleet-state-model-m4.cjs` with:

- `recordDispatchAttempt(state, { workerId, assignmentId, attemptedAt })`
- `acceptDispatch(state, { workerId, assignmentId, acceptedAt })`
- `deferReservedDispatchForActivePage(state, { workerId, assignmentId })`
- `reconcileHeartbeatCustody(state, { workerId, hasAssignmentIdentity, reportedAssignmentId, busy, observedAt })`
- `beginCompletion(state, { workerId, assignmentId, responseTerminalAt })`
- `acknowledgeCompletion(state, { workerId, assignmentId, disposition, acknowledgedAt })`
- `releaseAssignment(state, { workerId, assignmentId, disposition })`
- `releaseDispatchFailure`, `releaseHeartbeatLoss`, `releaseBridgeAssignment`
- `cancelAssignment(state, { workerId, assignmentId })`
- `applyAutomaticRecovery(state, { workerId, assignmentId })`
- `flushActiveAssignments(state, { disposition })`
- composed `M7_REPLACEMENT_MANIFEST`

All operations are explicit-time, clone-before-write, and use exact canonical
assignment references. They do not write worker runtime/status/lifecycle/fault
fields, parse protocol text, consume queued work, or access browser APIs.

## Heartbeat custody decision matrix

| Durable phase | Observation | Result |
|---|---|---|
| none | non-null reported ID | contradiction intent; no custody creation |
| none | omitted/null | observation only |
| reserved | any non-null ID | fail-closed mismatch; no promotion |
| reserved | omitted/null | preserved, unconfirmed |
| activating | explicit null + busy false | preserve activation |
| activating | matching ID + busy true | `confirm_custody` -> running; set `startedAt` if zero |
| activating | non-null mismatch | fail-closed mismatch |
| running | omitted identity | preserve running |
| running | matching ID | preserve running |
| running | explicit null + busy false | exact release/requeue |
| running | non-null mismatch | fail-closed mismatch |
| completing | omitted/null/matching | preserve completion custody until ack |
| any | explicit non-null mismatch | no overwrite or release |

The normalized observation preserves omitted versus explicit identity through
`hasAssignmentIdentity`; M4 does not persist runtime/fault state.

## Completion race and acknowledgment

`beginCompletion()` rejects reserved assignments, accepts exact completion while
still activating by confirming custody first, and then enters `completing`.
`startedAt` uses existing `startedAt`, then `acceptedAt`, then terminal time.
Wrong assignment IDs return structured ownership results with `terminal: false`
or `terminal: true` when the worker has no owner; state is unchanged.

`acknowledgeCompletion()` requires exact worker/assignment and `completing`
phase. It transitions task/message phases before deleting custody, supports
task done/blocked, message done/blocked maps, and control acknowledgment,
consumes only the assignment’s control notices on successful acknowledgment,
clears the reciprocal pointer, and asserts invariants. A second acknowledgment
returns terminal/no-owner information without mutation. Completing heartbeats
cannot release the handoff.

## Release, recovery, and cancellation laws

- Active-page preflight is distinct: reserved task releases rewind
  `startedAt` to zero and decrement `attempts` exactly once; messages requeue
  without clearing delivery history; control notices remain in the inbox.
- Dispatch failure, heartbeat loss, and bridge failure release exact custody
  and requeue task/messages without changing worker runtime fields.
- Operator cancellation transitions task/messages to cancelled and retains
  control notices.
- Active flush releases each assignment once; queued work remains untouched for
  M5A.
- Automatic recovery uses `recoveryAttempt` plus existing item recovery
  metadata: one requeue is allowed, then the next failure produces blocked/
  exhausted outcome. No second authority is created.
- Releasing completing custody is rejected because pending completion is
  protected until exact acknowledgment.
- Restart/reattach is represented by the canonical assignment map and exact
  identity; no legacy worker-field reconstruction or duplicate send is used.

## M7 production replacement manifest

The composed manifest includes the M3 reservation/lookup/prompt boundaries and
these M4 boundaries:

| Current source | Legacy custody behavior | M4 preparation | M7 action |
|---|---|---|---|
| `background.js:2632-2717 dispatchReserved` | attempt/accept implicit custody | dispatch attempt/accept APIs | canonical phase transitions |
| `background.js:1092-1124 deferReservedDispatchForActivePage` | page-busy rewind | distinct preflight deferral | atomic pre-acceptance rewind |
| `background.js:2527-2570 failDispatch` | legacy requeue/worker cleanup | `releaseDispatchFailure` | compose with M5B fault projection |
| `background.js:3029-3142 heartbeat functions` | identity compare/release/mismatch | `reconcileHeartbeatCustody` | M7 custody + M5B runtime wiring |
| `background.js:3144-3200 reconcileOnHello` | bridge restart preserve/release | canonical recovery evidence | map-driven reattach/release |
| `background.js:2833-3025 completeAssignment` | parse, terminal writes, cleanup | begin/ack completion | separate M5A disposition from custody ack |
| `background.js:951-1028 bridge recovery` | reconstruct/release legacy fields | bridge release operation | exact map proof, no duplicate send |
| `background.js:3923-3975 assignment-cancelled` | bounded recovery over legacy fields | automatic recovery operation | canonical retry/exhaustion metadata |
| `background.js:3502-3547 cancelWorkerDispatch` | operator cancellation cleanup | `cancelAssignment` | exact canonical cancellation |
| `background.js:3549-3595 stopAndFlushStaleWork` | active cancellation plus queued flush | `flushActiveAssignments` | active-only custody release; M5A queued work |
| `fleet-worker.js:775-839` | pending completion handoff | begin/ack contract | keep completion busy until ack |
| `fleet-worker.js:916-958`, `1031-1048` | recovery proof and heartbeat ID | explicit recovery/heartbeat evidence | no invented custody |
| `fleet-worker.js:1019-1028` | page cancellation signal | cancellation contract | exact acknowledgment |

No manifest entry changes production before M7.

## Validation

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m4.test.cjs` — **13/13 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m3.test.cjs` — **14/14 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m2.test.cjs` — **10/10 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m1.test.cjs` — **10/10 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs` — **6/6 pass**
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **178/178 pass**
- `rtk node --check model_fleet/extension/fleet-state-model-m4.cjs` — pass
- `rtk node --check model_fleet/extension/fleet-state-model-m3.cjs` — pass
- `rtk node --check model_fleet/extension/background.js` — pass
- `rtk node --check model_fleet/extension/fleet-worker.js` — pass
- `rtk git diff --check` — pass
- production M4 import/load scan — pass; no M4 reference in production files
- M4 browser-API scan — pass; no `chrome.` access in M4

## Worktree and dependencies

HEAD is unchanged. Existing untracked plan/M0-M3 artifacts remain preserved.
The new M4 module/test and ledger update are uncommitted and unstaged. No
dependency files changed. No browser/CDP/live fleet interaction occurred.

## Next action

M4 is ready for independent verification only. Do not mark M4 `DONE` or start
M5A/M5B until this report and the isolated implementation are independently
accepted.
