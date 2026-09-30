import {
    bJ as fe,
    cq as Le
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    e as ee,
    au as Ue,
    r as Ce
} from "./2340486e-dvd8m80i7d6hyild.js";
var z = {},
    M = {},
    X = {},
    ve;

function C() {
    return ve || (ve = 1, (function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.isEventSourceSupported = e.isReactNative = e.ReadyState = e.DEFAULT_HEARTBEAT = e.UNPARSABLE_JSON_OBJECT = e.DEFAULT_RECONNECT_INTERVAL_MS = e.DEFAULT_RECONNECT_LIMIT = e.SOCKET_IO_PING_CODE = e.SOCKET_IO_PATH = e.SOCKET_IO_PING_INTERVAL = e.DEFAULT_EVENT_SOURCE_OPTIONS = e.EMPTY_EVENT_HANDLERS = e.DEFAULT_OPTIONS = void 0;
        var S = 1,
            E = 1e3 * S;
        e.DEFAULT_OPTIONS = {}, e.EMPTY_EVENT_HANDLERS = {}, e.DEFAULT_EVENT_SOURCE_OPTIONS = {
            withCredentials: !1,
            events: e.EMPTY_EVENT_HANDLERS
        }, e.SOCKET_IO_PING_INTERVAL = 25 * E, e.SOCKET_IO_PATH = "/socket.io/?EIO=3&transport=websocket", e.SOCKET_IO_PING_CODE = "2", e.DEFAULT_RECONNECT_LIMIT = 20, e.DEFAULT_RECONNECT_INTERVAL_MS = 5e3, e.UNPARSABLE_JSON_OBJECT = {}, e.DEFAULT_HEARTBEAT = {
            message: "ping",
            timeout: 6e4,
            interval: 25e3
        }, (function(l) {
            l[l.UNINSTANTIATED = -1] = "UNINSTANTIATED", l[l.CONNECTING = 0] = "CONNECTING", l[l.OPEN = 1] = "OPEN", l[l.CLOSING = 2] = "CLOSING", l[l.CLOSED = 3] = "CLOSED"
        })(e.ReadyState || (e.ReadyState = {}));
        var _ = function() {
            try {
                return "EventSource" in globalThis
            } catch {
                return !1
            }
        };
        e.isReactNative = typeof navigator < "u" && navigator.product === "ReactNative", e.isEventSourceSupported = !e.isReactNative && _()
    })(X)), X
}
var J = {},
    Z = {},
    de;

function re() {
    return de || (de = 1, (function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.resetWebSockets = e.sharedWebSockets = void 0, e.sharedWebSockets = {};
        var S = function(E) {
            if (E && e.sharedWebSockets.hasOwnProperty(E)) delete e.sharedWebSockets[E];
            else
                for (var _ in e.sharedWebSockets) e.sharedWebSockets.hasOwnProperty(_) && delete e.sharedWebSockets[_]
        };
        e.resetWebSockets = S
    })(Z)), Z
}
var A = {},
    I = {},
    Se;

function te() {
    if (Se) return I;
    Se = 1, Object.defineProperty(I, "__esModule", {
        value: !0
    }), I.setUpSocketIOPing = I.appendQueryParams = I.parseSocketIOUrl = void 0;
    var e = C(),
        S = function(l) {
            if (l) {
                var O = /^https|wss/.test(l),
                    d = l.replace(/^(https?|wss?)(:\/\/)?/, ""),
                    v = d.replace(/\/$/, ""),
                    c = O ? "wss" : "ws";
                return "".concat(c, "://").concat(v).concat(e.SOCKET_IO_PATH)
            } else if (l === "") {
                var O = /^https/.test(window.location.protocol),
                    c = O ? "wss" : "ws",
                    a = window.location.port ? ":".concat(window.location.port) : "";
                return "".concat(c, "://").concat(window.location.hostname).concat(a).concat(e.SOCKET_IO_PATH)
            }
            return l
        };
    I.parseSocketIOUrl = S;
    var E = function(l, O) {
        O === void 0 && (O = {});
        var d = /\?([\w]+=[\w]+)/,
            v = d.test(l),
            c = "".concat(Object.entries(O).reduce(function(a, i) {
                var r = i[0],
                    t = i[1];
                return a + "".concat(r, "=").concat(t, "&")
            }, "").slice(0, -1));
        return "".concat(l).concat(v ? "&" : "?").concat(c)
    };
    I.appendQueryParams = E;
    var _ = function(l, O) {
        O === void 0 && (O = e.SOCKET_IO_PING_INTERVAL);
        var d = function() {
            return l(e.SOCKET_IO_PING_CODE)
        };
        return window.setInterval(d, O)
    };
    return I.setUpSocketIOPing = _, I
}
var H = {},
    _e;

