(() => {
  const HANDLE_ID = '__drag';
  const PANEL_MARK = 'data-chatgpt-right-panel-resizer';
  const state = {
    cleanup: null,
    observer: null,
    raf: 0,
    resizeBound: false,
    intervalId: null,
    currentPanel: null,
  };

  function findActivityPanel() {
    const hit = [...document.querySelectorAll('body *')].find(
      (e) => e.textContent?.trim() === 'Activity'
    );
    let p = hit;
    while (p && p !== document.body) {
      const r = p.getBoundingClientRect();
      if (r.width > 280 && r.height > 200 && r.right > innerWidth * 0.6) break;
      p = p.parentElement;
    }
    if (!p || p === document.body) return null;
    return p;
  }

  function removeExistingHandle() {
    document.getElementById(HANDLE_ID)?.remove();
  }

  function cleanupCurrent() {
    removeExistingHandle();
    if (typeof state.cleanup === 'function') {
      try {
        state.cleanup();
      } catch (_) {}
    }
    state.cleanup = null;
    state.currentPanel = null;
  }

  function installOnPanel(p) {
    const oldCssText = p.style.cssText;
    const r = p.getBoundingClientRect();

    p.setAttribute(PANEL_MARK, '1');
    Object.assign(p.style, {
      position: 'fixed',
      right: '0px',
      left: 'auto',
      top: `${r.top}px`,
      width: '42vw',
      minWidth: '360px',
      maxWidth: '75vw',
      height: `${Math.max(240, innerHeight - r.top)}px`,
      margin: '0',
      flex: '0 0 auto',
      overflow: 'auto',
      zIndex: '2147483646',
      background: getComputedStyle(p).backgroundColor || 'white'
    });

    const h = document.createElement('div');
    h.id = HANDLE_ID;
    Object.assign(h.style, {
      position: 'fixed',
      width: '6px',
      cursor: 'col-resize',
      background: 'rgba(0,0,0,.12)',
      zIndex: '2147483647'
    });
    document.body.appendChild(h);

    const sync = () => {
      if (!p.isConnected || !h.isConnected) return;
      const pr = p.getBoundingClientRect();
      Object.assign(h.style, {
        left: `${pr.left - 3}px`,
        top: `${pr.top}px`,
        height: `${pr.height}px`
      });
    };

    let sx = 0;
    let sw = 0;
    const onMove = (e) => {
      const w = Math.max(360, Math.min(innerWidth * 0.75, sw - (e.clientX - sx)));
      Object.assign(p.style, { width: `${w}px` });
      sync();
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    h.addEventListener('mousedown', (e) => {
      e.preventDefault();
      sx = e.clientX;
      sw = p.getBoundingClientRect().width;
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });

    sync();

    state.currentPanel = p;
    state.cleanup = () => {
      removeExistingHandle();
      if (p.isConnected) {
        p.style.cssText = oldCssText || '';
        p.removeAttribute(PANEL_MARK);
      }
    };
  }

  function refresh() {
    state.raf = 0;

    const p = findActivityPanel();
    if (!p) {
      cleanupCurrent();
      return;
    }

    if (state.currentPanel === p && document.getElementById(HANDLE_ID)) {
      const h = document.getElementById(HANDLE_ID);
      const pr = p.getBoundingClientRect();
      Object.assign(h.style, {
        left: `${pr.left - 3}px`,
        top: `${pr.top}px`,
        height: `${pr.height}px`
      });
      return;
    }

    cleanupCurrent();
    installOnPanel(p);
  }

  function scheduleRefresh() {
    if (state.raf) return;
    state.raf = requestAnimationFrame(refresh);
  }

  function installObserver() {
    if (state.observer) return;
    state.observer = new MutationObserver(() => {
      scheduleRefresh();
    });
    state.observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'hidden', 'aria-hidden']
    });
  }

  function installResizeHook() {
    if (state.resizeBound) return;
    state.resizeBound = true;
    addEventListener('resize', () => {
      const p = state.currentPanel;
      if (!p) return;
      const top = parseFloat(p.style.top) || p.getBoundingClientRect().top || 0;
      p.style.height = `${Math.max(240, innerHeight - top)}px`;
      scheduleRefresh();
    });
  }

  function install() {
    installObserver();
    installResizeHook();
    if (!state.intervalId) {
      state.intervalId = setInterval(scheduleRefresh, 1200);
    }
    scheduleRefresh();
  }

  install();
})();
