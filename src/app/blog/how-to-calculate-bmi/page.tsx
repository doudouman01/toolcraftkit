import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate BMI: Formula, Interpretation & Limitations",
  description: "Calculate your Body Mass Index with the BMI formula. Understand what BMI means, its categories, and why it is not the complete picture of health.",
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
        <h1 style={s.h1}>How to Calculate BMI: Formula, Interpretation & Limitations</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Body Mass Index is the most widely used screening tool for weight categories. It is simple to calculate, universally understood, and useful as a starting point for health conversations. It is also frequently misinterpreted and has significant limitations that are important to understand.</p>

        <h2 style={s.h2}>The BMI Formula</h2>
        <p style={s.p}>BMI = weight (kg) / height (m)². For imperial units: BMI = weight (lbs) × 703 / height (inches)². A person who weighs 70 kg and is 1.75 m tall has a BMI of 70 / (1.75²) = 22.9. Convert your measurements to metric first for the simplest calculation, or use our Unit Converter.</p>

        <h2 style={s.h2}>BMI Categories</h2>
        <p style={s.p}>Underweight: below 18.5. Normal weight: 18.5 to 24.9. Overweight: 25.0 to 29.9. Obesity Class I: 30.0 to 34.9. Obesity Class II: 35.0 to 39.9. Obesity Class III: 40.0 and above. These categories were established by the WHO and are used globally for population-level health assessment.</p>

        <h2 style={s.h2}>What BMI Does Not Tell You</h2>
        <p style={s.p}>BMI does not distinguish between muscle and fat. A muscular athlete may have a BMI of 28 (overweight category) while having very low body fat. BMI does not account for body fat distribution — abdominal fat is more dangerous than fat elsewhere. It does not vary by age, sex, or ethnicity, despite different healthy ranges for these groups.</p>

        <h2 style={s.h2}>Better Used as a Starting Point</h2>
        <p style={s.p}>BMI is most useful as one data point among many. It works well for population studies and general screening but should not be the sole measure of individual health. Waist circumference, body fat percentage, blood markers, fitness levels, and overall well-being all matter. Consult a healthcare provider for personalized assessment.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Percentage Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/percentage-calculator" style={s.cta}>Open Percentage Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/unit-converter" style={{ color: "#0D9488" }}>Unit Converter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
