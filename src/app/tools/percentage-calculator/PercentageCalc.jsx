"use client";
import { useState } from "react";

/* ─── BRAND TOKENS ─── */
const LIGHT = {
  primary: "#0D9488", primaryLight: "#14B8A6",
  bg: "#FAFAF9", surface: "#FFFFFF", surfaceAlt: "#F5F5F4",
  border: "#E7E5E4", text: "#1C1917", textMuted: "#78716C", textLight: "#A8A29E",
  success: "#10B981", danger: "#EF4444",
  inputBg: "#FFFFFF", shadow: "0 1px 3px rgba(0,0,0,0.06)",
};
const DARK = {
  primary: "#2DD4BF", primaryLight: "#5EEAD4",
  bg: "#0C0A09", surface: "#1C1917", surfaceAlt: "#292524",
  border: "#3F3F46", text: "#FAFAF9", textMuted: "#A8A29E", textLight: "#78716C",
  success: "#34D399", danger: "#F87171",
  inputBg: "#292524", shadow: "0 1px 3px rgba(0,0,0,0.3)",
};

/* ─── CALCULATOR CARD ─── */
function CalcCard({ title, desc, fields, result, theme }) {
  return (
    <div style={{
      background: theme.surface, borderRadius: 12, padding: "20px",
      border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
    }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 4px", color: theme.text }}>{title}</h3>
      <p style={{ fontSize: 13, color: theme.textMuted, margin: "0 0 16px", lineHeight: 1.4 }}>{desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 14 }}>
        {fields}
      </div>
      <div style={{
        background: theme.surfaceAlt, borderRadius: 8, padding: "12px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 13, color: theme.textMuted, fontWeight: 500 }}>Result</span>
        <span style={{
          fontSize: 22, fontWeight: 700, color: theme.primary,
          fontVariantNumeric: "tabular-nums",
        }}>{result}</span>
      </div>
    </div>
  );
}

/* ─── INPUT FIELD ─── */
function NumInput({ value, onChange, placeholder, label, suffix, theme, width }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {label && <span style={{ fontSize: 13, color: theme.textMuted, fontWeight: 500, whiteSpace: "nowrap" }}>{label}</span>}
      <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "0"}
          style={{
            width: width || 100, padding: "8px 10px", paddingRight: suffix ? 28 : 10,
            fontSize: 15, borderRadius: 8,
            border: `1.5px solid ${theme.border}`, background: theme.inputBg,
            color: theme.text, outline: "none", fontWeight: 500,
            fontVariantNumeric: "tabular-nums",
          }}
          onFocus={(e) => e.target.style.borderColor = theme.primary}
          onBlur={(e) => e.target.style.borderColor = theme.border}
        />
        {suffix && (
          <span style={{
            position: "absolute", right: 10, fontSize: 14, color: theme.textLight, fontWeight: 500,
            pointerEvents: "none",
          }}>{suffix}</span>
        )}
      </div>
    </div>
  );
}

