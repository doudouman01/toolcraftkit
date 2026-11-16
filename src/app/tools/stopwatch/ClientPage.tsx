"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

function formatTime(ms: number): string {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${cs.toString().padStart(2, "0")}`;
}

export default function ClientPage() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<{ lap: number; split: number; total: number }[]>([]);
  const startTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const accumulatedRef = useRef(0);

  const tick = useCallback(() => {
    const now = performance.now();
    setElapsed(accumulatedRef.current + (now - startTimeRef.current));
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const start = () => {
    startTimeRef.current = performance.now();
    setRunning(true);
    rafRef.current = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    accumulatedRef.current += performance.now() - startTimeRef.current;
    setRunning(false);
  };

  const reset = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    accumulatedRef.current = 0;
    setElapsed(0);
    setRunning(false);
    setLaps([]);
  };

  const lap = () => {
    const total = elapsed;
    const prevTotal = laps.length > 0 ? laps[0].total : 0;
    const split = total - prevTotal;
    setLaps([{ lap: laps.length + 1, split, total }, ...laps]);
  };

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const cardStyle: React.CSSProperties = { background: "#fff", border: "1px solid #E7E5E4", borderRadius: "12px", padding: "32px", marginBottom: "16px", textAlign: "center" };
  const btnStyle = (bg: string): React.CSSProperties => ({ padding: "12px 28px", background: bg, color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "15px", cursor: "pointer", margin: "6px", minWidth: "100px" });

  return (
    <>
      <ToolSchema name="Stopwatch" description="Online stopwatch with lap timer. Millisecond precision, clean design." slug="stopwatch" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Productivity Tools", url: "/#productivity-tools" }, { name: "Stopwatch", url: "/tools/stopwatch" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1C1917", marginBottom: "6px" }}>Stopwatch</h1>
        <p style={{ color: "#78716C", fontSize: "15px", marginBottom: "28px" }}>Precise stopwatch with lap timer. Start, stop, lap, reset.</p>

        <div style={cardStyle}>
          <div style={{ fontSize: "56px", fontWeight: 700, fontVariantNumeric: "tabular-nums", color: "#1C1917", marginBottom: "24px", fontFamily: "monospace" }}>
            {formatTime(elapsed)}
          </div>
          <div>
            {!running ? (
              <button onClick={start} style={btnStyle("#0D9488")}>Start</button>
            ) : (
              <button onClick={stop} style={btnStyle("#EF4444")}>Stop</button>
            )}
            {running && <button onClick={lap} style={btnStyle("#3B82F6")}>Lap</button>}
            <button onClick={reset} style={btnStyle("#78716C")}>Reset</button>
          </div>
        </div>

        {laps.length > 0 && (
          <div style={{ background: "#fff", border: "1px solid #E7E5E4", borderRadius: "12px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#F5F5F4" }}>
                  <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#1C1917" }}>Lap</th>
                  <th style={{ padding: "10px 16px", textAlign: "right", fontWeight: 600, color: "#1C1917" }}>Split Time</th>
                  <th style={{ padding: "10px 16px", textAlign: "right", fontWeight: 600, color: "#1C1917" }}>Total Time</th>
                </tr>
              </thead>
              <tbody>
                {laps.map((l) => (
                  <tr key={l.lap} style={{ borderTop: "1px solid #E7E5E4" }}>
                    <td style={{ padding: "10px 16px", color: "#0D9488", fontWeight: 600 }}>#{l.lap}</td>
                    <td style={{ padding: "10px 16px", textAlign: "right", fontVariantNumeric: "tabular-nums", fontFamily: "monospace", color: "#1C1917" }}>{formatTime(l.split)}</td>
                    <td style={{ padding: "10px 16px", textAlign: "right", fontVariantNumeric: "tabular-nums", fontFamily: "monospace", color: "#78716C" }}>{formatTime(l.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <SeoContent />
    </>
  );
}
