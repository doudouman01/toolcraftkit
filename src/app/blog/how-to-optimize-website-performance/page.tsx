import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Performance Optimization: The Complete Checklist",
  description: "Speed up your website with this actionable checklist. Image optimization, file compression, code minification, and more.",
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
        <h1 style={s.h1}>Website Performance Optimization: The Complete Checklist</h1>
        <p style={s.meta}>September 5, 2026 · 6 min read</p>

        <p style={s.p}>Website speed affects everything — search rankings, conversion rates, user experience, and bounce rates. Google reports that 53% of mobile users abandon sites that take longer than 3 seconds to load. A fast site is not a nice-to-have — it is a business requirement.</p>

        <h2 style={s.h2}>Image Optimization (Biggest Impact)</h2>
        <p style={s.p}>Images typically account for 50-80% of total page weight. Compress all images to reduce file sizes by 50-80% without visible quality loss. Resize images to actual display dimensions — a 4000px image displayed at 800px wastes 96% of the data. Use WebP format for best compression. Implement lazy loading so images below the fold load only when scrolled into view.</p>

        <h2 style={s.h2}>Code Optimization</h2>
        <p style={s.p}>Minify CSS and JavaScript to remove whitespace, comments, and unnecessary characters. Enable GZIP or Brotli compression on your server. Combine multiple CSS and JS files to reduce HTTP requests. Remove unused CSS and JavaScript libraries. Each optimization shaves milliseconds that compound across every page load.</p>

        <h2 style={s.h2}>Server and Hosting</h2>
        <p style={s.p}>Use a CDN (Content Delivery Network) to serve files from servers closest to your visitors. Enable browser caching so returning visitors load cached resources instead of re-downloading. Choose hosting with good server response times — cheap shared hosting often adds 500ms+ to every request.</p>

        <h2 style={s.h2}>Measuring Performance</h2>
        <p style={s.p}>Use Google PageSpeed Insights to measure your current performance and get specific recommendations. Core Web Vitals (LCP, FID, CLS) are the key metrics Google uses for ranking. Aim for LCP under 2.5 seconds, FID under 100ms, and CLS under 0.1. Test on mobile — that is where most users are and where performance matters most.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Image Compressor handles this instantly — no signup, no limits.</p>
        <Link href="/tools/image-compressor" style={s.cta}>Open Image Compressor →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>Image Resizer</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
