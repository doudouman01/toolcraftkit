import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HEX, RGB, HSL Explained: Color Codes for Designers and Developers",
  description: "Understand the difference between HEX, RGB, and HSL color codes. Learn when to use each format and convert between them with free online tools.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
    table: { width: "100%", borderCollapse: "collapse" as const, marginBottom: 20, fontSize: 14 },
    th: { padding: "10px 12px", background: "#F5F5F4", textAlign: "left" as const, fontWeight: 600, fontSize: 13, borderBottom: "2px solid #E7E5E4" },
    td: { padding: "10px 12px", borderBottom: "1px solid #F5F5F4" },
    code: { background: "#F5F5F4", padding: "2px 8px", borderRadius: 4, fontSize: 14, fontFamily: "monospace" } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>HEX, RGB, HSL Explained: A Guide to Color Codes</h1>
        <p style={s.meta}>September 3, 2026 · 5 min read</p>

        <p style={s.p}>Every color on your screen is defined by a code. Whether you are designing a website, building a brand, or just trying to match a color you saw somewhere, understanding color code formats — HEX, RGB, and HSL — is essential. Each format represents the same colors but in different ways, and each has specific advantages depending on what you are doing.</p>

        <h2 style={s.h2}>HEX Colors</h2>
        <p style={s.p}>HEX is the most widely used format in web design. It is a 6-character code preceded by a hash sign — like <span style={s.code}>#0D9488</span> (the teal color used on this site). The six characters represent three pairs: the first two for red, the middle two for green, and the last two for blue, each ranging from 00 (none) to FF (maximum).</p>
        <p style={s.p}>HEX is compact and easy to copy-paste, which makes it the default choice for CSS, design tools, and brand guidelines. The main limitation is that it is not intuitive — you cannot easily guess what <span style={s.code}>#7C3AED</span> looks like without a tool.</p>

        <h2 style={s.h2}>RGB Colors</h2>
        <p style={s.p}>RGB defines colors using three numbers from 0 to 255 — one for red, one for green, one for blue. The same teal would be <span style={s.code}>rgb(13, 148, 136)</span>. RGB is more readable than HEX because the numbers directly represent the intensity of each channel.</p>
        <p style={s.p}>RGBA adds a fourth value — alpha — for transparency. <span style={s.code}>rgba(13, 148, 136, 0.5)</span> gives you the same teal at 50% opacity. This is extremely useful for overlays, shadows, and layered designs.</p>

        <h2 style={s.h2}>HSL Colors</h2>
        <p style={s.p}>HSL stands for Hue, Saturation, Lightness. Hue is the color itself (0-360 degrees on the color wheel), saturation is the intensity (0% gray to 100% vivid), and lightness is the brightness (0% black to 100% white). The teal example would be approximately <span style={s.code}>hsl(175, 84%, 32%)</span>.</p>
        <p style={s.p}>HSL is the most intuitive format for humans. Want a darker version of your color? Reduce lightness. Want a muted version? Reduce saturation. Want a complementary color? Add 180 to the hue. These adjustments are trivial in HSL but require complex calculations in HEX or RGB.</p>

        <h2 style={s.h2}>When to Use Each Format</h2>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}>Format</th><th style={s.th}>Best For</th></tr>
          </thead>
          <tbody>
            {[
              ["HEX", "CSS, design tools, brand guidelines, sharing colors"],
              ["RGB / RGBA", "CSS with transparency, programmatic color manipulation, canvas"],
              ["HSL / HSLA", "Creating color variations, building palettes, accessibility adjustments"],
              ["CMYK", "Print design only — not used on screens"],
            ].map(([format, use], i) => (
              <tr key={i}><td style={s.td}>{format}</td><td style={s.td}>{use}</td></tr>
            ))}
          </tbody>
        </table>

        <h2 style={s.h2}>Building a Color Palette</h2>
        <p style={s.p}>A good color palette typically includes a primary color, a secondary color, a neutral (gray) scale, and an accent for calls to action. Start with your primary color in HSL, then create variations by adjusting lightness (for hover states, backgrounds, and borders) and find complementary or analogous hues by shifting the hue value.</p>

        <h2 style={s.h2}>Accessibility and Contrast</h2>
        <p style={s.p}>Color contrast is not just a design preference — it is an accessibility requirement. The Web Content Accessibility Guidelines (WCAG) require a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text. Low contrast makes text difficult to read for people with visual impairments and for everyone in bright sunlight.</p>

        <h2 style={s.h2}>Convert Colors Now</h2>
        <p style={s.p}>Use our free Hex to RGB Converter to convert between HEX, RGB, HSL, and CMYK instantly. Includes a visual color picker and contrast checker.</p>
        <Link href="/tools/hex-to-rgb" style={s.cta}>Open Hex to RGB Converter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Need a complete palette? Our <Link href="/tools/color-palette" style={{ color: "#0D9488" }}>Color Palette Generator</Link> creates harmonious color schemes from any starting color.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
