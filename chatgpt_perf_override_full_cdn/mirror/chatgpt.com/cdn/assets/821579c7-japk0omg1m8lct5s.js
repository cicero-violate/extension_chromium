import {
    c as u,
    t as h
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    aW as f,
    w as d,
    v$ as v,
    o$ as S
} from "./4813494d-javwxs2rmzsrunl2.js";

function P() {
    "use forget";
    const e = u.c(4);
    let t;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (t = f(), e[0] = t) : t = e[0];
    const {
        session: r
    } = t;
    let o;
    e[1] === Symbol.for("react.memo_cache_sentinel") ? (o = () => r ? .authProvider ? ? d(typeof window < "u" ? new URLSearchParams(window.location.search) : new URLSearchParams), e[1] = o) : o = e[1], r ? .authProvider;
    const i = o;
    let a;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (a = c => {
        const n = c === void 0 ? {} : c,
            m = n.authProvider ? ? i();
        return h.signIn(m, {
            callbackUrl: n.callbackUrl
        }, v({
            deviceID: S(),
            user: r ? .user,
            params: n.authorizationParams
        }))
    }, e[2] = a) : a = e[2], r ? .user;
    const l = a;
    let s;
    return e[3] === Symbol.for("react.memo_cache_sentinel") ? (s = {
        signInForReauth: l
    }, e[3] = s) : s = e[3], s
}
export {
    P as u
};
//# sourceMappingURL=821579c7-japk0omg1m8lct5s.js.map