function Ie() {
    if (_e) return H;
    _e = 1, Object.defineProperty(H, "__esModule", {
        value: !0
    }), H.heartbeat = void 0;
    var e = C();

    function S(E, _) {
        var l = _ || {},
            O = l.interval,
            d = O === void 0 ? e.DEFAULT_HEARTBEAT.interval : O,
            v = l.timeout,
            c = v === void 0 ? e.DEFAULT_HEARTBEAT.timeout : v,
            a = l.message,
            i = a === void 0 ? e.DEFAULT_HEARTBEAT.message : a,
            r = !1,
            t = setInterval(function() {
                try {
                    typeof i == "function" ? E.send(i()) : E.send(i)
                } catch {}
            }, d),
            o = setInterval(function() {
                r ? r = !1 : E.close()
            }, c);
        return E.addEventListener("close", function() {
                clearInterval(t), clearInterval(o)
            }),
            function() {
                r = !0
            }
    }
    return H.heartbeat = S, H
}
var L = {},
    x = {},
    Oe;

function ne() {
    return Oe || (Oe = 1, (function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.resetSubscribers = e.removeSubscriber = e.addSubscriber = e.hasSubscribers = e.getSubscribers = void 0;
        var S = {},
            E = [],
            _ = function(c) {
                return (0, e.hasSubscribers)(c) ? Array.from(S[c]) : E
            };
        e.getSubscribers = _;
        var l = function(c) {
            var a;
            return ((a = S[c]) === null || a === void 0 ? void 0 : a.size) > 0
        };
        e.hasSubscribers = l;
        var O = function(c, a) {
            S[c] = S[c] || new Set, S[c].add(a)
        };
        e.addSubscriber = O;
        var d = function(c, a) {
            S[c].delete(a)
        };
        e.removeSubscriber = d;
        var v = function(c) {
            if (c && S.hasOwnProperty(c)) delete S[c];
            else
                for (var a in S) S.hasOwnProperty(a) && delete S[a]
        };
        e.resetSubscribers = v
    })(x)), x
}
var Ee;

function ae() {
    if (Ee) return L;
    Ee = 1, Object.defineProperty(L, "__esModule", {
        value: !0
    }), L.resetGlobalState = L.assertIsWebSocket = void 0;
    var e = re(),
        S = ne();

    function E(l, O) {
        if (!O && !(l instanceof WebSocket)) throw new Error("")
    }
    L.assertIsWebSocket = E;

    function _(l) {
        (0, S.resetSubscribers)(l), (0, e.resetWebSockets)(l)
    }
    return L.resetGlobalState = _, L
}
var be;

function We() {
    if (be) return A;
    be = 1;
    var e = A && A.__assign || function() {
        return e = Object.assign || function(i) {
            for (var r, t = 1, o = arguments.length; t < o; t++) {
                r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (i[n] = r[n])
            }
            return i
        }, e.apply(this, arguments)
    };
    Object.defineProperty(A, "__esModule", {
        value: !0
    }), A.attachListeners = void 0;
    var S = te(),
        E = Ie(),
        _ = C(),
        l = ae(),
        O = function(i, r, t) {
            var o;
            if (r.current.heartbeat && i instanceof WebSocket) {
                var n = typeof r.current.heartbeat == "boolean" ? void 0 : r.current.heartbeat;
                o = (0, E.heartbeat)(i, n)
            }
            i.onmessage = function(f) {
                var u;
                o ? .(), r.current.onMessage && r.current.onMessage(f), !(typeof r.current.filter == "function" && r.current.filter(f) !== !0) && (r.current.heartbeat && typeof r.current.heartbeat != "boolean" && ((u = r.current.heartbeat) === null || u === void 0 ? void 0 : u.returnMessage) === f.data || t(f))
            }
        },
        d = function(i, r, t, o) {
            i.onopen = function(n) {
                r.current.onOpen && r.current.onOpen(n), o.current = 0, t(_.ReadyState.OPEN)
            }
        },
        v = function(i, r, t, o, n) {
            if (_.isEventSourceSupported && i instanceof EventSource) return function() {};
            (0, l.assertIsWebSocket)(i, r.current.skipAssert);
            var f;
            return i.onclose = function(u) {
                    var s;
                    if (r.current.onClose && r.current.onClose(u), t(_.ReadyState.CLOSED), r.current.shouldReconnect && r.current.shouldReconnect(u)) {
                        var b = (s = r.current.reconnectAttempts) !== null && s !== void 0 ? s : _.DEFAULT_RECONNECT_LIMIT;
                        if (n.current < b) {
                            var y = typeof r.current.reconnectInterval == "function" ? r.current.reconnectInterval(n.current) : r.current.reconnectInterval;
                            f = window.setTimeout(function() {
                                n.current++, o()
                            }, y ? ? _.DEFAULT_RECONNECT_INTERVAL_MS)
                        } else r.current.onReconnectStop && r.current.onReconnectStop(b), console.warn("Max reconnect attempts of ".concat(b, " exceeded"))
                    }
                },
                function() {
                    return f && window.clearTimeout(f)
                }
        },
        c = function(i, r, t, o, n) {
            var f;
            return i.onerror = function(u) {
                    var s;
                    if (r.current.onError && r.current.onError(u), _.isEventSourceSupported && i instanceof EventSource && (r.current.onClose && r.current.onClose(e(e({}, u), {
                            code: 1006,
                            reason: "An error occurred with the EventSource: ".concat(u),
                            wasClean: !1
                        })), t(_.ReadyState.CLOSED), i.close()), r.current.retryOnError)
                        if (n.current < ((s = r.current.reconnectAttempts) !== null && s !== void 0 ? s : _.DEFAULT_RECONNECT_LIMIT)) {
                            var b = typeof r.current.reconnectInterval == "function" ? r.current.reconnectInterval(n.current) : r.current.reconnectInterval;
                            f = window.setTimeout(function() {
                                n.current++, o()
                            }, b ? ? _.DEFAULT_RECONNECT_INTERVAL_MS)
                        } else r.current.onReconnectStop && r.current.onReconnectStop(r.current.reconnectAttempts), console.warn("Max reconnect attempts of ".concat(r.current.reconnectAttempts, " exceeded"))
                },
                function() {
                    return f && window.clearTimeout(f)
                }
        },
        a = function(i, r, t, o, n, f) {
            var u = r.setLastMessage,
                s = r.setReadyState,
                b, y, m;
            return t.current.fromSocketIO && (b = (0, S.setUpSocketIOPing)(f)), O(i, t, u), d(i, t, s, n), y = v(i, t, s, o, n), m = c(i, t, s, o, n),
                function() {
                    s(_.ReadyState.CLOSING), y(), m(), i.close(), b && clearInterval(b)
                }
        };
    return A.attachListeners = a, A
}
var U = {},
    he;

