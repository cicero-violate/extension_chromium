class m {
    constructor(n, o) {
        this.compare = n, this.maxSize = o
    }
    store = [];
    push(n) {
        const o = this.store;
        o.length < this.maxSize ? (o.push(n), S(this.store, this.compare)) : this.compare(n, o[0]) > 0 && (o[0] = n, u(this.store, this.compare))
    }
    pop() {
        const n = this.store,
            o = n[0],
            e = n.pop();
        return n.length > 0 && (n[0] = e, u(this.store, this.compare)), o
    }
    toArray(n) {
        const o = this.store.length,
            e = new Array(o);
        for (let i = o - 1; i >= 0; i--) {
            const c = this.pop();
            e[i] = n ? n(c) : c
        }
        return e
    }
}

function S(t, n) {
    let o = t.length - 1;
    for (; o > 0;) {
        const e = Math.floor((o - 1) / 2);
        if (n(t[e], t[o]) <= 0) break;
        [t[e], t[o]] = [t[o], t[e]], o = e
    }
}

function u(t, n) {
    let o = 0;
    for (let e = 1; e < t.length; e = o * 2 + 1) {
        const i = e + 1,
            c = i < t.length && n(t[i], t[e]) < 0 ? i : e;
        if (n(t[o], t[c]) <= 0) break;
        [t[o], t[c]] = [t[c], t[o]], o = c
    }
}

function N(t, n, o, {
    locale: e,
    maxResults: i = 50
} = {}) {
    const c = n.toLocaleLowerCase();
    if (!c) return t;
    const h = new m((l, s) => l.score - s.score, i);
    for (let l = 0; l < t.length; l++) {
        const {
            targets: s,
            weight: r = 1
        } = o(t[l]);
        let f = 0;
        for (let a = 0; a < s.length; a++) {
            const g = s[a];
            if (g) {
                const A = g.toLowerCase(),
                    p = w(A, c, e);
                p > f && (f = p)
            }
        }
        f > 0 && h.push({
            value: t[l],
            score: f * r
        })
    }
    return h.toArray(l => l.value)
}

function w(t, n, o) {
    if (n.length === 0 || n.length > t.length || !t.includes(n[0]) || n.length > 1 && !t.includes(n[n.length - 1])) return 0;
    const e = [];
    for (let s = 0, r = 0; s < t.length && r < n.length; s++) t.charCodeAt(s) === n.charCodeAt(r) && (e.push(s), r++);
    if (e.length !== n.length) return 0;
    for (let s = e.length - 2; s >= 0; s--) {
        const r = e[s + 1] - 1;
        e[s] < r && t.charCodeAt(r) === n.charCodeAt(s) && (e[s] = r)
    }
    const i = e[0];
    let c = 0,
        h = 0,
        l = d(t, e[0], o) ? 1 : 0;
    for (let s = 1; s < e.length; s++) {
        const r = e[s] - e[s - 1];
        r === 1 ? c++ : (h += r - 1, l += d(t, e[s], o) ? 1 : 0)
    }
    return C * e.length + _ * c + T * (i === 0 ? 1 : 0) + z * l + L * h + E * i
}
const C = 5,
    _ = 10,
    T = 5,
    z = 15,
    L = -5,
    E = -.2;

function d(t, n, o) {
    if (typeof Intl.Segmenter == "function") {
        const e = new Intl.Segmenter(o, {
            granularity: "word"
        }).segment(t);
        if (typeof e.containing == "function") {
            const i = e.containing(n);
            if (!i) return !1;
            const c = i.segment ? .[n - i.index - 1];
            return i.isWordLike === !0 && (i.index === n || c === "_")
        }
    }
    return !1
}
export {
    w as a, N as f
};
//# sourceMappingURL=bd382fd5-bcke632cms89jbha.js.map