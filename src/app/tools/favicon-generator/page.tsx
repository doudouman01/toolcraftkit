"use client";
import { useState, useRef, useEffect } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";

export default function Page() {
  const [text, setText] = useState("A");
  const [bg, setBg] = useState("#0D9488");
  const [fg, setFg] = useState("#FFFFFF");
  const [shape, setShape] = useState<"square" | "rounded" | "circle">("rounded");
  const [size] = useState(256);
  const [previewUrl, setPreviewUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = bg;
    if (shape === "circle") {
      ctx.beginPath(); ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2); ctx.fill();
    } else if (shape === "rounded") {
      const r = size * 0.18;
      ctx.beginPath(); ctx.moveTo(r, 0); ctx.lineTo(size - r, 0); ctx.quadraticCurveTo(size, 0, size, r); ctx.lineTo(size, size - r); ctx.quadraticCurveTo(size, size, size - r, size); ctx.lineTo(r, size); ctx.quadraticCurveTo(0, size, 0, size - r); ctx.lineTo(0, r); ctx.quadraticCurveTo(0, 0, r, 0); ctx.fill();
    } else { ctx.fillRect(0, 0, size, size); }
    ctx.fillStyle = fg;
    const fSize = text.length === 1 ? size * 0.55 : text.length === 2 ? size * 0.4 : size * 0.3;
    ctx.font = `bold ${fSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text.slice(0, 3), size / 2, size / 2 + fSize * 0.05);
    setPreviewUrl(canvas.toDataURL("image/png"));
  }, [text, bg, fg, shape, size]);

  const download = (s: number, name: string) => {
    const c = document.createElement("canvas"); c.width = s; c.height = s;
    const ctx = c.getContext("2d")!;
    const img = new Image(); img.onload = () => { ctx.drawImage(img, 0, 0, s, s); const a = document.createElement("a"); a.href = c.toDataURL("image/png"); a.download = name; a.click(); };
    img.src = previewUrl;
  };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 16, outline: "none", boxSizing: "border-box" as const } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    preview: { display: "flex", justifyContent: "center", gap: 16, alignItems: "flex-end", marginBottom: 20, flexWrap: "wrap" as const } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Favicon Generator" description="Create favicons from text or emoji. Download ICO, PNG 32px, 180px, 512px. Free online tool." slug="favicon-generator" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Developer Tools", url: "https://toolcraftkit.com/#developer-tools" }, { name: "Favicon Generator", url: "https://toolcraftkit.com/tools/favicon-generator" }]} />
      <h1 style={s.h1}>Favicon Generator</h1>
      <p style={s.sub}>Create a favicon from text, initials, or emoji. Download in all sizes.</p>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div style={s.card}>
        <div style={s.preview}>
          {previewUrl && <>
            <div style={{ textAlign: "center" }}><img src={previewUrl} alt="128" style={{ width: 128, height: 128, borderRadius: shape === "circle" ? "50%" : shape === "rounded" ? 16 : 0 }} /><div style={{ fontSize: 11, color: "#78716C", marginTop: 4 }}>128px</div></div>
            <div style={{ textAlign: "center" }}><img src={previewUrl} alt="64" style={{ width: 64, height: 64, borderRadius: shape === "circle" ? "50%" : shape === "rounded" ? 8 : 0 }} /><div style={{ fontSize: 11, color: "#78716C", marginTop: 4 }}>64px</div></div>
            <div style={{ textAlign: "center" }}><img src={previewUrl} alt="32" style={{ width: 32, height: 32, borderRadius: shape === "circle" ? "50%" : shape === "rounded" ? 4 : 0 }} /><div style={{ fontSize: 11, color: "#78716C", marginTop: 4 }}>32px</div></div>
            <div style={{ textAlign: "center" }}><img src={previewUrl} alt="16" style={{ width: 16, height: 16, borderRadius: shape === "circle" ? "50%" : shape === "rounded" ? 2 : 0 }} /><div style={{ fontSize: 11, color: "#78716C", marginTop: 4 }}>16px</div></div>
          </>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={s.label}>Text / Emoji (1-3 characters)</label>
          <input type="text" maxLength={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="A" style={s.input} />
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
          <div><label style={s.label}>Background</label><input type="color" value={bg} onChange={(e) => setBg(e.target.value)} style={{ width: 48, height: 38, border: "1px solid #E7E5E4", borderRadius: 6, cursor: "pointer" }} /></div>
          <div><label style={s.label}>Text Color</label><input type="color" value={fg} onChange={(e) => setFg(e.target.value)} style={{ width: 48, height: 38, border: "1px solid #E7E5E4", borderRadius: 6, cursor: "pointer" }} /></div>
          <div>
            <label style={s.label}>Shape</label>
            <div style={{ display: "flex", gap: 6 }}>
              {(["square", "rounded", "circle"] as const).map((sh) => (
                <button key={sh} onClick={() => setShape(sh)} style={{ ...s.btnSm, background: shape === sh ? "#0D9488" : "#F5F5F4", color: shape === sh ? "#fff" : "#1C1917" }}>{sh}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={s.card}>
        <label style={s.label}>Download</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => download(16, "favicon-16.png")} style={s.btn}>16×16</button>
          <button onClick={() => download(32, "favicon-32.png")} style={s.btn}>32×32</button>
          <button onClick={() => download(180, "apple-touch-icon.png")} style={s.btn}>180×180</button>
          <button onClick={() => download(512, "favicon-512.png")} style={s.btn}>512×512</button>
        </div>
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Generate favicons from text, initials, or emoji. Choose your colors and shape, then download in all standard sizes: 16×16 for browser tabs, 32×32 for bookmarks, 180×180 for Apple touch icon, and 512×512 for PWA manifest. No signup, no watermark.</p>
      </div>
    </div>
  );
}
