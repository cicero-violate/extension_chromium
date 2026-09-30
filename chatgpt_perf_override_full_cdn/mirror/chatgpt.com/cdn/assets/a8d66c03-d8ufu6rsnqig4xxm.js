import {
    h as $e,
    c as Ge,
    u as Ye,
    r as h,
    j as t,
    o as m
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    z as Vt,
    hi as pa,
    af as I,
    aY as fe,
    hk as dt,
    k as Kt,
    Ef as ma,
    fk as fa,
    J as ga,
    q as lt,
    Eg as xa,
    ej as $t,
    e as Ca,
    gr as ba,
    Eh as Ma,
    Ei as va,
    bi as ka,
    zo as Sa,
    a0 as Ta,
    aH as ya,
    aw as Aa,
    R as Gt,
    pO as Ua,
    b2 as Oa
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    c_ as ja,
    bK as Yt,
    cB as ut,
    a$ as Ea,
    kd as _t,
    aU as _a
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    I as Le
} from "./e9213bfa-drjldekxa18no8cz.js";
import {
    u as Da,
    a as Na
} from "./1d317354-b79iqvpdq5pcy4os.js";
import {
    u as Ia
} from "./1bc04b52-ud6fhzv6uahbvpse.js";
import {
    S as Ra
} from "./c816d342-i01x53wgy40jgq48.js";
const xn = (a, e) => Array.isArray(a) ? e.formatList(a.map(o => e.formatMessage(Dt[o])), {
        style: "narrow"
    }) : e.formatMessage(Dt[a]),
    Dt = $e({
        deepResearch: {
            id: "r08FIf",
            defaultMessage: "Deep research"
        },
        codex: {
            id: "P4DHkR",
            defaultMessage: "Codex"
        },
        chat: {
            id: "c+Ep08",
            defaultMessage: "Chat"
        },
        fileUploads: {
            id: "1JCCyh",
            defaultMessage: "File uploads"
        },
        odyssey: {
            id: "GUAx6M",
            defaultMessage: "Agent mode"
        }
    });

function Cn(a) {
    "use forget";
    const e = Vt();
    return !e || !a ? !1 : !!(a.owners ? .some(o => o.type === "USER" && o.id === e.normalizedAccountUserId) || (e.isAdminOfAccount() || e.isOwnerOfAccount()) && a.owners ? .some(o => o.type === "WORKSPACE" && o.id === e.getWorkspaceId()))
}

