"use client";
import { useState, useEffect } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

function formatDate(d: Date) {
  return {
    iso: d.toISOString(),
    utc: d.toUTCString(),
    local: d.toLocaleString(),
    date: d.toLocaleDateString("en-CA"),
    time: d.toLocaleTimeString(),
    relative: getRelative(d),
  };
}

function getRelative(d: Date) {
  const diff = (Date.now() - d.getTime()) / 1000;
  const abs = Math.abs(diff);
  const past = diff > 0;
  const suffix = past ? "ago" : "from now";
  if (abs < 60) return `${Math.floor(abs)} seconds ${suffix}`;
  if (abs < 3600) return `${Math.floor(abs / 60)} minutes ${suffix}`;
  if (abs < 86400) return `${Math.floor(abs / 3600)} hours ${suffix}`;
  if (abs < 2592000) return `${Math.floor(abs / 86400)} days ${suffix}`;
  if (abs < 31536000) return `${Math.floor(abs / 2592000)} months ${suffix}`;
  return `${Math.floor(abs / 31536000)} years ${suffix}`;
}

export default function Page() {
  const [mode, setMode] = useState<"unix" | "date">("unix");
  const [unixInput, setUnixInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [now, setNow] = useState(Date.now());
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentDate = new Date(now);
  const currentUnix = Math.floor(now / 1000);

  let result: ReturnType<typeof formatDate> | null = null;
  let resultUnix = 0;

  if (mode === "unix" && unixInput) {
    const ts = parseInt(unixInput);
    if (!isNaN(ts)) {
      const d = new Date(ts > 1e12 ? ts : ts * 1000);
      if (!isNaN(d.getTime())) { result = formatDate(d); resultUnix = Math.floor(d.getTime() / 1000); }
    }
  } else if (mode === "date" && dateInput) {
    const str = dateInput + (timeInput ? "T" + timeInput : "T00:00:00");
    const d = new Date(str);
    if (!isNaN(d.getTime())) { result = formatDate(d); resultUnix = Math.floor(d.getTime() / 1000); }
  }

  const copy = (val: string, key: string) => { navigator.clipboard.writeText(val); setCopied(key); setTimeout(() => setCopied(""), 1500); };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    row: { display: "flex" as const, alignItems: "center" as const, gap: 8, marginBottom: 14, flexWrap: "wrap" as const },
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", fontFamily: "'Courier New', monospace" } as const,
    resultRow: { display: "flex" as const, justifyContent: "space-between" as const, alignItems: "center" as const, padding: "8px 0", borderBottom: "1px solid #F5F5F4", gap: 8 },
    mono: { fontFamily: "'Courier New', monospace", fontSize: 13 } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema
        name="Timestamp Converter"
        description="Convert Unix timestamps to dates and back. Live clock with multiple timezone formats."
        slug="timestamp-converter"
        category="DeveloperApplication"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Converter Tools", url: "https://toolcraftkit.com/#converter-tools" },
          { name: "Timestamp Converter", url: "https://toolcraftkit.com/tools/timestamp-converter" },
        ]}
      />
      <h1 style={s.h1}>Timestamp Converter</h1>
      <p style={s.sub}>Convert between Unix timestamps and human-readable dates.</p>

      <div style={{ ...s.card, background: "#F0FDFA", border: "1px solid #99F6E4" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 12, color: "#57534E", marginBottom: 2 }}>Current Unix Timestamp</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#0D9488", fontFamily: "'Courier New', monospace" }}>{currentUnix}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#57534E", marginBottom: 2 }}>Current Time</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1C1917" }}>{currentDate.toLocaleString()}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
          <button onClick={() => { copy(String(currentUnix), "now-unix"); }} style={s.btnSm}>{copied === "now-unix" ? "Copied!" : "Copy Unix"}</button>
          <button onClick={() => { copy(currentDate.toISOString(), "now-iso"); }} style={s.btnSm}>{copied === "now-iso" ? "Copied!" : "Copy ISO"}</button>
        </div>
      </div>

      <div style={s.card}>
        <div style={s.row}>
          {([["unix", "Unix → Date"], ["date", "Date → Unix"]] as const).map(([key, lbl]) => (
            <button key={key} onClick={() => setMode(key)} style={{ ...s.btnSm, background: mode === key ? "#0D9488" : "#F5F5F4", color: mode === key ? "#fff" : "#1C1917", border: mode === key ? "1px solid #0D9488" : "1px solid #E7E5E4" }}>{lbl}</button>
          ))}
        </div>

        {mode === "unix" ? (
          <div>
            <label style={s.label}>Unix Timestamp (seconds or milliseconds)</label>
            <input type="text" value={unixInput} onChange={(e) => setUnixInput(e.target.value)} placeholder="1692633600" style={s.input} />
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <button onClick={() => setUnixInput(String(currentUnix))} style={s.btnSm}>Now</button>
              <button onClick={() => setUnixInput("0")} style={s.btnSm}>Epoch</button>
              <button onClick={() => setUnixInput(String(Math.floor(new Date("2000-01-01").getTime() / 1000)))} style={s.btnSm}>Y2K</button>
            </div>
          </div>
        ) : (
          <div>
            <label style={s.label}>Date</label>
            <input type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} style={s.input} />
            <label style={{ ...s.label, marginTop: 10 }}>Time (optional)</label>
            <input type="time" step="1" value={timeInput} onChange={(e) => setTimeInput(e.target.value)} style={s.input} />
          </div>
        )}

        {result && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>Results</div>
            {[
              { label: "Unix (seconds)", value: String(resultUnix), key: "unix" },
              { label: "Unix (milliseconds)", value: String(resultUnix * 1000), key: "unixms" },
              { label: "ISO 8601", value: result.iso, key: "iso" },
              { label: "UTC", value: result.utc, key: "utc" },
              { label: "Local", value: result.local, key: "local" },
              { label: "Date", value: result.date, key: "date" },
              { label: "Relative", value: result.relative, key: "rel" },
            ].map((r) => (
              <div key={r.key} style={s.resultRow}>
                <span style={{ fontSize: 12, color: "#78716C", minWidth: 100 }}>{r.label}</span>
                <span style={{ ...s.mono, flex: 1, color: "#1C1917", wordBreak: "break-all" }}>{r.value}</span>
                <button onClick={() => copy(r.value, r.key)} style={{ ...s.btnSm, fontSize: 11, padding: "3px 8px" }}>{copied === r.key ? "✓" : "Copy"}</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>A Unix timestamp is the number of seconds since January 1, 1970 (UTC). This tool converts between Unix timestamps and human-readable dates in multiple formats including ISO 8601, UTC, and your local timezone.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>The tool auto-detects whether your input is in seconds or milliseconds. Everything runs in your browser — nothing is stored or sent anywhere.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "What is a Unix timestamp?", a: "A Unix timestamp (also called Epoch time or POSIX time) counts the number of seconds since January 1, 1970 at 00:00:00 UTC. It is widely used in programming, databases, and APIs." },
          { q: "Seconds vs milliseconds — what is the difference?", a: "Some systems (like JavaScript's Date.now()) use milliseconds (13 digits), while others (like PHP's time()) use seconds (10 digits). This tool handles both automatically." },
          { q: "What is the Year 2038 problem?", a: "32-bit systems store Unix timestamps as signed integers, which will overflow on January 19, 2038. Most modern systems use 64-bit integers, which extends the range billions of years." },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: i < 2 ? 14 : 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 4 }}>{faq.q}</h3>
            <p style={{ fontSize: 13, color: "#57534E", lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>
          <SeoContent />
    </div>
  );
}
