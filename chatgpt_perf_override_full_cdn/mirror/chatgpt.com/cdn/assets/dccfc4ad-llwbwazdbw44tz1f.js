import {
    j as a,
    c as ne,
    r as T,
    u as Fe,
    L as $e
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    mW as Oe,
    mN as ze,
    d2 as ue,
    kV as Ge,
    eX as he,
    cq as Se,
    sm as Be,
    mM as ge,
    sn as Ue,
    so as qe,
    sp as Ve,
    sq as Qe,
    mH as be,
    mO as fe,
    i_ as Ke,
    cf as Ye,
    mG as Je,
    sr as Te,
    ss as Xe,
    st as ve,
    b4 as Ze,
    su as et,
    sv as Re,
    sw as Me
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    af as G,
    aV as tt,
    e as ee,
    f as nt,
    AI as st,
    be as at,
    qj as Pe,
    fW as it,
    q as me,
    gc as lt,
    hY as Le,
    bb as ot,
    tP as rt,
    Aw as ct,
    l_ as dt,
    bY as ye,
    dS as ut,
    qU as ft,
    Cf as mt,
    hP as oe,
    m3 as re,
    cO as je,
    nO as pt,
    Cg as xt,
    dP as ht,
    cc as gt,
    b5 as le,
    b2 as bt,
    fk as vt,
    cq as yt,
    mR as jt,
    fu as kt,
    Ch as _t,
    vQ as Nt
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    u as wt
} from "./1bc04b52-ito2hkknjg6g2mv8.js";
import {
    u as It,
    a as Ct
} from "./25e69e8b-nak5n78ns73kii17.js";
import {
    g as Ft,
    c as St
} from "./5bcaa99f-j752ivjoa76w7q31.js";
import {
    s as Tt
} from "./e3127a4c-3902zdnsjvimocyi.js";

function ke(t, e, n, s, i = void 0) {
    const l = Oe(s),
        {
            Icon: d,
            appName: r
        } = ze({
            cloud_doc_url: t.cloud_doc_url,
            connectorId: t.connector_id,
            availableConnectors: i,
            iconClassName: e
        }),
        c = t.name,
        o = r ? ? n.formatMessage({
            id: "bqY3sN",
            defaultMessage: "File"
        });
    let p = t.cloud_doc_url ? t.cloud_doc_url : "";
    l && t.medical_file_reference ? .journal_homepage_url && (p = t.medical_file_reference ? .journal_homepage_url);
    let f = (d || (t.cloud_doc_url ? a.jsx(ue, {
        alt: o,
        className: e
    }) : void 0)) ? ? a.jsx(Ge, {
        alt: o,
        className: e
    });
    return s && p.length > 0 && (f = a.jsx(he, {
        url: p,
        className: e,
        fallback: a.jsx(ue, {
            alt: o,
            className: e
        })
    })), {
        fileName: c,
        fileTypeDisplayName: o,
        fileTypeIcon: f,
        url: t.cloud_doc_url,
        snippet: t.description ? ? t.snippet,
        fileLastModifiedTime: t.last_modified_time
    }
}

function Ae(t, e) {
    const n = typeof t.snippet == "string" || typeof t.snippet == "number" ? String(t.snippet) : t.snippet == null ? "" : `snippet:${t.fileItem.id}:${t.fileItem.start_idx}:${t.fileItem.end_idx}`;
    return [t.fileItem.id, t.fileItem.start_idx, t.fileItem.end_idx, t.fileItem.page_range_start, t.fileItem.page_range_end, t.internalHref ? ? t.url ? ? "", n, e ? ? ""].join("::")
}

function Rt(t) {
    if (t.fileItem.id) return [t.fileItem.source, t.fileItem.id].join("::");
    const e = t.internalHref ? ? t.url ? ? t.fileItem.cloud_doc_url ? ? t.fileItem.extra ? .cloud_doc_url ? ? "";
    return [t.fileItem.source, e, t.fileName].join("::")
}

function _e(t) {
    let e = 0;
    return (t.internalHref ? ? t.url) && (e += 1), (typeof t.fileItem.page_range_start == "number" || typeof t.fileItem.page_range_end == "number") && (e += 2), t.snippet != null && t.snippet !== "" && (e += 4, typeof t.snippet == "string" && (e += Math.min(t.snippet.length, 200))), e
}

function Mt(t) {
    const e = new Map;
    for (const n of t) {
        const s = Rt(n),
            i = e.get(s);
        if (!i) {
            e.set(s, n);
            continue
        }
        _e(n) > _e(i) && e.set(s, n)
    }
    return Array.from(e.values())
}
const Ne = 32;

function Ee(t) {
    const e = t.split(".");
    let n = t;
    return e.length > 1 && e.slice(0, -1).some(s => s.length > 0) && (n = e.slice(0, -1).join(".")), n.length > Ne && (n = n.slice(0, Ne - 1) + "…"), n
}

function we(t, e) {
    const n = t.page_range_start,
        s = t.page_range_end;
    if (typeof n != "number" && typeof s != "number") return null;
    const i = typeof n == "number" ? n : s,
        l = typeof s == "number" ? s : n;
    if (typeof i != "number" || typeof l != "number") return null;
    const d = Math.min(i, l),
        r = Math.max(i, l);
    return d === r ? e.formatMessage({
        id: "YjvkGM",
        defaultMessage: "Page {pageNumber}"
    }, {
        pageNumber: d
    }) : e.formatMessage({
        id: "s//jLV",
        defaultMessage: "Pages {startPage}–{endPage}"
    }, {
        startPage: d,
        endPage: r
    })
}

