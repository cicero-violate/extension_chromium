import {
    c as p,
    n as M,
    s as O,
    r as Q,
    z as l,
    m as R,
    K as A,
    a9 as U
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    e7 as k,
    bi as N
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    hZ as W
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    W as u,
    i as H
} from "./cf64444f-b0z8ffdp5xu532do.js";
const D = "tab";

function I(t) {
    switch (t) {
        case "code_reviews":
            return "code_reviews";
        case "security_reviews":
            return "security_reviews";
        case "archived":
            return "archived";
        default:
            return "all"
    }
}

function C(t) {
    return t === "archived" ? "archived" : t === "code_reviews" ? "code_review" : t === "security_reviews" ? "security_review" : "current"
}

function ue() {
    "use forget";
    const t = p.c(19),
        e = M(),
        s = O(),
        r = W(x),
        a = W(V);
    let n;
    t[0] !== e.search ? (n = new URLSearchParams(e.search), t[0] = e.search, t[1] = n) : n = t[1];
    const i = n;
    let c, o;
    t[2] !== i ? (c = i.get(D), o = I(c), t[2] = i, t[3] = c, t[4] = o) : (c = t[3], o = t[4]);
    const g = o,
        h = c != null,
        m = h ? g : r;
    let T, w;
    t[5] !== m || t[6] !== a || t[7] !== r ? (T = () => {
        r !== m && a(m)
    }, w = [m, a, r], t[5] = m, t[6] = a, t[7] = r, t[8] = T, t[9] = w) : (T = t[8], w = t[9]), Q.useEffect(T, w);
    let d;
    t[10] !== e.pathname || t[11] !== e.search || t[12] !== s || t[13] !== a ? (d = v => {
        a(v);
        const q = new URLSearchParams(e.search);
        q.set(D, v), s({
            pathname: e.pathname,
            search: q.toString()
        }, {
            replace: !0
        })
    }, t[10] = e.pathname, t[11] = e.search, t[12] = s, t[13] = a, t[14] = d) : d = t[14];
    const _ = d;
    let f;
    return t[15] !== h || t[16] !== m || t[17] !== _ ? (f = {
        homeTab: m,
        setHomeTab: _,
        hasExplicitTab: h
    }, t[15] = h, t[16] = m, t[17] = _, t[18] = f) : f = t[18], f
}

function V(t) {
    return t.setHomeTabValue
}

function x(t) {
    return t.homeTab
}
const E = ["wham", "environments", "with-creators", "infinite"],
    K = ["wham", "environments", "with-creators", "list"],
    b = ["wham", "recent_environments"];

function oe(t) {
    return [...E, {
        pageSize: t.pageSize,
        enforceRepoAccess: t.enforceRepoAccess
    }]
}
const y = 60 * 1e3,
    ce = (t, e, s) => ({
        staleTime: 0,
        queryKey: ["wham", "task", t, e],
        enabled: !!t && !!e,
        queryFn: () => u.getTaskTurn(t ? ? "", e ? ? ""),
        ...s || {}
    }),
    $ = (t, e) => ({
        queryKey: ["wham", "task", t],
        staleTime: 0,
        enabled: !!t,
        queryFn: async () => await u.getTaskDetails(t ? ? ""),
        ...e || {}
    }),
    le = (t, e) => {
        const s = $(t, e);
        return l(s)
    },
    L = 19;

function P(t) {
    return A({
        queryKey: ["wham", "tasks", t],
        queryFn: ({
            pageParam: e
        }) => u.getTasksForList(L, e ? ? null, t),
        initialPageParam: null,
        getNextPageParam: ({
            cursor: e
        }) => e,
        staleTime: 15 * 1e3
    })
}

function z(t) {
    return A({
        queryKey: ["wham", "tasks", "search", t],
        queryFn: ({
            pageParam: e
        }) => u.searchTasks(t, L, e ? ? null),
        initialPageParam: null,
        getNextPageParam: ({
            cursor: e
        }) => e,
        staleTime: 15 * 1e3
    })
}

function me({
    filter: t,
    enabled: e = !0,
    refetchOnMount: s = !1,
    refetchOnWindowFocus: r = !1
} = {}) {
    const a = W(({
            homeTab: i
        }) => i),
        n = t ? ? C(a);
    return R({ ...P(n),
        enabled: e,
        refetchOnMount: s,
        refetchOnWindowFocus: r
    })
}

