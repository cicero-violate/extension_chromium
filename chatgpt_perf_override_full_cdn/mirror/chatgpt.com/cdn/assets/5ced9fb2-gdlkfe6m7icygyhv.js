import {
    u as Q,
    r as ne,
    x as Oe,
    j as t,
    c as Y,
    o as p
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    cq as ze,
    J as Be,
    z as Ge,
    A,
    Q as me,
    c7 as le,
    he as Ye,
    a0 as $e,
    _ as ae,
    S as oe,
    H as Ke,
    L as ge,
    E as fe,
    cT as Pe,
    af as be,
    cf as He,
    $ as q
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    hD as qe,
    lb as Qe,
    hC as Ve,
    hE as _e,
    ce as Je,
    cT as We,
    ds as Xe,
    cu as X,
    ct as Z,
    lc as xe,
    ld as Me,
    le as ye,
    lf as he,
    lg as ee
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    i as Ze,
    C as et
} from "./6fd89734-beaqo25ksg3811yj.js";
import {
    g as tt
} from "./feff6cd4-h0ziu001e0pw1st7.js";
import {
    a as te
} from "./f43ce1f0-cynln2ayrnjv35lb.js";
import {
    g as we
} from "./b8f3be97-cabh0vwwkxj2eime.js";
const at = ze(a => ({
    recentlyDowngraded: !1,
    recentlyUpgraded: !1,
    recentlyCanceled: !1,
    setRecentlyDowngraded: e => a({
        recentlyDowngraded: e
    }),
    setRecentlyUpgraded: e => a({
        recentlyUpgraded: e
    }),
    setRecentlyCanceled: e => a({
        recentlyCanceled: e
    })
}));

function Se(a) {
    switch (a) {
        case A.FREE:
            return "chatgptfreeplan";
        case A.GO:
            return "chatgptgoplan";
        case A.PLUS:
            return "chatgptplusplan";
        case A.PRO:
            return "chatgptpro";
        case A.PROLITE:
            return "chatgptprolite";
        case A.SELF_SERVE_BUSINESS:
            return "chatgptteamplan";
        default:
            throw new Error(`Invalid plan type: ${a}`)
    }
}

function H(a) {
    return a === A.PROLITE ? "Pro" : Xe(a.toLowerCase())
}

function Ce(a) {
    ae.logEvent("Toggle Plan Management Modal", {
        isOpen: a
    }), oe.logEvent("chatgpt_toggle_plan_management_modal", null, {
        isOpen: String(a)
    })
}

function je(a) {
    return a === A.PRO || a === A.PROLITE
}

function V({
    planType: a,
    initialPlanType: e,
    updatedPlanType: s
}) {
    if (je(e) && je(s)) switch (a) {
        case A.PRO:
            return "Pro 20x";
        case A.PROLITE:
            return "Pro 5x"
    }
    return H(a)
}

