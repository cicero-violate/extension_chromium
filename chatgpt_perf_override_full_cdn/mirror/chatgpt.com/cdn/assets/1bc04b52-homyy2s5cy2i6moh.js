import {
    wE as xe,
    wI as ke,
    yJ as pe,
    yK as Ve,
    yL as Qe,
    yM as $e,
    yN as Ue,
    yO as qe,
    yP as We,
    yQ as B,
    yR as Ie,
    yS as ue,
    yT as Ce,
    yU as Je,
    yV as Ke,
    yW as de,
    yX as ge,
    yY as _e,
    yZ as Fe,
    y_ as Xe,
    y$ as Ye,
    z0 as Ze,
    z1 as Ge,
    z2 as et,
    z3 as tt,
    z4 as nt,
    z5 as fe,
    z6 as it,
    z7 as rt,
    a8 as st,
    z8 as he,
    z9 as at,
    za as ot,
    zb as lt
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    s as ae
} from "./1bc04b52-h1em0bjkpkjv8ykw.js";
const ct = {
    tokenize: ut
};

function ut(n) {
    const t = n.attempt(this.parser.constructs.contentInitial, i, o);
    let s;
    return t;

    function i(f) {
        if (f === null) {
            n.consume(f);
            return
        }
        return n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), xe(n, t, "linePrefix")
    }

    function o(f) {
        return n.enter("paragraph"), r(f)
    }

    function r(f) {
        const u = n.enter("chunkText", {
            contentType: "text",
            previous: s
        });
        return s && (s.next = u), s = u, l(f)
    }

    function l(f) {
        if (f === null) {
            n.exit("chunkText"), n.exit("paragraph"), n.consume(f);
            return
        }
        return ke(f) ? (n.consume(f), n.exit("chunkText"), r) : (n.consume(f), l)
    }
}
const dt = {
        tokenize: ft
    },
    Te = {
        tokenize: ht
    };

function ft(n) {
    const t = this,
        s = [];
    let i = 0,
        o, r, l;
    return f;

    function f(h) {
        if (i < s.length) {
            const C = s[i];
            return t.containerState = C[1], n.attempt(C[0].continuation, u, c)(h)
        }
        return c(h)
    }

    function u(h) {
        if (i++, t.containerState._closeFlow) {
            t.containerState._closeFlow = void 0, o && N();
            const C = t.events.length;
            let T = C,
                w;
            for (; T--;)
                if (t.events[T][0] === "exit" && t.events[T][1].type === "chunkFlow") {
                    w = t.events[T][1].end;
                    break
                }
            L(i);
            let E = C;
            for (; E < t.events.length;) t.events[E][1].end = Object.assign({}, w), E++;
            return pe(t.events, T + 1, 0, t.events.slice(C)), t.events.length = E, c(h)
        }
        return f(h)
    }

    function c(h) {
        if (i === s.length) {
            if (!o) return b(h);
            if (o.currentConstruct && o.currentConstruct.concrete) return P(h);
            t.interrupt = !!(o.currentConstruct && !o._gfmTableDynamicInterruptHack)
        }
        return t.containerState = {}, n.check(Te, m, y)(h)
    }

    function m(h) {
        return o && N(), L(i), b(h)
    }

    function y(h) {
        return t.parser.lazy[t.now().line] = i !== s.length, l = t.now().offset, P(h)
    }

    function b(h) {
        return t.containerState = {}, n.attempt(Te, _, P)(h)
    }

    function _(h) {
        return i++, s.push([t.currentConstruct, t.containerState]), b(h)
    }

    function P(h) {
        if (h === null) {
            o && N(), L(0), n.consume(h);
            return
        }
        return o = o || t.parser.flow(t.now()), n.enter("chunkFlow", {
            contentType: "flow",
            previous: r,
            _tokenizer: o
        }), U(h)
    }

    function U(h) {
        if (h === null) {
            q(n.exit("chunkFlow"), !0), L(0), n.consume(h);
            return
        }
        return ke(h) ? (n.consume(h), q(n.exit("chunkFlow")), i = 0, t.interrupt = void 0, f) : (n.consume(h), U)
    }

    function q(h, C) {
        const T = t.sliceStream(h);
        if (C && T.push(null), h.previous = r, r && (r.next = h), r = h, o.defineSkip(h.start), o.write(T), t.parser.lazy[h.start.line]) {
            let w = o.events.length;
            for (; w--;)
                if (o.events[w][1].start.offset < l && (!o.events[w][1].end || o.events[w][1].end.offset > l)) return;
            const E = t.events.length;
            let R = E,
                z, I;
            for (; R--;)
                if (t.events[R][0] === "exit" && t.events[R][1].type === "chunkFlow") {
                    if (z) {
                        I = t.events[R][1].end;
                        break
                    }
                    z = !0
                }
            for (L(i), w = E; w < t.events.length;) t.events[w][1].end = Object.assign({}, I), w++;
            pe(t.events, R + 1, 0, t.events.slice(E)), t.events.length = w
        }
    }

    function L(h) {
        let C = s.length;
        for (; C-- > h;) {
            const T = s[C];
            t.containerState = T[1], T[0].exit.call(t, n)
        }
        s.length = h
    }

    function N() {
        o.write([null]), r = void 0, o = void 0, t.containerState._closeFlow = void 0
    }
}

