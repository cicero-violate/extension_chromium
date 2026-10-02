# M7 C10 Response 02

## Candidate and scope

- Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`
- HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`
- Scope: C10 repair only; C11 was not started.
- Authoritative checkout: `/workspace/ai_sandbox/extension_chromium` tracked diff is empty.
- No browser/CDP session, live `chrome.storage`, commit, or push was used.

## Repairs

### Existing-worker topology/name parity

`upsertWorkerBindingV2` now applies `patch.topologyManaged` when the property is present, coercing it to the source boolean law; omission preserves the durable value. Existing-worker names now follow the source-compatible `patch.name || existing.name || default` law, so falsy patch names cannot erase an existing name.

### v1 delegation isolation

`registerTabC10` first performs the read-only version branch. A non-v2 state immediately delegates to the preserved legacy implementation, before any C10 `supportedTab`, window, bridge, registration page notification, or v2 mutation work. The v2 branch alone obtains the supported-tab snapshot and runs the C10 transaction.

### Committed-policy window law

Post-registration active-window work now consults `committed.state.policy.activeWorkerWindows`, returned by the successful `mutateFleet` commit, rather than the pre-transaction `loaded` snapshot. If committed policy proof is unavailable, the optional window path is skipped/fail-soft; durable registration remains successful.

## Tests and validation

- C10 focused: 9/9 pass.
- C1–C9 focused: 121/121 pass.
- M0–M6 focused: 129/129 pass.
- All `fleet-*`: 384/384 pass.
- All candidate tests: 437/437 pass.
- `node --check` changed candidate/background/fleet-worker JavaScript: pass.
- `git diff --check`: pass.
- C10 browser/hidden-time/legacy-authority scan: pass.
- v1 delegation ordering, topology/name parity, committed-policy window selection, page identity guard, and bounded post-commit cleanup checks: pass.
- Main tracked-production protection: pass.

## Candidate files changed in this repair

- `extension/background.js`
- `extension/fleet-state-model-m7-c10.js`
- `extension/tests/fleet-state-model-m7-c10.test.cjs`

Earlier accepted C1–C9 candidate artifacts remain preserved and were not reverted.

## Status

C1–C9 remain DONE. C10 is `READY_FOR_VERIFY`. M7 remains ACTIVE. C11 was not started.

READY_FOR_VERIFY