function st({
    isOpen: a,
    onClose: e,
    accountId: s,
    initialPlanType: l,
    updatedPlanType: n,
    billingDetails: i,
    promoMetadata: d,
    promoCode: o,
    fullPriceResumeDateString: g,
    onPromoClose: c
}) {
    "use no forget";
    const u = Q(),
        m = Be(),
        N = Ge(),
        [r, x] = ne.useState(!1),
        h = d ? .plan_type_change === "equal",
        P = l === n && !h,
        f = we(l) < we(n),
        w = Se(n);
    ne.useEffect(() => {
        Ce(!0)
    }, []);
    const M = () => {
            Ce(!1), e()
        },
        C = qe(s),
        E = Qe(s),
        b = Ve(s),
        {
            data: y,
            isError: j,
            isLoading: S
        } = _e(s, void 0, w, void 0, h),
        {
            data: _,
            isLoading: z,
            error: T
        } = Je({
            countryCode: i.country,
            currency: i.currency
        });
    !P && (j || T != null) && (N ? .planType === A.SELF_SERVE_BUSINESS ? m.warning(u.formatMessage({
        id: "planManagement.errorUpgradingTeam",
        defaultMessage: "Updates to {capitalizedUpdatedPlanType} aren't yet supported for users with Team subscriptions"
    }, {
        capitalizedUpdatedPlanType: H(n)
    }), {
        hasCloseButton: !0
    }) : m.warning(u.formatMessage({
        id: "planManagement.errorFetchingPreview",
        defaultMessage: "There was a problem updating your subscription"
    }), {
        hasCloseButton: !0
    }), e());
    const F = G => new Intl.DateTimeFormat(u.locale, {
            year: "numeric",
            month: "short",
            day: "numeric"
        }).format(G),
        D = N ? .getDaysUntilPlanRenews();
    let v = typeof D == "number" && D > 0 ? me(new Date, D) : null,
        U = v ? F(v) : "";
    const R = N ? .getDaysUntilSubscriptionCancelAt();
    v && typeof D == "number" && typeof R == "number" && R > 0 && R > D && (v = me(new Date, R), U = F(v));
    const {
        recentlyCanceled: k,
        setRecentlyUpgraded: I,
        setRecentlyDowngraded: L
    } = at(), O = N ? .willRenewSubscription() || k, [B, $] = ne.useState(!1), Te = Oe();
    if (!N) return null;
    const ie = h ? v : y ? .renewal_date ? new Date(y.renewal_date) : null,
        de = ie ? ie.toLocaleDateString(u.locale, {
            year: "numeric",
            month: "long",
            day: "numeric"
        }) : u.formatMessage(le.notApplicable),
        ce = g ? new Date(g).toLocaleDateString(u.locale, {
            year: "numeric",
            month: "long",
            day: "numeric"
        }) : u.formatMessage(le.notApplicable),
        J = Ye(i.currency),
        Fe = Re(i.currency, _),
        Ae = d ? .duration ? .num_periods ? ? 1,
        {
            formattedDiscountedCost: W
        } = d ? .discount && !z && !T && _ ? tt(u, Ae, d.discount, J.code.defaultMessage ? .toString(), _, n) : {
            formattedDiscountedCost: null
        },
        se = async G => {
            x(!0);
            try {
                if (P) await E.mutateAsync(s), m.success(U === "" ? u.formatMessage({
                    id: "planManagement.successfullyRenewedSubscription2",
                    defaultMessage: "Your subscription has been renewed."
                }) : u.formatMessage({
                    id: "planManagement.successfullyRenewedSubscription",
                    defaultMessage: "Your subscription has been renewed. Your subscription will auto-renew on {renewalDate}."
                }, {
                    renewalDate: U
                }), {
                    hasCloseButton: !0
                }), ae.logEvent("Renew Plan Success", {
                    planType: G
                }), oe.logEvent("chatgpt_renew_plan_success", null, {
                    planType: G
                });
                else if (h && o) await C.mutateAsync({
                    accountId: s,
                    updatedPlan: void 0,
                    updatedPriceInterval: void 0,
                    updatedSeats: void 0,
                    updatedPromoCode: o
                }), m.success(U === "" ? u.formatMessage({
                    id: "planManagement.successfullyRenewedSubscriptionPromotion",
                    defaultMessage: "Your subscription has been updated and will auto-renew at the promotional rate of {promotionalCost} during your next billing cycle."
                }, {
                    promotionalCost: W
                }) : u.formatMessage({
                    id: "planManagement.successfullyRenewedSubscriptionPromotion2",
                    defaultMessage: "Your subscription has been updated and will auto-renew at your promotional rate of {promotionalCost} on {renewalDate}."
                }, {
                    renewalDate: U,
                    promotionalCost: W
                }), {
                    hasCloseButton: !0
                });
                else {
                    O || (await E.mutateAsync(s), $(!0));
                    const ke = o ? void 0 : w;
                    await C.mutateAsync({
                        accountId: s,
                        updatedPlan: ke,
                        updatedPriceInterval: void 0,
                        updatedSeats: void 0,
                        updatedPromoCode: o ? ? void 0
                    });
                    const pe = f ? u.formatMessage({
                        id: "planManagement.successfullyUpdatedSubscription",
                        defaultMessage: "You're now subscribed to ChatGPT {capitalizedUpdatedPlanType}"
                    }, {
                        capitalizedUpdatedPlanType: H(n)
                    }) : u.formatMessage({
                        id: "planManagement.updatedSubscriptionToPlus",
                        defaultMessage: "Your subscription has been updated. Your subscription will change to {capitalizedUpdatedPlanType} on {renewalDateFormatted}."
                    }, {
                        renewalDateFormatted: de,
                        capitalizedUpdatedPlanType: H(n)
                    });
                    if (G !== n) {
                        const Ie = f ? "Upgrade Plan Success" : "Downgrade Plan Success",
                            Le = f ? "chatgpt_upgrade_plan_success" : "chatgpt_downgrade_plan_success";
                        ae.logEvent(Ie, {
                            fromPlan: G,
                            toPlan: n
                        }), oe.logEvent(Le, null, {
                            fromPlan: G,
                            toPlan: n
                        }), f ? I(!0) : L(!0), m.success(pe, {
                            hasCloseButton: !0
                        })
                    }
                    localStorage.setItem(`subscriptionUpdateMessage_${N.id}`, pe)
                }
                We(), Te.invalidateQueries(Ke());
                const K = ge.getItem(fe.CheckoutFrom);
                Ze(K) && (ge.removeItem(fe.CheckoutFrom), window.location.href = et[K]), e()
            } catch (K) {
                ae.logEventWithStatsig("Plan Management Modal Handle Update Error", "chatgpt_plan_management_modal_handle_update_error", { ...K ? .detail ? .error_type && {
                        error_type: K.detail.error_type
                    }
                }), K ? .detail ? .error_type === "card_declined" ? m.warning(u.formatMessage({
                    id: "planManagement.cardDeclinedError",
                    defaultMessage: "Payment error. Your card may be invalid or authentication may be needed."
                }), {
                    hasCloseButton: !0
                }) : m.warning(u.formatMessage({
                    id: "planManagement.errorUpdatingSubscription",
                    defaultMessage: "There was a problem updating your subscription"
                }), {
                    hasCloseButton: !0
                }), B && await b.mutateAsync({
                    accountId: s
                }), e()
            } finally {
                x(!1), o && c ? .()
            }
        },
        ue = Ee(n, Fe);
    return t.jsx($e, {
        testId: "modal-plan-management",
        type: "success",
        isOpen: a,
        onClose: M,
        size: "custom",
        noPadding: !0,
        className: "max-w-xl",
        showCloseButton: !0,
        title: u.formatMessage({
            id: "planManagementModal.title",
            defaultMessage: "Confirm plan changes"
        }),
        removePopoverStyling: !0,
        headerClassName: "py-4! px-6! [&_h2]:font-medium",
        children: S || z ? t.jsx(ve, {}) : h || P && N ? t.jsx(ct, {
            account: N,
            renewalDate: U,
            handleUpdate: () => se(l),
            isUpdating: r,
            onClose: M,
            targetPlanCost: ue,
            currencySymbol: J,
            promoMetadata: d,
            fullPriceResumeDateFormatted: ce,
            formattedDiscountedCost: W,
            renewalDateFormatted: de
        }) : j || T != null || !y ? null : f ? t.jsx(nt, {
            accountId: s,
            handleUpdate: () => se(l),
            isUpdating: r,
            onClose: M,
            initialPlanType: l,
            updatedPlanType: n,
            currencySymbol: J
        }) : t.jsx(dt, {
            renewalDate: y.renewal_date,
            handleUpdate: () => se(l),
            isUpdating: r,
            onClose: M,
            targetPlanCost: ue,
            currentPlanType: l,
            updatedPlanType: n,
            currencySymbol: J,
            promoMetadata: d,
            fullPriceResumeDateFormatted: ce,
            formattedDiscountedCost: W
        })
    })
}

