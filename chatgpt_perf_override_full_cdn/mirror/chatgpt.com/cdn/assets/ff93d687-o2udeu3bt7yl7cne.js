import {
    c as J,
    u as de,
    j as t,
    o as u,
    h as Bt,
    r as Nt,
    L as mt
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    b_ as un,
    ce as mn,
    cu as wt,
    ct as ft,
    pS as xn,
    ld as fn,
    le as gn,
    lf as pn,
    lc as hn,
    cL as yn,
    pT as Et,
    pU as _n,
    cv as bn,
    l7 as vn
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    A as F,
    af as D,
    e as Cn,
    mR as jn,
    x as ce,
    he as Rt,
    za as Dn,
    aV as pt
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    b as Tn
} from "./b8f3be97-cabh0vwwkxj2eime.js";
import {
    u as Sn,
    a as It,
    t as ze
} from "./e8eebcb1-hl1q1mqbpavqpner.js";
import {
    P as Pn
} from "./65d684aa-lfcsad63o8z9w3e0.js";
var gt = (n => (n.standard = "standard", n.promo = "promo", n.highlight = "highlight", n))(gt || {});

function Nn(n) {
    return "percentage" in n
}
const wn = "ms-1 rounded-4xl px-2 pt-1.5 pb-1.25 text-[11px] font-semibold",
    En = "border border-none bg-[#DCDBFF] text-[#615EEB] dark:bg-[#444378] dark:text-[#B9B7FF]";

function A(n) {
    "use forget";
    const e = J.c(6),
        {
            children: a,
            className: d,
            hasIcon: f
        } = n,
        i = d === void 0 ? En : d,
        r = f === void 0 ? !1 : f,
        l = `${wn} ${i}`,
        m = r && "flex";
    let o;
    e[0] !== l || e[1] !== m ? (o = D(l, m), e[0] = l, e[1] = m, e[2] = o) : o = e[2];
    let x;
    return e[3] !== a || e[4] !== o ? (x = t.jsx("span", {
        className: o,
        children: a
    }), e[3] = a, e[4] = o, e[5] = x) : x = e[5], x
}

function In(n) {
    "use forget";
    const e = J.c(35),
        {
            promoBadgeType: a,
            useRecommendedBadge: d,
            disablePopularBadge: f,
            activeDiscountMetadata: i,
            promoMetadata: r,
            type: l,
            planType: m,
            customBadgeLabel: o,
            customBadgeValues: x,
            welcomeOfferLabel: h,
            currencySymbol: _,
            isScheduledPromo: c
        } = n,
        y = de(),
        v = r && "percentage" in r.discount && r.discount.percentage === 100,
        C = a !== "free_trial_badge" && (v || r != null || h != null);
    if (C && a === "none") return null;
    if (C && a === "recommended") {
        let s;
        return e[0] === Symbol.for("react.memo_cache_sentinel") ? (s = t.jsx(A, {
            children: t.jsx(u, { ...U.recommended
            })
        }), e[0] = s) : s = e[0], s
    }
    if (v && a === "none") return null;
    if (v && a === "recommended") {
        let s;
        return e[1] === Symbol.for("react.memo_cache_sentinel") ? (s = t.jsx(A, {
            children: t.jsx(u, { ...U.recommended
            })
        }), e[1] = s) : s = e[1], s
    }
    if (v) {
        let s;
        return e[2] === Symbol.for("react.memo_cache_sentinel") ? (s = t.jsx(A, {
            hasIcon: !0,
            children: t.jsxs("span", {
                className: "inline-flex items-center gap-1",
                children: [t.jsx(un, {
                    "aria-hidden": !0,
                    className: "h-3 w-3"
                }), t.jsx(u, { ...U.limitedTime
                })]
            })
        }), e[2] = s) : s = e[2], s
    }
    const I = o && m === F.FREE_WORKSPACE ? "border border-[#0D0D0D1A] bg-transparent text-[#5856D6] dark:text-[#B9B7FF]" : void 0;
    if (o) {
        let s;
        e[3] !== o || e[4] !== x ? (s = t.jsx(u, { ...o,
            values: x
        }), e[3] = o, e[4] = x, e[5] = s) : s = e[5];
        let g;
        return e[6] !== I || e[7] !== s ? (g = t.jsx(A, {
            className: I,
            children: s
        }), e[6] = I, e[7] = s, e[8] = g) : g = e[8], g
    }
    const B = l === gt.highlight && m === F.GO,
        T = l === gt.highlight && !f,
        j = i && "percentage" in i.discount && i.discount.percentage === 100,
        R = i && !j;
    if (h) {
        let s;
        return e[9] !== h ? (s = t.jsx(A, {
            children: t.jsx(u, { ...h
            })
        }), e[9] = h, e[10] = s) : s = e[10], s
    }
    if (!c && r ? .promotion_type_label) {
        let s;
        return e[11] !== r.promotion_type_label ? (s = t.jsx(A, {
            children: r.promotion_type_label
        }), e[11] = r.promotion_type_label, e[12] = s) : s = e[12], s
    }
    if (!c && r ? .duration) {
        if (Nn(r.discount)) {
            let N;
            e[13] !== r.discount.percentage ? (N = Math.round(r.discount.percentage), e[13] = r.discount.percentage, e[14] = N) : N = e[14];
            let O;
            return e[15] !== N ? (O = t.jsx(A, {
                children: t.jsx(u, { ...U.percentageDiscount,
                    values: {
                        discount_percentage: N
                    }
                })
            }), e[15] = N, e[16] = O) : O = e[16], O
        }
        let s;
        e[17] !== y || e[18] !== r.discount.currency_code || e[19] !== r.discount.value ? (s = y.formatNumber(r.discount.value, {
            style: "currency",
            currency: r.discount.currency_code,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }), e[17] = y, e[18] = r.discount.currency_code, e[19] = r.discount.value, e[20] = s) : s = e[20];
        let g;
        return e[21] !== s ? (g = t.jsx(A, {
            children: t.jsx(u, { ...U.flatDiscount,
                values: {
                    discounted_cost: s
                }
            })
        }), e[21] = s, e[22] = g) : g = e[22], g
    }
    if (!c && r) {
        let s;
        return e[23] === Symbol.for("react.memo_cache_sentinel") ? (s = t.jsx(A, {
            children: t.jsx(u, { ...U.promo
            })
        }), e[23] = s) : s = e[23], s
    }
    if (R && i) {
        if ("percentage" in i.discount) {
            const s = i ? .discount.percentage;
            let g;
            return e[24] !== s ? (g = t.jsx(A, {
                children: t.jsx(u, { ...U.percentageDiscount,
                    values: {
                        discount_percentage: s
                    }
                })
            }), e[24] = s, e[25] = g) : g = e[25], g
        } else if ("value" in i.discount) {
            let s;
            e[26] !== i.discount.value || e[27] !== _.code || e[28] !== y ? (s = y.formatNumber(i.discount.value, {
                style: "currency",
                currency: y.formatMessage(_.code),
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }), e[26] = i.discount.value, e[27] = _.code, e[28] = y, e[29] = s) : s = e[29];
            let g;
            return e[30] !== s ? (g = t.jsx(A, {
                children: t.jsx(u, { ...U.flatDiscount,
                    values: {
                        discounted_cost: s
                    }
                })
            }), e[30] = s, e[31] = g) : g = e[31], g
        }
    }
    if (B) {
        let s;
        return e[32] === Symbol.for("react.memo_cache_sentinel") ? (s = t.jsx(A, {
            children: t.jsx(u, { ...U.new
            })
        }), e[32] = s) : s = e[32], s
    }
    if (d) {
        let s;
        return e[33] === Symbol.for("react.memo_cache_sentinel") ? (s = t.jsx(A, {
            children: t.jsx(u, { ...U.recommended
            })
        }), e[33] = s) : s = e[33], s
    }
    if (T) {
        let s;
        return e[34] === Symbol.for("react.memo_cache_sentinel") ? (s = t.jsx(A, {
            children: t.jsx(u, { ...U.popular
            })
        }), e[34] = s) : s = e[34], s
    }
    return null
}
const U = Bt({
        percentageDiscount: {
            id: "percentageDiscount",
            defaultMessage: "{discount_percentage}% OFF"
        },
        flatDiscount: {
            id: "flatDiscount",
            defaultMessage: "{discounted_cost} OFF"
        },
        promo: {
            id: "promo",
            defaultMessage: "PROMO"
        },
        popular: {
            id: "popular",
            defaultMessage: "POPULAR"
        },
        recommended: {
            id: "recommended",
            defaultMessage: "RECOMMENDED"
        },
        new: {
            id: "new",
            defaultMessage: "NEW"
        },
        limitedTime: {
            id: "pricingPlanBadgeConstants.limitedTime",
            defaultMessage: "LIMITED TIME"
        }
    }),
    Fn = {
        standard: "border-s border-e border-t border-b border-token-border-default md:min-h-[30rem] md:max-w-96 md:rounded-none md:border-e-0 md:pb-6 md:first:rounded-ss-xl md:first:rounded-es-xl md:last:rounded-se-xl md:last:rounded-ee-xl md:last:border-e",
        promo: "shadow-lg md:min-h-[30rem] md:max-w-96 md:border-e-1 md:border-b-1 md:border-t-1 md:border-s-1 md:pb-6",
        highlight: "md:-mt-4 md:-mb-4 md:min-h-[20rem] md:max-w-96 md:pb-6 md:first:rounded-ss-xl md:first:rounded-es-xl md:last:rounded-se-xl md:last:rounded-ee-xl"
    };

