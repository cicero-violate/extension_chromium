# M7 C2 Response 04

## Result

C2 is `READY_FOR_VERIFY`; M7 remains `ACTIVE`. C3 was not started.

Candidate: `/workspace/.tmp/auto-approval-m7-cutover/auto_approval`  
HEAD: `02183c4668c214e2a130747ab9b9820b6272cd43`

The authoritative main checkout remains unchanged. No browser/CDP/live
storage access, dependency change, commit, or push occurred.

## Detached prompt-state law

`chooseDispatchesV2()` still evolves one private canonical `next` state as
reservations are made, so later prompt builders observe earlier reservations.
Before each external prompt-builder call, C2 now passes `clone(next)` rather
than the internal state reference. Prompt-builder mutations to goal, policy,
journal, workers, tasks, messages, assignments, or any other field therefore
cannot affect later admission, the returned state, journal composition, or
durable orchestration state. Resolved assignment/task/message/control inputs
remain detached as before. Background V2 prompt callbacks use this evolving
detached view for peer/context display.

The adversarial builder fixture mutates goal, policy, journal, worker custody,
task phase, and assignments; the resulting canonical state is identical to a
read-only-builder run apart from the prompt string, and the original input is
unchanged.

## Bounded control-notice capture

The low-level M3-equivalent reservation APIs still reserve exactly the IDs
their caller supplies. Scheduler orchestration now captures only the first
`MAX_CONTROL_NOTICES = 32` worker inbox identities in inbox order for task
piggyback, message piggyback, and control-only dispatch. Notices after C32
remain in `worker.controlInbox`; they are neither deleted nor normalized away.

The >32 fixtures verify task, message, and control-only assignments contain
C1 through C32, retain all 40 inbox notices, and preserve canonical state
validity.

## Preserved C2 contracts

The prior C2 repairs remain intact: complete state adoption before persistence,
message-batch continuation, validated public decisions and nonnegative time,
M5B availability versus M7 concrete-tab eligibility, M3 duplicate-control
scope, canonical task worker resolution, Assignment metadata parity, canonical
control feedback and peer summaries without `worker.status`, reservation
journal mapping, and V2 legacy-preflight bypass. Dispatch attempt/transport
remains C3 scope.

## Validation

- C2 focused: **17/17 pass**
- C1 focused: **18/18 pass**
- M0-M6 focused: **129/129 pass**
- all copied `fleet-*`: **289/289 pass**
- `node --check` C2, C1, and candidate `background.js`: pass
- `git diff --check`: pass
- C2 Chrome/hidden-time/legacy-authority source scans: pass
- authoritative main tracked production protection check: pass

## Candidate status

Only the detached candidate contains the C2 background overlay and C2 module
and test artifacts; copied C1/M0-M6 artifacts remain preserved. No C3 work
was started.

`C2 READY_FOR_VERIFY`  
`M7 ACTIVE`  
`M8/M9 TODO`

Blocker: none.
