'use strict';

// C15 canonical completed-record pruning. Projection and persistence cutover
// remain outside this bounded slice.
(function installM7C15(global) {
  const C3 = global.ModelFleetStateM7C3;
  if (!C3) throw new Error('M7 C15 requires C3');
  const clone = (value) => typeof global.structuredClone === 'function' ? global.structuredClone(value) : JSON.parse(JSON.stringify(value));
  const positive = (value) => Number.isFinite(value) && value > 0;
  function reject(reason) {
    const error = new Error(`M7 C15 pruning rejected: ${reason}`);
    error.code = 'M7_C15_REJECTED';
    error.reason = reason;
    return error;
  }
  function normalize(state) {
    try { return C3.normalizeV2(state); }
    catch (error) { throw reject(`invalid-v2-state:${error.reason || error.message}`); }
  }
  function append(state, type, text, detail, at) {
    if (!positive(at)) throw reject('invalid-prune-time');
    try { return C3.appendJournal(state, type, text, detail, at); }
    catch (error) { throw reject(`invalid-v2-result:${error.reason || error.message}`); }
  }
  function finalize(state) {
    try { return C3.finalizeV2(state); }
    catch (error) { throw reject(`invalid-v2-result:${error.reason || error.message}`); }
  }
  function clearCompletedV2(state, { at } = {}) {
    const source = normalize(state);
    if (!positive(at)) throw reject('invalid-prune-time');
    const clearedTaskIds = Object.values(source.tasks || {})
      .filter((task) => task.phase === 'done')
      .map((task) => task.id);
    const clearedMessageIds = source.messages
      .filter((message) => message.phase === 'done')
      .map((message) => message.id);
    const activeReferences = new Set();
    for (const assignment of Object.values(source.assignments || {})) {
      if (assignment.taskId && clearedTaskIds.includes(assignment.taskId)) activeReferences.add(assignment.taskId);
      for (const messageId of assignment.messageIds || []) if (clearedMessageIds.includes(messageId)) activeReferences.add(messageId);
    }
    if (activeReferences.size) throw reject('clear-completed-active-custody');
    const next = clone(source);
    for (const taskId of clearedTaskIds) delete next.tasks[taskId];
    next.messages = next.messages.filter((message) => !clearedMessageIds.includes(message.id));
    const detail = {
      clearedTaskIds: [...clearedTaskIds],
      clearedMessageIds: [...clearedMessageIds],
      clearedTaskCount: clearedTaskIds.length,
      clearedMessageCount: clearedMessageIds.length,
    };
    const journaled = append(next, 'state.pruned', 'Completed tasks/messages cleared', detail, at);
    return { state: finalize(journaled), result: detail };
  }
  global.ModelFleetStateM7C15 = Object.freeze({ clearCompletedV2 });
}(globalThis));
