import {
    c as y,
    u as S,
    r as x,
    h as E,
    j as T
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    e as _,
    jL as v,
    x as C,
    af as h,
    _ as L,
    wB as w
} from "./4813494d-javwxs2rmzsrunl2.js";
const A = "3325557425";

function O({
    context: n,
    businessBenefitEnabled: e,
    businessTrustEnabled: r
}) {
    return n !== "business" ? "default" : e ? "business_benefit" : r ? "business_trust" : "default"
}

function W(n) {
    "use forget";
    const e = y.c(17),
        {
            context: r
        } = n,
        g = r === void 0 ? "default" : r,
        s = S();
    let c;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (c = [], e[0] = c) : c = e[0], x.useEffect(I, c);
    const b = _(v);
    let u;
    if (e[1] !== g) {
        const k = g === "business" ? C(A) : null;
        u = O({
            context: g,
            businessBenefitEnabled: k ? .get("business_benefit_enabled", !1) ? ? !1,
            businessTrustEnabled: k ? .get("business_trust_enabled", !1) ? ? !1
        }), e[1] = g, e[2] = u
    } else u = e[2];
    const d = u;
    let l;
    e[3] !== s || e[4] !== d ? (l = d === "business_benefit" ? [s.formatMessage(a.preparingTeamWorkspace), s.formatMessage(a.turningOnAdvancedModels), s.formatMessage(a.loadingTeamSettings), s.formatMessage(a.increasingFileStorage), s.formatMessage(a.expandingConnectors), s.formatMessage(a.gettingTeamReady)] : d === "business_trust" ? [s.formatMessage(a.preparingSecureWorkspace), s.formatMessage(a.applyingAdminControls), s.formatMessage(a.creatingTrainingExclusions), s.formatMessage(a.checkingSecuritySettings), s.formatMessage(a.turningOnEncryption), s.formatMessage(a.finalizingTeamSetup)] : [s.formatMessage(a.turboBoost), s.formatMessage(a.advancedVoice), s.formatMessage(a.imageGenerators), s.formatMessage(a.reasoningEngines), s.formatMessage(a.moreFiles), s.formatMessage(a.bigIdeas)], e[3] = s, e[4] = d, e[5] = l) : l = e[5];
    const m = l;
    let t;
    e[6] !== s ? (t = s.formatMessage(a.loadingPrimary), e[6] = s, e[7] = t) : t = e[7];
    const p = b ? "min-w-[360px]" : "w-full";
    let i;
    e[8] !== p ? (i = h(p), e[8] = p, e[9] = i) : i = e[9];
    const M = b ? "min-w-[360px]" : "w-full";
    let o;
    e[10] !== M ? (o = h(M), e[10] = M, e[11] = o) : o = e[11];
    let f;
    return e[12] !== m || e[13] !== t || e[14] !== i || e[15] !== o ? (f = T.jsx(w, {
        className: "min-h-[320px]",
        primaryText: t,
        secondaryTexts: m,
        primaryTextClassName: i,
        secondaryTextClassName: o,
        rotationIntervalMs: 2600
    }), e[12] = m, e[13] = t, e[14] = i, e[15] = o, e[16] = f) : f = e[16], f
}

function I() {
    const n = performance.now();
    return () => {
        if (n) {
            const e = performance.now() - n;
            L.logValueEventWithStatsig({
                segmentEventName: "Checkout Page Loading Time Spent MS",
                statsigEventName: "chatgpt_web_checkout_loading_page_time_spent_ms",
                value: Math.round(e)
            })
        }
    }
}
const a = E({
    loadingPrimary: {
        id: "checkout.loading.primary",
        defaultMessage: "Getting your plan ready"
    },
    turboBoost: {
        id: "checkout.loading.turboBoost",
        defaultMessage: "Giving your chat a little turbo boost"
    },
    advancedVoice: {
        id: "checkout.loading.advancedVoice",
        defaultMessage: "Unlocking access to advanced voice"
    },
    imageGenerators: {
        id: "checkout.loading.imageGenerators",
        defaultMessage: "Warming up the image generators"
    },
    reasoningEngines: {
        id: "checkout.loading.reasoningEngines",
        defaultMessage: "Dusting off the reasoning engines"
    },
    moreFiles: {
        id: "checkout.loading.moreFiles",
        defaultMessage: "Making room for even more files"
    },
    bigIdeas: {
        id: "checkout.loading.bigIdeas",
        defaultMessage: "Setting the stage for your big ideas"
    },
    preparingTeamWorkspace: {
        id: "checkout.loading.business.preparingTeamWorkspace",
        defaultMessage: "Preparing your team workspace"
    },
    turningOnAdvancedModels: {
        id: "checkout.loading.business.turningOnAdvancedModels",
        defaultMessage: "Turning on advanced models"
    },
    loadingTeamSettings: {
        id: "checkout.loading.business.loadingTeamSettings",
        defaultMessage: "Loading team settings and shared projects"
    },
    increasingFileStorage: {
        id: "checkout.loading.business.increasingFileStorage",
        defaultMessage: "Increasing file storage"
    },
    expandingConnectors: {
        id: "checkout.loading.business.expandingConnectors",
        defaultMessage: "Expanding connectors for company knowledge"
    },
    gettingTeamReady: {
        id: "checkout.loading.business.gettingTeamReady",
        defaultMessage: "Getting your team ready to work"
    },
    preparingSecureWorkspace: {
        id: "checkout.loading.business.preparingSecureWorkspace",
        defaultMessage: "Preparing your secure workspace"
    },
    applyingAdminControls: {
        id: "checkout.loading.business.applyingAdminControls",
        defaultMessage: "Adding admin and billing controls"
    },
    creatingTrainingExclusions: {
        id: "checkout.loading.business.creatingTrainingExclusions",
        defaultMessage: "Creating training exclusions"
    },
    checkingSecuritySettings: {
        id: "checkout.loading.business.checkingSecuritySettings",
        defaultMessage: "Checking workspace security settings"
    },
    turningOnEncryption: {
        id: "checkout.loading.business.turningOnEncryption",
        defaultMessage: "Turning on encryption"
    },
    finalizingTeamSetup: {
        id: "checkout.loading.business.finalizingTeamSetup",
        defaultMessage: "Finalizing setup for your team"
    }
});
export {
    W as C
};
//# sourceMappingURL=5122872a-nypuctj6mwd8megp.js.map