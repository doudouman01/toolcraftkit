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

const ACTIVITY_LEVELS = [
  { label: "Sedentary (little or no exercise)", value: 1.2 },
  { label: "Lightly Active (1-3 days/week)", value: 1.375 },
  { label: "Moderately Active (3-5 days/week)", value: 1.55 },
  { label: "Very Active (6-7 days/week)", value: 1.725 },
  { label: "Extra Active (athlete / physical job)", value: 1.9 },
];

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
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>How to Use the Calorie Calculator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>Enter your age, select your gender, input your height and weight in metric or imperial units, and choose your activity level. The calculator instantly computes your Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation and multiplies it by your activity factor to determine your Total Daily Energy Expenditure (TDEE).</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>Why Calorie Tracking Matters</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>Understanding your daily calorie needs is the foundation of any nutrition plan. Whether you want to lose weight, maintain your current physique, or build muscle, knowing your TDEE gives you a concrete number to work with. A deficit of roughly 500 calories per day leads to about 0.45 kg (1 lb) of weight loss per week, while a surplus of the same amount supports muscle gain when combined with resistance training.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>The Mifflin-St Jeor equation is considered the most accurate predictive formula for estimating BMR in healthy individuals and is recommended by the Academy of Nutrition and Dietetics.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Setting a calorie deficit for sustainable weight loss</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Planning a calorie surplus for muscle gain (bulking)</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Maintaining weight during a fitness plateau</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Adjusting intake when changing activity levels</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Meal planning and macro tracking</li>
      </ul>
      <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: theme.primary, marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: theme.textMuted, margin: 0 }}>
          Pair your calorie targets with our <a href="/tools/bmi-calculator" style={{ color: theme.primary }}>BMI Calculator</a> to get a complete picture of your health metrics and set realistic goals.
        </p>
      </div>
    </section>
  );
}

