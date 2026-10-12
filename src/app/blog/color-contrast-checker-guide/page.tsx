import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Contrast Checker Guide: WCAG Accessibility Made Simple",
  description: "Learn how to use a color contrast checker to meet WCAG AA and AAA standards. Understand contrast ratios, accessibility requirements, and how to fix low-contrast text.",
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
        <h1 style={s.h1}>Color Contrast Checker Guide: WCAG Accessibility Made Simple</h1>
        <p style={s.meta}>October 4, 2026 · 4 min read</p>

        <p style={s.p}>Color contrast is one of the most impactful accessibility factors on the web. Low-contrast text is difficult or impossible to read for millions of people with visual impairments, and it also affects everyone in challenging lighting conditions. A contrast checker gives you a definitive answer: does your color combination meet accessibility standards?</p>

        <h2 style={s.h2}>Why Web Accessibility Matters</h2>
        <p style={s.p}>Over 1 billion people worldwide live with some form of disability. In many countries, web accessibility is a legal requirement under legislation like the ADA, the European Accessibility Act, and AODA in Canada. Beyond compliance, accessible design simply reaches more people. When your text is easy to read, everyone benefits — including users on older screens, mobile devices in sunlight, or aging monitors with washed-out colors.</p>

        <h2 style={s.h2}>Understanding WCAG Guidelines</h2>
        <p style={s.p}>The Web Content Accessibility Guidelines (WCAG) are published by the W3C and define three conformance levels: A, AA, and AAA. For color contrast, the relevant success criterion is 1.4.3 (AA) and 1.4.6 (AAA). Most organizations target AA compliance as the practical minimum. WCAG 2.1 and 2.2 carry forward the same contrast ratio thresholds while adding requirements for non-text elements like icons and UI controls (1.4.11).</p>

        <h2 style={s.h2}>How Contrast Ratios Work</h2>
        <p style={s.p}>A contrast ratio compares the relative luminance of two colors on a scale from 1:1 (identical colors) to 21:1 (black on white). The formula converts each RGB channel into a linearized luminance value weighted by human perception — green contributes the most, blue the least. For normal-sized body text, WCAG AA requires at least 4.5:1. For large text (24px or 18px bold), the threshold drops to 3:1 because bigger characters are easier to perceive.</p>

        <h2 style={s.h2}>AA vs AAA: Which Level to Target</h2>
        <p style={s.p}>AA is the widely accepted baseline. It requires 4.5:1 for normal text and 3:1 for large text. AAA raises the bar to 7:1 and 4.5:1 respectively. Achieving AAA across an entire site can be difficult, especially with brand colors, but it is worth targeting for critical content like error messages, navigation labels, and form instructions. A practical approach: aim for AA everywhere and AAA where feasible.</p>

        <h2 style={s.h2}>Common Contrast Mistakes to Avoid</h2>
        <p style={s.p}>Light gray text on white backgrounds is the most frequent offender. Placeholder text in form fields, footer links, and disabled button labels often fall below 4.5:1. Another common issue: colored text on colored backgrounds where both look fine on a high-end display but fail on cheaper monitors. Always test with a contrast checker rather than relying on visual judgment — human eyes adapt to low contrast and can miss problems that a calculation catches instantly.</p>

        <h2 style={s.h2}>Check Your Colors Now</h2>
        <p style={s.p}>Our free Color Contrast Checker lets you test any foreground/background combination instantly. Enter hex values or use the color pickers, and see WCAG AA and AAA results in real time.</p>
        <Link href="/tools/color-contrast-checker" style={s.cta}>Open Color Contrast Checker →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Need to convert between color formats first? Use our <Link href="/tools/hex-to-rgb" style={{ color: "#0D9488" }}>Hex to RGB Converter</Link> to translate HEX, RGB, HSL, and CMYK values.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
