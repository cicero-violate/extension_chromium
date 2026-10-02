# M5B Response 07

## Scope and status

- Assigned scope: repair M5B only; M6/M7 were not started.
- Ledger remains: M0-M5A `DONE`, M5B `VERIFY`, M6/M7 `TODO`.
- Production behavior, browser/CDP state, live fleet state, dependencies, commits, and pushes were not changed.
- Before and after: branch `main`, `HEAD 02183c4668c214e2a130747ab9b9820b6272cd43`.

## Repaired recovery-clear proof matrix

`clearFaultV2()` now validates both the actual successful M4 result and the exact input facts that can produce that result:

| M4 outcome | Required recovery input and canonical post-state |
|---|---|
| `reattached-running` | exact non-null identity matching the assignment; `reattached === true` or `promptProof === true`; assignment phase `running` |
| `reattached` | exact non-null identity matching the assignment; `reattached === true` or `promptProof === true`; assignment phase `running` |
| `completion-reattached` | exact non-null identity matching the assignment; `pendingCompletionProof === true`; assignment phase `completing` |
| `no-owner` | no current assignment; identity omitted, or explicitly present with `reportedAssignmentId === null` |

All recovery-clear outcomes also require the same worker, a finite positive `recoveryInput.observedAt`, `evidence.at === observedAt`, and `observedAt >= fault.at`. Preservation-only, pending-proof, mismatched-identity, forged phase, and missing-proof combinations reject without mutation.

Focused composition coverage includes actual M4 results for running reattach, completing reattach, and both omitted-identity and explicit-null no-owner paths, plus adversarial forged reattach and missing completion-proof cases.

## Legacy rotation-failed timestamp law

For a legacy blocked worker with `lifecycle === 'rotation-failed'`:

- explicit positive `faultAt` is accepted as direct fixture evidence;
- otherwise positive `conversionAt` is required and used as migration-observed-at;
- `lastDispatchFailureAt` is never used as rotation-failure timestamp;
- absent valid evidence rejects with `missing-legacy-fault-at`.

For non-rotation blocked workers, positive `lastDispatchFailureAt` remains valid source evidence. No constant timestamp fallback is used. The plan now records this distinction.

## Validation

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m5b.test.cjs` — **21/21 pass**.
- M0-M5A focused suite — **74/74 pass**.
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **220/220 pass**.
- `rtk node --check model_fleet/extension/fleet-state-model-m5b.cjs` — pass.
- `rtk node --check model_fleet/extension/background.js` — pass.
- `rtk node --check model_fleet/extension/fleet-worker.js` — pass.
- `rtk git diff --check` — pass.
- Production import/load scan — pass; no production file loads M5B.
- M5B Chrome-API scan — pass.
- Custody/task/message mutation scan — pass; M5B does not write assignment custody or task/message phases.
- Exact manifest-boundary and broad worker coverage scans — pass.

## Worktree and dependencies

No tracked production files were changed. Existing isolated untracked state-model artifacts remain untouched outside the M5B repair scope:

```text
?? model_fleet/extension/.#STATE_MODEL_CLEANUP_TODO.md
?? model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md
?? model_fleet/extension/fleet-state-model-m1.cjs
?? model_fleet/extension/fleet-state-model-m2.cjs
?? model_fleet/extension/fleet-state-model-m3.cjs
?? model_fleet/extension/fleet-state-model-m4.cjs
?? model_fleet/extension/fleet-state-model-m5a.cjs
?? model_fleet/extension/fleet-state-model-m5b.cjs
?? model_fleet/extension/tests/fleet-state-model-m0.test.cjs
?? model_fleet/extension/tests/fleet-state-model-m1.test.cjs
?? model_fleet/extension/tests/fleet-state-model-m2.test.cjs
?? model_fleet/extension/tests/fleet-state-model-m3.test.cjs
?? model_fleet/extension/tests/fleet-state-model-m4.test.cjs
?? model_fleet/extension/tests/fleet-state-model-m5a.test.cjs
?? model_fleet/extension/tests/fleet-state-model-m5b.test.cjs
```

No dependency files changed; nothing was staged, committed, pushed, reset, or discarded.

## Acceptance

M5B result: **READY_FOR_VERIFY**. M5B remains `VERIFY` pending independent review. M6 and M7 remain `TODO`.

