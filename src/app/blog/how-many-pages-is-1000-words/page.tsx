import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Many Pages Is 1,000 Words? (With Calculator)",
  description: "Find out how many pages 1,000 words fills based on font size and spacing. Includes a free words-to-pages calculator and reference table for essays and reports.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
    table: { width: "100%", borderCollapse: "collapse" as const, marginBottom: 20, fontSize: 14 },
    th: { padding: "10px 12px", background: "#F5F5F4", textAlign: "left" as const, fontWeight: 600, fontSize: 13, borderBottom: "2px solid #E7E5E4" },
    td: { padding: "10px 12px", borderBottom: "1px solid #F5F5F4" },
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>How Many Pages Is 1,000 Words?</h1>
        <p style={s.meta}>August 22, 2026 · 4 min read</p>

        <p style={s.p}>Whether you&apos;re writing a college essay, a blog post, or a business report, one of the most common questions is: how many pages will my word count fill? The short answer for 1,000 words is about 4 pages double-spaced or 2 pages single-spaced — but the real answer depends on your font size, line spacing, and margins.</p>

        <h2 style={s.h2}>Quick Reference Table</h2>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}>Word Count</th><th style={s.th}>Single-Spaced</th><th style={s.th}>Double-Spaced</th></tr>
          </thead>
          <tbody>
            {[
              ["250 words", "½ page", "1 page"],
              ["500 words", "1 page", "2 pages"],
              ["1,000 words", "2 pages", "4 pages"],
              ["1,500 words", "3 pages", "6 pages"],
              ["2,000 words", "4 pages", "8 pages"],
              ["2,500 words", "5 pages", "10 pages"],
              ["3,000 words", "6 pages", "12 pages"],
              ["5,000 words", "10 pages", "20 pages"],
              ["10,000 words", "20 pages", "40 pages"],
            ].map(([words, single, double], i) => (
              <tr key={i}><td style={s.td}>{words}</td><td style={s.td}>{single}</td><td style={s.td}>{double}</td></tr>
            ))}
          </tbody>
        </table>
        <p style={s.p}>These estimates assume 12pt Times New Roman or similar, with standard 1-inch margins on US Letter (8.5 × 11 inches) paper.</p>

        <h2 style={s.h2}>What Affects Page Count?</h2>
        <p style={s.p}><strong>Font size</strong> is the biggest factor. At 12pt, about 250 words fit on a double-spaced page. Drop to 11pt and you can fit roughly 275 words. Go up to 14pt and it drops to about 200 words per page.</p>
        <p style={s.p}><strong>Line spacing</strong> doubles (or halves) the page count. A 1,000-word essay that fills 4 pages double-spaced only takes 2 pages single-spaced.</p>
        <p style={s.p}><strong>Margins and headers</strong> eat into the available space. Wider margins or large headers reduce the number of words per page.</p>
        <p style={s.p}><strong>Headings, images, and lists</strong> are not accounted for in word-to-page calculations. These elements take up space and will increase your actual page count beyond what pure text would fill.</p>

        <h2 style={s.h2}>Common Essay Lengths</h2>
        <p style={s.p}>A typical high school essay is 500-1,000 words (2-4 pages double-spaced). A college paper is usually 1,500-2,500 words (6-10 pages). A graduate thesis can be 10,000-50,000 words (40-200 pages). Knowing the approximate page count helps you plan your writing time and structure.</p>

        <h2 style={s.h2}>Try It Yourself</h2>
        <p style={s.p}>Use our free Words to Pages Calculator to check any word count instantly. Adjust font size and spacing to match your assignment requirements.</p>
        <Link href="/tools/words-to-pages" style={s.cta}>Open Words to Pages Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Need to count the words in an existing document? Paste your text into our <Link href="/tools/word-counter" style={{ color: "#0D9488" }}>Word Counter</Link> to get an exact count with reading time, keyword density, and more.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
