import {
    a7 as O,
    uz as U
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    C as V,
    M as z
} from "./e5d54aa7-km6nxu8kh9k1ioef.js";
import {
    E as B,
    M as F,
    N as H
} from "./373ddd65-f76gy0b8ieo4s693.js";
import {
    stripDirectivePlugin as K
} from "./200313d5-pcfdrmdp92b52l9u.js";
import {
    Fl as A,
    FM as G,
    Fk as j,
    aJ as b,
    FN as C,
    D as J,
    jS as W,
    bR as q,
    D_ as X,
    D$ as D,
    FO as Z,
    FP as N
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    i as $
} from "./4813494d-lavfi1ibeyheaotg.js";
import {
    unified as Q
} from "./f6f4f1b2-gtlbp7j4szobo0y1.js";
class Y extends B {
    unifiedInitializationHook(t) {
        return t.use(K)
    }
}
class _ {
    rules;
    constructor(t, e) {
        this.rules = [].concat.apply([], t.syntaxExtensions().map(n => n.proseMirrorInputRules(e)))
    }
    build() {
        return $({
            rules: this.rules
        })
    }
}
class ee {
    keymap;
    constructor(t, e) {
        this.keymap = new Map;
        for (const n of t.syntaxExtensions()) this.addKeymap(n.proseMirrorKeymap(e));
        this.addKeymap(A)
    }
    build() {
        const t = {};
        return this.keymap.forEach((e, n) => {
            t[n] = G(...e)
        }), j(t)
    }
    addKeymap(t) {
        for (const e in t) this.keymap.get(e) || this.keymap.set(e, []), b(this.keymap.get(e)).push(t[e])
    }
}
class te {
    nodeViews;
    constructor(t) {
        this.nodeViews = {};
        for (const e of t.nodeExtensions()) {
            const n = e.proseMirrorNodeName(),
                o = e.proseMirrorNodeView();
            n !== V.proseMirrorNodeName() && n != null && o != null && (this.nodeViews[n] = o)
        }
    }
    build() {
        return this.nodeViews
    }
}
class ne {
    nodes = {};
    marks = {};
    constructor(t) {
        for (const e of t.nodeExtensions()) {
            const n = e.proseMirrorNodeName(),
                o = e.proseMirrorNodeSpec();
            n != null && o != null && (n !== "text" && (o.attrs = { ...o.attrs,
                start: {
                    default: void 0
                },
                end: {
                    default: void 0
                }
            }), this.nodes[n] = o)
        }
        for (const e of t.markExtensions()) {
            const n = e.proseMirrorMarkName(),
                o = e.proseMirrorMarkSpec();
            n != null && o != null && (this.marks[n] = o)
        }
    }
    build() {
        try {
            return new C({
                nodes: this.nodes,
                marks: this.marks
            })
        } catch (t) {
            J.addError(t, {
                nodes: this.nodes
            })
        }
        return new C({
            nodes: {
                doc: {
                    content: "block+"
                },
                paragraph: {
                    content: "inline*",
                    group: "block",
                    parseDOM: [{
                        tag: "p",
                        preserveWhitespace: "full"
                    }],
                    toDOM: () => ["p", 0]
                },
                text: {
                    group: "inline"
                }
            },
            marks: this.marks
        })
    }
}
class se {
    extensionManager;
    constructor(t) {
        this.extensionManager = t
    }
    build() {
        let t = Q();
        for (const e of this.extensionManager.extensions()) t = e.unifiedInitializationHook(t);
        return t
    }
}

function oe(s) {
    return s instanceof H
}

