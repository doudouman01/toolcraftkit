"use client";
import { useState, useRef, useEffect } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

const TOOL_SLUG = "heic-to-jpg";

interface ConvertedFile {
  id: string;
  name: string;
  origSize: number;
  newSize: number;
  url: string;
}

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);
  const [converted, setConverted] = useState<ConvertedFile[]>([]);
  const [quality, setQuality] = useState(90);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
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

  const formatSize = (b: number) => b < 1024 ? b + " B" : b < 1048576 ? (b / 1024).toFixed(1) + " KB" : (b / 1048576).toFixed(2) + " MB";

  const addFiles = (fileList: FileList) => {
    const newFiles: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const f = fileList[i];
      if (f.name.match(/\.(heic|heif)$/i) || f.type === "image/heic" || f.type === "image/heif" || f.type.startsWith("image/")) {
        newFiles.push(f);
      }
    }
    if (newFiles.length === 0) { setError("Please select HEIC, HEIF, or image files."); return; }
    setFiles((prev) => [...prev, ...newFiles]);
    setConverted([]);
    setError("");
  };

  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files); };

  const convertAll = async () => {
    if (files.length === 0) return;
    if (!user) { setError("Please sign in to use this tool."); return; }
    const allowed = await trackUsage();
    if (!allowed) return;
    setProcessing(true);
    setError("");
    const results: ConvertedFile[] = [];

    for (const file of files) {
      try {
        const bitmap = await createImageBitmap(file);
        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(bitmap, 0, 0);
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality / 100));
        if (blob) {
          const url = URL.createObjectURL(blob);
          results.push({
            id: Math.random().toString(36).slice(2),
            name: file.name.replace(/\.(heic|heif)$/i, ".jpg").replace(/(\.[^.]+)$/, ".jpg"),
            origSize: file.size,
            newSize: blob.size,
            url,
          });
        } else {
          setError(`Failed to convert ${file.name}`);
        }
      } catch {
        setError(`Could not process ${file.name}. Your browser may not support HEIC decoding natively. Try using Chrome 118+ or Edge 118+.`);
      }
    }
    setConverted(results);
    setProcessing(false);
  };

  const downloadOne = (f: ConvertedFile) => {
    const a = document.createElement("a");
    a.href = f.url;
    a.download = f.name;
    a.click();
  };

  const downloadAll = () => { converted.forEach((f) => downloadOne(f)); };

  const reset = () => { converted.forEach((f) => URL.revokeObjectURL(f.url)); setFiles([]); setConverted([]); setError(""); };

  const s = {
    wrap: { maxWidth: "800px", margin: "0 auto", padding: "20px" } as React.CSSProperties,
    h1: { fontSize: "28px", fontWeight: 700, color: "#111827", marginBottom: "8px" } as React.CSSProperties,
    sub: { fontSize: "15px", color: "#6b7280", marginBottom: "24px" } as React.CSSProperties,
    drop: { border: dragOver ? "2px solid #0D9488" : "2px dashed #d1d5db", borderRadius: "12px", padding: "48px 24px", textAlign: "center" as const, cursor: "pointer", background: dragOver ? "#f0fdfa" : "#fafafa", transition: "all 0.2s", marginBottom: "24px" },
    card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", marginBottom: "20px" } as React.CSSProperties,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as React.CSSProperties,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", padding: "12px 28px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "8px 14px", fontSize: 13, cursor: "pointer" } as React.CSSProperties,
    btnOut: { background: "#fff", color: "#0D9488", border: "2px solid #0D9488", borderRadius: "8px", padding: "10px 24px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    error: { color: "#dc2626", fontSize: "14px", marginBottom: "16px", padding: "8px 12px", background: "#FEF2F2", borderRadius: "6px" } as React.CSSProperties,
    fileRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#f9fafb", borderRadius: "8px", marginBottom: "8px" } as React.CSSProperties,
    success: { background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "12px", padding: "24px", marginBottom: "20px" } as React.CSSProperties,
  };

  return (
    <div style={s.wrap}>
      <ToolSchema name="HEIC to JPG Converter" description="Convert HEIC/HEIF images to JPG format. Free, no upload to server." slug="heic-to-jpg" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Converter Tools", url: "https://toolcraftkit.com/#converter-tools" }, { name: "HEIC to JPG", url: "https://toolcraftkit.com/tools/heic-to-jpg" }]} />

      <h1 style={s.h1}>{t(`tools./tools/heic-to-jpg.name`) !== `tools./tools/heic-to-jpg.name` ? t(`tools./tools/heic-to-jpg.name`) : "HEIC to JPG Converter"}</h1>
      <p style={s.sub}>{t(`tools./tools/heic-to-jpg.desc`) !== `tools./tools/heic-to-jpg.desc` ? t(`tools./tools/heic-to-jpg.desc`) : "Convert HEIC/HEIF images to JPEG. Runs entirely in your browser — nothing is uploaded."}</p>
      <UsageBanner toolSlug={TOOL_SLUG} usage={usage} limit={limit} period={period} />

      <input ref={inputRef} type="file" accept=".heic,.heif,image/*" multiple style={{ display: "none" }} onChange={(e) => e.target.files && addFiles(e.target.files)} />

      {converted.length === 0 && (
        <>
          <div style={s.drop} onClick={() => inputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🖼️</div>
            <div style={{ fontSize: "16px", color: "#374151" }}>Drop HEIC/HEIF files here or click to upload</div>
            <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>Supports multiple files</div>
          </div>

          {files.length > 0 && (
            <div style={s.card}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "12px" }}>{files.length} file{files.length > 1 ? "s" : ""} selected</div>
              {files.map((f, i) => (
                <div key={i} style={s.fileRow}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: "#111827" }}>{f.name}</div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>{formatSize(f.size)}</div>
                  </div>
                  <button style={s.btnSm} onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}>Remove</button>
                </div>
              ))}

              <div style={{ marginTop: "16px", marginBottom: "16px" }}>
                <label style={s.label}>JPEG Quality: {quality}%</label>
                <input type="range" min={1} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} style={{ width: "100%" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#9ca3af" }}><span>1% (smallest)</span><span>100% (best)</span></div>
              </div>

              <button style={s.btn} onClick={convertAll} disabled={processing}>
                {processing ? "Converting..." : `Convert ${files.length} File${files.length > 1 ? "s" : ""} to JPG`}
              </button>
            </div>
          )}
        </>
      )}

      {error && <div style={s.error}>{error}</div>}

      {converted.length > 0 && (
        <div style={s.success}>
          <div style={{ fontSize: "18px", fontWeight: 600, color: "#111827", marginBottom: "16px" }}>Converted {converted.length} file{converted.length > 1 ? "s" : ""} successfully</div>
          {converted.map((f) => (
            <div key={f.id} style={{ ...s.fileRow, marginBottom: "8px" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "#111827" }}>{f.name}</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>{formatSize(f.origSize)} → {formatSize(f.newSize)} ({Math.round((1 - f.newSize / f.origSize) * 100)}% {f.newSize < f.origSize ? "smaller" : "larger"})</div>
              </div>
              <button style={s.btnSm} onClick={() => downloadOne(f)}>{toolUI.download}</button>
            </div>
          ))}
          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            {converted.length > 1 && <button style={s.btn} onClick={downloadAll}>Download All</button>}
            <button style={s.btnOut} onClick={reset}>Start Over</button>
          </div>
        </div>
      )}

      <SeoContent />
    </div>
  );
}