function fe({
    query: t,
    enabled: e = !0,
    refetchOnMount: s = !1,
    refetchOnWindowFocus: r = !1
}) {
    const a = t.trim();
    return R({ ...z(a),
        enabled: e && a.length > 0,
        refetchOnMount: s,
        refetchOnWindowFocus: r
    })
}

function he({
    enabled: t = !0
} = {}) {
    return l({
        queryKey: ["wham", "tasks", "has-any"],
        queryFn: async () => ((await u.getTasksForList(1, null, "all")).items ? .length ? ? 0) > 0,
        enabled: t
    })
}

function ye() {
    return R({ ...P("all"),
        select: t => (t.pages[0] ? .items ? .length ? ? 0) >= 5
    })
}

function ge(t) {
    "use forget";
    const e = p.c(18),
        s = W(Y),
        r = W(G);
    let a;
    e[0] !== t || e[1] !== s ? (a = typeof t == "function" ? t(s) : t, e[0] = t, e[1] = s, e[2] = a) : a = e[2];
    const n = a;
    let i;
    e[3] !== n ? (i = n ? ? {}, e[3] = n, e[4] = i) : i = e[4];
    const {
        staleTime: c,
        enabled: o,
        refetchOnWindowFocus: g,
        refetchInterval: h
    } = i, m = c === void 0 ? y : c, T = o === void 0 ? !0 : o, w = g === void 0 ? !1 : g;
    let d;
    e[5] === Symbol.for("react.memo_cache_sentinel") ? (d = ["wham", "usage", "rate-limit-status"], e[5] = d) : d = e[5];
    let _;
    e[6] !== T || e[7] !== h || e[8] !== w || e[9] !== m ? (_ = {
        queryKey: d,
        queryFn: B,
        staleTime: m,
        retry: !1,
        enabled: T,
        refetchOnWindowFocus: w,
        refetchInterval: h
    }, e[6] = T, e[7] = h, e[8] = w, e[9] = m, e[10] = _) : _ = e[10];
    const f = l(_);
    let v, q;
    e[11] !== f.data || e[12] !== r ? (v = () => {
        typeof f.data > "u" || r(f.data ? ? null)
    }, q = [f.data, r], e[11] = f.data, e[12] = r, e[13] = v, e[14] = q) : (v = e[13], q = e[14]), Q.useEffect(v, q);
    let F;
    return e[15] !== f || e[16] !== s ? (F = { ...f,
        data: s
    }, e[15] = f, e[16] = s, e[17] = F) : F = e[17], F
}

function B() {
    return u.getRateLimitStatus()
}

function G(t) {
    return t.setRateLimitStatus
}

function Y(t) {
    return t.getRateLimitStatus()
}

function de(t) {
    "use forget";
    const e = p.c(5);
    let s;
    e[0] !== t ? (s = {}, e[0] = t, e[1] = s) : s = e[1];
    const {
        staleTime: r
    } = s, a = r === void 0 ? y : r;
    let n;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (n = ["wham", "usage", "daily-token-usage-breakdown"], e[2] = n) : n = e[2];
    let i;
    return e[3] !== a ? (i = {
        queryKey: n,
        queryFn: j,
        staleTime: a,
        retry: !1
    }, e[3] = a, e[4] = i) : i = e[4], l(i)
}

function j() {
    return u.getDailyTokenUsageBreakdown()
}

function pe(t) {
    "use forget";
    const e = p.c(6);
    let s;
    e[0] !== t ? (s = t === void 0 ? {} : t, e[0] = t, e[1] = s) : s = e[1];
    const {
        staleTime: r,
        enabled: a
    } = s, n = r === void 0 ? y : r, i = a === void 0 ? !0 : a;
    let c;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (c = ["wham", "usage", "daily-enterprise-token-usage-breakdown"], e[2] = c) : c = e[2];
    let o;
    return e[3] !== i || e[4] !== n ? (o = {
        queryKey: c,
        queryFn: X,
        staleTime: n,
        retry: !1,
        enabled: i
    }, e[3] = i, e[4] = n, e[5] = o) : o = e[5], l(o)
}

function X() {
    return u.getDailyEnterpriseTokenUsageBreakdown()
}

