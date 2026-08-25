"use client";
import { useState } from "react";

export default function Page() {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState(18);
  const [customTip, setCustomTip] = useState("");
  const [split, setSplit] = useState(1);

  const billAmt = parseFloat(bill) || 0;
  const pct = customTip ? parseFloat(customTip) || 0 : tipPct;
  const tipAmt = billAmt * (pct / 100);
  const total = billAmt + tipAmt;
  const perPerson = split > 0 ? total / split : total;
  const tipPerPerson = split > 0 ? tipAmt / split : tipAmt;

  const presets = [10, 15, 18, 20, 25, 30];

  const fmt = (n: number) => "$" + n.toFixed(2);

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    resultCard: { background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 10, padding: 20, marginTop: 16 } as const,
    big: { fontSize: 36, fontWeight: 700, color: "#0D9488" } as const,
    stat: { textAlign: "center" as const, padding: "12px 16px", flex: 1, minWidth: 100 },
    resultRow: { display: "flex" as const, justifyContent: "space-between" as const, padding: "10px 0", borderBottom: "1px solid #E0F2F1" },
  };

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Tip Calculator</h1>
      <p style={s.sub}>Calculate the tip and split the bill between friends.</p>

      <div style={s.card}>
        <div style={{ marginBottom: 14 }}>
          <label style={s.label}>Bill Amount ($)</label>
          <input type="number" value={bill} onChange={(e) => setBill(e.target.value)} placeholder="85.50" style={{ ...s.input, fontSize: 18 }} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={s.label}>Tip Percentage</label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {presets.map((p) => (
              <button key={p} onClick={() => { setTipPct(p); setCustomTip(""); }} style={{ ...s.btnSm, minWidth: 50, background: !customTip && tipPct === p ? "#0D9488" : "#F5F5F4", color: !customTip && tipPct === p ? "#fff" : "#1C1917", border: !customTip && tipPct === p ? "1px solid #0D9488" : "1px solid #E7E5E4", fontWeight: 600 }}>{p}%</button>
            ))}
            <input type="number" value={customTip} onChange={(e) => setCustomTip(e.target.value)} placeholder="Custom %" style={{ ...s.input, width: 90, textAlign: "center" }} />
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={s.label}>Split Between</label>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button key={n} onClick={() => setSplit(n)} style={{ ...s.btnSm, minWidth: 40, background: split === n ? "#6366F1" : "#F5F5F4", color: split === n ? "#fff" : "#1C1917", border: split === n ? "1px solid #6366F1" : "1px solid #E7E5E4", fontWeight: 600 }}>{n}</button>
            ))}
            <input type="number" value={split > 6 ? split : ""} onChange={(e) => setSplit(parseInt(e.target.value) || 1)} placeholder="More" min="1" style={{ ...s.input, width: 70, textAlign: "center" }} />
            <span style={{ fontSize: 13, color: "#78716C" }}>people</span>
          </div>
        </div>

        {billAmt > 0 && (
          <div style={s.resultCard}>
            {split > 1 ? (
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: "#57534E", marginBottom: 4 }}>Each Person Pays</div>
                <div style={s.big}>{fmt(perPerson)}</div>
                <div style={{ fontSize: 13, color: "#78716C", marginTop: 4 }}>({fmt(tipPerPerson)} tip each)</div>
              </div>
            ) : (
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: "#57534E", marginBottom: 4 }}>Total with Tip</div>
                <div style={s.big}>{fmt(total)}</div>
              </div>
            )}

            <div style={s.resultRow}><span style={{ fontSize: 14, color: "#57534E" }}>Bill</span><span style={{ fontSize: 14, fontWeight: 600 }}>{fmt(billAmt)}</span></div>
            <div style={s.resultRow}><span style={{ fontSize: 14, color: "#57534E" }}>Tip ({pct}%)</span><span style={{ fontSize: 14, fontWeight: 600, color: "#0D9488" }}>+{fmt(tipAmt)}</span></div>
            <div style={{ ...s.resultRow, fontWeight: 700, borderBottom: "none" }}><span style={{ fontSize: 14 }}>Total</span><span style={{ fontSize: 14 }}>{fmt(total)}</span></div>
            {split > 1 && (
              <div style={{ fontSize: 12, color: "#78716C", textAlign: "center", marginTop: 8 }}>Split {split} ways: {fmt(perPerson)} each</div>
            )}

            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>Quick Comparison</div>
              <div style={{ display: "flex", gap: 0, borderRadius: 8, overflow: "hidden", border: "1px solid #E7E5E4" }}>
                {presets.map((p, i) => {
                  const tip = billAmt * (p / 100);
                  const tot = billAmt + tip;
                  return (
                    <div key={p} style={{ flex: 1, padding: "10px 4px", textAlign: "center", borderRight: i < presets.length - 1 ? "1px solid #E7E5E4" : "none", background: p === pct ? "#F0FDFA" : "#FAFAF9" }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: p === pct ? "#0D9488" : "#78716C" }}>{p}%</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1917", marginTop: 2 }}>{fmt(tip)}</div>
                      <div style={{ fontSize: 11, color: "#A8A29E" }}>{fmt(tot)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>Quickly calculate the tip amount and total bill. Compare different tip percentages side by side, enter a custom percentage, and split the bill evenly between any number of people. The quick comparison table shows how different tip levels affect your total.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Everything runs locally in your browser. Nothing is stored or sent anywhere.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "How much should I tip?", a: "In the US and Canada, 15-20% is standard for sit-down restaurants. 18-20% is considered good service. For exceptional service, 25%+ is appropriate. For takeout, 10-15% is common but not required." },
          { q: "Do I tip before or after tax?", a: "Traditionally, tips are calculated on the pre-tax amount. However, many people simply tip on the total bill for convenience. The difference is usually small." },
          { q: "Is tipping expected everywhere?", a: "Tipping norms vary by country. In the US and Canada, tipping is expected at restaurants, bars, and for many services. In Europe, service is often included. In Japan, tipping can be considered rude. Always research local customs when traveling." },
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
