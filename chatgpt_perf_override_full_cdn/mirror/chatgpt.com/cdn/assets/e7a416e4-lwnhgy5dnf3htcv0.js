import {
    c as ae,
    j as t,
    u as oe,
    r as y,
    m as Pe,
    o as J,
    s as Le
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    c as Te,
    af as ne,
    fk as ce,
    cf as he,
    hi as Ae,
    qZ as De,
    H6 as Oe,
    H7 as ve,
    H8 as Fe,
    bE as He,
    nQ as Ge,
    gZ as We,
    j0 as Ke,
    n_ as Ve,
    zk as Ue,
    ej as be,
    hO as we,
    e as $e,
    EK as qe,
    aw as ue,
    hY as Qe
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    cn as ze,
    cp as Ze,
    bN as Ye,
    dn as Xe,
    hN as Je,
    hZ as de,
    AG as et,
    ck as je,
    cl as ye,
    AH as Ee,
    eI as tt,
    AI as nt,
    qh as st,
    bK as Ne,
    ly as ot,
    dr as rt,
    aS as at,
    o6 as it
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    M as Ce
} from "./26b47209-lemdmpf742pvpkux.js";
import {
    C as ke
} from "./e8b55dd1-0egvp6sbx7ge01os.js";
import {
    u as Se
} from "./0f28d127-l3kclpo98h76r1qr.js";
import {
    W as lt
} from "./cf64444f-b0z8ffdp5xu532do.js";
import {
    I as ct,
    J as dt,
    f as ut
} from "./af7de5ed-hluw7l4ayzlk3ze4.js";
const fe = Te(ze, "008295", 24, 24),
    mt = "composer-btn px-2 text-sm font-medium";

function ft(n) {
    "use forget";
    const e = ae.c(13),
        {
            triggerText: a,
            Icon: u,
            truncate: g,
            hideTextOnMobile: h,
            isLoading: r
        } = n,
        i = g === void 0 ? !0 : g,
        o = h === void 0 ? !0 : h,
        s = r === void 0 ? !1 : r,
        x = o && "hidden sm:block",
        l = i ? "max-w-[8rem] truncate md:max-w-[10rem]" : "w-fit";
    let c;
    e[0] !== x || e[1] !== l ? (c = ne(x, l), e[0] = x, e[1] = l, e[2] = c) : c = e[2];
    let m;
    e[3] !== c || e[4] !== a ? (m = t.jsx("span", {
        className: c,
        children: a
    }), e[3] = c, e[4] = a, e[5] = m) : m = e[5];
    let f;
    e[6] !== s ? (f = s && t.jsx(he, {
        "aria-hidden": !0,
        className: "icon-sm"
    }), e[6] = s, e[7] = f) : f = e[7];
    let w;
    e[8] === Symbol.for("react.memo_cache_sentinel") ? (w = t.jsx(Ye, {
        "aria-hidden": !0,
        className: "icon-sm"
    }), e[8] = w) : w = e[8];
    let j;
    return e[9] !== u || e[10] !== m || e[11] !== f ? (j = t.jsxs("div", {
        className: "flex max-w-full items-center gap-1.5 ps-1",
        children: [u, m, f, w]
    }), e[9] = u, e[10] = m, e[11] = f, e[12] = j) : j = e[12], j
}

function Me(n) {
    "use forget";
    const e = ae.c(19),
        {
            triggerText: a,
            toolTip: u,
            ariaLabel: g,
            Icon: h,
            truncate: r,
            isLoading: i,
            disabled: o
        } = n,
        s = r === void 0 ? !0 : r,
        x = i === void 0 ? !1 : i,
        l = o === void 0 ? !1 : o,
        c = l && "cursor-not-allowed opacity-50";
    let m;
    e[0] !== c ? (m = ne(mt, c), e[0] = c, e[1] = m) : m = e[1];
    const f = l || void 0,
        w = l ? "" : void 0,
        j = l ? -1 : 0,
        v = l ? ht : void 0;
    let C;
    e[2] !== h || e[3] !== x || e[4] !== a || e[5] !== s ? (C = t.jsx(ft, {
        triggerText: a,
        Icon: h,
        truncate: s,
        isLoading: x
    }), e[2] = h, e[3] = x, e[4] = a, e[5] = s, e[6] = C) : C = e[6];
    let N;
    e[7] !== g || e[8] !== x || e[9] !== C || e[10] !== m || e[11] !== f || e[12] !== w || e[13] !== j || e[14] !== v ? (N = t.jsx(Ze, {
        className: m,
        "aria-label": g,
        "aria-busy": x,
        "aria-disabled": f,
        "data-disabled": w,
        tabIndex: j,
        onClick: v,
        children: C
    }), e[7] = g, e[8] = x, e[9] = C, e[10] = m, e[11] = f, e[12] = w, e[13] = j, e[14] = v, e[15] = N) : N = e[15];
    let b;
    return e[16] !== N || e[17] !== u ? (b = t.jsx(ce, {
        label: u,
        triggerAs: null,
        children: N
    }), e[16] = N, e[17] = u, e[18] = b) : b = e[18], b
}

function ht(n) {
    n.preventDefault(), n.stopPropagation()
}

