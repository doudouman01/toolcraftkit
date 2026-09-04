"use client";
import { useState, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword(length: number, options: Record<string, boolean>) {
  let chars = "";
  if (options.uppercase) chars += CHARSETS.uppercase;
  if (options.lowercase) chars += CHARSETS.lowercase;
  if (options.numbers) chars += CHARSETS.numbers;
  if (options.symbols) chars += CHARSETS.symbols;
  if (!chars) chars = CHARSETS.lowercase;
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (v) => chars[v % chars.length]).join("");
}

function getStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  if (score <= 2) return { label: "Weak", color: "#EF4444", pct: 25 };
  if (score <= 3) return { label: "Fair", color: "#F59E0B", pct: 50 };
  if (score <= 4) return { label: "Strong", color: "#22C55E", pct: 75 };
  return { label: "Very Strong", color: "#0D9488", pct: 100 };
}

const initOpts: Record<string, boolean> = { uppercase: true, lowercase: true, numbers: true, symbols: true };

export default function Page() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState<Record<string, boolean>>(initOpts);
  const [passwords, setPasswords] = useState(() => Array.from({ length: 5 }, () => generatePassword(16, initOpts)));
  const [copied, setCopied] = useState(-1);
  const [count, setCount] = useState(5);

  const regenerate = useCallback(() => {
    setPasswords(Array.from({ length: count }, () => generatePassword(length, options)));
    setCopied(-1);
  }, [length, options, count]);

  const copy = (pw: string, i: number) => { navigator.clipboard.writeText(pw); setCopied(i); setTimeout(() => setCopied(-1), 1500); };
  const copyAll = () => { navigator.clipboard.writeText(passwords.join("\n")); setCopied(-2); setTimeout(() => setCopied(-1), 1500); };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    row: { display: "flex" as const, alignItems: "center" as const, gap: 12, flexWrap: "wrap" as const, marginBottom: 14 },
    slider: { flex: 1, minWidth: 120, accentColor: "#0D9488" } as const,
    badge: { fontSize: 13, fontWeight: 600, background: "#F5F5F4", borderRadius: 6, padding: "4px 10px", minWidth: 36, textAlign: "center" } as const,
    check: { display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, color: "#1C1917" } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    pwRow: { display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, background: "#FAFAF9", marginBottom: 6, fontFamily: "'Courier New', monospace", fontSize: 14, wordBreak: "break-all" } as const,
    meter: { height: 6, borderRadius: 3, background: "#E7E5E4", overflow: "hidden" as const, marginTop: 4 },
  };

  return (
    <div style={s.page}>
      <ToolSchema
        name="Password Generator"
        description="Generate strong random passwords with customizable length and character sets."
        slug="password-generator"
        category="UtilitiesApplication"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Developer Tools", url: "https://toolcraftkit.com/#developer-tools" },
          { name: "Password Generator", url: "https://toolcraftkit.com/tools/password-generator" },
        ]}
      />
      <h1 style={s.h1}>Password Generator</h1>
      <p style={s.sub}>Generate secure, random passwords. Everything runs in your browser.</p>
      <div style={s.card}>
        <div style={s.row}>
          <label style={{ ...s.label, marginBottom: 0, flex: "0 0 auto" }}>Length</label>
          <input type="range" min={4} max={64} value={length} onChange={(e) => setLength(+e.target.value)} style={s.slider} />
          <span style={s.badge}>{length}</span>
        </div>
        <div style={{ ...s.row, marginBottom: 14 }}>
          <label style={{ ...s.label, marginBottom: 0, flex: "0 0 auto" }}>Count</label>
          {[1, 3, 5, 10].map((n) => (
            <button key={n} onClick={() => setCount(n)} style={{ ...s.btnSm, background: count === n ? "#0D9488" : "#F5F5F4", color: count === n ? "#fff" : "#1C1917", border: count === n ? "1px solid #0D9488" : "1px solid #E7E5E4" }}>{n}</button>
          ))}
        </div>
        <div style={{ ...s.row, marginBottom: 16 }}>
          {Object.entries({ uppercase: "A-Z", lowercase: "a-z", numbers: "0-9", symbols: "!@#" }).map(([key, lbl]) => (
            <label key={key} style={s.check}>
              <input type="checkbox" checked={options[key]} onChange={() => setOptions((o) => ({ ...o, [key]: !o[key] }))} style={{ accentColor: "#0D9488" }} />
              {lbl}
            </label>
          ))}
        </div>
        <button onClick={regenerate} style={s.btn}>Generate Passwords</button>
      </div>
      <div style={s.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={s.label}>Generated Passwords</span>
          <button onClick={copyAll} style={s.btnSm}>{copied === -2 ? "Copied All" : "Copy All"}</button>
        </div>
        {passwords.map((pw, i) => {
          const str = getStrength(pw);
          return (
            <div key={i}>
              <div style={s.pwRow}>
                <span style={{ flex: 1 }}>{pw}</span>
                <button onClick={() => copy(pw, i)} style={{ ...s.btnSm, fontSize: 12, padding: "4px 10px" }}>{copied === i ? "Copied" : "Copy"}</button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, paddingLeft: 12 }}>
                <div style={{ ...s.meter, flex: 1, maxWidth: 120 }}><div style={{ height: "100%", width: str.pct+"%", background: str.color, borderRadius: 3, transition: "width 0.3s" }} /></div>
                <span style={{ fontSize: 11, color: str.color, fontWeight: 600 }}>{str.label}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>This password generator uses your browser&apos;s built-in cryptographic random number generator to create truly random passwords. No passwords are ever stored, transmitted, or logged.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>For maximum security, use passwords of at least 16 characters with all character types enabled. Use a unique password for every account and enable two-factor authentication whenever possible.</p>
      </div>
          <SeoContent />
    </div>
  );
}
