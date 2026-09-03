import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate Percentages: Every Formula You Need (With Examples)",
  description: "Master percentage calculations — discounts, tips, tax, markup, percentage change, and more. Simple formulas with real examples and a free calculator.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
    code: { background: "#F5F5F4", padding: "2px 8px", borderRadius: 4, fontSize: 14, fontFamily: "monospace" } as const,
    table: { width: "100%", borderCollapse: "collapse" as const, marginBottom: 20, fontSize: 14 },
    th: { padding: "10px 12px", background: "#F5F5F4", textAlign: "left" as const, fontWeight: 600, fontSize: 13, borderBottom: "2px solid #E7E5E4" },
    td: { padding: "10px 12px", borderBottom: "1px solid #F5F5F4" },
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>How to Calculate Percentages: Every Formula You Need</h1>
        <p style={s.meta}>September 3, 2026 · 5 min read</p>

        <p style={s.p}>Percentages show up everywhere — shopping discounts, tax rates, tips, test scores, business growth, investment returns. Yet many people struggle with percentage calculations because there are several different types, and each requires a slightly different approach. This guide covers every common percentage formula with clear examples.</p>

        <h2 style={s.h2}>The 6 Most Common Percentage Calculations</h2>

        <p style={s.p}><strong>1. What is X% of Y?</strong> Formula: <span style={s.code}>Y × (X / 100)</span>. Example: What is 15% of $80? → $80 × 0.15 = $12. Use this for tips, taxes, and discounts.</p>

        <p style={s.p}><strong>2. X is what percent of Y?</strong> Formula: <span style={s.code}>(X / Y) × 100</span>. Example: 35 is what percent of 200? → (35 / 200) × 100 = 17.5%. Use this to find your score on a test, your savings rate, or what portion of your budget goes to rent.</p>

        <p style={s.p}><strong>3. Percentage increase</strong> Formula: <span style={s.code}>((New - Old) / Old) × 100</span>. Example: Revenue went from $4,000 to $5,200 → ((5,200 - 4,000) / 4,000) × 100 = 30% increase.</p>

        <p style={s.p}><strong>4. Percentage decrease</strong> Same formula, result is negative. Example: Price dropped from $50 to $35 → ((35 - 50) / 50) × 100 = -30% (a 30% decrease).</p>

        <p style={s.p}><strong>5. Find the original price before a discount</strong> Formula: <span style={s.code}>Sale Price / (1 - Discount%/100)</span>. Example: You paid $68 after a 15% discount. Original price: $68 / (1 - 0.15) = $80.</p>

        <p style={s.p}><strong>6. Add or remove tax</strong> To add tax: <span style={s.code}>Price × (1 + Tax%/100)</span>. To find the pre-tax price: <span style={s.code}>Total / (1 + Tax%/100)</span>. Example: $50 item with 8.5% tax → $50 × 1.085 = $54.25.</p>

        <h2 style={s.h2}>Quick Percentage Shortcuts</h2>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}>To find...</th><th style={s.th}>Shortcut</th></tr>
          </thead>
          <tbody>
            {[
              ["10% of any number", "Move the decimal one place left"],
              ["5% of any number", "Find 10%, then halve it"],
              ["1% of any number", "Move the decimal two places left"],
              ["20% of any number", "Find 10%, then double it"],
              ["25% of any number", "Divide by 4"],
              ["33% of any number", "Divide by 3"],
              ["50% of any number", "Divide by 2"],
              ["15% tip", "Find 10% + half of that"],
            ].map(([find, shortcut], i) => (
              <tr key={i}><td style={s.td}>{find}</td><td style={s.td}>{shortcut}</td></tr>
            ))}
          </tbody>
        </table>

        <h2 style={s.h2}>Common Percentage Mistakes</h2>
        <p style={s.p}><strong>A 50% increase followed by a 50% decrease does not return to the original.</strong> If $100 increases by 50%, it becomes $150. A 50% decrease from $150 gives $75 — not $100. This is why understanding the base matters.</p>
        <p style={s.p}><strong>Percentage points vs. percentages.</strong> If interest goes from 5% to 7%, that is a 2 percentage point increase — but a 40% increase in the rate itself. These are very different things.</p>

        <h2 style={s.h2}>Calculate Any Percentage Instantly</h2>
        <p style={s.p}>Use our free Percentage Calculator for all six types of calculations. Enter your numbers and get instant results with step-by-step breakdowns.</p>
        <Link href="/tools/percentage-calculator" style={s.cta}>Open Percentage Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Need to calculate a discount? Our <Link href="/tools/discount-calculator" style={{ color: "#0D9488" }}>Discount Calculator</Link> handles sale pricing, and the <Link href="/tools/tip-calculator" style={{ color: "#0D9488" }}>Tip Calculator</Link> splits tips for any group size.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
