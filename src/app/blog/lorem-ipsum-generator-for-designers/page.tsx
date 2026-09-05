import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator: Placeholder Text for Design & Development",
  description: "Generate placeholder text for mockups, wireframes, and development. Customizable paragraphs, sentences, words, and lists.",
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
        <h1 style={s.h1}>Lorem Ipsum Generator: Placeholder Text for Design & Development</h1>
        <p style={s.meta}>September 5, 2026 · 3 min read</p>

        <p style={s.p}>Lorem Ipsum has been the standard placeholder text since the 1500s when a printer scrambled a passage of Latin text. Today, designers and developers use it to fill layouts with realistic-looking text that does not distract from the visual design being evaluated.</p>

        <h2 style={s.h2}>Why Placeholder Text Matters</h2>
        <p style={s.p}>Real content during the design phase causes stakeholders to focus on the words instead of the layout. Lorem Ipsum removes this distraction — everyone knows it is placeholder content, so the conversation stays on structure, spacing, and visual hierarchy. It also prevents premature content debates during design reviews.</p>

        <h2 style={s.h2}>Generating the Right Amount</h2>
        <p style={s.p}>Match your placeholder text to realistic content length. A product card needs 1-2 sentences, not 3 paragraphs. A blog post layout needs 500-1500 words, not 100. An about page needs 200-400 words. Getting the volume right ensures your design works with actual content volumes.</p>

        <h2 style={s.h2}>Beyond Standard Lorem Ipsum</h2>
        <p style={s.p}>Some projects benefit from more creative placeholder text. Hipster Ipsum, Bacon Ipsum, and Cupcake Ipsum add personality to mockups. Office-appropriate alternatives use business-sounding English. For multilingual projects, test with text in the target language — different languages have different average word lengths and text flow.</p>

        <h2 style={s.h2}>When NOT to Use Lorem Ipsum</h2>
        <p style={s.p}>User testing should use realistic content — placeholder text confuses test participants. Client presentations for content-driven projects should use draft copy. Headlines and calls to action should always be real text, even in early mockups — they define the layout. Use Lorem Ipsum for body text and supporting content only.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Lorem Ipsum Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/lorem-ipsum-generator" style={s.cta}>Open Lorem Ipsum Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/word-counter" style={{ color: "#0D9488" }}>Word Counter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
