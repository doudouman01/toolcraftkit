import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Invoice Templates for Freelancers (Download & Customize)",
  description: "Get free invoice templates for freelancers, consultants, and small businesses. Learn what to include, common formats, and how to customize for your brand.",
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
        <h1 style={s.h1}>Free Invoice Templates for Freelancers (Download & Customize)</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>As a freelancer, your invoice is often the last impression a client has of your work on a project. A clean, professional invoice builds trust and gets you paid faster. But most freelancers — especially those just starting out — do not want to pay for invoicing software or spend time designing templates from scratch.</p>

        <h2 style={s.h2}>Types of Invoice Templates</h2>
        <p style={s.p}><strong>Hourly invoice</strong> — for time-based work. Lists hours worked, hourly rate, and a description of what was done during each time block. Ideal for consultants, developers, and virtual assistants.</p>
        <p style={s.p}><strong>Project-based invoice</strong> — for fixed-price projects. Lists deliverables and milestones with their agreed prices. Common for designers, writers, and agencies.</p>
        <p style={s.p}><strong>Recurring invoice</strong> — for ongoing retainers or subscription services. Same format each month with consistent line items. Perfect for marketing retainers, maintenance contracts, and monthly services.</p>
        <p style={s.p}><strong>Expense invoice</strong> — for reimbursable costs. Lists materials, travel, or other expenses with receipts attached. Useful for contractors who purchase supplies on behalf of clients.</p>

        <h2 style={s.h2}>How to Customize Your Invoice</h2>
        <p style={s.p}><strong>Add your branding</strong> — include your business name, logo, and contact information at the top. Consistent branding across invoices reinforces your professionalism.</p>
        <p style={s.p}><strong>Set clear payment terms</strong> — specify when payment is due (Net 15, Net 30, Due on Receipt) and what payment methods you accept. The more specific you are, the fewer questions clients will have.</p>
        <p style={s.p}><strong>Number your invoices</strong> — use a consistent numbering system. A common format is year-month-number: INV-2026-09-001. This makes tracking and tax filing much easier.</p>
        <p style={s.p}><strong>Include late payment terms</strong> — state your late payment policy upfront. A standard approach is a 1.5 percent monthly fee on overdue amounts. Having it on the invoice sets expectations before payment is late.</p>

        <h2 style={s.h2}>Common Template Mistakes</h2>
        <p style={s.p}>Forgetting to include your payment details is the most common mistake. Every invoice should clearly state how the client should pay — bank account number, PayPal email, or payment link. Do not make them ask.</p>
        <p style={s.p}>Using vague line item descriptions delays payment. &quot;Design work&quot; tells the client nothing. &quot;Homepage redesign — wireframes, mockup, and final HTML/CSS (June 10-24)&quot; tells them exactly what they are paying for.</p>

        <h2 style={s.h2}>Generate Your Invoice Now</h2>
        <p style={s.p}>Our free Invoice Generator lets you create clean, professional invoices in seconds. Add your details, line items, and tax — then download as PDF or print directly. No account needed.</p>
        <Link href="/tools/invoice-generator" style={s.cta}>Open Invoice Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Need to calculate project costs or discounts? Our <Link href="/tools/discount-calculator" style={{ color: "#0D9488" }}>Discount Calculator</Link> handles percentage-off pricing instantly.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
