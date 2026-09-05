import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free Unit Converters Online: Length, Weight, Temperature & More",
  description: "Convert between metric and imperial units instantly. Free online calculators for length, weight, temperature, volume, and speed — no app needed.",
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
        <h1 style={s.h1}>Best Free Unit Converters Online: Length, Weight, Temperature & More</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Unit conversion is one of the most common daily calculations — and one of the easiest to get wrong. Whether you are converting kilometers to miles for a road trip, kilograms to pounds for a recipe, or Celsius to Fahrenheit for the weather, having a reliable converter saves time and prevents mistakes.</p>

        <h2 style={s.h2}>Common Conversions People Search For</h2>
        <p style={s.p}><strong>Length</strong> — kilometers to miles, meters to feet, centimeters to inches. Essential for travel, construction, and international shopping. One mile equals approximately 1.609 kilometers. One foot equals 30.48 centimeters.</p>
        <p style={s.p}><strong>Weight</strong> — kilograms to pounds, grams to ounces. Critical for cooking, shipping, and fitness tracking. One kilogram equals approximately 2.205 pounds.</p>
        <p style={s.p}><strong>Temperature</strong> — Celsius to Fahrenheit and back. The formula (C × 9/5 + 32 = F) is simple but easy to miscalculate in your head, especially for non-standard values.</p>
        <p style={s.p}><strong>Volume</strong> — liters to gallons, milliliters to fluid ounces. Important for cooking with international recipes and understanding fuel economy across countries.</p>
        <p style={s.p}><strong>Speed</strong> — km/h to mph. Every international traveler or car enthusiast needs this conversion regularly.</p>

        <h2 style={s.h2}>Why Online Converters Beat Phone Calculators</h2>
        <p style={s.p}>A phone calculator can do the math, but you need to remember the conversion factor. Is there 2.54 centimeters in an inch or 2.45? Was it multiply by 5/9 or 9/5 for temperature? A dedicated converter tool has the formulas built in — you enter the number, select the units, and get an accurate result without memorizing anything.</p>
        <p style={s.p}>Online converters also handle multiple conversions simultaneously. Instead of converting one unit at a time, you can see all related conversions at once — enter 100 kilograms and see pounds, ounces, stones, and grams all displayed together.</p>

        <h2 style={s.h2}>Professional Use Cases</h2>
        <p style={s.p}><strong>International business</strong> — when working with suppliers or clients in different countries, unit conversion comes up in every specification sheet, shipping document, and product listing.</p>
        <p style={s.p}><strong>Engineering and construction</strong> — mixing metric and imperial measurements in a project creates costly errors. A reliable converter is essential when working with international standards.</p>
        <p style={s.p}><strong>Healthcare</strong> — medication dosages, patient weights, and fluid volumes often need conversion between systems, where accuracy is critical.</p>
        <p style={s.p}><strong>Cooking and baking</strong> — international recipes use different measurement systems. Converting cups to milliliters or ounces to grams accurately is the difference between a successful dish and a failed one.</p>

        <h2 style={s.h2}>Convert Units Now</h2>
        <p style={s.p}>Our free unit converter tools handle length, weight, temperature, volume, and more — all in your browser with instant results. No app download needed.</p>
        <Link href="/tools/unit-converter" style={s.cta}>Open Unit Converter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Need quick calculations for business? Our <Link href="/tools/percentage-calculator" style={{ color: "#0D9488" }}>Percentage Calculator</Link> handles markups, discounts, and ratios instantly.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