function De() {
    if (he) return U;
    he = 1;
    var e = U && U.__assign || function() {
        return e = Object.assign || function(r) {
            for (var t, o = 1, n = arguments.length; o < n; o++) {
                t = arguments[o];
                for (var f in t) Object.prototype.hasOwnProperty.call(t, f) && (r[f] = t[f])
            }
            return r
        }, e.apply(this, arguments)
    };
    Object.defineProperty(U, "__esModule", {
        value: !0
    }), U.attachSharedListeners = void 0;
    var S = re(),
        E = C(),
        _ = ne(),
        l = te(),
        O = Ie(),
        d = function(r, t, o) {
            var n;
            o && r instanceof WebSocket && (n = (0, O.heartbeat)(r, typeof o == "boolean" ? void 0 : o)), r.onmessage = function(f) {
                n ? .(), (0, _.getSubscribers)(t).forEach(function(u) {
                    u.optionsRef.current.onMessage && u.optionsRef.current.onMessage(f), !(typeof u.optionsRef.current.filter == "function" && u.optionsRef.current.filter(f) !== !0) && (o && typeof o != "boolean" && o ? .returnMessage === f.data || u.setLastMessage(f))
                })
            }
        },
        v = function(r, t) {
            r.onopen = function(o) {
                (0, _.getSubscribers)(t).forEach(function(n) {
                    n.reconnectCount.current = 0, n.optionsRef.current.onOpen && n.optionsRef.current.onOpen(o), n.setReadyState(E.ReadyState.OPEN)
                })
            }
        },
        c = function(r, t) {
            r instanceof WebSocket && (r.onclose = function(o) {
                (0, _.getSubscribers)(t).forEach(function(n) {
                    n.optionsRef.current.onClose && n.optionsRef.current.onClose(o), n.setReadyState(E.ReadyState.CLOSED)
                }), delete S.sharedWebSockets[t], (0, _.getSubscribers)(t).forEach(function(n) {
                    var f;
                    if (n.optionsRef.current.shouldReconnect && n.optionsRef.current.shouldReconnect(o)) {
                        var u = (f = n.optionsRef.current.reconnectAttempts) !== null && f !== void 0 ? f : E.DEFAULT_RECONNECT_LIMIT;
                        if (n.reconnectCount.current < u) {
                            var s = typeof n.optionsRef.current.reconnectInterval == "function" ? n.optionsRef.current.reconnectInterval(n.reconnectCount.current) : n.optionsRef.current.reconnectInterval;
                            setTimeout(function() {
                                n.reconnectCount.current++, n.reconnect.current()
                            }, s ? ? E.DEFAULT_RECONNECT_INTERVAL_MS)
                        } else n.optionsRef.current.onReconnectStop && n.optionsRef.current.onReconnectStop(n.optionsRef.current.reconnectAttempts), console.warn("Max reconnect attempts of ".concat(u, " exceeded"))
                    }
                })
            })
        },
        a = function(r, t) {
            r.onerror = function(o) {
                (0, _.getSubscribers)(t).forEach(function(n) {
                    n.optionsRef.current.onError && n.optionsRef.current.onError(o), E.isEventSourceSupported && r instanceof EventSource && (n.optionsRef.current.onClose && n.optionsRef.current.onClose(e(e({}, o), {
                        code: 1006,
                        reason: "An error occurred with the EventSource: ".concat(o),
                        wasClean: !1
                    })), n.setReadyState(E.ReadyState.CLOSED))
                }), E.isEventSourceSupported && r instanceof EventSource && r.close()
            }
        },
        i = function(r, t, o, n) {
            var f;
            return o.current.fromSocketIO && (f = (0, l.setUpSocketIOPing)(n)), d(r, t, o.current.heartbeat), c(r, t), v(r, t), a(r, t),
                function() {
                    f && clearInterval(f)
                }
        };
    return U.attachSharedListeners = i, U
}
var ge;

