import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Body Fat Calculator: US Navy Method Explained Step by Step",
  description: "Learn how the US Navy body fat method works, what measurements you need, and how to calculate your body fat percentage accurately at home for free.",
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
        <h1 style={s.h1}>Body Fat Calculator: US Navy Method Explained Step by Step</h1>
        <p style={s.meta}>November 2026 · 6 min read</p>

        <p style={s.p}>Body fat percentage is a far better indicator of fitness and health than weight alone. Two people can weigh the same but have dramatically different body compositions. The US Navy method is one of the most accessible ways to estimate body fat at home — all you need is a tape measure and a few minutes. Here&apos;s how it works and what your results mean.</p>

        <h2 style={s.h2}>Why Body Fat Percentage Matters</h2>
        <p style={s.p}>Unlike BMI, which only considers height and weight, body fat percentage distinguishes between lean mass (muscle, bone, organs) and fat mass. A muscular athlete might have a &quot;overweight&quot; BMI but a healthy body fat percentage. Conversely, someone with a normal BMI could carry excess fat with low muscle mass — a condition sometimes called &quot;skinny fat.&quot; Tracking body fat gives you a clearer picture of your physical health and fitness progress than the scale alone can provide.</p>

        <h2 style={s.h2}>How the US Navy Method Works</h2>
        <p style={s.p}>Developed by the US Navy as a quick field assessment, this method uses circumference measurements and height to estimate body fat. For men, it requires neck and waist (at the navel) measurements. For women, it adds a hip measurement. The formula uses logarithmic calculations based on the relationship between these body dimensions and body fat, as validated against more precise methods like hydrostatic weighing. While not as accurate as a DEXA scan, the Navy method consistently produces estimates within 3 to 4 percent of laboratory results.</p>

        <h2 style={s.h2}>Taking Accurate Measurements</h2>
        <p style={s.p}>Measurement accuracy is critical. Use a flexible tape measure and take all measurements on bare skin. For the waist, measure at the navel — not at the narrowest point. For the neck, measure just below the larynx (Adam&apos;s apple) with the tape sloping slightly downward at the front. For hip measurements (women only), measure at the widest point. Take each measurement twice and use the average. Measure at the same time of day for consistency — morning before eating is ideal. Pull the tape snug but not tight enough to compress the skin.</p>

        <h2 style={s.h2}>Understanding Your Results</h2>
        <p style={s.p}>For men, essential fat is about 2 to 5 percent, athletic range is 6 to 13, fitness range is 14 to 17, and acceptable is 18 to 24. Above 25 percent is generally considered excess. For women, essential fat is 10 to 13 percent, athletic is 14 to 20, fitness is 21 to 24, acceptable is 25 to 31, and above 32 is excess. These ranges vary by age — older adults naturally carry slightly more fat. Use these numbers as general guidelines and discuss targets with a healthcare professional.</p>

        <h2 style={s.h2}>Calculate Your Body Fat Now</h2>
        <p style={s.p}>Our free <Link href="/tools/body-fat-calculator" style={{ color: "#0D9488" }}>Body Fat Calculator</Link> uses the US Navy method to estimate your body fat percentage from simple measurements. Get instant results with category breakdowns and visual charts — no signup required.</p>
        <Link href="/tools/body-fat-calculator" style={s.cta}>Open Body Fat Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Want the full picture? Pair your body fat results with our <Link href="/tools/bmi-calculator" style={{ color: "#0D9488" }}>BMI Calculator</Link> and <Link href="/tools/calorie-calculator" style={{ color: "#0D9488" }}>Calorie Calculator</Link> for a comprehensive health snapshot.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
