"use client";
import { useState, useRef } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

interface PdfFile { id: string; name: string; size: number; data: ArrayBuffer; }

export default function PdfMerge() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatSize = (b: number) => b < 1024 ? b + " B" : b < 1048576 ? (b / 1024).toFixed(1) + " KB" : (b / 1048576).toFixed(2) + " MB";

  const addFiles = async (fileList: FileList) => {
    const newFiles: PdfFile[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const f = fileList[i];
      if (f.type !== "application/pdf") continue;
      const data = await f.arrayBuffer();
      newFiles.push({ id: Math.random().toString(36).slice(2), name: f.name, size: f.size, data });
    }
    setFiles((prev) => [...prev, ...newFiles]);
    setResult("");
    setError("");
  };

  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files); };
  const remove = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));
  const moveUp = (i: number) => { if (i === 0) return; setFiles((prev) => { const n = [...prev]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; return n; }); };
  const moveDown = (i: number) => { setFiles((prev) => { if (i >= prev.length - 1) return prev; const n = [...prev]; [n[i], n[i + 1]] = [n[i + 1], n[i]]; return n; }); };

  const merge = async () => {
    if (files.length < 2) { setError("Add at least 2 PDF files to merge."); return; }
    setMerging(true); setError("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const merged = await PDFDocument.create();
      for (const f of files) {
        const doc = await PDFDocument.load(f.data);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const bytes = await merged.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      setResult(URL.createObjectURL(blob));
    } catch (e: any) {
      setError("Error merging PDFs: " + (e.message || "Unknown error"));
    }
    setMerging(false);
  };

  const download = () => { const a = document.createElement("a"); a.href = result; a.download = "merged.pdf"; a.click(); };

  const s = {
    wrap: { maxWidth: "800px", margin: "0 auto", padding: "20px" } as React.CSSProperties,
    breadcrumb: { fontSize: "13px", color: "#6b7280", marginBottom: "16px" } as React.CSSProperties,
    bLink: { color: "#0D9488", textDecoration: "none" } as React.CSSProperties,
    h1: { fontSize: "28px", fontWeight: 700, color: "#111827", marginBottom: "8px" } as React.CSSProperties,
    sub: { fontSize: "15px", color: "#6b7280", marginBottom: "24px" } as React.CSSProperties,
    drop: { border: dragOver ? "2px solid #0D9488" : "2px dashed #d1d5db", borderRadius: "12px", padding: "48px 24px", textAlign: "center" as const, cursor: "pointer", background: dragOver ? "#f0fdfa" : "#fafafa", transition: "all 0.2s", marginBottom: "24px" },
    card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", marginBottom: "20px" } as React.CSSProperties,
    fileRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#f9fafb", borderRadius: "8px", marginBottom: "8px" } as React.CSSProperties,
    fileName: { fontSize: "14px", fontWeight: 500, color: "#111827" },
    fileSize: { fontSize: "12px", color: "#6b7280" },
    iconBtn: { background: "none", border: "none", fontSize: "16px", cursor: "pointer", padding: "4px 8px" } as React.CSSProperties,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", padding: "12px 28px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    btnOut: { background: "#fff", color: "#0D9488", border: "2px solid #0D9488", borderRadius: "8px", padding: "10px 24px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    error: { color: "#dc2626", fontSize: "14px", marginBottom: "16px" },
    success: { background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "12px", padding: "24px", textAlign: "center" as const, marginBottom: "20px" },
  };

  return (
    <div style={s.wrap}>
      <ToolSchema name="PDF Merge" description="Merge multiple PDF files into one document. Free, no upload to server. Reorder pages before merging." slug="pdf-merge" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "PDF Tools", url: "https://toolcraftkit.com/#pdf-tools" }, { name: "PDF Merge", url: "https://toolcraftkit.com/tools/pdf-merge" }]} />

      <div style={s.breadcrumb}>
        <a href="/" style={s.bLink}>Home</a> › <span style={{ color: "#0D9488" }}>PDF Merge</span>
      </div>
      <h1 style={s.h1}>Merge PDF Files</h1>
      <p style={s.sub}>Combine multiple PDF files into one document. Drag to reorder. No upload to server — everything runs in your browser.</p>

      <input ref={inputRef} type="file" accept=".pdf" multiple style={{ display: "none" }} onChange={(e) => e.target.files && addFiles(e.target.files)} />

      <div style={s.drop} onClick={() => inputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>📄</div>
        <div style={{ fontSize: "16px", color: "#374151" }}>Drop PDF files here or click to upload</div>
        <div style={{ fontSize: "13px", color: "#9ca3af" }}>Select multiple files at once</div>
      </div>

      {files.length > 0 && (
        <div style={s.card}>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "12px" }}>{files.length} file{files.length > 1 ? "s" : ""} selected</div>
          {files.map((f, i) => (
            <div key={f.id} style={s.fileRow}>
              <div>
                <div style={s.fileName}>📄 {f.name}</div>
                <div style={s.fileSize}>{formatSize(f.size)}</div>
              </div>
              <div>
                <button style={s.iconBtn} onClick={() => moveUp(i)} title="Move up">↑</button>
                <button style={s.iconBtn} onClick={() => moveDown(i)} title="Move down">↓</button>
                <button style={s.iconBtn} onClick={() => remove(f.id)} title="Remove">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <div style={s.error}>{error}</div>}

      {files.length >= 2 && !result && (
        <button style={s.btn} onClick={merge} disabled={merging}>
          {merging ? "Merging..." : `Merge ${files.length} PDFs`}
        </button>
      )}

      {result && (
        <div style={s.success}>
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>✅</div>
          <div style={{ fontSize: "18px", fontWeight: 600, color: "#111827", marginBottom: "16px" }}>PDFs merged successfully!</div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button style={s.btn} onClick={download}>Download Merged PDF</button>
            <button style={s.btnOut} onClick={() => { setFiles([]); setResult(""); }}>Start Over</button>
          </div>
        </div>
      )}
      <SeoContent />
    </div>
  );
}
