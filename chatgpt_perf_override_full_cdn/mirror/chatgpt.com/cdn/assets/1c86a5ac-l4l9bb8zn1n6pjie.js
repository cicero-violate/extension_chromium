const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/df9194ad-d4vpsgujc4ed90x3.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/c2e10c20-c3y7hcc3z0sn62lz.js", "assets/a05edf66-h2m75yhxkd1ybukm.js", "assets/47288dec-nycqwsa9n6igg66i.js", "assets/9cc62628-e99ot706nta688od.js", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/conversation-small-cqp6votf.css"]))) => i.map(i => d[i]);
import {
    _ as j,
    c as K,
    r as l,
    j as _
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    ch as Ae,
    jV as Z,
    bY as Re,
    bN as ce,
    dP as Be,
    ip as ze,
    pe as Ge,
    R as qe,
    rn as He,
    yc as Xe,
    E$ as Je,
    eV as Ke,
    aK as Qe,
    eT as Ye,
    eU as Ze,
    f$ as et,
    gp as tt,
    aO as H,
    rO as nt,
    d as rt,
    cJ as st,
    aJ as ae,
    g8 as ot,
    af as ue,
    a0 as it,
    e as lt,
    bO as ct,
    sA as at
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    dT as ut,
    x4 as ft
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    a as he,
    b as dt
} from "./7517017f-efd9iwaiway92n98.js";
import {
    i as mt
} from "./84983163-gan1f9ordoegunfq.js";
import {
    I as pt
} from "./14a60637-ks75r8kvmgl13oz5.js";
import {
    d as gt
} from "./679fc303-kl7c6054usfnqmd4.js";
import {
    M as ie,
    E as yt,
    n as le
} from "./8d846022-bpect2mtc2esvt45.js";
const Ce = new Set(["http:", "https:"]),
    _e = {
        "http:": 80,
        "https:": 443,
        "ws:": 80,
        "wss:": 443
    };

function De(t) {
    if (!t) return null;
    const e = t.trim();
    if (!e || e.includes("\\")) return null;
    try {
        return {
            url: new URL(e)
        }
    } catch {
        if (!/^[a-z][a-z0-9+.-]*:/.test(e)) try {
            const r = e.startsWith("//") ? `https:${e}` : `https://${e}`;
            return {
                url: new URL(r)
            }
        } catch {
            return null
        }
        return null
    }
}

function Pe(t) {
    const e = t.trim();
    if (!e) return null;
    const r = /^([a-z][a-z0-9+.-]*):$/i.exec(e);
    if (r) return {
        kind: "scheme",
        scheme: `${r[1].toLowerCase()}:`
    };
    const n = /^([a-z][a-z0-9+.-]*):\/\/$/i.exec(e);
    if (n) return {
        kind: "scheme",
        scheme: `${n[1].toLowerCase()}:`
    };
    const s = /^(?:([a-z][a-z0-9+.+-]*):\/\/)?(\*|\*\.[^/:]+|[^/:]+)(?::(\*|\d+))?(\/.*)?$/i.exec(e);
    if (!s) return null;
    const i = s[1] ? `${s[1].toLowerCase()}:` : void 0,
        c = s[2],
        a = s[3] ? ? null,
        m = s[4] ? ? null,
        u = c.startsWith("*."),
        b = (u ? c.slice(2) : c).toLowerCase().replace(/\.$/, "");
    let d = null,
        g = !1;
    return a !== null && (g = !0, d = a === "*" ? "*" : Number(a), d !== "*" && (!Number.isFinite(d) || d < 0)) ? null : {
        kind: "host",
        scheme: i,
        host: b,
        wildcard: u,
        portExplicit: g,
        port: d,
        path: m
    }
}

function ee(t) {
    return t.toLowerCase().replace(/\.$/, "")
}

function Le(t, e) {
    const r = ee(t),
        n = ee(e);
    return r === n || r.endsWith("." + n)
}

function ht(t, e, r) {
    return r ? Le(t, e) : ee(t) === ee(e)
}

function _t(t, e) {
    if (e.port === "*") return !0;
    const r = t.port ? Number(t.port) : _e[t.protocol] ? ? null;
    if (!e.portExplicit) {
        const n = _e[t.protocol] ? ? null;
        return r === n
    }
    return typeof e.port == "number" && r === e.port
}

function bt(t) {
    const e = t.scheme ? ? "https:";
    if (!Ce.has(e) || !t.host) return null;
    const r = typeof t.port == "number" ? `:${t.port}` : "",
        n = t.path ? ? "";
    try {
        return new URL(`${e}//${t.host}${r}${n}`)
    } catch {
        return null
    }
}

