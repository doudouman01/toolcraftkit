import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate Reading Time for Your Content",
  description: "Estimate reading time for blog posts, articles, and books. The formula, why it matters for engagement, and how to display it on your site.",
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
        <h1 style={s.h1}>How to Calculate Reading Time for Your Content</h1>
        <p style={s.meta}>September 5, 2026 · 3 min read</p>

        <p style={s.p}>Medium popularized showing estimated reading time on articles, and the practice has spread across the web for good reason. Readers want to know the time commitment before they start. Articles with reading time estimates have lower bounce rates and higher completion rates.</p>

        <h2 style={s.h2}>The Reading Time Formula</h2>
        <p style={s.p}>Average adult reading speed: 200-250 words per minute (WPM). A simple formula: reading time = word count / 200 (for a conservative estimate) or word count / 250 (for a faster reader estimate). A 1,500-word article takes about 6-7 minutes. Round to the nearest minute for display.</p>

        <h2 style={s.h2}>Adjustments for Content Type</h2>
        <p style={s.p}>Technical content with code, formulas, or complex concepts: use 150 WPM. Casual blog posts and stories: use 250 WPM. Content with many images: add 12 seconds per image (readers spend an average of 12 seconds on each image). Tutorials where readers follow along: double the estimate to account for doing, not just reading.</p>

        <h2 style={s.h2}>Why It Improves Engagement</h2>
        <p style={s.p}>A reading time estimate sets expectations. A reader who sees 3 min read is likely to commit on the spot. A reader who sees 15 min read might save it for later — but at least they know what they are getting into. Without an estimate, uncertainty increases bounce rate. With one, readers self-select more accurately.</p>

        <h2 style={s.h2}>Implementation</h2>
        <p style={s.p}>Display reading time in the article metadata, near the title and date. Format it as X min read for consistency. Calculate server-side or in your CMS — most blog platforms have plugins for this. For quick calculations, paste your content into a Word Counter to see the word count and estimate reading time.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Word Counter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/word-counter" style={s.cta}>Open Word Counter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/words-to-pages" style={{ color: "#0D9488" }}>Words to Pages</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
