"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

const TOOL_SLUG = "meme-generator";

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [dragOver, setDragOver] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ w: 600, h: 500 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, isPro } = useAuth();
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [period, setPeriod] = useState("day");
  const [error, setError] = useState("");

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

  const drawMeme = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvasSize.w;
    canvas.height = canvasSize.h;

    if (image) {
      ctx.drawImage(image, 0, 0, canvasSize.w, canvasSize.h);
    } else {
      ctx.fillStyle = "#333333";
      ctx.fillRect(0, 0, canvasSize.w, canvasSize.h);
    }

    ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillStyle = textColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = Math.max(2, fontSize / 12);
    ctx.lineJoin = "round";

    const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number, fromTop: boolean) => {
      const words = text.split(" ");
      const lines: string[] = [];
      let line = "";
      for (const word of words) {
        const test = line ? line + " " + word : word;
        if (ctx.measureText(test).width > maxWidth && line) {
          lines.push(line);
          line = word;
        } else {
          line = test;
        }
      }
      if (line) lines.push(line);

      const startY = fromTop ? y : y - (lines.length - 1) * lineHeight;
      lines.forEach((l, i) => {
        const ly = startY + i * lineHeight;
        ctx.strokeText(l, x, ly);
        ctx.fillText(l, x, ly);
      });
    };

    if (topText) {
      wrapText(topText.toUpperCase(), canvasSize.w / 2, fontSize + 10, canvasSize.w - 20, fontSize * 1.2, true);
    }
    if (bottomText) {
      wrapText(bottomText.toUpperCase(), canvasSize.w / 2, canvasSize.h - 20, canvasSize.w - 20, fontSize * 1.2, false);
    }
  }, [image, topText, bottomText, fontSize, textColor, strokeColor, canvasSize]);

  useEffect(() => { drawMeme(); }, [drawMeme]);

  const loadImage = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const img = new Image();
    img.onload = () => {
      const maxW = 800;
      const scale = img.width > maxW ? maxW / img.width : 1;
      setCanvasSize({ w: Math.round(img.width * scale), h: Math.round(img.height * scale) });
      setImage(img);
    };
    img.src = URL.createObjectURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) loadImage(e.dataTransfer.files[0]);
  };

  const download = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!user) { setError("Please sign in to download memes."); return; }
    const allowed = await trackUsage();
    if (!allowed) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "meme.png";
    a.click();
  };

  const useBlankCanvas = () => {
    setImage(null);
    setCanvasSize({ w: 600, h: 500 });
  };

  const s = {
    wrap: { maxWidth: "800px", margin: "0 auto", padding: "20px" } as React.CSSProperties,
    h1: { fontSize: "28px", fontWeight: 700, color: "#111827", marginBottom: "8px" } as React.CSSProperties,
    sub: { fontSize: "15px", color: "#6b7280", marginBottom: "24px" } as React.CSSProperties,
    card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", marginBottom: "20px" } as React.CSSProperties,
    drop: { border: dragOver ? "2px solid #0D9488" : "2px dashed #d1d5db", borderRadius: "12px", padding: "48px 24px", textAlign: "center" as const, cursor: "pointer", background: dragOver ? "#f0fdfa" : "#fafafa", transition: "all 0.2s", marginBottom: "16px" },
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as React.CSSProperties,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const } as React.CSSProperties,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", padding: "12px 28px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "8px 14px", fontSize: 13, cursor: "pointer" } as React.CSSProperties,
    canvasWrap: { textAlign: "center" as const, marginBottom: "20px", background: "#f9fafb", borderRadius: "12px", padding: "16px", border: "1px solid #e5e7eb" },
    colorInput: { width: "48px", height: "36px", border: "1px solid #E7E5E4", borderRadius: "6px", cursor: "pointer", padding: "2px" } as React.CSSProperties,
  };

  return (
    <div style={s.wrap}>
      <ToolSchema name="Meme Generator" description="Create memes with custom text on any image. Download as PNG." slug="meme-generator" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Image Tools", url: "https://toolcraftkit.com/#image-tools" }, { name: "Meme Generator", url: "https://toolcraftkit.com/tools/meme-generator" }]} />

      <h1 style={s.h1}>{t(`tools./tools/meme-generator.name`) !== `tools./tools/meme-generator.name` ? t(`tools./tools/meme-generator.name`) : "Meme Generator"}</h1>
      <p style={s.sub}>{t(`tools./tools/meme-generator.desc`) !== `tools./tools/meme-generator.desc` ? t(`tools./tools/meme-generator.desc`) : "Upload an image, add top and bottom text, and download your meme as PNG."}</p>
      <UsageBanner toolSlug={TOOL_SLUG} usage={usage} limit={limit} period={period} />
      {error && <div style={{ color: "#dc2626", fontSize: "14px", marginBottom: "16px", padding: "8px 12px", background: "#FEF2F2", borderRadius: "6px" }}>{error}</div>}

      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => e.target.files?.[0] && loadImage(e.target.files[0])} />

      {!image && (
        <div style={s.drop} onClick={() => inputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>😂</div>
          <div style={{ fontSize: "16px", color: "#374151" }}>Drop an image here or click to upload</div>
          <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "8px" }}>or</div>
          <button style={{ ...s.btnSm, marginTop: "8px" }} onClick={(e) => { e.stopPropagation(); useBlankCanvas(); }}>Use Blank Canvas</button>
        </div>
      )}

      <div style={s.card}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
          <div>
            <label style={s.label}>Top Text</label>
            <input type="text" value={topText} onChange={(e) => setTopText(e.target.value)} placeholder="TOP TEXT" style={s.input} />
          </div>
          <div>
            <label style={s.label}>Bottom Text</label>
            <input type="text" value={bottomText} onChange={(e) => setBottomText(e.target.value)} placeholder="BOTTOM TEXT" style={s.input} />
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={s.label}>Font Size: {fontSize}px</label>
          <input type="range" min={16} max={120} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} style={{ width: "100%" }} />
        </div>

        <div style={{ display: "flex", gap: "24px", alignItems: "flex-end", marginBottom: "16px", flexWrap: "wrap" }}>
          <div>
            <label style={s.label}>Text Color</label>
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} style={s.colorInput} />
          </div>
          <div>
            <label style={s.label}>Stroke Color</label>
            <input type="color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} style={s.colorInput} />
          </div>
          {image && (
            <button style={s.btnSm} onClick={() => inputRef.current?.click()}>Change Image</button>
          )}
        </div>
      </div>

      {(image || topText || bottomText) && (
        <>
          <div style={s.canvasWrap}>
            <canvas ref={canvasRef} style={{ maxWidth: "100%", borderRadius: "8px" }} />
          </div>
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
            <button style={s.btn} onClick={download}>Download Meme (PNG)</button>
            <button style={s.btnSm} onClick={() => { setImage(null); setTopText(""); setBottomText(""); }}>{toolUI.startOver}</button>
          </div>
        </>
      )}

      <SeoContent />
    </div>
  );
}
