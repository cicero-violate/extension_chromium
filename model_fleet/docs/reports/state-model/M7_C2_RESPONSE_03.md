# M7 C2 Response 03

## Result

C2 is `READY_FOR_VERIFY`; M7 remains `ACTIVE`. C3 was not started.

Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`  
HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`

The authoritative checkout remains unchanged. No browser/CDP/live
`chrome.storage` access, dependency change, commit, or push occurred.

## Exact fixes

- Control notice validation now matches M3: requested IDs must be unique and
  present; duplicate inbox identities reject only when the duplicated identity
  is requested. Unrelated duplicate inbox notices do not block another
  requested notice.
- Public `taskRunnable()` resolves the supplied worker by ID from canonical
  `state.workers` after normalization. Forged worker objects, unknown IDs, and
  missing worker identity are rejected; the private scheduler path continues
  using its already canonical worker object.
- All three reservation primitives accept `metadata`, deep-clone it into the
  canonical Assignment, and preserve M3 metadata parity without mutating the
  input.
- `chooseDispatchesV2()` now supplies each prompt builder both resolved prompt
  inputs and the evolving post-reservation canonical state. Background C2
  prompt wrappers use that state for peer/sender/worker context. A later
  dispatch therefore sees earlier reservations, while prompt building remains
  read-only.

## Parity probes

- Requested duplicate control notice rejects; unrelated duplicate notice does
  not block the requested notice.
- Task, message, and control Assignment metadata deep-equals M3 output and
  caller metadata remains unchanged.
- Canonical review-worker resolution rejects forged and missing workers and
  preserves M5A independence behavior.
- Two task dispatches produce prompts observing one then two canonical
  assignments (`T1:1`, `T2:2`) while the source state remains immutable.
- Existing C2 probes continue to cover complete state adoption before
  persistence, multi-worker message-batch continuation, validated public
  availability/eligibility, nonnegative time, M5B-vs-M7 tab binding,
  canonical control feedback, v2 peer summaries without `worker.status`,
  reservation journals, and v2 legacy-preflight bypass.

## Counts and scans

- C2 focused: **15/15 pass**
- C1 focused: **18/18 pass**
- M0-M6 focused: **129/129 pass**
- all copied `fleet-*`: **287/287 pass**
- `node --check` C2, C1, and candidate `background.js`: pass
- `git diff --check`: pass
- C2 Chrome/hidden-time/legacy-authority source scan: pass
- v2 background adoption, evolving prompt-state, preflight, journal, and
  canonical control-selection scans: pass

## Candidate status and protection

Candidate status contains the intended C2 candidate `background.js` overlay and
the copied C1/C2/M0-M6 artifacts/tests. No unrelated files were removed.
The authoritative main checkout's tracked production files remain unchanged.

C2 low-level reservation primitives remain M3 custody-equivalent operations;
they do not enforce dispatch eligibility. Scheduler orchestration owns
eligibility and invokes them only after its canonical v2 checks.

`C2 READY_FOR_VERIFY`  
`M7 ACTIVE`  
`M8/M9 TODO`

Blocker: none.
