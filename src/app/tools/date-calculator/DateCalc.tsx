"use client";
import { useState } from "react";

/* ─── BRAND TOKENS ─── */
const LIGHT = {
  primary: "#0D9488", primaryLight: "#14B8A6",
  bg: "#FAFAF9", surface: "#FFFFFF", surfaceAlt: "#F5F5F4",
  border: "#E7E5E4", text: "#1C1917", textMuted: "#78716C", textLight: "#A8A29E",
  resultBg: "#F0FDFA", resultBorder: "#99F6E4",
  inputBg: "#FFFFFF", shadow: "0 1px 3px rgba(0,0,0,0.06)",
};
const DARK = {
  primary: "#2DD4BF", primaryLight: "#5EEAD4",
  bg: "#0C0A09", surface: "#1C1917", surfaceAlt: "#292524",
  border: "#3F3F46", text: "#FAFAF9", textMuted: "#A8A29E", textLight: "#78716C",
  resultBg: "#0D2D2A", resultBorder: "#115E59",
  inputBg: "#292524", shadow: "0 1px 3px rgba(0,0,0,0.3)",
};

type Tab = "between" | "addsubtract" | "dayofweek";

/* ─── HELPERS ─── */
function daysBetween(a: Date, b: Date): number {
  const ms = Math.abs(b.getTime() - a.getTime());
  return Math.round(ms / 86400000);
}

function businessDaysBetween(start: Date, end: Date): number {
  let s = new Date(Math.min(start.getTime(), end.getTime()));
  const e = new Date(Math.max(start.getTime(), end.getTime()));
  let count = 0;
  while (s < e) {
    s.setDate(s.getDate() + 1);
    const dow = s.getDay();
    if (dow !== 0 && dow !== 6) count++;
  }
  return count;
}

function fullDiff(a: Date, b: Date) {
  const start = a < b ? a : b;
  const end = a < b ? b : a;
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  if (days < 0) {
    months--;
    const prev = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prev.getDate();
  }
  if (months < 0) { years--; months += 12; }
  const totalDays = daysBetween(start, end);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  return { years, months, days, totalDays, totalWeeks, totalMonths };
}

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

