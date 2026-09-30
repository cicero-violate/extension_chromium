import {
    c as _t,
    j as d,
    r as P,
    u as ls,
    s as Hs
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    e as ye,
    eh as Fs,
    c1 as pt,
    Et as Qs,
    nK as as,
    mD as Rs,
    n6 as Ns,
    n7 as $s,
    nn as ts,
    dS as Vs,
    Eu as Zs,
    ey as Se,
    Ev as rs,
    cI as Xt,
    hi as kt,
    mv as Jt,
    rl as Gs,
    s5 as Xs,
    nl as Js,
    nm as en,
    aH as ms,
    nE as tn,
    pT as sn,
    i1 as us,
    jo as nn,
    fv as on,
    qF as ln,
    I as an,
    lm as rn,
    l as cn,
    dt as mn,
    mE as un,
    oM as dn,
    b_ as fn,
    qo as pn,
    gf as Zt,
    aU as gn,
    aX as hn,
    a$ as ss,
    dA as ds,
    u7 as Sn,
    qB as yn,
    Ew as bn,
    Ex as Tn,
    Ey as _n,
    g_ as fs,
    ei as xn,
    qp as Cn,
    n9 as In,
    ge as vn,
    na as Pn,
    _ as js,
    o8 as Mn,
    f as Os,
    t_ as es,
    h as En,
    fg as An,
    dy as wn,
    dv as ps,
    u2 as kn,
    pP as Ln,
    cW as Hn,
    qs as Fn,
    gN as Rn,
    fd as Nn,
    i7 as gs,
    i8 as hs,
    ib as $n,
    i6 as Ss,
    ie as ys,
    gp as Gn,
    af as jn,
    fc as On,
    o4 as bs,
    g$ as Ts,
    Ez as Dn,
    bO as zn,
    n_ as Un,
    ip as qn,
    EA as _s,
    ik as Kn,
    EB as Yn,
    qy as Bn,
    qz as Wn,
    qr as Qn,
    EC as Qt,
    ED as Vn,
    EE as Zn,
    bY as Xn
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    v_ as Jn,
    bB as Ds,
    eY as eo,
    eZ as to,
    v$ as zs,
    w0 as so,
    bN as no,
    w1 as oo,
    w2 as io,
    na as Vt,
    nd as xs,
    nb as lo,
    ht as ao,
    d2 as ro,
    w3 as Cs,
    w4 as co,
    w5 as Is,
    w6 as mo,
    w7 as uo,
    gp as vs,
    gk as Us,
    w8 as fo,
    gl as po,
    w9 as Ps,
    wa as go,
    wb as ho,
    wc as So,
    sZ as yo,
    c1 as bo,
    wd as To,
    we as _o,
    wf as xo,
    wg as Co,
    wh as Io,
    i$ as vo,
    wi as Po,
    or as Ms,
    wj as Mo
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    M as Eo
} from "./dc4ecf2f-itcx2r0rs2xv69mk.js";
import {
    g as Ao
} from "./9bee0952-mp1gcgn6jckvpws6.js";
import {
    g as wo,
    a as ko
} from "./8b7f0dc9-etsrdv5zrmr52uze.js";
import {
    g as Lo
} from "./ad08b33f-m6y61lzfmpdxz75y.js";
import {
    s as Tt,
    S as ns,
    a as Es
} from "./79f982eb-ml1kmcaq3unqs1sp.js";
import {
    f as qs
} from "./bd382fd5-bcke632cms89jbha.js";
import "./1bc04b52-ud6fhzv6uahbvpse.js";
import "./84e8f385-lndtlkfi7kijfbdy.js";
import "./7f00cfec-f04y2v5idy58f22s.js";
import "./b9ebfa06-dm8xq0zfweyjlyrr.js";
const Ho = () => {
    "use forget";
    const t = _t.c(5),
        e = ye(Ro),
        n = Fs();
    let s;
    if (t[0] !== e || t[1] !== n) {
        let c;
        t[3] !== n ? (c = a => Fo(a, n), t[3] = n, t[4] = c) : c = t[4], s = e.filter(No).map(c), t[0] = e, t[1] = n, t[2] = s
    } else s = t[2];
    return s
};

function Fo(t, e) {
    return {
        id: t.id,
        title: t.name,
        secondary: t.description,
        icon: t.icon ? d.jsx(Ds, {
            simple: !0,
            src: t.icon,
            isFirstParty: !1,
            className: "icon",
            alt: ""
        }) : d.jsx(Qs, {
            className: "icon h-5 w-5"
        }),
        matchText: [t.name],
        insertText: "$" + t.name,
        onSelect: () => {
            e(pt.Agent)
        },
        noMatchEmpty: !0,
        showFor: ["slash_command", "agent_tool"],
        searchParameters: {
            targets: [t.name]
        },
        meta: {
            isSkill: !0
        }
    }
}

function Ro() {
    return Jn()
}

function No(t) {
    return t.kind === "skill"
}
const $o = [],
    os = [],
    As = "system_",
    Go = null;

function jo(t) {
    return t ? .id ? .startsWith(As) === !0 || t ? .creator_id ? .startsWith(As) === !0
}

function ws(t) {
    const e = new Set;
    return t.descendants(n => {
        if (!n.isText || n.marks.length === 0) return !0;
        const s = n.marks.find(c => c.type.name === "ecosystemMentionMark");
        return rs(s ? .attrs.id) && e.add(s.attrs.id), !0
    }), Array.from(e)
}

function Oo(t) {
    "use forget";
    const e = _t.c(39),
        n = as();
    let s;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (s = {
        options: {
            scope: "installed"
        }
    }, e[0] = s) : s = e[0];
    const {
        data: c
    } = eo(s), {
        enabled: a
    } = to(), {
        data: E
    } = ye(zo);
    let T;
    e[1] !== E ? (T = E === void 0 ? [] : E, e[1] = E, e[2] = T) : T = e[2];
    const y = T,
        g = Rs(),
        _ = Fs(),
        i = Ns(),
        se = $s();
    let ie;
    e[3] !== g ? (ie = ts() && g === pt.Agent, e[3] = g, e[4] = ie) : ie = e[4];
    const D = ie,
        R = Vs(t.id, Do),
        [z, Q] = P.useState(),
        N = z ? ? os;
    let A;
    e[5] !== n ? (A = () => {
        Q(ws(Se(n).state.doc))
    }, e[5] = n, e[6] = A) : A = e[6];
    let U;
    e[7] !== n || e[8] !== t ? (U = [t, n], e[7] = n, e[8] = t, e[9] = U) : U = e[9], P.useEffect(A, U);
    let V;
    e[10] === Symbol.for("react.memo_cache_sentinel") ? (V = I => {
        Q(M => (M === void 0 ? os : M).filter(Z => Z !== I))
    }, e[10] = V) : V = e[10];
    const $ = V;
    let q;
    e[11] === Symbol.for("react.memo_cache_sentinel") ? (q = I => {
        Q(M => {
            const w = M === void 0 ? os : M;
            return w.includes(I) ? w : [...w, I]
        })
    }, e[11] = q) : q = e[11];
    const j = q;
    let K;
    e[12] !== g || e[13] !== n || e[14] !== t.id || e[15] !== se || e[16] !== _ ? (K = I => {
        if (I.kind !== "tool-mention" && I.kind !== "at-mention") return;
        const M = rs(I.id) ? I.id : null;
        M != null && g === M ? (_(null), $(M)) : M != null && $(M), Xt(t.id, w => {
            const Z = w.selectedHazelnuts ? ? [];
            if (!Z.includes(I.id)) return;
            const X = new Set(Z);
            X.delete(I.id), w.selectedHazelnuts = Array.from(X)
        }), ws(Se(n).state.doc), !ts() && Go != null
    }, e[12] = g, e[13] = n, e[14] = t.id, e[15] = se, e[16] = _, e[17] = K) : K = e[17], zs(K), c ? .hazelnuts;
    let G;
    if (e[18] !== i || e[19] !== t.id || e[20] !== c ? .hazelnuts || e[21] !== D || e[22] !== a || e[23] !== y || e[24] !== R || e[25] !== N || e[26] !== _) {
        e: {
            if (!a && y.length === 0) {
                let m;
                e[28] === Symbol.for("react.memo_cache_sentinel") ? (m = [], e[28] = m) : m = e[28], G = m;
                break e
            }
            let I;e[29] !== D ? (I = m => !(D && jo(m)), e[29] = D, e[30] = I) : I = e[30];
            const M = (c ? .hazelnuts ? ? []).filter(I);
            if (!M.length && !y.length) {
                let m;
                e[31] === Symbol.for("react.memo_cache_sentinel") ? (m = [], e[31] = m) : m = e[31], G = m;
                break e
            }
            let w;e[32] !== t.id || e[33] !== R ? (w = m => {
                const H = R.includes(m.id),
                    Y = Lo(m.iconography),
                    ce = wo(m);
                return {
                    id: m.id,
                    title: m.name,
                    matchText: [m.name, m.id],
                    icon: ce != null ? d.jsx("div", {
                        className: "flex h-5 w-5 items-center justify-center overflow-hidden rounded-full",
                        style: ko(m),
                        children: d.jsx("img", {
                            src: ce,
                            alt: "",
                            className: "h-full w-full object-cover"
                        })
                    }) : d.jsx(Y, {
                        "aria-label": "",
                        className: "icon"
                    }),
                    color: H ? "selected" : void 0,
                    trailing: H ? d.jsx(kt, {
                        className: "icon-sm"
                    }) : void 0,
                    trailingColor: H ? "primary" : void 0,
                    insertText: H ? void 0 : `@${m.name}`,
                    onSelect: () => {
                        Xt(t.id, ne => {
                            const me = ne.selectedHazelnuts ? ? [],
                                b = new Set(me);
                            H ? b.delete(m.id) : b.add(m.id), ne.selectedHazelnuts = Array.from(b)
                        })
                    },
                    showFor: ["at_command", "slash_command"],
                    meta: {
                        isSkill: !0
                    }
                }
            }, e[32] = t.id, e[33] = R, e[34] = w) : w = e[34];
            const Z = M.map(w);
            let X;e[35] !== i || e[36] !== N || e[37] !== _ ? (X = m => {
                const H = N.includes(m.systemHint);
                return {
                    id: m.systemHint,
                    title: m.name,
                    matchText: [m.name, m.systemHint, ...m.aliases ? ? []],
                    icon: m.logo ? d.jsx("div", {
                        className: "flex h-5 w-5 items-center justify-center overflow-hidden rounded-full",
                        children: d.jsx("img", {
                            src: m.logo,
                            alt: "",
                            className: "h-full w-full object-cover"
                        })
                    }) : void 0,
                    color: H ? "selected" : void 0,
                    trailing: H ? d.jsx(kt, {
                        className: "icon-sm"
                    }) : void 0,
                    trailingColor: H ? "primary" : void 0,
                    insertText: H ? void 0 : `@${m.name}`,
                    onSelect: () => {
                        H || (j(m.systemHint), ts() && _(pt.Agent))
                    },
                    showFor: ["at_command", "slash_command"],
                    meta: {
                        insertAsMention: !0
                    }
                }
            }, e[35] = i, e[36] = N, e[37] = _, e[38] = X) : X = e[38];
            const Ce = y.map(X);G = [...Z, ...Ce]
        }
        e[18] = i,
        e[19] = t.id,
        e[20] = c ? .hazelnuts,
        e[21] = D,
        e[22] = a,
        e[23] = y,
        e[24] = R,
        e[25] = N,
        e[26] = _,
        e[27] = G
    }
    else G = e[27];
    return G
}

