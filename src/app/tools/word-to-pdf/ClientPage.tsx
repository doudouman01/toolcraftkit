"use client";
import { useState, useEffect } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";

const TOOL_SLUG = "word-to-pdf";

type FormatTag = "bold" | "italic" | "h1" | "h2";

export default function ClientPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const { user, isPro } = useAuth();
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(3);
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

  const insertFormat = (tag: FormatTag) => {
    const markers: Record<FormatTag, [string, string]> = {
      bold: ["**", "**"],
      italic: ["_", "_"],
      h1: ["# ", ""],
      h2: ["## ", ""],
    };
    const [pre, post] = markers[tag];
    setContent((prev) => prev + pre + (tag === "h1" || tag === "h2" ? "Heading\n" : "text" + post));
  };

  const generatePdf = async () => {
    if (!content.trim()) { setError("Please enter some content."); return; }
    if (!user) { setError("Please sign in to use this tool."); return; }
    const allowed = await trackUsage();
    if (!allowed) return;
    setGenerating(true);
    setError("");
    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
      const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
      const fontItalic = await doc.embedFont(StandardFonts.HelveticaOblique);

      const pageWidth = 595.28; // A4
      const pageHeight = 841.89;
      const margin = 50;
      const maxWidth = pageWidth - margin * 2;
      const lineHeight = 16;

      let page = doc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      const addNewPage = () => {
        page = doc.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      };

      const drawText = (text: string, font: typeof fontRegular, size: number, color = rgb(0.1, 0.1, 0.1)) => {
        const words = text.split(" ");
        let line = "";
        const lh = size * 1.4;

        for (const word of words) {
          const testLine = line ? line + " " + word : word;
          const width = font.widthOfTextAtSize(testLine, size);
          if (width > maxWidth && line) {
            if (y < margin + lh) addNewPage();
            page.drawText(line, { x: margin, y, size, font, color });
            y -= lh;
            line = word;
          } else {
            line = testLine;
          }
        }
        if (line) {
          if (y < margin + lh) addNewPage();
          page.drawText(line, { x: margin, y, size, font, color });
          y -= lh;
        }
      };

      // Title
      if (title.trim()) {
        drawText(title.trim(), fontBold, 22, rgb(0.05, 0.05, 0.05));
        y -= 16;
      }

      // Parse content with simple markdown
      const lines = content.split("\n");
      for (const rawLine of lines) {
        const line = rawLine.trimEnd();

        if (!line) {
          y -= lineHeight;
          if (y < margin) addNewPage();
          continue;
        }

        // Heading 1
        if (line.startsWith("# ")) {
          y -= 8;
          drawText(line.slice(2), fontBold, 20, rgb(0.05, 0.05, 0.05));
          y -= 6;
          continue;
        }

        // Heading 2
        if (line.startsWith("## ")) {
          y -= 6;
          drawText(line.slice(3), fontBold, 16, rgb(0.15, 0.15, 0.15));
          y -= 4;
          continue;
        }

        // Process inline formatting
        // Split by bold/italic markers and render segments
        const segments: { text: string; font: typeof fontRegular }[] = [];
        let remaining = line;

        while (remaining.length > 0) {
          const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
          const italicMatch = remaining.match(/_(.+?)_/);

          let firstMatch: { index: number; length: number; text: string; font: typeof fontRegular } | null = null;

          if (boldMatch && boldMatch.index !== undefined) {
            firstMatch = { index: boldMatch.index, length: boldMatch[0].length, text: boldMatch[1], font: fontBold };
          }
          if (italicMatch && italicMatch.index !== undefined) {
            if (!firstMatch || italicMatch.index < firstMatch.index) {
              firstMatch = { index: italicMatch.index, length: italicMatch[0].length, text: italicMatch[1], font: fontItalic };
            }
          }

          if (firstMatch) {
            if (firstMatch.index > 0) {
              segments.push({ text: remaining.slice(0, firstMatch.index), font: fontRegular });
            }
            segments.push({ text: firstMatch.text, font: firstMatch.font });
            remaining = remaining.slice(firstMatch.index + firstMatch.length);
          } else {
            segments.push({ text: remaining, font: fontRegular });
            remaining = "";
          }
        }

        // Draw segments as separate lines (simplified: each segment on its own draw)
        const fullText = segments.map((s) => s.text).join("");
        if (segments.length === 1) {
          drawText(segments[0].text, segments[0].font, 11);
        } else {
          // For mixed formatting, draw the whole line with the dominant font
          // pdf-lib doesn't support mixed fonts on a single line easily
          for (const seg of segments) {
            if (seg.text.trim()) {
              drawText(seg.text, seg.font, 11);
            }
          }
        }
      }

      const bytes = await doc.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = (title.trim() || "document") + ".pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      setError("Error generating PDF: " + (e.message || "Unknown error"));
    }
    setGenerating(false);
  };

  const s = {
    wrap: { maxWidth: "800px", margin: "0 auto", padding: "20px" } as React.CSSProperties,
    h1: { fontSize: "28px", fontWeight: 700, color: "#111827", marginBottom: "8px" } as React.CSSProperties,
    sub: { fontSize: "15px", color: "#6b7280", marginBottom: "24px" } as React.CSSProperties,
    card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", marginBottom: "20px" } as React.CSSProperties,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as React.CSSProperties,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const } as React.CSSProperties,
    textarea: { width: "100%", minHeight: 280, padding: 12, fontSize: 14, fontFamily: "'Courier New', monospace", border: "1px solid #E7E5E4", borderRadius: 8, resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const, lineHeight: 1.6 },
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", padding: "12px 28px", fontSize: "15px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 12px", fontSize: 13, cursor: "pointer", fontWeight: 600 } as React.CSSProperties,
    error: { color: "#dc2626", fontSize: "14px", marginBottom: "16px", padding: "8px 12px", background: "#FEF2F2", borderRadius: "6px" } as React.CSSProperties,
    toolbar: { display: "flex", gap: "6px", marginBottom: "8px", flexWrap: "wrap" as const },
    hint: { fontSize: "12px", color: "#9ca3af", marginTop: "8px", lineHeight: 1.5 } as React.CSSProperties,
  };

  return (
    <div style={s.wrap}>
      <ToolSchema name="Word to PDF" description="Convert text content to PDF documents. Support for bold, italic, and headings." slug="word-to-pdf" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "PDF Tools", url: "https://toolcraftkit.com/#pdf-tools" }, { name: "Word to PDF", url: "https://toolcraftkit.com/tools/word-to-pdf" }]} />

      <h1 style={s.h1}>Word to PDF</h1>
      <p style={s.sub}>Type or paste your content, add formatting, and generate a PDF document. Runs in your browser.</p>
      <UsageBanner toolSlug={TOOL_SLUG} usage={usage} limit={limit} period={period} />

      <div style={s.card}>
        <div style={{ marginBottom: "16px" }}>
          <label style={s.label}>Document Title (optional)</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Document" style={s.input} />
        </div>

        <label style={s.label}>Content</label>
        <div style={s.toolbar}>
          <button style={s.btnSm} onClick={() => insertFormat("h1")} title="Heading 1">H1</button>
          <button style={s.btnSm} onClick={() => insertFormat("h2")} title="Heading 2">H2</button>
          <button style={{ ...s.btnSm, fontWeight: 800 }} onClick={() => insertFormat("bold")} title="Bold">B</button>
          <button style={{ ...s.btnSm, fontStyle: "italic" }} onClick={() => insertFormat("italic")} title="Italic">I</button>
        </div>
        <textarea style={s.textarea} value={content} onChange={(e) => setContent(e.target.value)} placeholder={"# Main Heading\n\nWrite your content here. Use **bold** and _italic_ for emphasis.\n\n## Section Heading\n\nAnother paragraph of text..."} />
        <div style={s.hint}>
          Formatting: # Heading 1, ## Heading 2, **bold text**, _italic text_. Blank lines create paragraphs.
        </div>
      </div>

      {error && <div style={s.error}>{error}</div>}

      <button style={{ ...s.btn, opacity: generating ? 0.6 : 1 }} onClick={generatePdf} disabled={generating}>
        {generating ? "Generating PDF..." : "Generate & Download PDF"}
      </button>

      <SeoContent />
    </div>
  );
}
