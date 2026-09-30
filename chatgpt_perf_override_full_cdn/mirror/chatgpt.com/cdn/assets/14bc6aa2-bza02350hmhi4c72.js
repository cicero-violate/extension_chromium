import {
    q as _e,
    c as L,
    u as G,
    z as ne,
    h as X,
    j as t,
    o as v,
    r as D
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    R as K,
    z as Se,
    I as Pe,
    J as je,
    cf as ee,
    af as V,
    aw as W,
    aH as Ae,
    B6 as Ne,
    A as Q,
    bi as re,
    b2 as Ie,
    x as ke,
    a0 as Ee,
    fc as Y,
    k0 as we
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    f as Le
} from "./6fd89734-beaqo25ksg3811yj.js";
import {
    bG as de,
    xT as Z,
    bH as Ce,
    eT as Be,
    xU as De
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    g as Te,
    a as Re
} from "./2657e442-ol3fn895ivtu1x4l.js";
import {
    C as Fe
} from "./c8d36e23-ccuyzajtuddlftds.js";
import {
    l as Oe,
    b as Ue,
    u as He,
    a as Ve,
    P as $e,
    A as qe
} from "./b8ba2ec7-b3h6sni00olgnf96.js";
const ze = ({
    params: n = {},
    options: e,
    onError: s
}) => _e({
    queryKey: ["organization-invoices", { ...n,
        ...e
    }],
    queryFn: async () => await K.safeGet("/invoices", {
        parameters: {
            query: {
                starting_after: e.startingAfter,
                ending_before: e.endingBefore,
                limit: e.limit,
                ...n
            }
        }
    }).catch(i => {
        throw s ? .(i), i
    }),
    enabled: "account_id" in n || "organization_id" in n
});

function Ge(n, e) {
    return n ? ? e ? ? null
}

function Ye(n) {
    return n ? n.isEnterprisey() ? {
        organization_id: n.organizationId
    } : {
        account_id: n.id
    } : {}
}

function ce(n) {
    "use forget";
    const e = L.c(3),
        s = Se(),
        i = Pe(),
        d = Ge(s, i),
        o = G(),
        l = je(),
        r = Ye(d);
    let a;
    return e[0] !== o || e[1] !== l ? (a = u => {
        l.danger(o.formatMessage(le.invoicesLoadError, {
            error: u.message
        }), {
            toastId: "invoices",
            loggingTitle: le.invoicesLoadError.defaultMessage,
            loggingDescription: "Failed to load invoices"
        })
    }, e[0] = o, e[1] = l, e[2] = a) : a = e[2], ne(ze({
        params: r,
        options: n,
        onError: a
    }))
}
const le = X({
        invoicesLoadError: {
            id: "organizationBillingInfo.invoicesLoadError.0",
            defaultMessage: "Failed to load invoices. Contact support@openai.com if error persists."
        }
    }),
    me = 4,
    Ke = 10,
    Je = ["draft", "due", "paid", "uncollectible", "void"],
    Qe = new Set(Je),
    We = n => {
        const e = n.paid && typeof n.amount_paid == "number" ? n.amount_paid : n.amount_due;
        return e === 0 && typeof n.total == "number" && n.total < 0 ? n.total : e
    },
    Ze = (n, e) => {
        const s = We(n);
        if (s == null) return e.formatMessage(N.invoiceAmountUnknown);
        const i = (n.currency ? ? "usd").toUpperCase();
        return Le({
            amountMinorUnits: s,
            currency: i
        })
    },
    Xe = n => typeof n == "string" && Qe.has(n),
    et = n => {
        const e = n.status;
        return Xe(e) ? e : n.paid ? "paid" : "due"
    },
    tt = {
        paid: "bg-[var(--green-25)] text-[var(--green-600)]",
        due: "bg-token-bg-status-warning text-token-text-status-warning",
        void: "bg-token-bg-secondary text-token-text-secondary",
        uncollectible: "bg-token-bg-status-error text-token-text-status-error",
        draft: "bg-token-bg-secondary text-token-text-secondary"
    },
    st = "sm:grid sm:grid-cols-[7rem_9ch_auto_auto] sm:gap-x-2",
    ue = "sm:col-span-4 sm:grid sm:[grid-template-columns:subgrid] sm:items-center",
    fe = "shrink-0",
    ge = "shrink-0 sm:justify-self-center",
    pe = "sm:justify-self-center",
    he = "shrink-0 sm:justify-self-end",
    nt = (n, e) => {
        const s = new Date(n.created * 1e3),
            i = n.hosted_invoice_url.length > 0;
        return {
            amountLabel: Ze(n, e),
            createdDateLabel: e.formatDate(s, {
                year: "numeric",
                month: "short",
                day: "numeric"
            }),
            hasInvoiceUrl: i,
            hostedInvoiceUrl: i ? n.hosted_invoice_url : void 0,
            openInvoiceAriaLabel: e.formatMessage(N.openInvoiceLinkAriaLabel, {
                createdDate: s
            }),
            status: et(n)
        }
    },
    ye = n => {
        "use forget";
        const e = L.c(9);
        let s;
        e[0] !== n ? (s = {
            limit: n
        }, e[0] = n, e[1] = s) : s = e[1];
        const {
            data: i,
            isError: d,
            isLoading: o
        } = ce(s), l = i ? .has_more === !0;
        let r;
        e[2] !== i ? .data ? (r = i ? .data ? ? [], e[2] = i ? .data, e[3] = r) : r = e[3];
        let a;
        return e[4] !== d || e[5] !== o || e[6] !== l || e[7] !== r ? (a = {
            hasMoreInvoices: l,
            invoices: r,
            isError: d,
            isLoading: o
        }, e[4] = d, e[5] = o, e[6] = l, e[7] = r, e[8] = a) : a = e[8], a
    },
    xe = ({
        invoices: n,
        isError: e,
        isLoading: s
    }) => !e && !s && n.length === 0;

function Me(n) {
    "use forget";
    const e = L.c(5),
        {
            invoices: s,
            isError: i,
            isLoading: d,
            showColumnsHeader: o
        } = n,
        l = o === void 0 ? !1 : o;
    if (d) {
        let a;
        return e[0] === Symbol.for("react.memo_cache_sentinel") ? (a = t.jsxs("div", {
            className: "text-token-text-secondary flex items-center gap-2 pt-3 text-sm",
            children: [t.jsx(ee, {
                className: "h-4 w-4"
            }), t.jsx(v, { ...N.loadingInvoices
            })]
        }), e[0] = a) : a = e[0], a
    }
    if (i) {
        let a;
        return e[1] === Symbol.for("react.memo_cache_sentinel") ? (a = t.jsx("p", {
            className: "text-token-text-status-warning pt-3 text-sm",
            role: "alert",
            children: t.jsx(v, { ...N.errorLoadingInvoices
            })
        }), e[1] = a) : a = e[1], a
    }
    let r;
    return e[2] !== s || e[3] !== l ? (r = t.jsx(oe, {
        invoices: s,
        showColumnsHeader: l
    }), e[2] = s, e[3] = l, e[4] = r) : r = e[4], r
}

