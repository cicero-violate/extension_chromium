import {
    E as X,
    P as fn,
    V as Qe,
    F as Z,
    b as ke,
    S as at,
    D as H,
    u as It,
    d as Xe,
    m as Bt,
    p as un,
    n as cn,
    c as Fe,
    o as ht,
    v as dn,
    R as pn,
    G as gn,
    W as Mt
} from "./1bc04b52-c6spp0aq3f71sxih.js";
const mn = 1024;
let kn = 0;
class W {
    constructor(e, t) {
        this.from = e, this.to = t
    }
}
class b {
    constructor(e = {}) {
        this.id = kn++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
            throw new Error("This node type doesn't define a deserialize function")
        }), this.combine = e.combine || null
    }
    add(e) {
        if (this.perNode) throw new RangeError("Can't add per-node props to node types");
        return typeof e != "function" && (e = z.match(e)), t => {
            let n = e(t);
            return n === void 0 ? null : [this, n]
        }
    }
}
b.closedBy = new b({
    deserialize: i => i.split(" ")
});
b.openedBy = new b({
    deserialize: i => i.split(" ")
});
b.group = new b({
    deserialize: i => i.split(" ")
});
b.isolate = new b({
    deserialize: i => {
        if (i && i != "rtl" && i != "ltr" && i != "auto") throw new RangeError("Invalid value for isolate: " + i);
        return i || "auto"
    }
});
b.contextHash = new b({
    perNode: !0
});
b.lookAhead = new b({
    perNode: !0
});
b.mounted = new b({
    perNode: !0
});
class ue {
    constructor(e, t, n, r = !1) {
        this.tree = e, this.overlay = t, this.parser = n, this.bracketed = r
    }
    static get(e) {
        return e && e.props && e.props[b.mounted.id]
    }
}
const bn = Object.create(null);
class z {
    constructor(e, t, n, r = 0) {
        this.name = e, this.props = t, this.id = n, this.flags = r
    }
    static define(e) {
        let t = e.props && e.props.length ? Object.create(null) : bn,
            n = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0),
            r = new z(e.name || "", t, e.id, n);
        if (e.props) {
            for (let s of e.props)
                if (Array.isArray(s) || (s = s(r)), s) {
                    if (s[0].perNode) throw new RangeError("Can't store a per-node prop on a node type");
                    t[s[0].id] = s[1]
                }
        }
        return r
    }
    prop(e) {
        return this.props[e.id]
    }
    get isTop() {
        return (this.flags & 1) > 0
    }
    get isSkipped() {
        return (this.flags & 2) > 0
    }
    get isError() {
        return (this.flags & 4) > 0
    }
    get isAnonymous() {
        return (this.flags & 8) > 0
    }
    is(e) {
        if (typeof e == "string") {
            if (this.name == e) return !0;
            let t = this.prop(b.group);
            return t ? t.indexOf(e) > -1 : !1
        }
        return this.id == e
    }
    static match(e) {
        let t = Object.create(null);
        for (let n in e)
            for (let r of n.split(" ")) t[r] = e[n];
        return n => {
            for (let r = n.prop(b.group), s = -1; s < (r ? r.length : 0); s++) {
                let l = t[s < 0 ? n.name : r[s]];
                if (l) return l
            }
        }
    }
}
z.none = new z("", Object.create(null), 0, 8);
class Ye {
    constructor(e) {
        this.types = e;
        for (let t = 0; t < e.length; t++)
            if (e[t].id != t) throw new RangeError("Node type ids should correspond to array positions when creating a node set")
    }
    extend(...e) {
        let t = [];
        for (let n of this.types) {
            let r = null;
            for (let s of e) {
                let l = s(n);
                if (l) {
                    r || (r = Object.assign({}, n.props));
                    let o = l[1],
                        a = l[0];
                    a.combine && a.id in r && (o = a.combine(r[a.id], o)), r[a.id] = o
                }
            }
            t.push(r ? new z(n.name, r, n.id, n.flags) : n)
        }
        return new Ye(t)
    }
}
const Ae = new WeakMap,
    ft = new WeakMap;
var v;
(function(i) {
    i[i.ExcludeBuffers = 1] = "ExcludeBuffers", i[i.IncludeAnonymous = 2] = "IncludeAnonymous", i[i.IgnoreMounts = 4] = "IgnoreMounts", i[i.IgnoreOverlays = 8] = "IgnoreOverlays", i[i.EnterBracketed = 16] = "EnterBracketed"
})(v || (v = {}));
class S {
    constructor(e, t, n, r, s) {
        if (this.type = e, this.children = t, this.positions = n, this.length = r, this.props = null, s && s.length) {
            this.props = Object.create(null);
            for (let [l, o] of s) this.props[typeof l == "number" ? l : l.id] = o
        }
    }
    toString() {
        let e = ue.get(this);
        if (e && !e.overlay) return e.tree.toString();
        let t = "";
        for (let n of this.children) {
            let r = n.toString();
            r && (t && (t += ","), t += r)
        }
        return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (t.length ? "(" + t + ")" : "") : t
    }
    cursor(e = 0) {
        return new Me(this.topNode, e)
    }
    cursorAt(e, t = 0, n = 0) {
        let r = Ae.get(this) || this.topNode,
            s = new Me(r);
        return s.moveTo(e, t), Ae.set(this, s._tree), s
    }
    get topNode() {
        return new F(this, 0, 0, null)
    }
    resolve(e, t = 0) {
        let n = be(Ae.get(this) || this.topNode, e, t, !1);
        return Ae.set(this, n), n
    }
    resolveInner(e, t = 0) {
        let n = be(ft.get(this) || this.topNode, e, t, !0);
        return ft.set(this, n), n
    }
    resolveStack(e, t = 0) {
        return xn(this, e, t)
    }
    iterate(e) {
        let {
            enter: t,
            leave: n,
            from: r = 0,
            to: s = this.length
        } = e, l = e.mode || 0, o = (l & v.IncludeAnonymous) > 0;
        for (let a = this.cursor(l | v.IncludeAnonymous);;) {
            let h = !1;
            if (a.from <= s && a.to >= r && (!o && a.type.isAnonymous || t(a) !== !1)) {
                if (a.firstChild()) continue;
                h = !0
            }
            for (; h && n && (o || !a.type.isAnonymous) && n(a), !a.nextSibling();) {
                if (!a.parent()) return;
                h = !0
            }
        }
    }
    prop(e) {
        return e.perNode ? this.props ? this.props[e.id] : void 0 : this.type.prop(e)
    }
    get propValues() {
        let e = [];
        if (this.props)
            for (let t in this.props) e.push([+t, this.props[t]]);
        return e
    }
    balance(e = {}) {
        return this.children.length <= 8 ? this : tt(z.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, n, r) => new S(this.type, t, n, r, this.propValues), e.makeTree || ((t, n, r) => new S(z.none, t, n, r)))
    }
    static build(e) {
        return vn(e)
    }
}
S.empty = new S(z.none, [], [], 0);
class Ze {
    constructor(e, t) {
        this.buffer = e, this.index = t
    }
    get id() {
        return this.buffer[this.index - 4]
    }
    get start() {
        return this.buffer[this.index - 3]
    }
    get end() {
        return this.buffer[this.index - 2]
    }
    get size() {
        return this.buffer[this.index - 1]
    }
    get pos() {
        return this.index
    }
    next() {
        this.index -= 4
    }
    fork() {
        return new Ze(this.buffer, this.index)
    }
}
class re {
    constructor(e, t, n) {
        this.buffer = e, this.length = t, this.set = n
    }
    get type() {
        return z.none
    }
    toString() {
        let e = [];
        for (let t = 0; t < this.buffer.length;) e.push(this.childString(t)), t = this.buffer[t + 3];
        return e.join(",")
    }
    childString(e) {
        let t = this.buffer[e],
            n = this.buffer[e + 3],
            r = this.set.types[t],
            s = r.name;
        if (/\W/.test(s) && !r.isError && (s = JSON.stringify(s)), e += 4, n == e) return s;
        let l = [];
        for (; e < n;) l.push(this.childString(e)), e = this.buffer[e + 3];
        return s + "(" + l.join(",") + ")"
    }
    findChild(e, t, n, r, s) {
        let {
            buffer: l
        } = this, o = -1;
        for (let a = e; a != t && !(Ot(s, r, l[a + 1], l[a + 2]) && (o = a, n > 0)); a = l[a + 3]);
        return o
    }
    slice(e, t, n) {
        let r = this.buffer,
            s = new Uint16Array(t - e),
            l = 0;
        for (let o = e, a = 0; o < t;) {
            s[a++] = r[o++], s[a++] = r[o++] - n;
            let h = s[a++] = r[o++] - n;
            s[a++] = r[o++] - e, l = Math.max(l, h)
        }
        return new re(s, l, this.set)
    }
}

function Ot(i, e, t, n) {
    switch (i) {
        case -2:
            return t < e;
        case -1:
            return n >= e && t < e;
        case 0:
            return t < e && n > e;
        case 1:
            return t <= e && n > e;
        case 2:
            return n > e;
        case 4:
            return !0
    }
}

function be(i, e, t, n) {
    for (var r; i.from == i.to || (t < 1 ? i.from >= e : i.from > e) || (t > -1 ? i.to <= e : i.to < e);) {
        let l = !n && i instanceof F && i.index < 0 ? null : i.parent;
        if (!l) return i;
        i = l
    }
    let s = n ? 0 : v.IgnoreOverlays;
    if (n)
        for (let l = i, o = l.parent; o; l = o, o = l.parent) l instanceof F && l.index < 0 && ((r = o.enter(e, t, s)) === null || r === void 0 ? void 0 : r.from) != l.from && (i = o);
    for (;;) {
        let l = i.enter(e, t, s);
        if (!l) return i;
        i = l
    }
}
class Et {
    cursor(e = 0) {
        return new Me(this, e)
    }
    getChild(e, t = null, n = null) {
        let r = ut(this, e, t, n);
        return r.length ? r[0] : null
    }
    getChildren(e, t = null, n = null) {
        return ut(this, e, t, n)
    }
    resolve(e, t = 0) {
        return be(this, e, t, !1)
    }
    resolveInner(e, t = 0) {
        return be(this, e, t, !0)
    }
    matchContext(e) {
        return He(this.parent, e)
    }
    enterUnfinishedNodesBefore(e) {
        let t = this.childBefore(e),
            n = this;
        for (; t;) {
            let r = t.lastChild;
            if (!r || r.to != t.to) break;
            r.type.isError && r.from == r.to ? (n = t, t = r.prevSibling) : t = r
        }
        return n
    }
    get node() {
        return this
    }
    get next() {
        return this.parent
    }
}
class F extends Et {
    constructor(e, t, n, r) {
        super(), this._tree = e, this.from = t, this.index = n, this._parent = r
    }
    get type() {
        return this._tree.type
    }
    get name() {
        return this._tree.type.name
    }
    get to() {
        return this.from + this._tree.length
    }
    nextChild(e, t, n, r, s = 0) {
        var l;
        for (let o = this;;) {
            for (let {
                    children: a,
                    positions: h
                } = o._tree, f = t > 0 ? a.length : -1; e != f; e += t) {
                let u = a[e],
                    d = h[e] + o.from;
                if (!(!(s & v.EnterBracketed && u instanceof S && ((l = ue.get(u)) === null || l === void 0 ? void 0 : l.overlay) === null && (d >= n || d + u.length <= n)) && !Ot(r, n, d, d + u.length))) {
                    if (u instanceof re) {
                        if (s & v.ExcludeBuffers) continue;
                        let p = u.findChild(0, u.buffer.length, t, n - d, r);
                        if (p > -1) return new J(new yn(o, u, e, d), null, p)
                    } else if (s & v.IncludeAnonymous || !u.type.isAnonymous || et(u)) {
                        let p;
                        if (!(s & v.IgnoreMounts) && (p = ue.get(u)) && !p.overlay) return new F(p.tree, d, e, o);
                        let y = new F(u, d, e, o);
                        return s & v.IncludeAnonymous || !y.type.isAnonymous ? y : y.nextChild(t < 0 ? u.children.length - 1 : 0, t, n, r, s)
                    }
                }
            }
            if (s & v.IncludeAnonymous || !o.type.isAnonymous || (o.index >= 0 ? e = o.index + t : e = t < 0 ? -1 : o._parent._tree.children.length, o = o._parent, !o)) return null
        }
    }
    get firstChild() {
        return this.nextChild(0, 1, 0, 4)
    }
    get lastChild() {
        return this.nextChild(this._tree.children.length - 1, -1, 0, 4)
    }
    childAfter(e) {
        return this.nextChild(0, 1, e, 2)
    }
    childBefore(e) {
        return this.nextChild(this._tree.children.length - 1, -1, e, -2)
    }
    prop(e) {
        return this._tree.prop(e)
    }
    enter(e, t, n = 0) {
        let r;
        if (!(n & v.IgnoreOverlays) && (r = ue.get(this._tree)) && r.overlay) {
            let s = e - this.from,
                l = n & v.EnterBracketed && r.bracketed;
            for (let {
                    from: o,
                    to: a
                } of r.overlay)
                if ((t > 0 || l ? o <= s : o < s) && (t < 0 || l ? a >= s : a > s)) return new F(r.tree, r.overlay[0].from + this.from, -1, this)
        }
        return this.nextChild(0, 1, e, t, n)
    }
    nextSignificantParent() {
        let e = this;
        for (; e.type.isAnonymous && e._parent;) e = e._parent;
        return e
    }
    get parent() {
        return this._parent ? this._parent.nextSignificantParent() : null
    }
    get nextSibling() {
        return this._parent && this.index >= 0 ? this._parent.nextChild(this.index + 1, 1, 0, 4) : null
    }
    get prevSibling() {
        return this._parent && this.index >= 0 ? this._parent.nextChild(this.index - 1, -1, 0, 4) : null
    }
    get tree() {
        return this._tree
    }
    toTree() {
        return this._tree
    }
    toString() {
        return this._tree.toString()
    }
}

