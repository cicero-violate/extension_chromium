import {
    J6 as ie,
    om as G,
    J7 as ue,
    FM as le,
    J8 as de,
    eU as pe,
    eV as ce,
    F1 as z,
    vO as x,
    D as V,
    J9 as S,
    jR as P,
    fq as L,
    aJ as Ne,
    ja as me,
    Ja as Me
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    w as v,
    c as m,
    I as j,
    T as q,
    t as he,
    a as fe,
    b as ge,
    L as y,
    P as C,
    s as W,
    l as E,
    e as J,
    d as F,
    H as ke,
    R as xe
} from "./4813494d-lavfi1ibeyheaotg.js";
import {
    S as T,
    M as w,
    N,
    E as ye
} from "./373ddd65-f76gy0b8ieo4s693.js";
import {
    a7 as Q,
    a6 as Te,
    aD as we,
    gP as be
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    i as X,
    H as g,
    f as Ee,
    a as Ie
} from "./ac827dee-ni0c24kw46bltvi6.js";
import {
    a as De,
    r as Ae
} from "./1bc04b52-jxd082ldak294kcc.js";
import {
    r as _e,
    a as Se
} from "./1bc04b52-c842ajlk411j0plj.js";
import {
    r as ve
} from "./1bc04b52-homyy2s5cy2i6moh.js";
const Ce = T.proseMirrorMarkName();

function D(n, e) {
    const r = [],
        t = [];
    for (const s of n.marks) {
        if (s.type.name === Ce) {
            r.push(s);
            continue
        }
        t.push(s)
    }
    return n.mark([...t, e, ...r])
}
class Oe extends w {
    unistNodeName() {
        return "link"
    }
    static proseMirrorMarkName() {
        return "link"
    }
    proseMirrorMarkSpec() {
        return {
            attrs: {
                href: {},
                title: {
                    default: null
                },
                disabled: {
                    default: !0
                }
            },
            inclusive: !1,
            parseDOM: [{
                tag: "a[href]",
                getAttrs(e) {
                    return {
                        href: e.getAttribute("href"),
                        title: e.getAttribute("title")
                    }
                }
            }],
            toDOM(e) {
                return ["a", { ...e.attrs,
                    ...e.attrs.disabled ? {
                        href: void 0
                    } : {}
                }]
            }
        }
    }
    unistNodeToProseMirrorNodes({
        node: e,
        convertedChildren: r,
        schema: t
    }) {
        const {
            url: s,
            title: o
        } = e;
        return r.map(a => D(a, t.marks[this.proseMirrorMarkName()].create({
            href: s,
            title: o
        })))
    }
    processConvertedUnistNode(e, r) {
        return {
            type: this.unistNodeName(),
            url: r.attrs.href,
            ...r.attrs.title != null && {
                title: r.attrs.title
            },
            children: [e]
        }
    }
}
class Pe extends N {
    unistNodeName() {
        return "blockquote"
    }
    static proseMirrorNodeName() {
        return "blockquote"
    }
    proseMirrorNodeSpec() {
        return {
            content: "block+",
            group: "block",
            parseDOM: [{
                tag: "blockquote"
            }],
            toDOM() {
                return ["blockquote", 0]
            }
        }
    }
    proseMirrorInputRules(e) {
        return [v(/^\s{0,3}>\s$/, e.nodes[this.proseMirrorNodeName()])]
    }
    proseMirrorKeymap(e) {
        return {
            "Mod->": ie(e.nodes[this.proseMirrorNodeName()])
        }
    }
    unistNodeToProseMirrorNodes({
        schema: e,
        convertedChildren: r,
        attrs: t
    }) {
        return m(this.proseMirrorNodeName(), e, r, t)
    }
    proseMirrorNodeToUnistNodes(e, r) {
        return [{
            type: this.unistNodeName(),
            children: r
        }]
    }
}

function Le(n, e, r, t) {
    for (let s = 0; s < e.length; s++) {
        const {
            $from: o,
            $to: a
        } = e[s];
        let i = o.depth === 0 ? n.inlineContent && n.type.allowsMarkType(r) : !1;
        if (n.nodesBetween(o.pos, a.pos, (u, l) => {
                if (i) return !1;
                i = u.inlineContent && u.type.allowsMarkType(r)
            }), i) return !0
    }
    return !1
}

function R(n) {
    return /^\s*/.exec(n) ? .[0] ? .length ? ? 0
}

function B(n) {
    return /\s*$/.exec(n) ? .[0] ? .length ? ? 0
}

function Re(n, e, r) {
    for (; e > 0;) {
        const t = e - 1;
        if (!n.rangeHasMark(t, e, r)) break;
        e = t
    }
    return e
}

function Be(n, e, r) {
    for (; e < n.content.size && n.rangeHasMark(e, e + 1, r);) e += 1;
    return e
}