function Nt(a) {
    "use forget";
    const e = Ge.c(35),
        {
            form: o,
            showErrors: c,
            setShowErrors: i,
            clientIdAriaLabel: g,
            clientIdPlaceholder: f,
            clientSecretAriaLabel: s,
            clientSecretPlaceholder: x,
            mode: b,
            callbackUrl: T,
            canCopyCallbackUrl: y,
            supportedTokenEndpointAuthMethods: k,
            resolvedTokenEndpointAuthMethod: D,
            availableRequestedScopes: B,
            isCimdSupported: H,
            isDynamicClientRegistrationAvailable: W,
            hasPreconfiguredOauthClient: re,
            oauthClientMode: ye,
            isOidcAvailable: Ae,
            useManualRequestedScopesInput: M
        } = a,
        We = b === void 0 ? "credentials-only" : b,
        L = y === void 0 ? !1 : y,
        Ue = k === void 0 ? [] : k,
        ge = D === void 0 ? "" : D,
        Xe = B === void 0 ? [] : B,
        le = H === void 0 ? !1 : H,
        xe = W === void 0 ? !1 : W,
        Be = re === void 0 ? !1 : re,
        ce = ye === void 0 ? "USER_DEFINED" : ye,
        X = Ae === void 0 ? !1 : Ae,
        de = M === void 0 ? !1 : M,
        d = Ye();
    let ne;
    e[0] !== d ? (ne = d.formatMessage(l.listPlaceholder), e[0] = d, e[1] = ne) : ne = e[1];
    const R = ne;
    let oe;
    e[2] !== d ? (oe = d.formatMessage(l.oauthClientIdRequiredPlaceholder), e[2] = d, e[3] = oe) : oe = e[3];
    const z = oe,
        ue = We === "oauth-panel",
        [$, Oe] = h.useState(!1),
        Ce = ce === "USER_DEFINED",
        He = Be ? f : z,
        be = Ce && Be ? l.oauthClientModePreconfiguredDescription : Ce ? l.oauthClientModeUserDefinedDescription : ce === "DCR" ? l.oauthClientModeDcrDescription : l.oauthClientModeCimdDescription;
    let je, he;
    e[4] !== $ ? (je = () => {
        if (!$) return;
        const S = window.setTimeout(() => {
            Oe(!1)
        }, 2e3);
        return () => window.clearTimeout(S)
    }, he = [$], e[4] = $, e[5] = je, e[6] = he) : (je = e[5], he = e[6]), h.useEffect(je, he);
    let Ee;
    e[7] !== T || e[8] !== L ? (Ee = async () => {
        if (!(!T || !L)) try {
            await navigator.clipboard.writeText(T), Oe(!0)
        } catch {
            Oe(!1)
        }
    }, e[7] = T, e[8] = L, e[9] = Ee) : Ee = e[9];
    const ze = Ee,
        Ve = za;
    let G;
    e[10] !== o.Field ? (G = S => {
        const {
            name: v,
            label: P,
            placeholder: N,
            type: j,
            readOnly: E
        } = S, A = j === void 0 ? "text" : j, q = E === void 0 ? !1 : E;
        return t.jsx(o.Field, {
            name: v,
            children: V => t.jsxs("div", {
                className: "flex flex-col gap-1",
                children: [t.jsx("label", {
                    htmlFor: `custom-connector-${v}`,
                    className: "text-token-text-primary text-xs font-semibold",
                    children: P
                }), t.jsx(Yt, {
                    name: `custom-connector-${v}`,
                    type: A,
                    value: V.state.value,
                    onChange: J => V.handleChange(J.target.value),
                    ariaLabel: !1,
                    placeholder: N,
                    className: "border-token-border-light bg-token-main-surface-primary shadow-sm",
                    inputClassName: "bg-transparent!",
                    readOnly: q
                })]
            })
        })
    }, e[10] = o.Field, e[11] = G) : G = e[11];
    const Z = G;
    let Me;
    e[12] !== o.Field || e[13] !== R ? (Me = S => {
        const {
            name: v,
            label: P,
            description: N,
            readOnly: j
        } = S, E = j === void 0 ? !1 : j;
        return t.jsx(o.Field, {
            name: v,
            children: A => t.jsxs("div", {
                className: "flex flex-col gap-1",
                children: [t.jsx("label", {
                    htmlFor: `custom-connector-${v}`,
                    className: "text-token-text-primary text-xs font-semibold",
                    children: P
                }), t.jsx("textarea", {
                    id: `custom-connector-${v}`,
                    className: "border-token-border-light bg-token-main-surface-primary text-token-text-primary focus:border-token-border-xheavy focus:ring-token-text-secondary w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none",
                    value: A.state.value,
                    onChange: q => A.handleChange(q.target.value),
                    placeholder: R,
                    rows: 3,
                    readOnly: E
                }), N ? t.jsx("p", {
                    className: "text-token-text-tertiary text-xs",
                    children: N
                }) : null]
            })
        })
    }, e[12] = o.Field, e[13] = R, e[14] = Me) : Me = e[14];
    const _e = Me;
    let w;
    e[15] !== o.Field ? (w = S => {
        const {
            name: v,
            label: P,
            options: N,
            resolvedValue: j,
            placeholder: E,
            description: A,
            disabled: q
        } = S, V = q === void 0 ? !1 : q;
        return t.jsx(o.Field, {
            name: v,
            children: J => {
                const Ke = N.map(Ha),
                    F = N.filter(Ba).map(qa).includes(J.state.value) ? J.state.value : j && Ke.includes(j) ? j : "";
                return t.jsxs("div", {
                    className: "flex flex-col gap-1",
                    children: [t.jsx("label", {
                        htmlFor: `custom-connector-${v}`,
                        className: "text-token-text-primary text-xs font-semibold",
                        children: P
                    }), t.jsxs("select", {
                        id: `custom-connector-${v}`,
                        value: F,
                        onChange: Re => J.handleChange(Re.target.value),
                        disabled: V,
                        className: I("border-token-border-light bg-token-main-surface-primary text-token-text-primary focus:border-token-border-xheavy focus:ring-token-text-secondary w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none", V && "opacity-60"),
                        children: [t.jsx("option", {
                            value: "",
                            disabled: !0,
                            children: E
                        }), N.map(La)]
                    }), A ? t.jsx("p", {
                        className: "text-token-text-tertiary text-xs",
                        children: A
                    }) : null]
                })
            }
        })
    }, e[15] = o.Field, e[16] = w) : w = e[16];
    const ot = w;
    let se;
    e[17] !== be || e[18] !== o.Field || e[19] !== d || e[20] !== le || e[21] !== xe || e[22] !== ce ? (se = () => t.jsx(o.Field, {
        name: "oauthClientMode",
        children: S => t.jsxs("div", {
            className: "flex flex-col gap-2",
            children: [t.jsxs("div", {
                className: "flex flex-col gap-1",
                children: [t.jsx("label", {
                    htmlFor: "custom-connector-oauth-client-mode",
                    className: "text-token-text-primary text-xs font-semibold",
                    children: t.jsx(m, { ...l.oauthClientModeTitle
                    })
                }), t.jsx("p", {
                    className: "text-token-text-tertiary text-xs",
                    children: t.jsx(m, { ...l.oauthClientModeDescription,
                        values: {
                            link: Fa
                        }
                    })
                })]
            }), t.jsxs("select", {
                id: "custom-connector-oauth-client-mode",
                value: ce,
                onChange: v => S.handleChange(v.target.value),
                className: "border-token-border-light bg-token-main-surface-primary text-token-text-primary focus:border-token-border-xheavy focus:ring-token-text-secondary w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none",
                children: [t.jsx("option", {
                    value: "USER_DEFINED",
                    children: d.formatMessage(l.oauthClientModeUserDefinedOption)
                }), t.jsx("option", {
                    value: "DCR",
                    disabled: !xe,
                    children: d.formatMessage(xe ? l.oauthClientModeDcrOption : l.oauthClientModeDcrUnavailableOption)
                }), t.jsx("option", {
                    value: "CIMD",
                    disabled: !le,
                    children: d.formatMessage(le ? l.oauthClientModeCimdOption : l.oauthClientModeCimdUnavailableOption)
                })]
            }), t.jsx("p", {
                className: "text-token-text-tertiary text-xs",
                children: t.jsx(m, { ...be
                })
            }), xe ? null : t.jsxs("div", {
                role: "alert",
                className: "border-token-border-status-warning bg-token-bg-status-warning text-token-text-status-warning flex items-start gap-2 rounded-lg border px-2.5 py-2 text-xs",
                children: [t.jsx(dt, {
                    className: "icon-sm mt-0.5 shrink-0"
                }), t.jsx(m, { ...l.oauthClientModeDcrUnavailableDescription
                })]
            }), le ? null : t.jsxs("div", {
                role: "alert",
                className: "border-token-border-status-warning bg-token-bg-status-warning text-token-text-status-warning flex items-start gap-2 rounded-lg border px-2.5 py-2 text-xs",
                children: [t.jsx(dt, {
                    className: "icon-sm mt-0.5 shrink-0"
                }), t.jsx(m, { ...l.oauthClientModeCimdUnavailableDescription
                })]
            })]
        })
    }), e[17] = be, e[18] = o.Field, e[19] = d, e[20] = le, e[21] = xe, e[22] = ce, e[23] = se) : se = e[23];
    const De = se;
    let pe;
    e[24] !== o.Field ? (pe = S => {
        const {
            name: v,
            label: P,
            description: N,
            disabled: j
        } = S, E = j === void 0 ? !1 : j;
        return t.jsx(o.Field, {
            name: v,
            children: A => t.jsxs("label", {
                className: I("border-token-border-light bg-token-main-surface-primary flex items-start gap-3 rounded-xl border px-3 py-3 shadow-sm", E && "cursor-not-allowed opacity-60"),
                children: [t.jsx(ut, {
                    id: `custom-connector-${v}`,
                    checked: !!A.state.value,
                    onChange: () => {
                        E || A.handleChange(!A.state.value)
                    },
                    disabled: E
                }), t.jsxs("span", {
                    className: "flex flex-col gap-1",
                    children: [t.jsx("span", {
                        className: "text-sm font-medium",
                        children: P
                    }), N ? t.jsx("span", {
                        className: "text-token-text-tertiary text-xs",
                        children: N
                    }) : null]
                })]
            })
        })
    }, e[24] = o.Field, e[25] = pe) : pe = e[25];
    const st = pe;
    let u;
    e[26] !== o.Field || e[27] !== R ? (u = S => {
        const {
            name: v,
            label: P,
            description: N,
            emptyDescription: j,
            options: E,
            manualEntry: A
        } = S, q = A === void 0 ? !1 : A;
        return t.jsx(o.Field, {
            name: v,
            children: V => {
                const J = Array.isArray(V.state.value) ? V.state.value : [],
                    Ke = new Set(E),
                    Ie = Array.from(new Set([...J.filter(F => Ke.has(F))]));
                return t.jsxs("div", {
                    className: "flex flex-col gap-2",
                    children: [t.jsxs("div", {
                        className: "flex flex-col gap-1",
                        children: [t.jsx("span", {
                            className: "text-token-text-primary text-xs font-semibold",
                            children: P
                        }), N ? t.jsx("p", {
                            className: "text-token-text-tertiary text-xs",
                            children: N
                        }) : null]
                    }), q ? t.jsx("textarea", {
                        id: `custom-connector-${v}`,
                        className: "border-token-border-light bg-token-main-surface-primary text-token-text-primary focus:border-token-border-xheavy focus:ring-token-text-secondary w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none",
                        value: J.join(`
`),
                        onChange: F => V.handleChange(Ve(F.target.value)),
                        placeholder: R,
                        rows: 4
                    }) : E.length === 0 ? t.jsx("p", {
                        className: "text-token-text-tertiary text-xs",
                        children: j
                    }) : t.jsx("div", {
                        className: "flex flex-col gap-2",
                        children: E.map(F => {
                            const Re = Ie.includes(F);
                            return t.jsxs("label", {
                                className: "border-token-border-light bg-token-main-surface-primary flex items-start gap-3 rounded-xl border px-3 py-3 shadow-sm",
                                children: [t.jsx(ut, {
                                    id: `custom-connector-${v}-${F}`,
                                    checked: Re,
                                    onChange: () => {
                                        V.handleChange(Re ? Ie.filter(it => it !== F) : [...Ie, F])
                                    }
                                }), t.jsx("span", {
                                    className: "flex flex-col gap-1",
                                    children: t.jsx("span", {
                                        className: "font-mono text-sm",
                                        children: F
                                    })
                                })]
                            }, F)
                        })
                    })]
                })
            }
        })
    }, e[26] = o.Field, e[27] = R, e[28] = u) : u = e[28];
    const Ze = u,
        Ne = "flex flex-col gap-4";
    let U;
    e[29] !== ue ? (U = ue ? t.jsxs("div", {
        className: "flex flex-col gap-1",
        children: [t.jsx("p", {
            className: "text-sm font-medium",
            children: t.jsx(m, { ...l.panelTitle
            })
        }), t.jsx("p", {
            className: "text-token-text-tertiary text-xs",
            children: t.jsx(m, { ...l.panelDescription
            })
        })]
    }) : null, e[29] = ue, e[30] = U) : U = e[30];
    const O = ue ? t.jsxs("div", {
            className: I("border-token-border-light bg-token-bg-primary rounded-2xl border p-4 shadow-sm", "flex flex-col gap-4"),
            children: [t.jsx("p", {
                className: "text-xs font-semibold",
                children: t.jsx(m, { ...l.oauthClientSetupTitle
                })
            }), t.jsxs("div", {
                className: "flex flex-col gap-3",
                children: [De(), ce !== "DCR" ? t.jsxs("div", {
                    className: "flex flex-col gap-1",
                    children: [t.jsxs("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [t.jsx("span", {
                            className: "text-token-text-primary text-xs font-semibold",
                            children: t.jsx(m, { ...l.callbackUrlTitle
                            })
                        }), t.jsx("span", {
                            className: "text-token-text-tertiary text-xs",
                            children: t.jsx(m, { ...$ ? l.callbackUrlCopied : L ? l.callbackUrlCopyHint : l.callbackUrlCopyUnavailable
                            })
                        })]
                    }), t.jsxs("button", {
                        type: "button",
                        onClick: () => {
                            ze()
                        },
                        disabled: !L,
                        className: I("border-token-border-light bg-token-main-surface-primary flex w-full items-center justify-between gap-3 rounded-md border px-3 py-2 text-start text-xs shadow-sm transition-colors", L ? "hover:bg-token-main-surface-secondary" : "cursor-default opacity-70"),
                        "aria-label": d.formatMessage(l.copyCallbackUrlAriaLabel),
                        title: L ? d.formatMessage(l.callbackUrlCopyHint) : void 0,
                        children: [t.jsx("span", {
                            className: "text-token-text-secondary font-mono break-all",
                            children: T
                        }), t.jsx("span", {
                            className: "border-token-border-light bg-token-bg-secondary text-token-text-secondary flex h-8 w-8 shrink-0 items-center justify-center rounded-md border",
                            children: $ ? t.jsx(pa, {
                                className: "icon-sm"
                            }) : t.jsx(ja, {
                                className: "icon-sm"
                            })
                        })]
                    })]
                }) : null, Ce ? t.jsxs(t.Fragment, {
                    children: [t.jsx(It, {
                        form: o,
                        showErrors: c,
                        setShowErrors: i,
                        clientIdAriaLabel: g,
                        clientIdPlaceholder: He,
                        clientSecretAriaLabel: s,
                        clientSecretPlaceholder: x
                    }), ot({
                        name: "oauthTokenEndpointAuthMethod",
                        label: d.formatMessage(l.tokenEndpointAuthMethodTitle),
                        options: Ue,
                        resolvedValue: ge,
                        placeholder: d.formatMessage(l.tokenEndpointAuthMethodPlaceholder),
                        disabled: Ue.length === 0,
                        description: Ue.length === 0 ? d.formatMessage(l.tokenEndpointAuthMethodUnavailableDescription) : void 0
                    })]
                }) : null]
            })]
        }) : t.jsx(It, {
            form: o,
            showErrors: c,
            setShowErrors: i,
            clientIdAriaLabel: g,
            clientIdPlaceholder: f,
            clientSecretAriaLabel: s,
            clientSecretPlaceholder: x
        }),
        ve = ue ? t.jsxs(t.Fragment, {
            children: [t.jsxs("div", {
                className: I("border-token-border-light bg-token-bg-primary rounded-2xl border p-4 shadow-sm", "flex flex-col gap-3"),
                children: [t.jsx("p", {
                    className: "text-xs font-semibold",
                    children: t.jsx(m, { ...l.scopeTitle
                    })
                }), t.jsx("p", {
                    className: "text-token-text-tertiary text-xs",
                    children: t.jsx(m, { ...l.scopeSectionDescription,
                        values: {
                            link: Pa
                        }
                    })
                }), Ze({
                    name: "oauthRequestedScopes",
                    label: d.formatMessage(l.requestedScopesFieldTitle),
                    description: d.formatMessage(l.requestedScopesDescription),
                    emptyDescription: d.formatMessage(l.requestedScopesUnavailableDescription),
                    options: Xe,
                    manualEntry: de
                }), _e({
                    name: "oauthBaseScopes",
                    label: d.formatMessage(l.baseScopesTitle),
                    description: d.formatMessage(l.baseScopesDescription)
                })]
            }), t.jsxs("div", {
                className: I("border-token-border-light bg-token-bg-primary rounded-2xl border p-4 shadow-sm", "flex flex-col gap-3"),
                children: [t.jsxs("div", {
                    className: "flex flex-col gap-1",
                    children: [t.jsx("p", {
                        className: "text-xs font-semibold",
                        children: t.jsx(m, { ...l.oauthEndpointsTitle
                        })
                    }), t.jsx("p", {
                        className: "text-token-text-tertiary text-xs",
                        children: t.jsx(m, { ...l.oauthEndpointsDescription,
                            values: {
                                link: wa
                            }
                        })
                    })]
                }), Z({
                    name: "oauthAuthorizationUrl",
                    label: d.formatMessage(l.authorizationUrlTitle),
                    placeholder: d.formatMessage(l.oauthUrlPlaceholder),
                    type: "url"
                }), Z({
                    name: "oauthTokenUrl",
                    label: d.formatMessage(l.tokenUrlTitle),
                    placeholder: d.formatMessage(l.oauthUrlPlaceholder),
                    type: "url"
                }), Z({
                    name: "oauthRegistrationUrl",
                    label: d.formatMessage(l.registrationUrlTitle),
                    placeholder: d.formatMessage(l.oauthUrlPlaceholder),
                    type: "url"
                }), Z({
                    name: "oauthAuthorizationServerBase",
                    label: d.formatMessage(l.authorizationServerBaseTitle),
                    placeholder: d.formatMessage(l.oauthUrlPlaceholder),
                    type: "url"
                }), Z({
                    name: "oauthResource",
                    label: d.formatMessage(l.resourceTitle),
                    placeholder: d.formatMessage(l.resourcePlaceholder)
                })]
            }), t.jsxs("div", {
                className: I("border-token-border-light bg-token-bg-primary rounded-2xl border p-4 shadow-sm", "flex flex-col gap-3"),
                children: [t.jsxs("div", {
                    className: "flex flex-col gap-1",
                    children: [t.jsx("p", {
                        className: "text-xs font-semibold",
                        children: t.jsx(m, { ...l.oidcTitle
                        })
                    }), t.jsx("p", {
                        className: "text-token-text-tertiary text-xs",
                        children: t.jsx(m, { ...l.oidcSectionDescription
                        })
                    })]
                }), st({
                    name: "oauthOidcEnabled",
                    label: d.formatMessage(l.oidcEnabledTitle),
                    description: d.formatMessage(X ? l.oidcEnabledDescription : l.oidcUnavailableDescription),
                    disabled: !X
                }), Z({
                    name: "oauthOidcConfigurationUrl",
                    label: d.formatMessage(l.oidcConfigurationUrlTitle),
                    placeholder: d.formatMessage(l.oauthUrlPlaceholder),
                    type: "url"
                }), Z({
                    name: "oauthOidcUserinfoEndpoint",
                    label: d.formatMessage(l.oidcUserinfoEndpointTitle),
                    placeholder: d.formatMessage(l.oauthUrlPlaceholder),
                    type: "url"
                }), _e({
                    name: "oauthOidcScopesSupported",
                    label: d.formatMessage(l.oidcScopesTitle)
                })]
            })]
        }) : null;
    let Y;
    return e[31] !== U || e[32] !== O || e[33] !== ve ? (Y = t.jsxs("div", {
        className: Ne,
        children: [U, O, ve]
    }), e[31] = U, e[32] = O, e[33] = ve, e[34] = Y) : Y = e[34], Y
}

