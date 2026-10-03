# Progressive State Memory / Chat-Restart Context — DAG

Status: READY_FOR_VERIFY — P13 closure candidate; P0-P12 independently accepted
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Durable DAG state: `/workspace/.local/state/model-fleet/progressive-state-memory-dag.json`
Created: 2026-10-03
Baseline repository HEAD: `6ee3bf81a9700c4c3a3b5b00851f911585512248`

## 1. Objective

Design and implement Progressive State Memory (PSM): a durable, event-sourced context system that allows a fresh ChatGPT conversation to recover the exact current project state from a compact verified restart capsule without replaying or narratively summarizing the full prior conversation.

Core pipeline:

```text
Raw conversation/events
  ↓
Typed durable event ledger
  ↓
Canonical state reducer / state graph
  ↓
Active working set
  ↓
Compact restart capsule
  ↓
Delta capsules / compaction
  ↓
Lazy evidence hydration
```

## 2. Authority invariant

```text
conversation is evidence input, not canonical memory;
typed admitted events are durable history;
one canonical reducer determines current state;
restart capsules are derived projections, never a second authority.
```

Narrative summaries must never become authoritative state.

## 3. Required properties

1. Event-sourced, append-only typed event history.
2. Explicit supersession rather than history rewrite.
3. One canonical state reduction path for current goal, frontier, blockers, accepted facts, constraints, artifacts, and next action.
4. Active working-set selection so only currently relevant facts enter restart context.
5. Compact restart capsule, target <= 2,000 tokens in normal operation.
6. Delta checkpoints with periodic compaction into a new base checkpoint.
7. Stable content digests and parent linkage with Git/Merkle-like provenance semantics where practical.
8. First-class contradiction and supersession handling.
9. Lazy evidence hydration by reference/digest rather than report duplication.
10. Memory hierarchy:
    - L0 recent turn buffer;
    - L1 active project state/frontier;
    - L2 durable accepted project knowledge/decisions;
    - L3 complete event archive.
11. Fail closed on malformed, stale, conflicting, missing, or unverifiable context.
12. Live restart proof remains operator-gated.

## 4. Provisional DAG

P0 must audit repository reality and may refine dependency edges while preserving P0-P13 identities and bounded-node execution.

```text
P0  Current-state audit and requirements
 │
 ▼
P1  Typed event model and durable event ledger
 │
 ▼
P2  Canonical state reducer / state graph
 │
 ▼
P3  Active-working-set selection
 │
 ▼
P4  Restart capsule schema + deterministic renderer
 │
 ▼
P5  Delta capsule / parent checkpoint model + compaction
 │
 ▼
P6  Content-addressed / Merkle provenance
 │
 ▼
P7  Supersession and contradiction handling
 │
 ▼
P8  Lazy evidence hydration
 │
 ▼
P9  Restart bootstrap integration
 │
 ▼
P10 Adversarial / stale-context regression matrix
 │
 ▼
P11 Independent source/test verification
 │
 ▼
P12 Operator-gated live restart proof
 │
 ▼
P13 Closure
```

No downstream node may start before all of its prerequisites are independently accepted.

## 4A. P0 audit outcome and dependency refinement

The repository audit confirms that the provisional linear execution order is
safe to retain. It is intentionally a bounded implementation order, not a
claim that every node owns an independent authority. The following existing
contracts are prerequisites that PSM nodes must reuse:

```text
modelFleetState:v2
  ← C1 normalization/schema and C18 persistence adapter
  ← C19 strict post-load/save validation
  ← stateQueue + mutateFleet serialized durable commit boundary
  ← C2-C8 canonical availability, dispatch, recovery, custody, and controls
  ← C16 read-only public/worker/task/message projection
```

The bounded v2 journal and role-activity history remain fleet diagnostics and
bounded operational history. They are not a complete PSM event ledger and
must not be promoted into one by interpretation alone. P1 therefore owns a
new typed PSM admission/ledger boundary, while reusing the existing durable
commit serialization and explicit-time journal conventions. P2 must reduce
admitted PSM events through one reducer and must not write capsule text into
fleet state. P3-P8 remain derived/validated memory layers, and P9 is the
first node allowed to connect a validated capsule to restart bootstrap.

Refined cross-node constraints, without changing the P0-P13 identities or
bounded order:

