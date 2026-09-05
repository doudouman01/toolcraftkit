import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metric to Imperial Conversion: Complete Reference Guide",
  description: "Convert between metric and imperial units for length, weight, volume, and temperature. Quick reference chart with conversion formulas.",
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
        <h1 style={s.h1}>Metric to Imperial Conversion: Complete Reference Guide</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>The United States, Liberia, and Myanmar are the only countries that have not officially adopted the metric system. Everyone else uses meters, kilograms, and Celsius. If you work, travel, or communicate internationally, unit conversion is a daily necessity.</p>

        <h2 style={s.h2}>Length and Distance</h2>
        <p style={s.p}>1 inch = 2.54 centimeters. 1 foot = 30.48 centimeters. 1 mile = 1.609 kilometers. 1 meter = 3.281 feet. Quick estimates: multiply inches by 2.5 for cm, multiply miles by 1.6 for km. These cover most everyday conversion needs for height, distance, and measurements.</p>

        <h2 style={s.h2}>Weight and Mass</h2>
        <p style={s.p}>1 pound = 0.4536 kilograms. 1 ounce = 28.35 grams. 1 kilogram = 2.205 pounds. Quick estimates: divide pounds by 2 and subtract 10% for kg (150 lbs ÷ 2 = 75, minus 10% = 67.5 kg — actual is 68 kg). For cooking, 1 oz ≈ 28g is precise enough.</p>

        <h2 style={s.h2}>Volume</h2>
        <p style={s.p}>1 gallon = 3.785 liters. 1 quart = 0.946 liters. 1 cup = 237 ml. 1 fluid ounce = 29.57 ml. Note: US and Imperial gallons are different (US = 3.785L, Imperial = 4.546L). Always specify which system when communicating internationally.</p>

        <h2 style={s.h2}>Temperature</h2>
        <p style={s.p}>Celsius to Fahrenheit: multiply by 1.8 and add 32. Fahrenheit to Celsius: subtract 32 and divide by 1.8. Key reference points: 0°C = 32°F (freezing), 20°C = 68°F (room temperature), 37°C = 98.6°F (body temperature), 100°C = 212°F (boiling). For rough mental math: double Celsius and add 30.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Unit Converter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/unit-converter" style={s.cta}>Open Unit Converter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/percentage-calculator" style={{ color: "#0D9488" }}>Percentage Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
