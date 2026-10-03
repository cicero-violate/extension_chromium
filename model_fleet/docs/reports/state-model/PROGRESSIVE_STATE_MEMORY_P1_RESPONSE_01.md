# Progressive State Memory P1 — Typed Event Model and Durable Event Ledger

Status: READY_FOR_VERIFY
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
P0: DONE_ACCEPTED
P1: READY_FOR_VERIFY
P2-P13: PENDING
Baseline HEAD: `6ee3bf81a9700c4c3a3b5b00851f911585512248`

## Scope and safety boundary

P1 adds one isolated browser-compatible event-ledger module and one focused
test file. It does not import or modify `background.js`, `modelFleetState:v2`,
C1-C19 runtime custody, C16 projection, scheduler behavior, or restart
bootstrap. No live storage was accessed or mutated, and no extension reload,
commit, push, merge, or deployment was performed.

Changed P1 candidate files:

* `extension/progressive-state-memory-m7-p1.js`
* `extension/tests/progressive-state-memory-p1.test.cjs`
* this report, the PSM DAG's P1 contract/status, and external durable P1
  workflow metadata

Existing unrelated dirty runtime/UI files and historical evidence were
preserved.

## Typed event schema

The browser module exposes `ProgressiveStateMemoryM7P1` and defines one
validated ledger schema:

```text
LedgerV1 = {
  schemaVersion: 1,
  nextSequence: positive integer,
  headEventId: string | null,
  events: EventV1[]
}

EventV1 = {
  eventId: stable identifier,
  sequence: positive integer,
  at: positive integer,
  kind: known typed event kind,
  source: { kind: known source kind, id: stable identifier },
  provenance: [{ kind, ref, digest: sha256:<64 lowercase hex> }],
  payload: plain JSON object,
  supersedes: prior event ID | null,
  conflictsWith: prior event IDs[]
}
```

The initial bounded event vocabulary is explicit rather than open-ended:
`goal.changed`, `frontier.changed`, `task.accepted`, `task.blocked`,
`task.completed`, `message.accepted`, `constraint.accepted`,
`artifact.accepted`, `evidence.linked`, and `operator.decision`. Source kinds
are `runtime`, `operator`, `verification`, `report`, and `system`.

The module requires an explicit event ID, sequence, timestamp, source, at least
one provenance reference with a SHA-256 digest, and a JSON object payload. It
does not use hidden time, generated IDs, ambient globals, `chrome`, or
CommonJS.

## Admission and append-only semantics

`admitEvent(ledger, input)` is the pure admission boundary. It validates the
existing ledger, returns an immutable next ledger and admitted event, and does
not mutate either input. It fails closed for:

* malformed ledger/event structure or unknown fields;
* unknown event kind, source kind, or malformed identifiers;
* missing/invalid provenance or digest;
* non-object/unserializable payload;
* duplicate event IDs;
* duplicate or out-of-order sequence numbers;
* timestamp regression relative to the previous event;
* unknown/duplicate/self conflict references;
* missing, self, or non-prior supersession references;
* invalid ledger sequence or head identity.

`appendEvent(storage, input, key)` is the single durable load→admit→save
contract. It uses only the injected storage adapter and the dedicated
`modelFleetPsmLedger:v1` key by default. `saveLedger` validates and stores a
deterministic serialized ledger; `loadLedger` accepts only a validated object
or deterministic serialized form. The adapter does not touch
`modelFleetState:v2` or any fleet key.

The durable append helper is deliberately not wired into the service worker in
P1. Future runtime integration must serialize it through the already accepted
`stateQueue`/C18 mutation boundary. P1 therefore defines the persistence
contract without creating a second runtime writer or a reducer.

## Authority boundaries preserved

* Event admission is owned only by P1's typed boundary.
* Current PSM state reduction remains P2 and was not implemented.
* Capsules, active working sets, hydration, contradiction resolution, and
  restart bootstrap remain later nodes.
* Fleet state, worker availability, assignment custody, fault clearing,
  scheduler reservation, completion, and recovery remain C1-C8/C18/C19
  authorities.
* Reports, UI projections, worker DOM observations, and the bounded fleet
  journal remain non-authoritative evidence/projections.

## Focused adversarial coverage

`extension/tests/progressive-state-memory-p1.test.cjs` covers:

1. browser compatibility and absence of `require`, CommonJS exports, and
   `chrome` dependencies;
2. immutable ordered admission;
3. duplicate ID/sequence and conflict-reference rejection;
4. unknown kind, invalid source, malformed provenance, and malformed payload;
5. prior/self/missing supersession validation;
6. ledger head, sequence, unknown-field, and timestamp-order validation;
7. deterministic serialization and validated round-trip;
8. injected-storage key isolation and malformed persisted-history rejection;
9. stable repository/report provenance references and rejection of lossy
   payload values;
10. the single durable append load→admit→save contract.

## Validation

```text
node --test extension/tests/progressive-state-memory-p1.test.cjs
11/11 PASS, 0 failed, 0 skipped

node --test extension/tests/*.test.cjs
290/290 PASS, 0 failed, 0 skipped

node --check extension/progressive-state-memory-m7-p1.js                 PASS
git diff --check                                                       PASS
PSM durable JSON parse and P0/P1/P2 status assertions                  PASS
```

The accepted P0 baseline was 277/277. The candidate suite count recorded by
this first response was 290/290; the stale 289/289 figure previously shown in
this paragraph was a reporting error. No existing fleet regression was
changed or skipped by P1.

## Durable workflow state and stopping condition

The durable PSM state records `current_node: P1`, top-level
`status: READY_FOR_VERIFY`, P0 `DONE_ACCEPTED`, P1 `READY_FOR_VERIFY`, and
P2-P13 `PENDING`. `P2` remains explicitly unstarted. Live restart remains
unauthorized.

P1 stops at **READY_FOR_VERIFY** for independent inspection. It is not
self-accepted.
