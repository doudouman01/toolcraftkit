import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Create a Professional Invoice (Free Template + Tips)",
  description: "Learn what every invoice must include, common mistakes that delay payment, and how to create professional invoices instantly with a free online generator.",
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
        <h1 style={s.h1}>How to Create a Professional Invoice (Free Template + Tips)</h1>
        <p style={s.meta}>September 3, 2026 · 5 min read</p>

        <p style={s.p}>A professional invoice is not just a payment request — it is a reflection of your business. A clean, complete invoice gets you paid faster, reduces back-and-forth with clients, and creates a paper trail for tax season. Whether you are a freelancer, consultant, or small business owner, getting your invoicing right is one of the simplest things you can do to look professional and get paid on time.</p>

        <h2 style={s.h2}>What Every Invoice Must Include</h2>
        <p style={s.p}><strong>Your business name and contact information</strong> — name, address, email, and phone number. If you have a logo, include it for brand recognition.</p>
        <p style={s.p}><strong>Client information</strong> — the name and address of the person or company you are billing. Match this to what they use for their accounting records.</p>
        <p style={s.p}><strong>Invoice number</strong> — a unique sequential number for tracking. Use a simple system like INV-001, INV-002, or include the date: INV-2026-09-001.</p>
        <p style={s.p}><strong>Invoice date and due date</strong> — when the invoice was issued and when payment is expected. Common terms are Net 15 (due in 15 days), Net 30, or Due on Receipt.</p>
        <p style={s.p}><strong>Itemized list of services or products</strong> — each line item should include a description, quantity, unit price, and line total. Be specific enough that the client knows exactly what they are paying for.</p>
        <p style={s.p}><strong>Subtotal, tax, and total</strong> — clearly show the math. If tax applies, list the rate and amount separately.</p>
        <p style={s.p}><strong>Payment instructions</strong> — how the client should pay (bank transfer, PayPal, check) and any account details needed.</p>

        <h2 style={s.h2}>Common Mistakes That Delay Payment</h2>
        <p style={s.p}><strong>Missing or incorrect client details</strong> — if the billing name does not match their records, the invoice gets stuck in their accounting department. Always confirm billing details before invoicing.</p>
        <p style={s.p}><strong>Vague descriptions</strong> — &quot;Consulting services&quot; tells the client nothing. Instead, write &quot;Brand strategy workshop — 3 hours (June 15)&quot; or &quot;Website development — homepage and 5 inner pages.&quot;</p>
        <p style={s.p}><strong>No due date</strong> — without a clear deadline, your invoice goes to the bottom of the pile. Always include a specific date, not just &quot;Net 30.&quot;</p>
        <p style={s.p}><strong>Missing payment instructions</strong> — do not assume the client knows how to pay you. Include your bank details, PayPal email, or payment link on every invoice.</p>

        <h2 style={s.h2}>When to Send Your Invoice</h2>
        <p style={s.p}>Send your invoice immediately upon delivering the work or service — not days or weeks later. The longer you wait, the less urgency the client feels to pay. For ongoing projects, agree on a billing schedule upfront (weekly, bi-weekly, or milestone-based) and stick to it.</p>

        <h2 style={s.h2}>Following Up on Late Payments</h2>
        <p style={s.p}>Send a polite reminder the day after the due date. Follow up again at 7 days and 14 days. After 30 days, escalate with a phone call or a formal notice. Many late payments are not intentional — they are simply forgotten. A professional, consistent follow-up system solves most payment delays.</p>

        <h2 style={s.h2}>Create Your Invoice Now</h2>
        <p style={s.p}>Use our free Invoice Generator to create clean, professional invoices in seconds. Add your details, line items, and tax — then download as PDF or print directly.</p>
        <Link href="/tools/invoice-generator" style={s.cta}>Open Invoice Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Need to calculate discounts for a client? Our <Link href="/tools/discount-calculator" style={{ color: "#0D9488" }}>Discount Calculator</Link> handles percentage-off pricing instantly.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
