import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SVG to PNG Converter: When & Why to Convert Vector to Raster",
  description: "Learn the differences between SVG and PNG, when to convert SVG to PNG, and how to do it online for free while maintaining quality.",
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
        <h1 style={s.h1}>SVG to PNG Converter: When & Why to Convert Vector to Raster</h1>
        <p style={s.meta}>November 2026 · 5 min read</p>

        <p style={s.p}>SVG and PNG serve fundamentally different purposes in the design world. SVG is a vector format — it scales to any size without losing quality. PNG is a raster format — it&apos;s made of pixels and has a fixed resolution. Both are essential, and knowing when to convert between them is a core skill for designers, developers, and content creators.</p>

        <h2 style={s.h2}>Understanding SVG and PNG</h2>
        <p style={s.p}>SVG (Scalable Vector Graphics) stores images as mathematical shapes and paths defined in XML code. This makes SVG files resolution-independent, lightweight, and perfect for logos, icons, illustrations, and anything that needs to look sharp at any size. PNG (Portable Network Graphics) stores images as a grid of colored pixels. It supports transparency and lossless compression, making it ideal for screenshots, photos with transparent backgrounds, and raster artwork where pixel-perfect rendering matters.</p>

        <h2 style={s.h2}>When to Convert SVG to PNG</h2>
        <p style={s.p}>Several common situations call for conversion. Social media platforms generally don&apos;t accept SVG uploads — they need PNG or JPG. Email clients render SVG inconsistently, so PNG is safer for email signatures and newsletter graphics. Some document formats and presentation tools don&apos;t support embedded SVGs. Print-on-demand services often require raster files at specific resolutions. And when you need to share a design with someone who doesn&apos;t have vector editing software, PNG ensures they see exactly what you intended.</p>

        <h2 style={s.h2}>Choosing the Right Resolution</h2>
        <p style={s.p}>The key advantage of SVG is that you can convert it to PNG at any resolution you need. For web use, export at 1x for standard displays and 2x for retina or high-DPI screens. For social media, check each platform&apos;s recommended dimensions — Instagram posts work best at 1080 by 1080 pixels, while Twitter headers need 1500 by 500. For print, you&apos;ll want at least 300 DPI at the final print size. Since SVG has no inherent resolution limit, you can always go back and re-export at a higher resolution if needed.</p>

        <h2 style={s.h2}>Maintaining Quality During Conversion</h2>
        <p style={s.p}>The conversion itself is straightforward, but a few details affect the output quality. Make sure your SVG uses embedded fonts or has text converted to outlines — otherwise, the PNG may render with substitute fonts. Check that all colors are defined correctly, as some SVG color modes may shift during rasterization. For SVGs with transparent backgrounds, PNG preserves that transparency perfectly. And always preview the output at the target size before using it, especially for small icons where aliasing can affect readability.</p>

        <h2 style={s.h2}>Convert Your SVGs Now</h2>
        <p style={s.p}>Our free <Link href="/tools/svg-to-png" style={{ color: "#0D9488" }}>SVG to PNG Converter</Link> lets you convert vector files to high-quality PNGs right in your browser. Set your desired dimensions, preserve transparency, and download instantly — no software installation or account needed.</p>
        <Link href="/tools/svg-to-png" style={s.cta}>Open SVG to PNG Converter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Working with other image formats? Use our <Link href="/tools/heic-to-jpg" style={{ color: "#0D9488" }}>HEIC to JPG Converter</Link> for iPhone photos, or add branding to your images with our <Link href="/tools/image-watermark" style={{ color: "#0D9488" }}>Image Watermark</Link> tool.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
