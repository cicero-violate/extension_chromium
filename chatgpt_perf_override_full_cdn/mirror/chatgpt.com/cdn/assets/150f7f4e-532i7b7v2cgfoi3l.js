import {
    j as n,
    o as y,
    u as j,
    c as _,
    r as c,
    h as W,
    m as De,
    s as ne,
    y as be
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    fK as h,
    zt as T,
    ub as ve,
    bG as Se,
    cW as se,
    ml as re,
    mm as Me,
    gh as ae,
    b$ as Ce,
    qb as Te,
    dj as _e
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    qv as Ne,
    ix as Fe,
    aH as Ie,
    af as J,
    fc as R,
    kp as ke,
    jd as Ee,
    aw as I,
    de as oe,
    J as Oe,
    a as Re,
    N as Je,
    bO as qe,
    q as Be,
    a0 as Ae
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    P as $e
} from "./6a35ae8e-iy63tz3yb9ue6t0y.js";

function Pe({
    dateString: t
}) {
    switch (ze(t)) {
        case "today":
            return n.jsx(y, { ...h.lastRunToday
            });
        case "yesterday":
            return n.jsx(y, { ...h.lastRunYesterday
            });
        case "weekday":
            return new Date(t).toLocaleDateString(void 0, {
                weekday: "long"
            });
        case "full":
            return new Date(t).toLocaleDateString(void 0, {
                month: "short",
                day: "numeric",
                year: "numeric"
            })
    }
}

function ze(t) {
    const e = new Date(t),
        a = Ne(new Date, e);
    return a === 0 ? "today" : a === 1 ? "yesterday" : a <= 7 ? "weekday" : "full"
}

function ie({
    targetTimeUTC: t,
    useShortForm: e = !1
}) {
    return n.jsx(Fe, {
        fallback: void 0,
        name: "JawboneLocalizedRuntime",
        children: n.jsx(Ve, {
            targetTimeUTC: t,
            useShortForm: e
        })
    })
}

function Ve({
    targetTimeUTC: t,
    useShortForm: e = !1
}) {
    const r = j(),
        {
            localDate: a,
            today: i,
            tomorrow: o,
            dayAfterTomorrow: s,
            newWeek: l,
            localizedTime: u
        } = He(t, r.locale);
    if (a.toDateString() === i.toDateString()) return T.runtimeToday(u);
    if (a.toDateString() === o.toDateString()) return T.runtimeTomorrow(u);
    if (a >= s && a < l) {
        const d = new Intl.DateTimeFormat(r.locale, {
            weekday: "long"
        }).format(a);
        return T.runtimeNextFiveDays(d, u)
    } else if (a.getFullYear() === i.getFullYear()) {
        const d = new Intl.DateTimeFormat(r.locale, {
            month: "long",
            day: "numeric"
        }).format(a);
        return e ? d : T.runtimeThisYear(d, u)
    } else {
        const d = new Intl.DateTimeFormat(r.locale, {
            year: "numeric",
            month: "short",
            day: "numeric"
        }).format(a);
        return e ? d : T.runtimeOutsideThisYear(d, u)
    }
}

function He(t, e) {
    const r = new Date(t);
    if (isNaN(r.getTime())) throw new Error(`Invalid targetTimeUTC provided: ${t}`);
    const a = r,
        i = new Date;
    i.setHours(0, 0, 0, 0);
    const o = new Date(i);
    o.setDate(o.getDate() + 1);
    const s = new Date(i);
    s.setDate(s.getDate() + 2);
    const l = new Date(i);
    l.setDate(i.getDate() + 7);
    const u = new Intl.DateTimeFormat(e, {
        hour: "numeric",
        minute: a.getMinutes() === 0 ? void 0 : "numeric",
        hour12: !0
    }).format(a);
    return {
        localDate: a,
        today: i,
        tomorrow: o,
        dayAfterTomorrow: s,
        newWeek: l,
        localizedTime: u
    }
}

function Q(t) {
    "use forget";
    const e = _.c(2),
        {
            children: r
        } = t;
    let a;
    return e[0] !== r ? (a = n.jsx("span", {
        className: "bg-token-main-surface-tertiary text-token-text-secondary rounded-[0.25rem] px-1 py-[1px] text-xs font-medium",
        children: r
    }), e[0] = r, e[1] = a) : a = e[1], a
}

function Le(t) {
    "use forget";
    const e = _.c(2),
        {
            item: r
        } = t,
        {
            is_enabled: a,
            target_time_utc: i
        } = r;
    if (!a) {
        let o;
        return e[0] === Symbol.for("react.memo_cache_sentinel") ? (o = n.jsx(Q, {
            children: n.jsx(y, { ...h.pausedPill
            })
        }), e[0] = o) : o = e[0], o
    }
    if (i) {
        const o = new Date,
            s = new Date(i);
        if (o.getTime() - s.getTime() >= 6e4) {
            let l;
            return e[1] === Symbol.for("react.memo_cache_sentinel") ? (l = n.jsx(Q, {
                children: n.jsx(y, {
                    id: "ppsH3r",
                    defaultMessage: "Delayed"
                })
            }), e[1] = l) : l = e[1], l
        }
    }
    return null
}

