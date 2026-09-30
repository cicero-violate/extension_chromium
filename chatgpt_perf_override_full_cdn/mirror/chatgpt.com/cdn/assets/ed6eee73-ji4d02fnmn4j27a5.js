const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/15dffd5b-mvzjrbh5yt2sta6g.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/ecfbef4f-gi6oki1jx4aix3gd.js", "assets/31cec8d8-j4linhdlo3s8o8v8.js", "assets/8d846022-b2l059fz4znz94nm.js", "assets/073fd849-nsd8xpyfk9pddpul.js", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/conversation-small-cqp6votf.css", "assets/5c267c4d-kf0iedudhmfd43mf.js", "assets/4e0528a1-7jk5ocps1xa2iipz.js", "assets/6fd89734-ka2f78fh5448oyj6.js", "assets/a8e729b2-g28kd33mnyafvoxt.js", "assets/97399d13-cbfknf2capmro1md.js", "assets/1bc04b52-c6spp0aq3f71sxih.js", "assets/f8579ff2-jgvbv1xhr4yqinhu.js", "assets/8b7f0dc9-etsrdv5zrmr52uze.js", "assets/8f504e8b-euvbfz0gxthnlb6e.js", "assets/ad08b33f-m6y61lzfmpdxz75y.js", "assets/09153034-kx6ze9zibnnd8p6p.js", "assets/3b8e38e2-imhhecbp3s27hktb.js", "assets/d4fd05ef-jcd8acyt60dknv7p.js", "assets/f6f4f1b2-gtlbp7j4szobo0y1.js", "assets/1bc04b52-lymnctp12j4ukscl.js", "assets/1bc04b52-h1em0bjkpkjv8ykw.js", "assets/1bc04b52-homyy2s5cy2i6moh.js", "assets/1bc04b52-pfqcgruptyx7togk.js", "assets/1bc04b52-hnu6g21afx0au4ng.js"]))) => i.map(i => d[i]);
import {
    r as b,
    c as k,
    j as m,
    _ as z,
    u as B,
    h as D,
    o as K
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    cB as F,
    pQ as Q,
    az as W,
    aA as Y,
    co as G,
    zH as J,
    gp as Z,
    ge as X,
    zI as ee
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    lj as te,
    aw as R,
    ch as se,
    _ as $,
    fB as ne,
    e as P,
    og as oe,
    mY as ie,
    aH as le,
    A_ as ae,
    d$ as re,
    bY as ce
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    S as de
} from "./78c2d596-c7gi8g89xe9hpsf2.js";
import {
    A as me
} from "./1bc04b52-htrlynm8a3t36dsr.js";
const H = b.createContext({
        values: {},
        set() {
            throw new Error("Agent form context not initialized")
        }
    }),
    ue = s => {
        "use forget";
        const e = k.c(8),
            {
                children: t,
                values: n,
                onValuesChange: l
            } = s;
        let i;
        e[0] !== l ? (i = (u, o) => {
            l(r => {
                const p = o instanceof Function ? o(r) : o;
                if (p == null) {
                    const g = { ...r
                    };
                    return delete g[u], g
                }
                return { ...r,
                    [u]: p
                }
            })
        }, e[0] = l, e[1] = i) : i = e[1];
        const a = i;
        let f;
        e[2] !== a || e[3] !== n ? (f = {
            values: n,
            set: a
        }, e[2] = a, e[3] = n, e[4] = f) : f = e[4];
        const d = f;
        let c;
        return e[5] !== t || e[6] !== d ? (c = m.jsx(H.Provider, {
            value: d,
            children: t
        }), e[5] = t, e[6] = d, e[7] = c) : c = e[7], c
    },
    fe = () => {
        "use forget";
        return b.useContext(H)
    },
    L = (s, e) => {
        "use no forget";
        const {
            values: t,
            set: n
        } = fe(), l = b.useCallback(a => {
            n(s, f => a instanceof Function ? a(f[s] ? ? null) : a)
        }, [s, n]);
        b.useEffect(() => {
            if (e != null) try {
                l(e)
            } catch {}
        }, []);
        const i = t[s];
        return b.useMemo(() => [i, l], [i, l])
    },
    S = (s, e, t) => {
        const n = e;
        return n.kind = s, n.showAtTurnEnd = !!t ? .showAtTurnEnd, n
    },
    ge = S("checkbox", s => {
        "use forget";
        const e = k.c(7),
            {
                element: t
            } = s,
            [n, l] = L(t.id, t.checked);
        let i;
        e[0] !== l ? (i = f => l(f.target.checked), e[0] = l, e[1] = i) : i = e[1];
        let a;
        return e[2] !== t.id || e[3] !== t.label || e[4] !== i || e[5] !== n ? (a = m.jsx(F, {
            id: t.id,
            checked: n,
            label: t.label,
            labelClassName: "text-token-text-secondary",
            onChange: i
        }), e[2] = t.id, e[3] = t.label, e[4] = i, e[5] = n, e[6] = a) : a = e[6], a
    }),
    pe = S("disclosureMenu", s => {
        "use forget";
        const e = k.c(21),
            {
                element: t
            } = s,
            [n, l] = L(t.id, ""),
            [i, a] = b.useState(!1),
            f = !!n;
        let d;
        e[0] !== l ? (d = g => {
            g.target.checked ? a(!0) : l("")
        }, e[0] = l, e[1] = d) : d = e[1];
        let c;
        e[2] !== t.id || e[3] !== t.title || e[4] !== f || e[5] !== d ? (c = m.jsx(Q, {
            children: m.jsx(F, {
                id: t.id,
                checked: f,
                label: t.title,
                labelClassName: "text-token-text-secondary",
                onChange: d
            })
        }), e[2] = t.id, e[3] = t.title, e[4] = f, e[5] = d, e[6] = c) : c = e[6];
        let u;
        e[7] !== t.description ? (u = t.description && m.jsx("p", {
            className: "text-token-text-tertiary p-2",
            children: t.description
        }), e[7] = t.description, e[8] = u) : u = e[8];
        let o;
        if (e[9] !== t.options || e[10] !== l) {
            let g;
            e[12] !== l ? (g = x => m.jsx("button", {
                type: "button",
                className: "interactive-button hover:bg-token-interactive-bg-secondary-hover active:bg-token-interactive-bg-secondary-press flex w-full items-center justify-start rounded-xl px-2.5 py-2",
                onClick: () => {
                    l(x.id), a(!1)
                },
                children: x.title
            }, x.id), e[12] = l, e[13] = g) : g = e[13], o = t.options.map(g), e[9] = t.options, e[10] = l, e[11] = o
        } else o = e[11];
        let r;
        e[14] !== u || e[15] !== o ? (r = m.jsx(W, {
            children: m.jsxs(Y, {
                align: "start",
                sideOffset: 2,
                className: "border-token-border-default bg-token-bg-primary flex max-w-[300px] flex-col rounded-2xl border bg-white p-3 shadow-lg dark:bg-gray-800",
                children: [u, o]
            })
        }), e[14] = u, e[15] = o, e[16] = r) : r = e[16];
        let p;
        return e[17] !== i || e[18] !== c || e[19] !== r ? (p = m.jsxs(G, {
            open: i,
            onOpenChange: a,
            children: [c, r]
        }), e[17] = i, e[18] = c, e[19] = r, e[20] = p) : p = e[20], p
    }),
    M = s => {
        "use forget";
        const e = k.c(3),
            t = te();
        let n;
        return e[0] !== t || e[1] !== s ? (n = {
            click(l) {
                t ? .onUIEvent(s, {
                    click: {
                        target: l,
                        type_: "click"
                    }
                })
            },
            submit(l, i) {
                t ? .onUIEvent(s, {
                    submit: {
                        type_: "submit",
                        target: l,
                        formState: xe(i)
                    }
                })
            }
        }, e[0] = t, e[1] = s, e[2] = n) : n = e[2], n
    },
    xe = s => Object.entries(s).map(([e, t]) => {
        const n = {
            fieldId: e
        };
        return Array.isArray(t) ? n.stringValues = t : typeof t == "boolean" ? n.boolValue = t : typeof t == "string" && (n.stringValue = t), n
    }),
    q = S("form", s => {
        "use forget";
        const e = k.c(23),
            {
                element: t,
                elementViewComponent: n
            } = s;
        let l;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (l = {}, e[0] = l) : l = e[0];
        const [i, a] = b.useState(l), {
            submit: f
        } = M(t.id);
        let d;
        if (e[1] !== n || e[2] !== t.children) {
            let g;
            e[4] !== n ? (g = x => m.jsx(n, {
                element: x
            }, x.id), e[4] = n, e[5] = g) : g = e[5], d = t.children.map(he).map(g), e[1] = n, e[2] = t.children, e[3] = d
        } else d = e[3];
        let c;
        e[6] !== d ? (c = m.jsx("div", {
            className: "flex flex-col gap-0.5",
            children: d
        }), e[6] = d, e[7] = c) : c = e[7];
        let u;
        if (e[8] !== t.submitButtons || e[9] !== f || e[10] !== i) {
            let g;
            e[12] !== f || e[13] !== i ? (g = x => m.jsx(R, {
                onClick: () => {
                    f(x.id, i)
                },
                color: x.variant === "primary" ? "primary" : "secondary",
                children: x.text
            }, x.id), e[12] = f, e[13] = i, e[14] = g) : g = e[14], u = t.submitButtons.map(g), e[8] = t.submitButtons, e[9] = f, e[10] = i, e[11] = u
        } else u = e[11];
        let o;
        e[15] !== u ? (o = m.jsx("div", {
            className: "flex justify-end gap-2",
            children: u
        }), e[15] = u, e[16] = o) : o = e[16];
        let r;
        e[17] !== c || e[18] !== o ? (r = m.jsxs("div", {
            className: "flex flex-col gap-4",
            children: [c, o]
        }), e[17] = c, e[18] = o, e[19] = r) : r = e[19];
        let p;
        return e[20] !== r || e[21] !== i ? (p = m.jsx(ue, {
            values: i,
            onValuesChange: a,
            children: r
        }), e[20] = r, e[21] = i, e[22] = p) : p = e[22], p
    });

