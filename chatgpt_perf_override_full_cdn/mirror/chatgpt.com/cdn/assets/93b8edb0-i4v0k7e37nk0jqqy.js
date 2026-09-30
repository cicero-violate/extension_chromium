import {
    wA as R,
    uF as et,
    wB as Z,
    hI as nt,
    wC as it,
    wD as P,
    wE as k,
    wF as q,
    wG as M,
    wH as rt,
    wI as w
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    s as ut
} from "./1bc04b52-gtpe46xocf6zem4g.js";
const at = {}.hasOwnProperty,
    lt = {},
    X = /^[^\t\n\r "#'.<=>`}]+$/,
    st = /^[^\t\n\r "'<=>`}]+$/;

function Bt() {
    return {
        canContainEols: ["textDirective"],
        enter: {
            directiveContainer: ct,
            directiveContainerAttributes: E,
            directiveContainerLabel: xt,
            directiveLeaf: vt,
            directiveLeafAttributes: E,
            directiveText: ot,
            directiveTextAttributes: E
        },
        exit: {
            directiveContainer: W,
            directiveContainerAttributeClassValue: j,
            directiveContainerAttributeIdValue: Q,
            directiveContainerAttributeName: G,
            directiveContainerAttributeValue: U,
            directiveContainerAttributes: H,
            directiveContainerLabel: ht,
            directiveContainerName: B,
            directiveLeaf: W,
            directiveLeafAttributeClassValue: j,
            directiveLeafAttributeIdValue: Q,
            directiveLeafAttributeName: G,
            directiveLeafAttributeValue: U,
            directiveLeafAttributes: H,
            directiveLeafName: B,
            directiveText: W,
            directiveTextAttributeClassValue: j,
            directiveTextAttributeIdValue: Q,
            directiveTextAttributeName: G,
            directiveTextAttributeValue: U,
            directiveTextAttributes: H,
            directiveTextName: B
        }
    }
}

function Et(t) {
    const i = lt;
    if (i.quote !== '"' && i.quote !== "'" && i.quote !== null && i.quote !== void 0) throw new Error("Invalid quote `" + i.quote + "`, expected `'` or `\"`");
    return n.peek = bt, {
        handlers: {
            containerDirective: n,
            leafDirective: n,
            textDirective: n
        },
        unsafe: [{
            character: "\r",
            inConstruct: ["leafDirectiveLabel", "containerDirectiveLabel"]
        }, {
            character: `
`,
            inConstruct: ["leafDirectiveLabel", "containerDirectiveLabel"]
        }, {
            before: "[^:]",
            character: ":",
            after: "[A-Za-z]",
            inConstruct: ["phrasing"]
        }, {
            atBreak: !0,
            character: ":",
            after: ":"
        }]
    };

    function n(u, x, a, c) {
        const b = a.createTracker(c),
            v = mt(u),
            L = a.enter(u.type);
        let h = b.move(v + (u.name || "")),
            m;
        if (u.type === "containerDirective") {
            const A = (u.children || [])[0];
            m = Y(A) ? A : void 0
        } else m = u;
        if (m && m.children && m.children.length > 0) {
            const A = a.enter("label"),
                p = `${u.type}Label`,
                l = a.enter(p);
            h += b.move("["), h += b.move(a.containerPhrasing(m, { ...b.current(),
                before: h,
                after: "]"
            })), h += b.move("]"), l(), A()
        }
        if (h += b.move(o(u, a)), u.type === "containerDirective") {
            const A = (u.children || [])[0];
            let p = u;
            Y(A) && (p = Object.assign({}, u, {
                children: u.children.slice(1)
            })), p && p.children && p.children.length > 0 && (h += b.move(`
`), h += b.move(a.containerFlow(p, b.current()))), h += b.move(`
` + v)
        }
        return L(), h
    }

    function o(u, x) {
        const a = u.attributes || {},
            c = [];
        let b, v, L, h;
        for (h in a)
            if (at.call(a, h) && a[h] !== void 0 && a[h] !== null) {
                const m = String(a[h]);
                if (h === "id") L = i.preferShortcut !== !1 && X.test(m) ? "#" + m : s("id", m, u, x);
                else if (h === "class") {
                    const A = m.split(/[\t\n\r ]+/g),
                        p = [],
                        l = [];
                    let g = -1;
                    for (; ++g < A.length;)(i.preferShortcut !== !1 && X.test(A[g]) ? l : p).push(A[g]);
                    b = p.length > 0 ? s("class", p.join(" "), u, x) : "", v = l.length > 0 ? "." + l.join(".") : ""
                } else c.push(s(h, m, u, x))
            }
        return b && c.unshift(b), v && c.unshift(v), L && c.unshift(L), c.length > 0 ? "{" + c.join(" ") + "}" : ""
    }

    function s(u, x, a, c) {
        if (i.collapseEmptyAttributes !== !1 && !x) return u;
        if (i.preferUnquoted && st.test(x)) return u + "=" + x;
        const b = i.quote || c.options.quote || '"',
            v = b === '"' ? "'" : '"',
            L = i.quoteSmart && R(x, b) > R(x, v) ? v : b,
            h = a.type === "textDirective" ? [L] : [L, `
`, "\r"];
        return u + "=" + L + ut(x, {
            subset: h
        }) + L
    }
}

function ct(t) {
    _.call(this, "containerDirective", t)
}

function vt(t) {
    _.call(this, "leafDirective", t)
}

function ot(t) {
    _.call(this, "textDirective", t)
}

function _(t, i) {
    this.enter({
        type: t,
        name: "",
        attributes: {},
        children: []
    }, i)
}

function B(t) {
    const i = this.stack[this.stack.length - 1];
    et(i.type === "containerDirective" || i.type === "leafDirective" || i.type === "textDirective"), i.name = this.sliceSerialize(t)
}

function xt(t) {
    this.enter({
        type: "paragraph",
        data: {
            directiveLabel: !0
        },
        children: []
    }, t)
}

function ht(t) {
    this.exit(t)
}

function E() {
    this.data.directiveAttributes = [], this.buffer()
}

function Q(t) {
    this.data.directiveAttributes.push(["id", Z(this.sliceSerialize(t), {
        attribute: !0
    })])
}

function j(t) {
    this.data.directiveAttributes.push(["class", Z(this.sliceSerialize(t), {
        attribute: !0
    })])
}

function U(t) {
    const i = this.data.directiveAttributes;
    i[i.length - 1][1] = Z(this.sliceSerialize(t), {
        attribute: !0
    })
}

function G(t) {
    this.data.directiveAttributes.push([this.sliceSerialize(t), ""])
}

function H() {
    const t = this.data.directiveAttributes,
        i = {};
    let n = -1;
    for (; ++n < t.length;) {
        const s = t[n];
        s[0] === "class" && i.class ? i.class += " " + s[1] : i[s[0]] = s[1]
    }
    this.data.directiveAttributes = void 0, this.resume();
    const o = this.stack[this.stack.length - 1];
    et(o.type === "containerDirective" || o.type === "leafDirective" || o.type === "textDirective"), o.attributes = i
}

function W(t) {
    this.exit(t)
}

function bt() {
    return ":"
}

function Y(t) {
    return !!(t && t.type === "paragraph" && t.data && t.data.directiveLabel)
}

function mt(t) {
    let i = 0;
    return t.type === "containerDirective" ? (nt(t, function(n, o) {
        if (n.type === "containerDirective") {
            let s = o.length,
                u = 0;
            for (; s--;) o[s].type === "containerDirective" && u++;
            u > i && (i = u)
        }
    }), i += 3) : t.type === "leafDirective" ? i = 2 : i = 1, ":".repeat(i)
}

function d(t, i, n, o, s, u, x, a, c, b, v, L, h, m, A) {
    let p, l;
    return g;

    function g(e) {
        return t.enter(o), t.enter(s), t.consume(e), t.exit(s), D
    }

    function D(e) {
        return e === 35 ? (p = x, I(e)) : e === 46 ? (p = a, I(e)) : e === 58 || e === 95 || it(e) ? (t.enter(u), t.enter(c), t.consume(e), F) : A && P(e) ? k(t, D, "whitespace")(e) : !A && q(e) ? M(t, D)(e) : z(e)
    }

    function I(e) {
        const T = p + "Marker";
        return t.enter(u), t.enter(p), t.enter(T), t.consume(e), t.exit(T), $
    }

    function $(e) {
        if (e === null || e === 34 || e === 35 || e === 39 || e === 46 || e === 60 || e === 61 || e === 62 || e === 96 || e === 125 || q(e)) return n(e);
        const T = p + "Value";
        return t.enter(T), t.consume(e), S
    }

    function S(e) {
        if (e === null || e === 34 || e === 39 || e === 60 || e === 61 || e === 62 || e === 96) return n(e);
        if (e === 35 || e === 46 || e === 125 || q(e)) {
            const T = p + "Value";
            return t.exit(T), t.exit(p), t.exit(u), D(e)
        }
        return t.consume(e), S
    }

    function F(e) {
        return e === 45 || e === 46 || e === 58 || e === 95 || rt(e) ? (t.consume(e), F) : (t.exit(c), A && P(e) ? k(t, r, "whitespace")(e) : !A && q(e) ? M(t, r)(e) : r(e))
    }

    function r(e) {
        return e === 61 ? (t.enter(b), t.consume(e), t.exit(b), C) : (t.exit(u), D(e))
    }

    function C(e) {
        return e === null || e === 60 || e === 61 || e === 62 || e === 96 || e === 125 || A && w(e) ? n(e) : e === 34 || e === 39 ? (t.enter(v), t.enter(h), t.consume(e), t.exit(h), l = e, y) : A && P(e) ? k(t, C, "whitespace")(e) : !A && q(e) ? M(t, C)(e) : (t.enter(L), t.enter(m), t.consume(e), l = void 0, N)
    }

    function N(e) {
        return e === null || e === 34 || e === 39 || e === 60 || e === 61 || e === 62 || e === 96 ? n(e) : e === 125 || q(e) ? (t.exit(m), t.exit(L), t.exit(u), D(e)) : (t.consume(e), N)
    }

    function y(e) {
        return e === l ? (t.enter(h), t.consume(e), t.exit(h), t.exit(v), t.exit(u), O) : (t.enter(L), V(e))
    }

    function V(e) {
        return e === l ? (t.exit(L), y(e)) : e === null ? n(e) : w(e) ? A ? n(e) : M(t, V)(e) : (t.enter(m), t.consume(e), f)
    }

    function f(e) {
        return e === l || e === null || w(e) ? (t.exit(m), V(e)) : (t.consume(e), f)
    }

    function O(e) {
        return e === 125 || q(e) ? D(e) : z(e)
    }

    function z(e) {
        return e === 125 ? (t.enter(s), t.consume(e), t.exit(s), t.exit(o), i) : n(e)
    }
}

function J(t, i, n, o, s, u, x) {
    let a = 0,
        c = 0,
        b;
    return v;

    function v(l) {
        return t.enter(o), t.enter(s), t.consume(l), t.exit(s), L
    }

    function L(l) {
        return l === 93 ? (t.enter(s), t.consume(l), t.exit(s), t.exit(o), i) : (t.enter(u), h(l))
    }

    function h(l) {
        if (l === 93 && !c) return p(l);
        const g = t.enter("chunkText", {
            contentType: "text",
            previous: b
        });
        return b && (b.next = g), b = g, m(l)
    }

    function m(l) {
        return l === null || a > 999 || l === 91 && ++c > 32 ? n(l) : l === 93 && !c-- ? (t.exit("chunkText"), p(l)) : w(l) ? x ? n(l) : (t.consume(l), t.exit("chunkText"), h) : (t.consume(l), l === 92 ? A : m)
    }

    function A(l) {
        return l === 91 || l === 92 || l === 93 ? (t.consume(l), a++, m) : m(l)
    }

    function p(l) {
        return t.exit(u), t.enter(s), t.consume(l), t.exit(s), t.exit(o), i
    }
}

function K(t, i, n, o) {
    const s = this;
    return u;

    function u(a) {
        return it(a) ? (t.enter(o), t.consume(a), x) : n(a)
    }

    function x(a) {
        return a === 45 || a === 95 || rt(a) ? (t.consume(a), x) : (t.exit(o), s.previous === 45 || s.previous === 95 ? n(a) : i(a))
    }
}
const At = {
        tokenize: Ct,
        concrete: !0
    },
    pt = {
        tokenize: zt,
        partial: !0
    },
    Lt = {
        tokenize: gt,
        partial: !0
    },
    tt = {
        tokenize: Dt,
        partial: !0
    };

function Ct(t, i, n) {
    const o = this,
        s = o.events[o.events.length - 1],
        u = s && s[1].type === "linePrefix" ? s[2].sliceSerialize(s[1], !0).length : 0;
    let x = 0,
        a;
    return c;

    function c(r) {
        return t.enter("directiveContainer"), t.enter("directiveContainerFence"), t.enter("directiveContainerSequence"), b(r)
    }

    function b(r) {
        return r === 58 ? (t.consume(r), x++, b) : x < 3 ? n(r) : (t.exit("directiveContainerSequence"), K.call(o, t, v, n, "directiveContainerName")(r))
    }

    function v(r) {
        return r === 91 ? t.attempt(pt, L, L)(r) : L(r)
    }

    function L(r) {
        return r === 123 ? t.attempt(Lt, h, h)(r) : h(r)
    }

    function h(r) {
        return k(t, m, "whitespace")(r)
    }

    function m(r) {
        return t.exit("directiveContainerFence"), r === null ? A(r) : w(r) ? o.interrupt ? i(r) : t.attempt(tt, p, A)(r) : n(r)
    }

    function A(r) {
        return t.exit("directiveContainer"), i(r)
    }

    function p(r) {
        return r === null ? (t.exit("directiveContainer"), i(r)) : (t.enter("directiveContainerContent"), l(r))
    }

    function l(r) {
        return r === null ? S(r) : t.attempt({
            tokenize: F,
            partial: !0
        }, S, u ? k(t, g, "linePrefix", u + 1) : g)(r)
    }

    function g(r) {
        if (r === null) return S(r);
        const C = t.enter("chunkDocument", {
            contentType: "document",
            previous: a
        });
        return a && (a.next = C), a = C, D(r)
    }

    function D(r) {
        if (r === null) {
            const C = t.exit("chunkDocument");
            return o.parser.lazy[C.start.line] = !1, S(r)
        }
        return w(r) ? t.check(tt, I, $)(r) : (t.consume(r), D)
    }

    function I(r) {
        t.consume(r);
        const C = t.exit("chunkDocument");
        return o.parser.lazy[C.start.line] = !1, l
    }

    function $(r) {
        const C = t.exit("chunkDocument");
        return o.parser.lazy[C.start.line] = !1, S(r)
    }

    function S(r) {
        return t.exit("directiveContainerContent"), t.exit("directiveContainer"), i(r)
    }

    function F(r, C, N) {
        let y = 0;
        return k(r, V, "linePrefix", 4);

        function V(z) {
            return r.enter("directiveContainerFence"), r.enter("directiveContainerSequence"), f(z)
        }

        function f(z) {
            return z === 58 ? (r.consume(z), y++, f) : y < x ? N(z) : (r.exit("directiveContainerSequence"), k(r, O, "whitespace")(z))
        }

        function O(z) {
            return z === null || w(z) ? (r.exit("directiveContainerFence"), C(z)) : N(z)
        }
    }
}

function zt(t, i, n) {
    return J(t, i, n, "directiveContainerLabel", "directiveContainerLabelMarker", "directiveContainerLabelString", !0)
}

function gt(t, i, n) {
    return d(t, i, n, "directiveContainerAttributes", "directiveContainerAttributesMarker", "directiveContainerAttribute", "directiveContainerAttributeId", "directiveContainerAttributeClass", "directiveContainerAttributeName", "directiveContainerAttributeInitializerMarker", "directiveContainerAttributeValueLiteral", "directiveContainerAttributeValue", "directiveContainerAttributeValueMarker", "directiveContainerAttributeValueData", !0)
}

function Dt(t, i, n) {
    const o = this;
    return s;

    function s(x) {
        return t.enter("lineEnding"), t.consume(x), t.exit("lineEnding"), u
    }

    function u(x) {
        return o.parser.lazy[o.now().line] ? n(x) : i(x)
    }
}
const St = {
        tokenize: qt
    },
    kt = {
        tokenize: Tt,
        partial: !0
    },
    wt = {
        tokenize: Nt,
        partial: !0
    };

function qt(t, i, n) {
    const o = this;
    return s;

    function s(v) {
        return t.enter("directiveLeaf"), t.enter("directiveLeafSequence"), t.consume(v), u
    }

    function u(v) {
        return v === 58 ? (t.consume(v), t.exit("directiveLeafSequence"), K.call(o, t, x, n, "directiveLeafName")) : n(v)
    }

    function x(v) {
        return v === 91 ? t.attempt(kt, a, a)(v) : a(v)
    }

    function a(v) {
        return v === 123 ? t.attempt(wt, c, c)(v) : c(v)
    }

    function c(v) {
        return k(t, b, "whitespace")(v)
    }

    function b(v) {
        return v === null || w(v) ? (t.exit("directiveLeaf"), i(v)) : n(v)
    }
}

function Tt(t, i, n) {
    return J(t, i, n, "directiveLeafLabel", "directiveLeafLabelMarker", "directiveLeafLabelString", !0)
}

function Nt(t, i, n) {
    return d(t, i, n, "directiveLeafAttributes", "directiveLeafAttributesMarker", "directiveLeafAttribute", "directiveLeafAttributeId", "directiveLeafAttributeClass", "directiveLeafAttributeName", "directiveLeafAttributeInitializerMarker", "directiveLeafAttributeValueLiteral", "directiveLeafAttributeValue", "directiveLeafAttributeValueMarker", "directiveLeafAttributeValueData", !0)
}
const yt = {
        tokenize: Ft,
        previous: It
    },
    Vt = {
        tokenize: Mt,
        partial: !0
    },
    ft = {
        tokenize: $t,
        partial: !0
    };

function It(t) {
    return t !== 58 || this.events[this.events.length - 1][1].type === "characterEscape"
}

function Ft(t, i, n) {
    const o = this;
    return s;

    function s(c) {
        return t.enter("directiveText"), t.enter("directiveTextMarker"), t.consume(c), t.exit("directiveTextMarker"), K.call(o, t, u, n, "directiveTextName")
    }

    function u(c) {
        return c === 58 ? n(c) : c === 91 ? t.attempt(Vt, x, x)(c) : x(c)
    }

    function x(c) {
        return c === 123 ? t.attempt(ft, a, a)(c) : a(c)
    }

    function a(c) {
        return t.exit("directiveText"), i(c)
    }
}

function Mt(t, i, n) {
    return J(t, i, n, "directiveTextLabel", "directiveTextLabelMarker", "directiveTextLabelString")
}

function $t(t, i, n) {
    return d(t, i, n, "directiveTextAttributes", "directiveTextAttributesMarker", "directiveTextAttribute", "directiveTextAttributeId", "directiveTextAttributeClass", "directiveTextAttributeName", "directiveTextAttributeInitializerMarker", "directiveTextAttributeValueLiteral", "directiveTextAttributeValue", "directiveTextAttributeValueMarker", "directiveTextAttributeValueData")
}

function Qt() {
    return {
        text: {
            58: yt
        },
        flow: {
            58: [At, St]
        }
    }
}
export {
    Bt as a, Et as b, Qt as d
};
//# sourceMappingURL=93b8edb0-i4v0k7e37nk0jqqy.js.map