function ht(n, t, s) {
    return xe(n, n.attempt(this.parser.constructs.document, t, s), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)
}
const pt = {
    tokenize: gt
};

function gt(n) {
    const t = this,
        s = n.attempt(Ve, i, n.attempt(this.parser.constructs.flowInitial, o, xe(n, n.attempt(this.parser.constructs.flow, o, n.attempt(Qe, o)), "linePrefix")));
    return s;

    function i(r) {
        if (r === null) {
            n.consume(r);
            return
        }
        return n.enter("lineEndingBlank"), n.consume(r), n.exit("lineEndingBlank"), t.currentConstruct = void 0, s
    }

    function o(r) {
        if (r === null) {
            n.consume(r);
            return
        }
        return n.enter("lineEnding"), n.consume(r), n.exit("lineEnding"), t.currentConstruct = void 0, s
    }
}
const xt = {
        resolveAll: Be()
    },
    kt = ve("string"),
    mt = ve("text");

function ve(n) {
    return {
        tokenize: t,
        resolveAll: Be(n === "text" ? yt : void 0)
    };

    function t(s) {
        const i = this,
            o = this.parser.constructs[n],
            r = s.attempt(o, l, f);
        return l;

        function l(m) {
            return c(m) ? r(m) : f(m)
        }

        function f(m) {
            if (m === null) {
                s.consume(m);
                return
            }
            return s.enter("data"), s.consume(m), u
        }

        function u(m) {
            return c(m) ? (s.exit("data"), r(m)) : (s.consume(m), u)
        }

        function c(m) {
            if (m === null) return !0;
            const y = o[m];
            let b = -1;
            if (y)
                for (; ++b < y.length;) {
                    const _ = y[b];
                    if (!_.previous || _.previous.call(i, i.previous)) return !0
                }
            return !1
        }
    }
}

function Be(n) {
    return t;

    function t(s, i) {
        let o = -1,
            r;
        for (; ++o <= s.length;) r === void 0 ? s[o] && s[o][1].type === "data" && (r = o, o++) : (!s[o] || s[o][1].type !== "data") && (o !== r + 2 && (s[r][1].end = s[o - 1][1].end, s.splice(r + 2, o - r - 2), o = r + 2), r = void 0);
        return n ? n(s, i) : s
    }
}

function yt(n, t) {
    let s = 0;
    for (; ++s <= n.length;)
        if ((s === n.length || n[s][1].type === "lineEnding") && n[s - 1][1].type === "data") {
            const i = n[s - 1][1],
                o = t.sliceStream(i);
            let r = o.length,
                l = -1,
                f = 0,
                u;
            for (; r--;) {
                const c = o[r];
                if (typeof c == "string") {
                    for (l = c.length; c.charCodeAt(l - 1) === 32;) f++, l--;
                    if (l) break;
                    l = -1
                } else if (c === -2) u = !0, f++;
                else if (c !== -1) {
                    r++;
                    break
                }
            }
            if (f) {
                const c = {
                    type: s === n.length || u || f < 2 ? "lineSuffix" : "hardBreakTrailing",
                    start: {
                        line: i.end.line,
                        column: i.end.column - f,
                        offset: i.end.offset - f,
                        _index: i.start._index + r,
                        _bufferIndex: r ? l : i.start._bufferIndex + l
                    },
                    end: Object.assign({}, i.end)
                };
                i.end = Object.assign({}, c.start), i.start.offset === i.end.offset ? Object.assign(i, c) : (n.splice(s, 0, ["enter", c, t], ["exit", c, t]), s += 2)
            }
            s++
        }
    return n
}

