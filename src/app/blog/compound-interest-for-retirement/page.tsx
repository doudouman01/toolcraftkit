import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compound Interest for Retirement: How $200/Month Becomes $500K",
  description: "See how compound interest turns small monthly contributions into life-changing wealth over 20-30 years. Free calculator with charts.",
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
        <h1 style={s.h1}>Compound Interest for Retirement: How $200/Month Becomes $500K</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Compound interest is the most powerful force in personal finance. It is the reason someone who starts investing $200 per month at age 25 can retire wealthier than someone who starts investing $500 per month at age 40. Time, not amount, is the biggest factor in building wealth through compounding.</p>

        <h2 style={s.h2}>The Power of Starting Early</h2>
        <p style={s.p}>$200/month at 8% annual return: start at 25, have $702,000 at 65. Start at 35, have $298,000 at 65. Start at 45, have $118,000 at 65. The person who started at 25 invested only $24,000 more ($96,000 vs $72,000 vs $48,000 in contributions) but ended up with $584,000 more. That difference is compound interest at work.</p>

        <h2 style={s.h2}>How Compounding Works</h2>
        <p style={s.p}>In year one, your $2,400 in contributions earns about $192 in interest (at 8%). In year two, you earn interest on $4,800 plus last year's interest. By year 30, your earned interest each year exceeds your annual contributions. At year 40, interest earns more than ten times your annual contribution. The growth is exponential, not linear.</p>

        <h2 style={s.h2}>Real Returns vs Nominal Returns</h2>
        <p style={s.p}>An 8% return sounds great, but inflation averages about 3% historically. Your real return is closer to 5%. A $702,000 portfolio in 40 years has the purchasing power of roughly $250,000 in today's dollars. Plan for real returns, not nominal ones, to avoid disappointment.</p>

        <h2 style={s.h2}>The Impact of Fees</h2>
        <p style={s.p}>A 1% annual fee on a mutual fund sounds small. But on a $200/month investment over 40 years at 8%, that 1% fee costs you about $170,000 in lost growth. Choose low-cost index funds (0.03-0.10% expense ratios) over actively managed funds (0.50-1.50%) — the savings compound just like your returns.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Compound Interest Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/compound-interest-calculator" style={s.cta}>Open Compound Interest Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/salary-calculator" style={{ color: "#0D9488" }}>Salary Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
