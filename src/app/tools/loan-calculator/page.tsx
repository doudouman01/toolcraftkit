"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

function calcLoan(principal: number, annualRate: number, years: number) {
  const months = years * 12;
  const r = annualRate / 100 / 12;
  if (r === 0) {
    const monthly = principal / months;
    return { monthly, totalPayment: principal, totalInterest: 0, months, schedule: Array.from({ length: months }, (_, i) => ({ month: i + 1, payment: monthly, principal: monthly, interest: 0, balance: principal - monthly * (i + 1) })) };
  }
  const monthly = principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const totalPayment = monthly * months;
  const totalInterest = totalPayment - principal;
  const schedule: { month: number; payment: number; principal: number; interest: number; balance: number }[] = [];
  let balance = principal;
  for (let i = 0; i < months; i++) {
    const interest = balance * r;
    const princ = monthly - interest;
    balance -= princ;
    schedule.push({ month: i + 1, payment: monthly, principal: princ, interest, balance: Math.max(balance, 0) });
  }
  return { monthly, totalPayment, totalInterest, months, schedule };
}

export default function Page() {
  const [amount, setAmount] = useState("250000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const [showSchedule, setShowSchedule] = useState(false);

  const a = parseFloat(amount) || 0;
  const r = parseFloat(rate) || 0;
  const y = parseFloat(years) || 1;
  const result = a > 0 ? calcLoan(a, r, y) : null;

  const fmt = (n: number) => "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtShort = (n: number) => { if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M"; if (n >= 1e3) return "$" + (n / 1e3).toFixed(0) + "K"; return "$" + n.toFixed(0); };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none" } as const,
    resultCard: { background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 10, padding: 20, marginTop: 16 } as const,
    resultRow: { display: "flex" as const, justifyContent: "space-between" as const, padding: "10px 0", borderBottom: "1px solid #E0F2F1" },
    big: { fontSize: 36, fontWeight: 700, color: "#0D9488" } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema
        name="Loan Calculator"
        description="Calculate monthly payments, total interest, and full amortization schedule for mortgages and loans."
        slug="loan-calculator"
        category="BusinessApplication"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Business Tools", url: "https://toolcraftkit.com/#business-tools" },
          { name: "Loan Calculator", url: "https://toolcraftkit.com/tools/loan-calculator" },
        ]}
      />
      <h1 style={s.h1}>Loan Calculator</h1>
      <p style={s.sub}>Calculate monthly payments, total interest, and view the full amortization schedule.</p>

      <div style={s.card}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
          <div style={{ flex: 2, minWidth: 160 }}>
            <label style={s.label}>Loan Amount ($)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="250000" style={s.input} />
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              {[10000, 50000, 100000, 250000, 500000].map((n) => (
                <button key={n} onClick={() => setAmount(String(n))} style={{ ...s.btnSm, fontSize: 11, padding: "3px 6px" }}>{fmtShort(n)}</button>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 100 }}>
            <label style={s.label}>Interest Rate (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="6.5" step="0.1" style={s.input} />
          </div>
          <div style={{ flex: 1, minWidth: 100 }}>
            <label style={s.label}>Term (years)</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="30" style={s.input} />
            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
              {[5, 10, 15, 20, 25, 30].map((n) => (
                <button key={n} onClick={() => setYears(String(n))} style={{ ...s.btnSm, fontSize: 11, padding: "3px 6px" }}>{n}y</button>
              ))}
            </div>
          </div>
        </div>

        {result && (
          <div style={s.resultCard}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: "#57534E", marginBottom: 4 }}>Monthly Payment</div>
              <div style={s.big}>{fmt(result.monthly)}</div>
            </div>

            <div style={s.resultRow}>
              <span style={{ fontSize: 14, color: "#57534E" }}>Loan Amount</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1C1917" }}>{fmt(a)}</span>
            </div>
            <div style={s.resultRow}>
              <span style={{ fontSize: 14, color: "#57534E" }}>Total Interest Paid</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#EF4444" }}>{fmt(result.totalInterest)}</span>
            </div>
            <div style={{ ...s.resultRow, borderBottom: "none" }}>
              <span style={{ fontSize: 14, color: "#57534E" }}>Total Amount Paid</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1C1917" }}>{fmt(result.totalPayment)}</span>
            </div>

            <div style={{ marginTop: 16, display: "flex", gap: 0, borderRadius: 8, overflow: "hidden", height: 14 }}>
              <div style={{ width: (a / result.totalPayment * 100) + "%", background: "#0D9488", transition: "width 0.3s" }} title="Principal" />
              <div style={{ flex: 1, background: "#EF4444" }} title="Interest" />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 11, color: "#78716C" }}>
              <span>Principal ({(a / result.totalPayment * 100).toFixed(0)}%)</span>
              <span>Interest ({(result.totalInterest / result.totalPayment * 100).toFixed(0)}%)</span>
            </div>

            <div style={{ marginTop: 16, textAlign: "center" }}>
              <button onClick={() => setShowSchedule(!showSchedule)} style={s.btnSm}>
                {showSchedule ? "Hide" : "Show"} Amortization Schedule ({result.months} months)
              </button>
            </div>

            {showSchedule && (
              <div style={{ marginTop: 16, maxHeight: 400, overflowY: "auto", border: "1px solid #E7E5E4", borderRadius: 8 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: "#F5F5F4", position: "sticky" as const, top: 0 }}>
                      <th style={{ padding: "8px 6px", textAlign: "left" }}>#</th>
                      <th style={{ padding: "8px 6px", textAlign: "right" }}>Payment</th>
                      <th style={{ padding: "8px 6px", textAlign: "right" }}>Principal</th>
                      <th style={{ padding: "8px 6px", textAlign: "right" }}>Interest</th>
                      <th style={{ padding: "8px 6px", textAlign: "right" }}>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map((row) => (
                      <tr key={row.month} style={{ borderBottom: "1px solid #F5F5F4" }}>
                        <td style={{ padding: "6px" }}>{row.month}</td>
                        <td style={{ padding: "6px", textAlign: "right" }}>{fmt(row.payment)}</td>
                        <td style={{ padding: "6px", textAlign: "right", color: "#0D9488" }}>{fmt(row.principal)}</td>
                        <td style={{ padding: "6px", textAlign: "right", color: "#EF4444" }}>{fmt(row.interest)}</td>
                        <td style={{ padding: "6px", textAlign: "right", fontWeight: 600 }}>{fmt(row.balance)}</td>
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
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>This loan calculator computes your monthly payment, total interest, and total amount paid over the life of a fixed-rate loan. Use it for mortgages, car loans, personal loans, or student loans. The amortization schedule shows exactly how each payment is split between principal and interest.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Results are for estimation purposes. Actual loan terms may vary. Always consult a financial advisor for major borrowing decisions.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "How is the monthly payment calculated?", a: "The standard amortization formula is used: M = P × [r(1+r)^n] / [(1+r)^n – 1], where P is the loan amount, r is the monthly interest rate, and n is the total number of payments." },
          { q: "What is an amortization schedule?", a: "An amortization schedule breaks down each payment into principal and interest portions. Early in the loan, most of your payment goes to interest. Over time, more goes toward principal." },
          { q: "How does a higher interest rate affect my payments?", a: "A higher interest rate increases both your monthly payment and the total interest paid. Even a 1% increase on a $250,000 mortgage can add tens of thousands of dollars over 30 years." },
          { q: "Can I use this for car loans?", a: "Yes. Enter the car price (minus down payment), the annual interest rate, and the loan term in years. Typical car loans are 3-7 years." },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 4 }}>{faq.q}</h3>
            <p style={{ fontSize: 13, color: "#57534E", lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>
          <SeoContent />
    </div>
  );
}
