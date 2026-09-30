import {
    r as l,
    j as r,
    o as p,
    u as w
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    be as T,
    aw as v,
    b8 as y,
    es as h,
    et as S,
    cM as j,
    cO as P,
    cN as D,
    cI as E,
    cQ as N,
    R
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    r as b
} from "./7f00cfec-f04y2v5idy58f22s.js";
import {
    b9 as I,
    ba as k
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
const g = 118;

function F(t) {
    const s = j(t),
        e = P.getCurrentNode(s) ? .message;
    if (!e || !A(e) || e.clientMetadata ? .autoProceedCancelled || e.metadata ? .auto_proceed_cancelled) return !1;
    const n = Date.now(),
        a = (e.create_time ? ? Date.now() / 1e3) * 1e3,
        o = e.metadata ? .auto_proceed_timeout_seconds ? ? g;
    return Math.max(0, Math.ceil(o - (n - a) / 1e3)) > 0
}

function A(t) {
    return !!(t.metadata ? .n7jupd_message && t.channel === "commentary" && t.end_turn === !0)
}
async function H(t) {
    const s = D(t);
    if (s) return E(t, e => {
        N.updateTree(e, (n, a) => {
            n.updateNodeMetadata(a, {
                autoProceedCancelled: !0
            })
        })
    }), await R.safePost("/conversation/{conversation_id}/agent/cancel_auto_proceed", {
        parameters: {
            path: {
                conversation_id: s
            }
        }
    })
}

function O(t, s, e) {
    const [n, a] = l.useState(() => Date.now());
    l.useEffect(() => {
        if (!e) return;
        const u = setInterval(() => a(Date.now()), 250);
        return () => clearInterval(u)
    }, [e]);
    const o = s - (n - t) / 1e3,
        c = Math.max(0, o),
        i = Math.ceil(c),
        d = s === 0 ? 1 : Math.min(1, Math.max(0, 1 - c / s));
    return {
        secondsDisplay: i,
        progress: d
    }
}
const $ = ({
    lastMessage: t,
    clientThreadId: s
}) => {
    const e = T(s),
        n = l.useRef((t.create_time ? ? Date.now() / 1e3) * 1e3),
        a = t.metadata ? .auto_proceed_timeout_seconds ? ? g,
        {
            initialTimeLeft: o
        } = l.useMemo(() => {
            const m = Date.now(),
                _ = n.current,
                f = Math.ceil(a - (m - _) / 1e3),
                C = (a - f) / a;
            return {
                initialTimeLeft: f,
                initialProgress: C
            }
        }, [a]),
        [c, i] = l.useState(!1),
        {
            selectedSources: d
        } = I(e),
        {
            secondsDisplay: u,
            progress: M
        } = O(n.current, a, c || o > 0);
    l.useEffect(() => {
        if (o <= 0) {
            i(!0);
            return
        }
        const m = setTimeout(() => i(!0), o * 1e3);
        return () => clearTimeout(m)
    }, [o]);
    const x = async () => {
        i(!0), await b({
            callsiteId: "request_completion.odyssey.clarification_actions.1",
            conversation: e,
            eventSource: "mouse",
            promptMessage: S("Continue", {
                system_hints: [h],
                ...d && {
                    selected_sources: k(d)
                }
            }),
            parentMessageId: t.id,
            completionMetadata: {
                systemHints: [h],
                conversationMode: {
                    kind: y.PrimaryAssistant
                }
            }
        })
    };
    return o < -30 ? null : r.jsx("div", {
        className: "my-2 flex",
        children: r.jsxs(v, {
            onClick: x,
            disabled: c,
            className: "relative min-w-32 overflow-hidden px-2 transition-all",
            contentWrapperClassName: "gap-2",
            children: [r.jsx("span", {
                className: "flex items-center gap-1",
                children: c ? r.jsx(p, {
                    id: "clarification.loading",
                    defaultMessage: "Proceeding..."
                }) : r.jsx(p, {
                    id: "clarification.modelContinueMessage",
                    defaultMessage: "Continue"
                })
            }), !c && r.jsx(L, {
                secondsDisplay: u,
                progress: M
            })]
        })
    })
};

function L({
    secondsDisplay: t,
    progress: s,
    size: e = 22,
    strokeWidth: n = 2
}) {
    const a = (e - n) / 2,
        o = 2 * Math.PI * a,
        c = o * (1 - s),
        i = w();
    return r.jsxs("div", {
        "aria-label": i.formatMessage({
            id: "clarification.secondsRemaining",
            defaultMessage: "{seconds} seconds remaining"
        }, {
            seconds: t.toString()
        }),
        className: "relative inline-flex items-center justify-center",
        style: {
            width: e,
            height: e
        },
        children: [r.jsxs("svg", {
            width: e,
            height: e,
            className: "block",
            children: [r.jsx("circle", {
                cx: e / 2,
                cy: e / 2,
                r: a,
                stroke: "currentColor",
                strokeOpacity: .3,
                strokeWidth: n,
                fill: "none"
            }), r.jsx("circle", {
                cx: e / 2,
                cy: e / 2,
                r: a,
                stroke: "currentColor",
                strokeWidth: n,
                fill: "none",
                strokeDasharray: o,
                strokeDashoffset: c,
                style: {
                    transition: "stroke-dashoffset 100ms linear"
                },
                transform: `rotate(-90 ${e/2} ${e/2})`
            })]
        }), r.jsx("span", {
            className: "absolute text-[9px] leading-none font-medium",
            style: {
                fontVariantNumeric: "tabular-nums"
            },
            children: t
        })]
    })
}
export {
    $ as C, F as a, H as c, A as i
};
//# sourceMappingURL=929b8f98-n5a152jpew1p3rsl.js.map