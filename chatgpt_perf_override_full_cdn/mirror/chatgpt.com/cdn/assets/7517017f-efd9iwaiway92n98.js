function O(t) {
    const s = d(t, new WeakMap);
    try {
        return structuredClone(s)
    } catch {}
    return s
}

function d(t, e) {
    if (t === null || typeof t == "string" || typeof t == "number" || typeof t == "boolean" || typeof t == "bigint") return t;
    if (typeof t == "symbol" || typeof t == "function" || typeof t > "u") return String(t);
    if (e.has(t)) return e.get(t);
    try {
        return structuredClone(t)
    } catch {}
    const s = Object.prototype.toString.call(t);
    if (s === "[object Date]") return new Date(t.getTime());
    if (s === "[object RegExp]") return m(t);
    if (s === "[object ArrayBuffer]") return t.slice(0);
    if (s === "[object DataView]") {
        const r = t,
            n = d(r.buffer, e);
        try {
            return new DataView(n, r.byteOffset, r.byteLength)
        } catch {
            return String(t)
        }
    }
    if (ArrayBuffer.isView(t) && !(t instanceof DataView)) try {
        const r = t.constructor;
        if (typeof t.slice == "function") return t.slice();
        const n = new r(t.length);
        return n.set(t), n
    } catch {
        return String(t)
    }
    if (s === "[object Map]") {
        const r = new Map;
        e.set(t, r);
        for (const [n, o] of t) r.set(f(n, e), f(o, e));
        return r
    }
    if (s === "[object Set]") {
        const r = new Set;
        e.set(t, r);
        for (const n of t) r.add(f(n, e));
        return r
    }
    if (typeof Blob < "u" && t instanceof Blob) try {
        return typeof File < "u" && t instanceof File ? new File([t], t.name, {
            type: t.type,
            lastModified: t.lastModified
        }) : new Blob([t], {
            type: t.type
        })
    } catch {
        return String(t)
    }
    if (typeof URL < "u" && t instanceof URL) try {
        return new URL(t.toString())
    } catch {
        return String(t)
    }
    if (typeof URLSearchParams < "u" && t instanceof URLSearchParams) try {
        return new URLSearchParams(t.toString())
    } catch {
        return String(t)
    }
    if (t instanceof Error) {
        const r = t;
        let n;
        try {
            const o = r.constructor;
            n = typeof o == "function" ? new o(r.message) : new Error(r.message)
        } catch {
            n = new Error(r.message)
        }
        if (n.name = r.name, typeof r.stack == "string" && (n.stack = r.stack), "cause" in r) try {
            n.cause = f(r.cause, e)
        } catch {
            n.cause = String(r.cause)
        }
        for (const o of Object.keys(r)) try {
            n[o] = f(r[o], e)
        } catch {
            n[o] = String(r[o])
        }
        return n
    }
    if (typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer || typeof WeakMap < "u" && t instanceof WeakMap || typeof WeakSet < "u" && t instanceof WeakSet) return String(t);
    if (Array.isArray(t)) {
        const r = new Array(t.length);
        e.set(t, r);
        for (let n = 0; n < t.length; n++) n in t && (r[n] = f(t[n], e));
        return r
    }
    const a = {};
    e.set(t, a);
    for (const r of Object.keys(t)) {
        let n;
        try {
            n = t[r]
        } catch (o) {
            n = String(o)
        }
        a[r] = f(n, e)
    }
    return a
}

function f(t, e) {
    try {
        return structuredClone(t)
    } catch {}
    return d(t, e)
}

function m(t) {
    const e = new RegExp(t.source, t.flags);
    return e.lastIndex = t.lastIndex, e
}
const h = "ABORT",
    w = "CALL",
    b = "REJECT",
    g = "RESOLVE";

function L(t, e) {
    const s = n => {
        const o = n.data;
        if (Array.isArray(o) && o[0] === w) {
            n.stopImmediatePropagation();
            const [i] = n.ports;
            if (!i) throw new Error("RPCCallMessage must contains a port.");
            e ? (async function() {
                const p = new AbortController;
                try {
                    i.onmessage = ({
                        data: c
                    }) => Array.isArray(c) && c[0] === h && p.abort(), i.postMessage([g, await e.call({
                        signal: p.signal
                    }, ...o.slice(1))])
                } catch (c) {
                    if (c instanceof Error && c.name === "DataCloneError") try {
                        i.postMessage([g, await e.call({
                            signal: p.signal
                        }, ...O(o.slice(1)))]);
                        return
                    } catch {}
                    i.postMessage([b, c])
                } finally {
                    i.close()
                }
            })() : (i.postMessage([b, new Error("No function was registered on this RPC. This is probably calling a client which do not implement the function.")]), i.close())
        }
    };
    t.addEventListener("message", s), t.start();
    const a = n => (...o) => new Promise((i, p) => {
            const {
                port1: c,
                port2: S
            } = new MessageChannel;
            c.onmessage = E => {
                const y = E.data;
                y[0] === g ? i(y[1]) : p(y[1]), c.close()
            }, n ? .signal ? .addEventListener("abort", () => {
                c.postMessage([h]), c.close(), p(new Error("Aborted."))
            }), t.postMessage([w, ...o], [S, ...n.transfer || []])
        }),
        r = a({});
    return r.withOptions = a, r
}
const C = "web-sandbox.oaiusercontent.com",
    A = `https://${C}`,
    {
        origin: u,
        protocol: R
    } = new URL(A),
    M = [u, "https://cdn.jsdelivr.net", "https://cdn.tailwindcss.com", "https://esm.sh", "https://unpkg.com", "https://pypi.org", "https://files.pythonhosted.org"];
export {
    M as C, A as L, u as a, R as b, L as m
};
//# sourceMappingURL=7517017f-efd9iwaiway92n98.js.map