"use client";
import { useState, useRef } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [result, setResult] = useState<{ dataUri: string; base64: string; mimeType: string; fileSize: number; base64Size: number; fileName: string; preview: string } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      const base64 = dataUri.split(",")[1] || "";
      setResult({
        dataUri,
        base64,
        mimeType: file.type,
        fileSize: file.size,
        base64Size: base64.length,
        fileName: file.name,
        preview: dataUri,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
  };

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const cardStyle: React.CSSProperties = { background: "#fff", border: "1px solid #E7E5E4", borderRadius: "12px", padding: "24px", marginBottom: "16px" };
  const btnCopy = (label: string, text: string): React.CSSProperties => ({ padding: "8px 20px", background: copied === label ? "#0D9488" : "#F5F5F4", color: copied === label ? "#fff" : "#1C1917", border: "1px solid #E7E5E4", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: "pointer" });

  return (
    <>
      <ToolSchema name="Image to Base64" description="Convert images to Base64 strings. Copy data URI, see size comparison." slug="image-to-base64" category="DeveloperApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Developer Tools", url: "/#developer-tools" }, { name: "Image to Base64", url: "/tools/image-to-base64" }]} />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1C1917", marginBottom: "6px" }}>{t(`tools./tools/image-to-base64.name`) !== `tools./tools/image-to-base64.name` ? t(`tools./tools/image-to-base64.name`) : "Image to Base64"}</h1>
        <p style={{ color: "#78716C", fontSize: "15px", marginBottom: "28px" }}>Upload an image to get its Base64 encoded string and data URI.</p>

        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          style={{ ...cardStyle, textAlign: "center", padding: "48px 24px", cursor: "pointer", borderStyle: "dashed", borderColor: dragOver ? "#0D9488" : "#E7E5E4", background: dragOver ? "#f0fdfa" : "#FAFAF9" }}
        >
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>&#128444;</div>
          <div style={{ fontWeight: 600, color: "#1C1917", marginBottom: "4px" }}>Drop an image here or click to upload</div>
          <div style={{ fontSize: "13px", color: "#78716C" }}>Supports PNG, JPG, GIF, WebP, SVG, BMP</div>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])} />
        </div>

        {result && (
          <>
            {/* Preview & Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "16px", marginBottom: "16px", alignItems: "start" }}>
              <div style={{ ...cardStyle, padding: "12px", marginBottom: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={result.preview} alt="Preview" style={{ maxWidth: "120px", maxHeight: "120px", borderRadius: "6px", display: "block" }} />
              </div>
              <div style={{ ...cardStyle, marginBottom: 0 }}>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#1C1917", marginBottom: "10px" }}>{result.fileName}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  <div>
                    <div style={{ fontSize: "11px", color: "#78716C", textTransform: "uppercase" }}>MIME Type</div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488" }}>{result.mimeType}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "#78716C", textTransform: "uppercase" }}>File Size</div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#1C1917" }}>{formatBytes(result.fileSize)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "#78716C", textTransform: "uppercase" }}>Base64 Size</div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#1C1917" }}>{formatBytes(result.base64Size)}</div>
                    <div style={{ fontSize: "11px", color: "#78716C" }}>+{((result.base64Size / result.fileSize - 1) * 100).toFixed(0)}% larger</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data URI */}
            <div style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#1C1917" }}>Data URI (with MIME prefix)</div>
                <button onClick={() => copy(result.dataUri, "uri")} style={btnCopy("uri", result.dataUri)}>{copied === "uri" ? toolUI.copied : toolUI.copy}</button>
              </div>
              <textarea readOnly value={result.dataUri} style={{ width: "100%", height: "100px", border: "1px solid #E7E5E4", borderRadius: "8px", padding: "10px", fontSize: "12px", fontFamily: "monospace", resize: "vertical", boxSizing: "border-box", background: "#FAFAF9", color: "#374151" }} />
            </div>

            {/* Raw Base64 */}
            <div style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#1C1917" }}>Raw Base64 String</div>
                <button onClick={() => copy(result.base64, "raw")} style={btnCopy("raw", result.base64)}>{copied === "raw" ? toolUI.copied : toolUI.copy}</button>
              </div>
              <textarea readOnly value={result.base64} style={{ width: "100%", height: "100px", border: "1px solid #E7E5E4", borderRadius: "8px", padding: "10px", fontSize: "12px", fontFamily: "monospace", resize: "vertical", boxSizing: "border-box", background: "#FAFAF9", color: "#374151" }} />
            </div>

            {/* HTML snippet */}
            <div style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#1C1917" }}>HTML Image Tag</div>
                <button onClick={() => copy(`<img src="${result.dataUri}" alt="" />`, "html")} style={btnCopy("html", "")}>{copied === "html" ? toolUI.copied : toolUI.copy}</button>
              </div>
              <div style={{ background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: "8px", padding: "10px", fontSize: "12px", fontFamily: "monospace", color: "#374151", wordBreak: "break-all" }}>
                {`<img src="${result.dataUri.slice(0, 60)}..." alt="" />`}
              </div>
            </div>
          </>
        )}
      </div>
      <SeoContent />
    </>
  );
}