function se({
    children: n,
    className: e,
    onClick: a,
    isSelected: u,
    isActive: g,
    isVirtualHover: h = !1,
    label: r,
    isDisabled: i,
    tooltipLabel: o,
    isSubMenuTrigger: s,
    noDefaultHoverState: x,
    as: l = "button",
    truncateLabel: c,
    infoIcon: m,
    infoLink: f,
    icon: w,
    ...j
}) {
    const v = oe();
    let C = t.jsx(t.Fragment, {});
    n ? C = t.jsx("div", {
        className: "flex flex-1 items-center gap-4",
        children: n
    }) : r && (C = t.jsxs("div", {
        className: ne("flex items-center gap-3", c ? "w-0 flex-1" : "w-full"),
        children: [w && (y.isValidElement(w) ? w : t.jsx(pt, {
            icon: w
        })), r && t.jsx("div", {
            className: ne("flex flex-col items-start py-1", i && "text-token-text-quaternary pointer-events-none", c && "w-[100%]"),
            children: t.jsx("div", {
                className: ne("flex items-center text-start text-sm", c && "w-full"),
                children: t.jsx("span", {
                    className: "w-full overflow-hidden text-ellipsis whitespace-nowrap",
                    children: r
                })
            })
        })]
    }), o && (C = t.jsx(ce, {
        sideOffset: -10,
        label: o,
        className: "w-full",
        children: C
    })));
    const N = t.jsxs("div", {
            className: ne("flex items-center justify-center", (u || m && f || s) && "min-w-5"),
            children: [u && t.jsx(Ae, {
                className: "icon color:var(--tint-color,#0285FF) icon-sm",
                "aria-label": v.formatMessage({
                    id: "wham.codexMenuRow.selected",
                    defaultMessage: "Selected"
                })
            }), m && f && t.jsx("a", {
                href: f,
                target: "_blank",
                rel: "noopener noreferrer",
                children: m
            }), s && t.jsx(Xe, {
                className: "icon text-token-text-tertiary w-7",
                "aria-label": v.formatMessage({
                    id: "wham.codexMenuRow.openSubmenu",
                    defaultMessage: "Open submenu"
                })
            })]
        }),
        b = ne("flex cursor-pointer items-center rounded-[10px] px-2.5 py-1", (u || m && f || s) && "gap-4", g && "bg-black/5 dark:bg-white/5", !x && "hover:bg-black/5 dark:hover:bg-white/5", h && "bg-black/5 dark:bg-white/5", e);
    if (l === "div") {
        const _ = j;
        return t.jsxs("div", { ..._,
            className: b,
            children: [C, N]
        })
    }
    const D = j;
    return t.jsxs("button", {
        type: "button",
        ...D,
        onClick: _ => {
            _.persist(), requestAnimationFrame(() => {
                a ? .(_)
            })
        },
        className: b,
        children: [C, N]
    })
}

function pt({
    icon: n
}) {
    const e = n;
    return t.jsx("div", {
        className: "text-token-text-secondary flex h-5 w-5 items-center justify-center",
        children: t.jsx(e, {
            className: "h-5 w-5 shrink-0",
            "aria-label": ""
        })
    })
}
const me = "wham-environment-popover-event";

function Re(n, e, a) {
    y.useEffect(() => {
        function g(h) {
            h.detail.popover !== n && a()
        }
        return window.addEventListener(me, g), () => {
            window.removeEventListener(me, g)
        }
    }, [n, a]);
    const u = y.useCallback(g => {
        window.dispatchEvent(new CustomEvent(me, {
            detail: {
                popover: g
            }
        }))
    }, []);
    y.useEffect(() => {
        e && u(n)
    }, [e, u, n])
}
const Ie = ({
    items: n,
    onSelect: e,
    keyExtractor: a
}) => {
    const [u, g] = y.useState(null), [h] = y.useState(new Map);
    return {
        hoveredId: u,
        setHoveredId: g,
        getItemRef: i => o => {
            const s = a(i);
            return o && h.set(s, o), () => {
                h.delete(s)
            }
        },
        itemRefs: h,
        onKeyDown: i => {
            const o = i.key === "ArrowDown" || i.key === "n" && i.ctrlKey,
                s = i.key === "ArrowUp" || i.key === "p" && i.ctrlKey;
            if (!(o || s || i.key === "Enter")) return;
            if (i.preventDefault(), i.key === "Enter") {
                u && e(u);
                return
            }
            const x = n.findIndex(m => a(m) === u),
                l = Je(x - (s ? 1 : -1), 0, n.length - 1),
                c = a(n[l]);
            h.get(c) ? .scrollIntoView({
                behavior: "instant",
                block: "nearest"
            }), g(c)
        }
    }
};

