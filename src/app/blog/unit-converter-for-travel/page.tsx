import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Converter for International Travel: Distance, Temperature & Currency",
  description: "Essential unit conversions for international travelers. Kilometers to miles, Celsius to Fahrenheit, kilograms to pounds, and more.",
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
        <h1 style={s.h1}>Unit Converter for International Travel: Distance, Temperature & Currency</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Traveling internationally means constantly converting between measurement systems. Speed limits are in km/h, weather is reported in Celsius, luggage limits are in kilograms, and distances are in kilometers. Having quick conversion reference saves time and prevents costly mistakes.</p>

        <h2 style={s.h2}>Distance and Speed</h2>
        <p style={s.p}>1 kilometer = 0.621 miles. 1 mile = 1.609 kilometers. For quick estimates: multiply km by 0.6 to get miles, or multiply miles by 1.6 to get km. Speed limits: 100 km/h = 62 mph, 120 km/h = 75 mph, 130 km/h = 81 mph. These rough conversions keep you legal on foreign highways.</p>

        <h2 style={s.h2}>Temperature</h2>
        <p style={s.p}>Celsius to Fahrenheit: multiply by 1.8 and add 32. For quick estimates: double the Celsius number and add 30. So 20°C ≈ 70°F, 25°C ≈ 80°F, 30°C ≈ 86°F. Key reference points: 0°C = 32°F (freezing), 100°C = 212°F (boiling), 37°C = 98.6°F (body temperature).</p>

        <h2 style={s.h2}>Weight and Luggage</h2>
        <p style={s.p}>1 kilogram = 2.205 pounds. Most international airlines allow 23 kg (50.7 lbs) for checked bags and 7-10 kg (15-22 lbs) for carry-on. Knowing your luggage weight in both systems prevents overweight fees — which can be $50 to $200 per bag.</p>

        <h2 style={s.h2}>Practical Travel Tips</h2>
        <p style={s.p}>Download a converter app for offline use — you will not always have internet. Learn a few key conversions by heart for the country you are visiting. For fuel, 1 gallon = 3.785 liters. Fuel prices in Europe are per liter, so multiply by 3.8 to compare with US per-gallon prices. A $1.50/liter price in Europe is about $5.70 per gallon.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Unit Converter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/unit-converter" style={s.cta}>Open Unit Converter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/percentage-calculator" style={{ color: "#0D9488" }}>Percentage Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
