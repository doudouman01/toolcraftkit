import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Plan a Content Calendar for Your Blog or Social Media",
  description: "Create a content calendar that keeps your publishing consistent. Planning frameworks, topic selection, and scheduling strategies.",
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
        <h1 style={s.h1}>How to Plan a Content Calendar for Your Blog or Social Media</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Consistent publishing is the number one predictor of content success. A blog that publishes weekly outperforms one that publishes sporadically — even if individual post quality is similar. A content calendar transforms publishing from a creative impulse into a reliable business process.</p>

        <h2 style={s.h2}>Choosing a Publishing Cadence</h2>
        <p style={s.p}>Start with a frequency you can sustain for 6+ months. One blog post per week is achievable for most solo creators. Two social posts per day is standard for active accounts. One newsletter per week maintains subscriber engagement. It is better to publish one post per week consistently than three posts for two weeks followed by nothing for a month.</p>

        <h2 style={s.h2}>Topic Selection Framework</h2>
        <p style={s.p}>Organize content into clusters around your core topics. Each cluster has a pillar page (comprehensive overview) and supporting articles (specific subtopics). For a cooking blog: pillar = Italian Cooking Guide, supporting = Best Pasta Shapes for Each Sauce, How to Make Fresh Mozzarella, Italian Pantry Essentials. This structure builds topical authority for SEO.</p>

        <h2 style={s.h2}>The Calendar Template</h2>
        <p style={s.p}>Create a spreadsheet with columns: date, title, status (idea/drafted/published), keyword target, content type (how-to/list/comparison/case study), word count target, and promotion plan. Plan 4-8 weeks ahead. This visible pipeline prevents the Sunday night panic of wondering what to write this week.</p>

        <h2 style={s.h2}>Batching for Efficiency</h2>
        <p style={s.p}>Write multiple pieces in a single session rather than one at a time. Research day: gather information for 3-4 articles. Writing day: draft those articles. Editing day: polish and schedule. This batch approach is faster because you stay in the same mental mode instead of context-switching between research, writing, and editing.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Word Counter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/word-counter" style={s.cta}>Open Word Counter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/lorem-ipsum-generator" style={{ color: "#0D9488" }}>Lorem Ipsum Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