function xt(n) {
    "use forget";
    const e = ae.c(48),
        {
            environment: a,
            repository: u,
            disabled: g,
            disabledTooltip: h
        } = n,
        r = g === void 0 ? !1 : g,
        i = oe(),
        {
            branch: o,
            setBranch: s
        } = de(),
        [x, l] = y.useState(""),
        [c, m] = y.useState(!1),
        f = y.useRef(null);
    let w;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (w = () => m(!1), e[0] = w) : w = e[0];
    const j = w,
        v = a ? .repos ? .[0] ? ? u ? .id ? ? null,
        C = y.useRef(v);
    let N;
    e[1] !== a || e[2] !== u ? .default_branch ? (N = a ? Et(a) : u ? .default_branch ? ? "main", e[1] = a, e[2] = u ? .default_branch, e[3] = N) : N = e[3];
    const b = N;
    let D, _;
    e[4] !== o || e[5] !== b || e[6] !== v || e[7] !== s ? (D = () => {
        const V = C.current;
        if (C.current = v, !v) {
            s(null);
            return
        }
        const U = et(v);
        if (V !== v) {
            if (U) {
                s(U);
                return
            }
            s(b);
            return
        }
        o || s(U ? ? b)
    }, _ = [o, v, b, s], e[4] = o, e[5] = b, e[6] = v, e[7] = s, e[8] = D, e[9] = _) : (D = e[8], _ = e[9]), y.useEffect(D, _);
    let P;
    e[10] === Symbol.for("react.memo_cache_sentinel") ? (P = () => m(!1), e[10] = P) : P = e[10], Re("branch", c, P);
    let k;
    e[11] !== r ? (k = () => {
        r || m(!0)
    }, e[11] = r, e[12] = k) : k = e[12];
    let B;
    e[13] !== i ? (B = i.formatMessage({
        id: "wham.keyboardActions.whamBranches",
        defaultMessage: "Branches"
    }), e[13] = i, e[14] = B) : B = e[14];
    let O;
    e[15] === Symbol.for("react.memo_cache_sentinel") ? (O = [je.Mod, "b"], e[15] = O) : O = e[15];
    let M;
    e[16] !== k || e[17] !== B ? (M = [{
        key: "whamBranches",
        action: k,
        actionMessageDescriptor: B,
        group: ye.Chat,
        keyboardBinding: O
    }], e[16] = k, e[17] = B, e[18] = M) : M = e[18], Se(M);
    let F;
    e[19] !== o || e[20] !== i ? (F = o ? ? i.formatMessage({
        id: "wham.codexBranchPopover.selectABranch",
        defaultMessage: "Select a Branch"
    }), e[19] = o, e[20] = i, e[21] = F) : F = e[21];
    let E;
    e[22] !== o || e[23] !== c || e[24] !== r || e[25] !== h || e[26] !== i ? (E = r ? h ? ? "" : o === "" || c ? "" : o ? .length ? o : i.formatMessage({
        id: "wham.codexBranchPopover.searchForYourBranchTooltip",
        defaultMessage: "Search for your branch"
    }), e[22] = o, e[23] = c, e[24] = r, e[25] = h, e[26] = i, e[27] = E) : E = e[27];
    let S;
    e[28] !== i ? (S = i.formatMessage({
        id: "wham.codexBranchPopover.searchForYourBranchAria",
        defaultMessage: "Search for your branch"
    }), e[28] = i, e[29] = S) : S = e[29];
    let T;
    e[30] === Symbol.for("react.memo_cache_sentinel") ? (T = t.jsx(fe, {
        "aria-hidden": !0,
        className: "icon-sm"
    }), e[30] = T) : T = e[30];
    let R;
    e[31] !== r || e[32] !== F || e[33] !== E || e[34] !== S ? (R = t.jsx(Me, {
        triggerText: F,
        toolTip: E,
        ariaLabel: S,
        Icon: T,
        disabled: r
    }), e[31] = r, e[32] = F, e[33] = E, e[34] = S, e[35] = R) : R = e[35];
    let L;
    e[36] !== o || e[37] !== c || e[38] !== r || e[39] !== b || e[40] !== v || e[41] !== x || e[42] !== s ? (L = r ? null : t.jsx(ke, {
        align: "start",
        isOpen: c,
        closePopover: j,
        popoverContentRef: f,
        children: t.jsx(gt, {
            defaultBranch: b,
            repoId: v,
            searchQuery: x,
            setSearchQuery: l,
            setBranch: s,
            selectedBranch: o ? ? "",
            closePopover: j
        })
    }), e[36] = o, e[37] = c, e[38] = r, e[39] = b, e[40] = v, e[41] = x, e[42] = s, e[43] = L) : L = e[43];
    let H;
    return e[44] !== c || e[45] !== R || e[46] !== L ? (H = t.jsx("div", {
        className: "items-center rounded-full",
        children: t.jsxs(Ee, {
            open: c,
            onOpenChange: m,
            children: [R, L]
        })
    }), e[44] = c, e[45] = R, e[46] = L, e[47] = H) : H = e[47], H
}

