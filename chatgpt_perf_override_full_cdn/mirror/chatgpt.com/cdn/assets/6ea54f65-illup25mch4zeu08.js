import {
    r as l,
    u as D,
    j as o,
    h as B,
    o as te
} from "./2340486e-dvd8m80i7d6hyild.js";
import {
    aW as ne,
    aw as se,
    ef as re,
    D as y,
    dS as oe,
    cO as ie,
    di as j,
    b5 as ae,
    a0 as U,
    hk as ce,
    cz as R,
    ix as le,
    be as de,
    cN as he,
    bW as ue
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    wv as fe,
    ww as me,
    wx as pe,
    b9 as ge
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    u as ye
} from "./9ed9a415-g39uishgri10upf4.js";
import {
    C as Ee
} from "./af004db9-d3svat17gfrlvrrt.js";
import {
    G as ve
} from "./76527257-cpwybk70pkgunsyf.js";
import "./7f00cfec-f04y2v5idy58f22s.js";
import "./b9ebfa06-dm8xq0zfweyjlyrr.js";
import "./089c718c-l3mqz3tt2i5t2xnq.js";
import "./84e8f385-lndtlkfi7kijfbdy.js";
import "./929b8f98-n5a152jpew1p3rsl.js";
import "./b81d67c1-edign3dbahpky6bz.js";
import "./28938d3c-ntjvzk8j4ndk27zo.js";
import "./5983c1e5-d8kn80dssel0a0ls.js";
import "./db62250d-jvde196a4722ll12.js";

function Ce(n) {
    const {
        session: e
    } = ne();
    l.useEffect(() => {
        fe(n, e ? .accessToken ? ? null)
    }, [n, e ? .accessToken])
}
const _e = ({
        handleEndControl: n,
        isConnecting: e
    }) => {
        const t = D(),
            s = C.controlModeTitle,
            r = e ? C.connectingDescription : C.controlModeDescription;
        return o.jsxs("div", {
            className: "border-token-border-default relative z-10 flex w-full items-center justify-between gap-3 border-t px-7 py-6",
            style: {
                boxShadow: "0px -2px 8px 0px rgba(0, 0, 0, 0.05)"
            },
            children: [o.jsxs("div", {
                className: "flex flex-col",
                children: [o.jsx("span", {
                    className: "text-token-text-primary font-medium",
                    children: t.formatMessage(s)
                }), o.jsx("span", {
                    className: "text-token-text-secondary text-sm",
                    children: t.formatMessage(r)
                })]
            }), o.jsx(se, {
                onClick: n,
                color: "primary",
                children: t.formatMessage(C.endControlButton)
            })]
        })
    },
    C = B({
        connectingDescription: {
            id: "takeoverControlPanel.connectingDescription",
            defaultMessage: "Connecting…"
        },
        controlModeTitle: {
            id: "takeoverControlPanel.controlModeTitle",
            defaultMessage: "You’re controlling the browser"
        },
        controlModeDescription: {
            id: "takeoverControlPanel.controlModeDescription",
            defaultMessage: "ChatGPT won’t see or store anything you do while you’re here."
        },
        endControlButton: {
            id: "vnc.endControlButton",
            defaultMessage: "Finish controlling"
        }
    }),
    _ = 10,
    L = 19;
var b = (n => (n.OBSERVE = "observe", n.CONTROL = "control", n))(b || {}),
    m = (n => (n.MESSAGE = "message", n.ERROR = "error", n.MODE_CHANGE = "modechange", n.STREAMING = "streaming", n.DATA_OPENED = "dataopened", n.DATA_CLOSED = "dataclosed", n.CONNECTED = "connected", n.DISCONNECTED = "disconnected", n))(m || {});
const w = n => typeof n == "object" && n !== null && !Array.isArray(n),
    be = n => w(n) && n.event === "control/clipboard" && typeof n.text == "string",
    we = n => w(n) && n.event === "control/locked",
    ke = n => w(n) && n.event === "control/release",
    Se = n => be(n) || we(n) || ke(n) || w(n),
    xe = 118,
    Me = 200;
