# consumer.py — parses [u32_le length][bytes] frames and appends to .ssef
from http.server import BaseHTTPRequestHandler, HTTPServer
import json, struct

OUT = "/home/cicero-arch-omen/ai_sandbox/extension_chromium/llm_extension/streams/chatgpt_f_conversation.ssef"
ALLOW_ORIGIN = "chrome-extension://omglnnhkdmhcdoanlffmdffhpjaadjhc"

def set_cors(h):
    h.send_header("Access-Control-Allow-Origin", ALLOW_ORIGIN)
    h.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
    h.send_header("Access-Control-Allow-Headers", "content-type")
    h.send_header("Access-Control-Max-Age", "86400")

def iter_len_frames(buf: bytes):
    i = 0
    n = len(buf)
    while i + 4 <= n:
      (L,) = struct.unpack_from("<I", buf, i)
      i += 4
      if i + L > n:
        break
      payload = buf[i:i+L]
      yield payload
      i += L

class Handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        if self.path != "/ingest":
            self.send_response(404); set_cors(self); self.end_headers(); return
        self.send_response(204); set_cors(self); self.end_headers()

    def do_POST(self):
        if self.path != "/ingest":
            self.send_response(404); set_cors(self); self.end_headers(); return
        n = int(self.headers.get("Content-Length", "0"))
        body = self.rfile.read(n) if n else b""

        # append raw bytes exactly as received
        with open(OUT, "ab", buffering=0) as f:
            f.write(body)

        # sanity print: show first ~100 bytes of each frame decoded as utf-8 (replace errors)
        for payload in iter_len_frames(body):
            preview = payload[:100].decode("utf-8", "replace")
            print(json.dumps({"len": len(payload), "preview": preview}, ensure_ascii=False))

        self.send_response(200); set_cors(self); self.end_headers()

def main():
    srv = HTTPServer(("127.0.0.1", 8765), Handler)
    print("listening on http://127.0.0.1:8765/ingest →", OUT)
    srv.serve_forever()

if __name__ == "__main__":
    main()
