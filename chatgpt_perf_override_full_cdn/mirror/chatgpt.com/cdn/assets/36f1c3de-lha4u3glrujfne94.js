import {
    c as g,
    j as d
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    ja as R,
    wT as c,
    df as m
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    C as T
} from "./9ed9a415-g39uishgri10upf4.js";
const h = p => {
    "use forget";
    const e = g.c(15),
        {
            messages: s,
            conversation: u
        } = p;
    let t, r, a, n, l, o;
    if (e[0] !== u || e[1] !== s) {
        o = Symbol.for("react.early_return_sentinel");
        e: {
            const f = R(s);
            if (!f) {
                o = null;
                break e
            }
            t = T,
            r = 0,
            a = u,
            n = c(m.Assistant, [], f),
            l = c(m.Assistant, [], f)
        }
        e[0] = u, e[1] = s, e[2] = t, e[3] = r, e[4] = a, e[5] = n, e[6] = l, e[7] = o
    } else t = e[2], r = e[3], a = e[4], n = e[5], l = e[6], o = e[7];
    if (o !== Symbol.for("react.early_return_sentinel")) return o;
    let i;
    return e[8] !== t || e[9] !== s || e[10] !== r || e[11] !== a || e[12] !== n || e[13] !== l ? (i = d.jsx(t, {
        turnIndex: r,
        conversation: a,
        groupedMessagesToRender: n,
        allGroupedMessages: l,
        allMessages: s,
        isUserTurn: !1,
        isFinalUserTurn: !1,
        isFinalAssistantTurn: !1,
        isCompletionRequestInProgress: !1,
        isFeedbackEnabled: !1,
        isFinalTurn: !1,
        hasActiveRequest: !1,
        onRequestCompletion: x,
        renderingView: "share-modal"
    }), e[8] = t, e[9] = s, e[10] = r, e[11] = a, e[12] = n, e[13] = l, e[14] = i) : i = e[14], i
};

function x() {}
export {
    h as R
};
//# sourceMappingURL=36f1c3de-lha4u3glrujfne94.js.map