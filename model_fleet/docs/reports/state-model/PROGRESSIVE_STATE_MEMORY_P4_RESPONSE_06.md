# Progressive State Memory P4 — Fifth Repair Response

Status: READY_FOR_VERIFY
Date: 2026-10-03
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`

## Scope

This repair is limited to P4 `establishedBy` metadata validation and focused
parser tests. P5-P13 remain pending. No runtime, persistence, live storage,
reload, deployment, or commit behavior was changed.

## Repairs

P4 now mirrors the remaining local P1 invariants: `establishedBy.at` must be a
positive integer; provenance references must be nonempty, at most 512
characters, and free of U+0000 through U+001F control characters;
`supersedes` must be null or a canonical identifier and cannot self-reference;
and every `conflictsWith` entry must be a canonical identifier, unique, and
different from the establishing event ID. P4 intentionally does not require
supersession/conflict targets to be present because omitted history is valid.

All prior P4 repairs remain enforced, including fact/event-kind and P1 source
policy binding, strict schemas, wrapper identity, provenance uniqueness,
watermark lower bounds, P3 reason/relation validation, deterministic
render/parse, literal text preservation, and byte-budget fail-closed behavior.

## Evidence

- Focused P4 tests: **16/16 PASS**.
- Combined P1-P4 tests: **44/44 PASS**.
- Full extension Node suite: **334/334 PASS**, zero failures,
  cancellations, or skips.
- `node --check` passed for changed P4 source and tests.
- Durable PSM JSON is valid; top-level, node P4, and P4 detail status are
  `READY_FOR_VERIFY`; P5 remains `PENDING`.
- `git diff --check` passed.

The focused fifth-repair coverage rejects zero and fractional event times,
overlong/control-character provenance references, invalid and self-
supersession, invalid/duplicate/self-conflict identifiers, while preserving
valid omitted-history capsule behavior.

No commit, push, merge, deploy, reload, or live storage mutation was
performed. The candidate is ready for independent verification; P5 was not
started.
