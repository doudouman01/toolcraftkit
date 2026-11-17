import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Split PDF Pages Online: Extract & Separate Pages Free",
  description: "Learn how to split PDF files into individual pages or sections online for free. Discover use cases for PDF splitting and step-by-step instructions.",
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
        <h1 style={s.h1}>How to Split PDF Pages Online: Extract & Separate Pages Free</h1>
        <p style={s.meta}>November 2026 · 5 min read</p>

        <p style={s.p}>PDF files are great for sharing complete documents, but sometimes you only need a few pages from a larger file. Whether you&apos;re extracting a single invoice from a batch, pulling out specific chapters from an ebook, or separating a multi-page scan into individual documents, splitting a PDF is a task that comes up more often than you&apos;d expect.</p>

        <h2 style={s.h2}>Common Reasons to Split a PDF</h2>
        <p style={s.p}>Businesses frequently need to split PDFs for record-keeping — extracting individual invoices, receipts, or contracts from consolidated files. Students split textbook chapters to create focused study materials. Real estate agents pull specific pages from lengthy disclosure packets. Lawyers extract relevant exhibits from large case files. In each case, splitting keeps files manageable and makes sharing specific information easier without sending an entire document.</p>

        <h2 style={s.h2}>Split by Page Range vs Individual Pages</h2>
        <p style={s.p}>There are two main approaches to splitting. Page range extraction lets you pull out a continuous section — for example, pages 5 through 12 from a 50-page report. This is ideal for extracting chapters, sections, or specific forms. Individual page splitting breaks every page into its own separate PDF file. This works well when processing scanned documents where each page is a different record, or when you need to reorganize pages into new groupings.</p>

        <h2 style={s.h2}>Why Online Splitting Is the Best Option</h2>
        <p style={s.p}>Desktop PDF editors like Adobe Acrobat can split files, but they require expensive subscriptions and software installation. Online tools handle the same task for free, right in your browser. The best online splitters process files locally — meaning your document never leaves your computer. This matters especially when working with sensitive files like financial records, legal documents, or medical forms. No upload means no privacy risk.</p>

        <h2 style={s.h2}>How to Split Your PDF in Three Steps</h2>
        <p style={s.p}>Using our <Link href="/tools/pdf-split" style={{ color: "#0D9488" }}>PDF Split</Link> tool, the process takes seconds. First, drag and drop your PDF file into the tool. Second, select the pages or page ranges you want to extract. Third, click split and download your new PDF files. The original file stays untouched, and you get clean, properly formatted output files ready to share or archive.</p>

        <h2 style={s.h2}>After Splitting: What&apos;s Next</h2>
        <p style={s.p}>Once you&apos;ve split your PDF, you might need to combine some of those pages with other documents. Our <Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>PDF Merge</Link> tool lets you join multiple PDFs into one file. If the resulting files are too large for email, the <Link href="/tools/pdf-compressor" style={{ color: "#0D9488" }}>PDF Compressor</Link> can reduce their size without visible quality loss.</p>
        <Link href="/tools/pdf-split" style={s.cta}>Open PDF Splitter →</Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