function ut(i, e, t, n) {
    let r = i.cursor(),
        s = [];
    if (!r.firstChild()) return s;
    if (t != null) {
        for (let l = !1; !l;)
            if (l = r.type.is(t), !r.nextSibling()) return s
    }
    for (;;) {
        if (n != null && r.type.is(n)) return s;
        if (r.type.is(e) && s.push(r.node), !r.nextSibling()) return n == null ? s : []
    }
}

function He(i, e, t = e.length - 1) {
    for (let n = i; t >= 0; n = n.parent) {
        if (!n) return !1;
        if (!n.type.isAnonymous) {
            if (e[t] && e[t] != n.name) return !1;
            t--
        }
    }
    return !0
}
class yn {
    constructor(e, t, n, r) {
        this.parent = e, this.buffer = t, this.index = n, this.start = r
    }
}
class J extends Et {
    get name() {
        return this.type.name
    }
    get from() {
        return this.context.start + this.context.buffer.buffer[this.index + 1]
    }
    get to() {
        return this.context.start + this.context.buffer.buffer[this.index + 2]
    }
    constructor(e, t, n) {
        super(), this.context = e, this._parent = t, this.index = n, this.type = e.buffer.set.types[e.buffer.buffer[n]]
    }
    child(e, t, n) {
        let {
            buffer: r
        } = this.context, s = r.findChild(this.index + 4, r.buffer[this.index + 3], e, t - this.context.start, n);
        return s < 0 ? null : new J(this.context, this, s)
    }
    get firstChild() {
        return this.child(1, 0, 4)
    }
    get lastChild() {
        return this.child(-1, 0, 4)
    }
    childAfter(e) {
        return this.child(1, e, 2)
    }
    childBefore(e) {
        return this.child(-1, e, -2)
    }
    prop(e) {
        return this.type.prop(e)
    }
    enter(e, t, n = 0) {
        if (n & v.ExcludeBuffers) return null;
        let {
            buffer: r
        } = this.context, s = r.findChild(this.index + 4, r.buffer[this.index + 3], t > 0 ? 1 : -1, e - this.context.start, t);
        return s < 0 ? null : new J(this.context, this, s)
    }
    get parent() {
        return this._parent || this.context.parent.nextSignificantParent()
    }
    externalSibling(e) {
        return this._parent ? null : this.context.parent.nextChild(this.context.index + e, e, 0, 4)
    }
    get nextSibling() {
        let {
            buffer: e
        } = this.context, t = e.buffer[this.index + 3];
        return t < (this._parent ? e.buffer[this._parent.index + 3] : e.buffer.length) ? new J(this.context, this._parent, t) : this.externalSibling(1)
    }
    get prevSibling() {
        let {
            buffer: e
        } = this.context, t = this._parent ? this._parent.index + 4 : 0;
        return this.index == t ? this.externalSibling(-1) : new J(this.context, this._parent, e.findChild(t, this.index, -1, 0, 4))
    }
    get tree() {
        return null
    }
    toTree() {
        let e = [],
            t = [],
            {
                buffer: n
            } = this.context,
            r = this.index + 4,
            s = n.buffer[this.index + 3];
        if (s > r) {
            let l = n.buffer[this.index + 1];
            e.push(n.slice(r, s, l)), t.push(0)
        }
        return new S(this.type, e, t, this.to - this.from)
    }
    toString() {
        return this.context.buffer.childString(this.index)
    }
}

function Dt(i) {
    if (!i.length) return null;
    let e = 0,
        t = i[0];
    for (let s = 1; s < i.length; s++) {
        let l = i[s];
        (l.from > t.from || l.to < t.to) && (t = l, e = s)
    }
    let n = t instanceof F && t.index < 0 ? null : t.parent,
        r = i.slice();
    return n ? r[e] = n : r.splice(e, 1), new wn(r, t)
}
class wn {
    constructor(e, t) {
        this.heads = e, this.node = t
    }
    get next() {
        return Dt(this.heads)
    }
}

function xn(i, e, t) {
    let n = i.resolveInner(e, t),
        r = null;
    for (let s = n instanceof F ? n : n.context.parent; s; s = s.parent)
        if (s.index < 0) {
            let l = s.parent;
            (r || (r = [n])).push(l.resolve(e, t)), s = l
        } else {
            let l = ue.get(s.tree);
            if (l && l.overlay && l.overlay[0].from <= e && l.overlay[l.overlay.length - 1].to >= e) {
                let o = new F(l.tree, l.overlay[0].from + s.from, -1, s);
                (r || (r = [n])).push(be(o, e, t, !1))
            }
        }
    return r ? Dt(r) : n
}
class Me {
    get name() {
        return this.type.name
    }
    constructor(e, t = 0) {
        if (this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, this.mode = t & ~v.EnterBracketed, e instanceof F) this.yieldNode(e);
        else {
            this._tree = e.context.parent, this.buffer = e.context;
            for (let n = e._parent; n; n = n._parent) this.stack.unshift(n.index);
            this.bufferNode = e, this.yieldBuf(e.index)
        }
    }
    yieldNode(e) {
        return e ? (this._tree = e, this.type = e.type, this.from = e.from, this.to = e.to, !0) : !1
    }
    yieldBuf(e, t) {
        this.index = e;
        let {
            start: n,
            buffer: r
        } = this.buffer;
        return this.type = t || r.set.types[r.buffer[e]], this.from = n + r.buffer[e + 1], this.to = n + r.buffer[e + 2], !0
    }
    yield(e) {
        return e ? e instanceof F ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : !1
    }
    toString() {
        return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString()
    }
    enterChild(e, t, n) {
        if (!this.buffer) return this.yield(this._tree.nextChild(e < 0 ? this._tree._tree.children.length - 1 : 0, e, t, n, this.mode));
        let {
            buffer: r
        } = this.buffer, s = r.findChild(this.index + 4, r.buffer[this.index + 3], e, t - this.buffer.start, n);
        return s < 0 ? !1 : (this.stack.push(this.index), this.yieldBuf(s))
    }
    firstChild() {
        return this.enterChild(1, 0, 4)
    }
    lastChild() {
        return this.enterChild(-1, 0, 4)
    }
    childAfter(e) {
        return this.enterChild(1, e, 2)
    }
    childBefore(e) {
        return this.enterChild(-1, e, -2)
    }
    enter(e, t, n = this.mode) {
        return this.buffer ? n & v.ExcludeBuffers ? !1 : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, n))
    }
    parent() {
        if (!this.buffer) return this.yieldNode(this.mode & v.IncludeAnonymous ? this._tree._parent : this._tree.parent);
        if (this.stack.length) return this.yieldBuf(this.stack.pop());
        let e = this.mode & v.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
        return this.buffer = null, this.yieldNode(e)
    }
    sibling(e) {
        if (!this.buffer) return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + e, e, 0, 4, this.mode)) : !1;
        let {
            buffer: t
        } = this.buffer, n = this.stack.length - 1;
        if (e < 0) {
            let r = n < 0 ? 0 : this.stack[n] + 4;
            if (this.index != r) return this.yieldBuf(t.findChild(r, this.index, -1, 0, 4))
        } else {
            let r = t.buffer[this.index + 3];
            if (r < (n < 0 ? t.buffer.length : t.buffer[this.stack[n] + 3])) return this.yieldBuf(r)
        }
        return n < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + e, e, 0, 4, this.mode)) : !1
    }
    nextSibling() {
        return this.sibling(1)
    }
    prevSibling() {
        return this.sibling(-1)
    }
    atLastNode(e) {
        let t, n, {
            buffer: r
        } = this;
        if (r) {
            if (e > 0) {
                if (this.index < r.buffer.buffer.length) return !1
            } else
                for (let s = 0; s < this.index; s++)
                    if (r.buffer.buffer[s + 3] < this.index) return !1;
            ({
                index: t,
                parent: n
            } = r)
        } else({
            index: t,
            _parent: n
        } = this._tree);
        for (; n; {
                index: t,
                _parent: n
            } = n)
            if (t > -1)
                for (let s = t + e, l = e < 0 ? -1 : n._tree.children.length; s != l; s += e) {
                    let o = n._tree.children[s];
                    if (this.mode & v.IncludeAnonymous || o instanceof re || !o.type.isAnonymous || et(o)) return !1
                }
        return !0
    }
    move(e, t) {
        if (t && this.enterChild(e, 0, 4)) return !0;
        for (;;) {
            if (this.sibling(e)) return !0;
            if (this.atLastNode(e) || !this.parent()) return !1
        }
    }
    next(e = !0) {
        return this.move(1, e)
    }
    prev(e = !0) {
        return this.move(-1, e)
    }
    moveTo(e, t = 0) {
        for (;
            (this.from == this.to || (t < 1 ? this.from >= e : this.from > e) || (t > -1 ? this.to <= e : this.to < e)) && this.parent(););
        for (; this.enterChild(1, e, t););
        return this
    }
    get node() {
        if (!this.buffer) return this._tree;
        let e = this.bufferNode,
            t = null,
            n = 0;
        if (e && e.context == this.buffer) e: for (let r = this.index, s = this.stack.length; s >= 0;) {
            for (let l = e; l; l = l._parent)
                if (l.index == r) {
                    if (r == this.index) return l;
                    t = l, n = s + 1;
                    break e
                }
            r = this.stack[--s]
        }
        for (let r = n; r < this.stack.length; r++) t = new J(this.buffer, t, this.stack[r]);
        return this.bufferNode = new J(this.buffer, t, this.index)
    }
    get tree() {
        return this.buffer ? null : this._tree._tree
    }
    iterate(e, t) {
        for (let n = 0;;) {
            let r = !1;
            if (this.type.isAnonymous || e(this) !== !1) {
                if (this.firstChild()) {
                    n++;
                    continue
                }
                this.type.isAnonymous || (r = !0)
            }
            for (;;) {
                if (r && t && t(this), r = this.type.isAnonymous, !n) return;
                if (this.nextSibling()) break;
                this.parent(), n--, r = !0
            }
        }
    }
    matchContext(e) {
        if (!this.buffer) return He(this.node.parent, e);
        let {
            buffer: t
        } = this.buffer, {
            types: n
        } = t.set;
        for (let r = e.length - 1, s = this.stack.length - 1; r >= 0; s--) {
            if (s < 0) return He(this._tree, e, r);
            let l = n[t.buffer[this.stack[s]]];
            if (!l.isAnonymous) {
                if (e[r] && e[r] != l.name) return !1;
                r--
            }
        }
        return !0
    }
}

function et(i) {
    return i.children.some(e => e instanceof re || !e.type.isAnonymous || et(e))
}

