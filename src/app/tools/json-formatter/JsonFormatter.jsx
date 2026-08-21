"use client";
import { useState, useMemo, useCallback } from "react";

/* ─── BRAND TOKENS ─── */
const LIGHT = {
  primary: "#0D9488", primaryLight: "#14B8A6",
  bg: "#FAFAF9", surface: "#FFFFFF", surfaceAlt: "#F5F5F4",
  border: "#E7E5E4", text: "#1C1917", textMuted: "#78716C", textLight: "#A8A29E",
  success: "#10B981", danger: "#EF4444", warning: "#F59E0B",
  inputBg: "#FFFFFF", shadow: "0 1px 3px rgba(0,0,0,0.06)",
  synKey: "#0D9488", synStr: "#B45309", synNum: "#7C3AED", synBool: "#DC2626", synNull: "#78716C",
};
const DARK = {
  primary: "#2DD4BF", primaryLight: "#5EEAD4",
  bg: "#0C0A09", surface: "#1C1917", surfaceAlt: "#292524",
  border: "#3F3F46", text: "#FAFAF9", textMuted: "#A8A29E", textLight: "#78716C",
  success: "#34D399", danger: "#F87171", warning: "#FBBF24",
  inputBg: "#292524", shadow: "0 1px 3px rgba(0,0,0,0.3)",
  synKey: "#5EEAD4", synStr: "#FBBF24", synNum: "#A78BFA", synBool: "#F87171", synNull: "#78716C",
};

/* ─── SYNTAX HIGHLIGHT ─── */
function syntaxHighlight(json, theme) {
  if (!json) return "";
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
    let color = theme.synNum;
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        color = theme.synKey;
        match = match.replace(/:$/, "");
        return `<span style="color:${color}">${match}</span>:`;
      } else {
        color = theme.synStr;
      }
    } else if (/true|false/.test(match)) {
      color = theme.synBool;
    } else if (/null/.test(match)) {
      color = theme.synNull;
    }
    return `<span style="color:${color}">${match}</span>`;
  });
}

/* ─── JSON STATS ─── */
function getJsonStats(obj, path) {
  path = path || "";
  let stats = { keys: 0, strings: 0, numbers: 0, booleans: 0, nulls: 0, arrays: 0, objects: 0, depth: 0 };
  function traverse(val, d) {
    stats.depth = Math.max(stats.depth, d);
    if (val === null) { stats.nulls++; return; }
    if (typeof val === "string") { stats.strings++; return; }
    if (typeof val === "number") { stats.numbers++; return; }
    if (typeof val === "boolean") { stats.booleans++; return; }
    if (Array.isArray(val)) {
      stats.arrays++;
      val.forEach((item) => traverse(item, d + 1));
      return;
    }
    if (typeof val === "object") {
      stats.objects++;
      const keys = Object.keys(val);
      stats.keys += keys.length;
      keys.forEach((k) => traverse(val[k], d + 1));
    }
  }
  traverse(obj, 0);
  return stats;
}

/* ─── SAMPLE JSON ─── */
const SAMPLE = `{
  "name": "ToolCraftKit",
  "version": "1.0.0",
  "tools": [
    {
      "id": "word-counter",
      "category": "text",
      "popular": true
    },
    {
      "id": "json-formatter",
      "category": "dev",
      "popular": true
    }
  ],
  "config": {
    "theme": "auto",
    "analytics": true,
    "maxUploadSize": 5242880
  }
}`;

