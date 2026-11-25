"use client";
import { useState, useRef, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  name: string;
  originalSize: number;
  processed?: Blob;
  processedSize?: number;
  processedUrl?: string;
}

type OutputFormat = "jpeg" | "png" | "webp";

export default function BulkImageProcessor() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const fileRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [resizeW, setResizeW] = useState("");
  const [resizeH, setResizeH] = useState("");
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<OutputFormat>("jpeg");
  const [keepAspect, setKeepAspect] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newImages: ImageFile[] = [];
    const max = 20 - images.length;
    for (let i = 0; i < Math.min(files.length, max); i++) {
      const f = files[i];
      if (!f.type.startsWith("image/")) continue;
      newImages.push({
        id: `${Date.now()}-${i}`,
        file: f,
        preview: URL.createObjectURL(f),
        name: f.name,
        originalSize: f.size,
      });
    }
    setImages(prev => [...prev, ...newImages]);
    setDone(false);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const img = prev.find(i => i.id === id);
      if (img?.preview) URL.revokeObjectURL(img.preview);
      if (img?.processedUrl) URL.revokeObjectURL(img.processedUrl);
      return prev.filter(i => i.id !== id);
    });
    setDone(false);
  };

  const processAll = useCallback(async () => {
    if (images.length === 0) return;
    setProcessing(true);
    setProgress(0);
    setDone(false);

    const results: ImageFile[] = [];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      try {
        const bitmap = await createImageBitmap(img.file);
        let w = bitmap.width;
        let h = bitmap.height;

        if (resizeW || resizeH) {
          const tw = resizeW ? parseInt(resizeW) : 0;
          const th = resizeH ? parseInt(resizeH) : 0;
          if (tw && th && !keepAspect) {
            w = tw; h = th;
          } else if (tw && keepAspect) {
            const ratio = bitmap.height / bitmap.width;
            w = tw; h = Math.round(tw * ratio);
          } else if (th && keepAspect) {
            const ratio = bitmap.width / bitmap.height;
            h = th; w = Math.round(th * ratio);
          } else if (tw) {
            w = tw;
          } else if (th) {
            h = th;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) { results.push(img); continue; }
        ctx.drawImage(bitmap, 0, 0, w, h);
        bitmap.close();

        const mimeType = `image/${format}`;
        const q = format === "png" ? undefined : quality / 100;

        const blob: Blob = await new Promise((resolve) => {
          canvas.toBlob((b) => resolve(b || new Blob()), mimeType, q);
        });

        const processedUrl = URL.createObjectURL(blob);
        results.push({ ...img, processed: blob, processedSize: blob.size, processedUrl });
      } catch {
        results.push(img);
      }
      setProgress(Math.round(((i + 1) / images.length) * 100));
    }

    setImages(results);
    setProcessing(false);
    setDone(true);
  }, [images, resizeW, resizeH, quality, format, keepAspect]);

  const downloadOne = (img: ImageFile) => {
    if (!img.processedUrl) return;
    const ext = format;
    const baseName = img.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = img.processedUrl;
    a.download = `${baseName}.${ext}`;
    a.click();
  };

  const downloadAll = () => {
    images.forEach((img) => {
      if (img.processedUrl) downloadOne(img);
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const totalOriginal = images.reduce((s, i) => s + i.originalSize, 0);
  const totalProcessed = images.reduce((s, i) => s + (i.processedSize || i.originalSize), 0);

  const inp: React.CSSProperties = { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "15px", outline: "none" };
  const btn: React.CSSProperties = { padding: "10px 24px", background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: 600, cursor: "pointer" };
  const card: React.CSSProperties = { background: "#fff", borderRadius: "12px", padding: "24px", border: "1px solid #e5e7eb", marginBottom: "16px" };

  return (
    <>
      <ToolSchema name="Bulk Image Processor" description="Batch resize, compress, and convert up to 20 images at once." slug="bulk-image-processor" category="WebApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Bulk Image Processor", url: "https://toolcraftkit.com/tools/bulk-image-processor" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px 60px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#111827", marginBottom: "8px" }}>Bulk Image Processor</h1>
        <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "24px" }}>Resize, compress, and convert up to 20 images at once. All processing happens in your browser.</p>

        {/* Upload Area */}
        <div onClick={() => fileRef.current?.click()} onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = "#0D9488"; }} onDragLeave={e => { e.currentTarget.style.borderColor = "#d1d5db"; }} onDrop={e => { e.preventDefault(); e.currentTarget.style.borderColor = "#d1d5db"; handleFiles(e.dataTransfer.files); }} style={{ ...card, border: "2px dashed #d1d5db", textAlign: "center", cursor: "pointer", padding: "40px 24px" }}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>📁</div>
          <p style={{ fontWeight: 600, color: "#374151", marginBottom: "4px" }}>Drop images here or click to browse</p>
          <p style={{ fontSize: "13px", color: "#9ca3af" }}>Up to 20 images. JPEG, PNG, WebP, GIF, BMP supported. ({images.length}/20)</p>
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={e => handleFiles(e.target.files)} style={{ display: "none" }} />
        </div>

        {/* Settings */}
        {images.length > 0 && (
          <div style={card}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", color: "#111827" }}>Processing Settings</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "4px", fontSize: "13px" }}>Width (px)</label>
                <input type="number" value={resizeW} onChange={e => setResizeW(e.target.value)} placeholder="Auto" style={inp} />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "4px", fontSize: "13px" }}>Height (px)</label>
                <input type="number" value={resizeH} onChange={e => setResizeH(e.target.value)} placeholder="Auto" style={inp} />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "4px", fontSize: "13px" }}>Format</label>
                <select value={format} onChange={e => setFormat(e.target.value as OutputFormat)} style={inp}>
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "4px", fontSize: "13px" }}>Quality ({quality}%)</label>
                <input type="range" min="10" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))} style={{ width: "100%", marginTop: "10px" }} />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <input type="checkbox" checked={keepAspect} onChange={e => setKeepAspect(e.target.checked)} id="aspect" />
              <label htmlFor="aspect" style={{ fontSize: "14px", color: "#374151" }}>Keep aspect ratio</label>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={processAll} disabled={processing} style={{ ...btn, opacity: processing ? 0.6 : 1 }}>
                {processing ? `Processing... ${progress}%` : `Process ${images.length} Image${images.length > 1 ? "s" : ""}`}
              </button>
              {done && <button onClick={downloadAll} style={{ ...btn, background: "#16a34a" }}>📥 Download All</button>}
              <button onClick={() => { setImages([]); setDone(false); }} style={{ ...btn, background: "#6b7280" }}>Clear All</button>
            </div>
            {processing && (
              <div style={{ marginTop: "12px", width: "100%", height: "6px", background: "#e5e7eb", borderRadius: "3px" }}>
                <div style={{ width: `${progress}%`, height: "6px", background: "#0D9488", borderRadius: "3px", transition: "width 0.3s" }} />
              </div>
            )}
          </div>
        )}

        {/* Image Grid */}
        {images.length > 0 && (
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>Images ({images.length})</h2>
              {done && <span style={{ fontSize: "13px", color: "#16a34a", fontWeight: 600 }}>Total: {formatSize(totalOriginal)} → {formatSize(totalProcessed)} ({Math.round((1 - totalProcessed / totalOriginal) * 100)}% saved)</span>}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px" }}>
              {images.map(img => (
                <div key={img.id} style={{ borderRadius: "8px", border: "1px solid #e5e7eb", overflow: "hidden", position: "relative" }}>
                  <img src={img.processedUrl || img.preview} alt={img.name} style={{ width: "100%", height: "120px", objectFit: "cover" }} />
                  <button onClick={() => removeImage(img.id)} style={{ position: "absolute", top: "4px", right: "4px", width: "24px", height: "24px", borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.6)", color: "#fff", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                  <div style={{ padding: "8px", fontSize: "11px" }}>
                    <div style={{ fontWeight: 600, color: "#374151", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{img.name}</div>
                    <div style={{ color: "#9ca3af" }}>
                      {formatSize(img.originalSize)}
                      {img.processedSize !== undefined && <span style={{ color: "#16a34a" }}> → {formatSize(img.processedSize)}</span>}
                    </div>
                    {img.processedUrl && <button onClick={() => downloadOne(img)} style={{ marginTop: "4px", padding: "2px 8px", borderRadius: "4px", border: "1px solid #0D9488", background: "#f0fdfa", color: "#0D9488", cursor: "pointer", fontSize: "10px", fontWeight: 600 }}>Download</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <SeoContent />
    </>
  );
}
