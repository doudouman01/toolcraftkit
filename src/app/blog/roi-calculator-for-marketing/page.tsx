import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate Marketing ROI (With Real Campaign Examples)",
  description: "Learn to measure ROI on ads, content marketing, SEO, and email campaigns. Free ROI calculator with formulas and benchmarks.",
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
        <h1 style={s.h1}>How to Calculate Marketing ROI (With Real Campaign Examples)</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Marketing spend without ROI tracking is guessing with money. Every dollar you spend on ads, content, SEO, or email should produce a measurable return. If you cannot calculate what came back from what you put in, you cannot know which channels to scale and which to cut.</p>

        <h2 style={s.h2}>The Basic ROI Formula</h2>
        <p style={s.p}>ROI = ((Revenue from campaign - Cost of campaign) / Cost of campaign) × 100. Spent $2,000 on Google Ads and generated $8,000 in sales? ROI = ((8,000 - 2,000) / 2,000) × 100 = 300%. For every dollar spent, you got three dollars back in profit.</p>

        <h2 style={s.h2}>ROI by Marketing Channel</h2>
        <p style={s.p}>Paid search (Google Ads): average ROI of 200-400%. Email marketing: average ROI of 3,600% ($36 for every $1 spent). SEO: average ROI of 275-1,200% (varies wildly by industry and timeline). Social media ads: average ROI of 100-300%. These are averages — your results depend on execution.</p>

        <h2 style={s.h2}>What Most People Get Wrong</h2>
        <p style={s.p}>The biggest mistake is not including all costs. Your Google Ads ROI is not just ad spend — include the cost of someone managing the campaigns, landing page design, and any tools or software. The second mistake is attributing all revenue to the last click. A customer might discover you through SEO, engage via email, and convert through a retargeting ad.</p>

        <h2 style={s.h2}>When ROI Takes Time</h2>
        <p style={s.p}>SEO and content marketing have negative ROI for the first 3-6 months. You invest upfront and see returns over months and years. Judging these channels on 30-day ROI will make you abandon them prematurely. Track ROI over 6-12 month windows for organic channels.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free ROI Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/roi-calculator" style={s.cta}>Open ROI Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/percentage-calculator" style={{ color: "#0D9488" }}>Percentage Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