function vn(i) {
    var e;
    let {
        buffer: t,
        nodeSet: n,
        maxBufferLength: r = mn,
        reused: s = [],
        minRepeatType: l = n.types.length
    } = i, o = Array.isArray(t) ? new Ze(t, t.length) : t, a = n.types, h = 0, f = 0;

    function u(x, N, g, B, C, M) {
        let {
            id: w,
            start: m,
            end: T,
            size: I
        } = o, _ = f, ee = h;
        if (I < 0)
            if (o.next(), I == -1) {
                let Q = s[w];
                g.push(Q), B.push(m - x);
                return
            } else if (I == -3) {
            h = w;
            return
        } else if (I == -4) {
            f = w;
            return
        } else throw new RangeError(`Unrecognized record size: ${I}`);
        let pe = a[w],
            ve, se, lt = m - x;
        if (T - m <= r && (se = E(o.pos - N, C))) {
            let Q = new Uint16Array(se.size - se.skip),
                L = o.pos - se.size,
                V = Q.length;
            for (; o.pos > L;) V = O(se.start, Q, V);
            ve = new re(Q, T - se.start, n), lt = se.start - x
        } else {
            let Q = o.pos - I;
            o.next();
            let L = [],
                V = [],
                le = w >= l ? w : -1,
                fe = 0,
                Se = T;
            for (; o.pos > Q;) le >= 0 && o.id == le && o.size >= 0 ? (o.end <= Se - r && (y(L, V, m, fe, o.end, Se, le, _, ee), fe = L.length, Se = o.end), o.next()) : M > 2500 ? d(m, Q, L, V) : u(m, Q, L, V, le, M + 1);
            if (le >= 0 && fe > 0 && fe < L.length && y(L, V, m, fe, m, Se, le, _, ee), L.reverse(), V.reverse(), le > -1 && fe > 0) {
                let ot = p(pe, ee);
                ve = tt(pe, L, V, 0, L.length, 0, T - m, ot, ot)
            } else ve = A(pe, L, V, T - m, _ - T, ee)
        }
        g.push(ve), B.push(lt)
    }

    function d(x, N, g, B) {
        let C = [],
            M = 0,
            w = -1;
        for (; o.pos > N;) {
            let {
                id: m,
                start: T,
                end: I,
                size: _
            } = o;
            if (_ > 4) o.next();
            else {
                if (w > -1 && T < w) break;
                w < 0 && (w = I - r), C.push(m, T, I), M++, o.next()
            }
        }
        if (M) {
            let m = new Uint16Array(M * 4),
                T = C[C.length - 2];
            for (let I = C.length - 3, _ = 0; I >= 0; I -= 3) m[_++] = C[I], m[_++] = C[I + 1] - T, m[_++] = C[I + 2] - T, m[_++] = _;
            g.push(new re(m, C[2] - T, n)), B.push(T - x)
        }
    }

    function p(x, N) {
        return (g, B, C) => {
            let M = 0,
                w = g.length - 1,
                m, T;
            if (w >= 0 && (m = g[w]) instanceof S) {
                if (!w && m.type == x && m.length == C) return m;
                (T = m.prop(b.lookAhead)) && (M = B[w] + m.length + T)
            }
            return A(x, g, B, C, M, N)
        }
    }

    function y(x, N, g, B, C, M, w, m, T) {
        let I = [],
            _ = [];
        for (; x.length > B;) I.push(x.pop()), _.push(N.pop() + g - C);
        x.push(A(n.types[w], I, _, M - C, m - M, T)), N.push(C - g)
    }

    function A(x, N, g, B, C, M, w) {
        if (M) {
            let m = [b.contextHash, M];
            w = w ? [m].concat(w) : [m]
        }
        if (C > 25) {
            let m = [b.lookAhead, C];
            w = w ? [m].concat(w) : [m]
        }
        return new S(x, N, g, B, w)
    }

    function E(x, N) {
        let g = o.fork(),
            B = 0,
            C = 0,
            M = 0,
            w = g.end - r,
            m = {
                size: 0,
                start: 0,
                skip: 0
            };
        e: for (let T = g.pos - x; g.pos > T;) {
            let I = g.size;
            if (g.id == N && I >= 0) {
                m.size = B, m.start = C, m.skip = M, M += 4, B += 4, g.next();
                continue
            }
            let _ = g.pos - I;
            if (I < 0 || _ < T || g.start < w) break;
            let ee = g.id >= l ? 4 : 0,
                pe = g.start;
            for (g.next(); g.pos > _;) {
                if (g.size < 0)
                    if (g.size == -3 || g.size == -4) ee += 4;
                    else break e;
                else g.id >= l && (ee += 4);
                g.next()
            }
            C = pe, B += I, M += ee
        }
        return (N < 0 || B == x) && (m.size = B, m.start = C, m.skip = M), m.size > 4 ? m : void 0
    }

    function O(x, N, g) {
        let {
            id: B,
            start: C,
            end: M,
            size: w
        } = o;
        if (o.next(), w >= 0 && B < l) {
            let m = g;
            if (w > 4) {
                let T = o.pos - (w - 4);
                for (; o.pos > T;) g = O(x, N, g)
            }
            N[--g] = m, N[--g] = M - x, N[--g] = C - x, N[--g] = B
        } else w == -3 ? h = B : w == -4 && (f = B);
        return g
    }
    let D = [],
        P = [];
    for (; o.pos > 0;) u(i.start || 0, i.bufferStart || 0, D, P, -1, 0);
    let R = (e = i.length) !== null && e !== void 0 ? e : D.length ? P[0] + D[0].length : 0;
    return new S(a[i.topID], D.reverse(), P.reverse(), R)
}
const ct = new WeakMap;

function Ie(i, e) {
    if (!i.isAnonymous || e instanceof re || e.type != i) return 1;
    let t = ct.get(e);
    if (t == null) {
        t = 1;
        for (let n of e.children) {
            if (n.type != i || !(n instanceof S)) {
                t = 1;
                break
            }
            t += Ie(i, n)
        }
        ct.set(e, t)
    }
    return t
}

function tt(i, e, t, n, r, s, l, o, a) {
    let h = 0;
    for (let y = n; y < r; y++) h += Ie(i, e[y]);
    let f = Math.ceil(h * 1.5 / 8),
        u = [],
        d = [];

    function p(y, A, E, O, D) {
        for (let P = E; P < O;) {
            let R = P,
                x = A[P],
                N = Ie(i, y[P]);
            for (P++; P < O; P++) {
                let g = Ie(i, y[P]);
                if (N + g >= f) break;
                N += g
            }
            if (P == R + 1) {
                if (N > f) {
                    let g = y[R];
                    p(g.children, g.positions, 0, g.children.length, A[R] + D);
                    continue
                }
                u.push(y[R])
            } else {
                let g = A[P - 1] + y[P - 1].length - x;
                u.push(tt(i, y, A, R, P, x, g, null, a))
            }
            d.push(x + D - s)
        }
    }
    return p(e, t, n, r, 0), (o || a)(u, d, l)
}
class Br {
    constructor() {
        this.map = new WeakMap
    }
    setBuffer(e, t, n) {
        let r = this.map.get(e);
        r || this.map.set(e, r = new Map), r.set(t, n)
    }
    getBuffer(e, t) {
        let n = this.map.get(e);
        return n && n.get(t)
    }
    set(e, t) {
        e instanceof J ? this.setBuffer(e.context.buffer, e.index, t) : e instanceof F && this.map.set(e.tree, t)
    }
    get(e) {
        return e instanceof J ? this.getBuffer(e.context.buffer, e.index) : e instanceof F ? this.map.get(e.tree) : void 0
    }
    cursorSet(e, t) {
        e.buffer ? this.setBuffer(e.buffer.buffer, e.index, t) : this.map.set(e.tree, t)
    }
    cursorGet(e) {
        return e.buffer ? this.getBuffer(e.buffer.buffer, e.index) : this.map.get(e.tree)
    }
}
class Y {
    constructor(e, t, n, r, s = !1, l = !1) {
        this.from = e, this.to = t, this.tree = n, this.offset = r, this.open = (s ? 1 : 0) | (l ? 2 : 0)
    }
    get openStart() {
        return (this.open & 1) > 0
    }
    get openEnd() {
        return (this.open & 2) > 0
    }
    static addTree(e, t = [], n = !1) {
        let r = [new Y(0, e.length, e, 0, !1, n)];
        for (let s of t) s.to > e.length && r.push(s);
        return r
    }
    static applyChanges(e, t, n = 128) {
        if (!t.length) return e;
        let r = [],
            s = 1,
            l = e.length ? e[0] : null;
        for (let o = 0, a = 0, h = 0;; o++) {
            let f = o < t.length ? t[o] : null,
                u = f ? f.fromA : 1e9;
            if (u - a >= n)
                for (; l && l.from < u;) {
                    let d = l;
                    if (a >= d.from || u <= d.to || h) {
                        let p = Math.max(d.from, a) - h,
                            y = Math.min(d.to, u) - h;
                        d = p >= y ? null : new Y(p, y, d.tree, d.offset + h, o > 0, !!f)
                    }
                    if (d && r.push(d), l.to > u) break;
                    l = s < e.length ? e[s++] : null
                }
            if (!f) break;
            a = f.toA, h = f.toA - f.toB
        }
        return r
    }
}
class _t {
    startParse(e, t, n) {
        return typeof e == "string" && (e = new Sn(e)), n = n ? n.length ? n.map(r => new W(r.from, r.to)) : [new W(0, 0)] : [new W(0, e.length)], this.createParse(e, t || [], n)
    }
    parse(e, t, n) {
        let r = this.startParse(e, t, n);
        for (;;) {
            let s = r.advance();
            if (s) return s
        }
    }
}
class Sn {
    constructor(e) {
        this.string = e
    }
    get length() {
        return this.string.length
    }
    chunk(e) {
        return this.string.slice(e)
    }
    get lineChunks() {
        return !1
    }
    read(e, t) {
        return this.string.slice(e, t)
    }
}

function Mr(i) {
    return (e, t, n, r) => new Cn(e, i, t, n, r)
}
class dt {
    constructor(e, t, n, r, s, l) {
        this.parser = e, this.parse = t, this.overlay = n, this.bracketed = r, this.target = s, this.from = l
    }
}

function pt(i) {
    if (!i.length || i.some(e => e.from >= e.to)) throw new RangeError("Invalid inner parse ranges given: " + JSON.stringify(i))
}
class An {
    constructor(e, t, n, r, s, l, o, a) {
        this.parser = e, this.predicate = t, this.mounts = n, this.index = r, this.start = s, this.bracketed = l, this.target = o, this.prev = a, this.depth = 0, this.ranges = []
    }
}
const Ve = new b({
    perNode: !0
});
class Cn {
    constructor(e, t, n, r, s) {
        this.nest = t, this.input = n, this.fragments = r, this.ranges = s, this.inner = [], this.innerDone = 0, this.baseTree = null, this.stoppedAt = null, this.baseParse = e
    }
    advance() {
        if (this.baseParse) {
            let n = this.baseParse.advance();
            if (!n) return null;
            if (this.baseParse = null, this.baseTree = n, this.startInner(), this.stoppedAt != null)
                for (let r of this.inner) r.parse.stopAt(this.stoppedAt)
        }
        if (this.innerDone == this.inner.length) {
            let n = this.baseTree;
            return this.stoppedAt != null && (n = new S(n.type, n.children, n.positions, n.length, n.propValues.concat([
                [Ve, this.stoppedAt]
            ]))), n
        }
        let e = this.inner[this.innerDone],
            t = e.parse.advance();
        if (t) {
            this.innerDone++;
            let n = Object.assign(Object.create(null), e.target.props);
            n[b.mounted.id] = new ue(t, e.overlay, e.parser, e.bracketed), e.target.props = n
        }
        return null
    }
    get parsedPos() {
        if (this.baseParse) return 0;
        let e = this.input.length;
        for (let t = this.innerDone; t < this.inner.length; t++) this.inner[t].from < e && (e = Math.min(e, this.inner[t].parse.parsedPos));
        return e
    }
    stopAt(e) {
        if (this.stoppedAt = e, this.baseParse) this.baseParse.stopAt(e);
        else
            for (let t = this.innerDone; t < this.inner.length; t++) this.inner[t].parse.stopAt(e)
    }
    startInner() {
        let e = new Nn(this.fragments),
            t = null,
            n = null,
            r = new Me(new F(this.baseTree, this.ranges[0].from, 0, null), v.IncludeAnonymous | v.IgnoreMounts);
        e: for (let s, l;;) {
            let o = !0,
                a;
            if (this.stoppedAt != null && r.from >= this.stoppedAt) o = !1;
            else if (e.hasNode(r)) {
                if (t) {
                    let h = t.mounts.find(f => f.frag.from <= r.from && f.frag.to >= r.to && f.mount.overlay);
                    if (h)
                        for (let f of h.mount.overlay) {
                            let u = f.from + h.pos,
                                d = f.to + h.pos;
                            u >= r.from && d <= r.to && !t.ranges.some(p => p.from < d && p.to > u) && t.ranges.push({
                                from: u,
                                to: d
                            })
                        }
                }
                o = !1
            } else if (n && (l = Pn(n.ranges, r.from, r.to))) o = l != 2;
            else if (!r.type.isAnonymous && (s = this.nest(r, this.input)) && (r.from < r.to || !s.overlay)) {
                r.tree || (Tn(r), t && t.depth++, n && n.depth++);
                let h = e.findMounts(r.from, s.parser);
                if (typeof s.overlay == "function") t = new An(s.parser, s.overlay, h, this.inner.length, r.from, !!s.bracketed, r.tree, t);
                else {
                    let f = kt(this.ranges, s.overlay || (r.from < r.to ? [new W(r.from, r.to)] : []));
                    f.length && pt(f), (f.length || !s.overlay) && this.inner.push(new dt(s.parser, f.length ? s.parser.startParse(this.input, bt(h, f), f) : s.parser.startParse(""), s.overlay ? s.overlay.map(u => new W(u.from - r.from, u.to - r.from)) : null, !!s.bracketed, r.tree, f.length ? f[0].from : r.from)), s.overlay ? f.length && (n = {
                        ranges: f,
                        depth: 0,
                        prev: n
                    }) : o = !1
                }
            } else if (t && (a = t.predicate(r)) && (a === !0 && (a = new W(r.from, r.to)), a.from < a.to)) {
                let h = t.ranges.length - 1;
                h >= 0 && t.ranges[h].to == a.from ? t.ranges[h] = {
                    from: t.ranges[h].from,
                    to: a.to
                } : t.ranges.push(a)
            }
            if (o && r.firstChild()) t && t.depth++, n && n.depth++;
            else
                for (; !r.nextSibling();) {
                    if (!r.parent()) break e;
                    if (t && !--t.depth) {
                        let h = kt(this.ranges, t.ranges);
                        h.length && (pt(h), this.inner.splice(t.index, 0, new dt(t.parser, t.parser.startParse(this.input, bt(t.mounts, h), h), t.ranges.map(f => new W(f.from - t.start, f.to - t.start)), t.bracketed, t.target, h[0].from))), t = t.prev
                    }
                    n && !--n.depth && (n = n.prev)
                }
        }
    }
}

function Pn(i, e, t) {
    for (let n of i) {
        if (n.from >= t) break;
        if (n.to > e) return n.from <= e && n.to >= t ? 2 : 1
    }
    return 0
}

function gt(i, e, t, n, r, s) {
    if (e < t) {
        let l = i.buffer[e + 1];
        n.push(i.slice(e, t, l)), r.push(l - s)
    }
}

