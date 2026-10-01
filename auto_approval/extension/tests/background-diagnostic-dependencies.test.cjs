const assert = require('assert');
const { reconcileConnectorDiagnostics } = require('../connector-diagnostic-reconciler.js');
const { explainConnectorDiagnostic } = require('../connector-diagnostic-explainer.js');

assert.strictEqual(typeof reconcileConnectorDiagnostics, 'function');
assert.strictEqual(typeof explainConnectorDiagnostic, 'function');

const report = explainConnectorDiagnostic(reconcileConnectorDiagnostics({
  frontendDiagnostic: { correlationId: 'test' },
  mcpEvent: { correlationId: 'test', eventType: 'custody' },
  workspaceEvidence: null,
}));

assert.ok(report.summary);
console.log('background diagnostic dependencies tests passed');