function re(s) {
    return s instanceof F
}
class ie {
    markExtensionList;
    nodeExtensionList;
    otherExtensionList;
    constructor(t) {
        this.markExtensionList = new Map, this.nodeExtensionList = new Map, this.otherExtensionList = new Map;
        for (const e of t) this.add(e)
    }
    extensions() {
        return this.syntaxExtensions().concat(Array.from(this.otherExtensionList.values()))
    }
    markExtensions() {
        return Array.from(this.markExtensionList.values())
    }
    nodeExtensions() {
        return Array.from(this.nodeExtensionList.values())
    }
    syntaxExtensions() {
        return this.nodeExtensions().concat(this.markExtensions())
    }
    add(t) {
        for (const e of t.dependencies()) this.add(e);
        if (re(t)) {
            this.markExtensionList.set(t.constructor, t);
            return
        }
        if (oe(t)) {
            this.nodeExtensionList.set(t.constructor, t);
            return
        }
        this.otherExtensionList.set(t.constructor, t)
    }
}
class ae {
    extensionManager;
    constructor(t) {
        this.extensionManager = t
    }
    convert(t) {
        const e = this.convertNode(t);
        if (e.length !== 1) throw new Error("Couldn't find any way to convert the root ProseMirror node.");
        return e[0]
    }
    convertNode(t) {
        let e = null;
        const n = [];
        for (const o of this.extensionManager.nodeExtensions()) {
            if (!o.proseMirrorToUnistTest(t)) continue;
            n.push(o);
            let r = [];
            for (let i = 0; i < t.childCount; ++i) r = r.concat(this.convertNode(t.child(i)));
            e = o.proseMirrorNodeToUnistNodes(t, r)
        }
        return e == null ? (console.warn(`Couldn't find any way to convert ProseMirror node of type "` + t.type.name + '" to a unist node.'), []) : e.map(o => {
            for (const r of t.marks) {
                const {
                    type: {
                        name: i
                    }
                } = r;
                if (n.some(p => {
                        const l = p.proseMirrorNodeSpec() ? .marks;
                        return l != null && !l.includes(i)
                    })) continue;
                let c = !1;
                for (const p of this.extensionManager.markExtensions()) r.type.name === p.proseMirrorMarkName() && (o = p.processConvertedUnistNode(o, r), c = !0);
                c || console.warn(`Couldn't find any way to convert ProseMirror mark of type "` + i + '" to a unist node.')
            }
            return o
        })
    }
}
class E {
    extensionManager;
    proseMirrorSchema;
    constructor(t, e) {
        this.extensionManager = t, this.proseMirrorSchema = e
    }
    static unistNodeIsParent(t) {
        return "children" in t
    }
    convert(t) {
        const e = {},
            n = this.convertNode(t, e);
        for (const o of this.extensionManager.syntaxExtensions()) o.postUnistToProseMirrorHook(e);
        if (n.length !== 1) throw new Error("Couldn't find any way to convert the root unist node.");
        return n[0]
    }
    convertNode(t, e) {
        let n = 0;
        const o = (r, i) => {
            for (const a of this.extensionManager.syntaxExtensions()) {
                if (!a.unistToProseMirrorTest(r) || O(r) && a.customDirectiveName() != null && a.customDirectiveName() !== r.name) continue;
                let c = [];
                E.unistNodeIsParent(r) && (c = r.children.flatMap(f => o(f, i)));
                const {
                    position: p
                } = r, l = p ? .start.offset ? ? n;
                let u = p ? .end.offset;
                if (u == null && "value" in r && typeof r.value == "string") {
                    const {
                        value: f
                    } = r;
                    u = l + f.length
                }
                u == null && (u = l), n = u;
                const d = {
                    start: l,
                    end: u
                };
                return W(a.unistNodeToProseMirrorNodes({
                    node: r,
                    schema: this.proseMirrorSchema,
                    convertedChildren: c,
                    context: i,
                    attrs: d
                })).filter(q)
            }
            return console.warn(`Couldn't find any way to convert unist node of type "` + r.type + '" to a ProseMirror node.'), []
        };
        return o(t, e)
    }
}
const ue = 5;
class ce {
    builtSchema;
    inputRulesBuilder;
    keymapBuilder;
    nodeViewBuilder;
    unistToProseMirrorConverter;
    proseMirrorToUnistConverter;
    unified;
    memoizedProsemirrorDocs = new Map;
    constructor(t = []) {
        const e = new ie(t);
        this.builtSchema = new ne(e).build(), this.inputRulesBuilder = new _(e, this.builtSchema), this.keymapBuilder = new ee(e, this.builtSchema), this.nodeViewBuilder = new te(e), this.unistToProseMirrorConverter = new E(e, this.builtSchema), this.proseMirrorToUnistConverter = new ae(e), this.unified = new se(e).build()
    }
    parse(t) {
        try {
            if (this.memoizedProsemirrorDocs.has(t)) return b(this.memoizedProsemirrorDocs.get(t));
            const e = this.unistToProseMirrorConverter.convert(this.parseUnist(t));
            if (this.memoizedProsemirrorDocs.set(t, e), this.memoizedProsemirrorDocs.size > ue) {
                const n = this.memoizedProsemirrorDocs.keys().next().value;
                n && this.memoizedProsemirrorDocs.delete(n)
            }
            return e
        } catch (e) {
            U.logError("Failed to parse document", e)
        }
        return this.schema().text(" ")
    }
    parseUnist(t) {
        return this.unified.runSync(this.unified.parse(t))
    }
    schema() {
        return this.builtSchema
    }
    inputRulesPlugin() {
        return this.inputRulesBuilder.build()
    }
    keymapPlugin() {
        return this.keymapBuilder.build()
    }
    nodeViews() {
        return this.nodeViewBuilder.build()
    }
    serialize(t) {
        const e = this.proseMirrorToUnistConverter.convert(t);
        return this.unified.stringify(e)
    }
}
const P = new Map;

