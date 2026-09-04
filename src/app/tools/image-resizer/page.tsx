"use client";
import { useState, useRef } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [newW, setNewW] = useState(0);
  const [newH, setNewH] = useState(0);
  const [lock, setLock] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setResult("");
    const url = URL.createObjectURL(f);
    setPreview(url);
    const img = new Image();
    img.onload = () => { setOrigW(img.width); setOrigH(img.height); setNewW(img.width); setNewH(img.height); imgRef.current = img; };
    img.src = url;
  };

  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); };

  const updateW = (w: number) => { setNewW(w); if (lock && origW > 0) setNewH(Math.round(w * origH / origW)); };
  const updateH = (h: number) => { setNewH(h); if (lock && origH > 0) setNewW(Math.round(h * origW / origH)); };

  const resize = () => {
    if (!imgRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = newW; canvas.height = newH;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(imgRef.current, 0, 0, newW, newH);
    const mime = file?.type === "image/png" ? "image/png" : "image/jpeg";
    setResult(canvas.toDataURL(mime, 0.92));
  };

  const download = () => {
    const a = document.createElement("a"); a.href = result;
    const ext = file?.type === "image/png" ? ".png" : ".jpg";
    a.download = "resized-" + newW + "x" + newH + ext; a.click();
  };

  const presets = [
    { label: "Instagram Post", w: 1080, h: 1080 },
    { label: "Instagram Story", w: 1080, h: 1920 },
    { label: "Facebook Cover", w: 820, h: 312 },
    { label: "Twitter Header", w: 1500, h: 500 },
    { label: "YouTube Thumb", w: 1280, h: 720 },
    { label: "LinkedIn Banner", w: 1584, h: 396 },
  ];

  const s = {
    wrap: { maxWidth: "800px", margin: "0 auto", padding: "20px" } as React.CSSProperties,
    breadcrumb: { fontSize: "13px", color: "#6b7280", marginBottom: "16px" } as React.CSSProperties,
    bLink: { color: "#0D9488", textDecoration: "none" } as React.CSSProperties,
    h1: { fontSize: "28px", fontWeight: 700, color: "#111827", marginBottom: "8px" } as React.CSSProperties,
    sub: { fontSize: "15px", color: "#6b7280", marginBottom: "24px" } as React.CSSProperties,
    drop: { border: dragOver ? "2px solid #0D9488" : "2px dashed #d1d5db", borderRadius: "12px", padding: "48px 24px", textAlign: "center" as const, cursor: "pointer", background: dragOver ? "#f0fdfa" : "#fafafa", transition: "all 0.2s", marginBottom: "24px" },
    card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", marginBottom: "20px" } as React.CSSProperties,
    label: { fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px", display: "block" },
    input: { width: "120px", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "15px" } as React.CSSProperties,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 24px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    btnOut: { background: "#fff", color: "#0D9488", border: "2px solid #0D9488", borderRadius: "8px", padding: "10px 24px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    btnSmall: { background: "#f0fdfa", color: "#0D9488", border: "1px solid #99f6e4", borderRadius: "6px", padding: "6px 12px", fontSize: "12px", cursor: "pointer", fontWeight: 500 } as React.CSSProperties,
    previewImg: { width: "100%", maxHeight: "300px", objectFit: "contain" as const, borderRadius: "8px", border: "1px solid #e5e7eb" },
    info: { fontSize: "13px", color: "#6b7280", marginTop: "8px" },
  };

  return (
    <div style={s.wrap}>
      <ToolSchema name="Image Resizer" description="Resize images online for free. Set custom dimensions or use social media presets. No upload to server." slug="image-resizer" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Image Tools", url: "https://toolcraftkit.com/#image-tools" }, { name: "Image Resizer", url: "https://toolcraftkit.com/tools/image-resizer" }]} />

      <div style={s.breadcrumb}>
        <a href="/" style={s.bLink}>Home</a> › <a href="/#image-tools" style={s.bLink}>Image Tools</a> › <span style={{ color: "#0D9488" }}>Image Resizer</span>
      </div>
      <h1 style={s.h1}>Image Resizer</h1>
      <p style={s.sub}>Resize images to exact dimensions. Social media presets included. No upload — runs in your browser.</p>

      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

      {!file ? (
        <div style={s.drop} onClick={() => inputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📐</div>
          <div style={{ fontSize: "16px", color: "#374151" }}>Drop an image here or click to upload</div>
          <div style={{ fontSize: "13px", color: "#9ca3af" }}>JPEG, PNG, WebP — Max 50 MB</div>
        </div>
      ) : (
        <>
          <div style={s.card}>
            <img src={preview} alt="Preview" style={s.previewImg} />
            <div style={s.info}>Original: {origW} × {origH} px</div>
          </div>

          <div style={s.card}>
            <label style={s.label}>New Dimensions</label>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Width (px)</div>
                <input type="number" value={newW} onChange={(e) => updateW(Number(e.target.value))} style={s.input} />
              </div>
              <button onClick={() => setLock(!lock)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", marginTop: "16px" }}>{lock ? "🔗" : "🔓"}</button>
              <div>
                <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Height (px)</div>
                <input type="number" value={newH} onChange={(e) => updateH(Number(e.target.value))} style={s.input} />
              </div>
            </div>

            <label style={{ ...s.label, marginTop: "16px" }}>Quick Presets</label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {presets.map((p) => (
                <button key={p.label} style={s.btnSmall} onClick={() => { setNewW(p.w); setNewH(p.h); setLock(false); }}>
                  {p.label} ({p.w}×{p.h})
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
            <button style={s.btn} onClick={resize}>Resize Image</button>
            <button style={s.btnOut} onClick={() => { setFile(null); setPreview(""); setResult(""); }}>New Image</button>
          </div>

          {result && (
            <div style={s.card}>
              <label style={s.label}>Result: {newW} × {newH} px</label>
              <img src={result} alt="Resized" style={s.previewImg} />
              <div style={{ marginTop: "12px" }}>
                <button style={s.btn} onClick={download}>Download Resized Image</button>
              </div>
            </div>
          )}
        </>
      )}
      <SeoContent />
    </div>
  );
}
