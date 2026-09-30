import {
    j as e
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    e6 as y
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    af as r
} from "./4813494d-javwxs2rmzsrunl2.js";
const k = ({
    size: s = 48,
    className: i,
    backgroundStrokeClassName: l,
    spinnerColorClassName: d,
    onClick: u,
    disabled: m = !1,
    ariaLabel: p = "Stop",
    percentage: f = 25
}) => {
    const t = s,
        h = 1 / 20,
        a = t * h,
        c = (t - a) / 2,
        o = 2 * Math.PI * c,
        x = o - f / 100 * o,
        n = s * .625;
    return e.jsxs("button", {
        type: "button",
        "aria-label": p,
        onClick: u,
        disabled: m,
        className: r("relative inline-flex items-center justify-center rounded-full", "disabled:cursor-not-allowed disabled:opacity-50", "composer-secondary-button-color", i),
        style: {
            width: s,
            height: s
        },
        children: [e.jsxs("svg", {
            width: t,
            height: t,
            viewBox: `0 0 ${t} ${t}`,
            className: r("animate-spin", d),
            children: [e.jsx("circle", {
                className: r("origin-[50%_50%] -rotate-90", l),
                strokeWidth: a,
                fill: "transparent",
                r: c,
                cx: t / 2,
                cy: t / 2
            }), e.jsx("circle", {
                className: "origin-[50%_50%] -rotate-90",
                stroke: "currentColor",
                strokeWidth: a,
                strokeDashoffset: x,
                strokeDasharray: `${o} ${o}`,
                fill: "transparent",
                r: c,
                cx: t / 2,
                cy: t / 2,
                style: {
                    strokeLinecap: "round"
                }
            })]
        }), e.jsx(y, {
            className: r("absolute flex items-center justify-center", "rounded-[2px]", "composer-secondary-button-color"),
            style: {
                width: n,
                height: n
            }
        })]
    })
};
export {
    k as C
};
//# sourceMappingURL=2ac7f54f-dph6j3jcg26rifm2.js.map