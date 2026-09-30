import {
    vO as C
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    a6 as I,
    a7 as N
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    m as B,
    a as $,
    c as u,
    t as o,
    f as T,
    b as F,
    d as z
} from "./8d846022-abx0in25q9ocxjad.js";
const tn = () => n => {
    I(n, t => {
        if (!N(t) || t.name !== C) return;
        const h = t.data ? ? (t.data = {}),
            r = t.attributes ? .index;
        if (r == null) return;
        h.hName = C, h.hProperties = {
            index: r
        };
        let a = "inline";
        switch (t.type) {
            case "textDirective":
                a = "inline";
                break;
            case "leafDirective":
                a = "block";
                break;
            case "containerDirective":
                a = "container";
                break
        }
        h.hProperties.displayLayout = a
    })
};
const A = {
        tokenize: v,
        concrete: !0
    },
    V = {
        tokenize: R,
        partial: !0
    };

function v(n, t, h) {
    const r = this,
        a = this.events[this.events.length - 1],
        m = a && a[1].type === o.linePrefix ? a[2].sliceSerialize(a[1], !0).length : 0,
        p = [];
    return c;

    function c(e) {
        return n.enter("mathFlow"), n.enter("mathFlowFence"), n.enter("mathFlowFenceSequence"), y(e)
    }

    function y(e) {
        return e === u.backslash || e === u.leftSquareBracket && p[0] === u.backslash ? (n.consume(e), p.push(e), y) : (n.exit("mathFlowFenceSequence"), p.length < 2 ? h(e) : T(n, g, o.whitespace)(e))
    }

    function g(e) {
        return e === u.eof || F(e) ? S(e) : (n.enter("mathFlowFenceMeta"), n.enter(o.chunkString, {
            contentType: z.contentTypeString
        }), s(e))
    }

    function s(e) {
        return e === u.eof || F(e) ? (n.exit(o.chunkString), n.exit("mathFlowFenceMeta"), S(e)) : e === u.rightSquareBracket ? h(e) : (n.consume(e), s)
    }

    function S(e) {
        return n.exit("mathFlowFence"), r.interrupt ? t(e) : l(e)
    }

    function l(e) {
        return e === u.eof ? w(e) : F(e) ? n.attempt(V, n.attempt({
            tokenize: b,
            partial: !0
        }, w, m ? T(n, l, o.linePrefix, m + 1) : l), w)(e) : (n.enter("mathFlowValue"), i(e))
    }

    function i(e) {
        return e === u.eof || F(e) ? (n.exit("mathFlowValue"), l(e)) : (n.consume(e), i)
    }

    function w(e) {
        return n.exit("mathFlow"), t(e)
    }

    function b(e, D, q) {
        const k = [];
        return T(e, P, o.linePrefix, z.tabSize);

        function P(x) {
            return e.enter("mathFlowFence"), e.enter("mathFlowFenceSequence"), E(x)
        }

        function E(x) {
            return x === u.backslash && k.length === 0 || x === u.rightSquareBracket && k[0] === u.backslash ? (e.consume(x), k.push(x), E) : k < p ? q(x) : (e.exit("mathFlowFenceSequence"), T(e, M, o.whitespace)(x))
        }

        function M(x) {
            return x === u.eof || F(x) ? (e.exit("mathFlowFence"), D(x)) : q(x)
        }
    }
}

function R(n, t, h) {
    const r = this;
    return a;

    function a(p) {
        return n.enter(o.lineEnding), n.consume(p), n.exit(o.lineEnding), m
    }

    function m(p) {
        return r.parser.lazy[r.now().line] ? h(p) : t(p)
    }
}
const _ = {
        tokenize: G,
        concrete: !0
    },
    j = {
        tokenize: H,
        partial: !0
    };

