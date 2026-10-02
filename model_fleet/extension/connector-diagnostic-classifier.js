'use strict';

(() => {
  function classifyConnectorFailure(input = {}) {
    const evidence = [];

    if (!input.domDetected) {
      evidence.push('ChatGPT DOM not detected');
      return {
        state: 'CHATGPT_UI_UNAVAILABLE',
        layer: 'chatgpt',
        evidence,
        confidence: 'high',
        nextProbe: 'verify ChatGPT page load and DOM selectors',
      };
    }

    if (input.connectorSurfaceDetected === false) {
      evidence.push('ChatGPT DOM detected');
      evidence.push('connector surface not found');
      return {
        state: 'CHATGPT_UI_UNAVAILABLE',
        layer: 'chatgpt',
        evidence,
        confidence: 'medium',
        nextProbe: 'inspect connector UI selectors',
      };
    }

    if (input.connectorSurfaceDetected && input.custodyAttempted && !input.custodyResult) {
      evidence.push('connector surface detected');
      evidence.push('workspace custody failed');
      return {
        state: 'MCP_CUSTODY_FAILURE',
        layer: 'mcp',
        evidence,
        confidence: 'high',
        nextProbe: 'inspect MCP connector command history',
      };
    }

    if (input.custodyResult && input.workspaceOperationResult === false) {
      evidence.push('workspace context exists');
      evidence.push('workspace operation failed');
      return {
        state: 'WORKSPACE_OPERATION_FAILURE',
        layer: 'workspace',
        evidence,
        confidence: 'high',
        nextProbe: 'inspect workspace operation failure',
      };
    }

    if (input.domDetected && input.connectorSurfaceDetected && !input.extensionDetected) {
      evidence.push('connector UI exists');
      evidence.push('extension detection failed');
      return {
        state: 'EXTENSION_SELECTOR_FAILURE',
        layer: 'extension',
        evidence,
        confidence: 'medium',
        nextProbe: 'update DOM selectors',
      };
    }

    return {
      state: 'UNKNOWN',
      layer: 'unknown',
      evidence,
      confidence: 'low',
      nextProbe: 'collect more diagnostic evidence',
    };
  }

  globalThis.ConnectorDiagnosticClassifier = { classifyConnectorFailure };
})();