function wa(a) {
    return t.jsx(fe, {
        href: "https://developers.openai.com/apps-sdk/build/auth/",
        target: "_blank",
        rel: "noreferrer",
        children: a
    })
}

function Pa(a) {
    return t.jsx(fe, {
        href: "https://developers.openai.com/apps-sdk/reference/#tool-descriptor-parameters",
        target: "_blank",
        rel: "noreferrer",
        children: a
    })
}

function Fa(a) {
    return t.jsx(fe, {
        href: "https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization#client-registration-approaches",
        target: "_blank",
        rel: "noreferrer",
        children: a
    })
}

function La(a) {
    return t.jsx("option", {
        value: a.value,
        disabled: a.disabled,
        children: a.value
    }, a.value)
}

function qa(a) {
    return a.value
}

function Ba(a) {
    return !a.disabled
}

function Ha(a) {
    return a.value
}

function za(a) {
    return Array.from(new Set(a.split(/\r?\n|,/).map(Va).filter(Boolean)))
}

function Va(a) {
    return a.trim()
}

function It({
    form: a,
    showErrors: e,
    setShowErrors: o,
    clientIdAriaLabel: c,
    clientIdPlaceholder: i,
    clientSecretAriaLabel: g,
    clientSecretPlaceholder: f
}) {
    return t.jsxs("div", {
        className: "flex flex-col gap-3",
        children: [t.jsx(a.Field, {
            name: "oauthClientId",
            children: s => t.jsx(Le, {
                name: "custom-connector-client-id",
                value: s.state.value,
                onChange: x => {
                    s.handleChange(x.target.value), e && o(!1)
                },
                ariaLabel: c,
                placeholder: i,
                error: e ? s.state.meta.errors[0] : void 0,
                autoComplete: "off",
                className: "border-token-border-light bg-token-main-surface-primary shadow-sm",
                inputClassName: "bg-transparent!"
            })
        }), t.jsx(a.Field, {
            name: "oauthClientSecret",
            children: s => t.jsx(Le, {
                name: "custom-connector-client-secret",
                type: "password",
                value: s.state.value,
                onChange: x => {
                    s.handleChange(x.target.value), e && o(!1)
                },
                ariaLabel: g,
                placeholder: f,
                error: e ? s.state.meta.errors[0] : void 0,
                autoComplete: "off",
                className: "border-token-border-light bg-token-main-surface-primary shadow-sm",
                inputClassName: "bg-transparent!"
            })
        })]
    })
}
const l = $e({
        panelTitle: {
            id: "advancedAuthenticationSettings.panelTitle",
            defaultMessage: "OAuth advanced settings"
        },
        panelDescription: {
            id: "advancedAuthenticationSettings.panelDescription",
            defaultMessage: "Review the discovered OAuth settings, choose how ChatGPT should obtain an OAuth client, and configure default scopes before you create the connector."
        },
        callbackUrlTitle: {
            id: "advancedAuthenticationSettings.callbackUrlTitle",
            defaultMessage: "Callback URL"
        },
        copyCallbackUrlAriaLabel: {
            id: "advancedAuthenticationSettings.copyCallbackUrlAriaLabel",
            defaultMessage: "Copy callback URL"
        },
        callbackUrlCopyHint: {
            id: "advancedAuthenticationSettings.callbackUrlCopyHint",
            defaultMessage: "Click to copy"
        },
        callbackUrlCopied: {
            id: "advancedAuthenticationSettings.callbackUrlCopied",
            defaultMessage: "Callback URL copied"
        },
        callbackUrlCopyUnavailable: {
            id: "advancedAuthenticationSettings.callbackUrlCopyUnavailable",
            defaultMessage: "Copy unavailable"
        },
        oauthClientSetupTitle: {
            id: "advancedAuthenticationSettings.oauthClientSetupTitle",
            defaultMessage: "Client registration"
        },
        oauthClientIdRequiredPlaceholder: {
            id: "advancedAuthenticationSettings.oauthClientIdRequiredPlaceholder",
            defaultMessage: "OAuth Client ID"
        },
        oauthClientModeTitle: {
            id: "advancedAuthenticationSettings.oauthClientModeTitle",
            defaultMessage: "Registration method"
        },
        oauthClientModeDescription: {
            id: "advancedAuthenticationSettings.oauthClientModeDescription",
            defaultMessage: "Choose whether ChatGPT should use your client credentials, Dynamic Client Registration (DCR), or Client Identifier Metadata Document (CIMD). See the <link>MCP client registration approaches</link>."
        },
        oauthClientModeUserDefinedOption: {
            id: "advancedAuthenticationSettings.oauthClientModeUserDefinedOption",
            defaultMessage: "User-Defined OAuth Client"
        },
        oauthClientModeDcrOption: {
            id: "advancedAuthenticationSettings.oauthClientModeDcrOption",
            defaultMessage: "Dynamic Client Registration (DCR)"
        },
        oauthClientModeDcrUnavailableOption: {
            id: "advancedAuthenticationSettings.oauthClientModeDcrUnavailableOption",
            defaultMessage: "Dynamic Client Registration (DCR) (Unavailable)"
        },
        oauthClientModeCimdOption: {
            id: "advancedAuthenticationSettings.oauthClientModeCimdOption",
            defaultMessage: "Client Identifier Metadata Document (CIMD)"
        },
        oauthClientModeCimdUnavailableOption: {
            id: "advancedAuthenticationSettings.oauthClientModeCimdUnavailableOption",
            defaultMessage: "Client Identifier Metadata Document (CIMD) (Unavailable)"
        },
        oauthClientModeUserDefinedDescription: {
            id: "advancedAuthenticationSettings.oauthClientModeUserDefinedDescription",
            defaultMessage: "Use your own OAuth client ID and optional client secret for this connector."
        },
        oauthClientModePreconfiguredDescription: {
            id: "advancedAuthenticationSettings.oauthClientModePreconfiguredDescription",
            defaultMessage: "OpenAI already has a preconfigured OAuth client for this MCP server. Leave the client ID empty to use it, or enter your own client credentials to override it."
        },
        oauthClientModeDcrDescription: {
            id: "advancedAuthenticationSettings.oauthClientModeDcrDescription",
            defaultMessage: "ChatGPT will dynamically register an OAuth client using the Registration URL in the OAuth endpoints section."
        },
        oauthClientModeCimdDescription: {
            id: "advancedAuthenticationSettings.oauthClientModeCimdDescription",
            defaultMessage: "ChatGPT will use a Client Identifier Metadata Document instead of manually entered client credentials."
        },
        oauthClientModeDcrUnavailableDescription: {
            id: "advancedAuthenticationSettings.oauthClientModeDcrUnavailableDescription",
            defaultMessage: "DCR is unavailable until a Registration URL is present in the OAuth endpoints section below."
        },
        oauthClientModeCimdUnavailableDescription: {
            id: "advancedAuthenticationSettings.oauthClientModeCimdUnavailableDescription",
            defaultMessage: "CIMD is unavailable because the server did not advertise CIMD support."
        },
        scopeTitle: {
            id: "advancedAuthenticationSettings.scopeTitle",
            defaultMessage: "Scopes"
        },
        scopeSectionDescription: {
            id: "advancedAuthenticationSettings.scopeSectionDescription",
            defaultMessage: "Base scopes are always requested. Today, if every selected action defines OAuth scope tags, ChatGPT requests those action scopes plus base scopes. Otherwise it requests the default scopes plus base scopes. See the <link>Apps SDK tool descriptor docs</link>."
        },
        requestedScopesFieldTitle: {
            id: "advancedAuthenticationSettings.requestedScopesFieldTitle",
            defaultMessage: "Default scopes"
        },
        requestedScopesDescription: {
            id: "advancedAuthenticationSettings.requestedScopesDescription",
            defaultMessage: "Choose the default scopes ChatGPT requests when action-level OAuth scope tags are not defined for every selected action."
        },
        requestedScopesUnavailableDescription: {
            id: "advancedAuthenticationSettings.requestedScopesUnavailableDescription",
            defaultMessage: "The discovered OAuth config did not advertise supported scopes to choose from."
        },
        oauthEndpointsTitle: {
            id: "advancedAuthenticationSettings.oauthEndpointsTitle",
            defaultMessage: "OAuth endpoints"
        },
        oauthEndpointsDescription: {
            id: "advancedAuthenticationSettings.oauthEndpointsDescription",
            defaultMessage: "These endpoints are discovered from the MCP server. If Registration URL is missing, Dynamic Client Registration will fail. See the <link>Apps SDK auth docs</link>."
        },
        oidcTitle: {
            id: "advancedAuthenticationSettings.oidcTitle",
            defaultMessage: "OpenID support"
        },
        oidcSectionDescription: {
            id: "advancedAuthenticationSettings.oidcSectionDescription",
            defaultMessage: "OpenID Connect (OIDC) lets ChatGPT fetch the authenticated user's email for authorization domain claiming."
        },
        oidcEnabledTitle: {
            id: "advancedAuthenticationSettings.oidcEnabledTitle",
            defaultMessage: "OIDC enabled"
        },
        oidcEnabledDescription: {
            id: "advancedAuthenticationSettings.oidcEnabledDescription",
            defaultMessage: "If enabled, ChatGPT will try to request the OpenID scopes listed below."
        },
        oidcUnavailableDescription: {
            id: "advancedAuthenticationSettings.oidcUnavailableDescription",
            defaultMessage: "This server did not advertise an OIDC configuration URL, so OpenID support is unavailable."
        },
        baseScopesTitle: {
            id: "advancedAuthenticationSettings.baseScopesTitle",
            defaultMessage: "Base scopes"
        },
        baseScopesDescription: {
            id: "advancedAuthenticationSettings.baseScopesDescription",
            defaultMessage: "Scopes to request with every auth request, no matter which actions are chosen."
        },
        authorizationUrlTitle: {
            id: "advancedAuthenticationSettings.authorizationUrlTitle",
            defaultMessage: "Auth URL"
        },
        tokenUrlTitle: {
            id: "advancedAuthenticationSettings.tokenUrlTitle",
            defaultMessage: "Token URL"
        },
        oidcScopesTitle: {
            id: "advancedAuthenticationSettings.oidcScopesTitle",
            defaultMessage: "OIDC scopes supported"
        },
        oidcConfigurationUrlTitle: {
            id: "advancedAuthenticationSettings.oidcConfigurationUrlTitle",
            defaultMessage: "OIDC configuration URL"
        },
        oidcUserinfoEndpointTitle: {
            id: "advancedAuthenticationSettings.oidcUserinfoEndpointTitle",
            defaultMessage: "OIDC userinfo endpoint"
        },
        tokenEndpointAuthMethodTitle: {
            id: "advancedAuthenticationSettings.tokenEndpointAuthMethodsSupportedTitle",
            defaultMessage: "Token endpoint auth method"
        },
        tokenEndpointAuthMethodUnavailableDescription: {
            id: "advancedAuthenticationSettings.tokenEndpointAuthMethodUnavailableDescription",
            defaultMessage: "The server did not advertise any supported token endpoint auth methods."
        },
        tokenEndpointAuthMethodPlaceholder: {
            id: "advancedAuthenticationSettings.tokenEndpointAuthMethodPlaceholder",
            defaultMessage: "Select a token auth method"
        },
        registrationUrlTitle: {
            id: "advancedAuthenticationSettings.registrationUrlTitle",
            defaultMessage: "Registration URL"
        },
        authorizationServerBaseTitle: {
            id: "advancedAuthenticationSettings.authorizationServerBaseTitle",
            defaultMessage: "Authorization server base"
        },
        resourceTitle: {
            id: "advancedAuthenticationSettings.resourceTitle",
            defaultMessage: "Resource"
        },
        oauthUrlPlaceholder: {
            id: "advancedAuthenticationSettings.oauthUrlPlaceholder",
            defaultMessage: "https://example.com"
        },
        resourcePlaceholder: {
            id: "advancedAuthenticationSettings.resourcePlaceholder",
            defaultMessage: "urn:example:resource"
        },
        listPlaceholder: {
            id: "advancedAuthenticationSettings.listPlaceholder",
            defaultMessage: "One value per line or comma-separated"
        }
    }),
    Ka = a => ({
        name: a ? .name ? ? "",
        templateExampleUrl: a ? .example_url ? ? null,
        description: a ? .description ? ? "",
        logoUrl: a ? .logo_url ? ? null,
        supportedAuthTypes: a ? .supported_auth_types ? ? []
    }),
    $a = a => {
        const e = a ? .branding ? .website;
        return a ? .template_id === "templated_apps_Databricks" && e ? { ...ht.databricksTemplateExplanation,
            values: {
                link: o => t.jsx(fe, {
                    href: e,
                    openNewTab: !0,
                    className: "inline",
                    children: o
                })
            }
        } : a ? .template_id === "templated_apps_Snowflake" && e ? { ...ht.snowflakeTemplateExplanation,
            values: {
                link: o => t.jsx(fe, {
                    href: e,
                    openNewTab: !0,
                    className: "inline",
                    children: o
                })
            }
        } : null
    },
    ht = $e({
        createTemplateAppModalTitle: {
            id: "createCustomConnectorModal.createTemplateConnectorModalTitle",
            defaultMessage: "New {templateName} App {betaBadge}"
        },
        databricksTemplateExplanation: {
            id: "createCustomConnectorModal.databricksTemplateExplanation",
            defaultMessage: "Databricks is a platform for data engineering and machine learning. Their MCP server is subdomain specific, so to connect to your own Databricks instance, you need to provide the MCP URL. <link>Learn more</link>"
        },
        snowflakeTemplateExplanation: {
            id: "createCustomConnectorModal.snowflakeTemplateExplanation",
            defaultMessage: "Snowflake is a platform for data warehousing and analytics. Their MCP server is subdomain specific, so to connect to your own Snowflake instance, you need to provide the MCP URL. Snowflake could also require you to update the requested scopes in the URL in some cases. <link>Learn more</link>"
        }
    }),
    Ga = {
        "image/png": [".png"]
    },
    bn = ".png,image/png";

