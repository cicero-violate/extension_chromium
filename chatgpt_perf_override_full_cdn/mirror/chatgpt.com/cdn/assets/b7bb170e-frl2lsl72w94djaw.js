import {
    j as e,
    o as d
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    cW as m,
    cV as c
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    aV as t,
    fk as l,
    n_ as u,
    af as x
} from "./4813494d-javwxs2rmzsrunl2.js";
const g = t.textarea `w-full text-sm overflow-y-auto rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-400 border-token-border-medium bg-token-main-surface-primary h-32`,
    h = t.div `mb-6`,
    j = t.input `w-full resize-none overflow-y-auto rounded-lg px-3 py-2 text-sm outline-hidden focus:ring-2 border focus:ring-blue-400 border-token-border-medium h-9 bg-token-main-surface-primary`;

function v({
    label: r,
    description: s,
    collapsed: o,
    onClick: n,
    htmlFor: a
}) {
    const i = e.jsx("label", {
        htmlFor: a,
        className: "text-token-text-primary block font-semibold",
        children: r
    });
    return e.jsxs("div", {
        className: "mb-1.5 flex items-center",
        onClick: n,
        children: [o !== void 0 && (o ? e.jsx(c, {
            className: "icon-sm"
        }) : e.jsx(m, {
            className: "icon-sm"
        })), s ? e.jsx(l, {
            label: s,
            side: "top",
            children: i
        }) : e.jsx(e.Fragment, {
            children: i
        })]
    })
}

function k({
    actionTool: r,
    onShowActionsEditor: s,
    isDisabled: o,
    className: n
}) {
    const a = "metadata" in r ? r.metadata ? .domain : void 0;
    return e.jsxs("div", {
        className: x("border-token-border-medium flex rounded-lg border text-sm hover:cursor-pointer", o ? "bg-token-main-surface-secondary" : "", n),
        onClick: s,
        children: [e.jsx("div", {
            className: "h-9 grow px-3 py-2",
            children: a ? ? e.jsx("span", {
                className: "text-red-500",
                children: e.jsx(d, {
                    id: "TJYXrY",
                    defaultMessage: "Invalid action"
                })
            })
        }), e.jsx("div", {
            className: "bg-token-border-medium w-px"
        }), e.jsx("button", {
            disabled: o,
            className: "flex h-9 w-9 items-center justify-center rounded-lg rounded-s-none",
            children: e.jsx(u, {
                className: "icon-sm"
            })
        })]
    })
}
export {
    h as F, k as G, v as a, j as b, g as c
};
//# sourceMappingURL=b7bb170e-frl2lsl72w94djaw.js.map