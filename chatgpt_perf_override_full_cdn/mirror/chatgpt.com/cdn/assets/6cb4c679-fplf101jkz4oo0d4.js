const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/conversation-small-cqp6votf.css", "assets/32d174ae-nyd7bvqtd3q1stsk.js", "assets/150f7f4e-532i7b7v2cgfoi3l.js", "assets/6a35ae8e-iy63tz3yb9ue6t0y.js"]))) => i.map(i => d[i]);
import {
    c as F,
    _ as L,
    j as s,
    r as T,
    u as U,
    s as X
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    bN as Y,
    e as z,
    ch as $,
    af as W,
    J as K,
    a as q,
    N as G,
    fc as D,
    ga as Z,
    bY as ee,
    gb as te
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    lV as V,
    lW as se,
    lX as ne,
    gg as ae,
    iR as oe,
    fK as B,
    gi as le,
    gh as R,
    b_ as ie,
    di as re
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    P as ce
} from "./6a35ae8e-iy63tz3yb9ue6t0y.js";
import {
    J as H,
    a as ue,
    b as me
} from "./150f7f4e-532i7b7v2cgfoi3l.js";

function fe(n) {
    return Y(() => V()) === !0 ? n ? `/pulse?${se(window.location.search,n)}` : `/pulse?${ne(window.location.search)}` : "/tasks"
}
const de = $(() => L(() =>
        import ("./1a7ebd5f-csmwtrlxfshzkvs8.js").then(n => n.QI), __vite__mapDeps([0, 1, 2, 3, 4])).then(n => n.JawboneDeleteModal)),
    he = $(() => L(() =>
        import ("./32d174ae-nyd7bvqtd3q1stsk.js"), __vite__mapDeps([5, 1, 2, 3, 0, 4, 6, 7])).then(n => n.SugarboneMessageAttachmentInner)),
    ge = $(() => L(() =>
        import ("./32d174ae-nyd7bvqtd3q1stsk.js"), __vite__mapDeps([5, 1, 2, 3, 0, 4, 6, 7])).then(n => n.ViewPulseAutomationDropdownItem));

function Ie() {
    "use forget";
    const n = F.c(1);
    let e;
    return n[0] === Symbol.for("react.memo_cache_sentinel") ? (e = s.jsx(Q, {
        children: s.jsxs("div", {
            className: "flex h-full w-full flex-col justify-center py-4 ps-5 pe-3",
            children: [s.jsx("div", {
                className: "loading-results-shimmer bg-token-text-tertiary h-4 w-1/2 rounded-sm"
            }), s.jsx("div", {
                className: "loading-results-shimmer bg-token-text-tertiary mt-2.5 h-4 w-2/5 rounded-sm"
            })]
        })
    }), n[0] = e) : e = n[0], e
}

function Q(n) {
    "use forget";
    const e = F.c(6),
        {
            children: t,
            className: o,
            fullWidth: l
        } = n,
        u = l ? "w-full" : "inline-block max-w-[360px] min-w-[320px]";
    let a;
    e[0] !== o || e[1] !== u ? (a = W("border-token-border-default relative my-2 overflow-hidden rounded-xl border", u, o), e[0] = o, e[1] = u, e[2] = a) : a = e[2];
    let c;
    return e[3] !== t || e[4] !== a ? (c = s.jsx("div", {
        className: a,
        children: t
    }), e[3] = t, e[4] = a, e[5] = c) : c = e[5], c
}

function Se(n) {
    "use forget";
    const e = F.c(8),
        {
            automation: t,
            onSave: o,
            overrideManageAllAction: l,
            fullWidth: u
        } = n,
        a = u === void 0 ? !1 : u,
        c = z(pe);
    if (!t) return null;
    if (c && t.content_type === "sugar") {
        let i;
        return e[0] !== t || e[1] !== a ? (i = s.jsx(he, {
            item: t,
            overrideManageAllAction: !1,
            fullWidth: a
        }), e[0] = t, e[1] = a, e[2] = i) : i = e[2], i
    } else {
        let i;
        return e[3] !== t || e[4] !== a || e[5] !== o || e[6] !== l ? (i = s.jsx(xe, {
            item: t,
            onSave: o,
            overrideManageAllAction: l,
            fullWidth: a
        }), e[3] = t, e[4] = a, e[5] = o, e[6] = l, e[7] = i) : i = e[7], i
    }
}

function pe() {
    return V()
}