function cn(t) {
    const e = De(t ? ? void 0);
    if (e && Ce.has(e.url.protocol) && !e.url.hostname.includes("*")) return e.url.toString();
    if (!t) return null;
    const r = Pe(t);
    return !r || r.kind === "scheme" ? null : bt(r) ? .toString() ? ? null
}

function Et(t, e, r) {
    const n = [];
    e ? .connectDomains ? .length && n.push(...e.connectDomains);
    const s = r ? .trim();
    return s && n.push(s), Oe(t, n)
}

function Oe(t, e) {
    if (!t) return !1;
    const r = De(t);
    if (!r) return !1;
    const n = r.url;
    return n.username || n.password || !e ? .length ? !1 : e.some(s => {
        const i = Pe(s);
        if (!i) return !1;
        if (i.kind === "scheme") return n.protocol === i.scheme;
        if (i.scheme) return !(n.protocol !== i.scheme || !ht(n.hostname, i.host, i.wildcard) || !_t(n, i)); {
            const c = i.host;
            return !!Le(n.hostname, c)
        }
    })
}
const be = "redirectUrl";

function wt(t, e) {
    if (!e) return t;
    const r = t.startsWith("http://") || t.startsWith("https://") || /^[a-z][a-z0-9+.-]*:\/\//i.test(t);
    let n;
    try {
        n = new URL(t)
    } catch {
        return t
    }
    return !r || n.searchParams.get(be) ? t : (n.searchParams.set(be, e), n.toString())
}
const xt = Ae(() => j(() =>
        import ("./df9194ad-d4vpsgujc4ed90x3.js"), __vite__mapDeps([0, 1, 2, 3, 4])).then(t => t.ConfirmExternalLinkModal)),
    kt = Ae(() => j(() =>
        import ("./a05edf66-h2m75yhxkd1ybukm.js"), __vite__mapDeps([5, 1, 2, 3])).then(t => t.SafeLinkWarningModal)),
    Ee = 600,
    we = 750;

function vt() {
    const t = Math.floor(window.screenX + (window.outerWidth - Ee) / 2),
        e = Math.floor(window.screenY + (window.outerHeight - we) / 2);
    return ["popup=yes", `width=${Ee}`, `height=${we}`, `left=${t}`, `top=${e}`, "noopener", "noreferrer"].join(",")
}
const xe = (t, e, r = "tab") => {
        const n = wt(t, e);
        if (ce(() => Be())) {
            const s = ze();
            if (s) {
                s.handleLink(n, "_blank");
                return
            } else console.warn("No aura link handler found, opening link in parent browser")
        }
        if (Ge()) Re(xt, {
            url: n
        });
        else {
            const s = r === "popup" ? vt() : "noopener,noreferrer";
            window.open(n, "_blank", s);
            return
        }
    },
    an = async ({
        href: t,
        resolvedPineappleUri: e,
        csp: r,
        redirectDomains: n,
        domain: s,
        distributionChannel: i,
        redirectUrl: c,
        openMode: a
    }) => {
        if (!t) {
            console.error("No href provided to handleExternalLink");
            return
        }
        const u = i === Z.OPENAI && a === "popup" ? "popup" : "tab";
        if (Et(t, r, s) || Oe(t, n)) {
            xe(t, c, u);
            return
        }
        if (i === Z.OPENAI && await St(t, e)) {
            xe(t, null, u);
            return
        }
        Re(kt, {
            urls: t,
            displayUrls: t
        })
    };
async function St(t, e) {
    try {
        return (await qe.safePost("/ecosystem/url_safe", {
            requestBody: {
                url: t,
                resolved_pineapple_uri: e
            }
        })).safe
    } catch {
        return !1
    }
}
const Te = t => {
        let e = "unknown";
        He() ? e = "mobile" : Xe() ? e = "tablet" : Je() && (e = "desktop");
        let r = "web";
        t === "skybridge" && (r = "native");
        let n = "unknown";
        return Ke() ? n = "ios" : Qe() ? n = "android" : Ye() ? n = "windows" : Ze() && (n = "macos"), {
            device: {
                type: e,
                platform: r,
                os: n
            },
            capabilities: {
                hover: ce(tt),
                touch: ce(et)
            }
        }
    },
    At = t => t.concat().sort().map(e => `${e} *`).join("; "),
    Rt = (t, e, r) => "?" + ["", `app=${t}`, `locale=${e}`, `deviceType=${Te(t).device.type}`, ""].filter(Boolean).join("&"),
    Ct = t => {
        if (t) {
            const e = new URL(he);
            return e.hostname = `${t}.${e.hostname}`, e.protocol = dt, e.origin
        }
        return he
    };

