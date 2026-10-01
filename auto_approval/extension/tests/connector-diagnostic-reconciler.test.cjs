const assert = require('assert');
const { reconcileConnectorDiagnostics } = require('../connector-diagnostic-reconciler.js');

assert.strictEqual(
  reconcileConnectorDiagnostics({ frontendDiagnostic: { correlationId: 'a' } }).state,
  'FRONTEND_ONLY'
);

assert.strictEqual(
  reconcileConnectorDiagnostics({ mcpEvent: { correlationId: 'a', eventType: 'custody' } }).state,
  'MCP_EVENT_ONLY'
);

assert.strictEqual(
  reconcileConnectorDiagnostics({
    frontendDiagnostic: { correlationId: 'a' },
    mcpEvent: { correlationId: 'a', eventType: 'custody' },
  }).state,
  'CORRELATED_PENDING_WORKSPACE'
);

assert.strictEqual(
  reconcileConnectorDiagnostics({
    frontendDiagnostic: { correlationId: 'a' },
    mcpEvent: { correlationId: 'a', eventType: 'custody' },
    workspaceEvidence: { contextId: 'ctx' },
  }).state,
  'FULL_EVIDENCE_CHAIN'
);

assert.strictEqual(
  reconcileConnectorDiagnostics({
    mcpEvent: { eventType: 'custody' },
  }).state,
  'INSUFFICIENT_EVIDENCE'
);

console.log('connector diagnostic reconciler tests passed');