function Tn(i) {
    let {
        node: e
    } = i, t = [], n = e.context.buffer;
    do t.push(i.index), i.parent(); while (!i.tree);
    let r = i.tree,
        s = r.children.indexOf(n),
        l = r.children[s],
        o = l.buffer,
        a = [s];

    function h(f, u, d, p, y, A) {
        let E = t[A],
            O = [],
            D = [];
        gt(l, f, E, O, D, p);
        let P = o[E + 1],
            R = o[E + 2];
        a.push(O.length);
        let x = A ? h(E + 4, o[E + 3], l.set.types[o[E]], P, R - P, A - 1) : e.toTree();
        return O.push(x), D.push(P - p), gt(l, o[E + 3], u, O, D, p), new S(d, O, D, y)
    }
    r.children[s] = h(0, o.length, z.none, 0, l.length, t.length - 1);
    for (let f of a) {
        let u = i.tree.children[f],
            d = i.tree.positions[f];
        i.yield(new F(u, d + i.from, f, i._tree))
    }
}
class mt {
    constructor(e, t) {
        this.offset = t, this.done = !1, this.cursor = e.cursor(v.IncludeAnonymous | v.IgnoreMounts)
    }
    moveTo(e) {
        let {
            cursor: t
        } = this, n = e - this.offset;
        for (; !this.done && t.from < n;) t.to >= e && t.enter(n, 1, v.IgnoreOverlays | v.ExcludeBuffers) || t.next(!1) || (this.done = !0)
    }
    hasNode(e) {
        if (this.moveTo(e.from), !this.done && this.cursor.from + this.offset == e.from && this.cursor.tree)
            for (let t = this.cursor.tree;;) {
                if (t == e.tree) return !0;
                if (t.children.length && t.positions[0] == 0 && t.children[0] instanceof S) t = t.children[0];
                else break
            }
        return !1
    }
}
class Nn {
    constructor(e) {
        var t;
        if (this.fragments = e, this.curTo = 0, this.fragI = 0, e.length) {
            let n = this.curFrag = e[0];
            this.curTo = (t = n.tree.prop(Ve)) !== null && t !== void 0 ? t : n.to, this.inner = new mt(n.tree, -n.offset)
        } else this.curFrag = this.inner = null
    }
    hasNode(e) {
        for (; this.curFrag && e.from >= this.curTo;) this.nextFrag();
        return this.curFrag && this.curFrag.from <= e.from && this.curTo >= e.to && this.inner.hasNode(e)
    }
    nextFrag() {
        var e;
        if (this.fragI++, this.fragI == this.fragments.length) this.curFrag = this.inner = null;
        else {
            let t = this.curFrag = this.fragments[this.fragI];
            this.curTo = (e = t.tree.prop(Ve)) !== null && e !== void 0 ? e : t.to, this.inner = new mt(t.tree, -t.offset)
        }
    }
    findMounts(e, t) {
        var n;
        let r = [];
        if (this.inner) {
            this.inner.cursor.moveTo(e, 1);
            for (let s = this.inner.cursor.node; s; s = s.parent) {
                let l = (n = s.tree) === null || n === void 0 ? void 0 : n.prop(b.mounted);
                if (l && l.parser == t)
                    for (let o = this.fragI; o < this.fragments.length; o++) {
                        let a = this.fragments[o];
                        if (a.from >= s.to) break;
                        a.tree == this.curFrag.tree && r.push({
                            frag: a,
                            pos: s.from - a.offset,
                            mount: l
                        })
                    }
            }
        }
        return r
    }
}

function kt(i, e) {
    let t = null,
        n = e;
    for (let r = 1, s = 0; r < i.length; r++) {
        let l = i[r - 1].to,
            o = i[r].from;
        for (; s < n.length; s++) {
            let a = n[s];
            if (a.from >= o) break;
            a.to <= l || (t || (n = t = e.slice()), a.from < l ? (t[s] = new W(a.from, l), a.to > o && t.splice(s + 1, 0, new W(o, a.to))) : a.to > o ? t[s--] = new W(o, a.to) : t.splice(s--, 1))
        }
    }
    return n
}

function In(i, e, t, n) {
    let r = 0,
        s = 0,
        l = !1,
        o = !1,
        a = -1e9,
        h = [];
    for (;;) {
        let f = r == i.length ? 1e9 : l ? i[r].to : i[r].from,
            u = s == e.length ? 1e9 : o ? e[s].to : e[s].from;
        if (l != o) {
            let d = Math.max(a, t),
                p = Math.min(f, u, n);
            d < p && h.push(new W(d, p))
        }
        if (a = Math.min(f, u), a == 1e9) break;
        f == a && (l ? (l = !1, r++) : l = !0), u == a && (o ? (o = !1, s++) : o = !0)
    }
    return h
}

function bt(i, e) {
    let t = [];
    for (let {
            pos: n,
            mount: r,
            frag: s
        } of i) {
        let l = n + (r.overlay ? r.overlay[0].from : 0),
            o = l + r.tree.length,
            a = Math.max(s.from, l),
            h = Math.min(s.to, o);
        if (r.overlay) {
            let f = r.overlay.map(d => new W(d.from + n, d.to + n)),
                u = In(e, f, a, h);
            for (let d = 0, p = a;; d++) {
                let y = d == u.length,
                    A = y ? h : u[d].from;
                if (A > p && t.push(new Y(p, A, r.tree, -l, s.from >= p || s.openStart, s.to <= A || s.openEnd)), y) break;
                p = u[d].to
            }
        } else t.push(new Y(a, h, r.tree, -l, s.from >= l || s.openStart, s.to <= o || s.openEnd))
    }
    return t
}
let Bn = 0;
class j {
    constructor(e, t, n, r) {
        this.name = e, this.set = t, this.base = n, this.modified = r, this.id = Bn++
    }
    toString() {
        let {
            name: e
        } = this;
        for (let t of this.modified) t.name && (e = `${t.name}(${e})`);
        return e
    }
    static define(e, t) {
        let n = typeof e == "string" ? e : "?";
        if (e instanceof j && (t = e), t ? .base) throw new Error("Can not derive from a modified tag");
        let r = new j(n, [], null, []);
        if (r.set.push(r), t)
            for (let s of t.set) r.set.push(s);
        return r
    }
    static defineModifier(e) {
        let t = new Oe(e);
        return n => n.modified.indexOf(t) > -1 ? n : Oe.get(n.base || n, n.modified.concat(t).sort((r, s) => r.id - s.id))
    }
}
let Mn = 0;
class Oe {
    constructor(e) {
        this.name = e, this.instances = [], this.id = Mn++
    }
    static get(e, t) {
        if (!t.length) return e;
        let n = t[0].instances.find(o => o.base == e && On(t, o.modified));
        if (n) return n;
        let r = [],
            s = new j(e.name, r, e, t);
        for (let o of t) o.instances.push(s);
        let l = En(t);
        for (let o of e.set)
            if (!o.modified.length)
                for (let a of l) r.push(Oe.get(o, a));
        return s
    }
}

function On(i, e) {
    return i.length == e.length && i.every((t, n) => t == e[n])
}

function En(i) {
    let e = [
        []
    ];
    for (let t = 0; t < i.length; t++)
        for (let n = 0, r = e.length; n < r; n++) e.push(e[n].concat(i[t]));
    return e.sort((t, n) => n.length - t.length)
}

function Dn(i) {
    let e = Object.create(null);
    for (let t in i) {
        let n = i[t];
        Array.isArray(n) || (n = [n]);
        for (let r of t.split(" "))
            if (r) {
                let s = [],
                    l = 2,
                    o = r;
                for (let u = 0;;) {
                    if (o == "..." && u > 0 && u + 3 == r.length) {
                        l = 1;
                        break
                    }
                    let d = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(o);
                    if (!d) throw new RangeError("Invalid path: " + r);
                    if (s.push(d[0] == "*" ? "" : d[0][0] == '"' ? JSON.parse(d[0]) : d[0]), u += d[0].length, u == r.length) break;
                    let p = r[u++];
                    if (u == r.length && p == "!") {
                        l = 0;
                        break
                    }
                    if (p != "/") throw new RangeError("Invalid path: " + r);
                    o = r.slice(u)
                }
                let a = s.length - 1,
                    h = s[a];
                if (!h) throw new RangeError("Invalid path: " + r);
                let f = new ye(n, l, a > 0 ? s.slice(0, a) : null);
                e[h] = f.sort(e[h])
            }
    }
    return Ft.add(e)
}
const Ft = new b({
    combine(i, e) {
        let t, n, r;
        for (; i || e;) {
            if (!i || e && i.depth >= e.depth ? (r = e, e = e.next) : (r = i, i = i.next), t && t.mode == r.mode && !r.context && !t.context) continue;
            let s = new ye(r.tags, r.mode, r.context);
            t ? t.next = s : n = s, t = s
        }
        return n
    }
});
class ye {
    constructor(e, t, n, r) {
        this.tags = e, this.mode = t, this.context = n, this.next = r
    }
    get opaque() {
        return this.mode == 0
    }
    get inherit() {
        return this.mode == 1
    }
    sort(e) {
        return !e || e.depth < this.depth ? (this.next = e, this) : (e.next = this.sort(e.next), e)
    }
    get depth() {
        return this.context ? this.context.length : 0
    }
}
ye.empty = new ye([], 2, null);

function zt(i, e) {
    let t = Object.create(null);
    for (let s of i)
        if (!Array.isArray(s.tag)) t[s.tag.id] = s.class;
        else
            for (let l of s.tag) t[l.id] = s.class;
    let {
        scope: n,
        all: r = null
    } = e || {};
    return {
        style: s => {
            let l = r;
            for (let o of s)
                for (let a of o.set) {
                    let h = t[a.id];
                    if (h) {
                        l = l ? l + " " + h : h;
                        break
                    }
                }
            return l
        },
        scope: n
    }
}

function _n(i, e) {
    let t = null;
    for (let n of i) {
        let r = n.style(e);
        r && (t = t ? t + " " + r : r)
    }
    return t
}

function Fn(i, e, t, n = 0, r = i.length) {
    let s = new zn(n, Array.isArray(e) ? e : [e], t);
    s.highlightRange(i.cursor(), n, r, "", s.highlighters), s.flush(r)
}
class zn {
    constructor(e, t, n) {
        this.at = e, this.highlighters = t, this.span = n, this.class = ""
    }
    startSpan(e, t) {
        t != this.class && (this.flush(e), e > this.at && (this.at = e), this.class = t)
    }
    flush(e) {
        e > this.at && this.class && this.span(this.at, e, this.class)
    }
    highlightRange(e, t, n, r, s) {
        let {
            type: l,
            from: o,
            to: a
        } = e;
        if (o >= n || a <= t) return;
        l.isTop && (s = this.highlighters.filter(p => !p.scope || p.scope(l)));
        let h = r,
            f = Rn(e) || ye.empty,
            u = _n(s, f.tags);
        if (u && (h && (h += " "), h += u, f.mode == 1 && (r += (r ? " " : "") + u)), this.startSpan(Math.max(t, o), h), f.opaque) return;
        let d = e.tree && e.tree.prop(b.mounted);
        if (d && d.overlay) {
            let p = e.node.enter(d.overlay[0].from + o, 1),
                y = this.highlighters.filter(E => !E.scope || E.scope(d.tree.type)),
                A = e.firstChild();
            for (let E = 0, O = o;; E++) {
                let D = E < d.overlay.length ? d.overlay[E] : null,
                    P = D ? D.from + o : a,
                    R = Math.max(t, O),
                    x = Math.min(n, P);
                if (R < x && A)
                    for (; e.from < x && (this.highlightRange(e, R, x, r, s), this.startSpan(Math.min(x, e.to), h), !(e.to >= P || !e.nextSibling())););
                if (!D || P > n) break;
                O = D.to + o, O > t && (this.highlightRange(p.cursor(), Math.max(t, D.from + o), Math.min(n, O), "", y), this.startSpan(Math.min(n, O), h))
            }
            A && e.parent()
        } else if (e.firstChild()) {
            d && (r = "");
            do
                if (!(e.to <= t)) {
                    if (e.from >= n) break;
                    this.highlightRange(e, t, n, r, s), this.startSpan(Math.min(n, e.to), h)
                }
            while (e.nextSibling());
            e.parent()
        }
    }
}

