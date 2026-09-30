import {
    r as m,
    j as n,
    o as q,
    h as re,
    z as ce,
    u as le,
    c as $
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    _ as y,
    a0 as ue,
    hk as Ae,
    cz as oe,
    Q as Ie,
    A as R,
    J as De,
    x as ve,
    cf as Le,
    aw as de,
    e5 as z,
    fk as J,
    q as je,
    R as Ne,
    eK as We
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    cS as ae,
    ds as Oe,
    lq as qe
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    C as ie
} from "./58c15f95-e3yoo2duc6sgaog5.js";
import {
    a as Be
} from "./6cbb6eaf-hqe4w67ks2ili42q.js";
import {
    u as Ue
} from "./7018830a-c7k7fy0uxbzgl2y5.js";
import {
    E as Fe
} from "./61aaacec-iflrbdc4wi4m160d.js";
import {
    a as Ge,
    u as He
} from "./5ced9fb2-gdlkfe6m7icygyhv.js";
import {
    g as T,
    a as Y
} from "./b8f3be97-cabh0vwwkxj2eime.js";
import {
    h as Ke
} from "./6fd89734-ghfoi7e1ajqagqxe.js";
import {
    u as Ve
} from "./a4d26868-b1n5zb5pfqw48lrd.js";
const ze = "https://help.openai.com/articles/20001043";

function Je({
    isOpen: s,
    onClose: e,
    onContinue: o,
    analyticsParams: t
}) {
    m.useEffect(() => {
        s && y.logEventWithStatsig("Mobile Subscription Warning Modal Shown", "chatgpt_mobile_subscription_warning_modal_shown", t)
    }, [t, s]);
    const c = () => {
            y.logEventWithStatsig("Mobile Subscription Warning Modal Continue Clicked", "chatgpt_mobile_subscription_warning_modal_continue_clicked", t), o()
        },
        r = () => {
            y.logEventWithStatsig("Mobile Subscription Warning Modal Close Clicked", "chatgpt_mobile_subscription_warning_modal_close_clicked", t), e()
        };
    return n.jsx(ue, {
        testId: "modal-mobile-subscription-warning",
        isOpen: s,
        onClose: r,
        type: "warning",
        icon: Ae,
        title: n.jsx(q, { ...W.checkSubscriptionHeader
        }),
        primaryButton: n.jsx(oe.Button, {
            title: W.dismissModal.defaultMessage,
            color: "primary",
            onClick: r
        }),
        secondaryButton: n.jsx(oe.Button, {
            title: W.continueToNextStep.defaultMessage,
            color: "secondary",
            onClick: c
        }),
        children: n.jsx("span", {
            className: "gap-2 text-gray-600",
            children: n.jsx(q, { ...W.checkSubscriptionBodyWithHelpCenterLink,
                values: {
                    link: d => n.jsx("a", {
                        href: ze,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "underline",
                        children: d
                    })
                }
            })
        })
    })
}
const W = re({
        checkSubscriptionHeader: {
            id: "mobileSubscriptionWarningModal.checkSubscriptionHeader",
            defaultMessage: "Check your App Store subscription"
        },
        checkSubscriptionBodyWithHelpCenterLink: {
            id: "mobileSubscriptionWarningModal.checkSubscriptionBodyWithHelpCenterLink",
            defaultMessage: "Your subscription through the Apple App Store is currently on pause due to a payment issue. Please resolve that issue to resume using your paid ChatGPT plan and avoid duplicate charges. <link>Learn more</link>"
        },
        dismissModal: {
            id: "mobileSubscriptionWarningModal.dismissModal",
            defaultMessage: "Cancel"
        },
        continueToNextStep: {
            id: "mobileSubscriptionWarningModal.continueToNextStep",
            defaultMessage: "I understand, continue anyways"
        }
    }),
    Ye = "1288642238";

function $e() {
    "use forget";
    const s = $.c(1);
    let e;
    return s[0] === Symbol.for("react.memo_cache_sentinel") ? (e = {
        queryKey: ["has-app-store-subscription-in-billing-retry"],
        queryFn: Qe
    }, s[0] = e) : e = s[0], ce(e)
}
async function Qe() {
    return await Ne.safeGet("/subscriptions/has_app_store_subscription_in_billing_retry", {})
}

function Ze(s, e) {
    const o = Ie(new Date, s);
    return new Intl.DateTimeFormat(e, {
        year: "numeric",
        month: "short",
        day: "numeric"
    }).format(o)
}