function Do(t) {
    return t ? .selectedHazelnuts ? ? $o
}

function zo() {
    return Zs()
}
const Uo = () => {
        "use forget";
        const t = _t.c(3),
            e = ls();
        qo();
        const n = as();
        let s;
        return t[0] !== n || t[1] !== e ? (s = () => Ko(e, n), t[0] = n, t[1] = e, t[2] = s) : s = t[2], ye(s)
    },
    qo = () => {
        "use forget";
        const t = _t.c(4),
            e = ye(Yo),
            n = P.useRef(e),
            s = as();
        let c, a;
        t[0] !== s || t[1] !== e ? (c = () => {
            const E = n.current ? .filter(T => !e ? .includes(T)) ? ? [];
            E.length && Gs(Se(s), E), n.current = e
        }, a = [s, e], t[0] = s, t[1] = e, t[2] = c, t[3] = a) : (c = t[2], a = t[3]), P.useEffect(c, a), zs(Bo)
    },
    Ko = (t, e) => Xs() ? Jt.contextCollection$() ? .map(s => ({
        id: s.id,
        title: s.title,
        matchText: [s.title, s.url],
        showFor: ["at_command"],
        icon: s.base64favicon && d.jsx(so, {
            base64: s.base64favicon,
            className: "icon"
        }),
        onSelect() {
            Js(s.id, t) || Gs(Se(e), [s.id]), en(!0)
        },
        insertText: `@${s.title}`,
        searchParameters: {
            targets: [s.title]
        }
    })) ? ? [] : [];

function Yo() {
    return Jt.activeTabContextItemIds$()
}

function Bo(t) {
    if (t.isReset) return;
    if (!Jt.activeTabContextItemIds$() ? .find(n => n === t.id)) return null;
    Jt.activeTabContextItemIds$.set(n => n ? .filter(s => s !== t.id) ? ? null)
}
const Wo = "skills-group-toggle";

function Lt(t) {
    return t.meta ? .isSkill === !0
}

function zt(t) {
    return t.meta ? .isSkillGroupToggle === !0
}

function Qo({
    count: t,
    intl: e,
    isExpanded: n,
    useFlyout: s
}) {
    return {
        id: Wo,
        title: e.formatMessage({
            defaultMessage: "Skills",
            id: "composer.skills.dropdownLabel"
        }),
        matchText: ["skills"],
        icon: d.jsx(oo, {
            className: "icon"
        }),
        trailing: d.jsxs("div", {
            className: "text-token-text-tertiary flex items-center gap-1",
            children: [d.jsx("span", {
                className: "text-xs",
                children: t
            }), s ? d.jsx(ms, {
                className: "icon-sm"
            }) : n ? d.jsx(no, {
                className: "icon-sm"
            }) : d.jsx(ms, {
                className: "icon-sm"
            })]
        }),
        onSelect: () => {},
        showFor: ["at_command", "slash_command"],
        meta: {
            isSkillGroupToggle: !0
        }
    }
}

function Vo({
    groups: t,
    intl: e,
    isSkillsExpanded: n,
    useFlyout: s = !1,
    skillsGroupAfterIndex: c,
    inlineSkills: a = !1
}) {
    if (a) {
        const _ = t.filter(i => i.length > 0);
        return {
            displayGroups: _,
            skillItems: _.flatMap(i => i.filter(Lt))
        }
    }
    const E = [],
        T = [];
    for (const _ of t) {
        const i = _.filter(se => Lt(se) ? (T.push(se), !1) : !0);
        i.length > 0 && E.push(i)
    }
    if (T.length === 0) return {
        displayGroups: E,
        skillItems: T
    };
    const y = [Qo({
            count: T.length,
            intl: e,
            isExpanded: n,
            useFlyout: s
        }), ...n || s ? T : []],
        g = c == null ? E.length : Math.min(c + 1, E.length);
    return {
        displayGroups: [...E.slice(0, g), y, ...E.slice(g)],
        skillItems: T
    }
}

function Zo({
    isSidebarSlash: t,
    promptReferer: e,
    suggestion: n
}) {
    return !!n.insertText && (e === "at_command" || e === "agent_tool" || t || n.meta ? .isSkill === !0 || n.meta ? .insertAsMention === !0)
}
const ks = Math.max(50, ln),
    Ls = 3,
    Ut = sn.CHATGPT_FILE_LIBRARY_ORIGIN_CONVERSATION_MENU;

function Ks(t) {
    const e = t.file_name,
        n = e.split("/"),
        s = n[n.length - 1] ? ? e,
        c = n.length > 1 ? n[0] : void 0;
    return c ? [e, s, c, ...n] : [e, s, ...n]
}

function Xo(t, e = "") {
    const n = t.filter(s => s.state === "ready");
    return e.length === 0 ? n.slice(0, Ls) : qs(n, e, s => ({
        targets: Ks(s)
    }), {
        maxResults: Ls
    })
}

