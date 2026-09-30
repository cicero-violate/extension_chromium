import {
    uF as A,
    Ex as be,
    Ey as ke,
    Mh as L,
    Mi as T,
    a6 as we
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    w as Ce
} from "./1bc04b52-hnu6g21afx0au4ng.js";
import {
    a as le
} from "./1bc04b52-lymnctp12j4ukscl.js";
const Se = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
    Ee = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
    Pe = {};

function K(n, e) {
    return (Pe.jsx ? Ee : Se).test(n)
}
class M {
    constructor(e, t, l) {
        this.property = e, this.normal = t, l && (this.space = l)
    }
}
M.prototype.property = {};
M.prototype.normal = {};
M.prototype.space = null;

function re(n, e) {
    const t = {},
        l = {};
    let r = -1;
    for (; ++r < n.length;) Object.assign(t, n[r].property), Object.assign(l, n[r].normal);
    return new M(t, l, e)
}

function U(n) {
    return n.toLowerCase()
}
class w {
    constructor(e, t) {
        this.property = e, this.attribute = t
    }
}
w.prototype.space = null;
w.prototype.boolean = !1;
w.prototype.booleanish = !1;
w.prototype.overloadedBoolean = !1;
w.prototype.number = !1;
w.prototype.commaSeparated = !1;
w.prototype.spaceSeparated = !1;
w.prototype.commaOrSpaceSeparated = !1;
w.prototype.mustUseProperty = !1;
w.prototype.defined = !1;
let De = 0;
const h = P(),
    v = P(),
    oe = P(),
    i = P(),
    m = P(),
    D = P(),
    k = P();

