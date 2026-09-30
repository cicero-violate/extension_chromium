import {
    c as O,
    r as I
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    b9 as U,
    d as $,
    fB as P,
    e as M,
    vK as R,
    dP as G,
    cA as w,
    _ as q,
    vL as x,
    vM as y,
    c$ as F,
    bN as k
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    r as B
} from "./7f00cfec-f04y2v5idy58f22s.js";
import {
    aE as H
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
const _ = U(() => $(new Set)),
    N = U(() => $(null));

function J(r) {
    const e = G(),
        l = w(r);
    if (!e || !l) return !1;
    const h = R() ? .canUserEnable,
        i = N(r);
    return h && i != null
}

function Q(r) {
    "use forget";
    const e = O.c(24),
        {
            conversationMode: l
        } = r,
        t = P(),
        [h, i] = I.useState(!1),
        a = M(R);
    let c;
    e[0] !== t ? (c = () => t ? w(t) : !1, e[0] = t, e[1] = c) : c = e[1];
    const d = M(c),
        n = !!(d && a ? .isAdultSearchEnabled),
        m = t ? .id ? ? void 0;
    let o;
    e[2] !== t ? (o = t ? s => B({
        callsiteId: "request_completion.aura.adult_search.utils.1",
        conversation: t,
        ...s
    }) : void 0, e[2] = t, e[3] = o) : o = e[3];
    let u;
    e[4] !== l || e[5] !== m || e[6] !== o ? (u = {
        clientThreadId: m,
        conversationMode: l,
        onRequestCompletion: o
    }, e[4] = l, e[5] = m, e[6] = o, e[7] = u) : u = e[7];
    const b = H(u);
    let g;
    e[8] !== a ? .canUserEnable || e[9] !== a ? .isAdultSearchEnabled || e[10] !== d ? (g = async s => {
        !d || s === a ? .isAdultSearchEnabled || a ? .canUserEnable === !1 || (q.logStructuredEvent(x, {
            step: y.ATLAS_SAFE_SEARCH_TOGGLE_ACTION_STEP_TOGGLE,
            fromEnabled: !a ? .isAdultSearchEnabled,
            toEnabled: !s
        }), i(!0), await F() ? .updateAdultSearchSetting({
            isAdultSearchEnabled: s,
            canUserEnable: !0
        }), i(!1))
    }, e[8] = a ? .canUserEnable, e[9] = a ? .isAdultSearchEnabled, e[10] = d, e[11] = g) : g = e[11];
    const p = g;
    let f;
    e[12] !== t || e[13] !== b ? (f = () => {
        if (!t) return;
        const [s, L] = k(() => [N(t), _(t)]);
        s && !s.safeSearchOff && !L.has(s.messageId) && (_.set(t, L.add(s.messageId)), b({
            sourceEvent: new Event("click"),
            nodeId: s.messageId
        }))
    }, e[12] = t, e[13] = b, e[14] = f) : f = e[14];
    const v = I.useEffectEvent(f);
    let A;
    e[15] !== v || e[16] !== n ? (A = () => {
        n && v()
    }, e[15] = v, e[16] = n, e[17] = A) : A = e[17];
    let S;
    e[18] !== n ? (S = [n], e[18] = n, e[19] = S) : S = e[19], I.useEffect(A, S);
    const C = a ? .isAdultSearchEnabled,
        T = h || !a;
    let E;
    return e[20] !== p || e[21] !== T || e[22] !== C ? (E = {
        isAdultSearchEnabled: C,
        handleToggleSetting: p,
        isLoading: T
    }, e[20] = p, e[21] = T, e[22] = C, e[23] = E) : E = e[23], E
}
export {
    N as l, J as s, Q as u
};
//# sourceMappingURL=6fd89734-e246szx8pk7yijni.js.map