class p {
    constructor(e = "", t = null) {
        this.stream = null, this.mode = "observe", this.peerConnection = null, this.dataChannel = null, this._additionalHeaders = null, this._invertScroll = !0, this._onPeerDidResolve = [], this._onPeerDidRejection = [], this._peerTimeout = 0, this._listeners = {
            connected: [],
            disconnected: [],
            message: [],
            error: [],
            dataopened: [],
            dataclosed: [],
            streaming: [],
            modechange: []
        }, this.keyboard = new ve, this.keyEventSource = null, this.mouseEventSource = null, this._wheelThrottle = !1, this._clipboardSyncInProgress = !1, this._clipboardSyncWaiter = null, this._keyEventBuffer = [], this._lastClipboardText = null, this._handlePeerTrack = s => {
            if (s.track.kind !== "video") return;
            const [r] = s.streams;
            r && (this._handleStream(r), this.addEventListener("dataopened", () => this._handlePeerDidResolve()))
        }, this._peerURL = e, this._additionalHeaders = t, this.keyboard.onkeydown = this.keyDown.bind(this), this.keyboard.onkeyup = this.keyUp.bind(this), this._sendEvent = this.sendEvent.bind(this), this._onContextMenu = this.onContextMenu.bind(this)
    }
    get peerURL() {
        return this._peerURL
    }
    set peerURL(e) {
        this.disconnect(), this._peerURL = e
    }
    get additionalHeaders() {
        return this._additionalHeaders
    }
    set additionalHeaders(e) {
        this.disconnect(), this._additionalHeaders = e
    }
    connect(e = 2e3) {
        return setTimeout(() => this._createPeer()), this._peerTimeout || (this._peerTimeout = window.setTimeout(() => this._handlePeerDidRejection(new Error("The connection timed‑out while waiting for the peer to respond.")), e)), new Promise((t, s) => {
            this._onPeerDidResolve.push(t), this._onPeerDidRejection.push(s)
        })
    }
    disconnect() {
        this.dataChannel ? .close(), this.dataChannel = null, this.peerConnection ? .close(), this.peerConnection = null, this._emit("disconnected", this)
    }
    setMode(e) {
        switch (e) {
            case "control":
                this._requestControl();
                break;
            case "observe":
                this._releaseControl();
                break;
            default:
                throw new Error(`Invalid client mode "${e}" specified.`)
        }
    }
    sendData(e, t) {
        if (this.mode !== "control" || !this.dataChannel) return;
        if (e === "clipboard") {
            const {
                text: i
            } = t;
            this.dataChannel.send(JSON.stringify({
                event: "control/clipboard",
                text: i
            }));
            return
        }
        let s, r;
        switch (e) {
            case "mousemove":
                {
                    const {
                        x: i,
                        y: a
                    } = t;s = new ArrayBuffer(7),
                    r = new DataView(s),
                    r.setUint8(0, 1),
                    r.setUint16(1, 4, !0),
                    r.setUint16(3, i, !0),
                    r.setUint16(5, a, !0);
                    break
                }
            case "wheel":
                {
                    const {
                        x: i,
                        y: a
                    } = t;s = new ArrayBuffer(7),
                    r = new DataView(s),
                    r.setUint8(0, 2),
                    r.setUint16(1, 4, !0),
                    r.setInt16(3, i, !0),
                    r.setInt16(5, a, !0);
                    break
                }
            case "keydown":
            case "mousedown":
                {
                    const {
                        key: i
                    } = t;s = new ArrayBuffer(11),
                    r = new DataView(s),
                    r.setUint8(0, 3),
                    r.setUint16(1, 8, !0),
                    r.setBigUint64(3, BigInt(i), !0);
                    break
                }
            case "keyup":
            case "mouseup":
                {
                    const {
                        key: i
                    } = t;s = new ArrayBuffer(11),
                    r = new DataView(s),
                    r.setUint8(0, 4),
                    r.setUint16(1, 8, !0),
                    r.setBigUint64(3, BigInt(i), !0);
                    break
                }
            default:
                console.warn("Unknown event", e);
                return
        }
        this.dataChannel.send(s)
    }
    mouseMoved(e, t) {
        this.sendData("mousemove", t ? p.getScaledOffset(e, t) : e)
    }
    mouseDown(e) {
        this.sendData("mousedown", {
            key: e + 1
        })
    }
    mouseUp(e) {
        this.sendData("mouseup", {
            key: e + 1
        })
    }
    sendMouseEvent(e) {
        switch (e.type) {
            case "mousedown":
                this.mouseDown(e.button);
                break;
            case "mouseup":
                this.mouseUp(e.button);
                break;
            case "mousemove":
                this.mouseMoved({
                    x: e.offsetX,
                    y: e.offsetY
                }, e.currentTarget instanceof HTMLVideoElement ? e.currentTarget : void 0);
                break
        }
    }
    sendWheelEvent(e) {
        let {
            deltaX: t,
            deltaY: s
        } = e;
        e.deltaMode !== 0 && (t *= L, s *= L), this._invertScroll && (t *= -1, s *= -1), t = Math.min(Math.max(t, -_), _), s = Math.min(Math.max(s, -_), _), this.mouseMoved({
            x: e.offsetX,
            y: e.offsetY
        }, e.currentTarget instanceof HTMLVideoElement ? e.currentTarget : void 0), this._wheelThrottle || (this._wheelThrottle = !0, this.sendData("wheel", {
            x: t,
            y: s
        }), setTimeout(() => {
            this._wheelThrottle = !1
        }, 100))
    }
    _isPasteKey(e) {
        return e === xe && (this.keyboard.modifiers.meta || this.keyboard.modifiers.ctrl)
    }
    async _startSyncClipboard() {
        if (document.hasFocus() && !this._clipboardSyncInProgress) {
            console.log("startSyncClipboard"), this._clipboardSyncInProgress = !0;
            try {
                const e = await navigator.clipboard.readText();
                e !== this._lastClipboardText && (this._lastClipboardText = e, this.dataChannel ? .send(JSON.stringify({
                    event: "control/clipboard",
                    text: e
                })), console.log("clipboard sent to remote"), setTimeout(() => {
                    this._clipboardSyncWaiter && (console.log("clipboard timeout"), this._clipboardSyncWaiter(), this._clipboardSyncWaiter = null)
                }, Me), await new Promise(t => {
                    this._clipboardSyncWaiter = t
                }), console.log("clipboard updated"))
            } finally {
                this._flushKeyEvents(), this._clipboardSyncInProgress = !1
            }
        }
    }
    async keyDown(e) {
        this._pushKeyEvent({
            type: "keydown",
            key: p.getPlatformKeyCode(e)
        }), this._isPasteKey(e) && await this._startSyncClipboard(), !this._clipboardSyncInProgress && this._flushKeyEvents()
    }
    async keyUp(e) {
        this._pushKeyEvent({
            type: "keyup",
            key: p.getPlatformKeyCode(e)
        }), !this._clipboardSyncInProgress && this._flushKeyEvents()
    }
    _pushKeyEvent(e) {
        this._keyEventBuffer.push(e)
    }
    _flushKeyEvents() {
        for (const e of this._keyEventBuffer) this.sendData(e.type, {
            key: e.key
        });
        this._keyEventBuffer = []
    }
    sendKeyEvent(e) {
        this.mode !== "observe" && this.keyboard.interpretKeyEvent(e)
    }
    sendEvent(e) {
        e.preventDefault(), e instanceof WheelEvent ? this.sendWheelEvent(e) : e instanceof MouseEvent ? this.sendMouseEvent(e) : e instanceof KeyboardEvent && this.sendKeyEvent(e)
    }
    onContextMenu(e) {
        e.preventDefault()
    }
    setKeyEventSource(e) {
        const t = ["keydown", "keypress", "keyup"];
        if (this.keyEventSource)
            for (const s of t) this.keyEventSource.removeEventListener(s, this._sendEvent, !0);
        if (e) {
            if (typeof e == "string" ? this.keyEventSource = document.querySelector(e) : this.keyEventSource = e, !this.keyEventSource) {
                console.warn("[NekoClient] Invalid key event source.");
                return
            }
            for (const s of t) this.keyEventSource.addEventListener(s, this._sendEvent, !0)
        }
    }
    setMouseEventSource(e) {
        const t = ["mousemove", "mousedown", "mouseup", "wheel"];
        if (this.mouseEventSource) {
            for (const s of t) this.mouseEventSource.removeEventListener(s, this._sendEvent);
            this.mouseEventSource.removeEventListener("contextmenu", this._onContextMenu)
        }
        if (e) {
            if (typeof e == "string" ? this.mouseEventSource = document.querySelector(e) : this.mouseEventSource = e, !this.mouseEventSource) {
                console.warn("[NekoClient] Invalid mouse event source.");
                return
            }
            for (const s of t) this.mouseEventSource.addEventListener(s, this._sendEvent);
            this.mouseEventSource.addEventListener("contextmenu", this._onContextMenu)
        }
    }
    addEventListener(e, t) {
        this._listeners[e].push(t)
    }
    removeEventListener(e, t) {
        const s = this._listeners[e].indexOf(t);
        s !== -1 && this._listeners[e].splice(s, 1)
    }
    _emit(e, ...t) {
        for (const s of this._listeners[e]) s(...t)
    }
    _handleDataChannelDidOpen() {
        this.dataChannel && (this._emit("dataopened", this.dataChannel), this.addEventListener("streaming", () => this._emit("connected", this)))
    }
    _handleDataChannelDidClose() {
        this._emit("dataclosed")
    }
    _handleMessage(e) {
        console.log("_handleMessage", e);
        let t, s;
        try {
            typeof e.data == "string" && (t = JSON.parse(e.data))
        } catch (r) {
            s = r
        }
        if (s || !Se(t)) {
            this._emit("error", s ? s instanceof Error ? s : new Error(`Failed to parse message: ${s}`) : new Error(`Invalid message payload: ${e.data}`));
            return
        }
        switch (this._emit("message", t), t.event) {
            case "control/clipboard":
                console.log("_handleMessage - control/clipboard"), navigator.clipboard.writeText(t.text).catch(r => {
                    console.log("control/clipboard error"), this._handleError(r instanceof Error ? r : new Error(`Pasteboard Error: ${r}`))
                }).finally(() => {
                    console.log("control/clipboard finally"), this._clipboardSyncWaiter && (console.log("control/clipboard finally - _clipboardSyncWaiter", this._clipboardSyncWaiter), this._clipboardSyncWaiter(), this._clipboardSyncWaiter = null)
                });
                break;
            case "control/locked":
                this._handleModeDidChange("control");
                break;
            case "control/release":
                this._handleModeDidChange("observe");
                break
        }
    }
    _handleModeDidChange(e) {
        this.mode = e, this._emit("modechange", e)
    }
    _handlePeerDidResolve() {
        this._emit("connected", this), setTimeout(() => {
            this._listeners.dataopened.length = 0, this._listeners.streaming.length = 0
        }), clearTimeout(this._peerTimeout), this._peerTimeout = 0, this._onPeerDidRejection.length = 0, this._onPeerDidResolve.forEach(e => e(this)), this._onPeerDidResolve.length = 0
    }
    _handlePeerDidRejection(e) {
        this._onPeerDidResolve.length = 0, this._onPeerDidRejection.forEach(t => t(e)), this._onPeerDidRejection.length = 0, this._handleError(e)
    }
    _handleStream(e) {
        this.stream = e, this._emit("streaming", e)
    }
    _handleError(e) {
        this._emit("error", e)
    }
    _createPeer() {
        console.assert(this.peerConnection === null, "WARNING: Client already connected"), this.peerConnection = new RTCPeerConnection, this.peerConnection.ontrack = this._handlePeerTrack, this.peerConnection.addTransceiver("audio"), this.peerConnection.addTransceiver("video"), this.dataChannel = this.peerConnection.createDataChannel(""), this.dataChannel.onmessage = this._handleMessage.bind(this), this.dataChannel.onopen = this._handleDataChannelDidOpen.bind(this), this.dataChannel.onclose = this._handleDataChannelDidClose.bind(this), this.dataChannel.onerror = e => this._handleError("error" in e && e.error instanceof Error ? e.error : new Error(`Unknown Data Channel Error: ${JSON.stringify(e)}`)), this.peerConnection.createOffer().then(e => (this.peerConnection ? .setLocalDescription(e), fetch(this._peerURL, {
            method: "POST",
            body: e.sdp ? ? "",
            headers: {
                "Content-Type": "application/sdp",
                ...this._additionalHeaders ? ? {}
            }
        }))).then(e => e.text()).then(e => {
            this.peerConnection ? .setRemoteDescription({
                type: "answer",
                sdp: e
            }).catch(this._handlePeerDidRejection.bind(this))
        }).catch(this._handlePeerDidRejection.bind(this))
    }
    _requestControl() {
        this.dataChannel ? .send(JSON.stringify({
            event: "control/request"
        }))
    }
    _releaseControl() {
        this.dataChannel ? .send(JSON.stringify({
            event: "control/release"
        }))
    }
    static get _isMacOS() {
        return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
    }
    static getPlatformKeyCode(e) {
        if (!p._isMacOS) return e;
        switch (e) {
            case 65511:
                return 65507;
            case 65515:
                return 65513;
            case 65516:
                return 65515;
            case 65513:
                return 65406;
            case 65514:
                return 65027;
            default:
                return e
        }
    }
    static getScaledOffset({
        x: e,
        y: t
    }, s) {
        const {
            width: r,
            height: i
        } = s.getBoundingClientRect(), {
            videoWidth: a,
            videoHeight: c
        } = s;
        return {
            x: Math.round(a / r * e),
            y: Math.round(c / i * t)
        }
    }
}
const De = 2e4;
class Ne {
    nekoClient = null;
    videoElement = null;
    initialized = !1;
    init(e, t, s, r, i, a, c) {
        if (this.initialized) return;
        this.initialized = !0, this.videoElement = r;
        const f = re();
        return delete f["cf-timezone"], this.nekoClient = new p(t, {
            Authorization: `Bearer ${s}`,
            "Content-Type": "application/sdp",
            ...f
        }), this.nekoClient.addEventListener(m.STREAMING, d => {
            this.videoElement && (this.videoElement.srcObject = d, i())
        }), this.nekoClient.addEventListener(m.DATA_OPENED, () => {
            this.setMode(c ? ? b.CONTROL)
        }), this.nekoClient.addEventListener(m.MODE_CHANGE, d => {
            this.nekoClient && d === b.CONTROL && (this.nekoClient.setKeyEventSource(document), this.nekoClient.setMouseEventSource(this.videoElement))
        }), this.nekoClient.addEventListener(m.DISCONNECTED, d => {
            d.setMouseEventSource(null), d.setKeyEventSource(null), this.initialized = !1
        }), this.nekoClient.addEventListener(m.ERROR, d => {
            y.addError("[NekoClient] Error", {
                cause: d,
                conversationId: e
            }), this.nekoClient ? .disconnect(), a(d)
        }), this.connect()
    }
    connect() {
        return this.nekoClient ? .connect(De)
    }
    disconnect() {
        this.initialized = !1, this.nekoClient ? .disconnect()
    }
    setMode(e) {
        this.nekoClient ? .setMode(e)
    }
    setKeyEventSource(e) {
        this.nekoClient ? .setKeyEventSource(e)
    }
    setMouseEventSource(e) {
        this.nekoClient ? .setMouseEventSource(e)
    }
    addEventListener(e, t) {
        this.nekoClient ? .addEventListener(e, t)
    }
    getMode() {
        return this.nekoClient ? .mode
    }
}
const I = new Ne;

