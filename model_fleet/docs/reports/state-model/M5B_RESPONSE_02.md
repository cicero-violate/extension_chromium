# M5B response 02

## Scope and result

Assigned scope: repair M5B only. M6 and M7 were not started.

Result: READY_FOR_VERIFY.

The M5B ledger remains `VERIFY`; M0–M5A remain `DONE`; M6 and M7 remain
`TODO`. No production source, browser, storage, dependency, commit, or push
was changed.

## State before and after

Before:

- HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
- branch: `main`
- M5B was already isolated in `fleet-state-model-m5b.cjs` and its focused test;
  the worktree contained the prior untracked M0–M5A planning/module/test
  artifacts and the temporary TODO lock file.

After:

- HEAD unchanged: `02183c4668c214e2a130747ab9b9820b6272cd43`
- added/changed only isolated M5B module, focused tests, and M5B plan wording;
- no tracked production files or dependency files changed;
- existing unrelated untracked artifacts remain untouched.

## Optional heartbeat metadata presence law

`applyHeartbeatObservationV2` now accepts the whole observation object so
property presence is preserved:

- omitted `title`, `url`, and `windowId` preserve existing metadata;
- empty title/URL preserve existing values, matching the production heartbeat
  flush behavior;
- explicit nonempty title/URL update;
- explicit integer `windowId` updates;
- omitted, null, or non-integer `windowId` preserves the existing value, with a
  supplied non-integer rejected deterministically;
- stale observations update nothing;
- same-time observations with omitted optional metadata are idempotent;
- same-time conflicts are detected only for explicitly supplied differing
  fields.

## Bound-tab and warm-idle availability law

Availability now returns `offline` when a worker is missing, disabled, stale,
offline, explicitly unavailable, or lacks an integer `tabId` unless an
explicit `tabAvailable: true` contract is present. Scheduler eligibility uses
the same online/bound rule.

Warm-idle is retained as a lifecycle/window-retention fact and is not a
dispatch cooldown. A warm-idle worker with otherwise idle, fresh, bound facts
is eligible. `pageBusyUntil` remains the actual page cooldown gate.

## Canonical dispatch-failure policy/runtime law

`applyDispatchFailureFaultV2` no longer treats caller input as policy
authority. It derives blocking solely from normalized state:

```text
block iff worker.enabled !== false
         && state.policy.paused !== true
         && state.policy.authorityEnabled !== false
```

The worker must exist. On every accepted dispatch-failure observation, the
runtime busy bit is reset without changing assignment custody. If policy says
not to block, no fault is created but the runtime reset is still returned as a
source-equivalent effect. Enabled active policy creates the typed
`dispatch-failed` fault using the explicit event time. Disabled, paused, and
authority-disabled cases are covered.

## Heartbeat composition matrix

Heartbeat observation remains observation only and returns an explicit
`m4Reconciliation` input/evidence object. It never creates/releases/requeues
assignments.

| Custody phase/evidence | M5B result |
|---|---|
| no assignment + non-null ID | unchanged custody; observation may be recorded, contradiction/fault intent returned |
| reserved + any non-null ID | unchanged state; `claim-before-acceptance` and M4 contradiction intent; identity is not persisted |
| activating + matching ID | observation recorded with M4 reconciliation evidence |
| running + matching ID | observation recorded with M4 reconciliation evidence |
| completing + matching ID | observation recorded/preserved with M4 reconciliation evidence; no release |
| any active phase + non-null mismatch | unchanged state; structured custody mismatch and M4 evidence |
| explicit null / omitted identity | preserves their previously defined distinction |

The focused tests exercise reserved, activating, running, completing, no-owner,
and mismatch cases.

## Lifecycle, rotation, and cancellation projection law

`workerLifecycleProjectionV2` now applies active custody before future rotation
state:

- reserved/activating assignment -> `activating`;
- running/completing assignment -> `running`;
- explicit cancellation request with active custody -> `cancelling` projection;
- rotation-failed fault/lifecycle with no active assignment -> `rotation-failed`;
- rotating or pending rotation with no active assignment -> `rotating`;
- manual and warm-idle remain preserved without assignment.

`applyRotationFailureFaultV2` returns the M7 intent
`rotation-failed + busy=false + pageBusyUntil=0 + chatRotationPending=true`.
Rotation clearing requires a successful `rotation-complete` proof and returns
the complementary idle/pending-false intent. These are projections/intents;
they do not create a second persisted lifecycle authority.

