"use client";
import { useState, useRef, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

const TOOL_SLUG = "background-remover";
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

  const handleRemove = async () => {
    if (!file) return;
    if (!user) { setError("Please sign in to use this tool."); return; }
    setIsProcessing(true); setError(""); setResult("");
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", user.id);
      const res = await fetch("/api/remove-background", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.error === "limit_reached") { window.location.href = "/pricing"; return; }
        throw new Error(data.message || "Failed to remove background.");
      }
      const blob = await res.blob();
      setResult(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove background.");
    } finally { setIsProcessing(false); }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = (file?.name || "image").replace(/\.[^.]+$/, "") + "-no-bg.png";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
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
      <ToolSchema name="Background Remover" description="Remove image backgrounds instantly with AI. Transparent PNG output." slug="background-remover" category="WebApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Image Tools", url: "https://toolcraftkit.com/#image-tools" }, { name: "Background Remover", url: "https://toolcraftkit.com/tools/background-remover" }]} />
      <h1 style={s.h1}>{t(`tools./tools/background-remover.name`) !== `tools./tools/background-remover.name` ? t(`tools./tools/background-remover.name`) : "Background Remover"}</h1>
      <p style={s.sub}>{t(`tools./tools/background-remover.desc`) !== `tools./tools/background-remover.desc` ? t(`tools./tools/background-remover.desc`) : "Remove image backgrounds instantly with AI. Get a transparent PNG."}</p>
      <UsageBanner toolSlug={TOOL_SLUG} usage={0} limit={3} period="month" />
      <div style={s.card}>
        {!result ? (
          <>
            <div onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }} onClick={() => fileInputRef.current?.click()} style={{ border: isDragging ? "2px solid #0D9488" : "2px dashed #D6D3D1", borderRadius: 12, padding: "48px 24px", textAlign: "center", cursor: "pointer", background: isDragging ? "#f0fdfa" : "#FAFAF9" }}>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); if (fileInputRef.current) fileInputRef.current.value = ""; }} style={{ display: "none" }} />
              <p style={{ fontSize: 15, fontWeight: 600, color: "#1C1917", margin: "0 0 4px" }}>{isDragging ? "Drop your image here" : "Drag & drop your image here"}</p>
              <p style={{ fontSize: 13, color: "#78716C", margin: 0 }}>or click to browse (max 10 MB)</p>
            </div>
            {preview && <div style={{ marginTop: 16, textAlign: "center" }}><img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 8 }} /><p style={{ fontSize: 13, color: "#78716C", marginTop: 8 }}>{file?.name} ({formatFileSize(file?.size || 0)})</p></div>}
            {error && <div style={{ marginTop: 16, padding: "12px 16px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, color: "#DC2626", fontSize: 14 }}>{error}</div>}
            <div style={{ marginTop: 20 }}><button onClick={handleRemove} disabled={!file || isProcessing} style={{ ...s.btn, opacity: !file || isProcessing ? 0.6 : 1, cursor: !file || isProcessing ? "not-allowed" : "pointer", width: "100%", justifyContent: "center" }}>{isProcessing ? "Removing background..." : "Remove Background"}</button></div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#0D9488", marginBottom: 16 }}>Background removed!</p>
            <div style={{ background: "repeating-conic-gradient(#e5e5e5 0% 25%, white 0% 50%) 50% / 20px 20px", borderRadius: 8, padding: 16, display: "inline-block" }}><img src={result} alt="Result" style={{ maxWidth: "100%", maxHeight: 400 }} /></div>
            <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={handleDownload} style={s.btn}>Download PNG</button>
              <button onClick={() => { setResult(""); setFile(null); setPreview(""); }} style={s.btnOutline}>New Image</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
