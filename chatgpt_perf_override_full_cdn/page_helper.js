(function () {
  if (globalThis.__CGPTPerfReact) return;

  const CFG = {
    minTurnsBeforeDefer: 24,
    keepRecentTurns: 12,
    viewportBufferPx: 1200,
    cacheMs: 120
  };

  const state = {
    expiresAt: 0,
    sections: [],
    total: 0
  };

  function refresh() {
    const now = Date.now();
    if (now < state.expiresAt) return state;
    state.sections = Array.from(document.querySelectorAll('section[data-turn-id]'));
    state.total = state.sections.length;
    state.expiresAt = now + CFG.cacheMs;
    return state;
  }

  function invalidate() {
    state.expiresAt = 0;
  }

  function isNearViewport(section) {
    if (!section || typeof section.getBoundingClientRect !== 'function') return false;
    const rect = section.getBoundingClientRect();
    const top = -CFG.viewportBufferPx;
    const bottom = (window.innerHeight || document.documentElement.clientHeight || 0) + CFG.viewportBufferPx;
    return rect.bottom >= top && rect.top <= bottom;
  }

  globalThis.__CGPTPerfReact = {
    shouldDeferTurn(turnIndex) {
      const idx = Number(turnIndex);
      if (!Number.isFinite(idx) || idx < 0) return false;
      const { sections, total } = refresh();
      if (total < CFG.minTurnsBeforeDefer) return false;
      const keepStart = Math.max(0, total - CFG.keepRecentTurns);
      if (idx >= keepStart) return false;
      const section = sections[idx];
      if (section && isNearViewport(section)) return false;
      return true;
    },
    shouldDisableHeavyMemoryRefs() {
      const { total } = refresh();
      return total >= CFG.minTurnsBeforeDefer;
    },
    invalidate
  };

  addEventListener('scroll', invalidate, { passive: true, capture: true });
  addEventListener('resize', invalidate, { passive: true });
  new MutationObserver(invalidate).observe(document.documentElement || document.body, {
    childList: true,
    subtree: true
  });
})();
