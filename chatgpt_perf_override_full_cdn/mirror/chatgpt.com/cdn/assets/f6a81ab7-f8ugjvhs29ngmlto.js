import {
    j as h,
    c as b,
    r as L
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    l as R
} from "./f8d34c7f-gtanw863rhmb9w3n.js";
import {
    aO as v,
    wi as _,
    a as y,
    N as I,
    ix as N
} from "./4813494d-javwxs2rmzsrunl2.js";
const $ = u => {
        "use forget";
        const e = b.c(36);
        let r, t, l, a, c, n, i, s, f;
        e[0] !== u ? ({
            svgString: f,
            imgRef: l,
            isCodeEdited: a,
            analyticsContext: r,
            className: t,
            style: s,
            onLoad: n,
            onError: c,
            ...i
        } = u, e[0] = u, e[1] = r, e[2] = t, e[3] = l, e[4] = a, e[5] = c, e[6] = n, e[7] = i, e[8] = s, e[9] = f) : (r = e[1], t = e[2], l = e[3], a = e[4], c = e[5], n = e[6], i = e[7], s = e[8], f = e[9]);
        const O = L.useRef(!1);
        let p;
        e[10] !== r || e[11] !== a ? (p = m => {
            O.current || (O.current = !0, y.count(I.CODE_BLOCKS, m === "success" ? "chatgpt_code_block.svg.success" : "chatgpt_code_block.svg.error"), R({
                outcome: m,
                language: "svg",
                isCodeEdited: a,
                analyticsContext: r
            }))
        }, e[10] = r, e[11] = a, e[12] = p) : p = e[12];
        const o = v(p);
        let x;
        e[13] !== o || e[14] !== n ? (x = m => {
            o("success"), n ? .(m)
        }, e[13] = o, e[14] = n, e[15] = x) : x = e[15];
        const B = v(x);
        let C;
        e[16] !== o || e[17] !== c ? (C = m => {
            o("failure"), c ? .(m)
        }, e[16] = o, e[17] = c, e[18] = C) : C = e[18];
        const S = v(C);
        let E;
        e[19] !== o ? (E = () => {
            o("failure")
        }, e[19] = o, e[20] = E) : E = e[20];
        const j = v(E);
        let g;
        e[21] !== t || e[22] !== s ? (g = h.jsx("div", {
            className: t,
            style: s
        }), e[21] = t, e[22] = s, e[23] = g) : g = e[23];
        let d;
        e[24] !== t || e[25] !== S || e[26] !== B || e[27] !== l || e[28] !== i || e[29] !== s || e[30] !== f ? (d = h.jsx(_, {
            svgString: f,
            imgRef: l,
            className: t,
            style: s,
            onLoad: B,
            onError: S,
            ...i
        }), e[24] = t, e[25] = S, e[26] = B, e[27] = l, e[28] = i, e[29] = s, e[30] = f, e[31] = d) : d = e[31];
        let k;
        return e[32] !== j || e[33] !== g || e[34] !== d ? (k = h.jsx(N, {
            name: "CodeBlockSvgImage",
            onError: j,
            fallback: g,
            children: d
        }), e[32] = j, e[33] = g, e[34] = d, e[35] = k) : k = e[35], k
    },
    G = ({
        svgString: u,
        imgRef: e,
        isCodeEdited: r = !1,
        analyticsContext: t,
        className: l,
        style: a,
        onLoad: c,
        onError: n,
        ...i
    }) => {
        const s = `${r}\0${u}`;
        return h.jsx($, {
            svgString: u,
            imgRef: e,
            isCodeEdited: r,
            analyticsContext: t,
            className: l,
            style: a,
            onLoad: c,
            onError: n,
            ...i
        }, s)
    };
export {
    G as C
};
//# sourceMappingURL=f6a81ab7-f8ugjvhs29ngmlto.js.map