function at(n) {
    "use forget";
    const e = L.c(8),
        {
            status: s
        } = n;
    let i;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (i = {
        paid: N.invoiceStatusPaid,
        due: N.invoiceStatusDue,
        void: N.invoiceStatusVoid,
        uncollectible: N.invoiceStatusUncollectible,
        draft: N.invoiceStatusDraft
    }, e[0] = i) : i = e[0];
    const d = i,
        o = tt[s];
    let l;
    e[1] !== o ? (l = V("shrink-0 rounded-md px-2 py-0.5 text-sm font-medium", o), e[1] = o, e[2] = l) : l = e[2];
    const r = d[s];
    let a;
    e[3] !== r ? (a = t.jsx(v, { ...r
    }), e[3] = r, e[4] = a) : a = e[4];
    let c;
    return e[5] !== l || e[6] !== a ? (c = t.jsx("span", {
        className: l,
        children: a
    }), e[5] = l, e[6] = a, e[7] = c) : c = e[7], c
}

function ot(n) {
    "use forget";
    const e = L.c(25),
        {
            invoice: s
        } = n,
        i = G();
    let d;
    e[0] !== i || e[1] !== s ? (d = nt(s, i), e[0] = i, e[1] = s, e[2] = d) : d = e[2];
    const o = d;
    let l, r;
    e[3] === Symbol.for("react.memo_cache_sentinel") ? (l = V("border-token-border-light grid grid-cols-1 justify-items-start gap-y-2 border-t py-3 first:border-t-0 first:pt-0 last:pb-0", ue), r = V("text-token-text-primary text-sm", fe), e[3] = l, e[4] = r) : (l = e[3], r = e[4]);
    let a;
    e[5] !== o.createdDateLabel ? (a = t.jsx("span", {
        className: r,
        children: o.createdDateLabel
    }), e[5] = o.createdDateLabel, e[6] = a) : a = e[6];
    let c;
    e[7] === Symbol.for("react.memo_cache_sentinel") ? (c = V("text-token-text-primary text-sm tabular-nums", ge), e[7] = c) : c = e[7];
    let u;
    e[8] !== o.amountLabel ? (u = t.jsx("span", {
        className: c,
        children: o.amountLabel
    }), e[8] = o.amountLabel, e[9] = u) : u = e[9];
    let h;
    e[10] !== o.status ? (h = t.jsx("span", {
        className: pe,
        children: t.jsx(at, {
            status: o.status
        })
    }), e[10] = o.status, e[11] = h) : h = e[11];
    const f = o.hostedInvoiceUrl,
        p = !o.hasInvoiceUrl,
        g = o.openInvoiceAriaLabel,
        M = !o.hasInvoiceUrl && "pointer-events-none opacity-30";
    let m;
    e[12] !== M ? (m = V("text-token-text-primary text-sm underline decoration-[1px] underline-offset-2 hover:no-underline", he, M), e[12] = M, e[13] = m) : m = e[13];
    let x;
    e[14] === Symbol.for("react.memo_cache_sentinel") ? (x = t.jsx(v, { ...N.viewInvoiceLink
    }), e[14] = x) : x = e[14];
    let y;
    e[15] !== o.hostedInvoiceUrl || e[16] !== o.openInvoiceAriaLabel || e[17] !== m || e[18] !== p ? (y = t.jsx("a", {
        href: f,
        target: "_blank",
        rel: "noreferrer",
        "aria-disabled": p,
        "aria-label": g,
        className: m,
        children: x
    }), e[15] = o.hostedInvoiceUrl, e[16] = o.openInvoiceAriaLabel, e[17] = m, e[18] = p, e[19] = y) : y = e[19];
    let b;
    return e[20] !== y || e[21] !== a || e[22] !== u || e[23] !== h ? (b = t.jsxs("li", {
        className: l,
        children: [a, u, h, y]
    }), e[20] = y, e[21] = a, e[22] = u, e[23] = h, e[24] = b) : b = e[24], b
}

function it(n) {
    "use forget";
    const e = L.c(8),
        {
            className: s
        } = n;
    let i;
    e[0] !== s ? (i = V("border-token-border-light mb-3 hidden border-b pb-3 text-xs sm:grid", ue, s), e[0] = s, e[1] = i) : i = e[1];
    let d, o, l, r;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (d = t.jsx("span", {
        className: V("text-token-text-secondary text-sm font-medium", fe),
        children: t.jsx(v, { ...N.invoiceDateHeader
        })
    }), o = t.jsx("span", {
        className: V("text-token-text-secondary text-sm font-medium", ge),
        children: t.jsx(v, { ...N.invoiceAmountHeader
        })
    }), l = t.jsx("span", {
        className: V("text-token-text-secondary text-sm font-medium", pe),
        children: t.jsx(v, { ...N.invoiceStatusHeader
        })
    }), r = t.jsx("span", {
        className: he
    }), e[2] = d, e[3] = o, e[4] = l, e[5] = r) : (d = e[2], o = e[3], l = e[4], r = e[5]);
    let a;
    return e[6] !== i ? (a = t.jsxs("div", {
        "aria-hidden": !0,
        className: i,
        children: [d, o, l, r]
    }), e[6] = i, e[7] = a) : a = e[7], a
}
const oe = n => {
        "use forget";
        const e = L.c(10),
            {
                invoices: s,
                showColumnsHeader: i
            } = n,
            d = i === void 0 ? !1 : i;
        let o;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (o = V("my-3", st), e[0] = o) : o = e[0];
        let l;
        e[1] !== d ? (l = d ? t.jsx(it, {}) : null, e[1] = d, e[2] = l) : l = e[2];
        let r;
        e[3] !== s ? (r = s.map(dt), e[3] = s, e[4] = r) : r = e[4];
        let a;
        e[5] !== r ? (a = t.jsx("ul", {
            className: "sm:contents",
            children: r
        }), e[5] = r, e[6] = a) : a = e[6];
        let c;
        return e[7] !== l || e[8] !== a ? (c = t.jsxs("div", {
            className: o,
            children: [l, a]
        }), e[7] = l, e[8] = a, e[9] = c) : c = e[9], c
    },
    Rt = n => {
        "use forget";
        const e = L.c(11),
            {
                limit: s,
                onViewAll: i,
                showColumnsHeader: d
            } = n,
            o = s === void 0 ? me : s,
            l = d === void 0 ? !1 : d,
            r = ye(o);
        if (xe(r)) return null;
        let a;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (a = t.jsx("div", {
            className: "border-token-border-light mt-2 border-b",
            children: t.jsx("p", {
                className: "text-token-text-secondary text-sm",
                children: t.jsx(v, { ...N.billingHistoryTitle
                })
            })
        }), e[0] = a) : a = e[0];
        const u = !l && a;
        let h;
        e[1] !== r || e[2] !== l ? (h = t.jsx(Me, { ...r,
            showColumnsHeader: l
        }), e[1] = r, e[2] = l, e[3] = h) : h = e[3];
        let f;
        e[4] !== i || e[5] !== r ? (f = i && r.hasMoreInvoices ? t.jsx("div", {
            className: "mt-4",
            children: t.jsx(W, {
                type: "button",
                color: "secondary",
                fullWidth: !0,
                className: "h-10 rounded-full",
                onClick: i,
                children: t.jsx(v, { ...N.viewAllInvoicesButton
                })
            })
        }) : null, e[4] = i, e[5] = r, e[6] = f) : f = e[6];
        let p;
        return e[7] !== u || e[8] !== h || e[9] !== f ? (p = t.jsxs("div", {
            className: "px-6 pb-4",
            children: [u, h, f]
        }), e[7] = u, e[8] = h, e[9] = f, e[10] = p) : p = e[10], p
    },
    Ft = n => {
        "use forget";
        const e = L.c(15),
            {
                limit: s,
                onViewAll: i,
                showColumnsHeader: d,
                className: o
            } = n,
            l = s === void 0 ? me : s,
            r = d === void 0 ? !0 : d,
            a = ye(l);
        if (xe(a)) return null;
        let c;
        e[0] !== o ? (c = V("border-token-border-default bg-token-bg-primary overflow-hidden rounded-xl border", o), e[0] = o, e[1] = c) : c = e[1];
        let u;
        e[2] === Symbol.for("react.memo_cache_sentinel") ? (u = t.jsx("h3", {
            className: "text-token-text-primary text-[20px] leading-[25px] font-normal",
            children: t.jsx(v, { ...N.invoicesTitle
            })
        }), e[2] = u) : u = e[2];
        let h;
        e[3] !== i || e[4] !== a ? (h = i && a.hasMoreInvoices ? t.jsx(W, {
            type: "button",
            color: "secondary",
            className: "rounded-full px-5",
            onClick: i,
            children: t.jsx(v, { ...N.viewAllInvoicesButton
            })
        }) : null, e[3] = i, e[4] = a, e[5] = h) : h = e[5];
        let f;
        e[6] !== h ? (f = t.jsxs("div", {
            className: "flex items-start justify-between gap-4 px-6 py-5",
            children: [u, h]
        }), e[6] = h, e[7] = f) : f = e[7];
        let p;
        e[8] !== a || e[9] !== r ? (p = t.jsx("div", {
            className: "px-6 pb-4",
            children: t.jsx(Me, { ...a,
                showColumnsHeader: r
            })
        }), e[8] = a, e[9] = r, e[10] = p) : p = e[10];
        let g;
        return e[11] !== c || e[12] !== f || e[13] !== p ? (g = t.jsxs("section", {
            className: c,
            children: [f, p]
        }), e[11] = c, e[12] = f, e[13] = p, e[14] = g) : g = e[14], g
    };