function Te(n) {
    const [e, t] = l.useState({
        status: n ? "loading" : "error",
        src: ""
    });
    return l.useEffect(() => {
        if (!n) {
            t({
                status: "error",
                src: ""
            });
            return
        }
        let s = !1;
        return (async () => {
            t({
                status: "loading",
                src: ""
            });
            try {
                await new Promise((i, a) => {
                    const c = new Image;
                    c.onload = () => i(), c.onerror = () => a(new Error("failed")), c.src = n
                }), s || t({
                    status: "loaded",
                    src: n
                })
            } catch (i) {
                s || t({
                    status: "error",
                    src: ""
                }), s || y.addError(i)
            }
        })(), () => {
            s = !0
        }
    }, [n]), {
        status: e.status,
        src: e.src,
        isLoaded: e.status === "loaded",
        isError: e.status === "error"
    }
}
const Pe = ({
    isOpen: n,
    onClose: e,
    onRetry: t,
    errorMessage: s
}) => {
    const r = D();
    let i = r.formatMessage(g.connectionErrorDescription);
    return o.jsx(U, {
        testId: "modal-takeover-connection-error",
        isOpen: n,
        onClose: e,
        icon: ce,
        title: r.formatMessage(g.connectionErrorTitle),
        description: i,
        type: "warning",
        rootClassName: "z-50",
        onEscapeKeyDown: a => {
            a.stopPropagation(), a.preventDefault()
        },
        shouldIgnoreClickOutside: !0,
        secondaryButton: o.jsx(R.Button, {
            onClick: e,
            title: r.formatMessage(g.okButton)
        }),
        primaryButton: o.jsx(R.Button, {
            onClick: t,
            title: r.formatMessage(g.retryButton)
        })
    })
};