function Rn(i) {
    let e = i.type.prop(Ft);
    for (; e && e.context && !i.matchContext(e.context);) e = e.next;
    return e || null
}
const c = j.define,
    Ce = c(),
    te = c(),
    yt = c(te),
    wt = c(te),
    ne = c(),
    Pe = c(ne),
    Re = c(ne),
    G = c(),
    oe = c(G),
    $ = c(),
    q = c(),
    $e = c(),
    ge = c($e),
    Te = c(),
    k = {
        comment: Ce,
        lineComment: c(Ce),
        blockComment: c(Ce),
        docComment: c(Ce),
        name: te,
        variableName: c(te),
        typeName: yt,
        tagName: c(yt),
        propertyName: wt,
        attributeName: c(wt),
        className: c(te),
        labelName: c(te),
        namespace: c(te),
        macroName: c(te),
        literal: ne,
        string: Pe,
        docString: c(Pe),
        character: c(Pe),
        attributeValue: c(Pe),
        number: Re,
        integer: c(Re),
        float: c(Re),
        bool: c(ne),
        regexp: c(ne),
        escape: c(ne),
        color: c(ne),
        url: c(ne),
        keyword: $,
        self: c($),
        null: c($),
        atom: c($),
        unit: c($),
        modifier: c($),
        operatorKeyword: c($),
        controlKeyword: c($),
        definitionKeyword: c($),
        moduleKeyword: c($),
        operator: q,
        derefOperator: c(q),
        arithmeticOperator: c(q),
        logicOperator: c(q),
        bitwiseOperator: c(q),
        compareOperator: c(q),
        updateOperator: c(q),
        definitionOperator: c(q),
        typeOperator: c(q),
        controlOperator: c(q),
        punctuation: $e,
        separator: c($e),
        bracket: ge,
        angleBracket: c(ge),
        squareBracket: c(ge),
        paren: c(ge),
        brace: c(ge),
        content: G,
        heading: oe,
        heading1: c(oe),
        heading2: c(oe),
        heading3: c(oe),
        heading4: c(oe),
        heading5: c(oe),
        heading6: c(oe),
        contentSeparator: c(G),
        list: c(G),
        quote: c(G),
        emphasis: c(G),
        strong: c(G),
        link: c(G),
        monospace: c(G),
        strikethrough: c(G),
        inserted: c(),
        deleted: c(),
        changed: c(),
        invalid: c(),
        meta: Te,
        documentMeta: c(Te),
        annotation: c(Te),
        processingInstruction: c(Te),
        definition: j.defineModifier("definition"),
        constant: j.defineModifier("constant"),
        function: j.defineModifier("function"),
        standard: j.defineModifier("standard"),
        local: j.defineModifier("local"),
        special: j.defineModifier("special")
    };
for (let i in k) {
    let e = k[i];
    e instanceof j && (e.name = i)
}
zt([{
    tag: k.link,
    class: "tok-link"
}, {
    tag: k.heading,
    class: "tok-heading"
}, {
    tag: k.emphasis,
    class: "tok-emphasis"
}, {
    tag: k.strong,
    class: "tok-strong"
}, {
    tag: k.keyword,
    class: "tok-keyword"
}, {
    tag: k.atom,
    class: "tok-atom"
}, {
    tag: k.bool,
    class: "tok-bool"
}, {
    tag: k.url,
    class: "tok-url"
}, {
    tag: k.labelName,
    class: "tok-labelName"
}, {
    tag: k.inserted,
    class: "tok-inserted"
}, {
    tag: k.deleted,
    class: "tok-deleted"
}, {
    tag: k.literal,
    class: "tok-literal"
}, {
    tag: k.string,
    class: "tok-string"
}, {
    tag: k.number,
    class: "tok-number"
}, {
    tag: [k.regexp, k.escape, k.special(k.string)],
    class: "tok-string2"
}, {
    tag: k.variableName,
    class: "tok-variableName"
}, {
    tag: k.local(k.variableName),
    class: "tok-variableName tok-local"
}, {
    tag: k.definition(k.variableName),
    class: "tok-variableName tok-definition"
}, {
    tag: k.special(k.variableName),
    class: "tok-variableName2"
}, {
    tag: k.definition(k.propertyName),
    class: "tok-propertyName tok-definition"
}, {
    tag: k.typeName,
    class: "tok-typeName"
}, {
    tag: k.namespace,
    class: "tok-namespace"
}, {
    tag: k.className,
    class: "tok-className"
}, {
    tag: k.macroName,
    class: "tok-macroName"
}, {
    tag: k.propertyName,
    class: "tok-propertyName"
}, {
    tag: k.operator,
    class: "tok-operator"
}, {
    tag: k.comment,
    class: "tok-comment"
}, {
    tag: k.meta,
    class: "tok-meta"
}, {
    tag: k.invalid,
    class: "tok-invalid"
}, {
    tag: k.punctuation,
    class: "tok-punctuation"
}]);
var Le;
const ae = new b;

function Rt(i) {
    return Z.define({
        combine: i ? e => e.concat(i) : void 0
    })
}
const Ln = new b;
class U {
    constructor(e, t, n = [], r = "") {
        this.data = e, this.name = r, ke.prototype.hasOwnProperty("tree") || Object.defineProperty(ke.prototype, "tree", {
            get() {
                return K(this)
            }
        }), this.parser = t, this.extension = [ie.of(this), ke.languageData.of((s, l, o) => {
            let a = xt(s, l, o),
                h = a.type.prop(ae);
            if (!h) return [];
            let f = s.facet(h),
                u = a.type.prop(Ln);
            if (u) {
                let d = a.resolve(l - a.from, o);
                for (let p of u)
                    if (p.test(d, s)) {
                        let y = s.facet(p.facet);
                        return p.type == "replace" ? y : y.concat(f)
                    }
            }
            return f
        })].concat(n)
    }
    isActiveAt(e, t, n = -1) {
        return xt(e, t, n).type.prop(ae) == this.data
    }
    findRegions(e) {
        let t = e.facet(ie);
        if (t ? .data == this.data) return [{
            from: 0,
            to: e.doc.length
        }];
        if (!t || !t.allowsNesting) return [];
        let n = [],
            r = (s, l) => {
                if (s.prop(ae) == this.data) {
                    n.push({
                        from: l,
                        to: l + s.length
                    });
                    return
                }
                let o = s.prop(b.mounted);
                if (o) {
                    if (o.tree.prop(ae) == this.data) {
                        if (o.overlay)
                            for (let a of o.overlay) n.push({
                                from: a.from + l,
                                to: a.to + l
                            });
                        else n.push({
                            from: l,
                            to: l + s.length
                        });
                        return
                    } else if (o.overlay) {
                        let a = n.length;
                        if (r(o.tree, o.overlay[0].from + l), n.length > a) return
                    }
                }
                for (let a = 0; a < s.children.length; a++) {
                    let h = s.children[a];
                    h instanceof S && r(h, s.positions[a] + l)
                }
            };
        return r(K(e), 0), n
    }
    get allowsNesting() {
        return !0
    }
}
U.setState = Fe.define();

function xt(i, e, t) {
    let n = i.facet(ie),
        r = K(i).topNode;
    if (!n || n.allowsNesting)
        for (let s = r; s; s = s.enter(e, t, v.ExcludeBuffers | v.EnterBracketed)) s.type.isTop && (r = s);
    return r
}
class qe extends U {
    constructor(e, t, n) {
        super(e, t, [], n), this.parser = t
    }
    static define(e) {
        let t = Rt(e.languageData);
        return new qe(t, e.parser.configure({
            props: [ae.add(n => n.isTop ? t : void 0)]
        }), e.name)
    }
    configure(e, t) {
        return new qe(this.data, this.parser.configure(e), t || this.name)
    }
    get allowsNesting() {
        return this.parser.hasWrappers()
    }
}

function K(i) {
    let e = i.field(U.state, !1);
    return e ? e.tree : S.empty
}
class jn {
    constructor(e) {
        this.doc = e, this.cursorPos = 0, this.string = "", this.cursor = e.iter()
    }
    get length() {
        return this.doc.length
    }
    syncTo(e) {
        return this.string = this.cursor.next(e - this.cursorPos).value, this.cursorPos = e + this.string.length, this.cursorPos - this.string.length
    }
    chunk(e) {
        return this.syncTo(e), this.string
    }
    get lineChunks() {
        return !0
    }
    read(e, t) {
        let n = this.cursorPos - this.string.length;
        return e < n || t >= this.cursorPos ? this.doc.sliceString(e, t) : this.string.slice(e - n, t - n)
    }
}
let me = null;
class ce {
    constructor(e, t, n = [], r, s, l, o, a) {
        this.parser = e, this.state = t, this.fragments = n, this.tree = r, this.treeLen = s, this.viewport = l, this.skipped = o, this.scheduleOn = a, this.parse = null, this.tempSkipped = []
    }
    static create(e, t, n) {
        return new ce(e, t, [], S.empty, 0, n, [], null)
    }
    startParse() {
        return this.parser.startParse(new jn(this.state.doc), this.fragments)
    }
    work(e, t) {
        return t != null && t >= this.state.doc.length && (t = void 0), this.tree != S.empty && this.isDone(t ? ? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
            var n;
            if (typeof e == "number") {
                let r = Date.now() + e;
                e = () => Date.now() > r
            }
            for (this.parse || (this.parse = this.startParse()), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t);;) {
                let r = this.parse.advance();
                if (r)
                    if (this.fragments = this.withoutTempSkipped(Y.addTree(r, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (n = this.parse.stoppedAt) !== null && n !== void 0 ? n : this.state.doc.length, this.tree = r, this.parse = null, this.treeLen < (t ? ? this.state.doc.length)) this.parse = this.startParse();
                    else return !0;
                if (e()) return !1
            }
        })
    }
    takeTree() {
        let e, t;
        this.parse && (e = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > e) && this.parse.stopAt(e), this.withContext(() => {
            for (; !(t = this.parse.advance()););
        }), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(Y.addTree(this.tree, this.fragments, !0)), this.parse = null)
    }
    withContext(e) {
        let t = me;
        me = this;
        try {
            return e()
        } finally {
            me = t
        }
    }
    withoutTempSkipped(e) {
        for (let t; t = this.tempSkipped.pop();) e = vt(e, t.from, t.to);
        return e
    }
    changes(e, t) {
        let {
            fragments: n,
            tree: r,
            treeLen: s,
            viewport: l,
            skipped: o
        } = this;
        if (this.takeTree(), !e.empty) {
            let a = [];
            if (e.iterChangedRanges((h, f, u, d) => a.push({
                    fromA: h,
                    toA: f,
                    fromB: u,
                    toB: d
                })), n = Y.applyChanges(n, a), r = S.empty, s = 0, l = {
                    from: e.mapPos(l.from, -1),
                    to: e.mapPos(l.to, 1)
                }, this.skipped.length) {
                o = [];
                for (let h of this.skipped) {
                    let f = e.mapPos(h.from, 1),
                        u = e.mapPos(h.to, -1);
                    f < u && o.push({
                        from: f,
                        to: u
                    })
                }
            }
        }
        return new ce(this.parser, t, n, r, s, l, o, this.scheduleOn)
    }
    updateViewport(e) {
        if (this.viewport.from == e.from && this.viewport.to == e.to) return !1;
        this.viewport = e;
        let t = this.skipped.length;
        for (let n = 0; n < this.skipped.length; n++) {
            let {
                from: r,
                to: s
            } = this.skipped[n];
            r < e.to && s > e.from && (this.fragments = vt(this.fragments, r, s), this.skipped.splice(n--, 1))
        }
        return this.skipped.length >= t ? !1 : (this.reset(), !0)
    }
    reset() {
        this.parse && (this.takeTree(), this.parse = null)
    }
    skipUntilInView(e, t) {
        this.skipped.push({
            from: e,
            to: t
        })
    }
    static getSkippingParser(e) {
        return new class extends _t {
            createParse(t, n, r) {
                let s = r[0].from,
                    l = r[r.length - 1].to;
                return {
                    parsedPos: s,
                    advance() {
                        let a = me;
                        if (a) {
                            for (let h of r) a.tempSkipped.push(h);
                            e && (a.scheduleOn = a.scheduleOn ? Promise.all([a.scheduleOn, e]) : e)
                        }
                        return this.parsedPos = l, new S(z.none, [], [], l - s)
                    },
                    stoppedAt: null,
                    stopAt() {}
                }
            }
        }
    }
    isDone(e) {
        e = Math.min(e, this.state.doc.length);
        let t = this.fragments;
        return this.treeLen >= e && t.length && t[0].from == 0 && t[0].to >= e
    }
    static get() {
        return me
    }
}

function vt(i, e, t) {
    return Y.applyChanges(i, [{
        fromA: e,
        toA: t,
        fromB: e,
        toB: t
    }])
}
class de {
    constructor(e) {
        this.context = e, this.tree = e.tree
    }
    apply(e) {
        if (!e.docChanged && this.tree == this.context.tree) return this;
        let t = this.context.changes(e.changes, e.state),
            n = this.context.treeLen == e.startState.doc.length ? void 0 : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
        return t.work(20, n) || t.takeTree(), new de(t)
    }
    static init(e) {
        let t = Math.min(3e3, e.doc.length),
            n = ce.create(e.facet(ie).parser, e, {
                from: 0,
                to: t
            });
        return n.work(20, t) || n.takeTree(), new de(n)
    }
}
U.state = Xe.define({
    create: de.init,
    update(i, e) {
        for (let t of e.effects)
            if (t.is(U.setState)) return t.value;
        return e.startState.facet(ie) != e.state.facet(ie) ? de.init(e.state) : i.apply(e)
    }
});
let Lt = i => {
    let e = setTimeout(() => i(), 500);
    return () => clearTimeout(e)
};
typeof requestIdleCallback < "u" && (Lt = i => {
    let e = -1,
        t = setTimeout(() => {
            e = requestIdleCallback(i, {
                timeout: 400
            })
        }, 100);
    return () => e < 0 ? clearTimeout(t) : cancelIdleCallback(e)
});
const je = typeof navigator < "u" && (!((Le = navigator.scheduling) === null || Le === void 0) && Le.isInputPending) ? () => navigator.scheduling.isInputPending() : null,
    Wn = Qe.fromClass(class {
        constructor(e) {
            this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork()
        }
        update(e) {
            let t = this.view.state.field(U.state).context;
            (t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), (e.docChanged || e.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t)
        }
        scheduleWork() {
            if (this.working) return;
            let {
                state: e
            } = this.view, t = e.field(U.state);
            (t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = Lt(this.work))
        }
        work(e) {
            this.working = null;
            let t = Date.now();
            if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0) return;
            let {
                state: n,
                viewport: {
                    to: r
                }
            } = this.view, s = n.field(U.state);
            if (s.tree == s.context.tree && s.context.isDone(r + 1e5)) return;
            let l = Date.now() + Math.min(this.chunkBudget, 100, e && !je ? Math.max(25, e.timeRemaining() - 5) : 1e9),
                o = s.context.treeLen < r && n.doc.length > r + 1e3,
                a = s.context.work(() => je && je() || Date.now() > l, r + (o ? 0 : 1e5));
            this.chunkBudget -= Date.now() - t, (a || this.chunkBudget <= 0) && (s.context.takeTree(), this.view.dispatch({
                effects: U.setState.of(new de(s.context))
            })), this.chunkBudget > 0 && !(a && !o) && this.scheduleWork(), this.checkAsyncSchedule(s.context)
        }
        checkAsyncSchedule(e) {
            e.scheduleOn && (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch(t => cn(this.view.state, t)).then(() => this.workScheduled--), e.scheduleOn = null)
        }
        destroy() {
            this.working && this.working()
        }
        isWorking() {
            return !!(this.working || this.workScheduled > 0)
        }
    }, {
        eventHandlers: {
            focus() {
                this.scheduleWork()
            }
        }
    }),
    ie = Z.define({
        combine(i) {
            return i.length ? i[0] : null
        },
        enables: i => [U.state, Wn, X.contentAttributes.compute([i], e => {
            let t = e.facet(i);
            return t && t.name ? {
                "data-language": t.name
            } : {}
        })]
    });