function kn(n) {
    "use forget";
    const e = J.c(18);
    let a, d, f, i, r;
    e[0] !== n ? ({
        children: a,
        className: d,
        type: r,
        useCompactDesktopBusinessLayout: i,
        ...f
    } = n, e[0] = n, e[1] = a, e[2] = d, e[3] = f, e[4] = i, e[5] = r) : (a = e[1], d = e[2], f = e[3], i = e[4], r = e[5]);
    const l = i === void 0 ? !1 : i;
    let m, o;
    if (e[6] !== d || e[7] !== f || e[8] !== r || e[9] !== l) {
        const h = D("md:mt-0 md:mb-0", "bg-[linear-gradient(206.72deg,_#EEEFFF_2.34%,_#FFFFFF_92.37%)] dark:bg-[linear-gradient(206.72deg,_#30305F_2.34%,_#212121_92.37%)]", r === "promo" && "border-token-border-light");
        m = f;
        let _;
        e[12] !== l ? (_ = l && ["[@media(min-width:1024px)_and_(max-height:900px)]:min-h-[24rem]", "[@media(min-width:1024px)_and_(max-height:900px)]:max-w-[23rem]", "[@media(min-width:1024px)_and_(max-height:900px)]:gap-3", "[@media(min-width:1024px)_and_(max-height:900px)]:px-4.5", "[@media(min-width:1024px)_and_(max-height:900px)]:py-4.5"], e[12] = l, e[13] = _) : _ = e[13], o = D(Fn[r], ["highlight", "promo"].includes(r) && h, "relative z-10 flex h-full w-full flex-1 flex-col justify-center gap-4 rounded-xl px-6 py-6.5 text-sm md:rounded-2xl!", _, d), e[6] = d, e[7] = f, e[8] = r, e[9] = l, e[10] = m, e[11] = o
    } else m = e[10], o = e[11];
    let x;
    return e[14] !== a || e[15] !== m || e[16] !== o ? (x = t.jsx("div", { ...m,
        className: o,
        children: a
    }), e[14] = a, e[15] = m, e[16] = o, e[17] = x) : x = e[17], x
}
const Ft = pt.div `
  relative flex flex-col ${n=>["highlight","promo"].includes(n.type)?"mt-4":"bg-token-main-surface-primary"}
`,
    Mn = pt.div `flex flex-col grow gap-2`;

function An(n) {
    "use forget";
    const e = J.c(2),
        {
            label: a
        } = n;
    let d;
    return e[0] !== a ? (d = t.jsx("div", {
        className: "absolute start-0 end-0 top-0 z-0 h-[86px] -translate-y-9 rounded-t-[16px]",
        "data-testid": "pricing-column-top-banner",
        children: t.jsx("div", {
            className: "relative h-full overflow-hidden rounded-t-[16px] bg-[#5856D6]",
            children: t.jsx("div", {
                className: "absolute start-1/2 top-[10px] z-10 flex -translate-x-1/2 items-start gap-3 text-[clamp(11px,3.6vw,13px)] leading-[clamp(14px,4.2vw,18px)] font-[510] tracking-[-0.08px] whitespace-nowrap text-white",
                children: a
            })
        })
    }), e[0] = a, e[1] = d) : d = e[1], d
}
const kt = pt.div `
  relative flex flex-col text-xs text-token-text-secondary ${n=>["highlight","promo"].includes(n.type)?"":"bg-token-main-surface-primary"}
`,
    xt = "shadow-[0_4px_30px_0_rgba(88,86,214,0.12)] dark:shadow-[0_4px_30px_0_rgba(76,84,196,0.28),0_0_24px_0_rgba(76,84,196,0.16),0_8px_18px_-12px_rgba(10,12,32,0.82)]",
    Ln = "shadow-[0_4px_30px_0_rgba(0,0,0,0.12)] dark:shadow-[0_4px_30px_0_rgba(0,0,0,0.28),0_0_24px_0_rgba(0,0,0,0.16),0_8px_18px_-12px_rgba(10,12,32,0.82)]",
    Mt = {
        outlineStyle: "solid",
        outlineWidth: "1.5px"
    };

