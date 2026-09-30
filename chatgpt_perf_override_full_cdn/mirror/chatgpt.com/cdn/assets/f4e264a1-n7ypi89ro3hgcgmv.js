import {
    f as se,
    r as a,
    j as I,
    $ as Rl
} from "./2340486e-dvd8m80i7d6hyild.js";
let ul, Pn, Oe = typeof window < "u" && window.document && window.document.createElement ? a.useLayoutEffect : a.useEffect,
    vn = e => (t, n) => "calc(" + t + " + (" + n + " - " + t + ") * " + e + ")",
    qe = typeof window < "u" ? window.navigator.userAgent : null,
    At = "unknown",
    we = "unknown";
if (typeof window < "u" && navigator.userAgentData) {
    var Sa;
    !((Sa = navigator.userAgentData.brands) === null || Sa === void 0) && Sa.some(e => e.brand === "Chromium") && (At = "chromium"), navigator.userAgentData.platform === "Android" && (we = "android")
}
if (we === "unknown" && qe ? .match(/android/i) && (we = "android"), At === "unknown" && (qe ? .match(/Chrome/i) ? At = "chromium" : qe ? .match(/Firefox/i) ? At = "gecko" : qe ? .match(/Safari|iPhone/i) && (At = "webkit")), At === "webkit") {
    if (qe ? .match(/iPhone/i)) we = "ios";
    else if (qe ? .match(/iPad/i)) we = "ipados";
    else if (qe ? .match(/Macintosh/i)) try {
        document ? .createEvent("TouchEvent"), we = "ipados"
    } catch {
        we = "macos"
    }
}
var Pl = {};
Pl = {
    mapping: {
        Sheet: {
            componentName: "a",
            elementNames: {
                root: 0,
                view: 1,
                backdrop: 2,
                backdropTrap: 3,
                primaryScrollTrapRoot: 4,
                secondaryScrollTrapRoot: 5,
                scrollContainer: 6,
                frontSpacer: 7,
                backSpacer: 8,
                detentMarker: 9,
                contentWrapper: 10,
                content: 11,
                bleedingBackground: 12,
                stickyContainer: 13,
                sticky: 14,
                leftEdge: 15,
                trigger: 16,
                handle: 17,
                outlet: 18
            },
            variationSetsNames: {
                openness: "A",
                staging: "B",
                opennessClosedStatus: "C",
                position: "D",
                positionCoveredStatus: "E",
                placement: "F",
                track: "G",
                swipeDisabled: "H",
                swipeOutDisabledWithDetent: "I",
                swipeOvershootDisabled: "J",
                bleedDisabled: "K",
                inertOutside: "L",
                backdropSwipeable: "M",
                scrollContainerShouldBePassThrough: "N",
                swipeTrap: "M"
            },
            variationValuesNames: {
                open: "a",
                opening: "b",
                closed: "c",
                closing: "d",
                none: "e",
                top: "f",
                bottom: "g",
                left: "h",
                right: "i",
                horizontal: "j",
                vertical: "k",
                front: "l",
                covered: "m",
                true: "o",
                false: "p",
                auto: "q",
                center: "r",
                pending: "s",
                "flushing-to-preparing-open": "t",
                "flushing-to-preparing-opening": "u",
                "preparing-open": "v",
                "preparing-opening": "x",
                "safe-to-unmount": "y",
                content: "z",
                root: "aa",
                "going-down": "ab",
                "going-up": "ac",
                indeterminate: "ad",
                idle: "ae",
                "come-back": "af",
                out: "ag",
                stepping: "ah",
                both: "ai",
                none: "aj"
            }
        },
        ScrollTrap: {
            componentName: "b",
            elementNames: {
                root: 0,
                stabiliser: 1
            },
            variationSetsNames: {
                active: "A",
                axis: "B",
                automaticallyDisabledForOptimisation: "C"
            },
            variationValuesNames: {
                true: "a",
                false: "b",
                horizontal: "e",
                vertical: "f",
                both: "g",
                none: "h"
            }
        },
        Scroll: {
            componentName: "c",
            elementNames: {
                root: 0,
                view: 1,
                scrollContainer: 2,
                content: 3,
                UAScrollbarMeasurer: 4,
                spy: 5,
                startSpacer: 6,
                endSpacer: 7
            },
            variationSetsNames: {
                axis: "A",
                contentPlacement: "B",
                scrollTrapX: "C",
                scrollTrapY: "D",
                scrollGestureOvershoot: "E",
                scrollDisabled: "F",
                side: "G",
                pageScroll: "H",
                overflowX: "I",
                overflowY: "J",
                skipScrollAnimation: "K",
                scrollAnchoring: "L",
                scrollSnapType: "M",
                scrollPadding: "N",
                scrollTimelineName: "O",
                nativeScrollbar: "P",
                scrollOngoing: "Q"
            },
            variationValuesNames: {
                true: "a",
                false: "b",
                x: "c",
                y: "d",
                both: "e",
                unset: "f",
                contain: "g",
                start: "h",
                end: "i",
                center: "j",
                auto: "k",
                default: "l",
                none: "m",
                mandatoryX: "n",
                mandatoryY: "o",
                proximityX: "p",
                proximityY: "q"
            }
        },
        SlideShow: {
            componentName: "d",
            elementNames: {},
            variationSetsNames: {},
            variationValuesNames: {}
        },
        VisuallyHidden: {
            componentName: "e",
            elementNames: {
                root: 0
            },
            variationSetsNames: {},
            variationValuesNames: {}
        },
        SpecialWrapper: {
            componentName: "f",
            elementNames: {
                root: 0,
                content: 1
            },
            variationSetsNames: {},
            variationValuesNames: {}
        },
        Fixed: {
            componentName: "g",
            elementNames: {
                root: 0
            },
            variationSetsNames: {},
            variationValuesNames: {}
        },
        SheetStack: {
            componentName: "h",
            elementNames: {
                root: 0,
                outlet: 1
            },
            variationSetsNames: {},
            variationValuesNames: {}
        },
        AutoFocusTarget: {
            componentName: "i",
            elementNames: {
                root: 0
            },
            variationSetsNames: {},
            variationValuesNames: {}
        }
    }
};
let aa = Pl.mapping,
    Kr = e => {
        var t;
        return (t = aa[e].componentName) !== null && t !== void 0 ? t : null
    },
    qr = (e, t) => {
        var n;
        return (n = aa[e].elementNames[t]) !== null && n !== void 0 ? n : null
    },
    Jr = (e, t) => {
        var n;
        return (n = aa[e].variationSetsNames[t]) !== null && n !== void 0 ? n : null
    },
    Zr = (e, t) => {
        var n;
        return (n = aa[e].variationValuesNames[t]) !== null && n !== void 0 ? n : null
    },
    We = (e, t) => a.useCallback((n, l = [], i) => {
        var r, s;
        let o, u, c = (s = i == null || (r = i.dataSilk) === null || r === void 0 ? void 0 : r.filter(Boolean).join(" ")) !== null && s !== void 0 ? s : ""; {
            let p = Kr(e);
            if (o = p + qr(e, n), t)
                for (let m = 0; m < l.length; m++) {
                    let d = l[m],
                        f = t[d],
                        h = Jr(e, d),
                        k = Zr(e, f);
                    o += f != null ? " " + p + h + k : ""
                }
            u = {
                className: i ? .className,
                "data-silk": o + " " + c
            }
        }
        return u
    }, [e, ...t ? Object.values(t) : []]),
    On = new WeakMap;
var Qr = typeof Float32Array == "function";