* P1 consumes authoritative event sources and evidence references; UI
  projections, reports, and prose summaries are never event authority.
* P2 depends on P1 plus the accepted C1/C3-C8 invariants and is the only
  current-state reducer for PSM facts.
* P3 selects from P2 only; P4 renders from P3 and validated references;
  neither may mutate P2 or fleet state.
* P5 compacts only through explicit parent/delta linkage. P6 validates
  content/provenance before P7 can resolve supersession or contradiction.
* P8 may hydrate evidence only after identity/digest/provenance validation;
  hydration cannot silently create an admitted fact.
* P9 may read the validated restart capsule and request normal runtime
  bootstrap, but cannot bypass `stateQueue`, `mutateFleet`, C18/C19, or C4.
* P10-P12 verify the same boundaries; P12 remains operator-gated and no
  live restart is authorized by P0.

## 5. Node contracts

### P0 — Current-state audit and requirements

Status: DONE_ACCEPTED

Purpose:
- audit existing durable fleet state, message/task/event journals, persistence boundaries, existing context/checkpoint mechanisms, state normalization, schema authority, restart/service-worker recovery, report/evidence references, and any context compaction/summarization logic;
- identify mechanisms to reuse rather than duplicate;
- define authority boundaries for event creation, state reduction, capsule generation, capsule validation, evidence hydration, and restart bootstrap;
- finalize the bounded P0-P13 dependency graph;
- define explicit invariants and falsifiers before implementation.

Constraints:
- architecture/audit only;
- no production implementation change unless a tiny architecture-test fixture is genuinely required;
- do not begin P1;
- no commit, push, deploy, extension reload, or live `chrome.storage` mutation.

Required report:
`docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P0_RESPONSE_01.md`

Stop condition:
`READY_FOR_VERIFY`, `REPAIR_REQUIRED`, or `BLOCKED`.

P0 implementation result: no production implementation change. Independent verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P0_INDEPENDENT_VERIFICATION_01.md`. P0 is `DONE_ACCEPTED`; the subsequent P1 implementation phase was then opened.

### P0 authority-boundary map

| Concern | Existing authority to reuse | PSM boundary | Explicit non-authority |
|---|---|---|---|
| Event creation/admission | accepted runtime/operator boundaries and serialized mutation path | P1 typed admission/ledger | UI, reports, prose, raw heartbeat buffers |
| Canonical state reduction | C1/C18/C19 for fleet state; C3-C8 for custody transitions | P2 PSM reducer over admitted events | capsule text and projections |
| Active working set | C2 eligibility and C16 derived views as source facts | P3 deterministic selection | `liveHeartbeats`, UI ordering, journal recency alone |
| Capsule generation | C16 read-only projection conventions | P4 deterministic renderer | public snapshot as restart authority |
| Capsule validation | C1/C19 strict validation and future P4/P6/P7 checks | schema, digest, parent, contradiction gates | unverified summaries or missing evidence |
| Evidence hydration | durable report paths and evidence references | P8 validated lazy lookup | copying report prose into canonical state |
| Restart bootstrap | C18/C19 load/save, `stateQueue`, normal C4 recovery | P9 validated bootstrap integration | direct storage edits, UI recovery, alternate writers |

### P1 — Typed event model and durable event ledger
Status: DONE_ACCEPTED

P1 candidate boundary:

* `extension/progressive-state-memory-m7-p1.js` is the one browser-compatible
  typed-event/ledger module and is not imported by the fleet runtime.
* `admitEvent` validates event identity, strict sequence/time order, known kind,
  source, provenance digest, payload, duplicate/conflict references, and prior
  supersession references before returning an immutable next ledger.
* `appendEvent` is the durable load→admit→save contract over an injected
  storage adapter. It writes only the dedicated PSM ledger key, rejects key
  overrides, and serializes the supported writer model so acknowledged
  concurrent appends are retained; it does not write `modelFleetState:v2`.
* Event-kind/source authority is explicit: report and verification evidence
  cannot author `operator.decision`; payloads are recursively plain JSON only,
  with Date/Map/custom/accessor/cyclic/lossy values rejected.
* deterministic serialization/deserialization validates the complete ledger;
  malformed, unknown, truncated, duplicate, conflicting, or reordered history
  fails closed.
* P2 reduction, fleet-runtime wiring, live persistence, and restart bootstrap
  are explicitly outside this candidate.

Required report:
`docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P1_RESPONSE_02.md`

Repair report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P1_RESPONSE_02.md`.
Independent repair verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P1_INDEPENDENT_VERIFICATION_02.md`.
P1 and P2 are DONE_ACCEPTED. P3 is READY_FOR_VERIFY; P4-P13 remain PENDING.

### P2 — Canonical state reducer / state graph
Status: DONE_ACCEPTED

P2 candidate boundary:

* `extension/progressive-state-memory-m7-p2.js` is the one isolated,
  browser-compatible reducer and depends on the accepted P1 module for ledger
  validation; it is not imported by the fleet runtime.
* `CanonicalStateV1` contains current goal/frontier, task facts and blockers,
  constraints, artifacts, evidence links, messages, operator decisions, and a
  watermark plus admitted-event provenance index.
* Each P1 event kind has a strict semantic payload contract. Structural P1
  admission is followed by P2 validation before any projection change.
* `reduceEvent` and `reduceLedger` are deterministic, immutable, explicit-time
  projections. Current-value replacement is stream-order based; supersession
  and conflict metadata are preserved but not resolved by P2.
* Active-working-set selection, capsules, compaction, Merkle provenance,
  contradiction policy, hydration, restart bootstrap, and runtime wiring are
  outside P2.
* `validateState` rejects unknown canonical fields and requires the supplied
  materialized projection to equal deterministic replay of its own admitted
  event history before `reduceEvent` can extend it.

Required report:
`docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P2_RESPONSE_02.md`

Independent repair verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P2_INDEPENDENT_VERIFICATION_02.md` — DONE_ACCEPTED. P3 is READY_FOR_VERIFY; P4-P13 remain PENDING.

