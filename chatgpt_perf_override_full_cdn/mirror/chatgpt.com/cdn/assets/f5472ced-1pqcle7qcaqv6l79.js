const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/39fb7e9c-mny7r1o5jm9rw6wx.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/5e6083c9-ikqxxdaz48rxk9nq.js", "assets/02833de5-dv0o4y10dk4nqsl1.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/conversation-small-cqp6votf.css", "assets/6b0792f1-lo4a1lox5ffp116e.js", "assets/1bc04b52-gc6v5meb9hb00ycw.js", "assets/c51faa14-j5lgr2f6495a8l89.js", "assets/32d062bc-c88yuanmxvxlo19o.js", "assets/72259948-j0n7o2pxkbqwdi5g.js", "assets/821579c7-japk0omg1m8lct5s.js"]))) => i.map(i => d[i]);
import {
    R as p,
    av as q,
    Cc as D,
    ch as N,
    aW as H,
    eQ as Q,
    Cd as C,
    aU as O,
    aX as W
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    x as T,
    y as R,
    z as K,
    _ as x,
    c as B,
    r as J
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    u as j
} from "./821579c7-japk0omg1m8lct5s.js";
var z = (e => (e.SMS = "sms", e.WHATSAPP = "whatsapp", e))(z || {});

function ie() {
    const e = T();
    return R({
        mutationFn: ({
            factor: t,
            phoneNumber: r = void 0,
            channel: a
        }) => p.safePost("/accounts/mfa/enroll", {
            requestBody: {
                factor_type: t,
                phone_number: r,
                phone_verification_channel: a
            }
        }),
        onSuccess: () => {
            e.invalidateQueries({
                queryKey: ["mfaInfo"]
            })
        }
    })
}

function oe() {
    const e = T();
    return R({
        mutationFn: ({
            factor: t,
            sessionId: r,
            code: a
        }) => p.safePost("/accounts/mfa/user/activate_enrollment", {
            requestBody: {
                code: a,
                factor_type: t,
                session_id: r
            }
        }),
        onSuccess: () => {
            e.invalidateQueries({
                queryKey: ["mfaInfo"]
            })
        }
    })
}

function ue() {
    const e = T();
    return R({
        mutationFn: ({
            factorId: t
        }) => p.safePost("/accounts/mfa/user/disable_in_house", {
            requestBody: {
                factor_id: t
            }
        }),
        onSuccess: () => {
            e.invalidateQueries({
                queryKey: ["mfaInfo"]
            })
        }
    })
}

function G({
    enabled: e = !0
} = {}) {
    const r = q() ? .includes(D);
    return K({
        queryKey: ["mfaInfo"],
        queryFn: () => p.safeGet("/accounts/mfa_info", {}),
        enabled: r && e
    })
}

