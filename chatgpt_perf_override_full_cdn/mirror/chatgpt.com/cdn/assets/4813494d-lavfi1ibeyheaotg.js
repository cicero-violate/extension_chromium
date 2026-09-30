import {
    F1 as F,
    D_ as D,
    F2 as $,
    F3 as k,
    bR as z,
    qz as p,
    xl as x,
    F4 as w,
    qA as U,
    F5 as L,
    F6 as b,
    F7 as V,
    F8 as v
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    N as C
} from "./373ddd65-f76gy0b8ieo4s693.js";
class _ extends C {
    unistNodeName() {
        return "text"
    }
    static proseMirrorNodeName() {
        return "text"
    }
    proseMirrorNodeSpec() {
        return {
            group: "inline"
        }
    }
    unistNodeToProseMirrorNodes({
        node: t,
        schema: e,
        attrs: n
    }) {
        return F(t, e, n)
    }
    proseMirrorNodeToUnistNodes(t) {
        return [{
            type: this.unistNodeName(),
            value: t.text ? ? ""
        }]
    }
}
class m {
    constructor(t, e, n = {}) {
        this.match = t, this.match = t, this.handler = typeof e == "string" ? K(e) : e, this.undoable = n.undoable !== !1, this.inCode = n.inCode || !1
    }
}

function K(s) {
    return function(t, e, n, r) {
        let o = s;
        if (e[1]) {
            let l = e[0].lastIndexOf(e[1]);
            o += e[0].slice(l + e[1].length), n += l;
            let i = n - r;
            i > 0 && (o = e[0].slice(l - i, l) + o, n = r)
        }
        return t.tr.insertText(o, n, r)
    }
}
const W = 500;

function re({
    rules: s
}) {
    let t = new D({
        state: {
            init() {
                return null
            },
            apply(e, n) {
                let r = e.getMeta(this);
                return r || (e.selectionSet || e.docChanged ? null : n)
            }
        },
        props: {
            handleTextInput(e, n, r, o) {
                return A(e, n, r, o, s, t)
            },
            handleDOMEvents: {
                compositionend: e => {
                    setTimeout(() => {
                        let {
                            $cursor: n
                        } = e.state.selection;
                        n && A(e, n.pos, n.pos, "", s, t)
                    })
                }
            }
        },
        isInputRules: !0
    });
    return t
}

