import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter for Bloggers & Content Creators: Hit the Right Length Every Time",
  description: "Use a word counter to optimize blog posts, YouTube scripts, newsletters, and social media content for maximum engagement and SEO.",
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
        <h1 style={s.h1}>Word Counter for Bloggers & Content Creators: Hit the Right Length Every Time</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Content length directly affects performance. A blog post that is too short will not rank in Google. A newsletter that is too long gets abandoned halfway through. A YouTube script that runs over time loses viewers. Knowing your word count is not optional — it is a core part of content strategy.</p>

        <h2 style={s.h2}>Ideal Word Counts by Platform</h2>
        <p style={s.p}>SEO blog posts perform best at 1,500 to 2,500 words for competitive keywords. Newsletter emails should be 200 to 500 words for high open-to-click rates. YouTube scripts run about 150 words per minute of video. Podcast show notes work best at 300 to 500 words for SEO without overwhelming readers.</p>

        <h2 style={s.h2}>Why Length Matters for SEO</h2>
        <p style={s.p}>Google consistently ranks comprehensive content higher. The average first-page result contains over 1,400 words. But length alone is not enough — every word must add value. A 2,000-word article that repeats itself performs worse than a focused 1,200-word piece that covers the topic thoroughly.</p>

        <h2 style={s.h2}>Using Word Count in Your Workflow</h2>
        <p style={s.p}>Check your word count at three points: after outlining (to estimate final length), at the first draft (to see where you stand), and after editing (to confirm you are in range). This prevents the common problem of writing 3,000 words when you needed 1,500.</p>

        <h2 style={s.h2}>Reading Time and Engagement</h2>
        <p style={s.p}>Display estimated reading time on your content. Studies show that articles with reading time estimates have lower bounce rates — readers commit when they know the time investment upfront. The average adult reads 200-250 words per minute.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Word Counter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/word-counter" style={s.cta}>Open Word Counter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/words-to-pages" style={{ color: "#0D9488" }}>Words to Pages</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