function Ne(s = {}) {
    const t = JSON.stringify(s);
    let e = P.get(t);
    return e == null && (e = new ce([new z, ...s ? .shouldStripDirectives ? [new Y] : []]), P.set(t, e)), e
}
const pe = 500;
class g {
    constructor(t, e) {
        this.items = t, this.eventCount = e
    }
    popEvent(t, e) {
        if (this.eventCount == 0) return null;
        let n = this.items.length;
        for (;; n--)
            if (this.items.get(n - 1).selection) {
                --n;
                break
            }
        let o, r;
        e && (o = this.remapping(n, this.items.length), r = o.maps.length);
        const i = t.tr;
        let a, c;
        const p = [],
            l = [];
        return this.items.forEach((u, d) => {
            if (!u.step) {
                o || (o = this.remapping(n, d + 1), r = o.maps.length), r--, l.push(u);
                return
            }
            if (o) {
                l.push(new h(u.map));
                const m = u.step.map(o.slice(r));
                let f;
                m && i.maybeStep(m).doc && (f = i.mapping.maps[i.mapping.maps.length - 1], p.push(new h(f, void 0, void 0, p.length + l.length))), r--, f && o.appendMap(f, r)
            } else i.maybeStep(u.step);
            if (u.selection) return a = o ? u.selection.map(o.slice(r)) : u.selection, c = new g(this.items.slice(0, n).append(l.reverse().concat(p)), this.eventCount - 1), !1
        }, this.items.length, 0), {
            remaining: c,
            transform: i,
            selection: a
        }
    }
    addTransform(t, e, n, o) {
        const r = [];
        let i = this.eventCount,
            a = this.items,
            c = !o && a.length ? a.get(a.length - 1) : null;
        for (let l = 0; l < t.steps.length; l++) {
            const u = t.steps[l].invert(t.docs[l]);
            let d = new h(t.mapping.maps[l], u, e),
                m;
            (m = c && c.merge(d)) && (d = m, l ? r.pop() : a = a.slice(0, a.length - 1)), r.push(d), e && (i++, e = void 0), o || (c = d)
        }
        const p = i - n.depth;
        return p > de && (a = le(a, p), i -= p), new g(a.append(r), i)
    }
    remapping(t, e) {
        const n = new Z;
        return this.items.forEach((o, r) => {
            const i = o.mirrorOffset != null && r - o.mirrorOffset >= t ? n.maps.length - o.mirrorOffset : void 0;
            n.appendMap(o.map, i)
        }, t, e), n
    }
    addMaps(t) {
        return this.eventCount == 0 ? this : new g(this.items.append(t.map(e => new h(e))), this.eventCount)
    }
    rebased(t, e) {
        if (!this.eventCount) return this;
        const n = [],
            o = Math.max(0, this.items.length - e),
            r = t.mapping;
        let i = t.steps.length,
            a = this.eventCount;
        this.items.forEach(d => {
            d.selection && a--
        }, o);
        let c = e;
        this.items.forEach(d => {
            const m = r.getMirror(--c);
            if (m == null) return;
            i = Math.min(i, m);
            const f = r.maps[m];
            if (d.step) {
                const L = t.steps[m].invert(t.docs[m]),
                    k = d.selection && d.selection.map(r.slice(c + 1, m));
                k && a++, n.push(new h(f, L, k))
            } else n.push(new h(f))
        }, o);
        const p = [];
        for (let d = e; d < i; d++) p.push(new h(r.maps[d]));
        const l = this.items.slice(0, o).append(p).append(n);
        let u = new g(l, a);
        return u.emptyItemCount() > pe && (u = u.compress(this.items.length - n.length)), u
    }
    emptyItemCount() {
        let t = 0;
        return this.items.forEach(e => {
            e.step || t++
        }), t
    }
    compress(t = this.items.length) {
        const e = this.remapping(0, t);
        let n = e.maps.length;
        const o = [];
        let r = 0;
        return this.items.forEach((i, a) => {
            if (a >= t) o.push(i), i.selection && r++;
            else if (i.step) {
                const c = i.step.map(e.slice(n)),
                    p = c && c.getMap();
                if (n--, p && e.appendMap(p, n), c) {
                    const l = i.selection && i.selection.map(e.slice(n));
                    l && r++;
                    const u = new h(p.invert(), c, l),
                        d = o.length - 1;
                    let m;
                    (m = o.length && o[d].merge(u)) ? o[d] = m: o.push(u)
                }
            } else i.map && n--
        }, this.items.length, 0), new g(N.from(o.reverse()), r)
    }
    static empty = new g(N.empty, 0)
}

