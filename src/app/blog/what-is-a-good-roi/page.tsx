import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Is a Good ROI? Industry Benchmarks for 2026",
  description: "Learn what counts as a good return on investment across stocks, real estate, business, and marketing. Includes ROI formula and a free calculator.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
    table: { width: "100%", borderCollapse: "collapse" as const, marginBottom: 20, fontSize: 14 },
    th: { padding: "10px 12px", background: "#F5F5F4", textAlign: "left" as const, fontWeight: 600, fontSize: 13, borderBottom: "2px solid #E7E5E4" },
    td: { padding: "10px 12px", borderBottom: "1px solid #F5F5F4" },
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>What Is a Good ROI? Benchmarks by Industry (2026)</h1>
        <p style={s.meta}>August 22, 2026 · 5 min read</p>

        <p style={s.p}>ROI (Return on Investment) is one of the most widely used metrics in business and investing. But &quot;good&quot; is relative — a 5% ROI might be excellent in one context and terrible in another. Here&apos;s how to evaluate your returns against realistic benchmarks.</p>

        <h2 style={s.h2}>The ROI Formula</h2>
        <p style={s.p}>ROI = ((Final Value − Initial Investment) ÷ Initial Investment) × 100. For example, if you invest $10,000 and get back $13,000, your ROI is (3,000 ÷ 10,000) × 100 = 30%.</p>

        <h2 style={s.h2}>Industry Benchmarks</h2>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}>Investment Type</th><th style={s.th}>Typical Annual ROI</th><th style={s.th}>Notes</th></tr>
          </thead>
          <tbody>
            {[
              ["S&P 500 (stocks)", "~10%", "Historical average since 1926, before inflation"],
              ["Real estate (rental)", "8-12%", "Includes appreciation + rental income"],
              ["Real estate (REITs)", "10-12%", "Publicly traded, more liquid"],
              ["Bonds (US Treasury)", "3-5%", "Low risk, lower return"],
              ["Small business", "15-30%", "Higher risk, highly variable"],
              ["Digital marketing", "200-500%", "Per campaign, not annual"],
              ["Savings account", "4-5%", "Risk-free, current high-rate environment"],
              ["Crypto", "Highly variable", "Extreme volatility, speculative"],
            ].map(([type, roi, notes], i) => (
              <tr key={i}><td style={s.td}>{type}</td><td style={{ ...s.td, fontWeight: 600 }}>{roi}</td><td style={{ ...s.td, fontSize: 13, color: "#78716C" }}>{notes}</td></tr>
            ))}
          </tbody>
        </table>

        <h2 style={s.h2}>Context Matters</h2>
        <p style={s.p}><strong>Risk vs. return:</strong> A &quot;good&quot; ROI always accounts for risk. A 5% return from a government bond is considered good because the risk is near zero. A 5% return from a startup would be poor because the risk of total loss is high.</p>
        <p style={s.p}><strong>Time horizon:</strong> A 50% ROI over 10 years is different from a 50% ROI over 1 year. Use annualized ROI (CAGR) to compare investments of different durations fairly.</p>
        <p style={s.p}><strong>Inflation:</strong> A 7% nominal ROI with 3% inflation means your real return is only about 4%. Always consider whether your returns are beating inflation.</p>

        <h2 style={s.h2}>Common ROI Mistakes</h2>
        <p style={s.p}><strong>Ignoring costs:</strong> Marketing ROI calculations often forget labor costs, tools, and time spent. Always include all costs to get the true picture.</p>
        <p style={s.p}><strong>Cherry-picking periods:</strong> Stocks returned 30%+ in some years and lost 40% in others. Use at least 5-10 year averages for meaningful benchmarks.</p>
        <p style={s.p}><strong>Comparing unlike things:</strong> A real estate ROI that includes leverage (mortgage) is not directly comparable to a stock ROI without leverage. Normalize before comparing.</p>

        <h2 style={s.h2}>Calculate Your ROI</h2>
        <p style={s.p}>Use our free ROI Calculator to compute your return on investment, including annualized CAGR for multi-year investments.</p>
        <Link href="/tools/roi-calculator" style={s.cta}>Open ROI Calculator →</Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
