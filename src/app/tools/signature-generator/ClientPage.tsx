"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

type Stroke = { points: { x: number; y: number }[]; color: string; width: number };

const FONTS = [
  { label: "Elegant", family: "Georgia, serif", style: "italic", weight: "400", size: 52 },
  { label: "Script", family: "Brush Script MT, cursive", style: "normal", weight: "400", size: 56 },
  { label: "Classic", family: "Palatino Linotype, serif", style: "italic", weight: "700", size: 50 },
  { label: "Modern", family: "Segoe UI, sans-serif", style: "italic", weight: "300", size: 48 },
  { label: "Bold", family: "Times New Roman, serif", style: "italic", weight: "700", size: 54 },
];

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [mode, setMode] = useState<"draw" | "type">("draw");
  const [color, setColor] = useState("#000000");
  const [thickness, setThickness] = useState(3);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[] | null>(null);
  const [typeName, setTypeName] = useState("");
  const [selectedFont, setSelectedFont] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: (e.nativeEvent.offsetX) * scaleX, y: (e.nativeEvent.offsetY) * scaleY };
  };

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const allStrokes = currentStroke ? [...strokes, { points: currentStroke, color, width: thickness }] : strokes;
    for (const s of allStrokes) {
      if (s.points.length < 2) continue;
      ctx.beginPath();
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.moveTo(s.points[0].x, s.points[0].y);
      for (let i = 1; i < s.points.length; i++) {
        ctx.lineTo(s.points[i].x, s.points[i].y);
      }
      ctx.stroke();
    }
  }, [strokes, currentStroke, color, thickness]);

  useEffect(() => { redraw(); }, [redraw]);

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (mode !== "draw") return;
    e.preventDefault();
    isDrawing.current = true;
    const pos = getPos(e);
    setCurrentStroke([pos]);
  };

  const moveDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !currentStroke) return;
    e.preventDefault();
    const pos = getPos(e);
    setCurrentStroke(prev => prev ? [...prev, pos] : [pos]);
  };

  const endDraw = () => {
    if (!isDrawing.current || !currentStroke) return;
    isDrawing.current = false;
    if (currentStroke.length >= 2) {
      setStrokes(prev => [...prev, { points: currentStroke, color, width: thickness }]);
    }
    setCurrentStroke(null);
  };

  const undo = () => setStrokes(prev => prev.slice(0, -1));
  const clear = () => setStrokes([]);

  const download = (format: "png" | "jpg") => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const out = document.createElement("canvas");
    out.width = canvas.width;
    out.height = canvas.height;
    const ctx = out.getContext("2d")!;
    if (format === "jpg") {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, out.width, out.height);
    }
    ctx.drawImage(canvas, 0, 0);
    const link = document.createElement("a");
    link.download = `signature.${format}`;
    link.href = out.toDataURL(format === "jpg" ? "image/jpeg" : "image/png", 0.95);
    link.click();
  };

  const downloadTyped = (format: "png" | "jpg") => {
    if (!typeName.trim()) return;
    const font = FONTS[selectedFont];
    const c = document.createElement("canvas");
    c.width = 600;
    c.height = 150;
    const ctx = c.getContext("2d")!;
    if (format === "jpg") {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, c.width, c.height);
    }
    ctx.font = `${font.style} ${font.weight} ${font.size}px ${font.family}`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(typeName, 300, 75);
    const link = document.createElement("a");
    link.download = `signature.${format}`;
    link.href = c.toDataURL(format === "jpg" ? "image/jpeg" : "image/png", 0.95);
    link.click();
  };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700 as const, color: "#1C1917", marginBottom: 4 },
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 },
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
    label: { fontSize: 13, fontWeight: 600 as const, color: "#1C1917", marginBottom: 6, display: "block" as const },
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const },
    btn: (primary?: boolean) => ({ background: primary ? "#0D9488" : "#F5F5F4", color: primary ? "#fff" : "#1C1917", border: primary ? "1px solid #0D9488" : "1px solid #E7E5E4", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600 as const, cursor: "pointer" as const }),
    row: { display: "flex" as const, gap: 8, flexWrap: "wrap" as const, alignItems: "center" as const },
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Signature Generator" description="Draw or type your signature and download as PNG or JPG." slug="signature-generator" category="Business Tools" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Signature Generator", url: "https://toolcraftkit.com/tools/signature-generator" }]} />
      <h1 style={s.h1}>{t(`tools./tools/signature-generator.name`) !== `tools./tools/signature-generator.name` ? t(`tools./tools/signature-generator.name`) : "Signature Generator"}</h1>
      <p style={s.sub}>{t(`tools./tools/signature-generator.desc`) !== `tools./tools/signature-generator.desc` ? t(`tools./tools/signature-generator.desc`) : "Draw your signature or type your name in a cursive style. Download as PNG or JPG."}</p>

      <div style={s.card}>
        <div style={{ ...s.row, marginBottom: 14 }}>
          {(["draw", "type"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} style={s.btn(mode === m)}>{m === "draw" ? "Draw" : "Type"}</button>
          ))}
        </div>

        <div style={{ ...s.row, marginBottom: 14 }}>
          <label style={{ fontSize: 13, color: "#1C1917", fontWeight: 600 }}>Color:</label>
          <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 36, height: 30, border: "1px solid #E7E5E4", borderRadius: 4, cursor: "pointer", padding: 0 }} />
          {mode === "draw" && (
            <>
              <label style={{ fontSize: 13, color: "#1C1917", fontWeight: 600, marginLeft: 12 }}>Thickness:</label>
              <input type="range" min={1} max={8} value={thickness} onChange={e => setThickness(Number(e.target.value))} style={{ width: 100 }} />
              <span style={{ fontSize: 12, color: "#78716C" }}>{thickness}px</span>
            </>
          )}
        </div>

        {mode === "draw" ? (
          <>
            <div style={{ border: "2px dashed #E7E5E4", borderRadius: 8, overflow: "hidden", marginBottom: 12, touchAction: "none" }}>
              <canvas
                ref={canvasRef}
                width={600}
                height={200}
                style={{ width: "100%", height: "auto", display: "block", cursor: "crosshair", background: "#fff" }}
                onMouseDown={startDraw}
                onMouseMove={moveDraw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={moveDraw}
                onTouchEnd={endDraw}
              />
            </div>
            <div style={{ ...s.row, marginBottom: 0 }}>
              <button onClick={undo} style={s.btn()}>Undo</button>
              <button onClick={clear} style={s.btn()}>{toolUI.clear}</button>
              <div style={{ flex: 1 }} />
              <button onClick={() => download("png")} style={s.btn(true)}>{toolUI.downloadPNG}</button>
              <button onClick={() => download("jpg")} style={s.btn()}>{toolUI.downloadJPG}</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: 14 }}>
              <label style={s.label}>Your Name</label>
              <input value={typeName} onChange={e => setTypeName(e.target.value)} placeholder="John Doe" style={s.input} />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={s.label}>Font Style</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
                {FONTS.map((f, i) => (
                  <button key={i} onClick={() => setSelectedFont(i)} style={{
                    background: selectedFont === i ? "#F0FDFA" : "#FAFAF9",
                    border: selectedFont === i ? "2px solid #0D9488" : "1px solid #E7E5E4",
                    borderRadius: 8, padding: "10px 12px", cursor: "pointer", textAlign: "left" as const,
                  }}>
                    <div style={{ fontSize: 11, color: "#78716C", marginBottom: 4 }}>{f.label}</div>
                    <div style={{ fontFamily: f.family, fontStyle: f.style, fontWeight: f.weight, fontSize: 22, color }}>{typeName || "Preview"}</div>
                  </button>
                ))}
              </div>
            </div>

            {typeName.trim() && (
              <div style={{ border: "1px solid #E7E5E4", borderRadius: 8, padding: 20, textAlign: "center", marginBottom: 12, background: "#fff" }}>
                <div style={{
                  fontFamily: FONTS[selectedFont].family,
                  fontStyle: FONTS[selectedFont].style,
                  fontWeight: FONTS[selectedFont].weight,
                  fontSize: FONTS[selectedFont].size,
                  color,
                }}>{typeName}</div>
              </div>
            )}

            <div style={s.row}>
              <button onClick={() => downloadTyped("png")} style={s.btn(true)} disabled={!typeName.trim()}>{toolUI.downloadPNG}</button>
              <button onClick={() => downloadTyped("jpg")} style={s.btn()} disabled={!typeName.trim()}>{toolUI.downloadJPG}</button>
            </div>
          </>
        )}
      </div>
      <SeoContent />
    </div>
  );
}