function Ie({
    activeProjectId: t,
    fileItem: e,
    intl: n,
    meta: s,
    projectSaveMetadataByFileId: i
}) {
    const l = mt({
        activeProjectId: t,
        fallbackLabel: s.fileName,
        fallbackIcon: s.fileTypeIcon,
        fallbackUrl: s.url,
        intl: n,
        projectSaveIcon: a.jsx(Je, {
            className: "text-token-text-primary! h-[16px] w-[16px] flex-none object-contain"
        }),
        projectSaveMetadata: i.get(e.id) ? ? null
    });
    return {
        fileItem: e,
        fileName: l.displayLabel,
        fileTypeDisplayName: s.fileTypeDisplayName,
        fileTypeIcon: l.icon,
        isProjectSave: l.isProjectSave,
        internalHref: l.internalHref,
        url: l.url,
        snippet: s.snippet
    }
}

function Pt(t) {
    "use forget";
    const e = ne.c(61),
        {
            additionalFileRefs: n,
            fileRef: s,
            index: i,
            trackContentReferenceEvent: l
        } = t,
        d = ee(nt),
        r = Le(),
        c = st(),
        o = T.useContext(Se),
        p = o ? .clientThreadId ? ? o ? .analyticsMetadata.clientThreadId,
        f = p ? ? Pe;
    let k;
    e[0] !== f ? (k = at(f), e[0] = f, e[1] = k) : k = e[1];
    const x = k,
        _ = it(p),
        E = o ? .analyticsMetadata.threadId ? ? _ ? ? p;
    let v;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (v = me("1878635359") ? ? !1, e[2] = v) : v = e[2];
    const w = v;
    let I;
    e[3] === Symbol.for("react.memo_cache_sentinel") ? (I = Be(), e[3] = I) : I = e[3];
    const g = I;
    let B;
    e[4] !== s ? (B = Ft(s), e[4] = s, e[5] = B) : B = e[5];
    const D = B;
    let W;
    e[6] !== s ? (W = g && St(s), e[6] = s, e[7] = W) : W = e[7];
    const R = W;
    let M;
    e[8] !== s.source || e[9] !== i ? (M = {
        source: s.source,
        index: i
    }, e[8] = s.source, e[9] = i, e[10] = M) : M = e[10];
    const h = M;
    let y;
    e[11] !== h || e[12] !== l ? (y = () => {
        l("File Citation Shown", "file_citation_shown", "file", h)
    }, e[11] = h, e[12] = l, e[13] = y) : y = e[13];
    const b = T.useEffectEvent(y);
    let H;
    e[14] !== b ? (H = () => {
        b()
    }, e[14] = b, e[15] = H) : H = e[15];
    let C;
    e[16] !== s.id || e[17] !== s.source || e[18] !== i ? (C = [s.id, s.source, i], e[16] = s.id, e[17] = s.source, e[18] = i, e[19] = C) : C = e[19], T.useEffect(H, C);
    let F;
    e[20] !== h || e[21] !== l ? (F = K => {
        K ? l("File Citation Hovered", "file_citation_hovered", "file", h) : l("File Citation Unhovered", "file_citation_unhovered", "file", h)
    }, e[20] = h, e[21] = l, e[22] = F) : F = e[22];
    const $ = F;
    let S;
    e[23] !== h || e[24] !== l ? (S = () => {
        l("File Citation Clicked", "file_citation_clicked", "file", h)
    }, e[23] = h, e[24] = l, e[25] = S) : S = e[25];
    const u = S;
    let O;
    e[26] !== h || e[27] !== l ? (O = () => {
        l("File Citation Followup Clicked", "file_citation_followup_clicked", "file", h)
    }, e[26] = h, e[27] = l, e[28] = O) : O = e[28];
    const P = O;
    let L;
    e[29] !== x ? (L = () => ot(x), e[29] = x, e[30] = L) : L = e[30];
    const N = ee(L),
        m = typeof o ? .message ? .metadata ? .gizmo_id == "string" ? o.message.metadata.gizmo_id : void 0,
        j = m ? ? N;
    let q;
    e[31] !== x ? (q = () => rt(x), e[31] = x, e[32] = q) : q = e[32];
    const A = ee(q);
    let z;
    e[33] !== A || e[34] !== r ? (z = () => ct(A ? dt(r, A).gizmo$() ? .files : null), e[33] = A, e[34] = r, e[35] = z) : z = e[35];
    const V = ee(z),
        Q = V.has(s.id) || (n ? .some(K => V.has(K.id)) ? ? !1);
    let U;
    e[36] !== R || e[37] !== D || e[38] !== E || e[39] !== c || e[40] !== j || e[41] !== h || e[42] !== s.id || e[43] !== s.name || e[44] !== l ? (U = () => {
        l("File Citation Clicked", "file_citation_clicked", "file", h);
        const K = qe(),
            se = E;
        R ? ye(Ve, {
            gizmoId: j,
            fileId: s.id,
            fileName: s.name,
            clientThreadId: se,
            ...D,
            presentationResetKey: K
        }) : w ? ye(Qe, {
            gizmoId: j,
            fileId: s.id,
            fileName: s.name,
            clientThreadId: se
        }) : c(s.id, s.name, {
            conversationId: E,
            gizmoId: j
        })
    }, e[36] = R, e[37] = D, e[38] = E, e[39] = c, e[40] = j, e[41] = h, e[42] = s.id, e[43] = s.name, e[44] = l, e[45] = U) : U = e[45];
    const Y = U;
    if (d && ge(s.id) || N && lt(N)) return null;
    if (N && m && N !== m && !s.cloud_doc_url && !Q) {
        let K;
        e[46] === Symbol.for("react.memo_cache_sentinel") ? (K = G(Tt, "ms-1 select-none"), e[46] = K) : K = e[46];
        const se = s.name;
        let te;
        e[47] !== s.name ? (te = Ee(s.name), e[47] = s.name, e[48] = te) : te = e[48];
        let ae;
        return e[49] !== s.name || e[50] !== te ? (ae = a.jsx("span", {
            className: K,
            title: se,
            children: te
        }), e[49] = s.name, e[50] = te, e[51] = ae) : ae = e[51], ae
    }
    let J;
    return e[52] !== A || e[53] !== n || e[54] !== s || e[55] !== Y || e[56] !== V || e[57] !== u || e[58] !== P || e[59] !== $ ? (J = a.jsx(Lt, {
        activeProjectId: A,
        additionalFileRefs: n,
        fileItem: s,
        onClickFileReference: Y,
        projectSaveMetadataByFileId: V,
        trackCloudLinkClick: u,
        trackFileCitationFollowup: P,
        trackTooltipOpenChange: $
    }), e[52] = A, e[53] = n, e[54] = s, e[55] = Y, e[56] = V, e[57] = u, e[58] = P, e[59] = $, e[60] = J) : J = e[60], J
}
const pe = tt.p `not-prose mt-0! mb-0! flex-auto truncate`;