function We(t) {
    "use forget";
    const e = _.c(19),
        {
            item: r,
            useShortForm: a
        } = t,
        i = a === void 0 ? !1 : a;
    if (r.next_run_times.length === 0 && r.last_run_time) {
        let s;
        return e[0] !== r.last_run_time ? (s = n.jsx(Pe, {
            dateString: r.last_run_time
        }), e[0] = r.last_run_time, e[1] = s) : s = e[1], s
    }
    const o = r.schedule_components;
    switch (o.frequency) {
        case "once":
            {
                let s;
                return e[2] !== r.id || e[3] !== i ? (s = n.jsx(Ye, {
                    automationId: r.id,
                    useShortForm: i
                }), e[2] = r.id, e[3] = i, e[4] = s) : s = e[4],
                s
            }
        case "daily":
            {
                let s;
                return e[5] !== o ? (s = n.jsx(Ue, {
                    scheduleComponents: o,
                    useShortForm: !1
                }), e[5] = o, e[6] = s) : s = e[6],
                s
            }
        case "weekly":
            {
                let s;
                return e[7] !== o || e[8] !== i ? (s = n.jsx(Ge, {
                    scheduleComponents: o,
                    useShortForm: i
                }), e[7] = o, e[8] = i, e[9] = s) : s = e[9],
                s
            }
        case "monthly":
            {
                let s;
                return e[10] !== o ? (s = n.jsx(Ke, {
                    scheduleComponents: o
                }), e[10] = o, e[11] = s) : s = e[11],
                s
            }
        case "yearly":
            {
                let s;
                return e[12] !== o ? (s = n.jsx(Qe, {
                    scheduleComponents: o
                }), e[12] = o, e[13] = s) : s = e[13],
                s
            }
        case "custom":
            {
                if (r.next_run_times.length === 0) {
                    let u;
                    return e[14] === Symbol.for("react.memo_cache_sentinel") ? (u = n.jsx("div", {
                        children: n.jsx(y, { ...h.customSchedule
                        })
                    }), e[14] = u) : u = e[14], u
                }
                let s;
                if (e[15] !== r.next_run_times[0]) {
                    const d = new Date(r.next_run_times[0]).toLocaleDateString(void 0, {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                    });
                    s = T.nextRunTime(d), e[15] = r.next_run_times[0], e[16] = s
                } else s = e[16];
                let l;
                return e[17] !== s ? (l = n.jsx("div", {
                    children: s
                }), e[17] = s, e[18] = l) : l = e[18],
                l
            }
    }
}

function Bt(t) {
    "use forget";
    const e = _.c(2),
        {
            item: r
        } = t;
    let a;
    return e[0] !== r ? (a = n.jsxs("div", {
        className: "flex items-center gap-1.5",
        children: [n.jsx(We, {
            item: r
        }), n.jsx(Le, {
            item: r
        })]
    }), e[0] = r, e[1] = a) : a = e[1], a
}

function Ye(t) {
    "use forget";
    const e = _.c(5),
        {
            automationId: r,
            useShortForm: a
        } = t,
        i = a === void 0 ? !1 : a;
    let o;
    e[0] !== r ? (o = ve.getTargetTimeUTC(r), e[0] = r, e[1] = o) : o = e[1];
    const s = o;
    if (!s) return null;
    let l;
    return e[2] !== s || e[3] !== i ? (l = n.jsx(ie, {
        targetTimeUTC: s,
        useShortForm: i
    }), e[2] = s, e[3] = i, e[4] = l) : l = e[4], l
}

function Ue(t) {
    "use forget";
    const e = _.c(3),
        {
            scheduleComponents: r,
            useShortForm: a
        } = t,
        i = a === void 0 ? !1 : a,
        o = j(),
        s = le(r.by_hour ? ? 0, r.by_minute ? ? 0, o.locale);
    if (i) {
        let u;
        return e[0] === Symbol.for("react.memo_cache_sentinel") ? (u = n.jsx(y, { ...h.scheduleFrequencyDaily
        }), e[0] = u) : u = e[0], u
    }
    let l;
    return e[1] !== s ? (l = T.runtimeDaily(s), e[1] = s, e[2] = l) : l = e[2], l
}

function Ge(t) {
    "use forget";
    const e = _.c(8),
        {
            scheduleComponents: r,
            useShortForm: a
        } = t,
        i = a === void 0 ? !1 : a,
        o = j();
    let s;
    if (e[0] !== o.locale || e[1] !== r.by_day) {
        const m = new Date,
            w = Xe(r.by_day ? ? "") - m.getDay();
        m.setDate(m.getDate() + (w >= 0 ? w : w + 7)), s = new Intl.DateTimeFormat(o.locale, {
            weekday: "long"
        }).format(m), e[0] = o.locale, e[1] = r.by_day, e[2] = s
    } else s = e[2];
    const l = s,
        u = le(r.by_hour ? ? 0, r.by_minute ? ? 0, o.locale);
    if (i) {
        let m;
        return e[3] !== l ? (m = T.runtimeWeeklyShort(l), e[3] = l, e[4] = m) : m = e[4], m
    }
    let d;
    return e[5] !== l || e[6] !== u ? (d = T.runtimeWeekly(l, u), e[5] = l, e[6] = u, e[7] = d) : d = e[7], d
}

function Ke({
    scheduleComponents: t
}) {
    return T.runtimeMonthly(String(t.by_month_day ? ? 1))
}

function Qe({
    scheduleComponents: t
}) {
    const e = j(),
        r = c.useMemo(() => {
            const a = new Date;
            return a.setMonth((t.by_month ? ? 1) - 1), new Intl.DateTimeFormat(e.locale, {
                month: "long"
            }).format(a)
        }, [t.by_month, e.locale]);
    return T.runtimeYearly(r, t.by_month_day ? ? 1)
}

function le(t, e, r) {
    "use forget";
    const a = _.c(4);
    let i;
    if (a[0] !== t || a[1] !== r || a[2] !== e) {
        const s = new Date;
        s.setHours(t), s.setMinutes(e), i = new Intl.DateTimeFormat(r, {
            hour: "numeric",
            minute: e === 0 ? void 0 : "numeric",
            hour12: !0
        }).format(s), a[0] = t, a[1] = r, a[2] = e, a[3] = i
    } else i = a[3];
    return i
}

function Xe(t) {
    switch (t) {
        case "SU":
            return 0;
        case "MO":
            return 1;
        case "TU":
            return 2;
        case "WE":
            return 3;
        case "TH":
            return 4;
        case "FR":
            return 5;
        case "SA":
            return 6;
        default:
            return -1
    }
}
const b = c.createContext({
    scheduleComponents: {
        frequency: "custom"
    },
    setFrequency: () => {},
    setStartDate: () => {},
    setByDay: () => {},
    setByMonthDay: () => {},
    setByYearDay: () => {},
    setByMonth: () => {},
    setTime: () => {},
    startDate: void 0,
    nextRunTimes: [],
    scheduleErrors: void 0,
    validFrequencies: void 0,
    setValidFrequencies: () => {}
});

