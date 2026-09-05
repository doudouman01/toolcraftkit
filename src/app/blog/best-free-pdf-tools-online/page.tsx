import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free PDF Tools Online in 2026: Merge, Convert & Compress",
  description: "A complete roundup of free online PDF tools for merging, converting, compressing, and creating PDFs. No downloads, no signups.",
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
        <h1 style={s.h1}>Best Free PDF Tools Online in 2026: Merge, Convert & Compress</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>PDF tools are among the most searched-for online utilities because everyone encounters PDFs but few people have dedicated PDF software installed. The best free tools work directly in your browser, handle common tasks instantly, and do not require creating an account or uploading files to distant servers.</p>

        <h2 style={s.h2}>PDF Merge</h2>
        <p style={s.p}>Combining multiple PDF files into one is the most common PDF task. Upload your files, arrange the order, and download the merged result. Use cases include assembling reports, combining contract pages, merging scanned documents, and creating submission packages. Our PDF Merge tool handles unlimited files with no size restrictions.</p>

        <h2 style={s.h2}>Image to PDF</h2>
        <p style={s.p}>Converting images to PDF is essential for document submissions, portfolio creation, and archiving. Upload JPG, PNG, or WebP images, arrange them as pages, and download a clean PDF. Each image becomes one page. Perfect for receipts, scanned documents, and photo collections.</p>

        <h2 style={s.h2}>Text to PDF</h2>
        <p style={s.p}>When you have plain text — notes, code, or a quick letter — and need it as a downloadable document, Text to PDF converts instantly. No word processor needed. The result is a clean, formatted PDF with proper margins and font sizing.</p>

        <h2 style={s.h2}>Image Compression for PDFs</h2>
        <p style={s.p}>Large PDFs are almost always caused by embedded images. Before creating a PDF, compress your source images to reduce the final file size. After creating a PDF, if it is still too large for email (25 MB limit), work backward — compress the source images and regenerate. Our Image Compressor handles this step.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free PDF Merge handles this instantly — no signup, no limits.</p>
        <Link href="/tools/pdf-merge" style={s.cta}>Open PDF Merge →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-to-pdf" style={{ color: "#0D9488" }}>Image to PDF</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