function ve() {
    "use forget";
    const a = Y.c(1);
    let e;
    return a[0] === Symbol.for("react.memo_cache_sentinel") ? (e = t.jsx("div", {
        className: "flex items-center justify-center p-6",
        children: t.jsx(He, {})
    }), a[0] = e) : e = a[0], e
}

function Ue(a) {
    "use forget";
    const e = Y.c(12),
        {
            adjustmentMessage: s,
            proratedCreditMessage: l,
            proratedCreditInfoMessage: n
        } = a;
    let i;
    e[0] !== s ? (i = t.jsx("span", {
        className: "font-semibold",
        children: s
    }), e[0] = s, e[1] = i) : i = e[1];
    let d;
    e[2] !== l ? (d = t.jsx("span", {
        className: "font-semibold text-green-600",
        children: l
    }), e[2] = l, e[3] = d) : d = e[3];
    let o;
    e[4] !== i || e[5] !== d ? (o = t.jsxs("div", {
        className: "mt-4 flex justify-between",
        children: [i, d]
    }), e[4] = i, e[5] = d, e[6] = o) : o = e[6];
    let g;
    e[7] !== n ? (g = t.jsx("span", {
        className: "text-token-text-secondary text-sm",
        children: n
    }), e[7] = n, e[8] = g) : g = e[8];
    let c;
    return e[9] !== o || e[10] !== g ? (c = t.jsxs("div", {
        children: [o, g]
    }), e[9] = o, e[10] = g, e[11] = c) : c = e[11], c
}

function nt(a) {
    "use forget";
    const e = Y.c(42),
        {
            accountId: s,
            handleUpdate: l,
            isUpdating: n,
            onClose: i,
            currencySymbol: d,
            updatedPlanType: o,
            initialPlanType: g
        } = a,
        c = Q();
    let u;
    e[0] !== o ? (u = Se(o), e[0] = o, e[1] = u) : u = e[1];
    const {
        data: m,
        isError: N,
        isLoading: r
    } = _e(s, void 0, u);
    if (r) {
        let _;
        return e[2] === Symbol.for("react.memo_cache_sentinel") ? (_ = t.jsx(ve, {}), e[2] = _) : _ = e[2], _
    }
    if (N || !m) return null;
    let x, h, P;
    if (e[3] !== d || e[4] !== m || e[5] !== g || e[6] !== c || e[7] !== o) {
        const _ = rt({
            data: m,
            intl: c,
            currencySymbol: d,
            currentPlanType: g,
            nextPlanType: o
        });
        x = "px-6 pb-6", e[11] !== d || e[12] !== m || e[13] !== o ? (h = t.jsx(it, {
            data: m,
            currencySymbol: d,
            updatedPlanType: o
        }), e[11] = d, e[12] = m, e[13] = o, e[14] = h) : h = e[14], P = _.filter(ot).map(lt), e[3] = d, e[4] = m, e[5] = g, e[6] = c, e[7] = o, e[8] = x, e[9] = h, e[10] = P
    } else x = e[8], h = e[9], P = e[10];
    let f;
    e[15] === Symbol.for("react.memo_cache_sentinel") ? (f = t.jsx("hr", {
        className: "mt-4 mb-4"
    }), e[15] = f) : f = e[15];
    let w;
    e[16] !== d || e[17] !== m ? (w = t.jsx(De, {
        data: m,
        currencySymbol: d
    }), e[16] = d, e[17] = m, e[18] = w) : w = e[18];
    let M;
    e[19] !== m.default_payment_method ? (M = m.default_payment_method && t.jsxs(t.Fragment, {
        children: [t.jsx("hr", {
            className: "mt-4 mb-4"
        }), t.jsx(Ne, {
            defaultPaymentMethod: m.default_payment_method
        })]
    }), e[19] = m.default_payment_method, e[20] = M) : M = e[20];
    let C;
    e[21] !== c ? (C = c.formatMessage({
        id: "planUpgradeModal.cancel",
        defaultMessage: "Cancel"
    }), e[21] = c, e[22] = C) : C = e[22];
    let E;
    e[23] !== i || e[24] !== C ? (E = t.jsx(q, {
        title: C,
        color: "secondary",
        onClick: i
    }), e[23] = i, e[24] = C, e[25] = E) : E = e[25];
    let b;
    e[26] !== c ? (b = c.formatMessage({
        id: "planUpgradeModal.payNow",
        defaultMessage: "Pay now"
    }), e[26] = c, e[27] = b) : b = e[27];
    let y;
    e[28] !== l || e[29] !== n || e[30] !== b ? (y = t.jsx(q, {
        title: b,
        color: "primary",
        onClick: l,
        loading: n
    }), e[28] = l, e[29] = n, e[30] = b, e[31] = y) : y = e[31];
    let j;
    e[32] !== y || e[33] !== E ? (j = t.jsxs("div", {
        className: "mt-8 flex justify-end gap-2",
        children: [E, y]
    }), e[32] = y, e[33] = E, e[34] = j) : j = e[34];
    let S;
    return e[35] !== j || e[36] !== x || e[37] !== h || e[38] !== P || e[39] !== w || e[40] !== M ? (S = t.jsxs("div", {
        className: x,
        children: [h, P, f, w, M, j]
    }), e[35] = j, e[36] = x, e[37] = h, e[38] = P, e[39] = w, e[40] = M, e[41] = S) : S = e[41], S
}

