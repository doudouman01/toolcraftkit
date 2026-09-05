import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Generate Random Colors for Design Inspiration",
  description: "Generate random color palettes for design projects when you are stuck. Break creative blocks with unexpected color combinations.",
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
        <h1 style={s.h1}>How to Generate Random Colors for Design Inspiration</h1>
        <p style={s.meta}>September 5, 2026 · 3 min read</p>

        <p style={s.p}>Sometimes the best way to break a creative block is to remove choice entirely. Random color generation gives you unexpected combinations that your conscious mind would never select — and some of those combinations are surprisingly beautiful. Designers use this technique to discover palettes they would never have found through deliberate selection.</p>

        <h2 style={s.h2}>How Random Color Generation Works</h2>
        <p style={s.p}>A random color generator picks HEX values randomly across the full spectrum — 16.7 million possible colors. Generating 5 random colors gives you a palette that is completely unbiased by trends, preferences, or habits. Most of these palettes will not work, but the ones that do are often striking and original.</p>

        <h2 style={s.h2}>Refining Random Palettes</h2>
        <p style={s.p}>Start with a random palette, then refine. Keep the colors you like and regenerate the rest. Adjust saturation and lightness to create harmony while preserving the unexpected hue combinations. This hybrid approach combines the surprise of randomness with the judgment of intentional design.</p>

        <h2 style={s.h2}>Constraining Randomness</h2>
        <p style={s.p}>Instead of fully random colors, constrain one variable. Generate random hues but keep saturation and lightness fixed — this produces varied but harmonious palettes. Or fix the hue and randomize saturation and lightness — this creates monochromatic variations. Constraints turn chaos into useful inspiration.</p>

        <h2 style={s.h2}>Applications</h2>
        <p style={s.p}>Use random palettes for brainstorming, not final design. They are excellent for mood boards, design exploration, generative art, and breaking out of color ruts. Once you find a direction you like, refine it with traditional color theory (complementary, analogous, triadic harmonies) to create a polished final palette.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Color Palette Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/color-palette" style={s.cta}>Open Color Palette Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/random-number" style={{ color: "#0D9488" }}>Random Number Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