function Te(t) {
    "use forget";
    const e = p.c(6);
    let s;
    e[0] !== t ? (s = {}, e[0] = t, e[1] = s) : s = e[1];
    const {
        staleTime: r,
        enabled: a
    } = s, n = r === void 0 ? y : r, i = a === void 0 ? !0 : a;
    let c;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (c = ["wham", "usage", "credit-usage-events"], e[2] = c) : c = e[2];
    let o;
    return e[3] !== i || e[4] !== n ? (o = {
        queryKey: c,
        queryFn: Z,
        staleTime: n,
        retry: !1,
        enabled: i
    }, e[3] = i, e[4] = n, e[5] = o) : o = e[5], l(o)
}

function Z() {
    return u.getCreditUsageEvents()
}

function we({
    retry: t = 0,
    enabled: e = !0
} = {}) {
    return l({
        queryKey: ["wham", "environments"],
        queryFn: () => u.getEnvironments(),
        retry: t,
        enabled: e
    })
}

function _e({
    retry: t = 0
} = {}) {
    return l({
        queryKey: b,
        queryFn: () => u.getRecentEnvironments(),
        retry: t
    })
}

function ve() {
    return l({
        queryKey: ["wham", "githubLogin"],
        queryFn: () => u.getUserHandle()
    })
}

function qe(t = !0) {
    return l({
        queryKey: ["wham", "githubInstallationsV2"],
        queryFn: () => u.getGithubInstallationsV2(),
        staleTime: 0,
        refetchOnWindowFocus: !0,
        refetchOnMount: !0,
        enabled: t
    })
}

function We() {
    return l({
        queryKey: ["wham", "tasks", "samples"],
        queryFn: () => u.getSampleTasks(10, null)
    })
}

function Ee(t, e, s) {
    const r = { ...e,
        creator: s
    };
    t.setQueryData(["wham", "environments"], a => a ? [e, ...a] : [e]), t.getQueriesData({
        queryKey: E
    }).forEach(([a]) => {
        t.setQueryData(a, n => n && k(n, i => {
            i.pages.length > 0 && i.pages[0].items.unshift(r)
        }))
    }), t.getQueriesData({
        queryKey: K
    }).forEach(([a]) => {
        t.setQueryData(a, n => n ? [r, ...n] : [r])
    }), t.setQueryData(b, a => {
        if (!a) return a;
        const n = a.filter(i => i.id !== e.id);
        return [e, ...n]
    })
}

function be(t, e) {
    t.setQueryData(["wham", "environments"], s => s ? .filter(r => r.id !== e)), t.getQueriesData({
        queryKey: E
    }).forEach(([s]) => {
        t.setQueryData(s, r => r && k(r, a => {
            a.pages.forEach(n => {
                n.items = n.items.filter(i => i.id !== e)
            })
        }))
    }), t.getQueriesData({
        queryKey: K
    }).forEach(([s]) => {
        t.setQueryData(s, r => r ? .filter(a => a.id !== e))
    }), t.setQueryData(b, s => s ? .filter(r => r.id !== e))
}

function Ke(t, e, s) {
    t.setQueryData(["wham", "environments"], r => r ? .map(a => a.id === e ? s : a)), t.getQueriesData({
        queryKey: E
    }).forEach(([r]) => {
        t.setQueryData(r, a => a && k(a, n => {
            n.pages.forEach(i => {
                i.items = i.items.map(c => c.id === e ? { ...c,
                    ...s
                } : c)
            })
        }))
    }), t.setQueryData(["environments", e, "withCreatorAndMachine"], r => r ? { ...r,
        ...s
    } : void 0), t.getQueriesData({
        queryKey: K
    }).forEach(([r]) => {
        t.setQueryData(r, a => a ? .map(n => n.id === e ? { ...n,
            ...s
        } : n))
    }), t.setQueryData(b, r => r ? .map(a => a.id === e ? { ...a,
        ...s
    } : a))
}

function Fe(t) {
    return l({
        queryKey: ["environments", t, "withCreatorAndMachine"],
        queryFn: () => u.getEnvironmentWithCreatorAndMachine(t)
    })
}

function Re() {
    return l({
        queryKey: ["wham", "userPreferences"],
        queryFn: () => u.getUserPreferences()
    })
}

function Se() {
    return l({
        queryKey: ["wham", "githubInstallationEventsV2"],
        queryFn: () => u.getGithubInstallationEventsV2(),
        staleTime: 0,
        refetchOnWindowFocus: !0,
        refetchOnMount: !0
    })
}

