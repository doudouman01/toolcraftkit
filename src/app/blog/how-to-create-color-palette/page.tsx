import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Create a Color Palette From Scratch (5 Methods)",
  description: "Five practical methods to build harmonious color palettes for any project. From color wheel theory to image extraction. Free palette generator.",
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
        <h1 style={s.h1}>How to Create a Color Palette From Scratch (5 Methods)</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Starting with a blank canvas and choosing colors from millions of options is overwhelming. These five methods give you a systematic starting point, whether you are designing a website, creating a brand, or decorating a room.</p>

        <h2 style={s.h2}>Method 1: Start From One Color</h2>
        <p style={s.p}>Pick one color you love — your brand color, a favorite shade, or a color that matches the mood you want. Then use a palette generator to create harmonious companions. Complementary, analogous, triadic, and split-complementary harmonies all produce pleasing results from a single starting color.</p>

        <h2 style={s.h2}>Method 2: Extract From an Image</h2>
        <p style={s.p}>Find a photograph, painting, or scene that captures the mood you want. Upload it to a palette extractor, which identifies the dominant colors. Nature photos produce organic, balanced palettes. Urban photos produce modern, high-contrast palettes. This method works because nature and professional photography already have harmonious colors.</p>

        <h2 style={s.h2}>Method 3: Use a Pre-Built Palette</h2>
        <p style={s.p}>Sites like Coolors, Adobe Color, and Color Hunt have thousands of curated palettes. Browse by mood (warm, cool, pastel, bold), industry (tech, food, fashion), or popularity. Starting from a proven palette and customizing it is faster than building from scratch.</p>

        <h2 style={s.h2}>Method 4: The 60-30-10 Rule</h2>
        <p style={s.p}>Use your primary color for 60% of the design (backgrounds, large areas), your secondary color for 30% (supporting elements, cards), and your accent color for 10% (buttons, highlights, calls to action). This ratio creates visual balance regardless of which colors you choose.</p>

        <h2 style={s.h2}>Method 5: Competitor Analysis</h2>
        <p style={s.p}>Study the color palettes of 5-10 competitors or brands you admire. Identify patterns — most tech companies use blue, most organic brands use green. Then choose colors that either align with industry expectations or deliberately stand out. Being different is only effective when it is intentional.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Color Palette Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/color-palette" style={s.cta}>Open Color Palette Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/hex-to-rgb" style={{ color: "#0D9488" }}>Hex to RGB Converter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
