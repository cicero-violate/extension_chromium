import {
    g as j
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    s as v
} from "./1bc04b52-h1em0bjkpkjv8ykw.js";

function Y(n) {
    if (n) throw n
}
var E, R;

function P() {
    if (R) return E;
    R = 1;
    var n = Object.prototype.hasOwnProperty,
        e = Object.prototype.toString,
        t = Object.defineProperty,
        s = Object.getOwnPropertyDescriptor,
        i = function(f) {
            return typeof Array.isArray == "function" ? Array.isArray(f) : e.call(f) === "[object Array]"
        },
        r = function(f) {
            if (!f || e.call(f) !== "[object Object]") return !1;
            var u = n.call(f, "constructor"),
                a = f.constructor && f.constructor.prototype && n.call(f.constructor.prototype, "isPrototypeOf");
            if (f.constructor && !u && !a) return !1;
            var h;
            for (h in f);
            return typeof h > "u" || n.call(f, h)
        },
        o = function(f, u) {
            t && u.name === "__proto__" ? t(f, u.name, {
                enumerable: !0,
                configurable: !0,
                value: u.newValue,
                writable: !0
            }) : f[u.name] = u.newValue
        },
        l = function(f, u) {
            if (u === "__proto__")
                if (n.call(f, u)) {
                    if (s) return s(f, u).value
                } else return;
            return f[u]
        };
    return E = function c() {
        var f, u, a, h, w, b, p = arguments[0],
            m = 1,
            T = arguments.length,
            x = !1;
        for (typeof p == "boolean" && (x = p, p = arguments[1] || {}, m = 2), (p == null || typeof p != "object" && typeof p != "function") && (p = {}); m < T; ++m)
            if (f = arguments[m], f != null)
                for (u in f) a = l(p, u), h = l(f, u), p !== h && (x && h && (r(h) || (w = i(h))) ? (w ? (w = !1, b = a && i(a) ? a : []) : b = a && r(a) ? a : {}, o(p, {
                    name: u,
                    newValue: c(x, b, h)
                })) : typeof h < "u" && o(p, {
                    name: u,
                    newValue: h
                }));
        return p
    }, E
}
var k = P();
const K = j(k);

function Q(n) {
    if (typeof n != "object" || n === null) return !1;
    const e = Object.getPrototypeOf(n);
    return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in n) && !(Symbol.iterator in n)
}

function W() {
    const n = [],
        e = {
            run: t,
            use: s
        };
    return e;

    function t(...i) {
        let r = -1;
        const o = i.pop();
        if (typeof o != "function") throw new TypeError("Expected function as last argument, not " + o);
        l(null, ...i);

        function l(c, ...f) {
            const u = n[++r];
            let a = -1;
            if (c) {
                o(c);
                return
            }
            for (; ++a < i.length;)(f[a] === null || f[a] === void 0) && (f[a] = i[a]);
            i = f, u ? V(u, l)(...f) : o(null, ...f)
        }
    }

    function s(i) {
        if (typeof i != "function") throw new TypeError("Expected `middelware` to be a function, not " + i);
        return n.push(i), e
    }
}

function V(n, e) {
    let t;
    return s;

    function s(...o) {
        const l = n.length > o.length;
        let c;
        l && o.push(i);
        try {
            c = n.apply(this, o)
        } catch (f) {
            const u = f;
            if (l && t) throw u;
            return i(u)
        }
        l || (c instanceof Promise ? c.then(r, i) : c instanceof Error ? i(c) : r(c))
    }

    function i(o, ...l) {
        t || (t = !0, e(o, ...l))
    }

    function r(o) {
        i(null, o)
    }
}
class d extends Error {
    constructor(e, t, s) {
        super(), typeof t == "string" && (s = t, t = void 0);
        let i = "",
            r = {},
            o = !1;
        if (t && ("line" in t && "column" in t ? r = {
                place: t
            } : "start" in t && "end" in t ? r = {
                place: t
            } : "type" in t ? r = {
                ancestors: [t],
                place: t.position
            } : r = { ...t
            }), typeof e == "string" ? i = e : !r.cause && e && (o = !0, i = e.message, r.cause = e), !r.ruleId && !r.source && typeof s == "string") {
            const c = s.indexOf(":");
            c === -1 ? r.ruleId = s : (r.source = s.slice(0, c), r.ruleId = s.slice(c + 1))
        }
        if (!r.place && r.ancestors && r.ancestors) {
            const c = r.ancestors[r.ancestors.length - 1];
            c && (r.place = c.position)
        }
        const l = r.place && "start" in r.place ? r.place.start : r.place;
        this.ancestors = r.ancestors || void 0, this.cause = r.cause || void 0, this.column = l ? l.column : void 0, this.fatal = void 0, this.file, this.message = i, this.line = l ? l.line : void 0, this.name = v(r.place) || "1:1", this.place = r.place || void 0, this.reason = this.message, this.ruleId = r.ruleId || void 0, this.source = r.source || void 0, this.stack = o && r.cause && typeof r.cause.stack == "string" ? r.cause.stack : "", this.actual, this.expected, this.note, this.url
    }
}
d.prototype.file = "";
d.prototype.name = "";
d.prototype.reason = "";
d.prototype.message = "";
d.prototype.stack = "";
d.prototype.column = void 0;
d.prototype.line = void 0;
d.prototype.ancestors = void 0;
d.prototype.cause = void 0;
d.prototype.fatal = void 0;
d.prototype.place = void 0;
d.prototype.ruleId = void 0;
d.prototype.source = void 0;
const y = {
    basename: D,
    dirname: F,
    extname: N,
    join: C,
    sep: "/"
};

