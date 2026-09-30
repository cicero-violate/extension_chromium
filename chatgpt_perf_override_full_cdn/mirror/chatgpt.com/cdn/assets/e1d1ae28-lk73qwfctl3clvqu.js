import {
    jH as d,
    bS as i,
    jG as n
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    r as u,
    a as c,
    l as p
} from "./2478e8be-fu39n45z77ccw3bg.js";
const s = (a, e) => {
        if (!a || !e) return !0;
        const t = Date.parse(a),
            r = Date.parse(e);
        return Number.isNaN(t) || Number.isNaN(r) ? !0 : t >= r
    },
    l = {
        carts: [],
        status: "idle",
        error: void 0,
        hasLoaded: !1,
        lastUpdated: void 0
    },
    m = i(() => n((a, e) => ({ ...l,
        setCarts: (t, r) => a(o => s(r, o.lastUpdated) ? {
            carts: [...t],
            status: "idle",
            error: void 0,
            hasLoaded: !0,
            lastUpdated: r ? ? o.lastUpdated
        } : o),
        refreshCarts: async () => {
            a({
                status: "loading",
                error: void 0
            });
            try {
                const t = await p();
                if (!s(t.timestamp, e().lastUpdated)) return;
                a({
                    carts: t.carts,
                    status: "idle",
                    error: void 0,
                    hasLoaded: !0,
                    lastUpdated: t.timestamp ? ? e().lastUpdated
                })
            } catch (t) {
                a({
                    status: "error",
                    error: t instanceof Error ? t.message : "Failed to load carts",
                    hasLoaded: !0
                })
            }
        },
        addItem: async t => {
            a({
                status: "loading",
                error: void 0
            });
            try {
                const r = await c(t);
                return s(r.timestamp, e().lastUpdated) && a({
                    carts: r.carts,
                    status: "idle",
                    error: void 0,
                    hasLoaded: !0,
                    lastUpdated: r.timestamp
                }), r
            } catch (r) {
                return a({
                    status: "error",
                    error: r instanceof Error ? r.message : "Failed to add item",
                    hasLoaded: !0
                }), null
            }
        },
        removeItem: async t => {
            a({
                status: "loading",
                error: void 0
            });
            try {
                const r = await u(t);
                return s(r.timestamp, e().lastUpdated) && a({
                    carts: r.carts,
                    status: "idle",
                    error: void 0,
                    hasLoaded: !0,
                    lastUpdated: r.timestamp
                }), r
            } catch (r) {
                return a({
                    status: "error",
                    error: r instanceof Error ? r.message : "Failed to remove item",
                    hasLoaded: !0
                }), null
            }
        }
    }))),
    v = () => d(m()),
    g = a => a.reduce((e, t) => e + (t.items ? .length ? ? 0), 0);
export {
    g,
    v as u
};
//# sourceMappingURL=e1d1ae28-lk73qwfctl3clvqu.js.map