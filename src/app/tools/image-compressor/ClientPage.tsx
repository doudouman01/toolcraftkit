"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

const TOOL_SLUG = "image-compressor";

interface ImageItem {
  id: string;
  file: File;
  preview: string;
  compressed: string;
  origSize: number;
  compSize: number;
  processing: boolean;
}

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const { user, isPro } = useAuth();
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [period, setPeriod] = useState("day");

  const [images, setImages] = useState<ImageItem[]>([]);
  const [quality, setQuality] = useState(70);
  const [format, setFormat] = useState<"original" | "image/jpeg" | "image/png" | "image/webp">("original");
  const [dragOver, setDragOver] = useState(false);
  const [comparisonIdx, setComparisonIdx] = useState<number | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [downloading, setDownloading] = useState(false);
  const [estimatedSize, setEstimatedSize] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingSlider = useRef(false);

  useEffect(() => {
    if (!user) return;
    fetch("/api/usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool: TOOL_SLUG, action: "check" }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.usage !== undefined) setUsage(d.usage);
        if (d.limit !== undefined) setLimit(d.limit);
        if (d.period) setPeriod(d.period);
      })
      .catch(() => {});
  }, [user]);

  const canUse = isPro || usage < limit;

  const trackUsage = async () => {
    if (isPro) return true;
    if (usage >= limit) return false;
    try {
      const res = await fetch("/api/usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: TOOL_SLUG, action: "increment" }),
      });
      const d = await res.json();
      if (d.usage !== undefined) setUsage(d.usage);
      return d.allowed !== false;
    } catch {
      return false;
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(2) + " MB";
  };

  const getMimeType = (file: File): string => {
    if (format !== "original") return format;
    if (file.type === "image/png") return "image/png";
    if (file.type === "image/webp") return "image/webp";
    return "image/jpeg";
  };

  const getExtension = (mime: string): string => {
    if (mime === "image/png") return ".png";
    if (mime === "image/webp") return ".webp";
    return ".jpg";
  };

  const compressOne = useCallback((item: ImageItem, q: number, fmt: string): Promise<ImageItem> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0);
          const mimeType = fmt !== "original" ? fmt : (item.file.type === "image/png" ? "image/png" : item.file.type === "image/webp" ? "image/webp" : "image/jpeg");
          const qualityVal = mimeType === "image/png" ? undefined : q / 100;
          const dataUrl = canvas.toDataURL(mimeType, qualityVal);
          const byteString = atob(dataUrl.split(",")[1]);
          resolve({
            ...item,
            compressed: dataUrl,
            compSize: byteString.length,
            processing: false,
          });
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(item.file);
    });
  }, []);

  const compressAll = useCallback(async (items: ImageItem[], q: number, fmt: string) => {
    const results: ImageItem[] = [];
    for (const item of items) {
      const result = await compressOne({ ...item, processing: true }, q, fmt);
      results.push(result);
    }
    setImages(results);
  }, [compressOne]);

  const handleFiles = useCallback((fileList: FileList) => {
    const newItems: ImageItem[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const f = fileList[i];
      if (!f.type.startsWith("image/")) continue;
      newItems.push({
        id: Math.random().toString(36).slice(2),
        file: f,
        preview: URL.createObjectURL(f),
        compressed: "",
        origSize: f.size,
        compSize: 0,
        processing: true,
      });
    }
    if (newItems.length === 0) return;
    setImages((prev) => {
      const all = [...prev, ...newItems];
      compressAll(all, quality, format);
      return all.map((item) => ({ ...item, processing: true }));
    });
  }, [quality, format, compressAll]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    if (comparisonIdx !== null) {
      const idx = images.findIndex((img) => img.id === id);
      if (idx === comparisonIdx) setComparisonIdx(null);
      else if (idx < comparisonIdx) setComparisonIdx(comparisonIdx - 1);
    }
  };

  useEffect(() => {
    if (images.length === 0) return;
    compressAll(images, quality, format);
  }, [quality, format]);

  // Real-time estimated size as quality slider moves
  useEffect(() => {
    if (images.length === 0) { setEstimatedSize(""); return; }
    const totalOrig = images.reduce((s, img) => s + img.origSize, 0);
    // Rough estimation: at quality q%, size ~ origSize * (0.1 + 0.9 * (q/100))
    const ratio = 0.05 + 0.95 * (quality / 100);
    const est = totalOrig * ratio;
    setEstimatedSize(formatSize(Math.round(est)));
  }, [quality, images]);

  const downloadSingle = async (img: ImageItem) => {
    if (!canUse) return;
    const ok = await trackUsage();
    if (!ok) return;
    const a = document.createElement("a");
    a.href = img.compressed;
    const mime = getMimeType(img.file);
    const ext = getExtension(mime);
    a.download = "compressed-" + img.file.name.replace(/\.[^.]+$/, "") + ext;
    a.click();
  };

  const downloadAll = async () => {
    if (!canUse || images.length === 0) return;
    setDownloading(true);
    try {
      // Track usage for each image
      for (let i = 0; i < images.length; i++) {
        const ok = await trackUsage();
        if (!ok) {
          setDownloading(false);
          return;
        }
      }
      if (images.length === 1) {
        const a = document.createElement("a");
        a.href = images[0].compressed;
        const mime = getMimeType(images[0].file);
        const ext = getExtension(mime);
        a.download = "compressed-" + images[0].file.name.replace(/\.[^.]+$/, "") + ext;
        a.click();
      } else {
        // Client-side ZIP using JSZip-like approach with raw ZIP construction
        const zipParts: { name: string; data: Uint8Array }[] = [];
        for (const img of images) {
          const mime = getMimeType(img.file);
          const ext = getExtension(mime);
          const name = "compressed-" + img.file.name.replace(/\.[^.]+$/, "") + ext;
          const byteString = atob(img.compressed.split(",")[1]);
          const bytes = new Uint8Array(byteString.length);
          for (let i = 0; i < byteString.length; i++) bytes[i] = byteString.charCodeAt(i);
          zipParts.push({ name, data: bytes });
        }
        const zipBlob = createZip(zipParts);
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "compressed-images.zip";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error("Download failed", e);
    }
    setDownloading(false);
  };

  // Minimal ZIP file creator (no library needed)
  function createZip(files: { name: string; data: Uint8Array }[]): Blob {
    const parts: Uint8Array[] = [];
    const centralDir: Uint8Array[] = [];
    let offset = 0;

    for (const file of files) {
      const nameBytes = new TextEncoder().encode(file.name);
      // CRC-32
      const crc = crc32(file.data);

      // Local file header
      const localHeader = new Uint8Array(30 + nameBytes.length);
      const lv = new DataView(localHeader.buffer);
      lv.setUint32(0, 0x04034b50, true); // signature
      lv.setUint16(4, 20, true); // version needed
      lv.setUint16(6, 0, true); // flags
      lv.setUint16(8, 0, true); // compression (store)
      lv.setUint16(10, 0, true); // mod time
      lv.setUint16(12, 0, true); // mod date
      lv.setUint32(14, crc, true);
      lv.setUint32(18, file.data.length, true); // compressed size
      lv.setUint32(22, file.data.length, true); // uncompressed size
      lv.setUint16(26, nameBytes.length, true);
      lv.setUint16(28, 0, true); // extra field length
      localHeader.set(nameBytes, 30);

      parts.push(localHeader);
      parts.push(file.data);

      // Central directory entry
      const cdEntry = new Uint8Array(46 + nameBytes.length);
      const cv = new DataView(cdEntry.buffer);
      cv.setUint32(0, 0x02014b50, true);
      cv.setUint16(4, 20, true);
      cv.setUint16(6, 20, true);
      cv.setUint16(8, 0, true);
      cv.setUint16(10, 0, true);
      cv.setUint16(12, 0, true);
      cv.setUint16(14, 0, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, file.data.length, true);
      cv.setUint32(24, file.data.length, true);
      cv.setUint16(28, nameBytes.length, true);
      cv.setUint16(30, 0, true);
      cv.setUint16(32, 0, true);
      cv.setUint16(34, 0, true);
      cv.setUint16(36, 0, true);
      cv.setUint32(38, 0, true);
      cv.setUint32(42, offset, true);
      cdEntry.set(nameBytes, 46);

      centralDir.push(cdEntry);
      offset += localHeader.length + file.data.length;
    }

    const cdOffset = offset;
    let cdSize = 0;
    for (const cd of centralDir) {
      parts.push(cd);
      cdSize += cd.length;
    }

    // End of central directory
    const eocd = new Uint8Array(22);
    const ev = new DataView(eocd.buffer);
    ev.setUint32(0, 0x06054b50, true);
    ev.setUint16(4, 0, true);
    ev.setUint16(6, 0, true);
    ev.setUint16(8, files.length, true);
    ev.setUint16(10, files.length, true);
    ev.setUint32(12, cdSize, true);
    ev.setUint32(16, cdOffset, true);
    ev.setUint16(20, 0, true);
    parts.push(eocd);

    return new Blob(parts, { type: "application/zip" });
  }

  function crc32(data: Uint8Array): number {
    let crc = 0xffffffff;
    for (let i = 0; i < data.length; i++) {
      crc ^= data[i];
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
      }
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  // Comparison slider mouse/touch handlers
  const handleSliderMove = useCallback((clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSlider.current) handleSliderMove(e.clientX);
    };
    const handleMouseUp = () => { isDraggingSlider.current = false; };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingSlider.current && e.touches[0]) handleSliderMove(e.touches[0].clientX);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleSliderMove]);

  const totalOrigSize = images.reduce((s, img) => s + img.origSize, 0);
  const totalCompSize = images.reduce((s, img) => s + img.compSize, 0);
  const totalSavings = totalOrigSize > 0 ? Math.round((1 - totalCompSize / totalOrigSize) * 100) : 0;
  const allDone = images.length > 0 && images.every((img) => !img.processing && img.compressed);

  const s = {
    wrap: { maxWidth: "800px", margin: "0 auto", padding: "20px" } as React.CSSProperties,
    breadcrumb: { fontSize: "13px", color: "#6b7280", marginBottom: "16px" } as React.CSSProperties,
    bLink: { color: "#0D9488", textDecoration: "none" } as React.CSSProperties,
    h1: { fontSize: "28px", fontWeight: 700, color: "#1C1917", marginBottom: "8px" } as React.CSSProperties,
    sub: { fontSize: "15px", color: "#78716C", marginBottom: "24px" } as React.CSSProperties,
    drop: { border: dragOver ? "2px solid #0D9488" : "2px dashed #E7E5E4", borderRadius: "12px", padding: "48px 24px", textAlign: "center" as const, cursor: "pointer", background: dragOver ? "#f0fdfa" : "#FAFAF9", transition: "all 0.2s", marginBottom: "24px" },
    btn: { background: canUse ? "#0D9488" : "#A8A29E", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 24px", fontSize: "15px", fontWeight: 600, cursor: canUse ? "pointer" : "not-allowed", opacity: canUse ? 1 : 0.6 } as React.CSSProperties,
    btnOut: { background: "#fff", color: "#0D9488", border: "2px solid #0D9488", borderRadius: "8px", padding: "10px 24px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    btnSmall: { background: "#0D9488", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 14px", fontSize: "13px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    btnSmallOut: { background: "#fff", color: "#0D9488", border: "1.5px solid #0D9488", borderRadius: "6px", padding: "6px 14px", fontSize: "13px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: "12px", padding: "20px", marginBottom: "20px" } as React.CSSProperties,
    label: { fontSize: "14px", fontWeight: 600, color: "#1C1917", marginBottom: "8px", display: "block" },
    slider: { width: "100%", accentColor: "#0D9488" },
    stats: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "20px" } as React.CSSProperties,
    stat: { textAlign: "center" as const, padding: "16px", background: "#F5F5F4", borderRadius: "8px" },
    statVal: { fontSize: "20px", fontWeight: 700, color: "#1C1917" },
    statLabel: { fontSize: "12px", color: "#78716C", marginTop: "4px" },
    green: { color: "#059669", fontWeight: 700 } as React.CSSProperties,
    fileRow: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "#F5F5F4", borderRadius: "8px", marginBottom: "8px" } as React.CSSProperties,
  };

  return (
    <div style={s.wrap}>
      <ToolSchema name="Image Compressor" description="Compress images online for free. Reduce file size without losing quality. JPEG, PNG, WebP supported." slug="image-compressor" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Image Tools", url: "https://toolcraftkit.com/#image-tools" }, { name: "Image Compressor", url: "https://toolcraftkit.com/tools/image-compressor" }]} />

      <div style={s.breadcrumb}>
        <a href="/" style={s.bLink}>Home</a> {" > "} <a href="/#image-tools" style={s.bLink}>Image Tools</a> {" > "} <span style={{ color: "#0D9488" }}>Image Compressor</span>
      </div>

      <h1 style={s.h1}>{t(`tools./tools/image-compressor.name`) !== `tools./tools/image-compressor.name` ? t(`tools./tools/image-compressor.name`) : "Image Compressor"}</h1>
      <p style={s.sub}>{t(`tools./tools/image-compressor.desc`) !== `tools./tools/image-compressor.desc` ? t(`tools./tools/image-compressor.desc`) : "Compress images online for free. Reduce file size while maintaining quality. No upload to server — everything runs in your browser."}</p>

      <UsageBanner toolSlug={TOOL_SLUG} usage={usage} limit={limit} period={period} />

      <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => e.target.files && handleFiles(e.target.files)} />

      {/* Drop zone - always visible when no comparison is open */}
      <div style={s.drop} onClick={() => inputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>{"🖼️"}</div>
        <div style={{ fontSize: "16px", color: "#1C1917", marginBottom: "4px" }}>Drop images here or click to upload</div>
        <div style={{ fontSize: "13px", color: "#A8A29E" }}>JPEG, PNG, WebP — Multiple files supported — Max 50 MB each</div>
      </div>

      {images.length > 0 && (
        <>
          {/* Controls: Quality + Format */}
          <div style={s.card}>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ flex: "1 1 300px" }}>
                <label style={s.label}>Quality: {quality}%</label>
                <input type="range" min="5" max="100" value={quality} style={s.slider} onChange={(e) => setQuality(Number(e.target.value))} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#A8A29E" }}>
                  <span>Smallest file</span>
                  {estimatedSize && <span style={{ color: "#0D9488", fontWeight: 600 }}>Est. total: ~{estimatedSize}</span>}
                  <span>Best quality</span>
                </div>
              </div>
              <div style={{ flex: "0 0 auto" }}>
                <label style={s.label}>Output Format</label>
                <div style={{ display: "flex", gap: "6px" }}>
                  {([
                    { value: "original", label: "Original" },
                    { value: "image/jpeg", label: "JPEG" },
                    { value: "image/png", label: "PNG" },
                    { value: "image/webp", label: "WebP" },
                  ] as const).map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setFormat(opt.value)}
                      style={{
                        padding: "6px 14px",
                        fontSize: "13px",
                        fontWeight: format === opt.value ? 600 : 500,
                        color: format === opt.value ? "#fff" : "#78716C",
                        background: format === opt.value ? "#0D9488" : "#F5F5F4",
                        border: format === opt.value ? "1px solid #0D9488" : "1px solid #E7E5E4",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Total savings banner */}
          {allDone && images.length > 1 && (
            <div style={{
              background: totalSavings > 0 ? "#f0fdf4" : "#fef2f2",
              border: `1px solid ${totalSavings > 0 ? "#bbf7d0" : "#fecaca"}`,
              borderRadius: "10px",
              padding: "16px 20px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}>
              <div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: totalSavings > 0 ? "#059669" : "#dc2626" }}>
                  {totalSavings > 0 ? `You saved ${totalSavings}%` : "Size increased"}
                </div>
                <div style={{ fontSize: "13px", color: "#78716C", marginTop: "2px" }}>
                  {formatSize(totalOrigSize)} {"→"} {formatSize(totalCompSize)} ({images.length} images)
                  {totalSavings > 0 && <span style={{ color: "#059669", fontWeight: 600 }}> — {formatSize(totalOrigSize - totalCompSize)} saved</span>}
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button style={s.btn} onClick={downloadAll} disabled={downloading || !canUse}>
                  {downloading ? "Preparing..." : `Download All as ZIP`}
                </button>
              </div>
            </div>
          )}

          {/* Stats row */}
          <div style={s.stats}>
            <div style={s.stat}>
              <div style={s.statVal}>{formatSize(totalOrigSize)}</div>
              <div style={s.statLabel}>Original Total</div>
            </div>
            <div style={s.stat}>
              <div style={s.statVal}>{allDone ? formatSize(totalCompSize) : "..."}</div>
              <div style={s.statLabel}>Compressed Total</div>
            </div>
            <div style={s.stat}>
              <div style={{ ...s.statVal, ...s.green }}>{allDone ? totalSavings + "%" : "..."}</div>
              <div style={s.statLabel}>Total Saved</div>
            </div>
          </div>

          {/* Image list */}
          <div style={s.card}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#1C1917", marginBottom: "12px" }}>
              {images.length} image{images.length > 1 ? "s" : ""}
            </div>
            {images.map((img, idx) => {
              const saving = img.origSize > 0 && img.compSize > 0 ? Math.round((1 - img.compSize / img.origSize) * 100) : 0;
              return (
                <div key={img.id} style={s.fileRow}>
                  <img src={img.preview} alt="" style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "6px", border: "1px solid #E7E5E4", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: "#1C1917", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{img.file.name}</div>
                    <div style={{ fontSize: "12px", color: "#78716C", marginTop: "2px" }}>
                      {formatSize(img.origSize)} {"→"} {img.processing ? "..." : formatSize(img.compSize)}
                      {!img.processing && saving > 0 && <span style={{ color: "#059669", fontWeight: 600 }}> (-{saving}%)</span>}
                      {!img.processing && saving < 0 && <span style={{ color: "#dc2626", fontWeight: 600 }}> (+{Math.abs(saving)}%)</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                    <button style={s.btnSmallOut} onClick={() => { setComparisonIdx(comparisonIdx === idx ? null : idx); setSliderPos(50); }}>
                      {comparisonIdx === idx ? "Close" : "Compare"}
                    </button>
                    <button style={s.btnSmall} onClick={() => downloadSingle(img)} disabled={img.processing || !canUse}>
                      {"↓"}
                    </button>
                    <button onClick={() => removeImage(img.id)} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#A8A29E", padding: "4px 6px" }}>{"✕"}</button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Before/After comparison slider */}
          {comparisonIdx !== null && images[comparisonIdx] && images[comparisonIdx].compressed && (
            <div style={s.card}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#1C1917", marginBottom: "12px" }}>
                Before / After Comparison — {images[comparisonIdx].file.name}
              </div>
              <div
                ref={sliderContainerRef}
                style={{
                  position: "relative",
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: "8px",
                  cursor: "ew-resize",
                  userSelect: "none",
                  border: "1px solid #E7E5E4",
                }}
                onMouseDown={(e) => { isDraggingSlider.current = true; handleSliderMove(e.clientX); }}
                onTouchStart={(e) => { isDraggingSlider.current = true; if (e.touches[0]) handleSliderMove(e.touches[0].clientX); }}
              >
                {/* Compressed (background) */}
                <img src={images[comparisonIdx].compressed} alt="Compressed" style={{ display: "block", width: "100%", pointerEvents: "none" }} />
                {/* Original (clipped) */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                }}>
                  <img src={images[comparisonIdx].preview} alt="Original" style={{ display: "block", width: "100%", pointerEvents: "none" }} />
                </div>
                {/* Divider line */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: `${sliderPos}%`,
                  transform: "translateX(-50%)",
                  width: "3px",
                  height: "100%",
                  background: "#0D9488",
                  boxShadow: "0 0 6px rgba(0,0,0,0.3)",
                  pointerEvents: "none",
                }} />
                {/* Handle */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: `${sliderPos}%`,
                  transform: "translate(-50%, -50%)",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#0D9488",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 700,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  pointerEvents: "none",
                }}>
                  {"↔"}
                </div>
                {/* Labels */}
                <div style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(0,0,0,0.6)", color: "#fff", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 600, pointerEvents: "none" }}>Original</div>
                <div style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(0,0,0,0.6)", color: "#fff", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 600, pointerEvents: "none" }}>Compressed</div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {images.length === 1 && allDone && (
              <button style={s.btn} onClick={() => downloadSingle(images[0])} disabled={!canUse}>Download Compressed Image</button>
            )}
            {images.length > 1 && allDone && (
              <button style={s.btn} onClick={downloadAll} disabled={downloading || !canUse}>
                {downloading ? "Preparing ZIP..." : `Download All (${images.length} images)`}
              </button>
            )}
            <button style={s.btnOut} onClick={() => inputRef.current?.click()}>Add More Images</button>
            <button style={{ ...s.btnOut, color: "#dc2626", borderColor: "#dc2626" }} onClick={() => { setImages([]); setComparisonIdx(null); }}>Clear All</button>
          </div>
        </>
      )}
      <SeoContent />
    </div>
  );
}
