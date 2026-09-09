"use client";
import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const process = (text: string, m: string) => {
    setError("");
    if (!text) { setOutput(""); return; }
    try {
      if (m === "encode") { setOutput(btoa(unescape(encodeURIComponent(text)))); }
      else { setOutput(decodeURIComponent(escape(atob(text.trim())))); }
    } catch { setError(m === "encode" ? "Unable to encode this text." : "Invalid Base64 string."); setOutput(""); }
  };

  const switchMode = (m: string) => { setMode(m); setInput(""); setOutput(""); setError(""); };
  const copy = () => { if (!output) return; navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const swap = () => { const nm = mode === "encode" ? "decode" : "encode"; const ni = output; setMode(nm); setInput(ni); setError(""); process(ni, nm); };
  const clear = () => { setInput(""); setOutput(""); setError(""); };

  const stats = input ? { inputLen: input.length, outputLen: output.length, ratio: output ? ((output.length / input.length) * 100).toFixed(0) + "%" : "-" } : null;

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    tabs: { display: "flex" as const, gap: 0, marginBottom: 16, borderRadius: 8, overflow: "hidden" as const, border: "1px solid #E7E5E4" },
    tab: (active: boolean) => ({ flex: 1, padding: "10px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer", border: "none", background: active ? "#0D9488" : "#FAFAF9", color: active ? "#fff" : "#78716C" }) as const,
    textarea: { width: "100%", minHeight: 120, padding: 12, fontSize: 14, fontFamily: "'Courier New', monospace", border: "1px solid #E7E5E4", borderRadius: 8, resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const, lineHeight: 1.6 },
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    row: { display: "flex", gap: 8, marginTop: 12 } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "8px 14px", fontSize: 13, cursor: "pointer" } as const,
    error: { color: "#EF4444", fontSize: 13, marginTop: 8, padding: "8px 12px", background: "#FEF2F2", borderRadius: 6 } as const,
    stat: { fontSize: 12, color: "#78716C", display: "flex", gap: 16, marginTop: 8 } as const,
  };

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Base64 Encoder / Decoder</h1>
      <p style={s.sub}>Encode text to Base64 or decode Base64 back to text. Runs entirely in your browser.</p>
      <div style={s.card}>
        <div style={s.tabs}>
          <button style={s.tab(mode === "encode")} onClick={() => switchMode("encode")}>Encode</button>
          <button style={s.tab(mode === "decode")} onClick={() => switchMode("decode")}>Decode</button>
        </div>
        <label style={s.label}>{mode === "encode" ? "Text to Encode" : "Base64 to Decode"}</label>
        <textarea style={s.textarea} value={input} onChange={(e) => { setInput(e.target.value); process(e.target.value, mode); }} placeholder={mode === "encode" ? "Paste your text here..." : "Paste Base64 string here..."} />
        {error && <div style={s.error}>{error}</div>}
        <div style={s.row}>
          <button onClick={swap} style={s.btnSm}>Swap</button>
          <button onClick={clear} style={s.btnSm}>Clear</button>
        </div>
      </div>
      {output && (
        <div style={s.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <label style={{ ...s.label, marginBottom: 0 }}>Result</label>
            <button onClick={copy} style={s.btnSm}>{copied ? "Copied" : "Copy"}</button>
          </div>
          <div style={{ ...s.textarea, background: "#FAFAF9", minHeight: 80, whiteSpace: "pre-wrap" as const, wordBreak: "break-all" as const }}>{output}</div>
          {stats && <div style={s.stat}><span>Input: {stats.inputLen} chars</span><span>Output: {stats.outputLen} chars</span><span>Ratio: {stats.ratio}</span></div>}
        </div>
      )}
      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About Base64 Encoding</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>Base64 is a binary-to-text encoding scheme that converts binary data into printable ASCII characters. It is commonly used to embed images in HTML or CSS, transmit data in URLs, encode email attachments, and store binary data in JSON or XML.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Base64 encoding increases data size by approximately 33 percent because it represents every 3 bytes of input as 4 printable characters.</p>
      </div>
    </div>
  );
}