function Dt(t) {
    "use forget";
    const e = K.c(25),
        {
            host: r,
            features: n,
            isInert: s,
            title: i,
            ref: c,
            subdomain: a,
            iframeRef: m,
            api: u,
            locale: b
        } = t,
        d = r === void 0 ? "chatgpt" : r,
        g = s === void 0 ? !1 : s,
        [y] = l.useState(Pt);
    let w;
    e[0] !== y ? (w = async (v, ...B) => {
        const N = B;
        return await st(() => !!y()), ae(y() ? .[v], `Method ${String(v)} not found`)(...N)
    }, e[0] = y, e[1] = w) : w = e[1];
    const p = H(w);
    let f, S;
    e[2] !== p ? (f = () => new Proxy({}, {
        get: (v, B) => (...N) => p(B, ...N)
    }), S = [p], e[2] = p, e[3] = f, e[4] = S) : (f = e[3], S = e[4]), l.useImperativeHandle(c, f, S);
    const D = l.useRef(u);
    let x, A;
    e[5] !== u ? (x = () => {
        D.current = u
    }, A = [u], e[5] = u, e[6] = x, e[7] = A) : (x = e[6], A = e[7]), l.useEffect(x, A);
    let k;
    e[8] !== y ? (k = v => v ? (mt(v, new Proxy(D.current, {
        get: (B, N) => D.current[N]
    }), ["runUserCode", "runWidgetCode", "runComponent"]).then(B => {
        y.set(B)
    }), () => {
        y.set(null)
    }) : y.set(null), e[8] = y, e[9] = k) : k = e[9];
    const O = H(k);
    let $;
    e[10] !== a ? ($ = Ct(a), e[10] = a, e[11] = $) : $ = e[11];
    const F = $,
        W = `sandbox-${F}`;
    let R;
    e[12] !== d || e[13] !== b ? (R = Rt(d, b), e[12] = d, e[13] = b, e[14] = R) : R = e[14];
    const P = `${F}${R}`,
        T = nt(O, m);
    let L;
    e[15] !== n ? (L = n ? .length ? At(n) : void 0, e[15] = n, e[16] = L) : L = e[16];
    const C = n ? .includes("fullscreen") ? !0 : void 0;
    let U;
    return e[17] !== g || e[18] !== W || e[19] !== P || e[20] !== T || e[21] !== L || e[22] !== C || e[23] !== i ? (U = _.jsx(ot, {
        children: _.jsx("iframe", {
            title: i,
            inert: g,
            src: P,
            ref: T,
            sandbox: "allow-scripts allow-same-origin allow-forms",
            allow: L,
            allowFullScreen: C,
            className: "h-full w-full max-w-full"
        }, W)
    }), e[17] = g, e[18] = W, e[19] = P, e[20] = T, e[21] = L, e[22] = C, e[23] = i, e[24] = U) : U = e[24], U
}

