import {
    c as b,
    v,
    u as x,
    r as h,
    j as r,
    h as M
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    be as S,
    vZ as _,
    et as j,
    di as k,
    df as C,
    fc as p,
    aw as E
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    kQ as T,
    kR as y
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    A
} from "./bc4efe0c-ef367v6adi8m1l4b.js";
import {
    r as F
} from "./7f00cfec-f04y2v5idy58f22s.js";
const R = (t, s, o, a) => {
    "use forget";
    const e = b.c(8);
    let i;
    e[0] !== t ? (i = S(t), e[0] = t, e[1] = i) : i = e[1];
    const n = i,
        u = _();
    let l;
    return e[2] !== n || e[3] !== s || e[4] !== o || e[5] !== a || e[6] !== u ? (l = (m, d) => {
        if (u) return;
        const c = `
        The user would like you to focus on a file from an earlier search result as you respond to their prompt: "${o.replaceAll('"',"")}". The file's ID is "${s.replaceAll('"',"")}".
        When you respond, try to acknowledge that you're focusing on the file if it's not clear from the context. For example, if you mclick the file, you could mention that you've looked at the file.
        `,
            w = D(c, {
                exclude_after_next_user_message: !0
            }),
            g = T(n);
        F({
            callsiteId: "request_completion.contextual_answers.followups.use_create_follow_up_turn.1",
            conversation: n,
            sourceEvent: m,
            promptMessage: j(d, {
                retrieval_hint_file_data: {
                    id: s,
                    name: o,
                    url: a
                }
            }),
            completionMetadata: g ? {
                conversationMode: g
            } : void 0,
            appendMessages: [w]
        })
    }, e[2] = n, e[3] = s, e[4] = o, e[5] = a, e[6] = u, e[7] = l) : l = e[7], l
};

function D(t, s) {
    return {
        id: v(),
        author: {
            role: C.System
        },
        content: {
            content_type: k.Text,
            parts: Array.isArray(t) ? t : [t]
        },
        metadata: s
    }
}

function U({
    className: t,
    clientThreadId: s,
    fileCloudDocUrl: o,
    fileId: a,
    fileName: e,
    isFollowupMenuOpen: i,
    setIsFollowupMenuOpen: n,
    trackFileSourceFollowup: u
}) {
    const l = x(),
        m = R(s, a, e, o),
        d = h.useCallback((c, f) => {
            f.length && (m(c, f), n(!1), u ? .())
        }, [m, n, u]);
    return r.jsxs(p.Root, {
        open: i,
        onOpenChange: n,
        children: [r.jsx(p.Trigger, {
            "aria-label": l.formatMessage(z.fileFollowupMenuTriggerLabel, {
                fileName: e
            }),
            className: t,
            children: r.jsx(y, {
                className: "icon"
            })
        }), r.jsx(p.Portal, {
            children: r.jsxs(p.Content, {
                size: "medium",
                children: [Object.values(G).map(c => r.jsx(B, {
                    sendReply: d,
                    suggestedText: l.formatMessage(c)
                }, c.defaultMessage)), r.jsx("div", {
                    className: "mx-2 flex cursor-pointer flex-row items-center gap-2 p-2.5 px-3 py-2.5 text-sm",
                    children: r.jsx(L, {
                        sendReply: d
                    })
                })]
            })
        })]
    })
}
const z = M({
    fileFollowupMenuTriggerLabel: {
        id: "WObYaw",
        defaultMessage: "Open follow-up menu for {fileName}"
    }
});

function B({
    suggestedText: t,
    sendReply: s
}) {
    return r.jsx(p.Item, {
        icon: y,
        onSelect: o => s(o, t),
        textValue: "",
        children: t
    })
}
const G = M({
    fileFollowupSuggestionTellMeMore: {
        id: "skmNc0",
        defaultMessage: "Tell me more about this."
    },
    fileFollowupSuggestionSummarize: {
        id: "BiNEEG",
        defaultMessage: "Summarize this."
    }
});

function L({
    sendReply: t
}) {
    const s = x(),
        [o, a] = h.useState("");
    return r.jsxs("form", {
        onSubmit: e => {
            e.preventDefault(), t(e, o), a("")
        },
        className: "border-token-border-default flex flex-1 items-center gap-2 rounded-full border border-solid px-4 py-2 pe-2",
        children: [r.jsx("input", {
            type: "text",
            onChange: e => a(e.target.value),
            className: "text-token-text-primary w-full flex-1 border-none bg-transparent p-0 text-sm font-normal ring-0 focus:border-none focus:shadow-none focus:ring-0",
            placeholder: s.formatMessage({
                id: "tJa6v0",
                defaultMessage: "Ask about this…"
            }),
            value: o
        }), r.jsx(E, {
            className: "flex-0",
            disabled: !o,
            icon: A,
            color: "primary",
            size: "small",
            type: "submit"
        })]
    })
}
export {
    U as F, L as a, R as u
};
//# sourceMappingURL=25e69e8b-nak5n78ns73kii17.js.map