function $e(n, e, r, t = null) {
    const {
        selection: s
    } = n;
    if (!(s instanceof G)) return !1;
    const {
        empty: o,
        $cursor: a,
        ranges: i
    } = s;
    if (o && !a || !Le(n.doc, i, r)) return !1;
    if (a) r.isInSet(n.storedMarks || a.marks()) ? e(n.tr.removeStoredMark(r)) : e(n.tr.addStoredMark(r.create(t)));
    else {
        const u = n.tr,
            l = !i.some(d => n.doc.rangeHasMark(d.$from.pos, d.$to.pos, r));
        for (let d = 0; d < i.length; d++) {
            const {
                $from: p,
                $to: M
            } = i[d];
            let c = p.pos,
                h = M.pos;
            const te = n.doc.textBetween(c, h, `
`);
            if (/^\s*$/.test(te)) continue;
            const se = p.nodeBefore ? .text ? ? "",
                ne = p.nodeAfter ? .text ? ? "",
                oe = M.nodeBefore ? .text ? ? "",
                ae = M.nodeAfter ? .text ? ? "";
            if (l) {
                const b = R(ne),
                    _ = B(oe);
                c + b < h && (c += b, h -= _), c = Re(n.doc, c, r), h = Be(n.doc, h, r), u.removeMark(c, h, n.schema.marks[T.proseMirrorMarkName()]), u.addMark(c, h, r.create(t))
            } else {
                const b = B(se),
                    _ = R(ae);
                c -= b, h += _, u.removeMark(c, h, r)
            }
        }
        e(u.scrollIntoView())
    }
    return !0
}

function $(n, e = null) {
    return (r, t) => t ? $e(r, t, n, e) : !0
}
class f extends j {
    markType;
    matchStartOffset;
    textGroup;
    trailingTextGroup;
    constructor(e, r, t = {}) {
        super(e, (s, o, a, i) => this.markHandler(s, o, a, i)), this.markType = r, this.matchStartOffset = t.matchStartOffset ? ? (() => 0), this.textGroup = t.textGroup ? ? 1, this.trailingTextGroup = t.trailingTextGroup ? ? 2
    }
    static markApplies(e, r, t) {
        for (const s of r) {
            const {
                $from: o,
                $to: a
            } = s;
            let i = o.depth === 0 ? e.type.allowsMarkType(t) : !1;
            if (e.nodesBetween(o.pos, a.pos, u => i ? !1 : (i = u.inlineContent && u.type.allowsMarkType(t), !0)), i) return !0
        }
        return !1
    }
    markHandler(e, r, t, s) {
        if (!(e.selection instanceof G)) return null;
        const o = t + this.matchStartOffset(r),
            a = r[this.textGroup];
        if (typeof a != "string") return null;
        const i = e.doc.resolve(o),
            u = e.doc.resolve(s),
            l = [new ue(i, u)];
        if (!f.markApplies(e.doc, l, this.markType)) return null;
        const d = e.doc.nodeAt(o) ? .marks.map(M => M.type) ? ? [];
        d.push(this.markType);
        const p = e.tr.replaceWith(o, s, this.markType.schema.text(a));
        for (const M of d) p.addMark(p.mapping.map(o), p.mapping.map(s), M.create(null));
        for (const M of d) p.removeStoredMark(M);
        return p.insertText(r[this.trailingTextGroup] ? ? "")
    }
}
class Ue extends w {
    unistNodeName() {
        return "strong"
    }
    static proseMirrorMarkName() {
        return "strong"
    }
    proseMirrorMarkSpec() {
        return {
            parseDOM: [{
                tag: "b"
            }, {
                tag: "strong"
            }, {
                style: "font-weight",
                getAttrs: e => /^(bold(er)?|[5-9]\d{2,})$/.test(e) && null
            }],
            toDOM() {
                return ["strong"]
            }
        }
    }
    proseMirrorInputRules(e) {
        return [new f(/\*\*([^\s](?:.*[^\s])?)\*\*([\s\S])$/, e.marks[this.proseMirrorMarkName()]), new f(/__([^\s](?:.*[^\s])?)__([\s\S])$/, e.marks[this.proseMirrorMarkName()])]
    }
    proseMirrorKeymap(e) {
        const r = e.marks[this.proseMirrorMarkName()];
        return {
            "Mod-b": $(r),
            "Mod-B": $(r)
        }
    }
    unistNodeToProseMirrorNodes({
        schema: e,
        convertedChildren: r,
        attrs: t
    }) {
        return r.map(s => D(s, e.marks[this.proseMirrorMarkName()].create(t)))
    }
    processConvertedUnistNode(e) {
        return {
            type: this.unistNodeName(),
            children: [e]
        }
    }
}
const Y = 92,
    He = 10,
    I = "backslashEscape";

