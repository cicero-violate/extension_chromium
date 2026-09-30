# Model Fleet message-dispatch problem

## Symptom

Messages sent from the Model Fleet Control pane through the Natural-Language Bus are accepted by the extension, but delivery to a ChatGPT worker is unreliable:

- Some messages remain `QUEUED` even though the selected worker appears `IDLE`.
- A message can become `RUNNING`, while the ChatGPT tab does not visibly complete the turn.
- Later messages to the same worker remain queued behind the running assignment.
- Older assignments can reappear after dispatch is resumed because they were still stored as queued work.
- The per-worker `Cancel / clear` control was difficult to use because it appeared and disappeared during state updates.

## Evidence

The worker-to-worker routing tests succeeded, and the ChatGPT tab’s popup send action worked. Therefore the problem is specifically in the operator-message dispatch and assignment-completion path, not the basic ChatGPT composer or semantic message storage.

Observed state examples:

- `operator → W-1043671400: hi` became `RUNNING`.
- `operator → W-1043671400: tes3` remained `QUEUED` behind it.
- The control pane reported healthy workers and enabled dispatch while queued messages were present.

## Likely failure boundaries

1. The operator send path originally started `schedule()` fire-and-forget and discarded scheduler errors.
2. A failed or delayed worker activation could therefore leave a message looking permanently queued without an explanation in the UI.
3. Once an assignment was running, completion depended on the worker-side DOM monitor observing a changed assistant response and its terminal `FLEET_STATUS` marker.
4. The original worker monitor timeout was too short for slow model/tool turns.

## Changes made

- Added a stable **Stop & flush worker work** action that pauses dispatch, cancels active assignments, and cancels queued worker messages.
- Scheduler failures are now recorded in the Journal as `schedule.failed`.
- Operator sends wait through the scheduler reservation phase and retry admission several times.
- Increased the worker response-start timeout from 20 seconds to 2 minutes.
- Increased the quiet-response fallback from 30 seconds to 1 minute.

## Remaining verification

Reload the unpacked extension, clear any stale running assignment with **Stop & flush worker work**, then click **Resume dispatch** before sending one fresh message. **Stop & flush worker work intentionally leaves dispatch paused.** Confirm that:

1. The target ChatGPT tab visibly receives and submits the prompt.
2. The assignment changes from `RUNNING` to `DONE`.
3. The next queued message is then dispatched.
4. If dispatch fails, the Journal contains the concrete `schedule.failed` or `dispatch.failed` reason.


## Root cause fixed

The fleet worker was using a legacy-only assistant selector:

- fleet-worker.js only observed data-message-author-role=assistant.
- Current ChatGPT DOM uses .turn-action-controls as the durable completed-assistant-turn boundary; content.js already handled this, but the fleet worker did not.
- Therefore the prompt could send successfully while the fleet monitor never observed the new assistant turn, leaving the assignment RUNNING.
- The old response fingerprint also used only text, so two consecutive assistant turns with identical text were indistinguishable.
- The old streaming selector matched any enabled button whose aria-label contained stop, which could falsely suppress timeout recovery.

Fix:

- Fleet completion now uses the same current-DOM assistant boundary as content.js, with the legacy role selector retained as fallback.
- New-turn identity is part of the fingerprint, so identical response text on a new turn is still detected.
- DOM mutations trigger a throttled rescan, while quiet time advances only when assistant output actually changes.
- Streaming detection is restricted to ChatGPT's composer stop control.
- Added tests/fleet-worker-turn-detector.test.cjs to lock these invariants.


## Live failure found after resume

Chromium extension storage exposed the exact repeated transport error:

Error: Error: ChatGPT prompt composer was not found

The worker wake and bridge path were succeeding. fleet-worker.js had an older composer adapter than content.js and did not recognize the current contenteditable role=textbox / aria-multiline ChatGPT composer.

The failure handler also immediately requeued the same targeted message and called the scheduler again, creating a tight retry storm. dispatch.failed stored the real error in event.detail.error, but the control pane discarded that detail, so the UI hid the root cause.

Fix:

- Fleet worker now uses the current composer selectors, ProseMirror-aware write/verification path, and current send-button selectors already proven in content.js.
- A dispatch transport failure now fail-closes the target worker as blocked while leaving its targeted message queued.
- Re-registering/reconciling the worker clears the block after the bridge is healthy.
- Public snapshots preserve blocked instead of incorrectly projecting it as idle.
- Journal renders detail.error, and the Exceptions panel shows lastDispatchError.


## Live write-verifier mismatch

After the current composer selectors were deployed, a live dispatch reached the real ProseMirror editor. The assignment text was present in the composer and the Send button was enabled, but the worker reported "ChatGPT rejected the programmatic composer write".

This was a verifier false negative: ProseMirror's rendered whitespace/newline representation differed from the source string, while content and token order were preserved.

Fix:

- Both content.js and fleet-worker.js now use the same two-level composer comparison.
- Exact normalized text remains the first authority.
- If exact formatting differs, a canonical comparison collapses whitespace only; punctuation, characters, and token order must still match.
- Existing non-matching user text is still never overwritten.


## Live response-boundary contamination

The first successful end-to-end dispatch exposed a final parsing defect. Current ChatGPT renders the completed turn group as separate transcript blocks:

- first block: "You said:" plus the submitted fleet prompt;
- last block: "ChatGPT said:" plus the actual assistant response;
- sibling: .turn-action-controls.

The fleet monitor was reading the whole group. Because the fleet prompt itself documents an example FLEET_MESSAGE to W-123, the parser treated that prompt example as real assistant output and routed a false undeliverable message.

Fix:

- Current-DOM response capture now selects only the final semantic response block before the action controls.
- Prompt echoes are excluded before parseFleetOutput.
- Legacy data-message-author-role=assistant remains the fallback for older ChatGPT DOM.


## Final live proof

After the response-boundary fix was loaded into the live Chromium worker, a fresh semantic message was queued as M-208 with body:

Reply exactly with: FLEET_BOUNDARY_FINAL_OK

Observed end-to-end transition:

- M-208 queued.
- A-M-M-208-330518 dispatch attempted.
- Worker W-1043671402 woke in its persistent window.
- Dispatch was accepted.
- M-208 completed.
- Captured response was exactly the current assistant response block: ChatGPT said / FLEET_BOUNDARY_FINAL_OK.
- assignment.parsed reported 0 semantic messages.
- nextMessage remained 209 and no message with id greater than M-208 existed, proving the prompt's documented FLEET_MESSAGE to W-123 example was not routed.

Final invariant:

QUEUED -> DISPATCHED -> ACCEPTED -> DONE, with no prompt-echo contamination and no retry storm.

## Long-running turn race fixed

A second live issue was found after the earlier completion fixes: a worker could still be released while ChatGPT was visibly generating. The quiet-response fallback was evaluated before the active Stop-control guard. On long tool/model turns, that could mark the assignment complete and let the scheduler send another queued fleet message into the same tab.

Fix:

- Active ChatGPT generation is now authoritative: while the visible usable composer Stop control is present, the worker cannot complete or auto-recover the assignment.
- The background scheduler independently checks the target ChatGPT page before every reserved dispatch. If a live Stop control is present, the message stays queued and is not sent.
- A deferred preflight does not consume a task attempt.
- The scheduler now records reservation separately from actual accepted send (`message.reserved` / `task.reserved`, then `message.sent` / `task.started`).
- Every assignment attempt has a hard 15-minute ceiling, even while ChatGPT still shows the Stop control. At the ceiling the extension clicks Stop and requests bounded automatic recovery.
- If no response starts within 2 minutes, the assignment may be automatically recovered.
- The old 20-minute post-stream stall window is superseded by the hard 15-minute per-attempt ceiling.
- Automatic recovery is bounded to one resend. A second recovery failure is terminally blocked instead of creating an infinite resend loop.
- Unrelated DOM mutations no longer reset the one-minute quiet fallback; only an actual assistant-response change starts that settle timer.

Live proof:

- A synthetic visible Stop control was inserted into worker `W-1043671402`.
- Test message `M-239` was reserved repeatedly but remained `QUEUED`; the Journal recorded `dispatch.deferred_active_turn`, and the message text did not appear in the ChatGPT transcript.
- After the synthetic Stop control was removed, the same message was admitted and sent.
- ChatGPT returned `BUSY_GUARD_TEST_OK`.
- `M-239` transitioned to `DONE`, and `W-1043671402` returned to `IDLE` with no current assignment.

Long-turn invariant:

`ACTIVE STOP CONTROL => NO COMPLETION + NO NEW SEND`

`IDLE/COMPLETE => NEXT QUEUED MESSAGE MAY DISPATCH`


## Hard 15-minute assignment ceiling

The operator chose a hard ceiling because the ChatGPT website can remain visually active while internally stalled.

Policy:

- One assignment attempt may run for at most 15 minutes from successful prompt submission.
- The limit applies even if the visible Stop control is still present.
- At 15 minutes the fleet worker clicks the current Stop control and reports an automatic-recovery cancellation.
- The original assignment is requeued once.
- The retry gets its own 15-minute ceiling.
- If the retry also reaches the ceiling, recovery is exhausted and the item becomes blocked rather than being resent again.

This replaces the previous unlimited-active-turn policy.

## Peer-routing format repair

A completed worker turn could contain evidence of an intended peer message (including a malformed or closing-only `FLEET_MESSAGE` marker) while producing zero valid routable envelopes. Previously the assignment could still close as DONE, leaving the intended peer uninformed.

The routing boundary now enforces bounded repair:

- opening or closing `FLEET_MESSAGE` markers are recognized as routing intent;
- malformed envelopes with zero parsed messages are a routing failure;
- self-targets and invalid/disabled worker targets are routing failures;
- successfully parsed peer messages are durably queued before the source worker is released;
- on routing failure, the scheduler sends one corrective message back to the same agent;
- the corrective message explicitly says not to redo the underlying work and to re-emit only the failed peer delivery using exact `FLEET_MESSAGE` formatting and a registered `W-...` target;
- the repair response itself must produce at least one valid routed fleet message;
- one repair attempt is allowed; repair failure is then BLOCKED and surfaced to the operator instead of looping.

Invariant:

`PEER MESSAGE MARKER => VALID DURABLE ROUTE OR BOUNDED FORMAT-REPAIR`


## Two-minute duplicate resend removed

A leftover pre-15-minute recovery path still resent a fleet assignment after 120 seconds when no response/streaming state had been detected. This contradicted the hard 15-minute policy and could duplicate a still-running ChatGPT request.

Fix:

- the 120-second fleet start-timeout resend path was removed entirely;
- a fleet assignment now remains owned by the same worker until completion or the hard 15-minute ceiling;
- the generic page-level "message delivery timed out" auto-resender now refuses to resend prompts beginning with `MODEL FLEET ASSIGNMENT` or `MODEL FLEET MESSAGE`; those are exclusively governed by fleet retry policy.

Invariant:

`FLEET ASSIGNMENT => NO AUTOMATIC DUPLICATE SEND BEFORE 15-MINUTE HARD CEILING`

## Disabled Send button no longer drops fleet delivery

A fleet assignment could be written into the ChatGPT composer while the Send button was temporarily unavailable. The worker waited only five seconds for the button, then rejected dispatch even though the prompt remained staged in the composer and the button could become usable later.

Fix:

- assignment custody is acknowledged before waiting for the Send button;
- the worker enters a `preparing` phase and remains busy, so no other fleet message can collide with the staged prompt;
- the staged prompt waits for Send readiness for the remaining 15-minute assignment budget instead of a five-second window;
- the response baseline is captured immediately before the actual Send click;
- only after Send is clicked does the assignment enter the normal response-monitoring phase;
- a true pre-send failure uses the same bounded one-recovery policy, not an unbounded retry loop;
- the hard 15-minute ceiling includes both preparation time and model execution time.

Invariant:

`FLEET ASSIGNMENT CUSTODY => WAIT FOR SEND READINESS => SEND => MONITOR RESPONSE`
