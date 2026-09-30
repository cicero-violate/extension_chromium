import {
    j as c,
    r as f,
    c as Z,
    u as Q
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    df as N,
    ix as ee,
    e as q,
    dS as W,
    b8 as te,
    dL as ne,
    cO as k,
    f$ as se,
    _ as re,
    af as F,
    hA as $,
    qJ as oe,
    lL as B,
    d1 as ie,
    el as ae,
    em as le,
    d2 as ce,
    eB as z,
    eC as h,
    Cu as ue
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    jf as de,
    iZ as fe,
    ta as me
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    m as Te
} from "./bc18f706-ctivje9d0t0qyr68.js";
import "./1bc04b52-c842ajlk411j0plj.js";
import "./93b8edb0-i4v0k7e37nk0jqqy.js";
import "./1bc04b52-gtpe46xocf6zem4g.js";
import "./f6f4f1b2-gtlbp7j4szobo0y1.js";
import "./1bc04b52-lymnctp12j4ukscl.js";
import "./1bc04b52-h1em0bjkpkjv8ykw.js";
import "./1bc04b52-homyy2s5cy2i6moh.js";
import "./1bc04b52-hg3ptm9pgpi9lcut.js";
const pe = 5,
    ge = t => {
        const e = t.filter(s => s.role === N.Assistant),
            n = [];
        for (const s of e) {
            const r = n.at(-1);
            if (r ? .label === s.label && r ? .scrollToTurnId === s.scrollToTurnId) {
                n[n.length - 1] = s;
                continue
            }
            n.push(s)
        }
        return n
    };

