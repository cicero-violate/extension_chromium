import {
    c as m
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    z as p,
    n as F,
    q as f
} from "./4813494d-javwxs2rmzsrunl2.js";

function A(s) {
    "use forget";
    const e = m.c(8),
        o = p(),
        q = !F();
    let n;
    e[0] !== s ? .requiresFeatureGate ? (n = s ? .requiresFeatureGate === !1 ? !0 : f("3148583717"), e[0] = s ? .requiresFeatureGate, e[1] = n) : n = e[1];
    const t = n;
    if (q) {
        const i = t ? "none" : "disabled";
        let a;
        return e[2] !== t || e[3] !== i ? (a = {
            isEnabled: t,
            reason: i
        }, e[2] = t, e[3] = i, e[4] = a) : a = e[4], a
    }
    const l = o ? .isDelinquent,
        d = o ? .ssoConnectionName,
        c = t && !l && !d,
        u = t ? l ? "delinquent" : d ? "sso" : "none" : "disabled";
    let r;
    return e[5] !== c || e[6] !== u ? (r = {
        isEnabled: c,
        reason: u
    }, e[5] = c, e[6] = u, e[7] = r) : r = e[7], r
}

function S(s) {
    return s ? .requiresFeatureGate === !1 ? !0 : f("1759425419")
}
export {
    S as c, A as u
};
//# sourceMappingURL=5240f773-onb94gf2mec5uo8x.js.map