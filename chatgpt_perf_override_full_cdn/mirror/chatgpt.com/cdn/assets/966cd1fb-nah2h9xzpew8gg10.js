import {
    Y as z,
    c as B,
    r as M,
    ac as G,
    Z as H,
    B as N,
    x as F,
    j as e,
    a0 as U
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    C as V
} from "./47edf3d1-kep97c5boao7mh9l.js";
import {
    Mt as k,
    Mv as d,
    vG as _,
    mz as w,
    eK as Z,
    mb as $,
    tb as A,
    D as Y
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    r as J,
    Ch as W,
    Qa as X,
    Qb as L,
    rk as tt,
    lu as et,
    Qc as ot
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    P as rt
} from "./97587f90-ossabf8p826uhphr.js";
import "./ecba71b4-jgxp9f97lbrsokiw.js";
import "./52022a5f-jdp1c9qxwc35bble.js";
import "./84e8f385-lndtlkfi7kijfbdy.js";
import "./7f00cfec-f04y2v5idy58f22s.js";
import "./b9ebfa06-dm8xq0zfweyjlyrr.js";
import "./1e924491-oclxttbn9pyl5l8t.js";
import "./e9c129e0-obrrz3bfgobj5kgi.js";
import "./1374e329-qvt9e0gdcdlluaod.js";
import "./8a0ea239-e4wrtq50jjqmk3pj.js";
import "./e21b3b3f-kmcsjww08yol2h37.js";
import "./9bee0952-mp1gcgn6jckvpws6.js";
import "./1bc04b52-ud6fhzv6uahbvpse.js";
import "./929b8f98-n5a152jpew1p3rsl.js";
import "./32867333-oem65mfnc75cw7w7.js";
import "./d5b1a7e0-di9ny29tenjwy6rl.js";
import "./c41e33f5-ibnnr1vsfllithl8.js";
import "./48fd09b9-hd5x0odfr6dgdtaz.js";
import "./5373c7f8-h4l09ncnnop7wabg.js";
import "./5ff05818-cf0xcd1p0waiidym.js";
import "./52878ea3-gn3j7ui61y2jybs7.js";
import "./416006a5-op0fk850e02r5e8e.js";
import "./d70d5a79-mdlj2wo46kax6t6t.js";
import "./6fd89734-e246szx8pk7yijni.js";
import "./26c0a75b-ohajenatbq3bkll5.js";
import "./b81d67c1-edign3dbahpky6bz.js";
import "./db62250d-jvde196a4722ll12.js";
import "./089c718c-l3mqz3tt2i5t2xnq.js";
import "./dbb95ee5-os3gqq1d4z22oosn.js";
import "./9ed9a415-g39uishgri10upf4.js";
import "./28938d3c-ntjvzk8j4ndk27zo.js";
import "./5983c1e5-d8kn80dssel0a0ls.js";
import "./6b0acf80-v75u2yrmjosfantg.js";
import "./37827fd8-na0njwv6fxmwz5r3.js";
import "./53ae691e-bsyqlm293qvxnzel.js";
import "./07d15c0a-iwqvt02p4gf8bqji.js";
import "./de6c4a91-ewa7my738fxqmse2.js";
import "./20b859e0-gykwswuufj2yhl9f.js";
import "./677acd42-bn1yi1ernukdhe14.js";
const T = {
        IIM: !1
    },
    st = {
        IIM: !0
    },
    Wt = () => (J(), {
        prefetchSearch: null
    }),
    Xt = ({
        currentUrl: o,
        nextUrl: t
    }) => {
        const r = o.searchParams,
            s = t.searchParams;
        return r.get(A) !== s.get(A) || r.get("q") !== s.get("q")
    },
    te = z(function() {
        "use forget";
        const t = B.c(31);
        M.useState(pt);
        const {
            conversationId: r
        } = G(), {
            prefetchSearchPromises: s,
            shouldPrefetchModels: S,
            shouldPrefetchInternalModels: C,
            shouldPrefetchStarterPrompts: E,
            shouldPrefetchHistory: j,
            shouldPrefetchStarredConversations: v
        } = H(), y = W();
        let h, g;
        t[0] !== y ? (h = () => {
            if (y) return X()
        }, g = [y], t[0] = y, t[1] = h, t[2] = g) : (h = t[1], g = t[2]), M.useEffect(h, g);
        const P = N();
        for (const D of P) {
            const f = D.loaderData;
            if (!f || typeof f != "object") continue;
            const I = Reflect.get(f, "gizmoIdAlias");
            if (!I || typeof I != "object") continue;
            const q = Reflect.get(I, "alias"),
                K = Reflect.get(I, "gizmoId");
            if (typeof q == "string" && typeof K == "string") {
                k(q, K);
                break
            }
        }
        let R;
        t[3] !== P ? (R = P.some(nt), t[3] = P, t[4] = R) : R = t[4];
        const Q = R,
            c = F();
        let x, O;
        t[5] !== c ? (x = () => {
            const D = [L(c, w(T), at), L(c, Z.queryKey, it)];
            return () => {
                for (const f of D) f()
            }
        }, O = [c], t[5] = c, t[6] = x, t[7] = O) : (x = t[6], O = t[7]), M.useEffect(x, O);
        let i;
        t[8] !== Q ? (i = Q ? e.jsx(U, {}) : void 0, t[8] = Q, t[9] = i) : i = t[9];
        let a;
        t[10] !== r || t[11] !== i ? (a = e.jsx(V, {
            urlThreadId: r,
            children: i
        }), t[10] = r, t[11] = i, t[12] = a) : a = t[12];
        let n;
        t[13] !== S ? (n = S && e.jsx(d, {
            queryOptions: _(T)
        }), t[13] = S, t[14] = n) : n = t[14];
        let p;
        t[15] !== C ? (p = C && e.jsx(d, {
            queryOptions: _(st)
        }), t[15] = C, t[16] = p) : p = t[16];
        let m;
        t[17] !== E ? (m = E && e.jsx(d, {
            queryOptions: tt()
        }), t[17] = E, t[18] = m) : m = t[18];
        let u;
        t[19] !== j ? (u = j && e.jsx(d, {
            queryOptions: $()
        }), t[19] = j, t[20] = u) : u = t[20];
        let l;
        t[21] !== v ? (l = v && e.jsx(d, {
            queryOptions: et()
        }), t[21] = v, t[22] = l) : l = t[22];
        let b;
        return t[23] !== s || t[24] !== u || t[25] !== l || t[26] !== a || t[27] !== n || t[28] !== p || t[29] !== m ? (b = e.jsxs(rt.Provider, {
            value: s,
            children: [a, n, p, m, u, l]
        }), t[23] = s, t[24] = u, t[25] = l, t[26] = a, t[27] = n, t[28] = p, t[29] = m, t[30] = b) : b = t[30], b
    });

function it() {
    Y.addFirstTiming("load.user-query")
}

function at() {
    Y.addFirstTiming("load.models")
}

function nt(o) {
    return o.loaderData && typeof o.loaderData == "object" && "isOutletBasedRoute" in o.loaderData && o.loaderData.isOutletBasedRoute
}

function pt() {
    return ot(), !0
}
export {
    Wt as clientLoader, te as
    default, Xt as shouldRevalidate
};
//# sourceMappingURL=966cd1fb-nah2h9xzpew8gg10.js.map