function rt(n) {
    "use forget";
    const e = L.c(35),
        {
            pageSize: s,
            className: i,
            showColumnsHeader: d
        } = n,
        o = s === void 0 ? Ke : s,
        l = d === void 0 ? !1 : d;
    let r;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (r = {
        previousStartingAfters: []
    }, e[0] = r) : r = e[0];
    const [a, c] = D.useState(r);
    let u;
    e[1] !== o || e[2] !== a.startingAfter ? (u = {
        limit: o,
        startingAfter: a.startingAfter
    }, e[1] = o, e[2] = a.startingAfter, e[3] = u) : u = e[3];
    const {
        data: h,
        isError: f,
        isFetching: p,
        isLoading: g
    } = ce(u);
    let M;
    e[4] !== h ? .data ? (M = h ? .data ? ? [], e[4] = h ? .data, e[5] = M) : M = e[5];
    const m = M,
        x = a.previousStartingAfters.length > 0,
        y = h ? .has_more === !0;
    let b;
    e[6] === Symbol.for("react.memo_cache_sentinel") ? (b = () => {
        c(lt)
    }, e[6] = b) : b = e[6];
    const P = b;
    let E;
    e[7] !== m ? (E = () => {
        const R = m[m.length - 1] ? .id;
        R && c(B => ({
            startingAfter: R,
            previousStartingAfters: [...B.previousStartingAfters, B.startingAfter ? ? null]
        }))
    }, e[7] = m, e[8] = E) : E = e[8];
    const j = E;
    let T;
    e[9] !== m || e[10] !== f || e[11] !== g ? (T = g ? t.jsxs("div", {
        className: "text-token-text-secondary flex items-center gap-2 pt-3 text-sm",
        children: [t.jsx(ee, {
            className: "h-4 w-4"
        }), t.jsx(v, { ...N.loadingInvoices
        })]
    }) : f ? t.jsx("p", {
        className: "text-token-text-status-warning pt-3 text-sm",
        role: "alert",
        children: t.jsx(v, { ...N.errorLoadingInvoices
        })
    }) : m.length > 0 ? t.jsx(oe, {
        invoices: m
    }) : t.jsx("p", {
        className: "text-token-text-secondary pt-3 text-sm",
        children: t.jsx(v, { ...N.noInvoices
        })
    }), e[9] = m, e[10] = f, e[11] = g, e[12] = T) : T = e[12];
    const w = T;
    let I;
    e[13] !== i ? (I = V("px-6 pt-6", i), e[13] = i, e[14] = I) : I = e[14];
    let k;
    e[15] !== w || e[16] !== m || e[17] !== f || e[18] !== g || e[19] !== l ? (k = g || f || m.length === 0 ? w : t.jsx(oe, {
        invoices: m,
        showColumnsHeader: l
    }), e[15] = w, e[16] = m, e[17] = f, e[18] = g, e[19] = l, e[20] = k) : k = e[20];
    let _;
    e[21] !== y || e[22] !== x || e[23] !== m.length || e[24] !== f || e[25] !== p || e[26] !== g || e[27] !== j ? (_ = !g && !f && m.length > 0 && (x || y) ? t.jsxs("div", {
        className: "border-token-border-light mt-4 flex items-center justify-between border-t pt-4",
        children: [t.jsx(W, {
            type: "button",
            color: "secondary",
            size: "small",
            disabled: !x || p,
            onClick: P,
            className: "rounded-full",
            children: t.jsxs("span", {
                className: "flex items-center gap-1",
                children: [t.jsx(de, {
                    className: "icon-sm"
                }), t.jsx(v, { ...N.previousInvoicesPageButton
                })]
            })
        }), t.jsx(W, {
            type: "button",
            color: "secondary",
            size: "small",
            disabled: !y || p,
            onClick: j,
            className: "rounded-full",
            children: t.jsxs("span", {
                className: "flex items-center gap-1",
                children: [t.jsx(v, { ...N.nextInvoicesPageButton
                }), t.jsx(Ae, {
                    className: "icon-sm"
                })]
            })
        })]
    }) : null, e[21] = y, e[22] = x, e[23] = m.length, e[24] = f, e[25] = p, e[26] = g, e[27] = j, e[28] = _) : _ = e[28];
    let A;
    e[29] !== k || e[30] !== _ ? (A = t.jsxs("div", {
        className: "border-token-border-default bg-token-bg-primary overflow-hidden rounded-xl border px-4 py-3",
        children: [k, _]
    }), e[29] = k, e[30] = _, e[31] = A) : A = e[31];
    let C;
    return e[32] !== A || e[33] !== I ? (C = t.jsx("div", {
        className: I,
        children: A
    }), e[32] = A, e[33] = I, e[34] = C) : C = e[34], C
}

function lt(n) {
    if (n.previousStartingAfters.length === 0) return n;
    const e = n.previousStartingAfters.slice(0, -1);
    return {
        startingAfter: (e.length > 0 ? e[e.length - 1] : null) ? ? void 0,
        previousStartingAfters: e
    }
}