function bt(n, t, s) {
    let i = Object.assign(s ? Object.assign({}, s) : {
        line: 1,
        column: 1,
        offset: 0
    }, {
        _index: 0,
        _bufferIndex: -1
    });
    const o = {},
        r = [];
    let l = [],
        f = [];
    const u = {
            consume: N,
            enter: h,
            exit: C,
            attempt: E(T),
            check: E(w),
            interrupt: E(w, {
                interrupt: !0
            })
        },
        c = {
            previous: null,
            code: null,
            containerState: {},
            events: [],
            parser: n,
            sliceStream: _,
            sliceSerialize: b,
            now: P,
            defineSkip: U,
            write: y
        };
    let m = t.tokenize.call(c, u);
    return t.resolveAll && r.push(t), c;

    function y(p) {
        return l = $e(l, p), q(), l[l.length - 1] !== null ? [] : (R(t, 0), c.events = Ue(r, c.events, c), c.events)
    }

    function b(p, x) {
        return St(_(p), x)
    }

    function _(p) {
        return wt(l, p)
    }

    function P() {
        const {
            line: p,
            column: x,
            offset: F,
            _index: O,
            _bufferIndex: V
        } = i;
        return {
            line: p,
            column: x,
            offset: F,
            _index: O,
            _bufferIndex: V
        }
    }

    function U(p) {
        o[p.line] = p.column, I()
    }

    function q() {
        let p;
        for (; i._index < l.length;) {
            const x = l[i._index];
            if (typeof x == "string")
                for (p = i._index, i._bufferIndex < 0 && (i._bufferIndex = 0); i._index === p && i._bufferIndex < x.length;) L(x.charCodeAt(i._bufferIndex));
            else L(x)
        }
    }

    function L(p) {
        m = m(p)
    }

    function N(p) {
        ke(p) ? (i.line++, i.column = 1, i.offset += p === -3 ? 2 : 1, I()) : p !== -1 && (i.column++, i.offset++), i._bufferIndex < 0 ? i._index++ : (i._bufferIndex++, i._bufferIndex === l[i._index].length && (i._bufferIndex = -1, i._index++)), c.previous = p
    }

    function h(p, x) {
        const F = x || {};
        return F.type = p, F.start = P(), c.events.push(["enter", F, c]), f.push(F), F
    }

    function C(p) {
        const x = f.pop();
        return x.end = P(), c.events.push(["exit", x, c]), x
    }

    function T(p, x) {
        R(p, x.from)
    }

    function w(p, x) {
        x.restore()
    }

    function E(p, x) {
        return F;

        function F(O, V, W) {
            let Y, J, re, Z;
            return Array.isArray(O) ? G(O) : "tokenize" in O ? G([O]) : oe(O);

            function oe(S) {
                return te;

                function te(M) {
                    const K = M !== null && S[M],
                        Q = M !== null && S.null,
                        ce = [...Array.isArray(K) ? K : K ? [K] : [], ...Array.isArray(Q) ? Q : Q ? [Q] : []];
                    return G(ce)(M)
                }
            }

            function G(S) {
                return Y = S, J = 0, S.length === 0 ? W : se(S[J])
            }

            function se(S) {
                return te;

                function te(M) {
                    return Z = z(), re = S, S.partial || (c.currentConstruct = S), S.name && c.parser.constructs.disable.null.includes(S.name) ? ee() : S.tokenize.call(x ? Object.assign(Object.create(c), x) : c, u, le, ee)(M)
                }
            }

            function le(S) {
                return p(re, Z), V
            }

            function ee(S) {
                return Z.restore(), ++J < Y.length ? se(Y[J]) : W
            }
        }
    }

    function R(p, x) {
        p.resolveAll && !r.includes(p) && r.push(p), p.resolve && pe(c.events, x, c.events.length - x, p.resolve(c.events.slice(x), c)), p.resolveTo && (c.events = p.resolveTo(c.events, c))
    }

    function z() {
        const p = P(),
            x = c.previous,
            F = c.currentConstruct,
            O = c.events.length,
            V = Array.from(f);
        return {
            restore: W,
            from: O
        };

        function W() {
            i = p, c.previous = x, c.currentConstruct = F, c.events.length = O, f = V, I()
        }
    }

    function I() {
        i.line in o && i.column < 2 && (i.column = o[i.line], i.offset += o[i.line] - 1)
    }
}

