import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Calculator for First-Time Home Buyers: What Can You Afford?",
  description: "Calculate your mortgage payment, understand down payments, PMI, and interest rates. Essential guide for first-time home buyers in 2026.",
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
        <h1 style={s.h1}>Mortgage Calculator for First-Time Home Buyers: What Can You Afford?</h1>
        <p style={s.meta}>September 5, 2026 · 6 min read</p>

        <p style={s.p}>Buying your first home is the biggest financial decision most people make. The monthly payment you see advertised is rarely the full cost — property taxes, insurance, PMI, and maintenance all add up. Before you start house hunting, you need to know exactly what you can afford, not what a lender says you can borrow.</p>

        <h2 style={s.h2}>What Is Included in a Mortgage Payment</h2>
        <p style={s.p}>Your monthly payment has four components (PITI): Principal (the loan amount being repaid), Interest (the cost of borrowing), Taxes (property taxes, usually escrowed), and Insurance (homeowners insurance, also escrowed). If your down payment is less than 20%, add PMI (Private Mortgage Insurance) — typically 0.5% to 1% of the loan amount annually.</p>

        <h2 style={s.h2}>The 28/36 Rule</h2>
        <p style={s.p}>Lenders use the 28/36 rule: your mortgage payment should not exceed 28% of your gross monthly income, and your total debt payments should not exceed 36%. If you earn $6,000/month, your mortgage payment should be under $1,680, and all debt payments (mortgage + car + student loans + credit cards) should be under $2,160.</p>

        <h2 style={s.h2}>Down Payment Impact</h2>
        <p style={s.p}>20% down eliminates PMI and gets the best interest rates. 10% down is common but adds PMI. 3-5% down is possible with FHA loans but means higher monthly payments and more interest over the life of the loan. On a $350,000 home, the difference between 5% and 20% down is about $250/month in payments.</p>

        <h2 style={s.h2}>Interest Rates Matter More Than You Think</h2>
        <p style={s.p}>On a $300,000 30-year mortgage, the difference between 6% and 7% interest is about $200/month — and $72,000 over the life of the loan. A 0.25% rate reduction saves about $50/month or $18,000 total. Shopping multiple lenders and improving your credit score before applying pays off enormously.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Mortgage Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/mortgage-calculator" style={s.cta}>Open Mortgage Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/compound-interest-calculator" style={{ color: "#0D9488" }}>Compound Interest Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