function be(t, e, n = {}) {
    if (!t || !e) return Promise.resolve();
    const {
        padding: s = 0,
        behavior: r = "smooth",
        signal: i,
        idleMs: a = 120,
        timeoutMs: u = 4e3,
        resolveOnUserInterruption: d = !0
    } = n, l = e.getBoundingClientRect(), v = t.getBoundingClientRect(), I = Number.parseFloat(getComputedStyle(t).scrollMarginTop), b = v.top - l.top + e.scrollTop - s - (Number.isFinite(I) ? I : 0);
    return e.scrollTo({
        top: b,
        behavior: r
    }), r !== "smooth" && Math.abs(e.scrollTop - b) <= 1 ? Promise.resolve() : new Promise((T, w) => {
        let E = !1,
            y, x;
        const M = ["wheel", "touchstart", "mousedown", "keydown"],
            _ = () => {
                y && window.clearTimeout(y), x && window.clearTimeout(x), e.removeEventListener("scroll", j, o), e.removeEventListener("scrollend", P), M.forEach(p => {
                    e.removeEventListener(p, S, m)
                }), i ? .removeEventListener("abort", L)
            },
            C = () => {
                E || (E = !0, _(), T())
            },
            L = () => {
                _();
                const p = new DOMException("Scroll aborted", "AbortError");
                w(p)
            },
            S = () => {
                if (d) C();
                else {
                    _();
                    const p = new Error("Scroll interrupted by user");
                    w(p)
                }
            },
            P = () => C(),
            j = () => {
                y && window.clearTimeout(y), y = window.setTimeout(() => {
                    C()
                }, a)
            },
            o = {
                passive: !0
            },
            m = {
                passive: !0,
                capture: !0
            };
        if ("onscrollend" in e ? e.addEventListener("scrollend", P, {
                once: !0
            }) : (e.addEventListener("scroll", j, o), j()), M.forEach(p => {
                e.addEventListener(p, S, m)
            }), i) {
            if (i.aborted) return L();
            i.addEventListener("abort", L, {
                once: !0
            })
        }
        x = window.setTimeout(() => {
            C()
        }, u)
    })
}
const V = 60,
    he = /\[media pointer=(?:"[^"\n]*"|'[^'\n]*'|[^\]\n]+)\]?/gi,
    ve = /\b(?:sediment|file):\/\/[^\s\]]+/gi,
    xe = t => {
        const e = t.match(/^#{1,3}\s+(.+)$/m);
        return e ? e[1] : t.split(/\n+/).find(n => n.trim().length > 0) ? ? ""
    },
    Ie = t => t.replace(/^\s*>+\s*/, "").replace(/^\s*[-*+]\s+/, "").replace(/\s+/g, " ").trim(),
    Ce = t => Te(t).replace(/\s+/g, " ").trim(),
    Ee = t => t.length > V ? `${t.slice(0,V-3)}...` : t,
    ye = (...t) => {
        for (const e of t)
            if (typeof e == "string" && e.trim().length > 0) return e;
        return ""
    },
    Me = t => {
        const e = t.split(`
`)[0] ? .trim() ? ? "";
        if (e.startsWith(":::writing{")) {
            const n = e.match(/^:::writing\{([^}]*)\}/);
            if (!n) return "Writing block";
            const s = n[1] ? ? "",
                r = s.match(/(?:^|\s)title\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s}]+))/),
                i = s.match(/(?:^|\s)subject\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s}]+))/),
                a = r ? .[1] ? ? r ? .[2] ? ? r ? .[3],
                u = i ? .[1] ? ? i ? .[2] ? ? i ? .[3],
                d = a ? ? u;
            return d ? .trim() ? d.trim() : "Writing block"
        }
        if (e.startsWith("~~~")) {
            const n = e.match(/^~~~\s*(\{.*\})\s*$/);
            if (!n) return null;
            try {
                const s = JSON.parse(n[1]),
                    r = typeof s ? .title == "string" ? s.title : null,
                    i = typeof s ? .subject == "string" ? s.subject : null,
                    a = r ? ? i;
                return a ? .trim() ? a.trim() : "Writing block"
            } catch {
                return "Writing block"
            }
        }
        return null
    },
    G = t => t.replace(he, " ").replace(ve, " "),
    Ae = ({
        content: t,
        imageGenTitle: e,
        uploadFallbackLabel: n
    }) => {
        const s = G(t),
            r = e && G(e),
            i = n && G(n),
            a = Me(s.trimStart()),
            u = Ie(xe(s)),
            d = ye(a, r, u, i);
        return Ee(Ce(d))
    },
    Se = t => t.messageGroups.filter(n => n.type !== -1 && [B.Text, B.b1de6e2_rm].includes(n.type)).flatMap(n => n.messages.filter(s => ie(s) || ae(s) === le.b1de6e2_rm)),
    we = new Set([h.Audio, h.AudioAssetPointer, h.ImageAssetPointer, h.Image, h.RealTimeUserAudioVideoAssetPointer, h.VideoContainerAssetPointer, h.VideoAssetPointer, h.ArbitraryAssetPointer, h.AsyncVideoGenerationContainer]),
    _e = new Set([h.ImageAssetPointer, h.Image, h.SimpleImageAssetPointer]),
    Le = t => t.metadata ? .attachments ? .some(e => e.mime_type ? .toLowerCase().startsWith("image/")) ? !0 : z.isMultimodalTextMessage(t) ? t.content.parts.some(e => typeof e != "string" && _e.has(e.content_type)) : !1,
    Oe = t => (t.metadata ? .attachments ? .length ? ? 0) > 0 ? !0 : z.isMultimodalTextMessage(t) ? t.content.parts.some(e => typeof e != "string" && we.has(e.content_type)) : !1,
    ke = t => t.some(Le) ? "Image upload" : t.some(Oe) ? "File upload" : "",
    Pe = t => {
        const e = t.find(n => n.metadata ? .image_gen_title) ? .metadata ? .image_gen_title;
        return e || (t.find(n => n.metadata ? .async_task_title) ? .metadata ? .async_task_title ? ? null)
    },
    je = t => t.map(e => ce(e, {
        shouldGetVisibleText: !0,
        shouldGetTextFromContentReferences: !1
    })).join(`
`),
    K = t => {
        const e = Se(t),
            n = Pe(e),
            s = je(e),
            r = ke(e);
        return Ae({
            content: s,
            imageGenTitle: n,
            uploadFallbackLabel: r
        })
    },
    tt = t => c.jsx(ee, {
        name: "TableOfContentsSidebar",
        fallback: () => c.jsx(c.Fragment, {
            children: null
        }),
        logRequestErrors: !0,
        children: c.jsx(We, { ...t
        })
    });

function X(t, e = K, {
    labelMode: n = "full"
} = {}) {
    let s = 0,
        r = null,
        i = null;
    const a = [],
        u = new Map,
        d = l => {
            const v = u.get(l.id);
            if (v !== void 0) return v;
            const I = e(l);
            return u.set(l.id, I), I
        };
    for (const l of t) {
        if (!l) {
            i = null;
            continue
        }
        const v = l.role === N.Assistant;
        if (v && (s += 1), !(i ? .role === N.User && i.messages.some(b => b.metadata ? .visually_hide_response_from_conversation))) {
            const b = v ? r : null;
            let T = "";
            n === "full" && (T = b ? d(b) : "", T || (T = d(l))), (T || v) && a.push({
                id: l.id,
                label: T || `Reply ${s}`,
                role: l.role,
                scrollToTurnId: v ? b ? .id ? ? l.id : l.id
            })
        }
        l.role === N.User && (r = l), i = l
    }
    return a
}