function Re() {
    if (ge) return J;
    ge = 1, Object.defineProperty(J, "__esModule", {
        value: !0
    }), J.createOrJoinSocket = void 0;
    var e = re(),
        S = C(),
        E = We(),
        _ = De(),
        l = ne(),
        O = function(v, c, a, i, r) {
            return function() {
                if ((0, l.removeSubscriber)(v, c), !(0, l.hasSubscribers)(v)) {
                    try {
                        var t = e.sharedWebSockets[v];
                        t instanceof WebSocket && (t.onclose = function(o) {
                            a.current.onClose && a.current.onClose(o), i(S.ReadyState.CLOSED)
                        }), t.close()
                    } catch {}
                    r && r(), delete e.sharedWebSockets[v]
                }
            }
        },
        d = function(v, c, a, i, r, t, o, n) {
            if (!S.isEventSourceSupported && i.current.eventSourceOptions) throw S.isReactNative ? new Error("EventSource is not supported in ReactNative") : new Error("EventSource is not supported");
            if (i.current.share) {
                var f = null;
                e.sharedWebSockets[c] === void 0 ? (e.sharedWebSockets[c] = i.current.eventSourceOptions ? new EventSource(c, i.current.eventSourceOptions) : new WebSocket(c, i.current.protocols), v.current = e.sharedWebSockets[c], a(S.ReadyState.CONNECTING), f = (0, _.attachSharedListeners)(e.sharedWebSockets[c], c, i, n)) : (v.current = e.sharedWebSockets[c], a(e.sharedWebSockets[c].readyState));
                var u = {
                    setLastMessage: r,
                    setReadyState: a,
                    optionsRef: i,
                    reconnectCount: o,
                    reconnect: t
                };
                return (0, l.addSubscriber)(c, u), O(c, u, i, a, f)
            } else {
                if (v.current = i.current.eventSourceOptions ? new EventSource(c, i.current.eventSourceOptions) : new WebSocket(c, i.current.protocols), a(S.ReadyState.CONNECTING), !v.current) throw new Error("WebSocket failed to be created");
                return (0, E.attachListeners)(v.current, {
                    setLastMessage: r,
                    setReadyState: a
                }, i, t.current, o, n)
            }
        };
    return J.createOrJoinSocket = d, J
}
var W = {},
    ye;