function Gn(e, t, n) {
    return (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e
}

function cl(e, t, n) {
    return 3 * (1 - 3 * n + 3 * t) * e * e + 2 * (3 * n - 6 * t) * e + 3 * t
}

function es(e) {
    return e
}
var Il = function(e, t, n, l) {
    if (!(0 <= e && e <= 1 && 0 <= n && n <= 1)) throw Error("bezier x values must be in [0, 1] range");
    if (e === t && n === l) return es;
    for (var i = Qr ? new Float32Array(11) : Array(11), r = 0; r < 11; ++r) i[r] = Gn(.1 * r, e, n);
    return function(s) {
        return s === 0 || s === 1 ? s : Gn((function(o) {
            for (var u = 0, c = 1; c !== 10 && i[c] <= o; ++c) u += .1;
            var p = u + (o - i[--c]) / (i[c + 1] - i[c]) * .1,
                m = cl(p, e, n);
            return m >= .001 ? (function(d, f, h, k) {
                for (var v = 0; v < 4; ++v) {
                    var b = cl(f, h, k);
                    if (b === 0) break;
                    var y = Gn(f, h, k) - d;
                    f -= y / b
                }
                return f
            })(o, p, e, n) : m === 0 ? p : (function(d, f, h, k, v) {
                var b, y, w = 0;
                do(b = Gn(y = f + (h - f) / 2, k, v) - d) > 0 ? h = y : f = y; while (Math.abs(b) > 1e-7 && ++w < 10);
                return y
            })(o, u, u + .1, e, n)
        })(s), t, l)
    }
};
let ea = e => typeof e == "string" ? document.querySelector(e) : e ? .(),
    Dl = (e, t) => Array.isArray(e) ? e.includes(t) : e === t,
    xa = e => e ? .getAttribute("data-silk-clone") === "true",
    ts = new Set(["checkbox", "radio", "range", "color", "file", "image", "button", "submit", "reset"]),
    en = e => e instanceof HTMLInputElement && !ts.has(e.type) || e instanceof HTMLTextAreaElement || e instanceof HTMLElement && e.isContentEditable,
    dl = e => e instanceof HTMLInputElement && e.type === "color" || e instanceof HTMLSelectElement,
    La = typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    ta = () => {
        var e;
        return window.innerHeight - 200 > ((e = window.visualViewport) === null || e === void 0 ? void 0 : e.height)
    };

function kt({
    nativeEvent: e,
    defaultBehavior: t,
    handler: n
}) {
    let l = t;
    if (n)
        if (typeof n == "function") {
            let i = { ...t,
                nativeEvent: e,
                changeDefault: function(r) {
                    l = { ...t,
                        ...r
                    }, Object.assign(this, r)
                }
            };
            i.changeDefault = i.changeDefault.bind(i), n(i)
        } else l = { ...t,
            ...n
        };
    return l
}

function Nl(e) {
    return (e.startsWith("rgb(") || e.startsWith("rgba(")) && e.endsWith(")") ? e.substring(e.indexOf("(") + 1, e.indexOf(")")).split(",").map(l => l.trim()).slice(0, 3).map(l => parseFloat(l)) : null
}
let ml = e => {
        let t = null;
        return e.startsWith("rgb(") || e.startsWith("rgba(") ? t = Nl(e) : e.startsWith("#") && (t = (function(n) {
            let l = n.replace(/^#/, ""),
                i = l.length === 3 ? l.split("").map(u => u + u).join("") : l;
            if (!/^[0-9A-Fa-f]{6}$/.test(i)) return null;
            let r = parseInt(i.slice(0, 2), 16),
                s = parseInt(i.slice(2, 4), 16),
                o = parseInt(i.slice(4, 6), 16);
            return [r, s, o]
        })(e)), t
    },
    ns = ({
        color: e,
        overlays: t
    }) => {
        let n = [...e],
            l = t.length;
        for (let i = 0; i < l; i++) {
            let r = t[i],
                s = r.alpha;
            for (let o = 0; o < 3; o++) n[o] = (1 - s) * n[o] + s * r.color[o]
        }
        return "rgb(" + n.join(",") + ")"
    },
    as = e => {
        a.useEffect(() => {
            let t = () => {
                ta() ? e(!0) : e(!1)
            };
            return t(), visualViewport.addEventListener("resize", t), () => {
                visualViewport.removeEventListener("resize", t)
            }
        }, [e])
    },
    ls = e => e.matches('[data-silk~="0ad"]:not([data-silk~="0ai"]) *, [data-silk~="0ab"] *'),
    Ll = e => {
        let [t, n] = a.useState(!1), l = a.useCallback(i => {
            e.current && n(!!i && !ls(e.current))
        }, [e]);
        return as(l), t
    },
    Ml = () => we === "android" && At === "chromium" && typeof window < "u" && !window.matchMedia("(display-mode: standalone), (display-mode: minimal-ui), (display-mode: fullscreen)").matches,
    _l = () => {
        var e, t, n;
        return typeof window < "u" && window.navigator.standalone && ((e = document.querySelector("meta[name='viewport']")) === null || e === void 0 ? void 0 : e.content.includes("viewport-fit=cover")) && ((t = document.querySelector("meta[name='apple-mobile-web-app-capable']")) === null || t === void 0 ? void 0 : t.content) === "yes" && ((n = document.querySelector("meta[name='apple-mobile-web-app-status-bar-style']")) === null || n === void 0 ? void 0 : n.content) === "black-translucent"
    },
    xt = () => At === "webkit",
    rs = () => typeof document < "u" ? document.querySelector('meta[name="theme-color"]') : null,
    Nn = ({
        genericContext: e,
        customContext: t,
        value: n,
        children: l
    }) => t ? I.jsx(t.Provider, {
        value: n,
        children: I.jsx(e.Provider, {
            value: n,
            children: l
        })
    }) : I.jsx(e.Provider, {
        value: n,
        children: l
    });
Nn.displayName = "CustomisableContext";
let ss = (e, {
        duration: t,
        cubicBezier: n
    } = {
        duration: 500,
        cubicBezier: [.25, .1, .25, 1]
    }) => {
        let l = Il(...n),
            i = null,
            r = (s, o) => {
                i || (i = s);
                let u = s - i,
                    c = l(u / t);
                u < t ? (o(c), requestAnimationFrame(() => r(document.timeline.currentTime, o))) : o(1)
            };
        r(document.timeline.currentTime, e)
    },
    pl = e => {
        let t = a.useRef(null);
        return Oe(() => {
            t.current = e
        }), a.useCallback((...n) => {
            let l = t.current;
            return l(...n)
        }, [])
    };

function Oa(e) {
    for (let t = 0; t < e.length; t++)
        if (!e[t].matches('[data-silk~="0ad"]')) return e[t];
    return e[0]
}
let Fl = (e, t) => {
        var n;
        let {
            safelyFocusableElements: l,
            safelyTabbableElements: i
        } = la(t, ["[data-silk~='0ac']"]), r = H.autoFocusTargets.filter(m => m.layerId === "any" || m.layerId === e), s = r.filter(m => Dl(m.timing, "present")), o = l.filter(m => s.map(d => d.element).includes(m)), u = Oa(o), c = Oa(i);
        ((n = u ? ? c) !== null && n !== void 0 ? n : t).focus({
            preventScroll: !0
        })
    },
    fl = (e, t, n) => {
        let {
            focus: l
        } = kt({
            nativeEvent: null,
            defaultBehavior: {
                focus: !0
            },
            handler: n
        });
        l && Fl(e, t)
    },
    is = (e, t, n, l) => {
        if (!t.contains(document.activeElement) && document.contains(document.activeElement)) return;
        let {
            focus: i
        } = kt({
            nativeEvent: null,
            defaultBehavior: {
                focus: !0
            },
            handler: n
        });
        if (i) {
            var r;
            let s = H.autoFocusTargets.filter(d => d.layerId === "any" || d.layerId === e),
                o = s.filter(d => Dl(d.timing, "dismiss") && !t.contains(d.element)),
                {
                    safelyFocusableElements: u
                } = la(document.body),
                c = u.filter(d => o.map(f => f.element).includes(d)),
                p = Oa(c);
            ((r = p ? ? l) !== null && r !== void 0 ? r : document.body).focus({
                preventScroll: !0
            })
        }
    },
    gl = e => {
        e.parentNode != null && e.parentNode.removeChild(e)
    },
    hl = () => {
        let e = document.createElement("div");
        return e.tabIndex = 0, e.style.position = "fixed", e.setAttribute("aria-hidden", "true"), e.setAttribute("data-silk", "0aa"), e
    },
    os = e => {
        let t = hl(),
            n = hl();
        return e.insertAdjacentElement("beforebegin", t), e.insertAdjacentElement("afterend", n), () => {
            gl(t), gl(n)
        }
    },
    us = e => !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length),
    la = (e, t = []) => {
        let n = ["input:not([disabled]):not([type=hidden])", "select:not([disabled])", "textarea:not([disabled])", "button:not([disabled])", "a[href]", "area[href]", "summary", "iframe", "object", "embed", "audio[controls]", "video[controls]", "[contenteditable]", "[tabindex]:not([disabled])", ...t],
            l = n.join(","),
            i = e ? [...e.matches(l) ? [e] : [], ...e.querySelectorAll(l)] : [],
            r = [...t, "[aria-hidden='true']", "[aria-hidden='true'] *", "[inert]", "[inert] *"],
            s = i.map(d => ({
                element: d,
                tabbable: d.matches(':not([hidden]):not([tabindex^="-"])'),
                skippable: d.matches(r.join(",")) || !us(d)
            })),
            o = s.filter(d => !d.skippable),
            u = o.map(d => d.element),
            c = s.filter(d => d.tabbable),
            p = c.filter(d => !d.skippable),
            m = p.map(d => d.element);
        return {
            allFocusableElementsWithData: s,
            safelyFocusableElements: u,
            allTabbableElementsWithData: c,
            safelyTabbableElements: m
        }
    },
    Bl = (e, t) => {
        let {
            safelyTabbableElements: n,
            allTabbableElementsWithData: l,
            allFocusableElementsWithData: i
        } = la(e, ["[data-silk~='0ac']"]), r = [...l], s = [...i];
        return t && [r, s].forEach(o => {
            o.unshift({
                element: e.previousElementSibling,
                tabbable: !0,
                skippable: !0
            }), o.push({
                element: e.nextElementSibling,
                tabbable: !0,
                skippable: !0
            })
        }), {
            safelyTabbableElements: n,
            allTabbableElementsWithGuardsWithData: r,
            allFocusableElementsWithGuardsWithData: s
        }
    },
    cs = (e, t) => {
        let n;
        return (n = t.slice(0, e).reverse().find(l => l.skippable === !1)) || (n = t.slice(e + 1 - t.length).reverse().find(l => l.skippable === !1)), n
    },
    vl = (e, t) => {
        let n;
        return (n = t.slice(e + 1).find(l => l.skippable === !1)) || (n = t.slice(0, e).find(l => l.skippable === !1)), n
    },
    ds = ({
        rootElements: e,
        e: t,
        fromElement: n,
        toElement: l,
        fallbackElement: i
    }) => {
        if (!l) return;
        let r = [],
            s = [],
            o = [];
        e.forEach(v => {
            let {
                safelyTabbableElements: b,
                allTabbableElementsWithGuardsWithData: y,
                allFocusableElementsWithGuardsWithData: w
            } = Bl(v, !0);
            r = [...r, ...b], s = [...s, ...y], o = [...o, ...w]
        });
        let u = s.findIndex(v => v.element === n),
            c = s.findIndex(v => v.element === l),
            p = s[c],
            m = o.findIndex(v => v.element === l),
            d = !!l && e.includes(l) && l.getAttribute("tabindex") === "-1";
        if (m === -1 && !d) {
            let v = e.find(b => b.getAttribute("tabindex") === "-1");
            v ? .focus()
        }
        if (p ? .skippable) {
            var f, h, k;
            r.length ? r.length === 1 ? n === r[0] ? (t.preventDefault(), t.stopPropagation(), requestAnimationFrame(() => n.focus())) : r[0].focus() : u ? c < u ? (h = cs(c, s)) === null || h === void 0 || h.element.focus() : (k = vl(c, s)) === null || k === void 0 || k.element.focus() : (f = vl(c, s)) === null || f === void 0 || f.element.focus() : i ? .focus()
        }
    },
    Vl = (e, t, n, l, i) => {
        var r;
        if (!((r = e.target) === null || r === void 0) && r.matches("[data-silk-clone]")) return;
        let s = [],
            o = [];
        n.forEach(u => {
            let {
                safelyFocusableElements: c,
                safelyTabbableElements: p
            } = la(u);
            s = [...s, ...c], o = [...o, ...p]
        }), n.includes(e.target) || s.includes(e.target) ? e.target && i(e.target) : l ? l.focus() : o.length ? o[0].focus() : t.focus()
    },
    ms = (e, t) => {
        var n;
        if (!((n = e.relatedTarget) === null || n === void 0) && n.matches("[data-silk-clone]")) return;
        let l = Jn ? ? e.target,
            i = kn ? ? e.relatedTarget;
        ds({
            rootElements: t,
            e,
            fromElement: l,
            toElement: i
        }), Jn = null, kn = null
    },
    ps = (e, t, n, l, i) => {
        let r = n.find(s => s.contains(e.target));
        e.key !== "Tab" || r || (e.preventDefault(), e.stopPropagation(), Vl(e, t, n, l, i))
    },
    Jn = null,
    kn = null,
    fs = ({
        rootElements: e,
        viewElement: t,
        elementFocusedLast: n,
        setElementFocusedLast: l
    }) => {
        let i = [];
        e.forEach(c => {
            i.push(os(c))
        });
        let r = (function(c, p = document) {
                let m = new Set(c),
                    d = new Set,
                    f = document.createTreeWalker(p, NodeFilter.SHOW_ELEMENT, {
                        acceptNode: b => (b instanceof HTMLElement && b.dataset.liveAnnouncer === "true" && m.add(b), b.tagName === "HEAD" || b.tagName === "SCRIPT" || m.has(b) || b.parentElement && d.has(b.parentElement) ? NodeFilter.FILTER_REJECT : b instanceof HTMLElement && b.getAttribute("role") === "row" || c.some(y => b.contains(y)) ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT)
                    }),
                    h = b => {
                        var y;
                        let w = (y = On.get(b)) !== null && y !== void 0 ? y : 0;
                        (b.getAttribute("aria-hidden") !== "true" || w !== 0) && (w === 0 && b.setAttribute("aria-hidden", "true"), d.add(b), On.set(b, w + 1))
                    },
                    k = f.nextNode();
                for (; k != null;) h(k), k = f.nextNode();
                let v = new MutationObserver(b => {
                    for (let y of b)
                        if (y.type === "childList" && y.addedNodes.length !== 0 && ![...m, ...d].some(w => w.contains(y.target)))
                            for (let w of y.addedNodes) w instanceof HTMLElement && w.dataset.liveAnnouncer === "true" ? m.add(w) : w instanceof Element && h(w)
                });
                return v.observe(p, {
                    childList: !0,
                    subtree: !0
                }), () => {
                    for (let b of (v.disconnect(), d)) {
                        let y = On.get(b);
                        y === 1 ? (b.removeAttribute("aria-hidden"), On.delete(b)) : y !== void 0 && On.set(b, y - 1)
                    }
                }
            })(e, document),
            s = c => ms(c, e),
            o = c => Vl(c, t, e, n, l),
            u = c => ps(c, t, e, n, l);
        return document.addEventListener("keydown", u), document.addEventListener("focusout", s), document.addEventListener("focusin", o), () => {
            document.removeEventListener("focusout", s), document.removeEventListener("focusin", o), document.removeEventListener("keydown", u), r(), i.forEach(c => c())
        }
    },
    ra = new Set,
    gs = e => {
        ra.add(e)
    },
    hs = e => {
        ra.delete(e)
    },
    Wl = (e, t, n, l) => {
        let i = e[t],
            r = i.onClickOutside,
            s = i.dismissOverlayIfNotAlertDialog,
            o = i.viewElement,
            u = i.scrollContainerElement,
            c = i.backdropElement;
        if (u === l.target || c === l.target || !o ? .contains(l.target) && !n.find(p => p.element.contains(l.target)) && (function(p) {
                for (let m of H.automaticLayerElements)
                    if (m.contains(p)) return !1;
                return !0
            })(l.target)) {
            let p = !0,
                m = !0;
            if (r) {
                let {
                    dismiss: d,
                    stopOverlayPropagation: f
                } = kt({
                    nativeEvent: l,
                    defaultBehavior: {
                        dismiss: !0,
                        stopOverlayPropagation: !0
                    },
                    handler: r
                });
                p = d, m = f
            }
            p && s && s(), t > 0 && !m && Wl(e, t - 1, n, l)
        }
    },
    Ra = null,
    vs = (e, t, n) => {
        var l;
        if (ra.size || !((l = e.target) === null || l === void 0) && l.matches('[data-silk~="0ak"] *') || e.target === document.body && Ra !== document.body || !e.target || !e.target.isConnected) return;
        let i = t.length;
        Wl(t, i - 1, n, e), Ra = null
    },
    ks = (e, t) => {
        let n = i => Ra = i.target,
            l = i => vs(i, e, t);
        return document.addEventListener("pointerdown", n, {
            capture: !0
        }), document.addEventListener("click", l, {
            capture: !0
        }), () => {
            document.removeEventListener("pointerdown", n, {
                capture: !0
            }), document.removeEventListener("click", l, {
                capture: !0
            })
        }
    },
    jl = (e, t, n) => {
        let l = e[t],
            i = l.onEscapeKeyDown,
            r = l.dismissOverlayIfNotAlertDialog,
            s = !0,
            o = !0,
            u = !0;
        if (i) {
            let {
                dismiss: c,
                nativePreventDefault: p,
                stopOverlayPropagation: m
            } = kt({
                nativeEvent: n,
                defaultBehavior: {
                    nativePreventDefault: !0,
                    dismiss: !0,
                    stopOverlayPropagation: !0
                },
                handler: i
            });
            s = p, o = c, u = m
        }
        s && n.preventDefault(), o && r && r(), t > 0 && !u && jl(e, t - 1, n)
    },
    bs = (e, t) => {
        if (e.key !== "Escape" || ra.size) return;
        let n = t.length;
        jl(t, n - 1, e)
    },
    Ss = e => {
        let t = n => bs(n, e);
        return document.addEventListener("keydown", t), () => {
            document.removeEventListener("keydown", t)
        }
    },
    ys = e => (e.setAttribute("aria-hidden", "true"), () => e.removeAttribute("aria-hidden")),
    Cs = e => {
        let {
            allTabbableElementsWithGuardsWithData: t
        } = Bl(e);
        t.forEach(n => {
            n.element.tabIndex = -1
        })
    },
    Ts = e => {
        var t;
        return e instanceof HTMLInputElement && (!!(e.type === "password" || e.type === "text" && e.autocomplete === "username" || !((t = e.closest("form")) === null || t === void 0) && t.querySelector('input[type="password"]')) || void 0)
    },
    Es = e => {
        var t, n;
        let l = e.getBoundingClientRect(),
            i = l.height,
            r = (n = (t = window.visualViewport) === null || t === void 0 ? void 0 : t.height) !== null && n !== void 0 ? n : 0,
            s = r - l.bottom;
        return s > -i / 2 && s < i + 32
    },
    ya = e => {
        var t;
        return (t = e ? .closest('[data-silk~="0ab"], [data-silk~="0ad"]')) === null || t === void 0 ? void 0 : t.matches('[data-silk~="0ah"]')
    },
    ws = () => {
        let e = i => {
                let r = i.target;
                if (ya(r)) {
                    var s;
                    (s = r ? .closest('[data-silk~="0ah"]')) === null || s === void 0 || s.focus({
                        preventScroll: !0
                    }), document.removeEventListener("touchstart", e, {
                        capture: !0
                    })
                }
            },
            t = i => {
                let r = i.target,
                    s = i.relatedTarget;
                if (!s) return document.addEventListener("touchstart", e, {
                    capture: !0,
                    passive: !1
                });
                if (ya(s) && (dl(s) && document.addEventListener("touchstart", e, {
                        capture: !0,
                        passive: !1
                    }), !(!en(s) && !dl(s) || xa(r))))
                    if (!Ts(s) && en(r) && Es(r)) {
                        let o = r.cloneNode(!1);
                        o.removeAttribute("id"), o.setAttribute("data-silk-clone", "true"), o.style.setProperty("position", "fixed"), o.style.setProperty("left", "0"), o.style.setProperty("top", "0"), o.style.setProperty("transform", "translateY(-3000px) scale(0)"), document.documentElement.appendChild(o), kn = s, o ? .focus({
                            preventScroll: !0
                        }), setTimeout(() => {
                            Jn = r, kn = s, s ? .focus({
                                preventScroll: !0
                            }), o.remove()
                        }, 32)
                    } else kn = s, s ? .focus({
                        preventScroll: !0
                    })
            },
            n = i => {
                var r;
                let s = i.target;
                !(s !== document.activeElement || !en(s) || ta()) && ya(s) && ((r = s ? .closest('[data-silk~="0ab"], [data-silk~="0ad"]')) === null || r === void 0 || r.focus({
                    preventScroll: !0
                }))
            },
            l = i => {
                var r;
                let s = i.target;
                if (!s || !("setSelectionRange" in s) || !(["password", "search", "tel", "text", "url"].includes(s.type) || s instanceof HTMLTextAreaElement) || s._silk_focusedBefore === !0) return;
                let o = s.value.length;
                (r = s.setSelectionRange) === null || r === void 0 || r.call(s, o, o), s._silk_focusedBefore = !0
            };
        return document.addEventListener("blur", t, {
            capture: !0,
            passive: !1
        }), document.addEventListener("touchstart", e, {
            capture: !0,
            passive: !0
        }), document.addEventListener("touchend", n, {
            capture: !0,
            passive: !0
        }), document.addEventListener("focusin", l), () => {
            document.removeEventListener("blur", t, {
                capture: !0
            }), document.removeEventListener("touchend", n, {
                capture: !0
            }), document.removeEventListener("touchstart", e, {
                capture: !0
            }), document.removeEventListener("focusin", l)
        }
    },
    Ul = ["translate", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "scaleZ", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"],
    Xl = null,
    Yl = e => {
        Xl = e
    },
    As = {
        sheets: [],
        addSheet: function(e) {
            let t;
            if (!e.id) return;
            let n = this.findSheet(e.id);
            return n ? (e.stackId && (n.stackId = e.stackId), e.sendToOpennessMachine && (n.sendToOpennessMachine = e.sendToOpennessMachine), t = n) : (t = {
                stackingIndex: -1,
                travelAnimations: [],
                aggregatedTravelCallback: function(l, i) {
                    let r = this.travelAnimations;
                    for (let s = 0, o = r.length; s < o; s++) r[s].callback(l, i)
                },
                stackingAnimations: [],
                aggregatedStackingCallback: function(l, i) {
                    let r = this.stackingAnimations;
                    for (let s = 0, o = r.length; s < o; s++) r[s].callback(l, i)
                },
                belowSheetsInStack: [],
                outlets: new Set,
                ...e
            }, this.sheets.push(t)), this.updateBelowSheetsInStackOfAllSheets(), t
        },
        attemptToRemoveSheet: function(e, t) {
            let n = this.findSheet(e);
            if (n)
                if (n.outlets.size === 0) {
                    var l;
                    let i = (l = this.findSheet(e)) === null || l === void 0 ? void 0 : l.stackId;
                    this.sheets = this.sheets.filter(r => r.id !== e), i && this.updateSelfAndAboveTravelProgressSumInStack(i)
                } else t && t(n)
        },
        attemptToRemoveSheetOrCleanup: function(e) {
            this.attemptToRemoveSheet(e, t => {
                t.sendToOpennessMachine = null
            })
        },
        findSheet: function(e) {
            return this.sheets.find(t => t.id === e)
        },
        addOutletToSheet: function(e, t) {
            let n = this.findSheet(e);
            n ? n.outlets.add(t) : this.addSheet({
                id: e,
                outlets: new Set([t])
            })
        },
        removeOutletFromSheet: function(e, t) {
            let n = this.findSheet(e);
            n ? .outlets.delete(t), this.attemptToRemoveSheet(e)
        },
        sheetStacks: [],
        addSheetStack: function(e) {
            let t;
            return this.findSheetStack(e.id) || (t = {
                stackingAnimations: [],
                aggregatedStackingCallback: function(l, i) {
                    let r = this.stackingAnimations;
                    for (let s = 0, o = r.length; s < o; s++) r[s].callback(l, i)
                },
                ...e
            }, this.sheetStacks.push(t)), this.updateBelowSheetsInStackOfAllSheets(), t
        },
        removeSheetStack: function(e) {
            e && (this.sheetStacks = this.sheetStacks.filter(t => t.id !== e), this.removeAllOutletPersistedStylesFromStack(e))
        },
        findSheetStack: function(e) {
            return this.sheetStacks.find(t => t.id === e)
        },
        updateBelowSheetsInStackOfAllSheets: function() {
            this.sheets.forEach(e => {
                let t, n = e.stackId;
                if (n) {
                    t = this.findSheetStack(n);
                    let l = this.sheets.filter(r => r.stackId === e.stackId),
                        i = l.filter(r => r.stackId === e.stackId && r.stackingIndex > e.stackingIndex);
                    t && (i.unshift(t), t.stackingIndex = l.length - 1), e.belowSheetsInStack = i, this.updateSelfAndAboveTravelProgressSumInStack(n)
                }
            })
        },
        updateSheetStackingIndex: function(e, t) {
            let n = this.findSheet(e);
            n && (n.stackingIndex = t), this.updateBelowSheetsInStackOfAllSheets()
        },
        updateSheetTravelProgress: function(e, t) {
            let n = this.findSheet(e);
            n && n.stackId && (n.travelProgress = t, this.updateSelfAndAboveTravelProgressSumInStack(n.stackId))
        },
        updateSelfAndAboveTravelProgressSumInStack: function(e) {
            let t = this.sheets.filter(i => i.stackId === e).sort((i, r) => r.stackingIndex - i.stackingIndex),
                n = this.findSheetStack(e);
            n && t.unshift(n);
            let l = t.length;
            for (let i = 0; i < l; i++) {
                let r = t[i];
                r.selfAndAboveTravelProgressSum = [];
                for (let s = 0; s < l; s++) s <= i ? r.selfAndAboveTravelProgressSum[s] = 0 : r.selfAndAboveTravelProgressSum[s] = t.slice(i + 1, s + 1).reduce((o, u) => o + u.travelProgress, 0)
            }
        },
        addAnimationToSheetOrStack: function({
            type: e,
            sheetId: t,
            stackId: n,
            element: l,
            config: i
        }) {
            let r = i.hasOwnProperty("properties") ? i.properties : i,
                s = [];
            Object.entries(r).forEach(([m, d]) => {
                if (d !== "ignore" && d && typeof d != "string")
                    if (typeof d == "function")
                        if (Ul.includes(m)) {
                            let f = s.findIndex(k => k[0] === "transform"),
                                h = k => m + "(" + d(k) + ")";
                            if (f !== -1) {
                                let k = s[f][1];
                                s[f][1] = v => k(v) + " " + h(v)
                            } else s.push(["transform", h])
                        } else if (m === "transform") {
                    let f = s.findIndex(h => h[0] === "transform");
                    if (f !== -1) {
                        let h = s[f][1];
                        s[f][1] = k => h(k) + " " + d(k)
                    } else s.push(["transform", d])
                } else s.push([m, d]);
                else if (m === "opacity") {
                    let f = ["opacity", ({
                        tween: h
                    }) => h(d[0], d[1])];
                    s.push(f)
                } else {
                    if (!m.startsWith("scale") && (!isNaN(d[0]) || !isNaN(d[1]))) throw Error("Keyframe values used with a 'transform' property require a unit (e.g. 'px', 'em' or '%').");
                    let f = s.findIndex(k => k[0] === "transform"),
                        h = ({
                            tween: k
                        }) => m + "(" + k(d[0], d[1]) + ")";
                    if (f !== -1) {
                        let k = s[f][1];
                        s[f][1] = v => k(v) + " " + h(v)
                    } else s.push(["transform", h])
                }
            });
            let o = s.map(m => [(m[0].startsWith("webkit") || m[0].startsWith("moz") ? "-" : "") + m[0].replace(/[A-Z]/g, "-$&").toLowerCase(), m[1]]),
                u = o.length,
                c = {
                    target: l,
                    config: s,
                    dashedPropertiesAsArray: o,
                    callback: (m, d) => {
                        for (let f = 0; f < u; f++) {
                            let [h, k] = o[f];
                            l.style.setProperty(h, k({
                                progress: m,
                                tween: d
                            }))
                        }
                    }
                },
                p = n ? this.findSheetStack(n) : this.findSheet(t);
            p && (e === "travel" ? p.travelAnimations.push(c) : p.stackingAnimations.push(c))
        },
        removeAnimationFromSheetOrStack: function({
            sheetId: e,
            stackId: t,
            type: n,
            element: l
        }) {
            let i = t ? this.findSheetStack(t) : this.findSheet(e);
            if (i)
                if (n === "travel") {
                    let r = i.travelAnimations.filter(s => s.target !== l);
                    i.travelAnimations = r
                } else {
                    let r = i.stackingAnimations.filter(s => s.target !== l);
                    i.stackingAnimations = r
                }
        },
        removeAllOutletPersistedStylesFromSheet: function(e) {
            let t = this.findSheet(e);
            t && [...t.travelAnimations, ...t.stackingAnimations].forEach(n => {
                n.dashedPropertiesAsArray.forEach(([l]) => {
                    n.target.style.removeProperty(l)
                })
            })
        },
        removeAllOutletPersistedStylesFromStack: function(e) {
            let t = this.findSheetStack(e);
            t && t.stackingAnimations.forEach(n => {
                n.dashedPropertiesAsArray.forEach(([l]) => {
                    n.target.style.removeProperty(l)
                })
            })
        },
        getAggregatedStackingCallbackForSheetsBelow: function(e) {
            let t, n = this.findSheet(e);
            return n && (t = l => {
                let i = n.belowSheetsInStack,
                    r = i.length;
                for (let s = 0; s < r; s++) {
                    let o = i[s],
                        u = o.selfAndAboveTravelProgressSum[r - 1] + l,
                        c = vn(u);
                    o.aggregatedStackingCallback(u, c)
                }
            }), t
        },
        automaticIslandElements: new Set([]),
        automaticLayerElements: new Set([]),
        automaticLayerAndIslandDetectionCleanup: null,
        focusContainmentRootElements: [],
        focusContainmentCleanup: () => {},
        escapeKeyDownListenerCleanup: null,
        clickOutsideListenerCleanup: null,
        processLayersAndIslandsChangesTimeout: null,
        setupAutomaticLayerAndIslandDetection: function(e) {
            let t = document.documentElement,
                n = document.body,
                l = () => {
                    let r, s = new Set([]),
                        o = new Set([]),
                        u = (function(v) {
                            let b = v.parentElement;
                            for (; b && b !== document.body;) {
                                if (b.parentElement === document.body) return b;
                                b = b.parentElement
                            }
                            return v.parentElement === document.body ? v : null
                        })(e);
                    r = u ? u.nextElementSibling : n.firstElementChild;
                    let c = v => v.matches('[data-silk~="0ag"], [data-silk~="0ab"], [data-silk~="0aa"], [data-silk-clone]'),
                        p = v => v.tagName !== "SCRIPT";
                    for (; r;) !c(r) && p(r) && s.add(r), r = r.nextElementSibling;
                    let m = t.children;
                    for (let v = 0; v < m.length; v++) {
                        let b = m[v];
                        b.tagName === "HEAD" || b.tagName === "BODY" || c(b) || o.add(b)
                    }
                    let d = new Set([...s].filter(v => !this.automaticLayerElements.has(v))),
                        f = new Set([...this.automaticLayerElements].filter(v => !s.has(v)));
                    this.automaticLayerElements = s;
                    let h = new Set([...o].filter(v => !this.automaticIslandElements.has(v))),
                        k = new Set([...this.automaticIslandElements].filter(v => !o.has(v)));
                    this.automaticIslandElements = o, d.forEach(v => {
                        this.updateLayer({
                            automatic: !0,
                            layerId: null,
                            viewElement: v,
                            inertOutside: !1,
                            onPresentAutoFocus: {
                                focus: !1
                            },
                            onDismissAutoFocus: {
                                focus: !1
                            },
                            dismissOverlayIfNotAlertDialog: () => {},
                            onClickOutside: {
                                stopOverlayPropagation: !1
                            },
                            onEscapeKeyDown: {
                                stopOverlayPropagation: !1
                            }
                        })
                    }), f.forEach(v => this.removeLayer(null, v)), h.forEach(v => this.addIsland({
                        element: v,
                        automatic: !0
                    })), k.forEach(v => this.removeIsland(null, v))
                };
            l();
            let i = new MutationObserver(() => {
                l()
            });
            i.observe(t, {
                childList: !0
            }), i.observe(n, {
                childList: !0
            }), this.automaticLayerAndIslandDetectionCleanup = function() {
                i.disconnect(), this.layers.forEach(r => {
                    r.automatic && this.removeLayer(null, r.viewElement)
                }), this.automaticLayerElements = new Set([]), this.islands.forEach(r => {
                    r.automatic && this.removeIsland(null, r.element)
                }), this.automaticIslandElements = new Set([]), this.automaticLayerAndIslandDetectionCleanup = null
            }
        },
        moveFocusIfNecessary: function(e, t, n, l, i, r) {
            let s = !1;
            for (let o = 0; o < t.length; o++)
                if (t[o].contains(document.activeElement)) {
                    s = !0;
                    break
                }
            if (n.length) {
                let o = n.filter(u => !u.automatic && !u.external);
                if (o.length) {
                    let u = o[o.length - 1];
                    return fl(u.layerId, u.viewElement, u.onPresentAutoFocus)
                }
            }
            if (i.length && !s) {
                let o = e[e.length - 1];
                if (!o.external) return fl(o.layerId, o.viewElement, o.onPresentAutoFocus)
            }
            if (l.length && l.find(u => u.focusWasInside)) {
                let u = l[0];
                if (!u.external) return is(u.layerId, u.viewElement, u.onDismissAutoFocus, u.elementFocusedLastBeforeShowing)
            }
            if (r.length && r.find(u => u.focusWasInside)) {
                let u = e[e.length - 1];
                if (u) return Fl(u.layerId, u.viewElement)
            }
        },
        processLayersAndIslandsChanges: function() {
            var e;
            clearTimeout(this.processLayersAndIslandsChangesTimeout);
            let t = () => {
                let l = this.layers.length,
                    i = new Set([]),
                    r;
                if (this.layers.some(m => m.inertOutside)) {
                    this.islands.filter(d => !d.componentId || d.componentId.length === 0).forEach(d => i.add(d.element));
                    for (let d = l - 1; d >= 0; d--) {
                        let f = this.layers[d];
                        if (f.external && f.inertOutside) {
                            i = new Set([]);
                            break
                        }
                        i.add(f.viewElement);
                        let h = this.islands.filter(v => v.componentId && f.layerContextId && v.componentId.includes(f.layerContextId)),
                            k = this.islands.filter(v => v.componentId && f.layerStackContextId && v.componentId.includes(f.layerStackContextId));
                        if ([...h, ...k].forEach(v => {
                                i.add(v.element)
                            }), f.inertOutside) {
                            r = f;
                            break
                        }
                        r = f
                    }
                }
                let o = [...i],
                    u = !(function(m, d) {
                        if (m.length !== d.length) return !1;
                        let f = new Set;
                        for (let h of m) f.add(h);
                        for (let h of d)
                            if (!f.has(h)) return !1;
                        return !0
                    })(this.focusContainmentRootElements, o);
                if (this.focusContainmentRootElements = o, u) {
                    var c;
                    this.focusContainmentCleanup(), this.focusContainmentCleanup = () => {}, (c = this.automaticLayerAndIslandDetectionCleanup) === null || c === void 0 || c.call(this), r && (this.setupAutomaticLayerAndIslandDetection(r ? .viewElement), this.focusContainmentCleanup = fs({
                        rootElements: this.focusContainmentRootElements,
                        viewElement: r ? .viewElement,
                        elementFocusedLast: Xl,
                        setElementFocusedLast: Yl
                    }))
                }
                this.moveFocusIfNecessary(this.layers, this.focusContainmentRootElements, this.layersJustAdded, this.layersJustRemoved, this.layersJustWentToInertOutsideTrue, this.islandsJustRemoved), this.escapeKeyDownListenerCleanup && (this.escapeKeyDownListenerCleanup(), this.escapeKeyDownListenerCleanup = null), this.clickOutsideListenerCleanup && (this.clickOutsideListenerCleanup(), this.clickOutsideListenerCleanup = null), l > 0 && (this.escapeKeyDownListenerCleanup = Ss(this.layers), this.clickOutsideListenerCleanup = ks(this.layers, this.islands));
                let p = this.layersJustRemoved.length;
                if (p)
                    for (let m = 0; m < p; m++) {
                        let d = this.layersJustRemoved[m],
                            f = d.viewElement,
                            h = d.automatic;
                        f && !h && (ys(f), Cs(f))
                    }
                this.islandsJustRemoved = [], this.layersJustAdded = [], this.layersJustRemoved = [], this.layersJustWentToInertOutsideTrue = []
            };
            ((e = this.layersJustAdded[this.layersJustAdded.length - 1]) === null || e === void 0 ? void 0 : e.external) ? t(): this.processLayersAndIslandsChangesTimeout = setTimeout(t, 16)
        },
        autoFocusTargets: [],
        addAutoFocusTarget: function({
            layerId: e,
            element: t,
            timing: n
        }) {
            this.autoFocusTargets.push({
                layerId: e,
                element: t,
                timing: n
            })
        },
        removeAutoFocusTarget: function(e) {
            this.autoFocusTargets = this.autoFocusTargets.filter(t => t.element !== e)
        },
        islands: [],
        islandsJustRemoved: [],
        addIsland: function(e) {
            var t;
            let n = this.islands[this.islands.length - 1],
                l = ((t = e.id) !== null && t !== void 0 ? t : n) ? n.id + 1 : 0;
            return this.islands.push({ ...e,
                id: l
            }), this.processLayersAndIslandsChanges(), l
        },
        removeIsland: function(e, t) {
            this.islands = this.islands.filter(n => {
                if (e && n.id && n.id !== e || t && n.element && n.element !== t) return !0; {
                    let l = n.element.contains(document.activeElement);
                    return this.islandsJustRemoved.push({ ...n,
                        focusWasInside: l
                    }), !1
                }
            }), this.processLayersAndIslandsChanges()
        },
        layers: [],
        layersJustAdded: [],
        layersJustRemoved: [],
        layersJustWentToInertOutsideTrue: [],
        updateLayer: function(e) {
            let t = e.layerId,
                n = e.viewElement,
                l = !1,
                i = this.layers;
            for (let s = 0; s < i.length; s++) {
                let o = i[s];
                if (t !== null ? o.layerId === t : o.viewElement === n) {
                    let c = { ...o,
                        ...e
                    };
                    !o.inertOutside && e.inertOutside && this.layersJustWentToInertOutsideTrue.push(c), i[s] = c, l = !0;
                    break
                }
            }
            if (!l) {
                var r;
                let s = { ...e,
                    elementFocusedLastBeforeShowing: (r = e.elementFocusedLastBeforeShowing) !== null && r !== void 0 ? r : document.activeElement
                };
                i.push(s), this.layersJustAdded.push(s)
            }
            this.processLayersAndIslandsChanges()
        },
        removeLayer: function(e, t) {
            var n;
            this.layers = this.layers.filter(l => {
                if (e && l.layerId && l.layerId !== e || t && l.viewElement && l.viewElement !== t) return !0; {
                    var i;
                    let r = (i = l.viewElement) === null || i === void 0 ? void 0 : i.contains(document.activeElement);
                    return this.layersJustRemoved.push({ ...l,
                        focusWasInside: r
                    }), !1
                }
            }), this.layers.filter(l => !l.automatic).length === 0 && ((n = this.automaticLayerAndIslandDetectionCleanup) === null || n === void 0 || n.call(this)), this.processLayersAndIslandsChanges()
        },
        nativeFocusScrollPreventers: [],
        nativeFocusScrollPreventionCleanup: null,
        addNativeFocusScrollPreventer: function(e) {
            this.nativeFocusScrollPreventers.push({
                id: e
            }), this.processNativeFocusScrollPreventersChanges()
        },
        removeNativeFocusScrollPreventer: function(e) {
            this.nativeFocusScrollPreventers = this.nativeFocusScrollPreventers.filter(t => t.id !== e), this.processNativeFocusScrollPreventersChanges()
        },
        processNativeFocusScrollPreventersChanges: function() {
            let e = this.nativeFocusScrollPreventers.length;
            if (xt() && (we === "ios" || we === "ipados"))
                if (e) this.nativeFocusScrollPreventionCleanup || (this.nativeFocusScrollPreventionCleanup = ws());
                else {
                    var t;
                    (t = this.nativeFocusScrollPreventionCleanup) === null || t === void 0 || t.call(this), this.nativeFocusScrollPreventionCleanup = null
                }
        },
        fixedComponents: [],
        addFixedComponent: function(e) {
            this.fixedComponents.push(e)
        },
        updateFixedComponent: function(e) {
            let t = this.fixedComponents.find(n => n.id === e.id);
            t && (e.element && (t.element = e.element), e.initialInlineCSSTransform && (t.initialInlineCSSTransform = e.initialInlineCSSTransform), typeof e.compensated == "boolean" && (t.compensated = e.compensated))
        },
        removeFixedComponent: function(e) {
            this.fixedComponents = this.fixedComponents.filter(t => t.id !== e)
        },
        findActualFixedComponentsInsideOutlet: function(e) {
            return this.fixedComponents.filter(t => {
                if (t.element && e) return e.contains(t.element) && window.getComputedStyle(t.element).getPropertyValue("position") === "fixed"
            })
        },
        themeColorMetaTag: null,
        underlyingThemeColor: null,
        themeColorDimmingOverlays: [],
        storeThemeColorMetaTag: function() {
            if (this.themeColorMetaTag = rs(), !this.themeColorMetaTag) {
                let e = document.createElement("meta");
                e.name = "theme-color", e.content = window.getComputedStyle(document.body).backgroundColor, document.head.appendChild(e), this.themeColorMetaTag = e
            }
        },
        getAndStoreUnderlyingThemeColorAsRGBArray: function() {
            let e;
            if (this.themeColorDimmingOverlays.length > 0) e = this.underlyingThemeColor;
            else {
                var t;
                this.themeColorMetaTag || this.storeThemeColorMetaTag();
                let n = (t = this.themeColorMetaTag) === null || t === void 0 ? void 0 : t.content;
                (e = ml(n)) || (console.warn("`themeColorDimming` prop ignored: Only `theme-color` meta tag with a value in `rgb()`, `rgba()`, or hexadecimal format is supported."), e = [0, 0, 0]), this.underlyingThemeColor = e
            }
            return e
        },
        updateUnderlyingThemeColor: function(e) {
            let t = ml(e);
            if (!t) throw Error("The color provided to `updateThemeColor` doesn't match `rgb()`, `rgba()`, or hexadecimal format.");
            this.underlyingThemeColor = t, this.setActualThemeColor()
        },
        setActualThemeColor: function() {
            var e;
            this.themeColorMetaTag || this.storeThemeColorMetaTag(), (e = this.themeColorMetaTag) === null || e === void 0 || e.setAttribute("content", ns({
                color: this.underlyingThemeColor,
                overlays: this.themeColorDimmingOverlays
            }))
        },
        findThemeColorDimmingOverlay: function(e) {
            return this.themeColorDimmingOverlays.find(t => t.dimmingOverlayId === e)
        },
        findIndexThemeColorDimmingOverlay: function(e) {
            return this.themeColorDimmingOverlays.findIndex(t => t.dimmingOverlayId === e)
        },
        updateThemeColorDimmingOverlay: function(e) {
            let t = e;
            t.color && (t = { ...t,
                color: Nl(t.color)
            });
            let n = this.findThemeColorDimmingOverlay(t.dimmingOverlayId);
            return n ? Object.assign(n, t) : (n = t, this.themeColorDimmingOverlays.push(t)), this.setActualThemeColor(), n
        },
        updateThemeColorDimmingOverlayAlphaValue: function(e, t) {
            e.alpha = t, this.setActualThemeColor()
        },
        removeThemeColorDimmingOverlay: function(e) {
            let t = this.findThemeColorDimmingOverlay(e);
            t && (t.abortRemoval = !1, setTimeout(() => {
                t ? .abortRemoval || (this.themeColorDimmingOverlays = this.themeColorDimmingOverlays.filter(n => n.dimmingOverlayId !== e), this.setActualThemeColor(), this.themeColorDimmingOverlays.length !== 0 || (this.underlyingThemeColor = null, this.themeColorMetaTag = null))
            }, 20))
        }
    };
var H = As;
let Hl = e => {
        let t = a.useRef(null);
        return Oe(() => {
            t.current = e
        }), a.useCallback((...n) => {
            let l = t.current;
            return l(...n)
        }, [])
    },
    Ma = e => e === "layout" ? Oe : a.useEffect,
    Pa = e => {
        var t = e ? .lastIndexOf(":");
        return t === -1 ? "" : e ? .substring(t + 1)
    },
    xs = e => {
        let t = [],
            n = [],
            l = (i, r, {
                partOfInitial: s
            }) => {
                Array.isArray(i) ? i.forEach(o => l(o, r, {
                    partOfInitial: s
                })) : (r += (r ? "." : "") + i.name, s && n.push(r + ":" + i.initial), Object.entries(i.states).forEach(([o, u]) => {
                    let c = r + ":" + o;
                    u.machine = r, u.path = c, u.reactive = !i.silentOnly, t.push(u), u.machines && l(u.machines, c, {
                        partOfInitial: s && i.initial === o
                    })
                }))
            };
        return l(e, "", {
            partOfInitial: !0
        }), [n, t]
    },
    kl = (e, t) => e.includes(":") ? e : t.substring(0, t.lastIndexOf(":") + 1) + e,
    bl = e => {
        let t = e.split("."),
            n = [];
        return t.forEach((l, i) => {
            let r = n[i - 1],
                s = (r ? r.full + "." : "") + l,
                o = s.substring(0, s.lastIndexOf(":")),
                u = s.substring(s.lastIndexOf(":") + 1);
            n.push({
                full: s,
                withoutState: o,
                state: u
            })
        }), n
    },
    Os = ({
        checkedPoolOfStates: e,
        referencePoolOfStates: t,
        callbackOnExclusion: n,
        callbackOnPresent: l
    }) => e.filter(r => {
        let s = !0;
        return r.forEach(o => {
            t.forEach(u => {
                u.forEach(c => {
                    o.withoutState === c.withoutState && (o.state !== c.state ? (s = !1, n ? .({
                        decomposedCheckedState: r,
                        checkedStatePiece: o,
                        decomposedReferenceState: u,
                        referenceStatePiece: c
                    })) : l({
                        decomposedCheckedState: r,
                        checkedStatePiece: o,
                        decomposedReferenceState: u,
                        referenceStatePiece: c
                    }))
                })
            })
        }), s
    }),
    Rs = e => {
        let [t, n] = xs(e);
        return [t, (l, i) => {
            let r, s = typeof i == "string" ? i : i.type,
                o = [];
            n.forEach(x => {
                l.includes(x.path) && (!i.machine || i.machine === x.machine) && x.messages && Object.entries(x.messages).forEach(([V, z]) => {
                    if (V === s) {
                        if (typeof z == "string") r = V, o.push(kl(z, x.path));
                        else
                            for (let O of z)
                                if (!O.guard || O.guard(l, i)) {
                                    r = V, o.push(kl(O.target, x.path));
                                    break
                                }
                    }
                })
            });
            let u = l.map(x => bl(x)),
                c = o.map(x => bl(x)),
                p = [],
                m = Os({
                    checkedPoolOfStates: u,
                    referencePoolOfStates: c,
                    callbackOnExclusion: ({
                        decomposedCheckedState: x
                    }) => {
                        p.push(x[x.length - 1].full)
                    },
                    callbackOnPresent: ({
                        referenceStatePiece: x
                    }) => {
                        x.unchanged = !0
                    }
                }),
                d = m.map(x => x[x.length - 1].full),
                f = [],
                h = [];
            c.forEach(x => {
                x.forEach((V, z) => {
                    if (!V.unchanged) {
                        var O, W;
                        z < x.length - 1 && f.push(V.full);
                        let P = n.find(M => M.path === V.full);
                        (O = P.machines) === null || O === void 0 || (W = O.forEach) === null || W === void 0 || W.call(O, M => {
                            let j = () => {
                                c.find(N => N.find(B => B.withoutState === `${P.path}.${M.name}`)) || h.push(`${P.path}.${M.name}:${M.initial}`)
                            };
                            z < x.length - 1 ? P.path + M.name !== x[z + 1].withoutState && j() : j();
                            let D = N => {
                                var B, te;
                                (B = n.find($ => $.path === N).machines) === null || B === void 0 || (te = B.forEach) === null || te === void 0 || te.call(B, $ => {
                                    c.find(ce => ce.find(Ue => Ue.withoutState === `${P.path}.${$.name}`)) || h.push(`${N}.${$.name}:${$.initial}`), D(`${N}.${$.name}:${$.initial}`)
                                })
                            };
                            D(`${P.path}.${M.name}:${M.initial}`)
                        })
                    }
                })
            });
            let k = [...o, ...f, ...h],
                v = [...d, ...k],
                b = [...p, ...k],
                y = n.filter(x => b.includes(x.path)),
                w = y.some(x => x.reactive);
            return {
                exitedStates: p,
                transitionTaken: r,
                enteredStates: k,
                nextStates: v,
                reactive: w
            }
        }]
    },
    Zn = (e, t) => e ? .toStrings().filter(n => n ? .startsWith(t)).filter(n => {
        var l;
        return !(!((l = n ? .slice(t.length)) === null || l === void 0) && l.includes("."))
    })[0],
    Sl = e => {
        let [t, n] = a.useMemo(() => Rs(e), [e]), l = a.useRef(), i = a.useRef([]), r = a.useRef([]), s = a.useRef([]), o = a.useRef([]), u = a.useRef(t), c = a.useRef({
            toStrings: () => t,
            matches: h => tn(t, h),
            lastMessageTreatedRef: l,
            exitActionsRef: i,
            transitionActionsRef: r,
            entryActionsRef: s,
            selectorsRef: o
        }), [p, m] = a.useState({ ...c.current,
            silent: c.current
        }), d = a.useRef([]), f = a.useCallback(h => {
            d.current.push(h);
            let k = v => {
                let {
                    nextStates: b,
                    exitedStates: y,
                    transitionTaken: w,
                    enteredStates: x,
                    reactive: V
                } = n(u.current, d.current[0]), z = u.current;
                if (u.current = b, i.current.forEach(O => {
                        y.includes(O.state) && (typeof O.guard == "function" ? O.guard(z, d.current[0]) : O.guard) && O.callback(d.current[0], O.params)
                    }), r.current.forEach(O => {
                        y.includes(O.state) && O.transition === w && (typeof O.guard == "function" ? O.guard(z, d.current[0]) : O.guard) && O.callback(d.current[0], O.params)
                    }), s.current.forEach(O => {
                        x.includes(O.state) && (typeof O.guard == "function" ? O.guard(z, d.current[0]) : O.guard) && O.callback(d.current[0], O.params)
                    }), l.current = typeof d.current[0] == "string" ? {
                        type: d.current[0]
                    } : d.current[0], d.current.shift(), d.current.length) k(V || v);
                else {
                    let O = b.slice();
                    c.current.toStrings = () => O, c.current.matches = W => tn(O, W), c.current.getValues = () => [Pa(O.toStrings)], o.current.forEach(W => {
                        let P = W.current.selection;
                        W.current.toStrings = () => [Zn(c.current, P)], W.current.matches = M => tn([Zn(c.current, P)], M), W.current.getValues = () => [Pa(Zn(c.current, P))]
                    }), (v || V) && m({ ...c.current,
                        silent: c.current
                    })
                }
            };
            d.current.length === 1 && k()
        }, [n]);
        return [p, f]
    },
    Ps = (e, t, n, {
        message: l = "",
        delay: i = null,
        ...r
    } = {
        delay: null
    }) => {
        a.useEffect(() => {
            let s;
            return t.matches(n) && (s = setTimeout(() => e({
                type: "",
                ...r
            }), i ? ? 0)), () => {
                s && clearTimeout(s)
            }
        }, [t, n, i, e, l, r])
    },
    dt = (e, t, {
        shallow: n = !0
    } = {}) => {
        let l = a.useMemo(() => Zn(e, t), [e, t]),
            i = a.useRef({
                lastMessageTreatedRef: e ? .lastMessageTreatedRef,
                exitActionsRef: e ? .exitActionsRef,
                transitionActionsRef: e ? .transitionActionsRef,
                entryActionsRef: e ? .entryActionsRef,
                toStrings: () => [l],
                matches: s => tn([l], s),
                selection: t,
                getValues: () => [Pa(l)]
            }),
            r = a.useRef(Symbol());
        return Oe(() => {
            e.selectorsRef.current.find(o => o.id === r.current) || e.selectorsRef.current.push(i)
        }, []), a.useMemo(() => ({ ...i.current,
            silent: i.current
        }), [l])
    },
    tn = (e, t) => Array.isArray(t) ? t.some(n => e.includes(n)) || e.some(n => t.some(l => n ? .startsWith(l) && n ? .charAt(l.length) === ".")) : e.includes(t) || e.some(n => n ? .startsWith(t) && n ? .charAt(t.length) === "."),
    _ = (e, t, n) => {
        let {
            state: l,
            callback: i,
            params: r,
            empty: s = !1
        } = n, o = !n.hasOwnProperty("guard") || n.guard, u = a.useMemo(() => r ? Object.values(r) : [], [r]), c = a.useMemo(() => t.entryActionsRef, [t]), p = Ma(e === "before-paint" ? "layout" : "normal"), m = Hl(f => {
            (f ? .matches && f ? .matches(l) || !f ? .matches && tn(f, l)) && (typeof o == "function" && o() || typeof o != "function" && o) && i(f.lastMessageTreatedRef.current, r)
        }), d = a.useRef(Symbol());
        p(() => {
            if (!s)
                if (e === "immediate") {
                    let f = {
                            id: d.current,
                            state: l,
                            guard: o,
                            callback: i,
                            params: r
                        },
                        h = c.current.findIndex(k => k.id === d.current);
                    h === -1 ? c.current.push(f) : c.current[h] = f
                } else m(t)
        }, e === "immediate" ? [e, l, o, i, c, ...u] : [e, m, t]), a.useEffect(() => () => {
            c.current = c.current.filter(f => f.id !== d.current)
        }, [])
    },
    re = (e, t) => {
        let {
            state: n,
            transition: l,
            callback: i,
            params: r
        } = t, s = !t.hasOwnProperty("guard") || t.guard, o = a.useMemo(() => r ? Object.values(r) : [], [r]), u = a.useMemo(() => e.transitionActionsRef, [e]), c = a.useRef(Symbol());
        a.useEffect(() => {
            let p = {
                    id: c.current,
                    state: n,
                    transition: l,
                    guard: s,
                    callback: i,
                    params: r
                },
                m = u.current.findIndex(d => d.id === c.current);
            m === -1 ? u.current.push(p) : u.current[m] = p
        }, [n, l, s, i, u, ...o]), a.useEffect(() => () => {
            u.current = u.current.filter(p => p.id !== c.current)
        }, [])
    },
    jt = (e, t, n) => {
        let {
            state: l,
            callback: i,
            params: r
        } = n, s = !n.hasOwnProperty("guard") || n.guard, o = a.useMemo(() => r ? Object.values(r) : [], [r]), u = a.useMemo(() => t.exitActionsRef, [t]), c = Ma("normal");
        Hl(m => {
            (m ? .matches && m ? .matches(l) || !m ? .matches && tn(m, l)) && (typeof s == "function" && s() || typeof s != "function" && s) && i(m.lastMessageTreatedRef.current, r)
        });
        let p = a.useRef(Symbol());
        c(() => {
            {
                let m = {
                        id: p.current,
                        state: l,
                        guard: s,
                        callback: i,
                        params: r
                    },
                    d = u.current.findIndex(f => f.id === p.current);
                d === -1 ? u.current.push(m) : u.current[d] = m
            }
            return () => {}
        }, [e, l, s, i, u, ...o]), a.useEffect(() => () => {
            u.current = u.current.filter(m => m.id !== p.current)
        }, [])
    },
    Je = (e, t, n) => {
        let {
            state: l,
            callback: i,
            params: r,
            name: s
        } = n, o = !n.hasOwnProperty("guard") || n.guard, u = r ? Object.values(r) : [], c = typeof e == "string" ? e : e.start, p = typeof e == "string" ? e : e.update, m = a.useRef(null);
        _("immediate", t, {
            state: l,
            guard: o,
            callback: a.useCallback(() => {
                m.current = i(null, r)
            }, [i, r]),
            params: r,
            empty: c !== "immediate"
        });
        let d = Ma(p === "before-paint" ? "layout" : "normal"),
            f = a.useRef(!1);
        d(() => {
            let h, k = t ? .matches && t ? .matches(l) || !t ? .matches && tn(t, l) || l === "",
                v = typeof o == "function" && o() || typeof o != "function" && o;
            return k && v && (h = c === "immediate" ? f.current ? i(null, r) : m.current : i(null, r)), k && !f.current && (f.current = !0), () => {
                var b;
                !((b = t.silent) === null || b === void 0) && b.matches(l) || (f.current = !1, m.current = null), h ? .()
            }
        }, [l !== "" ? t : null, l, o, i, ...u])
    },
    Is = e => {
        let t = a.useRef({
                value: e
            }),
            [n, l] = a.useState({
                value: e,
                silent: t.current
            }),
            i = a.useCallback(r => {
                let s = typeof r == "function" ? r(t.current.value) : r;
                t.current.value = s, l({
                    value: s,
                    silent: t.current
                })
            }, []);
        return [n, i]
    };

function zl(...e) {
    return t => e.forEach(n => {
        typeof n == "function" ? n(t) : n != null && (n.current = t)
    })
}

function Ze(...e) {
    return a.useCallback(zl(...e), e)
}
var Ds = (e, t) => {
    let n = () => {
            t ? .()
        },
        l = r => {
            r.preventDefault(), window.addEventListener("touchend", n, {
                once: !0
            })
        },
        i = e.current;
    return i.addEventListener("touchstart", l, {
        passive: !1
    }), () => {
        i && (i.removeEventListener("touchstart", l, {
            passive: !1
        }), window.removeEventListener("touchend", n))
    }
};
let Ca = !1,
    yl = 0;

function nn(e) {
    var t;
    if (a.useId !== void 0) return a.useId();
    let [n, l] = a.useState(Ca ? ++yl : null);
    return Oe(() => {
        n === null && l(++yl)
    }, []), a.useEffect(() => {
        Ca === !1 && (Ca = !0)
    }, []), (t = n) !== null && t !== void 0 ? t : void 0
}
let je = a.forwardRef((e, t) => {
    let {
        children: n,
        ...l
    } = e, i = a.Children.toArray(n), r = i.find(Ls);
    if (r) {
        let s = r.props.children,
            o = i.map(u => u !== r ? u : a.Children.count(s) > 1 ? a.Children.only(null) : a.isValidElement(s) ? s.props.children : null);
        return I.jsx(Ia, { ...l,
            ref: t,
            children: a.isValidElement(s) ? a.cloneElement(s, void 0, o) : null
        })
    }
    return I.jsx(Ia, { ...l,
        ref: t,
        children: n
    })
});
je.displayName = "Slot.Root";
let Ia = a.forwardRef((e, t) => {
    let {
        children: n,
        ...l
    } = e, i = (function(r) {
        var s, o;
        let u = (s = Object.getOwnPropertyDescriptor(r.props, "ref")) === null || s === void 0 ? void 0 : s.get,
            c = u && "isReactWarning" in u && u.isReactWarning;
        return c ? r.ref : (c = (u = (o = Object.getOwnPropertyDescriptor(r, "ref")) === null || o === void 0 ? void 0 : o.get) && "isReactWarning" in u && u.isReactWarning) ? r.props.ref : r.props.ref || r.ref
    })(n);
    return a.isValidElement(n) ? a.cloneElement(n, { ...(function(r, s) {
            let o = { ...s
            };
            for (let u in s) {
                let c = r[u],
                    p = s[u];
                /^on[A-Z]/.test(u) ? c && p ? o[u] = (...d) => {
                    p(...d), c(...d)
                } : c && (o[u] = c) : u === "style" ? o[u] = { ...c,
                    ...p
                } : u === "className" && (o[u] = [c, p].filter(Boolean).join(" "))
            }
            return { ...r,
                ...o
            }
        })(l, n.props),
        ref: t ? zl(t, i) : i
    }) : a.Children.count(n) > 1 ? a.Children.only(null) : null
});
Ia.displayName = "Slot.Anonymous";
let Ns = ({
    children: e
}) => I.jsx(I.Fragment, {
    children: e
});

function Ls(e) {
    return a.isValidElement(e) && e.type === Ns
}
let $n = 0,
    Gl = [0, 0],
    Da = !1,
    Cl = () => {
        clearTimeout(ul), Da = !0, ul = setTimeout(() => Da = !1, 50)
    },
    Tl = () => {
        Da || window.scrollTo(...Gl)
    },
    $l = se.forwardRef((e, t) => {
        let {
            asChild: n,
            active: l = !0,
            automaticallyDisabledForOptimisation: i = !0,
            axis: r = "both",
            preventBodyScroll: s,
            children: o,
            "data-silk": u,
            className: c,
            ...p
        } = e, m = u ? .includes("0ae"), d = a.useRef(null), f = Ze(d, t);
        Oe(() => {
            if (Gl = [window.screenX, window.scrollY], l && s)
                if ($n === 0) {
                    let b = window.innerWidth,
                        y = document.documentElement.clientWidth,
                        w = window.innerHeight,
                        x = document.documentElement.clientHeight;
                    document.body.style.setProperty("overflow", "hidden");
                    let V = `${b-y}px`,
                        z = `${w-x}px`;
                    document.querySelectorAll("[data-silk~='0al']").forEach(W => {
                        W.style.setProperty("--x-collapsed-scrollbar-thickness", V), W.style.setProperty("--y-collapsed-scrollbar-thickness", z)
                    }), document.body.style.setProperty("padding-right", V), document.body.style.setProperty("padding-bottom", z), window.addEventListener("resize", Cl), window.addEventListener("scroll", Tl, {
                        passive: !1
                    }), $n++
                } else $n++;
            return () => {
                if (l && s && --$n == 0) {
                    let b = document.querySelectorAll("[data-silk~='0al']");
                    document.body.style.removeProperty("overflow"), b.forEach(y => {
                        y.style.removeProperty("--x-collapsed-scrollbar-thickness"), y.style.removeProperty("--y-collapsed-scrollbar-thickness")
                    }), document.body.style.removeProperty("padding-right"), document.body.style.removeProperty("padding-bottom"), window.removeEventListener("scroll", Tl), window.removeEventListener("resize", Cl)
                }
            }
        }, [s, l]), a.useEffect(() => {
            let b, y = d.current;
            return !m && l && y && (b = new ResizeObserver(w => {
                w.forEach(() => {
                    y.scrollTo(300, 300)
                })
            })).observe(y, {
                box: "border-box"
            }), () => {
                !m && l && y && b && (b.unobserve(y), b.disconnect())
            }
        }, [l, m]);
        let h = a.useCallback(b => {
                let y = b.currentTarget;
                y.scrollTo(300, 300), we !== "ios" && we !== "ipados" || CSS.supports("overscroll-behavior: contain") || (y.style.setProperty("overflow", "hidden"), setTimeout(() => {
                    y.style.setProperty("overflow", "auto")
                }, 10))
            }, []),
            k = n ? je : "div",
            v = We("ScrollTrap", {
                active: l,
                automaticallyDisabledForOptimisation: i,
                axis: r
            });
        return I.jsx(k, { ...v("root", ["active", "automaticallyDisabledForOptimisation", "axis"], {
                className: c,
                dataSilk: [u, "0ac", "0ae"]
            }),
            onScroll: m ? void 0 : h,
            ...p,
            ref: f,
            children: o
        })
    });
$l.displayName = "Sheet.Anonymous";
let Kl = se.forwardRef((e, t) => {
    let {
        asChild: n,
        className: l,
        dataSilk: i,
        children: r,
        ...s
    } = e, o = n ? je : "div", u = We("ScrollTrap", {});
    return I.jsx(o, { ...u("stabiliser", [], {
            className: l,
            dataSilk: [i]
        }),
        ...s,
        ref: t,
        children: r
    })
});
Kl.displayName = "Sheet.DDD";
let Ot = {
        Root: $l,
        Stabiliser: Kl
    },
    ql = () => {
        let e = nn();
        return a.useCallback(n => {
            n ? H.addFixedComponent({
                id: e,
                element: n
            }) : H.removeFixedComponent(e)
        }, [e])
    },
    Jl = se.forwardRef((e, t) => {
        let {
            asChild: n,
            children: l,
            className: i,
            "data-silk": r,
            ...s
        } = e, o = ql(), u = Ze(o, t), c = We("Fixed", {});
        return I.jsx(Ot.Root, { ...c("root", [], {
                className: i,
                dataSilk: [r, "0al"]
            }),
            asChild: n,
            ...s,
            ref: u,
            children: l
        })
    });
Jl.displayName = "Fixed.Root";
let Zl = se.forwardRef((e, t) => {
    let {
        asChild: n,
        children: l,
        ...i
    } = e;
    return I.jsx(Ot.Stabiliser, {
        asChild: n,
        ...i,
        ref: t,
        children: l
    })
});
Zl.displayName = "Fixed.Content";
let li = {
        Root: Jl,
        Content: Zl
    },
    Ut = se.createContext(null);
Ut.displayName = "Sheet.GenericContext";
let mt = se.createContext(null);
mt.displayName = "Sheet.Anonymous";
var Ql = function(e) {
        let t = "cubic-bezier(";
        if (!e.startsWith(t)) return null;
        let n = e.slice(t.length, -1),
            l = n.split(",").map(i => parseFloat(i.trim()));
        return l.length !== 4 || l.some(isNaN) ? null : l
    },
    Ms = ({
        mass: e,
        stiffness: t,
        damping: n,
        initialVelocity: l = 0,
        fromPosition: i,
        toPosition: r,
        precision: s
    }) => {
        let o = [],
            u = 0,
            c = Math.abs(r - i),
            p = 0,
            m = l,
            d = !1,
            f = !1,
            h = -(1e-6 * t),
            k = -(.001 * n),
            v = s / 22,
            b = 10 * s;
        for (; !(d && f);) {
            let w = h * (p - c),
                x = k * m,
                V = (w + x) / e;
            m += V, p += m, d = Math.abs(m) <= v, f = Math.abs(c - p) <= b;
            let z = p / c;
            o.push(z), u++
        }
        return {
            progressValuesArray: o,
            duration: u
        }
    };
let Qn = () => CSS.supports("transition-timing-function", "linear(0, 1)") && !xt(),
    _s = ({
        origin: e = 0,
        destination: t = 1,
        animationConfig: n
    }) => {
        var l, i, r, s, o, u, c, p, m;
        let d = [],
            f;
        if (n && n.easing && n.easing !== "spring")
            if (n.easing === "linear") {
                f = (u = n.duration) !== null && u !== void 0 ? u : 250;
                let h = f,
                    k = 1 / (h - 1);
                for (let v = 0; v < h; v++) {
                    let b = v * k;
                    d.push(isNaN(b) ? 0 : b)
                }
            } else {
                let h;
                f = (c = n.duration) !== null && c !== void 0 ? c : 250;
                let k = f;
                h = n.easing === "ease" ? [.25, .1, .25, 1] : n.easing === "ease-in" ? [.42, 0, 1, 1] : n.easing === "ease-out" ? [0, 0, .58, 1] : n.easing === "ease-in-out" ? [.42, 0, .58, 1] : n.easing.startsWith("cubic-bezier") && (p = Ql(n.easing)) !== null && p !== void 0 ? p : [.25, .1, .25, 1];
                let v = Il(...h);
                for (let b = 0; b <= k; b++) d.push(v(b / k))
            }
        else {
            let h = Ms({
                stiffness: (l = n ? .stiffness) !== null && l !== void 0 ? l : 300,
                damping: (i = n ? .damping) !== null && i !== void 0 ? i : 34,
                mass: (r = n ? .mass) !== null && r !== void 0 ? r : 1,
                initialVelocity: (s = n ? .initialVelocity) !== null && s !== void 0 ? s : 0,
                precision: (o = n ? .precision) !== null && o !== void 0 ? o : .1,
                fromPosition: e,
                toPosition: t
            });
            d = h.progressValuesArray, f = h.duration
        }
        return {
            progressValuesArray: d,
            easing: "linear",
            duration: f,
            delay: (m = n ? .delay) !== null && m !== void 0 ? m : 0
        }
    },
    Ta = (e, t) => {
        let n = {};
        return e.forEach(([l, i]) => {
            let r = vn(t);
            n[l] = i({
                progress: t,
                tween: r
            })
        }), n
    },
    El = ({
        type: e,
        progressValuesArray: t,
        target: n,
        templatesPerProperty: l,
        reversedStackingIndex: i,
        selfAndAboveTravelProgressSum: r
    }) => {
        let s = i != null,
            o = u => e === "travel" ? u : s && r ? r ? .[i] + u : 0;
        return {
            target: n,
            keyframes: Qn() ? [Ta(l, o(t[0])), Ta(l, o(t[t.length - 1]))] : t.map(u => Ta(l, o(u)))
        }
    },
    Fs = ({
        sheetId: e,
        destinationDetent: t,
        setSegment: n,
        viewElement: l,
        scrollContainer: i,
        travellingElement: r,
        contentPlacement: s,
        positionToScrollTo: o,
        scrollAxis: u,
        animationConfig: c,
        onTravel: p,
        onTravelStart: m,
        onTravelEnd: d,
        runOnTravelStart: f,
        rAFLoopEndCallback: h,
        dimensions: k,
        trackToTravelOn: v
    }) => {
        let b, y, w = H.findSheet(e);
        if (!w) return;
        let x = [],
            V = [];
        x = w.travelAnimations, w.belowSheetsInStack.forEach(A => {
            V.push(...A.stackingAnimations.map(ye => ({ ...ye,
                reversedStackingIndex: w.belowSheetsInStack.length - 1,
                selfAndAboveTravelProgressSum: A.selfAndAboveTravelProgressSum
            })))
        }), f && m ? .();
        let z = !(c.hasOwnProperty("contentMove") && !c.contentMove),
            O = k.current.view.travelAxis.unitless,
            W = k.current.content.travelAxis.unitless,
            P = l.getBoundingClientRect(),
            M = r.getBoundingClientRect(),
            j = s !== "center" ? W : W + (O - W) / 2,
            D = M.top - P.top,
            N = M.left - P.left,
            B = 0;
        switch (v) {
            case "top":
                B = D + j;
                break;
            case "bottom":
                B = D - j;
                break;
            case "left":
                B = N + j;
                break;
            case "right":
                B = N - j
        }
        let te = Math.max(Math.abs(B) / j, 0),
            J = k.current.progressValueAtDetents[t].exact,
            $ = J * j,
            ce = v === "left" || v === "top" ? $ : -$,
            {
                progressValuesArray: Ue,
                easing: Q,
                duration: Ge,
                delay: $e
            } = _s({
                origin: B,
                destination: ce,
                animationConfig: c
            }),
            it = J - te,
            Re = (function(A, ye) {
                let Ie = [];
                for (let Ae = 0; Ae < A.length - 1; Ae += ye) Ie.push(A[Ae]);
                return A.length % ye != 0 && Ie.push(A[A.length - 1]), Ie
            })(Ue, 8),
            Ne = Re.map(A => te + it * A),
            le = [];
        x.length && le ? .push(...x.map(A => El({
            type: "travel",
            progressValuesArray: Ne,
            target: A.target,
            templatesPerProperty: A.config
        }))), V.length && le ? .push(...V.map(A => El({
            type: "stacking",
            progressValuesArray: Ne,
            target: A.target,
            templatesPerProperty: A.config,
            reversedStackingIndex: A.reversedStackingIndex,
            selfAndAboveTravelProgressSum: A.selfAndAboveTravelProgressSum
        }))), b = u === "x" ? "X" : "Y";
        let Te = A => ({
            transform: "translate" + b + "(" + (B - ce) * (1 - A) + "px)"
        });
        y = Qn() ? [Te(Re[0]), Te(Re[Re.length - 1])] : Re.map(A => ({
            transform: "translate" + b + "(" + (B - ce) * (1 - A) + "px)"
        }));
        let fe = () => {
                i.scrollTo({
                    left: u === "x" ? o : 0,
                    top: u === "y" ? o : 0
                })
            },
            Le = A => {
                let ye;
                if (!z) return A();
                ye = Qn() ? r.animate(y, {
                    easing: "linear(" + Re.join(",") + ")",
                    duration: Ge,
                    delay: $e
                }) : r.animate(y, {
                    easing: Q,
                    duration: Ge,
                    delay: $e
                });
                let Ie = () => {
                    A(), ye.removeEventListener("finish", Ie)
                };
                ye.addEventListener("finish", Ie)
            },
            ue = A => {
                if (!le.length) return A();
                let ye = [],
                    Ie = Qn();
                le ? .forEach(({
                    target: Ae,
                    keyframes: F
                }) => {
                    let E;
                    E = Ie ? Ae.animate(F, {
                        easing: "linear(" + Re.join(",") + ")",
                        duration: Ge,
                        delay: $e
                    }) : Ae.animate(F, {
                        easing: Q,
                        duration: Ge,
                        delay: $e
                    });
                    let Xe = new Promise(ge => {
                        let bt = () => {
                            Object.entries(F[F.length - 1]).forEach(([pe, xe]) => {
                                Ae.style.setProperty((pe.startsWith("webkit") || pe.startsWith("moz") ? "-" : "") + pe.replace(/[A-Z]/g, "-$&").toLowerCase(), xe)
                            }), E.removeEventListener("finish", bt), ge()
                        };
                        E.addEventListener("finish", bt)
                    });
                    ye.push(Xe)
                }), Promise.all(ye).then(() => {
                    A()
                })
            },
            oe = null,
            pt = A => {
                (function ye(Ie, Ae, F) {
                    let E = k.current.progressValueAtDetents,
                        Xe = E.length;
                    oe || (oe = Ie);
                    let ge = Ie - oe,
                        bt = Math.floor(ge);
                    if (bt < Ue.length) {
                        let pe = te + it * Ue[bt];
                        if (pe < 0) Ae(pe, [0, 0]);
                        else if (pe > 1) Ae(pe, [1, 1]);
                        else
                            for (let xe = 0; xe < Xe; xe++) {
                                let q = E[xe],
                                    Rt = q.after;
                                pe > Rt && xe + 1 < Xe && pe < E[xe + 1].before ? Ae(pe, [xe, xe + 1]) : pe > q.before && pe < Rt && Ae(pe, [xe, xe])
                            }
                        requestAnimationFrame(() => ye(document.timeline.currentTime, Ae, F))
                    } else {
                        let pe = Math.min(Xe - 1, t);
                        Ae(J, [pe, pe]), z || le ? .length || h == null || h(), F()
                    }
                })(document.timeline.currentTime, (ye, Ie) => {
                    p ? .({
                        progress: ye,
                        range: {
                            start: Ie[0],
                            end: Ie[1]
                        },
                        progressAtDetents: k.current.exactProgressValueAtDetents
                    }), n(Ie)
                }, A)
            },
            Se = A => new Promise(ye => {
                A(() => ye())
            }),
            Pe = () => {
                d ? .()
            },
            Z = async () => {
                await Promise.all([Se(Le), Se(ue), Se(pt)]), Pe()
            };
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                (z || t !== 0) && fe(), Z()
            })
        })
    },
    Bs = ({
        desiredDestinationDetent: e,
        currentDetent: t
    }) => typeof e == "number" ? e : t,
    Vs = ({
        trackToTravelOn: e,
        destinationDetent: t,
        detentCountExcludingZero: n,
        actualSwipeOutDisabledWithDetent: l,
        hasOppositeTracks: i,
        contentPlacement: r,
        elementsDimensions: s,
        snapBackAcceleratorTravelAxisSize: o
    }) => {
        var u;
        if (((u = s.detentMarkers) === null || u === void 0 ? void 0 : u.length) <= t - 1) return {
            positionToScrollTo: null,
            scrollAxis: null
        };
        let c = t === 0,
            p = t === 1,
            m = t === n,
            d = e === "right" || e === "bottom",
            f = s.view.travelAxis.unitless,
            h = s.content.travelAxis.unitless,
            k = s.snapOutAccelerator.travelAxis.unitless,
            v = s.detentMarkers,
            b = c ? 0 : v[t - 1].accumulatedOffsets.travelAxis.unitless,
            y = 0;
        if (i) m ? y = f - (f - h) / 2 + s.snapOutAccelerator.travelAxis.unitless : c && (y = d ? 0 : 1e4);
        else if (d) m ? y = 1e4 : l && p || c ? y = 0 : m || l && p || c || (y = l ? v[t - 1].accumulatedOffsets.travelAxis.unitless - v[0].travelAxis.unitless : b + k);
        else if (e === "left" || e === "top") {
            let w;
            w = l ? p ? 2 * o : m ? 0 : o : c ? k : m ? o : 0, y = r === "center" ? t === 0 ? h + (f - h) / 2 - b + w : 0 : h - b + w
        }
        return {
            positionToScrollTo: y,
            scrollAxis: e === "left" || e === "right" || e === "horizontal" ? "x" : "y"
        }
    };
