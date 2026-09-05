import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Format Text for the Web: Case, Spacing & Readability",
  description: "Format text for websites, emails, and social media. Convert case, clean whitespace, remove duplicates, and improve readability.",
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
        <h1 style={s.h1}>How to Format Text for the Web: Case, Spacing & Readability</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Raw text rarely looks good on the web. It needs formatting — proper capitalization, consistent spacing, clean line breaks, and no duplicate entries. A set of text tools handles these formatting tasks in seconds, turning messy text into polished, web-ready content.</p>

        <h2 style={s.h2}>Capitalization Matters</h2>
        <p style={s.p}>Headings should use Title Case or Sentence case consistently — never mix both on the same page. Body text uses sentence case. Navigation labels should match your design system's convention (most modern sites use sentence case). Email subject lines perform best in sentence case. All-caps should be reserved for short labels and acronyms.</p>

        <h2 style={s.h2}>Cleaning Whitespace</h2>
        <p style={s.p}>Extra spaces between words, tabs mixed with spaces, trailing whitespace at the end of lines — these invisible characters cause formatting issues. They make code indent inconsistently, create uneven text alignment, and can break data imports. Clean whitespace before publishing or importing any text.</p>

        <h2 style={s.h2}>Removing Duplicates</h2>
        <p style={s.p}>When compiling lists — keywords, email addresses, tags, or data entries — duplicates creep in from merging multiple sources. A duplicate remover identifies and strips repeated lines, leaving you with a clean, unique list. Normalize case before deduplicating to catch entries that differ only in capitalization.</p>

        <h2 style={s.h2}>Readability Optimization</h2>
        <p style={s.p}>Break long paragraphs into 2-3 sentence blocks for web reading. Use subheadings every 200-300 words. Keep sentences under 25 words for optimal readability. Front-load important information — web readers scan before committing to read. These formatting choices improve engagement more than the words themselves.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Case Converter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/text-case-converter" style={s.cta}>Open Case Converter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/remove-duplicates" style={{ color: "#0D9488" }}>Remove Duplicates</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