function Bn({
    isLowContrastLightModeBorderEnabled: n
}) {
    return D(n ? "outline-[#CFCEFC]" : "outline-[#5856D6]", "dark:outline-[#484777]")
}

function Rn({
    dropshadowType: n,
    isHighlighted: e
}) {
    return n === "all" ? xt : n === "all_grayscale_non_highlighted" ? e ? xt : Ln : n === "highlighted" && e ? xt : ""
}

function On(n) {
    return "referrer_name" in n
}
var Wn = (n => (n.standard = "standard", n.promo = "promo", n.highlight = "highlight", n))(Wn || {});
const os = n => {
    "use forget";
    const e = J.c(91),
        {
            planType: a,
            priceLookupPlanType: d,
            planInterval: f,
            pricingPlan: i,
            callToActionButton: r,
            secondaryCallToActionButton: l,
            className: m,
            elementId: o,
            additionalLinks: x,
            promoMetadata: h,
            activeDiscountMetadata: _,
            billingDetails: c,
            promoData: y,
            type: v,
            promoBadgeType: C,
            useRecommendedBadge: I,
            disablePopularBadge: B,
            shouldUseComparisonSpacing: T,
            paymentsOverrideString: j,
            badgeLabel: R,
            badgeLabelValues: s,
            isCheckoutPricingConfigLoading: g,
            checkoutPricingConfigError: N,
            hasEnabledTeamFreeTrialCoupon: O,
            pricingPageDropShadowType: G,
            topColumnBannerLabel: V,
            featureListLabel: q,
            headerAccessory: Q,
            pricePrefixLabel: W,
            priceBlockClassName: Ke,
            useCompactDesktopBusinessLayout: X
        } = n,
        w = d === void 0 ? a : d,
        ue = l === void 0 ? null : l;
    let me;
    e[0] !== x ? (me = x === void 0 ? [] : x, e[0] = x, e[1] = me) : me = e[1];
    const xe = me,
        k = h === void 0 ? null : h,
        $ = _ === void 0 ? null : _,
        K = y === void 0 ? null : y,
        S = v === void 0 ? "standard" : v,
        Ut = C === void 0 ? "free_trial_badge" : C,
        Vt = I === void 0 ? !1 : I,
        Gt = B === void 0 ? !1 : B,
        ht = T === void 0 ? !1 : T,
        yt = O === void 0 ? !1 : O,
        qt = G === void 0 ? "none" : G,
        fe = V === void 0 ? null : V,
        oe = q === void 0 ? null : q,
        $t = Q === void 0 ? null : Q,
        ge = W === void 0 ? null : W,
        L = X === void 0 ? !1 : X,
        Ht = Cn(jn),
        {
            costTitle: Y,
            costSubtitle: _t,
            currencySymbol: H
        } = Qn(i, c.currency),
        E = de();
    let pe;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (pe = ce("3768341700").get("is_sku_info_code_enabled", !1), e[2] = pe) : pe = e[2];
    const zt = pe,
        z = S === "highlight" && fe != null,
        Kt = S === "highlight" && ce("1129437001").get("show_low_contrast", !1),
        bt = Bn({
            isLowContrastLightModeBorderEnabled: Kt
        }),
        vt = Rn({
            dropshadowType: qt,
            isHighlighted: S === "highlight"
        }),
        Yt = vt.length > 0,
        Ct = S === "highlight" && z,
        Ye = S === "highlight" && !z;
    let he;
    e[3] !== E || e[4] !== i.name ? (he = E.formatMessage(i.name), e[3] = E, e[4] = i.name, e[5] = he) : he = e[5];
    const Ze = he,
        jt = Nt.useId(),
        ye = Nt.useId(),
        _e = Xn,
        ee = !j && zt && K == null && k == null && i.cost ? .costDuration == null && $ == null;
    let be;
    e[6] !== c.country || e[7] !== c.currency ? (be = {
        countryCode: c.country,
        currency: c.currency
    }, e[6] = c.country, e[7] = c.currency, e[8] = be) : be = e[8];
    const {
        data: M,
        error: Zt,
        isLoading: Jt
    } = mn(be);
    let te;
    e[9] !== c.country || e[10] !== M ? (te = Kn(M, c.country), e[9] = c.country, e[10] = M, e[11] = te) : te = e[11];
    let ne;
    e[12] !== c.currency ? (ne = Yn(c.currency), e[12] = c.currency, e[13] = ne) : ne = e[13];
    let ve;
    e[14] !== te || e[15] !== ne ? (ve = { ...te,
        ...ne
    }, e[14] = te, e[15] = ne, e[16] = ve) : ve = e[16];
    const Ce = ve,
        Qt = Ce.inclusiveTaxDisplay === "tax_name_only",
        Xt = Ce.inclusiveTaxDisplay === "with_amount",
        en = Ce.showReverseChargeDisclaimer,
        tn = a === F.SELF_SERVE_BUSINESS;
    let je;
    e[17] === Symbol.for("react.memo_cache_sentinel") ? (je = vn(), e[17] = je) : je = e[17];
    const nn = je,
        Je = Qt && a !== F.FREE,
        Qe = Xt && a !== F.FREE,
        Dt = en && a === F.SELF_SERVE_BUSINESS,
        sn = !!(i.disclaimer || i.disclaimer2 || Dt);
    let Xe = Y,
        se;
    if (!g && !N && M) {
        if (yt || k && w === F.SELF_SERVE_BUSINESS) se = wt(M, xn, f ? ? ft.Month);
        else if (w === F.PRO || w === F.PROLITE || w === F.PLUS || w === F.GO) {
            const p = w === F.PLUS ? fn : w === F.PRO ? gn : w === F.PROLITE ? pn : hn;
            se = wt(M, p, f ? ? ft.Month)
        }
    }
    se && (Xe = {
        id: "defaultCost",
        defaultMessage: yn(se.amount).toString()
    });
    const Tt = (k ? .schedule ? .start_after_num_periods ? ? 0) > 0,
        et = !!$ || !!k && !Tt;
    let De;
    e[18] === Symbol.for("react.memo_cache_sentinel") ? (De = ce("493238830").get("use_annual_business_sku_interval", !1), e[18] = De) : De = e[18];
    const an = De;
    let ae;
    if (e[19] !== c || e[20] !== M || e[21] !== f || e[22] !== w || e[23] !== ee) {
        e: {
            if (!ee || !M) {
                let b;
                e[25] === Symbol.for("react.memo_cache_sentinel") ? (b = {
                    info: null,
                    hadError: !1
                }, e[25] = b) : b = e[25], ae = b;
                break e
            }
            const p = Un(w, f, an);
            try {
                ae = {
                    info: Tn(M, w, c, p),
                    hadError: !1
                }
            } catch {
                let b;
                e[26] === Symbol.for("react.memo_cache_sentinel") ? (b = {
                    info: null,
                    hadError: !0
                }, e[26] = b) : b = e[26], ae = b
            }
        }
        e[19] = c,
        e[20] = M,
        e[21] = f,
        e[22] = w,
        e[23] = ee,
        e[24] = ae
    }
    else ae = e[24];
    const St = ae,
        Z = St.info;
    let tt;
    e: {
        if (!ee && N != null || ee && (Zt || St.hadError)) {
            tt = P.pricingConfigFallback;
            break e
        }
        tt = null
    }
    const le = tt;
    let Te;
    e[27] !== le ? (Te = le ? t.jsx("div", {
        role: "alert",
        className: "border-token-border-warning bg-token-background-warning text-token-text-warning mb-3 w-full rounded border text-xs",
        children: t.jsx(u, { ...le
        })
    }) : null, e[27] = le, e[28] = Te) : Te = e[28];
    const rn = Te;
    let Se;
    e[29] === Symbol.for("react.memo_cache_sentinel") ? (Se = t.jsxs("div", {
        className: "mb-4 flex gap-2",
        children: [t.jsx("div", {
            className: "text-secondary text-xl text-gray-500",
            children: t.jsx("div", {
                className: "h-6 w-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
            })
        }), t.jsx("div", {
            className: "h-10 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
        })]
    }), e[29] = Se) : Se = e[29];
    let Pe;
    e[30] === Symbol.for("react.memo_cache_sentinel") ? (Pe = t.jsxs(t.Fragment, {
        children: [Se, t.jsx("div", {
            className: "mt-4 flex items-baseline gap-1.5",
            children: t.jsx("div", {
                className: "mt-auto mb-0.5 flex h-full flex-col items-start",
                children: t.jsx("p", {
                    className: "text-token-text-secondary w-full text-[11px]",
                    children: t.jsx("span", {
                        className: "inline-block h-3 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
                    })
                })
            })
        })]
    }), e[30] = Pe) : Pe = e[30];
    const on = Pe,
        Ne = le != null || (ee ? Jt : g),
        {
            shouldHide: nt
        } = Sn(),
        ln = K ? .coupon;
    let st;
    e: {
        if (ln === It) {
            let p;
            e[31] === Symbol.for("react.memo_cache_sentinel") ? (p = {
                welcomeOffer: ze.teamFreeTrialWelcomeOffer,
                notEligible: ze.teamFreeTrialNotEligible,
                temporarilyDisabled: ze.teamFreeTrialTemporarilyDisabled,
                offline: ze.teamFreeTrialOffline
            }, e[31] = p) : p = e[31], st = p;
            break e
        }
        st = null
    }
    const we = st;
    let Ee = null,
        Pt = null;
    if (!k && K ? .coupon === It) {
        if (K.state === "eligible") Pt = we ? .welcomeOffer;
        else if (K.state === "not_eligible" && !nt) {
            const p = we ? .notEligible;
            let b;
            e[32] !== p ? (b = t.jsx("div", {
                className: "mb-3 w-full",
                "data-testid": "pricing-modal-promo-banner",
                children: t.jsx("div", {
                    className: "rounded bg-gray-50 px-3 py-2 text-sm text-gray-900",
                    children: t.jsx(u, { ...p
                    })
                })
            }), e[32] = p, e[33] = b) : b = e[33], Ee = b
        } else if (K.state === "temporary_disabled" && !nt) {
            const p = we ? .temporarilyDisabled;
            let b;
            e[34] !== p ? (b = t.jsx("div", {
                className: "mb-3 w-full",
                "data-testid": "pricing-modal-promo-banner",
                children: t.jsx("div", {
                    className: "rounded bg-gray-50 px-3 py-2 text-sm text-gray-500",
                    children: t.jsx(u, { ...p
                    })
                })
            }), e[34] = p, e[35] = b) : b = e[35], Ee = b
        } else if (K.state === "offline" && !nt) {
            const p = we ? .offline;
            let b;
            e[36] !== p ? (b = t.jsx("div", {
                className: "mb-3 w-full",
                "data-testid": "pricing-modal-promo-banner",
                children: t.jsx("div", {
                    className: "rounded bg-gray-50 px-3 py-2 text-sm text-gray-900",
                    children: t.jsx(u, { ...p
                    })
                })
            }), e[36] = p, e[37] = b) : b = e[37], Ee = b
        }
    }
    const at = z && "mt-9 md:mt-0",
        it = ht ? "md:max-w-117" : "md:max-w-96",
        rt = L && "[@media(min-width:1024px)_and_(max-height:900px)]:max-w-[23rem]";
    let Ie;
    e[38] !== at || e[39] !== it || e[40] !== rt ? (Ie = D("relative min-w-0 flex-1", at, it, rt), e[38] = at, e[39] = it, e[40] = rt, e[41] = Ie) : Ie = e[41];
    let Fe;
    e[42] !== z || e[43] !== fe ? (Fe = z ? t.jsx(An, {
        label: fe
    }) : null, e[42] = z, e[43] = fe, e[44] = Fe) : Fe = e[44];
    let ke;
    e[45] !== S ? (ke = !["promo", "highlight"].includes(S) && "bg-token-main-surface-primary", e[45] = S, e[46] = ke) : ke = e[46];
    const cn = D(ke, ht && "md:max-w-117", Ye && "z-20", Ye && bt, m),
        dn = Ee,
        ot = L && "[@media(min-width:1024px)_and_(max-height:900px)]:gap-3";
    let Me;
    e[47] !== ot ? (Me = D("flex flex-col gap-5 rounded-2xl", ot), e[47] = ot, e[48] = Me) : Me = e[48];
    const lt = L && "[@media(min-width:1024px)_and_(max-height:900px)]:text-[26px]";
    let Ae;
    e[49] !== lt ? (Ae = D("flex min-w-0 grow items-center justify-between gap-2 text-[28px] font-medium", lt), e[49] = lt, e[50] = Ae) : Ae = e[50];
    let Le;
    e[51] !== i.name ? (Le = t.jsx(u, { ...i.name
    }), e[51] = i.name, e[52] = Le) : Le = e[52];
    let Be;
    e[53] !== j || e[54] !== a || e[55] !== ge ? (Be = !j && ge ? t.jsx("p", {
        className: "text-token-text-secondary absolute top-full mt-2 w-full text-start text-xs",
        "data-testid": `${a}-pricing-column-price-prefix`,
        children: ge
    }) : null, e[53] = j, e[54] = a, e[55] = ge, e[56] = Be) : Be = e[56];
    let Re;
    e[57] !== E || e[58] !== j ? (Re = j && t.jsx("span", {
        className: "text-token-text-primary text-base text-[42px] leading-[48px]",
        children: E.formatMessage(j)
    }), e[57] = E, e[58] = j, e[59] = Re) : Re = e[59];
    let Oe;
    e[60] !== a || e[61] !== Ne ? (Oe = Ne && t.jsx("div", {
        "data-testid": `${a}-pricing-column-cost-skeleton`,
        children: on
    }), e[60] = a, e[61] = Ne, e[62] = Oe) : Oe = e[62];
    let We;
    e[63] !== a || e[64] !== i.summary || e[65] !== L ? (We = i.summary ? t.jsx("p", {
        className: D("text-token-text-primary mt-4 text-base font-medium md:min-h-12", L && "[@media(min-width:1024px)_and_(max-height:900px)]:mt-2 [@media(min-width:1024px)_and_(max-height:900px)]:min-h-0 [@media(min-width:1024px)_and_(max-height:900px)]:text-[15px]"),
        "data-testid": `${a}-pricing-column-cost-summary`,
        children: t.jsx(u, { ...i.summary
        })
    }) : null, e[63] = a, e[64] = i.summary, e[65] = L, e[66] = We) : We = e[66];
    const ct = L && "[@media(min-width:1024px)_and_(max-height:900px)]:mb-2";
    let ie;
    e[67] !== ct ? (ie = D("mb-2.5 w-full", ct), e[67] = ct, e[68] = ie) : ie = e[68];
    let Ue;
    e[69] !== r || e[70] !== ie ? (Ue = t.jsx("div", {
        className: ie,
        children: r
    }), e[69] = r, e[70] = ie, e[71] = Ue) : Ue = e[71];
    let Ve;
    e[72] !== ue || e[73] !== S ? (Ve = ue && t.jsx(Ft, {
        type: S,
        className: "-mt-2",
        children: ue
    }), e[72] = ue, e[73] = S, e[74] = Ve) : Ve = e[74];
    let Ge;
    e[75] !== ye || e[76] !== oe ? (Ge = oe && t.jsx("div", {
        id: ye,
        className: "flex w-full justify-start text-start text-base font-bold",
        children: oe
    }), e[75] = ye, e[76] = oe, e[77] = Ge) : Ge = e[77];
    const dt = oe ? ye : jt;
    let qe;
    e[78] !== Ze || e[79] !== i.advertisedFeatures || e[80] !== dt || e[81] !== L ? (qe = t.jsx(Mn, {
        children: t.jsx(Pn, {
            advertisedFeatures: i.advertisedFeatures,
            ariaLabelledBy: dt,
            planNameForA11y: Ze,
            useCompactDesktopBusinessLayout: L
        })
    }), e[78] = Ze, e[79] = i.advertisedFeatures, e[80] = dt, e[81] = L, e[82] = qe) : qe = e[82];
    let $e;
    e[83] !== k ? ($e = k && On(k) && k ? .referrer_name && t.jsx("div", {
        className: "flex w-full items-center justify-center rounded-md border-[1px] border-[#AF52DE] bg-[#8C43A00D] py-2 text-center",
        children: t.jsx("span", {
            className: "text-l text-[#AF52DE]",
            children: t.jsx(u, {
                id: "PricingModalColumn.referredBy",
                defaultMessage: "{referrer_name} gave you 1 month of free Plus",
                values: {
                    referrer_name: k ? .referrer_name
                }
            })
        })
    }), e[83] = k, e[84] = $e) : $e = e[84];
    const ut = sn && t.jsxs(kt, {
        type: S,
        className: D("mt-3 px-1", L && "[@media(min-width:1024px)_and_(max-height:900px)]:mt-2"),
        children: [i.disclaimer && i.cost && t.jsx("div", {
            children: t.jsx(u, { ...i.disclaimer,
                values: {
                    link: p => t.jsx(mt, {
                        className: "font-medium underline",
                        target: "_blank",
                        rel: "noreferrer",
                        to: i.disclaimer ? .link ? ? "",
                        children: p
                    }),
                    minSeats: nn,
                    article: p => t.jsx(mt, {
                        className: "font-medium underline",
                        target: "_blank",
                        rel: "noreferrer",
                        to: i ? .disclaimer ? .article ? ? "",
                        children: p
                    }),
                    amount: E.formatNumber(i.cost.costValue, {
                        style: "currency",
                        currency: c.currency,
                        trailingZeroDisplay: "stripIfInteger"
                    }),
                    currencySign: E.formatMessage(H.sign),
                    postTrialSeatPrice: yt && tn && se ? E.formatNumber(se.amount, {
                        style: "currency",
                        currency: c.currency,
                        trailingZeroDisplay: "stripIfInteger"
                    }) : void 0
                }
            })
        }), i.disclaimer2 && t.jsx("div", {
            children: t.jsx(u, { ...i.disclaimer2,
                values: {
                    link: p => t.jsx(mt, {
                        className: "font-medium underline",
                        target: "_blank",
                        rel: "noreferrer",
                        to: i.disclaimer2 ? .link ? ? "",
                        children: p
                    })
                }
            })
        }), Dt && (Z ? Z.taxDetails ? .reverseChargeEligible && t.jsx("div", {
            children: t.jsx(u, { ...P.reverseChargeTaxDisclaimer,
                values: {
                    tax_type: Z.taxDetails.taxName
                }
            })
        }) : t.jsx("div", {
            children: t.jsx(u, { ...P.teamPricingVATDisclaimer
            })
        }))]
    });
    let re;
    e[85] !== xe || e[86] !== S ? (re = xe.length > 0 && t.jsx(kt, {
        type: S,
        className: "gap-0.5 pt-1",
        children: xe.map(es)
    }), e[85] = xe, e[86] = S, e[87] = re) : re = e[87];
    let He;
    return e[88] !== ut || e[89] !== re ? (He = t.jsxs("div", {
        children: [ut, re]
    }), e[88] = ut, e[89] = re, e[90] = He) : He = e[90], t.jsxs("div", {
        className: Ie,
        children: [Yt ? t.jsx("div", {
            className: D("pointer-events-none absolute z-[15]", z ? "inset-x-0 -top-9 bottom-0 rounded-t-[16px] rounded-b-xl md:rounded-b-2xl" : "inset-0 rounded-xl md:rounded-2xl", vt),
            "aria-hidden": "true",
            "data-testid": "pricing-column-dropshadow"
        }) : null, z ? t.jsx("div", {
            className: D("pointer-events-none absolute inset-x-0 -top-9 bottom-0 z-20 rounded-t-[16px] rounded-b-xl md:rounded-b-2xl", Ct && bt),
            "aria-hidden": "true",
            "data-testid": "pricing-column-combined-outline",
            style: Ct ? Mt : void 0
        }) : null, Fe, t.jsxs(kn, {
            className: cn,
            "data-testid": `${a}-pricing-modal-column`,
            id: o,
            useCompactDesktopBusinessLayout: L,
            style: Ye ? Mt : void 0,
            type: S,
            children: [rn, dn, t.jsxs(Ft, {
                type: S,
                className: "mt-0",
                children: [t.jsxs("div", {
                    className: Me,
                    children: [t.jsxs("div", {
                        className: "relative flex items-start justify-between gap-2",
                        children: [t.jsxs("h3", {
                            id: jt,
                            className: Ae,
                            children: [Le, t.jsx(In, {
                                promoBadgeType: Ut,
                                useRecommendedBadge: Vt,
                                disablePopularBadge: Gt,
                                activeDiscountMetadata: $,
                                promoMetadata: k,
                                type: S,
                                planType: a,
                                customBadgeLabel: R,
                                customBadgeValues: s,
                                welcomeOfferLabel: Pt,
                                currencySymbol: H,
                                isScheduledPromo: Tt
                            })]
                        }), $t, Be]
                    }), Re, Oe, !j && t.jsxs("div", {
                        className: D("flex items-end gap-1.5", Ke),
                        hidden: Ne,
                        "data-testid": `${a}-pricing-column-cost`,
                        children: [Xe && t.jsx(At, {
                            costTitle: Xe,
                            currencySymbol: H,
                            isStrikethrough: et,
                            priceDetail: Z ? .priceDetails,
                            screenReaderPriceContext: et ? "original" : "default"
                        }), et && Y ? t.jsx(At, {
                            costTitle: Y,
                            currencySymbol: H,
                            screenReaderPriceContext: "discounted"
                        }) : null, t.jsx("div", {
                            className: "flex items-baseline gap-1.5",
                            children: t.jsxs("div", {
                                className: "mt-auto mb-0.5 flex h-full flex-col items-start",
                                children: [t.jsx("p", {
                                    className: "text-token-text-secondary w-full text-[11px]",
                                    children: i.cost ? .costDuration ? t.jsx(u, { ...P.currencyWithDuration,
                                        values: {
                                            currency: E.formatMessage(H.code),
                                            duration: E.formatMessage(i.cost.costDuration)
                                        }
                                    }) : t.jsxs(t.Fragment, {
                                        children: [t.jsx(u, {
                                            id: "PricingModalColumn.currencyCodeWithSlash",
                                            defaultMessage: "{currencyCode} / ",
                                            values: {
                                                currencyCode: E.formatMessage(H.code)
                                            }
                                        }), k && !$ && (Je ? t.jsx(u, { ...P.frequencyWithTaxInformation,
                                            values: {
                                                tax_type: _e(M ? .currencyConfig.tax_type)
                                            }
                                        }) : Qe && Y ? t.jsx(u, { ...P.frequencyWithTaxInformationIncludingAmount,
                                            values: {
                                                tax_type: _e(M ? .currencyConfig.tax_type),
                                                vat_amount: E.formatNumber(Et(Number(Y.defaultMessage ? .toString().replaceAll("*", "")), c.country), {
                                                    style: "currency",
                                                    currency: E.formatMessage(H.code),
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })
                                            }
                                        }) : t.jsx(u, { ...P.frequency
                                        })), (!$ || Je || Qe) && t.jsx("br", {}), k && !$ && i.cost ? .costDuration ? t.jsx(u, { ...i.cost.costDuration
                                        }) : Z ? t.jsx(Zn, {
                                            priceDetails: Z.priceDetails,
                                            taxDetails: Z.taxDetails,
                                            priceDisplayOptions: Ce
                                        }) : Je ? t.jsx(u, { ...P.frequencyWithTaxInformation,
                                            values: {
                                                tax_type: _e(M ? .currencyConfig.tax_type)
                                            }
                                        }) : Qe && Y ? t.jsx(u, { ...P.frequencyWithTaxInformationIncludingAmount,
                                            values: {
                                                tax_type: _e(M ? .currencyConfig.tax_type),
                                                vat_amount: E.formatNumber(Et(Number(Y.defaultMessage ? .toString().replaceAll("*", "")), c.country), {
                                                    style: "currency",
                                                    currency: E.formatMessage(H.code),
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })
                                            }
                                        }) : t.jsx(u, { ...P.frequency
                                        })]
                                    })
                                }), t.jsx("p", {
                                    className: "text-token-text-secondary text-xs",
                                    children: $ && $.discount.expires_at && t.jsx(u, { ...P.remainingDiscountDate,
                                        values: {
                                            remaining_discount_date: $.discount.expires_at
                                        }
                                    })
                                })]
                            })
                        })]
                    })]
                }), !j && _t && Ht ? t.jsx("p", {
                    className: D("text-token-text-tertiary mt-6 mb-3 text-sm", L && "[@media(min-width:1024px)_and_(max-height:900px)]:mt-4 [@media(min-width:1024px)_and_(max-height:900px)]:mb-2"),
                    "data-testid": `${a}-pricing-column-cost-subtitle`,
                    children: t.jsx(u, { ..._t
                    })
                }) : null, We]
            }), Ue, Ve, Ge, qe, $e, He]
        })]
    })
};