function xe(n) {
    "use forget";
    const e = F.c(40),
        {
            item: t,
            onSave: o,
            overrideManageAllAction: l,
            fullWidth: u
        } = n,
        a = K();
    let c;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (c = [], e[0] = c) : c = e[0], T.useEffect(be, c);
    const {
        id: i,
        is_enabled: C,
        title: r
    } = t, [P, O] = T.useState(!1), w = T.useRef(null);
    let I;
    e[1] === Symbol.for("react.memo_cache_sentinel") ? (I = () => {
        if (w.current) {
            const E = w.current.clientHeight,
                N = parseFloat(getComputedStyle(w.current).lineHeight);
            O(E > N)
        }
    }, e[1] = I) : I = e[1];
    let M;
    e[2] !== r ? (M = [r], e[2] = r, e[3] = M) : M = e[3], T.useEffect(I, M);
    const S = t.next_run_times.length === 0,
        [v, k] = T.useState(!1);
    let y;
    e[4] === Symbol.for("react.memo_cache_sentinel") ? (y = () => k(!0), e[4] = y) : y = e[4];
    const J = P ? "items-start" : "items-center";
    let x;
    e[5] !== J ? (x = W("flex h-full w-full cursor-pointer justify-between py-4 ps-5 pe-3", J), e[5] = J, e[6] = x) : x = e[6];
    let A;
    e[7] !== r ? (A = s.jsx("div", {
        ref: w,
        className: "line-clamp-2 text-start font-medium",
        children: r
    }), e[7] = r, e[8] = A) : A = e[8];
    let m;
    e[9] !== t ? (m = s.jsx(me, {
        item: t
    }), e[9] = t, e[10] = m) : m = e[10];
    let b;
    e[11] !== t.next_run_times || e[12] !== t.schedule_components || e[13] !== m ? (b = s.jsx("div", {
        className: "text-token-text-secondary text-start",
        children: s.jsx(H, {
            initialScheduleComponents: t.schedule_components,
            nextRunTimes: t.next_run_times,
            children: m
        })
    }), e[11] = t.next_run_times, e[12] = t.schedule_components, e[13] = m, e[14] = b) : b = e[14];
    let f;
    e[15] !== A || e[16] !== b ? (f = s.jsxs("div", {
        className: "flex flex-col gap-0.5 pe-8 text-sm",
        children: [A, b]
    }), e[15] = A, e[16] = b, e[17] = f) : f = e[17];
    let d;
    e[18] !== f || e[19] !== x ? (d = s.jsx("button", {
        className: "hover:bg-token-main-surface-secondary h-full w-full",
        onClick: y,
        children: s.jsx("div", {
            className: x,
            children: f
        })
    }), e[18] = f, e[19] = x, e[20] = d) : d = e[20];
    let _;
    e[21] === Symbol.for("react.memo_cache_sentinel") ? (_ = () => k(!0), e[21] = _) : _ = e[21];
    let h;
    e[22] !== i || e[23] !== S || e[24] !== C || e[25] !== t || e[26] !== l ? (h = s.jsx("div", {
        className: "absolute end-3 top-1/2 -translate-y-1/2 transform",
        children: s.jsx("div", {
            className: "ms-4 flex",
            children: s.jsx(_e, {
                className: "h-9 w-9",
                automation_id: i,
                is_enabled: C,
                item: t,
                isFinished: S,
                onEditModalOpen: _,
                overrideManageAllAction: l
            })
        })
    }), e[22] = i, e[23] = S, e[24] = C, e[25] = t, e[26] = l, e[27] = h) : h = e[27];
    let g;
    e[28] !== u || e[29] !== d || e[30] !== h ? (g = s.jsxs(Q, {
        fullWidth: u,
        children: [d, h]
    }), e[28] = u, e[29] = d, e[30] = h, e[31] = g) : g = e[31];
    let p;
    e[32] !== v || e[33] !== t || e[34] !== o || e[35] !== a ? (p = v && s.jsx(H, {
        initialScheduleComponents: t.schedule_components,
        nextRunTimes: t.next_run_times,
        children: s.jsx(ue, {
            item: t,
            source: "chat",
            onSave: o,
            onClose: E => {
                E && a.success(E, {
                    hasCloseButton: !0
                }), k(!1)
            }
        })
    }), e[32] = v, e[33] = t, e[34] = o, e[35] = a, e[36] = p) : p = e[36];
    let j;
    return e[37] !== g || e[38] !== p ? (j = s.jsxs(s.Fragment, {
        children: [g, p]
    }), e[37] = g, e[38] = p, e[39] = j) : j = e[39], j
}

function be() {
    q.count(G.JAWBONE, "jawbone_message_attachment.open")
}

