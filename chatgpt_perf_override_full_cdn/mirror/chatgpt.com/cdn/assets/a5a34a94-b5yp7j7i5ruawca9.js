import {
    c as k,
    al as P,
    u as w,
    j as y,
    o as x,
    h as R,
    N as M
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    fr as N,
    fs as $,
    dj as b
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    k7 as j,
    e as v,
    x_ as O,
    x$ as _,
    pj as A
} from "./4813494d-javwxs2rmzsrunl2.js";

function g(e) {
    return e === "/" ? "/" : e.replace(/\/+$/, "")
}

function B(e, t) {
    if (e.search === t.search || g(e.pathname) !== g(t.pathname)) return !1;
    const n = new URLSearchParams(e.search),
        a = new URLSearchParams(t.search),
        i = n.has("model") || a.has("model");
    return n.delete("model"), a.delete("model"), i && n.toString() === a.toString()
}

function T({
    currentLocation: e,
    nextLocation: t,
    isIntegratedVoiceModeActive: n,
    voiceCompletionRequest: a,
    integratedVoiceModeState: i,
    isEndingVoiceSession: l
}) {
    if (!n) return !1;
    const s = g(e.pathname),
        r = g(t.pathname);
    if (B(e, t) || !(s === "/") && s === r || l) return !1;
    const c = a ? .responseThreadId;
    if (c) {
        const m = M("/c/:conversationId", r),
            o = M("/g/:gizmoId/c/:conversationId", r);
        if ((m ? .params.conversationId ? ? o ? .params.conversationId) === c) return !1
    }
    return i != null
}
const F = () => {
        "use forget";
        const e = k.c(17),
            t = j(),
            n = v(U),
            a = v(E),
            i = v(z);
        let l;
        e[0] !== a || e[1] !== i || e[2] !== t || e[3] !== n ? (l = C => {
            const {
                nextLocation: S,
                currentLocation: V
            } = C;
            return T({
                currentLocation: V,
                nextLocation: S,
                isIntegratedVoiceModeActive: t,
                voiceCompletionRequest: n,
                integratedVoiceModeState: a,
                isEndingVoiceSession: i
            })
        }, e[0] = a, e[1] = i, e[2] = t, e[3] = n, e[4] = l) : l = e[4];
        const s = P(l),
            r = w(),
            u = s.state === "blocked";
        let d;
        e[5] !== s ? (d = () => {
            s.reset ? .()
        }, e[5] = s, e[6] = d) : d = e[6];
        const h = d;
        let c;
        e[7] !== s ? (c = async () => {
            await N({
                type: "STOP",
                reason: $.UserNavigatedAway
            }), s.proceed ? .()
        }, e[7] = s, e[8] = c) : c = e[8];
        const m = c;
        let o;
        e[9] !== r ? (o = r.formatMessage(I.title), e[9] = r, e[10] = o) : o = e[10];
        let f;
        e[11] === Symbol.for("react.memo_cache_sentinel") ? (f = y.jsx(x, { ...I.description
        }), e[11] = f) : f = e[11];
        let p;
        return e[12] !== m || e[13] !== h || e[14] !== u || e[15] !== o ? (p = y.jsx(b, {
            title: o,
            isOpen: u,
            onClose: h,
            onConfirm: m,
            primaryButtonColor: "danger",
            children: f
        }), e[12] = m, e[13] = h, e[14] = u, e[15] = o, e[16] = p) : p = e[16], p
    },
    I = R({
        title: {
            id: "voice-navigation-blocker.title",
            defaultMessage: "Voice is still active"
        },
        description: {
            id: "voice-navigation-blocker.description",
            defaultMessage: "Navigating away from this page will end your Voice session."
        }
    });

function U() {
    return O()
}

function E() {
    return _()
}

function z() {
    return A()
}
export {
    F as VoiceNavigationBlocker
};
//# sourceMappingURL=a5a34a94-b5yp7j7i5ruawca9.js.map