### P3 — Active-working-set selection
Status: DONE_ACCEPTED

P3 candidate boundary:

* `extension/progressive-state-memory-m7-p3.js` is the one isolated,
  browser-compatible, read-only selector over `CanonicalStateV1`; it validates
  through the accepted P2 boundary before selecting anything and is not wired
  into background/runtime persistence.
* The deterministic core includes the current goal/frontier, active
  constraints, all nonterminal tasks including blocked tasks, recursively
  closed task dependencies (including terminal dependencies), and all
  nonterminal messages. Missing or cyclic dependency closure fails closed.
* Operator decisions and evidence require explicit typed target/subject
  relations to selected entities or the representable global goal/frontier.
  P2 artifacts currently expose no typed relation, so P3 excludes them rather
  than inferring relevance from prose or recency.
* Each selected fact carries a machine-readable selection reason and the
  output binds to the exact P2 provenance watermark. The accepted event
  archive is never copied into the working set; output ordering is stable.
* P4 capsule rendering, token budgeting, compaction, hydration, restart
  bootstrap, and runtime wiring are not implemented in this node.

Required report:
`docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P3_RESPONSE_01.md`

Independent repair verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P3_INDEPENDENT_VERIFICATION_02.md` — DONE_ACCEPTED. P4 is READY_FOR_VERIFY; P5-P13 remain PENDING.

### P4 — Restart capsule schema + renderer
Status: DONE_ACCEPTED

P4 candidate boundary:

* `extension/progressive-state-memory-m7-p4.js` is the one isolated,
  browser-compatible capsule builder, validator, parser, and deterministic
  renderer. It derives the payload by invoking the accepted P3 selector over
  P2 state; callers cannot provide an arbitrary working set.
* The exact envelope contains schema/renderer versions, typed project envelope
  metadata, the P2 watermark, P3-selected facts, selection reasons, and an
  explicit `nextAction: null` plus `nextActionGap` because P2/P3 do not encode
  an authoritative next action.
* Validation rejects unknown fields, malformed/truncated JSON, invalid
  metadata, invalid watermark/selection structure, and non-null unverified
  next actions. P2-shaped facts and P3 reason codes/relations are validated
  with exact nested schemas; structural archive fields are rejected while
  ordinary domain text remains opaque and is never scanned for field names.
* Rendering is deterministic compact JSON with explicit UTF-8 byte size and
  fail-closed hard-budget overflow. P4 has no parent/delta, content digest,
  hydration, contradiction, persistence, runtime, or restart-bootstrap logic.
* Capsule wrapper IDs are identity-bound to their typed P2 facts, selected IDs
  are unique within each collection, and dependency/decision/evidence
  relations are checked only after those bindings are proven.
* Each selected fact is bound to its allowed establishing event kind; source
  and provenance kinds reuse the accepted P1 vocabularies and event-source
  policy. The capsule watermark is a lower bound for every selected fact's
  establishing sequence and time, while its event ID may refer to an omitted
  latest event.

Required report:
`docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P4_RESPONSE_06.md`

Independent repair verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P4_INDEPENDENT_VERIFICATION_06.md` — DONE_ACCEPTED. P5 is READY_FOR_VERIFY; P6-P13 remain PENDING.

