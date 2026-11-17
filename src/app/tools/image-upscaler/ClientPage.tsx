"use client";
import { useState, useRef, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

const TOOL_SLUG = "image-upscaler";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const { user, isPro } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [scale, setScale] = useState<number>(2);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setError(""); setResult("");
    if (!f.type.startsWith("image/")) { setError("Please select an image file."); return; }
    if (f.size > MAX_FILE_SIZE) { setError("File is too large. Maximum size is 10 MB."); return; }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  }, []);

  const handleUpscale = async () => {
    if (!file || !preview) return;
    if (!user) { setError("Please sign in to use this tool."); return; }
    setIsProcessing(true); setError(""); setResult("");
    try {
      const res = await fetch("/api/upscale-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: preview, scale, userId: user.id }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.error === "limit_reached") { window.location.href = "/pricing"; return; }
        throw new Error(data.message || data.debug || "Failed to upscale image.");
      }
      const data = await res.json();
      if (data.status === "processing") {
        // Poll for result
        let attempts = 0;
        while (attempts < 60) {
          await new Promise(r => setTimeout(r, 3000));
          const poll = await fetch("/api/upscale-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "status", predictionId: data.predictionId }),
          });
          const pollData = await poll.json();
          if (pollData.status === "succeeded") { setResult(pollData.output); break; }
          if (pollData.status === "failed") throw new Error(pollData.message || "Upscaling failed. Please try again.");
          attempts++;
        }
        if (!result && attempts >= 60) throw new Error("Processing timed out. Please try again.");
      } else if (data.output) {
        setResult(data.output);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upscale image.");
    } finally { setIsProcessing(false); }
  };

  const handleDownload = async () => {
    if (!result) return;
    try {
      const res = await fetch(result);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = (file?.name || "image").replace(/\.[^.]+$/, "") + `-${scale}x.png`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch { setError("Failed to download. Try right-clicking the image."); }
  };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 } as const,
    btnOutline: { background: "#fff", color: "#0D9488", border: "2px solid #0D9488", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Image Upscaler" description="Upscale images 2x or 4x with AI. Enhance resolution without losing quality." slug="image-upscaler" category="WebApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Image Tools", url: "https://toolcraftkit.com/#image-tools" }, { name: "Image Upscaler", url: "https://toolcraftkit.com/tools/image-upscaler" }]} />
      <h1 style={s.h1}>{t(`tools./tools/image-upscaler.name`) !== `tools./tools/image-upscaler.name` ? t(`tools./tools/image-upscaler.name`) : "Image Upscaler"}</h1>
      <p style={s.sub}>{t(`tools./tools/image-upscaler.desc`) !== `tools./tools/image-upscaler.desc` ? t(`tools./tools/image-upscaler.desc`) : "Enhance image resolution 2x or 4x with AI. No quality loss."}</p>
      <UsageBanner toolSlug={TOOL_SLUG} usage={0} limit={3} period="month" />
      <div style={s.card}>
        {!result ? (
          <>
            <div onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }} onClick={() => fileInputRef.current?.click()} style={{ border: isDragging ? "2px solid #0D9488" : "2px dashed #D6D3D1", borderRadius: 12, padding: "48px 24px", textAlign: "center", cursor: "pointer", background: isDragging ? "#f0fdfa" : "#FAFAF9" }}>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); if (fileInputRef.current) fileInputRef.current.value = ""; }} style={{ display: "none" }} />
              <p style={{ fontSize: 15, fontWeight: 600, color: "#1C1917", margin: "0 0 4px" }}>{isDragging ? "Drop your image here" : "Drag & drop your image here"}</p>
              <p style={{ fontSize: 13, color: "#78716C", margin: 0 }}>or click to browse (max 10 MB)</p>
            </div>
            {preview && (
              <>
                <div style={{ marginTop: 16, textAlign: "center" }}><img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 8 }} /><p style={{ fontSize: 13, color: "#78716C", marginTop: 8 }}>{file?.name} ({formatFileSize(file?.size || 0)})</p></div>
                <div style={{ marginTop: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" }}>Scale Factor</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[2, 4].map(s => (
                      <button key={s} onClick={() => setScale(s)} style={{ padding: "8px 20px", borderRadius: 8, border: scale === s ? "2px solid #0D9488" : "1px solid #D6D3D1", background: scale === s ? "#f0fdfa" : "#fff", fontWeight: 600, cursor: "pointer", color: scale === s ? "#0D9488" : "#57534E" }}>{s}x</button>
                    ))}
                  </div>
                </div>
              </>
            )}
            {error && <div style={{ marginTop: 16, padding: "12px 16px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, color: "#DC2626", fontSize: 14 }}>{error}</div>}
            <div style={{ marginTop: 20 }}><button onClick={handleUpscale} disabled={!file || isProcessing} style={{ ...s.btn, opacity: !file || isProcessing ? 0.6 : 1, cursor: !file || isProcessing ? "not-allowed" : "pointer", width: "100%", justifyContent: "center" }}>{isProcessing ? "Upscaling... (this may take a minute)" : `Upscale ${scale}x`}</button></div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#0D9488", marginBottom: 16 }}>Image upscaled {scale}x!</p>
            <img src={result} alt="Upscaled" style={{ maxWidth: "100%", maxHeight: 500, borderRadius: 8 }} />
            <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={handleDownload} style={s.btn}>{toolUI.download}</button>
              <button onClick={() => { setResult(""); setFile(null); setPreview(""); }} style={s.btnOutline}>New Image</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