function Oe(n, e) {
    return `https://realtime.chatgpt.com/v1/cua?cid=${n}`
}
const je = ({
        clientThreadId: n,
        serverThreadId: e,
        token: t,
        isResuming: s,
        vmId: r,
        onClose: i
    }) => {
        const a = l.useRef(null),
            [c, f] = l.useState(!0),
            [d, k] = l.useState(!1),
            [N, K] = l.useState(!1),
            [A, V] = l.useState(!1),
            [H, v] = l.useState(!1),
            [W, E] = l.useState(null),
            T = oe(n, h => ie.findNode(h, u => u.message.content.content_type === j.ComputerOutput)),
            $ = T ? .message.content.content_type === j.ComputerOutput ? T ? .message.content.screenshot : void 0,
            S = Oe(e),
            P = l.useCallback(h => {
                y.addError(h), E(h.message), v(!0), k(!0)
            }, []),
            x = l.useCallback(async h => {
                f(!0), k(!1);
                try {
                    a.current && S && await I.init(e, S, h, a.current, () => {
                        K(!0)
                    }, P, b.CONTROL)
                } catch (u) {
                    u instanceof Error ? (y.addError(u), E(u.message)) : (y.addError(new Error("Unknown error")), E("An unknown error occurred")), v(!0), k(!0)
                } finally {
                    f(!1)
                }
            }, [P, e, S]);
        l.useEffect(() => {
            t && (s || x(t))
        }, [t, x, s]), l.useEffect(() => {
            const h = a.current;
            if (!h) return;
            const u = () => {
                V(!0)
            };
            return h.addEventListener("playing", u), () => {
                h.removeEventListener("playing", u)
            }
        }, []), l.useEffect(() => {
            const h = u => {
                u.preventDefault()
            };
            if (N) return window.addEventListener("beforeunload", h), () => window.removeEventListener("beforeunload", h)
        }, [N]);

        function G() {
            I.disconnect(), i({
                startNewTurn: !0
            })
        }

        function F() {
            v(!1), E(null), t && x(t)
        }

        function Y() {
            v(!1), E(null), i({
                startNewTurn: !1
            })
        }
        const z = !d && !A && !s,
            J = me($, e),
            {
                isLoaded: q,
                src: O
            } = Te(J),
            M = "64px",
            {
                bar: X,
                ratio: Q,
                vw: Z,
                vh: ee
            } = {
                bar: "93px",
                ratio: "4/3",
                vw: `calc(100vw - ${M} * 2)`,
                vh: `calc(100dvh - ${M} * 2)`
            };
        return o.jsxs("div", {
            className: `flex h-full w-full flex-col items-center justify-center p-[${M}]`,
            children: [o.jsxs("div", {
                className: "bg-token-bg-primary flex flex-col items-center justify-center overflow-hidden rounded-lg shadow-lg",
                style: {
                    width: `min(${Z}, calc((${ee} - ${X}) * ${Q}))`
                },
                children: [o.jsxs("div", {
                    className: "group bg-token-bg-tertiary relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden",
                    children: [q && O && o.jsx("img", {
                        src: O,
                        alt: "",
                        className: "absolute inset-0 h-full w-full opacity-20 blur"
                    }), o.jsx("video", {
                        ref: a,
                        className: "absolute inset-0 h-full w-full object-contain",
                        autoPlay: !0,
                        playsInline: !0,
                        muted: !0
                    }), s && o.jsx("div", {
                        className: "absolute inset-0 flex items-center justify-center",
                        children: o.jsx(Re, {
                            size: 36
                        })
                    }), z && o.jsx("div", {
                        className: "absolute inset-0 flex items-center justify-center",
                        children: o.jsx(Ee, {
                            size: 36
                        })
                    })]
                }), o.jsx(_e, {
                    handleEndControl: G,
                    isConnecting: c
                })]
            }), !1, o.jsx(Pe, {
                isOpen: H,
                onClose: Y,
                onRetry: F,
                errorMessage: W
            })]
        })
    },
    g = B({
        retryButton: {
            id: "vnc.retryButton",
            defaultMessage: "Retry"
        },
        okButton: {
            id: "vnc.okButton",
            defaultMessage: "OK"
        },
        connectionErrorTitle: {
            id: "vnc.connectionErrorTitle",
            defaultMessage: "Could not connect to virtual browser"
        },
        connectionErrorDescription: {
            id: "vnc.connectionErrorDescription",
            defaultMessage: "There was a problem connecting to the remote browser. Try again later."
        },
        restoringComputer: {
            id: "vnc.restoringComputer",
            defaultMessage: "Restoring computer..."
        }
    });