function D(n, e) {
    if (e !== void 0 && typeof e != "string") throw new TypeError('"ext" argument must be a string');
    g(n);
    let t = 0,
        s = -1,
        i = n.length,
        r;
    if (e === void 0 || e.length === 0 || e.length > n.length) {
        for (; i--;)
            if (n.codePointAt(i) === 47) {
                if (r) {
                    t = i + 1;
                    break
                }
            } else s < 0 && (r = !0, s = i + 1);
        return s < 0 ? "" : n.slice(t, s)
    }
    if (e === n) return "";
    let o = -1,
        l = e.length - 1;
    for (; i--;)
        if (n.codePointAt(i) === 47) {
            if (r) {
                t = i + 1;
                break
            }
        } else o < 0 && (r = !0, o = i + 1), l > -1 && (n.codePointAt(i) === e.codePointAt(l--) ? l < 0 && (s = i) : (l = -1, s = o));
    return t === s ? s = o : s < 0 && (s = n.length), n.slice(t, s)
}

function F(n) {
    if (g(n), n.length === 0) return ".";
    let e = -1,
        t = n.length,
        s;
    for (; --t;)
        if (n.codePointAt(t) === 47) {
            if (s) {
                e = t;
                break
            }
        } else s || (s = !0);
    return e < 0 ? n.codePointAt(0) === 47 ? "/" : "." : e === 1 && n.codePointAt(0) === 47 ? "//" : n.slice(0, e)
}

function N(n) {
    g(n);
    let e = n.length,
        t = -1,
        s = 0,
        i = -1,
        r = 0,
        o;
    for (; e--;) {
        const l = n.codePointAt(e);
        if (l === 47) {
            if (o) {
                s = e + 1;
                break
            }
            continue
        }
        t < 0 && (o = !0, t = e + 1), l === 46 ? i < 0 ? i = e : r !== 1 && (r = 1) : i > -1 && (r = -1)
    }
    return i < 0 || t < 0 || r === 0 || r === 1 && i === t - 1 && i === s + 1 ? "" : n.slice(i, t)
}

function C(...n) {
    let e = -1,
        t;
    for (; ++e < n.length;) g(n[e]), n[e] && (t = t === void 0 ? n[e] : t + "/" + n[e]);
    return t === void 0 ? "." : U(t)
}

function U(n) {
    g(n);
    const e = n.codePointAt(0) === 47;
    let t = q(n, !e);
    return t.length === 0 && !e && (t = "."), t.length > 0 && n.codePointAt(n.length - 1) === 47 && (t += "/"), e ? "/" + t : t
}

function q(n, e) {
    let t = "",
        s = 0,
        i = -1,
        r = 0,
        o = -1,
        l, c;
    for (; ++o <= n.length;) {
        if (o < n.length) l = n.codePointAt(o);
        else {
            if (l === 47) break;
            l = 47
        }
        if (l === 47) {
            if (!(i === o - 1 || r === 1))
                if (i !== o - 1 && r === 2) {
                    if (t.length < 2 || s !== 2 || t.codePointAt(t.length - 1) !== 46 || t.codePointAt(t.length - 2) !== 46) {
                        if (t.length > 2) {
                            if (c = t.lastIndexOf("/"), c !== t.length - 1) {
                                c < 0 ? (t = "", s = 0) : (t = t.slice(0, c), s = t.length - 1 - t.lastIndexOf("/")), i = o, r = 0;
                                continue
                            }
                        } else if (t.length > 0) {
                            t = "", s = 0, i = o, r = 0;
                            continue
                        }
                    }
                    e && (t = t.length > 0 ? t + "/.." : "..", s = 2)
                } else t.length > 0 ? t += "/" + n.slice(i + 1, o) : t = n.slice(i + 1, o), s = o - i - 1;
            i = o, r = 0
        } else l === 46 && r > -1 ? r++ : r = -1
    }
    return t
}

