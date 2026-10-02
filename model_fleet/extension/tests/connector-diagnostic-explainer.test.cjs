const assert = require('assert');
const { explainConnectorDiagnostic } = require('../connector-diagnostic-explainer.js');

assert.equal(explainConnectorDiagnostic({ state: 'FRONTEND_ONLY' }).summary, 'Frontend evidence exists, but no MCP custody evidence is attached.');
assert.equal(explainConnectorDiagnostic({ state: 'MCP_EVENT_ONLY' }).summary, 'MCP event exists, but no matching frontend diagnostic exists.');
assert.equal(explainConnectorDiagnostic({ state: 'CORRELATED_PENDING_WORKSPACE' }).summary, 'Frontend and MCP evidence share a correlation ID. Workspace evidence is missing.');
assert.equal(explainConnectorDiagnostic({ state: 'FULL_EVIDENCE_CHAIN' }).summary, 'Frontend, MCP, and workspace evidence are present for this correlation.');
assert.equal(explainConnectorDiagnostic({ state: 'INSUFFICIENT_EVIDENCE' }).summary, 'Not enough evidence exists to explain this diagnostic.');

console.log('connector diagnostic explainer tests passed');
