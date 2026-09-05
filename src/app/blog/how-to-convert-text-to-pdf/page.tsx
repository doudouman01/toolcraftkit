import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Convert Text to PDF Online — Simple & Free",
  description: "Turn plain text into a downloadable PDF document instantly. Free online tool with no signup required. Perfect for notes, essays, and quick documents.",
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
        <h1 style={s.h1}>How to Convert Text to PDF Online — Simple & Free</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Sometimes you just need to turn plain text into a PDF. Maybe you have meeting notes, a quick letter, code snippets, or an essay draft that needs to be shared as a document. You do not need Word, Google Docs, or any installed software — a simple online converter handles this in seconds.</p>

        <h2 style={s.h2}>When Text to PDF Is the Right Choice</h2>
        <p style={s.p}><strong>Quick documents</strong> — you have text ready and need a downloadable PDF without formatting overhead. No headers, no templates, just clean text in a professional document.</p>
        <p style={s.p}><strong>Code and technical content</strong> — developers often need to share code snippets, configuration files, or log outputs as documents. Converting text to PDF preserves the exact formatting and line breaks.</p>
        <p style={s.p}><strong>Notes and drafts</strong> — turn your rough notes into a shareable document without opening a word processor. Paste, convert, and send.</p>
        <p style={s.p}><strong>Archiving</strong> — text files can be accidentally edited. Converting important text to PDF creates a fixed, non-editable record that preserves the content exactly as written.</p>

        <h2 style={s.h2}>How It Works</h2>
        <p style={s.p}><strong>Step 1</strong> — Paste or type your text into the converter. There is no character limit — write as much as you need.</p>
        <p style={s.p}><strong>Step 2</strong> — Click convert. The tool formats your text into a clean PDF with proper margins, font size, and page breaks.</p>
        <p style={s.p}><strong>Step 3</strong> — Download your PDF. The file is ready to email, upload, or print.</p>

        <h2 style={s.h2}>Text to PDF vs Other Methods</h2>
        <p style={s.p}>You could open Google Docs, paste your text, and export as PDF. But that requires a Google account, an internet connection to a specific service, and several clicks. A dedicated text-to-PDF tool does the same job with fewer steps and no account requirements.</p>
        <p style={s.p}>You could also use the print dialog and select "Save as PDF." This works but often produces inconsistent results — different margins on different browsers, unexpected page breaks, and headers or footers you did not want.</p>
        <p style={s.p}>A purpose-built converter gives you predictable, clean output every time.</p>

        <h2 style={s.h2}>Pro Tips</h2>
        <p style={s.p}>If your text includes data that needs to be combined with other documents later, convert it to PDF first, then use our <Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>PDF Merge</Link> tool to combine it with other files.</p>
        <p style={s.p}>For visual content like photos or screenshots, use our <Link href="/tools/image-to-pdf" style={{ color: "#0D9488" }}>Image to PDF</Link> converter instead — it handles images natively.</p>

        <h2 style={s.h2}>Convert Your Text Now</h2>
        <p style={s.p}>Our free Text to PDF tool turns any plain text into a clean, downloadable PDF document. No signup, no watermarks — just paste and convert.</p>
        <Link href="/tools/text-to-pdf" style={s.cta}>Open Text to PDF →</Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
