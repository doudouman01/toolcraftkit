import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Use Unix Timestamps: Developer Guide for Dates & Times",
  description: "Understand Unix timestamps, convert between human-readable dates and epoch time, and handle time zones in your applications.",
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
        <h1 style={s.h1}>How to Use Unix Timestamps: Developer Guide for Dates & Times</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Unix timestamps count the number of seconds since January 1, 1970, 00:00:00 UTC. They are the standard way to store and transmit time in software systems because they are timezone-neutral, sortable as integers, and unambiguous. Every developer encounters them, and understanding how they work prevents common date-handling bugs.</p>

        <h2 style={s.h2}>What Is a Unix Timestamp</h2>
        <p style={s.p}>Right now, the Unix timestamp is approximately 1788300000. That number represents the seconds elapsed since the epoch (January 1, 1970 UTC). Timestamps are always in UTC — time zone conversion happens at the display layer, not the storage layer. This prevents the chaos of storing times in different zones.</p>

        <h2 style={s.h2}>Common Operations</h2>
        <p style={s.p}>Convert timestamp to date: divide by 86400 to get days since epoch, or use a converter tool. Get current timestamp: Date.now() in JavaScript (returns milliseconds — divide by 1000 for seconds). Add one day: add 86400 seconds. Add one hour: add 3600 seconds. Subtract two timestamps to get the duration between events.</p>

        <h2 style={s.h2}>Milliseconds vs Seconds</h2>
        <p style={s.p}>JavaScript uses milliseconds (13 digits: 1788300000000). Unix traditionally uses seconds (10 digits: 1788300000). APIs vary — always check whether a timestamp is in seconds or milliseconds. A common bug is treating milliseconds as seconds, which produces dates in the year 58600+.</p>

        <h2 style={s.h2}>Time Zone Handling</h2>
        <p style={s.p}>Store timestamps in UTC. Convert to local time only for display. Never store local time in a database — daylight saving changes, time zone rules change, and users in different zones will see wrong times. Let the frontend handle conversion: new Date(timestamp * 1000).toLocaleString() gives the user's local time.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Timestamp Converter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/timestamp-converter" style={s.cta}>Open Timestamp Converter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/base64" style={{ color: "#0D9488" }}>Base64 Encoder</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
