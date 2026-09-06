import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Use Markdown for Note-Taking, Documentation & Blogging",
  description: "Learn Markdown syntax for everyday writing. Format notes, documentation, and blog posts with simple text markup that works everywhere.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>How to Use Markdown for Note-Taking, Documentation & Blogging</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Markdown is a lightweight markup language that turns plain text into formatted content. It is faster to write than HTML, more portable than Word documents, and supported by almost every platform — from GitHub and Notion to WordPress and Slack. Once you learn the basics, you will never want to format text any other way.</p>

        <h2 style={s.h2}>Essential Markdown Syntax</h2>
        <p style={s.p}>Headings: # for H1, ## for H2, ### for H3. Bold: **text** or __text__. Italic: *text* or _text_. Links: [display text](url). Images: ![alt text](image-url). Unordered lists: - item or * item. Ordered lists: 1. item. Code: `inline code` or triple backticks for code blocks. Blockquotes: &gt; quoted text. Horizontal rule: ---.</p>

        <h2 style={s.h2}>Markdown for Note-Taking</h2>
        <p style={s.p}>Markdown notes are plain text files that you can open in any editor on any device. They are tiny (a few KB), searchable, and version-controllable with Git. Organize notes with headings, create task lists with - [ ] syntax, and link between notes for a personal knowledge base. Tools like Obsidian and Logseq are built entirely on Markdown.</p>

        <h2 style={s.h2}>Markdown for Documentation</h2>
        <p style={s.p}>Technical documentation thrives in Markdown. README files, API docs, and project wikis all use Markdown on GitHub. The syntax is simple enough for non-technical writers and powerful enough for complex technical content. Code blocks with syntax highlighting are particularly useful for developer documentation.</p>

        <h2 style={s.h2}>Converting to HTML</h2>
        <p style={s.p}>When you need to publish Markdown content on the web, convert it to HTML. Our Markdown to HTML tool handles the conversion instantly — paste Markdown, get clean HTML. This is useful for blog posts, email newsletters, and any content that starts as Markdown but needs to be published as HTML.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Markdown to HTML handles this instantly — no signup, no limits.</p>
        <Link href="/tools/markdown-to-html" style={s.cta}>Open Markdown to HTML →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/word-counter" style={{ color: "#0D9488" }}>Word Counter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
