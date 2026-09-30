import {
    _ as at,
    r as y,
    c as L,
    j as o,
    o as Se,
    u as Je
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    ch as ct,
    D as et,
    bY as ut,
    fY as qe,
    Gc as ft,
    jp as dt,
    Gd as mt,
    af as I,
    e as R,
    aw as tt,
    nP as pt,
    cW as st,
    h7 as gt,
    tX as yt,
    aO as _e,
    mR as nt,
    aP as xt,
    ti as V,
    a0 as ht,
    nK as bt,
    z as vt,
    A as Ke,
    d as St,
    hY as wt,
    be as jt,
    cG as kt,
    cH as Ct,
    rv as $t,
    c2 as Ue
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    g as Pt
} from "./52878ea3-gn3j7ui61y2jybs7.js";
import {
    zr as He,
    zs as Qe,
    bD as Mt
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    b as _t
} from "./41a2fdf3-im11ns7i6t39a3tt.js";
import "./b9ebfa06-dm8xq0zfweyjlyrr.js";
import "./82244417-gtg7yq4t8dhuwljw.js";
import "./a366adf3-mr5j0wy96h4uuta9.js";
import "./c19d65aa-ef21vpc58mb9d70k.js";
import "./85f3cacd-86tdbr0rb4xbpews.js";
import "./46a4eebd-dp58yi3ebjz6lx0x.js";
import "./5eec0dc4-8scuipden3df4f93.js";
import "./ad08b33f-m6y61lzfmpdxz75y.js";
import "./a7c981c9-cfqk1lewr9pd0yee.js";
import "./e340fd71-h0qop3v8adxc0jv0.js";
import "./1f30e218-lhaiclj6u6v5ivxw.js";
import "./540191af-eyt4mhgiscgde9oh.js";
import "./b9e74381-im85lkncbx47l1ca.js";
import "./5955c2e7-bm7q695htcpusowj.js";
import "./d93502a4-kb9e349iy8dy3l12.js";
import "./77a251d8-ki2u6aaeuhtt02gd.js";
import "./52ac6121-m7z0qcro3hdwwo6n.js";
import "./a35b0b5c-c4d5x0qzgpq8r7ek.js";
import "./8d846022-n379etekqsymvq1f.js";
import "./e3127a4c-3902zdnsjvimocyi.js";
const ze = ct(() => at(() => Promise.resolve().then(() => Kt), void 0).then(s => s.PersonalityOnboardingModal)),
    Nt = async ({
        ctx: s,
        mode: e,
        intl: t,
        flow: i,
        selectedPersonality: n,
        selectedTraits: l,
        conversationId: r,
        messageId: p = null,
        onClose: f,
        onSubmit: u
    }) => {
        const x = Pt(s, i, e, {
                selectedPersonality$: n,
                selectedTraits$: l
            }),
            {
                logging: m
            } = x;
        let a = !0;
        try {
            const c = await x.serverDataPromise;
            if (c.personalities ? .length === 0) return;
            a = c.can_close_onboarding ? ? !0
        } catch (c) {
            et.addError(c, {
                ctx: s,
                mode: e,
                flow: i,
                selectedPersonality: n,
                selectedTraits: l,
                conversationId: r
            });
            return
        }
        ut(ze, {
            canClose: a,
            isOpen: !0,
            onboarding: x,
            onClose: () => {
                qe(ze), He(m, !1, m.finalSelection), Qe(m), f ? .(m)
            },
            onSubmit$: c => {
                if (qe(ze), He(m, !0, m.finalSelection), Qe(m), u ? .(c, m), e === "personality" && "key" in c) {
                    if (ft({
                            personalityType: c.key,
                            conversationId: r,
                            messageId: p,
                            opts: {
                                optimistic: !0
                            }
                        }), c.key === "default") return;
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            const g = dt(),
                                S = c.key !== "default" ? t.formatMessage({
                                    id: "+CiZn7",
                                    defaultMessage: "Base style and tone updated"
                                }) : t.formatMessage({
                                    id: "gqHlYp",
                                    defaultMessage: "Base style and tone preserved"
                                });
                            g.success(S, {
                                duration: 4,
                                hasCloseButton: !0
                            })
                        })
                    })
                } else if (e === "traits" && Array.isArray(c)) {
                    const g = new Map;
                    c.forEach(S => {
                        g.set(S.key, "more")
                    }), mt(s, g, r, p)
                }
            }
        })
    };

function Tt(s, e, t, i) {
    return s.current && (clearInterval(s.current), s.current = null), y.startTransition(() => {
        t(), s.current = window.setInterval(() => {
            y.startTransition(() => {
                i()
            })
        }, e)
    }), () => {
        s.current && (clearInterval(s.current), s.current = null)
    }
}

