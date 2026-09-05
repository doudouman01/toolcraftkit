import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate a Tip: Quick Methods & Etiquette Guide",
  description: "Calculate restaurant tips instantly. Learn tipping etiquette, when to tip more or less, and quick mental math methods.",
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
        <h1 style={s.h1}>How to Calculate a Tip: Quick Methods & Etiquette Guide</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Tipping customs vary by country, service type, and situation. In the US, tipping 15-20% at restaurants is standard. In Japan, tipping is considered rude. In Europe, service is often included. Knowing the norms and being able to calculate quickly prevents awkward moments at the end of a meal.</p>

        <h2 style={s.h2}>Quick Mental Math for Tips</h2>
        <p style={s.p}>For 10%: move the decimal one place left. For 20%: double the 10% amount. For 15%: take 10% plus half of 10%. For 18%: take 20% minus 2% (which is 10% divided by 5). Example: $67 bill. 10% = $6.70. 20% = $13.40. 15% = $6.70 + $3.35 = $10.05. Round up to $10 for simplicity.</p>

        <h2 style={s.h2}>When to Tip More</h2>
        <p style={s.p}>Tip above 20% for exceptional service, large groups (some restaurants add 18-20% automatically for parties of 6+), complex orders, or when dining with children who create extra mess. Holiday season tipping at your regular spots builds goodwill and ensures great service year-round.</p>

        <h2 style={s.h2}>When to Tip Less (or Not at All)</h2>
        <p style={s.p}>Poor service may warrant 10-15%, but consider whether the issue was the server's fault or the kitchen's. Counter service (coffee shops, fast food) tipping is optional — $1-2 or 10% is generous. Takeout tipping is debated — 10% is a nice gesture for large or complex orders.</p>

        <h2 style={s.h2}>Splitting the Bill</h2>
        <p style={s.p}>For group dining, decide before ordering whether to split evenly or by item. Splitting evenly is simpler but can feel unfair if orders vary widely in price. Our Tip Calculator splits both the bill and tip by number of people, making group math instant.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Tip Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/tip-calculator" style={s.cta}>Open Tip Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/percentage-calculator" style={{ color: "#0D9488" }}>Percentage Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