function je() {
    return ye || (ye = 1, (function(e) {
        var S = W && W.__awaiter || function(v, c, a, i) {
                function r(t) {
                    return t instanceof a ? t : new a(function(o) {
                        o(t)
                    })
                }
                return new(a || (a = Promise))(function(t, o) {
                    function n(s) {
                        try {
                            u(i.next(s))
                        } catch (b) {
                            o(b)
                        }
                    }

                    function f(s) {
                        try {
                            u(i.throw(s))
                        } catch (b) {
                            o(b)
                        }
                    }

                    function u(s) {
                        s.done ? t(s.value) : r(s.value).then(n, f)
                    }
                    u((i = i.apply(v, c || [])).next())
                })
            },
            E = W && W.__generator || function(v, c) {
                var a = {
                        label: 0,
                        sent: function() {
                            if (t[0] & 1) throw t[1];
                            return t[1]
                        },
                        trys: [],
                        ops: []
                    },
                    i, r, t, o;
                return o = {
                    next: n(0),
                    throw: n(1),
                    return: n(2)
                }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
                    return this
                }), o;

                function n(u) {
                    return function(s) {
                        return f([u, s])
                    }
                }

                function f(u) {
                    if (i) throw new TypeError("Generator is already executing.");
                    for (; a;) try {
                        if (i = 1, r && (t = u[0] & 2 ? r.return : u[0] ? r.throw || ((t = r.return) && t.call(r), 0) : r.next) && !(t = t.call(r, u[1])).done) return t;
                        switch (r = 0, t && (u = [u[0] & 2, t.value]), u[0]) {
                            case 0:
                            case 1:
                                t = u;
                                break;
                            case 4:
                                return a.label++, {
                                    value: u[1],
                                    done: !1
                                };
                            case 5:
                                a.label++, r = u[1], u = [0];
                                continue;
                            case 7:
                                u = a.ops.pop(), a.trys.pop();
                                continue;
                            default:
                                if (t = a.trys, !(t = t.length > 0 && t[t.length - 1]) && (u[0] === 6 || u[0] === 2)) {
                                    a = 0;
                                    continue
                                }
                                if (u[0] === 3 && (!t || u[1] > t[0] && u[1] < t[3])) {
                                    a.label = u[1];
                                    break
                                }
                                if (u[0] === 6 && a.label < t[1]) {
                                    a.label = t[1], t = u;
                                    break
                                }
                                if (t && a.label < t[2]) {
                                    a.label = t[2], a.ops.push(u);
                                    break
                                }
                                t[2] && a.ops.pop(), a.trys.pop();
                                continue
                        }
                        u = c.call(v, a)
                    } catch (s) {
                        u = [6, s], r = 0
                    } finally {
                        i = t = 0
                    }
                    if (u[0] & 5) throw u[1];
                    return {
                        value: u[0] ? u[1] : void 0,
                        done: !0
                    }
                }
            };
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.getUrl = void 0;
        var _ = te(),
            l = C(),
            O = function(v) {
                return new Promise(function(c) {
                    return window.setTimeout(c, v)
                })
            },
            d = function(v, c, a) {
                return a === void 0 && (a = 0), S(void 0, void 0, void 0, function() {
                    var i, r, t, o, n, f, u, s;
                    return E(this, function(b) {
                        switch (b.label) {
                            case 0:
                                if (typeof v != "function") return [3, 10];
                                b.label = 1;
                            case 1:
                                return b.trys.push([1, 3, , 9]), [4, v()];
                            case 2:
                                return i = b.sent(), [3, 9];
                            case 3:
                                return b.sent(), c.current.retryOnError ? (r = (f = c.current.reconnectAttempts) !== null && f !== void 0 ? f : l.DEFAULT_RECONNECT_LIMIT, a < r ? (t = typeof c.current.reconnectInterval == "function" ? c.current.reconnectInterval(a) : c.current.reconnectInterval, [4, O(t ? ? l.DEFAULT_RECONNECT_INTERVAL_MS)]) : [3, 5]) : [3, 7];
                            case 4:
                                return b.sent(), [2, (0, e.getUrl)(v, c, a + 1)];
                            case 5:
                                return (s = (u = c.current).onReconnectStop) === null || s === void 0 || s.call(u, a), [2, null];
                            case 6:
                                return [3, 8];
                            case 7:
                                return [2, null];
                            case 8:
                                return [3, 9];
                            case 9:
                                return [3, 11];
                            case 10:
                                i = v, b.label = 11;
                            case 11:
                                return o = c.current.fromSocketIO ? (0, _.parseSocketIOUrl)(i) : i, n = c.current.queryParams ? (0, _.appendQueryParams)(o, c.current.queryParams) : o, [2, n]
                        }
                    })
                })
            };
        e.getUrl = d
    })(W)), W
}
var $ = {},
    Te;

function qe() {
    return Te || (Te = 1, (function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.websocketWrapper = void 0;
        var S = function(E, _) {
            return new Proxy(E, {
                get: function(l, O) {
                    var d = l[O];
                    return O === "reconnect" ? _ : typeof d == "function" ? (console.error("Calling methods directly on the websocket is not supported at this moment. You must use the methods returned by useWebSocket."), function() {}) : d
                },
                set: function(l, O, d) {
                    return /^on/.test(O) ? (console.warn("The websocket's event handlers should be defined through the options object passed into useWebSocket."), !1) : (l[O] = d, !0)
                }
            })
        };
        e.websocketWrapper = S, e.default = e.websocketWrapper
    })($)), $
}
var Ne;