### P5 — Delta capsule / parent checkpoint model
Status: DONE_ACCEPTED

P5 candidate boundary:

* `extension/progressive-state-memory-m7-p5.js` is the isolated, browser-compatible
  base/delta checkpoint module over validated P4 capsules. It defines strict
  base and delta envelopes, deterministic top-level payload replacement,
  ordered replay, and explicit latest-base compaction.
* Delta generation requires fixed project metadata, exact parent generation and
  watermark binding, strictly advancing sequence, nondecreasing time, and
  rejects identical no-op capsules. Watermark-only deltas remain valid. Base
  and delta generation arithmetic is safe-integer bounded; deltas carry and
  validate the exact P4 project envelope used by their chain.
* P5 has no persistence, runtime wiring, hidden time, content-addressing,
  Merkle, contradiction, hydration, or restart-bootstrap behavior.

Required report:
`docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P5_RESPONSE_02.md`

Independent repair verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P5_INDEPENDENT_VERIFICATION_02.md` — DONE_ACCEPTED. P6 is ACTIVE; P7-P13 remain PENDING.

### P6 — Content-addressed / Merkle provenance
Status: DONE_ACCEPTED

P6 candidate boundary: `extension/progressive-state-memory-m7-p6.js` provides browser-compatible SHA-256 checkpoint, Merkle-node, chain-verification, and compaction-link provenance over P5-validated checkpoints. It has no persistence/runtime wiring and does not implement P7 policy.

Required report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P6_RESPONSE_01.md`

Independent verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P6_INDEPENDENT_VERIFICATION_01.md` — DONE_ACCEPTED. P7 is ACTIVE; P8-P13 remain PENDING.

### P7 — Supersession and contradiction handling
Status: DONE_ACCEPTED

P7 candidate boundary: `extension/progressive-state-memory-m7-p7.js` derives deterministic supersession, conflict, negative-memory, and unresolved-reference indexes only after P6 Merkle verification and P5 replay. The repair enforces observed-prior sequence/time ordering for supersession and conflict references and fixed `goal`/`frontier` fact identities. The unrelated `worker-liveness-recovery.test.cjs` source-substring mismatch remains a separate external validation note if reproduced.

Required report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P7_RESPONSE_02.md`

Independent repair verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P7_INDEPENDENT_VERIFICATION_02.md` — DONE_ACCEPTED. P8 is READY_FOR_VERIFY; P9-P13 remain PENDING.

### P8 — Lazy evidence hydration
Status: DONE_ACCEPTED

Independent repair verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P8_INDEPENDENT_VERIFICATION_02.md` — DONE_ACCEPTED. P9 is ACTIVE; P10-P13 remain PENDING.

### P9 — Restart bootstrap integration
Status: DONE_ACCEPTED

P9 candidate boundary: `extension/progressive-state-memory-m7-p9.js` is an
isolated, browser-compatible offline integration over verified P6 chains,
rebuilt P7 guardrails, and optional source-bound P8 hydrated evidence. It
reconstructs the latest P4 capsule through P5/P6, requires exact caller
project-reality agreement, preserves negative memory and unresolved guards,
rejects invented next actions, and exposes deterministic canonical rendering
with an explicit UTF-8 byte budget. It does not wire runtime/bootstrap,
storage, hydration, or live restart authority.

Required report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P9_RESPONSE_01.md`

Independent verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P9_INDEPENDENT_VERIFICATION_01.md` — DONE_ACCEPTED under final verified HEAD `4ecf9232...`. P10 is ACTIVE; P11-P13 remain PENDING and live restart remains operator-gated.

### P10 — Adversarial / stale-context regression matrix
Status: DONE_ACCEPTED

