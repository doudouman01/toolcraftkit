"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ─── BRAND TOKENS ─── */
const LIGHT = {
  primary: "#0D9488", primaryLight: "#14B8A6",
  bg: "#FAFAF9", surface: "#FFFFFF", surfaceAlt: "#F5F5F4",
  border: "#E7E5E4", text: "#1C1917", textMuted: "#78716C", textLight: "#A8A29E",
  success: "#10B981", danger: "#EF4444", warning: "#F59E0B",
  inputBg: "#FFFFFF", shadow: "0 1px 3px rgba(0,0,0,0.06)",
};
const DARK = {
  primary: "#2DD4BF", primaryLight: "#5EEAD4",
  bg: "#0C0A09", surface: "#1C1917", surfaceAlt: "#292524",
  border: "#3F3F46", text: "#FAFAF9", textMuted: "#A8A29E", textLight: "#78716C",
  success: "#34D399", danger: "#F87171", warning: "#FBBF24",
  inputBg: "#292524", shadow: "0 1px 3px rgba(0,0,0,0.3)",
};

const PRESETS = [
  { label: "5 min", seconds: 5 * 60 },
  { label: "10 min", seconds: 10 * 60 },
  { label: "15 min", seconds: 15 * 60 },
  { label: "25 min", seconds: 25 * 60 },
  { label: "30 min", seconds: 30 * 60 },
  { label: "1 hour", seconds: 60 * 60 },
];

function playBeep() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const playTone = (freq: number, start: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
      gain.gain.setValueAtTime(0.35, ctx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + start + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + dur);
    };
    playTone(880, 0, 0.15);
    playTone(880, 0.2, 0.15);
    playTone(1100, 0.4, 0.3);
  } catch { /* silent fallback */ }
}

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
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 0 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>How to Use the Countdown Timer</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>Enter custom hours, minutes, and seconds, or tap a quick preset button to start immediately. Press Start to begin the countdown, Pause to freeze it, and Reset to clear. When the timer reaches zero, you will hear an audio alert and see a completion animation.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>Why Use a Countdown Timer</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>Countdown timers help you stay focused by creating a clear deadline for any task. Whether you are timing a workout, cooking, studying, or running a meeting, a visible countdown keeps you aware of how much time remains. Research shows that time-boxing tasks improves productivity and reduces procrastination.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Pomodoro-style work sessions (25-minute focus blocks)</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Cooking and baking timers</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Exercise intervals and rest periods</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Exam and test practice with time limits</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Meeting and presentation time management</li>
      </ul>
      <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: theme.primary, marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: theme.textMuted, margin: 0 }}>
          For structured work sessions with automatic breaks, try our <a href="/tools/pomodoro-timer" style={{ color: theme.primary }}>Pomodoro Timer</a> which alternates focus and rest periods automatically.
        </p>
      </div>
    </section>
  );
}