function wt(n, t) {
    const s = t.start._index,
        i = t.start._bufferIndex,
        o = t.end._index,
        r = t.end._bufferIndex;
    let l;
    if (s === o) l = [n[s].slice(i, r)];
    else {
        if (l = n.slice(s, o), i > -1) {
            const f = l[0];
            typeof f == "string" ? l[0] = f.slice(i) : l.shift()
        }
        r > 0 && l.push(n[o].slice(0, r))
    }
    return l
}

function St(n, t) {
    let s = -1;
    const i = [];
    let o;
    for (; ++s < n.length;) {
        const r = n[s];
        let l;
        if (typeof r == "string") l = r;
        else switch (r) {
            case -5:
                {
                    l = "\r";
                    break
                }
            case -4:
                {
                    l = `
`;
                    break
                }
            case -3:
                {
                    l = `\r
`;
                    break
                }
            case -2:
                {
                    l = t ? " " : "	";
                    break
                }
            case -1:
                {
                    if (!t && o) continue;l = " ";
                    break
                }
            default:
                l = String.fromCharCode(r)
        }
        o = r === -2, i.push(l)
    }
    return i.join("")
}
const It = {
        42: B,
        43: B,
        45: B,
        48: B,
        49: B,
        50: B,
        51: B,
        52: B,
        53: B,
        54: B,
        55: B,
        56: B,
        57: B,
        62: We
    },
    Ct = {
        91: qe
    },
    Tt = {
        [-2]: de,
        [-1]: de,
        32: de
    },
    zt = {
        35: Ke,
        42: ue,
        45: [Ce, ue],
        60: Je,
        61: Ce,
        95: ue,
        96: Ie,
        126: Ie
    },
    Et = {
        38: Fe,
        92: _e
    },
    _t = {
        [-5]: fe,
        [-4]: fe,
        [-3]: fe,
        33: nt,
        38: Fe,
        42: ge,
        60: [et, tt],
        91: Ge,
        92: [Ze, _e],
        93: Ye,
        95: ge,
        96: Xe
    },
    Ft = {
        null: [ge, xt]
    },
    vt = {
        null: [42, 95]
    },
    Bt = {
        null: []
    },
    Ot = Object.freeze(Object.defineProperty({
        __proto__: null,
        attentionMarkers: vt,
        contentInitial: Ct,
        disable: Bt,
        document: It,
        flow: zt,
        flowInitial: Tt,
        insideSpan: Ft,
        string: Et,
        text: _t
    }, Symbol.toStringTag, {
        value: "Module"
    }));

function At(n) {
    const s = it([Ot, ...(n || {}).extensions || []]),
        i = {
            defined: [],
            lazy: {},
            constructs: s,
            content: o(ct),
            document: o(dt),
            flow: o(pt),
            string: o(kt),
            text: o(mt)
        };
    return i;

    function o(r) {
        return l;

        function l(f) {
            return bt(i, r, f)
        }
    }
}

function Pt(n) {
    for (; !rt(n););
    return n
}
const ze = /[\0\t\n\r]/g;

