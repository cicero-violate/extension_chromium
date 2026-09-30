import {
    c as P,
    s as v,
    x as g,
    B0 as F,
    w7 as p
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    h
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    pM as A
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    g as C,
    b as T,
    c as b,
    d as B,
    a as e,
    e as y,
    f as O,
    h as _,
    i as U,
    j as w,
    k as z,
    l as G,
    m as M,
    n as N,
    o as x,
    q as S,
    r as D,
    s as L,
    t as V,
    u as k,
    v as E,
    w as I,
    x as H,
    y as j
} from "./f43ce1f0-cynln2ayrnjv35lb.js";
const u = h({
        featureBazaarAds: {
            id: "pricingBazaarMessages.featureBazaarAds",
            defaultMessage: "Includes ads"
        },
        featureBazaarFree: {
            id: "pricingBazaarMessages.featureBazaarFree",
            defaultMessage: "No ads"
        }
    }),
    f = P(v, "87d086", 20, 20),
    o = () => {
        if (!F()) return {
            adsPlusHeadline: !1,
            plusProNoAds: !1,
            freeGoAds: !1
        };
        const a = g("3607166882");
        return {
            adsPlusHeadline: a.get("ads_plus_headline", !1),
            plusProNoAds: a.get("plus_pro_no_ads", !1),
            freeGoAds: a.get("free_go_ads", !1)
        }
    };

function W(a) {
    const {
        freeGoAds: s
    } = o();
    let t;
    a ? .copyRedesignVariant == 2 || a ? .copyRedesignVariant == 3 ? t = H() : t = j(), s && t.push({
        label: u.featureBazaarAds,
        icon: A
    });
    const r = e.freeOutcome.headline;
    return {
        name: e.free.freeName,
        callToAction: {
            active: a ? .shouldUseOnboardingFeatures ? e.free.freeCTA_UnifiedAccountCreation_Experiment : e.free.freeCTA,
            create: a ? .shouldUseOnboardingFeatures ? e.free.freeCTA_UnifiedAccountCreation_Experiment : e.free.freeCTA,
            inactive: a ? .shouldUseOnboardingFeatures ? e.free.freeCTA_UnifiedAccountCreation_Experiment : e.free.freeCTA,
            downgrade: e.free.freeDowngrade
        },
        summary: r,
        cost: {
            costValue: 0,
            costTitle: e.free.freeCost
        },
        advertisedFeatures: t
    }
}

function q({
    isCheckoutRedesign: a,
    isFreeTrial: s,
    copyRedesignVariant: t = 0
} = {}) {
    const r = C(),
        n = a ? g("466180932").get("reminder_enabled", !0) : !0,
        i = T({
            includeReminder: n
        }),
        {
            adsPlusHeadline: l,
            plusProNoAds: c
        } = o();
    let d;
    s ? d = i : a ? d = r : t == 2 || t == 3 ? d = b() : d = B(), c && d.push({
        label: u.featureBazaarFree,
        icon: f
    });
    let m = a ? e.plusRedesign.headline : e.plusOutcome.headline;
    return l && !a && (m = e.plusOutcome.headlineAdsFree), {
        name: e.plus.plusName,
        callToAction: {
            active: e.plus.plusActive,
            create: e.plus.plusActive,
            inactive: e.plus.plusInactiveUpgrade,
            inactiveUnauthenticated: e.plus.plusInactiveUnauthenticated,
            downgrade: e.plus.plusDowngrade
        },
        summary: m,
        advertisedFeatures: d
    }
}