class Er {
    constructor(e, t = []) {
        this.language = e, this.support = t, this.extension = [e, t]
    }
}
const Un = Z.define(),
    jt = Z.define({
        combine: i => {
            if (!i.length) return "  ";
            let e = i[0];
            if (!e || /\S/.test(e) || Array.from(e).some(t => t != e[0])) throw new Error("Invalid indent unit: " + JSON.stringify(i[0]));
            return e
        }
    });

function Ee(i) {
    let e = i.facet(jt);
    return e.charCodeAt(0) == 9 ? i.tabSize * e.length : e.length
}

function Hn(i, e) {
    let t = "",
        n = i.tabSize,
        r = i.facet(jt)[0];
    if (r == "	") {
        for (; e >= n;) t += "	", e -= n;
        r = " "
    }
    for (let s = 0; s < e; s++) t += r;
    return t
}

function Vn(i, e) {
    i instanceof ke && (i = new Wt(i));
    for (let n of i.state.facet(Un)) {
        let r = n(i, e);
        if (r !== void 0) return r
    }
    let t = K(i.state);
    return t.length >= e ? $n(i, t, e) : null
}
class Wt {
    constructor(e, t = {}) {
        this.state = e, this.options = t, this.unit = Ee(e)
    }
    lineAt(e, t = 1) {
        let n = this.state.doc.lineAt(e),
            {
                simulateBreak: r,
                simulateDoubleBreak: s
            } = this.options;
        return r != null && r >= n.from && r <= n.to ? s && r == e ? {
            text: "",
            from: e
        } : (t < 0 ? r < e : r <= e) ? {
            text: n.text.slice(r - n.from),
            from: r
        } : {
            text: n.text.slice(0, r - n.from),
            from: n.from
        } : n
    }
    textAfterPos(e, t = 1) {
        if (this.options.simulateDoubleBreak && e == this.options.simulateBreak) return "";
        let {
            text: n,
            from: r
        } = this.lineAt(e, t);
        return n.slice(e - r, Math.min(n.length, e + 100 - r))
    }
    column(e, t = 1) {
        let {
            text: n,
            from: r
        } = this.lineAt(e, t), s = this.countColumn(n, e - r), l = this.options.overrideIndentation ? this.options.overrideIndentation(r) : -1;
        return l > -1 && (s += l - this.countColumn(n, n.search(/\S|$/))), s
    }
    countColumn(e, t = e.length) {
        return un(e, this.state.tabSize, t)
    }
    lineIndent(e, t = 1) {
        let {
            text: n,
            from: r
        } = this.lineAt(e, t), s = this.options.overrideIndentation;
        if (s) {
            let l = s(r);
            if (l > -1) return l
        }
        return this.countColumn(n, n.search(/\S|$/))
    }
    get simulatedBreak() {
        return this.options.simulateBreak || null
    }
}
const Ut = new b;

function $n(i, e, t) {
    let n = e.resolveStack(t),
        r = e.resolveInner(t, -1).resolve(t, 0).enterUnfinishedNodesBefore(t);
    if (r != n.node) {
        let s = [];
        for (let l = r; l && !(l.from < n.node.from || l.to > n.node.to || l.from == n.node.from && l.type == n.node.type); l = l.parent) s.push(l);
        for (let l = s.length - 1; l >= 0; l--) n = {
            node: s[l],
            next: n
        }
    }
    return Ht(n, i, t)
}

function Ht(i, e, t) {
    for (let n = i; n; n = n.next) {
        let r = Gn(n.node);
        if (r) return r(nt.create(e, t, n))
    }
    return 0
}

function qn(i) {
    return i.pos == i.options.simulateBreak && i.options.simulateDoubleBreak
}

function Gn(i) {
    let e = i.type.prop(Ut);
    if (e) return e;
    let t = i.firstChild,
        n;
    if (t && (n = t.type.prop(b.closedBy))) {
        let r = i.lastChild,
            s = r && n.indexOf(r.name) > -1;
        return l => Vt(l, !0, 1, void 0, s && !qn(l) ? r.from : void 0)
    }
    return i.parent == null ? Jn : null
}

function Jn() {
    return 0
}
class nt extends Wt {
    constructor(e, t, n) {
        super(e.state, e.options), this.base = e, this.pos = t, this.context = n
    }
    get node() {
        return this.context.node
    }
    static create(e, t, n) {
        return new nt(e, t, n)
    }
    get textAfter() {
        return this.textAfterPos(this.pos)
    }
    get baseIndent() {
        return this.baseIndentFor(this.node)
    }
    baseIndentFor(e) {
        let t = this.state.doc.lineAt(e.from);
        for (;;) {
            let n = e.resolve(t.from);
            for (; n.parent && n.parent.from == n.from;) n = n.parent;
            if (Kn(n, e)) break;
            t = this.state.doc.lineAt(n.from)
        }
        return this.lineIndent(t.from)
    }
    continue () {
        return Ht(this.context.next, this.base, this.pos)
    }
}

function Kn(i, e) {
    for (let t = e; t; t = t.parent)
        if (i == t) return !0;
    return !1
}

function Qn(i) {
    let e = i.node,
        t = e.childAfter(e.from),
        n = e.lastChild;
    if (!t) return null;
    let r = i.options.simulateBreak,
        s = i.state.doc.lineAt(t.from),
        l = r == null || r <= s.from ? s.to : Math.min(s.to, r);
    for (let o = t.to;;) {
        let a = e.childAfter(o);
        if (!a || a == n) return null;
        if (!a.type.isSkipped) {
            if (a.from >= l) return null;
            let h = /^ */.exec(s.text.slice(t.to - s.from))[0].length;
            return {
                from: t.from,
                to: t.to + h
            }
        }
        o = a.to
    }
}

function Dr({
    closing: i,
    align: e = !0,
    units: t = 1
}) {
    return n => Vt(n, e, t, i)
}

function Vt(i, e, t, n, r) {
    let s = i.textAfter,
        l = s.match(/^\s*/)[0].length,
        o = n && s.slice(l, l + n.length) == n || r == i.pos + l,
        a = e ? Qn(i) : null;
    return a ? o ? i.column(a.from) : i.column(a.to) : i.baseIndent + (o ? 0 : i.unit * t)
}
const _r = i => i.baseIndent;

function Fr({
    except: i,
    units: e = 1
} = {}) {
    return t => {
        let n = i && i.test(t.textAfter);
        return t.baseIndent + (n ? 0 : e * t.unit)
    }
}
const Xn = 200;

function zr() {
    return ke.transactionFilter.of(i => {
        if (!i.docChanged || !i.isUserEvent("input.type") && !i.isUserEvent("input.complete")) return i;
        let e = i.startState.languageDataAt("indentOnInput", i.startState.selection.main.head);
        if (!e.length) return i;
        let t = i.newDoc,
            {
                head: n
            } = i.newSelection.main,
            r = t.lineAt(n);
        if (n > r.from + Xn) return i;
        let s = t.sliceString(r.from, n);
        if (!e.some(h => h.test(s))) return i;
        let {
            state: l
        } = i, o = -1, a = [];
        for (let {
                head: h
            } of l.selection.ranges) {
            let f = l.doc.lineAt(h);
            if (f.from == o) continue;
            o = f.from;
            let u = Vn(l, f.from);
            if (u == null) continue;
            let d = /^\s*/.exec(f.text)[0],
                p = Hn(l, u);
            d != p && a.push({
                from: f.from,
                to: f.from + d.length,
                insert: p
            })
        }
        return a.length ? [i, {
            changes: a,
            sequential: !0
        }] : i
    })
}
const Yn = Z.define(),
    Zn = new b;

function Rr(i) {
    let e = i.firstChild,
        t = i.lastChild;
    return e && e.to < t.from ? {
        from: e.to,
        to: t.type.isError ? i.to : t.from
    } : null
}

function er(i, e, t) {
    let n = K(i);
    if (n.length < t) return null;
    let r = n.resolveStack(t, 1),
        s = null;
    for (let l = r; l; l = l.next) {
        let o = l.node;
        if (o.to <= t || o.from > t) continue;
        if (s && o.from < e) break;
        let a = o.type.prop(Zn);
        if (a && (o.to < n.length - 50 || n.length == i.doc.length || !tr(o))) {
            let h = a(o, i);
            h && h.from <= t && h.from >= e && h.to > t && (s = h)
        }
    }
    return s
}

function tr(i) {
    let e = i.lastChild;
    return e && e.to == i.to && e.type.isError
}

function De(i, e, t) {
    for (let n of i.facet(Yn)) {
        let r = n(i, e, t);
        if (r) return r
    }
    return er(i, e, t)
}

function $t(i, e) {
    let t = e.mapPos(i.from, 1),
        n = e.mapPos(i.to, -1);
    return t >= n ? void 0 : {
        from: t,
        to: n
    }
}
const ze = Fe.define({
        map: $t
    }),
    xe = Fe.define({
        map: $t
    });

function qt(i) {
    let e = [];
    for (let {
            head: t
        } of i.state.selection.ranges) e.some(n => n.from <= t && n.to >= t) || e.push(i.lineBlockAt(t));
    return e
}
const he = Xe.define({
    create() {
        return H.none
    },
    update(i, e) {
        e.isUserEvent("delete") && e.changes.iterChangedRanges((t, n) => i = St(i, t, n)), i = i.map(e.changes);
        for (let t of e.effects)
            if (t.is(ze) && !nr(i, t.value.from, t.value.to)) {
                let {
                    preparePlaceholder: n
                } = e.state.facet(Kt), r = n ? H.replace({
                    widget: new ar(n(e.state, t.value))
                }) : At;
                i = i.update({
                    add: [r.range(t.value.from, t.value.to)]
                })
            } else t.is(xe) && (i = i.update({
                filter: (n, r) => t.value.from != n || t.value.to != r,
                filterFrom: t.value.from,
                filterTo: t.value.to
            }));
        return e.selection && (i = St(i, e.selection.main.head)), i
    },
    provide: i => X.decorations.from(i),
    toJSON(i, e) {
        let t = [];
        return i.between(0, e.doc.length, (n, r) => {
            t.push(n, r)
        }), t
    },
    fromJSON(i) {
        if (!Array.isArray(i) || i.length % 2) throw new RangeError("Invalid JSON for fold state");
        let e = [];
        for (let t = 0; t < i.length;) {
            let n = i[t++],
                r = i[t++];
            if (typeof n != "number" || typeof r != "number") throw new RangeError("Invalid JSON for fold state");
            e.push(At.range(n, r))
        }
        return H.set(e, !0)
    }
});

function St(i, e, t = e) {
    let n = !1;
    return i.between(e, t, (r, s) => {
        r < t && s > e && (n = !0)
    }), n ? i.update({
        filterFrom: e,
        filterTo: t,
        filter: (r, s) => r >= t || s <= e
    }) : i
}

function _e(i, e, t) {
    var n;
    let r = null;
    return (n = i.field(he, !1)) === null || n === void 0 || n.between(e, t, (s, l) => {
        (!r || r.from > s) && (r = {
            from: s,
            to: l
        })
    }), r
}

function nr(i, e, t) {
    let n = !1;
    return i.between(e, e, (r, s) => {
        r == e && s == t && (n = !0)
    }), n
}

function Gt(i, e) {
    return i.field(he, !1) ? e : e.concat(Fe.appendConfig.of(Qt()))
}
const rr = i => {
        for (let e of qt(i)) {
            let t = De(i.state, e.from, e.to);
            if (t) return i.dispatch({
                effects: Gt(i.state, [ze.of(t), Jt(i, t)])
            }), !0
        }
        return !1
    },
    ir = i => {
        if (!i.state.field(he, !1)) return !1;
        let e = [];
        for (let t of qt(i)) {
            let n = _e(i.state, t.from, t.to);
            n && e.push(xe.of(n), Jt(i, n, !1))
        }
        return e.length && i.dispatch({
            effects: e
        }), e.length > 0
    };

