import {
    c as a
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    cq as p
} from "./4813494d-javwxs2rmzsrunl2.js";
const r = p(() => ({
        isOpen: !1,
        focusedWalnutId: null,
        presentationMap: {},
        walnutReaderPromise: null,
        spreadsheetExporters: {}
    })),
    i = t => {
        r.setState({
            isOpen: !0,
            focusedWalnutId: t
        })
    },
    d = () => {
        r.setState({
            isOpen: !1
        })
    },
    c = () => {
        r.setState({
            isOpen: !1,
            focusedWalnutId: null,
            presentationMap: {},
            walnutReaderPromise: null,
            spreadsheetExporters: {}
        })
    },
    u = (t, s) => {
        r.setState(e => {
            const n = e.presentationMap[t];
            if (!n) return e;
            const o = typeof s == "function" ? s(n.selectedSlideIdx) : s;
            return o === n.selectedSlideIdx ? e : { ...e,
                presentationMap: { ...e.presentationMap,
                    [t]: { ...n,
                        selectedSlideIdx: o
                    }
                }
            }
        })
    },
    l = (t, s) => {
        r.setState(e => ({ ...e,
            presentationMap: { ...e.presentationMap,
                [t]: s
            }
        }))
    },
    f = (t, s) => {
        r.setState(e => {
            const n = e.presentationMap[t];
            if (!n) return e;
            const o = typeof s == "function" ? s(n.selectedSheetIdx) : s;
            return o === n.selectedSheetIdx ? e : { ...e,
                presentationMap: { ...e.presentationMap,
                    [t]: { ...n,
                        selectedSheetIdx: o
                    }
                }
            }
        })
    },
    x = (t, s) => {
        r.setState(e => ({ ...e,
            spreadsheetExporters: { ...e.spreadsheetExporters,
                [t]: s
            }
        }))
    },
    S = t => {
        r.setState(s => {
            if (!s.spreadsheetExporters[t]) return s;
            const e = { ...s.spreadsheetExporters
            };
            return delete e[t], { ...s,
                spreadsheetExporters: e
            }
        })
    };

function I() {
    "use forget";
    const t = a.c(2),
        s = r(h);
    let e;
    return t[0] !== s ? (e = { ...s,
        open: i,
        close: d,
        reset: c,
        setSelectedSlideIdx: u,
        setSelectedSheetIdx: f,
        updatePresentationMap: l,
        registerSpreadsheetExporter: x,
        unregisterSpreadsheetExporter: S
    }, t[0] = s, t[1] = e) : e = t[1], e
}

function h(t) {
    return {
        isOpen: t.isOpen,
        focusedWalnutId: t.focusedWalnutId,
        presentationMap: t.presentationMap,
        spreadsheetExporters: t.spreadsheetExporters
    }
}
export {
    c as r, I as u
};
//# sourceMappingURL=a89794b1-iid29x3u23vy2xh2.js.map