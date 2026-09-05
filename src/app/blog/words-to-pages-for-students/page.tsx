import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Words to Pages: How Long Is My Essay? (Student Guide)",
  description: "Find out exactly how many pages your essay will be. Convert word count to pages for different fonts, spacing, and formats.",
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
        <h1 style={s.h1}>Words to Pages: How Long Is My Essay? (Student Guide)</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Your professor says the paper should be 5 pages. Your scholarship essay needs to be 2 pages. But how many words is that? The answer depends on your font, font size, line spacing, and margins. Instead of guessing, use a words-to-pages converter to get an accurate estimate instantly.</p>

        <h2 style={s.h2}>Quick Reference: Words to Pages</h2>
        <p style={s.p}>Single-spaced, 12pt Times New Roman: 500 words per page. Double-spaced, 12pt Times New Roman: 250 words per page. Single-spaced, 12pt Arial: 450 words per page. Double-spaced, 12pt Arial: 225 words per page. These are estimates — your actual count will vary with paragraph breaks, headings, and block quotes.</p>

        <h2 style={s.h2}>Why the Font Matters</h2>
        <p style={s.p}>Times New Roman is narrower than Arial, so more words fit per line. Calibri, the default in modern Word versions, falls between the two. Courier New, a monospaced font, fits the fewest words per page. If your assignment specifies a font, use the matching estimate — not a generic one.</p>

        <h2 style={s.h2}>Spacing and Margins</h2>
        <p style={s.p}>Double spacing cuts your words-per-page roughly in half. Standard margins are 1 inch on all sides (2.54 cm). Some students try to game the system with 1.1-inch margins or slightly larger fonts — professors notice. Stick to the requirements and write to the word count, not the page count.</p>

        <h2 style={s.h2}>When Page Count vs Word Count Conflicts</h2>
        <p style={s.p}>If your assignment says 5 pages double-spaced AND 1,250 words, the word count takes priority. Page counts are approximations — word counts are precise. When in doubt, ask your instructor which metric matters more.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Words to Pages handles this instantly — no signup, no limits.</p>
        <Link href="/tools/words-to-pages" style={s.cta}>Open Words to Pages →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/word-counter" style={{ color: "#0D9488" }}>Word Counter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
