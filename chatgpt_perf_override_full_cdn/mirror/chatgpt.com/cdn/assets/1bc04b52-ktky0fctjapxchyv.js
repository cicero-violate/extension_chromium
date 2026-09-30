const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/5b446015-i8yb4xlvvnqlem5p.js", "assets/2340486e-dvd8m80i7d6hyild.js", "assets/f8d34c7f-gtanw863rhmb9w3n.js", "assets/4813494d-javwxs2rmzsrunl2.js", "assets/root-c6w0vzk3.css", "assets/25a79fa0-cpqlc4gnqwkjn5wz.js", "assets/1a7ebd5f-csmwtrlxfshzkvs8.js", "assets/conversation-small-cqp6votf.css", "assets/7517017f-efd9iwaiway92n98.js", "assets/3509739a-18op5gpyo4ea7nuv.js"]))) => i.map(i => d[i]);
import {
    _ as t,
    j as a,
    o as i
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    ch as r
} from "./4813494d-javwxs2rmzsrunl2.js";
const o = () => a.jsx("div", {
        className: "text-token-text-tertiary font-sans text-sm",
        children: a.jsx(i, {
            id: "W7gqvz",
            defaultMessage: "Loading diagram..."
        })
    }),
    n = r(() => t(() =>
        import ("./5b446015-i8yb4xlvvnqlem5p.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).then(e => e.MermaidDiagram), {
        loading: o
    });
async function g(e) {
    return (await t(() =>
        import ("./25a79fa0-cpqlc4gnqwkjn5wz.js"), __vite__mapDeps([5, 1, 6, 3, 4, 7, 8, 9]))).getMermaidSvgResource(e)
}
export {
    n as M, g
};
//# sourceMappingURL=1bc04b52-ktky0fctjapxchyv.js.map