function Lt() {
    let n = 1,
        t = "",
        s = !0,
        i;
    return o;

    function o(r, l, f) {
        const u = [];
        let c, m, y, b, _;
        for (r = t + (typeof r == "string" ? r.toString() : new TextDecoder(l || void 0).decode(r)), y = 0, t = "", s && (r.charCodeAt(0) === 65279 && y++, s = void 0); y < r.length;) {
            if (ze.lastIndex = y, c = ze.exec(r), b = c && c.index !== void 0 ? c.index : r.length, _ = r.charCodeAt(b), !c) {
                t = r.slice(y);
                break
            }
            if (_ === 10 && y === b && i) u.push(-3), i = void 0;
            else switch (i && (u.push(-5), i = void 0), y < b && (u.push(r.slice(y, b)), n += b - y), _) {
                case 0:
                    {
                        u.push(65533),
                        n++;
                        break
                    }
                case 9:
                    {
                        for (m = Math.ceil(n / 4) * 4, u.push(-2); n++ < m;) u.push(-1);
                        break
                    }
                case 10:
                    {
                        u.push(-4),
                        n = 1;
                        break
                    }
                default:
                    i = !0, n = 1
            }
            y = b + 1
        }
        return f && (i && u.push(-5), t && u.push(t), u.push(null)), u
    }
}
const Oe = {}.hasOwnProperty;

function Rt(n, t, s) {
    return typeof t != "string" && (s = t, t = void 0), jt(s)(Pt(At(s).document().write(Lt()(n, t, !0))))
}

