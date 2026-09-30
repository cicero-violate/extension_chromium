import {
    h as me,
    p as ue,
    r as w,
    n as we,
    f as ot,
    j as e,
    u as de,
    o as P
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    a as rt
} from "./e4904c67-laejzp6xfq37q0u3.js";
import {
    ro as nt,
    jV as Ae,
    sx as ie,
    sy as le,
    hL as ke,
    sz as it,
    l7 as ve,
    sA as Fe,
    sB as ce,
    sC as ae,
    oT as lt,
    cS as Pe,
    lj as ct,
    lk as mt,
    ce as Ne,
    hK as Be,
    hN as ut,
    sD as ne,
    hM as G,
    cD as dt,
    hB as ft,
    hQ as Ce,
    hP as pt,
    hO as ht,
    la as gt,
    sE as yt,
    sF as xt
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    z as oe,
    gJ as Tt,
    ay as Se,
    J as Pt,
    l as Ct,
    A as St,
    hF as bt,
    _ as z,
    a0 as Mt,
    o7 as _t,
    af as Ie,
    $ as be,
    n as Et,
    c8 as wt,
    D as je,
    Ci as Me,
    aV as At
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    c as De
} from "./64d46afb-iej0cupg2dqkmejt.js";
import {
    C as kt
} from "./58c15f95-e3yoo2duc6sgaog5.js";
import {
    u as vt
} from "./7018830a-c7k7fy0uxbzgl2y5.js";
import {
    u as Ft,
    a as Nt
} from "./e3f71c51-lr1kx59sxbu52hj8.js";
const se = "team-1-month-free",
    Bt = 5;

function Re(a) {
    return 0
}
const $ = me({
        teamFreeTrialCost: {
            id: "promo.teamFreeTrial.teamFreeTrialCost",
            defaultMessage: "for the first month"
        },
        teamFreeTrialPerSeat: {
            id: "promo.teamFreeTrial.teamFreeTrialPerSeat",
            defaultMessage: "/seat"
        },
        teamFreeTrialCostFollowUp: {
            id: "promo.teamFreeTrial.teamFreeTrialCostFollowUp",
            defaultMessage: "up to 5 users if eligible"
        },
        teamFreeTrialCostNormalPricing: {
            id: "promo.teamFreeTrial.teamFreeTrialCostNormalPricing",
            defaultMessage: "After promotion, you will be charged the regular price"
        },
        asterisk: {
            id: "promo.teamFreeTrial.astrix",
            defaultMessage: "*"
        },
        teamFreeTrialLoginToVerify: {
            id: "promo.teamFreeTrial.loginToVerify",
            defaultMessage: "Log in or create a free account to verify your eligibility for the promotion."
        },
        teamFreeTrialMonthlyCost: {
            id: "promo.teamFreeTrial.monthlyCostZero",
            defaultMessage: "1 month free <s>{currencySign}{monthlyCost}</s>"
        },
        teamFreeTrialMonthlyStructure: {
            id: "promo.teamFreeTrial.monthlyStructure",
            defaultMessage: "Up to 5 users for {currencySign}1 flat-fee for the first month, then standard pricing applies."
        },
        teamFreeTrialOverSeatsDisclaimer: {
            id: "promo.teamFreeTrial.overSeatsDisclaimer",
            defaultMessage: "You have more than 5 users. The promo will only apply to the first 5 users for the first month."
        },
        teamFreeTrialBelowDiscount: {
            id: "promo.teamFreeTrial.belowDiscount",
            defaultMessage: "1 month free up to 5 seats"
        },
        promoCost: {
            id: "promo.teamFreeTrial.cost",
            defaultMessage: "0*"
        },
        teamFreeTrialPromoDisclaimer: {
            id: "promo.teamFreeTrial.disclaimer",
            defaultMessage: "*Billed as a {currencySign}0 flat fee up to 5 seats for the first month, after which regular pricing applies. Restrictions apply."
        },
        teamFreeTrialPromoDisclaimerWithPerSeatMonthlyPrice: {
            id: "promo.teamFreeTrial.disclaimerWithPerSeatMonthlyPrice",
            defaultMessage: "*Maximum 5 seats. Billed at {postTrialSeatPrice} seat/mo after 1 month. Limits apply."
        },
        teamFreeTrialPromoDisclaimerINR: {
            id: "promo.teamFreeTrial.teamFreeTrialPromoDisclaimerINR",
            defaultMessage: "*Billed as a ₹0 flat fee up to 5 seats for the first month, after which regular pricing applies. Restrictions apply."
        },
        teamFreeTrialPromoDisclaimerIDR: {
            id: "promo.teamFreeTrial.teamFreeTrialPromoDisclaimerIDR",
            defaultMessage: "*Billed as a Rp0 flat fee up to 5 seats for the first month, after which regular pricing applies. Restrictions apply."
        },
        teamFreeTrialPromoDisclaimerWithAmount: {
            id: "promo.teamFreeTrial.teamFreeTrialPromoDisclaimerWithAmount",
            defaultMessage: "*Billed as a {amount} flat fee up to 5 seats for the first month, after which regular pricing applies. Restrictions apply."
        },
        promoCostDuration: {
            id: "promo.teamFreeTrial.costDuration",
            defaultMessage: "for the first month"
        },
        teamFreeTrialNotEligible: {
            id: "promo.teamFreeTrial.notEligibleMessage",
            defaultMessage: "Sorry, you're not eligible for this promotional discount."
        },
        teamFreeTrialTemporarilyDisabled: {
            id: "promo.teamFreeTrial.temporarilyDisabled",
            defaultMessage: "This promotion is currently temporarily disabled. Please check back later."
        },
        teamFreeTrialOffline: {
            id: "promo.teamFreeTrial.offline",
            defaultMessage: "This promotion you are trying to use is offline or expired."
        },
        teamFreeTrialWelcomeOffer: {
            id: "promo.teamFreeTrial.welcomeOffer",
            defaultMessage: "WELCOME OFFER"
        }
    }),
    It = "promo_campaign";

