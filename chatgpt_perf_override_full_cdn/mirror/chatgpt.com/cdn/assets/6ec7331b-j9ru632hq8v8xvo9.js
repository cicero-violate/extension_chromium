import {
    g as F,
    j as A,
    o as E
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    Y as S,
    gA as M
} from "./4813494d-javwxs2rmzsrunl2.js";
var D = {
        exports: {}
    },
    Y;

function y() {
    return Y || (Y = 1, (function(r, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = t;

        function t(n) {
            if (n === null || n === !0 || n === !1) return NaN;
            var a = Number(n);
            return isNaN(a) ? a : a < 0 ? Math.ceil(a) : Math.floor(a)
        }
        r.exports = e.default
    })(D, D.exports)), D.exports
}
var T = {
        exports: {}
    },
    m;

function Z() {
    return m || (m = 1, (function(r, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = t;

        function t(n) {
            var a = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds()));
            return a.setUTCFullYear(n.getFullYear()), n.getTime() - a.getTime()
        }
        r.exports = e.default
    })(T, T.exports)), T.exports
}

function j(r, e) {
    var t = k(e);
    return t.formatToParts ? P(t, r) : W(t, r)
}
var L = {
    year: 0,
    month: 1,
    day: 2,
    hour: 3,
    minute: 4,
    second: 5
};

function P(r, e) {
    try {
        for (var t = r.formatToParts(e), n = [], a = 0; a < t.length; a++) {
            var i = L[t[a].type];
            i >= 0 && (n[i] = parseInt(t[a].value, 10))
        }
        return n
    } catch (u) {
        if (u instanceof RangeError) return [NaN];
        throw u
    }
}

function W(r, e) {
    var t = r.format(e),
        n = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(t);
    return [n[3], n[1], n[2], n[4], n[5], n[6]]
}
var d = {};

function k(r) {
    if (!d[r]) {
        var e = new Intl.DateTimeFormat("en-US", {
                hourCycle: "h23",
                timeZone: "America/New_York",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }).format(new Date("2014-06-25T04:00:00.123Z")),
            t = e === "06/25/2014, 00:00:00" || e === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
        d[r] = t ? new Intl.DateTimeFormat("en-US", {
            hourCycle: "h23",
            timeZone: r,
            year: "numeric",
            month: "numeric",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }) : new Intl.DateTimeFormat("en-US", {
            hour12: !1,
            timeZone: r,
            year: "numeric",
            month: "numeric",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        })
    }
    return d[r]
}

function $(r, e, t, n, a, i, u) {
    var s = new Date(0);
    return s.setUTCFullYear(r, e, t), s.setUTCHours(n, a, i, u), s
}
var w = 36e5,
    R = 6e4,
    p = {
        timezoneZ: /^(Z)$/,
        timezoneHH: /^([+-]\d{2})$/,
        timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
    };

function b(r, e, t) {
    var n, a;
    if (!r || (n = p.timezoneZ.exec(r), n)) return 0;
    var i;
    if (n = p.timezoneHH.exec(r), n) return i = parseInt(n[1], 10), h(i) ? -(i * w) : NaN;
    if (n = p.timezoneHHMM.exec(r), n) {
        i = parseInt(n[2], 10);
        var u = parseInt(n[3], 10);
        return h(i, u) ? (a = Math.abs(i) * w + u * R, n[1] === "+" ? -a : a) : NaN
    }
    if (J(r)) {
        e = new Date(e || Date.now());
        var s = t ? e : q(e),
            l = I(s, r),
            f = t ? l : G(e, l, r);
        return -f
    }
    return NaN
}

function q(r) {
    return $(r.getFullYear(), r.getMonth(), r.getDate(), r.getHours(), r.getMinutes(), r.getSeconds(), r.getMilliseconds())
}

function I(r, e) {
    var t = j(r, e),
        n = $(t[0], t[1] - 1, t[2], t[3] % 24, t[4], t[5], 0).getTime(),
        a = r.getTime(),
        i = a % 1e3;
    return a -= i >= 0 ? i : 1e3 + i, n - a
}

