# Progressive State Memory P4 Response 01

Status: READY_FOR_VERIFY
Date: 2026-10-03

## Scope and capsule contract

P4 adds one isolated browser-compatible module,
`extension/progressive-state-memory-m7-p4.js`, with these boundaries:

- `buildRestartCapsule` always invokes the accepted P3 selector over P2 state;
  it never accepts a caller-authored working set;
- `validateRestartCapsule` enforces the exact RestartCapsuleV1 envelope and
  rejects unknown top-level or nested schema fields;
- `renderRestartCapsule` emits deterministic compact JSON and reports exact
  UTF-8 byte length;
- `parseRestartCapsule` strictly parses and validates the complete serialized
  capsule.

The capsule contains schema and renderer versions, typed project envelope
metadata (`id`, `repositoryPath`, `branch`, `head`), the exact P2/P3
watermark, P3-selected goal/frontier/constraints/tasks/messages/operator
decisions/evidence/artifacts, and each P3 selection reason. `nextAction` is
explicitly `null` with `nextActionGap: "not-encoded-by-p2-p3"`; P4 does not
invent an action from prose, ordering, or frontier summaries.

The output has no accepted-event archive field. Domain facts remain opaque, so
literal text containing `acceptedEvents`, `context_digest`, or `parent_digest`
is preserved without substring heuristics. P4 adds no persistence, runtime,
restart bootstrap, delta/parent, digest/Merkle, hydration, or contradiction
authority.

An explicit positive `maxBytes` budget is enforced after full rendering. A
budget overflow fails closed; mandatory facts are never silently truncated.

## Validation evidence

- Focused P4 tests: 9/9 PASS.
- Combined P1-P4 tests: 37/37 PASS.
- Full extension suite: 316/316 PASS; zero failures, cancellations, or
  skips.
- Tests cover forged P2/P3 input, malformed/truncated JSON, invalid project
  metadata, unknown top-level/nested fields, deterministic rendering,
  parse/render round-trip, exact watermark binding, immutable inputs, literal
  internal-looking domain text, archive-field absence, and explicit byte
  budget overflow.
- P1-P3 regressions: PASS.
- Touched P4 source/test syntax checks: PASS.
- Durable PSM DAG JSON assertions: PASS; P4 is `READY_FOR_VERIFY`, P0-P3 are
  accepted, and P5-P13 remain `PENDING`.
- `git diff --check`: PASS.

## Stop state

P4 is `READY_FOR_VERIFY` for independent inspection. P5 has not started.
No commit, push, merge, deploy, reload, live storage mutation, or runtime
wiring was performed.
