import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Word Counter & Character Counter — Why Word Count Matters for SEO",
  description: "Count words, characters, sentences, and reading time instantly. Learn why content length matters for SEO and how to hit the right word count for your goals.",
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
        <h1 style={s.h1}>Free Word Counter & Character Counter — Why Word Count Matters for SEO</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Word count is not just an academic metric. For content creators, bloggers, and marketers, knowing the exact length of your content affects SEO performance, reader engagement, and platform compliance. Whether you are writing a blog post, crafting a meta description, or composing a tweet, hitting the right length matters.</p>

        <h2 style={s.h2}>Why Word Count Matters for SEO</h2>
        <p style={s.p}>Studies consistently show that longer, comprehensive content ranks higher in search results. The average first-page Google result contains between 1,400 and 2,000 words. This is not because Google rewards length for its own sake — it is because longer content tends to cover topics more thoroughly, answer more user questions, and earn more backlinks.</p>
        <p style={s.p}>However, length without substance hurts rather than helps. A 2,000-word article that repeats itself or adds filler will have high bounce rates and low engagement, which signals to Google that the content is not valuable. The goal is comprehensive coverage, not arbitrary word count targets.</p>

        <h2 style={s.h2}>Ideal Word Counts by Content Type</h2>
        <p style={s.p}><strong>Blog posts</strong> — 1,200 to 2,500 words for SEO-focused content. Shorter posts (600-800 words) work for news updates and quick guides.</p>
        <p style={s.p}><strong>Landing pages</strong> — 500 to 1,000 words. Enough to explain the value proposition and include relevant keywords without overwhelming the visitor.</p>
        <p style={s.p}><strong>Meta descriptions</strong> — 150 to 160 characters. Google truncates longer descriptions, so every character counts.</p>
        <p style={s.p}><strong>Social media posts</strong> — X (Twitter): 280 characters max, but 70-100 characters gets the highest engagement. LinkedIn: 1,300 characters for feed posts, but the first 150 characters are visible before &quot;see more.&quot;</p>
        <p style={s.p}><strong>Email subject lines</strong> — 40 to 60 characters for optimal open rates. Mobile email clients truncate at about 35 characters.</p>

        <h2 style={s.h2}>Character Count vs Word Count</h2>
        <p style={s.p}>Word count matters for content strategy and SEO planning. Character count matters for platform limits — tweets, meta descriptions, SMS messages, and form fields all have character limits, not word limits. A good counter tool shows both simultaneously.</p>

        <h2 style={s.h2}>Reading Time Estimates</h2>
        <p style={s.p}>The average adult reads at about 200 to 250 words per minute. A 1,500-word blog post takes about 6 to 7 minutes to read. Showing estimated reading time on your articles helps readers decide whether to commit, and content with reading time estimates tends to have lower bounce rates.</p>

        <h2 style={s.h2}>Count Your Words Now</h2>
        <p style={s.p}>Our free Word Counter shows words, characters, sentences, and estimated reading time as you type or paste. No signup, no limits — just accurate counts instantly.</p>
        <Link href="/tools/word-counter" style={s.cta}>Open Word Counter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Need to format your text for publishing? Our <Link href="/tools/case-converter" style={{ color: "#0D9488" }}>Case Converter</Link> handles title case, uppercase, and lowercase conversions instantly.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
