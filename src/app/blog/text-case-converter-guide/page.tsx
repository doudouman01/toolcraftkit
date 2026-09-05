import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Case Converter: Change Text to Title Case, UPPER, lower & More",
  description: "Convert text between uppercase, lowercase, title case, sentence case, camelCase, and more. Free online case converter for writers and developers.",
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
        <h1 style={s.h1}>Text Case Converter: Change Text to Title Case, UPPER, lower & More</h1>
        <p style={s.meta}>September 5, 2026 · 3 min read</p>

        <p style={s.p}>Text case conversion is one of those tasks that seems trivial until you need to convert 500 product titles to Title Case, fix accidentally capitalized paragraphs, or transform names into camelCase for code. A case converter handles these transformations instantly, saving time and eliminating errors.</p>

        <h2 style={s.h2}>Text Cases Explained</h2>
        <p style={s.p}>UPPERCASE: ALL LETTERS CAPITALIZED. lowercase: all letters small. Title Case: First Letter Of Each Word Capitalized. Sentence case: First letter of each sentence capitalized. camelCase: wordsJoinedWithCapitals (for programming). snake_case: words_separated_by_underscores. kebab-case: words-separated-by-hyphens.</p>

        <h2 style={s.h2}>When to Use Each</h2>
        <p style={s.p}>Title Case for headings, book titles, and proper nouns. Sentence case for body text, email subject lines, and modern UI elements. UPPERCASE for acronyms, short labels, and legal disclaimers (use sparingly — it reads as shouting). camelCase and snake_case for programming variables and identifiers.</p>

        <h2 style={s.h2}>Common Mistakes</h2>
        <p style={s.p}>Capitalizing every word in a sentence (Title Case where Sentence Case is needed). Using UPPERCASE for long paragraphs (hard to read). Inconsistent capitalization across a website or document. Capitalizing prepositions and articles in titles (write The Art of War, not The Art Of War — minor words stay lowercase in title case).</p>

        <h2 style={s.h2}>Batch Conversion</h2>
        <p style={s.p}>When you need to convert hundreds of lines — product titles, menu items, database entries — a case converter processes them all at once. Paste the full list, select the target case, and copy the result. This eliminates the tedium and errors of manual conversion.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Case Converter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/text-case-converter" style={s.cta}>Open Case Converter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/word-counter" style={{ color: "#0D9488" }}>Word Counter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
