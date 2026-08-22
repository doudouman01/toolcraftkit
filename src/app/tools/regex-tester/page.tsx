"use client";
import { useState, useMemo } from "react";

const PRESETS = [
  { label: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", flags: "g" },
  { label: "URL", pattern: "https?://[\\w.-]+(?:\\.[a-zA-Z]{2,})(?:/[\\w./?%&=-]*)?", flags: "g" },
  { label: "Phone", pattern: "\\+?\\d{1,4}[-.\\s]?\\(?\\d{1,4}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}", flags: "g" },
  { label: "IPv4", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", flags: "g" },
  { label: "Hex Color", pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b", flags: "g" },
  { label: "Date (YYYY-MM-DD)", pattern: "\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])", flags: "g" },
];

export default function Page() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("");
  const [replace, setReplace] = useState("");
  const [showReplace, setShowReplace] = useState(false);
  const [copied, setCopied] = useState("");

  const { regex, error, matches, highlighted, replaced } = useMemo(() => {
    if (!pattern) return { regex: null, error: null, matches: [], highlighted: testStr, replaced: "" };
    try {
      const re = new RegExp(pattern, flags);
      const m: { text: string; index: number; groups?: Record<string, string> }[] = [];
      let match;
      const seen = new Set<number>();
      const re2 = new RegExp(pattern, flags);
      while ((match = re2.exec(testStr)) !== null) {
        if (seen.has(match.index)) break;
        seen.add(match.index);
        m.push({ text: match[0], index: match.index, groups: match.groups });
        if (!flags.includes("g")) break;
      }
      // Build highlighted string
      let html = "";
      let last = 0;
      const colors = ["#CCFBF1", "#FEF3C7", "#DBEAFE", "#FCE7F3", "#E0E7FF", "#FEE2E2"];
      m.forEach((mt, i) => {
        html += escapeHtml(testStr.slice(last, mt.index));
        html += `<mark style="background:${colors[i % colors.length]};border-radius:3px;padding:1px 2px">${escapeHtml(mt.text)}</mark>`;
        last = mt.index + mt.text.length;
      });
      html += escapeHtml(testStr.slice(last));

      let rep = "";
      if (showReplace) { try { rep = testStr.replace(re, replace); } catch { rep = ""; } }

      return { regex: re, error: null, matches: m, highlighted: html, replaced: rep };
    } catch (e: unknown) {
      return { regex: null, error: (e as Error).message, matches: [], highlighted: escapeHtml(testStr), replaced: "" };
    }
  }, [pattern, flags, testStr, replace, showReplace]);

  const copy = (val: string, key: string) => { navigator.clipboard.writeText(val); setCopied(key); setTimeout(() => setCopied(""), 1500); };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    row: { display: "flex" as const, alignItems: "center" as const, gap: 8, marginBottom: 14, flexWrap: "wrap" as const },
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", fontFamily: "'Courier New', monospace" } as const,
    ta: { width: "100%", minHeight: 120, border: "1px solid #E7E5E4", borderRadius: 8, padding: 12, fontSize: 14, fontFamily: "'Courier New', monospace", resize: "vertical" as const, outline: "none", lineHeight: 1.6 } as const,
    check: { display: "flex" as const, alignItems: "center" as const, gap: 6, cursor: "pointer", fontSize: 13, color: "#1C1917" } as const,
  };

  const flagOptions = [
    { key: "g", label: "Global (g)" },
    { key: "i", label: "Case insensitive (i)" },
    { key: "m", label: "Multiline (m)" },
    { key: "s", label: "Dotall (s)" },
  ];

  const toggleFlag = (f: string) => {
    setFlags((prev) => prev.includes(f) ? prev.replace(f, "") : prev + f);
  };

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Regex Tester</h1>
      <p style={s.sub}>Test regular expressions with live highlighting and match details.</p>

      <div style={s.card}>
        <div style={s.row}>
          <span style={{ fontSize: 12, color: "#78716C" }}>Presets:</span>
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => { setPattern(p.pattern); setFlags(p.flags); }} style={s.btnSm}>{p.label}</button>
          ))}
        </div>

        <label style={s.label}>Regular Expression</label>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
          <span style={{ fontSize: 18, color: "#A8A29E" }}>/</span>
          <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="[a-z]+" style={{ ...s.input, flex: 1 }} />
          <span style={{ fontSize: 18, color: "#A8A29E" }}>/</span>
          <input type="text" value={flags} onChange={(e) => setFlags(e.target.value)} style={{ ...s.input, width: 48, textAlign: "center" }} />
        </div>

        {error && <div style={{ color: "#EF4444", fontSize: 13, marginBottom: 10, padding: "6px 10px", background: "#FEF2F2", borderRadius: 6 }}>{error}</div>}

        <div style={{ ...s.row, marginBottom: 16 }}>
          {flagOptions.map((fo) => (
            <label key={fo.key} style={s.check}>
              <input type="checkbox" checked={flags.includes(fo.key)} onChange={() => toggleFlag(fo.key)} style={{ accentColor: "#0D9488" }} />
              {fo.label}
            </label>
          ))}
        </div>

        <label style={s.label}>Test String</label>
        <textarea value={testStr} onChange={(e) => setTestStr(e.target.value)} placeholder="Enter text to test your regex against..." style={s.ta} />

        {testStr && pattern && !error && (
          <div style={{ marginTop: 12 }}>
            <label style={s.label}>Matches Highlighted</label>
            <div style={{ ...s.ta, minHeight: 80, background: "#FAFAF9", whiteSpace: "pre-wrap", wordBreak: "break-all" }} dangerouslySetInnerHTML={{ __html: highlighted }} />
          </div>
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center" }}>
          <label style={s.check}>
            <input type="checkbox" checked={showReplace} onChange={() => setShowReplace(!showReplace)} style={{ accentColor: "#0D9488" }} />
            Replace mode
          </label>
        </div>

        {showReplace && (
          <div style={{ marginTop: 12 }}>
            <label style={s.label}>Replace With</label>
            <input type="text" value={replace} onChange={(e) => setReplace(e.target.value)} placeholder="replacement text ($1, $2 for groups)" style={s.input} />
            {replaced && (
              <div style={{ marginTop: 10 }}>
                <label style={s.label}>Result</label>
                <textarea value={replaced} readOnly style={{ ...s.ta, minHeight: 80, background: "#F0FDFA" }} />
                <button onClick={() => copy(replaced, "replaced")} style={{ ...s.btnSm, marginTop: 6 }}>{copied === "replaced" ? "Copied!" : "Copy Result"}</button>
              </div>
            )}
          </div>
        )}
      </div>

      {matches.length > 0 && (
        <div style={s.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={s.label}>{matches.length} Match{matches.length !== 1 ? "es" : ""}</span>
            <button onClick={() => copy(matches.map((m) => m.text).join("\n"), "all")} style={s.btnSm}>{copied === "all" ? "Copied!" : "Copy All Matches"}</button>
          </div>
          <div style={{ maxHeight: 240, overflowY: "auto" }}>
            {matches.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 6, background: i % 2 === 0 ? "#FAFAF9" : "#fff", marginBottom: 2 }}>
                <span style={{ fontSize: 11, color: "#A8A29E", minWidth: 24 }}>#{i + 1}</span>
                <span style={{ fontFamily: "'Courier New', monospace", fontSize: 13, flex: 1, color: "#1C1917" }}>{m.text}</span>
                <span style={{ fontSize: 11, color: "#A8A29E" }}>@{m.index}</span>
                <button onClick={() => copy(m.text, String(i))} style={{ ...s.btnSm, fontSize: 11, padding: "2px 6px" }}>{copied === String(i) ? "✓" : "Copy"}</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>Test and debug regular expressions with live syntax highlighting. See every match with its position, use common presets for emails, URLs, and phone numbers, and test replacements with capture group references.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>This regex tester uses JavaScript regex syntax. All processing happens in your browser — nothing is sent to any server.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "Which regex flavor does this use?", a: "This tool uses JavaScript (ECMAScript) regular expressions, which are supported by all modern browsers, Node.js, and many other languages." },
          { q: "What do the flags mean?", a: "g = find all matches (not just the first), i = case-insensitive, m = treat ^ and $ as line boundaries, s = make . match newlines too." },
          { q: "How do I use capture groups in replacements?", a: "Use $1, $2, etc. to reference captured groups. Named groups use $<name>. $& inserts the entire match. $` and $' insert text before/after the match." },
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

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
