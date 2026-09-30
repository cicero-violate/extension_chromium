import {
    r as p,
    j as e
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    az as f,
    aA as x,
    aB as s,
    aC as i
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    rL as y,
    bW as v,
    b5 as E,
    af as c
} from "./4813494d-javwxs2rmzsrunl2.js";
const h = ({
    children: d,
    sideOffset: u = 6,
    isOpen: t,
    closePopover: n,
    popoverContentRef: l,
    ...a
}) => {
    const o = y();
    return p.useEffect(() => {
        if (!t) return;
        const r = m => {
            m.key === "Escape" && n()
        };
        return document.addEventListener("keydown", r, {
            capture: !0,
            passive: !0
        }), () => document.removeEventListener("keydown", r, {
            capture: !0
        })
    }, [t, n]), e.jsx(f, {
        children: e.jsx(x, {
            forceMount: !0,
            asChild: !0,
            align: "center",
            sideOffset: u,
            onOpenAutoFocus: r => {
                r.preventDefault()
            },
            ...a,
            style: { ...a.style ? ? {},
                zIndex : 60
            },
            children: e.jsx("div", {
                ref: l,
                className: c(!t && "pointer-events-none", "z-20"),
                children: e.jsx(v, {
                    mode: "sync",
                    children: t && e.jsx(E.div, {
                        className: c("popover bg-token-main-surface-primary dark:bg-token-main-surface-primary shadow-long overflow-auto rounded-2xl bg-clip-padding"),
                        variants: {
                            open: {
                                opacity: 1,
                                y: 0,
                                transition: o ? s : { ...i,
                                    duration: .1
                                }
                            },
                            closed: {
                                opacity: 0,
                                y: -4,
                                transition: o ? s : { ...i,
                                    duration: .1
                                }
                            }
                        },
                        initial: "closed",
                        animate: "open",
                        exit: "closed",
                        children: d
                    })
                })
            })
        })
    })
};
export {
    h as C
};
//# sourceMappingURL=e8b55dd1-0egvp6sbx7ge01os.js.map