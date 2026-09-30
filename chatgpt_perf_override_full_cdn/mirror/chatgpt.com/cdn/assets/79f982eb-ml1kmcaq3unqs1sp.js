import {
    c as y,
    j as d
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    hA as u,
    fk as x
} from "./4813494d-javwxs2rmzsrunl2.js";
var b = (e => (e.Gizmo = "gizmo", e.App = "app", e))(b || {});

function A(e) {
    return {
        id: `${e.type??"unknown"}:${e.command}:${e.systemHintType??""}`,
        title: e.title,
        disabled: e.disabled,
        icon: e.icon,
        secondary: e.secondary,
        trailing: e.trailing,
        color: e.color,
        trailingColor: e.trailingColor,
        matchText: [e.command, ...e.aliases ? ? []],
        insertText: e.insertText,
        onSelect: e.onSelect,
        noMatchEmpty: e.noMatchEmpty,
        showFor: e.type === "app" && e.isConnected ? ["at_command", "slash_command"] : ["at_command"],
        searchParameters: {
            targets: [e.command, ...e.aliases ? ? [], ...e.regexMatches ? ? [], e.secondary ? `${e.title} ${e.secondary}` : e.title],
            weight: e.matchWeight
        },
        meta: {
            isApp: e.type === "app",
            isConnected: e.isConnected
        }
    }
}

function M(e) {
    "use forget";
    const t = y.c(19),
        {
            item: i,
            isHighlighted: o,
            onHighlight: n,
            onClick: a
        } = e,
        g = i.tooltip ? .primary,
        c = i.tooltip ? .secondary,
        p = i.tooltip ? .labelTextAlign,
        h = !i.tooltip;
    let l;
    t[0] !== i.title ? (l = d.jsx("span", {
        className: "break-words",
        children: i.title
    }), t[0] = i.title, t[1] = l) : l = t[1];
    let s;
    t[2] !== o || t[3] !== i.color || t[4] !== i.disabled || t[5] !== i.icon || t[6] !== i.secondary || t[7] !== i.trailing || t[8] !== i.trailingColor || t[9] !== a || t[10] !== n || t[11] !== l ? (s = d.jsx(u, {
        as: "div",
        hasManagedFocus: !0,
        highlighted: o,
        onPointerMove: n,
        onClick: a,
        disabled: i.disabled,
        icon: i.icon,
        secondary: i.secondary,
        trailing: i.trailing,
        color: i.color,
        trailingColor: i.trailingColor,
        children: l
    }), t[2] = o, t[3] = i.color, t[4] = i.disabled, t[5] = i.icon, t[6] = i.secondary, t[7] = i.trailing, t[8] = i.trailingColor, t[9] = a, t[10] = n, t[11] = l, t[12] = s) : s = t[12];
    let r;
    return t[13] !== g || t[14] !== c || t[15] !== p || t[16] !== h || t[17] !== s ? (r = d.jsx(x, {
        side: "right",
        label: g,
        secondaryLabel: c,
        labelTextAlign: p,
        contentClassName: "cant-hover:hidden",
        triggerAs: null,
        disabled: h,
        children: s
    }), t[13] = g, t[14] = c, t[15] = p, t[16] = h, t[17] = s, t[18] = r) : r = t[18], r
}
export {
    b as S, M as a, A as s
};
//# sourceMappingURL=79f982eb-ml1kmcaq3unqs1sp.js.map