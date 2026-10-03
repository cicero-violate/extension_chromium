# Progressive State Memory P4 Response 03

Status: READY_FOR_VERIFY
Date: 2026-10-03

## Repair

P4 parsing now binds every selected wrapper ID to its typed fact identity:

- goal and frontier use the canonical wrapper IDs `goal` and `frontier`;
- constraints, tasks, messages, operator decisions, evidence, and artifacts
  use their corresponding typed fact IDs;
- every selected collection rejects duplicate wrapper IDs.

These identity checks run before dependency, decision, or evidence relation
checks. Dependency closure therefore requires the wrapper-bound parent task to
list the wrapper-bound dependency. Decision/evidence relation checks resolve
only against wrapper-bound selected entities.

The capsule continues to use exact nested P2 fact schemas, exact P3 reason
codes, structural archive rejection, literal domain-text preservation,
deterministic rendering, watermark binding, UTF-8 sizing, hard-budget
fail-closed behavior, and immutable P2/P3-derived input.

## Validation evidence

- Focused P4: 12/12 PASS.
- Combined P1-P4: 40/40 PASS.
- Full extension suite: 325/325 PASS; zero failures, cancellations, or
  skips.
- Parser mismatch probes: PASS for goal, frontier, constraint, task, message,
  operator decision, and evidence wrappers.
- Task identity mismatch with no decision/evidence targeting that task: PASS;
  identity validation rejects it directly.
- Duplicate selected IDs: PASS.
- Nested archive, reason-forgery, literal-text, round-trip, byte-budget,
  watermark, immutability, and P2/P3 forged-state probes: PASS.
- Syntax checks for P1-P4 modules/tests: PASS.
- Durable PSM DAG JSON assertions: PASS; P4 is `READY_FOR_VERIFY`, P0-P3 are
  accepted, and P5-P13 remain `PENDING`.
- `git diff --check`: PASS.

## Stop state

P4 is `READY_FOR_VERIFY` for independent inspection. P5 has not started.
No runtime/background/persistence wiring, live storage mutation, reload,
commit, push, merge, or deploy was performed.
