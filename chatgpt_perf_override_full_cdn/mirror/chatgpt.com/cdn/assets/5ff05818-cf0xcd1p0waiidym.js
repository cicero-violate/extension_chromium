import {
    j as t,
    r as y,
    o as p,
    c as w
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    af as x,
    vW as k,
    o8 as M,
    vX as m,
    e as v,
    gM as N,
    vY as G,
    I as C,
    _ as F,
    S as _,
    jF as L,
    be as P,
    vQ as E,
    aN as D,
    us as A,
    gF as T,
    vZ as $
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    bB as B,
    bC as j,
    bD as R
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    g as z,
    c as Q
} from "./84e8f385-lndtlkfi7kijfbdy.js";
const K = e => {
    "use forget";
    const a = w.c(5),
        {
            conversation: r,
            currentModelId: o,
            gizmoId: i
        } = e,
        {
            data: s
        } = T(i),
        l = $();
    if (s == null) return null;
    let n;
    return a[0] !== r.id || a[1] !== o || a[2] !== s || a[3] !== l ? (n = t.jsx(I, {
        gizmo: s,
        showStarterPrompts: !0,
        disableStarterPrompts: l,
        clientThreadId: r.id,
        currentModelId: o
    }), a[0] = r.id, a[1] = o, a[2] = s, a[3] = l, a[4] = n) : n = a[4], n
};

function I({
    gizmo: e,
    hideOwner: a = !1,
    children: r,
    className: o,
    avatarClassName: i,
    showStarterPrompts: s = !1,
    disableStarterPrompts: l = !1,
    clientThreadId: n,
    currentModelId: c
}) {
    return e == null ? null : t.jsx(t.Fragment, {
        children: t.jsxs("div", {
            className: x("text-token-text-primary flex h-full flex-col items-center justify-center", "screen-arch:min-h-[calc(100dvh-var(--thread-leading-height)-var(--thread-trailing-height)-12px)]", o),
            children: [t.jsx(O, {
                gizmo: e,
                avatarClassName: i
            }), t.jsx(W, {
                gizmo: e,
                hideOwner: a,
                showStarterPrompts: s,
                disableStarterPrompts: l,
                clientThreadId: n,
                currentModelId: c
            }), r]
        })
    })
}

function O({
    gizmo: e,
    avatarClassName: a
}) {
    const r = !!(e != null && k(e) && e ? .gizmo.tags ? .includes(M.FirstParty));
    return t.jsx("div", {
        className: "relative",
        children: t.jsx(B, {
            isFirstParty: r || !e,
            src: e != null && m(e) ? e.profilePictureUrl : e ? .gizmo.display.profile_picture_url,
            className: x("mb-3 h-12 w-12", a)
        })
    })
}

function U({
    gizmo: e,
    disabled: a
}) {
    const r = z(e),
        o = Q(),
        i = D();
    if (r == null || r.length === 0) return null;
    const s = r.slice(0, i ? 2 : 4);
    return t.jsx(X, {
        starterPrompts: s,
        onSelectStarterPrompt: o,
        disabled: a
    })
}

function W({
    gizmo: e,
    hideOwner: a,
    showStarterPrompts: r,
    disableStarterPrompts: o,
    clientThreadId: i,
    currentModelId: s
}) {
    const l = v(() => N({
            isGizmo: !0
        })),
        {
            data: n,
            isLoading: c
        } = v(() => G()),
        g = e != null && m(e) ? e.name : e ? .gizmo.display.name,
        u = e != null && m(e) ? e.description : e ? .gizmo.display.description,
        h = n ? .model_override,
        f = e != null && m(e) ? e.defaultModel : e ? .gizmo.default_model,
        d = f ? h ? .[f] ? l.models.get(h ? .[f]) : l.models.get(f) : null,
        b = C() ? .hasPaidFeatures(),
        S = y.useCallback(() => {
            !i || !d || (F.logEvent("GPTs: Landing Preferred Model Switch", {
                from: s,
                to: d.id
            }), _.logEvent("chatgpt_gpts_landing_preferred_model_switch", d.id, {
                from: String(s ? ? ""),
                to: d.id
            }), L(P(i), d.id))
        }, [i, d, s]);
    return t.jsxs("div", {
        className: "flex flex-col items-center gap-2",
        children: [t.jsx("div", {
            className: "text-center text-2xl font-semibold",
            children: g
        }), !a && t.jsx("div", {
            className: "text-token-text-tertiary flex items-center gap-1",
            children: t.jsx(t.Fragment, {
                children: e && m(e) ? t.jsx(j, {
                    gizmo: e
                }) : t.jsx(j, {
                    gizmo: e,
                    socials: e.gizmo.author.display_socials
                })
            })
        }), !c && b && d && (s && s !== d.id ? t.jsxs("button", {
            onClick: S,
            className: "btn btn-blue btn-small flex items-center gap-1",
            children: [t.jsx(E, {
                className: "icon-sm"
            }), t.jsx(p, {
                id: "6uu9eh",
                defaultMessage: "Switch to {modelTitle} (creator's recommended model)",
                values: {
                    modelTitle: `${d.title}`
                }
            })]
        }) : t.jsxs("div", {
            className: "text-token-text-tertiary flex items-center gap-1 text-xs",
            children: [t.jsx(R, {
                style: {
                    color: "gray",
                    width: 16,
                    height: 16
                }
            }), t.jsx(p, {
                id: "mcxm8w",
                defaultMessage: "Using the creator's recommended model: {modelTitle}",
                values: {
                    modelTitle: `${d.title}`
                }
            })]
        })), u && t.jsx("div", {
            className: "text-token-text-primary max-w-md text-center text-sm font-normal",
            children: u
        }), r && t.jsx(U, {
            gizmo: e,
            disabled: o
        })]
    })
}
const q = /\s/;

function X({
    starterPrompts: e,
    onSelectStarterPrompt: a,
    disabled: r,
    cssMobileDisplayLimit: o,
    marginOverride: i
}) {
    let s = e.map((l, n) => {
        let c = l.oneliner ? ? l.title;
        c === "" && (c = l.body);
        const g = q.test(c);
        return t.jsxs("button", {
            className: x(o !== void 0 && n >= o && "max-sm:hidden", "border-token-border-default shadow-xxs enabled:hover:bg-token-main-surface-secondary relative flex w-40 flex-col gap-2 rounded-2xl border px-3 pt-3 pb-4 text-start align-top text-[15px] transition disabled:cursor-not-allowed"),
            disabled: r,
            onClick: u => a(u, l, e, n),
            children: [t.jsx(A, {
                category: l.category,
                theme: "v1"
            }), t.jsx("div", {
                className: x("line-clamp-3 max-w-full text-balance text-gray-600 dark:text-gray-500", g ? "break-word" : "break-all"),
                children: c
            })]
        }, l.id ? ? n)
    });
    if (s.length > 2) {
        const l = Math.floor(s.length / 2);
        s = [s.slice(0, l), s.slice(l)].map((n, c) => t.jsx("div", {
            className: "flex max-w-3xl flex-wrap items-stretch justify-center gap-4",
            children: n
        }, c))
    }
    return t.jsx("div", {
        className: x("mx-3 flex max-w-3xl flex-wrap items-stretch justify-center gap-4", i ? ? "mt-12"),
        children: s
    })
}
export {
    I as G, K as a
};
//# sourceMappingURL=5ff05818-cf0xcd1p0waiidym.js.map