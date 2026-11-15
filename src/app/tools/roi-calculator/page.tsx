"use client";
import { useState } from "react";

export default function Page() {
  const [mode, setMode] = useState<"basic" | "annualized">("basic");
  const [investment, setInvestment] = useState("");
  const [returned, setReturned] = useState("");
  const [years, setYears] = useState("");

  const inv = parseFloat(investment) || 0;
  const ret = parseFloat(returned) || 0;
  const yrs = parseFloat(years) || 1;

  const gain = ret - inv;
  const roi = inv > 0 ? (gain / inv) * 100 : 0;
  const annualizedRoi = inv > 0 && yrs > 0 ? (Math.pow(ret / inv, 1 / yrs) - 1) * 100 : 0;
  const hasResult = inv > 0 && ret > 0;
  const isProfit = gain >= 0;

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    row: { display: "flex" as const, alignItems: "center" as const, gap: 8, marginBottom: 14, flexWrap: "wrap" as const },
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none" } as const,
    resultCard: { background: isProfit ? "#F0FDFA" : "#FEF2F2", border: `1px solid ${isProfit ? "#99F6E4" : "#FECACA"}`, borderRadius: 10, padding: 20, marginTop: 16 } as const,
    resultRow: { display: "flex" as const, justifyContent: "space-between" as const, alignItems: "center" as const, padding: "10px 0", borderBottom: `1px solid ${isProfit ? "#E0F2F1" : "#FEE2E2"}` },
    big: { fontSize: 32, fontWeight: 700, color: isProfit ? "#0D9488" : "#EF4444" } as const,
    stat: { textAlign: "center" as const, padding: "8px 16px" },
    statVal: { fontSize: 18, fontWeight: 700 } as const,
    statLabel: { fontSize: 11, color: "#78716C" } as const,
  };

  const fmt = (n: number) => {
    if (Math.abs(n) >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
    if (Math.abs(n) >= 1e3) return "$" + (n / 1e3).toFixed(1) + "K";
    return "$" + n.toFixed(2);
  };

  return (
    <div style={s.page}>
      <h1 style={s.h1}>ROI Calculator</h1>
      <p style={s.sub}>Calculate return on investment, net profit, and annualized returns.</p>

      <div style={s.card}>
        <div style={s.row}>
          {([["basic", "Basic ROI"], ["annualized", "Annualized ROI"]] as const).map(([key, lbl]) => (
            <button key={key} onClick={() => setMode(key)} style={{ ...s.btnSm, background: mode === key ? "#0D9488" : "#F5F5F4", color: mode === key ? "#fff" : "#1C1917", border: mode === key ? "1px solid #0D9488" : "1px solid #E7E5E4" }}>{lbl}</button>
          ))}
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={s.label}>Initial Investment ($)</label>
          <input type="number" value={investment} onChange={(e) => setInvestment(e.target.value)} placeholder="10000" style={s.input} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={s.label}>Total Return / Final Value ($)</label>
          <input type="number" value={returned} onChange={(e) => setReturned(e.target.value)} placeholder="15000" style={s.input} />
        </div>

        {mode === "annualized" && (
          <div style={{ marginBottom: 14 }}>
            <label style={s.label}>Time Period (years)</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="3" style={s.input} step="0.5" />
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              {[0.5, 1, 2, 3, 5, 10].map((n) => (
                <button key={n} onClick={() => setYears(String(n))} style={{ ...s.btnSm, fontSize: 11, padding: "3px 8px" }}>{n < 1 ? "6mo" : n + "y"}</button>
              ))}
            </div>
          </div>
        )}

        {hasResult && (
          <div style={s.resultCard}>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: "#57534E", marginBottom: 4 }}>{mode === "annualized" ? "Annualized ROI" : "Return on Investment"}</div>
              <div style={s.big}>{(mode === "annualized" ? annualizedRoi : roi).toFixed(2)}%</div>
              <div style={{ fontSize: 13, color: "#78716C", marginTop: 4 }}>{isProfit ? "Profit" : "Loss"}: {fmt(Math.abs(gain))}</div>
            </div>

            <div style={s.resultRow}>
              <span style={{ fontSize: 13, color: "#57534E" }}>Initial Investment</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1C1917" }}>{fmt(inv)}</span>
            </div>
            <div style={s.resultRow}>
              <span style={{ fontSize: 13, color: "#57534E" }}>Final Value</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1C1917" }}>{fmt(ret)}</span>
            </div>
            <div style={s.resultRow}>
              <span style={{ fontSize: 13, color: "#57534E" }}>Net {isProfit ? "Profit" : "Loss"}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: isProfit ? "#0D9488" : "#EF4444" }}>{isProfit ? "+" : ""}{fmt(gain)}</span>
            </div>
            {mode === "annualized" && (
              <>
                <div style={s.resultRow}>
                  <span style={{ fontSize: 13, color: "#57534E" }}>Simple ROI</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1C1917" }}>{roi.toFixed(2)}%</span>
                </div>
                <div style={{ ...s.resultRow, borderBottom: "none" }}>
                  <span style={{ fontSize: 13, color: "#57534E" }}>Period</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1C1917" }}>{yrs} year{yrs !== 1 ? "s" : ""}</span>
                </div>
              </>
            )}
            {mode === "basic" && (
              <div style={{ ...s.resultRow, borderBottom: "none" }}>
                <span style={{ fontSize: 13, color: "#57534E" }}>Multiplier</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#1C1917" }}>{(ret / inv).toFixed(2)}×</span>
              </div>
            )}

            {inv > 0 && (
              <div style={{ marginTop: 12, height: 10, borderRadius: 5, background: "#E7E5E4", overflow: "hidden", position: "relative" as const }}>
                <div style={{ position: "absolute" as const, left: 0, top: 0, height: "100%", width: Math.min((inv / Math.max(inv, ret)) * 100, 100) + "%", background: "#6366F1", borderRadius: 5 }} />
                <div style={{ position: "absolute" as const, left: 0, top: 0, height: "100%", width: "100%", background: isProfit ? "#0D9488" : "#EF4444", borderRadius: 5, opacity: 0.3 }} />
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>ROI (Return on Investment) measures how profitable an investment is relative to its cost. A positive ROI means the investment made money; a negative ROI means it lost money. This tool calculates both simple ROI and annualized ROI for multi-year investments.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Annualized ROI uses compound annual growth rate (CAGR) to normalize returns over different time periods, making it easier to compare investments of different durations.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "What is a good ROI?", a: "It depends on the context. The S&P 500 historically returns about 10% per year. Real estate averages 8-12%. A good ROI should at minimum beat inflation (2-4%) and ideally exceed what you could earn with a low-risk alternative." },
          { q: "What is the difference between ROI and annualized ROI?", a: "Simple ROI shows total return regardless of time. Annualized ROI normalizes it to a yearly rate using CAGR, so you can compare a 2-year investment with a 5-year one on equal footing." },
          { q: "How do I calculate ROI?", a: "ROI = ((Final Value − Initial Investment) ÷ Initial Investment) × 100. For example, invest $10,000 and get back $13,000: ROI = (3,000 ÷ 10,000) × 100 = 30%." },
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
