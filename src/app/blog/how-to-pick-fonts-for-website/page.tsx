import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Pick Fonts for Your Website: Typography Best Practices",
  description: "Choose fonts that match your brand, read well on screens, and load fast. Pairing strategies, size guidelines, and free font recommendations.",
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
        <h1 style={s.h1}>How to Pick Fonts for Your Website: Typography Best Practices</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Typography is the most underrated element of web design. The right font makes content readable, professional, and on-brand. The wrong font makes even great content feel amateurish. You do not need to be a designer to choose good typography — these principles produce solid results every time.</p>

        <h2 style={s.h2}>Serif vs Sans-Serif</h2>
        <p style={s.p}>Serif fonts (Times New Roman, Georgia, Merriweather) have small decorative strokes at the end of letters. They convey tradition, authority, and elegance. Sans-serif fonts (Arial, Helvetica, Inter) are clean and modern. They convey simplicity and professionalism. Most modern websites use sans-serif for body text and either type for headings.</p>

        <h2 style={s.h2}>Font Pairing Strategy</h2>
        <p style={s.p}>The safest approach: use one font family for everything, varying weight and size. If you want two fonts, pair a serif heading with a sans-serif body (or vice versa). The key rule is contrast — two similar fonts look like a mistake, while two different fonts look intentional. Limit yourself to two fonts maximum.</p>

        <h2 style={s.h2}>Size and Spacing</h2>
        <p style={s.p}>Body text: 16-18px minimum (never smaller). Line height: 1.5-1.7 for body text. Line length: 50-75 characters per line (too long strains the eyes, too short creates choppy reading). Heading sizes: H1 at 2-2.5x body size, H2 at 1.5-2x. Consistent spacing between sections creates visual rhythm.</p>

        <h2 style={s.h2}>Performance</h2>
        <p style={s.p}>Every font you add increases page load time. Google Fonts are free but add HTTP requests. System fonts (system-ui, -apple-system) load instantly because they are already on the user's device. Load only the weights you actually use — including Regular 400, Bold 700, and Italic adds three font files. Skip weights you do not need.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Lorem Ipsum Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/lorem-ipsum-generator" style={s.cta}>Open Lorem Ipsum Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/color-palette" style={{ color: "#0D9488" }}>Color Palette Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
