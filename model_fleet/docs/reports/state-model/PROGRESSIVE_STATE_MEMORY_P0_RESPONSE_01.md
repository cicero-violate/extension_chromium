# Progressive State Memory P0 — Current-State Audit and Requirements

Status: READY_FOR_VERIFY  
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`  
Baseline HEAD: `6ee3bf81a9700c4c3a3b5b00851f911585512248`  
Audited: `2026-10-03`

## Scope and change boundary

P0 was performed as an architecture audit only. No extension/runtime/state-model
implementation file was changed for PSM, no live storage was read or written,
and no extension reload or deployment was performed. The only P0 candidate
changes are this report, the PSM DAG's explicit audit/refinement sections, and
the external durable P0 workflow metadata. Existing dirty runtime/UI repair and
control-surface evidence was preserved.

Before and after the audit, the repository remained on `main` at
`6ee3bf81a9700c4c3a3b5b00851f911585512248` with the pre-existing intentional
dirty worktree. P1 remains `PENDING`; the durable PSM state is
`READY_FOR_VERIFY`, not accepted.

## 1. Current architecture audit

### Durable fleet state and schema authority

The canonical live fleet record is `modelFleetState:v2`, declared in
`extension/fleet-state-model-m7-c1.js:6-9`. C1 owns v2 phases, legacy-field
rejection, assignment invariants, and the quiescence gate for v1-to-v2
migration (`:338-397`, `:400-425`, `:460-494`). C1's migration policy fails
closed on active worker custody, active task/message phases, live heartbeat
custody, rotation, and pending completion evidence rather than reconstructing
active v1 assignments.

The v1 key, `modelFleetState:v1`, is migration/compatibility input only. C18
reads v2 first, performs one-time v1 migration/fresh-state creation when
needed, and uses the proof-gated legacy worker-runtime repair only when valid
repair evidence is supplied (`extension/fleet-state-model-m7-c18.js:46-123`).
C19 then asserts the v2 state at the runtime load/save boundary
(`extension/background.js:6397-6414`). This is the existing schema/storage
authority that PSM must reuse; PSM must not create a second fleet-state store.

### Persistence and serialized mutation boundary

The original background authority defines `stateQueue` and the legacy
`mutateFleet` boundary (`extension/background.js:148`, `:549-561`). The final
C18 wrapper captures the queued operation, loads through C18, runs the
mutator, records role activity, advances generation/update time, saves through
C18, and broadcasts a projection (`extension/background.js:6379-6395`). PSM
durable writes must use this one serialized commit path or an explicitly
integrated equivalent; a capsule or memory writer must not race it or write
directly to `chrome.storage.local`.

`generation` and `updatedAt` are mutation progression facts. They are not
content digests, parent checkpoint links, or restart capsules.

### Journals and history

The canonical v2 record contains a bounded `journal` and `roleActivity`.
C1 declares `MAX_JOURNAL = 250`, `MAX_ROLE_ACTIVITY_SAMPLES = 8000`, and a
24-hour role-activity retention window (`fleet-state-model-m7-c1.js:26-29`).
C16 projects valid journal rows and recent role-activity samples for display
(`fleet-state-model-m7-c16.js:47-52`). The journal is therefore useful
operational evidence and a seed/source of facts, but it is not a complete
append-only PSM event archive. P1 must not silently treat records evicted by
that bound as recoverable history.

`lastGoalContinuationKey` is a bounded frontier deduplication key used by the
existing goal-continuation scheduler. It is not a general checkpoint or
context-memory mechanism.

### Custody, reduction, and recovery authorities

The accepted C2-C8 modules remain the domain authorities that PSM must observe,
not replace:

| Concern | Existing authority | PSM reuse rule |
|---|---|---|
| availability/eligibility | C2 worker availability and scheduler eligibility | derive working-set facts from C2-compatible canonical facts |
| dispatch timeline/custody | C3 reserve, attempt, accept, release, failure | do not infer active work from prose or UI |
| heartbeat/recovery/fault clearing | C4 typed reconciliation and `clearFaultWithEvidence` | restart bootstrap must pass through C4; no capsule/UI clearing |
| completion/cancellation/control | C5-C8 | preserve their custody and fail-closed gates |
| persistence | C1/C18/C19 plus `stateQueue`/`mutateFleet` | one canonical write path |

`liveHeartbeats` is an in-memory observation buffer. Session storage contains
ephemeral tab/bridge state. Neither is canonical memory, and neither can prove
custody without the existing identity/timeline gates.

### Projection and worker-page evidence

C16 is explicitly read-only. `projectPublicSnapshotV2`, worker/task/message
projections, diagnostics, role counts, queue diagnostics, and heartbeat deltas
all derive from normalized v2 state and explicit observation time
(`fleet-state-model-m7-c16.js:45-52`). Control-pane snapshots, heartbeat
deltas, worker-page DOM observations, and bridge observations are projections or
evidence. They cannot write PSM current state or become a second authority.

The worker page has assignment-bound recovery evidence, including exact prompt
proof and current-turn observation. It is an evidence producer, not a custody
owner. The accepted C4 hello/bridge paths remain the only route to typed
recovery and fault clearing.

### Restart/service-worker recovery

Background startup invokes the existing registered-worker/bridge recovery path;
the path writes recovery hints, reinjects/contacts the worker, reconciles
durable custody, and schedules only after recovery attempts. C4 hello and bridge
recovery preserve exact assignment identity and fail closed when proof is absent.
This is the mechanism P9 must integrate with, rather than introducing a PSM
recovery writer or a direct assignment repair path.

### Reports, evidence, and context compaction

`docs/reports/state-model/` contains implementation and independent-verification
reports. They are durable historical evidence references, not runtime inputs or
canonical state. No dedicated PSM capsule, checkpoint, content-addressed
memory, contradiction ledger, lazy hydration, or context-compaction subsystem
exists in the repository today. The closest reusable mechanisms are:

* bounded v2 journal and role activity history;
* generation/update timestamps;
* goal-continuation frontier deduplication;
* C18 strict/repair load coalescing and C19 validation;
* serialized `stateQueue`/`mutateFleet` commits;
* C16 deterministic read-only projections;
* report paths and evidence references;
* explicit DAG durable JSON for workflow orchestration only.

These are inputs and boundaries for PSM, not a reason to duplicate their
authority or to promote prose reports into state.

## 2. Reuse versus new PSM components

| PSM requirement | Reuse | New bounded responsibility |
|---|---|---|
| typed event admission | existing explicit-time mutation/journal conventions and runtime evidence boundaries | P1 typed event schema, admission, append-only PSM ledger |
| canonical reduction | C1 normalization and C2-C8 domain invariants as validation inputs | P2 one PSM reducer/state graph |
| active working set | C2 eligibility, C16 projection facts, current goal/frontier fields | P3 deterministic relevance/frontier selector |
| restart capsule | C16 projection discipline and explicit observedAt | P4 deterministic capsule schema/renderer |
| deltas/compaction | `generation` as a mutation marker only; no existing compactor | P5 explicit parent/delta and bounded compaction |
| provenance | report paths and Git evidence references only | P6 stable content digests and parent/provenance validation |
| contradiction/supersession | no existing PSM authority; existing typed fault/recovery records remain domain evidence | P7 explicit supersession/contradiction rules |
| evidence hydration | existing report/evidence paths and worker/bridge proof patterns | P8 identity/digest-checked lazy hydration |
| restart bootstrap | C18/C19 load/save, `stateQueue`, normal C2-C8/C4 paths | P9 validated capsule integration, operator-gated live proof |

The important separation is that PSM may record references to fleet facts, but
must not copy fleet custody into a second mutable memory state. Conversely,
fleet state must not depend on an unvalidated PSM prose capsule to remain safe.

## 3. Required authority boundaries

1. **Event creation/admission — P1.** Only a typed admission boundary may
   create PSM events. Runtime/operator sources and report/evidence references
   enter as typed facts with identity and provenance. UI projections,
   `liveHeartbeats`, reports-as-prose, and capsules cannot self-admit.
2. **Canonical state reduction — P2.** One deterministic reducer consumes the
   admitted ledger. It owns PSM current facts only; it does not replace C1-C8
   fleet custody or write a narrative summary as state.
3. **Active working-set selection — P3.** A deterministic derived selector
   chooses currently relevant facts/frontier from P2. Recency alone is
   insufficient; active custody, blockers, accepted constraints, next action,
   and verified evidence references must be considered.
4. **Capsule generation — P4/P5.** Capsules are immutable derived outputs from
   the reducer/working set. Delta/base linkage is explicit. Capsule generation
   cannot mutate canonical state or fleet storage.
5. **Capsule validation — P4/P6/P7.** Schema, size, parent, digest,
   supersession, contradiction, and required-evidence checks must fail closed.
   A valid capsule is still a projection until restart bootstrap explicitly
   consumes it.
6. **Evidence hydration — P8.** Hydration resolves identity-stable references
   only after digest/provenance validation. Hydrated text can support an
   admission decision but cannot silently change P2.
7. **Restart bootstrap — P9.** Bootstrap validates the capsule, hydrates only
   required evidence, and then uses ordinary runtime load/save/mutation and C4
   recovery boundaries. It cannot bypass C18/C19, `stateQueue`, C2-C8, or
   operator gating.

## 4. Refined dependency graph

The existing P0-P13 linear graph remains the bounded execution order. P0
refines its cross-node contracts as follows:

```text
P1 typed ledger
  -> P2 reducer (must consume accepted P1 events)
  -> P3 active working set
  -> P4 capsule schema/renderer
  -> P5 delta/compaction (explicit parent)
  -> P6 digest/provenance validation
  -> P7 supersession/contradiction resolution
  -> P8 lazy evidence hydration
  -> P9 validated restart bootstrap through existing runtime boundaries
  -> P10 adversarial stale-context matrix
  -> P11 independent source/test verification
  -> P12 operator-gated live restart proof
  -> P13 closure
