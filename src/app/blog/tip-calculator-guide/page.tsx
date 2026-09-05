import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tip Calculator: How to Split Bills and Calculate Tips for Any Occasion",
  description: "Calculate tips for restaurants, delivery, hair salons, and services. Split bills evenly or by item. Quick reference tipping guide.",
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
        <h1 style={s.h1}>Tip Calculator: How to Split Bills and Calculate Tips for Any Occasion</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Tipping can be confusing — different services have different customs, and splitting a bill among a group adds math to an already complicated situation. A tip calculator removes the guesswork and ensures you tip appropriately every time.</p>

        <h2 style={s.h2}>Standard Tipping Rates</h2>
        <p style={s.p}>Sit-down restaurants: 15-20% of the pre-tax bill. Takeout: 10-15% (optional but appreciated). Delivery: 15-20% or a minimum of $5. Hair salon: 15-20%. Taxi and rideshare: 15-20%. Hotel housekeeping: $2-5 per night. Valet parking: $2-5. Coffee shop: $1-2 or 10-15%.</p>

        <h2 style={s.h2}>Splitting the Bill</h2>
        <p style={s.p}>For even splits: total bill + tip divided by number of people. For splits by item: each person calculates their subtotal + proportional share of tax and tip. Even splits are simpler but can feel unfair when one person ordered significantly more. Decide the method before ordering to avoid awkward post-meal math.</p>

        <h2 style={s.h2}>When to Adjust the Tip</h2>
        <p style={s.p}>Tip on the pre-tax amount — sales tax should not inflate the tip. For large groups, check if gratuity is already included (many restaurants auto-add 18-20% for parties of 6+). For exceptional service, tip 25% or more. For truly poor service, 10% sends a message while still compensating the server.</p>

        <h2 style={s.h2}>Tipping Outside the US</h2>
        <p style={s.p}>Canada: 15-20% (similar to the US). UK: 10-15% at restaurants, not expected at pubs. Europe: service is often included (check the bill for 'service compris'). Japan: do not tip — it can be considered rude. Australia: 10% at sit-down restaurants is generous but not expected.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Tip Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/tip-calculator" style={s.cta}>Open Tip Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/percentage-calculator" style={{ color: "#0D9488" }}>Percentage Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