/* ─── SUB-COMPONENTS ─── */
function FAQItem({ q, a, theme }: { q: string; a: string; theme: typeof LIGHT }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${theme.border}`, padding: "13px 0" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: 0, textAlign: "left",
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, lineHeight: 1.4, paddingRight: 16 }}>{q}</span>
        <span style={{
          fontSize: 18, color: theme.textMuted, flexShrink: 0,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease", lineHeight: 1,
        }}>+</span>
      </button>
      {open && <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.65, marginTop: 10, marginBottom: 0, paddingRight: 30 }}>{a}</p>}
    </div>
  );
}

function SeoContent({ theme }: { theme: typeof LIGHT }) {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>How to Calculate Days Between Two Dates</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>Enter a start date and an end date to instantly see the difference in days, weeks, months, and years. The calculator also shows business days (weekdays only), which is essential for project timelines, contract deadlines, and payroll calculations.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>Adding and Subtracting Days</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>Need to know the date 90 days from now? Or 30 days before a deadline? The add/subtract feature handles date arithmetic across month boundaries and leap years. Common uses include calculating warranty expiration dates, notice periods, payment due dates, and delivery windows.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Project management and deadline tracking</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Calculating business days for contracts and SLAs</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Rental and lease period calculations</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Warranty and return window deadlines</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Payroll and billing cycle planning</li>
      </ul>
      <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: theme.primary, marginBottom: "4px" }}>Related Tool</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: theme.textMuted, margin: 0 }}>
          Need to calculate someone&apos;s exact age? Try our <a href="/tools/age-calculator" style={{ color: theme.primary }}>Age Calculator</a> for precise age breakdowns in years, months, and days.
        </p>
      </div>
    </section>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function DateCalc() {
  const [dark] = useState(false);
  const theme = dark ? DARK : LIGHT;
  const [tab, setTab] = useState<Tab>("between");

  // Tab 1: Between
  const [startStr, setStartStr] = useState("");
  const [endStr, setEndStr] = useState("");

  // Tab 2: Add/Subtract
  const [baseStr, setBaseStr] = useState("");
  const [numDays, setNumDays] = useState("");
  const [operation, setOperation] = useState<"add" | "subtract">("add");

  // Tab 3: Day of week
  const [lookupStr, setLookupStr] = useState("");

  // Calculations
  const startDate = startStr ? new Date(startStr + "T00:00:00") : null;
  const endDate = endStr ? new Date(endStr + "T00:00:00") : null;
  const betweenResult = startDate && endDate && !isNaN(startDate.getTime()) && !isNaN(endDate.getTime())
    ? { ...fullDiff(startDate, endDate), businessDays: businessDaysBetween(startDate, endDate) }
    : null;

  const baseDate = baseStr ? new Date(baseStr + "T00:00:00") : null;
  const parsedDays = numDays ? parseInt(numDays, 10) : null;
  const addSubResult = baseDate && parsedDays !== null && !isNaN(baseDate.getTime()) && !isNaN(parsedDays)
    ? addDays(baseDate, operation === "add" ? parsedDays : -parsedDays)
    : null;

  const lookupDate = lookupStr ? new Date(lookupStr + "T00:00:00") : null;
  const lookupResult = lookupDate && !isNaN(lookupDate.getTime()) ? {
    dayName: lookupDate.toLocaleDateString("en-US", { weekday: "long" }),
    formatted: formatDate(lookupDate),
    dayOfYear: Math.ceil((lookupDate.getTime() - new Date(lookupDate.getFullYear(), 0, 0).getTime()) / 86400000),
    weekNumber: Math.ceil(((lookupDate.getTime() - new Date(lookupDate.getFullYear(), 0, 1).getTime()) / 86400000 + new Date(lookupDate.getFullYear(), 0, 1).getDay() + 1) / 7),
    isLeapYear: (lookupDate.getFullYear() % 4 === 0 && lookupDate.getFullYear() % 100 !== 0) || lookupDate.getFullYear() % 400 === 0,
    isWeekend: lookupDate.getDay() === 0 || lookupDate.getDay() === 6,
  } : null;

  const tabs: { key: Tab; label: string }[] = [
    { key: "between", label: "Days Between" },
    { key: "addsubtract", label: "Add/Subtract Days" },
    { key: "dayofweek", label: "Day of the Week" },
  ];

  const inputStyle = {
    width: "100%", padding: "10px 12px", fontSize: 15, borderRadius: 8,
    border: `1.5px solid ${theme.border}`, background: theme.inputBg,
    color: theme.text, outline: "none", fontWeight: 500 as const,
    fontVariantNumeric: "tabular-nums" as const,
  };

  const statBox = (val: string, label: string) => (
    <div style={{
      textAlign: "center" as const, padding: "12px 14px",
      background: theme.surface, borderRadius: 8,
      border: `1px solid ${theme.border}`, minWidth: 100, flex: "1 1 100px",
    }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: theme.primary }}>{val}</div>
      <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>{label}</div>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh", background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <main style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px 60px" }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 12, color: theme.textLight, marginBottom: 14, display: "flex", gap: 6, alignItems: "center" }}>
          <a href="/" style={{ color: theme.textMuted, textDecoration: "none" }}>Home</a><span>›</span>
          <a href="/#business-tools" style={{ color: theme.textMuted, textDecoration: "none" }}>Business Tools</a><span>›</span>
          <span style={{ color: theme.primary, fontWeight: 500 }}>Date Calculator</span>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.03em" }}>Date Calculator</h1>
          <p style={{ fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5 }}>
            Calculate days between dates, add or subtract days, and find the day of the week for any date.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: "8px 18px", borderRadius: 8, fontSize: 14, fontWeight: 600,
              border: `1.5px solid ${tab === t.key ? theme.primary : theme.border}`,
              background: tab === t.key ? theme.primary : theme.surface,
              color: tab === t.key ? "#fff" : theme.textMuted,
              cursor: "pointer", transition: "all 0.2s",
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ─── TAB 1: DAYS BETWEEN ─── */}
        {tab === "between" && (
          <div style={{
            background: theme.surface, borderRadius: 12, padding: 24,
            border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 6, display: "block" }}>Start Date</label>
                <input type="date" value={startStr} onChange={e => setStartStr(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 6, display: "block" }}>End Date</label>
                <input type="date" value={endStr} onChange={e => setEndStr(e.target.value)} style={inputStyle} />
              </div>
            </div>

            {betweenResult && (
              <div style={{
                background: theme.resultBg, border: `1px solid ${theme.resultBorder}`,
                borderRadius: 10, padding: 20, marginTop: 20,
              }}>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 4 }}>Difference</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: theme.primary }}>
                    {betweenResult.totalDays.toLocaleString()}{" "}
                    <span style={{ fontSize: 16, color: theme.textMuted, fontWeight: 400 }}>days</span>
                  </div>
                  {betweenResult.years > 0 && (
                    <div style={{ fontSize: 15, color: theme.text, marginTop: 6 }}>
                      {betweenResult.years} {betweenResult.years === 1 ? "year" : "years"}, {betweenResult.months} {betweenResult.months === 1 ? "month" : "months"}, {betweenResult.days} {betweenResult.days === 1 ? "day" : "days"}
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                  {statBox(betweenResult.totalWeeks.toLocaleString(), "Weeks")}
                  {statBox(betweenResult.totalMonths.toLocaleString(), "Months")}
                  {statBox(betweenResult.businessDays.toLocaleString(), "Business Days")}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 2: ADD/SUBTRACT ─── */}
        {tab === "addsubtract" && (
          <div style={{
            background: theme.surface, borderRadius: 12, padding: 24,
            border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 6, display: "block" }}>Starting Date</label>
                <input type="date" value={baseStr} onChange={e => setBaseStr(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 0 }}>
                {(["add", "subtract"] as const).map(op => (
                  <button key={op} onClick={() => setOperation(op)} style={{
                    padding: "8px 18px", borderRadius: 8, fontSize: 14, fontWeight: 600,
                    border: `1.5px solid ${operation === op ? theme.primary : theme.border}`,
                    background: operation === op ? theme.primary : theme.surface,
                    color: operation === op ? "#fff" : theme.textMuted,
                    cursor: "pointer", transition: "all 0.2s",
                  }}>
                    {op === "add" ? "+ Add" : "- Subtract"}
                  </button>
                ))}
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 6, display: "block" }}>Number of Days</label>
                <input type="number" min="0" value={numDays} onChange={e => setNumDays(e.target.value)}
                  placeholder="e.g. 90" style={inputStyle} />
              </div>
            </div>

            {addSubResult && (
              <div style={{
                background: theme.resultBg, border: `1px solid ${theme.resultBorder}`,
                borderRadius: 10, padding: 20, marginTop: 20, textAlign: "center",
              }}>
                <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 4 }}>
                  {operation === "add" ? "Date after adding" : "Date after subtracting"} {parsedDays} {parsedDays === 1 ? "day" : "days"}
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: theme.primary, marginBottom: 4 }}>
                  {formatDate(addSubResult)}
                </div>
                <div style={{ fontSize: 13, color: theme.textMuted }}>
                  {addSubResult.toISOString().split("T")[0]}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 3: DAY OF THE WEEK ─── */}
        {tab === "dayofweek" && (
          <div style={{
            background: theme.surface, borderRadius: 12, padding: 24,
            border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
          }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 6, display: "block" }}>Enter a Date</label>
              <input type="date" value={lookupStr} onChange={e => setLookupStr(e.target.value)} style={inputStyle} />
            </div>

            {lookupResult && (
              <div style={{
                background: theme.resultBg, border: `1px solid ${theme.resultBorder}`,
                borderRadius: 10, padding: 20, marginTop: 20, textAlign: "center",
              }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: theme.primary, marginBottom: 4 }}>
                  {lookupResult.dayName}
                </div>
                <div style={{ fontSize: 14, color: theme.text, marginBottom: 16 }}>
                  {lookupResult.formatted}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                  {statBox(String(lookupResult.dayOfYear), "Day of Year")}
                  {statBox(String(lookupResult.weekNumber), "Week Number")}
                  {statBox(lookupResult.isLeapYear ? "Yes" : "No", "Leap Year")}
                  {statBox(lookupResult.isWeekend ? "Weekend" : "Weekday", "Type")}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FAQ */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: 24,
          border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: theme.text }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme} q="How are business days calculated?" a="Business days count only weekdays (Monday through Friday), excluding Saturdays and Sundays. This is useful for contracts, shipping estimates, and work deadlines. Public holidays are not excluded since they vary by country and region." />
          <FAQItem theme={theme} q="Does the calculator handle leap years?" a="Yes. The calculator correctly accounts for leap years (every 4 years, except centuries not divisible by 400). February 29 is included in all calculations when applicable, ensuring accurate day counts across any date range." />
          <FAQItem theme={theme} q="Can I calculate dates in the past?" a="Absolutely. You can enter any valid date, past or future. This is useful for finding out what day of the week a historical event fell on, or how many days have passed since a specific date." />
          <FAQItem theme={theme} q="What is the difference between calendar days and business days?" a="Calendar days include every day (weekdays, weekends, holidays). Business days include only Monday through Friday. For example, a 14-calendar-day period contains only 10 business days. Contracts and legal deadlines often specify which type applies." />
        </div>

        <SeoContent theme={theme} />
      </main>
    </div>
  );
}