function Ot(n) {
    return n ? ce("3768341700").get("is_small_fractional_price_display_enabled", !1) : !1
}

function Un(n, e, a) {
    return a && n === F.SELF_SERVE_BUSINESS ? ft.Year : e
}

function Wt({
    shouldUseSmallFractionalPriceDisplay: n,
    wholeCost: e,
    fractionalCost: a,
    fallback: d
}) {
    return n ? t.jsxs("span", {
        className: "whitespace-nowrap",
        children: [t.jsx("span", {
            children: e
        }), t.jsx("span", {
            className: "inline-block align-super text-[0.55em] leading-none",
            children: a
        })]
    }) : d
}

function At(n) {
    "use forget";
    const e = J.c(40),
        {
            costTitle: a,
            currencySymbol: d,
            isStrikethrough: f,
            priceDetail: i,
            screenReaderPriceContext: r
        } = n,
        l = f === void 0 ? !1 : f,
        m = r === void 0 ? "default" : r,
        o = de();
    if (i) {
        let T;
        return e[0] !== l || e[1] !== i || e[2] !== m ? (T = t.jsx(Vn, {
            priceDetail: i,
            isStrikethrough: l,
            screenReaderPriceContext: m
        }), e[0] = l, e[1] = i, e[2] = m, e[3] = T) : T = e[3], T
    }
    let x, h, _, c, y, v, C;
    if (e[4] !== a || e[5] !== d.sign || e[6] !== o || e[7] !== l || e[8] !== m) {
        const T = o.formatMessage(a),
            j = T.split("."),
            R = j.length === 2,
            s = Ot(R),
            [g, N] = j,
            O = N ? `.${N}` : "";
        let G;
        e[16] !== d.sign || e[17] !== o ? (G = o.formatMessage(d.sign), e[16] = d.sign, e[17] = o, e[18] = G) : G = e[18];
        const V = `${G}${T}`;
        let q;
        e[19] !== V || e[20] !== o || e[21] !== m ? (q = m === "original" ? o.formatMessage(P.screenReaderOriginalPrice, {
            amount: V
        }) : m === "discounted" ? o.formatMessage(P.screenReaderDiscountedPrice, {
            amount: V
        }) : V, e[19] = V, e[20] = o, e[21] = m, e[22] = q) : q = e[22];
        const Q = q;
        c = "text", y = Q;
        const W = !l;
        e[23] !== l || e[24] !== W ? (v = D("flex", {
            "text-token-text-primary": W,
            "text-token-text-tertiary": l
        }), e[23] = l, e[24] = W, e[25] = v) : v = e[25], e[26] !== d.sign ? (C = t.jsx("span", {
            "aria-hidden": "true",
            className: "text-secondary text-xl text-gray-500",
            children: t.jsx(u, { ...d.sign
            })
        }), e[26] = d.sign, e[27] = C) : C = e[27], x = "true", e[28] !== l ? (h = D("text-5xl font-medium", {
            "line-through": l
        }), e[28] = l, e[29] = h) : h = e[29], _ = Wt({
            shouldUseSmallFractionalPriceDisplay: s,
            wholeCost: g,
            fractionalCost: O,
            fallback: T
        }), e[4] = a, e[5] = d.sign, e[6] = o, e[7] = l, e[8] = m, e[9] = x, e[10] = h, e[11] = _, e[12] = c, e[13] = y, e[14] = v, e[15] = C
    } else x = e[9], h = e[10], _ = e[11], c = e[12], y = e[13], v = e[14], C = e[15];
    let I;
    e[30] !== x || e[31] !== h || e[32] !== _ ? (I = t.jsx("span", {
        "aria-hidden": x,
        className: h,
        children: _
    }), e[30] = x, e[31] = h, e[32] = _, e[33] = I) : I = e[33];
    let B;
    return e[34] !== I || e[35] !== c || e[36] !== y || e[37] !== v || e[38] !== C ? (B = t.jsxs("div", {
        role: c,
        "aria-label": y,
        className: v,
        children: [C, I]
    }), e[34] = I, e[35] = c, e[36] = y, e[37] = v, e[38] = C, e[39] = B) : B = e[39], B
}