function At({
    initialScheduleComponents: t,
    initialValidFrequencies: e,
    nextRunTimes: r,
    children: a
}) {
    const [i, o] = c.useState(t), [s, l] = c.useState(void 0), [u, d] = c.useState(void 0), [m, w] = c.useState(e);
    return n.jsx(b.Provider, {
        value: {
            scheduleComponents: i,
            setFrequency: x => {
                o({ ...i,
                    frequency: x
                })
            },
            setStartDate: x => {
                l(x), d(Ze(x)), o({ ...i,
                    start_time: x.toISOString()
                })
            },
            setByDay: x => {
                o({ ...i,
                    by_day: x
                })
            },
            setByMonthDay: x => {
                o({ ...i,
                    by_month_day: x
                })
            },
            setByYearDay: x => {
                o({ ...i,
                    by_year_day: x
                })
            },
            setByMonth: x => {
                o({ ...i,
                    by_month: x
                })
            },
            setTime: (x, S) => {
                o({ ...i,
                    by_hour: x,
                    by_minute: S,
                    by_second: 0
                })
            },
            startDate: s,
            scheduleErrors: i.frequency !== "once" ? void 0 : u,
            nextRunTimes: r,
            setValidFrequencies: w,
            validFrequencies: m
        },
        children: a
    })
}

function Ze(t) {
    let e = !1;
    const r = new Date;
    r.setFullYear(r.getFullYear() + 2), t.getTime() >= r.getTime() && (e = !0);
    let a = !1;
    const i = new Date;
    if (i.setSeconds(0, 0), t.getTime() < i.getTime() && (a = !0), e || a) return {
        tooFarInFuture: e,
        inPast: a
    }
}

function ce(t) {
    switch (t.frequency) {
        case "once":
            return t.start_time ? new Date(t.start_time) : void 0;
        case "daily":
        case "weekly":
        case "monthly":
        case "yearly":
            return t.by_hour == null || t.by_minute == null ? void 0 : new Date(0, 0, 0, t.by_hour, t.by_minute);
        case "custom":
            return
    }
}

function et(t, e) {
    const r = e.scheduleComponents.start_time ? new Date(e.scheduleComponents.start_time) : new Date;
    r.setHours(t.getHours(), t.getMinutes()), e.setStartDate(r)
}

function tt(t, e) {
    const r = ce(e.scheduleComponents),
        a = new Date(t);
    a.setHours(r ? .getHours() ? ? 0, r ? .getMinutes() ? ? 0), e.setStartDate(a)
}

function nt(t, e) {
    const r = e.scheduleComponents.start_time ? new Date(e.scheduleComponents.start_time) : new Date;
    r.setDate(t), e.setStartDate(r)
}

function st({
    initialDate: t,
    onClick: e
}) {
    const r = j(),
        {
            scheduleComponents: a
        } = c.useContext(b),
        i = c.useMemo(() => rt(a), [a]),
        [o, s] = c.useState(t),
        u = new Intl.DateTimeFormat(r.locale, {
            month: "short",
            year: "numeric"
        }).format(o);
    return n.jsxs("div", {
        className: "mx-5 my-2 flex flex-col gap-0.5",
        children: [n.jsxs("div", {
            className: "flex items-center",
            children: [n.jsx("div", {
                className: "grow text-lg font-semibold",
                children: u
            }), n.jsxs("div", {
                className: "flex gap-2",
                children: [n.jsx(X, {
                    "aria-label": r.formatMessage(L.previousMonth),
                    onClick: () => s(new Date(o.getFullYear(), o.getMonth() - 1, 1)),
                    children: n.jsx(Se, {
                        "aria-hidden": "true",
                        className: "icon-sm"
                    })
                }), n.jsx(X, {
                    "aria-label": r.formatMessage(L.nextMonth),
                    onClick: () => {
                        s(new Date(o.getFullYear(), o.getMonth() + 1, 1))
                    },
                    children: n.jsx(Ie, {
                        "aria-hidden": "true",
                        className: "icon-sm"
                    })
                })]
            })]
        }), n.jsx(ot, {
            visibleDate: o,
            selectedDate: i,
            onClick: e
        })]
    })
}

function X(t) {
    const {
        children: e,
        ...r
    } = t;
    return n.jsx("button", { ...r,
        className: "flex h-10 w-10 items-center justify-center",
        children: e
    })
}

function rt(t) {
    return t.start_time ? new Date(t.start_time) : void 0
}

function Z(t, e) {
    return new Date(t, e + 1, 0).getDate()
}

function at(t, e) {
    return new Date(t, e, 1).getDay()
}