function De({
    className: t,
    isQuorumEnabled: e,
    disableMarginStart: n
} = {}) {
    let s = G(n ? null : "ms-1", "relative flex h-[25px] select-none items-center justify-center gap-1 rounded-xl px-2 text-[10px] leading-[13px] corner-superellipse/1.1", "text-token-text-secondary! hover:text-token-text-primary! hover:bg-token-bg-secondary dark:bg-token-main-surface-secondary dark:hover:bg-token-bg-secondary", t);
    return e || (s += " bg-[#f4f4f4] "), s
}

function Lt(t) {
    "use forget";
    const e = ne.c(54),
        {
            activeProjectId: n,
            additionalFileRefs: s,
            className: i,
            fileItem: l,
            onClickFileReference: d,
            projectSaveMetadataByFileId: r,
            trackCloudLinkClick: c,
            trackFileCitationFollowup: o,
            trackTooltipOpenChange: p
        } = t,
        f = Fe(),
        k = Le(),
        x = be(),
        _ = n;
    let E;
    e[0] !== k ? (E = () => ft(k), e[0] = k, e[1] = E) : E = e[1];
    const v = ee(E);
    let w;
    e[2] !== v || e[3] !== l || e[4] !== f || e[5] !== x ? (w = ke(l, "h-[16px] w-[16px] object-contain text-token-text-primary! flex-none", f, x, v), e[2] = v, e[3] = l, e[4] = f, e[5] = x, e[6] = w) : w = e[6];
    const {
        fileName: I,
        fileTypeDisplayName: g,
        fileTypeIcon: B,
        url: D,
        snippet: W
    } = w;
    let R;
    e[7] !== l || e[8] !== I || e[9] !== g || e[10] !== B || e[11] !== f || e[12] !== r || e[13] !== _ || e[14] !== W || e[15] !== D ? (R = Ie({
        activeProjectId: _,
        fileItem: l,
        intl: f,
        meta: {
            fileName: I,
            fileTypeDisplayName: g,
            fileTypeIcon: B,
            url: D,
            snippet: W
        },
        projectSaveMetadataByFileId: r
    }), e[7] = l, e[8] = I, e[9] = g, e[10] = B, e[11] = f, e[12] = r, e[13] = _, e[14] = W, e[15] = D, e[16] = R) : R = e[16];
    const M = R;
    let h;
    if (e[17] !== s || e[18] !== v || e[19] !== f || e[20] !== x || e[21] !== M || e[22] !== r || e[23] !== _) {
        const U = s ? .map(Y => {
            const J = ke(Y, "h-[16px] w-[16px] object-contain", f, x, v);
            return Ie({
                activeProjectId: _,
                fileItem: Y,
                intl: f,
                meta: J,
                projectSaveMetadataByFileId: r
            })
        }) ? ? [];
        h = [M, ...U], e[17] = s, e[18] = v, e[19] = f, e[20] = x, e[21] = M, e[22] = r, e[23] = _, e[24] = h
    } else h = e[24];
    const y = h;
    let b;
    if (e[25] !== y) {
        const U = new Map;
        for (const Y of y) {
            const J = Ae(Y);
            U.set(J, Y)
        }
        b = Array.from(U.values()), e[25] = y, e[26] = b
    } else b = e[26];
    const H = b;
    let C;
    e[27] !== H ? (C = H.filter(At), e[27] = H, e[28] = C) : C = e[28];
    const F = C;
    let $;
    e[29] !== F ? ($ = Mt(F), e[29] = F, e[30] = $) : $ = e[30];
    const S = $;
    if (S.length === 0) return null;
    const u = S[0];
    let O;
    e[31] !== i || e[32] !== x ? (O = De({
        className: i,
        isQuorumEnabled: x
    }), e[31] = i, e[32] = x, e[33] = O) : O = e[33];
    const P = O,
        L = u.fileItem;
    let N;
    e[34] !== L || e[35] !== f ? (N = fe(f, L), e[34] = L, e[35] = f, e[36] = N) : N = e[36];
    const m = N,
        j = x && m.sourceName !== void 0 ? m.sourceName : u.fileName,
        q = Math.max(S.length - 1, 0);
    let A;
    e[37] !== j ? (A = Ee(j), e[37] = j, e[38] = A) : A = e[38];
    const z = `${A}${q>0?` +${q}`:""}`;
    let V;
    e[39] !== z || e[40] !== d || e[41] !== u.fileItem || e[42] !== u.fileTypeIcon || e[43] !== u.internalHref || e[44] !== u.url || e[45] !== c || e[46] !== P ? (V = a.jsx("span", {
        className: "relative inline-flex items-center select-none",
        children: u.internalHref ? ? u.url ? a.jsxs(xe, {
            href: u.internalHref ? ? u.url,
            isInternalHref: !!u.internalHref,
            className: P,
            onClick: c,
            children: [u.fileTypeIcon, a.jsx(pe, {
                children: z
            })]
        }) : ge(u.fileItem.id) ? a.jsxs("button", {
            type: "button",
            onClick: d,
            className: P,
            children: [u.fileTypeIcon, a.jsx(pe, {
                children: z
            })]
        }) : a.jsx("span", {
            className: P,
            children: a.jsx(ue, {})
        })
    }), e[39] = z, e[40] = d, e[41] = u.fileItem, e[42] = u.fileTypeIcon, e[43] = u.internalHref, e[44] = u.url, e[45] = c, e[46] = P, e[47] = V) : V = e[47];
    const Z = V;
    let Q;
    return e[48] !== u.fileTypeDisplayName || e[49] !== S || e[50] !== o || e[51] !== p || e[52] !== Z ? (Q = a.jsx(Et, {
        items: S,
        contentType: u.fileTypeDisplayName,
        trackFileCitationFollowup: o,
        trackTooltipOpenChange: p,
        children: Z
    }), e[48] = u.fileTypeDisplayName, e[49] = S, e[50] = o, e[51] = p, e[52] = Z, e[53] = Q) : Q = e[53], Q
}

