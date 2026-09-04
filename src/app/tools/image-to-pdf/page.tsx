"use client";
import { useState, useRef } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

interface ImgFile { id: string; name: string; url: string; data: Uint8Array; type: string; w: number; h: number; }

export default function ImageToPdf() {
  const [images, setImages] = useState<ImgFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [result, setResult] = useState("");
  const [orientation, setOrientation] = useState<"portrait" | "landscape" | "auto">("auto");
  const [margin, setMargin] = useState(20);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = async (fileList: FileList) => {
    const newImgs: ImgFile[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const f = fileList[i];
      if (!f.type.startsWith("image/")) continue;
      const data = new Uint8Array(await f.arrayBuffer());
      const url = URL.createObjectURL(f);
      const dims = await new Promise<{ w: number; h: number }>((res) => {
        const img = new Image();
        img.onload = () => res({ w: img.width, h: img.height });
        img.src = url;
      });
      newImgs.push({ id: Math.random().toString(36).slice(2), name: f.name, url, data, type: f.type, w: dims.w, h: dims.h });
    }
    setImages((prev) => [...prev, ...newImgs]);
    setResult("");
  };

  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files); };
  const remove = (id: string) => setImages((prev) => prev.filter((f) => f.id !== id));

  const convert = async () => {
    if (images.length === 0) return;
    setConverting(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const pdf = await PDFDocument.create();
      for (const img of images) {
        let embedded;
        if (img.type === "image/png") {
          embedded = await pdf.embedPng(img.data);
        } else {
          embedded = await pdf.embedJpg(img.data);
        }
        const pageW = orientation === "landscape" ? 842 : orientation === "portrait" ? 595 : (img.w > img.h ? 842 : 595);
        const pageH = orientation === "landscape" ? 595 : orientation === "portrait" ? 842 : (img.w > img.h ? 595 : 842);
        const page = pdf.addPage([pageW, pageH]);
        const usableW = pageW - margin * 2;
        const usableH = pageH - margin * 2;
        const scale = Math.min(usableW / embedded.width, usableH / embedded.height);
        const drawW = embedded.width * scale;
        const drawH = embedded.height * scale;
        page.drawImage(embedded, { x: margin + (usableW - drawW) / 2, y: margin + (usableH - drawH) / 2, width: drawW, height: drawH });
      }
      const bytes = await pdf.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      setResult(URL.createObjectURL(blob));
    } catch (e: any) {
      alert("Error: " + (e.message || "Conversion failed"));
    }
    setConverting(false);
  };

  const download = () => { const a = document.createElement("a"); a.href = result; a.download = "images.pdf"; a.click(); };

  const s = {
    wrap: { maxWidth: "800px", margin: "0 auto", padding: "20px" } as React.CSSProperties,
    breadcrumb: { fontSize: "13px", color: "#6b7280", marginBottom: "16px" } as React.CSSProperties,
    bLink: { color: "#0D9488", textDecoration: "none" } as React.CSSProperties,
    h1: { fontSize: "28px", fontWeight: 700, color: "#111827", marginBottom: "8px" } as React.CSSProperties,
    sub: { fontSize: "15px", color: "#6b7280", marginBottom: "24px" } as React.CSSProperties,
    drop: { border: dragOver ? "2px solid #0D9488" : "2px dashed #d1d5db", borderRadius: "12px", padding: "48px 24px", textAlign: "center" as const, cursor: "pointer", background: dragOver ? "#f0fdfa" : "#fafafa", marginBottom: "24px" },
    card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", marginBottom: "20px" } as React.CSSProperties,
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "12px", marginBottom: "12px" } as React.CSSProperties,
    thumb: { position: "relative" as const, borderRadius: "8px", overflow: "hidden", border: "1px solid #e5e7eb", aspectRatio: "1" },
    thumbImg: { width: "100%", height: "100%", objectFit: "cover" as const },
    removeBtn: { position: "absolute" as const, top: "4px", right: "4px", background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", fontSize: "14px" },
    label: { fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px", display: "block" },
    select: { padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px" } as React.CSSProperties,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", padding: "12px 28px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    btnOut: { background: "#fff", color: "#0D9488", border: "2px solid #0D9488", borderRadius: "8px", padding: "10px 24px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    success: { background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "12px", padding: "24px", textAlign: "center" as const, marginBottom: "20px" },
  };

  return (
    <div style={s.wrap}>
      <ToolSchema name="Image to PDF" description="Convert images to PDF online. Combine multiple images into one PDF document. Free, no upload to server." slug="image-to-pdf" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Converter Tools", url: "https://toolcraftkit.com/#converter-tools" }, { name: "Image to PDF", url: "https://toolcraftkit.com/tools/image-to-pdf" }]} />

      <div style={s.breadcrumb}><a href="/" style={s.bLink}>Home</a> › <span style={{ color: "#0D9488" }}>Image to PDF</span></div>
      <h1 style={s.h1}>Image to PDF Converter</h1>
      <p style={s.sub}>Convert images to a PDF document. Upload multiple images, arrange them, and download as a single PDF. No upload to server.</p>

      <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => e.target.files && addFiles(e.target.files)} />

      <div style={s.drop} onClick={() => inputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>🖼️ → 📄</div>
        <div style={{ fontSize: "16px", color: "#374151" }}>Drop images here or click to upload</div>
        <div style={{ fontSize: "13px", color: "#9ca3af" }}>JPEG, PNG — Select multiple files</div>
      </div>

      {images.length > 0 && (
        <>
          <div style={s.card}>
            <div style={s.label}>{images.length} image{images.length > 1 ? "s" : ""} selected</div>
            <div style={s.grid}>
              {images.map((img) => (
                <div key={img.id} style={s.thumb}>
                  <img src={img.url} alt={img.name} style={s.thumbImg} />
                  <button style={s.removeBtn} onClick={() => remove(img.id)}>✕</button>
                </div>
              ))}
            </div>
            <button style={{ ...s.btnOut, fontSize: "13px", padding: "6px 16px" }} onClick={() => inputRef.current?.click()}>+ Add More</button>
          </div>

          <div style={s.card}>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              <div>
                <label style={s.label}>Page Orientation</label>
                <select value={orientation} onChange={(e) => setOrientation(e.target.value as any)} style={s.select}>
                  <option value="auto">Auto (based on image)</option>
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
              <div>
                <label style={s.label}>Margin (px)</label>
                <input type="number" value={margin} onChange={(e) => setMargin(Number(e.target.value))} min={0} max={100} style={{ ...s.select, width: "80px" }} />
              </div>
            </div>
          </div>

          {!result ? (
            <button style={s.btn} onClick={convert} disabled={converting}>
              {converting ? "Converting..." : `Convert ${images.length} Image${images.length > 1 ? "s" : ""} to PDF`}
            </button>
          ) : (
            <div style={s.success}>
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>✅</div>
              <div style={{ fontSize: "18px", fontWeight: 600, color: "#111827", marginBottom: "16px" }}>PDF created!</div>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <button style={s.btn} onClick={download}>Download PDF</button>
                <button style={s.btnOut} onClick={() => { setImages([]); setResult(""); }}>Start Over</button>
              </div>
            </div>
          )}
        </>
      )}
      <SeoContent />
    </div>
  );
}
