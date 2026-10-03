# Progressive State Memory P12 — Second Action-Authority Repair

Status: READY_FOR_VERIFY

Date: 2026-10-03  
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`  
Branch: `main`  
HEAD: `dd554105f66981db42475eb9e8855f7c171e1702`

## Exact repairs

1. `createRestartActionAuthorizationV1` now exact-checks the caller-supplied
   `explicitAction` (`actionId`, `action`) and `explicitAuthority` (`kind`,
   `authorizationId`) before constructing the normalized authorization. Extra
   or missing caller fields therefore fail closed instead of being silently
   discarded.
2. The ready projection now has the exact unambiguous identity shape:
   `actionId` is the action identity, while
   `authority.authorizationId` remains the operator-authority identity. The
   misleading top-level `authorizationId` field is absent.

The accepted P9 action-gap contract is unchanged. No action is inferred,
selected from prose, or executed by P12.

## Focused falsification

P12 focused tests: **7/7 PASS**.

Covered:

- distinct action and operator authorization IDs in readiness;
- no misleading top-level `authorizationId`;
- extra/missing explicit action fields rejected;
- extra/missing explicit authority fields rejected;
- strict nested authorization/action/target validation remains active;
- same task re-established by a new event rejects the old authorization;
- valid task/message/open-frontier targets still become ready;
- blocked/done/terminal/quiescent, stale, substituted, superseded, malformed,
  and forged-continuity cases remain fail-closed.

Combined P1-P10 plus P12 tests: **100/100 PASS**.  
Full extension suite: **404/404 PASS**, zero failures/skips reported.  
`node --check` passed for the P12 source and test.  
`git diff --check` passed.  
Durable DAG JSON validation passed.

## Custody and hashes

All original **19/19 P11 manifest entries remain exact matches**. The old P11
manifest still does not cover the new P12 files.

New P12 hashes after this repair:

```text
e8b4c4f407d4e34ceba6895fe92fab630e3c4e1a659bcd434e80403082c8fbd4  extension/progressive-state-memory-m7-p12.js
3c148b22bf49ec14cb157c6d50c4ed3fa5ed154bd46ca16ebbdea107c5b3c204  extension/tests/progressive-state-memory-p12.test.cjs
```

Only the P12 source/test and this P12 report/state bookkeeping were changed
for this repair. No P1-P9 module or serialized contract was changed.

## Live boundary

This was an offline repair only. The latest independent live read remains the
known non-quiescent/inconclusive boundary: storage key `modelFleetState:v2`,
generation `3877`, and one running message. No live storage/state was
mutated, no reload was performed, and no work was cleared, cancelled,
requeued, dispatched, or synthesized. The single historical reload remains
the only reload.

P13 remains `PENDING`.

## Stop state

**READY_FOR_VERIFY** — both reported P12 action-authority falsifiers are
closed for independent verification. This report does not self-accept P12.
