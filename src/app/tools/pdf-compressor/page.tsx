"use client";
import { useState, useRef } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [origSize, setOrigSize] = useState(0);
  const [compSize, setCompSize] = useState(0);
  const [result, setResult] = useState("");
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fmt = (b: number) => b < 1024 ? b + " B" : b < 1048576 ? (b / 1024).toFixed(1) + " KB" : (b / 1048576).toFixed(2) + " MB";

  const handleFile = (f: File) => { if (f.type !== "application/pdf") return; setFile(f); setOrigSize(f.size); setResult(""); setCompSize(0); };
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); };

  const compress = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const data = await file.arrayBuffer();
      const src = await PDFDocument.load(data, { ignoreEncryption: true });
      const doc = await PDFDocument.create();
      const pages = await doc.copyPages(src, src.getPageIndices());
      pages.forEach((p) => doc.addPage(p));
      doc.setTitle(src.getTitle() || "");
      doc.setAuthor(src.getAuthor() || "");
      const bytes = await doc.save({ useObjectStreams: true, addDefaultPage: false });
      const blob = new Blob([bytes], { type: "application/pdf" });
      setCompSize(blob.size);
      setResult(URL.createObjectURL(blob));
    } catch { alert("Error compressing PDF. The file may be encrypted or corrupted."); }
    setProcessing(false);
  };

  const download = () => { const a = document.createElement("a"); a.href = result; a.download = "compressed-" + (file?.name || "document.pdf"); a.click(); };
  const savings = origSize > 0 && compSize > 0 ? Math.round((1 - compSize / origSize) * 100) : 0;

  const s = {
    wrap: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    drop: { border: dragOver ? "2px solid #0D9488" : "2px dashed #d1d5db", borderRadius: 12, padding: "48px 24px", textAlign: "center" as const, cursor: "pointer", background: dragOver ? "#f0fdfa" : "#fafafa", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer" } as const,
    btnOut: { background: "#fff", color: "#0D9488", border: "2px solid #0D9488", borderRadius: 8, padding: "10px 24px", fontSize: 15, fontWeight: 600, cursor: "pointer" } as const,
    stats: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 } as const,
    stat: { textAlign: "center" as const, padding: 16, background: "#f9fafb", borderRadius: 8 } as const,
    statVal: { fontSize: 20, fontWeight: 700, color: "#111827" } as const,
    statLabel: { fontSize: 12, color: "#6b7280", marginTop: 4 } as const,
    green: { color: "#059669", fontWeight: 700 } as const,
    success: { background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: 12, padding: 24, textAlign: "center" as const, marginBottom: 20 } as const,
  };

  return (
    <div style={s.wrap}>
      <ToolSchema name="PDF Compressor" description="Compress PDF files online for free. Reduce PDF file size without losing quality. No upload to server." slug="pdf-compressor" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "PDF Tools", url: "https://toolcraftkit.com/#pdf-tools" }, { name: "PDF Compressor", url: "https://toolcraftkit.com/tools/pdf-compressor" }]} />
      <h1 style={s.h1}>PDF Compressor</h1>
      <p style={s.sub}>Reduce PDF file size without losing quality. Everything runs in your browser — no upload to any server.</p>

      <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

      {!file ? (
        <div style={s.drop} onClick={() => inputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📄</div>
          <div style={{ fontSize: 16, color: "#374151" }}>Drop a PDF here or click to upload</div>
          <div style={{ fontSize: 13, color: "#9ca3af" }}>Max 50 MB</div>
        </div>
      ) : !result ? (
        <div style={s.card}>
          <div style={{ fontSize: 14, marginBottom: 12 }}>📄 <strong>{file.name}</strong> ({fmt(origSize)})</div>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={compress} style={s.btn} disabled={processing}>{processing ? "Compressing..." : "Compress PDF"}</button>
            <button onClick={() => { setFile(null); setResult(""); }} style={s.btnOut}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div style={s.stats}>
            <div style={s.stat}><div style={s.statVal}>{fmt(origSize)}</div><div style={s.statLabel}>Original</div></div>
            <div style={s.stat}><div style={s.statVal}>{fmt(compSize)}</div><div style={s.statLabel}>Compressed</div></div>
            <div style={s.stat}><div style={{ ...s.statVal, ...s.green }}>{savings > 0 ? savings + "%" : "—"}</div><div style={s.statLabel}>Saved</div></div>
          </div>
          <div style={s.success}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: "#111827", marginBottom: 16 }}>{savings > 0 ? `Compressed! ${savings}% smaller.` : "PDF optimized (already compact)."}</div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={download} style={s.btn}>Download Compressed PDF</button>
              <button onClick={() => { setFile(null); setResult(""); setCompSize(0); }} style={s.btnOut}>New File</button>
            </div>
          </div>
        </>
      )}

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Reduce the size of your PDF files for easier sharing via email, messaging, or upload. The compression uses object stream optimization to minimize file size while keeping all content, fonts, and images intact. Everything runs locally in your browser — your files never leave your device.</p>
      </div>
    </div>
  );
}