P10 repair adds versioned P6 continuity-link APIs, typed P7 compaction
continuity receipts, and a distinct P6 compacted-chain-v2 root whose
provenance commits the source tip, compacted base, continuity digest, and
continuity receipt digest. Generation-0 chains retain the ordinary P1-P9
path; generation>0 restart roots require this committed compacted format and
validated continuity. P7/P9 reject a recomputed sidecar whose identity is not
committed by the compacted root. Compaction preserves inherited observed fact
versions, negative memory, unresolved conflicts/references, and the action-gap
bootstrap state across repeated cycles.

Required report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P10_RESPONSE_02.md`

Second repair report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P10_RESPONSE_03.md`

Final independent verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P10_INDEPENDENT_VERIFICATION_03.md` — DONE_ACCEPTED. P11 is ACTIVE; P12-P13 remain PENDING and live restart remains operator-gated.

Independent verification of the prior candidate remains historical:
`docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P10_INDEPENDENT_VERIFICATION_02.md`.
The second repair closes the detached continuity-receipt falsifier with the
committed compacted-chain-v2 provenance root. P10 is READY_FOR_VERIFY;
P11-P13 remain PENDING.

P11-P13 remain PENDING. No runtime/live-state work was performed.

### P11 — Independent source/test verification
Status: DONE_ACCEPTED

Independent source/test verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P11_RESPONSE_01.md` — DONE_ACCEPTED. P12 is independently DONE_ACCEPTED after its explicit action-authority repair and generation-3975 quiescent proof.

### P12 — Operator-gated live restart proof
Status: DONE_ACCEPTED

P12 used the one explicitly authorized canonical reload and then performed
read-only live inspection. The final accepted read-only proof at generation
`3975` showed `running assignments=[]`, `busy workers=[]`, and
`running messages=[]`; no intervention was used to obtain quiescence. The
canonical extension identity and the exact 19-entry P11 custody remained
verified, and no additional reload occurred.

P9 deliberately remains `nextAction: null` /
`not-encoded-by-p2-p3`. P12 adds a separate typed operator action-authority
sidecar; it does not infer or execute an action. P9 alone is therefore a
structural action gap, while P9 plus a valid P12 authorization is
`restart-ready-explicit-action`.

Required repair report:
`docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P12_RESPONSE_03.md`



Earlier P12 repair reports and independent blockers remain historical lineage only; they are superseded by `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P12_INDEPENDENT_VERIFICATION_04.md` — DONE_ACCEPTED.


The intermediate P12 repair reports and temporary live-custody blocker are
historical evidence; no stale status is authoritative after the final
independent acceptance above.

### P13 — Closure
Status: DONE_ACCEPTED

Required report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P13_RESPONSE_01.md`


Final independent verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P13_INDEPENDENT_VERIFICATION_01.md` — DONE_ACCEPTED. P0-P13 are complete; there is no downstream node. Final 21-entry source/test manifest and all regression/isolation gates independently passed.

## 10. P0 current-state findings

* The fleet authority is the v2 record at storage key
  `modelFleetState:v2`, validated at the C18/C19 load/save boundary. The v1
  key remains migration/compatibility input only; it is not a PSM authority.
* `stateQueue` and the C18 `mutateFleet` wrapper serialize load, mutation,
  normalization, save, generation/update time, and snapshot broadcast. PSM
  durable writes must reuse this boundary or an explicitly equivalent single
  queue; they must not add a competing writer.
* C1 owns v2 shape, phases, assignment invariants, and fail-closed
  quiescent migration gates. C2 owns availability/eligibility. C3 owns
  dispatch custody transitions. C4 owns heartbeat/recovery reconciliation and
  typed fault clearing. C5-C8 own completion/cancellation/authority/control
  transitions. PSM must treat these as existing domain authorities.
* The embedded `journal` is bounded to the most recent 250 valid entries and
  `roleActivity` is retention-bounded (24 hours / 8,000 samples). They are
  useful operational evidence and seed inputs, but cannot satisfy an
  append-only complete PSM history requirement without a new typed ledger.
* `generation` and `updatedAt` identify durable mutation progression but are
  not content digests, parent links, or restart capsules. `lastGoalContinuationKey`
  is a frontier deduplication key, not a general checkpoint mechanism.
* `liveHeartbeats` and session-storage tab/bridge state are ephemeral
  observations/recovery aids. They cannot become canonical memory or prove
  custody without the existing C4/C1 identity and timeline gates.