function le(s, t) {
    let e;
    return s.forEach((n, o) => {
        if (n.selection && t-- == 0) return e = o, !1
    }), s.slice(e)
}
class h {
    constructor(t, e, n, o) {
        this.map = t, this.step = e, this.selection = n, this.mirrorOffset = o
    }
    merge(t) {
        if (this.step && t.step && !t.selection) {
            const e = t.step.merge(this.step);
            if (e) return new h(e.getMap().invert(), e, this.selection)
        }
    }
}
class M {
    constructor(t, e, n, o, r) {
        this.done = t, this.undone = e, this.prevRanges = n, this.prevTime = o, this.prevComposition = r
    }
}
const de = 20;

function me(s, t, e, n) {
    const o = e.getMeta(v);
    let r;
    if (o) return o.historyState;
    e.getMeta(I) && (s = new M(s.done, s.undone, null, 0, -1));
    const i = e.getMeta("appendedTransaction");
    if (e.steps.length == 0) return s;
    if (i && i.getMeta(v)) return i.getMeta(v).redo ? new M(s.done.addTransform(e, void 0, n, w(t)), s.undone, T(e.mapping.maps), s.prevTime, s.prevComposition) : new M(s.done, s.undone.addTransform(e, void 0, n, w(t)), null, s.prevTime, s.prevComposition);
    if (e.getMeta("addToHistory") !== !1 && !(i && i.getMeta("addToHistory") === !1)) {
        const a = e.getMeta("composition"),
            c = s.prevTime == 0 || !i && s.prevComposition != a && (s.prevTime < (e.time || 0) - n.newGroupDelay || !fe(e, s.prevRanges)),
            p = i ? x(s.prevRanges, e.mapping) : T(e.mapping.maps);
        return new M(s.done.addTransform(e, c ? t.selection.getBookmark() : void 0, n, w(t)), g.empty, p, e.time, a ? ? s.prevComposition)
    } else return (r = e.getMeta("rebased")) ? new M(s.done.rebased(e, r), s.undone.rebased(e, r), x(s.prevRanges, e.mapping), s.prevTime, s.prevComposition) : new M(s.done.addMaps(e.mapping.maps), s.undone.addMaps(e.mapping.maps), x(s.prevRanges, e.mapping), s.prevTime, s.prevComposition)
}

