# M7 response 01 — atomic authority cutover candidate

Result: BLOCKED

## Preflight

- Repository HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
- Branch: `main`
- Baseline focused M0–M6: **129/129 pass**
  - M0 6/6
  - M1 10/10
  - M2 10/10
  - M3 14/14
  - M4 24/24
  - M5A 10/10
  - M5B 21/21
  - M6 34/34
- Full `fleet-*` suite: **254/254 pass**
- `node --check model_fleet/extension/background.js`: pass
- `node --check model_fleet/extension/fleet-worker.js`: pass
- `git diff --check`: pass
- No browser, CDP, authenticated session, or `chrome.storage` interaction occurred.

The isolated M3, M4, M5A, M5B, and M6 manifests were reread and current-HEAD
source searches were regenerated before any production edit was considered.

## Exact blocker

The current production runtime is still wholly v1 at the persistence and
authority boundary. `background.js` contains:

- `FLEET_STATE_KEY = 'modelFleetState:v1'` at line 9;
- `freshFleetState()` returning `version: 1` at line 301;
- `normalizeFleetState()` at line 323, which reconstructs distributed legacy
  custody fields;
- `loadFleetState()` reading the v1 storage key at lines 416–418;
- `publicSnapshot()` at line 471, spreading legacy state and projecting
  `worker.status`, top-level `busy`, top-level `heartbeatAt`, and distributed
  worker custody fields;
- `mutateFleet()` at line 549, persisting the v1-shaped state at line 556;
- an additional direct `chrome.storage.local.set()` at line 3103 in heartbeat
  handling.

There is no production `state.assignments` authority path in the current
source. A current-HEAD scan found **380** legacy/storage references in the
production background/worker/control-pane surface. Representative counts were:

| Legacy authority | Occurrences |
|---|---:|
| `worker.status` | 42 |
| `worker.busy` | 23 |
| `worker.heartbeatAt` | 16 |
| `currentTaskId` | 24 |
| `currentMessageId` | 34 |
| `currentAssignmentKind` | 9 |
| `currentAssignmentStartedAt` | 8 |
| `currentControlNoticeIds` | 24 |
| `task.status` | 36 |
| `message.status` | 16 |
| `task.assignmentId` | 10 |
| `message.assignmentId` | 7 |

The high-risk cutover sites remain v1 implementations, including
`chooseDispatches()` (2377), `completeAssignment()` (2833),
`flushWorkerHeartbeats()` (3029), `updateWorkerHeartbeat()` (3118),
`reconcileOnHello()` (3144), `releaseWorkerAssignment()` (3429), and
`stopAndFlushStaleWork()` (3549). They directly mutate the legacy fields rather
than calling one canonical v2 assignment/task/message/worker operation.

Consequently, changing only initialization or storage normalization would
create mixed authority: v2 would exist at the persistence boundary while the
scheduler, heartbeat, completion, recovery, cancellation, snapshot, and UI
writers would continue writing v1 fields. That violates the authoritative M7
requirements and the no-dual-authority rule. No partial production candidate
was created.

## Cutover coverage disposition

The prepared manifests were treated as replacement requirements, not as proof
that production wiring was complete. The following required cutover families
remain unimplemented in production at this HEAD:

- M3: canonical task/message/control reservation, assignment lookup, prompt
  inputs, rollback, and concurrency ownership;
- M4: dispatch attempt/acceptance, heartbeat custody, completion handoff and
  acknowledgment, recovery, cancellation, automatic recovery, and flush;
- M5A: phase-only task/message lifecycle, dependency/runnable checks, protocol
  repair, goal frontier/quiescence, retry, and queued-message cancellation;
- M5B: runtime heartbeat authority, typed faults, availability, scheduler
  eligibility, rotation/recovery intents, and lifecycle projection;
- M6: v2 allowlisted public snapshot, control-pane view models, dynamic
  heartbeat view deltas, diagnostics, role contracts, queue metrics, and UI
  source replacement.

No M7 production wiring manifest can truthfully mark these entries as replaced
until the corresponding current source readers and writers are changed as one
atomic candidate. No M7 focused test file was added because a test-only M7
artifact would falsely imply that the production authority cutover existed.

## Migration and atomicity status

The isolated M2 codec remains test-only and is not imported by production.
The required production load boundary has not been changed, so the following
M7 proofs were intentionally not claimed:

- exactly-once v1 migration through the real production storage boundary;
- zero-write behavior for blocked v1 migration;
- fresh v2 initialization;
- v2 load/save/mutate round-trip;
- representative v2 reservation-to-completion flows through production;
- zero legacy fields after production mutations;
- production snapshot/UI and heartbeat transport cutover;
- exact legacy-authority allowlist proving all remaining occurrences are
  migration-only or explicitly non-authoritative.

## Worktree and dependency state

- Tracked production files changed: **none**.
- `background.js`, `fleet-worker.js`, `control-pane.js`, and `manifest.json`
  are byte-for-byte unchanged by this M7 attempt.
- Existing untracked M0–M6 artifacts were preserved.
- The only file changed for this turn is the authoritative plan ledger, which
  now records M0–M6 as `DONE` and M7 as `ACTIVE`; M8 and M9 remain `TODO`.
- Dependency files changed: **none**.
- No commit or push was performed.

## Final status

M7 is **BLOCKED**, not `VERIFY`. The candidate failed closed before any
production edit because the current v1 production writers/readers cannot be
partially replaced without violating the required single canonical cutover.
M9 live proof was not started and no live state was touched.