function G(n, t, h) {
    const r = this,
        a = r.events[r.events.length - 1],
        m = a && a[1].type === o.linePrefix ? a[2].sliceSerialize(a[1], !0).length : 0;
    let p = 0;
    return c;

    function c(e) {
        return n.enter("mathFlow"), n.enter("mathFlowFence"), n.enter("mathFlowFenceSequence"), y(e)
    }

    function y(e) {
        return e === u.dollarSign ? (n.consume(e), p++, y) : (n.exit("mathFlowFenceSequence"), p < 2 ? h(e) : T(n, g, o.whitespace)(e))
    }

    function g(e) {
        return e === u.eof || F(e) ? S(e) : (n.enter("mathFlowFenceMeta"), n.enter(o.chunkString, {
            contentType: z.contentTypeString
        }), s(e))
    }

    function s(e) {
        return e === u.eof || F(e) ? (n.exit(o.chunkString), n.exit("mathFlowFenceMeta"), S(e)) : e === u.dollarSign ? h(e) : (n.consume(e), s)
    }

    function S(e) {
        return n.exit("mathFlowFence"), r.interrupt ? t(e) : l(e)
    }

    function l(e) {
        return e === u.eof ? w(e) : F(e) ? n.attempt(j, n.attempt({
            tokenize: b,
            partial: !0
        }, w, m ? T(n, l, o.linePrefix, m + 1) : l), w)(e) : (n.enter("mathFlowValue"), i(e))
    }

    function i(e) {
        return e === u.eof || F(e) ? (n.exit("mathFlowValue"), l(e)) : (n.consume(e), i)
    }

    function w(e) {
        return n.exit("mathFlow"), t(e)
    }

    function b(e, D, q) {
        let k = 0;
        return T(e, P, o.linePrefix, z.tabSize);

        function P(x) {
            return e.enter("mathFlowFence"), e.enter("mathFlowFenceSequence"), E(x)
        }

        function E(x) {
            return x === u.dollarSign ? (e.consume(x), k++, E) : k < p ? q(x) : (e.exit("mathFlowFenceSequence"), T(e, M, o.whitespace)(x))
        }

        function M(x) {
            return x === u.eof || F(x) ? (e.exit("mathFlowFence"), D(x)) : q(x)
        }
    }
}

function H(n, t, h) {
    const r = this;
    return a;

    function a(p) {
        return n.enter(o.lineEnding), n.consume(p), n.exit(o.lineEnding), m
    }

    function m(p) {
        return r.parser.lazy[r.now().line] ? h(p) : t(p)
    }
}

function J() {
    return {
        tokenize: n,
        resolve: K,
        previous: L
    };

    function n(t, h, r) {
        const a = [];
        let m = [],
            p;
        const c = this;
        return y;

        function y(i) {
            return L.call(c, c.previous) && (c.previous, void 0), t.enter("mathText"), t.enter("mathTextSequence"), g(i)
        }

        function g(i) {
            return i === u.backslash && a.length === 0 || i === u.leftParenthesis && a.length === 1 ? (t.consume(i), a.push(i), g) : a.length < 2 ? r(i) : (t.exit("mathTextSequence"), s(i))
        }

        function s(i) {
            return i === u.eof ? r(i) : i === u.backslash ? (p = t.enter("mathTextSequence"), m = [], l(i)) : i === u.space ? (t.enter("space"), t.consume(i), t.exit("space"), s) : F(i) ? (t.enter(o.lineEnding), t.consume(i), t.exit(o.lineEnding), s) : (t.enter("mathTextData"), S(i))
        }

        function S(i) {
            return i === u.eof || i === u.space || i === u.backslash || F(i) ? (t.exit("mathTextData"), s(i)) : (t.consume(i), S)
        }

        function l(i) {
            return i === u.backslash && m.length === 0 || i === u.rightParenthesis && m.length === 1 ? (t.consume(i), m.push(i), l) : m.length === a.length ? (t.exit("mathTextSequence"), t.exit("mathText"), h(i)) : (p.type = "mathTextData", S(i))
        }
    }
}

function K(n) {
    let t = n.length - 4,
        h = 3,
        r, a;
    if ((n[h][1].type === o.lineEnding || n[h][1].type === "space") && (n[t][1].type === o.lineEnding || n[t][1].type === "space")) {
        for (r = h; ++r < t;)
            if (n[r][1].type === "mathTextData") {
                n[t][1].type = "mathTextPadding", n[h][1].type = "mathTextPadding", h += 2, t -= 2;
                break
            }
    }
    for (r = h - 1, t++; ++r <= t;) a === void 0 ? r !== t && n[r][1].type !== o.lineEnding && (a = r) : (r === t || n[r][1].type === o.lineEnding) && (n[a][1].type = "mathTextData", r !== a + 2 && (n[a][1].end = n[r - 1][1].end, n.splice(a + 2, r - a - 2), t -= r - a - 2, r = a + 2), a = void 0);
    return n
}

function L(n) {
    return n !== u.backslash || this.events[this.events.length - 1][1].type === o.characterEscape
}

function Q() {
    return {
        tokenize: n,
        resolve: U,
        previous: W
    };

    function n(t, h, r) {
        let a = 0,
            m, p;
        return c;

        function c(l) {
            return t.enter("mathText"), t.enter("mathTextSequence"), y(l)
        }

        function y(l) {
            return l === u.dollarSign ? (t.consume(l), a++, y) : a < 2 ? r(l) : (t.exit("mathTextSequence"), g(l))
        }

        function g(l) {
            return l === u.eof ? r(l) : l === u.dollarSign ? (p = t.enter("mathTextSequence"), m = 0, S(l)) : l === u.space ? (t.enter("space"), t.consume(l), t.exit("space"), g) : F(l) ? (t.enter(o.lineEnding), t.consume(l), t.exit(o.lineEnding), g) : (t.enter("mathTextData"), s(l))
        }

        function s(l) {
            return l === u.eof || l === u.space || l === u.dollarSign || F(l) ? (t.exit("mathTextData"), g(l)) : (t.consume(l), s)
        }

        function S(l) {
            return l === u.dollarSign ? (t.consume(l), m++, S) : m === a ? (t.exit("mathTextSequence"), t.exit("mathText"), h(l)) : (p.type = "mathTextData", s(l))
        }
    }
}

