import {
    e as _,
    g as q
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    tB as O
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
var m = {
        exports: {}
    },
    d = {};
var E;

function g() {
    if (E) return d;
    E = 1;
    var a = _(),
        V = O();

    function W(r, u) {
        return r === u && (r !== 0 || 1 / r === 1 / u) || r !== r && u !== u
    }
    var j = typeof Object.is == "function" ? Object.is : W,
        w = V.useSyncExternalStore,
        y = a.useRef,
        z = a.useEffect,
        D = a.useMemo,
        M = a.useDebugValue;
    return d.useSyncExternalStoreWithSelector = function(r, u, s, v, f) {
        var t = y(null);
        if (t.current === null) {
            var o = {
                hasValue: !1,
                value: null
            };
            t.current = o
        } else o = t.current;
        t = D(function() {
            function h(e) {
                if (!R) {
                    if (R = !0, l = e, e = v(e), f !== void 0 && o.hasValue) {
                        var i = o.value;
                        if (f(i, e)) return n = i
                    }
                    return n = e
                }
                if (i = n, j(l, e)) return i;
                var p = v(e);
                return f !== void 0 && f(i, p) ? (l = e, i) : (l = e, n = p)
            }
            var R = !1,
                l, n, b = s === void 0 ? null : s;
            return [function() {
                return h(u())
            }, b === null ? void 0 : function() {
                return h(b())
            }]
        }, [u, s, v, f]);
        var c = w(r, t[0], t[1]);
        return z(function() {
            o.hasValue = !0, o.value = c
        }, [c]), M(c), c
    }, d
}
var S;

function x() {
    return S || (S = 1, m.exports = g()), m.exports
}
var B = x();
const G = q(B);
export {
    G as u, B as w
};
//# sourceMappingURL=1a1bda43-ccqt51bvbkt9kl39.js.map