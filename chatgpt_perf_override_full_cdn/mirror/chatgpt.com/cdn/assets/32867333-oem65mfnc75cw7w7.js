import {
    c as Ke,
    u as st,
    r as h,
    j as o,
    o as Re,
    h as nt
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    r as rt
} from "./7f00cfec-f04y2v5idy58f22s.js";
import {
    aH as Fe,
    b5 as je,
    bW as ot,
    et as it,
    be as lt
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    bF as at,
    bG as ct,
    bH as ut,
    bI as dt,
    bD as mt,
    bJ as ft
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
const Pe = n => n != null && typeof n == "object",
    pt = n => Pe(n) ? typeof n.question == "string" && n.question.trim().length > 0 && Array.isArray(n.options) && n.options.length >= 2 && n.options.length <= 10 && n.options.every(e => typeof e == "string" && e.trim().length > 0) && (n.type === "single_select" || n.type === "multi_select") : !1,
    k = nt({
        close: {
            id: "AskUserInputWidget.close",
            defaultMessage: "Close"
        },
        nextQuestion: {
            id: "AskUserInputWidget.nextQuestion",
            defaultMessage: "Next question"
        },
        previousQuestion: {
            id: "AskUserInputWidget.previousQuestion",
            defaultMessage: "Previous question"
        },
        selectAllThatApply: {
            id: "AskUserInputWidget.selectAllThatApply",
            defaultMessage: "Select all that apply"
        },
        skip: {
            id: "AskUserInputWidget.skip",
            defaultMessage: "Skip"
        },
        submit: {
            id: "AskUserInputWidget.submit",
            defaultMessage: "Submit"
        },
        typeYourAnswer: {
            id: "AskUserInputWidget.typeYourAnswer",
            defaultMessage: "Type your answer"
        },
        customAnswerInputLabel: {
            id: "AskUserInputWidget.customAnswerInputLabel",
            defaultMessage: "Custom answer for {question}"
        },
        pageCount: {
            id: "AskUserInputWidget.pageCount",
            defaultMessage: "{current} of {total}"
        },
        noSelection: {
            id: "AskUserInputWidget.noSelection",
            defaultMessage: "No selection"
        }
    }),
    Mt = n => {
        const e = n.data;
        return n.category === "ask_user_input" && Pe(e) && Array.isArray(e.questions) && e.questions.length > 0 && e.questions.every(pt)
    },
    xt = (n, e, A = "No selection") => n.map((a, p) => {
        const d = e[p] ? ? [];
        return `> ${a.question.trim()}
${d.length>0?d.map(l=>l.trim()).join(", "):A}`
    }).join(`

`),
    yt = (n, e, A, a) => {
        if (A.type === "single_select") return { ...n,
            [e]: [a]
        };
        const p = n[e] ? ? [];
        return { ...n,
            [e]: p.includes(a) ? p.filter(d => d !== a) : [...p, a]
        }
    },
    bt = (n, e, A) => n.reduce((a, p, d) => {
        const l = e[d] ? ? [],
            b = A[d] ? .trim();
        return b ? (a[d] = p.type === "single_select" ? [b] : [...l, b], a) : (a[d] = l, a)
    }, {}),
    gt = n => `${n+1}`,
    ht = n => /^[1-9]$/.test(n) ? Number(n) - 1 : null,
    kt = n => n instanceof HTMLElement ? n.isContentEditable || n.matches("input, textarea, select, [role='textbox'], [role='searchbox'], [role='combobox']") : !1,
    At = {
        visible: {
            transition: {
                staggerChildren: .03
            }
        },
        exit: {
            pointerEvents: "none",
            transition: {
                staggerChildren: .02
            }
        }
    },
    Le = {
        hidden: n => ({
            opacity: 0,
            x: n >= 0 ? 8 : -8
        }),
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: .14,
                ease: "easeOut"
            }
        },
        exit: n => ({
            opacity: 0,
            x: n >= 0 ? -8 : 8,
            transition: {
                duration: .08,
                ease: "easeIn"
            }
        })
    },
    Be = n => {
        "use forget";
        const e = Ke.c(8),
            {
                isSelected: A,
                optionIndex: a,
                questionType: p
            } = n;
        if (p === "single_select") {
            const s = `flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-medium ${A?"border-token-text-primary bg-token-text-primary text-token-text-inverted":"border-token-border-light text-token-text-secondary"}`;
            let j;
            e[0] !== a ? (j = gt(a), e[0] = a, e[1] = j) : j = e[1];
            let f;
            return e[2] !== s || e[3] !== j ? (f = o.jsx("span", {
                "aria-hidden": "true",
                className: s,
                children: j
            }), e[2] = s, e[3] = j, e[4] = f) : f = e[4], f
        }
        const d = `flex size-7 shrink-0 items-center justify-center rounded-full border ${A?"border-token-text-primary bg-token-text-primary text-token-text-inverted":"border-token-border-light text-transparent"}`;
        let l;
        e[5] === Symbol.for("react.memo_cache_sentinel") ? (l = o.jsx(mt, {
            className: "icon-sm"
        }), e[5] = l) : l = e[5];
        let b;
        return e[6] !== d ? (b = o.jsx("span", {
            "aria-hidden": "true",
            className: d,
            children: l
        }), e[6] = d, e[7] = b) : b = e[7], b
    },
    qt = n => {
        "use forget";
        const e = Ke.c(138),
            {
                contentReference: A,
                isActivelyStreaming: a,
                clientThreadId: p,
                onClose: d
            } = n,
            l = st(),
            b = at(!1),
            [s, j] = h.useState(0),
            [f, ze] = h.useState(1);
        let Z;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (Z = {}, e[0] = Z) : Z = e[0];
        const [v, ve] = h.useState(Z);
        let ee;
        e[1] === Symbol.for("react.memo_cache_sentinel") ? (ee = {}, e[1] = ee) : ee = e[1];
        const [S, Se] = h.useState(ee), [g, He] = h.useState(!1);
        let te;
        e[2] === Symbol.for("react.memo_cache_sentinel") ? (te = [], e[2] = te) : te = e[2];
        const se = h.useRef(te),
            ne = h.useRef(null),
            We = h.useRef(!1),
            X = h.useRef(!1);
        let re;
        e[3] !== d ? (re = () => {
            He(!0), d ? .()
        }, e[3] = d, e[4] = re) : re = e[4];
        const x = re,
            M = A.data.questions,
            r = M[s],
            q = M.length,
            w = s === 0,
            c = s === q - 1,
            $e = v[s] ? ? [];
        let oe;
        e[5] !== s || e[6] !== S ? (oe = S[s] ? .trim() ? ? "", e[5] = s, e[6] = S, e[7] = oe) : oe = e[7];
        const ie = oe.length > 0,
            le = ie || r.type === "multi_select" && $e.length > 0,
            C = r.type === "single_select" && c && a,
            Ce = c ? k.submit : k.nextQuestion;
        let ae;
        e[8] !== s ? (ae = i => {
            ze(i >= s ? 1 : -1), j(i)
        }, e[8] = s, e[9] = ae) : ae = e[9];
        const m = ae;
        let ce;
        e[10] === Symbol.for("react.memo_cache_sentinel") ? (ce = i => {
            se.current[i] ? .focus()
        }, e[10] = ce) : ce = e[10];
        const ue = ce,
            Ye = (i, t) => {
                se.current[i] = t, t != null && i === 0 && X.current && (X.current = !1, requestAnimationFrame(() => t.focus()))
            };
        let de;
        e[11] !== v || e[12] !== p || e[13] !== x || e[14] !== S || e[15] !== l || e[16] !== b ? .store || e[17] !== M ? (de = (i, t) => {
            const u = xt(M, bt(M, t === void 0 ? v : t, S), l.formatMessage(k.noSelection)),
                we = b ? .store.getSharedProps() ? .submitPromptTextOverride;
            if (we) {
                we(i, u, {
                    commitComposerState: !1
                }) !== !1 && x();
                return
            }
            p && (rt({
                callsiteId: "request_completion.formatted_text.ask_user_input_widget.1",
                conversation: lt(p),
                promptMessage: it(u),
                sourceEvent: i
            }), x())
        }, e[11] = v, e[12] = p, e[13] = x, e[14] = S, e[15] = l, e[16] = b ? .store, e[17] = M, e[18] = de) : de = e[18];
        const U = de;
        let me;
        e[19] !== s || e[20] !== m || e[21] !== a || e[22] !== c || e[23] !== U ? (me = i => {
            if (!c) {
                m(s + 1);
                return
            }
            a || U(i)
        }, e[19] = s, e[20] = m, e[21] = a, e[22] = c, e[23] = U, e[24] = me) : me = e[24];
        const I = me;
        let fe;
        e[25] !== s || e[26] !== v || e[27] !== m || e[28] !== a || e[29] !== c || e[30] !== r || e[31] !== U ? (fe = (i, t) => {
            const y = r.options[i],
                u = yt(v, s, r, y);
            if (ve(u), r.type === "single_select" && Se(we => ({ ...we,
                    [s]: ""
                })), ue(i), r.type !== "multi_select") {
                if (!c) {
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            X.current = !0, m(s + 1)
                        })
                    });
                    return
                }
                a || U(t, u)
            }
        }, e[25] = s, e[26] = v, e[27] = m, e[28] = a, e[29] = c, e[30] = r, e[31] = U, e[32] = fe) : fe = e[32];
        const N = fe;
        let pe;
        e[33] !== s || e[34] !== r.type ? (pe = i => {
            const t = i.target.value;
            Se(y => ({ ...y,
                [s]: t
            })), r.type === "single_select" && t.trim() && ve(y => ({ ...y,
                [s]: []
            }))
        }, e[33] = s, e[34] = r.type, e[35] = pe) : pe = e[35];
        const Ie = pe;
        let xe;
        e[36] !== I ? (xe = i => {
            i.key !== "Enter" || i.nativeEvent.isComposing || (i.preventDefault(), I(i))
        }, e[36] = I, e[37] = xe) : xe = e[37];
        const Ne = xe;
        let ye;
        e[38] !== s || e[39] !== x || e[40] !== C || e[41] !== m || e[42] !== g || e[43] !== w || e[44] !== c || e[45] !== r.options || e[46] !== r.type || e[47] !== N ? (ye = () => {
            if (g) return;
            const i = t => {
                if (t.target === ne.current && (t.key === "ArrowDown" || t.key === "ArrowUp")) {
                    t.preventDefault(), t.key === "ArrowUp" && ue(r.options.length - 1);
                    return
                }
                if (t.defaultPrevented || t.metaKey || t.ctrlKey || t.altKey || kt(t.target)) return;
                if (t.key === "Escape") {
                    t.preventDefault(), x();
                    return
                }
                if (t.key === "ArrowDown" || t.key === "ArrowUp") {
                    const u = se.current.findIndex(wt);
                    if (u === -1) return;
                    if (t.preventDefault(), t.key === "ArrowDown" && u === r.options.length - 1) {
                        ne.current ? .focus();
                        return
                    }
                    ue(t.key === "ArrowDown" ? Math.min(u + 1, r.options.length - 1) : Math.max(u - 1, 0));
                    return
                }
                if (t.key === "ArrowRight") {
                    c || (t.preventDefault(), X.current = !0, m(s + 1));
                    return
                }
                if (t.key === "ArrowLeft") {
                    w || (t.preventDefault(), X.current = !0, m(s - 1));
                    return
                }
                const y = ht(t.key);
                if (y != null && y < r.options.length) {
                    if (C) return;
                    t.preventDefault(), N(y, t);
                    return
                }
                t.key.length === 1 && t.key !== " " && (t.preventDefault(), ne.current ? .focus(), Se(u => ({ ...u,
                    [s]: `${u[s]??""}${t.key}`
                })), r.type === "single_select" && ve(u => ({ ...u,
                    [s]: []
                })))
            };
            return document.addEventListener("keydown", i), () => document.removeEventListener("keydown", i)
        }, e[38] = s, e[39] = x, e[40] = C, e[41] = m, e[42] = g, e[43] = w, e[44] = c, e[45] = r.options, e[46] = r.type, e[47] = N, e[48] = ye) : ye = e[48];
        let be;
        e[49] !== s || e[50] !== x || e[51] !== C || e[52] !== m || e[53] !== g || e[54] !== w || e[55] !== c || e[56] !== r || e[57] !== N ? (be = [s, x, C, ue, m, g, w, c, r, N], e[49] = s, e[50] = x, e[51] = C, e[52] = m, e[53] = g, e[54] = w, e[55] = c, e[56] = r, e[57] = N, e[58] = be) : be = e[58], h.useEffect(ye, be);
        let ge, he;
        if (e[59] !== g ? (ge = () => {
                if (g || We.current) return;
                const i = se.current[0];
                i == null || i.disabled || (We.current = !0, requestAnimationFrame(() => {
                    document.activeElement === document.body && i.focus()
                }))
            }, he = [g], e[59] = g, e[60] = ge, e[61] = he) : (ge = e[60], he = e[61]), h.useEffect(ge, he), g) return null;
        const Me = je;
        let D;
        e[62] === Symbol.for("react.memo_cache_sentinel") ? (D = {
            opacity: 1,
            y: 0
        }, e[62] = D) : D = e[62];
        const Ge = "bg-token-bg-primary relative w-full px-5 pt-5";
        let O, E;
        e[63] === Symbol.for("react.memo_cache_sentinel") ? (O = {
            opacity: 0,
            y: 16
        }, E = {
            duration: .18,
            ease: "easeOut"
        }, e[63] = O, e[64] = E) : (O = e[63], E = e[64]);
        const Ve = "relative";
        let T;
        e[65] !== l ? (T = l.formatMessage(k.close), e[65] = l, e[66] = T) : T = e[66];
        let ke;
        e[67] === Symbol.for("react.memo_cache_sentinel") ? (ke = o.jsx(ft, {
            className: "icon"
        }), e[67] = ke) : ke = e[67];
        let Q;
        e[68] !== x || e[69] !== T ? (Q = o.jsx("button", {
            type: "button",
            "aria-label": T,
            className: "text-token-text-primary hover:bg-token-bg-tertiary absolute end-0 -top-1 flex size-8 shrink-0 items-center justify-center rounded-full transition-colors",
            onClick: x,
            children: ke
        }), e[68] = x, e[69] = T, e[70] = Q) : Q = e[70];
        const qe = ot,
            _e = !1,
            Je = "wait",
            Ue = je,
            De = `question-${s}`,
            Xe = "visible",
            Ze = "exit",
            et = "hidden",
            Oe = At;
        let R;
        e[71] !== r.question ? (R = o.jsx("h3", {
            className: "text-token-text-primary min-w-0 flex-1 text-lg leading-6 font-medium break-words",
            children: r.question
        }), e[71] = r.question, e[72] = R) : R = e[72];
        let W;
        e[73] !== s || e[74] !== m || e[75] !== l || e[76] !== w || e[77] !== c || e[78] !== q ? (W = q > 1 && o.jsxs("div", {
            className: "-mt-1 flex shrink-0 items-center gap-1",
            children: [o.jsx("button", {
                type: "button",
                "aria-label": l.formatMessage(k.previousQuestion),
                disabled: w,
                className: "text-token-text-primary hover:bg-token-bg-tertiary disabled:text-token-text-tertiary flex size-8 shrink-0 items-center justify-center rounded-full transition-colors disabled:hover:bg-transparent",
                onClick: () => m(Math.max(s - 1, 0)),
                children: o.jsx(ct, {
                    className: "icon-sm"
                })
            }), o.jsx("div", {
                className: "text-token-text-secondary min-w-10 text-center text-sm",
                children: o.jsx(Re, { ...k.pageCount,
                    values: {
                        current: s + 1,
                        total: q
                    }
                })
            }), o.jsx("button", {
                type: "button",
                "aria-label": l.formatMessage(k.nextQuestion),
                disabled: c,
                className: "text-token-text-primary hover:bg-token-bg-tertiary disabled:text-token-text-tertiary flex size-8 shrink-0 items-center justify-center rounded-full transition-colors disabled:hover:bg-transparent",
                onClick: () => m(Math.min(s + 1, q - 1)),
                children: o.jsx(Fe, {
                    className: "icon-sm"
                })
            })]
        }), e[73] = s, e[74] = m, e[75] = l, e[76] = w, e[77] = c, e[78] = q, e[79] = W) : W = e[79];
        let $;
        e[80] !== R || e[81] !== W ? ($ = o.jsxs("div", {
            className: "flex items-start gap-3 pe-11",
            children: [R, W]
        }), e[80] = R, e[81] = W, e[82] = $) : $ = e[82];
        let F;
        e[83] !== r.type ? (F = r.type === "multi_select" && o.jsx("p", {
            className: "text-token-text-secondary mt-1 text-sm",
            children: o.jsx(Re, { ...k.selectAllThatApply
            })
        }), e[83] = r.type, e[84] = F) : F = e[84];
        const tt = "mt-4",
            Ee = r.options.map((i, t) => {
                const y = $e.includes(i);
                return o.jsx("div", {
                    className: "border-token-border-light border-t",
                    children: o.jsxs("button", {
                        ref: u => Ye(t, u),
                        type: "button",
                        className: "hover:bg-token-bg-secondary/40 focus:bg-token-bg-secondary/40 disabled:text-token-text-tertiary -mx-2 flex w-[calc(100%+1rem)] items-center gap-3 rounded-xl px-2 py-4 text-start transition-colors focus:outline-none disabled:hover:bg-transparent",
                        "aria-pressed": y,
                        disabled: C,
                        onClick: u => N(t, u),
                        children: [o.jsx(Be, {
                            isSelected: y,
                            optionIndex: t,
                            questionType: r.type
                        }), o.jsx(je.span, {
                            className: "text-token-text-primary text-base leading-7",
                            custom: f,
                            variants: Le,
                            children: i
                        })]
                    })
                }, `${i}-${t}`)
            }),
            Te = `hover:bg-token-bg-secondary/40 focus-within:bg-token-bg-secondary/40 -mx-2 flex w-[calc(100%+1rem)] cursor-text items-center gap-3 rounded-xl px-2 transition-colors ${le?"py-4":"py-3"}`;
        let L;
        e[85] !== ie || e[86] !== r.type ? (L = r.type === "multi_select" && ie ? o.jsx(Be, {
            isSelected: !0,
            optionIndex: 0,
            questionType: "multi_select"
        }) : o.jsx("span", {
            className: "flex size-7 shrink-0 items-center justify-center",
            children: o.jsx(ut, {
                className: "icon-sm text-token-text-tertiary"
            })
        }), e[85] = ie, e[86] = r.type, e[87] = L) : L = e[87];
        const Qe = S[s] ? ? "";
        let B;
        e[88] !== l ? (B = l.formatMessage(k.typeYourAnswer), e[88] = l, e[89] = B) : B = e[89];
        let K;
        e[90] !== l || e[91] !== r.question ? (K = l.formatMessage(k.customAnswerInputLabel, {
            question: r.question
        }), e[90] = l, e[91] = r.question, e[92] = K) : K = e[92];
        let P;
        e[93] !== Ie || e[94] !== Ne || e[95] !== Qe || e[96] !== B || e[97] !== K ? (P = o.jsx("input", {
            ref: ne,
            type: "text",
            value: Qe,
            placeholder: B,
            "aria-label": K,
            className: "placeholder:text-token-text-tertiary text-token-text-primary block h-7 min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-base leading-7 shadow-none ring-0 outline-none placeholder:ps-px",
            onChange: Ie,
            onKeyDown: Ne
        }), e[93] = Ie, e[94] = Ne, e[95] = Qe, e[96] = B, e[97] = K, e[98] = P) : P = e[98];
        let z;
        e[99] !== Ce || e[100] !== le || e[101] !== l || e[102] !== a || e[103] !== c || e[104] !== I ? (z = le ? o.jsx("button", {
            type: "button",
            "aria-label": l.formatMessage(Ce),
            disabled: a && c,
            className: "composer-submit-btn composer-submit-button-color h-7 w-7 shrink-0",
            onClick: I,
            children: c ? o.jsx(dt, {
                className: "icon"
            }) : o.jsx(Fe, {
                className: "icon-sm"
            })
        }) : o.jsx("button", {
            type: "button",
            disabled: a && c,
            className: "border-token-border-medium text-token-text-primary hover:bg-token-bg-secondary disabled:text-token-text-tertiary flex h-9 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors disabled:hover:bg-transparent",
            onClick: I,
            children: o.jsx(Re, { ...k.skip
            })
        }), e[99] = Ce, e[100] = le, e[101] = l, e[102] = a, e[103] = c, e[104] = I, e[105] = z) : z = e[105];
        let H;
        e[106] !== f || e[107] !== P || e[108] !== z ? (H = o.jsxs(je.div, {
            className: "flex min-w-0 flex-1 items-center gap-3",
            custom: f,
            variants: Le,
            children: [P, z]
        }), e[106] = f, e[107] = P, e[108] = z, e[109] = H) : H = e[109];
        let Y;
        e[110] !== Te || e[111] !== L || e[112] !== H ? (Y = o.jsx("div", {
            className: "border-token-border-light border-t",
            children: o.jsxs("div", {
                className: Te,
                children: [L, H]
            })
        }), e[110] = Te, e[111] = L, e[112] = H, e[113] = Y) : Y = e[113];
        let G;
        e[114] !== Ee || e[115] !== Y ? (G = o.jsxs("div", {
            className: tt,
            children: [Ee, Y]
        }), e[114] = Ee, e[115] = Y, e[116] = G) : G = e[116];
        let V;
        e[117] !== f || e[118] !== Ue.div || e[119] !== De || e[120] !== Oe || e[121] !== $ || e[122] !== F || e[123] !== G ? (V = o.jsxs(Ue.div, {
            animate: Xe,
            custom: f,
            exit: Ze,
            initial: et,
            variants: Oe,
            children: [$, F, G]
        }, De), e[117] = f, e[118] = Ue.div, e[119] = De, e[120] = Oe, e[121] = $, e[122] = F, e[123] = G, e[124] = V) : V = e[124];
        let _;
        e[125] !== qe || e[126] !== f || e[127] !== V ? (_ = o.jsx(qe, {
            custom: f,
            initial: _e,
            mode: Je,
            children: V
        }), e[125] = qe, e[126] = f, e[127] = V, e[128] = _) : _ = e[128];
        let J;
        e[129] !== Q || e[130] !== _ ? (J = o.jsxs("div", {
            className: Ve,
            children: [Q, _]
        }), e[129] = Q, e[130] = _, e[131] = J) : J = e[131];
        let Ae;
        return e[132] !== Me.div || e[133] !== D || e[134] !== O || e[135] !== E || e[136] !== J ? (Ae = o.jsx(Me.div, {
            animate: D,
            className: Ge,
            initial: O,
            transition: E,
            children: J
        }), e[132] = Me.div, e[133] = D, e[134] = O, e[135] = E, e[136] = J, e[137] = Ae) : Ae = e[137], Ae
    };

function wt(n) {
    return n === document.activeElement
}
export {
    qt as A, Mt as i
};
//# sourceMappingURL=32867333-oem65mfnc75cw7w7.js.map