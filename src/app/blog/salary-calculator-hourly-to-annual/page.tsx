import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary Calculator: Convert Hourly to Annual (And See Your Real Take-Home)",
  description: "Convert between hourly, weekly, monthly, and annual salary. Account for taxes, benefits, and actual working hours to see your real earnings.",
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
        <h1 style={s.h1}>Salary Calculator: Convert Hourly to Annual (And See Your Real Take-Home)</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>A $50,000 salary and a $25/hour job sound like the same thing — but they are not necessarily equivalent. After accounting for overtime eligibility, benefits, paid time off, and actual hours worked, the comparison gets complicated. A salary calculator cuts through the confusion and shows you the real numbers.</p>

        <h2 style={s.h2}>The Basic Conversion</h2>
        <p style={s.p}>Annual to hourly: divide annual salary by 2,080 (40 hours × 52 weeks). A $50,000 salary = $24.04/hour. Hourly to annual: multiply hourly rate by 2,080. $25/hour = $52,000/year. But this assumes exactly 40 hours per week, 52 weeks per year, with no unpaid time off — which is rarely the reality.</p>

        <h2 style={s.h2}>Adjusting for Reality</h2>
        <p style={s.p}>If you work 45 hours per week as a salaried employee (common), your effective hourly rate drops. $50,000 / (45 × 52) = $21.37/hour. If you get 15 days of PTO (3 weeks), your actual working weeks are 49, not 52. Factor in commute time if comparing a remote job to an office job — commute is unpaid work time.</p>

        <h2 style={s.h2}>Benefits Have Dollar Values</h2>
        <p style={s.p}>Employer-provided health insurance is worth $7,000-$20,000 per year. 401k matching at 4% on a $50,000 salary = $2,000/year. Paid time off has monetary value — 15 days of PTO on a $50,000 salary is worth about $2,885. When comparing two job offers, add the dollar value of benefits to the base salary for a true comparison.</p>

        <h2 style={s.h2}>Tax Impact</h2>
        <p style={s.p}>Your gross salary is not your take-home pay. Federal income tax, state income tax, Social Security (6.2%), and Medicare (1.45%) reduce your take-home significantly. A $50,000 gross salary in a state with no income tax yields roughly $40,000 take-home. In a high-tax state like California, it yields roughly $37,000.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Salary Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/salary-calculator" style={s.cta}>Open Salary Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/percentage-calculator" style={{ color: "#0D9488" }}>Percentage Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
