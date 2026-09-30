import {
    r as t
} from "./2340486e-dvd8m80i7d6hyild.js";

function O(u, r, c, o) {
    var l = this,
        n = t.useRef(null),
        f = t.useRef(0),
        s = t.useRef(0),
        i = t.useRef(null),
        m = t.useRef([]),
        v = t.useRef(),
        d = t.useRef(),
        F = t.useRef(u),
        R = t.useRef(!0);
    F.current = u;
    var y = typeof window < "u",
        p = !r && r !== 0 && y;
    if (typeof u != "function") throw new TypeError("Expected a function");
    r = +r || 0;
    var T = !!(c = c || {}).leading,
        W = !("trailing" in c) || !!c.trailing,
        g = "maxWait" in c,
        b = "debounceOnServer" in c && !!c.debounceOnServer,
        A = g ? Math.max(+c.maxWait || 0, r) : null;
    t.useEffect(function() {
        return R.current = !0,
            function() {
                R.current = !1
            }
    }, []);
    var k = t.useMemo(function() {
        var D = function(e) {
                var a = m.current,
                    h = v.current;
                return m.current = v.current = null, f.current = e, s.current = s.current || e, d.current = F.current.apply(h, a)
            },
            w = function(e, a) {
                p && cancelAnimationFrame(i.current), i.current = p ? requestAnimationFrame(e) : setTimeout(e, a)
            },
            M = function(e) {
                if (!R.current) return !1;
                var a = e - n.current;
                return !n.current || a >= r || a < 0 || g && e - f.current >= A
            },
            S = function(e) {
                return i.current = null, W && m.current ? D(e) : (m.current = v.current = null, d.current)
            },
            E = function e() {
                var a = Date.now();
                if (T && s.current === f.current && q(), M(a)) return S(a);
                if (R.current) {
                    var h = r - (a - n.current),
                        C = g ? Math.min(h, A - (a - f.current)) : h;
                    w(e, C)
                }
            },
            q = function() {
                o && o({})
            },
            x = function() {
                if (y || b) {
                    var e = Date.now(),
                        a = M(e);
                    if (m.current = [].slice.call(arguments), v.current = l, n.current = e, a) {
                        if (!i.current && R.current) return f.current = n.current, w(E, r), T ? D(n.current) : d.current;
                        if (g) return w(E, r), D(n.current)
                    }
                    return i.current || w(E, r), d.current
                }
            };
        return x.cancel = function() {
            i.current && (p ? cancelAnimationFrame(i.current) : clearTimeout(i.current)), f.current = 0, m.current = n.current = v.current = i.current = null
        }, x.isPending = function() {
            return !!i.current
        }, x.flush = function() {
            return i.current ? S(Date.now()) : d.current
        }, x
    }, [T, g, r, A, W, p, y, b, o]);
    return k
}

function P(u, r) {
    return u === r
}

function z(u, r, c) {
    var o = P,
        l = t.useRef(u),
        n = t.useState({})[1],
        f = O(t.useCallback(function(i) {
            l.current = i, n({})
        }, [n]), r, c, n),
        s = t.useRef(u);
    return o(s.current, u) || (f(u), s.current = u), [l.current, f]
}

function B(u, r, c) {
    var o = c === void 0 ? {} : c,
        l = o.leading,
        n = o.trailing;
    return O(u, r, {
        maxWait: r,
        leading: l === void 0 || l,
        trailing: n === void 0 || n
    })
}
export {
    z as a, O as c, B as o
};
//# sourceMappingURL=22724723-hcq7pr9e9rdzi53r.js.map