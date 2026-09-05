import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Budget as a Freelancer With Irregular Income",
  description: "Budgeting strategies for freelancers with variable income. The baseline method, buffer accounts, and seasonal planning for self-employed workers.",
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
        <h1 style={s.h1}>How to Budget as a Freelancer With Irregular Income</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Budgeting on a regular salary is straightforward — you know what is coming in. Budgeting as a freelancer with income that swings from $2,000 one month to $8,000 the next requires a completely different approach. The standard budget advice of allocating percentages of your income falls apart when that income is unpredictable.</p>

        <h2 style={s.h2}>The Baseline Method</h2>
        <p style={s.p}>Calculate your essential monthly expenses — rent, utilities, food, insurance, minimum debt payments. This is your baseline: the absolute minimum you need to survive. In good months, live on the baseline and save the surplus. In lean months, draw from the surplus. This turns irregular income into a predictable lifestyle.</p>

        <h2 style={s.h2}>The Buffer Account</h2>
        <p style={s.p}>Maintain a separate buffer account with 2-3 months of baseline expenses. All client payments go into the buffer. You pay yourself a fixed monthly salary from the buffer. This smooths out income fluctuations and turns freelancing into a psychologically predictable experience. Refill the buffer during high-income months.</p>

        <h2 style={s.h2}>Tax Set-Aside</h2>
        <p style={s.p}>Set aside 25-30% of every payment for taxes immediately — before you consider it available income. Freelancers who spend tax money and scramble in April create a recurring crisis. Use a separate savings account labeled Taxes. Our Income Tax Calculator helps estimate your quarterly obligations.</p>

        <h2 style={s.h2}>Seasonal Planning</h2>
        <p style={s.p}>Track your income by month for at least a year. Most freelancers have predictable seasonal patterns — January is slow, Q4 is busy. Use this pattern to plan: save more during busy months, reduce spending during predictable slow periods. Knowing your seasons prevents panic during normal dips.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Percentage Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/percentage-calculator" style={s.cta}>Open Percentage Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/income-tax-calculator" style={{ color: "#0D9488" }}>Income Tax Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
