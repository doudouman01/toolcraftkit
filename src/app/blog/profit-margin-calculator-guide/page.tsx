import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profit Margin Calculator: Markup, Margin & Revenue Explained",
  description: "Calculate gross margin, net margin, and markup. Understand the difference and why confusing them costs businesses money.",
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
        <h1 style={s.h1}>Profit Margin Calculator: Markup, Margin & Revenue Explained</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Profit margin is the most important number in your business — it tells you how much of every dollar in revenue actually becomes profit. A business doing $1 million in revenue with a 5% margin makes $50,000. A business doing $500,000 with a 20% margin makes $100,000. Revenue is vanity; margin is sanity.</p>

        <h2 style={s.h2}>Gross Margin vs Net Margin</h2>
        <p style={s.p}>Gross margin = (Revenue - Cost of Goods Sold) / Revenue × 100. This measures the profitability of your product or service before overhead. Net margin = (Revenue - All Expenses) / Revenue × 100. This measures your actual bottom-line profitability after all costs including rent, salaries, marketing, and taxes.</p>

        <h2 style={s.h2}>Markup vs Margin — Get This Right</h2>
        <p style={s.p}>A product costs $60 and sells for $100. The markup is 66.7% ((100-60)/60). The margin is 40% ((100-60)/100). Same sale, completely different percentages depending on whether you divide by cost (markup) or price (margin). Confusing these is one of the most common and expensive mistakes in business.</p>

        <h2 style={s.h2}>Industry Benchmarks</h2>
        <p style={s.p}>Software/SaaS: 70-90% gross margin. Retail: 25-50% gross margin. Restaurants: 60-70% gross margin on food. Manufacturing: 25-35% gross margin. Professional services: 50-70% gross margin. Your margin should be at or above your industry average — if it is below, you have a pricing or cost problem.</p>

        <h2 style={s.h2}>Improving Your Margin</h2>
        <p style={s.p}>Raise prices — even a 5% price increase can dramatically improve margins if volume stays stable. Reduce cost of goods sold through better sourcing, bulk purchasing, or process efficiency. Cut overhead expenses that do not generate revenue. Focus on higher-margin products or services in your mix.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Profit Margin Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/profit-margin-calculator" style={s.cta}>Open Profit Margin Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/percentage-calculator" style={{ color: "#0D9488" }}>Percentage Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
