# Post-Fixed-Point Repository Organization

Status: READY_FOR_VERIFY  
Project: `/workspace/ai_sandbox/extension_chromium/model_fleet`  
Commit: `9ed85564a50ee483498c91da4d0806fc40866c06`

## Organization

- Renamed the project directory from `auto_approval` to `model_fleet`.
- Preserved the manifest identity `Model Fleet + Approval Assistant`.
- Moved `PROBLEM.md` and `STATE_MODEL_CLEANUP_TODO.md` to
  `docs/architecture/`.
- Moved all 118 state-model response/verification reports from the external
  `/workspace/state_model_codex_reports/` directory to
  `docs/reports/state-model/`, preserving filenames and history.
- Updated README, architecture docs, and report references to the canonical
  project-relative layout.

## Cleanup and stale references

The committed v2 runtime content was not changed. The only remaining
`auto_approval` strings are historical detached-candidate paths such as
`/workspace/.tmp/auto-approval-m7-cutover/auto_approval` inside preserved
reports; those identify the immutable verification candidate and are retained
as history, not as project paths. No `/workspace/state_model_codex_reports/`
references remain.

## Verification

- All extension JavaScript files pass `node --check`.
- All renamed project tests pass with `node --test model_fleet/extension/tests/*.test.cjs`.
- Manifest-relative extension paths remain valid under
  `model_fleet/extension`.
- Runtime file hashes match the pre-organization committed snapshot.
- `git diff --check` passes.
- No chrome.storage mutation, migration, dispatch, reload, deploy, or push was
  performed.
