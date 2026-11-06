"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";
import SeoContent from "./SeoContent";

const TOOL_SLUG = "pdf-to-word";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function ClientPage() {
  const { user, isPro } = useAuth();
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(3);
  const [period, setPeriod] = useState("month");

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resultFileName, setResultFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Usage is tracked by /api/pdf-to-word directly
  }, [user]);

  const validateFile = (f: File): string | null => {
    if (!f.name.toLowerCase().endsWith(".pdf")) return "Please select a PDF file.";
    if (f.size > MAX_FILE_SIZE) return `File is too large (${formatFileSize(f.size)}). Maximum size is 10 MB.`;
    if (f.size === 0) return "The selected file is empty.";
    return null;
  };

  const handleFile = (f: File) => {
    setError("");
    setSuccess(false);
    setResultFileName("");
    const err = validateFile(f);
    if (err) {
      setError(err);
      setFile(null);
      return;
    }
    setFile(f);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleConvert = async () => {
    if (!file) return;

    if (!user) {
      setError("Please sign in to convert files. Create a free account to get started.");
      return;
    }

    setIsConverting(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", user.id);

      const res = await fetch("/api/pdf-to-word", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const errData = await res.json();
          if (errData.error === "limit_reached") {
            window.location.href = "/pricing";
            return;
          }
          throw new Error(errData.message || errData.error || "Conversion failed. Please try again.");
        }
        if (res.status === 413) throw new Error("File is too large. Maximum size is 10 MB.");
        if (res.status === 415) throw new Error("Invalid file type. Please upload a PDF file.");
        if (res.status === 422) throw new Error("This PDF appears to be image-only or corrupted. Text-based PDFs work best.");
        throw new Error("Conversion failed. Please try again.");
      }

      const blob = await res.blob();
      const outputName = file.name.replace(/\.pdf$/i, ".docx");
      setResultFileName(outputName);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = outputName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setError("");
    setSuccess(false);
    setResultFileName("");
    setIsConverting(false);
  };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 } as const,
    btnOutline: { background: "#fff", color: "#0D9488", border: "2px solid #0D9488", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
  };

  const dropZoneStyle: React.CSSProperties = {
    border: isDragging ? "2px solid #0D9488" : "2px dashed #D6D3D1",
    borderRadius: 12,
    padding: "48px 24px",
    textAlign: "center",
    cursor: "pointer",
    background: isDragging ? "#f0fdfa" : "#FAFAF9",
    transition: "all 0.2s ease",
  };

  return (
    <div style={s.page}>
      <ToolSchema
        name="PDF to Word Converter"
        description="Convert PDF files to editable Word documents (.docx) online for free. Preserves text structure, headings, and formatting."
        slug="pdf-to-word"
        category="WebApplication"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "PDF Tools", url: "https://toolcraftkit.com/#pdf-tools" },
          { name: "PDF to Word Converter", url: "https://toolcraftkit.com/tools/pdf-to-word" },
        ]}
      />
      <h1 style={s.h1}>PDF to Word Converter</h1>
      <p style={s.sub}>Convert PDF files to editable Word documents (.docx) instantly.</p>

      <UsageBanner toolSlug={TOOL_SLUG} usage={usage} limit={limit} period={period} />

      <div style={s.card}>
        {!success ? (
          <>
            {/* Upload Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              style={dropZoneStyle}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleInputChange}
                style={{ display: "none" }}
              />
              <div style={{ fontSize: 40, marginBottom: 12, color: isDragging ? "#0D9488" : "#A8A29E" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#1C1917", margin: "0 0 4px" }}>
                {isDragging ? "Drop your PDF here" : "Drag & drop your PDF here"}
              </p>
              <p style={{ fontSize: 13, color: "#78716C", margin: 0 }}>
                or click to browse your files (max 10 MB)
              </p>
            </div>

            {/* Selected File Info */}
            {file && (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 16,
                padding: "12px 16px",
                background: "#f0fdfa",
                borderRadius: 8,
                border: "1px solid #99f6e4",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", margin: 0 }}>{file.name}</p>
                  <p style={{ fontSize: 12, color: "#78716C", margin: 0 }}>{formatFileSize(file.size)}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null); setError(""); }}
                  style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: 18, padding: 4 }}
                  aria-label="Remove file"
                >
                  &#10005;
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div style={{
                marginTop: 16,
                padding: "12px 16px",
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: 8,
                color: "#DC2626",
                fontSize: 14,
                lineHeight: 1.5,
              }}>
                {error}
              </div>
            )}

            {/* Convert Button */}
            <div style={{ marginTop: 20 }}>
              <button
                onClick={handleConvert}
                disabled={!file || isConverting}
                style={{
                  ...s.btn,
                  opacity: !file || isConverting ? 0.6 : 1,
                  cursor: !file || isConverting ? "not-allowed" : "pointer",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {isConverting ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Converting your PDF...
                  </>
                ) : (
                  "Convert to Word"
                )}
              </button>
            </div>

            {/* Spinner Keyframes */}
            {isConverting && (
              <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            )}
          </>
        ) : (
          /* Success State */
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16, color: "#0D9488" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1C1917", marginBottom: 8 }}>Conversion Complete!</h2>
            <p style={{ fontSize: 14, color: "#57534E", marginBottom: 4 }}>
              Your file has been converted and downloaded.
            </p>
            <p style={{ fontSize: 13, color: "#78716C", marginBottom: 24 }}>
              {resultFileName}
            </p>
            <button onClick={handleReset} style={s.btnOutline}>
              Convert Another PDF
            </button>
          </div>
        )}
      </div>

      {/* About Section */}
      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>
          Convert PDF files to editable Word documents (.docx) in seconds. The converter extracts text, headings, paragraphs, and lists from your PDF and rebuilds them as a properly formatted Word document that you can edit in Microsoft Word, Google Docs, or any compatible word processor.
        </p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>
          Works best with text-based PDFs. Scanned documents or image-only PDFs may produce limited results. Files up to 10 MB are supported. Your files are processed securely and are not stored after conversion.
        </p>
      </div>

      {/* FAQ Section */}
      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          {
            q: "Does the converter preserve my PDF formatting?",
            a: "The converter extracts and preserves text structure including headings, paragraphs, lists, and basic formatting. Complex layouts with multiple columns, embedded images, or intricate tables may require minor manual adjustments after conversion.",
          },
          {
            q: "Can I convert scanned PDFs or image-only PDFs?",
            a: "This tool works best with text-based PDFs (those created from digital documents). Scanned PDFs or image-only PDFs may not produce editable text since they contain images of text rather than actual text data.",
          },
          {
            q: "What is the maximum file size?",
            a: "You can upload PDF files up to 10 MB. For larger files, consider compressing your PDF first using our PDF Compressor tool.",
          },
          {
            q: "Is my file secure?",
            a: "Your files are processed securely on our servers and are automatically deleted after conversion. We do not store, share, or access the contents of your documents.",
          },
          {
            q: "Can I use the converted file in Google Docs?",
            a: "Yes. The output is a standard .docx file that can be opened and edited in Microsoft Word, Google Docs, LibreOffice Writer, Apple Pages, and any other word processor that supports the .docx format.",
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
