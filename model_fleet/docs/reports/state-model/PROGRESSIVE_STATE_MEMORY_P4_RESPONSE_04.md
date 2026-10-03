# Progressive State Memory P4 — Third Repair Response

Status: READY_FOR_VERIFY
Date: 2026-10-03
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`

## Scope

This repair is limited to the isolated P4 restart-capsule parser/validator and
its focused tests. P5-P13 remain pending. No runtime, persistence, storage,
reload, or live-state behavior was changed.

## Repairs

`extension/progressive-state-memory-m7-p4.js` now reuses the accepted P1
vocabularies and source policy. Every selected fact type is bound to its
allowed establishing event kind: goal, frontier, constraint, task, message,
artifact, evidence, and operator decision use their respective P1 event
contracts. `establishedBy.source.kind` must be both a P1 source kind and
authorized by `EVENT_SOURCE_POLICY`; provenance entry kinds must be accepted
P1 provenance kinds.

Capsule validation now requires the watermark sequence and timestamp to be at
least those of every selected fact's `establishedBy` record. A zero watermark
remains valid for an empty selected-fact set. The watermark event ID is not
required to be selected, so a later omitted event remains valid.

## Evidence

- Focused P4 tests: **15/15 PASS**.
- Combined P1-P4 tests: **43/43 PASS**.
- Full extension Node suite: **328/328 PASS**, zero failures/cancellations/skips.
- `node --check` passed for the changed P4 source and test.
- Durable PSM JSON parsed successfully; top-level and P4 status are
  `READY_FOR_VERIFY`; P5 remains `PENDING`.
- `git diff --check` passed.

The focused adversarial coverage includes wrong establishing kinds for every
selected fact type (including an injected artifact), unauthorized/unknown
source kinds, invalid provenance kinds, sequence/time watermark regression,
and a valid watermark referring to an omitted latest event.

## Boundaries and status

P4 preserves strict nested schemas, wrapper/fact identity and uniqueness,
selection-reason/relation validation, literal domain text handling, P2/P3
validation, deterministic rendering, UTF-8 sizing, and byte-budget fail-closed
behavior. No P5 parent/delta/compaction work was started.

Candidate is ready for independent verification. No commit, push, merge,
deploy, reload, or live storage mutation was performed.
