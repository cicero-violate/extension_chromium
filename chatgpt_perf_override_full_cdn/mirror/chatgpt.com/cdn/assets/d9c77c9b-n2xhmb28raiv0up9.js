import {
    u as x,
    r as d,
    j as s,
    o as I,
    s as q,
    n as R,
    C as me,
    Y as pe
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    R as de,
    gJ as ge,
    aw as J,
    cf as fe,
    fs as ye,
    x as he,
    z as G,
    _ as Z,
    J as Se,
    A as Pe,
    D as U
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    c as u,
    S as w,
    F as D,
    a as ee,
    C as B,
    L as _e
} from "./b288024a-hvsuegpzdra9csyb.js";
import {
    C as Ce
} from "./58c15f95-e3yoo2duc6sgaog5.js";
import {
    u as Ee
} from "./7018830a-c7k7fy0uxbzgl2y5.js";
import {
    ce as ae,
    oT as te,
    hK as Te,
    hN as be,
    hO as ke,
    hP as we,
    hL as A,
    l7 as xe,
    jV as Me,
    hM as Ne
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    P as z,
    b as oe,
    B as ve
} from "./e8eebcb1-hl1q1mqbpavqpner.js";
import {
    u as Le,
    a as Ae
} from "./e3f71c51-lr1kx59sxbu52hj8.js";
import {
    D as je,
    R as Re,
    T as De
} from "./c60851bc-l8eml0fjdavi50rk.js";
import {
    S as Fe
} from "./c816d342-i01x53wgy40jgq48.js";
const X = "country_code",
    j = "step",
    O = o => de.safePost("/accounts/pending_team_workspace", {
        requestBody: o
    }),
    Ie = ({
        formData: o,
        onNext: p
    }) => {
        const t = x(),
            [e, m] = d.useState({
                role: o.role ? ? "",
                department: o.department ? ? ""
            }),
            [c, g] = d.useState({}),
            h = (a, r) => {
                m(i => ({ ...i,
                    [a]: r
                })), g(i => ({ ...i,
                    [a]: ""
                }))
            },
            f = d.useMemo(() => {
                const a = je.map(r => ({
                    label: t.formatMessage(r.displayValue),
                    value: r.id
                }));
                return a.sort((r, i) => r.label.localeCompare(i.label)), a
            }, [t]),
            n = d.useMemo(() => {
                const a = Re.map(r => ({
                    label: t.formatMessage(r.displayValue),
                    value: r.id
                }));
                return a.sort((r, i) => r.label.localeCompare(i.label)), a
            }, [t]),
            l = d.useMemo(() => [{
                formType: "select",
                label: t.formatMessage(u.roleLabel),
                name: "role",
                placeholder: t.formatMessage(u.rolePlaceholder),
                value: e.role,
                onChange: a => h("role", a),
                error: c.role,
                required: !0,
                options: n
            }, {
                formType: "select",
                label: t.formatMessage(u.workspaceDepartmentLabel),
                name: "department",
                placeholder: t.formatMessage(u.workspaceDepartmentPlaceholder),
                value: e.department,
                onChange: a => h("department", a),
                error: c.department,
                required: !0,
                options: f
            }], [f, c.department, c.role, e.department, e.role, t, n]),
            y = () => {
                const a = {};
                return l.forEach(r => {
                    r.required && !e[r.name] && (a[r.name] = t.formatMessage(u.fieldRequired, {
                        fieldName: r.label
                    }))
                }), g(a), Object.values(a).every(r => !r)
            };
        return s.jsx(w, {
            content: s.jsxs(D, {
                title: t.formatMessage(u.tellUsAboutWorkStepTitle),
                subTitle: t.formatMessage(u.tellUsAboutWorkStepSubtitle),
                children: [s.jsx("div", {
                    className: "flex flex-col gap-6",
                    children: l.map(a => d.createElement(ee, { ...a,
                        key: a.name
                    }))
                }), s.jsx(B, {
                    onClick: async () => {
                        y() && await p(e)
                    }
                })]
            })
        })
    },
    Ue = o => {
        const {
            onNext: p,
            pendingWorkspace: t,
            initialBillingDetails: e,
            formData: m
        } = o, [c, g] = d.useState(0), [h, f] = d.useState(!1), n = d.useRef(!1), {
            isLoading: l
        } = ge(), y = x(), {
            data: a,
            isLoading: r,
            error: i
        } = ae({
            countryCode: e ? .country,
            currency: e ? .currency,
            enabled: e != null
        }), P = new URLSearchParams(t ? .query_params ? ? "").get(z) ? ? void 0, {
            selectedPlan: _,
            numSeats: b,
            promoData: S,
            promoDataIsFromQueryParam: C,
            isPromoDataLoading: T
        } = oe({
            initialSeats: m ? .numSeats,
            initialPromoCoupon: P,
            initialPromoCouponFromQueryParam: P != null
        }), {
            eligible: F,
            campaignId: N
        } = te(), M = !P && F, v = d.useMemo(() => S ? ? (M ? {
            coupon: N,
            state: "eligible",
            redemption: null
        } : void 0), [S, M, N]), k = S ? C : M ? !1 : void 0;
        return d.useEffect(() => {
            n.current || !e || l || T || r || i != null || !a || (n.current = !0, Promise.resolve(p({
                priceInterval: _,
                billingDetails: e,
                numSeats: b,
                promoData: v,
                promoDataIsFromQueryParam: k
            })).catch(() => f(!0)))
        }, [c, a, i, e, l, T, r, b, p, v, k, _]), h ? s.jsx(w, {
            content: s.jsx(D, {
                title: y.formatMessage(u.autoCheckoutErrorTitle),
                subTitle: y.formatMessage(u.autoCheckoutErrorSubtitle),
                children: s.jsx(J, {
                    size: "large",
                    onClick: () => {
                        n.current = !1, f(!1), g(L => L + 1)
                    },
                    children: s.jsx(I, { ...u.autoCheckoutRetryButton
                    })
                })
            })
        }) : s.jsx(w, {
            content: s.jsx(fe, {
                className: "text-token-text-secondary h-8 w-8"
            })
        })
    },
    Oe = o => o === "sales_marketing",
    qe = {
        input: "rounded-full!",
        button: "rounded-full! h-8! w-8! border-none!",
        buttons: "absolute end-2! gap-0!"
    };

