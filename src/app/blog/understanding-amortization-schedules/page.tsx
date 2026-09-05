import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Understanding Amortization Schedules: Where Your Loan Payments Go",
  description: "Learn how amortization works and why most of your early payments go to interest. See how extra payments save thousands on mortgages and loans.",
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
        <h1 style={s.h1}>Understanding Amortization Schedules: Where Your Loan Payments Go</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>When you make a $1,500 monthly mortgage payment, you might assume most of it goes toward paying off your house. In reality, during the early years, over 70% of each payment goes to interest. Understanding how amortization works reveals why early extra payments have such a dramatic impact on total interest paid.</p>

        <h2 style={s.h2}>How Amortization Works</h2>
        <p style={s.p}>Amortization spreads a loan into equal monthly payments over a fixed term. Each payment covers interest on the current balance plus a portion of principal. Early in the loan, the balance is high, so interest takes a larger share. As the balance decreases, more of each payment goes to principal. The total payment stays the same, but the split between interest and principal shifts over time.</p>

        <h2 style={s.h2}>An Example</h2>
        <p style={s.p}>A $300,000 mortgage at 6.5% for 30 years has a monthly payment of $1,896. In month one, $1,625 goes to interest and only $271 goes to principal. In month 180 (year 15), $1,059 goes to interest and $837 goes to principal. In the final year, nearly all of each payment goes to principal. Total interest paid over 30 years: $382,633 — more than the original loan.</p>

        <h2 style={s.h2}>The Power of Extra Payments</h2>
        <p style={s.p}>Adding just $200/month extra to that $300,000 mortgage saves approximately $85,000 in interest and pays off the loan 6 years early. One extra payment per year (a 13th payment) saves about $65,000 and cuts 4.5 years off the term. Early extra payments have more impact because they reduce the principal that future interest is calculated on.</p>

        <h2 style={s.h2}>Strategies for Paying Less Interest</h2>
        <p style={s.p}>Make biweekly payments (26 half-payments per year equals 13 full payments). Round up payments to the next hundred. Apply windfall money (tax refunds, bonuses) to principal. Refinance to a shorter term if rates are favorable. Every dollar of extra principal payment saves roughly $2 in future interest on a 30-year mortgage.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Loan Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/loan-calculator" style={s.cta}>Open Loan Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/mortgage-calculator" style={{ color: "#0D9488" }}>Mortgage Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
