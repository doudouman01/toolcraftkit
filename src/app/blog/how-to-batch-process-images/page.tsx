import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Batch Process Images: Resize and Compress Multiple Files at Once",
  description: "Save time by processing multiple images simultaneously. Batch resize, compress, and convert images for websites, social media, and email.",
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
        <h1 style={s.h1}>How to Batch Process Images: Resize and Compress Multiple Files at Once</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Processing images one at a time is fine when you have 3 photos. When you have 50 product images, 200 event photos, or a website migration with hundreds of pages, individual processing becomes a bottleneck. Batch processing tools handle multiple files simultaneously, cutting hours of work down to minutes.</p>

        <h2 style={s.h2}>When You Need Batch Processing</h2>
        <p style={s.p}>E-commerce stores adding new products with 5-10 images each. Website migrations where hundreds of images need resizing and compression. Event photography where dozens of images need consistent treatment. Social media management where content needs platform-specific dimensions across multiple channels.</p>

        <h2 style={s.h2}>Batch Compression</h2>
        <p style={s.p}>Upload multiple images to a compression tool at once. Set a consistent quality level (80-85% for web, 90-95% for print) and compress all files simultaneously. This ensures consistent quality across your image library and saves significant time compared to individual processing.</p>

        <h2 style={s.h2}>Batch Resizing</h2>
        <p style={s.p}>Set target dimensions once and apply to all images. For product catalogs: resize everything to 1500x1500px square. For blog thumbnails: resize to 400x250px. For social media: resize to platform-specific dimensions. Consistent dimensions across your library create a professional, uniform appearance.</p>

        <h2 style={s.h2}>Workflow for Large Projects</h2>
        <p style={s.p}>Step 1: Organize source images into folders by purpose (products, blog, social). Step 2: Batch resize each folder to the required dimensions. Step 3: Batch compress the resized images. Step 4: Verify a sample from each batch for quality. This three-step workflow (organize, resize, compress) handles any volume efficiently.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Image Compressor handles this instantly — no signup, no limits.</p>
        <Link href="/tools/image-compressor" style={s.cta}>Open Image Compressor →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>Image Resizer</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
