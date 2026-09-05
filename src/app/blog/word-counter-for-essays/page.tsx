import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Use a Word Counter for Essays, Assignments & Applications",
  description: "Track word count for college essays, job applications, and school assignments. Learn the exact word limits for Common App, UCAS, and more.",
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
        <h1 style={s.h1}>How to Use a Word Counter for Essays, Assignments & Applications</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Word limits are everywhere. College application essays, scholarship submissions, job cover letters, academic papers — almost every formal writing task comes with a strict word count requirement. Going over gets your application rejected. Going under suggests you did not put in enough effort.</p>

        <h2 style={s.h2}>Common Word Limits You Need to Know</h2>
        <p style={s.p}>The Common App essay allows 250 to 650 words. UCAS personal statements have a 4,000-character limit (roughly 600-700 words). Most cover letters should be 250 to 400 words. LinkedIn summaries perform best at 200 to 300 words. Academic abstracts typically require 150 to 300 words.</p>

        <h2 style={s.h2}>Why Manual Counting Fails</h2>
        <p style={s.p}>Counting words in your head or estimating by page length is unreliable. Font size, margins, and spacing all affect how long text appears on a page. A 500-word essay in 12pt Times New Roman looks very different from the same text in 14pt Arial. The only reliable method is an actual word count.</p>

        <h2 style={s.h2}>How to Use a Word Counter Effectively</h2>
        <p style={s.p}>Paste your text into the counter and check three things: total word count against your limit, character count if the platform uses character limits instead, and estimated reading time to gauge how long your content takes to consume. Check early and often during the writing process — not just at the end.</p>

        <h2 style={s.h2}>Tips for Hitting Word Limits</h2>
        <p style={s.p}>If you are over the limit, cut adverbs and redundant phrases first. Replace wordy constructions with concise alternatives. If you are under, expand your weakest argument or add a specific example. Never pad with filler — reviewers notice immediately.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Word Counter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/word-counter" style={s.cta}>Open Word Counter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/character-counter" style={{ color: "#0D9488" }}>Character Counter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
