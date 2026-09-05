import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Build and Improve Your Credit Score: A Practical Guide",
  description: "Understand what affects your credit score and actionable steps to improve it. Payment history, utilization, and credit age explained.",
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
        <h1 style={s.h1}>How to Build and Improve Your Credit Score: A Practical Guide</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Your credit score affects interest rates on mortgages, car loans, and credit cards. It influences insurance premiums and even rental applications. A difference of 100 points can mean tens of thousands of dollars in interest over a lifetime. Understanding what affects your score and how to improve it is one of the most financially impactful things you can learn.</p>

        <h2 style={s.h2}>What Affects Your Score</h2>
        <p style={s.p}>Payment history (35%): paying bills on time is the single biggest factor. Credit utilization (30%): the percentage of your available credit you are using. Credit history length (15%): how long your accounts have been open. New credit inquiries (10%): recent applications for credit. Credit mix (10%): having different types of credit (cards, loans, mortgage).</p>

        <h2 style={s.h2}>Quick Wins</h2>
        <p style={s.p}>Pay every bill on time — set up autopay for at least the minimum payment. Reduce credit card balances below 30% of your limit (below 10% is ideal). Do not close old credit cards — the account age helps your score. Become an authorized user on a family member's old, well-managed card.</p>

        <h2 style={s.h2}>Common Mistakes</h2>
        <p style={s.p}>Closing old credit cards (reduces average account age and available credit). Applying for multiple credit cards in a short period (each application is a hard inquiry). Maxing out cards even if you pay them off monthly (utilization is measured at statement closing, not after payment). Ignoring errors on your credit report (dispute them with the bureau).</p>

        <h2 style={s.h2}>Timeline for Improvement</h2>
        <p style={s.p}>Credit scores do not change overnight. Most improvements take 3-6 months to appear. Payment history builds over years. If you are starting from scratch, getting a secured credit card and using it responsibly for 6 months establishes a baseline. From there, consistent on-time payments and low utilization steadily increase your score.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Percentage Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/percentage-calculator" style={s.cta}>Open Percentage Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/loan-calculator" style={{ color: "#0D9488" }}>Loan Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
