import {
    bQ as l,
    jl as $,
    a$ as n,
    v_ as m,
    R as c,
    d as i,
    iD as g
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    q as u
} from "./2340486e-dvd8m80i7d6hyild.js";
import "./b9ebfa06-dm8xq0zfweyjlyrr.js";
import {
    bE as f
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";

function y() {
    return u({
        queryKey: ["personalityOnboarding"],
        queryFn: () => c.safeGet("/personality_onboarding", {})
    })
}
l(y);
class h {
    constructor(t, a, s, r = {}) {
        this.ctx = t, this.flow = a, this.selectedPersonality$ = i(r.selectedPersonality$ ? ? null), this.selectedTraits$ = i(r.selectedTraits$ ? ? []), this.mode = s, this.logging = f(s), this.mockData$ = i(r.mockData$ ? ? null), this.serverData$ = l(() => y()), this.serverDataPromise = this.watchServerData()
    }
    selectedPersonality$;
    selectedTraits$;
    serverData$;
    logging;
    mode;
    mockData$;
    serverDataPromise;
    watchServerData() {
        let t, a;
        const s = new Promise((r, o) => {
            t = r, a = o
        });
        return g(() => {
            const r = this.serverData$();
            r.status === "success" ? t(r.data) : r.status === "error" && a(r.error)
        }), s
    }
    intervalSec$ = n(() => this.serverData$().data ? .interval_sec ? ? 4);
    personalities$ = n(() => {
        let t = [],
            a = this.selectedPersonality$();
        const s = this.mockData$(),
            o = (s ? {
                data: s
            } : null) ? ? this.serverData$();
        return o.data ? .default_personality_key && (a = o.data.default_personality_key), t = o.data ? .personalities ? ? [], t.map(p => ({ ...p,
            selected$: i(a === p.key)
        }))
    });
    traits$ = n(() => {
        const t = this.mockData$(),
            s = (t ? {
                data: t
            } : null) ? ? this.serverData$();
        return !s || !s.data || !s.data.traits ? [] : s.data.traits.map(r => ({ ...r,
            selected$: i(this.selectedTraits$().includes(r.key))
        }))
    })
}

function D(e, t, a, s) {
    return new h(e, t, a, s)
}
const S = $(D),
    P = l(y),
    k = n(() => {
        const e = P();
        return e.status === "success" ? e.data : null
    }, {
        getServerFallback() {
            return null
        }
    });

function v() {
    return u({
        queryKey: ["personalityTypeList"],
        queryFn: () => c.safeGet("/personality_types", {})
    })
}

function b() {
    return u({
        queryKey: ["traitsList"],
        queryFn: () => c.safeGet("/personality_trait_types", {})
    })
}
const d = l(v),
    _ = l(b);
n(() => {
    const e = k();
    return e ? e ? .can_close_onboarding ? ? !0 : null
});
const Q = n(() => {
        const e = _(),
            t = [];
        return !e || !e.data || !e.data.trait_types ? t : e.data ? .trait_types
    }),
    R = n(() => {
        const e = d();
        return e ? e.data ? ? [] : []
    }),
    w = n(() => {
        const e = d();
        if (!e) return null;
        const t = m();
        return e.data ? .find(s => s.key === t)
    });
export {
    R as a, d as b, w as c, _ as d, S as g, k as p, Q as t
};
//# sourceMappingURL=52878ea3-gn3j7ui61y2jybs7.js.map