function Ke(n, e, r) {
    function t(s) {
        return s == null || s === He ? (n.exit(I), e(s)) : r(s)
    }
    return s => s !== Y ? r(s) : (n.enter(I), n.consume(s), t)
}

function Ge() {
    return {
        text: {
            [Y]: {
                name: I,
                tokenize: Ke
            }
        }
    }
}

function ze() {
    const n = this.data();
    n.micromarkExtensions ? ? = [], n.micromarkExtensions.push(Ge()), n.fromMarkdownExtensions ? ? = [], n.fromMarkdownExtensions.push({
        enter: {
            [I](e) {
                this.enter({
                    type: "break"
                }, e), this.exit(e)
            }
        }
    })
}
class Ve extends N {
    unistNodeName() {
        return "break"
    }
    static proseMirrorNodeName() {
        return "hard_break"
    }
    proseMirrorNodeSpec() {
        return {
            inline: !0,
            group: "inline",
            selectable: !1,
            parseDOM: [{
                tag: "br"
            }],
            marks: T.proseMirrorMarkName(),
            toDOM() {
                return ["br"]
            }
        }
    }
    proseMirrorKeymap(e) {
        const r = le(de, (s, o) => (o && o(s.tr.replaceSelectionWith(e.nodes[this.proseMirrorNodeName()].create()).scrollIntoView()), !0)),
            t = pe() || ce();
        return {
            "Mod-Enter": r,
            "Shift-Enter": r,
            ...t && {
                "Ctrl-Enter": r
            }
        }
    }
    unistNodeToProseMirrorNodes({
        schema: e,
        convertedChildren: r,
        attrs: t
    }) {
        return m(this.proseMirrorNodeName(), e, r, t)
    }
    proseMirrorNodeToUnistNodes() {
        return [{
            type: this.unistNodeName()
        }]
    }
    unifiedInitializationHook(e) {
        return e.use(ze)
    }
}
const je = "code_block",
    U = "```\n";

