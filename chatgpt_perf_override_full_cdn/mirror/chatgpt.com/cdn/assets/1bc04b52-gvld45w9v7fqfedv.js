function O() {}
O.prototype = {
    diff: function(e, r) {
        var t, u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
            i = u.callback;
        typeof u == "function" && (i = u, u = {});
        var o = this;

        function l(c) {
            return c = o.postProcess(c, u), i ? (setTimeout(function() {
                i(c)
            }, 0), !0) : c
        }
        e = this.castInput(e, u), r = this.castInput(r, u), e = this.removeEmpty(this.tokenize(e, u)), r = this.removeEmpty(this.tokenize(r, u));
        var f = r.length,
            a = e.length,
            s = 1,
            v = f + a;
        u.maxEditLength != null && (v = Math.min(v, u.maxEditLength));
        var p = (t = u.timeout) !== null && t !== void 0 ? t : 1 / 0,
            m = Date.now() + p,
            h = [{
                oldPos: -1,
                lastComponent: void 0
            }],
            g = this.extractCommon(h[0], r, e, 0, u);
        if (h[0].oldPos + 1 >= a && g + 1 >= f) return l(_(o, h[0].lastComponent, r, e, o.useLongestToken));
        var E = -1 / 0,
            C = 1 / 0;

        function y() {
            for (var c = Math.max(E, -s); c <= Math.min(C, s); c += 2) {
                var w = void 0,
                    A = h[c - 1],
                    T = h[c + 1];
                A && (h[c - 1] = void 0);
                var b = !1;
                if (T) {
                    var D = T.oldPos - c;
                    b = T && 0 <= D && D < f
                }
                var H = A && A.oldPos + 1 < a;
                if (!b && !H) {
                    h[c] = void 0;
                    continue
                }
                if (!H || b && A.oldPos < T.oldPos ? w = o.addToPath(T, !0, !1, 0, u) : w = o.addToPath(A, !1, !0, 1, u), g = o.extractCommon(w, r, e, c, u), w.oldPos + 1 >= a && g + 1 >= f) return l(_(o, w.lastComponent, r, e, o.useLongestToken));
                h[c] = w, w.oldPos + 1 >= a && (C = Math.min(C, c - 1)), g + 1 >= f && (E = Math.max(E, c + 1))
            }
            s++
        }
        if (i)(function c() {
            setTimeout(function() {
                if (s > v || Date.now() > m) return i();
                y() || c()
            }, 0)
        })();
        else
            for (; s <= v && Date.now() <= m;) {
                var N = y();
                if (N) return N
            }
    },
    addToPath: function(e, r, t, u, i) {
        var o = e.lastComponent;
        return o && !i.oneChangePerToken && o.added === r && o.removed === t ? {
            oldPos: e.oldPos + u,
            lastComponent: {
                count: o.count + 1,
                added: r,
                removed: t,
                previousComponent: o.previousComponent
            }
        } : {
            oldPos: e.oldPos + u,
            lastComponent: {
                count: 1,
                added: r,
                removed: t,
                previousComponent: o
            }
        }
    },
    extractCommon: function(e, r, t, u, i) {
        for (var o = r.length, l = t.length, f = e.oldPos, a = f - u, s = 0; a + 1 < o && f + 1 < l && this.equals(t[f + 1], r[a + 1], i);) a++, f++, s++, i.oneChangePerToken && (e.lastComponent = {
            count: 1,
            previousComponent: e.lastComponent,
            added: !1,
            removed: !1
        });
        return s && !i.oneChangePerToken && (e.lastComponent = {
            count: s,
            previousComponent: e.lastComponent,
            added: !1,
            removed: !1
        }), e.oldPos = f, a
    },
    equals: function(e, r, t) {
        return t.comparator ? t.comparator(e, r) : e === r || t.ignoreCase && e.toLowerCase() === r.toLowerCase()
    },
    removeEmpty: function(e) {
        for (var r = [], t = 0; t < e.length; t++) e[t] && r.push(e[t]);
        return r
    },
    castInput: function(e) {
        return e
    },
    tokenize: function(e) {
        return Array.from(e)
    },
    join: function(e) {
        return e.join("")
    },
    postProcess: function(e) {
        return e
    }
};

