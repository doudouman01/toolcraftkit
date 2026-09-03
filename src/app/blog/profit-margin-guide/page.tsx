import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate Profit Margin (With Formula and Examples)",
  description: "Learn the difference between gross, net, and operating profit margin. Includes formulas, industry benchmarks, and a free profit margin calculator.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
    table: { width: "100%", borderCollapse: "collapse" as const, marginBottom: 20, fontSize: 14 },
    th: { padding: "10px 12px", background: "#F5F5F4", textAlign: "left" as const, fontWeight: 600, fontSize: 13, borderBottom: "2px solid #E7E5E4" },
    td: { padding: "10px 12px", borderBottom: "1px solid #F5F5F4" },
    code: { background: "#F5F5F4", padding: "2px 8px", borderRadius: 4, fontSize: 14, fontFamily: "monospace" } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>How to Calculate Profit Margin (With Formula and Examples)</h1>
        <p style={s.meta}>September 3, 2026 · 5 min read</p>

        <p style={s.p}>Profit margin tells you how much money your business actually keeps from every dollar of revenue. It is one of the most important metrics for any business — whether you are running a freelance operation, an e-commerce store, or a large company. A healthy margin means your pricing and costs are in balance. A shrinking margin is an early warning sign.</p>

        <h2 style={s.h2}>Three Types of Profit Margin</h2>
        <p style={s.p}><strong>Gross profit margin</strong> measures revenue minus the direct cost of goods sold (COGS). Formula: <span style={s.code}>(Revenue - COGS) / Revenue × 100</span>. This tells you how efficiently you produce or source your products.</p>
        <p style={s.p}><strong>Operating profit margin</strong> subtracts operating expenses (rent, salaries, marketing) from gross profit. Formula: <span style={s.code}>(Revenue - COGS - Operating Expenses) / Revenue × 100</span>. This shows how well you run the business day to day.</p>
        <p style={s.p}><strong>Net profit margin</strong> is the bottom line — revenue minus all costs including taxes and interest. Formula: <span style={s.code}>Net Income / Revenue × 100</span>. This is what actually stays in your pocket.</p>

        <h2 style={s.h2}>Profit Margin Benchmarks by Industry</h2>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}>Industry</th><th style={s.th}>Average Net Margin</th></tr>
          </thead>
          <tbody>
            {[
              ["Software / SaaS", "20–30%"],
              ["Consulting / Services", "15–25%"],
              ["E-commerce", "5–15%"],
              ["Restaurants", "3–9%"],
              ["Retail", "2–5%"],
              ["Manufacturing", "5–10%"],
              ["Construction", "3–7%"],
              ["Healthcare", "5–15%"],
            ].map(([industry, margin], i) => (
              <tr key={i}><td style={s.td}>{industry}</td><td style={s.td}>{margin}</td></tr>
            ))}
          </tbody>
        </table>
        <p style={s.p}>These are general ranges. Your specific margin depends on your niche, pricing strategy, cost structure, and scale. The key is to track your margin over time and understand what drives it.</p>

        <h2 style={s.h2}>Example: Calculating Margin for an Online Store</h2>
        <p style={s.p}>You sell handmade candles. Revenue last month: $8,000. Cost of materials: $2,400. Shipping costs: $800. Marketing: $600. Platform fees: $400. Other expenses: $300.</p>
        <p style={s.p}>Gross margin: ($8,000 - $3,200) / $8,000 = 60%. Net margin: ($8,000 - $4,500) / $8,000 = 43.75%. That is a healthy margin — you keep $3,500 from $8,000 in sales.</p>

        <h2 style={s.h2}>Margin vs. Markup: The Critical Difference</h2>
        <p style={s.p}>Margin and markup are not the same thing, and confusing them can cost you money. If a product costs $60 and you sell it for $100, your <strong>markup</strong> is 66.7% (you added $40 on top of $60). But your <strong>margin</strong> is 40% ($40 profit out of $100 revenue). Always price using margin, not markup, to ensure profitability.</p>

        <h2 style={s.h2}>How to Improve Your Profit Margin</h2>
        <p style={s.p}><strong>Raise prices strategically</strong> — even a 5% price increase can dramatically improve margins if volume stays stable. <strong>Reduce cost of goods</strong> — negotiate with suppliers, buy in bulk, or find alternative materials. <strong>Cut overhead</strong> — audit subscriptions, renegotiate rent, automate repetitive tasks. <strong>Focus on high-margin products</strong> — identify which products or services deliver the best margin and prioritize them.</p>

        <h2 style={s.h2}>Calculate Your Margin Now</h2>
        <p style={s.p}>Use our free Profit Margin Calculator to instantly compute your gross margin, markup percentage, and revenue breakdown. Enter your cost and selling price to see the numbers.</p>
        <Link href="/tools/profit-margin" style={s.cta}>Open Profit Margin Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Want to understand your return on investment? Try our <Link href="/tools/roi-calculator" style={{ color: "#0D9488" }}>ROI Calculator</Link> for a complete performance breakdown.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
