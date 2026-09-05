import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free Online Tools for Etsy Sellers & Small E-Commerce",
  description: "Free tools for Etsy sellers and small online shops: image optimization, invoice creation, QR codes, and product description formatting.",
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
        <h1 style={s.h1}>Best Free Online Tools for Etsy Sellers & Small E-Commerce</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Etsy sellers and small e-commerce operators often work without dedicated design or business software. These free tools handle the most common tasks — optimizing product photos, creating invoices, generating marketing materials, and formatting descriptions — without monthly subscriptions eating into thin margins.</p>

        <h2 style={s.h2}>Product Photography</h2>
        <p style={s.p}>Image Compressor reduces product photo file sizes for fast listing page loads — Etsy penalizes slow-loading listings in search. Image Resizer ensures photos meet Etsy's recommended 2000x2000px square format. Properly optimized images improve both search ranking and buyer experience.</p>

        <h2 style={s.h2}>Business Operations</h2>
        <p style={s.p}>Invoice Generator creates professional invoices for wholesale orders, custom commissions, and bulk purchases. Percentage Calculator handles pricing — markups, discounts, and margin calculations. ROI Calculator evaluates whether paid promotions and advertising are profitable.</p>

        <h2 style={s.h2}>Marketing</h2>
        <p style={s.p}>QR Code Generator creates codes for packaging inserts, business cards, and market booth signage — linking to your Etsy shop, social media, or a review request page. Image to PDF creates lookbooks and catalogs from product photos for wholesale inquiries.</p>

        <h2 style={s.h2}>Content and SEO</h2>
        <p style={s.p}>Word Counter checks that your product descriptions hit Etsy's recommended length for search visibility. Case Converter formats titles consistently across your listings. Character Counter ensures your titles stay within Etsy's 140-character limit. These small optimizations compound across dozens or hundreds of listings.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Image Compressor handles this instantly — no signup, no limits.</p>
        <Link href="/tools/image-compressor" style={s.cta}>Open Image Compressor →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/invoice-generator" style={{ color: "#0D9488" }}>Invoice Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