function Jt(i, e, t = !0) {
    let n = i.state.doc.lineAt(e.from).number,
        r = i.state.doc.lineAt(e.to).number;
    return X.announce.of(`${i.state.phrase(t?"Folded lines":"Unfolded lines")} ${n} ${i.state.phrase("to")} ${r}.`)
}
const sr = i => {
        let {
            state: e
        } = i, t = [];
        for (let n = 0; n < e.doc.length;) {
            let r = i.lineBlockAt(n),
                s = De(e, r.from, r.to);
            s && t.push(ze.of(s)), n = (s ? i.lineBlockAt(s.to) : r).to + 1
        }
        return t.length && i.dispatch({
            effects: Gt(i.state, t)
        }), !!t.length
    },
    lr = i => {
        let e = i.state.field(he, !1);
        if (!e || !e.size) return !1;
        let t = [];
        return e.between(0, i.state.doc.length, (n, r) => {
            t.push(xe.of({
                from: n,
                to: r
            }))
        }), i.dispatch({
            effects: t
        }), !0
    },
    Lr = [{
        key: "Ctrl-Shift-[",
        mac: "Cmd-Alt-[",
        run: rr
    }, {
        key: "Ctrl-Shift-]",
        mac: "Cmd-Alt-]",
        run: ir
    }, {
        key: "Ctrl-Alt-[",
        run: sr
    }, {
        key: "Ctrl-Alt-]",
        run: lr
    }],
    or = {
        placeholderDOM: null,
        preparePlaceholder: null,
        placeholderText: "…"
    },
    Kt = Z.define({
        combine(i) {
            return Bt(i, or)
        }
    });

function Qt(i) {
    return [he, fr]
}

function Xt(i, e) {
    let {
        state: t
    } = i, n = t.facet(Kt), r = l => {
        let o = i.lineBlockAt(i.posAtDOM(l.target)),
            a = _e(i.state, o.from, o.to);
        a && i.dispatch({
            effects: xe.of(a)
        }), l.preventDefault()
    };
    if (n.placeholderDOM) return n.placeholderDOM(i, r, e);
    let s = document.createElement("span");
    return s.textContent = n.placeholderText, s.setAttribute("aria-label", t.phrase("folded code")), s.title = t.phrase("unfold"), s.className = "cm-foldPlaceholder", s.onclick = r, s
}
const At = H.replace({
    widget: new class extends Mt {
        toDOM(i) {
            return Xt(i, null)
        }
    }
});
class ar extends Mt {
    constructor(e) {
        super(), this.value = e
    }
    eq(e) {
        return this.value == e.value
    }
    toDOM(e) {
        return Xt(e, this.value)
    }
}
const hr = {
    openText: "⌄",
    closedText: "›",
    markerDOM: null,
    domEventHandlers: {},
    foldingChanged: () => !1
};
class We extends gn {
    constructor(e, t) {
        super(), this.config = e, this.open = t
    }
    eq(e) {
        return this.config == e.config && this.open == e.open
    }
    toDOM(e) {
        if (this.config.markerDOM) return this.config.markerDOM(this.open);
        let t = document.createElement("span");
        return t.textContent = this.open ? this.config.openText : this.config.closedText, t.title = e.state.phrase(this.open ? "Fold line" : "Unfold line"), t
    }
}

function jr(i = {}) {
    let e = { ...hr,
            ...i
        },
        t = new We(e, !0),
        n = new We(e, !1),
        r = Qe.fromClass(class {
            constructor(l) {
                this.from = l.viewport.from, this.markers = this.buildMarkers(l)
            }
            update(l) {
                (l.docChanged || l.viewportChanged || l.startState.facet(ie) != l.state.facet(ie) || l.startState.field(he, !1) != l.state.field(he, !1) || K(l.startState) != K(l.state) || e.foldingChanged(l)) && (this.markers = this.buildMarkers(l.view))
            }
            buildMarkers(l) {
                let o = new It;
                for (let a of l.viewportLineBlocks) {
                    let h = _e(l.state, a.from, a.to) ? n : De(l.state, a.from, a.to) ? t : null;
                    h && o.add(a.from, a.from, h)
                }
                return o.finish()
            }
        }),
        {
            domEventHandlers: s
        } = e;
    return [r, dn({
        class: "cm-foldGutter",
        markers(l) {
            var o;
            return ((o = l.plugin(r)) === null || o === void 0 ? void 0 : o.markers) || pn.empty
        },
        initialSpacer() {
            return new We(e, !1)
        },
        domEventHandlers: { ...s,
            click: (l, o, a) => {
                if (s.click && s.click(l, o, a)) return !0;
                let h = _e(l.state, o.from, o.to);
                if (h) return l.dispatch({
                    effects: xe.of(h)
                }), !0;
                let f = De(l.state, o.from, o.to);
                return f ? (l.dispatch({
                    effects: ze.of(f)
                }), !0) : !1
            }
        }
    }), Qt()]
}
const fr = X.baseTheme({
    ".cm-foldPlaceholder": {
        backgroundColor: "#eee",
        border: "1px solid #ddd",
        color: "#888",
        borderRadius: ".2em",
        margin: "0 1px",
        padding: "0 1px",
        cursor: "pointer"
    },
    ".cm-foldGutter span": {
        padding: "0 1px",
        cursor: "pointer"
    }
});
class rt {
    constructor(e, t) {
        this.specs = e;
        let n;

        function r(o) {
            let a = at.newName();
            return (n || (n = Object.create(null)))["." + a] = o, a
        }
        const s = typeof t.all == "string" ? t.all : t.all ? r(t.all) : void 0,
            l = t.scope;
        this.scope = l instanceof U ? o => o.prop(ae) == l.data : l ? o => o == l : void 0, this.style = zt(e.map(o => ({
            tag: o.tag,
            class: o.class || r(Object.assign({}, o, {
                tag: null
            }))
        })), {
            all: s
        }).style, this.module = n ? new at(n) : null, this.themeType = t.themeType
    }
    static define(e, t) {
        return new rt(e, t || {})
    }
}
const Ge = Z.define(),
    Yt = Z.define({
        combine(i) {
            return i.length ? [i[0]] : null
        }
    });

function Be(i) {
    let e = i.facet(Ge);
    return e.length ? e : i.facet(Yt)
}

function Wr(i, e) {
    let t = [cr],
        n;
    return i instanceof rt && (i.module && t.push(X.styleModule.of(i.module)), n = i.themeType), e ? .fallback ? t.push(Yt.of(i)) : n ? t.push(Ge.computeN([X.darkTheme], r => r.facet(X.darkTheme) == (n == "dark") ? [i] : [])) : t.push(Ge.of(i)), t
}

function Ur(i, e, t) {
    let n = Be(i),
        r = null;
    if (n) {
        for (let s of n)
            if (!s.scope || t) {
                let l = s.style(e);
                l && (r = r ? r + " " + l : l)
            }
    }
    return r
}
class ur {
    constructor(e) {
        this.markCache = Object.create(null), this.tree = K(e.state), this.decorations = this.buildDeco(e, Be(e.state)), this.decoratedTo = e.viewport.to
    }
    update(e) {
        let t = K(e.state),
            n = Be(e.state),
            r = n != Be(e.startState),
            {
                viewport: s
            } = e.view,
            l = e.changes.mapPos(this.decoratedTo, 1);
        t.length < s.to && !r && t.type == this.tree.type && l >= s.to ? (this.decorations = this.decorations.map(e.changes), this.decoratedTo = l) : (t != this.tree || e.viewportChanged || r) && (this.tree = t, this.decorations = this.buildDeco(e.view, n), this.decoratedTo = s.to)
    }
    buildDeco(e, t) {
        if (!t || !this.tree.length) return H.none;
        let n = new It;
        for (let {
                from: r,
                to: s
            } of e.visibleRanges) Fn(this.tree, t, (l, o, a) => {
            n.add(l, o, this.markCache[a] || (this.markCache[a] = H.mark({
                class: a
            })))
        }, r, s);
        return n.finish()
    }
}
const cr = fn.high(Qe.fromClass(ur, {
        decorations: i => i.decorations
    })),
    dr = X.baseTheme({
        "&.cm-focused .cm-matchingBracket": {
            backgroundColor: "#328c8252"
        },
        "&.cm-focused .cm-nonmatchingBracket": {
            backgroundColor: "#bb555544"
        }
    }),
    Zt = 1e4,
    en = "()[]{}",
    tn = Z.define({
        combine(i) {
            return Bt(i, {
                afterCursor: !0,
                brackets: en,
                maxScanDistance: Zt,
                renderMatch: mr
            })
        }
    }),
    pr = H.mark({
        class: "cm-matchingBracket"
    }),
    gr = H.mark({
        class: "cm-nonmatchingBracket"
    });

function mr(i) {
    let e = [],
        t = i.matched ? pr : gr;
    return e.push(t.range(i.start.from, i.start.to)), i.end && e.push(t.range(i.end.from, i.end.to)), e
}
const kr = Xe.define({
        create() {
            return H.none
        },
        update(i, e) {
            if (!e.docChanged && !e.selection) return i;
            let t = [],
                n = e.state.facet(tn);
            for (let r of e.state.selection.ranges) {
                if (!r.empty) continue;
                let s = Ne(e.state, r.head, -1, n) || r.head > 0 && Ne(e.state, r.head - 1, 1, n) || n.afterCursor && (Ne(e.state, r.head, 1, n) || r.head < e.state.doc.length && Ne(e.state, r.head + 1, -1, n));
                s && (t = t.concat(n.renderMatch(s, e.state)))
            }
            return H.set(t, !0)
        },
        provide: i => X.decorations.from(i)
    }),
    br = [kr, dr];

function Hr(i = {}) {
    return [tn.of(i), br]
}
const yr = new b;

function Je(i, e, t) {
    let n = i.prop(e < 0 ? b.openedBy : b.closedBy);
    if (n) return n;
    if (i.name.length == 1) {
        let r = t.indexOf(i.name);
        if (r > -1 && r % 2 == (e < 0 ? 1 : 0)) return [t[r + e]]
    }
    return null
}

function Ke(i) {
    let e = i.type.prop(yr);
    return e ? e(i.node) : i
}

function Ne(i, e, t, n = {}) {
    let r = n.maxScanDistance || Zt,
        s = n.brackets || en,
        l = K(i),
        o = l.resolveInner(e, t);
    for (let a = o; a; a = a.parent) {
        let h = Je(a.type, t, s);
        if (h && a.from < a.to) {
            let f = Ke(a);
            if (f && (t > 0 ? e >= f.from && e < f.to : e > f.from && e <= f.to)) return wr(i, e, t, a, f, h, s)
        }
    }
    return xr(i, e, t, l, o.type, r, s)
}

function wr(i, e, t, n, r, s, l) {
    let o = n.parent,
        a = {
            from: r.from,
            to: r.to
        },
        h = 0,
        f = o ? .cursor();
    if (f && (t < 0 ? f.childBefore(n.from) : f.childAfter(n.to)))
        do
            if (t < 0 ? f.to <= n.from : f.from >= n.to) {
                if (h == 0 && s.indexOf(f.type.name) > -1 && f.from < f.to) {
                    let u = Ke(f);
                    return {
                        start: a,
                        end: u ? {
                            from: u.from,
                            to: u.to
                        } : void 0,
                        matched: !0
                    }
                } else if (Je(f.type, t, l)) h++;
                else if (Je(f.type, -t, l)) {
                    if (h == 0) {
                        let u = Ke(f);
                        return {
                            start: a,
                            end: u && u.from < u.to ? {
                                from: u.from,
                                to: u.to
                            } : void 0,
                            matched: !1
                        }
                    }
                    h--
                }
            }
    while (t < 0 ? f.prevSibling() : f.nextSibling());
    return {
        start: a,
        matched: !1
    }
}

function xr(i, e, t, n, r, s, l) {
    let o = t < 0 ? i.sliceDoc(e - 1, e) : i.sliceDoc(e, e + 1),
        a = l.indexOf(o);
    if (a < 0 || a % 2 == 0 != t > 0) return null;
    let h = {
            from: t < 0 ? e - 1 : e,
            to: t > 0 ? e + 1 : e
        },
        f = i.doc.iterRange(e, t > 0 ? i.doc.length : 0),
        u = 0;
    for (let d = 0; !f.next().done && d <= s;) {
        let p = f.value;
        t < 0 && (d += p.length);
        let y = e + d * t;
        for (let A = t > 0 ? 0 : p.length - 1, E = t > 0 ? p.length : -1; A != E; A += t) {
            let O = l.indexOf(p[A]);
            if (!(O < 0 || n.resolveInner(y + A, 1).type != r))
                if (O % 2 == 0 == t > 0) u++;
                else {
                    if (u == 1) return {
                        start: h,
                        end: {
                            from: y + A,
                            to: y + A + 1
                        },
                        matched: O >> 1 == a >> 1
                    };
                    u--
                }
        }
        t > 0 && (d += p.length)
    }
    return f.done ? {
        start: h,
        matched: !1
    } : null
}

