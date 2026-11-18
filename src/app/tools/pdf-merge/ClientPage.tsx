"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface PdfFile {
  id: string;
  name: string;
  size: number;
  data: ArrayBuffer;
  pageCount: number;
  thumbnail: string;
}

const TOOL_SLUG = "pdf-merge";

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const { user, isPro } = useAuth();
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(3);
  const [period, setPeriod] = useState("day");

  const [files, setFiles] = useState<PdfFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [mergeProgress, setMergeProgress] = useState(0);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const formatSize = (b: number) => b < 1024 ? b + " B" : b < 1048576 ? (b / 1024).toFixed(1) + " KB" : (b / 1048576).toFixed(2) + " MB";

  // Generate thumbnail from first page of PDF using pdf-lib + canvas
  const generateThumbnail = useCallback(async (data: ArrayBuffer): Promise<{ thumbnail: string; pageCount: number }> => {
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(data);
      const pageCount = doc.getPageCount();

      // Create a simple thumbnail by rendering first page info
      // We use a canvas-based approach with pdf.js-like rendering
      const firstPage = doc.getPage(0);
      const { width, height } = firstPage.getSize();
      const scale = 120 / Math.max(width, height);
      const thumbW = Math.round(width * scale);
      const thumbH = Math.round(height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = thumbW;
      canvas.height = thumbH;
      const ctx = canvas.getContext("2d")!;

      // White background with page outline
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, thumbW, thumbH);

      // Draw some placeholder lines to indicate text
      ctx.fillStyle = "#e5e7eb";
      const lineH = 3;
      const lineGap = 6;
      const margin = 10;
      let y = margin;
      while (y + lineH < thumbH - margin) {
        const lineW = margin + Math.random() * (thumbW - margin * 3);
        ctx.fillRect(margin, y, lineW, lineH);
        y += lineH + lineGap;
      }

      // Page count badge
      ctx.fillStyle = "#0D9488";
      ctx.font = `bold ${Math.max(10, thumbH * 0.15)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${pageCount}p`, thumbW / 2, thumbH / 2);

      return { thumbnail: canvas.toDataURL("image/png"), pageCount };
    } catch {
      return { thumbnail: "", pageCount: 0 };
    }
  }, []);

  const addFiles = async (fileList: FileList) => {
    const newFiles: PdfFile[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const f = fileList[i];
      if (f.type !== "application/pdf") continue;
      const data = await f.arrayBuffer();
      const { thumbnail, pageCount } = await generateThumbnail(data);
      newFiles.push({
        id: Math.random().toString(36).slice(2),
        name: f.name,
        size: f.size,
        data,
        pageCount,
        thumbnail,
      });
    }
    setFiles((prev) => [...prev, ...newFiles]);
    setResult("");
    setError("");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  const remove = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const moveUp = (i: number) => {
    if (i === 0) return;
    setFiles((prev) => { const n = [...prev]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; return n; });
  };

  const moveDown = (i: number) => {
    setFiles((prev) => {
      if (i >= prev.length - 1) return prev;
      const n = [...prev];
      [n[i], n[i + 1]] = [n[i + 1], n[i]];
      return n;
    });
  };

  // Drag and drop reordering within list
  const handleDragStart = (idx: number) => { setDragIdx(idx); };
  const handleDragOverItem = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    setDragOverIdx(idx);
  };
  const handleDropItem = (idx: number) => {
    if (dragIdx === null || dragIdx === idx) { setDragIdx(null); setDragOverIdx(null); return; }
    setFiles((prev) => {
      const n = [...prev];
      const [removed] = n.splice(dragIdx, 1);
      n.splice(idx, 0, removed);
      return n;
    });
    setDragIdx(null);
    setDragOverIdx(null);
  };
  const handleDragEnd = () => { setDragIdx(null); setDragOverIdx(null); };

  const totalPages = files.reduce((s, f) => s + f.pageCount, 0);

  const merge = async () => {
    if (files.length < 2) { setError("Add at least 2 PDF files to merge."); return; }
    setMerging(true);
    setError("");
    setMergeProgress(0);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const merged = await PDFDocument.create();
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const doc = await PDFDocument.load(f.data);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
        setMergeProgress(Math.round(((i + 1) / files.length) * 100));
      }
      const bytes = await merged.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      setResult(URL.createObjectURL(blob));
    } catch (e: any) {
      setError("Error merging PDFs: " + (e.message || "Unknown error"));
    }
    setMerging(false);
    setMergeProgress(0);
  };

  const download = async () => {
    if (!canUse) return;
    const ok = await trackUsage();
    if (!ok) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = "merged.pdf";
    a.click();
  };

  const s = {
    wrap: { maxWidth: "800px", margin: "0 auto", padding: "20px" } as React.CSSProperties,
    breadcrumb: { fontSize: "13px", color: "#78716C", marginBottom: "16px" } as React.CSSProperties,
    bLink: { color: "#0D9488", textDecoration: "none" } as React.CSSProperties,
    h1: { fontSize: "28px", fontWeight: 700, color: "#1C1917", marginBottom: "8px" } as React.CSSProperties,
    sub: { fontSize: "15px", color: "#78716C", marginBottom: "24px" } as React.CSSProperties,
    drop: { border: dragOver ? "2px solid #0D9488" : "2px dashed #E7E5E4", borderRadius: "12px", padding: "48px 24px", textAlign: "center" as const, cursor: "pointer", background: dragOver ? "#f0fdfa" : "#FAFAF9", transition: "all 0.2s", marginBottom: "24px" },
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: "12px", padding: "20px", marginBottom: "20px" } as React.CSSProperties,
    btn: { background: canUse ? "#0D9488" : "#A8A29E", color: "#fff", border: "none", borderRadius: "8px", padding: "12px 28px", fontSize: "15px", fontWeight: 600, cursor: canUse ? "pointer" : "not-allowed", opacity: canUse ? 1 : 0.6 } as React.CSSProperties,
    btnOut: { background: "#fff", color: "#0D9488", border: "2px solid #0D9488", borderRadius: "8px", padding: "10px 24px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    error: { color: "#dc2626", fontSize: "14px", marginBottom: "16px" },
    success: { background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "12px", padding: "24px", textAlign: "center" as const, marginBottom: "20px" },
  };

  return (
    <div style={s.wrap}>
      <ToolSchema name="PDF Merge" description="Merge multiple PDF files into one document. Free, no upload to server. Reorder pages before merging." slug="pdf-merge" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "PDF Tools", url: "https://toolcraftkit.com/#pdf-tools" }, { name: "PDF Merge", url: "https://toolcraftkit.com/tools/pdf-merge" }]} />

      <div style={s.breadcrumb}>
        <a href="/" style={s.bLink}>Home</a> {" > "} <span style={{ color: "#0D9488" }}>PDF Merge</span>
      </div>
      <h1 style={s.h1}>{t(`tools./tools/pdf-merge.name`) !== `tools./tools/pdf-merge.name` ? t(`tools./tools/pdf-merge.name`) : "Merge PDF Files"}</h1>
      <p style={s.sub}>{t(`tools./tools/pdf-merge.desc`) !== `tools./tools/pdf-merge.desc` ? t(`tools./tools/pdf-merge.desc`) : "Combine multiple PDF files into one document. Drag to reorder. No upload to server — everything runs in your browser."}</p>

      <UsageBanner toolSlug={TOOL_SLUG} usage={usage} limit={limit} period={period} />

      <input ref={inputRef} type="file" accept=".pdf" multiple style={{ display: "none" }} onChange={(e) => e.target.files && addFiles(e.target.files)} />

      <div style={s.drop} onClick={() => inputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>{"📄"}</div>
        <div style={{ fontSize: "16px", color: "#1C1917" }}>Drop PDF files here or click to upload</div>
        <div style={{ fontSize: "13px", color: "#A8A29E" }}>Select multiple files at once</div>
      </div>

      {files.length > 0 && (
        <div style={s.card}>
          {/* Header with total info */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#1C1917" }}>
              {files.length} file{files.length > 1 ? "s" : ""} selected
            </div>
            <div style={{ fontSize: "13px", color: "#0D9488", fontWeight: 600 }}>
              Total: {totalPages} page{totalPages !== 1 ? "s" : ""} from {files.length} file{files.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* File list with thumbnails, drag handles, page counts */}
          {files.map((f, i) => (
            <div
              key={f.id}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => handleDragOverItem(e, i)}
              onDrop={() => handleDropItem(i)}
              onDragEnd={handleDragEnd}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                background: dragIdx === i ? "#f0fdfa" : dragOverIdx === i ? "#ecfdf5" : "#F5F5F4",
                borderRadius: "10px",
                marginBottom: "8px",
                border: dragOverIdx === i ? "2px dashed #0D9488" : "2px solid transparent",
                transition: "all 0.15s ease",
                cursor: "grab",
                opacity: dragIdx === i ? 0.5 : 1,
              }}
            >
              {/* Drag handle */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", cursor: "grab", padding: "4px 2px", flexShrink: 0, color: "#A8A29E" }} title="Drag to reorder">
                <div style={{ width: "14px", height: "2px", background: "#A8A29E", borderRadius: "1px" }} />
                <div style={{ width: "14px", height: "2px", background: "#A8A29E", borderRadius: "1px" }} />
                <div style={{ width: "14px", height: "2px", background: "#A8A29E", borderRadius: "1px" }} />
              </div>

              {/* Thumbnail */}
              {f.thumbnail ? (
                <div style={{ width: "52px", height: "68px", flexShrink: 0, borderRadius: "4px", overflow: "hidden", border: "1px solid #E7E5E4", background: "#fff" }}>
                  <img src={f.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ) : (
                <div style={{ width: "52px", height: "68px", flexShrink: 0, borderRadius: "4px", border: "1px solid #E7E5E4", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
                  {"📄"}
                </div>
              )}

              {/* File info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "#1C1917", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                <div style={{ display: "flex", gap: "12px", marginTop: "4px", fontSize: "12px", color: "#78716C" }}>
                  <span>{formatSize(f.size)}</span>
                  <span style={{ color: "#0D9488", fontWeight: 600 }}>{f.pageCount} page{f.pageCount !== 1 ? "s" : ""}</span>
                </div>
              </div>

              {/* Reorder + remove buttons */}
              <div style={{ display: "flex", gap: "2px", flexShrink: 0 }}>
                <button onClick={() => moveUp(i)} title="Move up" style={{
                  background: "none", border: "1px solid #E7E5E4", borderRadius: "6px",
                  fontSize: "14px", cursor: i === 0 ? "default" : "pointer", padding: "6px 8px",
                  color: i === 0 ? "#E7E5E4" : "#78716C", transition: "all 0.15s",
                }}>{"↑"}</button>
                <button onClick={() => moveDown(i)} title="Move down" style={{
                  background: "none", border: "1px solid #E7E5E4", borderRadius: "6px",
                  fontSize: "14px", cursor: i === files.length - 1 ? "default" : "pointer", padding: "6px 8px",
                  color: i === files.length - 1 ? "#E7E5E4" : "#78716C", transition: "all 0.15s",
                }}>{"↓"}</button>
                <button onClick={() => remove(f.id)} title="Remove" style={{
                  background: "none", border: "1px solid #fecaca", borderRadius: "6px",
                  fontSize: "14px", cursor: "pointer", padding: "6px 8px",
                  color: "#dc2626", transition: "all 0.15s",
                }}>{"✕"}</button>
              </div>
            </div>
          ))}

          {/* Add more button inline */}
          <button onClick={() => inputRef.current?.click()} style={{
            width: "100%", padding: "12px", border: "2px dashed #E7E5E4",
            borderRadius: "10px", background: "transparent", color: "#0D9488",
            fontSize: "14px", fontWeight: 600, cursor: "pointer",
            transition: "all 0.15s", marginTop: "4px",
          }}>
            + Add More PDFs
          </button>
        </div>
      )}

      {error && <div style={s.error}>{error}</div>}

      {/* Merge button with progress */}
      {files.length >= 2 && !result && (
        <div style={{ marginBottom: "20px" }}>
          <button style={s.btn} onClick={merge} disabled={merging || !canUse}>
            {merging ? "Merging..." : `Merge ${files.length} PDFs (${totalPages} pages)`}
          </button>
          {merging && (
            <div style={{ marginTop: "12px" }}>
              <div style={{
                height: "6px", borderRadius: "3px", background: "#E7E5E4", overflow: "hidden",
              }}>
                <div style={{
                  width: `${mergeProgress}%`,
                  height: "100%",
                  borderRadius: "3px",
                  background: "#0D9488",
                  transition: "width 0.3s ease",
                }} />
              </div>
              <div style={{ fontSize: "12px", color: "#78716C", marginTop: "6px" }}>
                Processing file {Math.ceil((mergeProgress / 100) * files.length)} of {files.length}...
              </div>
            </div>
          )}
        </div>
      )}

      {result && (
        <div style={s.success}>
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>{"✅"}</div>
          <div style={{ fontSize: "18px", fontWeight: 600, color: "#1C1917", marginBottom: "4px" }}>PDFs merged successfully!</div>
          <div style={{ fontSize: "13px", color: "#78716C", marginBottom: "16px" }}>
            {files.length} files combined into {totalPages} pages
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={s.btn} onClick={download} disabled={!canUse}>Download Merged PDF</button>
            <button style={s.btnOut} onClick={() => { setFiles([]); setResult(""); }}>{toolUI.startOver}</button>
          </div>
        </div>
      )}
      <SeoContent />
    </div>
  );
}