function At(t) {
    return !!(t.internalHref ? ? t.url) || ge(t.fileItem.id)
}

function Et(t) {
    "use forget";
    const e = ne.c(39),
        {
            items: n,
            children: s,
            contentType: i,
            trackFileCitationFollowup: l,
            trackTooltipOpenChange: d
        } = t,
        r = Fe(),
        [c, o] = T.useState(!1),
        p = T.useContext(Se),
        f = p ? .clientThreadId ? ? Pe,
        k = Ke(),
        x = be();
    let _;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (_ = me("733205176"), e[0] = _) : _ = e[0];
    const E = _;
    let v;
    e[1] !== p ? .analyticsMetadata.turnIndex || e[2] !== p ? .message ? .metadata ? (v = m => {
        const j = p ? .analyticsMetadata.turnIndex;
        if (m == null || j === void 0 || j < 0) return re(p ? .message ? .metadata);
        const q = je.getConversationTurns(m);
        if (j >= q.length) return re(p ? .message ? .metadata);
        const A = je.getConversationTurnAtIndex(m, j);
        if (A == null) return re(p ? .message ? .metadata);
        const z = A.messages.findLast(pt);
        return xt(z ? .metadata ? .system_hints)
    }, e[1] = p ? .analyticsMetadata.turnIndex, e[2] = p ? .message ? .metadata, e[3] = v) : v = e[3];
    const w = ut(f, v);
    let I;
    e[4] !== w ? (I = w || me("2137702454"), e[4] = w, e[5] = I) : I = e[5];
    const g = I,
        B = It(f, n[0].fileItem.id, n[0].fileName, n[0].url);
    let D;
    e[6] !== d ? (D = m => {
        o(j => j === m ? j : (d ? .(m), m))
    }, e[6] = d, e[7] = D) : D = e[7];
    const W = D;
    let R;
    e[8] !== B || e[9] !== l ? (R = (m, j) => {
        j.length && (B(m, j), l ? .())
    }, e[8] = B, e[9] = l, e[10] = R) : R = e[10];
    const M = R;
    let h;
    e[11] !== r || e[12] !== n[0].fileItem ? (h = fe(r, n[0].fileItem), e[11] = r, e[12] = n[0].fileItem, e[13] = h) : h = e[13];
    const y = h;
    let b;
    e[14] !== r || e[15] !== n[0].fileItem ? (b = we(n[0].fileItem, r), e[14] = r, e[15] = n[0].fileItem, e[16] = b) : b = e[16];
    const H = b,
        C = n[0].snippet,
        F = !(k || E);
    let $;
    e[17] !== r ? ($ = r.formatMessage({
        id: "LRmGa0",
        defaultMessage: "File citation details"
    }), e[17] = r, e[18] = $) : $ = e[18];
    const S = $;
    let u;
    e[19] !== i || e[20] !== g || e[21] !== r || e[22] !== x || e[23] !== n || e[24] !== H || e[25] !== y || e[26] !== C || e[27] !== M || e[28] !== F ? (u = g ? a.jsx("div", {
        className: "max-h-[420px] max-w-sm min-w-xs overflow-y-auto p-2 outline-hidden",
        tabIndex: -1,
        children: n.map((m, j) => {
            const {
                fileItem: q,
                fileName: A,
                snippet: z,
                url: V,
                internalHref: Z
            } = m, Q = fe(r, q), U = we(q, r);
            return a.jsxs(xe, {
                className: G("text-token-text-primary flex flex-col gap-1 rounded-md p-2 text-start text-xs font-normal no-underline!"),
                href: Z ? ? V,
                isInternalHref: !!Z,
                children: [a.jsxs("div", {
                    className: "flex items-center gap-1.5",
                    children: [a.jsx("div", {
                        className: "icon-sm h-4 w-4 shrink-0 items-center overflow-hidden rounded-full",
                        children: m.fileTypeIcon
                    }), a.jsx("div", {
                        className: "text-token-text-secondary line-clamp-1 text-sm",
                        children: x ? Q.sourceName ? ? i : i
                    })]
                }), a.jsx("div", {
                    className: G("text-sm font-medium break-all", z || U ? "line-clamp-1" : "line-clamp-2"),
                    children: A
                }), x && a.jsxs("div", {
                    className: "line-clamp-2 text-sm break-words",
                    children: [a.jsx("span", {
                        className: "italic",
                        children: Q.contributorLine
                    }), a.jsx("span", {
                        className: "ms-1 not-italic",
                        children: Q.dateDisplay
                    })]
                }), (z || U) && a.jsxs("div", {
                    className: "text-token-text-secondary text-sm break-words",
                    children: [U && a.jsx("div", {
                        className: "font-medium",
                        children: U
                    }), z && a.jsx("div", {
                        className: "line-clamp-3",
                        children: z
                    })]
                })]
            }, Ae(m, j))
        })
    }) : a.jsxs("div", {
        tabIndex: -1,
        className: "outline-hidden",
        children: [a.jsxs(xe, {
            className: G("text-token-text-primary flex max-w-80 flex-col gap-1 text-start text-xs font-normal no-underline!"),
            href: n[0].internalHref ? ? n[0].url,
            isInternalHref: !!n[0].internalHref,
            children: [a.jsxs("div", {
                className: "flex items-center justify-center gap-1.5",
                children: [n[0].fileTypeIcon, a.jsx("div", {
                    className: "text-token-text-primary flex-auto truncate",
                    children: x ? y.sourceName ? ? i : i
                })]
            }), a.jsx("div", {
                className: "line-clamp-2 text-sm font-medium break-all",
                children: n[0].fileName
            }), x && a.jsxs("div", {
                className: "line-clamp-2 text-sm break-words",
                children: [a.jsx("span", {
                    className: "italic",
                    children: y.contributorLine
                }), a.jsx("span", {
                    className: "ms-1 not-italic",
                    children: y.dateDisplay
                })]
            }), (C || H) && a.jsxs("div", {
                className: "text-token-text-secondary text-sm break-words",
                children: [H && a.jsx("div", {
                    className: "font-medium",
                    children: H
                }), C && a.jsx("div", {
                    className: "line-clamp-3",
                    children: C
                })]
            })]
        }), F ? a.jsx("div", {
            className: "flex w-full cursor-pointer flex-row items-center gap-2 pt-3 text-sm",
            children: a.jsx(Ct, {
                sendReply: M
            })
        }) : null]
    }), e[19] = i, e[20] = g, e[21] = r, e[22] = x, e[23] = n, e[24] = H, e[25] = y, e[26] = C, e[27] = M, e[28] = F, e[29] = u) : u = e[29];
    const O = u,
        P = g ? "overflow-hidden p-0!" : "p-3!";
    let L;
    e[30] !== P ? (L = G("border-token-border-default relative z-50 max-w-sm rounded-xl! border", P, "bg-white shadow-xs dark:bg-black"), e[30] = P, e[31] = L) : L = e[31];
    let N;
    return e[32] !== s || e[33] !== c || e[34] !== O || e[35] !== S || e[36] !== W || e[37] !== L ? (N = a.jsx(Ye, {
        open: c,
        onOpenChange: W,
        triggerButton: s,
        contentAriaLabel: S,
        alignAgainstAnchor: "start",
        side: "bottom",
        sideOffset: 10,
        size: "none",
        className: L,
        children: O
    }), e[32] = s, e[33] = c, e[34] = O, e[35] = S, e[36] = W, e[37] = L, e[38] = N) : N = e[38], N
}

