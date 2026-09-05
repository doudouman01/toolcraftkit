import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character Counter for Social Media: Exact Limits for Every Platform",
  description: "Never get your post truncated again. Exact character limits for Twitter/X, Instagram, LinkedIn, Facebook, TikTok, and YouTube in 2026.",
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
        <h1 style={s.h1}>Character Counter for Social Media: Exact Limits for Every Platform</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Every social media platform has character limits, and they are not consistent. A post that fits perfectly on LinkedIn gets cut off on X. A caption that works on Instagram is too long for a tweet. Knowing the exact limits — and checking your count before posting — prevents truncated messages and lost engagement.</p>

        <h2 style={s.h2}>2026 Character Limits by Platform</h2>
        <p style={s.p}>X (Twitter): 280 characters for standard posts, 25,000 for X Premium subscribers. Instagram: 2,200 characters for captions, 150 for bio. LinkedIn: 3,000 characters for posts, 2,600 for articles summary. Facebook: 63,206 characters for posts (but only the first 480 show before See More). TikTok: 4,000 characters for captions. YouTube: 5,000 characters for descriptions, 100 for titles.</p>

        <h2 style={s.h2}>Why the First Characters Matter Most</h2>
        <p style={s.p}>On most platforms, only the first few lines are visible before the reader taps to expand. LinkedIn shows about 150 characters before the See More button. Facebook shows about 480. Instagram shows roughly 125 in the feed. Your hook must land in those opening characters or the rest of your post never gets read.</p>

        <h2 style={s.h2}>Spaces and Emojis Count</h2>
        <p style={s.p}>Spaces count as characters on every platform. Most emojis count as 2 characters because they use multi-byte encoding. URLs count at their full length on most platforms (X shortens them to 23 characters automatically). Hashtags include the # symbol in the character count.</p>

        <h2 style={s.h2}>Best Practices</h2>
        <p style={s.p}>Write your post, check the character count, then optimize. Front-load the most important information. Use line breaks strategically — they use characters but dramatically improve readability. For X, aim for 70-100 characters for maximum engagement, even though the limit is 280.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Character Counter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/character-counter" style={s.cta}>Open Character Counter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/word-counter" style={{ color: "#0D9488" }}>Word Counter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
