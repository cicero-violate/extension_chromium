import {
    r as c,
    j as t
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    df as p,
    cO as x,
    cM as j,
    a as _,
    N as M,
    cH as A
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    mk as S,
    ng as g,
    mf as O,
    j9 as v,
    nh as w,
    jb as E,
    ni as N,
    nj as b
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    J as C,
    a as R
} from "./150f7f4e-532i7b7v2cgfoi3l.js";
import {
    J as T
} from "./6cb4c679-fplf101jkz4oo0d4.js";
import "./6a35ae8e-iy63tz3yb9ue6t0y.js";

function J(o, s) {
    const {
        automationId: n,
        automationTitle: e,
        automationMessage: l
    } = c.useMemo(() => {
        const u = s.find(d => d.author.role === p.Assistant),
            r = u ? x.getParentPromptNode(j(o), u.id) : null;
        let a = r ? .message.metadata;
        a ? .real_author_type || (a = s.find(f => f.metadata ? .real_author_type === "automation") ? .metadata);
        const m = a ? .real_author_type === "automation" ? a ? .real_author_id : null,
            i = a ? .real_author_title;
        return {
            automationId: m,
            automationTitle: i,
            automationMessage: r ? .message
        }
    }, [o, s]), {
        automation: y
    } = S(n ? ? "");
    return {
        automationId: n,
        automation: y,
        automationTitle: e,
        automationMessage: l
    }
}

function L({
    clientThreadId: o,
    messages: s
}) {
    const {
        automationId: n,
        automation: e,
        automationTitle: l
    } = J(o, s), u = g(o).isOdysseyMode || s.some(i => i.metadata ? .n7jupd_message), r = O(o) ? .value, {
        isScheduledRun: a
    } = c.useContext(v), [h, m] = c.useState(!1);
    return c.useEffect(() => {
        n && _.count(M.JAWBONE, "jawbone_automation_source_header.open")
    }, [n]), n ? a ? t.jsx("div", {
        className: "relative my-2 w-full",
        children: t.jsx(T, {
            automation: e,
            fullWidth: !0
        })
    }) : u ? r === A.REALTIME ? null : t.jsx(w, {
        clientThreadId: o,
        children: t.jsx(E, {
            children: ({
                isScheduled: i,
                isScheduledRun: d
            }) => i && d && t.jsx(N, {})
        })
    }) : t.jsxs("div", {
        className: "text-token-text-secondary hover:text-token-text-primary mb-1 flex items-center gap-1.5 text-sm",
        children: [t.jsx(b, {
            className: "icon-sm"
        }), t.jsx("button", {
            onClick: () => {
                m(!0)
            },
            children: e ? .title ? ? l
        }), h && e && t.jsx(C, {
            initialScheduleComponents: e.schedule_components,
            nextRunTimes: e.next_run_times,
            children: t.jsx(R, {
                item: e,
                source: "chat",
                onClose: () => {
                    m(!1)
                }
            })
        })]
    }) : null
}
export {
    L as AutomationSourceHeader
};
//# sourceMappingURL=b18a606b-lmom71hdnbtl4e60.js.map