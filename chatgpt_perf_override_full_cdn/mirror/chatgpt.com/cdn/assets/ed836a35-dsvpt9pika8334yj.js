import {
    F as g
} from "./38b1cb71-fzxhpchabhdp967b.js";
import {
    _ as t,
    D as c,
    S as i,
    a as k,
    N as p,
    I as v,
    zK as E,
    gt as F,
    zL as u
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    dJ as P,
    ck as h,
    cl as S
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    r as d,
    d as m,
    v as f
} from "./2340486e-dvd8m80i7d6hyild.js";
let s = "",
    o = "";
const _ = new Set,
    r = {
        setSessionId(n) {
            s = n
        },
        setQuerySessionId(n) {
            _.clear(), o = n
        },
        logClick(n, e, a, y) {
            if (y != null) {
                const l = Math.max(0, Date.now() / 1e3 - y);
                k.hist(p.DEFAULT, "conversation_search.click.update_time_delta_seconds", [{
                    key: "source",
                    value: a
                }], l), i.logEvent("chatgpt_fannypack_click_update_time_delta_seconds", l, {
                    source: a
                })
            }
            c.addAction("fannypack.web.click", {
                index: e,
                source: a
            }), t.logEvent("FannyPack: Click result", {
                fanny_pack_session_id: s,
                fanny_pack_query_session_id: o,
                conversationId: n,
                index: e,
                source: a
            }), i.logEvent("chatgpt_fannypack_click", e, {
                index: String(e),
                source: a
            })
        },
        logClose(n) {
            t.logEvent("FannyPack: Close", {
                fanny_pack_session_id: s,
                source: n
            })
        },
        logOpen(n) {
            k.count(p.DEFAULT, "conversation_search.open", [{
                key: "source",
                value: n
            }]), c.addAction("fannypack.web.open", {
                source: n
            }), t.logEvent("FannyPack: Open", {
                fanny_pack_session_id: s,
                source: n
            }), i.logEvent("chatgpt_fannypack_open", n)
        },
        logQuery() {
            c.addAction("fannypack.web.query"), t.logEvent("FannyPack: Query", {
                fanny_pack_session_id: s,
                fanny_pack_query_session_id: o
            }), i.logEvent("chatgpt_fannypack_query")
        },
        logQueryError() {
            c.addError("fannypack.web.query_error"), t.logEvent("FannyPack: Query Error", {
                fanny_pack_session_id: s,
                fanny_pack_query_session_id: o
            })
        },
        logQueryMore() {
            c.addAction("fannypack.web.queryMore"), t.logEvent("FannyPack: Query Fetch More", {
                fanny_pack_session_id: s,
                fanny_pack_query_session_id: o
            }), i.logEvent("chatgpt_fannypack_query_more")
        },
        logNoResults() {
            t.logEvent("FannyPack: No results", {
                fanny_pack_session_id: s,
                fanny_pack_query_session_id: o
            })
        },
        logImpression(n, e, a) {
            _.has(a) || (_.add(a), t.logEvent("FannyPack: Impression", {
                fanny_pack_session_id: s,
                fanny_pack_query_session_id: o,
                source: n,
                index: e,
                conversation_id: a
            }))
        }
    };

function A() {
    const n = v(),
        {
            isFannyPackEnabled: e
        } = P(),
        a = E(y => y.isActive);
    d.useEffect(() => {
        e && n && (g.setCurrentAccount(n), g.init())
    }, [n, e]), d.useEffect(() => F().addAction({
        key: "toggleChatSearch",
        action: () => {
            a ? r.logClose("shortcut") : (r.setSessionId(f()), r.logOpen("shortcut")), u.setIsActive(!a)
        },
        actionMessageDescriptor: m({
            id: "oqatXV",
            defaultMessage: "Search chats"
        }),
        group: S.Core,
        keyboardBinding: [h.Mod, "k"]
    }), [a])
}

function b() {
    u.setIsActive(!0), r.setSessionId(f()), r.logOpen("button")
}
const D = Object.freeze(Object.defineProperty({
    __proto__: null,
    openFannyPackSearch: b,
    useInitializeFannyPackHandler: A
}, Symbol.toStringTag, {
    value: "Module"
}));
export {
    r as F, D as a, A as u
};
//# sourceMappingURL=ed836a35-dsvpt9pika8334yj.js.map