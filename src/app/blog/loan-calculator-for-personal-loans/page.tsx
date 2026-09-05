import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Loan Calculator: Compare Rates & Find the Best Deal",
  description: "Calculate personal loan payments, compare multiple offers, and understand how interest rates and terms affect your total cost.",
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
        <h1 style={s.h1}>Personal Loan Calculator: Compare Rates & Find the Best Deal</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Personal loans range from debt consolidation to home improvements to emergency expenses. Interest rates vary wildly — from 6% for excellent credit to 36% for subprime borrowers. The difference between a good rate and a bad rate on a $15,000 loan can cost you thousands of dollars. Always compare before you borrow.</p>

        <h2 style={s.h2}>How to Compare Loan Offers</h2>
        <p style={s.p}>Do not compare monthly payments — compare APR (Annual Percentage Rate), which includes fees. A loan with a lower interest rate but high origination fees can cost more than a slightly higher rate with no fees. Also compare total amount repaid over the life of the loan.</p>

        <h2 style={s.h2}>Credit Score Impact</h2>
        <p style={s.p}>Your credit score determines your interest rate. Excellent credit (750+) gets rates of 6-10%. Good credit (670-749) gets 10-15%. Fair credit (580-669) gets 15-25%. Poor credit (below 580) gets 25-36%. Improving your credit score by even 50 points before applying can save hundreds or thousands in interest.</p>

        <h2 style={s.h2}>Fixed vs Variable Rates</h2>
        <p style={s.p}>Fixed rate loans keep the same payment throughout the term — predictable and safe. Variable rate loans start lower but can increase with market rates. For loans under 3 years, variable rates often save money. For longer terms, fixed rates protect you from rising rates.</p>

        <h2 style={s.h2}>When to Avoid Personal Loans</h2>
        <p style={s.p}>Never take a personal loan for discretionary spending — vacations, electronics, or lifestyle upgrades. The interest makes everything more expensive. Personal loans make sense for debt consolidation (if the new rate is lower than existing debt), necessary home repairs, and genuine emergencies.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Loan Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/loan-calculator" style={s.cta}>Open Loan Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/compound-interest-calculator" style={{ color: "#0D9488" }}>Compound Interest Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
