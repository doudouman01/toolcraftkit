import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Converter for Cooking: Cups to Grams, Ounces to ML & More",
  description: "Convert cooking measurements between metric and imperial instantly. Cups to grams, tablespoons to ML, Fahrenheit to Celsius for baking.",
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
        <h1 style={s.h1}>Unit Converter for Cooking: Cups to Grams, Ounces to ML & More</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>International recipes are a common source of kitchen frustration. An American recipe calls for cups, a European recipe uses grams, and a British recipe mixes both. Converting between measurement systems should not require a math degree — a quick unit converter handles it in seconds.</p>

        <h2 style={s.h2}>Essential Kitchen Conversions</h2>
        <p style={s.p}>1 cup of flour = 125g. 1 cup of sugar = 200g. 1 cup of butter = 227g (2 sticks). 1 tablespoon = 15 ml. 1 teaspoon = 5 ml. 1 fluid ounce = 30 ml. 1 ounce (weight) = 28g. Note that cup measurements for dry ingredients vary by ingredient — a cup of flour weighs much less than a cup of sugar.</p>

        <h2 style={s.h2}>Temperature Conversions for Baking</h2>
        <p style={s.p}>Most American recipes use Fahrenheit, while the rest of the world uses Celsius. Common conversions: 350°F = 175°C (standard baking), 375°F = 190°C, 400°F = 200°C, 425°F = 220°C, 450°F = 230°C. Gas mark 4 = 350°F = 175°C. For precise results, use a converter rather than rounding.</p>

        <h2 style={s.h2}>Why Weight Is Better Than Volume</h2>
        <p style={s.p}>Professional bakers measure by weight (grams) rather than volume (cups). A cup of flour can vary from 120g to 160g depending on how tightly you pack it. That 30% variation can ruin a recipe. A kitchen scale and gram measurements give consistent results every time.</p>

        <h2 style={s.h2}>Scaling Recipes Up or Down</h2>
        <p style={s.p}>When halving or doubling a recipe, unit conversion helps avoid awkward measurements. Half of 3/4 cup is 6 tablespoons (or 90ml). A third of 1 cup is about 80ml. Instead of mental arithmetic with fractions, convert to metric, scale the number, then convert back if needed.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Unit Converter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/unit-converter" style={s.cta}>Open Unit Converter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/percentage-calculator" style={{ color: "#0D9488" }}>Percentage Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
