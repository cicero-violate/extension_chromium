const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/86bfab85-l21d9jkw3640dhab.js", "assets/0d45f5fd-jaghgioohxnnwyz0.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/0d45f5fd-ebx4jll8dk1804yw.js"]))) => i.map(i => d[i]);
import {
    r as n,
    u as N,
    j as e,
    o as I,
    _ as q,
    f as G
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    fB as Z,
    J,
    e as T,
    ff as Q,
    f as K,
    gu as _,
    af as c,
    wg as E,
    a as X,
    N as Y,
    cN as ee,
    eR as se,
    aV as m,
    c3 as te,
    aZ as ae,
    a_ as A
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    C as oe
} from "./f6a81ab7-f8ugjvhs29ngmlto.js";
import {
    M as re
} from "./1bc04b52-ktky0fctjapxchyv.js";
import {
    cq as ie,
    b8 as ne,
    cr as le
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    G as de
} from "./c19d65aa-ef21vpc58mb9d70k.js";
import "./f8d34c7f-gtanw863rhmb9w3n.js";
const ce = se(() => q(() =>
        import ("./86bfab85-l21d9jkw3640dhab.js"), __vite__mapDeps([0, 1, 2, 3]))),
    me = G.memo(function({
        htmlSegment: r
    }) {
        return e.jsx("span", {
            dangerouslySetInnerHTML: {
                __html: r
            }
        })
    }),
    pe = t => {
        if (t instanceof Element) return t.closest("[data-message-id]") ? .getAttribute("data-message-id") ? ? void 0
    };

function Ae({
    wrapperClassName: t,
    codeClassName: r,
    language: a,
    content: s,
    shouldWrapCode: l = !1,
    removeTopBorderRadius: p,
    showActionBar: g = !0,
    showStickyRightContent: u = !0,
    codeContainerClassName: h,
    title: R
}) {
    const x = Z(),
        B = n.useRef(null),
        y = J(),
        C = T(Q),
        b = T(K),
        w = n.useContext(ie) ? .isActivelyStreaming ? ? !1,
        [D, F] = n.useState("code"),
        v = a ? .toLowerCase() === "mermaid",
        j = v && D === "diagram",
        S = n.useCallback(o => {
            o.preventDefault(), o.stopPropagation();
            const i = window.getSelection() ? .toString();
            i && _(i, void 0, o)
        }, []),
        $ = n.useCallback(o => {
            const i = (W, k, O) => {
                    if (C || x ? .id == null || k === void 0) return;
                    const M = ee(x.id);
                    M != null && le({
                        source: W,
                        type: "copy",
                        messageId: k,
                        serverThreadId: M,
                        selectedText: O,
                        location: "code-snippet",
                        contentType: "code"
                    })
                },
                U = pe(o.target);
            _(s, y, o), i("mouse", U, s)
        }, [s, y, C, x]),
        V = N(),
        {
            isWithinDataAnalysisToolMessage: z
        } = n.useContext(de),
        [d, H] = n.useState(null);
    n.useEffect(() => {
        ce().then(o => {
            if (o != null) try {
                H(o.highlightCode(s, a))
            } catch (i) {
                if (!(i instanceof Error && /Unknown language/i.test(i.message))) throw i
            }
        })
    }, [s, a]);
    const L = a === "svg" || (a === "xml" || a === "html") && be(s),
        f = n.useMemo(() => d ? .html.split(/(<span[^>]*>.*?<\/span>)/g).filter(Boolean), [d ? .html]),
        P = L ? e.jsx(oe, {
            svgString: s,
            className: "max-h-96 w-full"
        }) : f && f.length > 0 ? e.jsx("span", {
            children: f.map((o, i) => e.jsx(me, {
                htmlSegment: o
            }, i))
        }) : d ? .html ? e.jsx("span", {
            dangerouslySetInnerHTML: {
                __html: d.html
            }
        }) : e.jsx("span", {
            children: s
        });
    return e.jsx(ue, {
        ref: B,
        title: R ? ? d ? .language ? ? a,
        stickyTitleRightContent: u && e.jsxs("div", {
            className: "bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs",
            children: [z && e.jsx(ge, {}), v && e.jsxs("label", {
                className: c("flex items-center gap-2 font-sans text-xs", w ? "text-token-text-tertiary" : "text-token-text-secondary"),
                children: [e.jsx(I, {
                    id: "rFpifq",
                    defaultMessage: "Diagram"
                }), e.jsx(E, {
                    withinLabel: !0,
                    size: "small",
                    disabled: w,
                    checked: j,
                    onCheckedChange: o => {
                        X.count(Y.DEFAULT, "chatgpt_code_block_view_toggled", {
                            view: o ? "diagram" : "code"
                        }), F(o ? "diagram" : "code")
                    }
                })]
            }), e.jsx(ne, {
                buttonText: V.formatMessage({
                    id: "zIa6ZQ",
                    defaultMessage: "Copy code"
                }),
                onCopy: $,
                className: "py-1",
                iconClassName: "icon-sm"
            })]
        }),
        codeContainerClassName: h,
        className: c(t, b && "border-token-border-medium bg-token-bg-primary dark:bg-token-sidebar-surface-primary border"),
        removeTopBorderRadius: p,
        showActionBar: g,
        isAuraSideChat: b,
        children: j ? e.jsx(Ce, {
            onCopy: S,
            children: e.jsx(re, {
                source: s
            })
        }) : e.jsx(ye, {
            $shouldWrap: l,
            className: r,
            onCopy: S,
            children: P
        })
    })
}

