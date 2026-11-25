"use client";
import { useState, useEffect } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface Reading {
  id: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  date: string;
  time: string;
  notes: string;
  category: string;
  color: string;
}

function categorize(sys: number, dia: number): { category: string; color: string } {
  if (sys >= 180 || dia >= 120) return { category: "Hypertensive Crisis", color: "#991b1b" };
  if (sys >= 140 || dia >= 90) return { category: "High (Stage 2)", color: "#dc2626" };
  if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) return { category: "High (Stage 1)", color: "#f97316" };
  if (sys >= 120 && sys <= 129 && dia < 80) return { category: "Elevated", color: "#eab308" };
  if (sys < 120 && dia < 80) return { category: "Normal", color: "#16a34a" };
  return { category: "Unknown", color: "#6b7280" };
}

const STORAGE_KEY = "tck-bp-tracker";

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [readings, setReadings] = useState<Reading[]>([]);
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  const [notes, setNotes] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setReadings(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(readings)); } catch {}
  }, [readings]);

  const addReading = () => {
    const sys = parseInt(systolic);
    const dia = parseInt(diastolic);
    const pls = parseInt(pulse) || 0;
    if (isNaN(sys) || isNaN(dia) || sys < 50 || sys > 300 || dia < 30 || dia > 200) return;
    const cat = categorize(sys, dia);
    const r: Reading = { id: Date.now().toString(), systolic: sys, diastolic: dia, pulse: pls, date, time, notes: notes.trim(), ...cat };
    setReadings(prev => [r, ...prev]);
    setSystolic(""); setDiastolic(""); setPulse(""); setNotes("");
  };

  const deleteReading = (id: string) => setReadings(prev => prev.filter(r => r.id !== id));

  const exportCsv = () => {
    const header = "Date,Time,Systolic,Diastolic,Pulse,Category,Notes\n";
    const rows = readings.map(r => `${r.date},${r.time},${r.systolic},${r.diastolic},${r.pulse},"${r.category}","${r.notes}"`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "blood-pressure-history.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const avgSys = readings.length ? Math.round(readings.reduce((s, r) => s + r.systolic, 0) / readings.length) : 0;
  const avgDia = readings.length ? Math.round(readings.reduce((s, r) => s + r.diastolic, 0) / readings.length) : 0;
  const avgPulse = readings.length ? Math.round(readings.reduce((s, r) => s + r.pulse, 0) / readings.length) : 0;
  const avgCat = readings.length ? categorize(avgSys, avgDia) : { category: "—", color: "#6b7280" };

  /* Simple SVG chart of last 20 readings */
  const chartData = [...readings].reverse().slice(-20);
  const chartW = 700;
  const chartH = 200;
  const pad = 40;
  const minY = 40;
  const maxY = Math.max(200, ...chartData.map(r => r.systolic)) + 10;

  const inp: React.CSSProperties = { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "15px", outline: "none" };
  const btn: React.CSSProperties = { padding: "10px 24px", background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: 600, cursor: "pointer" };
  const card: React.CSSProperties = { background: "#fff", borderRadius: "12px", padding: "24px", border: "1px solid #e5e7eb", marginBottom: "16px" };

  return (
    <>
      <ToolSchema name="Blood Pressure Tracker" description="Track blood pressure readings with AHA categories, trends, and CSV export." slug="blood-pressure-tracker" category="WebApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Blood Pressure Tracker", url: "https://toolcraftkit.com/tools/blood-pressure-tracker" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px 60px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#111827", marginBottom: "8px" }}>Blood Pressure Tracker</h1>
        <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "8px" }}>Log readings, track trends, and understand your blood pressure categories.</p>
        <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: "8px", padding: "12px 16px", marginBottom: "24px", fontSize: "13px", color: "#92400e" }}>
          ⚠️ This tool is for informational purposes only and does not constitute medical advice. Consult your healthcare provider for diagnosis and treatment.
        </div>

        {/* Input Form */}
        <div style={card}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px", color: "#111827" }}>Add Reading</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "4px", fontSize: "13px" }}>Systolic (mmHg) *</label>
              <input type="number" value={systolic} onChange={e => setSystolic(e.target.value)} placeholder="120" style={inp} min="50" max="300" />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "4px", fontSize: "13px" }}>Diastolic (mmHg) *</label>
              <input type="number" value={diastolic} onChange={e => setDiastolic(e.target.value)} placeholder="80" style={inp} min="30" max="200" />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "4px", fontSize: "13px" }}>Pulse (bpm)</label>
              <input type="number" value={pulse} onChange={e => setPulse(e.target.value)} placeholder="72" style={inp} min="30" max="220" />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: "12px", marginBottom: "12px" }}>
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "4px", fontSize: "13px" }}>Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inp} />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "4px", fontSize: "13px" }}>Time</label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} style={inp} />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "4px", fontSize: "13px" }}>Notes</label>
              <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g., After exercise" style={inp} />
            </div>
          </div>
          <button onClick={addReading} style={btn}>Add Reading</button>
        </div>

        {/* AHA Categories Reference */}
        <div style={card}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px", color: "#111827" }}>Blood Pressure Categories (AHA)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "6px", fontSize: "12px" }}>
            {[{ label: "Normal", range: "<120/80", color: "#16a34a" }, { label: "Elevated", range: "120-129/<80", color: "#eab308" }, { label: "High (Stage 1)", range: "130-139/80-89", color: "#f97316" }, { label: "High (Stage 2)", range: "≥140/≥90", color: "#dc2626" }, { label: "Crisis", range: "≥180/≥120", color: "#991b1b" }].map(c => (
              <div key={c.label} style={{ padding: "8px", borderRadius: "6px", background: `${c.color}15`, borderLeft: `3px solid ${c.color}`, textAlign: "center" }}>
                <div style={{ fontWeight: 700, color: c.color }}>{c.label}</div>
                <div style={{ color: "#374151" }}>{c.range}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Averages */}
        {readings.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "16px" }}>
            {[{ label: "Avg Systolic", value: avgSys, unit: "mmHg" }, { label: "Avg Diastolic", value: avgDia, unit: "mmHg" }, { label: "Avg Pulse", value: avgPulse, unit: "bpm" }, { label: "Avg Category", value: avgCat.category, unit: "", color: avgCat.color }].map((s, i) => (
              <div key={i} style={{ ...card, textAlign: "center", marginBottom: 0 }}>
                <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>{s.label}</div>
                <div style={{ fontSize: "24px", fontWeight: 800, color: s.color || "#111827" }}>{s.value}</div>
                {s.unit && <div style={{ fontSize: "11px", color: "#9ca3af" }}>{s.unit}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Trend Chart */}
        {chartData.length >= 2 && (
          <div style={card}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px", color: "#111827" }}>Trend (Last {chartData.length} Readings)</h2>
            <svg viewBox={`0 0 ${chartW} ${chartH + 20}`} style={{ width: "100%", height: "auto" }}>
              {/* Grid lines */}
              {[80, 120, 140, 180].map(v => {
                const y = chartH - ((v - minY) / (maxY - minY)) * chartH;
                return <g key={v}><line x1={pad} x2={chartW - 10} y1={y} y2={y} stroke="#e5e7eb" strokeDasharray="4" /><text x={pad - 4} y={y + 4} textAnchor="end" fontSize="10" fill="#9ca3af">{v}</text></g>;
              })}
              {/* Systolic line */}
              <polyline fill="none" stroke="#dc2626" strokeWidth="2" points={chartData.map((r, i) => `${pad + (i / (chartData.length - 1)) * (chartW - pad - 10)},${chartH - ((r.systolic - minY) / (maxY - minY)) * chartH}`).join(" ")} />
              {/* Diastolic line */}
              <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={chartData.map((r, i) => `${pad + (i / (chartData.length - 1)) * (chartW - pad - 10)},${chartH - ((r.diastolic - minY) / (maxY - minY)) * chartH}`).join(" ")} />
              {/* Dots */}
              {chartData.map((r, i) => {
                const x = pad + (i / (chartData.length - 1)) * (chartW - pad - 10);
                return <g key={i}><circle cx={x} cy={chartH - ((r.systolic - minY) / (maxY - minY)) * chartH} r="3" fill="#dc2626" /><circle cx={x} cy={chartH - ((r.diastolic - minY) / (maxY - minY)) * chartH} r="3" fill="#3b82f6" /></g>;
              })}
              {/* Legend */}
              <circle cx={pad + 10} cy={chartH + 14} r="4" fill="#dc2626" /><text x={pad + 18} y={chartH + 18} fontSize="11" fill="#374151">Systolic</text>
              <circle cx={pad + 90} cy={chartH + 14} r="4" fill="#3b82f6" /><text x={pad + 98} y={chartH + 18} fontSize="11" fill="#374151">Diastolic</text>
            </svg>
          </div>
        )}

        {/* Reading History */}
        {readings.length > 0 && (
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>History ({readings.length} readings)</h2>
              <button onClick={exportCsv} style={{ ...btn, padding: "6px 14px", fontSize: "13px" }}>📥 Export CSV</button>
            </div>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {readings.map(r => (
                <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", borderLeft: `4px solid ${r.color}`, marginBottom: "6px" }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>{r.systolic}/{r.diastolic}</span>
                    {r.pulse > 0 && <span style={{ color: "#6b7280", marginLeft: "8px", fontSize: "13px" }}>{r.pulse} bpm</span>}
                    <span style={{ marginLeft: "12px", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 600, color: r.color, background: `${r.color}15` }}>{r.category}</span>
                    <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>{r.date} {r.time}{r.notes ? ` — ${r.notes}` : ""}</div>
                  </div>
                  <button onClick={() => deleteReading(r.id)} style={{ padding: "4px 10px", border: "1px solid #fca5a5", borderRadius: "6px", background: "#fef2f2", color: "#dc2626", cursor: "pointer", fontSize: "12px" }}>✕</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <SeoContent />
    </>
  );
}
