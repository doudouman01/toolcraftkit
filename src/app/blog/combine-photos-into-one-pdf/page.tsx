import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Combine Multiple Photos into One PDF (Step-by-Step)",
  description: "Merge several photos into a single PDF document. Perfect for portfolios, receipts, assignments, and ID submissions. Free online tool.",
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
        <h1 style={s.h1}>How to Combine Multiple Photos into One PDF (Step-by-Step)</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Combining multiple photos into one PDF is a task that comes up constantly. You photograph several receipts for an expense report. You scan multiple pages of a signed contract. You take photos of handwritten notes. In every case, the end goal is the same: one clean PDF file that contains all images in the right order.</p>

        <h2 style={s.h2}>Why One PDF Is Better Than Multiple Images</h2>
        <p style={s.p}>Sending five separate image files as email attachments is messy. The recipient has to open each one individually, and there is no guaranteed order. A single PDF keeps everything organized, numbered, and easy to navigate.</p>
        <p style={s.p}>Many submission portals — for jobs, visas, insurance claims, and universities — specifically require a single PDF file. Having the ability to quickly combine photos into one PDF saves time and avoids rejection of your submission.</p>

        <h2 style={s.h2}>Step-by-Step Process</h2>
        <p style={s.p}><strong>Step 1 — Prepare your photos.</strong> Make sure they are in the right orientation. If any images are sideways or upside down, rotate them on your phone or computer before uploading.</p>
        <p style={s.p}><strong>Step 2 — Upload all images.</strong> Open the Image to PDF converter and select multiple files at once. JPG, PNG, and WebP are all supported.</p>
        <p style={s.p}><strong>Step 3 — Arrange the order.</strong> Drag images into the correct sequence. The first image becomes page one, the second becomes page two, and so on.</p>
        <p style={s.p}><strong>Step 4 — Convert and download.</strong> Click convert and your multi-page PDF is ready in seconds.</p>

        <h2 style={s.h2}>Common Use Cases</h2>
        <p style={s.p}><strong>Expense reports</strong> — photograph receipts throughout the week, then combine them into one PDF for accounting.</p>
        <p style={s.p}><strong>Portfolio submissions</strong> — artists, photographers, and designers combine work samples into a single professional document.</p>
        <p style={s.p}><strong>ID and visa applications</strong> — merge photos of your passport, utility bills, and bank statements into one organized file.</p>
        <p style={s.p}><strong>School assignments</strong> — combine photos of handwritten work, diagrams, or lab results into one submission document.</p>

        <h2 style={s.h2}>Tips for Better Results</h2>
        <p style={s.p}>Modern phone cameras produce images between 5 and 12 MB each. A 10-photo PDF could easily reach 80 MB without compression. Use our <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>Image Compressor</Link> to reduce each image before combining — this keeps the final PDF manageable without visible quality loss.</p>
        <p style={s.p}>Crop your photos before uploading. Extra background, uneven margins, or fingers at the edges make the final document look unprofessional. A quick crop produces much cleaner results.</p>

        <h2 style={s.h2}>Combine Your Photos Now</h2>
        <p style={s.p}>Our free Image to PDF tool converts multiple photos into a single, organized PDF document. Upload, arrange, and download — no account required.</p>
        <Link href="/tools/image-to-pdf" style={s.cta}>Open Image to PDF →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Need to add pages from existing PDFs? Use our <Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>PDF Merge</Link> tool to combine your new PDF with other documents.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
