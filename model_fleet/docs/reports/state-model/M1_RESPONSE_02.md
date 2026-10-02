# M1 Response 02

## Assigned scope

Repair M1 only after independent verification. Preserve M1 as `VERIFY`; do not start M2. Update only the isolated pure state model/tests and M1 documentation state. Do not change production behavior, storage, dependencies, browser state, or live fleet state.

## Repository state

HEAD before and after: `02183c4668c214e2a130747ab9b9820b6272cd43`

Status before:

```text
?? model_fleet/extension/.#STATE_MODEL_CLEANUP_TODO.md
?? model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md
?? model_fleet/extension/fleet-state-model-m1.cjs
?? model_fleet/extension/tests/fleet-state-model-m0.test.cjs
?? model_fleet/extension/tests/fleet-state-model-m1.test.cjs
```

Status after: identical. Nothing is staged. No commit or push was performed. M2 remains `TODO` in the ledger and M1 remains `VERIFY`.

## Repaired files

- `model_fleet/extension/fleet-state-model-m1.cjs`
- `model_fleet/extension/tests/fleet-state-model-m1.test.cjs`

No production source file was changed. The current `background.js` recovery/retry paths were inspected to characterize existing requeue semantics only.

## Repaired transition vocabularies and matrices

Known event vocabularies are explicit and every phase is tested against the complete phase x known-event cross-product:

```text
TaskEvent:
  reserve, start, complete, block, requeue, cancel

MessageEvent:
  reserve, start, complete, block, cancel, deliver_to_operator, requeue

AssignmentEvent:
  reserve, dispatch_attempt, accept, confirm_custody,
  begin_completion, acknowledge, release, fail, cancel, recover
```

Task transitions:

```text
pending   + reserve  -> running
pending   + start    -> running
pending   + block    -> blocked
pending   + requeue  -> pending
pending   + cancel   -> cancelled
running   + complete -> done
running   + block    -> blocked
running   + requeue  -> pending
running   + cancel   -> cancelled
done      + requeue  -> pending
blocked   + requeue  -> pending
cancelled + requeue  -> pending
```

This preserves production recovery/defer/dispatch-failure requeue and the `fleet:retry-task` behavior that permits any non-running task to return to pending.

Message transitions:

```text
queued  + reserve            -> running
queued  + start              -> running
queued  + block              -> blocked
queued  + cancel             -> cancelled
queued  + deliver_to_operator -> delivered
running + complete           -> done
running + block              -> blocked
running + requeue            -> queued
running + cancel             -> cancelled
```

This preserves worker-message recovery/release requeue to `queued` and uses the authoritative `deliver_to_operator` name.

Assignment transitions:

```text
reserved   + dispatch_attempt -> activating
reserved   + accept           -> activating
activating + accept           -> activating
activating + confirm_custody  -> running
running    + begin_completion -> completing
completing + acknowledge      -> removed
reserved/activating/running/completing
           + release|fail|cancel|recover -> removed
```

Unlisted known events fail closed for each phase. Assignment removal clears the reciprocal worker reference in the returned pure state; it does not persist or mutate live storage.

## Repaired invariants and tests

- Running assignments now allow absent/null `worker.runtime.reportedAssignmentId`, preserving already-confirmed custody across a later missing heartbeat.
- A non-null reported assignment ID must equal the assignment ID; a non-null mismatch still fails closed.
- Unknown task, message, or assignment phase strings fail closed.
- Assignment `kind` must be exactly `task`, `message`, or `control`.
- Task assignments require exactly one `taskId`, no message IDs, and may carry control notices.
- Message assignments require one or more `messageIds`, no task ID, and may carry control notices.
- Control assignments require control notices and no task/message IDs.
- Mixed task/message assignments, unknown kinds, missing referenced entities, wrong-worker messages, and missing control notices fail closed.
- Purity tests now cover task, message, and assignment transitions, including release and acknowledgment deletion paths; input objects and unrelated state remain unchanged.
- Existing reciprocal ownership, terminal/running task/message, operator-delivered, worker projection, and availability precedence checks remain covered.

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

No blocker remains for M1 verification. The model is intentionally isolated and not wired into production writes. M2 schema-v2 persistence and migration remain out of scope.

## Acceptance

M1 result: `READY_FOR_VERIFY`. It remains ledger state `VERIFY`, not `DONE`, pending independent verification.

## Recommended next action

Independently verify the event matrices, recovery/requeue semantics, relaxed heartbeat rule, assignment-shape checks, and pure non-production isolation. Only after M1 is accepted may M2 be considered.

## Dependency status

No dependency files changed. No dependency installation or lockfile update was performed.
