# Progressive State Memory P10 — Independent Verification 03

Status: DONE_ACCEPTED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Verified HEAD: `dd554105f66981db42475eb9e8855f7c171e1702`
Verified: 2026-10-03
Repair candidate: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P10_RESPONSE_03.md`
Prior failed verification: `docs/reports/state-model/PROGRESSIVE_STATE_MEMORY_P10_INDEPENDENT_VERIFICATION_02.md`

## Verdict

P10 second compaction-continuity repair is independently accepted.

The compacted P6 V2 chain now commits the exact continuity provenance identity into its own root/node digests. A rewritten P7 continuity sidecar with recomputed public SHA-256 values no longer validates against the accepted compacted chain identity. Rebuilding a chain from the forged sidecar produces a different root/tip identity, so substitution is observable at the P6 source envelope.

P11 may become ACTIVE. P12-P13 remain PENDING. Live restart remains unauthorized.

## Independent critical falsifier closure

Honest compacted chain:
- P7 negative memory: `["goal-1"]`
- compacted root is a committed P6 V2 provenance root.

Recomputed-sidecar attack:
- remove historical `goal-1`;
- recompute P7 continuityDigest;
- recompute detached V2 compaction receipt digest;
- keep the honest compacted chain unchanged.

Observed:
- `UNCHANGED_CHAIN_FORGED_CONTINUITY=PASS_REJECTED:continuity-root-binding`
- `UNCHANGED_CHAIN_FORGED_P9=PASS_REJECTED:invalid-p7-index`

Substituted-chain control:
- rebuilding P6 V2 from the forged receipt produces a different root;
- rebuilding produces a different tip;
- the honest bootstrap rejects against the substituted forged chain.

Observed:
- `FORGED_ROOT_DIFFERS=true`
- `FORGED_TIP_DIFFERS=true`
- `HONEST_BOOTSTRAP_SUBSTITUTED_CHAIN=PASS_REJECTED`.

Generation-positive ordinary P6 V1 roots are no longer restart-safe:
- P7 rejects: `compacted-chain-required`;
- P9 rejects via invalid P7 index.

## Independent validation

- Focused P6/P7/P9/P10: 33/33 PASS.
- P10 adversarial matrix: 8/8 PASS.
- Combined P1-P10: 93/93 PASS.
- Full extension suite: 397/397 PASS.
- node --check on P6/P7/P9/P10 touched files: PASS.
- durable DAG assertions: PASS.
- git diff --check: PASS.

## Repository custody

Current verified HEAD: `dd554105f66981db42475eb9e8855f7c171e1702`.

That HEAD commit changes only:
- `model_fleet/extension/background.js`;
- `model_fleet/extension/tests/project-stop-routing-recovery-s5.test.cjs`.

It does not change PSM source/test/report/DAG paths.

## Accepted trust model

P6 now proves content-addressed provenance relative to an accepted chain identity. It does not authenticate an untrusted caller and does not claim that SHA-256 alone establishes custody. Durable custody of the accepted chain identity remains a separate source/runtime concern for later verification/integration.

## P11 boundary

P11 only may become ACTIVE: independent source/test verification.

P11 must:
- make no production-source changes;
- re-audit P1-P10 directly from source, not prior prose reports;
- independently reproduce the critical authority/custody/adversarial invariants;
- verify test coverage corresponds to source contracts rather than merely rerunning green tests;
- verify offline isolation, no duplicate state authority, no hidden runtime/storage wiring, no prose authority, no live restart path, and no P12 gate bypass;
- verify the current durable DAG accurately reflects accepted source/test state;
- stop at READY_FOR_VERIFY, REPAIR_REQUIRED, or BLOCKED;
- not start P12.