function ue() {
    if (Ne) return M;
    Ne = 1;
    var e = M && M.__assign || function() {
            return e = Object.assign || function(t) {
                for (var o, n = 1, f = arguments.length; n < f; n++) {
                    o = arguments[n];
                    for (var u in o) Object.prototype.hasOwnProperty.call(o, u) && (t[u] = o[u])
                }
                return t
            }, e.apply(this, arguments)
        },
        S = M && M.__awaiter || function(t, o, n, f) {
            function u(s) {
                return s instanceof n ? s : new n(function(b) {
                    b(s)
                })
            }
            return new(n || (n = Promise))(function(s, b) {
                function y(g) {
                    try {
                        h(f.next(g))
                    } catch (N) {
                        b(N)
                    }
                }

                function m(g) {
                    try {
                        h(f.throw(g))
                    } catch (N) {
                        b(N)
                    }
                }

                function h(g) {
                    g.done ? s(g.value) : u(g.value).then(y, m)
                }
                h((f = f.apply(t, o || [])).next())
            })
        },
        E = M && M.__generator || function(t, o) {
            var n = {
                    label: 0,
                    sent: function() {
                        if (s[0] & 1) throw s[1];
                        return s[1]
                    },
                    trys: [],
                    ops: []
                },
                f, u, s, b;
            return b = {
                next: y(0),
                throw: y(1),
                return: y(2)
            }, typeof Symbol == "function" && (b[Symbol.iterator] = function() {
                return this
            }), b;

            function y(h) {
                return function(g) {
                    return m([h, g])
                }
            }

            function m(h) {
                if (f) throw new TypeError("Generator is already executing.");
                for (; n;) try {
                    if (f = 1, u && (s = h[0] & 2 ? u.return : h[0] ? u.throw || ((s = u.return) && s.call(u), 0) : u.next) && !(s = s.call(u, h[1])).done) return s;
                    switch (u = 0, s && (h = [h[0] & 2, s.value]), h[0]) {
                        case 0:
                        case 1:
                            s = h;
                            break;
                        case 4:
                            return n.label++, {
                                value: h[1],
                                done: !1
                            };
                        case 5:
                            n.label++, u = h[1], h = [0];
                            continue;
                        case 7:
                            h = n.ops.pop(), n.trys.pop();
                            continue;
                        default:
                            if (s = n.trys, !(s = s.length > 0 && s[s.length - 1]) && (h[0] === 6 || h[0] === 2)) {
                                n = 0;
                                continue
                            }
                            if (h[0] === 3 && (!s || h[1] > s[0] && h[1] < s[3])) {
                                n.label = h[1];
                                break
                            }
                            if (h[0] === 6 && n.label < s[1]) {
                                n.label = s[1], s = h;
                                break
                            }
                            if (s && n.label < s[2]) {
                                n.label = s[2], n.ops.push(h);
                                break
                            }
                            s[2] && n.ops.pop(), n.trys.pop();
                            continue
                    }
                    h = o.call(t, n)
                } catch (g) {
                    h = [6, g], u = 0
                } finally {
                    f = s = 0
                }
                if (h[0] & 5) throw h[1];
                return {
                    value: h[0] ? h[1] : void 0,
                    done: !0
                }
            }
        },
        _ = M && M.__importDefault || function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        };
    Object.defineProperty(M, "__esModule", {
        value: !0
    }), M.useWebSocket = void 0;
    var l = ee(),
        O = Ue(),
        d = C(),
        v = Re(),
        c = je(),
        a = _(qe()),
        i = ae(),
        r = function(t, o, n) {
            o === void 0 && (o = d.DEFAULT_OPTIONS), n === void 0 && (n = !0);
            var f = (0, l.useState)(null),
                u = f[0],
                s = f[1],
                b = (0, l.useState)({}),
                y = b[0],
                m = b[1],
                h = (0, l.useMemo)(function() {
                    if (u) try {
                        return JSON.parse(u.data)
                    } catch {
                        return d.UNPARSABLE_JSON_OBJECT
                    }
                    return null
                }, [u]),
                g = (0, l.useRef)(null),
                N = (0, l.useRef)(null),
                K = (0, l.useRef)(function() {}),
                ce = (0, l.useRef)(0),
                oe = (0, l.useRef)([]),
                k = (0, l.useRef)(null),
                R = (0, l.useRef)(o);
            R.current = o;
            var Q = g.current && y[g.current] !== void 0 ? y[g.current] : t !== null && n === !0 ? d.ReadyState.CONNECTING : d.ReadyState.UNINSTANTIATED,
                Pe = o.queryParams ? JSON.stringify(o.queryParams) : null,
                j = (0, l.useCallback)(function(T, p) {
                    var q;
                    if (p === void 0 && (p = !0), d.isEventSourceSupported && N.current instanceof EventSource) {
                        console.warn("Unable to send a message from an eventSource");
                        return
                    }((q = N.current) === null || q === void 0 ? void 0 : q.readyState) === d.ReadyState.OPEN ? ((0, i.assertIsWebSocket)(N.current, R.current.skipAssert), N.current.send(T)) : p && oe.current.push(T)
                }, []),
                we = (0, l.useCallback)(function(T, p) {
                    p === void 0 && (p = !0), j(JSON.stringify(T), p)
                }, [j]),
                ke = (0, l.useCallback)(function() {
                    return R.current.share !== !0 || d.isEventSourceSupported && N.current instanceof EventSource ? N.current : (k.current === null && N.current && ((0, i.assertIsWebSocket)(N.current, R.current.skipAssert), k.current = (0, a.default)(N.current, K)), k.current)
                }, []);
            return (0, l.useEffect)(function() {
                if (t !== null && n === !0) {
                    var T, p = !1,
                        q = !0,
                        ie = function() {
                            return S(void 0, void 0, void 0, function() {
                                var B, F, se;
                                return E(this, function(le) {
                                    switch (le.label) {
                                        case 0:
                                            return B = g, [4, (0, c.getUrl)(t, R)];
                                        case 1:
                                            return B.current = le.sent(), g.current === null ? (console.error("Failed to get a valid URL. WebSocket connection aborted."), g.current = "ABORTED", (0, O.flushSync)(function() {
                                                return m(function(G) {
                                                    return e(e({}, G), {
                                                        ABORTED: d.ReadyState.CLOSED
                                                    })
                                                })
                                            }), [2]) : (F = function(G) {
                                                p || (0, O.flushSync)(function() {
                                                    return s(G)
                                                })
                                            }, se = function(G) {
                                                p || (0, O.flushSync)(function() {
                                                    return m(function(Ae) {
                                                        var Y;
                                                        return e(e({}, Ae), g.current && (Y = {}, Y[g.current] = G, Y))
                                                    })
                                                })
                                            }, q && (T = (0, v.createOrJoinSocket)(N, g.current, se, R, F, K, ce, j)), [2])
                                    }
                                })
                            })
                        };
                    return K.current = function() {
                            p || (k.current && (k.current = null), T ? .(), ie())
                        }, ie(),
                        function() {
                            p = !0, q = !1, k.current && (k.current = null), T ? .(), s(null)
                        }
                } else(t === null || n === !1) && (ce.current = 0, m(function(B) {
                    var F;
                    return e(e({}, B), g.current && (F = {}, F[g.current] = d.ReadyState.CLOSED, F))
                }))
            }, [t, n, Pe, j]), (0, l.useEffect)(function() {
                Q === d.ReadyState.OPEN && oe.current.splice(0).forEach(function(T) {
                    j(T)
                })
            }, [Q]), {
                sendMessage: j,
                sendJsonMessage: we,
                lastMessage: u,
                lastJsonMessage: h,
                readyState: Q,
                getWebSocket: ke
            }
        };
    return M.useWebSocket = r, M
}
var D = {},
    Me;