function lt(a, e) {
    return t.jsx(Ue, {
        adjustmentMessage: a.adjustmentMessage,
        proratedCreditMessage: a.proratedCreditMessage,
        proratedCreditInfoMessage: a.proratedCreditInfoMessage
    }, e)
}

function ot(a) {
    return a.value !== 0
}

function rt({
    data: a,
    intl: e,
    currencySymbol: s,
    currentPlanType: l,
    nextPlanType: n
}) {
    return [{
        adjustmentMessage: t.jsx(p, {
            id: "planUpgradeModal.adjustment",
            defaultMessage: "Adjustment"
        }),
        proratedCreditMessage: t.jsx(p, {
            id: "planUpgradeModal.proratedCredit",
            defaultMessage: "-{currencySign}{adjustment}",
            values: {
                currencySign: e.formatMessage(s.sign),
                adjustment: (-a.negative_line_item_total / 100).toFixed(2)
            }
        }),
        proratedCreditInfoMessage: t.jsx(p, {
            id: "planUpgradeModal.proratedCreditInfo",
            defaultMessage: "Prorated credit for the remainder of your {currentPlanType} subscription",
            values: {
                currentPlanType: V({
                    planType: l,
                    initialPlanType: l,
                    updatedPlanType: n
                })
            }
        }),
        value: a.negative_line_item_total
    }, {
        adjustmentMessage: t.jsx(p, {
            id: "planUpgradeModal.discount",
            defaultMessage: "Adjustment"
        }),
        proratedCreditMessage: t.jsx(p, {
            id: "planUpgradeModal.discountAmount",
            defaultMessage: "-{currencySign}{discount}",
            values: {
                currencySign: e.formatMessage(s.sign),
                discount: (a.discount_amount / 100).toFixed(2)
            }
        }),
        proratedCreditInfoMessage: t.jsx(p, {
            id: "planUpgradeModal.discountInfo",
            defaultMessage: "Account discount applied"
        }),
        value: a.discount_amount
    }, {
        adjustmentMessage: t.jsx(p, {
            id: "planUpgradeModal.credits",
            defaultMessage: "Adjustments"
        }),
        proratedCreditMessage: t.jsx(p, {
            id: "planUpgradeModal.creditsAmount",
            defaultMessage: "-{currencySign}{credits}",
            values: {
                currencySign: e.formatMessage(s.sign),
                credits: (a.applied_balance / 100).toFixed(2)
            }
        }),
        proratedCreditInfoMessage: t.jsx(p, {
            id: "planUpgradeModal.creditsInfo",
            defaultMessage: "Credits applied"
        }),
        value: a.applied_balance
    }]
}

function it({
    data: a,
    currencySymbol: e,
    updatedPlanType: s
}) {
    const l = Q();
    return t.jsxs(t.Fragment, {
        children: [t.jsxs("div", {
            className: "flex justify-between",
            children: [t.jsx("span", {
                className: "font-semibold",
                children: t.jsx(p, {
                    id: "planUpgradeModal.subscription",
                    defaultMessage: "ChatGPT {capitalizedUpdatedPlanType} subscription",
                    values: {
                        capitalizedUpdatedPlanType: H(s)
                    }
                })
            }), t.jsx("span", {
                className: "font-semibold",
                children: t.jsx(p, {
                    id: "planUpgradeModal.subscriptionCost",
                    defaultMessage: "{currencySign}{totalCost}",
                    values: {
                        currencySign: l.formatMessage(e.sign),
                        totalCost: (a.positive_line_item_total / 100).toFixed(2)
                    }
                })
            })]
        }), t.jsx("span", {
            className: "text-token-text-secondary text-sm",
            children: t.jsx(p, {
                id: "planUpgradeModal.billingCycle",
                defaultMessage: "Billed monthly, starting today"
            })
        })]
    })
}

