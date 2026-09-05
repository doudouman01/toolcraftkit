import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette for Web Design: Contrast, Accessibility & Dark Mode",
  description: "Design accessible color palettes for websites. Check contrast ratios, ensure WCAG compliance, and create palettes that work in both light and dark modes.",
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
        <h1 style={s.h1}>Color Palette for Web Design: Contrast, Accessibility & Dark Mode</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>A beautiful color palette that fails accessibility standards excludes users and may violate legal requirements. Web Content Accessibility Guidelines (WCAG) require minimum contrast ratios between text and background colors. Designing for accessibility from the start is easier than retrofitting — and results in better design for everyone.</p>

        <h2 style={s.h2}>WCAG Contrast Requirements</h2>
        <p style={s.p}>WCAG AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18px+ or 14px+ bold). WCAG AAA requires 7:1 for normal text. White text on a light blue background might look nice but often fails AA requirements. Always check contrast ratios before finalizing your palette.</p>

        <h2 style={s.h2}>Designing for Dark Mode</h2>
        <p style={s.p}>Dark mode requires different thinking. You cannot simply invert colors — pure white text on pure black is too harsh. Use off-white (#E5E5E5) on dark gray (#1A1A1A) instead. Saturated colors that work on light backgrounds may need desaturation for dark backgrounds. Create two palette variants and test both.</p>

        <h2 style={s.h2}>Color Blindness Considerations</h2>
        <p style={s.p}>About 8% of men and 0.5% of women have some form of color blindness. Never rely on color alone to convey information — always add text labels, icons, or patterns. Red-green color blindness is most common, so avoid using red and green as the only differentiators (success vs error states, for example).</p>

        <h2 style={s.h2}>Building a Systematic Palette</h2>
        <p style={s.p}>Create a palette with 5-9 shades of each color (50 to 900, following Tailwind CSS convention). This gives you enough variation for backgrounds (50-100), borders (200-300), text (700-900), and interactive states (hover, active, disabled). Systematic palettes scale better than ad-hoc color choices.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Color Palette Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/color-palette" style={s.cta}>Open Color Palette Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/hex-to-rgb" style={{ color: "#0D9488" }}>Hex to RGB Converter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
