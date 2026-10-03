# Progressive State Memory P12 — Action-Authority Repair

Status: READY_FOR_VERIFY

Date: 2026-10-03
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Branch: `main`
HEAD: `dd554105f66981db42475eb9e8855f7c171e1702`

## Scope

P12 was repaired offline only. The repair adds one isolated, browser-compatible
typed action-authorization sidecar over the accepted P9 restart bootstrap:

- `extension/progressive-state-memory-m7-p12.js`
- `extension/tests/progressive-state-memory-p12.test.cjs`

P0-P11 remain accepted. P13 was not started. No P1-P9 serialized or state
contracts were changed, and no background/runtime wiring was added.

## Implemented contract

`RestartActionAuthorizationV1` is accepted only when an external operator
authority supplies an exact `continue` action and the module first validates
the P9 bootstrap through the accepted P6/P7/P8/P9 path. The sidecar binds
exactly to the validated source, project, watermark, current fact identity,
and current establishing event.

The module permits only:

- authority kind `operator`;
- target type `task`, `message`, or `frontier`;
- verb `continue`;
- current task phases `pending`/`active`;
- current message phases `queued`/`running`;
- current frontier state `open`.

It rejects historical/superseded targets, negative-memory event IDs, stale
event IDs, source/project/watermark substitution, unknown fields, malformed
IDs, unsupported authority kinds, blocked/done/terminal/quiescent targets,
and forged/recomputed P7 continuity before action validation. Without a valid
sidecar, readiness remains exactly P9's
`structurally-valid-action-gap` / `not-encoded-by-p2-p3`. With one valid
sidecar, readiness is derived as `restart-ready-explicit-action`; P9 itself is
not mutated and the module does not execute the action.

## Evidence

Focused P12 tests: **5/5 PASS**.

Covered evidence includes:

- P9 action gap remains unchanged without authorization;
- valid current task, message, and open-frontier authorizations become ready;
- source/root/tip/generation, project, watermark, target event, historical,
  negative-memory, unknown-type, unknown-verb, authority, unknown-field, and
  missing-target falsifiers fail closed;
- blocked/done/terminal/quiescent targets fail closed;
- compacted generation>0 P6/P7/P9 continuity is exercised;
- recomputed/forged continuity is rejected upstream;
- input immutability and production-module isolation are checked.

Combined P1-P10 plus P12 tests: **98/98 PASS**.

Full extension Node suite: **402/402 PASS**, zero failures/skips reported.

`node --check` passed for both new files. `git diff --check` passed. Durable
PSM state JSON parses successfully and records P12 as `READY_FOR_VERIFY`, with
P13 still `PENDING`.

## P11 custody and hashes

The original P11 19-entry manifest remains unchanged: all 19 production/test
hashes match the accepted P11 values exactly. The old manifest does not cover
the new P12 files.

New P12 hashes:

```text
731b539f30bd80231f747764e47f6ff5628d67ec038382e1c8fb56f9d4f5f78a  extension/progressive-state-memory-m7-p12.js
122a10325c1a37a035b964d1cab00b5f159d91d129432b3a4649d53f9882ff09  extension/tests/progressive-state-memory-p12.test.cjs
```

The intentional dirty worktree was preserved. No commit, push, merge, deploy,
extension reload, live storage mutation, or live fleet mutation occurred in
this repair. The previously authorized single reload remains the only reload;
no additional reload is required or claimed here.

## Live boundary

This response establishes the offline action-authority repair only. The prior
read-only live snapshot and its running-message/quiescence caveat are not
rewritten or repaired. No live action is inferred or manufactured. Any later
live restart proof remains separately gated and must use the accepted canonical
extension/runtime path.

## Stop state

**READY_FOR_VERIFY** — P12 action-authority repair is complete for independent
verification. P13 remains unstarted.
