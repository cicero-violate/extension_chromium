const b = new WeakMap,
    f = "data-focusgroup-managed",
    d = "data-focusgroup-original-tabindex",
    p = "__missing__";

function g(t) {
    if (!(t instanceof HTMLElement) || t.matches(":disabled") || t.hidden || t.closest("[inert]") || t.classList.contains("hidden!") || t.classList.contains("invisible!") || t.style.display === "none" || t.style.visibility === "hidden") return !1;
    if (t.classList.contains("hidden")) return !t.style.display || t.style.display === "none";
    if (t.classList.contains("invisible")) return !t.style.visibility || t.style.visibility === "hidden";
    if (t.className.includes(":hidden") || t.className.includes(":invisible")) {
        const e = getComputedStyle(t);
        if (e.display === "none" || e.visibility === "hidden") return !1
    }
    return !0
}

function T(t) {
    if (!g(t) || t.matches('[tabindex="-1"]')) return !1;
    if (t.matches('a[href], button, input, select, textarea, summary, [contenteditable="true"]')) return !0;
    const e = t.getAttribute("tabindex");
    return e != null && Number.parseInt(e, 10) >= 0
}

function x(t) {
    return g(t) && t.hasAttribute(f)
}

function E(t) {
    return t.hasAttribute(f)
}

function N(t, e) {
    return t.matches('textarea, select, [contenteditable="true"], input:not([type="button"], [type="checkbox"], [type="color"], [type="file"], [type="image"], [type="radio"], [type="range"], [type="reset"], [type="submit"])') ? !0 : e === "Home" || e === "End" ? t.matches('input, textarea, [contenteditable="true"]') : !1
}

function F(t) {
    const e = b.get(t);
    if (e) return e;
    const n = {
        rememberedItem: null
    };
    return b.set(t, n), n
}

function l(t, e) {
    t.forEach((n, i) => {
        n.setAttribute("tabindex", i === e ? "0" : "-1")
    })
}

function L(t) {
    E(t) || (t.setAttribute(f, ""), t.setAttribute(d, t.getAttribute("tabindex") ? ? p))
}

function M(t) {
    if (!E(t)) return;
    const e = t.getAttribute(d);
    e === p ? t.removeAttribute("tabindex") : e != null && t.setAttribute("tabindex", e), t.removeAttribute(f), t.removeAttribute(d)
}

function c(t, e, n) {
    if (n.nomemory) {
        t.rememberedItem = null;
        return
    }
    t.rememberedItem = new WeakRef(e)
}

function w(t, e, n) {
    if (n.nomemory) return t.rememberedItem = null, null;
    const i = t.rememberedItem ? .deref() ? ? null;
    return i && e.includes(i) ? i : (t.rememberedItem = null, null)
}

function h(t) {
    return t.find(e => e.hasAttribute("focusgroupstart") || e.hasAttribute("focusgroup-start")) ? ? null
}

function A(t) {
    return t.length > 0 ? t[0] : null
}

function y(t, e) {
    return t !== e && t.hasAttribute("focusgroup") && t.getAttribute("focusgroup") !== "none"
}

function I(t, e) {
    return t.find(n => n === e || n.contains(e)) ? ? null
}

function m(t, e) {
    return t !== e && t.hasAttribute("focusgroup")
}

function v(t, e) {
    let n = t.parentElement;
    for (; n && n !== e;) {
        if (n.getAttribute("focusgroup") === "none" || m(n, e)) return !0;
        n = n.parentElement
    }
    return !1
}

function R(t) {
    const e = [],
        n = i => {
            Array.from(i.children).forEach(r => {
                if (r instanceof HTMLElement && !v(r, t)) {
                    if (m(r, t)) {
                        r.getAttribute("focusgroup") !== "none" && e.push(r);
                        return
                    }(x(r) || T(r)) && e.push(r), n(r)
                }
            })
        };
    return n(t), e
}

function _(t) {
    const e = [],
        n = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, {
            acceptNode(r) {
                return !(r instanceof HTMLElement) || r === t ? NodeFilter.FILTER_SKIP : m(r, t) || v(r, t) ? NodeFilter.FILTER_REJECT : x(r) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
            }
        });
    let i;
    for (; i = n.nextNode();) i instanceof HTMLElement && e.push(i);
    return e
}

