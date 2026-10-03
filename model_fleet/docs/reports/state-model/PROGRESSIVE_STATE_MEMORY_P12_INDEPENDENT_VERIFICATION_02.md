# Progressive State Memory P12 — Independent Verification 02

Status: REPAIR_REQUIRED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Verified HEAD: `dd554105f66981db42475eb9e8855f7c171e1702`
Verified: 2026-10-03
Candidate report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P12_RESPONSE_02.md`
Prior independent verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P12_INDEPENDENT_VERIFICATION_01.md`

## Verdict

The P12 action-authority repair is directionally correct and all declared suites are green, but P12 is not independently accepted.

Two P12-owned closed-world identity defects remain:

1. `createRestartActionAuthorizationV1` silently drops unknown top-level fields from the caller-supplied explicit action object instead of rejecting them.
2. `assessRestartReadinessV1` emits the action's `actionId` under a field named `authorizationId`, while the actual operator authorization id is a different value inside `authority.authorizationId`.

P13 must remain PENDING.

## Independently confirmed gates

- P12 focused: 5/5 PASS.
- P1-P10 + P12 combined: 98/98 PASS.
- full extension suite: 402/402 PASS.
- P12 source syntax: PASS.
- P12 test syntax: PASS.
- git diff --check: PASS.
- P12 source SHA-256:
  `731b539f30bd80231f747764e47f6ff5628d67ec038382e1c8fb56f9d4f5f78a`.
- P12 test SHA-256:
  `122a10325c1a37a035b964d1cab00b5f159d91d129432b3a4649d53f9882ff09`.
- original P11 manifest: 19/19 exact matches.

## Falsifier 1 — create API launders unknown explicit-action fields

Input:
- a valid explicit action;
- one extra top-level field, e.g. `unrecognized: "should-reject"`.

Observed:

`CREATE_UNKNOWN_EXPLICIT_ACTION_FIELD=FAIL_ACCEPTED`

The create function constructs a new object from only `explicitAction.actionId` and
`explicitAction.action`, silently discarding the unknown caller field before the
closed-world authorization validator sees it.

This violates the P12 contract that unknown fields fail closed. Creation and validation
must have the same closed-world input discipline.

Required behavior:
- exact-check explicitAction against exactly `["actionId", "action"]` before construction;
- exact-check explicitAuthority against exactly `["kind", "authorizationId"]` before construction;
- reject extra/missing fields rather than normalizing them away.

## Falsifier 2 — readiness identity field is mislabeled

Independent authorization:

`AUTH_ACTION_ID=action-1`
`AUTHORITY_ID=operator-auth-1`

Current readiness output:

`READY_AUTHORIZATION_ID=action-1`
`READY_HAS_ACTION_ID=false`

Thus the readiness result uses the key `authorizationId` for the action id. This creates
two different authorization identities:
- top-level `authorizationId` actually means action id;
- nested `authority.authorizationId` means operator authorization id.

The derived restart-ready artifact must preserve exact semantic identity.

Required shape:
- carry `actionId: accepted.actionId` explicitly;
- carry `authority` unchanged, including `authority.authorizationId`;
- do not reuse or overload the name `authorizationId` for action identity.

The exact ready schema should therefore contain an `actionId` field rather than the
current top-level `authorizationId` field, unless a different equally unambiguous exact
schema is implemented and tested.

## Stale-version control

A valid authorization for current task event `task-1` was checked against a later
bootstrap in which the same semantic task id was re-established by `task-2`.

Observed:

`STALE_TARGET_VERSION=PASS_REJECTED:authorization-source-mismatch`

So stale target/version binding remains fail-closed.

## Live boundary

Read-only storage check after the offline repair:

- storage keys: exactly `modelFleetState:v2`;
- generation: 3877;
- state exists;
- one message still has phase `running`;
- no live mutation or reload was performed.

The live boundary therefore remains separately non-quiescent/inconclusive for final P12
acceptance. Do not mutate runtime state to satisfy the proof.

## Required bounded repair

P12 only:

1. Reject unknown/missing top-level fields in the explicit action input before constructing
   RestartActionAuthorizationV1.
2. Preserve operator authority input closed-world behavior.
3. Change the restart-ready projection to carry exact `actionId` semantics and preserve
   `authority.authorizationId` separately.
4. Add adversarial tests with distinct values for action id and operator authorization id.
5. Add create-path tests proving unknown/missing explicit-action and authority fields reject.
6. Preserve all current source/project/watermark/current-event/stale/negative-memory/phase
   checks.
7. Preserve P9 action-gap behavior when no authorization is supplied.
8. No P1-P11 semantic changes.
9. No runtime/background wiring, storage mutation, reload, commit, push, merge, deploy, or P13.

After repair, P12 still requires one final read-only live-boundary check before independent
acceptance.
