import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free Online Tools for Freelancers & Small Businesses in 2026",
  description: "A curated list of free online tools every freelancer needs in 2026. From invoicing to image editing, PDF management to QR codes — all browser-based.",
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
        <h1 style={s.h1}>Best Free Online Tools for Freelancers & Small Businesses in 2026</h1>
        <p style={s.meta}>September 5, 2026 · 6 min read</p>

        <p style={s.p}>Running a freelance business or small company means wearing many hats. You handle design, invoicing, document management, marketing, and client communication — often all in the same day. The right set of free tools can save hours every week without adding subscription costs to your overhead.</p>

        <h2 style={s.h2}>Invoicing & Finance</h2>
        <p style={s.p}><strong>Invoice Generator</strong> — create professional invoices with line items, tax calculations, and your business details. Download as PDF and send directly to clients. No templates to configure, no accounts to create. <Link href="/tools/invoice-generator" style={{ color: "#0D9488" }}>Try it free →</Link></p>
        <p style={s.p}><strong>Discount Calculator</strong> — quickly calculate percentage-off pricing for client proposals and quotes. Enter the original price and discount percentage to see the final amount. <Link href="/tools/discount-calculator" style={{ color: "#0D9488" }}>Try it free →</Link></p>
        <p style={s.p}><strong>ROI Calculator</strong> — evaluate whether a marketing campaign, tool purchase, or business investment is worth the cost before committing. <Link href="/tools/roi-calculator" style={{ color: "#0D9488" }}>Try it free →</Link></p>

        <h2 style={s.h2}>Image & Design</h2>
        <p style={s.p}><strong>Image Compressor</strong> — reduce image file sizes for websites, portfolios, and email attachments without visible quality loss. Essential for anyone who works with visual content. <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>Try it free →</Link></p>
        <p style={s.p}><strong>Image Resizer</strong> — resize images to exact dimensions for social media posts, website headers, or client deliverables. Supports all common formats. <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>Try it free →</Link></p>
        <p style={s.p}><strong>Color Palette Generator</strong> — create harmonious color schemes for branding, website design, or presentation materials. Export hex codes for immediate use. <Link href="/tools/color-palette" style={{ color: "#0D9488" }}>Try it free →</Link></p>

        <h2 style={s.h2}>Documents & PDFs</h2>
        <p style={s.p}><strong>PDF Merge</strong> — combine multiple PDF documents into one file. Perfect for compiling reports, proposals, or contract packages. <Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>Try it free →</Link></p>
        <p style={s.p}><strong>Image to PDF</strong> — convert photos of receipts, documents, or design work into professional PDF files. <Link href="/tools/image-to-pdf" style={{ color: "#0D9488" }}>Try it free →</Link></p>
        <p style={s.p}><strong>Text to PDF</strong> — turn notes, proposals, or code snippets into downloadable PDF documents without opening a word processor. <Link href="/tools/text-to-pdf" style={{ color: "#0D9488" }}>Try it free →</Link></p>

        <h2 style={s.h2}>Marketing & Communication</h2>
        <p style={s.p}><strong>QR Code Generator</strong> — create QR codes for your website, WiFi network, payment links, or contact information. Perfect for business cards, flyers, and storefronts. <Link href="/tools/qr-code" style={{ color: "#0D9488" }}>Try it free →</Link></p>
        <p style={s.p}><strong>Word Counter</strong> — track word count, character count, and reading time for blog posts, articles, and social media content. <Link href="/tools/word-counter" style={{ color: "#0D9488" }}>Try it free →</Link></p>
        <p style={s.p}><strong>Case Converter</strong> — instantly convert text between uppercase, lowercase, title case, and sentence case. Saves time on formatting for headlines and copy. <Link href="/tools/text-case-converter" style={{ color: "#0D9488" }}>Try it free →</Link></p>

        <h2 style={s.h2}>Why Browser-Based Tools Matter</h2>
        <p style={s.p}>Desktop software requires installation, updates, and often a subscription. Browser-based tools work on any device — your laptop at home, a shared computer at a coworking space, or your phone on the go. They load instantly, require no sign-up, and your data stays on your device.</p>

        <h2 style={s.h2}>Explore All Tools</h2>
        <p style={s.p}>ToolCraftKit offers 35+ free tools for text, business, images, PDFs, development, and everyday calculations — all in your browser.</p>
        <Link href="/" style={s.cta}>Browse All Tools →</Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
