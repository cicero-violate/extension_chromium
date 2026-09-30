import {
    V as f
} from "./cedbe818-h2t8e4spzi3rf7zt.js";
import {
    p
} from "./1bc04b52-azjat95ys7fdae39.js";
import {
    ci as l
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function d(r, e, n) {
    const a = e ? .data.name ? .trim();
    if (a) return a;
    const o = g(r, n ? ? null);
    if (o) return o;
    if (e == null || e.isPersonalAccount()) {
        const t = s(r, n);
        return t || r.formatMessage(l.personalWorkspaceTitle)
    }
    return r.formatMessage(l.defaultWorkspaceTitle)
}

function A(r, e) {
    const n = s(r, e);
    return n || d(r, null, e)
}

function g(r, e) {
    const n = e ? .email ? .trim() ? ? null;
    if (!n || !f.test(n)) return null;
    if (e ? .email_domain_type === "social") return s(r, e);
    const a = k(n);
    return a || null
}

function s(r, e) {
    const n = e ? .name ? .trim();
    return n ? r.formatMessage(l.personalDefaultWorkspaceTitle, {
        name: n
    }) : null
}

function k(r) {
    const e = r.split("@")[1] ? .toLowerCase();
    if (!e) return null;
    const n = p.parse(e);
    if (!("error" in n) || n.error == null) {
        const {
            sld: m,
            domain: u
        } = n, i = m ? ? u ? .split(".").filter(Boolean)[0] ? ? null;
        if (i) return c(i)
    }
    const a = e.split(".").filter(Boolean);
    if (a.length === 0) return null;
    const o = a.length === 1 ? 0 : a.length - 2,
        t = a[o];
    return t ? c(t) : null
}

function c(r) {
    const e = r.replace(/[^a-zA-Z0-9]+/g, " ").trim();
    return e ? e.split(/\s+/).map(n => N(n.toLowerCase())).join(" ") : null
}

function N(r) {
    return r.charAt(0).toUpperCase() + r.slice(1)
}
export {
    d as a, A as g
};
//# sourceMappingURL=e4904c67-laejzp6xfq37q0u3.js.map