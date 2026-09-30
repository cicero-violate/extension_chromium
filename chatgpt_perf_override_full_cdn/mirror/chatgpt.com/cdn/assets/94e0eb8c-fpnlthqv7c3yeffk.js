const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/0a2afdfe-mbv2pr9kfk7xw4m6.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/02833de5-dv0o4y10dk4nqsl1.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/conversation-small-cqp6votf.css", "assets/f5472ced-1pqcle7qcaqv6l79.js", "assets/821579c7-japk0omg1m8lct5s.js", "assets/32d062bc-c88yuanmxvxlo19o.js", "assets/d12af438-kkl59qf6wmex5gd4.js"]))) => i.map(i => d[i]);
import {
    c as te,
    n as se,
    r as b,
    _ as ae,
    u as de,
    p as ue,
    s as me,
    j as t,
    o as ee,
    h as he
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    ch as re,
    bY as Y,
    J as pe,
    cf as ge,
    aH as xe,
    af as be,
    m6 as Me,
    a0 as Ee
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    bL as ve
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    S as je
} from "./cad56d82-peovrk2gl7vkk957.js";
import {
    u as ne,
    a as _e,
    b as ye,
    E as Ne
} from "./f5472ced-1pqcle7qcaqv6l79.js";
const x = he({
        authenticatorLabel: {
            id: "mfaEnrollmentModal.authenticatorLabel",
            defaultMessage: "Authenticator App"
        },
        textCodeLabel: {
            id: "mfaEnrollmentModal.textCodeLabel",
            defaultMessage: "Text a code to your phone number"
        },
        title: {
            id: "mfaEnrollmentModal.title",
            defaultMessage: "Enable a second factor to continue"
        },
        genericStartError: {
            id: "mfaEnrollmentModal.genericStartError",
            defaultMessage: "We couldn't start setup. Please try again."
        }
    }),
    Se = re(() => ae(() =>
        import ("./0a2afdfe-mbv2pr9kfk7xw4m6.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).then(a => a.EnterOtpCodeModal)),
    we = re(() => ae(() =>
        import ("./d12af438-kkl59qf6wmex5gd4.js"), __vite__mapDeps([10, 1, 5, 3, 4, 6, 2, 7, 8, 9])).then(a => a.EnrollTotpModal)),
    le = () => {
        Y(Ne, {
            onOtpRequested: ({
                phoneNumber: a,
                enrollmentSessionId: e,
                factorId: d
            }) => {
                Y(Se, {
                    phoneNumber: a,
                    enrollmentSessionId: e,
                    factorId: d,
                    onActivated: () => {},
                    onBack: () => {
                        le()
                    }
                })
            }
        })
    };

function oe(a) {
    if (a.get("action") !== "enable") return null;
    const e = a.get("factor");
    return e === "totp" || e === "sms" ? e : null
}

function Re(a) {
    return `${a.pathname}${a.search}${a.hash}`
}
const Ce = a => {
    "use forget";
    const e = te.c(54),
        {
            isOpen: d,
            onClose: S,
            onMfaEnabled: u,
            onSelectFactor: m,
            redirectUrl: h
        } = a,
        i = d === void 0 ? !0 : d,
        o = S === void 0 ? Le : S,
        r = de(),
        c = pe(),
        p = _e(),
        s = se();
    let w;
    e[0] !== s || e[1] !== h ? (w = h ? ? Re(s), e[0] = s, e[1] = h, e[2] = w) : w = e[2];
    const C = w;
    let L;
    e[3] !== C ? (L = {
        redirectUrl: C
    }, e[3] = C, e[4] = L) : L = e[4];
    const {
        setupMfa: k
    } = ye(L), {
        status: M,
        show_sms: ce
    } = ne(), [T, X] = b.useState(null), R = b.useRef(!1), Z = b.useRef(!1), [F] = ue(), O = me();
    let P;
    e[5] !== p || e[6] !== r || e[7] !== c ? (P = async () => {
        if (!R.current) {
            R.current = !0;
            try {
                const n = await p.mutateAsync({
                    factor: "totp"
                });
                Y(we, {
                    sessionId: n.session_id,
                    secret: n.secret,
                    onCancelled: () => {
                        R.current = !1
                    },
                    onActivated: () => {
                        R.current = !1
                    }
                })
            } catch (n) {
                const l = n;
                R.current = !1, c.danger(r.formatMessage(x.genericStartError), {
                    error: l
                })
            }
        }
    }, e[5] = p, e[6] = r, e[7] = c, e[8] = P) : P = e[8];
    const G = P;
    let I;
    e[9] !== r || e[10] !== m || e[11] !== k || e[12] !== G || e[13] !== c ? (I = async n => {
        m ? .(n), X(n);
        const l = () => X(null);
        try {
            if (n === "totp") {
                await k("totp", {
                    native_modal: !0
                }) || await G(), l();
                return
            } else if (n === "sms") {
                await k("sms") || le(), l();
                return
            } else {
                c.danger(r.formatMessage(x.genericStartError)), l();
                return
            }
        } catch (f) {
            const Q = f;
            c.danger(r.formatMessage(x.genericStartError), {
                error: Q
            }), l()
        }
    }, e[9] = r, e[10] = m, e[11] = k, e[12] = G, e[13] = c, e[14] = I) : I = e[14];
    const g = I;
    let A, U;
    e[15] !== M || e[16] !== o || e[17] !== u ? (A = () => {
        M === "enabled" && (u ? .(), o ? .())
    }, U = [M, u, o], e[15] = M, e[16] = o, e[17] = u, e[18] = A, e[19] = U) : (A = e[18], U = e[19]), b.useEffect(A, U);
    let $, B;
    e[20] !== g || e[21] !== s.hash || e[22] !== s.pathname || e[23] !== s.search || e[24] !== O || e[25] !== F ? (B = () => {
        if (Z.current) return;
        const n = oe(F);
        if (!n) return;
        Z.current = !0;
        const l = new URLSearchParams(s.search);
        l.delete("action"), l.delete("factor"), l.delete("factor_id");
        const f = l.toString();
        O({
            pathname: s.pathname,
            search: f ? `?${f}` : "",
            hash: s.hash
        }, {
            replace: !0
        }), g(n)
    }, $ = [g, s.hash, s.pathname, s.search, O, F], e[20] = g, e[21] = s.hash, e[22] = s.pathname, e[23] = s.search, e[24] = O, e[25] = F, e[26] = $, e[27] = B) : ($ = e[26], B = e[27]), b.useEffect(B, $);
    const K = M === "enabled" ? !1 : ce;
    let D;
    e[28] === Symbol.for("react.memo_cache_sentinel") ? (D = {
        id: "totp",
        icon: je,
        label: t.jsx(ee, { ...x.authenticatorLabel
        })
    }, e[28] = D) : D = e[28];
    let V;
    e[29] !== K ? (V = [D, ...K ? [{
        id: "sms",
        icon: ve,
        label: t.jsx(ee, { ...x.textCodeLabel
        })
    }] : []], e[29] = K, e[30] = V) : V = e[30];
    const q = V;
    if (M === "enabled") return null;
    let E;
    e[31] !== r ? (E = r.formatMessage(x.title), e[31] = r, e[32] = E) : E = e[32];
    let v;
    e[33] !== E ? (v = t.jsx("span", {
        className: "sr-only",
        children: E
    }), e[33] = E, e[34] = v) : v = e[34];
    let z;
    e[35] === Symbol.for("react.memo_cache_sentinel") ? (z = t.jsxs("div", {
        className: "flex gap-1",
        children: [t.jsx("span", {
            className: "h-1.5 w-1.5 rounded-full bg-gray-200"
        }), t.jsx("span", {
            className: "h-1.5 w-1.5 rounded-full bg-gray-200"
        }), t.jsx("span", {
            className: "h-1.5 w-1.5 rounded-full bg-gray-200"
        })]
    }), e[35] = z) : z = e[35];
    let H;
    e[36] === Symbol.for("react.memo_cache_sentinel") ? (H = t.jsx("div", {
        className: "rounded-xl border-[0.5px] p-2 shadow-sm",
        children: t.jsx(Me, {
            className: "icon-2xl"
        })
    }), e[36] = H) : H = e[36];
    let J;
    e[37] === Symbol.for("react.memo_cache_sentinel") ? (J = t.jsxs("div", {
        className: "flex items-center justify-center gap-4",
        children: [z, H, t.jsxs("div", {
            className: "flex gap-1",
            children: [t.jsx("span", {
                className: "h-1.5 w-1.5 rounded-full bg-gray-200"
            }), t.jsx("span", {
                className: "h-1.5 w-1.5 rounded-full bg-gray-200"
            }), t.jsx("span", {
                className: "h-1.5 w-1.5 rounded-full bg-gray-200"
            })]
        })]
    }), e[37] = J) : J = e[37];
    let j;
    e[38] !== r ? (j = r.formatMessage(x.title), e[38] = r, e[39] = j) : j = e[39];
    let _;
    e[40] !== j ? (_ = t.jsx("div", {
        className: "flex flex-col items-center justify-center",
        children: t.jsx("h1", {
            className: "max-w-[420px] px-4 text-center text-2xl font-semibold",
            children: j
        })
    }), e[40] = j, e[41] = _) : _ = e[41];
    let y;
    e[42] !== T || e[43] !== g || e[44] !== q ? (y = t.jsx("div", {
        className: "border-token-border-default bg-token-bg-primary overflow-hidden rounded-2xl border",
        role: "list",
        children: q.map((n, l) => {
            const {
                id: f,
                icon: Q,
                label: ie
            } = n;
            return t.jsx("div", {
                role: "listitem",
                children: t.jsxs("button", {
                    type: "button",
                    className: be("text-token-text-primary hover:bg-token-bg-tertiary focus-visible:ring-token-focus", "flex w-full items-center gap-3 px-4 py-4 text-start text-sm", "focus-visible:ring-2 focus-visible:ring-offset-2", l !== q.length - 1 && "after:bg-token-border-default relative after:absolute after:start-4 after:end-4 after:bottom-0 after:h-px"),
                    onClick: fe => {
                        if (T != null) {
                            fe.preventDefault();
                            return
                        }
                        g(f)
                    },
                    children: [t.jsx(Q, {
                        className: "h-6 w-6"
                    }), t.jsx("div", {
                        className: "flex flex-1 items-center gap-2",
                        children: ie
                    }), T === f ? t.jsx(ge, {
                        className: "h-4 w-4"
                    }) : t.jsx(xe, {
                        className: "icon-sm"
                    })]
                })
            }, f)
        })
    }), e[42] = T, e[43] = g, e[44] = q, e[45] = y) : y = e[45];
    let N;
    e[46] !== _ || e[47] !== y ? (N = t.jsxs("div", {
        className: "flex flex-col gap-6",
        children: [J, _, y]
    }), e[46] = _, e[47] = y, e[48] = N) : N = e[48];
    let W;
    return e[49] !== i || e[50] !== o || e[51] !== v || e[52] !== N ? (W = t.jsx(Ee, {
        testId: "modal-mfa-enrollment",
        isOpen: i,
        onClose: o,
        showCloseButton: !0,
        contentClassName: "!px-6 !pt-6 md:!pb-[24px]",
        headerClassName: "!px-6 !h-[76px] !items-center",
        title: v,
        children: N
    }), e[49] = i, e[50] = o, e[51] = v, e[52] = N, e[53] = W) : W = e[53], W
};

function Ie(a) {
    "use forget";
    const e = te.c(10);
    let d;
    e[0] !== a ? (d = a === void 0 ? {} : a, e[0] = a, e[1] = d) : d = e[1];
    const {
        enabled: S,
        redirectUrl: u,
        onMfaEnabled: m,
        restoreParentFlowOnResume: h
    } = d, i = S === void 0 ? !0 : S, o = se(), {
        status: r
    } = ne(), c = b.useRef(!1);
    let p, s;
    e[2] !== i || e[3] !== o || e[4] !== m || e[5] !== u || e[6] !== h || e[7] !== r ? (p = () => {
        !(typeof i == "function" ? i() : i) || c.current || r === "enabled" || !oe(new URLSearchParams(o.search)) || (c.current = !0, h ? .() !== !0 && Y(Ce, {
            onClose: () => {
                c.current = !1
            },
            onMfaEnabled: m,
            redirectUrl: u
        }))
    }, s = [i, o, m, h, u, r], e[2] = i, e[3] = o, e[4] = m, e[5] = u, e[6] = h, e[7] = r, e[8] = p, e[9] = s) : (p = e[8], s = e[9]), b.useEffect(p, s)
}

function Le() {}
export {
    Ce as M, oe as g, Ie as u
};
//# sourceMappingURL=94e0eb8c-fpnlthqv7c3yeffk.js.map