const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/172a9698-fodb8bt7tnklhykp.js", "assets/2340486e-dvd8m80i7d6hyild.js"]))) => i.map(i => d[i]);
import {
    c as ce,
    j as t,
    r as S,
    _ as Me,
    o as M,
    aq as Ae,
    u as Ee,
    y as Re
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    r as be,
    b as Be,
    A as Ne
} from "./8a10ee4a-fo1o4uf1uo7zqngr.js";
import {
    b5 as Te,
    af as je,
    be as Le,
    e as Se,
    ix as Pe,
    AW as ve,
    AX as Oe,
    hX as Fe,
    AY as He,
    AZ as $e,
    hP as Je,
    jd as We,
    d$ as Ue,
    A_ as ze,
    A$ as Ke,
    At as Ve,
    jp as Ie,
    aP as Ye
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    L as re
} from "./c8f38d6c-i5s9j3oolp7zpjbo.js";
import {
    lN as Ze,
    dT as Ge,
    hN as Xe,
    ky as qe,
    fv as Qe
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    g as we,
    a as et,
    p as tt,
    i as st,
    b as _e,
    c as nt
} from "./58ab20f4-cvcq70132cgmqb2g.js";
import {
    S as x
} from "./fd49efc5-ftydrxgh4y8cl3v6.js";
import "./17eb3c01-l4k9yeo526nqvmve.js";
const ot = s => {
        "use forget";
        const e = ce.c(17),
            {
                onDrag: l,
                onDragEnd: n,
                onDoubleClick: a,
                onDragStart: c,
                onPointerUp: o
            } = s;
        let r, d, p, i;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (r = {
            opacity: 1
        }, d = {
            opacity: 1
        }, p = {
            type: "tween",
            duration: .1
        }, i = {
            x: 0,
            y: 0,
            transform: "translateY(0px)"
        }, e[0] = r, e[1] = d, e[2] = p, e[3] = i) : (r = e[0], d = e[1], p = e[2], i = e[3]);
        let u;
        e[4] !== c ? (u = () => {
            c ? .()
        }, e[4] = c, e[5] = u) : u = e[5];
        let f;
        e[6] === Symbol.for("react.memo_cache_sentinel") ? (f = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }, e[6] = f) : f = e[6];
        let h;
        e[7] !== l ? (h = (_, k) => {
            l ? .(k)
        }, e[7] = l, e[8] = h) : h = e[8];
        let g;
        e[9] !== n ? (g = (_, k) => n ? .(k), e[9] = n, e[10] = g) : g = e[10];
        let v;
        return e[11] !== a || e[12] !== o || e[13] !== u || e[14] !== h || e[15] !== g ? (v = t.jsx(Te.div, {
            drag: "x",
            tabIndex: -1,
            className: "bg-token-border-default pointer-events-auto absolute top-0 bottom-0 z-20 w-[2px] cursor-ew-resize rounded-full opacity-0 after:absolute after:inset-y-0 after:start-1/2 after:top-[-18px] after:h-[calc(100%+36px)] after:w-[16px] after:-translate-x-1/2 after:transform after:bg-transparent after:content-['']",
            whileHover: r,
            whileDrag: d,
            transition: p,
            style: i,
            onPointerDown: u,
            dragMomentum: !1,
            dragSnapToOrigin: !1,
            dragElastic: !1,
            dragConstraints: f,
            onDrag: h,
            onPointerUp: o,
            onDragEnd: g,
            onDoubleClick: a
        }), e[11] = a, e[12] = o, e[13] = u, e[14] = h, e[15] = g, e[16] = v) : v = e[16], v
    },
    lt = s => {
        "use forget";
        const e = ce.c(11),
            {
                className: l,
                content: n,
                tiktokenImport: a,
                o200kBaseImport: c
            } = s,
            {
                Tiktoken: o
            } = S.use(a),
            {
                default: r
            } = S.use(c);
        let d;
        e[0] !== o || e[1] !== n || e[2] !== r ? (d = new o(r).encode(n), e[0] = o, e[1] = n, e[2] = r, e[3] = d) : d = e[3];
        const p = d.length;
        let i;
        e[4] !== l ? (i = je("text-token-text-secondary min-w-0 truncate font-mono text-xs", l), e[4] = l, e[5] = i) : i = e[5];
        let u;
        e[6] !== p ? (u = t.jsx(M, {
            id: "NUKG65",
            defaultMessage: "{tokenCount} tokens",
            values: {
                tokenCount: t.jsx(Ae, {
                    value: p
                })
            }
        }), e[6] = p, e[7] = u) : u = e[7];
        let f;
        return e[8] !== i || e[9] !== u ? (f = t.jsx("div", {
            className: i,
            children: u
        }), e[8] = i, e[9] = u, e[10] = f) : f = e[10], f
    },
    ie = ({
        className: s,
        content: e
    }) => {
        "use no forget";
        const l = S.useMemo(() => Me(() =>
                import ("./172a9698-fodb8bt7tnklhykp.js"), __vite__mapDeps([0, 1])), []),
            n = S.useMemo(() => Me(() =>
                import ("./6054eeed-o5eltwebd0mkim81.js"), []), []);
        return e ? t.jsx(S.Suspense, {
            name: "dev-mode-token-count",
            fallback: t.jsx("div", {
                className: "loading-results-shimmer h-5 w-10 rounded-lg"
            }),
            children: t.jsx(lt, {
                className: s,
                content: e,
                tiktokenImport: l,
                o200kBaseImport: n
            })
        }) : null
    };