function gt(n) {
    "use forget";
    const e = ae.c(62),
        {
            repoId: a,
            defaultBranch: u,
            setBranch: g,
            selectedBranch: h,
            searchQuery: r,
            setSearchQuery: i,
            closePopover: o
        } = n,
        s = oe(),
        x = y.useRef(null),
        l = tt(r, 300);
    let c;
    e[0] !== a ? (c = a ? nt(a) : [], e[0] = a, e[1] = c) : c = e[1];
    const m = c;
    let f;
    e[2] !== l || e[3] !== a ? (f = ["searchBranches", a, l], e[2] = l, e[3] = a, e[4] = f) : f = e[4];
    const w = !!a;
    let j;
    e[5] !== l || e[6] !== a ? (j = d => {
        const {
            pageParam: p
        } = d;
        return lt.searchBranchesByRepository(a ? ? "", l, st, p ? ? null)
    }, e[5] = l, e[6] = a, e[7] = j) : j = e[7];
    let v;
    e[8] !== f || e[9] !== w || e[10] !== j ? (v = {
        queryKey: f,
        enabled: w,
        initialPageParam: null,
        queryFn: j,
        getNextPageParam: yt
    }, e[8] = f, e[9] = w, e[10] = j, e[11] = v) : v = e[11];
    const {
        data: C,
        isLoading: N,
        fetchNextPage: b,
        hasNextPage: D,
        isFetchingNextPage: _,
        error: P
    } = Pe(v);
    let k;
    if (e[12] !== C ? .pages || e[13] !== u || e[14] !== m) {
        const d = C ? .pages ? .flat().map(wt) ? .flat() ? ? [],
            p = new Set;
        k = [], u && !p.has(u) && (p.add(u), k.push(u));
        for (const I of m) p.has(I) || (p.add(I), k.push(I));
        for (const I of d) p.has(I) || (p.add(I), k.push(I));
        e[12] = C ? .pages, e[13] = u, e[14] = m, e[15] = k
    } else k = e[15];
    const B = k;
    let O;
    e[16] !== o || e[17] !== g ? (O = d => {
        g(d), o()
    }, e[16] = o, e[17] = g, e[18] = O) : O = e[18];
    const M = O;
    let F;
    e: {
        if (!r ? .trim()) {
            let p;
            e[19] !== B ? (p = B ? ? [], e[19] = B, e[20] = p) : p = e[20], F = p;
            break e
        }
        let d;e[21] !== B || e[22] !== r ? (d = B.filter(p => p.toLowerCase().includes(r.toLowerCase())), e[21] = B, e[22] = r, e[23] = d) : d = e[23],
        F = d
    }
    const E = F;
    let S;
    e[24] !== E || e[25] !== M ? (S = {
        items: E,
        keyExtractor: bt,
        onSelect: M
    }, e[24] = E, e[25] = M, e[26] = S) : S = e[26];
    const {
        hoveredId: T,
        setHoveredId: R,
        onKeyDown: L,
        getItemRef: H
    } = Ie(S);
    let V, U;
    e[27] === Symbol.for("react.memo_cache_sentinel") ? (U = () => {
        x.current && x.current.focus()
    }, V = [], e[27] = V, e[28] = U) : (V = e[27], U = e[28]), y.useEffect(U, V);
    let A;
    e[29] !== i ? (A = d => i(d.target.value), e[29] = i, e[30] = A) : A = e[30];
    let $;
    e[31] !== s ? ($ = s.formatMessage({
        id: "wham.codexBranchPopover.branch",
        defaultMessage: "Search branches…"
    }), e[31] = s, e[32] = $) : $ = e[32];
    let G;
    e[33] !== s ? (G = s.formatMessage({
        id: "wham.codexBranchPopover.createBranchAria",
        defaultMessage: "Create a new branch"
    }), e[33] = s, e[34] = G) : G = e[34];
    let W;
    e[35] !== L || e[36] !== r || e[37] !== A || e[38] !== $ || e[39] !== G ? (W = t.jsx(Ne, {
        ref: x,
        className: "placeholder:text-token-text-tertiary !focus-within:ring-0 my-1.5 w-full border-0 bg-transparent ps-4 outline-none focus:border-0 focus:ring-0 focus:outline-none",
        type: "text",
        autoComplete: "off",
        inputClassName: "text-sm",
        name: "search-branch",
        value: r,
        suppressFocus: !0,
        onKeyDown: L,
        onChange: A,
        placeholder: $,
        ariaLabel: G
    }), e[35] = L, e[36] = r, e[37] = A, e[38] = $, e[39] = G, e[40] = W) : W = e[40];
    let Q;
    e[41] === Symbol.for("react.memo_cache_sentinel") ? (Q = t.jsx("div", {
        className: "bg-token-border-default h-px w-full"
    }), e[41] = Q) : Q = e[41];
    let q;
    e[42] !== E || e[43] !== H || e[44] !== M || e[45] !== T || e[46] !== h || e[47] !== R ? (q = E ? .map(d => {
        const p = d === h;
        return t.jsx(se, {
            className: "w-full max-w-full whitespace-nowrap",
            as: "button",
            onMouseEnter: () => R(d),
            isVirtualHover: T === d,
            ref: H(d),
            onClick: () => {
                M(d)
            },
            isSelected: p,
            label: d,
            truncateLabel: !0
        }, d)
    }), e[42] = E, e[43] = H, e[44] = M, e[45] = T, e[46] = h, e[47] = R, e[48] = q) : q = e[48];
    let z;
    e[49] !== P ? (z = P ? t.jsx("div", {
        className: "flex items-center justify-center",
        children: t.jsx(J, {
            id: "wham.branchPopover.error",
            defaultMessage: "Error loading branches"
        })
    }) : null, e[49] = P, e[50] = z) : z = e[50];
    const X = _ || N;
    let Z;
    e[51] !== b || e[52] !== D || e[53] !== X ? (Z = t.jsx(ot, {
        bgColor: "dark:bg-token-bg-secondary",
        hasNextPage: D,
        fetchNextPage: b,
        isFetchingNextPage: X
    }), e[51] = b, e[52] = D, e[53] = X, e[54] = Z) : Z = e[54];
    let K;
    e[55] !== q || e[56] !== z || e[57] !== Z ? (K = t.jsxs("div", {
        className: "min-h-18 w-full overflow-y-auto p-1.5",
        children: [q, z, Z]
    }), e[55] = q, e[56] = z, e[57] = Z, e[58] = K) : K = e[58];
    let Y;
    return e[59] !== W || e[60] !== K ? (Y = t.jsxs("div", {
        className: "gap flex max-h-[280px] w-90 flex-col rounded-lg p-0 md:max-h-[360px]",
        onClick: vt,
        children: [W, Q, K]
    }), e[59] = W, e[60] = K, e[61] = Y) : Y = e[61], Y
}

function vt(n) {
    n.stopPropagation()
}

function bt(n) {
    return n
}

function wt(n) {
    return n.items.flatMap(jt)
}

function jt(n) {
    return n.branch
}

function yt(n) {
    return n ? .cursor ? ? null
}

function Et(n) {
    for (const e of n.repos) {
        const a = n.repo_map ? .[e];
        if (a ? .default_branch) return a.default_branch
    }
    return "main"
}

function Kt(n, e) {
    return {
        label: e,
        description: "",
        share_settings: "workspace",
        machine: "wham-public/wham-universal",
        repositoryId: n,
        workspaceDirectory: "/workspace",
        agentNetworkAccess: {
            mode: "off"
        },
        setupCommands: "",
        maintenanceSetupCommands: "",
        secrets: [],
        envVars: [],
        autoSetupSettings: null,
        cacheSettings: {
            post_setup_cache_enabled: !0
        }
    }
}

function Nt({
    repository: n,
    disabledRepositoryIds: e,
    isCreating: a,
    creatingRepositoryId: u,
    isSelected: g,
    onSelect: h
}) {
    const r = n.repository_full_name ? ? n.name ? ? "",
        i = u === n.id,
        s = !!e ? .has(n.id) || !!a && !i || !!i;
    return t.jsx(se, {
        as: "button",
        className: "w-full",
        onClick: () => {
            s || h(n)
        },
        isSelected: g,
        isDisabled: s,
        label: r
    })
}

