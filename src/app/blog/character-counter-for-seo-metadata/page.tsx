import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character Counter for SEO: Perfect Meta Titles & Descriptions Every Time",
  description: "Learn the exact character limits for meta titles, descriptions, and H1 tags. Use a character counter to maximize your click-through rate in search results.",
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
        <h1 style={s.h1}>Character Counter for SEO: Perfect Meta Titles & Descriptions Every Time</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Your meta title and description are your advertisement in Google search results. Too long and they get truncated with an ugly ellipsis. Too short and you waste valuable real estate. Getting the character count exactly right maximizes your click-through rate and drives more organic traffic.</p>

        <h2 style={s.h2}>Exact SEO Character Limits</h2>
        <p style={s.p}>Meta titles: 50-60 characters (Google truncates at about 580 pixels, which is roughly 60 characters). Meta descriptions: 150-160 characters (Google truncates at about 920 pixels). H1 tags: no hard limit, but keep them under 70 characters for readability. URL slugs: keep under 75 characters and use hyphens between words.</p>

        <h2 style={s.h2}>Why Precision Matters</h2>
        <p style={s.p}>A truncated meta title with ... at the end looks unprofessional and loses the most important words — which are often at the end (your brand name, a key benefit, or the year). Checking character count before publishing ensures your full message displays in search results.</p>

        <h2 style={s.h2}>Crafting High-CTR Meta Titles</h2>
        <p style={s.p}>Front-load your primary keyword. Include a number if applicable (listicles and years perform well). Add a power word — free, complete, proven, ultimate. Keep the most important information in the first 40 characters in case of aggressive truncation on mobile.</p>

        <h2 style={s.h2}>Optimizing Meta Descriptions</h2>
        <p style={s.p}>Treat your meta description as ad copy, not a summary. Include your primary keyword (Google bolds matching terms). Add a clear value proposition and a soft call to action. Use all 150-160 characters — wasted space is wasted opportunity.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Character Counter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/character-counter" style={s.cta}>Open Character Counter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/word-counter" style={{ color: "#0D9488" }}>Word Counter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