function U(n) {
    let t = n.length - 4,
        h = 3,
        r, a;
    if ((n[h][1].type === o.lineEnding || n[h][1].type === "space") && (n[t][1].type === o.lineEnding || n[t][1].type === "space")) {
        for (r = h; ++r < t;)
            if (n[r][1].type === "mathTextData") {
                n[t][1].type = "mathTextPadding", n[h][1].type = "mathTextPadding", h += 2, t -= 2;
                break
            }
    }
    for (r = h - 1, t++; ++r <= t;) a === void 0 ? r !== t && n[r][1].type !== o.lineEnding && (a = r) : (r === t || n[r][1].type === o.lineEnding) && (n[a][1].type = "mathTextData", r !== a + 2 && (n[a][1].end = n[r - 1][1].end, n.splice(a + 2, r - a - 2), t -= r - a - 2, r = a + 2), a = void 0);
    return n
}

function W(n) {
    return n !== u.dollarSign || this.events[this.events.length - 1][1].type === o.characterEscape
}

function X() {
    return {
        tokenize: n,
        resolve: Y,
        previous: O
    };

    function n(t, h, r) {
        const a = [];
        let m = [],
            p;
        const c = this;
        return y;

        function y(i) {
            return O.call(c, c.previous) && (c.previous, void 0), t.enter("mathText"), t.enter("mathTextSequence"), g(i)
        }

        function g(i) {
            return i === u.backslash && a.length === 0 || i === u.leftSquareBracket && a.length === 1 ? (t.consume(i), a.push(i), g) : a.length < 2 ? r(i) : (t.exit("mathTextSequence"), s(i))
        }

        function s(i) {
            return i === u.eof ? r(i) : i === u.backslash ? (p = t.enter("mathTextSequence"), m = [], l(i)) : i === u.space ? (t.enter("space"), t.consume(i), t.exit("space"), s) : F(i) ? (t.enter(o.lineEnding), t.consume(i), t.exit(o.lineEnding), s) : (t.enter("mathTextData"), S(i))
        }

        function S(i) {
            return i === u.eof || i === u.space || i === u.backslash || F(i) ? (t.exit("mathTextData"), s(i)) : (t.consume(i), S)
        }

        function l(i) {
            return i === u.backslash && m.length === 0 || i === u.rightSquareBracket && m.length === 1 ? (t.consume(i), m.push(i), l) : m.length === a.length ? (t.exit("mathTextSequence"), t.exit("mathText"), h(i)) : (p.type = "mathTextData", S(i))
        }
    }
}

function Y(n) {
    let t = n.length - 4,
        h = 3,
        r, a;
    if ((n[h][1].type === o.lineEnding || n[h][1].type === "space") && (n[t][1].type === o.lineEnding || n[t][1].type === "space")) {
        for (r = h; ++r < t;)
            if (n[r][1].type === "mathTextData") {
                n[t][1].type = "mathTextPadding", n[h][1].type = "mathTextPadding", h += 2, t -= 2;
                break
            }
    }
    for (r = h - 1, t++; ++r <= t;) a === void 0 ? r !== t && n[r][1].type !== o.lineEnding && (a = r) : (r === t || n[r][1].type === o.lineEnding) && (n[a][1].type = "mathTextData", r !== a + 2 && (n[a][1].end = n[r - 1][1].end, n.splice(a + 2, r - a - 2), t -= r - a - 2, r = a + 2), a = void 0);
    return n
}

function O(n) {
    return n !== u.backslash || this.events[this.events.length - 1][1].type === o.characterEscape
}

function Z() {
    return {
        flow: {
            [u.dollarSign]: _,
            [u.backslash]: A
        },
        text: {
            [u.dollarSign]: Q(),
            [u.backslash]: [J(), X()]
        }
    }
}

function en() {
    const n = this.data();
    t("micromarkExtensions", Z()), t("fromMarkdownExtensions", $()), t("toMarkdownExtensions", B());

    function t(h, r) {
        (n[h] ? n[h] : n[h] = []).push(r)
    }
}
export {
    en as a, tn as r
};
//# sourceMappingURL=1bc04b52-jxd082ldak294kcc.js.map