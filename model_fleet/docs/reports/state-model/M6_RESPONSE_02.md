# M6 Response 02

## Scope and status

- Assigned scope: repair M6 only; M7 was not started.
- Ledger remains: M0-M5B `DONE`, M6 `VERIFY`, M7 `TODO`.
- Branch/HEAD: `main` / `02183c4668c214e2a130747ab9b9820b6272cd43` before and after.
- No production source, browser/CDP, live fleet, dependency, commit, push, reset, or discard changes.

## Repaired projection contracts

### Display-status precedence

`displayStatus` is now explicitly projection-only and separate from M5B availability:

1. cancellation request -> `cancelling`;
2. `warm-idle` lifecycle -> `warm`;
3. rotating lifecycle -> `rotating`;
4. reserved/activating assignment -> `waking`;
5. rotation failure or worker fault -> `blocked`;
6. offline/unbound/stale availability -> `offline`;
7. running availability -> `running`;
8. fresh busy availability -> `waiting`;
9. idle -> `idle`.

Lifecycle display remains separately available for rotation-failed and other lifecycle-specific UI intent. No display label is accepted by any mutation API.

### Heartbeat view delta

`projectHeartbeatDeltaV2()` preserves field presence:

- omitted busy preserves `runtimeBusy`;
- supplied busy must be boolean;
- omitted/empty title and URL preserve existing values; nonempty values must be strings;
- omitted window ID preserves existing value; supplied value must be an integer.

`applyHeartbeatViewDeltaV2()` validates direct callers itself, rejects malformed metadata, treats stale deltas as no-ops, rejects conflicting same-time explicit fields, accepts exact same-time duplicates idempotently, and advances `observedAt/serverNow` to at least the applied event time. It never changes assignment custody or authoritative availability; runtime-busy changes remain display-only until a full canonical snapshot.

### Typed invariants and health

Snapshots now expose `diagnostics.invariants`, with `{ code, label, ok, detail }` rows for:

- unique concrete tab ownership;
- unique assignment worker ownership;
- policy concurrency bound;
- running task ownership;
- running worker-message ownership;
- assignment/display consistency as diagnostic-only evidence;
- dedicated worker windows when enabled by policy;
- absence of legacy sleeping/parking lifecycle state.

Overview health is derived from these typed rows plus policy state. Invalid raw input remains diagnostic-only through `diagnoseProjectionInputV2()` and returns `snapshot: null`.

Migration diagnostics are typed with fixed `code: 'migration-blocked'`; caller data is limited to reason/message/detail and cannot overwrite the issue type.

### Renderer/view-model coverage

Structured pure models now cover:

- overview metrics: active assignments/workers, live workers, runnable tasks, active messages, generation, policy health, queue pressure, issue count, invariants;
- worker cards: complete worker projection, display class/status, assignment label, queue details, heartbeat age, tab/window/title/url, capabilities, rotation/chat data, cancellation visibility;
- task cards: phase/class/label, owner, dependencies, attempts, priority, status note, workflow gate, result, retry visibility;
- message cards: route, phase/class/label, body/response, operator grouping, timestamps, assignment reference;
- role timeline and current counts;
- topology live/offline/stale counts by role;
- queue-pressure rows;
- invariant and exception rows;
- bounded journal rows;
- source-equivalent enabled, concretely bound message-target options.

Task and message projections now use explicit allowlists. Injected internal fields are not exposed.

### Bounded history

- journal projection keeps the last 250 valid entries;
- role activity accepts finite-positive timestamps and object role data, filters samples older than 24 hours relative to `observedAt`, and keeps the last 8000 valid samples;
- malformed entries are omitted and surfaced as typed diagnostic issues;
- source state remains immutable.

### Role catalog

Caller-supplied catalogs are validated for unique canonical role IDs. The same validated catalog drives both `roleCatalog` and `roleActivityCounts` keyspace, preventing inconsistent projections.

## Exact M7 snapshot/UI manifest and coverage proof

`M7_SNAPSHOT_UI_READER_MANIFEST` now uses exact current lexical ranges for the named control-pane functions:

```text
renderRoleTimeline 244-320
taskRunnable 326-330
renderMessageCard 366-376
renderTopology 397-433
renderWorkers 443-489
updateHeartbeatDisplays 491-518
renderTasks 520-541
renderMessages 543-570
renderQueuePressure 572-606
renderJournal 608-621
computeInvariants 623-648
renderInvariantsAndExceptions 670-690
render 692-723
```

It also records `broadcastHeartbeatDelta` at 541-547, `fleet:get-snapshot` at 3752-3753, all enumerated `background.js` publicSnapshot response sites, snapshot refresh/event handlers, and later action-response normalization sites. The focused coverage test brace-scans named functions, verifies exact lexical ranges, enumerates current `publicSnapshot(...)` background occurrences, and checks relevant control-pane legacy-reader occurrences against manifest coverage.

## Validation

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m6.test.cjs` — **18/18 pass**.
- M0-M5B focused suite — **95/95 pass**.
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **238/238 pass**.
- Node syntax checks for M6, `background.js`, `control-pane.js`, and `fleet-worker.js` — pass.
- `rtk git diff --check` — pass.
- Production import/load scan — pass.
- M6 Chrome API, hidden-time, authority-mutation, and legacy-compatibility scans — pass.
- Exact manifest brace-boundary, publicSnapshot-call, and control-pane legacy-reader coverage scans — pass.

## Worktree and dependencies

Only the existing isolated state-model artifacts, M6 module/test, and plan ledger remain untracked. No tracked production files were changed. No dependency files changed. Nothing was staged, committed, pushed, reset, or discarded.

## Acceptance

M6 result: **READY_FOR_VERIFY**. M6 remains `VERIFY` pending independent review. M7 remains `TODO` and was not started.

