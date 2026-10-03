# Progressive State Memory P10 — Independent Verification 01

Status: REPAIR_REQUIRED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Verified HEAD: `65cd7b734d6bc0396d2134a518714e4e1bcd77be`
Verified: 2026-10-03
Candidate report: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P10_RESPONSE_01.md`

## Verdict

P10 correctly falsifies the accepted P5/P6/P7/P9 composition across compaction. P11 must remain PENDING.

The latest P4 capsule remains exactly equivalent after compaction. The defect is that compacting away earlier checkpoints removes P7-observed history needed to reconstruct negative memory and exact relation guardrails, while P9 still accepts the compacted result as a structurally valid restart bootstrap.

## Independent regression evidence

- P10 focused detector matrix: 7/7 PASS.
- P1-P10 combined: 92/92 PASS.
- git diff --check: PASS.
- Matrix D detector independently rerun and reproduces the forbidden condition.

## Direct reproducer

History:
- base contains `goal-1`;
- child contains current `goal-2` explicitly superseding `goal-1` and conflicting with `missing-conflict`;
- source chain is base + one delta;
- P5 compaction emits generation-1 base with the exact latest capsule;
- P6 V1 compaction link verifies;
- a new P6 chain is rooted at that compacted base.

Observed:

`CAPSULE_EQUAL=true`
`BEFORE_NEGATIVE=["goal-1"]`
`AFTER_NEGATIVE=[]`
`BEFORE_UNRESOLVED_REFS=[conflictsWith goal-2 -> missing-conflict]`
`AFTER_UNRESOLVED_REFS=[conflictsWith goal-2 -> missing-conflict, supersedes goal-2 -> goal-1]`
`P9_BEFORE_STATE=structurally-valid-action-gap`
`P9_AFTER_STATE=structurally-valid-action-gap`
`P9_AFTER_VALIDATES=true`
`COMPACTED_BASE_GENERATION=1`

Thus compaction is content-correct at P4 but history-incomplete at P7. P9 currently cannot distinguish that history-incomplete compacted root from a restart-safe source.

## Ownership

The earliest failing composition is P6/P7:

- P6 binds source tip to compacted latest P5 base, but the link binds no P7 continuity payload.
- P7 reconstructs `observedFactVersions` solely by walking capsules present in the supplied P6 chain.
- after re-rooting at the compacted base, earlier observed fact versions are unavailable.

P9 then consumes the rebuilt P7 index without requiring compaction continuity, so P9 is the restart-boundary enforcement owner.

P5 compaction itself remains correct for its accepted responsibility: exact latest P4 capsule replay. The repair should not make P5 semantically aware of P7 conflict/supersession rules.

## Required repair architecture

Use one canonical compaction-continuity path rather than special-case inference.

1. Preserve current P5 compaction unchanged.
2. Extend P6 with a new versioned compaction-link contract that can cryptographically bind one opaque continuity digest in addition to source tip and compacted-base digest. P6 must not interpret P7 semantics.
3. P7 owns a typed `CompactionContinuityV1` projection created from a validated pre-compaction P7 index. Its semantic payload should carry the exact historical `observedFactVersions` needed to rebuild P7 after compaction. Do not carry old P4 capsules or prose summaries.
4. The P7 continuity payload must be deterministically hashed/domain-separated and its digest must be bound into the new P6 compaction link.
5. P7 rebuild over a compacted root (base generation > 0) must require a valid continuity receipt. Missing, wrong-source, wrong-base, wrong-link, wrong-digest, or tampered continuity must fail closed.
6. Seed P7 observed versions from validated continuity, then merge versions observed in the compacted/new P6 chain. Recompute final-current IDs, supersession/conflict edges, negative memory, unresolved conflicts, and unresolved references from that merged history.
7. Repeated compaction must roll continuity forward from the already reconstructed P7 index, so at least five compact/re-root/rebuild cycles preserve exact P7 guardrails without carrying prior capsules.
8. P9 must accept/require the validated P7 continuity input for compacted-root chains and must reject a generation>0 compacted root when continuity is absent or invalid.
9. P9 bootstrap must bind the continuity receipt/digest in a machine-readable way so validation cannot silently use a different continuity sidecar. Keep large historical versions outside the compact bootstrap if needed; the bootstrap may carry only the exact continuity digest/receipt identity.
10. Generation-0 ordinary chains remain backward-compatible and require no continuity.

## Non-negotiable falsifiers

- exact source chain -> compact -> re-root -> P7/P9 preserves source doNotResurrectEventIds, unresolved conflicts, unresolved references;
- five repeated compaction cycles preserve the same guardrails and latest P4 semantics;
- continuity omission on generation>0 root -> reject;
- continuity payload tamper with unchanged digest -> reject;
- recomputed continuity digest but wrong P6 link -> reject;
- continuity from another source chain -> reject;
- continuity bound to another compacted base -> reject;
- mutated/reused historical event IDs after compaction -> reject;
- no P7 semantics introduced into P6;
- no runtime/persistence/live restart changes.

## Boundary

P10 remains REPAIR_REQUIRED. P11-P13 remain PENDING. No runtime/live-state/reload/deploy action is authorized.