function Pt() {
    return rt(null)
}
const Ne = ["toolInput", "toolOutput", "toolResponseMetadata", "widgetState"],
    Lt = "text-xs uppercase tracking-wide text-token-text-tertiary",
    Ot = "max-h-[70vh] overflow-auto whitespace-pre-wrap break-words rounded-md border border-token-border-light bg-token-main-surface-secondary p-3 font-mono text-xs leading-relaxed",
    Tt = "pointer-events-none absolute inset-0 z-20 border border-token-text-primary",
    ke = t => Ne.find(e => t[e] != null) ? ? "toolInput",
    Nt = t => {
        if (t == null) return "null";
        const e = new WeakSet;
        try {
            return JSON.stringify(t, (n, s) => {
                if (typeof s == "bigint") return `${s}n`;
                if (s instanceof Error) return {
                    name: s.name,
                    message: s.message,
                    stack: s.stack
                };
                if (typeof s == "function") return `[function ${s.name||"anonymous"}]`;
                if (typeof s == "object" && s !== null) {
                    if (e.has(s)) return "[Circular]";
                    e.add(s)
                }
                return s
            }, 2) ? ? String(t)
        } catch {
            return String(t)
        }
    },
    $t = t => {
        "use forget";
        const e = K.c(6),
            {
                isActive: r,
                label: n,
                onClick: s
            } = t,
            i = r ? "bg-token-text-primary text-token-bg-primary" : "bg-token-main-surface-secondary text-token-text-secondary hover:bg-token-bg-secondary";
        let c;
        e[0] !== i ? (c = ue("rounded-full px-3 py-1.5 text-xs font-medium transition-colors", i), e[0] = i, e[1] = c) : c = e[1];
        let a;
        return e[2] !== n || e[3] !== s || e[4] !== c ? (a = _.jsx("button", {
            type: "button",
            className: c,
            onClick: s,
            children: n
        }), e[2] = n, e[3] = s, e[4] = c, e[5] = a) : a = e[5], a
    },
    It = t => {
        "use forget";
        const e = K.c(22),
            {
                isOpen: r,
                widgetId: n,
                selectedPanel: s,
                values: i,
                onClose: c,
                onSelectPanel: a
            } = t,
            m = i[s];
        let u;
        e[0] !== m ? (u = Nt(m), e[0] = m, e[1] = u) : u = e[1];
        const b = u,
            d = `Widget ID: ${n}`;
        let g;
        e[2] !== a || e[3] !== s ? (g = Ne.map(x => _.jsx($t, {
            isActive: x === s,
            label: x,
            onClick: () => a(x)
        }, x)), e[2] = a, e[3] = s, e[4] = g) : g = e[4];
        let y;
        e[5] !== g ? (y = _.jsx("div", {
            className: "flex flex-wrap gap-2",
            children: g
        }), e[5] = g, e[6] = y) : y = e[6];
        let w;
        e[7] !== s ? (w = _.jsx("div", {
            className: Lt,
            children: s
        }), e[7] = s, e[8] = w) : w = e[8];
        let p;
        e[9] !== b ? (p = _.jsx("pre", {
            className: Ot,
            children: b
        }), e[9] = b, e[10] = p) : p = e[10];
        let f;
        e[11] !== w || e[12] !== p ? (f = _.jsxs("div", {
            className: "flex min-h-0 flex-col gap-2",
            children: [w, p]
        }), e[11] = w, e[12] = p, e[13] = f) : f = e[13];
        let S;
        e[14] !== y || e[15] !== f ? (S = _.jsxs("div", {
            className: "flex flex-col gap-4",
            children: [y, f]
        }), e[14] = y, e[15] = f, e[16] = S) : S = e[16];
        let D;
        return e[17] !== r || e[18] !== c || e[19] !== d || e[20] !== S ? (D = _.jsx(it, {
            isOpen: r,
            onClose: c,
            showCloseButton: !0,
            size: "xlarge",
            title: "Widget debug data",
            description: d,
            testId: "modal-ecosystem-app-debug-inspector",
            children: S
        }), e[17] = r, e[18] = c, e[19] = d, e[20] = S, e[21] = D) : D = e[21], D
    },
    Mt = t => {
        "use forget";
        const e = K.c(30),
            {
                widgetId: r,
                widgetState: n,
                toolInput: s,
                toolOutput: i,
                toolResponseMetadata: c,
                children: a
            } = t,
            [m, u] = l.useState(0),
            [b, d] = l.useState(!1),
            [g, y] = l.useState(!1);
        let w;
        e[0] !== s || e[1] !== i || e[2] !== c || e[3] !== n ? (w = {
            toolInput: s,
            toolOutput: i,
            toolResponseMetadata: c,
            widgetState: n
        }, e[0] = s, e[1] = i, e[2] = c, e[3] = n, e[4] = w) : w = e[4];
        const p = w;
        let f;
        e[5] !== p ? (f = () => ke(p), e[5] = p, e[6] = f) : f = e[6];
        const [S, D] = l.useState(f);
        let x, A;
        e[7] !== p ? (x = () => {
            D(v => p[v] != null ? v : ke(p))
        }, A = [p], e[7] = p, e[8] = x, e[9] = A) : (x = e[8], A = e[9]), l.useEffect(x, A);
        let k, O;
        e[10] !== g ? (k = () => {
            if (!g) return;
            const v = window.setTimeout(() => {
                y(!1)
            }, 2e3);
            return () => {
                window.clearTimeout(v)
            }
        }, O = [g], e[10] = g, e[11] = k, e[12] = O) : (k = e[11], O = e[12]), l.useEffect(k, O);
        let $;
        e[13] === Symbol.for("react.memo_cache_sentinel") ? ($ = _.jsx("div", {
            className: Tt
        }), e[13] = $) : $ = e[13];
        let F;
        e[14] === Symbol.for("react.memo_cache_sentinel") ? (F = ue("border-token-text-primary bg-token-bg-primary text-token-text-primary hover:bg-token-bg-secondary flex h-6 w-6 items-center justify-center border-s border-t border-b p-0 transition-colors"), e[14] = F) : F = e[14];
        let W;
        e[15] === Symbol.for("react.memo_cache_sentinel") ? (W = _.jsx("button", {
            type: "button",
            className: F,
            "aria-label": "Reload widget",
            title: "Reload widget",
            onClick: () => u(Wt),
            children: _.jsx(ut, {
                className: "icon-sm"
            })
        }), e[15] = W) : W = e[15];
        let R;
        e[16] === Symbol.for("react.memo_cache_sentinel") ? (R = ue("border-token-text-primary bg-token-bg-primary text-token-text-primary hover:bg-token-bg-secondary flex h-6 w-6 items-center justify-center border p-0 transition-colors"), e[16] = R) : R = e[16];
        let P;
        e[17] === Symbol.for("react.memo_cache_sentinel") ? (P = _.jsxs("div", {
            className: "absolute end-0 top-0 z-30 flex",
            children: [W, _.jsx("button", {
                type: "button",
                className: R,
                "aria-label": "Inspect widget data",
                title: "Inspect widget data",
                onClick: () => d(!0),
                children: _.jsx(pt, {
                    className: "icon-sm"
                })
            })]
        }), e[17] = P) : P = e[17];
        let T;
        e[18] !== a || e[19] !== m ? (T = a(m), e[18] = a, e[19] = m, e[20] = T) : T = e[20];
        let L;
        e[21] === Symbol.for("react.memo_cache_sentinel") ? (L = () => d(!1), e[21] = L) : L = e[21];
        let C;
        e[22] !== p || e[23] !== b || e[24] !== S || e[25] !== r ? (C = _.jsx(It, {
            isOpen: b,
            widgetId: r,
            selectedPanel: S,
            values: p,
            onClose: L,
            onSelectPanel: D
        }), e[22] = p, e[23] = b, e[24] = S, e[25] = r, e[26] = C) : C = e[26];
        let U;
        return e[27] !== T || e[28] !== C ? (U = _.jsxs("div", {
            className: "relative h-full w-full max-w-full",
            children: [$, P, T, C]
        }), e[27] = T, e[28] = C, e[29] = U) : U = e[29], U
    };

