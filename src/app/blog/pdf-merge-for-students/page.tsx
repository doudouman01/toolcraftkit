import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Merge Assignment Files into One PDF for Submission",
  description: "Combine essays, diagrams, scanned pages, and references into a single PDF for school submissions. Step-by-step guide for students.",
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
        <h1 style={s.h1}>How to Merge Assignment Files into One PDF for Submission</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Most university submission portals accept one file per assignment. When your work includes a typed essay, hand-drawn diagrams, scanned lab results, and a bibliography, you need to combine everything into a single PDF. This is easier than it sounds — and much better than submitting multiple files and hoping the professor finds them all.</p>

        <h2 style={s.h2}>Common Student Merge Scenarios</h2>
        <p style={s.p}>Typed essay plus scanned hand-drawn figures. Lab report with photographed experiment results. Research paper with appendices from different sources. Group project where each member contributed separate documents. Portfolio submissions combining multiple assignments from the semester.</p>

        <h2 style={s.h2}>Preparing Files for Merging</h2>
        <p style={s.p}>Convert Word documents to PDF before merging (File > Save As > PDF). Scan handwritten pages using your phone's scanner app — most produce PDF output directly. Photograph lab results and convert images to PDF first. Make sure all pages are right-side up and properly oriented before combining.</p>

        <h2 style={s.h2}>Page Order and Organization</h2>
        <p style={s.p}>Check your assignment requirements for the expected order. Typically: title page, table of contents (for longer papers), main content, appendices, bibliography. Number your source files (01-titlepage.pdf, 02-essay.pdf, 03-figures.pdf) before merging to keep the order obvious.</p>

        <h2 style={s.h2}>File Size Considerations</h2>
        <p style={s.p}>Some submission portals limit upload size to 10-50 MB. If your merged PDF is too large, the culprit is usually high-resolution images or scans. Compress images before converting them to PDF, or compress the final merged PDF. Check the size limit before submission day to avoid last-minute panic.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free PDF Merge handles this instantly — no signup, no limits.</p>
        <Link href="/tools/pdf-merge" style={s.cta}>Open PDF Merge →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/text-to-pdf" style={{ color: "#0D9488" }}>Text to PDF</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
