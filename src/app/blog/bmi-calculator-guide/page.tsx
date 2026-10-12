import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate BMI: Formula, Charts & What Your Number Means",
  description: "Learn how to calculate your BMI, understand BMI categories, and discover what your Body Mass Index really means for your health. Free BMI calculator included.",
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
        <h1 style={s.h1}>How to Calculate BMI: Formula, Charts & What Your Number Means</h1>
        <p style={s.meta}>October 4, 2026 · 6 min read</p>

        <p style={s.p}>Body Mass Index is one of the most widely used health screening tools in the world. Doctors, insurers, and fitness professionals all reference it. Understanding what your BMI means — and what it does not mean — helps you make informed decisions about your health.</p>

        <h2 style={s.h2}>The BMI Formula</h2>
        <p style={s.p}>BMI is calculated by dividing your weight in kilograms by the square of your height in meters: BMI = weight (kg) / height (m)². For imperial units, the formula is: BMI = (weight in pounds × 703) / (height in inches)². A person who weighs 70 kg and stands 1.75 m tall has a BMI of 70 / (1.75 × 1.75) = 22.9, which falls in the normal range.</p>

        <h2 style={s.h2}>BMI Categories Explained</h2>
        <p style={s.p}>The World Health Organization defines six categories. Underweight is below 18.5, normal weight is 18.5 to 24.9, overweight is 25 to 29.9, and obesity is divided into three classes: Class I (30–34.9), Class II (35–39.9), and Class III (40 and above). Each category corresponds to different health risk levels for conditions like cardiovascular disease, type 2 diabetes, and joint problems.</p>

        <h2 style={s.h2}>What BMI Does Not Tell You</h2>
        <p style={s.p}>BMI does not distinguish between muscle and fat. A bodybuilder and a sedentary person can have the same BMI with completely different body compositions. It also does not account for fat distribution — abdominal fat carries more health risks than fat stored in other areas. Age, sex, and ethnicity also affect how BMI relates to actual health risk.</p>

        <h2 style={s.h2}>When to Use BMI</h2>
        <p style={s.p}>BMI is most useful as a starting point. It works well for population-level studies and quick individual screenings. For a complete picture, pair your BMI with waist circumference measurement, body fat percentage, and a conversation with your doctor. It is a useful number — not the only number.</p>

        <h2 style={s.h2}>BMI for Children and Teens</h2>
        <p style={s.p}>For children aged 2 to 19, BMI is calculated the same way but interpreted using age- and sex-specific percentile charts from the CDC. A child at the 85th percentile or above is considered overweight, and at or above the 95th percentile is considered obese. Growth patterns vary significantly, so pediatric BMI should always be interpreted by a healthcare provider.</p>

        <h2 style={s.h2}>Calculate Yours Now</h2>
        <p style={s.p}>Our free BMI Calculator gives you instant results with a visual gauge, category breakdown, and your personal healthy weight range — no signup required.</p>
        <Link href="/tools/bmi-calculator" style={s.cta}>Open BMI Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Planning your nutrition? Try our <Link href="/tools/calorie-calculator" style={{ color: "#0D9488" }}>Calorie Calculator</Link> to set daily intake goals that align with your BMI targets.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