function Wt(t) {
    return t + 1
}
const jt = t => {
        if (!t) return [];
        const e = [];
        return t.camera && e.push("camera"), t.microphone && e.push("microphone"), t.geolocation && e.push("geolocation"), t.fullscreen && e.push("fullscreen"), t.clipboardWrite && e.push("clipboard-write"), e
    },
    Ft = (t, e) => {
        const r = jt(e);
        if (!r.length) return t;
        const n = new Set(t ? ? []);
        for (const s of r) n.add(s);
        return Array.from(n)
    },
    Ut = async (t, e) => {
        const {
            trackFatalWidgetError: r
        } = await j(async () => {
            const {
                trackFatalWidgetError: n
            } = await
            import ("./47288dec-nycqwsa9n6igg66i.js");
            return {
                trackFatalWidgetError: n
            }
        }, __vite__mapDeps([6, 2, 1, 3]));
        r(t, e)
    },
    Vt = async (t, e) => {
        const {
            trackWidgetError: r
        } = await j(async () => {
            const {
                trackWidgetError: n
            } = await
            import ("./47288dec-nycqwsa9n6igg66i.js");
            return {
                trackWidgetError: n
            }
        }, __vite__mapDeps([6, 2, 1, 3]));
        r(t, e)
    },
    Bt = async t => {
        const {
            trackWidgetLinkOut: e
        } = await j(async () => {
            const {
                trackWidgetLinkOut: r
            } = await
            import ("./47288dec-nycqwsa9n6igg66i.js");
            return {
                trackWidgetLinkOut: r
            }
        }, __vite__mapDeps([6, 2, 1, 3]));
        e(t)
    },
    zt = async (t, e) => {
        const {
            trackSandboxInstrument: r
        } = await j(async () => {
            const {
                trackSandboxInstrument: n
            } = await
            import ("./47288dec-nycqwsa9n6igg66i.js");
            return {
                trackSandboxInstrument: n
            }
        }, __vite__mapDeps([6, 2, 1, 3]));
        r(t, e)
    },
    Gt = async t => {
        const {
            trackSecurityPolicyViolation: e
        } = await j(async () => {
            const {
                trackSecurityPolicyViolation: r
            } = await
            import ("./47288dec-nycqwsa9n6igg66i.js");
            return {
                trackSecurityPolicyViolation: r
            }
        }, __vite__mapDeps([6, 2, 1, 3]));
        e(t)
    },
    qt = async (t, e) => {
        const {
            trackWidgetDisplayMode: r
        } = await j(async () => {
            const {
                trackWidgetDisplayMode: n
            } = await
            import ("./47288dec-nycqwsa9n6igg66i.js");
            return {
                trackWidgetDisplayMode: n
            }
        }, __vite__mapDeps([6, 2, 1, 3]));
        r(t, e)
    },
    Ht = async (t, e) => {
        const {
            trackWidgetNavigation: r
        } = await j(async () => {
            const {
                trackWidgetNavigation: n
            } = await
            import ("./47288dec-nycqwsa9n6igg66i.js");
            return {
                trackWidgetNavigation: n
            }
        }, __vite__mapDeps([6, 2, 1, 3]));
        r(t, e)
    },
    Xt = async t => {
        const {
            trackWidgetCheckoutSession: e
        } = await j(async () => {
            const {
                trackWidgetCheckoutSession: r
            } = await
            import ("./47288dec-nycqwsa9n6igg66i.js");
            return {
                trackWidgetCheckoutSession: r
            }
        }, __vite__mapDeps([6, 2, 1, 3]));
        e(t)
    },
    V = t => typeof t == "object" && t !== null,
    $e = t => {
        if (!t || !V(t)) return null;
        const e = t.status;
        return (t.cancelled === !0 || t.is_cancelled === !0 || e === "cancelled") && typeof t.reason == "string" ? t.reason : null
    },
    Jt = (t, e) => {
        if (t && V(t) && $e(t)) return null;
        const r = [],
            n = s => {
                V(s) && r.push(s)
            };
        n(t), t && V(t) && (n(t.call_tool_result), n(t.mcp_tool_result), n(t.mcpToolResult));
        for (const s of r) {
            const i = le(s);
            if (i) return i
        }
        if (e && V(e)) {
            const s = le(e);
            if (s) return s;
            const i = e,
                c = Array.isArray(i.content) && i.content.length > 0 ? i.content : void 0,
                a = (V(i.structuredContent) ? i.structuredContent : null) ? ? (V(i.structured_content) ? i.structured_content : null) ? ? (V(i) ? i : null),
                m = typeof i.result == "string" ? i.result : null;
            let u = c;
            if (!u) {
                if (m) u = [{
                    type: "text",
                    text: m
                }];
                else if (a) {
                    let d = "[structured content]";
                    try {
                        d = JSON.stringify(a)
                    } catch {}
                    u = [{
                        type: "text",
                        text: d
                    }]
                }
            }
            const b = le({
                content: u ? ? [],
                structuredContent: a ? ? void 0,
                isError: typeof i.isError == "boolean" ? i.isError : void 0,
                _meta: V(i._meta) ? i._meta : void 0
            });
            if (b) return b
        }
        return null
    },
    ve = ({
        displayMode: t,
        viewParams: e,
        toolOutput: r
    }) => {
        if (t === "modal") return e ? ? null;
        const n = V(r) ? r : null,
            s = V(e) ? e : null;
        return !n && !s ? null : { ...n ? ? {},
            ...s ? ? {}
        }
    },
    Kt = {
        insets: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    };

