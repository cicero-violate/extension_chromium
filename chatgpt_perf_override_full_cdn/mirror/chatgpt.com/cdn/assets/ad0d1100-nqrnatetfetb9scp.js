import {
    c as z,
    u as B,
    r as E,
    j as t,
    o as C,
    h as F
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    xW as R,
    z as W,
    vu as q,
    e as H,
    xX as k,
    D as Y,
    c8 as $,
    cz as j,
    a0 as J,
    bJ as K,
    xY as P,
    x7 as Q,
    x8 as G,
    h5 as X,
    aA as Z
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    cJ as V,
    b7 as ee
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function te(e) {
    switch (e) {
        case k.SSOMismatch:
            return {
                title: a.cannotAccessWorkspace,
                description: a.ssoMismatchDescription
            };
        case k.RequireSSOLogin:
            return {
                title: a.cannotAccessWorkspace,
                description: a.requireSSODescription
            };
        case k.UnexpectedSSOLogin:
            return {
                title: a.cannotAccessWorkspace,
                description: a.unexpectedSSODescription
            }
    }
}
const se = 2e3;

function re() {
    "use forget";
    const e = z.c(30),
        s = R(),
        o = W(),
        w = B(),
        D = q(),
        b = H(ae),
        c = s ? .errorCode,
        d = s != null && b && D == null && !!o,
        [I, v] = E.useState(!1);
    let m, p;
    e[0] !== d ? (m = () => {
        d && setTimeout(() => {
            v(!0)
        }, se)
    }, p = [d], e[0] = d, e[1] = m, e[2] = p) : (m = e[1], p = e[2]), E.useEffect(m, p);
    const U = c === k.UnexpectedSSOLogin,
        h = d && (U ? I : !0),
        n = V();
    let f, S;
    if (e[3] !== n || e[4] !== c || e[5] !== h ? (f = () => {
            if (!c || !h) return;
            const T = n ? .split("@") ? .[1];
            Y.addError(`SSO Catch All Modal: ${c} for ${n??"unknown user"}`, {
                sso_error: c,
                email: n,
                email_hostname: T
            })
        }, S = [c, h, n], e[3] = n, e[4] = c, e[5] = h, e[6] = f, e[7] = S) : (f = e[6], S = e[7]), E.useEffect(f, S), !h) return null;
    let g;
    e[8] !== w || e[9] !== s.accountName || e[10] !== o ? .name ? (g = s ? .accountName ? ? o ? .name ? ? w.formatMessage(a.workspacePlaceholder), e[8] = w, e[9] = s.accountName, e[10] = o ? .name, e[11] = g) : g = e[11];
    const _ = g;
    let O;
    e[12] !== o ? (O = () => {
        const T = o ? .ssoConnectionName ? {
            connection: o.ssoConnectionName
        } : void 0;
        $({
            fallbackScreenHint: "login",
            additionalAuthParams: T
        })
    }, e[12] = o, e[13] = O) : O = e[13];
    const y = O;
    let x;
    e[14] !== s.errorCode ? (x = te(s.errorCode), e[14] = s.errorCode, e[15] = x) : x = e[15];
    const {
        title: N,
        description: L
    } = x;
    let i;
    e[16] !== N ? (i = t.jsx("div", {
        className: "flex flex-col",
        children: t.jsx("div", {
            className: "text-lg",
            children: t.jsx(C, { ...N
            })
        })
    }), e[16] = N, e[17] = i) : i = e[17];
    let r;
    e[18] !== _ ? (r = t.jsx(C, { ...a.authenticateNotice,
        values: {
            workspaceName: _
        }
    }), e[18] = _, e[19] = r) : r = e[19];
    let l;
    e[20] !== y || e[21] !== r ? (l = t.jsx(j.Button, {
        onClick: y,
        color: "primary",
        children: r
    }), e[20] = y, e[21] = r, e[22] = l) : l = e[22];
    let M;
    e[23] === Symbol.for("react.memo_cache_sentinel") ? (M = t.jsx(j.Button, {
        onClick: oe,
        children: t.jsx(C, {
            id: "KlMYRb",
            defaultMessage: "Log out"
        })
    }), e[23] = M) : M = e[23];
    let u;
    e[24] !== L ? (u = t.jsx("div", {
        className: "flex flex-col space-y-4",
        children: t.jsx("div", {
            children: t.jsx(C, { ...L
            })
        })
    }), e[24] = L, e[25] = u) : u = e[25];
    let A;
    return e[26] !== u || e[27] !== i || e[28] !== l ? (A = t.jsx(J, {
        testId: "modal-sso-catch-all",
        isOpen: !0,
        onClose: K,
        type: "warning",
        size: "custom",
        className: "max-w-3xl",
        title: i,
        icon: ee,
        primaryButton: l,
        secondaryButton: M,
        children: u
    }), e[26] = u, e[27] = i, e[28] = l, e[29] = A) : A = e[29], A
}

function oe() {
    Q({
        location: "sso_catch_all_modal"
    }, G.ACCESS_LOGOUT_ACTION_LOCATION_SSO_CATCH_ALL_MODAL), X({
        reason: Z.SsoCatchAll,
        source: "business.sso-catch-all-modal"
    })
}

function ae() {
    return P().isFetched
}
const a = F({
    authenticateNotice: {
        id: "zF1QJE",
        defaultMessage: "Authenticate to {workspaceName}"
    },
    workspacePlaceholder: {
        id: "IIY4N4",
        defaultMessage: "this workspace"
    },
    cannotAccessWorkspace: {
        id: "IlXHdd",
        defaultMessage: "Cannot Access This Workspace"
    },
    ssoMismatchDescription: {
        id: "xSuU9q",
        defaultMessage: "The SSO you logged in with does not match the SSO registered for this workspace. Try re-authenticating with that SSO."
    },
    unexpectedSSODescription: {
        id: "uSkRZx",
        defaultMessage: "This workspace doesn't have an SSO associated with it, but you're trying to log in with SSO. Try logging in with social authentication (i.e. Google) or with your password."
    },
    requireSSODescription: {
        id: "akKMy1",
        defaultMessage: "Your organization requires that you log in with SSO to access this workspace"
    }
});
export {
    re as
    default
};
//# sourceMappingURL=ad0d1100-nqrnatetfetb9scp.js.map