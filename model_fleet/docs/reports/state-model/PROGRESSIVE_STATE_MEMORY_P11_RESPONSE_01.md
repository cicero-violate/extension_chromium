# Progressive State Memory P11 — Independent Source/Test Verification 01

Status: DONE_ACCEPTED
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`
Verified repository HEAD: `dd554105f66981db42475eb9e8855f7c171e1702`
Verified: 2026-10-03
Production changes made by P11: none

## Verdict

P11 independent source/test verification is DONE_ACCEPTED.

P1-P10 source contracts, test behavior, authority boundaries, compaction/restart provenance, storage isolation, and offline/runtime separation were verified directly from current source rather than accepted from prior prose reports.

P12 remains PENDING and operator-gated. `live_restart_authorized` remains false.

## Independent execution evidence

- P1-P10 test suite: **93/93 PASS**, zero failures/skips.
- Full extension test suite: **397/397 PASS**, zero failures/skips.
- All P1-P9 production PSM sources: `node --check` PASS.
- `git diff --check`: PASS.
- Durable DAG assertions: PASS.
- Current repository HEAD remained `dd554105f66981db42475eb9e8855f7c171e1702` during P11 verification.

## Authority/dependency audit

Observed dependency direction is one-way and earlier-authority-only:

- P1: no PSM dependency.
- P2 -> P1.
- P3 -> P2.
- P4 -> P3 + P1 validation vocabulary.
- P5 -> P4.
- P6 -> P5 + Web Crypto/TextEncoder.
- P7 -> P1 + P5 + P6.
- P8 -> P7 + Web Crypto/TextEncoder.
- P9 -> P4 + P5 + P6 + P7 + P8.

No module references a later PSM stage as semantic authority.

## Runtime/isolation audit

Corrected repository-wide scan found zero references to:
- `ProgressiveStateMemoryM7P1..P9`;
- `modelFleetPsmLedger:v1`;
- PSM source filenames

outside the isolated PSM source/test/documentation area.

PSM production sources contain no direct:
- `chrome.*`;
- `fetch`;
- `XMLHttpRequest`;
- Node `require`/`module.exports`;
- filesystem APIs;
- connector APIs;
- `Date.now`;
- `Math.random`;
- live reload/restart wiring.

P1 intentionally exposes an injected storage adapter, but it has no direct runtime/chrome binding.

## P1 injected-storage direct proof

Independent in-memory adapter:
- append -> persisted ledger -> load round-trip: exact;
- storage key: exactly `modelFleetPsmLedger:v1`;
- observed calls: get, set, get;
- load key override: rejected `storage-key-override-forbidden`;
- save key override: rejected `storage-key-override-forbidden`.

This proves the P1 persistence boundary is dependency-injected rather than live-wired.

## Direct low-level API verification

Exports that stage tests primarily exercise indirectly were invoked directly:

- P6 `verifyCompactionLinkV2`: exact verified compaction digest PASS.
- P6 `verifyCompactedMerkleChainV2`: root/tip recomputation PASS.
- P7 `validateCompactionContinuityV1`: PASS.
- P7 `continuityIdentity`: exactly equals P6 committed provenance identity.
- P9 `buildAndRenderRestartBootstrapV1`: PASS.
- rendered P9 byteLength equals exact UTF-8 encoded serialized length.
- separately validating the rendered bootstrap against chain + reality + continuity: PASS.

## P10 critical custody falsifier re-verified during P11

Against an honest compacted P6 V2 root:
- rewritten P7 continuity with recomputed continuity SHA-256: rejected by root commitment;
- recomputed V2 receipt with unchanged honest compacted root: rejected;
- P9 cannot build from the rewritten sidecar;
- rebuilding a forged compacted chain produces different root and tip;
- an honest bootstrap rejects against the substituted forged chain;
- generation-positive plain P6 V1 roots are rejected by P7/P9.

This confirms P10's final repair is represented by source behavior, not only by its test assertions.

## Source/test byte manifest

Production:
- P1 `c272a8e61158cc7bf71f2cad50e346584b1c49f83c59df878a436fc78b207a5b`
- P2 `e49fa225d85290a0b75a405bd88ebb1cd049417aca04bcf2890f7635b8d7d474`
- P3 `5d201ba7cd3ad18fef1b07a49a73ba4bb819cf6a6b93d9e10f7155dc1cbd933e`
- P4 `319288cfee2c226786889dcdbfdbe6e0bd76922bed2afc709e0ea1120c3bcf9f`
- P5 `bb25e59d0937e3fb88ae4036876bba5c91ee7be56f32d50bd426a45c2378bb8d`
- P6 `fcf92e937bcf92c876ae97ce15191f291df98a4a5406464802f2aee2bac3e71d`
- P7 `8b6df42a92aa7586313f123d4d3500ae54825168c1d20b3f605e1bd84917e6b2`
- P8 `84d68a59c38875a576c657a2059c67688378d048892f5bf5fc56ef7176f10ed7`
- P9 `0e15369c53f416914461f62b5e615cc1ba436076848f6e04d31642d9834e0157`

Stage tests:
- P1 `e900d4ad86f589244dcf74ab5d1d06c73fcb1391a88d363252fdb6f93b670503`
- P2 `8c04ecd0c9b9047a4a48da8795c81d18a561f836b80b0d58fbdbcc1f038064c3`
- P3 `6f343abfd91c64da06139ee20704cd35970b837c134fd21c5470780cb9a6a0e2`
- P4 `89c65b010c0c15afddbec5b418257ae81990a34d8a0673240d2a4cab8de56f03`
- P5 `06091b05f275f6061c00f696749e52fcfa3081f20da78a10e876ab3595fb839f`
- P6 `92f1ad9d2968b4b01e74fb2896419cb20199f82600c61156f6ea91b879e5ba65`
- P7 `792f5d783851999fa20e6b75aa66a84e6df65eec3657e40795571f2686a32b98`
- P8 `77c728cad146c3e18c2232e41751aa053c54751ef4905571e8fc733bb6ec0b0f`
- P9 `96b984b733a1ba9c36098766878319fc42c0c7dbb2ad136066eb1fe89d3ee453`
- P10 adversarial `6cd32ada0317c9b7a7be0d835be1892fef8b5e07decd5b6392ea75c815bbde90`

## Git custody caveat / P12 precondition

The PSM production and stage-test files are currently **untracked** in Git. Therefore repository HEAD does not itself identify their bytes.

This does not invalidate P11's direct source/test verification, because the exact bytes verified above are explicitly hashed. It does create a strict P12 precondition:

Before any live restart proof, re-hash the PSM production/test files and require exact equality with this P11 manifest, or bind an explicitly committed equivalent. Any drift must fail closed and require renewed P11 verification.

P12 must not claim that HEAD alone identifies the PSM implementation while these files remain untracked.

## Non-blocking source hygiene finding

`extension/progressive-state-memory-m7-p7.js` internally names its installer function `installProgressiveStateMemoryP6` even though it installs `ProgressiveStateMemoryM7P7`.

This has no semantic/runtime effect because the IIFE name is local and the exported global is correct. It is recorded as naming hygiene, not an acceptance blocker. Any future production edit to fix it must trigger the normal source-hash/test verification path before P12.

## P12 boundary

P12 is the operator-gated live restart proof.

P11 does not authorize P12. Required before P12 execution:
1. explicit operator authorization;
2. exact P11 source/test hash-manifest match (or an explicitly accepted committed equivalent);
3. current repository/project reality reconciliation;
4. `live_restart_authorized=true` set only under that explicit gate;
5. no inferred next action: the accepted bootstrap remains `nextAction=null` / `not-encoded-by-p2-p3` until a later authoritative mechanism supplies one.

No runtime, storage, reload, browser navigation, live restart, commit, push, merge, or deploy action was performed by P11.
