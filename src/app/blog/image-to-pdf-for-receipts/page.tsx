import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Convert Receipt Photos to PDF for Expense Reports",
  description: "Turn receipt photos into organized PDF documents for expense tracking, tax deductions, and reimbursement submissions.",
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
        <h1 style={s.h1}>How to Convert Receipt Photos to PDF for Expense Reports</h1>
        <p style={s.meta}>September 5, 2026 · 3 min read</p>

        <p style={s.p}>Paper receipts fade, wrinkle, and disappear. Photographing them with your phone preserves the information, but a folder of randomly-named JPG files is not much better. Converting receipt photos to organized PDF documents creates a permanent, searchable, submittable record of your expenses.</p>

        <h2 style={s.h2}>Capturing Good Receipt Photos</h2>
        <p style={s.p}>Photograph receipts immediately — thermal paper fades within months. Lay the receipt flat on a contrasting background. Ensure the entire receipt including date, vendor, items, and total is visible. Use your phone's document scanning mode if available — it corrects perspective and enhances contrast automatically.</p>

        <h2 style={s.h2}>Organizing by Trip or Category</h2>
        <p style={s.p}>For expense reports, group receipts by trip or project. Convert all receipts from one business trip into a single multi-page PDF named ExpenseReport-London-Sept2026.pdf. For tax purposes, organize by category: meals, transportation, supplies, equipment.</p>

        <h2 style={s.h2}>File Size Optimization</h2>
        <p style={s.p}>Receipt photos can be large — 3-8 MB each from a modern smartphone. Compress images before converting to PDF. A receipt does not need high resolution — the text just needs to be legible. Compressing receipt photos to 200-500 KB each keeps the final PDF at a reasonable size for email submission.</p>

        <h2 style={s.h2}>Submission and Storage</h2>
        <p style={s.p}>Most expense tracking systems and accountants accept PDF uploads. Keep a digital copy of every receipt for at least 7 years (IRS records retention recommendation for tax-related documents). Cloud storage ensures your receipts survive phone changes and hardware failures.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Image to PDF handles this instantly — no signup, no limits.</p>
        <Link href="/tools/image-to-pdf" style={s.cta}>Open Image to PDF →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>Image Compressor</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
