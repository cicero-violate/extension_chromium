const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/d00dcb47-lx203gmmmcev1i3f.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/conversation-small-cqp6votf.css"]))) => i.map(i => d[i]);
import {
    j as t,
    o as x,
    c as $e,
    u as Se,
    r as B,
    _ as It,
    f as Pt,
    s as Ye,
    h as We
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    rj as ie,
    _ as z,
    S as Qe,
    dE as fe,
    dF as me,
    rk as ae,
    xC as qe,
    mD as Xe,
    eh as wt,
    x as Je,
    fc as C,
    aw as Ze,
    hi as Lt,
    af as _e,
    fk as et,
    c1 as Pe,
    jF as tt,
    ch as Nt,
    z0 as we,
    u1 as st,
    n as lt,
    gJ as vt,
    l as Ot,
    oG as kt,
    hM as Ut,
    gV as Dt,
    e as N,
    qH as Ht,
    dz as Rt,
    s4 as Ft,
    h as Gt,
    z1 as Vt,
    bb as Bt,
    o0 as zt,
    dA as Kt,
    qG as Le,
    dp as $t,
    oK as ge,
    J as Yt,
    gp as Wt,
    vY as Qt,
    I as oe,
    z2 as qt,
    z3 as Xt,
    u7 as Jt,
    bN as Zt,
    jE as es,
    s3 as Ne,
    q as pe,
    xB as ts,
    z4 as he,
    xz as ss,
    dx as ls,
    dD as ns,
    xD as os,
    bY as as,
    fd as nt,
    c8 as is,
    c9 as rs,
    ca as ds,
    lB as cs,
    dH as us,
    oH as gs,
    c7 as ve,
    gG as hs,
    hF as fs,
    ay as ms
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    ev as ot,
    ew as ps,
    jg as Ms,
    jh as at,
    ji as Ss,
    jj as V,
    jk as _s,
    jl as Es,
    jm as xs,
    h7 as Cs,
    d5 as Oe,
    jn as ys,
    jo as ke,
    d0 as it,
    jp as As,
    jq as bs,
    jr as js,
    d4 as Ts,
    js as Is,
    jt as Ps,
    ju as ws,
    jv as Ls,
    jw as Ue,
    jx as Ns
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    F as vs
} from "./48fd09b9-hd5x0odfr6dgdtaz.js";
const De = 44,
    He = 352,
    Os = 100;

function rt({
    conversation: s,
    currentModelId: e,
    modelId: n,
    applyModelSelection: o
}) {
    const a = ie();
    z.logEvent("Model Switcher Model Changed", {
        from: e,
        to: n
    }), Qe.logEvent("chatgpt_model_switcher_model_changed", n, {
        from: e ? ? "",
        to: n
    }), z.logStructuredEvent(fe, {
        surface: a ? ae.CHATGPT_MODEL_PICKER_SURFACE_DROPDOWN : ae.CHATGPT_MODEL_PICKER_SURFACE_LEGACY,
        uiEvent: {
            type: me.CHATGPT_MODEL_PICKER_UI_EVENT_TYPE_MODEL_CLICKED
        },
        modelChangedEvent: {
            modelSlug: n
        }
    }), qe().mutate({
        modelSlug: n
    }), o(s, n)
}

