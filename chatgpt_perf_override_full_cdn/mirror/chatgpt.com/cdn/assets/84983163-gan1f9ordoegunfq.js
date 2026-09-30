import {
    m as r
} from "./7517017f-efd9iwaiway92n98.js";
const C = "GENERATOR_GENERATE";

function S(p, a) {
    const h = i => {
        const o = i.data;
        if (Array.isArray(o) && o[0] === C) {
            if (i.stopImmediatePropagation(), !a) throw new Error("No function was registered on this RPC. This is probably calling a client which do not implement the function.");
            const [d, e, ...s] = o, t = a(...s);
            r(e.next, t.next.bind(t)), r(e.return, n => t.return ? .(n) || {
                done: !0
            }), r(e.throw, n => t.throw ? .(n) || Promise.reject(n)), r(e.asyncDispose, async () => {
                const n = Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose"),
                    y = Symbol.dispose || Symbol.for("Symbol.dispose");
                n in t ? await t[n] ? .() : y in t && t[y] ? .()
            })
        }
    };
    p.addEventListener("message", h), p.start();
    const w = i => {
            let o;
            return (...d) => {
                const {
                    port1: e,
                    port2: s
                } = new MessageChannel, {
                    port1: t,
                    port2: n
                } = new MessageChannel, {
                    port1: y,
                    port2: b
                } = new MessageChannel, {
                    port1: E,
                    port2: m
                } = new MessageChannel, u = {
                    signal: i.signal
                }, g = () => {
                    e.close(), s.close(), t.close(), n.close(), y.close(), b.close(), E.close(), m.close()
                }, A = r(e).withOptions(u), R = r(t).withOptions(u), M = r(y).withOptions(u), x = r(E).withOptions(u);
                let f = !1;
                const P = async c => {
                        if (o ? .(), f) return {
                            done: !0
                        };
                        const O = await c();
                        return O.done && (f = !0, g()), O
                    },
                    G = async c => {
                        o ? .(), await c(), f = !0, g(), o = () => {
                            throw new Error("This generator has been disposed.")
                        }
                    },
                    D = {
                        next: c => P(() => R(c)),
                        return: c => P(() => M(c)),
                        throw: c => P(() => x(c)),
                        [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]: () => G(() => A()),
                        [Symbol.asyncIterator]: () => D
                    };
                return p.postMessage([C, {
                    asyncDispose: s,
                    next: n,
                    return: b,
                    throw: m
                }, ...d], [...i.transfer || [], s, n, b, m]), i.signal ? .addEventListener("abort", () => {
                    o = () => {
                        throw new Error("This generator has been aborted.")
                    }, g()
                }, {
                    once: !0
                }), D
            }
        },
        l = w({});
    return l.withOptions = w, l
}
const T = async (p, a, h = []) => {
    const w = new Set(Object.keys(a).filter(e => a[e] ? .constructor ? .name === "AsyncGeneratorFunction")),
        l = {};
    for (const e of Object.keys(a)) {
        if (a[e] === void 0) continue;
        const s = new MessageChannel;
        w.has(e) ? S(s.port1, (...t) => a[e] ? .(...t)) : r(s.port1, (...t) => a[e] ? .(...t)), l[e] = s.port2
    }
    const {
        ports: i,
        replyPort: o
    } = await new Promise(e => {
        const s = t => {
            t.data.type === "init" && t.source && t.source === p.contentWindow && (window.removeEventListener("message", s), e(t.data))
        };
        window.addEventListener("message", s)
    });
    return o.postMessage(l, Object.values(l)), o.start(), Object.fromEntries(Object.entries(i).map(([e, s]) => [e, h.includes(e) ? S(s) : r(s)]))
};
export {
    T as i
};
//# sourceMappingURL=84983163-gan1f9ordoegunfq.js.map