import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WebP vs PNG for Websites: Performance, Quality & Compatibility",
  description: "Should you use WebP or PNG for your website images? Detailed comparison of file size, quality, transparency support, and browser compatibility.",
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
        <h1 style={s.h1}>WebP vs PNG for Websites: Performance, Quality & Compatibility</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>WebP and PNG both support transparency, but the similarities end there. WebP files are 25-35% smaller than PNG with comparable quality. But PNG has universal compatibility and is the standard for print workflows. Choosing between them depends on whether performance or compatibility matters more for your use case.</p>

        <h2 style={s.h2}>File Size Comparison</h2>
        <p style={s.p}>A typical 1000x1000 product image with transparency: PNG = 850 KB, WebP = 320 KB — a 62% reduction. For a product catalog with 200 images, that is 170 MB vs 64 MB in total image weight. The savings compound across every page load for every visitor.</p>

        <h2 style={s.h2}>Quality Comparison</h2>
        <p style={s.p}>Lossless WebP and PNG produce identical visual quality. Lossy WebP introduces subtle compression artifacts similar to JPEG, but at much smaller file sizes. For most web images, lossy WebP at 80% quality is visually indistinguishable from the PNG original while being dramatically smaller.</p>

        <h2 style={s.h2}>Transparency Support</h2>
        <p style={s.p}>Both formats support full alpha transparency. WebP supports both lossless and lossy transparency, while PNG only supports lossless. For web backgrounds and overlays, WebP transparency is sufficient. For design work requiring pixel-perfect transparency, PNG is the safer choice.</p>

        <h2 style={s.h2}>Browser Compatibility</h2>
        <p style={s.p}>All modern browsers support WebP as of 2023. The only holdouts are very old browser versions (IE, old Safari). For websites targeting modern users (95%+ of web traffic), WebP is safe. For maximum compatibility or email clients, PNG remains the universal choice.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Image Compressor handles this instantly — no signup, no limits.</p>
        <Link href="/tools/image-compressor" style={s.cta}>Open Image Compressor →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>Image Resizer</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
