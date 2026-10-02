# M7 C1 response 01 — persistence/migration/runtime-state foundation

Result: READY_FOR_VERIFY (C1 only)

M7 remains ACTIVE. This slice does not claim M7 VERIFY.

## Candidate identity and scope

- Candidate worktree: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`
- Candidate HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
- Scope completed: C1 persistence/migration/runtime-state foundation only.
- Scheduler, reservation, heartbeat, completion, recovery, UI, and control-pane
  consumers remain C2+ work and were not converted in this slice.
- No browser/CDP interaction, extension reload, authenticated state access, or
  chrome.storage access occurred.
- No commit, push, or dependency change occurred.

## Candidate files changed

1. `extension/background.js`
   - adds a bottom-of-file inert `importScripts('fleet-state-model-m7-c1.js')`;
   - existing v1 scheduler/mutator call sites remain untouched.
2. `extension/fleet-state-model-m7-c1.js`
   - browser-compatible plain-script C1 boundary; no CommonJS or dependencies.
3. `extension/tests/fleet-state-model-m7-c1.test.cjs`
   - mock-storage and migration-boundary tests.

The copied M0–M6 artifacts and authoritative TODO were preserved. The candidate
TODO ledger remains M0–M6 `DONE`, M7 `ACTIVE`, M8/M9 `TODO`.

## Exact C1 persistence contract

The explicit keys are:

- migration source: `modelFleetState:v1`;
- canonical C1 target: `modelFleetState:v2`.

The C1 browser API is exposed as `globalThis.ModelFleetStateM7C1`:

- `freshFleetStateV2({ createdAt })` creates `version: 2` with
  `assignments: {}` and v2-shaped workers/tasks/messages collections;
- `canMigrateV1ToV2({ state, liveHeartbeats, pendingCompletionHandoff })`
  requires explicit in-memory migration evidence and applies the accepted M0
  quiescence rules;
- `migrateFleetStateV1ToV2(...)` clones before mapping status to phase,
  strips M2-owned legacy custody fields, creates an empty assignment map, and
  validates the v2 candidate;
- `normalizeV2FleetState(state)` requires exact numeric version 2, v2 map/list
  shapes, canonical task/message phases, and rejects the listed legacy fields;
- `loadFleetStateV2(storage, evidence)` reads v2 first, normalizes without a
  write, or reads v1 exactly once as migration input and performs one v2 write;
- `saveFleetStateV2(storage, state)` validates/normalizes before the v2 write.

The migration boundary rejects missing `liveHeartbeats`/completion evidence
instead of silently defaulting them. On blocked or malformed v1, migration is
performed before `storage.set`, so the mock boundary records zero writes. On a
successful migration the v2 key becomes sole authority for subsequent loads;
the old v1 key is inert migration input and is not read on the v2 path. C2+
must complete the eventual production storage cleanup/swap policy without
introducing a second writable authority.

## Mock-storage atomicity evidence

The C1 tests prove:

- fresh install writes one v2 record;
- quiescent v1 writes v2 once;
- the second v2 load performs zero migration writes;
- active worker custody, running task, running worker message, live heartbeat
  identity, pending completion handoff, rotating lifecycle, pending rotation,
  orphaned worker markers, and stale assignment-start markers all reject with
  zero writes;
- malformed v1 shapes, unexpected v1 assignments, and contradictory operator
  delivery reject deterministically;
- terminal historical task/message assignment residue migrates and is stripped
  while terminal phases/history and task `assignedWorkerId` are preserved;
- migration exceptions leave the input unchanged and produce zero writes;
- v2 normalization rejects worker `status`, top-level `busy` and
  `heartbeatAt`, distributed current-task/current-message/current-assignment
  markers, task/message `status`, and task/message `assignmentId`;
- a migrated candidate is accepted by the copied M2 normalizer, which invokes
  the copied M1 invariant engine.

## Validation results

- C1 focused: **9/9 pass**
- copied M0–M6 focused suite: **129/129 pass**
- copied full `fleet-*` suite: **263/263 pass**
- `node --check extension/background.js`: pass
- `node --check extension/fleet-worker.js`: pass
- `node --check extension/fleet-state-model-m7-c1.js`: pass
- `git diff --check`: pass
- candidate C1 script has no `require()` or `module.exports`;
  browser-loading test passes.

The full copied suite remains green because C1 leaves the existing scheduler and
mutator behavior unchanged; C1 is intentionally not an end-to-end v2 runtime
cutover.

## Legacy reference partition

### A — C1 migration reader/gate

The new C1 helper confines v1 status/custody names to explicit migration gate
and mapping code. Its v2 validator rejects those names after conversion. The
helper’s legacy references are intentional migration-only inputs and are
covered by the C1 focused tests.

### B — untouched runtime references scheduled for C2+

The existing `background.js` scheduler/mutator remains v1 by design in this
slice. A current candidate scan reports 184 legacy-name occurrences in that
runtime. They remain in the existing `normalizeFleetState`, `loadFleetState`,
`publicSnapshot`, `mutateFleet`, reservation, completion, heartbeat, recovery,
release, and stop/flush paths. They are not claimed as removed. C2+ must
convert them against the M3–M6 manifests.

The existing production persistence boundary still has the original v1
constant and functions; C1 adds the isolated v2 boundary without routing those
consumers yet. This is the deliberate bounded-slice boundary, not a claim of
final M7 completion.

### C — newly removed persistence-boundary references

No existing scheduler/mutator legacy writer was removed in C1. The new v2
boundary introduces no legacy writes and rejects legacy authority in v2 input.
Therefore the count of removed existing runtime references in C1 is **0**;
the removal family is deferred to C2+ rather than papered over with mirroring
or a feature flag.

## Candidate status and next bounded family

Candidate status: **READY_FOR_VERIFY for C1**.

Next bounded family: **C2 — production load/save/mutate switch and fresh-state
v2 wiring**, followed by the scheduler/custody/lifecycle conversion slices from
the M3–M6 manifests. C2 must preserve the one-time migration boundary while
converting every current runtime reader/writer before any deployable or live
claim is made.

## Main checkout protection

The authoritative checkout `/workspace/ai_sandbox/extension_chromium` was
checked after C1. `git diff --quiet` for its tracked production files
(`background.js`, `fleet-worker.js`, `control-pane.js`, and `manifest.json`)
returned exit 0. No authoritative production file was modified by this slice.