var Ws = ({
    destinationDetent: e,
    behavior: t = "instant",
    runTravelCallbacksAndAnimations: n = !0,
    runOnTravelStart: l,
    animationConfig: i,
    rAFLoopEndCallback: r,
    trackToTravelOn: s,
    contentPlacement: o,
    onTravel: u,
    onTravelStart: c,
    onTravelEnd: p,
    fullTravelCallback: m,
    setProgrammaticScrollOngoing: d,
    currentDetent: f,
    segment: h,
    setSegment: k,
    lastProgressValue: v,
    dimensions: b,
    viewRef: y,
    scrollContainerRef: w,
    contentWrapperRef: x,
    sheetId: V,
    stackId: z,
    actualSwipeOutDisabledWithDetent: O,
    hasOppositeTracks: W,
    snapBackAcceleratorTravelAxisSize: P
}) => {
    if (e === void 0 && f === null) return;
    let M = b.current,
        j = w.current;
    if (j && M.content) {
        let D = Bs({
                desiredDestinationDetent: e,
                currentDetent: f
            }),
            N = b.current.detentMarkers.length,
            {
                positionToScrollTo: B,
                scrollAxis: te
            } = Vs({
                destinationDetent: D,
                detentCountExcludingZero: N,
                trackToTravelOn: s,
                actualSwipeOutDisabledWithDetent: O,
                hasOppositeTracks: W,
                contentPlacement: o,
                snapBackAcceleratorTravelAxisSize: P,
                elementsDimensions: M
            });
        if (B !== null && te !== null) {
            if (d(!0), t === "smooth") Fs({
                sheetId: V,
                destinationDetent: D,
                setSegment: k,
                viewElement: y.current,
                scrollContainer: j,
                travellingElement: x.current,
                positionToScrollTo: B,
                contentPlacement: o,
                scrollAxis: te,
                animationConfig: i,
                onTravel: u,
                onTravelStart: c,
                onTravelEnd: p,
                runOnTravelStart: l,
                rAFLoopEndCallback: r,
                dimensions: b,
                trackToTravelOn: s
            });
            else if (n && l && c ? .(), te === "x" ? (j.scrollTo(B, 0), j.scrollLeft = B) : (j.scrollTo(0, B), j.scrollTop = B), k([D, D]), n) {
                let J = b.current.progressValueAtDetents[D].exact;
                m ? .(J, h), p ? .()
            }
        }
    }
};
let Rn = e => {
        let t = a.useRef(null);
        return Oe(() => {
            t.current = e
        }), a.useCallback((...n) => {
            let l = t.current;
            return l(...n)
        }, [])
    },
    js = e => {
        let t, n = () => {
            e(), t = requestAnimationFrame(n)
        };
        return n(), () => {
            cancelAnimationFrame(t)
        }
    },
    Us = (() => {
        let e = !0;
        typeof window > "u" || CSS.supports("scroll-snap-align: start") || (e = !1);
        let t = !0;
        return typeof window > "u" || "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype || (t = !1), e && t
    })(),
    na = {
        gentle: {
            stiffness: 560,
            damping: 68,
            mass: 1.85
        },
        smooth: {
            stiffness: 580,
            damping: 60,
            mass: 1.35
        },
        snappy: {
            stiffness: 350,
            damping: 34,
            mass: .9
        },
        brisk: {
            stiffness: 350,
            damping: 28,
            mass: .65
        },
        bouncy: {
            stiffness: 240,
            damping: 19,
            mass: .7
        },
        elastic: {
            stiffness: 260,
            damping: 20,
            mass: 1
        }
    },
    Ea = (e, t) => {
        var n;
        let l = typeof e == "string",
            i = l ? na[e] : (n = na[e ? .preset]) !== null && n !== void 0 ? n : null,
            r = i || e ? .easing === "spring" || ["ease", "ease-in", "ease-out", "ease-in-out", "linear"].includes(e ? .easing);
        return {
            skip: La,
            easing: "spring",
            ...l ? {} : e,
            ...i ? ? {},
            ...r ? {} : t
        }
    },
    Xs = (e, t) => e.includes("skipOpening:true") || t.skipOpening,
    wl = (e, t) => !e.includes("skipOpening:true") && !t.skipOpening,
    Ys = (e, t) => e.includes("skipClosing:true") || t.skipClosing,
    Hs = (e, t) => !e.includes("skipClosing:true") && !t.skipClosing,
    Al = e => e.includes("openness:closed.status:safe-to-unmount"),
    zs = () => {
        let e = "false",
            [t, n] = Sl(a.useMemo(() => [{
                name: "staging",
                initial: "none",
                states: {
                    none: {
                        messages: {
                            OPEN: [{
                                guard: (h, k) => Al(h) && wl(h, k),
                                target: "opening"
                            }, {
                                guard: Al,
                                target: "open"
                            }],
                            OPEN_PREPARED: [{
                                guard: wl,
                                target: "opening"
                            }, {
                                target: "open"
                            }],
                            ACTUALLY_CLOSE: [{
                                guard: Hs,
                                target: "closing"
                            }],
                            ACTUALLY_STEP: "stepping",
                            GO_DOWN: [{
                                guard: (h, k) => !k.skipOpening,
                                target: "going-down"
                            }, {
                                target: "go-down"
                            }],
                            GO_UP: "going-up"
                        }
                    },
                    open: {
                        messages: {
                            NEXT: "none"
                        }
                    },
                    opening: {
                        messages: {
                            NEXT: "none"
                        }
                    },
                    stepping: {
                        messages: {
                            NEXT: "none"
                        }
                    },
                    closing: {
                        messages: {
                            NEXT: "none"
                        }
                    },
                    "go-down": {
                        messages: {
                            NEXT: "none"
                        }
                    },
                    "going-down": {
                        messages: {
                            NEXT: "none"
                        }
                    },
                    "going-up": {
                        messages: {
                            NEXT: "none"
                        }
                    }
                }
            }, {
                name: "longRunning",
                initial: e,
                states: {
                    false: {
                        messages: {
                            TO_TRUE: "true"
                        }
                    },
                    true: {
                        messages: {
                            TO_FALSE: "false"
                        }
                    }
                }
            }, {
                name: "openness",
                initial: "closed",
                states: {
                    closed: {
                        messages: {
                            READY_TO_OPEN: [{
                                guard: (h, k) => !k.skipOpening,
                                target: "opening"
                            }, {
                                target: "open"
                            }]
                        },
                        machines: {
                            name: "status",
                            initial: "safe-to-unmount",
                            states: {
                                pending: {
                                    messages: {
                                        OPEN: [{
                                            guard: Xs,
                                            target: "openness:closed.status:flushing-to-preparing-open"
                                        }, {
                                            target: "openness:closed.status:flushing-to-preparing-opening"
                                        }],
                                        "": "safe-to-unmount"
                                    }
                                },
                                "flushing-to-preparing-open": {
                                    messages: {
                                        "": "preparing-open"
                                    }
                                },
                                "flushing-to-preparing-opening": {
                                    messages: {
                                        "": "preparing-opening"
                                    }
                                },
                                "preparing-open": {},
                                "preparing-opening": {},
                                "safe-to-unmount": {}
                            }
                        }
                    },
                    opening: {
                        messages: {
                            NEXT: "open"
                        }
                    },
                    open: {
                        messages: {
                            ACTUALLY_CLOSE: [{
                                guard: Ys,
                                target: "openness:closed.status:pending"
                            }],
                            SWIPED_OUT: "openness:closed.status:pending",
                            READY_TO_CLOSE: [{
                                guard: (h, k) => !k.skipClosing,
                                target: "closing"
                            }]
                        },
                        machines: [{
                            name: "scroll",
                            initial: "ended",
                            states: {
                                ended: {
                                    messages: {
                                        SCROLL_START: "ongoing"
                                    },
                                    machines: [{
                                        name: "afterPaintEffectsRun",
                                        initial: "false",
                                        states: {
                                            false: {
                                                messages: {
                                                    OCCURRED: "true"
                                                }
                                            },
                                            true: {}
                                        }
                                    }]
                                },
                                ongoing: {
                                    messages: {
                                        SCROLL_END: "ended"
                                    }
                                }
                            }
                        }, {
                            name: "move",
                            initial: "ended",
                            states: {
                                ended: {
                                    messages: {
                                        MOVE_START: "ongoing"
                                    }
                                },
                                ongoing: {
                                    messages: {
                                        MOVE_END: "ended"
                                    }
                                }
                            }
                        }, {
                            name: "swipe",
                            silentOnly: !0,
                            initial: "unstarted",
                            states: {
                                unstarted: {
                                    messages: {
                                        SWIPE_START: "ongoing"
                                    }
                                },
                                ongoing: {
                                    messages: {
                                        SWIPE_END: "ended"
                                    }
                                },
                                ended: {
                                    messages: {
                                        SWIPE_START: "ongoing",
                                        SWIPE_RESET: "unstarted"
                                    }
                                }
                            }
                        }, {
                            name: "evaluateCloseMessage",
                            silentOnly: !0,
                            initial: "false",
                            states: {
                                false: {
                                    messages: {
                                        CLOSE: "true"
                                    }
                                },
                                true: {
                                    messages: {
                                        CLOSE: "false"
                                    }
                                }
                            }
                        }, {
                            name: "evaluateStepMessage",
                            silentOnly: !0,
                            initial: "false",
                            states: {
                                false: {
                                    messages: {
                                        STEP: "true"
                                    }
                                },
                                true: {
                                    messages: {
                                        STEP: "false"
                                    }
                                }
                            }
                        }]
                    },
                    closing: {
                        messages: {
                            NEXT: "openness:closed.status:pending"
                        }
                    }
                }
            }, {
                name: "skipOpening",
                initial: "false",
                states: {
                    true: {
                        messages: {
                            TO_FALSE: "false"
                        }
                    },
                    false: {
                        messages: {
                            TO_TRUE: "true"
                        }
                    }
                }
            }, {
                name: "skipClosing",
                initial: "false",
                states: {
                    true: {
                        messages: {
                            TO_FALSE: "false"
                        }
                    },
                    false: {
                        messages: {
                            TO_TRUE: "true"
                        }
                    }
                }
            }, {
                name: "scrollContainerTouch",
                silentOnly: !0,
                initial: "ended",
                states: {
                    ended: {
                        messages: {
                            TOUCH_START: "ongoing"
                        }
                    },
                    ongoing: {
                        messages: {
                            TOUCH_END: "ended"
                        }
                    }
                }
            }, {
                name: "backStuck",
                silentOnly: !0,
                initial: "false",
                states: {
                    false: {
                        messages: {
                            STUCK_START: "true"
                        }
                    },
                    true: {
                        messages: {
                            STUCK_END: "false"
                        }
                    }
                }
            }, {
                name: "frontStuck",
                silentOnly: !0,
                initial: "false",
                states: {
                    false: {
                        messages: {
                            STUCK_START: "true"
                        }
                    },
                    true: {
                        messages: {
                            STUCK_END: "false"
                        }
                    }
                }
            }], [e])),
            [l, i] = Sl(a.useMemo(() => [{
                name: "active",
                initial: "false",
                states: {
                    false: {
                        messages: {
                            TO_TRUE: "true"
                        }
                    },
                    true: {
                        messages: {
                            TO_FALSE: "false"
                        }
                    }
                }
            }, {
                name: "position",
                initial: "out",
                states: {
                    out: {
                        messages: {
                            READY_TO_GO_FRONT: [{
                                guard: (h, k) => k.skipOpening,
                                target: "position:front.status:idle"
                            }, {
                                target: "position:front.status:opening"
                            }]
                        }
                    },
                    front: {
                        machines: [{
                            name: "status",
                            initial: "opening",
                            states: {
                                opening: {
                                    messages: {
                                        NEXT: "idle"
                                    }
                                },
                                closing: {
                                    messages: {
                                        NEXT: "position:out"
                                    }
                                },
                                idle: {
                                    messages: {
                                        READY_TO_GO_DOWN: [{
                                            guard: (h, k) => k.skipOpening,
                                            target: "position:covered.status:idle"
                                        }, {
                                            target: "position:covered.status:going-down"
                                        }],
                                        READY_TO_GO_OUT: "closing",
                                        GO_OUT: "position:out"
                                    }
                                }
                            }
                        }]
                    },
                    covered: {
                        machines: [{
                            name: "status",
                            initial: "going-down",
                            states: {
                                "going-down": {
                                    messages: {
                                        NEXT: "idle"
                                    }
                                },
                                "going-up": {
                                    messages: {
                                        NEXT: "indeterminate"
                                    }
                                },
                                indeterminate: {
                                    messages: {
                                        GOTO_idle: "idle",
                                        GOTO_front: "position:front.status:idle"
                                    }
                                },
                                idle: {
                                    messages: {
                                        READY_TO_GO_DOWN: [{
                                            guard: (h, k) => k.skipOpening,
                                            target: "come-back"
                                        }, {
                                            target: "going-down"
                                        }],
                                        READY_TO_GO_UP: "going-up",
                                        GO_UP: "indeterminate"
                                    }
                                },
                                "come-back": {
                                    messages: {
                                        "": "idle"
                                    }
                                }
                            }
                        }]
                    }
                }
            }], [])),
            r = a.useMemo(() => l.matches("position:out") ? "out" : l.matches("position:front") ? "front" : l.matches("position:covered") ? "covered" : void 0, [l]),
            s = a.useMemo(() => l.matches("position:covered.status:idle") ? "idle" : l.matches("position:covered.status:going-down") ? "going-down" : l.matches("position:covered.status:going-up") ? "going-up" : null, [l]),
            o = dt(t, "staging"),
            u = a.useMemo(() => o.getValues()[0], [o]),
            [c, p] = Is(-1),
            m = nn(),
            d = nn();
        return a.useMemo(() => ({
            titleId: m,
            descriptionId: d,
            staging: u,
            opennessState: t,
            sendToOpennessMachine: n,
            positionState: l,
            sendToPositionMachine: i,
            layerPosition: r,
            layerCovered: s,
            stackingIndex: c,
            assignStackingIndex: p
        }), [m, d, u, t, n, l, i, r, s, c, p])
    },
    er = se.forwardRef((e, t) => {
        let n, {
                forComponent: l,
                as: i,
                children: r,
                className: s,
                "data-silk": o,
                initialState: u,
                onPresentAutoFocus: c,
                onDismissAutoFocus: p,
                onTravelStatusChange: m,
                onTravelRangeChange: d,
                swipeDismissal: f = !0,
                swipe: h = !0,
                snapOutAcceleration: k = "auto",
                snapToEndDetentsAcceleration: v = "auto",
                onTravel: b,
                onTravelStart: y,
                onTravelEnd: w,
                detents: x,
                inertOutside: V = !0,
                nativeEdgeSwipePrevention: z = !1,
                onSwipeFromEdgeToGoBackAttempt: O,
                onClickOutside: W,
                onEscapeKeyDown: P,
                onFocusInside: M,
                nativeFocusScrollPrevention: j = !0,
                contentPlacement: D = null,
                tracks: N,
                swipeOvershoot: B = !0,
                swipeTrap: te,
                enteringAnimationSettings: J,
                exitingAnimationSettings: $,
                steppingAnimationSettings: ce,
                id: Ue,
                ...Q
            } = e,
            Ge = l ? ? Ut,
            $e = a.useContext(Ge) || {},
            {
                license: it,
                StackContext: Re,
                CustomSheetContext: Ne,
                sheetRole: le,
                open: Te,
                onOpenChange: fe,
                elementFocusedLastBeforeShowing: Le,
                onSafeToUnmountChange: ue,
                setLongRunning: oe,
                setStaging: pt,
                defaultActiveDetent: Se,
                activeDetent: Pe,
                onActiveDetentChange: Z,
                sheetId: A
            } = $e,
            {
                titleId: ye,
                descriptionId: Ie,
                staging: Ae,
                opennessState: F,
                sendToOpennessMachine: E,
                positionState: Xe,
                sendToPositionMachine: ge,
                layerCovered: bt,
                stackingIndex: pe,
                assignStackingIndex: xe
            } = zs(),
            q = dt(F, "staging"),
            {
                stackId: Rt,
                setSheetsCount: Qe,
                updateSheetStagingDataInStack: Sn,
                removeSheetStagingDataInStack: an,
                updateSheetDataInStack: Pt,
                removeSheetDataFromStack: ln,
                getPreviousSheetDataInStack: Yt
            } = Re ? a.useContext(Re) : {},
            {
                ancestorPrimarySwipeTrapActiveOnYAxis: It
            } = a.useContext(mt) || {},
            et = ql(),
            _e = a.useRef(null),
            ft = Ze(_e, et, t),
            Ht = a.useRef(null),
            zt = a.useRef(null),
            Ee = a.useRef(null),
            rn = a.useRef(null),
            St = a.useRef(null),
            Dt = a.useRef(null),
            yn = a.useRef(null),
            sn = a.useRef([]),
            tt = a.useMemo(() => x ? typeof x == "string" ? [x, "var(--silk-aF)"] : [...x, "var(--silk-aF)"] : ["var(--silk-aF)"], [x]),
            Nt = a.useRef(null);
        a.useEffect(() => {
            Nt.current === null && Number.isInteger(Pe) && Pe > 0 && (Nt.current = Pe)
        }, []);
        let Ve = a.useMemo(() => Number.isInteger(Se) ? Se : Number.isInteger(Pe) && Pe > 0 ? Pe : Nt.current ? Nt.current : 1, [Pe, Se]),
            {
                actualTrack: U,
                actualPlacement: Ce
            } = a.useMemo(() => {
                let g = {
                    actualPlacement: null,
                    actualTrack: null
                };
                return D && !N ? (g.actualPlacement = D, D !== "center" ? g.actualTrack = D : g.actualTrack = "bottom") : N && !D ? Array.isArray(N) ? (g.actualPlacement = "center", g.actualTrack = N.includes("left") ? "horizontal" : "vertical") : (g.actualPlacement = N, g.actualTrack = N) : N || D ? N && D && (g.actualPlacement = D, Array.isArray(N) ? g.actualTrack = N.includes("left") ? "horizontal" : "vertical" : g.actualTrack = N) : (g.actualPlacement = "bottom", g.actualTrack = "bottom"), [{
                    state: "staging:opening",
                    configTrack: J ? .track
                }, {
                    state: "staging:closing",
                    configTrack: $ ? .track
                }].forEach(({
                    state: C,
                    configTrack: T
                }) => {
                    F.matches(C) && T && (T === "top" && g.actualTrack === "bottom" || T === "bottom" && g.actualTrack === "top" ? g.actualTrack = "vertical" : (T === "left" && g.actualTrack === "right" || T === "right" && g.actualTrack === "left") && (g.actualTrack = "horizontal"))
                }), g
            }, [D, N, J ? .track, $ ? .track, F]);
        a.useMemo(() => U === "horizontal", [U]);
        let ua = a.useMemo(() => U === "vertical", [U]);
        a.useEffect(() => {
            if (D ? .includes("top") && N && N !== "top" || D ? .includes("bottom") && N && N !== "bottom" || !D ? .includes("center") && N && N.includes("top") && N.includes("bottom") || D ? .includes("left") && N && N !== "left" || D ? .includes("right") && N && N !== "right" || !D ? .includes("center") && N && N.includes("left") && N.includes("right")) throw Error(`'placement' prop value '${D}' cannot be used with 'tracks' prop value '${N}'.`)
        }, [D, N]);
        let yt = a.useMemo(() => J ? .track || (U === "horizontal" ? "right" : U === "vertical" ? "bottom" : U), [J ? .track, U]),
            nt = a.useMemo(() => Ea(J, na.smooth), [J]),
            R = a.useMemo(() => Ea($, {
                easing: "spring",
                stiffness: 520,
                damping: 44,
                mass: 1
            }), [$]),
            de = a.useMemo(() => Ea(ce ? ? J, na.smooth), [ce, J]),
            ne = a.useMemo(() => le === "alertdialog" || !f, [f, le]),
            ee = (U !== "horizontal" && U !== "vertical" || !!ne) && !B,
            [K, ie, Ye, De] = a.useMemo(() => {
                let g = !1,
                    S = !1,
                    C = !1,
                    T = !1;
                return h && Us ? ne && (x ? (C = !0, F.matches("openness:open") && !F.matches("staging:closing") && (S = !0)) : F.matches("openness:open") && !F.matches("staging:closing") && (ee === !1 && xt() ? T = !0 : g = !0)) : F.matches("openness:closed") || (g = !0), [g, S, C, T]
            }, [h, F, ne, x, ee]),
            gt = a.useMemo(() => q.getValues()[0] !== "none", [q]),
            ht = ["right", "left", "horizontal"].includes(U) ? "horizontal" : "vertical",
            [Lt, Gt] = a.useState(!1),
            [$t, at] = a.useState(!1),
            Kt = a.useMemo(() => !V && (V ? void 0 : Lt !== !0), [V, Lt]),
            Ke = a.useMemo(() => ee === !0 ? v === "auto" ? 10 : 1 : 0, [ee, v]),
            ot = a.useRef(null);
        a.useEffect(() => (A && (ot.current = H.addSheet({
            id: A,
            stackId: Rt,
            stackingIndex: -1,
            sendToOpennessMachine: E
        })), () => {
            A && H.attemptToRemoveSheetOrCleanup(A)
        }), [E, A, Rt]), a.useEffect(() => (j && H.addNativeFocusScrollPreventer(A), () => {
            j && H.removeNativeFocusScrollPreventer(A)
        }), [j, A]);
        let X = a.useMemo(() => Yt ? .(A), [Yt, A]),
            [on, wr] = a.useState(null),
            un = a.useMemo(() => b && on ? g => {
                on(g), b(g)
            } : b && !on ? b : !b && on ? on : null, [b, on]),
            Cn = a.useCallback(() => {
                w ? .();
                let g = ke.current.exactProgressValueAtDetents[me.current[0]];
                Ft.current = g, H.updateSheetTravelProgress(A, g)
            }, [w, A]),
            Ct = a.useMemo(() => {
                let g;
                if (pe.value > 0) g = un ? (S, C) => {
                    un({
                        progress: S,
                        range: C,
                        progressAtDetents: ke.current.exactProgressValueAtDetents
                    });
                    let T = vn(S);
                    ot.current.aggregatedTravelCallback(S, T)
                } : S => {
                    let C = vn(S);
                    ot.current.aggregatedTravelCallback(S, C)
                };
                else {
                    let S = H.getAggregatedStackingCallbackForSheetsBelow(A);
                    g = S ? un ? (C, T) => {
                        un({
                            progress: C,
                            range: T,
                            progressAtDetents: ke.current.exactProgressValueAtDetents
                        });
                        let L = vn(C);
                        ot.current.aggregatedTravelCallback(C, L), S(C, L)
                    } : C => {
                        let T = vn(C);
                        ot.current.aggregatedTravelCallback(C, T), S(C, T)
                    } : () => {}
                }
                return g
            }, [pe.value, un, A]),
            Tn = a.useRef(!1),
            Va = a.useMemo(() => {
                let g;
                return U === "bottom" || U === "vertical" ? g = "translateY(-2px)" : U === "top" ? g = "translateY(2px)" : U === "right" || U === "horizontal" ? g = "translateX(-2px)" : U === "left" && (g = "translateX(2px)"), S => {
                    S > 0 && S < 1 && !Tn.current ? (St.current.style.setProperty("transform", g), Tn.current = !0) : (S > 1 || S <= 0) && Tn.current && (St.current.style.removeProperty("transform"), Tn.current = !1)
                }
            }, [U]),
            Ln = a.useMemo(() => De ? g => Va(g) : Ct, [Va, De, Ct]),
            [En, Mn] = a.useState("both"),
            Wa = Ll(_e);
        a.useEffect(() => {
            var g, S;
            let C, T, L;
            if (typeof te == "boolean") C = {
                x: te,
                y: te
            };
            else {
                let {
                    x: Be,
                    y: He
                } = te || {};
                C = {
                    x: Be,
                    y: He
                }
            }
            let Y = (we === "ios" || we === "ipados") && V && !It,
                ae = Ml();
            ht === "vertical" && (T = C.x, L = !!Y || !ae && ((g = C.y) === null || g === void 0 || g)), ht === "horizontal" && (L = !!Y || C.y, T = (S = C.x) === null || S === void 0 || S), L = !!L || Wa, Mn(T && !L ? "horizontal" : !T && L ? "vertical" : T && L ? "both" : "none")
        }, [It, V, te, Wa, ht]);
        let ke = a.useRef({}),
            [ja, Ar] = a.useState(0),
            [xr, Or] = a.useState(() => () => ({
                top: null,
                bottom: null
            })),
            ca = a.useRef([]),
            me = a.useRef([0, 0]),
            _n = a.useRef(0),
            Fe = a.useRef(null),
            da = a.useRef(() => {}),
            Fn = a.useRef(!1),
            Ua = a.useRef(!1),
            ma = a.useCallback(g => Ua.current = g, []),
            ze = Rn(({
                destinationDetent: g,
                trackToTravelOn: S = U === "vertical" ? "bottom" : U === "horizontal" ? "right" : U,
                behavior: C = "instant",
                runTravelCallbacksAndAnimations: T = !0,
                runOnTravelStart: L = !0,
                animationConfig: Y,
                rAFLoopEndCallback: ae,
                travelEndCallback: Be
            }) => {
                Ws({
                    destinationDetent: g,
                    behavior: C,
                    runTravelCallbacksAndAnimations: T,
                    runOnTravelStart: L,
                    trackToTravelOn: S,
                    animationConfig: Y,
                    rAFLoopEndCallback: ae,
                    onTravel: un,
                    onTravelStart: y,
                    onTravelEnd: () => {
                        Be ? .(), Cn()
                    },
                    segment: me,
                    fullTravelCallback: Ct,
                    sheetId: A,
                    stackId: Rt,
                    dimensions: ke,
                    snapBackAcceleratorTravelAxisSize: Ke,
                    actualSwipeOutDisabledWithDetent: ie,
                    lastProgressValue: Ft,
                    viewRef: _e,
                    scrollContainerRef: Ee,
                    contentWrapperRef: St,
                    currentDetent: me.current[0] === me.current[1] ? me.current[0] : null,
                    setSegment: Et,
                    setProgrammaticScrollOngoing: ma,
                    contentPlacement: Ce,
                    hasOppositeTracks: U === "horizontal" || U === "vertical"
                })
            }),
            Rr = a.useCallback(() => {
                me.current[0] === me.current[1] && ze({
                    runTravelCallbacksAndAnimations: !1,
                    destinationDetent: me.current[0]
                })
            }, [A, U, ie, De, Ke]),
            Pr = a.useCallback(g => {
                Pt ? .({
                    sheetId: A,
                    sendToOpennessMachine: E,
                    sendToPositionMachine: ge
                })
            }, [Pt, A, E, ge]),
            Xa = a.useCallback(() => {
                ln ? .(A)
            }, [ln, A]),
            Ya = a.useMemo(() => le === "alertdialog" ? () => {} : () => E({
                type: "CLOSE"
            }), [E, le]),
            Ir = a.useCallback(() => {
                H.updateLayer({
                    layerId: A,
                    layerContextId: Ne,
                    layerStackContextId: Re,
                    inertOutside: V,
                    onPresentAutoFocus: c,
                    onDismissAutoFocus: p,
                    dismissOverlayIfNotAlertDialog: Ya,
                    onClickOutside: W,
                    onEscapeKeyDown: P,
                    viewElement: _e.current,
                    backdropElement: zt.current,
                    scrollContainerElement: Ee.current,
                    elementFocusedLastBeforeShowing: Le.current
                })
            }, [A, Ne, Re, V, c, p, Ya, W, P, Le]),
            Ha = a.useCallback(() => {
                H.removeLayer(A)
            }, [A]),
            Dr = a.useCallback(() => {
                let g = T => ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "End", "Home", " "].includes(T.key),
                    S = T => {
                        if (g(T)) {
                            var L, Y;
                            (L = Ee.current) === null || L === void 0 || L.style.setProperty("overflow", "hidden"), (Y = Ee.current) === null || Y === void 0 || Y.style.setProperty("scroll-snap-type", "none")
                        }
                    },
                    C = T => {
                        if (g(T)) {
                            var L, Y;
                            (L = Ee.current) === null || L === void 0 || L.style.removeProperty("overflow"), (Y = Ee.current) === null || Y === void 0 || Y.style.removeProperty("scroll-snap-type")
                        }
                    };
                return document.addEventListener("keydown", S), document.addEventListener("keyup", C), () => {
                    document.removeEventListener("keydown", S), document.removeEventListener("keyup", C)
                }
            }, []),
            cn = a.useCallback(() => {
                xe(g => g + 1), H.updateSheetStackingIndex(A, pe.silent.value)
            }, [xe, pe.silent, A]),
            Mt = a.useCallback(() => {
                xe(g => g - 1), H.updateSheetStackingIndex(A, pe.silent.value)
            }, [xe, pe.silent, A]),
            Bn = dt(Xe, "active");
        Je("after-paint", Bn, {
            state: "active:true",
            callback: Ir
        }), Je("after-paint", Bn, {
            state: "active:true",
            callback: Dr
        }), _("after-paint", Bn, {
            state: "active:false",
            callback: Ha
        });
        let dn = dt(Xe, "position"),
            _t = dt(Xe, "position:covered.status");
        re(dn, {
            state: "position:out",
            transition: "READY_TO_GO_FRONT",
            callback: a.useCallback(g => {
                X ? .sendToPositionMachine({
                    type: "READY_TO_GO_DOWN",
                    skipOpening: g.skipOpening
                }), cn()
            }, [cn, X])
        }), re(Xe, {
            state: "position:front.status:opening",
            transition: "NEXT",
            callback: a.useCallback(() => {
                X ? .sendToPositionMachine("NEXT")
            }, [X])
        }), re(Xe, {
            state: "position:front.status:idle",
            transition: "READY_TO_GO_OUT",
            callback: a.useCallback(() => {
                X ? .sendToPositionMachine("READY_TO_GO_UP")
            }, [X])
        }), re(Xe, {
            state: "position:front.status:idle",
            transition: "GO_OUT",
            callback: a.useCallback(() => {
                Ct ? .(0, {
                    start: 0,
                    end: 0
                }), Cn(), X ? .sendToPositionMachine("GO_UP"), Mt()
            }, [Ct, Cn, X, Mt])
        }), re(Xe, {
            state: "position:front.status:idle",
            transition: "READY_TO_GO_DOWN",
            callback: a.useCallback(g => {
                X ? .sendToPositionMachine({
                    type: "READY_TO_GO_DOWN",
                    skipOpening: g.skipOpening
                }), cn()
            }, [cn, X])
        }), re(Xe, {
            state: "position:front.status:closing",
            transition: "NEXT",
            callback: a.useCallback(() => {
                X ? .sendToPositionMachine("NEXT"), Mt()
            }, [X, Mt])
        }), re(_t, {
            state: "position:covered.status:going-down",
            transition: "NEXT",
            callback: a.useCallback(() => {
                X ? .sendToPositionMachine("NEXT")
            }, [X])
        }), re(_t, {
            state: "position:covered.status:idle",
            transition: "READY_TO_GO_DOWN",
            callback: a.useCallback(g => {
                X ? .sendToPositionMachine({
                    type: "READY_TO_GO_DOWN",
                    skipOpening: g.skipOpening
                }), cn()
            }, [cn, X])
        }), re(_t, {
            state: "position:covered.status:idle",
            transition: "READY_TO_GO_UP",
            callback: a.useCallback(() => {
                X ? .sendToPositionMachine("READY_TO_GO_UP")
            }, [X])
        }), re(_t, {
            state: "position:covered.status:idle",
            transition: "GO_UP",
            callback: a.useCallback(() => {
                X ? .sendToPositionMachine("GO_UP"), Mt()
            }, [Mt, X])
        }), _("immediate", _t, {
            state: "position:covered.status:come-back",
            callback: a.useCallback(() => ge(""), [ge])
        }), re(_t, {
            state: "position:covered.status:going-up",
            transition: "NEXT",
            callback: a.useCallback(() => {
                X ? .sendToPositionMachine("NEXT"), Mt()
            }, [X, Mt])
        }), _("immediate", _t, {
            state: "position:covered.status:indeterminate",
            callback: a.useCallback(() => {
                pe.silent.value === 0 ? ge("GOTO_front") : ge("GOTO_idle")
            }, [pe.silent, ge])
        });
        let mn = a.useCallback(() => X ? .sendToOpennessMachine({
                machine: "staging",
                type: "NEXT"
            }), [X]),
            Tt = a.useCallback((g, {
                newState: S
            }) => {
                pt(S), Sn ? .({
                    sheetId: A,
                    staging: S
                })
            }, [n, pt, Sn, A]),
            wn = a.useCallback((g, {
                newState: S
            }) => {
                m ? .(S)
            }, [m]),
            Et = a.useMemo(() => {
                let g = S => {
                    _n.current = S[1], queueMicrotask(() => {
                        let C = S[0],
                            T = S[1];
                        (C !== me.current[0] || T !== me.current[1]) && (me.current = S, C === T && (Fe.current === null && Z ? Z(T) : C === Fe.current && (Fe.current = null)))
                    })
                };
                return d && ee === !1 ? g = S => {
                    _n.current = S[1], queueMicrotask(() => {
                        let C = S[0],
                            T = S[1];
                        (C !== me.current[0] || T !== me.current[1]) && (me.current = S, d({
                            start: C,
                            end: T
                        }), C === T && (Fe.current === null && Z ? Z(T) : C === Fe.current && (Fe.current = null)))
                    })
                } : ee === !0 && (g = Ye ? S => {
                    _n.current = S[1], queueMicrotask(() => {
                        let C = S[0],
                            T = S[1];
                        if (C !== me.current[0] || T !== me.current[1]) {
                            let L = tt.length;
                            ie && C === 1 && T === 1 ? E({
                                machine: "backStuck",
                                type: "STUCK_START"
                            }) : C === L && T === L ? E({
                                machine: "frontStuck",
                                type: "STUCK_START"
                            }) : An.current ? E({
                                machine: "frontStuck",
                                type: "STUCK_END"
                            }) : Wn.current && E({
                                machine: "backStuck",
                                type: "STUCK_END"
                            }), me.current = S, d ? .({
                                start: C,
                                end: T
                            }), C === T && (Fe.current === null && Z ? Z(T) : C === Fe.current && (Fe.current = null))
                        }
                    })
                } : S => {
                    _n.current = S[1], queueMicrotask(() => {
                        let C = S[0],
                            T = S[1];
                        if (C !== me.current[0] || T !== me.current[1]) {
                            let L = tt.length;
                            C === L && T === L ? E({
                                machine: "frontStuck",
                                type: "STUCK_START"
                            }) : An.current && E({
                                machine: "frontStuck",
                                type: "STUCK_END"
                            }), me.current = S, d ? .({
                                start: C,
                                end: T
                            }), C === T && (Fe.current === null && Z ? Z(T) : C === Fe.current && (Fe.current = null))
                        }
                    })
                }), g
            }, [d, ee, Z, Ye, ie, tt.length, E]),
            qt = a.useCallback(g => {
                let S = {
                    destinationDetent: g === "front" ? ke.current.detentMarkers.length : 1,
                    runTravelCallbacksAndAnimations: !1
                };
                if (ze(S), xt()) {
                    var C;
                    (C = Ee.current) === null || C === void 0 || C.style.setProperty("overflow", "hidden"), setTimeout(() => {
                        var T;
                        (T = Ee.current) === null || T === void 0 || T.style.removeProperty("overflow")
                    }, CSS.supports("overscroll-behavior", "none") ? 1 : 10)
                }
                Fn.current = !1
            }, [ze]),
            za = a.useCallback((g, S) => {
                let C = me.current[0],
                    T = S ? ? null;
                if (T === null) {
                    var L, Y;
                    T = (g ? ? "up") === "up" ? (L = me.current[0]) < tt.length ? L + 1 : 1 : (Y = me.current[0]) > 1 ? Y - 1 : tt.length
                }
                return T === 0 || T === C ? null : T
            }, [tt]),
            Ga = a.useCallback(({
                direction: g,
                detent: S,
                behavior: C
            }) => {
                let T = () => {
                    let L = za(g, S);
                    L && E({
                        type: "ACTUALLY_STEP",
                        detent: L,
                        behavior: C
                    })
                };
                F.silent.matches("openness:open.scroll:ended.afterPaintEffectsRun:true") ? T() : ha.current = T
            }, [F.silent, za, E]),
            $a = a.useCallback((g, S) => {
                Fe.current = g, Z ? .(g), ze({
                    destinationDetent: g,
                    behavior: S ? ? (de.skip ? "instant" : "smooth"),
                    animationConfig: de,
                    travelEndCallback: () => E({
                        machine: "staging",
                        type: "NEXT"
                    })
                })
            }, [Z, ze, de, E]),
            Ka = a.useCallback((g, S, C, T) => {
                let L;
                if (g === "auto") {
                    let Y = T === "center" ? C + (S - C) / 2 : C;
                    L = At === "chromium" ? Y <= 1440 ? 70 + .25 * Y : .3 * Y : xt() ? we === "ios" || we === "ipados" ? Y <= 716 ? 15 + .1 * Y : .12 * Y : .5 * Y : 10
                } else if (typeof g == "function") {
                    let Y = parseInt(g(C), 10);
                    L = Y < 1 ? 1 : Y > C / 2 ? C / 2 : Y
                } else g === "initial" && (L = 1);
                return L
            }, []),
            qa = a.useCallback(() => {
                if (_e.current) {
                    let g = (S, C) => _e.current.style.setProperty(S, C);
                    g("--silk-aD", ke.current.view.travelAxis.px), g("--silk-aE", ke.current.view.crossAxis.px), g("--silk-aF", ke.current.content.travelAxis.px), g("--silk-aG", ke.current.content.crossAxis.px), g("--silk-aH", ke.current.frontSpacer.travelAxis.px), g("--silk-aI", ke.current.backSpacer.travelAxis.px), g("--silk-aJ", ke.current.snapOutAccelerator.travelAxis.px), g("--silk-aK", ke.current.detentMarkers[0].travelAxis.px)
                }
            }, []),
            Nr = a.useCallback(g => {
                let S = _e.current,
                    C = Dt.current,
                    T = [];
                sn.current.forEach(be => {
                    T.push(window.getComputedStyle(be))
                });
                let L = be => parseFloat(be),
                    Y = be => parseInt(be, 10),
                    ae = be => U === "right" || U === "left" || U === "horizontal" ? be === "travelAxis" ? "width" : "height" : be === "travelAxis" ? "height" : "width",
                    Be = be => {
                        let wt, Qt, fn, vt, G, gn;
                        return Qt = L(wt = be.getPropertyValue(ae("travelAxis"))), fn = Y(wt), G = Y(vt = be.getPropertyValue(ae("crossAxis"))), gn = Y(vt), {
                            travelAxis: {
                                px: wt,
                                unitless: Qt,
                                unitlessRoundedDown: fn
                            },
                            crossAxis: {
                                px: vt,
                                unitless: G,
                                unitlessRoundedDown: gn
                            }
                        }
                    },
                    He = () => {
                        let be, wt, Qt = window.getComputedStyle(_e.current),
                            fn = window.getComputedStyle(Dt.current),
                            vt = 0;
                        Ar(ve => ve + 1), ke.current = {
                            view: { ...Be(Qt)
                            },
                            scroll: {},
                            snapOutAccelerator: {
                                travelAxis: {}
                            },
                            frontSpacer: {
                                travelAxis: {}
                            },
                            backSpacer: {
                                travelAxis: {}
                            },
                            content: { ...Be(fn)
                            },
                            detentMarkers: [...T.map((ve, st) => {
                                let ct = Be(ve);
                                return st !== T.length - 1 && (vt += ct.travelAxis.unitless), { ...ct,
                                    accumulatedOffsets: {
                                        travelAxis: {
                                            px: vt + "px",
                                            unitless: vt,
                                            unitlessRoundedDown: null
                                        }
                                    }
                                }
                            })],
                            progressValueAtDetents: []
                        };
                        let G = ke.current;
                        G.scroll = G.view;
                        let gn = Ka(k, G.view.travelAxis.unitless, G.content.travelAxis.unitless, Ce);
                        G.snapOutAccelerator.travelAxis.px = gn + "px", G.snapOutAccelerator.travelAxis.unitless = gn, G.snapOutAccelerator.travelAxis.unitlessRoundedDown = Y(gn);
                        let $r = G.detentMarkers.length,
                            Xn = G.content.travelAxis.unitless - vt;
                        G.detentMarkers[$r - 1] = {
                            travelAxis: {
                                px: Xn + "px",
                                unitless: Xn,
                                unitlessRoundedDown: null
                            },
                            crossAxis: {
                                px: "1px",
                                unitless: 1,
                                unitlessRoundedDown: 1
                            },
                            accumulatedOffsets: {
                                travelAxis: {
                                    px: vt + Xn + "px",
                                    unitless: vt + Xn,
                                    unitlessRoundedDown: null
                                }
                            }
                        };
                        let ba = ve => ({
                                before: ve(-2.1),
                                exact: ve(0),
                                after: ve(2.1)
                            }),
                            Yn = G.content.travelAxis.unitless,
                            hn = [ba(ve => ve / Yn)],
                            rl;
                        G.detentMarkers.slice(0, -1).forEach(ve => {
                            let st = ve.accumulatedOffsets.travelAxis.unitless;
                            hn.push(ba(ct => (st + ct) / Yn))
                        }), hn.push(ba(ve => (Yn + ve) / Yn)), rl = hn[Ve];
                        let sl = ca.current.length > 0 ? ca.current[me.current[1]] : 0,
                            il = (function(ve, st) {
                                let ct = 0;
                                for (let Wt = 1; Wt < st.length; Wt++) {
                                    let xn = st[Wt];
                                    Math.abs(xn - ve) < Math.abs(st[ct] - ve) && (ct = Wt)
                                }
                                return ct
                            })(sl ? ? 1, hn.map(ve => ve.exact));
                        Et([il, il]), G.progressValueAtDetents = hn, G.exactProgressValueAtDetents = hn.map(ve => ve.exact), ca.current = G.progressValueAtDetents.map(ve => ve.exact), G.progressValueAtInitialDetent = rl, be = De ? U === "horizontal" || U === "vertical" ? G.view.travelAxis.unitless / 2 + 1 : 1 : ie ? G.content.travelAxis.unitless - ke.current.detentMarkers[0].travelAxis.unitless + Ke : U === "horizontal" || U === "vertical" ? G.view.travelAxis.unitless / 2 + G.view.travelAxis.unitless - (G.view.travelAxis.unitless - G.content.travelAxis.unitless) / 2 + G.snapOutAccelerator.travelAxis.unitless : Ce === "center" ? G.view.travelAxis.unitless - (G.view.travelAxis.unitless - G.content.travelAxis.unitless) / 2 + G.snapOutAccelerator.travelAxis.unitless : G.view.travelAxis.unitless - (G.view.travelAxis.unitless - G.content.travelAxis.unitless) + G.snapOutAccelerator.travelAxis.unitless, G.frontSpacer.travelAxis.unitless = be, G.frontSpacer.travelAxis.px = be + "px", wt = ee === !0 && v === "auto" ? G.view.travelAxis.unitless + Ke : U === "horizontal" || U === "vertical" ? De ? G.view.travelAxis.unitless / 2 : G.view.travelAxis.unitless / 2 + G.view.travelAxis.unitless - (G.view.travelAxis.unitless - G.content.travelAxis.unitless) / 2 + G.snapOutAccelerator.travelAxis.unitless : G.view.travelAxis.unitless, G.backSpacer.travelAxis.unitless = wt, G.backSpacer.travelAxis.px = wt + "px", qa(), Or(() => () => {
                            let ve, st;
                            if (!_e.current) return {
                                top: null,
                                bottom: null
                            };
                            let ct = _e.current.getBoundingClientRect(),
                                Wt = ct.top,
                                xn = ct.bottom,
                                ol = ua || U === "top" || U === "bottom",
                                Hn = G.view[ol ? "travelAxis" : "crossAxis"].unitless,
                                zn = G.content[ol ? "travelAxis" : "crossAxis"].unitless;
                            return Ce === "left" || Ce === "right" || Ce === "center" ? (ve = Wt + (Hn - zn) / 2, st = xn - (Hn - zn) / 2) : Ce === "top" ? (ve = Wt, st = xn - (Hn - zn)) : Ce === "bottom" && (ve = Wt + (Hn - zn), st = xn), {
                                top: ve,
                                bottom: st
                            }
                        })
                    };
                He();
                let Jt = (be, wt) => {
                        let Qt = new ResizeObserver(fn => {
                            fn.forEach(() => wt())
                        });
                        return Qt.observe(be, {
                            box: "border-box"
                        }), Qt
                    },
                    Bt = () => {
                        He(), ze({
                            runTravelCallbacksAndAnimations: !1
                        })
                    },
                    rt = !0,
                    Vt = Jt(S, () => {
                        rt ? rt = !1 : Bt()
                    }),
                    Zt = !0,
                    Me = Jt(C, () => {
                        Zt ? (He(), Zt = !1) : Bt()
                    });
                return () => {
                    Vt && S && (Vt.unobserve(S), Vt.disconnect()), Me && C && (Me.unobserve(C), Me.disconnect())
                }
            }, [U, Ka, k, Ve, ee, qa, Ke, v, ze, Et, Ce, ie, De, tt]),
            Ja = a.useCallback(g => {
                let S, C = 0,
                    T = g,
                    L = 0;
                return Y => {
                    S = Y;
                    let ae = T - Y;
                    return C = ae, (ae === 0 || Math.abs(ae) < Math.abs(L / 2)) && F.silent.matches("scrollContainerTouch:ongoing") && (S = T - L / 2, C = T - S), Math.abs(C) >= .1 && .35 > Math.abs(C) && (S = C >= 0 ? T - .1 : T + .1, C = C >= 0 ? .1 : -.1), Y <= 0 && (S = 0), T = S, L = C, S
                }
            }, [F.silent]),
            Za = a.useCallback(() => {
                var g;
                let S, C, T = U === "right" || U === "left" || U === "horizontal" ? "scrollLeft" : "scrollTop",
                    L = Ee.current,
                    Y = ke.current.snapOutAccelerator.travelAxis.unitless,
                    ae = ke.current.content.travelAxis.unitless,
                    Be = ke.current.scroll.travelAxis.unitless,
                    He = Ja((g = Ft.current) !== null && g !== void 0 ? g : ke.current.progressValueAtDetents[me.current[1]].exact),
                    Jt = U === "right" || U === "bottom",
                    Bt = U === "left" || U === "top";
                if (Jt || Bt) {
                    let rt;
                    if (De) rt = Bt ? Me => 1 - Me / ae : Me => 1 + Me / ae;
                    else if (Jt)
                        if (Ce !== "center") {
                            let Me = ie ? ke.current.detentMarkers[0].travelAxis.unitless - Ke : -Y;
                            rt = be => (be + Me) / ae
                        } else {
                            let Me = ae + (Be - ae) / 2;
                            rt = be => (be - Y) / Me
                        }
                    else if (Bt)
                        if (Ce !== "center") rt = Me => (ae + Ke - Me) / ae;
                        else {
                            let Me = ae + (Be - ae) / 2;
                            rt = be => (Me + Ke - be) / Me
                        }
                    let Vt = ee === !0 ? 1 : 10,
                        Zt = ee === !0 && ie ? ke.current.progressValueAtDetents[1].exact : 0;
                    C = () => {
                        S = L[T];
                        let Me = Math.min(Math.max(rt(S), Zt), Vt);
                        return Math.min(Math.max(He(Me), Zt), Vt)
                    }
                } else if (U === "horizontal" || U === "vertical") {
                    let rt = (Be - ae) / 2,
                        Vt = De ? 0 : Y + Be - rt,
                        Zt = ae + rt;
                    C = () => {
                        S = L[T];
                        let Me = 1 - Math.abs(S - Vt) / Zt;
                        return Math.max(He(Math.max(Me, 0)), 0)
                    }
                }
                return C
            }, [U, Ja, ee, De, Ce, ie, Ke, ja]),
            Vn = a.useRef(),
            Lr = a.useCallback(() => {
                let g = Ee.current,
                    S = () => {
                        E({
                            machine: "openness:open.move",
                            type: "MOVE_END"
                        });
                        for (let T = 0; T < ke.current.progressValueAtDetents.length; T++) {
                            let L = ke.current.progressValueAtDetents[T].exact;
                            Ft.current > L - .01 && Ft.current < L + .01 && (E({
                                machine: "openness:open.scroll",
                                type: "SCROLL_END"
                            }), E({
                                machine: "openness:open.swipe",
                                type: "SWIPE_END"
                            }))
                        }
                    },
                    C = () => {
                        Ua.current ? ma(!1) : (ga.current || E({
                            machine: "openness:open.scroll",
                            type: "SCROLL_START"
                        }), An.current || Wn.current || (ka.current || E({
                            machine: "openness:open.swipe",
                            type: "SWIPE_START"
                        }), va.current || E({
                            machine: "openness:open.move",
                            type: "MOVE_START"
                        }))), clearTimeout(Vn.current), Vn.current = setTimeout(S, 200)
                    };
                return g.addEventListener("scroll", C), () => {
                    g.removeEventListener("scroll", C), clearTimeout(Vn.current)
                }
            }, [E, ma]),
            Ft = a.useRef(null),
            Mr = a.useCallback(() => {
                let g;
                if (Ln) {
                    let S = ke.current.progressValueAtDetents,
                        C = S.length,
                        T = Za();
                    g = js(() => {
                        let L, Y = T();
                        if (Ft.current !== Y) {
                            for (let ae = 0; ae < C; ae++) {
                                let Be = S[ae],
                                    He = Be.after;
                                Y > He && ae + 1 < C && Y < S[ae + 1].before ? (L = {
                                    start: ae,
                                    end: ae + 1
                                }, Et([ae, ae + 1])) : Y > Be.before && Y < He ? (L = {
                                    start: ae,
                                    end: ae
                                }, Et([ae, ae])) : Y <= 0 && (L = {
                                    start: 0,
                                    end: 0
                                }, Et([0, 0]))
                            }
                            da.current(Y, L), Ft.current = Y
                        }
                    })
                }
                return () => {
                    g ? .()
                }
            }, [Et, Ln, Za]),
            Qa = a.useCallback(g => {
                let S = 1e5,
                    C = T => {
                        S < Math.abs(T.deltaY) ? window.removeEventListener("wheel", C, {
                            passive: !1
                        }) : T.preventDefault(), S = Math.abs(T.deltaY)
                    };
                return window.addEventListener("wheel", C, {
                    passive: !1
                }), setTimeout(() => {
                    g("SWIPED_OUT")
                }, 100), () => window.removeEventListener("wheel", C, {
                    passive: !1
                })
            }, []),
            _r = a.useCallback((g, {
                send: S
            }) => {
                let C, T = _e.current,
                    L = Dt.current,
                    Y = Ee.current,
                    ae = !1,
                    Be = () => ae = !0;
                window.addEventListener("wheel", Be, {
                    passive: !0,
                    once: !0
                });
                let He = new IntersectionObserver(function(Jt) {
                    for (let Bt of Jt) Bt.isIntersecting || (T.style.setProperty("pointer-events", "none", "important"), T.style.setProperty("opacity", "0", "important"), T.style.setProperty("position", "fixed", "important"), T.style.setProperty("top", "-100px", "important"), T.style.setProperty("left", "-100px", "important"), L.style.setProperty("pointer-events", "none", "important"), Y.style.setProperty("width", "1px", "important"), Y.style.setProperty("height", "1px", "important"), Y.style.setProperty("clip-path", "inset(0)", "important"), requestAnimationFrame(() => {
                        ae ? C = Qa(S) : S("SWIPED_OUT")
                    }))
                }, {
                    root: T,
                    threshold: [0]
                });
                return He.observe(L), () => {
                    C ? .(), window.removeEventListener("wheel", Be, {
                        passive: !0,
                        once: !0
                    }), He && (He.unobserve(L), He.disconnect())
                }
            }, [Qa]),
            Fr = a.useRef(() => 0),
            Br = a.useCallback(() => {
                let g = _e.current,
                    S = C => {
                        kt({
                            nativeEvent: C,
                            defaultBehavior: {},
                            handler: M
                        })
                    };
                return g ? .addEventListener("focus", S, {
                    capture: !0
                }), () => {
                    g ? .removeEventListener("focus", S, {
                        capture: !0
                    })
                }
            }, [M]),
            Vr = a.useCallback(g => {
                Ee.current.contains(g.target) && E({
                    machine: "scrollContainerTouch",
                    type: "TOUCH_START"
                })
            }, [E]),
            Wr = a.useCallback(g => {
                Ee.current.contains(g.target) && E({
                    machine: "scrollContainerTouch",
                    type: "TOUCH_END"
                })
            }, [E]);
        _("immediate", q, {
            state: "staging:none",
            callback: Tt,
            params: {
                newState: "none"
            }
        }), re(q, {
            state: "staging:none",
            transition: "OPEN",
            callback: a.useCallback(() => X ? .sendToOpennessMachine({
                machine: "staging",
                type: "GO_DOWN",
                skipOpening: nt ? .skip
            }), [X, nt ? .skip])
        }), re(q, {
            state: "staging:none",
            transition: "OPEN_PREPARED",
            callback: a.useCallback(g => X ? .sendToOpennessMachine({
                machine: "staging",
                type: "GO_DOWN",
                skipOpening: g.skipOpening
            }), [X])
        }), re(q, {
            state: "staging:none",
            transition: "GO_DOWN",
            callback: a.useCallback(g => X ? .sendToOpennessMachine({
                machine: "staging",
                type: "GO_DOWN",
                skipOpening: g.skipOpening
            }), [X])
        }), re(q, {
            state: "staging:none",
            transition: "ACTUALLY_CLOSE",
            callback: a.useCallback(() => X ? .sendToOpennessMachine({
                machine: "staging",
                type: "GO_UP"
            }), [X])
        }), re(q, {
            state: "staging:none",
            transition: "GO_UP",
            callback: a.useCallback(g => X ? .sendToOpennessMachine({
                machine: "staging",
                type: "GO_UP",
                skipClosing: g.skipClosing
            }), [X])
        }), _("immediate", q, {
            state: "staging:open",
            callback: Tt,
            params: {
                newState: "open"
            }
        }), _("immediate", q, {
            state: "staging:open",
            callback: a.useCallback(() => {
                E({
                    machine: "longRunning",
                    type: "TO_TRUE"
                })
            }, [E])
        }), _("immediate", q, {
            state: "staging:open",
            callback: a.useCallback(() => {
                Te || fe == null || fe(!0)
            }, [Te, fe])
        }), _("after-paint", q, {
            state: "staging:open",
            callback: a.useCallback(() => {
                requestAnimationFrame(() => {
                    E({
                        machine: "openness",
                        type: "READY_TO_OPEN",
                        skipOpening: !0
                    }), E({
                        machine: "staging",
                        type: "NEXT"
                    })
                })
            }, [E])
        }), re(q, {
            state: "staging:open",
            transition: "NEXT",
            callback: mn
        }), _("immediate", q, {
            state: "staging:opening",
            callback: Tt,
            params: {
                newState: "opening"
            }
        }), _("immediate", q, {
            state: "staging:opening",
            callback: a.useCallback(() => {
                E({
                    machine: "longRunning",
                    type: "TO_TRUE"
                })
            }, [E])
        }), _("immediate", q, {
            state: "staging:opening",
            callback: a.useCallback(() => {
                Te || fe == null || fe(!0)
            }, [Te, fe])
        }), _("before-paint", q, {
            state: "staging:opening",
            callback: a.useCallback(() => {
                y ? .(), Ct(0, {
                    start: 0,
                    end: 0
                })
            }, [Ct, y])
        }), _("after-paint", q, {
            state: "staging:opening",
            callback: a.useCallback(() => {
                requestAnimationFrame(() => {
                    E({
                        machine: "openness",
                        type: "READY_TO_OPEN",
                        skipOpening: !1
                    })
                })
            }, [E])
        }), Je("after-paint", q, {
            state: "staging:opening",
            callback: a.useCallback(() => (gs(A), () => hs(A)), [A])
        }), re(q, {
            state: "staging:opening",
            transition: "NEXT",
            callback: mn
        }), _("immediate", q, {
            state: "staging:stepping",
            callback: Tt,
            params: {
                newState: "stepping"
            }
        }), _("after-paint", q, {
            state: "staging:stepping",
            callback: a.useCallback(({
                detent: g,
                behavior: S
            }) => {
                m ? .("stepping"), $a(g, S)
            }, [m, $a])
        }), jt("immediate", q, {
            state: "staging:stepping",
            callback: a.useCallback(() => {
                m ? .("idleInside")
            }, [m])
        }), _("immediate", q, {
            state: "staging:closing",
            callback: Tt,
            params: {
                newState: "closing"
            }
        }), _("immediate", q, {
            state: "staging:closing",
            callback: a.useCallback(() => {
                Te && fe ? .(!1)
            }, [Te, fe])
        }), _("after-paint", q, {
            state: "staging:closing",
            callback: a.useCallback(() => {
                E({
                    machine: "openness",
                    type: "READY_TO_CLOSE"
                })
            }, [E])
        }), re(q, {
            state: "staging:closing",
            transition: "NEXT",
            callback: mn
        }), _("immediate", q, {
            state: "staging:go-down",
            callback: Tt,
            params: {
                newState: "go-down"
            }
        }), re(q, {
            state: "staging:go-down",
            transition: "NEXT",
            callback: mn
        }), _("immediate", q, {
            state: "staging:going-down",
            callback: Tt,
            params: {
                newState: "going-down"
            }
        }), re(q, {
            state: "staging:going-down",
            transition: "NEXT",
            callback: mn
        }), _("immediate", q, {
            state: "staging:going-up",
            callback: Tt,
            params: {
                newState: "going-up"
            }
        }), re(q, {
            state: "staging:going-up",
            transition: "NEXT",
            callback: mn
        });
        let lt = dt(F, "longRunning");
        _("immediate", lt, {
            state: "longRunning:true",
            callback: a.useCallback(() => {
                Le.current === null && (Le.current = document.activeElement)
            }, [Le])
        }), _("immediate", lt, {
            state: "longRunning:true",
            callback: a.useCallback(() => {
                oe(!0), Qe ? .(g => g + 1)
            }, [oe, Qe])
        }), Je("before-paint", lt, {
            state: "longRunning:true",
            callback: Nr
        }), _("before-paint", lt, {
            state: "longRunning:true",
            guard: !nt.skip,
            callback: a.useCallback(() => {
                ze({
                    trackToTravelOn: yt,
                    runTravelCallbacksAndAnimations: !1,
                    destinationDetent: 0
                })
            }, [ze, yt])
        }), Je("after-paint", lt, {
            state: "longRunning:true",
            guard: z,
            callback: a.useCallback(() => Ds(Ht, O), [O])
        }), Je("after-paint", lt, {
            state: "longRunning:true",
            callback: Pr
        }), _("immediate", lt, {
            state: "longRunning:false",
            callback: a.useCallback(() => {
                oe(!1), Qe ? .(g => g - 1)
            }, [oe, Qe])
        }), _("immediate", lt, {
            state: "longRunning:false",
            callback: a.useCallback(() => {
                Le.current = null
            }, [Le])
        }), _("before-paint", lt, {
            state: "longRunning:false",
            callback: a.useCallback(() => {
                H.removeAllOutletPersistedStylesFromSheet(A)
            }, [A])
        }), _("after-paint", lt, {
            state: "longRunning:false",
            callback: Xa
        }), Je("before-paint", Bn, {
            state: "active:true",
            callback: Rr
        });
        let he = dt(F, "openness"),
            ut = dt(F, "openness:closed.status");
        _("immediate", he, {
            state: "openness:closed",
            callback: wn,
            params: {
                newState: "idleOutside"
            }
        }), _("immediate", he, {
            state: "openness:closed",
            callback: a.useCallback(() => {
                E({
                    machine: "longRunning",
                    type: "TO_FALSE"
                })
            }, [E])
        }), _("immediate", he, {
            state: "openness:closed",
            callback: a.useCallback(() => {
                Te && fe ? .(!1)
            }, [Te, fe])
        }), _("immediate", he, {
            state: "openness:closed",
            callback: a.useCallback(() => {
                ge({
                    machine: "active",
                    type: "TO_FALSE"
                })
            }, [ge])
        }), _("after-paint", he, {
            state: "openness:closed",
            callback: a.useCallback(() => {
                clearTimeout(Vn.current), Ft.current = null, Et([0, 0]), Tn.current = !1, xe(-1), Fn.current = !1
            }, [xe, Et])
        }), re(he, {
            state: "openness:closed",
            transition: "READY_TO_OPEN",
            callback: a.useCallback(g => {
                ge({
                    machine: "position",
                    type: "READY_TO_GO_FRONT",
                    skipOpening: g.skipOpening
                })
            }, [ge])
        }), Ps(E, ut, "openness:closed.status:pending", {
            delay: 3e3
        }), jt("immediate", ut, {
            state: "openness:closed.status:pending",
            callback: a.useCallback(() => {
                E("SWIPE_RESET")
            }, [E])
        }), _("before-paint", ut, {
            state: "openness:closed.status:flushing-to-preparing-opening",
            callback: a.useCallback(() => {
                E({
                    machine: "openness:closed.status",
                    type: ""
                })
            }, [E])
        }), _("before-paint", ut, {
            state: "openness:closed.status:flushing-to-preparing-open",
            callback: a.useCallback(() => {
                E({
                    machine: "openness:closed.status",
                    type: ""
                })
            }, [E])
        }), _("after-paint", ut, {
            state: "openness:closed.status:preparing-opening",
            callback: a.useCallback(() => {
                E({
                    machine: "staging",
                    type: "OPEN_PREPARED",
                    skipOpening: !1
                })
            }, [E])
        }), _("after-paint", ut, {
            state: "openness:closed.status:preparing-open",
            callback: a.useCallback(() => {
                E({
                    machine: "staging",
                    type: "OPEN_PREPARED",
                    skipOpening: !0
                })
            }, [E])
        }), _("immediate", ut, {
            state: "openness:closed.status:safe-to-unmount",
            callback: a.useCallback(() => {
                ue ? .(!0)
            }, [ue])
        }), jt("immediate", ut, {
            state: "openness:closed.status:safe-to-unmount",
            callback: a.useCallback(() => {
                ue ? .(!1)
            }, [ue])
        }), _("immediate", he, {
            state: "openness:opening",
            callback: wn,
            params: {
                newState: "entering"
            }
        }), _("before-paint", he, {
            state: "openness:opening",
            callback: a.useCallback(() => {
                Fe.current = Ve, Z ? .(Ve), ze({
                    trackToTravelOn: yt,
                    destinationDetent: Ve,
                    behavior: "smooth",
                    animationConfig: nt,
                    travelEndCallback: () => E("NEXT"),
                    runOnTravelStart: !1
                })
            }, [yt, Z, ze, Ve, nt, E])
        }), re(he, {
            state: "openness:opening",
            transition: "NEXT",
            callback: a.useCallback(() => {
                ge("NEXT"), E({
                    machine: "staging",
                    type: "NEXT"
                })
            }, [ge, E])
        }), _("immediate", he, {
            state: "openness:open",
            callback: wn,
            params: {
                newState: "idleInside"
            }
        }), _("immediate", he, {
            state: "openness:open",
            callback: a.useCallback(() => {
                ge({
                    machine: "active",
                    type: "TO_TRUE"
                })
            }, [ge])
        }), _("before-paint", he, {
            state: "openness:open",
            guard: nt.skip,
            callback: a.useCallback(() => {
                Fe.current = Ve, Z ? .(Ve), ze({
                    trackToTravelOn: yt,
                    destinationDetent: Ve
                })
            }, [Ve, Z, ze, yt])
        }), Je("before-paint", he, {
            state: "openness:open",
            callback: a.useCallback(() => {
                if (xt() && ne) {
                    var g;
                    (g = Ee.current) === null || g === void 0 || g.style.setProperty("will-change", "transform"), requestAnimationFrame(() => {
                        var S;
                        return (S = Ee.current) === null || S === void 0 ? void 0 : S.style.removeProperty("will-change", "transform")
                    })
                }
            }, [ne]),
            params: {
                unusedDep: ja
            }
        }), Je("before-paint", he, {
            state: "openness:open",
            guard: !K,
            callback: Lr
        }), _("after-paint", q, {
            state: "staging:open",
            guard: ee === !0 && v === "auto",
            callback: a.useCallback(() => {
                Ve === tt.length ? E({
                    machine: "frontStuck",
                    type: "STUCK_START"
                }) : ne && Ve === 1 && E({
                    machine: "backStuck",
                    type: "STUCK_START"
                })
            }, [E, Ve, tt, ne])
        }), Je("after-paint", he, {
            state: "openness:open",
            guard: !K && !De && !ie,
            callback: _r,
            params: {
                send: E
            }
        }), Je("after-paint", he, {
            state: "openness:open",
            callback: Br
        }), re(he, {
            state: "openness:open",
            transition: "READY_TO_CLOSE",
            callback: a.useCallback(() => ge("READY_TO_GO_OUT"), [ge])
        }), re(he, {
            state: "openness:open",
            transition: "ACTUALLY_CLOSE",
            callback: a.useCallback(() => {
                Fe.current = null, Z ? .(0), y ? .(), ge("GO_OUT")
            }, [Z, y, ge])
        }), re(he, {
            state: "openness:open",
            transition: "SWIPED_OUT",
            callback: a.useCallback(() => {
                var g;
                (g = Ee.current) === null || g === void 0 || g.style.setProperty("scroll-snap-type", "none", "important"), Fe.current = null, Z ? .(0), ge("GO_OUT")
            }, [Z, ge])
        }), jt("immediate", he, {
            state: "openness:open",
            callback: a.useCallback(() => {
                E("SWIPE_END")
            }, [E])
        });
        let pa = dt(F, "backStuck"),
            Wn = a.useRef(!1);
        re(pa, {
            state: "backStuck:false",
            transition: "STUCK_START",
            callback: a.useCallback(() => Wn.current = !0, [])
        }), re(pa, {
            state: "backStuck:true",
            transition: "STUCK_END",
            callback: a.useCallback(() => Wn.current = !1, [])
        }), re(pa, {
            state: "backStuck:false",
            transition: "STUCK_START",
            guard: ee === !0 && v === "auto",
            callback: a.useCallback(() => {
                F.silent.matches("scrollContainerTouch:ended") && qt("back")
            }, [F.silent, qt])
        });
        let fa = dt(F, "frontStuck"),
            An = a.useRef(!1);
        re(fa, {
            state: "frontStuck:false",
            transition: "STUCK_START",
            callback: a.useCallback(() => An.current = !0, [])
        }), re(fa, {
            state: "frontStuck:true",
            transition: "STUCK_END",
            callback: a.useCallback(() => An.current = !1, [])
        }), re(fa, {
            state: "frontStuck:false",
            transition: "STUCK_START",
            guard: ee === !0 && v === "auto",
            callback: a.useCallback(() => {
                F.silent.matches("openness:open") && F.silent.matches("scrollContainerTouch:ended") && qt("front")
            }, [F.silent, qt])
        }), _("immediate", F, {
            state: "scrollContainerTouch:ended",
            guard: ee === !0 && v === "auto",
            callback: a.useCallback(() => {
                Fn.current && setTimeout(() => {
                    requestAnimationFrame(() => {
                        F.silent.matches("openness:open") && (F.silent.matches("backStuck:true") ? qt("back") : F.silent.matches("frontStuck:true") && qt("front"))
                    })
                }, 80)
            }, [F.silent, qt])
        });
        let pn = dt(F, "openness:open.scroll"),
            ga = a.useRef(!1);
        _("immediate", pn, {
            state: "openness:open.scroll:ongoing",
            callback: a.useCallback(() => ga.current = !0, [])
        }), jt("immediate", pn, {
            state: "openness:open.scroll:ongoing",
            callback: a.useCallback(() => ga.current = !1, [])
        }), _("immediate", pn, {
            state: "openness:open.scroll:ongoing",
            callback: a.useCallback(() => {
                Fn.current = !0
            }, [])
        }), Je({
            start: "immediate",
            update: "before-paint"
        }, pn, {
            state: "openness:open.scroll:ongoing",
            callback: Mr
        });
        let ha = a.useRef(() => {});
        _("after-paint", pn, {
            state: "openness:open.scroll:ended",
            callback: a.useCallback(() => {
                E({
                    machine: "openness:open.scroll:ended.afterPaintEffectsRun",
                    type: "OCCURRED"
                }), ha.current(), ha.current = () => {}
            }, [E])
        }), jt("immediate", pn, {
            state: "openness:open.scroll:ended",
            callback: a.useCallback(() => {
                E({
                    machine: "openness:open.scroll:ended.afterPaintEffectsRun",
                    type: "RESET"
                })
            }, [E])
        });
        let va = a.useRef(!1);
        _("immediate", F, {
            state: "openness:open.move:ongoing",
            callback: a.useCallback(() => {
                va.current = !0, da.current = Ln
            }, [Ln])
        }), jt("immediate", F, {
            state: "openness:open.move:ongoing",
            callback: a.useCallback(() => {
                va.current = !1, da.current = () => {}
            }, [])
        });
        let ka = a.useRef(!1);
        _("immediate", F, {
            state: "openness:open.swipe:ongoing",
            callback: a.useCallback(() => ka.current = !0, [])
        }), jt("immediate", F, {
            state: "openness:open.swipe:ongoing",
            callback: a.useCallback(() => ka.current = !1, [])
        }), _("immediate", F, {
            state: "openness:open.swipe:ongoing",
            callback: a.useCallback(() => y ? .(), [y])
        }), _("immediate", F, {
            state: "openness:open.swipe:ongoing",
            callback: wn,
            params: {
                newState: "stepping"
            }
        }), _("immediate", F, {
            state: "openness:open.swipe:ended",
            callback: a.useCallback(() => Cn(), [Cn])
        }), _("immediate", F, {
            state: "openness:open.swipe:ended",
            guard: typeof m == "function",
            callback: a.useCallback(() => {
                F.silent.matches("openness:open") && m("idleInside")
            }, [F.silent, m])
        });
        let el = a.useCallback(() => {
            !dn.matches("position:front") || me.current[0] === 0 && me.current[1] === 0 || ne && me.current[0] !== me.current[1] ? Te === !1 && fe ? .(!0) : E("ACTUALLY_CLOSE")
        }, [dn, E, Te, fe, ne]);
        re(F, {
            state: "openness:open.evaluateCloseMessage:true",
            transition: "CLOSE",
            callback: el
        }), re(F, {
            state: "openness:open.evaluateCloseMessage:false",
            transition: "CLOSE",
            callback: el
        }), re(F, {
            state: "openness:open.evaluateStepMessage:true",
            transition: "STEP",
            callback: Ga
        }), re(F, {
            state: "openness:open.evaluateStepMessage:false",
            transition: "STEP",
            callback: Ga
        }), _("immediate", he, {
            state: "openness:closing",
            callback: wn,
            params: {
                newState: "exiting"
            }
        }), _("before-paint", he, {
            state: "openness:closing",
            callback: a.useCallback(() => {
                Fe.current = 0, Z ? .(0), ze({
                    trackToTravelOn: R.track,
                    destinationDetent: 0,
                    behavior: "smooth",
                    animationConfig: R,
                    travelEndCallback: () => E("NEXT")
                })
            }, [Z, ze, R, E])
        }), re(he, {
            state: "openness:closing",
            transition: "NEXT",
            callback: a.useCallback(() => {
                ge("NEXT"), E({
                    machine: "staging",
                    type: "NEXT"
                })
            }, [ge, E])
        });
        let jr = a.useCallback(() => E({
            machine: "skipOpening",
            type: nt.skip ? "TO_TRUE" : "TO_FALSE"
        }), [E, nt.skip]);
        Je("after-paint", F, {
            state: "",
            callback: jr
        });
        let Ur = a.useCallback(() => E({
            machine: "skipClosing",
            type: R.skip ? "TO_TRUE" : "TO_FALSE"
        }), [E, R.skip]);
        Je("after-paint", F, {
            state: "",
            callback: Ur
        }), a.useEffect(() => {
            Te !== void 0 && E(Te ? "OPEN" : "CLOSE")
        }, [Te, E]);
        let Xr = Rn(() => {
                Xa(), an ? .(A), H.removeAllOutletPersistedStylesFromSheet(A)
            }),
            tl = a.useRef(!0),
            Yr = Rn(() => {
                Te && fe ? .(!1)
            });
        a.useEffect(() => () => {
            !tl.current && (Yr(), Tt(null, {
                newState: "none"
            }), Xr(), oe(!1), lt.silent.matches("longRunning:true") && Qe ? .(g => g - 1))
        }, []), a.useEffect(() => () => tl.current = !1), a.useEffect(() => {
            Pe !== void 0 && me.current[0] !== Pe && me.current[1] !== Pe && Fe.current !== Pe && E({
                type: "STEP",
                activeDetent: Pe
            })
        }, [Pe, E]), a.useEffect(() => {
            let g = () => {
                var S;
                return (S = Ee.current) === null || S === void 0 ? void 0 : S.scrollTo(0, 0)
            };
            return window.addEventListener("unload", g), () => window.removeEventListener("unload", g)
        }, []);
        let nl = Rn((g, S) => {
                ot.current && !he.matches("openness:closed") && Ct(g, S)
            }),
            al = Rn(Ha);
        a.useEffect(() => () => {
            nl(0, {
                start: 0,
                end: 0
            }), ot.current && al(), Yl(null)
        }, [lt.silent, Qe, nl, al]);
        let jn = We("Sheet", {
                staging: q.getValues()[0],
                openness: he.getValues()[0],
                opennessClosedStatus: ut.getValues()[0],
                position: dn.getValues()[0],
                positionCoveredStatus: _t.getValues()[0],
                placement: Ce,
                track: U,
                swipeDisabled: K,
                swipeOutDisabledWithDetent: ie,
                swipeOvershootDisabled: ee,
                swipeTrap: En,
                scrollContainerShouldBePassThrough: Kt
            }),
            Un = a.useMemo(() => !ut.matches(["openness:closed.status:flushing-to-preparing-open", "openness:closed.status:flushing-to-preparing-opening", "openness:closed.status:safe-to-unmount"]), [ut]),
            Hr = a.useMemo(() => he.matches("openness:closed") && Un, [Un, he]),
            ll = a.useMemo(() => q.matches(["staging:opening", "staging:open"]), [q]),
            zr = a.useMemo(() => Un || ll, [Un, ll]),
            Gr = a.useMemo(() => V && (dn.matches(["position:front", "position:covered"]) || Ae !== "none"), [V, dn, Ae]);
        return I.jsx(Nn, {
            genericContext: Ut,
            customContext: Ne,
            value: $e,
            children: I.jsx(mt.Provider, {
                value: {
                    sheetContext: Ge,
                    titleId: ye,
                    descriptionId: Ie,
                    styleAttributes: jn,
                    backdropRef: zt,
                    scrollContainerRef: Ee,
                    frontSpacerRef: rn,
                    contentWrapperRef: St,
                    contentRef: Dt,
                    backSpacerRef: yn,
                    detentMarkersRefs: sn,
                    leftEdgeRef: Ht,
                    setBackdropSwipeable: Gt,
                    setBleedingBackgroundPresent: at,
                    detents: tt,
                    longRunningState: lt,
                    staging: Ae,
                    layerCovered: bt,
                    placement: Ce,
                    track: U,
                    travelAxis: ht,
                    nativeEdgeSwipePrevention: z,
                    bleedingBackgroundPresent: $t,
                    setBackdropTravelHandler: wr,
                    ancestorPrimarySwipeTrapActiveOnYAxis: En === "vertical" || En === "both",
                    scrollContainerTouchStartHandler: Vr,
                    scrollContainerTouchEndHandler: Wr,
                    getContentCoordinatesWhenRestingOnLastDetent: xr,
                    getOffsetFromCurrentToNextDetent: Fr
                },
                children: zr && I.jsxs("div", {
                    id: A,
                    ...jn("view", ["track", "staging", "openness", "opennessClosedStatus", "scrollContainerShouldBePassThrough"], {
                        className: s,
                        dataSilk: [o, "0ab", j && "0ah", gt && "0aj", Hr && "0ak", "0al"]
                    }),
                    ref: ft,
                    "aria-labelledby": ye,
                    "aria-describedby": Ie,
                    ...Q,
                    role: le,
                    tabIndex: -1,
                    children: [I.jsx(Ot.Root, { ...jn("primaryScrollTrapRoot", ["track", "scrollContainerShouldBePassThrough"]),
                        active: En !== "none",
                        axis: En,
                        children: I.jsx(Ot.Stabiliser, {
                            children: r
                        })
                    }), I.jsx(Ot.Root, { ...jn("secondaryScrollTrapRoot", ["scrollContainerShouldBePassThrough"]),
                        automaticallyDisabledForOptimisation: !1,
                        preventBodyScroll: Gr
                    })]
                })
            })
        })
    });
