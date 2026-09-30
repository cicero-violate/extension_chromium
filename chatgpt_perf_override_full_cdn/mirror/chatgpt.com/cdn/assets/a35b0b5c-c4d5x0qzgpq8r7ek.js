import {
    c as V,
    r as m,
    j as h
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    g as v,
    s as I,
    r as L
} from "./d93502a4-kb9e349iy8dy3l12.js";
const p = m.createContext(null);

function j(u, e) {
    L(u, e)
}

function C(u) {
    "use forget";
    const e = V.c(12),
        {
            children: d,
            initialMuted: x,
            memoryKey: t,
            preferInitialMuted: M
        } = u,
        i = x === void 0 ? !0 : x,
        a = M === void 0 ? !1 : M;
    let o;
    e[0] !== i || e[1] !== t || e[2] !== a ? (o = () => a || !t ? i : v(t) ? ? i, e[0] = i, e[1] = t, e[2] = a, e[3] = o) : o = e[3];
    const [l, b] = m.useState(o);
    let s;
    e[4] !== t ? (s = g => {
        b(g), I(t, g)
    }, e[4] = t, e[5] = s) : s = e[5];
    const c = s;
    let r;
    e[6] !== l || e[7] !== c ? (r = {
        isMuted: l,
        setMuted: c
    }, e[6] = l, e[7] = c, e[8] = r) : r = e[8];
    const f = r;
    let n;
    return e[9] !== d || e[10] !== f ? (n = h.jsx(p.Provider, {
        value: f,
        children: d
    }), e[9] = d, e[10] = f, e[11] = n) : n = e[11], n
}

function E() {
    "use forget";
    return m.useContext(p)
}
export {
    C as L, j as r, E as u
};
//# sourceMappingURL=a35b0b5c-c4d5x0qzgpq8r7ek.js.map