```

P1-P9 must not create a second fleet-state authority. P10-P13 verify this
constraint rather than relaxing it. P1 remains unstarted by this report.

## 5. Invariants and falsifiers

The following are the P0 acceptance gates for later nodes:

1. One canonical durable authority exists per concept; PSM does not duplicate
   `modelFleetState:v2`, assignment custody, worker availability, or UI state.
2. Typed admitted events are append-only; history is not silently rewritten.
3. Equivalent admitted event histories reduce to equivalent PSM state.
4. Capsules, projections, and prose reports cannot mutate canonical authority.
5. Unknown, malformed, conflicting, stale, or unverifiable events/evidence
   fail closed.
6. A superseded fact cannot be selected as current without an explicit later
   admissible transition.
7. Capsule schema, size, parent, digest, evidence references, and contradiction
   checks are mandatory before acceptance.
8. Hydration is reference/digest checked and cannot create an implicit event.
9. StateQueue/C18/C19 and C2-C8 remain the only runtime persistence/custody
   paths.
10. Reduce/compact/hydrate/restart cycles preserve semantic state absent an
    external admitted event.
11. Bounded journals are not treated as complete archives after retention
    eviction.
12. Live restart/reload proof is operator-gated and is not performed by P0.

Concrete falsifiers include: a second PSM writer; direct capsule-to-storage
mutation; a reducer accepting a UI/report summary; a capsule with invalid
parent/digest or missing authority evidence; hydration of a changed report;
loss of a dependency needed to choose the same next action; stale resurrection
after restart; or any bootstrap path that bypasses C18/C19, `stateQueue`, or
C4.

## 6. Evidence and validation

Source/path evidence inspected:

* `extension/fleet-state-model-m7-c1.js` — v1/v2 keys, phases, strict v2
  shape, quiescent migration, proof-gated repair, normalize/save.
* `extension/fleet-state-model-m7-c18.js` — v2 persistence, mode-aware strict
  versus repair load coalescing, one-time migration and repair boundary.
* `extension/fleet-state-model-m7-c19.js` — post-load/save v2 authority proof.
* `extension/background.js` — state queue, mutation/save boundary, recovery,
  scheduler, C18/C19 binding, and v2 dispatch/projection wrappers.
* `extension/fleet-state-model-m7-c2.js` through `m7-c8.js` — availability,
  dispatch, recovery, custody, completion, cancellation, and authority facts.
* `extension/fleet-state-model-m7-c16.js` — read-only public projections and
  heartbeat delta transport.
* `extension/fleet-worker.js` — assignment-bound DOM/bridge evidence only.
* `docs/reports/state-model/` and accepted architecture DAGs — historical
  evidence, not runtime authority.

Baseline regression executed without implementation changes:

```text
node --test extension/tests/*.test.cjs
277/277 PASS, 0 failed, 0 skipped
```

The P0 metadata changes were then limited to the PSM DAG and durable PSM
workflow JSON. No runtime/state-model test fixture was added.

## 7. Candidate state and stop condition

The durable PSM state now records:

* `status: READY_FOR_VERIFY`;
* `current_node: P0` and P0 `READY_FOR_VERIFY`;
* P1-P13 still `PENDING`;
* `implementation_changed: false`;
* `live_restart_authorized: false`;
* the required report path as `last_response_report`.

`git diff --check` and JSON parsing are required on the final candidate. P0
stops here for independent inspection. It is not self-approved and P1 must not
start until the coordinator independently accepts this report and durable
state.

Final disposition: **READY_FOR_VERIFY**.
