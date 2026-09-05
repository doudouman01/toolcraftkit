import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free Image Editing Tools Online in 2026 (No Photoshop Needed)",
  description: "Free online tools for compressing, resizing, converting, and optimizing images. Professional results without expensive software.",
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
        <h1 style={s.h1}>Best Free Image Editing Tools Online in 2026 (No Photoshop Needed)</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>You do not need Photoshop for everyday image tasks. Compressing a photo for your website, resizing an image for social media, converting between formats, or generating a color palette — free browser-based tools handle all of these without installing software or paying subscription fees.</p>

        <h2 style={s.h2}>Image Compression</h2>
        <p style={s.p}>Reduce image file sizes by 50-80% without visible quality loss. Essential for website performance, email attachments, and storage optimization. Upload JPEG, PNG, or WebP files and download optimized versions instantly. For websites, aim for images under 200 KB each.</p>

        <h2 style={s.h2}>Image Resizing</h2>
        <p style={s.p}>Set exact pixel dimensions for any use case: social media posts (1080x1080 for Instagram), website headers (1920x600), thumbnails (400x250), or custom sizes. Always resize to the actual display size — uploading a 4000px image displayed at 800px wastes bandwidth.</p>

        <h2 style={s.h2}>Color Tools</h2>
        <p style={s.p}>Extract color palettes from images or generate harmonious schemes from a starting color. Convert between HEX, RGB, HSL, and CMYK formats. Check contrast ratios for accessibility compliance. These tools are essential for web designers, brand managers, and anyone working with visual content.</p>

        <h2 style={s.h2}>Format Conversion</h2>
        <p style={s.p}>Convert between image formats based on your needs. JPEG for photographs, PNG for transparency and graphics, WebP for best web performance. Each format has strengths — using the right one for your content type optimizes both quality and file size.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Image Compressor handles this instantly — no signup, no limits.</p>
        <Link href="/tools/image-compressor" style={s.cta}>Open Image Compressor →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>Image Resizer</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