function Vn(n) {
    "use forget";
    const e = J.c(37),
        {
            priceDetail: a,
            isStrikethrough: d,
            screenReaderPriceContext: f
        } = n,
        i = d === void 0 ? !1 : d,
        r = f === void 0 ? "default" : f,
        l = de();
    let m, o, x, h, _, c, y;
    if (e[0] !== l || e[1] !== i || e[2] !== a.amount || e[3] !== a.currency || e[4] !== r) {
        const I = {
                style: "currency",
                currency: a.currency,
                currencyDisplay: "narrowSymbol",
                trailingZeroDisplay: "stripIfInteger"
            },
            B = new Intl.NumberFormat(l.locale, I).formatToParts(a.amount);
        let T;
        e[12] !== l || e[13] !== a.currency ? (T = l.formatMessage(Rt(a.currency).sign), e[12] = l, e[13] = a.currency, e[14] = T) : T = e[14];
        const j = T,
            R = B.filter(zn),
            s = R.map(Hn).join(""),
            g = R.findIndex($n),
            N = g !== -1,
            O = Ot(N),
            G = N ? R.slice(0, g) : R,
            V = N ? R.slice(g) : [],
            q = G.map(qn).join(""),
            Q = V.map(Gn).join("");
        let W;
        if (e[15] !== l || e[16] !== a.amount || e[17] !== a.currency || e[18] !== r) {
            const w = l.formatNumber(a.amount, {
                style: "currency",
                currency: a.currency,
                currencyDisplay: "narrowSymbol",
                trailingZeroDisplay: "stripIfInteger"
            });
            W = r === "original" ? l.formatMessage(P.screenReaderOriginalPrice, {
                amount: w
            }) : r === "discounted" ? l.formatMessage(P.screenReaderDiscountedPrice, {
                amount: w
            }) : w, e[15] = l, e[16] = a.amount, e[17] = a.currency, e[18] = r, e[19] = W
        } else W = e[19];
        const Ke = W;
        h = "text", _ = Ke;
        const X = !i;
        e[20] !== i || e[21] !== X ? (c = D("flex", {
            "text-token-text-primary": X,
            "text-token-text-tertiary": i
        }), e[20] = i, e[21] = X, e[22] = c) : c = e[22], e[23] !== j ? (y = t.jsx("span", {
            "aria-hidden": "true",
            className: "text-secondary text-xl text-gray-500",
            children: j
        }), e[23] = j, e[24] = y) : y = e[24], m = "true", e[25] !== i ? (o = D("text-5xl font-medium", {
            "line-through": i
        }), e[25] = i, e[26] = o) : o = e[26], x = Wt({
            shouldUseSmallFractionalPriceDisplay: O,
            wholeCost: q,
            fractionalCost: Q,
            fallback: s
        }), e[0] = l, e[1] = i, e[2] = a.amount, e[3] = a.currency, e[4] = r, e[5] = m, e[6] = o, e[7] = x, e[8] = h, e[9] = _, e[10] = c, e[11] = y
    } else m = e[5], o = e[6], x = e[7], h = e[8], _ = e[9], c = e[10], y = e[11];
    let v;
    e[27] !== m || e[28] !== o || e[29] !== x ? (v = t.jsx("span", {
        "aria-hidden": m,
        className: o,
        children: x
    }), e[27] = m, e[28] = o, e[29] = x, e[30] = v) : v = e[30];
    let C;
    return e[31] !== v || e[32] !== h || e[33] !== _ || e[34] !== c || e[35] !== y ? (C = t.jsxs("div", {
        role: h,
        "aria-label": _,
        className: c,
        children: [y, v]
    }), e[31] = v, e[32] = h, e[33] = _, e[34] = c, e[35] = y, e[36] = C) : C = e[36], C
}

