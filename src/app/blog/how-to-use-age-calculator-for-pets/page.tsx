import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate Your Pet's Age in Human Years (2026 Guide)",
  description: "Convert your dog or cat's age to human years. The new science behind pet aging, breed-specific calculations, and milestone ages.",
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
        <h1 style={s.h1}>How to Calculate Your Pet's Age in Human Years (2026 Guide)</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>The old rule of multiplying a dog's age by 7 is wrong. Dogs age much faster in their early years and slow down later. A 1-year-old dog is biologically closer to a 30-year-old human, not a 7-year-old. Recent research using DNA methylation has produced more accurate conversion formulas that account for the non-linear aging process.</p>

        <h2 style={s.h2}>Dog Age in Human Years (Updated Science)</h2>
        <p style={s.p}>Based on 2019 research from UC San Diego using DNA methylation clocks: a 1-year-old dog is roughly equivalent to a 30-year-old human. A 2-year-old dog is about 42 in human years. After that, aging slows: each additional year adds about 4-5 human years. A 5-year-old dog is about 56 human years. A 10-year-old dog is about 67.5 human years.</p>

        <h2 style={s.h2}>Size Matters for Dogs</h2>
        <p style={s.p}>Small dogs live longer and age more slowly than large dogs. A small dog (under 20 lbs) at age 10 is roughly equivalent to a 56-year-old human. A large dog (over 90 lbs) at age 10 is more like a 66-year-old. Giant breeds like Great Danes are considered seniors at age 5-6, while small breeds may not reach that stage until 10-11.</p>

        <h2 style={s.h2}>Cat Age in Human Years</h2>
        <p style={s.p}>Cats mature quickly in their first two years: a 1-year-old cat is about 15 in human years, and a 2-year-old is about 24. After that, each cat year equals approximately 4 human years. A 10-year-old cat is about 56 in human years. Indoor cats generally live longer than outdoor cats.</p>

        <h2 style={s.h2}>Milestone Ages for Pets</h2>
        <p style={s.p}>Puppy/kitten stage: 0-1 year (rapid growth). Adolescence: 1-2 years. Adult: 2-7 years (varies by size). Senior: 7+ years for large dogs, 10+ for small dogs, 11+ for cats. Knowing your pet's life stage helps with appropriate diet, exercise, and veterinary care schedules.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Age Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/age-calculator" style={s.cta}>Open Age Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/unit-converter" style={{ color: "#0D9488" }}>Unit Converter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