function J(t) {
    if (!t) return null;
    let e = t.trim().toLowerCase();
    if (!e) return null;
    const s = ["https://", "http://"];
    for (const i of s)
        if (e.startsWith(i)) {
            e = e.slice(i.length);
            break
        }
    for (e.startsWith("www.") && (e = e.slice(4)), e.startsWith("github.com/") && (e = e.slice(11)), e.endsWith(".git") && (e = e.slice(0, -4)); e.startsWith("/");) e = e.slice(1);
    for (; e.endsWith("/");) e = e.slice(0, -1);
    const r = e.split("/").filter(Boolean);
    if (r.length < 2) return null;
    const [a, n] = r;
    return !a || !n ? null : `${a}/${n}`
}
const ee = 20;

function ke(t, e = {}) {
    const s = t.trim(),
        r = e.installationIds,
        a = r ? [...r].sort() : void 0,
        n = e.limit ? ? ee,
        i = s.length > 0,
        c = a;
    return R({
        queryKey: ["wham", "codeReviewRepositories", "v2", s, a, n],
        initialPageParam: 1,
        queryFn: async ({
            pageParam: o
        }) => {
            const g = J(s),
                h = o == null || o === 1;
            if (g && h) try {
                return {
                    repo_review_settings: [await u.getCodeReviewRepository("github", g)],
                    next_token: null
                }
            } catch (m) {
                if (!(m instanceof N && (m.status === 400 || m.status === 403 || m.status === 404))) throw m
            }
            return i ? u.searchCodeReviewRepositories({
                query: s,
                limit: n,
                installationIds: c,
                page: typeof o == "number" ? o : 1
            }) : u.getCodeReviewRepositories({
                page: typeof o == "number" ? o : 1,
                perPage: n,
                search: s || void 0
            })
        },
        getNextPageParam: (o, g) => (o ? .repo_review_settings ? .length ? ? 0) < n ? null : g.length + 1,
        refetchOnWindowFocus: !0
    })
}

function De() {
    return l({
        queryKey: ["wham", "userPreferencesConfig"],
        queryFn: () => u.getUserPreferencesConfig()
    })
}
async function Qe(t) {
    await Promise.all([t.invalidateQueries({
        queryKey: ["wham", "environments"]
    }), t.invalidateQueries({
        queryKey: E
    }), t.invalidateQueries({
        queryKey: K
    }), t.invalidateQueries({
        queryKey: b
    })])
}
async function Ae(t, e) {
    await Promise.all([t.invalidateQueries({
        queryKey: ["environments", e, "withCreatorAndMachine"]
    }), t.invalidateQueries({
        queryKey: E
    }), t.invalidateQueries({
        queryKey: K
    }), t.invalidateQueries({
        queryKey: b
    })])
}

function Le(t) {
    return t.invalidateQueries({
        queryKey: ["wham", "userPreferences"]
    })
}

function Pe(t) {
    const e = W(s => s.addTurnToTaskMap);
    return l({
        queryKey: ["wham", "task", t, "turns"],
        queryFn: async () => {
            const s = await u.getTurns(t ? ? "");
            return Object.values(s.turn_mapping).forEach(r => {
                e(t ? ? "", r.turn)
            }), s
        },
        enabled: !!t,
        staleTime: 15 * 1e3,
        refetchOnWindowFocus: !0,
        refetchOnMount: !0
    })
}

function Me(t, e) {
    return l({
        queryKey: ["wham", "task", t, "turns", e, "logs"],
        queryFn: () => u.getTurnLogs(t ? ? "", e ? ? ""),
        enabled: !!t && !!e
    })
}

function Oe(t, e, s) {
    return l({
        queryKey: ["wham", "task", t, "turns", e, "latest"],
        enabled: s && !!t && !!e,
        queryFn: () => u.getLatestTaskTurns(t ? ? "", e ? ? ""),
        staleTime: 0,
        refetchInterval: ({
            state: r
        }) => r.data && r.data ? .latest_turns ? .every(i => H(i.turn_status)) ? !1 : 5e3
    })
}

function S(t) {
    if (t != null) {
        if (Array.isArray(t)) return t.map(S);
        if (typeof t == "object" && t !== null) {
            const e = {};
            for (const [s, r] of Object.entries(t)) {
                const a = S(r);
                a !== void 0 && (e[s] = a)
            }
            return e
        }
        return t
    }
}

function te(t) {
    return t == null || typeof t != "object" || !("openapi" in t) ? null : S(t)
}