function _e(n) {
    "use forget";
    const e = F.c(42),
        {
            automation_id: t,
            is_enabled: o,
            item: l,
            isFinished: u,
            onEditModalOpen: a,
            overrideManageAllAction: c,
            className: i
        } = n,
        C = z(je),
        r = U(),
        P = X(),
        O = K(),
        [w, I] = T.useState(o);
    let M, S;
    e[0] !== o ? (M = () => I(o), S = [o], e[0] = o, e[1] = M, e[2] = S) : (M = e[1], S = e[2]), T.useEffect(M, S);
    let v;
    e[3] !== O ? (v = N => {
        O.danger(N ? R.messages.enableFailure : R.messages.pauseFailure, {
            hasCloseButton: !0,
            toastId: "toggle_automation_status"
        }), I(!N)
    }, e[3] = O, e[4] = v) : v = e[4];
    let k;
    e[5] !== t || e[6] !== v ? (k = {
        automation_id: t,
        onError: v
    }, e[5] = t, e[6] = v, e[7] = k) : k = e[7];
    const {
        mutate: y,
        isPending: J
    } = ae(k);
    let x;
    e[8] !== r || e[9] !== P || e[10] !== c ? (x = function() {
        return c === null ? null : s.jsxs(s.Fragment, {
            children: [s.jsx(D.Separator, {}), c ? ? s.jsx(D.Item, {
                icon: ie,
                label: r.formatMessage(B.attachmentManageAll),
                onClick: () => {
                    P(fe())
                }
            })]
        })
    }, e[8] = r, e[9] = P, e[10] = c, e[11] = x) : x = e[11];
    const A = x;
    let m;
    e[12] !== i ? (m = W("hover:bg-token-surface-hover focus-visible:bg-token-surface-hover radix-state-open:bg-token-surface-hover flex items-center justify-center rounded-lg focus-visible:outline-0", i), e[12] = i, e[13] = m) : m = e[13];
    let b;
    e[14] === Symbol.for("react.memo_cache_sentinel") ? (b = s.jsx(Z, {
        className: "icon"
    }), e[14] = b) : b = e[14];
    let f;
    e[15] !== m ? (f = s.jsx("button", {
        className: m,
        children: b
    }), e[15] = m, e[16] = f) : f = e[16];
    let d;
    e[17] !== w || e[18] !== r || e[19] !== u || e[20] !== J || e[21] !== a || e[22] !== y ? (d = !u && s.jsxs(s.Fragment, {
        children: [s.jsx(D.Item, {
            icon: oe,
            label: r.formatMessage(B.attachmentEdit),
            onClick: a
        }), s.jsx(D.Item, {
            icon: w ? ce : le,
            label: r.formatMessage(w ? R.messages.pause : R.messages.resume),
            onClick: () => {
                const N = !w;
                I(N), y({
                    is_enabled: N
                })
            },
            disabled: J
        })]
    }), e[17] = w, e[18] = r, e[19] = u, e[20] = J, e[21] = a, e[22] = y, e[23] = d) : d = e[23];
    let _;
    e[24] !== r ? (_ = r.formatMessage(R.messages.delete), e[24] = r, e[25] = _) : _ = e[25];
    let h;
    e[26] !== l ? (h = () => {
        ee(de, {
            item: l
        })
    }, e[26] = l, e[27] = h) : h = e[27];
    let g;
    e[28] !== _ || e[29] !== h ? (g = s.jsx(D.Item, {
        icon: re,
        color: "danger",
        label: _,
        onClick: h
    }), e[28] = _, e[29] = h, e[30] = g) : g = e[30];
    let p;
    e[31] !== A ? (p = A(), e[31] = A, e[32] = p) : p = e[32];
    let j;
    e[33] !== l || e[34] !== C ? (j = C && l.content_type === "sugar" && s.jsx(ge, {
        taskId: l.id
    }), e[33] = l, e[34] = C, e[35] = j) : j = e[35];
    let E;
    return e[36] !== g || e[37] !== p || e[38] !== j || e[39] !== f || e[40] !== d ? (E = s.jsxs(te, {
        size: "auto",
        alignOffset: -8,
        sideOffset: 4,
        triggerButton: f,
        children: [d, g, p, j]
    }), e[36] = g, e[37] = p, e[38] = j, e[39] = f, e[40] = d, e[41] = E) : E = e[41], E
}

function je() {
    return V()
}
export {
    Se as J, _e as a, Q as b, Ie as c, fe as g
};
//# sourceMappingURL=6cb4c679-fplf101jkz4oo0d4.js.map