function De(a) {
    "use forget";
    const e = Y.c(17),
        {
            data: s,
            currencySymbol: l
        } = a,
        n = Q();
    let i;
    e[0] !== l.sign || e[1] !== s.amount_due.amount_excluding_tax || e[2] !== s.amount_due.tax_amount || e[3] !== n ? (i = s.amount_due.tax_amount > 0 && t.jsxs(t.Fragment, {
        children: [t.jsxs("div", {
            className: "mt-4 flex justify-between",
            children: [t.jsx("span", {
                className: "font-semibold",
                children: t.jsx(p, {
                    id: "planUpgradeModal.subTotal",
                    defaultMessage: "Subtotal"
                })
            }), t.jsx("span", {
                children: t.jsx(p, {
                    id: "planUpgradeModal.subtotalPrice",
                    defaultMessage: "{currencySign}{totalCost}",
                    values: {
                        currencySign: n.formatMessage(l.sign),
                        totalCost: (s.amount_due.amount_excluding_tax / 100).toFixed(2)
                    }
                })
            })]
        }), t.jsxs("div", {
            className: "mt-2 flex justify-between",
            children: [t.jsxs("span", {
                className: "font-semibold",
                children: [t.jsx(p, {
                    id: "planUpgradeModal.tax",
                    defaultMessage: "Tax"
                }), t.jsx("span", {
                    className: "text-token-text-secondary font-normal",
                    children: t.jsx(p, {
                        id: "planUpgradeModal.taxPercent",
                        defaultMessage: " {taxPercent}%",
                        values: {
                            taxPercent: (s.amount_due.tax_amount / s.amount_due.amount_excluding_tax * 100).toFixed(0)
                        }
                    })
                })]
            }), t.jsx("span", {
                children: t.jsx(p, {
                    id: "planUpgradeModal.taxAmount",
                    defaultMessage: "{currencySign}{tax}",
                    values: {
                        currencySign: n.formatMessage(l.sign),
                        tax: (s.amount_due.tax_amount / 100).toFixed(2)
                    }
                })
            })]
        })]
    }), e[0] = l.sign, e[1] = s.amount_due.amount_excluding_tax, e[2] = s.amount_due.tax_amount, e[3] = n, e[4] = i) : i = e[4];
    let d;
    e[5] === Symbol.for("react.memo_cache_sentinel") ? (d = t.jsx("span", {
        className: "font-semibold",
        children: t.jsx(p, {
            id: "planUpgradeModal.totalDueToday",
            defaultMessage: "Total due today"
        })
    }), e[5] = d) : d = e[5];
    let o;
    e[6] !== l.sign || e[7] !== n ? (o = n.formatMessage(l.sign), e[6] = l.sign, e[7] = n, e[8] = o) : o = e[8];
    const g = s.amount_due.amount / 100;
    let c;
    e[9] !== g ? (c = g.toFixed(2), e[9] = g, e[10] = c) : c = e[10];
    let u;
    e[11] !== o || e[12] !== c ? (u = t.jsxs("div", {
        className: "mt-2 flex justify-between",
        children: [d, t.jsx("span", {
            className: "font-semibold",
            children: t.jsx(p, {
                id: "planUpgradeModal.totalDueTodayAmount",
                defaultMessage: "{currencySign}{totalCost}",
                values: {
                    currencySign: o,
                    totalCost: c
                }
            })
        })]
    }), e[11] = o, e[12] = c, e[13] = u) : u = e[13];
    let m;
    return e[14] !== i || e[15] !== u ? (m = t.jsxs(t.Fragment, {
        children: [i, u]
    }), e[14] = i, e[15] = u, e[16] = m) : m = e[16], m
}

function Ne(a) {
    "use forget";
    const e = Y.c(6),
        {
            defaultPaymentMethod: s
        } = a;
    let l;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (l = t.jsx("span", {
        className: "font-semibold",
        children: t.jsx(p, {
            id: "planUpgradeModal.paymentMethod",
            defaultMessage: "Payment Method"
        })
    }), e[0] = l) : l = e[0];
    let n;
    e[1] !== s.card_brand ? (n = s.card_brand ? .toUpperCase(), e[1] = s.card_brand, e[2] = n) : n = e[2];
    let i;
    return e[3] !== s.card_last4 || e[4] !== n ? (i = t.jsxs("div", {
        className: "flex justify-between",
        children: [l, t.jsxs("span", {
            className: "text-token-text-secondary",
            children: [n, " *", s.card_last4]
        })]
    }), e[3] = s.card_last4, e[4] = n, e[5] = i) : i = e[5], i
}

