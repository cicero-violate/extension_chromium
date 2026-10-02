# M5A Response 02

## Scope and result

Assigned scope: repair M5A only after independent verification rejection. M5B and M6 were not started.

Result: **READY_FOR_VERIFY**. M5A remains `VERIFY`; it is not marked `DONE`.

Ledger after this turn:

- M0 = DONE
- M1 = DONE
- M2 = DONE
- M3 = DONE
- M4 = DONE
- M5A = VERIFY
- M5B = TODO
- M6 = TODO

## Repository state

HEAD before and after: `02183c4668c214e2a130747ab9b9820b6272cd43`.

Branch: `main`.

The worktree remains uncommitted and contains the existing isolated M0-M5A artifacts plus the pre-existing editor backup. No tracked production file was changed. No dependency file was changed. No browser, CDP, account, storage, or live fleet state was touched.

Files inspected:

- `extension/background.js`
- `extension/fleet-worker.js`
- `extension/control-pane.js`
- `extension/manifest.json`
- `extension/fleet-state-model-m1.cjs` through `fleet-state-model-m5a.cjs`
- focused M0-M5A tests
- `docs/architecture/STATE_MODEL_CLEANUP_TODO.md`

Files changed for this repair:

- `extension/fleet-state-model-m5a.cjs`
- `extension/tests/fleet-state-model-m5a.test.cjs`
- `docs/architecture/STATE_MODEL_CLEANUP_TODO.md` retains the M5A `VERIFY` ledger state and isolated/non-deployable boundary.

## Repaired contracts

### M4 composition and active custody

`prepareCompletionDispositionV2()` now performs metadata-only preparation for active assignments:

- task/message phases remain `running`;
- assignment custody and worker pointer remain intact;
- task metadata is prepared without terminalizing the task;
- message metadata is prepared without terminalizing messages;
- M4 `acknowledgeCompletion()` remains the sole operation that transitions work terminal and removes assignment custody;
- every successful prepared state is checked with `assertFleetInvariants()`.

The focused tests now exercise:

1. M4 begin-completion -> M5A prepare -> M4 acknowledge for a task;
2. the same composition for a single message;
3. the same composition for a multi-message batch with mixed done/blocked disposition.

No successful M5A operation returns a terminal active-owned task/message state. Active-owned direct task/message completion, requeue, block, and cancel helpers reject with `active-custody-owned-by-m4`.

### Task versus message completion disposition

- Task disposition follows parsed `done`/`blocked`.
- Every assignment message defaults to `done`, regardless of parsed task status.
- Only `repairExhausted` for the exact `sourceMessageId` produces a blocked message.
- Repair linkage requires the source message ID to belong to the assignment batch.
- Batch metadata is applied on one cloned still-running state; no intermediate terminal phase is emitted.

### Protocol repair

`createProtocolRepairMessageV2()` now accepts both `sourceMessageId` and `failedAssignmentId`.

- `sourceMessageId` owns the bounded attempt counter;
- `failedAssignmentId` is written to `protocolRepairOf`;
- source counter values must be finite nonnegative integers;
- maximum source-equivalent repair attempts is one;
- first attempt derives `used + 1` internally;
- exhausted input returns an explicit no-repair/exhausted result and creates no message;
- created repairs are scheduler-originated queued fleet messages with `requiresFleetMessage=true`.

### Task creation boundary

`createTaskV2()` now requires canonical role input, defaults omitted role to `coordinator`, rejects noncanonical `createdByRole`, and clamps finite priority to `[-100, 100]`. Dependency, parent, creator, and lifecycle defaults remain preserved. The M5A boundary does not duplicate production `canonicalRole`; callers supply canonical role values.

### M7 status manifest and coverage

The manifest was corrected to current `background.js` regions, including the exact regions for `requeueAssignmentMessages`, dispatch deferral/recovery, task/message creation, goal frontier, selection/dispatch, failure/requeue, completion, reconciliation/release, stop/flush, retry, and clear-completed paths.

The M5A test now parses manifest line ranges and scans current production source for task/message `.status` lifecycle references. Every detected lifecycle status reference is covered by a manifest range. Worker status references remain outside M5A and are reserved for M5B.

### Isolation and authority checks

- M5A contains no Chrome API access.
- Production `background.js`, `fleet-worker.js`, `control-pane.js`, and `manifest.json` do not import or load M5A.
- No second transition table was added.
- No direct phase mutation exists outside initial object creation; lifecycle transitions use M1 helpers.
- Active custody mutation remains owned by M3/M4.

## Exact validation

All commands used the required `rtk` prefix.

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m5a.test.cjs` — **9/9 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m4.test.cjs` — **24/24 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m3.test.cjs` — **14/14 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m2.test.cjs` — **10/10 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m1.test.cjs` — **10/10 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs` — **6/6 pass**
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **198/198 pass**
- `rtk node --check model_fleet/extension/fleet-state-model-m5a.cjs` — pass
- `rtk node --check model_fleet/extension/background.js` — pass
- `rtk node --check model_fleet/extension/fleet-worker.js` — pass
- `rtk git diff --check` — pass
- production import/load scan for M5A — pass
- M5A Chrome API scan — pass
- no-second-transition-table/direct-active-phase scan — pass
- manifest lifecycle coverage scan — pass

## Risks and remaining gate

No blocker was found in the bounded M5A scope. M5A still requires independent verification before it can be promoted to `DONE`. M5B remains the owner of worker runtime/fault/availability conversion, and M7 remains the only production authority cutover.

Recommended next DAG action: independently review this M5A repair; if accepted, promote M5A to `DONE` and authorize the separately scoped M5B node.

