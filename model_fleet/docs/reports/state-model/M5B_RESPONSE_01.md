# M5B response

## Scope and result

Assigned scope: M5B — isolated worker runtime, fault, availability, and M7
reader/writer preparation. M6 and M7 were not started.

Result: READY_FOR_VERIFY.

M5A was promoted to DONE in the ledger. M5B is recorded as VERIFY. M6 and
later nodes remain TODO. No production runtime, storage, browser, or fleet
state was changed.

## Repository state

Before:

- HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
- branch: `main`
- existing worktree consisted of the isolated M0–M5A artifacts and the
  pre-existing untracked `.#STATE_MODEL_CLEANUP_TODO.md` / TODO artifacts.
- no tracked production source changes were present.

After:

- HEAD unchanged: `02183c4668c214e2a130747ab9b9820b6272cd43`
- branch unchanged: `main`
- added isolated M5B module and focused test:
  - `model_fleet/extension/fleet-state-model-m5b.cjs`
  - `model_fleet/extension/tests/fleet-state-model-m5b.test.cjs`
- updated only the M5B ledger status and current next-action wording in
  `model_fleet/docs/architecture/STATE_MODEL_CLEANUP_TODO.md`.
- remaining worktree entries are the expected untracked M0–M5B planning,
  pure-module, and test artifacts plus the existing temporary TODO lock file;
  no dependency files changed.

## Public APIs

The isolated M5B module exposes:

- `convertV2WorkerRuntime(state)` — one-time v2 worker runtime/fault conversion;
- `deriveWorkerAvailabilityV2(state, workerId, { now, heartbeatMaxAgeMs })`;
- `workerDispatchEligibilityV2(state, workerId, { now, heartbeatMaxAgeMs })`;
- `applyHeartbeatObservationV2(state, observation)`;
- typed fault adapters for dispatch failure, heartbeat mismatch, rotation
  failure, and validated M4 fault intents;
- path-specific fault clearing adapters;
- `workerLifecycleProjectionV2(state, workerId)`;
- `M7_WORKER_READER_WRITER_MANIFEST`.

All operations are pure and require explicit timestamps or `now` values.

## Runtime conversion law

`convertV2WorkerRuntime` accepts an M2-valid v2 candidate and converts the
legacy worker runtime fields exactly once:

| Legacy input | M5B target |
|---|---|
| `heartbeatAt` | `runtime.lastHeartbeatAt` |
| `busy` | `runtime.busy` |
| no explicit heartbeat identity | `runtime.reportedAssignmentId = null` |
| `status=blocked` | typed `fault`, using `chat-rotation-failed` for the source-faithful `rotation-failed` lifecycle and `legacy-blocked` otherwise |
| `status` other than blocked | removed as availability authority; lifecycle is preserved |

The target removes top-level `status`, `busy`, `heartbeatAt`, and conversion-only
`faultAt`, while preserving lifecycle, rotation, page, tab, diagnostics,
topology, identity, control-inbox, and non-custody metadata. It never infers
reported heartbeat identity from `currentAssignmentId`. Ambiguous dual runtime
authority, contradictory active status without custody evidence, invalid
timestamps/types, identity mismatch, and conflicting fault authority reject
deterministically. Already-converted candidates are structurally stable.

## Availability and scheduler projection

The single public availability function applies this precedence:

1. `offline`: missing/disabled worker, stale/offline lifecycle, unavailable or
   unbound tab;
2. `blocked`: typed fault exists;
3. `running`: canonical assignment pointer exists;
4. `busy`: runtime busy is true and the explicit heartbeat is fresh;
5. `idle`.

Freshness requires a positive heartbeat, `now >= lastHeartbeatAt`, and age no
greater than the explicit configured maximum. Future observations are not
treated as fresh.

Scheduler eligibility is a separate pure projection. It additionally rejects
rotation pending/in progress, page cooldown, warm-idle cooldown, and any active
assignment. `idle` therefore does not itself mean dispatchable.

## Heartbeat observation matrix

Heartbeat observation updates only `runtime` and optional tab metadata:

| Observation | Result |
|---|---|
| identity omitted | preserves prior reported identity |
| explicit null | records null |
| matching non-null | records the exact identity |
| conflicting non-null with canonical assignment | unchanged state, typed custody-mismatch intent |
| no assignment plus non-null identity | records observation only with contradiction/fault intent; never creates custody |
| older timestamp | unchanged stale-observation result |
| same-time exact duplicate | deterministic idempotent success |
| same-time conflict | deterministic rejection |

The adapter never creates, releases, requeues, or overwrites assignments;
M4 remains the custody authority. It therefore preserves M4 activating,
running, completing, and idle-loss composition boundaries.

