var x = x || {};
x.Keyboard = function(l) {
    var t = this,
        H = x.Keyboard._nextID++,
        S = "_GUAC_KEYBOARD_HANDLED_BY_" + H;
    this.onkeydown = null, this.onkeyup = null;
    var d = {
        keyupUnreliable: !1,
        altIsTypableOnly: !1,
        capsLockKeyupUnreliable: !1
    };
    navigator && navigator.platform && (navigator.platform.match(/ipad|iphone|ipod/i) ? d.keyupUnreliable = !0 : navigator.platform.match(/^mac/i) && (d.altIsTypableOnly = !0, d.capsLockKeyupUnreliable = !0));
    var c = function(f) {
            var r = this;
            this.keyCode = f ? f.which || f.keyCode : 0, this.keyIdentifier = f && f.keyIdentifier, this.key = f && f.key, this.location = f ? B(f) : 0, this.modifiers = f ? x.Keyboard.ModifierState.fromKeyboardEvent(f) : new x.Keyboard.ModifierState, this.timestamp = new Date().getTime(), this.defaultPrevented = !1, this.keysym = null, this.reliable = !1, this.getAge = function() {
                return new Date().getTime() - r.timestamp
            }
        },
        h = function(f) {
            c.call(this, f), this.keysym = K(this.key, this.location) || F(this.keyCode, this.location), this.keyupReliable = !d.keyupUnreliable, this.keysym && !O(this.keysym) && (this.reliable = !0), !this.keysym && J(this.keyCode, this.keyIdentifier) && (this.keysym = K(this.keyIdentifier, this.location, this.modifiers.shift)), this.modifiers.meta && this.keysym !== 65511 && this.keysym !== 65512 ? this.keyupReliable = !1 : this.keysym === 65509 && d.capsLockKeyupUnreliable && (this.keyupReliable = !1);
            var r = !this.modifiers.ctrl && !d.altIsTypableOnly,
                i = !this.modifiers.alt;
            (i && this.modifiers.ctrl || r && this.modifiers.alt || this.modifiers.meta || this.modifiers.hyper) && (this.reliable = !0), v[this.keyCode] = this.keysym
        };
    h.prototype = new c;
    var b = function(f) {
        c.call(this, f), this.keysym = _(this.keyCode), this.reliable = !0
    };
    b.prototype = new c;
    var y = function(f) {
        c.call(this, f), this.keysym = F(this.keyCode, this.location) || K(this.key, this.location), t.pressed[this.keysym] || (this.keysym = v[this.keyCode] || this.keysym), this.reliable = !0
    };
    y.prototype = new c;
    var a = [],
        R = {
            8: [65288],
            9: [65289],
            12: [65291, 65291, 65291, 65461],
            13: [65293],
            16: [65505, 65505, 65506],
            17: [65507, 65507, 65508],
            18: [65513, 65513, 65027],
            19: [65299],
            20: [65509],
            27: [65307],
            32: [32],
            33: [65365, 65365, 65365, 65465],
            34: [65366, 65366, 65366, 65459],
            35: [65367, 65367, 65367, 65457],
            36: [65360, 65360, 65360, 65463],
            37: [65361, 65361, 65361, 65460],
            38: [65362, 65362, 65362, 65464],
            39: [65363, 65363, 65363, 65462],
            40: [65364, 65364, 65364, 65458],
            45: [65379, 65379, 65379, 65456],
            46: [65535, 65535, 65535, 65454],
            91: [65511],
            92: [65512],
            93: [65383],
            96: [65456],
            97: [65457],
            98: [65458],
            99: [65459],
            100: [65460],
            101: [65461],
            102: [65462],
            103: [65463],
            104: [65464],
            105: [65465],
            106: [65450],
            107: [65451],
            109: [65453],
            110: [65454],
            111: [65455],
            112: [65470],
            113: [65471],
            114: [65472],
            115: [65473],
            116: [65474],
            117: [65475],
            118: [65476],
            119: [65477],
            120: [65478],
            121: [65479],
            122: [65480],
            123: [65481],
            144: [65407],
            145: [65300],
            225: [65027]
        },
        T = {
            Again: [65382],
            AllCandidates: [65341],
            Alphanumeric: [65328],
            Alt: [65513, 65513, 65027],
            Attn: [64782],
            AltGraph: [65027],
            ArrowDown: [65364],
            ArrowLeft: [65361],
            ArrowRight: [65363],
            ArrowUp: [65362],
            Backspace: [65288],
            CapsLock: [65509],
            Cancel: [65385],
            Clear: [65291],
            Convert: [65313],
            Copy: [64789],
            Crsel: [64796],
            CrSel: [64796],
            CodeInput: [65335],
            Compose: [65312],
            Control: [65507, 65507, 65508],
            ContextMenu: [65383],
            Delete: [65535],
            Down: [65364],
            End: [65367],
            Enter: [65293],
            EraseEof: [64774],
            Escape: [65307],
            Execute: [65378],
            Exsel: [64797],
            ExSel: [64797],
            F1: [65470],
            F2: [65471],
            F3: [65472],
            F4: [65473],
            F5: [65474],
            F6: [65475],
            F7: [65476],
            F8: [65477],
            F9: [65478],
            F10: [65479],
            F11: [65480],
            F12: [65481],
            F13: [65482],
            F14: [65483],
            F15: [65484],
            F16: [65485],
            F17: [65486],
            F18: [65487],
            F19: [65488],
            F20: [65489],
            F21: [65490],
            F22: [65491],
            F23: [65492],
            F24: [65493],
            Find: [65384],
            GroupFirst: [65036],
            GroupLast: [65038],
            GroupNext: [65032],
            GroupPrevious: [65034],
            FullWidth: null,
            HalfWidth: null,
            HangulMode: [65329],
            Hankaku: [65321],
            HanjaMode: [65332],
            Help: [65386],
            Hiragana: [65317],
            HiraganaKatakana: [65319],
            Home: [65360],
            Hyper: [65517, 65517, 65518],
            Insert: [65379],
            JapaneseHiragana: [65317],
            JapaneseKatakana: [65318],
            JapaneseRomaji: [65316],
            JunjaMode: [65336],
            KanaMode: [65325],
            KanjiMode: [65313],
            Katakana: [65318],
            Left: [65361],
            Meta: [65511, 65511, 65512],
            ModeChange: [65406],
            NumLock: [65407],
            PageDown: [65366],
            PageUp: [65365],
            Pause: [65299],
            Play: [64790],
            PreviousCandidate: [65342],
            PrintScreen: [65377],
            Redo: [65382],
            Right: [65363],
            RomanCharacters: null,
            Scroll: [65300],
            Select: [65376],
            Separator: [65452],
            Shift: [65505, 65505, 65506],
            SingleCandidate: [65340],
            Super: [65515, 65515, 65516],
            Tab: [65289],
            UIKeyInputDownArrow: [65364],
            UIKeyInputEscape: [65307],
            UIKeyInputLeftArrow: [65361],
            UIKeyInputRightArrow: [65363],
            UIKeyInputUpArrow: [65362],
            Up: [65362],
            Undo: [65381],
            Win: [65511, 65511, 65512],
            Zenkaku: [65320],
            ZenkakuHankaku: [65322]
        },
        G = {
            65027: !0,
            65505: !0,
            65506: !0,
            65507: !0,
            65508: !0,
            65509: !0,
            65511: !0,
            65512: !0,
            65513: !0,
            65514: !0,
            65515: !0,
            65516: !0
        };
    this.modifiers = new x.Keyboard.ModifierState, this.pressed = {};
    var k = {},
        E = {},
        v = {},
        w = null,
        m = null,
        I = function(f, r) {
            return f ? f[r] || f[0] : null
        },
        O = function(f) {
            return f >= 0 && f <= 255 || (f & 4294901760) === 16777216
        };

    function K(e, f, r) {
        if (!e) return null;
        var i, n = e.indexOf("U+");
        if (n >= 0) {
            var u = e.substring(n + 2);
            i = String.fromCharCode(parseInt(u, 16))
        } else if (e.length === 1 && f !== 3) i = e;
        else return I(T[e], f);
        r === !0 ? i = i.toUpperCase() : r === !1 && (i = i.toLowerCase());
        var o = i.charCodeAt(0);
        return _(o)
    }

    function j(e) {
        return e <= 31 || e >= 127 && e <= 159
    }

    function _(e) {
        return j(e) ? 65280 | e : e >= 0 && e <= 255 ? e : e >= 256 && e <= 1114111 ? 16777216 | e : null
    }

    function F(e, f) {
        return I(R[e], f)
    }
    var J = function(f, r) {
        if (!r) return !1;
        var i = r.indexOf("U+");
        if (i === -1) return !0;
        var n = parseInt(r.substring(i + 2), 16);
        return f !== n || f >= 65 && f <= 90 || f >= 48 && f <= 57
    };
    this.press = function(e) {
        if (e !== null) {
            if (!t.pressed[e] && (t.pressed[e] = !0, t.onkeydown)) {
                var f = t.onkeydown(e);
                return E[e] = f, window.clearTimeout(w), window.clearInterval(m), G[e] || (w = window.setTimeout(function() {
                    m = window.setInterval(function() {
                        t.onkeyup(e), t.onkeydown(e)
                    }, 50)
                }, 500)), f
            }
            return E[e] || !1
        }
    }, this.release = function(e) {
        t.pressed[e] && (delete t.pressed[e], delete k[e], window.clearTimeout(w), window.clearInterval(m), e !== null && t.onkeyup && t.onkeyup(e))
    }, this.type = function(f) {
        for (var r = 0; r < f.length; r++) {
            var i = f.codePointAt ? f.codePointAt(r) : f.charCodeAt(r),
                n = _(i);
            t.press(n), t.release(n)
        }
    }, this.reset = function() {
        for (var e in t.pressed) t.release(parseInt(e));
        a = []
    };
    var p = function(f, r, i) {
            var n = i.modifiers[f],
                u = t.modifiers[f],
                o;
            if (r.indexOf(i.keysym) === -1) {
                if (u && n === !1)
                    for (o = 0; o < r.length; o++) t.release(r[o]);
                else if (!u && n) {
                    for (o = 0; o < r.length; o++)
                        if (t.pressed[r[o]]) return;
                    var D = r[0];
                    i.keysym && (k[D] = !0), t.press(D)
                }
            }
        },
        M = function(f) {
            p("alt", [65513, 65514, 65027], f), p("shift", [65505, 65506], f), p("ctrl", [65507, 65508], f), p("meta", [65511, 65512], f), p("hyper", [65515, 65516], f), t.modifiers = f.modifiers
        },
        N = function() {
            for (var f in t.pressed)
                if (!k[f]) return !1;
            return !0
        };

    function g() {
        var e = A();
        if (!e) return !1;
        var f;
        do f = e, e = A(); while (e !== null);
        return N() && t.reset(), f.defaultPrevented
    }
    var W = function(f) {
            !t.modifiers.ctrl || !t.modifiers.alt || f >= 65 && f <= 90 || f >= 97 && f <= 122 || (f <= 255 || (f & 4278190080) === 16777216) && (t.release(65507), t.release(65508), t.release(65513), t.release(65514))
        },
        A = function() {
            var f = a[0];
            if (!f) return null;
            if (f instanceof h) {
                var r = null,
                    i = [];
                if (f.keysym === 65511 || f.keysym === 65512) {
                    if (a.length === 1) return null;
                    if (a[1].keysym !== f.keysym) {
                        if (!a[1].modifiers.meta) return a.shift()
                    } else if (a[1] instanceof h) return a.shift()
                }
                if (f.reliable ? (r = f.keysym, i = a.splice(0, 1)) : a[1] instanceof b ? (r = a[1].keysym, i = a.splice(0, 2)) : a[1] && (r = f.keysym, i = a.splice(0, 1)), i.length > 0) {
                    if (M(f), r) {
                        W(r);
                        var n = !t.press(r);
                        v[f.keyCode] = r, f.keyupReliable || t.release(r);
                        for (var u = 0; u < i.length; u++) i[u].defaultPrevented = n
                    }
                    return f
                }
            } else if (f instanceof y && !d.keyupUnreliable) {
                var r = f.keysym;
                if (r) t.release(r), delete v[f.keyCode], f.defaultPrevented = !0;
                else return t.reset(), f;
                return M(f), a.shift()
            } else return a.shift();
            return null
        },
        B = function(f) {
            return "location" in f ? f.location : "keyLocation" in f ? f.keyLocation : 0
        },
        C = function(f) {
            return f[S] ? !1 : (f[S] = !0, !0)
        },
        L = function(e) {
            if (t.onkeydown && C(e)) {
                var f = new h(e);
                f.keyCode !== 229 && (a.push(f), g() && e.preventDefault())
            }
        },
        U = function(e) {
            !t.onkeydown && !t.onkeyup || C(e) && (a.push(new b(e)), g() && e.preventDefault())
        },
        P = function(e) {
            t.onkeyup && C(e) && (e.preventDefault(), a.push(new y(e)), g())
        };
    this.listenTo = function(f) {
        f.addEventListener("keydown", L.bind(this), !0), f.addEventListener("keypress", U.bind(this), !0), f.addEventListener("keyup", P.bind(this), !0)
    }, l && t.listenTo(l), this.interpretKeyEvent = function(e) {
        switch (e.type) {
            case "keydown":
                L(e);
                break;
            case "keyup":
                P(e);
                break;
            case "keypress":
                U(e);
                break
        }
    }, this.newKeyEvent = e => new c(e), this.newKeydownEvent = e => new h(e), this.newKeyupEvent = e => new y(e)
};
x.Keyboard._nextID = 0;
x.Keyboard.ModifierState = function() {
    this.shift = !1, this.ctrl = !1, this.alt = !1, this.meta = !1, this.hyper = !1
};
x.Keyboard.ModifierState.fromKeyboardEvent = function(s) {
    var l = new x.Keyboard.ModifierState;
    return l.shift = s.shiftKey, l.ctrl = s.ctrlKey, l.alt = s.altKey, l.meta = s.metaKey, s.getModifierState && (l.hyper = s.getModifierState("OS") || s.getModifierState("Super") || s.getModifierState("Hyper") || s.getModifierState("Win")), l
};
const Y = x.Keyboard;
export {
    Y as G
};
//# sourceMappingURL=76527257-cpwybk70pkgunsyf.js.map