function ot({
    visibleDate: t,
    selectedDate: e,
    onClick: r
}) {
    const a = j(),
        i = c.useContext(b),
        o = 6,
        s = c.useMemo(() => {
            const m = t.getFullYear(),
                w = t.getMonth(),
                x = Z(m, w),
                S = at(m, w),
                p = [];
            for (let f = S - 1; f >= 0; f--) p.push(new Date(m, w - 1, Z(m, w - 1) - f));
            for (let f = 1; f <= x; f++) p.push(new Date(m, w, f));
            const M = o * 7 - p.length;
            for (let f = 1; f <= M; f++) p.push(new Date(m, w + 1, f));
            return p
        }, [t]),
        l = c.useMemo(() => {
            const m = new Intl.DateTimeFormat(a.locale, {
                weekday: "narrow"
            });
            return Array.from({
                length: 7
            }, (w, x) => m.format(new Date(1970, 0, x + 4)))
        }, [a.locale]),
        u = new Date;
    u.setHours(0, 0, 0, 0);
    const d = new Intl.DateTimeFormat(a.locale, {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    return n.jsxs("div", {
        children: [n.jsx("div", {
            className: "flex",
            children: l.map((m, w) => n.jsx("div", {
                className: "flex h-10 w-10 items-center justify-center text-sm font-medium",
                children: m
            }, w))
        }), Array.from({
            length: o
        }).map((m, w) => n.jsx("div", {
            className: "flex",
            children: s.slice(w * 7, (w + 1) * 7).map(x => {
                const S = x >= u,
                    p = !!e && e.toDateString() === x.toDateString();
                return n.jsx("button", {
                    "aria-label": d.format(x),
                    "aria-pressed": p,
                    className: "h-10 w-10",
                    disabled: !S,
                    onClick: () => {
                        tt(x, i), r()
                    },
                    type: "button",
                    children: n.jsx(ue, {
                        dayNumber: x.getDate(),
                        isSelected: p,
                        isSelectable: S
                    })
                }, x.toISOString())
            })
        }, w))]
    })
}

function ue({
    dayNumber: t,
    isSelected: e,
    isSelectable: r
}) {
    return n.jsx("div", {
        className: "h-full w-full p-1",
        children: n.jsx("div", {
            className: J("flex h-full w-full items-center justify-center rounded-full text-sm", !r && "text-token-text-tertiary", !e && r && "hover:bg-token-main-surface-secondary", e && "bg-black font-semibold text-white dark:bg-white dark:text-black"),
            children: t
        })
    })
}

function it({
    onClick: t,
    selectedDay: e
}) {
    const r = j(),
        a = c.useContext(b),
        i = c.useMemo(() => {
            const o = [];
            let s = 1;
            for (let l = 0; l < 5; l++) {
                const u = [];
                for (let d = 0; d < 7 && s <= 31; d++) {
                    const m = s;
                    u.push(n.jsx("button", {
                        "aria-label": r.formatMessage(L.monthDayButton, {
                            day: m
                        }),
                        "aria-pressed": s === e,
                        className: "h-10 w-10 text-sm",
                        onClick: () => {
                            nt(m, a), t(m)
                        },
                        type: "button",
                        children: n.jsx(ue, {
                            dayNumber: m,
                            isSelectable: !0,
                            isSelected: s === e
                        }, s)
                    }, s)), s++
                }
                o.push(n.jsx("div", {
                    className: "flex",
                    children: u
                }, l))
            }
            return n.jsxs("div", {
                children: [n.jsx("p", {
                    className: "ms-2 mb-2 text-sm font-semibold",
                    children: n.jsx(y, {
                        id: "WOVV2Z",
                        defaultMessage: "Repeat every month on the"
                    })
                }), n.jsx("div", {
                    children: o
                })]
            })
        }, [r, e, t, a]);
    return n.jsx("div", {
        children: i
    })
}
const L = W({
        previousMonth: {
            id: "lE9V+b",
            defaultMessage: "Previous month"
        },
        nextMonth: {
            id: "zQOgUg",
            defaultMessage: "Next month"
        },
        monthDayButton: {
            id: "znuCX+",
            defaultMessage: "{day} day of month"
        }
    }),
    lt = "flex-1",
    ct = "max-h-96 overflow-y-auto";

function q({
    rootClassName: t,
    contentClassName: e,
    trigger: r,
    children: a,
    open: i,
    onOpenChange: o,
    onCloseAutoFocus: s
}) {
    return n.jsx("div", {
        className: J(t ? ? lt),
        children: n.jsxs(R.Root, {
            open: i,
            onOpenChange: o,
            children: [r, n.jsx(R.Portal, {
                children: n.jsx(R.Content, {
                    className: e ? ? ct,
                    side: "bottom",
                    onCloseAutoFocus: s,
                    children: a
                })
            })]
        })
    })
}
const ut = "w-full justify-start rounded-lg border-token-border-medium";

function B({
    className: t,
    showError: e = !1,
    children: r,
    ...a
}) {
    return n.jsx(R.Trigger, {
        "aria-invalid": e || void 0,
        className: J(ut, t),
        style: {
            borderColor: e ? "var(--text-error)" : void 0
        },
        ...a,
        children: n.jsxs("div", {
            className: "flex w-full items-center gap-1",
            children: [n.jsx("div", {
                className: "grow text-start",
                children: r
            }), n.jsx(se, {
                "aria-hidden": "true",
                className: "icon-sm text-token-text-tertiary"
            })]
        })
    })
}

function Y({
    options: t,
    initialOption: e,
    showError: r = !1,
    onClick: a,
    triggerProps: i
}) {
    return n.jsx(q, {
        trigger: n.jsx(B, {
            showError: r,
            ...i,
            children: e ? .label ? ? t[0].label
        }),
        children: n.jsx(U, {
            options: t,
            onClick: a
        })
    })
}

function U({
    options: t,
    onClick: e
}) {
    return n.jsx(n.Fragment, {
        children: t.map((r, a) => n.jsx(R.Item, {
            onClick: () => e ? .(r),
            children: r.label
        }, a))
    })
}

function de(t) {
    const e = new Date,
        r = e.getFullYear(),
        a = e.getMonth(),
        i = e.getDate();
    let o;
    if (o = t.match(/^(\d{1,2}):(\d{2})\s?([ap]m)$/i), o) {
        let s = parseInt(o[1], 10);
        const l = parseInt(o[2], 10),
            u = o[3].toLowerCase();
        if (s >= 1 && s <= 12 && l >= 0 && l <= 59) return u === "pm" && s !== 12 && (s += 12), u === "am" && s === 12 && (s = 0), new Date(r, a, i, s, l)
    }
    if (o = t.match(/^([ap]m)\s?(\d{1,2}):(\d{2})$/i), o) {
        let s = parseInt(o[2], 10);
        const l = parseInt(o[3], 10),
            u = o[1].toLowerCase();
        if (s >= 1 && s <= 12 && l >= 0 && l <= 59) return u === "pm" && s !== 12 && (s += 12), u === "am" && s === 12 && (s = 0), new Date(r, a, i, s, l)
    }
    if (o = t.match(/^(\d{1,2})\s?([ap]m)$/i), o) {
        let s = parseInt(o[1], 10);
        const l = o[2].toLowerCase();
        if (s === 12 && l === "am") return s = 0, new Date(r, a, i, s, 0);
        if (s >= 1 && s <= 11 && l === "pm") return s += 12, new Date(r, a, i, s, 0);
        if (s >= 1 && s <= 12) return new Date(r, a, i, s, 0)
    }
    if (o = t.match(/^(\d{1,2}):(\d{2})$/), o) {
        const s = parseInt(o[1], 10),
            l = parseInt(o[2], 10);
        if (s >= 0 && s <= 23 && l >= 0 && l <= 59) return new Date(r, a, i, s, l)
    }
    if (o = t.match(/^(\d{1,2})(\d{2})$/), o) {
        const s = parseInt(o[1], 10),
            l = parseInt(o[2], 10);
        if (s >= 0 && s <= 23 && l >= 0 && l <= 59) return new Date(r, a, i, s, l)
    }
    if (o = t.match(/^(\d{1,2})$/), o) {
        const s = parseInt(o[1], 10);
        if (s >= 0 && s <= 23) return new Date(r, a, i, s, 0)
    }
    if (o = t.match(/^(\d{1,2}):$/), o) {
        const s = parseInt(o[1], 10);
        if (s >= 0 && s <= 23) return new Date(r, a, i, s, 0)
    }
}

function dt(t) {
    return de(t)
}

function me(t) {
    return t ? t.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: !(new Intl.DateTimeFormat().resolvedOptions().hourCycle === "h23" || new Intl.DateTimeFormat().resolvedOptions().hourCycle === "h24")
    }) : ""
}

