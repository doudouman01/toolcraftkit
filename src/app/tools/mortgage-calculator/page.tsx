"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";

export default function Page() {
  const [homePrice, setHomePrice] = useState("400000");
  const [downPct, setDownPct] = useState("20");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const [propertyTax, setPropertyTax] = useState("3000");
  const [insurance, setInsurance] = useState("1200");
  const [showBreakdown, setShowBreakdown] = useState(false);

  const price = parseFloat(homePrice) || 0;
  const down = price * ((parseFloat(downPct) || 0) / 100);
  const loan = price - down;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseInt(years) || 30) * 12;
  const taxMonthly = (parseFloat(propertyTax) || 0) / 12;
  const insMonthly = (parseFloat(insurance) || 0) / 12;

  const mortgagePayment = r > 0 ? loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loan / n;
  const totalMonthly = mortgagePayment + taxMonthly + insMonthly;
  const totalPaid = mortgagePayment * n;
  const totalInterest = totalPaid - loan;

  const schedule: { year: number; principal: number; interest: number; balance: number }[] = [];
  let bal = loan;
  for (let y = 1; y <= Math.min(parseInt(years) || 30, 30); y++) {
    let yearPrinc = 0, yearInt = 0;
    for (let m = 0; m < 12; m++) {
      const intPayment = bal * r;
      const princPayment = mortgagePayment - intPayment;
      yearPrinc += princPayment;
      yearInt += intPayment;
      bal -= princPayment;
    }
    schedule.push({ year: y, principal: yearPrinc, interest: yearInt, balance: Math.max(bal, 0) });
  }

  const fmt = (n: number) => "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtShort = (n: number) => { if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M"; return "$" + (n / 1e3).toFixed(0) + "K"; };

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
    pieSlice: { display: "flex" as const, alignItems: "center" as const, gap: 8, fontSize: 13, color: "#57534E" },
  };

  const pieces = [
    { label: "Principal & Interest", amount: mortgagePayment, color: "#0D9488", pct: (mortgagePayment / totalMonthly * 100) },
    { label: "Property Tax", amount: taxMonthly, color: "#6366F1", pct: (taxMonthly / totalMonthly * 100) },
    { label: "Insurance", amount: insMonthly, color: "#F59E0B", pct: (insMonthly / totalMonthly * 100) },
  ];

  return (
    <div style={s.page}>
      <ToolSchema
        name="Mortgage Calculator"
        description="Estimate monthly mortgage payments with taxes, insurance, and full amortization schedule."
        slug="mortgage-calculator"
        category="BusinessApplication"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Business Tools", url: "https://toolcraftkit.com/#business-tools" },
          { name: "Mortgage Calculator", url: "https://toolcraftkit.com/tools/mortgage-calculator" },
        ]}
      />
      <h1 style={s.h1}>Mortgage Calculator</h1>
      <p style={s.sub}>Estimate your monthly mortgage payment including taxes and insurance.</p>

      <div style={s.card}>
        <div style={{ marginBottom: 14 }}>
          <label style={s.label}>Home Price ($)</label>
          <input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} style={s.input} />
          <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
            {[200000, 300000, 400000, 500000, 750000, 1000000].map((n) => (
              <button key={n} onClick={() => setHomePrice(String(n))} style={{ ...s.btnSm, fontSize: 11, padding: "3px 6px" }}>{fmtShort(n)}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
          <div style={{ flex: 1, minWidth: 120 }}>
            <label style={s.label}>Down Payment (%)</label>
            <input type="number" value={downPct} onChange={(e) => setDownPct(e.target.value)} style={s.input} />
            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
              {[5, 10, 15, 20, 25].map((n) => (
                <button key={n} onClick={() => setDownPct(String(n))} style={{ ...s.btnSm, fontSize: 11, padding: "3px 6px" }}>{n}%</button>
              ))}
            </div>
            <div style={{ fontSize: 12, color: "#78716C", marginTop: 4 }}>Down: {fmt(down)} | Loan: {fmt(loan)}</div>
          </div>
          <div style={{ flex: 1, minWidth: 100 }}>
            <label style={s.label}>Interest Rate (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1" style={s.input} />
          </div>
          <div style={{ flex: 1, minWidth: 100 }}>
            <label style={s.label}>Loan Term (years)</label>
            <select value={years} onChange={(e) => setYears(e.target.value)} style={{ ...s.input, cursor: "pointer" }}>
              {[10, 15, 20, 25, 30].map((n) => <option key={n} value={n}>{n} years</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={s.label}>Annual Property Tax ($)</label>
            <input type="number" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)} style={s.input} />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={s.label}>Annual Home Insurance ($)</label>
            <input type="number" value={insurance} onChange={(e) => setInsurance(e.target.value)} style={s.input} />
          </div>
        </div>

        {price > 0 && (
          <div style={s.resultCard}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: "#57534E", marginBottom: 4 }}>Monthly Payment</div>
              <div style={s.big}>{fmt(totalMonthly)}</div>
            </div>

            <div style={{ marginBottom: 16, display: "flex", borderRadius: 8, overflow: "hidden", height: 14 }}>
              {pieces.map((p) => (
                <div key={p.label} style={{ width: p.pct + "%", background: p.color, transition: "width 0.3s" }} />
              ))}
            </div>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
              {pieces.map((p) => (
                <div key={p.label} style={s.pieSlice}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: p.color }} />
                  <span>{p.label}: {fmt(p.amount)}</span>
                </div>
              ))}
            </div>

            <div style={s.resultRow}><span style={{ fontSize: 14, color: "#57534E" }}>Loan Amount</span><span style={{ fontSize: 14, fontWeight: 600 }}>{fmt(loan)}</span></div>
            <div style={s.resultRow}><span style={{ fontSize: 14, color: "#57534E" }}>Total Interest</span><span style={{ fontSize: 14, fontWeight: 600, color: "#EF4444" }}>{fmt(totalInterest)}</span></div>
            <div style={s.resultRow}><span style={{ fontSize: 14, color: "#57534E" }}>Total Paid (P&I only)</span><span style={{ fontSize: 14, fontWeight: 700 }}>{fmt(totalPaid)}</span></div>
            <div style={{ ...s.resultRow, borderBottom: "none" }}><span style={{ fontSize: 14, color: "#57534E" }}>Interest-to-Loan Ratio</span><span style={{ fontSize: 14, fontWeight: 600 }}>{(totalInterest / loan * 100).toFixed(0)}%</span></div>

            <div style={{ marginTop: 16, textAlign: "center" }}>
              <button onClick={() => setShowBreakdown(!showBreakdown)} style={s.btnSm}>{showBreakdown ? "Hide" : "Show"} Yearly Breakdown</button>
            </div>
            {showBreakdown && (
              <div style={{ marginTop: 16, maxHeight: 350, overflowY: "auto", border: "1px solid #E7E5E4", borderRadius: 8 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead><tr style={{ background: "#F5F5F4", position: "sticky" as const, top: 0 }}>
                    <th style={{ padding: "8px 6px", textAlign: "left" }}>Year</th><th style={{ padding: "8px 6px", textAlign: "right" }}>Principal</th><th style={{ padding: "8px 6px", textAlign: "right" }}>Interest</th><th style={{ padding: "8px 6px", textAlign: "right" }}>Balance</th>
                  </tr></thead>
                  <tbody>{schedule.map((row) => (
                    <tr key={row.year} style={{ borderBottom: "1px solid #F5F5F4" }}>
                      <td style={{ padding: "6px" }}>{row.year}</td><td style={{ padding: "6px", textAlign: "right", color: "#0D9488" }}>{fmt(row.principal)}</td><td style={{ padding: "6px", textAlign: "right", color: "#EF4444" }}>{fmt(row.interest)}</td><td style={{ padding: "6px", textAlign: "right", fontWeight: 600 }}>{fmt(row.balance)}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>This mortgage calculator estimates your monthly home payment including principal, interest, property taxes, and home insurance. It shows the true cost of homeownership beyond just the loan payment, helping you budget accurately before buying.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>The yearly breakdown reveals how your payments shift from mostly interest to mostly principal over time. Results are estimates — actual rates and costs vary by lender and location.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "How much house can I afford?", a: "A common guideline is the 28/36 rule: spend no more than 28% of gross monthly income on housing costs and no more than 36% on total debt. If you earn $6,000/month, aim for a total housing payment under $1,680." },
          { q: "What is a good down payment?", a: "20% is ideal because it avoids private mortgage insurance (PMI). However, many programs allow 3-5% down. A larger down payment means lower monthly payments and less interest paid overall." },
          { q: "Should I choose a 15-year or 30-year mortgage?", a: "A 15-year mortgage has higher monthly payments but much lower total interest. On a $300K loan at 6.5%, you would save roughly $200,000 in interest with a 15-year term compared to 30 years." },
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
