import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Resize Images for Print: DPI, Resolution & Quality Guide",
  description: "Understand DPI, resolution, and print dimensions. Resize images for business cards, posters, flyers, and photo prints without losing quality.",
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
        <h1 style={s.h1}>How to Resize Images for Print: DPI, Resolution & Quality Guide</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Print and screen have completely different resolution requirements. An image that looks perfect on your monitor may print blurry because it does not have enough pixels per inch. Understanding the relationship between pixels, DPI, and physical print size prevents wasted prints and reprinting costs.</p>

        <h2 style={s.h2}>DPI Explained Simply</h2>
        <p style={s.p}>DPI means Dots Per Inch — how many pixels are printed in each inch of the physical output. Screens display at 72-96 DPI. Standard print quality requires 300 DPI. Large format prints (posters, banners) can use 150 DPI because they are viewed from further away. A 3000x2000 pixel image prints at 10x6.67 inches at 300 DPI, or 20x13.3 inches at 150 DPI.</p>

        <h2 style={s.h2}>Minimum Pixels for Common Print Sizes</h2>
        <p style={s.p}>Business card (3.5 x 2 inches at 300 DPI): 1050 x 600 pixels minimum. A4 paper (8.27 x 11.69 inches at 300 DPI): 2481 x 3507 pixels. Poster (24 x 36 inches at 150 DPI): 3600 x 5400 pixels. Photo print 4x6 at 300 DPI: 1200 x 1800 pixels. Always check your image dimensions against these minimums before sending to print.</p>

        <h2 style={s.h2}>Upscaling vs Downscaling</h2>
        <p style={s.p}>Downscaling (making images smaller) always works — you are removing pixels. Upscaling (making images larger) creates blurry results because the software must invent pixels that do not exist. Never upscale an image for print. If your source image is too small, you need to either get a higher-resolution original or reduce the physical print size.</p>

        <h2 style={s.h2}>Color Space: RGB vs CMYK</h2>
        <p style={s.p}>Screens use RGB (Red, Green, Blue). Printers use CMYK (Cyan, Magenta, Yellow, Key/Black). Some colors that look vibrant on screen cannot be reproduced in print — especially bright blues and greens. Professional print shops prefer CMYK files. For home printing and online print services, RGB is usually fine as they convert automatically.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Image Resizer handles this instantly — no signup, no limits.</p>
        <Link href="/tools/image-resizer" style={s.cta}>Open Image Resizer →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>Image Compressor</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