function xe(t) {
    "use forget";
    const e = ne.c(13),
        {
            children: n,
            className: s,
            href: i,
            isInternalHref: l,
            onClick: d
        } = t;
    if (i && (l === void 0 ? !1 : l)) {
        let o;
        return e[0] !== n || e[1] !== s || e[2] !== i || e[3] !== d ? (o = a.jsx($e, {
            to: i,
            className: s,
            onClick: d,
            children: n
        }), e[0] = n, e[1] = s, e[2] = i, e[3] = d, e[4] = o) : o = e[4], o
    }
    if (i) {
        let o;
        return e[5] !== n || e[6] !== s || e[7] !== i || e[8] !== d ? (o = a.jsx(oe, {
            href: i,
            className: s,
            onClick: d,
            children: n
        }), e[5] = n, e[6] = s, e[7] = i, e[8] = d, e[9] = o) : o = e[9], o
    }
    let c;
    return e[10] !== n || e[11] !== s ? (c = a.jsx("div", {
        className: s,
        children: n
    }), e[10] = n, e[11] = s, e[12] = c) : c = e[12], c
}

function Xt(t) {
    "use forget";
    const e = ne.c(5),
        {
            contentReferences: n,
            fileRef: s,
            index: i,
            trackContentReferenceEvent: l
        } = t,
        d = n[i - 1];
    if (d ? .type === "file" && (d.end_idx === s.start_idx - 1 || d.end_idx === s.start_idx)) return;
    let r;
    if (e[0] !== n || e[1] !== s || e[2] !== i || e[3] !== l) {
        const c = Dt({
            contentReferences: n,
            fileRef: s,
            index: i
        });
        r = Object.entries(c).map(o => {
            const [p, f] = o;
            return a.jsx(Pt, {
                additionalFileRefs: f.slice(1),
                fileRef: f[0],
                index: i,
                trackContentReferenceEvent: l
            }, p)
        }), e[0] = n, e[1] = s, e[2] = i, e[3] = l, e[4] = r
    } else r = e[4];
    return r
}
const Dt = ({
    contentReferences: t,
    fileRef: e,
    index: n
}) => {
    const s = [];
    let i = n,
        l = e;
    for (let c = i + 1; c < t.length; c++) {
        const o = t[c];
        if (o ? .type === "file" && (l.end_idx === o.start_idx - 1 || l.end_idx === o.start_idx)) s.push(o), l = o, i = c;
        else break
    }
    const d = [e, ...s],
        r = {};
    for (const c of d) {
        const o = Ue(c.cloud_doc_url ? ? "") ? ? "unknown";
        r[o] || (r[o] = []), r[o].push(c)
    }
    return r
};

