import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Convert Images to PDF in Seconds — Free Online Tool",
  description: "Convert JPG, PNG, and other image files to PDF instantly. Free, no signup, no watermarks. Perfect for documents, portfolios, and presentations.",
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
        <h1 style={s.h1}>How to Convert Images to PDF in Seconds — Free Online Tool</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Converting images to PDF is one of the most common file tasks in both professional and personal settings. Whether you need to send a scanned receipt, submit ID photos, share design mockups, or archive photographs, PDF is the universal format that works everywhere — on every device, every operating system, and every email client.</p>

        <h2 style={s.h2}>Why Convert Images to PDF?</h2>
        <p style={s.p}><strong>Universal compatibility</strong> — PDF files open on any device without special software. Unlike JPG or PNG files that may display differently depending on the viewer, a PDF always looks the same.</p>
        <p style={s.p}><strong>Professional presentation</strong> — sending a single PDF with multiple images looks more polished than attaching five separate image files to an email. It shows organization and attention to detail.</p>
        <p style={s.p}><strong>Easier sharing</strong> — one PDF is simpler to upload, email, or print than a folder of individual images. Many forms and portals specifically require PDF uploads.</p>
        <p style={s.p}><strong>Document preservation</strong> — PDFs maintain image quality and layout regardless of how many times the file is shared or transferred.</p>

        <h2 style={s.h2}>How to Convert Images to PDF Online</h2>
        <p style={s.p}><strong>Step 1</strong> — Open the Image to PDF tool and upload your images. You can select multiple files at once — JPG, PNG, WebP, or any common image format.</p>
        <p style={s.p}><strong>Step 2</strong> — Arrange the images in the order you want them to appear in the PDF. Each image becomes one page.</p>
        <p style={s.p}><strong>Step 3</strong> — Click convert and download your PDF immediately. The entire process takes seconds.</p>

        <h2 style={s.h2}>Common Use Cases</h2>
        <p style={s.p}><strong>Receipts and expense reports</strong> — photograph receipts with your phone, convert them to PDF, and submit them to your accounting department in a clean, organized format.</p>
        <p style={s.p}><strong>Portfolio submissions</strong> — artists, photographers, and designers often need to submit work samples as a single PDF. Converting a set of images into one document makes this effortless.</p>
        <p style={s.p}><strong>ID and document uploads</strong> — many government forms, visa applications, and financial institutions require documents in PDF format. Converting a photo of your passport or driver license to PDF meets this requirement instantly.</p>
        <p style={s.p}><strong>Real estate and insurance</strong> — photograph property damage, room layouts, or inspection findings, then convert everything to a single PDF for the claim or listing.</p>

        <h2 style={s.h2}>Pro Tips for Better Results</h2>
        <p style={s.p}>Before converting, make sure your images are the right size. Oversized photos from a modern smartphone can create unnecessarily large PDFs. Use our <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>Image Resizer</Link> to scale them down first.</p>
        <p style={s.p}>If your images are too heavy, compress them before conversion. Our <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>Image Compressor</Link> reduces file size without visible quality loss.</p>
        <p style={s.p}>For text-heavy content like notes or typed pages, consider our <Link href="/tools/text-to-pdf" style={{ color: "#0D9488" }}>Text to PDF</Link> tool instead — it produces cleaner, searchable results.</p>

        <h2 style={s.h2}>Convert Your Images Now</h2>
        <p style={s.p}>Our free Image to PDF tool converts your photos and images into a professional PDF document in seconds. No signup, no watermarks, no file size limits.</p>
        <Link href="/tools/image-to-pdf" style={s.cta}>Open Image to PDF →</Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
