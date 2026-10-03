# Progressive State Memory P10 — Independent Verification 02

Status: REPAIR_REQUIRED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Verified HEAD: `dd554105f66981db42475eb9e8855f7c171e1702`
Verified: 2026-10-03
Repair candidate: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P10_RESPONSE_02.md`
Prior verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P10_INDEPENDENT_VERIFICATION_01.md`

## Verdict

The first compaction-continuity repair closes omission/stale-digest and ordinary continuity-preservation tests, but P10 remains REPAIR_REQUIRED.

The new P7 continuity payload and P6 V2 compaction receipt are only self-consistent sidecars. The newly re-rooted P6 Merkle chain does not commit to either continuityDigest or compactionDigest. Therefore a caller can rewrite historical continuity, recompute both public SHA-256 digests, keep the compacted P6 chain unchanged, and obtain a P7/P9 result that validates with altered negative memory.

P11 must remain PENDING.

## Declared gates independently rerun

- Focused P6-P10: 41/41 PASS.
- Combined P1-P10: 93/93 PASS.
- Full extension suite: 397/397 PASS.
- node --check on touched P6/P7/P9/P10 files: PASS.
- git diff --check: PASS.

These green gates do not cover the recomputed-sidecar attack below.

## Independent falsifier

Start from a valid source chain whose P7 index contains negative memory `["goal-1"]`.

Create:
1. exact P5 compacted base;
2. P7 CompactionContinuityV1;
3. valid P6 V2 compaction link;
4. re-rooted compacted P6 chain.

Valid path:

`VALID_NEGATIVE=["goal-1"]`

Then forge only the continuity sidecar:
- remove historical observed version `goal-1`;
- recompute P7 continuityDigest using the public domain-separated SHA-256 helper;
- replace the P6 V2 receipt continuityDigest;
- recompute the P6 V2 compactionDigest;
- leave the compacted P6 chain unchanged.

Observed:

`RECOMPUTED_CONTINUITY_FORGERY=FAIL_ACCEPTED`
`FORGED_NEGATIVE=[]`
`FORGED_P9_VALIDATES=true`

This proves the compacted P6 chain itself contains no commitment to the continuity receipt.

## Root cause

P6 V2 correctly hashes:
- sourceTipDigest,
- compactedBaseDigest,
- continuityDigest.

But that V2 receipt is a detached object. `buildMerkleChainV1(compactedBase, [])` produces the same compacted-chain root/tip regardless of which V2 continuity receipt is supplied later.

P7 validation can recompute the detached receipt digest but cannot know which self-consistent receipt was the one accepted when the compacted chain was created.

This is an integrity/custody gap, not a P7 semantic-validation gap.

## Required repair

Preserve P5 and ordinary P6 V1 behavior. Add a versioned P6 compacted-chain contract whose root provenance commits the accepted V2 compaction receipt.

1. Add a new P6 CompactedMerkleChainV2 / equivalent exact schema.
2. The compacted-chain root must cryptographically commit to at least:
   - compacted base checkpoint digest;
   - V2 compaction receipt compactionDigest;
   - V2 continuityDigest;
   - prior sourceTipDigest.
3. Use a new domain-separated root/node preimage. Do not alter existing P6 V1 serialized chain shape.
4. Creating a compacted chain must require a verified V2 compaction receipt.
5. Verifying the compacted chain must recompute and expose the committed continuity identity.
6. P7 generation>0 roots must require the new compacted-chain provenance and require the supplied CompactionContinuityV1 identity to exactly match the identity committed by the P6 root.
7. P9 generation>0 bootstrap build/validation must use that same P6-committed identity. A detached sidecar that does not match the chain commitment must reject before structurally-valid bootstrap output.
8. Generation-0 P6 V1 chains remain backward-compatible and reject unnecessary continuity.
9. Repeated compaction must roll the commitment forward: each new compacted root commits the new continuity receipt whose sourceTipDigest is the prior accepted chain tip.

## Mandatory falsifiers

- original Matrix D preservation remains exact;
- missing continuity on generation>0 -> reject;
- stale digest tamper -> reject;
- recompute continuityDigest + recompute detached receipt while keeping compacted chain unchanged -> reject;
- recompute both continuity/receipt and rebuild a different compacted chain -> chain root/tip must differ from the previously accepted compacted chain;
- continuity from another source chain with same latest P4 capsule -> reject against the existing compacted-chain commitment;
- continuity for another compacted base -> reject;
- five repeated compact/re-root cycles preserve P7/P9 guardrails and each cycle has a new verified provenance commitment;
- legitimate post-compaction delta remains supported;
- P6 remains opaque to P7 semantics;
- no runtime/persistence/live-state behavior.

## Boundary

P10 remains REPAIR_REQUIRED. P11-P13 remain PENDING. No runtime/live-state/reload/deploy action is authorized.
