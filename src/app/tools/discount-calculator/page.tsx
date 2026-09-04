"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";

export default function Page() {
  const [mode, setMode] = useState<"pct" | "final" | "saved">("pct");
  const [original, setOriginal] = useState("");
  const [discount, setDiscount] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [tax, setTax] = useState("");

  const o = parseFloat(original) || 0;
  const d = parseFloat(discount) || 0;
  const f = parseFloat(finalPrice) || 0;
  const t = parseFloat(tax) || 0;

  let result = { discountPct: 0, discountAmt: 0, priceAfter: 0, priceWithTax: 0 };

  if (mode === "pct" && o > 0) {
    const amt = o * (d / 100);
    const after = o - amt;
    result = { discountPct: d, discountAmt: amt, priceAfter: after, priceWithTax: after * (1 + t / 100) };
  } else if (mode === "final" && o > 0 && f > 0) {
    const amt = o - f;
    const pct = (amt / o) * 100;
    result = { discountPct: pct, discountAmt: amt, priceAfter: f, priceWithTax: f * (1 + t / 100) };
  } else if (mode === "saved" && o > 0 && d > 0) {
    const pct = (d / o) * 100;
    const after = o - d;
    result = { discountPct: pct, discountAmt: d, priceAfter: after, priceWithTax: after * (1 + t / 100) };
  }

  const hasResult = (mode === "pct" && o > 0) || (mode === "final" && o > 0 && f > 0) || (mode === "saved" && o > 0 && d > 0);

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    row: { display: "flex" as const, alignItems: "center" as const, gap: 8, marginBottom: 14, flexWrap: "wrap" as const },
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none" } as const,
    resultCard: { background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 10, padding: 20, marginTop: 16 } as const,
    resultRow: { display: "flex" as const, justifyContent: "space-between" as const, alignItems: "center" as const, padding: "8px 0", borderBottom: "1px solid #E0F2F1" },
    big: { fontSize: 28, fontWeight: 700, color: "#0D9488" } as const,
  };

  const fmt = (n: number) => "$" + n.toFixed(2);

  const modes = [
    { key: "pct", label: "% Off" },
    { key: "final", label: "Find % from final price" },
    { key: "saved", label: "Find % from $ saved" },
  ] as const;

  return (
    <div style={s.page}>
      <ToolSchema
        name="Discount Calculator"
        description="Calculate sale prices, savings, and reverse-calculate discounts. Includes tax calculation."
        slug="discount-calculator"
        category="BusinessApplication"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Business Tools", url: "https://toolcraftkit.com/#business-tools" },
          { name: "Discount Calculator", url: "https://toolcraftkit.com/tools/discount-calculator" },
        ]}
      />
      <h1 style={s.h1}>Discount Calculator</h1>
      <p style={s.sub}>Calculate discounts, sale prices, and savings instantly.</p>

      <div style={s.card}>
        <div style={s.row}>
          {modes.map((m) => (
            <button key={m.key} onClick={() => setMode(m.key)} style={{ ...s.btnSm, background: mode === m.key ? "#0D9488" : "#F5F5F4", color: mode === m.key ? "#fff" : "#1C1917", border: mode === m.key ? "1px solid #0D9488" : "1px solid #E7E5E4" }}>{m.label}</button>
          ))}
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={s.label}>Original Price ($)</label>
          <input type="number" value={original} onChange={(e) => setOriginal(e.target.value)} placeholder="100.00" style={s.input} />
        </div>

        {mode === "pct" && (
          <div style={{ marginBottom: 14 }}>
            <label style={s.label}>Discount (%)</label>
            <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="20" style={s.input} />
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              {[5, 10, 15, 20, 25, 30, 40, 50, 75].map((p) => (
                <button key={p} onClick={() => setDiscount(String(p))} style={{ ...s.btnSm, fontSize: 12, padding: "4px 8px" }}>{p}%</button>
              ))}
            </div>
          </div>
        )}

        {mode === "final" && (
          <div style={{ marginBottom: 14 }}>
            <label style={s.label}>Final Price ($)</label>
            <input type="number" value={finalPrice} onChange={(e) => setFinalPrice(e.target.value)} placeholder="80.00" style={s.input} />
          </div>
        )}

        {mode === "saved" && (
          <div style={{ marginBottom: 14 }}>
            <label style={s.label}>Amount Saved ($)</label>
            <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="20.00" style={s.input} />
          </div>
        )}

        <div style={{ marginBottom: 14 }}>
          <label style={s.label}>Tax Rate (%) — optional</label>
          <input type="number" value={tax} onChange={(e) => setTax(e.target.value)} placeholder="0" style={s.input} />
        </div>

        {hasResult && (
          <div style={s.resultCard}>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: "#57534E", marginBottom: 4 }}>You Pay</div>
              <div style={s.big}>{fmt(result.priceAfter)}</div>
              {t > 0 && <div style={{ fontSize: 13, color: "#78716C", marginTop: 4 }}>With tax: {fmt(result.priceWithTax)}</div>}
            </div>
            <div style={s.resultRow}>
              <span style={{ fontSize: 13, color: "#57534E" }}>Original Price</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1C1917" }}>{fmt(o)}</span>
            </div>
            <div style={s.resultRow}>
              <span style={{ fontSize: 13, color: "#57534E" }}>Discount</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#EF4444" }}>−{fmt(result.discountAmt)} ({result.discountPct.toFixed(1)}%)</span>
            </div>
            <div style={{ ...s.resultRow, borderBottom: "none" }}>
              <span style={{ fontSize: 13, color: "#57534E" }}>You Save</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#0D9488" }}>{fmt(result.discountAmt)}</span>
            </div>
            {o > 0 && (
              <div style={{ marginTop: 12, height: 8, borderRadius: 4, background: "#E7E5E4", overflow: "hidden" }}>
                <div style={{ height: "100%", width: Math.min(result.discountPct, 100) + "%", background: "#0D9488", borderRadius: 4, transition: "width 0.3s" }} />
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>Use this discount calculator to quickly figure out the sale price and how much money you save. Three modes cover every scenario: enter a percentage to find the final price, enter the final price to find the discount percentage, or enter the dollar amount saved to reverse-calculate the percentage.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Optional tax rate lets you see the total cost after tax. Everything runs in your browser — no data is stored or sent anywhere.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "How do I calculate a percentage discount?", a: "Multiply the original price by the discount percentage divided by 100. Subtract that from the original price. For example, 20% off $50: $50 × 0.20 = $10 discount, so you pay $40." },
          { q: "Can I calculate double discounts?", a: "Apply the first discount, then use the result as the new original price for the second discount. A 20% + 10% discount is not the same as 30% off." },
          { q: "How does the tax calculation work?", a: "Tax is applied after the discount. So if a $100 item is 20% off, you pay $80 + tax. With 8% tax: $80 × 1.08 = $86.40." },
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