## Fault laws

Faults use the canonical shape `{ code, message, at, assignmentId }` with
bounded known codes and validated positive timestamps. Dispatch failure is
suppressed when authority is disabled. Heartbeat mismatch and validated M4
contradiction intents become typed faults without changing custody. Rotation
failure becomes `chat-rotation-failed` while preserving rotation lifecycle
facts. Clearing is path-specific: dispatch and heartbeat clears cannot clear a
rotation fault, and a generic heartbeat does not clear unrelated faults.

## Lifecycle equivalence fixtures

Focused fixtures cover idle, fresh/stale busy, running custody, blocked
dispatch, blocked rotation, stale/offline/disabled/unbound workers, manual,
warm-idle, rotating, rotation-pending, and active-custody projection. The
projection preserves manual and warm-idle lifecycle facts, exposes rotation
gates, maps reserved/activating custody to activating, and maps running or
completing custody to running without creating a second lifecycle authority.

## M7 worker manifest and coverage proof

`M7_WORKER_READER_WRITER_MANIFEST` records current source regions for
normalization, public snapshot/activity, bridge recovery, active-page deferral,
warm-idle, topology, rotation, stale binding, registration, peer routing, goal
continuation, dispatch selection/failure, scheduler gates, completion, heartbeat
flush/reconcile, manual focus, cancellation/release, stop/flush, alarms, and
fleet-worker heartbeat input. Each entry contains source region, legacy
authority, prepared replacement, and atomic M7 cutover action.

The focused manifest test scans current `background.js` authority occurrences
for worker status/busy/heartbeat/lifecycle and rotation/cooldown gates, checks
range coverage, and explicitly classifies the unrelated tab-status occurrence
at line 1193 as non-worker authority. It also requires all manifest fields.

## Isolation proof

- no `background.js`, `fleet-worker.js`, `control-pane.js`, or manifest import or
  load references M5B;
- M5B contains no Chrome API access;
- M5B contains no phase assignment, task/message phase write,
  `currentAssignmentId` write, or assignment-map mutation;
- M5B contains no hidden `Date.now()` source;
- no production source or dependency file changed.

## Tests and commands

Focused M5B:

```text
rtk node --test model_fleet/extension/tests/fleet-state-model-m5b.test.cjs
9/9 passed
```

Combined focused M0–M5B validation:

```text
rtk node --test model_fleet/extension/tests/fleet-state-model-m5b.test.cjs model_fleet/extension/tests/fleet-state-model-m5a.test.cjs model_fleet/extension/tests/fleet-state-model-m4.test.cjs model_fleet/extension/tests/fleet-state-model-m3.test.cjs model_fleet/extension/tests/fleet-state-model-m2.test.cjs model_fleet/extension/tests/fleet-state-model-m1.test.cjs model_fleet/extension/tests/fleet-state-model-m0.test.cjs
83/83 passed
```

Full fleet suite:

```text
rtk node --test model_fleet/extension/tests/fleet-*.test.cjs
208/208 passed
```

Syntax and hygiene:

```text
rtk node --check model_fleet/extension/fleet-state-model-m5b.cjs
rtk node --check model_fleet/extension/background.js
rtk node --check model_fleet/extension/fleet-worker.js
rtk git diff --check
```

All passed.

Isolation scans passed:

```text
rtk rg -n "fleet-state-model-m5b" model_fleet/extension/background.js model_fleet/extension/fleet-worker.js model_fleet/extension/control-pane.js model_fleet/extension/manifest.json
rtk rg -n "\\bchrome\\s*\\." model_fleet/extension/fleet-state-model-m5b.cjs
rtk rg -n "\\.phase\\s*=|currentAssignmentId\\s*=|assignments\\s*\\[[^]]+\\]\\s*=|task\\.phase|message\\.phase|Date\\.now" model_fleet/extension/fleet-state-model-m5b.cjs
```

The first three scans returned no matches; all commands exited successfully.

## Risks and acceptance

Remaining risk is intentionally deferred to M6/M7: production wiring, public
snapshot/UI projection, storage authority cutover, live browser proof, and
atomic replacement of legacy readers/writers have not been attempted. M5B is
therefore not DONE and must receive independent verification before M6.

M5B acceptance criteria for this isolated node are met: pure runtime conversion,
single availability authority, heartbeat observation separation, typed fault
mapping, lifecycle equivalence fixtures, manifest coverage, invariant/failure
validation, and production isolation are all covered and green.

Recommended next DAG action: independently verify M5B. If accepted, promote
M5B to DONE and authorize M6; otherwise repair M5B only.

Dependency status: no dependency files changed.
