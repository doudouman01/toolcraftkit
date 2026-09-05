import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex for Data Validation: Email, Phone, URL & Date Patterns",
  description: "Copy-paste regex patterns for common validation tasks. Test and customize them instantly with a free online regex tester.",
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
        <h1 style={s.h1}>Regex for Data Validation: Email, Phone, URL & Date Patterns</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Data validation is one of the most common uses for regular expressions. Rather than building patterns from scratch every time, most developers keep a library of tested patterns for emails, phone numbers, URLs, dates, and other common formats. Here are the patterns that cover 95% of validation needs.</p>

        <h2 style={s.h2}>Email Validation</h2>
        <p style={s.p}>Basic pattern: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ — this catches most valid emails while rejecting obvious non-emails. For production use, the best approach is a basic format check with regex plus a confirmation email. No regex can fully validate an email address per RFC 5322 — the spec is intentionally complex.</p>

        <h2 style={s.h2}>Phone Number Patterns</h2>
        <p style={s.p}>US phone: ^\+?1?[-.]?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}$ — matches (555) 123-4567, 555-123-4567, 555.123.4567, and +1-555-123-4567. International phone: ^\+[1-9]\d{1,14}$ — matches E.164 format. For multi-country support, use a library rather than regex.</p>

        <h2 style={s.h2}>URL Validation</h2>
        <p style={s.p}>Basic URL: ^https?://[^\s/$.?#].[^\s]*$ — catches most web URLs. More strict: ^https?://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$ — validates structure more carefully. For URLs in user input, test the regex against edge cases like URLs with ports, query strings, and fragments.</p>

        <h2 style={s.h2}>Date Formats</h2>
        <p style={s.p}>YYYY-MM-DD: ^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$ — validates ISO date format with basic range checking. MM/DD/YYYY: ^(0[1-9]|1[0-2])/(0[1-9]|[12]\d|3[01])/\d{4}$ — US date format. Note that regex validates format, not logic — it will accept February 31st. Use proper date parsing for full validation.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Regex Tester handles this instantly — no signup, no limits.</p>
        <Link href="/tools/regex-tester" style={s.cta}>Open Regex Tester →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/url-encoder" style={{ color: "#0D9488" }}>URL Encoder</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
