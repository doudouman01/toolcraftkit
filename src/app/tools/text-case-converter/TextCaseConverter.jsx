"use client";
import { useState, useCallback } from "react";

/* ─── BRAND TOKENS ─── */
const LIGHT = {
  primary: "#0D9488", primaryLight: "#14B8A6", primaryDark: "#0F766E",
  accent: "#F59E0B", bg: "#FAFAF9", surface: "#FFFFFF", surfaceAlt: "#F5F5F4",
  border: "#E7E5E4", text: "#1C1917", textMuted: "#78716C", textLight: "#A8A29E",
  success: "#10B981", warning: "#F59E0B", danger: "#EF4444",
  inputBg: "#FFFFFF", shadow: "0 1px 3px rgba(0,0,0,0.06)",
};
const DARK = {
  primary: "#2DD4BF", primaryLight: "#5EEAD4", primaryDark: "#14B8A6",
  accent: "#FBBF24", bg: "#0C0A09", surface: "#1C1917", surfaceAlt: "#292524",
  border: "#3F3F46", text: "#FAFAF9", textMuted: "#A8A29E", textLight: "#78716C",
  success: "#34D399", warning: "#FBBF24", danger: "#F87171",
  inputBg: "#292524", shadow: "0 1px 3px rgba(0,0,0,0.3)",
};

/* ─── CASE CONVERSIONS ─── */
const conversions = [
  {
    id: "upper", label: "UPPERCASE", desc: "ALL CAPS",
    fn: (t) => t.toUpperCase(),
  },
  {
    id: "lower", label: "lowercase", desc: "all lowercase",
    fn: (t) => t.toLowerCase(),
  },
  {
    id: "title", label: "Title Case", desc: "Capitalize Each Word",
    fn: (t) => t.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
  },
  {
    id: "sentence", label: "Sentence case", desc: "First letter of each sentence",
    fn: (t) => {
      return t.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
    },
  },
  {
    id: "capitalize", label: "Capitalize Words", desc: "First Letter Of Every Word",
    fn: (t) => t.replace(/\b\w/g, (c) => c.toUpperCase()),
  },
  {
    id: "alternating", label: "aLtErNaTiNg CaSe", desc: "Every other letter",
    fn: (t) => {
      let i = 0;
      return t.split("").map((c) => {
        if (/[a-zA-Z]/.test(c)) {
          return i++ % 2 === 0 ? c.toLowerCase() : c.toUpperCase();
        }
        return c;
      }).join("");
    },
  },
  {
    id: "inverse", label: "iNVERSE cASE", desc: "Swap upper and lower",
    fn: (t) => t.split("").map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(""),
  },
  {
    id: "camel", label: "camelCase", desc: "For programming variables",
    fn: (t) => {
      const words = t.replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/).filter(Boolean);
      return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
    },
  },
  {
    id: "pascal", label: "PascalCase", desc: "For class names",
    fn: (t) => {
      const words = t.replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/).filter(Boolean);
      return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
    },
  },
  {
    id: "snake", label: "snake_case", desc: "For Python variables",
    fn: (t) => t.replace(/[^a-zA-Z0-9\s]/g, "").trim().replace(/\s+/g, "_").toLowerCase(),
  },
  {
    id: "kebab", label: "kebab-case", desc: "For URLs and CSS",
    fn: (t) => t.replace(/[^a-zA-Z0-9\s]/g, "").trim().replace(/\s+/g, "-").toLowerCase(),
  },
  {
    id: "constant", label: "CONSTANT_CASE", desc: "For constants",
    fn: (t) => t.replace(/[^a-zA-Z0-9\s]/g, "").trim().replace(/\s+/g, "_").toUpperCase(),
  },
  {
    id: "dot", label: "dot.case", desc: "Dot separated",
    fn: (t) => t.replace(/[^a-zA-Z0-9\s]/g, "").trim().replace(/\s+/g, ".").toLowerCase(),
  },
  {
    id: "path", label: "path/case", desc: "Path separated",
    fn: (t) => t.replace(/[^a-zA-Z0-9\s]/g, "").trim().replace(/\s+/g, "/").toLowerCase(),
  },
];