function _(n, e, r, t, u) {
    for (var i = [], o; e;) i.push(e), o = e.previousComponent, delete e.previousComponent, e = o;
    i.reverse();
    for (var l = 0, f = i.length, a = 0, s = 0; l < f; l++) {
        var v = i[l];
        if (v.removed) v.value = n.join(t.slice(s, s + v.count)), s += v.count;
        else {
            if (!v.added && u) {
                var p = r.slice(a, a + v.count);
                p = p.map(function(m, h) {
                    var g = t[s + h];
                    return g.length > m.length ? g : m
                }), v.value = n.join(p)
            } else v.value = n.join(r.slice(a, a + v.count));
            a += v.count, v.added || (s += v.count)
        }
    }
    return i
}

function K(n, e) {
    var r;
    for (r = 0; r < n.length && r < e.length; r++)
        if (n[r] != e[r]) return n.slice(0, r);
    return n.slice(0, r)
}

function ee(n, e) {
    var r;
    if (!n || !e || n[n.length - 1] != e[e.length - 1]) return "";
    for (r = 0; r < n.length && r < e.length; r++)
        if (n[n.length - (r + 1)] != e[e.length - (r + 1)]) return n.slice(-r);
    return n.slice(-r)
}

function G(n, e, r) {
    if (n.slice(0, e.length) != e) throw Error("string ".concat(JSON.stringify(n), " doesn't start with prefix ").concat(JSON.stringify(e), "; this is a bug"));
    return r + n.slice(e.length)
}

function Q(n, e, r) {
    if (!e) return n + r;
    if (n.slice(-e.length) != e) throw Error("string ".concat(JSON.stringify(n), " doesn't end with suffix ").concat(JSON.stringify(e), "; this is a bug"));
    return n.slice(0, -e.length) + r
}

function M(n, e) {
    return G(n, e, "")
}

function j(n, e) {
    return Q(n, e, "")
}

function ne(n, e) {
    return e.slice(0, oe(n, e))
}

function oe(n, e) {
    var r = 0;
    n.length > e.length && (r = n.length - e.length);
    var t = e.length;
    n.length < e.length && (t = n.length);
    var u = Array(t),
        i = 0;
    u[0] = 0;
    for (var o = 1; o < t; o++) {
        for (e[o] == e[i] ? u[o] = u[i] : u[o] = i; i > 0 && e[o] != e[i];) i = u[i];
        e[o] == e[i] && i++
    }
    i = 0;
    for (var l = r; l < n.length; l++) {
        for (; i > 0 && n[l] != e[i];) i = u[i];
        n[l] == e[i] && i++
    }
    return i
}

function se(n) {
    return n.includes(`\r
`) && !n.startsWith(`
`) && !n.match(/[^\r]\n/)
}

function le(n) {
    return !n.includes(`\r
`) && n.includes(`
`)
}
var U = "a-zA-Z0-9_\\u{C0}-\\u{FF}\\u{D8}-\\u{F6}\\u{F8}-\\u{2C6}\\u{2C8}-\\u{2D7}\\u{2DE}-\\u{2FF}\\u{1E00}-\\u{1EFF}",
    fe = new RegExp("[".concat(U, "]+|\\s+|[^").concat(U, "]"), "ug"),
    V = new O;
V.equals = function(n, e, r) {
    return r.ignoreCase && (n = n.toLowerCase(), e = e.toLowerCase()), n.trim() === e.trim()
};
V.tokenize = function(n) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        r;
    if (e.intlSegmenter) {
        if (e.intlSegmenter.resolvedOptions().granularity != "word") throw new Error('The segmenter passed must have a granularity of "word"');
        r = Array.from(e.intlSegmenter.segment(n), function(i) {
            return i.segment
        })
    } else r = n.match(fe) || [];
    var t = [],
        u = null;
    return r.forEach(function(i) {
        /\s/.test(i) ? u == null ? t.push(i) : t.push(t.pop() + i) : /\s/.test(u) ? t[t.length - 1] == u ? t.push(t.pop() + i) : t.push(u + i) : t.push(i), u = i
    }), t
};
V.join = function(n) {
    return n.map(function(e, r) {
        return r == 0 ? e : e.replace(/^\s+/, "")
    }).join("")
};
V.postProcess = function(n, e) {
    if (!n || e.oneChangePerToken) return n;
    var r = null,
        t = null,
        u = null;
    return n.forEach(function(i) {
        i.added ? t = i : i.removed ? u = i : ((t || u) && re(r, u, t, i), r = i, t = null, u = null)
    }), (t || u) && re(r, u, t, null), n
};

