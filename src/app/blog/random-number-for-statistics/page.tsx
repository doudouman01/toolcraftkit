import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Number Generator for Sampling, Surveys & Statistical Analysis",
  description: "Generate random samples for surveys, A/B tests, and research. Understand random sampling methods and when each applies.",
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
        <h1 style={s.h1}>Random Number Generator for Sampling, Surveys & Statistical Analysis</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Random sampling is the foundation of statistical research. A survey without random sampling produces biased results. An A/B test without random assignment produces misleading conclusions. Understanding and applying proper randomization is the difference between reliable data and expensive guesswork.</p>

        <h2 style={s.h2}>Simple Random Sampling</h2>
        <p style={s.p}>Every member of the population has an equal chance of being selected. Assign a number to each member, then generate random numbers to select your sample. For a survey of 10,000 customers where you want responses from 500, generate 500 random numbers between 1 and 10,000. Each customer has exactly a 5% chance of selection.</p>

        <h2 style={s.h2}>Stratified Random Sampling</h2>
        <p style={s.p}>Divide your population into subgroups (strata) and randomly sample from each. If your customer base is 60% female and 40% male, and you want 500 responses, randomly select 300 from the female group and 200 from the male group. This ensures your sample reflects the population proportionally.</p>

        <h2 style={s.h2}>A/B Testing Randomization</h2>
        <p style={s.p}>In A/B tests, users must be randomly assigned to groups. Non-random assignment (e.g., assigning based on user ID) can introduce bias if IDs correlate with behavior. True random assignment ensures the only difference between groups is the variable being tested. Run the randomization continuously throughout the test period.</p>

        <h2 style={s.h2}>Common Mistakes</h2>
        <p style={s.p}>Convenience sampling (surveying only people who are easy to reach) produces biased results. Self-selection bias occurs when people choose to participate. Small sample sizes produce unreliable results — for most surveys, aim for at least 30 responses per subgroup. Always report your sampling methodology alongside results.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Random Number Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/random-number" style={s.cta}>Open Random Number Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/percentage-calculator" style={{ color: "#0D9488" }}>Percentage Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
