import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Create a PDF Portfolio From Your Images and Photos",
  description: "Build a professional portfolio by converting images to a polished multi-page PDF. For photographers, designers, artists, and architects.",
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
        <h1 style={s.h1}>How to Create a PDF Portfolio From Your Images and Photos</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>A PDF portfolio is the standard format for sharing visual work. Clients, galleries, publishers, and hiring managers expect a single downloadable file they can view on any device. Converting your best images into a clean, professional PDF takes minutes and creates a lasting impression.</p>

        <h2 style={s.h2}>Selecting Work for Your Portfolio</h2>
        <p style={s.p}>Less is more. Choose 15-25 of your strongest pieces rather than including everything. Show range but maintain consistency — wildly different styles suggest an unfocused practice. Order intentionally: start strong, end strong, with your absolute best work in positions 1, 2, and final.</p>

        <h2 style={s.h2}>Image Preparation</h2>
        <p style={s.p}>Resize images to consistent dimensions before creating the PDF. For standard portfolios, 2000px on the longest side provides good quality at reasonable file size. Compress images to reduce the final PDF size — aim for a total PDF under 10 MB for email sharing, under 25 MB for upload portals.</p>

        <h2 style={s.h2}>Layout Considerations</h2>
        <p style={s.p}>One image per page creates impact and avoids visual competition. Use consistent margins and alignment. Include a title page with your name, contact information, and website. Add captions below images with title, medium, dimensions, and year if relevant to your field.</p>

        <h2 style={s.h2}>File Naming and Sharing</h2>
        <p style={s.p}>Name your file professionally: FirstName-LastName-Portfolio-2026.pdf. Include a table of contents for portfolios over 15 pages. Keep the file under email attachment limits. For larger portfolios, host on your website with a download link rather than emailing directly.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Image to PDF handles this instantly — no signup, no limits.</p>
        <Link href="/tools/image-to-pdf" style={s.cta}>Open Image to PDF →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>Image Compressor</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
