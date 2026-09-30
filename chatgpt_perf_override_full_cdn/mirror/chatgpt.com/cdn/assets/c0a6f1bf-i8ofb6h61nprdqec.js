import {
    xf as e
} from "./4813494d-javwxs2rmzsrunl2.js";
const o = new RegExp(String.raw `\]\((?!<)(${e}[^)\r\n]+?)\)`, "g"),
    i = /\s/;

function a(r) {
    return r.replace(o, (t, n) => i.test(n) ? `](${`<${n}>`})` : t)
}
export {
    a as n
};
//# sourceMappingURL=c0a6f1bf-i8ofb6h61nprdqec.js.map