function Ct({
    repositories: n,
    isLoading: e,
    isError: a,
    search: u,
    onSelectRepository: g,
    existingEnvironmentRepositoryIds: h,
    showRepositoriesHeader: r
}) {
    "use no forget";
    const i = De("installations/select_target"),
        o = de(l => l.selectedRepositoryId),
        s = de(l => l.useRepositoryAsEnvironment),
        x = y.useMemo(() => n.length ? n.filter(l => {
            if (!l.id || h.has(l.id)) return !1;
            if (!u) return !0;
            const c = (l.repository_full_name ? ? l.name ? ? "").toLowerCase(),
                m = l.owner ? .login ? .toLowerCase() ? ? "";
            return c.includes(u) || m.includes(u)
        }).sort((l, c) => {
            const m = l.repository_full_name ? ? l.name ? ? "",
                f = c.repository_full_name ? ? c.name ? ? "";
            return m.localeCompare(f)
        }) : [], [h, u, n]);
    return t.jsxs("div", {
        className: "text-token-text-primary flex flex-col gap-0.5",
        children: [r && t.jsxs(t.Fragment, {
            children: [t.jsx("div", {
                className: "bg-token-border-default mt-2 h-px w-full"
            }), t.jsx("div", {
                className: "px-1.5",
                children: t.jsx(se, {
                    as: "div",
                    className: "text-token-text-tertiary pointer-events-none w-full text-sm",
                    label: t.jsx("div", {
                        className: "flex items-center gap-2",
                        children: t.jsx(J, {
                            id: "wham.codexEnvironmentPopover.repositoriesWithoutEnvironments",
                            defaultMessage: "Repositories"
                        })
                    })
                })
            })]
        }), t.jsx("div", {
            className: "px-1.5",
            children: e ? t.jsx("div", {
                className: "flex w-full items-center justify-center py-2",
                children: t.jsx(he, {
                    className: "ms-2"
                })
            }) : a ? t.jsx("div", {
                className: "p-5 text-center",
                children: t.jsx("p", {
                    className: "text-token-text-tertiary text-sm",
                    children: t.jsx(J, {
                        id: "wham.codexEnvironmentPopover.repositoriesWithoutEnvironmentsError",
                        defaultMessage: "Failed to load repositories"
                    })
                })
            }) : x.length === 0 ? t.jsx("div", {
                className: "p-5 text-center",
                children: t.jsx("p", {
                    className: "text-token-text-tertiary text-sm",
                    children: t.jsx(J, {
                        id: "wham.environmentPopover.noRepositories",
                        defaultMessage: "No repositories found"
                    })
                })
            }) : x.map(l => t.jsx(Nt, {
                repository: l,
                isSelected: s && o === l.id,
                onSelect: g
            }, l.id))
        }), t.jsx("div", {
            className: "bg-token-border-default mt-1 h-px w-full"
        }), t.jsx("div", {
            className: "px-1.5 pb-1.5",
            children: t.jsx(se, {
                as: "button",
                className: "mt-1 w-full",
                onClick: () => {
                    window.open(i, "_blank")
                },
                icon: t.jsx(rt, {
                    className: "icon-sm inline-block"
                }),
                label: t.jsx("div", {
                    className: "flex items-center gap-2 text-sm",
                    children: t.jsx(J, {
                        id: "o1jiyf",
                        defaultMessage: "Configure Repositories on GitHub"
                    })
                })
            })
        })]
    })
}

function _e({
    className: n
}) {
    return t.jsx(at, {
        className: ne("flex w-[8rem] items-center gap-1.5 rounded-full! md:w-[10rem]", n)
    })
}
var kt = Math.min;

function St(n, e, a) {
    for (var u = Fe, g = n[0].length, h = n.length, r = h, i = Array(h), o = 1 / 0, s = []; r--;) {
        var x = n[r];
        o = kt(x.length, o), i[r] = g >= 120 && x.length >= 120 ? new Oe(r && x) : void 0
    }
    x = n[0];
    var l = -1,
        c = i[0];
    e: for (; ++l < g && s.length < o;) {
        var m = x[l],
            f = m;
        if (m = m !== 0 ? m : 0, !(c ? ve(c, f) : u(s, f))) {
            for (r = h; --r;) {
                var w = i[r];
                if (!(w ? ve(w, f) : u(n[r], f))) continue e
            }
            c && c.push(f), s.push(m)
        }
    }
    return s
}

function Mt(n) {
    return it(n) ? n : []
}
var Rt = He(function(n) {
    var e = Ge(n, Mt);
    return e.length && e[0] === n[0] ? St(e) : []
});

function It() {
    const {
        data: n,
        isError: e
    } = dt(), {
        data: a,
        isLoading: u,
        isError: g
    } = ut();
    return {
        environments: a ? ? n,
        fullEnvironmentsLoading: u,
        isErrorEnvironments: g && e
    }
}

