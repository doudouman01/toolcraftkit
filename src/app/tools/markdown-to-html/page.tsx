"use client";
import { useState, useMemo } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";

function parseMarkdown(md: string) {
  let html = md
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/```(\w*)\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^######\s+(.+)$/gm, "<h6>$1</h6>")
    .replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>")
    .replace(/^####\s+(.+)$/gm, "<h4>$1</h4>")
    .replace(/^###\s+(.+)$/gm, "<h3>$1</h3>")
    .replace(/^##\s+(.+)$/gm, "<h2>$1</h2>")
    .replace(/^#\s+(.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/~~(.+?)~~/g, "<del>$1</del>")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "<img src=\"$2\" alt=\"$1\" />")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href=\"$2\">$1</a>")
    .replace(/^---$/gm, "<hr />")
    .replace(/^>\s+(.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^[-*]\s+(.+)$/gm, "<li>$1</li>")
    .replace(/^\d+\.\s+(.+)$/gm, "<li>$1</li>");
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>\n$1</ul>");
  html = html.split(/\n\n+/).map((block) => {
    const t = block.trim();
    if (!t) return "";
    if (/^<(h[1-6]|ul|ol|li|pre|blockquote|hr|img)/.test(t)) return t;
    return "<p>" + t + "</p>";
  }).join("\n");
  return html;
}

const defaultMd = "# Hello World\n\nThis is a **Markdown to HTML** converter.\n\n## Features\n\n- Real-time preview\n- Supports **bold**, *italic*, and ~~strikethrough~~\n- Code blocks and `inline code`\n\n> This is a blockquote.\n\n---\n\n*Built with ToolCraftKit*";

export default function Page() {
  const [markdown, setMarkdown] = useState(defaultMd);
  const [view, setView] = useState("split");
  const [copied, setCopied] = useState(false);

  const html = useMemo(() => parseMarkdown(markdown), [markdown]);

  const copy = () => { navigator.clipboard.writeText(html); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const download = () => {
    const full = "<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><style>body{font-family:system-ui;max-width:720px;margin:2rem auto;padding:0 1rem;line-height:1.7;color:#1C1917}code{background:#F5F5F4;padding:2px 6px;border-radius:4px}pre{background:#1C1917;color:#F5F5F4;padding:16px;border-radius:8px;overflow-x:auto}pre code{background:none}blockquote{border-left:3px solid #0D9488;margin:0;padding:8px 16px;color:#57534E}hr{border:none;border-top:1px solid #E7E5E4;margin:24px 0}</style></head><body>" + html + "</body></html>";
    const blob = new Blob([full], { type: "text/html" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "document.html"; a.click();
  };

  const s = {
    page: { maxWidth: 960, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    toolbar: { display: "flex" as const, justifyContent: "space-between" as const, alignItems: "center" as const, marginBottom: 12, flexWrap: "wrap" as const, gap: 8 },
    tabs: { display: "flex" as const, gap: 0, borderRadius: 8, overflow: "hidden" as const, border: "1px solid #E7E5E4" },
    tab: (active: boolean) => ({ padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", background: active ? "#0D9488" : "#FAFAF9", color: active ? "#fff" : "#78716C" }) as const,
    textarea: { width: "100%", minHeight: 350, padding: 14, fontSize: 14, fontFamily: "'Courier New', monospace", border: "1px solid #E7E5E4", borderRadius: 8, resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const, lineHeight: 1.6 },
    preview: { minHeight: 350, padding: 14, fontSize: 14, lineHeight: 1.7, border: "1px solid #E7E5E4", borderRadius: 8, background: "#FAFAF9", overflow: "auto" as const, fontFamily: "system-ui" },
    split: { display: "grid", gridTemplateColumns: view === "split" ? "1fr 1fr" : "1fr", gap: 12 } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "8px 14px", fontSize: 13, cursor: "pointer" } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
  };

  const previewCSS = "<style>h1,h2,h3{margin:12px 0 6px;color:#1C1917}p{margin:8px 0}code{background:#F5F5F4;padding:2px 6px;border-radius:4px}pre{background:#1C1917;color:#F5F5F4;padding:16px;border-radius:8px;overflow-x:auto;margin:12px 0}pre code{background:none;color:inherit}blockquote{border-left:3px solid #0D9488;margin:12px 0;padding:8px 16px;color:#57534E}hr{border:none;border-top:1px solid #E7E5E4;margin:16px 0}ul{padding-left:20px;margin:8px 0}li{margin:4px 0}a{color:#0D9488}del{color:#A8A29E}</style>";

  return (
    <div style={s.page}>
      <ToolSchema
        name="Markdown to HTML Converter"
        description="Convert Markdown to clean HTML with live preview. Copy or download the output."
        slug="markdown-to-html"
        category="DeveloperApplication"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Text Tools", url: "https://toolcraftkit.com/#text-tools" },
          { name: "Markdown to HTML Converter", url: "https://toolcraftkit.com/tools/markdown-to-html" },
        ]}
      />
      <h1 style={s.h1}>Markdown to HTML Converter</h1>
      <p style={s.sub}>Convert Markdown to clean HTML in real time. Copy the code or download as a complete HTML file.</p>
      <div style={s.card}>
        <div style={s.toolbar}>
          <div style={s.tabs}>
            <button style={s.tab(view === "split")} onClick={() => setView("split")}>Split</button>
            <button style={s.tab(view === "editor")} onClick={() => setView("editor")}>Editor</button>
            <button style={s.tab(view === "preview")} onClick={() => setView("preview")}>Preview</button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={copy} style={s.btnSm}>{copied ? "Copied" : "Copy HTML"}</button>
            <button onClick={download} style={s.btnSm}>Download .html</button>
          </div>
        </div>
        <div style={s.split}>
          {view !== "preview" && <div><label style={s.label}>Markdown</label><textarea style={s.textarea} value={markdown} onChange={(e) => setMarkdown(e.target.value)} /></div>}
          {view !== "editor" && <div><label style={s.label}>Preview</label><div style={s.preview} dangerouslySetInnerHTML={{ __html: previewCSS + html }} /></div>}
        </div>
      </div>
      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Converter</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>This tool converts Markdown syntax into clean, semantic HTML. It supports headings, bold and italic text, links, images, code blocks, inline code, blockquotes, lists, horizontal rules, and strikethrough text.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Markdown is a lightweight markup language created by John Gruber in 2004. It is widely used for README files, documentation, blogs, forums, and note-taking applications.</p>
      </div>
    </div>
  );
}