function Be({
    isFreeTrialPromoEligible: o,
    salesMarketingCopyEnabled: p
}) {
    return o ? {
        titleMessage: u.freeTrialPromoTitle,
        subTitleMessage: p ? u.salesMarketingPromoSubtitleFree : u.freeTrialPromoSubtitle
    } : {
        titleMessage: u.purchaseStepTitle,
        subTitleMessage: void 0
    }
}
const ze = ({
        onNext: o,
        onPrevious: p,
        pendingWorkspace: t,
        initialBillingDetails: e,
        formData: m
    }) => {
        const c = x(),
            g = xe(),
            {
                data: h,
                isLoading: f,
                error: n
            } = ae({
                countryCode: e ? .country,
                currency: e ? .currency,
                enabled: e != null
            }),
            l = q(),
            y = R(),
            r = d.useMemo(() => {
                const H = new URLSearchParams(y.search).get("segment");
                return Oe(H) ? H : null
            }, [y.search]) != null,
            i = new URLSearchParams(t ? .query_params ? ? "").get(z) ? ? void 0,
            P = i != null,
            {
                selectedPlan: _,
                setSelectedPlan: b,
                numSeats: S,
                setNumSeats: C,
                promoData: T,
                promoDataIsFromQueryParam: F,
                TEAM_FREE_TRIAL_COUPON_IsEligible: N
            } = oe({
                initialSeats: m ? .numSeats,
                initialPromoCoupon: i,
                initialPromoCouponFromQueryParam: P
            }),
            {
                eligible: M,
                campaignId: v
            } = te(),
            k = !i && M,
            L = T ? ? (k ? {
                coupon: v,
                state: "eligible",
                redemption: null
            } : void 0),
            se = T ? F : k ? !1 : void 0,
            Q = N || k;
        if (!e || f || n != null || !h) return s.jsx(w, {
            content: null
        });
        const {
            annualBillingPlan: W
        } = Te(e.currency, h), ne = Math.floor(100 - W.discountedMonthlyCost / W.monthlyCost * 100), ce = () => {
            if (p) {
                p({ ...V
                });
                return
            }
            l("/")
        }, V = {
            priceInterval: _,
            billingDetails: e,
            numSeats: S,
            promoData: L,
            promoDataIsFromQueryParam: se
        }, le = Q, {
            titleMessage: ie,
            subTitleMessage: Y
        } = Be({
            isFreeTrialPromoEligible: !!Q,
            salesMarketingCopyEnabled: r
        }), ue = be(isNaN(S) ? 0 : S, g, ke);
        return s.jsx(w, {
            onPrevious: ce,
            content: s.jsxs(D, {
                title: c.formatMessage(ie),
                subTitle: Y && c.formatMessage(Y),
                children: [s.jsxs("div", {
                    className: "flex flex-col gap-6",
                    children: [s.jsx(we, {
                        numSeats: S,
                        minSeats: g,
                        setNumSeats: C,
                        classNames: qe,
                        label: s.jsx(I, { ...u.seatsCountLabel
                        })
                    }), s.jsxs("div", {
                        className: "flex flex-col gap-1.5",
                        children: [s.jsx(_e, {
                            required: !0,
                            children: c.formatMessage(u.planSummaryTitle)
                        }), s.jsxs("div", {
                            className: "border-token-border-default flex flex-col gap-6 rounded-3xl border p-5",
                            children: [!(le && _ === A.FLEXIBLE) && s.jsx(Fe, {
                                ariaLabel: c.formatMessage(u.planTypeLabel),
                                leftItem: {
                                    label: s.jsx("div", {
                                        className: "flex flex-wrap justify-center gap-1 text-center",
                                        children: c.formatMessage(u.annualPlanLabel, {
                                            percent: ne,
                                            span: K => s.jsx("span", {
                                                className: "text-[#10A37F]",
                                                children: K
                                            })
                                        })
                                    }),
                                    value: A.ANNUAL
                                },
                                rightItem: {
                                    label: c.formatMessage(u.monthlyPlanLabel),
                                    value: A.FLEXIBLE
                                },
                                value: _,
                                onChange: b
                            }), s.jsx(ve, {
                                numSeats: ue,
                                selectedPlan: _,
                                billingDetails: e,
                                totalLabel: u.allPlansTodayTotal,
                                billDate: "today",
                                promoData: L
                            })]
                        })]
                    })]
                }), s.jsx(B, {
                    onClick: () => o(V)
                }), s.jsx(J, {
                    color: "ghost",
                    onClick: () => l("/"),
                    children: s.jsx(I, {
                        id: "TjfExQ",
                        defaultMessage: "Cancel"
                    })
                })]
            })
        })
    },
    Qe = ({
        formData: o,
        onNext: p,
        onPrevious: t
    }) => {
        const e = x(),
            [m, c] = d.useState({
                workspaceName: o.workspaceName ? ? "",
                companySize: o.companySize ? ? ""
            }),
            [g, h] = d.useState({}),
            f = (a, r) => {
                c(i => ({ ...i,
                    [a]: r
                })), h(i => ({ ...i,
                    [a]: ""
                }))
            },
            n = De.map(a => ({
                label: typeof a.displayValue == "string" ? a.displayValue : e.formatMessage(a.displayValue),
                value: a.id
            })),
            l = d.useMemo(() => [{
                formType: "input",
                label: e.formatMessage(u.workspaceNameLabel),
                name: "workspaceName",
                placeholder: e.formatMessage(u.workspaceNamePlaceholder),
                value: m.workspaceName,
                onChange: a => f("workspaceName", a),
                error: g.workspaceName,
                required: !0,
                autoFocus: !0
            }, {
                formType: "select",
                label: e.formatMessage(u.workspaceCompanySizeLabel),
                name: "companySize",
                placeholder: e.formatMessage(u.workspaceCompanySizePlaceholder),
                value: m.companySize,
                onChange: a => f("companySize", a),
                error: g.companySize,
                required: !1,
                options: n
            }], [g.companySize, g.workspaceName, m.companySize, m.workspaceName, e, n]),
            y = () => {
                const a = {};
                return l.forEach(r => {
                    r.required && !m[r.name] && (a[r.name] = e.formatMessage(u.fieldRequired, {
                        fieldName: r.label
                    }))
                }), h(a), Object.values(a).every(r => !r)
            };
        return s.jsx(w, {
            onPrevious: t ? () => t({ ...m
            }) : void 0,
            content: s.jsxs(D, {
                title: e.formatMessage(u.workspaceNameStepTitle),
                subTitle: e.formatMessage(u.workspaceNameStepSubtitle),
                children: [s.jsx("div", {
                    className: "flex flex-col gap-6",
                    children: l.map(a => d.createElement(ee, { ...a,
                        key: a.name
                    }))
                }), s.jsx(B, {
                    disabled: !m.workspaceName,
                    onClick: async () => {
                        y() && await p({ ...m
                        })
                    }
                })]
            })
        })
    },
    We = "3950229590",
    Ve = "enabled_custom_checkout_for_business_direct_purchase";