function Zt(t) {
    return Te(), null
}

function Wt(t) {
    if (t.startsWith("file://")) return !1;
    try {
        return new URL(t).hostname !== "localhost"
    } catch {
        return !0
    }
}

function en(t) {
    if (Te()) {
        if (t.webpageRef.fallback_items) {
            const n = { ...t,
                webpageRef: { ...t.webpageRef,
                    items: t.webpageRef.fallback_items,
                    fallback_items: void 0
                }
            };
            return a.jsx(Ce, { ...n
            })
        }
        return null
    }
    return a.jsx(Ce, { ...t
    })
}

function Ce({
    webpageRef: t,
    trackContentReferenceEvent: e,
    message: n,
    index: s
}) {
    const [i, l] = T.useState(null), d = n.status, r = n.id;
    if (t.style === "hidden" || d === "in_progress" && n.metadata ? .mercury_message === !0) return null;
    switch (t.status) {
        case "loading":
        case "error":
            return null;
        default:
            return a.jsx(a.Fragment, {
                children: t.items.map((c, o) => {
                    if (!Wt(c.url)) return null;
                    const f = i === o;
                    return a.jsx(Ht, {
                        webpageItem: c,
                        trackContentReferenceEvent: e,
                        onMouseEnter: () => {
                            l(o)
                        },
                        isLastHovered: f,
                        messageId: r,
                        analyticsMetadata: {
                            section: "inline",
                            section_location: "response",
                            section_index: c.section_index
                        },
                        index: s,
                        style: t.style
                    }, `${o}-${c.url}`)
                })
            })
    }
}
const ce = {
    prev: {
        x: "0%",
        opacity: 0,
        pointerEvents: "none",
        transition: {
            duration: .1,
            ease: "easeOut"
        }
    },
    cur: {
        x: "0",
        opacity: 1,
        pointerEvents: "auto",
        transition: {
            duration: .15,
            ease: "easeOut"
        }
    },
    next: {
        x: "5%",
        opacity: 0,
        pointerEvents: "none",
        transition: {
            duration: .1,
            ease: "easeOut"
        }
    }
};