function Ot(n) {
    "use forget";
    const e = L.c(12),
        {
            onBack: s
        } = n,
        i = G();
    let d;
    e[0] !== i ? (d = i.formatMessage({
        id: "settingsModal.back",
        defaultMessage: "Back"
    }), e[0] = i, e[1] = d) : d = e[1];
    let o;
    e[2] === Symbol.for("react.memo_cache_sentinel") ? (o = t.jsx(de, {
        className: "icon-sm"
    }), e[2] = o) : o = e[2];
    let l;
    e[3] !== s || e[4] !== d ? (l = t.jsx("button", {
        type: "button",
        "aria-label": d,
        onClick: s,
        className: "hover:bg-token-bg-tertiary -ms-1 rounded p-1",
        children: o
    }), e[3] = s, e[4] = d, e[5] = l) : l = e[5];
    let r;
    e[6] === Symbol.for("react.memo_cache_sentinel") ? (r = t.jsx("span", {
        children: t.jsx(v, { ...N.billingHistoryTitle
        })
    }), e[6] = r) : r = e[6];
    let a;
    e[7] !== l ? (a = t.jsxs("div", {
        className: "flex items-center gap-2",
        children: [l, r]
    }), e[7] = l, e[8] = a) : a = e[8];
    let c;
    e[9] === Symbol.for("react.memo_cache_sentinel") ? (c = t.jsx(rt, {}), e[9] = c) : c = e[9];
    let u;
    return e[10] !== a ? (u = t.jsx(Ne, {
        title: a,
        children: c
    }), e[10] = a, e[11] = u) : u = e[11], u
}
const N = X({
    invoicesTitle: {
        id: "settingsModal.invoicesTitle",
        defaultMessage: "Invoices"
    },
    billingHistoryTitle: {
        id: "settingsModal.billingHistoryTitle",
        defaultMessage: "Billing History"
    },
    viewAllInvoicesButton: {
        id: "settingsModal.viewAllInvoicesButton",
        defaultMessage: "View all"
    },
    viewInvoiceLink: {
        id: "settingsModal.viewInvoiceLink",
        defaultMessage: "View"
    },
    invoiceDateHeader: {
        id: "settingsModal.invoiceDateHeader",
        defaultMessage: "Date"
    },
    invoiceAmountHeader: {
        id: "settingsModal.invoiceAmountHeader",
        defaultMessage: "Amount"
    },
    invoiceStatusHeader: {
        id: "settingsModal.invoiceStatusHeader",
        defaultMessage: "Status"
    },
    loadingInvoices: {
        id: "settingsModal.loadingInvoices",
        defaultMessage: "Loading invoices"
    },
    errorLoadingInvoices: {
        id: "settingsModal.errorLoadingInvoices",
        defaultMessage: "Unable to load invoices. Please try again."
    },
    noInvoices: {
        id: "settingsModal.noInvoices",
        defaultMessage: "No invoices available."
    },
    previousInvoicesPageButton: {
        id: "settingsModal.previousInvoicesPageButton",
        defaultMessage: "Previous"
    },
    nextInvoicesPageButton: {
        id: "settingsModal.nextInvoicesPageButton",
        defaultMessage: "Next"
    },
    invoiceStatusPaid: {
        id: "settingsModal.invoiceStatusPaid",
        defaultMessage: "Paid"
    },
    invoiceStatusDue: {
        id: "settingsModal.invoiceStatusDue",
        defaultMessage: "Due"
    },
    invoiceStatusVoid: {
        id: "settingsModal.invoiceStatusVoid",
        defaultMessage: "Void"
    },
    invoiceStatusUncollectible: {
        id: "settingsModal.invoiceStatusUncollectible",
        defaultMessage: "Failed"
    },
    invoiceStatusDraft: {
        id: "settingsModal.invoiceStatusDraft",
        defaultMessage: "Draft"
    },
    invoiceAmountUnknown: {
        id: "settingsModal.invoiceAmountUnknown",
        defaultMessage: "--"
    },
    openInvoiceLinkAriaLabel: {
        id: "settingsModal.openInvoiceLinkAriaLabel",
        defaultMessage: "Open invoice from {createdDate, date, long}"
    }
});

function dt(n) {
    return t.jsx(ot, {
        invoice: n
    }, n.id)
}
const Ut = (n, e) => {
        const {
            data: s,
            isLoading: i,
            error: d,
            refetch: o
        } = ne({
            queryKey: ["cancellationPromotion"],
            queryFn: async () => K.safeGet("/promotions/cp", {
                parameters: {
                    query: {
                        account_id: n
                    }
                }
            }),
            enabled: e
        });
        return {
            cancellationPromoMetadata: D.useMemo(() => !s ? .metadata || s.metadata.duration ? .period !== "month" ? null : s.metadata, [s]),
            isCancelPromoLoading: i,
            promoError: d,
            refetchCancellationPromotion: o
        }
    },
    ct = async n => {
        const e = await K.safeGet("/payments/stripe_client_bootstrap", {
            parameters: {
                query: {
                    account_id: n
                }
            }
        });
        if (typeof e != "object" || e == null) throw new Error("Missing publishable key in Stripe client bootstrap");
        const s = Reflect.get(e, "publishable_key");
        if (typeof s != "string") throw new Error("Missing publishable key in Stripe client bootstrap");
        return s
    },
    mt = n => {
        "use forget";
        const e = L.c(8);
        let s;
        e[0] !== n ? (s = {
            queryKey: ["settings-stripe-client-bootstrap", n],
            queryFn: () => ct(n)
        }, e[0] = n, e[1] = s) : s = e[1];
        const {
            data: i,
            isLoading: d,
            isError: o
        } = ne(s);
        let l;
        e[2] !== i ? (l = i ? Oe(i) : null, e[2] = i, e[3] = l) : l = e[3];
        const r = l;
        let a;
        return e[4] !== d || e[5] !== o || e[6] !== r ? (a = {
            stripePromise: r,
            isLoadingStripeClientBootstrap: d,
            isStripeClientBootstrapError: o
        }, e[4] = d, e[5] = o, e[6] = r, e[7] = a) : a = e[7], a
    },
    ut = "https://openaiassets.blob.core.windows.net/$web/chatgpt/clients/fineng/ConsumerBillingPage/paymen_method_icons_svg",
    se = n => `${ut}/${n}`,
    H = {
        amex: se("Logo=Amex.svg"),
        cartes_bancaires: "",
        diners: "",
        discover: "",
        eftpos_au: "",
        jcb: "",
        link: "https://openaiassets.blob.core.windows.net/$web/chatgpt/clients/fineng/ConsumerBillingPage/payment_method_assets/link/link-by-stripe-seeklogo.svg",
        mastercard: se("Logo=Mastercard.svg"),
        unknown: "",
        unionpay: se("Logo=Union Pay.svg"),
        visa: se("Logo=Visa.svg")
    },
    $ = X({
        amex: {
            id: "cardBrandNames.amex",
            defaultMessage: "American Express"
        },
        cartes_bancaires: {
            id: "cardBrandNames.cartes_bancaires",
            defaultMessage: "Cartes Bancaires"
        },
        diners: {
            id: "cardBrandNames.diners",
            defaultMessage: "Diners Club"
        },
        discover: {
            id: "cardBrandNames.discover",
            defaultMessage: "Discover"
        },
        eftpos_au: {
            id: "cardBrandNames.eftpos_au",
            defaultMessage: "EFTPOS Australia"
        },
        link: {
            id: "cardBrandNames.link",
            defaultMessage: "Link"
        },
        jcb: {
            id: "cardBrandNames.jcb",
            defaultMessage: "JCB"
        },
        mastercard: {
            id: "cardBrandNames.mastercard",
            defaultMessage: "Mastercard"
        },
        unionpay: {
            id: "cardBrandNames.unionpay",
            defaultMessage: "UnionPay"
        },
        visa: {
            id: "cardBrandNames.visa",
            defaultMessage: "Visa"
        },
        unknown: {
            id: "cardBrandNames.unknown",
            defaultMessage: "Other"
        }
    }),
    ft = X({
        link: {
            id: "paymentMethodNames.link",
            defaultMessage: "Link"
        }
    });

