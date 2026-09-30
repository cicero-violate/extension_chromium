import {
    c as ae,
    u as ce,
    r as $,
    j as s,
    o as q,
    h as de
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    sg as fe,
    az as le,
    J as ue,
    n as pe,
    D as ge,
    r as H,
    C as Q,
    at as me,
    ay as Me,
    wg as W,
    aw as Z,
    a0 as ke,
    aV as L
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    l as he,
    hj as Ce,
    hk as ye,
    hl as xe
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function Pe() {
    "use forget";
    const l = ae.c(2),
        e = fe(le.CookieManagement);
    let i;
    return l[0] !== e ? (i = e ? s.jsx(je, {
        onClose: be
    }) : null, l[0] = e, l[1] = i) : i = l[1], i
}

function be() {
    Me.closeModal(le.CookieManagement)
}

function je(l) {
    "use forget";
    const e = ae.c(70),
        {
            onClose: i
        } = l,
        t = ce(),
        J = ue();
    let N;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (N = pe(), e[0] = N) : N = e[0];
    const I = !N,
        {
            data: X
        } = he(),
        n = X ? .serverPrimedAllowBrowserStorageValue ? ? !1,
        R = (X ? .isStorageComplianceEnabled ? ? !1) && !I;
    let F;
    e[1] !== n || e[2] !== R ? (F = {
        serverPrimedAllowBrowserStorageValue: n,
        enabled: R
    }, e[1] = n, e[2] = R, e[3] = F) : F = e[3];
    const ie = Ce(F),
        [ne, Y] = $.useState(n),
        K = I ? ne : ie,
        a = O => {
            H.setBooleanCookie(Q.AllowNonessential, O, {
                maxAge: xe,
                domain: me
            }), I ? Y(O) : re.mutateAsync({
                analytics_cookies_accepted: O
            }, {
                onSuccess() {
                    J.success(t.formatMessage(o.updateSuccess))
                },
                onError() {
                    J.danger(o.updateFailure, {
                        toastId: "manage_cookies_modal"
                    })
                }
            })
        };
    let B, T;
    e[4] !== n ? (B = () => {
        if (I) {
            const O = H.getBooleanCookie(Q.AllowNonessential) ? ? n;
            Y(O)
        }
    }, T = [I, n], e[4] = n, e[5] = B, e[6] = T) : (B = e[5], T = e[6]), $.useEffect(B, T);
    let z;
    e[7] === Symbol.for("react.memo_cache_sentinel") ? (z = [], e[7] = z) : z = e[7], $.useEffect(_e, z);
    const re = ye();
    let r;
    e[8] !== t ? (r = t.formatMessage(o.title), e[8] = t, e[9] = r) : r = e[9];
    let D;
    e[10] === Symbol.for("react.memo_cache_sentinel") ? (D = s.jsx(q, { ...o.description,
        values: {
            cookiePolicy: Ae
        }
    }), e[10] = D) : D = e[10];
    let c;
    e[11] !== t ? (c = t.formatMessage(o.preference1title), e[11] = t, e[12] = c) : c = e[12];
    let d;
    e[13] !== c ? (d = s.jsx(se, {
        children: c
    }), e[13] = c, e[14] = d) : d = e[14];
    let f;
    e[15] !== t ? (f = t.formatMessage(o.preference1desc), e[15] = t, e[16] = f) : f = e[16];
    let u;
    e[17] !== f ? (u = s.jsx(oe, {
        children: f
    }), e[17] = f, e[18] = u) : u = e[18];
    let p;
    e[19] !== d || e[20] !== u ? (p = s.jsxs(te, {
        children: [d, u]
    }), e[19] = d, e[20] = u, e[21] = p) : p = e[21];
    let g;
    e[22] !== t ? (g = t.formatMessage(o.preference1toggle), e[22] = t, e[23] = g) : g = e[23];
    let m;
    e[24] !== g ? (m = s.jsx(W, {
        checked: !0,
        disabled: !0,
        "aria-label": g
    }), e[24] = g, e[25] = m) : m = e[25];
    let M;
    e[26] !== p || e[27] !== m ? (M = s.jsxs(ee, {
        children: [p, m]
    }), e[26] = p, e[27] = m, e[28] = M) : M = e[28];
    let k;
    e[29] !== t ? (k = t.formatMessage(o.preference2title), e[29] = t, e[30] = k) : k = e[30];
    let h;
    e[31] !== k ? (h = s.jsx(se, {
        children: k
    }), e[31] = k, e[32] = h) : h = e[32];
    let C;
    e[33] !== t ? (C = t.formatMessage(o.preference2desc), e[33] = t, e[34] = C) : C = e[34];
    let y;
    e[35] !== C ? (y = s.jsx(oe, {
        children: C
    }), e[35] = C, e[36] = y) : y = e[36];
    let x;
    e[37] !== h || e[38] !== y ? (x = s.jsxs(te, {
        children: [h, y]
    }), e[37] = h, e[38] = y, e[39] = x) : x = e[39];
    let b;
    e[40] !== t ? (b = t.formatMessage(o.preference2toggle), e[40] = t, e[41] = b) : b = e[41];
    let j;
    e[42] !== a || e[43] !== K || e[44] !== b ? (j = s.jsx(W, {
        onCheckedChange: a,
        checked: K,
        "aria-label": b
    }), e[42] = a, e[43] = K, e[44] = b, e[45] = j) : j = e[45];
    let A;
    e[46] !== x || e[47] !== j ? (A = s.jsxs(ee, {
        children: [x, j]
    }), e[46] = x, e[47] = j, e[48] = A) : A = e[48];
    let _;
    e[49] !== a ? (_ = () => a(!1), e[49] = a, e[50] = _) : _ = e[50];
    let U;
    e[51] === Symbol.for("react.memo_cache_sentinel") ? (U = s.jsx(q, { ...o.reject
    }), e[51] = U) : U = e[51];
    let S;
    e[52] !== _ ? (S = s.jsx(Z, {
        color: "secondary",
        onClick: _,
        children: U
    }), e[52] = _, e[53] = S) : S = e[53];
    let w;
    e[54] !== a ? (w = () => a(!0), e[54] = a, e[55] = w) : w = e[55];
    let V;
    e[56] === Symbol.for("react.memo_cache_sentinel") ? (V = s.jsx(q, { ...o.accept
    }), e[56] = V) : V = e[56];
    let E;
    e[57] !== w ? (E = s.jsx(Z, {
        color: "secondary",
        onClick: w,
        children: V
    }), e[57] = w, e[58] = E) : E = e[58];
    let v;
    e[59] !== S || e[60] !== E ? (v = s.jsxs("div", {
        className: "flex justify-end gap-3 border-t border-black/10 pt-4 dark:border-white/10",
        children: [S, E]
    }), e[59] = S, e[60] = E, e[61] = v) : v = e[61];
    let P;
    e[62] !== M || e[63] !== A || e[64] !== v ? (P = s.jsxs("div", {
        className: "text-token-text-secondary text-sm",
        children: [D, M, A, v]
    }), e[62] = M, e[63] = A, e[64] = v, e[65] = P) : P = e[65];
    let G;
    return e[66] !== i || e[67] !== P || e[68] !== r ? (G = s.jsx(ke, {
        testId: "modal-manage-cookies",
        type: "success",
        isOpen: !0,
        onClose: i,
        title: r,
        showCloseButton: !0,
        children: P
    }), e[66] = i, e[67] = P, e[68] = r, e[69] = G) : G = e[69], G
}

function Ae(l) {
    return s.jsx("a", {
        className: "underline",
        href: "https://openai.com/policies/privacy-policy",
        children: l
    })
}

function _e() {
    ge.addAction("privacy_policy.show_manage_cookies_modal")
}
const ee = L.div `flex gap-4 border-t last:border-b border-black/10 dark:border-white/10 py-4 mt-4 text-token-text-secondary`,
    te = L.div `flex gap-2 flex-col `,
    se = L.p `font-semibold text-sm text-token-text-primary`,
    oe = L.p `text-xs`,
    o = de({
        title: {
            id: "ManageCookiesModal.title",
            defaultMessage: "Manage cookies"
        },
        description: {
            id: "ManageCookiesModal.description",
            defaultMessage: "OpenAI uses cookies to improve your experience and analyze site traffic. For more information, read our <cookiePolicy>cookie policy</cookiePolicy>."
        },
        preference1title: {
            id: "ManageCookiesModal.preference1title",
            defaultMessage: "Essential"
        },
        preference1desc: {
            id: "ManageCookiesModal.preference1desc.0",
            defaultMessage: "These cookies are required to operate our Services. For example, they allow us to authenticate users or enable specific features within the Services, including for security purposes."
        },
        preference1toggle: {
            id: "ManageCookiesModal.preference1toggle",
            defaultMessage: "Allow essential cookies"
        },
        preference2title: {
            id: "ManageCookiesModal.preference2title",
            defaultMessage: "Analytics"
        },
        preference2desc: {
            id: "ManageCookiesModal.preference2desc.0",
            defaultMessage: "These cookies help us analyze and understand how our Services perform and are used, such as the number of users, how they interact with our Services, and time spent using the Services."
        },
        preference2toggle: {
            id: "ManageCookiesModal.preference2toggle",
            defaultMessage: "Allow analytics cookies"
        },
        reject: {
            id: "ManageCookiesModal.reject",
            defaultMessage: "Reject all"
        },
        accept: {
            id: "ManageCookiesModal.accept",
            defaultMessage: "Accept all"
        },
        updateSuccess: {
            id: "ManageCookiesModal.updateSuccess",
            defaultMessage: "Your cookie preferences were updated successfully"
        },
        updateFailure: {
            id: "ManageCookiesModal.updateFailure",
            defaultMessage: "Unable to update cookie preferences. Try again later."
        }
    });
export {
    je as ManageCookiesModal, Pe as
    default
};
//# sourceMappingURL=ba0ab623-b72nt1bc6z5v8q9y.js.map