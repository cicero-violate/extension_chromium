import {
    r as P,
    j as W
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    w as mt
} from "./1a1bda43-ccqt51bvbkt9kl39.js";
const k = new WeakMap,
    U = new WeakMap,
    j = {
        current: []
    };
let Q = !1,
    I = 0;
const T = new Set,
    C = new Map;

function ut(a) {
    const r = Array.from(a).sort((e, t) => e instanceof E && e.options.deps.includes(t) ? 1 : t instanceof E && t.options.deps.includes(e) ? -1 : 0);
    for (const e of r) {
        if (j.current.includes(e)) continue;
        j.current.push(e), e.recompute();
        const t = U.get(e);
        if (t)
            for (const s of t) {
                const i = k.get(s);
                i && ut(i)
            }
    }
}

function Mt(a) {
    a.listeners.forEach(r => r({
        prevVal: a.prevState,
        currentVal: a.state
    }))
}

function gt(a) {
    a.listeners.forEach(r => r({
        prevVal: a.prevState,
        currentVal: a.state
    }))
}

function ct(a) {
    if (I > 0 && !C.has(a) && C.set(a, a.prevState), T.add(a), !(I > 0) && !Q) try {
        for (Q = !0; T.size > 0;) {
            const r = Array.from(T);
            T.clear();
            for (const e of r) {
                const t = C.get(e) ? ? e.prevState;
                e.prevState = t, Mt(e)
            }
            for (const e of r) {
                const t = k.get(e);
                t && (j.current.push(e), ut(t))
            }
            for (const e of r) {
                const t = k.get(e);
                if (t)
                    for (const s of t) gt(s)
            }
        }
    } finally {
        Q = !1, j.current = [], C.clear()
    }
}

function w(a) {
    I++;
    try {
        a()
    } finally {
        if (I--, I === 0) {
            const r = Array.from(T)[0];
            r && ct(r)
        }
    }
}
class x {
    constructor(r, e) {
        this.listeners = new Set, this.subscribe = t => {
            var s, i;
            this.listeners.add(t);
            const n = (i = (s = this.options) == null ? void 0 : s.onSubscribe) == null ? void 0 : i.call(s, t, this);
            return () => {
                this.listeners.delete(t), n ? .()
            }
        }, this.setState = t => {
            var s, i, n;
            this.prevState = this.state, this.state = (s = this.options) != null && s.updateFn ? this.options.updateFn(this.prevState)(t) : t(this.prevState), (n = (i = this.options) == null ? void 0 : i.onUpdate) == null || n.call(i), ct(this)
        }, this.prevState = r, this.state = r, this.options = e
    }
}
class E {
    constructor(r) {
        this.listeners = new Set, this._subscriptions = [], this.lastSeenDepValues = [], this.getDepVals = () => {
            const e = [],
                t = [];
            for (const s of this.options.deps) e.push(s.prevState), t.push(s.state);
            return this.lastSeenDepValues = t, {
                prevDepVals: e,
                currDepVals: t,
                prevVal: this.prevState ? ? void 0
            }
        }, this.recompute = () => {
            var e, t;
            this.prevState = this.state;
            const {
                prevDepVals: s,
                currDepVals: i,
                prevVal: n
            } = this.getDepVals();
            this.state = this.options.fn({
                prevDepVals: s,
                currDepVals: i,
                prevVal: n
            }), (t = (e = this.options).onUpdate) == null || t.call(e)
        }, this.checkIfRecalculationNeededDeeply = () => {
            for (const i of this.options.deps) i instanceof E && i.checkIfRecalculationNeededDeeply();
            let e = !1;
            const t = this.lastSeenDepValues,
                {
                    currDepVals: s
                } = this.getDepVals();
            for (let i = 0; i < s.length; i++)
                if (s[i] !== t[i]) {
                    e = !0;
                    break
                }
            e && this.recompute()
        }, this.mount = () => (this.registerOnGraph(), this.checkIfRecalculationNeededDeeply(), () => {
            this.unregisterFromGraph();
            for (const e of this._subscriptions) e()
        }), this.subscribe = e => {
            var t, s;
            this.listeners.add(e);
            const i = (s = (t = this.options).onSubscribe) == null ? void 0 : s.call(t, e, this);
            return () => {
                this.listeners.delete(e), i ? .()
            }
        }, this.options = r, this.state = r.fn({
            prevDepVals: void 0,
            prevVal: void 0,
            currDepVals: this.getDepVals().currDepVals
        })
    }
    registerOnGraph(r = this.options.deps) {
        for (const e of r)
            if (e instanceof E) e.registerOnGraph(), this.registerOnGraph(e.options.deps);
            else if (e instanceof x) {
            let t = k.get(e);
            t || (t = new Set, k.set(e, t)), t.add(this);
            let s = U.get(this);
            s || (s = new Set, U.set(this, s)), s.add(e)
        }
    }
    unregisterFromGraph(r = this.options.deps) {
        for (const e of r)
            if (e instanceof E) this.unregisterFromGraph(e.options.deps);
            else if (e instanceof x) {
            const t = k.get(e);
            t && t.delete(this);
            const s = U.get(this);
            s && s.delete(e)
        }
    }
}

function G(a, r) {
    return typeof a == "function" ? a(r) : a
}

function dt(a, r) {
    return at(r).reduce((t, s) => {
        if (t === null) return null;
        if (typeof t < "u") return t[s]
    }, a)
}

function X(a, r, e) {
    const t = at(r);

    function s(i) {
        if (!t.length) return G(e, i);
        const n = t.shift();
        if (typeof n == "string" || typeof n == "number" && !Array.isArray(i)) return typeof i == "object" ? (i === null && (i = {}), { ...i,
            [n]: s(i[n])
        }) : {
            [n]: s()
        };
        if (Array.isArray(i) && typeof n == "number") {
            const l = i.slice(0, n);
            return [...l.length ? l : new Array(n), s(i[n]), ...i.slice(n + 1)]
        }
        return [...new Array(n), s()]
    }
    return s(a)
}

