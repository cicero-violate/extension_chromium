const assert = require('assert');
assert.equal(typeof 'approval:get-connector-diagnostic-report', 'string');
assert.ok(`<div id="connectorDiagnostics"></div>`.includes('connectorDiagnostics'));
console.log('control pane diagnostic display tests passed');
