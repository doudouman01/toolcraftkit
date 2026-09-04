"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";

export default function Page() {
  const [mode, setMode] = useState<"annual" | "hourly">("annual");
  const [salary, setSalary] = useState("75000");
  const [hourly, setHourly] = useState("35");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [vacationWeeks, setVacationWeeks] = useState("2");

  const h = parseFloat(hoursPerWeek) || 40;
  const w = parseFloat(weeksPerYear) || 52;
  const v = parseFloat(vacationWeeks) || 0;
  const workedWeeks = w - v;

  let annual = 0, hourlyRate = 0;
  if (mode === "annual") {
    annual = parseFloat(salary) || 0;
    hourlyRate = annual / (workedWeeks * h);
  } else {
    hourlyRate = parseFloat(hourly) || 0;
    annual = hourlyRate * workedWeeks * h;
  }

  const monthly = annual / 12;
  const biweekly = annual / 26;
  const weekly = annual / 52;
  const daily = annual / (workedWeeks * 5);
  const overtimeRate = hourlyRate * 1.5;
  const doubleTime = hourlyRate * 2;

  const fmt = (n: number) => "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    resultCard: { background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 10, padding: 20, marginTop: 16 } as const,
    resultRow: { display: "flex" as const, justifyContent: "space-between" as const, alignItems: "center" as const, padding: "10px 0", borderBottom: "1px solid #E0F2F1" },
    big: { fontSize: 36, fontWeight: 700, color: "#0D9488" } as const,
    stat: { textAlign: "center" as const, padding: "12px 16px", background: "#fff", borderRadius: 8, border: "1px solid #E7E5E4", flex: 1, minWidth: 100 },
  };

  return (
    <div style={s.page}>
      <ToolSchema
        name="Salary Calculator"
        description="Convert annual salary to hourly rate and back. Monthly, weekly, and daily breakdown."
        slug="salary-calculator"
        category="BusinessApplication"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Business Tools", url: "https://toolcraftkit.com/#business-tools" },
          { name: "Salary Calculator", url: "https://toolcraftkit.com/tools/salary-calculator" },
        ]}
      />
      <h1 style={s.h1}>Salary Calculator</h1>
      <p style={s.sub}>Convert between annual salary and hourly rate. See your pay per month, week, and day.</p>

      <div style={s.card}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {([["annual", "Annual → Hourly"], ["hourly", "Hourly → Annual"]] as const).map(([key, lbl]) => (
            <button key={key} onClick={() => setMode(key)} style={{ ...s.btnSm, background: mode === key ? "#0D9488" : "#F5F5F4", color: mode === key ? "#fff" : "#1C1917", border: mode === key ? "1px solid #0D9488" : "1px solid #E7E5E4" }}>{lbl}</button>
          ))}
        </div>

        {mode === "annual" ? (
          <div style={{ marginBottom: 14 }}>
            <label style={s.label}>Annual Salary ($)</label>
            <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} style={s.input} />
            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
              {[40000, 50000, 60000, 75000, 100000, 150000].map((n) => (
                <button key={n} onClick={() => setSalary(String(n))} style={{ ...s.btnSm, fontSize: 11, padding: "3px 6px" }}>${(n/1000)}K</button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: 14 }}>
            <label style={s.label}>Hourly Rate ($)</label>
            <input type="number" value={hourly} onChange={(e) => setHourly(e.target.value)} style={s.input} />
            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
              {[15, 20, 25, 30, 40, 50, 75, 100].map((n) => (
                <button key={n} onClick={() => setHourly(String(n))} style={{ ...s.btnSm, fontSize: 11, padding: "3px 6px" }}>${n}/h</button>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
          <div style={{ flex: 1, minWidth: 120 }}>
            <label style={s.label}>Hours per Week</label>
            <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} style={s.input} />
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <label style={s.label}>Weeks per Year</label>
            <input type="number" value={weeksPerYear} onChange={(e) => setWeeksPerYear(e.target.value)} style={s.input} />
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <label style={s.label}>Vacation Weeks</label>
            <input type="number" value={vacationWeeks} onChange={(e) => setVacationWeeks(e.target.value)} style={s.input} />
          </div>
        </div>

        {annual > 0 && (
          <div style={s.resultCard}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
              {[
                { label: "Annual", value: fmt(annual) },
                { label: "Monthly", value: fmt(monthly) },
                { label: "Bi-weekly", value: fmt(biweekly) },
                { label: "Weekly", value: fmt(weekly) },
                { label: "Daily", value: fmt(daily) },
                { label: "Hourly", value: fmt(hourlyRate) },
              ].map((item) => (
                <div key={item.label} style={s.stat}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#0D9488" }}>{item.value}</div>
                  <div style={{ fontSize: 11, color: "#78716C", marginTop: 2 }}>{item.label}</div>
                </div>
              ))}
            </div>

            <div style={s.resultRow}><span style={{ fontSize: 14, color: "#57534E" }}>Worked Hours/Year</span><span style={{ fontSize: 14, fontWeight: 600 }}>{(workedWeeks * h).toLocaleString()} hours</span></div>
            <div style={s.resultRow}><span style={{ fontSize: 14, color: "#57534E" }}>Overtime Rate (1.5×)</span><span style={{ fontSize: 14, fontWeight: 600, color: "#F59E0B" }}>{fmt(overtimeRate)}/hr</span></div>
            <div style={{ ...s.resultRow, borderBottom: "none" }}><span style={{ fontSize: 14, color: "#57534E" }}>Double Time (2×)</span><span style={{ fontSize: 14, fontWeight: 600, color: "#EF4444" }}>{fmt(doubleTime)}/hr</span></div>
          </div>
        )}
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>Convert between annual salary and hourly rate instantly. See your effective pay broken down into monthly, bi-weekly, weekly, daily, and hourly amounts. Adjust for vacation time, part-time hours, and different work schedules to see your true earning rate.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>This is a gross (before-tax) calculation. Your take-home pay will be lower after federal, state/provincial, and local taxes are deducted.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "How do I convert annual salary to hourly rate?", a: "Divide your annual salary by the number of working hours per year. For a standard 40-hour week with 50 working weeks (2 weeks vacation): $75,000 ÷ 2,000 = $37.50/hour." },
          { q: "What is a good salary?", a: "This varies enormously by location, industry, and experience. In the US, the median household income is roughly $75,000. In Canada, it is about $68,000 CAD. Cost of living in your area matters more than the raw number." },
          { q: "What is the difference between gross and net pay?", a: "Gross pay is your total salary before any deductions. Net pay (take-home pay) is what you actually receive after federal/provincial taxes, CPP/EI (Canada) or Social Security/Medicare (US), and any other deductions." },
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