function Ht(n, e) {
    switch (n) {
        case Q.FREE:
            return e.formatMessage(Z.free);
        case Q.GO:
            return e.formatMessage(Z.go);
        case Q.PLUS:
            return e.formatMessage(Z.plus);
        case Q.PRO:
        case Q.PROLITE:
            return e.formatMessage(Z.pro);
        case Q.SELF_SERVE_BUSINESS:
            return e.formatMessage(Z.team);
        default:
            throw new Error(`plan type not implemented: ${n}`)
    }
}

function gt(n, e) {
    switch (n) {
        case "amex":
            return {
                name: e.formatMessage($.amex),
                img_url: H.amex
            };
        case "cartes_bancaires":
            return {
                name: e.formatMessage($.cartes_bancaires),
                img_url: H.cartes_bancaires
            };
        case "diners":
            return {
                name: e.formatMessage($.diners),
                img_url: H.diners
            };
        case "discover":
            return {
                name: e.formatMessage($.discover),
                img_url: H.discover
            };
        case "eftpos_au":
            return {
                name: e.formatMessage($.eftpos_au),
                img_url: H.eftpos_au
            };
        case "link":
            return {
                name: e.formatMessage($.link),
                img_url: H.link
            };
        case "jcb":
            return {
                name: e.formatMessage($.jcb),
                img_url: H.jcb
            };
        case "mastercard":
            return {
                name: e.formatMessage($.mastercard),
                img_url: H.mastercard
            };
        case "unionpay":
            return {
                name: e.formatMessage($.unionpay),
                img_url: H.unionpay
            };
        case "visa":
            return {
                name: e.formatMessage($.visa),
                img_url: H.visa
            };
        case "unknown":
            return {
                name: e.formatMessage($.unknown),
                img_url: H.unknown
            };
        default:
            return {
                name: e.formatMessage($.unknown),
                img_url: H.unknown
            }
    }
}
const pt = "427211931",
    ht = "saved_payment_methods_enabled",
    be = n => n.type === "card",
    yt = n => n.type === "link",
    xt = (n, e) => {
        if (be(n)) {
            const s = gt(n.card.brand, e);
            return {
                title: s.name,
                subtitle: e.formatMessage(S.cardNumberPlaceholder, {
                    last4: n.card.last4
                }),
                img_url: s.img_url
            }
        } else if (yt(n)) return {
            title: e.formatMessage(ft.link),
            subtitle: n.link.email,
            img_url: H.link
        };
        return {
            title: e.formatMessage(S.unsupportedPaymentMethodLabel),
            subtitle: e.formatMessage(S.unsupportedPaymentMethodDescription),
            img_url: ""
        }
    },
    Mt = (n, e) => n.map(s => {
        const i = s.id,
            d = s.type ? ? null,
            o = s.id === e;
        return d === "card" ? {
            id: i,
            type: d,
            isDefault: o,
            card: s.card
        } : d === "link" ? {
            id: i,
            type: d,
            isDefault: o,
            link: s.link
        } : {
            id: i,
            type: d,
            isDefault: o
        }
    }),
    bt = n => {
        "use forget";
        const e = L.c(2);
        let s;
        return e[0] !== n ? (s = {
            queryKey: ["settings-payment-methods", n],
            queryFn: async () => await K.safeGet("/payments/payment_methods", {
                parameters: {
                    query: {
                        account_id: n
                    }
                }
            })
        }, e[0] = n, e[1] = s) : s = e[1], ne(s)
    },
    vt = n => {
        if (be(n)) {
            const e = new Date,
                s = e.getFullYear(),
                i = e.getMonth() + 1;
            return n.card.exp_year < s || n.card.exp_year === s && n.card.exp_month < i
        }
        return !1
    },
    _t = async (n, e) => {
        await K.safePost("/payments/payment_method/default", {
            requestBody: {
                account_id: n,
                payment_method_id: e
            }
        })
    },
    St = async (n, e) => {
        await K.safeDelete("/payments/payment_method/{payment_method_id}", {
            parameters: {
                path: {
                    payment_method_id: e
                },
                query: {
                    account_id: n
                }
            }
        })
    },
    Pt = (n, e) => {
        if (typeof n != "object" || n == null) return null;
        const s = Reflect.get(n, e);
        return typeof s == "string" ? s : null
    },
    jt = n => {
        "use forget";
        const e = L.c(27),
            {
                paymentMethod: s,
                isActionPending: i,
                onSetDefaultPaymentMethod: d,
                onEditPaymentMethod: o,
                onRemovePaymentMethod: l
            } = n,
            r = G(),
            a = !s.isDefault,
            c = !!o,
            u = !s.isDefault;
        if (!(a || c || u)) return null;
        let f;
        e[0] !== r ? (f = r.formatMessage(S.paymentMethodActionsMenuAriaLabel), e[0] = r, e[1] = f) : f = e[1];
        let p;
        e[2] === Symbol.for("react.memo_cache_sentinel") ? (p = t.jsx(De, {
            className: "icon-sm"
        }), e[2] = p) : p = e[2];
        let g;
        e[3] !== f ? (g = t.jsx(Y.BasicTrigger, {
            asChild: !0,
            children: t.jsx("button", {
                type: "button",
                className: "text-token-text-tertiary hover:text-token-text-secondary rounded p-1",
                "aria-label": f,
                children: p
            })
        }), e[3] = f, e[4] = g) : g = e[4];
        let M;
        e[5] !== a || e[6] !== i || e[7] !== d || e[8] !== s.id ? (M = a && t.jsx(Y.Item, {
            icon: we,
            disabled: i,
            onClick: () => {
                d(s.id)
            },
            children: t.jsx(v, { ...S.setAsDefaultAction
            })
        }), e[5] = a, e[6] = i, e[7] = d, e[8] = s.id, e[9] = M) : M = e[9];
        let m;
        e[10] !== c || e[11] !== i || e[12] !== o || e[13] !== s.id ? (m = c && o && t.jsx(Y.Item, {
            icon: Ce,
            disabled: i,
            onClick: () => {
                o(s.id)
            },
            children: t.jsx(v, { ...S.editPaymentMethodAction
            })
        }), e[10] = c, e[11] = i, e[12] = o, e[13] = s.id, e[14] = m) : m = e[14];
        let x;
        e[15] !== u || e[16] !== i || e[17] !== l || e[18] !== s.id ? (x = u && t.jsx(Y.Item, {
            color: "danger",
            icon: Be,
            disabled: i,
            onClick: () => {
                l(s.id)
            },
            children: t.jsx(v, { ...S.removePaymentMethodAction
            })
        }), e[15] = u, e[16] = i, e[17] = l, e[18] = s.id, e[19] = x) : x = e[19];
        let y;
        e[20] !== M || e[21] !== m || e[22] !== x ? (y = t.jsx(Y.Portal, {
            children: t.jsxs(Y.Content, {
                align: "end",
                size: "auto",
                sideOffset: 4,
                children: [M, m, x]
            })
        }), e[20] = M, e[21] = m, e[22] = x, e[23] = y) : y = e[23];
        let b;
        return e[24] !== g || e[25] !== y ? (b = t.jsxs(Y.Root, {
            children: [g, y]
        }), e[24] = g, e[25] = y, e[26] = b) : b = e[26], b
    },
    At = n => {
        "use forget";
        const e = L.c(35),
            {
                paymentMethod: s,
                isActionPending: i,
                onSetDefaultPaymentMethod: d,
                onEditPaymentMethod: o,
                onRemovePaymentMethod: l
            } = n,
            r = G();
        let a;
        e[0] !== r || e[1] !== s ? (a = xt(s, r), e[0] = r, e[1] = s, e[2] = a) : a = e[2];
        const c = a,
            u = !!c.img_url;
        let h;
        e[3] !== s ? (h = vt(s), e[3] = s, e[4] = h) : h = e[4];
        const f = h;
        let p;
        e[5] !== c.img_url || e[6] !== u ? (p = t.jsx("div", {
            "aria-hidden": !0,
            className: "bg-token-bg-tertiary flex h-8 w-8 shrink-0 items-center justify-center rounded",
            children: u ? t.jsx("img", {
                src: c.img_url,
                alt: "",
                className: "h-5 w-6 object-contain"
            }) : t.jsx(Fe, {
                className: "icon-sm"
            })
        }), e[5] = c.img_url, e[6] = u, e[7] = p) : p = e[7];
        let g;
        e[8] !== c.title ? (g = t.jsx("p", {
            className: "text-token-text-primary text-sm font-medium",
            children: c.title
        }), e[8] = c.title, e[9] = g) : g = e[9];
        let M;
        e[10] !== c.subtitle ? (M = t.jsx("p", {
            className: "text-token-text-secondary text-sm",
            children: c.subtitle
        }), e[10] = c.subtitle, e[11] = M) : M = e[11];
        let m;
        e[12] !== g || e[13] !== M ? (m = t.jsxs("div", {
            className: "min-w-0",
            children: [g, M]
        }), e[12] = g, e[13] = M, e[14] = m) : m = e[14];
        let x;
        e[15] !== p || e[16] !== m ? (x = t.jsxs("div", {
            className: "flex min-w-0 items-center gap-3",
            children: [p, m]
        }), e[15] = p, e[16] = m, e[17] = x) : x = e[17];
        let y;
        e[18] !== f ? (y = f && t.jsx("span", {
            className: "rounded-full bg-[#FB6A2229] px-2 py-0.5 text-center text-[12px] leading-[18px] font-semibold tracking-[0px] text-[#923B0F]",
            children: t.jsx(v, { ...S.expiredBadge
            })
        }), e[18] = f, e[19] = y) : y = e[19];
        let b;
        e[20] !== s.isDefault ? (b = s.isDefault && t.jsx("span", {
            className: "rounded-full bg-[#0285FF21] px-2 py-0.5 text-center text-[12px] leading-[18px] font-semibold tracking-[0px] text-[#004F99]",
            children: t.jsx(v, { ...S.defaultBadge
            })
        }), e[20] = s.isDefault, e[21] = b) : b = e[21];
        let P;
        e[22] !== y || e[23] !== b ? (P = t.jsxs("div", {
            className: "ms-auto flex shrink-0 items-center justify-end gap-1",
            children: [y, b]
        }), e[22] = y, e[23] = b, e[24] = P) : P = e[24];
        let E;
        e[25] !== i || e[26] !== o || e[27] !== l || e[28] !== d || e[29] !== s ? (E = t.jsx(jt, {
            paymentMethod: s,
            isActionPending: i,
            onSetDefaultPaymentMethod: d,
            onEditPaymentMethod: o,
            onRemovePaymentMethod: l
        }), e[25] = i, e[26] = o, e[27] = l, e[28] = d, e[29] = s, e[30] = E) : E = e[30];
        let j;
        return e[31] !== P || e[32] !== E || e[33] !== x ? (j = t.jsxs("li", {
            className: "flex items-center justify-between gap-4 py-3",
            children: [x, P, E]
        }), e[31] = P, e[32] = E, e[33] = x, e[34] = j) : j = e[34], j
    },
    Nt = n => {
        "use forget";
        const e = L.c(32),
            {
                onSuccess: s
            } = n,
            i = G(),
            d = He(),
            o = Ve();
        let l;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (l = ke(pt).get(ht, !1), e[0] = l) : l = e[0];
        const r = l,
            [a, c] = D.useState(null),
            [u, h] = D.useState(!1),
            [f, p] = D.useState(!1),
            [g, M] = D.useState(!1),
            [m, x] = D.useState(!1),
            [y, b] = D.useState(!1),
            [P, E] = D.useState(null);
        let j;
        e[1] === Symbol.for("react.memo_cache_sentinel") ? (j = Te(), e[1] = j) : j = e[1];
        const T = j,
            w = m && y,
            I = !d || !o || u || !w || !f || !g;
        let k;
        e[2] !== P || e[3] !== o || e[4] !== i || e[5] !== s || e[6] !== d ? (k = async J => {
            if (J.preventDefault(), !d || !o) return;
            c(null), h(!0);
            const ie = i.formatMessage(S.errorSavingPaymentMethodForm),
                ve = {
                    return_url: window.location.href,
                    payment_method_data: { ...r ? {
                            allow_redisplay: "always"
                        } : {},
                        billing_details: { ...P
                        }
                    }
                };
            try {
                const ae = await d.confirmSetup({
                    elements: o,
                    redirect: "if_required",
                    confirmParams: ve
                });
                ae.error ? ae.error.message ? c(ae.error.message) : c(ie) : s()
            } catch {
                c(ie)
            }
            h(!1)
        }, e[2] = P, e[3] = o, e[4] = i, e[5] = s, e[6] = d, e[7] = k) : k = e[7];
        const _ = k;
        let A;
        e[8] === Symbol.for("react.memo_cache_sentinel") ? (A = () => {
            x(!0)
        }, e[8] = A) : A = e[8];
        let C;
        e[9] !== a ? (C = t.jsx($e, {
            options: T,
            onReady: A,
            onChange: J => {
                p(J.complete), a && c(null)
            }
        }), e[9] = a, e[10] = C) : C = e[10];
        let R;
        e[11] !== y ? (R = y && t.jsx("p", {
            className: "text-token-text-primary text-sm font-medium",
            children: t.jsx(v, { ...S.billingAddressSectionTitle
            })
        }), e[11] = y, e[12] = R) : R = e[12];
        let B, U;
        e[13] === Symbol.for("react.memo_cache_sentinel") ? (B = {
            mode: "billing"
        }, U = () => {
            b(!0)
        }, e[13] = B, e[14] = U) : (B = e[13], U = e[14]);
        let F;
        e[15] !== a ? (F = t.jsx(qe, {
            options: B,
            onReady: U,
            onChange: J => {
                E(J.value), M(J.complete), a && c(null)
            }
        }), e[15] = a, e[16] = F) : F = e[16];
        let q;
        e[17] !== R || e[18] !== F ? (q = t.jsxs("div", {
            className: "space-y-2",
            children: [R, F]
        }), e[17] = R, e[18] = F, e[19] = q) : q = e[19];
        let z;
        e[20] !== a ? (z = a ? t.jsx("p", {
            className: "text-token-text-status-warning text-sm",
            role: "alert",
            children: a
        }) : null, e[20] = a, e[21] = z) : z = e[21];
        let O;
        e[22] !== w || e[23] !== I || e[24] !== u ? (O = w && t.jsxs(t.Fragment, {
            children: [t.jsx("p", {
                className: "text-token-text-tertiary text-sm",
                children: t.jsx(v, { ...S.addPaymentMethodDisclosure
                })
            }), t.jsx("div", {
                className: "pt-1",
                children: t.jsx(W, {
                    type: "submit",
                    disabled: I,
                    className: "h-11 w-full rounded-full",
                    children: u ? t.jsx(ee, {
                        className: "h-4 w-4"
                    }) : t.jsx(v, { ...S.continueAddPaymentMethodButton
                    })
                })
            })]
        }), e[22] = w, e[23] = I, e[24] = u, e[25] = O) : O = e[25];
        let te;
        return e[26] !== _ || e[27] !== q || e[28] !== z || e[29] !== O || e[30] !== C ? (te = t.jsxs("form", {
            className: "space-y-5",
            onSubmit: _,
            children: [C, q, z, O]
        }), e[26] = _, e[27] = q, e[28] = z, e[29] = O, e[30] = C, e[31] = te) : te = e[31], te
    },
    It = n => {
        "use forget";
        const e = L.c(27),
            {
                accountId: s,
                onClose: i,
                onSuccess: d
            } = n,
            o = G(),
            l = Ie(),
            [r, a] = D.useState(null),
            {
                stripePromise: c,
                isLoadingStripeClientBootstrap: u,
                isStripeClientBootstrapError: h
            } = mt(s),
            [f, p] = D.useState(!0),
            [g, M] = D.useState(null);
        let m, x;
        e[0] !== s || e[1] !== o ? (m = () => {
            let _ = !0;
            const A = o.formatMessage(S.errorLoadingPaymentSetupForm),
                C = () => {
                    _ && (p(!1), M(A))
                };
            return (async () => {
                try {
                    const B = await K.safePost("/payments/payment_method", {
                        requestBody: {
                            account_id: s
                        },
                        skipJsonTransform: !0
                    });
                    if (!_) return;
                    const U = await B.json(),
                        F = Pt(U, "client_secret");
                    if (!F) {
                        C();
                        return
                    }
                    a(F)
                } catch {
                    C()
                }
                p(!1)
            })(), () => {
                _ = !1
            }
        }, x = [s, o], e[0] = s, e[1] = o, e[2] = m, e[3] = x) : (m = e[2], x = e[3]), D.useEffect(m, x);
        let y;
        e: {
            if (!r) {
                y = null;
                break e
            }
            let _;e[4] !== l ? (_ = Re({
                isDarkMode: l
            }), e[4] = l, e[5] = _) : _ = e[5];
            let A;e[6] !== r || e[7] !== _ ? (A = {
                clientSecret: r,
                loader: "auto",
                appearance: _
            }, e[6] = r, e[7] = _, e[8] = A) : A = e[8],
            y = A
        }
        const b = y,
            P = f || u;
        let E;
        e[9] !== o || e[10] !== h || e[11] !== g ? (E = g || (h ? o.formatMessage(S.errorLoadingPaymentSetupForm) : null), e[9] = o, e[10] = h, e[11] = g, e[12] = E) : E = e[12];
        const j = E;
        let T;
        e[13] !== o ? (T = o.formatMessage(S.addPaymentMethodModalTitle), e[13] = o, e[14] = T) : T = e[14];
        let w;
        e[15] !== T ? (w = t.jsx("span", {
            className: "text-[22px] leading-7 font-[510] tracking-[-0.01em]",
            children: T
        }), e[15] = T, e[16] = w) : w = e[16];
        let I;
        e[17] !== P || e[18] !== d || e[19] !== j || e[20] !== b || e[21] !== c ? (I = P ? t.jsxs("div", {
            className: "text-token-text-secondary flex items-center gap-2 text-sm",
            children: [t.jsx(ee, {
                className: "h-4 w-4"
            }), t.jsx(v, { ...S.loadingPaymentSetupForm
            })]
        }) : j ? t.jsx("p", {
            className: "text-token-text-status-warning text-sm",
            role: "alert",
            children: j
        }) : c && b ? t.jsx(Ue, {
            stripe: c,
            options: b,
            children: t.jsx(Nt, {
                onSuccess: d
            })
        }) : t.jsx("p", {
            className: "text-token-text-status-warning text-sm",
            role: "alert",
            children: t.jsx(v, { ...S.errorLoadingPaymentSetupForm
            })
        }), e[17] = P, e[18] = d, e[19] = j, e[20] = b, e[21] = c, e[22] = I) : I = e[22];
        let k;
        return e[23] !== i || e[24] !== w || e[25] !== I ? (k = t.jsx(Ee, {
            isOpen: !0,
            testId: "modal-add-payment-method",
            onClose: i,
            showCloseButton: !0,
            closeButtonClassName: "h-7 w-7 rounded-md hover:bg-transparent keyboard-focused:bg-transparent",
            className: "max-w-[540px]!",
            title: w,
            headerClassName: "!px-6 !pt-6 !pb-3",
            contentClassName: "!px-6 !pt-4 !pb-6",
            children: I
        }), e[23] = i, e[24] = w, e[25] = I, e[26] = k) : k = e[26], k
    },
    kt = n => {
        "use forget";
        const e = L.c(19),
            {
                className: s,
                isLoading: i,
                hasError: d,
                paymentMethods: o,
                isPaymentMethodActionPending: l,
                paymentMethodActionError: r,
                onAddNewPaymentMethod: a,
                onSetDefaultPaymentMethod: c,
                onEditPaymentMethod: u,
                onRemovePaymentMethod: h
            } = n,
            f = d === void 0 ? !1 : d,
            p = l === void 0 ? !1 : l;
        let g;
        e[0] !== s ? (g = V("border-token-border-default bg-token-bg-primary overflow-hidden rounded-xl border", s), e[0] = s, e[1] = g) : g = e[1];
        let M;
        e[2] === Symbol.for("react.memo_cache_sentinel") ? (M = t.jsx("h3", {
            className: "text-token-text-primary text-[20px] leading-[25px] font-normal",
            children: t.jsx(v, { ...S.paymentMethodsTitle
            })
        }), e[2] = M) : M = e[2];
        let m;
        e[3] === Symbol.for("react.memo_cache_sentinel") ? (m = t.jsx(v, { ...S.addNewPaymentMethodButton
        }), e[3] = m) : m = e[3];
        let x;
        e[4] !== a ? (x = t.jsxs("div", {
            className: "flex items-start justify-between gap-4 px-6 py-5",
            children: [M, t.jsx(W, {
                type: "button",
                color: "secondary",
                className: "rounded-full px-5",
                onClick: a,
                children: m
            })]
        }), e[4] = a, e[5] = x) : x = e[5];
        let y;
        e[6] !== f || e[7] !== i || e[8] !== p || e[9] !== u || e[10] !== h || e[11] !== c || e[12] !== r || e[13] !== o ? (y = t.jsx("div", {
            className: "px-6 pb-4",
            children: i ? t.jsxs("div", {
                className: "text-token-text-secondary mb-2 flex items-center gap-2 text-sm",
                children: [t.jsx(ee, {
                    className: "h-4 w-4"
                }), t.jsx(v, { ...S.loadingPaymentMethods
                })]
            }) : f ? t.jsx("p", {
                className: "text-token-text-status-warning text-sm",
                role: "alert",
                children: t.jsx(v, { ...S.errorLoadingPaymentMethods
                })
            }) : o.length > 0 ? t.jsxs(t.Fragment, {
                children: [r && t.jsx("p", {
                    className: "text-token-text-status-warning mb-2 text-sm",
                    role: "alert",
                    children: r
                }), t.jsx("ul", {
                    children: o.map(P => t.jsx(At, {
                        paymentMethod: P,
                        isActionPending: p,
                        onSetDefaultPaymentMethod: c,
                        onEditPaymentMethod: u,
                        onRemovePaymentMethod: h
                    }, P.id))
                })]
            }) : t.jsx("p", {
                className: "text-token-text-secondary text-sm",
                children: t.jsx(v, { ...S.noPaymentMethods
                })
            })
        }), e[6] = f, e[7] = i, e[8] = p, e[9] = u, e[10] = h, e[11] = c, e[12] = r, e[13] = o, e[14] = y) : y = e[14];
        let b;
        return e[15] !== g || e[16] !== x || e[17] !== y ? (b = t.jsxs("section", {
            className: g,
            children: [x, y]
        }), e[15] = g, e[16] = x, e[17] = y, e[18] = b) : b = e[18], b
    },
    Vt = n => {
        "use forget";
        const e = L.c(33),
            {
                accountId: s,
                className: i
            } = n,
            d = G(),
            {
                isLoading: o,
                isFetching: l,
                isError: r,
                data: a,
                refetch: c
            } = bt(s),
            [u, h] = D.useState(!1),
            [f, p] = D.useState(null),
            [g, M] = D.useState(!1);
        let m;
        e[0] !== a ? .payment_methods ? (m = a ? .payment_methods ? ? [], e[0] = a ? .payment_methods, e[1] = m) : m = e[1];
        const x = a ? .default_payment_method_id ? ? null;
        let y;
        e[2] !== m || e[3] !== x ? (y = Mt(m, x), e[2] = m, e[3] = x, e[4] = y) : y = e[4];
        const b = y;
        let P;
        e[5] === Symbol.for("react.memo_cache_sentinel") ? (P = () => {
            h(!0)
        }, e[5] = P) : P = e[5];
        const E = P;
        let j;
        e[6] === Symbol.for("react.memo_cache_sentinel") ? (j = () => {
            h(!1)
        }, e[6] = j) : j = e[6];
        const T = j;
        let w;
        e[7] !== c ? (w = () => {
            h(!1), p(null), M(!1), c()
        }, e[7] = c, e[8] = w) : w = e[8];
        const I = w;
        let k;
        e[9] !== s || e[10] !== d || e[11] !== c ? (k = q => {
            const z = d.formatMessage(S.errorSettingDefaultPaymentMethod);
            M(!0), _t(s, q).then(async () => {
                p(null), await c()
            }).catch(O => {
                p(O instanceof re && O.message ? O.message : z)
            }).then(() => {
                M(!1)
            })
        }, e[9] = s, e[10] = d, e[11] = c, e[12] = k) : k = e[12];
        const _ = k;
        let A;
        e[13] !== s || e[14] !== d || e[15] !== c ? (A = q => {
            const z = d.formatMessage(S.errorRemovingPaymentMethod);
            M(!0), St(s, q).then(async () => {
                p(null), await c()
            }).catch(O => {
                p(O instanceof re && O.message ? O.message : z)
            }).then(() => {
                M(!1)
            })
        }, e[13] = s, e[14] = d, e[15] = c, e[16] = A) : A = e[16];
        const C = A,
            R = o || l;
        let B;
        e[17] !== i || e[18] !== C || e[19] !== _ || e[20] !== r || e[21] !== g || e[22] !== f || e[23] !== b || e[24] !== R ? (B = t.jsx(kt, {
            className: i,
            isLoading: R,
            hasError: r,
            paymentMethods: b,
            isPaymentMethodActionPending: g,
            paymentMethodActionError: f,
            onAddNewPaymentMethod: E,
            onSetDefaultPaymentMethod: _,
            onEditPaymentMethod: void 0,
            onRemovePaymentMethod: C
        }), e[17] = i, e[18] = C, e[19] = _, e[20] = r, e[21] = g, e[22] = f, e[23] = b, e[24] = R, e[25] = B) : B = e[25];
        let U;
        e[26] !== s || e[27] !== I || e[28] !== u ? (U = u ? t.jsx(It, {
            accountId: s,
            onClose: T,
            onSuccess: I
        }) : null, e[26] = s, e[27] = I, e[28] = u, e[29] = U) : U = e[29];
        let F;
        return e[30] !== B || e[31] !== U ? (F = t.jsxs(t.Fragment, {
            children: [B, U]
        }), e[30] = B, e[31] = U, e[32] = F) : F = e[32], F
    },
    S = X({
        paymentMethodsTitle: {
            id: "settingsModal.paymentMethodsTitle",
            defaultMessage: "Payment methods"
        },
        addNewPaymentMethodButton: {
            id: "settingsModal.addNewPaymentMethodButton",
            defaultMessage: "Add new"
        },
        loadingPaymentMethods: {
            id: "settingsModal.loadingPaymentMethods",
            defaultMessage: "Loading payment methods"
        },
        errorLoadingPaymentMethods: {
            id: "settingsModal.errorLoadingPaymentMethods",
            defaultMessage: "Unable to load payment methods. Please try again."
        },
        errorSettingDefaultPaymentMethod: {
            id: "settingsModal.errorSettingDefaultPaymentMethod",
            defaultMessage: "Unable to set default payment method. Please try again."
        },
        errorRemovingPaymentMethod: {
            id: "settingsModal.errorRemovingPaymentMethod",
            defaultMessage: "Unable to remove payment method. Please try again."
        },
        noPaymentMethods: {
            id: "settingsModal.noPaymentMethods",
            defaultMessage: "No payment methods available."
        },
        cardNumberPlaceholder: {
            id: "settingsModal.cardNumberPlaceholder",
            defaultMessage: "•••• {last4}"
        },
        unsupportedPaymentMethodLabel: {
            id: "settingsModal.unsupportedPaymentMethodLabel",
            defaultMessage: "Payment method"
        },
        unsupportedPaymentMethodDescription: {
            id: "settingsModal.unsupportedPaymentMethodDescription",
            defaultMessage: "Details unavailable"
        },
        defaultBadge: {
            id: "settingsModal.defaultPaymentMethodBadge",
            defaultMessage: "Default"
        },
        expiredBadge: {
            id: "settingsModal.expiredPaymentMethodBadge",
            defaultMessage: "Expired"
        },
        paymentMethodActionsMenuAriaLabel: {
            id: "settingsModal.paymentMethodActionsMenuAriaLabel",
            defaultMessage: "Open payment method actions"
        },
        setAsDefaultAction: {
            id: "settingsModal.setAsDefaultAction",
            defaultMessage: "Set as default"
        },
        editPaymentMethodAction: {
            id: "settingsModal.editPaymentMethodAction",
            defaultMessage: "Edit"
        },
        removePaymentMethodAction: {
            id: "settingsModal.removePaymentMethodAction",
            defaultMessage: "Remove"
        },
        addPaymentMethodModalTitle: {
            id: "settingsModal.addPaymentMethodModalTitle",
            defaultMessage: "Add payment method"
        },
        billingAddressSectionTitle: {
            id: "settingsModal.billingAddressSectionTitle",
            defaultMessage: "Billing address"
        },
        loadingPaymentSetupForm: {
            id: "settingsModal.loadingPaymentSetupForm",
            defaultMessage: "Loading secure payment form..."
        },
        errorLoadingPaymentSetupForm: {
            id: "settingsModal.errorLoadingPaymentSetupForm",
            defaultMessage: "Unable to load payment form. Please try again."
        },
        errorSavingPaymentMethodForm: {
            id: "settingsModal.errorSavingPaymentMethodForm",
            defaultMessage: "Unable to save payment method. Please try again."
        },
        addPaymentMethodDisclosure: {
            id: "settingsModal.addPaymentMethodDisclosure",
            defaultMessage: "By continuing, you agree to save your information for future purchases with OpenAI."
        },
        continueAddPaymentMethodButton: {
            id: "settingsModal.continueAddPaymentMethodButton",
            defaultMessage: "Continue"
        }
    });
export {
    rt as B, Vt as P, ce as a, Ft as b, Rt as c, Ot as d, Ht as g, Ut as u
};
//# sourceMappingURL=14bc6aa2-bza02350hmhi4c72.js.map