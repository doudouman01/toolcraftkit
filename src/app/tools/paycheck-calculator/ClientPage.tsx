"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

const BRACKETS_2026 = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

function calcFederalTax(annual: number): number {
  let tax = 0;
  for (const b of BRACKETS_2026) {
    if (annual <= b.min) break;
    const taxable = Math.min(annual, b.max) - b.min;
    tax += taxable * b.rate;
  }
  return tax;
}

const FREQ: Record<string, { label: string; periods: number }> = {
  weekly: { label: "Weekly", periods: 52 },
  biweekly: { label: "Bi-Weekly", periods: 26 },
  semimonthly: { label: "Semi-Monthly", periods: 24 },
  monthly: { label: "Monthly", periods: 12 },
};

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [mode, setMode] = useState<"salary" | "hourly">("salary");
  const [salary, setSalary] = useState("60000");
  const [hourly, setHourly] = useState("30");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [freq, setFreq] = useState("biweekly");
  const [stateTaxRate, setStateTaxRate] = useState("5");

  const annual = mode === "salary" ? (parseFloat(salary) || 0) : (parseFloat(hourly) || 0) * (parseFloat(hoursPerWeek) || 40) * 52;
  const periods = FREQ[freq].periods;
  const grossPerPeriod = annual / periods;

  const federalTaxAnnual = calcFederalTax(annual);
  const ssAnnual = Math.min(annual, 168600) * 0.062;
  const medicareAnnual = annual * 0.0145;
  const stateTaxAnnual = annual * ((parseFloat(stateTaxRate) || 0) / 100);

  const federalPerPeriod = federalTaxAnnual / periods;
  const ssPerPeriod = ssAnnual / periods;
  const medicarePerPeriod = medicareAnnual / periods;
  const statePerPeriod = stateTaxAnnual / periods;
  const totalDeductions = federalPerPeriod + ssPerPeriod + medicarePerPeriod + statePerPeriod;
  const netPay = grossPerPeriod - totalDeductions;

  const fmt = (n: number) => "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const pct = (n: number) => annual > 0 ? ((n / grossPerPeriod) * 100).toFixed(1) + "%" : "0%";

  const deductions = [
    { label: "Federal Tax", amount: federalPerPeriod, color: "#EF4444" },
    { label: "Social Security", amount: ssPerPeriod, color: "#F59E0B" },
    { label: "Medicare", amount: medicarePerPeriod, color: "#8B5CF6" },
    { label: "State Tax", amount: statePerPeriod, color: "#3B82F6" },
  ];

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700 as const, color: "#1C1917", marginBottom: 4 },
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 },
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
    label: { fontSize: 13, fontWeight: 600 as const, color: "#1C1917", marginBottom: 6, display: "block" as const },
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const },
    select: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", background: "#fff", boxSizing: "border-box" as const },
    resultCard: { background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 10, padding: 20, marginTop: 16 },
    btnSm: (active: boolean) => ({ background: active ? "#0D9488" : "#F5F5F4", color: active ? "#fff" : "#1C1917", border: active ? "1px solid #0D9488" : "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" as const, fontWeight: 600 as const }),
    row: { display: "flex" as const, gap: 8, marginBottom: 14, flexWrap: "wrap" as const },
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Paycheck Calculator" description="Estimate take-home pay after federal tax, state tax, Social Security, and Medicare deductions." slug="paycheck-calculator" category="Business Tools" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Paycheck Calculator", url: "https://toolcraftkit.com/tools/paycheck-calculator" }]} />
      <h1 style={s.h1}>{t(`tools./tools/paycheck-calculator.name`) !== `tools./tools/paycheck-calculator.name` ? t(`tools./tools/paycheck-calculator.name`) : "Paycheck Calculator"}</h1>
      <p style={s.sub}>{t(`tools./tools/paycheck-calculator.desc`) !== `tools./tools/paycheck-calculator.desc` ? t(`tools./tools/paycheck-calculator.desc`) : "Estimate your take-home pay after taxes and deductions."}</p>

      <div style={s.card}>
        <div style={s.row}>
          {(["salary", "hourly"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} style={s.btnSm(mode === m)}>{m === "salary" ? "Annual Salary" : "Hourly Rate"}</button>
          ))}
        </div>

        {mode === "salary" ? (
          <div style={{ marginBottom: 14 }}>
            <label style={s.label}>Annual Salary ($)</label>
            <input type="number" value={salary} onChange={e => setSalary(e.target.value)} min="0" style={s.input} />
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={s.label}>Hourly Rate ($)</label>
              <input type="number" value={hourly} onChange={e => setHourly(e.target.value)} min="0" style={s.input} />
            </div>
            <div>
              <label style={s.label}>Hours / Week</label>
              <input type="number" value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)} min="1" max="80" style={s.input} />
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div>
            <label style={s.label}>Pay Frequency</label>
            <select value={freq} onChange={e => setFreq(e.target.value)} style={s.select}>
              {Object.entries(FREQ).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <div>
            <label style={s.label}>State Tax Rate (%)</label>
            <input type="number" value={stateTaxRate} onChange={e => setStateTaxRate(e.target.value)} min="0" max="15" step="0.1" style={s.input} />
          </div>
        </div>

        {annual > 0 && (
          <div style={s.resultCard}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: "#57534E" }}>Net Take-Home Pay ({FREQ[freq].label})</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#0D9488" }}>{fmt(netPay)}</div>
              <div style={{ fontSize: 13, color: "#78716C" }}>Gross: {fmt(grossPerPeriod)} / period &middot; {fmt(annual)} / year</div>
            </div>

            {/* Visual bar */}
            <div style={{ background: "#E7E5E4", borderRadius: 6, height: 28, overflow: "hidden", display: "flex", marginBottom: 16 }}>
              {deductions.map(d => {
                const w = grossPerPeriod > 0 ? (d.amount / grossPerPeriod) * 100 : 0;
                return w > 0 ? <div key={d.label} style={{ width: w + "%", background: d.color, height: "100%" }} title={d.label + ": " + fmt(d.amount)} /> : null;
              })}
              <div style={{ flex: 1, background: "#0D9488", height: "100%" }} title={"Net: " + fmt(netPay)} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {deductions.map(d => (
                <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, color: "#78716C" }}>{d.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1C1917" }}>{fmt(d.amount)} <span style={{ fontSize: 11, color: "#A8A29E" }}>{pct(d.amount)}</span></div>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: "#0D9488", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, color: "#78716C" }}>Net Pay</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0D9488" }}>{fmt(netPay)} <span style={{ fontSize: 11, color: "#A8A29E" }}>{pct(netPay)}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <SeoContent />
    </div>
  );
}
