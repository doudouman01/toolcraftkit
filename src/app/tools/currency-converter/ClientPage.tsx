"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

const RATES: Record<string, { name: string; symbol: string; rate: number }> = {
  USD: { name: "US Dollar", symbol: "$", rate: 1 },
  EUR: { name: "Euro", symbol: "€", rate: 0.92 },
  GBP: { name: "British Pound", symbol: "£", rate: 0.79 },
  CAD: { name: "Canadian Dollar", symbol: "C$", rate: 1.36 },
  AUD: { name: "Australian Dollar", symbol: "A$", rate: 1.53 },
  JPY: { name: "Japanese Yen", symbol: "¥", rate: 149.5 },
  CHF: { name: "Swiss Franc", symbol: "Fr", rate: 0.88 },
  CNY: { name: "Chinese Yuan", symbol: "¥", rate: 7.24 },
  INR: { name: "Indian Rupee", symbol: "₹", rate: 83.5 },
  BRL: { name: "Brazilian Real", symbol: "R$", rate: 4.97 },
  MXN: { name: "Mexican Peso", symbol: "MX$", rate: 17.2 },
  KRW: { name: "South Korean Won", symbol: "₩", rate: 1320 },
  SEK: { name: "Swedish Krona", symbol: "kr", rate: 10.5 },
  NOK: { name: "Norwegian Krone", symbol: "kr", rate: 10.8 },
  DKK: { name: "Danish Krone", symbol: "kr", rate: 6.87 },
  NZD: { name: "New Zealand Dollar", symbol: "NZ$", rate: 1.67 },
  SGD: { name: "Singapore Dollar", symbol: "S$", rate: 1.34 },
  HKD: { name: "Hong Kong Dollar", symbol: "HK$", rate: 7.82 },
  ZAR: { name: "South African Rand", symbol: "R", rate: 18.6 },
  TRY: { name: "Turkish Lira", symbol: "₺", rate: 28.9 },
  PLN: { name: "Polish Zloty", symbol: "zł", rate: 4.05 },
  THB: { name: "Thai Baht", symbol: "฿", rate: 35.4 },
  IDR: { name: "Indonesian Rupiah", symbol: "Rp", rate: 15600 },
  MYR: { name: "Malaysian Ringgit", symbol: "RM", rate: 4.72 },
  PHP: { name: "Philippine Peso", symbol: "₱", rate: 56.2 },
  TWD: { name: "Taiwan Dollar", symbol: "NT$", rate: 31.8 },
  CZK: { name: "Czech Koruna", symbol: "Kč", rate: 22.8 },
  HUF: { name: "Hungarian Forint", symbol: "Ft", rate: 356 },
  ILS: { name: "Israeli Shekel", symbol: "₪", rate: 3.68 },
  AED: { name: "UAE Dirham", symbol: "AED", rate: 3.67 },
  SAR: { name: "Saudi Riyal", symbol: "SAR", rate: 3.75 },
  CLP: { name: "Chilean Peso", symbol: "CLP$", rate: 890 },
  COP: { name: "Colombian Peso", symbol: "COL$", rate: 3950 },
  ARS: { name: "Argentine Peso", symbol: "ARS$", rate: 350 },
  EGP: { name: "Egyptian Pound", symbol: "E£", rate: 30.9 },
};

const codes = Object.keys(RATES);

function convert(amount: number, from: string, to: string): number {
  const usd = amount / RATES[from].rate;
  return usd * RATES[to].rate;
}

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const num = parseFloat(amount) || 0;
  const result = convert(num, from, to);
  const rate = convert(1, from, to);
  const inverseRate = convert(1, to, from);

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700 as const, color: "#1C1917", marginBottom: 4 },
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 },
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
    label: { fontSize: 13, fontWeight: 600 as const, color: "#1C1917", marginBottom: 6, display: "block" as const },
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const },
    select: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", background: "#fff", boxSizing: "border-box" as const },
    resultCard: { background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 10, padding: 20, marginTop: 16, textAlign: "center" as const },
    big: { fontSize: 32, fontWeight: 700 as const, color: "#0D9488" },
    swapBtn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer", marginTop: 8 },
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Currency Converter" description="Convert between 30+ major world currencies with approximate exchange rates." slug="currency-converter" category="Converter Tools" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Currency Converter", url: "https://toolcraftkit.com/tools/currency-converter" }]} />
      <h1 style={s.h1}>{t(`tools./tools/currency-converter.name`) !== `tools./tools/currency-converter.name` ? t(`tools./tools/currency-converter.name`) : "Currency Converter"}</h1>
      <p style={s.sub}>{t(`tools./tools/currency-converter.desc`) !== `tools./tools/currency-converter.desc` ? t(`tools./tools/currency-converter.desc`) : "Convert between 30+ major world currencies instantly."}</p>

      <div style={s.card}>
        <div style={{ marginBottom: 14 }}>
          <label style={s.label}>{toolUI.amount}</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} min="0" step="any" style={s.input} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "end", marginBottom: 14 }}>
          <div>
            <label style={s.label}>{toolUI.from}</label>
            <select value={from} onChange={e => setFrom(e.target.value)} style={s.select}>
              {codes.map(c => <option key={c} value={c}>{c} — {RATES[c].name}</option>)}
            </select>
          </div>
          <button onClick={() => { setFrom(to); setTo(from); }} style={s.swapBtn} title="Swap currencies">&#8644;</button>
          <div>
            <label style={s.label}>{toolUI.to}</label>
            <select value={to} onChange={e => setTo(e.target.value)} style={s.select}>
              {codes.map(c => <option key={c} value={c}>{c} — {RATES[c].name}</option>)}
            </select>
          </div>
        </div>

        {num > 0 && (
          <div style={s.resultCard}>
            <div style={{ fontSize: 14, color: "#57534E", marginBottom: 6 }}>
              {num.toFixed(2)} {from} ({RATES[from].symbol}) =
            </div>
            <div style={s.big}>{result.toFixed(2)} {to}</div>
            <div style={{ marginTop: 16, fontSize: 13, color: "#78716C", display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
              <span>1 {from} = {rate.toFixed(4)} {to}</span>
              <span>1 {to} = {inverseRate.toFixed(4)} {from}</span>
            </div>
            <div style={{ marginTop: 12, fontSize: 11, color: "#A8A29E" }}>Approximate rates for reference only. Not for financial transactions.</div>
          </div>
        )}
      </div>
      <SeoContent />
    </div>
  );
}