function Ht({
    webpageItem: t,
    className: e,
    trackContentReferenceEvent: n,
    onMouseEnter: s,
    isLastHovered: i,
    messageId: l,
    analyticsMetadata: d,
    index: r,
    noMarginStart: c,
    style: o
}) {
    const p = ee(() => ht()),
        f = be(),
        k = Xe(f),
        x = m => ({
            url: m.url,
            title: m.title,
            pub_date: et(m.pub_date),
            sub_pill_index: m.sub_pill_index,
            link_type: "pill",
            ...d
        }),
        _ = t.supporting_websites ? .length ? ? 0,
        [E, v] = T.useState(!1),
        [w, I] = T.useState(!1),
        g = (E || w) && i,
        B = k ? De({
            className: e,
            isQuorumEnabled: k,
            disableMarginStart: c
        }) : G("flex h-4.5 overflow-hidden rounded-xl px-2 text-[9px] font-medium", "transition-colors duration-150 ease-in-out", g ? "bg-token-text-primary! text-token-main-surface-primary!" : "text-token-text-secondary!", !g && !p && "bg-[#F4F4F4]! dark:bg-[#303030]!", p && "hover:bg-token-bg-tertiary bg-(--bg-quaternary)", e),
        D = T.useRef(g);
    g || (D.current = !1);
    const W = !g || !D.current,
        R = T.useRef(null),
        [M, h] = T.useState(null);
    gt(() => {
        if (R.current) {
            const {
                offsetWidth: m
            } = R.current;
            h(m + 1)
        }
    }, []), T.useEffect(() => {
        i && (g ? ve.setHighlightBySource(l, t) : ve.clearHighlights())
    }, [g, i, l, t]);
    const y = [t, ...t.supporting_websites ? ? []],
        [b, H] = T.useState(0),
        C = m => {
            m !== b && g && (D.current = g), H(m)
        },
        F = y[b] ? ? t,
        $ = X(b - 1, y.length),
        S = X(b + 1, y.length),
        u = {
            url: F.url,
            title: F.title,
            pub_date: F.pub_date,
            sub_pill_index: b
        };
    T.useEffect(() => {
        g || C(0)
    }, [g]);
    const O = Gt(l, r ? ? 0, b);
    T.useEffect(() => {
        O || (n("link_action", null, "webpage", { ...x(u),
            action: "show"
        }), Bt(l, r ? ? 0, b))
    }, [O]);
    const P = () => {
            n("link_action", null, "webpage", { ...x(u),
                action: "click"
            })
        },
        L = m => {
            m && n("link_action", null, "webpage", { ...x(u),
                action: "hover"
            }), I(m)
        };
    let N = null;
    return o === "reduced" ? N = a.jsx("span", {
        className: G(!c && "ms-1", "inline-flex items-center", "relative top-1"),
        onMouseEnter: () => {
            s ? .(), v(!0)
        },
        onMouseLeave: () => {
            v(!1)
        },
        onClick: P,
        children: a.jsx(oe, {
            href: F.url,
            className: G("rounded-full px-1.5 py-0.5 select-none", "bg-token-border-xlight text-token-text-secondary!", "hover:bg-token-border-default hover:text-token-text-primary"),
            children: a.jsx(Ze, {
                className: "icon-sm"
            })
        })
    }) : N = a.jsx("span", {
        ref: R,
        className: G(!k && !c && "ms-1", "inline-flex max-w-full items-center select-none", k ? "relative" : "relative top-[-0.094rem]", !k && "animate-[show_150ms_ease-in]"),
        style: M ? {
            width: M
        } : void 0,
        "data-testid": "webpage-citation-pill",
        children: a.jsx(oe, {
            href: F.url,
            className: G(B, "select-none"),
            style: M ? {
                maxWidth: M
            } : void 0,
            onClick: P,
            onMouseEnter: () => {
                s ? .(), v(!0)
            },
            onMouseLeave: () => {
                v(!1)
            },
            children: a.jsxs("span", {
                className: "relative start-0 bottom-0 flex h-full w-full items-center",
                children: [y.length > 3 && a.jsx(de, {
                    variant: "prev",
                    item: y[$],
                    numAdditionalSupportingWebsites: _,
                    isActive: g ? ? !1,
                    shouldShowSupportingCount: W,
                    renderLikeFile: k,
                    className: "absolute"
                }, $), a.jsx(de, {
                    variant: "cur",
                    item: y[b],
                    numAdditionalSupportingWebsites: _,
                    isActive: g ? ? !1,
                    shouldShowSupportingCount: W,
                    renderLikeFile: k
                }, b), y.length > 2 && a.jsx(de, {
                    variant: "next",
                    item: y[S],
                    numAdditionalSupportingWebsites: _,
                    isActive: g ? ? !1,
                    shouldShowSupportingCount: W,
                    renderLikeFile: k,
                    className: "absolute"
                }, S)]
            })
        })
    }), a.jsx($t, {
        webpageItem: t,
        open: w && i,
        onOpenChange: L,
        onClick: P,
        currentItemIndex: b,
        setCurrentItemIndex: C,
        children: N
    })
}

function de({
    className: t,
    variant: e,
    item: n,
    numAdditionalSupportingWebsites: s,
    isActive: i,
    shouldShowSupportingCount: l,
    renderLikeFile: d,
    ...r
}) {
    const c = l && s > 0,
        o = n.attribution ? ? Re(n.url),
        p = d ? a.jsxs("span", {
            className: "flex min-w-0 flex-1 items-center gap-1.5",
            children: [a.jsx("span", {
                className: "inline-flex h-4 w-4 flex-none items-center justify-center overflow-hidden rounded-full",
                children: a.jsx(Me, {
                    url: n.url,
                    size: "xsmall",
                    className: "h-4 w-4",
                    connectorSource: n.attribution ? .toLowerCase(),
                    fallback: a.jsx(he, {
                        url: n.url,
                        size: 32,
                        minSize: 16,
                        className: "h-4 w-4"
                    })
                })
            }), a.jsx(pe, {
                className: "max-w-[15ch] text-center",
                children: o
            })]
        }) : a.jsx("span", {
            className: "max-w-[15ch] grow truncate overflow-hidden text-center",
            children: o
        });
    return a.jsxs(le.span, {
        variants: {
            prev: {
                x: "0%",
                opacity: 0,
                transition: {
                    duration: .1,
                    ease: "easeOut"
                }
            },
            cur: {
                x: "0",
                opacity: 1,
                transition: {
                    duration: .1,
                    ease: "easeOut"
                }
            },
            next: {
                x: "10%",
                opacity: 0
            }
        },
        animate: e,
        initial: e,
        className: G("flex h-4 w-full items-center justify-between", !c && "overflow-hidden", t),
        ...r,
        children: [p, c && a.jsxs("span", {
            className: G("-me-1 flex h-full items-center rounded-full px-1 text-[#8F8F8F]", i && "text-token-main-surface-tertiary"),
            children: ["+", s]
        })]
    })
}

