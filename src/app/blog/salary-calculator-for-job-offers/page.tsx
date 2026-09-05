import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Compare Job Offers: Total Compensation Calculator",
  description: "Compare two job offers beyond base salary. Factor in bonuses, equity, benefits, commute costs, and quality of life to find the better deal.",
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
        <h1 style={s.h1}>How to Compare Job Offers: Total Compensation Calculator</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Comparing job offers by salary alone is like comparing apartments by rent alone — it misses half the picture. Benefits, bonuses, equity, retirement matching, commute costs, and work-life balance all have real dollar values. A $90,000 offer with great benefits can be worth more than a $105,000 offer with none.</p>

        <h2 style={s.h2}>Base Salary Comparison</h2>
        <p style={s.p}>Start by normalizing both offers to the same frequency — annual, monthly, or hourly. A $45/hour contract role is $93,600/year if full-time, but with no benefits, no PTO, and self-employment taxes. A $75,000 salaried role with benefits might be worth $95,000+ in total compensation.</p>

        <h2 style={s.h2}>Benefits Valuation</h2>
        <p style={s.p}>Health insurance: employer contribution is worth $5,000-$15,000/year. Dental and vision: $500-$1,500. Life and disability insurance: $1,000-$3,000. 401k/RRSP match: calculate the exact dollar amount. Stock options or RSUs: estimate current value (but discount for vesting and risk). PTO: calculate the dollar value of each day.</p>

        <h2 style={s.h2}>Hidden Costs</h2>
        <p style={s.p}>Commute costs: gas, transit pass, parking, vehicle wear, and time. A 1-hour commute each way is 500 hours per year of unpaid time — at your hourly rate, that is a significant hidden cost. Relocation expenses: moving costs, higher cost of living, and leaving your network. Remote work eliminates commute costs entirely.</p>

        <h2 style={s.h2}>The Decision Framework</h2>
        <p style={s.p}>List every component of each offer in a spreadsheet. Assign dollar values to everything you can quantify. For things you cannot quantify (culture, growth potential, manager quality), rank them on a 1-10 scale. The offer with the highest total value — financial plus non-financial — is usually the right choice.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Salary Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/salary-calculator" style={s.cta}>Open Salary Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/percentage-calculator" style={{ color: "#0D9488" }}>Percentage Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