export default function CountdownTimer() {
  const [dark, setDark] = useState(false);
  const theme = dark ? DARK : LIGHT;

  const [inputH, setInputH] = useState(0);
  const [inputM, setInputM] = useState(5);
  const [inputS, setInputS] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  const handleStart = useCallback(() => {
    if (finished) return;
    if (!hasStartedRef.current) {
      const total = inputH * 3600 + inputM * 60 + inputS;
      if (total <= 0) return;
      setTotalSeconds(total);
      setRemaining(total);
      hasStartedRef.current = true;
    }
    setRunning(true);
  }, [inputH, inputM, inputS, finished]);

  const handlePause = useCallback(() => {
    setRunning(false);
    clearTimer();
  }, [clearTimer]);

  const handleReset = useCallback(() => {
    setRunning(false);
    setFinished(false);
    setRemaining(0);
    setTotalSeconds(0);
    hasStartedRef.current = false;
    clearTimer();
  }, [clearTimer]);

  const applyPreset = useCallback((secs: number) => {
    handleReset();
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    setInputH(h);
    setInputM(m);
    setInputS(s);
  }, [handleReset]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearTimer();
          setRunning(false);
          setFinished(true);
          playBeep();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return clearTimer;
  }, [running, clearTimer]);

  // Detect dark mode
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const displayH = String(Math.floor(remaining / 3600)).padStart(2, "0");
  const displayM = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");
  const displayS = String(remaining % 60).padStart(2, "0");

  const progress = totalSeconds > 0 ? ((totalSeconds - remaining) / totalSeconds) : 0;
  const isActive = hasStartedRef.current || running;

  // SVG ring
  const ringSize = 220;
  const strokeW = 10;
  const radius = (ringSize - strokeW) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference * (1 - progress);

  const inputStyle = {
    width: 72, padding: "10px 8px", fontSize: 18, borderRadius: 8, textAlign: "center" as const,
    border: `1.5px solid ${theme.border}`, background: theme.inputBg,
    color: theme.text, outline: "none", fontWeight: 600,
    fontVariantNumeric: "tabular-nums" as const,
  };

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
          <span style={{ color: theme.primary, fontWeight: 500 }}>Countdown Timer</span>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.03em" }}>Countdown Timer</h1>
          <p style={{ fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5 }}>
            Set a custom countdown with audio alerts. Choose a preset or enter your own time.
          </p>
        </div>

        {/* Timer Display Card */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: 32,
          border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
          textAlign: "center",
        }}>
          {/* Progress Ring */}
          <div style={{ position: "relative", display: "inline-block", marginBottom: 16 }}>
            <svg width={ringSize} height={ringSize} style={{ transform: "rotate(-90deg)" }}>
              <circle cx={ringSize / 2} cy={ringSize / 2} r={radius}
                fill="none" stroke={theme.border} strokeWidth={strokeW} />
              <circle cx={ringSize / 2} cy={ringSize / 2} r={radius}
                fill="none" stroke={finished ? theme.success : theme.primary}
                strokeWidth={strokeW} strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={strokeOffset}
                style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }} />
            </svg>
            <div style={{
              position: "absolute", inset: 0, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                fontSize: 44, fontWeight: 800, fontFamily: "monospace", letterSpacing: "-0.02em",
                color: finished ? theme.success : theme.text,
                transition: "color 0.3s",
              }}>
                {displayH}:{displayM}:{displayS}
              </div>
              {finished && (
                <div style={{
                  fontSize: 13, fontWeight: 700, color: theme.success,
                  marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}>
                  Timer complete!
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ width: "100%", height: 6, background: theme.border, borderRadius: 3, marginBottom: 24, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 3, transition: "width 1s linear, background 0.3s",
              background: finished ? theme.success : theme.primary,
              width: (progress * 100) + "%",
            }} />
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {!running ? (
              <button onClick={handleStart} disabled={finished}
                style={{
                  background: finished ? theme.textLight : theme.primary, color: "#fff",
                  border: "none", borderRadius: 10, padding: "14px 32px",
                  fontSize: 16, fontWeight: 600, cursor: finished ? "default" : "pointer",
                  opacity: finished ? 0.5 : 1,
                }}>
                Start
              </button>
            ) : (
              <button onClick={handlePause}
                style={{
                  background: theme.warning, color: "#fff",
                  border: "none", borderRadius: 10, padding: "14px 32px",
                  fontSize: 16, fontWeight: 600, cursor: "pointer",
                }}>
                Pause
              </button>
            )}
            <button onClick={handleReset}
              style={{
                background: theme.surface, color: theme.text,
                border: `2px solid ${theme.border}`, borderRadius: 10, padding: "14px 32px",
                fontSize: 16, fontWeight: 600, cursor: "pointer",
              }}>
              Reset
            </button>
          </div>
        </div>

        {/* Custom Time Input */}
        {!isActive && (
          <div style={{
            background: theme.surface, borderRadius: 12, padding: 24,
            border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
          }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 16px", color: theme.text }}>Set Custom Time</h2>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Hours</label>
                <input type="number" min={0} max={23} value={inputH}
                  onChange={e => setInputH(Math.max(0, Math.min(23, +e.target.value || 0)))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = theme.primary}
                  onBlur={e => e.target.style.borderColor = theme.border} />
              </div>
              <span style={{ fontSize: 28, fontWeight: 700, color: theme.textLight, paddingTop: 18 }}>:</span>
              <div style={{ textAlign: "center" }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Minutes</label>
                <input type="number" min={0} max={59} value={inputM}
                  onChange={e => setInputM(Math.max(0, Math.min(59, +e.target.value || 0)))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = theme.primary}
                  onBlur={e => e.target.style.borderColor = theme.border} />
              </div>
              <span style={{ fontSize: 28, fontWeight: 700, color: theme.textLight, paddingTop: 18 }}>:</span>
              <div style={{ textAlign: "center" }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Seconds</label>
                <input type="number" min={0} max={59} value={inputS}
                  onChange={e => setInputS(Math.max(0, Math.min(59, +e.target.value || 0)))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = theme.primary}
                  onBlur={e => e.target.style.borderColor = theme.border} />
              </div>
            </div>
          </div>
        )}

        {/* Quick Presets */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: 24,
          border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
        }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 14px", color: theme.text }}>Quick Presets</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {PRESETS.map(p => (
              <button key={p.label} onClick={() => applyPreset(p.seconds)}
                style={{
                  padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                  border: `1.5px solid ${theme.border}`, background: theme.surfaceAlt,
                  color: theme.text, cursor: "pointer", transition: "all 0.15s",
                }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: 24,
          border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: theme.text }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme} q="Does the timer work if I switch tabs?" a="Yes. The countdown runs in the background and will sound an audio alert when it reaches zero, even if you are in another browser tab. However, some browsers may throttle background tabs after a few minutes, which can cause slight delays in the alert." />
          <FAQItem theme={theme} q="What is the 25-minute preset for?" a="The 25-minute preset follows the Pomodoro Technique, a time management method where you work in focused 25-minute blocks followed by short breaks. For a full Pomodoro experience with automatic break cycles, try our dedicated Pomodoro Timer." />
          <FAQItem theme={theme} q="Can I set a timer for more than one hour?" a="Yes. Use the custom time inputs to set up to 23 hours, 59 minutes, and 59 seconds. Simply enter your desired hours, minutes, and seconds and press Start." />
          <FAQItem theme={theme} q="Is my data saved or tracked?" a="No. This countdown timer runs entirely in your browser. No data is sent to any server, and nothing is saved between sessions. Your privacy is fully respected." />
        </div>

        <SeoContent theme={theme} />
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