function fe(t) {
    if (!t) return "";
    const e = String(t.getHours()).padStart(2, "0"),
        r = String(t.getMinutes()).padStart(2, "0");
    return `${e}:${r}`
}

function he(t, e) {
    const r = new Date(0, 0, 0, t, e);
    return me(r)
}

function mt(t, e) {
    return `${String(t).padStart(2,"0")}:${String(e).padStart(2,"0")}`
}

function ee(t) {
    const [e, r] = t.split(":"), a = Number.parseInt(e ? ? "", 10), i = Number.parseInt(r ? ? "", 10);
    return Number.isNaN(a) || Number.isNaN(i) ? "" : he(a, i)
}

function te(t) {
    const e = de(t);
    if (e) return fe(e)
}

function A() {
    const t = j(),
        e = c.useContext(b),
        [r, a] = c.useState(!1),
        [i, o] = c.useState(!0),
        s = c.useRef(null),
        l = c.useRef(null),
        u = c.useMemo(() => ft(), []),
        d = ce(e.scheduleComponents),
        m = c.useMemo(() => d ? ? new Date(new Date().setHours(14, 0, 0, 0)), [d]);
    c.useEffect(() => {
        d || xe(m, e)
    }, [d, m, e]);
    const w = me(m),
        x = fe(m),
        [S, p] = c.useState(!0),
        M = c.useRef(x),
        f = c.useRef(w),
        N = c.useRef(f.current);
    c.useEffect(() => {
        const g = setTimeout(() => {
            r && s.current && s.current.select()
        }, 0);
        return () => clearTimeout(g)
    }, [r]), c.useEffect(() => {
        const g = setTimeout(() => {
            if (r && l.current) {
                const v = ke(u, C => C.value === M.current || C.value === ht(M.current));
                if (v !== -1 && l.current) {
                    const C = l.current.children[v];
                    C && C.scrollIntoView({
                        block: "center"
                    })
                }
            }
        }, 0);
        return () => clearTimeout(g)
    }, [r, M, u]);
    const F = g => {
            N.current = g;
            const v = te(g),
                C = v !== void 0;
            p(C), C && v && (M.current = v, f.current = ee(v))
        },
        O = () => {
            const g = te(N.current);
            g ? (M.current = g, f.current = ee(g), N.current = f.current, H(g, e)) : (N.current = f.current, H(M.current, e)), p(!0), s.current && (s.current.value = f.current)
        };
    return n.jsx(q, {
        trigger: n.jsx(B, {
            showError: !S || !!e.scheduleErrors,
            children: n.jsx("div", {
                className: "flex w-full items-center",
                children: n.jsx("textarea", {
                    "aria-label": t.formatMessage(xt.time),
                    className: "m-0 w-full resize-none border-none bg-transparent p-0 text-sm",
                    defaultValue: f.current,
                    ref: s,
                    rows: 1,
                    wrap: "off",
                    onBlur: () => {
                        O()
                    },
                    onChange: g => {
                        const v = g.target.value;
                        F(v)
                    },
                    onKeyDown: g => {
                        g.key === " " && g.stopPropagation()
                    }
                })
            })
        }),
        open: r,
        onOpenChange: g => {
            a(g), g ? o(!0) : O()
        },
        onCloseAutoFocus: g => {
            g.preventDefault(), s.current && s.current.select()
        },
        children: n.jsx("ul", {
            ref: l,
            children: n.jsx(U, {
                options: u,
                onClick: g => {
                    M.current = g.value, f.current = g.label, N.current = g.label, H(g.value, e), p(!0), a(!1), s.current && (s.current.value = g.label, s.current.select())
                }
            })
        })
    })
}

function ft() {
    return Array.from({
        length: 96
    }, (e, r) => {
        const a = Math.floor(r / 4),
            i = r % 4 * 15,
            o = mt(a, i);
        return {
            label: he(a, i),
            value: o
        }
    })
}

function ht(t) {
    if (!t) return t;
    const [e] = t.split(":");
    return e ? `${e.padStart(2,"0")}:00` : t
}

function xe(t, e) {
    if (t) switch (e.scheduleComponents.frequency) {
        case "once":
            {
                et(t, e);
                break
            }
        case "daily":
        case "weekly":
        case "monthly":
        case "yearly":
            {
                e.setTime(t.getHours(), t.getMinutes());
                break
            }
    }
}

function H(t, e) {
    const r = dt(t);
    xe(r, e)
}
const xt = W({
    time: {
        id: "LlrMue",
        defaultMessage: "Time"
    }
});

function k() {
    const t = j(),
        {
            scheduleComponents: e,
            scheduleErrors: r,
            setFrequency: a,
            validFrequencies: i
        } = c.useContext(b),
        o = c.useMemo(() => [{
            label: t.formatMessage(h.scheduleFrequencyOnce),
            value: "once"
        }, {
            label: t.formatMessage(h.scheduleFrequencyDaily),
            value: "daily"
        }, {
            label: t.formatMessage(h.scheduleFrequencyWeekly),
            value: "weekly"
        }, {
            label: t.formatMessage(h.scheduleFrequencyMonthly),
            value: "monthly"
        }, {
            label: t.formatMessage(h.scheduleFrequencyYearly),
            value: "yearly"
        }, {
            label: t.formatMessage(h.scheduleFrequencyCustom),
            value: "custom"
        }].filter(u => i === void 0 || i ? .includes(u.value)), [t, i]),
        s = o.find(l => l.value === e.frequency);
    return c.useEffect(() => {
        s || a(o[0].value)
    }, [s, o, a]), n.jsx(Y, {
        options: o,
        initialOption: s,
        onClick: l => a(l.value),
        showError: !!r,
        triggerProps: {
            "aria-label": t.formatMessage(E.frequency)
        }
    })
}

