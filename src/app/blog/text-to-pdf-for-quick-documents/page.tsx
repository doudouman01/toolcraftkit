import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to PDF: Create Quick Documents Without Word Processing Software",
  description: "Convert plain text to clean, formatted PDF documents instantly. No Word, no Google Docs, no signup needed.",
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
        <h1 style={s.h1}>Text to PDF: Create Quick Documents Without Word Processing Software</h1>
        <p style={s.meta}>September 5, 2026 · 3 min read</p>

        <p style={s.p}>Sometimes you need a PDF document and you do not have time — or software — for a full word processor. A quick letter, a set of notes, a code printout, meeting minutes, or a simple report. Text to PDF converters handle these scenarios in seconds, producing clean, professional documents from plain text.</p>

        <h2 style={s.h2}>When Text to PDF Saves Time</h2>
        <p style={s.p}>Writing a quick note to attach to an email. Creating a printable document from notes or messages. Saving code or configuration files as readable documents. Making meeting minutes shareable. Any situation where opening Word or Google Docs is overkill for the task.</p>

        <h2 style={s.h2}>How It Works</h2>
        <p style={s.p}>Type or paste your text, click convert, and download a formatted PDF. The tool adds proper margins, readable font sizing, and page breaks automatically. No formatting decisions needed — the defaults produce a clean, professional result suitable for printing or sharing.</p>

        <h2 style={s.h2}>Formatting Tips</h2>
        <p style={s.p}>Use blank lines to separate paragraphs — the converter respects line breaks. All-caps lines can serve as section headings. Numbered or bulleted lines maintain their structure. For code or monospaced text, some converters offer a code formatting option that preserves indentation and uses a monospaced font.</p>

        <h2 style={s.h2}>When You Need More</h2>
        <p style={s.p}>Text to PDF works for simple, text-focused documents. When you need headers, footers, page numbers, images, or complex formatting, a word processor is the better choice. The value of Text to PDF is speed — when the content is ready and you just need it in PDF format immediately.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Text to PDF handles this instantly — no signup, no limits.</p>
        <Link href="/tools/text-to-pdf" style={s.cta}>Open Text to PDF →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>PDF Merge</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
