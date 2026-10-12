"use client";
import { useState, useMemo, useCallback, useRef } from "react";

/* ─── BRAND TOKENS ─── */
const LIGHT = {
  primary: "#0D9488", primaryLight: "#14B8A6",
  bg: "#FAFAF9", surface: "#FFFFFF", surfaceAlt: "#F5F5F4",
  border: "#E7E5E4", text: "#1C1917", textMuted: "#78716C", textLight: "#A8A29E",
  success: "#10B981", danger: "#EF4444",
  inputBg: "#FFFFFF", shadow: "0 1px 3px rgba(0,0,0,0.06)",
};
const DARK = {
  primary: "#2DD4BF", primaryLight: "#5EEAD4",
  bg: "#0C0A09", surface: "#1C1917", surfaceAlt: "#292524",
  border: "#3F3F46", text: "#FAFAF9", textMuted: "#A8A29E", textLight: "#78716C",
  success: "#34D399", danger: "#F87171",
  inputBg: "#292524", shadow: "0 1px 3px rgba(0,0,0,0.3)",
};

/* ─── CUSTOM MARKDOWN PARSER (no external libs) ─── */
function parseMarkdown(md: string): string {
  // Escape HTML
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks (triple backtick)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, _lang, code) =>
    `<pre><code>${code}</code></pre>`
  );

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Headers
  html = html.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
  html = html.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
  html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");

  // Bold + italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Horizontal rule
  html = html.replace(/^---$/gm, "<hr />");

  // Blockquotes
  html = html.replace(/^&gt;\s+(.+)$/gm, "<blockquote>$1</blockquote>");

  // Unordered lists
  html = html.replace(/^[-*]\s+(.+)$/gm, "<li>$1</li>");

  // Ordered lists
  html = html.replace(/^\d+\.\s+(.+)$/gm, "<li>$1</li>");

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>\n$1</ul>");

  // Paragraphs
  html = html
    .split(/\n\n+/)
    .map((block) => {
      const t = block.trim();
      if (!t) return "";
      if (/^<(h[1-6]|ul|ol|li|pre|blockquote|hr)/.test(t)) return t;
      return "<p>" + t + "</p>";
    })
    .join("\n");

  return html;
}

/* ─── DEFAULT SAMPLE ─── */
const defaultMarkdown = `# Welcome to Markdown Editor

Write **Markdown** on the left and see the *live preview* on the right.

## Features

- **Bold** text with \`**text**\`
- *Italic* text with \`*text*\`
- [Links](https://toolcraftkit.com) with \`[text](url)\`
- Inline \`code\` with backticks

## Code Block

\`\`\`js
function greet(name) {
  return "Hello, " + name + "!";
}
\`\`\`

## Blockquote

> Markdown is a lightweight markup language that you can use to add formatting to plain text documents.

## Lists

1. First ordered item
2. Second ordered item
3. Third ordered item

---

*Built with [ToolCraftKit](https://toolcraftkit.com)*`;

