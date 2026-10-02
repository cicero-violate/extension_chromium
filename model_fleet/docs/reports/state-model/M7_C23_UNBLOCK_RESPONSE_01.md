# M7 C23 Unblock Response 01

Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`
Candidate HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
Production extension path: `/workspace/ai_sandbox/extension_chromium/model_fleet/extension`
Status: M7 ACTIVE; C23 deployment-alignment review READY_FOR_DEPLOY; no live cutover performed

## Finding

The live extension is missing the accepted C18/C19 persistence boundary because production lacks:

- `fleet-state-model-m7-c18.js`
- `fleet-state-model-m7-c19.js`
- `fleet-state.js`
- `fleet-protocol.js`

Production `background.js` also lacks the candidate’s C1–C20 wiring, including the C18 load/save/mutate binding and C19 v2 authority assertion. The candidate background imports all required runtime modules successfully.

## Exact runtime promotion allowlist

To make the live extension target match the accepted C1–C21 runtime boundary, promote exactly these candidate files into the production extension directory:

1. `background.js`
2. `fleet-worker.js`
3. `control-pane.html`
4. `control-pane.js`
5. `fleet-state.js`
6. `fleet-protocol.js`
7. `fleet-state-model-m7-c1.js` through `fleet-state-model-m7-c19.js`, inclusive

Why each group is required:

- `background.js` contains the C1–C19 handler wiring, C18 persistence connection, C19 authority assertion, and C20 registry imports.
- C1–C19 modules provide the accepted semantic/runtime boundaries; C18 depends on C1 and C19 validates the C18 binding.
- `fleet-state.js` and `fleet-protocol.js` are the accepted C20 mechanical registries imported by background.
- `fleet-worker.js` carries the accepted C6/C7/C9/C10 protocol guards, including scoped cancellation and registration identity behavior.
- `control-pane.html` loads `fleet-state-model-m7-c17.js`; `control-pane.js` consumes the v2 public snapshot and `fleet:heartbeats-v2` contract.

The manifest is byte-identical between candidate and production and requires no change. All background imports resolve in the candidate. No additional production runtime file is required by the C18/C19/C20 wiring.

## Explicit exclusion list

Do not promote or mutate as part of this alignment:

- `extension/tests/**`;
- `fleet-state-model-m1.cjs` through `fleet-state-model-m6.cjs` (Node/reference modules);
- `STATE_MODEL_CLEANUP_TODO.md`, `PROBLEM.md`, or other cleanup/research notes;
- any unrelated production file;
- the pre-existing untracked M1–M6 artifacts in the main checkout.

The candidate’s runtime comparison found only these production-side runtime differences: `background.js`, `fleet-worker.js`, `control-pane.html`, `control-pane.js`, plus the absent C1–C19 modules and C20 registries. The manifest is unchanged. No unrelated runtime file was identified for promotion.

## Exact gated deployment/reload sequence

This sequence was defined but not executed in this review:

1. Keep the coordinator stopped and rerun the read-only C22 quiescence gate immediately before deployment. Require zero assignments, running task/message phases, completion/recovery handoffs, blocking heartbeat custody, rotating workers, and pending chat rotation.
2. Preserve the current v1 storage state and take a read-only evidence snapshot. Do not pre-create v2 storage.
3. Copy only the allowlisted runtime files above from the detached candidate into the production extension directory. Do not delete the v1 key or edit storage during deployment.
4. Run candidate syntax/diff/source scans and verify the copied file hashes against the candidate. Confirm the manifest is unchanged and no non-allowlisted file changed.
5. Reload the extension once through the authenticated extension management path, then wait for the new service-worker target. Do not dispatch work or invoke any other mutation during reload.
6. Verify the new worker exposes `ModelFleetStateM7C1`, `ModelFleetStateM7C18`, `ModelFleetStateM7C19`, `loadFleetState`, and the C18/C19 bindings before migration. If any is absent, stop and do not write storage.
7. Rerun the C22 quiescence proof against the reloaded target. If any predicate fails, stop with no storage mutation.
8. Invoke the accepted C18/C19 load boundary exactly once (`loadFleetState` through the loaded C19 wrapper). Do not call legacy loaders or write/remove storage directly. The C18 path must write `modelFleetState:v2`, validate it, and retire `modelFleetState:v1` only after the C1 gate succeeds.
9. Perform bounded live proof: verify v2-only storage, C19 assertion, canonical projected snapshot/worker state, one mutation path, and no legacy authority fields in the live v2 state. Do not dispatch synthetic work.
10. Record the post-cutover evidence and stop at the separately gated C23 verification result.

## Protection result

This was a read-only comparison. No production file was modified, no extension reload occurred, no chrome.storage key was written or removed, no migration ran, and C24+ was not started. Candidate HEAD remains `02183c4668c214e2a130747ab9b9820b6272cd43`. Authoritative main tracked production remains unchanged; its pre-existing untracked M1–M6 artifacts/tests and cleanup ledger remain untouched.

## Result

C23 unblock review is **READY_FOR_DEPLOY**. The exact next action is the separately authorized allowlisted deployment/reload sequence above; this report does not perform it.