function gt() {
    const t = j(),
        {
            scheduleComponents: e,
            scheduleErrors: r,
            setByDay: a
        } = c.useContext(b),
        i = Array.from({
            length: 7
        }, (u, d) => new Intl.DateTimeFormat(t.locale, {
            weekday: "long",
            timeZone: "UTC"
        }).format(new Date(Date.UTC(2021, 2, d + 1)))),
        o = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"],
        s = i.map((u, d) => ({
            label: u,
            value: o[d]
        })),
        l = s.find(u => u.value === e.by_day);
    return c.useEffect(() => {
        l || a(s[0].value)
    }, [l, s, a]), n.jsx(Y, {
        options: s,
        initialOption: l,
        onClick: u => a(u.value),
        showError: !!r,
        triggerProps: {
            "aria-label": t.formatMessage(E.weekday)
        }
    })
}

function yt({
    useShortForm: t = !1
}) {
    const e = j(),
        {
            scheduleComponents: r,
            scheduleErrors: a,
            setByMonthDay: i
        } = c.useContext(b),
        o = Array.from({
            length: 31
        }, (d, m) => ({
            label: (m + 1).toString(),
            value: m + 1
        })),
        s = (d, m = new Date().getFullYear()) => new Date(m, d, 0).getDate(),
        l = o.slice(0, s(r.by_month ? ? 1)),
        u = l.find(d => d.value === r.by_month_day);
    return c.useEffect(() => {
        u || i(l[0].value)
    }, [u, l, i]), n.jsx(q, {
        rootClassName: t ? "flex-none" : void 0,
        trigger: n.jsx(B, {
            "aria-label": e.formatMessage(E.dayOfMonth),
            className: t ? "w-[75px]" : void 0,
            showError: !!a,
            children: u ? .label
        }),
        children: n.jsx(U, {
            options: l,
            onClick: d => i(d.value)
        })
    })
}

function wt({
    useShortForm: t = !1
}) {
    const {
        scheduleComponents: e,
        scheduleErrors: r,
        setByMonthDay: a
    } = c.useContext(b), i = j(), o = e.by_month_day ? ? 1, s = i.formatMessage(Ft[o - 1]);
    return n.jsx(q, {
        rootClassName: t ? "flex-none" : void 0,
        trigger: n.jsx(B, {
            "aria-label": i.formatMessage(E.dayOfMonth),
            className: t ? "w-[75px]" : void 0,
            showError: !!r,
            children: s
        }),
        children: n.jsx("div", {
            className: "m-4",
            children: n.jsx(it, {
                onClick: a,
                selectedDay: o
            })
        })
    })
}

function pt() {
    const t = j(),
        {
            scheduleComponents: e,
            scheduleErrors: r,
            setByMonth: a
        } = c.useContext(b),
        i = new Intl.DateTimeFormat(t.locale, {
            month: "long"
        }),
        o = Array.from({
            length: 12
        }, (l, u) => ({
            label: i.format(new Date(0, u)),
            value: u + 1
        })),
        s = o.find(l => l.value === e.by_month);
    return c.useEffect(() => {
        s || a(o[0].value)
    }, [s, o, a]), n.jsx(Y, {
        options: o,
        initialOption: s,
        onClick: l => a(l.value),
        showError: !!r,
        triggerProps: {
            "aria-label": t.formatMessage(E.month)
        }
    })
}