function re(n, e, r, t) {
    if (e && r) {
        var u = e.value.match(/^\s*/)[0],
            i = e.value.match(/\s*$/)[0],
            o = r.value.match(/^\s*/)[0],
            l = r.value.match(/\s*$/)[0];
        if (n) {
            var f = K(u, o);
            n.value = Q(n.value, o, f), e.value = M(e.value, f), r.value = M(r.value, f)
        }
        if (t) {
            var a = ee(i, l);
            t.value = G(t.value, l, a), e.value = j(e.value, a), r.value = j(r.value, a)
        }
    } else if (r) n && (r.value = r.value.replace(/^\s*/, "")), t && (t.value = t.value.replace(/^\s*/, ""));
    else if (n && t) {
        var s = t.value.match(/^\s*/)[0],
            v = e.value.match(/^\s*/)[0],
            p = e.value.match(/\s*$/)[0],
            m = K(s, v);
        e.value = M(e.value, m);
        var h = ee(M(s, m), p);
        e.value = j(e.value, h), t.value = G(t.value, s, h), n.value = Q(n.value, s, s.slice(0, s.length - h.length))
    } else if (t) {
        var g = t.value.match(/^\s*/)[0],
            E = e.value.match(/\s*$/)[0],
            C = ne(E, g);
        e.value = j(e.value, C)
    } else if (n) {
        var y = n.value.match(/\s*$/)[0],
            N = e.value.match(/^\s*/)[0],
            c = ne(y, N);
        e.value = M(e.value, c)
    }
}
var ae = new O;
ae.tokenize = function(n) {
    var e = new RegExp("(\\r?\\n)|[".concat(U, "]+|[^\\S\\n\\r]+|[^").concat(U, "]"), "ug");
    return n.match(e) || []
};
var B = new O;
B.tokenize = function(n, e) {
    e.stripTrailingCr && (n = n.replace(/\r\n/g, `
`));
    var r = [],
        t = n.split(/(\n|\r\n)/);
    t[t.length - 1] || t.pop();
    for (var u = 0; u < t.length; u++) {
        var i = t[u];
        u % 2 && !e.newlineIsToken ? r[r.length - 1] += i : r.push(i)
    }
    return r
};
B.equals = function(n, e, r) {
    return r.ignoreWhitespace ? ((!r.newlineIsToken || !n.includes(`
`)) && (n = n.trim()), (!r.newlineIsToken || !e.includes(`
`)) && (e = e.trim())) : r.ignoreNewlineAtEof && !r.newlineIsToken && (n.endsWith(`
`) && (n = n.slice(0, -1)), e.endsWith(`
`) && (e = e.slice(0, -1))), O.prototype.equals.call(this, n, e, r)
};

function Le(n, e, r) {
    return B.diff(n, e, r)
}
var ve = new O;
ve.tokenize = function(n) {
    return n.split(/(\S.+?[.!?])(?=\s+|$)/)
};
var ce = new O;
ce.tokenize = function(n) {
    return n.split(/([{}:;,]|\s+)/)
};

function te(n, e) {
    var r = Object.keys(n);
    if (Object.getOwnPropertySymbols) {
        var t = Object.getOwnPropertySymbols(n);
        e && (t = t.filter(function(u) {
            return Object.getOwnPropertyDescriptor(n, u).enumerable
        })), r.push.apply(r, t)
    }
    return r
}

function I(n) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e] != null ? arguments[e] : {};
        e % 2 ? te(Object(r), !0).forEach(function(t) {
            de(n, t, r[t])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(r)) : te(Object(r)).forEach(function(t) {
            Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(r, t))
        })
    }
    return n
}

function he(n, e) {
    if (typeof n != "object" || !n) return n;
    var r = n[Symbol.toPrimitive];
    if (r !== void 0) {
        var t = r.call(n, e);
        if (typeof t != "object") return t;
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return (e === "string" ? String : Number)(n)
}

function me(n) {
    var e = he(n, "string");
    return typeof e == "symbol" ? e : e + ""
}

function X(n) {
    "@babel/helpers - typeof";
    return X = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
        return typeof e
    } : function(e) {
        return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }, X(n)
}

