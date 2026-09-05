import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Create a Brand Color Palette That Works (With Free Generator)",
  description: "Build a professional color palette for your brand. Learn color theory basics, how to choose colors that convey the right message, and export for web and print.",
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
        <h1 style={s.h1}>How to Create a Brand Color Palette That Works (With Free Generator)</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Your brand colors are one of the first things people notice — and one of the most powerful tools for building recognition and trust. A well-chosen color palette communicates your brand personality before anyone reads a single word. Choosing colors randomly results in a brand that feels inconsistent and unprofessional.</p>

        <h2 style={s.h2}>Color Psychology for Brands</h2>
        <p style={s.p}>Blue conveys trust and professionalism (used by banks, tech companies, healthcare). Red signals energy, urgency, and passion (food, sales, entertainment). Green represents growth, health, and sustainability. Purple suggests luxury and creativity. Orange conveys friendliness and affordability. Black communicates sophistication and premium positioning. Choose colors that match what your brand wants to communicate.</p>

        <h2 style={s.h2}>Building a Palette</h2>
        <p style={s.p}>Start with one primary color that represents your brand. Add a secondary color that complements it. Include a neutral (gray, off-white, or dark charcoal) for text and backgrounds. Add an accent color for calls to action and highlights. Most professional brands use 3-5 colors total. More than that creates visual chaos.</p>

        <h2 style={s.h2}>Color Harmony Rules</h2>
        <p style={s.p}>Complementary colors sit opposite each other on the color wheel (blue and orange, red and green). They create high contrast and energy. Analogous colors sit next to each other (blue, blue-green, green). They create harmony and calm. Triadic colors are evenly spaced (red, yellow, blue). They create vibrant, balanced palettes.</p>

        <h2 style={s.h2}>Exporting for Web and Print</h2>
        <p style={s.p}>For web, export colors as HEX codes (#0D9488) or RGB values (rgb(13, 148, 136)). For print, convert to CMYK. For design tools, export as HSL. A color palette generator gives you all formats at once, ensuring consistency across digital and physical applications.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Color Palette Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/color-palette" style={s.cta}>Open Color Palette Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/hex-to-rgb" style={{ color: "#0D9488" }}>Hex to RGB Converter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