function Ue({
    enabled: t = !0
} = {}) {
    return l({
        queryKey: ["wham", "analytics", "api-reference"],
        queryFn: () => u.getAnalyticsApiReference(),
        staleTime: y,
        enabled: t,
        select: te
    })
}

function Ne({
    enabled: t = !0
} = {}) {
    return l({
        queryKey: ["wham", "analytics", "daily-code-review-metrics"],
        queryFn: () => u.getDailyCodeReviewMetrics(),
        staleTime: y,
        enabled: t
    })
}

function He() {
    return l({
        queryKey: ["wham", "analytics", "daily-workspace-usage-counts"],
        queryFn: () => u.getDailyWorkspaceUsageCounts(),
        staleTime: y
    })
}

function Ie({
    enabled: t = !0,
    includeEmails: e = !1
} = {}) {
    return l({
        queryKey: ["wham", "analytics", "daily-sessions-messages-counts", e],
        queryFn: () => u.getDailySessionsMessagesCounts({
            includeEmails: e
        }),
        staleTime: y,
        enabled: t
    })
}

function Ce(t) {
    "use forget";
    const e = p.c(5);
    let s;
    e[0] !== t ? (s = t === void 0 ? {} : t, e[0] = t, e[1] = s) : s = e[1];
    const {
        enabled: r
    } = s, a = r === void 0 ? !1 : r;
    let n;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (n = ["wham", "analytics", "daily-skill-usage-metrics"], e[2] = n) : n = e[2];
    let i;
    return e[3] !== a ? (i = {
        queryKey: n,
        queryFn: se,
        staleTime: y,
        enabled: a
    }, e[3] = a, e[4] = i) : i = e[4], l(i)
}

function se() {
    return u.getDailySkillUsageMetrics()
}

function Ve(t) {
    "use forget";
    const e = p.c(7),
        {
            windowDays: s,
            page: r,
            pageSize: a,
            clientIds: n,
            sortBy: i,
            sortDirection: c
        } = t;
    let o;
    return e[0] !== n || e[1] !== r || e[2] !== a || e[3] !== i || e[4] !== c || e[5] !== s ? (o = {
        queryKey: ["wham", "analytics", "usage-leaderboard", s, r, a, n, i, c],
        queryFn: async () => ({
            page: r,
            response: await u.getUsageLeaderboard({
                windowDays: s,
                page: r,
                pageSize: a,
                clientIds: n,
                sortBy: i,
                sortDirection: c
            })
        }),
        placeholderData: U,
        staleTime: y
    }, e[0] = n, e[1] = r, e[2] = a, e[3] = i, e[4] = c, e[5] = s, e[6] = o) : o = e[6], l(o)
}

function xe(t) {
    "use forget";
    const e = p.c(2);
    let s;
    return e[0] !== t ? (s = {
        queryKey: ["wham", "repositories", "repository-row-section", t],
        queryFn: async () => t.length === 0 ? await u.listRepositories({
            page: 1,
            per_page: 10
        }) : await u.searchRepositoriesAllInstallations({
            query: t,
            limit: 10
        }),
        staleTime: 6e4
    }, e[0] = t, e[1] = s) : s = e[1], l(s)
}

function $e(t, e) {
    "use forget";
    const s = p.c(7);
    let r, a;
    s[0] !== t ? (r = ["wham", "usage", "approximate-credit-usage", t], a = () => u.getApproximateCreditUsage(t), s[0] = t, s[1] = r, s[2] = a) : (r = s[1], a = s[2]);
    const n = e ? .enabled ? ? !0;
    let i;
    return s[3] !== r || s[4] !== a || s[5] !== n ? (i = {
        queryKey: r,
        queryFn: a,
        enabled: n,
        staleTime: y
    }, s[3] = r, s[4] = a, s[5] = n, s[6] = i) : i = s[6], l(i)
}
export {
    pe as A, Te as B, ee as C, Ve as D, Ne as E, Ce as F, He as G, Ie as H, xe as I, _e as J, Oe as K, C as L, ye as M, Me as N, We as O, ue as P, P as Q, E as W, Ae as a, Le as b, $e as c, Fe as d, Ke as e, we as f, he as g, fe as h, Qe as i, ce as j, b as k, qe as l, ke as m, ge as n, le as o, Ee as p, Pe as q, be as r, me as s, ve as t, Ue as u, Re as v, oe as w, De as x, Se as y, de as z
};
//# sourceMappingURL=af7de5ed-hluw7l4ayzlk3ze4.js.map