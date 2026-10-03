# Progressive State Memory P4 — Independent Verification 05

Status: REPAIR_REQUIRED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Verified HEAD: `741d4c2bdca35d0ce47424c859e7a6084ce70f0f`
Verified: 2026-10-03
Repair candidate: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P4_RESPONSE_05.md`
Prior verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P4_INDEPENDENT_VERIFICATION_04.md`

## Verdict

The fourth P4 repair closes the four reported P1-attainability falsifiers and all declared regression gates. P4 remains REPAIR_REQUIRED because additional local P1 admission invariants on embedded `establishedBy` metadata are still not enforced.

P5 must remain PENDING.

## Passing evidence

- P4 focused: 16/16 PASS
- P1-P4 combined: 44/44 PASS
- full extension suite: 334/334 PASS
- P1-P4 syntax: PASS
- durable DAG assertions: PASS
- git diff --check: PASS
- invalid event ID: rejected
- invalid source ID: rejected
- empty provenance: rejected
- duplicate provenance identity: rejected

## Blocking local P1-attainability falsifiers

P1's accepted event contract also requires local invariants that do not depend on omitted history. P4 still accepts violations of those invariants:

- `establishedBy.at = 0` -> FAIL_ACCEPTED
- provenance `ref` length 513 -> FAIL_ACCEPTED
- provenance `ref` containing a control character -> FAIL_ACCEPTED
- invalid supersedes identifier with spaces -> FAIL_ACCEPTED
- `supersedes === eventId` -> FAIL_ACCEPTED
- invalid conflict identifier with spaces -> FAIL_ACCEPTED
- duplicate conflict IDs -> FAIL_ACCEPTED
- conflict ID equal to `eventId` -> FAIL_ACCEPTED

P1 requires:

- event time to be a positive integer;
- provenance refs to be non-empty, <=512 chars, and contain no control characters;
- supersedes/conflict references to use the canonical P1 identifier grammar;
- supersedes/conflict refs not to self-reference the current event;
- conflict references to be unique.

Historical existence of supersedes/conflict targets is intentionally not required here because P4 does not carry the accepted-event archive and a valid target may be omitted from the active working set.

## Required bounded repair

Stay in P4. Do not start P5.

1. Enforce positive-integer `establishedBy.at` exactly as P1 does.
2. Enforce P1 provenance-reference rules: non-empty, <=512 chars, no U+0000-U+001F control characters.
3. Enforce supersedes as null or a canonical P1 identifier and reject self-supersession.
4. Enforce every conflictsWith entry as a canonical P1 identifier, reject duplicates, and reject self-conflict.
5. Do not attempt to validate existence of supersedes/conflict targets against omitted history in P4.
6. Add parser adversarial tests covering all cases above, including fractional event time with a sufficiently high watermark so rejection comes from event-time validation rather than watermark comparison.
7. Preserve every prior P4 repair and boundary.

No P5/P6 work, runtime wiring, persistence, commit, push, merge, deploy, reload, or live storage mutation is authorized.