function Mn(a) {
    const e = a.type.toLowerCase(),
        o = a.name.toLowerCase();
    return e === "image/png" || o.endsWith(".png")
}
const Wt = /^tunnel_[a-z0-9]{32}$/,
    tt = a => a.trim(),
    Ya = a => `https://tunnel-service.gateway.unified-0.internal.api.openai.org/v1/mcp/${a}`,
    Wa = a => {
        const e = Kt("2044293242");
        return !!(e.get("enabled", !1) && a && e.get("workspace_ids", []).includes(a))
    },
    Xa = () => {
        "use forget";
        const a = Ge.c(7),
            e = Ye();
        let o;
        a[0] === Symbol.for("react.memo_cache_sentinel") ? (o = t.jsx(m, { ...ae.tunnelToggle
        }), a[0] = o) : o = a[0];
        let c;
        a[1] === Symbol.for("react.memo_cache_sentinel") ? (c = t.jsx("span", {
            className: "text-token-bg-primary font-normal",
            children: t.jsx(m, { ...ae.tunnelTooltip
            })
        }), a[1] = c) : c = a[1];
        let i;
        a[2] !== e ? (i = e.formatMessage(ae.tunnelTooltipAriaLabel), a[2] = e, a[3] = i) : i = a[3];
        let g;
        a[4] === Symbol.for("react.memo_cache_sentinel") ? (g = t.jsx(ma, {
            className: "icon-xs text-token-text-tertiary"
        }), a[4] = g) : g = a[4];
        let f;
        return a[5] !== i ? (f = t.jsxs("span", {
            className: "inline-flex items-center gap-1",
            children: [o, t.jsx(fa, {
                label: c,
                side: "top",
                customBackgroundColorClassName: "bg-token-main-surface-primary-inverse",
                triggerAs: null,
                children: t.jsx("span", {
                    "aria-label": i,
                    className: "inline-flex items-center",
                    children: g
                })
            })]
        }), a[5] = i, a[6] = f) : f = a[6], f
    },
    Za = a => {
        "use forget";
        const e = Ge.c(21),
            {
                connectionType: o,
                onChange: c
            } = a,
            i = Ye();
        let g;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (g = t.jsx("p", {
            className: "text-sm font-medium",
            children: t.jsx(m, { ...ae.connectionTitle
            })
        }), e[0] = g) : g = e[0];
        let f;
        e[1] !== i ? (f = i.formatMessage(ae.connectionTitle), e[1] = i, e[2] = f) : f = e[2];
        let s;
        e[3] !== i ? (s = i.formatMessage(ae.serverUrlToggle), e[3] = i, e[4] = s) : s = e[4];
        let x;
        e[5] !== i ? (x = i.formatMessage(ae.serverUrlToggle), e[5] = i, e[6] = x) : x = e[6];
        let b;
        e[7] !== s || e[8] !== x ? (b = {
            value: "url",
            label: s,
            ariaLabel: x
        }, e[7] = s, e[8] = x, e[9] = b) : b = e[9];
        let T;
        e[10] === Symbol.for("react.memo_cache_sentinel") ? (T = t.jsx(Xa, {}), e[10] = T) : T = e[10];
        let y;
        e[11] !== i ? (y = i.formatMessage(ae.tunnelToggle), e[11] = i, e[12] = y) : y = e[12];
        let k;
        e[13] !== y ? (k = {
            value: "tunnel",
            label: T,
            ariaLabel: y
        }, e[13] = y, e[14] = k) : k = e[14];
        let D;
        return e[15] !== o || e[16] !== c || e[17] !== f || e[18] !== b || e[19] !== k ? (D = t.jsxs("div", {
            className: "mb-2 flex items-center justify-between gap-3",
            children: [g, t.jsx(Ra, {
                ariaLabel: f,
                isCompact: !0,
                value: o,
                onChange: c,
                leftItem: b,
                rightItem: k
            })]
        }), e[15] = o, e[16] = c, e[17] = f, e[18] = b, e[19] = k, e[20] = D) : D = e[20], D
    },
    ae = $e({
        connectionTitle: {
            id: "createCustomConnectorModal.connectionTitle",
            defaultMessage: "Connection"
        },
        serverUrlToggle: {
            id: "createCustomConnectorModal.serverUrlToggle",
            defaultMessage: "Server URL"
        },
        tunnelTitle: {
            id: "createCustomConnectorModal.tunnelTitle",
            defaultMessage: "Tunnel ID"
        },
        tunnelToggle: {
            id: "createCustomConnectorModal.tunnelToggle",
            defaultMessage: "Tunnel"
        },
        tunnelTooltip: {
            id: "createCustomConnectorModal.tunnelTooltip",
            defaultMessage: "Secure Tunnel connects your internal MCP server to OpenAI via a customer-hosted tunnel client over outbound-only HTTPS, so no inbound firewall changes are needed."
        },
        tunnelTooltipAriaLabel: {
            id: "createCustomConnectorModal.tunnelTooltipAriaLabel",
            defaultMessage: "Learn about Secure Tunnel"
        },
        tunnelPlaceholder: {
            id: "createCustomConnectorModal.tunnelPlaceholder",
            defaultMessage: "your-tunnel-id"
        }
    }),
    Te = "none",
    me = "client_secret_post",
    Se = "client_secret_basic",
    Rt = [Te, me, Se],
    wt = a => {
        switch (a) {
            case "OAUTH":
                return "OAUTH";
            case "API_KEY":
                return "API_KEY";
            case "NONE":
                return "NONE";
            case "MIXED":
                return
        }
    },
    ke = a => a === "OAUTH" || a === "MIXED",
    ft = (a, e) => a === "tunnel" && e ? "tunnel" : "url",
    Pt = 1024 * 10,
    Ft = () => {
        "use forget";
        const a = Ge.c(1);
        let e;
        return a[0] === Symbol.for("react.memo_cache_sentinel") ? (e = t.jsx("span", {
            className: "font-normal text-token-text-tertiary",
            children: t.jsx(m, { ...r.optionalText
            })
        }), a[0] = e) : e = a[0], e
    },
    Ja = a => {
        "use forget";
        const e = Ge.c(15),
            {
                previewUrl: o,
                isDragActive: c
            } = a,
            i = Ye(),
            g = Oa();
        if (!o || c) {
            const y = c ? "border-green-600 bg-green-600/30 text-green-600" : "border-token-border-heavy text-token-text-tertiary";
            let k;
            e[0] !== y ? (k = I("rounded-xl border border-dashed p-4", y), e[0] = y, e[1] = k) : k = e[1];
            let D;
            e[2] === Symbol.for("react.memo_cache_sentinel") ? (D = t.jsx(_a, {
                className: "h-6 w-6"
            }), e[2] = D) : D = e[2];
            let B;
            return e[3] !== k ? (B = t.jsx("span", {
                className: k,
                children: D
            }), e[3] = k, e[4] = B) : B = e[4], B
        }
        const f = g && "bg-white";
        let s;
        e[5] !== f ? (s = I("bg-token-bg-tertiary overflow-hidden rounded-xl border", f), e[5] = f, e[6] = s) : s = e[6];
        let x;
        e[7] !== i ? (x = i.formatMessage(r.iconPreviewAlt), e[7] = i, e[8] = x) : x = e[8];
        let b;
        e[9] !== o || e[10] !== x ? (b = t.jsx("img", {
            src: o,
            alt: x,
            className: "h-14 w-14 object-cover"
        }), e[9] = o, e[10] = x, e[11] = b) : b = e[11];
        let T;
        return e[12] !== s || e[13] !== b ? (T = t.jsx("span", {
            className: s,
            children: b
        }), e[12] = s, e[13] = b, e[14] = T) : T = e[14], T
    },
    Qa = a => new Promise((e, o) => {
        const c = new FileReader;
        c.onloadend = () => e(c.result), c.onerror = () => o(), c.readAsDataURL(a)
    }),
    Lt = a => (a ? ? []).join(`
`),
    at = a => {
        const e = new Set,
            o = [];
        for (const c of a.split(/\r?\n|,/)) {
            const i = c.trim();
            !i || e.has(i) || (e.add(i), o.push(i))
        }
        return o
    },
    _ = a => {
        const e = a.trim();
        return e.length > 0 ? e : null
    },
    en = /^(?<scheme>[a-zA-Z][a-zA-Z\d+.-]*:)?\/\/(?<netloc>[^/?#]+)/,
    qe = a => {
        const e = new Set,
            o = [];
        for (const c of a) {
            const i = c ? .trim();
            !i || e.has(i) || (e.add(i), o.push(i))
        }
        return o
    },
    ct = a => qe(a ? .token_endpoint_auth_methods_supported ? ? []).sort((e, o) => e === Te ? -1 : o === Te ? 1 : e.localeCompare(o)),
    Xt = (a, e) => {
        const o = qe(a);
        if (!e) return o.map(f => ({
            value: f
        }));
        const c = o.filter(f => f === me || f === Se),
            i = c.length > 0 ? c : [me, Se],
            g = [];
        o.includes(Te) && g.push({
            value: Te,
            disabled: !0
        });
        for (const f of i) g.some(s => s.value === f) || g.push({
            value: f
        });
        return g
    },
    pt = (a, {
        hasClientSecret: e = !1
    } = {}) => e ? a.includes(me) ? me : a.includes(Se) ? Se : me : a.includes(Te) ? Te : a.includes(me) ? me : a.includes(Se) ? Se : a[0] ? ? "",
    mt = ({
        hasRegistrationUrl: a,
        isCimdSupported: e
    }) => e ? "CIMD" : a ? "DCR" : "USER_DEFINED",
    qt = ({
        selectedMode: a,
        hasRegistrationUrl: e,
        isCimdSupported: o
    }) => a === "USER_DEFINED" ? "USER_DEFINED" : a === "DCR" && e ? "DCR" : a === "CIMD" && o ? "CIMD" : mt({
        hasRegistrationUrl: e,
        isCimdSupported: o
    }),
    Bt = (a, e, {
        hasClientSecret: o = !1
    } = {}) => {
        const c = Xt(a, o).filter(i => !i.disabled).map(i => i.value);
        return c.includes(e) ? e : pt(c, {
            hasClientSecret: o
        })
    },
    nt = a => qe(a ? .scopes_supported ? ? []),
    Zt = (a, e) => {
        const o = new Set(e);
        return qe(a.filter(c => o.has(c)))
    },
    tn = a => Zt(nt(a), nt(a)),
    Ht = (a, e) => ft(a.connectionType, e) === "tunnel" ? Ya(tt(a.tunnelId)) : a.url.trim(),
    an = (a, e) => {
        if (ft(a.connectionType, e) === "tunnel") {
            const c = tt(a.tunnelId);
            return !!(c && Wt.test(c))
        }
        return /^https?:\/\//.test(a.url.trim())
    },
    nn = (a, e) => ({ ...a,
        authorization_url: _(e.oauthAuthorizationUrl) ? ? a.authorization_url,
        token_url: _(e.oauthTokenUrl) ? ? a.token_url,
        registration_url: _(e.oauthRegistrationUrl),
        authorization_server_base: _(e.oauthAuthorizationServerBase),
        resource: _(e.oauthResource),
        base_scopes: at(e.oauthBaseScopes),
        scopes_supported: a.scopes_supported,
        oidc_configuration_url: _(e.oauthOidcConfigurationUrl),
        oidc_scopes_supported: at(e.oauthOidcScopesSupported),
        oidc_userinfo_endpoint: _(e.oauthOidcUserinfoEndpoint),
        client_id_metadata_document_supported: a.client_id_metadata_document_supported,
        pkce_required: a.pkce_required,
        allow_http_redirect: a.allow_http_redirect,
        supports_domain_restriction: !1
    }),
    on = a => {
        const e = _(a.oauthAuthorizationUrl),
            o = _(a.oauthTokenUrl);
        if (!e || !o) return null;
        const c = qe([a.oauthTokenEndpointAuthMethod]);
        return {
            type: "OAUTH",
            authorization_url: e,
            token_url: o,
            registration_url: _(a.oauthRegistrationUrl),
            authorization_server_base: _(a.oauthAuthorizationServerBase),
            resource: _(a.oauthResource),
            base_scopes: at(a.oauthBaseScopes),
            oidc_configuration_url: _(a.oauthOidcConfigurationUrl),
            oidc_scopes_supported: at(a.oauthOidcScopesSupported),
            oidc_userinfo_endpoint: _(a.oauthOidcUserinfoEndpoint),
            token_endpoint_auth_methods_supported: c.length > 0 ? c : void 0,
            supports_domain_restriction: !1
        }
    },
    sn = async a => {
        const e = a ? .trim();
        return (await Gt.safeGet("/aip/connectors/oauth/callback_id", e ? {
            parameters: {
                query: {
                    mcp_url: e
                }
            }
        } : {})).callback_id ? ? null
    },
    rn = ({
        isEnabled: a,
        mcpUrl: e
    }) => {
        "use no forget";
        const [o, c] = h.useState(null), [i, g] = h.useState(null), [f, s] = h.useState(a), x = h.useRef(0), b = h.useRef(!0);
        h.useEffect(() => (b.current = !0, () => {
            b.current = !1
        }), []);
        const T = h.useCallback(async () => {
            if (!a) return;
            const y = x.current + 1;
            x.current = y;
            const k = e ? .trim() || null;
            s(!0), c(null), g(null);
            try {
                const D = await sn(e);
                b.current && x.current === y && (c(D), g(k))
            } catch {
                b.current && x.current === y && (c(null), g(null))
            } finally {
                b.current && x.current === y && s(!1)
            }
        }, [a, e]);
        return h.useEffect(() => {
            if (!a) {
                x.current += 1, c(null), g(null), s(!1);
                return
            }
            T()
        }, [a, T]), {
            callbackId: o,
            callbackIdMcpUrl: i,
            isCallbackIdLoading: f
        }
    },
    vn = ({
        onClose: a,
        onRequestConnect: e,
        redirectAfter: o,
        template: c
    }) => {
        "use no forget";
        const i = ga(),
            g = lt("4262905012"),
            f = lt("3463396747"),
            s = Ye(),
            b = Vt() ? .getWorkspaceId(),
            {
                name: T,
                description: y,
                logoUrl: k,
                templateExampleUrl: D,
                supportedAuthTypes: B
            } = Ka(c),
            [H, W] = h.useState(!1),
            re = B.length > 0,
            ye = B.some(n => n.type === "OAUTH" && n.supports_dcr),
            Ae = (re ? B[0].type : void 0) ? ? "OAUTH",
            [M, We] = h.useState(Ae),
            [L, Ue] = h.useState("BEARER"),
            [ge, Xe] = h.useState(""),
            {
                mutateAsync: le,
                isPending: xe
            } = xa($t.CONNECTOR_SETTING, {
                autoConnect: M !== "API_KEY" && !g
            }),
            [Be, ce] = h.useState(!1),
            [X, de] = h.useState(!1),
            [d, ne] = h.useState(null),
            [R, oe] = h.useState(null),
            [z, ue] = h.useState(null),
            [$, Oe] = h.useState(!1),
            [Ce, He] = h.useState(!1),
            [be, je] = h.useState(null),
            [he, Ee] = h.useState(k),
            [ze, Ve] = h.useState(!1),
            G = Wa(b),
            Z = h.useRef(new Map),
            Me = h.useMemo(() => ({
                name: T,
                connectionType: "url",
                url: "",
                tunnelId: "",
                description: y,
                oauthClientId: "",
                oauthClientSecret: "",
                oauthAuthorizationUrl: "",
                oauthTokenUrl: "",
                oauthBaseScopes: "",
                oauthRequestedScopes: [],
                oauthOidcConfigurationUrl: "",
                oauthOidcScopesSupported: "",
                oauthOidcUserinfoEndpoint: "",
                oauthOidcEnabled: !1,
                oauthClientMode: "",
                oauthTokenEndpointAuthMethod: "",
                oauthRegistrationUrl: "",
                oauthAuthorizationServerBase: "",
                oauthResource: ""
            }), [y, T]),
            _e = lt("3941382985"),
            w = _e && ke(M),
            ot = Ca(() => ba());
        h.useEffect(() => {
            !f && M === "API_KEY" && We(Ae)
        }, [M, Ae, f]);
        const se = h.useCallback(async n => {
                if (R === n && d) return d;
                const p = await Ma(n);
                if (!p) throw new Error(s.formatMessage(r.oauthConfigUnavailable));
                return ne(p), oe(n), p
            }, [d, R, s]),
            De = h.useCallback(async n => {
                const p = Z.current.get(n);
                if (p !== void 0) return p;
                const C = await ln(n);
                return Z.current.set(n, C), C
            }, []),
            pe = c ? .template_id,
            st = h.useMemo(() => ({
                defaultValues: Me,
                onSubmit: async ({
                    value: n
                }) => {
                    const p = Ht(n, G),
                        C = zt(p),
                        Q = be ? await Qa(be) : k,
                        Pe = [];
                    let yt = null,
                        At, Ut, Ot, jt;
                    if (M === "API_KEY") {
                        if (L === "CUSTOM_HEADER" && ge.trim().length === 0) {
                            i.danger(r.customHeaderNameRequired);
                            return
                        }
                        Pe.push(...va({
                            headerScheme: L,
                            headerName: ge.trim()
                        }))
                    } else if (ke(M)) {
                        M === "MIXED" && Pe.push({
                            type: "NONE"
                        });
                        let K = "USER_DEFINED",
                            ee = !1;
                        const ie = _e && z === p;
                        let te = R === p ? d : null;
                        if (!te && ie && (te = on(n), !te)) {
                            i.danger(r.manualOauthEndpointsRequired);
                            return
                        }
                        if (!te) try {
                            te = await se(p)
                        } catch (ha) {
                            i.danger(r.oauthConfigError, {
                                error: ha
                            });
                            return
                        }
                        K = ie ? qt({
                            selectedMode: n.oauthClientMode,
                            hasRegistrationUrl: !!_(n.oauthRegistrationUrl),
                            isCimdSupported: !!te.client_id_metadata_document_supported
                        }) : mt({
                            hasRegistrationUrl: !!te.registration_url,
                            isCimdSupported: !!te.client_id_metadata_document_supported
                        });
                        const Je = ie && R === p && d ? nn(te, n) : te;
                        ee = K === "USER_DEFINED", Pe.push(Je), At = ie ? R === p && d ? Zt(n.oauthRequestedScopes, nt(Je)) : qe(n.oauthRequestedScopes) : void 0;
                        const Qe = n.oauthClientSecret.trim(),
                            da = ct(Je),
                            Et = Bt(da, n.oauthTokenEndpointAuthMethod, {
                                hasClientSecret: K === "USER_DEFINED" && Qe.length > 0
                            });
                        jt = Et || void 0, Ut = ie ? !!Je.oidc_configuration_url && n.oauthOidcEnabled : void 0, Ot = ie ? K === "CIMD" ? !0 : K === "DCR" ? !1 : void 0 : void 0;
                        const Fe = n.oauthClientId.trim();
                        let et = !1;
                        if (Fe.length === 0 && Qe.length === 0 && C) try {
                            et = await De(C)
                        } catch {
                            et = !1
                        }
                        const ua = ie && !ee || et;
                        if (re && ke(M) && !ye && !ua && Fe.length === 0) {
                            i.danger(r.clientIdRequired);
                            return
                        }
                        if (w && ee && !et && Fe.length === 0) {
                            i.danger(r.userDefinedClientIdRequired);
                            return
                        }
                        if (Qe.length !== 0 && Fe.length === 0) {
                            i.danger(r.clientIdRequired);
                            return
                        }(!w || ee) && Fe.length !== 0 && (yt = {
                            client_id: Fe,
                            client_secret: Qe,
                            token_endpoint_auth_method: jt
                        })
                    }
                    try {
                        const K = await le({
                            name: n.name.trim(),
                            mcp_url: p,
                            description: n.description.trim(),
                            logo_url: Q,
                            supported_auth: Pe,
                            oauth_client_params: yt,
                            default_scopes: At,
                            oidc_enabled: Ut,
                            use_cimd: Ot,
                            authTypeOverride: wt(M),
                            redirectAfter: o,
                            template_id: pe ? ? void 0
                        });
                        if (!K.implementsRetrievable) {
                            Ve(!0);
                            return
                        }
                        const ee = K.connector ? .id;
                        if (g && ee) {
                            const ie = pe ? `/admin/ca#drafts?publish=${encodeURIComponent(ee)}` : o;
                            e ? (e(ee, ie, wt(M)), a()) : a(ee);
                            return
                        }
                        a(ee)
                    } catch (K) {
                        K instanceof ka && K.status === 409 ? i.danger(r.duplicateName) : i.danger(r.createConnectorError, {
                            error: K
                        })
                    }
                },
                validators: {
                    onSubmit: ({
                        value: n
                    }) => {
                        const p = {};
                        if (n.name.trim() || (p.name = s.formatMessage({
                                id: "vtyh9X",
                                defaultMessage: "Name is required"
                            })), ft(n.connectionType, G) === "tunnel") {
                            const Q = tt(n.tunnelId);
                            Q ? Wt.test(Q) || (p.tunnelId = s.formatMessage({
                                id: "a09gqN",
                                defaultMessage: "Tunnel ID must match tunnel_<32 lowercase letters or digits>"
                            })) : p.tunnelId = s.formatMessage({
                                id: "nOAfIY",
                                defaultMessage: "Tunnel ID is required"
                            })
                        } else n.url.trim() ? n.url.trim().match(/^https?:\/\//) || (p.url = s.formatMessage({
                            id: "7hn6Jq",
                            defaultMessage: "URL is invalid"
                        })) : p.url = s.formatMessage({
                            id: "7WV2q4",
                            defaultMessage: "URL is required"
                        });
                        return {
                            fields: p
                        }
                    }
                }
            }), [ge, L, M, d, R, le, Me, se, De, z, be, s, _e, g, w, G, a, e, o, re, pe, k, ye, i]),
            u = Da(st);
        h.useEffect(() => {
            M !== "API_KEY" && (Ue("BEARER"), Xe("")), ke(M) || (u.setFieldValue("oauthClientId", ""), u.setFieldValue("oauthClientSecret", ""))
        }, [M, u]);
        const Ze = h.useCallback((n, p) => {
                const C = !!n.client_id_metadata_document_supported;
                u.setFieldValue("oauthAuthorizationUrl", n.authorization_url), u.setFieldValue("oauthTokenUrl", n.token_url), u.setFieldValue("oauthBaseScopes", Lt(n.base_scopes)), u.setFieldValue("oauthRequestedScopes", tn(n)), u.setFieldValue("oauthOidcConfigurationUrl", n.oidc_configuration_url ? ? ""), u.setFieldValue("oauthOidcScopesSupported", Lt(n.oidc_scopes_supported)), u.setFieldValue("oauthOidcUserinfoEndpoint", n.oidc_userinfo_endpoint ? ? ""), u.setFieldValue("oauthTokenEndpointAuthMethod", pt(ct(n))), u.setFieldValue("oauthOidcEnabled", !!n.oidc_configuration_url), u.setFieldValue("oauthClientMode", mt({
                    hasRegistrationUrl: !!n.registration_url,
                    isCimdSupported: C
                })), u.setFieldValue("oauthRegistrationUrl", n.registration_url ? ? ""), u.setFieldValue("oauthAuthorizationServerBase", n.authorization_server_base ? ? ""), u.setFieldValue("oauthResource", n.resource ? ? ""), ue(p)
            }, [u]),
            Ne = h.useCallback((n = null) => {
                u.setFieldValue("oauthAuthorizationUrl", ""), u.setFieldValue("oauthTokenUrl", ""), u.setFieldValue("oauthBaseScopes", ""), u.setFieldValue("oauthRequestedScopes", []), u.setFieldValue("oauthOidcConfigurationUrl", ""), u.setFieldValue("oauthOidcScopesSupported", ""), u.setFieldValue("oauthOidcUserinfoEndpoint", ""), u.setFieldValue("oauthOidcEnabled", !1), u.setFieldValue("oauthClientMode", ""), u.setFieldValue("oauthTokenEndpointAuthMethod", pt(Rt)), u.setFieldValue("oauthRegistrationUrl", ""), u.setFieldValue("oauthAuthorizationServerBase", ""), u.setFieldValue("oauthResource", ""), ue(n)
            }, [u]),
            U = Na(u.store, n => ({
                connectionType: n.values.connectionType,
                url: n.values.url,
                tunnelId: n.values.tunnelId,
                oauthClientMode: n.values.oauthClientMode,
                oauthClientSecret: n.values.oauthClientSecret,
                oauthOidcConfigurationUrl: n.values.oauthOidcConfigurationUrl,
                oauthTokenEndpointAuthMethod: n.values.oauthTokenEndpointAuthMethod,
                oauthRegistrationUrl: n.values.oauthRegistrationUrl
            })),
            O = Ht(U, G),
            ve = h.useMemo(() => zt(O), [O]),
            Y = w && an(U, G),
            S = z === O ? d : null,
            v = z === O && !S,
            P = h.useMemo(() => v ? Rt : ct(S), [S, v]),
            N = h.useMemo(() => nt(S), [S]),
            j = h.useMemo(() => !!S ? .client_id_metadata_document_supported, [S]),
            E = h.useMemo(() => !!_(U.oauthRegistrationUrl), [U.oauthRegistrationUrl]),
            A = h.useMemo(() => qt({
                selectedMode: U.oauthClientMode,
                hasRegistrationUrl: E,
                isCimdSupported: j
            }), [U.oauthClientMode, j, E]),
            q = h.useMemo(() => !!_(U.oauthClientSecret), [U.oauthClientSecret]),
            V = h.useMemo(() => Xt(P, A === "USER_DEFINED" && q), [q, A, P]),
            J = h.useMemo(() => Bt(P, U.oauthTokenEndpointAuthMethod, {
                hasClientSecret: A === "USER_DEFINED" && q
            }), [U.oauthTokenEndpointAuthMethod, q, A, P]),
            Ke = h.useMemo(() => !!_(U.oauthOidcConfigurationUrl), [U.oauthOidcConfigurationUrl]),
            Ie = z === O && !S;
        h.useEffect(() => {
            let n = !1;
            if (!ke(M) || !ve) {
                He(!1);
                return
            }
            return (async () => {
                try {
                    const C = await De(ve);
                    n || He(C)
                } catch {
                    n || He(!1)
                }
            })(), () => {
                n = !0
            }
        }, [M, ve, De]), h.useEffect(() => {
            w || !X || de(!1)
        }, [w, X]), h.useEffect(() => {
            !z || z === O || (ne(null), oe(null), de(!1), Ne())
        }, [R, O, z, Ne, ne, oe]);
        const F = h.useCallback(async () => {
                if (!(!Y || $)) {
                    if (X) {
                        de(!1);
                        return
                    }
                    if (z === O) {
                        de(!0);
                        return
                    }
                    Oe(!0);
                    try {
                        const n = await se(O);
                        Ze(n, O), de(!0)
                    } catch (n) {
                        ne(null), oe(null), Ne(O), de(!0), i.danger(r.oauthConfigError, {
                            error: n
                        })
                    } finally {
                        Oe(!1)
                    }
                }
            }, [Y, O, se, Ze, z, $, Ne, X, i]),
            Re = n => {
                if (he ? .startsWith("blob:") && URL.revokeObjectURL(he), n.size > Pt) {
                    i.danger(r.iconTooLarge);
                    return
                }
                je(n);
                const p = URL.createObjectURL(n);
                Ee(p)
            },
            {
                getRootProps: it,
                getInputProps: Jt,
                isDragActive: Qt
            } = Ia({
                accept: Ga,
                multiple: !1,
                noKeyboard: !0,
                noClick: !0,
                maxSize: Pt,
                onDropAccepted: n => {
                    n.length > 0 && Re(n[0])
                },
                onDropRejected: n => {
                    const p = n.some(C => C.errors.some(Q => Q.code === "file-too-large"));
                    i.danger(p ? r.iconTooLarge : r.iconInvalid)
                }
            }),
            ea = n => {
                n.preventDefault(), Be && (W(!0), u.handleSubmit())
            },
            gt = Kt("2281575548"),
            xt = gt.get("docs_url", "https://developers.openai.com/apps-sdk/"),
            ta = gt.get("safety_url", "https://platform.openai.com/docs/mcp#risks-and-safety"),
            Ct = n => {
                if (ze) return t.jsx("span", {
                    children: t.jsx(m, { ...ot ? r.developerModeConformanceError : r.conformanceError,
                        values: {
                            link: p => t.jsx(fe, {
                                href: xt,
                                openNewTab: !0,
                                children: p
                            })
                        }
                    })
                });
                if (H) return n
            },
            rt = (n, p) => {
                p(n), H && W(!1), ze && Ve(!1)
            },
            aa = ({
                value: n,
                onChange: p,
                fieldError: C
            }) => t.jsxs(t.Fragment, {
                children: [t.jsx("label", {
                    htmlFor: "custom-connector-tunnel-id",
                    className: "sr-only",
                    children: t.jsx(m, { ...ae.tunnelTitle
                    })
                }), t.jsx(Le, {
                    name: "custom-connector-tunnel-id",
                    value: n,
                    onChange: Q => rt(Q.target.value, p),
                    onBlur: () => rt(tt(n), p),
                    ariaLabel: !1,
                    placeholder: s.formatMessage(ae.tunnelPlaceholder),
                    inputClassName: "bg-token-bg-primary!",
                    error: Ct(C)
                })]
            }),
            bt = ({
                value: n,
                onChange: p,
                fieldError: C,
                labelClassName: Q
            }) => t.jsxs(t.Fragment, {
                children: [t.jsx("label", {
                    htmlFor: "custom-connector-url",
                    className: Q,
                    children: t.jsx(m, { ...r.urlTitle
                    })
                }), t.jsx(Le, {
                    name: "custom-connector-url",
                    value: n,
                    onChange: Pe => rt(Pe.target.value, p),
                    ariaLabel: !1,
                    placeholder: D ? ? s.formatMessage(r.urlPlaceholder),
                    inputClassName: "bg-token-bg-primary!",
                    error: Ct(C)
                })]
            }),
            Mt = $a(c),
            vt = re && !ye && !Ce ? s.formatMessage(r.oauthClientIdRequiredPlaceholder) : s.formatMessage(r.oauthClientIdPlaceholder),
            kt = s.formatMessage(r.oauthClientSecretPlaceholder),
            na = ke(M) && !w,
            we = w && X,
            oa = we && Y,
            {
                callbackId: sa,
                callbackIdMcpUrl: ia,
                isCallbackIdLoading: ra
            } = rn({
                isEnabled: oa,
                mcpUrl: O
            }),
            St = ia === O ? sa : null,
            Tt = ke(M) && St ? Sa("", St) : null,
            la = Tt ? ? s.formatMessage(ra ? r.callbackUrlLoading : r.callbackUrlUnavailableInline),
            ca = !Be;
        return t.jsx(Ta, {
            testId: "modal-create-custom-connector",
            title: t.jsx("span", {
                className: "flex items-center gap-1",
                children: t.jsx(m, { ...c ? { ...ht.createTemplateAppModalTitle,
                        values: {
                            templateName: c.name,
                            betaBadge: t.jsx(_t, {})
                        }
                    } : { ...r.createCustomAppModalTitle,
                        values: {
                            betaBadge: t.jsx(_t, {})
                        }
                    }
                })
            }),
            type: "success",
            isOpen: !0,
            onClose: () => a(),
            showCloseButton: !0,
            size: "custom",
            className: I("max-w-[448px]", we && "w-full max-w-[920px]"),
            contentClassName: I(we && "md:overflow-y-hidden"),
            children: t.jsxs("form", {
                onSubmit: ea,
                className: I("flex flex-col gap-6", we && "md:max-h-[calc(100vh-12rem)] md:flex-row md:items-stretch"),
                children: [t.jsxs("div", {
                    className: I("flex min-w-0 flex-1 flex-col gap-4", we && "md:max-h-full md:min-h-0 md:max-w-[440px] md:shrink-0 md:overflow-y-auto md:pe-2"),
                    children: [t.jsxs("label", { ...it({
                            className: "flex cursor-pointer items-center gap-2.5"
                        }),
                        children: [t.jsx("input", { ...Jt()
                        }), t.jsx(Ja, {
                            previewUrl: he,
                            isDragActive: Qt
                        }), t.jsxs("span", {
                            className: "flex flex-col gap-1",
                            children: [t.jsx("span", {
                                className: "text-sm font-medium",
                                children: t.jsx(m, { ...r.iconTitle,
                                    values: {
                                        optionalText: t.jsx(Ft, {})
                                    }
                                })
                            }), t.jsx("span", {
                                className: "text-xs text-token-text-tertiary",
                                children: t.jsx(m, { ...r.iconDescription
                                })
                            })]
                        })]
                    }), Mt && t.jsx("span", {
                        className: "text-sm font-medium",
                        children: t.jsx(m, { ...Mt
                        })
                    }), t.jsx(u.Field, {
                        name: "name",
                        children: n => t.jsxs("div", {
                            children: [t.jsx("label", {
                                htmlFor: "custom-connector-name",
                                className: "mb-1 block text-sm font-medium",
                                children: t.jsx(m, { ...r.nameTitle
                                })
                            }), t.jsx(Le, {
                                name: "custom-connector-name",
                                value: n.state.value,
                                onChange: p => {
                                    n.handleChange(p.target.value), H && W(!1)
                                },
                                ariaLabel: s.formatMessage(r.nameTitle),
                                placeholder: s.formatMessage(r.namePlaceholder),
                                error: H ? n.state.meta.errors[0] : void 0,
                                inputClassName: "bg-token-bg-primary!"
                            })]
                        })
                    }), t.jsx(u.Field, {
                        name: "description",
                        children: n => t.jsxs("div", {
                            children: [t.jsx("label", {
                                htmlFor: "custom-connector-description",
                                className: "mb-1 block text-sm font-medium",
                                children: t.jsx(m, { ...r.descriptionTitle,
                                    values: {
                                        optionalText: t.jsx(Ft, {})
                                    }
                                })
                            }), t.jsx(Yt, {
                                name: "custom-connector-description",
                                value: n.state.value,
                                onChange: p => n.handleChange(p.target.value),
                                ariaLabel: s.formatMessage(r.descriptionTitle, {
                                    optionalText: s.formatMessage(r.optionalText)
                                }),
                                placeholder: s.formatMessage(r.descriptionPlaceholder),
                                inputClassName: "bg-token-bg-primary!"
                            })]
                        })
                    }), G ? t.jsx(u.Field, {
                        name: "connectionType",
                        children: n => {
                            const p = n.state.value;
                            return t.jsxs("div", {
                                children: [t.jsx(Za, {
                                    connectionType: p,
                                    onChange: C => {
                                        n.handleChange(C), ze && Ve(!1), H && W(!1)
                                    }
                                }), p === "tunnel" ? t.jsx(u.Field, {
                                    name: "tunnelId",
                                    children: C => aa({
                                        value: C.state.value,
                                        onChange: C.handleChange,
                                        fieldError: C.state.meta.errors[0]
                                    })
                                }) : t.jsx(u.Field, {
                                    name: "url",
                                    children: C => bt({
                                        value: C.state.value,
                                        onChange: C.handleChange,
                                        fieldError: C.state.meta.errors[0],
                                        labelClassName: "sr-only"
                                    })
                                })]
                            })
                        }
                    }) : t.jsx(u.Field, {
                        name: "url",
                        children: n => bt({
                            value: n.state.value,
                            onChange: n.handleChange,
                            fieldError: n.state.meta.errors[0],
                            labelClassName: "mb-1 block text-sm font-medium"
                        })
                    }), t.jsxs("div", {
                        children: [t.jsx("label", {
                            htmlFor: "custom-connector-auth",
                            className: "mb-1 block text-sm font-medium",
                            children: t.jsx(m, { ...r.authTypeTitle
                            })
                        }), (!re || B.length > 1) && t.jsxs("select", {
                            id: "custom-connector-auth",
                            value: M,
                            onChange: n => We(n.target.value),
                            className: "w-full rounded-md border border-token-border-heavy bg-token-bg-primary px-3 py-2 text-sm text-token-text-primary focus:border-token-border-xheavy focus:outline-none focus:ring-1 focus:ring-token-text-secondary",
                            children: [t.jsx("option", {
                                value: "OAUTH",
                                children: s.formatMessage(r.oauthOption)
                            }), f && t.jsx("option", {
                                value: "API_KEY",
                                children: s.formatMessage(r.apiKeyOption)
                            }), t.jsx("option", {
                                value: "NONE",
                                children: s.formatMessage(r.noAuthOption)
                            }), t.jsx("option", {
                                value: "MIXED",
                                children: s.formatMessage(r.mixedAuthOption)
                            })]
                        }), M === "API_KEY" && t.jsxs("div", {
                            className: "mt-2 flex flex-col gap-2",
                            children: [t.jsx("label", {
                                htmlFor: "custom-connector-header-scheme",
                                className: "mb-1 block text-sm font-medium",
                                children: t.jsx(m, { ...r.headerSchemeTitle
                                })
                            }), t.jsxs("select", {
                                id: "custom-connector-header-scheme",
                                value: L,
                                onChange: n => Ue(n.target.value),
                                className: "w-full rounded-md border border-token-border-heavy bg-token-bg-primary px-3 py-2 text-sm text-token-text-primary focus:border-token-border-xheavy focus:outline-none focus:ring-1 focus:ring-token-text-secondary",
                                children: [t.jsx("option", {
                                    value: "BEARER",
                                    children: s.formatMessage(r.bearerHeaderOption)
                                }), t.jsx("option", {
                                    value: "BASIC",
                                    children: s.formatMessage(r.basicHeaderOption)
                                }), t.jsx("option", {
                                    value: "CUSTOM_HEADER",
                                    children: s.formatMessage(r.customHeaderOption)
                                })]
                            }), L === "CUSTOM_HEADER" && t.jsx(Le, {
                                name: "custom-connector-header-name",
                                ariaLabel: s.formatMessage(r.customHeaderNamePlaceholder),
                                value: ge,
                                onChange: n => {
                                    Xe(n.target.value), H && W(!1)
                                },
                                placeholder: s.formatMessage(r.customHeaderNamePlaceholder),
                                error: H && !ge.trim() ? s.formatMessage(r.customHeaderNameRequired) : void 0,
                                inputClassName: "bg-token-bg-primary!"
                            })]
                        }), w && t.jsx("div", {
                            className: "mt-3",
                            children: t.jsxs("button", {
                                type: "button",
                                className: I("border-token-border-heavy flex w-full items-center justify-between rounded-xl border px-4 py-3 text-start", Y ? "hover:bg-token-bg-tertiary" : "cursor-not-allowed opacity-60"),
                                "aria-expanded": X,
                                "aria-controls": "advanced-auth-panel",
                                disabled: !Y || $,
                                onClick: () => {
                                    F()
                                },
                                children: [t.jsxs("span", {
                                    className: "flex flex-col gap-1",
                                    children: [t.jsx("span", {
                                        className: "text-sm font-medium",
                                        children: t.jsx(m, { ...r.advancedSettings
                                        })
                                    }), t.jsx("span", {
                                        className: "text-xs font-normal text-token-text-tertiary",
                                        children: t.jsx(m, { ...Y ? r.advancedSettingsDescription : r.advancedSettingsRequiresUrl
                                        })
                                    })]
                                }), $ ? t.jsx("span", {
                                    className: "text-xs text-token-text-tertiary",
                                    children: t.jsx(m, { ...r.advancedSettingsLoading
                                    })
                                }) : t.jsx(ya, {
                                    className: I("icon-sm shrink-0 transition-transform", X && "rotate-90")
                                })]
                            })
                        })]
                    }), na ? t.jsx(Nt, {
                        form: u,
                        showErrors: H,
                        setShowErrors: W,
                        clientIdAriaLabel: s.formatMessage(r.clientIdTitle),
                        clientIdPlaceholder: vt,
                        clientSecretAriaLabel: s.formatMessage(r.clientSecretTitle),
                        clientSecretPlaceholder: kt,
                        hasPreconfiguredOauthClient: Ce
                    }) : null, t.jsxs("div", {
                        children: [t.jsxs("div", {
                            className: "flex items-center gap-2 rounded-t-2xl border border-b-0 border-token-border-status-warning bg-token-bg-status-warning px-4 py-3 text-sm font-medium text-token-text-status-warning",
                            children: [t.jsx(dt, {
                                className: "h-6 w-6"
                            }), t.jsx("span", {
                                children: t.jsx(m, { ...r.customConnectorRiskBanner,
                                    values: {
                                        link: n => t.jsx(fe, {
                                            href: ta,
                                            openNewTab: !0,
                                            className: "inline",
                                            children: n
                                        }, "custom-connector-banner-link")
                                    }
                                })
                            })]
                        }), t.jsxs("label", {
                            htmlFor: "trust-checkbox",
                            className: "flex items-center gap-3 rounded-b-2xl border border-gray-200 bg-white px-4 py-4 text-sm dark:border-gray-700 dark:bg-gray-800",
                            children: [t.jsx(ut, {
                                id: "trust-checkbox",
                                onChange: () => ce(n => !n),
                                disabled: xe
                            }), t.jsxs("div", {
                                children: [t.jsx("p", {
                                    className: "text-sm font-medium",
                                    children: t.jsx(m, { ...r.acceptLabelTitle
                                    })
                                }), t.jsx("p", {
                                    className: "text-sm text-token-text-tertiary",
                                    children: t.jsx(m, { ...r.customConnectorRiskSubtitle
                                    })
                                })]
                            })]
                        })]
                    }), t.jsxs("div", {
                        className: "flex w-full items-center justify-between",
                        children: [t.jsxs(fe, {
                            href: xt,
                            openNewTab: !0,
                            className: "text-sm text-token-text-tertiary",
                            children: [t.jsx(Ea, {
                                className: "h-4.5 w-4.5 me-1.5 inline"
                            }), t.jsx(m, { ...r.readTheGuideLink
                            })]
                        }), t.jsx(u.Subscribe, {
                            selector: n => [n.isSubmitting],
                            children: ([n]) => t.jsx(Aa, {
                                type: "submit",
                                loading: n,
                                disabled: ca,
                                children: t.jsx(m, { ...r.createButton
                                })
                            })
                        })]
                    })]
                }), we && t.jsx("div", {
                    id: "advanced-auth-panel",
                    className: "flex min-w-0 flex-1 rounded-2xl border border-token-border-light bg-token-main-surface-secondary p-4 md:max-h-full md:min-h-0 md:overflow-y-auto md:p-5",
                    children: t.jsx(Nt, {
                        form: u,
                        showErrors: H,
                        setShowErrors: W,
                        clientIdAriaLabel: s.formatMessage(r.clientIdTitle),
                        clientIdPlaceholder: vt,
                        clientSecretAriaLabel: s.formatMessage(r.clientSecretTitle),
                        clientSecretPlaceholder: kt,
                        mode: "oauth-panel",
                        callbackUrl: la,
                        canCopyCallbackUrl: !!Tt,
                        supportedTokenEndpointAuthMethods: V,
                        resolvedTokenEndpointAuthMethod: J,
                        availableRequestedScopes: N,
                        isCimdSupported: j,
                        isDynamicClientRegistrationAvailable: E,
                        hasPreconfiguredOauthClient: Ce,
                        oauthClientMode: A,
                        isOidcAvailable: Ke,
                        useManualRequestedScopesInput: Ie
                    })
                })]
            })
        })
    },
    r = $e({
        createCustomAppModalTitle: {
            id: "createCustomConnectorModal.title",
            defaultMessage: "New App {betaBadge}"
        },
        iconTitle: {
            id: "createCustomConnectorModal.iconTitle",
            defaultMessage: "Icon {optionalText}"
        },
        iconDescription: {
            id: "createCustomConnectorModal.iconDescription",
            defaultMessage: "PNG only. Minimum size: 128 x 128 px. Max file size: 10 KB"
        },
        nameTitle: {
            id: "createCustomConnectorModal.nameTitle",
            defaultMessage: "Name"
        },
        urlTitle: {
            id: "createCustomConnectorModal.urlTitle",
            defaultMessage: "MCP Server URL"
        },
        descriptionTitle: {
            id: "createCustomConnectorModal.descriptionTitle",
            defaultMessage: "Description {optionalText}"
        },
        optionalText: {
            id: "createCustomConnectorModal.optionalText",
            defaultMessage: "(optional)"
        },
        readTheGuideLink: {
            id: "createCustomConnectorModal.readTheGuideLink",
            defaultMessage: "Read the guide"
        },
        createButton: {
            id: "createCustomConnectorModal.createButton",
            defaultMessage: "Create"
        },
        iconPreviewAlt: {
            id: "createCustomConnectorModal.iconPreviewAlt",
            defaultMessage: "Icon preview"
        },
        namePlaceholder: {
            id: "createCustomConnectorModal.namePlaceholder",
            defaultMessage: "Custom Tool"
        },
        urlPlaceholder: {
            id: "createCustomConnectorModal.urlPlaceholder",
            defaultMessage: "https://example.com/sse"
        },
        descriptionPlaceholder: {
            id: "createCustomConnectorModal.descriptionPlaceholder",
            defaultMessage: "Explain what it does in a few words"
        },
        iconTooLarge: {
            id: "createCustomConnectorModal.iconTooLarge",
            defaultMessage: "Icon is too large (max 10 KB)"
        },
        iconInvalid: {
            id: "createCustomConnectorModal.iconInvalid",
            defaultMessage: "Only PNG files are supported"
        },
        authTypeTitle: {
            id: "createCustomConnectorModal.authTypeTitle",
            defaultMessage: "Authentication"
        },
        oauthOption: {
            id: "createCustomConnectorModal.oauthOption",
            defaultMessage: "OAuth"
        },
        apiKeyOption: {
            id: "createCustomConnectorModal.apiKeyOption",
            defaultMessage: "Access token / API key"
        },
        noAuthOption: {
            id: "createCustomConnectorModal.noAuthOption",
            defaultMessage: "No Auth"
        },
        mixedAuthOption: {
            id: "createCustomConnectorModal.mixedAuthOption",
            defaultMessage: "Mixed"
        },
        headerSchemeTitle: {
            id: "createCustomConnectorModal.headerSchemeTitle",
            defaultMessage: "Header scheme"
        },
        bearerHeaderOption: {
            id: "createCustomConnectorModal.bearerHeaderOption",
            defaultMessage: "Bearer"
        },
        basicHeaderOption: {
            id: "createCustomConnectorModal.basicHeaderOption",
            defaultMessage: "Basic"
        },
        customHeaderOption: {
            id: "createCustomConnectorModal.customHeaderOption",
            defaultMessage: "Custom Header"
        },
        customHeaderNamePlaceholder: {
            id: "createCustomConnectorModal.customHeaderNamePlaceholder",
            defaultMessage: "Enter header name"
        },
        customHeaderNameRequired: {
            id: "createCustomConnectorModal.customHeaderNameRequired",
            defaultMessage: "Header name is required."
        },
        oauthConfigError: {
            id: "createCustomConnectorModal.oauthConfigError",
            defaultMessage: "Error fetching OAuth configuration"
        },
        oauthConfigUnavailable: {
            id: "createCustomConnectorModal.oauthConfigUnavailable",
            defaultMessage: "No OAuth configuration was found for this MCP server"
        },
        customConnectorRiskBanner: {
            id: "createCustomConnectorModal.customConnectorRiskBanner",
            defaultMessage: "Custom MCP servers introduce risk. <link>Learn more</link>"
        },
        acceptLabelTitle: {
            id: "createCustomConnectorModal.acceptLabelTitle",
            defaultMessage: "I understand and want to continue"
        },
        customConnectorRiskSubtitle: {
            id: "createCustomConnectorModal.customConnectorRiskSubtitle",
            defaultMessage: "OpenAI hasn't reviewed this MCP server. Attackers may attempt to steal your data or trick the model into taking unintended actions, including destroying data."
        },
        conformanceError: {
            id: "createCustomConnectorModal.conformanceError",
            defaultMessage: "This MCP server doesn't implement <link>our specification</link>"
        },
        developerModeConformanceError: {
            id: "createCustomConnectorModal.developerModeConformanceError",
            defaultMessage: "This MCP server doesn't implement <link>our specification</link>. Enable Developer Mode in Advanced Connector Settings to create custom connectors that support arbitrary tool calls"
        },
        createConnectorError: {
            id: "createCustomConnectorModal.createConnectorError",
            defaultMessage: "Error creating connector"
        },
        duplicateName: {
            id: "createCustomConnectorModal.duplicateName",
            defaultMessage: "Connector name already exists"
        },
        clientIdTitle: {
            id: "createCustomConnectorModal.clientIdTitle",
            defaultMessage: "OAuth client ID"
        },
        oauthClientIdRequiredPlaceholder: {
            id: "createCustomConnectorModal.oauthClientIdRequiredPlaceholder",
            defaultMessage: "OAuth Client ID"
        },
        oauthClientIdPlaceholder: {
            id: "createCustomConnectorModal.oauthClientIdPlaceholder",
            defaultMessage: "OAuth Client ID (Optional)"
        },
        clientSecretTitle: {
            id: "createCustomConnectorModal.clientSecretTitle",
            defaultMessage: "OAuth client secret"
        },
        oauthClientSecretPlaceholder: {
            id: "createCustomConnectorModal.oauthClientSecretPlaceholder",
            defaultMessage: "OAuth Client Secret (Optional)"
        },
        advancedSettings: {
            id: "createCustomConnectorModal.advancedSettings",
            defaultMessage: "Advanced settings"
        },
        advancedSettingsDescription: {
            id: "createCustomConnectorModal.advancedSettingsDescription",
            defaultMessage: "Review discovered OAuth settings, or enter them manually, then choose a client setup method and configure default scopes"
        },
        advancedSettingsRequiresUrl: {
            id: "createCustomConnectorModal.advancedSettingsRequiresUrl",
            defaultMessage: "Enter a valid MCP Server URL to review discovered OAuth settings"
        },
        advancedSettingsLoading: {
            id: "createCustomConnectorModal.advancedSettingsLoading",
            defaultMessage: "Loading..."
        },
        callbackUrlLoading: {
            id: "createCustomConnectorModal.callbackUrlLoading",
            defaultMessage: "Loading callback URL..."
        },
        callbackUrlUnavailableInline: {
            id: "createCustomConnectorModal.callbackUrlUnavailableInline",
            defaultMessage: "Could not load callback URL"
        },
        clientIdRequired: {
            id: "createCustomConnectorModal.clientIdRequired",
            defaultMessage: "Enter a client ID or remove the client secret"
        },
        userDefinedClientIdRequired: {
            id: "createCustomConnectorModal.userDefinedClientIdRequired",
            defaultMessage: "Enter a client ID to use a user-defined OAuth client"
        },
        manualOauthEndpointsRequired: {
            id: "createCustomConnectorModal.manualOauthEndpointsRequired",
            defaultMessage: "Enter both Auth URL and Token URL to continue with manual OAuth settings"
        }
    });

function zt(a) {
    const e = a.trim();
    if (!e) return null;
    try {
        const o = new URL(e),
            i = e.match(en) ? .groups ? .netloc;
        return i ? `${o.protocol}//${i}` : null
    } catch {
        return null
    }
}
async function ln(a) {
    const e = await Gt.safeGet("/aip/connectors/oauth_clients", {
        parameters: {
            query: {
                service: a
            }
        },
        additionalHeaders: {
            [Ua]: $t.CONNECTOR_SETTING
        }
    });
    return Array.isArray(e.oauth_clients) && e.oauth_clients.length > 0
}
export {
    vn as C, Pt as M, bn as a, Mn as i, xn as l, Cn as u
};
//# sourceMappingURL=a8d66c03-d8ufu6rsnqig4xxm.js.map