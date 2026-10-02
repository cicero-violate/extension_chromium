# M5B Response 06

## Scope and status

- Assigned scope: repair M5B only; M6/M7 were not started.
- Ledger remains: M0-M5A `DONE`, M5B `VERIFY`, M6/M7 `TODO`.
- No production source, browser, live fleet, dependency, commit, or push changes were made.

## Repaired contracts

### Actual M4 no-owner proof

`clearFaultV2()` now accepts the actual M4 successful `outcome: "no-owner"` result when the canonical worker pointer is null and the same timestamped recovery input is supplied. Both identity forms are source-compatible:

- omitted identity: `hasAssignmentIdentity: false`;
- explicit null identity: `hasAssignmentIdentity: true, reportedAssignmentId: null`.

Non-null reported identity, wrong worker, missing/retrograde timestamp, and independently chosen evidence time fail closed. Historical `fault.assignmentId` may be non-null because this is the post-release no-owner proof.

### Exact post-M4 recovery outcome matrix

| M4 outcome | Required canonical state |
|---|---|
| `reattached-running` | exact assignment exists, worker pointer matches, phase `running` |
| `reattached` | exact assignment exists, worker pointer matches, phase `running` |
| `completion-reattached` | exact assignment exists, worker pointer matches, phase `completing` |
| `no-owner` | worker pointer is null |

Forged `reattached` results for `activating` assignments are rejected. Preservation/pending and unrecoverable outcomes are not fault-clear proof.

### Timestamp-bound recovery event

Every recovery-clear proof requires a finite positive `recoveryInput.observedAt`, exact worker identity, `evidence.at === recoveryInput.observedAt`, and `observedAt >= fault.at`. The actual M4 result remains unchanged; freshness is supplied by the separate recovery event input and cannot be replayed with an independently selected timestamp.

### Legacy active-status conversion

Legacy `activating`, `running`, and `cancelling` status values now require canonical assignment custody. The worker pointer must resolve an assignment owned by that worker, with phase compatibility of `reserved|activating` for `activating` and `running|completing` for `running`; `cancelling` requires any active assignment. A runtime-reported assignment ID alone never creates or justifies custody. Ghost, dangling, wrong-worker, and incompatible-phase shapes reject with `legacy-active-status-custody-contradiction`.

### Dispatch-failure lifecycle intent

`applyDispatchFailureFaultV2()` remains non-authoritative for lifecycle persistence but returns the exact M7 composition intent:

- enabled worker: `{lifecycle: "idle", busy: false, warmIdleSince: 0, warmIdleUntil: 0}`;
- disabled worker: `{lifecycle: "offline", busy: false, warmIdleSince: 0, warmIdleUntil: 0}`.

The existing exact assignment binding, reserved-phase, dispatch-attempt, and timestamp checks remain enforced.

## Validation

Commands and results:

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m5b.test.cjs` — **20/20 pass**.
- M0-M5A focused tests — **74/74 pass**.
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **219/219 pass**.
- `rtk node --check model_fleet/extension/fleet-state-model-m5b.cjs` — pass.
- `rtk node --check model_fleet/extension/background.js` — pass.
- `rtk node --check model_fleet/extension/fleet-worker.js` — pass.
- `rtk git diff --check` — pass.
- Production import/load scan for M5B — pass; no production file references the M5B module.
- M5B Chrome-API scan — pass; the isolated module has no `chrome.*` access.
- Custody/task/message mutation isolation scan — pass.
- Exact worker-manifest and broad coverage scans — pass.

## Worktree and dependencies

Before and after validation: branch `main`, `HEAD 02183c4668c214e2a130747ab9b9820b6272cd43`. The worktree contains only the existing untracked isolated state-model artifacts and plan file:

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

No tracked production files were changed. No dependency files were modified. No files were staged, committed, pushed, or reset.

## Acceptance

M5B result: **READY_FOR_VERIFY**. The node remains `VERIFY`; independent review is required before promotion to `DONE`. M6 and M7 remain `TODO`.