function ge() {
    const r = te(!0),
        {
            data: a = !1
        } = ae(A.ShowExpandedCodeView),
        s = N();
    return e.jsxs("div", {
        className: "border-token-border-medium flex items-center gap-1",
        children: [e.jsx("label", {
            htmlFor: "ada-always-show",
            children: e.jsx(I, {
                defaultMessage: "Always show details",
                id: "message.tools.codeInterpreter.alwaysShowAnalysis"
            })
        }), e.jsx(E, {
            id: "ada-always-show",
            size: "small",
            onCheckedChange: l => {
                r.mutate({
                    setting: A.ShowExpandedCodeView,
                    value: l
                })
            },
            checked: a,
            "aria-label": a ? s.formatMessage({
                defaultMessage: "Toggle to always expand detail view for code analysis on",
                id: "message.tools.codeInterpreter.alwaysShowAnalysis.enabled"
            }) : s.formatMessage({
                defaultMessage: "Toggle to always expand detail view for code analysis off",
                id: "message.tools.codeInterpreter.alwaysShowAnalysis.disabled"
            })
        })]
    })
}

function ue({
    children: t,
    title: r,
    stickyTitleRightContent: a,
    className: s,
    codeContainerClassName: l,
    ref: p,
    removeTopBorderRadius: g,
    showActionBar: u = !0,
    isAuraSideChat: h = !1
}) {
    return e.jsxs(he, {
        className: s,
        children: [u && e.jsxs(e.Fragment, {
            children: [e.jsx(xe, {
                $removeTopBorderRadius: g,
                className: c(h && "bg-token-bg-primary dark:bg-token-sidebar-surface-primary"),
                children: r
            }), e.jsx("div", {
                className: "sticky top-[calc(var(--sticky-padding-top)+9*var(--spacing))]",
                children: e.jsx("div", {
                    className: "absolute end-0 bottom-0 flex h-9 items-center pe-2",
                    children: a
                })
            })]
        }), e.jsx(fe, {
            ref: p,
            className: l,
            children: t
        })]
    })
}
const he = m.div `contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary`,
    xe = m.div `flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary select-none ${t=>t.$removeTopBorderRadius?"":"rounded-t-2xl corner-t-superellipse/1.1"}`,
    fe = function({
        children: r,
        className: a,
        ref: s
    }) {
        return e.jsx("div", {
            ref: s,
            className: c("overflow-y-auto p-4", a),
            dir: "ltr",
            children: r
        })
    },
    ye = m.code `${t=>t.$shouldWrap?"whitespace-pre-wrap!":"whitespace-pre!"}`,
    Ce = m.div `
  flex w-full items-start justify-center
`;

function be(t) {
    return t.trim().startsWith("<svg")
}
export {
    Ae as
    default
};
//# sourceMappingURL=a2e12fbe-efn5f3ec8mo4hr2i.js.map