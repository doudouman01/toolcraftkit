import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator: Find Your Exact Age in Years, Months, Days & Hours",
  description: "Calculate your precise age, find days until your next birthday, and discover what day of the week you were born. Free online age calculator.",
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
        <h1 style={s.h1}>Age Calculator: Find Your Exact Age in Years, Months, Days & Hours</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>How old are you — exactly? Not approximately, not rounded to the nearest year, but down to the day? An age calculator gives you your precise age in years, months, and days, tells you what day of the week you were born, and counts down to your next birthday. It is surprisingly useful for more than just curiosity.</p>

        <h2 style={s.h2}>More Than Just Years</h2>
        <p style={s.p}>You are not simply 32 years old. You are 32 years, 7 months, and 14 days old. You have been alive for 11,917 days. That is 286,008 hours. Knowing your exact age is useful for legal requirements (exact age for insurance, retirement, voting), medical records, and official documents that require precise dates.</p>

        <h2 style={s.h2}>Birthday and Zodiac Information</h2>
        <p style={s.p}>Born on a specific date? An age calculator can tell you the day of the week. People born on different days have different statistical tendencies (Tuesday and Wednesday births are most common due to scheduled C-sections and induced labor). Your zodiac sign is determined by your birth date — both Western and Chinese zodiac.</p>

        <h2 style={s.h2}>Legal Age Milestones</h2>
        <p style={s.p}>Different activities have different age requirements, and they matter down to the specific date. Driving: 16 in most US states (exact birthday). Voting: 18 (must be 18 by election day). Drinking: 21 in the US (exact birthday). Insurance rates change at specific ages. Social Security eligibility starts at 62 for early benefits.</p>

        <h2 style={s.h2}>Calculating Age Differences</h2>
        <p style={s.p}>How many days apart are two people? Enter both dates and subtract. This is useful for determining age gaps in relationships, comparing birth order for siblings, or calculating the age of a historical event. The calculator handles leap years, different month lengths, and date boundaries automatically.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Age Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/age-calculator" style={s.cta}>Open Age Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/percentage-calculator" style={{ color: "#0D9488" }}>Percentage Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
