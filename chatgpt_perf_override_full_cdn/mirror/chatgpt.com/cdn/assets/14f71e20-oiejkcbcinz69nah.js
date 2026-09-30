import {
    c as g,
    j as m
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    g as u,
    a as v
} from "./6fd89734-he7d0krbclzsprbo.js";
import {
    bT as c,
    b1 as p,
    bU as w
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    af as b
} from "./4813494d-javwxs2rmzsrunl2.js";
const F = {
        pptx: w,
        xlsx: p,
        csv: p,
        txt: c,
        md: c,
        markdown: c
    },
    E = f => {
        "use forget";
        const e = g.c(8),
            {
                fileName: o,
                isSandboxDownload: d
            } = f,
            a = d === void 0 ? !1 : d;
        if (!o) return null;
        let s;
        e[0] !== o || e[1] !== a ? (s = a ? u(o) : v(o), e[0] = o, e[1] = a, e[2] = s) : s = e[2];
        const t = s,
            n = t ? F[t] : null,
            l = t === "xlsx" || t === "csv",
            x = t === "pptx",
            r = t === "txt" || t === "md" || t === "markdown";
        let i;
        return e[3] !== n || e[4] !== x || e[5] !== l || e[6] !== r ? (i = n ? m.jsx("div", {
            className: b("rounded-md p-1", l && "bg-[#04b84c]", x && "bg-orange-300", r && "bg-token-bg-elevated-secondary border-token-border-light border"),
            children: m.jsx(n, {
                className: b("m-0 size-4", r ? "text-token-text-primary" : "text-white")
            })
        }) : null, e[3] = n, e[4] = x, e[5] = l, e[6] = r, e[7] = i) : i = e[7], i
    };
export {
    E as F
};
//# sourceMappingURL=14f71e20-oiejkcbcinz69nah.js.map