function P() {
    return 2 ** ++De
}
const B = Object.freeze(Object.defineProperty({
        __proto__: null,
        boolean: h,
        booleanish: v,
        commaOrSpaceSeparated: k,
        commaSeparated: D,
        number: i,
        overloadedBoolean: oe,
        spaceSeparated: m
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    I = Object.keys(B);
class j extends w {
    constructor(e, t, l, r) {
        let o = -1;
        if (super(e, t), W(this, "space", r), typeof l == "number")
            for (; ++o < I.length;) {
                const a = I[o];
                W(this, I[o], (l & B[a]) === B[a])
            }
    }
}
j.prototype.defined = !0;

function W(n, e, t) {
    t && (n[e] = t)
}
const Le = {}.hasOwnProperty;

function N(n) {
    const e = {},
        t = {};
    let l;
    for (l in n.properties)
        if (Le.call(n.properties, l)) {
            const r = n.properties[l],
                o = new j(l, n.transform(n.attributes || {}, l), r, n.space);
            n.mustUseProperty && n.mustUseProperty.includes(l) && (o.mustUseProperty = !0), e[l] = o, t[U(l)] = l, t[U(o.attribute)] = l
        }
    return new M(e, t, n.space)
}
const ae = N({
        space: "xlink",
        transform(n, e) {
            return "xlink:" + e.slice(5).toLowerCase()
        },
        properties: {
            xLinkActuate: null,
            xLinkArcRole: null,
            xLinkHref: null,
            xLinkRole: null,
            xLinkShow: null,
            xLinkTitle: null,
            xLinkType: null
        }
    }),
    ie = N({
        space: "xml",
        transform(n, e) {
            return "xml:" + e.slice(3).toLowerCase()
        },
        properties: {
            xmlLang: null,
            xmlBase: null,
            xmlSpace: null
        }
    });

function ue(n, e) {
    return e in n ? n[e] : e
}

function se(n, e) {
    return ue(n, e.toLowerCase())
}
const ce = N({
        space: "xmlns",
        attributes: {
            xmlnsxlink: "xmlns:xlink"
        },
        transform: se,
        properties: {
            xmlns: null,
            xmlnsXLink: null
        }
    }),
    pe = N({
        transform(n, e) {
            return e === "role" ? e : "aria-" + e.slice(4).toLowerCase()
        },
        properties: {
            ariaActiveDescendant: null,
            ariaAtomic: v,
            ariaAutoComplete: null,
            ariaBusy: v,
            ariaChecked: v,
            ariaColCount: i,
            ariaColIndex: i,
            ariaColSpan: i,
            ariaControls: m,
            ariaCurrent: null,
            ariaDescribedBy: m,
            ariaDetails: null,
            ariaDisabled: v,
            ariaDropEffect: m,
            ariaErrorMessage: null,
            ariaExpanded: v,
            ariaFlowTo: m,
            ariaGrabbed: v,
            ariaHasPopup: null,
            ariaHidden: v,
            ariaInvalid: null,
            ariaKeyShortcuts: null,
            ariaLabel: null,
            ariaLabelledBy: m,
            ariaLevel: i,
            ariaLive: null,
            ariaModal: v,
            ariaMultiLine: v,
            ariaMultiSelectable: v,
            ariaOrientation: null,
            ariaOwns: m,
            ariaPlaceholder: null,
            ariaPosInSet: i,
            ariaPressed: v,
            ariaReadOnly: v,
            ariaRelevant: null,
            ariaRequired: v,
            ariaRoleDescription: m,
            ariaRowCount: i,
            ariaRowIndex: i,
            ariaRowSpan: i,
            ariaSelected: v,
            ariaSetSize: i,
            ariaSort: null,
            ariaValueMax: i,
            ariaValueMin: i,
            ariaValueNow: i,
            ariaValueText: null,
            role: null
        }
    }),
    Ne = N({
        space: "html",
        attributes: {
            acceptcharset: "accept-charset",
            classname: "class",
            htmlfor: "for",
            httpequiv: "http-equiv"
        },
        transform: se,
        mustUseProperty: ["checked", "multiple", "muted", "selected"],
        properties: {
            abbr: null,
            accept: D,
            acceptCharset: m,
            accessKey: m,
            action: null,
            allow: null,
            allowFullScreen: h,
            allowPaymentRequest: h,
            allowUserMedia: h,
            alt: null,
            as: null,
            async: h,
            autoCapitalize: null,
            autoComplete: m,
            autoFocus: h,
            autoPlay: h,
            capture: h,
            charSet: null,
            checked: h,
            cite: null,
            className: m,
            cols: i,
            colSpan: null,
            content: null,
            contentEditable: v,
            controls: h,
            controlsList: m,
            coords: i | D,
            crossOrigin: null,
            data: null,
            dateTime: null,
            decoding: null,
            default: h,
            defer: h,
            dir: null,
            dirName: null,
            disabled: h,
            download: oe,
            draggable: v,
            encType: null,
            enterKeyHint: null,
            form: null,
            formAction: null,
            formEncType: null,
            formMethod: null,
            formNoValidate: h,
            formTarget: null,
            headers: m,
            height: i,
            hidden: h,
            high: i,
            href: null,
            hrefLang: null,
            htmlFor: m,
            httpEquiv: m,
            id: null,
            imageSizes: null,
            imageSrcSet: null,
            inputMode: null,
            integrity: null,
            is: null,
            isMap: h,
            itemId: null,
            itemProp: m,
            itemRef: m,
            itemScope: h,
            itemType: m,
            kind: null,
            label: null,
            lang: null,
            language: null,
            list: null,
            loading: null,
            loop: h,
            low: i,
            manifest: null,
            max: null,
            maxLength: i,
            media: null,
            method: null,
            min: null,
            minLength: i,
            multiple: h,
            muted: h,
            name: null,
            nonce: null,
            noModule: h,
            noValidate: h,
            onAbort: null,
            onAfterPrint: null,
            onAuxClick: null,
            onBeforePrint: null,
            onBeforeUnload: null,
            onBlur: null,
            onCancel: null,
            onCanPlay: null,
            onCanPlayThrough: null,
            onChange: null,
            onClick: null,
            onClose: null,
            onContextLost: null,
            onContextMenu: null,
            onContextRestored: null,
            onCopy: null,
            onCueChange: null,
            onCut: null,
            onDblClick: null,
            onDrag: null,
            onDragEnd: null,
            onDragEnter: null,
            onDragExit: null,
            onDragLeave: null,
            onDragOver: null,
            onDragStart: null,
            onDrop: null,
            onDurationChange: null,
            onEmptied: null,
            onEnded: null,
            onError: null,
            onFocus: null,
            onFormData: null,
            onHashChange: null,
            onInput: null,
            onInvalid: null,
            onKeyDown: null,
            onKeyPress: null,
            onKeyUp: null,
            onLanguageChange: null,
            onLoad: null,
            onLoadedData: null,
            onLoadedMetadata: null,
            onLoadEnd: null,
            onLoadStart: null,
            onMessage: null,
            onMessageError: null,
            onMouseDown: null,
            onMouseEnter: null,
            onMouseLeave: null,
            onMouseMove: null,
            onMouseOut: null,
            onMouseOver: null,
            onMouseUp: null,
            onOffline: null,
            onOnline: null,
            onPageHide: null,
            onPageShow: null,
            onPaste: null,
            onPause: null,
            onPlay: null,
            onPlaying: null,
            onPopState: null,
            onProgress: null,
            onRateChange: null,
            onRejectionHandled: null,
            onReset: null,
            onResize: null,
            onScroll: null,
            onSecurityPolicyViolation: null,
            onSeeked: null,
            onSeeking: null,
            onSelect: null,
            onSlotChange: null,
            onStalled: null,
            onStorage: null,
            onSubmit: null,
            onSuspend: null,
            onTimeUpdate: null,
            onToggle: null,
            onUnhandledRejection: null,
            onUnload: null,
            onVolumeChange: null,
            onWaiting: null,
            onWheel: null,
            open: h,
            optimum: i,
            pattern: null,
            ping: m,
            placeholder: null,
            playsInline: h,
            poster: null,
            preload: null,
            readOnly: h,
            referrerPolicy: null,
            rel: m,
            required: h,
            reversed: h,
            rows: i,
            rowSpan: i,
            sandbox: m,
            scope: null,
            scoped: h,
            seamless: h,
            selected: h,
            shape: null,
            size: i,
            sizes: null,
            slot: null,
            span: i,
            spellCheck: v,
            src: null,
            srcDoc: null,
            srcLang: null,
            srcSet: null,
            start: i,
            step: null,
            style: null,
            tabIndex: i,
            target: null,
            title: null,
            translate: null,
            type: null,
            typeMustMatch: h,
            useMap: null,
            value: v,
            width: i,
            wrap: null,
            align: null,
            aLink: null,
            archive: m,
            axis: null,
            background: null,
            bgColor: null,
            border: i,
            borderColor: null,
            bottomMargin: i,
            cellPadding: null,
            cellSpacing: null,
            char: null,
            charOff: null,
            classId: null,
            clear: null,
            code: null,
            codeBase: null,
            codeType: null,
            color: null,
            compact: h,
            declare: h,
            event: null,
            face: null,
            frame: null,
            frameBorder: null,
            hSpace: i,
            leftMargin: i,
            link: null,
            longDesc: null,
            lowSrc: null,
            marginHeight: i,
            marginWidth: i,
            noResize: h,
            noHref: h,
            noShade: h,
            noWrap: h,
            object: null,
            profile: null,
            prompt: null,
            rev: null,
            rightMargin: i,
            rules: null,
            scheme: null,
            scrolling: v,
            standby: null,
            summary: null,
            text: null,
            topMargin: i,
            valueType: null,
            version: null,
            vAlign: null,
            vLink: null,
            vSpace: i,
            allowTransparency: null,
            autoCorrect: null,
            autoSave: null,
            disablePictureInPicture: h,
            disableRemotePlayback: h,
            prefix: null,
            property: null,
            results: i,
            security: null,
            unselectable: null
        }
    }),
    Ae = N({
        space: "svg",
        attributes: {
            accentHeight: "accent-height",
            alignmentBaseline: "alignment-baseline",
            arabicForm: "arabic-form",
            baselineShift: "baseline-shift",
            capHeight: "cap-height",
            className: "class",
            clipPath: "clip-path",
            clipRule: "clip-rule",
            colorInterpolation: "color-interpolation",
            colorInterpolationFilters: "color-interpolation-filters",
            colorProfile: "color-profile",
            colorRendering: "color-rendering",
            crossOrigin: "crossorigin",
            dataType: "datatype",
            dominantBaseline: "dominant-baseline",
            enableBackground: "enable-background",
            fillOpacity: "fill-opacity",
            fillRule: "fill-rule",
            floodColor: "flood-color",
            floodOpacity: "flood-opacity",
            fontFamily: "font-family",
            fontSize: "font-size",
            fontSizeAdjust: "font-size-adjust",
            fontStretch: "font-stretch",
            fontStyle: "font-style",
            fontVariant: "font-variant",
            fontWeight: "font-weight",
            glyphName: "glyph-name",
            glyphOrientationHorizontal: "glyph-orientation-horizontal",
            glyphOrientationVertical: "glyph-orientation-vertical",
            hrefLang: "hreflang",
            horizAdvX: "horiz-adv-x",
            horizOriginX: "horiz-origin-x",
            horizOriginY: "horiz-origin-y",
            imageRendering: "image-rendering",
            letterSpacing: "letter-spacing",
            lightingColor: "lighting-color",
            markerEnd: "marker-end",
            markerMid: "marker-mid",
            markerStart: "marker-start",
            navDown: "nav-down",
            navDownLeft: "nav-down-left",
            navDownRight: "nav-down-right",
            navLeft: "nav-left",
            navNext: "nav-next",
            navPrev: "nav-prev",
            navRight: "nav-right",
            navUp: "nav-up",
            navUpLeft: "nav-up-left",
            navUpRight: "nav-up-right",
            onAbort: "onabort",
            onActivate: "onactivate",
            onAfterPrint: "onafterprint",
            onBeforePrint: "onbeforeprint",
            onBegin: "onbegin",
            onCancel: "oncancel",
            onCanPlay: "oncanplay",
            onCanPlayThrough: "oncanplaythrough",
            onChange: "onchange",
            onClick: "onclick",
            onClose: "onclose",
            onCopy: "oncopy",
            onCueChange: "oncuechange",
            onCut: "oncut",
            onDblClick: "ondblclick",
            onDrag: "ondrag",
            onDragEnd: "ondragend",
            onDragEnter: "ondragenter",
            onDragExit: "ondragexit",
            onDragLeave: "ondragleave",
            onDragOver: "ondragover",
            onDragStart: "ondragstart",
            onDrop: "ondrop",
            onDurationChange: "ondurationchange",
            onEmptied: "onemptied",
            onEnd: "onend",
            onEnded: "onended",
            onError: "onerror",
            onFocus: "onfocus",
            onFocusIn: "onfocusin",
            onFocusOut: "onfocusout",
            onHashChange: "onhashchange",
            onInput: "oninput",
            onInvalid: "oninvalid",
            onKeyDown: "onkeydown",
            onKeyPress: "onkeypress",
            onKeyUp: "onkeyup",
            onLoad: "onload",
            onLoadedData: "onloadeddata",
            onLoadedMetadata: "onloadedmetadata",
            onLoadStart: "onloadstart",
            onMessage: "onmessage",
            onMouseDown: "onmousedown",
            onMouseEnter: "onmouseenter",
            onMouseLeave: "onmouseleave",
            onMouseMove: "onmousemove",
            onMouseOut: "onmouseout",
            onMouseOver: "onmouseover",
            onMouseUp: "onmouseup",
            onMouseWheel: "onmousewheel",
            onOffline: "onoffline",
            onOnline: "ononline",
            onPageHide: "onpagehide",
            onPageShow: "onpageshow",
            onPaste: "onpaste",
            onPause: "onpause",
            onPlay: "onplay",
            onPlaying: "onplaying",
            onPopState: "onpopstate",
            onProgress: "onprogress",
            onRateChange: "onratechange",
            onRepeat: "onrepeat",
            onReset: "onreset",
            onResize: "onresize",
            onScroll: "onscroll",
            onSeeked: "onseeked",
            onSeeking: "onseeking",
            onSelect: "onselect",
            onShow: "onshow",
            onStalled: "onstalled",
            onStorage: "onstorage",
            onSubmit: "onsubmit",
            onSuspend: "onsuspend",
            onTimeUpdate: "ontimeupdate",
            onToggle: "ontoggle",
            onUnload: "onunload",
            onVolumeChange: "onvolumechange",
            onWaiting: "onwaiting",
            onZoom: "onzoom",
            overlinePosition: "overline-position",
            overlineThickness: "overline-thickness",
            paintOrder: "paint-order",
            panose1: "panose-1",
            pointerEvents: "pointer-events",
            referrerPolicy: "referrerpolicy",
            renderingIntent: "rendering-intent",
            shapeRendering: "shape-rendering",
            stopColor: "stop-color",
            stopOpacity: "stop-opacity",
            strikethroughPosition: "strikethrough-position",
            strikethroughThickness: "strikethrough-thickness",
            strokeDashArray: "stroke-dasharray",
            strokeDashOffset: "stroke-dashoffset",
            strokeLineCap: "stroke-linecap",
            strokeLineJoin: "stroke-linejoin",
            strokeMiterLimit: "stroke-miterlimit",
            strokeOpacity: "stroke-opacity",
            strokeWidth: "stroke-width",
            tabIndex: "tabindex",
            textAnchor: "text-anchor",
            textDecoration: "text-decoration",
            textRendering: "text-rendering",
            typeOf: "typeof",
            underlinePosition: "underline-position",
            underlineThickness: "underline-thickness",
            unicodeBidi: "unicode-bidi",
            unicodeRange: "unicode-range",
            unitsPerEm: "units-per-em",
            vAlphabetic: "v-alphabetic",
            vHanging: "v-hanging",
            vIdeographic: "v-ideographic",
            vMathematical: "v-mathematical",
            vectorEffect: "vector-effect",
            vertAdvY: "vert-adv-y",
            vertOriginX: "vert-origin-x",
            vertOriginY: "vert-origin-y",
            wordSpacing: "word-spacing",
            writingMode: "writing-mode",
            xHeight: "x-height",
            playbackOrder: "playbackorder",
            timelineBegin: "timelinebegin"
        },
        transform: ue,
        properties: {
            about: k,
            accentHeight: i,
            accumulate: null,
            additive: null,
            alignmentBaseline: null,
            alphabetic: i,
            amplitude: i,
            arabicForm: null,
            ascent: i,
            attributeName: null,
            attributeType: null,
            azimuth: i,
            bandwidth: null,
            baselineShift: null,
            baseFrequency: null,
            baseProfile: null,
            bbox: null,
            begin: null,
            bias: i,
            by: null,
            calcMode: null,
            capHeight: i,
            className: m,
            clip: null,
            clipPath: null,
            clipPathUnits: null,
            clipRule: null,
            color: null,
            colorInterpolation: null,
            colorInterpolationFilters: null,
            colorProfile: null,
            colorRendering: null,
            content: null,
            contentScriptType: null,
            contentStyleType: null,
            crossOrigin: null,
            cursor: null,
            cx: null,
            cy: null,
            d: null,
            dataType: null,
            defaultAction: null,
            descent: i,
            diffuseConstant: i,
            direction: null,
            display: null,
            dur: null,
            divisor: i,
            dominantBaseline: null,
            download: h,
            dx: null,
            dy: null,
            edgeMode: null,
            editable: null,
            elevation: i,
            enableBackground: null,
            end: null,
            event: null,
            exponent: i,
            externalResourcesRequired: null,
            fill: null,
            fillOpacity: i,
            fillRule: null,
            filter: null,
            filterRes: null,
            filterUnits: null,
            floodColor: null,
            floodOpacity: null,
            focusable: null,
            focusHighlight: null,
            fontFamily: null,
            fontSize: null,
            fontSizeAdjust: null,
            fontStretch: null,
            fontStyle: null,
            fontVariant: null,
            fontWeight: null,
            format: null,
            fr: null,
            from: null,
            fx: null,
            fy: null,
            g1: D,
            g2: D,
            glyphName: D,
            glyphOrientationHorizontal: null,
            glyphOrientationVertical: null,
            glyphRef: null,
            gradientTransform: null,
            gradientUnits: null,
            handler: null,
            hanging: i,
            hatchContentUnits: null,
            hatchUnits: null,
            height: null,
            href: null,
            hrefLang: null,
            horizAdvX: i,
            horizOriginX: i,
            horizOriginY: i,
            id: null,
            ideographic: i,
            imageRendering: null,
            initialVisibility: null,
            in: null,
            in2: null,
            intercept: i,
            k: i,
            k1: i,
            k2: i,
            k3: i,
            k4: i,
            kernelMatrix: k,
            kernelUnitLength: null,
            keyPoints: null,
            keySplines: null,
            keyTimes: null,
            kerning: null,
            lang: null,
            lengthAdjust: null,
            letterSpacing: null,
            lightingColor: null,
            limitingConeAngle: i,
            local: null,
            markerEnd: null,
            markerMid: null,
            markerStart: null,
            markerHeight: null,
            markerUnits: null,
            markerWidth: null,
            mask: null,
            maskContentUnits: null,
            maskUnits: null,
            mathematical: null,
            max: null,
            media: null,
            mediaCharacterEncoding: null,
            mediaContentEncodings: null,
            mediaSize: i,
            mediaTime: null,
            method: null,
            min: null,
            mode: null,
            name: null,
            navDown: null,
            navDownLeft: null,
            navDownRight: null,
            navLeft: null,
            navNext: null,
            navPrev: null,
            navRight: null,
            navUp: null,
            navUpLeft: null,
            navUpRight: null,
            numOctaves: null,
            observer: null,
            offset: null,
            onAbort: null,
            onActivate: null,
            onAfterPrint: null,
            onBeforePrint: null,
            onBegin: null,
            onCancel: null,
            onCanPlay: null,
            onCanPlayThrough: null,
            onChange: null,
            onClick: null,
            onClose: null,
            onCopy: null,
            onCueChange: null,
            onCut: null,
            onDblClick: null,
            onDrag: null,
            onDragEnd: null,
            onDragEnter: null,
            onDragExit: null,
            onDragLeave: null,
            onDragOver: null,
            onDragStart: null,
            onDrop: null,
            onDurationChange: null,
            onEmptied: null,
            onEnd: null,
            onEnded: null,
            onError: null,
            onFocus: null,
            onFocusIn: null,
            onFocusOut: null,
            onHashChange: null,
            onInput: null,
            onInvalid: null,
            onKeyDown: null,
            onKeyPress: null,
            onKeyUp: null,
            onLoad: null,
            onLoadedData: null,
            onLoadedMetadata: null,
            onLoadStart: null,
            onMessage: null,
            onMouseDown: null,
            onMouseEnter: null,
            onMouseLeave: null,
            onMouseMove: null,
            onMouseOut: null,
            onMouseOver: null,
            onMouseUp: null,
            onMouseWheel: null,
            onOffline: null,
            onOnline: null,
            onPageHide: null,
            onPageShow: null,
            onPaste: null,
            onPause: null,
            onPlay: null,
            onPlaying: null,
            onPopState: null,
            onProgress: null,
            onRateChange: null,
            onRepeat: null,
            onReset: null,
            onResize: null,
            onScroll: null,
            onSeeked: null,
            onSeeking: null,
            onSelect: null,
            onShow: null,
            onStalled: null,
            onStorage: null,
            onSubmit: null,
            onSuspend: null,
            onTimeUpdate: null,
            onToggle: null,
            onUnload: null,
            onVolumeChange: null,
            onWaiting: null,
            onZoom: null,
            opacity: null,
            operator: null,
            order: null,
            orient: null,
            orientation: null,
            origin: null,
            overflow: null,
            overlay: null,
            overlinePosition: i,
            overlineThickness: i,
            paintOrder: null,
            panose1: null,
            path: null,
            pathLength: i,
            patternContentUnits: null,
            patternTransform: null,
            patternUnits: null,
            phase: null,
            ping: m,
            pitch: null,
            playbackOrder: null,
            pointerEvents: null,
            points: null,
            pointsAtX: i,
            pointsAtY: i,
            pointsAtZ: i,
            preserveAlpha: null,
            preserveAspectRatio: null,
            primitiveUnits: null,
            propagate: null,
            property: k,
            r: null,
            radius: null,
            referrerPolicy: null,
            refX: null,
            refY: null,
            rel: k,
            rev: k,
            renderingIntent: null,
            repeatCount: null,
            repeatDur: null,
            requiredExtensions: k,
            requiredFeatures: k,
            requiredFonts: k,
            requiredFormats: k,
            resource: null,
            restart: null,
            result: null,
            rotate: null,
            rx: null,
            ry: null,
            scale: null,
            seed: null,
            shapeRendering: null,
            side: null,
            slope: null,
            snapshotTime: null,
            specularConstant: i,
            specularExponent: i,
            spreadMethod: null,
            spacing: null,
            startOffset: null,
            stdDeviation: null,
            stemh: null,
            stemv: null,
            stitchTiles: null,
            stopColor: null,
            stopOpacity: null,
            strikethroughPosition: i,
            strikethroughThickness: i,
            string: null,
            stroke: null,
            strokeDashArray: k,
            strokeDashOffset: null,
            strokeLineCap: null,
            strokeLineJoin: null,
            strokeMiterLimit: i,
            strokeOpacity: i,
            strokeWidth: null,
            style: null,
            surfaceScale: i,
            syncBehavior: null,
            syncBehaviorDefault: null,
            syncMaster: null,
            syncTolerance: null,
            syncToleranceDefault: null,
            systemLanguage: k,
            tabIndex: i,
            tableValues: null,
            target: null,
            targetX: i,
            targetY: i,
            textAnchor: null,
            textDecoration: null,
            textRendering: null,
            textLength: null,
            timelineBegin: null,
            title: null,
            transformBehavior: null,
            type: null,
            typeOf: k,
            to: null,
            transform: null,
            u1: null,
            u2: null,
            underlinePosition: i,
            underlineThickness: i,
            unicode: null,
            unicodeBidi: null,
            unicodeRange: null,
            unitsPerEm: i,
            values: null,
            vAlphabetic: i,
            vMathematical: i,
            vectorEffect: null,
            vHanging: i,
            vIdeographic: i,
            version: null,
            vertAdvY: i,
            vertOriginX: i,
            vertOriginY: i,
            viewBox: null,
            viewTarget: null,
            visibility: null,
            width: null,
            widths: null,
            wordSpacing: null,
            writingMode: null,
            x: null,
            x1: null,
            x2: null,
            xChannelSelector: null,
            xHeight: i,
            y: null,
            y1: null,
            y2: null,
            yChannelSelector: null,
            z: null,
            zoomAndPan: null
        }
    }),
    Oe = /^data[-\w.:]+$/i,
    q = /-[a-z]/g,
    Me = /[A-Z]/g;

function Re(n, e) {
    const t = U(e);
    let l = e,
        r = w;
    if (t in n.normal) return n.property[n.normal[t]];
    if (t.length > 4 && t.slice(0, 4) === "data" && Oe.test(e)) {
        if (e.charAt(4) === "-") {
            const o = e.slice(5).replace(q, Ie);
            l = "data" + o.charAt(0).toUpperCase() + o.slice(1)
        } else {
            const o = e.slice(4);
            if (!q.test(o)) {
                let a = o.replace(Me, Te);
                a.charAt(0) !== "-" && (a = "-" + a), e = "data" + a
            }
        }
        r = j
    }
    return new r(l, e)
}

function Te(n) {
    return "-" + n.toLowerCase()
}

function Ie(n) {
    return n.charAt(1).toUpperCase()
}
const Ue = {
        classId: "classID",
        dataType: "datatype",
        itemId: "itemID",
        strokeDashArray: "strokeDasharray",
        strokeDashOffset: "strokeDashoffset",
        strokeLineCap: "strokeLinecap",
        strokeLineJoin: "strokeLinejoin",
        strokeMiterLimit: "strokeMiterlimit",
        typeOf: "typeof",
        xLinkActuate: "xlinkActuate",
        xLinkArcRole: "xlinkArcrole",
        xLinkHref: "xlinkHref",
        xLinkRole: "xlinkRole",
        xLinkShow: "xlinkShow",
        xLinkTitle: "xlinkTitle",
        xLinkType: "xlinkType",
        xmlnsXLink: "xmlnsXlink"
    },
    Be = re([ie, ae, ce, pe, Ne], "html"),
    z = re([ie, ae, ce, pe, Ae], "svg");
var Y = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
    Fe = /\n/g,
    je = /^\s*/,
    ze = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
    He = /^:\s*/,
    _e = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,
    Ve = /^[;\s]*/,
    Xe = /^\s+|\s+$/g,
    Ke = `
`,
    $ = "/",
    J = "*",
    E = "",
    We = "comment",
    qe = "declaration";

function Ye(n, e) {
    if (typeof n != "string") throw new TypeError("First argument must be a string");
    if (!n) return [];
    e = e || {};
    var t = 1,
        l = 1;

    function r(s) {
        var c = s.match(Fe);
        c && (t += c.length);
        var y = s.lastIndexOf(Ke);
        l = ~y ? s.length - y : l + s.length
    }

    function o() {
        var s = {
            line: t,
            column: l
        };
        return function(c) {
            return c.position = new a(s), g(), c
        }
    }

    function a(s) {
        this.start = s, this.end = {
            line: t,
            column: l
        }, this.source = e.source
    }
    a.prototype.content = n;

    function u(s) {
        var c = new Error(e.source + ":" + t + ":" + l + ": " + s);
        if (c.reason = s, c.filename = e.source, c.line = t, c.column = l, c.source = n, !e.silent) throw c
    }

    function p(s) {
        var c = s.exec(n);
        if (c) {
            var y = c[0];
            return r(y), n = n.slice(y.length), c
        }
    }

    function g() {
        p(je)
    }

    function f(s) {
        var c;
        for (s = s || []; c = d();) c !== !1 && s.push(c);
        return s
    }

    function d() {
        var s = o();
        if (!($ != n.charAt(0) || J != n.charAt(1))) {
            for (var c = 2; E != n.charAt(c) && (J != n.charAt(c) || $ != n.charAt(c + 1));) ++c;
            if (c += 2, E === n.charAt(c - 1)) return u("End of comment missing");
            var y = n.slice(2, c - 2);
            return l += 2, r(y), n = n.slice(c), l += 2, s({
                type: We,
                comment: y
            })
        }
    }

    function x() {
        var s = o(),
            c = p(ze);
        if (c) {
            if (d(), !p(He)) return u("property missing ':'");
            var y = p(_e),
                S = s({
                    type: qe,
                    property: G(c[0].replace(Y, E)),
                    value: y ? G(y[0].replace(Y, E)) : E
                });
            return p(Ve), S
        }
    }

    function b() {
        var s = [];
        f(s);
        for (var c; c = x();) c !== !1 && (s.push(c), f(s));
        return s
    }
    return g(), b()
}

function G(n) {
    return n ? n.replace(Xe, E) : E
}

function $e(n, e) {
    let t = null;
    if (!n || typeof n != "string") return t;
    const l = Ye(n),
        r = typeof e == "function";
    return l.forEach(o => {
        if (o.type !== "declaration") return;
        const {
            property: a,
            value: u
        } = o;
        r ? e(a, u, o) : u && (t = t || {}, t[a] = u)
    }), t
}
const fe = he("end"),
    H = he("start");

function he(n) {
    return e;

    function e(t) {
        const l = t && t.position && t.position[n] || {};
        if (typeof l.line == "number" && l.line > 0 && typeof l.column == "number" && l.column > 0) return {
            line: l.line,
            column: l.column,
            offset: typeof l.offset == "number" && l.offset > -1 ? l.offset : void 0
        }
    }
}

function Je(n) {
    const e = H(n),
        t = fe(n);
    if (e && t) return {
        start: e,
        end: t
    }
}
const _ = {}.hasOwnProperty,
    Ge = new Map,
    Ze = /[A-Z]/g,
    Qe = /-([a-z])/g,
    en = new Set(["table", "tbody", "thead", "tfoot", "tr"]),
    nn = new Set(["td", "th"]),
    de = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";

function lt(n, e) {
    if (!e || e.Fragment === void 0) throw new TypeError("Expected `Fragment` in options");
    const t = e.filePath || void 0;
    let l;
    if (e.development) {
        if (typeof e.jsxDEV != "function") throw new TypeError("Expected `jsxDEV` in options when `development: true`");
        l = cn(t, e.jsxDEV)
    } else {
        if (typeof e.jsx != "function") throw new TypeError("Expected `jsx` in production options");
        if (typeof e.jsxs != "function") throw new TypeError("Expected `jsxs` in production options");
        l = sn(t, e.jsx, e.jsxs)
    }
    const r = {
            Fragment: e.Fragment,
            ancestors: [],
            components: e.components || {},
            create: l,
            elementAttributeNameCase: e.elementAttributeNameCase || "react",
            evaluater: e.createEvaluater ? e.createEvaluater() : void 0,
            filePath: t,
            ignoreInvalidStyle: e.ignoreInvalidStyle || !1,
            passKeys: e.passKeys !== !1,
            passNode: e.passNode || !1,
            schema: e.space === "svg" ? z : Be,
            stylePropertyNameCase: e.stylePropertyNameCase || "dom",
            tableCellAlignToStyle: e.tableCellAlignToStyle !== !1
        },
        o = me(r, n, void 0);
    return o && typeof o != "string" ? o : r.create(n, r.Fragment, {
        children: o || void 0
    }, void 0)
}

function me(n, e, t) {
    if (e.type === "element") return tn(n, e, t);
    if (e.type === "mdxFlowExpression" || e.type === "mdxTextExpression") return ln(n, e);
    if (e.type === "mdxJsxFlowElement" || e.type === "mdxJsxTextElement") return on(n, e, t);
    if (e.type === "mdxjsEsm") return rn(n, e);
    if (e.type === "root") return an(n, e, t);
    if (e.type === "text") return un(n, e)
}

function tn(n, e, t) {
    const l = n.schema;
    let r = l;
    e.tagName.toLowerCase() === "svg" && l.space === "html" && (r = z, n.schema = r), n.ancestors.push(e);
    const o = ye(n, e.tagName, !1),
        a = pn(n, e);
    let u = X(n, e);
    return en.has(e.tagName) && (u = u.filter(function(p) {
        return typeof p == "string" ? !Ce(p) : !0
    })), ge(n, a, o, e), V(a, u), n.ancestors.pop(), n.schema = l, n.create(e, o, a, t)
}

function ln(n, e) {
    if (e.data && e.data.estree && n.evaluater) {
        const l = e.data.estree.body[0];
        return A(l.type === "ExpressionStatement"), n.evaluater.evaluateExpression(l.expression)
    }
    O(n, e.position)
}

function rn(n, e) {
    if (e.data && e.data.estree && n.evaluater) return n.evaluater.evaluateProgram(e.data.estree);
    O(n, e.position)
}

function on(n, e, t) {
    const l = n.schema;
    let r = l;
    e.name === "svg" && l.space === "html" && (r = z, n.schema = r), n.ancestors.push(e);
    const o = e.name === null ? n.Fragment : ye(n, e.name, !0),
        a = fn(n, e),
        u = X(n, e);
    return ge(n, a, o, e), V(a, u), n.ancestors.pop(), n.schema = l, n.create(e, o, a, t)
}

function an(n, e, t) {
    const l = {};
    return V(l, X(n, e)), n.create(e, n.Fragment, l, t)
}

function un(n, e) {
    return e.value
}

function ge(n, e, t, l) {
    typeof t != "string" && t !== n.Fragment && n.passNode && (e.node = l)
}

function V(n, e) {
    if (e.length > 0) {
        const t = e.length > 1 ? e : e[0];
        t && (n.children = t)
    }
}

function sn(n, e, t) {
    return l;

    function l(r, o, a, u) {
        const g = Array.isArray(a.children) ? t : e;
        return u ? g(o, a, u) : g(o, a)
    }
}

function cn(n, e) {
    return t;

    function t(l, r, o, a) {
        const u = Array.isArray(o.children),
            p = H(l);
        return e(r, o, a, u, {
            columnNumber: p ? p.column - 1 : void 0,
            fileName: n,
            lineNumber: p ? p.line : void 0
        }, void 0)
    }
}

function pn(n, e) {
    const t = {};
    let l, r;
    for (r in e.properties)
        if (r !== "children" && _.call(e.properties, r)) {
            const o = hn(n, r, e.properties[r]);
            if (o) {
                const [a, u] = o;
                n.tableCellAlignToStyle && a === "align" && typeof u == "string" && nn.has(e.tagName) ? l = u : t[a] = u
            }
        }
    if (l) {
        const o = t.style || (t.style = {});
        o[n.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = l
    }
    return t
}

function fn(n, e) {
    const t = {};
    for (const l of e.attributes)
        if (l.type === "mdxJsxExpressionAttribute")
            if (l.data && l.data.estree && n.evaluater) {
                const o = l.data.estree.body[0];
                A(o.type === "ExpressionStatement");
                const a = o.expression;
                A(a.type === "ObjectExpression");
                const u = a.properties[0];
                A(u.type === "SpreadElement"), Object.assign(t, n.evaluater.evaluateExpression(u.argument))
            } else O(n, e.position);
    else {
        const r = l.name;
        let o;
        if (l.value && typeof l.value == "object")
            if (l.value.data && l.value.data.estree && n.evaluater) {
                const u = l.value.data.estree.body[0];
                A(u.type === "ExpressionStatement"), o = n.evaluater.evaluateExpression(u.expression)
            } else O(n, e.position);
        else o = l.value === null ? !0 : l.value;
        t[r] = o
    }
    return t
}

function X(n, e) {
    const t = [];
    let l = -1;
    const r = n.passKeys ? new Map : Ge;
    for (; ++l < e.children.length;) {
        const o = e.children[l];
        let a;
        if (n.passKeys) {
            const p = o.type === "element" ? o.tagName : o.type === "mdxJsxFlowElement" || o.type === "mdxJsxTextElement" ? o.name : void 0;
            if (p) {
                const g = r.get(p) || 0;
                a = p + "-" + g, r.set(p, g + 1)
            }
        }
        const u = me(n, o, a);
        u !== void 0 && t.push(u)
    }
    return t
}

function hn(n, e, t) {
    const l = Re(n.schema, e);
    if (!(t == null || typeof t == "number" && Number.isNaN(t))) {
        if (Array.isArray(t) && (t = l.commaSeparated ? be(t) : ke(t)), l.property === "style") {
            let r = typeof t == "object" ? t : dn(n, String(t));
            return n.stylePropertyNameCase === "css" && (r = mn(r)), ["style", r]
        }
        return [n.elementAttributeNameCase === "react" && l.space ? Ue[l.property] || l.property : l.attribute, t]
    }
}

function dn(n, e) {
    const t = {};
    try {
        $e(e, l)
    } catch (r) {
        if (!n.ignoreInvalidStyle) {
            const o = r,
                a = new le("Cannot parse `style` attribute", {
                    ancestors: n.ancestors,
                    cause: o,
                    ruleId: "style",
                    source: "hast-util-to-jsx-runtime"
                });
            throw a.file = n.filePath || void 0, a.url = de + "#cannot-parse-style-attribute", a
        }
    }
    return t;

    function l(r, o) {
        let a = r;
        a.slice(0, 2) !== "--" && (a.slice(0, 4) === "-ms-" && (a = "ms-" + a.slice(4)), a = a.replace(Qe, yn)), t[a] = o
    }
}

function ye(n, e, t) {
    let l;
    if (!t) l = {
        type: "Literal",
        value: e
    };
    else if (e.includes(".")) {
        const r = e.split(".");
        let o = -1,
            a;
        for (; ++o < r.length;) {
            const u = K(r[o]) ? {
                type: "Identifier",
                name: r[o]
            } : {
                type: "Literal",
                value: r[o]
            };
            a = a ? {
                type: "MemberExpression",
                object: a,
                property: u,
                computed: !!(o && u.type === "Literal"),
                optional: !1
            } : u
        }
        l = a
    } else l = K(e) && !/^[a-z]/.test(e) ? {
        type: "Identifier",
        name: e
    } : {
        type: "Literal",
        value: e
    };
    if (l.type === "Literal") {
        const r = l.value;
        return _.call(n.components, r) ? n.components[r] : r
    }
    if (n.evaluater) return n.evaluater.evaluateExpression(l);
    O(n)
}

function O(n, e) {
    const t = new le("Cannot handle MDX estrees without `createEvaluater`", {
        ancestors: n.ancestors,
        place: e,
        ruleId: "mdx-estree",
        source: "hast-util-to-jsx-runtime"
    });
    throw t.file = n.filePath || void 0, t.url = de + "#cannot-handle-mdx-estrees-without-createevaluater", t
}

function mn(n) {
    const e = {};
    let t;
    for (t in n) _.call(n, t) && (e[gn(t)] = n[t]);
    return e
}

function gn(n) {
    let e = n.replace(Ze, vn);
    return e.slice(0, 3) === "ms-" && (e = "-" + e), e
}

function yn(n, e) {
    return e.toUpperCase()
}

function vn(n) {
    return "-" + n.toLowerCase()
}
const rt = {
    action: ["form"],
    cite: ["blockquote", "del", "ins", "q"],
    data: ["object"],
    formAction: ["button", "input"],
    href: ["a", "area", "base", "link"],
    icon: ["menuitem"],
    itemId: null,
    manifest: ["html"],
    ping: ["a", "area"],
    poster: ["video"],
    src: ["audio", "embed", "iframe", "img", "input", "script", "source", "track", "video"]
};

function xn(n, e) {
    const t = {
        type: "element",
        tagName: "blockquote",
        properties: {},
        children: n.wrap(n.all(e), !0)
    };
    return n.patch(e, t), n.applyData(e, t)
}

function bn(n, e) {
    const t = {
        type: "element",
        tagName: "br",
        properties: {},
        children: []
    };
    return n.patch(e, t), [n.applyData(e, t), {
        type: "text",
        value: `
`
    }]
}

function kn(n, e) {
    const t = e.value ? e.value + `
` : "",
        l = {};
    e.lang && (l.className = ["language-" + e.lang]);
    let r = {
        type: "element",
        tagName: "code",
        properties: l,
        children: [{
            type: "text",
            value: t
        }]
    };
    return e.meta && (r.data = {
        meta: e.meta
    }), n.patch(e, r), r = n.applyData(e, r), r = {
        type: "element",
        tagName: "pre",
        properties: {},
        children: [r]
    }, n.patch(e, r), r
}

function wn(n, e) {
    const t = {
        type: "element",
        tagName: "del",
        properties: {},
        children: n.all(e)
    };
    return n.patch(e, t), n.applyData(e, t)
}

function Cn(n, e) {
    const t = {
        type: "element",
        tagName: "em",
        properties: {},
        children: n.all(e)
    };
    return n.patch(e, t), n.applyData(e, t)
}

function Sn(n, e) {
    const t = typeof n.options.clobberPrefix == "string" ? n.options.clobberPrefix : "user-content-",
        l = String(e.identifier).toUpperCase(),
        r = L(l.toLowerCase()),
        o = n.footnoteOrder.indexOf(l);
    let a, u = n.footnoteCounts.get(l);
    u === void 0 ? (u = 0, n.footnoteOrder.push(l), a = n.footnoteOrder.length) : a = o + 1, u += 1, n.footnoteCounts.set(l, u);
    const p = {
        type: "element",
        tagName: "a",
        properties: {
            href: "#" + t + "fn-" + r,
            id: t + "fnref-" + r + (u > 1 ? "-" + u : ""),
            dataFootnoteRef: !0,
            ariaDescribedBy: ["footnote-label"]
        },
        children: [{
            type: "text",
            value: String(a)
        }]
    };
    n.patch(e, p);
    const g = {
        type: "element",
        tagName: "sup",
        properties: {},
        children: [p]
    };
    return n.patch(e, g), n.applyData(e, g)
}

function En(n, e) {
    const t = {
        type: "element",
        tagName: "h" + e.depth,
        properties: {},
        children: n.all(e)
    };
    return n.patch(e, t), n.applyData(e, t)
}

function Pn(n, e) {
    if (n.options.allowDangerousHtml) {
        const t = {
            type: "raw",
            value: e.value
        };
        return n.patch(e, t), n.applyData(e, t)
    }
}

function ve(n, e) {
    const t = e.referenceType;
    let l = "]";
    if (t === "collapsed" ? l += "[]" : t === "full" && (l += "[" + (e.label || e.identifier) + "]"), e.type === "imageReference") return [{
        type: "text",
        value: "![" + e.alt + l
    }];
    const r = n.all(e),
        o = r[0];
    o && o.type === "text" ? o.value = "[" + o.value : r.unshift({
        type: "text",
        value: "["
    });
    const a = r[r.length - 1];
    return a && a.type === "text" ? a.value += l : r.push({
        type: "text",
        value: l
    }), r
}

function Dn(n, e) {
    const t = String(e.identifier).toUpperCase(),
        l = n.definitionById.get(t);
    if (!l) return ve(n, e);
    const r = {
        src: L(l.url || ""),
        alt: e.alt
    };
    l.title !== null && l.title !== void 0 && (r.title = l.title);
    const o = {
        type: "element",
        tagName: "img",
        properties: r,
        children: []
    };
    return n.patch(e, o), n.applyData(e, o)
}

function Ln(n, e) {
    const t = {
        src: L(e.url)
    };
    e.alt !== null && e.alt !== void 0 && (t.alt = e.alt), e.title !== null && e.title !== void 0 && (t.title = e.title);
    const l = {
        type: "element",
        tagName: "img",
        properties: t,
        children: []
    };
    return n.patch(e, l), n.applyData(e, l)
}

function Nn(n, e) {
    const t = {
        type: "text",
        value: e.value.replace(/\r?\n|\r/g, " ")
    };
    n.patch(e, t);
    const l = {
        type: "element",
        tagName: "code",
        properties: {},
        children: [t]
    };
    return n.patch(e, l), n.applyData(e, l)
}

function An(n, e) {
    const t = String(e.identifier).toUpperCase(),
        l = n.definitionById.get(t);
    if (!l) return ve(n, e);
    const r = {
        href: L(l.url || "")
    };
    l.title !== null && l.title !== void 0 && (r.title = l.title);
    const o = {
        type: "element",
        tagName: "a",
        properties: r,
        children: n.all(e)
    };
    return n.patch(e, o), n.applyData(e, o)
}

function On(n, e) {
    const t = {
        href: L(e.url)
    };
    e.title !== null && e.title !== void 0 && (t.title = e.title);
    const l = {
        type: "element",
        tagName: "a",
        properties: t,
        children: n.all(e)
    };
    return n.patch(e, l), n.applyData(e, l)
}

function Mn(n, e, t) {
    const l = n.all(e),
        r = t ? Rn(t) : xe(e),
        o = {},
        a = [];
    if (typeof e.checked == "boolean") {
        const f = l[0];
        let d;
        f && f.type === "element" && f.tagName === "p" ? d = f : (d = {
            type: "element",
            tagName: "p",
            properties: {},
            children: []
        }, l.unshift(d)), d.children.length > 0 && d.children.unshift({
            type: "text",
            value: " "
        }), d.children.unshift({
            type: "element",
            tagName: "input",
            properties: {
                type: "checkbox",
                checked: e.checked,
                disabled: !0
            },
            children: []
        }), o.className = ["task-list-item"]
    }
    let u = -1;
    for (; ++u < l.length;) {
        const f = l[u];
        (r || u !== 0 || f.type !== "element" || f.tagName !== "p") && a.push({
            type: "text",
            value: `
`
        }), f.type === "element" && f.tagName === "p" && !r ? a.push(...f.children) : a.push(f)
    }
    const p = l[l.length - 1];
    p && (r || p.type !== "element" || p.tagName !== "p") && a.push({
        type: "text",
        value: `
`
    });
    const g = {
        type: "element",
        tagName: "li",
        properties: o,
        children: a
    };
    return n.patch(e, g), n.applyData(e, g)
}

function Rn(n) {
    let e = !1;
    if (n.type === "list") {
        e = n.spread || !1;
        const t = n.children;
        let l = -1;
        for (; !e && ++l < t.length;) e = xe(t[l])
    }
    return e
}

function xe(n) {
    const e = n.spread;
    return e ? ? n.children.length > 1
}

function Tn(n, e) {
    const t = {},
        l = n.all(e);
    let r = -1;
    for (typeof e.start == "number" && e.start !== 1 && (t.start = e.start); ++r < l.length;) {
        const a = l[r];
        if (a.type === "element" && a.tagName === "li" && a.properties && Array.isArray(a.properties.className) && a.properties.className.includes("task-list-item")) {
            t.className = ["contains-task-list"];
            break
        }
    }
    const o = {
        type: "element",
        tagName: e.ordered ? "ol" : "ul",
        properties: t,
        children: n.wrap(l, !0)
    };
    return n.patch(e, o), n.applyData(e, o)
}

function In(n, e) {
    const t = {
        type: "element",
        tagName: "p",
        properties: {},
        children: n.all(e)
    };
    return n.patch(e, t), n.applyData(e, t)
}

function Un(n, e) {
    const t = {
        type: "root",
        children: n.wrap(n.all(e))
    };
    return n.patch(e, t), n.applyData(e, t)
}

function Bn(n, e) {
    const t = {
        type: "element",
        tagName: "strong",
        properties: {},
        children: n.all(e)
    };
    return n.patch(e, t), n.applyData(e, t)
}

function Fn(n, e) {
    const t = n.all(e),
        l = t.shift(),
        r = [];
    if (l) {
        const a = {
            type: "element",
            tagName: "thead",
            properties: {},
            children: n.wrap([l], !0)
        };
        n.patch(e.children[0], a), r.push(a)
    }
    if (t.length > 0) {
        const a = {
                type: "element",
                tagName: "tbody",
                properties: {},
                children: n.wrap(t, !0)
            },
            u = H(e.children[1]),
            p = fe(e.children[e.children.length - 1]);
        u && p && (a.position = {
            start: u,
            end: p
        }), r.push(a)
    }
    const o = {
        type: "element",
        tagName: "table",
        properties: {},
        children: n.wrap(r, !0)
    };
    return n.patch(e, o), n.applyData(e, o)
}

function jn(n, e, t) {
    const l = t ? t.children : void 0,
        o = (l ? l.indexOf(e) : 1) === 0 ? "th" : "td",
        a = t && t.type === "table" ? t.align : void 0,
        u = a ? a.length : e.children.length;
    let p = -1;
    const g = [];
    for (; ++p < u;) {
        const d = e.children[p],
            x = {},
            b = a ? a[p] : void 0;
        b && (x.align = b);
        let s = {
            type: "element",
            tagName: o,
            properties: x,
            children: []
        };
        d && (s.children = n.all(d), n.patch(d, s), s = n.applyData(d, s)), g.push(s)
    }
    const f = {
        type: "element",
        tagName: "tr",
        properties: {},
        children: n.wrap(g, !0)
    };
    return n.patch(e, f), n.applyData(e, f)
}

function zn(n, e) {
    const t = {
        type: "element",
        tagName: "td",
        properties: {},
        children: n.all(e)
    };
    return n.patch(e, t), n.applyData(e, t)
}
const Z = 9,
    Q = 32;

function Hn(n) {
    const e = String(n),
        t = /\r?\n|\r/g;
    let l = t.exec(e),
        r = 0;
    const o = [];
    for (; l;) o.push(ee(e.slice(r, l.index), r > 0, !0), l[0]), r = l.index + l[0].length, l = t.exec(e);
    return o.push(ee(e.slice(r), r > 0, !1)), o.join("")
}

function ee(n, e, t) {
    let l = 0,
        r = n.length;
    if (e) {
        let o = n.codePointAt(l);
        for (; o === Z || o === Q;) l++, o = n.codePointAt(l)
    }
    if (t) {
        let o = n.codePointAt(r - 1);
        for (; o === Z || o === Q;) r--, o = n.codePointAt(r - 1)
    }
    return r > l ? n.slice(l, r) : ""
}

function _n(n, e) {
    const t = {
        type: "text",
        value: Hn(String(e.value))
    };
    return n.patch(e, t), n.applyData(e, t)
}

function Vn(n, e) {
    const t = {
        type: "element",
        tagName: "hr",
        properties: {},
        children: []
    };
    return n.patch(e, t), n.applyData(e, t)
}
const Xn = {
    blockquote: xn,
    break: bn,
    code: kn,
    delete: wn,
    emphasis: Cn,
    footnoteReference: Sn,
    heading: En,
    html: Pn,
    imageReference: Dn,
    image: Ln,
    inlineCode: Nn,
    linkReference: An,
    link: On,
    listItem: Mn,
    list: Tn,
    paragraph: In,
    root: Un,
    strong: Bn,
    table: Fn,
    tableCell: zn,
    tableRow: jn,
    text: _n,
    thematicBreak: Vn,
    toml: R,
    yaml: R,
    definition: R,
    footnoteDefinition: R
};

function R() {}

function Kn(n, e) {
    const t = [{
        type: "text",
        value: "↩"
    }];
    return e > 1 && t.push({
        type: "element",
        tagName: "sup",
        properties: {},
        children: [{
            type: "text",
            value: String(e)
        }]
    }), t
}

function Wn(n, e) {
    return "Back to reference " + (n + 1) + (e > 1 ? "-" + e : "")
}

function qn(n) {
    const e = typeof n.options.clobberPrefix == "string" ? n.options.clobberPrefix : "user-content-",
        t = n.options.footnoteBackContent || Kn,
        l = n.options.footnoteBackLabel || Wn,
        r = n.options.footnoteLabel || "Footnotes",
        o = n.options.footnoteLabelTagName || "h2",
        a = n.options.footnoteLabelProperties || {
            className: ["sr-only"]
        },
        u = [];
    let p = -1;
    for (; ++p < n.footnoteOrder.length;) {
        const g = n.footnoteById.get(n.footnoteOrder[p]);
        if (!g) continue;
        const f = n.all(g),
            d = String(g.identifier).toUpperCase(),
            x = L(d.toLowerCase());
        let b = 0;
        const s = [],
            c = n.footnoteCounts.get(d);
        for (; c !== void 0 && ++b <= c;) {
            s.length > 0 && s.push({
                type: "text",
                value: " "
            });
            let C = typeof t == "string" ? t : t(p, b);
            typeof C == "string" && (C = {
                type: "text",
                value: C
            }), s.push({
                type: "element",
                tagName: "a",
                properties: {
                    href: "#" + e + "fnref-" + x + (b > 1 ? "-" + b : ""),
                    dataFootnoteBackref: "",
                    ariaLabel: typeof l == "string" ? l : l(p, b),
                    className: ["data-footnote-backref"]
                },
                children: Array.isArray(C) ? C : [C]
            })
        }
        const y = f[f.length - 1];
        if (y && y.type === "element" && y.tagName === "p") {
            const C = y.children[y.children.length - 1];
            C && C.type === "text" ? C.value += " " : y.children.push({
                type: "text",
                value: " "
            }), y.children.push(...s)
        } else f.push(...s);
        const S = {
            type: "element",
            tagName: "li",
            properties: {
                id: e + "fn-" + x
            },
            children: n.wrap(f, !0)
        };
        n.patch(g, S), u.push(S)
    }
    if (u.length !== 0) return {
        type: "element",
        tagName: "section",
        properties: {
            dataFootnotes: !0,
            className: ["footnotes"]
        },
        children: [{
            type: "element",
            tagName: o,
            properties: { ...T(a),
                id: "footnote-label"
            },
            children: [{
                type: "text",
                value: r
            }]
        }, {
            type: "text",
            value: `
`
        }, {
            type: "element",
            tagName: "ol",
            properties: {},
            children: n.wrap(u, !0)
        }, {
            type: "text",
            value: `
`
        }]
    }
}
const F = {}.hasOwnProperty,
    Yn = {};

function $n(n, e) {
    const t = e || Yn,
        l = new Map,
        r = new Map,
        o = new Map,
        a = { ...Xn,
            ...t.handlers
        },
        u = {
            all: g,
            applyData: Gn,
            definitionById: l,
            footnoteById: r,
            footnoteCounts: o,
            footnoteOrder: [],
            handlers: a,
            one: p,
            options: t,
            patch: Jn,
            wrap: Qn
        };
    return we(n, function(f) {
        if (f.type === "definition" || f.type === "footnoteDefinition") {
            const d = f.type === "definition" ? l : r,
                x = String(f.identifier).toUpperCase();
            d.has(x) || d.set(x, f)
        }
    }), u;

    function p(f, d) {
        const x = f.type,
            b = u.handlers[x];
        if (F.call(u.handlers, x) && b) return b(u, f, d);
        if (u.options.passThrough && u.options.passThrough.includes(x)) {
            if ("children" in f) {
                const {
                    children: c,
                    ...y
                } = f, S = T(y);
                return S.children = u.all(f), S
            }
            return T(f)
        }
        return (u.options.unknownHandler || Zn)(u, f, d)
    }

    function g(f) {
        const d = [];
        if ("children" in f) {
            const x = f.children;
            let b = -1;
            for (; ++b < x.length;) {
                const s = u.one(x[b], f);
                if (s) {
                    if (b && x[b - 1].type === "break" && (!Array.isArray(s) && s.type === "text" && (s.value = ne(s.value)), !Array.isArray(s) && s.type === "element")) {
                        const c = s.children[0];
                        c && c.type === "text" && (c.value = ne(c.value))
                    }
                    Array.isArray(s) ? d.push(...s) : d.push(s)
                }
            }
        }
        return d
    }
}

function Jn(n, e) {
    n.position && (e.position = Je(n))
}

function Gn(n, e) {
    let t = e;
    if (n && n.data) {
        const l = n.data.hName,
            r = n.data.hChildren,
            o = n.data.hProperties;
        if (typeof l == "string")
            if (t.type === "element") t.tagName = l;
            else {
                const a = "children" in t ? t.children : [t];
                t = {
                    type: "element",
                    tagName: l,
                    properties: {},
                    children: a
                }
            }
        t.type === "element" && o && Object.assign(t.properties, T(o)), "children" in t && t.children && r !== null && r !== void 0 && (t.children = r)
    }
    return t
}

function Zn(n, e) {
    const t = e.data || {},
        l = "value" in e && !(F.call(t, "hProperties") || F.call(t, "hChildren")) ? {
            type: "text",
            value: e.value
        } : {
            type: "element",
            tagName: "div",
            properties: {},
            children: n.all(e)
        };
    return n.patch(e, l), n.applyData(e, l)
}

function Qn(n, e) {
    const t = [];
    let l = -1;
    for (e && t.push({
            type: "text",
            value: `
`
        }); ++l < n.length;) l && t.push({
        type: "text",
        value: `
`
    }), t.push(n[l]);
    return e && n.length > 0 && t.push({
        type: "text",
        value: `
`
    }), t
}

function ne(n) {
    let e = 0,
        t = n.charCodeAt(e);
    for (; t === 9 || t === 32;) e++, t = n.charCodeAt(e);
    return n.slice(e)
}

function te(n, e) {
    const t = $n(n, e),
        l = t.one(n, void 0),
        r = qn(t),
        o = Array.isArray(l) ? {
            type: "root",
            children: l
        } : l || {
            type: "root",
            children: []
        };
    return r && o.children.push({
        type: "text",
        value: `
`
    }, r), o
}

function ot(n, e) {
    return n && "run" in n ? async function(t, l) {
        const r = te(t, {
            file: l,
            ...e
        });
        await n.run(r, l)
    } : function(t, l) {
        return te(t, {
            file: l,
            ...n || e
        })
    }
}
export {
    Re as f, Be as h, U as n, ot as r, z as s, lt as t, rt as u
};
//# sourceMappingURL=1bc04b52-pfqcgruptyx7togk.js.map