function ks(s) {
    "use forget";
    const e = $e.c(36),
        {
            conversation: n,
            currentModel: o,
            categoryOptions: a,
            className: u,
            modelSwitcherDenialsBySlug: p,
            displayInFull_INTERNAL_USE_ONLY: M,
            onModelItemClick: f,
            preferredModelId: i
        } = s,
        c = M === void 0 ? !1 : M,
        S = Se(),
        r = o ? .id ? ? null,
        [_, P] = B.useState("");
    let A;
    e: {
        if (!_) {
            A = a;
            break e
        }
        let b;
        if (e[0] !== a || e[1] !== _) {
            let j;
            e[3] !== _ ? (j = Q => Q.name.toLowerCase().includes(_.toLowerCase()), e[3] = _, e[4] = j) : j = e[4], b = a.filter(j), e[0] = a, e[1] = _, e[2] = b
        } else b = e[2];A = b
    }
    const T = A;
    let R;
    e: {
        if (T.some(Ds)) {
            R = void 0;
            break e
        }
        R = T
    }
    const I = R,
        y = I != null && I.length > Os,
        L = I ? Math.min(He, I.length * De) : He;
    let d;
    e[5] !== u ? (d = _e("flex flex-col pt-0", u), e[5] = u, e[6] = d) : d = e[6];
    let v;
    e[7] === Symbol.for("react.memo_cache_sentinel") ? (v = {
        borderRadius: "inherit"
    }, e[7] = v) : v = e[7];
    let O;
    e[8] === Symbol.for("react.memo_cache_sentinel") ? (O = b => {
        P(b.target.value)
    }, e[8] = O) : O = e[8];
    let U;
    e[9] !== _ ? (U = t.jsx("div", {
        className: "p-2",
        children: t.jsx(at, {
            inputClassName: "w-full",
            value: _,
            onKeyDown: Us,
            onChange: O
        })
    }), e[9] = _, e[10] = U) : U = e[10];
    let m;
    e[11] === Symbol.for("react.memo_cache_sentinel") ? (m = t.jsx("hr", {}), e[11] = m) : m = e[11];
    let D;
    e[12] !== U ? (D = t.jsxs("div", {
        style: v,
        className: "sticky top-0 z-1 bg-white",
        children: [U, m]
    }), e[12] = U, e[13] = D) : D = e[13];
    let F;
    e[14] !== T.length || e[15] !== S ? (F = T.length === 0 && t.jsx(C.Item, {
        children: S.formatMessage({
            id: "model-switcher.no-results",
            defaultMessage: "No results found"
        })
    }), e[14] = T.length, e[15] = S, e[16] = F) : F = e[16];
    let K;
    e[17] !== n || e[18] !== o || e[19] !== r || e[20] !== c || e[21] !== T || e[22] !== I || e[23] !== p || e[24] !== f || e[25] !== i || e[26] !== y || e[27] !== L ? (K = y && I ? t.jsx(vs, {
        className: "scrollbar-gutter-stable",
        height: L,
        itemCount: I.length,
        itemSize: De,
        width: "100%",
        overscanCount: 20,
        itemKey: b => I[b].value,
        children: b => {
            const {
                index: j,
                style: Q
            } = b, H = I[j];
            return t.jsx("div", {
                style: Q,
                children: t.jsx(Y, {
                    conversation: n,
                    currentModelId: r,
                    isSelected: r === H.value,
                    value: H.value,
                    modelSwitcherDenialsBySlug: p,
                    displayInFull_INTERNAL_USE_ONLY: c,
                    onClick: f,
                    preferredModelId: i,
                    children: H.name
                })
            })
        }
    }) : T.map(b => {
        const {
            value: j
        } = b;
        return "options" in b ? t.jsx(J, {
            conversation: n,
            currentModel: o,
            isSelected: r ? .startsWith(j),
            option: b,
            modelSwitcherDenialsBySlug: p,
            displayInFull_INTERNAL_USE_ONLY: c,
            onModelItemClick: f,
            preferredModelId: i
        }, j) : t.jsx(Y, {
            conversation: n,
            currentModelId: r,
            isSelected: r === j,
            value: j,
            modelSwitcherDenialsBySlug: p,
            displayInFull_INTERNAL_USE_ONLY: c,
            onClick: f,
            preferredModelId: i,
            children: b.name
        }, j)
    }), e[17] = n, e[18] = o, e[19] = r, e[20] = c, e[21] = T, e[22] = I, e[23] = p, e[24] = f, e[25] = i, e[26] = y, e[27] = L, e[28] = K) : K = e[28];
    let $;
    e[29] !== F || e[30] !== K ? ($ = t.jsxs("div", {
        className: "scrollbar-gutter-stable w-[min(320px,95vw)] flex-grow overflow-auto",
        children: [F, K]
    }), e[29] = F, e[30] = K, e[31] = $) : $ = e[31];
    let W;
    return e[32] !== $ || e[33] !== d || e[34] !== D ? (W = t.jsx(C.Portal, {
        children: t.jsxs(C.SubContent, {
            className: d,
            children: [D, $]
        })
    }), e[32] = $, e[33] = d, e[34] = D, e[35] = W) : W = e[35], W
}

function Us(s) {
    s.stopPropagation()
}

function Ds(s) {
    return "options" in s
}

