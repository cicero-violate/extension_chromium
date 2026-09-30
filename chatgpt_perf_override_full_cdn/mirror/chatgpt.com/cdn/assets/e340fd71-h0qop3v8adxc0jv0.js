import {
    c as b,
    r as d,
    j as h
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    fB as x,
    bh as v,
    bf as j,
    bj as w,
    y9 as S,
    bY as R,
    fk as U
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    LightboxNew as _
} from "./1f30e218-lhaiclj6u6v5ivxw.js";
import "./540191af-eyt4mhgiscgde9oh.js";
import "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import "./b9e74381-im85lkncbx47l1ca.js";
import "./5955c2e7-bm7q695htcpusowj.js";
import "./d93502a4-kb9e349iy8dy3l12.js";
import "./77a251d8-ki2u6aaeuhtt02gd.js";
import "./52ac6121-m7z0qcro3hdwwo6n.js";
import "./a35b0b5c-c4d5x0qzgpq8r7ek.js";
import "./8d846022-n379etekqsymvq1f.js";

function y(t) {
    "use forget";
    const e = b.c(13),
        [r, i] = d.useState(null),
        n = d.useRef(null),
        u = x();
    let c, p;
    e[0] !== r ? (c = () => () => {
        r ? .cleanup ? .()
    }, p = [r], e[0] = r, e[1] = c, e[2] = p) : (c = e[1], p = e[2]), d.useEffect(c, p);
    let l;
    e[3] === Symbol.for("react.memo_cache_sentinel") ? (l = () => {
        i(I), n.current = null
    }, e[3] = l) : l = e[3];
    let s;
    e[4] !== t ? (s = [t], e[4] = t, e[5] = s) : s = e[5], d.useEffect(l, s);
    let o;
    e[6] !== u || e[7] !== r || e[8] !== t ? (o = () => t ? r ? Promise.resolve(r.url) : n.current ? n.current.then(C) : (n.current = N(t, u ? .serverId$()).then(g => (i(g), g)).finally(() => {
        n.current = null
    })).then(L) : null, e[6] = u, e[7] = r, e[8] = t, e[9] = o) : o = e[9];
    const a = o,
        m = r ? .url ? ? null;
    let f;
    return e[10] !== a || e[11] !== m ? (f = {
        resolvedUrl: m,
        fetch: a
    }, e[10] = a, e[11] = m, e[12] = f) : f = e[12], f
}

function L(t) {
    return t ? .url ? ? null
}

function C(t) {
    return t ? .url ? ? null
}

function I(t) {
    return t ? .cleanup ? .(), null
}
async function N(t, e) {
    if (t.startsWith("sediment://") || t.startsWith("file-service://")) {
        if (!e) return null;
        const n = await v(j(t), {
            conversationId: e,
            showInline: !0
        });
        return n.status !== w.Success ? null : {
            url: n.download_url
        }
    }
    const r = new Blob([S(t)], {
            type: "image/jpeg"
        }),
        i = URL.createObjectURL(r);
    return {
        url: i,
        cleanup: () => {
            URL.revokeObjectURL(i)
        }
    }
}
const Y = t => {
    "use forget";
    const e = b.c(15),
        {
            chunk: r,
            children: i
        } = t,
        {
            resolvedUrl: n,
            fetch: u
        } = y(r.screenshot);
    let c;
    e[0] !== u ? (c = async () => {
        const f = await u();
        f && R(_.Root, {
            media: [{
                url: f,
                id: "cot-screenshot",
                archived: !1,
                assetPointer: null,
                generationId: "",
                height: 0,
                width: 0,
                sourceMessageId: "",
                thumbnail: null,
                transformationId: null
            }],
            initialIndex: 0
        })
    }, e[0] = u, e[1] = c) : c = e[1];
    const p = c;
    if (!r.screenshot) return i;
    let l;
    e[2] !== n ? (l = n ? h.jsx("img", {
        className: "h-28 w-40",
        src: n,
        alt: ""
    }) : h.jsx("div", {
        className: "h-28 w-40"
    }), e[2] = n, e[3] = l) : l = e[3];
    let s;
    e[4] !== u ? (s = f => {
        f && u()
    }, e[4] = u, e[5] = s) : s = e[5];
    let o;
    e[6] !== p ? (o = () => {
        p()
    }, e[6] = p, e[7] = o) : o = e[7];
    let a;
    e[8] !== i || e[9] !== o ? (a = h.jsx("button", {
        type: "button",
        className: "inline appearance-none border-0 bg-transparent p-0 text-start text-inherit",
        onClick: o,
        children: i
    }), e[8] = i, e[9] = o, e[10] = a) : a = e[10];
    let m;
    return e[11] !== l || e[12] !== s || e[13] !== a ? (m = h.jsx(U, {
        triggerAs: null,
        label: l,
        customPaddingClassName: "",
        contentClassName: "shadow-[0px_10px_20px_0px_rgb(0,0,0,0.25)]",
        align: "start",
        alignOffset: 24,
        sideOffset: -4,
        onOpenChange: s,
        children: a
    }), e[11] = l, e[12] = s, e[13] = a, e[14] = m) : m = e[14], m
};
export {
    Y as DragonfruitCoTScreenshotTooltip
};
//# sourceMappingURL=e340fd71-h0qop3v8adxc0jv0.js.map