function _t({
    onCreateEnvironment: n,
    showBranchSelector: e = !0,
    allowRepositorySelection: a = !0,
    filters: u = null,
    openEnvironmentInNewWindow: g = !1
} = {}) {
    "use no forget";
    const h = oe(),
        {
            environmentId: r,
            setEnvironmentId: i,
            selectedRepositoryId: o,
            setSelectedRepositoryId: s,
            setBranch: x,
            setUseRepositoryAsEnvironment: l,
            useRepositoryAsEnvironment: c
        } = de(),
        [m, f] = y.useState(!1),
        w = y.useRef(null),
        [j, v] = y.useState(!1),
        C = y.useRef(r),
        [N, b] = y.useState(null),
        [D, _] = y.useState(""),
        {
            data: P,
            isLoading: k,
            isError: B
        } = ct(D),
        {
            environments: O,
            fullEnvironmentsLoading: M,
            isErrorEnvironments: F
        } = It(),
        E = y.useMemo(() => u ? .repos ? O ? .filter(d => Rt(d.repos, u.repos).length > 0) : O, [O, u]),
        S = E ? .find(d => d.id === r),
        T = y.useCallback(d => {
            if (!d) return null;
            const p = d.repos ? ? Object.keys(d.repo_map ? ? {});
            if (!p.length) return null;
            const [I] = p;
            return I ? ? null
        }, []);
    Re("environment", m, () => f(!1)), y.useEffect(() => {
        C.current !== r && (C.current = r, r != null && (v(!1), b(null)))
    }, [r]), y.useEffect(() => {
        if (!c) {
            b(null);
            return
        }
    }, [c]), y.useEffect(() => {
        if (j || M) return;
        if (r && !S) {
            i(null), s(null);
            return
        } else if (!r && E ? .length) {
            const I = We(E, [re => !(re.is_pinned ? ? !1), re => -(re.task_count ? ? 0)])[0];
            i(I.id);
            const ee = T(I);
            s(ee ? ? null);
            return
        }
        const d = T(S);
        d != null && d !== o ? s(d) : S && d == null && o != null && s(null)
    }, [M, r, S, E, i, o, s, T, j]), y.useEffect(() => {
        if (F || j || M || (E ? .length ? ? 0) > 0 || !P ? .repositories.length) return;
        const [d] = P.repositories;
        if (d ? .id && a && !r) {
            if (o === d.id && c) {
                N ? .id !== d.id && b(d);
                return
            }
            l(!0), s(d.id), b(d), x(null)
        }
    }, [P, F, c, r, o, x, s, l, b, j, M, E ? .length, N ? .id, a]), Se([{
        key: "whamEnvironments",
        action: () => f(!0),
        actionMessageDescriptor: h.formatMessage({
            id: "wham.keyboardActions.whamEnvironments",
            defaultMessage: "Environments"
        }),
        group: ye.Chat,
        keyboardBinding: [je.Mod, "e"]
    }]);
    const R = y.useCallback(() => f(!1), []),
        L = y.useCallback(d => {
            d ? .id && (v(!0), i(null), l(!0), s(d.id), b(d), x(null), R())
        }, [R, x, i, s, l]),
        H = h.formatMessage({
            id: "wham.codexEnvironmentPopover.selectEnvironment",
            defaultMessage: "Select environment"
        }),
        V = h.formatMessage({
            id: "wham.codexEnvironmentPopover.selectRepository",
            defaultMessage: "Select repository"
        }),
        U = h.formatMessage({
            id: "wham.codexEnvironmentPopover.viewAllCodeEnvironments",
            defaultMessage: "View all code environments"
        }),
        A = S ? .label,
        $ = (A ? .length ? ? 0) > 16,
        G = a && (c || E ? .length === 0 && !M),
        W = N ? .repository_full_name ? ? N ? .name ? ? V,
        Q = W.length > 16,
        q = G ? W : A ? ? H,
        z = G ? Q ? W : "" : $ ? A ? ? "" : A || m ? "" : U,
        X = G ? t.jsx(Ke, {
            "aria-hidden": !0,
            className: "icon-sm"
        }) : t.jsx(Ce, {
            "aria-hidden": !0,
            className: "icon-sm"
        }),
        Z = y.useMemo(() => {
            const d = new Set;
            return E ? .forEach(p => {
                (p.repos ? ? Object.keys(p.repo_map ? ? {})).forEach(ee => {
                    ee && d.add(ee)
                })
            }), d
        }, [E]),
        K = a && c && N ? N : null,
        Y = e && !!(S || K);
    return M && !E ? .length ? t.jsx("div", {
        className: "flex items-center gap-3 rounded-full",
        children: t.jsx(_e, {})
    }) : t.jsxs("div", {
        className: "flex items-center gap-2 rounded-full",
        children: [t.jsxs(Ee, {
            open: m,
            onOpenChange: f,
            children: [t.jsx(Me, {
                triggerText: q,
                toolTip: z,
                ariaLabel: h.formatMessage({
                    id: "wham.codexEnvironmentPopover.viewAll",
                    defaultMessage: "View all code environments"
                }),
                Icon: X
            }), t.jsx(ke, {
                align: "start",
                collisionPadding: 12,
                isOpen: m,
                closePopover: R,
                popoverContentRef: w,
                children: t.jsx(Bt, {
                    searchTerm: D,
                    setSearchTerm: _,
                    repositories: P ? .repositories ? ? [],
                    isLoadingRepositories: k,
                    isErrorRepositories: B,
                    isLoading: M,
                    environments: E ? ? [],
                    environmentId: r,
                    setEnvironmentId: d => {
                        i(d);
                        const p = E ? .find(ee => ee.id === d),
                            I = T(p);
                        s(I ? ? null)
                    },
                    closePopover: R,
                    onSelectRepository: L,
                    disabledRepositoryIds: Z,
                    allowRepositorySelection: a,
                    openEnvironmentInNewWindow: g,
                    onCreateEnvironment: n
                })
            })]
        }), Y && t.jsx(xt, {
            environment: S,
            repository: K
        })]
    })
}

