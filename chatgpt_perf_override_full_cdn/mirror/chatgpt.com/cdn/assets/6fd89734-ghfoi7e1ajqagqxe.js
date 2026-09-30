import {
    cc as s
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
const S = "redirectedFromAuth",
    _ = "redirectedFromSheerId",
    u = "partner_id",
    o = "codexStudentsCampaignStudentPartnerId",
    i = "studentsPromotion";

function I(t, e) {
    const r = new URLSearchParams;
    e && r.set(e, "true");
    const n = r.toString();
    return n ? `${t}?${n}` : t
}

function c() {
    try {
        return window.localStorage
    } catch {
        return null
    }
}

function R() {
    return c() ? .getItem(o)
}

function p() {
    c() ? .removeItem(o)
}

function A(t) {
    const e = t.get(u);
    e != null && c() ? .setItem(o, e)
}

function P(t = !1) {
    return t ? `https://chatgpt.com/?${i}=true` : `/?${i}=true`
}

function h(t, e) {
    return t === "codex_credits" ? "codex_credits" : e ? "apply_subscription_discount" : "redirect_to_checkout"
}

function f(t) {
    const e = t.hasPaidSubscription(),
        r = t.getLastActiveSubscription(),
        n = e && [s.CHATGPT_IOS, s.SORA_IOS].includes(r.purchase_origin_platform),
        a = e && r.purchase_origin_platform === s.MOBILE_ANDROID;
    return n || a
}
export {
    i as C, _ as R, u as S, R as a, I as b, A as c, S as d, p as e, h as f, P as g, f as h
};
//# sourceMappingURL=6fd89734-ghfoi7e1ajqagqxe.js.map