function Qt() {
    let t, e;
    return {
        promise: new Promise((n, s) => {
            t = n, e = s
        }),
        resolve: t,
        reject: e
    }
}
const Se = ({
        host: t,
        ref: e,
        iframeRef: r,
        html: n,
        measureWidth: s,
        accessToken: i,
        features: c,
        permissions: a,
        safeArea: m = Kt,
        attributionId: u,
        conversationId: b,
        widgetId: d,
        widgetParent: g,
        widgetDistributionChannel: y,
        suggestionMessageId: w,
        widgetType: p,
        csp: f,
        subdomain: S,
        viewParams: D,
        widgetState: x = null,
        toolInput: A = null,
        toolOutput: k = null,
        toolResponseMetadata: O = null,
        toolInfo: $ = null,
        subjectId: F = null,
        isTombstone: W = !1,
        maxHeight: R,
        maxWidth: P,
        containerHeight: T,
        containerWidth: L,
        theme: C,
        title: U,
        api: v,
        locale: B,
        displayMode: N = "inline",
        isSidebarOpen: X,
        onReady: Ie,
        onError: Me
    }) => {
        "use no forget";
        const z = l.useMemo(() => ({
                attribution_id: u ? ? g ? ? "",
                name: p,
                conversation_id: b ? ? null,
                message_id: d || null,
                suggestion_message_id: w ? ? null,
                distribution_channel: y,
                host: t
            }), [t, y, u, g, p, b, d, w]),
            I = l.useRef(null),
            te = l.useRef(null),
            fe = l.useRef(null),
            q = N === "fullscreen" ? "fullscreen" : N === "pip" ? "pip" : "inline",
            de = l.useMemo(() => Ft(c, a), [c, a]),
            G = l.useMemo(() => Te(t), [t]),
            me = G.device.type === "mobile" || G.device.type === "tablet" ? "mobile" : G.device.type === "desktop" ? "desktop" : "web",
            pe = l.useMemo(() => {
                const o = {};
                return q === "fullscreen" ? typeof window < "u" && (o.width = window.innerWidth, o.height = window.innerHeight) : (T != null ? o.height = T : R != null && (o.maxHeight = R), L != null ? o.width = L : P != null && (o.maxWidth = P)), Object.keys(o).length > 0 ? o : void 0
            }, [q, T, L, R, P]),
            ne = l.useMemo(() => {
                if (!(typeof Intl > "u")) return Intl.DateTimeFormat().resolvedOptions().timeZone
            }, []),
            re = l.useMemo(() => {
                const o = t === "skybridge" ? ["inline", "fullscreen"] : ["inline", "fullscreen", "pip"];
                o.includes(q) || o.push(q);
                const h = {
                    theme: C,
                    displayMode: q,
                    availableDisplayModes: o,
                    containerDimensions: pe,
                    locale: B,
                    safeAreaInsets: m.insets,
                    userAgent: "chatgpt",
                    platform: me,
                    deviceCapabilities: {
                        touch: G.capabilities.touch,
                        hover: G.capabilities.hover
                    }
                };
                return $ && (h.toolInfo = $), ne && (h.timeZone = ne), h
            }, [pe, B, q, t, me, m.insets, C, ne, $, G.capabilities.hover, G.capabilities.touch]),
            Q = l.useMemo(() => {
                if (!c || c.length === 0) return;
                const o = {},
                    h = new Set(c);
                return h.has("camera") && (o.camera = {}), h.has("microphone") && (o.microphone = {}), h.has("geolocation") && (o.geolocation = {}), h.has("clipboard-write") && (o.clipboardWrite = {}), Object.keys(o).length > 0 ? o : void 0
            }, [c]),
            Y = l.useMemo(() => {
                if (!f) return;
                const o = {};
                return f.connectDomains && f.connectDomains.length > 0 && (o.connectDomains = f.connectDomains), f.resourceDomains && f.resourceDomains.length > 0 && (o.resourceDomains = f.resourceDomains), f.frameDomains && f.frameDomains.length > 0 && (o.frameDomains = f.frameDomains), Object.keys(o).length > 0 ? o : void 0
            }, [f]),
            We = l.useMemo(() => {
                const o = {
                    openLinks: {},
                    serverTools: {},
                    serverResources: {},
                    logging: {},
                    message: {},
                    updateModelContext: {}
                };
                return (Q || Y) && (o.sandbox = {}, Q && (o.sandbox.permissions = Q), Y && (o.sandbox.csp = Y)), o
            }, [Y, Q]),
            je = H(() => {
                Me ? .()
            }),
            Fe = H(() => {
                Ie ? .()
            }),
            ge = H(async o => {
                te.current = Qt();
                const h = I.current ? .runWidgetCode({
                    html: o,
                    measureWidth: s,
                    isFirstParty: y === Z.OPENAI,
                    widgetId: d,
                    viewParams: ve({
                        displayMode: N,
                        viewParams: D,
                        toolOutput: k ? ? null
                    }),
                    widgetState: x,
                    toolInput: A,
                    toolOutput: k,
                    toolResponseMetadata: O,
                    subjectId: F,
                    isTombstone: W,
                    features: de,
                    maxHeight: R ? ? void 0,
                    maxWidth: P ? ? void 0,
                    theme: C,
                    displayMode: N,
                    isSidebarOpen: X ? ? !1,
                    safeArea: m,
                    userAgent: G,
                    csp: f,
                    mcpApps: {
                        hostContext: re,
                        hostCapabilities: We,
                        hostInfo: {
                            name: "chatgpt"
                        }
                    }
                });
                if (h)
                    for await (const M of await h) M.type === ie.ENVIRONMENT_STATUS && M.status === yt.RUNNING_CODE ? (Fe(), te.current ? .resolve()) : M.type === ie.ERROR ? (Vt(z, M.error), fe.current = M.error) : M.type === ie.RUN_COMPLETE && M.wasFatalError && (Ut(z, fe.current), je())
            }),
            ye = l.useRef(null);
        l.useEffect(() => {
            !n || ye.current === n || (ye.current = n, ge(n))
        }, [n, ge]);
        const E = H(async o => {
                await te.current ? .promise, o()
            }),
            J = l.useMemo(() => Jt(O, k), [O, k]),
            se = l.useRef(null),
            oe = l.useMemo(() => $e(O), [O]);
        return l.useEffect(() => {
            E(() => {
                I.current ? .setWidgetData({
                    widgetId: d,
                    widgetState: x,
                    toolInput: A,
                    toolOutput: k,
                    toolResponseMetadata: O,
                    subjectId: F
                })
            })
        }, [d, x, A, k, O, F, E]), l.useEffect(() => {
            A && E(() => {
                I.current ? .notifyMcpAppsToolInput({
                    arguments: A
                })
            })
        }, [A, E]), l.useEffect(() => {
            J && (se.current && ct(se.current, J) || (se.current = J, E(() => {
                I.current ? .notifyMcpAppsToolResult(J)
            })))
        }, [J, E]), l.useEffect(() => {
            oe != null && E(() => {
                I.current ? .notifyMcpAppsToolCancelled({
                    reason: oe ? ? void 0
                })
            })
        }, [oe, E]), l.useEffect(() => {
            E(() => {
                I.current ? .notifyMcpAppsHostContext({
                    hostContext: re
                })
            })
        }, [re, E]), l.useEffect(() => {
            const o = I.current;
            return () => {
                o ? .requestMcpAppsResourceTeardown({
                    timeoutMs: 500
                })
            }
        }, []), l.useEffect(() => {
            E(() => {
                I.current ? .setWidgetView({
                    widgetId: d,
                    displayMode: N,
                    viewParams: ve({
                        displayMode: N,
                        viewParams: D,
                        toolOutput: k ? ? null
                    }),
                    isTombstone: W
                })
            })
        }, [d, N, D, k, W, E]), l.useEffect(() => {
            E(() => {
                I.current ? .setAdditionalGlobals({
                    additionalGlobals: {
                        isSidebarOpen: X ? ? !1
                    }
                })
            })
        }, [X, E]), l.useEffect(() => {
            E(() => {
                I.current ? .setAdditionalGlobals({
                    additionalGlobals: {
                        maxHeight: R,
                        maxWidth: P
                    }
                })
            })
        }, [R, P, E]), l.useEffect(() => {
            E(() => {
                I.current ? .setTheme({
                    theme: C
                })
            })
        }, [C, E]), l.useEffect(() => {
            E(() => {
                I.current ? .setSafeArea({
                    safeArea: m
                })
            })
        }, [m, E]), _.jsx(Dt, {
            title: U,
            host: t,
            subdomain: S,
            features: de,
            api: { ...v,
                downloadBlob: y === Z.OPENAI ? ({
                    blob: o,
                    name: h
                }) => {
                    gt(o, h)
                } : void 0,
                notifyNavigation: o => {
                    Ht(z, o), v.notifyNavigation ? .(o)
                },
                requestCheckout: v.requestCheckout ? o => (Xt(z), v.requestCheckout ? .(o)) : void 0,
                requestDisplayMode: o => {
                    const {
                        mode: h
                    } = o;
                    return h !== N && qt(z, h), v.requestDisplayMode ? .(o) ? ? {
                        mode: h
                    }
                },
                share: async o => {
                    const {
                        url: h,
                        title: M,
                        text: Ue,
                        files: Ve
                    } = o;
                    return await navigator.share({
                        url: h,
                        title: M,
                        text: Ue,
                        files: Ve
                    })
                },
                openExternal: o => {
                    Bt(z), v.openExternal ? .(o)
                },
                sendInstrument: o => {
                    zt(o, z)
                },
                notifySecurityPolicyViolation: o => {
                    Gt({ ...z,
                        violation: o
                    })
                },
                streamCompletion: async function*(o) {
                    const {
                        completionStream: h
                    } = await j(async () => {
                        const {
                            completionStream: M
                        } = await
                        import ("./9cc62628-e99ot706nta688od.js");
                        return {
                            completionStream: M
                        }
                    }, __vite__mapDeps([7, 8, 1, 2, 3, 9]));
                    yield* h(o, ae(g), i)
                },
                callCompletion: async function(o) {
                    const {
                        callCompletion: h
                    } = await j(async () => {
                        const {
                            callCompletion: M
                        } = await
                        import ("./9cc62628-e99ot706nta688od.js");
                        return {
                            callCompletion: M
                        }
                    }, __vite__mapDeps([7, 8, 1, 2, 3, 9]));
                    return await h(o, ae(g), i)
                }
            },
            iframeRef: r,
            ref: at(I, e),
            locale: B
        })
    },
    un = t => {
        "use forget";
        const e = K.c(11);
        if (!lt(Yt)) {
            let u;
            return e[0] !== t ? (u = _.jsx(Se, { ...t
            }), e[0] = t, e[1] = u) : u = e[1], u
        }
        const n = t.widgetState ? ? null,
            s = t.toolInput ? ? null,
            i = t.toolOutput ? ? null,
            c = t.toolResponseMetadata ? ? null;
        let a;
        e[2] !== t ? (a = u => _.jsx(Se, { ...t
        }, u), e[2] = t, e[3] = a) : a = e[3];
        let m;
        return e[4] !== t.widgetId || e[5] !== n || e[6] !== s || e[7] !== i || e[8] !== c || e[9] !== a ? (m = _.jsx(Mt, {
            widgetId: t.widgetId,
            widgetState: n,
            toolInput: s,
            toolOutput: i,
            toolResponseMetadata: c,
            children: a
        }), e[4] = t.widgetId, e[5] = n, e[6] = s, e[7] = i, e[8] = c, e[9] = a, e[10] = m) : m = e[10], m
    };

function Yt() {
    return ft()
}
export {
    un as E, cn as g, an as h, Et as i
};
//# sourceMappingURL=1c86a5ac-l4l9bb8zn1n6pjie.js.map