function A(s, t, e, n, r, o) {
    if (s.composing) return !1;
    let l = s.state,
        i = l.doc.resolve(t),
        a = i.parent.textBetween(Math.max(0, i.parentOffset - W), i.parentOffset, null, "￼") + n;
    for (let u = 0; u < r.length; u++) {
        let d = r[u];
        if (i.parent.type.spec.code) {
            if (!d.inCode) continue
        } else if (d.inCode === "only") continue;
        let f = d.match.exec(a),
            c = f && d.handler(l, f, t - (f[0].length - n.length), e);
        if (c) return d.undoable && c.setMeta(o, {
            transform: c,
            from: t,
            to: e,
            text: n
        }), s.dispatch(c), !0
    }
    return !1
}
new m(/--$/, "—");
new m(/\.\.\.$/, "…");
new m(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(")$/, "“");
new m(/"$/, "”");
new m(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(')$/, "‘");
new m(/'$/, "’");

function ne(s, t, e = null, n) {
    return new m(s, (r, o, l, i) => {
        let a = e instanceof Function ? e(o) : e,
            u = r.tr.delete(l, i),
            d = u.doc.resolve(l),
            f = d.blockRange(),
            c = f && $(f, t, a);
        if (!c) return null;
        u.wrap(f, c);
        let h = u.doc.resolve(l - 1).nodeBefore;
        return h && h.type == t && k(u.doc, l - 1) && (!n || n(o, h)) && u.join(l - 1), u
    })
}

function q(s, t, e = null) {
    return new m(s, (n, r, o, l) => {
        let i = n.doc.resolve(o),
            a = e instanceof Function ? e(r) : e;
        return i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), t) ? n.tr.delete(o, l).setBlockType(o, o, t, a) : null
    })
}

function S(s, t, e, n = {}) {
    if (s == null) return null;
    const r = (Array.isArray(e) ? e : [e]).filter(z),
        o = t.nodes[s].createAndFill(n, r);
    return o ? ? null
}

function oe(s, t = null) {
    return function(e, n) {
        let {
            $from: r,
            $to: o
        } = e.selection, l = r.blockRange(o), i = !1, a = l;
        if (!l) return !1;
        if (l.depth >= 2 && r.node(l.depth - 1).type.compatibleContent(s) && l.startIndex == 0) {
            if (r.index(l.depth - 1) == 0) return !1;
            let d = e.doc.resolve(l.start - 2);
            a = new b(d, d, l.depth), l.endIndex < l.parent.childCount && (l = new b(r, e.doc.resolve(o.end(l.depth)), l.depth)), i = !0
        }
        let u = $(a, s, t, l);
        return u ? (n && n(G(e.tr, l, u, i, s).scrollIntoView()), !0) : !1
    }
}

function G(s, t, e, n, r) {
    let o = p.empty;
    for (let d = e.length - 1; d >= 0; d--) o = p.from(e[d].type.create(e[d].attrs, o));
    s.step(new w(t.start - (n ? 2 : 0), t.end, t.start, t.end, new x(o, 0, 0), e.length, !0));
    let l = 0;
    for (let d = 0; d < e.length; d++) e[d].type == r && (l = d + 1);
    let i = e.length - l,
        a = t.start + e.length - (n ? 2 : 0),
        u = t.parent;
    for (let d = t.startIndex, f = t.endIndex, c = !0; d < f; d++, c = !1) !c && L(s.doc, a, i) && (s.split(a, i), a += 2 * i), a += u.child(d).nodeSize;
    return s
}

function J(s, t) {
    return function(e, n) {
        let {
            $from: r,
            $to: o,
            node: l
        } = e.selection;
        if (l && l.isBlock || r.depth < 2 || !r.sameParent(o)) return !1;
        let i = r.node(-1);
        if (i.type != s) return !1;
        if (r.parent.content.size == 0 && r.node(-1).childCount == r.indexAfter(-1)) {
            if (r.depth == 3 || r.node(-3).type != s || r.index(-2) != r.node(-2).childCount - 1) return !1;
            if (n) {
                let f = p.empty,
                    c = r.index(-1) ? 1 : r.index(-2) ? 2 : 3;
                for (let M = r.depth - c; M >= r.depth - 3; M--) f = p.from(r.node(M).copy(f));
                let h = r.indexAfter(-1) < r.node(-2).childCount ? 1 : r.indexAfter(-2) < r.node(-3).childCount ? 2 : 3;
                f = f.append(p.from(s.createAndFill()));
                let g = r.before(r.depth - (c - 1)),
                    y = e.tr.replace(g, r.after(-h), new x(f, 4 - c, 0)),
                    T = -1;
                y.doc.nodesBetween(g, y.doc.content.size, (M, B) => {
                    if (T > -1) return !1;
                    M.isTextblock && M.content.size == 0 && (T = B + 1)
                }), T > -1 && y.setSelection(U.near(y.doc.resolve(T))), n(y.scrollIntoView())
            }
            return !0
        }
        let a = o.pos == r.end() ? i.contentMatchAt(0).defaultType : null,
            u = e.tr.delete(r.pos, o.pos),
            d = a ? [null, {
                type: a
            }] : void 0;
        return L(u.doc, r.pos, 2, d) ? (n && n(u.split(r.pos, 2, d).scrollIntoView()), !0) : !1
    }
}

function R(s) {
    return function(t, e) {
        let {
            $from: n,
            $to: r
        } = t.selection, o = n.blockRange(r, l => l.childCount > 0 && l.firstChild.type == s);
        return o ? e ? n.node(o.depth - 1).type == s ? X(t, e, s, o) : j(t, e, o) : !0 : !1
    }
}

function X(s, t, e, n) {
    let r = s.tr,
        o = n.end,
        l = n.$to.end(n.depth);
    o < l && (r.step(new w(o - 1, l, o, l, new x(p.from(e.create(null, n.parent.copy())), 1, 0), 1, !0)), n = new b(r.doc.resolve(n.$from.pos), r.doc.resolve(l), n.depth));
    const i = V(n);
    if (i == null) return !1;
    r.lift(n, i);
    let a = r.mapping.map(o, -1) - 1;
    return k(r.doc, a) && r.join(a), t(r.scrollIntoView()), !0
}

function j(s, t, e) {
    let n = s.tr,
        r = e.parent;
    for (let h = e.end, g = e.endIndex - 1, y = e.startIndex; g > y; g--) h -= r.child(g).nodeSize, n.delete(h - 1, h + 1);
    let o = n.doc.resolve(e.start),
        l = o.nodeAfter;
    if (n.mapping.map(e.end) != e.start + o.nodeAfter.nodeSize) return !1;
    let i = e.startIndex == 0,
        a = e.endIndex == r.childCount,
        u = o.node(-1),
        d = o.index(-1);
    if (!u.canReplace(d + (i ? 0 : 1), d + 1, l.content.append(a ? p.empty : p.from(r)))) return !1;
    let f = o.pos,
        c = f + l.nodeSize;
    return n.step(new w(f - (i ? 1 : 0), c + (a ? 1 : 0), f + 1, c - 1, new x((i ? p.empty : p.from(r.copy(p.empty))).append(a ? p.empty : p.from(r.copy(p.empty))), i ? 0 : 1, a ? 0 : 1), i ? 0 : 1)), t(n.scrollIntoView()), !0
}

function E(s) {
    return function(t, e) {
        let {
            $from: n,
            $to: r
        } = t.selection, o = n.blockRange(r, u => u.childCount > 0 && u.firstChild.type == s);
        if (!o) return !1;
        let l = o.startIndex;
        if (l == 0) return !1;
        let i = o.parent,
            a = i.child(l - 1);
        if (a.type != s) return !1;
        if (e) {
            let u = a.lastChild && a.lastChild.type == i.type,
                d = p.from(u ? s.create() : null),
                f = new x(p.from(s.create(null, p.from(i.type.create(null, d)))), u ? 3 : 1, 0),
                c = o.start,
                h = o.end;
            e(t.tr.step(new w(c - (u ? 3 : 1), h, c, h, f, 1, !0)).scrollIntoView())
        }
        return !0
    }
}
class Q extends C {
    unistNodeName() {
        return "listItem"
    }
    static proseMirrorNodeName() {
        return "regular_list_item"
    }
    proseMirrorNodeSpec() {
        return {
            content: "paragraph block*",
            defining: !0,
            group: "list_item",
            parseDOM: [{
                tag: "li"
            }],
            toDOM() {
                return ["li", 0]
            }
        }
    }
    unistToProseMirrorTest(t) {
        return t.type === this.unistNodeName() && (!("checked" in t) || typeof t.checked != "boolean")
    }
    proseMirrorKeymap(t) {
        const e = t.nodes[this.proseMirrorNodeName()];
        return {
            Enter: J(e),
            "Shift-Tab": R(e),
            Tab: E(e)
        }
    }
    unistNodeToProseMirrorNodes({
        schema: t,
        convertedChildren: e,
        attrs: n
    }) {
        return S(this.proseMirrorNodeName(), t, e, n)
    }
    proseMirrorNodeToUnistNodes(t, e) {
        return [{
            type: this.unistNodeName(),
            children: e
        }]
    }
}
const O = (s, t) => {
        const e = t.filter(Boolean);
        if (e.length === 0) return !1;
        const {
            $from: n
        } = s.selection, r = new Set(e);
        for (let o = n.depth; o >= 0; o--)
            if (r.has(n.node(o).type)) return !0;
        return !1
    },
    P = (s, t, e, n = []) => {
        if (!e) return !0;
        const r = Y(n);
        if (r.length === 0) return !0;
        for (; O(s(), r);)
            if (!R(e)(s(), t)) return !1;
        return !0
    },
    le = (s, t, e) => !e || O(s(), [e]) ? !0 : v(e)(s(), t),
    Y = s => s.filter(Boolean),
    Z = {
        content: "inline*",
        group: "block",
        parseDOM: [{
            tag: "p"
        }],
        toDOM() {
            return ["p", 0]
        }
    },
    H = "paragraph";
class I extends C {
    static paragraphStyleCommand(t) {
        return (e, n) => {
            const r = t.nodes[I.proseMirrorNodeName()],
                o = t.nodes.ordered_list,
                l = t.nodes.list,
                i = t.nodes[Q.proseMirrorNodeName()];
            if (!r) return !1;
            let a = e;
            const u = () => a,
                d = f => {
                    a = a.apply(f), n && n(f)
                };
            return P(u, d, i, [o, l]) ? v(r)(u(), d) : !1
        }
    }
    unistNodeName() {
        return H
    }
    static proseMirrorNodeName() {
        return "paragraph"
    }
    proseMirrorNodeSpec() {
        return Z
    }
    proseMirrorKeymap(t) {
        return {
            "Alt-Mod-0": I.paragraphStyleCommand(t)
        }
    }
    unistNodeToProseMirrorNodes({
        schema: t,
        convertedChildren: e,
        attrs: n
    }) {
        return S(this.proseMirrorNodeName(), t, e, n)
    }
    proseMirrorNodeToUnistNodes(t, e) {
        return [{
            type: this.unistNodeName(),
            children: e
        }]
    }
}
class N extends C {
    static isAtStart(t, e) {
        return t.selection.empty ? e !== void 0 ? e.endOfTextblock("backward", t) : t.selection.$anchor.parentOffset > 0 : !1
    }
    static headingLevelCommandBuilder(t, e, n) {
        return (r, o, l) => {
            if (n && !N.isAtStart(r, l)) return !1;
            const {
                $anchor: i
            } = r.selection, a = i.parent;
            if (a.type.name !== "heading") return !1;
            const u = a.attrs.level + e;
            if (u < 0 || u > 6) return !1;
            if (o === void 0) return !0;
            const d = i.before(i.depth);
            return u > 0 ? o(r.tr.setNodeMarkup(d, void 0, {
                level: u
            })) : o(r.tr.setNodeMarkup(d, t.nodes.paragraph)), !0
        }
    }
    static headingStyleCommand(t, e) {
        return (n, r) => {
            const o = t.nodes[this.proseMirrorNodeName()];
            if (!o) return !1;
            const l = t.nodes.ordered_list,
                i = t.nodes.list,
                a = t.nodes.regular_list_item;
            let u = n;
            const d = () => u,
                f = c => {
                    u = u.apply(c), r && r(c)
                };
            return P(d, f, a, [l, i]) ? v(o, {
                level: e
            })(d(), f) : !1
        }
    }
    dependencies() {
        return [new I, new _]
    }
    unistNodeName() {
        return "heading"
    }
    static proseMirrorNodeName() {
        return "heading"
    }
    proseMirrorNodeSpec() {
        return {
            attrs: {
                level: {
                    default: 1
                }
            },
            content: "text*",
            group: "block",
            defining: !0,
            parseDOM: [{
                tag: "h1",
                attrs: {
                    level: 1
                }
            }, {
                tag: "h2",
                attrs: {
                    level: 2
                }
            }, {
                tag: "h3",
                attrs: {
                    level: 3
                }
            }, {
                tag: "h4",
                attrs: {
                    level: 4
                }
            }, {
                tag: "h5",
                attrs: {
                    level: 5
                }
            }, {
                tag: "h6",
                attrs: {
                    level: 6
                }
            }],
            toDOM(t) {
                return ["h" + t.attrs.level.toString(), 0]
            }
        }
    }
    proseMirrorInputRules(t) {
        return [q(/^\s{0,3}(#{1,6})\s$/, t.nodes[this.proseMirrorNodeName()], e => ({
            level: e[1].length
        }))]
    }
    proseMirrorKeymap(t) {
        const e = t.nodes[this.proseMirrorNodeName()],
            n = {
                Tab: N.headingLevelCommandBuilder(t, 1, !1),
                "#": N.headingLevelCommandBuilder(t, 1, !0),
                "Shift-Tab": N.headingLevelCommandBuilder(t, -1, !1),
                "Shift-Mod-1": N.headingStyleCommand(t, 1),
                "Shift-Mod-2": N.headingStyleCommand(t, 2),
                "Shift-Mod-3": N.headingStyleCommand(t, 3),
                "Alt-Mod-1": N.headingStyleCommand(t, 1),
                "Alt-Mod-2": N.headingStyleCommand(t, 2),
                "Alt-Mod-3": N.headingStyleCommand(t, 3)
            };
        for (let r = 1; r <= 6; r++) n[`Shift-Mod-${r.toString()}`] = v(e, {
            level: r
        });
        return n
    }
    unistNodeToProseMirrorNodes({
        node: t,
        schema: e,
        convertedChildren: n,
        attrs: r
    }) {
        const {
            depth: o
        } = t;
        return S(this.proseMirrorNodeName(), e, n, { ...r,
            level: o
        })
    }
    proseMirrorNodeToUnistNodes(t, e) {
        return [{
            type: this.unistNodeName(),
            depth: t.attrs.level,
            children: e
        }]
    }
}
class se extends C {
    unistNodeName() {
        return "root"
    }
    static proseMirrorNodeName() {
        return "doc"
    }
    proseMirrorNodeSpec() {
        return {
            content: "block+"
        }
    }
    unistNodeToProseMirrorNodes({
        schema: t,
        convertedChildren: e,
        attrs: n
    }) {
        return S(this.proseMirrorNodeName(), t, e, n)
    }
    proseMirrorNodeToUnistNodes(t, e) {
        return [{
            type: this.unistNodeName(),
            children: e
        }]
    }
}
export {
    N as H, m as I, Q as L, I as P, se as R, _ as T, Z as a, H as b, S as c, oe as d, le as e, E as f, R as g, J as h, re as i, P as l, O as s, q as t, ne as w
};
//# sourceMappingURL=4813494d-lavfi1ibeyheaotg.js.map