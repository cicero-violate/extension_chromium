'use strict';

// M7 C20 mechanical state ownership split.  This registry only names the
// already-loaded accepted contracts; it does not add a transition or storage
// path and does not copy mutable authority.
(function installFleetState(global) {
  const names = [
    'ModelFleetStateM7C1', 'ModelFleetStateM7C2', 'ModelFleetStateM7C3',
    'ModelFleetStateM7C4', 'ModelFleetStateM7C5', 'ModelFleetStateM7C6',
    'ModelFleetStateM7C7', 'ModelFleetStateM7C8', 'ModelFleetStateM7C9',
    'ModelFleetStateM7C10', 'ModelFleetStateM7C11', 'ModelFleetStateM7C12',
    'ModelFleetStateM7C13', 'ModelFleetStateM7C14', 'ModelFleetStateM7C15',
    'ModelFleetStateM7C16', 'ModelFleetStateM7C17', 'ModelFleetStateM7C18',
    'ModelFleetStateM7C19',
  ];
  const contracts = Object.freeze(Object.fromEntries(names.map((name) => [name, global[name] || null])));
  global.FleetStateM7C20 = Object.freeze({ version: 2, contracts });
}(globalThis));
