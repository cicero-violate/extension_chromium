import {
    j as i,
    u as R,
    r as L,
    o as g,
    L as b
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    aN as _,
    fk as h,
    sn as j,
    hC as C,
    af as D,
    c as u
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    n as k
} from "./af7de5ed-hluw7l4ayzlk3ze4.js";
import {
    hZ as y,
    cn as d
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function f(e) {
    return e ? .rate_limit ? ? null
}

function m(e) {
    return e ? .credits ? ? null
}

function N(e) {
    const s = f(e),
        n = [];
    return s ? .primary_window && n.push(s.primary_window), s ? .secondary_window && n.push(s.secondary_window), n
}

function x(e) {
    const s = N(e);
    return s.length === 0 ? null : s.reduce((n, t) => n ? t.used_percent > n.used_percent ? t : n : t)
}

function T(e) {
    return x(e) ? .reset_after_seconds ? ? null
}

function W(e) {
    return x(e) ? .used_percent ? ? null
}

function w(e) {
    const s = f(e),
        n = m(e),
        t = !n ? .unlimited && !(Number(n ? .balance ? ? 0) >= 20 || n ? .has_credits);
    return (s ? .limit_reached === !0 || s ? .allowed === !1) && t
}

function p(e, s = 80) {
    if (!f(e)) return !1;
    if (w(e)) return !0;
    const t = m(e);
    if (Number(m(e) ? .balance ? ? 0) > 0 || t ? .unlimited || t ? .has_credits) return !1;
    const r = W(e);
    return typeof r == "number" ? r >= s : !1
}

function B(e) {
    try {
        const {
            hourCycle: s,
            hour12: n
        } = new Intl.DateTimeFormat(e, {
            hour: "numeric"
        }).resolvedOptions(), t = {
            h23: !0,
            h24: !0,
            h11: !1,
            h12: !1
        };
        if (s && s in t) return t[s];
        if (typeof n == "boolean") return !n
    } catch {}
    return null
}

function F(e, s) {
    const n = Math.max(s, 0),
        t = new Date,
        a = new Date(t.getTime() + n * 1e3),
        r = a.getFullYear() === t.getFullYear() && a.getMonth() === t.getMonth() && a.getDate() === t.getDate(),
        o = B(e.locale),
        c = {
            hour: "numeric",
            minute: "2-digit"
        };
    o != null && (c.hour12 = !o);
    const l = e.formatTime(a, c),
        M = e.formatDate(a, {
            dateStyle: "medium"
        });
    return r ? l : `${M} ${l}`
}

function U() {
    const {
        data: e
    } = k(a => ({
        staleTime: 0,
        refetchInterval: p(a) ? 6e4 : void 0,
        refetchOnWindowFocus: !0
    })), s = y(a => !!a._forcedRateLimit), n = e ? .rate_limit ? ? null, t = p(e);
    return !n || !t ? null : i.jsx(I, {
        resetAfterSeconds: T(e),
        limitReached: w(e),
        hasForcedRateLimit: s
    })
}

function I({
    resetAfterSeconds: e,
    limitReached: s = !1,
    hasForcedRateLimit: n = !1
}) {
    const t = R(),
        a = _(),
        [r, o] = L.useState(!1),
        c = e != null ? t.formatMessage({
            id: "Vdw3Zf",
            defaultMessage: "Resets {time}"
        }, {
            time: F(t, e)
        }) : null;
    return i.jsx(h, {
        open: a ? r : void 0,
        onOpenChange: o,
        label: c ? ? t.formatMessage({
            id: "z90MsD",
            defaultMessage: "Usage resets soon"
        }),
        children: i.jsxs("div", {
            className: D("inline-flex items-center gap-1.5 rounded-full py-2 ps-3 pe-3.5 text-sm font-medium", s ? "bg-token-text-status-error/15 text-token-text-status-error" : "bg-token-text-status-warning/15 text-token-text-status-warning"),
            onClick: a ? () => o(l => !l) : void 0,
            children: [i.jsxs("div", {
                className: "flex items-center gap-1.5",
                children: [i.jsx(j, {
                    className: "icon"
                }), s ? i.jsx(g, {
                    id: "JH4ShQ",
                    defaultMessage: "Usage limit reached"
                }) : i.jsx(g, {
                    id: "k4kW93",
                    defaultMessage: "Usage nearing limit"
                })]
            }), location.pathname !== "/codex/settings/usage" && i.jsx(h, {
                label: t.formatMessage({
                    id: "jqcjgs",
                    defaultMessage: "Open usage settings"
                }),
                children: i.jsx(b, {
                    to: "/codex/settings/usage",
                    "aria-label": t.formatMessage({
                        id: "Xo2nko",
                        defaultMessage: "Open usage settings"
                    }),
                    children: i.jsx(C, {
                        className: "icon-sm"
                    })
                })
            }), !1]
        })
    })
}
const E = u(d, "d3a21b", 16, 16),
    H = u(d, "6e38ac", 16, 16),
    z = u(d, "2e166e", 16, 16),
    A = u(d, "48254b", 16, 16);
export {
    A as B, U as W, p as a, z as b, H as c, E as d, F as f, T as g, w as i
};
//# sourceMappingURL=0a717d1e-09ybvrr05t1lv0x0.js.map