function Re({
    size: n = 48,
    strokeWidth: e = 2,
    duration: t = 30,
    endPercent: s = .9
}) {
    const r = D(),
        i = (n - e) / 2,
        a = 2 * Math.PI * i,
        c = a,
        f = a,
        d = a * (1 - s);
    return o.jsxs("div", {
        className: "relative flex flex-col items-center justify-center gap-2",
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": s * 100,
        "aria-label": r.formatMessage(g.restoringComputer),
        children: [o.jsxs("svg", {
            width: n,
            height: n,
            viewBox: `0 0 ${n} ${n}`,
            className: "rotate-[-90deg]",
            children: [o.jsx("circle", {
                cx: n / 2,
                cy: n / 2,
                r: i,
                fill: "transparent",
                strokeWidth: e,
                className: "text-[var(--sidebar-surface-secondary)]",
                stroke: "currentColor"
            }), o.jsx(ae.circle, {
                cx: n / 2,
                cy: n / 2,
                r: i,
                fill: "transparent",
                strokeWidth: e,
                className: "text-[var(--main-surface-primary-inverse)]",
                stroke: "currentColor",
                strokeDasharray: c,
                strokeDashoffset: f,
                animate: {
                    strokeDashoffset: d
                },
                transition: {
                    duration: t,
                    ease: "linear"
                }
            })]
        }), o.jsx("div", {
            className: "absolute -bottom-8 flex items-center justify-center whitespace-nowrap",
            children: r.formatMessage(g.restoringComputer)
        })]
    })
}
const Le = ({
        clientThreadId: n,
        serverThreadId: e,
        token: t,
        isOpen: s,
        isResuming: r,
        vmId: i,
        onClose: a
    }) => o.jsx(U, {
        testId: "modal-vnc-viewer-content",
        type: "success",
        size: "fullscreen",
        isOpen: s,
        onClose: () => a({
            startNewTurn: !1
        }),
        title: o.jsx(te, {
            id: "vnc.message.contentModalTitle",
            defaultMessage: "Virtual browser"
        }),
        shouldIgnoreClickOutside: !0,
        onEscapeKeyDown: c => {
            c.stopPropagation(), c.preventDefault()
        },
        visuallyHiddenHeader: !0,
        className: "bg-token-bg-primary/40! backdrop-blur-sm",
        children: e && t && o.jsx(je, {
            clientThreadId: n,
            serverThreadId: e,
            token: t,
            isResuming: r,
            vmId: i,
            onClose: c => a(c)
        })
    }),
    Ie = ({
        clientThreadId: n
    }) => {
        Ce(n);
        const {
            isOpen: e,
            token: t,
            isResuming: s,
            vmId: r,
            close: i
        } = ye(), {
            selectedSources: a
        } = ge(de(n)), c = he(n), f = e ? o.jsx(Le, {
            clientThreadId: n,
            serverThreadId: c,
            token: t,
            isOpen: e,
            isResuming: s,
            vmId: r,
            onClose: d => i(a, d)
        }) : null;
        return o.jsx(ue, {
            children: f
        }, n)
    },
    Qe = n => {
        const e = l.useRef(null);
        return o.jsx(le, {
            ref: e,
            onError: (t, s) => {
                pe(), setTimeout(() => {
                    e.current ? .resetErrorBoundary()
                }), y.addError(t, {
                    componentStack: s
                })
            },
            name: "vnc-focused-view",
            children: o.jsx(Ie, { ...n
            })
        })
    };
export {
    Qe as VNCFocusedViewManager
};
//# sourceMappingURL=6ea54f65-illup25mch4zeu08.js.map