function ce({
    enabled: e = !0
} = {}) {
    const t = G({
        enabled: e
    });
    let r;
    return t.isLoading ? r = "loading" : t.isError ? r = "error" : t.data ? .mfa_enabled_v2 ? r = "enabled" : r = "disabled", {
        status: r,
        native_default_factor_id: t.data ? .native_default_factor_id,
        factors: t.data ? .factors,
        show_push_auth: t.data ? .show_push_auth ? ? !1,
        show_sms: t.data ? .show_sms ? ? !1,
        retry: t.refetch
    }
}
const le = N(() => x(() =>
    import ("./39fb7e9c-mny7r1o5jm9rw6wx.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])).then(e => e.EnterPhoneNumberModal));

function k() {
    return typeof window < "u" && !!window.location ? .origin ? window.location.origin : "https://chatgpt.com"
}
const V = 240;

function U(e) {
    if (!e) throw new Error("No session found, cannot enable MFA");
    if (e.authProvider === "mocked") throw new Error("Mock users can't enable MFA! Please setup Auth0 following the instructions in the README")
}

function X(e) {
    try {
        return Q(e)
    } catch {
        throw new Error("Unable to decode access token")
    }
}

function $(e) {
    return e.pwd_auth_time
}

function Y(e) {
    const t = $(e);
    if (!t) return !0;
    const r = t / 1e3;
    return Date.now() / 1e3 - r > V
}

function Z(e) {
    return e[C] ? .required === "yes"
}
var ee = (e => (e.PushAuth = "push_auth", e.Totp = "totp", e.Sms = "sms", e))(ee || {}),
    te = (e => (e.Enable = "enable", e.Disable = "disable", e))(te || {});

function A(e) {
    const t = k();
    if (e) return new URL(e, t);
    const r = new URL("/", t);
    if (typeof window < "u" && window.location ? .pathname === "/security-settings") r.pathname = "/security-settings", r.hash = "";
    else {
        const _ = O(W.Security).hash;
        r.hash = _ || "settings"
    }
    return r
}

function M(e, t) {
    const r = A(t),
        a = new URLSearchParams(r.search);
    return a.set("action", "enable"), a.set("factor", e), a.delete("factor_id"), r.search = a.toString(), r.toString()
}

function L(e) {
    const t = A(),
        r = new URLSearchParams;
    return r.set("action", "disable"), r.set("factor_id", e), t.search = r.toString(), t.toString()
}

function fe(e) {
    "use forget";
    const t = B.c(12);
    let r;
    t[0] === Symbol.for("react.memo_cache_sentinel") ? (r = H(), t[0] = r) : r = t[0];
    const {
        session: a
    } = r, {
        signInForReauth: _
    } = j(), [v, f] = J.useState(!1), F = a ? .user ? .idp === "auth0", I = !!a ? .user ? .mfa;
    let g;
    t[1] !== _ ? (g = async (h, s, c, i, o, d) => {
        const u = s === void 0 ? !1 : s;
        U(a);
        let w = !0;
        if (a ? .accessToken) {
            const l = X(a.accessToken);
            w = Y(l) || u && !Z(l)
        }
        if (w) {
            f(!0);
            const l = {
                type: "refresh",
                action: c,
                factor: i,
                ...o != null ? {
                    factorId: o
                } : {}
            };
            return d && typeof window < "u" && window.SecurityNative ? window.SecurityNative.postMessage(btoa(JSON.stringify(l))) : d && window.webkit ? .messageHandlers ? .securityNative ? window.webkit.messageHandlers.securityNative.postMessage(btoa(JSON.stringify(l))) : _({
                callbackUrl: h
            }), !0
        }
        return !1
    }, t[1] = _, t[2] = g) : g = t[2];
    const n = g;
    let m;
    t[3] !== n || t[4] !== e.redirectUrl ? (m = async (h, s) => {
        const c = h === void 0 ? "totp" : h;
        U(a), f(!0);
        const i = k();
        if (c === "totp") {
            if (!s ? .native_modal) {
                const l = new URL("/auth/enroll_mfa", i);
                l.searchParams.set("factor", c), e.redirectUrl && l.searchParams.set("redirect_path", e.redirectUrl);
                const P = l.toString();
                return await n(P, !1, "enable", "totp", null, s ? .mobile_webview ? ? !1) ? !0 : (window.location.href = P, f(!1), !1)
            }
            const u = M("totp", e.redirectUrl);
            return await n(u, !1, "enable", "totp", null, s ? .mobile_webview ? ? !1) ? !0 : (f(!1), !1)
        }
        if (c === "passkey") {
            const u = new URL("/auth/enroll_mfa", i);
            u.searchParams.set("factor", c), e.redirectUrl && u.searchParams.set("redirect_path", e.redirectUrl);
            const w = u.toString();
            return await n(w, !1, "enable", "passkey", null, s ? .mobile_webview ? ? !1) ? !0 : (window.location.href = w, f(!1), !1)
        }
        if (c === "push_auth") {
            const u = M("push_auth", e.redirectUrl);
            return await n(u, !1, "enable", "push_auth", null, s ? .mobile_webview ? ? !1) ? !0 : (f(!1), !1)
        }
        const o = M("sms", e.redirectUrl);
        return await n(o, !1, "enable", "sms", null, s ? .mobile_webview ? ? !1) ? !0 : (f(!1), !1)
    }, t[3] = n, t[4] = e.redirectUrl, t[5] = m) : m = t[5];
    const S = m;
    let y;
    t[6] !== n ? (y = async (h, s, c) => {
        const i = h === void 0 ? "totp" : h,
            o = s === void 0 ? "" : s;
        if (U(a), i === "push_auth" || i === "sms" || i === "totp") {
            if (!o) throw new Error("Factor ID is required for MFA factor removal");
            const d = L(o);
            return await n(d, !0, "disable", i, o, c ? .mobile_webview ? ? !1) ? !0 : (f(!1), !1)
        }
        if (i === "passkey") {
            if (!o) throw new Error("Factor ID is required for MFA factor removal");
            const d = new URL(L(o));
            return d.searchParams.set("factor", "passkey"), await n(d.toString(), !0, "disable", "passkey", o, c ? .mobile_webview ? ? !1) ? !0 : (f(!1), !1)
        }
        throw new Error("Failed to remove invalid factor type:" + i)
    }, t[6] = n, t[7] = y) : y = t[7];
    const E = y;
    let b;
    return t[8] !== v || t[9] !== E || t[10] !== S ? (b = {
        setupMfa: S,
        isUsernamePassword: F,
        isLoggedInWithMfa: I,
        removeMfa: E,
        isLoadingRedirect: v
    }, t[8] = v, t[9] = E, t[10] = S, t[11] = b) : b = t[11], b
}
export {
    le as E, te as M, z as P, ie as a, fe as b, oe as c, ue as d, ee as e, ce as u
};
//# sourceMappingURL=f5472ced-1pqcle7qcaqv6l79.js.map