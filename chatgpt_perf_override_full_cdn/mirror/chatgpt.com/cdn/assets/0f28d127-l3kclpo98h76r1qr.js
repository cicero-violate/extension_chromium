import {
    ya as y,
    zf as m,
    cc as A,
    cq as l,
    g_ as b,
    D as k
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    r as f
} from "./2340486e-dvd8m80i7d6hyild.js";

function K(e, n, o) {
    const t = y(),
        d = e.map(c => {
            const {
                keyboardBinding: i
            } = c;
            let a = i.join("+");
            if (c.altKeyboardBindings) {
                a = [a];
                const r = c.altKeyboardBindings.map(s => s.join("+"));
                a = a.concat(r)
            }
            return m(a, {
                byKey: !0
            })
        });
    A(() => {
        if (o ? .enabled === !1) return;
        const c = r => {
                if (!r.repeat)
                    for (let s = 0; s < d.length; s++) d[s](r) && (e[s].enabled === void 0 || e[s].enabled) && (r.preventDefault(), n(e[s]), e[s].action(r))
            },
            i = r => {
                r.key !== void 0 && c(r)
            },
            a = t ? .document ? ? document;
        return a.addEventListener("keydown", i), () => {
            a.removeEventListener("keydown", i)
        }
    }, [e, o])
}
const u = l(e => ({
        actions: [],
        addActionsActions: n => e(o => ({
            actions: b([...o.actions, ...n], t => t.key)
        })),
        removeActionsActions: n => {
            const o = n.map(t => t.key);
            return e(t => ({
                actions: t.actions.filter(d => !o.includes(d.key))
            }))
        }
    })),
    h = e => K(e, n => {
        k.addAction("wham_keyboard_shortcut", {
            keyboardActionKey: n.key
        })
    }, {
        enabled: !0
    });

function w() {
    return u(e => e.actions)
}

function B(e = []) {
    const n = u(t => t.addActionsActions),
        o = u(t => t.removeActionsActions);
    f.useEffect(() => (n(e), () => o(e)), [e, n, o]), h(e)
}
export {
    w as a, B as u
};
//# sourceMappingURL=0f28d127-l3kclpo98h76r1qr.js.map