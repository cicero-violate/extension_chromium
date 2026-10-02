# M1 Response 03

## Assigned scope

Repair M1 only. Correct assignment custody phase semantics and make assignment transition testing exhaustive. Keep M1 at `VERIFY`; do not start M2. Do not change production behavior, storage, live browser/fleet state, dependencies, commit state, or push state.

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

Status after: identical. No files are staged. No commit or push was performed. M1 remains `VERIFY`; M2 remains `TODO`.

## Repairs

Changed only the isolated M1 model/test artifacts:

- `model_fleet/extension/fleet-state-model-m1.cjs`
- `model_fleet/extension/tests/fleet-state-model-m1.test.cjs`

The authoritative custody meaning is now respected:

```text
reserved   + dispatch_attempt -> reserved
reserved   + accept           -> activating
activating + accept           -> activating
activating + confirm_custody  -> running
running    + begin_completion -> completing
```

All removal events (`release`, `fail`, `cancel`, `recover`, and completing `acknowledge`) remove the active assignment and clear the reciprocal `worker.currentAssignmentId`. Non-removal events assert the exact target phase and retained custody.

The assignment test now executes every `AssignmentPhase x ASSIGNMENT_EVENTS` pair. Listed edges assert their exact phase/removal result; every unspecified known event asserts an explicit illegal-transition failure. Purity checks still cover transition input immutability and unrelated-state preservation, including release and acknowledgment deletion paths.

The task-assignment shape test now contains a real synthetic `messageIds: ['M1']` value and matching queued message, proving the task-kind/message-ID contradiction directly rather than relying on a later invariant.

## Exact assignment event matrix

Known events:

```text
reserve, dispatch_attempt, accept, confirm_custody,
begin_completion, acknowledge, release, fail, cancel, recover
```

Legal edges:

```text
reserved:
  dispatch_attempt -> reserved
  accept           -> activating
  release|fail|cancel|recover -> removed

activating:
  accept           -> activating
  confirm_custody  -> running
  release|fail|cancel|recover -> removed

running:
  begin_completion -> completing
  release|fail|cancel|recover -> removed

completing:
  acknowledge      -> removed
  release|fail|cancel|recover -> removed
```

Every other pair in the complete 4 x 10 cross-product fails closed. `reserved + dispatch_attempt` deliberately does not advance custody because dispatch preparation is not page acceptance.

## Validation

Exact final commands and results:

```text
rtk node --test model_fleet/extension/tests/fleet-state-model-m1.test.cjs
10 passed, 0 failed

rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs
6 passed, 0 failed

rtk node --test model_fleet/extension/tests/fleet-*.test.cjs
141 passed, 0 failed

rtk node --check model_fleet/extension/background.js
exit 0

rtk node --check model_fleet/extension/fleet-worker.js
exit 0

rtk git diff --check
exit 0
```

No live browser/CDP or fleet interaction was performed.

## Risks and blockers

No blocker remains for M1 verification. The model remains isolated and is not imported by production scheduling/storage code. M2 schema-v2 persistence and migration remain out of scope.

## Acceptance

M1 result: `READY_FOR_VERIFY`. The ledger remains `M1 = VERIFY`, not `DONE`, pending independent verification.

## Recommended next action

Independently verify the reserved/dispatch-attempt custody semantics and the complete assignment phase/event cross-product. If accepted, M1 may be promoted to DONE; only then consider M2.

## Dependency status

No dependency files changed. No dependency installation or lockfile update was performed.
