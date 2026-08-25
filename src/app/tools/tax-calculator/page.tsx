"use client";
import { useState } from "react";

const US_BRACKETS_2026 = [
  { min: 0, max: 11600, rate: 10 },
  { min: 11600, max: 47150, rate: 12 },
  { min: 47150, max: 100525, rate: 22 },
  { min: 100525, max: 191950, rate: 24 },
  { min: 191950, max: 243725, rate: 32 },
  { min: 243725, max: 609350, rate: 35 },
  { min: 609350, max: Infinity, rate: 37 },
];

const CA_BRACKETS_2026 = [
  { min: 0, max: 57375, rate: 15 },
  { min: 57375, max: 114750, rate: 20.5 },
  { min: 114750, max: 158468, rate: 26 },
  { min: 158468, max: 221708, rate: 29 },
  { min: 221708, max: Infinity, rate: 33 },
];

const UK_BRACKETS_2026 = [
  { min: 0, max: 12570, rate: 0 },
  { min: 12570, max: 50270, rate: 20 },
  { min: 50270, max: 125140, rate: 40 },
  { min: 125140, max: Infinity, rate: 45 },
];

function calcTax(income: number, brackets: typeof US_BRACKETS_2026) {
  let tax = 0;
  const details: { bracket: string; taxable: number; rate: number; tax: number }[] = [];
  for (const b of brackets) {
    if (income <= b.min) break;
    const taxable = Math.min(income, b.max) - b.min;
    const t = taxable * (b.rate / 100);
    tax += t;
    details.push({ bracket: `$${b.min.toLocaleString()} – ${b.max === Infinity ? "+" : "$" + b.max.toLocaleString()}`, taxable, rate: b.rate, tax: t });
  }
  return { tax, details, effectiveRate: income > 0 ? (tax / income) * 100 : 0, afterTax: income - tax };
}

export default function Page() {
  const [income, setIncome] = useState("75000");
  const [country, setCountry] = useState("us");
  const [filing, setFiling] = useState("single");

  const inc = parseFloat(income) || 0;
  const brackets = country === "us" ? US_BRACKETS_2026 : country === "ca" ? CA_BRACKETS_2026 : UK_BRACKETS_2026;
  const currency = country === "uk" ? "£" : "$";
  const result = calcTax(inc, brackets);

  const fmt = (n: number) => currency + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtShort = (n: number) => { if (n >= 1e6) return currency + (n / 1e6).toFixed(1) + "M"; if (n >= 1e3) return currency + (n / 1e3).toFixed(0) + "K"; return currency + n.toFixed(0); };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    resultCard: { background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 10, padding: 20, marginTop: 16 } as const,
    resultRow: { display: "flex" as const, justifyContent: "space-between" as const, padding: "10px 0", borderBottom: "1px solid #E0F2F1" },
    big: { fontSize: 36, fontWeight: 700, color: "#0D9488" } as const,
  };

  const countries = [
    { key: "us", label: "🇺🇸 United States" },
    { key: "ca", label: "🇨🇦 Canada" },
    { key: "uk", label: "🇬🇧 United Kingdom" },
  ];

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Income Tax Calculator</h1>
      <p style={s.sub}>Estimate your federal income tax based on your annual income. US, Canada, and UK brackets.</p>

      <div style={s.card}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {countries.map((c) => (
            <button key={c.key} onClick={() => setCountry(c.key)} style={{ ...s.btnSm, background: country === c.key ? "#0D9488" : "#F5F5F4", color: country === c.key ? "#fff" : "#1C1917", border: country === c.key ? "1px solid #0D9488" : "1px solid #E7E5E4" }}>{c.label}</button>
          ))}
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={s.label}>Annual Gross Income ({currency})</label>
          <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} style={s.input} />
          <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
            {[30000, 50000, 75000, 100000, 150000, 250000].map((n) => (
              <button key={n} onClick={() => setIncome(String(n))} style={{ ...s.btnSm, fontSize: 11, padding: "3px 6px" }}>{fmtShort(n)}</button>
            ))}
          </div>
        </div>

        {inc > 0 && (
          <div style={s.resultCard}>
            <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center", marginBottom: 20, flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: "#57534E", marginBottom: 4 }}>Federal Tax</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#EF4444" }}>{fmt(result.tax)}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#57534E", marginBottom: 4 }}>After Tax</div>
                <div style={s.big}>{fmt(result.afterTax)}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#57534E", marginBottom: 4 }}>Effective Rate</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#6366F1" }}>{result.effectiveRate.toFixed(1)}%</div>
              </div>
            </div>

            <div style={{ marginBottom: 16, display: "flex", borderRadius: 8, overflow: "hidden", height: 14 }}>
              <div style={{ width: (result.afterTax / inc * 100) + "%", background: "#0D9488" }} />
              <div style={{ flex: 1, background: "#EF4444" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#78716C" }}>
              <span>Take-home ({(result.afterTax / inc * 100).toFixed(0)}%)</span>
              <span>Tax ({(result.tax / inc * 100).toFixed(0)}%)</span>
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>Monthly Take-Home</div>
              <div style={s.resultRow}><span style={{ fontSize: 14, color: "#57534E" }}>Monthly Gross</span><span style={{ fontSize: 14, fontWeight: 600 }}>{fmt(inc / 12)}</span></div>
              <div style={s.resultRow}><span style={{ fontSize: 14, color: "#57534E" }}>Monthly Tax</span><span style={{ fontSize: 14, fontWeight: 600, color: "#EF4444" }}>−{fmt(result.tax / 12)}</span></div>
              <div style={{ ...s.resultRow, borderBottom: "none" }}><span style={{ fontSize: 14, color: "#57534E" }}>Monthly Net</span><span style={{ fontSize: 14, fontWeight: 700, color: "#0D9488" }}>{fmt(result.afterTax / 12)}</span></div>
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>Bracket Breakdown</div>
              {result.details.map((d, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #F5F5F4", fontSize: 13 }}>
                  <span style={{ color: "#78716C" }}>{d.bracket}</span>
                  <span style={{ color: "#57534E" }}>{d.rate}% on {fmt(d.taxable)}</span>
                  <span style={{ fontWeight: 600, color: "#EF4444" }}>{fmt(d.tax)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>This calculator estimates your federal income tax based on progressive tax brackets for the US, Canada, and UK. Progressive taxation means only the income within each bracket is taxed at that rate — not your entire income at the highest rate.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>This is a simplified estimate for federal tax only. It does not include state/provincial taxes, Social Security, Medicare, CPP/EI, deductions, or credits. Consult a tax professional for your actual tax liability.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "What is the difference between marginal and effective tax rate?", a: "Your marginal rate is the rate on your last dollar of income (the highest bracket you reach). Your effective rate is the average rate across all your income. For example, earning $100,000 in the US puts you in the 22% bracket, but your effective rate is about 17%." },
          { q: "Does this include state or provincial taxes?", a: "No. This calculator shows federal income tax only. Your actual tax bill includes state/provincial taxes, which vary widely. Some US states (Texas, Florida) have no income tax; others (California) add up to 13.3%." },
          { q: "How do tax brackets work?", a: "Tax brackets are progressive. If you earn $60,000 in the US, you do not pay 22% on the entire amount. You pay 10% on the first $11,600, 12% on $11,601-$47,150, and 22% only on the remaining $12,850." },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: i < 2 ? 14 : 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 4 }}>{faq.q}</h3>
            <p style={{ fontSize: 13, color: "#57534E", lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