function g(n) {
    if (typeof n != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(n))
}
const H = {
    cwd: z
};

function z() {
    return "/"
}

function S(n) {
    return !!(n !== null && typeof n == "object" && "href" in n && n.href && "protocol" in n && n.protocol && n.auth === void 0)
}

function B(n) {
    if (typeof n == "string") n = new URL(n);
    else if (!S(n)) {
        const e = new TypeError('The "path" argument must be of type string or an instance of URL. Received `' + n + "`");
        throw e.code = "ERR_INVALID_ARG_TYPE", e
    }
    if (n.protocol !== "file:") {
        const e = new TypeError("The URL must be of scheme file");
        throw e.code = "ERR_INVALID_URL_SCHEME", e
    }
    return M(n)
}

function M(n) {
    if (n.hostname !== "") {
        const s = new TypeError('File URL host must be "localhost" or empty on darwin');
        throw s.code = "ERR_INVALID_FILE_URL_HOST", s
    }
    const e = n.pathname;
    let t = -1;
    for (; ++t < e.length;)
        if (e.codePointAt(t) === 37 && e.codePointAt(t + 1) === 50) {
            const s = e.codePointAt(t + 2);
            if (s === 70 || s === 102) {
                const i = new TypeError("File URL path must not include encoded / characters");
                throw i.code = "ERR_INVALID_FILE_URL_PATH", i
            }
        }
    return decodeURIComponent(e)
}
const A = ["history", "path", "basename", "stem", "extname", "dirname"];
class X {
    constructor(e) {
        let t;
        e ? S(e) ? t = {
            path: e
        } : typeof e == "string" || $(e) ? t = {
            value: e
        } : t = e : t = {}, this.cwd = "cwd" in t ? "" : H.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
        let s = -1;
        for (; ++s < A.length;) {
            const r = A[s];
            r in t && t[r] !== void 0 && t[r] !== null && (this[r] = r === "history" ? [...t[r]] : t[r])
        }
        let i;
        for (i in t) A.includes(i) || (this[i] = t[i])
    }
    get basename() {
        return typeof this.path == "string" ? y.basename(this.path) : void 0
    }
    set basename(e) {
        _(e, "basename"), I(e, "basename"), this.path = y.join(this.dirname || "", e)
    }
    get dirname() {
        return typeof this.path == "string" ? y.dirname(this.path) : void 0
    }
    set dirname(e) {
        L(this.basename, "dirname"), this.path = y.join(e || "", this.basename)
    }
    get extname() {
        return typeof this.path == "string" ? y.extname(this.path) : void 0
    }
    set extname(e) {
        if (I(e, "extname"), L(this.dirname, "extname"), e) {
            if (e.codePointAt(0) !== 46) throw new Error("`extname` must start with `.`");
            if (e.includes(".", 1)) throw new Error("`extname` cannot contain multiple dots")
        }
        this.path = y.join(this.dirname, this.stem + (e || ""))
    }
    get path() {
        return this.history[this.history.length - 1]
    }
    set path(e) {
        S(e) && (e = B(e)), _(e, "path"), this.path !== e && this.history.push(e)
    }
    get stem() {
        return typeof this.path == "string" ? y.basename(this.path, this.extname) : void 0
    }
    set stem(e) {
        _(e, "stem"), I(e, "stem"), this.path = y.join(this.dirname || "", e + (this.extname || ""))
    }
    fail(e, t, s) {
        const i = this.message(e, t, s);
        throw i.fatal = !0, i
    }
    info(e, t, s) {
        const i = this.message(e, t, s);
        return i.fatal = void 0, i
    }
    message(e, t, s) {
        const i = new d(e, t, s);
        return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i
    }
    toString(e) {
        return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(e || void 0).decode(this.value)
    }
}

function I(n, e) {
    if (n && n.includes(y.sep)) throw new Error("`" + e + "` cannot be a path: did not expect `" + y.sep + "`")
}

function _(n, e) {
    if (!n) throw new Error("`" + e + "` cannot be empty")
}

function L(n, e) {
    if (!n) throw new Error("Setting `" + e + "` requires `path` to be set too")
}

function $(n) {
    return !!(n && typeof n == "object" && "byteLength" in n && "byteOffset" in n)
}
export {
    X as V, d as a, Y as b, K as e, Q as i, W as t
};
//# sourceMappingURL=1bc04b52-lymnctp12j4ukscl.js.map