# Progressive State Memory P4 Response 02

Status: READY_FOR_VERIFY
Date: 2026-10-03

## Repair

P4 capsule validation now enforces exact nested P2-shaped fact schemas for
goal, frontier, constraint, task, message, artifact, evidence, and operator
decision entries. Establishing provenance, source, and provenance-reference
objects also have exact field/type schemas. Unknown fields such as structural
`acceptedEvents` archives therefore fail closed at any nested fact/provenance
path.

The validator preserves ordinary domain strings literally; it does not scan
goal, task, message, constraint, evidence, or decision text for internal field
names. Text containing `acceptedEvents`, `context_digest`, or `parent_digest`
remains valid.

P3 selection reasons are now constrained to the exact current vocabulary and
relationship contract:

- goal/frontier: `current-goal` / `current-frontier`, no relation;
- constraints: `active-constraint`, no relation;
- tasks: `nonterminal-task`, `blocked-task`, or `dependency-closure`, with
  dependency closure pointing to a selected parent whose dependency list
  contains the selected dependency;
- messages: `nonterminal-message`, no relation;
- decisions/evidence: their exact P3 reason code and matching typed target or
  subject relation to a selected entity;
- artifacts remain empty because current P3 exposes no typed artifact relation.

The builder still derives through P3/P2 first, and no P4 path mutates state or
becomes canonical authority.

## Validation evidence

- Focused P4: 11/11 PASS.
- Combined P1-P4: 39/39 PASS.
- Full extension suite: 318/318 PASS; zero failures, cancellations, or
  skips.
- Nested `acceptedEvents` parser falsifier: PASS for goal, task, message,
  constraint, and evidence facts.
- Selection-code and relation tampering falsifiers: PASS.
- Valid literal internal-looking text, deterministic rendering, parse/render
  round-trip, watermark binding, UTF-8 sizing, hard-budget overflow, forged P2
  rejection, and input immutability: PASS.
- Syntax checks for P1-P4 modules/tests: PASS.
- Durable PSM DAG JSON assertions: PASS; P4 is `READY_FOR_VERIFY`, P0-P3 are
  accepted, and P5-P13 remain `PENDING`.
- `git diff --check`: PASS.

## Stop state

P4 is `READY_FOR_VERIFY` for independent inspection. P5 has not started.
No runtime/background/persistence wiring, live storage mutation, reload,
commit, push, merge, or deploy was performed.
