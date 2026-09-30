import {
    eC as g,
    n as v,
    fW as w,
    w1 as C,
    D as _,
    w2 as A
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    bP as F,
    bQ as T,
    bR as q,
    bS as x
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    r as i,
    z as P
} from "./2340486e-dvd8m80i7d6hyild.js";
const c = 300 * 1e3,
    Q = 30 * 1e3;

function L(l, y, m, f, h) {
    const s = i.useContext(F) ? .serverSharedThreadId,
        r = T(m),
        p = i.useMemo(() => ({
            asset_pointer: r,
            content_type: g.ArbitraryAssetPointer
        }), [r]),
        o = q(),
        E = !v(),
        n = w(y),
        t = x.makeQueryOptions({
            asset: p,
            sharedThreadId: s,
            postId: o,
            gizmoId: void 0,
            isUnauthenticated: E,
            conversationId: s ? void 0 : n
        }),
        a = C(),
        I = !!(l && (n || s || o) && r && t.enabled),
        d = t.queryFn;
    if (typeof d == "symbol") throw Error("Unexpected symbol query fn...");
    return P({
        queryKey: t.queryKey,
        queryFn: async b => {
            try {
                const e = await d(b);
                return f ? .(e.url), {
                    status: "success",
                    download_url: e.url
                }
            } catch (e) {
                _.addError(e);
                let u = a("default_download_link_error", {
                    fileName: r
                });
                throw e instanceof A && e.code != null && (u = a(e.code)), h ? .(u), e
            }
        },
        enabled: I,
        staleTime: c,
        gcTime: Q,
        refetchInterval: c,
        refetchOnWindowFocus: !0
    })
}
export {
    L as u
};
//# sourceMappingURL=e04c699b-c1yj8j54x1smqexb.js.map