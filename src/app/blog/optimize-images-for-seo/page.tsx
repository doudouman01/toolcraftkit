import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Optimize Images for SEO (Complete Beginner Guide)",
  description: "Learn how to optimize website images for search engines. Covers compression, alt text, file names, lazy loading, and format selection for better rankings.",
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
        <h1 style={s.h1}>How to Optimize Images for SEO (Complete Beginner Guide)</h1>
        <p style={s.meta}>September 5, 2026 · 6 min read</p>

        <p style={s.p}>Image SEO is one of the most overlooked opportunities in search engine optimization. Most website owners focus on text content and backlinks while ignoring the images that make up the majority of their page weight. Properly optimized images improve page speed, drive traffic from Google Image Search, and contribute to better overall rankings.</p>

        <h2 style={s.h2}>Why Image SEO Matters</h2>
        <p style={s.p}>Google Image Search generates billions of searches every month. Properly optimized images can appear in image search results, driving additional organic traffic to your site. Beyond image search, optimized images improve Core Web Vitals scores — particularly Largest Contentful Paint (LCP), which measures how quickly the main content of a page loads.</p>

        <h2 style={s.h2}>Five Steps to Optimize Images</h2>
        <p style={s.p}><strong>1. Use descriptive file names</strong> — rename image files before uploading. Instead of IMG_4521.jpg, use blue-running-shoes-side-view.jpg. Search engines use file names to understand image content.</p>
        <p style={s.p}><strong>2. Write meaningful alt text</strong> — alt text describes the image for screen readers and search engines. Write a brief, accurate description. &quot;Blue running shoes on white background&quot; is better than &quot;shoes&quot; or &quot;best running shoes buy now.&quot;</p>
        <p style={s.p}><strong>3. Compress images</strong> — large image files slow down your page. Use compression to reduce file sizes without visible quality loss. Aim for under 200 KB per image for most web use cases.</p>
        <p style={s.p}><strong>4. Choose the right format</strong> — use JPEG for photographs, PNG for graphics with transparency, and WebP for the best compression across both types. WebP typically saves 25 to 35 percent compared to JPEG.</p>
        <p style={s.p}><strong>5. Resize to actual display dimensions</strong> — if your website displays an image at 800 pixels wide, uploading a 4000-pixel original wastes bandwidth and slows loading.</p>

        <h2 style={s.h2}>Advanced Techniques</h2>
        <p style={s.p}><strong>Lazy loading</strong> — load images only when they scroll into view. This dramatically improves initial page load time because the browser skips images below the fold on first load.</p>
        <p style={s.p}><strong>Responsive images</strong> — serve different image sizes based on the viewer&apos;s screen. A mobile user does not need a 2000-pixel-wide image designed for desktop displays.</p>
        <p style={s.p}><strong>Image sitemaps</strong> — include your important images in your XML sitemap to help Google discover and index them faster.</p>

        <h2 style={s.h2}>Common Mistakes to Avoid</h2>
        <p style={s.p}>Using stock photos that appear on thousands of other websites adds no SEO value — they are already indexed everywhere. Using images with no alt text is a missed opportunity for both accessibility and search visibility. Uploading full-resolution screenshots when a cropped, compressed version would serve better wastes bandwidth and hurts performance.</p>

        <h2 style={s.h2}>Start Optimizing Now</h2>
        <p style={s.p}>Our free Image Compressor and Image Resizer make image optimization quick and painless. Compress, resize, and download — no signup needed.</p>
        <Link href="/tools/image-compressor" style={s.cta}>Open Image Compressor →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>After compressing, resize your images for exact dimensions with our <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>Image Resizer</Link>.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