function qe(n, e) {
    const {
        start: r,
        end: t
    } = n;
    return r == null || t == null ? null : {
        start: r + U.length + (e.lang ? ? "").length,
        end: t - U.length
    }
}
class We extends N {
    dependencies() {
        return [new q]
    }
    unistNodeName() {
        return "code"
    }
    static proseMirrorNodeName() {
        return je
    }
    proseMirrorNodeSpec() {
        return {
            content: "text*",
            group: "block",
            code: !0,
            defining: !0,
            marks: [T.proseMirrorMarkName()].join(" "),
            attrs: {
                lang: {
                    default: null
                },
                isDarkMode: {
                    default: null
                }
            },
            parseDOM: [{
                tag: "pre",
                preserveWhitespace: "full"
            }],
            toDOM() {
                return ["pre", ["code", 0]]
            }
        }
    }
    proseMirrorInputRules(e) {
        return [he(/^\s{0,3}```$/, e.nodes[this.proseMirrorNodeName()])]
    }
    unistNodeToProseMirrorNodes({
        node: e,
        attrs: r,
        schema: t
    }) {
        const {
            lang: s
        } = e;
        return m(this.proseMirrorNodeName(), t, z(e, t, { ...r,
            ...qe(r, e) ? ? {}
        }), {
            lang: s,
            ...r
        })
    }
    proseMirrorNodeToUnistNodes(e, r) {
        return [{
            type: this.unistNodeName(),
            value: r.map(t => t.type === "startend" ? t.children.map(s => s.value).join("") : t.value).join(""),
            lang: e.attrs.lang
        }]
    }
}
class Je extends N {
    unistNodeName() {
        return "textDirective"
    }
    customDirectiveName() {
        return x
    }
    static proseMirrorNodeName() {
        return x
    }
    proseMirrorNodeSpec() {
        return {
            group: "inline",
            inline: !0,
            content: "inline*",
            atom: !0,
            attrs: {
                index: {
                    default: null
                },
                displayLayout: {
                    default: "inline"
                }
            },
            toDOM: e => ["span", {
                "data-type": "content-reference",
                "data-content-reference-index": e.attrs.index,
                "data-display-layout": e.attrs.displayLayout
            }, `:contentReference[oaicite:${e.attrs.index}]{index="${e.attrs.index}" displayLayout="${e.attrs.displayLayout}"}`],
            parseDOM: [{
                tag: 'span[data-type="content-reference"]',
                getAttrs(e) {
                    return {
                        index: e.getAttribute("data-index"),
                        displayLayout: e.getAttribute("data-display-layout") || "inline"
                    }
                }
            }]
        }
    }
    unistNodeToProseMirrorNodes({
        node: e,
        schema: r,
        convertedChildren: t
    }) {
        if (!Q(e) || e.name !== x || e.type !== this.unistNodeName()) return V.addError("ContentReferenceExtension: unistNodeToProseMirrorNodes: node is not a directive node or name is not contentReference", e), null;
        const s = {
            index: e.attributes ? .index,
            displayLayout: e.attributes ? .displayLayout ? ? "inline"
        };
        return r.nodes.contentReference.create(s, t)
    }
    proseMirrorNodeToUnistNodes(e, r) {
        if (r.length !== 1) return console.warn("ContentReferenceExtension: proseMirrorNodeToUnistNodes: convertedChildren.length != 1", r), [];
        const o = [{
            type: "text",
            value: r[0].children[0].value
        }];
        return [{
            type: "textDirective",
            name: x,
            attributes: {
                index: e.attrs.index,
                displayLayout: e.attrs.displayLayout
            },
            children: o,
            data: {
                hName: x,
                hProperties: {
                    displayLayout: e.attrs.displayLayout,
                    index: e.attrs.index
                }
            }
        }]
    }
}
class Fe extends N {
    unistNodeName() {
        return "thematicBreak"
    }
    static proseMirrorNodeName() {
        return "horizontal_rule"
    }
    proseMirrorNodeSpec() {
        return {
            group: "block",
            selectable: !1,
            parseDOM: [{
                tag: "hr"
            }],
            toDOM() {
                return ["div", ["hr"]]
            }
        }
    }
    proseMirrorInputRules(e) {
        return [new j(/^\s{0,3}(?:\*\*\*|---|___)\n$/, (r, t, s, o) => r.tr.replaceWith(s, o, m(this.proseMirrorNodeName(), e, []) ? ? []))]
    }
    proseMirrorKeymap(e) {
        return {
            "Mod-_": (r, t) => (t && t(r.tr.replaceSelectionWith(e.nodes[this.proseMirrorNodeName()].create()).scrollIntoView()), !0)
        }
    }
    unistNodeToProseMirrorNodes({
        schema: e,
        convertedChildren: r,
        attrs: t
    }) {
        return m(this.proseMirrorNodeName(), e, r, t)
    }
    proseMirrorNodeToUnistNodes() {
        return [{
            type: this.unistNodeName()
        }]
    }
}
class Qe extends w {
    unistNodeName() {
        return "inlineCode"
    }
    static proseMirrorMarkName() {
        return "code"
    }
    proseMirrorMarkSpec() {
        return {
            inclusive: !1,
            parseDOM: [{
                tag: "code"
            }],
            toDOM() {
                return ["code"]
            }
        }
    }
    proseMirrorInputRules(e) {
        return [new f(/`([^\s](?:.*[^\s])?)`([\s\S])$/, e.marks[this.proseMirrorMarkName()])]
    }
    proseMirrorKeymap(e) {
        const r = e.marks[this.proseMirrorMarkName()];
        return {
            "Ctrl-`": S(r)
        }
    }
    unistNodeToProseMirrorNodes({
        node: e,
        schema: r,
        attrs: t
    }) {
        const s = z(e, r, t, [r.marks[this.proseMirrorMarkName()].create(t)]);
        return s ? [s] : []
    }
    processConvertedUnistNode(e) {
        return {
            type: this.unistNodeName(),
            value: e.value
        }
    }
}
class Xe extends N {
    unistNodeName() {
        return "inlineMath"
    }
    static proseMirrorNodeName() {
        return "inline_math"
    }
    proseMirrorNodeSpec() {
        return {
            group: "inline",
            inline: !0,
            content: "text*",
            atom: !0,
            attrs: {
                latex: {
                    default: null
                }
            },
            parseDOM: [{
                tag: "span.inline-math",
                getAttrs(e) {
                    return {
                        latex: e.getAttribute("latex")
                    }
                }
            }],
            toDOM() {
                return ["span", {
                    class: "inline-math"
                }, 0]
            }
        }
    }
    unistNodeToProseMirrorNodes({
        node: e,
        schema: r,
        convertedChildren: t,
        attrs: s
    }) {
        const {
            value: o
        } = e;
        return m(this.proseMirrorNodeName(), r, t, { ...s,
            latex: o
        })
    }
    proseMirrorNodeToUnistNodes(e) {
        return [{
            type: this.unistNodeName(),
            value: e.attrs.latex
        }]
    }
}
class Ye extends w {
    unistNodeName() {
        return "emphasis"
    }
    static proseMirrorMarkName() {
        return "em"
    }
    proseMirrorMarkSpec() {
        return {
            parseDOM: [{
                tag: "i"
            }, {
                tag: "em"
            }, {
                style: "font-style",
                getAttrs: e => e === "italic" && null
            }],
            toDOM() {
                return ["em"]
            }
        }
    }
    proseMirrorInputRules(e) {
        return [new f(/(^|[^*])\*([^\s*](?:.*[^\s])?)\*([^*])$/, e.marks[this.proseMirrorMarkName()], {
            matchStartOffset: r => r[1].length,
            textGroup: 2,
            trailingTextGroup: 3
        }), new f(/(^|[^_])_([^\s_](?:.*[^\s])?)_([^_])$/, e.marks[this.proseMirrorMarkName()], {
            matchStartOffset: r => r[1].length,
            textGroup: 2,
            trailingTextGroup: 3
        })]
    }
    proseMirrorKeymap(e) {
        const r = e.marks[this.proseMirrorMarkName()];
        return {
            "Mod-i": S(r),
            "Mod-I": S(r)
        }
    }
    unistNodeToProseMirrorNodes({
        schema: e,
        convertedChildren: r,
        attrs: t
    }) {
        return r.map(s => D(s, e.marks[this.proseMirrorMarkName()].create(t)))
    }
    processConvertedUnistNode(e) {
        return {
            type: this.unistNodeName(),
            children: [e]
        }
    }
}
const k = "lineEndingBlank";

function H(n) {
    return n.type === k
}
const Ze = ({
    startIndex: n,
    endIndex: e,
    depth: r,
    isLastChild: t,
    parent: s = null
}) => {
    const o = e - n;
    return r > 0 && s ? .type !== "list" ? o : t || n === 0 ? o - Math.floor((o + 1) / 2) : o - Math.floor((o - 1) / 2)
};

function er() {
    const n = this.data();
    n.fromMarkdownExtensions ? ? = [], n.fromMarkdownExtensions.push({
        enter: {
            lineEndingBlank(r) {
                this.enter({
                    type: k
                }, r)
            }
        },
        exit: {
            lineEndingBlank(r) {
                this.exit(r)
            }
        }
    });
    const e = (r, t = 0) => {
        if (!X(r)) return;
        const {
            children: s
        } = r;
        let o = 0,
            a = null,
            i = null;
        const u = s.length;
        for (let l = 0; l < u; l++) {
            const d = s[l - o];
            e(d, t + 1);
            const {
                type: p
            } = d, c = l === u - 1 && p === k;
            if (p === k && a == null ? a = l : p !== k && a != null ? i = l : c && a != null && (i = l + 1), a != null && i != null) {
                const h = Ze({
                    startIndex: a,
                    endIndex: i,
                    depth: t,
                    isLastChild: c,
                    parent: r
                });
                s.splice(a - o, h), a = null, i = null, o += h
            }
        }
    };
    return r => {
        e(r)
    }
}
class rr extends N {
    unistNodeName() {
        return k
    }
    static proseMirrorNodeName() {
        return "paragraph"
    }
    proseMirrorNodeSpec() {
        return fe
    }
    unistNodeToProseMirrorNodes({
        schema: e,
        convertedChildren: r,
        attrs: t
    }) {
        return m(this.proseMirrorNodeName(), e, r, t)
    }
    proseMirrorNodeToUnistNodes(e, r) {
        return [{
            type: ge,
            children: r
        }]
    }
    unifiedInitializationHook(e) {
        return e.use(er)
    }
}
class tr extends N {
    unistNodeName() {
        return "math"
    }
    static proseMirrorNodeName() {
        return "math_block"
    }
    proseMirrorNodeSpec() {
        return {
            group: "block",
            content: "text*",
            atom: !0,
            code: !0,
            attrs: {
                latex: {
                    default: null
                }
            },
            parseDOM: [{
                tag: "div.math-block",
                getAttrs(e) {
                    return {
                        latex: e.getAttribute("latex")
                    }
                }
            }],
            toDOM() {
                return ["div", {
                    class: "math-block"
                }, 0]
            }
        }
    }
    unistNodeToProseMirrorNodes({
        node: e,
        schema: r,
        convertedChildren: t,
        attrs: s
    }) {
        const {
            value: o
        } = e;
        return m(this.proseMirrorNodeName(), r, t, { ...s,
            latex: o
        })
    }
    proseMirrorNodeToUnistNodes(e) {
        return [{
            type: this.unistNodeName(),
            value: e.attrs.latex
        }]
    }
}
class A extends N {
    static unorderedListCommand(e) {
        return (r, t) => {
            const s = e.nodes[this.proseMirrorNodeName()],
                o = e.nodes.ordered_list,
                a = e.nodes[y.proseMirrorNodeName()],
                i = e.nodes[C.proseMirrorNodeName()];
            if (!s) return !1;
            let u = r;
            const l = () => u,
                d = p => {
                    u = u.apply(p), t && t(p)
                };
            return W(l(), [s]) ? E(l, d, a, [o, s]) : !E(l, d, a, [o]) || !J(l, d, i) ? !1 : F(s)(l(), d)
        }
    }
    dependencies() {
        return [new y]
    }
    unistNodeName() {
        return "list"
    }
    unistToProseMirrorTest(e) {
        return e.type === this.unistNodeName() && e.ordered !== !0
    }
    static proseMirrorNodeName() {
        return "list"
    }
    proseMirrorNodeSpec() {
        return {
            content: "list_item+",
            group: "block",
            attrs: {
                spread: {
                    default: !1
                }
            },
            parseDOM: [{
                getAttrs(e) {
                    return {
                        spread: e.getAttribute("data-spread") === "true"
                    }
                },
                tag: "ul"
            }],
            toDOM(e) {
                return ["ul", {
                    "data-spread": e.attrs.spread
                }, 0]
            }
        }
    }
    proseMirrorInputRules(e) {
        return [v(/^\s{0,3}([-+*])\s$/, e.nodes[this.proseMirrorNodeName()])]
    }
    proseMirrorKeymap(e) {
        const r = A.unorderedListCommand(e);
        return {
            "Shift-Mod-8": r,
            "Alt-Mod-5": r
        }
    }
    unistNodeToProseMirrorNodes({
        node: e,
        schema: r,
        convertedChildren: t,
        attrs: s
    }) {
        const {
            spread: o
        } = e;
        return m(this.proseMirrorNodeName(), r, t, { ...s,
            spread: o
        })
    }
    proseMirrorNodeToUnistNodes(e, r) {
        const t = e.attrs.spread;
        return [{
            type: this.unistNodeName(),
            ordered: !1,
            spread: t,
            children: r.map(s => (s.spread = t, s))
        }]
    }
}
class O extends N {
    static orderedListCommand(e) {
        return (r, t) => {
            const s = e.nodes[this.proseMirrorNodeName()],
                o = e.nodes[A.proseMirrorNodeName()],
                a = e.nodes[y.proseMirrorNodeName()],
                i = e.nodes[C.proseMirrorNodeName()];
            if (!s) return !1;
            let u = r;
            const l = () => u,
                d = p => {
                    u = u.apply(p), t && t(p)
                };
            return W(l(), [s]) ? E(l, d, a, [s, o]) : !E(l, d, a, [o]) || !J(l, d, i) ? !1 : F(s)(l(), d)
        }
    }
    dependencies() {
        return [new y]
    }
    unistNodeName() {
        return "list"
    }
    unistToProseMirrorTest(e) {
        return e.type === this.unistNodeName() && e.ordered === !0
    }
    static proseMirrorNodeName() {
        return "ordered_list"
    }
    proseMirrorNodeSpec() {
        return {
            content: "list_item+",
            group: "block",
            attrs: {
                spread: {
                    default: !1
                },
                startingNumber: {
                    default: 1
                }
            },
            parseDOM: [{
                getAttrs(e) {
                    const r = e.getAttribute("start");
                    return {
                        spread: e.getAttribute("data-spread") === "true",
                        startingNumber: r != null ? parseInt(r) : 1
                    }
                },
                tag: "ol"
            }],
            toDOM(e) {
                return ["ol", {
                    "data-spread": e.attrs.spread,
                    start: e.attrs.startingNumber
                }, 0]
            }
        }
    }
    proseMirrorInputRules(e) {
        return [v(/^\s{0,3}(\d+)\.\s$/, e.nodes[this.proseMirrorNodeName()], r => ({
            startingNumber: +r[1]
        }), (r, t) => t.childCount + t.attrs.startingNumber === +r[1])]
    }
    proseMirrorKeymap(e) {
        const r = O.orderedListCommand(e);
        return {
            "Shift-Mod-9": r,
            "Alt-Mod-4": r
        }
    }
    unistNodeToProseMirrorNodes({
        node: e,
        schema: r,
        convertedChildren: t,
        attrs: s
    }) {
        const {
            spread: o,
            start: a
        } = e;
        return m(this.proseMirrorNodeName(), r, t, { ...s,
            spread: o,
            startingNumber: a ? ? 1
        })
    }
    proseMirrorNodeToUnistNodes(e, r) {
        const t = e.attrs.spread;
        return [{
            type: this.unistNodeName(),
            ordered: !0,
            spread: t,
            start: e.attrs.startingNumber,
            children: r.map(s => (s.spread = t, s))
        }]
    }
}
class sr extends w {
    unistNodeName() {
        return "delete"
    }
    static proseMirrorMarkName() {
        return "strikethrough"
    }
    proseMirrorMarkSpec() {
        return {
            parseDOM: [{
                tag: "s"
            }, {
                tag: "del"
            }, {
                style: "text-decoration",
                getAttrs: e => /(^|[\s])line-through([\s]|$)/.test(e) && null
            }],
            toDOM() {
                return ["s"]
            }
        }
    }
    proseMirrorInputRules(e) {
        return [new f(/~([^\s](?:.*[^\s~])?)~([^~])$/, e.marks[this.proseMirrorMarkName()]), new f(/~~([^\s](?:.*[^\s])?)~~([\s\S])$/, e.marks[this.proseMirrorMarkName()])]
    }
    unistNodeToProseMirrorNodes({
        schema: e,
        convertedChildren: r
    }) {
        return r.map(t => D(t, e.marks[this.proseMirrorMarkName()].create()))
    }
    processConvertedUnistNode(e) {
        return {
            type: this.unistNodeName(),
            children: [e]
        }
    }
}

function nr() {
    return n => {
        let e = -1;

        function r(s, o) {
            if (s.type === "tableRow" && e++, s.type === "tableCell") {
                const a = s;
                a.data = { ...a.data ? ? {},
                    rowIndex : e,
                    columnIndex : o
                }
            }
        }

        function t(s) {
            if (X(s))
                for (let o = 0; o < s.children.length; o++) {
                    const a = s.children[o];
                    r(a, o), t(a)
                }
        }
        t(n)
    }
}
class Z extends N {
    unistNodeName() {
        return "tableCell"
    }
    unistToProseMirrorTest(e) {
        return e.type === this.unistNodeName()
    }
    static proseMirrorNodeName() {
        return "table_cell"
    }
    proseMirrorNodeSpec() {
        return {
            content: "inline*",
            attrs: {
                rowIndex: {
                    default: null
                },
                columnIndex: {
                    default: null
                },
                colspan: {
                    default: 1
                },
                rowspan: {
                    default: 1
                }
            },
            tableRole: "cell",
            isolating: !0,
            parseDOM: [{
                tag: "td",
                getAttrs(e) {
                    const r = e;
                    return {
                        colspan: P(r.getAttribute("colspan"), 1),
                        rowspan: P(r.getAttribute("rowspan"), 1)
                    }
                }
            }],
            toDOM(e) {
                const {
                    colspan: r,
                    rowspan: t
                } = e.attrs, s = {
                    colspan: r !== 1 ? L(r, void 0) : void 0,
                    rowspan: t !== 1 ? L(t, void 0) : void 0
                };
                return [e.attrs.rowIndex == null || e.attrs.rowIndex > 0 ? "td" : "th", s, 0]
            }
        }
    }
    proseMirrorInputRules(e) {
        return []
    }
    proseMirrorKeymap(e) {
        return {}
    }
    unistNodeToProseMirrorNodes({
        node: e,
        schema: r,
        convertedChildren: t,
        attrs: s
    }) {
        return m(this.proseMirrorNodeName(), r, t, { ...s,
            colspan: 1,
            rowspan: 1,
            rowIndex: e.data ? .rowIndex,
            columnIndex: e.data ? .columnIndex
        })
    }
    proseMirrorNodeToUnistNodes(e, r) {
        return [{
            type: this.unistNodeName(),
            children: r,
            data: {
                rowIndex: e.attrs.rowIndex,
                columnIndex: e.attrs.columnIndex
            }
        }]
    }
}
class ee extends N {
    dependencies() {
        return [new Z]
    }
    unistNodeName() {
        return "tableRow"
    }
    static proseMirrorNodeName() {
        return "table_row"
    }
    proseMirrorNodeSpec() {
        return {
            content: "(table_cell+)",
            tableRole: "row",
            parseDOM: [{
                tag: "tr"
            }],
            toDOM() {
                return ["tr", 0]
            }
        }
    }
    proseMirrorInputRules(e) {
        return []
    }
    proseMirrorKeymap(e) {
        return {}
    }
    unistNodeToProseMirrorNodes({
        schema: e,
        convertedChildren: r,
        attrs: t
    }) {
        return m(this.proseMirrorNodeName(), e, r, t)
    }
    proseMirrorNodeToUnistNodes(e, r) {
        return [{
            type: this.unistNodeName(),
            children: r
        }]
    }
}
class or extends N {
    dependencies() {
        return [new ee]
    }
    unistNodeName() {
        return "table"
    }
    static proseMirrorNodeName() {
        return "table"
    }
    proseMirrorNodeSpec() {
        return {
            content: "(table_row+)",
            tableRole: "table",
            isolating: !0,
            group: "block",
            parseDOM: [{
                tag: "table"
            }],
            toDOM() {
                return ["table", ["tbody", 0]]
            }
        }
    }
    proseMirrorInputRules(e) {
        return []
    }
    proseMirrorKeymap(e) {
        return {}
    }
    unistNodeToProseMirrorNodes({
        schema: e,
        convertedChildren: r,
        attrs: t
    }) {
        return m(this.proseMirrorNodeName(), e, r, t)
    }
    proseMirrorNodeToUnistNodes(e, r) {
        return [{
            type: this.unistNodeName(),
            align: [],
            children: r
        }]
    }
    unifiedInitializationHook(e) {
        return e.use(nr)
    }
}

function K(n, e) {
    if (!(n == null || e == null)) return {
        start: { ...n
        },
        end: { ...e
        }
    }
}
const ar = () => n => {
    Te(n, "list", (e, r, t) => {
        if (t == null || r == null) return;
        const s = [];
        let o = [],
            a = 0;
        for (; a < e.children.length;) {
            const i = e.children[a];
            if (H(i)) {
                const u = [];
                for (; a < e.children.length && H(e.children[a]);) u.push(e.children[a]), a++;
                if (o.length === 0) throw new Error("Unexpected state: currentListItems is empty after encountering blank lines.");
                const l = o[0],
                    d = Ne(me(o)),
                    p = K(l.position ? .start ? ? e.position ? .start, d.position ? .end ? ? e.position ? .end),
                    M = {
                        type: "list",
                        ordered: e.ordered,
                        start: e.start,
                        spread: e.spread,
                        children: o,
                        position: p
                    };
                s.push(M), o = [], s.push(...u.map(c => ({
                    type: "lineEndingBlank",
                    position: c.position
                })))
            } else o.push(i), a++
        }
        if (o.length > 0) {
            const i = o[0],
                u = o[o.length - 1],
                l = K(i.position ? .start ? ? e.position ? .start, u.position ? .end ? ? e.position ? .end),
                d = {
                    type: "list",
                    ordered: e.ordered,
                    start: e.start,
                    spread: e.spread,
                    children: o,
                    position: l
                };
            s.push(d)
        }
        t.children.splice(r, 1, ...s)
    })
};
class ir extends N {
    unistNodeName() {
        return "textDirective"
    }
    customDirectiveName() {
        return g
    }
    static proseMirrorNodeName() {
        return g
    }
    proseMirrorNodeSpec() {
        return {
            group: "inline",
            inline: !0,
            atom: !0,
            selectable: !1,
            attrs: {
                timestamp: {
                    default: null
                }
            },
            toDOM: e => ["span", {
                "data-type": "hive-log",
                "data-timestamp": e.attrs.timestamp
            }],
            parseDOM: [{
                tag: 'span[data-type="hive-log"]',
                getAttrs(e) {
                    return {
                        timestamp: e.getAttribute("data-timestamp")
                    }
                }
            }]
        }
    }
    unistNodeToProseMirrorNodes({
        node: e,
        schema: r,
        convertedChildren: t
    }) {
        if (!Q(e) || e.name !== g || e.type !== this.unistNodeName()) return V.addError("HiveLogExtension: unistNodeToProseMirrorNodes: node is not a directive node or name is not HIVE_LOG_DIRECTIVE_NAME", e), null;
        const s = {
            timestamp: e.attributes ? .timestamp ? ? null
        };
        return r.nodes[g].create(s, t)
    }
    proseMirrorNodeToUnistNodes(e) {
        return [{
            type: "textDirective",
            name: g,
            attributes: {
                timestamp: e.attrs.timestamp
            },
            children: [],
            data: {
                hName: g,
                hProperties: {
                    timestamp: e.attrs.timestamp
                }
            }
        }]
    }
}
const ur = (n, e, r, t) => n.children.map(s => r.handle(s, void 0, r, t)).join(""),
    lr = (n, e, r, t) => r.safe(n.value, t).replaceAll("\\[", "[").replaceAll("\\&", "&"),
    dr = n => `\\(${n.value}\\)`;

function pr() {
    const n = this;
    n.compiler = e;

    function e(r) {
        return we(r, { ...n.data("settings"),
            fences: !0,
            bullet: "-",
            bulletOther: "*",
            listItemIndent: "one",
            resourceLink: !0,
            tightDefinitions: !0,
            rule: "-",
            handlers: {
                text: lr,
                startend: ur,
                inlineMath: dr
            },
            extensions: n.data("toMarkdownExtensions") || []
        })
    }
}
const re = [ve, [be, {
        singleTilde: !1
    }],
    [De, {
        singleDollarTextMath: !1
    }], _e, Ae, Se, Ee, ar, pr, Ie
];
class cr extends ye {
    dependencies() {
        const e = Me();
        return [new rr, new C, new Pe, new Ue, new Ve, new We, new ke, new Fe, new Qe, new Xe, new tr, new Ye, new Oe, new y, new O, new xe, new q, new A, new sr, new T, new or, new ee, new Z, ...e ? [new Je] : [], new ir]
    }
    unifiedInitializationHook(e) {
        return e.use(re)
    }
}
const yr = Object.freeze(Object.defineProperty({
    __proto__: null,
    CANVAS_REMARK_PLUGINS: re,
    MarkdownExtension: cr
}, Symbol.toStringTag, {
    value: "Module"
}));
export {
    Ue as B, Je as C, Fe as H, Ye as I, Oe as L, cr as M, O, sr as S, or as T, A as U, je as a, We as b, D as c, rr as d, Pe as e, Ve as f, Qe as g, ee as h, Z as i, pr as j, yr as p, ar as s, $e as t
};
//# sourceMappingURL=e5d54aa7-km6nxu8kh9k1ioef.js.map