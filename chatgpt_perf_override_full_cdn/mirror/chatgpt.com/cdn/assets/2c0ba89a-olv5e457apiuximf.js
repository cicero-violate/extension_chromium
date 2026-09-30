import {
    c as B,
    u as E,
    r as M,
    j as k
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    u as j,
    g as N
} from "./e1d1ae28-lk73qwfctl3clvqu.js";
import {
    S as R
} from "./e802fc66-icima1dn58d02dbp.js";
import {
    g as q
} from "./eda93c10-owa5kvkms7jsn4fn.js";
import {
    fB as w,
    q as y,
    bY as A
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    S as G
} from "./47b5158d-lwpqmbglilo75anj.js";
import {
    eB as L
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import "./2478e8be-fu39n45z77ccw3bg.js";
import "./c50694f1-efc0umb4i9cif66s.js";
import "./d4fd05ef-jcd8acyt60dknv7p.js";
import "./f6f4f1b2-gtlbp7j4szobo0y1.js";
import "./1bc04b52-lymnctp12j4ukscl.js";
import "./1bc04b52-h1em0bjkpkjv8ykw.js";
import "./1bc04b52-homyy2s5cy2i6moh.js";
import "./1bc04b52-pfqcgruptyx7togk.js";
import "./1bc04b52-hnu6g21afx0au4ng.js";
import "./6fd89734-ivsscv8296nz7zhh.js";
const D = f => f.items.map(t => {
        const e = t.item_metadata;
        return {
            id: t.item_payload,
            value: t.item_payload,
            quantity: 1,
            productId: e ? .product_id ? ? void 0,
            title: e ? .product_title ? ? void 0,
            variant: e ? .product_variant_info ? ? void 0,
            price: e ? .product_price ? ? void 0,
            imageUrl: e ? .product_image_url ? ? void 0,
            url: e ? .product_url ? ? void 0,
            metadata: {
                isDigital: e ? .is_digital ? ? void 0
            }
        }
    }),
    ot = f => {
        "use forget";
        const t = B.c(21),
            {
                iconOnly: e
            } = f,
            g = E(),
            h = w();
        let a;
        t[0] === Symbol.for("react.memo_cache_sentinel") ? (a = q(), t[0] = a) : a = t[0];
        const x = a,
            {
                carts: s,
                status: _,
                error: S,
                hasLoaded: o,
                refreshCarts: n,
                removeItem: C
            } = j();
        let m;
        t[1] === Symbol.for("react.memo_cache_sentinel") ? (m = y("3375735072") && y("3109853659"), t[1] = m) : m = t[1];
        const v = m;
        let c, l;
        if (t[2] !== o || t[3] !== n ? (c = () => {
                v && !o && n()
            }, l = [v, o, n], t[2] = o, t[3] = n, t[4] = c, t[5] = l) : (c = t[4], l = t[5]), M.useEffect(c, l), !v) return null;
        const I = N(s),
            b = I > 0 ? String(I) : void 0;
        let p;
        t[6] === Symbol.for("react.memo_cache_sentinel") ? (p = k.jsx(G, {
            className: "icon-sm"
        }), t[6] = p) : p = t[6];
        let r;
        t[7] !== g ? (r = g.formatMessage({
            id: "LGPkAk",
            defaultMessage: "Cart"
        }), t[7] = g, t[8] = r) : r = t[8];
        let i;
        t[9] !== s || t[10] !== h ? .id || t[11] !== S || t[12] !== o || t[13] !== C || t[14] !== _ ? (i = () => {
            A(R, {
                carts: s,
                status: _,
                error: S,
                hasLoaded: o,
                onCheckoutCart: u => {
                    x.openNewCheckout({
                        metadata: {
                            clientThreadId: h ? .id
                        },
                        items: D(u),
                        cart: u
                    })
                },
                onRemoveItem: async u => (await C(u)) ? .carts
            })
        }, t[9] = s, t[10] = h ? .id, t[11] = S, t[12] = o, t[13] = C, t[14] = _, t[15] = i) : i = t[15];
        let d;
        return t[16] !== b || t[17] !== e || t[18] !== r || t[19] !== i ? (d = k.jsx(L, {
            renderAsButton: !0,
            className: "shopping-cart-sidebar-item",
            icon: p,
            label: r,
            badge: b,
            iconOnly: e,
            onClick: i
        }), t[16] = b, t[17] = e, t[18] = r, t[19] = i, t[20] = d) : d = t[20], d
    };
export {
    ot as ShoppingCartSidebarItem
};
//# sourceMappingURL=2c0ba89a-olv5e457apiuximf.js.map