er.displayName = "Sheet.Anonymous";
class bn extends se.Component {
    static getDerivedStateFromError(t) {
        return {
            hasError: !0
        }
    }
    componentDidCatch(t) {
        console.error(t)
    }
    render() {
        return this.state.hasError ? I.jsx("h1", {
            children: "Something went wrong."
        }) : this.props.children
    }
    constructor(t) {
        super(t), this.state = {
            hasError: !1
        }
    }
}
let tr = se.forwardRef((e, t) => {
    let {
        asChild: n,
        children: l,
        className: i,
        "data-silk": r,
        ...s
    } = e, o = n ? je : "span", u = We("VisuallyHidden", {});
    return I.jsx(o, { ...u("root", [], {
            className: i,
            dataSilk: [r]
        }),
        ...s,
        ref: t,
        children: l
    })
});
tr.displayName = "VisuallyHidden.Root";
let Gs = {
        Root: tr
    },
    sa = se.createContext(null);
sa.displayName = "SheetStack.GenericContext";
let In = [],
    $s = (e, t) => {
        let n = () => {
            let [l, i] = (function(o) {
                let u = 0,
                    c = 0;
                for (; o;) u += o.offsetLeft, c += o.offsetTop, o = o.offsetParent;
                return [u, c]
            })(e), r = {
                top: i + scrollY,
                bottom: Math.max(e.offsetHeight - (i + scrollY + innerHeight), 0),
                left: l + scrollX,
                right: Math.max(e.offsetWidth - (l + scrollX + innerWidth), 0),
                height: innerHeight,
                width: innerWidth
            }, s = r.top <= 0 && r.bottom <= 0 && r.left <= 0 && r.right <= 0 ? null : r;
            t(s)
        };
        In.push({
            element: e,
            callback: n
        }), n(), In.length === 1 && (Pn = (function(l, i) {
            let r;
            return function() {
                clearTimeout(r), r = window.setTimeout(() => {
                    clearTimeout(r), l()
                }, 100)
            }
        })(() => {
            In.forEach(l => l.callback())
        }), window.addEventListener("scroll", Pn), window.addEventListener("resize", Pn))
    },
    Ks = e => {
        (In = In.filter(t => t.element !== e)).length || (window.removeEventListener("scroll", Pn), window.removeEventListener("resize", Pn))
    },
    _a = (e, t) => {
        let n = a.useId(),
            l = a.useRef(null),
            i = Ze(l, t),
            {
                sheetId: r,
                stackId: s,
                sheetsCount: o,
                travelAnimation: u,
                stackingAnimation: c,
                style: p
            } = e,
            {
                sheetId: m,
                longRunning: d
            } = ia(r),
            [f, h] = a.useState(null),
            {
                willChangesValuesString: k,
                outletTransformedOnAnimation: v,
                nonAnimatedTravelStyles: b,
                nonAnimatedStackingStyles: y,
                clippedToViewport: w
            } = a.useMemo(() => {
                let P = [],
                    M = {},
                    j = {},
                    D = !1,
                    N = !1;
                return [u, c].forEach((B, te) => {
                    if (B) {
                        let J = B.hasOwnProperty("properties") ? B.properties : B;
                        Object.entries(J).forEach(([$, ce]) => {
                            !ce || ($ === "clipBoundary" && (N = !0), typeof ce == "string" && (te === 0 ? M[$] = ce : j[$] = ce), Ul.includes($) || $ === "transform" ? P.includes("transform") || (P.push("transform"), D = !0) : $ !== "opacity" || P.includes("opacity") || P.push("opacity"))
                        })
                    }
                }), {
                    willChangesValuesString: P.join(", "),
                    outletTransformedOnAnimation: D,
                    nonAnimatedTravelStyles: M,
                    nonAnimatedStackingStyles: j,
                    clippedToViewport: N
                }
            }, [c, u]),
            {
                modifiedTravelAnimation: x,
                modifiedNonAnimatedTravelStyles: V,
                modifiedStackingAnimation: z,
                modifiedNonAnimatedStackingStyles: O
            } = a.useMemo(() => {
                let P;
                if (f) {
                    let {
                        top: te,
                        bottom: J,
                        left: $,
                        right: ce
                    } = f;
                    P = `${te-.1}px ${ce}px ${J}px ${$}px`
                }
                let M = (te, J) => {
                        let $, ce, Ue;
                        if (!te) return [];
                        let {
                            top: Q,
                            left: Ge,
                            height: $e,
                            width: it
                        } = f || {}, Re = te.hasOwnProperty("properties") ? te.properties : te, Ne = Re.clipBoundary, le = Re.clipBorderRadius, Te = Re.clipTransformOrigin;
                        if (Ne && (Te || (Te = "50% 50% 0"), Ue = Te.split(" ").map(Se => Se === "top" || Se === "left" ? "0%" : Se === "bottom" || Se === "right" ? "100%" : Se).map((Se, Pe) => {
                                if (Pe === 0) {
                                    let Z = Se;
                                    return Se.includes("%") ? Z = Se.replace(/\b\d+%/, A => parseFloat(A) / 100 * it + "px") : Se === "0" && (Z = "0px"), "calc(" + Ge + "px + " + Z + ")"
                                }
                                if (Pe === 1) {
                                    let Z = Se;
                                    return Se.includes("%") ? Z = Se.replace(/\b\d+%/, A => parseFloat(A) / 100 * $e + "px") : Se === "0" && (Z = "0px"), "calc(" + Q + "px + " + Z + ")"
                                }
                            }).join(" ")), Ne)
                            if (Ne === "layout-viewport")
                                if (P) {
                                    if (typeof le == "string") $ = `inset(${P} round ${le})`;
                                    else if (Array.isArray(le)) {
                                        let ue = `inset(${P} round `;
                                        $ = ({
                                            tween: oe
                                        }) => ue + oe(...le) + ")"
                                    } else if (typeof le == "function") {
                                        let ue = `inset(${P} round `;
                                        $ = oe => ue + le(oe) + ")"
                                    } else $ = `inset(${P})`;
                                    ce = "0.001px"
                                } else ce = le ? ? null;
                        else if (typeof Ne == "function")
                            if (P) {
                                if (typeof le == "string") $ = ue => Ne(ue) !== "none" ? `inset(${P} round ${le})` : "none";
                                else if (Array.isArray(le)) {
                                    let ue = `inset(${P} round `;
                                    $ = oe => Ne(oe) !== "none" ? ue + oe.tween(...le) + ")" : "none"
                                } else if (typeof le == "function") {
                                    let ue = `inset(${P} round `;
                                    $ = oe => Ne(oe) !== "none" ? ue + le(oe) + ")" : "none"
                                } else $ = ue => Ne(ue) !== "none" ? `inset(${P})` : "none";
                                ce = "0.001px"
                            } else le && (ce = ue => {
                                if (Ne(ue) === "layout-viewport") return le
                            });
                        else Ne === "none" && ($ = "none", ce = le ? ? null);
                        else {
                            let ue = { ...Re
                                },
                                oe = { ...J
                                };
                            return delete ue.clipBoundary, delete ue.clipBorderRadius, delete ue.clipTransformOrigin, delete oe.clipBoundary, delete oe.clipBorderRadius, delete oe.clipTransformOrigin, [ue, oe]
                        }
                        let fe = { ...Re
                            },
                            Le = { ...J
                            };
                        return delete fe.clipBoundary, delete fe.clipBorderRadius, delete fe.clipTransformOrigin, delete Le.clipBoundary, delete Le.clipBorderRadius, delete Le.clipTransformOrigin, typeof $ == "string" ? Le.clipPath = $ : fe.clipPath = $, typeof ce == "string" ? Le.borderRadius = ce : fe.borderRadius = ce, typeof Ue == "string" && (Le.transformOrigin = Ue), [fe, Le]
                    },
                    [j, D] = M(u, b),
                    [N, B] = M(c, y);
                return {
                    modifiedTravelAnimation: j,
                    modifiedNonAnimatedTravelStyles: D,
                    modifiedStackingAnimation: N,
                    modifiedNonAnimatedStackingStyles: B
                }
            }, [f, y, b, c, u]);
        Oe(() => {
            let P = l.current,
                M = n && w && (!s && d || s && o >= 1);
            if (M) return $s(P, h), () => {
                M && Ks(P)
            }
        }, [n, w, d, s, o]);
        let W = a.useMemo(() => s ? { ...p,
            ...o >= 1 ? O : {},
            willChange: o >= 1 ? k + (p ? .willChange ? ", " + p ? .willChange : "") : p ? .willChange
        } : { ...p,
            ...d ? V : {},
            ...o >= 1 ? O : {},
            willChange: d ? k + (p ? .willChange ? ", " + p ? .willChange : "") : p ? .willChange
        }, [s, p, V, O, d, o, k]);
        return Oe(() => {
            let P, M = H.findActualFixedComponentsInsideOutlet(l.current);
            if (M.length) return v && (P = (j => {
                let D = () => {
                        M.forEach(B => {
                            if (!B.element || B.compensated) return;
                            let te = 0,
                                J = 0,
                                $ = B.element.style.transform,
                                ce = window.getComputedStyle(B.element),
                                Ue = ce.getPropertyValue("--silk-fixed-side"),
                                Q = ce.getPropertyValue("transform");
                            H.updateFixedComponent({
                                id: B.id,
                                initialInlineCSSTransform: $,
                                compensated: !0
                            }), te = Ue.includes("bottom") ? -1 * (l.current.offsetHeight - (scrollY + window.innerHeight)) : scrollY, J = Ue.includes("right") ? -1 * (l.current.offsetWidth - (scrollX + window.innerWidth)) : scrollX, (Math.abs(te) !== 0 || Math.abs(J) !== 0) && B.element.style.setProperty("transform", (Q !== "none" ? Q + " " : "") + "translateX(" + J + "px) translateY(" + te + "px)")
                        })
                    },
                    N = () => {
                        window.removeEventListener("resize", D), window.removeEventListener("scroll", D), M.forEach(B => {
                            B.element && B.compensated && (B.initialInlineCSSTransform ? (B.element.style.setProperty("transform", B.initialInlineCSSTransform), H.updateFixedComponent({
                                id: B.id,
                                initialInlineCSSTransform: void 0,
                                compensated: !1
                            })) : (B.element.style.removeProperty("transform"), H.updateFixedComponent({
                                id: B.id,
                                compensated: !1
                            })))
                        })
                    };
                return j ? (D(), window.addEventListener("resize", D), window.addEventListener("scroll", D)) : N(), N
            })(s ? o > 0 : d)), P
        }, [d, n, v, o, s]), Oe(() => (H.addOutletToSheet(m, n), () => H.removeOutletFromSheet(m, n)), [n, m]), Oe(() => {
            let P = l.current;
            return x && H.addAnimationToSheetOrStack({
                sheetId: m,
                type: "travel",
                element: P,
                config: x
            }), z && H.addAnimationToSheetOrStack({
                sheetId: s ? null : m,
                stackId: s,
                type: "stacking",
                element: P,
                config: z
            }), () => {
                x && H.removeAnimationFromSheetOrStack({
                    sheetId: m,
                    type: "travel",
                    element: P
                }), z && H.removeAnimationFromSheetOrStack({
                    sheetId: s ? null : m,
                    stackId: s,
                    type: "stacking",
                    element: P
                })
            }
        }, [m, s, x, z]), {
            ref: l,
            outletId: n,
            styleValue: W,
            composedRef: i
        }
    },
    ia = e => a.useContext(e ? ? Ut) || {};
