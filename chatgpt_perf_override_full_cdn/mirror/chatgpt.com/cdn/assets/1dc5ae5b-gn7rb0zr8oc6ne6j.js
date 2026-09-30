const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/6417efb6-ddsvtha1x1ogmoni.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/conversation-small-cqp6votf.css"]))) => i.map(i => d[i]);
import {
    _ as g,
    c as _,
    r as h,
    j as r,
    a0 as x,
    ac as S
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    ch as j,
    so as C,
    vg as v,
    be as b,
    qj as p
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    C as I
} from "./37827fd8-na0njwv6fxmwz5r3.js";
import {
    dy as D
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
j(() => g(() =>
    import ("./6417efb6-ddsvtha1x1ogmoni.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5])).then(t => t.Leva));

function O() {
    "use forget";
    const t = _.c(7),
        [e, m] = h.useState(R);
    let l, s;
    t[0] === Symbol.for("react.memo_cache_sentinel") ? (l = () => E, s = [], t[0] = l, t[1] = s) : (l = t[0], s = t[1]), h.useEffect(l, s);
    let a;
    t[2] === Symbol.for("react.memo_cache_sentinel") ? (a = r.jsx(y, {
        children: r.jsx(x, {})
    }), t[2] = a) : a = t[2];
    let o;
    t[3] !== e ? (o = null, t[3] = e, t[4] = o) : o = t[4];
    let n;
    return t[5] !== o ? (n = r.jsxs(r.Fragment, {
        children: [a, o]
    }), t[5] = o, t[6] = n) : n = t[6], n
}

function E() {}

function R() {
    return !1
}

function y(t) {
    "use forget";
    const e = _.c(12),
        {
            children: m
        } = t,
        l = C(),
        {
            gizmoSlug: s
        } = S();
    let a;
    e[0] !== s ? (a = s ? v(s) : void 0, e[0] = s, e[1] = a) : a = e[1];
    const o = a;
    let n, u;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (n = b(p), u = r.jsx(r.Fragment, {}), e[2] = n, e[3] = u) : (n = e[2], u = e[3]);
    let i;
    e[4] !== m || e[5] !== o ? (i = r.jsx(I, {
        conversation: n,
        threadHeader: u,
        sidebarGizmoIdOverride: o,
        children: m
    }), e[4] = m, e[5] = o, e[6] = i) : i = e[6];
    const d = l ? ? p;
    let c;
    e[7] !== d ? (c = r.jsx(D, {
        clientThreadId: d
    }), e[7] = d, e[8] = c) : c = e[8];
    let f;
    return e[9] !== i || e[10] !== c ? (f = r.jsxs(r.Fragment, {
        children: [i, c]
    }), e[9] = i, e[10] = c, e[11] = f) : f = e[11], f
}
export {
    O as C
};
//# sourceMappingURL=1dc5ae5b-gn7rb0zr8oc6ne6j.js.map