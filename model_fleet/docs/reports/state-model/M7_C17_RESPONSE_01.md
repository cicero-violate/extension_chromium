# M7 C17 Independent Verification

Result: READY_FOR_VERIFY  
Migration: M7 C17  
Status: M7 ACTIVE; C18 not started

## Candidate and protection

- Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`
- Verified HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
- Candidate-only changes were inspected.
- Authoritative main `/workspace/ai_sandbox/extension_chromium` has no tracked production diff.
- No browser/CDP/live storage, deploy, push, or commit was performed.

## C17 contract verification

C17 adds the browser-compatible `fleet-state-model-m7-c17.js` display adapter and loads it only for the control pane. It consumes the C16 projected v2 snapshot and `fleet:heartbeats-v2` deltas without creating canonical state or UI-owned authority.

- Projected worker display uses C16 fields such as display status, lifecycle display, heartbeat age, runtime busy, assignment summary, and stale state.
- Task and message rendering uses canonical projected `phase`, owner, dependency, assignment-summary, and queue-age fields; it does not reconstruct custody from legacy fields.
- `fleet:heartbeats-v2` is version-gated to v2 snapshots and applies `ModelFleetStateM7C17.applyHeartbeatViewDeltaV2` with M6 stale, duplicate, conflict, validation, and immutability behavior.
- v1 `fleet:heartbeats` merging remains explicitly gated to non-v2 snapshots.
- C16 v2 worker/task arrays are preserved by snapshot normalization; minimal v2 action results refresh the projected snapshot instead of treating absent snapshots as authority.
- Projection and delta application are read-only. No `publicSnapshot` call or C18 artifact was added to the control-pane path.

## Evidence

- C17 focused: 7/7 PASS.
- C1-C17 focused: 184/184 PASS.
- All candidate tests: 491/491 PASS.
- M6 focused regression: 34/34 PASS.
- `node --check` passed for C17, control-pane, background, and fleet-worker.
- `git diff --check` passed.
- Static/adversarial checks passed for C17 event/version gating, M6 parity wiring, read-only projection behavior, absence of C18, and candidate/main isolation.

The C17 boundary is READY_FOR_VERIFY. C18 remains unstarted.