bn.displayName = "Sheet.ErrorBoundary", je.displayName = "Sheet.Slot.Root";
let Xt = se.forwardRef((e, t) => {
    let {
        asChild: n,
        forComponent: l,
        travelAnimation: i,
        stackingAnimation: r,
        style: s,
        className: o,
        ...u
    } = e, {
        staging: c,
        StackContext: p
    } = ia(l), m = p ? ? se.createContext(null), {
        sheetsCount: d
    } = a.useContext(m) || {}, {
        styleValue: f,
        composedRef: h
    } = _a({
        sheetId: l,
        sheetsCount: d,
        travelAnimation: i,
        stackingAnimation: r,
        style: s
    }, t), k = a.useMemo(() => c !== "none", [c]), v = n ? je : "div", b = We("Sheet", {});
    return I.jsx(v, {
        style: f,
        ...b("outlet", [], {
            className: o,
            dataSilk: [k && "0aj"]
        }),
        ...u,
        ref: h
    })
});
Xt.displayName = "Sheet.Outlet";
let Fa = se.forwardRef(({
    asChild: e,
    ...t
}, n) => {
    let l = e ? je : "button",
        {
            forComponent: i,
            className: r,
            "data-silk": s,
            onPress: o,
            onClick: u,
            children: c,
            action: p = "present",
            travelAnimation: m,
            stackingAnimation: d,
            ...f
        } = t,
        {
            sheetRole: h,
            sheetId: k,
            open: v,
            onOpenChange: b,
            elementFocusedLastBeforeShowing: y
        } = ia(i),
        w = H.findSheet(k),
        x = a.useRef(null),
        V = Ze(x, n),
        z = a.useMemo(() => (h === "dialog" || h === "alertdialog") && p === "present" ? "dialog" : void 0, [p, h]),
        O = a.useMemo(() => p === "present" || p === "dismiss" ? v : void 0, [p, v]),
        W = We("Sheet", {});
    return I.jsx(Xt, {
        forComponent: i,
        asChild: !0,
        travelAnimation: m,
        stackingAnimation: d,
        children: I.jsx(l, { ...W("trigger", [], {
                className: r,
                dataSilk: [s]
            }),
            onClick: P => {
                var M, j;
                let {
                    forceFocus: D,
                    runAction: N
                } = kt({
                    nativeEvent: P,
                    defaultBehavior: {
                        forceFocus: !0,
                        runAction: !0
                    },
                    handler: o
                });
                D && ((M = x.current) === null || M === void 0 || M.focus({
                    preventScroll: !0
                })), N && (p === "present" ? (y.current = x.current, b(!0)) : p === "dismiss" ? b(!1) : (p === "step" || p.type === "step") && (w == null || (j = w.sendToOpennessMachine) === null || j === void 0 || j.call(w, {
                    type: "STEP",
                    direction: p === "step" ? "up" : p.direction,
                    detent: p === "step" ? null : p.detent
                }))), u ? .(P)
            },
            "aria-haspopup": z,
            "aria-controls": k,
            "aria-expanded": O,
            ref: V,
            ...f,
            children: c
        })
    })
});
Fa.displayName = "Sheet.Trigger";
let nr = se.forwardRef((e, t) => {
    let {
        children: n,
        className: l,
        action: i = "step",
        ...r
    } = e, {
        detents: s
    } = a.useContext(mt) || {}, o = s.length === 1 && i !== "dismiss", u = We("Sheet", {});
    return I.jsx(Fa, { ...u("handle", [], {
            className: l
        }),
        action: i,
        disabled: o,
        ...r,
        ref: t,
        children: I.jsx(Gs.Root, {
            children: n ? ? (i === "dismiss" ? "Dismiss" : "Cycle")
        })
    })
});
nr.displayName = "Sheet.Handle";
let ar = e => {
    var t;
    let [n, l] = a.useState(!1);
    return a.useEffect(() => (l(!0), () => l(!1)), []), n ? Rl.createPortal(e.children, (t = e.container) !== null && t !== void 0 ? t : document.body) : null
};
ar.displayName = "Sheet.Portal";
let qs = ({
        rootRef: e
    }) => (a.useEffect(() => {
        let t = e.current;
        if (!t) return;
        getComputedStyle(t).getPropertyValue("--silk-aY").trim() !== "1" && console.warn("The CSS styles for Silk are not found. Please refer to the documentation on how to import them.")
    }, [e]), null),
    lr = se.forwardRef((e, t) => {
        let {
            className: n,
            "data-silk": l,
            license: i,
            sheetRole: r,
            componentId: s,
            forComponent: o,
            defaultPresented: u,
            presented: c,
            onPresentedChange: p,
            defaultActiveDetent: m,
            activeDetent: d,
            onActiveDetentChange: f,
            onSafeToUnmountChange: h,
            ...k
        } = e, v = a.useRef(null), b = Ze(v, t), y = u != null && u, [w, x] = a.useState(y), V = c !== void 0 && p !== void 0, z = a.useMemo(() => V ? c : w, [V, c, w]), O = a.useMemo(() => V ? p : x, [V, p, x]), W = a.useRef(null), [P, M] = a.useState(!y), j = a.useCallback(Q => {
            h ? .(Q), M(Q)
        }, [h]), [D, N] = a.useState(z), [B, te] = a.useState("none"), J = o === "closest" ? sa : o, $ = nn(), ce = {
            license: i,
            StackContext: J,
            CustomSheetContext: s,
            sheetId: $,
            sheetRole: r,
            open: z,
            onOpenChange: O,
            onSafeToUnmountChange: j,
            defaultActiveDetent: m,
            activeDetent: d,
            onActiveDetentChange: f,
            safeToUnmount: P,
            longRunning: D,
            setLongRunning: N,
            staging: B,
            setStaging: te,
            elementFocusedLastBeforeShowing: W,
            ...k
        }, Ue = We("Sheet");
        return I.jsxs(bn, {
            children: [I.jsx(qs, {
                rootRef: v
            }), I.jsx(Nn, {
                genericContext: Ut,
                customContext: s,
                value: ce,
                children: I.jsx(Xt, { ...Ue("root", [], {
                        className: n,
                        dataSilk: [l]
                    }),
                    ref: b,
                    ...k
                })
            })]
        })
    });
