import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Generate Unique IDs: UUID, Random Strings & Timestamps",
  description: "Generate unique identifiers for databases, URLs, API keys, and filenames. UUID vs timestamp vs random string comparison.",
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
        <h1 style={s.h1}>How to Generate Unique IDs: UUID, Random Strings & Timestamps</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Unique identifiers are fundamental to software development. Every database record, API resource, uploaded file, and user session needs an ID that will never collide with another. The method you choose affects performance, security, sortability, and URL aesthetics.</p>

        <h2 style={s.h2}>UUID (Universally Unique Identifier)</h2>
        <p style={s.p}>UUIDs are 128-bit identifiers displayed as 32 hex characters: 550e8400-e29b-41d4-a716-446655440000. UUID v4 is randomly generated — the probability of collision is astronomically low (you would need to generate 1 billion UUIDs per second for 85 years to have a 50% chance of one collision). Use UUIDs when you need guaranteed uniqueness without coordination.</p>

        <h2 style={s.h2}>Timestamp-Based IDs</h2>
        <p style={s.p}>Combining a Unix timestamp with a random suffix creates IDs that are unique and chronologically sortable: 1788300000-a7f3. This is useful when you need to sort records by creation time without an additional timestamp field. Twitter's Snowflake ID system uses this approach at massive scale.</p>

        <h2 style={s.h2}>Random Strings</h2>
        <p style={s.p}>Random alphanumeric strings (a7f3k9x2) are compact and URL-friendly. A 12-character alphanumeric string has 62^12 possible values — more than enough for most applications. Use cryptographically secure random generation for any security-sensitive IDs (API keys, session tokens, reset links).</p>

        <h2 style={s.h2}>Choosing the Right Approach</h2>
        <p style={s.p}>Database primary keys: UUID v4 or auto-increment integers. API keys and tokens: cryptographically secure random strings (32+ characters). URL slugs: human-readable strings derived from content. File names: timestamp + random suffix to prevent collisions and enable chronological sorting. Short IDs for user-facing display: base62 encoding of sequential integers.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Random Number Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/random-number" style={s.cta}>Open Random Number Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/timestamp-converter" style={{ color: "#0D9488" }}>Timestamp Converter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
