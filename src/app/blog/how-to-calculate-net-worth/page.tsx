import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate Your Net Worth (And Why It Matters)",
  description: "Calculate your personal net worth step by step. Assets minus liabilities equals your financial position. Free guide with examples.",
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
        <h1 style={s.h1}>How to Calculate Your Net Worth (And Why It Matters)</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Net worth is the single best measure of your overall financial health. It is the difference between what you own and what you owe. Unlike income, which measures money flowing in, net worth measures money you have built. Tracking it over time shows whether your financial decisions are moving you forward or backward.</p>

        <h2 style={s.h2}>Assets: What You Own</h2>
        <p style={s.p}>Cash and savings accounts. Investment accounts (stocks, bonds, mutual funds, retirement accounts). Real estate (current market value of property you own). Vehicles (current resale value, not what you paid). Business equity. Valuable personal property (jewelry, art, collectibles — at realistic resale value, not replacement cost).</p>

        <h2 style={s.h2}>Liabilities: What You Owe</h2>
        <p style={s.p}>Mortgage balance remaining. Student loans. Car loans. Credit card balances. Personal loans. Medical debt. Any other money you owe to anyone. Use the current balance, not the original amount. A $200,000 mortgage with $150,000 remaining counts as $150,000 in liabilities.</p>

        <h2 style={s.h2}>The Calculation</h2>
        <p style={s.p}>Net Worth = Total Assets - Total Liabilities. If you own $300,000 in assets and owe $180,000, your net worth is $120,000. If your net worth is negative, that simply means you owe more than you own — common for recent graduates or new homeowners. The goal is to increase net worth over time.</p>

        <h2 style={s.h2}>Tracking Progress</h2>
        <p style={s.p}>Calculate your net worth quarterly or monthly. An increasing trend means your financial decisions are working. A decreasing trend signals a problem — you are spending more than you earn, your investments are declining, or your debt is growing. Use this as a financial health check, not a source of stress.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Percentage Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/percentage-calculator" style={s.cta}>Open Percentage Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/compound-interest-calculator" style={{ color: "#0D9488" }}>Compound Interest Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