lr.displayName = "Sheet.Root";
let rr = se.forwardRef((e, t) => {
    let {
        forComponent: n
    } = e, {
        open: l,
        safeToUnmount: i
    } = ia(n);
    return (l || !i) && I.jsx(er, { ...e,
        ref: t
    })
});
rr.displayName = "Sheet.View";
let sr = se.forwardRef(({
    asChild: e,
    swipeable: t = !0,
    ...n
}, l) => {
    let {
        longRunningState: i,
        backdropRef: r,
        styleAttributes: s,
        setBackdropSwipeable: o,
        setBackdropTravelHandler: u
    } = a.useContext(mt) || {}, {
        className: c,
        "data-silk": p,
        children: m,
        travelAnimation: d,
        stackingAnimation: f,
        themeColorDimming: h = !1,
        ...k
    } = n, v = Ze(r, l);
    a.useEffect(() => (o(t), () => {
        o(!1)
    }), [o, t]);
    let b = a.useMemo(() => ({
            opacity: ({
                progress: z
            }) => Math.min(.33 * z, .33),
            ...d
        }), [d]),
        [y, w] = a.useState(b),
        x = nn(),
        V = a.useRef(0);
    return Oe(() => {
        let z = !1,
            O = () => {
                z && H.removeThemeColorDimmingOverlay(x)
            };
        if (i.matches("longRunning:true")) {
            let W;
            if (!(z = !!(xt() && !_l() && h === "auto" && b.opacity && H.getAndStoreUnderlyingThemeColorAsRGBArray()))) return;
            let {
                opacity: P,
                ...M
            } = b;
            if (w({
                    opacity: "ignore",
                    ...M
                }), Array.isArray(P)) {
                let [j, D] = P;
                W = ({
                    progress: N
                }) => j + (D - j) * N
            } else typeof P == "function" && (W = P, w({
                opacity: "ignore",
                ...M
            }));
            if (W && r && u) {
                let j = window.getComputedStyle(r.current).backgroundColor,
                    D = H.updateThemeColorDimmingOverlay({
                        abortRemoval: !0,
                        dimmingOverlayId: x,
                        color: j,
                        alpha: V.current
                    }),
                    N = B => {
                        var te;
                        let J = W(B);
                        H.updateThemeColorDimmingOverlayAlphaValue(D, J), (te = r.current) === null || te === void 0 || te.style.setProperty("opacity", J), V.current = J
                    };
                u(() => N)
            }
        }
        return i.matches("longRunning:false") && O(), () => {
            O()
        }
    }, [i, x, r, u, h, d, b]), I.jsx(Xt, { ...s("backdrop", ["scrollContainerShouldBePassThrough"], {
            className: c,
            dataSilk: [p]
        }),
        travelAnimation: y,
        stackingAnimation: f,
        ...k,
        ref: v,
        asChild: e,
        children: m
    })
});
sr.displayName = "Sheet.Backdrop";
let ir = se.forwardRef((e, t) => {
    var n;
    let {
        asChild: l,
        children: i,
        className: r,
        "data-silk": s,
        travelAnimation: o,
        stackingAnimation: u,
        style: c,
        ...p
    } = e, m = l ? je : "div", {
        StackContext: d
    } = a.useContext(Ut) || {}, f = d ? ? se.createContext(null), {
        sheetsCount: h
    } = a.useContext(f) || {}, {
        styleValue: k,
        composedRef: v
    } = _a({
        sheetId: Ut,
        sheetsCount: h,
        travelAnimation: o,
        stackingAnimation: u,
        style: c
    }, t), {
        scrollContainerRef: b,
        frontSpacerRef: y,
        contentWrapperRef: w,
        contentRef: x,
        backSpacerRef: V,
        detentMarkersRefs: z,
        leftEdgeRef: O,
        nativeEdgeSwipePrevention: W,
        scrollContainerTouchStartHandler: P,
        scrollContainerTouchEndHandler: M,
        styleAttributes: j,
        detents: D,
        bleedingBackgroundPresent: N
    } = a.useContext(mt) || {}, B = Ze(x, v);
    return I.jsxs("div", { ...j("scrollContainer", ["track", "swipeDisabled", "swipeOvershootDisabled", "staging", "positionCoveredStatus", "scrollContainerShouldBePassThrough", "swipeTrap"], {
            dataSilk: ["0ac"]
        }),
        ref: b,
        onTouchStart: P,
        onTouchEnd: M,
        children: [I.jsx("div", { ...j("frontSpacer", ["track"]),
            ref: y
        }), I.jsxs("div", { ...j("contentWrapper", ["placement", "track", "swipeOvershootDisabled", "swipeOutDisabledWithDetent", "staging", "position"]),
            ref: w,
            children: [I.jsx(m, { ...j("content", ["track", "placement", "scrollContainerShouldBePassThrough"], {
                    className: r,
                    dataSilk: [s, N && "0af"]
                }),
                style: k,
                ...p,
                ref: B,
                children: i
            }), W && I.jsx("div", { ...j("leftEdge", ["track"]),
                ref: O
            })]
        }), I.jsx("div", { ...j("backSpacer", ["track"]),
            ref: V,
            children: D.map((te, J) => I.jsx("div", {
                ref: $ => {
                    z.current.length > D.length && (z.current = z.current.slice(0, D.length)), z.current[J] = $
                },
                ...j("detentMarker", ["track", "swipeOutDisabledWithDetent"]),
                style: {
                    "--silk-aA": (n = D[J - 1]) !== null && n !== void 0 ? n : "0px",
                    "--silk-aB": te,
                    "--silk-aC": J
                }
            }, J))
        })]
    })
});
ir.displayName = "Sheet.Content";
let or = se.forwardRef(({
    asChild: e,
    ...t
}, n) => {
    let {
        className: l,
        "data-silk": i,
        ...r
    } = t, {
        staging: s,
        placement: o,
        track: u,
        setBleedingBackgroundPresent: c
    } = a.useContext(mt) || {};
    a.useEffect(() => (c(!0), () => {
        c(!1)
    }), [c]);
    let p = u === "horizontal" || u === "vertical",
        m = We("Sheet", {
            staging: s,
            placement: o,
            track: u,
            bleedDisabled: p
        });
    return I.jsx(Xt, {
        asChild: e,
        ...m("bleedingBackground", ["staging", "placement", "track", "bleedDisabled"], {
            className: l,
            dataSilk: [i]
        }),
        ...r,
        ref: n
    })
});
or.displayName = "Sheet.BleedingBackground";
let ur = se.forwardRef((e, t) => {
    let {
        className: n,
        "data-silk": l,
        ...i
    } = e, {
        travelAxis: r
    } = a.useContext(mt) || {}, s = a.useMemo(() => r === "vertical" ? "horizontal" : "vertical", [r]), [o, u] = a.useState(!1);
    a.useEffect(() => u(xt()), []);
    let c = We("SpecialWrapper");
    return I.jsx(Ot.Root, { ...c("root", [], {
            className: n,
            dataSilk: [l]
        }),
        active: o,
        axis: s,
        ...i,
        ref: t
    })
});
ur.displayName = "Sheet.SpecialWrapper.Root";
let cr = se.forwardRef((e, t) => I.jsx(Ot.Stabiliser, { ...e,
    ref: t
}));
cr.displayName = "Sheet.SpecialWrapper.Content";
let dr = se.forwardRef((e, t) => {
    let {
        asChild: n,
        travelAnimation: l,
        stackingAnimation: i,
        ...r
    } = e, s = n ? je : "h2", {
        titleId: o
    } = a.useContext(mt);
    return I.jsx(Xt, {
        asChild: !0,
        travelAnimation: l,
        stackingAnimation: i,
        children: I.jsx(s, {
            id: o,
            ref: t,
            ...r
        })
    })
});
dr.displayName = "Sheet.Title";
let mr = se.forwardRef((e, t) => {
    let {
        asChild: n,
        travelAnimation: l,
        stackingAnimation: i,
        ...r
    } = e, {
        descriptionId: s
    } = a.useContext(mt), o = n ? je : "p";
    return I.jsx(Xt, {
        asChild: !0,
        travelAnimation: l,
        stackingAnimation: i,
        children: I.jsx(o, {
            id: s,
            ...r,
            ref: t
        })
    })
});
mr.displayName = "Sheet.Description";
let ri = {
    Root: lr,
    Trigger: Fa,
    View: rr,
    Backdrop: sr,
    Content: ir,
    BleedingBackground: or,
    Handle: nr,
    SpecialWrapper: {
        Root: ur,
        Content: cr
    },
    Outlet: Xt,
    Portal: ar,
    Title: dr,
    Description: mr
};
bn.displayName = "SheetStack.ErrorBoundary";
let pr = se.forwardRef((e, t) => {
    let {
        componentId: n,
        className: l,
        "data-silk": i,
        asChild: r,
        ...s
    } = e, o = a.useId();
    Oe(() => (H.addSheetStack({
        id: o
    }), () => H.removeSheetStack(o)), [o]);
    let [u, c] = a.useState([]), p = a.useCallback(O => {
        c(W => {
            let P, M = W.findIndex(j => j.sheetId === O.sheetId);
            return M !== -1 ? (P = [...W])[M] = O : P = [...W, O], P
        })
    }, []), m = a.useCallback(O => {
        c(W => W.filter(P => P.sheetId !== O))
    }, []), d = a.useCallback(O => {
        let W = u.findIndex(P => P.sheetId === O);
        return W === -1 ? u[u.length - 1] : u[W - 1]
    }, [u]), [f, h] = a.useState(0);
    Oe(() => {
        f === 0 && H.removeAllOutletPersistedStylesFromStack(o)
    }, [f, o]);
    let [k, v] = a.useState([]), b = a.useCallback(O => {
        v(W => {
            let P = W.findIndex(M => M.sheetId === O.sheetId);
            if (P === -1) return [...W, O]; {
                let M = [...W];
                return M[P] = O, M
            }
        })
    }, []), y = a.useCallback(O => {
        v(W => W.filter(P => P.sheetId !== O))
    }, []), w = a.useMemo(() => k.some(O => O.staging !== "none") ? "not-none" : "none", [k]), x = a.useMemo(() => ({
        stackId: o,
        sheetsCount: f,
        setSheetsCount: h,
        updateSheetStagingDataInStack: b,
        removeSheetStagingDataInStack: y,
        sheetsInStackMergedStaging: w,
        updateSheetDataInStack: p,
        removeSheetDataFromStack: m,
        getPreviousSheetDataInStack: d
    }), [o, f, b, y, w, p, m, d]), V = r ? je : "div", z = We("SheetStack");
    return I.jsx(bn, {
        children: I.jsx(Nn, {
            genericContext: sa,
            customContext: n,
            value: x,
            children: I.jsx(V, { ...z("root", [], {
                    className: l,
                    dataSilk: [i]
                }),
                ref: t,
                ...s
            })
        })
    })
});
pr.displayName = "SheetStack.Root";
let fr = se.forwardRef((e, t) => {
    let {
        forComponent: n = "closest",
        asChild: l,
        stackingAnimation: i,
        style: r,
        className: s,
        ...o
    } = e, u = n === "closest" ? sa : n, {
        stackId: c,
        sheetsCount: p,
        sheetsInStackMergedStaging: m
    } = a.useContext(u);
    Oe(() => {
        H.addSheetStack({
            id: c
        })
    }, [c]);
    let {
        styleValue: d,
        composedRef: f
    } = _a({
        sheetsCount: p,
        stackId: c,
        stackingAnimation: i,
        style: r
    }, t), h = a.useMemo(() => m !== "none", [m]), k = We("SheetStack", {}), v = l ? je : "div";
    return I.jsx(v, {
        style: d,
        ...k("outlet", [], {
            className: s,
            dataSilk: [h && "0aj"]
        }),
        ...o,
        ref: f
    })
});
fr.displayName = "SheetStack.Outlet";
let si = {
        Root: pr,
        Outlet: fr
    },
    Ba = se.createContext(null);