function Le() {
    const [a] = ue();
    return a.get(It)
}
const jt = ["WEB-team_try_for_1"],
    Dt = ["openai_business"],
    Rt = ["true"];

function Lt() {
    const [a] = ue();
    return {
        utmInternalSource: a.get("utm_internal_source"),
        openAIReferred: a.get("openaicom_referred"),
        utmCampaign: a.get("utm_campaign")
    }
}

function Wt(a) {
    const {
        utmCampaign: s,
        utmInternalSource: l,
        openAIReferred: n
    } = a;
    return !!s && !!l && !!n && jt.includes(s) && Dt.includes(l) && Rt.includes(n)
}

function aa() {
    const a = Lt(),
        s = Wt(a);
    return { ...a,
        shouldHide: s
    }
}
const _e = De(ke),
    Ot = ({
        promoData: a,
        promoMetadata: s,
        promoDataIsFromQueryParam: l = !1,
        initialPromoCoupon: n,
        initialPromoCouponFromQueryParam: S = !1,
        reactivationWorkspaceId: p,
        initialSeats: h
    } = {}) => {
        const t = oe(),
            b = !!t ? .isFreeWorkspace(),
            {
                count: M,
                isLoading: _
            } = nt(t ? .id),
            c = !_ && M > 0 ? M : void 0;
        let i = ve(),
            y = it();
        b && (i = c ? ? i, y = c ? ? y);
        const r = typeof window < "u" ? new URLSearchParams(window ? .location.search) : new URLSearchParams,
            m = Le(),
            N = m ? ? n,
            A = m ? !0 : !!(S && n),
            {
                data: B,
                isLoading: u
            } = Ae(N ? ? "", A, p);
        let o = a,
            j = l;
        !a && B && (o = B, j = A);
        const k = o ? .coupon === se && o.state === "eligible",
            C = r.get(ie),
            g = r.get(le),
            d = g && _e(g) ? g : s ? .duration ? .period && _e(s ? .duration ? .period) ? s ? .duration ? .period : ke.FLEXIBLE,
            [v, D] = w.useState(d),
            [q, U] = w.useState(() => h ? ? (C && !isNaN(parseInt(C, 10)) ? parseInt(C, 10) : void 0) ? ? Math.max(y, i));
        return {
            promoData: o,
            promoDataIsFromQueryParam: j,
            isPromoDataLoading: u,
            selectedPlan: v,
            setSelectedPlan: D,
            numSeats: q,
            setNumSeats: T => U(I => {
                const R = typeof T == "function" ? T(I) : T;
                return Math.max(R, i)
            }),
            minTeamSeats: i,
            TEAM_FREE_TRIAL_COUPON_IsEligible: k
        }
    };
