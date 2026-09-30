import {
    c as v,
    r as g
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    H as p,
    r as b,
    t as r
} from "./1bc04b52-nn3a79pgrrxatkgx.js";
import {
    E as d,
    C as f
} from "./1bc04b52-c6spp0aq3f71sxih.js";
import {
    f_ as h
} from "./4813494d-javwxs2rmzsrunl2.js";
const u = ({
        variant: n,
        settings: a,
        styles: e
    }) => {
        const o = d.theme({
                "&": {
                    backgroundColor: a.background,
                    color: a.foreground
                },
                ".cm-content": {
                    caretColor: a.caret
                },
                ".cm-cursor, .cm-dropCursor": {
                    borderLeftColor: a.caret
                },
                "&.cm-focused .cm-selectionBackgroundm .cm-selectionBackground, .cm-content ::selection": {
                    backgroundColor: a.selection
                },
                ".cm-activeLine": {
                    backgroundColor: a.lineHighlight
                },
                ".cm-gutters": {
                    backgroundColor: a.gutterBackground,
                    color: a.gutterForeground
                },
                ".cm-activeLineGutter": {
                    backgroundColor: a.lineHighlight
                }
            }, {
                dark: n === "dark"
            }),
            t = p.define(e);
        return [o, b(t)]
    },
    k = [u({
        variant: "light",
        settings: {
            background: "var(--gray-0)",
            foreground: "var(--gray-950)",
            caret: "var(--gray-950)",
            selection: "var(--blue-a50)",
            lineHighlight: "var(--gray-50)",
            gutterBackground: "var(--gray-25)",
            gutterForeground: "var(--gray-500)"
        },
        styles: [{
            tag: r.comment,
            color: "var(--gray-550)",
            fontStyle: "italic"
        }, {
            tag: r.meta,
            color: "var(--blue-600)"
        }, {
            tag: [r.keyword, r.definitionKeyword, r.modifier, r.operator],
            color: "var(--pink-600)"
        }, {
            tag: [r.heading, r.contentSeparator],
            color: "var(--yellow-600)"
        }, {
            tag: r.deleted,
            color: "var(--red-600)"
        }, {
            tag: [r.bool, r.null, r.atom, r.self, r.number],
            color: "var(--orange-600)"
        }, {
            tag: [r.string, r.regexp, r.special(r.string)],
            color: "var(--green-600)"
        }, {
            tag: [r.standard(r.variableName), r.standard(r.propertyName), r.className],
            color: "var(--orange-600)"
        }, {
            tag: [r.variableName, r.special(r.variableName), r.typeName, r.function(r.variableName), r.definition(r.variableName)],
            color: "var(--purple-600)"
        }, {
            tag: r.attributeName,
            color: "var(--yellow-600)"
        }, {
            tag: [r.labelName, r.tagName, r.definition(r.tagName), r.angleBracket],
            color: "var(--blue-600)"
        }, {
            tag: [r.link, r.url],
            color: "var(--blue-600)",
            textDecoration: "underline"
        }, {
            tag: [r.invalid, r.escape],
            color: "var(--red-600)",
            textDecoration: "underline"
        }]
    }), d.theme({
        ".cm-lineNumbers .cm-gutterElement": {
            paddingLeft: "8px"
        },
        ".cm-cursor, .cm-dropCursor": {
            borderLeftWidth: "2px"
        },
        ".cm-matchingBracket": {
            outline: "1px solid var(--blue-600)",
            color: "inherit"
        },
        ".cm-nonmatchingBracket": {
            outline: "1px solid var(--red-600)",
            color: "inherit"
        }
    })],
    y = [u({
        variant: "dark",
        settings: {
            background: "var(--gray-950)",
            foreground: "var(--gray-50)",
            caret: "var(--gray-50)",
            selection: "var(--blue-a75)",
            lineHighlight: "var(--gray-900)",
            gutterBackground: "var(--gray-925)",
            gutterForeground: "var(--gray-250)"
        },
        styles: [{
            tag: r.comment,
            color: "var(--gray-250)"
        }, {
            tag: r.meta,
            color: "var(--blue-200)"
        }, {
            tag: [r.keyword, r.definitionKeyword, r.modifier, r.operator],
            color: "var(--pink-200)"
        }, {
            tag: [r.heading, r.contentSeparator],
            color: "var(--yellow-200)"
        }, {
            tag: r.deleted,
            color: "var(--red-200)"
        }, {
            tag: [r.bool, r.null, r.atom, r.self, r.number],
            color: "var(--orange-200)"
        }, {
            tag: [r.string, r.regexp, r.special(r.string)],
            color: "var(--green-200)"
        }, {
            tag: [r.standard(r.variableName), r.standard(r.propertyName), r.className],
            color: "var(--orange-200)"
        }, {
            tag: [r.variableName, r.special(r.variableName), r.typeName, r.function(r.variableName), r.definition(r.variableName)],
            color: "var(--purple-200)"
        }, {
            tag: r.attributeName,
            color: "var(--yellow-200)"
        }, {
            tag: [r.labelName, r.tagName, r.definition(r.tagName), r.angleBracket],
            color: "var(--blue-200)"
        }, {
            tag: [r.link, r.url],
            color: "var(--blue-200)",
            textDecoration: "underline"
        }, {
            tag: [r.invalid, r.escape],
            color: "var(--red-200)",
            textDecoration: "underline"
        }]
    }), d.theme({
        ".cm-lineNumbers .cm-gutterElement": {
            paddingLeft: "8px"
        },
        ".cm-cursor, .cm-dropCursor": {
            borderLeftWidth: "2px"
        },
        ".cm-matchingBracket": {
            outline: "1px solid var(--blue-200)",
            color: "inherit"
        },
        ".cm-nonmatchingBracket": {
            outline: "1px solid var(--red-200)",
            color: "inherit"
        }
    })];

function m(n) {
    return n ? y : k
}
const L = (n, a) => {
    "use forget";
    const e = v.c(10),
        [o] = g.useState(N),
        {
            isDarkMode: t
        } = h();
    let l, c;
    e[0] !== o || e[1] !== t || e[2] !== a || e[3] !== n ? (l = () => {
        n.current ? .dispatch({
            effects: o.reconfigure(a ? ? m(t))
        })
    }, c = [t, o, n, a], e[0] = o, e[1] = t, e[2] = a, e[3] = n, e[4] = l, e[5] = c) : (l = e[4], c = e[5]), g.useEffect(l, c);
    let i;
    e[6] !== o || e[7] !== t || e[8] !== a ? (i = () => o.of(a ? ? m(t)), e[6] = o, e[7] = t, e[8] = a, e[9] = i) : i = e[9];
    const [s] = g.useState(i);
    return s
};

function N() {
    return new f
}
export {
    m as g, L as u
};
//# sourceMappingURL=8ad92f11-dff614f59ztoslhd.js.map