/* ─── FAQ ITEM ─── */
function FAQItem({ q, a, theme }: { q: string; a: string; theme: typeof LIGHT }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${theme.border}`, padding: "13px 0" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: 0, textAlign: "left",
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, lineHeight: 1.4, paddingRight: 16 }}>{q}</span>
        <span style={{
          fontSize: 18, color: theme.textMuted, flexShrink: 0,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease", lineHeight: 1,
        }}>+</span>
      </button>
      {open && <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.65, marginTop: 10, marginBottom: 0, paddingRight: 30 }}>{a}</p>}
    </div>
  );
}

/* ─── SEO CONTENT ─── */
function SeoContent({ theme }: { theme: typeof LIGHT }) {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>
        What Is a Markdown Editor?
      </h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>
        A Markdown editor lets you write using lightweight Markdown syntax and instantly see the formatted result. Unlike rich-text editors, Markdown keeps your content as plain text, making it portable across platforms, easy to version-control, and simple to convert to HTML, PDF, or other formats.
      </p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>
        Why Use Markdown for Writing?
      </h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>
        Markdown is the standard for README files, technical documentation, blog posts, and note-taking. It is faster to write than HTML, cleaner than WYSIWYG editors, and supported by GitHub, Notion, Obsidian, WordPress, and dozens of other platforms. Learning Markdown once saves time everywhere.
      </p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>
        Common Markdown Syntax
      </h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Headings: # H1, ## H2, ### H3 through ###### H6</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Bold: **text** &mdash; Italic: *text*</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Links: [display text](url) &mdash; Inline code: `code`</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Lists: - item (unordered) or 1. item (ordered)</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Blockquotes: &gt; quoted text</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Code blocks: triple backticks with optional language</li>
      </ul>

      <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: theme.primary, marginBottom: "4px" }}>Related Tools</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: theme.textMuted, margin: 0 }}>
          Need to convert Markdown to clean HTML code? Try our <a href="/tools/markdown-to-html" style={{ color: theme.primary }}>Markdown to HTML Converter</a>. You can also check your content length with the <a href="/tools/word-counter" style={{ color: theme.primary }}>Word Counter</a>.
        </p>
      </div>
    </section>
  );
}

/* ─── TOOLBAR BUTTON DATA ─── */
const toolbarButtons = [
  { label: "Bold", prefix: "**", suffix: "**", placeholder: "bold text" },
  { label: "Italic", prefix: "*", suffix: "*", placeholder: "italic text" },
  { label: "Heading", prefix: "## ", suffix: "", placeholder: "Heading", newline: true },
  { label: "Link", prefix: "[", suffix: "](url)", placeholder: "link text" },
  { label: "Code", prefix: "`", suffix: "`", placeholder: "code" },
  { label: "List", prefix: "- ", suffix: "", placeholder: "List item", newline: true },
  { label: "Quote", prefix: "> ", suffix: "", placeholder: "Quote", newline: true },
];

/* ─── MAIN COMPONENT ─── */
export default function MarkdownEditor() {
  const [dark] = useState(false);
  const theme = dark ? DARK : LIGHT;
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const html = useMemo(() => parseMarkdown(markdown), [markdown]);

  const stats = useMemo(() => {
    const text = markdown;
    const chars = text.length;
    const words = text.trim() ? (text.trim().match(/\S+/g) || []).length : 0;
    return { chars, words };
  }, [markdown]);

  const insertSyntax = useCallback((prefix: string, suffix: string, placeholder: string, newline?: boolean) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = markdown.substring(start, end);
    const text = selected || placeholder;
    const nlPrefix = newline && start > 0 && markdown[start - 1] !== "\n" ? "\n" : "";
    const insert = nlPrefix + prefix + text + suffix;
    const newMd = markdown.substring(0, start) + insert + markdown.substring(end);
    setMarkdown(newMd);
    requestAnimationFrame(() => {
      ta.focus();
      const cursorPos = start + nlPrefix.length + prefix.length;
      ta.selectionStart = cursorPos;
      ta.selectionEnd = cursorPos + text.length;
    });
  }, [markdown]);

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 1500);
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(html);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 1500);
  };

  const previewCSS = `<style>h1,h2,h3,h4,h5,h6{margin:12px 0 6px;color:${theme.text}}p{margin:8px 0;color:${theme.textMuted};line-height:1.7}code{background:${theme.surfaceAlt};padding:2px 6px;border-radius:4px;font-size:13px}pre{background:${dark ? "#0C0A09" : "#1C1917"};color:${dark ? "#FAFAF9" : "#F5F5F4"};padding:16px;border-radius:8px;overflow-x:auto;margin:12px 0}pre code{background:none;color:inherit;padding:0}blockquote{border-left:3px solid ${theme.primary};margin:12px 0;padding:8px 16px;color:${theme.textMuted}}hr{border:none;border-top:1px solid ${theme.border};margin:16px 0}ul,ol{padding-left:20px;margin:8px 0}li{margin:4px 0;color:${theme.textMuted}}a{color:${theme.primary}}strong{color:${theme.text}}</style>`;

  /* ─── STYLES ─── */
  const s = {
    page: { maxWidth: 960, margin: "0 auto", padding: "32px 20px" } as const,
    breadcrumb: { fontSize: 13, color: theme.textMuted, marginBottom: 16, display: "flex", gap: 6, flexWrap: "wrap" as const },
    breadLink: { color: theme.primary, textDecoration: "none" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: theme.text, marginBottom: 4 } as const,
    sub: { fontSize: 14, color: theme.textMuted, marginBottom: 24 } as const,
    card: { background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    toolbar: { display: "flex" as const, flexWrap: "wrap" as const, gap: 6, marginBottom: 12, alignItems: "center" as const },
    toolBtn: { background: theme.surfaceAlt, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: 6, padding: "6px 12px", fontSize: 13, fontWeight: 500, cursor: "pointer", lineHeight: 1.3 } as const,
    actions: { display: "flex" as const, flexWrap: "wrap" as const, gap: 8, marginBottom: 12, justifyContent: "space-between" as const, alignItems: "center" as const },
    btnSm: { background: theme.surfaceAlt, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: 6, padding: "8px 14px", fontSize: 13, cursor: "pointer", fontWeight: 500 } as const,
    btnPrimary: { background: theme.primary, color: "#fff", border: "none", borderRadius: 6, padding: "8px 14px", fontSize: 13, cursor: "pointer", fontWeight: 600 } as const,
    splitWrap: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } as const,
    label: { fontSize: 13, fontWeight: 600, color: theme.text, marginBottom: 6, display: "block" } as const,
    textarea: {
      width: "100%", minHeight: 400, padding: 14, fontSize: 14,
      fontFamily: "'Courier New', monospace", border: `1px solid ${theme.border}`,
      borderRadius: 8, resize: "vertical" as const, outline: "none",
      boxSizing: "border-box" as const, lineHeight: 1.6,
      background: theme.inputBg, color: theme.text,
    },
    preview: {
      minHeight: 400, padding: 14, fontSize: 14, lineHeight: 1.7,
      border: `1px solid ${theme.border}`, borderRadius: 8,
      background: theme.surfaceAlt, overflow: "auto" as const,
      fontFamily: "system-ui",
    },
    stats: { display: "flex" as const, gap: 16, fontSize: 13, color: theme.textMuted, marginTop: 8 },
    faqSection: { maxWidth: 800, margin: "40px auto 0", padding: "0 20px" } as const,
    faqTitle: { fontSize: 20, fontWeight: 700, color: theme.text, marginBottom: 12 } as const,
  };

  return (
    <div style={{ background: theme.bg, minHeight: "100vh" }}>
      <div style={s.page}>
        {/* Breadcrumb */}
        <nav style={s.breadcrumb}>
          <a href="/" style={s.breadLink}>Home</a>
          <span>/</span>
          <a href="/#text-tools" style={s.breadLink}>Text Tools</a>
          <span>/</span>
          <span style={{ color: theme.text }}>Markdown Editor</span>
        </nav>

        <h1 style={s.h1}>Markdown Editor &amp; Previewer</h1>
        <p style={s.sub}>Write Markdown on the left, see the live formatted preview on the right. No signup, no limits.</p>

        <div style={s.card}>
          {/* Toolbar */}
          <div style={s.toolbar}>
            {toolbarButtons.map((btn) => (
              <button
                key={btn.label}
                style={s.toolBtn}
                onClick={() => insertSyntax(btn.prefix, btn.suffix, btn.placeholder, btn.newline)}
                title={`Insert ${btn.label}`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div style={s.actions}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={copyMarkdown} style={s.btnSm}>
                {copiedMd ? "Copied!" : "Copy Markdown"}
              </button>
              <button onClick={copyHtml} style={s.btnPrimary}>
                {copiedHtml ? "Copied!" : "Copy HTML"}
              </button>
            </div>
            <div style={s.stats}>
              <span>{stats.words} word{stats.words !== 1 ? "s" : ""}</span>
              <span>{stats.chars} character{stats.chars !== 1 ? "s" : ""}</span>
            </div>
          </div>

          {/* Split editor + preview */}
          <div style={s.splitWrap} data-md-split>
            <div>
              <label style={s.label}>Markdown</label>
              <textarea
                ref={textareaRef}
                style={s.textarea}
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                spellCheck={false}
              />
            </div>
            <div>
              <label style={s.label}>Preview</label>
              <div style={s.preview} dangerouslySetInnerHTML={{ __html: previewCSS + html }} />
            </div>
          </div>
        </div>

        {/* Responsive stacking via inline style tag */}
        <style>{`@media(max-width:700px){[data-md-split]{grid-template-columns:1fr!important}}`}</style>

        {/* FAQ */}
        <div style={s.faqSection}>
          <h2 style={s.faqTitle}>Frequently Asked Questions</h2>
          <FAQItem
            q="What is Markdown?"
            a="Markdown is a lightweight markup language created by John Gruber in 2004. It lets you format text using simple symbols like # for headings, ** for bold, and * for italic. It is widely used for README files, documentation, blogs, and note-taking apps like Obsidian and Notion."
            theme={theme}
          />
          <FAQItem
            q="What Markdown syntax does this editor support?"
            a="This editor supports headings (# to ######), bold (**text**), italic (*text*), links [text](url), inline code (`code`), fenced code blocks (```), unordered lists (- item), ordered lists (1. item), blockquotes (> text), and horizontal rules (---)."
            theme={theme}
          />
          <FAQItem
            q="Can I copy the HTML output?"
            a="Yes. Click the Copy HTML button to copy the converted HTML to your clipboard. You can paste it directly into any website, blog editor, or email template that accepts HTML code."
            theme={theme}
          />
          <FAQItem
            q="Is this tool free to use?"
            a="Completely free, with no signup, no account, and no usage limits. Everything runs in your browser — your text is never sent to a server."
            theme={theme}
          />
        </div>

        {/* SEO Content */}
        <SeoContent theme={theme} />
      </div>
    </div>
  );
}