function Jo(t) {
    "use forget";
    const e = _t.c(37),
        {
            canUseInlineTagging: n,
            conversationId: s
        } = t,
        c = tn();
    let a;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (a = io(), e[0] = a) : a = e[0];
    const {
        showRecentFilesDropdown: E
    } = a, T = E;
    let y;
    e[1] === Symbol.for("react.memo_cache_sentinel") ? (y = [], e[1] = y) : y = e[1];
    const [g, _] = P.useState(y), [i, se] = P.useState(null), [ie, D] = P.useState(null), R = P.useRef(0);
    let z, Q;
    e[2] !== n || e[3] !== s ? (z = () => {
        if (!n || !T) return;
        let b = !1;
        return us({
            limit: ks,
            cursor: null,
            preferCache: !0
        }).then(o => {
            b || (_(o.items), se(o.cursor), Vt({
                loadType: "refresh",
                success: !0,
                itemCount: o.items.length,
                libraryOrigin: Ut,
                conversationId: s
            }))
        }).catch(() => {
            b || (_([]), se(null), Vt({
                loadType: "refresh",
                success: !1,
                errorType: xs,
                libraryOrigin: Ut,
                conversationId: s
            }))
        }), () => {
            b = !0
        }
    }, Q = [n, s, T], e[2] = n, e[3] = s, e[4] = z, e[5] = Q) : (z = e[4], Q = e[5]), P.useEffect(z, Q);
    let N;
    e[6] !== g ? (N = b => b.length === 0 ? !0 : g.some(o => {
        if (o.state !== "ready") return !1;
        const k = o.file_name.toLowerCase();
        return k.startsWith(b) ? !0 : k.split("/").some(ue => ue.startsWith(b))
    }), e[6] = g, e[7] = N) : N = e[7];
    const A = N,
        [U, V] = P.useState(""),
        [$, q] = P.useState(void 0);
    let j, K, G;
    if (e[8] !== n || e[9] !== A || e[10] !== i || e[11] !== U || e[12] !== $) {
        j = U.trim().toLowerCase();
        let b;
        e[16] === Symbol.for("react.memo_cache_sentinel") ? (b = (o, k) => {
            V(o), q(k)
        }, e[16] = b) : b = e[16], K = b, G = n && T && $ === "@" && j.length > 0 && i != null && !A(j), e[8] = n, e[9] = A, e[10] = i, e[11] = U, e[12] = $, e[13] = j, e[14] = K, e[15] = G
    } else j = e[13], K = e[14], G = e[15];
    const I = G;
    let M, w;
    e[17] !== s || e[18] !== j || e[19] !== U || e[20] !== I ? (M = () => {
        if (!I) {
            R.current = R.current + 1;
            return
        }
        const b = R.current + 1;
        R.current = b;
        const o = window.setTimeout(() => {
            us({
                limit: ks,
                cursor: null,
                preferCache: !1,
                q: U.trim()
            }).then(k => {
                R.current === b && (D({
                    query: j,
                    items: k.items
                }), Vt({
                    loadType: "refresh",
                    success: !0,
                    itemCount: k.items.length,
                    libraryOrigin: Ut,
                    conversationId: s
                }))
            }).catch(() => {
                R.current === b && (D({
                    query: j,
                    items: []
                }), Vt({
                    loadType: "refresh",
                    success: !1,
                    errorType: xs,
                    libraryOrigin: Ut,
                    conversationId: s
                }))
            })
        }, 200);
        return () => {
            window.clearTimeout(o)
        }
    }, w = [s, j, U, I], e[17] = s, e[18] = j, e[19] = U, e[20] = I, e[21] = M, e[22] = w) : (M = e[21], w = e[22]), P.useEffect(M, w);
    let Z;
    e: {
        if (I && ie ? .query === j) {
            Z = ie.items;
            break e
        }
        Z = g
    }
    const X = Z,
        m = I && ie ? .query === j ? "" : j;
    let H;
    e[23] !== X || e[24] !== m ? (H = Xo(X, m), e[23] = X, e[24] = m, e[25] = H) : H = e[25];
    const Y = H;
    let ce;
    e: {
        if (!n || !T) {
            let o;
            e[26] === Symbol.for("react.memo_cache_sentinel") ? (o = [], e[26] = o) : o = e[26], ce = o;
            break e
        }
        let b;
        if (e[27] !== s || e[28] !== Y || e[29] !== c) {
            let o;
            e[31] !== s || e[32] !== c ? (o = k => {
                const L = k.file_name,
                    ue = L.split("/"),
                    ge = ue[ue.length - 1] ? ? L,
                    B = ue.length > 1 ? ue[0] : void 0,
                    Le = Ks(k);
                return {
                    id: `file-library:${k.file_id}`,
                    title: L,
                    matchText: [L, ge, B ? ? "root"],
                    showFor: ["at_command"],
                    noMatchEmpty: !0,
                    searchParameters: {
                        targets: Le
                    },
                    icon: d.jsx(on, {
                        className: "icon"
                    }),
                    onSelect: () => {
                        const Ie = c.getState().files;
                        if (Ie.some(fe => fe.fileId === k.file_id)) return;
                        const Oe = Ie.filter(ei).length;
                        nn.attachLibraryFile(c, {
                            id: k.file_id,
                            name: k.file_name,
                            mimeType: k.mime_type,
                            size: k.file_size_bytes ? ? void 0,
                            libraryFileId: k.id
                        }), lo({
                            file: {
                                file_id: k.file_id,
                                mime_type: k.mime_type,
                                library_file_category: k.library_file_category
                            },
                            selected: !0,
                            selectedCount: Oe + 1,
                            libraryOrigin: Ut,
                            conversationId: s
                        })
                    }
                }
            }, e[31] = s, e[32] = c, e[33] = o) : o = e[33], b = Y.map(o), e[27] = s, e[28] = Y, e[29] = c, e[30] = b
        } else b = e[30];ce = b
    }
    const ne = ce;
    let me;
    return e[34] !== ne || e[35] !== K ? (me = {
        fileLibraryPathSuggestions: ne,
        onSearchQueryChange: K
    }, e[34] = ne, e[35] = K, e[36] = me) : me = e[36], me
}

function ei(t) {
    return t.source === "library"
}
const ti = "manage-prompts",
    Ys = "slash menu",
    si = 20,
    ni = 20 * 1e3,
    oi = [],
    is = [],
    ii = t => {
        const e = new Set,
            n = [];
        for (const s of t) e.has(s.id) || (e.add(s.id), n.push(s));
        return n
    },
    li = t => t ? {
        "@": "at_command",
        "/": "slash_command",
        $: "agent_tool"
    }[t] ? ? "slash_command" : "slash_command";

function ai(t, e, n) {
    return {
        title: e,
        secondary: void 0
    }
}

function ri({
    modelsData: t,
    currentModelId: e,
    selectModelId: n,
    removeModel: s
}) {
    const c = [];
    for (const a of t.groups)
        for (const E of a.modelIds) {
            const T = t.models.get(E);
            if (!T || T.tags.includes(Rn.HIDDEN)) continue;
            const {
                title: y,
                secondary: g
            } = ai(E, T.title, a.group), _ = e === T.id;
            c.push({
                command: T.id,
                title: y,
                secondary: g,
                trailing: _ ? d.jsx(kt, {
                    className: "icon-sm"
                }) : d.jsx(Nn, {
                    children: a.label
                }),
                color: _ ? "selected" : void 0,
                trailingColor: _ ? "primary" : void 0,
                noMatchEmpty: !0,
                matchWeight: .1,
                disabled: !1,
                icon: d.jsx(Po, {
                    className: "icon"
                }),
                onSelect: () => {
                    if (_) {
                        s ? .();
                        return
                    }
                    n(T.id, Ys)
                }
            })
        }
    return c
}

function ci({
    modelsData: t,
    currentModelId: e,
    currentVersionId: n,
    selectModelId: s,
    intl: c,
    showModelSlashCommands: a,
    removeModel: E
}) {
    if (!a || !n) return [];
    const T = wn(t, e) ? .modelLane;
    return [{
        lane: ps.THINKING,
        title: c.formatMessage({
            id: "Htplqp",
            defaultMessage: "Thinking"
        }),
        keywords: ["thinking"],
        icon: d.jsx(yo, {
            className: "icon"
        })
    }, {
        lane: ps.PRO,
        title: c.formatMessage({
            id: "KiLZtd",
            defaultMessage: "Pro mode"
        }),
        keywords: ["pro mode", "pro"],
        icon: d.jsx(bo, {
            className: "icon"
        })
    }].flatMap(g => {
        const _ = kn(t, n, g.lane);
        if (!_) return [];
        const i = T === g.lane;
        return [{
            id: `model-lane:${g.lane}`,
            title: g.title,
            matchText: [g.title, ...g.keywords],
            icon: g.icon,
            trailing: i ? d.jsx(kt, {
                className: "icon-sm"
            }) : void 0,
            trailingColor: i ? "primary" : void 0,
            color: i ? "selected" : void 0,
            showFor: ["slash_command"],
            searchParameters: {
                targets: [g.title, ...g.keywords]
            },
            onSelect: () => {
                if (i) {
                    E ? .();
                    return
                }
                s(_, Ys)
            }
        }]
    })
}
const Bs = t => `sidechat_${t}`;

