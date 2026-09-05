import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO for Small Business: A Beginner's Guide to Ranking on Google",
  description: "Learn the basics of SEO for small businesses. Keywords, on-page optimization, Google Business Profile, and local SEO essentials.",
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
        <h1 style={s.h1}>SEO for Small Business: A Beginner's Guide to Ranking on Google</h1>
        <p style={s.meta}>September 5, 2026 · 6 min read</p>

        <p style={s.p}>SEO sounds complicated, but for small businesses, the fundamentals are straightforward. You do not need to hire an agency or learn technical skills. A few consistent practices — targeting the right keywords, optimizing your pages, and maintaining your Google Business Profile — can drive steady organic traffic without ongoing advertising costs.</p>

        <h2 style={s.h2}>Finding the Right Keywords</h2>
        <p style={s.p}>Think about what your customers search for — not industry jargon, but the actual words they type. A plumber's customers do not search for 'residential plumbing services.' They search for 'plumber near me,' 'fix leaking faucet,' and 'water heater replacement cost.' Target these specific, realistic queries in your content.</p>

        <h2 style={s.h2}>On-Page SEO Basics</h2>
        <p style={s.p}>Include your target keyword in the page title, meta description, H1 heading, and naturally throughout the content. Write helpful content that answers the searcher's question thoroughly. Use descriptive image file names and alt text. Keep URLs short and readable. Each page should target one primary keyword.</p>

        <h2 style={s.h2}>Google Business Profile</h2>
        <p style={s.p}>For local businesses, Google Business Profile is the single most important SEO asset. Claim your profile, add accurate hours, photos, and a description. Respond to reviews. Post updates regularly. A complete, active profile ranks higher in local search results and Maps than an incomplete or neglected one.</p>

        <h2 style={s.h2}>Content That Ranks</h2>
        <p style={s.p}>Create pages answering your customers' most common questions. A dentist could write pages on 'how much do braces cost,' 'what to expect during a root canal,' and 'best toothpaste for sensitive teeth.' Each page targets a specific question and brings potential patients to your site. Use Word Counter to ensure adequate content length — aim for 800+ words per page.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Word Counter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/word-counter" style={s.cta}>Open Word Counter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>Image Compressor</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
