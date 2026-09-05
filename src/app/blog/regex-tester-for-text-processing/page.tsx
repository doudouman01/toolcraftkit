import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex for Text Processing: Find, Replace & Extract Data From Text",
  description: "Use regular expressions to extract emails from text, clean data, find patterns, and do powerful find-and-replace operations.",
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
        <h1 style={s.h1}>Regex for Text Processing: Find, Replace & Extract Data From Text</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Regular expressions are not just for validation — they are incredibly powerful for text processing. Extracting all email addresses from a document, cleaning messy data, reformatting dates, or finding patterns in log files — regex handles these tasks in seconds that would take hours to do manually.</p>

        <h2 style={s.h2}>Extracting Data From Text</h2>
        <p style={s.p}>Extract all emails: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,} — finds every email address in a block of text. Extract all URLs: https?://\S+ — finds every link. Extract phone numbers: \b\d{3}[-.]\d{3}[-.]\d{4}\b — finds US-format numbers. Use the global flag (g) to find all matches, not just the first.</p>

        <h2 style={s.h2}>Find and Replace Operations</h2>
        <p style={s.p}>Remove all HTML tags: replace <[^>]+> with nothing. Convert dates from MM/DD/YYYY to YYYY-MM-DD: find (\d{2})/(\d{2})/(\d{4}) and replace with $3-$1-$2. Add quotes around words: find \b(\w+)\b and replace with \"$1\". These operations transform entire documents in one step.</p>

        <h2 style={s.h2}>Cleaning Messy Data</h2>
        <p style={s.p}>Remove extra whitespace: replace \s+ with a single space. Remove blank lines: replace ^\s*\n with nothing. Remove non-alphanumeric characters: replace [^a-zA-Z0-9\s] with nothing. Normalize line endings: replace \r\n with \n. These patterns are essential for data preparation before analysis or import.</p>

        <h2 style={s.h2}>Log File Analysis</h2>
        <p style={s.p}>Extract timestamps: \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} — finds ISO datetime patterns. Find error lines: ^.*ERROR.*$ — matches any line containing ERROR. Extract IP addresses: \b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b — finds IPv4 addresses. Combine these patterns to quickly analyze large log files.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Regex Tester handles this instantly — no signup, no limits.</p>
        <Link href="/tools/regex-tester" style={s.cta}>Open Regex Tester →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/remove-duplicates" style={{ color: "#0D9488" }}>Remove Duplicates</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
