'use strict';

function explainConnectorDiagnostic(reconciled) {
  const input = reconciled || {};
  const state = input.state || 'INSUFFICIENT_EVIDENCE';
  const findings = [];
  let summary = 'Not enough evidence exists to explain this diagnostic.';
  let nextProbe = 'Collect additional evidence.';

  if (state === 'FRONTEND_ONLY') {
    summary = 'Frontend evidence exists, but no MCP custody evidence is attached.';
    findings.push('ChatGPT DOM diagnostic received', 'No MCP event correlated');
    nextProbe = 'Obtain MCP custody event';
  } else if (state === 'MCP_EVENT_ONLY') {
    summary = 'MCP event exists, but no matching frontend diagnostic exists.';
    findings.push('MCP event received', 'No frontend diagnostic correlated');
    nextProbe = 'Obtain frontend diagnostic evidence';
  } else if (state === 'CORRELATED_PENDING_WORKSPACE') {
    summary = 'Frontend and MCP evidence share a correlation ID. Workspace evidence is missing.';
    findings.push('Frontend evidence correlated', 'MCP evidence correlated', 'Workspace evidence unavailable');
    nextProbe = 'Obtain workspace evidence';
  } else if (state === 'FULL_EVIDENCE_CHAIN') {
    summary = 'Frontend, MCP, and workspace evidence are present for this correlation.';
    findings.push('Frontend evidence present', 'MCP evidence present', 'Workspace evidence present');
    nextProbe = 'Review evidence details';
  } else {
    findings.push('Insufficient correlated evidence');
  }

  return {
    summary,
    findings,
    missingEvidence: input.missingEvidence || [],
    nextProbe,
  };
}

if (typeof module !== 'undefined') {
  module.exports = { explainConnectorDiagnostic };
}