function yt(a, r) {
    const e = at(r);

    function t(s) {
        if (!s) return;
        if (e.length === 1) {
            const n = e[0];
            if (Array.isArray(s) && typeof n == "number") return s.filter((u, c) => c !== n);
            const {
                [n]: l, ...v
            } = s;
            return v
        }
        const i = e.shift();
        if (typeof i == "string" && typeof s == "object") return { ...s,
            [i]: t(s[i])
        };
        if (typeof i == "number" && Array.isArray(s)) {
            if (i >= s.length) return s;
            const n = s.slice(0, i);
            return [...n.length ? n : new Array(i), t(s[i]), ...s.slice(i + 1)]
        }
        throw new Error("It seems we have created an infinite loop in deleteBy. ")
    }
    return t(a)
}
const bt = /^(\d*)$/gm,
    Ft = /\.(\d*)\./gm,
    St = /^(\d*)\./gm,
    Vt = /\.(\d*$)/gm,
    _t = /\.{2,}/gm,
    tt = "__int__",
    B = `${tt}$1`;

function at(a) {
    if (Array.isArray(a)) return [...a];
    if (typeof a != "string") throw new Error("Path must be a string.");
    return a.replace(/\[/g, ".").replace(/\]/g, "").replace(bt, B).replace(Ft, `.${B}.`).replace(St, `${B}.`).replace(Vt, `.${B}`).replace(_t, ".").split(".").map(r => r.indexOf(tt) === 0 ? parseInt(r.substring(tt.length), 10) : r)
}

function Et(a) {
    return !(Array.isArray(a) && a.length === 0)
}

function et(a, r) {
    const {
        asyncDebounceMs: e
    } = r, {
        onChangeAsync: t,
        onBlurAsync: s,
        onSubmitAsync: i,
        onBlurAsyncDebounceMs: n,
        onChangeAsyncDebounceMs: l
    } = r.validators || {}, v = e ? ? 0, u = {
        cause: "change",
        validate: t,
        debounceMs: l ? ? v
    }, c = {
        cause: "blur",
        validate: s,
        debounceMs: n ? ? v
    }, d = {
        cause: "submit",
        validate: i,
        debounceMs: 0
    }, o = h => ({ ...h,
        debounceMs: 0
    });
    switch (a) {
        case "submit":
            return [o(u), o(c), d];
        case "blur":
            return [c];
        case "change":
            return [u];
        default:
            return []
    }
}

function st(a, r) {
    const {
        onChange: e,
        onBlur: t,
        onSubmit: s,
        onMount: i
    } = r.validators || {}, n = {
        cause: "change",
        validate: e
    }, l = {
        cause: "blur",
        validate: t
    }, v = {
        cause: "submit",
        validate: s
    }, u = {
        cause: "mount",
        validate: i
    }, c = {
        cause: "server",
        validate: () => {}
    };
    switch (a) {
        case "mount":
            return [u];
        case "submit":
            return [n, l, v, c];
        case "server":
            return [c];
        case "blur":
            return [l, c];
        default:
            return [n, c]
    }
}
const ht = a => !!a && typeof a == "object" && "fields" in a;

function Y(a, r) {
    if (Object.is(a, r)) return !0;
    if (typeof a != "object" || a === null || typeof r != "object" || r === null) return !1;
    if (a instanceof Map && r instanceof Map) {
        if (a.size !== r.size) return !1;
        for (const [t, s] of a)
            if (!r.has(t) || !Object.is(s, r.get(t))) return !1;
        return !0
    }
    if (a instanceof Set && r instanceof Set) {
        if (a.size !== r.size) return !1;
        for (const t of a)
            if (!r.has(t)) return !1;
        return !0
    }
    const e = Object.keys(a);
    if (e.length !== Object.keys(r).length) return !1;
    for (let t = 0; t < e.length; t++)
        if (!Object.prototype.hasOwnProperty.call(r, e[t]) || !Object.is(a[e[t]], r[e[t]])) return !1;
    return !0
}

