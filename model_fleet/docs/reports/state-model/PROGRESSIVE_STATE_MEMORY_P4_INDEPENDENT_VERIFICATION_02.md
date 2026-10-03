# Progressive State Memory P4 — Independent Verification 02

Status: REPAIR_REQUIRED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Baseline/current HEAD: `6ee3bf81a9700c4c3a3b5b00851f911585512248`
Verified: 2026-10-03
Repair candidate: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P4_RESPONSE_02.md`
Prior failed verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P4_INDEPENDENT_VERIFICATION_01.md`

## Verdict

The first P4 repair closes nested archive-field acceptance and arbitrary selection-code forgery, but P4 remains REPAIR_REQUIRED because parsed selected-entry wrapper identities are not bound to the typed identity inside each fact.

P5 must remain PENDING.

## Passing evidence

- P4 focused: 11/11 PASS
- P1-P4 combined: 39/39 PASS
- independently observed full extension suite: 324/324 PASS, 0 failed, 0 skipped
- P1-P4 syntax: PASS
- durable DAG assertions: PASS
- git diff --check: PASS
- nested `acceptedEvents` fact path: rejected
- arbitrary task selection code: rejected

## Blocking falsifier — wrapper ID / fact identity mismatch

RestartCapsuleV1 is intended to be the exact typed P3 projection. In P3, each selected wrapper identity is derived from the canonical fact identity:

- goal wrapper id = `goal`
- frontier wrapper id = `frontier`
- constraint wrapper id = `fact.constraintId`
- task wrapper id = `fact.taskId`
- message wrapper id = `fact.messageId`
- decision wrapper id = `fact.decisionId`
- evidence wrapper id = `fact.evidenceId`

P4 parse/validate currently checks wrapper shape and fact shape separately, but does not generally enforce those identity equalities.

Independent `parseRestartCapsule()` probes:

- `constraint.id = C-X` while `fact.constraintId = C-1` -> FAIL_ACCEPTED
- `message.id = M-X` while `fact.messageId = M-1` -> FAIL_ACCEPTED
- `decision.id = D-X` while `fact.decisionId = D-1` -> FAIL_ACCEPTED
- `evidence.id = E-X` while `fact.evidenceId = E-1` -> FAIL_ACCEPTED
- `goal.id = not-goal` -> FAIL_ACCEPTED
- `frontier.id = not-frontier` -> FAIL_ACCEPTED

A task-id mismatch happened to be rejected only because a selected decision still referenced the original task ID; that is incidental relation failure, not a task identity invariant.

This means a parsed capsule can contain internally inconsistent identities while still satisfying its outer schema.

## Required bounded repair

Stay in P4. Do not start P5.

1. Bind every selected wrapper ID to the exact identity encoded by its typed fact:
   - goal -> `goal`
   - frontier -> `frontier`
   - constraint -> `constraintId`
   - task -> `taskId`
   - message -> `messageId`
   - decision -> `decisionId`
   - evidence -> `evidenceId`
   - artifact -> `artifactId` if/when artifacts become selectable.
2. Enforce uniqueness of wrapper IDs within each selected collection.
3. Ensure relation checks operate over these identity-bound wrappers rather than compensating for mismatches accidentally.
4. Add parser adversarial tests for every ID/fact mismatch above, including a task mismatch with no decision/evidence relation so the identity check itself is proven.
5. Preserve the repaired nested fact schemas, selection reason contract, literal-text behavior, deterministic rendering, byte-budget behavior, watermark binding, and P2/P3 validation.

No P5/P6 work, runtime wiring, persistence, commit, push, merge, deploy, reload, or live storage mutation is authorized.
