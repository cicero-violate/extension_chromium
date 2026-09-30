import {
    cq as c
} from "./4813494d-javwxs2rmzsrunl2.js";
const e = c(() => ({
        rect: null
    })),
    g = t => {
        if (!t) return e.setState({
            rect: null
        });
        const {
            height: s,
            left: n,
            top: a,
            width: r
        } = t.getBoundingClientRect(), {
            borderRadius: o
        } = getComputedStyle(t);
        e.setState({
            rect: {
                height: s,
                left: n,
                top: a,
                width: r,
                borderRadius: o
            }
        })
    };

function i(t) {
    if (t) return `textdoc-message-${t}`
}
export {
    i as g, g as s, e as u
};
//# sourceMappingURL=54e99289-ca3qg9ztsk0rckpc.js.map