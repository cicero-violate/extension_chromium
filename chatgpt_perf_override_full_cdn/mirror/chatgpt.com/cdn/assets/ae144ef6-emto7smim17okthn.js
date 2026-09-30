var W, K, L = function() {
        var e = self.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
        if (e && e.responseStart > 0 && e.responseStart < performance.now()) return e
    },
    F = function(e) {
        if (document.readyState === "loading") return "loading";
        var t = L();
        if (t) {
            if (e < t.domInteractive) return "loading";
            if (t.domContentLoadedEventStart === 0 || e < t.domContentLoadedEventStart) return "dom-interactive";
            if (t.domComplete === 0 || e < t.domComplete) return "dom-content-loaded"
        }
        return "complete"
    },
    Te = function(e) {
        var t = e.nodeName;
        return e.nodeType === 1 ? t.toLowerCase() : t.toUpperCase().replace(/^#/, "")
    },
    R = function(e, t) {
        var r = "";
        try {
            for (; e && e.nodeType !== 9;) {
                var i = e,
                    n = i.id ? "#" + i.id : Te(i) + (i.classList && i.classList.value && i.classList.value.trim() && i.classList.value.trim().length ? "." + i.classList.value.trim().replace(/\s+/g, ".") : "");
                if (r.length + n.length > (t || 100) - 1) return r || n;
                if (r = r ? n + ">" + r : n, i.id) break;
                e = i.parentNode
            }
        } catch {}
        return r
    },
    ie = -1,
    ae = function() {
        return ie
    },
    T = function(e) {
        addEventListener("pageshow", (function(t) {
            t.persisted && (ie = t.timeStamp, e(t))
        }), !0)
    },
    j = function() {
        var e = L();
        return e && e.activationStart || 0
    },
    l = function(e, t) {
        var r = L(),
            i = "navigate";
        return ae() >= 0 ? i = "back-forward-cache" : r && (document.prerendering || j() > 0 ? i = "prerender" : document.wasDiscarded ? i = "restore" : r.type && (i = r.type.replace(/_/g, "-"))), {
            name: e,
            value: t === void 0 ? -1 : t,
            rating: "good",
            delta: 0,
            entries: [],
            id: "v4-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
            navigationType: i
        }
    },
    y = function(e, t, r) {
        try {
            if (PerformanceObserver.supportedEntryTypes.includes(e)) {
                var i = new PerformanceObserver((function(n) {
                    Promise.resolve().then((function() {
                        t(n.getEntries())
                    }))
                }));
                return i.observe(Object.assign({
                    type: e,
                    buffered: !0
                }, r || {})), i
            }
        } catch {}
    },
    m = function(e, t, r, i) {
        var n, o;
        return function(a) {
            t.value >= 0 && (a || i) && ((o = t.value - (n || 0)) || n === void 0) && (n = t.value, t.delta = o, t.rating = (function(u, s) {
                return u > s[1] ? "poor" : u > s[0] ? "needs-improvement" : "good"
            })(t.value, r), e(t))
        }
    },
    V = function(e) {
        requestAnimationFrame((function() {
            return requestAnimationFrame((function() {
                return e()
            }))
        }))
    },
    P = function(e) {
        document.addEventListener("visibilitychange", (function() {
            document.visibilityState === "hidden" && e()
        }))
    },
    q = function(e) {
        var t = !1;
        return function() {
            t || (e(), t = !0)
        }
    },
    S = -1,
    Q = function() {
        return document.visibilityState !== "hidden" || document.prerendering ? 1 / 0 : 0
    },
    B = function(e) {
        document.visibilityState === "hidden" && S > -1 && (S = e.type === "visibilitychange" ? e.timeStamp : 0, ye())
    },
    X = function() {
        addEventListener("visibilitychange", B, !0), addEventListener("prerenderingchange", B, !0)
    },
    ye = function() {
        removeEventListener("visibilitychange", B, !0), removeEventListener("prerenderingchange", B, !0)
    },
    _ = function() {
        return S < 0 && (S = Q(), X(), T((function() {
            setTimeout((function() {
                S = Q(), X()
            }), 0)
        }))), {
            get firstHiddenTime() {
                return S
            }
        }
    },
    x = function(e) {
        document.prerendering ? addEventListener("prerenderingchange", (function() {
            return e()
        }), !0) : e()
    },
    Y = [1800, 3e3],
    oe = function(e, t) {
        t = t || {}, x((function() {
            var r, i = _(),
                n = l("FCP"),
                o = y("paint", (function(a) {
                    a.forEach((function(u) {
                        u.name === "first-contentful-paint" && (o.disconnect(), u.startTime < i.firstHiddenTime && (n.value = Math.max(u.startTime - j(), 0), n.entries.push(u), r(!0)))
                    }))
                }));
            o && (r = m(e, n, Y, t.reportAllChanges), T((function(a) {
                n = l("FCP"), r = m(e, n, Y, t.reportAllChanges), V((function() {
                    n.value = performance.now() - a.timeStamp, r(!0)
                }))
            })))
        }))
    },
    Z = [.1, .25],
    ke = function(e, t) {
        (function(r, i) {
            i = i || {}, oe(q((function() {
                var n, o = l("CLS", 0),
                    a = 0,
                    u = [],
                    s = function(f) {
                        f.forEach((function(d) {
                            if (!d.hadRecentInput) {
                                var v = u[0],
                                    M = u[u.length - 1];
                                a && d.startTime - M.startTime < 1e3 && d.startTime - v.startTime < 5e3 ? (a += d.value, u.push(d)) : (a = d.value, u = [d])
                            }
                        })), a > o.value && (o.value = a, o.entries = u, n())
                    },
                    c = y("layout-shift", s);
                c && (n = m(r, o, Z, i.reportAllChanges), P((function() {
                    s(c.takeRecords()), n(!0)
                })), T((function() {
                    a = 0, o = l("CLS", 0), n = m(r, o, Z, i.reportAllChanges), V((function() {
                        return n()
                    }))
                })), setTimeout(n, 0))
            })))
        })((function(r) {
            var i = (function(n) {
                var o, a = {};
                if (n.entries.length) {
                    var u = n.entries.reduce((function(c, f) {
                        return c && c.value > f.value ? c : f
                    }));
                    if (u && u.sources && u.sources.length) {
                        var s = (o = u.sources).find((function(c) {
                            return c.node && c.node.nodeType === 1
                        })) || o[0];
                        s && (a = {
                            largestShiftTarget: R(s.node),
                            largestShiftTime: u.startTime,
                            largestShiftValue: u.value,
                            largestShiftSource: s,
                            largestShiftEntry: u,
                            loadState: F(u.startTime)
                        })
                    }
                }
                return Object.assign(n, {
                    attribution: a
                })
            })(r);
            e(i)
        }), t)
    },
    Ae = function(e, t) {
        oe((function(r) {
            var i = (function(n) {
                var o = {
                    timeToFirstByte: 0,
                    firstByteToFCP: n.value,
                    loadState: F(ae())
                };
                if (n.entries.length) {
                    var a = L(),
                        u = n.entries[n.entries.length - 1];
                    if (a) {
                        var s = a.activationStart || 0,
                            c = Math.max(0, a.responseStart - s);
                        o = {
                            timeToFirstByte: c,
                            firstByteToFCP: n.value - c,
                            loadState: F(n.entries[0].startTime),
                            navigationEntry: a,
                            fcpEntry: u
                        }
                    }
                }
                return Object.assign(n, {
                    attribution: o
                })
            })(r);
            e(i)
        }), t)
    },
    ue = 0,
    N = 1 / 0,
    A = 0,
    Ee = function(e) {
        e.forEach((function(t) {
            t.interactionId && (N = Math.min(N, t.interactionId), A = Math.max(A, t.interactionId), ue = A ? (A - N) / 7 + 1 : 0)
        }))
    },
    se = function() {
        return W ? ue : performance.interactionCount || 0
    },
    Se = function() {
        "interactionCount" in performance || W || (W = y("event", Ee, {
            type: "event",
            buffered: !0,
            durationThreshold: 0
        }))
    },
    p = [],
    w = new Map,
    ce = 0,
    be = function() {
        var e = Math.min(p.length - 1, Math.floor((se() - ce) / 50));
        return p[e]
    },
    fe = [],
    Ce = function(e) {
        if (fe.forEach((function(n) {
                return n(e)
            })), e.interactionId || e.entryType === "first-input") {
            var t = p[p.length - 1],
                r = w.get(e.interactionId);
            if (r || p.length < 10 || e.duration > t.latency) {
                if (r) e.duration > r.latency ? (r.entries = [e], r.latency = e.duration) : e.duration === r.latency && e.startTime === r.entries[0].startTime && r.entries.push(e);
                else {
                    var i = {
                        id: e.interactionId,
                        latency: e.duration,
                        entries: [e]
                    };
                    w.set(i.id, i), p.push(i)
                }
                p.sort((function(n, o) {
                    return o.latency - n.latency
                })), p.length > 10 && p.splice(10).forEach((function(n) {
                    return w.delete(n.id)
                }))
            }
        }
    },
    G = function(e) {
        var t = self.requestIdleCallback || self.setTimeout,
            r = -1;
        return e = q(e), document.visibilityState === "hidden" ? e() : (r = t(e), P(e)), r
    },
    $ = [200, 500],
    Le = function(e, t) {
        "PerformanceEventTiming" in self && "interactionId" in PerformanceEventTiming.prototype && (t = t || {}, x((function() {
            var r;
            Se();
            var i, n = l("INP"),
                o = function(u) {
                    G((function() {
                        u.forEach(Ce);
                        var s = be();
                        s && s.latency !== n.value && (n.value = s.latency, n.entries = s.entries, i())
                    }))
                },
                a = y("event", o, {
                    durationThreshold: (r = t.durationThreshold) !== null && r !== void 0 ? r : 40
                });
            i = m(e, n, $, t.reportAllChanges), a && (a.observe({
                type: "first-input",
                buffered: !0
            }), P((function() {
                o(a.takeRecords()), i(!0)
            })), T((function() {
                ce = se(), p.length = 0, w.clear(), n = l("INP"), i = m(e, n, $, t.reportAllChanges)
            })))
        })))
    },
    b = [],
    h = [],
    z = 0,
    J = new WeakMap,
    C = new Map,
    U = -1,
    Me = function(e) {
        b = b.concat(e), de()
    },
    de = function() {
        U < 0 && (U = G(De))
    },
    De = function() {
        C.size > 10 && C.forEach((function(a, u) {
            w.has(u) || C.delete(u)
        }));
        var e = p.map((function(a) {
                return J.get(a.entries[0])
            })),
            t = h.length - 50;
        h = h.filter((function(a, u) {
            return u >= t || e.includes(a)
        }));
        for (var r = new Set, i = 0; i < h.length; i++) {
            var n = h[i];
            me(n.startTime, n.processingEnd).forEach((function(a) {
                r.add(a)
            }))
        }
        var o = b.length - 1 - 50;
        b = b.filter((function(a, u) {
            return a.startTime > z && u > o || r.has(a)
        })), U = -1
    };
fe.push((function(e) {
    e.interactionId && e.target && !C.has(e.interactionId) && C.set(e.interactionId, e.target)
}), (function(e) {
    var t, r = e.startTime + e.duration;
    z = Math.max(z, e.processingEnd);
    for (var i = h.length - 1; i >= 0; i--) {
        var n = h[i];
        if (Math.abs(r - n.renderTime) <= 8) {
            (t = n).startTime = Math.min(e.startTime, t.startTime), t.processingStart = Math.min(e.processingStart, t.processingStart), t.processingEnd = Math.max(e.processingEnd, t.processingEnd), t.entries.push(e);
            break
        }
    }
    t || (t = {
        startTime: e.startTime,
        processingStart: e.processingStart,
        processingEnd: e.processingEnd,
        renderTime: r,
        entries: [e]
    }, h.push(t)), (e.interactionId || e.entryType === "first-input") && J.set(e, t), de()
}));
var g, I, le, O, me = function(e, t) {
        for (var r, i = [], n = 0; r = b[n]; n++)
            if (!(r.startTime + r.duration < e)) {
                if (r.startTime > t) break;
                i.push(r)
            }
        return i
    },
    Be = function(e, t) {
        K || (K = y("long-animation-frame", Me)), Le((function(r) {
            var i = (function(n) {
                var o = n.entries[0],
                    a = J.get(o),
                    u = o.processingStart,
                    s = a.processingEnd,
                    c = a.entries.sort((function(E, ge) {
                        return E.processingStart - ge.processingStart
                    })),
                    f = me(o.startTime, s),
                    d = n.entries.find((function(E) {
                        return E.target
                    })),
                    v = d && d.target || C.get(o.interactionId),
                    M = [o.startTime + o.duration, s].concat(f.map((function(E) {
                        return E.startTime + E.duration
                    }))),
                    k = Math.max.apply(Math, M),
                    he = {
                        interactionTarget: R(v),
                        interactionTargetElement: v,
                        interactionType: o.name.startsWith("key") ? "keyboard" : "pointer",
                        interactionTime: o.startTime,
                        nextPaintTime: k,
                        processedEventEntries: c,
                        longAnimationFrameEntries: f,
                        inputDelay: u - o.startTime,
                        processingDuration: s - u,
                        presentationDelay: Math.max(k - s, 0),
                        loadState: F(o.startTime)
                    };
                return Object.assign(n, {
                    attribution: he
                })
            })(r);
            e(i)
        }), t)
    },
    ee = [2500, 4e3],
    H = {},
    Oe = function(e, t) {
        (function(r, i) {
            i = i || {}, x((function() {
                var n, o = _(),
                    a = l("LCP"),
                    u = function(f) {
                        i.reportAllChanges || (f = f.slice(-1)), f.forEach((function(d) {
                            d.startTime < o.firstHiddenTime && (a.value = Math.max(d.startTime - j(), 0), a.entries = [d], n())
                        }))
                    },
                    s = y("largest-contentful-paint", u);
                if (s) {
                    n = m(r, a, ee, i.reportAllChanges);
                    var c = q((function() {
                        H[a.id] || (u(s.takeRecords()), s.disconnect(), H[a.id] = !0, n(!0))
                    }));
                    ["keydown", "click"].forEach((function(f) {
                        addEventListener(f, (function() {
                            return G(c)
                        }), {
                            once: !0,
                            capture: !0
                        })
                    })), P(c), T((function(f) {
                        a = l("LCP"), n = m(r, a, ee, i.reportAllChanges), V((function() {
                            a.value = performance.now() - f.timeStamp, H[a.id] = !0, n(!0)
                        }))
                    }))
                }
            }))
        })((function(r) {
            var i = (function(n) {
                var o = {
                    timeToFirstByte: 0,
                    resourceLoadDelay: 0,
                    resourceLoadDuration: 0,
                    elementRenderDelay: n.value
                };
                if (n.entries.length) {
                    var a = L();
                    if (a) {
                        var u = a.activationStart || 0,
                            s = n.entries[n.entries.length - 1],
                            c = s.url && performance.getEntriesByType("resource").filter((function(k) {
                                return k.name === s.url
                            }))[0],
                            f = Math.max(0, a.responseStart - u),
                            d = Math.max(f, c ? (c.requestStart || c.startTime) - u : 0),
                            v = Math.max(d, c ? c.responseEnd - u : 0),
                            M = Math.max(v, s.startTime - u);
                        o = {
                            element: R(s.element),
                            timeToFirstByte: f,
                            resourceLoadDelay: d - f,
                            resourceLoadDuration: v - d,
                            elementRenderDelay: M - v,
                            navigationEntry: a,
                            lcpEntry: s
                        }, s.url && (o.url = s.url), c && (o.lcpResourceEntry = c)
                    }
                }
                return Object.assign(n, {
                    attribution: o
                })
            })(r);
            e(i)
        }), t)
    },
    te = [800, 1800],
    we = function e(t) {
        document.prerendering ? x((function() {
            return e(t)
        })) : document.readyState !== "complete" ? addEventListener("load", (function() {
            return e(t)
        }), !0) : setTimeout(t, 0)
    },
    Ie = function(e, t) {
        t = t || {};
        var r = l("TTFB"),
            i = m(e, r, te, t.reportAllChanges);
        we((function() {
            var n = L();
            n && (r.value = Math.max(n.responseStart - j(), 0), r.entries = [n], i(!0), T((function() {
                r = l("TTFB", 0), (i = m(e, r, te, t.reportAllChanges))(!0)
            })))
        }))
    },
    Re = function(e, t) {
        Ie((function(r) {
            var i = (function(n) {
                var o = {
                    waitingDuration: 0,
                    cacheDuration: 0,
                    dnsDuration: 0,
                    connectionDuration: 0,
                    requestDuration: 0
                };
                if (n.entries.length) {
                    var a = n.entries[0],
                        u = a.activationStart || 0,
                        s = Math.max((a.workerStart || a.fetchStart) - u, 0),
                        c = Math.max(a.domainLookupStart - u, 0),
                        f = Math.max(a.connectStart - u, 0),
                        d = Math.max(a.connectEnd - u, 0);
                    o = {
                        waitingDuration: s,
                        cacheDuration: c - s,
                        dnsDuration: f - c,
                        connectionDuration: d - f,
                        requestDuration: n.value - d,
                        navigationEntry: a
                    }
                }
                return Object.assign(n, {
                    attribution: o
                })
            })(r);
            e(i)
        }), t)
    },
    D = {
        passive: !0,
        capture: !0
    },
    Fe = new Date,
    ne = function(e, t) {
        g || (g = t, I = e, le = new Date, ve(removeEventListener), pe())
    },
    pe = function() {
        if (I >= 0 && I < le - Fe) {
            var e = {
                entryType: "first-input",
                name: g.type,
                target: g.target,
                cancelable: g.cancelable,
                startTime: g.timeStamp,
                processingStart: g.timeStamp + I
            };
            O.forEach((function(t) {
                t(e)
            })), O = []
        }
    },
    Pe = function(e) {
        if (e.cancelable) {
            var t = (e.timeStamp > 1e12 ? new Date : performance.now()) - e.timeStamp;
            e.type == "pointerdown" ? (function(r, i) {
                var n = function() {
                        ne(r, i), a()
                    },
                    o = function() {
                        a()
                    },
                    a = function() {
                        removeEventListener("pointerup", n, D), removeEventListener("pointercancel", o, D)
                    };
                addEventListener("pointerup", n, D), addEventListener("pointercancel", o, D)
            })(t, e) : ne(t, e)
        }
    },
    ve = function(e) {
        ["mousedown", "keydown", "touchstart", "pointerdown"].forEach((function(t) {
            return e(t, Pe, D)
        }))
    },
    re = [100, 300],
    xe = function(e, t) {
        t = t || {}, x((function() {
            var r, i = _(),
                n = l("FID"),
                o = function(s) {
                    s.startTime < i.firstHiddenTime && (n.value = s.processingStart - s.startTime, n.entries.push(s), r(!0))
                },
                a = function(s) {
                    s.forEach(o)
                },
                u = y("first-input", a);
            r = m(e, n, re, t.reportAllChanges), u && (P(q((function() {
                a(u.takeRecords()), u.disconnect()
            }))), T((function() {
                var s;
                n = l("FID"), r = m(e, n, re, t.reportAllChanges), O = [], I = -1, g = null, ve(addEventListener), s = o, O.push(s), pe()
            })))
        }))
    },
    je = function(e, t) {
        xe((function(r) {
            var i = (function(n) {
                var o = n.entries[0],
                    a = {
                        eventTarget: R(o.target),
                        eventType: o.name,
                        eventTime: o.startTime,
                        eventEntry: o,
                        loadState: F(o.startTime)
                    };
                return Object.assign(n, {
                    attribution: a
                })
            })(r);
            e(i)
        }), t)
    };
export {
    Z as CLSThresholds, Y as FCPThresholds, re as FIDThresholds, $ as INPThresholds, ee as LCPThresholds, te as TTFBThresholds, ke as onCLS, Ae as onFCP, je as onFID, Be as onINP, Oe as onLCP, Re as onTTFB
};
//# sourceMappingURL=ae144ef6-emto7smim17okthn.js.map