function Bt(n) {
    "use forget";
    const e = ae.c(79),
        {
            searchTerm: a,
            setSearchTerm: u,
            repositories: g,
            isLoadingRepositories: h,
            isErrorRepositories: r,
            isLoading: i,
            environments: o,
            environmentId: s,
            setEnvironmentId: x,
            closePopover: l,
            onSelectRepository: c,
            disabledRepositoryIds: m,
            allowRepositorySelection: f,
            openEnvironmentInNewWindow: w,
            onCreateEnvironment: j
        } = n,
        v = oe(),
        C = y.useRef(null);
    let N;
    e[0] !== l || e[1] !== x ? (N = p => {
        x(p), l()
    }, e[0] = l, e[1] = x, e[2] = N) : N = e[2];
    const b = N,
        D = Le(),
        _ = o.length > 0;
    let P;
    if (e[3] !== s || e[4] !== o || e[5] !== a) {
        e: {
            let p;e[7] !== s ? (p = te => te.slice().sort((ie, le) => {
                if (ie.id === s) return -1;
                if (le.id === s) return 1;
                const pe = !!ie.is_pinned,
                    Be = !!le.is_pinned;
                if (pe !== Be) return pe ? -1 : 1;
                const xe = ie.task_count ? ? 0,
                    ge = le.task_count ? ? 0;
                return xe !== ge ? ge - xe : ie.label.localeCompare(le.label)
            }), e[7] = s, e[8] = p) : p = e[8];
            const I = p,
                ee = a.trim().toLowerCase();
            if (!ee) {
                let te;
                e[9] !== o || e[10] !== I ? (te = I(o), e[9] = o, e[10] = I, e[11] = te) : te = e[11], P = te;
                break e
            }
            const re = o.filter(te => (te.label ? ? "").toLowerCase().includes(ee));P = I(re)
        }
        e[3] = s,
        e[4] = o,
        e[5] = a,
        e[6] = P
    }
    else P = e[6];
    const k = P;
    let B;
    e[12] !== k || e[13] !== b ? (B = {
        items: k,
        keyExtractor: Lt,
        onSelect: b
    }, e[12] = k, e[13] = b, e[14] = B) : B = e[14];
    const {
        hoveredId: O,
        setHoveredId: M,
        onKeyDown: F,
        getItemRef: E
    } = Ie(B);
    let S, T;
    e[15] === Symbol.for("react.memo_cache_sentinel") ? (S = () => {
        C.current ? .focus()
    }, T = [], e[15] = S, e[16] = T) : (S = e[15], T = e[16]), y.useEffect(S, T);
    let R;
    e[17] !== u ? (R = p => u(p.target.value), e[17] = u, e[18] = R) : R = e[18];
    let L;
    e[19] !== f || e[20] !== o.length || e[21] !== v ? (L = f ? o.length > 0 ? v.formatMessage({
        id: "wham.codexEnvironmentPopover.searchEnvironmentsTooltip.envless",
        defaultMessage: "Search environments and repos…"
    }) : v.formatMessage({
        id: "wham.codexEnvironmentPopover.searchEnvironmentsTooltip.envlessRepos",
        defaultMessage: "Search repositories…"
    }) : v.formatMessage({
        id: "wham.codexEnvironmentPopover.searchEnvironmentsTooltip.environmentsOnly",
        defaultMessage: "Search environments…"
    }), e[19] = f, e[20] = o.length, e[21] = v, e[22] = L) : L = e[22];
    let H;
    e[23] !== f || e[24] !== v ? (H = f ? v.formatMessage({
        id: "wham.codexEnvironmentPopover.searchEnvironmentsAria.envless",
        defaultMessage: "Search environments and repos"
    }) : v.formatMessage({
        id: "wham.codexEnvironmentPopover.searchEnvironmentsAria.environmentsOnly",
        defaultMessage: "Search environments"
    }), e[23] = f, e[24] = v, e[25] = H) : H = e[25];
    let V;
    e[26] !== F || e[27] !== a || e[28] !== R || e[29] !== L || e[30] !== H ? (V = t.jsx(Ne, {
        ref: C,
        className: "placeholder:text-token-text-tertiary !focus-within:ring-0 my-1.5 w-full border-0 bg-transparent ps-4 outline-none focus:border-0 focus:ring-0 focus:outline-none",
        inputClassName: "text-sm",
        type: "text",
        autoComplete: "off",
        name: "branch-to-add",
        value: a,
        onChange: R,
        onKeyDown: F,
        suppressFocus: !0,
        placeholder: L,
        ariaLabel: H
    }), e[26] = F, e[27] = a, e[28] = R, e[29] = L, e[30] = H, e[31] = V) : V = e[31];
    let U;
    e[32] === Symbol.for("react.memo_cache_sentinel") ? (U = t.jsx("div", {
        className: "bg-token-border-default h-px w-full"
    }), e[32] = U) : U = e[32];
    let A;
    e[33] !== V ? (A = t.jsxs("div", {
        className: "contents",
        onClick: Pt,
        children: [V, U]
    }), e[33] = V, e[34] = A) : A = e[34];
    let $;
    e[35] !== o.length ? ($ = o.length > 0 && t.jsx(se, {
        as: "div",
        className: "text-token-text-tertiary pointer-events-none w-full text-sm",
        label: t.jsx("div", {
            className: "flex items-center gap-2",
            children: t.jsx(J, {
                id: "wham.codexEnvironmentPopover.envlessModeRepositories",
                defaultMessage: "Environments"
            })
        })
    }), e[35] = o.length, e[36] = $) : $ = e[36];
    let G;
    e[37] !== $ ? (G = t.jsx("div", {
        className: "px-1.5 pt-1.5",
        children: $
    }), e[37] = $, e[38] = G) : G = e[38];
    let W;
    e[39] !== s || e[40] !== o.length || e[41] !== k || e[42] !== E || e[43] !== b || e[44] !== O || e[45] !== i || e[46] !== M ? (W = i ? t.jsx("div", {
        className: "px-1.5",
        children: t.jsx("div", {
            className: "flex w-full items-center justify-center py-2",
            children: t.jsx(he, {
                className: "ms-2"
            })
        })
    }) : o.length > 0 ? k.length > 0 ? t.jsx("div", {
        className: "px-1.5",
        children: k.map(p => {
            const I = s === p.id;
            return t.jsx(se, {
                as: "button",
                ref: E(p),
                onMouseEnter: () => M(p.id),
                className: "w-full",
                truncateLabel: !0,
                onClick: () => {
                    b(p.id)
                },
                isVirtualHover: O === p.id,
                isSelected: I,
                label: p.label
            }, p.id)
        })
    }) : t.jsx("div", {
        className: "p-1.5 text-center",
        children: t.jsx("p", {
            className: "text-token-text-tertiary text-sm",
            children: t.jsx(J, {
                id: "wham.environmentPopover.noMatches",
                defaultMessage: "No environments found"
            })
        })
    }) : null, e[39] = s, e[40] = o.length, e[41] = k, e[42] = E, e[43] = b, e[44] = O, e[45] = i, e[46] = M, e[47] = W) : W = e[47];
    let Q;
    e[48] !== f || e[49] !== m || e[50] !== o.length || e[51] !== r || e[52] !== h || e[53] !== c || e[54] !== g || e[55] !== a ? (Q = f ? t.jsx(Ct, {
        onSelectRepository: c,
        existingEnvironmentRepositoryIds: m,
        showRepositoriesHeader: o.length > 0,
        search: a.trim().toLowerCase(),
        repositories: g,
        isLoading: h,
        isError: r
    }) : null, e[48] = f, e[49] = m, e[50] = o.length, e[51] = r, e[52] = h, e[53] = c, e[54] = g, e[55] = a, e[56] = Q) : Q = e[56];
    let q;
    e[57] !== G || e[58] !== W || e[59] !== Q ? (q = t.jsxs("div", {
        className: "flex min-h-0 flex-1 flex-col overflow-y-auto",
        children: [G, W, Q]
    }), e[57] = G, e[58] = W, e[59] = Q, e[60] = q) : q = e[60];
    let z;
    e[61] === Symbol.for("react.memo_cache_sentinel") ? (z = t.jsx("div", {
        className: "bg-token-border-default h-px w-full"
    }), e[61] = z) : z = e[61];
    let X;
    e[62] !== l || e[63] !== _ || e[64] !== D || e[65] !== j || e[66] !== w ? (X = () => {
        if (w) {
            window.open("/codex/settings/environments", "_blank", "noopener,noreferrer"), l();
            return
        }!_ && j ? j() : D("/codex/settings/environments")
    }, e[62] = l, e[63] = _, e[64] = D, e[65] = j, e[66] = w, e[67] = X) : X = e[67];
    let Z;
    e[68] === Symbol.for("react.memo_cache_sentinel") ? (Z = t.jsx(Ve, {
        className: "icon-sm"
    }), e[68] = Z) : Z = e[68];
    let K;
    e[69] !== _ || e[70] !== v ? (K = _ ? v.formatMessage({
        id: "wham.codexEnvironmentPopover.manageEnvironments",
        defaultMessage: "Manage environments"
    }) : v.formatMessage({
        id: "wham.codexEnvironmentPopover.createEnvironment",
        defaultMessage: "Create environment"
    }), e[69] = _, e[70] = v, e[71] = K) : K = e[71];
    let Y;
    e[72] !== X || e[73] !== K ? (Y = t.jsx("div", {
        className: "bg-token-bg-tertiary flex flex-shrink-0 flex-col gap-1 px-2 py-1.5",
        children: t.jsx(se, {
            className: "w-full",
            noDefaultHoverState: !0,
            onClick: X,
            isSelected: !1,
            icon: Z,
            label: K
        }, "environment-action")
    }), e[72] = X, e[73] = K, e[74] = Y) : Y = e[74];
    let d;
    return e[75] !== A || e[76] !== q || e[77] !== Y ? (d = t.jsxs("div", {
        className: "flex max-h-[280px] w-80 flex-col overflow-y-auto rounded-lg md:max-h-[360px]",
        children: [A, q, z, Y]
    }), e[75] = A, e[76] = q, e[77] = Y, e[78] = d) : d = e[78], d
}