function G(r, e, t) {
    var n = r.getTime(),
        a = n - e,
        i = I(new Date(a), t);
    if (e === i) return e;
    a -= i - e;
    var u = I(new Date(a), t);
    return i === u ? i : Math.max(i, u)
}

function h(r, e) {
    return -23 <= r && r <= 23 && (e == null || 0 <= e && e <= 59)
}
var x = {};

function J(r) {
    if (x[r]) return !0;
    try {
        return new Intl.DateTimeFormat(void 0, {
            timeZone: r
        }), x[r] = !0, !0
    } catch {
        return !1
    }
}
var V = y();
const B = F(V);
var K = Z();
const C = F(K);
var Q = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/,
    N = 36e5,
    U = 6e4,
    X = 2,
    o = {
        dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
        datePattern: /^([0-9W+-]+)(.*)/,
        YY: /^(\d{2})$/,
        YYY: [/^([+-]\d{2})$/, /^([+-]\d{3})$/, /^([+-]\d{4})$/],
        YYYY: /^(\d{4})/,
        YYYYY: [/^([+-]\d{4})/, /^([+-]\d{5})/, /^([+-]\d{6})/],
        MM: /^-(\d{2})$/,
        DDD: /^-?(\d{3})$/,
        MMDD: /^-?(\d{2})-?(\d{2})$/,
        Www: /^-?W(\d{2})$/,
        WwwD: /^-?W(\d{2})-?(\d{1})$/,
        HH: /^(\d{2}([.,]\d*)?)$/,
        HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
        HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
        timeZone: Q
    };

function ee(r, e) {
    if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
    if (r === null) return new Date(NaN);
    var t = {},
        n = t.additionalDigits == null ? X : B(t.additionalDigits);
    if (n !== 2 && n !== 1 && n !== 0) throw new RangeError("additionalDigits must be 0, 1 or 2");
    if (r instanceof Date || typeof r == "object" && Object.prototype.toString.call(r) === "[object Date]") return new Date(r.getTime());
    if (typeof r == "number" || Object.prototype.toString.call(r) === "[object Number]") return new Date(r);
    if (!(typeof r == "string" || Object.prototype.toString.call(r) === "[object String]")) return new Date(NaN);
    var a = re(r),
        i = te(a.date, n),
        u = i.year,
        s = i.restDateString,
        l = ne(s, u);
    if (isNaN(l)) return new Date(NaN);
    if (l) {
        var f = l.getTime(),
            c = 0,
            v;
        if (a.time && (c = ae(a.time), isNaN(c))) return new Date(NaN);
        if (a.timeZone || t.timeZone) {
            if (v = b(a.timeZone || t.timeZone, new Date(f + c)), isNaN(v)) return new Date(NaN)
        } else v = C(new Date(f + c)), v = C(new Date(f + c + v));
        return new Date(f + c + v)
    } else return new Date(NaN)
}

function re(r) {
    var e = {},
        t = o.dateTimePattern.exec(r),
        n;
    if (t ? (e.date = t[1], n = t[3]) : (t = o.datePattern.exec(r), t ? (e.date = t[1], n = t[2]) : (e.date = null, n = r)), n) {
        var a = o.timeZone.exec(n);
        a ? (e.time = n.replace(a[1], ""), e.timeZone = a[1].trim()) : e.time = n
    }
    return e
}

function te(r, e) {
    var t = o.YYY[e],
        n = o.YYYYY[e],
        a;
    if (a = o.YYYY.exec(r) || n.exec(r), a) {
        var i = a[1];
        return {
            year: parseInt(i, 10),
            restDateString: r.slice(i.length)
        }
    }
    if (a = o.YY.exec(r) || t.exec(r), a) {
        var u = a[1];
        return {
            year: parseInt(u, 10) * 100,
            restDateString: r.slice(u.length)
        }
    }
    return {
        year: null
    }
}

