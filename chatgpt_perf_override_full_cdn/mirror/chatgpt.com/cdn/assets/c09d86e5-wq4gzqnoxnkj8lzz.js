import {
    c as w,
    r as v,
    j as s,
    o as A
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    B1 as _,
    B2 as I,
    D as L,
    cf as P,
    aw as M
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    E as S
} from "./6ffe46c3-m3dgqn394f1moivn.js";
import {
    E as O
} from "./83a5e40a-n0dw3duo9jw1ac7o.js";
import {
    E as B
} from "./a848d420-lbkdkb7mrbs1b0o6.js";

function y(t) {
    "use forget";
    const e = w.c(8),
        [i, o] = v.useState(!1);
    let n;
    e[0] !== t ? (n = d => {
        t && o(d)
    }, e[0] = t, e[1] = n) : n = e[1];
    const a = n;
    let r, l;
    e[2] !== t ? (r = () => {
        if (!t) return;
        const d = function(g) {
            g.persisted && o(!1)
        };
        return window.addEventListener("pagehide", d), () => window.removeEventListener("pagehide", d)
    }, l = [t], e[2] = t, e[3] = r, e[4] = l) : (r = e[3], l = e[4]), v.useEffect(r, l);
    let c;
    return e[5] !== i || e[6] !== a ? (c = [i, a], e[5] = i, e[6] = a, e[7] = c) : c = e[7], c
}

function H(t) {
    "use forget";
    const e = w.c(3);
    let i, o;
    e[0] !== t ? (i = () => {
        const n = function(r) {
            r.persisted && t()
        };
        return window.addEventListener("pagehide", n), () => window.removeEventListener("pagehide", n)
    }, o = [t], e[0] = t, e[1] = i, e[2] = o) : (i = e[1], o = e[2]), v.useEffect(i, o)
}
const x = {
        openAI: B,
        apple: S,
        google: _,
        microsoft: O
    },
    z = {
        openAI: x.openAI,
        apple: x.apple,
        google: x.google,
        microsoft: x.microsoft
    },
    N = t => {
        "use forget";
        const e = w.c(4),
            {
                name: i,
                size: o,
                className: n
            } = t,
            a = z[i];
        let r;
        return e[0] !== a || e[1] !== n || e[2] !== o ? (r = s.jsx(a, {
            height: o,
            width: o,
            className: n
        }), e[0] = a, e[1] = n, e[2] = o, e[3] = r) : r = e[3], r
    },
    U = t => {
        "use forget";
        const e = w.c(17),
            {
                provider: i,
                className: o,
                onClick: n,
                disabled: a,
                color: r
            } = t,
            l = r === void 0 ? "secondary" : r;
        let c;
        e[0] !== i ? (c = function() {
            switch (i) {
                case "apple":
                    return {
                        logo: s.jsx(N, {
                            name: "apple",
                            size: 20
                        }),
                        ddActionName: "continue_with_apple",
                        children: s.jsx(A, {
                            id: "socialLogin.apple",
                            defaultMessage: "Continue with Apple"
                        })
                    };
                case "google":
                    return {
                        logo: s.jsx(N, {
                            name: "google",
                            size: 19
                        }),
                        ddActionName: "continue_with_google",
                        children: s.jsx(A, {
                            id: "login.google",
                            defaultMessage: "Continue with Google"
                        })
                    };
                case "microsoft":
                    return {
                        logo: s.jsx(N, {
                            name: "microsoft",
                            size: 17
                        }),
                        ddActionName: "continue_with_microsoft",
                        children: s.jsx(A, {
                            id: "login.microsoft",
                            defaultMessage: "Continue with Microsoft"
                        })
                    }
            }
        }(), e[0] = i, e[1] = c) : c = e[1];
        const {
            logo: d,
            ddActionName: m,
            children: g
        } = c;
        let u;
        e[2] === Symbol.for("react.memo_cache_sentinel") ? (u = I(), e[2] = u) : u = e[2];
        const [E, j] = y(u);
        let p;
        e[3] !== m || e[4] !== n || e[5] !== j ? (p = C => {
            j(!0), L.addAction(`login-form.${m}`), n ? .(C)
        }, e[3] = m, e[4] = n, e[5] = j, e[6] = p) : p = e[6];
        let f;
        e[7] !== g || e[8] !== E || e[9] !== d ? (f = E ? s.jsxs(s.Fragment, {
            children: [s.jsx(P, {
                className: "text-token-text-tertiary"
            }), s.jsx("span", {
                className: "sr-only",
                children: g
            })]
        }) : s.jsxs(s.Fragment, {
            children: [s.jsx("span", {
                className: "relative grid h-4 w-4 place-items-center",
                children: s.jsx("span", {
                    className: "absolute",
                    children: d
                })
            }), g]
        }), e[7] = g, e[8] = E, e[9] = d, e[10] = f) : f = e[10];
        let h;
        return e[11] !== o || e[12] !== l || e[13] !== a || e[14] !== p || e[15] !== f ? (h = s.jsx(M, {
            type: "button",
            onClick: p,
            className: o,
            contentWrapperClassName: "gap-2",
            color: l,
            disabled: a,
            children: f
        }), e[11] = o, e[12] = l, e[13] = a, e[14] = p, e[15] = f, e[16] = h) : h = e[16], h
    };
export {
    U as S, H as a, y as u
};
//# sourceMappingURL=c09d86e5-wq4gzqnoxnkj8lzz.js.map