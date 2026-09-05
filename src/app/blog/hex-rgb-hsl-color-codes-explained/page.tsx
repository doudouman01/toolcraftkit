import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HEX, RGB, and HSL Color Codes Explained (With Converter)",
  description: "Understand the difference between HEX, RGB, and HSL color codes. Learn when to use each format and how to convert between them.",
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
        <h1 style={s.h1}>HEX, RGB, and HSL Color Codes Explained (With Converter)</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>HEX, RGB, and HSL are three ways to represent the same color. Each format has advantages depending on the context — CSS, design tools, print, or programming. Understanding when to use each format and how to convert between them is essential for anyone working with color in digital media.</p>

        <h2 style={s.h2}>HEX Codes</h2>
        <p style={s.p}>HEX represents colors as a 6-character string: #0D9488. The first two characters (0D) represent red, the middle two (94) represent green, and the last two (88) represent blue. Each pair is a hexadecimal value from 00 (none) to FF (maximum). HEX is the most common format in CSS and web design because it is compact and widely recognized.</p>

        <h2 style={s.h2}>RGB Values</h2>
        <p style={s.p}>RGB represents colors as three numbers: rgb(13, 148, 136). Each number ranges from 0 to 255, representing the intensity of Red, Green, and Blue light. RGB is intuitive when you need to adjust a specific channel — increasing the red value makes the color warmer, increasing blue makes it cooler. CSS supports both rgb() and rgba() with an alpha transparency channel.</p>

        <h2 style={s.h2}>HSL Values</h2>
        <p style={s.p}>HSL represents colors as Hue (0-360°), Saturation (0-100%), and Lightness (0-100%): hsl(174, 84%, 32%). HSL is the most intuitive for humans because adjusting lightness makes a color lighter or darker, adjusting saturation makes it more or less vivid, and adjusting hue shifts it around the color wheel. CSS supports hsl() and hsla().</p>

        <h2 style={s.h2}>When to Use Each</h2>
        <p style={s.p}>HEX for CSS shorthand and design specifications. RGB when programmatically adjusting individual color channels. HSL when creating color variations (lighter, darker, more muted versions of the same hue). All three represent the same colors — use whichever is most convenient for your workflow and convert as needed.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Hex to RGB Converter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/hex-to-rgb" style={s.cta}>Open Hex to RGB Converter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/color-palette" style={{ color: "#0D9488" }}>Color Palette Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
