import {
    c as U,
    j as T,
    n as L,
    p as Q,
    r as C,
    x as $
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    b_ as D,
    e as G,
    mD as K,
    mE as V,
    vR as q,
    ff as Y,
    vE as F,
    q as W,
    rT as B,
    gS as J,
    vS as X,
    _ as Z,
    ei as w,
    mF as ee,
    n as te,
    sC as se,
    cM as ne,
    b8 as ae,
    uV as re,
    da as oe,
    c1 as ie
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    bb as ce,
    bc as le,
    bd as de,
    be as fe,
    bf as ue,
    bg as me,
    bh as he,
    bi as pe,
    bj as Ce
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    C as ye
} from "./ecba71b4-jgxp9f97lbrsokiw.js";
import {
    C as Ee
} from "./37827fd8-na0njwv6fxmwz5r3.js";
var Te = {};

function xe(m) {
    "use forget";
    const e = U.c(7),
        {
            gizmoId: n,
            urlThreadId: c,
            clientThreadId: h,
            children: r
        } = m,
        t = ce(),
        s = le(c ? ? h, n, t);
    let a;
    e[0] !== r || e[1] !== s || e[2] !== c ? (a = T.jsx(Ee, {
        urlThreadId: c,
        conversation: s,
        children: r
    }), e[0] = r, e[1] = s, e[2] = c, e[3] = a) : a = e[3];
    let l;
    return e[4] !== s || e[5] !== a ? (l = T.jsx(be, {
        conversation: s,
        children: a
    }), e[4] = s, e[5] = a, e[6] = l) : l = e[6], l
}

function Se() {
    "use no forget";
    const m = C.useRef(!1);
    m.current || !W("3837765068") || (m.current = !0, me("pageload"))
}

function be(m) {
    "use forget";
    const e = U.c(37),
        {
            conversation: n,
            children: c
        } = m;
    let h;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (h = {}, e[0] = h) : h = e[0];
    const r = D.useStoreWithInit(h),
        t = G(ge),
        y = G(ve),
        u = K(),
        s = V();
    let a;
    e[1] !== n ? (a = () => B(n), e[1] = n, e[2] = a) : a = e[2];
    const l = G(a),
        d = L(),
        [E] = Q();
    let S;
    e[3] !== d.pathname ? (S = de(d.pathname), e[3] = d.pathname, e[4] = S) : S = e[4];
    const N = !!S;
    Se();
    let k;
    e[5] !== l ? (k = {
        isNewConversation: l
    }, e[5] = l, e[6] = k) : k = e[6];
    let b, v;
    e[7] !== y || e[8] !== t || e[9] !== E ? (b = () => {
        const o = E.get(J) === "true",
            i = E.get(X) === "true";
        i !== y && F.set(i), t !== o && (Y.set(o), o && Z.logEvent("Enable Temporary Chat"))
    }, v = [t, y, E], e[7] = y, e[8] = t, e[9] = E, e[10] = b, e[11] = v) : (b = e[10], v = e[11]), C.useEffect(b, v);
    let g, _;
    e[12] !== s || e[13] !== u || e[14] !== t || e[15] !== r ? (g = () => {
        if (!t) return;
        const o = u === ie.Research,
            i = w != null && s.has(w);
        if (!o && !i) return;
        const O = i ? new Set(s) : s;
        if (i && w && O.delete(w), O.size === 0 && ee(u)) {
            r.setState({
                activeSystemHintType: null,
                activeConnectorSystemTypes: O
            });
            return
        }
        r.setState({
            activeSystemHintType: o ? null : u,
            activeConnectorSystemTypes: O
        })
    }, _ = [s, u, t, r], e[12] = s, e[13] = u, e[14] = t, e[15] = r, e[16] = g, e[17] = _) : (g = e[16], _ = e[17]), C.useEffect(g, _);
    let R;
    e[18] !== d.state ? (R = () => {
        d.state ? .focusObject && he.setFocusedObject(d.state.focusObject)
    }, e[18] = d.state, e[19] = R) : R = e[19];
    const z = d.state ? .focusObject;
    let I;
    e[20] !== z ? (I = [z], e[20] = z, e[21] = I) : I = e[21], C.useEffect(R, I);
    const f = $();
    let P, j;
    e[22] !== f ? (P = () => {
        te() && pe(f)
    }, j = [f], e[22] = f, e[23] = P, e[24] = j) : (P = e[23], j = e[24]), C.useEffect(P, j);
    let x, H;
    e[25] !== t || e[26] !== f ? (x = () => se(oe, {
        completionFinished: o => {
            if (o.serverThreadId != null && !t) {
                const i = ne(o.serverThreadId) ? .mode;
                i ? .kind === ae.GizmoInteraction && re.handleGizmoInteracted(f, i.gizmo_id)
            }
        }
    }), H = [t, f], e[25] = t, e[26] = f, e[27] = x, e[28] = H) : (x = e[27], H = e[28]), C.useEffect(x, H), q(), fe();
    let p;
    e[29] !== n || e[30] !== N ? (p = N && T.jsx(ue, {
        clientThreadId: n.id
    }), e[29] = n, e[30] = N, e[31] = p) : p = e[31];
    let A;
    e[32] === Symbol.for("react.memo_cache_sentinel") ? (A = T.jsx(Ce, {}), e[32] = A) : A = e[32];
    let M;
    return e[33] !== c || e[34] !== n || e[35] !== p ? (M = T.jsxs(ye, {
        conversation: n,
        redirects: p,
        children: [A, c]
    }), e[33] = c, e[34] = n, e[35] = p, e[36] = M) : M = e[36], M
}

function ve() {
    return F()
}

function ge() {
    return Y()
}
typeof window < "u" && (window._g = Te.GOKU_SERVICE);
export {
    xe as C
};
//# sourceMappingURL=47edf3d1-kep97c5boao7mh9l.js.map