"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

export default function TextToPdf() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [fontSize, setFontSize] = useState(12);
  const [result, setResult] = useState("");
  const [converting, setConverting] = useState(false);

  const convert = async () => {
    if (!text.trim()) return;
    setConverting(true);
    try {
      const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib");
      const pdf = await PDFDocument.create();
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);
      const pageW = 595; const pageH = 842;
      const margin = 50;
      const lineHeight = fontSize * 1.5;
      const maxW = pageW - margin * 2;

      const lines: string[] = [];
      const paragraphs = text.split("\n");
      for (const para of paragraphs) {
        if (para.trim() === "") { lines.push(""); continue; }
        const words = para.split(" ");
        let current = "";
        for (const word of words) {
          const test = current ? current + " " + word : word;
          if (font.widthOfTextAtSize(test, fontSize) > maxW) {
            if (current) lines.push(current);
            current = word;
          } else { current = test; }
        }
        if (current) lines.push(current);
      }

      let page = pdf.addPage([pageW, pageH]);
      let y = pageH - margin;

      if (title.trim()) {
        page.drawText(title, { x: margin, y, font: boldFont, size: fontSize + 6, color: rgb(0.05, 0.05, 0.05) });
        y -= lineHeight * 2;
      }

      for (const line of lines) {
        if (y < margin + lineHeight) { page = pdf.addPage([pageW, pageH]); y = pageH - margin; }
        if (line === "") { y -= lineHeight * 0.5; continue; }
        page.drawText(line, { x: margin, y, font, size: fontSize, color: rgb(0.1, 0.1, 0.1) });
        y -= lineHeight;
      }

      const bytes = await pdf.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      setResult(URL.createObjectURL(blob));
    } catch (e: any) { alert("Error: " + (e.message || "Failed")); }
    setConverting(false);
  };

  const download = () => { const a = document.createElement("a"); a.href = result; a.download = (title || "document") + ".pdf"; a.click(); };

  const s = {
    wrap: { maxWidth: "800px", margin: "0 auto", padding: "20px" } as React.CSSProperties,
    breadcrumb: { fontSize: "13px", color: "#6b7280", marginBottom: "16px" } as React.CSSProperties,
    bLink: { color: "#0D9488", textDecoration: "none" } as React.CSSProperties,
    h1: { fontSize: "28px", fontWeight: 700, color: "#111827", marginBottom: "8px" } as React.CSSProperties,
    sub: { fontSize: "15px", color: "#6b7280", marginBottom: "24px" } as React.CSSProperties,
    card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", marginBottom: "20px" } as React.CSSProperties,
    label: { fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px", display: "block" },
    input: { width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "15px", boxSizing: "border-box" as const },
    textarea: { width: "100%", minHeight: "250px", padding: "14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit", lineHeight: 1.6, resize: "vertical" as const, boxSizing: "border-box" as const },
    select: { padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px" } as React.CSSProperties,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", padding: "12px 28px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    btnOut: { background: "#fff", color: "#0D9488", border: "2px solid #0D9488", borderRadius: "8px", padding: "10px 24px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    success: { background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "12px", padding: "24px", textAlign: "center" as const, marginBottom: "20px" },
    charCount: { fontSize: "12px", color: "#9ca3af", textAlign: "right" as const, marginTop: "4px" },
  };

  return (
    <div style={s.wrap}>
      <ToolSchema name="Text to PDF" description="Convert text to PDF online. Add a title, choose font size, and download as a formatted PDF document." slug="text-to-pdf" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Converter Tools", url: "https://toolcraftkit.com/#converter-tools" }, { name: "Text to PDF", url: "https://toolcraftkit.com/tools/text-to-pdf" }]} />

      <div style={s.breadcrumb}><a href="/" style={s.bLink}>Home</a> › <span style={{ color: "#0D9488" }}>Text to PDF</span></div>
      <h1 style={s.h1}>Text to PDF Converter</h1>
      <p style={s.sub}>Convert plain text into a formatted PDF document. Add a title, choose your font size, and download instantly.</p>

      <div style={s.card}>
        <label style={s.label}>Document Title (optional)</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Document" style={s.input} />
      </div>

      <div style={s.card}>
        <label style={s.label}>Your Text</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste or type your text here..." style={s.textarea} />
        <div style={s.charCount}>{text.length} characters · {text.split(/\s+/).filter(Boolean).length} words</div>
      </div>

      <div style={s.card}>
        <label style={s.label}>Font Size</label>
        <select value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} style={s.select}>
          <option value={10}>10pt — Small</option>
          <option value={11}>11pt — Compact</option>
          <option value={12}>12pt — Standard</option>
          <option value={14}>14pt — Large</option>
          <option value={16}>16pt — Extra Large</option>
        </select>
      </div>

      {!result ? (
        <button style={s.btn} onClick={convert} disabled={converting || !text.trim()}>
          {converting ? "Converting..." : "Convert to PDF"}
        </button>
      ) : (
        <div style={s.success}>
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>✅</div>
          <div style={{ fontSize: "18px", fontWeight: 600, color: "#111827", marginBottom: "16px" }}>PDF created!</div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button style={s.btn} onClick={download}>Download PDF</button>
            <button style={s.btnOut} onClick={() => setResult("")}>Edit & Reconvert</button>
          </div>
        </div>
      )}
      <SeoContent />
    </div>
  );
}