var We = (a => (a.FLEXIBLE = "month", a.ANNUAL = "year", a))(We || {});
const Oe = "business-welcome-back-1-free-seat",
    Ut = De(We),
    sa = a => {
        const s = w.useRef(!1),
            l = we(),
            n = l.hash.split("#")[1] === Fe || l.hash.split("#")[1] === ce,
            S = oe(),
            {
                data: p
            } = Tt(),
            h = new URLSearchParams(l.search).get(ae),
            t = h != null ? p ? .accountItems.find(u => u.id === h) : void 0,
            b = h != null && p == null,
            M = !s.current && n && S && !a && !b,
            {
                country: _
            } = Ft(),
            c = Nt({
                country: _,
                currentAccount: S,
                location: "team-workspace-purchase-modal",
                pricingPlanIsTypeBusiness: !0
            }),
            i = w.useMemo(() => !c || !t ? c : { ...c,
                currency: t.mustGetSubscriptionBillingCurrency("team-workspace-purchase-modal")
            }, [t, c]),
            y = Le(),
            r = !!y,
            {
                data: m,
                isLoading: N
            } = Ae(y ? ? "", r, t ? .id),
            A = ve(),
            B = ot.useRef(void 0);
        w.useEffect(() => {
            !M || !i || (Se.setPurchaseWorkspaceData({
                minimumSeats: A,
                billingDetails: i,
                existingAccount: t,
                promoData: m,
                promoDataIsFromQueryParam: m && r ? !0 : void 0
            }), s.current = !0)
        }, [S, i, A, n, a, y, m, r, t, b, M]), w.useEffect(() => {
            const u = B.current;
            B.current = N, !(N || !s.current) && u && i && Se.setPurchaseWorkspaceData({
                minimumSeats: A,
                billingDetails: i,
                existingAccount: t,
                promoData: m,
                promoDataIsFromQueryParam: m && r ? !0 : void 0
            })
        }, [m, N, A, i, r, t])
    },
    Ht = At.p `text-base font-medium mb-3`,
    Ee = me({
        winbackPromoBannerTitle: {
            id: "selectTeamPlanModal.winbackPromoBannerTitle",
            defaultMessage: "Welcome Back promo applied"
        },
        winbackPromoBannerDescription: {
            id: "selectTeamPlanModal.winbackPromoBannerDescription",
            defaultMessage: "Enjoy 1 free seat for a month -- discount applied at checkout"
        }
    }),
    K = me({
        preDiscountTotal: {
            id: "teamBilling.nativeCurrency.preDiscountTotal",
            defaultMessage: "{amount}"
        },
        breakdownAmount: {
            id: "teamBilling.nativeCurrency.breakdownAmount",
            defaultMessage: "{amount}/seat"
        },
        discountAmount: {
            id: "teamBilling.nativeCurrency.discountAmount",
            defaultMessage: "{amount}"
        },
        promoCodeApplied: {
            id: "teamBilling.nativeCurrency.promoCodeApplied",
            defaultMessage: "Promo code {promoCode} applied"
        },
        totalAmount: {
            id: "teamBilling.nativeCurrency.totalAmount",
            defaultMessage: "{currencyCode} {totalAmount}"
        },
        afterPromoAmount: {
            id: "promo.teamFreeTrial.afterPromoAmountWithFormattedCurrency",
            defaultMessage: "After promotional period {amount} per month"
        }
    }),
    Qt = ({
        isOpen: a,
        onClose: s,
        onSubmit: l,
        minimumSeats: n,
        billingDetails: S,
        existingAccount: p,
        isDirectFlow: h = !1,
        promoData: t = void 0,
        promoDataIsFromQueryParam: b = void 0,
        promoMetadata: M = void 0,
        promoCode: _ = void 0
    }) => {
        const c = oe(),
            {
                trackSelectedPixels: i
            } = Pe({
                key: St.SELF_SERVE_BUSINESS
            }),
            {
                trackSelectedPixels: y
            } = Pe({
                key: "team-secondary"
            }),
            r = bt(f => f.purchaseWorkspaceData),
            m = r ? .existingAccount ? .id != null && r.existingAccount.isDeactivated() ? r.existingAccount.id : null,
            {
                data: N,
                isLoading: A
            } = ct(p ? .id),
            B = mt(N),
            u = p != null && A,
            {
                selectedPlan: o,
                setSelectedPlan: j,
                numSeats: k,
                setNumSeats: C,
                minTeamSeats: g,
                TEAM_FREE_TRIAL_COUPON_IsEligible: E
            } = Ot({
                promoData: t,
                promoDataIsFromQueryParam: b,
                reactivationWorkspaceId: m
            }),
            d = Math.max(g, n, B),
            v = n > g,
            D = Math.max(k, d),
            q = w.useCallback(f => {
                C(F => {
                    const Y = Math.max(F, d),
                        te = typeof f == "function" ? f(Y) : f;
                    return Math.max(te, d)
                })
            }, [d, C]),
            [U, x] = w.useState(!1),
            T = de(),
            {
                data: I,
                isLoading: R,
                error: X
            } = Ne({
                countryCode: S.country,
                currency: S.currency
            }),
            fe = S.currency,
            pe = w.useMemo(() => I ? Be(fe, I) : null, [I, fe]),
            Z = d,
            J = t ? .coupon === se,
            he = t ? .state === "not_eligible" && J,
            ge = t ? .state === "temporary_disabled" && J,
            Ue = t ? .state === "offline" && J,
            L = ut(isNaN(D) ? 0 : D, Z, ht),
            H = w.useMemo(() => c ? .subscriptionAnalyticsParams, [c]);
        w.useEffect(() => {
            const f = r ? .referrer ? ? document.referrer;
            z.logEvent("Account Pay: Select Team Plan Modal Show", { ...H,
                referrer: f
            })
        }, [H, r ? .referrer]);
        const He = f => {
                switch (f) {
                    case "month":
                        z.logEvent("Account Pay: Team Plan Selection Clicked", { ...H,
                            buttonType: "Continue",
                            numberOfSeats: L,
                            planLength: Me.MONTHLY
                        });
                        break;
                    case "year":
                        z.logEvent("Account Pay: Select Team Plan Modal Clicked", { ...H,
                            buttonType: "Continue",
                            numberOfSeats: L,
                            planLength: Me.ANNUAL
                        });
                        break
                }
            },
            Qe = (f, F) => {
                z.logEventWithStatsig("Account Pay: Select Team Plan Modal Clicked", "chatgpt_select_team_plan_modal_continue_to_billing_clicked", { ...H,
                    buttonType: "Continue",
                    numberOfSeats: F,
                    planLength: f
                }), je.addAction("chatgpt_funnel.team_plan_modal_checkout_initiated", {
                    planLength: f,
                    numberOfSeats: F.toString(),
                    accountId: c ? .id
                }), t ? .state === "eligible" && J && xt.logCouponApplied(t.coupon)
            },
            Ye = () => {
                z.logEvent("Account Pay: Select Team Plan Modal Dismiss", H)
            },
            W = we(),
            ye = w.useMemo(() => W.hash.split("#")[1] === ce, [W.hash]);
        w.useEffect(() => {
            const f = new URL(window.location.href),
                F = new URLSearchParams;
            F.set(ie, L.toString()), F.set(le, o), F.set("referrer", r ? .referrer ? ? document.referrer), m && F.set(ae, m);
            const Y = b && t ? .coupon ? t.coupon : null;
            Y && F.set(ne, Y);
            const te = h || ye ? `#${ce}` : `#${Fe}`,
                Ze = `${W.pathname}?${F.toString()}${te}`,
                V = f.searchParams,
                Je = V.get(ie) === L.toString(),
                et = V.get(le) === o,
                tt = Y == null && !V.has(ne) || V.get(ne) === Y,
                at = m == null && !V.has(ae) || V.get(ae) === m,
                st = window.location.hash === te;
            (!Je || !et || !tt || !at || !st) && window.history.pushState({
                from: W.pathname + W.search
            }, "", Ze)
        }, [L, h, ye, W.pathname, W.search, W.hash, o, t ? .coupon, b, m, r ? .referrer]);
        const O = !!M && o === "month";
        if (R || X != null || I == null || pe == null) return null;
        const {
            flexibleBillingPlan: Ve,
            annualBillingPlan: Ke
        } = pe;
        let Q = Ve,
            xe = null;
        if (E && I.currencyConfig.promos.business_free_trial.enabled && !O) {
            xe = Re();
            const f = { ...$.teamFreeTrialMonthlyCost
                },
                F = { ...$.teamFreeTrialMonthlyStructure,
                    defaultMessage: `Then ${T.formatMessage(Q.currencySign)}${Q.monthlyCost} seat/mo after 1 month`,
                    id: "promo.teamFreeTrial.monthlyPlanStructure",
                    description: "Subsequent pricing description for teamFreeTrial promo. Describing the monthly then the annual price after."
                };
            Q = { ...Q,
                cost: f,
                costStructure: F,
                discountedMonthlyCost: xe ? ? Q.discountedMonthlyCost
            }
        }
        let ee;
        he ? ee = $.teamFreeTrialNotEligible : ge ? ee = $.teamFreeTrialTemporarilyDisabled : ee = $.teamFreeTrialOffline;
        const $e = he || ge || Ue,
            Te = U || u || L < Z,
            Ge = async () => {
                Te || (x(!0), Qe(o, L), i(), y(), await l(o, L), x(!1))
            },
            qe = () => {
                s(), Ye()
            },
            ze = e.jsx(Yt, {
                numSeats: L,
                selectedPlan: o,
                billingDetails: S,
                totalLabel: G.allPlansTodayTotal,
                billDate: "today",
                promoData: t,
                shouldApplyPromoMetadata: O,
                promoMetadata: O ? M : void 0,
                promoCode: O ? _ : void 0
            }),
            re = E,
            Xe = t ? .coupon === Oe && t.state === "eligible" && o === "month" && !O;
        return e.jsx(Mt, {
            testId: "modal-workspace-purchase",
            type: "success",
            isOpen: a,
            onClose: s,
            size: "fullscreen",
            noPadding: !0,
            removePopoverStyling: !0,
            showCloseButton: !0,
            children: e.jsxs("div", {
                className: "grid grid-flow-row grid-cols-1 md:h-full md:grid-cols-2",
                children: [e.jsx("div", {
                    className: "flex-column col-span-1 flex justify-center p-5 md:grid-cols-2",
                    children: e.jsxs("div", {
                        className: "flex w-full max-w-[400px] flex-col items-center md:max-w-[600px]",
                        children: [e.jsx(_t, {
                            className: "mt-8 mb-6 h-8 w-8 md:fixed md:start-4 md:top-4 md:mt-0 md:h-6 md:w-6"
                        }), $e && e.jsx("div", {
                            className: "mb-4 w-full",
                            "data-testid": "team-promo-banner",
                            children: e.jsx(dt, {
                                content: T.formatMessage(ee),
                                type: "info"
                            })
                        }), e.jsx("div", {
                            className: "mb-8 text-3xl font-medium md:mt-[120px]",
                            children: e.jsx(P, {
                                id: "selectTeamPlanModal.title",
                                defaultMessage: "Pick your plan"
                            })
                        }), Xe && e.jsxs("div", {
                            className: "mb-6 w-full rounded-xl border border-[rgba(16,163,127,0.35)] bg-[rgba(16,163,127,0.14)] px-4 py-3 text-start shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
                            "data-testid": "team-winback-promo-banner",
                            children: [e.jsx("div", {
                                className: "text-sm font-semibold text-white",
                                children: e.jsx(P, { ...Ee.winbackPromoBannerTitle
                                })
                            }), e.jsx("div", {
                                className: "mt-1 text-sm text-[rgba(255,255,255,0.8)]",
                                children: e.jsx(P, { ...Ee.winbackPromoBannerDescription
                                })
                            })]
                        }), e.jsxs(ft, {
                            className: Ie("col-span-3 mb-6 grid w-full gap-4 md:col-span-2 md:grid-cols-2"),
                            defaultValue: o,
                            onValueChange: f => {
                                Ut(f) && (j(f), He(f))
                            },
                            children: [e.jsx(Ce, {
                                billingType: "year",
                                ...Ke,
                                selectedValue: o,
                                hideSavingsMessage: re || O
                            }), e.jsx(Ce, {
                                billingType: "month",
                                ...Q,
                                selectedValue: o,
                                hideSavingsMessage: re || O,
                                showWelcomeOfferLabel: re && !O
                            })]
                        }), e.jsx(pt, {
                            numSeats: L,
                            minSeats: Z,
                            disabled: u,
                            setNumSeats: q
                        }), e.jsx("div", {
                            className: "text-token-text-secondary self-start text-xs",
                            children: T.formatMessage(v ? {
                                id: "selectTeamPlanModal.seatsDescriptionPaidSeats",
                                defaultMessage: "Add more seats at any time. This workspace already has {minSeats} paid seats, so you need at least {minSeats} seats.",
                                description: "Description for the seats selection when paid seats determine the minimum seat count."
                            } : {
                                id: "selectTeamPlanModal.seatsDescription",
                                defaultMessage: "Add more seats at any time. Minimum of {minSeats} seats.",
                                description: "Description for the seats selection"
                            }, {
                                minSeats: Z
                            })
                        })]
                    })
                }), e.jsx("div", {
                    className: "col-span-3 flex h-full flex-col items-center overflow-hidden p-6 md:col-span-1 md:shadow-lg",
                    children: e.jsxs("div", {
                        className: "flex w-full max-w-[400px] flex-col md:mt-[120px]",
                        children: [e.jsx(Ht, {
                            className: "mb-8 text-xl font-medium",
                            children: e.jsx(P, { ...G.summaryTitle
                            })
                        }), ze, e.jsx(be, {
                            title: T.formatMessage(G.continueToBillingButton),
                            onClick: Ge,
                            disabled: Te,
                            loading: U,
                            color: "green",
                            className: "mt-8 w-full rounded-xl"
                        }), e.jsx(be, {
                            title: T.formatMessage(G.cancel),
                            onClick: qe,
                            color: "ghost",
                            className: "mt-4 w-full rounded-xl"
                        })]
                    })
                })]
            })
        })
    },
    Yt = a => {
        const {
            numSeats: s,
            selectedPlan: l,
            billingDetails: n,
            totalLabel: S,
            promoData: p,
            extraDiscountAmount: h,
            nonZeroDiscountClassName: t = "text-[#10A37F]",
            footerNote: b,
            billDate: M,
            shouldApplyPromoMetadata: _,
            promoMetadata: c,
            promoCode: i
        } = a, y = de(), r = w.useCallback(x => y.formatNumber(x, {
            style: "currency",
            currency: n.currency,
            currencyDisplay: "narrowSymbol",
            trailingZeroDisplay: "stripIfInteger"
        }), [n.currency, y]), {
            data: m,
            isLoading: N,
            error: A
        } = Ne({
            countryCode: n.country,
            currency: n.currency
        });
        if (N || A != null || !m) return null;
        const {
            flexibleBillingPlan: B,
            annualBillingPlan: u
        } = Be(n.currency, m), o = B, j = l === "month" ? o : u, k = gt[l], C = (s || 0) * (l === "year" ? u.monthlyCost * 12 : o.monthlyCost);
        let g = (s || 0) * j.unitCost,
            E = C - g,
            d = 0,
            v = C,
            D = !1;
        const q = p ? .coupon === se && m.currencyConfig.promos.business_free_trial.enabled,
            U = p ? .coupon === Oe && p.state === "eligible" && l === "month" && !_;
        if (_ && c) {
            const x = c.discount;
            let T = null,
                I = null;
            if ("percentage" in x && typeof x.percentage == "number" ? T = o.monthlyCost * (1 - x.percentage / 100) : "value" in x && x.currency_code === n.currency && (I = x.value), T != null && !Number.isNaN(T)) {
                const R = T * (s || 0);
                E = C - R, g = R, d = R
            } else if (I != null) {
                const R = Math.min(C, I),
                    X = C - R;
                E = R, g = X, d = X
            }
            v = s * o.monthlyCost, D = c.duration != null
        }
        if (p != null && q && p.state === "eligible" && l === "month" && !_) {
            D = !0;
            const x = Re(),
                T = Bt;
            s <= T ? (d = x, v = s * o.monthlyCost, E = v - d, g = d) : (d = x + (s - T) * o.monthlyCost, v = s * o.monthlyCost, E = v - d, g = d)
        }
        if (U) {
            const x = Math.min(C, o.monthlyCost);
            D = !0, v = C, E += x, g = Math.max(g - x, 0)
        }
        return h && h > 0 && (E += h, g = Math.max(g - h, 0)), e.jsxs("div", {
            className: "flex grow flex-col text-sm",
            children: [e.jsxs("div", {
                className: "text-token-text-secondary flex w-full justify-between text-sm",
                children: [e.jsx("div", {
                    className: "flex",
                    children: e.jsx(P, { ...k.name
                    })
                }), e.jsx("div", {
                    className: "flex",
                    children: e.jsx(P, { ...K.preDiscountTotal,
                        values: {
                            amount: r(C)
                        }
                    })
                })]
            }), e.jsxs("div", {
                className: "text-token-text-tertiary flex w-full justify-between text-xs",
                children: [e.jsx("div", {
                    className: "flex",
                    children: e.jsx(P, { ...k.breakdown,
                        values: {
                            numSeats: s
                        }
                    })
                }), e.jsx("div", {
                    className: "flex",
                    children: e.jsx(P, { ...K.breakdownAmount,
                        values: {
                            amount: r(j.monthlyCost)
                        }
                    })
                })]
            }), e.jsxs("div", {
                className: "text-token-text-secondary mt-3 flex w-full justify-between text-sm",
                children: [e.jsx("div", {
                    className: "flex",
                    children: e.jsx(P, { ...G.planDiscountLabel
                    })
                }), e.jsx("div", {
                    className: Ie("flex", E > 0 && "font-medium", E > 0 && t),
                    children: e.jsx(P, { ...K.discountAmount,
                        values: {
                            amount: r(-E)
                        }
                    })
                })]
            }), p ? .coupon === se && p.state === "eligible" && l === "month" && !_ && e.jsx("div", {
                className: "text-token-text-tertiary text-xs",
                children: e.jsx(P, { ...$.teamFreeTrialBelowDiscount
                })
            }), _ && c ? .summary && e.jsx("div", {
                className: "text-token-text-tertiary text-xs",
                children: c.summary
            }), _ && i && e.jsx("div", {
                className: "text-token-text-tertiary text-xs",
                children: e.jsx(P, { ...K.promoCodeApplied,
                    values: {
                        promoCode: i
                    }
                })
            }), k.discountDescription && u.discountedMonthlyCost < u.monthlyCost && l === "year" && e.jsx("div", {
                className: "text-token-text-tertiary text-xs",
                children: e.jsx(P, { ...k.discountDescription,
                    values: {
                        discountPercentage: yt(u.monthlyCost, u.discountedMonthlyCost)
                    }
                })
            }), e.jsx("hr", {
                className: "border-token-border-default my-3"
            }), e.jsxs("div", {
                className: "flex w-full justify-between text-base font-medium",
                "data-testid": "team-billing-total-row",
                children: [e.jsx("div", {
                    className: "flex",
                    children: e.jsx(P, { ...S
                    })
                }), e.jsx("div", {
                    className: "flex",
                    children: D ? e.jsxs(e.Fragment, {
                        children: [y.formatMessage(j.currencyCode), " ", r(g)]
                    }) : e.jsx(P, { ...K.totalAmount,
                        values: {
                            currencyCode: y.formatMessage(j.currencyCode),
                            totalAmount: r(g)
                        }
                    })
                })]
            }), e.jsxs("div", {
                className: "text-token-text-tertiary mt-2 text-xs",
                children: [D ? e.jsx(P, { ...K.afterPromoAmount,
                    values: {
                        amount: r(v)
                    }
                }) : M === "today" ? e.jsx(P, { ...k.billedToday
                }) : e.jsx(P, { ...k.billedOnDate,
                    values: {
                        billDate: M
                    }
                }), b && e.jsx("div", {
                    className: "mt-1",
                    children: b
                })]
            })]
        })
    },
    Vt = ({
        billingDetails: a,
        checkoutFrom: s,
        existingAccount: l,
        promoData: n,
        promoDataIsFromQueryParam: S,
        promoMetadata: p,
        promoCode: h
    }) => {
        const t = de(),
            b = Pt(),
            M = Ct(),
            {
                prepareCheckoutSession: _,
                navigateToCheckout: c
            } = vt(),
            i = oe(),
            y = l ? ? (i && i.isFreeWorkspace() ? i : void 0),
            [r] = ue(),
            m = r.get("from_webview") === "ios",
            N = rt(t, y, M),
            {
                eligible: A,
                campaignId: B
            } = lt();
        let u, o = !1;
        return n ? (u = n, o = !!S) : A && !p && !h && (u = {
            coupon: B,
            state: "eligible",
            redemption: null
        }, o = !1), {
            effectivePromoData: u,
            handleBusinessCheckoutRedirect: async (k, C, g = !1, E) => {
                if (!Et()) return wt({
                    fallbackScreenHint: "login",
                    callbackUrl: window.location.href
                }), !1;
                try {
                    const d = {
                            entry_point: kt.TEAM_WORKSPACE_PURCHASE_MODAL,
                            plan_name: "chatgptteamplan",
                            team_plan_data: {
                                workspace_name: N,
                                price_interval: k,
                                seat_quantity: C,
                                existing_workspace_id: y ? .id
                            },
                            billing_details: a,
                            cancel_url: window.location.href,
                            promo_campaign: u ? .coupon && k === "month" ? {
                                promo_campaign_id: u ? .coupon,
                                is_coupon_from_query_param: o
                            } : void 0,
                            ...g ? {} : {
                                checkout_ui_mode: "redirect"
                            },
                            promo_code: h
                        },
                        v = await _(d, {
                            fromiOSWebview: m
                        });
                    return await c(v, {
                        checkoutFrom: s,
                        checkoutPayload: d,
                        ...E
                    }), !0
                } catch (d) {
                    return je.addError(d), b.warning(t.formatMessage(G.paymentErrorWarning), {
                        hasCloseButton: !0
                    }), !1
                }
            }
        }
    },
    oa = ({
        isOpen: a,
        onClose: s,
        minimumSeats: l,
        billingDetails: n,
        checkoutFrom: S,
        existingAccount: p = void 0,
        promoData: h = void 0,
        promoDataIsFromQueryParam: t = void 0,
        promoMetadata: b = void 0,
        promoCode: M = void 0
    }) => {
        const {
            handleBusinessCheckoutRedirect: _,
            effectivePromoData: c
        } = Vt({
            billingDetails: n,
            checkoutFrom: S,
            existingAccount: p,
            promoData: h,
            promoDataIsFromQueryParam: t,
            promoMetadata: b,
            promoCode: M
        });
        return e.jsx(Qt, {
            isOpen: a,
            onClose: s,
            onSubmit: async (i, y) => {
                await _(i, y)
            },
            minimumSeats: l,
            billingDetails: n,
            existingAccount: p,
            promoData: c,
            promoDataIsFromQueryParam: c && h ? !!t : !1,
            promoMetadata: b ? ? void 0,
            promoCode: M ? ? void 0
        })
    };
export {
    Yt as B, It as P, We as T, se as a, Ot as b, Vt as c, Le as d, sa as e, oa as f, Ut as i, $ as t, aa as u
};
//# sourceMappingURL=e8eebcb1-hl1q1mqbpavqpner.js.map