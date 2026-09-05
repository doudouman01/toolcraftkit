import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Choose the Right Image Format: JPEG vs PNG vs WebP vs SVG",
  description: "Pick the right image format for every situation. Photos, graphics, icons, and web images explained with file size comparisons.",
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
        <h1 style={s.h1}>How to Choose the Right Image Format: JPEG vs PNG vs WebP vs SVG</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Using the wrong image format wastes bandwidth, degrades quality, or both. A photo saved as PNG is 3-5x larger than it needs to be. A logo saved as JPEG has blurry edges. An icon saved as a raster image looks pixelated on high-DPI screens. Each format has an ideal use case — and choosing correctly is simple once you know the rules.</p>

        <h2 style={s.h2}>JPEG — For Photographs</h2>
        <p style={s.p}>JPEG uses lossy compression optimized for photographs and complex images with gradients and millions of colors. It produces the smallest files for photographic content. Quality setting 80-85% provides excellent visual quality at dramatic file size reduction. Do not use JPEG for text, line art, logos, or anything with sharp edges — compression creates visible artifacts.</p>

        <h2 style={s.h2}>PNG — For Graphics and Transparency</h2>
        <p style={s.p}>PNG uses lossless compression, preserving every pixel exactly. Use it for logos, icons, screenshots, diagrams, and any image with text or sharp edges. PNG supports full transparency (alpha channel), making it essential for images that need to overlay different backgrounds. File sizes are larger than JPEG for photos but smaller for simple graphics.</p>

        <h2 style={s.h2}>WebP — For Web Performance</h2>
        <p style={s.p}>WebP offers both lossy and lossless compression with 25-35% smaller files than JPEG and PNG at comparable quality. It supports transparency and animation. All modern browsers support it. Use WebP as the primary web format with JPEG/PNG fallbacks for maximum compatibility and minimum file size.</p>

        <h2 style={s.h2}>SVG — For Scalable Graphics</h2>
        <p style={s.p}>SVG is a vector format — it scales to any size without quality loss. Perfect for logos, icons, illustrations, and diagrams. SVG files are tiny (often under 5 KB) and can be styled with CSS. Use SVG wherever the image is a graphic (not a photograph) that needs to display at multiple sizes across different screen resolutions.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Image Compressor handles this instantly — no signup, no limits.</p>
        <Link href="/tools/image-compressor" style={s.cta}>Open Image Compressor →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>Image Resizer</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
