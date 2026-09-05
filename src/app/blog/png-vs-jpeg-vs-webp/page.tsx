import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PNG vs JPEG vs WebP: Which Image Format Should You Use?",
  description: "A practical comparison of the three most common image formats. Learn when to use each one for websites, social media, and documents.",
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
        <h1 style={s.h1}>PNG vs JPEG vs WebP: Which Image Format Should You Use?</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Choosing the right image format is one of those decisions that seems trivial but has real consequences. The wrong format can triple your file size, destroy image quality, or remove transparency you needed. Here is a clear, practical guide to the three formats that matter most in 2026.</p>

        <h2 style={s.h2}>JPEG — Best for Photographs</h2>
        <p style={s.p}>JPEG is the standard format for photographs and complex images with gradual color transitions. It uses lossy compression, meaning it removes data that the human eye is unlikely to notice. A well-compressed JPEG can reduce a 10 MB photograph to under 500 KB with minimal visible difference.</p>
        <p style={s.p}><strong>Use JPEG when:</strong> you are working with photographs, product images, backgrounds, or any image with lots of color variation and detail.</p>
        <p style={s.p}><strong>Avoid JPEG when:</strong> you need transparency, sharp text overlays, or logos with solid colors. JPEG compression creates visible artifacts around sharp edges.</p>

        <h2 style={s.h2}>PNG — Best for Graphics and Transparency</h2>
        <p style={s.p}>PNG uses lossless compression, meaning no image data is lost during saving. This makes it ideal for images where every pixel matters: logos, icons, screenshots, text overlays, and any graphic that requires a transparent background.</p>
        <p style={s.p}><strong>Use PNG when:</strong> you need transparency, have text in the image, are working with logos or icons, or need pixel-perfect reproduction.</p>
        <p style={s.p}><strong>Avoid PNG when:</strong> you are saving photographs. A PNG photograph can be 5 to 10 times larger than the same image in JPEG with no visible quality improvement.</p>

        <h2 style={s.h2}>WebP — Best of Both Worlds</h2>
        <p style={s.p}>WebP is a modern format developed by Google that supports both lossy and lossless compression, plus transparency. A WebP image is typically 25 to 35 percent smaller than an equivalent JPEG, and significantly smaller than PNG with transparency.</p>
        <p style={s.p}><strong>Use WebP when:</strong> you are optimizing for web performance. All modern browsers support WebP, and the file size savings directly improve page speed and SEO rankings.</p>
        <p style={s.p}><strong>Avoid WebP when:</strong> you need maximum compatibility with older systems, print workflows, or email clients that may not render WebP correctly.</p>

        <h2 style={s.h2}>Quick Decision Guide</h2>
        <p style={s.p}>Photograph for a website? Use WebP with JPEG as fallback. Logo or icon? Use PNG or SVG. Social media post? Use JPEG or PNG depending on content type. Web performance is critical? Use WebP for everything — the browser support is there.</p>

        <h2 style={s.h2}>Optimize Your Images</h2>
        <p style={s.p}>Whatever format you choose, compression makes it better. Our free Image Compressor handles JPEG, PNG, and WebP — upload, compress, and download optimized files instantly.</p>
        <Link href="/tools/image-compressor" style={s.cta}>Open Image Compressor →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Need specific dimensions for different platforms? Our <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>Image Resizer</Link> sets exact pixel sizes for every use case.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