var re = (o => (o.AboutWork = "about-work", o.WorkspaceInfo = "workspace-info", o.ConfigurePlan = "configure-plan", o))(re || {});
const Ye = ye(Object.values(re), void 0),
    Ke = ({
        pendingWorkspace: o
    }) => {
        const p = x(),
            [t, e] = d.useState({
                workspaceName: o ? .workspace_name ? ? void 0,
                role: o ? .role ? ? void 0,
                department: o ? .department ? ? void 0,
                companySize: o ? .company_size ? ? void 0,
                numSeats: o ? .seat_quantity ? ? void 0
            }),
            m = new URLSearchParams(o ? .query_params ? ? "").get(z);
        Me(m ? ? "", !!m);
        const c = he(We).get(Ve, !1),
            g = He({
                data: t,
                isCustomCheckout: c
            }),
            h = G(),
            f = R(),
            n = new URLSearchParams(f.search).get(X) ? ? new URLSearchParams(o ? .query_params ? ? "").get(X) ? ? void 0,
            l = me(),
            {
                country: y,
                userCountry: a
            } = Le({
                initialCountryCode: n
            }),
            r = Ae({
                country: y,
                currentAccount: h,
                location: "TeamDirectSignUpFlow",
                pricingPlanIsTypeBusiness: !0
            }),
            i = Ye(o ? .step_name),
            {
                step: P,
                nextStep: _
            } = Xe({
                initialStep: i && E.includes(i) ? i : void 0
            });
        d.useEffect(() => {
            o || O({
                step_name: o ? .step_name ? ? E[0],
                query_params: f.search,
                user_segment: "v1"
            })
        }, []), d.useEffect(() => {
            const S = f.key,
                T = new URLSearchParams(window.location.search).get("referrer") || document.referrer;
            Z.logEventWithStatsig("Account Pay: Team Direct Sign Up Flow", "chatgpt_account_payment_team_direct_sign_up_flow", { ...h ? .subscriptionAnalyticsParams,
                referrer : T,
                initialTab: o ? .step_name,
                currentTab: P,
                locationKey: S,
                navigationType: l,
                initialCountrySelectorCountry: n ? ? y,
                selectedCountry: r ? .country ? ? "",
                selectedCurrency: r ? .currency ? ? "",
                userCountry: a ? ? ""
            })
        }, [P]);
        const b = () => {
            switch (P) {
                case "about-work":
                    return s.jsx(Ie, {
                        formData: t,
                        onNext: async S => {
                            const C = { ...t,
                                ...S
                            };
                            e(C), await _(C)
                        }
                    });
                case "workspace-info":
                    return s.jsx(Qe, {
                        formData: t,
                        onNext: async S => {
                            const C = { ...t,
                                ...S
                            };
                            e(C), await _(C)
                        }
                    });
                case "configure-plan":
                    return c ? s.jsx(Ue, {
                        formData: t,
                        initialBillingDetails: r ? ? void 0,
                        onNext: async S => {
                            await g({ ...t,
                                ...S
                            }, {
                                throwOnError: !0
                            })
                        },
                        pendingWorkspace: o
                    }) : s.jsx(ze, {
                        formData: t,
                        initialBillingDetails: r ? ? void 0,
                        onNext: async S => {
                            await g({ ...t,
                                ...S
                            })
                        },
                        pendingWorkspace: o
                    });
                default:
                    return null
            }
        };
        return s.jsxs(s.Fragment, {
            children: [s.jsx("title", {
                children: p.formatMessage(u.teamSignUpPageTitle)
            }), b()]
        })
    },
    He = ({
        data: o,
        isCustomCheckout: p = !1
    }) => {
        const {
            prepareCheckoutSession: t,
            navigateToCheckout: e
        } = Ee(), m = Se(), c = x(), g = G();
        return d.useCallback(async ({
            priceInterval: f,
            billingDetails: n,
            numSeats: l,
            promoData: y,
            promoDataIsFromQueryParam: a
        }, r) => {
            try {
                Z.logEvent("Account Pay: Payment Checkout Clicked", {
                    planType: Pe.SELF_SERVE_BUSINESS,
                    ...g ? .subscriptionAnalyticsParams,
                    referrer : document.referrer
                });
                const i = {
                        entry_point: Ce.TEAM_DIRECT_SIGNUP,
                        plan_name: "chatgptteamplan",
                        team_plan_data: {
                            workspace_name: o.workspaceName ? ? "",
                            price_interval: f,
                            seat_quantity: l
                        },
                        billing_details: n,
                        ...p ? {
                            checkout_ui_mode: "custom"
                        } : {
                            checkout_ui_mode: "redirect"
                        },
                        ...f === A.FLEXIBLE && y ? .coupon ? {
                            promo_campaign: {
                                promo_campaign_id: y ? .coupon,
                                is_coupon_from_query_param: !!a
                            }
                        } : {},
                        cancel_url : window.location.href
                    },
                    P = await t(i, {});
                await e(P, {
                    checkoutPayload: i
                })
            } catch (i) {
                if (U.addError(i), m.warning(c.formatMessage(Ne.paymentErrorWarning), {
                        hasCloseButton: !0
                    }), r ? .throwOnError) throw i
            }
        }, [p, g, o.workspaceName, c, e, t, m])
    },
    $ = (o, p) => {
        const t = new URLSearchParams(window.location.search);
        Object.entries(o).forEach(([m, c]) => {
            t.set(m, c)
        });
        const e = `${window.location.pathname}?${t.toString()}`;
        p ? p(e, {
            replace: !1
        }) : window.history.replaceState(null, "", e)
    },
    E = ["configure-plan"],
    Xe = ({
        initialStep: o
    }) => {
        const p = q(),
            t = R(),
            [e, m] = d.useState(() => {
                const n = o ? ? E[0];
                return $({
                    [j]: n
                }), n
            }),
            c = d.useCallback(n => {
                m(n), $({
                    [j]: n
                }, p)
            }, [p]),
            g = d.useRef(null);
        d.useEffect(() => {
            const l = new URLSearchParams(t.search).get(j);
            l !== g.current && l && E.includes(l) && l !== e && c(l), g.current = l
        }, [t.search, c, e]);
        const h = async n => {
                let l = e;
                const y = E.indexOf(e);
                y >= 0 && y < E.length - 1 && (l = E[y + 1], c(l));
                try {
                    await O({
                        workspace_name: n.workspaceName,
                        company_size: n.companySize,
                        department: n.department,
                        role: n.role,
                        step_name: l,
                        query_params: t.search,
                        user_segment: "v1"
                    })
                } catch (a) {
                    U.addError(a)
                }
            },
            f = d.useCallback(async n => {
                let l = e;
                const y = E.indexOf(e);
                y > 0 && (l = E[y - 1], c(l));
                try {
                    await O({
                        workspace_name: n.workspaceName,
                        company_size: n.companySize,
                        department: n.department,
                        role: n.role,
                        step_name: l,
                        query_params: t.search,
                        user_segment: "v1"
                    })
                } catch (a) {
                    U.addError(a)
                }
            }, [t.search, c, e]);
        return {
            step: e,
            nextStep: h,
            previousStep: f
        }
    },
    na = "/create-workspace",
    ca = pe(function({
        loaderData: p
    }) {
        const t = R(),
            e = q();
        return d.useEffect(() => {
            const m = p.pendingWorkspace ? .query_params;
            if (!m) return;
            const c = new URLSearchParams(t.search),
                g = new URLSearchParams(m);
            let h = !1;
            for (const [f, n] of g) !c.get(f) && f !== j && (c.set(f, n), h = !0);
            h && e(`${t.pathname}?${c.toString()}`, {
                replace: !0
            })
        }, [p.pendingWorkspace ? .query_params, t.pathname, t.search, e]), s.jsx(Ke, {
            pendingWorkspace: p.pendingWorkspace
        })
    });
export {
    na as C, ca as c, Oe as i
};
//# sourceMappingURL=d9c77c9b-n2xhmb28raiv0up9.js.map