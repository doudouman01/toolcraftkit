import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Convert JPG to PNG (And When You Should)",
  description: "Convert between JPEG and PNG image formats. Understand when each format is better and how conversion affects quality and file size.",
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
        <h1 style={s.h1}>How to Convert JPG to PNG (And When You Should)</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>JPG and PNG serve different purposes. Converting between them is simple, but knowing when to convert — and when not to — prevents unnecessary quality loss and bloated file sizes. The wrong format choice can make your images look worse and your pages load slower.</p>

        <h2 style={s.h2}>When to Convert JPG to PNG</h2>
        <p style={s.p}>Convert to PNG when you need transparency — a logo on a colored background, a product image for compositing, or an icon with no background. Convert when the image contains sharp text or lines that JPEG compression would blur. Convert when you need pixel-perfect reproduction for screenshots or UI elements.</p>

        <h2 style={s.h2}>When to Keep JPG</h2>
        <p style={s.p}>Keep JPEG for photographs and complex images. A photograph saved as PNG will be 3-10x larger with no visible quality improvement. The human eye cannot distinguish between a well-compressed JPEG and a lossless PNG for photographic content. JPEG is always the better choice for file size efficiency with photos.</p>

        <h2 style={s.h2}>Quality Loss in Conversion</h2>
        <p style={s.p}>Converting JPG to PNG does not restore quality lost during JPEG compression — it just stores the existing quality losslessly. A heavily compressed JPEG converted to PNG will still show JPEG artifacts. Going the other direction, converting PNG to JPG introduces lossy compression. Each round of JPEG compression degrades quality slightly.</p>

        <h2 style={s.h2}>Batch Conversion Tips</h2>
        <p style={s.p}>When converting multiple images, maintain consistent settings. For web use, compress the output files after conversion. For print, preserve maximum quality. Our Image Compressor handles both JPEG and PNG optimization — upload in either format and download optimized results.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Image Compressor handles this instantly — no signup, no limits.</p>
        <Link href="/tools/image-compressor" style={s.cta}>Open Image Compressor →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>Image Resizer</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
