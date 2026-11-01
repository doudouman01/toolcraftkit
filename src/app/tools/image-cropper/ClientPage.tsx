"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";
import SeoContent from "./SeoContent";

const TOOL_SLUG = "image-cropper";

type AspectRatio = { label: string; value: number | null };

const ASPECT_RATIOS: AspectRatio[] = [
  { label: "Free", value: null },
  { label: "1:1 (Square)", value: 1 },
  { label: "16:9", value: 16 / 9 },
  { label: "4:3", value: 4 / 3 },
  { label: "9:16 (Story)", value: 9 / 16 },
  { label: "3:2", value: 3 / 2 },
];

type HandleType = "nw" | "ne" | "sw" | "se" | "n" | "s" | "e" | "w" | "move" | null;

interface CropRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function ClientPage() {
  const { user, isPro } = useAuth();
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [period, setPeriod] = useState("day");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [naturalW, setNaturalW] = useState(0);
  const [naturalH, setNaturalH] = useState(0);
  const [displayW, setDisplayW] = useState(0);
  const [displayH, setDisplayH] = useState(0);
  const [scale, setScale] = useState(1);

  const [crop, setCrop] = useState<CropRect>({ x: 0, y: 0, w: 0, h: 0 });
  const [activeRatio, setActiveRatio] = useState<number | null>(null);
  const [outputFormat, setOutputFormat] = useState<"png" | "jpeg">("png");
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState<HandleType>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cropStart, setCropStart] = useState<CropRect>({ x: 0, y: 0, w: 0, h: 0 });
  const [isDragOver, setIsDragOver] = useState(false);
  const [manualW, setManualW] = useState("");
  const [manualH, setManualH] = useState("");
  const [fileName, setFileName] = useState("cropped-image");

  useEffect(() => {
    if (!user) return;
    fetch("/api/usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, toolSlug: TOOL_SLUG, action: "check" }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.usage !== undefined) setUsage(data.usage);
        if (data.limit !== undefined) setLimit(data.limit);
        if (data.period) setPeriod(data.period);
      })
      .catch(() => {});
  }, [user]);

  const loadImage = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    setFileName(baseName + "-cropped");
    setCroppedUrl(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setImageSrc(src);
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        setNaturalW(img.naturalWidth);
        setNaturalH(img.naturalHeight);
        setImageLoaded(true);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  }, []);

  // Compute display size and draw canvas whenever image loads or container resizes
  useEffect(() => {
    if (!imageLoaded || !imageRef.current || !containerRef.current) return;
    const maxW = containerRef.current.clientWidth;
    const maxH = 500;
    const img = imageRef.current;
    const ratioW = maxW / img.naturalWidth;
    const ratioH = maxH / img.naturalHeight;
    const s = Math.min(ratioW, ratioH, 1);
    const dw = Math.round(img.naturalWidth * s);
    const dh = Math.round(img.naturalHeight * s);
    setScale(s);
    setDisplayW(dw);
    setDisplayH(dh);

    // Default crop: center 80%
    const cw = Math.round(dw * 0.8);
    const ch = Math.round(dh * 0.8);
    setCrop({ x: Math.round((dw - cw) / 2), y: Math.round((dh - ch) / 2), w: cw, h: ch });
    setActiveRatio(null);
    setManualW("");
    setManualH("");
  }, [imageLoaded, naturalW, naturalH]);

  // Draw canvas
  useEffect(() => {
    if (!canvasRef.current || !imageRef.current || !imageLoaded) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = displayW;
    canvas.height = displayH;

    // Draw image
    ctx.drawImage(imageRef.current, 0, 0, displayW, displayH);

    // Dim outside crop
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, displayW, crop.y);
    ctx.fillRect(0, crop.y, crop.x, crop.h);
    ctx.fillRect(crop.x + crop.w, crop.y, displayW - crop.x - crop.w, crop.h);
    ctx.fillRect(0, crop.y + crop.h, displayW, displayH - crop.y - crop.h);

    // Crop border
    ctx.strokeStyle = "#0D9488";
    ctx.lineWidth = 2;
    ctx.strokeRect(crop.x, crop.y, crop.w, crop.h);

    // Rule of thirds lines
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 2; i++) {
      const lx = crop.x + (crop.w / 3) * i;
      ctx.beginPath(); ctx.moveTo(lx, crop.y); ctx.lineTo(lx, crop.y + crop.h); ctx.stroke();
      const ly = crop.y + (crop.h / 3) * i;
      ctx.beginPath(); ctx.moveTo(crop.x, ly); ctx.lineTo(crop.x + crop.w, ly); ctx.stroke();
    }

    // Draw handles
    const handleSize = 10;
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#0D9488";
    ctx.lineWidth = 2;
    const handles = [
      { x: crop.x, y: crop.y },
      { x: crop.x + crop.w, y: crop.y },
      { x: crop.x, y: crop.y + crop.h },
      { x: crop.x + crop.w, y: crop.y + crop.h },
      { x: crop.x + crop.w / 2, y: crop.y },
      { x: crop.x + crop.w / 2, y: crop.y + crop.h },
      { x: crop.x, y: crop.y + crop.h / 2 },
      { x: crop.x + crop.w, y: crop.y + crop.h / 2 },
    ];
    handles.forEach((h) => {
      ctx.fillRect(h.x - handleSize / 2, h.y - handleSize / 2, handleSize, handleSize);
      ctx.strokeRect(h.x - handleSize / 2, h.y - handleSize / 2, handleSize, handleSize);
    });
  }, [crop, displayW, displayH, imageLoaded]);

  // Sync manual inputs
  useEffect(() => {
    if (!imageLoaded) return;
    const rw = Math.round(crop.w / scale);
    const rh = Math.round(crop.h / scale);
    setManualW(String(rw));
    setManualH(String(rh));
  }, [crop, scale, imageLoaded]);

  const getHandle = (mx: number, my: number): HandleType => {
    const hs = 8;
    const cx = crop.x, cy = crop.y, cw = crop.w, ch = crop.h;
    if (Math.abs(mx - cx) <= hs && Math.abs(my - cy) <= hs) return "nw";
    if (Math.abs(mx - (cx + cw)) <= hs && Math.abs(my - cy) <= hs) return "ne";
    if (Math.abs(mx - cx) <= hs && Math.abs(my - (cy + ch)) <= hs) return "sw";
    if (Math.abs(mx - (cx + cw)) <= hs && Math.abs(my - (cy + ch)) <= hs) return "se";
    if (Math.abs(my - cy) <= hs && mx > cx + hs && mx < cx + cw - hs) return "n";
    if (Math.abs(my - (cy + ch)) <= hs && mx > cx + hs && mx < cx + cw - hs) return "s";
    if (Math.abs(mx - cx) <= hs && my > cy + hs && my < cy + ch - hs) return "w";
    if (Math.abs(mx - (cx + cw)) <= hs && my > cy + hs && my < cy + ch - hs) return "e";
    if (mx > cx && mx < cx + cw && my > cy && my < cy + ch) return "move";
    return null;
  };

  const getCursorForHandle = (handle: HandleType): string => {
    switch (handle) {
      case "nw": case "se": return "nwse-resize";
      case "ne": case "sw": return "nesw-resize";
      case "n": case "s": return "ns-resize";
      case "e": case "w": return "ew-resize";
      case "move": return "move";
      default: return "crosshair";
    }
  };

  const getMousePos = (e: React.MouseEvent): { x: number; y: number } => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const clampCrop = (c: CropRect): CropRect => {
    const minSize = 10;
    let { x, y, w, h } = c;
    w = Math.max(minSize, w);
    h = Math.max(minSize, h);
    x = Math.max(0, Math.min(x, displayW - w));
    y = Math.max(0, Math.min(y, displayH - h));
    w = Math.min(w, displayW - x);
    h = Math.min(h, displayH - y);
    return { x, y, w, h };
  };

  const applyRatio = (c: CropRect, ratio: number | null): CropRect => {
    if (ratio === null) return c;
    let { x, y, w, h } = c;
    const newH = w / ratio;
    if (newH <= displayH) {
      h = newH;
    } else {
      h = displayH;
      w = h * ratio;
    }
    if (x + w > displayW) x = displayW - w;
    if (y + h > displayH) y = displayH - h;
    return clampCrop({ x, y, w: Math.round(w), h: Math.round(h) });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const pos = getMousePos(e);
    const handle = getHandle(pos.x, pos.y);
    if (handle) {
      setDragging(handle);
      setDragStart(pos);
      setCropStart({ ...crop });
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const pos = getMousePos(e);

    if (!dragging) {
      const handle = getHandle(pos.x, pos.y);
      canvasRef.current.style.cursor = getCursorForHandle(handle);
      return;
    }

    e.preventDefault();
    const dx = pos.x - dragStart.x;
    const dy = pos.y - dragStart.y;
    let newCrop = { ...cropStart };

    if (dragging === "move") {
      newCrop.x = cropStart.x + dx;
      newCrop.y = cropStart.y + dy;
    } else if (dragging === "se") {
      newCrop.w = cropStart.w + dx;
      newCrop.h = activeRatio ? (cropStart.w + dx) / activeRatio : cropStart.h + dy;
    } else if (dragging === "sw") {
      newCrop.x = cropStart.x + dx;
      newCrop.w = cropStart.w - dx;
      newCrop.h = activeRatio ? (cropStart.w - dx) / activeRatio : cropStart.h + dy;
    } else if (dragging === "ne") {
      newCrop.w = cropStart.w + dx;
      newCrop.y = activeRatio ? cropStart.y - ((cropStart.w + dx) / activeRatio - cropStart.h) : cropStart.y + dy;
      newCrop.h = activeRatio ? (cropStart.w + dx) / activeRatio : cropStart.h - dy;
    } else if (dragging === "nw") {
      newCrop.x = cropStart.x + dx;
      newCrop.w = cropStart.w - dx;
      newCrop.y = activeRatio ? cropStart.y - ((cropStart.w - dx) / activeRatio - cropStart.h) : cropStart.y + dy;
      newCrop.h = activeRatio ? (cropStart.w - dx) / activeRatio : cropStart.h - dy;
    } else if (dragging === "n") {
      if (activeRatio) {
        newCrop.h = cropStart.h - dy;
        newCrop.y = cropStart.y + dy;
        newCrop.w = newCrop.h * activeRatio;
        newCrop.x = cropStart.x - (newCrop.w - cropStart.w) / 2;
      } else {
        newCrop.y = cropStart.y + dy;
        newCrop.h = cropStart.h - dy;
      }
    } else if (dragging === "s") {
      if (activeRatio) {
        newCrop.h = cropStart.h + dy;
        newCrop.w = newCrop.h * activeRatio;
        newCrop.x = cropStart.x - (newCrop.w - cropStart.w) / 2;
      } else {
        newCrop.h = cropStart.h + dy;
      }
    } else if (dragging === "w") {
      if (activeRatio) {
        newCrop.w = cropStart.w - dx;
        newCrop.x = cropStart.x + dx;
        newCrop.h = newCrop.w / activeRatio;
        newCrop.y = cropStart.y - (newCrop.h - cropStart.h) / 2;
      } else {
        newCrop.x = cropStart.x + dx;
        newCrop.w = cropStart.w - dx;
      }
    } else if (dragging === "e") {
      if (activeRatio) {
        newCrop.w = cropStart.w + dx;
        newCrop.h = newCrop.w / activeRatio;
        newCrop.y = cropStart.y - (newCrop.h - cropStart.h) / 2;
      } else {
        newCrop.w = cropStart.w + dx;
      }
    }

    setCrop(clampCrop(newCrop));
  };

  const onMouseUp = () => {
    setDragging(null);
  };

  const handleRatioChange = (ratio: number | null) => {
    setActiveRatio(ratio);
    setCrop(applyRatio(crop, ratio));
  };

  const handleManualW = (val: string) => {
    setManualW(val);
    const px = parseInt(val, 10);
    if (!px || px <= 0) return;
    const displayPx = Math.min(px * scale, displayW);
    let newCrop = { ...crop, w: Math.round(displayPx) };
    if (activeRatio) {
      newCrop.h = Math.round(displayPx / activeRatio);
    }
    setCrop(clampCrop(newCrop));
  };

  const handleManualH = (val: string) => {
    setManualH(val);
    const px = parseInt(val, 10);
    if (!px || px <= 0) return;
    const displayPx = Math.min(px * scale, displayH);
    let newCrop = { ...crop, h: Math.round(displayPx) };
    if (activeRatio) {
      newCrop.w = Math.round(displayPx * activeRatio);
    }
    setCrop(clampCrop(newCrop));
  };

  const doCrop = async () => {
    if (!imageRef.current) return;

    if (!isPro && user) {
      const res = await fetch("/api/usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, toolSlug: TOOL_SLUG, action: "record" }),
      });
      const data = await res.json();
      if (!data.allowed) {
        window.location.href = "/pricing";
        return;
      }
      setUsage(data.usage || usage + 1);
    }

    const offscreen = document.createElement("canvas");
    const realX = Math.round(crop.x / scale);
    const realY = Math.round(crop.y / scale);
    const realW = Math.round(crop.w / scale);
    const realH = Math.round(crop.h / scale);
    offscreen.width = realW;
    offscreen.height = realH;
    const octx = offscreen.getContext("2d");
    if (!octx) return;
    octx.drawImage(imageRef.current, realX, realY, realW, realH, 0, 0, realW, realH);
    const mime = outputFormat === "jpeg" ? "image/jpeg" : "image/png";
    const url = offscreen.toDataURL(mime, 0.92);
    setCroppedUrl(url);
  };

  const downloadCropped = () => {
    if (!croppedUrl) return;
    const ext = outputFormat === "jpeg" ? "jpg" : "png";
    const a = document.createElement("a");
    a.href = croppedUrl;
    a.download = `${fileName}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetTool = () => {
    setImageSrc(null);
    setImageLoaded(false);
    setCroppedUrl(null);
    setNaturalW(0);
    setNaturalH(0);
    setActiveRatio(null);
    setManualW("");
    setManualH("");
    imageRef.current = null;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) loadImage(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadImage(file);
  };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    btnOutline: { background: "#fff", color: "#0D9488", border: "2px solid #0D9488", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none" } as const,
    inputSm: { border: "1px solid #E7E5E4", borderRadius: 6, padding: "8px 10px", fontSize: 13, outline: "none", width: 80 } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema
        name="Image Cropper"
        description="Crop images online with preset aspect ratios or custom dimensions. Free, fast, and private — all processing happens in your browser."
        slug="image-cropper"
        category="ImageObject"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Image Tools", url: "https://toolcraftkit.com/#image-tools" },
          { name: "Image Cropper", url: "https://toolcraftkit.com/tools/image-cropper" },
        ]}
      />
      <h1 style={s.h1}>Image Cropper</h1>
      <p style={s.sub}>Crop images with preset ratios or custom dimensions. Fast, free, and private.</p>

      <UsageBanner toolSlug={TOOL_SLUG} usage={usage} limit={limit} period={period} />

      {/* Upload area */}
      {!imageLoaded && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onClick={() => fileInputRef.current?.click()}
          style={{
            ...s.card,
            border: isDragOver ? "2px dashed #0D9488" : "2px dashed #E7E5E4",
            background: isDragOver ? "#f0fdfa" : "#FAFAF9",
            textAlign: "center",
            padding: "60px 20px",
            cursor: "pointer",
            transition: "border-color 0.2s, background 0.2s",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12, color: "#78716C" }}>&#128247;</div>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#1C1917", marginBottom: 6 }}>Drop an image here or click to upload</p>
          <p style={{ fontSize: 13, color: "#78716C", margin: 0 }}>Supports JPG, PNG, WebP, GIF, BMP</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </div>
      )}

      {/* Crop workspace */}
      {imageLoaded && !croppedUrl && (
        <>
          {/* Aspect ratio buttons */}
          <div style={s.card}>
            <label style={s.label}>Aspect Ratio</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              {ASPECT_RATIOS.map((ar) => (
                <button
                  key={ar.label}
                  onClick={() => handleRatioChange(ar.value)}
                  style={{
                    ...s.btnSm,
                    background: activeRatio === ar.value ? "#0D9488" : "#F5F5F4",
                    color: activeRatio === ar.value ? "#fff" : "#1C1917",
                    border: activeRatio === ar.value ? "1px solid #0D9488" : "1px solid #E7E5E4",
                    fontWeight: activeRatio === ar.value ? 600 : 400,
                  }}
                >
                  {ar.label}
                </button>
              ))}
            </div>

            {/* Manual dimensions */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#1C1917" }}>Crop size (px):</label>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 12, color: "#78716C" }}>W</span>
                <input
                  type="number"
                  value={manualW}
                  onChange={(e) => handleManualW(e.target.value)}
                  style={s.inputSm}
                  min={1}
                />
              </div>
              <span style={{ fontSize: 13, color: "#78716C" }}>x</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 12, color: "#78716C" }}>H</span>
                <input
                  type="number"
                  value={manualH}
                  onChange={(e) => handleManualH(e.target.value)}
                  style={s.inputSm}
                  min={1}
                />
              </div>
            </div>

            {/* Output format */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#1C1917" }}>Format:</label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as "png" | "jpeg")}
                style={{ ...s.inputSm, width: 100, cursor: "pointer" }}
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
              </select>
            </div>

            {/* Image info */}
            <p style={{ fontSize: 12, color: "#78716C", margin: "0 0 8px" }}>
              Original: {naturalW} x {naturalH}px &nbsp;|&nbsp; Crop: {Math.round(crop.w / scale)} x {Math.round(crop.h / scale)}px
            </p>
          </div>

          {/* Canvas area */}
          <div style={s.card} ref={containerRef}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <canvas
                ref={canvasRef}
                width={displayW}
                height={displayH}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                style={{
                  border: "1px solid #E7E5E4",
                  borderRadius: 6,
                  maxWidth: "100%",
                  userSelect: "none",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={doCrop} style={s.btn}>Crop Image</button>
              <button onClick={resetTool} style={s.btnSm}>Upload New Image</button>
            </div>
          </div>
        </>
      )}

      {/* Cropped result */}
      {croppedUrl && (
        <div style={s.card}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Cropped Result</h3>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <img
              src={croppedUrl}
              alt="Cropped result"
              style={{ maxWidth: "100%", maxHeight: 400, border: "1px solid #E7E5E4", borderRadius: 6 }}
            />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={downloadCropped} style={s.btn}>
              Download {outputFormat.toUpperCase()}
            </button>
            <button
              onClick={() => { setCroppedUrl(null); }}
              style={s.btnOutline}
            >
              Adjust Crop
            </button>
            <button onClick={resetTool} style={s.btnSm}>Upload New Image</button>
          </div>
        </div>
      )}

      {/* About section */}
      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>Crop images instantly with an interactive selection tool. Choose preset aspect ratios for social media, presentations, or prints, or drag to select any custom area. Supports PNG and JPEG output.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Everything runs in your browser using the Canvas API. No images are uploaded to any server. Your files stay completely private on your device.</p>
      </div>

      {/* FAQ */}
      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "What image formats can I upload?", a: "You can upload JPG, PNG, WebP, GIF, and BMP images. The cropped result can be downloaded as PNG (lossless) or JPEG (smaller file size)." },
          { q: "Is there a file size limit?", a: "There is no strict limit. Since everything is processed in your browser, very large images (50MP+) may be slower depending on your device." },
          { q: "Are my images uploaded anywhere?", a: "No. All processing happens locally in your browser using the Canvas API. Your images never leave your device." },
          { q: "Can I crop to exact pixel dimensions?", a: "Yes. Use the width and height inputs to set exact pixel dimensions for your crop area. You can also combine this with an aspect ratio lock." },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 4 }}>{faq.q}</h3>
            <p style={{ fontSize: 13, color: "#57534E", lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>
      <SeoContent />
    </div>
  );
}