function dt(a) {
    "use forget";
    const e = Y.c(69),
        {
            renewalDate: s,
            handleUpdate: l,
            isUpdating: n,
            onClose: i,
            targetPlanCost: d,
            currentPlanType: o,
            currencySymbol: g,
            updatedPlanType: c,
            promoMetadata: u,
            fullPriceResumeDateFormatted: m,
            formattedDiscountedCost: N
        } = a,
        r = Q(),
        x = u ? .plan_type_change === "downgrade",
        h = u ? .duration ? .period ? ? "month";
    let P;
    e[0] !== r || e[1] !== s ? (P = s ? new Date(s).toLocaleDateString(r.locale, {
        year: "numeric",
        month: "long",
        day: "numeric"
    }) : r.formatMessage(le.notApplicable), e[0] = r, e[1] = s, e[2] = P) : P = e[2];
    const f = P;
    let w;
    e[3] !== o || e[4] !== c ? (w = V({
        planType: o,
        initialPlanType: o,
        updatedPlanType: c
    }), e[3] = o, e[4] = c, e[5] = w) : w = e[5];
    let M;
    e[6] !== o || e[7] !== c ? (M = V({
        planType: c,
        initialPlanType: o,
        updatedPlanType: c
    }), e[6] = o, e[7] = c, e[8] = M) : M = e[8];
    let C;
    e[9] !== f || e[10] !== w || e[11] !== M ? (C = t.jsx("p", {
        className: "text-token-text-secondary",
        children: t.jsx(p, {
            id: "planDowngradeModal.currentSubscription",
            defaultMessage: "Your current {currentPlanType} subscription will remain active until {renewalDateFormatted}, when it will change to {nextPlanType}.",
            values: {
                renewalDateFormatted: f,
                currentPlanType: w,
                nextPlanType: M
            }
        })
    }), e[9] = f, e[10] = w, e[11] = M, e[12] = C) : C = e[12];
    const E = x ? "text-token-text-primary text-[15px]" : "font-semibold";
    let b;
    e[13] !== o || e[14] !== c ? (b = V({
        planType: c,
        initialPlanType: o,
        updatedPlanType: c
    }), e[13] = o, e[14] = c, e[15] = b) : b = e[15];
    let y;
    e[16] !== b ? (y = t.jsx(p, {
        id: "planDowngradeModal.newPlan",
        defaultMessage: "ChatGPT {capitalizedUpdatedPlanType}",
        values: {
            capitalizedUpdatedPlanType: b
        }
    }), e[16] = b, e[17] = y) : y = e[17];
    let j;
    e[18] !== E || e[19] !== y ? (j = t.jsx("span", {
        className: E,
        children: y
    }), e[18] = E, e[19] = y, e[20] = j) : j = e[20];
    let S;
    e[21] !== g || e[22] !== N || e[23] !== r || e[24] !== x || e[25] !== d ? (S = x ? t.jsx("span", {
        className: "text-token-text-primary text-[15px]",
        children: t.jsx(p, {
            id: "planDowngradeModal.newPlanCostOfPromo",
            defaultMessage: "{promotionalCost} w/ promo",
            values: {
                promotionalCost: N
            }
        })
    }) : t.jsx("span", {
        className: "text-token-text-secondary",
        children: t.jsx(p, {
            id: "planDowngradeModal.newPlanCost",
            defaultMessage: "{currencyCode} {currencySign}{planCost}/month",
            values: {
                currencyCode: r.formatMessage(g.code),
                currencySign: r.formatMessage(g.sign),
                planCost: r.formatMessage(d)
            }
        })
    }), e[21] = g, e[22] = N, e[23] = r, e[24] = x, e[25] = d, e[26] = S) : S = e[26];
    let _;
    e[27] !== j || e[28] !== S ? (_ = t.jsxs("div", {
        className: "flex justify-between",
        children: [j, S]
    }), e[27] = j, e[28] = S, e[29] = _) : _ = e[29];
    const z = x && "text-token-text-secondary text-xs";
    let T;
    e[30] !== z ? (T = be("text-token-text-secondary", z), e[30] = z, e[31] = T) : T = e[31];
    let F;
    e[32] !== m || e[33] !== x || e[34] !== h || e[35] !== f ? (F = x ? re({
        fullPriceResumeDateFormatted: m,
        period: h,
        type: "billingStartAfterPromo"
    }) : t.jsx(p, {
        id: "planDowngradeModal.billingStart",
        defaultMessage: "Billing will start on {renewalDateFormatted}",
        values: {
            renewalDateFormatted: f
        }
    }), e[32] = m, e[33] = x, e[34] = h, e[35] = f, e[36] = F) : F = e[36];
    let D;
    e[37] !== T || e[38] !== F ? (D = t.jsx("span", {
        className: T,
        children: F
    }), e[37] = T, e[38] = F, e[39] = D) : D = e[39];
    let v;
    e[40] !== g || e[41] !== r || e[42] !== x || e[43] !== d ? (v = x && t.jsx("span", {
        className: "text-token-text-secondary text-xs",
        children: t.jsx(p, {
            id: "planDowngradeModal.newPlanCostAfterPromo",
            defaultMessage: "{currencySign}{planCost}/month after",
            values: {
                currencySign: r.formatMessage(g.sign),
                planCost: r.formatMessage(d)
            }
        })
    }), e[40] = g, e[41] = r, e[42] = x, e[43] = d, e[44] = v) : v = e[44];
    let U;
    e[45] !== D || e[46] !== v ? (U = t.jsxs("div", {
        className: "flex items-center justify-between",
        children: [D, v]
    }), e[45] = D, e[46] = v, e[47] = U) : U = e[47];
    let R;
    e[48] !== _ || e[49] !== U ? (R = t.jsxs("div", {
        className: "bg-token-main-surface-secondary mt-4 flex flex-col gap-1 rounded-2xl! rounded-md border-[1px] p-4",
        children: [_, U]
    }), e[48] = _, e[49] = U, e[50] = R) : R = e[50];
    let k;
    e[51] !== r ? (k = r.formatMessage({
        id: "planDowngradeModal.cancel",
        defaultMessage: "Cancel"
    }), e[51] = r, e[52] = k) : k = e[52];
    let I;
    e[53] !== i || e[54] !== k ? (I = t.jsx(q, {
        title: k,
        color: "secondary",
        onClick: i
    }), e[53] = i, e[54] = k, e[55] = I) : I = e[55];
    let L;
    e[56] !== r ? (L = r.formatMessage({
        id: "planDowngradeModal.confirm",
        defaultMessage: "Confirm"
    }), e[56] = r, e[57] = L) : L = e[57];
    let O;
    e[58] !== l || e[59] !== n || e[60] !== L ? (O = t.jsx(q, {
        title: L,
        color: "primary",
        onClick: l,
        loading: n
    }), e[58] = l, e[59] = n, e[60] = L, e[61] = O) : O = e[61];
    let B;
    e[62] !== I || e[63] !== O ? (B = t.jsxs("div", {
        className: "mt-8 flex justify-end gap-2",
        children: [I, O]
    }), e[62] = I, e[63] = O, e[64] = B) : B = e[64];
    let $;
    return e[65] !== R || e[66] !== B || e[67] !== C ? ($ = t.jsxs("div", {
        className: "px-6 pb-6",
        children: [C, R, B]
    }), e[65] = R, e[66] = B, e[67] = C, e[68] = $) : $ = e[68], $
}

