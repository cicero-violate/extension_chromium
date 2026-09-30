import {
    r as o,
    j as d,
    h as m
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    _ as s,
    aw as E,
    fZ as y,
    A as t,
    x as _
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    g as f
} from "./b8f3be97-cabh0vwwkxj2eime.js";
const C = () => {
    s.logEvent("Account Portal: Click Get Help")
};

function S(e) {
    if (y(e)) return "secondary";
    switch (e) {
        case t.GUEST:
        case t.FREE:
        case t.GO:
        case t.PLUS:
        case t.FREE_WORKSPACE:
            return "green";
        case t.SELF_SERVE_BUSINESS:
            return "primary";
        case t.PRO:
        case t.PROLITE:
            return "primary";
        default:
            return "green"
    }
}

function x({
    isCurrentPlan: e = !1,
    planType: r,
    disabled: a,
    loading: n = !1,
    onClick: u,
    children: c,
    testId: g,
    activeColor: i,
    ...p
}) {
    return d.jsx(E, {
        fullWidth: !0,
        size: "large",
        color: e ? "secondary" : i || S(r),
        disabled: a,
        loading: n,
        onClick: u,
        "data-testid": g,
        className: a ? "bg-token-sidebar-surface-tertiary text-token-text-primary hover:bg-token-sidebar-surface-tertiary dark:bg-token-text-tertiary border-none font-semibold" : "font-semibold",
        ...p,
        children: c
    })
}

function F(e, r) {
    const [a, n] = o.useState(!1);
    o.useEffect(() => {
        if (!a) {
            n(!0);
            return
        }
        e ? s.logEventWithStatsig("Email Verify Popup Shown", "chatgpt_email_verify_popup_shown", r) : s.logEventWithStatsig("Email Verify Popup Hidden", "chatgpt_email_verify_popup_hidden", r)
    }, [e])
}
const P = m({
    claimFreeOffer: {
        id: "pricingColumn.freeTrial.claimFreeOffer",
        defaultMessage: "Claim free offer"
    },
    redeemFreeOffer: {
        id: "pricingColumn.freeTrial.redeemFreeOffer",
        defaultMessage: "Redeem free offer"
    },
    claimSpecialOffer: {
        id: "pricingColumn.specialOffer.claimSpecialOffer",
        defaultMessage: "Claim special offer"
    }
});

function L({
    currentAccount: e,
    planType: r
}) {
    return e.hasPaidSubscription() ? f(r) < f(e.planType) : !1
}

function R({
    isFreeTrialEligible: e
}) {
    return e ? {
        message: P.claimFreeOffer
    } : null
}

function l({
    shouldLogExposure: e
}) {
    return _("2273762597", {
        disableExposureLog: !e
    })
}

function T({
    shouldLogExposure: e
}) {
    return l({
        shouldLogExposure: e
    }).get("web_plus_intro_offer_coupon", "none")
}

function k({
    shouldLogExposure: e
}) {
    return l({
        shouldLogExposure: e
    }).get("is_plus_intro_offer_enabled", !1)
}
export {
    x as S, P as a, L as b, R as c, T as g, C as h, k as i, F as u
};
//# sourceMappingURL=a4d26868-b1n5zb5pfqw48lrd.js.map