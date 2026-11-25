"use client";
import { useState, useEffect } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  notes: string;
}

const FREQ_OPTIONS = [
  { value: "once", label: "Once daily", count: 1 },
  { value: "twice", label: "Twice daily", count: 2 },
  { value: "three", label: "Three times daily", count: 3 },
  { value: "weekly", label: "Once weekly", count: 1 },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const STORAGE_KEY = "tck-medication-reminder";

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [meds, setMeds] = useState<Medication[]>([]);
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("once");
  const [times, setTimes] = useState(["08:00"]);
  const [notes, setNotes] = useState("");
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMeds(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(meds)); } catch {}
  }, [meds]);

  const handleFreqChange = (val: string) => {
    setFrequency(val);
    const opt = FREQ_OPTIONS.find(f => f.value === val);
    const count = opt?.count || 1;
    const newTimes = Array.from({ length: count }, (_, i) => {
      const hour = 8 + (i * Math.floor(12 / count));
      return `${String(hour).padStart(2, "0")}:00`;
    });
    setTimes(newTimes);
  };

  const addMed = () => {
    if (!name.trim()) return;
    const med: Medication = { id: editing || Date.now().toString(), name: name.trim(), dosage: dosage.trim(), frequency, times: [...times], notes: notes.trim() };
    if (editing) {
      setMeds(prev => prev.map(m => m.id === editing ? med : m));
      setEditing(null);
    } else {
      setMeds(prev => [...prev, med]);
    }
    setName(""); setDosage(""); setFrequency("once"); setTimes(["08:00"]); setNotes("");
  };

  const editMed = (med: Medication) => {
    setEditing(med.id); setName(med.name); setDosage(med.dosage); setFrequency(med.frequency); setTimes([...med.times]); setNotes(med.notes);
  };

  const deleteMed = (id: string) => setMeds(prev => prev.filter(m => m.id !== id));

  const getMedsForTime = (day: string, hour: number) => {
    return meds.filter(m => {
      if (m.frequency === "weekly" && day !== "Monday") return false;
      return m.times.some(t => parseInt(t.split(":")[0]) === hour);
    });
  };

  const timeSlots = Array.from(new Set(meds.flatMap(m => m.times.map(t => parseInt(t.split(":")[0]))))).sort((a, b) => a - b);

  const inp: React.CSSProperties = { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "15px", outline: "none" };
  const btn: React.CSSProperties = { padding: "10px 24px", background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: 600, cursor: "pointer" };
  const card: React.CSSProperties = { background: "#fff", borderRadius: "12px", padding: "24px", border: "1px solid #e5e7eb", marginBottom: "16px" };

  return (
    <>
      <ToolSchema name="Medication Reminder Planner" description="Create a visual weekly medication schedule. Add medications, dosages, times, and print your plan." slug="medication-reminder" category="WebApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Medication Reminder", url: "https://toolcraftkit.com/tools/medication-reminder" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px 60px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#111827", marginBottom: "8px" }}>Medication Reminder Planner</h1>
        <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "8px" }}>Organize your medication schedule with a visual weekly calendar. Data stays on your device.</p>
        <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: "8px", padding: "12px 16px", marginBottom: "24px", fontSize: "13px", color: "#92400e" }}>
          ⚠️ This tool is for informational purposes only and does not constitute medical advice. Always consult your healthcare provider about medication schedules.
        </div>

        {/* Add Medication Form */}
        <div style={card}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px", color: "#111827" }}>{editing ? "Edit Medication" : "Add Medication"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "4px", fontSize: "13px" }}>Medication Name *</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Aspirin" style={inp} />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "4px", fontSize: "13px" }}>Dosage</label>
              <input value={dosage} onChange={e => setDosage(e.target.value)} placeholder="e.g., 100mg" style={inp} />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "4px", fontSize: "13px" }}>Frequency</label>
              <select value={frequency} onChange={e => handleFreqChange(e.target.value)} style={inp}>
                {FREQ_OPTIONS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "4px", fontSize: "13px" }}>Time(s)</label>
              <div style={{ display: "flex", gap: "8px" }}>
                {times.map((t, i) => (
                  <input key={i} type="time" value={t} onChange={e => { const copy = [...times]; copy[i] = e.target.value; setTimes(copy); }} style={{ ...inp, flex: 1 }} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "4px", fontSize: "13px" }}>Notes</label>
            <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g., Take with food" style={inp} />
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={addMed} style={btn}>{editing ? "Update" : "Add Medication"}</button>
            {editing && <button onClick={() => { setEditing(null); setName(""); setDosage(""); setFrequency("once"); setTimes(["08:00"]); setNotes(""); }} style={{ ...btn, background: "#6b7280" }}>Cancel</button>}
          </div>
        </div>

        {/* Medication List */}
        {meds.length > 0 && (
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>Your Medications ({meds.length})</h2>
              <button onClick={() => window.print()} style={{ ...btn, padding: "8px 16px", fontSize: "13px" }}>🖨️ Print Schedule</button>
            </div>
            {meds.map(med => (
              <div key={med.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", borderRadius: "8px", border: "1px solid #e5e7eb", marginBottom: "8px" }}>
                <div>
                  <span style={{ fontWeight: 700, color: "#111827" }}>{med.name}</span>
                  {med.dosage && <span style={{ color: "#6b7280", marginLeft: "8px" }}>{med.dosage}</span>}
                  <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "2px" }}>
                    {FREQ_OPTIONS.find(f => f.value === med.frequency)?.label} at {med.times.join(", ")}
                    {med.notes && <span> — {med.notes}</span>}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button onClick={() => editMed(med)} style={{ padding: "6px 12px", border: "1px solid #d1d5db", borderRadius: "6px", background: "#fff", cursor: "pointer", fontSize: "13px" }}>Edit</button>
                  <button onClick={() => deleteMed(med.id)} style={{ padding: "6px 12px", border: "1px solid #fca5a5", borderRadius: "6px", background: "#fef2f2", color: "#dc2626", cursor: "pointer", fontSize: "13px" }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Weekly Schedule View */}
        {meds.length > 0 && timeSlots.length > 0 && (
          <div style={card}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "16px" }}>Weekly Schedule</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "8px", borderBottom: "2px solid #0D9488", textAlign: "left", color: "#374151" }}>Time</th>
                    {DAYS.map(d => <th key={d} style={{ padding: "8px", borderBottom: "2px solid #0D9488", textAlign: "center", color: "#374151", minWidth: "80px" }}>{d.slice(0, 3)}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(hour => (
                    <tr key={hour}>
                      <td style={{ padding: "8px", borderBottom: "1px solid #e5e7eb", fontWeight: 600, color: "#374151" }}>{String(hour).padStart(2, "0")}:00</td>
                      {DAYS.map(day => {
                        const dayMeds = getMedsForTime(day, hour);
                        return (
                          <td key={day} style={{ padding: "4px", borderBottom: "1px solid #e5e7eb", textAlign: "center", verticalAlign: "top" }}>
                            {dayMeds.map(m => (
                              <div key={m.id} style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "4px", padding: "2px 4px", marginBottom: "2px", fontSize: "11px", fontWeight: 600, color: "#0D9488" }}>
                                {m.name}
                              </div>
                            ))}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <SeoContent />
    </>
  );
}
