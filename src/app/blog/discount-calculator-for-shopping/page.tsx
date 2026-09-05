import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discount Calculator: How to Calculate Sale Prices & Double Discounts",
  description: "Figure out final prices after single or stacked discounts, including tax. Never overpay during a sale again. Free online calculator.",
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
        <h1 style={s.h1}>Discount Calculator: How to Calculate Sale Prices & Double Discounts</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Sales and discounts sound simple — until you encounter stacked discounts, coupons on top of clearance prices, and sales tax added afterward. That 50% off sign does not always mean you pay half price. Knowing how to calculate the actual final price prevents surprises at checkout.</p>

        <h2 style={s.h2}>Simple Discount Calculation</h2>
        <p style={s.p}>Original price × (1 - discount rate) = sale price. A $200 item at 30% off: $200 × 0.70 = $140. For quick mental math, find 10% first and work from there. 10% of $200 is $20, so 30% is $60 off, giving you $140.</p>

        <h2 style={s.h2}>Stacked Discounts Are Not Additive</h2>
        <p style={s.p}>An extra 20% off an item already 40% off is NOT 60% off. The first discount brings a $100 item to $60. The second discount takes 20% off $60, giving $48. The total discount is 52%, not 60%. This is how stores make stacked discounts sound bigger than they are.</p>

        <h2 style={s.h2}>Adding Sales Tax</h2>
        <p style={s.p}>Calculate the discount first, then add tax to the discounted price. A $100 item at 25% off with 8% sales tax: discounted price is $75, tax is $75 × 0.08 = $6, final price is $81. In some regions, tax is calculated on the original price before discount — know your local rules.</p>

        <h2 style={s.h2}>Is the Sale Actually Good?</h2>
        <p style={s.p}>Compare the per-unit price, not the discount percentage. A 50% off deal on a $30 item ($15 final) might be worse than a 30% off deal on a $18 item ($12.60 final) for the exact same product at a different store. The percentage means nothing without the starting price.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Discount Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/discount-calculator" style={s.cta}>Open Discount Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/percentage-calculator" style={{ color: "#0D9488" }}>Percentage Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
