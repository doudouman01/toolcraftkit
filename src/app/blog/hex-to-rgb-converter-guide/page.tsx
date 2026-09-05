import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hex to RGB Converter: Translate Color Codes Between Formats",
  description: "Convert HEX color codes to RGB values and back. Essential for CSS, design handoff, and matching colors across tools.",
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
        <h1 style={s.h1}>Hex to RGB Converter: Translate Color Codes Between Formats</h1>
        <p style={s.meta}>September 5, 2026 · 3 min read</p>

        <p style={s.p}>Designers hand off HEX codes. Developers need RGB for CSS functions. Print shops want CMYK. The same color has different representations in different contexts. A color converter bridges these formats so you can work in whichever system your current tool requires.</p>

        <h2 style={s.h2}>HEX to RGB Conversion</h2>
        <p style={s.p}>HEX #0D9488 breaks down to: 0D = 13 (red), 94 = 148 (green), 88 = 136 (blue). So #0D9488 = rgb(13, 148, 136). Each hex pair converts to a decimal number from 0 to 255. You can do this mentally for simple values (FF = 255, 00 = 0, 80 = 128) or use a converter for precise values.</p>

        <h2 style={s.h2}>When You Need RGB</h2>
        <p style={s.p}>CSS rgba() function for transparency: rgba(13, 148, 136, 0.5) for 50% opacity — HEX does not support opacity in the same way (though modern CSS supports 8-digit HEX with alpha). JavaScript canvas operations use RGB values. Color calculations (blending, lightening, darkening) are easier in RGB.</p>

        <h2 style={s.h2}>When You Need HEX</h2>
        <p style={s.p}>CSS shorthand: #0D9488 is more compact than rgb(13, 148, 136). Design specifications: HEX codes are the standard in style guides and brand guidelines. Design tools: Figma, Sketch, and Photoshop all use HEX as their primary color input format.</p>

        <h2 style={s.h2}>HSL for Adjustments</h2>
        <p style={s.p}>Neither HEX nor RGB is intuitive for creating color variations. HSL (Hue, Saturation, Lightness) makes adjustments natural: increase lightness for a lighter version, decrease saturation for a muted version, shift hue for a different color entirely. Convert to HSL when creating palettes, then back to HEX for implementation.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Hex to RGB Converter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/hex-to-rgb" style={s.cta}>Open Hex to RGB Converter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/color-palette" style={{ color: "#0D9488" }}>Color Palette Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
