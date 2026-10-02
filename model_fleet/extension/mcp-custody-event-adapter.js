'use strict';

function adaptMcpCustodyEvent(sourceEvent) {
  if (!sourceEvent || typeof sourceEvent !== 'object') {
    return { ok: false, error: 'invalid_mcp_custody_event' };
  }

  const { correlationId, eventType, contextId, accessMode, success } = sourceEvent;

  if (!correlationId || !eventType) {
    return { ok: false, error: 'invalid_mcp_custody_event' };
  }

  return {
    ok: true,
    message: {
      type: 'approval:mcp-custody-event',
      payload: {
        correlationId,
        eventType,
        contextId,
        accessMode,
        success,
      },
    },
  };
}

if (typeof module !== 'undefined') {
  module.exports = { adaptMcpCustodyEvent };
}