function H(t, e, n, i, r = !0) {
    if (i) {
        const o = I(e, i);
        if (o) return o
    }
    const u = r && document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (u) {
        const o = I(e, u);
        if (o) return o
    }
    const s = w(t, e, n);
    return s || (h(e) ? ? A(e))
}

function a(t, e, n, i = !0) {
    const r = F(t);
    if (e.behavior === "none") return _(t).forEach(M), r.rememberedItem = null, null;
    const u = R(t);
    u.forEach(L);
    const s = H(r, u, e, n, i),
        o = s ? u.indexOf(s) : -1;
    return l(u, o), {
        activeIndex: o,
        items: u,
        state: r
    }
}

function S(t) {
    const e = h(t.items) ? ? A(t.items),
        n = e ? t.items.indexOf(e) : -1;
    l(t.items, n)
}

function k(t) {
    const e = t.getAttribute("focusgroup");
    if (!e) return null;
    const n = e.split(/\s+/).map(r => r.trim()).filter(Boolean),
        i = n.find(r => ["toolbar", "tablist", "radiogroup", "listbox", "menu", "menubar", "none"].includes(r));
    return i ? {
        behavior: i,
        direction: n.includes("inline") ? "inline" : n.includes("block") ? "block" : "both",
        nomemory: n.includes("nomemory"),
        wrap: !n.includes("nowrap")
    } : null
}

function B(t) {
    const e = k(t);
    if (!e || e.behavior === "none") return;
    const n = a(t, e, null, !1);
    if (!n || n.activeIndex === -1) return;
    const i = n.items[n.activeIndex];
    c(n.state, i, e), l(n.items, n.activeIndex), i.focus()
}

function D(t) {
    return !getComputedStyle(t).writingMode.startsWith("vertical")
}

function O(t, e, n) {
    if (n === "Home") return "first";
    if (n === "End") return "last";
    const i = getComputedStyle(t),
        r = D(t),
        u = i.direction === "rtl";
    if (e !== "both" && e !== ((n === "ArrowLeft" || n === "ArrowRight" ? "horizontal" : "vertical") === "horizontal" ? r ? "inline" : "block" : r ? "block" : "inline")) return null;
    switch (n) {
        case "ArrowRight":
            return r && u ? "previous" : "next";
        case "ArrowLeft":
            return r && u ? "next" : "previous";
        case "ArrowDown":
            return "next";
        case "ArrowUp":
            return "previous";
        default:
            return null
    }
}

function C(t, e, n, i) {
    if (t === 0) return -1;
    if (n === "first") return 0;
    if (n === "last") return t - 1;
    const u = e + (n === "next" ? 1 : -1);
    return i ? (u + t) % t : Math.max(0, Math.min(u, t - 1))
}

function G(t, e, n, i) {
    if (!(t instanceof HTMLElement) || !(e instanceof HTMLElement)) return;
    const r = !(n instanceof Node) || !t.contains(n),
        u = r ? a(t, i, null, !1) : a(t, i, e);
    if (!u || u.activeIndex === -1) return;
    const s = u.items[u.activeIndex];
    if (y(s, t)) {
        c(u.state, s, i), e === s && B(s);
        return
    }
    if (r && s !== e) {
        c(u.state, s, i), s.focus();
        return
    }
    u.items.includes(e) && c(u.state, e, i)
}

function W(t, e, n) {
    if (!(t instanceof HTMLElement) || !n.nomemory || e instanceof Node && t.contains(e)) return;
    const i = a(t, n);
    i && S(i)
}

function z(t, e, n) {
    if (!(t instanceof HTMLElement) || !(e.target instanceof HTMLElement) || N(e.target, e.key)) return;
    const i = O(t, n.direction, e.key);
    if (!i) return;
    const r = a(t, n, e.target);
    if (!r || r.activeIndex === -1) return;
    e.preventDefault();
    const u = C(r.items.length, r.activeIndex, i, n.wrap);
    if (u === -1) return;
    const s = r.items[u];
    if (c(r.state, s, n), l(r.items, u), y(s, t)) {
        s.focus();
        return
    }
    s.focus()
}
export {
    W as handleFocusgroupBlur, G as handleFocusgroupFocus, z as handleFocusgroupKeyDown
};
//# sourceMappingURL=d73aecd6-o5t2hpwcdqdyumaf.js.map