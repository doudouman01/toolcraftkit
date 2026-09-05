import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF vs Word vs Google Docs: Which Format Should You Use?",
  description: "When to use PDF, Word, or Google Docs for your documents. Comparison of compatibility, editing, sharing, and professional use cases.",
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
        <h1 style={s.h1}>PDF vs Word vs Google Docs: Which Format Should You Use?</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Choosing the right document format affects how your work looks, who can open it, and whether recipients can edit it. Each format serves different purposes, and using the wrong one creates frustration for both you and your audience.</p>

        <h2 style={s.h2}>PDF — For Final Documents</h2>
        <p style={s.p}>Use PDF when you want the document to look exactly the same on every device and printer. Contracts, invoices, reports, portfolios, and any document that should not be edited by the recipient. PDFs preserve formatting, fonts, and layout regardless of the viewer's software or operating system.</p>

        <h2 style={s.h2}>Word — For Collaborative Editing</h2>
        <p style={s.p}>Use Word (.docx) when the document will be edited by multiple people using Microsoft Office. Business proposals that need manager review, templates that users fill in, and documents that integrate with corporate workflows. Word is the standard in most corporate environments.</p>

        <h2 style={s.h2}>Google Docs — For Real-Time Collaboration</h2>
        <p style={s.p}>Use Google Docs when multiple people need to edit simultaneously, when you want automatic saving and version history, or when recipients may not have Microsoft Office. Great for internal documents, meeting notes, and collaborative drafts. Less ideal for print-ready documents.</p>

        <h2 style={s.h2}>The Conversion Workflow</h2>
        <p style={s.p}>Create and edit in Google Docs or Word, then export to PDF for final distribution. This gives you the best of both worlds — easy editing during creation and fixed formatting for delivery. Use our Text to PDF for quick conversions of plain text, or PDF Merge to assemble final documents from multiple sources.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Text to PDF handles this instantly — no signup, no limits.</p>
        <Link href="/tools/text-to-pdf" style={s.cta}>Open Text to PDF →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>PDF Merge</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