function J({
    conversation: s,
    currentModel: e,
    option: n,
    isSelected: o = !1,
    modelSwitcherDenialsBySlug: a,
    displayInFull_INTERNAL_USE_ONLY: u = !1,
    onModelItemClick: p,
    preferredModelId: M,
    openOnHover: f = !1
}) {
    const {
        name: i,
        options: c,
        categoryId: S
    } = n, r = `${i} Models`, _ = () => t.jsx("div", {
        className: "flex shrink-0 grow justify-between gap-2",
        children: t.jsxs("div", {
            className: "flex items-center gap-3",
            children: [t.jsx(Ms, {
                className: "icon"
            }), r]
        })
    });
    let P;
    return u && o && (P = n.options.find(A => A.value === e ? .id) ? .name), t.jsxs(C.Sub, {
        children: [t.jsx(C.SubMenuTrigger, {
            openOnHover: f,
            children: t.jsxs("div", {
                className: _e("flex grow justify-between gap-2 overflow-hidden", u ? "items-center break-all" : ""),
                children: [S ? _() : i, o && t.jsx("div", {
                    className: "text-token-text-tertiary truncate",
                    children: P ? ? e ? .title
                })]
            })
        }), t.jsx(ks, {
            conversation: s,
            currentModel: e,
            categoryOptions: c,
            modelSwitcherDenialsBySlug: a,
            displayInFull_INTERNAL_USE_ONLY: u,
            onModelItemClick: p,
            preferredModelId: M
        })]
    })
}

