import {
    c as xe,
    u as pe,
    j as s,
    o as w,
    h as fe
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    sn as ge,
    af as me,
    aw as B
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    eT as ue
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    g as ye
} from "./ad08b33f-m6y61lzfmpdxz75y.js";
const i = fe({
        loadingDescription: {
            id: "y0oM2V",
            defaultMessage: "Loading skill details…"
        },
        errorDescription: {
            id: "7lMRib",
            defaultMessage: "We could not load this skill."
        },
        addToLibrary: {
            id: "X6s/bl",
            defaultMessage: "Install"
        },
        tryInChat: {
            id: "BIPBqt",
            defaultMessage: "Try in chat"
        },
        replaceSkill: {
            id: "n+whpp",
            defaultMessage: "Save changes"
        },
        cancel: {
            id: "THS2WG",
            defaultMessage: "Cancel"
        },
        needsReview: {
            id: "yns+A6",
            defaultMessage: "Needs review"
        },
        blocked: {
            id: "KMEj+F",
            defaultMessage: "Blocked"
        }
    }),
    Me = ie => {
        "use forget";
        const e = xe.c(56),
            {
                title: P,
                description: le,
                statusText: N,
                safetyStatus: o,
                iconography: z,
                addAction: J,
                isLoading: O,
                isError: Q,
                isExpandDisabled: U,
                isAddDisabled: Y,
                isInLibrary: _,
                isAdding: ee,
                canReplace: se,
                isReplacing: te,
                isCanceling: F,
                primaryActionMessage: ae,
                onExpand: n,
                onAddToLibrary: D,
                onTryInChat: r,
                onReplaceSkill: d,
                onCancel: I
            } = ie,
            oe = J === void 0 ? "copy" : J,
            ne = O === void 0 ? !1 : O,
            re = Q === void 0 ? !1 : Q,
            l = U === void 0 ? !1 : U,
            C = Y === void 0 ? !1 : Y,
            a = _ === void 0 ? !1 : _,
            de = ee === void 0 ? !1 : ee,
            K = se === void 0 ? !1 : se,
            c = te === void 0 ? !1 : te,
            x = pe();
        let R;
        e[0] !== z ? (R = ye(z), e[0] = z, e[1] = R) : R = e[1];
        const W = R;
        let S;
        e[2] !== x ? (S = x.formatMessage(i.loadingDescription), e[2] = x, e[3] = S) : S = e[3];
        const ce = S;
        let T;
        e[4] !== x ? (T = x.formatMessage(i.errorDescription), e[4] = x, e[5] = T) : T = e[5];
        const q = re ? T : ne ? ce : le,
            p = oe === "replace",
            G = p ? !d : !D,
            H = p ? c : de,
            V = ae ? ? (p ? i.replaceSkill : i.addToLibrary),
            A = o === "blocked" ? i.blocked : o === "needsReview" ? i.needsReview : null;
        let E;
        e[6] !== l || e[7] !== n ? (E = () => {
            l || n()
        }, e[6] = l, e[7] = n, e[8] = E) : E = e[8];
        const X = E,
            Z = l ? -1 : 0;
        let f;
        e[9] !== l || e[10] !== n ? (f = t => {
            l || (t.key === "Enter" || t.key === " ") && (t.preventDefault(), n())
        }, e[9] = l, e[10] = n, e[11] = f) : f = e[11];
        const $ = l ? "true" : void 0;
        let g;
        e[12] !== W ? (g = s.jsx("div", {
            className: "flex h-[42px] w-[42px] items-center justify-center",
            children: s.jsx(W, {
                className: "text-token-text-primary h-[42px] w-[42px]"
            })
        }), e[12] = W, e[13] = g) : g = e[13];
        let m;
        e[14] !== P ? (m = s.jsx("div", {
            className: "text-token-text-primary truncate text-sm font-normal",
            children: P
        }), e[14] = P, e[15] = m) : m = e[15];
        let u;
        e[16] !== N ? (u = N && s.jsx("div", {
            className: "text-token-text-tertiary truncate text-xs",
            children: N
        }), e[16] = N, e[17] = u) : u = e[17];
        let y;
        e[18] !== q ? (y = s.jsx("div", {
            className: "text-token-text-secondary line-clamp-2 text-sm",
            children: q
        }), e[18] = q, e[19] = y) : y = e[19];
        let k;
        e[20] !== m || e[21] !== u || e[22] !== y ? (k = s.jsxs("div", {
            className: "flex min-w-0 flex-1 flex-col gap-1",
            children: [m, u, y]
        }), e[20] = m, e[21] = u, e[22] = y, e[23] = k) : k = e[23];
        let h;
        e[24] !== o || e[25] !== A ? (h = A && s.jsxs("div", {
            className: me("inline-flex items-center gap-1.5 text-sm leading-5", o === "blocked" ? "text-token-text-status-error" : "text-token-text-status-warning"),
            children: [o === "blocked" ? s.jsx(ue, {
                className: "h-4 w-4 shrink-0"
            }) : s.jsx(ge, {
                className: "h-4 w-4 shrink-0"
            }), s.jsx(w, { ...A
            })]
        }), e[24] = o, e[25] = A, e[26] = h) : h = e[26];
        let b;
        e[27] !== G || e[28] !== H || e[29] !== V || e[30] !== K || e[31] !== C || e[32] !== a || e[33] !== p || e[34] !== c || e[35] !== D || e[36] !== d || e[37] !== r ? (b = a && K ? s.jsxs(s.Fragment, {
            children: [s.jsx(B, {
                size: "small",
                color: "primary",
                onClick: t => {
                    t.stopPropagation(), d ? .()
                },
                disabled: C || c || !d,
                loading: c,
                type: "button",
                children: s.jsx(w, { ...i.replaceSkill
                })
            }), s.jsx(B, {
                size: "small",
                color: "secondary",
                onClick: t => {
                    t.stopPropagation(), r ? .()
                },
                disabled: C || c || !r,
                type: "button",
                children: s.jsx(w, { ...i.tryInChat
                })
            })]
        }) : s.jsx(B, {
            size: "small",
            color: a ? "secondary" : "primary",
            onClick: t => {
                t.stopPropagation(), a ? r ? .() : p ? d ? .() : D ? .()
            },
            disabled: C || (a ? !r : G),
            loading: !a && H,
            type: "button",
            children: s.jsx(w, { ...a ? i.tryInChat : V
            })
        }), e[27] = G, e[28] = H, e[29] = V, e[30] = K, e[31] = C, e[32] = a, e[33] = p, e[34] = c, e[35] = D, e[36] = d, e[37] = r, e[38] = b) : b = e[38];
        let j;
        e[39] !== F || e[40] !== I ? (j = I && s.jsx(B, {
            size: "small",
            color: "secondary",
            onClick: t => {
                t.stopPropagation(), I ? .()
            },
            type: "button",
            loading: F,
            children: s.jsx(w, { ...i.cancel
            })
        }), e[39] = F, e[40] = I, e[41] = j) : j = e[41];
        let v;
        e[42] !== b || e[43] !== j ? (v = s.jsxs("div", {
            className: "flex flex-col gap-2",
            children: [b, j]
        }), e[42] = b, e[43] = j, e[44] = v) : v = e[44];
        let M;
        e[45] !== h || e[46] !== v ? (M = s.jsxs("div", {
            className: "flex shrink-0 flex-col items-end gap-2",
            children: [h, v]
        }), e[45] = h, e[46] = v, e[47] = M) : M = e[47];
        let L;
        return e[48] !== X || e[49] !== Z || e[50] !== f || e[51] !== $ || e[52] !== g || e[53] !== k || e[54] !== M ? (L = s.jsxs("div", {
            className: "border-token-border-light bg-tertiary flex cursor-pointer items-start gap-4 rounded-2xl border px-4 py-3",
            onClick: X,
            role: "button",
            tabIndex: Z,
            onKeyDown: f,
            "data-disabled": $,
            children: [g, k, M]
        }), e[48] = X, e[49] = Z, e[50] = f, e[51] = $, e[52] = g, e[53] = k, e[54] = M, e[55] = L) : L = e[55], L
    };
export {
    Me as S
};
//# sourceMappingURL=78c2d596-c7gi8g89xe9hpsf2.js.map