"use client";
import { useState, useMemo } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

const PRESETS = [
  { label: "Every minute", cron: "* * * * *" },
  { label: "Every hour", cron: "0 * * * *" },
  { label: "Daily at midnight", cron: "0 0 * * *" },
  { label: "Daily at 9am", cron: "0 9 * * *" },
  { label: "Weekly (Sunday)", cron: "0 0 * * 0" },
  { label: "Monthly (1st)", cron: "0 0 1 * *" },
  { label: "Weekdays at 9am", cron: "0 9 * * 1-5" },
  { label: "Every 5 minutes", cron: "*/5 * * * *" },
  { label: "Every 30 minutes", cron: "*/30 * * * *" },
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function describeCron(minute: string, hour: string, dom: string, month: string, dow: string): string {
  const parts: string[] = [];
  if (minute === "*" && hour === "*") parts.push("Every minute");
  else if (minute.startsWith("*/")) parts.push(`Every ${minute.slice(2)} minutes`);
  else if (hour === "*") parts.push(`At minute ${minute} of every hour`);
  else if (minute === "0" && !hour.includes(",") && !hour.includes("-") && !hour.startsWith("*/")) parts.push(`At ${hour}:00`);
  else if (hour.startsWith("*/")) parts.push(`Every ${hour.slice(2)} hours at minute ${minute}`);
  else parts.push(`At ${hour}:${minute.padStart(2, "0")}`);

  if (dom !== "*" && dom !== "?") parts.push(`on day ${dom} of the month`);
  if (month !== "*") {
    const mNames = month.split(",").map(m => { const idx = parseInt(m); return idx >= 1 && idx <= 12 ? MONTHS[idx - 1] : m; }).join(", ");
    parts.push(`in ${mNames}`);
  }
  if (dow !== "*" && dow !== "?") {
    const dNames = dow.split(",").map(d => { const idx = parseInt(d); return idx >= 0 && idx <= 6 ? DAYS[idx] : d; }).join(", ");
    parts.push(`on ${dNames}`);
  }
  return parts.join(" ");
}

function getNextRuns(cron: string, count: number): Date[] {
  const [min, hr, dom, mon, dow] = cron.split(" ");
  const results: Date[] = [];
  const now = new Date();
  const check = new Date(now);
  check.setSeconds(0, 0);
  check.setMinutes(check.getMinutes() + 1);

  const matchField = (val: string, current: number, max: number): boolean => {
    if (val === "*" || val === "?") return true;
    if (val.startsWith("*/")) return current % parseInt(val.slice(2)) === 0;
    if (val.includes(",")) return val.split(",").map(Number).includes(current);
    if (val.includes("-")) { const [a, b] = val.split("-").map(Number); return current >= a && current <= b; }
    return parseInt(val) === current;
  };

  let iterations = 0;
  while (results.length < count && iterations < 525960) {
    iterations++;
    const m = check.getMinutes();
    const h = check.getHours();
    const d = check.getDate();
    const mo = check.getMonth() + 1;
    const wd = check.getDay();
    if (matchField(min, m, 59) && matchField(hr, h, 23) && matchField(dom, d, 31) && matchField(mon, mo, 12) && matchField(dow, wd, 6)) {
      results.push(new Date(check));
    }
    check.setMinutes(check.getMinutes() + 1);
  }
  return results;
}

export default function ClientPage() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dom, setDom] = useState("*");
  const [month, setMonth] = useState("*");
  const [dow, setDow] = useState("*");
  const [copied, setCopied] = useState(false);

  const cron = `${minute} ${hour} ${dom} ${month} ${dow}`;
  const description = useMemo(() => describeCron(minute, hour, dom, month, dow), [minute, hour, dom, month, dow]);
  const nextRuns = useMemo(() => getNextRuns(cron, 5), [cron]);

  const applyPreset = (preset: string) => {
    const [m, h, d, mo, dw] = preset.split(" ");
    setMinute(m); setHour(h); setDom(d); setMonth(mo); setDow(dw);
  };

  const copy = () => { navigator.clipboard.writeText(cron); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  const s = {
    page: { maxWidth: 760, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" as const },
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", fontFamily: "'Courier New', monospace" } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    fieldRow: { display: "grid" as const, gridTemplateColumns: "repeat(5, 1fr)" as const, gap: 10, marginBottom: 16 },
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Cron Expression Generator" description="Build cron expressions visually. See human-readable descriptions and next scheduled run times." slug="cron-expression-generator" category="WebApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Cron Expression Generator", url: "https://toolcraftkit.com/tools/cron-expression-generator" }]} />

      <h1 style={s.h1}>Cron Expression Generator</h1>
      <p style={s.sub}>Build cron schedules visually and see when they will run next.</p>

      {/* Presets */}
      <div style={s.card}>
        <label style={s.label}>Quick Presets</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => applyPreset(p.cron)} style={s.btnSm}>{p.label}</button>
          ))}
        </div>
      </div>

      {/* Fields */}
      <div style={s.card}>
        <label style={s.label}>Cron Fields</label>
        <div style={s.fieldRow}>
          <div>
            <div style={{ fontSize: 11, color: "#78716C", marginBottom: 4, textAlign: "center" as const }}>Minute</div>
            <input value={minute} onChange={(e) => setMinute(e.target.value)} style={{ ...s.input, textAlign: "center" as const }} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#78716C", marginBottom: 4, textAlign: "center" as const }}>Hour</div>
            <input value={hour} onChange={(e) => setHour(e.target.value)} style={{ ...s.input, textAlign: "center" as const }} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#78716C", marginBottom: 4, textAlign: "center" as const }}>Day (month)</div>
            <input value={dom} onChange={(e) => setDom(e.target.value)} style={{ ...s.input, textAlign: "center" as const }} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#78716C", marginBottom: 4, textAlign: "center" as const }}>Month</div>
            <input value={month} onChange={(e) => setMonth(e.target.value)} style={{ ...s.input, textAlign: "center" as const }} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#78716C", marginBottom: 4, textAlign: "center" as const }}>Day (week)</div>
            <input value={dow} onChange={(e) => setDow(e.target.value)} style={{ ...s.input, textAlign: "center" as const }} />
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#A8A29E", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, textAlign: "center" as const }}>
          <span>0-59</span><span>0-23</span><span>1-31</span><span>1-12</span><span>0-6 (Sun=0)</span>
        </div>
      </div>

      {/* Result */}
      <div style={{ ...s.card, background: "#F0FDFA", borderColor: "#99F6E4" }}>
        <label style={{ ...s.label, fontSize: 15 }}>Generated Expression</label>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <code style={{ flex: 1, fontSize: 24, fontWeight: 700, fontFamily: "'Courier New', monospace", color: "#0D9488", letterSpacing: 2 }}>{cron}</code>
          <button onClick={copy} style={s.btn}>{copied ? "Copied!" : "Copy"}</button>
        </div>
        <p style={{ fontSize: 14, color: "#374151", margin: 0, fontStyle: "italic" }}>📝 {description}</p>
      </div>

      {/* Next runs */}
      <div style={s.card}>
        <label style={{ ...s.label, fontSize: 15, marginBottom: 12 }}>Next 5 Scheduled Runs</label>
        {nextRuns.length === 0 ? (
          <p style={{ fontSize: 13, color: "#78716C" }}>Could not calculate next runs for this expression.</p>
        ) : (
          nextRuns.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 6, background: i % 2 === 0 ? "#FAFAF9" : "#fff" }}>
              <span style={{ fontSize: 12, color: "#A8A29E", minWidth: 20 }}>#{i + 1}</span>
              <span style={{ fontSize: 14, color: "#1C1917", fontFamily: "'Courier New', monospace" }}>
                {d.toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" })} at {d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Reference */}
      <div style={s.card}>
        <label style={{ ...s.label, fontSize: 15, marginBottom: 12 }}>Quick Reference</label>
        <div style={{ fontSize: 13, color: "#57534E", lineHeight: 1.8 }}>
          <code style={{ background: "#F5F5F4", padding: "2px 6px", borderRadius: 4 }}>*</code> = any value &nbsp;
          <code style={{ background: "#F5F5F4", padding: "2px 6px", borderRadius: 4 }}>*/n</code> = every n &nbsp;
          <code style={{ background: "#F5F5F4", padding: "2px 6px", borderRadius: 4 }}>1,3,5</code> = specific values &nbsp;
          <code style={{ background: "#F5F5F4", padding: "2px 6px", borderRadius: 4 }}>1-5</code> = range
        </div>
      </div>

      <SeoContent />
    </div>
  );
}