function Y({
    value: s,
    children: e,
    icon: n,
    secondary: o,
    currentModelId: a,
    isSelected: u,
    onClick: p,
    modelSwitcherDenialsBySlug: M,
    isUpgradeUpsell: f = !1,
    upgradeCtaMessage: i,
    testId: c,
    displayInFull_INTERNAL_USE_ONLY: S = !1,
    deprecated: r,
    preferredModelId: _,
    disabledByAdmin: P,
    conversation: A
}) {
    const T = s ? M[s] ? .conversation ? .[0] : null,
        R = Xe(),
        I = wt(),
        y = ot({
            modelSlug: s,
            modelSwitcherDenialsBySlug: M
        }),
        L = P || !y,
        d = Je("1846737571"),
        v = () => {
            L || (R === Pe.Glaux && I(null, {
                ifPrevSystemHint: Pe.Glaux
            }), p ? p(s) : s && rt({
                conversation: A,
                currentModelId: a,
                modelId: s,
                applyModelSelection: tt
            }))
        },
        O = t.jsx(C.Item, {
            onClick: v,
            disabled: L,
            className: _e(S && "break-all"),
            icon: n,
            secondary: o,
            trailingColor: "primary",
            trailing: f ? t.jsx(Ze, {
                color: "secondary",
                size: "small",
                className: d.get("is_upgrade_button_blue", !1) ? "border-none bg-blue-600 text-white hover:bg-blue-800" : "",
                children: i ? t.jsx(x, { ...i
                }) : t.jsx(x, {
                    id: "oKo8wt",
                    defaultMessage: "Upgrade"
                })
            }) : u ? t.jsx(Lt, {
                className: "icon-sm"
            }) : t.jsx("span", {
                className: "icon"
            }),
            "data-testid": c,
            children: t.jsxs("span", {
                className: "flex items-center gap-1",
                children: [e, s && s === _ && !u && !f && !r && t.jsx("span", {
                    className: "inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700",
                    children: t.jsx(x, {
                        id: "model-switcher.preferred",
                        defaultMessage: "GPT creator recommended"
                    })
                })]
            })
        }, s);
    return T ? t.jsx(et, {
        withArrow: !0,
        side: "right",
        sideOffset: -10,
        label: t.jsx(ps, {
            modelSwitcherDeny: T
        }),
        children: O
    }) : O
}
const Re = Nt(() => It(() =>
        import ("./d00dcb47-lx203gmmmcev1i3f.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5])).then(s => s.IntelligenceModal)),
    dt = "top_level_secondary_models",
    Fe = "atlas_mode",
    Ge = "alpha-models",
    Ve = 1;

function Be({
    currentModelId: s,
    currentVersionId: e,
    modelsData: n
}) {
    let o = s;
    if (s === we.AUTO) {
        const i = n.categories.filter(({
            defaultModel: c
        }) => c !== we.AUTO);
        i ? .length === 1 && (o = i[0].defaultModel)
    }
    const a = n.categories.find(({
            defaultModel: i,
            supportedModels: c
        }) => i === o || o && c ? .includes(o)),
        u = st(n, e),
        p = u && u.id === n.versions ? .[0] ? .id,
        M = ie();
    if (a) {
        const {
            categoryId: i
        } = a;
        return {
            selectedCategory: i,
            modelLabel: M ? p ? "" : u ? .displayText : a.shortLabel,
            fullModelLabel: a.label
        }
    }
    const f = n.groups.find(({
        modelIds: i
    }) => o && i.includes(o));
    if (f) {
        const {
            group: i,
            shortLabel: c,
            label: S
        } = f;
        return {
            selectedCategory: i,
            modelLabel: c,
            fullModelLabel: S
        }
    }
    return Ss(o) ? {
        selectedCategory: V.ALPHA,
        modelLabel: "α",
        fullModelLabel: "Alpha"
    } : {
        selectedCategory: null,
        modelLabel: null,
        fullModelLabel: null
    }
}

function Ws(s) {
    "use forget";
    const e = $e.c(8),
        n = hs();
    let o;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (o = oe(), e[0] = o) : o = e[0];
    const a = o,
        u = fs(Hs);
    let p;
    e: {
        if (!lt()) {
            p = !1;
            break e
        }
        let c;e[1] !== s || e[2] !== n ? (c = Ps(a, n, s), e[1] = s, e[2] = n, e[3] = c) : c = e[3],
        p = c
    }
    const M = p;
    let f, i;
    return e[4] !== M || e[5] !== u ? (f = () => {
        M && ws() && !u && ms.setThreadModelPickerAlertDot(!0)
    }, i = [M, u], e[4] = M, e[5] = u, e[6] = f, e[7] = i) : (f = e[6], i = e[7]), B.useEffect(f, i), M
}

function Hs(s) {
    return s.shouldShowThreadModelPickerDot
}

function Rs(s, e, n, o) {
    const a = e ? s.formatMessage(Me.beta) : n ? s.formatMessage(Me.alpha) : o;
    if (a) return t.jsx(nt, {
        children: a
    })
}

function ze({
    category: s,
    modelSwitcherDenialsBySlug: e,
    conversation: n,
    currentGizmoId: o,
    currentModelId: a,
    isConversationAtlasModeEnabled: u = !1,
    testId: p,
    preferredModelId: M,
    disabledByAdmin: f = !1,
    disableSelectionHighlight: i = !1,
    version: c
}) {
    const S = Se(),
        {
            defaultModel: r,
            label: _,
            labelAppendVersion: P,
            description: A,
            tagline: T,
            isBeta: R,
            isAlpha: I,
            modelBadge: y,
            subcategory: L
        } = s,
        d = us(o ? ? ""),
        v = gs(r),
        O = ie(),
        U = L !== void 0 && L !== dt,
        m = t.jsxs(Y, {
            value: r,
            conversation: n,
            currentModelId: a,
            modelSwitcherDenialsBySlug: e,
            secondary: O ? T : U && !v ? void 0 : A,
            deprecated: v,
            disabledByAdmin: f,
            isSelected: !u && !i && (!o || d) && a === r,
            testId: p,
            preferredModelId: M,
            children: [_, P && t.jsx("span", {
                className: "text-token-text-tertiary text-xs",
                children: c
            }), Rs(S, R, I, y)]
        }, r);
    return f ? t.jsx(et, {
        label: S.formatMessage(Me.disabledByAdmin),
        children: m
    }) : m
}

function Qs({
    sections: s
}) {
    return t.jsx(t.Fragment, {
        children: s.map((e, n) => {
            const o = s[n - 1] ? .id,
                a = n !== 0 && o !== "model-picker-title",
                u = o === "atlas-model-section";
            return t.jsxs(Pt.Fragment, {
                children: [a ? t.jsx(C.Separator, {
                    noMargin: u,
                    className: u ? "my-1" : void 0
                }) : null, e.content]
            }, e.id)
        })
    })
}

function qs(s, e, n, o, a) {
    const u = Se(),
        p = !lt(),
        {
            data: M
        } = vt(),
        f = Ot(),
        i = !p && !!f && kt(f) && M && (!Ut(M) || M.currentAccount ? .isFreeWorkspace() || Dt()),
        c = N(() => Ht(s)),
        S = N(() => Rt(s)),
        r = S.id,
        _ = N(() => Ft(s)),
        P = Gt() && Vt(),
        A = N(() => Bt(s)),
        T = zt(A),
        R = !!A && !T,
        I = Xe(),
        y = cs(I),
        L = y ? null : r;
    let d = N(() => Kt(s));
    const v = Le(),
        O = _s(),
        U = Es(),
        m = xs({
            conversation: s
        }),
        D = ie(),
        F = $t(),
        K = N(() => r !== ge(s) && ot({
            modelSlug: ge(s),
            modelSwitcherDenialsBySlug: m
        })),
        {
            eligible: $
        } = Cs(Oe.hasSeenConfigureMenu),
        W = $ && F,
        b = Yt();
    N(() => ({
        data: void 0,
        isSuccess: !1,
        isPlaceholderData: !1
    }));
    const j = N(Wt),
        {
            data: Q
        } = N(() => A && !T ? Qt() : {
            data: void 0
        }),
        H = e.find(({
            categoryId: l
        }) => l === V.ALPHA),
        ee = e.find(({
            categoryId: l
        }) => l === V.DATA_CAMPAIGNS),
        te = e.find(({
            categoryId: l
        }) => l === V.EXPERIMENTS),
        se = e.find(({
            categoryId: l
        }) => l === V.MAINLINE),
        [Z, ut] = B.useState(""),
        gt = N(() => !0),
        q = oe() ? .id ? ? null,
        ht = B.useMemo(() => {
            if (q == null) return;
            const l = qt(q, Ge, Ve);
            if (ys(l)) return l
        }, [q]);
    B.useEffect(() => {
        q == null || !c || H == null || Xt(q, Ge, H, Ve)
    }, [H, c, q]);
    const le = c ? H : ht,
        ft = [H, ee, te, se].reduce((l, g) => g ? [...l, ...g.options.map(h => ke(h) ? { ...h,
            badge: g.categoryId,
            sourceCategoryId: g.categoryId
        } : h)] : l, []),
        mt = [le].reduce((l, g) => g ? [...l, ...g.options.map(h => ke(h) ? { ...h,
            badge: g.categoryId,
            sourceCategoryId: g.categoryId
        } : h)] : l, []),
        re = c ? ft : mt,
        Ee = B.useMemo(() => Z ? re.filter(l => l.name.toLowerCase().includes(Z.toLowerCase())) : re, [Z, re]);
    if (o && A && Q) {
        const l = JSON.parse(JSON.stringify(d));
        l.categories = l.categories.filter(({
            defaultModel: g
        }) => Q.editor.models_list_with_custom_actions.includes(g)), l.versions = l.versions ? .filter(g => g.slugs.some(h => Q.editor.models_list_with_custom_actions.includes(h))), d = l
    }
    const {
        conversationVersion$: pt
    } = Jt(s), de = N(() => pt()), Mt = !!H ? .options.length, St = !!ee ? .options.length, _t = !!te ? .options.length, Et = !!se ? .options.length, xe = Ye(), Ce = B.useCallback(l => {
        z.logEvent("Account Pay: Open Payment from Model Picker", {
            content: "gizmo-button"
        }), it(xe, "Thread header dropdown", l)
    }, [xe]), xt = () => {
        Qe.logEvent("chatgpt_model_switcher_plus_upgrade_button_clicked"), z.logEvent("Model Switcher Plus Upgrade Button Clicked"), p ? is({
            shouldOpenPaymentModalOnAuth: !0,
            callback: l => {
                rs({
                    location: "Model switcher GPT-4 upsell",
                    provider: l
                }, ds.ACCESS_FLOW_ENTRY_POINT_MODEL_SWITCHER_GPT4_UPSELL)
            },
            skipLoginModal: !1
        }) : Ce()
    }, Ct = () => {
        z.logEventWithStatsig("Model Switcher Team Upgrade Button Clicked", "chatgpt_model_switcher_team_upgrade_button_clicked"), Ce(Is)
    }, ye = B.useCallback(() => {
        const l = Zt(() => es(s).id);
        if (!l || l === r) {
            Ne(s);
            return
        }
        rt({
            conversation: s,
            currentModelId: r,
            modelId: l,
            applyModelSelection: Ne
        })
    }, [s, r]), Ae = B.useCallback(() => t.jsx(Y, {
        value: Fe,
        conversation: s,
        currentModelId: r,
        onClick: ye,
        modelSwitcherDenialsBySlug: m,
        isSelected: _,
        secondary: t.jsx(x, {
            id: "i86+Qa",
            defaultMessage: "Faster, richer web search"
        }),
        children: t.jsx(x, {
            id: "It7Y86",
            defaultMessage: "Atlas"
        })
    }, Fe), [s, r, ye, m, _]), k = [], be = pe("3315017149"), yt = !!(d.secondaryTitle && d.secondaryTitle !== "" && be), At = d.versions ? ? [], je = st(d, de) ? ? At[0], bt = N(() => ts(s)), X = Le() && (be && d.title || D) ? {
        id: "model-picker-title",
        content: [t.jsx(C.Label, {
            className: "mb-0",
            children: D ? je ? .displayTextFull : d.title
        }, "model-picker-title")]
    } : null;
    if (p) {
        X && k.push(X);
        const l = {
            id: "modelSection",
            content: []
        };
        l.content.push(t.jsx(Ls, {
            location: "model-switcher",
            statsig_login_event: "chatgpt_modelswitcher_login_button_clicked",
            statsig_signup_event: "chatgpt_modelswitcher_signup_button_clicked"
        }, "noAuthUpsell")), k.push(l)
    } else if (!v && !R) {
        P && k.push({
            id: "atlas-model-section",
            content: [Ae()]
        }), X && k.push(X);
        const l = {
            id: "modelSection",
            content: []
        };
        i ? l.content.push(t.jsx(Y, {
            value: "",
            conversation: s,
            currentModelId: r,
            onClick: Ct,
            modelSwitcherDenialsBySlug: m,
            isUpgradeUpsell: !0,
            upgradeCtaMessage: Vs(U),
            icon: As,
            secondary: t.jsx(x, {
                id: "001Ixi",
                defaultMessage: "Advanced AI for your work"
            }),
            isSelected: !1,
            children: t.jsx(x, {
                id: "K94mcH",
                defaultMessage: "ChatGPT Business"
            })
        }, "teamUpgrade")) : l.content.push(t.jsx(Y, {
            value: "",
            conversation: s,
            currentModelId: r,
            onClick: xt,
            modelSwitcherDenialsBySlug: m,
            isUpgradeUpsell: !0,
            upgradeCtaMessage: Gs(O),
            icon: bs,
            secondary: t.jsx(x, {
                id: "bqTHri",
                defaultMessage: "Our smartest model & more"
            }),
            isSelected: !1,
            children: t.jsx(x, {
                id: "mzDzkX",
                defaultMessage: "ChatGPT Plus"
            })
        }, "plusUpgrade")), l.content.push(t.jsx(Y, {
            value: he.AUTO,
            conversation: s,
            currentModelId: r,
            modelSwitcherDenialsBySlug: m,
            icon: js,
            secondary: i ? t.jsx(x, {
                id: "R8fHfF",
                defaultMessage: "For quick tasks & answers"
            }) : t.jsx(x, {
                id: "n96qML",
                defaultMessage: "Great for everyday tasks"
            }),
            isSelected: !y && !A && L === he.AUTO,
            children: t.jsx(x, {
                id: "U9E7Rx",
                defaultMessage: "ChatGPT"
            })
        }, he.AUTO)), k.push(l)
    } else {
        P && k.push({
            id: "atlas-model-section",
            content: [Ae()]
        }), X && k.push(X);
        const l = {
            id: "modelSection",
            content: []
        };
        if (D) {
            const g = ss(d, je, bt);
            l.content.push(...g.map(h => t.jsx(ze, {
                category: h,
                conversation: s,
                currentGizmoId: A,
                currentModelId: r,
                isConversationAtlasModeEnabled: _ && P,
                modelSwitcherDenialsBySlug: m,
                preferredModelId: a,
                testId: `model-switcher-${h.defaultModel}`,
                disabledByAdmin: h.disabledByAdmin,
                disableSelectionHighlight: y
            }, h.categoryId))), l.content.push(t.jsx(C.Separator, {}, "model-configure-separator")), K && l.content.push(t.jsx(C.Item, {
                label: t.jsx(x, {
                    id: "EnsQOL",
                    defaultMessage: "Use latest model"
                }),
                onClick: () => {
                    const h = ge(s);
                    tt(s, h);
                    const ce = F ? ls() ? .model : ns() ? .model;
                    h !== ce && (os().mutate({
                        modelSlug: h,
                        toaster: b,
                        intl: u
                    }).then(() => {
                        qe().mutate({
                            modelSlug: h
                        })
                    }), z.logStructuredEvent(fe, {
                        surface: ae.CHATGPT_MODEL_PICKER_SURFACE_DROPDOWN,
                        uiEvent: {
                            type: me.CHATGPT_MODEL_PICKER_UI_EVENT_TYPE_RESET_TO_LATEST_CLICKED
                        },
                        modelChangedEvent: {
                            modelSlug: h
                        },
                        defaultModelChangedEvent: {
                            modelSlug: h
                        }
                    }))
                }
            })), l.content.push(t.jsx(C.Item, {
                "data-testid": "model-configure-modal",
                label: t.jsx(x, {
                    id: "ZW2YKC",
                    defaultMessage: "Configure..."
                }),
                secondary: W ? t.jsx("span", {
                    className: "text-token-interactive-label-accent-default",
                    children: t.jsx(x, {
                        id: "E/2+8t",
                        defaultMessage: "Set default model and more"
                    })
                }) : null,
                onClick: () => {
                    as(Re, {
                        conversation: s,
                        modelsData: d,
                        modelSwitcherDenialsBySlug: m
                    }), W && Ts(Oe.hasSeenConfigureMenu), z.logStructuredEvent(fe, {
                        surface: ae.CHATGPT_MODEL_PICKER_SURFACE_DROPDOWN,
                        uiEvent: {
                            type: me.CHATGPT_MODEL_PICKER_UI_EVENT_TYPE_CONFIGURE_CLICKED
                        }
                    })
                },
                onMouseOver: () => Re.prefetch()
            }))
        } else {
            const g = new Map,
                h = [];
            d.categories.forEach(E => {
                const w = t.jsx(ze, {
                    category: E,
                    conversation: s,
                    currentGizmoId: A,
                    currentModelId: r,
                    isConversationAtlasModeEnabled: _ && P,
                    modelSwitcherDenialsBySlug: m,
                    preferredModelId: a,
                    testId: `model-switcher-${E.defaultModel}`,
                    disabledByAdmin: E.disabledByAdmin,
                    disableSelectionHighlight: y,
                    version: E.modelVersion
                }, E.categoryId);
                if (E.subcategory === dt) {
                    h.push(w);
                    return
                }
                E.subcategory ? (g.has(E.subcategory) || g.set(E.subcategory, []), g.get(E.subcategory) ? .push(w)) : l.content.push(w)
            }), yt && h.length && l.content.push(t.jsx(C.Label, {
                className: "mb-0",
                children: d.secondaryTitle
            }, "secondary-model-picker-title")), h.length && l.content.push(...h);
            const ce = d.categories.some(E => E.defaultModel === "gpt-5") ? ? !1,
                jt = d.categories.some(E => E.defaultModel === "gpt-5-pro") ? ? !1;
            if (ce && !jt && !(oe() ? .isPro() || oe() ? .isProlite()) && pe("3309244414")) {
                const E = t.jsx(Fs, {}),
                    w = d.categories.find(ue => ue.defaultModel === "gpt-5-thinking") ? .subcategory;
                w ? g.get(w) ? .push(E) : l.content.push(E)
            }
            g.forEach((E, w) => {
                w && l.content.push(t.jsx(C.Separator, {}, `${w}-divider`));
                const ue = d.categories.find(Ie => Ie.subcategory === w && Ie.defaultModel === S ? .id),
                    {
                        fullModelLabel: Tt
                    } = Be({
                        currentModelId: ue ? .defaultModel ? ? "",
                        currentVersionId: de,
                        modelsData: d
                    });
                l.content.push(t.jsxs(C.Sub, {
                    children: [t.jsx(C.SubMenuTrigger, {
                        openOnHover: !1,
                        "data-testid": w + "-submenu",
                        trailing: t.jsx("div", {
                            className: "truncate",
                            children: Tt
                        }),
                        children: w
                    }), t.jsx(C.Portal, {
                        children: t.jsx(C.SubContent, {
                            children: E
                        })
                    })]
                }, w))
            })
        }
        k.push(l)
    }
    const G = {
            id: "otherOptionsSection",
            content: []
        },
        {
            selectedCategory: ne
        } = Be({
            currentModelId: L,
            currentVersionId: de,
            modelsData: d
        }),
        Te = le ? t.jsx(J, {
            isSelected: !y && ne === V.ALPHA,
            conversation: s,
            currentModel: S,
            option: le,
            modelSwitcherDenialsBySlug: m,
            displayInFull_INTERNAL_USE_ONLY: !0,
            preferredModelId: a,
            openOnHover: j
        }, le.value) : null;
    return Z ? G.content.push(t.jsxs("div", {
        className: "scrollbar-gutter-stable max-h-64 w-[min(320px,95vw)] overflow-y-scroll",
        children: [Ee.length === 0 && t.jsx(C.Item, {
            className: "w-full",
            children: u.formatMessage({
                id: "model-switcher.no-results",
                defaultMessage: "No results found"
            })
        }), Ee.map(l => {
            const {
                value: g
            } = l;
            return "options" in l ? t.jsx(J, {
                conversation: s,
                currentModel: S,
                isSelected: !y && r ? .startsWith(g),
                option: l,
                modelSwitcherDenialsBySlug: m,
                displayInFull_INTERNAL_USE_ONLY: !0,
                preferredModelId: a
            }, g) : t.jsxs(Y, {
                conversation: s,
                currentModelId: r,
                isSelected: !y && r === g,
                value: g,
                modelSwitcherDenialsBySlug: m,
                displayInFull_INTERNAL_USE_ONLY: !0,
                preferredModelId: a,
                children: [l.name, l.badge && t.jsx(nt, {
                    children: l.badge
                })]
            }, g)
        })]
    })) : c && (Mt && Te && G.content.push(Te), St && G.content.push(t.jsx(J, {
        isSelected: !y && ne === V.DATA_CAMPAIGNS,
        conversation: s,
        currentModel: S,
        option: ee,
        modelSwitcherDenialsBySlug: m,
        displayInFull_INTERNAL_USE_ONLY: !0,
        preferredModelId: a,
        openOnHover: j
    }, ee.value)), _t && G.content.push(t.jsx(J, {
        conversation: s,
        currentModel: S,
        isSelected: !y && ne === V.EXPERIMENTS,
        option: te,
        modelSwitcherDenialsBySlug: m,
        displayInFull_INTERNAL_USE_ONLY: !0,
        preferredModelId: a,
        openOnHover: j
    }, te.value)), Et && G.content.push(t.jsx(J, {
        isSelected: !y && ne === V.MAINLINE,
        conversation: s,
        currentModel: S,
        option: se,
        modelSwitcherDenialsBySlug: m,
        displayInFull_INTERNAL_USE_ONLY: !0,
        preferredModelId: a,
        openOnHover: j
    }, se.value))), G.content.length > 0 && G.content.unshift(t.jsx("div", {
        className: "px-4 py-2",
        children: t.jsx(at, {
            inputClassName: "w-full",
            onKeyDown: l => {
                l.stopPropagation()
            },
            onChange: l => {
                ut(l.target.value)
            },
            value: Z
        })
    }, "internal-model-search-input")), G.content.length && gt && k.push(G), n && k.push({
        id: Ue,
        content: [t.jsx(Ns, {}, Ue)]
    }), k
}
const Fs = () => {
        const s = Ye(),
            e = pe("3315017149");
        let n = t.jsx(x, {
            id: "4myKt+",
            defaultMessage: "GPT-5 Pro"
        });
        return e && (n = t.jsx(x, {
            id: "fCVj6z",
            defaultMessage: "Pro"
        })), t.jsx(C.Item, {
            disabled: !0,
            label: n,
            secondary: t.jsx(x, {
                id: "BsApen",
                defaultMessage: "Research-grade intelligence"
            }),
            trailing: t.jsx(Ze, {
                color: "secondary",
                size: "small",
                onClick: () => {
                    z.logEventWithStatsig("Model Switcher Pro Upgrade Button Clicked", "chatgpt_model_switcher_pro_upgrade_button_clicked"), z.logEvent("Account Pay: Open Payment from Model Picker", {
                        content: "gizmo-button"
                    }), it(s, "Thread header dropdown")
                },
                children: t.jsx(x, {
                    id: "aJndhk",
                    defaultMessage: "Upgrade"
                })
            })
        })
    },
    Me = We({
        alpha: {
            id: "o5FsPB",
            defaultMessage: "Alpha"
        },
        beta: {
            id: "XZwFET",
            defaultMessage: "Beta"
        },
        disabledByAdmin: {
            id: "uY7dpt",
            defaultMessage: "Unavailable in this workspace"
        }
    }),
    Ke = We({
        claimFreeOffer: {
            id: "UpM+ng",
            defaultMessage: "Claim free offer"
        },
        tryForFree: {
            id: "IUQXxo",
            defaultMessage: "Try for free"
        }
    });

function ct({
    isFreeTrialEligible: s,
    statsigParamName: e
}) {
    if (!s) return ve.upgrade;
    switch (Je("1846737571").get(e, "upgrade")) {
        case "claim_free_offer":
            return Ke.claimFreeOffer;
        case "try_for_free":
            return Ke.tryForFree;
        default:
            return ve.upgrade
    }
}

function Gs(s) {
    return ct({
        isFreeTrialEligible: s,
        statsigParamName: "free_upgrade_cta"
    })
}

function Vs(s) {
    return ct({
        isFreeTrialEligible: s,
        statsigParamName: "business_free_upgrade_cta"
    })
}
export {
    Qs as T, Ws as a, Be as g, qs as u
};
//# sourceMappingURL=c41e33f5-ibnnr1vsfllithl8.js.map