function Fe() {
    if (Me) return D;
    Me = 1;
    var e = D && D.__assign || function() {
        return e = Object.assign || function(v) {
            for (var c, a = 1, i = arguments.length; a < i; a++) {
                c = arguments[a];
                for (var r in c) Object.prototype.hasOwnProperty.call(c, r) && (v[r] = c[r])
            }
            return v
        }, e.apply(this, arguments)
    };
    Object.defineProperty(D, "__esModule", {
        value: !0
    }), D.useSocketIO = void 0;
    var S = ee(),
        E = ue(),
        _ = C(),
        l = {
            type: "empty",
            payload: null
        },
        O = function(v) {
            if (!v || !v.data) return l;
            var c = v.data.match(/\[.*]/);
            if (!c) return l;
            var a = JSON.parse(c);
            return !Array.isArray(a) || !a[1] ? l : {
                type: a[0],
                payload: a[1]
            }
        },
        d = function(v, c, a) {
            c === void 0 && (c = _.DEFAULT_OPTIONS), a === void 0 && (a = !0);
            var i = (0, S.useMemo)(function() {
                    return e(e({}, c), {
                        fromSocketIO: !0
                    })
                }, []),
                r = (0, E.useWebSocket)(v, i, a),
                t = r.sendMessage,
                o = r.sendJsonMessage,
                n = r.lastMessage,
                f = r.readyState,
                u = r.getWebSocket,
                s = (0, S.useMemo)(function() {
                    return O(n)
                }, [n]);
            return {
                sendMessage: t,
                sendJsonMessage: o,
                lastMessage: s,
                lastJsonMessage: s,
                readyState: f,
                getWebSocket: u
            }
        };
    return D.useSocketIO = d, D
}
var P = {},
    me;

function Ge() {
    if (me) return P;
    me = 1;
    var e = P && P.__assign || function() {
            return e = Object.assign || function(d) {
                for (var v, c = 1, a = arguments.length; c < a; c++) {
                    v = arguments[c];
                    for (var i in v) Object.prototype.hasOwnProperty.call(v, i) && (d[i] = v[i])
                }
                return d
            }, e.apply(this, arguments)
        },
        S = P && P.__rest || function(d, v) {
            var c = {};
            for (var a in d) Object.prototype.hasOwnProperty.call(d, a) && v.indexOf(a) < 0 && (c[a] = d[a]);
            if (d != null && typeof Object.getOwnPropertySymbols == "function")
                for (var i = 0, a = Object.getOwnPropertySymbols(d); i < a.length; i++) v.indexOf(a[i]) < 0 && Object.prototype.propertyIsEnumerable.call(d, a[i]) && (c[a[i]] = d[a[i]]);
            return c
        };
    Object.defineProperty(P, "__esModule", {
        value: !0
    }), P.useEventSource = void 0;
    var E = ee(),
        _ = ue(),
        l = C(),
        O = function(d, v, c) {
            v === void 0 && (v = l.DEFAULT_EVENT_SOURCE_OPTIONS);
            var a = v.withCredentials,
                i = v.events,
                r = S(v, ["withCredentials", "events"]);
            c === void 0 && (c = !0);
            var t = e(e({}, r), {
                    eventSourceOptions: {
                        withCredentials: a
                    }
                }),
                o = (0, E.useRef)(l.EMPTY_EVENT_HANDLERS);
            i && (o.current = i);
            var n = (0, _.useWebSocket)(d, t, c),
                f = n.lastMessage,
                u = n.readyState,
                s = n.getWebSocket;
            return (0, E.useEffect)(function() {
                f ? .type && Object.entries(o.current).forEach(function(b) {
                    var y = b[0],
                        m = b[1];
                    y === f.type && m(f)
                })
            }, [f]), {
                lastEvent: f,
                readyState: u,
                getEventSource: s
            }
        };
    return P.useEventSource = O, P
}
var pe;

