import {
    c as C,
    j as t,
    o as v,
    u as A,
    r as N
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    aw as E,
    af as w,
    bX as O,
    aO as y
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    dr as I,
    hG as j,
    hg as U,
    hh as _
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    g as B,
    i as F
} from "./1c86a5ac-l4l9bb8zn1n6pjie.js";
const L = k => {
        "use forget";
        const e = C.c(23),
            {
                title: d,
                widgetDisplayName: u,
                widgetDomain: n,
                onClickBack: m,
                onClickClose: o,
                onClickForward: x,
                onClickOpenInApp: i,
                canGoBack: r,
                canGoForward: c,
                logo: s,
                hideOpenInAppButton: g
            } = k;
        let p;
        e[0] !== r || e[1] !== c || e[2] !== m || e[3] !== o || e[4] !== x ? (p = t.jsx(M, {
            onClickBack: m,
            onClickForward: x,
            canGoBack: r,
            canGoForward: c,
            onClickClose: o,
            isNavOnly: !1
        }), e[0] = r, e[1] = c, e[2] = m, e[3] = o, e[4] = x, e[5] = p) : p = e[5];
        let a;
        e[6] !== s ? (a = s && t.jsx("img", {
            src: s,
            alt: "",
            "aria-hidden": "true",
            "data-testid": "fullscreen-header-logo",
            className: "h-5 w-5 shrink-0 rounded-md object-contain"
        }), e[6] = s, e[7] = a) : a = e[7];
        let l;
        e[8] !== d ? (l = t.jsx("span", {
            className: "truncate",
            children: d
        }), e[8] = d, e[9] = l) : l = e[9];
        let f;
        e[10] !== a || e[11] !== l ? (f = t.jsxs("div", {
            className: "text-token-text-secondary flex min-w-0 items-center justify-center gap-2 text-base",
            children: [a, l]
        }), e[10] = a, e[11] = l, e[12] = f) : f = e[12];
        let h;
        e[13] !== g || e[14] !== s || e[15] !== i || e[16] !== u || e[17] !== n ? (h = !g && n && t.jsx("div", {
            className: "flex items-center justify-end",
            children: t.jsx(E, {
                icon: s ? void 0 : I,
                onClick: i,
                color: "secondary",
                children: t.jsx(v, {
                    id: "JvQEOX",
                    defaultMessage: "Open in {app}",
                    values: {
                        app: u
                    }
                })
            })
        }), e[13] = g, e[14] = s, e[15] = i, e[16] = u, e[17] = n, e[18] = h) : h = e[18];
        let b;
        return e[19] !== p || e[20] !== f || e[21] !== h ? (b = t.jsxs("div", {
            className: "border-token-border-secondary bg-token-bg-primary sm:bg-token-bg-primary z-10 grid h-(--header-height) grid-cols-[1fr_auto_1fr] border-b px-2",
            children: [p, f, h]
        }), e[19] = p, e[20] = f, e[21] = h, e[22] = b) : b = e[22], b
    },
    z = 40,
    M = k => {
        "use forget";
        const e = C.c(19),
            {
                onClickBack: d,
                onClickForward: u,
                onClickClose: n,
                canGoBack: m,
                canGoForward: o,
                isNavOnly: x
            } = k,
            i = A(),
            r = x && "absolute start-2 top-2.5 z-10";
        let c;
        e[0] !== r ? (c = w("flex items-center justify-start gap-3", r), e[0] = r, e[1] = c) : c = e[1];
        let s;
        e[2] !== i ? (s = i.formatMessage({
            id: "H0F9KU",
            defaultMessage: "Close"
        }), e[2] = i, e[3] = s) : s = e[3];
        let g;
        e[4] === Symbol.for("react.memo_cache_sentinel") ? (g = w("h-7! w-7!"), e[4] = g) : g = e[4];
        let p;
        e[5] === Symbol.for("react.memo_cache_sentinel") ? (p = t.jsx(O, {
            className: "icon"
        }), e[5] = p) : p = e[5];
        let a;
        e[6] !== n || e[7] !== s ? (a = t.jsx(j, {
            label: s,
            className: g,
            onClick: n,
            icon: p
        }), e[6] = n, e[7] = s, e[8] = a) : a = e[8];
        let l;
        e[9] !== m || e[10] !== o || e[11] !== i || e[12] !== d || e[13] !== u ? (l = (m || o) && t.jsxs("div", {
            className: "flex items-center gap-1",
            children: [t.jsx(j, {
                label: i.formatMessage({
                    id: "y0H9Ps",
                    defaultMessage: "Back"
                }),
                className: w("h-7! w-7!"),
                onClick: d,
                disabled: !m,
                icon: t.jsx(U, {
                    className: "icon"
                })
            }), t.jsx(j, {
                label: i.formatMessage({
                    id: "4zGgS+",
                    defaultMessage: "Forward"
                }),
                className: w("h-7! w-7!"),
                onClick: u,
                disabled: !o,
                icon: t.jsx(_, {
                    className: "icon"
                })
            })]
        }), e[9] = m, e[10] = o, e[11] = i, e[12] = d, e[13] = u, e[14] = l) : l = e[14];
        let f;
        return e[15] !== c || e[16] !== a || e[17] !== l ? (f = t.jsxs("div", {
            className: c,
            children: [a, l]
        }), e[15] = c, e[16] = a, e[17] = l, e[18] = f) : f = e[18], f
    },
    D = ({
        csp: k,
        domain: e,
        widgetId: d,
        widgetRef: u
    }) => {
        const n = B(e),
            [m, o] = N.useState(null);
        N.useEffect(() => {
            o(null)
        }, [d, n]);
        const x = y(({
            href: r
        }) => {
            if (!r || !r.trim()) {
                o(null);
                return
            }
            const c = n ? ? window.location.origin;
            let s;
            try {
                s = new URL(r, c)
            } catch {}!s || !F(s.toString(), k, e) || o({
                widgetId: d,
                url: s.toString()
            })
        });
        return {
            openInApp: y(() => {
                if (m ? .widgetId === d) {
                    window.open(m.url, "_blank", "noopener,noreferrer");
                    return
                }
                n && u.current ? .getCurrentPath() ? .then(r => {
                    r != null && window.open(new URL(r.replace(/^\/+/, ""), n), "_blank", "noopener,noreferrer")
                })
            }),
            setOpenInAppUrl: x,
            widgetRedirectUrl: n
        }
    };
export {
    L as E, z as N, M as a, D as u
};
//# sourceMappingURL=da39060d-pev6u3jq0nawzolv.js.map