function Gn(n) {
    return n.value
}

function qn(n) {
    return n.value
}

function $n(n) {
    return n.type === "decimal"
}

function Hn(n) {
    return n.value
}

function zn(n) {
    return n.type !== "currency"
}

function Lt(n) {
    switch (n) {
        case "tax_name_only":
        case "with_amount":
            return n;
        default:
            return "none"
    }
}

function Kn(n, e) {
    if (!n || n.currencyConfig.symbol_code === "GBP" && _n(e)) return {
        inclusiveTaxDisplay: "none",
        exclusiveTaxDisplay: "none",
        showReverseChargeDisclaimer: !1
    };
    const a = n.currencyConfig.vat_display;
    return {
        inclusiveTaxDisplay: Lt(a.inclusive_tax_display),
        exclusiveTaxDisplay: Lt(a.exclusive_tax_display),
        showReverseChargeDisclaimer: a.show_reverse_charge_disclaimer
    }
}

function Yn(n) {
    const e = ce("3768341700"),
        a = e.get("is_vat_information_enabled", !1),
        d = e.get("is_vat_information_with_amount_enabled", !0),
        f = e.get("is_team_pricing_vat_disclaimer_enabled", !1);
    return n === Dn ? a ? {
        inclusiveTaxDisplay: "tax_name_only",
        exclusiveTaxDisplay: "tax_name_only",
        showReverseChargeDisclaimer: f
    } : d ? {
        inclusiveTaxDisplay: "with_amount",
        exclusiveTaxDisplay: "tax_name_only",
        showReverseChargeDisclaimer: f
    } : {
        inclusiveTaxDisplay: "none",
        exclusiveTaxDisplay: "none",
        showReverseChargeDisclaimer: f
    } : {}
}

