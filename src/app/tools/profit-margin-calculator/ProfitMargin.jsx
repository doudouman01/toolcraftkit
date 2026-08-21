"use client";
import { useState, useMemo } from "react";

/* ─── BRAND TOKENS ─── */
const LIGHT = {
  primary: "#0D9488", primaryLight: "#14B8A6",
  bg: "#FAFAF9", surface: "#FFFFFF", surfaceAlt: "#F5F5F4",
  border: "#E7E5E4", text: "#1C1917", textMuted: "#78716C", textLight: "#A8A29E",
  success: "#10B981", warning: "#F59E0B", danger: "#EF4444",
  inputBg: "#FFFFFF", shadow: "0 1px 3px rgba(0,0,0,0.06)",
};
const DARK = {
  primary: "#2DD4BF", primaryLight: "#5EEAD4",
  bg: "#0C0A09", surface: "#1C1917", surfaceAlt: "#292524",
  border: "#3F3F46", text: "#FAFAF9", textMuted: "#A8A29E", textLight: "#78716C",
  success: "#34D399", warning: "#FBBF24", danger: "#F87171",
  inputBg: "#292524", shadow: "0 1px 3px rgba(0,0,0,0.3)",
};

function FAQItem({ q, a, theme }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${theme.border}`, padding: "13px 0" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        width: "100%", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left",
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, lineHeight: 1.4, paddingRight: 16 }}>{q}</span>
        <span style={{ fontSize: 18, color: theme.textMuted, flexShrink: 0, transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s ease", lineHeight: 1 }}>+</span>
      </button>
      {open && <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.65, marginTop: 10, marginBottom: 0, paddingRight: 30 }}>{a}</p>}
    </div>
  );
}

function AdSlot({ position, theme }) {
  return (
    <div style={{
      border: `1px dashed ${theme.border}`, borderRadius: 8, padding: "12px",
      textAlign: "center", color: theme.textLight, fontSize: 11, fontStyle: "italic",
      background: theme.surfaceAlt, margin: position === "header" ? "0 0 20px" : "20px 0", opacity: 0.5,
    }}>Ad Slot — {position}</div>
  );
}

/* ─── STAT CARD ─── */
function StatCard({ label, value, sub, color, theme }) {
  return (
    <div style={{
      background: theme.surface, borderRadius: 10, padding: "14px 16px",
      border: `1px solid ${theme.border}`, flex: "1 1 140px", minWidth: 0, boxShadow: theme.shadow,
    }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: color || theme.text, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{value}</div>
      <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 3, fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: theme.textLight, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════ */
export default function ProfitMarginCalculator() {
  const [dark, setDark] = useState(false);
  const [mode, setMode] = useState("revenue_cost");
  const theme = dark ? DARK : LIGHT;

  // Mode 1: Revenue + Cost
  const [revenue, setRevenue] = useState("");
  const [cost, setCost] = useState("");

  // Mode 2: Cost + Desired Margin
  const [costM, setCostM] = useState("");
  const [desiredMargin, setDesiredMargin] = useState("");

  // Mode 3: Cost + Markup
  const [costK, setCostK] = useState("");
  const [markup, setMarkup] = useState("");

  const fmt = (n) => {
    if (n === null || n === undefined || isNaN(n)) return "—";
    return parseFloat(n.toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  const fmtPct = (n) => {
    if (n === null || n === undefined || isNaN(n)) return "—";
    return parseFloat(n.toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }) + "%";
  };

  const results = useMemo(() => {
    if (mode === "revenue_cost") {
      const r = parseFloat(revenue), c = parseFloat(cost);
      if (!r || !c) return null;
      const profit = r - c;
      const margin = (profit / r) * 100;
      const markupPct = (profit / c) * 100;
      return { revenue: r, cost: c, profit, margin, markup: markupPct };
    }
    if (mode === "cost_margin") {
      const c = parseFloat(costM), m = parseFloat(desiredMargin);
      if (!c || m === undefined || isNaN(m) || m >= 100) return null;
      const r = c / (1 - m / 100);
      const profit = r - c;
      const markupPct = (profit / c) * 100;
      return { revenue: r, cost: c, profit, margin: m, markup: markupPct };
    }
    if (mode === "cost_markup") {
      const c = parseFloat(costK), mk = parseFloat(markup);
      if (!c || !mk) return null;
      const r = c * (1 + mk / 100);
      const profit = r - c;
      const margin = (profit / r) * 100;
      return { revenue: r, cost: c, profit, margin, markup: mk };
    }
    return null;
  }, [mode, revenue, cost, costM, desiredMargin, costK, markup]);

  const costPct = results ? (results.cost / results.revenue) * 100 : 0;
  const profitPct = results ? (results.profit / results.revenue) * 100 : 0;

  const navItems = ["Text", "Writing", "Image", "Business", "Social", "Dev"];

  return (
    <div style={{
      minHeight: "100vh", background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <header style={{
        background: theme.surface, borderBottom: `1px solid ${theme.border}`,
        padding: "0 20px", height: 54, display: "flex", alignItems: "center",
        justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: theme.shadow,
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
            display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 8, color: theme.textMuted,
          }}>{dark ? "☀" : "☾"}</button>
        </nav>
      </header>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "24px 16px 60px" }}>

        <div style={{ fontSize: 12, color: theme.textLight, marginBottom: 14, display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ cursor: "pointer", color: theme.textMuted }}>Home</span><span>›</span>
          <span style={{ cursor: "pointer", color: theme.textMuted }}>Business Tools</span><span>›</span>
          <span style={{ color: theme.primary, fontWeight: 500 }}>Profit Margin Calculator</span>
        </div>

        <AdSlot position="header" theme={theme} />

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.03em" }}>Profit Margin Calculator</h1>
          <p style={{ fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5 }}>
            Calculate profit margin, markup, revenue, and profit from your costs. Three calculation modes for any business scenario.
          </p>
        </div>

        {/* INPUT SECTION */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: "20px",
          border: `1px solid ${theme.border}`, marginBottom: 16, boxShadow: theme.shadow,
        }}>
          {/* Mode selector */}
          <div style={{ display: "flex", gap: 4, marginBottom: 20, background: theme.surfaceAlt, padding: 4, borderRadius: 10 }}>
            {[
              { key: "revenue_cost", label: "Revenue & Cost" },
              { key: "cost_margin", label: "Cost & Margin" },
              { key: "cost_markup", label: "Cost & Markup" },
            ].map((m) => (
              <button key={m.key} onClick={() => setMode(m.key)} style={{
                padding: "8px 16px", fontSize: 13, fontWeight: mode === m.key ? 600 : 500,
                color: mode === m.key ? theme.primary : theme.textMuted,
                background: mode === m.key ? (dark ? "rgba(45,212,191,0.1)" : "rgba(13,148,136,0.08)") : "transparent",
                border: "none", borderRadius: 7, cursor: "pointer", flex: 1,
              }}>{m.label}</button>
            ))}
          </div>

          {/* Inputs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {mode === "revenue_cost" && <>
              <div style={{ flex: "1 1 200px" }}>
                <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, display: "block", marginBottom: 6 }}>Revenue (Selling Price)</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: theme.textLight, fontSize: 15 }}>$</span>
                  <input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder="0.00"
                    style={{ width: "100%", padding: "10px 12px 10px 28px", fontSize: 16, borderRadius: 8, border: `1.5px solid ${theme.border}`, background: theme.inputBg, color: theme.text, outline: "none", fontWeight: 600, boxSizing: "border-box" }}
                    onFocus={(e) => e.target.style.borderColor = theme.primary} onBlur={(e) => e.target.style.borderColor = theme.border}
                  />
                </div>
              </div>
              <div style={{ flex: "1 1 200px" }}>
                <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, display: "block", marginBottom: 6 }}>Cost</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: theme.textLight, fontSize: 15 }}>$</span>
                  <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="0.00"
                    style={{ width: "100%", padding: "10px 12px 10px 28px", fontSize: 16, borderRadius: 8, border: `1.5px solid ${theme.border}`, background: theme.inputBg, color: theme.text, outline: "none", fontWeight: 600, boxSizing: "border-box" }}
                    onFocus={(e) => e.target.style.borderColor = theme.primary} onBlur={(e) => e.target.style.borderColor = theme.border}
                  />
                </div>
              </div>
            </>}

            {mode === "cost_margin" && <>
              <div style={{ flex: "1 1 200px" }}>
                <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, display: "block", marginBottom: 6 }}>Cost</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: theme.textLight, fontSize: 15 }}>$</span>
                  <input type="number" value={costM} onChange={(e) => setCostM(e.target.value)} placeholder="0.00"
                    style={{ width: "100%", padding: "10px 12px 10px 28px", fontSize: 16, borderRadius: 8, border: `1.5px solid ${theme.border}`, background: theme.inputBg, color: theme.text, outline: "none", fontWeight: 600, boxSizing: "border-box" }}
                    onFocus={(e) => e.target.style.borderColor = theme.primary} onBlur={(e) => e.target.style.borderColor = theme.border}
                  />
                </div>
              </div>
              <div style={{ flex: "1 1 200px" }}>
                <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, display: "block", marginBottom: 6 }}>Desired Profit Margin</label>
                <div style={{ position: "relative" }}>
                  <input type="number" value={desiredMargin} onChange={(e) => setDesiredMargin(e.target.value)} placeholder="30"
                    style={{ width: "100%", padding: "10px 12px 10px 12px", fontSize: 16, borderRadius: 8, border: `1.5px solid ${theme.border}`, background: theme.inputBg, color: theme.text, outline: "none", fontWeight: 600, boxSizing: "border-box", paddingRight: 30 }}
                    onFocus={(e) => e.target.style.borderColor = theme.primary} onBlur={(e) => e.target.style.borderColor = theme.border}
                  />
                  <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: theme.textLight, fontSize: 15 }}>%</span>
                </div>
              </div>
            </>}

            {mode === "cost_markup" && <>
              <div style={{ flex: "1 1 200px" }}>
                <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, display: "block", marginBottom: 6 }}>Cost</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: theme.textLight, fontSize: 15 }}>$</span>
                  <input type="number" value={costK} onChange={(e) => setCostK(e.target.value)} placeholder="0.00"
                    style={{ width: "100%", padding: "10px 12px 10px 28px", fontSize: 16, borderRadius: 8, border: `1.5px solid ${theme.border}`, background: theme.inputBg, color: theme.text, outline: "none", fontWeight: 600, boxSizing: "border-box" }}
                    onFocus={(e) => e.target.style.borderColor = theme.primary} onBlur={(e) => e.target.style.borderColor = theme.border}
                  />
                </div>
              </div>
              <div style={{ flex: "1 1 200px" }}>
                <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, display: "block", marginBottom: 6 }}>Markup Percentage</label>
                <div style={{ position: "relative" }}>
                  <input type="number" value={markup} onChange={(e) => setMarkup(e.target.value)} placeholder="50"
                    style={{ width: "100%", padding: "10px 12px 10px 12px", fontSize: 16, borderRadius: 8, border: `1.5px solid ${theme.border}`, background: theme.inputBg, color: theme.text, outline: "none", fontWeight: 600, boxSizing: "border-box", paddingRight: 30 }}
                    onFocus={(e) => e.target.style.borderColor = theme.primary} onBlur={(e) => e.target.style.borderColor = theme.border}
                  />
                  <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: theme.textLight, fontSize: 15 }}>%</span>
                </div>
              </div>
            </>}
          </div>
        </div>

        {/* RESULTS */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
          <StatCard label="Revenue" value={results ? "$" + fmt(results.revenue) : "—"} theme={theme} />
          <StatCard label="Cost" value={results ? "$" + fmt(results.cost) : "—"} theme={theme} />
          <StatCard label="Profit" value={results ? "$" + fmt(results.profit) : "—"} color={results && results.profit >= 0 ? theme.success : theme.danger} theme={theme} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
          <StatCard label="Profit Margin" value={results ? fmtPct(results.margin) : "—"} sub="Profit ÷ Revenue" color={results && results.margin >= 0 ? theme.primary : theme.danger} theme={theme} />
          <StatCard label="Markup" value={results ? fmtPct(results.markup) : "—"} sub="Profit ÷ Cost" theme={theme} />
        </div>

        {/* VISUAL BAR */}
        {results && (
          <div style={{
            background: theme.surface, borderRadius: 12, padding: "18px",
            border: `1px solid ${theme.border}`, marginBottom: 20, boxShadow: theme.shadow,
          }}>
            <div style={{ fontSize: 12, color: theme.textMuted, fontWeight: 500, marginBottom: 10 }}>Revenue Breakdown</div>
            <div style={{ display: "flex", height: 32, borderRadius: 8, overflow: "hidden", marginBottom: 10 }}>
              <div style={{
                width: `${Math.max(0, Math.min(100, costPct))}%`, background: theme.danger,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 600, color: "#fff", minWidth: costPct > 10 ? 0 : 0,
                transition: "width 0.3s ease",
              }}>{costPct > 15 ? `Cost ${costPct.toFixed(0)}%` : ""}</div>
              <div style={{
                width: `${Math.max(0, Math.min(100, profitPct))}%`, background: theme.success,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 600, color: "#fff",
                transition: "width 0.3s ease",
              }}>{profitPct > 15 ? `Profit ${profitPct.toFixed(0)}%` : ""}</div>
            </div>
            <div style={{ display: "flex", gap: 20, fontSize: 12, color: theme.textMuted }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: theme.danger }} />
                Cost: ${fmt(results.cost)} ({costPct.toFixed(1)}%)
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: theme.success }} />
                Profit: ${fmt(results.profit)} ({profitPct.toFixed(1)}%)
              </span>
            </div>
          </div>
        )}

        <AdSlot position="middle" theme={theme} />

        {/* SEO */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em" }}>How to Use This Profit Margin Calculator</h2>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            Choose your calculation mode. "Revenue & Cost" calculates margin and markup from your selling price and cost. "Cost & Margin" tells you what price to charge to hit a target margin. "Cost & Markup" tells you the selling price for a given markup percentage.
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: 0 }}>
            Results update instantly. The visual bar shows how your revenue splits between cost and profit. Use this for pricing products, evaluating deals, or comparing profitability across different items.
          </p>
        </section>

        {/* MARGIN VS MARKUP TABLE */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em" }}>Margin vs Markup Reference</h2>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 14px" }}>
            Margin and markup are related but different. Margin is profit as a percentage of revenue. Markup is profit as a percentage of cost. The same dollar profit gives different margin and markup numbers.
          </p>
          <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${theme.border}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: 13 }}>
              {[
                ["Margin", "Markup", "Example ($100 cost)"],
                ["10%", "11.1%", "Sell at $111.11"],
                ["15%", "17.6%", "Sell at $117.65"],
                ["20%", "25%", "Sell at $125.00"],
                ["25%", "33.3%", "Sell at $133.33"],
                ["30%", "42.9%", "Sell at $142.86"],
                ["40%", "66.7%", "Sell at $166.67"],
                ["50%", "100%", "Sell at $200.00"],
              ].map((row, i) => (
                <div key={i} style={{ display: "contents" }}>
                  {row.map((cell, j) => (
                    <div key={j} style={{
                      padding: "10px 14px", fontWeight: i === 0 ? 600 : 400,
                      color: i === 0 ? theme.text : j === 2 ? theme.textMuted : theme.text,
                      background: i === 0 ? theme.surfaceAlt : theme.surface,
                      borderBottom: i < 7 ? `1px solid ${theme.border}` : "none",
                      fontVariantNumeric: "tabular-nums",
                    }}>{cell}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme} q="What is profit margin?" a="Profit margin is the percentage of revenue that remains as profit after subtracting costs. A 30% margin means you keep $0.30 of every $1 in revenue. It's calculated as (Revenue − Cost) ÷ Revenue × 100." />
          <FAQItem theme={theme} q="What is the difference between margin and markup?" a="Margin is profit divided by revenue (selling price). Markup is profit divided by cost. A 50% markup on a $100 cost means selling at $150 (profit of $50). But the margin on that sale is only 33.3% ($50 ÷ $150). They describe the same profit from different perspectives." />
          <FAQItem theme={theme} q="What is a good profit margin?" a="It varies by industry. Retail typically runs 2-5%, SaaS and software 70-90%, restaurants 3-9%, and professional services 15-40%. A 'good' margin is one that sustains your business and competes in your market." />
          <FAQItem theme={theme} q="How do I set prices using margin?" a="Use the 'Cost & Margin' mode. Enter your cost and desired margin. The calculator shows what price to charge. For example, if your cost is $60 and you want a 40% margin, you need to sell at $100." />
          <FAQItem theme={theme} q="Why is my markup higher than my margin?" a="Markup is always higher than margin for the same profit because markup divides by cost (a smaller number) while margin divides by revenue (a larger number). A 100% markup equals a 50% margin." />
          <FAQItem theme={theme} q="How do I calculate margin for multiple products?" a="Calculate each product's margin individually using this tool. For overall business margin, add up total revenue and total costs across all products and use those numbers." />
        </section>

        <AdSlot position="footer" theme={theme} />

        <footer style={{
          marginTop: 32, paddingTop: 20, borderTop: `1px solid ${theme.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8,
        }}>
          <span style={{ fontSize: 12, color: theme.textLight }}>© 2026 ToolCraftKit.com — Free tools for creators and entrepreneurs.</span>
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