function $t({
    webpageItem: t,
    onClick: e,
    open: n,
    onOpenChange: s,
    children: i,
    currentItemIndex: l,
    setCurrentItemIndex: d,
    className: r
}) {
    const c = bt(),
        o = a.jsx(Ot, {
            webpageItem: t,
            onClick: e,
            currentItemIndex: l,
            setCurrentItemIndex: d
        });
    return a.jsx(vt, {
        label: o,
        onOpenChange: s,
        open: n,
        side: "bottom",
        delayDuration: 150,
        theme: c ? "default" : "white",
        align: "start",
        customPaddingClassName: "p-0",
        cornerRadius: "xl",
        customBorderClassName: "border-token-border-default border",
        contentClassName: "animate-show",
        className: r,
        wide: !0,
        interactive: !0,
        children: i
    })
}
const ie = T.forwardRef(function({
    item: e,
    onClick: n
}, s) {
    if (!e) return null;
    const i = e.pub_date != null ? new Date(e.pub_date * 1e3) : null;
    return a.jsxs(oe, {
        ref: s,
        className: "flex flex-col gap-2 p-3",
        href: e.url,
        onClick: n,
        children: [a.jsxs("div", {
            className: "flex gap-1.5",
            children: [a.jsx("div", {
                className: "h-4 w-4 shrink-0 overflow-hidden rounded-full",
                children: a.jsx(Me, {
                    url: e.url,
                    size: "xsmall",
                    className: "icon-sm",
                    connectorSource: e.attribution ? .toLowerCase(),
                    fallback: a.jsx(he, {
                        url: e.url,
                        size: 32,
                        minSize: 16,
                        className: "icon-sm"
                    })
                })
            }), a.jsx("div", {
                className: "text-token-text-primary truncate",
                children: e.attribution ? ? Re(e.url)
            })]
        }), a.jsx("div", {
            className: "line-clamp-2 text-sm font-medium",
            children: e.title
        }), a.jsxs("div", {
            className: "text-token-text-secondary line-clamp-2 text-sm",
            children: [zt(i), i && e.snippet && " — ", e.snippet]
        })]
    })
});

function Ot({
    webpageItem: t,
    onClick: e,
    currentItemIndex: n,
    setCurrentItemIndex: s
}) {
    const i = [t, ...t.supporting_websites ? ? []],
        l = i[n ? ? 0],
        d = n != null && `${n+1}/${i.length}`,
        r = n ? i[X(n + 1, i.length)] : void 0,
        c = n ? i[X(n - 1, i.length)] : void 0,
        o = () => {
            n != null && s ? .(X(n + 1, i.length))
        },
        p = () => {
            n != null && s ? .(X(n - 1, i.length))
        },
        f = ee(jt),
        k = !f,
        [{
            width: x
        }, _] = wt(),
        [E, v] = T.useState(x ? ? 0);
    E < x && v(x), T.useEffect(() => kt(document, {
        keydown: I => {
            I.key === "ArrowRight" ? o() : I.key === "ArrowLeft" && p()
        }
    }));
    const w = G("flex flex-col dark:bg-token-main-surface-secondary");
    return a.jsxs("span", {
        className: "text-token-text-primary flex flex-col text-start text-xs font-normal no-underline!",
        children: [n != null && i.length > 1 && a.jsxs("div", {
            className: "bg-token-main-surface-secondary dark:bg-token-main-surface-tertiary flex h-9 items-center justify-between gap-1.5",
            children: [a.jsxs("div", {
                className: "text-token-text-secondary mx-1.5 flex gap-1",
                children: [a.jsx("button", {
                    onClick: p,
                    className: "hover:bg-token-border-xlight disabled:text-token-text-quaternary h-6 w-6 rounded-md disabled:hover:bg-transparent",
                    children: a.jsx(_t, {
                        className: "icon-sm m-auto"
                    })
                }), a.jsx("button", {
                    onClick: o,
                    className: "hover:bg-token-border-xlight disabled:text-token-text-quaternary h-6 w-6 rounded-md disabled:hover:bg-transparent",
                    children: a.jsx(Nt, {
                        className: "icon-sm m-auto"
                    })
                })]
            }), a.jsx("span", {
                className: "text-token-text-tertiary mx-3.5",
                children: d
            })]
        }), n != null && i.length > 1 ? a.jsxs("div", {
            className: "flex overflow-hidden",
            children: [i.length > 3 && a.jsx(le.span, {
                className: G(w, "absolute"),
                variants: ce,
                animate: "prev",
                initial: "prev",
                children: a.jsx(ie, {
                    item: c,
                    onClick: e
                })
            }, X(n - 1, i.length)), a.jsx(le.span, {
                className: w,
                variants: ce,
                animate: "cur",
                initial: "cur",
                style: f ? void 0 : {
                    minWidth: E
                },
                children: a.jsx(ie, {
                    ref: k ? _ : void 0,
                    item: l,
                    onClick: e
                })
            }, n), i.length > 2 && a.jsx(le.span, {
                className: G(w, "absolute"),
                variants: ce,
                animate: "next",
                initial: "next",
                children: a.jsx(ie, {
                    item: r,
                    onClick: e
                })
            }, X(n + 1, i.length))]
        }) : a.jsx("div", {
            className: w,
            children: a.jsx(ie, {
                item: l,
                onClick: e
            })
        })]
    })
}

function zt(t) {
    return t && t.toLocaleDateString(void 0, {
        year: "numeric",
        month: "long",
        day: "numeric"
    })
}

function X(t, e) {
    return (t % e + e) % e
}
const We = yt(() => ({}));

function He(t, e, n) {
    return `${t}-${e}-${n}`
}

function Gt(t, e, n) {
    return We(s => s[He(t, e, n)])
}

function Bt(t, e, n) {
    We.setState(s => ({ ...s,
        [He(t, e, n)]: 1
    }))
}
export {
    Xt as F, Ht as W, en as a, $t as b, Zt as c, Pt as d, ke as g
};
//# sourceMappingURL=dccfc4ad-llwbwazdbw44tz1f.js.map