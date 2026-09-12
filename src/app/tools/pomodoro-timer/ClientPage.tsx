"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";

export default function ClientPage() {
  const [workMin, setWorkMin] = useState(25);
  const [breakMin, setBreakMin] = useState(5);
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const reset = useCallback(() => {
    setRunning(false);
    setIsBreak(false);
    setSeconds(workMin * 60);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [workMin]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          if (!isBreak) { setSessions((s) => s + 1); setIsBreak(true); return breakMin * 60; }
          else { setIsBreak(false); return workMin * 60; }
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, isBreak, workMin, breakMin]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const pct = isBreak ? (1 - seconds / (breakMin * 60)) * 100 : (1 - seconds / (workMin * 60)) * 100;

  const s = {
    page: { maxWidth: 520, margin: "0 auto", padding: "32px 20px", textAlign: "center" as const } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 32 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 16, padding: 32, marginBottom: 16 } as const,
    timer: { fontSize: 72, fontWeight: 800, color: isBreak ? "#6366F1" : "#0D9488", fontFamily: "monospace", marginBottom: 8 } as const,
    status: { fontSize: 16, fontWeight: 600, color: isBreak ? "#6366F1" : "#0D9488", marginBottom: 24, textTransform: "uppercase" as const } as const,
    bar: { width: "100%", height: 8, background: "#E7E5E4", borderRadius: 4, marginBottom: 24, overflow: "hidden" } as const,
    fill: { height: "100%", background: isBreak ? "#6366F1" : "#0D9488", borderRadius: 4, transition: "width 1s linear", width: pct + "%" } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 16, fontWeight: 600, cursor: "pointer", margin: "0 6px" } as const,
    btnOut: { background: "#fff", color: "#1C1917", border: "2px solid #E7E5E4", borderRadius: 10, padding: "14px 32px", fontSize: 16, fontWeight: 600, cursor: "pointer", margin: "0 6px" } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    select: { padding: "8px 12px", border: "1px solid #E7E5E4", borderRadius: 6, fontSize: 14 } as const,
    sessions: { fontSize: 14, color: "#78716C", marginTop: 20 } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Pomodoro Timer" description="Free online Pomodoro timer. Stay focused with timed work sessions and breaks. No signup required." slug="pomodoro-timer" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Productivity Tools", url: "https://toolcraftkit.com/#productivity-tools" }, { name: "Pomodoro Timer", url: "https://toolcraftkit.com/tools/pomodoro-timer" }]} />
      <h1 style={s.h1}>Pomodoro Timer</h1>
      <p style={s.sub}>Stay focused with timed work sessions and breaks.</p>

      <div style={s.card}>
        <div style={s.status}>{isBreak ? "☕ Break Time" : "🎯 Focus Time"}</div>
        <div style={s.timer}>{mm}:{ss}</div>
        <div style={s.bar}><div style={s.fill} /></div>
        <div>
          {!running ? (
            <button onClick={() => setRunning(true)} style={s.btn}>▶ Start</button>
          ) : (
            <button onClick={() => setRunning(false)} style={s.btn}>⏸ Pause</button>
          )}
          <button onClick={reset} style={s.btnOut}>↺ Reset</button>
        </div>
        <div style={s.sessions}>Sessions completed: {sessions}</div>
      </div>

      <div style={{ ...s.card, textAlign: "left" as const }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div>
            <label style={s.label}>Work (min)</label>
            <select value={workMin} onChange={(e) => { setWorkMin(+e.target.value); if (!running) setSeconds(+e.target.value * 60); }} style={s.select}>
              {[15, 20, 25, 30, 45, 50, 60].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label style={s.label}>Break (min)</label>
            <select value={breakMin} onChange={(e) => setBreakMin(+e.target.value)} style={s.select}>
              {[3, 5, 10, 15].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div style={{ ...s.card, marginTop: 32, textAlign: "left" as const }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>The Pomodoro Technique helps you focus by breaking work into intervals — typically 25 minutes of focused work followed by a 5-minute break. After 4 sessions, take a longer break. This method reduces mental fatigue and improves concentration.</p>
      </div>
    </div>
  );
}