function ye(s) {
    if (!s) return null;
    const e = s.metadata ? .jit_plugin_data ? .from_server;
    return e && "body" in e ? e.body : null
}

function ke(s) {
    if (!s) return null;
    const e = ye(s);
    if (!e || typeof e != "object") return null;
    const l = e,
        n = [l.connector_link_id, l.params ? .connector_link_id, l.params ? .connector_service_link_id, l.params ? .link_id, l.params ? .linkId];
    for (const a of n)
        if (typeof a == "string" && a.length > 0) return a;
    return null
}

function Ce(s) {
    if (!s) return null;
    const e = s.metadata ? .chatgpt_sdk ? .attribution_id;
    if (typeof e == "string" && e.length > 0) return e;
    const l = ye(s);
    if (!l || typeof l != "object") return null;
    const n = l;
    return typeof n.connector_id == "string" && n.connector_id.length ? n.connector_id : typeof n.params ? .connector_id == "string" && n.params.connector_id.length ? n.params.connector_id : null
}

function De(s, e) {
    const l = s.functionName != null ? e.find(c => c.name === s.functionName) : void 0,
        n = ye(s.toolCallMessage),
        a = l ? ? n;
    return a ? Be(a) : []
}

function at(s) {
    const e = [],
        l = n => n.author.role === "assistant" && !!n.recipient ? .startsWith ? .("api_tool");
    for (let n = 0; n < s.length; n++) {
        const a = s[n];
        if (!l(a)) continue;
        const c = tt(a) ? ? null;
        let o = null,
            r = null;
        for (let T = n + 1; T < s.length; T++) {
            const y = s[T];
            if (l(y)) break;
            st(y, a) && (o = y, _e(y) != null && (r = y))
        }
        o = r ? ? o;
        const d = o != null ? _e(o) : null;
        let p = c ? .args ? ? null;
        if (!p && o) {
            const y = o.metadata ? .jit_plugin_data ? .from_server,
                m = y && "body" in y ? y.body : void 0;
            if (m && typeof m == "object") {
                const j = m;
                j.params !== void 0 && (p = j.params)
            }
            if (!p && d && typeof d == "object") {
                const j = d;
                j.toolInput != null && (p = j.toolInput)
            }
        }
        const i = c ? .path ? ? null,
            u = i ? i.split("/").filter(Boolean) : [],
            f = u.length >= 2 ? u[1] : ke(o) ? ? ke(a),
            h = Ce(o) ? ? Ce(a),
            g = u.length > 0 ? u[u.length - 1] : null,
            v = o != null ? nt(o) ? ? null : null,
            _ = o ? .metadata ? .chatgpt_sdk != null ? qe(o.metadata.chatgpt_sdk) : null,
            k = o ? .metadata ? .chatgpt_sdk ? .external_call_time_ms ? ? null;
        e.push({
            toolCallMessage: a,
            toolResponseMessage: o,
            path: i,
            linkId: f,
            connectorId: h,
            functionName: g,
            toolInput: p,
            toolOutput: d,
            toolResponseMetadata: v,
            widgetState: _,
            externalCallTimeMs: k
        })
    }
    return e
}
const rt = ({
        call: s,
        index: e,
        totalCount: l,
        actions: n,
        intl: a,
        logLineClassName: c,
        isDescriptionExpanded: o,
        setIsDescriptionExpanded: r,
        showHeader: d = !0
    }) => {
        "use no forget";
        const p = s.functionName ? ? s.toolCallMessage.recipient ? .split(".").pop() ? ? s.toolCallMessage.recipient ? ? "<unknown>",
            i = s.functionName != null ? n.find(k => k.name === s.functionName) : void 0,
            u = be({
                badgeKeys: De(s, n),
                labels: Ne,
                className: "flex-wrap gap-1"
            }),
            f = !!i ? .description,
            h = i ? .templates ? .[0],
            g = h != null || s.widgetState != null || s.toolResponseMetadata != null || s.externalCallTimeMs != null,
            v = s.toolInput != null ? JSON.stringify(s.toolInput) : "{}",
            _ = s.toolOutput != null ? JSON.stringify(s.toolOutput) : "{}";
        return t.jsxs(x.Root, {
            defaultExpanded: e === l - 1,
            children: [d && t.jsx(x.Header, {
                accessory: t.jsx(ie, {
                    content: _
                }),
                children: t.jsxs("div", {
                    className: "flex min-w-0 flex-col gap-1",
                    children: [t.jsx("span", {
                        className: "truncate font-mono text-sm",
                        children: t.jsx(M, {
                            id: "LCSWJ4",
                            defaultMessage: "Tool call {index}: {functionName}",
                            values: {
                                index: e + 1,
                                functionName: p
                            }
                        })
                    }), u]
                })
            }), t.jsxs(x.Content, {
                children: [f && t.jsxs(x.Root, {
                    defaultExpanded: !1,
                    children: [t.jsx(x.Header, {
                        accessory: i ? .description ? t.jsx("div", {
                            className: "flex items-center gap-2",
                            children: i ? .description && t.jsx(ie, {
                                content: i.description
                            })
                        }) : void 0,
                        children: t.jsx("span", {
                            className: "truncate font-mono text-sm",
                            children: t.jsx(M, {
                                id: "cBVjg7",
                                defaultMessage: "Tool description"
                            })
                        })
                    }), t.jsx(x.Content, {
                        children: t.jsx("div", {
                            className: "ps-6",
                            children: i ? .description ? t.jsxs(t.Fragment, {
                                children: [t.jsx("span", {
                                    className: je("text-token-text-primary block text-sm whitespace-pre-wrap", o ? "line-clamp-none" : "line-clamp-4"),
                                    children: i.description
                                }), t.jsx("button", {
                                    className: "text-token-text-secondary mt-1 flex justify-start text-sm hover:underline",
                                    onClick: () => r(!o),
                                    children: o ? t.jsx(M, {
                                        id: "Mggt6n",
                                        defaultMessage: "See less"
                                    }) : t.jsx(M, {
                                        id: "yhD38v",
                                        defaultMessage: "See all"
                                    })
                                })]
                            }) : t.jsx("span", {
                                className: "text-token-text-secondary text-sm",
                                children: t.jsx(M, {
                                    id: "RyyTsY",
                                    defaultMessage: "No description provided."
                                })
                            })
                        })
                    })]
                }), g && t.jsxs(x.Root, {
                    children: [t.jsx(x.Header, {
                        accessory: t.jsx(Je, {
                            href: "https://developers.openai.com/apps-sdk",
                            children: t.jsx(We, {
                                className: "icon-sm opacity-60"
                            })
                        }),
                        children: t.jsx("span", {
                            className: "font-mono text-sm",
                            children: t.jsx(M, {
                                id: "j5ZJHT",
                                defaultMessage: "Widget"
                            })
                        })
                    }), t.jsx(x.Content, {
                        children: t.jsx(re, {
                            isInitialLevelExpanded: !0,
                            unwrap: !0,
                            className: c,
                            value: {
                                template: h ? .meta ? ? null,
                                state: s.widgetState ? ? null,
                                responseMetadata: s.toolResponseMetadata ? ? null,
                                externalCallTimeMs: s.externalCallTimeMs ? ? null
                            }
                        })
                    })]
                }), t.jsxs(x.Root, {
                    children: [t.jsx(x.Header, {
                        tooltip: a.formatMessage({
                            id: "Jf3mMy",
                            defaultMessage: "Tool input is the model-written input to the tool call."
                        }),
                        accessory: t.jsx(ie, {
                            content: v
                        }),
                        children: t.jsx("span", {
                            className: "font-mono text-sm",
                            children: t.jsx(M, {
                                id: "o6IX3y",
                                defaultMessage: "Tool input"
                            })
                        })
                    }), t.jsx(x.Content, {
                        children: t.jsx(re, {
                            className: c,
                            isInitialLevelExpanded: !0,
                            unwrap: !0,
                            value: s.toolInput ? ? {}
                        })
                    })]
                }), t.jsxs(x.Root, {
                    children: [t.jsx(x.Header, {
                        tooltip: a.formatMessage({
                            id: "xa77YH",
                            defaultMessage: "Tool output is the structured tool output returned by the tool."
                        }),
                        accessory: t.jsxs("div", {
                            className: "flex items-end gap-1",
                            children: [s.externalCallTimeMs != null && t.jsx("span", {
                                className: "text-token-text-secondary font-mono text-xs",
                                children: a.formatMessage({
                                    id: "D5wi0Z",
                                    defaultMessage: "Timing: {ms}ms /"
                                }, {
                                    ms: s.externalCallTimeMs
                                })
                            }), t.jsx(ie, {
                                content: _
                            })]
                        }),
                        children: t.jsx("span", {
                            className: "font-mono text-sm",
                            children: t.jsx(M, {
                                id: "2IVEZx",
                                defaultMessage: "Tool output"
                            })
                        })
                    }), t.jsx(x.Content, {
                        children: s.toolOutput != null ? t.jsx(re, {
                            className: c,
                            isInitialLevelExpanded: !0,
                            unwrap: !0,
                            value: s.toolOutput
                        }) : t.jsx("span", {
                            className: "text-token-text-secondary text-sm",
                            children: t.jsx(M, {
                                id: "lpg5UJ",
                                defaultMessage: "No tool response"
                            })
                        })
                    })]
                }), s.toolResponseMetadata != null && t.jsxs(x.Root, {
                    children: [t.jsx(x.Header, {
                        tooltip: a.formatMessage({
                            id: "MAlg9H",
                            defaultMessage: "The tool response metadata is the `_meta` field of the tool response."
                        }),
                        children: t.jsx("span", {
                            className: "font-mono text-sm",
                            children: t.jsx(M, {
                                id: "4CjZ4d",
                                defaultMessage: "Tool response metadata"
                            })
                        })
                    }), t.jsx(x.Content, {
                        children: t.jsx(re, {
                            className: c,
                            isInitialLevelExpanded: !0,
                            unwrap: !0,
                            value: s.toolResponseMetadata
                        })
                    })]
                })]
            })]
        })
    },
    it = s => {
        "use forget";
        const e = ce.c(92),
            {
                focusedMessages: l,
                conversation: n
            } = s;
        let a;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (a = Ue(), e[0] = a) : a = e[0];
        const c = a,
            o = Ee(),
            r = ve(0),
            [d, p] = S.useState(!1),
            [i, u] = S.useState(!1),
            f = ve(400);
        let h;
        e[1] !== r || e[2] !== f ? (h = [f, r], e[1] = r, e[2] = f, e[3] = h) : h = e[3];
        const g = Oe(h, ct);
        let v;
        e[4] === Symbol.for("react.memo_cache_sentinel") ? (v = () => ze(c), e[4] = v) : v = e[4];
        const _ = Se(v),
            {
                connectorLinks: k,
                refetch: T
            } = Fe();
        let y;
        e[5] !== l ? (y = at(l), e[5] = l, e[6] = y) : y = e[6];
        const m = y,
            j = m.length === 1 ? m[0] : null;
        let ee;
        e[7] !== j ? (ee = j && (j.functionName ? ? j.toolCallMessage.recipient ? .split(".").pop() ? ? j.toolCallMessage.recipient ? ? "<unknown>"), e[7] = j, e[8] = ee) : ee = e[8];
        const de = ee;
        let b, te;
        if (e[9] !== k || e[10] !== _ || e[11] !== m) {
            b = [...m].reverse().find(dt) ? .linkId ? ? "";
            const N = [...m].reverse().find(ut) ? .connectorId ? ? "",
                Q = et(k, b);
            te = Q ? .connector_id != null ? _ ? .get(Q.connector_id) : N ? _ ? .get(N) : null, e[9] = k, e[10] = _, e[11] = m, e[12] = b, e[13] = te
        } else b = e[12], te = e[13];
        const C = te,
            ue = C ? .logo_url ? ? null,
            fe = C ? .logo_url_dark ? ? null,
            me = !!(C ? .logo_url || C ? .logo_url_dark);
        let se;
        e[14] !== ue || e[15] !== fe || e[16] !== me ? (se = {
            lightLogoUrl: ue,
            darkLogoUrl: fe,
            enabled: me
        }, e[14] = ue, e[15] = fe, e[16] = me, e[17] = se) : se = e[17];
        const {
            data: ne
        } = Ze(se), {
            actions: I
        } = He(C);
        let oe;
        e[18] !== I || e[19] !== j ? (oe = j != null ? be({
            badgeKeys: De(j, I),
            labels: Ne,
            className: "flex-wrap gap-1 mt-1"
        }) : null, e[18] = I, e[19] = j, e[20] = oe) : oe = e[20];
        const pe = oe;
        let w;
        e[21] !== T ? (w = async N => {
            await Ke(N), await Promise.all([T(), Ve.refetch(c, void 0, void 0)])
        }, e[21] = T, e[22] = w) : w = e[22];
        let D;
        e[23] !== o ? (D = () => {
            Ie().success(o.formatMessage({
                id: "n9Ee37",
                defaultMessage: "Tool updated"
            }))
        }, e[23] = o, e[24] = D) : D = e[24];
        let le;
        e[25] !== w || e[26] !== D ? (le = {
            mutationFn: w,
            onError: ft,
            onSuccess: D
        }, e[25] = w, e[26] = D, e[27] = le) : le = e[27];
        const A = Re(le);
        let E;
        e[28] !== d ? (E = d && t.jsx("div", {
            className: "fixed inset-0 z-0 bg-transparent"
        }), e[28] = d, e[29] = E) : E = e[29];
        let R;
        e[30] !== r ? (R = () => {
            p(!0), r.set(0)
        }, e[30] = r, e[31] = R) : R = e[31];
        let B;
        e[32] !== g || e[33] !== r || e[34] !== f ? (B = () => {
            p(!1), r.set(0), f.set(g.get())
        }, e[32] = g, e[33] = r, e[34] = f, e[35] = B) : B = e[35];
        let L;
        e[36] !== r ? (L = N => r.set(r.get() + N.delta.x), e[36] = r, e[37] = L) : L = e[37];
        let P;
        e[38] !== R || e[39] !== B || e[40] !== L ? (P = t.jsx(ot, {
            onDragStart: R,
            onDragEnd: B,
            onDrag: L
        }), e[38] = R, e[39] = B, e[40] = L, e[41] = P) : P = e[41];
        let O;
        e[42] !== g ? (O = {
            width: g
        }, e[42] = g, e[43] = O) : O = e[43];
        let F;
        e[44] !== C ? .name || e[45] !== ne ? (F = ne ? .url && t.jsx("img", {
            className: "h-4 w-4 rounded-md",
            src: ne.url,
            alt: C ? .name ? ? ""
        }), e[44] = C ? .name, e[45] = ne, e[46] = F) : F = e[46];
        let H;
        e[47] !== C ? .name ? (H = C ? .name ? ? t.jsx(M, {
            id: "lDDPYo",
            defaultMessage: "Unknown Connector"
        }), e[47] = C ? .name, e[48] = H) : H = e[48];
        let $;
        e[49] !== H ? ($ = t.jsx("span", {
            className: "text-token-text-primary text-lg",
            children: H
        }), e[49] = H, e[50] = $) : $ = e[50];
        let J;
        e[51] !== F || e[52] !== $ ? (J = t.jsxs("div", {
            className: "flex items-center gap-2",
            children: [F, $]
        }), e[51] = F, e[52] = $, e[53] = J) : J = e[53];
        let W;
        e[54] !== b || e[55] !== A ? (W = () => {
            b && A.mutate(b)
        }, e[54] = b, e[55] = A, e[56] = W) : W = e[56];
        const xe = A.isPending || !b,
            ge = A.isPending ? $e : Ge,
            he = A.isPending && "motion-safe:animate-spin";
        let U;
        e[57] !== he ? (U = je("icon", he), e[57] = he, e[58] = U) : U = e[58];
        let z;
        e[59] !== W || e[60] !== xe || e[61] !== ge || e[62] !== U ? (z = t.jsx(Qe, {
            className: "ms-auto",
            onClick: W,
            disabled: xe,
            icon: ge,
            iconClassName: U
        }), e[59] = W, e[60] = xe, e[61] = ge, e[62] = U, e[63] = z) : z = e[63];
        let K;
        e[64] !== n ? (K = t.jsx(Ye, {
            onClick: () => we(n).blur()
        }), e[64] = n, e[65] = K) : K = e[65];
        let V;
        e[66] !== J || e[67] !== z || e[68] !== K ? (V = t.jsxs("div", {
            className: "flex h-(--header-height) items-center gap-1 ps-3 pe-2",
            children: [J, z, K]
        }), e[66] = J, e[67] = z, e[68] = K, e[69] = V) : V = e[69];
        let Y;
        e[70] !== pe || e[71] !== de || e[72] !== m.length ? (Y = m.length === 0 ? null : m.length === 1 ? t.jsx("div", {
            className: "border-b px-3 py-3",
            children: t.jsxs("div", {
                className: "flex flex-col gap-1",
                children: [t.jsx("span", {
                    className: "text-token-text-secondary font-mono text-sm",
                    children: de
                }), pe]
            })
        }) : t.jsx("div", {
            className: "border-b px-3 py-3",
            children: t.jsx("span", {
                className: "text-token-text-secondary font-mono text-sm",
                children: t.jsx(M, {
                    id: "5zemKr",
                    defaultMessage: "Tool call list"
                })
            })
        }), e[70] = pe, e[71] = de, e[72] = m.length, e[73] = Y) : Y = e[73];
        let Z;
        e[74] !== I || e[75] !== o || e[76] !== i || e[77] !== m ? (Z = m.length === 0 ? t.jsx("div", {
            className: "text-token-text-secondary px-3 py-3 text-sm",
            children: t.jsx(M, {
                id: "UGPm+j",
                defaultMessage: "No tool calls found."
            })
        }) : m.map((N, Q) => t.jsx(rt, {
            call: N,
            index: Q,
            totalCount: m.length,
            actions: I,
            intl: o,
            logLineClassName: "!text-xs !leading-5",
            isDescriptionExpanded: i,
            setIsDescriptionExpanded: u,
            showHeader: m.length > 1
        }, `${N.toolCallMessage.id??"tool"}-${Q}`)), e[74] = I, e[75] = o, e[76] = i, e[77] = m, e[78] = Z) : Z = e[78];
        let G;
        e[79] !== Y || e[80] !== Z ? (G = t.jsxs("div", {
            className: "flex h-full flex-col overflow-x-hidden overflow-y-auto",
            children: [Y, Z]
        }), e[79] = Y, e[80] = Z, e[81] = G) : G = e[81];
        let X;
        e[82] !== O || e[83] !== V || e[84] !== G ? (X = t.jsxs(Te.div, {
            className: "relative flex h-full flex-col",
            style: O,
            children: [V, G]
        }), e[82] = O, e[83] = V, e[84] = G, e[85] = X) : X = e[85];
        let q;
        e[86] !== P || e[87] !== X ? (q = t.jsxs("div", {
            className: "border-token-border-default bg-token-bg-elevated-secondary z-10 h-full border-s",
            children: [P, X]
        }), e[86] = P, e[87] = X, e[88] = q) : q = e[88];
        let ae;
        return e[89] !== E || e[90] !== q ? (ae = t.jsxs(t.Fragment, {
            children: [E, q]
        }), e[89] = E, e[90] = q, e[91] = ae) : ae = e[91], ae
    },
    vt = s => {
        "use forget";
        const e = ce.c(9),
            {
                clientThreadId: l
            } = s;
        let n, a;
        e[0] !== l ? (n = Le(l), a = we(n), e[0] = l, e[1] = n, e[2] = a) : (n = e[1], a = e[2]);
        const c = a;
        let o;
        e[3] !== c ? (o = () => c.focusedMessages$(), e[3] = c, e[4] = o) : o = e[4];
        const r = Se(o);
        let d;
        return e[5] !== n || e[6] !== c || e[7] !== r ? (d = r.length > 0 && t.jsx(Pe, {
            name: "DevModeSidebar",
            onError: () => c.blur(),
            children: t.jsx(it, {
                focusedMessages: r,
                conversation: n
            }, r[r.length - 1] ? .id ? ? "dev-mode-sidebar")
        }), e[5] = n, e[6] = c, e[7] = r, e[8] = d) : d = e[8], d
    };

function ct(s) {
    const [e, l] = s;
    return Xe(e - l, 200, 800)
}

function dt(s) {
    return !!s.linkId
}

function ut(s) {
    return !!s.connectorId
}

function ft(s) {
    Ie().danger({
        defaultMessage: "Error refreshing actions.",
        description: "Error message when refreshing actions fails"
    }, {
        error: s
    })
}
export {
    vt as DevModeSidebar
};
//# sourceMappingURL=f62a75a9-mde951qp3gye82gz.js.map