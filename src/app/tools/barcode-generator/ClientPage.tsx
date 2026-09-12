"use client";
import { useState, useEffect, useRef } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";

export default function ClientPage() {
  const [input, setInput] = useState("1234567890");
  const [format, setFormat] = useState("CODE128");
  const [dataUrl, setDataUrl] = useState("");
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!input.trim()) { setDataUrl(""); return; }
    import("jsbarcode").then((JsBarcode) => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      try {
        JsBarcode.default(svg, input, { format, width: 2, height: 80, displayValue: true, fontSize: 16, margin: 10, background: "#ffffff" });
        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svg);
        const encoded = "data:image/svg+xml;base64," + btoa(svgStr);
        setDataUrl(encoded);
        if (svgRef.current) { svgRef.current.innerHTML = ""; svgRef.current.appendChild(svg); }
      } catch { setDataUrl(""); if (svgRef.current) svgRef.current.innerHTML = "<p style='color:#ef4444;font-size:14px'>Invalid input for this barcode format.</p>"; }
    });
  }, [input, format]);

  const download = () => {
    if (!dataUrl) return;
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.onload = () => { canvas.width = img.width; canvas.height = img.height; canvas.getContext("2d")!.drawImage(img, 0, 0); const a = document.createElement("a"); a.href = canvas.toDataURL("image/png"); a.download = "barcode.png"; a.click(); };
    img.src = dataUrl;
  };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    select: { padding: "10px 12px", border: "1px solid #E7E5E4", borderRadius: 8, fontSize: 14, cursor: "pointer" } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Barcode Generator" description="Generate barcodes online for free. CODE128, EAN-13, UPC, CODE39, ITF-14. Download as PNG." slug="barcode-generator" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Business Tools", url: "https://toolcraftkit.com/#business-tools" }, { name: "Barcode Generator", url: "https://toolcraftkit.com/tools/barcode-generator" }]} />
      <h1 style={s.h1}>Barcode Generator</h1>
      <p style={s.sub}>Generate barcodes for products, inventory, and more. Download as PNG.</p>

      <div style={s.card}>
        <label style={s.label}>Barcode Content</label>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text or numbers..." style={{ ...s.input, marginBottom: 12 }} />
        <label style={s.label}>Format</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)} style={s.select}>
          <option value="CODE128">CODE 128 (universal)</option>
          <option value="EAN13">EAN-13 (retail, 13 digits)</option>
          <option value="UPC">UPC (US retail, 12 digits)</option>
          <option value="CODE39">CODE 39 (alphanumeric)</option>
          <option value="ITF14">ITF-14 (shipping, 14 digits)</option>
          <option value="pharmacode">Pharmacode</option>
        </select>
      </div>

      {dataUrl && (
        <div style={{ ...s.card, textAlign: "center" }}>
          <div ref={svgRef} style={{ marginBottom: 16, overflow: "auto" }} />
          <button onClick={download} style={s.btn}>Download PNG</button>
        </div>
      )}
      {!dataUrl && input && (
        <div style={{ ...s.card, textAlign: "center" }}>
          <div ref={svgRef} />
        </div>
      )}

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Generate barcodes in standard formats used worldwide. CODE 128 works for any text, EAN-13 and UPC are for retail products, CODE 39 for alphanumeric labels, and ITF-14 for shipping containers. All barcodes are generated locally in your browser.</p>
      </div>
    </div>
  );
}
