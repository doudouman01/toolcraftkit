"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";
import SeoContent from "./SeoContent";

const TOOL_SLUG = "image-format-converter";

type OutputFormat = "png" | "jpeg" | "webp" | "bmp" | "gif";

interface ImageInfo {
  file: File;
  name: string;
  size: number;
  width: number;
  height: number;
  format: string;
  objectUrl: string;
}

interface ConvertedResult {
  blob: Blob;
  objectUrl: string;
  name: string;
  size: number;
  format: OutputFormat;
}

const FORMAT_LABELS: Record<OutputFormat, string> = {
  png: "PNG",
  jpeg: "JPEG",
  webp: "WebP",
  bmp: "BMP",
  gif: "GIF",
};

const ACCEPT_TYPES = ".png,.jpg,.jpeg,.webp,.bmp,.gif,.svg,.avif,.tiff,.tif";

function detectFormat(fileName: string, mimeType: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase() || "";
  const map: Record<string, string> = {
    png: "PNG", jpg: "JPEG", jpeg: "JPEG", webp: "WebP",
    bmp: "BMP", gif: "GIF", svg: "SVG", avif: "AVIF",
    tiff: "TIFF", tif: "TIFF",
  };
  if (map[ext]) return map[ext];
  if (mimeType.includes("png")) return "PNG";
  if (mimeType.includes("jpeg") || mimeType.includes("jpg")) return "JPEG";
  if (mimeType.includes("webp")) return "WebP";
  if (mimeType.includes("bmp")) return "BMP";
  if (mimeType.includes("gif")) return "GIF";
  if (mimeType.includes("svg")) return "SVG";
  if (mimeType.includes("avif")) return "AVIF";
  if (mimeType.includes("tiff")) return "TIFF";
  return ext.toUpperCase() || "Unknown";
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function getMimeType(format: OutputFormat): string {
  const map: Record<OutputFormat, string> = {
    png: "image/png",
    jpeg: "image/jpeg",
    webp: "image/webp",
    bmp: "image/bmp",
    gif: "image/gif",
  };
  return map[format];
}

export default function ClientPage() {
  const { user, isPro } = useAuth();
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [period, setPeriod] = useState("day");
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const [quality, setQuality] = useState(90);
  const [converting, setConverting] = useState(false);
  const [result, setResult] = useState<ConvertedResult | null>(null);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    setError("");
    setResult(null);

    const isSvg = file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg");

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const objectUrl = URL.createObjectURL(file);
        setImageInfo({
          file,
          name: file.name,
          size: file.size,
          width: img.naturalWidth,
          height: img.naturalHeight,
          format: detectFormat(file.name, file.type),
          objectUrl,
        });
      };
      img.onerror = () => {
        setError("Could not read this image file. It may be corrupted or unsupported.");
      };
      if (isSvg) {
        const svgText = e.target?.result as string;
        const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
        img.src = URL.createObjectURL(blob);
      } else {
        img.src = e.target?.result as string;
      }
    };
    reader.onerror = () => {
      setError("Failed to read the file.");
    };
    if (isSvg) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadImage(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      loadImage(file);
    } else if (file) {
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      if (["png", "jpg", "jpeg", "webp", "bmp", "gif", "svg", "avif", "tiff", "tif"].includes(ext)) {
        loadImage(file);
      } else {
        setError("Unsupported file type. Please upload an image file.");
      }
    }
  }, [loadImage]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const convert = async () => {
    if (!imageInfo) return;
    setError("");
    setConverting(true);

    // Usage check for non-Pro users
    if (!isPro && user) {
      try {
        const res = await fetch("/api/usage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, toolSlug: TOOL_SLUG, action: "record" }),
        });
        const data = await res.json();
        if (!data.allowed) {
          setConverting(false);
          window.location.href = "/pricing";
          return;
        }
        setUsage(data.usage || usage + 1);
      } catch {
        setError("Could not verify usage. Please try again.");
        setConverting(false);
        return;
      }
    }

    try {
      // Load image into an HTMLImageElement
      const img = new Image();
      img.crossOrigin = "anonymous";

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image for conversion."));

        const isSvg = imageInfo.format === "SVG";
        if (isSvg) {
          // Read SVG as text, create blob URL
          const reader = new FileReader();
          reader.onload = (e) => {
            const svgText = e.target?.result as string;
            const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
            img.src = URL.createObjectURL(blob);
          };
          reader.onerror = () => reject(new Error("Failed to read SVG file."));
          reader.readAsText(imageInfo.file);
        } else {
          img.src = imageInfo.objectUrl;
        }
      });

      // Draw to canvas
      const canvas = canvasRef.current || document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available.");

      // For JPEG, fill white background (no transparency support)
      if (outputFormat === "jpeg" || outputFormat === "bmp") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      // Convert
      const mime = getMimeType(outputFormat);
      const qualityParam = (outputFormat === "jpeg" || outputFormat === "webp") ? quality / 100 : undefined;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error("Conversion failed. Your browser may not support this output format."));
          },
          mime,
          qualityParam
        );
      });

      const baseName = imageInfo.name.replace(/\.[^.]+$/, "");
      const ext = outputFormat === "jpeg" ? "jpg" : outputFormat;
      const newName = `${baseName}.${ext}`;
      const objectUrl = URL.createObjectURL(blob);

      setResult({
        blob,
        objectUrl,
        name: newName,
        size: blob.size,
        format: outputFormat,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed. Please try again.");
    } finally {
      setConverting(false);
    }
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.objectUrl;
    a.download = result.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    if (imageInfo) URL.revokeObjectURL(imageInfo.objectUrl);
    if (result) URL.revokeObjectURL(result.objectUrl);
    setImageInfo(null);
    setResult(null);
    setError("");
    setOutputFormat("png");
    setQuality(90);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const showQualitySlider = outputFormat === "jpeg" || outputFormat === "webp";

  const sizeDiff = imageInfo && result ? ((result.size - imageInfo.size) / imageInfo.size) * 100 : 0;

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    btnOutline: { background: "#fff", color: "#0D9488", border: "2px solid #0D9488", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema
        name="Image Format Converter"
        description="Convert images between PNG, JPG, WebP, BMP, and GIF formats instantly. Client-side processing, no upload to server."
        slug="image-format-converter"
        category="WebApplication"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Image Tools", url: "https://toolcraftkit.com/#image-tools" },
          { name: "Image Format Converter", url: "https://toolcraftkit.com/tools/image-format-converter" },
        ]}
      />
      <h1 style={s.h1}>Image Format Converter</h1>
      <p style={s.sub}>Convert images between PNG, JPG, WebP, BMP, and GIF. Fast, private, browser-based.</p>

      <UsageBanner toolSlug={TOOL_SLUG} usage={usage} limit={limit} period={period} />

      {/* Hidden canvas for conversion */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Upload area */}
      {!imageInfo && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          style={{
            ...s.card,
            border: dragOver ? "2px dashed #0D9488" : "2px dashed #D6D3D1",
            background: dragOver ? "#f0fdfa" : "#FAFAF9",
            textAlign: "center",
            padding: 48,
            cursor: "pointer",
            transition: "border-color 0.2s, background 0.2s",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12, color: "#0D9488" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#1C1917", marginBottom: 4 }}>
            Drop your image here or click to browse
          </p>
          <p style={{ fontSize: 13, color: "#78716C", margin: 0 }}>
            Supports PNG, JPG, WebP, BMP, GIF, SVG, AVIF, TIFF
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT_TYPES}
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </div>
      )}

      {/* Image preview and controls */}
      {imageInfo && (
        <>
          {/* Source image info */}
          <div style={s.card}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{
                width: 160,
                height: 120,
                borderRadius: 8,
                overflow: "hidden",
                border: "1px solid #E7E5E4",
                background: "#F5F5F4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <img
                  src={imageInfo.objectUrl}
                  alt="Source"
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1C1917", marginBottom: 8, wordBreak: "break-all" }}>
                  {imageInfo.name}
                </h3>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <div>
                    <span style={{ fontSize: 12, color: "#78716C" }}>Format</span>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1C1917" }}>{imageInfo.format}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 12, color: "#78716C" }}>Size</span>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1C1917" }}>{formatBytes(imageInfo.size)}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 12, color: "#78716C" }}>Dimensions</span>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1C1917" }}>{imageInfo.width} x {imageInfo.height} px</div>
                  </div>
                </div>
                <button onClick={reset} style={{ ...s.btnSm, marginTop: 12 }}>
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Conversion settings */}
          <div style={s.card}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Output Settings</h3>

            <label style={s.label}>Output Format</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: showQualitySlider ? 16 : 0 }}>
              {(Object.keys(FORMAT_LABELS) as OutputFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => { setOutputFormat(fmt); setResult(null); }}
                  style={{
                    padding: "8px 18px",
                    fontSize: 14,
                    fontWeight: 600,
                    border: outputFormat === fmt ? "2px solid #0D9488" : "1px solid #E7E5E4",
                    borderRadius: 8,
                    background: outputFormat === fmt ? "#f0fdfa" : "#fff",
                    color: outputFormat === fmt ? "#0D9488" : "#1C1917",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {FORMAT_LABELS[fmt]}
                </button>
              ))}
            </div>

            {showQualitySlider && (
              <div>
                <label style={s.label}>
                  Quality: {quality}%
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 12, color: "#78716C" }}>1</span>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={quality}
                    onChange={(e) => { setQuality(Number(e.target.value)); setResult(null); }}
                    style={{ flex: 1, accentColor: "#0D9488" }}
                  />
                  <span style={{ fontSize: 12, color: "#78716C" }}>100</span>
                </div>
                <p style={{ fontSize: 12, color: "#78716C", marginTop: 4 }}>
                  {quality >= 90 ? "High quality, larger file size" : quality >= 70 ? "Good balance of quality and size" : quality >= 40 ? "Smaller file, some quality loss" : "Very small file, noticeable quality loss"}
                </p>
              </div>
            )}
          </div>

          {/* Convert button */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <button
              onClick={convert}
              disabled={converting}
              style={{
                ...s.btn,
                opacity: converting ? 0.7 : 1,
                cursor: converting ? "not-allowed" : "pointer",
              }}
            >
              {converting ? "Converting..." : `Convert to ${FORMAT_LABELS[outputFormat]}`}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: 8,
              padding: "12px 16px",
              marginBottom: 16,
              fontSize: 14,
              color: "#DC2626",
            }}>
              {error}
            </div>
          )}

          {/* Result */}
          {result && (
            <div style={s.card}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Converted Image</h3>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{
                  width: 160,
                  height: 120,
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "1px solid #E7E5E4",
                  background: "#F5F5F4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <img
                    src={result.objectUrl}
                    alt="Converted"
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 8, wordBreak: "break-all" }}>
                    {result.name}
                  </h4>

                  {/* Size comparison */}
                  <div style={{
                    background: "#FAFAF9",
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 8,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: "#78716C" }}>Original</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#1C1917" }}>{formatBytes(imageInfo.size)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: "#78716C" }}>Converted</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#1C1917" }}>{formatBytes(result.size)}</span>
                    </div>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderTop: "1px solid #E7E5E4",
                      paddingTop: 6,
                    }}>
                      <span style={{ fontSize: 13, color: "#78716C" }}>Difference</span>
                      <span style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: sizeDiff <= 0 ? "#059669" : "#DC2626",
                      }}>
                        {sizeDiff <= 0
                          ? `${Math.abs(sizeDiff).toFixed(1)}% smaller`
                          : `${sizeDiff.toFixed(1)}% larger`
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={download} style={s.btn}>
                  Download {FORMAT_LABELS[result.format]}
                </button>
                <button onClick={() => setResult(null)} style={s.btnOutline}>
                  Convert Again
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* About */}
      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>
          Convert images between PNG, JPEG, WebP, BMP, and GIF formats directly in your browser. Upload any image — including SVG, AVIF, and TIFF — and convert it to your chosen format with adjustable quality settings for JPEG and WebP.
        </p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>
          All processing happens client-side using the Canvas API. Your images are never uploaded to any server. No data is stored, shared, or tracked. Completely private.
        </p>
      </div>

      {/* FAQ */}
      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          {
            q: "Are my images uploaded to a server?",
            a: "No. All conversion happens entirely in your browser using the HTML5 Canvas API. Your images never leave your device.",
          },
          {
            q: "What is the best format for web images?",
            a: "WebP offers the best compression for web use, producing files 25-35% smaller than JPEG at equivalent quality. If browser compatibility is a concern, JPEG is universally supported.",
          },
          {
            q: "Why does my JPEG have a white background instead of transparency?",
            a: "JPEG does not support transparency. When converting from PNG or WebP with transparency, the transparent areas are filled with white. Use PNG or WebP if you need to keep transparency.",
          },
          {
            q: "What quality setting should I use for JPEG or WebP?",
            a: "For photographs, 80-90 gives excellent quality with good compression. For web thumbnails, 60-75 is usually fine. Below 50, quality degradation becomes noticeable.",
          },
          {
            q: "Can I convert SVG files?",
            a: "Yes. SVG files are rendered to the canvas at their native resolution and then converted to the chosen raster format. The result is a static image at the SVG's intrinsic dimensions.",
          },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: i < 4 ? 14 : 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 4 }}>{faq.q}</h3>
            <p style={{ fontSize: 13, color: "#57534E", lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>

      <SeoContent />
    </div>
  );
}