function mi(t) {
    "use forget";
    const e = _t.c(204),
        {
            gptsAndAppsSlashCommands$: n,
            laneModelSlashCommands$: s,
            modelSlashCommands$: c,
            hazelnutSlashCommands: a,
            templatedPrompts: E,
            fileLibraryPathSuggestions: T,
            onSearchQueryChange: y,
            slashCommands: g,
            systemHints: _,
            composerController: i,
            conversation: se,
            layoutMode: ie,
            isCustomAgentHintActive: D,
            isFirstPartyProject: R
        } = t,
        {
            slashCommands: z,
            isLoading: Q
        } = E,
        N = Hs(),
        A = ls(),
        U = ie === "center" ? "bottom-start" : "top-start";
    let V;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (V = [gs({
        mainAxis: 10,
        alignmentAxis: -18
    }), hs({
        padding: 6
    }), $n({
        apply: Ii
    })], e[0] = V) : V = e[0];
    let $;
    e[1] !== U ? ($ = {
        placement: U,
        middleware: V,
        whileElementsMounted: ys
    }, e[1] = U, e[2] = $) : $ = e[2];
    const {
        refs: q,
        floatingStyles: j
    } = Ss($);
    let K;
    e[3] === Symbol.for("react.memo_cache_sentinel") ? (K = {
        placement: "right-start",
        middleware: [gs({
            mainAxis: 4
        }), hs({
            padding: 6
        })],
        whileElementsMounted: ys
    }, e[3] = K) : K = e[3];
    const {
        refs: G,
        floatingStyles: I,
        update: M
    } = Ss(K), w = P.useRef(null);
    let Z;
    e[4] !== G ? (Z = l => {
        G.setReference(l)
    }, e[4] = G, e[5] = Z) : Z = e[5];
    const X = Z;
    let Ce;
    e[6] !== G ? (Ce = l => {
        G.setFloating(l)
    }, e[6] = G, e[7] = Ce) : Ce = e[7];
    const m = Ce;
    let H;
    e[8] === Symbol.for("react.memo_cache_sentinel") ? (H = () => {
        w.current != null && (window.clearTimeout(w.current), w.current = null)
    }, e[8] = H) : H = e[8];
    const Y = H,
        [ce, ne] = P.useState(Ci);
    let me, b;
    e[9] === Symbol.for("react.memo_cache_sentinel") ? (me = () => Y, b = [Y], e[9] = me, e[10] = b) : (me = e[9], b = e[10]), P.useEffect(me, b);
    const [o, k] = P.useState(void 0), L = o ? .range ? `${o.triggerSymbol}:${o.range.from}` : o ? .triggerSymbol;
    let ue;
    e[11] !== i || e[12] !== q.setReference ? (ue = () => {
        const l = Se(i);
        l.dispatch(Dn(l.state.tr, {
            setReferencePosition: q.setReference,
            onHintMatch(u) {
                k(h => zn(h, u) ? h : u)
            }
        }))
    }, e[11] = i, e[12] = q.setReference, e[13] = ue) : ue = e[13];
    let ge;
    e[14] !== i || e[15] !== q ? (ge = [i, q], e[14] = i, e[15] = q, e[16] = ge) : ge = e[16], P.useEffect(ue, ge);
    const B = ye(Os);
    let Le;
    e[17] !== n || e[18] !== o ? (Le = () => o && n ? .(), e[17] = n, e[18] = o, e[19] = Le) : Le = e[19];
    const Ie = ye(Le),
        Oe = Uo(),
        fe = Ho();
    let Xe;
    e[20] !== s ? (Xe = () => s ? .() ? ? [], e[20] = s, e[21] = Xe) : Xe = e[21];
    const Je = ye(Xe);
    let et;
    e[22] !== c ? (et = () => c ? .() ? ? [], e[22] = c, e[23] = et) : et = e[23];
    const tt = ye(et);
    let C, De;
    e[24] !== o ? .triggerSymbol || e[25] !== B ? (C = li(o ? .triggerSymbol), De = B ? Bs(C) : C, e[24] = o ? .triggerSymbol, e[25] = B, e[26] = C, e[27] = De) : (C = e[26], De = e[27]);
    const le = De;
    let ve;
    e[28] !== R ? (ve = Us() && !R, e[28] = R, e[29] = ve) : ve = e[29];
    const st = ve;
    let nt;
    e[30] !== o ? .text ? (nt = o ? .text.trim() ? ? "", e[30] = o ? .text, e[31] = nt) : nt = e[31];
    const be = nt,
        Ht = ye(Gn),
        Ft = ie === "center" && Ht,
        F = be.length > 0,
        ee = Ft && !F;
    let ze;
    e[32] !== L ? (ze = l => {
        ne(u => ({ ...u,
            matchKey: L,
            isHovered: l
        }))
    }, e[32] = L, e[33] = ze) : ze = e[33];
    const Te = ze;
    let ot;
    e[34] !== L ? (ot = l => {
        ne(u => ({ ...u,
            matchKey: L,
            isPinned: l
        }))
    }, e[34] = L, e[35] = ot) : ot = e[35];
    const pe = ot,
        Rt = ce.matchKey === L && ce.isHovered,
        xt = ce.matchKey === L && ce.isPinned;
    let Nt;
    e[36] !== Te ? (Nt = () => {
        Y(), w.current = window.setTimeout(() => {
            Te(!1)
        }, 100)
    }, e[36] = Te, e[37] = Nt) : Nt = e[37];
    const _e = Nt;
    let Ue;
    e[38] !== o ? .triggerSymbol || e[39] !== y || e[40] !== be ? (Ue = () => {
        y(be, o ? .triggerSymbol)
    }, e[38] = o ? .triggerSymbol, e[39] = y, e[40] = be, e[41] = Ue) : Ue = e[41];
    const Ct = o ? .triggerSymbol;
    let qe;
    e[42] !== y || e[43] !== be || e[44] !== Ct ? (qe = [Ct, y, be], e[42] = y, e[43] = be, e[44] = Ct, e[45] = qe) : qe = e[45], P.useEffect(Ue, qe);
    let It;
    e[46] !== L ? (It = () => ({
        matchKey: L,
        isExpanded: !1
    }), e[46] = L, e[47] = It) : It = e[47];
    const [gt, $t] = P.useState(It), Ke = gt.matchKey === L && gt.isExpanded && !ee, Gt = xi;
    let He;
    e: {
        let l;e[48] !== Ie || e[49] !== C ? (l = Ie ? .filter(v => v.showFor.includes(C)), e[48] = Ie, e[49] = C, e[50] = l) : l = e[50];
        const u = l;
        let h;
        if (e[51] !== Je || e[52] !== _) {
            const v = _.filter(_i);
            h = [...Je, ...v], e[51] = Je, e[52] = _, e[53] = h
        } else h = e[53];
        const x = h;
        let S;
        if (e[54] !== A || e[55] !== B || e[56] !== Q || e[57] !== N || e[58] !== le || e[59] !== st || e[60] !== z) {
            if (S = [], st) {
                if (z.length > 0) {
                    let v;
                    e[62] !== z ? (v = [...z], e[62] = z, e[63] = v) : v = e[63], S.push(v);
                    let ke;
                    if (e[64] !== A || e[65] !== B || e[66] !== N || e[67] !== le) {
                        let Bt;
                        e[69] === Symbol.for("react.memo_cache_sentinel") ? (Bt = d.jsx(Un, {
                            className: "icon"
                        }), e[69] = Bt) : Bt = e[69];
                        let Wt;
                        e[70] !== B || e[71] !== N || e[72] !== le ? (Wt = () => {
                            const cs = `/saved-prompts?referer=${le}`;
                            if (B) {
                                const Ws = `${window.location.origin}${cs}`;
                                qn() ? .handleLink(Ws, "_blank")
                            } else N(cs)
                        }, e[70] = B, e[71] = N, e[72] = le, e[73] = Wt) : Wt = e[73], ke = Tt({
                            command: ti,
                            title: A.formatMessage({
                                id: "composer.library.managePrompts",
                                defaultMessage: "Manage prompts"
                            }),
                            icon: Bt,
                            onSelect: Wt
                        }), e[64] = A, e[65] = B, e[66] = N, e[67] = le, e[68] = ke
                    } else ke = e[68];
                    let Ze;
                    e[74] !== ke ? (Ze = [ke], e[74] = ke, e[75] = Ze) : Ze = e[75], S.push(Ze)
                } else if (!Q) {
                    let v;
                    if (e[76] !== A || e[77] !== le) {
                        let Ze;
                        e[79] !== le ? (Ze = () => Gt(le), e[79] = le, e[80] = Ze) : Ze = e[80], v = Tt({
                            command: "create-prompt",
                            title: A.formatMessage({
                                id: "composer.library.createPrompt",
                                defaultMessage: "Create new prompt"
                            }),
                            secondary: A.formatMessage({
                                id: "composer.library.createPromptDescription",
                                defaultMessage: "Prompts are saved sequences of text that you can quickly add to your messages."
                            }),
                            icon: void 0,
                            onSelect: Ze
                        }), e[76] = A, e[77] = le, e[78] = v
                    } else v = e[78];
                    let ke;
                    e[81] !== v ? (ke = [v], e[81] = v, e[82] = ke) : ke = e[82], S.push(ke)
                }
            }
            e[54] = A, e[55] = B, e[56] = Q, e[57] = N, e[58] = le, e[59] = st, e[60] = z, e[61] = S
        } else S = e[61];
        let W;e[83] !== u ? (W = u ? ? [], e[83] = u, e[84] = W) : W = e[84];
        let we;e[85] !== W ? (we = [W], e[85] = W, e[86] = we) : we = e[86];
        const je = we;
        let de;e[87] !== T || e[88] !== C ? (de = C === "at_command" ? [T] : [], e[87] = T, e[88] = C, e[89] = de) : de = e[89];
        const Ve = de;
        let At;e[90] !== a || e[91] !== C || e[92] !== F ? (At = C === "at_command" && !F ? (a ? ? []).filter(Ti) : a ? ? [], e[90] = a, e[91] = C, e[92] = F, e[93] = At) : At = e[93];
        const Dt = At;
        let Kt;e[94] !== C || e[95] !== F || e[96] !== Dt ? (Kt = Dt.length > 0 && (C !== "at_command" || F || Dt.some(bi)) ? [Dt] : [], e[94] = C, e[95] = F, e[96] = Dt, e[97] = Kt) : Kt = e[97];
        const wt = Kt;
        let Yt;e[98] !== Ve || e[99] !== je || e[100] !== S ? (Yt = [...S, ...Ve, ...je], e[98] = Ve, e[99] = je, e[100] = S, e[101] = Yt) : Yt = e[101];
        const bt = Yt;
        if (C === "at_command") {
            let v;
            e[102] !== wt || e[103] !== bt || e[104] !== Oe ? (v = [Oe, ...bt, ...wt], e[102] = wt, e[103] = bt, e[104] = Oe, e[105] = v) : v = e[105], He = v
        } else if (C === "slash_command") {
            if (D) {
                He = bt;
                break e
            }
            let v;
            e[106] !== g || e[107] !== fe || e[108] !== wt || e[109] !== tt || e[110] !== bt || e[111] !== x ? (v = [g, x, tt, ...bt, ...wt, fe], e[106] = g, e[107] = fe, e[108] = wt, e[109] = tt, e[110] = bt, e[111] = x, e[112] = v) : v = e[112], He = v
        } else {
            let v;
            e[113] !== fe ? (v = [fe], e[113] = fe, e[114] = v) : v = e[114], He = v
        }
    }
    const Fe = He;
    let jt;
    e: {
        if (!o) {
            let S;
            e[115] === Symbol.for("react.memo_cache_sentinel") ? (S = {
                displayGroups: oi,
                suggestions: is,
                skillItems: is
            }, e[115] = S) : S = e[115], jt = S;
            break e
        }
        let l, u, h;
        if (e[116] !== ee || e[117] !== Fe || e[118] !== o.text || e[119] !== A || e[120] !== Ke || e[121] !== C || e[122] !== F) {
            const S = o.text ? [qs(es(Fe), o.text, yi, {
                locale: A.locale
            })] : Fe.map(hi);
            l = Vo({
                groups: S,
                intl: A,
                isSkillsExpanded: Ke,
                useFlyout: ee,
                skillsGroupAfterIndex: C === "slash_command" ? 0 : void 0,
                inlineSkills: F
            }), u = l.displayGroups, h = es(l.displayGroups), e[116] = ee, e[117] = Fe, e[118] = o.text, e[119] = A, e[120] = Ke, e[121] = C, e[122] = F, e[123] = l, e[124] = u, e[125] = h
        } else l = e[123],
        u = e[124],
        h = e[125];
        let x;e[126] !== l.skillItems || e[127] !== u || e[128] !== h ? (x = {
            displayGroups: u,
            suggestions: h,
            skillItems: l.skillItems
        }, e[126] = l.skillItems, e[127] = u, e[128] = h, e[129] = x) : x = e[129],
        jt = x
    }
    const {
        displayGroups: it,
        suggestions: O,
        skillItems: Ye
    } = jt, [Pe, Me] = P.useState(null);
    let lt;
    e[130] !== ee || e[131] !== pe || e[132] !== O ? (lt = l => {
        Me(u => {
            if (u == null) return null;
            const h = O.length;
            for (let x = 0; x < h; x++) {
                const S = (u + h + (x + 1) * l) % h,
                    W = O[S];
                if (!W.disabled) return ee && pe(Lt(W) || zt(W)), S
            }
            return null
        })
    }, e[130] = ee, e[131] = pe, e[132] = O, e[133] = lt) : lt = e[133];
    const Ee = Ms(lt),
        ae = O.length === 0,
        at = P.useRef(null),
        rt = P.useRef(null);
    let Be, vt;
    e[134] !== O ? (Be = () => {
        const l = at.current;
        at.current = null;
        const u = O.map(gi).join("|");
        if (l != null) {
            rt.current = u;
            const x = O.findIndex(S => S.id === l && !S.disabled);
            if (x >= 0) {
                Me(x);
                return
            }
        }
        if (rt.current === u) return;
        rt.current = u;
        const h = O.findIndex(pi);
        Me(h >= 0 ? h : null)
    }, vt = [O], e[134] = O, e[135] = Be, e[136] = vt) : (Be = e[135], vt = e[136]), P.useEffect(Be, vt);
    const xe = Pe == null ? null : O[Pe],
        ht = ee && Ye.length > 0 && (Rt || xt);
    let ct = null,
        St = 0;
    for (const l of it) {
        if (zt(l[0])) {
            ct = {
                baseIndex: St,
                group: l
            };
            break
        }
        St = St + l.length
    }
    const Pt = ct ? .group.slice(1) ? ? is;
    let mt, ut;
    e[137] !== ht || e[138] !== M ? (mt = () => {
        ht && M()
    }, ut = [ht, M], e[137] = ht, e[138] = M, e[139] = mt, e[140] = ut) : (mt = e[139], ut = e[140]), P.useEffect(mt, ut);
    let dt;
    e[141] !== i || e[142] !== o ? (dt = () => {
        if (o ? .range) {
            const l = Se(i);
            _s(l, o.range.from, o.range.to)
        }
    }, e[141] = i, e[142] = o, e[143] = dt) : dt = e[143];
    const Re = dt;
    let Ae;
    e[144] !== i || e[145] !== o ? (Ae = l => {
        if (!o ? .range) return;
        const u = Se(i);
        _s(u, o.range.from, o.range.to), Kn(u, l)
    }, e[144] = i, e[145] = o, e[146] = Ae) : Ae = e[146];
    const Ne = Ae;
    let We;
    e[147] !== i || e[148] !== o || e[149] !== Ne ? (We = (l, u) => {
        if (!o ? .range) return;
        const h = Se(i),
            {
                schema: x
            } = h.state,
            S = x.marks.ecosystemMentionMark,
            W = l.replace(/\s+$/, "");
        if (!W || !S) {
            Ne(l);
            return
        }
        const we = u.match(/connector:\w+/) ? .[0] || u,
            je = W.replace(/^(@|\$)/, ""),
            de = S.create({
                id: we,
                kind: l.startsWith("$") ? Yn : Bn,
                keyword: je
            }),
            Ve = [x.text(W, [de]), x.text(" ")],
            At = Wn.fromArray(Ve);
        h.dispatch(h.state.tr.replaceWith(o.range.from, o.range.to, At))
    }, e[147] = i, e[148] = o, e[149] = Ne, e[150] = We) : We = e[150];
    const r = We;
    let p;
    e[151] !== Re || e[152] !== i || e[153] !== ee || e[154] !== o || e[155] !== L || e[156] !== B || e[157] !== Ke || e[158] !== C || e[159] !== r || e[160] !== xe || e[161] !== pe || e[162] !== Ye || e[163] !== O ? (p = l => {
        const {
            hintToSave: u,
            expectPerfectMatch: h
        } = l, x = u === void 0 ? xe : u;
        if (!o || !x) return !1;
        const S = o.text.toLocaleLowerCase(),
            W = x.matchText.some(de => de.toLocaleLowerCase() === S);
        if (h && !W) return !1;
        if (zt(x)) {
            if (ee) {
                const Ve = O.findIndex(fi);
                return Y(), pe(!0), Ve >= 0 && Me(Ve), Ve >= 0
            }
            const de = !Ke;
            return $t({
                matchKey: L,
                isExpanded: de
            }), at.current = de ? Ye[0] ? .id ? ? x.id : x.id, !0
        }
        const we = Qn() && B && C === "slash_command",
            je = x.insertText;
        return Zo({
            isSidebarSlash: we,
            promptReferer: C,
            suggestion: x
        }) && je ? r(je, x.id) : Re(), Qt(Se(i)), x.onSelect(C), !0
    }, e[151] = Re, e[152] = i, e[153] = ee, e[154] = o, e[155] = L, e[156] = B, e[157] = Ke, e[158] = C, e[159] = r, e[160] = xe, e[161] = pe, e[162] = Ye, e[163] = O, e[164] = p) : p = e[164];
    const te = p,
        J = Ms(te);
    let he;
    e[165] !== i || e[166] !== Ee || e[167] !== J || e[168] !== xe || e[169] !== ae ? (he = () => {
        const l = Se(i);
        return ae || Vn(l, u => {
            if (u === "up") Ee.current(-1);
            else if (u === "down") Ee.current(1);
            else if (u === "cancel") Qt(l), Zn(l);
            else {
                if (u === "submit") return (xe == null || !zt(xe)) && Qt(l), J.current({
                    expectPerfectMatch: !1
                });
                if (u === "checkMatch") return J.current({
                    expectPerfectMatch: !0
                })
            }
        }), () => Qt(l)
    }, e[165] = i, e[166] = Ee, e[167] = J, e[168] = xe, e[169] = ae, e[170] = he) : he = e[170];
    let $e;
    e[171] !== Re || e[172] !== i || e[173] !== Ee || e[174] !== J || e[175] !== xe || e[176] !== ae ? ($e = [i, ae, xe, Re, Ee, J], e[171] = Re, e[172] = i, e[173] = Ee, e[174] = J, e[175] = xe, e[176] = ae, e[177] = $e) : $e = e[177], P.useEffect(he, $e);
    let yt, Mt;
    if (e[178] !== se || e[179] !== ae ? (yt = () => {
            ae || js.logEvent("System Hint List Opened", {
                conversation_id: Zt(se)
            })
        }, Mt = [se, ae], e[178] = se, e[179] = ae, e[180] = yt, e[181] = Mt) : (yt = e[180], Mt = e[181]), P.useEffect(yt, Mt), ae) return null;
    let ft;
    e[182] !== q ? (ft = l => q.setFloating(l), e[182] = q, e[183] = ft) : ft = e[183];
    const f = O.length > 6 ? "max-h-[min(var(--radix-popper-available-height,50svh),--spacing(1.5)+5*var(--menu-item-height))]" : "max-h-[var(--radix-popper-available-height,50svh)]";
    let re;
    e[184] !== f ? (re = jn("max-w-[min(var(--radix-popper-available-width,100vw),--spacing(100))] overflow-y-auto [scrollbar-width:none]", f), e[184] = f, e[185] = re) : re = e[185];
    let oe;
    e[186] !== i || e[187] !== it || e[188] !== ee || e[189] !== te || e[190] !== _e || e[191] !== Pe || e[192] !== Te || e[193] !== pe || e[194] !== X ? (oe = it.map((l, u) => {
        let h = 0;
        for (let S = 0; S < u; S++) h = h + it[S].length;
        const x = zt(l[0]);
        return d.jsx(On.Group, {
            children: l.map((S, W) => {
                const we = h + W,
                    je = ee && x && W > 0,
                    de = ee && x && W === 0;
                return je ? null : d.jsx("div", {
                    ref: de ? X : void 0,
                    onPointerLeave: () => {
                        de && _e()
                    },
                    children: d.jsx(Es, {
                        item: S,
                        isHighlighted: we === Pe,
                        onHighlight: () => {
                            if (Me(we), !de) {
                                ee && pe(!1);
                                return
                            }
                            Y(), Te(!0)
                        },
                        onClick: () => {
                            te({
                                hintToSave: S,
                                expectPerfectMatch: !1
                            }), bs(Se(i))
                        }
                    })
                }, S.id)
            })
        }, u)
    }), e[186] = i, e[187] = it, e[188] = ee, e[189] = te, e[190] = _e, e[191] = Pe, e[192] = Te, e[193] = pe, e[194] = X, e[195] = oe) : oe = e[195];
    let Ge;
    e[196] !== j || e[197] !== ft || e[198] !== re || e[199] !== oe ? (Ge = d.jsx(Ts, {
        ref: ft,
        style: j,
        className: re,
        onPointerDown: di,
        children: oe
    }), e[196] = j, e[197] = ft, e[198] = re, e[199] = oe, e[200] = Ge) : Ge = e[200];
    const Qe = ht && ct != null && d.jsx(Ts, {
        ref: m,
        style: I,
        className: "z-1 max-h-[min(var(--radix-popper-available-height,50svh),--spacing(100))] min-w-[min(280px,95vw)] overflow-y-auto [scrollbar-width:none]",
        onPointerDown: ui,
        onPointerEnter: () => {
            Y(), Te(!0)
        },
        onPointerLeave: () => {
            _e()
        },
        children: Pt.map((l, u) => {
            const h = ct.baseIndex + u + 1;
            return d.jsx(Es, {
                item: l,
                isHighlighted: h === Pe,
                onHighlight: () => {
                    Y(), Te(!0), Me(h)
                },
                onClick: () => {
                    te({
                        hintToSave: l,
                        expectPerfectMatch: !1
                    }), bs(Se(i))
                }
            }, l.id)
        })
    });
    let Et;
    return e[201] !== Ge || e[202] !== Qe ? (Et = d.jsxs(d.Fragment, {
        children: [Ge, Qe]
    }), e[201] = Ge, e[202] = Qe, e[203] = Et) : Et = e[203], Et
}

