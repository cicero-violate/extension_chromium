'use strict';

// M7 C19 is the bounded post-C18 authority proof.  Legacy fields and the v1
// reader remain available only for the one-time C1 migration/compatibility
// boundary; this module prevents them from becoming runtime v2 authority.
(function installM7C19(global) {
  function clone(value) {
    return global.structuredClone(value);
  }

  function blocked(reason) {
    const error = new Error(`M7 C19 authority boundary: ${reason}`);
    error.code = 'M7_C19_BLOCKED';
    error.reason = reason;
    return error;
  }

  function c1() {
    const model = global.ModelFleetStateM7C1;
    if (!model) throw blocked('c1-unavailable');
    return model;
  }

  function assertV2State(state) {
    if (!state || state.version !== 2) throw blocked('v2-state-required');
    return c1().normalizeV2FleetState(state);
  }

  function inspectRuntimeSource(source) {
    if (typeof source !== 'string') throw blocked('background-source-required');
    const marker = source.indexOf("importScripts('fleet-state-model-m7-c19.js')");
    if (marker < 0) throw blocked('c19-import-missing');
    const before = source.slice(0, marker);
    const tail = source.slice(marker);
    const forbidden = [
      /chrome\.storage\.local\.(set|remove)\s*\(/,
      /\bworker\.status\b|\bworker\.heartbeatAt\b|\bworker\.busy\b/,
      /\bcurrentTaskId\b|\bcurrentMessageId\b|\bcurrentMessageIds\b|\bcurrentControlNoticeIds\b/,
      /\btask\.status\b|\bmessage\.status\b|\btask\.assignmentId\b|\bmessage\.assignmentId\b/,
      /publicSnapshot\s*\(/,
    ];
    const violation = forbidden.find((pattern) => pattern.test(tail));
    if (violation) throw blocked(`runtime-v2-legacy-authority:${violation}`);
    if (!/loadFleetState\s*=\s*loadFleetStateC19/.test(tail)) throw blocked('c19-load-not-bound');
    if (!/saveFleetStateC18\s*=\s*saveFleetStateC19/.test(tail)) throw blocked('c19-save-not-bound');
    if (!/mutateFleet\s*=\s*function mutateFleetC18/.test(before)) throw blocked('c18-mutate-boundary-missing');
    return Object.freeze({ marker, runtimeTailLength: tail.length, legacyAuthorityViolations: 0 });
  }

  global.ModelFleetStateM7C19 = Object.freeze({
    assertV2State,
    inspectRuntimeSource,
    clone,
  });
}(globalThis));