function jt(n) {
    const t = {
        transforms: [],
        canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
        enter: {
            autolink: r(we),
            autolinkProtocol: z,
            autolinkEmail: z,
            atxHeading: r(me),
            blockQuote: r(K),
            characterEscape: z,
            characterReference: z,
            codeFenced: r(Q),
            codeFencedFenceInfo: l,
            codeFencedFenceMeta: l,
            codeIndented: r(Q, l),
            codeText: r(ce, l),
            codeTextData: z,
            data: z,
            codeFlowValue: z,
            definition: r(Pe),
            definitionDestinationString: l,
            definitionLabelString: l,
            definitionTitleString: l,
            emphasis: r(Le),
            hardBreakEscape: r(ye),
            hardBreakTrailing: r(ye),
            htmlFlow: r(be, l),
            htmlFlowData: z,
            htmlText: r(be, l),
            htmlTextData: z,
            image: r(Re),
            label: l,
            link: r(we),
            listItem: r(je),
            listItemValue: b,
            listOrdered: r(Se, y),
            listUnordered: r(Se),
            paragraph: r(He),
            reference: se,
            referenceString: l,
            resourceDestinationString: l,
            resourceTitleString: l,
            setextHeading: r(me),
            strong: r(Me),
            thematicBreak: r(Ne)
        },
        exit: {
            atxHeading: u(),
            atxHeadingSequence: T,
            autolink: u(),
            autolinkEmail: M,
            autolinkProtocol: te,
            blockQuote: u(),
            characterEscapeValue: I,
            characterReferenceMarkerHexadecimal: ee,
            characterReferenceMarkerNumeric: ee,
            characterReferenceValue: S,
            codeFenced: u(q),
            codeFencedFence: U,
            codeFencedFenceInfo: _,
            codeFencedFenceMeta: P,
            codeFlowValue: I,
            codeIndented: u(L),
            codeText: u(V),
            codeTextData: I,
            data: I,
            definition: u(),
            definitionDestinationString: C,
            definitionLabelString: N,
            definitionTitleString: h,
            emphasis: u(),
            hardBreakEscape: u(x),
            hardBreakTrailing: u(x),
            htmlFlow: u(F),
            htmlFlowData: I,
            htmlText: u(O),
            htmlTextData: I,
            image: u(Y),
            label: re,
            labelText: J,
            lineEnding: p,
            link: u(W),
            listItem: u(),
            listOrdered: u(),
            listUnordered: u(),
            paragraph: u(),
            referenceString: le,
            resourceDestinationString: Z,
            resourceTitleString: oe,
            resource: G,
            setextHeading: u(R),
            setextHeadingLineSequence: E,
            setextHeadingText: w,
            strong: u(),
            thematicBreak: u()
        }
    };
    Ae(t, (n || {}).mdastExtensions || []);
    const s = {};
    return i;

    function i(e) {
        let a = {
            type: "root",
            children: []
        };
        const d = {
                stack: [a],
                tokenStack: [],
                config: t,
                enter: f,
                exit: c,
                buffer: l,
                resume: m,
                data: s
            },
            g = [];
        let k = -1;
        for (; ++k < e.length;)
            if (e[k][1].type === "listOrdered" || e[k][1].type === "listUnordered")
                if (e[k][0] === "enter") g.push(k);
                else {
                    const A = g.pop();
                    k = o(e, A, k)
                }
        for (k = -1; ++k < e.length;) {
            const A = t[e[k][0]];
            Oe.call(A, e[k][1].type) && A[e[k][1].type].call(Object.assign({
                sliceSerialize: e[k][2].sliceSerialize
            }, d), e[k][1])
        }
        if (d.tokenStack.length > 0) {
            const A = d.tokenStack[d.tokenStack.length - 1];
            (A[1] || Ee).call(d, void 0, A[0])
        }
        for (a.position = {
                start: D(e.length > 0 ? e[0][1].start : {
                    line: 1,
                    column: 1,
                    offset: 0
                }),
                end: D(e.length > 0 ? e[e.length - 2][1].end : {
                    line: 1,
                    column: 1,
                    offset: 0
                })
            }, k = -1; ++k < t.transforms.length;) a = t.transforms[k](a) || a;
        return a
    }

    function o(e, a, d) {
        let g = a - 1,
            k = -1,
            A = !1,
            $, j, ne, ie;
        for (; ++g <= d;) {
            const v = e[g];
            switch (v[1].type) {
                case "listUnordered":
                case "listOrdered":
                case "blockQuote":
                    {
                        v[0] === "enter" ? k++ : k--,
                        ie = void 0;
                        break
                    }
                case "lineEndingBlank":
                    {
                        v[0] === "enter" && ($ && !ie && !k && !ne && (ne = g), ie = void 0);
                        break
                    }
                case "linePrefix":
                case "listItemValue":
                case "listItemMarker":
                case "listItemPrefix":
                case "listItemPrefixWhitespace":
                    break;
                default:
                    ie = void 0
            }
            if (!k && v[0] === "enter" && v[1].type === "listItemPrefix" || k === -1 && v[0] === "exit" && (v[1].type === "listUnordered" || v[1].type === "listOrdered")) {
                if ($) {
                    let X = g;
                    for (j = void 0; X--;) {
                        const H = e[X];
                        if (H[1].type === "lineEnding" || H[1].type === "lineEndingBlank") {
                            if (H[0] === "exit") continue;
                            j && (e[j][1].type = "lineEndingBlank", A = !0), H[1].type = "lineEnding", j = X
                        } else if (!(H[1].type === "linePrefix" || H[1].type === "blockQuotePrefix" || H[1].type === "blockQuotePrefixWhitespace" || H[1].type === "blockQuoteMarker" || H[1].type === "listItemIndent")) break
                    }
                    ne && (!j || ne < j) && ($._spread = !0), $.end = Object.assign({}, j ? e[j][1].start : v[1].end), e.splice(j || g, 0, ["exit", $, v[2]]), g++, d++
                }
                if (v[1].type === "listItemPrefix") {
                    const X = {
                        type: "listItem",
                        _spread: !1,
                        start: Object.assign({}, v[1].start),
                        end: void 0
                    };
                    $ = X, e.splice(g, 0, ["enter", X, v[2]]), g++, d++, ne = void 0, ie = !0
                }
            }
        }
        return e[a][1]._spread = A, d
    }

    function r(e, a) {
        return d;

        function d(g) {
            f.call(this, e(g), g), a && a.call(this, g)
        }
    }

    function l() {
        this.stack.push({
            type: "fragment",
            children: []
        })
    }

    function f(e, a, d) {
        this.stack[this.stack.length - 1].children.push(e), this.stack.push(e), this.tokenStack.push([a, d]), e.position = {
            start: D(a.start),
            end: void 0
        }
    }

    function u(e) {
        return a;

        function a(d) {
            e && e.call(this, d), c.call(this, d)
        }
    }

    function c(e, a) {
        const d = this.stack.pop(),
            g = this.tokenStack.pop();
        if (g) g[0].type !== e.type && (a ? a.call(this, e, g[0]) : (g[1] || Ee).call(this, e, g[0]));
        else throw new Error("Cannot close `" + e.type + "` (" + ae({
            start: e.start,
            end: e.end
        }) + "): it’s not open");
        d.position.end = D(e.end)
    }

    function m() {
        return st(this.stack.pop())
    }

    function y() {
        this.data.expectingFirstListItemValue = !0
    }

    function b(e) {
        if (this.data.expectingFirstListItemValue) {
            const a = this.stack[this.stack.length - 2];
            a.start = Number.parseInt(this.sliceSerialize(e), 10), this.data.expectingFirstListItemValue = void 0
        }
    }

    function _() {
        const e = this.resume(),
            a = this.stack[this.stack.length - 1];
        a.lang = e
    }

    function P() {
        const e = this.resume(),
            a = this.stack[this.stack.length - 1];
        a.meta = e
    }

    function U() {
        this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0)
    }

    function q() {
        const e = this.resume(),
            a = this.stack[this.stack.length - 1];
        a.value = e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0
    }

    function L() {
        const e = this.resume(),
            a = this.stack[this.stack.length - 1];
        a.value = e.replace(/(\r?\n|\r)$/g, "")
    }

    function N(e) {
        const a = this.resume(),
            d = this.stack[this.stack.length - 1];
        d.label = a, d.identifier = he(this.sliceSerialize(e)).toLowerCase()
    }

    function h() {
        const e = this.resume(),
            a = this.stack[this.stack.length - 1];
        a.title = e
    }

    function C() {
        const e = this.resume(),
            a = this.stack[this.stack.length - 1];
        a.url = e
    }

    function T(e) {
        const a = this.stack[this.stack.length - 1];
        if (!a.depth) {
            const d = this.sliceSerialize(e).length;
            a.depth = d
        }
    }

    function w() {
        this.data.setextHeadingSlurpLineEnding = !0
    }

    function E(e) {
        const a = this.stack[this.stack.length - 1];
        a.depth = this.sliceSerialize(e).codePointAt(0) === 61 ? 1 : 2
    }

    function R() {
        this.data.setextHeadingSlurpLineEnding = void 0
    }

    function z(e) {
        const d = this.stack[this.stack.length - 1].children;
        let g = d[d.length - 1];
        (!g || g.type !== "text") && (g = De(), g.position = {
            start: D(e.start),
            end: void 0
        }, d.push(g)), this.stack.push(g)
    }

    function I(e) {
        const a = this.stack.pop();
        a.value += this.sliceSerialize(e), a.position.end = D(e.end)
    }

    function p(e) {
        const a = this.stack[this.stack.length - 1];
        if (this.data.atHardBreak) {
            const d = a.children[a.children.length - 1];
            d.position.end = D(e.end), this.data.atHardBreak = void 0;
            return
        }!this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(a.type) && (z.call(this, e), I.call(this, e))
    }

    function x() {
        this.data.atHardBreak = !0
    }

    function F() {
        const e = this.resume(),
            a = this.stack[this.stack.length - 1];
        a.value = e
    }

    function O() {
        const e = this.resume(),
            a = this.stack[this.stack.length - 1];
        a.value = e
    }

    function V() {
        const e = this.resume(),
            a = this.stack[this.stack.length - 1];
        a.value = e
    }

    function W() {
        const e = this.stack[this.stack.length - 1];
        if (this.data.inReference) {
            const a = this.data.referenceType || "shortcut";
            e.type += "Reference", e.referenceType = a, delete e.url, delete e.title
        } else delete e.identifier, delete e.label;
        this.data.referenceType = void 0
    }

    function Y() {
        const e = this.stack[this.stack.length - 1];
        if (this.data.inReference) {
            const a = this.data.referenceType || "shortcut";
            e.type += "Reference", e.referenceType = a, delete e.url, delete e.title
        } else delete e.identifier, delete e.label;
        this.data.referenceType = void 0
    }

    function J(e) {
        const a = this.sliceSerialize(e),
            d = this.stack[this.stack.length - 2];
        d.label = at(a), d.identifier = he(a).toLowerCase()
    }

    function re() {
        const e = this.stack[this.stack.length - 1],
            a = this.resume(),
            d = this.stack[this.stack.length - 1];
        if (this.data.inReference = !0, d.type === "link") {
            const g = e.children;
            d.children = g
        } else d.alt = a
    }

    function Z() {
        const e = this.resume(),
            a = this.stack[this.stack.length - 1];
        a.url = e
    }

    function oe() {
        const e = this.resume(),
            a = this.stack[this.stack.length - 1];
        a.title = e
    }

    function G() {
        this.data.inReference = void 0
    }

    function se() {
        this.data.referenceType = "collapsed"
    }

    function le(e) {
        const a = this.resume(),
            d = this.stack[this.stack.length - 1];
        d.label = a, d.identifier = he(this.sliceSerialize(e)).toLowerCase(), this.data.referenceType = "full"
    }

    function ee(e) {
        this.data.characterReferenceType = e.type
    }

    function S(e) {
        const a = this.sliceSerialize(e),
            d = this.data.characterReferenceType;
        let g;
        d ? (g = lt(a, d === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : g = ot(a);
        const k = this.stack.pop();
        k.value += g, k.position.end = D(e.end)
    }

    function te(e) {
        I.call(this, e);
        const a = this.stack[this.stack.length - 1];
        a.url = this.sliceSerialize(e)
    }

    function M(e) {
        I.call(this, e);
        const a = this.stack[this.stack.length - 1];
        a.url = "mailto:" + this.sliceSerialize(e)
    }

    function K() {
        return {
            type: "blockquote",
            children: []
        }
    }

    function Q() {
        return {
            type: "code",
            lang: null,
            meta: null,
            value: ""
        }
    }

    function ce() {
        return {
            type: "inlineCode",
            value: ""
        }
    }

    function Pe() {
        return {
            type: "definition",
            identifier: "",
            label: null,
            title: null,
            url: ""
        }
    }

    function Le() {
        return {
            type: "emphasis",
            children: []
        }
    }

    function me() {
        return {
            type: "heading",
            depth: 0,
            children: []
        }
    }

    function ye() {
        return {
            type: "break"
        }
    }

    function be() {
        return {
            type: "html",
            value: ""
        }
    }

    function Re() {
        return {
            type: "image",
            title: null,
            url: "",
            alt: null
        }
    }

    function we() {
        return {
            type: "link",
            title: null,
            url: "",
            children: []
        }
    }

    function Se(e) {
        return {
            type: "list",
            ordered: e.type === "listOrdered",
            start: null,
            spread: e._spread,
            children: []
        }
    }

    function je(e) {
        return {
            type: "listItem",
            spread: e._spread,
            checked: null,
            children: []
        }
    }

    function He() {
        return {
            type: "paragraph",
            children: []
        }
    }

    function Me() {
        return {
            type: "strong",
            children: []
        }
    }

    function De() {
        return {
            type: "text",
            value: ""
        }
    }

    function Ne() {
        return {
            type: "thematicBreak"
        }
    }
}

function D(n) {
    return {
        line: n.line,
        column: n.column,
        offset: n.offset
    }
}

function Ae(n, t) {
    let s = -1;
    for (; ++s < t.length;) {
        const i = t[s];
        Array.isArray(i) ? Ae(n, i) : Ht(n, i)
    }
}

function Ht(n, t) {
    let s;
    for (s in t)
        if (Oe.call(t, s)) switch (s) {
            case "canContainEols":
                {
                    const i = t[s];i && n[s].push(...i);
                    break
                }
            case "transforms":
                {
                    const i = t[s];i && n[s].push(...i);
                    break
                }
            case "enter":
            case "exit":
                {
                    const i = t[s];i && Object.assign(n[s], i);
                    break
                }
        }
}

function Ee(n, t) {
    throw n ? new Error("Cannot close `" + n.type + "` (" + ae({
        start: n.start,
        end: n.end
    }) + "): a different token (`" + t.type + "`, " + ae({
        start: t.start,
        end: t.end
    }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + ae({
        start: t.start,
        end: t.end
    }) + ") is still open")
}

function Nt(n) {
    const t = this;
    t.parser = s;

    function s(i) {
        return Rt(i, { ...t.data("settings"),
            ...n,
            extensions: t.data("micromarkExtensions") || [],
            mdastExtensions: t.data("fromMarkdownExtensions") || []
        })
    }
}
export {
    Nt as r
};
//# sourceMappingURL=1bc04b52-homyy2s5cy2i6moh.js.map