import {
    u as y,
    r as j,
    s as P,
    j as n,
    o as B,
    h as E
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    ur as S,
    gJ as C,
    wz as N,
    ev as A,
    e5 as I
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    dc as V,
    d0 as F
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
const L = ({
    theme: s,
    name: i
}) => n.jsxs("div", {
    className: "flex items-center gap-1.5",
    children: [n.jsx("div", {
        className: "flex h-3.5 w-3.5 items-center justify-center",
        "data-chat-theme": s,
        children: n.jsx("div", {
            className: "h-2.5 w-2.5 rounded-full bg-(--theme-submit-btn-bg) [[data-chat-theme=black]>&]:bg-black [[data-chat-theme=default]>&]:bg-gray-400 [[data-chat-theme=default]>&]:dark:bg-gray-500"
        })
    }), i]
});

function G({
    account: s
}) {
    const {
        isLoading: i,
        value: d,
        setValue: h
    } = S(), t = y(), c = j.useId(), {
        data: m
    } = C(), f = m ? .accountItems ? ? [s], g = s.isFree(), p = s.isPlus(), u = s.isPro() || s.isProlite(), M = f.some(e => e.isSelfServeBusiness() || e.isEnterprisey()), b = !s.isEdu() && !g && (p || u || M), T = u, k = P(), v = N(), w = d && A(v, d) ? d : "default";

    function l(e, o) {
        return n.jsx(L, {
            theme: e,
            name: o
        })
    }
    const r = [{
        label: l("default", t.formatMessage(a.default)),
        value: "default"
    }, {
        label: l("blue", t.formatMessage(a.blue)),
        value: "blue"
    }, {
        label: l("green", t.formatMessage(a.green)),
        value: "green"
    }, {
        label: l("yellow", t.formatMessage(a.yellow)),
        value: "yellow"
    }, {
        label: l("pink", t.formatMessage(a.pink)),
        value: "pink"
    }, {
        label: l("orange", t.formatMessage(a.orange)),
        value: "orange"
    }];
    b && r.push({
        label: l("purple", t.formatMessage(a.purple)),
        value: "purple"
    }), T && r.push({
        label: l("black", t.formatMessage(a.black)),
        value: "black"
    });
    const x = e => {
        const o = () => F(k, "accent_color_upsell");
        if (e !== "default" && I("chatgpt-change-theme-accent-color"), e === "purple" && g) {
            o();
            return
        }
        if (e === "black" && !u) {
            o();
            return
        }
        h(e)
    };
    return n.jsxs("div", {
        className: "flex items-center justify-between",
        children: [n.jsx("div", {
            id: c,
            children: n.jsx(B, { ...a.chatTheme
            })
        }), n.jsx(V, {
            value: w,
            onValueChange: x,
            disabled: i,
            ariaLabelledBy: c,
            options: r
        })]
    })
}
const a = E({
    chatTheme: {
        id: "settingsModal.chatTheme",
        defaultMessage: "Accent color"
    },
    default: {
        id: "settingsModal.chatTheme.default",
        defaultMessage: "Default"
    },
    blue: {
        id: "settingsModal.chatTheme.blue",
        defaultMessage: "Blue"
    },
    green: {
        id: "settingsModal.chatTheme.green",
        defaultMessage: "Green"
    },
    yellow: {
        id: "settingsModal.chatTheme.yellow",
        defaultMessage: "Yellow"
    },
    purple: {
        id: "settingsModal.chatTheme.purple",
        defaultMessage: "Purple"
    },
    pink: {
        id: "settingsModal.chatTheme.pink",
        defaultMessage: "Pink"
    },
    orange: {
        id: "settingsModal.chatTheme.orange",
        defaultMessage: "Orange"
    },
    black: {
        id: "settingsModal.chatTheme.black",
        defaultMessage: "Black"
    },
    plus: {
        id: "settingsModal.chatTheme.plusBadge",
        defaultMessage: "Plus"
    },
    pro: {
        id: "settingsModal.chatTheme.proBadge",
        defaultMessage: "Pro"
    }
});
export {
    L as C, G as a, a as m
};
//# sourceMappingURL=af9954cd-e37kmcjwfqr23m2p.js.map