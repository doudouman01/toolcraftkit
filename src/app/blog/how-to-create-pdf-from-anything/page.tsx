import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Create a PDF From Anything: Images, Text, Websites & Documents",
  description: "Create PDF files from any source: photos, plain text, web pages, and documents. Step-by-step methods for every scenario.",
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
        <h1 style={s.h1}>How to Create a PDF From Anything: Images, Text, Websites & Documents</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>PDF is the universal document format — it works on every device and preserves formatting perfectly. But creating PDFs from different source types requires different approaches. Here is how to turn any content into a clean PDF.</p>

        <h2 style={s.h2}>From Images</h2>
        <p style={s.p}>Use an Image to PDF converter. Upload photos, screenshots, or scanned pages, arrange them in order, and download a multi-page PDF. Each image becomes one page. Perfect for receipts, handwritten notes, and photo documentation.</p>

        <h2 style={s.h2}>From Plain Text</h2>
        <p style={s.p}>Paste or type your text into a Text to PDF converter. The tool formats it with proper margins, font sizing, and page breaks automatically. No word processor needed. Ideal for quick documents, code snippets, and notes.</p>

        <h2 style={s.h2}>From Web Pages</h2>
        <p style={s.p}>Most browsers can save web pages as PDF using Print > Save as PDF (Ctrl+P or Cmd+P). This captures the page layout as-is. For cleaner results, use the browser's Reader Mode first to strip navigation, ads, and sidebars before saving.</p>

        <h2 style={s.h2}>From Word and Google Docs</h2>
        <p style={s.p}>In Microsoft Word: File > Save As > PDF. In Google Docs: File > Download > PDF. Both produce clean PDFs that preserve formatting, images, and fonts. For best results, check the output — sometimes headers, footers, and page breaks shift during conversion.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Text to PDF handles this instantly — no signup, no limits.</p>
        <Link href="/tools/text-to-pdf" style={s.cta}>Open Text to PDF →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-to-pdf" style={{ color: "#0D9488" }}>Image to PDF</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
