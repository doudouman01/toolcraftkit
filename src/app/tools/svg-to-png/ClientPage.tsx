"use client";
import { useState, useRef, useEffect } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

const TOOL_SLUG = "svg-to-png";

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [svgCode, setSvgCode] = useState("");
  const [svgWidth, setSvgWidth] = useState(512);
  const [svgHeight, setSvgHeight] = useState(512);
  const [lockAspect, setLockAspect] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [scale, setScale] = useState(1);
  const [bgTransparent, setBgTransparent] = useState(true);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, isPro } = useAuth();
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [period, setPeriod] = useState("day");

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

  const trackUsage = async () => {
    if (isPro) return true;
    if (!user) return false;
    if (usage >= limit) { window.location.href = "/pricing"; return false; }
    try {
      const res = await fetch("/api/usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: TOOL_SLUG, action: "increment" }),
      });
      const d = await res.json();
      if (d.usage !== undefined) setUsage(d.usage);
      return d.allowed !== false;
    } catch { return false; }
  };

  const handleFile = async (f: File) => {
    const text = await f.text();
    setSvgCode(text);
    parseSvgDimensions(text);
  };

  const parseSvgDimensions = (code: string) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, "image/svg+xml");
      const svg = doc.querySelector("svg");
      if (!svg) return;
      const vb = svg.getAttribute("viewBox");
      let w = parseFloat(svg.getAttribute("width") || "0");
      let h = parseFloat(svg.getAttribute("height") || "0");
      if (vb && (!w || !h)) {
        const parts = vb.split(/[\s,]+/);
        w = parseFloat(parts[2]) || 512;
        h = parseFloat(parts[3]) || 512;
      }
      if (w > 0 && h > 0) {
        setSvgWidth(Math.round(w));
        setSvgHeight(Math.round(h));
        setAspectRatio(w / h);
      }
    } catch {
      // ignore parse errors
    }
  };

  const handleWidthChange = (v: number) => {
    setSvgWidth(v);
    if (lockAspect && aspectRatio > 0) setSvgHeight(Math.round(v / aspectRatio));
  };

  const handleHeightChange = (v: number) => {
    setSvgHeight(v);
    if (lockAspect && aspectRatio > 0) setSvgWidth(Math.round(v * aspectRatio));
  };

  const convertToPng = async () => {
    setError("");
    setPreview("");
    if (!svgCode.trim()) { setError("Please upload or paste SVG code."); return; }
    if (!user) { setError("Please sign in to use this tool."); return; }
    const allowed = await trackUsage();
    if (!allowed) return;

    try {
      const finalW = svgWidth * scale;
      const finalH = svgHeight * scale;
      const blob = new Blob([svgCode], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = finalW;
        canvas.height = finalH;
        const ctx = canvas.getContext("2d")!;
        if (!bgTransparent) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, finalW, finalH);
        }
        ctx.drawImage(img, 0, 0, finalW, finalH);
        URL.revokeObjectURL(url);
        const dataUrl = canvas.toDataURL("image/png");
        setPreview(dataUrl);
      };
      img.onerror = () => { setError("Failed to render SVG. Check the code is valid."); URL.revokeObjectURL(url); };
      img.src = url;
    } catch {
      setError("Failed to convert SVG.");
    }
  };

  const downloadPng = () => {
    if (!preview) return;
    const link = document.createElement("a");
    link.download = `converted-${svgWidth * scale}x${svgHeight * scale}.png`;
    link.href = preview;
    link.click();
  };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700 as const, color: "#1C1917", marginBottom: 4 },
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 },
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
    label: { fontSize: 13, fontWeight: 600 as const, color: "#1C1917", marginBottom: 6, display: "block" as const },
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const },
    textarea: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 13, outline: "none", fontFamily: "monospace", minHeight: 140, boxSizing: "border-box" as const, resize: "vertical" as const },
    btn: (primary?: boolean) => ({ background: primary ? "#0D9488" : "#F5F5F4", color: primary ? "#fff" : "#1C1917", border: primary ? "1px solid #0D9488" : "1px solid #E7E5E4", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer" as const }),
    dropzone: { border: "2px dashed #E7E5E4", borderRadius: 8, padding: "30px 20px", textAlign: "center" as const, cursor: "pointer", marginBottom: 14 },
    resultCard: { background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 10, padding: 20, marginTop: 16, textAlign: "center" as const },
    pill: (active: boolean) => ({ background: active ? "#0D9488" : "#F5F5F4", color: active ? "#fff" : "#1C1917", border: active ? "1px solid #0D9488" : "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" as const, fontWeight: 500 as const }),
  };

  return (
    <div style={s.page}>
      <ToolSchema name="SVG to PNG Converter" description="Convert SVG files to high-quality PNG images with custom size and scale." slug="svg-to-png" category="Image Tools" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "SVG to PNG", url: "https://toolcraftkit.com/tools/svg-to-png" }]} />
      <h1 style={s.h1}>{t(`tools./tools/svg-to-png.name`) !== `tools./tools/svg-to-png.name` ? t(`tools./tools/svg-to-png.name`) : "SVG to PNG Converter"}</h1>
      <p style={s.sub}>{t(`tools./tools/svg-to-png.desc`) !== `tools./tools/svg-to-png.desc` ? t(`tools./tools/svg-to-png.desc`) : "Upload SVG or paste code, set size and scale, download as high-quality PNG."}</p>
      <UsageBanner toolSlug={TOOL_SLUG} usage={usage} limit={limit} period={period} />

      <div style={s.card}>
        <div
          style={s.dropzone}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        >
          <input ref={fileInputRef} type="file" accept=".svg" style={{ display: "none" }} onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
          <div style={{ fontSize: 14, color: "#78716C" }}>Click or drop an SVG file here</div>
        </div>

        <label style={s.label}>Or paste SVG code:</label>
        <textarea value={svgCode} onChange={e => { setSvgCode(e.target.value); parseSvgDimensions(e.target.value); }} placeholder="<svg ...>...</svg>" style={s.textarea} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 10, alignItems: "end", marginTop: 14, marginBottom: 14 }}>
          <div>
            <label style={s.label}>{toolUI.widthPx}</label>
            <input type="number" value={svgWidth} onChange={e => handleWidthChange(Number(e.target.value))} min={1} max={4096} style={s.input} />
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#78716C", cursor: "pointer", paddingBottom: 10 }}>
            <input type="checkbox" checked={lockAspect} onChange={e => setLockAspect(e.target.checked)} /> Lock
          </label>
          <div>
            <label style={s.label}>{toolUI.heightPx}</label>
            <input type="number" value={svgHeight} onChange={e => handleHeightChange(Number(e.target.value))} min={1} max={4096} style={s.input} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 14 }}>
          <div>
            <label style={s.label}>Scale</label>
            <div style={{ display: "flex", gap: 4 }}>
              {[1, 2, 3, 4].map(sc => (
                <button key={sc} onClick={() => setScale(sc)} style={s.pill(scale === sc)}>{sc}x</button>
              ))}
            </div>
          </div>
          <div>
            <label style={s.label}>Background</label>
            <div style={{ display: "flex", gap: 4 }}>
              <button onClick={() => setBgTransparent(true)} style={s.pill(bgTransparent)}>Transparent</button>
              <button onClick={() => setBgTransparent(false)} style={s.pill(!bgTransparent)}>White</button>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 12, color: "#78716C", marginBottom: 12 }}>Output: {svgWidth * scale} x {svgHeight * scale} px</div>

        <button onClick={convertToPng} style={s.btn(true)}>Convert to PNG</button>

        {error && <div style={{ marginTop: 12, color: "#EF4444", fontSize: 13 }}>{error}</div>}

        {preview && (
          <div style={s.resultCard}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="PNG preview" style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 4, background: "repeating-conic-gradient(#ddd 0% 25%, transparent 0% 50%) 50% / 16px 16px" }} />
            <div style={{ marginTop: 12 }}>
              <button onClick={downloadPng} style={s.btn(true)}>Download PNG ({svgWidth * scale}x{svgHeight * scale})</button>
            </div>
          </div>
        )}
      </div>
      <SeoContent />
    </div>
  );
}