function ct(a) {
    "use forget";
    const e = Y.c(63),
        {
            account: s,
            renewalDate: l,
            handleUpdate: n,
            isUpdating: i,
            onClose: d,
            targetPlanCost: o,
            currencySymbol: g,
            promoMetadata: c,
            fullPriceResumeDateFormatted: u,
            renewalDateFormatted: m,
            formattedDiscountedCost: N
        } = a,
        r = Q(),
        x = s.data.subscriptionStatus.planType;
    let h;
    e[0] !== x ? (h = H(x), e[0] = x, e[1] = h) : h = e[1];
    const P = h,
        f = c ? .plan_type_change === "equal",
        w = c ? .duration ? .period ? ? "month";
    let M;
    e[2] !== f || e[3] !== w || e[4] !== P || e[5] !== l || e[6] !== m ? (M = f ? re({
        renewalDateFormatted: m,
        period: w,
        type: "currentSubscriptionPromo"
    }) : t.jsx(p, {
        id: "planRenewalModal.currentSubscription",
        defaultMessage: "Your current {planName} subscription will auto-renew on {renewalDate}.",
        values: {
            planName: P,
            renewalDate: l
        }
    }), e[2] = f, e[3] = w, e[4] = P, e[5] = l, e[6] = m, e[7] = M) : M = e[7];
    let C;
    e[8] !== M ? (C = t.jsx("p", {
        className: "text-token-text-primary",
        children: M
    }), e[8] = M, e[9] = C) : C = e[9];
    const E = f ? "text-token-text-primary text-[15px]" : "font-semibold";
    let b;
    e[10] !== P ? (b = t.jsx(p, {
        id: "planRenewalModal.newPlan",
        defaultMessage: "ChatGPT {planName}",
        values: {
            planName: P
        }
    }), e[10] = P, e[11] = b) : b = e[11];
    let y;
    e[12] !== E || e[13] !== b ? (y = t.jsx("span", {
        className: E,
        children: b
    }), e[12] = E, e[13] = b, e[14] = y) : y = e[14];
    let j;
    e[15] !== g || e[16] !== N || e[17] !== r || e[18] !== f || e[19] !== o ? (j = f ? t.jsx("span", {
        className: "text-token-text-primary text-[15px]",
        children: t.jsx(p, {
            id: "planRenewalModal.newPlanCostAfterPromo",
            defaultMessage: "{promotionalCost} w/ promo",
            values: {
                promotionalCost: N
            }
        })
    }) : t.jsx("span", {
        className: "text-token-text-secondary",
        children: t.jsx(p, {
            id: "planRenewalModal.newPlanCost",
            defaultMessage: "{currencyCode} {currencySign}{planCost}/month",
            values: {
                currencyCode: r.formatMessage(g.code),
                currencySign: r.formatMessage(g.sign),
                planCost: r.formatMessage(o)
            }
        })
    }), e[15] = g, e[16] = N, e[17] = r, e[18] = f, e[19] = o, e[20] = j) : j = e[20];
    let S;
    e[21] !== y || e[22] !== j ? (S = t.jsxs("div", {
        className: "flex justify-between",
        children: [y, j]
    }), e[21] = y, e[22] = j, e[23] = S) : S = e[23];
    const _ = f && "text-token-text-secondary text-xs";
    let z;
    e[24] !== _ ? (z = be("text-token-text-secondary", _), e[24] = _, e[25] = z) : z = e[25];
    let T;
    e[26] !== u || e[27] !== f || e[28] !== l ? (T = f ? t.jsx(p, {
        id: "planRenewalModal.billingStartAfterPromo",
        defaultMessage: "Billing will start on {fullPriceResumeDateFormatted}",
        values: {
            fullPriceResumeDateFormatted: u
        }
    }) : t.jsx(p, {
        id: "planRenewalModal.billingStart",
        defaultMessage: "Billing will auto-renew on {renewalDate}",
        values: {
            renewalDate: l
        }
    }), e[26] = u, e[27] = f, e[28] = l, e[29] = T) : T = e[29];
    let F;
    e[30] !== z || e[31] !== T ? (F = t.jsx("span", {
        className: z,
        children: T
    }), e[30] = z, e[31] = T, e[32] = F) : F = e[32];
    let D;
    e[33] !== g || e[34] !== r || e[35] !== f || e[36] !== w || e[37] !== o ? (D = f && t.jsx("span", {
        className: "text-token-text-secondary text-xs",
        children: re({
            period: w,
            type: "newPlanCostAfterPromo",
            currencySign: r.formatMessage(g.sign),
            planCost: r.formatMessage(o)
        })
    }), e[33] = g, e[34] = r, e[35] = f, e[36] = w, e[37] = o, e[38] = D) : D = e[38];
    let v;
    e[39] !== F || e[40] !== D ? (v = t.jsxs("div", {
        className: "flex items-center justify-between",
        children: [F, D]
    }), e[39] = F, e[40] = D, e[41] = v) : v = e[41];
    let U;
    e[42] !== v || e[43] !== S ? (U = t.jsxs("div", {
        className: "bg-token-main-surface-secondary mt-4 flex flex-col gap-1 rounded-2xl! rounded-md border-[1px] p-4",
        children: [S, v]
    }), e[42] = v, e[43] = S, e[44] = U) : U = e[44];
    let R;
    e[45] !== r ? (R = r.formatMessage({
        id: "planRenewalModal.cancel",
        defaultMessage: "Cancel"
    }), e[45] = r, e[46] = R) : R = e[46];
    let k;
    e[47] !== d || e[48] !== R ? (k = t.jsx(q, {
        title: R,
        color: "secondary",
        onClick: d
    }), e[47] = d, e[48] = R, e[49] = k) : k = e[49];
    let I;
    e[50] !== r ? (I = r.formatMessage({
        id: "planRenewalModal.confirm",
        defaultMessage: "Confirm"
    }), e[50] = r, e[51] = I) : I = e[51];
    let L;
    e[52] !== n || e[53] !== i || e[54] !== I ? (L = t.jsx(q, {
        title: I,
        color: "primary",
        onClick: n,
        loading: i
    }), e[52] = n, e[53] = i, e[54] = I, e[55] = L) : L = e[55];
    let O;
    e[56] !== k || e[57] !== L ? (O = t.jsxs("div", {
        className: "mt-8 flex justify-end gap-2",
        children: [k, L]
    }), e[56] = k, e[57] = L, e[58] = O) : O = e[58];
    let B;
    return e[59] !== U || e[60] !== O || e[61] !== C ? (B = t.jsxs("div", {
        className: "px-6 pb-6",
        children: [C, U, O]
    }), e[59] = U, e[60] = O, e[61] = C, e[62] = B) : B = e[62], B
}

