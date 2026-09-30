import {
    c as _,
    p as P
} from "./2340486e-dvd8m80i7d6hyild.js";
var E = (t => (t.Chats = "chats", t.Discussions = "discussions", t.Sources = "sources", t))(E || {});
const T = "tab",
    o = "chats";

function g(t, s) {
    if (!t) return o;
    const a = s.find(c => c === t);
    return a || o
}

function R(t) {
    "use forget";
    const s = _.c(4),
        {
            allowedTabs: a
        } = t,
        c = a === void 0 ? [] : a,
        [b, h] = P(),
        i = [o, ...c];
    if (!(i.length > 1)) {
        let e;
        return s[0] === Symbol.for("react.memo_cache_sentinel") ? (e = [o, p], s[0] = e) : e = s[0], e
    }
    const d = b.get(T),
        r = g(d, i),
        u = e => {
            const l = i.find(m => m === e);
            l && r !== l && h(m => {
                const f = new URLSearchParams(m);
                return f.set(T, l), f
            }, {
                replace: !0
            })
        };
    let n;
    return s[1] !== u || s[2] !== r ? (n = [r, u], s[1] = u, s[2] = r, s[3] = n) : n = s[3], n
}

function p() {}
export {
    E as P, R as u
};
//# sourceMappingURL=902eb77e-cyhiyo0iarrb7zu1.js.map