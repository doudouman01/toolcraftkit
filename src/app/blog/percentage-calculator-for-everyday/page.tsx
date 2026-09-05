import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Calculator: How to Calculate Tips, Discounts & Grades",
  description: "Calculate percentages for everyday life: restaurant tips, shopping discounts, test scores, and more. Simple explanations with a free online calculator.",
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
        <h1 style={s.h1}>Percentage Calculator: How to Calculate Tips, Discounts & Grades</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Percentages come up in daily life more than you might think. Figuring out a 18% tip at dinner. Calculating how much you save with a 30% off coupon. Checking if your test score of 42 out of 55 is a passing grade. A percentage calculator handles all of these instantly.</p>

        <h2 style={s.h2}>Calculate Tips Quickly</h2>
        <p style={s.p}>For a $85 dinner with 18% tip: 10% is $8.50, plus another 10% is $8.50 — so 20% would be $17. For 18%, take 20% ($17) minus 2% ($1.70) = $15.30. Or just type the numbers into a calculator. For groups, divide the total (bill + tip) by the number of people.</p>

        <h2 style={s.h2}>Shopping Discounts</h2>
        <p style={s.p}>A $120 jacket is 35% off. The discount amount is $120 × 0.35 = $42. The sale price is $120 - $42 = $78. Double discounts are trickier — 20% off plus an additional 15% off is NOT 35% off. It is 20% off first ($96), then 15% off that ($81.60). The actual combined discount is 32%.</p>

        <h2 style={s.h2}>Test Scores and Grades</h2>
        <p style={s.p}>You scored 38 out of 45 on a test. Your percentage is (38 / 45) × 100 = 84.4%. To find out what score you need on the final exam to get an A in the class, work backwards from the grade threshold. If you need 90% overall and the final is worth 40% of your grade, the calculator handles the algebra for you.</p>

        <h2 style={s.h2}>Everyday Percentage Scenarios</h2>
        <p style={s.p}>Battery at 23% — how many minutes of a 12-hour full charge is that? About 2 hours 46 minutes. Your internet speed test shows 340 Mbps out of a 500 Mbps plan — you are getting 68% of what you pay for. Percentages turn raw numbers into meaningful comparisons.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Percentage Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/percentage-calculator" style={s.cta}>Open Percentage Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/discount-calculator" style={{ color: "#0D9488" }}>Discount Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
