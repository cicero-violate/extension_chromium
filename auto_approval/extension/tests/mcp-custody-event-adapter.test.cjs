'use strict';

const assert = require('assert');
const { adaptMcpCustodyEvent } = require('../mcp-custody-event-adapter.js');

const valid = adaptMcpCustodyEvent({
  correlationId: 'corr-1',
  eventType: 'custody.created',
  contextId: 'ctx-1',
  accessMode: 'isolated_mutation',
  success: true,
});

assert.strictEqual(valid.ok, true);
assert.strictEqual(valid.message.type, 'approval:mcp-custody-event');
assert.strictEqual(valid.message.payload.contextId, 'ctx-1');
assert.strictEqual(valid.message.payload.accessMode, 'isolated_mutation');

assert.deepStrictEqual(
  adaptMcpCustodyEvent({ eventType: 'custody.created' }),
  { ok: false, error: 'invalid_mcp_custody_event' },
);

assert.deepStrictEqual(
  adaptMcpCustodyEvent({ correlationId: 'corr-1' }),
  { ok: false, error: 'invalid_mcp_custody_event' },
);

console.log('mcp custody event adapter tests passed');