function Xe(s) {
    "use forget";
    const e = $.c(10);
    let o, t, c, r;
    e[0] !== s ? ({
        testId: r,
        activeColor: o,
        children: t,
        ...c
    } = s, e[0] = s, e[1] = o, e[2] = t, e[3] = c, e[4] = r) : (o = e[1], t = e[2], c = e[3], r = e[4]);
    const d = o ? ? "primary";
    let k;
    return e[5] !== t || e[6] !== c || e[7] !== d || e[8] !== r ? (k = n.jsx(de, {
        fullWidth: !0,
        size: "large",
        color: d,
        "data-testid": r,
        ...c,
        children: t
    }), e[5] = t, e[6] = c, e[7] = d, e[8] = r, e[9] = k) : k = e[9], k
}

function et(s, e) {
    const o = s.planType,
        t = s.getNextPlanType(),
        c = s.getDaysUntilPlanChanges(),
        r = t && T(t) < T(o);
    return e ? {
        daysUntilPlanChanges: s.getDaysUntilPlanRenews(),
        isDowngradeScheduled: !0
    } : {
        daysUntilPlanChanges: c,
        isDowngradeScheduled: r
    }
}

function tt(s) {
    "use forget";
    const e = $.c(17),
        {
            currentAccount: o,
            children: t,
            disableForMobile: c,
            promoMetadata: r,
            planType: d,
            downgradeToGoDisabled: k
        } = s,
        {
            recentlyDowngraded: B
        } = He(),
        _ = le(),
        {
            daysUntilPlanChanges: I,
            isDowngradeScheduled: U
        } = et(o, B),
        D = m.useRef(!1),
        C = r != null && "referrer_name" in r,
        f = Ke(o);
    if (c && f) {
        let a;
        e[0] !== _ ? (a = _.formatMessage({
            id: "I2JCGZ",
            defaultMessage: "Mobile subscriptions are currently not eligible for this promotion."
        }), e[0] = _, e[1] = a) : a = e[1];
        let i;
        e[2] !== C ? (i = w => {
            w && !D.current && (C && qe.logMobileSubscriptionTooltipOpen(), D.current = !0)
        }, e[2] = C, e[3] = i) : i = e[3];
        let P;
        return e[4] !== t || e[5] !== a || e[6] !== i ? (P = n.jsx(J, {
            side: "top",
            sideOffset: 20,
            label: a,
            onOpenChange: i,
            children: t
        }), e[4] = t, e[5] = a, e[6] = i, e[7] = P) : P = e[7], P
    }
    if (k) {
        let a;
        e[8] !== _ ? (a = _.formatMessage({
            id: "AccountPaymentModal.primaryCTA.downgradeToGoDisabledTooltip",
            defaultMessage: "Downgrading to Go is not yet available. To purchase, you must first cancel your current plan."
        }), e[8] = _, e[9] = a) : a = e[9];
        let i;
        return e[10] !== t || e[11] !== a ? (i = n.jsx(J, {
            side: "top",
            labelTextAlign: "left",
            sideOffset: 20,
            label: a,
            children: t
        }), e[10] = t, e[11] = a, e[12] = i) : i = e[12], i
    }
    if (U && I) {
        const a = Ze(I, _.locale);
        let i;
        return e[13] !== d ? (i = Oe(d.toLowerCase()), e[13] = d, e[14] = i) : i = e[14], n.jsx(J, {
            side: "top",
            sideOffset: 20,
            label: n.jsx(q, {
                id: "3UZynm",
                defaultMessage: "Your subscription will change to {planType} on {date}.",
                values: {
                    date: a,
                    planType: i
                }
            }),
            children: t
        })
    }
    let h;
    return e[15] !== t ? (h = n.jsx(n.Fragment, {
        children: t
    }), e[15] = t, e[16] = h) : h = e[16], h
}