function de(n, e, r) {
    return e = me(e), e in n ? Object.defineProperty(n, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : n[e] = r, n
}
var W = new O;
W.useLongestToken = !0;
W.tokenize = B.tokenize;
W.castInput = function(n, e) {
    var r = e.undefinedReplacement,
        t = e.stringifyReplacer,
        u = t === void 0 ? function(i, o) {
            return typeof o > "u" ? r : o
        } : t;
    return typeof n == "string" ? n : JSON.stringify(Y(n, null, null, u), u, "  ")
};
W.equals = function(n, e, r) {
    return O.prototype.equals.call(W, n.replace(/,([\r\n])/g, "$1"), e.replace(/,([\r\n])/g, "$1"), r)
};

function Y(n, e, r, t, u) {
    e = e || [], r = r || [], t && (n = t(u, n));
    var i;
    for (i = 0; i < e.length; i += 1)
        if (e[i] === n) return r[i];
    var o;
    if (Object.prototype.toString.call(n) === "[object Array]") {
        for (e.push(n), o = new Array(n.length), r.push(o), i = 0; i < n.length; i += 1) o[i] = Y(n[i], e, r, t, u);
        return e.pop(), r.pop(), o
    }
    if (n && n.toJSON && (n = n.toJSON()), X(n) === "object" && n !== null) {
        e.push(n), o = {}, r.push(o);
        var l = [],
            f;
        for (f in n) Object.prototype.hasOwnProperty.call(n, f) && l.push(f);
        for (l.sort(), i = 0; i < l.length; i += 1) f = l[i], o[f] = Y(n[f], e, r, t, f);
        e.pop(), r.pop()
    } else o = n;
    return o
}
var S = new O;
S.tokenize = function(n) {
    return n.slice()
};
S.join = S.removeEmpty = function(n) {
    return n
};

function ie(n) {
    return Array.isArray(n) ? n.map(ie) : I(I({}, n), {}, {
        hunks: n.hunks.map(function(e) {
            return I(I({}, e), {}, {
                lines: e.lines.map(function(r, t) {
                    var u;
                    return r.startsWith("\\") || r.endsWith("\r") || (u = e.lines[t + 1]) !== null && u !== void 0 && u.startsWith("\\") ? r : r + "\r"
                })
            })
        })
    })
}

function ue(n) {
    return Array.isArray(n) ? n.map(ue) : I(I({}, n), {}, {
        hunks: n.hunks.map(function(e) {
            return I(I({}, e), {}, {
                lines: e.lines.map(function(r) {
                    return r.endsWith("\r") ? r.substring(0, r.length - 1) : r
                })
            })
        })
    })
}

function pe(n) {
    return Array.isArray(n) || (n = [n]), !n.some(function(e) {
        return e.hunks.some(function(r) {
            return r.lines.some(function(t) {
                return !t.startsWith("\\") && t.endsWith("\r")
            })
        })
    })
}

function ge(n) {
    return Array.isArray(n) || (n = [n]), n.some(function(e) {
        return e.hunks.some(function(r) {
            return r.lines.some(function(t) {
                return t.endsWith("\r")
            })
        })
    }) && n.every(function(e) {
        return e.hunks.every(function(r) {
            return r.lines.every(function(t, u) {
                var i;
                return t.startsWith("\\") || t.endsWith("\r") || ((i = r.lines[u + 1]) === null || i === void 0 ? void 0 : i.startsWith("\\"))
            })
        })
    })
}

function ye(n) {
    var e = n.split(/\n/),
        r = [],
        t = 0;

    function u() {
        var l = {};
        for (r.push(l); t < e.length;) {
            var f = e[t];
            if (/^(\-\-\-|\+\+\+|@@)\s/.test(f)) break;
            var a = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(f);
            a && (l.index = a[1]), t++
        }
        for (i(l), i(l), l.hunks = []; t < e.length;) {
            var s = e[t];
            if (/^(Index:\s|diff\s|\-\-\-\s|\+\+\+\s|===================================================================)/.test(s)) break;
            if (/^@@/.test(s)) l.hunks.push(o());
            else {
                if (s) throw new Error("Unknown line " + (t + 1) + " " + JSON.stringify(s));
                t++
            }
        }
    }

    function i(l) {
        var f = /^(---|\+\+\+)\s+(.*)\r?$/.exec(e[t]);
        if (f) {
            var a = f[1] === "---" ? "old" : "new",
                s = f[2].split("	", 2),
                v = s[0].replace(/\\\\/g, "\\");
            /^".*"$/.test(v) && (v = v.substr(1, v.length - 2)), l[a + "FileName"] = v, l[a + "Header"] = (s[1] || "").trim(), t++
        }
    }

    function o() {
        var l = t,
            f = e[t++],
            a = f.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/),
            s = {
                oldStart: +a[1],
                oldLines: typeof a[2] > "u" ? 1 : +a[2],
                newStart: +a[3],
                newLines: typeof a[4] > "u" ? 1 : +a[4],
                lines: []
            };
        s.oldLines === 0 && (s.oldStart += 1), s.newLines === 0 && (s.newStart += 1);
        for (var v = 0, p = 0; t < e.length && (p < s.oldLines || v < s.newLines || (m = e[t]) !== null && m !== void 0 && m.startsWith("\\")); t++) {
            var m, h = e[t].length == 0 && t != e.length - 1 ? " " : e[t][0];
            if (h === "+" || h === "-" || h === " " || h === "\\") s.lines.push(e[t]), h === "+" ? v++ : h === "-" ? p++ : h === " " && (v++, p++);
            else throw new Error("Hunk at line ".concat(l + 1, " contained invalid line ").concat(e[t]))
        }
        if (!v && s.newLines === 1 && (s.newLines = 0), !p && s.oldLines === 1 && (s.oldLines = 0), v !== s.newLines) throw new Error("Added line count did not match for hunk at line " + (l + 1));
        if (p !== s.oldLines) throw new Error("Removed line count did not match for hunk at line " + (l + 1));
        return s
    }
    for (; t < e.length;) u();
    return r
}

