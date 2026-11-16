"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

const SAMPLE = `# Project Report

## Introduction

This is a **sample document** to demonstrate *Markdown to PDF* conversion. It supports various formatting options.

## Key Features

- Headers (H1, H2, H3)
- **Bold** and *italic* text
- Bullet lists and numbered lists
- \`inline code\` formatting
- Code blocks

### Code Example

\`\`\`
function greet(name) {
  return "Hello, " + name;
}
\`\`\`

## Numbered Steps

1. Write your Markdown
2. Preview the output
3. Download as PDF

> This tool runs entirely in your browser. No data is sent to any server.
`;

function parseMarkdownToHtml(md: string): string {
  let html = md;
  // Code blocks
  html = html.replace(/```[\s\S]*?```/g, (match) => {
    const code = match.slice(3, -3).replace(/^\w*\n/, "");
    return `<pre style="background:#1e293b;color:#e2e8f0;padding:12px 16px;border-radius:6px;overflow-x:auto;font-size:13px;line-height:1.5;margin:12px 0"><code>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
  });
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code style="background:#f1f5f9;padding:2px 6px;border-radius:3px;font-size:13px;color:#0f172a">$1</code>');
  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 style="font-size:16px;font-weight:700;color:#1C1917;margin:18px 0 8px">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 style="font-size:20px;font-weight:700;color:#1C1917;margin:24px 0 10px;border-bottom:1px solid #E7E5E4;padding-bottom:6px">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 style="font-size:26px;font-weight:800;color:#0D9488;margin:0 0 16px">$1</h1>');
  // Bold & italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid #0D9488;padding:8px 16px;margin:12px 0;color:#555;background:#f0fdfa;border-radius:0 6px 6px 0">$1</blockquote>');
  // Lists - unordered
  html = html.replace(/^[-*] (.+)$/gm, '<li style="margin:4px 0;color:#374151">$1</li>');
  // Lists - ordered
  html = html.replace(/^\d+\. (.+)$/gm, '<li style="margin:4px 0;color:#374151">$1</li>');
  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li[^>]*>.*<\/li>\n?)+)/g, '<ul style="padding-left:20px;margin:8px 0">$1</ul>');
  // Paragraphs
  html = html.replace(/^(?!<[hupblo]|<\/|<li|<code|<pre|<blockquote)(.+)$/gm, '<p style="margin:8px 0;line-height:1.7;color:#374151;font-size:14px">$1</p>');
  // Clean empty lines
  html = html.replace(/\n{2,}/g, "\n");
  return html;
}

export default function ClientPage() {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const [generating, setGenerating] = useState(false);

  const previewHtml = parseMarkdownToHtml(markdown);

  const generatePdf = async () => {
    setGenerating(true);
    try {
      const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      const regular = await doc.embedFont(StandardFonts.Helvetica);
      const bold = await doc.embedFont(StandardFonts.HelveticaBold);
      const italic = await doc.embedFont(StandardFonts.HelveticaOblique);
      const mono = await doc.embedFont(StandardFonts.Courier);
      const teal = rgb(13 / 255, 148 / 255, 136 / 255);
      const black = rgb(0, 0, 0);
      const gray = rgb(0.35, 0.35, 0.35);

      const pageW = 612;
      const pageH = 792;
      const margin = 50;
      const maxW = pageW - 2 * margin;
      let page = doc.addPage([pageW, pageH]);
      let y = pageH - margin;

      const ensureSpace = (needed: number) => {
        if (y - needed < margin) {
          page = doc.addPage([pageW, pageH]);
          y = pageH - margin;
        }
      };

      const wrapAndDraw = (text: string, font: typeof regular, size: number, color = black, indent = 0) => {
        const words = text.split(" ");
        let line = "";
        for (const w of words) {
          const test = line ? line + " " + w : w;
          if (font.widthOfTextAtSize(test, size) > maxW - indent) {
            ensureSpace(size + 4);
            page.drawText(line, { x: margin + indent, y, size, font, color });
            y -= size + 4;
            line = w;
          } else {
            line = test;
          }
        }
        if (line) {
          ensureSpace(size + 4);
          page.drawText(line, { x: margin + indent, y, size, font, color });
          y -= size + 4;
        }
      };

      const lines = markdown.split("\n");
      let inCodeBlock = false;

      for (const rawLine of lines) {
        if (rawLine.startsWith("```")) {
          inCodeBlock = !inCodeBlock;
          if (inCodeBlock) y -= 4;
          continue;
        }

        if (inCodeBlock) {
          wrapAndDraw(rawLine || " ", mono, 9, gray, 10);
          continue;
        }

        const line = rawLine
          .replace(/\*\*(.+?)\*\*/g, "$1")
          .replace(/\*(.+?)\*/g, "$1")
          .replace(/`([^`]+)`/g, "$1");

        if (rawLine.startsWith("### ")) {
          y -= 8;
          wrapAndDraw(line.replace(/^### /, ""), bold, 13, black);
          y -= 2;
        } else if (rawLine.startsWith("## ")) {
          y -= 10;
          wrapAndDraw(line.replace(/^## /, ""), bold, 15, black);
          ensureSpace(4);
          page.drawLine({ start: { x: margin, y: y + 2 }, end: { x: margin + maxW, y: y + 2 }, thickness: 0.5, color: rgb(0.9, 0.9, 0.9) });
          y -= 4;
        } else if (rawLine.startsWith("# ")) {
          wrapAndDraw(line.replace(/^# /, ""), bold, 20, teal);
          y -= 6;
        } else if (rawLine.startsWith("> ")) {
          wrapAndDraw(line.replace(/^> /, ""), italic, 10, gray, 15);
        } else if (/^[-*] /.test(rawLine)) {
          ensureSpace(14);
          page.drawText("•", { x: margin + 8, y, size: 10, font: regular, color: teal });
          wrapAndDraw(line.replace(/^[-*] /, ""), regular, 10, gray, 20);
        } else if (/^\d+\. /.test(rawLine)) {
          const num = rawLine.match(/^(\d+)\./)?.[1] || "1";
          ensureSpace(14);
          page.drawText(num + ".", { x: margin + 4, y, size: 10, font: bold, color: teal });
          wrapAndDraw(line.replace(/^\d+\. /, ""), regular, 10, gray, 20);
        } else if (line.trim() === "") {
          y -= 8;
        } else {
          const isBold = /\*\*/.test(rawLine);
          const isItalic = /(?<!\*)\*(?!\*)/.test(rawLine);
          const font = isBold ? bold : isItalic ? italic : regular;
          wrapAndDraw(line, font, 10, gray);
        }
      }

      const bytes = await doc.save();
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "markdown-document.pdf"; a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
    setGenerating(false);
  };

  const cardStyle: React.CSSProperties = { background: "#fff", border: "1px solid #E7E5E4", borderRadius: "12px", padding: "20px" };

  return (
    <>
      <ToolSchema name="Markdown to PDF" description="Convert Markdown to PDF with live preview. Supports headers, lists, code blocks." slug="markdown-to-pdf" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "PDF Tools", url: "/#pdf-tools" }, { name: "Markdown to PDF", url: "/tools/markdown-to-pdf" }]} />
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1C1917", marginBottom: "6px" }}>Markdown to PDF</h1>
        <p style={{ color: "#78716C", fontSize: "15px", marginBottom: "16px" }}>Write Markdown, preview it live, and download as a formatted PDF.</p>

        <div style={{ marginBottom: "14px" }}>
          <button onClick={generatePdf} disabled={generating || !markdown.trim()} style={{ padding: "10px 28px", background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "15px", cursor: generating ? "wait" : "pointer" }}>
            {generating ? "Generating..." : "Download PDF"}
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", alignItems: "start" }}>
          <div style={cardStyle}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#78716C", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Markdown</div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              style={{ width: "100%", minHeight: "500px", border: "1px solid #E7E5E4", borderRadius: "8px", padding: "14px", fontSize: "13px", fontFamily: "monospace", lineHeight: "1.6", resize: "vertical", boxSizing: "border-box" }}
              spellCheck={false}
            />
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#78716C", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Preview</div>
            <div
              style={{ minHeight: "500px", padding: "14px", border: "1px solid #E7E5E4", borderRadius: "8px", background: "#FAFAF9", fontSize: "14px", lineHeight: "1.7", overflow: "auto" }}
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        </div>
        <style>{`@media(max-width:768px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;}}`}</style>
      </div>
      <SeoContent />
    </>
  );
}
