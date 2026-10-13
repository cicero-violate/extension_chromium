# Model Fleet NEXT validation: R2-R6 acceptance plan

Authority: Runtime Genesis Acceptance Sequence V1; independent successor
validation only. Date: 2026-10-13.

## Immutable inputs and environments

- Source V15: 0637dd7733dc7fe2cc7b480ef05b320b7b6883da50e5ad8d38fa2216da5680f7.
- NEXT installed Dev-specific digest:
  fedd2a94be6857d48d2f68b48394d992aad07e16ee087db82404ff52e3893016.
- NEXT port 9226; new profile and extension; local user service not enabled.
- Old Dev 9225 is still paused on V10 and retains failed R4 epoch 2.
- Personal Fleet 9222, Canon 9223, and Release 9224 remain unchanged.
- Never copy or migrate cookies or extension worker/task/message records from
  9225. Never replay blocked M-1/M-2 or claim old operator unfreeze as Review.

## Gate A — code identity on isolated NEXT — PASS

- 1636/1636 extension regression, 240/240 strongest adversarial, no skips.
- NEXT source copied from an immutable release receipt and DEV-only transformed.
- Exact 38/38 service-worker scripts independently verified on 9226.
- Exact 6/6 page content scripts independently verified via temporary tab.
- Browser stopped/restarted after enabling Developer mode through Chrome UI;
  source attestation passed again.
- Fresh storage contained no workers/tasks/messages/assignments at proof time.

## Gate B — authenticate new profile — BLOCKED, user interaction required

- New ChatGPT profile on 9226 displayed Log in and no authenticated composer.
- User must sign into the *9226* browser directly using official ChatGPT
  authentication. Do not request or handle passwords, passcodes or cookies.
- After sign-in, select chatgpt-mcp-tunnel in the real app picker.
- Recheck extension ID, current origin, profile, and no inherited work custody.

## Gate C — R2 registration

- Use canonical reconcile-topology with policy paused and zero work.
- Require exact three distinct role-tab/window bindings, healthy page-side
  bridge registration, fresh heartbeat and one expected worker source digest.
- Reject role mismatch, ambiguous tab/profile, or stale/duplicate binding.

## Gate D — R3 scheduler

- Enable only after Gate C. Require exactly three registered responsive workers,
  scheduler unpaused, and no tasks, messages, assignments, blockers or healing
  obligations. Independently re-read persistent state.

## Gate E — R4 bounded repair, separate Review

- Inject a reversible fault only on W-S0001 within NEXT 9226 after confirming
  recovery handler authority and the exact tab identity.
- Require W-S0002 to use authenticated Canon workspace actions on the HOST.
  A local ChatGPT container curl to 127.0.0.1 is not host-CDP evidence.
- Require implementation's host repair receipt to match one exact repair key,
  followed by independent W-S0003 verification over the same lineage.
- No blind replay, manual acceptance, fabricated review, duplicate reward or
  terminal-message deletion. If blocked, preserve and checkpoint.

## Gate F — R5 independent acceptance; R6 resume

- Re-run full regression and adversarial suites on accepted bytes.
- Review must attest exact live profile/source/repair epoch and absence of
  partial/contradictory state before unblocking.
- Resume scheduler only after acceptance; verify exactly once, no orphaned
  custody and no unbounded duplicate dispatch.

## Release boundary

Release Chromium 9224 remains undeployed. Promote only after the required
R0-R6 receipts, independent review and explicit old 9222 extension disable
attestation; never treat a dormant service-worker target as proof of disable.

## Source-control boundary

Existing main worktree has hundreds of dirty paths and unrelated staged edits.
Only stage or commit a verified, explicitly scoped set after independent review;
do not accidentally include the prior staged changes in a broad merge.


## Live R2 liveness checkpoint — 2026-10-13

The NEXT 9226 ChatGPT login completed. With scheduler paused and zero
tasks/messages/assignments, canonical topology reconciliation created
Coordinator W-S0001, Implementation W-S0002 and Review W-S0003.
Independent R2 identity, source, role, window and heartbeat proof initially
passed. The real ChatGPT app picker attached chatgpt-mcp-tunnel to W-S0001.

Subsequent checks detected that W-S0001 lost its registered tab binding and
heartbeat; W-S0002 and W-S0003 remained bound. Therefore the current R2
gate is BLOCKED regardless of the earlier result. Hyprland tiled a NEXT
worker viewport to 168 pixels high and its connector app picker reported
expanded without displaying the options. Do not fabricate app mentions
or semantic work.

A detailed Chrome window/journal inspection was rejected by the safety layer.
Exact response: This tool call was blocked by OpenAI because we couldn't
determine the safety status of the request. Do not retry through alternative
tool routing to evade the block.

D20 added read-only diagnostic warnings for missing bindings and unknown/stale
heartbeats. Current snapshot reports one missing tab and one unknown heartbeat,
policy paused, zero tasks/messages/assignments. Next: safely reconcile
Coordinator once and independently prove sustained R2, including actual app
selection on each worker, before R3 unpause or any R4 fault injection.
