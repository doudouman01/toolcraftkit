"use client";
import { useState } from "react";

/* ─── BRAND TOKENS ─── */
const LIGHT = {
  primary: "#0D9488", primaryLight: "#14B8A6",
  bg: "#FAFAF9", surface: "#FFFFFF", surfaceAlt: "#F5F5F4",
  border: "#E7E5E4", text: "#1C1917", textMuted: "#78716C", textLight: "#A8A29E",
  success: "#10B981", danger: "#EF4444", warning: "#F59E0B",
  inputBg: "#FFFFFF", shadow: "0 1px 3px rgba(0,0,0,0.06)",
};
const DARK = {
  primary: "#2DD4BF", primaryLight: "#5EEAD4",
  bg: "#0C0A09", surface: "#1C1917", surfaceAlt: "#292524",
  border: "#3F3F46", text: "#FAFAF9", textMuted: "#A8A29E", textLight: "#78716C",
  success: "#34D399", danger: "#F87171", warning: "#FBBF24",
  inputBg: "#292524", shadow: "0 1px 3px rgba(0,0,0,0.3)",
};

const BMI_CATEGORIES = [
  { label: "Underweight", min: 0, max: 18.5, color: "#3B82F6" },
  { label: "Normal weight", min: 18.5, max: 25, color: "#10B981" },
  { label: "Overweight", min: 25, max: 30, color: "#F59E0B" },
  { label: "Obese (Class I)", min: 30, max: 35, color: "#F97316" },
  { label: "Obese (Class II)", min: 35, max: 40, color: "#EF4444" },
  { label: "Obese (Class III)", min: 40, max: 100, color: "#DC2626" },
];

function getCategory(bmi: number) {
  return BMI_CATEGORIES.find(c => bmi >= c.min && bmi < c.max) || BMI_CATEGORIES[BMI_CATEGORIES.length - 1];
}

