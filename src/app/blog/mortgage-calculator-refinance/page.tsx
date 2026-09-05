import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Should You Refinance Your Mortgage? Calculator & Break-Even Guide",
  description: "Calculate if refinancing saves money. Find your break-even point, compare rates, and understand closing costs with a free mortgage calculator.",
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
        <h1 style={s.h1}>Should You Refinance Your Mortgage? Calculator & Break-Even Guide</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Refinancing your mortgage can save thousands — or cost you money if the timing is wrong. The decision comes down to one number: the break-even point. If you plan to stay in your home longer than the break-even period, refinancing makes sense. If not, the closing costs eat your savings.</p>

        <h2 style={s.h2}>The Break-Even Calculation</h2>
        <p style={s.p}>Break-even = closing costs ÷ monthly savings. If refinancing costs $6,000 in closing costs and saves you $200/month, your break-even is 30 months (2.5 years). If you plan to stay in the home for 5+ more years, refinancing is clearly worth it. If you might sell in 2 years, it is not.</p>

        <h2 style={s.h2}>When Refinancing Makes Sense</h2>
        <p style={s.p}>The old rule was to refinance when rates drop 1% or more. In today's market, even a 0.5% reduction can be worth it on a large mortgage. Other good reasons: switching from an adjustable rate to fixed rate for stability, removing PMI after reaching 20% equity, or shortening your term from 30 to 15 years.</p>

        <h2 style={s.h2}>Hidden Costs to Include</h2>
        <p style={s.p}>Closing costs typically run 2-5% of the loan amount. These include appraisal fees, title insurance, origination fees, and prepaid items. Some lenders offer no-closing-cost refinances, but they roll the costs into a higher interest rate — calculate both options to see which saves more over your remaining time in the home.</p>

        <h2 style={s.h2}>Cash-Out Refinance Considerations</h2>
        <p style={s.p}>A cash-out refinance replaces your mortgage with a larger one and gives you the difference in cash. This can fund home improvements or consolidate high-interest debt. But you are borrowing against your home — if property values drop, you could end up underwater. Only use cash-out refinancing for investments that increase your home's value or eliminate higher-interest debt.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Mortgage Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/mortgage-calculator" style={s.cta}>Open Mortgage Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/loan-calculator" style={{ color: "#0D9488" }}>Loan Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
