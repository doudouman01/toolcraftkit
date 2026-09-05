import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Words to Pages for Authors: Book Length Guide by Genre",
  description: "How many words should your novel, novella, or nonfiction book be? Complete guide to book length expectations by genre for self-published and traditional authors.",
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
        <h1 style={s.h1}>Words to Pages for Authors: Book Length Guide by Genre</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>The length of your book matters. Too short and readers feel cheated. Too long and you lose casual readers — and spend more on printing. Different genres have different expectations, and meeting those expectations signals to readers (and publishers) that you understand the market.</p>

        <h2 style={s.h2}>Word Count by Genre</h2>
        <p style={s.p}>Literary fiction: 80,000-100,000 words. Commercial fiction (thriller, romance, mystery): 70,000-90,000 words. Fantasy and sci-fi: 90,000-120,000 words (epic fantasy can go higher). Young adult: 55,000-80,000 words. Middle grade: 25,000-50,000 words. Self-help and business nonfiction: 40,000-60,000 words. Memoir: 70,000-90,000 words.</p>

        <h2 style={s.h2}>Words to Print Pages</h2>
        <p style={s.p}>A standard trade paperback fits about 250-300 words per page. A 80,000-word novel is roughly 280-320 printed pages. For ebooks, the page count is less relevant — readers care about reading time. An 80,000-word book takes about 5-6 hours to read at average speed.</p>

        <h2 style={s.h2}>Why These Ranges Exist</h2>
        <p style={s.p}>Genre conventions exist because readers have expectations. A 40,000-word romance feels rushed. A 150,000-word debut novel is a hard sell to agents and publishers — it signals that the author cannot edit. Self-published authors have more flexibility, but straying too far from genre norms affects reader satisfaction and reviews.</p>

        <h2 style={s.h2}>Tracking Your Progress</h2>
        <p style={s.p}>Set a daily word count target based on your total goal and deadline. Writing 1,000 words per day produces a first draft of an 80,000-word novel in about 80 days — under three months. Track your daily output to stay on pace and adjust when life gets in the way.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Words to Pages handles this instantly — no signup, no limits.</p>
        <Link href="/tools/words-to-pages" style={s.cta}>Open Words to Pages →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/word-counter" style={{ color: "#0D9488" }}>Word Counter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
