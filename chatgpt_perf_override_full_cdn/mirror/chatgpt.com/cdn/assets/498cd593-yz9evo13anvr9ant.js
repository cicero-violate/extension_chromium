import {
    r as n,
    u as C,
    j as e
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    gx as m,
    bD as v,
    c_ as g,
    lr as j
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    fk as y,
    af as l,
    cc as T,
    jw as N
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    t as x
} from "./b7675d69-jb593urz5i2ck6iz.js";
const w = ({
        onClick: a
    }) => {
        const [s, t] = n.useState(!1), r = m(), d = C(), u = c => {
            a(c), t(!0), setTimeout(() => {
                r() && t(!1)
            }, 2e3)
        }, i = s ? v : g, o = d.formatMessage({
            id: "uG/ayY",
            defaultMessage: "Copy table"
        });
        return e.jsx(y, {
            label: o,
            side: "bottom",
            align: "center",
            alignOffset: 0,
            children: e.jsx("button", {
                "aria-label": o,
                onClick: u,
                className: "hover:bg-token-bg-tertiary text-token-text-secondary my-1 rounded-sm p-1 transition-opacity group-[:not(:hover):not(:focus-within)]:pointer-events-none group-[:not(:hover):not(:focus-within)]:opacity-0",
                children: e.jsx(i, {
                    className: "icon"
                })
            })
        })
    },
    b = n.createContext({
        topAlignHeaderCells: !1
    }),
    I = ({
        onClickCopy: a,
        children: s,
        unstyledContainer: t,
        topAlignHeaderCells: r = !1,
        ...d
    }) => {
        const u = n.useRef(null),
            i = n.useRef(null),
            o = j() !== void 0,
            c = o || t;
        return T(() => {
            N({
                axis: "height",
                target: u.current ? .firstElementChild,
                onChange: ({
                    height: p
                }) => {
                    i.current && (i.current.style.height = `${p}px`)
                }
            })
        }, []), e.jsx(b.Provider, {
            value: {
                topAlignHeaderCells: r
            },
            children: e.jsx("div", {
                className: l(c ? void 0 : x.tableContainer),
                children: e.jsxs("div", {
                    tabIndex: -1,
                    className: l("group", l(c ? void 0 : x.tableWrapper, "flex flex-col-reverse", o ? "w-full" : "w-fit")),
                    children: [e.jsx("table", { ...d,
                        className: l(o ? "w-full table-auto border-collapse text-start" : "w-fit min-w-(--thread-content-width)", d.className),
                        ref: u,
                        children: s
                    }), e.jsx("div", {
                        className: l("sticky h-0 select-none", c ? "end-0 self-end" : "end-(--thread-content-margin) self-end"),
                        children: e.jsx("div", {
                            className: "absolute end-0 flex items-end",
                            ref: i,
                            children: e.jsx(w, {
                                onClick: a
                            })
                        })
                    })]
                })
            })
        })
    },
    f = n.createContext(null),
    H = () => n.useContext(f),
    h = a => n.Children.map(a, (s, t) => s === "<br>" ? e.jsx("br", {}, t) : s),
    M = ({
        node: a,
        children: s,
        ...t
    }) => e.jsx("td", { ...t,
        children: e.jsx(f.Provider, {
            value: {
                isHeader: !1
            },
            children: h(s)
        })
    }),
    P = ({
        node: a,
        children: s,
        ...t
    }) => {
        const {
            topAlignHeaderCells: r
        } = n.useContext(b);
        return e.jsx("th", { ...t,
            className: l(r && "align-top", t.className),
            children: e.jsx(f.Provider, {
                value: {
                    isHeader: !0
                },
                children: h(s)
            })
        })
    };
export {
    I as T, P as a, M as b, H as u
};
//# sourceMappingURL=498cd593-yz9evo13anvr9ant.js.map