* C16 snapshots, heartbeat deltas, control-pane state, and worker-page DOM
  observations are projections/evidence only. They must never be fed back as
  writable PSM state without typed admission and reduction.
* The repository contains no dedicated capsule, checkpoint, content-addressed
  memory, contradiction ledger, or context-compaction implementation. The
  historical reports under `docs/reports/state-model/` are durable evidence
  references, not runtime inputs or canonical state.

## 11. P0 invariants and falsifiers

The existing provisional invariants remain, with these repository-specific
falsifiers added before P1:

1. A PSM writer bypasses the one serialized durable mutation boundary or
   introduces a second current-state store.
2. A PSM event is admitted from a projection, report, prose summary, or raw
   heartbeat without typed identity/evidence validation.
3. A PSM reducer reads a capsule or UI snapshot as authority, or a capsule
   write changes `modelFleetState:v2` without a normal runtime mutation.
4. PSM treats the bounded fleet journal as a complete append-only ledger and
   silently loses events beyond its retention bound.
5. A restart capsule is accepted with a missing/invalid parent, digest,
   schema, supersession proof, or required evidence reference.
6. Lazy hydration changes current state without a newly admitted typed event,
   or hydrates a report whose identity/digest no longer matches.
7. Restart bootstrap bypasses C18/C19, C2-C8, C4, or `stateQueue` and creates
   a second recovery/custody authority.
8. Repeated reduce → compact → hydrate → restart cycles change the canonical
   frontier without an external admitted event.

## 6. Provisional invariants

P0 must verify/refine these against repository architecture:

1. One canonical persistence/state authority per concept; no duplicate memory authority.
2. Typed admitted events are append-only history; historical events are never silently rewritten.
3. Canonical state is a reducer projection, not an LLM prose summary.
4. Restart capsules and UI views are derived projections and cannot feed authority back into canonical state.
5. Superseded facts cannot appear as current facts without an explicit later transition.
6. Unknown/conflicting/stale/malformed/unverifiable context fails closed.
7. Evidence references must be identity-stable and validate before authoritative hydration.
8. Equivalent admitted event history must reproduce equivalent canonical state.
9. Repeated delta compaction/restart cycles must preserve semantic state.
10. P12 live mutation/reload/restart proof requires explicit operator authorization.

## 7. Provisional falsifiers

Any of the following falsifies the design until repaired:

- identical accepted event history reduces to different canonical state;
- a derived capsule or prose summary can mutate canonical authority directly;
- a superseded fact is selected as current without a later admissible transition;
- a capsule with invalid digest, invalid parent, malformed schema, or missing required authority evidence is accepted;
- a required evidence reference is absent or changed yet treated as verified;
- compaction drops a state dependency required to choose the same bounded next action;
- repeated compact/restart cycles accumulate semantic drift;
- multiple independent writers can author the same canonical concept without reconciliation;
- a fresh context given an accepted capsule resurrects stale state or chooses a materially different next bounded action absent external state change;
- downstream DAG work starts before prerequisites are independently accepted.

## 8. Restart capsule target

```yaml
context_version: ...
context_digest: ...
parent_digest: ...

project:
  id: ...
  repository: ...
  branch: ...
  head: ...

goal: ...
frontier:
  task: ...
  state: ...
  owner: ...
  verifier: ...

accepted: ...
blockers: ...
constraints: ...
artifacts: ...
superseded: ...
next_action: ...
hydration_refs: ...
```

Normal-operation target: <= 2,000 tokens.

## 9. Verification protocol

For each node:
1. reconcile durable DAG state;
2. inspect source/tests/evidence;
3. send Codex exactly one bounded node;
4. require Codex to stop with `READY_FOR_VERIFY`, `REPAIR_REQUIRED`, or `BLOCKED`;
5. independently inspect report and actual source/diff;
6. independently run focused tests, relevant regressions, full suite where appropriate, static/syntax checks, and `git diff --check`;
7. add node-specific adversarial falsifiers;
8. on failure, mark the same node `REPAIR_REQUIRED` and issue only the smallest repair;
9. on pass, write independent verification evidence, mark `DONE_ACCEPTED`, and activate only the next dependency-ready node.

No commit, push, merge, deploy, extension reload, live `chrome.storage` mutation, or operator-gated live proof occurs without explicit authorization.