/* ─── FAQ ─── */
function FAQItem({ q, a, theme }) {
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

function AdSlot({ position, theme }) {
  return (
    <div style={{
      border: `1px dashed ${theme.border}`, borderRadius: 8,
      padding: "12px", textAlign: "center", color: theme.textLight,
      fontSize: 11, fontStyle: "italic", background: theme.surfaceAlt,
      margin: position === "header" ? "0 0 20px" : "20px 0", opacity: 0.5,
    }}>Ad Slot — {position}</div>
  );
}

/* ═══════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════ */
export default function PercentageCalculator() {
  const [dark, setDark] = useState(false);
  const theme = dark ? DARK : LIGHT;

  // Calc 1: What is X% of Y?
  const [c1p, setC1p] = useState(""); const [c1v, setC1v] = useState("");
  const r1 = c1p && c1v ? ((parseFloat(c1p) / 100) * parseFloat(c1v)) : null;

  // Calc 2: X is what % of Y?
  const [c2x, setC2x] = useState(""); const [c2y, setC2y] = useState("");
  const r2 = c2x && c2y && parseFloat(c2y) !== 0 ? ((parseFloat(c2x) / parseFloat(c2y)) * 100) : null;

  // Calc 3: Percentage change from X to Y
  const [c3x, setC3x] = useState(""); const [c3y, setC3y] = useState("");
  const r3 = c3x && c3y && parseFloat(c3x) !== 0 ? (((parseFloat(c3y) - parseFloat(c3x)) / Math.abs(parseFloat(c3x))) * 100) : null;

  // Calc 4: Increase X by Y%
  const [c4x, setC4x] = useState(""); const [c4p, setC4p] = useState("");
  const r4 = c4x && c4p ? (parseFloat(c4x) * (1 + parseFloat(c4p) / 100)) : null;

  // Calc 5: Decrease X by Y%
  const [c5x, setC5x] = useState(""); const [c5p, setC5p] = useState("");
  const r5 = c5x && c5p ? (parseFloat(c5x) * (1 - parseFloat(c5p) / 100)) : null;

  // Calc 6: Tip calculator
  const [c6b, setC6b] = useState(""); const [c6t, setC6t] = useState("15");
  const tipAmount = c6b && c6t ? (parseFloat(c6b) * parseFloat(c6t) / 100) : null;
  const tipTotal = c6b && tipAmount !== null ? (parseFloat(c6b) + tipAmount) : null;

  const fmt = (n) => {
    if (n === null || isNaN(n)) return "—";
    return Number.isInteger(n) ? n.toLocaleString() : parseFloat(n.toFixed(4)).toLocaleString(undefined, { maximumFractionDigits: 4 });
  };

  const navItems = ["Text", "Writing", "Image", "Business", "Social", "Dev"];

  return (
    <div style={{
      minHeight: "100vh", background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      {/* HEADER */}
      <header style={{
        background: theme.surface, borderBottom: `1px solid ${theme.border}`,
        padding: "0 20px", height: 54, display: "flex", alignItems: "center",
        justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100,
        boxShadow: theme.shadow,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 7,
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: dark ? "#0C0A09" : "#fff", fontSize: 15, fontWeight: 800,
          }}>T</div>
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Tool<span style={{ color: theme.primary }}>Craft</span>Kit
            <span style={{ color: theme.textLight, fontWeight: 400 }}>.com</span>
          </span>
        </div>
        <nav style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {navItems.map((item) => (
              <span key={item} style={{
                padding: "5px 10px", fontSize: 13, fontWeight: 500, borderRadius: 6,
                color: item === "Business" ? theme.primary : theme.textMuted,
                background: item === "Business" ? (dark ? "rgba(45,212,191,0.1)" : "rgba(13,148,136,0.06)") : "transparent",
                cursor: "pointer",
              }}>{item}</span>
            ))}
          </div>
          <button onClick={() => setDark(!dark)} style={{
            width: 34, height: 34, borderRadius: 8, border: `1px solid ${theme.border}`,
            background: theme.surfaceAlt, cursor: "pointer", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginLeft: 8, color: theme.textMuted,
          }}>{dark ? "☀" : "☾"}</button>
        </nav>
      </header>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "24px 16px 60px" }}>

        <div style={{ fontSize: 12, color: theme.textLight, marginBottom: 14, display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ cursor: "pointer", color: theme.textMuted }}>Home</span><span>›</span>
          <span style={{ cursor: "pointer", color: theme.textMuted }}>Business Tools</span><span>›</span>
          <span style={{ color: theme.primary, fontWeight: 500 }}>Percentage Calculator</span>
        </div>

        <AdSlot position="header" theme={theme} />

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.03em" }}>Percentage Calculator</h1>
          <p style={{ fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5 }}>
            Six calculators for every percentage problem. Find percentages, calculate changes, add tips, increase or decrease values.
          </p>
        </div>

        {/* CALCULATORS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>

          <CalcCard
            title="What is X% of Y?"
            desc="Find a percentage of any number"
            theme={theme}
            result={r1 !== null ? fmt(r1) : "—"}
            fields={<>
              <span style={{ fontSize: 14, color: theme.textMuted }}>What is</span>
              <NumInput value={c1p} onChange={setC1p} suffix="%" theme={theme} width={80} />
              <span style={{ fontSize: 14, color: theme.textMuted }}>of</span>
              <NumInput value={c1v} onChange={setC1v} theme={theme} width={120} />
              <span style={{ fontSize: 14, color: theme.textMuted }}>?</span>
            </>}
          />

          <CalcCard
            title="X is what % of Y?"
            desc="Find what percentage one number is of another"
            theme={theme}
            result={r2 !== null ? fmt(r2) + "%" : "—"}
            fields={<>
              <NumInput value={c2x} onChange={setC2x} theme={theme} width={120} />
              <span style={{ fontSize: 14, color: theme.textMuted }}>is what % of</span>
              <NumInput value={c2y} onChange={setC2y} theme={theme} width={120} />
              <span style={{ fontSize: 14, color: theme.textMuted }}>?</span>
            </>}
          />

          <CalcCard
            title="Percentage Change"
            desc="Calculate the percentage increase or decrease between two values"
            theme={theme}
            result={r3 !== null ? (r3 >= 0 ? "+" : "") + fmt(r3) + "%" : "—"}
            fields={<>
              <span style={{ fontSize: 14, color: theme.textMuted }}>From</span>
              <NumInput value={c3x} onChange={setC3x} theme={theme} width={120} />
              <span style={{ fontSize: 14, color: theme.textMuted }}>to</span>
              <NumInput value={c3y} onChange={setC3y} theme={theme} width={120} />
            </>}
          />

          <CalcCard
            title="Increase by %"
            desc="Add a percentage to a value"
            theme={theme}
            result={r4 !== null ? fmt(r4) : "—"}
            fields={<>
              <span style={{ fontSize: 14, color: theme.textMuted }}>Increase</span>
              <NumInput value={c4x} onChange={setC4x} theme={theme} width={120} />
              <span style={{ fontSize: 14, color: theme.textMuted }}>by</span>
              <NumInput value={c4p} onChange={setC4p} suffix="%" theme={theme} width={80} />
            </>}
          />

          <CalcCard
            title="Decrease by %"
            desc="Subtract a percentage from a value"
            theme={theme}
            result={r5 !== null ? fmt(r5) : "—"}
            fields={<>
              <span style={{ fontSize: 14, color: theme.textMuted }}>Decrease</span>
              <NumInput value={c5x} onChange={setC5x} theme={theme} width={120} />
              <span style={{ fontSize: 14, color: theme.textMuted }}>by</span>
              <NumInput value={c5p} onChange={setC5p} suffix="%" theme={theme} width={80} />
            </>}
          />

          <CalcCard
            title="Tip Calculator"
            desc="Calculate tip amount and total bill"
            theme={theme}
            result={tipTotal !== null ? `$${fmt(tipAmount)} tip → $${fmt(tipTotal)} total` : "—"}
            fields={<>
              <span style={{ fontSize: 14, color: theme.textMuted }}>Bill</span>
              <NumInput value={c6b} onChange={setC6b} placeholder="100" theme={theme} width={120} />
              <span style={{ fontSize: 14, color: theme.textMuted }}>Tip</span>
              <NumInput value={c6t} onChange={setC6t} suffix="%" theme={theme} width={80} />
            </>}
          />
        </div>

        <AdSlot position="middle" theme={theme} />

        {/* SEO CONTENT */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            How to Use This Percentage Calculator
          </h2>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            This page includes six different percentage calculators for every common scenario. Enter your numbers and the result updates instantly — no need to press a button. Each calculator solves a specific type of percentage problem.
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: 0 }}>
            Use "What is X% of Y" for discounts, taxes, and commissions. Use "X is what % of Y" to find ratios. Use "Percentage Change" to compare before-and-after values like prices, revenue, or weight. The tip calculator helps split restaurant bills quickly. All calculations happen in your browser — nothing is stored or sent anywhere.
          </p>
        </section>

        {/* FORMULA REFERENCE */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            Percentage Formulas
          </h2>
          <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${theme.border}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", fontSize: 13 }}>
              {[
                ["Calculation", "Formula"],
                ["X% of Y", "Y × (X ÷ 100)"],
                ["X is what % of Y", "(X ÷ Y) × 100"],
                ["% Change from A to B", "((B − A) ÷ |A|) × 100"],
                ["Increase X by P%", "X × (1 + P ÷ 100)"],
                ["Decrease X by P%", "X × (1 − P ÷ 100)"],
                ["Tip on bill B at T%", "B × (T ÷ 100)"],
              ].map((row, i) => (
                <div key={i} style={{ display: "contents" }}>
                  {row.map((cell, j) => (
                    <div key={j} style={{
                      padding: "10px 14px",
                      fontWeight: i === 0 ? 600 : j === 0 ? 500 : 400,
                      color: i === 0 ? theme.text : j === 1 ? theme.primary : theme.textMuted,
                      fontFamily: j === 1 && i > 0 ? "'Consolas', 'Monaco', monospace" : "inherit",
                      background: i === 0 ? theme.surfaceAlt : theme.surface,
                      borderBottom: i < 6 ? `1px solid ${theme.border}` : "none",
                      fontSize: j === 1 && i > 0 ? 12 : 13,
                    }}>{cell}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
            Frequently Asked Questions
          </h2>
          <FAQItem theme={theme}
            q="How do I calculate a percentage of a number?"
            a="Multiply the number by the percentage and divide by 100. For example, 20% of 150 is 150 × 20 ÷ 100 = 30. Or use the first calculator on this page — just enter the percentage and the number."
          />
          <FAQItem theme={theme}
            q="How do I find the percentage change between two numbers?"
            a="Subtract the old value from the new value, divide by the absolute value of the old value, and multiply by 100. For example, from 80 to 100: (100 − 80) ÷ 80 × 100 = 25% increase."
          />
          <FAQItem theme={theme}
            q="How do I calculate a discount?"
            a="Use the 'Decrease by %' calculator. Enter the original price and the discount percentage. For example, a $80 item with a 25% discount: 80 × (1 − 25/100) = $60."
          />
          <FAQItem theme={theme}
            q="How do I add tax to a price?"
            a="Use the 'Increase by %' calculator. Enter the price before tax and the tax rate. For example, $50 with 13% tax: 50 × (1 + 13/100) = $56.50."
          />
          <FAQItem theme={theme}
            q="What is a good tip percentage?"
            a="In North America, 15-20% is standard for restaurant service. 15% for adequate service, 18% for good service, and 20% or more for excellent service. The tip calculator above makes it easy to calculate any percentage."
          />
          <FAQItem theme={theme}
            q="How do I convert a fraction to a percentage?"
            a="Divide the numerator by the denominator and multiply by 100. For example, 3/8 = 3 ÷ 8 × 100 = 37.5%. Use the 'X is what % of Y' calculator with X as the numerator and Y as the denominator."
          />
        </section>

        <AdSlot position="footer" theme={theme} />

        <footer style={{
          marginTop: 32, paddingTop: 20, borderTop: `1px solid ${theme.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 8,
        }}>
          <span style={{ fontSize: 12, color: theme.textLight }}>
            © 2026 ToolCraftKit.com — Free tools for creators and entrepreneurs.
          </span>
          <div style={{ display: "flex", gap: 14, fontSize: 12, color: theme.textMuted }}>
            <span style={{ cursor: "pointer" }}>Privacy</span>
            <span style={{ cursor: "pointer" }}>Terms</span>
            <span style={{ cursor: "pointer" }}>Contact</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
