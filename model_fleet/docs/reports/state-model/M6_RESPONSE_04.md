# M6 Response 04

## Scope and result

- Assigned scope: repair M6 public snapshot, UI, diagnostics, and projection only.
- M0–M5B remain DONE; M6 remains VERIFY; M7 remains TODO.
- Result: READY_FOR_VERIFY. M6 was not marked DONE.
- No M7 work was started.

## Worktree state

- HEAD before/after: `02183c4668c214e2a130747ab9b9820b6272cd43`.
- Branch: `main`.
- Existing isolated state-model artifacts remain untracked; they were preserved exactly.
- M6 artifacts are untracked:
  - `model_fleet/extension/fleet-state-model-m6.cjs`
  - `model_fleet/extension/tests/fleet-state-model-m6.test.cjs`
- The authoritative plan remains untracked with ledger state M0–M5B DONE, M6 VERIFY, M7 TODO. The pre-existing temporary `.#STATE_MODEL_CLEANUP_TODO.md` remains untouched.
- Production `background.js`, `control-pane.js`, `fleet-worker.js`, and `manifest.json` were not changed.
- No dependency files were changed; no staging, commit, push, browser, CDP, or live-fleet interaction occurred.

## Repairs completed

### UI heartbeat staleness and display precedence

- Added explicit `heartbeatAgeSeconds` and `uiHeartbeatStale` projection fields.
- UI staleness matches the current control-pane rule: rounded age seconds greater than 25, never-heartbeat, unbound, or stale lifecycle.
- UI display precedence is cancellation intent, warm-idle, rotating, waking custody, UI stale/offline, lifecycle-offline or fault-blocked, running, waiting/busy, idle.
- M5B scheduler availability remains separate and unchanged.
- Heartbeat diagnostics use the UI threshold, not M5B’s scheduler freshness threshold.

### UI live/bound set and diagnostics

- Added one projected live/bound helper: enabled, lifecycle not stale, integer tab binding.
- Reused it for overview live workers, unique-tab ownership, concurrency/running-owner diagnostics, and dedicated-window checks.
- Active workers remain the count of non-null canonical assignment pointers.
- Enabled lifecycle-offline workers with concrete tabs remain live for source-equivalent UI topology and target selection; disabled, stale, and unbound workers do not.

### Heartbeat delta clock and metadata

- Heartbeat event time and transport `serverNow` are distinct.
- Worker heartbeat timestamps use event time; snapshot/view clock uses transport time and advances monotonically.
- Accepted clock advances recompute heartbeat age and UI stale/display fields for every worker.
- Omitted optional metadata is preserved; direct deltas validate busy/title/url/window fields; stale and same-time duplicate/conflict behavior is deterministic.
- Deltas remain detached display projections and cannot change custody or availability authority.

### Role catalog and role contracts

- Public role catalog now preserves the complete canonical three-role metadata allowlist, including the source review label `Verifier / Integrator`, default counts, purpose, claim types, authority scope, prohibited actions, allowed handoffs, and independent-verification flags.
- Caller catalogs must contain the complete canonical role set and projected worker roles cannot be omitted from the catalog/keyspace.
- Added role-contract/topology target and turn-limit projections.

### Routes, targets, queue, journal, and message groups

- Worker/message routes use source-equivalent role-aware labels, Unicode `→`, and operator destination `you`.
- Worker target labels include role and compact URL/title context.
- Queue diagnostics preserve bounded non-authoritative completion-release lag fields and expose canonical `diagnostics.queueByWorker`.
- Queue-pressure rows filter empty workers, sort by queued count/age/numeric worker ID, and expose total queued count.
- Journal projection validates/bounds entries; the journal renderer keeps only `schedule.deferred`, takes the last 60, and reverses newest-first.
- Message grouping provides source-equivalent all/inbox/traffic sorting, traffic limit 30, counts, and queued/running active metrics.
- Paused policy is a health context and does not create a paused exception row.

### Public projection safety and manifest coverage

- Worker/task/message low-level exports now normalize/assert v2 state before projecting; invalid state cannot be projected successfully through a public helper.
- Task/message public outputs use explicit allowlists and do not expose stored `assignedWorkerId` or future internal fields.
- Typed diagnostics include invariant rows, policy/health context, migration blockers, queue pressure, stale heartbeat, faults, and workflow issues.
- M7 manifest includes exact role catalog, route/target, message-time/sort, renderer, heartbeat, snapshot, response-normalization, and publicSnapshot sites.
- Manifest tests brace-scan named functions in both `background.js` and `control-pane.js`, verify exact lexical ranges, and separately cover publicSnapshot, normalizeSnapshot, and heartbeat-handler sites without broad catch-all ranges.

## Validation

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m6.test.cjs` — **28/28 passed**.
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs ... fleet-state-model-m5b.test.cjs` — **95/95 passed**.
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **248/248 passed**.
- `rtk node --check model_fleet/extension/fleet-state-model-m6.cjs` — passed.
- `rtk node --check model_fleet/extension/background.js` — passed.
- `rtk node --check model_fleet/extension/control-pane.js` — passed.
- `rtk node --check model_fleet/extension/fleet-worker.js` — passed.
- `rtk git diff --check` — passed.
- Production import/load scan — no M6 import/load in `background.js`, `control-pane.js`, `fleet-worker.js`, or `manifest.json`.
- M6 browser/hidden-time scan — no Chrome API or `Date.now()` use in the M6 module.
- M6 mutation/isolation scan — no assignment, task/message phase, production authority, or live wiring mutation.
- Exact background/control manifest boundary, publicSnapshot, normalizeSnapshot, heartbeat-handler, and legacy-reader coverage scans — passed.

## Risks/blockers

- M6 remains isolated and non-deployable pending independent verification.
- No production wiring or live UI proof was authorized for this node.
- No dependency changes.

## Acceptance and next action

- M6 acceptance criteria covered by the focused suite and isolation scans: **READY_FOR_VERIFY**.
- Independent verification should review the source-equivalence projections and then promote M6 to DONE only if accepted.
- Next DAG action after independent acceptance: M7 only; do not start it in this turn.