function Pt(n) {
    n.stopPropagation()
}

function Lt(n) {
    return n.id
}

function Vt({
    onCreateEnvironment: n,
    showBranchSelector: e,
    filters: a,
    allowRepositorySelection: u,
    openEnvironmentInNewWindow: g
} = {}) {
    const h = Qe(),
        r = oe(),
        {
            isConnected: i,
            isLoading: o,
            openGithubModal: s,
            error: x,
            refetch: l
        } = Ue(we.GITHUB_CONNECTOR, "github", "/codex", be.CODEX),
        c = $e(() => qe(h, we.GITHUB_CONNECTOR, {
            productSku: be.CODEX
        }));
    return o ? t.jsx(_e, {
        className: "h-9"
    }) : x ? t.jsx(ce, {
        label: r.formatMessage({
            id: "wham.whamComposerEnvironmentsSelector.failedClickToRetry",
            defaultMessage: "Click to retry"
        }),
        children: t.jsx(ue, {
            color: "secondary",
            type: "button",
            className: "border-token-border-default flex w-fit items-center gap-1.5 rounded-full! border",
            onClick: l,
            children: t.jsxs("div", {
                className: "flex items-center gap-1.5",
                children: [t.jsx(Ce, {
                    "aria-hidden": !0,
                    className: "icon-sm"
                }), t.jsx(J, {
                    id: "wham.environmentsSelector.retry",
                    defaultMessage: "Failed to load environments"
                })]
            })
        })
    }) : c ? t.jsx(t.Fragment, {
        children: t.jsx("div", {
            className: "z-0 flex h-full w-full justify-between",
            children: i ? t.jsx("div", {
                className: "flex gap-4",
                children: t.jsx(_t, {
                    onCreateEnvironment: n,
                    showBranchSelector: e ? ? !0,
                    allowRepositorySelection: u ? ? !0,
                    filters: a ? ? null,
                    openEnvironmentInNewWindow: g
                })
            }) : t.jsx("div", {
                className: "flex h-full items-center gap-2",
                children: t.jsxs(ue, {
                    type: "button",
                    color: "secondary",
                    size: "small",
                    onClick: s,
                    children: [t.jsx(fe, {
                        "aria-hidden": !0,
                        className: "icon-sm me-1.5"
                    }), t.jsx(J, {
                        id: "wham.environmentsSelector.connectGithub",
                        defaultMessage: "Connect GitHub"
                    })]
                })
            })
        })
    }) : t.jsx(ce, {
        label: r.formatMessage({
            id: "wham.whamComposerEnvironmentsSelector.disabledByWorkspaceAdmin",
            defaultMessage: "Disabled by workspace admin"
        }),
        children: t.jsxs(ue, {
            type: "button",
            color: "secondary",
            onClick: s,
            disabled: !0,
            children: [t.jsx(fe, {
                "aria-hidden": !0,
                className: "icon-sm me-1.5"
            }), t.jsx(J, {
                id: "wham.environmentsSelector.connectGithub",
                defaultMessage: "Connect GitHub"
            })]
        })
    })
}
export {
    se as C, fe as G, Vt as W, Me as a, Kt as b, _t as c, xt as d, Et as g
};
//# sourceMappingURL=e7a416e4-lwnhgy5dnf3htcv0.js.map