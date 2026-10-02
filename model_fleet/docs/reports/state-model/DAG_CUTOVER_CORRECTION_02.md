# DAG Cutover Correction 02

## Assigned scope

Repair the plan and M0 characterization only. Do not implement M2, change production source, touch live browser/fleet state, change dependencies, commit, or push. Keep M0 and M1 at `VERIFY`; M2 must remain `TODO` until prerequisites are DONE.

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

No files are staged. No commit or push was performed. No production or dependency file changed.

Ledger state:

```text
M0 = VERIFY
M1 = VERIFY
M2 = TODO
M3-M9 = TODO
```

## Source-faithful rotation correction

The M0 fixture `rotationFailedWorker` now matches the production failure shape:

```text
lifecycle = rotation-failed
status = blocked
chatRotationPending = true
```

It is rejected as `rotation-pending`, because the migration gate rejects any pending rotation marker. The previous unsupported claim that a `rotation-failed` worker with `chatRotationPending=false` was quiescent was removed.

The characterization still preserves:

- `rotating` lifecycle -> `rotation-in-progress` rejection;
- idle/waiting plus `chatRotationPending=true` -> `rotation-pending` rejection;
- manual worker without assignment -> allowed quiescent state;
- no production normalization or rotation behavior changes.

## Exact M3-M6 preparatory boundaries

The plan now makes M2-M6 isolated and NON-DEPLOYABLE:

- M2: pure v2 schema/codec/gate only; production state remains v1 and no v2 write reaches `chrome.storage`.
- M3: pure reservation/custody operations, assignment input contracts, prompt-input contracts, rollback/concurrency mappings, and exact M7 replacement inventory. Production `assignmentForWorker()`, reservation writes, and prompt builders remain unchanged.
- M4: pure custody/reconciliation operations plus restart, bridge, heartbeat, completion, cancellation, and retry simulations. Production service-worker, bridge, background, and fleet-worker integration remains unchanged. No live 9222 smoke test is required here.
- M5A: pure task/message adapters and exhaustive equivalence fixtures. Production `task.status`/`message.status` names and writers remain unchanged until M7.
- M5B: pure runtime/fault/availability adapters and equivalence fixtures for all lifecycle/status values. Production scheduler and worker status/lifecycle wiring remain unchanged until M7.
- M6: pure v2 `publicSnapshot()`/UI/diagnostic projection contract and renderer fixtures. Production `publicSnapshot()`, `control-pane.js`, and related UI wiring remain unchanged until M7.

M3-M6 no longer claim removal of legacy readers/writers, production scheduler wiring, production UI wiring, or live browser proof before M7. Live CDP 9222 proof is assigned to M9.

## M7 production wiring manifest

M7 now requires a production wiring manifest for every prepared replacement. Each entry must contain:

```text
exact legacy source file/function/site
prepared v2 replacement module/adapter/contract
atomic cutover action in background.js, fleet-worker.js, or control-pane.js
validation proving no production writer/reader was omitted
```

M7 remains the sole production authority cutover: after M2-M6 are independently DONE and strengthened quiescence is proven, it migrates v1->v2 once, switches production load/save/mutate, wires the prepared operations, stops all legacy authoritative writes in the same cutover, and proves there is no dual writable v1/v2 authority.

## Revised readiness rule

The ledger now follows the dependency rule explicitly:

```text
A node may be READY only when all dependencies are DONE.
```

Because M0 and M1 remain VERIFY, M2 is TODO, not READY. The immediate-next-action section says M2 implementation must not begin until the corrected M0 rotation gate and the revised cutover ordering are independently accepted and prerequisites are promoted.

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

No blocker remains for this bounded plan/M0 correction. Independent review is still required before promoting M0/M1 or beginning M2.

## Acceptance

Plan correction result: `READY_FOR_VERIFY`. M0 and M1 remain `VERIFY`; M2 remains `TODO`.

## Dependency status

No dependency files changed. No dependency installation or lockfile update was performed.
