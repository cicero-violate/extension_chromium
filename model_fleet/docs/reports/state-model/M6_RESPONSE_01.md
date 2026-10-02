# M6 Response 01

## Scope and status

- Assigned scope: M6 public snapshot, UI, and diagnostics projection only.
- M0-M5B are recorded `DONE`; M6 is `VERIFY`; M7 remains `TODO`.
- M6 artifacts are isolated and non-deployable. No production source, browser/CDP state, live fleet state, dependency, commit, or push changes were made.
- Branch/HEAD before and after: `main` / `02183c4668c214e2a130747ab9b9820b6272cd43`.

## Public snapshot schema

`projectPublicSnapshotV2(state, { observedAt, heartbeatMaxAgeMs, roleCatalog, migrationDiagnostic })` is the canonical pure entry point. It validates M2 v2 state and M1 invariants, requires explicit observation time, and returns a detached projection containing:

- `version`, `generation`, `goal`, `policy`, `topology`, `roleCatalog`, `observedAt`, `serverNow`;
- worker list/map projections;
- task list/map projections;
- message projections;
- canonical assignment summaries;
- role activity counts/history;
- bounded journal projection;
- queue diagnostics and typed health issues.

It does not spread raw state, expose legacy status/busy/heartbeat/custody compatibility fields, or mutate input. Canonical `currentAssignmentId` is exposed read-only as a custody reference.

## Projection laws

- Workers use M5B availability and lifecycle projection. Availability is `offline | blocked | running | busy | idle`; lifecycle display is separate and preserves warm-idle, rotating, rotation-failed, activating, and cancellation display intent.
- Worker fault, runtime heartbeat age, tab/window metadata, cooldown/rotation facts, and assignment summaries are read-only projections.
- Tasks use M5A dependency/runnable decisions and canonical `task.phase`; active ownership is resolved only through `state.assignments`.
- Messages use canonical `message.phase`; operator `delivered` remains terminal; ownership is resolved only through canonical assignments.
- Queue age uses explicit `observedAt`; queued message counts use `message.phase === 'queued'`; active assignment counts use `state.assignments`.
- Role activity maps running/blocked/offline availability directly and places busy/idle in the idle bucket for the existing timeline vocabulary.
- Diagnostics expose stale/never heartbeat, offline/unbound workers, faults, blocked workflow, queue pressure, policy restrictions, and explicitly supplied migration blockers.
- Invalid canonical input is handled by `diagnoseProjectionInputV2()` as typed issues; it never fabricates a valid snapshot.

## Heartbeat UI delta

`projectHeartbeatDeltaV2()` and `applyHeartbeatViewDeltaV2()` operate only on public view state. They update observation display fields, reject invalid deltas, ignore stale observations, preserve custody/availability authority, and cannot create or remove assignments. Optional title/url/window fields are updated only when explicitly present and valid.

## Renderer/view-model fixtures

Pure structured models are provided for overview, workers, tasks, and messages. Fixtures prove they consume only the public projection, preserve phase/display separation, expose retry/workflow decisions, and escape hostile text with `escapeHtml()`.

## M7 snapshot/UI reader manifest

`M7_SNAPSHOT_UI_READER_MANIFEST` enumerates exact current production boundaries and cutover actions for:

- `background.js` role activity, public snapshot, snapshot/heartbeat broadcast, and snapshot response sites;
- `control-pane.js` snapshot normalization, role timeline, task/message/topology/worker rendering, heartbeat display updates, queue pressure, journal, invariant/exception rendering, overview metrics, and snapshot handlers.

Each entry records legacy reads, the M6 replacement, and the M7 atomic wiring action. Named ranges are bounded function/site entries rather than one overlapping catch-all range. The focused manifest test checks required named boundaries and replacement metadata.

## Isolation and validation

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m6.test.cjs` — **10/10 pass**.
- M0-M5B focused suite — **95/95 pass**.
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **230/230 pass**.
- Node syntax checks for M6, `background.js`, `control-pane.js`, and `fleet-worker.js` — pass.
- `rtk git diff --check` — pass.
- Production import/load scan — pass; no production file references M6.
- M6 Chrome-API scan — pass.
- M6 hidden-time scan — pass; no `Date.now()`.
- M6 authority-mutation scan — pass; no assignment, task/message phase, or worker custody writes.
- M6 legacy-compatibility scan — pass after excluding manifest documentation strings; no legacy compatibility authority is used in executable projection code.
- Exact snapshot/UI manifest-boundary and legacy-reader coverage checks — pass.

## Worktree and dependencies

Only the existing isolated untracked state-model artifacts, M6 module/test, and plan ledger are present. No tracked production files were changed. No dependency files were modified. Nothing was staged, committed, pushed, reset, or discarded.

## Acceptance

M6 result: **READY_FOR_VERIFY**. M6 remains `VERIFY` pending independent review. M7 remains `TODO` and was not started.

