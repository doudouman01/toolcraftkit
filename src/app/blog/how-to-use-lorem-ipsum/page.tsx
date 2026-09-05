import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Use Lorem Ipsum Effectively in Design Mockups",
  description: "Best practices for placeholder text in UI design. When to use Lorem Ipsum, when to use real content, and how much text to generate.",
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
        <h1 style={s.h1}>How to Use Lorem Ipsum Effectively in Design Mockups</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Lorem Ipsum is the standard placeholder text for a reason — it simulates natural text flow without distracting from the visual design. But using it badly is worse than not using it at all. Here is how to use placeholder text effectively in your design process.</p>

        <h2 style={s.h2}>How Much Text to Generate</h2>
        <p style={s.p}>Match the amount of placeholder text to realistic content length. A product description placeholder should be 2-3 sentences, not 3 paragraphs. A blog post mockup should be 800-1500 words, not 100. If the placeholder text is dramatically shorter or longer than the real content will be, your layout will break when real content replaces it.</p>

        <h2 style={s.h2}>Varying Text Length</h2>
        <p style={s.p}>Real content varies in length. Some product descriptions are long, others are short. Some user names are 5 characters, others are 25. Design your layouts to handle both extremes. Use placeholder text of different lengths in different cards or sections to stress-test your layout before development.</p>

        <h2 style={s.h2}>When Real Content Is Better</h2>
        <p style={s.p}>For user testing, real (or realistic) content produces more valid results. For client presentations, real content prevents confusion about what is placeholder. For content-driven designs where the text IS the design (headlines, hero sections), writing real copy first produces better layouts than fitting text to a Lorem Ipsum design.</p>

        <h2 style={s.h2}>Alternatives to Lorem Ipsum</h2>
        <p style={s.p}>Some designers prefer realistic-sounding English placeholder text to avoid the dead give away of Latin. Others use content from public domain books or Wikipedia. The choice depends on your audience — if clients know what Lorem Ipsum is, it works fine. If they might think it is a bug, use readable placeholder text.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Lorem Ipsum Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/lorem-ipsum-generator" style={s.cta}>Open Lorem Ipsum Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/word-counter" style={{ color: "#0D9488" }}>Word Counter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