function jt() {
    const t = j(),
        {
            scheduleComponents: e,
            scheduleErrors: r,
            setStartDate: a
        } = c.useContext(b),
        [i, o] = c.useState(!1);
    c.useEffect(() => {
        e.start_time || a(new Date)
    }, [e.start_time, a]);
    const s = e.start_time ? new Date(e.start_time) : new Date,
        l = new Intl.DateTimeFormat(t.locale, {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    return n.jsx(q, {
        trigger: n.jsx(B, {
            "aria-label": t.formatMessage(E.date),
            showError: !!r,
            children: l.format(s)
        }),
        contentClassName: "min-w-[224px]",
        open: i,
        onOpenChange: o,
        children: n.jsx(st, {
            initialDate: s,
            onClick: () => o(!1)
        })
    })
}

function Dt() {
    return n.jsxs("div", {
        className: "flex gap-2",
        children: [n.jsx(k, {}), n.jsx(jt, {}), n.jsx(A, {})]
    })
}

function bt() {
    return n.jsxs("div", {
        className: "flex gap-2",
        children: [n.jsx(k, {}), n.jsx(A, {})]
    })
}

function vt() {
    return n.jsxs("div", {
        className: "flex gap-2",
        children: [n.jsx(k, {}), n.jsx(gt, {}), n.jsx(A, {})]
    })
}

function St() {
    return n.jsxs("div", {
        className: "flex gap-2",
        children: [n.jsx(k, {}), n.jsx(wt, {}), n.jsx(A, {})]
    })
}

function Mt() {
    return n.jsxs("div", {
        className: "flex gap-2",
        children: [n.jsx(k, {}), n.jsx(pt, {}), n.jsx(yt, {
            useShortForm: !0
        }), n.jsx(A, {})]
    })
}

function Ct({
    automationId: t,
    conversationId: e,
    onModalClose: r
}) {
    return n.jsxs("div", {
        className: "flex flex-col gap-3",
        children: [n.jsx(k, {}), n.jsx(Tt, {
            automationId: t
        }), n.jsx(_t, {
            conversationId: e,
            onModalClose: r
        })]
    })
}

function Tt({
    automationId: t
}) {
    const {
        data: e,
        fetchNextPage: r,
        hasNextPage: a,
        isFetchingNextPage: i
    } = De({
        queryKey: ["automation-next-run-times", t],
        queryFn: ({
            pageParam: s
        }) => re.getAutomationNextRunTimes(t, s),
        getNextPageParam: s => s.has_more ? s.next_run_times[s.next_run_times.length - 1] : void 0,
        initialPageParam: null
    }), o = c.useRef(null);
    return c.useEffect(() => {
        o.current && (o.current.scrollTop = o.current.scrollHeight)
    }, [e]), n.jsx("div", {
        className: "bg-token-main-surface-secondary rounded-lg p-3",
        children: n.jsxs("div", {
            ref: o,
            className: "flex h-full max-h-52 flex-col gap-3 overflow-y-auto text-sm",
            children: [e ? .pages ? .flatMap(s => s.next_run_times).map((s, l) => n.jsx("div", {
                children: n.jsx(ie, {
                    targetTimeUTC: s
                })
            }, l)), a && n.jsx("button", {
                onClick: () => r(),
                disabled: i,
                children: n.jsxs("div", {
                    className: "flex items-center gap-1 text-sm font-medium",
                    children: [n.jsx(y, {
                        id: "qL17GV",
                        defaultMessage: "See more"
                    }), n.jsx(se, {
                        "aria-hidden": "true",
                        className: "icon"
                    })]
                })
            })]
        })
    })
}

function _t({
    conversationId: t,
    onModalClose: e
}) {
    const r = ne();
    return t ? n.jsxs("div", {
        className: "border-token-border-medium flex gap-3 rounded-lg border p-4",
        children: [n.jsx(Ee, {
            "aria-hidden": "true"
        }), n.jsxs("div", {
            className: "flex grow flex-col",
            children: [n.jsx("span", {
                className: "text-sm font-medium",
                children: n.jsx(y, { ...h.scheduleCustomScheduleTitle
                })
            }), n.jsx("span", {
                className: "text-token-text-secondary text-sm",
                children: n.jsx(y, { ...h.scheduleCustomScheduleContent
                })
            })]
        }), n.jsx(I, {
            onClick: () => {
                e(), r(oe(t))
            },
            children: n.jsx(y, { ...h.scheduleCustomScheduleOpenChat
            })
        })]
    }) : null
}

function Nt({
    automationId: t,
    conversationId: e,
    onModalClose: r
}) {
    const {
        scheduleComponents: a
    } = c.useContext(b);
    switch (a.frequency) {
        case "once":
            return n.jsx(Dt, {});
        case "daily":
            return n.jsx(bt, {});
        case "weekly":
            return n.jsx(vt, {});
        case "monthly":
            return n.jsx(St, {});
        case "yearly":
            return n.jsx(Mt, {});
        case "custom":
            return t ? n.jsx(Ct, {
                automationId: t,
                conversationId: e,
                onModalClose: r
            }) : null
    }
}
const Ft = new Array(31).fill(0).map((t, e) => e + 1).map(t => {
        const e = t % 10 === 1 && t !== 11 ? `${t}st` : t === 2 || t === 22 ? `${t}nd` : t === 3 || t === 23 ? `${t}rd` : `${t}th`;
        return {
            id: `date-ordinal-${t}`,
            description: "Brief translation of a number's ordinal abbreviation, i.e. #1 = 1st (the 'st'), #2 = 2nd (the 'nd')",
            defaultMessage: e
        }
    }),
    E = W({
        frequency: {
            id: "Qnjx3u",
            defaultMessage: "Repeat frequency"
        },
        weekday: {
            id: "/xq5Un",
            defaultMessage: "Day of week"
        },
        dayOfMonth: {
            id: "OUw8HY",
            defaultMessage: "Day of month"
        },
        month: {
            id: "ThG7y0",
            defaultMessage: "Month"
        },
        date: {
            id: "WdxDQ4",
            defaultMessage: "Date"
        }
    });

function It(t) {
    return !!t.id
}

function kt({
    onClose: t,
    onConfirm: e
}) {
    const r = j();
    return n.jsx(_e, {
        isOpen: !0,
        title: r.formatMessage(h.editModalCancel),
        primaryButtonColor: "danger",
        onClose: () => {
            t()
        },
        onConfirm: () => {
            e()
        },
        children: n.jsx("div", {
            className: "text-sm",
            children: n.jsx(y, { ...h.cancelModalDescription
            })
        })
    })
}

function Et({
    onClick: t
}) {
    return n.jsxs("div", {
        className: "border-token-border-medium flex items-center justify-between rounded-2xl border p-4",
        children: [n.jsxs("div", {
            className: "flex items-center gap-3 text-sm font-medium",
            children: [n.jsx($e, {
                className: "icon-lg"
            }), n.jsx(y, { ...h.pauseBanner
            })]
        }), n.jsx("div", {
            children: n.jsx(I, {
                onClick: t,
                children: n.jsx(y, { ...ae.messages.resume
                })
            })
        })]
    })
}

function $t({
    item: t,
    source: e,
    onClose: r,
    onSave: a = re.saveAutomation
}) {
    const i = j(),
        o = Oe();
    c.useEffect(() => {
        Re.count(Je.JAWBONE, "jawbone_edit_modal.open")
    }, []);
    const {
        scheduleComponents: s,
        scheduleErrors: l
    } = c.useContext(b), [u, d] = c.useState(!0), [m, w] = c.useState(!1), [x, S] = c.useState(!1), [p, M] = c.useState(t.title), [f, N] = c.useState(t.prompt), [F, O] = c.useState(t.is_enabled), g = c.useId(), v = c.useId(), C = c.useId(), G = c.useId(), K = c.useRef(null);
    c.useEffect(() => {
        const D = K.current;
        if (!D) return;
        D.style.height = "auto";
        const je = 300;
        D.style.height = `${Math.min(D.scrollHeight,je)}px`
    }, [f]);
    const P = !!t.id;
    c.useEffect(() => {
        l ? .tooFarInFuture || l ? .inPast ? d(!1) : d(p.length > 0 && f.length > 0);
        const D = p !== t.title || f !== t.prompt || F !== t.is_enabled || !qe(s, t.schedule_components);
        w(D)
    }, [l ? .tooFarInFuture, l ? .inPast, p, f, F, t, s]);
    const {
        mutate: ge
    } = be({
        mutationFn: () => a(t.id ? ? null, p, t.schedule, F, f, t.schedule_components.start_time !== s.start_time ? Intl.DateTimeFormat().resolvedOptions().timeZone : t.default_timezone, s, t.last_run_time),
        onSuccess: D => {
            D && Me.setAutomation(D.id, D), r(i.formatMessage(h.editModalSaveSuccess))
        },
        onError: () => {
            o.danger(h.editModalSaveFailure, {
                hasCloseButton: !0,
                toastId: "jawbone_edit_modal"
            }), d(!0), S(!1)
        }
    }), [ye, z] = c.useState(!1), [we, V] = c.useState(!1);
    Be("156153730");
    const pe = ne();
    return n.jsxs(n.Fragment, {
        children: [n.jsx(Ae, {
            testId: "modal-jawbone-edit",
            className: "min-w-[680px] text-sm",
            isOpen: !0,
            onClose: () => {
                if (m) {
                    V(!0);
                    return
                }
                r()
            },
            showCloseButton: !0,
            title: P ? n.jsx(y, { ...h.editScheduleTitle
            }) : n.jsx(y, { ...h.newScheduleTitle
            }),
            headerAccessory: e === "tasks" && n.jsx(I, {
                icon: Ce,
                color: "secondary",
                onClick: () => {
                    pe(oe(t.conversation_id))
                },
                children: n.jsx(y, {
                    id: "KkyshF",
                    defaultMessage: "View chat"
                })
            }),
            type: "success",
            children: n.jsxs("div", {
                className: "flex flex-col gap-6",
                children: [!F && n.jsx(Et, {
                    onClick: () => {
                        O(!0)
                    }
                }), n.jsxs("div", {
                    className: "flex flex-col gap-2",
                    children: [n.jsx("label", {
                        className: "text-sm font-medium",
                        htmlFor: g,
                        children: n.jsx(y, { ...h.editModalName
                        })
                    }), n.jsx("textarea", {
                        "aria-describedby": p.length === 0 ? v : void 0,
                        "aria-invalid": p.length === 0 ? !0 : void 0,
                        className: J("border-token-border-medium bg-token-main-surface-primary w-full resize-none rounded-lg text-sm", p.length === 0 && "border-token-text-error focus:border-token-text-error"),
                        id: g,
                        rows: 1,
                        value: p,
                        onChange: D => M(D.target.value),
                        placeholder: i.formatMessage({
                            id: "GB3SVK",
                            defaultMessage: "Summarize AI news"
                        })
                    }), p.length === 0 && n.jsx($, {
                        id: v,
                        children: n.jsx(y, { ...h.editModalMissingTaskName
                        })
                    })]
                }), n.jsxs("div", {
                    className: "flex flex-col gap-2",
                    children: [n.jsx("label", {
                        className: "text-sm font-medium",
                        htmlFor: C,
                        children: n.jsx(y, { ...h.editModalInstructions
                        })
                    }), n.jsx("textarea", {
                        "aria-describedby": f.length === 0 ? G : void 0,
                        "aria-invalid": f.length === 0 ? !0 : void 0,
                        ref: K,
                        className: J("border-token-border-medium bg-token-main-surface-primary w-full resize-none overflow-y-auto rounded-lg text-sm", f.length === 0 && "border-token-text-error focus:border-token-text-error"),
                        id: C,
                        rows: 3,
                        value: f,
                        onChange: D => N(D.target.value),
                        placeholder: i.formatMessage({
                            id: "XDXPIp",
                            defaultMessage: "Send a summary of the latest news in AI, focusing on especially surprising stories."
                        })
                    }), f.length === 0 && n.jsx($, {
                        id: G,
                        children: n.jsx(y, { ...h.editModalMissingInstructions
                        })
                    })]
                }), n.jsxs("div", {
                    className: "flex flex-col gap-2",
                    children: [n.jsx("div", {
                        className: "text-sm font-medium",
                        children: n.jsx(y, { ...h.editModalSchedule
                        })
                    }), n.jsx("div", {
                        children: n.jsx(Nt, {
                            automationId: t.id,
                            conversationId: t.conversation_id,
                            onModalClose: r
                        })
                    }), n.jsxs("div", {
                        children: [l ? .tooFarInFuture && n.jsx($, {
                            children: n.jsx(y, { ...h.editModalTooFarInFuture
                            })
                        }), l ? .inPast && n.jsx($, {
                            children: n.jsx(y, { ...h.editModalInPast
                            })
                        })]
                    }), !1]
                }), n.jsxs("div", {
                    className: "flex justify-between",
                    children: [n.jsxs("div", {
                        className: "flex gap-2",
                        children: [F && P && n.jsx(I, {
                            color: "secondary",
                            onClick: () => {
                                O(!1)
                            },
                            children: n.jsx(y, { ...ae.messages.pause
                            })
                        }), P && n.jsx(I, {
                            color: "danger-outline",
                            onClick: () => {
                                z(!0)
                            },
                            children: n.jsx(y, { ...h.editModalDelete
                            })
                        })]
                    }), n.jsxs("div", {
                        className: "flex gap-2",
                        children: [n.jsx(I, {
                            color: "secondary",
                            onClick: () => {
                                if (m) {
                                    V(!0);
                                    return
                                }
                                r()
                            },
                            children: n.jsx(y, { ...h.editModalCancel
                            })
                        }), n.jsx(I, {
                            disabled: !u,
                            loading: x,
                            color: "primary",
                            onClick: () => {
                                S(!0), ge()
                            },
                            children: n.jsx(y, { ...h.editModalSave
                            })
                        })]
                    })]
                })]
            })
        }), we && n.jsx(kt, {
            onClose: () => V(!1),
            onConfirm: () => r()
        }), ye && It(t) && n.jsx(Te, {
            item: t,
            onClose: () => z(!1),
            onConfirm: () => {
                z(!1), r()
            }
        })]
    })
}

function $({
    children: t,
    id: e
}) {
    return n.jsx("div", {
        className: "text-token-text-error text-sm font-medium",
        id: e,
        children: t
    })
}
export {
    Pe as A, At as J, $t as a, Bt as b, We as c
};
//# sourceMappingURL=150f7f4e-532i7b7v2cgfoi3l.js.map