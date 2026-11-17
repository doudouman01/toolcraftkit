"use client";
import { useState, useRef, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

export default function ClientPage() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const decode = useCallback(async (file: File) => {
    setResult("");
    setError("");
    setScanning(true);
    setFileName(file.name);

    try {
      const img = new Image();
      const url = URL.createObjectURL(file);
      setPreview(url);
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Could not load image."));
        img.src = url;
      });

      // Try BarcodeDetector API first
      if ("BarcodeDetector" in window) {
        try {
          const detector = new (window as any).BarcodeDetector({ formats: ["qr_code"] });
          const barcodes = await detector.detect(img);
          if (barcodes.length > 0) {
            setResult(barcodes[0].rawValue);
            setScanning(false);
            return;
          }
        } catch {
          // BarcodeDetector failed, fall through to jsQR
        }
      }

      // Fallback: use jsQR library (works in ALL browsers)
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          const jsQR = (await import("jsqr")).default;
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            setResult(code.data);
            setScanning(false);
            return;
          }
        }
      }

      setError("No QR code found in this image. Make sure the QR code is clearly visible and try again.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to process image.");
    }
    setScanning(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) decode(file);
  }, [decode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setResult("");
    setError("");
    setFileName("");
    setPreview("");
    setScanning(false);
  };

  const isUrl = result.startsWith("http://") || result.startsWith("https://");

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "32px 20px 60px" }}>
      <ToolSchema name="QR Code Scanner" description="Upload an image with a QR code and decode it instantly." slug="qr-code-scanner" category="UtilityApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Developer Tools", url: "https://toolcraftkit.com/#developer-tools" }, { name: "QR Code Scanner", url: "https://toolcraftkit.com/tools/qr-code-scanner" }]} />

      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1C1917", marginBottom: 6 }}>QR Code Scanner</h1>
      <p style={{ fontSize: 15, color: "#78716C", marginBottom: 28 }}>Upload an image containing a QR code to decode it.</p>

      {/* Upload area */}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          border: "2px dashed #E7E5E4", borderRadius: 12, padding: "48px 20px",
          textAlign: "center", cursor: "pointer", background: "#FAFAF9",
          transition: "border-color 0.2s",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 8 }}>&#128247;</div>
        <p style={{ fontSize: 15, color: "#78716C", margin: 0 }}>
          {fileName ? fileName : "Click or drag an image here"}
        </p>
        <p style={{ fontSize: 13, color: "#A8A29E", margin: "4px 0 0" }}>PNG, JPG, WebP supported</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) decode(f); if (inputRef.current) inputRef.current.value = ""; }}
        />
      </div>

      {scanning && (
        <div style={{ textAlign: "center", padding: "20px 0", color: "#78716C" }}>Scanning...</div>
      )}

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Preview */}
      {preview && !scanning && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <img src={preview} alt="Uploaded QR" style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 8 }} />
        </div>
      )}

      {error && (
        <div style={{ marginTop: 16, padding: "12px 16px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, color: "#DC2626", fontSize: 14 }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: 20, padding: "16px", background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#0D9488", marginBottom: 6 }}>Decoded Result</div>
          <div style={{ fontSize: 15, color: "#1C1917", wordBreak: "break-all", marginBottom: 12 }}>
            {isUrl ? (
              <a href={result} target="_blank" rel="noopener noreferrer" style={{ color: "#0D9488" }}>{result}</a>
            ) : result}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={handleCopy} style={{
              padding: "8px 16px", fontSize: 13, fontWeight: 600, background: "#0D9488", color: "#fff",
              border: "none", borderRadius: 6, cursor: "pointer",
            }}>
              {copied ? "Copied!" : "Copy"}
            </button>
            {isUrl && (
              <a href={result} target="_blank" rel="noopener noreferrer" style={{
                padding: "8px 16px", fontSize: 13, fontWeight: 600, background: "#fff", color: "#0D9488",
                border: "1px solid #0D9488", borderRadius: 6, textDecoration: "none", display: "inline-block",
              }}>
                Open URL
              </a>
            )}
            <button onClick={handleReset} style={{
              padding: "8px 16px", fontSize: 13, fontWeight: 600, background: "#fff", color: "#78716C",
              border: "1px solid #E7E5E4", borderRadius: 6, cursor: "pointer",
            }}>
              Scan Another
            </button>
          </div>
        </div>
      )}

      <SeoContent />
    </div>
  );
}
