import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Income Tax by State: How Your Location Affects Your Tax Bill (2026)",
  description: "Compare state income tax rates across the US. See how much you'd save by living in a no-tax state vs a high-tax state.",
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
        <h1 style={s.h1}>Income Tax by State: How Your Location Affects Your Tax Bill (2026)</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Where you live significantly impacts how much tax you pay. Nine US states have no income tax at all, while California's top rate hits 13.3%. For a high earner, the difference between living in Texas and California can be $20,000 or more per year in state taxes alone.</p>

        <h2 style={s.h2}>States With No Income Tax</h2>
        <p style={s.p}>Nine states charge no personal income tax: Alaska, Florida, Nevada, New Hampshire (dividends and interest only until 2027), South Dakota, Tennessee, Texas, Washington, and Wyoming. These states fund services through sales taxes, property taxes, or natural resource revenue instead.</p>

        <h2 style={s.h2}>Highest Tax States</h2>
        <p style={s.p}>California tops the list at 13.3% for income over $1 million. Hawaii follows at 11%, New Jersey at 10.75%, Oregon at 9.9%, and Minnesota at 9.85%. New York City residents face a combined state and city rate that can exceed 14%. These rates apply only to income above the threshold — they are marginal rates, not effective rates.</p>

        <h2 style={s.h2}>The Total Tax Picture</h2>
        <p style={s.p}>A no-income-tax state is not automatically cheaper. Texas has no income tax but has high property taxes (1.6-2.5% of home value). Washington has no income tax but has a 6.5% state sales tax (up to 10.5% with local). Tennessee has no income tax but has an 9.75% combined sales tax rate. Compare total tax burden, not just income tax.</p>

        <h2 style={s.h2}>Remote Work and Tax Implications</h2>
        <p style={s.p}>If you work remotely for a company in another state, tax rules get complicated. Some states tax you based on where you work, others based on where your employer is located. A few states have reciprocity agreements. If you moved during the year, you may owe taxes in both states. Consult a tax professional for multi-state situations.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Income Tax Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/income-tax-calculator" style={s.cta}>Open Income Tax Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/salary-calculator" style={{ color: "#0D9488" }}>Salary Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