## Legacy blocked-fault timestamp law

Conversion no longer invents `fault.at = 1`. A legacy blocked worker must have
an explicit valid `faultAt`, a valid source `lastDispatchFailureAt`, or the
caller must supply explicit `conversionAt` as migration-observed time.
Otherwise conversion rejects with `missing-legacy-fault-at:<workerId>`.
The rotation-failed blocked shape follows the same rule.

## Proof-bearing fault clearing

The path-specific clear APIs now require `{ success: true, kind, at }` proof:

- dispatch and heartbeat/M4 faults accept only `matching-heartbeat`,
  `bridge-recovery`, or `m4-recovery`;
- rotation faults accept only `rotation-complete`;
- missing, malformed, or wrong-kind evidence rejects deterministically;
- unrelated fault types remain untouched;
- clearing never changes custody.

No generic fault-clear API is exposed.

## Exact M7 worker manifest corrections

The manifest now records exact current function boundaries for the key worker
sites, including:

- `focusWorker`: `background.js:3407-3428`;
- `releaseWorkerAssignment`: `background.js:3429-3501`;
- `cancelWorkerDispatch`: `background.js:3502-3548`;
- `stopAndFlushStaleWork`: `background.js:3549-3604`;
- `recoverRegisteredWorkerBridge`: `background.js:972-1091`;
- `deferReservedDispatchForActivePage`: `background.js:1092-1146`;
- `beginWarmIdle`: `background.js:1159-1300`;
- `settleWorkerIdle`: `background.js:1301-1372`;
- `rotateWorkerChat`: `background.js:1373-1448`;
- `startPendingChatRotations`: `background.js:1449-1498`;
- `releaseWorkerBinding`: `background.js:1499-1569`;
- `workerMatchRank`: `background.js:1730-1755`;
- `chooseDispatches`: `background.js:2377-2526`;
- `failDispatch`: `background.js:2527-2821`;
- `completeAssignment`: `background.js:2833-3028`;
- `flushWorkerHeartbeats`: `background.js:3029-3117`;
- `updateWorkerHeartbeat`: `background.js:3118-3143`;
- `reconcileOnHello`: `background.js:3144-3406`.

Site-region entries are explicitly labeled `site:` rather than pretending to
name a function. The strengthened test verifies every named function token is
declared within its manifest range, explicitly checks the focus/release/cancel
line anchors, and separately retains broad worker-authority occurrence
coverage. This prevents overlap with an unrelated later range from masking a
stale function label.

## Tests and scans

Focused M5B:

```text
rtk node --test model_fleet/extension/tests/fleet-state-model-m5b.test.cjs
10/10 passed
```

Combined focused M0–M5B:

```text
rtk node --test model_fleet/extension/tests/fleet-state-model-m5b.test.cjs model_fleet/extension/tests/fleet-state-model-m5a.test.cjs model_fleet/extension/tests/fleet-state-model-m4.test.cjs model_fleet/extension/tests/fleet-state-model-m3.test.cjs model_fleet/extension/tests/fleet-state-model-m2.test.cjs model_fleet/extension/tests/fleet-state-model-m1.test.cjs model_fleet/extension/tests/fleet-state-model-m0.test.cjs
84/84 passed
```

Full fleet suite:

```text
rtk node --test model_fleet/extension/tests/fleet-*.test.cjs
209/209 passed
```

Syntax/hygiene:

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
rtk rg --pcre2 -n "\\.phase\\s*=(?!=)|currentAssignmentId\\s*=|assignments\\s*\\[[^]]+\\]\\s*=|task\\.phase\\s*=|message\\.phase\\s*=|Date\\.now" model_fleet/extension/fleet-state-model-m5b.cjs
```

Production import/load, Chrome-API, and custody/task/message mutation scans
returned no matches. No production source or dependency file changed.

## Acceptance and next action

The repaired isolated M5B acceptance criteria are met and all validation is
green. Remaining deferred work is production wiring, M6 projection/UI
preparation, atomic M7 cutover, and live-browser proof; none was attempted.

Recommended next action: independent verification of M5B. If accepted, promote
M5B to DONE and authorize M6. Do not start M6 as part of this repair turn.

Dependency-file status: no dependency files changed.
