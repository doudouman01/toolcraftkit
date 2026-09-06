import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free Online Tools for Small Business Owners in 2026",
  description: "Essential free tools for small business operations: invoicing, calculations, document management, marketing, and customer communication.",
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
        <h1 style={s.h1}>Best Free Online Tools for Small Business Owners in 2026</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Small business owners wear every hat — accountant, marketer, designer, administrator. Paid software for each role adds up fast. These free browser-based tools cover the most essential tasks without adding to your monthly overhead. Every dollar not spent on software is a dollar that stays in your business.</p>

        <h2 style={s.h2}>Financial Tools</h2>
        <p style={s.p}>Invoice Generator creates professional invoices for clients. Percentage Calculator handles markups, discounts, and margin calculations. ROI Calculator evaluates whether marketing spend and business investments are profitable. Compound Interest Calculator projects savings growth and loan costs. These replace expensive accounting software for basic financial tasks.</p>

        <h2 style={s.h2}>Marketing Tools</h2>
        <p style={s.p}>QR Code Generator creates codes for business cards, flyers, and storefronts. Image Compressor optimizes website and social media images. Image Resizer fits photos to platform-specific dimensions. Color Palette Generator builds brand-consistent color schemes. These handle daily marketing tasks without design software.</p>

        <h2 style={s.h2}>Document Management</h2>
        <p style={s.p}>PDF Merge combines business documents into professional packages. Image to PDF converts receipts and signed contracts to digital records. Text to PDF creates quick documents from notes. These eliminate the need for PDF software subscriptions.</p>

        <h2 style={s.h2}>Communication and Content</h2>
        <p style={s.p}>Word Counter ensures emails and social posts hit optimal lengths. Case Converter formats headlines and titles consistently. Password Generator secures business accounts. These small utilities prevent the minor annoyances that interrupt workflow.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Invoice Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/invoice-generator" style={s.cta}>Open Invoice Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/qr-code-generator" style={{ color: "#0D9488" }}>QR Code Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
