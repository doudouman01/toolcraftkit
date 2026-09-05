import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI Calculator for Personal Investments: Stocks, Real Estate & Side Projects",
  description: "Calculate return on investment for stocks, rental properties, business ventures, and personal projects. Free calculator with CAGR.",
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
        <h1 style={s.h1}>ROI Calculator for Personal Investments: Stocks, Real Estate & Side Projects</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Every investment decision comes down to one question: what return will I get for my money and time? Whether you are evaluating a stock portfolio, a rental property, a side business, or even a course or certification, ROI gives you a clear number to compare options.</p>

        <h2 style={s.h2}>Simple ROI vs Annualized ROI</h2>
        <p style={s.p}>Simple ROI tells you the total return: you invested $10,000 and now have $15,000, so your ROI is 50%. But over what period? Annualized ROI (CAGR) accounts for time. A 50% return over 5 years is 8.45% per year. A 50% return over 2 years is 22.5% per year. Always compare investments on annualized terms.</p>

        <h2 style={s.h2}>Real Estate ROI</h2>
        <p style={s.p}>Rental property ROI includes rental income, appreciation, tax benefits, and mortgage paydown — minus expenses like maintenance, property taxes, insurance, and management. Cash-on-cash return measures income relative to your down payment, not the full property value. A property with 8% cash-on-cash return on a $50,000 down payment generates $4,000 per year in cash flow.</p>

        <h2 style={s.h2}>Stock Market ROI</h2>
        <p style={s.p}>The S&P 500 has returned roughly 10% annually over the long term (7% after inflation). Individual stocks vary dramatically. When calculating your stock portfolio ROI, include dividends — they account for about 2% of total S&P 500 returns historically. Do not forget to subtract trading fees and tax implications.</p>

        <h2 style={s.h2}>Side Project ROI</h2>
        <p style={s.p}>For side businesses, include your time as a cost. If you spend 10 hours per week on a side project earning $500 per month, your effective hourly rate is about $12.50. If your day job pays $40/hour, the financial ROI is negative unless the project scales. Factor in learning value, enjoyment, and future potential alongside pure financial return.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free ROI Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/roi-calculator" style={s.cta}>Open ROI Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/compound-interest-calculator" style={{ color: "#0D9488" }}>Compound Interest Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
