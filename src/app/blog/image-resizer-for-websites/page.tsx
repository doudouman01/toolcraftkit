import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Resizer for Websites: Optimal Dimensions for Every Page Element",
  description: "Resize images for hero banners, thumbnails, blog posts, and backgrounds. Exact pixel dimensions for common website elements.",
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
        <h1 style={s.h1}>Image Resizer for Websites: Optimal Dimensions for Every Page Element</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Every website element has an ideal image size. A hero banner needs different dimensions than a blog thumbnail. An author avatar needs different dimensions than a product gallery image. Using the right size for each element ensures fast loading and pixel-perfect display across devices.</p>

        <h2 style={s.h2}>Common Website Image Dimensions</h2>
        <p style={s.p}>Hero banner (full-width): 1920 x 600-800px. Blog post featured image: 1200 x 630px (also optimal for social sharing). Blog thumbnail: 400 x 250px. Author avatar: 150 x 150px. Product image: 1000 x 1000px (square for consistency). Background image: 1920 x 1080px. Favicon: 32 x 32px (plus 180 x 180px for Apple touch icon).</p>

        <h2 style={s.h2}>Responsive Image Strategy</h2>
        <p style={s.p}>Modern websites serve different image sizes to different devices. Create three versions of key images: full size for desktop (1920px), medium for tablet (1024px), and small for mobile (640px). Use the HTML srcset attribute or your CMS responsive image features to serve the right size automatically.</p>

        <h2 style={s.h2}>Retina and High-DPI Displays</h2>
        <p style={s.p}>Retina displays have 2x pixel density. An image displayed at 400px wide on a Retina screen should be 800px wide for crisp display. For critical images (logos, hero banners), create 2x versions. For general content images, 1x is usually sufficient — the quality difference is minimal for photographs.</p>

        <h2 style={s.h2}>Performance Impact</h2>
        <p style={s.p}>An image uploaded at 4000x3000 pixels but displayed at 800x600 pixels downloads the full 4000px file — wasting 96% of the data. Resizing before upload is the single most effective image optimization. Combine with compression for maximum speed improvement.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Image Resizer handles this instantly — no signup, no limits.</p>
        <Link href="/tools/image-resizer" style={s.cta}>Open Image Resizer →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>Image Compressor</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