function fe(s, t) {
    if (!t) return !1;
    if (!s.docChanged) return !0;
    let e = !1;
    return s.mapping.maps[0].forEach((n, o) => {
        for (let r = 0; r < t.length; r += 2) n <= t[r + 1] && o >= t[r] && (e = !0)
    }), e
}

function T(s) {
    const t = [];
    for (let e = s.length - 1; e >= 0 && t.length == 0; e--) s[e].forEach((n, o, r, i) => t.push(r, i));
    return t
}

function x(s, t) {
    if (!s) return null;
    const e = [];
    for (let n = 0; n < s.length; n += 2) {
        const o = t.map(s[n], 1),
            r = t.map(s[n + 1], -1);
        o <= r && e.push(o, r)
    }
    return e
}

function he(s, t, e) {
    const n = w(t),
        o = v.get(t).spec.config,
        r = (e ? s.undone : s.done).popEvent(t, n);
    if (!r) return null;
    const i = r.selection.resolve(r.transform.doc),
        a = (e ? s.done : s.undone).addTransform(r.transform, t.selection.getBookmark(), o, n),
        c = new M(e ? a : r.remaining, e ? r.remaining : a, null, 0, -1);
    return r.transform.setSelection(i).setMeta(v, {
        redo: e,
        historyState: c
    })
}
let y = !1,
    S = null;

function w(s) {
    const t = s.plugins;
    if (S != t) {
        y = !1, S = t;
        for (let e = 0; e < t.length; e++)
            if (t[e].spec.historyPreserveItems) {
                y = !0;
                break
            }
    }
    return y
}

function Pe(s) {
    return s.setMeta(I, !0)
}
const v = new D("history"),
    I = new D("closeHistory");

function Te(s = {}, t = void 0) {
    return s = {
        depth: s.depth || 100,
        newGroupDelay: s.newGroupDelay || 500
    }, new X({
        key: v,
        state: {
            init() {
                return t ? ? new M(g.empty, g.empty, null, 0, -1)
            },
            apply(e, n, o) {
                return me(n, o, e, s)
            }
        },
        config: s,
        props: {
            handleDOMEvents: {
                beforeinput(e, n) {
                    const o = n.inputType,
                        r = o == "historyUndo" ? ge : o == "historyRedo" ? ve : null;
                    return !r || !e.editable ? !1 : (n.preventDefault(), r(e.state, e.dispatch))
                }
            }
        }
    })
}

function R(s, t) {
    return (e, n) => {
        const o = v.getState(e);
        if (!o || (s ? o.undone : o.done).eventCount == 0) return !1;
        if (n) {
            const r = he(o, e, s);
            r && n(t ? r.scrollIntoView() : r)
        }
        return !0
    }
}
const ge = R(!1, !0),
    ve = R(!0, !0);

function Se(s) {
    const t = v.getState(s);
    return t ? t.done.eventCount : 0
}

function be(s) {
    const t = v.getState(s);
    return t ? t.undone.eventCount : 0
}
export {
    ce as P, Y as S, Se as a, v as b, Pe as c, be as d, Ne as g, Te as h, ve as r, ge as u
};
//# sourceMappingURL=ab750810-c6c8o97xy0a4lr6p.js.map