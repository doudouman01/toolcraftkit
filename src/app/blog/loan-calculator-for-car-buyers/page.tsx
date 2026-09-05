import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Loan Calculator: How to Calculate Monthly Payments Before You Buy",
  description: "Calculate monthly car payments, total interest, and compare loan terms before visiting the dealership. Free auto loan calculator.",
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
        <h1 style={s.h1}>Car Loan Calculator: How to Calculate Monthly Payments Before You Buy</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Walking into a car dealership without knowing your numbers is the most expensive mistake buyers make. The dealer structures the deal around monthly payments, which obscures the total cost. Knowing your exact monthly payment before you walk in gives you negotiating power and prevents overspending.</p>

        <h2 style={s.h2}>How Car Loan Math Works</h2>
        <p style={s.p}>Your monthly payment depends on three factors: the loan amount (vehicle price minus down payment minus trade-in value), the interest rate (APR), and the loan term (typically 36, 48, 60, or 72 months). A $30,000 car with $5,000 down at 6.5% APR for 60 months costs $490/month. Total paid: $29,400 — meaning you pay $4,400 in interest.</p>

        <h2 style={s.h2}>How Loan Term Affects Total Cost</h2>
        <p style={s.p}>A longer loan term means lower monthly payments but significantly more interest. That same $25,000 loan at 6.5%: 36 months = $766/month ($2,576 total interest). 60 months = $490/month ($4,400 total interest). 72 months = $423/month ($5,456 total interest). The 72-month loan costs $2,880 more than the 36-month loan.</p>

        <h2 style={s.h2}>The Down Payment Advantage</h2>
        <p style={s.p}>A larger down payment reduces your loan amount, your monthly payment, and your total interest. It also reduces the risk of being upside down — owing more than the car is worth. Aim for at least 20% down on a new car and 10% on a used car.</p>

        <h2 style={s.h2}>What the Dealer Does Not Tell You</h2>
        <p style={s.p}>The dealer may offer a low monthly payment by extending the term to 72 or 84 months. This makes an expensive car look affordable while dramatically increasing total cost. Always compare loans by total amount paid, not monthly payment. Run the numbers yourself before entering the dealership.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Loan Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/loan-calculator" style={s.cta}>Open Loan Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/percentage-calculator" style={{ color: "#0D9488" }}>Percentage Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
