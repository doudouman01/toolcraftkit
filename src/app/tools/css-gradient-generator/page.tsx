"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";

export default function Page() {
  const [color1, setColor1] = useState("#0D9488");
  const [color2, setColor2] = useState("#6366F1");
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [copied, setCopied] = useState(false);

  const gradient = type === "linear" ? `linear-gradient(${angle}deg, ${color1}, ${color2})` : `radial-gradient(circle, ${color1}, ${color2})`;
  const css = `background: ${gradient};`;

  const copy = () => { navigator.clipboard.writeText(css); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  const presets = [
    { c1: "#667eea", c2: "#764ba2", n: "Purple Haze" }, { c1: "#f093fb", c2: "#f5576c", n: "Pink Flame" },
    { c1: "#4facfe", c2: "#00f2fe", n: "Ocean Blue" }, { c1: "#43e97b", c2: "#38f9d7", n: "Fresh Mint" },
    { c1: "#fa709a", c2: "#fee140", n: "Sunset" }, { c1: "#a18cd1", c2: "#fbc2eb", n: "Lavender" },
    { c1: "#ffecd2", c2: "#fcb69f", n: "Peach" }, { c1: "#0D9488", c2: "#6366F1", n: "Teal Indigo" },
  ];

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    preview: { width: "100%", height: 200, borderRadius: 12, marginBottom: 16, border: "1px solid #E7E5E4" } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    code: { background: "#1C1917", color: "#5EEAD4", padding: 16, borderRadius: 8, fontFamily: "monospace", fontSize: 14, overflowX: "auto" as const, marginBottom: 12 } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema name="CSS Gradient Generator" description="Create beautiful CSS gradients. Copy the CSS code instantly. Linear and radial gradients with presets." slug="css-gradient-generator" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Developer Tools", url: "https://toolcraftkit.com/#developer-tools" }, { name: "CSS Gradient Generator", url: "https://toolcraftkit.com/tools/css-gradient-generator" }]} />
      <h1 style={s.h1}>CSS Gradient Generator</h1>
      <p style={s.sub}>Create beautiful gradients and copy the CSS code. Linear and radial with live preview.</p>

      <div style={{ ...s.preview, background: gradient }} />

      <div style={s.card}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button onClick={() => setType("linear")} style={{ ...s.btnSm, background: type === "linear" ? "#0D9488" : "#F5F5F4", color: type === "linear" ? "#fff" : "#1C1917" }}>Linear</button>
          <button onClick={() => setType("radial")} style={{ ...s.btnSm, background: type === "radial" ? "#0D9488" : "#F5F5F4", color: type === "radial" ? "#fff" : "#1C1917" }}>Radial</button>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
          <div>
            <label style={s.label}>Color 1</label>
            <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} style={{ width: 60, height: 40, border: "1px solid #E7E5E4", borderRadius: 6, cursor: "pointer", padding: 2 }} />
          </div>
          <div>
            <label style={s.label}>Color 2</label>
            <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} style={{ width: 60, height: 40, border: "1px solid #E7E5E4", borderRadius: 6, cursor: "pointer", padding: 2 }} />
          </div>
          {type === "linear" && (
            <div style={{ flex: 1, minWidth: 150 }}>
              <label style={s.label}>Angle: {angle}°</label>
              <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(+e.target.value)} style={{ width: "100%", accentColor: "#0D9488" }} />
            </div>
          )}
        </div>
        <div style={s.code}>{css}</div>
        <button onClick={copy} style={s.btn}>{copied ? "Copied!" : "Copy CSS"}</button>
      </div>

      <div style={s.card}>
        <label style={s.label}>Presets</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
          {presets.map((p) => (
            <div key={p.n} onClick={() => { setColor1(p.c1); setColor2(p.c2); }} style={{ height: 60, borderRadius: 8, background: `linear-gradient(135deg, ${p.c1}, ${p.c2})`, cursor: "pointer", display: "flex", alignItems: "flex-end", padding: 6 }}>
              <span style={{ fontSize: 11, color: "#fff", fontWeight: 600, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>{p.n}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Create beautiful CSS gradients for your website or app. Choose colors, set the angle, preview in real-time, and copy the CSS code with one click. Includes popular gradient presets to get you started.</p>
      </div>
    </div>
  );
}