/* ─── FAQ ─── */
function FAQItem({ q, a, theme }) {
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
      {open && (
        <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.65, marginTop: 10, marginBottom: 0, paddingRight: 30 }}>{a}</p>
      )}
    </div>
  );
}

/* ─── AD SLOT ─── */
function AdSlot({ position, theme }) {
  return (
    <div style={{
      border: `1px dashed ${theme.border}`, borderRadius: 8,
      padding: "12px", textAlign: "center", color: theme.textLight,
      fontSize: 11, fontStyle: "italic", background: theme.surfaceAlt,
      margin: position === "header" ? "0 0 20px" : "20px 0", opacity: 0.5,
    }}>Ad Slot — {position}</div>
  );
}

/* ─── CONVERSION CARD ─── */
function ConversionCard({ conversion, text, theme }) {
  const [copied, setCopied] = useState(false);
  const result = text ? conversion.fn(text) : "";

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  return (
    <div style={{
      background: theme.surface, borderRadius: 10, padding: "14px 16px",
      border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8,
      }}>
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{conversion.label}</span>
          <span style={{ fontSize: 11, color: theme.textLight, marginLeft: 8 }}>{conversion.desc}</span>
        </div>
        <button onClick={copy} style={{
          background: copied ? theme.success : theme.surfaceAlt,
          border: `1px solid ${copied ? theme.success : theme.border}`,
          color: copied ? "#fff" : theme.textMuted,
          fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 5,
          cursor: result ? "pointer" : "default", transition: "all 0.2s ease",
          opacity: result ? 1 : 0.4,
        }}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <div style={{
        fontSize: 14, color: result ? theme.text : theme.textLight,
        fontFamily: conversion.id === "camel" || conversion.id === "pascal" || conversion.id === "snake" || conversion.id === "kebab" || conversion.id === "constant" || conversion.id === "dot" || conversion.id === "path"
          ? "'Consolas', 'Monaco', monospace"
          : "'Inter', system-ui, sans-serif",
        lineHeight: 1.6, wordBreak: "break-word",
        maxHeight: 80, overflow: "hidden",
        fontStyle: result ? "normal" : "italic",
      }}>
        {result || "Type text above to see result..."}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function TextCaseConverter() {
  const [text, setText] = useState("");
  const [dark, setDark] = useState(false);
  const [focused, setFocused] = useState(false);
  const [filter, setFilter] = useState("all");
  const theme = dark ? DARK : LIGHT;

  const textCases = conversions.filter((c) => {
    if (filter === "all") return true;
    if (filter === "text") return ["upper", "lower", "title", "sentence", "capitalize", "alternating", "inverse"].includes(c.id);
    if (filter === "code") return ["camel", "pascal", "snake", "kebab", "constant", "dot", "path"].includes(c.id);
    return true;
  });

  const navItems = ["Text", "Writing", "Image", "Business", "Social", "Dev"];

  return (
    <div style={{
      minHeight: "100vh", background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      {/* HEADER */}
      <header style={{
        background: theme.surface, borderBottom: `1px solid ${theme.border}`,
        padding: "0 20px", height: 54, display: "flex", alignItems: "center",
        justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100,
        boxShadow: theme.shadow,
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
                color: item === "Text" ? theme.primary : theme.textMuted,
                background: item === "Text" ? (dark ? "rgba(45,212,191,0.1)" : "rgba(13,148,136,0.06)") : "transparent",
                cursor: "pointer",
              }}>{item}</span>
            ))}
          </div>
          <button onClick={() => setDark(!dark)} style={{
            width: 34, height: 34, borderRadius: 8, border: `1px solid ${theme.border}`,
            background: theme.surfaceAlt, cursor: "pointer", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginLeft: 8, color: theme.textMuted,
          }}>{dark ? "☀" : "☾"}</button>
        </nav>
      </header>

      {/* MAIN */}
      <main style={{ maxWidth: 880, margin: "0 auto", padding: "24px 16px 60px" }}>

        {/* Breadcrumb */}
        <div style={{
          fontSize: 12, color: theme.textLight, marginBottom: 14,
          display: "flex", gap: 6, alignItems: "center",
        }}>
          <span style={{ cursor: "pointer", color: theme.textMuted }}>Home</span><span>›</span>
          <span style={{ cursor: "pointer", color: theme.textMuted }}>Text Tools</span><span>›</span>
          <span style={{ color: theme.primary, fontWeight: 500 }}>Text Case Converter</span>
        </div>

        <AdSlot position="header" theme={theme} />

        {/* Title */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Text Case Converter
          </h1>
          <p style={{ fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5 }}>
            Convert text between uppercase, lowercase, title case, camelCase, snake_case, and 11 more formats. One click to copy any result.
          </p>
        </div>

        {/* TEXTAREA */}
        <div style={{
          background: theme.surface, borderRadius: 12,
          border: `1.5px solid ${focused ? theme.primary : theme.border}`,
          overflow: "hidden", marginBottom: 20,
          transition: "border-color 0.2s ease",
          boxShadow: focused ? `0 0 0 3px ${dark ? "rgba(45,212,191,0.15)" : "rgba(13,148,136,0.1)"}` : theme.shadow,
        }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Type or paste your text here to convert..."
            style={{
              width: "100%", minHeight: 140, padding: "16px 18px",
              fontSize: 15, lineHeight: 1.7, color: theme.text,
              fontFamily: "'Inter', system-ui, sans-serif",
              border: "none", outline: "none", resize: "vertical",
              background: "transparent", boxSizing: "border-box",
            }}
          />
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "8px 14px", background: theme.surfaceAlt,
            borderTop: `1px solid ${theme.border}`, fontSize: 12, flexWrap: "wrap", gap: 8,
          }}>
            <div style={{ display: "flex", gap: 14, color: theme.textLight }}>
              <span><strong style={{ color: theme.text }}>{text.length.toLocaleString()}</strong> characters</span>
              <span><strong style={{ color: theme.text }}>{(text.match(/\S+/g) || []).length.toLocaleString()}</strong> words</span>
            </div>
            {text.length > 0 && (
              <button onClick={() => setText("")} style={{
                background: "none", border: "none", color: theme.danger,
                fontSize: 12, cursor: "pointer", padding: "3px 8px", borderRadius: 5, fontWeight: 500,
              }}>Clear</button>
            )}
          </div>
        </div>

        {/* FILTER TABS */}
        <div style={{
          display: "flex", gap: 4, marginBottom: 16,
          background: theme.surfaceAlt, padding: 4, borderRadius: 10,
        }}>
          {[
            { key: "all", label: "All Formats" },
            { key: "text", label: "Text" },
            { key: "code", label: "Code" },
          ].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{
              padding: "7px 14px", fontSize: 13,
              fontWeight: filter === f.key ? 600 : 500,
              color: filter === f.key ? theme.primary : theme.textMuted,
              background: filter === f.key ? (dark ? "rgba(45,212,191,0.1)" : "rgba(13,148,136,0.08)") : "transparent",
              border: "none", borderRadius: 7, cursor: "pointer",
            }}>{f.label}</button>
          ))}
        </div>

        {/* CONVERSION CARDS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {textCases.map((conv) => (
            <ConversionCard key={conv.id} conversion={conv} text={text} theme={theme} />
          ))}
        </div>

        <AdSlot position="middle" theme={theme} />

        {/* SEO CONTENT */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            How to Use This Text Case Converter
          </h2>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            Type or paste your text in the input box. All 14 case conversions are generated instantly and displayed below. Click the Copy button on any result to copy it to your clipboard. Use the filter tabs to switch between text formats (uppercase, lowercase, title case) and code formats (camelCase, snake_case, kebab-case).
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: 0 }}>
            This tool is useful for writers who need to fix capitalization, developers who need to convert variable names between naming conventions, SEO professionals who need to format titles, and anyone working with text formatting. Everything runs in your browser — no data is ever sent to a server.
          </p>
        </section>

        {/* CASE REFERENCE TABLE */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            When to Use Each Case
          </h2>
          <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${theme.border}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: 13 }}>
              {[["Case", "Example", "Used For"],
                ["UPPERCASE", "HELLO WORLD", "Headlines, acronyms, emphasis"],
                ["lowercase", "hello world", "URLs, email, casual text"],
                ["Title Case", "Hello World", "Headlines, book titles, H1 tags"],
                ["Sentence case", "Hello world", "Normal text, paragraphs"],
                ["camelCase", "helloWorld", "JavaScript variables, JSON keys"],
                ["PascalCase", "HelloWorld", "Class names, React components"],
                ["snake_case", "hello_world", "Python variables, database columns"],
                ["kebab-case", "hello-world", "URLs, CSS classes, file names"],
                ["CONSTANT_CASE", "HELLO_WORLD", "Constants, environment variables"],
              ].map((row, i) => (
                <div key={i} style={{ display: "contents" }}>
                  {row.map((cell, j) => (
                    <div key={j} style={{
                      padding: "9px 14px",
                      fontWeight: i === 0 ? 600 : j === 0 ? 500 : 400,
                      color: i === 0 ? theme.text : j === 1 ? theme.primary : theme.textMuted,
                      fontFamily: j === 1 && i > 0 && i > 4 ? "'Consolas', 'Monaco', monospace" : "inherit",
                      background: i === 0 ? theme.surfaceAlt : theme.surface,
                      borderBottom: i < 9 ? `1px solid ${theme.border}` : "none",
                      fontSize: j === 1 ? 12 : 13,
                    }}>{cell}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
            Frequently Asked Questions
          </h2>
          <FAQItem theme={theme}
            q="What is title case?"
            a="Title case capitalizes the first letter of every major word. Minor words like 'and', 'the', 'in', and 'of' are usually kept lowercase unless they start the title. This tool capitalizes every first letter for simplicity, which is the most common web convention."
          />
          <FAQItem theme={theme}
            q="What is the difference between camelCase and PascalCase?"
            a="Both join words without spaces and capitalize the start of each word. The difference is the first letter: camelCase starts lowercase (myVariable), PascalCase starts uppercase (MyVariable). In JavaScript, camelCase is used for variables and functions, PascalCase for classes and React components."
          />
          <FAQItem theme={theme}
            q="When should I use snake_case vs kebab-case?"
            a="snake_case uses underscores and is the standard in Python, Ruby, and most databases. kebab-case uses hyphens and is standard for URLs, CSS class names, and file names. Use whichever your language or framework expects."
          />
          <FAQItem theme={theme}
            q="Can I convert text between programming naming conventions?"
            a="Yes. This tool supports camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, and path/case. Type your text naturally and click Copy on whichever format you need."
          />
          <FAQItem theme={theme}
            q="Does this tool preserve special characters?"
            a="For text conversions (uppercase, lowercase, title case), all characters including accents and special characters are preserved. For programming formats (camelCase, snake_case), special characters are removed since they are not valid in most variable names."
          />
          <FAQItem theme={theme}
            q="Does this tool store my text?"
            a="No. All conversions happen in your browser. Your text is never sent to any server."
          />
        </section>

        <AdSlot position="footer" theme={theme} />

        {/* FOOTER */}
        <footer style={{
          marginTop: 32, paddingTop: 20, borderTop: `1px solid ${theme.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 8,
        }}>
          <span style={{ fontSize: 12, color: theme.textLight }}>
            © 2026 ToolCraftKit.com — Free tools for creators and entrepreneurs.
          </span>
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
