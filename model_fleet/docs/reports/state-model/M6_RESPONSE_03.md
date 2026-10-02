# M6 Response 03

## Scope and status

- Assigned scope: repair M6 only — public snapshot, UI, diagnostics, and projection contracts.
- M0–M5B: DONE in the ledger; M6: VERIFY; M7: TODO.
- Result: READY_FOR_VERIFY. M6 is not marked DONE.
- No production runtime wiring, browser/CDP interaction, live fleet mutation, dependency change, commit, or push was performed.

## Worktree before and after

- HEAD before/after: `02183c4668c214e2a130747ab9b9820b6272cd43`.
- Branch: `main`.
- The isolated state-model artifacts remain untracked, preserving the existing worktree shape. M6 changes are limited to:
  - `model_fleet/extension/fleet-state-model-m6.cjs`
  - `model_fleet/extension/tests/fleet-state-model-m6.test.cjs`
  - `model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md` (ledger correction: M5B DONE; M6 VERIFY remains).
- Production `background.js`, `control-pane.js`, `fleet-worker.js`, and `manifest.json` were not changed.
- No dependency files were changed.

## Projection and UI repairs

- Overview now separates `activeWorkers` (non-null canonical `currentAssignmentId`) from `liveWorkers`; paused policy remains a separate presentation value and does not make a healthy authority-enabled, invariant-valid fleet unhealthy. A typed `authority-enabled` invariant is included.
- Legacy sleep diagnostics fail when either `sleepTabId` is an integer or lifecycle is `sleeping`/`parking`.
- Worker display precedence is explicit and projection-only: cancellation intent, warm, rotating, waking, blocked, offline, running, waiting, then idle. Renderer CSS classes follow current control-pane mappings rather than raw semantic labels.
- Task/message CSS classes, task/message/control assignment labels, and worker-role route labels are source-equivalent. Task public projection no longer exposes stored `assignedWorkerId`; ownership comes from canonical assignments.
- Topology excludes disabled workers, counts lifecycle-stale or unbound enabled workers as stale, and treats enabled lifecycle-offline workers with concrete tabs as live for current UI topology. Message targets use enabled + non-stale lifecycle + integer tab binding without requiring idle availability.
- Cancellation is supplied only as an explicit projection intent (`cancellationWorkerIds`) and is passed to the M5B lifecycle projection. Raw `worker.cancellationRequested` is ignored; no-assignment intents are deterministically ignored by the prepared projection.
- Heartbeat view deltas preserve omitted optional fields, validate direct callers, reject same-time explicit conflicts, keep stale deltas inert, and advance the view clock on accepted same-time duplicates.
- Role catalogs must contain the complete canonical coordinator/implementation/review keyspace, with customizable labels.
- Task/message projections use explicit public allowlists. Migration diagnostic issue type remains fixed as `migration-blocked` and cannot be overwritten by caller data.
- Historical role activity and journal projections validate samples, report malformed entries as typed issues, apply the 24-hour/8000 role-activity bounds, and retain the last 250 valid journal entries.

## Diagnostics, renderers, and manifest proof

- Typed invariant rows include tab uniqueness, assignment ownership, concurrency, running task/message ownership, assignment display consistency, dedicated windows, legacy sleep state, and authority enabled.
- Structured renderer models cover overview, workers, tasks, messages, role timeline, topology, queue pressure, invariants, exceptions, journal, and message-target options using only the public snapshot.
- M7 manifest ranges were corrected for the exact background named functions and control-pane named functions. Separate entries cover the heartbeat handler, every listed `normalizeSnapshot` response site, and every `publicSnapshot()` transport/call site.
- The focused manifest test brace-scans both background and control-pane named functions, checks exact lexical ranges, verifies every publicSnapshot call, and verifies every control-pane `normalizeSnapshot()` call is covered. It also checks required projection replacement metadata.

## Validation commands and results

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m6.test.cjs` — **24/24 passed**.
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs ... fleet-state-model-m6.test.cjs` — **118/118 passed**.
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **244/244 passed**.
- `rtk node --check model_fleet/extension/fleet-state-model-m6.cjs` — passed.
- `rtk node --check model_fleet/extension/tests/fleet-state-model-m6.test.cjs` — passed.
- `rtk node --check model_fleet/extension/background.js` — passed.
- `rtk node --check model_fleet/extension/control-pane.js` — passed.
- `rtk node --check model_fleet/extension/fleet-worker.js` — passed.
- `rtk git diff --check` — passed.
- Production import/load scan for M6 — no matches.
- M6 Chrome API and hidden-time scan — no `chrome.` or `Date.now()` references in the M6 module.
- Production mutation/isolation checks — passed; no production file imports or loads M6, and M6 tests reject direct authority mutation patterns.
- Exact background/control manifest boundary and legacy-reader/publicSnapshot/normalizeSnapshot coverage scans — passed.

## Risks and remaining gate

M6 remains isolated and non-deployable. Independent verification is still required before the ledger may promote M6 to DONE. M7 remains TODO and is not started.

