# Progressive State Memory P2 — Canonical State Reducer / State Graph

Status: READY_FOR_VERIFY
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
P0: DONE_ACCEPTED
P1: DONE_ACCEPTED
P2: READY_FOR_VERIFY
P3-P13: PENDING

## Scope and isolation

P2 adds one isolated browser-compatible reducer and one focused adversarial
test file:

* `extension/progressive-state-memory-m7-p2.js`
* `extension/tests/progressive-state-memory-p2.test.cjs`

The reducer depends on the accepted `ProgressiveStateMemoryM7P1` global and
reuses `P1.validateLedger`; it does not duplicate the P1 ledger authority or
wire into `background.js`. No runtime, live storage, reload, commit, push,
merge, or deployment action was performed. P3 was not started.

## CanonicalStateV1

The pure reducer returns one deterministic state shape:

```text
{
  schemaVersion: 1,
  reducerVersion: 1,
  goal: GoalFact | null,
  frontier: FrontierFact | null,
  tasks: { taskId: TaskFact },
  constraints: { constraintId: ConstraintFact },
  artifacts: { artifactId: ArtifactFact },
  evidence: { evidenceId: EvidenceFact },
  messages: { messageId: MessageFact },
  operatorDecisions: { decisionId: DecisionFact },
  provenance: {
    watermark: { sequence, eventId, at },
    acceptedEvents: { eventId: admitted P1 event }
  }
}
```

Every current fact carries `establishedBy` with the establishing event ID,
sequence, explicit time, source, provenance, supersession reference, and
conflict references. The complete admitted-event index preserves the source
history needed for deterministic single-event validation and explanation;
P2 does not resolve conflicts or apply P7 contradiction policy.

## Semantic admission and reduction

`reduceLedger` first calls the accepted P1 ledger validator, then applies the
strict P2 payload contract for every event before changing the projection.
`reduceEvent` revalidates the existing admitted history plus the candidate
through P1, requires the next watermark sequence, validates the semantic
payload, and returns a cloned next state. Inputs and prior state are not
mutated.

Contracts cover all accepted P1 kinds:

* goal/frontier current-value replacement;
* task acceptance, blocking, and completion with established-task guards;
* accepted message identity, endpoints, body, and phase;
* accepted constraint, artifact, and evidence identity/digest facts;
* operator decisions with bounded target types.

Unknown fields, invalid identifiers, invalid phases/states, missing required
fields, invalid digests, unknown task transitions, unvalidated/out-of-order
events, and malformed canonical state fail closed. Stream-order replacement
is deterministic. Supersession and conflict metadata are retained verbatim in
the provenance index and establishing facts; no later contradiction policy is
implemented.

## Explicit non-scope

P2 does not select an active working set, render capsules, compact deltas,
compute Merkle/content-addressed provenance, resolve contradictions, hydrate
evidence, bootstrap restart state, or connect to the background/service
worker. It creates no second fleet-state authority and writes no storage.

## Validation

```text
node --test extension/tests/progressive-state-memory-p2.test.cjs
7/7 PASS, 0 failed, 0 skipped

node --test extension/tests/progressive-state-memory-p1.test.cjs \
  extension/tests/progressive-state-memory-p2.test.cjs
21/21 PASS, 0 failed, 0 skipped

node --test extension/tests/*.test.cjs
300/300 PASS, 0 failed, 0 skipped

node --check extension/progressive-state-memory-m7-p2.js
node --check extension/tests/progressive-state-memory-p2.test.cjs
PASS

durable PSM JSON and P0/P1/P2/P3 status assertions
PASS

git diff --check
PASS
```

Focused adversarial coverage includes semantic payload rejection, equivalent
replay determinism, immutable input/state behavior, unvalidated and
out-of-order rejection, current-value replacement, task transition guards,
supersession/conflict retention, watermark correctness, and later-node/source
isolation checks.

## Durable stopping state

`progressive-state-memory-dag.json` records top-level `READY_FOR_VERIFY`, P0
and P1 `DONE_ACCEPTED`, P2 `READY_FOR_VERIFY`, and P3-P13 `PENDING`. Independent
verification is required; this is not self-acceptance.

P2 stops at **READY_FOR_VERIFY**.
