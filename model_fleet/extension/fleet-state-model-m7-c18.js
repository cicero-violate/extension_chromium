'use strict';

// C18 is the final persistence connection for the bounded M7 candidate. It
// delegates schema, quiescence, migration, and v2 invariant authority to C1;
// this adapter owns only the storage-key transition and legacy-key retirement.
(function installM7C18(global) {
  const C1 = global.ModelFleetStateM7C1;
  if (!C1) throw new Error('M7 C18 requires C1');

  const V1_STORAGE_KEY = C1.V1_STORAGE_KEY;
  const V2_STORAGE_KEY = C1.V2_STORAGE_KEY;

  function reject(reason) {
    const error = new Error(`M7 C18 persistence rejected: ${reason}`);
    error.code = 'M7_C18_REJECTED';
    error.reason = reason;
    return error;
  }

  function validTime(value) { return Number.isFinite(value) && value > 0; }

  function storageAdapter(storage) {
    if (!storage || typeof storage.get !== 'function' || typeof storage.set !== 'function') {
      throw reject('invalid-storage-boundary');
    }
    return storage;
  }

  async function loadFleetStateV2(storage, {
    liveHeartbeats = [],
    pendingCompletionHandoff = false,
    createdAt,
    migrationObservedAt,
    conversionAt,
  } = {}) {
    const target = storageAdapter(storage);
    const v2Stored = await target.get([V2_STORAGE_KEY]);
    if (v2Stored && v2Stored[V2_STORAGE_KEY] !== undefined) {
      return {
        state: C1.normalizeV2FleetState(v2Stored[V2_STORAGE_KEY]),
        migrated: false,
        writes: 0,
        retiredLegacy: false,
      };
    }

    const v1Stored = await target.get([V1_STORAGE_KEY]);
    if (v1Stored && v1Stored[V1_STORAGE_KEY] !== undefined) {
      if (!validTime(migrationObservedAt)) throw reject('migration-observed-at-required');
      const state = C1.migrateFleetStateV1ToV2({
        state: v1Stored[V1_STORAGE_KEY],
        liveHeartbeats,
        pendingCompletionHandoff,
        migrationObservedAt,
        conversionAt: validTime(conversionAt) ? conversionAt : migrationObservedAt,
      });
      await target.set({ [V2_STORAGE_KEY]: state });
      let retiredLegacy = false;
      if (typeof target.remove === 'function') {
        await target.remove([V1_STORAGE_KEY]);
        retiredLegacy = true;
      }
      return { state, migrated: true, writes: 1, retiredLegacy };
    }

    if (!validTime(createdAt)) throw reject('fresh-created-at-required');
    const state = C1.freshFleetStateV2({ createdAt });
    await target.set({ [V2_STORAGE_KEY]: state });
    return { state, migrated: false, fresh: true, writes: 1, retiredLegacy: false };
  }

  async function saveFleetStateV2(storage, state) {
    const target = storageAdapter(storage);
    const normalized = C1.normalizeV2FleetState(state);
    await target.set({ [V2_STORAGE_KEY]: normalized });
    return normalized;
  }

  global.ModelFleetStateM7C18 = Object.freeze({
    V1_STORAGE_KEY,
    V2_STORAGE_KEY,
    loadFleetStateV2,
    saveFleetStateV2,
  });
}(globalThis));