function Je() {
    return pe || (pe = 1, (function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.resetGlobalState = e.useEventSource = e.ReadyState = e.useSocketIO = e.default = void 0;
        var S = ue();
        Object.defineProperty(e, "default", {
            enumerable: !0,
            get: function() {
                return S.useWebSocket
            }
        });
        var E = Fe();
        Object.defineProperty(e, "useSocketIO", {
            enumerable: !0,
            get: function() {
                return E.useSocketIO
            }
        });
        var _ = C();
        Object.defineProperty(e, "ReadyState", {
            enumerable: !0,
            get: function() {
                return _.ReadyState
            }
        });
        var l = Ge();
        Object.defineProperty(e, "useEventSource", {
            enumerable: !0,
            get: function() {
                return l.useEventSource
            }
        });
        var O = ae();
        Object.defineProperty(e, "resetGlobalState", {
            enumerable: !0,
            get: function() {
                return O.resetGlobalState
            }
        })
    })(z)), z
}
var He = Je();
const Ve = Ce.createContext({
        waitingForNewTurn: !1,
        sessionUser: null,
        userMetadata: {
            cf_connecting_ip: null,
            ip_city: null,
            time_zone: null,
            user_country: null,
            user_locale: null,
            user_region: null,
            user_region_code: null,
            latitude: null,
            longitude: null,
            locationAccuracy: null
        },
        submitFollowup: () => Promise.resolve(),
        submitSearch: () => Promise.resolve(),
        retrySearch: () => Promise.resolve(),
        resetSearch: fe,
        prefetch: fe,
        readyState: He.ReadyState.UNINSTANTIATED
    }),
    Ye = () => Ce.useContext(Ve),
    Be = {
        isInternalSettingsModalOpen: !1,
        isSettingsModalOpen: !1,
        isDebugModalOpen: !1,
        isUsageNuxModalOpen: !1,
        isWelcomePageOpen: !1
    },
    w = Le()(() => ({ ...Be
    })),
    V = {
        isInternalSettingsModalOpen: e => e.isInternalSettingsModalOpen,
        isSettingsModalOpen: e => e.isSettingsModalOpen,
        isDebugModalOpen: e => e.isDebugModalOpen,
        isUsageNuxModalOpen: e => e.isUsageNuxModalOpen,
        isWelcomePageOpen: e => e.isWelcomePageOpen,
        isModalOpen: e => V.isInternalSettingsModalOpen(e) || V.isSettingsModalOpen(e) || V.isDebugModalOpen(e) || V.isUsageNuxModalOpen(e) || V.isWelcomePageOpen(e)
    },
    ze = {
        toggleInternalSettingsModalOpen() {
            w.setState(e => ({
                isInternalSettingsModalOpen: !e.isInternalSettingsModalOpen
            }))
        },
        setInternalSettingsModalOpen(e) {
            w.setState({
                isInternalSettingsModalOpen: e
            })
        },
        toggleSettingsModalOpen() {
            w.setState(e => ({
                isSettingsModalOpen: !e.isSettingsModalOpen
            }))
        },
        setSettingsModalOpen(e) {
            w.setState({
                isSettingsModalOpen: e
            })
        },
        toggleDebugModalOpen() {
            w.setState(e => ({
                isDebugModalOpen: !e.isDebugModalOpen
            }))
        },
        setDebugModalOpen(e) {
            w.setState({
                isDebugModalOpen: e
            })
        },
        setUsageNuxModalOpen(e) {
            w.setState({
                isUsageNuxModalOpen: e
            })
        },
        setWelcomePageOpen(e) {
            w.setState({
                isWelcomePageOpen: e
            })
        }
    };
export {
    V as U, ze as a, Ye as b, He as d, w as u
};
//# sourceMappingURL=54d21dcb-lxup7vl8076a6e6t.js.map