function Re(a, e) {
    if (!e) return {
        goCost: te.free.costRetrievalError,
        plusCost: te.free.costRetrievalError,
        proliteCost: te.free.costRetrievalError,
        proCost: te.free.costRetrievalError
    };
    const s = X(e, xe, Z.Month),
        l = X(e, Me, Z.Month),
        n = X(e, ye, Z.Month),
        i = X(e, he, Z.Month);
    return {
        goCost: ee(s.amount, xe, a),
        plusCost: ee(l.amount, Me, a),
        proliteCost: ee(i.amount, he, a),
        proCost: ee(n.amount, ye, a)
    }
}

function Ee(a, {
    goCost: e,
    plusCost: s,
    proCost: l,
    proliteCost: n
}) {
    switch (a) {
        case A.GO:
            return e;
        case A.PLUS:
            return s;
        case A.PRO:
            return l;
        case A.PROLITE:
            return n;
        default:
            return Pe.error(`Invalid target plan type: ${a}`), s
    }
}

function re({
    fullPriceResumeDateFormatted: a,
    renewalDateFormatted: e,
    period: s,
    type: l,
    currencySign: n,
    planCost: i
}) {
    switch (["month", "year"].includes(s) || Pe.warn("Invalid period passed to PlanManagementModal.getPeriodFormattedMessage", {
        period: s
    }), l) {
        case "billingStartAfterPromo":
            return t.jsx(p, {
                id: "planDowngradeModal.billingResumeAfterPromo",
                defaultMessage: "Billing will resume on {fullPriceResumeDateFormatted}",
                values: {
                    fullPriceResumeDateFormatted: a
                }
            });
        case "currentSubscriptionPromo":
            return t.jsx(p, {
                id: "planRenewalModal.currentSubscriptionPromo",
                defaultMessage: "After the billing cycle for your current plan ends on {renewalDateFormatted}, your promotional subscription will go into effect.",
                values: {
                    renewalDateFormatted: e
                }
            });
        case "newPlanCostAfterPromo":
            if (s === "month") return t.jsx(p, {
                id: "planDowngradeModal.newPlanCostAfterPromoMonth",
                defaultMessage: "{currencySign}{planCost}/month after",
                values: {
                    currencySign: n,
                    planCost: i
                }
            });
            if (s === "year") return t.jsx(p, {
                id: "planDowngradeModal.newPlanCostAfterPromoYear",
                defaultMessage: "{currencySign}{planCost}/year after",
                values: {
                    currencySign: n,
                    planCost: i
                }
            });
            break
    }
}
const yt = Object.freeze(Object.defineProperty({
    __proto__: null,
    AdjustmentSection: Ue,
    PaymentMethodSection: Ne,
    TotalCostSection: De,
    default: st,
    getPlanManagementModalPlanName: V,
    getPrice: Re,
    getTargetPlanCost: Ee
}, Symbol.toStringTag, {
    value: "Module"
}));
export {
    Ue as A, Ne as P, De as T, st as a, yt as b, Re as g, at as u
};
//# sourceMappingURL=5ced9fb2-gdlkfe6m7icygyhv.js.map