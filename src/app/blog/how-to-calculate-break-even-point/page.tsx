import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate Your Break-Even Point (With Free Calculator)",
  description: "Find out exactly how many units you need to sell or how much revenue you need to cover costs. Free break-even calculator with examples.",
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
        <h1 style={s.h1}>How to Calculate Your Break-Even Point (With Free Calculator)</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Every business owner needs to know their break-even point — the exact moment where revenue covers all costs and profit begins. Below this point, you lose money. Above it, every sale adds to profit. Knowing your number lets you set realistic pricing, forecast profitability, and make informed decisions about new products or services.</p>

        <h2 style={s.h2}>The Break-Even Formula</h2>
        <p style={s.p}>Break-Even Units = Fixed Costs / (Selling Price per Unit - Variable Cost per Unit). If your fixed costs are $5,000/month, your product sells for $50, and each unit costs $20 to produce, you break even at 5,000 / (50 - 20) = 167 units per month. Sell 168 units and you make a $30 profit. Sell 150 and you lose $510.</p>

        <h2 style={s.h2}>Fixed vs Variable Costs</h2>
        <p style={s.p}>Fixed costs stay the same regardless of sales volume: rent, insurance, salaries, software subscriptions, loan payments. Variable costs change with each sale: materials, shipping, payment processing fees, sales commissions. Correctly categorizing your costs is essential for an accurate break-even calculation.</p>

        <h2 style={s.h2}>Break-Even for Service Businesses</h2>
        <p style={s.p}>For services, the formula becomes: Break-Even Revenue = Fixed Costs / Contribution Margin Ratio. If your fixed costs are $4,000/month and your contribution margin is 60% (meaning 40 cents of every dollar goes to variable costs), you break even at $4,000 / 0.60 = $6,667 in monthly revenue.</p>

        <h2 style={s.h2}>Using Break-Even for Decisions</h2>
        <p style={s.p}>Before launching a new product, calculate the break-even. Can you realistically sell that many units? Before hiring, calculate the new break-even with the added salary cost. Before renting a bigger space, calculate how much additional revenue the higher rent requires. Break-even analysis turns gut decisions into math.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Percentage Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/percentage-calculator" style={s.cta}>Open Percentage Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/roi-calculator" style={{ color: "#0D9488" }}>ROI Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