function At(s) {
    "use forget";
    const e = L.c(33),
        {
            personality: t,
            active: i,
            intervalSec: n,
            prefersReducedMotion: l,
            className: r
        } = s,
        p = n === void 0 ? 4 : n,
        f = l === void 0 ? !1 : l,
        [u, x] = y.useState(-1),
        m = y.useRef(null),
        [a, c] = y.useState(!1),
        [g, S] = y.useState(0),
        d = y.useDeferredValue(i);
    let _, h;
    e[0] !== d ? (_ = () => {
        if (d) return () => {
            y.startTransition(() => {
                x(-1), c(!1)
            })
        }
    }, h = [d], e[0] = d, e[1] = _, e[2] = h) : (_ = e[1], h = e[2]), y.useEffect(_, h);
    let b, w;
    e[3] !== a ? (b = () => {
        if (a) return;
        const P = window.setTimeout(() => {
            c(!0), S(Et)
        }, 1300);
        return () => window.clearTimeout(P)
    }, w = [a], e[3] = a, e[4] = b, e[5] = w) : (b = e[4], w = e[5]), y.useEffect(b, w);
    let $;
    e[6] !== t.example_messages ? ($ = t.example_messages ? ? [], e[6] = t.example_messages, e[7] = $) : $ = e[7];
    const k = $;
    let E;
    e[8] !== p || e[9] !== k.length || e[10] !== a ? (E = () => {
        if (a) return Tt(m, p * 1e3, () => x(0), () => x(P => (P + 1) % Math.max(1, k.length)))
    }, e[8] = p, e[9] = k.length, e[10] = a, e[11] = E) : E = e[11];
    let T;
    e[12] !== p || e[13] !== k || e[14] !== a ? (T = [a, k, p], e[12] = p, e[13] = k, e[14] = a, e[15] = T) : T = e[15], y.useEffect(E, T);
    let N;
    e[16] !== r ? (N = I("relative col-span-full row-span-full grid overflow-clip", r), e[16] = r, e[17] = N) : N = e[17];
    let C;
    e[18] !== a ? (C = !a && o.jsx(Rt, {}), e[18] = a, e[19] = C) : C = e[19];
    let M;
    if (e[20] !== u || e[21] !== k || e[22] !== f || e[23] !== g) {
        let P;
        e[25] !== u || e[26] !== f || e[27] !== g ? (P = (F, B) => o.jsx(y.Activity, {
            mode: B === u ? "visible" : "hidden",
            children: o.jsxs("div", {
                className: I("ease-spring-fast col-span-full row-span-full h-full transition-[opacity,display] transition-discrete contain-strict motion-reduce:transition-none! starting:opacity-0", B === u ? "opacity-100 duration-2000" : "opacity-0 duration-0"),
                "aria-label": F,
                children: [o.jsx("div", {
                    className: "invisible",
                    children: F
                }), o.jsx("div", {
                    className: "absolute inset-0",
                    "aria-hidden": !0,
                    children: o.jsx(_t, {
                        className: "text-token-text-primary! text-heading-2! line-clamp-none cursor-default! font-medium",
                        text: F,
                        isStreamingAnimation: !f
                    }, g)
                })]
            })
        }, B), e[25] = u, e[26] = f, e[27] = g, e[28] = P) : P = e[28], M = k.map(P), e[20] = u, e[21] = k, e[22] = f, e[23] = g, e[24] = M
    } else M = e[24];
    let O;
    return e[29] !== N || e[30] !== C || e[31] !== M ? (O = o.jsxs("div", {
        className: N,
        "aria-live": "polite",
        children: [C, M]
    }), e[29] = N, e[30] = C, e[31] = M, e[32] = O) : O = e[32], O
}

function Et(s) {
    return s + 1
}

function Rt() {
    "use forget";
    const s = L.c(1);
    let e;
    return s[0] === Symbol.for("react.memo_cache_sentinel") ? (e = o.jsx("span", {
        className: "pulsing-dot absolute start-0 top-0 ms-3 mt-3 inline-block size-4 rounded-full bg-black motion-reduce:animate-none dark:bg-white"
    }), s[0] = e) : e = s[0], e
}

function lt(s) {
    "use forget";
    const e = L.c(16),
        {
            id: t,
            selected$: i,
            children: n,
            className: l,
            onSelect: r,
            selectedColor: p
        } = s,
        f = p === void 0 ? "custom" : p,
        u = R(i),
        x = u ? f : "custom",
        m = !u || f === "custom" ? "hover:bg-token-bg-tertiary/70" : "",
        a = u && f === "custom" ? "bg-token-bg-tertiary/75 text-token-text-secondary/75 hover:bg-token-bg-tertiary hover:text-token-text-primary!" : "";
    let c;
    e[0] !== l || e[1] !== m || e[2] !== a ? (c = I("focus-visible:focus-ring px-4 py-3", "font-normal", m, a, l), e[0] = l, e[1] = m, e[2] = a, e[3] = c) : c = e[3];
    let g;
    e[4] !== t || e[5] !== r || e[6] !== u || e[7] !== i ? (g = () => {
        r || i.set(!u), r ? .(t)
    }, e[4] = t, e[5] = r, e[6] = u, e[7] = i, e[8] = g) : g = e[8];
    let S;
    return e[9] !== n || e[10] !== t || e[11] !== u || e[12] !== x || e[13] !== c || e[14] !== g ? (S = o.jsx(tt, {
        color: x,
        className: c,
        contentWrapperClassName: "w-full",
        id: t,
        fullWidth: !0,
        "data-personality-id": t,
        role: "checkbox",
        "aria-checked": u,
        type: "button",
        onClick: g,
        children: n
    }), e[9] = n, e[10] = t, e[11] = u, e[12] = x, e[13] = c, e[14] = g, e[15] = S) : S = e[15], S
}

