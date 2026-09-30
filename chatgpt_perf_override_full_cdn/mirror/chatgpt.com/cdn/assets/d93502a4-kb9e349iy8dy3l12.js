import {
    c as x,
    r as E,
    j as N
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    e as v,
    d as j,
    bN as R
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    S as B
} from "./77a251d8-ki2u6aaeuhtt02gd.js";
import {
    S as C
} from "./52ac6121-m7z0qcro3hdwwo6n.js";
const A = j(null, {
        name: "activeAudioOwnerId$"
    }),
    O = j({}, {
        name: "rememberedMutedPreferenceByKey$"
    });

function I(s) {
    A.set(e => e === s ? e : s)
}

function $(s) {
    A.set(e => e === s ? null : e)
}

function F(s) {
    if (s) return R(() => O()[s])
}

function G(s, e) {
    s && O.set(t => s in t ? t : { ...t,
        [s]: e
    })
}

function k(s, e) {
    s && O.set(t => ({ ...t,
        [s]: e
    }))
}

function H(s) {
    "use forget";
    const e = x.c(7),
        {
            memoryKey: t,
            initialMuted: i
        } = s;
    let n;
    e[0] !== t ? (n = () => {
        if (t) return O()[t]
    }, e[0] = t, e[1] = n) : n = e[1];
    const o = v(n) ? ? i;
    let u;
    e[2] !== t ? (u = l => {
        k(t, l)
    }, e[2] = t, e[3] = u) : u = e[3];
    const c = u;
    let r;
    return e[4] !== o || e[5] !== c ? (r = {
        isMuted: o,
        setMuted: c
    }, e[4] = o, e[5] = c, e[6] = r) : r = e[6], r
}

function J(s) {
    "use forget";
    const e = x.c(22),
        {
            ownerId: t,
            isMuted: i,
            canOwnAudio: n,
            onMutedChange: d
        } = s,
        o = v(A),
        u = o === t,
        c = n && !i;
    let r;
    e[0] !== t ? (r = () => $(t), e[0] = t, e[1] = r) : r = e[1];
    const l = r;
    let f, a;
    e[2] !== o || e[3] !== u || e[4] !== t || e[5] !== c ? (f = () => {
        if (!c) {
            $(t);
            return
        }(o == null || u) && I(t)
    }, a = [o, u, t, c], e[2] = o, e[3] = u, e[4] = t, e[5] = c, e[6] = f, e[7] = a) : (f = e[6], a = e[7]), E.useEffect(f, a);
    let m, M;
    e[8] !== t ? (m = () => () => {
        $(t)
    }, M = [t], e[8] = t, e[9] = m, e[10] = M) : (m = e[9], M = e[10]), E.useEffect(m, M);
    let g;
    e[11] !== n || e[12] !== d || e[13] !== t ? (g = S => {
        S || !n ? $(t) : I(t), d(S)
    }, e[11] = n, e[12] = d, e[13] = t, e[14] = g) : g = e[14];
    const V = g;
    let p;
    e[15] !== i || e[16] !== V ? (p = () => {
        V(!i)
    }, e[15] = i, e[16] = V, e[17] = p) : p = e[17];
    const h = p,
        w = i || !n || !u;
    let b;
    return e[18] !== l || e[19] !== w || e[20] !== h ? (b = {
        shouldMute: w,
        releaseAudio: l,
        toggleMuted: h
    }, e[18] = l, e[19] = w, e[20] = h, e[21] = b) : b = e[21], b
}

function L(s) {
    "use forget";
    const e = x.c(3),
        {
            muted: t,
            className: i
        } = s,
        n = i === void 0 ? "h-5 w-5 text-white" : i,
        d = t ? B : C;
    let o;
    return e[0] !== d || e[1] !== n ? (o = N.jsx(d, {
        "aria-hidden": !0,
        className: n
    }), e[0] = d, e[1] = n, e[2] = o) : o = e[2], o
}
export {
    L as S, H as a, I as c, F as g, G as r, k as s, J as u
};
//# sourceMappingURL=d93502a4-kb9e349iy8dy3l12.js.map