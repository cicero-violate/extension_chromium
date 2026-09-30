import {
    u as y,
    j as n,
    h as M,
    z as O,
    r as h,
    q as k
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    bf as I,
    n as N,
    bj as m,
    bg as F,
    bh as S,
    zX as D,
    di as p,
    D as d,
    df as R,
    dR as L,
    b2 as w,
    af as f
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    lT as U
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    G as A
} from "./c19d65aa-ef21vpc58mb9d70k.js";

function b({
    jupyterMessage: e
}) {
    const a = y(),
        {
            width: t,
            height: r
        } = e;
    if (e.image_payload != null) return n.jsx("img", {
        className: "my-1 max-h-full max-w-full object-contain",
        src: `data:image/png;base64,${e.image_payload}`,
        alt: a.formatMessage(T.altText),
        width: t,
        height: r
    });
    if (e.image_url != null) {
        const s = I(e.image_url);
        return n.jsx($, {
            fileId: s,
            width: t,
            height: r
        })
    }
    return null
}
const P = 30 * 1e3,
    C = 100,
    _ = 1.5,
    J = Math.log(1 - P * (1 - _) / C) / Math.log(_);

function X(e, a) {
    return k({
        queryKey: ["getFileDownloadLink", e],
        queryFn: () => S(e, {
            isUnauthenticated: a
        }),
        staleTime: F,
        refetchInterval: t => {
            const r = t.state.dataUpdateCount;
            return t.state.data ? .status === m.Success || r > J || t.state.status === m.Error ? !1 : Math.pow(_, r) * C
        }
    })
}

function $({
    fileId: e,
    width: a,
    height: t
}) {
    const r = y(),
        s = !N(),
        {
            data: o,
            isLoading: u,
            refetch: l
        } = O(X(e, s));
    return h.useEffect(() => {
        if (o ? .status === m.Success) {
            const i = new URL(o.download_url, location.toString()).searchParams.get("se");
            i != null && !u && new Date > new Date(i) && l()
        }
    }, [o, u, l]), o ? .status !== m.Success ? null : n.jsx("img", {
        src: o.download_url,
        className: "my-1 max-h-64 max-w-full object-contain sm:max-h-80",
        alt: r.formatMessage(T.altText),
        width: a,
        height: t
    })
}
const T = M({
    altText: {
        id: "CodeExecutionOutputImage.altText",
        defaultMessage: "Output image"
    }
});

function W({
    FormattedText: e,
    message: a,
    codeRendererClassName: t,
    forceDarkMode: r,
    removeTopBorderRadius: s,
    showActionBar: o,
    codeContainerClassName: u
}) {
    const l = w() || r,
        c = q(a),
        i = h.useCallback(x => n.jsx(U, { ...x,
            wrapperClassName: t,
            codeContainerClassName: u,
            removeTopBorderRadius: s,
            showActionBar: o,
            isCodeInteractive: !1
        }), [t, u, s, o]),
        g = h.useMemo(() => ({
            code: i
        }), [i]);
    return c == null ? null : n.jsx(A.Provider, {
        value: {
            isWithinDataAnalysisToolMessage: !0
        },
        children: n.jsx(e, {
            className: f("markdown prose dark:prose-invert w-full break-words", l ? "dark" : "light"),
            forceDarkMode: r,
            componentOverrides: g,
            isCodeInteractive: !1,
            children: c
        })
    })
}

function q(e) {
    function a(t, r) {
        return `\`\`\`${r}
${t}
\`\`\``
    }
    if (e.author.name === "python" && e.content.content_type === p.ExecutionOutput) return e.metadata ? .aggregate_result ? .code ? a(e.metadata ? .aggregate_result ? .code, "python") : null;
    if (e.author.name === "container.exec" && e.author.role === R.Tool) return e.metadata ? .container_citation ? .source_cmd ? a(e.metadata ? .container_citation ? .source_cmd, "bash") : null;
    if (e.content.content_type === "code") return a(e.content.text, "python");
    if (e.recipient === "python") {
        if (e.content.content_type !== "text") return d.addError("Unexpected content type for code message"), null;
        const t = e.content.parts;
        return t.length !== 1 || typeof t[0] != "string" ? (d.addError("Unexpected parts for code message"), null) : a(t[0], "python")
    }
    return L(3179801956, e.author.name) && e.content.content_type === p.ExecutionOutput ? a(e.content.text, "python") : (d.addAction("Unexpected code message format"), null)
}