function It(s) {
    "use forget";
    const e = L.c(26);
    let t, i;
    e[0] !== s ? ({
        personality: i,
        ...t
    } = s, e[0] = s, e[1] = t, e[2] = i) : (t = e[1], i = e[2]);
    const {
        selected$: n
    } = t, {
        badge: l,
        key: r,
        label: p,
        description: f,
        icon_src: u
    } = i, x = R(n);
    let m;
    e[3] === Symbol.for("react.memo_cache_sentinel") ? (m = I("group/pill hover:border-token-border-light border-1 border-transparent py-1! hover:text-white/90", "text-token-text-primary! justify-start"), e[3] = m) : m = e[3];
    let a;
    e[4] === Symbol.for("react.memo_cache_sentinel") ? (a = I("justify-start", "flex w-full items-center gap-3"), e[4] = a) : a = e[4];
    let c;
    e[5] !== u ? (c = u && o.jsx("div", {
        "aria-hidden": !0,
        children: o.jsx(pt, {
            svgString: u,
            className: "size-[1lh]"
        })
    }), e[5] = u, e[6] = c) : c = e[6];
    let g;
    e[7] !== l ? (g = k => o.jsxs("div", {
        className: "flex items-center gap-1",
        children: [o.jsx("span", {
            className: "text-[17px] text-inherit",
            children: k
        }), l && o.jsx("div", {
            className: "badge-base bg-token-interactive-bg-accent-default text-token-interactive-label-accent-default",
            children: l
        })]
    }), e[7] = l, e[8] = g) : g = e[8];
    let S;
    e[9] !== f || e[10] !== p || e[11] !== g ? (S = o.jsx("div", {
        className: "flex flex-1 flex-col items-start",
        children: o.jsx(Se, {
            id: "tzFELg",
            defaultMessage: "<titleSpan>{title}</titleSpan><subtitleSpan>{subtitle}</subtitleSpan>",
            values: {
                title: p,
                subtitle: f,
                titleSpan: g,
                subtitleSpan: Ot
            }
        })
    }), e[9] = f, e[10] = p, e[11] = g, e[12] = S) : S = e[12];
    const d = x ? "opacity-100" : "opacity-0";
    let _;
    e[13] !== d ? (_ = I("text-token-interactive-icon-accent-default self-center duration-75 ease-linear motion-safe:transition-opacity", d), e[13] = d, e[14] = _) : _ = e[14];
    let h;
    e[15] === Symbol.for("react.memo_cache_sentinel") ? (h = o.jsx(Mt, {}), e[15] = h) : h = e[15];
    let b;
    e[16] !== _ ? (b = o.jsx("div", {
        "aria-hidden": !0,
        className: _,
        children: h
    }), e[16] = _, e[17] = b) : b = e[17];
    let w;
    e[18] !== c || e[19] !== S || e[20] !== b ? (w = o.jsxs("div", {
        className: a,
        children: [c, S, b]
    }), e[18] = c, e[19] = S, e[20] = b, e[21] = w) : w = e[21];
    let $;
    return e[22] !== t || e[23] !== r || e[24] !== w ? ($ = o.jsx(lt, {
        id: r,
        className: m,
        ...t,
        children: w
    }), e[22] = t, e[23] = r, e[24] = w, e[25] = $) : $ = e[25], $
}

function Ot(s) {
    return o.jsx("span", {
        className: "text-token-text-tertiary text-start",
        children: s
    })
}

function Ft(s) {
    "use forget";
    const e = L.c(13),
        {
            personalities: t,
            isFullScreen: i,
            onSelect: n
        } = s;
    let l;
    e[0] !== n || e[1] !== t ? (l = m => {
        st(() => {
            for (const a of t) a.selected$.set(a.key === m);
            n ? .(m)
        })
    }, e[0] = n, e[1] = t, e[2] = l) : l = e[2];
    const r = l,
        p = i ? "max-md:gap-1" : "pt-1";
    let f;
    e[3] !== p ? (f = I("flex flex-col gap-2", p), e[3] = p, e[4] = f) : f = e[4];
    let u;
    if (e[5] !== r || e[6] !== t) {
        let m;
        e[8] !== r ? (m = a => o.jsx("li", {
            children: o.jsx(It, {
                personality: a,
                selected$: a.selected$,
                onSelect: r
            })
        }, a.key), e[8] = r, e[9] = m) : m = e[9], u = t.map(m), e[5] = r, e[6] = t, e[7] = u
    } else u = e[7];
    let x;
    return e[10] !== f || e[11] !== u ? (x = o.jsx("ul", {
        className: f,
        "aria-labelledby": "personality-onboarding-personality-list",
        children: u
    }), e[10] = f, e[11] = u, e[12] = x) : x = e[12], x
}

function Dt(s) {
    "use forget";
    const e = L.c(8);
    let t, i;
    e[0] !== s ? ({
        trait: i,
        ...t
    } = s, e[0] = s, e[1] = t, e[2] = i) : (t = e[1], i = e[2]);
    let n;
    return e[3] !== t || e[4] !== i.key || e[5] !== i.label || e[6] !== i.selected$ ? (n = o.jsx(lt, {
        id: i.key,
        selected$: i.selected$,
        selectedColor: "accent",
        ...t,
        children: i.label
    }), e[3] = t, e[4] = i.key, e[5] = i.label, e[6] = i.selected$, e[7] = n) : n = e[7], n
}

