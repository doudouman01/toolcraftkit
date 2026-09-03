import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown to HTML: A Quick Guide to Converting Your Content",
  description: "Learn Markdown syntax, why it's used for writing content, and how to convert Markdown to clean HTML instantly with a free online tool.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
    table: { width: "100%", borderCollapse: "collapse" as const, marginBottom: 20, fontSize: 14 },
    th: { padding: "10px 12px", background: "#F5F5F4", textAlign: "left" as const, fontWeight: 600, fontSize: 13, borderBottom: "2px solid #E7E5E4" },
    td: { padding: "10px 12px", borderBottom: "1px solid #F5F5F4" },
    code: { background: "#F5F5F4", padding: "2px 8px", borderRadius: 4, fontSize: 14, fontFamily: "monospace" } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>Markdown to HTML: A Quick Guide to Converting Your Content</h1>
        <p style={s.meta}>September 3, 2026 · 4 min read</p>

        <p style={s.p}>Markdown is the writing format of choice for developers, technical writers, bloggers, and anyone who wants to create formatted content without touching HTML. It is simple to learn, fast to write, and converts cleanly to HTML for any website or platform. If you write content for the web, understanding Markdown will save you hours.</p>

        <h2 style={s.h2}>What Is Markdown?</h2>
        <p style={s.p}>Markdown is a lightweight markup language created by John Gruber in 2004. The idea is simple: use plain text with minimal punctuation to indicate formatting. A line starting with <span style={s.code}>#</span> becomes a heading. Text wrapped in <span style={s.code}>**asterisks**</span> becomes bold. A line starting with <span style={s.code}>-</span> becomes a bullet point. The result is content that is readable in its raw form and converts perfectly to HTML.</p>

        <h2 style={s.h2}>Essential Markdown Syntax</h2>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}>Markdown</th><th style={s.th}>Result</th><th style={s.th}>HTML</th></tr>
          </thead>
          <tbody>
            {[
              ["# Heading 1", "Heading 1", "<h1>"],
              ["## Heading 2", "Heading 2", "<h2>"],
              ["**bold text**", "bold text", "<strong>"],
              ["*italic text*", "italic text", "<em>"],
              ["[Link](url)", "Clickable link", "<a>"],
              ["![Alt](image.jpg)", "Image", "<img>"],
              ["- Item", "Bullet point", "<ul><li>"],
              ["1. Item", "Numbered list", "<ol><li>"],
              ["> Quote", "Blockquote", "<blockquote>"],
              ["`code`", "Inline code", "<code>"],
            ].map(([md, result, html], i) => (
              <tr key={i}><td style={s.td}><span style={s.code}>{md}</span></td><td style={s.td}>{result}</td><td style={s.td}>{html}</td></tr>
            ))}
          </tbody>
        </table>

        <h2 style={s.h2}>Where Markdown Is Used</h2>
        <p style={s.p}><strong>GitHub</strong> — README files, issues, pull requests, and documentation are all written in Markdown. If you work with code, you write Markdown daily.</p>
        <p style={s.p}><strong>Static site generators</strong> — Jekyll, Hugo, Next.js, Gatsby, and most modern web frameworks use Markdown files as the content source for blog posts and documentation.</p>
        <p style={s.p}><strong>Note-taking apps</strong> — Obsidian, Notion, Bear, and many other tools use Markdown or a variant as their native format.</p>
        <p style={s.p}><strong>Technical documentation</strong> — API docs, product docs, and knowledge bases are commonly written in Markdown and converted to HTML for publishing.</p>

        <h2 style={s.h2}>Why Convert Markdown to HTML?</h2>
        <p style={s.p}>While Markdown is great for writing, browsers display HTML. Converting Markdown to HTML is necessary for publishing content on websites, embedding in emails, or integrating with CMS platforms that expect HTML input. The conversion is deterministic — the same Markdown always produces the same HTML — which makes it reliable for automated workflows.</p>

        <h2 style={s.h2}>Tips for Clean Markdown</h2>
        <p style={s.p}><strong>Use blank lines between elements.</strong> Headings, paragraphs, and lists should be separated by blank lines for consistent conversion.</p>
        <p style={s.p}><strong>Be consistent with list markers.</strong> Use either <span style={s.code}>-</span> or <span style={s.code}>*</span> for bullets, not a mix.</p>
        <p style={s.p}><strong>Indent nested content with 2 or 4 spaces.</strong> Consistency matters more than which number you choose.</p>

        <h2 style={s.h2}>Convert Markdown Now</h2>
        <p style={s.p}>Use our free Markdown to HTML Converter to paste your Markdown and get clean, ready-to-use HTML instantly. Includes a live preview so you can see the rendered result as you type.</p>
        <Link href="/tools/markdown-to-html" style={s.cta}>Open Markdown to HTML Converter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Working with text formatting? Our <Link href="/tools/text-case" style={{ color: "#0D9488" }}>Text Case Converter</Link> handles uppercase, lowercase, title case, and more.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