function Y({
    message: e,
    showLabel: a = !0,
    wrapperClassName: t,
    codeContainerClassName: r,
    forceDarkMode: s
}) {
    const o = y();
    if (e.content.content_type !== p.ExecutionOutput) return null;
    const u = e.metadata ? .aggregate_result;
    if (!u) return d.addError("Corrupt code execution result message"), null;
    const l = u.messages.filter(K),
        c = l.length > 0,
        i = u.final_expression_output != null,
        g = u.in_kernel_exception != null;
    return n.jsxs(n.Fragment, {
        children: [c && n.jsx(j, {
            forceDarkMode: s,
            label: a ? "STDOUT/STDERR" : null,
            wrapperClassName: t,
            output: l.map((x, v) => n.jsx("span", {
                className: x.stream_name === "stderr" ? "text-red-500" : "",
                children: x.text
            }, `${v}`))
        }), i && n.jsx(j, {
            forceDarkMode: s,
            wrapperClassName: t,
            codeContainerClassName: r,
            label: a ? o.formatMessage({
                id: "codeInterpreterMessage.resultLabel",
                defaultMessage: "Result"
            }) : null,
            output: u.final_expression_output
        }), g && n.jsx(H, {
            traceback: u.in_kernel_exception.traceback.join("")
        })]
    })
}

function j({
    wrapperClassName: e,
    label: a,
    output: t,
    codeContainerClassName: r,
    forceDarkMode: s
}) {
    const o = w() || s;
    return n.jsxs("div", {
        className: f("bg-token-sidebar-surface-primary overflow-x-auto p-4 text-xs", e),
        children: [a && n.jsx("div", {
            className: "mb-1 text-gray-400",
            children: a
        }), n.jsx("div", {
            className: f("prose flex flex-col-reverse", o ? "text-white" : "text-black"),
            children: n.jsx("pre", {
                className: f("shrink-0 overflow-auto", r),
                children: t
            })
        })]
    })
}

function H({
    traceback: e
}) {
    return n.jsx("div", {
        className: "overflow-auto border-t border-gray-500 bg-black text-white",
        children: n.jsx("div", {
            className: "border-s-4 border-red-500 p-2 text-xs",
            children: n.jsx("div", {
                className: "scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-700 flex max-h-64 flex-col-reverse",
                children: n.jsx("pre", {
                    className: "shrink-0",
                    children: e
                })
            })
        })
    })
}

function Z({
    message: e,
    isCoT: a = !1
}) {
    if (e.content.content_type !== p.ExecutionOutput) return null;
    const t = e.metadata ? .aggregate_result;
    return t ? a ? t.messages.filter(E).map((r, s) => n.jsx(b, {
        jupyterMessage: r
    }, s)) : n.jsx("div", {
        className: "flex flex-wrap gap-2",
        children: t.messages.filter(E).map((r, s) => n.jsx("div", {
            className: "max-h-64 items-start justify-start sm:max-h-80",
            children: n.jsx(b, {
                jupyterMessage: r
            })
        }, s))
    }) : (d.addError("Corrupt code execution result message"), null)
}

function K(e) {
    return e.message_type === "stream"
}

function E(e) {
    return e.message_type === "image" || "image_url" in e && D(e.image_url + "")
}

function B(e) {
    return e.metadata ? .aggregate_result ? .messages.some(E) ? ? !1
}
export {
    Z as C, W as a, Y as b, j as c, $ as d, X as e, b as f, q as g, B as h, E as i
};
//# sourceMappingURL=a366adf3-mr5j0wy96h4uuta9.js.map