function Lt(s) {
    "use forget";
    const e = L.c(10),
        {
            traits: t,
            maxSelected: i
        } = s,
        n = i === void 0 ? 3 : i;
    let l;
    e[0] !== n || e[1] !== t ? (l = u => {
        st(() => {
            const x = t.find(c => c.key === u);
            if (!x) return;
            if (x.selected$()) {
                x.selected$.set(!1);
                return
            }
            const a = t.filter(c => c !== x && c.selected$());
            a.length >= n && a.shift() ? .selected$.set(!1), x.selected$.set(!0)
        })
    }, e[0] = n, e[1] = t, e[2] = l) : l = e[2];
    const r = l;
    let p;
    if (e[3] !== r || e[4] !== t) {
        let u;
        e[6] !== r ? (u = x => o.jsx("li", {
            children: o.jsx(Dt, {
                trait: x,
                onSelect: r
            })
        }, x.key), e[6] = r, e[7] = u) : u = e[7], p = t.map(u), e[3] = r, e[4] = t, e[5] = p
    } else p = e[5];
    let f;
    return e[8] !== p ? (f = o.jsx("ul", {
        className: "flex flex-wrap gap-2",
        children: p
    }), e[8] = p, e[9] = f) : f = e[9], f
}

function Bt(s) {
    "use forget";
    const e = L.c(3),
        {
            count: t,
            max: i,
            mode: n
        } = s;
    if (t === 0 && n === "traits") {
        let r;
        return e[0] !== i ? (r = o.jsx(Se, {
            id: "personality-onboarding.title.select",
            defaultMessage: "Choose up to {max}",
            values: {
                max: i
            }
        }), e[0] = i, e[1] = r) : r = e[1], r
    }
    let l;
    return e[2] === Symbol.for("react.memo_cache_sentinel") ? (l = o.jsx(Se, {
        id: "personality-onboarding.title.continue",
        defaultMessage: "Continue"
    }), e[2] = l) : l = e[2], l
}

function Gt(s) {
    "use forget";
    const e = L.c(3);
    let t, i;
    e[0] !== s ? (t = () => {
        if (s) {
            let n = null,
                l = null;
            return l = requestAnimationFrame(() => {
                n = requestAnimationFrame(() => {
                    y.startTransition(() => {
                        s.focus({
                            preventScroll: !0
                        })
                    })
                })
            }), () => {
                n && cancelAnimationFrame(n), l && cancelAnimationFrame(l)
            }
        }
    }, i = [s], e[0] = s, e[1] = t, e[2] = i) : (t = e[1], i = e[2]), y.useEffect(t, i)
}

