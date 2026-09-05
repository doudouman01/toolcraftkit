import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter: Epoch Time to Human-Readable Dates",
  description: "Convert Unix timestamps to readable dates and vice versa. Essential tool for developers working with APIs, databases, and log files.",
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
        <h1 style={s.h1}>Unix Timestamp Converter: Epoch Time to Human-Readable Dates</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Unix timestamps are everywhere in software development — API responses, database records, log files, cookies, and JWT tokens. Reading 1788300000 and knowing that means September 2026 is not a skill most humans have. A timestamp converter bridges the gap between machine time and human time.</p>

        <h2 style={s.h2}>What Is Epoch Time</h2>
        <p style={s.p}>The Unix epoch started on January 1, 1970, at 00:00:00 UTC. A Unix timestamp is the number of seconds (or milliseconds) since that moment. The current timestamp is approximately 1788300000 (seconds) or 1788300000000 (milliseconds). This simple counting system avoids time zone confusion and is universally understood by computers.</p>

        <h2 style={s.h2}>Seconds vs Milliseconds</h2>
        <p style={s.p}>10-digit timestamps are in seconds (Unix standard). 13-digit timestamps are in milliseconds (JavaScript, Java, common in APIs). The difference matters — treating milliseconds as seconds places a date in the year 58,000+. Always check the digit count before converting.</p>

        <h2 style={s.h2}>Common Developer Scenarios</h2>
        <p style={s.p}>Debugging API responses: convert timestamp fields to readable dates. Analyzing log files: find events by converting timestamps. Setting expiration times: cookies, tokens, and cache headers use timestamps. Comparing dates: subtract two timestamps to get the duration in seconds.</p>

        <h2 style={s.h2}>Time Zone Handling</h2>
        <p style={s.p}>Timestamps are always UTC. When converting to a readable date, you must specify the time zone. The same timestamp is a different time in New York (-5h) than in Tokyo (+9h). Display local time to users, but store and transmit UTC timestamps between systems.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Timestamp Converter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/timestamp-converter" style={s.cta}>Open Timestamp Converter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/url-encoder" style={{ color: "#0D9488" }}>URL Encoder</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