function Y(a) {
    const s = a ? .isCheckoutRedesign,
        t = a ? .isFreeTrial,
        r = a ? .businessCopyVariant ? ? "default",
        n = a ? .addCodexOnlySeatsFeature ? ? !1,
        i = s ? g("466180932").get("reminder_enabled", !0) : !0;
    let l;
    t ? l = N({
        includeReminder: i
    }) : s ? l = x() : r === "proliteLaunch" ? l = S() : l = D(), n && l != null && (l = [...l, L()]);
    const c = s ? e.team.teamPlanSummary : e.teamOutcome.headline;
    return {
        name: e.team.teamPlanName,
        summary: c,
        disclaimer: r === "default" ? e.team.teamPricingDisclaimer : V.pricingDisclaimerSeats,
        disclaimer2: e.team.teamPricingDisclaimer2,
        advertisedFeatures: l,
        callToAction: {
            active: e.team.teamPlanActive,
            create: e.team.teamPlanCreate,
            inactive: a ? .shouldUseOnboardingFeatures && a ? .isTrialEnabled ? e.team.teamPlanInactive_UnifiedAccountCreation_Experiment : e.team.teamPlanInactiveUpgrade,
            downgrade: e.team.teamPlanDowngrade
        }
    }
}

function X({
    isCheckoutRedesign: a,
    copyRedesignVariant: s = 0,
    shouldUseProliteRedesignCheckoutValueProps: t = !1,
    planToggleEnalbled: r = !1
} = {}) {
    const {
        plusProNoAds: n
    } = o();
    let i;
    return a ? i = t ? _() : U() : s == 1 ? i = w() : s == 2 || s == 3 ? i = z() : i = G(), r && (i = [{
        label: M.featureHigherUsageLimitsProOnly,
        icon: p
    }, ...i ? ? []], i.splice(1, 1)), n && i.push({
        label: u.featureBazaarFree,
        icon: f
    }), {
        name: e.pro.proName,
        callToAction: {
            active: e.pro.proActive,
            create: e.pro.proActive,
            inactive: e.pro.proInactiveUpgrade,
            downgrade: e.pro.proDowngrade
        },
        summary: a ? e.proRedesign.headline : e.proOutcome.headline,
        advertisedFeatures: i,
        disclaimer: e.pro.proPricingDisclaimer
    }
}

function Z({
    isCheckoutRedesign: a,
    copyRedesignVariant: s = 0,
    shouldUseProliteRedesignCheckoutValueProps: t = !1,
    planToggleEnalbled: r = !1
} = {}) {
    const n = X({
        isCheckoutRedesign: a,
        shouldUseProliteRedesignCheckoutValueProps: t,
        copyRedesignVariant: s
    });
    if (r && (n.advertisedFeatures = [{
            label: y.featureHigherUsageLimits,
            icon: p
        }, ...n.advertisedFeatures ? ? []], n.advertisedFeatures.splice(1, 1)), a && t) {
        n.advertisedFeatures = O();
        const {
            plusProNoAds: i
        } = o();
        i && n.advertisedFeatures.push({
            label: u.featureBazaarFree,
            icon: f
        })
    }
    return n
}
const $ = () => ({ ...q(),
    advertisedFeatures: [{
        label: e.plus.studentAdvertisedFeatures1
    }, {
        label: e.plus.studentAdvertisedFeatures2
    }, {
        label: e.plus.studentAdvertisedFeatures3
    }, {
        label: e.plus.studentAdvertisedFeatures4
    }]
});

function ee({
    isCheckoutRedesign: a,
    copyRedesignVariant: s = 0
} = {}) {
    const {
        freeGoAds: t
    } = o();
    let r;
    a ? r = k() : s == 2 || s == 3 ? r = E() : r = I(), t && r.push({
        label: u.featureBazaarAds,
        icon: A
    });
    const n = a ? e.goRedesign.headline : e.goOutcome.headlineUpdated;
    return {
        name: e.go.goName,
        callToAction: {
            active: e.go.goCTAActive,
            create: e.go.goCTAActive,
            inactive: e.go.goCTA,
            downgrade: e.go.goDowngrade,
            promo: e.go.goCTAPromo
        },
        summary: n,
        advertisedFeatures: r
    }
}
export {
    W as a, Z as b, X as c, Y as d, ee as e, $ as f, q as g
};
//# sourceMappingURL=c8503b70-cdz59z0vq5rtsgxa.js.map