function Ne(t) {
    const n = k.getConversationTurnIds(t).map((s, r) => k.getConversationTurnAtIndex(t, r));
    return X(n)
}

function Re(t) {
    const n = k.getConversationTurnIds(t).map((s, r) => k.getConversationTurnAtIndex(t, r));
    return X(n, K, {
        labelMode: "fallback"
    })
}

function Fe(t) {
    const e = k.getConversationTurnIds(t);
    let n = 0;
    for (let s = 0; s < e.length; s += 1) k.getConversationTurnAtIndex(t, s) ? .role === N.Assistant && (n += 1);
    return n
}

function De({
    isDesktop: t,
    isFocusWithin: e,
    isHovered: n,
    isPinned: s
}) {
    return t ? n || e : n || s
}

function Ue(t) {
    return t instanceof HTMLElement && t.matches(":focus-visible")
}

function Ge(t) {
    "use forget";
    const e = Z.c(5),
        {
            clientThreadId: n,
            isExperimentEnabled: s,
            isTocEligibleConversation: r
        } = t,
        [i, a] = f.useState(null);
    let u, d;
    return e[0] !== n || e[1] !== s || e[2] !== r ? (u = () => {
        if (!r || !s) {
            f.startTransition(() => {
                a(null)
            });
            return
        }
        return f.startTransition(() => {
            a(null)
        }), ue(() => {
            f.startTransition(() => {
                a(n)
            })
        })
    }, d = [n, s, r], e[0] = n, e[1] = s, e[2] = r, e[3] = u, e[4] = d) : (u = e[3], d = e[4]), f.useEffect(u, d), r && s && i === n
}
const We = ({
        conversation: t,
        scrollContainerRef: e
    }) => {
        const n = q(de),
            s = W(t.id, l => l ? .mode),
            r = W(t.id, Fe),
            [i, a] = f.useState(!1),
            u = s ? .kind === te.PrimaryAssistant && r >= pe;
        return f.useEffect(() => {
            if (!n) {
                a(!1);
                return
            }
            if (!u) {
                a(!1);
                return
            }
            a(ne("2921297473").get("enabled", !1))
        }, [u, n]), Ge({
            clientThreadId: t.id,
            isExperimentEnabled: i,
            isTocEligibleConversation: u
        }) ? c.jsx(He, {
            conversation: t,
            scrollContainerRef: e
        }) : null
    },
    He = ({
        conversation: t,
        scrollContainerRef: e
    }) => {
        const n = f.useRef(null),
            [s, r] = f.useState(!1),
            [i, a] = f.useState(!1),
            [u, d] = f.useState(!1),
            [l, v] = fe(),
            [I, b] = f.useState(null),
            T = f.useRef(null),
            w = f.useRef(null),
            E = q(se),
            y = Q(),
            x = !E,
            M = De({
                isDesktop: x,
                isFocusWithin: i,
                isHovered: s,
                isPinned: u
            }),
            _ = W(t.id, me(o => M ? Ne(o) : Re(o))),
            C = M ? ge(_) : _,
            L = f.useCallback(async (o, m, p) => {
                m === "turn" && b(o);
                const D = p ? ? o,
                    O = document.querySelector(m === "turn" ? `[data-turn-id="${D}"]` : `[data-section-id="${o}"]`);
                O && e.current && (re.logEvent("Table of Contents: Clicked", {
                    type: m,
                    screenWidth: window.innerWidth
                }), await be(O, e.current), E && (d(!1), r(!1)))
            }, [e, E]);
        f.useEffect(() => {
            if (typeof IntersectionObserver > "u") return;
            const o = C.map(g => g.id);
            if (!o.length) return;
            const m = e.current,
                p = m instanceof Element ? m : null,
                D = p ? ? document.documentElement,
                O = new Set(o),
                U = new Set,
                Y = () => {
                    const g = o.find(A => U.has(A)) ? ? null;
                    g && b(g)
                },
                H = new IntersectionObserver(g => {
                    for (const A of g) {
                        if (!(A.target instanceof HTMLElement)) continue;
                        const R = A.target.dataset.turnId ? .trim() ? ? null;
                        !R || !O.has(R) || (A.isIntersecting ? U.add(R) : U.delete(R))
                    }
                    Y()
                }, {
                    root: p,
                    rootMargin: "-49% 0px -49% 0px",
                    threshold: 0
                }),
                J = D.querySelectorAll("[data-turn-id]");
            for (const g of J) {
                const A = g.dataset.turnId ? .trim() ? ? null;
                !A || !O.has(A) || H.observe(g)
            }
            return b(g => g && O.has(g) ? g : o[0] ? ? null), () => {
                H.disconnect()
            }
        }, [C, e]), f.useEffect(() => () => {
            T.current && clearTimeout(T.current)
        }, []);
        const S = I && C.some(o => o.id === I) ? I : C[0] ? .id ? ? null,
            P = C,
            j = () => {
                v(!0), d(!1), r(!1)
            };
        return f.useEffect(() => {
            if (!w.current) return;
            (w.current.querySelector('[data-toc-active="true"]') ? ? null) ? .scrollIntoView({
                block: "nearest"
            })
        }, [S, M]), E && l ? null : c.jsx("div", {
            ref: n,
            className: "fixed end-4 top-1/2 z-20 -translate-y-1/2",
            onMouseEnter: () => {
                x && (T.current && clearTimeout(T.current), r(!0))
            },
            onMouseLeave: () => {
                x && (T.current = setTimeout(() => {
                    r(!1)
                }, 250))
            },
            onFocusCapture: o => {
                x && (T.current && clearTimeout(T.current), a(Ue(o.target)))
            },
            onBlurCapture: o => {
                if (!x) return;
                const m = o.relatedTarget;
                m instanceof Node && n.current ? .contains(m) || a(!1)
            },
            children: c.jsxs("div", {
                className: "relative flex items-start",
                children: [!x && c.jsx("button", {
                    type: "button",
                    onClick: () => d(o => !o),
                    className: F("border-token-border-default bg-token-bg-primary/90 shadow-xs", "flex h-7 w-7 items-center justify-center rounded-md border", "absolute end-0 top-0 transition-opacity", "hover:border-token-border-heavy", M ? "pointer-events-none opacity-0" : "opacity-100"),
                    "aria-label": y.formatMessage({
                        id: "TableOfContents.ToggleAriaLabel",
                        defaultMessage: "Table of contents"
                    }),
                    children: c.jsxs("div", {
                        className: "flex flex-col gap-[3px]",
                        children: [c.jsx("span", {
                            className: "bg-token-text-primary h-[2px] w-[14px] rounded"
                        }), c.jsx("span", {
                            className: "bg-token-text-tertiary h-[2px] w-[14px] rounded"
                        }), c.jsx("span", {
                            className: "bg-token-text-tertiary h-[2px] w-[14px] rounded"
                        })]
                    })
                }), x && c.jsx("div", {
                    className: "flex w-9 flex-col items-center gap-2 py-1",
                    children: P.map((o, m) => {
                        const p = o.id === S;
                        return c.jsx("button", {
                            type: "button",
                            onClick: () => L(o.id, "turn", o.scrollToTurnId),
                            className: F("h-[2px] w-[18px] rounded-full transition-all", p ? "bg-token-text-primary" : "bg-token-text-tertiary/60 hover:bg-token-text-secondary"),
                            "aria-label": o.label
                        }, o.id ? ? m)
                    })
                }), M && c.jsx("div", {
                    className: F(oe, "absolute end-0 top-1/2 z-10 max-w-[340px] min-w-[240px] -translate-y-1/2"),
                    children: c.jsxs("ul", {
                        className: "flex max-h-[70vh] flex-col overflow-y-auto",
                        ref: w,
                        children: [P.map((o, m) => c.jsx("li", {
                            children: c.jsx($, {
                                as: "button",
                                label: o.label,
                                onClick: () => L(o.id, "turn", o.scrollToTurnId),
                                active: o.id === S,
                                fillContainer: !0,
                                className: F("w-full text-start"),
                                "data-toc-active": o.id === S ? "true" : void 0
                            })
                        }, o.id ? ? m)), E && c.jsx("li", {
                            children: c.jsx($, {
                                as: "button",
                                onClick: j,
                                fillContainer: !0,
                                className: "w-full text-start",
                                children: y.formatMessage({
                                    id: "TableOfContents.Hide",
                                    defaultMessage: "Hide"
                                })
                            })
                        })]
                    })
                })]
            })
        })
    };
export {
    tt as TableOfContentsSidebar, We as TableOfContentsSidebarGate, De as getIsTableOfContentsOpen, X as getTableOfContentsTurnItemsFromTurns, Ue as shouldKeepTableOfContentsOpenOnFocus, Ge as useIdleMountedTableOfContentsSidebar
};
//# sourceMappingURL=5ff8b827-dbgyxtmq8d9vjx7i.js.map