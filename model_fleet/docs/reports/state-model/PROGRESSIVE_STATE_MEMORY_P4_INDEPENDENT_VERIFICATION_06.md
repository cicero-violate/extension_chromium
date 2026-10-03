# Progressive State Memory P4 — Independent Verification 06

Status: DONE_ACCEPTED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Verified HEAD: `741d4c2bdca35d0ce47424c859e7a6084ce70f0f`
Verified: 2026-10-03
Repair candidate: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P4_RESPONSE_06.md`
Prior failed verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P4_INDEPENDENT_VERIFICATION_05.md`

## Verdict

P4 is independently accepted. RestartCapsuleV1 is now a strict deterministic derived projection over accepted P2/P3 state, and its parser enforces all locally-checkable P1 invariants on embedded establishing-event metadata without requiring omitted history.

P5 may become ACTIVE. P6-P13 remain PENDING.

## Independent validation

- P4 focused: 16/16 PASS
- P1-P4 combined: 44/44 PASS
- full extension suite: 334/334 PASS, 0 failed, 0 skipped
- P1-P4 syntax: PASS
- durable DAG assertions: PASS
- git diff --check: PASS

## Independent edge matrix

All previously blocking and adjacent local P1-attainability probes now fail closed:

- invalid event ID -> rejected
- invalid source ID -> rejected
- empty provenance -> rejected
- duplicate provenance -> rejected
- zero event time -> rejected
- fractional event time -> rejected
- overlong provenance ref -> rejected
- control-character provenance ref -> rejected
- invalid supersedes ID -> rejected
- self-supersession -> rejected
- invalid conflict ID -> rejected
- duplicate conflict ID -> rejected
- self-conflict -> rejected

A valid capsule whose supersedes/conflict targets are omitted from the active working set remains accepted, as intended. P4 validates local reference form/self/uniqueness but does not falsely require archived targets to be present.

## Accepted P4 properties

- builder derives through accepted P3; arbitrary working sets cannot author capsules;
- exact capsule and nested fact schemas;
- structural archive exclusion without prose substring heuristics;
- wrapper/fact identity binding and selected-ID uniqueness;
- exact P3 selection reason/relationship validation;
- fact-kind/establishing-event-kind binding;
- P1 event-source policy and source/provenance vocabulary binding;
- P1 identifier, event-time, reference, provenance uniqueness, supersedes/conflict local invariants;
- watermark lower-bound binding while allowing an omitted latest event;
- deterministic compact JSON rendering and exact parse/render round-trip;
- exact UTF-8 byte sizing and fail-closed byte budget;
- no invented next action;
- no P5/P6 semantics, runtime wiring, persistence, live storage, commit, push, merge, deploy, or reload.

## Next boundary

P4: `DONE_ACCEPTED`

P5 only may become `ACTIVE`: delta capsule / parent checkpoint model.

P5 must reconstruct exact P4 capsules from a validated base plus ordered deltas, model parent checkpoint/generation structurally, and implement deterministic compaction without introducing cryptographic/content-addressed identity. P6 owns hashes/Merkle provenance.
