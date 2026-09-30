import {
    e as A,
    g as P,
    j as H
} from "./2340486e-dvd8m80i7d6hyild.js";
var d = {},
    m, R;

function J() {
    if (R) return m;
    R = 1;
    var y = (function() {
        function a(o, t) {
            for (var r = 0; r < t.length; r++) {
                var f = t[r];
                f.enumerable = f.enumerable || !1, f.configurable = !0, "value" in f && (f.writable = !0), Object.defineProperty(o, f.key, f)
            }
        }
        return function(o, t, r) {
            return t && a(o.prototype, t), r && a(o, r), o
        }
    })();

    function k(a, o) {
        if (!(a instanceof o)) throw new TypeError("Cannot call a class as a function")
    }
    var p = [
            [{
                color: "0, 0, 0",
                class: "ansi-black"
            }, {
                color: "187, 0, 0",
                class: "ansi-red"
            }, {
                color: "0, 187, 0",
                class: "ansi-green"
            }, {
                color: "187, 187, 0",
                class: "ansi-yellow"
            }, {
                color: "0, 0, 187",
                class: "ansi-blue"
            }, {
                color: "187, 0, 187",
                class: "ansi-magenta"
            }, {
                color: "0, 187, 187",
                class: "ansi-cyan"
            }, {
                color: "255,255,255",
                class: "ansi-white"
            }],
            [{
                color: "85, 85, 85",
                class: "ansi-bright-black"
            }, {
                color: "255, 85, 85",
                class: "ansi-bright-red"
            }, {
                color: "0, 255, 0",
                class: "ansi-bright-green"
            }, {
                color: "255, 255, 85",
                class: "ansi-bright-yellow"
            }, {
                color: "85, 85, 255",
                class: "ansi-bright-blue"
            }, {
                color: "255, 85, 255",
                class: "ansi-bright-magenta"
            }, {
                color: "85, 255, 255",
                class: "ansi-bright-cyan"
            }, {
                color: "255, 255, 255",
                class: "ansi-bright-white"
            }]
        ],
        E = (function() {
            y(a, null, [{
                key: "escapeForHtml",
                value: function(t) {
                    return new a().escapeForHtml(t)
                }
            }, {
                key: "linkify",
                value: function(t) {
                    return new a().linkify(t)
                }
            }, {
                key: "ansiToHtml",
                value: function(t, r) {
                    return new a().ansiToHtml(t, r)
                }
            }, {
                key: "ansiToJson",
                value: function(t, r) {
                    return new a().ansiToJson(t, r)
                }
            }, {
                key: "ansiToText",
                value: function(t) {
                    return new a().ansiToText(t)
                }
            }]);

            function a() {
                k(this, a), this.fg = this.bg = this.fg_truecolor = this.bg_truecolor = null, this.bright = 0
            }
            return y(a, [{
                key: "setupPalette",
                value: function() {
                    this.PALETTE_COLORS = [];
                    for (var t = 0; t < 2; ++t)
                        for (var r = 0; r < 8; ++r) this.PALETTE_COLORS.push(p[t][r].color);
                    for (var f = [0, 95, 135, 175, 215, 255], v = function(c, h, b) {
                            return f[c] + ", " + f[h] + ", " + f[b]
                        }, l = 0; l < 6; ++l)
                        for (var e = 0; e < 6; ++e)
                            for (var s = 0; s < 6; ++s) this.PALETTE_COLORS.push(v(l, e, s));
                    for (var i = 8, n = 0; n < 24; ++n, i += 10) this.PALETTE_COLORS.push(v(i, i, i))
                }
            }, {
                key: "escapeForHtml",
                value: function(t) {
                    return t.replace(/[&<>]/gm, function(r) {
                        return r == "&" ? "&amp;" : r == "<" ? "&lt;" : r == ">" ? "&gt;" : ""
                    })
                }
            }, {
                key: "linkify",
                value: function(t) {
                    return t.replace(/(https?:\/\/[^\s]+)/gm, function(r) {
                        return '<a href="' + r + '">' + r + "</a>"
                    })
                }
            }, {
                key: "ansiToHtml",
                value: function(t, r) {
                    return this.process(t, r, !0)
                }
            }, {
                key: "ansiToJson",
                value: function(t, r) {
                    return r = r || {}, r.json = !0, r.clearLine = !1, this.process(t, r, !0)
                }
            }, {
                key: "ansiToText",
                value: function(t) {
                    return this.process(t, {}, !1)
                }
            }, {
                key: "process",
                value: function(t, r, f) {
                    var v = this,
                        l = this,
                        e = t.split(/\033\[/),
                        s = e.shift();
                    r == null && (r = {}), r.clearLine = /\r/.test(t);
                    var i = e.map(function(g) {
                        return v.processChunk(g, r, f)
                    });
                    if (r && r.json) {
                        var n = l.processChunkJson("");
                        return n.content = s, n.clearLine = r.clearLine, i.unshift(n), r.remove_empty && (i = i.filter(function(g) {
                            return !g.isEmpty()
                        })), i
                    } else i.unshift(s);
                    return i.join("")
                }
            }, {
                key: "processChunkJson",
                value: function(t, r, f) {
                    r = typeof r > "u" ? {} : r;
                    var v = r.use_classes = typeof r.use_classes < "u" && r.use_classes,
                        l = r.key = v ? "class" : "color",
                        e = {
                            content: t,
                            fg: null,
                            bg: null,
                            fg_truecolor: null,
                            bg_truecolor: null,
                            clearLine: r.clearLine,
                            decoration: null,
                            was_processed: !1,
                            isEmpty: function() {
                                return !e.content
                            }
                        },
                        s = t.match(/^([!\x3c-\x3f]*)([\d;]*)([\x20-\x2c]*[\x40-\x7e])([\s\S]*)/m);
                    if (!s) return e;
                    e.content = s[4];
                    var i = s[2].split(";");
                    if (s[1] !== "" || s[3] !== "m" || !f) return e;
                    var n = this;
                    for (n.decoration = null; i.length > 0;) {
                        var g = i.shift(),
                            c = parseInt(g);
                        if (isNaN(c) || c === 0) n.fg = n.bg = n.decoration = null;
                        else if (c === 1) n.decoration = "bold";
                        else if (c === 2) n.decoration = "dim";
                        else if (c == 3) n.decoration = "italic";
                        else if (c == 4) n.decoration = "underline";
                        else if (c == 5) n.decoration = "blink";
                        else if (c === 7) n.decoration = "reverse";
                        else if (c === 8) n.decoration = "hidden";
                        else if (c === 9) n.decoration = "strikethrough";
                        else if (c == 39) n.fg = null;
                        else if (c == 49) n.bg = null;
                        else if (c >= 30 && c < 38) n.fg = p[0][c % 10][l];
                        else if (c >= 90 && c < 98) n.fg = p[1][c % 10][l];
                        else if (c >= 40 && c < 48) n.bg = p[0][c % 10][l];
                        else if (c >= 100 && c < 108) n.bg = p[1][c % 10][l];
                        else if (c === 38 || c === 48) {
                            var h = c === 38;
                            if (i.length >= 1) {
                                var b = i.shift();
                                if (b === "5" && i.length >= 1) {
                                    var u = parseInt(i.shift());
                                    if (u >= 0 && u <= 255)
                                        if (!v) this.PALETTE_COLORS || n.setupPalette(), h ? n.fg = this.PALETTE_COLORS[u] : n.bg = this.PALETTE_COLORS[u];
                                        else {
                                            var T = u >= 16 ? "ansi-palette-" + u : p[u > 7 ? 1 : 0][u % 8].class;
                                            h ? n.fg = T : n.bg = T
                                        }
                                } else if (b === "2" && i.length >= 3) {
                                    var L = parseInt(i.shift()),
                                        _ = parseInt(i.shift()),
                                        w = parseInt(i.shift());
                                    if (L >= 0 && L <= 255 && _ >= 0 && _ <= 255 && w >= 0 && w <= 255) {
                                        var C = L + ", " + _ + ", " + w;
                                        v ? h ? (n.fg = "ansi-truecolor", n.fg_truecolor = C) : (n.bg = "ansi-truecolor", n.bg_truecolor = C) : h ? n.fg = C : n.bg = C
                                    }
                                }
                            }
                        }
                    }
                    return n.fg === null && n.bg === null && n.decoration === null || (e.fg = n.fg, e.bg = n.bg, e.fg_truecolor = n.fg_truecolor, e.bg_truecolor = n.bg_truecolor, e.decoration = n.decoration, e.was_processed = !0), e
                }
            }, {
                key: "processChunk",
                value: function(t, r, f) {
                    var v = this;
                    r = r || {};
                    var l = this.processChunkJson(t, r, f);
                    if (r.json) return l;
                    if (l.isEmpty()) return "";
                    if (!l.was_processed) return l.content;
                    var e = r.use_classes,
                        s = [],
                        i = [],
                        n = {},
                        g = function(h) {
                            var b = [],
                                u = void 0;
                            for (u in h) h.hasOwnProperty(u) && b.push("data-" + u + '="' + v.escapeForHtml(h[u]) + '"');
                            return b.length > 0 ? " " + b.join(" ") : ""
                        };
                    return l.fg && (e ? (i.push(l.fg + "-fg"), l.fg_truecolor !== null && (n["ansi-truecolor-fg"] = l.fg_truecolor, l.fg_truecolor = null)) : s.push("color:rgb(" + l.fg + ")")), l.bg && (e ? (i.push(l.bg + "-bg"), l.bg_truecolor !== null && (n["ansi-truecolor-bg"] = l.bg_truecolor, l.bg_truecolor = null)) : s.push("background-color:rgb(" + l.bg + ")")), l.decoration && (e ? i.push("ansi-" + l.decoration) : l.decoration === "bold" ? s.push("font-weight:bold") : l.decoration === "dim" ? s.push("opacity:0.5") : l.decoration === "italic" ? s.push("font-style:italic") : l.decoration === "reverse" ? s.push("filter:invert(100%)") : l.decoration === "hidden" ? s.push("visibility:hidden") : l.decoration === "strikethrough" ? s.push("text-decoration:line-through") : s.push("text-decoration:" + l.decoration)), e ? '<span class="' + i.join(" ") + '"' + g(n) + ">" + l.content + "</span>" : '<span style="' + s.join(";") + '"' + g(n) + ">" + l.content + "</span>"
                }
            }]), a
        })();
    return m = E, m
}
var O = {
        exports: {}
    },
    S;

function I() {
    if (S) return O.exports;
    S = 1;

    function y(a) {
        if (!a) return "";
        if (!/\r/.test(a)) return a;
        for (a = a.replace(/\r+\n/gm, `
`);
            /\r./.test(a);) a = a.replace(/^([^\r\n]*)\r+([^\r\n]+)/gm, function(o, t, r) {
            return r + t.slice(r.length)
        });
        return a
    }

    function k(a) {
        for (var o = 0, t = 0; t < a.length; t++) a[o].length <= a[t].length && (o = t);
        return o
    }

    function p(a) {
        if (!/\r/.test(a)) return a;
        for (var o = a.split("\r"), t = []; o.length > 0;) {
            var r = k(o);
            t.push(o[r]), o = o.slice(r + 1)
        }
        return t.join("\r")
    }

    function E(a) {
        if (!a) return "";
        if (!/\r/.test(a)) return a;
        if (!/\n/.test(a)) return p(a);
        a = a.replace(/\r+\n/gm, `
`);
        var o = a.lastIndexOf(`
`);
        return y(a.slice(0, o)) + `
` + p(a.slice(o + 1))
    }
    return O.exports = y, O.exports.escapeCarriageReturn = y, O.exports.escapeCarriageReturnSafe = E, O.exports
}
var j;

function $() {
    if (j) return d;
    j = 1;
    var y = d && d.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        },
        k = d && d.__importStar || function(e) {
            if (e && e.__esModule) return e;
            var s = {};
            if (e != null)
                for (var i in e) Object.hasOwnProperty.call(e, i) && (s[i] = e[i]);
            return s.default = e, s
        };
    Object.defineProperty(d, "__esModule", {
        value: !0
    });
    const p = y(J()),
        E = I(),
        a = k(A());

    function o(e, s = !1) {
        return e = E.escapeCarriageReturn(l(e)), p.default.ansiToJson(e, {
            json: !0,
            remove_empty: !0,
            use_classes: s
        })
    }

    function t(e) {
        let s = "";
        return e.bg && (s += `${e.bg}-bg `), e.fg && (s += `${e.fg}-fg `), e.decoration && (s += `ansi-${e.decoration} `), s === "" ? null : (s = s.substring(0, s.length - 1), s)
    }

    function r(e) {
        const s = {};
        return e.bg && (s.backgroundColor = `rgb(${e.bg})`), e.fg && (s.color = `rgb(${e.fg})`), s
    }

    function f(e, s, i, n) {
        const g = s ? null : r(i),
            c = s ? t(i) : null;
        if (!e) return a.createElement("span", {
            style: g,
            key: n,
            className: c
        }, i.content);
        const h = [],
            b = /(\s|^)(https?:\/\/(?:www\.|(?!www))[^\s.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g;
        let u = 0,
            T;
        for (;
            (T = b.exec(i.content)) !== null;) {
            const [, L, _] = T, w = T.index + L.length;
            w > u && h.push(i.content.substring(u, w));
            const C = _.startsWith("www.") ? `http://${_}` : _;
            h.push(a.createElement("a", {
                key: u,
                href: C,
                target: "_blank"
            }, `${_}`)), u = b.lastIndex
        }
        return u < i.content.length && h.push(i.content.substring(u)), a.createElement("span", {
            style: g,
            key: n,
            className: c
        }, h)
    }

    function v(e) {
        const {
            className: s,
            useClasses: i,
            children: n,
            linkify: g
        } = e;
        return a.createElement("code", {
            className: s
        }, o(n ? ? "", i ? ? !1).map(f.bind(null, g ? ? !1, i ? ? !1)))
    }
    d.default = v;

    function l(e) {
        let s = e;
        do e = s, s = e.replace(/[^\n]\x08/gm, ""); while (s.length < e.length);
        return e
    }
    return d
}
var q = $();
const F = P(q);

function B({
    children: y,
    className: k
}) {
    return H.jsx(F, {
        useClasses: !0,
        className: k,
        children: y
    })
}
export {
    B as A
};
//# sourceMappingURL=4c806318-j1zaw577xwxm6ksd.js.map