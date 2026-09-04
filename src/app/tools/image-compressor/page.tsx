"use client";
import { useState, useRef, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [compressed, setCompressed] = useState<string>("");
  const [quality, setQuality] = useState(70);
  const [origSize, setOrigSize] = useState(0);
  const [compSize, setCompSize] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(2) + " MB";
  };

  const compress = useCallback((f: File, q: number) => {
    setProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        const mimeType = f.type === "image/png" ? "image/png" : "image/jpeg";
        const dataUrl = canvas.toDataURL(mimeType, q / 100);
        setCompressed(dataUrl);
        const byteString = atob(dataUrl.split(",")[1]);
        setCompSize(byteString.length);
        setProcessing(false);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(f);
  }, []);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setOrigSize(f.size);
    const url = URL.createObjectURL(f);
    setPreview(url);
    compress(f, quality);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const download = () => {
    const a = document.createElement("a");
    a.href = compressed;
    const ext = file?.type === "image/png" ? ".png" : ".jpg";
    a.download = "compressed-" + (file?.name || "image") .replace(/\.[^.]+$/, "") + ext;
    a.click();
  };

  const savings = origSize > 0 ? Math.round((1 - compSize / origSize) * 100) : 0;

  const s = {
    wrap: { maxWidth: "800px", margin: "0 auto", padding: "20px" } as React.CSSProperties,
    breadcrumb: { fontSize: "13px", color: "#6b7280", marginBottom: "16px" } as React.CSSProperties,
    bLink: { color: "#0D9488", textDecoration: "none" } as React.CSSProperties,
    h1: { fontSize: "28px", fontWeight: 700, color: "#111827", marginBottom: "8px" } as React.CSSProperties,
    sub: { fontSize: "15px", color: "#6b7280", marginBottom: "24px" } as React.CSSProperties,
    drop: { border: dragOver ? "2px solid #0D9488" : "2px dashed #d1d5db", borderRadius: "12px", padding: "48px 24px", textAlign: "center" as const, cursor: "pointer", background: dragOver ? "#f0fdfa" : "#fafafa", transition: "all 0.2s", marginBottom: "24px" },
    dropIcon: { fontSize: "48px", marginBottom: "12px" },
    dropText: { fontSize: "16px", color: "#374151", marginBottom: "4px" },
    dropSub: { fontSize: "13px", color: "#9ca3af" },
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 24px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    btnOut: { background: "#fff", color: "#0D9488", border: "2px solid #0D9488", borderRadius: "8px", padding: "10px 24px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", marginBottom: "20px" } as React.CSSProperties,
    label: { fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px", display: "block" },
    slider: { width: "100%", accentColor: "#0D9488" },
    stats: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "20px" } as React.CSSProperties,
    stat: { textAlign: "center" as const, padding: "16px", background: "#f9fafb", borderRadius: "8px" },
    statVal: { fontSize: "20px", fontWeight: 700, color: "#111827" },
    statLabel: { fontSize: "12px", color: "#6b7280", marginTop: "4px" },
    previewGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" } as React.CSSProperties,
    previewImg: { width: "100%", borderRadius: "8px", border: "1px solid #e5e7eb" },
    previewLabel: { fontSize: "13px", fontWeight: 600, color: "#6b7280", marginBottom: "8px" },
    green: { color: "#059669", fontWeight: 700 } as React.CSSProperties,
  };

  return (
    <div style={s.wrap}>
      <ToolSchema name="Image Compressor" description="Compress images online for free. Reduce file size without losing quality. JPEG, PNG, WebP supported." slug="image-compressor" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Image Tools", url: "https://toolcraftkit.com/#image-tools" }, { name: "Image Compressor", url: "https://toolcraftkit.com/tools/image-compressor" }]} />

      <div style={s.breadcrumb}>
        <a href="/" style={s.bLink}>Home</a> › <a href="/#image-tools" style={s.bLink}>Image Tools</a> › <span style={{ color: "#0D9488" }}>Image Compressor</span>
      </div>

      <h1 style={s.h1}>Image Compressor</h1>
      <p style={s.sub}>Compress images online for free. Reduce file size while maintaining quality. No upload to server — everything runs in your browser.</p>

      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

      {!file ? (
        <div style={s.drop} onClick={() => inputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}>
          <div style={s.dropIcon}>🖼️</div>
          <div style={s.dropText}>Drop an image here or click to upload</div>
          <div style={s.dropSub}>JPEG, PNG, WebP — Max 50 MB</div>
        </div>
      ) : (
        <>
          <div style={s.card}>
            <label style={s.label}>Quality: {quality}%</label>
            <input type="range" min="5" max="100" value={quality} style={s.slider} onChange={(e) => { const q = Number(e.target.value); setQuality(q); if (file) compress(file, q); }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#9ca3af" }}>
              <span>Smallest file</span><span>Best quality</span>
            </div>
          </div>

          <div style={s.stats}>
            <div style={s.stat}>
              <div style={s.statVal}>{formatSize(origSize)}</div>
              <div style={s.statLabel}>Original</div>
            </div>
            <div style={s.stat}>
              <div style={s.statVal}>{processing ? "..." : formatSize(compSize)}</div>
              <div style={s.statLabel}>Compressed</div>
            </div>
            <div style={s.stat}>
              <div style={{ ...s.statVal, ...s.green }}>{processing ? "..." : savings + "%"}</div>
              <div style={s.statLabel}>Saved</div>
            </div>
          </div>

          <div style={s.previewGrid}>
            <div>
              <div style={s.previewLabel}>Original</div>
              <img src={preview} alt="Original" style={s.previewImg} />
            </div>
            <div>
              <div style={s.previewLabel}>Compressed</div>
              {compressed && <img src={compressed} alt="Compressed" style={s.previewImg} />}
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button style={s.btn} onClick={download} disabled={processing}>Download Compressed Image</button>
            <button style={s.btnOut} onClick={() => { setFile(null); setPreview(""); setCompressed(""); setOrigSize(0); setCompSize(0); }}>New Image</button>
          </div>
        </>
      )}
      <SeoContent />
    </div>
  );
}