function Ct(i, e, t, n = 0, r = 0) {
    e == null && (e = i.search(/[^\s\u00a0]/), e == -1 && (e = i.length));
    let s = r;
    for (let l = n; l < e; l++) i.charCodeAt(l) == 9 ? s += t - s % t : s++;
    return s
}
class nn {
    constructor(e, t, n, r) {
        this.string = e, this.tabSize = t, this.indentUnit = n, this.overrideIndent = r, this.pos = 0, this.start = 0, this.lastColumnPos = 0, this.lastColumnValue = 0
    }
    eol() {
        return this.pos >= this.string.length
    }
    sol() {
        return this.pos == 0
    }
    peek() {
        return this.string.charAt(this.pos) || void 0
    }
    next() {
        if (this.pos < this.string.length) return this.string.charAt(this.pos++)
    }
    eat(e) {
        let t = this.string.charAt(this.pos),
            n;
        if (typeof e == "string" ? n = t == e : n = t && (e instanceof RegExp ? e.test(t) : e(t)), n) return ++this.pos, t
    }
    eatWhile(e) {
        let t = this.pos;
        for (; this.eat(e););
        return this.pos > t
    }
    eatSpace() {
        let e = this.pos;
        for (;
            /[\s\u00a0]/.test(this.string.charAt(this.pos));) ++this.pos;
        return this.pos > e
    }
    skipToEnd() {
        this.pos = this.string.length
    }
    skipTo(e) {
        let t = this.string.indexOf(e, this.pos);
        if (t > -1) return this.pos = t, !0
    }
    backUp(e) {
        this.pos -= e
    }
    column() {
        return this.lastColumnPos < this.start && (this.lastColumnValue = Ct(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue
    }
    indentation() {
        var e;
        return (e = this.overrideIndent) !== null && e !== void 0 ? e : Ct(this.string, null, this.tabSize)
    }
    match(e, t, n) {
        if (typeof e == "string") {
            let r = l => n ? l.toLowerCase() : l,
                s = this.string.substr(this.pos, e.length);
            return r(s) == r(e) ? (t !== !1 && (this.pos += e.length), !0) : null
        } else {
            let r = this.string.slice(this.pos).match(e);
            return r && r.index > 0 ? null : (r && t !== !1 && (this.pos += r[0].length), r)
        }
    }
    current() {
        return this.string.slice(this.start, this.pos)
    }
}

function vr(i) {
    return {
        name: i.name || "",
        token: i.token,
        blankLine: i.blankLine || (() => {}),
        startState: i.startState || (() => !0),
        copyState: i.copyState || Sr,
        indent: i.indent || (() => null),
        languageData: i.languageData || {},
        tokenTable: i.tokenTable || st,
        mergeTokens: i.mergeTokens !== !1
    }
}

function Sr(i) {
    if (typeof i != "object") return i;
    let e = {};
    for (let t in i) {
        let n = i[t];
        e[t] = n instanceof Array ? n.slice() : n
    }
    return e
}
const Pt = new WeakMap;
class rn extends U {
    constructor(e) {
        let t = Rt(e.languageData),
            n = vr(e),
            r, s = new class extends _t {
                createParse(l, o, a) {
                    return new Cr(r, l, o, a)
                }
            };
        super(t, s, [], e.name), this.topNode = Nr(t, this), r = this, this.streamParser = n, this.stateAfter = new b({
            perNode: !0
        }), this.tokenTable = e.tokenTable ? new an(n.tokenTable) : Tr
    }
    static define(e) {
        return new rn(e)
    }
    getIndent(e) {
        let t, {
            overrideIndentation: n
        } = e.options;
        n && (t = Pt.get(e.state), t != null && t < e.pos - 1e4 && (t = void 0));
        let r = it(this, e.node.tree, e.node.from, e.node.from, t ? ? e.pos),
            s, l;
        if (r ? (l = r.state, s = r.pos + 1) : (l = this.streamParser.startState(e.unit), s = e.node.from), e.pos - s > 1e4) return null;
        for (; s < e.pos;) {
            let a = e.state.doc.lineAt(s),
                h = Math.min(e.pos, a.to);
            if (a.length) {
                let f = n ? n(a.from) : -1,
                    u = new nn(a.text, e.state.tabSize, e.unit, f < 0 ? void 0 : f);
                for (; u.pos < h - a.from;) ln(this.streamParser.token, u, l)
            } else this.streamParser.blankLine(l, e.unit);
            if (h == e.pos) break;
            s = a.to + 1
        }
        let o = e.lineAt(e.pos);
        return n && t == null && Pt.set(e.state, o.from), this.streamParser.indent(l, /^\s*(.*)/.exec(o.text)[1], e)
    }
    get allowsNesting() {
        return !1
    }
}

function it(i, e, t, n, r) {
    let s = t >= n && t + e.length <= r && e.prop(i.stateAfter);
    if (s) return {
        state: i.streamParser.copyState(s),
        pos: t + e.length
    };
    for (let l = e.children.length - 1; l >= 0; l--) {
        let o = e.children[l],
            a = t + e.positions[l],
            h = o instanceof S && a < r && it(i, o, a, n, r);
        if (h) return h
    }
    return null
}

function sn(i, e, t, n, r) {
    if (r && t <= 0 && n >= e.length) return e;
    !r && t == 0 && e.type == i.topNode && (r = !0);
    for (let s = e.children.length - 1; s >= 0; s--) {
        let l = e.positions[s],
            o = e.children[s],
            a;
        if (l < n && o instanceof S) {
            if (!(a = sn(i, o, t - l, n - l, r))) break;
            return r ? new S(e.type, e.children.slice(0, s).concat(a), e.positions.slice(0, s + 1), l + a.length) : a
        }
    }
    return null
}

function Ar(i, e, t, n, r) {
    for (let s of e) {
        let l = s.from + (s.openStart ? 25 : 0),
            o = s.to - (s.openEnd ? 25 : 0),
            a = l <= t && o > t && it(i, s.tree, 0 - s.offset, t, o),
            h;
        if (a && a.pos <= n && (h = sn(i, s.tree, t + s.offset, a.pos + s.offset, !1))) return {
            state: a.state,
            tree: h
        }
    }
    return {
        state: i.streamParser.startState(r ? Ee(r) : 4),
        tree: S.empty
    }
}
class Cr {
    constructor(e, t, n, r) {
        this.lang = e, this.input = t, this.fragments = n, this.ranges = r, this.stoppedAt = null, this.chunks = [], this.chunkPos = [], this.chunk = [], this.chunkReused = void 0, this.rangeIndex = 0, this.to = r[r.length - 1].to;
        let s = ce.get(),
            l = r[0].from,
            {
                state: o,
                tree: a
            } = Ar(e, n, l, this.to, s ? .state);
        this.state = o, this.parsedPos = this.chunkStart = l + a.length;
        for (let h = 0; h < a.children.length; h++) this.chunks.push(a.children[h]), this.chunkPos.push(a.positions[h]);
        s && this.parsedPos < s.viewport.from - 1e5 && r.some(h => h.from <= s.viewport.from && h.to >= s.viewport.from) && (this.state = this.lang.streamParser.startState(Ee(s.state)), s.skipUntilInView(this.parsedPos, s.viewport.from), this.parsedPos = s.viewport.from), this.moveRangeIndex()
    }
    advance() {
        let e = ce.get(),
            t = this.stoppedAt == null ? this.to : Math.min(this.to, this.stoppedAt),
            n = Math.min(t, this.chunkStart + 512);
        for (e && (n = Math.min(n, e.viewport.to)); this.parsedPos < n;) this.parseLine(e);
        return this.chunkStart < this.parsedPos && this.finishChunk(), this.parsedPos >= t ? this.finish() : e && this.parsedPos >= e.viewport.to ? (e.skipUntilInView(this.parsedPos, t), this.finish()) : null
    }
    stopAt(e) {
        this.stoppedAt = e
    }
    lineAfter(e) {
        let t = this.input.chunk(e);
        if (this.input.lineChunks) t == `
` && (t = "");
        else {
            let n = t.indexOf(`
`);
            n > -1 && (t = t.slice(0, n))
        }
        return e + t.length <= this.to ? t : t.slice(0, this.to - e)
    }
    nextLine() {
        let e = this.parsedPos,
            t = this.lineAfter(e),
            n = e + t.length;
        for (let r = this.rangeIndex;;) {
            let s = this.ranges[r].to;
            if (s >= n || (t = t.slice(0, s - (n - t.length)), r++, r == this.ranges.length)) break;
            let l = this.ranges[r].from,
                o = this.lineAfter(l);
            t += o, n = l + o.length
        }
        return {
            line: t,
            end: n
        }
    }
    skipGapsTo(e, t, n) {
        for (;;) {
            let r = this.ranges[this.rangeIndex].to,
                s = e + t;
            if (n > 0 ? r > s : r >= s) break;
            let l = this.ranges[++this.rangeIndex].from;
            t += l - r
        }
        return t
    }
    moveRangeIndex() {
        for (; this.ranges[this.rangeIndex].to < this.parsedPos;) this.rangeIndex++
    }
    emitToken(e, t, n, r) {
        let s = 4;
        if (this.ranges.length > 1) {
            r = this.skipGapsTo(t, r, 1), t += r;
            let o = this.chunk.length;
            r = this.skipGapsTo(n, r, -1), n += r, s += this.chunk.length - o
        }
        let l = this.chunk.length - 4;
        return this.lang.streamParser.mergeTokens && s == 4 && l >= 0 && this.chunk[l] == e && this.chunk[l + 2] == t ? this.chunk[l + 2] = n : this.chunk.push(e, t, n, s), r
    }
    parseLine(e) {
        let {
            line: t,
            end: n
        } = this.nextLine(), r = 0, {
            streamParser: s
        } = this.lang, l = new nn(t, e ? e.state.tabSize : 4, e ? Ee(e.state) : 2);
        if (l.eol()) s.blankLine(this.state, l.indentUnit);
        else
            for (; !l.eol();) {
                let o = ln(s.token, l, this.state);
                if (o && (r = this.emitToken(this.lang.tokenTable.resolve(o), this.parsedPos + l.start, this.parsedPos + l.pos, r)), l.start > 1e4) break
            }
        this.parsedPos = n, this.moveRangeIndex(), this.parsedPos < this.to && this.parsedPos++
    }
    finishChunk() {
        let e = S.build({
            buffer: this.chunk,
            start: this.chunkStart,
            length: this.parsedPos - this.chunkStart,
            nodeSet: Pr,
            topID: 0,
            maxBufferLength: 512,
            reused: this.chunkReused
        });
        e = new S(e.type, e.children, e.positions, e.length, [
            [this.lang.stateAfter, this.lang.streamParser.copyState(this.state)]
        ]), this.chunks.push(e), this.chunkPos.push(this.chunkStart - this.ranges[0].from), this.chunk = [], this.chunkReused = void 0, this.chunkStart = this.parsedPos
    }
    finish() {
        return new S(this.lang.topNode, this.chunks, this.chunkPos, this.parsedPos - this.ranges[0].from).balance()
    }
}

function ln(i, e, t) {
    e.start = e.pos;
    for (let n = 0; n < 10; n++) {
        let r = i(e, t);
        if (e.pos > e.start) return r
    }
    throw new Error("Stream parser failed to advance stream.")
}
const st = Object.create(null),
    we = [z.none],
    Pr = new Ye(we),
    Tt = [],
    Nt = Object.create(null),
    on = Object.create(null);
for (let [i, e] of [
        ["variable", "variableName"],
        ["variable-2", "variableName.special"],
        ["string-2", "string.special"],
        ["def", "variableName.definition"],
        ["tag", "tagName"],
        ["attribute", "attributeName"],
        ["type", "typeName"],
        ["builtin", "variableName.standard"],
        ["qualifier", "modifier"],
        ["error", "invalid"],
        ["header", "heading"],
        ["property", "propertyName"]
    ]) on[i] = hn(st, e);
class an {
    constructor(e) {
        this.extra = e, this.table = Object.assign(Object.create(null), on)
    }
    resolve(e) {
        return e ? this.table[e] || (this.table[e] = hn(this.extra, e)) : 0
    }
}
const Tr = new an(st);

function Ue(i, e) {
    Tt.indexOf(i) > -1 || (Tt.push(i), console.warn(e))
}

function hn(i, e) {
    let t = [];
    for (let o of e.split(" ")) {
        let a = [];
        for (let h of o.split(".")) {
            let f = i[h] || k[h];
            f ? typeof f == "function" ? a.length ? a = a.map(f) : Ue(h, `Modifier ${h} used at start of tag`) : a.length ? Ue(h, `Tag ${h} used as modifier`) : a = Array.isArray(f) ? f : [f] : Ue(h, `Unknown highlighting tag ${h}`)
        }
        for (let h of a) t.push(h)
    }
    if (!t.length) return 0;
    let n = e.replace(/ /g, "_"),
        r = n + " " + t.map(o => o.id),
        s = Nt[r];
    if (s) return s.id;
    let l = Nt[r] = z.define({
        id: we.length,
        name: n,
        props: [Dn({
            [n]: t
        })]
    });
    return we.push(l), l.id
}

function Nr(i, e) {
    let t = z.define({
        id: we.length,
        name: "Document",
        props: [ae.add(() => i), Ut.add(() => n => e.getIndent(n))],
        top: !0
    });
    return we.push(t), t
}
ht.RTL, ht.LTR;
export {
    Lr as A, Hr as B, jr as C, mn as D, zr as E, rt as H, v as I, Er as L, Ye as N, _t as P, rn as S, S as T, z as a, b, qe as c, Fr as d, K as e, Zn as f, Rr as g, Br as h, Ut as i, yr as j, _r as k, Dr as l, Ln as m, Rt as n, Fn as o, Mr as p, Ur as q, Wr as r, Dn as s, k as t, jt as u, Wt as v, Vn as w, Hn as x, Ne as y, Ee as z
};
//# sourceMappingURL=1bc04b52-nn3a79pgrrxatkgx.js.map