function he(s) {
    return Object.values(s)[0]
}
const be = se(() => z(() =>
        import ("./15dffd5b-mvzjrbh5yt2sta6g.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28])).then(s => s.SkillSharingModal)),
    ke = S("skillInstall", s => {
        "use forget";
        const e = k.c(37),
            {
                element: t
            } = s,
            [n, l] = b.useState(!1),
            [i, a] = b.useState(!1),
            f = B(),
            {
                id: d,
                installTarget: c,
                openInFinderTarget: u,
                skillInput: o
            } = t,
            {
                click: r
            } = M(d),
            p = o.action === "install";
        let g, x;
        e[0] !== o.action ? (g = () => {
            $.logEventWithStatsig("Atlas Agent Install Skill Tool Shown", "chatgpt_atlas_agent_install_skill_tool_shown", {
                skill_action: o.action
            })
        }, x = [o.action], e[0] = o.action, e[1] = g, e[2] = x) : (g = e[1], x = e[2]), b.useEffect(g, x);
        let v;
        e[3] !== r || e[4] !== c || e[5] !== o.action ? (v = U => {
            $.logEventWithStatsig("Atlas Agent Install Skill Primary Action Clicked", "chatgpt_atlas_agent_install_skill_primary_action_clicked", {
                skill_action: o.action,
                surface: U
            }), a(!0), r(c)
        }, e[3] = r, e[4] = c, e[5] = o.action, e[6] = v) : v = e[6];
        const h = v,
            y = o.skillName,
            w = o.description || "";
        let j;
        e[7] !== f || e[8] !== p ? (j = f.formatMessage(p ? E.statusNew : E.statusExisting), e[7] = f, e[8] = p, e[9] = j) : j = e[9];
        const A = p ? "copy" : "replace",
            O = i ? E.saved : E.save;
        let I;
        e[10] === Symbol.for("react.memo_cache_sentinel") ? (I = () => {
            l(!0)
        }, e[10] = I) : I = e[10];
        let C, _;
        e[11] !== h ? (C = () => {
            h("preview_card")
        }, _ = () => {
            h("preview_card")
        }, e[11] = h, e[12] = C, e[13] = _) : (C = e[12], _ = e[13]);
        let N;
        e[14] !== i || e[15] !== o.skillName || e[16] !== C || e[17] !== _ || e[18] !== w || e[19] !== j || e[20] !== A || e[21] !== O ? (N = m.jsx(de, {
            title: y,
            description: w,
            statusText: j,
            addAction: A,
            primaryActionMessage: O,
            isExpandDisabled: i,
            isAddDisabled: i,
            onExpand: I,
            isLoading: !1,
            isError: !1,
            onAddToLibrary: C,
            onReplaceSkill: _
        }), e[14] = i, e[15] = o.skillName, e[16] = C, e[17] = _, e[18] = w, e[19] = j, e[20] = A, e[21] = O, e[22] = N) : N = e[22];
        let V;
        e[23] !== r || e[24] !== n || e[25] !== h || e[26] !== i || e[27] !== d || e[28] !== p || e[29] !== u || e[30] !== o.description || e[31] !== o.files || e[32] !== o.skillName ? (V = n && m.jsx(be, {
            skill: {
                id: d,
                name: o.skillName,
                description: o.description || "",
                enabled: !1,
                files: Object.fromEntries(o.files.map(ve)),
                isReadOnly: !0,
                previewContents: Object.fromEntries(o.files.map(ye))
            },
            onClose: () => l(!1),
            addActionLabel: "install",
            usePreviewContentForImages: !0,
            onAddToLibrary: () => {
                l(!1), h("details_modal")
            },
            onSaveChanges: p ? void 0 : () => {
                l(!1), h("details_modal")
            },
            onOpenFolder: () => {
                r(u)
            },
            primaryActionMessage: i ? E.saved : E.save
        }), e[23] = r, e[24] = n, e[25] = h, e[26] = i, e[27] = d, e[28] = p, e[29] = u, e[30] = o.description, e[31] = o.files, e[32] = o.skillName, e[33] = V) : V = e[33];
        let T;
        return e[34] !== N || e[35] !== V ? (T = m.jsxs(m.Fragment, {
            children: [N, V]
        }), e[34] = N, e[35] = V, e[36] = T) : T = e[36], T
    }, {
        showAtTurnEnd: !0
    }),
    E = D({
        statusNew: {
            id: "te9Jmk",
            defaultMessage: "Draft"
        },
        statusExisting: {
            id: "C1CKru",
            defaultMessage: "Edited"
        },
        save: {
            id: "G4fgt3",
            defaultMessage: "Save"
        },
        saved: {
            id: "1wRKOV",
            defaultMessage: "Saved"
        }
    });

function ve(s) {
    return [s.relativePath, {
        start: 0,
        length: Number(s.byteLength)
    }]
}

function ye(s) {
    return [s.relativePath, s.content || ""]
}
const we = s => {
        const e = ne(),
            t = P(() => e && J(e)),
            n = !s || oe(s) ? s : ie(s);
        return n ? t ? .find(l => l.systemHint === n) ? ? null : null
    },
    je = S("mcpElicitation", s => {
        "use forget";
        const e = k.c(16),
            {
                element: t,
                elementViewComponent: n
            } = s,
            l = we(t.metadata ? .connectorId),
            i = Ae;
        let a;
        e[0] !== l ? (a = l && m.jsx(Z, {
            hint: l,
            isNextToLabel: !0,
            className: "h-4 w-4"
        }), e[0] = l, e[1] = a) : a = e[1];
        const f = l ? .name ? ? t.metadata ? .connectorName;
        let d;
        e[2] !== f ? (d = m.jsx("p", {
            className: "text-token-text-secondary",
            children: f
        }), e[2] = f, e[3] = d) : d = e[3];
        let c;
        e[4] !== a || e[5] !== d ? (c = m.jsxs("div", {
            className: "mb-4 flex items-center gap-4",
            children: [a, d]
        }), e[4] = a, e[5] = d, e[6] = c) : c = e[6];
        let u;
        e[7] !== t.message ? (u = m.jsx("p", {
            className: "mb-2 font-medium",
            children: t.message
        }), e[7] = t.message, e[8] = u) : u = e[8];
        let o;
        e[9] !== t.form || e[10] !== n ? (o = m.jsx(q, {
            element: t.form,
            elementViewComponent: n
        }), e[9] = t.form, e[10] = n, e[11] = o) : o = e[11];
        let r;
        return e[12] !== c || e[13] !== u || e[14] !== o ? (r = m.jsxs("div", {
            className: "border-token-border-default rounded-3xl border border-solid bg-white p-4 dark:bg-gray-800",
            ref: i,
            children: [c, u, o]
        }), e[12] = c, e[13] = u, e[14] = o, e[15] = r) : r = e[15], r
    });

function Ae(s) {
    s && s.scrollIntoView({
        behavior: "smooth"
    })
}
const Se = S("question", s => {
    "use forget";
    const e = k.c(16),
        {
            element: t
        } = s,
        {
            click: n
        } = M(t.id),
        l = Ce;
    let i;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (i = m.jsxs("p", {
        className: "text-token-text-secondary mb-2 flex items-center gap-0.5 font-medium",
        children: [m.jsx(K, {
            id: "OnqVok",
            defaultMessage: "Action required"
        }), m.jsx(le, {})]
    }), e[0] = i) : i = e[0];
    let a;
    e[1] !== t.question ? (a = m.jsx("p", {
        className: "mb-2 font-medium",
        children: t.question
    }), e[1] = t.question, e[2] = a) : a = e[2];
    let f;
    e[3] !== t.description ? (f = m.jsx("p", {
        className: "mb-2",
        children: t.description
    }), e[3] = t.description, e[4] = f) : f = e[4];
    let d;
    if (e[5] !== n || e[6] !== t.responses) {
        let o;
        e[8] !== n ? (o = r => m.jsx(R, {
            onClick: () => {
                n(r.id)
            },
            color: r.variant === "primary" ? "primary" : "secondary",
            children: r.text
        }, r.id), e[8] = n, e[9] = o) : o = e[9], d = t.responses.toReversed().map(o), e[5] = n, e[6] = t.responses, e[7] = d
    } else d = e[7];
    let c;
    e[10] !== d ? (c = m.jsx("div", {
        className: "flex justify-end gap-2",
        children: d
    }), e[10] = d, e[11] = c) : c = e[11];
    let u;
    return e[12] !== a || e[13] !== f || e[14] !== c ? (u = m.jsxs("div", {
        className: "my-1",
        ref: l,
        children: [i, m.jsxs("div", {
            className: "border-token-border-default rounded-3xl border border-solid bg-white p-4 dark:bg-gray-800",
            children: [a, f, c]
        })]
    }), e[12] = a, e[13] = f, e[14] = c, e[15] = u) : u = e[15], u
});

function Ce(s) {
    s && s.scrollIntoView({
        behavior: "smooth"
    })
}
const _e = S("mcpToolSuggestion", s => {
    "use forget";
    const e = k.c(22),
        {
            element: t
        } = s,
        {
            click: n
        } = M(t.id);
    let l;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (l = re(), e[0] = l) : l = e[0];
    const i = l,
        a = P(() => ae(i)) ? .get(t.toolId),
        [f, d] = b.useState(!1),
        [c, u] = b.useState("sent"),
        o = Ne;
    let r;
    e[1] !== t.suggestReason ? (r = t.suggestReason && m.jsx("p", {
        className: "mb-4",
        children: t.suggestReason
    }), e[1] = t.suggestReason, e[2] = r) : r = e[2];
    const p = t.description ? ? void 0;
    let g;
    e[3] !== a ? (g = a ? m.jsx(X, {
        connector: a,
        size: "medium"
    }) : void 0, e[3] = a, e[4] = g) : g = e[4];
    let x;
    e[5] !== t.title || e[6] !== p || e[7] !== g ? (x = {
        name: t.title,
        description: p,
        icon: g
    }, e[5] = t.title, e[6] = p, e[7] = g, e[8] = x) : x = e[8];
    const v = f ? "accept" : null;
    let h;
    e[9] !== n || e[10] !== t.installTarget || e[11] !== t.notNowTarget || e[12] !== t.toolId ? (h = j => {
        const {
            action: A
        } = j;
        if (A === "decline") {
            u("declined"), n(t.notNowTarget);
            return
        }(A === "accept" || A === "retry") && ce(me, {
            connectorId: t.toolId,
            noRedirect: !0,
            onComplete: () => {
                n(t.installTarget), d(!1), u("sent")
            },
            onClose: () => {
                d(!1), u("sent")
            }
        })
    }, e[9] = n, e[10] = t.installTarget, e[11] = t.notNowTarget, e[12] = t.toolId, e[13] = h) : h = e[13];
    let y;
    e[14] !== c || e[15] !== x || e[16] !== v || e[17] !== h ? (y = m.jsx(ee, {
        connector: x,
        canShowMoreInfo: !1,
        status: c,
        pendingDecision: v,
        onAction: h
    }), e[14] = c, e[15] = x, e[16] = v, e[17] = h, e[18] = y) : y = e[18];
    let w;
    return e[19] !== r || e[20] !== y ? (w = m.jsxs("div", {
        ref: o,
        children: [r, y]
    }), e[19] = r, e[20] = y, e[21] = w) : w = e[21], w
});

function Ne(s) {
    s && s.scrollIntoView({
        behavior: "smooth"
    })
}
const Ve = [Se, ke, ge, q, je, pe, _e],
    Ee = Object.fromEntries(Ve.map(s => [s.kind, s])),
    Ie = s => {
        "use forget";
        const e = k.c(3),
            {
                element: t,
                turnIsOver: n
            } = s,
            l = n === void 0 ? !1 : n,
            i = Ee[t.type_];
        if (!i || l !== i.showAtTurnEnd) return null;
        let a;
        return e[0] !== i || e[1] !== t ? (a = m.jsx(i, {
            element: t,
            elementViewComponent: Ie
        }), e[0] = i, e[1] = t, e[2] = a) : a = e[2], a
    };
export {
    Ie as A
};
//# sourceMappingURL=ed6eee73-ji4d02fnmn4j27a5.js.map