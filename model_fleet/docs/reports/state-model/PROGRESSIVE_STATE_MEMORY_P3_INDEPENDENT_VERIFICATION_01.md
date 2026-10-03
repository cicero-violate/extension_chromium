# Progressive State Memory P3 — Independent Verification 01

Status: REPAIR_REQUIRED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Baseline/current HEAD: `6ee3bf81a9700c4c3a3b5b00851f911585512248`
Verified: 2026-10-03
Candidate report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P3_RESPONSE_01.md`

## Verdict

P3 is not independently accepted. Focused tests, combined P1-P3 regressions, full extension regressions, syntax, durable-state assertions, and diff hygiene are green, and the typed relation/dependency selection behavior is otherwise correct. One structural false-positive remains in the history-leak guard.

P4 must remain PENDING.

## Passing evidence

- P3 focused: 5/5 PASS
- P1-P3 combined: 28/28 PASS
- full extension suite: 307/307 PASS, zero failed/skipped
- P1/P2/P3 syntax: PASS
- durable DAG JSON assertions: PASS
- git diff --check: PASS

Independent typed-selection matrix also produced the expected result:

- selected tasks: T-A nonterminal + T-Y/T-Z dependency closure
- selected active constraint: C-A only
- selected nonterminal message: M-A only
- selected decision: D-A only because it targets selected T-A
- selected evidence: E-Y only because it targets selected dependency T-Y
- unrelated terminal task/message/decision/evidence excluded
- artifacts excluded because P2 exposes no typed artifact relation

## Blocking falsifier — prose literal triggers false history-leak rejection

P3 currently tests history leakage using:

`stableValue(selected).includes('acceptedEvents')`

This inspects user/domain text rather than structure. A completely valid P2 canonical state whose goal is:

`audit acceptedEvents boundary`

was rejected by P3 even though the accepted-event archive was not copied into the working set.

Observed:

`LITERAL_ACCEPTED_EVENTS=FAIL_REJECTED:working-set-history-leak`

This violates the P3 contract in two ways:

1. selection must depend only on typed/structural relations, not incidental prose content;
2. valid canonical facts must not be rejected merely because their text happens to contain an internal field name.

The leak check must be structural: verify that the working-set schema contains no accepted-event archive field/reference path, rather than substring-scanning serialized content.

## Required bounded repair

Stay in P3. Do not start P4.

1. Replace the substring-based `acceptedEvents` leak check with a structural/schema-level assertion that the ActiveWorkingSetV1 output cannot contain the P2 accepted-event archive.
2. Add adversarial tests proving valid goal/message/constraint text containing the literal `acceptedEvents` is accepted normally.
3. Preserve all current dependency-closure, explicit-relation-only, watermark-binding, determinism, immutability, and invalid-P2 rejection behavior.
4. Re-run focused P3, combined P1-P3, full extension, syntax, durable JSON, and git diff checks.

No commit/push/merge/deploy/reload/live storage mutation is authorized.
