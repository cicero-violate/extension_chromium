# Progressive State Memory P4 — Fourth Repair Response

Status: READY_FOR_VERIFY
Date: 2026-10-03
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`

## Scope

This repair is limited to P4 establishedBy parsing and its focused tests.
P5-P13 remain pending. No runtime, persistence, live storage, reload, or
deployment behavior was changed.

## Repairs

The P4 parser now mirrors the accepted P1 identifier grammar for
`establishedBy.eventId` and `establishedBy.source.id`:
`^[A-Za-z0-9][A-Za-z0-9._:-]{0,159}$`. It also requires at least one
provenance entry and rejects duplicate provenance identity tuples of
`kind + ref + digest`.

Existing P4 guarantees remain enforced: fact/event-kind binding, P1 source
policy and vocabularies, watermark lower bounds, strict nested schemas,
wrapper/fact identity binding, unique selected IDs, exact P3 selection
reasons/relations, literal domain text preservation, deterministic rendering,
UTF-8 sizing, and fail-closed byte budgets.

## Evidence

- Focused P4 tests: **16/16 PASS**.
- Combined P1-P4 tests: **44/44 PASS**.
- Full extension Node suite: **334/334 PASS**, zero failures,
  cancellations, or skips.
- `node --check` passed for the changed P4 source and test.
- Durable PSM JSON is valid; top-level and P4 status are `READY_FOR_VERIFY`;
  P5 remains `PENDING`.
- `git diff --check` passed.

The focused fourth-repair coverage rejects event IDs and source IDs containing
spaces, empty provenance, and duplicate identical provenance entries, while
retaining valid capsule round trips and all prior adversarial coverage.

No commit, push, merge, deploy, reload, or live storage mutation was
performed. The candidate is ready for independent verification; P5 was not
started.