function Zn({
    priceDetails: n,
    taxDetails: e,
    priceDisplayOptions: a
}) {
    const d = de(),
        f = {
            tax_type: e ? .taxName ? ? "tax",
            tax_behavior: n.amountTaxBehavior,
            tax_amount: e ? .taxAmount && d.formatNumber(e.taxAmount, {
                style: "currency",
                currency: n.currency,
                currencyDisplay: "narrowSymbol",
                trailingZeroDisplay: "stripIfInteger"
            })
        };
    let i;
    return e == null || e.taxAmount === 0 ? i = "none" : i = n.amountTaxBehavior === bn.Inclusive ? a.inclusiveTaxDisplay : a.exclusiveTaxDisplay, t.jsx(u, { ...Jn({
            displayOption: i
        }),
        values: f
    })
}

function Jn({
    displayOption: n
}) {
    switch (n) {
        case "none":
            return P.frequency;
        case "tax_name_only":
            return P.subscriptionFrequencyTaxInformation;
        case "with_amount":
            return P.subscriptionFrequencyTaxInformationWithAmount
    }
}

function Qn(n, e) {
    return {
        costValue: n.cost ? .costValue,
        costTitle: n.cost ? .costTitle,
        costSubtitle: n.cost ? .costSubtitle,
        currencySymbol: Rt(e)
    }
}
const P = Bt({
    frequency: {
        id: "frequency",
        defaultMessage: "month"
    },
    currencyWithDuration: {
        id: "PricingModalColumn.currencyWithDuration",
        defaultMessage: "{currency} {duration}"
    },
    frequencyWithTaxInformation: {
        id: "frequencyWithTaxInformation",
        defaultMessage: "month (including {tax_type})"
    },
    frequencyWithTaxInformationIncludingAmount: {
        id: "frequencyWithTaxInformationIncludingAmount",
        defaultMessage: "month (includes {vat_amount} of {tax_type})"
    },
    screenReaderOriginalPrice: {
        id: "PricingModalColumn.screenReaderOriginalPrice",
        defaultMessage: "Original price {amount}"
    },
    screenReaderDiscountedPrice: {
        id: "PricingModalColumn.screenReaderDiscountedPrice",
        defaultMessage: "Discounted price {amount}"
    },
    teamPricingVATDisclaimer: {
        id: "pricingPlanConstants.teams.teamPricingVATDisclaimer",
        defaultMessage: "VAT excluded at checkout with valid VAT ID"
    },
    pricingConfigFallback: {
        id: "PricingModalColumn.pricingConfigFallback",
        defaultMessage: "Please reload page, checkout pricing not available."
    },
    remainingDiscountDate: {
        id: "remainingDiscountDate",
        defaultMessage: "until {remaining_discount_date}"
    },
    subscriptionFrequencyTaxInformation: {
        id: "PricingModalColumn.subscriptionFrequencyTaxInformation",
        defaultMessage: "month ({tax_behavior, select, inclusive {inclusive of} exclusive {exclusive of} other {exclusive of} } {tax_type, select, gst {GST} vat {VAT} jct {JCT} other {tax} })"
    },
    subscriptionFrequencyTaxInformationWithAmount: {
        id: "PricingModalColumn.subscriptionFrequencyTaxInformationWithAmount",
        defaultMessage: "month ({tax_behavior, select, inclusive {includes} exclusive {plus} other {plus} } {tax_amount} of {tax_type, select, gst {GST} vat {VAT} jct {JCT} other {tax} })"
    },
    reverseChargeTaxDisclaimer: {
        id: "PricingModalColumn.reverseChargeTaxDisclaimer",
        defaultMessage: "{tax_type, select, gst {GST} vat {VAT} jct {JCT} other {Tax} } excluded at checkout with a valid {tax_type, select, gst {GST} vat {VAT} jct {JCT} other {tax} } ID"
    }
});

function Xn(n) {
    if (!n) return "VAT";
    const e = n.toLowerCase();
    return e === "vat" || e === "gst" || e === "jct" ? e.toUpperCase() : n
}

function es(n, e) {
    return t.jsx("div", {
        children: n
    }, e)
}
export {
    os as P, Wn as a, gt as b, Vn as c, Qn as g
};
//# sourceMappingURL=ff93d687-o2udeu3bt7yl7cne.js.map