function ne(r, e) {
    if (e === null) return null;
    var t, n, a, i;
    if (r.length === 0) return n = new Date(0), n.setUTCFullYear(e), n;
    if (t = o.MM.exec(r), t) return n = new Date(0), a = parseInt(t[1], 10) - 1, O(e, a) ? (n.setUTCFullYear(e, a), n) : new Date(NaN);
    if (t = o.DDD.exec(r), t) {
        n = new Date(0);
        var u = parseInt(t[1], 10);
        return oe(e, u) ? (n.setUTCFullYear(e, 0, u), n) : new Date(NaN)
    }
    if (t = o.MMDD.exec(r), t) {
        n = new Date(0), a = parseInt(t[1], 10) - 1;
        var s = parseInt(t[2], 10);
        return O(e, a, s) ? (n.setUTCFullYear(e, a, s), n) : new Date(NaN)
    }
    if (t = o.Www.exec(r), t) return i = parseInt(t[1], 10) - 1, _(e, i) ? H(e, i) : new Date(NaN);
    if (t = o.WwwD.exec(r), t) {
        i = parseInt(t[1], 10) - 1;
        var l = parseInt(t[2], 10) - 1;
        return _(e, i, l) ? H(e, i, l) : new Date(NaN)
    }
    return null
}

function ae(r) {
    var e, t, n;
    if (e = o.HH.exec(r), e) return t = parseFloat(e[1].replace(",", ".")), g(t) ? t % 24 * N : NaN;
    if (e = o.HHMM.exec(r), e) return t = parseInt(e[1], 10), n = parseFloat(e[2].replace(",", ".")), g(t, n) ? t % 24 * N + n * U : NaN;
    if (e = o.HHMMSS.exec(r), e) {
        t = parseInt(e[1], 10), n = parseInt(e[2], 10);
        var a = parseFloat(e[3].replace(",", "."));
        return g(t, n, a) ? t % 24 * N + n * U + a * 1e3 : NaN
    }
    return null
}

function H(r, e, t) {
    e = e || 0, t = t || 0;
    var n = new Date(0);
    n.setUTCFullYear(r, 0, 4);
    var a = n.getUTCDay() || 7,
        i = e * 7 + t + 1 - a;
    return n.setUTCDate(n.getUTCDate() + i), n
}
var ie = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    ue = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function z(r) {
    return r % 400 === 0 || r % 4 === 0 && r % 100 !== 0
}

function O(r, e, t) {
    if (e < 0 || e > 11) return !1;
    if (t != null) {
        if (t < 1) return !1;
        var n = z(r);
        if (n && t > ue[e] || !n && t > ie[e]) return !1
    }
    return !0
}

function oe(r, e) {
    if (e < 1) return !1;
    var t = z(r);
    return !(t && e > 366 || !t && e > 365)
}

function _(r, e, t) {
    return !(e < 0 || e > 52 || t != null && (t < 0 || t > 6))
}

function g(r, e, t) {
    return !(r != null && (r < 0 || r >= 25) || e != null && (e < 0 || e >= 60) || t != null && (t < 0 || t >= 60))
}

function se(r, e, t) {
    var n = ee(r, t),
        a = b(e, n, !0),
        i = new Date(n.getTime() - a),
        u = new Date(0);
    return u.setFullYear(i.getUTCFullYear(), i.getUTCMonth(), i.getUTCDate()), u.setHours(i.getUTCHours(), i.getUTCMinutes(), i.getUTCSeconds(), i.getUTCMilliseconds()), u
}

function ce(r, e) {
    const t = S(r),
        n = e < 0 ? "-" : "+",
        a = Math.abs(e),
        i = Math.floor(a / 3600).toString().padStart(2, "0"),
        u = Math.floor(a % 3600 / 60).toString().padStart(2, "0"),
        s = `${n}${i}:${u}`;
    return se(t, s)
}

function ve(r, e) {
    if (M(e)) return A.jsx(E, {
        id: "wxni9H",
        defaultMessage: "Today"
    });
    const t = new Date;
    return t.setTime(t.getTime() + 10080 * 60 * 1e3), e < t && e > new Date || M(e) ? r.formatDate(e, {
        weekday: "long"
    }) : r.formatDate(e, {
        weekday: "short",
        month: "short",
        day: "numeric"
    })
}
export {
    ce as g, ve as r, ee as t, se as u
};
//# sourceMappingURL=6ec7331b-j9ru632hq8v8xvo9.js.map