function wt(a) {
    const r = new Map;
    for (const e of a) {
        const t = [...e.path ? ? []].map(s => {
            const i = typeof s == "object" ? s.key : s;
            return typeof i == "number" ? `[${i}]` : i
        }).join(".").replace(/\.\[/g, "[");
        r.set(t, (r.get(t) ? ? []).concat(e))
    }
    return Object.fromEntries(r)
}
const At = a => a,
    kt = a => {
        const r = wt(a);
        return {
            form: r,
            fields: r
        }
    },
    ot = (a, r) => a === "form" ? kt(r) : At(r),
    ft = {
        validate({
            value: a,
            validationSource: r
        }, e) {
            const t = e["~standard"].validate(a);
            if (t instanceof Promise) throw new Error("async function passed to sync validator");
            if (t.issues) return ot(r, t.issues)
        },
        async validateAsync({
            value: a,
            validationSource: r
        }, e) {
            const t = await e["~standard"].validate(a);
            if (t.issues) return ot(r, t.issues)
        }
    },
    vt = a => !!a && "~standard" in a,
    N = {
        isValidating: !1,
        isTouched: !1,
        isBlurred: !1,
        isDirty: !1,
        isPristine: !0,
        errors: [],
        errorMap: {}
    };

function z(a) {
    function r(d, o, h, f) {
        const p = t(d, o, h, f);
        ({
            insert: () => l(p, d, o),
            remove: () => v(p),
            swap: () => f !== void 0 && c(p, d, o, f),
            move: () => f !== void 0 && u(p, d, o, f)
        })[h]()
    }

    function e(d, o) {
        return `${d}[${o}]`
    }

    function t(d, o, h, f) {
        const p = [e(d, o)];
        if (h === "swap") p.push(e(d, f));
        else if (h === "move") {
            const [m, y] = [Math.min(o, f), Math.max(o, f)];
            for (let M = m; M <= y; M++) p.push(e(d, M))
        } else {
            const m = a.getFieldValue(d),
                y = Array.isArray(m) ? m.length : 0;
            for (let M = o + 1; M < y; M++) p.push(e(d, M))
        }
        return Object.keys(a.fieldInfo).filter(m => p.some(y => m.startsWith(y)))
    }

    function s(d, o) {
        return d.replace(/\[(\d+)\]/, (h, f) => {
            const p = parseInt(f, 10);
            return `[${o==="up"?p+1:Math.max(0,p-1)}]`
        })
    }

    function i(d, o) {
        (o === "up" ? d : [...d].reverse()).forEach(f => {
            const p = s(f.toString(), o),
                m = a.getFieldMeta(p);
            m ? a.setFieldMeta(f, m) : a.setFieldMeta(f, n())
        })
    }
    const n = () => N,
        l = (d, o, h) => {
            i(d, "down"), d.forEach(f => {
                f.toString().startsWith(e(o, h)) && a.setFieldMeta(f, n())
            })
        },
        v = d => {
            i(d, "up")
        },
        u = (d, o, h, f) => {
            const p = new Map(Object.keys(a.fieldInfo).filter(m => m.startsWith(e(o, h))).map(m => [m, a.getFieldMeta(m)]));
            i(d, h < f ? "up" : "down"), Object.keys(a.fieldInfo).filter(m => m.startsWith(e(o, f))).forEach(m => {
                const y = m.replace(e(o, f), e(o, h)),
                    M = p.get(y);
                M && a.setFieldMeta(m, M)
            })
        },
        c = (d, o, h, f) => {
            d.forEach(p => {
                if (!p.toString().startsWith(e(o, h))) return;
                const m = p.toString().replace(e(o, h), e(o, f)),
                    [y, M] = [a.getFieldMeta(p), a.getFieldMeta(m)];
                y && a.setFieldMeta(m, y), M && a.setFieldMeta(p, M)
            })
        };
    return {
        handleArrayFieldMetaShift: r
    }
}

function Z(a) {
    return {
        values: a.values ? ? {},
        errorMap: a.errorMap ? ? {},
        fieldMetaBase: a.fieldMetaBase ? ? {},
        isSubmitted: a.isSubmitted ? ? !1,
        isSubmitting: a.isSubmitting ? ? !1,
        isValidating: a.isValidating ? ? !1,
        submissionAttempts: a.submissionAttempts ? ? 0,
        isSubmitSuccessful: a.isSubmitSuccessful ? ? !1,
        validationMetaMap: a.validationMetaMap ? ? {
            onChange: void 0,
            onBlur: void 0,
            onSubmit: void 0,
            onMount: void 0,
            onServer: void 0
        }
    }
}
class Ot {
    constructor(r) {
        var e;
        this.options = {}, this.fieldInfo = {}, this.prevTransformArray = [], this.cumulativeFieldsErrorMap = {}, this.mount = () => {
            const t = this.fieldMetaDerived.mount(),
                s = this.store.mount(),
                i = () => {
                    t(), s()
                },
                {
                    onMount: n
                } = this.options.validators || {};
            return n && this.validateSync("mount"), i
        }, this.update = t => {
            var s, i;
            if (!t) return;
            const n = this.options;
            this.options = t;
            const l = !!((i = (s = t.transform) == null ? void 0 : s.deps) != null && i.some((c, d) => c !== this.prevTransformArray[d])),
                v = t.defaultValues && !Y(t.defaultValues, n.defaultValues) && !this.state.isTouched,
                u = !Y(t.defaultState, n.defaultState) && !this.state.isTouched;
            !v && !u && !l || w(() => {
                this.baseStore.setState(() => Z(Object.assign({}, this.state, u ? t.defaultState : {}, v ? {
                    values: t.defaultValues
                } : {}, l ? {
                    _force_re_eval: !this.state._force_re_eval
                } : {})))
            })
        }, this.reset = (t, s) => {
            const {
                fieldMeta: i
            } = this.state, n = this.resetFieldMeta(i);
            t && !s ? .keepDefaultValues && (this.options = { ...this.options,
                defaultValues: t
            }), this.baseStore.setState(() => {
                var l;
                return Z({ ...this.options.defaultState,
                    values: t ? ? this.options.defaultValues ? ? ((l = this.options.defaultState) == null ? void 0 : l.values),
                    fieldMetaBase: n
                })
            })
        }, this.validateAllFields = async t => {
            const s = [];
            return w(() => {
                Object.values(this.fieldInfo).forEach(n => {
                    if (!n.instance) return;
                    const l = n.instance;
                    s.push(Promise.resolve().then(() => l.validate(t, {
                        skipFormValidation: !0
                    }))), n.instance.state.meta.isTouched || n.instance.setMeta(v => ({ ...v,
                        isTouched: !0
                    }))
                })
            }), (await Promise.all(s)).flat()
        }, this.validateArrayFieldsStartingFrom = async (t, s, i) => {
            const n = this.getFieldValue(t),
                l = Array.isArray(n) ? Math.max(n.length - 1, 0) : null,
                v = [`${t}[${s}]`];
            for (let o = s + 1; o <= (l ? ? 0); o++) v.push(`${t}[${o}]`);
            const u = Object.keys(this.fieldInfo).filter(o => v.some(h => o.startsWith(h))),
                c = [];
            return w(() => {
                u.forEach(o => {
                    c.push(Promise.resolve().then(() => this.validateField(o, i)))
                })
            }), (await Promise.all(c)).flat()
        }, this.validateField = (t, s) => {
            var i;
            const n = (i = this.fieldInfo[t]) == null ? void 0 : i.instance;
            return n ? (n.state.meta.isTouched || n.setMeta(l => ({ ...l,
                isTouched: !0
            })), n.validate(s)) : []
        }, this.validateSync = t => {
            const s = st(t, this.options);
            let i = !1;
            const n = {};
            return w(() => {
                var l;
                for (const u of s) {
                    if (!u.validate) continue;
                    const c = this.runValidator({
                            validate: u.validate,
                            value: {
                                value: this.state.values,
                                formApi: this,
                                validationSource: "form"
                            },
                            type: "validate"
                        }),
                        {
                            formError: d,
                            fieldErrors: o
                        } = it(c),
                        h = L(u.cause);
                    if (o)
                        for (const [f, p] of Object.entries(o)) {
                            const y = { ...this.cumulativeFieldsErrorMap[f] || {},
                                [h]: p
                            };
                            n[f] = y, this.cumulativeFieldsErrorMap[f] = y;
                            const M = this.getFieldMeta(f);
                            M && M.errorMap[h] !== p && this.setFieldMeta(f, b => ({ ...b,
                                errorMap: { ...b.errorMap,
                                    [h]: p
                                }
                            }))
                        }
                    for (const f of Object.keys(this.cumulativeFieldsErrorMap)) {
                        const p = this.getFieldMeta(f);
                        p ? .errorMap[h] && !((l = n[f]) != null && l[h]) && (this.cumulativeFieldsErrorMap[f] = { ...this.cumulativeFieldsErrorMap[f],
                            [h]: void 0
                        }, this.setFieldMeta(f, m => ({ ...m,
                            errorMap: { ...m.errorMap,
                                [h]: void 0
                            }
                        })))
                    }
                    this.state.errorMap[h] !== d && this.baseStore.setState(f => ({ ...f,
                        errorMap: { ...f.errorMap,
                            [h]: d
                        }
                    })), (d || o) && (i = !0)
                }
                const v = L("submit");
                this.state.errorMap[v] && t !== "submit" && !i && this.baseStore.setState(u => ({ ...u,
                    errorMap: { ...u.errorMap,
                        [v]: void 0
                    }
                }))
            }), {
                hasErrored: i,
                fieldsErrorMap: n
            }
        }, this.validateAsync = async t => {
            const s = et(t, this.options);
            this.state.isFormValidating || this.baseStore.setState(u => ({ ...u,
                isFormValidating: !0
            }));
            const i = [];
            let n;
            for (const u of s) {
                if (!u.validate) continue;
                const c = L(u.cause),
                    d = this.state.validationMetaMap[c];
                d ? .lastAbortController.abort();
                const o = new AbortController;
                this.state.validationMetaMap[c] = {
                    lastAbortController: o
                }, i.push(new Promise(async h => {
                    let f;
                    try {
                        f = await new Promise((M, b) => {
                            setTimeout(async () => {
                                if (o.signal.aborted) return M(void 0);
                                try {
                                    M(await this.runValidator({
                                        validate: u.validate,
                                        value: {
                                            value: this.state.values,
                                            formApi: this,
                                            validationSource: "form",
                                            signal: o.signal
                                        },
                                        type: "validateAsync"
                                    }))
                                } catch (S) {
                                    b(S)
                                }
                            }, u.debounceMs)
                        })
                    } catch (M) {
                        f = M
                    }
                    const {
                        formError: p,
                        fieldErrors: m
                    } = it(f);
                    m && (n = n ? { ...n,
                        ...m
                    } : m);
                    const y = L(u.cause);
                    if (n)
                        for (const [M, b] of Object.entries(n)) {
                            const S = this.getFieldMeta(M);
                            S && S.errorMap[y] !== b && this.setFieldMeta(M, A => ({ ...A,
                                errorMap: { ...A.errorMap,
                                    [y]: b
                                }
                            }))
                        }
                    this.baseStore.setState(M => ({ ...M,
                        errorMap: { ...M.errorMap,
                            [y]: p
                        }
                    })), h(n ? {
                        fieldErrors: n,
                        errorMapKey: y
                    } : void 0)
                }))
            }
            let l = [];
            const v = {};
            if (i.length) {
                l = await Promise.all(i);
                for (const u of l)
                    if (u ? .fieldErrors) {
                        const {
                            errorMapKey: c
                        } = u;
                        for (const [d, o] of Object.entries(u.fieldErrors)) {
                            const f = { ...v[d] || {},
                                [c]: o
                            };
                            v[d] = f
                        }
                    }
            }
            return this.baseStore.setState(u => ({ ...u,
                isFormValidating: !1
            })), v
        }, this.validate = t => {
            const {
                hasErrored: s,
                fieldsErrorMap: i
            } = this.validateSync(t);
            return s && !this.options.asyncAlways ? i : this.validateAsync(t)
        }, this.getFieldValue = t => dt(this.state.values, t), this.getFieldMeta = t => this.state.fieldMeta[t], this.getFieldInfo = t => {
            var s;
            return (s = this.fieldInfo)[t] || (s[t] = {
                instance: null,
                validationMetaMap: {
                    onChange: void 0,
                    onBlur: void 0,
                    onSubmit: void 0,
                    onMount: void 0,
                    onServer: void 0
                }
            })
        }, this.setFieldMeta = (t, s) => {
            this.baseStore.setState(i => ({ ...i,
                fieldMetaBase: { ...i.fieldMetaBase,
                    [t]: G(s, i.fieldMetaBase[t])
                }
            }))
        }, this.resetFieldMeta = t => Object.keys(t).reduce((s, i) => {
            const n = i;
            return s[n] = N, s
        }, {}), this.setFieldValue = (t, s, i) => {
            const n = i ? .dontUpdateMeta ? ? !1;
            w(() => {
                n || this.setFieldMeta(t, l => ({ ...l,
                    isTouched: !0,
                    isDirty: !0,
                    errorMap: { ...l ? .errorMap,
                        onMount : void 0
                    }
                })), this.baseStore.setState(l => ({ ...l,
                    values: X(l.values, t, s)
                }))
            })
        }, this.deleteField = t => {
            const i = [...Object.keys(this.fieldInfo).filter(n => {
                const l = t.toString();
                return n !== l && n.startsWith(l)
            }), t];
            this.baseStore.setState(n => {
                const l = { ...n
                };
                return i.forEach(v => {
                    l.values = yt(l.values, v), delete this.fieldInfo[v], delete l.fieldMetaBase[v]
                }), l
            })
        }, this.pushFieldValue = (t, s, i) => {
            this.setFieldValue(t, n => [...Array.isArray(n) ? n : [], s], i), this.validateField(t, "change")
        }, this.insertFieldValue = async (t, s, i, n) => {
            this.setFieldValue(t, l => [...l.slice(0, s), i, ...l.slice(s)], n), await this.validateField(t, "change"), z(this).handleArrayFieldMetaShift(t, s, "insert"), await this.validateArrayFieldsStartingFrom(t, s, "change")
        }, this.replaceFieldValue = async (t, s, i, n) => {
            this.setFieldValue(t, l => l.map((v, u) => u === s ? i : v), n), await this.validateField(t, "change"), await this.validateArrayFieldsStartingFrom(t, s, "change")
        }, this.removeFieldValue = async (t, s, i) => {
            const n = this.getFieldValue(t),
                l = Array.isArray(n) ? Math.max(n.length - 1, 0) : null;
            if (this.setFieldValue(t, v => v.filter((u, c) => c !== s), i), z(this).handleArrayFieldMetaShift(t, s, "remove"), l !== null) {
                const v = `${t}[${l}]`;
                this.deleteField(v)
            }
            await this.validateField(t, "change"), await this.validateArrayFieldsStartingFrom(t, s, "change")
        }, this.swapFieldValues = (t, s, i, n) => {
            this.setFieldValue(t, l => {
                const v = l[s],
                    u = l[i];
                return X(X(l, `${s}`, u), `${i}`, v)
            }, n), z(this).handleArrayFieldMetaShift(t, s, "swap", i), this.validateField(t, "change"), this.validateField(`${t}[${s}]`, "change"), this.validateField(`${t}[${i}]`, "change")
        }, this.moveFieldValues = (t, s, i, n) => {
            this.setFieldValue(t, l => (l.splice(i, 0, l.splice(s, 1)[0]), l), n), z(this).handleArrayFieldMetaShift(t, s, "move", i), this.validateField(t, "change"), this.validateField(`${t}[${s}]`, "change"), this.validateField(`${t}[${i}]`, "change")
        }, this.resetField = t => {
            this.baseStore.setState(s => ({ ...s,
                fieldMetaBase: { ...s.fieldMetaBase,
                    [t]: N
                },
                values: { ...s.values,
                    [t]: this.options.defaultValues && this.options.defaultValues[t]
                }
            }))
        }, this.getAllErrors = () => ({
            form: {
                errors: this.state.errors,
                errorMap: this.state.errorMap
            },
            fields: Object.entries(this.state.fieldMeta).reduce((t, [s, i]) => (Object.keys(i).length && i.errors.length && (t[s] = {
                errors: i.errors,
                errorMap: i.errorMap
            }), t), {})
        }), this.baseStore = new x(Z({ ...r ? .defaultState,
            values : r ? .defaultValues ? ? ((e = r ? .defaultState) == null ? void 0 : e.values)
        })), this.fieldMetaDerived = new E({
            deps: [this.baseStore],
            fn: ({
                prevDepVals: t,
                currDepVals: s,
                prevVal: i
            }) => {
                var n;
                const l = i,
                    v = t ? .[0],
                    u = s[0];
                let c = 0;
                const d = {};
                for (const o of Object.keys(u.fieldMetaBase)) {
                    const h = u.fieldMetaBase[o],
                        f = v ? .fieldMetaBase[o],
                        p = l ? .[o];
                    let m = p ? .errors;
                    if (!f || h.errorMap !== f.errorMap) {
                        m = Object.values(h.errorMap ? ? {}).filter(b => b !== void 0);
                        const M = (n = this.getFieldInfo(o)) == null ? void 0 : n.instance;
                        M && !M.options.disableErrorFlat && (m = m ? .flat(1))
                    }
                    const y = !h.isDirty;
                    if (p && p.isPristine === y && p.errors === m && h === f) {
                        d[o] = p, c++;
                        continue
                    }
                    d[o] = { ...h,
                        errors: m,
                        isPristine: y
                    }
                }
                return Object.keys(u.fieldMetaBase).length && l && c === Object.keys(u.fieldMetaBase).length ? l : d
            }
        }), this.store = new E({
            deps: [this.baseStore, this.fieldMetaDerived],
            fn: ({
                prevDepVals: t,
                currDepVals: s,
                prevVal: i
            }) => {
                var n, l, v, u;
                const c = i,
                    d = t ? .[0],
                    o = s[0],
                    h = Object.values(o.fieldMetaBase),
                    f = h.some(g => g ? .isValidating),
                    p = !h.some(g => g ? .errorMap && Et(Object.values(g.errorMap).filter(Boolean))),
                    m = h.some(g => g ? .isTouched),
                    y = h.some(g => g ? .isBlurred),
                    M = m && ((n = o ? .errorMap) == null ? void 0 : n.onMount),
                    b = h.some(g => g ? .isDirty),
                    S = !b,
                    A = !!((l = o.errorMap) != null && l.onMount || h.some(g => {
                        var V;
                        return (V = g ? .errorMap) == null ? void 0 : V.onMount
                    })),
                    K = !!f;
                let _ = c ? .errors ? ? [];
                (!d || o.errorMap !== d.errorMap) && (_ = Object.values(o.errorMap).reduce((g, V) => V === void 0 ? g : V && ht(V) ? (g.push(V.form), g) : (g.push(V), g), []));
                const F = _.length === 0,
                    O = p && F,
                    H = this.options.canSubmitWhenInvalid ? ? !1,
                    nt = o.submissionAttempts === 0 && !m && !A || !K && !o.isSubmitting && O || H;
                let $ = o.errorMap;
                if (M && (_ = _.filter(g => g !== o.errorMap.onMount), $ = Object.assign($, {
                        onMount: void 0
                    })), c && d && c.errorMap === $ && c.fieldMeta === this.fieldMetaDerived.state && c.errors === _ && c.isFieldsValidating === f && c.isFieldsValid === p && c.isFormValid === F && c.isValid === O && c.canSubmit === nt && c.isTouched === m && c.isBlurred === y && c.isPristine === S && c.isDirty === b && Y(d, o)) return c;
                let q = { ...o,
                    errorMap: $,
                    fieldMeta: this.fieldMetaDerived.state,
                    errors: _,
                    isFieldsValidating: f,
                    isFieldsValid: p,
                    isFormValid: F,
                    isValid: O,
                    canSubmit: nt,
                    isTouched: m,
                    isBlurred: y,
                    isPristine: S,
                    isDirty: b
                };
                const J = ((v = this.options.transform) == null ? void 0 : v.deps) ? ? [];
                if (J.length !== this.prevTransformArray.length || J.some((g, V) => g !== this.prevTransformArray[V])) {
                    const g = Object.assign({}, this, {
                        state: q
                    });
                    (u = this.options.transform) == null || u.fn(g), q = g.state, this.prevTransformArray = J
                }
                return q
            }
        }), this.handleSubmit = this.handleSubmit.bind(this), this.update(r || {})
    }
    get state() {
        return this.store.state
    }
    runValidator(r) {
        return vt(r.validate) ? ft[r.type](r.value, r.validate) : r.validate(r.value)
    }
    async handleSubmit(r) {
        var e, t, s, i, n, l;
        if (this.baseStore.setState(u => ({ ...u,
                isSubmitted: !1,
                submissionAttempts: u.submissionAttempts + 1,
                isSubmitSuccessful: !1
            })), !this.state.canSubmit) return;
        this.baseStore.setState(u => ({ ...u,
            isSubmitting: !0
        }));
        const v = () => {
            this.baseStore.setState(u => ({ ...u,
                isSubmitting: !1
            }))
        };
        if (await this.validateAllFields("submit"), !this.state.isFieldsValid) {
            v(), (t = (e = this.options).onSubmitInvalid) == null || t.call(e, {
                value: this.state.values,
                formApi: this
            });
            return
        }
        if (await this.validate("submit"), !this.state.isValid) {
            v(), (i = (s = this.options).onSubmitInvalid) == null || i.call(s, {
                value: this.state.values,
                formApi: this
            });
            return
        }
        w(() => {
            Object.values(this.fieldInfo).forEach(u => {
                var c, d, o;
                (o = (d = (c = u.instance) == null ? void 0 : c.options.listeners) == null ? void 0 : d.onSubmit) == null || o.call(d, {
                    value: u.instance.state.value,
                    fieldApi: u.instance
                })
            })
        });
        try {
            await ((l = (n = this.options).onSubmit) == null ? void 0 : l.call(n, {
                value: this.state.values,
                formApi: this,
                meta: r ? ? this.options.onSubmitMeta
            })), w(() => {
                this.baseStore.setState(u => ({ ...u,
                    isSubmitted: !0,
                    isSubmitSuccessful: !0
                })), v()
            })
        } catch (u) {
            throw this.baseStore.setState(c => ({ ...c,
                isSubmitSuccessful: !1
            })), v(), u
        }
    }
    setErrorMap(r) {
        this.baseStore.setState(e => ({ ...e,
            errorMap: { ...e.errorMap,
                ...r
            }
        }))
    }
}

function it(a) {
    if (a) {
        if (ht(a)) {
            const r = it(a.form).formError,
                e = a.fields;
            return {
                formError: r,
                fieldErrors: e
            }
        }
        return {
            formError: a
        }
    }
    return {
        formError: void 0
    }
}

function L(a) {
    switch (a) {
        case "submit":
            return "onSubmit";
        case "blur":
            return "onBlur";
        case "mount":
            return "onMount";
        case "server":
            return "onServer";
        default:
            return "onChange"
    }
}
class Dt {
    constructor(r) {
        this.options = {}, this.mount = () => {
            var e, t;
            const s = this.store.mount();
            this.options.defaultValue !== void 0 && this.form.setFieldValue(this.name, this.options.defaultValue, {
                dontUpdateMeta: !0
            });
            const i = this.getInfo();
            i.instance = this, this.update(this.options);
            const {
                onMount: n
            } = this.options.validators || {};
            if (n) {
                const l = this.runValidator({
                    validate: n,
                    value: {
                        value: this.state.value,
                        fieldApi: this,
                        validationSource: "field"
                    },
                    type: "validate"
                });
                l && this.setMeta(v => ({ ...v,
                    errorMap: { ...v ? .errorMap,
                        onMount : l
                    }
                }))
            }
            return (t = (e = this.options.listeners) == null ? void 0 : e.onMount) == null || t.call(e, {
                value: this.state.value,
                fieldApi: this
            }), s
        }, this.update = e => {
            this.options = e;
            const t = this.name !== e.name;
            if (this.name = e.name, this.state.value === void 0) {
                const s = dt(e.form.options.defaultValues, e.name),
                    i = e.defaultValue ? ? s;
                t ? this.setValue(n => n || i, {
                    dontUpdateMeta: !0
                }) : i !== void 0 && this.setValue(i, {
                    dontUpdateMeta: !0
                })
            }
            this.form.getFieldMeta(this.name) === void 0 && this.setMeta(this.state.meta)
        }, this.getValue = () => this.form.getFieldValue(this.name), this.setValue = (e, t) => {
            var s, i;
            this.form.setFieldValue(this.name, e, t), (i = (s = this.options.listeners) == null ? void 0 : s.onChange) == null || i.call(s, {
                value: this.state.value,
                fieldApi: this
            }), this.validate("change")
        }, this.getMeta = () => this.store.state.meta, this.setMeta = e => this.form.setFieldMeta(this.name, e), this.getInfo = () => this.form.getFieldInfo(this.name), this.pushValue = (e, t) => {
            var s, i;
            this.form.pushFieldValue(this.name, e, t), (i = (s = this.options.listeners) == null ? void 0 : s.onChange) == null || i.call(s, {
                value: this.state.value,
                fieldApi: this
            })
        }, this.insertValue = (e, t, s) => {
            var i, n;
            this.form.insertFieldValue(this.name, e, t, s), (n = (i = this.options.listeners) == null ? void 0 : i.onChange) == null || n.call(i, {
                value: this.state.value,
                fieldApi: this
            })
        }, this.replaceValue = (e, t, s) => {
            var i, n;
            this.form.replaceFieldValue(this.name, e, t, s), (n = (i = this.options.listeners) == null ? void 0 : i.onChange) == null || n.call(i, {
                value: this.state.value,
                fieldApi: this
            })
        }, this.removeValue = (e, t) => {
            var s, i;
            this.form.removeFieldValue(this.name, e, t), (i = (s = this.options.listeners) == null ? void 0 : s.onChange) == null || i.call(s, {
                value: this.state.value,
                fieldApi: this
            })
        }, this.swapValues = (e, t, s) => {
            var i, n;
            this.form.swapFieldValues(this.name, e, t, s), (n = (i = this.options.listeners) == null ? void 0 : i.onChange) == null || n.call(i, {
                value: this.state.value,
                fieldApi: this
            })
        }, this.moveValue = (e, t, s) => {
            var i, n;
            this.form.moveFieldValues(this.name, e, t, s), (n = (i = this.options.listeners) == null ? void 0 : i.onChange) == null || n.call(i, {
                value: this.state.value,
                fieldApi: this
            })
        }, this.getLinkedFields = e => {
            const t = Object.values(this.form.fieldInfo),
                s = [];
            for (const i of t) {
                if (!i.instance) continue;
                const {
                    onChangeListenTo: n,
                    onBlurListenTo: l
                } = i.instance.options.validators || {};
                e === "change" && n ? .includes(this.name) && s.push(i.instance), e === "blur" && l ? .includes(this.name) && s.push(i.instance)
            }
            return s
        }, this.validateSync = (e, t) => {
            const s = st(e, this.options),
                n = this.getLinkedFields(e).reduce((u, c) => {
                    const d = st(e, c.options);
                    return d.forEach(o => {
                        o.field = c
                    }), u.concat(d)
                }, []);
            let l = !1;
            w(() => {
                const u = (c, d) => {
                    const o = D(d.cause),
                        h = d.validate ? lt(c.runValidator({
                            validate: d.validate,
                            value: {
                                value: c.store.state.value,
                                validationSource: "field",
                                fieldApi: c
                            },
                            type: "validate"
                        })) : t[o];
                    c.state.meta.errorMap[o] !== h && c.setMeta(f => ({ ...f,
                        errorMap: { ...f.errorMap,
                            [D(d.cause)]: h || t[o]
                        }
                    })), (h || t[o]) && (l = !0)
                };
                for (const c of s) u(this, c);
                for (const c of n) c.validate && u(c.field, c)
            });
            const v = D("submit");
            return this.state.meta.errorMap[v] && e !== "submit" && !l && this.setMeta(u => ({ ...u,
                errorMap: { ...u.errorMap,
                    [v]: void 0
                }
            })), {
                hasErrored: l
            }
        }, this.validateAsync = async (e, t) => {
            const s = et(e, this.options),
                i = await t,
                n = this.getLinkedFields(e),
                l = n.reduce((o, h) => {
                    const f = et(e, h.options);
                    return f.forEach(p => {
                        p.field = h
                    }), o.concat(f)
                }, []);
            this.state.meta.isValidating || this.setMeta(o => ({ ...o,
                isValidating: !0
            }));
            for (const o of n) o.setMeta(h => ({ ...h,
                isValidating: !0
            }));
            const v = [],
                u = [],
                c = (o, h, f) => {
                    const p = D(h.cause),
                        m = o.getInfo().validationMetaMap[p];
                    m ? .lastAbortController.abort();
                    const y = new AbortController;
                    this.getInfo().validationMetaMap[p] = {
                        lastAbortController: y
                    }, f.push(new Promise(async M => {
                        var b;
                        let S;
                        try {
                            S = await new Promise((F, O) => {
                                this.timeoutIds[h.cause] && clearTimeout(this.timeoutIds[h.cause]), this.timeoutIds[h.cause] = setTimeout(async () => {
                                    if (y.signal.aborted) return F(void 0);
                                    try {
                                        F(await this.runValidator({
                                            validate: h.validate,
                                            value: {
                                                value: o.store.state.value,
                                                fieldApi: o,
                                                signal: y.signal,
                                                validationSource: "field"
                                            },
                                            type: "validateAsync"
                                        }))
                                    } catch (H) {
                                        O(H)
                                    }
                                }, h.debounceMs)
                            })
                        } catch (F) {
                            S = F
                        }
                        if (y.signal.aborted) return M(void 0);
                        const A = lt(S),
                            K = (b = i[this.name]) == null ? void 0 : b[p],
                            _ = A || K;
                        o.setMeta(F => ({ ...F,
                            errorMap: { ...F ? .errorMap,
                                [p] : _
                            }
                        })), M(_)
                    }))
                };
            for (const o of s) o.validate && c(this, o, v);
            for (const o of l) o.validate && c(o.field, o, u);
            let d = [];
            (v.length || u.length) && (d = await Promise.all(v), await Promise.all(u)), this.setMeta(o => ({ ...o,
                isValidating: !1
            }));
            for (const o of n) o.setMeta(h => ({ ...h,
                isValidating: !1
            }));
            return d.filter(Boolean)
        }, this.validate = (e, t) => {
            var s;
            if (!this.state.meta.isTouched) return [];
            const {
                fieldsErrorMap: i
            } = t ? .skipFormValidation ? {
                fieldsErrorMap: {}
            } : this.form.validateSync(e), {
                hasErrored: n
            } = this.validateSync(e, i[this.name] ? ? {});
            if (n && !this.options.asyncAlways) return (s = this.getInfo().validationMetaMap[D(e)]) == null || s.lastAbortController.abort(), this.state.meta.errors;
            const l = t ? .skipFormValidation ? Promise.resolve({}) : this.form.validateAsync(e);
            return this.validateAsync(e, l)
        }, this.handleChange = e => {
            this.setValue(e)
        }, this.handleBlur = () => {
            var e, t;
            this.state.meta.isTouched || (this.setMeta(i => ({ ...i,
                isTouched: !0
            })), this.validate("change")), this.state.meta.isBlurred || this.setMeta(i => ({ ...i,
                isBlurred: !0
            })), this.validate("blur"), (t = (e = this.options.listeners) == null ? void 0 : e.onBlur) == null || t.call(e, {
                value: this.state.value,
                fieldApi: this
            })
        }, this.form = r.form, this.name = r.name, this.timeoutIds = {}, this.store = new E({
            deps: [this.form.store],
            fn: () => {
                const e = this.form.getFieldValue(this.name),
                    t = this.form.getFieldMeta(this.name) ? ? { ...N,
                        ...r.defaultMeta
                    };
                return {
                    value: e,
                    meta: t
                }
            }
        }), this.options = r
    }
    get state() {
        return this.store.state
    }
    runValidator(r) {
        return vt(r.validate) ? ft[r.type](r.value, r.validate) : r.validate(r.value)
    }
    setErrorMap(r) {
        this.setMeta(e => ({ ...e,
            errorMap: { ...e.errorMap,
                ...r
            }
        }))
    }
}

function lt(a) {
    if (a) return a
}

function D(a) {
    switch (a) {
        case "submit":
            return "onSubmit";
        case "blur":
            return "onBlur";
        case "mount":
            return "onMount";
        case "server":
            return "onServer";
        default:
            return "onChange"
    }
}

function rt(a, r = e => e) {
    return mt.useSyncExternalStoreWithSelector(a.subscribe, () => a.state, () => a.state, r, Tt)
}

function Tt(a, r) {
    if (Object.is(a, r)) return !0;
    if (typeof a != "object" || a === null || typeof r != "object" || r === null) return !1;
    if (a instanceof Map && r instanceof Map) {
        if (a.size !== r.size) return !1;
        for (const [t, s] of a)
            if (!r.has(t) || !Object.is(s, r.get(t))) return !1;
        return !0
    }
    if (a instanceof Set && r instanceof Set) {
        if (a.size !== r.size) return !1;
        for (const t of a)
            if (!r.has(t)) return !1;
        return !0
    }
    const e = Object.keys(a);
    if (e.length !== Object.keys(r).length) return !1;
    for (let t = 0; t < e.length; t++)
        if (!Object.prototype.hasOwnProperty.call(r, e[t]) || !Object.is(a[e[t]], r[e[t]])) return !1;
    return !0
}
const R = typeof window < "u" ? P.useLayoutEffect : P.useEffect;

function It(a) {
    const [r] = P.useState(() => {
        const t = new Dt({ ...a,
            form: a.form,
            name: a.name
        });
        return t.Field = pt, t
    });
    return R(r.mount, [r]), R(() => {
        r.update(a)
    }), rt(r.store, a.mode === "array" ? e => [e.meta, Object.keys(e.value ? ? []).length] : void 0), r
}
const pt = ({
    children: a,
    ...r
}) => {
    const e = It(r),
        t = P.useMemo(() => G(a, e), [a, e, e.state.value, e.state.meta]);
    return W.jsx(W.Fragment, {
        children: t
    })
};

function Pt({
    form: a,
    selector: r,
    children: e
}) {
    const t = rt(a.store, r);
    return G(e, t)
}

function zt(a) {
    const [r] = P.useState(() => {
        const e = new Ot(a),
            t = e;
        return t.Field = function(i) {
            return W.jsx(pt, { ...i,
                form: e
            })
        }, t.Subscribe = s => W.jsx(Pt, {
            form: e,
            selector: s.selector,
            children: s.children
        }), t
    });
    return R(r.mount, []), rt(r.store, e => e.isSubmitting), R(() => {
        r.update(a)
    }), r
}
export {
    rt as a, It as b, zt as u
};
//# sourceMappingURL=1d317354-b79iqvpdq5pcy4os.js.map