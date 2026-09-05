import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Price Your Freelance Services: Hourly vs Project-Based",
  description: "Calculate your freelance rate based on expenses, desired income, and market rates. When to charge hourly vs project-based.",
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
        <h1 style={s.h1}>How to Price Your Freelance Services: Hourly vs Project-Based</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Pricing is the hardest part of freelancing. Charge too little and you burn out. Charge too much and you lose clients. The right price covers your costs, pays you fairly, and reflects the value you deliver. There is a formula for this — you do not have to guess.</p>

        <h2 style={s.h2}>The Cost-Based Formula</h2>
        <p style={s.p}>Start with your desired annual income (e.g., $80,000). Add your annual business expenses (software, insurance, equipment, marketing — e.g., $12,000). Add self-employment tax and income tax (roughly 30% — $27,600). Total needed: $119,600. Divide by billable hours (typically 1,000-1,200 per year, not 2,080 — you spend significant time on admin, marketing, and learning). $119,600 / 1,100 = $109/hour.</p>

        <h2 style={s.h2}>Market Rate Validation</h2>
        <p style={s.p}>Your calculated rate must be validated against the market. Research what competitors charge for similar work. If your rate is significantly above market, you need exceptional differentiators (portfolio, specialization, reputation). If it is below market, you may be undercharging. Adjust based on your experience level, niche demand, and geographic market.</p>

        <h2 style={s.h2}>Hourly vs Project-Based</h2>
        <p style={s.p}>Hourly pricing is fair when scope is uncertain (consulting, support, ongoing maintenance). Project pricing is better when scope is defined (build a website, design a logo, write 10 blog posts). Project pricing rewards efficiency — as you get faster, your effective hourly rate increases. Hourly pricing penalizes efficiency.</p>

        <h2 style={s.h2}>When and How to Raise Rates</h2>
        <p style={s.p}>Raise rates when you are consistently booked (demand exceeds supply). Raise rates for new clients first while honoring existing agreements. Give existing clients 30-60 days notice. A 10-15% annual increase keeps pace with inflation and growing expertise. Clients who leave over a reasonable rate increase were not valuing your work properly.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Salary Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/salary-calculator" style={s.cta}>Open Salary Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/invoice-generator" style={{ color: "#0D9488" }}>Invoice Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
