import {
    c as x,
    r as d,
    j as u
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    ix as E,
    q as g,
    bW as h,
    D as W
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    u as j,
    r as R
} from "./a89794b1-iid29x3u23vy2xh2.js";
import {
    W as w
} from "./adcea219-dtovp7irxcfumxuw.js";
import "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import "./cf038c1b-epekr7vyigt56mwt.js";
import "./e04c699b-c1yj8j54x1smqexb.js";
import "./679fc303-kl7c6054usfnqmd4.js";
import "./14f71e20-oiejkcbcinz69nah.js";
import "./6fd89734-he7d0krbclzsprbo.js";
import "./a24a6b0e-bqz8i0dx9sfl7wz5.js";
const y = n => {
        "use forget";
        const e = x.c(12),
            {
                clientThreadId: t
            } = n,
            {
                isOpen: o,
                close: r
            } = j();
        let s;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (s = g("2400755524"), e[0] = s) : s = e[0];
        const m = s,
            p = d.useRef(t);
        let a, i;
        e[1] !== t || e[2] !== r ? (a = () => {
            p.current !== t && r(), p.current = t
        }, i = [t, r], e[1] = t, e[2] = r, e[3] = a, e[4] = i) : (a = e[3], i = e[4]), d.useEffect(a, i);
        let l;
        e[5] !== t || e[6] !== r || e[7] !== o ? (l = o ? u.jsx(w, {
            isOpen: o,
            onClose: r,
            clientThreadId: t,
            trailmixEnabled: m
        }) : null, e[5] = t, e[6] = r, e[7] = o, e[8] = l) : l = e[8];
        const f = l;
        let c;
        return e[9] !== t || e[10] !== f ? (c = u.jsx(h, {
            children: f
        }, t), e[9] = t, e[10] = f, e[11] = c) : c = e[11], c
    },
    M = n => {
        "use forget";
        const e = x.c(3),
            t = d.useRef(null);
        let o;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (o = (s, m) => {
            R(), setTimeout(() => {
                t.current ? .resetErrorBoundary()
            }), W.addError(s, {
                componentStack: m
            })
        }, e[0] = o) : o = e[0];
        let r;
        return e[1] !== n ? (r = u.jsx(E, {
            ref: t,
            onError: o,
            name: "walnut-focused-view",
            children: u.jsx(y, { ...n
            })
        }), e[1] = n, e[2] = r) : r = e[2], r
    };
export {
    M as WalnutFocusedViewManager
};
//# sourceMappingURL=ccd1f9f1-czalikjn2dri5qlk.js.map