function FAQItem({ q, a, theme }: { q: string; a: string; theme: typeof LIGHT }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${theme.border}`, padding: "13px 0" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: 0, textAlign: "left",
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, lineHeight: 1.4, paddingRight: 16 }}>{q}</span>
        <span style={{
          fontSize: 18, color: theme.textMuted, flexShrink: 0,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease", lineHeight: 1,
        }}>+</span>
      </button>
      {open && <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.65, marginTop: 10, marginBottom: 0, paddingRight: 30 }}>{a}</p>}
    </div>
  );
}

function SeoContent({ theme }: { theme: typeof LIGHT }) {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>How to Use the BMI Calculator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>Select your preferred unit system (metric or imperial), enter your height and weight, and get your Body Mass Index instantly. The calculator shows your BMI category, a visual gauge, and your healthy weight range based on your height.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>Why BMI Matters</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>BMI is a quick screening tool used by healthcare professionals worldwide. While it does not measure body fat directly, it correlates with more direct measures of body fat. A BMI in the normal range (18.5 to 24.9) is associated with lower risk for conditions like heart disease, type 2 diabetes, and high blood pressure.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>Keep in mind BMI has limitations — it does not distinguish between muscle mass and fat, and results may differ for athletes, elderly individuals, and pregnant women. Always consult a healthcare professional for personalized advice.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Health check-ups and personal fitness tracking</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Setting weight loss or weight gain goals</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Insurance and medical assessments</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Monitoring children and teen growth percentiles</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Pre-surgery screening requirements</li>
      </ul>
      <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: theme.primary, marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: theme.textMuted, margin: 0 }}>
          Track your BMI alongside our <a href="/tools/calorie-calculator" style={{ color: theme.primary }}>Calorie Calculator</a> to build a complete health monitoring routine.
        </p>
      </div>
    </section>
  );
}

export default function BmiCalculator() {
  const [dark, setDark] = useState(false);
  const theme = dark ? DARK : LIGHT;
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");

  // Calculate BMI
  let bmi: number | null = null;
  let heightM = 0;
  if (unit === "metric" && heightCm && weight) {
    heightM = parseFloat(heightCm) / 100;
    if (heightM > 0) bmi = parseFloat(weight) / (heightM * heightM);
  } else if (unit === "imperial" && (heightFt || heightIn) && weight) {
    const totalInches = (parseFloat(heightFt || "0") * 12) + parseFloat(heightIn || "0");
    heightM = totalInches * 0.0254;
    if (totalInches > 0) bmi = (parseFloat(weight) * 703) / (totalInches * totalInches);
  }

  const category = bmi ? getCategory(bmi) : null;

  // Healthy weight range
  const healthyMin = heightM > 0 ? (18.5 * heightM * heightM).toFixed(1) : null;
  const healthyMax = heightM > 0 ? (24.9 * heightM * heightM).toFixed(1) : null;
  const healthyMinLbs = healthyMin ? (parseFloat(healthyMin) * 2.20462).toFixed(1) : null;
  const healthyMaxLbs = healthyMax ? (parseFloat(healthyMax) * 2.20462).toFixed(1) : null;

  // Gauge position (clamped 10-50)
  const gaugePos = bmi ? Math.min(Math.max((bmi / 50) * 100, 2), 98) : 0;

  const inputStyle = (w: number) => ({
    width: w, padding: "10px 12px", fontSize: 15, borderRadius: 8,
    border: `1.5px solid ${theme.border}`, background: theme.inputBg,
    color: theme.text, outline: "none", fontWeight: 500 as const,
    fontVariantNumeric: "tabular-nums" as const,
  });

  return (
    <div style={{
      minHeight: "100vh", background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <main style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px 60px" }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 12, color: theme.textLight, marginBottom: 14, display: "flex", gap: 6, alignItems: "center" }}>
          <a href="/" style={{ color: theme.textMuted, textDecoration: "none" }}>Home</a><span>›</span>
          <a href="/#business-tools" style={{ color: theme.textMuted, textDecoration: "none" }}>Health & Fitness</a><span>›</span>
          <span style={{ color: theme.primary, fontWeight: 500 }}>BMI Calculator</span>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.03em" }}>BMI Calculator</h1>
          <p style={{ fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5 }}>
            Calculate your Body Mass Index instantly. See your BMI category, healthy weight range, and visual breakdown.
          </p>
        </div>

        {/* Unit Toggle */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {(["metric", "imperial"] as const).map(u => (
            <button key={u} onClick={() => { setUnit(u); setHeightCm(""); setHeightFt(""); setHeightIn(""); setWeight(""); }}
              style={{
                padding: "8px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600,
                border: `1.5px solid ${unit === u ? theme.primary : theme.border}`,
                background: unit === u ? theme.primary : theme.surface,
                color: unit === u ? "#fff" : theme.textMuted,
                cursor: "pointer", transition: "all 0.2s",
              }}>
              {u === "metric" ? "Metric (kg/cm)" : "Imperial (lbs/ft)"}
            </button>
          ))}
        </div>

        {/* Input Card */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: 24,
          border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Height */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 6, display: "block" }}>
                Height {unit === "metric" ? "(cm)" : "(ft / in)"}
              </label>
              {unit === "metric" ? (
                <input type="number" value={heightCm} onChange={e => setHeightCm(e.target.value)}
                  placeholder="e.g. 175" style={inputStyle(200)}
                  onFocus={e => e.target.style.borderColor = theme.primary}
                  onBlur={e => e.target.style.borderColor = theme.border} />
              ) : (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)}
                    placeholder="ft" style={inputStyle(80)}
                    onFocus={e => e.target.style.borderColor = theme.primary}
                    onBlur={e => e.target.style.borderColor = theme.border} />
                  <span style={{ color: theme.textMuted, fontSize: 14 }}>ft</span>
                  <input type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)}
                    placeholder="in" style={inputStyle(80)}
                    onFocus={e => e.target.style.borderColor = theme.primary}
                    onBlur={e => e.target.style.borderColor = theme.border} />
                  <span style={{ color: theme.textMuted, fontSize: 14 }}>in</span>
                </div>
              )}
            </div>
            {/* Weight */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 6, display: "block" }}>
                Weight {unit === "metric" ? "(kg)" : "(lbs)"}
              </label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)}
                placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"} style={inputStyle(200)}
                onFocus={e => e.target.style.borderColor = theme.primary}
                onBlur={e => e.target.style.borderColor = theme.border} />
            </div>
          </div>
        </div>

        {/* Results */}
        {bmi !== null && category && (
          <div style={{
            background: theme.surface, borderRadius: 12, padding: 24,
            border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
          }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: category.color, letterSpacing: "-0.04em" }}>
                {bmi.toFixed(1)}
              </div>
              <div style={{
                display: "inline-block", padding: "4px 14px", borderRadius: 20,
                background: category.color + "18", color: category.color,
                fontSize: 14, fontWeight: 600, marginTop: 4,
              }}>
                {category.label}
              </div>
            </div>

            {/* Visual Gauge */}
            <div style={{ position: "relative", height: 28, borderRadius: 14, overflow: "hidden", marginBottom: 20,
              background: `linear-gradient(to right, #3B82F6 0%, #10B981 37%, #F59E0B 50%, #F97316 60%, #EF4444 70%, #DC2626 100%)`,
            }}>
              <div style={{
                position: "absolute", left: `${gaugePos}%`, top: -2, width: 4, height: 32,
                background: theme.text, borderRadius: 2, transform: "translateX(-50%)",
                boxShadow: "0 0 6px rgba(0,0,0,0.3)",
              }} />
            </div>

            {/* Categories Legend */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20, justifyContent: "center" }}>
              {BMI_CATEGORIES.map(c => (
                <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: theme.textMuted }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: c.color }} />
                  <span>{c.label}</span>
                </div>
              ))}
            </div>

            {/* Healthy Range */}
            {healthyMin && healthyMax && (
              <div style={{
                background: theme.surfaceAlt, borderRadius: 8, padding: "14px 16px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontSize: 13, color: theme.textMuted, fontWeight: 500 }}>Healthy weight range</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: theme.success }}>
                  {unit === "metric"
                    ? `${healthyMin} – ${healthyMax} kg`
                    : `${healthyMinLbs} – ${healthyMaxLbs} lbs`}
                </span>
              </div>
            )}
          </div>
        )}

        {/* FAQ */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: 24,
          border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: theme.text }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme} q="What is a healthy BMI?" a="A BMI between 18.5 and 24.9 is considered normal weight. Below 18.5 is underweight, and 25 or above is overweight. These ranges are based on WHO guidelines and apply to adults 20 years and older." />
          <FAQItem theme={theme} q="Is BMI accurate for athletes?" a="BMI can overestimate body fat in athletes and muscular people because it does not distinguish between muscle and fat mass. If you are very muscular, your BMI may classify you as overweight even if your body fat percentage is low." />
          <FAQItem theme={theme} q="How often should I check my BMI?" a="Monthly tracking is sufficient for most people. If you are actively working on weight management, weekly check-ins can help you stay on track without becoming obsessive about small fluctuations." />
          <FAQItem theme={theme} q="Does BMI apply to children?" a="BMI is calculated the same way for children, but interpreted using age- and sex-specific percentile charts. A pediatrician is the best resource for evaluating a child's BMI." />
        </div>

        <SeoContent theme={theme} />
      </main>
    </div>
  );
}
