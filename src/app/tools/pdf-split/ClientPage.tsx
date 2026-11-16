"use client";
import { useState, useRef } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

export default function ClientPage() {
  const [fileName, setFileName] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [result, setResult] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const loadPdf = async (file: File) => {
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      setError("Please select a PDF file.");
      return;
    }
    setError("");
    setResult("");
    try {
      const data = await file.arrayBuffer();
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(data);
      const count = doc.getPageCount();
      setPdfData(data);
      setFileName(file.name);
      setPageCount(count);
      setSelectedPages(new Set());
    } catch (e: any) {
      setError("Could not read PDF: " + (e.message || "Unknown error"));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) loadPdf(e.dataTransfer.files[0]);
  };

  const togglePage = (p: number) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p); else next.add(p);
      return next;
    });
  };

  const selectAll = () => {
    const all = new Set<number>();
    for (let i = 0; i < pageCount; i++) all.add(i);
    setSelectedPages(all);
  };

  const selectNone = () => setSelectedPages(new Set());

  const selectRange = () => {
    const input = prompt("Enter page range (e.g. 1-5, 8, 10-12):");
    if (!input) return;
    const pages = new Set<number>();
    input.split(",").forEach((part) => {
      const trimmed = part.trim();
      const rangeMatch = trimmed.match(/^(\d+)\s*-\s*(\d+)$/);
      if (rangeMatch) {
        const start = Math.max(1, parseInt(rangeMatch[1]));
        const end = Math.min(pageCount, parseInt(rangeMatch[2]));
        for (let i = start; i <= end; i++) pages.add(i - 1);
      } else {
        const n = parseInt(trimmed);
        if (n >= 1 && n <= pageCount) pages.add(n - 1);
      }
    });
    setSelectedPages(pages);
  };

  const splitPdf = async () => {
    if (!pdfData || selectedPages.size === 0) return;
    setProcessing(true);
    setError("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const srcDoc = await PDFDocument.load(pdfData);
      const newDoc = await PDFDocument.create();
      const indices = Array.from(selectedPages).sort((a, b) => a - b);
      const copiedPages = await newDoc.copyPages(srcDoc, indices);
      copiedPages.forEach((p) => newDoc.addPage(p));
      const bytes = await newDoc.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      setResult(URL.createObjectURL(blob));
    } catch (e: any) {
      setError("Error splitting PDF: " + (e.message || "Unknown error"));
    }
    setProcessing(false);
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = fileName.replace(".pdf", "") + "_pages.pdf";
    a.click();
  };

  const reset = () => {
    if (result) URL.revokeObjectURL(result);
    setPdfData(null);
    setFileName("");
    setPageCount(0);
    setSelectedPages(new Set());
    setResult("");
    setError("");
  };

  const s = {
    wrap: { maxWidth: "800px", margin: "0 auto", padding: "20px" } as React.CSSProperties,
    h1: { fontSize: "28px", fontWeight: 700, color: "#111827", marginBottom: "8px" } as React.CSSProperties,
    sub: { fontSize: "15px", color: "#6b7280", marginBottom: "24px" } as React.CSSProperties,
    drop: { border: dragOver ? "2px solid #0D9488" : "2px dashed #d1d5db", borderRadius: "12px", padding: "48px 24px", textAlign: "center" as const, cursor: "pointer", background: dragOver ? "#f0fdfa" : "#fafafa", transition: "all 0.2s", marginBottom: "24px" },
    card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", marginBottom: "20px" } as React.CSSProperties,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", padding: "12px 28px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "8px 14px", fontSize: 13, cursor: "pointer" } as React.CSSProperties,
    btnOut: { background: "#fff", color: "#0D9488", border: "2px solid #0D9488", borderRadius: "8px", padding: "10px 24px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    error: { color: "#dc2626", fontSize: "14px", marginBottom: "16px", padding: "8px 12px", background: "#FEF2F2", borderRadius: "6px" } as React.CSSProperties,
    success: { background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "12px", padding: "24px", textAlign: "center" as const, marginBottom: "20px" },
    pageGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(52px, 1fr))", gap: "8px", marginTop: "12px" } as React.CSSProperties,
    pageBtn: (selected: boolean) => ({
      width: "100%",
      aspectRatio: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: selected ? "2px solid #0D9488" : "1px solid #E7E5E4",
      borderRadius: "8px",
      background: selected ? "#F0FDFA" : "#FAFAF9",
      color: selected ? "#0D9488" : "#6b7280",
      fontWeight: selected ? 700 : 400,
      fontSize: "14px",
      cursor: "pointer",
    }) as React.CSSProperties,
  };

  return (
    <div style={s.wrap}>
      <ToolSchema name="PDF Split" description="Split PDF files into individual pages or extract page ranges. Free, no upload to server." slug="pdf-split" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "PDF Tools", url: "https://toolcraftkit.com/#pdf-tools" }, { name: "PDF Split", url: "https://toolcraftkit.com/tools/pdf-split" }]} />

      <h1 style={s.h1}>PDF Split</h1>
      <p style={s.sub}>Extract pages from a PDF. Select individual pages or ranges. Everything runs in your browser.</p>

      <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={(e) => e.target.files?.[0] && loadPdf(e.target.files[0])} />

      {!pdfData && (
        <div style={s.drop} onClick={() => inputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📄</div>
          <div style={{ fontSize: "16px", color: "#374151" }}>Drop a PDF file here or click to upload</div>
        </div>
      )}

      {error && <div style={s.error}>{error}</div>}

      {pdfData && !result && (
        <div style={s.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div>
              <div style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}>{fileName}</div>
              <div style={{ fontSize: "13px", color: "#6b7280" }}>{pageCount} page{pageCount > 1 ? "s" : ""}</div>
            </div>
            <button style={s.btnSm} onClick={reset}>Change File</button>
          </div>

          <div style={{ fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>
            Select pages to extract ({selectedPages.size} selected)
          </div>
          <div style={{ display: "flex", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
            <button style={s.btnSm} onClick={selectAll}>Select All</button>
            <button style={s.btnSm} onClick={selectNone}>Deselect All</button>
            <button style={s.btnSm} onClick={selectRange}>Enter Range</button>
          </div>

          <div style={s.pageGrid}>
            {Array.from({ length: pageCount }, (_, i) => (
              <button key={i} style={s.pageBtn(selectedPages.has(i))} onClick={() => togglePage(i)}>
                {i + 1}
              </button>
            ))}
          </div>

          {selectedPages.size > 0 && (
            <div style={{ marginTop: "20px" }}>
              <button style={s.btn} onClick={splitPdf} disabled={processing}>
                {processing ? "Extracting..." : `Extract ${selectedPages.size} Page${selectedPages.size > 1 ? "s" : ""}`}
              </button>
            </div>
          )}
        </div>
      )}

      {result && (
        <div style={s.success}>
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>✅</div>
          <div style={{ fontSize: "18px", fontWeight: 600, color: "#111827", marginBottom: "16px" }}>
            Extracted {selectedPages.size} page{selectedPages.size > 1 ? "s" : ""} successfully!
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button style={s.btn} onClick={download}>Download PDF</button>
            <button style={s.btnOut} onClick={reset}>Start Over</button>
          </div>
        </div>
      )}

      <SeoContent />
    </div>
  );
}
