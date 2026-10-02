# DAG Cutover Correction 01

## Assigned scope

Repair the authoritative plan and M0 cutover specification only. Add rotation-aware quiescence and reorder the DAG so M7 is the sole production v1->v2 authority cutover. Do not implement M2, change production source, load/reload the extension, touch browser/fleet state, change dependencies, commit, or push.

## Worktree and HEAD

HEAD before and after: `02183c4668c214e2a130747ab9b9820b6272cd43`

Status before and after:

```text
?? model_fleet/extension/.#STATE_MODEL_CLEANUP_TODO.md
?? model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md
?? model_fleet/extension/fleet-state-model-m1.cjs
?? model_fleet/extension/tests/fleet-state-model-m0.test.cjs
?? model_fleet/extension/tests/fleet-state-model-m1.test.cjs
```

No files are staged. No commit or push was performed. No production source or dependency file changed.

Ledger state remains:

```text
M0 = VERIFY
M1 = VERIFY
M2 = READY
M3-M9 = TODO
```

M2 is READY in the plan only; no M2 implementation was started in this turn.

## M0 rotation-gate correction

`migrationDecisionV1()` now fails closed before other custody checks when:

```text
worker.lifecycle == "rotating"       -> rotation-in-progress
worker.chatRotationPending == true   -> rotation-pending
```

This reflects that `rotateWorkerChat()` performs awaited tab readiness and bridge reinjection before later durable writes. A rotation is therefore not quiescent even if no assignment is currently visible.

Synthetic M0 characterization now includes:

- `rotatingWorker`: rejected as `rotation-in-progress`;
- `pendingRotationWorker`: idle/waiting worker with `chatRotationPending=true`, rejected as `rotation-pending`;
- `rotationFailedWorker`: no assignment and no pending rotation, allowed as quiescent;
- `manualWorker`: no assignment, allowed as quiescent;
- existing cancelling-with-active-custody remains rejected.

The specification and migration matrix explicitly document these cases. `sleeping`/`parking` remain legacy v1 ingress values normalized to idle and are not treated as generated steady-state lifecycle values.

## Revised DAG and dependency edges

The plan now uses this ordering:

```text
M0  baseline + quiescence/migration fixtures
 -> M1  pure vocabulary/transitions/invariants
 -> M2  pure v2 schema + v1->v2 migration codec/gate
 -> M3  prepare canonical v2 assignment reservation/custody operations
 -> M4  prepare v2 heartbeat/completion/recovery/cancellation operations
 -> M5A prepare v2 task/message transition integration
 -> M5B prepare v2 worker runtime/fault/availability integration
 -> M6  prepare v2 publicSnapshot/UI/diagnostic projection contract
 -> M7  atomic authority cutover
 -> M8  mechanical module/file split only
 -> M9  live CDP proof + fixed point
```

Dependency edges are now:

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

M2 is `READY` but remains unimplemented. M3-M6 are preparation nodes and remain TODO. M7 is explicitly dependent on every prepared node, not only M6.

## Cutover/deployment wording

Section 7.2 now requires all of the following for v1->v2 persistence cutover:

```text
no worker.currentAssignmentId
no worker-owned active assignment custody
no running tasks
no running worker-directed messages
no reserved control assignment
no worker reports a live activeAssignmentId
no pending page completion handoff
no worker.lifecycle == rotating
no worker.chatRotationPending == true
```

Section 7.6 now makes M2-M6 explicitly preparatory and NON-DEPLOYABLE:

- `freshFleetState()` remains version 1;
- production `loadFleetState()`, `saveFleetState()`, and `mutateFleet()` remain v1;
- no v2 write reaches `chrome.storage`;
- no M2-M6 build is loaded or reloaded into the live extension;
- isolated tests may exercise v2 codecs/transitions/projections only;
- no feature flag, dual runtime path, or v1/v2 mirror authority is allowed.

M7 is the one canonical cutover. Only after M2-M6 are independently DONE and strengthened quiescence is re-proven may M7 migrate persisted v1->v2 exactly once, switch production load/save/mutate to v2, wire the prepared operations, stop legacy authoritative writes, and strip obsolete authority in the same cutover. There is no interval in which v1 and v2 are both writable authorities.

Node definitions, deployment gates, execution rules, required migration matrix, and immediate-next-action text were updated to match this ordering. M8 remains mechanical-only after M7, and M9 owns live reload/CDP proof.

## Validation

Exact final commands and results:

```text
rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs
6 passed, 0 failed

rtk node --test model_fleet/extension/tests/fleet-state-model-m1.test.cjs
10 passed, 0 failed

rtk node --test model_fleet/extension/tests/fleet-*.test.cjs
141 passed, 0 failed

rtk git diff --check
exit 0
```

No browser/CDP or live fleet interaction was performed.

## Risks and blockers

No implementation blocker remains for this bounded plan/M0 correction. Independent review is still required before promoting M0 or M1. M2 is marked READY but must not start until the corrected rotation gate and atomic-cutover ordering are accepted.

## Acceptance

Plan correction result: `READY_FOR_VERIFY`. M0 and M1 intentionally remain `VERIFY`; M2 is `READY` but not implemented.

## Dependency status

No dependency files changed. No dependency installation or lockfile update was performed.
