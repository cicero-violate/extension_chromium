import {
    uE as g,
    uF as d
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function M() {
    return {
        enter: {
            mathFlow: i,
            mathFlowFenceMeta: r,
            mathText: c
        },
        exit: {
            mathFlow: u,
            mathFlowFence: o,
            mathFlowFenceMeta: l,
            mathFlowValue: a,
            mathText: m,
            mathTextData: a
        }
    };

    function i(t) {
        const e = {
            type: "element",
            tagName: "code",
            properties: {
                className: ["language-math", "math-display"]
            },
            children: []
        };
        this.enter({
            type: "math",
            meta: null,
            value: "",
            data: {
                hName: "pre",
                hChildren: [e]
            }
        }, t)
    }

    function r() {
        this.buffer()
    }

    function l() {
        const t = this.resume(),
            e = this.stack[this.stack.length - 1];
        d(e.type === "math"), e.meta = t
    }

    function o() {
        this.data.mathFlowInside || (this.buffer(), this.data.mathFlowInside = !0)
    }

    function u(t) {
        const e = this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""),
            n = this.stack[this.stack.length - 1];
        d(n.type === "math"), this.exit(t), n.value = e;
        const s = n.data.hChildren[0];
        d(s.type === "element"), d(s.tagName === "code"), s.children.push({
            type: "text",
            value: e
        }), this.data.mathFlowInside = void 0
    }

    function c(t) {
        this.enter({
            type: "inlineMath",
            value: "",
            data: {
                hName: "code",
                hProperties: {
                    className: ["language-math", "math-inline"]
                },
                hChildren: []
            }
        }, t), this.buffer()
    }

    function m(t) {
        const e = this.resume(),
            n = this.stack[this.stack.length - 1];
        d(n.type === "inlineMath"), this.exit(t), n.value = e, n.data.hChildren.push({
            type: "text",
            value: e
        })
    }

    function a(t) {
        this.config.enter.data.call(this, t), this.config.exit.data.call(this, t)
    }
}

function k(i) {
    let r = {}.singleDollarTextMath;
    return r == null && (r = !0), o.peek = u, {
        unsafe: [{
            character: "\r",
            inConstruct: "mathFlowMeta"
        }, {
            character: `
`,
            inConstruct: "mathFlowMeta"
        }, {
            character: "$",
            after: r ? void 0 : "\\$",
            inConstruct: "phrasing"
        }, {
            character: "$",
            inConstruct: "mathFlowMeta"
        }, {
            atBreak: !0,
            character: "$",
            after: "\\$"
        }],
        handlers: {
            math: l,
            inlineMath: o
        }
    };

    function l(c, m, a, t) {
        const e = c.value || "",
            n = a.createTracker(t),
            s = "$".repeat(Math.max(g(e, "$") + 1, 2)),
            p = a.enter("mathFlow");
        let h = n.move(s);
        if (c.meta) {
            const f = a.enter("mathFlowMeta");
            h += n.move(a.safe(c.meta, {
                after: `
`,
                before: h,
                encode: ["$"],
                ...n.current()
            })), f()
        }
        return h += n.move(`
`), e && (h += n.move(e + `
`)), h += n.move(s), p(), h
    }

    function o(c, m, a) {
        let t = c.value || "",
            e = 1;
        for (r || e++; new RegExp("(^|[^$])" + "\\$".repeat(e) + "([^$]|$)").test(t);) e++;
        const n = "$".repeat(e);
        /[^ \r\n]/.test(t) && (/^[ \r\n]/.test(t) && /[ \r\n]$/.test(t) || /^\$|\$$/.test(t)) && (t = " " + t + " ");
        let s = -1;
        for (; ++s < a.unsafe.length;) {
            const p = a.unsafe[s];
            if (!p.atBreak) continue;
            const h = a.compilePattern(p);
            let f;
            for (; f = h.exec(t);) {
                let w = f.index;
                t.codePointAt(w) === 10 && t.codePointAt(w - 1) === 13 && w--, t = t.slice(0, w) + " " + t.slice(f.index + 1)
            }
        }
        return n + t + n
    }

    function u() {
        return "$"
    }
}
const $ = {
    eof: null,
    space: 32,
    dollarSign: 36,
    leftParenthesis: 40,
    rightParenthesis: 41,
    leftSquareBracket: 91,
    backslash: 92,
    rightSquareBracket: 93
};

function v(i) {
    return i !== null && i < -2
}

function x(i) {
    return i === -2 || i === -1 || i === 32
}

function y(i, r, l, o) {
    const u = o ? o - 1 : Number.POSITIVE_INFINITY;
    let c = 0;
    return m;

    function m(t) {
        return x(t) ? (i.enter(l), a(t)) : r(t)
    }

    function a(t) {
        return x(t) && c++ < u ? (i.consume(t), a) : (i.exit(l), r(t))
    }
}
const S = {
        contentTypeString: "string",
        tabSize: 4
    },
    T = {
        whitespace: "whitespace",
        lineEnding: "lineEnding",
        linePrefix: "linePrefix",
        characterEscape: "characterEscape",
        chunkString: "chunkString"
    };
export {
    M as a, v as b, $ as c, S as d, y as f, k as m, T as t
};
//# sourceMappingURL=8d846022-abx0in25q9ocxjad.js.map