function Xe(s) {
    "use forget";
    const e = L.c(124),
        {
            canClose: t,
            onClose: i,
            onboarding: n
        } = s,
        {
            logging: l,
            mode: r,
            flow: p
        } = n,
        f = y.useId(),
        u = y.useId(),
        m = gt() === "rtl",
        a = Je(),
        c = yt(!1),
        g = R(c);
    let S;
    e[0] !== n ? (S = () => n.personalities$(), e[0] = n, e[1] = S) : S = e[1];
    const d = R(S);
    let _;
    e[2] !== n ? (_ = () => n.traits$(), e[2] = n, e[3] = _) : _ = e[3];
    const h = R(_);
    let b;
    e[4] !== n ? (b = () => n.intervalSec$(), e[4] = n, e[5] = b) : b = e[5];
    const w = R(b);
    let $;
    e[6] !== c ? ($ = () => {
        const j = function(q) {
                y.startTransition(() => {
                    c.set(q)
                })
            },
            v = function(q) {
                j(q.matches)
            },
            D = matchMedia("(prefers-reduced-motion: reduce)");
        return D.addEventListener("change", v), j(D.matches), () => {
            D.removeEventListener("change", v)
        }
    }, e[6] = c, e[7] = $) : $ = e[7];
    let k;
    e[8] !== n || e[9] !== c ? (k = [c, n], e[8] = n, e[9] = c, e[10] = k) : k = e[10], y.useEffect($, k);
    const E = y.useRef(null),
        [T, N] = y.useState(null),
        C = r === "personality" ? 1 : 3;
    Gt(t ? null : T);
    let M;
    e[11] !== d ? (M = () => d.filter(Wt).length, e[11] = d, e[12] = M) : M = e[12];
    const O = R(M);
    let P;
    e[13] !== h ? (P = () => h.filter(Yt).length, e[13] = h, e[14] = P) : P = e[14];
    const F = R(P),
        B = r === "personality" ? O : F;
    let G;
    e[15] !== d ? (G = () => d.some(Vt), e[15] = d, e[16] = G) : G = e[16];
    const U = R(G),
        [z, Y] = y.useState(!1);
    let we;
    e[17] !== h ? (we = () => h.some(Ht), e[17] = h, e[18] = we) : we = e[18];
    const rt = R(we);
    let je;
    e[19] !== d ? (je = () => {
        const j = {};
        for (const v of d) j[v.key] = v.selected$();
        return j
    }, e[19] = d, e[20] = je) : je = e[20];
    const W = R(je);
    let ke;
    e[21] !== d || e[22] !== T ? (ke = () => {
        const j = document.activeElement;
        if (!j || !(j instanceof HTMLButtonElement)) return;
        const v = j.getAttribute("data-personality-id"),
            D = d.find(A => A.key === v);
        return {
            id: v,
            focusedElement: j === T ? "primary-action" : j === E.current ? "close" : "personality",
            index: D ? d.indexOf(D) : -1
        }
    }, e[21] = d, e[22] = T, e[23] = ke) : ke = e[23];
    const Ne = _e(ke);
    let Ce;
    e[24] !== Ne || e[25] !== d ? (Ce = j => {
        const v = Ne();
        if (!v) return !1;
        const D = d.length;
        if (!D) return !1;
        const A = v.focusedElement === "personality" && v.index >= 0 ? v.index : -1;
        let q;
        e: switch (j) {
            case "home":
                {
                    q = 0;
                    break e
                }
            case "end":
                {
                    q = D - 1;
                    break e
                }
            case "forward":
                {
                    q = A === -1 ? 0 : Math.min(D - 1, A + 1);
                    break e
                }
            case "backward":
                q = A === -1 ? D - 1 : Math.max(0, A - 1)
        }
        if (q === void 0) return !1;
        const Ye = d[q];
        if (!Ye) return !1;
        const We = document.querySelector(`[data-personality-id="${Ye.key}"]`);
        return We ? (We.focus(), !0) : !1
    }, e[24] = Ne, e[25] = d, e[26] = Ce) : Ce = e[26];
    const Te = _e(Ce),
        Ve = R(nt),
        H = Ve ? p === "new-user-flow-personality" || p === "new-user-flow-traits" : !0,
        K = H && t,
        Ae = H && "m-auto w-[min(420px,95dvw)]";
    let Q;
    e[27] !== Ae ? (Q = I(Ae), e[27] = Ae, e[28] = Q) : Q = e[28];
    let X;
    e[29] !== l || e[30] !== r || e[31] !== d || e[32] !== s || e[33] !== h ? (X = j => {
        j.preventDefault();
        let v;
        const {
            onSubmit$: D
        } = s, A = r === "personality" ? d.filter(qt).at(0) : h.filter(zt);
        !A || Array.isArray(A) && A.length === 0 || (v = "key" in A ? A.key : A.map(Ut).join(","), He(l, !0, v), D(A))
    }, e[29] = l, e[30] = r, e[31] = d, e[32] = s, e[33] = h, e[34] = X) : X = e[34];
    let Z;
    e[35] !== Te || e[36] !== m ? (Z = j => {
        if (j.nativeEvent.isComposing) return;
        let v;
        e: switch (j.key) {
            case "ArrowUp":
                {
                    v = "backward";
                    break e
                }
            case "ArrowDown":
                {
                    v = "forward";
                    break e
                }
            case "ArrowLeft":
                {
                    v = m ? "forward" : "backward";
                    break e
                }
            case "ArrowRight":
                {
                    v = m ? "backward" : "forward";
                    break e
                }
            case "Home":
                {
                    v = m ? "end" : "home";
                    break e
                }
            case "End":
                v = m ? "home" : "end"
        }
        v && (j.preventDefault(), Te(v))
    }, e[35] = Te, e[36] = m, e[37] = Z) : Z = e[37];
    let J;
    e[38] !== K ? (J = o.jsx(Ze, {
        canShrink: K
    }), e[38] = K, e[39] = J) : J = e[39];
    const Ee = !Ve && "flex-1 px-6!";
    let ee;
    e[40] !== Ee ? (ee = I("text-token-text-primary grid min-h-[200px] px-10 [font-weight:500] contain-size", Ee), e[40] = Ee, e[41] = ee) : ee = e[41];
    let te;
    e[42] !== t || e[43] !== i ? (te = t && o.jsx(xt, {
        onClick: i,
        ref: E,
        className: "not-keyboard-focused:outline-none absolute end-2 top-0 aspect-square md:top-2"
    }), e[42] = t, e[43] = i, e[44] = te) : te = e[44];
    const Re = z ? "hidden" : "visible",
        Ie = z ? "opacity-0 duration-0" : "opacity-100 duration-300";
    let se;
    e[45] !== Ie ? (se = I("col-span-full row-span-full flex flex-col gap-2 transition-[opacity,display] transition-discrete ease-linear motion-reduce:transition-none! starting:opacity-100", Ie), e[45] = Ie, e[46] = se) : se = e[46];
    let $e;
    e[47] === Symbol.for("react.memo_cache_sentinel") ? ($e = o.jsx(Se, {
        id: "personality-onboarding.modal.title.try-new",
        defaultMessage: "Try a new personality for ChatGPT"
    }), e[47] = $e) : $e = e[47];
    let ne;
    e[48] !== f ? (ne = o.jsx("div", {
        className: "flex justify-between",
        children: o.jsx("h1", {
            className: "text-heading-2 font-medium text-balance",
            id: f,
            children: $e
        })
    }), e[48] = f, e[49] = ne) : ne = e[49];
    let Pe;
    e[50] === Symbol.for("react.memo_cache_sentinel") ? (Pe = o.jsx(Se, {
        id: "personality-onboarding.modal.subtitle.try-new",
        defaultMessage: "Adjust the style and tone of how ChatGPT responds to you. This doesn't impact ChatGPT's capabilities. You can change this anytime in Settings."
    }), e[50] = Pe) : Pe = e[50];
    let le;
    e[51] !== u ? (le = o.jsx("p", {
        id: u,
        className: "text-token-text-tertiary text-body-regular text-pretty",
        children: Pe
    }), e[51] = u, e[52] = le) : le = e[52];
    let oe;
    e[53] !== se || e[54] !== ne || e[55] !== le ? (oe = o.jsxs("div", {
        className: se,
        children: [ne, le]
    }), e[53] = se, e[54] = ne, e[55] = le, e[56] = oe) : oe = e[56];
    let ie;
    e[57] !== Re || e[58] !== oe ? (ie = o.jsx(y.Activity, {
        mode: Re,
        children: oe
    }), e[57] = Re, e[58] = oe, e[59] = ie) : ie = e[59];
    const Oe = z ? "visible" : "hidden";
    let re;
    if (e[60] !== w || e[61] !== a || e[62] !== d || e[63] !== g || e[64] !== W) {
        let j;
        e[66] !== w || e[67] !== a || e[68] !== g || e[69] !== W ? (j = v => o.jsx(y.Activity, {
            mode: W[v.key] ? "visible" : "hidden",
            children: o.jsx("div", {
                className: "col-span-full row-span-full grid transition-none!",
                "aria-label": a.formatMessage({
                    id: "personality-onboarding.intro.aria-label",
                    defaultMessage: "Examples of the {personality} personality"
                }, {
                    personality: v.label
                }),
                children: o.jsx(At, {
                    personality: v,
                    active: !!W[v.key],
                    intervalSec: w,
                    prefersReducedMotion: g
                })
            })
        }, v.key), e[66] = w, e[67] = a, e[68] = g, e[69] = W, e[70] = j) : j = e[70], re = d.map(j), e[60] = w, e[61] = a, e[62] = d, e[63] = g, e[64] = W, e[65] = re
    } else re = e[65];
    let ae;
    e[71] !== Oe || e[72] !== re ? (ae = o.jsx(y.Activity, {
        mode: Oe,
        children: re
    }), e[71] = Oe, e[72] = re, e[73] = ae) : ae = e[73];
    let ce;
    e[74] !== ee || e[75] !== te || e[76] !== ie || e[77] !== ae ? (ce = o.jsxs("header", {
        className: ee,
        children: [te, ie, ae]
    }), e[74] = ee, e[75] = te, e[76] = ie, e[77] = ae, e[78] = ce) : ce = e[78];
    const Fe = H ? "py-4 max-md:px-6 min-md:p-8" : "min-h-0 flex-1 px-10 pt-1";
    let ue;
    e[79] !== Fe ? (ue = I("space-y-6 overflow-y-auto", Fe), e[79] = Fe, e[80] = ue) : ue = e[80];
    let fe;
    e[81] !== a ? (fe = a.formatMessage({
        id: "personality-onboarding.modal.aria-label",
        defaultMessage: "Choose a personality"
    }), e[81] = a, e[82] = fe) : fe = e[82];
    let de;
    e[83] !== H || e[84] !== C || e[85] !== r || e[86] !== n.logging || e[87] !== d || e[88] !== h ? (de = r === "personality" ? o.jsx(Ft, {
        isFullScreen: H,
        personalities: d,
        onSelect: j => {
            Y(!0), n.logging.increment("personality", j)
        }
    }) : o.jsx(Lt, {
        traits: h,
        maxSelected: C
    }), e[83] = H, e[84] = C, e[85] = r, e[86] = n.logging, e[87] = d, e[88] = h, e[89] = de) : de = e[89];
    let me;
    e[90] !== ue || e[91] !== fe || e[92] !== de ? (me = o.jsx("section", {
        className: ue,
        "aria-label": fe,
        id: "personality-onboarding-personality-list",
        children: de
    }), e[90] = ue, e[91] = fe, e[92] = de, e[93] = me) : me = e[93];
    const De = H ? "min-md:pt-3" : "pt-6";
    let pe;
    e[94] !== De ? (pe = I("flex flex-col items-center justify-center px-10 max-md:px-6 min-md:gap-3", De), e[94] = De, e[95] = pe) : pe = e[95];
    const Le = "primary",
        Be = r === "personality" ? !U : !rt,
        Ge = !U && "[--btn-background-color:var(--bg-tertiary)] [--btn-text-color:var(--text-secondary)]";
    let ge;
    e[96] !== Ge ? (ge = I("focus-visible:focus-ring w-full px-4.5 py-4 select-none", Ge), e[96] = Ge, e[97] = ge) : ge = e[97];
    let ye;
    e[98] !== C || e[99] !== r || e[100] !== B ? (ye = o.jsx(Bt, {
        count: B,
        max: C,
        mode: r
    }), e[98] = C, e[99] = r, e[100] = B, e[101] = ye) : ye = e[101];
    let xe;
    e[102] !== Le || e[103] !== Be || e[104] !== ge || e[105] !== ye ? (xe = o.jsx(tt, {
        color: Le,
        visuallyDisabled: Be,
        fullWidth: !0,
        className: ge,
        ref: N,
        type: "submit",
        children: ye
    }), e[102] = Le, e[103] = Be, e[104] = ge, e[105] = ye, e[106] = xe) : xe = e[106];
    let he;
    e[107] !== pe || e[108] !== xe ? (he = o.jsx("footer", {
        className: pe,
        children: xe
    }), e[107] = pe, e[108] = xe, e[109] = he) : he = e[109];
    let be;
    e[110] !== K ? (be = o.jsx(Ze, {
        canShrink: K
    }), e[110] = K, e[111] = be) : be = e[111];
    let ve;
    e[112] !== J || e[113] !== ce || e[114] !== me || e[115] !== he || e[116] !== be ? (ve = o.jsxs("div", {
        className: "tall:h-[680px] grid h-[95dvh] w-full grid-rows-[minmax(10px,auto)_minmax(200px,1fr)_minmax(0,auto)_minmax(min-content,86px)_minmax(10px,auto)] p-0 max-md:h-[98dvh]",
        children: [J, ce, me, he, be]
    }), e[112] = J, e[113] = ce, e[114] = me, e[115] = he, e[116] = be, e[117] = ve) : ve = e[117];
    let Me;
    return e[118] !== f || e[119] !== Q || e[120] !== X || e[121] !== Z || e[122] !== ve ? (Me = o.jsx("form", {
        className: Q,
        "aria-labelledby": f,
        onSubmit: X,
        onKeyUp: Z,
        children: ve
    }), e[118] = f, e[119] = Q, e[120] = X, e[121] = Z, e[122] = ve, e[123] = Me) : Me = e[123], Me
}

