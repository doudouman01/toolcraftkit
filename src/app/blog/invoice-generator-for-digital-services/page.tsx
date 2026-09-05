import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Invoice for Digital Services: Web Design, Marketing & Consulting",
  description: "Create invoices for digital services with proper scope descriptions, retainer billing, and payment terms. Free invoice generator for service providers.",
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
        <h1 style={s.h1}>How to Invoice for Digital Services: Web Design, Marketing & Consulting</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Invoicing for digital services is different from invoicing for physical products. You cannot point to a tangible item that was delivered. Your line items describe intangible work — strategy sessions, code written, campaigns managed, designs created. Making this work visible on an invoice is essential for getting paid without friction.</p>

        <h2 style={s.h2}>Describe Services Clearly</h2>
        <p style={s.p}>Never write just Web Development or Marketing Services. Instead: Website redesign — 5-page responsive site with contact form (wireframe, design, development, testing) — delivered June 15-July 20. Or: Google Ads management — June 2026 — $5,000 ad spend managed, 12 campaigns, 47 ad groups, bi-weekly optimization. Specificity eliminates questions.</p>

        <h2 style={s.h2}>Retainer Billing</h2>
        <p style={s.p}>For ongoing services, invoice on the same day each month with consistent line items. Monthly SEO retainer — July 2026 — keyword research, 4 blog posts, technical audit, link building. List what was included, not just the retainer label. This justifies the recurring cost and prevents clients from questioning value.</p>

        <h2 style={s.h2}>Project-Based vs Hourly</h2>
        <p style={s.p}>Project-based invoices list deliverables and agreed prices. Hourly invoices list dates, hours, descriptions, and rate. For hourly work, use time tracking software and attach a time log as supporting documentation. Rounded hours (always billing 8.0 hours) look suspicious — bill exact time.</p>

        <h2 style={s.h2}>Late Payment Prevention</h2>
        <p style={s.p}>Include payment terms on every invoice. Offer multiple payment methods — bank transfer, credit card, PayPal. Add late payment fees to your terms (1.5% per month is standard). Most importantly, send invoices promptly — the longer you wait, the less urgent the client treats payment.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Invoice Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/invoice-generator" style={s.cta}>Open Invoice Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/roi-calculator" style={{ color: "#0D9488" }}>ROI Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
