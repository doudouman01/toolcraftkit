"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

type Position = "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "tiled";

export default function ClientPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [text, setText] = useState("Sample Watermark");
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState("#ffffff");
  const [opacity, setOpacity] = useState(0.5);
  const [position, setPosition] = useState<Position>("center");
  const [dragOver, setDragOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadImage = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) loadImage(e.dataTransfer.files[0]);
  };

  const drawWatermark = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    const w = canvas.width;
    const h = canvas.height;
    const pad = fontSize;

    if (position === "tiled") {
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(-Math.PI / 6);
      const textWidth = ctx.measureText(text).width;
      const stepX = textWidth + 60;
      const stepY = fontSize * 2.5;
      for (let y = -h; y < h * 2; y += stepY) {
        for (let x = -w; x < w * 2; x += stepX) {
          ctx.fillText(text, x - w / 2, y - h / 2);
        }
      }
      ctx.restore();
    } else {
      let x = w / 2, y = h / 2;
      if (position === "top-left") { x = pad; y = pad; ctx.textAlign = "left"; }
      else if (position === "top-right") { x = w - pad; y = pad; ctx.textAlign = "right"; }
      else if (position === "bottom-left") { x = pad; y = h - pad; ctx.textAlign = "left"; }
      else if (position === "bottom-right") { x = w - pad; y = h - pad; ctx.textAlign = "right"; }
      ctx.fillText(text, x, y);
    }

    ctx.globalAlpha = 1;
  }, [text, fontSize, color, opacity, position]);

  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      drawWatermark();
    };
    img.src = imageSrc;
  }, [imageSrc, drawWatermark]);

  useEffect(() => {
    if (imgRef.current) drawWatermark();
  }, [drawWatermark]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "watermarked-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const cardStyle: React.CSSProperties = { background: "#fff", border: "1px solid #E7E5E4", borderRadius: "12px", padding: "24px", marginBottom: "16px" };
  const labelStyle: React.CSSProperties = { display: "block", fontWeight: 600, marginBottom: "6px", color: "#1C1917", fontSize: "13px" };
  const inputStyle: React.CSSProperties = { width: "100%", padding: "8px 12px", border: "1px solid #E7E5E4", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" };

  return (
    <>
      <ToolSchema name="Image Watermark" description="Add text watermarks to images with customizable font, size, color, opacity, and position." slug="image-watermark" category="DesignApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Image Tools", url: "/#image-tools" }, { name: "Image Watermark", url: "/tools/image-watermark" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1C1917", marginBottom: "6px" }}>Image Watermark</h1>
        <p style={{ color: "#78716C", fontSize: "15px", marginBottom: "28px" }}>Upload an image and add a text watermark. Customize and download.</p>

        {!imageSrc ? (
          <div
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            style={{ ...cardStyle, textAlign: "center", padding: "60px 24px", cursor: "pointer", borderStyle: "dashed", borderColor: dragOver ? "#0D9488" : "#E7E5E4", background: dragOver ? "#f0fdfa" : "#FAFAF9" }}
          >
            <div style={{ fontSize: "36px", marginBottom: "8px" }}>&#128247;</div>
            <div style={{ fontWeight: 600, color: "#1C1917", marginBottom: "4px" }}>Drop an image here or click to upload</div>
            <div style={{ fontSize: "13px", color: "#78716C" }}>Supports PNG, JPG, WebP</div>
            <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => e.target.files?.[0] && loadImage(e.target.files[0])} />
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "16px", alignItems: "start" }}>
              {/* Controls */}
              <div style={cardStyle}>
                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>Watermark Text</label>
                  <input value={text} onChange={(e) => setText(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>Font Size: {fontSize}px</label>
                  <input type="range" min="12" max="200" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} style={{ width: "100%" }} />
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>Color</label>
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: "60px", height: "36px", border: "none", cursor: "pointer" }} />
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>Opacity: {Math.round(opacity * 100)}%</label>
                  <input type="range" min="0.05" max="1" step="0.05" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} style={{ width: "100%" }} />
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>Position</label>
                  <select value={position} onChange={(e) => setPosition(e.target.value as Position)} style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="center">Center</option>
                    <option value="top-left">Top Left</option>
                    <option value="top-right">Top Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="bottom-right">Bottom Right</option>
                    <option value="tiled">Tiled (Repeat)</option>
                  </select>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={download} style={{ flex: 1, padding: "10px", background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "14px" }}>Download</button>
                  <button onClick={() => { setImageSrc(null); imgRef.current = null; }} style={{ padding: "10px 14px", background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: "8px", cursor: "pointer", fontSize: "14px" }}>Reset</button>
                </div>
              </div>
              {/* Preview */}
              <div style={cardStyle}>
                <canvas ref={canvasRef} style={{ width: "100%", borderRadius: "8px", display: "block" }} />
              </div>
            </div>
            {/* Mobile: stack controls above preview */}
            <style>{`@media(max-width:700px){div[style*="grid-template-columns: 280px"]{grid-template-columns:1fr!important;}}`}</style>
          </>
        )}
      </div>
      <SeoContent />
    </>
  );
}
