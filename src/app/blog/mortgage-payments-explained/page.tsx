import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate Mortgage Payments (2026 Guide + Calculator)",
  description: "Understand how mortgage payments are calculated, what affects your monthly cost, and how extra payments save you thousands. Free mortgage calculator included.",
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
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>How to Calculate Mortgage Payments (2026 Guide)</h1>
        <p style={s.meta}>September 3, 2026 · 6 min read</p>

        <p style={s.p}>Your mortgage payment is likely the largest monthly expense you will ever have. Understanding exactly how it is calculated — and what you can do to reduce it — can save you tens of thousands of dollars over the life of your loan. This guide breaks down the math, the variables, and the strategies that matter.</p>

        <h2 style={s.h2}>What Makes Up a Mortgage Payment</h2>
        <p style={s.p}>A typical mortgage payment has four components, often called <strong>PITI</strong>: <strong>Principal</strong> (the amount that reduces your loan balance), <strong>Interest</strong> (the cost of borrowing), <strong>Taxes</strong> (property tax, usually escrowed), and <strong>Insurance</strong> (homeowner&apos;s insurance and PMI if applicable). The principal and interest portion is fixed for a fixed-rate mortgage, while taxes and insurance may change annually.</p>

        <h2 style={s.h2}>How Interest Rate Affects Your Payment</h2>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}>Rate</th><th style={s.th}>Monthly P&I</th><th style={s.th}>Total Interest (30yr)</th></tr>
          </thead>
          <tbody>
            {[
              ["5.0%", "$1,610", "$279,767"],
              ["5.5%", "$1,703", "$313,212"],
              ["6.0%", "$1,799", "$347,515"],
              ["6.5%", "$1,896", "$382,633"],
              ["7.0%", "$1,995", "$418,527"],
            ].map(([rate, monthly, total], i) => (
              <tr key={i}><td style={s.td}>{rate}</td><td style={s.td}>{monthly}</td><td style={s.td}>{total}</td></tr>
            ))}
          </tbody>
        </table>
        <p style={s.p}>Based on a $300,000 loan over 30 years. A 2% difference in rate costs you nearly $140,000 in additional interest over the life of the loan. Shopping for the best rate is one of the most valuable things you can do.</p>

        <h2 style={s.h2}>30-Year vs. 15-Year Mortgage</h2>
        <p style={s.p}>A 15-year mortgage has higher monthly payments but saves you an enormous amount in interest. On a $300,000 loan at 6%, the 30-year option costs $1,799/month and $347,515 in total interest. The 15-year option costs $2,532/month but only $155,683 in total interest — a savings of nearly $192,000. If you can afford the higher payment, a shorter term is almost always the better financial decision.</p>

        <h2 style={s.h2}>The Impact of a Down Payment</h2>
        <p style={s.p}>A larger down payment reduces your loan amount, your monthly payment, and your total interest — and may eliminate the need for private mortgage insurance (PMI), which typically costs 0.5% to 1% of the loan amount per year. Putting 20% down instead of 5% on a $400,000 home means borrowing $320,000 instead of $380,000 and avoiding $1,900 to $3,800 per year in PMI.</p>

        <h2 style={s.h2}>How Extra Payments Save You Thousands</h2>
        <p style={s.p}>Adding even a small amount to your monthly payment can dramatically reduce your loan term and total interest. On a $300,000 loan at 6% over 30 years, adding just $200 per month to your payment would save you approximately $80,000 in interest and pay off the loan 7 years early. The extra payment goes entirely toward principal, which reduces the base on which future interest is calculated.</p>

        <h2 style={s.h2}>What to Check Before You Commit</h2>
        <p style={s.p}><strong>Total cost of the loan</strong> — not just the monthly payment but the total amount you will pay over the full term. <strong>Break-even on points</strong> — if the lender offers to buy down your rate with points, calculate how many months it takes to recoup the upfront cost. <strong>Prepayment penalties</strong> — make sure your loan allows extra payments without fees. <strong>Escrow requirements</strong> — understand whether taxes and insurance are included in your quoted payment.</p>

        <h2 style={s.h2}>Calculate Your Mortgage</h2>
        <p style={s.p}>Use our free Mortgage Calculator to estimate your monthly payment, see the full amortization schedule, and understand how much you will pay in total interest.</p>
        <Link href="/tools/mortgage-calculator" style={s.cta}>Open Mortgage Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Need to compare loan options? Our <Link href="/tools/loan-calculator" style={{ color: "#0D9488" }}>Loan Calculator</Link> handles any type of loan, and our <Link href="/tools/compound-interest" style={{ color: "#0D9488" }}>Compound Interest Calculator</Link> shows how your savings grow over time.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
