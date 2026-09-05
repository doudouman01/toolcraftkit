import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Compress Images for Website Speed Without Losing Quality",
  description: "Learn why image compression matters for website performance and SEO. Practical guide with best practices for JPEG, PNG, and WebP optimization.",
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
        <h1 style={s.h1}>How to Compress Images for Website Speed Without Losing Quality</h1>
        <p style={s.meta}>September 5, 2026 · 6 min read</p>

        <p style={s.p}>Page speed is a ranking factor. Google has been clear about this since 2018, and the emphasis has only increased with Core Web Vitals. The single biggest factor affecting page speed on most websites is images. Unoptimized images account for 50 to 75 percent of total page weight on the average website. Compressing them is the highest-impact performance improvement most site owners can make.</p>

        <h2 style={s.h2}>Why Image Size Matters for SEO</h2>
        <p style={s.p}>Google measures your page speed and uses it to determine rankings. A page that loads in 2 seconds will consistently outrank an identical page that loads in 5 seconds. For mobile users on slower connections, the difference is even more dramatic.</p>
        <p style={s.p}>Large images also increase bounce rate — visitors leave if a page takes too long to load. Studies show that every additional second of load time increases bounce rate by roughly 10 percent. Compressing images is the single easiest way to improve both speed and engagement.</p>

        <h2 style={s.h2}>Lossy vs Lossless Compression</h2>
        <p style={s.p}><strong>Lossy compression</strong> reduces file size by removing image data that the human eye is unlikely to notice. A high-quality JPEG compressed from 2 MB to 200 KB will look virtually identical to the original on a screen. This is the right choice for photographs and complex images on websites.</p>
        <p style={s.p}><strong>Lossless compression</strong> reduces file size without removing any image data. The file gets smaller by optimizing how the data is stored, but no visual information is lost. This is ideal for logos, icons, and graphics where every pixel matters.</p>
        <p style={s.p}>For most website images, lossy compression at 80 to 85 percent quality is the sweet spot — significant file size reduction with no visible difference.</p>

        <h2 style={s.h2}>How to Compress Images Effectively</h2>
        <p style={s.p}><strong>Step 1 — Resize first.</strong> If your website displays an image at 800 pixels wide, uploading a 4000-pixel-wide original wastes bandwidth. Use our <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>Image Resizer</Link> to match the actual display dimensions.</p>
        <p style={s.p}><strong>Step 2 — Compress.</strong> Upload your resized images to a compression tool and reduce their file size. Aim for under 200 KB per image for most web use cases.</p>
        <p style={s.p}><strong>Step 3 — Choose the right format.</strong> JPEG works best for photographs. PNG works best for graphics with transparency. WebP offers superior compression for both types and is supported by all modern browsers.</p>
        <p style={s.p}><strong>Step 4 — Test.</strong> After compressing, compare the original and compressed versions side by side. If you cannot tell the difference, the compression level is right.</p>

        <h2 style={s.h2}>The Real-World Impact</h2>
        <p style={s.p}>A website with 10 unoptimized images at 3 MB each loads 30 MB of image data. After compression and resizing, those same images might total 2 MB — a 93 percent reduction. For a visitor on a mobile connection, that is the difference between a page that loads instantly and one that takes 15 seconds.</p>

        <h2 style={s.h2}>Compress Your Images Now</h2>
        <p style={s.p}>Our free Image Compressor reduces image file sizes without visible quality loss. Upload, compress, and download — no signup, no watermarks, unlimited files.</p>
        <Link href="/tools/image-compressor" style={s.cta}>Open Image Compressor →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Need specific dimensions for social media? Our <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>Image Resizer</Link> has preset sizes for every platform.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
