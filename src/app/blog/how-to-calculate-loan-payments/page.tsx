import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate Monthly Loan Payments (Formula + Free Calculator)",
  description: "Learn the loan payment formula, understand amortization, and use our free calculator to estimate monthly payments for mortgages, car loans, and personal loans.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
    formula: { background: "#F5F5F4", borderRadius: 8, padding: "16px 20px", fontFamily: "'Courier New', monospace", fontSize: 14, color: "#1C1917", marginBottom: 16, textAlign: "center" as const } as const,
    example: { background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 10, padding: "16px 20px", marginBottom: 16 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>How to Calculate Monthly Loan Payments</h1>
        <p style={s.meta}>August 22, 2026 · 5 min read</p>

        <p style={s.p}>Whether you&apos;re buying a home, financing a car, or taking out a personal loan, understanding how monthly payments are calculated helps you make smarter financial decisions. Here&apos;s how the math works — plus a free calculator to run the numbers instantly.</p>

        <h2 style={s.h2}>The Loan Payment Formula</h2>
        <p style={s.p}>Fixed-rate loans use the standard amortization formula:</p>
        <div style={s.formula}>M = P × [r(1+r)ⁿ] / [(1+r)ⁿ – 1]</div>
        <p style={s.p}>Where <strong>M</strong> is the monthly payment, <strong>P</strong> is the loan principal (amount borrowed), <strong>r</strong> is the monthly interest rate (annual rate ÷ 12), and <strong>n</strong> is the total number of payments (years × 12).</p>

        <h2 style={s.h2}>Example: $250,000 Mortgage at 6.5%</h2>
        <div style={s.example}>
          <p style={{ fontSize: 14, color: "#1C1917", lineHeight: 1.7, margin: 0 }}>
            <strong>Principal:</strong> $250,000<br />
            <strong>Rate:</strong> 6.5% annual → 0.5417% monthly<br />
            <strong>Term:</strong> 30 years → 360 payments<br />
            <strong>Monthly Payment:</strong> $1,580.17<br />
            <strong>Total Interest Paid:</strong> $318,861<br />
            <strong>Total Amount Paid:</strong> $568,861
          </p>
        </div>
        <p style={s.p}>That means you&apos;ll pay more in interest ($318,861) than the original loan amount ($250,000) over 30 years. This is why even small rate differences matter enormously over the life of a loan.</p>

        <h2 style={s.h2}>How Amortization Works</h2>
        <p style={s.p}>In the early years of a loan, most of your monthly payment goes toward interest. Over time, the balance shifts and more goes toward paying down the principal. This is why paying extra toward principal in the early years can save you tens of thousands of dollars in interest.</p>

        <h2 style={s.h2}>Tips to Reduce Your Total Cost</h2>
        <p style={s.p}><strong>Make extra payments.</strong> Even $100/month extra on a $250,000 mortgage can save you over $50,000 in interest and shorten your loan by 5+ years.</p>
        <p style={s.p}><strong>Choose a shorter term.</strong> A 15-year mortgage has higher monthly payments but dramatically lower total interest. On $250,000 at 6.5%, you&apos;d save about $200,000 in total interest compared to a 30-year term.</p>
        <p style={s.p}><strong>Shop for rates.</strong> A 0.5% lower rate on a $250,000 loan saves roughly $30,000 over 30 years.</p>

        <h2 style={s.h2}>Calculate Your Loan Payment</h2>
        <p style={s.p}>Use our free Loan Calculator to plug in your numbers and see the monthly payment, total interest, and full amortization schedule.</p>
        <Link href="/tools/loan-calculator" style={s.cta}>Open Loan Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Planning an investment instead? Check our <Link href="/tools/roi-calculator" style={{ color: "#0D9488" }}>ROI Calculator</Link> to compare returns across different opportunities.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
