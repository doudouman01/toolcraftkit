import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Scan Documents to PDF With Your Phone (Free Methods)",
  description: "Turn your smartphone into a document scanner. Scan receipts, contracts, and notes as clean PDF files using free apps and tools.",
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
        <h1 style={s.h1}>How to Scan Documents to PDF With Your Phone (Free Methods)</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>You do not need a flatbed scanner anymore. Your smartphone camera, combined with the right technique and tools, produces scan-quality PDF documents in seconds. This works for receipts, signed contracts, handwritten notes, whiteboard photos, and any other paper document you need to digitize.</p>

        <h2 style={s.h2}>Phone Scanning Basics</h2>
        <p style={s.p}>Use good lighting — natural daylight is best. Place the document on a contrasting surface (dark document on light surface or vice versa). Hold your phone directly above the document, parallel to the surface, to avoid perspective distortion. Most phone cameras have a document mode that automatically detects edges and corrects perspective.</p>

        <h2 style={s.h2}>Free Scanner Apps</h2>
        <p style={s.p}>iOS has a built-in scanner in the Notes app and Files app. Android has Google Drive's scan feature. Both automatically detect document edges, correct perspective, enhance contrast, and save as PDF. For more control, apps like Adobe Scan and Microsoft Lens offer additional features like OCR text recognition.</p>

        <h2 style={s.h2}>From Photo to Clean PDF</h2>
        <p style={s.p}>If you already have photos of documents, convert them to PDF using our Image to PDF tool. Upload the photos, arrange them in order, and download a clean multi-page PDF. This is faster than re-scanning and works with any photos already on your phone.</p>

        <h2 style={s.h2}>Tips for Professional Results</h2>
        <p style={s.p}>Flatten the document completely before scanning — curled or folded paper creates shadows and distortion. Remove your fingers from the frame. For multi-page documents, scan each page separately and merge into one PDF afterward. For archival quality, scan at the highest resolution your phone supports.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Image to PDF handles this instantly — no signup, no limits.</p>
        <Link href="/tools/image-to-pdf" style={s.cta}>Open Image to PDF →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>PDF Merge</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
