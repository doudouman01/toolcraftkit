import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Remove Duplicate Lines from a List (3 Methods)",
  description: "Clean up email lists, keyword lists, and data exports by removing duplicate lines. Free online tool, Excel formula, and command-line methods.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    h3: { fontSize: 16, fontWeight: 600, color: "#1C1917", marginTop: 20, marginBottom: 8 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
    code: { background: "#F5F5F4", borderRadius: 8, padding: "14px 18px", fontFamily: "'Courier New', monospace", fontSize: 13, color: "#1C1917", marginBottom: 16, display: "block" as const, overflowX: "auto" as const } as const,
    method: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: "20px", marginBottom: 16 } as const,
    badge: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700, marginBottom: 8 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>How to Remove Duplicate Lines from a List (3 Methods)</h1>
        <p style={s.meta}>August 22, 2026 · 4 min read</p>

        <p style={s.p}>Duplicate entries in lists are a common headache. Whether you&apos;re cleaning up an email list, deduplicating keywords for SEO, or processing data exports, you need a fast way to keep only unique entries. Here are three methods, from easiest to most powerful.</p>

        <div style={s.method}>
          <span style={s.badge}>METHOD 1 — FASTEST</span>
          <h3 style={s.h3}>Use a Free Online Tool</h3>
          <p style={s.p}>The fastest way is to paste your list into an online deduplication tool. No formulas, no commands — just paste, click, and copy the result.</p>
          <p style={s.p}>Our <Link href="/tools/remove-duplicates" style={{ color: "#0D9488", fontWeight: 600 }}>Remove Duplicate Lines tool</Link> handles thousands of lines instantly, with options for case sensitivity, whitespace trimming, and alphabetical sorting. It runs in your browser so your data stays private.</p>
          <Link href="/tools/remove-duplicates" style={s.cta}>Remove Duplicates Online →</Link>
        </div>

        <div style={s.method}>
          <span style={{ ...s.badge, background: "#6366F1" }}>METHOD 2 — SPREADSHEETS</span>
          <h3 style={s.h3}>Remove Duplicates in Excel or Google Sheets</h3>
          <p style={s.p}><strong>In Excel:</strong> Select your data column, go to the Data tab, and click &quot;Remove Duplicates.&quot; Excel tells you how many duplicates were found and removed. This modifies your data in place, so make a copy first.</p>
          <p style={s.p}><strong>In Google Sheets:</strong> Select your range, go to Data → Data Cleanup → Remove Duplicates. Alternatively, use the formula <code>=UNIQUE(A1:A100)</code> in a new column to extract unique values without modifying the original data.</p>
        </div>

        <div style={s.method}>
          <span style={{ ...s.badge, background: "#EF4444" }}>METHOD 3 — COMMAND LINE</span>
          <h3 style={s.h3}>Using sort and uniq (Mac/Linux Terminal)</h3>
          <p style={s.p}>For large files or automated workflows, the command line is the most powerful option:</p>
          <code style={s.code}>sort input.txt | uniq &gt; output.txt</code>
          <p style={s.p}>This sorts the file alphabetically and removes consecutive duplicate lines. To remove duplicates without sorting (preserving original order):</p>
          <code style={s.code}>awk &apos;!seen[$0]++&apos; input.txt &gt; output.txt</code>
          <p style={s.p}>The <code>awk</code> command keeps the first occurrence of each line and removes all subsequent duplicates, without changing the order.</p>
        </div>

        <h2 style={s.h2}>Which Method Should You Use?</h2>
        <p style={s.p}>For quick, one-off tasks with lists under 10,000 lines, the <Link href="/tools/remove-duplicates" style={{ color: "#0D9488" }}>online tool</Link> is the fastest option — no setup needed. For structured data in spreadsheets, use Excel or Google Sheets built-in features. For large files (100K+ lines) or automated pipelines, the command line is the way to go.</p>

        <p style={s.p}>Need to also count the words in your cleaned-up list? Try our <Link href="/tools/word-counter" style={{ color: "#0D9488" }}>Word Counter</Link>. Working with regex patterns to find and clean data? Check out the <Link href="/tools/regex-tester" style={{ color: "#0D9488" }}>Regex Tester</Link>.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