function FAQItem({ q, a, theme }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${theme.border}`, padding: "13px 0" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        width: "100%", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left",
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, lineHeight: 1.4, paddingRight: 16 }}>{q}</span>
        <span style={{ fontSize: 18, color: theme.textMuted, flexShrink: 0, transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s ease", lineHeight: 1 }}>+</span>
      </button>
      {open && <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.65, marginTop: 10, marginBottom: 0, paddingRight: 30 }}>{a}</p>}
    </div>
  );
}

function AdSlot({ position, theme }) {
  return (
    <div style={{
      border: `1px dashed ${theme.border}`, borderRadius: 8, padding: "12px",
      textAlign: "center", color: theme.textLight, fontSize: 11, fontStyle: "italic",
      background: theme.surfaceAlt, margin: position === "header" ? "0 0 20px" : "20px 0", opacity: 0.5,
    }}>Ad Slot — {position}</div>
  );
}

function StatCard({ label, value, theme }) {
  return (
    <div style={{
      background: theme.surface, borderRadius: 8, padding: "10px 14px",
      border: `1px solid ${theme.border}`, flex: "1 1 80px", minWidth: 0, textAlign: "center",
    }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: theme.primary }}>{value}</div>
      <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>{label}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════ */
export default function JsonFormatter() {
  const [dark, setDark] = useState(false);
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);
  const theme = dark ? DARK : LIGHT;

  const { output, error, parsed, stats } = useMemo(() => {
    if (!input.trim()) return { output: "", error: null, parsed: null, stats: null };
    try {
      const obj = JSON.parse(input);
      const formatted = JSON.stringify(obj, null, indent);
      return { output: formatted, error: null, parsed: obj, stats: getJsonStats(obj) };
    } catch (e) {
      const match = e.message.match(/position (\d+)/);
      return { output: "", error: e.message, parsed: null, stats: null, errorPos: match ? parseInt(match[1]) : null };
    }
  }, [input, indent]);

  const minified = useMemo(() => {
    if (!parsed) return "";
    return JSON.stringify(parsed);
  }, [parsed]);

  const copy = useCallback((text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, []);

  const loadSample = () => setInput(SAMPLE);

  const inputSize = new Blob([input]).size;
  const outputSize = output ? new Blob([output]).size : 0;
  const minifiedSize = minified ? new Blob([minified]).size : 0;

  const navItems = ["Text", "Writing", "Image", "Business", "Social", "Dev"];

  return (
    <div style={{
      minHeight: "100vh", background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <header style={{
        background: theme.surface, borderBottom: `1px solid ${theme.border}`,
        padding: "0 20px", height: 54, display: "flex", alignItems: "center",
        justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: theme.shadow,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 7,
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: dark ? "#0C0A09" : "#fff", fontSize: 15, fontWeight: 800,
          }}>T</div>
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Tool<span style={{ color: theme.primary }}>Craft</span>Kit
            <span style={{ color: theme.textLight, fontWeight: 400 }}>.com</span>
          </span>
        </div>
        <nav style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {navItems.map((item) => (
              <span key={item} style={{
                padding: "5px 10px", fontSize: 13, fontWeight: 500, borderRadius: 6,
                color: item === "Dev" ? theme.primary : theme.textMuted,
                background: item === "Dev" ? (dark ? "rgba(45,212,191,0.1)" : "rgba(13,148,136,0.06)") : "transparent",
                cursor: "pointer",
              }}>{item}</span>
            ))}
          </div>
          <button onClick={() => setDark(!dark)} style={{
            width: 34, height: 34, borderRadius: 8, border: `1px solid ${theme.border}`,
            background: theme.surfaceAlt, cursor: "pointer", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 8, color: theme.textMuted,
          }}>{dark ? "☀" : "☾"}</button>
        </nav>
      </header>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "24px 16px 60px" }}>

        <div style={{ fontSize: 12, color: theme.textLight, marginBottom: 14, display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ cursor: "pointer", color: theme.textMuted }}>Home</span><span>›</span>
          <span style={{ cursor: "pointer", color: theme.textMuted }}>Dev Tools</span><span>›</span>
          <span style={{ color: theme.primary, fontWeight: 500 }}>JSON Formatter</span>
        </div>

        <AdSlot position="header" theme={theme} />

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.03em" }}>JSON Formatter & Validator</h1>
          <p style={{ fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5 }}>
            Paste JSON to format, validate, and minify. Syntax highlighting, error detection, and structure stats.
          </p>
        </div>

        {/* INPUT */}
        <div style={{
          background: theme.surface, borderRadius: 12,
          border: `1.5px solid ${error && input.trim() ? theme.danger : theme.border}`,
          overflow: "hidden", marginBottom: 16, boxShadow: theme.shadow,
        }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here, or click "Load Sample" below...'
            style={{
              width: "100%", minHeight: 180, padding: "16px 18px",
              fontSize: 14, lineHeight: 1.6, color: theme.text,
              fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
              border: "none", outline: "none", resize: "vertical",
              background: "transparent", boxSizing: "border-box",
            }}
          />
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "8px 14px", background: theme.surfaceAlt,
            borderTop: `1px solid ${theme.border}`, fontSize: 12, flexWrap: "wrap", gap: 8,
          }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", color: theme.textLight }}>
              {input.trim() && !error && (
                <span style={{ color: theme.success, fontWeight: 600 }}>✓ Valid JSON</span>
              )}
              {input.trim() && error && (
                <span style={{ color: theme.danger, fontWeight: 600 }}>✗ Invalid JSON</span>
              )}
              {input.trim() && <span>{(inputSize / 1024).toFixed(1)} KB</span>}
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <button onClick={loadSample} style={{
                background: "none", border: "none", color: theme.primary,
                fontSize: 12, cursor: "pointer", padding: "3px 8px", borderRadius: 5, fontWeight: 500,
              }}>Load Sample</button>
              {input.length > 0 && (
                <button onClick={() => setInput("")} style={{
                  background: "none", border: "none", color: theme.danger,
                  fontSize: 12, cursor: "pointer", padding: "3px 8px", borderRadius: 5, fontWeight: 500,
                }}>Clear</button>
              )}
            </div>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && input.trim() && (
          <div style={{
            background: dark ? "rgba(248,113,113,0.1)" : "rgba(239,68,68,0.06)",
            border: `1px solid ${theme.danger}`, borderRadius: 10, padding: "14px 18px",
            marginBottom: 16, fontSize: 13, color: theme.danger, fontFamily: "'Consolas', monospace",
            lineHeight: 1.5,
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* CONTROLS + OUTPUT */}
        {output && (
          <>
            {/* Controls */}
            <div style={{
              display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap", alignItems: "center",
            }}>
              <span style={{ fontSize: 12, color: theme.textMuted, fontWeight: 500 }}>Indent:</span>
              {[2, 4, 8].map((n) => (
                <button key={n} onClick={() => setIndent(n)} style={{
                  padding: "5px 12px", fontSize: 12, fontWeight: indent === n ? 600 : 500,
                  color: indent === n ? theme.primary : theme.textMuted,
                  background: indent === n ? (dark ? "rgba(45,212,191,0.1)" : "rgba(13,148,136,0.08)") : theme.surfaceAlt,
                  border: `1px solid ${indent === n ? theme.primary : theme.border}`,
                  borderRadius: 6, cursor: "pointer",
                }}>{n} spaces</button>
              ))}
              <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
                <button onClick={() => copy(output)} style={{
                  padding: "5px 12px", fontSize: 12, fontWeight: 500,
                  color: theme.textMuted, background: theme.surfaceAlt,
                  border: `1px solid ${theme.border}`, borderRadius: 6, cursor: "pointer",
                }}>{copied ? "✓ Copied" : "Copy Formatted"}</button>
                <button onClick={() => copy(minified)} style={{
                  padding: "5px 12px", fontSize: 12, fontWeight: 500,
                  color: theme.textMuted, background: theme.surfaceAlt,
                  border: `1px solid ${theme.border}`, borderRadius: 6, cursor: "pointer",
                }}>Copy Minified</button>
              </div>
            </div>

            {/* Formatted output */}
            <div style={{
              background: theme.surface, borderRadius: 12, overflow: "hidden",
              border: `1px solid ${theme.border}`, marginBottom: 16, boxShadow: theme.shadow,
            }}>
              <div style={{
                padding: "16px 18px", maxHeight: 500, overflowY: "auto", overflowX: "auto",
              }}>
                <pre
                  style={{
                    margin: 0, fontSize: 13, lineHeight: 1.7,
                    fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
                    whiteSpace: "pre", color: theme.text,
                  }}
                  dangerouslySetInnerHTML={{ __html: syntaxHighlight(output, theme) }}
                />
              </div>
              <div style={{
                display: "flex", gap: 16, padding: "8px 14px", background: theme.surfaceAlt,
                borderTop: `1px solid ${theme.border}`, fontSize: 11, color: theme.textLight,
              }}>
                <span>Formatted: {(outputSize / 1024).toFixed(1)} KB</span>
                <span>Minified: {(minifiedSize / 1024).toFixed(1)} KB</span>
                <span>Saved: {outputSize > 0 ? ((1 - minifiedSize / outputSize) * 100).toFixed(0) : 0}%</span>
              </div>
            </div>

            {/* Stats */}
            {stats && (
              <div style={{
                display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20,
              }}>
                <StatCard label="Keys" value={stats.keys} theme={theme} />
                <StatCard label="Strings" value={stats.strings} theme={theme} />
                <StatCard label="Numbers" value={stats.numbers} theme={theme} />
                <StatCard label="Booleans" value={stats.booleans} theme={theme} />
                <StatCard label="Nulls" value={stats.nulls} theme={theme} />
                <StatCard label="Arrays" value={stats.arrays} theme={theme} />
                <StatCard label="Objects" value={stats.objects} theme={theme} />
                <StatCard label="Depth" value={stats.depth} theme={theme} />
              </div>
            )}
          </>
        )}

        <AdSlot position="middle" theme={theme} />

        {/* SEO */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em" }}>How to Use This JSON Formatter</h2>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            Paste your JSON into the input box. The tool instantly validates it and shows a formatted, syntax-highlighted version. If there are errors, you get the exact error message with the position where parsing failed.
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            Choose your indent level (2, 4, or 8 spaces). Copy the formatted version for readability or the minified version for production. The stats bar shows the structure of your JSON — how many keys, values, arrays, and objects it contains, plus the nesting depth.
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: 0 }}>
            Useful for debugging API responses, cleaning up config files, validating data before sending, and making minified JSON readable. Everything runs in your browser — no data is ever sent to any server.
          </p>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme} q="What is JSON?" a="JSON (JavaScript Object Notation) is a lightweight data format used to exchange data between servers and web applications. It uses key-value pairs and arrays to structure data. Nearly every programming language can read and write JSON, making it the most common API response format." />
          <FAQItem theme={theme} q="What does 'minified' JSON mean?" a="Minified JSON has all unnecessary whitespace, line breaks, and indentation removed. It reduces file size for faster network transmission. The data is identical — only the formatting changes. Use minified JSON in production and formatted JSON for debugging." />
          <FAQItem theme={theme} q="Why is my JSON invalid?" a="Common JSON errors include: missing or extra commas, unquoted keys (keys must be in double quotes), single quotes instead of double quotes, trailing commas after the last item, and unescaped special characters in strings. This tool shows the exact error position to help you fix it." />
          <FAQItem theme={theme} q="What is the maximum JSON size this tool can handle?" a="This tool runs in your browser, so it can handle JSON files up to several megabytes without issues. For very large files (10MB+), performance may slow down depending on your device. There is no server-side limit since nothing is uploaded." />
          <FAQItem theme={theme} q="Can I use this to validate an API response?" a="Yes. Copy the JSON response from your API client (Postman, curl, browser DevTools) and paste it here. The tool will tell you immediately if it is valid JSON and show you the formatted structure." />
          <FAQItem theme={theme} q="Does this tool store my data?" a="No. All processing happens entirely in your browser. Your JSON is never uploaded, logged, or stored on any server. Safe for use with sensitive or proprietary data." />
        </section>

        <AdSlot position="footer" theme={theme} />

        <footer style={{
          marginTop: 32, paddingTop: 20, borderTop: `1px solid ${theme.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8,
        }}>
          <span style={{ fontSize: 12, color: theme.textLight }}>© 2026 ToolCraftKit.com — Free tools for creators and entrepreneurs.</span>
          <div style={{ display: "flex", gap: 14, fontSize: 12, color: theme.textMuted }}>
            <span style={{ cursor: "pointer" }}>Privacy</span>
            <span style={{ cursor: "pointer" }}>Terms</span>
            <span style={{ cursor: "pointer" }}>Contact</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
