# M2 response 01

## Result

M2 is `READY_FOR_VERIFY`. M0 and M1 are recorded as `DONE`; M2 is recorded as
`VERIFY`; M3 remains `TODO`. No production behavior, storage path, browser, or
live fleet state was changed.

## Scope and worktree

Before this turn, HEAD was unchanged at `02183c4668c214e2a130747ab9b9820b6272cd43`.
The pre-existing untracked artifacts were preserved:

- `model_fleet/extension/.#STATE_MODEL_CLEANUP_TODO.md`
- `model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md`
- `model_fleet/extension/fleet-state-model-m1.cjs`
- `model_fleet/extension/tests/fleet-state-model-m0.test.cjs`
- `model_fleet/extension/tests/fleet-state-model-m1.test.cjs`

Added/updated for this turn:

- `model_fleet/extension/fleet-state-model-m2.cjs`
- `model_fleet/extension/tests/fleet-state-model-m2.test.cjs`
- `model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md`
- this report

After validation, `git status --short` contains only those untracked plan/model/
test/report artifacts; no tracked files are modified, no files are staged, and
HEAD is unchanged. No dependency files changed.

## APIs and deterministic diagnostics

`fleet-state-model-m2.cjs` exports:

- `canMigrateV1ToV2({ state, liveHeartbeats, pendingCompletionHandoff })`
- `migrateFleetStateV1ToV2({ state, liveHeartbeats, pendingCompletionHandoff })`
- `normalizeV2FleetState(state)`
- canonical v1 status lists for task and message validation.

The gate returns `{ allowed, reason }` and fails closed with these reasons:

`not-v1-state`, `pending-completion-handoff`, `rotation-in-progress`,
`rotation-pending`, `orphaned-worker-assignment-kind`,
`stale-worker-assignment-start`, `active-worker-custody`,
`reported-active-custody`, `unknown-task-status`, `active-task-state`,
`pending-task-custody`, `unknown-message-status`, `active-message-state`,
`queued-message-custody`, and `delivered-operator-assignment`.

Migration rejection throws an error with code `M2_MIGRATION_BLOCKED` and the
same deterministic `reason`; cloning occurs only after the gate succeeds, so
rejection cannot produce partial output.

## v1 -> v2 mapping

| v1 input | v2 candidate | Rule |
|---|---|---|
| `version: 1` | `version: 2` | v1 entrypoint accepts v1 only |
| no assignment map | `assignments: {}` | no active custody reconstruction |
| `task.status` | `task.phase` | canonical statuses only; remove `status` |
| terminal task `assignmentId` | absent | strip historical custody; preserve `assignedWorkerId` |
| task metadata | unchanged | preserve IDs, dependencies, result, notes, history, and unknown non-authority fields |
| `message.status` | `message.phase` | canonical statuses only; remove `status` |
| message `assignmentId` | absent | strip historical custody; preserve routing/repair metadata |
| operator `delivered` | `phase: delivered` | preserve semantics and routing |
| worker `currentAssignmentId` | `null` | quiescent input only; no assignment reconstruction |
| worker custody fields | absent | strip `currentAssignmentKind`, `currentAssignmentStartedAt`, `currentTaskId`, `currentMessageId`, `currentMessageIds`, and `currentControlNoticeIds` |
| worker runtime/non-custody fields | unchanged | preserve `status`, `lifecycle`, `busy`, `heartbeatAt`, identity, role, topology, tab/window, inbox, rotation/chat metadata, diagnostics, and unknown fields |
| top-level state | unchanged except version/assignments | preserve goal, policy, topology, generation, journal, role activity, counters, and unknown fields |

Terminal historical assignment references are allowed as migration input and are
stripped. Active custody, running work, dangling pending/queued custody,
rotation in progress/pending, and pending completion handoff are never
reconstructed.

## M2/M5B boundary and invariant proof

M2 intentionally does not convert worker runtime/fault/availability authority.
The isolated candidate preserves legacy worker `status`, `lifecycle`, `busy`,
and `heartbeatAt` for M5B. M5B owns the later pure runtime/fault/availability
conversion contract; M7 will compose the prepared transformations for the one
production cutover.

After mapping, M2 calls M1 `assertFleetInvariants()` and requires an empty
assignment map. The tests cover pending DAG preservation, terminal task/message
history, operator delivery, cancelled tasks, worker custody stripping, and
preserved non-custody worker data. Every accepted M0 fixture category in the
M2 matrix migrates; every M0 rejection category remains rejected with its
expected diagnostic.

## Idempotence and isolation

`migrateFleetStateV1ToV2` rejects version 2 input rather than silently treating
it as v1. `normalizeV2FleetState` accepts version 2 only, validates through the
M1 invariant engine, clones without mutation, and is structurally idempotent:
normalizing a candidate twice equals normalizing it once.

Source scans and a focused test prove that production `background.js`,
`fleet-worker.js`, `control-pane.js`, and `manifest.json` do not import or load
the M2 module. The M2 module contains no browser API access. No production
source imports M2, and no storage write was performed.

## Validation

- `rtk node --test model_fleet/extension/tests/fleet-state-model-m2.test.cjs` — **7/7 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m1.test.cjs` — **10/10 pass**
- `rtk node --test model_fleet/extension/tests/fleet-state-model-m0.test.cjs` — **6/6 pass**
- `rtk node --test model_fleet/extension/tests/fleet-*.test.cjs` — **148/148 pass**
- `rtk node --check model_fleet/extension/fleet-state-model-m2.cjs` — pass
- `rtk node --check model_fleet/extension/background.js` — pass
- `rtk node --check model_fleet/extension/fleet-worker.js` — pass
- `rtk git diff --check` — pass
- production import/load scan — pass; no M2 reference found
- M2 browser-API scan — pass; no `chrome.` access found

## Acceptance and next action

M2 implementation acceptance criteria are met for independent verification.
M2 remains `VERIFY`, not `DONE`, as required. No blocker was found. The next
authorized action is independent review of this report and the isolated M2
codec/tests; M3 must remain `TODO` until M2 is independently accepted.
