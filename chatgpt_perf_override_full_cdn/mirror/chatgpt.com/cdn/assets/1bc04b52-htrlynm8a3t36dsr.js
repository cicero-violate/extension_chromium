const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/604d4c3d-b11e72ss6iyc2rlq.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/conversation-small-cqp6votf.css", "assets/0fe285dc-ef2rid3r4goohlwz.js", "assets/7517017f-c0ls495fz2t1hbyy.js", "assets/47ed0b35-gh8rs0jocdpd4ufm.js", "assets/6ffe46c3-m3dgqn394f1moivn.js", "assets/83a5e40a-n0dw3duo9jw1ac7o.js", "assets/2b4d81ac-mxzs7ihtzeyiiii8.js", "assets/f5472ced-1pqcle7qcaqv6l79.js", "assets/821579c7-japk0omg1m8lct5s.js", "assets/94e0eb8c-fpnlthqv7c3yeffk.js", "assets/cad56d82-peovrk2gl7vkk957.js", "assets/943d6b1c-egk9di0nscfiahtx.js"]))) => i.map(i => d[i]);
import {
    r as m,
    j as t,
    o as oe,
    h as ye,
    c as Et,
    _ as ot,
    u as ze,
    s as qt,
    x as $t,
    p as Wt
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    af as bt,
    fk as tt,
    aw as kt,
    I as $e,
    ll as We,
    zH as Qe,
    wg as Qt,
    ch as rt,
    J as _t,
    HE as Mt,
    t0 as Yt,
    zI as ct,
    rd as vt,
    hX as Fe,
    ej as Te,
    y8 as Pt,
    hO as l,
    HF as it,
    q as He,
    zJ as Ye,
    HG as wt,
    jd as xt,
    _ as It,
    HH as lt,
    hN as Ce,
    r4 as nt,
    r5 as Zt,
    cT as Xt,
    cf as dt,
    j1 as At,
    r8 as Jt,
    jp as en,
    HI as jt,
    HJ as Dt,
    wp as tn,
    HK as Re,
    HL as Lt,
    s$ as nn,
    lo as sn,
    Ap as Kt,
    HM as an,
    HN as on,
    HO as rn,
    HP as cn,
    HQ as ln,
    HR as dn,
    HS as un,
    n4 as pn,
    HT as mn,
    DO as gn,
    HU as fn,
    iH as Ve,
    g as hn,
    pK as yn,
    HV as Q,
    D3 as Cn,
    HW as xn,
    HX as On,
    D7 as Tn,
    qQ as Ot,
    HY as Nn,
    z as Sn,
    zG as Rn,
    HZ as En,
    H_ as bn,
    DP as kn,
    H$ as _n,
    I0 as Mn,
    n2 as Ge,
    a as vn,
    N as Pn,
    I1 as wn,
    hZ as Xe,
    a0 as Je,
    i_ as In,
    o7 as An
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    hB as jn,
    hz as Dn,
    hA as Ln,
    b$ as Bt,
    dT as Ft,
    eJ as Ue,
    d2 as Ht,
    ge as ut,
    ko as zt,
    CS as pt,
    us as Kn,
    aT as he,
    sO as Bn,
    AE as Fn,
    of as Hn
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    O as Gt
} from "./b8d51478-eia71ltzneqisl3n.js";
import {
    s as mt
} from "./4701097e-fcrkpu9i1g9psrli.js";
import {
    E as gt
} from "./02833de5-dv0o4y10dk4nqsl1.js";
import {
    I as qe
} from "./e9213bfa-drjldekxa18no8cz.js";
import {
    s as zn
} from "./0fe285dc-ef2rid3r4goohlwz.js";
const ft = ({
        defaultValue: n,
        onContinue: e,
        options: a
    }) => {
        const [o, i] = m.useState(n);
        return t.jsxs(t.Fragment, {
            children: [t.jsx(jn, {
                value: o,
                onValueChange: d => i(d),
                className: "flex flex-col gap-2 pt-8 pb-6",
                children: a.map(({
                    value: d,
                    label: h,
                    description: y,
                    Icon: r,
                    Badge: S,
                    disabled: E,
                    tooltip: x
                }) => {
                    const M = t.jsxs(Dn, {
                        value: d,
                        className: bt("border-token-border-default flex items-center gap-4 rounded-2xl border p-4 text-sm", E && "cursor-not-allowed opacity-60"),
                        disabled: E,
                        children: [r && t.jsx("span", {
                            children: t.jsx(r, {
                                className: "h-6 w-6"
                            })
                        }), t.jsxs("div", {
                            className: "flex-1 text-start",
                            children: [t.jsxs("div", {
                                className: "flex items-center gap-1.5 pb-0.5",
                                children: [typeof h == "string" ? h : t.jsx(oe, { ...h
                                }), S && t.jsx(S, {})]
                            }), t.jsx("div", {
                                className: "text-token-text-secondary",
                                children: typeof y == "string" ? y : t.jsx(oe, { ...y
                                })
                            })]
                        }), o === d ? t.jsx(Ln, {
                            className: "flex h-5 w-5 items-center justify-center rounded-full bg-gray-950 p-0.5 dark:bg-white",
                            children: t.jsx("div", {
                                className: "h-2 w-2 rounded-full bg-white dark:bg-gray-950"
                            })
                        }) : t.jsx("div", {
                            className: "border-token-border-default h-5 w-5 rounded-full border"
                        })]
                    }, d);
                    return x ? t.jsx(tt, {
                        label: t.jsx("div", {
                            className: "max-w-50",
                            children: typeof x == "string" ? x : t.jsx(oe, { ...x
                            })
                        }),
                        side: "right",
                        children: M
                    }, d) : M
                })
            }), t.jsx(kt, {
                className: "w-full",
                size: "large",
                disabled: !o,
                onClick: () => {
                    o && e(o)
                },
                children: t.jsx(oe, { ...Gn.nextStepButton
                })
            })]
        })
    },
    Gn = ye({
        nextStepButton: {
            id: "addConnectorLinkModal.nextStepButton",
            defaultMessage: "Continue"
        }
    }),
    Vn = n => {
        "use forget";
        const e = Et.c(49),
            {
                connector: a,
                onClose: o,
                onContinue: i,
                canAddDeepResearch: d,
                canAddInternalKnowledge: h,
                canAddOdyssey: y,
                messages: r
            } = n,
            S = $e(),
            E = We(),
            x = !!(S ? .isPersonalAccount() && E);
        let M;
        e[0] !== r.syncBadge ? (M = () => {
            "use forget";
            return t.jsxs("span", {
                className: "bg-token-interactive-bg-accent-default flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-xs text-[#007AFF]",
                children: [t.jsx(Gt, {}), t.jsx(oe, { ...r.syncBadge
                })]
            })
        }, e[0] = r.syncBadge, e[1] = M) : M = e[1];
        const v = M;
        let te;
        e[2] !== r.recommendedBadge ? (te = () => {
            "use forget";
            return t.jsx("span", {
                className: "bg-token-interactive-bg-accent-default flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-xs text-[#007AFF]",
                children: t.jsx(oe, { ...r.recommendedBadge
                })
            })
        }, e[2] = r.recommendedBadge, e[3] = te) : te = e[3];
        const Y = te;
        let U;
        e[4] !== v || e[5] !== r.internalKnowledgeDescription || e[6] !== r.internalKnowledgeTitle ? (U = {
            value: "internalKnowledge",
            label: r.internalKnowledgeTitle,
            description: r.internalKnowledgeDescription,
            Icon: Bt,
            Badge: v
        }, e[4] = v, e[5] = r.internalKnowledgeDescription, e[6] = r.internalKnowledgeTitle, e[7] = U) : U = e[7];
        const ue = U;
        let V;
        e[8] !== Y || e[9] !== r.syncDescription || e[10] !== r.syncTitle ? (V = {
            value: "internalKnowledge",
            label: r.syncTitle,
            description: r.syncDescription,
            Icon: Ft,
            Badge: Y
        }, e[8] = Y, e[9] = r.syncDescription, e[10] = r.syncTitle, e[11] = V) : V = e[11];
        const b = V;
        let q;
        e[12] !== r.deepResearchDescription || e[13] !== r.deepResearchTitle ? (q = {
            value: "deepResearch",
            label: r.deepResearchTitle,
            description: r.deepResearchDescription,
            Icon: Ue
        }, e[12] = r.deepResearchDescription, e[13] = r.deepResearchTitle, e[14] = q) : q = e[14];
        const w = q;
        let $;
        e[15] !== r.deepResearchAndOdysseyDescription || e[16] !== r.deepResearchAndOdysseyTitle ? ($ = {
            value: "deepResearchAndOdyssey",
            label: r.deepResearchAndOdysseyTitle,
            description: r.deepResearchAndOdysseyDescription,
            Icon: Ue
        }, e[15] = r.deepResearchAndOdysseyDescription, e[16] = r.deepResearchAndOdysseyTitle, e[17] = $) : $ = e[17];
        const re = $;
        let ce;
        e[18] !== r.dontSyncDescription || e[19] !== r.dontSyncTitle ? (ce = {
            value: "deepResearch",
            label: r.dontSyncTitle,
            description: r.dontSyncDescription,
            Icon: Ht
        }, e[18] = r.dontSyncDescription, e[19] = r.dontSyncTitle, e[20] = ce) : ce = e[20];
        const g = ce,
            A = x ? b : ue;
        let C;
        e[21] !== h || e[22] !== r.internalKnowledgeTooltip ? (C = h ? {} : {
            disabled: !0,
            ...r.internalKnowledgeTooltip ? {
                tooltip: r.internalKnowledgeTooltip
            } : {}
        }, e[21] = h, e[22] = r.internalKnowledgeTooltip, e[23] = C) : C = e[23];
        let T;
        e[24] !== A || e[25] !== C ? (T = { ...A,
            ...C
        }, e[24] = A, e[25] = C, e[26] = T) : T = e[26];
        const L = T,
            k = y ? re : x ? g : w;
        let H;
        e[27] !== d || e[28] !== k ? (H = d ? k : { ...k,
            disabled: !0
        }, e[27] = d, e[28] = k, e[29] = H) : H = e[29];
        const O = H;
        let f;
        e[30] !== L || e[31] !== O ? (f = [L, O], e[30] = L, e[31] = O, e[32] = f) : f = e[32];
        const F = f;
        let R;
        e[33] !== r.selectProductTitle ? (R = t.jsx(oe, { ...r.selectProductTitle
        }), e[33] = r.selectProductTitle, e[34] = R) : R = e[34];
        let c;
        e[35] !== a ? (c = t.jsx(ut, {
            connector: a,
            className: "rounded-xl border-[0.5px] p-2 shadow-sm",
            size: "medium"
        }), e[35] = a, e[36] = c) : c = e[36];
        const z = a.branding ? .developer ? ? void 0;
        let _;
        e[37] !== o || e[38] !== R || e[39] !== c || e[40] !== z ? (_ = t.jsx(Qe, {
            title: R,
            connectorIcon: c,
            connectorDeveloper: z,
            onClose: o
        }), e[37] = o, e[38] = R, e[39] = c, e[40] = z, e[41] = _) : _ = e[41];
        const N = x ? "internalKnowledge" : void 0;
        let Z;
        e[42] !== F || e[43] !== i || e[44] !== N ? (Z = t.jsx(ft, {
            defaultValue: N,
            onContinue: i,
            options: F
        }), e[42] = F, e[43] = i, e[44] = N, e[45] = Z) : Z = e[45];
        let ie;
        return e[46] !== _ || e[47] !== Z ? (ie = t.jsxs(t.Fragment, {
            children: [_, Z]
        }), e[46] = _, e[47] = Z, e[48] = ie) : ie = e[48], ie
    },
    we = ({
        messages: n
    }) => a => t.jsx(Vn, { ...a,
        messages: n
    }),
    Un = ye({
        selectProductTitle: {
            id: "r2npOY",
            defaultMessage: "Select a connection type"
        },
        deepResearchTitle: {
            id: "BufFDR",
            defaultMessage: "Deep research"
        },
        deepResearchAndOdysseyTitle: {
            id: "ZQSdTY",
            defaultMessage: "Chat, deep research, agent"
        },
        deepResearchAndOdysseyDescription: {
            id: "gzPmCe",
            defaultMessage: "Find, analyze, and synthesize your Drive files to create comprehensive reports"
        },
        deepResearchDescription: {
            id: "L+S/jI",
            defaultMessage: "Find, analyze, and synthesize your Drive files to create comprehensive reports"
        },
        dontSyncTitle: {
            id: "YcPoIP",
            defaultMessage: "Don't sync"
        },
        dontSyncDescription: {
            id: "uO+gdP",
            defaultMessage: "ChatGPT will read your Google Drive files as needed, so replies may be slower."
        },
        internalKnowledgeTitle: {
            id: "t5mu4H",
            defaultMessage: "Chat, deep research, agent"
        },
        internalKnowledgeDescription: {
            id: "0xFkEA",
            defaultMessage: "Sync Drive files to ChatGPT for more relevant, up-to-date answers"
        },
        recommendedBadge: {
            id: "Wtyyql",
            defaultMessage: "Recommended"
        },
        syncTitle: {
            id: "yMY2Ng",
            defaultMessage: "Sync"
        },
        syncDescription: {
            id: "fcoBBw",
            defaultMessage: "Sync Google Drive files to ChatGPT for faster, more relevant answers."
        },
        syncBadge: {
            id: "0OM3Oh",
            defaultMessage: "Sync"
        },
        internalKnowledgeTooltip: {
            id: "AEBXx0",
            defaultMessage: "Contact your admin to enable Google Drive for chat"
        }
    }),
    qn = we({
        messages: Un
    }),
    $n = ({
        connector: n,
        internalKnowledgeConfigs: e,
        onClose: a,
        onContinue: o
    }) => {
        const i = m.useMemo(() => e.filter(d => d.user_connection_details.auth_status === "not_connected").map(d => ({
            value: d.user_connection_details.connection_instance_id,
            label: d.connection_display_info.display_name,
            description: d.connection_display_info.description
        })), [e]);
        return t.jsxs(t.Fragment, {
            children: [t.jsx(Qe, {
                title: t.jsx(oe, { ...Wn.selectConnectionTitle
                }),
                connectorIcon: t.jsx(ut, {
                    connector: n,
                    className: "rounded-xl border-[0.5px] p-2 shadow-sm",
                    size: "medium"
                }),
                connectorDeveloper: n.branding ? .developer ? ? void 0,
                onClose: a
            }), t.jsx(ft, {
                onContinue: o,
                options: i
            })]
        })
    },
    Wn = ye({
        selectConnectionTitle: {
            id: "2rQetR",
            defaultMessage: "Select a connection"
        }
    }),
    ht = n => (n ? ? []).map(e => ({ ...e,
        description: e.description ? ? void 0,
        inputs: e.inputs ? .map(a => ({ ...a,
            description: a.description ? ? void 0,
            pattern: a.pattern ? ? void 0
        })) ? ? void 0,
        i18n: e.i18n ? .map(a => ({ ...a,
            label: a.label ? ? void 0,
            description: a.description ? ? void 0
        })) ? ? void 0
    })),
    st = n => typeof n == "object" && n !== null && !Array.isArray(n),
    Qn = /\{\{([^}]+)\}\}/g,
    Tt = n => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    Nt = n => n.replace(/\\([.*+?^${}()|[\]\\-])/g, "$1"),
    Yn = n => {
        const e = [];
        let a = "",
            o = 0;
        for (const i of n) {
            if (i === "|" && o % 2 === 0) {
                e.push(a), a = "", o = 0;
                continue
            }
            a += i, i === "\\" ? o += 1 : o = 0
        }
        return e.push(a), e
    },
    Zn = (n, e) => {
        const a = n.trim();
        if (!a) return "";
        if (e === "string_list") {
            const o = /^\(\?:([\s\S]*)\)$/.exec(a),
                i = o ? o[1] : a;
            return Yn(i).map(Nt).join(`
`)
        }
        return Nt(a)
    },
    Xn = (n, e, a) => {
        if (!n.includes("{{")) return n === e ? {} : null;
        let o = "^",
            i = 0;
        const d = [];
        for (const r of n.matchAll(new RegExp(Qn))) {
            const S = r.index ? ? 0;
            o += Tt(n.slice(i, S)), o += "(.+?)", d.push(r[1]), i = S + r[0].length
        }
        o += Tt(n.slice(i)), o += "$";
        const h = new RegExp(o).exec(e);
        if (!h) return null;
        const y = {};
        return d.forEach((r, S) => {
            y[r] = Zn(h[S + 1], a[r] ? .input_type)
        }), y
    },
    Jn = (n, e) => {
        const a = { ...n
        };
        for (const [o, i] of Object.entries(e)) {
            if (a[o] != null && a[o] !== i) return null;
            a[o] = i
        }
        return a
    },
    at = (n, e, a, o) => {
        if (typeof n == "string") {
            if (typeof e != "string") return null;
            const i = Xn(n, e, a);
            return i == null ? null : Jn(o, i)
        }
        if (Array.isArray(n)) {
            if (!Array.isArray(e) || e.length !== n.length) return null;
            let i = o;
            for (let d = 0; d < n.length; d += 1) {
                const h = at(n[d], e[d], a, i);
                if (!h) return null;
                i = h
            }
            return i
        }
        if (st(n)) {
            if (!st(e)) return null;
            for (const d of Object.keys(e))
                if (!Object.prototype.hasOwnProperty.call(n, d)) return null;
            let i = o;
            for (const [d, h] of Object.entries(n)) {
                const y = at(h, e[d], a, i);
                if (!y) return null;
                i = y
            }
            return i
        }
        return Object.is(n, e) ? o : null
    },
    es = (n, e, a) => {
        let o = {};
        for (const [i, d] of Object.entries(n)) {
            if (!(i in e)) return null;
            const h = at(d, e[i], a, o);
            if (!h) return null;
            o = h
        }
        return o
    },
    ra = n => {
        if (!n) return;
        const e = {};
        for (const [a, o] of Object.entries(n)) {
            if (st(o)) {
                const i = o.allOf;
                if (Object.keys(o).length === 1 && Array.isArray(i) && i.length > 0) {
                    e[a] = i[0];
                    continue
                }
            }
            e[a] = o
        }
        return e
    },
    ca = (n, e) => {
        const a = ht(n);
        if (!e || a.length === 0) return {
            selectedTemplateIds: [],
            inputValues: {}
        };
        const o = [],
            i = {};
        for (const d of a) {
            const h = d.action_param_schemas;
            if (!h || Object.keys(h).length === 0) continue;
            const y = Object.fromEntries((d.inputs ? ? []).map(S => [S.name, S])),
                r = es(h, e, y);
            r && (o.push(d.id), Object.keys(r).length > 0 && (i[d.id] = r))
        }
        return {
            selectedTemplateIds: o,
            inputValues: i
        }
    },
    ts = n => {
        if (n) return n.clamp_templates == null ? n : { ...n,
            clamp_templates: ht(n.clamp_templates)
        }
    },
    et = ye({
        sectionTitle: {
            id: "QoBb/Y",
            defaultMessage: "Privacy settings"
        },
        tooltipLabel: {
            id: "LcLAFD",
            defaultMessage: "Info"
        }
    }),
    Be = ye({
        required: {
            id: "EFGauU",
            defaultMessage: "Enter a value."
        },
        requiredList: {
            id: "kVUhNg",
            defaultMessage: "Enter at least one value."
        },
        invalid: {
            id: "IbivRk",
            defaultMessage: "Value is not in the expected format."
        },
        invalidList: {
            id: "+x2rj7",
            defaultMessage: "One or more entries are not in the expected format."
        },
        listPlaceholder: {
            id: "3NDa/9",
            defaultMessage: "Enter one value per line"
        },
        validationToast: {
            id: "YYCWl0",
            defaultMessage: "Fix the highlighted clamp inputs."
        }
    }),
    St = n => n.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&"),
    ns = (n, e) => {
        const a = o => typeof o == "string" ? Object.entries(e).reduce((i, [d, h]) => i.split(`{{${d}}}`).join(h), o) : Array.isArray(o) ? o.map(i => a(i)) : o && typeof o == "object" ? Object.fromEntries(Object.entries(o).map(([i, d]) => [i, a(d)])) : o;
        return a(n)
    },
    Vt = ({
        templates: n,
        intl: e,
        infoIcon: a,
        enabled: o = !0,
        initialSelectedTemplateIds: i,
        initialInputValues: d,
        resetKey: h,
        showSectionTitle: y = !0,
        showWhenDisabled: r = !1,
        disabledReason: S
    }) => {
        const E = e.formatMessage({
                id: "FormField.errorIcon",
                defaultMessage: "Error"
            }),
            x = !o && r,
            M = m.useMemo(() => !o && !r ? [] : ht(n), [o, r, n]),
            [v, te] = m.useState(() => i ? ? []),
            [Y, U] = m.useState(() => d ? ? {}),
            ue = m.useRef(!1),
            V = m.useRef(void 0);
        m.useEffect(() => {
            if (!(!o && !r)) {
                if (h !== void 0) {
                    if (V.current === h) return;
                    V.current = h, te(i ? ? M.map(g => g.id)), U(d ? ? {}), ue.current = !0;
                    return
                }!ue.current && v.length === 0 && M.length > 0 && (te(i ? ? M.map(g => g.id)), U(d ? ? {}), ue.current = !0)
            }
        }, [M, o, r, i, d, h, v.length]);
        const b = m.useMemo(() => M.filter(g => v.includes(g.id)), [M, v]),
            q = m.useMemo(() => {
                const g = e.locale ? .toLowerCase(),
                    A = g ? .split("-")[0];
                return C => {
                    const T = C.i18n ? ? [];
                    if (!g) return C;
                    const L = T.find(O => O.locale ? .toLowerCase() === g),
                        k = A ? T.find(O => O.locale ? .toLowerCase() === A) : void 0,
                        H = L ? ? k;
                    return H ? { ...C,
                        label: H.label ? ? C.label,
                        description: H.description ? ? C.description ? ? void 0
                    } : C
                }
            }, [e.locale]),
            w = (g, A, C) => {
                U(T => ({ ...T,
                    [g]: { ...T[g] ? ? {},
                        [A] : C
                    }
                }))
            },
            $ = m.useCallback(() => {
                const g = {};
                let A = !1;
                const C = {};
                return b.forEach(T => {
                    const L = {},
                        k = {};
                    if ((T.inputs ? ? []).forEach(O => {
                            const f = O.input_type ? ? "string",
                                F = Y[T.id] ? .[O.name] ? ? "";
                            if (f === "string_list") {
                                const c = F.split(/[\n,]/).map(_ => _.trim()).filter(Boolean);
                                if (c.length === 0) {
                                    k[O.name] = e.formatMessage(Be.requiredList);
                                    return
                                }
                                if (O.pattern) {
                                    const _ = new RegExp(O.pattern);
                                    if (c.find(Z => !_.test(Z))) {
                                        k[O.name] = e.formatMessage(Be.invalidList);
                                        return
                                    }
                                }
                                const z = c.map(St);
                                L[O.name] = z.length === 1 ? z[0] : `(?:${z.join("|")})`;
                                return
                            }
                            const R = F.trim();
                            if (!R) {
                                k[O.name] = e.formatMessage(Be.required);
                                return
                            }
                            if (O.pattern && !new RegExp(O.pattern).test(R)) {
                                k[O.name] = e.formatMessage(Be.invalid);
                                return
                            }
                            L[O.name] = St(R)
                        }), Object.keys(k).length > 0) {
                        g[T.id] = k, A = !0;
                        return
                    }
                    if (!T.action_param_schemas) return;
                    const H = Object.keys(L).length > 0 ? ns(T.action_param_schemas, L) : T.action_param_schemas;
                    Object.assign(C, H)
                }), {
                    actionParamSchemas: A || Object.keys(C).length === 0 ? void 0 : C,
                    validationErrors: g,
                    hasErrors: A
                }
            }, [b, Y, e]),
            re = m.useMemo(() => o ? $() : {
                actionParamSchemas: void 0,
                validationErrors: {},
                hasErrors: !1
            }, [o, $]);
        return {
            clampTemplatesContent: M.length > 0 && (o || x) ? t.jsxs("div", {
                className: "flex flex-col gap-3",
                children: [y && t.jsx("div", {
                    className: "flex flex-col gap-1",
                    children: t.jsxs("div", {
                        className: "flex items-center gap-1",
                        children: [t.jsx("div", {
                            className: "text-token-text-primary text-sm font-semibold",
                            children: t.jsx(oe, { ...et.sectionTitle
                            })
                        }), !o && S ? t.jsx(tt, {
                            label: S,
                            delayDuration: 0,
                            side: "top",
                            align: "center",
                            children: t.jsx("span", {
                                className: "text-token-text-secondary hover:text-token-text-primary inline-flex items-center justify-center rounded-full p-1",
                                "aria-label": e.formatMessage(et.tooltipLabel),
                                children: t.jsx(a, {
                                    className: "icon-xs"
                                })
                            })
                        }) : null]
                    })
                }), t.jsx("div", {
                    className: bt("divide-token-border-light border-token-border-heavy flex flex-col divide-y rounded-md border", !o && "opacity-50"),
                    children: M.map((g, A) => {
                        const C = q(g),
                            T = `clamp-template-${g.id||A}`,
                            L = v.includes(g.id),
                            k = Y[g.id] ? ? {},
                            H = re.validationErrors[g.id] ? ? {},
                            O = (g.inputs ? .length ? ? 0) > 0;
                        return t.jsxs("div", {
                            className: "flex flex-col gap-3 p-3",
                            children: [t.jsxs("div", {
                                className: "flex items-center justify-between gap-1",
                                children: [t.jsxs("label", {
                                    className: "flex cursor-pointer items-center gap-1",
                                    htmlFor: T,
                                    children: [t.jsx("div", {
                                        className: "text-token-text-primary text-sm font-semibold",
                                        children: C.label
                                    }), C.description ? t.jsx(tt, {
                                        label: C.description,
                                        delayDuration: 0,
                                        side: "top",
                                        align: "center",
                                        children: t.jsx("span", {
                                            className: "text-token-text-secondary hover:text-token-text-primary inline-flex items-center justify-center rounded-full p-1",
                                            "aria-label": e.formatMessage(et.tooltipLabel),
                                            children: t.jsx(a, {
                                                className: "icon-xs"
                                            })
                                        })
                                    }) : null]
                                }), t.jsx(Qt, {
                                    id: T,
                                    checked: L,
                                    withinLabel: !0,
                                    disabled: !o,
                                    onCheckedChange: f => te(F => f ? F.includes(g.id) ? F : [...F, g.id] : F.filter(R => R !== g.id))
                                })]
                            }), L && O ? t.jsx("div", {
                                className: "flex flex-col gap-3",
                                children: g.inputs ? .map(f => {
                                    const F = f.input_type ? ? "string",
                                        R = `${T}-${f.name}`,
                                        c = H[f.name],
                                        z = k[f.name] ? ? "";
                                    return F === "string_list" ? t.jsxs("div", {
                                        className: "flex flex-col gap-1",
                                        children: [t.jsx("label", {
                                            className: "text-token-text-primary text-xs font-semibold",
                                            htmlFor: R,
                                            children: f.label
                                        }), t.jsx("textarea", {
                                            id: R,
                                            className: `border-token-border-medium bg-token-bg-primary text-token-text-primary w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none ${c?"border-red-500 focus:border-red-500 focus:ring-red-500":"focus:border-token-border-xheavy focus:ring-token-text-secondary"}`,
                                            value: z,
                                            disabled: !o,
                                            onChange: _ => w(g.id, f.name, _.target.value),
                                            placeholder: e.formatMessage(Be.listPlaceholder),
                                            rows: 3,
                                            "aria-invalid": c ? !0 : void 0
                                        }), c ? t.jsxs("div", {
                                            className: "flex items-center gap-1 text-xs text-red-500",
                                            children: [t.jsx(gt, {
                                                title: E
                                            }), c]
                                        }) : null, f.description ? t.jsx("div", {
                                            className: "text-token-text-secondary text-xs",
                                            children: f.description
                                        }) : null]
                                    }, f.name) : t.jsxs("div", {
                                        className: "flex flex-col gap-1",
                                        children: [t.jsx(qe, {
                                            name: R,
                                            displayName: f.label,
                                            value: z,
                                            disabled: !o,
                                            onChange: _ => w(g.id, f.name, _.target.value),
                                            placeholder: f.description ? ? void 0,
                                            error: c,
                                            showErrorIcon: !0
                                        }), f.description ? t.jsx("div", {
                                            className: "text-token-text-secondary text-xs",
                                            children: f.description
                                        }) : null]
                                    }, f.name)
                                })
                            }) : null]
                        }, g.id)
                    })
                })]
            }) : void 0,
            clampValidation: re,
            validationToastMessage: e.formatMessage(Be.validationToast)
        }
    },
    ss = rt(() => ot(() =>
        import ("./604d4c3d-b11e72ss6iyc2rlq.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])).then(n => n.RedirectContent)),
    as = ({
        onClose: n,
        connector: e,
        linkCreateProductSku: a,
        noRedirect: o,
        hideHeaderIcons: i = !1
    }) => {
        const d = ze(),
            h = qt(),
            y = _t(),
            r = We(),
            S = !!Mt(),
            x = !!($e() ? .isPersonalAccount() && r),
            {
                isLoading: M,
                internalKnowledgeConfigs: v
            } = Yt(),
            {
                mutateAsync: te
            } = ct(),
            {
                availableConnectors: Y,
                isLoading: U
            } = vt(),
            {
                availableConnectors: ue,
                isLoading: V
            } = zt(),
            b = m.useMemo(() => v ? .filter(D => D.user_connection_details.auth_status === "not_connected") ? ? [], [v]),
            q = pt(),
            w = b.length,
            {
                connectorLinks: $,
                refetch: re,
                isLoading: ce
            } = Fe({
                productSku: Te.CONNECTOR_SETTING,
                fetchValidLinksOnly: !0
            }),
            {
                refetch: g
            } = Fe({
                productSku: Te.CONNECTOR_SETTING,
                fetchValidLinksOnly: !1,
                skip: !0
            }),
            A = m.useMemo(() => !!$.get(Pt) ? .length, [$]),
            C = !A && Y.some(D => D.type === l.GDRIVE_ACTION_CONNECTOR),
            T = !A && ue.some(D => D.type === l.GDRIVE_ACTION_CONNECTOR),
            L = C || T,
            k = w > 0 || x,
            H = L && k,
            O = T ? "deepResearchAndOdyssey" : C ? "deepResearch" : null,
            f = L && k,
            F = it(),
            R = f && F !== Te.DEEP_RESEARCH && He("3495630358"),
            c = He("2515012530"),
            z = S && k ? "internalKnowledge" : f ? F === Te.DEEP_RESEARCH ? O : R ? "internalKnowledge" : null : k ? "internalKnowledge" : O,
            [_, N] = m.useState(!1),
            [Z, ie] = m.useState(z),
            [ne, xe] = m.useState(z === "internalKnowledge" && !x),
            [le, Oe] = m.useState(null),
            pe = m.useMemo(() => w === 1 ? v ? .[0] : le ? v ? .find(D => D.user_connection_details.connection_instance_id === le) : void 0, [w, v, le]),
            [me, ge] = m.useState(!1),
            s = Ye() ? ? "unknown_referrer",
            W = Z ? ? (H ? null : k ? "internalKnowledge" : O),
            X = W === "deepResearch" || W === "deepResearchAndOdyssey",
            Se = W === "internalKnowledge",
            se = x && W === "internalKnowledge",
            ve = wt(F, X),
            Ie = a ? ? ve,
            be = H && Z == null,
            Ee = Se && !se && ne,
            fe = m.useCallback(D => {
                ie(D), xe(D === "internalKnowledge" && !x), D !== "internalKnowledge" && Oe(null)
            }, [Oe, x]),
            Pe = m.useCallback(D => {
                O && fe(D ? "internalKnowledge" : O)
            }, [O, fe]),
            Ae = m.useCallback(() => {
                xe(!1)
            }, []),
            je = c && !Se,
            De = c && Se,
            Ke = d.formatMessage({
                id: "NN5kFB",
                defaultMessage: "Parameter constraints aren’t available when sync is enabled."
            }),
            {
                clampTemplatesContent: Me,
                clampValidation: p,
                validationToastMessage: ae
            } = Vt({
                templates: e.clamp_templates,
                intl: d,
                infoIcon: xt,
                enabled: je,
                showWhenDisabled: De,
                disabledReason: Ke
            }),
            G = m.useCallback(async () => {
                const {
                    actionParamSchemas: D,
                    hasErrors: de
                } = p;
                if (de) {
                    y.danger(ae);
                    return
                }
                try {
                    ge(!0), mt("popup"), It.logEventWithStatsig("Connectors - Connect Personal Google Drive", "chatgpt_connectors_connect_personal_google_drive_clicked", {
                        sync: se ? "true" : "false"
                    });
                    const ke = await lt({
                        connector: e,
                        openPopup: !0,
                        toaster: se ? void 0 : y,
                        intl: d,
                        productSku: Ie,
                        actionParamSchemas: D
                    });
                    if (re(), g(), ke ? .errorType === "oauth_failed_scope_mismatch") {
                        ge(!1), N(!0);
                        return
                    }
                    ke ? .linkId && se && te({
                        link: {
                            id: ke.linkId,
                            name: e.name,
                            connector_id: Ce[l.GDRIVE_ACTION_CONNECTOR]
                        },
                        isConnectingAndUpgrading: !0,
                        referrer: s
                    }).then(() => {
                        nt()
                    });
                    const _e = q(e);
                    o ? n() : _e ? window.location.href = _e : (n(), setTimeout(() => {
                        h(Zt, {
                            replace: !0
                        })
                    }, 500)), N(!1)
                } catch {
                    ge(!1)
                }
            }, [p, se, e, y, ae, d, re, g, q, o, te, n, h, s, Ie]),
            J = Se && !se && !Ee && w > 1 && !le,
            u = Se && pe && !se && !Ee,
            j = X || se || Ee,
            P = p.hasErrors,
            K = _ || be || j || J || u,
            B = M || U || V || ce,
            I = !!pe;
        return m.useEffect(() => {
            !K && !B && Xt.error("GoogleDriveModalContent rendered with no content", {
                isAddingIK: Se,
                isUpgradingStraightToSync: se,
                shouldShowSyncRedirectContent: Ee,
                numAddableIKConfigs: w,
                selectedIKConfig: le,
                currentIKConfig: I,
                isAddingDeepResearch: X,
                shouldShowProductSelector: be,
                shouldRenderInternalKnowledgeSelect: J,
                shouldRenderOAuthModal: u,
                shouldRenderRedirectContent: j,
                showOAuthFailedScopeMismatch: _
            })
        }, [B, I, X, Se, se, w, le, K, J, u, j, be, Ee, _]), B ? t.jsx("div", {
            className: "flex justify-center",
            children: t.jsx(dt, {})
        }) : _ ? t.jsxs(t.Fragment, {
            children: [t.jsx(Qe, {
                onClose: n,
                connectorIcon: t.jsx("div", {
                    className: "rounded-xl border-[0.5px] bg-white p-2 shadow-sm",
                    children: t.jsx(At, {
                        height: 32,
                        width: 32
                    })
                }),
                title: d.formatMessage({
                    id: "LrBpzI",
                    defaultMessage: "Permissions required"
                }),
                hideAvatarRow: i
            }), t.jsxs("div", {
                className: "border-token-border-default text-token-text-secondary mt-8 mb-6 flex items-center gap-4 rounded-xl border p-4 text-sm",
                children: [t.jsx(xt, {
                    className: "icon-lg"
                }), t.jsx(oe, {
                    id: "googleDriveLinkingModalDescription",
                    defaultMessage: "In the next step, make sure to check all boxes. ChatGPT requires the full list of Google permissions."
                })]
            }), t.jsx(kt, {
                className: "w-full",
                onClick: G,
                loading: me,
                size: "large",
                children: t.jsx(oe, {
                    id: "reconnect",
                    defaultMessage: "Reconnect"
                })
            })]
        }) : t.jsxs(t.Fragment, {
            children: [be && t.jsx(qn, {
                onClose: n,
                connector: e,
                onContinue: fe,
                canAddDeepResearch: C,
                canAddOdyssey: T,
                canAddInternalKnowledge: k
            }), j && t.jsx(ss, {
                connector: e,
                onClose: n,
                isConnecting: me,
                onContinue: Ee ? Ae : G,
                productSku: Te.CONNECTOR_SETTING,
                canSync: R,
                isRequestingSync: Se,
                setIsRequestingSync: R ? Pe : void 0,
                hideHeaderIcons: i,
                additionalContent: Me,
                isContinueDisabled: P
            }), J && t.jsx($n, {
                internalKnowledgeConfigs: v ? ? [],
                onClose: n,
                connector: e,
                onContinue: Oe
            }), u && t.jsx(Jt, {
                immediatelyKickOffOAuth: R,
                isAdminFlow: !1,
                onClose: () => {
                    R || (fe(null), Oe(null)), (!H || R) && n()
                },
                connectionId: pe.user_connection_details.connection_instance_id,
                location: "user_settings",
                onSuccess: () => {
                    setTimeout(() => {
                        nt()
                    }, 1e3), n()
                },
                excludeModalWrapper: !0
            })]
        })
    },
    os = ye({
        selectProductTitle: {
            id: "EcfaIh",
            defaultMessage: "Select a connection type"
        },
        deepResearchTitle: {
            id: "BufFDR",
            defaultMessage: "Deep research"
        },
        deepResearchAndOdysseyTitle: {
            id: "y9kp7g",
            defaultMessage: "Deep research and agent mode"
        },
        deepResearchAndOdysseyDescription: {
            id: "7f5MJU",
            defaultMessage: "Find, analyze, and synthesize your HubSpot data to create comprehensive reports"
        },
        deepResearchDescription: {
            id: "52mZY5",
            defaultMessage: "Find, analyze, and synthesize your HubSpot data to create comprehensive reports"
        },
        dontSyncTitle: {
            id: "bIOtPo",
            defaultMessage: "Don't sync"
        },
        dontSyncDescription: {
            id: "R5dVLr",
            defaultMessage: "ChatGPT will read your HubSpot data as needed, so replies may be slower."
        },
        internalKnowledgeTitle: {
            id: "R09hUc",
            defaultMessage: "Chat"
        },
        internalKnowledgeDescription: {
            id: "Gf7d++",
            defaultMessage: "Sync HubSpot data to ChatGPT for more relevant, up-to-date answers"
        },
        internalKnowledgeTooltip: {
            id: "uCYMoO",
            defaultMessage: "Contact your admin to enable HubSpot for chat"
        },
        recommendedBadge: {
            id: "Wtyyql",
            defaultMessage: "Recommended"
        },
        syncTitle: {
            id: "9Au+em",
            defaultMessage: "Sync"
        },
        syncDescription: {
            id: "BYPzIj",
            defaultMessage: "Sync HubSpot data to ChatGPT for faster, more relevant answers."
        },
        syncBadge: {
            id: "0OM3Oh",
            defaultMessage: "Sync"
        }
    }),
    rs = we({
        messages: os
    }),
    cs = () => t.jsxs("span", {
        className: "bg-token-interactive-bg-accent-default flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-xs text-[#007AFF]",
        children: [t.jsx(Gt, {}), t.jsx(oe, { ...Ne.syncBadge
        })]
    }),
    is = () => t.jsx("span", {
        className: "bg-token-interactive-bg-accent-default flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-xs text-[#007AFF]",
        children: t.jsx(oe, { ...Ne.recommendedBadge
        })
    }),
    ls = ({
        connector: n,
        onClose: e,
        onContinue: a,
        canAddDeepResearch: o,
        canAddInternalKnowledge: i,
        canAddOdyssey: d
    }) => {
        const h = $e(),
            y = We(),
            r = !!(h ? .isPersonalAccount() && y),
            S = ze(),
            E = m.useMemo(() => [{ ...r ? ms : ps,
                ...i ? {} : {
                    disabled: !0,
                    tooltip: S.formatMessage({
                        id: "GbkN+V",
                        defaultMessage: "Contact your admin to enable Notion for chat"
                    })
                }
            }, ...o ? [d ? us : r ? gs : ds] : []], [r, i, S, o, d]);
        return t.jsxs(t.Fragment, {
            children: [t.jsx(Qe, {
                title: t.jsx(oe, { ...Ne.selectProductTitle
                }),
                connectorIcon: t.jsx(ut, {
                    connector: n,
                    className: "rounded-xl border-[0.5px] p-2 shadow-sm",
                    size: "medium"
                }),
                connectorDeveloper: n.branding ? .developer ? ? void 0,
                onClose: e
            }), t.jsx(ft, {
                defaultValue: r ? "internalKnowledge" : void 0,
                onContinue: a,
                options: E
            })]
        })
    },
    Ne = ye({
        selectProductTitle: {
            id: "DAwG09",
            defaultMessage: "Select a connection type"
        },
        deepResearchTitle: {
            id: "BufFDR",
            defaultMessage: "Deep research"
        },
        deepResearchAndOdysseyTitle: {
            id: "y9kp7g",
            defaultMessage: "Deep research and agent mode"
        },
        deepResearchAndOdysseyDescription: {
            id: "KXsRFb",
            defaultMessage: "Find, analyze, and synthesize your team's Notion pages and databases to create comprehensive reports"
        },
        deepResearchDescription: {
            id: "gZpO3N",
            defaultMessage: "Find, analyze, and synthesize Notion pages and databases for richer reports"
        },
        dontSyncTitle: {
            id: "GMrSDT",
            defaultMessage: "Don't sync"
        },
        dontSyncDescription: {
            id: "y/IdPs",
            defaultMessage: "ChatGPT will read your Notion content as needed, so replies may be slower."
        },
        internalKnowledgeTitle: {
            id: "QJf1Sc",
            defaultMessage: "Chat"
        },
        internalKnowledgeDescription: {
            id: "lJilfk",
            defaultMessage: "Sync Notion pages and databases to ChatGPT for more relevant, up-to-date answers"
        },
        recommendedBadge: {
            id: "Wtyyql",
            defaultMessage: "Recommended"
        },
        syncTitle: {
            id: "7Ar/Ej",
            defaultMessage: "Sync"
        },
        syncDescription: {
            id: "6WCZbJ",
            defaultMessage: "Sync Notion content to ChatGPT for faster, more relevant answers."
        },
        syncBadge: {
            id: "0OM3Oh",
            defaultMessage: "Sync"
        }
    }),
    ds = {
        value: "deepResearch",
        label: Ne.deepResearchTitle,
        description: Ne.deepResearchDescription,
        Icon: Ue
    },
    us = {
        value: "deepResearchAndOdyssey",
        label: Ne.deepResearchAndOdysseyTitle,
        description: Ne.deepResearchAndOdysseyDescription,
        Icon: Ue
    },
    ps = {
        value: "internalKnowledge",
        label: Ne.internalKnowledgeTitle,
        description: Ne.internalKnowledgeDescription,
        Icon: Bt,
        Badge: cs
    },
    ms = {
        value: "internalKnowledge",
        label: Ne.syncTitle,
        description: Ne.syncDescription,
        Icon: Ft,
        Badge: is
    },
    gs = {
        value: "deepResearch",
        label: Ne.dontSyncTitle,
        description: Ne.dontSyncDescription,
        Icon: Ht
    },
    fs = ye({
        selectProductTitle: {
            id: "uecmFA",
            defaultMessage: "Select a connection type"
        },
        deepResearchTitle: {
            id: "BufFDR",
            defaultMessage: "Deep research"
        },
        deepResearchAndOdysseyTitle: {
            id: "ZQSdTY",
            defaultMessage: "Chat, deep research, agent"
        },
        deepResearchAndOdysseyDescription: {
            id: "plFxz/",
            defaultMessage: "Find, analyze, and synthesize your SharePoint files to create comprehensive reports"
        },
        deepResearchDescription: {
            id: "D9wqqk",
            defaultMessage: "Find, analyze, and synthesize your SharePoint files to create comprehensive reports"
        },
        dontSyncTitle: {
            id: "FNGsn2",
            defaultMessage: "Don't sync"
        },
        dontSyncDescription: {
            id: "ol0mde",
            defaultMessage: "ChatGPT will read your SharePoint files as needed, so replies may be slower."
        },
        internalKnowledgeTitle: {
            id: "9IqPsM",
            defaultMessage: "Chat, deep research, agent"
        },
        internalKnowledgeDescription: {
            id: "Mkivbe",
            defaultMessage: "Sync SharePoint files to ChatGPT for more relevant, up-to-date answers"
        },
        recommendedBadge: {
            id: "Wtyyql",
            defaultMessage: "Recommended"
        },
        syncTitle: {
            id: "w0EP7L",
            defaultMessage: "Sync"
        },
        syncDescription: {
            id: "WmlsRw",
            defaultMessage: "Sync SharePoint files to ChatGPT for faster, more relevant answers."
        },
        syncBadge: {
            id: "0OM3Oh",
            defaultMessage: "Sync"
        },
        internalKnowledgeTooltip: {
            id: "g8mQKA",
            defaultMessage: "Contact your admin to enable SharePoint for chat"
        }
    }),
    hs = we({
        messages: fs
    }),
    ys = ye({
        selectProductTitle: {
            id: "tiiSob",
            defaultMessage: "Select a connection type"
        },
        deepResearchTitle: {
            id: "BufFDR",
            defaultMessage: "Deep research"
        },
        deepResearchAndOdysseyTitle: {
            id: "y9kp7g",
            defaultMessage: "Deep research and agent mode"
        },
        deepResearchAndOdysseyDescription: {
            id: "E2YSMq",
            defaultMessage: "Find, analyze, and synthesize your Box files to create comprehensive reports"
        },
        deepResearchDescription: {
            id: "sQ+00J",
            defaultMessage: "Find, analyze, and synthesize your Box files to create comprehensive reports"
        },
        dontSyncTitle: {
            id: "M9p5Sr",
            defaultMessage: "Don't sync"
        },
        dontSyncDescription: {
            id: "uJTHjO",
            defaultMessage: "ChatGPT will read your Box files as needed, so replies may be slower."
        },
        internalKnowledgeTitle: {
            id: "8z2iu4",
            defaultMessage: "Chat"
        },
        internalKnowledgeDescription: {
            id: "xK+380",
            defaultMessage: "Sync Box files to ChatGPT for more relevant, up-to-date answers"
        },
        recommendedBadge: {
            id: "Wtyyql",
            defaultMessage: "Recommended"
        },
        syncTitle: {
            id: "nbQOhy",
            defaultMessage: "Sync"
        },
        syncDescription: {
            id: "QVxBJI",
            defaultMessage: "Sync Box files to ChatGPT for faster, more relevant answers."
        },
        syncBadge: {
            id: "0OM3Oh",
            defaultMessage: "Sync"
        },
        internalKnowledgeTooltip: {
            id: "4Gp6+x",
            defaultMessage: "Contact your admin to enable Box for chat"
        }
    }),
    Cs = we({
        messages: ys
    }),
    xs = ye({
        selectProductTitle: {
            id: "Kc1KGe",
            defaultMessage: "Select a connection type"
        },
        deepResearchTitle: {
            id: "BufFDR",
            defaultMessage: "Deep research"
        },
        deepResearchAndOdysseyTitle: {
            id: "y9kp7g",
            defaultMessage: "Deep research and agent mode"
        },
        deepResearchAndOdysseyDescription: {
            id: "YxjjQU",
            defaultMessage: "Find, analyze, and synthesize your Confluence pages to create comprehensive reports"
        },
        deepResearchDescription: {
            id: "SmRTX8",
            defaultMessage: "Find, analyze, and synthesize your Confluence pages to create comprehensive reports"
        },
        dontSyncTitle: {
            id: "B1m/Ur",
            defaultMessage: "Don't sync"
        },
        dontSyncDescription: {
            id: "nDBuCO",
            defaultMessage: "ChatGPT will read your Confluence pages as needed, so replies may be slower."
        },
        internalKnowledgeTitle: {
            id: "8ckwHH",
            defaultMessage: "Chat"
        },
        internalKnowledgeDescription: {
            id: "CkaEi7",
            defaultMessage: "Sync Confluence pages to ChatGPT for more relevant, up-to-date answers"
        },
        recommendedBadge: {
            id: "Wtyyql",
            defaultMessage: "Recommended"
        },
        syncTitle: {
            id: "tJk3ba",
            defaultMessage: "Sync"
        },
        syncDescription: {
            id: "di8xMd",
            defaultMessage: "Sync Confluence pages to ChatGPT for faster, more relevant answers."
        },
        syncBadge: {
            id: "0OM3Oh",
            defaultMessage: "Sync"
        },
        internalKnowledgeTooltip: {
            id: "dKvJHF",
            defaultMessage: "Contact your admin to enable Confluence for chat"
        }
    }),
    Os = we({
        messages: xs
    }),
    Ts = ye({
        selectProductTitle: {
            id: "5spMkf",
            defaultMessage: "Select a connection type"
        },
        deepResearchTitle: {
            id: "BufFDR",
            defaultMessage: "Deep research"
        },
        deepResearchAndOdysseyTitle: {
            id: "y9kp7g",
            defaultMessage: "Deep research and agent mode"
        },
        deepResearchAndOdysseyDescription: {
            id: "U0acJQ",
            defaultMessage: "Find, analyze, and synthesize your Dropbox files to create comprehensive reports"
        },
        deepResearchDescription: {
            id: "jIJEzP",
            defaultMessage: "Find, analyze, and synthesize your Dropbox files to create comprehensive reports"
        },
        dontSyncTitle: {
            id: "8B2iTh",
            defaultMessage: "Don't sync"
        },
        dontSyncDescription: {
            id: "MWu53i",
            defaultMessage: "ChatGPT will read your Dropbox files as needed, so replies may be slower."
        },
        internalKnowledgeTitle: {
            id: "iUMNhW",
            defaultMessage: "Chat"
        },
        internalKnowledgeDescription: {
            id: "73blMa",
            defaultMessage: "Sync Dropbox files to ChatGPT for more relevant, up-to-date answers"
        },
        recommendedBadge: {
            id: "Wtyyql",
            defaultMessage: "Recommended"
        },
        syncTitle: {
            id: "aRVh2X",
            defaultMessage: "Sync"
        },
        syncDescription: {
            id: "uTHxb2",
            defaultMessage: "Sync Dropbox files to ChatGPT for faster, more relevant answers."
        },
        syncBadge: {
            id: "0OM3Oh",
            defaultMessage: "Sync"
        },
        internalKnowledgeTooltip: {
            id: "/uVHMl",
            defaultMessage: "Contact your admin to enable Dropbox for chat"
        }
    }),
    Ns = we({
        messages: Ts
    }),
    Ss = ye({
        selectProductTitle: {
            id: "vNGjSS",
            defaultMessage: "Select a connection type"
        },
        deepResearchTitle: {
            id: "BufFDR",
            defaultMessage: "Deep research"
        },
        deepResearchAndOdysseyTitle: {
            id: "y9kp7g",
            defaultMessage: "Deep research and agent mode"
        },
        deepResearchAndOdysseyDescription: {
            id: "1X1JDE",
            defaultMessage: "Find, analyze, and synthesize your Intercom conversations to create comprehensive reports"
        },
        deepResearchDescription: {
            id: "0ExpFM",
            defaultMessage: "Find, analyze, and synthesize your Intercom conversations to create comprehensive reports"
        },
        dontSyncTitle: {
            id: "4WufmE",
            defaultMessage: "Don't sync"
        },
        dontSyncDescription: {
            id: "0BFTy+",
            defaultMessage: "ChatGPT will read your Intercom conversations as needed, so replies may be slower."
        },
        internalKnowledgeTitle: {
            id: "m/G/ff",
            defaultMessage: "Chat"
        },
        internalKnowledgeDescription: {
            id: "4gC4/b",
            defaultMessage: "Sync Intercom conversations to ChatGPT for more relevant, up-to-date answers"
        },
        internalKnowledgeTooltip: {
            id: "YxCdN8",
            defaultMessage: "Contact your admin to enable Intercom for chat"
        },
        recommendedBadge: {
            id: "Wtyyql",
            defaultMessage: "Recommended"
        },
        syncTitle: {
            id: "jafwiu",
            defaultMessage: "Sync"
        },
        syncDescription: {
            id: "ISqAI/",
            defaultMessage: "Sync Intercom conversations to ChatGPT for faster, more relevant answers."
        },
        syncBadge: {
            id: "0OM3Oh",
            defaultMessage: "Sync"
        }
    }),
    Rs = we({
        messages: Ss
    }),
    Es = ye({
        selectProductTitle: {
            id: "kU51Yz",
            defaultMessage: "Select a connection type"
        },
        deepResearchTitle: {
            id: "BufFDR",
            defaultMessage: "Deep research"
        },
        deepResearchAndOdysseyTitle: {
            id: "y9kp7g",
            defaultMessage: "Deep research and agent mode"
        },
        deepResearchAndOdysseyDescription: {
            id: "5P9nHy",
            defaultMessage: "Find, analyze, and synthesize your Linear issues to create comprehensive reports"
        },
        deepResearchDescription: {
            id: "7qO5UY",
            defaultMessage: "Find, analyze, and synthesize your Linear issues to create comprehensive reports"
        },
        dontSyncTitle: {
            id: "s+7AVU",
            defaultMessage: "Don't sync"
        },
        dontSyncDescription: {
            id: "qQEaBe",
            defaultMessage: "ChatGPT will read your Linear issues as needed, so replies may be slower."
        },
        internalKnowledgeTitle: {
            id: "CZbTgH",
            defaultMessage: "Chat"
        },
        internalKnowledgeDescription: {
            id: "S+Hglq",
            defaultMessage: "Sync Linear issues to ChatGPT for more relevant, up-to-date answers"
        },
        recommendedBadge: {
            id: "Wtyyql",
            defaultMessage: "Recommended"
        },
        syncTitle: {
            id: "XI3bjb",
            defaultMessage: "Sync"
        },
        syncDescription: {
            id: "3e8sdS",
            defaultMessage: "Sync Linear issues to ChatGPT for faster, more relevant answers."
        },
        syncBadge: {
            id: "0OM3Oh",
            defaultMessage: "Sync"
        },
        internalKnowledgeTooltip: {
            id: "lxy6iQ",
            defaultMessage: "Contact your admin to enable Linear for chat"
        }
    }),
    bs = we({
        messages: Es
    }),
    Rt = rt(() => ot(() =>
        import ("./604d4c3d-b11e72ss6iyc2rlq.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])).then(n => n.RedirectContent));

function ee({
    platformConnectorType: n,
    knowledgeConnectorType: e,
    connectorId: a,
    ProductSelectComponent: o,
    syncConnectorId: i,
    showProductSelectWithoutDeepResearch: d
}) {
    return function({
        onClose: y,
        connector: r,
        linkCreateProductSku: S,
        hideHeaderIcons: E
    }) {
        const x = ze(),
            M = x.formatMessage({
                id: "FormField.errorIcon",
                defaultMessage: "Error"
            }),
            v = it(),
            te = !!Mt(),
            [Y, U] = m.useState(!1),
            ue = Ye() ? ? "unknown_referrer",
            V = $e(),
            b = We(),
            q = en(),
            w = m.useMemo(() => jt(r.link_params_schema), [r.link_params_schema]),
            [$, re] = m.useState({}),
            ce = m.useMemo(() => Dt(w, $), [w, $]),
            [g, A] = m.useState({}),
            C = m.useMemo(() => {
                const u = new Set(w.map(P => P.name)),
                    j = {};
                for (const [P, K] of Object.entries(g)) u.has(P) && (j[P] = K);
                return j
            }, [g, w]),
            T = m.useCallback((u, j) => {
                re(P => ({ ...P,
                    [u]: j
                })), A(P => {
                    if (!P[u]) return P;
                    const K = { ...P
                    };
                    return delete K[u], K
                })
            }, []),
            L = tn(V ? .planType) ? !0 : !!(V ? .isPersonalAccount() && b),
            {
                availableConnectors: k,
                isLoading: H
            } = vt(),
            {
                availableConnectors: O,
                isLoading: f
            } = zt(),
            {
                isLoading: F,
                internalKnowledgeConfigs: R,
                internalKnowledgeEnabled: c
            } = $s(e),
            [z, _] = m.useMemo(() => Kn(R ? ? [], u => u.user_connection_details.auth_status === "not_connected"), [R]),
            N = z.length,
            Z = _.length,
            ie = N > 0 || L,
            {
                connectorLinks: ne,
                refetch: xe,
                isLoading: le
            } = Fe({
                productSku: Te.CONNECTOR_SETTING,
                fetchValidLinksOnly: !0
            }),
            {
                refetch: Oe
            } = Fe({
                productSku: Te.CONNECTOR_SETTING,
                fetchValidLinksOnly: !1,
                skip: !0
            }),
            pe = pt(),
            {
                mutateAsync: me
            } = ct(),
            ge = m.useMemo(() => !!ne.get(a) ? .length, [ne]),
            s = !ge && k.some(u => u.type === n),
            W = !ge && O.some(u => u.type === n),
            X = s || W,
            Se = !!(o && d && ie),
            se = !!o && v !== Te.DEEP_RESEARCH && (X || Se) && (ie || !V ? .isPersonalAccount() && c && Z < 1 && !L),
            ve = X ? W ? "deepResearchAndOdyssey" : "deepResearch" : null,
            Ie = ie && X,
            be = v !== Te.DEEP_RESEARCH && Ie && He("3495630358"),
            Ee = i == null,
            [fe, Pe] = m.useState(() => te || ie && !X ? "internalKnowledge" : v === Te.DEEP_RESEARCH ? "deepResearch" : be ? Ee ? "internalKnowledge" : ve : null),
            Ae = v === Te.DEEP_RESEARCH || fe === "deepResearch" || fe === "deepResearchAndOdyssey" || !se && X,
            je = fe === "internalKnowledge" || !se && v !== Te.DEEP_RESEARCH && ie,
            De = wt(v, Ae),
            Ke = S ? ? De,
            Me = je && ie,
            p = Me && i != null,
            ae = v !== Te.DEEP_RESEARCH && (F || se && (H || f)) || se && le,
            G = w.length > 0 ? t.jsxs("div", {
                className: "flex flex-col gap-3",
                children: [t.jsxs("div", {
                    className: "flex flex-col gap-1",
                    children: [t.jsx("div", {
                        className: "text-token-text-primary text-sm font-semibold",
                        children: t.jsx(oe, { ...Re.sectionTitle
                        })
                    }), t.jsx("div", {
                        className: "text-token-text-secondary text-xs",
                        children: t.jsx(oe, { ...Re.sectionDescription
                        })
                    })]
                }), t.jsx("div", {
                    className: "flex flex-col gap-3",
                    children: w.map(u => {
                        const j = u.required ? x.formatMessage(Re.fieldLabelRequired, {
                                label: u.title
                            }) : u.title,
                            P = x.formatMessage(Re.fieldPlaceholder, {
                                label: u.title
                            }),
                            K = C[u.name];
                        if (u.enumValues && u.enumValues.length > 0) {
                            const I = `link_param_${u.name}`,
                                D = `${I}_label`,
                                de = K ? `${I}_error` : void 0,
                                ke = ce[u.name] ? ? "";
                            return t.jsxs("div", {
                                className: "flex flex-col gap-1",
                                children: [t.jsx("label", {
                                    id: D,
                                    className: "text-token-text-primary text-xs font-semibold",
                                    htmlFor: I,
                                    children: j
                                }), t.jsxs(he.Root, {
                                    value: ke === "" ? void 0 : ke,
                                    onValueChange: _e => T(u.name, _e),
                                    children: [t.jsxs(he.Trigger, {
                                        id: I,
                                        "aria-labelledby": D,
                                        "aria-describedby": de,
                                        "aria-invalid": K ? !0 : void 0,
                                        className: "border-token-border-heavy bg-token-bg-primary w-full justify-between rounded-md text-start",
                                        children: [t.jsx("div", {
                                            className: "flex-1 truncate text-sm",
                                            children: t.jsx(he.Value, {
                                                placeholder: P
                                            })
                                        }), t.jsx(he.Icon, {})]
                                    }), t.jsx(he.Portal, {
                                        children: t.jsx(he.Content, {
                                            className: "border-token-border-heavy border",
                                            children: u.enumValues ? .map(_e => t.jsx(he.Item, {
                                                value: _e,
                                                children: _e
                                            }, _e))
                                        })
                                    })]
                                }), K ? t.jsxs("div", {
                                    id: de,
                                    className: "flex items-center gap-1 text-xs text-red-500",
                                    children: [t.jsx(gt, {
                                        title: M
                                    }), K]
                                }) : null, u.description ? t.jsx("div", {
                                    className: "text-token-text-secondary text-xs",
                                    children: u.description
                                }) : null]
                            }, u.name)
                        }
                        return t.jsxs("div", {
                            className: "flex flex-col gap-1",
                            children: [t.jsx(qe, {
                                name: `link_param_${u.name}`,
                                displayName: j,
                                value: ce[u.name] ? ? "",
                                onChange: I => T(u.name, I.target.value),
                                placeholder: P,
                                error: K,
                                showErrorIcon: !0
                            }), u.description ? t.jsx("div", {
                                className: "text-token-text-secondary text-xs",
                                children: u.description
                            }) : null]
                        }, u.name)
                    })
                })]
            }) : void 0,
            J = m.useCallback(async () => {
                let u;
                if (w.length > 0) {
                    const {
                        sanitizedLinkParams: j,
                        errors: P,
                        hasPatternErrors: K
                    } = Lt(w, ce, x);
                    if (Object.keys(P).length > 0) {
                        A(P), q.danger(x.formatMessage(K ? Re.invalidFieldsToast : Re.requiredFieldsToast));
                        return
                    }
                    A({}), u = j
                }
                try {
                    U(!0), mt("popup");
                    const j = pe(r),
                        P = p ? i ? ? r.id : r.id,
                        K = await lt({
                            connector: r,
                            redirectAfter: j || void 0,
                            toaster: q,
                            openPopup: !0,
                            intl: x,
                            productSku: Ke,
                            connectorIdOverride: p ? i : void 0,
                            linkParams: u
                        });
                    if (await xe(), Me) try {
                        const {
                            data: B
                        } = await Oe(), I = K && typeof K == "object" ? K.linkId : void 0, D = B ? .get(P) ? .[0];
                        let de = null;
                        typeof I == "string" ? de = {
                            id: I,
                            name: r.name,
                            connector_id: P
                        } : D && typeof D.id == "string" && (de = {
                            id: D.id,
                            name: r.name,
                            connector_id: P
                        }), de && (await me({
                            link: de,
                            isConnectingAndUpgrading: !0,
                            referrer: ue
                        }), setTimeout(() => {
                            nt()
                        }, 1e3))
                    } catch {}
                    y()
                } catch {
                    U(!1)
                }
            }, [r, x, w, ce, pe, y, Ke, xe, Oe, p, Me, q, me, ue]);
        return ae ? t.jsx("div", {
            className: "flex justify-center",
            children: t.jsx(dt, {})
        }) : t.jsxs(t.Fragment, {
            children: [o && se && !fe && t.jsx(o, {
                onClose: y,
                connector: r,
                onContinue: Pe,
                canAddDeepResearch: s,
                canAddOdyssey: W,
                canAddInternalKnowledge: ie
            }), (Ae || Me) && t.jsx(Rt, {
                connector: r,
                onClose: y,
                isConnecting: Y,
                onContinue: J,
                productSku: De,
                canSync: be,
                isRequestingSync: fe === "internalKnowledge",
                setIsRequestingSync: u => Pe(u ? "internalKnowledge" : ve),
                additionalContent: G,
                hideHeaderIcons: E
            }), je && !Me && t.jsx(Rt, {
                connector: r,
                onClose: () => {
                    Pe(null), se || y()
                },
                isConnecting: Y,
                onContinue: J,
                productSku: De,
                canSync: be,
                isRequestingSync: fe === "internalKnowledge",
                setIsRequestingSync: u => Pe(u ? "internalKnowledge" : ve),
                additionalContent: G,
                hideHeaderIcons: E
            })]
        })
    }
}
const ks = ee({
        platformConnectorType: l.SHAREPOINT_CONNECTOR,
        knowledgeConnectorType: "sharepoint",
        connectorId: Kt,
        ProductSelectComponent: hs
    }),
    _s = ee({
        platformConnectorType: l.DROPBOX_CONNECTOR,
        knowledgeConnectorType: "dropbox",
        connectorId: an,
        ProductSelectComponent: Ns
    }),
    Ms = ee({
        platformConnectorType: l.BOX_CONNECTOR,
        knowledgeConnectorType: "box",
        connectorId: on,
        ProductSelectComponent: Cs
    }),
    vs = ee({
        platformConnectorType: l.LINEAR_CONNECTOR,
        knowledgeConnectorType: "linear",
        connectorId: rn,
        ProductSelectComponent: bs
    }),
    Ps = ee({
        platformConnectorType: l.CONFLUENCE_CONNECTOR,
        knowledgeConnectorType: "confluence",
        connectorId: Ce[l.CONFLUENCE_CONNECTOR],
        ProductSelectComponent: Os
    }),
    ws = ee({
        platformConnectorType: l.NOTION_CONNECTOR,
        knowledgeConnectorType: "notion",
        connectorId: cn,
        syncConnectorId: ln,
        ProductSelectComponent: ls
    }),
    Is = ee({
        platformConnectorType: l.HUBSPOT_CONNECTOR,
        knowledgeConnectorType: "hubspot",
        connectorId: dn,
        ProductSelectComponent: rs
    }),
    As = ee({
        platformConnectorType: l.INTERCOM_CONNECTOR,
        knowledgeConnectorType: "intercom",
        connectorId: un,
        ProductSelectComponent: Rs,
        showProductSelectWithoutDeepResearch: !0
    }),
    js = ee({
        platformConnectorType: l.AHA_CONNECTOR,
        knowledgeConnectorType: "aha",
        connectorId: Ce[l.AHA_CONNECTOR]
    }),
    Ds = ee({
        platformConnectorType: l.ASANA_CONNECTOR,
        knowledgeConnectorType: "asana",
        connectorId: Ce[l.ASANA_CONNECTOR]
    }),
    Ls = ee({
        platformConnectorType: l.AZURE_DEVOPS_CONNECTOR,
        knowledgeConnectorType: "azure_devops",
        connectorId: Ce[l.AZURE_DEVOPS_CONNECTOR]
    }),
    Ks = ee({
        platformConnectorType: l.CLICKUP_CONNECTOR,
        knowledgeConnectorType: "clickup",
        connectorId: Ce[l.CLICKUP_CONNECTOR]
    }),
    Bs = ee({
        platformConnectorType: l.BASECAMP_CONNECTOR,
        knowledgeConnectorType: "basecamp",
        connectorId: Ce[l.BASECAMP_CONNECTOR]
    }),
    Fs = ee({
        platformConnectorType: l.GITLAB_CONNECTOR,
        knowledgeConnectorType: "gitlab",
        connectorId: Ce[l.GITLAB_CONNECTOR]
    }),
    Hs = ee({
        platformConnectorType: l.HELP_SCOUT_CONNECTOR,
        knowledgeConnectorType: "help_scout",
        connectorId: Ce[l.HELP_SCOUT_CONNECTOR]
    }),
    zs = ee({
        platformConnectorType: l.IRONCLAD_CONNECTOR,
        knowledgeConnectorType: "ironclad",
        connectorId: Ce[l.IRONCLAD_CONNECTOR]
    }),
    Gs = ee({
        platformConnectorType: l.TEAMWORK_CONNECTOR,
        knowledgeConnectorType: "teamwork",
        connectorId: Ce[l.TEAMWORK_CONNECTOR]
    }),
    Vs = ee({
        platformConnectorType: l.PIPEDRIVE_CONNECTOR,
        knowledgeConnectorType: "pipedrive",
        connectorId: Ce[l.PIPEDRIVE_CONNECTOR]
    }),
    Us = ee({
        platformConnectorType: l.ZOHO_CONNECTOR,
        knowledgeConnectorType: "zoho",
        connectorId: Ce[l.ZOHO_CONNECTOR]
    }),
    qs = ee({
        platformConnectorType: l.ZOHO_DESK_CONNECTOR,
        knowledgeConnectorType: "zoho_desk",
        connectorId: Ce[l.ZOHO_DESK_CONNECTOR]
    });

function $s(n) {
    const e = nn(),
        a = sn(),
        o = m.useMemo(() => a.data ? .connection_statuses.filter(i => i.user_connection_details.knowledge_connector_type === n), [a.data, n]);
    return {
        isLoading: a.isLoading,
        internalKnowledgeEnabled: e,
        internalKnowledgeConfigs: e && o ? .length ? o : null
    }
}
const Ws = rt(() => ot(() =>
        import ("./604d4c3d-b11e72ss6iyc2rlq.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])).then(n => n.RedirectContent)),
    Le = ye({
        medicalRecordsReadyToUseToast: {
            id: "gLzh6F",
            defaultMessage: "The Medical Records app is now ready to use"
        },
        overlayPillarAtlas: {
            id: "cJwLsn",
            defaultMessage: "When is Project Atlas launching?"
        },
        overlayPillarQ4Plans: {
            id: "BRs36X",
            defaultMessage: "Summarize our Q4 plans"
        },
        overlayPillarTravelPolicy: {
            id: "W60X5R",
            defaultMessage: "What is our travel policy?"
        },
        apiKeyLabel: {
            id: "hDHGPv",
            defaultMessage: "Access token / API key"
        },
        apiKeyPlaceholder: {
            id: "2Xz6Oj",
            defaultMessage: "Enter access token or API key"
        },
        apiKeyRequired: {
            id: "T9Lp5W",
            defaultMessage: "Enter an access token or API key to continue."
        }
    });

function Qs({
    canSyncGmail: n,
    isGmailConnector: e,
    isOrbitSyncDefaultEnabled: a,
    syncOnly: o
}) {
    const i = e && n;
    return {
        canOfferSyncChoice: i,
        shouldDefaultToSync: i && (o || a)
    }
}
const Ut = ({
        connector: n,
        onClose: e,
        productSku: a,
        linkCreateProductSku: o,
        redirectAfter: i,
        authTypeOverride: d,
        noRedirect: h = !1,
        onComplete: y,
        referrer: r,
        launcherAnalytics: S
    }) => {
        "use no forget";
        const E = ze(),
            x = _t(),
            {
                connectorLinks: M
            } = Fe({
                productSku: a
            }),
            {
                refetch: v
            } = Fe({
                productSku: a,
                fetchValidLinksOnly: !1,
                skip: !0
            }),
            {
                mutateAsync: te
            } = ct(),
            Y = E.formatMessage({
                id: "FormField.errorIcon",
                defaultMessage: "Error"
            }),
            [U, ue] = m.useState(!1),
            [V, b] = m.useState(),
            [q, w] = m.useState(""),
            $ = $t(),
            re = hn(),
            ce = yn(),
            g = Ve[n.id] === l.GITHUB_CONNECTOR,
            A = Ve[n.id] === l.GMAIL_CONNECTOR,
            C = Q("gmail"),
            T = A && He("898390776"),
            L = Cn(),
            k = xn(),
            H = pt(),
            O = Ye(),
            f = r ? ? O,
            [F, R] = Wt(),
            c = o ? ? a,
            z = On(),
            _ = Tn(),
            N = n.id === Ot && z,
            Z = A && C && T,
            ie = He("2515012530"),
            ne = m.useMemo(() => jt(n.link_params_schema), [n.link_params_schema]),
            xe = n.supported_auth.some(p => p.type === "API_KEY"),
            [le, Oe] = m.useState({}),
            pe = async () => {
                const p = ae => Promise.all([ae.invalidateQueries({
                    refetchType: "all",
                    queryKey: ["fetchConnectorLinkData"]
                }), ae.invalidateQueries({
                    refetchType: "all",
                    queryKey: ["fetchConnectorLinksByConnectorId"]
                }), ae.invalidateQueries({
                    refetchType: "all",
                    queryKey: ["system-hints", "connectors"]
                })]);
                if ($ === re) {
                    await p($);
                    return
                }
                await Promise.all([p($), p(re)])
            },
            me = m.useMemo(() => Dt(ne, le), [ne, le]),
            [ge, s] = m.useState({}),
            W = M.get(n.id) ? ? [],
            X = W[0] ? .id,
            Se = Nn(W[0] ? .tool_settings ? .personalized),
            se = m.useMemo(() => {
                const p = new Set(ne.map(G => G.name)),
                    ae = {};
                for (const [G, J] of Object.entries(ge)) p.has(G) && (ae[G] = J);
                return ae
            }, [ge, ne]),
            {
                clampTemplatesContent: ve,
                clampValidation: Ie,
                validationToastMessage: be
            } = Vt({
                templates: n.clamp_templates,
                intl: E,
                infoIcon: Fn,
                enabled: ie
            }),
            Ee = (p, ae) => {
                Oe(G => ({ ...G,
                    [p]: ae
                })), s(G => {
                    if (!G[p]) return G;
                    const J = { ...G
                    };
                    return delete J[p], J
                })
            };
        let fe = i;
        if (g) {
            const p = new URL(i ? ? "/", window.location.origin);
            ce && (p.searchParams.append("github_onboarding", "sync-repos"), fe = p.pathname + p.search)
        }
        const Pe = async (p, ae) => {
                const {
                    actionParamSchemas: G,
                    hasErrors: J
                } = Ie;
                if (J) {
                    x.danger(be);
                    return
                }
                const u = kn(n, d ? ? p),
                    j = ae === void 0 ? void 0 : {
                        personalized: ae ? "PERSONALIZE_ALWAYS" : "NO_PERSONALIZATION"
                    };
                let P;
                if (ne.length > 0) {
                    const {
                        sanitizedLinkParams: B,
                        errors: I,
                        hasPatternErrors: D
                    } = Lt(ne, me, E);
                    if (Object.keys(I).length > 0) {
                        s(I), x.danger(E.formatMessage(D ? Re.invalidFieldsToast : Re.requiredFieldsToast));
                        return
                    }
                    s({}), P = B
                }
                if (u === "API_KEY" && q.length === 0) {
                    x.danger(E.formatMessage(Le.apiKeyRequired));
                    return
                }
                const K = async B => {
                    await pe(), S && Ge.logSetupCompleted({
                        connector_id_metadata: Ge.createIdMetadataFromConnector(n, f ? ? "unknown_referrer"),
                        referrer: f ? ? "unknown_referrer",
                        success: !0,
                        syncRequired: !1,
                        launcherAnalytics: S
                    }), y ? .(B ? {
                        linkId: B
                    } : void 0), e(), x.success(wn({
                        id: n.id,
                        name: n.name,
                        intl: E,
                        defaultMessageFn: I => E.formatMessage({
                            id: "cb/7hh",
                            defaultMessage: "{connector} is now connected"
                        }, {
                            connector: I
                        }),
                        overrideConnectorMessageFnMap: {
                            [Hn]: () => E.formatMessage(Le.medicalRecordsReadyToUseToast)
                        }
                    })), (f === Xe.JitPluginMessage || f === Xe.MessageSuggestion || f === Xe.SourcePills) && R(I => (I.set("link_success", "true"), I), {
                        replace: !0
                    })
                };
                try {
                    switch (ue(!0), b(u), u) {
                        case "OAUTH":
                            {
                                const B = Z,
                                    I = h || B;I && mt("popup");
                                const D = H(n),
                                    de = await lt({
                                        connector: n,
                                        redirectAfter: h ? void 0 : D || fe,
                                        toaster: x,
                                        openPopup: I ? !0 : L,
                                        intl: E,
                                        productSku: c,
                                        slackTeamIdOverride: n.id === Ot ? _ ? ? void 0 : void 0,
                                        linkParams: P,
                                        callbackId: k ? ? void 0,
                                        toolSettings: j,
                                        actionParamSchemas: G,
                                        referrerOverride: f ? ? void 0,
                                        launcherAnalytics: S
                                    });await pe();
                                const ke = !!de && typeof de == "object" && de.success;
                                if (B && ke) try {
                                    const {
                                        data: _e
                                    } = await v(), yt = de && typeof de == "object" ? de.linkId : void 0, Ze = _e ? .get(n.id) ? .[0], Ct = typeof yt == "string" ? {
                                        id: yt,
                                        name: n.name,
                                        connector_id: n.id
                                    } : Ze && typeof Ze.id == "string" ? {
                                        id: Ze.id,
                                        name: n.name,
                                        connector_id: n.id
                                    } : null;
                                    Ct && await te({
                                        link: Ct,
                                        isConnectingAndUpgrading: !0,
                                        referrer: f ? ? "unknown_referrer"
                                    })
                                } catch {}
                                ke && y ? .(typeof de ? .linkId == "string" ? {
                                    linkId: de.linkId
                                } : void 0),
                                e();
                                break
                            }
                        case "API_KEY":
                            {
                                const B = await Mn(n, q, P, j, G, c);await K(B.id);
                                break
                            }
                        case "NONE":
                            {
                                const B = await _n(n, P, j, G, c);await K(B.id);
                                break
                            }
                    }
                } catch (B) {
                    ue(!1), b(void 0), S && u !== "OAUTH" && Ge.logSetupCompleted({
                        connector_id_metadata: Ge.createIdMetadataFromConnector(n, f ? ? "unknown_referrer"),
                        referrer: f ? ? "unknown_referrer",
                        success: !1,
                        syncRequired: !1,
                        error: B instanceof Error ? B.message : void 0,
                        launcherAnalytics: S
                    }), B instanceof Error && x.danger(E.formatMessage({
                        id: "wham.connectorSettings.addConnectorLinkModal.error",
                        defaultMessage: "Failed to add connector link"
                    }))
                }
            },
            Ae = ne.length > 0 ? t.jsxs("div", {
                className: "flex flex-col gap-3",
                children: [t.jsxs("div", {
                    className: "flex flex-col gap-1",
                    children: [t.jsx("div", {
                        className: "text-token-text-primary text-sm font-semibold",
                        children: t.jsx(oe, { ...Re.sectionTitle
                        })
                    }), t.jsx("div", {
                        className: "text-token-text-secondary text-xs",
                        children: t.jsx(oe, { ...Re.sectionDescription
                        })
                    })]
                }), t.jsx("div", {
                    className: "flex flex-col gap-3",
                    children: ne.map(p => {
                        const ae = p.required ? E.formatMessage(Re.fieldLabelRequired, {
                                label: p.title
                            }) : p.title,
                            G = E.formatMessage(Re.fieldPlaceholder, {
                                label: p.title
                            }),
                            J = se[p.name];
                        if (p.enumValues && p.enumValues.length > 0) {
                            const j = `link_param_${p.name}`,
                                P = `${j}_label`,
                                K = J ? `${j}_error` : void 0,
                                B = me[p.name] ? ? "";
                            return t.jsxs("div", {
                                className: "flex flex-col gap-1",
                                children: [t.jsx("label", {
                                    id: P,
                                    className: "text-token-text-primary text-xs font-semibold",
                                    htmlFor: j,
                                    children: ae
                                }), t.jsxs(he.Root, {
                                    value: B === "" ? void 0 : B,
                                    onValueChange: I => Ee(p.name, I),
                                    children: [t.jsxs(he.Trigger, {
                                        id: j,
                                        "aria-labelledby": P,
                                        "aria-describedby": K,
                                        "aria-invalid": J ? !0 : void 0,
                                        className: "border-token-border-heavy bg-token-bg-primary w-full justify-between rounded-md text-start",
                                        children: [t.jsx("div", {
                                            className: "flex-1 truncate text-sm",
                                            children: t.jsx(he.Value, {
                                                placeholder: G
                                            })
                                        }), t.jsx(he.Icon, {})]
                                    }), t.jsx(he.Portal, {
                                        children: t.jsx(he.Content, {
                                            className: "border-token-border-heavy border",
                                            children: p.enumValues ? .map(I => t.jsx(he.Item, {
                                                value: I,
                                                children: I
                                            }, I))
                                        })
                                    })]
                                }), J ? t.jsxs("div", {
                                    id: K,
                                    className: "flex items-center gap-1 text-xs text-red-500",
                                    children: [t.jsx(gt, {
                                        title: Y
                                    }), J]
                                }) : null, p.description ? t.jsx("div", {
                                    className: "text-token-text-secondary text-xs",
                                    children: p.description
                                }) : null]
                            }, p.name)
                        }
                        return t.jsxs("div", {
                            className: "flex flex-col gap-1",
                            children: [t.jsx(qe, {
                                name: `link_param_${p.name}`,
                                displayName: ae,
                                value: me[p.name] ? ? "",
                                onChange: j => Ee(p.name, j.target.value),
                                placeholder: G,
                                error: J,
                                showErrorIcon: !0
                            }), p.description ? t.jsx("div", {
                                className: "text-token-text-secondary text-xs",
                                children: p.description
                            }) : null]
                        }, p.name)
                    })
                })]
            }) : void 0,
            je = xe ? t.jsx("div", {
                className: "flex flex-col gap-1",
                children: t.jsx(qe, {
                    name: "connector-api-key",
                    ariaLabel: E.formatMessage(Le.apiKeyLabel),
                    value: q,
                    onChange: p => w(p.target.value),
                    placeholder: E.formatMessage(Le.apiKeyPlaceholder),
                    type: "password",
                    inputClassName: "bg-token-bg-primary!"
                })
            }) : void 0,
            De = Ie.hasErrors,
            Ke = je || Ae || ve ? t.jsxs("div", {
                className: "flex flex-col gap-4",
                children: [je, Ae, ve]
            }) : void 0,
            Me = () => {
                vn.count(Pn.ECOSYSTEM, "connector_link_modal_dismissed"), It.logEventWithStatsig("Connector Link Modal Dismissed", "chatgpt_web_connector_link_modal_dismissed", {
                    referrer: f,
                    connector_id: n.id,
                    connector_name: n.name,
                    connector_distribution_channel: n.distribution_channel ? ? null,
                    product_sku: a
                }), e()
            };
        return t.jsx(Ws, {
            connector: n,
            onClose: Me,
            isConnecting: U,
            isConnectingAuthType: V,
            onContinue: Pe,
            authTypeOverride: d,
            productSku: a,
            showExternalIcon: !0,
            isRequestingSync: Z,
            personalizationLinkId: X,
            isContinueDisabled: De,
            initialPersonalizeResultsEnabled: Se,
            referrerOverride: f ? ? void 0,
            launcherAnalytics: S,
            additionalContent: Ke,
            additionalMessageThatDoesNotContainLegalClaims: N ? t.jsx(oe, {
                id: "addConnectorLinkModal.slackWorkspaceReminder",
                defaultMessage: "In the next step, choose the {workspace} Slack workspace before approving access.",
                values: {
                    workspace: t.jsx("span", {
                        className: "font-semibold",
                        children: z
                    })
                }
            }) : void 0
        })
    },
    Ys = n => {
        "use forget";
        const e = Sn(),
            a = Rn(e),
            o = En(),
            {
                isEnabled: i,
                isLoading: d
            } = bn(),
            h = a ? i && !d : !0,
            y = Q("linear"),
            r = Q("dropbox"),
            S = Q("box"),
            E = Q("notion"),
            x = Q("hubspot"),
            M = Q("confluence"),
            v = Q("intercom"),
            te = Q("aha"),
            Y = Q("asana"),
            U = Q("azure_devops"),
            ue = Q("basecamp"),
            V = Q("clickup"),
            b = Q("gitlab"),
            q = Q("gmail"),
            w = Q("help_scout"),
            $ = Q("ironclad"),
            re = Q("pipedrive"),
            ce = Q("teamwork"),
            g = Q("zoho"),
            A = Q("zoho_desk");
        if (!n) return !1;
        switch (Ve[n.id]) {
            case l.SHAREPOINT_CONNECTOR:
                return !!(o && h);
            case l.LINEAR_CONNECTOR:
                return y;
            case l.DROPBOX_CONNECTOR:
                return r;
            case l.BOX_CONNECTOR:
                return S;
            case l.NOTION_CONNECTOR:
                return E;
            case l.HUBSPOT_CONNECTOR:
                return x;
            case l.CONFLUENCE_CONNECTOR:
                return M;
            case l.INTERCOM_CONNECTOR:
                return v;
            case l.AHA_CONNECTOR:
                return te;
            case l.ASANA_CONNECTOR:
                return Y;
            case l.AZURE_DEVOPS_CONNECTOR:
                return U;
            case l.BASECAMP_CONNECTOR:
                return ue;
            case l.CLICKUP_CONNECTOR:
                return V;
            case l.GITLAB_CONNECTOR:
                return b;
            case l.GMAIL_CONNECTOR:
                return q;
            case l.HELP_SCOUT_CONNECTOR:
                return w;
            case l.IRONCLAD_CONNECTOR:
                return $;
            case l.PIPEDRIVE_CONNECTOR:
                return re;
            case l.TEAMWORK_CONNECTOR:
                return ce;
            case l.ZOHO_CONNECTOR:
                return g;
            case l.ZOHO_DESK_CONNECTOR:
                return A;
            default:
                return !1
        }
    },
    Zs = n => {
        "use forget";
        const e = Et.c(90),
            {
                onClose: a,
                connectorId: o,
                linkCreateProductSku: i,
                onComplete: d,
                redirectAfter: h,
                backgroundImageUrl: y,
                noRedirect: r,
                authTypeOverride: S,
                referrer: E,
                launcherAnalytics: x
            } = n,
            M = ze(),
            v = pn(),
            te = o ? ? v,
            Y = it(),
            {
                data: U,
                isLoading: ue
            } = Bn(te);
        let V;
        e[0] !== U ? (V = ts(U), e[0] = U, e[1] = V) : V = e[1];
        const b = V,
            q = mn(),
            w = h ? ? q,
            $ = gn(),
            re = S ? ? $,
            ce = Ye(),
            g = E ? ? ce ? ? void 0,
            A = fn(),
            C = r ? ? !!A,
            T = Ys(b);
        let L;
        e[2] === Symbol.for("react.memo_cache_sentinel") ? (L = t.jsx("div", {
            className: "flex min-h-48 items-center justify-center py-10",
            children: t.jsx(dt, {})
        }), e[2] = L) : L = e[2];
        let k;
        e[3] !== a ? (k = t.jsx(Je, {
            testId: "modal-add-connector-link",
            type: "success",
            isOpen: !0,
            onClose: a,
            size: "custom",
            className: "max-w-[400px]",
            children: L
        }), e[3] = a, e[4] = k) : k = e[4];
        const H = k;
        if (ue) return H;
        const O = b ? .id === Pt;
        if (!b) return H;
        const f = Ve[b.id],
            F = !!y;
        let R;
        e[5] !== b || e[6] !== i || e[7] !== a || e[8] !== F ? (R = {
            onClose: a,
            connector: b,
            hideHeaderIcons: F,
            linkCreateProductSku: i
        }, e[5] = b, e[6] = i, e[7] = a, e[8] = F, e[9] = R) : R = e[9];
        const c = R;
        let z;
        e[10] !== re || e[11] !== b || e[12] !== x || e[13] !== i || e[14] !== C || e[15] !== a || e[16] !== d || e[17] !== Y || e[18] !== w || e[19] !== g ? (z = t.jsx(Ut, {
            connector: b,
            onClose: a,
            productSku: Y,
            linkCreateProductSku: i,
            redirectAfter: w,
            authTypeOverride: re,
            noRedirect: C,
            onComplete: d,
            referrer: g,
            launcherAnalytics: x
        }), e[10] = re, e[11] = b, e[12] = x, e[13] = i, e[14] = C, e[15] = a, e[16] = d, e[17] = Y, e[18] = w, e[19] = g, e[20] = z) : z = e[20];
        const _ = z;
        let N;
        e: switch (f) {
            case l.SHAREPOINT_CONNECTOR:
                {
                    let s;e[21] !== c ? (s = t.jsx(ks, { ...c
                    }), e[21] = c, e[22] = s) : s = e[22],
                    N = s;
                    break e
                }
            case l.DROPBOX_CONNECTOR:
                {
                    let s;e[23] !== c ? (s = t.jsx(_s, { ...c
                    }), e[23] = c, e[24] = s) : s = e[24],
                    N = s;
                    break e
                }
            case l.BOX_CONNECTOR:
                {
                    let s;e[25] !== c ? (s = t.jsx(Ms, { ...c
                    }), e[25] = c, e[26] = s) : s = e[26],
                    N = s;
                    break e
                }
            case l.LINEAR_CONNECTOR:
                {
                    let s;e[27] !== c ? (s = t.jsx(vs, { ...c
                    }), e[27] = c, e[28] = s) : s = e[28],
                    N = s;
                    break e
                }
            case l.NOTION_CONNECTOR:
                {
                    let s;e[29] !== c ? (s = t.jsx(ws, { ...c
                    }), e[29] = c, e[30] = s) : s = e[30],
                    N = s;
                    break e
                }
            case l.HUBSPOT_CONNECTOR:
                {
                    let s;e[31] !== c ? (s = t.jsx(Is, { ...c
                    }), e[31] = c, e[32] = s) : s = e[32],
                    N = s;
                    break e
                }
            case l.CONFLUENCE_CONNECTOR:
                {
                    let s;e[33] !== c ? (s = t.jsx(Ps, { ...c
                    }), e[33] = c, e[34] = s) : s = e[34],
                    N = s;
                    break e
                }
            case l.INTERCOM_CONNECTOR:
                {
                    let s;e[35] !== c ? (s = t.jsx(As, { ...c
                    }), e[35] = c, e[36] = s) : s = e[36],
                    N = s;
                    break e
                }
            case l.AHA_CONNECTOR:
                {
                    let s;e[37] !== c ? (s = t.jsx(js, { ...c
                    }), e[37] = c, e[38] = s) : s = e[38],
                    N = s;
                    break e
                }
            case l.ASANA_CONNECTOR:
                {
                    let s;e[39] !== c ? (s = t.jsx(Ds, { ...c
                    }), e[39] = c, e[40] = s) : s = e[40],
                    N = s;
                    break e
                }
            case l.AZURE_DEVOPS_CONNECTOR:
                {
                    let s;e[41] !== c ? (s = t.jsx(Ls, { ...c
                    }), e[41] = c, e[42] = s) : s = e[42],
                    N = s;
                    break e
                }
            case l.BASECAMP_CONNECTOR:
                {
                    let s;e[43] !== c ? (s = t.jsx(Bs, { ...c
                    }), e[43] = c, e[44] = s) : s = e[44],
                    N = s;
                    break e
                }
            case l.CLICKUP_CONNECTOR:
                {
                    let s;e[45] !== c ? (s = t.jsx(Ks, { ...c
                    }), e[45] = c, e[46] = s) : s = e[46],
                    N = s;
                    break e
                }
            case l.GITLAB_CONNECTOR:
                {
                    let s;e[47] !== c ? (s = t.jsx(Fs, { ...c
                    }), e[47] = c, e[48] = s) : s = e[48],
                    N = s;
                    break e
                }
            case l.HELP_SCOUT_CONNECTOR:
                {
                    let s;e[49] !== c ? (s = t.jsx(Hs, { ...c
                    }), e[49] = c, e[50] = s) : s = e[50],
                    N = s;
                    break e
                }
            case l.IRONCLAD_CONNECTOR:
                {
                    let s;e[51] !== c ? (s = t.jsx(zs, { ...c
                    }), e[51] = c, e[52] = s) : s = e[52],
                    N = s;
                    break e
                }
            case l.TEAMWORK_CONNECTOR:
                {
                    let s;e[53] !== c ? (s = t.jsx(Gs, { ...c
                    }), e[53] = c, e[54] = s) : s = e[54],
                    N = s;
                    break e
                }
            case l.PIPEDRIVE_CONNECTOR:
                {
                    let s;e[55] !== c ? (s = t.jsx(Vs, { ...c
                    }), e[55] = c, e[56] = s) : s = e[56],
                    N = s;
                    break e
                }
            case l.ZOHO_CONNECTOR:
                {
                    let s;e[57] !== c ? (s = t.jsx(Us, { ...c
                    }), e[57] = c, e[58] = s) : s = e[58],
                    N = s;
                    break e
                }
            case l.ZOHO_DESK_CONNECTOR:
                {
                    let s;e[59] !== c ? (s = t.jsx(qs, { ...c
                    }), e[59] = c, e[60] = s) : s = e[60],
                    N = s;
                    break e
                }
            default:
                N = null
        }
        const Z = N,
            ie = zn(b),
            ne = !!y;
        let xe;
        e[61] !== y || e[62] !== b.id || e[63] !== M ? (xe = s => {
            if (!y) return s;
            const W = b ? .id === Kt ? In : At;
            return t.jsxs("div", {
                className: "flex w-full flex-col overflow-hidden rounded-2xl md:max-h-[700px] md:flex-row",
                children: [t.jsxs("div", {
                    className: "relative hidden h-full md:block md:w-[430px] lg:w-[430px]",
                    children: [t.jsx("img", {
                        src: y,
                        alt: "",
                        className: "h-full w-full object-cover",
                        "aria-hidden": !0
                    }), t.jsxs("div", {
                        className: "absolute inset-0 flex flex-col items-center justify-center gap-4",
                        children: [t.jsxs("div", {
                            className: "flex items-center gap-2.5",
                            children: [t.jsx("div", {
                                className: "bg-token-bg-primary rounded-xl border-[0.5px] p-2 shadow-sm",
                                children: t.jsx(An, {
                                    className: "h-8 w-8",
                                    "aria-hidden": !0
                                })
                            }), t.jsxs("div", {
                                className: "flex gap-1",
                                children: [t.jsx("span", {
                                    className: "h-1.5 w-1.5 rounded-full bg-black/15"
                                }), t.jsx("span", {
                                    className: "h-1.5 w-1.5 rounded-full bg-black/30"
                                }), t.jsx("span", {
                                    className: "h-1.5 w-1.5 rounded-full bg-black/45"
                                })]
                            }), t.jsx("div", {
                                className: "bg-token-bg-primary rounded-xl border-[0.5px] p-2 shadow-sm",
                                children: t.jsx(W, {
                                    className: "h-8 w-8",
                                    "aria-hidden": !0
                                })
                            })]
                        }), t.jsx("div", {
                            className: "mt-16 flex flex-col items-start gap-3",
                            children: [M.formatMessage(Le.overlayPillarAtlas), M.formatMessage(Le.overlayPillarQ4Plans), M.formatMessage(Le.overlayPillarTravelPolicy)].map(X => t.jsxs("div", {
                                className: "inline-flex items-center gap-2 rounded-2xl bg-white/92 px-3 py-2 text-[14px] font-normal text-black",
                                children: [t.jsx(W, {
                                    className: "h-5 w-5",
                                    "aria-hidden": !0
                                }), t.jsx("span", {
                                    className: "font-normal",
                                    children: X
                                })]
                            }, X))
                        })]
                    })]
                }), t.jsx("div", {
                    className: "flex h-full flex-1 flex-col px-10 md:w-[420px] lg:w-[440px]",
                    children: s
                })]
            })
        }, e[61] = y, e[62] = b.id, e[63] = M, e[64] = xe) : xe = e[64];
        const le = xe;
        if (ie) {
            const s = ne ? "max-w-[900px]" : "max-w-[580px]";
            let W;
            e[65] !== _ || e[66] !== le ? (W = le(_), e[65] = _, e[66] = le, e[67] = W) : W = e[67];
            let X;
            return e[68] !== a || e[69] !== W || e[70] !== s ? (X = t.jsx(Je, {
                testId: "modal-add-connector-link",
                type: "success",
                isOpen: !0,
                onClose: a,
                size: "custom",
                noPadding: !0,
                className: s,
                children: W
            }), e[68] = a, e[69] = W, e[70] = s, e[71] = X) : X = e[71], X
        }
        const Oe = ne ? "max-w-[900px]" : "max-w-[400px]";
        let pe;
        e[72] !== y || e[73] !== b || e[74] !== _ || e[75] !== O || e[76] !== T || e[77] !== Z || e[78] !== i || e[79] !== C || e[80] !== a ? (pe = O ? t.jsx(as, {
            onClose: a,
            connector: b,
            noRedirect: C,
            hideHeaderIcons: !!y,
            linkCreateProductSku: i
        }) : T ? Z ? ? _ : _, e[72] = y, e[73] = b, e[74] = _, e[75] = O, e[76] = T, e[77] = Z, e[78] = i, e[79] = C, e[80] = a, e[81] = pe) : pe = e[81];
        let me;
        e[82] !== pe || e[83] !== le ? (me = le(pe), e[82] = pe, e[83] = le, e[84] = me) : me = e[84];
        let ge;
        return e[85] !== ne || e[86] !== a || e[87] !== me || e[88] !== Oe ? (ge = t.jsx(Je, {
            testId: "modal-add-connector-link",
            type: "success",
            isOpen: !0,
            onClose: a,
            size: "custom",
            noPadding: ne,
            className: Oe,
            children: me
        }), e[85] = ne, e[86] = a, e[87] = me, e[88] = Oe, e[89] = ge) : ge = e[89], ge
    },
    ia = Object.freeze(Object.defineProperty({
        __proto__: null,
        AddConnectorLinkModal: Zs,
        PlatformConnectorModalContent: Ut,
        getGmailSyncModalState: Qs
    }, Symbol.toStringTag, {
        value: "Module"
    }));
export {
    Zs as A, ca as d, ra as e, ia as i, ts as n, Vt as u
};
//# sourceMappingURL=1bc04b52-htrlynm8a3t36dsr.js.map