function we(n, e, r) {
    var t = !0,
        u = !1,
        i = !1,
        o = 1;
    return function l() {
        if (t && !i) {
            if (u ? o++ : t = !1, n + o <= r) return n + o;
            i = !0
        }
        if (!u) return i || (t = !0), e <= n - o ? n - o++ : (u = !0, l())
    }
}

function Ce(n, e) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (typeof e == "string" && (e = ye(e)), Array.isArray(e)) {
        if (e.length > 1) throw new Error("applyPatch only works with a single input.");
        e = e[0]
    }(r.autoConvertLineEndings || r.autoConvertLineEndings == null) && (se(n) && pe(e) ? e = ie(e) : le(n) && ge(e) && (e = ue(e)));
    var t = n.split(`
`),
        u = e.hunks,
        i = r.compareLine || function($, d, F, x) {
            return d === x
        },
        o = r.fuzzFactor || 0,
        l = 0;
    if (o < 0 || !Number.isInteger(o)) throw new Error("fuzzFactor must be a non-negative integer");
    if (!u.length) return n;
    for (var f = "", a = !1, s = !1, v = 0; v < u[u.length - 1].lines.length; v++) {
        var p = u[u.length - 1].lines[v];
        p[0] == "\\" && (f[0] == "+" ? a = !0 : f[0] == "-" && (s = !0)), f = p
    }
    if (a) {
        if (s) {
            if (!o && t[t.length - 1] == "") return !1
        } else if (t[t.length - 1] == "") t.pop();
        else if (!o) return !1
    } else if (s) {
        if (t[t.length - 1] != "") t.push("");
        else if (!o) return !1
    }

    function m($, d, F) {
        for (var x = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, P = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, z = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [], L = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : 0, k = 0, R = !1; x < $.length; x++) {
            var q = $[x],
                J = q.length > 0 ? q[0] : " ",
                Z = q.length > 0 ? q.substr(1) : q;
            if (J === "-")
                if (i(d + 1, t[d], J, Z)) d++, k = 0;
                else return !F || t[d] == null ? null : (z[L] = t[d], m($, d + 1, F - 1, x, !1, z, L + 1));
            if (J === "+") {
                if (!P) return null;
                z[L] = Z, L++, k = 0, R = !0
            }
            if (J === " ")
                if (k++, z[L] = t[d], i(d + 1, t[d], J, Z)) L++, P = !0, R = !1, d++;
                else return R || !F ? null : t[d] && (m($, d + 1, F - 1, x + 1, !1, z, L + 1) || m($, d + 1, F - 1, x, !1, z, L + 1)) || m($, d, F - 1, x + 1, !1, z, L)
        }
        return L -= k, d -= k, z.length = L, {
            patchedLines: z,
            oldLineLastI: d - 1
        }
    }
    for (var h = [], g = 0, E = 0; E < u.length; E++) {
        for (var C = u[E], y = void 0, N = t.length - C.oldLines + o, c = void 0, w = 0; w <= o; w++) {
            c = C.oldStart + g - 1;
            for (var A = we(c, l, N); c !== void 0 && (y = m(C.lines, c, w), !y); c = A());
            if (y) break
        }
        if (!y) return !1;
        for (var T = l; T < c; T++) h.push(t[T]);
        for (var b = 0; b < y.patchedLines.length; b++) {
            var D = y.patchedLines[b];
            h.push(D)
        }
        l = y.oldLineLastI + 1, g = c + 1 - C.oldStart
    }
    for (var H = l; H < t.length; H++) h.push(t[H]);
    return h.join(`
`)
}
export {
    Ce as a, Le as d
};
//# sourceMappingURL=1bc04b52-gvld45w9v7fqfedv.js.map