export default function CalorieCalculator() {
  const [dark, setDark] = useState(false);
  const theme = dark ? DARK : LIGHT;
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState(1.55);

  // Mifflin-St Jeor BMR calculation
  let bmr: number | null = null;
  let tdee: number | null = null;

  const ageNum = parseFloat(age);
  const weightNum = parseFloat(weight);

  if (ageNum > 0 && weightNum > 0) {
    let weightKg = weightNum;
    let heightCmVal = 0;

    if (unit === "metric") {
      heightCmVal = parseFloat(heightCm);
      // weight is already in kg
    } else {
      const totalInches = (parseFloat(heightFt || "0") * 12) + parseFloat(heightIn || "0");
      heightCmVal = totalInches * 2.54;
      weightKg = weightNum * 0.453592;
    }

    if (heightCmVal > 0) {
      if (gender === "male") {
        bmr = (10 * weightKg) + (6.25 * heightCmVal) - (5 * ageNum) + 5;
      } else {
        bmr = (10 * weightKg) + (6.25 * heightCmVal) - (5 * ageNum) - 161;
      }
      tdee = bmr * activity;
    }
  }

  const inputStyle = (w?: number) => ({
    width: w ?? "100%", padding: "10px 12px", fontSize: 15, borderRadius: 8,
    border: `1.5px solid ${theme.border}`, background: theme.inputBg,
    color: theme.text, outline: "none", fontWeight: 500 as const,
    fontVariantNumeric: "tabular-nums" as const,
  });

  const resultCard = (label: string, value: number, color: string, subtitle: string) => (
    <div style={{
      background: theme.surface, borderRadius: 10, padding: "18px 16px",
      border: `1px solid ${theme.border}`, textAlign: "center", flex: 1, minWidth: 140,
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color, letterSpacing: "-0.03em" }}>{Math.round(value)}</div>
      <div style={{ fontSize: 12, color: theme.textLight, marginTop: 2 }}>{subtitle}</div>
    </div>
  );

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
          <span style={{ color: theme.primary, fontWeight: 500 }}>Calorie Calculator</span>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.03em" }}>Calorie Calculator</h1>
          <p style={{ fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5 }}>
            Calculate your daily calorie needs using the Mifflin-St Jeor equation. Get your BMR and personalized targets for weight loss, maintenance, or gain.
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
            {/* Age & Gender Row */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 120 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 6, display: "block" }}>Age</label>
                <input type="number" value={age} onChange={e => setAge(e.target.value)}
                  placeholder="e.g. 30" style={inputStyle()}
                  onFocus={e => e.target.style.borderColor = theme.primary}
                  onBlur={e => e.target.style.borderColor = theme.border} />
              </div>
              <div style={{ flex: 1, minWidth: 120 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 6, display: "block" }}>Gender</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {(["male", "female"] as const).map(g => (
                    <button key={g} onClick={() => setGender(g)}
                      style={{
                        flex: 1, padding: "10px 0", borderRadius: 8, fontSize: 14, fontWeight: 600,
                        border: `1.5px solid ${gender === g ? theme.primary : theme.border}`,
                        background: gender === g ? theme.primary : theme.surface,
                        color: gender === g ? "#fff" : theme.textMuted,
                        cursor: "pointer", transition: "all 0.2s",
                      }}>
                      {g === "male" ? "Male" : "Female"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

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

            {/* Activity Level */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 6, display: "block" }}>Activity Level</label>
              <select value={activity} onChange={e => setActivity(parseFloat(e.target.value))}
                style={{
                  width: "100%", padding: "10px 12px", fontSize: 14, borderRadius: 8,
                  border: `1.5px solid ${theme.border}`, background: theme.inputBg,
                  color: theme.text, outline: "none", fontWeight: 500, cursor: "pointer",
                  appearance: "none" as const,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2378716C' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}>
                {ACTIVITY_LEVELS.map(a => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {bmr !== null && tdee !== null && (
          <div style={{
            background: theme.surface, borderRadius: 12, padding: 24,
            border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 16px", color: theme.text }}>Your Results</h2>

            {/* BMR & TDEE */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              {resultCard("BMR", bmr, theme.primary, "cal/day at rest")}
              {resultCard("Daily Calories (TDEE)", tdee, theme.success, "cal/day total")}
            </div>

            {/* Calorie Targets */}
            <h3 style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 12, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>Calorie Targets</h3>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div style={{
                flex: 1, minWidth: 120, background: theme.surfaceAlt, borderRadius: 10, padding: "14px 12px",
                borderLeft: `4px solid ${theme.danger}`, textAlign: "center",
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: theme.danger, marginBottom: 4, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>Lose Weight</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: theme.text }}>{Math.round(tdee - 500)}</div>
                <div style={{ fontSize: 11, color: theme.textLight }}>cal/day (-500)</div>
              </div>
              <div style={{
                flex: 1, minWidth: 120, background: theme.surfaceAlt, borderRadius: 10, padding: "14px 12px",
                borderLeft: `4px solid ${theme.success}`, textAlign: "center",
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: theme.success, marginBottom: 4, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>Maintain</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: theme.text }}>{Math.round(tdee)}</div>
                <div style={{ fontSize: 11, color: theme.textLight }}>cal/day</div>
              </div>
              <div style={{
                flex: 1, minWidth: 120, background: theme.surfaceAlt, borderRadius: 10, padding: "14px 12px",
                borderLeft: `4px solid ${theme.warning}`, textAlign: "center",
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: theme.warning, marginBottom: 4, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>Gain Weight</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: theme.text }}>{Math.round(tdee + 500)}</div>
                <div style={{ fontSize: 11, color: theme.textLight }}>cal/day (+500)</div>
              </div>
            </div>

            {/* Info note */}
            <div style={{ marginTop: 16, padding: "10px 14px", background: theme.surfaceAlt, borderRadius: 8, fontSize: 12, color: theme.textMuted, lineHeight: 1.6 }}>
              Based on the Mifflin-St Jeor equation. A 500 cal/day deficit targets ~0.45 kg (1 lb) weight loss per week. Consult a healthcare professional for personalized advice.
            </div>
          </div>
        )}

        {/* FAQ */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: 24,
          border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: theme.text }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme} q="What is BMR and how is it different from TDEE?" a="BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest just to maintain vital functions like breathing and circulation. TDEE (Total Daily Energy Expenditure) is your BMR multiplied by an activity factor that accounts for movement and exercise. TDEE is the total calories you actually burn in a day." />
          <FAQItem theme={theme} q="How accurate is the Mifflin-St Jeor equation?" a="The Mifflin-St Jeor equation is considered the most reliable formula for estimating BMR in healthy adults. Studies show it predicts BMR within 10% for most people. However, individual metabolism varies based on genetics, body composition, hormones, and other factors. Use your calculated TDEE as a starting point and adjust based on real-world results over 2-3 weeks." />
          <FAQItem theme={theme} q="Is eating 1,200 calories a day safe?" a="For most adults, eating fewer than 1,200 calories per day (1,500 for men) is not recommended without medical supervision. Very low calorie diets can lead to muscle loss, nutrient deficiencies, metabolic slowdown, and other health issues. A moderate deficit of 500 calories below your TDEE is a safer and more sustainable approach to weight loss." />
          <FAQItem theme={theme} q="Should I eat back the calories I burn exercising?" a="It depends on your goals. If you are using the activity multiplier in this calculator, exercise calories are already factored into your TDEE. Eating back all exercise calories on top of that could lead to a surplus. If you selected Sedentary and track exercise separately, eating back 50-75% of exercise calories is a common approach to avoid under-fueling." />
        </div>

        <SeoContent theme={theme} />
      </main>
    </div>
  );
}
