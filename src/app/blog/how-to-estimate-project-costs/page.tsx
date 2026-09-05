import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Estimate Project Costs: A Framework for Freelancers and Small Business",
  description: "Create accurate project cost estimates that protect your profit and win client confidence. Templates and formulas included.",
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
        <h1 style={s.h1}>How to Estimate Project Costs: A Framework for Freelancers and Small Business</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>An underestimated project costs you money. An overestimated project costs you the job. Accurate project estimation is a skill that directly affects your profitability and client trust. A systematic approach produces estimates that protect both your profit margin and your reputation.</p>

        <h2 style={s.h2}>The Bottom-Up Approach</h2>
        <p style={s.p}>Break the project into every individual task. Estimate hours for each task. Multiply hours by your hourly rate. Add material and tool costs. Add a buffer. This method takes longer but produces the most accurate estimates. For a website project: discovery (4h), wireframes (8h), design (16h), development (24h), testing (8h), revisions (8h) = 68 hours.</p>

        <h2 style={s.h2}>The Buffer Rule</h2>
        <p style={s.p}>Add 15-25% to your time estimate as a contingency buffer. This accounts for scope creep, unexpected complications, revision rounds, and tasks you forgot to include. A 68-hour estimate becomes 78-85 hours with buffer. Without a buffer, every project runs over budget — because no estimate is perfect.</p>

        <h2 style={s.h2}>Fixed vs Time and Materials</h2>
        <p style={s.p}>Fixed-price estimates put the risk on you — if the project takes longer, you absorb the cost. This works for well-defined projects you have done before. Time and materials puts the risk on the client — they pay for actual hours worked. This works for projects with uncertain scope. Clearly define which model you are using in your proposal.</p>

        <h2 style={s.h2}>Presenting the Estimate</h2>
        <p style={s.p}>Break the estimate into phases or deliverables, not just a total number. A $15,000 estimate with no breakdown feels arbitrary. A $15,000 estimate showing discovery ($1,500), design ($4,000), development ($6,000), testing ($1,500), and project management ($2,000) feels justified and transparent.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Percentage Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/percentage-calculator" style={s.cta}>Open Percentage Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/invoice-generator" style={{ color: "#0D9488" }}>Invoice Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