function ft({
    analyticsParams: s,
    billingDetails: e,
    currentAccount: o,
    planType: t,
    planLoading: c,
    setPlanLoading: r,
    testId: d,
    onPromoClose: k,
    activeColor: B,
    disableForMobile: _ = !1,
    disabled: I,
    downgradeToGoDisabled: U = !1,
    loading: D = !1,
    overrideOnClick: C,
    promoCode: f,
    referralCode: S,
    promoCampaign: h,
    promoMetadata: a,
    checkoutFrom: i,
    autoUpgrade: P = !1,
    fromiOSWebview: w = !1,
    pricingPlan: pe,
    setShouldShowCheckoutLoadingOverlay: Q,
    checkoutNavigationState: ge,
    children: me,
    ...fe
}) {
    "use no forget";
    const {
        data: he,
        refetch: _e
    } = ce(We), {
        trackSelectedPixels: ye
    } = ae({
        key: t
    });
    let M;
    switch (t) {
        case R.GO:
            M = "go-secondary";
            break;
        case R.PLUS:
            M = "plus-secondary";
            break;
        case R.PRO:
            M = "pro-secondary";
            break;
        case R.PROLITE:
            M = "prolite-secondary";
            break;
        case R.SELF_SERVE_BUSINESS:
            M = "team-secondary";
            break;
        default:
            M = ""
    }
    const {
        trackSelectedPixels: ke
    } = ae({
        key: M
    }), {
        data: {
            value: Se
        } = {}
    } = $e(), [be, Z] = m.useState(!1), [X, ee] = m.useState(!1), F = m.useRef(null), [te, v] = m.useState(!1), se = m.useRef(!1), E = m.useRef(new Map), x = m.useRef(new Map), Pe = De(), G = le(), H = o.planType, Me = o.hasPaidSubscription() && T(t) < T(H), Ce = o.hasPaidSubscription() && T(t) > T(H), Ee = a ? .plan_name === Y(t) && a ? .plan_type_change === "equal", L = ve("3950229590"), {
        prepareCheckoutSession: K,
        navigateToCheckout: xe
    } = Ue(), Re = o.hasPaidSubscription(), ne = t === R.PLUS && !Re && L.get("enabled_prefetch_checkout_for_plus", !1);
    m.useEffect(() => {
        if (!ne) return;
        const p = {
                entry_point: ie.ALL_PLANS_PRICING_MODAL,
                plan_name: Y(t),
                billing_details: e,
                promo_campaign: h ? {
                    promo_campaign_id: h,
                    is_coupon_from_query_param: !1
                } : void 0
            },
            g = { ...p,
                discount_code: { ...f && {
                        promo_code: f
                    }
                }
            },
            A = { ...p,
                discount_code: { ...S && {
                        referral_code: S
                    }
                }
            },
            l = f ? g : S ? A : p,
            u = JSON.stringify(l);
        if (E.current.has(u)) return;
        y.logEventWithStatsig("Account Pay: Prefetch Checkout Session", "chatgpt_account_payment_modal_prefetch_checkout_session", s), E.current.clear(), x.current.clear();
        const b = L.get("skip_sentinel_checkout", !1),
            V = { ...l,
                prefetch: !0
            },
            N = K(V, {
                skipSentinelCheckout: b,
                fromiOSWebview: w
            });
        E.current.set(u, N), x.current.set(u, l)
    }, [s, e, w, L, t, K, h, f, S, ne]);
    const Te = async () => {
            const p = {
                    entry_point: ie.ALL_PLANS_PRICING_MODAL,
                    plan_name: Y(t),
                    billing_details: e,
                    promo_campaign: h ? {
                        promo_campaign_id: h,
                        is_coupon_from_query_param: !1
                    } : void 0
                },
                g = { ...p,
                    discount_code: { ...f && {
                            promo_code: f
                        }
                    }
                },
                A = { ...p,
                    discount_code: { ...S && {
                            referral_code: S
                        }
                    }
                },
                l = f ? g : S ? A : p,
                u = JSON.stringify(l),
                b = E.current.get(u);
            if (b) return y.logEventWithStatsig("Account Pay: Using Prefetched Checkout Session", "chatgpt_account_payment_modal_using_prefetched_checkout_session", s), {
                response: await b,
                checkoutPayload: x.current.get(u) ? ? l
            };
            y.logEventWithStatsig("Account Pay: Click to Fetch Checkout Session", "chatgpt_account_payment_modal_click_to_fetch_checkout_session", s), E.current.clear(), x.current.clear();
            const V = L.get("skip_sentinel_checkout", !1),
                N = K(l, {
                    skipSentinelCheckout: V,
                    fromiOSWebview: w
                });
            return E.current.set(u, N), x.current.set(u, l), {
                response: await N,
                checkoutPayload: x.current.get(u)
            }
        },
        we = async ({
            skipEmailCheck: p
        }) => {
            if (!he ? .email && !p) {
                v(!0);
                return
            }
            r(t), y.logEvent("Account Pay: Payment Checkout Clicked", s), z("chatgpt_account_payment_modal_upgrade_button_click", t), F.current = performance.now();
            try {
                Q(!0);
                const {
                    response: g,
                    checkoutPayload: A
                } = await Te();
                let l;
                F.current && (l = performance.now() - F.current);
                const u = Be(g);
                y.logEvent("Account Pay: Navigating to Payment Checkout", { ...s,
                    url: g.url ? ? "",
                    latency_ms: l,
                    checkout_id: u
                });
                const b = {
                    url: String(g.url ? ? "")
                };
                l !== void 0 && (b.latency_ms = l.toString()), u && (b.checkout_id = u), z("chatgpt_account_payment_modal_navigating_to_checkout", t, b), await xe(g, {
                    checkoutPayload: A,
                    checkoutFrom: i,
                    state: ge
                })
            } catch {
                je(Ye) && Pe.warning(G.formatMessage(O.paymentErrorWarning), {
                    hasCloseButton: !0
                }), Q(!1)
            }
            r(null)
        },
        j = ({
            skipAppStoreSubscriptionInBillingRetryCheck: p = !1,
            skipEmailCheck: g = !1
        } = {}) => {
            if (Se && !p) return Z(!0);
            if (C) return C(e, s);
            Me || Ce || Ee ? (y.logEvent("Account Pay: Payment Checkout Clicked", s), z("chatgpt_account_payment_modal_upgrade_button_click", t), ee(!0)) : (ye(), ke(), we({
                skipEmailCheck: g
            }))
        };
    return m.useEffect(() => {
        !P || se.current || (se.current = !0, j())
    }, [P]), Ve(te, {
        plan: s
    }), n.jsxs(n.Fragment, {
        children: [n.jsx(tt, {
            currentAccount: o,
            disableForMobile: _,
            promoMetadata: a,
            planType: t,
            downgradeToGoDisabled: U,
            children: n.jsx(Xe, {
                disabled: I,
                loading: D,
                onClick: () => j(),
                testId: d,
                activeColor: B,
                ...fe,
                children: c === t ? n.jsx(Le, {}) : me
            })
        }), n.jsx(Je, {
            isOpen: be,
            onClose: () => Z(!1),
            onContinue: () => j({
                skipAppStoreSubscriptionInBillingRetryCheck: !0
            }),
            analyticsParams: s
        }), X && n.jsx(Ge, {
            isOpen: X,
            onClose: () => ee(!1),
            accountId: o.id,
            initialPlanType: H,
            updatedPlanType: t,
            billingDetails: e,
            promoMetadata: a,
            promoCode: f,
            onPromoClose: k,
            fullPriceResumeDateString: pe.fullPriceResumeDateString
        }), n.jsx(ue, {
            testId: "modal-add-email",
            isOpen: te,
            onClose: () => v(!1),
            type: "success",
            className: "max-w-sm",
            children: n.jsx(Fe, {
                enterEmailTitle: G.formatMessage(O.addEmailTitle),
                enterEmailDescription: G.formatMessage(O.addEmailDescription),
                onVerified: () => {
                    _e(), v(!1), j({
                        skipEmailCheck: !0
                    })
                },
                cancelFlowButton: n.jsx(de, {
                    className: "w-full rounded-md",
                    color: "secondary",
                    onClick: () => v(!1),
                    children: n.jsx(q, { ...O.cancelAddEmail
                    })
                })
            })
        })]
    })
}
const O = re({
    paymentErrorWarning: {
        id: "AccountPaymentModal.primaryCTA.paymentErrorWarning",
        defaultMessage: "The payments page encountered an error. Please try again. If the problem continues, please visit help.openai.com."
    },
    addEmailTitle: {
        id: "AccountPaymentModal.primaryCTA.addEmailTitle",
        defaultMessage: "Email required"
    },
    addEmailDescription: {
        id: "AccountPaymentModal.primaryCTA.addEmailDescription",
        defaultMessage: "You'll be able to login with this email. It will also be used for account updates (like password resets) and information about OpenAI services."
    },
    cancelAddEmail: {
        id: "AccountPaymentModal.primaryCTA.cancelAddEmail",
        defaultMessage: "Cancel"
    },
    highDemandDisabledText: {
        id: "AccountPaymentModal.primaryCTA.highDemandDisabledText",
        defaultMessage: "Due to high demand, we've temporarily paused upgrades."
    }
});
export {
    Je as M, ft as P, Ze as f, et as g, O as m
};
//# sourceMappingURL=356eccf2-efctq4327o59mtce.js.map