import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Contrast Checker: Ensure Your Design Is Accessible to Everyone",
  description: "Check if your text and background colors meet WCAG accessibility standards. Free contrast ratio checker with pass/fail results.",
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
        <h1 style={s.h1}>Color Contrast Checker: Ensure Your Design Is Accessible to Everyone</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Approximately 1 in 12 men and 1 in 200 women have some form of color vision deficiency. Low contrast text is unreadable for people with low vision, and uncomfortable for everyone else. Accessibility is not a niche concern — it is good design that serves all users better.</p>

        <h2 style={s.h2}>WCAG Contrast Standards</h2>
        <p style={s.p}>WCAG Level AA (minimum) requires a contrast ratio of 4.5:1 for normal text (under 18px) and 3:1 for large text (18px+ or 14px+ bold). Level AAA (enhanced) requires 7:1 for normal text and 4.5:1 for large text. Most websites should aim for AA compliance at minimum. Government and education sites often require AAA.</p>

        <h2 style={s.h2}>Common Failures</h2>
        <p style={s.p}>Light gray text on white backgrounds is the most common accessibility failure. Trendy low-contrast designs (light text on pastel backgrounds) look aesthetic but fail users with any vision impairment. Placeholder text in form fields is often too low contrast. Colored text on colored backgrounds frequently fails — always check the math.</p>

        <h2 style={s.h2}>How to Check Contrast</h2>
        <p style={s.p}>Enter your text color and background color (in HEX or RGB) into a contrast checker. The tool calculates the ratio and reports pass or fail for AA and AAA standards. If your combination fails, adjust the darker color to be darker or the lighter color to be lighter until the ratio meets the threshold.</p>

        <h2 style={s.h2}>Practical Tips</h2>
        <p style={s.p}>Black text on white has a 21:1 ratio (maximum contrast). Dark gray (#333) on white has 12.6:1 (excellent). For colored text, check contrast against both light and dark backgrounds. For interactive elements (buttons, links), contrast requirements apply to both the default and hover states. Test with users who have vision impairments when possible.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Hex to RGB Converter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/hex-to-rgb" style={s.cta}>Open Hex to RGB Converter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/color-palette" style={{ color: "#0D9488" }}>Color Palette Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
