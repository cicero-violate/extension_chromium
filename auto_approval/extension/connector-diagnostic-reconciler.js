'use strict';

function reconcileConnectorDiagnostics({ frontendDiagnostic, mcpEvent, workspaceEvidence } = {}) {
  const frontend = frontendDiagnostic || {};
  const mcp = mcpEvent || {};
  const workspace = workspaceEvidence || {};

  const hasFrontend = Boolean(frontend.correlationId || frontend.lastDomSnapshot);
  const hasMcp = Boolean(mcp.correlationId && mcp.eventType);
  const hasWorkspace = Boolean(workspace.contextId);
  const correlationMatches = hasFrontend && hasMcp
    && frontend.correlationId === mcp.correlationId;

  let state = 'INSUFFICIENT_EVIDENCE';
  if (hasFrontend && !hasMcp) state = 'FRONTEND_ONLY';
  else if (!hasFrontend && hasMcp) state = 'MCP_EVENT_ONLY';
  else if (correlationMatches && !hasWorkspace) state = 'CORRELATED_PENDING_WORKSPACE';
  else if (hasFrontend && hasMcp && hasWorkspace && correlationMatches) state = 'FULL_EVIDENCE_CHAIN';

  const missingEvidence = [];
  if (!hasFrontend) missingEvidence.push('frontendDiagnostic');
  if (!hasMcp) missingEvidence.push('mcpEvent');
  if (!hasWorkspace) missingEvidence.push('workspaceEvidence');
  if (hasFrontend && hasMcp && !correlationMatches) missingEvidence.push('matchingCorrelationId');

  return {
    correlationId: frontend.correlationId || mcp.correlationId || null,
    evidence: {
      frontend,
      mcp,
      workspace,
    },
    state,
    confidence: state === 'FULL_EVIDENCE_CHAIN' ? 'high' : state === 'INSUFFICIENT_EVIDENCE' ? 'low' : 'partial',
    missingEvidence,
  };
}

if (typeof module !== 'undefined') {
  module.exports = { reconcileConnectorDiagnostics };
}
