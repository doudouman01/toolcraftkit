import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Compression for E-Commerce: Faster Product Pages, More Sales",
  description: "Optimize product images for e-commerce stores. Reduce load times, improve mobile experience, and increase conversion rates with proper image compression.",
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
        <h1 style={s.h1}>Image Compression for E-Commerce: Faster Product Pages, More Sales</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Product page speed directly affects sales. A one-second delay in load time reduces conversions by 7%. For an e-commerce store making $100,000 per month, that is $7,000 in lost revenue from slow pages. Product images are typically the heaviest elements on the page — compressing them is the highest-ROI optimization you can make.</p>

        <h2 style={s.h2}>E-Commerce Image Requirements</h2>
        <p style={s.p}>Product images need to be high enough quality for zoom functionality (usually 1500-2000px on the longest side) but compressed enough for fast loading (under 200KB per image). Most e-commerce platforms serve responsive images, but the source image must be optimized first. Shopify, WooCommerce, and BigCommerce all recommend image optimization.</p>

        <h2 style={s.h2}>The Speed-to-Sales Connection</h2>
        <p style={s.p}>Amazon found that every 100ms of latency costs 1% in sales. Google reports that 53% of mobile visitors abandon sites that take longer than 3 seconds to load. For product pages with 5-10 images, unoptimized photos can easily push load times to 8-10 seconds. Compression brings this under 3 seconds without visible quality loss.</p>

        <h2 style={s.h2}>Format Selection for Products</h2>
        <p style={s.p}>Use JPEG for standard product photos — the best quality-to-size ratio for photographs. Use PNG only when you need transparency (products on white/transparent backgrounds for compositing). Use WebP for the best compression with modern browser support. Many e-commerce platforms now automatically serve WebP with JPEG fallback.</p>

        <h2 style={s.h2}>Batch Processing for Large Catalogs</h2>
        <p style={s.p}>Stores with hundreds or thousands of products need batch compression. Process all product images through a compressor before upload. Set consistent dimensions (e.g., 1500x1500px square for consistency) and quality levels (80-85% JPEG quality). Consistency across your catalog creates a professional shopping experience.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Image Compressor handles this instantly — no signup, no limits.</p>
        <Link href="/tools/image-compressor" style={s.cta}>Open Image Compressor →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>Image Resizer</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