function Ut(s) {
    return s.key
}

function zt(s) {
    return s.selected$()
}

function qt(s) {
    return s.selected$()
}

function Ht(s) {
    return s.selected$()
}

function Vt(s) {
    return s.selected$()
}

function Yt(s) {
    return s.selected$()
}

function Wt(s) {
    return s.selected$()
}

function Ze(s) {
    "use forget";
    const e = L.c(4),
        {
            canShrink: t
        } = s,
        i = t && "max-md:h-6";
    let n;
    e[0] !== i ? (n = I("h-10 min-h-0", i), e[0] = i, e[1] = n) : n = e[1];
    let l;
    return e[2] !== n ? (l = o.jsx("div", {
        className: n
    }), e[2] = n, e[3] = l) : l = e[3], l
}

function ot(s) {
    "use forget";
    const e = L.c(47),
        {
            canClose: t,
            className: i,
            onClose: n,
            onboarding: l,
            testId: r
        } = s,
        {
            flow: p
        } = l,
        [f, u] = y.useState(s.isOpen ? ? !0),
        x = y.useId(),
        m = y.useId(),
        a = R(nt),
        c = a ? p === "new-user-flow-personality" || p === "new-user-flow-traits" : !0,
        g = y.useRef(null),
        S = y.useRef(null);
    let d;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (d = P => {
        g.current = P, S.current = "submit", u(!1)
    }, e[0] = d) : d = e[0];
    const _ = _e(d);
    let h;
    e[1] !== n || e[2] !== l.logging ? (h = () => {
        S.current = "close", u(!1), l.logging.log("skip"), n()
    }, e[1] = n, e[2] = l.logging, e[3] = h) : h = e[3];
    const b = _e(h);
    let w;
    e[4] !== l.logging ? (w = () => {
        l.logging.log("impression")
    }, e[4] = l.logging, e[5] = w) : w = e[5];
    let $;
    if (e[6] !== l ? ($ = [l], e[6] = l, e[7] = $) : $ = e[7], y.useEffect(w, $), !a) {
        const P = t ? "history" : "default";
        let F;
        e[8] !== n || e[9] !== l.logging || e[10] !== s ? (F = () => {
            g.current && S.current === "submit" ? s.onSubmit$(g.current) : S.current === "close" && (l.logging.log("skip"), n())
        }, e[8] = n, e[9] = l.logging, e[10] = s, e[11] = F) : F = e[11];
        let B;
        e[12] === Symbol.for("react.memo_cache_sentinel") ? (B = o.jsx(V.Backdrop, {}), e[12] = B) : B = e[12];
        let G;
        e[13] !== t || e[14] !== b || e[15] !== _ || e[16] !== l ? (G = o.jsx(V.ScrollRoot, {
            children: o.jsx(V.ContentSection, {
                children: o.jsx(Xe, {
                    canClose: t,
                    onClose: b,
                    onboarding: l,
                    onSubmit$: _
                })
            })
        }), e[13] = t, e[14] = b, e[15] = _, e[16] = l, e[17] = G) : G = e[17];
        let U;
        e[18] !== t || e[19] !== G ? (U = o.jsx(V.Content, {
            handle: t,
            children: G
        }), e[18] = t, e[19] = G, e[20] = U) : U = e[20];
        let z;
        e[21] !== t || e[22] !== F || e[23] !== U ? (z = o.jsx(V.Portal, {
            children: o.jsxs(V.View, {
                "data-testid": "personality-onboarding-sheet",
                onCloseComplete: F,
                swipeDismissal: t,
                swipeOvershoot: !0,
                children: [B, U]
            })
        }), e[21] = t, e[22] = F, e[23] = U, e[24] = z) : z = e[24];
        let Y;
        return e[25] !== f || e[26] !== P || e[27] !== z ? (Y = o.jsx(V.Root, {
            defaultPresented: f,
            sheetRole: "dialog",
            behavior: P,
            sheetName: "personality-onboarding-sheet",
            presented: f,
            children: z
        }), e[25] = f, e[26] = P, e[27] = z, e[28] = Y) : Y = e[28], Y
    }
    const k = r ? ? "modal-personality-onboarding",
        E = !t,
        T = c ? "grid place-content-center" : "max-w-[min(420px,95dvw)] py-0";
    let N;
    e[29] !== i || e[30] !== T ? (N = I(i, T), e[29] = i, e[30] = T, e[31] = N) : N = e[31];
    const C = c ? "fullscreen" : "custom";
    let M;
    e[32] !== t || e[33] !== b || e[34] !== l || e[35] !== s.onSubmit$ ? (M = o.jsx(Xe, {
        canClose: t,
        onClose: b,
        onboarding: l,
        onSubmit$: s.onSubmit$
    }), e[32] = t, e[33] = b, e[34] = l, e[35] = s.onSubmit$, e[36] = M) : M = e[36];
    let O;
    return e[37] !== x || e[38] !== f || e[39] !== b || e[40] !== m || e[41] !== k || e[42] !== E || e[43] !== N || e[44] !== C || e[45] !== M ? (O = o.jsx(ht, {
        ariaLabelledBy: x,
        ariaDescribedBy: m,
        testId: k,
        isOpen: f,
        onClose: b,
        shouldIgnoreClickOutside: E,
        isScrollable: !1,
        allowVerticalContentToOverflow: !1,
        className: N,
        noPadding: !0,
        size: C,
        footerContent: null,
        children: M
    }), e[37] = x, e[38] = f, e[39] = b, e[40] = m, e[41] = k, e[42] = E, e[43] = N, e[44] = C, e[45] = M, e[46] = O) : O = e[46], O
}
const Kt = Object.freeze(Object.defineProperty({
        __proto__: null,
        PersonalityOnboardingModal: ot
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    it = St(!1);

function ws(s) {
    "use forget";
    const e = L.c(22),
        {
            conversationId: t,
            messageId: i,
            isPersonalityOnboardingRoute: n,
            onClose: l,
            onSubmit: r
        } = s,
        p = wt(),
        f = Je(),
        u = bt(),
        x = vt(),
        m = R(Qt);
    let a;
    e[0] !== u || e[1] !== t ? (a = () => {
        const C = t ? jt(t) : null,
            M = C && kt(C) ? .value === Ct.STREAMING;
        return $t(u) && !M
    }, e[0] = u, e[1] = t, e[2] = a) : a = e[2];
    const c = R(a),
        [g, S] = y.useState(c),
        d = y.useRef(!c),
        _ = x ? .planType === Ke.HC || x ? .planType === Ke.QUORUM,
        h = g && (m || n) && !_;
    let b, w;
    e[3] === Symbol.for("react.memo_cache_sentinel") ? (b = () => () => {
        d.current && et.addAction("chatgpt_personality_upsell_triggering_action_cancelled")
    }, w = [], e[3] = b, e[4] = w) : (b = e[3], w = e[4]), y.useEffect(b, w);
    let $;
    e[5] !== c ? ($ = () => {
        if (!c) return;
        const C = window.setTimeout(() => {
            S(!0), d.current = !1
        }, 3e3);
        return () => clearTimeout(C)
    }, e[5] = c, e[6] = $) : $ = e[6], y.useEffect($);
    let k;
    e[7] !== t || e[8] !== p || e[9] !== f || e[10] !== n || e[11] !== i || e[12] !== l || e[13] !== r ? (k = C => {
        const M = C === "traits" ? "new-user-flow-traits" : "existing-user-flow-personality",
            O = function() {
                it.set(!1)
            };
        Nt({
            ctx: p,
            intl: f,
            conversationId: t,
            messageId: i,
            mode: C,
            selectedPersonality: M === "existing-user-flow-personality" ? "default" : null,
            flow: M,
            onClose: (...P) => {
                l ? .(...P), O(), n && Ue({
                    hash: ""
                }, {
                    replace: !0
                })
            },
            onSubmit: (...P) => {
                r ? .(...P), O(), n && Ue({
                    hash: ""
                }, {
                    replace: !0
                })
            }
        })
    }, e[7] = t, e[8] = p, e[9] = f, e[10] = n, e[11] = i, e[12] = l, e[13] = r, e[14] = k) : k = e[14];
    const E = y.useEffectEvent(k);
    let T;
    e[15] !== E || e[16] !== n || e[17] !== h ? (T = () => {
        if (h) return E("personality"), () => {
            qe(ot), n && Ue({
                hash: ""
            }, {
                replace: !0
            })
        }
    }, e[15] = E, e[16] = n, e[17] = h, e[18] = T) : T = e[18];
    let N;
    return e[19] !== n || e[20] !== h ? (N = [h, n], e[19] = n, e[20] = h, e[21] = N) : N = e[21], y.useEffect(T, N), null
}

function Qt() {
    return it()
}
export {
    ws as NewUserPersonalityOnboarding, it as existingUserPersonalityFlowOpen$
};
//# sourceMappingURL=19cb8032-jpfqefpboeqjp2t3.js.map