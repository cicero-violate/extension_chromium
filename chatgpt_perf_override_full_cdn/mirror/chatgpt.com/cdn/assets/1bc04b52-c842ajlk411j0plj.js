import {
    r as g,
    j as n,
    o as h
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    a6 as p,
    cq as C,
    kL as E,
    kM as k,
    ej as w,
    kN as v,
    kO as M,
    kP as I,
    a7 as _
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    hf as b,
    vO as j,
    aV as x,
    ge as N,
    _ as l,
    b5 as L,
    fk as R
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    d as y,
    a as S,
    b as T
} from "./93b8edb0-i4v0k7e37nk0jqqy.js";
const d = "contextList";

function W() {
    return t => {
        p(t, e => {
            if (!_(e) || e.name !== d) return;
            const s = e.data ? ? (e.data = {});
            s.hName = d
        })
    }
}

function D(t) {
    if (typeof t != "object" || t == null || !("props" in t) || t.props == null) return;
    const e = t.props;
    if (e.node ? .tagName === j) return parseInt(e.index)
}
const u = x.div `gap-6 border-b pb-4 my-4 context-list border-token-border-default`;

function q({
    children: t
}) {
    const e = g.useContext(C),
        s = Array.isArray(t) ? t : b([t]);
    if (s.length === 0 || e ? .analyticsMetadata.turnIndex === void 0) return null;
    const [i, ...a] = s, m = D(i);
    if (m != null && e != null) {
        const o = e ? .contentReferences ? .[m],
            r = o ? .type === "image_v2",
            c = o ? .type === "optimistic_image_citation";
        if (r || c) return n.jsxs(u, {
            className: "flex w-full",
            children: [n.jsx("div", {
                className: "grow leading-normal",
                children: a
            }), n.jsxs("div", {
                className: "mt-2 flex w-24 shrink-0",
                children: [r && o.images[0] && n.jsx(F, {
                    imageRef: o,
                    analyticsMetadata: e.analyticsMetadata
                }), c && n.jsx(O, {
                    optimisticRef: o
                })]
            })]
        })
    }
    return n.jsx(u, {
        className: "leading-normal",
        children: s
    })
}
const f = x.button `not-prose flex w-full h-fit	items-center justify-center overflow-hidden rounded-lg max-h-48`;

function F({
    imageRef: t,
    analyticsMetadata: e
}) {
    const s = t.images[0],
        i = s.thumbnail_size.width / s.thumbnail_size.height,
        a = E(s, {
            width: 200,
            height: Math.max(Math.round(200 / i), 112)
        }),
        {
            isSuccess: m
        } = k(a, "ContextListImage"),
        o = w.useStore(),
        r = g.useRef(!1),
        c = { ...N(e),
            type: "context_list_image_thumbnail",
            image_url: a
        };
    return r.current || (r.current = !0, l.logEventWithStatsig("Search Content Reference Shown", "search_content_reference_shown", c)), n.jsx(f, {
        onClick: () => {
            o.setCurrentImage({
                image: s,
                source: M.Turn,
                analyticsMetadata: e
            }), l.logEventWithStatsig("Search Content Reference Clicked", "search_content_reference_clicked", c)
        },
        children: n.jsx(L.img, {
            src: a,
            className: "w-full object-cover",
            alt: s.title,
            initial: {
                opacity: 0
            },
            animate: m ? {
                opacity: 1
            } : {},
            whileHover: {
                scale: 1.1,
                transition: v
            }
        })
    })
}

function O({
    optimisticRef: t
}) {
    return n.jsx(f, {
        children: t.status === "done" ? n.jsx(R, {
            label: n.jsx(h, {
                id: "8JYwCi",
                defaultMessage: "Error fetching image"
            }),
            children: n.jsx(I, {
                className: "text-token-text-tertiary h-24 w-12"
            })
        }) : n.jsx("div", {
            className: "bg-token-main-surface-tertiary h-24 w-full animate-pulse"
        })
    })
}

function J() {
    const e = this.data(),
        s = e.micromarkExtensions || (e.micromarkExtensions = []),
        i = e.fromMarkdownExtensions || (e.fromMarkdownExtensions = []),
        a = e.toMarkdownExtensions || (e.toMarkdownExtensions = []);
    s.push(y()), i.push(S()), a.push(T())
}
export {
    d as C, W as a, q as b, J as r
};
//# sourceMappingURL=1bc04b52-c842ajlk411j0plj.js.map