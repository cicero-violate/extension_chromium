import {
    x as l,
    k as b
} from "./4813494d-javwxs2rmzsrunl2.js";
const n = "payment_method_order",
    g = "247832287",
    _ = "1461259566",
    x = "1461264660",
    u = "4115559014",
    O = "2349107038",
    T = "2349101290";

function i(e) {
    if (!Array.isArray(e)) return;
    const t = e.filter(o => typeof o == "string");
    return t.length > 0 ? t : void 0
}

function h() {
    const e = i(l(_).get(n));
    if (e) return e;
    const t = i(l(x).get(n));
    if (t) return t;
    const o = i(l(u).get(n));
    if (o) return o;
    const f = i(l(O).get(n));
    if (f) return f;
    const r = i(l(T).get(n));
    if (r) return r;
    const d = b(g);
    return i(d.get(n))
}
const R = "4224149292",
    m = "hide_payment_element_name",
    p = {
        name: "never"
    };

function A(e, t) {
    const o = typeof e == "object" ? e.billingDetails : void 0;
    return typeof o == "object" ? t ? { ...p,
        ...o
    } : o : t ? p : o
}

function y(e) {
    return typeof e == "string" && e.startsWith("oaics_")
}

function N(e, t) {
    if (e === void 0) return e;
    const o = e.billingDetails;
    if (typeof o != "object") return e;
    const {
        email: f,
        ...r
    } = o;
    if (y(t) && f != null && f.length > 0 || f === void 0) return e;
    if (Object.keys(r).length > 0) return { ...e,
        billingDetails: r
    };
    const {
        billingDetails: c,
        ...a
    } = e;
    return Object.keys(a).length > 0 ? a : void 0
}

function I(e = {}, {
    checkoutSessionId: t
} = {}) {
    const {
        defaultValues: o,
        fields: f,
        ...r
    } = e, d = h(), c = d ? {
        paymentMethodOrder: d
    } : {}, a = l(R).get(m, !1), s = A(f, a), E = N(o, t);
    return {
        layout: {
            type: "tabs"
        },
        terms: {
            card: "never"
        },
        fields: { ...f,
            ...s !== void 0 ? {
                billingDetails: s
            } : {}
        },
        ...E !== void 0 ? {
            defaultValues: E
        } : {},
        ...c,
        ...r
    }
}

function C({
    isDarkMode: e
}) {
    return {
        theme: "stripe",
        labels: "floating",
        variables: {
            colorBackground: e ? "#303030" : "#ffffff",
            colorDanger: "#e02e2a",
            colorPrimary: e ? "#ffffff" : "#0d0d0d",
            colorPrimaryText: e ? "#303030" : "#ffffff",
            colorText: e ? "#ffffff" : "#101828",
            colorTextPlaceholder: e ? "#afafaf" : "#667085",
            fontFamily: '"Inter", "Inter var", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            borderRadius: "16px",
            spacingUnit: "0",
            gridColumnSpacing: "8px",
            gridRowSpacing: "12px"
        },
        rules: {
            ".Input": {
                backgroundColor: e ? "#303030" : "#f7f7f7",
                border: "none",
                borderRadius: "16px",
                boxShadow: "none",
                padding: "16px",
                transition: "border-color 0.15s ease, box-shadow 0.15s ease"
            },
            ".Input:focus": {
                borderColor: e ? "#ffffff" : "#0d0d0d",
                boxShadow: e ? "0 0 0 1px #ffffff" : "0 0 0 1px #0d0d0d"
            },
            ".Input--invalid": {
                borderColor: "#df1b41",
                boxShadow: "0 0 0 1px rgba(223, 27, 65, 0.12)"
            },
            ".CodeInput": {
                border: `1px solid ${e?"#ffffff":"#0d0d0d"}`
            },
            ".Error": {
                color: "#e02e2a",
                fontWeight: "500"
            },
            ".Tab": {
                backgroundColor: e ? "#303030" : "#f7f7f7",
                border: "none",
                borderRadius: "16px",
                color: e ? "#ffffff" : "#5d5d5d",
                padding: "16px",
                fontWeight: "500",
                display: "flex",
                fontSize: "16px",
                transition: "background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease",
                flexDirection: "row"
            },
            ".Tab:hover": {
                color: e ? "#ffffff" : "#0d0d0d"
            },
            ".Tab:focus": {
                boxShadow: e ? "0 0 0 1px #ffffff" : "0 0 0 1px #0d0d0d"
            },
            ".Tab--selected": {
                borderColor: e ? "#000000" : "#ffffff",
                color: e ? "#ffffff" : "#262626",
                border: "1px solid #e3e3e3",
                backgroundColor: e ? "#303030" : "#ffffff",
                boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)"
            },
            ".Tab--selected:focus": {
                boxShadow: e ? "0 0 0 1px #ffffff" : "0 0 0 1px #0d0d0d"
            },
            ".TabIcon": {
                color: e ? "#ffffff" : "#000000"
            },
            ".Tab--selected .TabIcon": {
                color: e ? "#ffffff" : "#000000"
            },
            ".Block": {
                backgroundColor: e ? "#303030" : "#f7f7f7",
                border: "none",
                borderRadius: "16px",
                boxShadow: "none",
                padding: "16px"
            },
            ".Block:focus": {
                borderColor: e ? "#ffffff" : "#0d0d0d",
                boxShadow: e ? "0 0 0 1px #ffffff" : "0 0 0 1px #0d0d0d"
            },
            ".Label": {
                color: e ? "#afafaf" : "#667085",
                fontWeight: "500"
            },
            ".CardForm": {
                border: "5px solid red"
            }
        }
    }
}
export {
    C as a, I as g, y as i
};
//# sourceMappingURL=2657e442-ol3fn895ivtu1x4l.js.map