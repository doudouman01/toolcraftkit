import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Set Discount Pricing Without Killing Your Margins",
  description: "Learn how to offer strategic discounts that drive sales without destroying your profit margins. Calculator for breakeven discount analysis.",
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
        <h1 style={s.h1}>How to Set Discount Pricing Without Killing Your Margins</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Discounting is the fastest way to increase short-term sales — and the fastest way to erode your brand and margins if done wrong. The key is knowing exactly how much volume increase you need to make a discount profitable, and setting discounts strategically rather than reactively.</p>

        <h2 style={s.h2}>The Breakeven Volume Calculation</h2>
        <p style={s.p}>If your margin is 40% and you offer a 10% discount, you need to sell 33% more units just to make the same profit. At a 20% discount, you need 100% more volume. At 30% off, you need to triple your sales. Most businesses never calculate this — they just see revenue go up and assume the discount worked.</p>

        <h2 style={s.h2}>Strategic Discount Types</h2>
        <p style={s.p}>Volume discounts reward larger purchases without lowering your base price. Time-limited discounts create urgency without permanent price erosion. Bundle discounts move slow inventory alongside popular products. First-purchase discounts acquire customers at a known cost. Each serves a different business goal.</p>

        <h2 style={s.h2}>Psychological Pricing</h2>
        <p style={s.p}>Odd pricing ($29.99 vs $30) still works — studies show a 2-8% increase in sales. For discounts, showing the dollar amount saved works better for items over $100 (save $25), while percentage works better under $100 (save 25%). Always show the original price alongside the discount for anchoring.</p>

        <h2 style={s.h2}>When NOT to Discount</h2>
        <p style={s.p}>Never discount to match a competitor who has lower costs — you will lose that war. Never discount a premium product unless you are clearing end-of-life inventory. Never train customers to wait for sales by discounting too frequently. If customers only buy during sales, your regular pricing is wrong.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Discount Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/discount-calculator" style={s.cta}>Open Discount Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/profit-margin-calculator" style={{ color: "#0D9488" }}>Profit Margin Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
