import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Crop an Image Online Without Installing Software",
  description: "Crop photos and images directly in your browser. Free, fast, and no signup needed. Works on any device.",
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
        <h1 style={s.h1}>How to Crop an Image Online Without Installing Software</h1>
        <p style={s.meta}>September 5, 2026 · 3 min read</p>

        <p style={s.p}>Cropping an image should not require downloading Photoshop or creating an account. Whether you need to remove unwanted background from a photo, focus on a specific subject, or match a required aspect ratio, browser-based tools handle it in seconds on any device.</p>

        <h2 style={s.h2}>Why Crop Before Resizing</h2>
        <p style={s.p}>Cropping removes unwanted areas from the image. Resizing changes the overall dimensions. Always crop first to focus on the subject, then resize to the exact dimensions needed. Resizing an uncropped image wastes pixels on areas you do not want.</p>

        <h2 style={s.h2}>Common Cropping Scenarios</h2>
        <p style={s.p}>Profile photos: crop to a square format centered on the face. Product images: remove background clutter and center the product. Social media: crop to platform-specific aspect ratios (1:1 for Instagram, 16:9 for YouTube thumbnails, 4:5 for Instagram portrait).</p>

        <h2 style={s.h2}>Aspect Ratios Explained</h2>
        <p style={s.p}>1:1 is a perfect square. 4:3 is standard photo format. 16:9 is widescreen/video format. 3:2 is DSLR camera format. 4:5 is optimal for Instagram feed engagement. Locking the aspect ratio while cropping ensures your image fits the target format perfectly.</p>

        <h2 style={s.h2}>After Cropping</h2>
        <p style={s.p}>Once cropped, compress the image to reduce file size without quality loss. A cropped image has fewer pixels, so the file is already smaller — compression reduces it further. Our Image Compressor handles this step instantly.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Image Resizer handles this instantly — no signup, no limits.</p>
        <Link href="/tools/image-resizer" style={s.cta}>Open Image Resizer →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>Image Compressor</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
