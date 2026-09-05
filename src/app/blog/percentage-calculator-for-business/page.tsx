import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate Percentage Increase, Decrease & Markup for Business",
  description: "Master percentage calculations for business: markups, discounts, margins, growth rates, and tax. With examples and a free calculator.",
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
        <h1 style={s.h1}>How to Calculate Percentage Increase, Decrease & Markup for Business</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Percentages are the language of business. Margins, markups, discounts, growth rates, commissions, tax rates — they all run on percentage calculations. Getting them wrong means pricing errors, lost profits, and inaccurate forecasts. Getting them right takes seconds with the right tool.</p>

        <h2 style={s.h2}>Percentage Increase</h2>
        <p style={s.p}>The formula is: ((New Value - Old Value) / Old Value) × 100. If your revenue went from $10,000 to $12,500, the percentage increase is ((12,500 - 10,000) / 10,000) × 100 = 25%. This is essential for measuring growth in revenue, traffic, conversions, and any business metric.</p>

        <h2 style={s.h2}>Percentage Decrease</h2>
        <p style={s.p}>Same formula, but the result is negative. Revenue dropped from $12,500 to $10,000? That is ((10,000 - 12,500) / 12,500) × 100 = -20%. Note that a 25% increase followed by a 20% decrease brings you back to the same number — the percentages are not symmetrical.</p>

        <h2 style={s.h2}>Markup vs Margin — The Critical Difference</h2>
        <p style={s.p}>Markup is calculated on cost: a $10 item sold at $15 has a 50% markup. Margin is calculated on selling price: the same sale has a 33.3% margin. Confusing the two is one of the most expensive mistakes in small business. If you set prices using margin when you meant markup, you are making less profit than you think.</p>

        <h2 style={s.h2}>Quick Percentage Shortcuts</h2>
        <p style={s.p}>10% of any number: move the decimal one place left. 5%: take 10% and halve it. 15%: take 10% plus 5%. 20%: take 10% and double it. 25%: divide by 4. These mental shortcuts are useful for quick estimates — use the calculator for exact figures.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Percentage Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/percentage-calculator" style={s.cta}>Open Percentage Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/profit-margin-calculator" style={{ color: "#0D9488" }}>Profit Margin Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
