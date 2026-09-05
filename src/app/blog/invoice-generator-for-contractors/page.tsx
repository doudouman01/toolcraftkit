import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoice Generator for Contractors: Get Paid Faster on Every Job",
  description: "Create professional contractor invoices with progress billing, change orders, and retention. Free generator with PDF download.",
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
        <h1 style={s.h1}>Invoice Generator for Contractors: Get Paid Faster on Every Job</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Contractors face unique invoicing challenges. Projects span weeks or months. Clients expect progress billing. Change orders modify the original scope. Retention holdbacks delay final payment. A generic invoice template does not cover these situations — you need an invoicing approach designed for project-based work.</p>

        <h2 style={s.h2}>Progress Billing Invoices</h2>
        <p style={s.p}>For long projects, invoice at milestones or on a regular schedule (weekly, bi-weekly, monthly). Each invoice should reference the total contract amount, previous billings, current billing, and remaining balance. This gives the client a clear picture of where the project stands financially.</p>

        <h2 style={s.h2}>Handling Change Orders</h2>
        <p style={s.p}>When scope changes, document it on the invoice. List the original contract amount, approved change orders with descriptions and amounts, and the revised total. Never bury change order costs in regular line items — transparency prevents disputes.</p>

        <h2 style={s.h2}>Retention and Final Invoices</h2>
        <p style={s.p}>Many construction contracts withhold 5-10% as retention until project completion. Your progress invoices should show the retention amount being held. Your final invoice releases the retention after the client approves the completed work. Track retention carefully — it adds up across multiple projects.</p>

        <h2 style={s.h2}>Getting Paid Faster</h2>
        <p style={s.p}>Invoice immediately upon completing a milestone — delays signal that payment is not urgent. Include your payment terms prominently (Net 15, Net 30). Offer a small discount for early payment (2/10 Net 30 means 2% off if paid within 10 days). Follow up the day after the due date with a polite reminder.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Invoice Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/invoice-generator" style={s.cta}>Open Invoice Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/percentage-calculator" style={{ color: "#0D9488" }}>Percentage Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
