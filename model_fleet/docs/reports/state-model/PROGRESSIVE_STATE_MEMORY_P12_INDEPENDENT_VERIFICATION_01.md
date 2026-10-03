# Progressive State Memory P12 — Independent Verification 01

Status: REPAIR_REQUIRED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Verified HEAD: `dd554105f66981db42475eb9e8855f7c171e1702`
Verified: 2026-10-03
Candidate report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P12_RESPONSE_01.md`

## Verdict

P12 is not ready for acceptance. The authorized extension restart and structural PSM restart proof are valid, but the accepted P9 contract intentionally carries no authoritative bounded next action.

The architectural blocker is real and should be repaired at P12 by adding an explicit action-authorization layer over a validated P9 bootstrap. P1-P11 should not be reopened merely to infer an action from task priority, frontier prose, message order, or the existing free-form `operator.decision.decision` string.

P13 remains PENDING.

## Independently confirmed structural facts

- one operator-authorized extension reload was performed;
- all 19 P11 source/test hashes matched before reload;
- branch/main and HEAD `dd554105...` matched the accepted custody;
- canonical extension id/version were `njmmgeggaeejfgkbdenbncegpkofijmg` / `0.11.5`;
- replacement service-worker target appeared and runtime identity verified;
- control pane was restored;
- P1-P10 accepted reconstruction remains 93/93 PASS;
- P9 explicitly emits:
  - `nextAction = null`
  - `nextActionStatus = not-encoded-by-p2-p3`
  - `state = structurally-valid-action-gap`.

## Why P2/P3 should not be changed for this repair

P2 contains typed current goal/frontier/tasks/messages/operator decisions but no action authority.
P3 selects active facts and dependency closure but no action authority.
Existing task `priority`, frontier `summary`, message order, and operator-decision free-form text are insufficient to create executable restart authority without a new typed contract.

Automatically selecting from those fields would convert descriptive/project state into execution authority and violate the accepted no-inference rule.

## Required P12 action-authority mechanism

Add one isolated browser-compatible P12 module, e.g. `progressive-state-memory-m7-p12.js`, that depends on accepted P9 and does not modify P1-P9 serialized/state contracts.

Define an exact `RestartActionAuthorizationV1` sidecar supplied explicitly by an authority. The module MUST NOT choose an action.

Required binding:
- exact validated P9 bootstrap source envelope;
- exact project envelope;
- exact bootstrap watermark;
- explicit authority record;
- explicit typed bounded action target.

Recommended minimal action shape:

```
actionId: canonical id
verb: "continue"
target:
  type: "task" | "message" | "frontier"
  id: exact current semantic id
  eventId: exact current establishing event id
authority:
  kind: "operator"
  authorizationId: canonical id
```

The naming may differ, but the semantics must remain closed-world and typed.

## Validation rules

1. Always validate the P9 bootstrap against chain + reality + continuity before validating an action authorization.
2. Source/project/watermark in the action authorization must exactly equal the validated P9 bootstrap.
3. No automatic action selection.
4. Target must be present in the current P9 capsule and be bound to its exact current establishing event id.
5. A do-not-resurrect event cannot be targeted.
6. A historical/superseded fact cannot be targeted.
7. Unknown target type, verb, fields, ids, or malformed authority reject.
8. An authorization for bootstrap A must reject against bootstrap B even if human-readable text is similar.
9. Stale project/head/source/watermark or changed current fact version rejects.
10. Free-form operator-decision text cannot be treated as an action authorization.
11. The module may compute deterministic content identity, but must not claim hashes authenticate the operator. Operator authentication is external to the pure module and is represented by the already-recorded explicit operator gate.
12. The P9 bootstrap itself remains unchanged and structurally-valid-action-gap when no valid action sidecar is supplied.

Expose a derived restart-readiness check that returns/produces restart-ready material only when:
- P9 bootstrap is valid;
- explicit action authorization is valid and current;
- action target is current.

The derived readiness state should be exact and machine-readable, e.g. `restart-ready-explicit-action`.

## Live-state blocker

The original P12 read observed active custody `A-M-M-40-3734` / `M-40` / `W-S0003`.

A later independent read shows that custody changed naturally:
- generation: 3797;
- assignments: 0;
- workers: 0;
- at least one message still has phase `running`.

No live mutation was performed. This does not justify claiming a quiescent restart boundary. P12 rerun must inspect current live state again after the action-authority repair and must not cancel/clear/requeue synthetic work just to satisfy the proof.

## Repair boundary

- add P12 action-authority module/tests only;
- minimal P9 call reuse/import is allowed, but no P1-P9 semantic/serialized changes;
- no background.js/runtime import;
- no chrome.storage PSM writer;
- no reload;
- no live-state mutation;
- no commit/push/merge/deploy;
- no P13.

After implementation:
- independently verify the new P12 source/test bytes;
- rerun P1-P10 93/93 and full extension suite;
- test stale/forged action authorizations;
- then rerun P12 live proof without another reload unless separately authorized/strictly necessary.
