# Progressive State Memory P8 — Independent Verification 02

Status: DONE_ACCEPTED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Verified HEAD: `e2b59d9dc99a37ae2d28f048db8180e9c78a3c12`
Verified: 2026-10-03
Repair candidate: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P8_RESPONSE_02.md`
Prior failed verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P8_INDEPENDENT_VERIFICATION_01.md`

## Verdict

P8 repair is independently accepted. Lazy evidence hydration now preserves exact request budget identity, passes immutable resolver descriptors, verifies exact bytes against typed SHA-256 evidence digests, and remains an ephemeral injected retrieval layer rather than memory authority.

P9 may become ACTIVE. P10-P13 remain PENDING.

## Independent validation

- P8 focused: 8/8 PASS
- P1-P8 combined: 78/78 PASS
- full extension suite: 375/375 PASS, 0 failed, 0 skipped
- P8 syntax: PASS
- git diff --check: PASS

## Independent falsifier closure

- otherwise-identical hydration with byteBudget 3 vs 100 yields distinct bundles;
- hydrated bundles preserve exact byteBudget values;
- resolver descriptor is frozen before invocation;
- attempted resolver descriptor mutation does not alter the descriptor or result metadata;
- resolver-returned byte arrays are copied into bundle-owned bytes;
- missing bundle byteBudget -> rejected;
- byteBudget below totalByteLength -> rejected;
- malformed byteBudget -> rejected.

## Repository custody

HEAD moved during verification from `741d4c2b...` to `e2b59d9d...` via `fix(model-fleet): recover dead orphan turns`.

Authenticated changed paths were limited to runtime/control-plane worker-liveness files:
- `extension/background.js`
- `extension/control-pane.js`
- `extension/fleet-state-model-m7-c1.js`
- `extension/fleet-state-model-m7-c16.js`
- `extension/fleet-state-model-m7-c4.js`
- `extension/fleet-worker.js`
- `extension/tests/worker-liveness-recovery.test.cjs`

No PSM source/test/report/DAG path was changed by that commit. P8 falsifiers and all regressions were rerun successfully under the new HEAD.

## Accepted P8 properties

- validated P7 index is required before planning/hydration;
- only observed typed evidence facts are hydratable;
- requests use establishing event IDs and exact P7 source envelope;
- planner is zero-I/O and deterministic;
- resolver is explicit and injected only;
- resolver receives a frozen fresh descriptor copy;
- exact raw bytes are SHA-256 verified against typed evidence digest;
- bundle preserves source, requested event IDs, and exact byteBudget request identity;
- per-item/cumulative budget overflow fails closed with no truncation/partial bundle;
- bundle validator rechecks descriptors, byte lengths, total length, budget, and digests;
- unresolved non-evidence references remain unhydrated;
- caller/index/request/plan/resolver-returned arrays are not mutated;
- no persistence, cache, automatic resolver selection, semantic interpretation, or P9 runtime wiring.

## P9 boundary

P9 only may become ACTIVE: restart bootstrap integration.

P9 should build one strict restart-bootstrap envelope from already verified P6/P7/P8 material, bind it to exact project/source provenance and caller-supplied reality, preserve negative memory and unresolved gaps, and reconstruct the exact latest P4 restart capsule without inventing missing next-action semantics or wiring live runtime.
