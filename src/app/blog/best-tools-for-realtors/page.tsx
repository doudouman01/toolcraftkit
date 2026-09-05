import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free Online Tools for Real Estate Agents in 2026",
  description: "Free tools for real estate professionals: mortgage calculators, document management, image optimization for listings, and QR codes for signage.",
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
        <h1 style={s.h1}>Best Free Online Tools for Real Estate Agents in 2026</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Real estate agents juggle listings, client communications, open houses, and paperwork. The right free tools streamline these tasks without adding to your already-packed technology stack. These browser-based utilities work on your phone at a showing just as well as on your office computer.</p>

        <h2 style={s.h2}>Financial Calculations</h2>
        <p style={s.p}>Mortgage Calculator shows clients their estimated monthly payment during showings — the single most asked question. Percentage Calculator helps with commission calculations, price reductions, and offer percentages. Loan Calculator compares different financing scenarios side by side.</p>

        <h2 style={s.h2}>Listing Photography</h2>
        <p style={s.p}>Image Compressor optimizes listing photos for MLS uploads without losing quality. Image Resizer ensures photos meet MLS dimension requirements. Most MLS systems have file size limits — compressed, properly sized images upload faster and display better on all devices.</p>

        <h2 style={s.h2}>Marketing Materials</h2>
        <p style={s.p}>QR Code Generator creates scannable codes for yard signs, flyers, and business cards — linking to virtual tours, listing pages, or your contact information. A QR code on a For Sale sign that links to a virtual tour lets interested buyers see the home's interior 24/7, even when the house is locked.</p>

        <h2 style={s.h2}>Document Management</h2>
        <p style={s.p}>PDF Merge combines offers, counteroffers, disclosures, and inspection reports into organized packages. Image to PDF converts photographed documents (signed contracts at the kitchen table) into proper PDF files for records and email.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Mortgage Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/mortgage-calculator" style={s.cta}>Open Mortgage Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/qr-code" style={{ color: "#0D9488" }}>QR Code Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
