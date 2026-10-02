# M2 response 02

## Result

M2 is `READY_FOR_VERIFY`. M0 remains `DONE`, M1 remains `DONE`, M2 remains
`VERIFY`, and M3 remains `TODO`. This repair changed only the isolated M2
codec/tests and the M2 acceptance wording in the plan. No production source,
storage path, browser, live fleet, or dependency file was changed.

## Repaired v1 gate diagnostics

`canMigrateV1ToV2()` now performs schema checks before semantic checks and uses
exact numeric version matching (`state.version === 1`). It rejects:

- `invalid-v1-state-shape`
- `not-v1-state` for non-exact version 1 values such as `'1'`
- `unexpected-v1-assignments` whenever v1 has an own `assignments` property,
  including `{}`
- `invalid-v1-workers-shape`
- `invalid-v1-tasks-shape`
- `invalid-v1-messages-shape`
- `invalid-v1-worker-entry`
- `invalid-v1-task-entry`
- `invalid-v1-message-entry`
- `invalid-live-heartbeats-shape`
- `invalid-live-heartbeat-entry`

The v1 `assignments` field is never interpreted or discarded. Both acceptance
and rejection probes verify structural immutability. The existing semantic
diagnostics remain unchanged for rotation, dangling custody markers, active
custody, heartbeat custody, running/pending work, queued custody, operator
assignment contradiction, unknown statuses, and pending completion handoff.

Migration invokes the gate before cloning or mapping, so malformed v1 input
cannot escape through a raw collection TypeError or produce partial output.

## Repaired v2 validation

`normalizeV2FleetState()` now requires exact numeric `version === 2`, a
non-array object `assignments`, non-array object maps for `workers` and `tasks`,
an array `messages`, and non-null object entries. It rejects the following
M2-owned legacy fields with deterministic reasons:

| Legacy field | Diagnostic |
|---|---|
| `task.status` | `legacy-v2-task-status` |
| `task.assignmentId` | `legacy-v2-task-assignment-id` |
| `message.status` | `legacy-v2-message-status` |
| `message.assignmentId` | `legacy-v2-message-assignment-id` |
| `worker.currentAssignmentKind` | `legacy-v2-worker-current-assignment-kind` |
| `worker.currentAssignmentStartedAt` | `legacy-v2-worker-current-assignment-start` |
| `worker.currentTaskId` | `legacy-v2-worker-current-task` |
| `worker.currentMessageId` | `legacy-v2-worker-current-message` |
| `worker.currentMessageIds` | `legacy-v2-worker-current-messages` |
| `worker.currentControlNoticeIds` | `legacy-v2-worker-current-control-notices` |

`worker.currentAssignmentId` remains canonical and permitted. M5B-owned
worker `status`, `lifecycle`, `busy`, and `heartbeatAt` remain permitted and
are preserved. After schema and legacy-field validation, the function clones
the input and calls the M1 invariant checker. Success and rejection inputs are
verified unchanged.

The M2 plan acceptance wording now explicitly says that the v2 codec rejects
reintroduction of M2-owned removed legacy authority, while M5B non-custody
worker fields remain temporarily valid in isolated v2 candidates.

## Tests and scans

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m2.test.cjs` — **10/10 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m1.test.cjs` — **10/10 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs` — **6/6 pass**
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **151/151 pass**
- `rtk node --check model_fleet/extension/fleet-state-model-m2.cjs` — pass
- `rtk node --check model_fleet/extension/background.js` — pass
- `rtk node --check model_fleet/extension/fleet-worker.js` — pass
- `rtk git diff --check` — pass
- production import/load scan for M2 — pass; no M2 reference in
  `background.js`, `fleet-worker.js`, `control-pane.js`, or `manifest.json`
- M2 browser-API scan — pass; no `chrome.` access in the M2 module

The focused M2 tests cover empty and nonempty v1 `assignments`, malformed
collections and entries, exact versions, every listed v2 legacy field,
M5B-field preservation, success/rejection immutability, existing M0/M1 cases,
invariant validation, and normalization idempotence.

## Worktree and dependencies

HEAD was unchanged from the prior turn. Existing unrelated untracked artifacts
were preserved. The only new M2 implementation/test changes are:

- `model_fleet/extension/fleet-state-model-m2.cjs`
- `model_fleet/extension/tests/fleet-state-model-m2.test.cjs`
- `model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md`

The worktree remains uncommitted and unstaged; no dependency files changed.
No browser or live fleet interaction occurred.

## Next action

M2 is ready for independent verification only. Do not mark it `DONE` or start
M3 until this repair is accepted independently.
