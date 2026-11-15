"use client";
import { useState } from "react";

export default function Page() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [compound, setCompound] = useState("12");
  const [monthly, setMonthly] = useState("200");
  const [showTable, setShowTable] = useState(false);

  const P = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100;
  const t = parseFloat(years) || 1;
  const n = parseInt(compound) || 12;
  const m = parseFloat(monthly) || 0;

  // Compound interest with monthly contributions
  const compoundAmount = P * Math.pow(1 + r / n, n * t);
  const contributionAmount = m * ((Math.pow(1 + r / n, n * t) - 1) / (r / n || 1));
  const totalValue = r > 0 ? compoundAmount + contributionAmount : P + m * 12 * t;
  const totalContributions = P + m * 12 * t;
  const totalInterest = totalValue - totalContributions;

  // Without contributions
  const simpleGrowth = P * Math.pow(1 + r / n, n * t);
  const simpleInterest = simpleGrowth - P;

  // Year-by-year breakdown
  const schedule: { year: number; balance: number; contributions: number; interest: number; totalInterest: number }[] = [];
  let bal = P;
  let totInt = 0;
  let totCont = P;
  for (let y = 1; y <= Math.min(t, 50); y++) {
    const startBal = bal;
    for (let j = 0; j < n; j++) {
      const intEarned = bal * (r / n);
      bal += intEarned + (m * 12) / n;
    }
    const yearInt = bal - startBal - m * 12;
    totInt += yearInt;
    totCont += m * 12;
    schedule.push({ year: y, balance: bal, contributions: totCont, interest: totInt, totalInterest: totInt });
  }

  const fmt = (n: number) => "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtShort = (n: number) => { if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M"; if (n >= 1e3) return "$" + (n / 1e3).toFixed(1) + "K"; return "$" + n.toFixed(0); };

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

  const compoundOptions = [
    { val: "1", label: "Annually" },
    { val: "4", label: "Quarterly" },
    { val: "12", label: "Monthly" },
    { val: "365", label: "Daily" },
  ];

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Compound Interest Calculator</h1>
      <p style={s.sub}>See how your money grows over time with compound interest and regular contributions.</p>

      <div style={s.card}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
          <div style={{ flex: 2, minWidth: 160 }}>
            <label style={s.label}>Initial Investment ($)</label>
            <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} style={s.input} />
            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
              {[1000, 5000, 10000, 25000, 50000, 100000].map((n) => (
                <button key={n} onClick={() => setPrincipal(String(n))} style={{ ...s.btnSm, fontSize: 11, padding: "3px 6px" }}>{fmtShort(n)}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={s.label}>Monthly Contribution ($)</label>
            <input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} style={s.input} />
            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
              {[0, 100, 200, 500, 1000].map((n) => (
                <button key={n} onClick={() => setMonthly(String(n))} style={{ ...s.btnSm, fontSize: 11, padding: "3px 6px" }}>{n === 0 ? "None" : "$" + n}</button>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 100 }}>
            <label style={s.label}>Annual Interest Rate (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1" style={s.input} />
            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
              {[4, 5, 7, 8, 10, 12].map((n) => (
                <button key={n} onClick={() => setRate(String(n))} style={{ ...s.btnSm, fontSize: 11, padding: "3px 6px" }}>{n}%</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
          <div style={{ flex: 1, minWidth: 100 }}>
            <label style={s.label}>Time Period (years)</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)} style={s.input} />
            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
              {[5, 10, 15, 20, 25, 30].map((n) => (
                <button key={n} onClick={() => setYears(String(n))} style={{ ...s.btnSm, fontSize: 11, padding: "3px 6px" }}>{n}y</button>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={s.label}>Compound Frequency</label>
            <select value={compound} onChange={(e) => setCompound(e.target.value)} style={{ ...s.input, cursor: "pointer" }}>
              {compoundOptions.map((o) => <option key={o.val} value={o.val}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {P > 0 && (
          <div style={s.resultCard}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: "#57534E", marginBottom: 4 }}>Future Value</div>
              <div style={s.big}>{fmt(totalValue)}</div>
            </div>

            <div style={s.resultRow}>
              <span style={{ fontSize: 14, color: "#57534E" }}>Initial Investment</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1C1917" }}>{fmt(P)}</span>
            </div>
            <div style={s.resultRow}>
              <span style={{ fontSize: 14, color: "#57534E" }}>Total Contributions</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1C1917" }}>{fmt(m * 12 * t)}</span>
            </div>
            <div style={s.resultRow}>
              <span style={{ fontSize: 14, color: "#57534E" }}>Total Interest Earned</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#0D9488" }}>+{fmt(totalInterest)}</span>
            </div>
            <div style={{ ...s.resultRow, borderBottom: "none" }}>
              <span style={{ fontSize: 14, color: "#57534E" }}>Total Money In vs Out</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1C1917" }}>{fmt(totalContributions)} → {fmt(totalValue)}</span>
            </div>

            <div style={{ marginTop: 16, display: "flex", gap: 0, borderRadius: 8, overflow: "hidden", height: 14 }}>
              <div style={{ width: (P / totalValue * 100) + "%", background: "#6366F1", transition: "width 0.3s" }} title="Initial" />
              <div style={{ width: ((m * 12 * t) / totalValue * 100) + "%", background: "#8B5CF6", transition: "width 0.3s" }} title="Contributions" />
              <div style={{ flex: 1, background: "#0D9488" }} title="Interest" />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "#78716C", flexWrap: "wrap", gap: 4 }}>
              <span>Initial ({(P / totalValue * 100).toFixed(0)}%)</span>
              <span>Contributions ({((m * 12 * t) / totalValue * 100).toFixed(0)}%)</span>
              <span>Interest ({(totalInterest / totalValue * 100).toFixed(0)}%)</span>
            </div>

            <div style={{ marginTop: 16, textAlign: "center" }}>
              <button onClick={() => setShowTable(!showTable)} style={s.btnSm}>
                {showTable ? "Hide" : "Show"} Year-by-Year Breakdown
              </button>
            </div>

            {showTable && (
              <div style={{ marginTop: 16, maxHeight: 400, overflowY: "auto", border: "1px solid #E7E5E4", borderRadius: 8 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: "#F5F5F4", position: "sticky" as const, top: 0 }}>
                      <th style={{ padding: "8px 6px", textAlign: "left" }}>Year</th>
                      <th style={{ padding: "8px 6px", textAlign: "right" }}>Balance</th>
                      <th style={{ padding: "8px 6px", textAlign: "right" }}>Contributions</th>
                      <th style={{ padding: "8px 6px", textAlign: "right" }}>Total Interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((row) => (
                      <tr key={row.year} style={{ borderBottom: "1px solid #F5F5F4" }}>
                        <td style={{ padding: "6px" }}>{row.year}</td>
                        <td style={{ padding: "6px", textAlign: "right", fontWeight: 600 }}>{fmt(row.balance)}</td>
                        <td style={{ padding: "6px", textAlign: "right" }}>{fmt(row.contributions)}</td>
                        <td style={{ padding: "6px", textAlign: "right", color: "#0D9488" }}>{fmt(row.totalInterest)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, your money grows exponentially over time — this is what Albert Einstein reportedly called &quot;the eighth wonder of the world.&quot;</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>This calculator lets you model growth with different compounding frequencies (daily, monthly, quarterly, annually) and regular monthly contributions. The year-by-year breakdown shows exactly how your wealth accumulates over time.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "What is compound interest?", a: "Compound interest means you earn interest on your interest. If you invest $1,000 at 10%, you earn $100 the first year. The second year, you earn 10% on $1,100 ($110), not just on the original $1,000. Over time, this snowball effect dramatically accelerates your wealth growth." },
          { q: "How often should interest compound?", a: "More frequent compounding (daily vs annually) results in slightly more growth. Monthly compounding is the most common for savings accounts and investments. The difference between monthly and daily compounding is usually negligible." },
          { q: "What is the Rule of 72?", a: "The Rule of 72 is a quick way to estimate how long it takes to double your money. Divide 72 by the interest rate: at 7% interest, your money doubles in about 72 ÷ 7 = 10.3 years. At 10%, it doubles in about 7.2 years." },
          { q: "How much should I invest monthly?", a: "Financial advisors commonly recommend investing 10-20% of your gross income. Even small regular contributions make a huge difference thanks to compound interest. $200/month at 7% for 30 years grows to over $227,000." },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 4 }}>{faq.q}</h3>
            <p style={{ fontSize: 13, color: "#57534E", lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
