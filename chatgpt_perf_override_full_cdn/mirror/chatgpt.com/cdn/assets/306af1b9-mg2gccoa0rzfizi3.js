import {
    c as O,
    n as F,
    s as N,
    p as I,
    r as k
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    du as G,
    dt as Y,
    dv as H,
    dw as K,
    d0 as Q,
    dx as z
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    n as W,
    z as L,
    l as $,
    oG as V,
    eO as j,
    eT as q,
    x,
    r as C,
    C as v,
    c8 as J,
    ay as w,
    az as B
} from "./4813494d-javwxs2rmzsrunl2.js";

function te() {
    "use forget";
    const e = O.c(41);
    let a;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (a = W(), e[0] = a) : a = e[0];
    const d = a,
        h = L(),
        s = F(),
        u = N(),
        [i] = I();
    let l;
    e[1] !== s ? (l = G(s), e[1] = s, e[2] = l) : l = e[2];
    const m = l;
    let r;
    e[3] !== s ? (r = Y(s), e[3] = s, e[4] = r) : r = e[4];
    const o = r;
    let n;
    e[5] !== m || e[6] !== o || e[7] !== s ? (n = m || o, e[5] = m, e[6] = o, e[7] = s, e[8] = n) : n = e[8];
    let p;
    e[9] !== i ? (p = i.get(H), e[9] = i, e[10] = p) : p = e[10];
    const c = p === "true",
        t = !!(n && d);
    let P;
    e[11] !== h || e[12] !== t ? (P = t && h ? .isFree() === !0, e[11] = h, e[12] = t, e[13] = P) : P = e[13];
    const g = P;
    let y;
    e[14] !== t || e[15] !== o ? (y = {
        isModalOpen: t,
        isTeamPricingRoute: o
    }, e[14] = t, e[15] = o, e[16] = y) : y = e[16];
    const U = X(y);
    let b, A;
    e[17] !== u ? (b = () => {
        d && C.getBooleanCookie(v.ShowPaymentModal) && (C.deleteCookie(v.ShowPaymentModal), Q(u, "Show payment modal cookie"))
    }, A = [d, u], e[17] = u, e[18] = b, e[19] = A) : (b = e[18], A = e[19]), k.useEffect(b, A);
    let _, M;
    e[20] !== g ? (_ = () => {
        if (!g) return;
        const f = x("279651859");
        z({
            daysSuppressed: f.get("days_suppressed", 0),
            hideSidebar: f.get("hide_sidebar", !1),
            minutesDelayed: f.get("minutes_delayed", 0)
        })
    }, M = [g], e[20] = g, e[21] = _, e[22] = M) : (_ = e[21], M = e[22]), k.useEffect(_, M);
    let E;
    e[23] !== n || e[24] !== s.hash || e[25] !== s.pathname || e[26] !== s.search || e[27] !== c ? (E = () => {
        if (!d && n && c) {
            const f = new URL(window.location.href);
            f.pathname = s.pathname, f.search = s.search, f.hash = s.hash, J({
                fallbackScreenHint: "login",
                callbackUrl: f.toString(),
                shouldOpenPaymentModalOnAuth: !0,
                skipLoginModal: !1
            })
        }
    }, e[23] = n, e[24] = s.hash, e[25] = s.pathname, e[26] = s.search, e[27] = c, e[28] = E) : E = e[28];
    let D;
    e[29] !== n || e[30] !== s.hash || e[31] !== s.pathname || e[32] !== s.search || e[33] !== c ? (D = [d, n, s.hash, s.pathname, s.search, c], e[29] = n, e[30] = s.hash, e[31] = s.pathname, e[32] = s.search, e[33] = c, e[34] = D) : D = e[34], k.useEffect(E, D);
    let S, R;
    e[35] !== t ? (S = () => {
        t ? (w.closeAllActiveModals(), w.openModal(B.AccountPayment)) : w.closeModal(B.AccountPayment)
    }, R = [t], e[35] = t, e[36] = S, e[37] = R) : (S = e[36], R = e[37]), k.useEffect(S, R);
    let T;
    return e[38] !== U || e[39] !== t ? (T = {
        isOpen: t,
        defaultTab: U
    }, e[38] = U, e[39] = t, e[40] = T) : T = e[40], T
}

function X(e) {
    "use forget";
    const a = O.c(4),
        {
            isModalOpen: d,
            isTeamPricingRoute: h
        } = e,
        s = L(),
        u = $(),
        [i] = I();
    let l;
    a[0] !== i ? (l = i.get("cta_tab"), a[0] = i, a[1] = l) : l = a[1];
    const m = l;
    let r;
    a[2] !== i ? (r = i.get("default_tab"), a[2] = i, a[3] = r) : r = a[3];
    const o = r,
        n = i.get(K);
    if (!s || !u || !d) return "personal";
    if (m && ["personal", "business"].includes(m)) return m;
    if (o && ["personal", "business"].includes(o)) return o;
    if (n === "business") return "business";
    if (n === "plus") return "personal";
    if (h || s.isWorkspaceAccount() || V(u) || j && q()) return "business";
    const c = u.email_domain_type === "social";
    return s.isPlus() && x("3836630184").get("show_business_pricing_page", !1) ? "business" : s.isPlus() && c ? "personal" : s.isPlus() ? "business" : "personal"
}
export {
    te as a, X as u
};
//# sourceMappingURL=306af1b9-mg2gccoa0rzfizi3.js.map