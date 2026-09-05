import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Compound Interest Works Against You: Credit Cards & Debt Explained",
  description: "Understand how compound interest makes credit card debt grow exponentially. See the real cost of minimum payments with a free calculator.",
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
        <h1 style={s.h1}>How Compound Interest Works Against You: Credit Cards & Debt Explained</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Compound interest works both ways. When you invest, it builds wealth. When you owe debt, it builds your balance. Credit card companies count on most people not understanding how compound interest on debt works. A $5,000 credit card balance at 22% APR with minimum payments takes over 20 years to pay off — and costs more than $8,000 in interest alone.</p>

        <h2 style={s.h2}>How Credit Card Interest Compounds</h2>
        <p style={s.p}>Credit card interest compounds daily, not monthly or annually. Your 22% APR becomes a daily rate of 0.0603%. Each day, interest is calculated on your balance including previously accrued interest. This daily compounding means interest accumulates faster than most people expect.</p>

        <h2 style={s.h2}>The Minimum Payment Trap</h2>
        <p style={s.p}>Minimum payments are typically 1-3% of your balance or $25, whichever is greater. On a $5,000 balance at 22% APR, the minimum payment starts around $100. But $91.50 of that goes to interest — only $8.50 reduces your balance. At this rate, paying off the full balance takes over 20 years and costs over $8,000 in interest.</p>

        <h2 style={s.h2}>The Snowball vs Avalanche Methods</h2>
        <p style={s.p}>To escape compound debt, pay more than the minimum. The avalanche method targets the highest-interest debt first — mathematically optimal. The snowball method targets the smallest balance first — psychologically motivating. Both work. The worst strategy is paying minimums on everything.</p>

        <h2 style={s.h2}>Seeing the Real Numbers</h2>
        <p style={s.p}>Use a compound interest calculator in reverse: enter your debt balance, interest rate, and monthly payment to see when you will be debt-free. Then increase the payment and see how much time and money you save. Adding just $50 per month to a $5,000 balance at 22% cuts payoff time from 20 years to about 4 years.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Compound Interest Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/compound-interest-calculator" style={s.cta}>Open Compound Interest Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/loan-calculator" style={{ color: "#0D9488" }}>Loan Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