function ui(t) {
    t.preventDefault()
}

function di(t) {
    t.preventDefault()
}

function fi(t) {
    return Lt(t)
}

function pi(t) {
    return !t.disabled
}

function gi(t) {
    return `${t.id}:${t.disabled?1:0}`
}

function hi(t) {
    return t.filter(Si)
}

function Si(t) {
    return !t.noMatchEmpty
}

function yi(t) {
    return t.searchParameters ? ? {
        targets: [t.secondary ? `${t.title} ${t.secondary}` : t.title, ...t.matchText]
    }
}

function bi(t) {
    return !Lt(t)
}

function Ti(t) {
    return !Lt(t)
}

function _i(t) {
    return t.meta ? .isConnector ? !!t.meta.isConnected : !0
}

function xi(t) {
    Xn(Mo, {
        referer: t
    })
}

function Ci() {
    return {
        matchKey: void 0,
        isHovered: !1,
        isPinned: !1
    }
}

function Ii(t) {
    const {
        elements: e,
        availableWidth: n,
        availableHeight: s
    } = t;
    e.floating.style.setProperty("--radix-popper-available-width", `${n}px`), e.floating.style.setProperty("--radix-popper-available-height", `${s}px`)
}

function el(t) {
    "use forget";
    const e = _t.c(136),
        {
            systemHints: n,
            availableSystemHints: s,
            composerController: c,
            conversation: a,
            layoutMode: E,
            composerLayer: T,
            canUseInlineTagging: y,
            isFileUploadEnabled: g,
            fileUploadDisabledReason: _,
            currentModelConfig: i,
            openFileDialog: se,
            connectionInstanceData: ie,
            setActiveSystemHintType: D,
            selectModelId: R,
            removeModel: z,
            clearModelSelection: Q,
            gizmoId: N,
            hasGizmoFeatureRateLimit: A,
            setSelectedGizmoTag: U,
            isFirstPartyProject: V
        } = t,
        $ = ls(),
        q = Hs(),
        j = an() ? .planType,
        K = ye(Oi),
        {
            connectedTypes: G
        } = rn(),
        I = cn();
    let M;
    e[0] !== I ? (M = I != null && mn(I), e[0] = I, e[1] = M) : M = e[1];
    const w = M,
        Z = ye(ji),
        X = Rs(),
        Ce = un(),
        m = dn(),
        H = fn.useStore(),
        Y = m != null,
        {
            isSingleLine: ce,
            showModelSlashCommands: ne
        } = T,
        me = Ns(),
        b = $s(),
        o = pn(),
        k = Oo(a);
    ie ? .connection_statuses;
    let L;
    if (e[2] !== G || e[3] !== ie ? .connection_statuses || e[4] !== a || e[5] !== i ? .title || e[6] !== _ || e[7] !== $ || e[8] !== Z || e[9] !== g || e[10] !== w || e[11] !== ce || e[12] !== q || e[13] !== se || e[14] !== D || e[15] !== n) {
        const r = [];
        ce && r.push({
            command: "upload",
            aliases: ["file", "attach", "photo"],
            title: Ao($, !g, _, i ? .title),
            icon: d.jsx(ao, {
                "aria-label": "",
                className: "icon"
            }),
            onSelect: se,
            disabled: !g
        });
        const p = ie ? .connection_statuses.filter(Gi).map($i) ? ? [],
            te = n ? .some(Ni);
        w && (G.size > 0 || p.length > 0) && te && r.push({
            command: "all-connectors",
            title: $.formatMessage({
                id: "6YT2cp",
                defaultMessage: "Use all connectors"
            }),
            icon: d.jsx(ro, {
                className: "icon"
            }),
            noMatchEmpty: !0,
            onSelect: () => {
                D(pt.Slurm, {
                    analyticsMetadata: {
                        clientThreadId: Zt(a)
                    }
                }), Xt(a.id, J => {
                    const he = J.selectedSources ? .get(pt.Slurm) ? ? new Set;
                    J.selectedSources == null && (J.selectedSources = new Map), J.selectedSources.set(pt.Slurm, new Set([...he, ...G, ...p]))
                })
            }
        }), Z && r.push({
            command: "add-mcp",
            aliases: ["mcp"],
            title: "Add MCP",
            icon: d.jsx(Eo, {
                className: "icon"
            }),
            noMatchEmpty: !0,
            onSelect: () => {
                q(gn(hn.Connectors))
            }
        }), L = r.map(Tt), e[2] = G, e[3] = ie ? .connection_statuses, e[4] = a, e[5] = i ? .title, e[6] = _, e[7] = $, e[8] = Z, e[9] = g, e[10] = w, e[11] = ce, e[12] = q, e[13] = se, e[14] = D, e[15] = n, e[16] = L
    } else L = e[16];
    const ue = L;
    let ge;
    e[17] !== a || e[18] !== i ? .id || e[19] !== z || e[20] !== R || e[21] !== ne ? (ge = () => ss(() => {
        if (!ne) return [];
        const r = ds(a);
        return ri({
            modelsData: r,
            currentModelId: i ? .id,
            selectModelId: R,
            removeModel: z
        }).map(Tt)
    }), e[17] = a, e[18] = i ? .id, e[19] = z, e[20] = R, e[21] = ne, e[22] = ge) : ge = e[22], i ? .id;
    let B;
    e[23] !== ge ? (B = ge(), e[23] = ge, e[24] = B) : B = e[24];
    const Le = B;
    i ? .id;
    let Ie;
    e[25] !== a || e[26] !== i ? .id || e[27] !== $ || e[28] !== z || e[29] !== R || e[30] !== ne ? (Ie = ss(() => {
        if (!ne) return [];
        const r = ds(a),
            p = Sn(a).conversationVersion$();
        return ci({
            modelsData: r,
            currentModelId: i ? .id,
            currentVersionId: p,
            selectModelId: R,
            intl: $,
            showModelSlashCommands: ne,
            removeModel: z
        })
    }), e[25] = a, e[26] = i ? .id, e[27] = $, e[28] = z, e[29] = R, e[30] = ne, e[31] = Ie) : Ie = e[31];
    const Oe = Ie;
    let fe;
    if (e[32] !== s || e[33] !== K) {
        e: {
            const r = yn(s, K, j);
            if (!r) {
                fe = r;
                break e
            }
            fe = Cs(r.filter(Ri))
        }
        e[32] = s,
        e[33] = K,
        e[34] = fe
    }
    else fe = e[34];
    const Xe = fe;
    let Je;
    e[35] !== Q || e[36] !== c ? (Je = {
        composerController: c,
        clearModelSelection: Q
    }, e[35] = Q, e[36] = c, e[37] = Je) : Je = e[37];
    const et = co(a, Je);
    let tt;
    if (e[38] !== Xe || e[39] !== y || e[40] !== et) {
        let r;
        e[42] !== y ? (r = p => rs(p.systemHint) ? !1 : !y || !p.isConnector, e[42] = y, e[43] = r) : r = e[43], tt = (Xe ? ? []).filter(r).map(et), e[38] = Xe, e[39] = y, e[40] = et, e[41] = tt
    } else tt = e[41];
    const C = tt;
    let De;
    e[44] !== s || e[45] !== Y ? (De = Y ? [] : (s ? ? []).filter(Fi), e[44] = s, e[45] = Y, e[46] = De) : De = e[46];
    const le = De;
    let ve;
    e[47] !== s ? (ve = s ? ? [], e[47] = s, e[48] = ve) : ve = e[48];
    let st;
    e[49] !== ve ? (st = ve.filter(Hi), e[49] = ve, e[50] = st) : st = e[50];
    const nt = st;
    let be;
    e[51] !== y || e[52] !== a.id ? (be = {
        canUseInlineTagging: y,
        conversationId: a.id
    }, e[51] = y, e[52] = a.id, e[53] = be) : be = e[53];
    const {
        fileLibraryPathSuggestions: Ht,
        onSearchQueryChange: Ft
    } = Jo(be), [F, ee] = P.useState("");
    let ze;
    e[54] !== Ft ? (ze = (r, p) => {
        ee(r), Ft(r, p)
    }, e[54] = Ft, e[55] = ze) : ze = e[55];
    const Te = ze,
        ot = ye(Li);
    let pe;
    e[56] !== Ce || e[57] !== m || e[58] !== X || e[59] !== me || e[60] !== o || e[61] !== ot || e[62] !== nt || e[63] !== le || e[64] !== y || e[65] !== Q || e[66] !== c || e[67] !== a || e[68] !== N || e[69] !== A || e[70] !== $ || e[71] !== V || e[72] !== H || e[73] !== b || e[74] !== D || e[75] !== U ? (pe = ss(() => {
        if (!y) return [];
        const {
            data: r
        } = bn(), {
            data: p
        } = Tn(), {
            data: te
        } = _n(), J = fs([...r ? ? [], ...p ? .list.items ? .map(ki) ? ? [], ...te ? .items ? .map(wi) ? ? []], Ai), he = N ? J.filter(f => f.gizmo.id !== N) : J, yt = Cs(le).map(f => {
            const re = Is(f, $),
                oe = mo(f.systemHint, X, Ce),
                Ge = f.systemHint === xn || f.systemHint === uo;
            return {
                command: re,
                aliases: re === f.name ? void 0 : [f.name],
                title: re,
                type: ns.App,
                isConnected: f.isConnected,
                systemHintType: f.systemHint,
                icon: d.jsx(vs, {
                    hint: f,
                    isNextToLabel: !0
                }),
                trailing: oe ? d.jsx(kt, {
                    className: "icon-sm"
                }) : void 0,
                trailingColor: oe ? "primary" : void 0,
                color: oe ? "selected" : void 0,
                insertText: !oe && !Ge ? `@${f.name}` : void 0,
                onSelect: () => {
                    if (oe) {
                        b(f.systemHint);
                        return
                    }
                    const Qe = Cn(f.systemHint);
                    ot.some(Et => Qe === Et) && D(pt.Agent), me(f.systemHint), In(f.systemHint, Pn.AtMention, vn({
                        clientThreadId: Zt(a)
                    }))
                }
            }
        }), Mt = nt.map(f => {
            const re = Is(f, $),
                oe = m === f.systemHint;
            return { ...Tt({
                    command: re,
                    title: re,
                    aliases: re === f.name ? [...f.aliases] : [f.name, ...f.aliases],
                    regexMatches: f.regexMatches ? [...f.regexMatches] : void 0,
                    type: ns.App,
                    isConnected: !1,
                    icon: d.jsx(vs, {
                        hint: f,
                        isNextToLabel: !0
                    }),
                    trailing: oe ? d.jsx(kt, {
                        className: "icon-sm"
                    }) : void 0,
                    trailingColor: oe ? "primary" : void 0,
                    color: oe ? "selected" : void 0,
                    onSelect: () => {
                        const Ge = {
                            clientThreadId: Zt(a)
                        };
                        oe || Hn(() => {
                            _o.set(a, null), Q ? .(), Xt(a.id, Qe => {
                                Fn(Se(c)), Qe.selectedHazelnuts = []
                            }), xo({
                                systemHintType: f.systemHint,
                                analyticsMetadata: Ge,
                                clearAllSystemHints: Qe => {
                                    H.clearAllSystemHints(Qe)
                                },
                                addCustomAgentSystemHintType: o
                            })
                        })
                    }
                }),
                id: f.systemHint
            }
        }), ft = V ? [] : he.map(f => ({
            command: f.gizmo.display.name,
            title: f.gizmo.display.name,
            type: ns.Gizmo,
            disabled: A,
            icon: d.jsx(Ds, {
                simple: !0,
                isFirstParty: f.gizmo.tags ? .includes(Mn.FirstParty) === !0,
                src: f.gizmo.display.profile_picture_url,
                className: "icon",
                alt: ""
            }),
            onSelect: () => {
                js.logEventWithStatsig("Composer GPT Selected", "chatgpt_web_composer_gpt_selected", {
                    gizmo: f.gizmo.id
                }), U(f)
            }
        })).filter(f => !yt.some(re => re.command === f.command));
        return fs([...yt.map(Tt), ...Mt, ...ft.map(Tt)], Ei)
    }), e[56] = Ce, e[57] = m, e[58] = X, e[59] = me, e[60] = o, e[61] = ot, e[62] = nt, e[63] = le, e[64] = y, e[65] = Q, e[66] = c, e[67] = a, e[68] = N, e[69] = A, e[70] = $, e[71] = V, e[72] = H, e[73] = b, e[74] = D, e[75] = U, e[76] = pe) : pe = e[76];
    const Rt = pe;
    let xt;
    e[77] === Symbol.for("react.memo_cache_sentinel") ? (xt = Us(), e[77] = xt) : xt = e[77];
    const _e = xt && !V;
    let Ue;
    e[78] === Symbol.for("react.memo_cache_sentinel") ? (Ue = fo(), e[78] = Ue) : Ue = e[78];
    const Ct = Ue;
    let qe;
    e[79] === Symbol.for("react.memo_cache_sentinel") ? (qe = po(), e[79] = qe) : qe = e[79];
    const It = qe;
    let gt;
    e[80] === Symbol.for("react.memo_cache_sentinel") ? (gt = Ps() ? ? 0, e[80] = gt) : gt = e[80];
    const $t = P.useRef(gt),
        Ke = P.useRef(0),
        Gt = ye(Os);
    let He;
    e[81] !== _e ? (He = {
        enabled: _e
    }, e[81] = _e, e[82] = He) : He = e[82];
    const {
        data: Fe,
        isLoading: jt,
        hasNextPage: it,
        refetch: O
    } = go(He), Ye = _e && Fe != null && !it;
    let Pe, Me;
    e[83] !== O || e[84] !== F.length || e[85] !== Ye ? (Pe = () => {
        if (!Ct || F.length === 0 || !Ye) return;
        const r = Ps();
        if (r == null || r <= $t.current) return;
        const p = Date.now();
        p - Ke.current < ni || (Ke.current = p, O().then(te => {
            te.status === "success" && ($t.current = Math.max($t.current, r))
        }).catch(Mi))
    }, Me = [O, F.length, Ct, Ye], e[83] = O, e[84] = F.length, e[85] = Ye, e[86] = Pe, e[87] = Me) : (Pe = e[86], Me = e[87]), P.useEffect(Pe, Me);
    const lt = ho();
    let Ot;
    e[88] !== c || e[89] !== a || e[90] !== Gt || e[91] !== D || e[92] !== lt ? (Ot = (r, p) => {
        const te = Gt ? Bs(p) : p;
        Co({
            prompt: r,
            conversation: a,
            composerController: c,
            setActiveSystemHintType: D,
            referer: te,
            trackPromptInvocation: lt
        })
    }, e[88] = c, e[89] = a, e[90] = Gt, e[91] = D, e[92] = lt, e[93] = Ot) : Ot = e[93];
    const Ee = Ot;
    let qt;
    e: {
        if (!Fe || !_e) {
            let p;
            e[94] === Symbol.for("react.memo_cache_sentinel") ? (p = [], e[94] = p) : p = e[94], qt = p;
            break e
        }
        let r;e[95] !== Fe.pages ? (r = es(Fe.pages.map(Pi)), e[95] = Fe.pages, e[96] = r) : r = e[96],
        qt = r
    }
    const ae = qt,
        at = _e && it && F.length > 0;
    let rt;
    e[97] !== F || e[98] !== at ? (rt = {
        search: F,
        enabled: at
    }, e[97] = F, e[98] = at, e[99] = rt) : rt = e[99];
    const {
        data: Be,
        isLoading: vt,
        isFetching: xe
    } = So(rt), ht = at && (vt || xe);
    let ct;
    e: {
        if (!Be) {
            let p;
            e[100] === Symbol.for("react.memo_cache_sentinel") ? (p = [], e[100] = p) : p = e[100], ct = p;
            break e
        }
        let r;e[101] !== Be.pages ? (r = es(Be.pages.map(vi)), e[101] = Be.pages, e[102] = r) : r = e[102],
        ct = r
    }
    const St = ct;
    let Pt;
    e[103] !== Ee ? (Pt = r => ({
        id: `prompt:${r.name}`,
        title: r.name,
        matchText: [r.name],
        showFor: ["at_command"],
        searchParameters: {
            targets: [r.name]
        },
        icon: It ? Io(r.symbol, {
            className: "icon-sm"
        }) : d.jsx(vo, {
            className: "icon-sm"
        }),
        onSelect: p => {
            Ee(r, p ? ? "slash_command")
        }
    }), e[103] = Ee, e[104] = Pt) : Pt = e[104];
    const mt = Pt;
    let ut;
    e: {
        if (!_e) {
            let $e;
            e[105] === Symbol.for("react.memo_cache_sentinel") ? ($e = [], e[105] = $e) : $e = e[105], ut = $e;
            break e
        }
        let r;e[106] !== ae || e[107] !== St || e[108] !== F.length ? (r = F.length > 0 ? ii([...St, ...ae]) : ae, e[106] = ae, e[107] = St, e[108] = F.length, e[109] = r) : r = e[109];
        const p = r;
        let te;e[110] !== p || e[111] !== F.length ? (te = F.length > 0 ? p : p.slice(0, si), e[110] = p, e[111] = F.length, e[112] = te) : te = e[112];
        const J = te;
        let he;e[113] !== J || e[114] !== mt ? (he = J.map(mt), e[113] = J, e[114] = mt, e[115] = he) : he = e[115],
        ut = he
    }
    const dt = ut,
        Re = jt || ht;
    let Ae;
    e[116] !== Re || e[117] !== dt ? (Ae = {
        slashCommands: dt,
        isLoading: Re
    }, e[116] = Re, e[117] = dt, e[118] = Ae) : Ae = e[118];
    let Ne;
    e[119] !== C ? (Ne = C ? ? [], e[119] = C, e[120] = Ne) : Ne = e[120];
    let We;
    return e[121] !== c || e[122] !== a || e[123] !== Ht || e[124] !== Rt || e[125] !== Te || e[126] !== k || e[127] !== Y || e[128] !== V || e[129] !== Oe || e[130] !== E || e[131] !== Le || e[132] !== ue || e[133] !== Ae || e[134] !== Ne ? (We = d.jsx(mi, {
        gptsAndAppsSlashCommands$: Rt,
        laneModelSlashCommands$: Oe,
        modelSlashCommands$: Le,
        hazelnutSlashCommands: k,
        onSearchQueryChange: Te,
        templatedPrompts: Ae,
        fileLibraryPathSuggestions: Ht,
        slashCommands: ue,
        systemHints: Ne,
        composerController: c,
        conversation: a,
        layoutMode: E,
        isCustomAgentHintActive: Y,
        isFirstPartyProject: V
    }), e[121] = c, e[122] = a, e[123] = Ht, e[124] = Rt, e[125] = Te, e[126] = k, e[127] = Y, e[128] = V, e[129] = Oe, e[130] = E, e[131] = Le, e[132] = ue, e[133] = Ae, e[134] = Ne, e[135] = We) : We = e[135], We
}

function vi(t) {
    return t.prompts ? ? []
}

function Pi(t) {
    return t.prompts ? ? []
}

function Mi() {}

function Ei(t) {
    return t.id
}

function Ai(t) {
    return t.gizmo.id
}

function wi(t) {
    return t.gizmo
}

function ki(t) {
    return t.resource
}

function Li() {
    return To()
}

function Hi(t) {
    return Ln(t.systemHint)
}

function Fi(t) {
    return t.isConnector
}

function Ri(t) {
    return !(t.isConnector && t.hideFromInitialSelection && !t.canConnect)
}

function Ni(t) {
    return t.systemHint === pt.Slurm
}

function $i(t) {
    return t.user_connection_details.connection_type
}

function Gi(t) {
    return t.user_connection_details.activation_status === "activated" && ["google_drive_oauth", "google_drive_dwd"].includes(t.user_connection_details.knowledge_connector_type)
}

function ji() {
    return An()
}

function Oi() {
    return En()
}
export {
    el as SystemHintSuggestor
};
//# sourceMappingURL=4d59f34c-f1cfd9xew7qks3jb.js.map