Ba.displayName = "Scroll.GenericContext";
let oa = se.createContext({
    contentRef: null
});
oa.displayName = "Scroll.Anonymous";
let Dn = {
        nativePageScrollReplaced: void 0,
        pageScrollContainer: void 0
    },
    gr = e => a.useContext(e ? ? Ba) || {},
    Js = we === "android" ? 102 : 54,
    wa = La || we === "android" ? "instant" : "smooth",
    Zs = (e, t, n = 300) => {
        let l, i = e.scrollTop,
            r = () => {
                clearTimeout(l), e.removeEventListener("scroll", s), t()
            },
            s = () => {
                let o = e.scrollTop;
                if (o > i) {
                    r();
                    return
                }
                i = o, clearTimeout(l), l = setTimeout(r, n)
            };
        l = setTimeout(r, n), e.addEventListener("scroll", s)
    },
    Aa = e => {
        if (!e) return {
            top: 0,
            bottom: 0
        };
        let t = e.getBoundingClientRect(),
            n = window.getComputedStyle(e),
            l = t.top + parseFloat(n.borderTopWidth),
            i = t.bottom - parseFloat(n.borderBottomWidth);
        return {
            top: l,
            bottom: i
        }
    },
    xl = () => {
        let e = window.visualViewport.height,
            t = window.visualViewport.offsetTop;
        return {
            top: t,
            bottom: t + e
        }
    },
    Qs = (e, t) => Math.abs(Math.min(e + t, 0)),
    ei = (e, t) => Math.max(e - t, 0),
    Ol = (e, t, n) => {
        e.style.setProperty("height", t + "px"), n.current = t
    },
    ti = ({
        scrollContainer: e,
        elementTop: t,
        elementBottom: n,
        behavior: l,
        scrollMarginTop: i,
        scrollMarginBottom: r,
        scrollPortTop: s,
        scrollPortBottom: o,
        visualViewportTop: u,
        visualViewportBottom: c,
        beforeScrollCallback: p
    }) => {
        if (!e) return;
        let m = t - Math.max(s, u),
            d = Math.min(o, c) - n;
        if (m < i) {
            let f = Math.max(-e.scrollTop, m - i);
            f !== 0 && (p(), e.scrollBy({
                top: f,
                behavior: l
            }))
        } else if (d < r) {
            let f = e.scrollHeight - e.clientHeight - e.scrollTop,
                h = Math.min(f, r - d);
            h !== 0 && (p(), e.scrollBy({
                top: h,
                behavior: l
            }))
        }
    };
bn.displayName = "Scroll.ErrorBoundary";
let hr = se.forwardRef((e, t) => {
    let {
        asChild: n,
        className: l,
        componentId: i,
        componentRef: r,
        "data-silk": s,
        ...o
    } = e, u = n ? je : "div", c = a.useRef(() => {}), p = a.useCallback((...k) => {
        let v = c.current;
        return v(...k)
    }, []), m = a.useRef(() => {}), d = a.useCallback((...k) => {
        let v = m.current;
        return v(...k)
    }, []), f = a.useMemo(() => ({
        componentRef: r,
        scrollToRef: c,
        scrollTo: p,
        scrollByRef: m,
        scrollBy: d
    }), [r, d, p]), h = We("Scroll", {});
    return I.jsx(bn, {
        children: I.jsx(Nn, {
            genericContext: Ba,
            customContext: i,
            value: f,
            children: I.jsx(u, { ...h("root", [], {
                    className: l,
                    dataSilk: [s]
                }),
                ...o,
                ref: t
            })
        })
    })
});
hr.displayName = "Scroll.Root";
let Kn = null,
    vr = () => {
        let e = a.useRef(null);
        Oe(() => {
            Kn === null && e.current && (Kn = e.current.offsetWidth - e.current.clientWidth, document.body.style.setProperty("--ua-scrollbar-thickness", Kn + "px"))
        }, []);
        let t = We("Scroll"),
            n = I.jsx("div", { ...t("UAScrollbarMeasurer"),
                ref: e
            });
        return Kn === null ? typeof window < "u" ? Rl.createPortal(n, document.body) : I.jsx(I.Fragment, {
            children: n
        }) : null
    };
