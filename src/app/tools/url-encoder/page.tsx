"use client";
import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);
  const [encodeType, setEncodeType] = useState<"component" | "uri">("component");

  const process = (text: string, m: "encode" | "decode", t: "component" | "uri") => {
    if (!text) { setOutput(""); return; }
    try {
      if (m === "encode") {
        setOutput(t === "component" ? encodeURIComponent(text) : encodeURI(text));
      } else {
        setOutput(t === "component" ? decodeURIComponent(text) : decodeURI(text));
      }
    } catch {
      setOutput("⚠ Invalid input — cannot " + m);
    }
  };

  const handleInput = (text: string) => { setInput(text); process(text, mode, encodeType); };
  const handleMode = (m: "encode" | "decode") => { setMode(m); process(input, m, encodeType); };
  const handleType = (t: "component" | "uri") => { setEncodeType(t); process(input, mode, t); };
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const swap = () => { const tmp = output; setInput(tmp); setOutput(input); setMode(mode === "encode" ? "decode" : "encode"); };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    row: { display: "flex" as const, alignItems: "center" as const, gap: 8, marginBottom: 14, flexWrap: "wrap" as const },
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    ta: { width: "100%", minHeight: 120, border: "1px solid #E7E5E4", borderRadius: 8, padding: 12, fontSize: 14, fontFamily: "'Courier New', monospace", resize: "vertical" as const, outline: "none", lineHeight: 1.6 } as const,
  };

  return (
    <div style={s.page}>
      <h1 style={s.h1}>URL Encoder / Decoder</h1>
      <p style={s.sub}>Encode or decode URLs and query strings instantly. Runs in your browser.</p>

      <div style={s.card}>
        <div style={s.row}>
          {(["encode", "decode"] as const).map((m) => (
            <button key={m} onClick={() => handleMode(m)} style={{ ...s.btnSm, background: mode === m ? "#0D9488" : "#F5F5F4", color: mode === m ? "#fff" : "#1C1917", border: mode === m ? "1px solid #0D9488" : "1px solid #E7E5E4", textTransform: "capitalize" }}>{m}</button>
          ))}
          <span style={{ fontSize: 12, color: "#A8A29E", marginLeft: 8 }}>Method:</span>
          {(["component", "uri"] as const).map((t) => (
            <button key={t} onClick={() => handleType(t)} style={{ ...s.btnSm, background: encodeType === t ? "#6366F1" : "#F5F5F4", color: encodeType === t ? "#fff" : "#1C1917", border: encodeType === t ? "1px solid #6366F1" : "1px solid #E7E5E4" }}>{t === "component" ? "Component" : "Full URI"}</button>
          ))}
        </div>

        <label style={s.label}>Input</label>
        <textarea value={input} onChange={(e) => handleInput(e.target.value)} placeholder={mode === "encode" ? "Enter text or URL to encode..." : "Enter encoded text to decode..."} style={s.ta} />

        <div style={{ display: "flex", justifyContent: "center", margin: "12px 0" }}>
          <button onClick={swap} style={{ ...s.btnSm, fontSize: 18, padding: "4px 16px" }} title="Swap input and output">⇅</button>
        </div>

        <label style={s.label}>Output</label>
        <textarea value={output} readOnly style={{ ...s.ta, background: "#FAFAF9" }} />

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button onClick={copy} style={s.btn}>{copied ? "Copied!" : "Copy Output"}</button>
          <button onClick={() => { setInput(""); setOutput(""); }} style={s.btnSm}>Clear</button>
        </div>
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>URL encoding converts special characters into percent-encoded format so they can be safely included in URLs. For example, spaces become %20, ampersands become %26, and non-ASCII characters are converted to UTF-8 byte sequences.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}><strong>Component mode</strong> encodes/decodes individual values (query parameters, path segments). <strong>Full URI mode</strong> preserves URL structure characters like :, /, ?, and #.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Everything runs locally in your browser. Nothing is sent to any server.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "What is URL encoding?", a: "URL encoding (percent-encoding) replaces unsafe characters with a % followed by two hexadecimal digits. This ensures URLs are transmitted correctly across the internet." },
          { q: "When should I use Component vs Full URI?", a: "Use Component mode for individual values like search terms or form data. Use Full URI mode when you want to encode a complete URL while preserving its structure (protocol, slashes, colons)." },
          { q: "Is my data secure?", a: "Yes. This tool runs entirely in your browser using JavaScript. No data is sent to any server, stored, or logged." },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: i < 2 ? 14 : 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 4 }}>{faq.q}</h3>
            <p style={{ fontSize: 13, color: "#57534E", lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
