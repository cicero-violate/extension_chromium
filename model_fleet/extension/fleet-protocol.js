'use strict';

// M7 C20 mechanical protocol ownership split.  These are references to the
// existing background protocol functions, not replacement implementations.
(function installFleetProtocol(global) {
  const names = [
    'normalizeFleetProtocolSource', 'parseFleetOutput',
    'buildTaskPrompt', 'buildMessagePrompt', 'buildControlPrompt',
    'buildTaskPromptV2', 'buildMessagePromptV2', 'buildControlPromptV2',
    'routeParsedMessages', 'routeCoordinatorTasks', 'queueProtocolRepair',
  ];
  const functions = Object.freeze(Object.fromEntries(names.map((name) => [name, typeof global[name] === 'function' ? global[name] : null])));
  global.FleetProtocolM7C20 = Object.freeze({ version: 2, functions });
}(globalThis));
