import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Resize Images for Social Media (Exact Dimensions Guide 2026)",
  description: "Complete guide to social media image sizes in 2026. Get the exact pixel dimensions for Instagram, Facebook, X, LinkedIn, YouTube, and Pinterest.",
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
        <h1 style={s.h1}>How to Resize Images for Social Media (Exact Dimensions Guide 2026)</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Every social media platform has specific image size requirements. Post an image with the wrong dimensions and it gets cropped awkwardly, stretched, or displayed with ugly borders. Getting the size right before uploading ensures your content looks professional and gets the engagement it deserves.</p>

        <h2 style={s.h2}>2026 Social Media Image Size Cheat Sheet</h2>
        <p style={s.p}><strong>Instagram</strong> — square posts: 1080 x 1080 px. Portrait posts: 1080 x 1350 px (best for engagement). Stories and Reels: 1080 x 1920 px. Profile photo: 320 x 320 px.</p>
        <p style={s.p}><strong>Facebook</strong> — feed posts: 1200 x 630 px. Stories: 1080 x 1920 px. Cover photo: 820 x 312 px (desktop) or 640 x 360 px (mobile). Profile photo: 170 x 170 px.</p>
        <p style={s.p}><strong>X (Twitter)</strong> — single image post: 1600 x 900 px. Header photo: 1500 x 500 px. Profile photo: 400 x 400 px.</p>
        <p style={s.p}><strong>LinkedIn</strong> — feed posts: 1200 x 627 px. Cover photo: 1584 x 396 px. Profile photo: 400 x 400 px.</p>
        <p style={s.p}><strong>YouTube</strong> — thumbnail: 1280 x 720 px. Channel banner: 2560 x 1440 px. Profile photo: 800 x 800 px.</p>
        <p style={s.p}><strong>Pinterest</strong> — standard pin: 1000 x 1500 px. Square pin: 1000 x 1000 px.</p>

        <h2 style={s.h2}>Why Dimensions Matter</h2>
        <p style={s.p}>Social media algorithms favor content that fits their display formats. An image that requires no cropping or scaling loads faster, displays correctly on all devices, and gets better placement in feeds. Incorrectly sized images signal to the algorithm that the content was not created with care, which can reduce reach.</p>
        <p style={s.p}>For businesses and creators, this directly affects engagement and growth. A professional-looking feed with correctly sized images builds trust and encourages followers to stay.</p>

        <h2 style={s.h2}>How to Resize Your Images</h2>
        <p style={s.p}>Upload your image to a resizer tool, enter the target dimensions from the guide above, and download the resized version. The entire process takes seconds. For best results, start with the highest resolution original you have — it is always better to scale down than to scale up, since scaling up creates blurry results.</p>
        <p style={s.p}>After resizing, check the file size. Social media platforms compress uploaded images automatically, but starting with a well-compressed file gives you more control over the final quality. Use our <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>Image Compressor</Link> to reduce file size before uploading.</p>

        <h2 style={s.h2}>Resize Your Images Now</h2>
        <p style={s.p}>Our free Image Resizer lets you set exact pixel dimensions for any platform. Upload, resize, and download — perfect images for every social network.</p>
        <Link href="/tools/image-resizer" style={s.cta}>Open Image Resizer →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Want to compress your resized images? Our <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>Image Compressor</Link> reduces file size without visible quality loss.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