vr.displayName = "Scroll.Anonymous";
let qn = (e, t, n, l = !1) => typeof e == "boolean" ? e : typeof e ? .[t] == "boolean" ? e[t] : typeof e ? .[n] == "boolean" ? e[n] : l,
    kr = se.forwardRef((e, t) => {
        let {
            asChild: n,
            children: l,
            className: i,
            "data-silk": r,
            forComponent: s,
            axis: o = "y",
            pageScroll: u = !1,
            nativePageScrollReplacement: c = !1,
            safeArea: p = "visual-viewport",
            scrollGestureTrap: m = !1,
            scrollGestureOvershoot: d = !0,
            scrollGesture: f = "auto",
            onScrollStart: h,
            onScroll: k,
            onScrollEnd: v,
            onFocusInside: b,
            nativeFocusScrollPrevention: y = !0,
            scrollAnimationSettings: w = {
                skip: "auto"
            },
            scrollAnchoring: x = !0,
            scrollSnapType: V = "none",
            scrollPadding: z = "auto",
            scrollTimelineName: O = "none",
            nativeScrollbar: W = !0,
            ...P
        } = e, [M, j, D, N] = a.useMemo(() => {
            let R = qn(m, "xStart", "x"),
                de = qn(m, "xEnd", "x"),
                ne = qn(m, "yStart", "y"),
                ee = qn(m, "yEnd", "y"),
                K = R,
                ie = de,
                Ye = ne,
                De = ee;
            return o === "y" ? ie = K = R !== de || R : De = Ye = ne !== ee || ne, [K, ie, Ye, De]
        }, [m, o]), B = a.useMemo(() => M !== j, [j, M]), te = a.useMemo(() => D !== N, [N, D]), J = a.useMemo(() => {
            if (V === "proximity") {
                if (o === "y") return "proximityY";
                if (o === "x") return "proximityX"
            } else {
                if (V !== "mandatory") return "none";
                if (o === "y") return "mandatoryY";
                if (o === "x") return "mandatoryX"
            }
        }, [o, V]), $ = n ? je : "div", ce = a.useRef(null), Ue = Ze(ce, t), Q = a.useRef(null), Ge = a.useRef(null), $e = a.useRef(null), it = a.useRef(null), Re = a.useRef(null), Ne = a.useRef(null), le = nn(), {
            componentRef: Te,
            scrollToRef: fe,
            scrollByRef: Le
        } = gr(s) || {}, {
            getContentCoordinatesWhenRestingOnLastDetent: ue,
            contentRef: oe
        } = a.useContext(mt) || {}, pt = a.useMemo(() => f === !1 || f !== "auto", [f]), [Se, Pe] = a.useState(!1), [Z, A] = a.useState(!1);
        Oe(() => {
            u && (R => {
                let de = "data-silk-native-page-scroll-replaced",
                    ne = document.documentElement.getAttribute(de);
                if (!u && ne !== "true") return;
                let ee = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
                if (R !== !0 && (R !== "auto" || (we === "android" || we === "ios" || we === "ipados") && !ee)) {
                    var ie, Ye;
                    A(!1), Dn = {
                        nativePageScrollReplaced: !1,
                        pageScrollContainer: document.body
                    };
                    let De = new Event("silk-page-scroll-data-change");
                    if (document.dispatchEvent(De), ne === "false") return;
                    let gt = (Ye = (ie = Q.current) === null || ie === void 0 ? void 0 : ie.scrollTop) !== null && Ye !== void 0 ? Ye : 0;
                    document.documentElement.setAttribute(de, "false"), ne === "true" && window.scrollTo(0, gt)
                } else {
                    A(!0), Dn = {
                        nativePageScrollReplaced: !0,
                        pageScrollContainer: Q.current
                    };
                    let De = new Event("silk-page-scroll-data-change");
                    if (document.dispatchEvent(De), ne === "true") return;
                    let gt = window.pageYOffset;
                    if (document.documentElement.setAttribute(de, "true"), !Q.current) return;
                    Q.current.scrollTop = gt
                }
            })(c)
        }, [u, c]);
        let [ye, Ie] = a.useState(!0), [Ae, F] = a.useState(!0);
        Oe(() => {
            let R = Q.current,
                de = Ge.current,
                ne = $e.current,
                ee = it.current,
                K = new ResizeObserver(() => {
                    R && (o === "y" && R.scrollHeight > R.clientHeight ? Ie(!0) : Ie(!1), o === "x" && R.scrollWidth > R.clientWidth ? F(!0) : F(!1))
                });
            return R && de && ne && ee && (K.observe(R, {
                box: "border-box"
            }), K.observe(de, {
                box: "border-box"
            }), K.observe(ne, {
                box: "border-box"
            }), K.observe(ee, {
                box: "border-box"
            })), () => {
                K && K.disconnect()
            }
        }, [o, pt]);
        let [E, Xe] = a.useState(!1);
        Oe(() => {
            Xe(ye || Ae ? !0 : () => !1)
        }, [ye, Ae]);
        let [ge, bt] = a.useState(!1);
        a.useEffect(() => {
            bt(Ml())
        }, []);
        let pe = a.useRef(!1),
            xe = a.useRef(!1),
            q = B || te,
            [Rt, Qe] = a.useState(M),
            [Sn, an] = a.useState(D);
        a.useEffect(() => {
            let R;
            if (q) {
                let de = Re.current,
                    ne = Ne.current;
                if (!de || !ne) return;
                (R = new IntersectionObserver(ee => {
                    for (let K of ee) K.target === de ? K.isIntersecting ? (pe.current = !0, o === "x" ? Qe(M) : an(D)) : pe.current = !1 : K.target === ne && (K.isIntersecting ? (xe.current = !0, o === "x" ? Qe(j) : an(N)) : xe.current = !1), pe.current && xe.current && (o === "x" ? Qe(!1) : an(!1))
                }, {
                    root: Q.current,
                    rootMargin: "0px",
                    threshold: [1]
                })).observe(de), R.observe(ne)
            }
            return () => {
                R && R.disconnect()
            }
        }, [j, M, N, D, o, q]);
        let Pt = a.useRef(!1),
            ln = a.useRef(),
            Yt = a.useRef(""),
            It = a.useRef(void 0);
        a.useEffect(() => {
            let R = Q.current;
            if (!R) return;
            let de = ee => {
                    Ve.current = !1, kt({
                        nativeEvent: ee,
                        defaultBehavior: {},
                        handler: v
                    });
                    let K = document.activeElement;
                    (we == "ios" || we == "ipados") && K && en(K) && (It.current === void 0 && (Yt.current = K.style.getPropertyValue("opacity"), K.style.setProperty("opacity", "0.9999", "important")), clearTimeout(It.current), It.current = void 0, It.current = setTimeout(() => {
                        Yt.current === "" ? K.style.removeProperty("opacity") : K.style.setProperty("opacity", Yt.current), It.current = void 0
                    }, 55))
                },
                ne = ee => {
                    if (!Pt.current) {
                        let {
                            dismissKeyboard: K
                        } = kt({
                            nativeEvent: ee,
                            defaultBehavior: {
                                dismissKeyboard: !1
                            },
                            handler: h
                        });
                        K && !Pt.current && !Ve.current && ta() && R.focus({
                            preventScroll: !0
                        })
                    }
                    clearTimeout(ln.current), ln.current = setTimeout(() => {
                        Pt.current = !1, Pe(!1), "onscrollend" in window || de(null)
                    }, 90), Pt.current = !0, Pe(!0)
                };
            return R.addEventListener("scroll", ne), "onscrollend" in window && R.addEventListener("scrollend", de), () => {
                R.removeEventListener("scroll", ne), "onscrollend" in window && R.removeEventListener("scrollend", de)
            }
        }, [v, h]), a.useEffect(() => (y && H.addNativeFocusScrollPreventer(le), () => {
            y && H.removeNativeFocusScrollPreventer(le)
        }), [y, le]);
        let et = a.useMemo(() => u && !Z, [Z, u]),
            _e = a.useMemo(() => o === "y" ? et ? () => window.scrollY : () => {
                var R;
                return (R = Q.current) === null || R === void 0 ? void 0 : R.scrollTop
            } : et ? () => window.scrollX : () => {
                var R;
                return (R = Q.current) === null || R === void 0 ? void 0 : R.scrollLeft
            }, [o, et]),
            ft = a.useMemo(() => o === "y" ? et ? () => document.body.scrollHeight - window.innerHeight : () => {
                let R = Q.current;
                return R ? .scrollHeight - R ? .offsetHeight
            } : et ? () => document.body.scrollWidth - window.innerWidth : () => {
                let R = Q.current;
                return R ? .scrollWidth - R ? .offsetWidth
            }, [o, et]),
            Ht = a.useCallback(() => _e() / ft(), [_e, ft]),
            zt = a.useCallback(R => {
                k ? .({
                    progress: Ht(),
                    distance: _e(),
                    availableDistance: ft(),
                    nativeEvent: R
                })
            }, [Ht, _e, ft, k]);
        a.useEffect(() => (et && k && document.addEventListener("scroll", zt), () => {
            et && k && document.removeEventListener("scroll", zt)
        }), [et, k, zt]);
        let Ee = a.useCallback((R, {
                progress: de,
                distance: ne,
                animationSettings: ee = {
                    skip: "default"
                }
            }) => {
                let K = ne ? ? (de ? ? NaN) * ft();
                if (isNaN(K)) return;
                let ie = ee ? .skip,
                    Ye = et ? window : Q.current;
                Ye ? .[R === "to" ? "scrollTo" : "scrollBy"]({
                    [o === "y" ? "top" : "left"]: K,
                    behavior: ie === !0 ? "instant" : ie === !1 ? "smooth" : ie === "default" ? "auto" : La ? "instant" : "smooth"
                })
            }, [o, ft, et]),
            rn = a.useCallback(R => Ee("to", R), [Ee]),
            St = a.useCallback(R => Ee("by", R), [Ee]);
        a.useEffect(() => {
            fe.current = rn, Le.current = St
        }, [St, Le, rn, fe]), a.useImperativeHandle(Te, () => ({
            getProgress: Ht,
            getDistance: _e,
            getAvailableDistance: ft,
            scrollTo: rn,
            scrollBy: St
        }), [ft, _e, Ht, rn, St]);
        let Dt = a.useRef(!1),
            yn = a.useRef(),
            sn = a.useRef(),
            tt = a.useRef(0),
            Nt = a.useRef(0),
            Ve = a.useRef(!1),
            U = a.useCallback(({
                scrollIntoPlace: R = !0,
                scrollBehavior: de,
                safeViewport: ne = "visual-viewport"
            }) => {
                let ee, K;
                if (!Q.current || !Ge.current || !it.current || !$e.current || o !== "y" || ne === "none" || oe ? .current && ue().top === null || !oe ? .current && ue) return;
                if (oe ? .current) {
                    let {
                        top: at,
                        bottom: Kt
                    } = Aa(Q.current), Ke = oe.current.getBoundingClientRect(), ot = Ke.top, X = Ke.bottom;
                    ee = ue().top + (at - ot), K = ue().bottom - (X - Kt)
                } else {
                    let {
                        top: at,
                        bottom: Kt
                    } = Aa(Q.current);
                    ee = at, K = Kt
                }
                let {
                    top: ie,
                    bottom: Ye
                } = xl(), De = Math.min(K, ne === "visual-viewport" ? Ye : window.innerHeight), gt = Qs(ee, ne === "visual-viewport" ? ie : 0), ht = ei(K, ne === "visual-viewport" ? Ye : window.innerHeight);
                if (1 > Math.abs(tt.current - gt) && 1 > Math.abs(Nt.current - ht)) return;
                let Lt = -1 * (De - it.current.getBoundingClientRect().top),
                    Gt = Q.current.offsetHeight - Ge.current.offsetHeight >= 0,
                    $t = () => {
                        Ol($e.current, gt, tt), Ol(it.current, ht, Nt)
                    };
                if (de === "smooth" && (Lt < 0 || Gt) ? R && (Ve.current = !0, Gt ? Q.current.scrollTo({
                        top: 0,
                        behavior: de
                    }) : Q.current.scrollBy({
                        top: Lt,
                        behavior: de
                    }), Nt.current = ht, Zs(Q.current, () => {
                        Q.current && Gt && Q.current.scrollTo({
                            top: 0,
                            behavior: "instant"
                        }), $t()
                    })) : $t(), !R) return {
                    spacersHeightSetter: $t,
                    verticalScrollOffsetRequired: Lt
                }
            }, [o, ue, oe]),
            Ce = a.useCallback(() => U({
                scrollBehavior: wa,
                safeViewport: p
            }), [p, U]);
        Oe(() => {
            Ce()
        }, [Ce]), a.useEffect(() => {
            let R = Q.current,
                de = K => {
                    clearTimeout(yn.current), clearTimeout(sn.current);
                    let ie = K.target;
                    if (ie === R) return;
                    let {
                        scrollIntoView: Ye
                    } = kt({
                        nativeEvent: K,
                        defaultBehavior: {
                            scrollIntoView: !0
                        },
                        handler: b
                    });
                    if (!en(ie) || xa(ie)) return;
                    let De = ie.getBoundingClientRect().top - 0,
                        gt = ie.getBoundingClientRect().bottom - 0,
                        {
                            top: ht,
                            bottom: Lt
                        } = Aa(Q.current),
                        Gt = ht - 0,
                        $t = Lt - 0,
                        at = () => {
                            if (clearTimeout(yn.current), clearTimeout(sn.current), !ta()) return;
                            Dt.current = !0;
                            let {
                                top: Kt,
                                bottom: Ke
                            } = xl(), {
                                spacersHeightSetter: ot = () => {}
                            } = U({
                                scrollIntoPlace: !1,
                                scrollBehavior: "smooth",
                                safeViewport: p
                            }) || {};
                            ot(), Ye && ti({
                                scrollContainer: Q.current,
                                behavior: wa,
                                scrollMarginTop: 64,
                                scrollMarginBottom: Js,
                                elementTop: De,
                                elementBottom: gt,
                                scrollPortTop: Gt,
                                scrollPortBottom: $t,
                                visualViewportTop: Kt,
                                visualViewportBottom: Ke,
                                beforeScrollCallback: () => Ve.current = !0
                            }), visualViewport.removeEventListener("resize", at)
                        };
                    Dt.current ? (at(), visualViewport.addEventListener("resize", at), yn.current = setTimeout(() => {
                        visualViewport.removeEventListener("resize", at)
                    }, 900)) : (visualViewport.addEventListener("resize", at), sn.current = setTimeout(() => {
                        visualViewport.removeEventListener("resize", at), at()
                    }, 900))
                },
                ne = K => {
                    let ie = K.target;
                    !en(ie) || xa(ie) || en(K.relatedTarget) || (Dt.current = !1, U({
                        scrollBehavior: wa,
                        safeViewport: p === "none" ? "none" : "layout-viewport"
                    }))
                },
                ee = () => {
                    var K;
                    (K = Q.current) === null || K === void 0 || K.removeEventListener("scroll", Ce), setTimeout(() => {
                        Ce(), setTimeout(() => {
                            var ie;
                            (ie = Q.current) === null || ie === void 0 || ie.addEventListener("scroll", Ce, {
                                once: !0
                            })
                        }, 200)
                    }, 1), setTimeout(() => Ce, 350)
                };
            return R ? .addEventListener("focus", de, {
                capture: !0
            }), R ? .addEventListener("blur", ne, {
                capture: !0
            }), visualViewport.addEventListener("resize", ee), R ? .addEventListener("scroll", Ce, {
                once: !0
            }), () => {
                R ? .removeEventListener("focus", de, {
                    capture: !0
                }), R ? .removeEventListener("blur", ne, {
                    capture: !0
                }), visualViewport.removeEventListener("resize", ee), R ? .removeEventListener("scroll", Ce)
            }
        }, [b, p, U, Ce]);
        let ua = Ll(Q),
            yt = a.useMemo(() => u && !Z, [Z, u]),
            nt = We("Scroll", {
                axis: o,
                scrollTrapX: Rt,
                scrollTrapY: !ge && Sn || ua && !yt,
                scrollGestureOvershoot: d,
                scrollDisabled: pt,
                pageScroll: u,
                nativePageScrollReplacement: c,
                overflowX: Ae,
                overflowY: ye,
                skipScrollAnimation: w ? .skip,
                scrollAnchoring: x,
                scrollSnapType: J,
                nativeScrollbar: W,
                scrollOngoing: Se
            });
        return I.jsxs(oa.Provider, {
            value: {
                contentRef: Ge,
                axis: o,
                styleAttributes: nt,
                nativeFocusScrollPrevention: y,
                swipeTrapIncapable: yt,
                focusable: E,
                pageScroll: u,
                nativePageScrollReplacement: c,
                scrollContainerRef: Q,
                swipeTrapObserverRequired: q,
                startScrollSpyRef: Re,
                endScrollSpyRef: Ne,
                startSpacerRef: $e,
                endSpacerRef: it,
                scrollHandler: zt,
                scrollPadding: z,
                scrollTimelineName: O
            },
            children: [u && c !== !0 && I.jsx("style", {
                dangerouslySetInnerHTML: {
                    __html: `
                            html[data-silk-native-page-scroll-replaced="false"] > body {
                                scroll-padding: ${z};
                                scroll-timeline-axis: ${O} ${o};
                            }
                        `
                }
            }), u && c === !0 && I.jsx("script", {
                id: "silk-scroll-nativePageScrollReplacement-true",
                dangerouslySetInnerHTML: {
                    __html: `
                            document.documentElement.setAttribute("data-silk-native-page-scroll-replaced", "true");
                        `
                }
            }), u && c === !1 && I.jsx("script", {
                id: "silk-scroll-nativePageScrollReplacement-false",
                dangerouslySetInnerHTML: {
                    __html: `
                            document.documentElement.setAttribute("data-silk-native-page-scroll-replaced", "false");
                        `
                }
            }), u && c === "auto" && I.jsx("script", {
                id: "silk-scroll-nativePageScrollReplacement-auto",
                dangerouslySetInnerHTML: {
                    __html: `
                            const standalone =
                                window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
                            const mobile = window.navigator.userAgent?.match(/android|iPhone|iPad/i);

                            document.documentElement.setAttribute("data-standalone", !!standalone);
                            document.documentElement.setAttribute("data-silk-native-page-scroll-replaced", !(mobile && !standalone));
                        `
                }
            }), I.jsx(vr, {}), I.jsx($, { ...nt("view", ["axis", "pageScroll", "skipScrollAnimation", "scrollOngoing"], {
                    className: i,
                    dataSilk: [r]
                }),
                ...P,
                ref: Ue,
                children: l
            })]
        })
    });
kr.displayName = "Scroll.View";
let Na = se.forwardRef(({
    side: e,
    ...t
}, n) => {
    let {
        axis: l
    } = a.useContext(oa) || {}, i = We("Scroll", {
        side: e,
        axis: l
    });
    return I.jsx("div", { ...i("spy", ["side", "axis"]),
        ref: n,
        ...t
    })
});
Na.displayName = "Scroll.Anonymous";
let br = se.forwardRef((e, t) => {
    let {
        asChild: n,
        className: l,
        "data-silk": i,
        ...r
    } = e, s = n ? je : "div", {
        contentRef: o,
        styleAttributes: u,
        nativeFocusScrollPrevention: c,
        swipeTrapIncapable: p,
        focusable: m,
        axis: d,
        pageScroll: f,
        nativePageScrollReplacement: h,
        scrollContainerRef: k,
        swipeTrapObserverRequired: v,
        startScrollSpyRef: b,
        endScrollSpyRef: y,
        startSpacerRef: w,
        endSpacerRef: x,
        scrollHandler: V,
        scrollPadding: z,
        scrollTimelineName: O
    } = a.useContext(oa) || {}, W = Ze(o, t);
    return I.jsxs("div", { ...u("scrollContainer", ["axis", "pageScroll", "scrollTrapX", "scrollTrapY", "scrollGestureOvershoot", "scrollDisabled", "overflowX", "overflowY", "skipScrollAnimation", "scrollAnchoring", "scrollSnapType", "nativeScrollbar"], {
            dataSilk: [i, "0ad", c && "0ah", p && "0ai"]
        }),
        style: {
            scrollPadding: z,
            scrollTimeline: O + " " + d
        },
        tabIndex: m ? 0 : c ? -1 : void 0,
        role: f && !h ? void 0 : "region",
        onScroll: V,
        ref: k,
        children: [v && I.jsx(Na, {
            side: "start",
            ref: b
        }), d === "y" && I.jsx("div", {
            ref: w,
            ...u("startSpacer", ["axis", "pageScroll"])
        }), I.jsx(s, { ...u("content", ["axis", "scrollTrapX", "scrollTrapY", "overflowX", "overflowY"], {
                className: l,
                dataSilk: [i]
            }),
            ...r,
            ref: W
        }), d === "y" && I.jsx("div", {
            ref: x,
            ...u("endSpacer", ["axis", "pageScroll"])
        }), v && I.jsx(Na, {
            side: "end",
            ref: y
        })]
    })
});
br.displayName = "Scroll.Content";
let Sr = se.forwardRef(({
    asChild: e,
    ...t
}, n) => {
    let l = e ? je : "button",
        {
            forComponent: i,
            onPress: r,
            onClick: s,
            children: o,
            action: u,
            ...c
        } = t,
        {
            type: p,
            ...m
        } = u || {},
        {
            scrollTo: d,
            scrollBy: f
        } = gr(i),
        h = a.useRef(null),
        k = Ze(h, n);
    return I.jsx(l, {
        onClick: v => {
            var b;
            let {
                forceFocus: y,
                runAction: w
            } = kt({
                nativeEvent: v,
                defaultBehavior: {
                    forceFocus: !0,
                    runAction: !0
                },
                handler: r
            });
            if (y && ((b = h.current) === null || b === void 0 || b.focus({
                    preventScroll: !0
                })), w) {
                if (p === "scroll-to") return d(m);
                if (p === "scroll-by") return f(m)
            }
            s ? .(v)
        },
        ref: k,
        ...c,
        children: o
    })
});
Sr.displayName = "Sheet.Trigger";
let ii = {
        Root: hr,
        Trigger: Sr,
        View: kr,
        Content: br
    },
    ni = e => a.useContext(e ? ? Ut) || {},
    yr = se.forwardRef((e, t) => {
        let {
            asChild: n,
            className: l,
            "data-silk": i,
            timing: r,
            forComponent: s,
            tabIndex: o,
            ...u
        } = e, c = n ? je : "div", {
            sheetId: p
        } = s ? ni(s) : {}, m = p ? ? "any", d = a.useCallback(w => {
            H.addAutoFocusTarget({
                layerId: m,
                element: w,
                timing: r
            })
        }, [m, r]), f = a.useCallback(w => {
            H.removeAutoFocusTarget(w)
        }, []), h = a.useRef(null), k = a.useCallback(w => {
            w ? d(w) : f(h.current), h.current = w
        }, [d, f]), v = a.useRef(!0);
        a.useEffect(() => (h.current && !v.current && d(h.current), v.current = !1, () => {
            h.current && f(h.current)
        }), [d, f]);
        let b = Ze(k, t),
            y = We("AutoFocusTarget", {});
        return I.jsx(c, { ...y("root", [], {
                className: l,
                dataSilk: [i]
            }),
            ...n || Number.isInteger(o) ? {} : {
                tabIndex: -1
            },
            ...u,
            ref: b
        })
    });
yr.displayName = "AutoFocusTarget.Root";
let oi = {
        Root: yr
    },
    Cr = se.forwardRef((e, t) => {
        let {
            asChild: n,
            disabled: l = !1,
            children: i,
            contentGetter: r,
            forComponent: s,
            ...o
        } = e, u = a.useRef(null), c = Ze(u, t), p = a.useMemo(() => !!i, [i]);
        return a.useEffect(() => {
            let m, d;
            if (!l) {
                let f, h = !1;
                if (p && u.current ? f = u.current : r && (f = ea(r)) && (h = !0), f) {
                    let k = Array.isArray(s) ? s : s ? [s] : [];
                    m = H.addIsland({
                        componentId: k,
                        element: f
                    }), h && (d = new MutationObserver(() => {
                        ea(r) || (H.removeIsland(m), d.disconnect())
                    })).observe(f.parentElement, {
                        childList: !0
                    })
                }
            }
            return () => {
                l || (H.removeIsland(m), d ? .disconnect())
            }
        }, [t, l, p, r, s]), i ? I.jsx(Ot.Root, {
            active: !l,
            asChild: n,
            "data-silk": "0ag",
            ...o,
            ref: c,
            children: i
        }) : null
    });
Cr.displayName = "Island.Root";
let Tr = se.forwardRef((e, t) => {
    let {
        asChild: n,
        children: l,
        ...i
    } = e;
    return I.jsx(Ot.Stabiliser, {
        asChild: n,
        ...i,
        ref: t,
        children: l
    })
});
Tr.displayName = "Island.Content";
let ui = {
        Root: Cr,
        Content: Tr
    },
    Er = se.forwardRef(({
        asChild: e,
        children: t,
        contentGetter: n,
        disabled: l = !1,
        selfManagedInertOutside: i = !0,
        ...r
    }, s) => {
        let o = nn(),
            u = a.useRef(null),
            c = Ze(u, s),
            p = e ? je : "div",
            m = a.useMemo(() => !!t, [t]);
        return Oe(() => {
            let d;
            if (!l && o) {
                let f, h = !1;
                m && u.current ? f = u.current : n && (f = ea(n)) && (h = !0), f && (H.updateLayer({
                    external: !0,
                    layerId: o,
                    viewElement: f,
                    inertOutside: i,
                    onPresentAutoFocus: {
                        focus: !1
                    },
                    onDismissAutoFocus: {
                        focus: !1
                    },
                    defaultClickOutsideAction: () => {},
                    defaultEscapeKeyDownAction: () => {}
                }), h && (d = new MutationObserver(() => {
                    ea(n) || (H.removeLayer(o), d.disconnect())
                })).observe(f.parentElement, {
                    childList: !0
                }))
            }
            return () => {
                !l && o && (H.removeLayer(o), d ? .disconnect())
            }
        }, [m, n, l, o, i]), I.jsx(p, {
            ref: c,
            ...r,
            children: t
        })
    });
Er.displayName = "ExternalOverlay.Root";
let ci = {
        Root: Er
    },
    di = () => {
        let e = se.createContext(null);
        return e.displayName = "ComponentIdContext", e
    },
    mi = e => {
        let [t, n] = a.useState(typeof window < "u" && window.matchMedia(e).matches);
        return a.useEffect(() => {
            let l = window.matchMedia(e),
                i = r => {
                    n(r.matches)
                };
            return l.addEventListener("change", i), () => l.removeEventListener("change", i)
        }, [e]), t
    },
    pi = e => {
        H.updateUnderlyingThemeColor(e)
    },
    fi = ({
        elementRef: e,
        dimmingColor: t
    }) => {
        let n = a.useId(),
            l = a.useRef(0),
            [i, r] = a.useState(null),
            [s, o] = a.useState(!1),
            u = pl(p => {
                var m;
                s && H.updateThemeColorDimmingOverlayAlphaValue(i, p), e == null || (m = e.current) === null || m === void 0 || m.style.setProperty("opacity", p), l.current = p
            }),
            c = pl(({
                keyframes: p,
                duration: m = 500,
                easing: d = "cubic-bezier(0.25, 0.1, 0.25, 1)"
            }) => {
                let f, [h, k] = p,
                    v = y => h + (k - h) * y;
                f = s ? y => {
                    var w;
                    let x = v(y);
                    H.updateThemeColorDimmingOverlayAlphaValue(i, x), e == null || (w = e.current) === null || w === void 0 || w.style.setProperty("opacity", x)
                } : y => {
                    var w;
                    let x = v(y);
                    e == null || (w = e.current) === null || w === void 0 || w.style.setProperty("opacity", x)
                };
                let b = Ql(d);
                ss(f, {
                    duration: m,
                    cubicBezier: b
                })
            });
        return Oe(() => {
            let p = !!(xt() && !_l() && H.getAndStoreUnderlyingThemeColorAsRGBArray());
            if (o(p), !p) return;
            let m = H.updateThemeColorDimmingOverlay({
                abortRemoval: !0,
                dimmingOverlayId: n,
                color: t,
                alpha: l.current
            });
            return r(m), () => {
                p && H.removeThemeColorDimmingOverlay(n)
            }
        }, [t, n]), {
            setDimmingOverlayOpacity: u,
            animateDimmingOverlayOpacity: c
        }
    },
    gi = () => {
        let [e, t] = a.useState(Dn);
        return a.useEffect(() => {
            t(Dn);
            let n = () => {
                t(Dn)
            };
            return document.addEventListener("silk-page-scroll-data-change", n), () => document.removeEventListener("silk-page-scroll-data-change", n)
        }, []), e
    },
    hi = (e, t, n) => {
        if (!e || !t) return;
        let {
            duration: l = 500,
            easing: i = "cubic-bezier(0.25, 0.1, 0.25, 1)"
        } = n || {}, r = e.animate(t, {
            duration: l,
            easing: i,
            fill: "forwards"
        });
        r.onfinish = () => {
            r.commitStyles(), r.cancel()
        }
    };
export {
    oi as AutoFocusTarget, ci as ExternalOverlay, li as Fixed, ui as Island, ii as Scroll, ri as Sheet, si as SheetStack, Gs as VisuallyHidden, hi as animate, di as createComponentId, pi as updateThemeColor, mi as useClientMediaQuery, gi as usePageScrollData, fi as useThemeColorDimmingOverlay
};
//# sourceMappingURL=f4e264a1-n7ypi89ro3hgcgmv.js.map