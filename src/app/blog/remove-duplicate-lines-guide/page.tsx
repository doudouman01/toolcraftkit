import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Remove Duplicate Lines From Text, Data & Spreadsheets",
  description: "Clean your data by removing duplicate entries. Works for email lists, keywords, product codes, and any text with repeated lines.",
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
        <h1 style={s.h1}>How to Remove Duplicate Lines From Text, Data & Spreadsheets</h1>
        <p style={s.meta}>September 5, 2026 · 3 min read</p>

        <p style={s.p}>Duplicate entries waste space, skew analytics, and cause errors. An email list with duplicates sends multiple messages to the same person. A keyword list with duplicates inflates your count. A product database with duplicates creates inventory confusion. Removing duplicates is a fundamental data cleaning operation.</p>

        <h2 style={s.h2}>Where Duplicates Come From</h2>
        <p style={s.p}>Merging data from multiple sources. Copy-pasting without checking for overlap. Manual data entry where the same item is entered twice. Exporting data that includes header rows as data. Automated scraping or collection that runs over the same data multiple times.</p>

        <h2 style={s.h2}>Case Sensitivity</h2>
        <p style={s.p}>Are 'Apple' and 'apple' duplicates? It depends on your context. For email addresses: yes, email is case-insensitive. For product names: probably yes. For code identifiers: no, they are different. Convert everything to the same case first (using a case converter) if you want case-insensitive deduplication.</p>

        <h2 style={s.h2}>Preserving Order</h2>
        <p style={s.p}>Some deduplication tools sort the output alphabetically, others preserve the original order. If order matters (a chronological list, a priority ranking), use a tool that keeps the first occurrence and removes subsequent duplicates in place.</p>

        <h2 style={s.h2}>Beyond Simple Lines</h2>
        <p style={s.p}>For spreadsheet data, duplicate detection might need to match on a specific column (email address) while keeping other columns (name, phone) intact. For these cases, use spreadsheet deduplication features. For simple text lists — one item per line — our Remove Duplicate Lines tool handles it instantly.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Remove Duplicate Lines handles this instantly — no signup, no limits.</p>
        <Link href="/tools/remove-duplicates" style={s.cta}>Open Remove Duplicates →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/text-case-converter" style={{ color: "#0D9488" }}>Case Converter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
