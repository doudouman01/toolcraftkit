"use client";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";

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

/* ─── PLATFORM LIMITS ─── */
const PLATFORMS = [
  { name: "X / Twitter", limit: 280, icon: "𝕏", desc: "Post limit" },
  { name: "Instagram Bio", limit: 150, icon: "◷", desc: "Bio only" },
  { name: "Instagram Caption", limit: 2200, icon: "◷", desc: "Post caption" },
  { name: "Meta Description", limit: 160, icon: "◎", desc: "SEO snippet" },
  { name: "Google Title Tag", limit: 60, icon: "G", desc: "Page title" },
  { name: "LinkedIn Post", limit: 3000, icon: "in", desc: "Feed post" },
  { name: "YouTube Title", limit: 100, icon: "▶", desc: "Video title" },
  { name: "YouTube Description", limit: 5000, icon: "▶", desc: "Video desc" },
  { name: "Pinterest Pin", limit: 500, icon: "P", desc: "Pin description" },
  { name: "TikTok Caption", limit: 2200, icon: "♪", desc: "Video caption" },
  { name: "Facebook Post", limit: 63206, icon: "f", desc: "Feed post" },
  { name: "SMS", limit: 160, icon: "✉", desc: "Single message" },
];

/* ─── ANALYSIS ─── */
function analyze(text) {
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const words = text.match(/\S+/g) || [];
  const wordCount = words.length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = text.trim() ? (sentences.length || 1) : 0;
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const paragraphCount = text.trim() ? (paragraphs.length || 1) : 0;
  const lines = text.split(/\n/);
  const lineCount = text.trim() ? lines.length : 0;

  const letters = (text.match(/[a-zA-ZÀ-ÿ]/g) || []).length;
  const digits = (text.match(/[0-9]/g) || []).length;
  const spaces = (text.match(/\s/g) || []).length;
  const punctuation = (text.match(/[^\w\s]/g) || []).length;
  const uppercase = (text.match(/[A-ZÀ-Ý]/g) || []).length;
  const lowercase = (text.match(/[a-zà-ÿ]/g) || []).length;

  return {
    chars, charsNoSpaces, words: wordCount, sentences: sentenceCount,
    paragraphs: paragraphCount, lines: lineCount,
    letters, digits, spaces, punctuation, uppercase, lowercase,
  };
}

/* ─── STAT CARD ─── */
function StatCard({ label, value, sub, theme }) {
  return (
    <div style={{
      background: theme.surface, borderRadius: 10, padding: "14px 16px",
      border: `1px solid ${theme.border}`, flex: "1 1 120px", minWidth: 0,
      boxShadow: theme.shadow,
    }}>
      <div style={{
        fontSize: 26, fontWeight: 700, color: theme.text,
        letterSpacing: "-0.02em", lineHeight: 1.2,
      }}>{typeof value === "number" ? value.toLocaleString() : value}</div>
      <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 3, fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: theme.textLight, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

/* ─── CHARACTER GOAL ─── */
function CharGoal({ current, theme }) {
  const [goal, setGoal] = useState("");
  const target = parseInt(goal) || 0;
  const pct = target > 0 ? Math.min(100, (current / target) * 100) : 0;
  const reached = target > 0 && current >= target;
  const over = target > 0 && current > target;
  return (
    <div style={{
      background: theme.surface, borderRadius: 10, padding: "14px 16px",
      border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: theme.textMuted, fontWeight: 500 }}>Character Limit</span>
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. 280"
          style={{
            width: 80, padding: "4px 8px", fontSize: 13, borderRadius: 6,
            border: `1px solid ${theme.border}`, background: theme.inputBg,
            color: theme.text, outline: "none", marginLeft: "auto",
          }}
          onFocus={(e) => e.target.style.borderColor = theme.primary}
          onBlur={(e) => e.target.style.borderColor = theme.border}
        />
      </div>
      <div style={{ height: 8, borderRadius: 4, background: theme.surfaceAlt, overflow: "hidden" }}>
        <div style={{
          width: `${pct}%`, height: "100%", borderRadius: 4,
          background: over ? theme.danger : reached ? theme.success : theme.primary,
          transition: "width 0.3s ease, background 0.3s ease",
        }} />
      </div>
      <div style={{
        fontSize: 11, marginTop: 6, fontWeight: 500,
        color: over ? theme.danger : reached ? theme.success : theme.textLight,
      }}>
        {target > 0
          ? over
            ? `⚠ Over limit! ${current.toLocaleString()} / ${target.toLocaleString()} (+${(current - target).toLocaleString()})`
            : reached
            ? `✓ At limit: ${current.toLocaleString()} / ${target.toLocaleString()}`
            : `${current.toLocaleString()} / ${target.toLocaleString()} (${(target - current).toLocaleString()} remaining)`
          : "Set a limit to track characters"
        }
      </div>
    </div>
  );
}

/* ─── PLATFORM LIMITS ─── */
function PlatformLimits({ charCount, theme }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {PLATFORMS.map((p) => {
        const pct = Math.min(100, (charCount / p.limit) * 100);
        const over = charCount > p.limit;
        return (
          <div key={p.name} style={{
            display: "flex", alignItems: "center", gap: 10, fontSize: 12,
          }}>
            <span style={{
              width: 22, height: 22, borderRadius: 5,
              background: theme.surfaceAlt, display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700, color: theme.textMuted, flexShrink: 0,
            }}>{p.icon}</span>
            <span style={{
              width: 130, color: theme.textMuted, fontWeight: 500, flexShrink: 0,
            }}>{p.name}</span>
            <div style={{
              flex: 1, height: 5, borderRadius: 3, background: theme.surfaceAlt,
              overflow: "hidden", minWidth: 40,
            }}>
              <div style={{
                width: `${pct}%`, height: "100%", borderRadius: 3,
                background: over ? theme.danger : pct > 80 ? theme.warning : theme.primary,
                transition: "width 0.3s ease",
              }} />
            </div>
            <span style={{
              minWidth: 80, textAlign: "right", fontWeight: 500, fontVariantNumeric: "tabular-nums",
              color: over ? theme.danger : theme.textLight, fontSize: 11,
            }}>
              {charCount.toLocaleString()} / {p.limit.toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── CHARACTER BREAKDOWN ─── */
function CharBreakdown({ stats, theme }) {
  const items = [
    { label: "Letters", value: stats.letters, color: theme.primary },
    { label: "Digits", value: stats.digits, color: theme.accent },
    { label: "Spaces", value: stats.spaces, color: theme.textMuted },
    { label: "Punctuation", value: stats.punctuation, color: theme.danger },
  ];
  const total = stats.chars || 1;
  return (
    <div>
      <div style={{
        display: "flex", height: 10, borderRadius: 5, overflow: "hidden",
        background: theme.surfaceAlt, marginBottom: 12,
      }}>
        {items.map((item) => (
          <div key={item.label} style={{
            width: `${(item.value / total) * 100}%`,
            background: item.color, transition: "width 0.3s ease",
            minWidth: item.value > 0 ? 2 : 0,
          }} />
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {items.map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%", background: item.color,
            }} />
            <span style={{ fontSize: 12, color: theme.textMuted }}>
              {item.label}: <strong style={{ color: theme.text }}>{item.value.toLocaleString()}</strong>
              <span style={{ color: theme.textLight, marginLeft: 3 }}>
                ({stats.chars > 0 ? ((item.value / stats.chars) * 100).toFixed(0) : 0}%)
              </span>
            </span>
          </div>
        ))}
      </div>
      <div style={{
        display: "flex", gap: 16, marginTop: 12, fontSize: 12, color: theme.textMuted,
      }}>
        <span>Uppercase: <strong style={{ color: theme.text }}>{stats.uppercase}</strong></span>
        <span>Lowercase: <strong style={{ color: theme.text }}>{stats.lowercase}</strong></span>
      </div>
    </div>
  );
}

/* ─── TAB BUTTON ─── */
function TabBtn({ label, active, onClick, theme }) {
  return (
    <button onClick={onClick} style={{
      padding: "7px 14px", fontSize: 13, fontWeight: active ? 600 : 500,
      color: active ? theme.primary : theme.textMuted,
      background: active ? (theme === DARK ? "rgba(45,212,191,0.1)" : "rgba(13,148,136,0.08)") : "transparent",
      border: "none", borderRadius: 7, cursor: "pointer",
      transition: "all 0.15s ease",
    }}>{label}</button>
  );
}

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
        <span style={{
          fontSize: 14, fontWeight: 600, color: theme.text, lineHeight: 1.4, paddingRight: 16,
        }}>{q}</span>
        <span style={{
          fontSize: 18, color: theme.textMuted, flexShrink: 0,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease", lineHeight: 1,
        }}>+</span>
      </button>
      {open && (
        <p style={{
          fontSize: 13, color: theme.textMuted, lineHeight: 1.65,
          marginTop: 10, marginBottom: 0, paddingRight: 30,
        }}>{a}</p>
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

/* ─── LIMITS TABLE ─── */
function LimitsTable({ theme }) {
  const data = [
    ["X / Twitter Post", "280"],
    ["Instagram Bio", "150"],
    ["Instagram Caption", "2,200"],
    ["Facebook Post", "63,206"],
    ["LinkedIn Post", "3,000"],
    ["TikTok Caption", "2,200"],
    ["Pinterest Pin", "500"],
    ["YouTube Title", "100"],
    ["YouTube Description", "5,000"],
    ["Meta Description (SEO)", "155 – 160"],
    ["Google Title Tag (SEO)", "50 – 60"],
    ["SMS Message", "160"],
    ["Email Subject Line", "60 – 70"],
    ["Slack Message", "40,000"],
  ];
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${theme.border}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", fontSize: 13 }}>
        <div style={{
          padding: "10px 14px", fontWeight: 600, color: theme.text,
          background: theme.surfaceAlt, borderBottom: `1px solid ${theme.border}`,
        }}>Platform</div>
        <div style={{
          padding: "10px 14px", fontWeight: 600, color: theme.text,
          background: theme.surfaceAlt, borderBottom: `1px solid ${theme.border}`,
        }}>Character Limit</div>
        {data.map(([platform, limit], i) => (
          <div key={i} style={{ display: "contents" }}>
            <div style={{
              padding: "9px 14px", color: theme.textMuted,
              borderBottom: i < data.length - 1 ? `1px solid ${theme.border}` : "none",
              background: theme.surface,
            }}>{platform}</div>
            <div style={{
              padding: "9px 14px", color: theme.text, fontWeight: 500,
              borderBottom: i < data.length - 1 ? `1px solid ${theme.border}` : "none",
              background: theme.surface, fontVariantNumeric: "tabular-nums",
            }}>{limit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [dark, setDark] = useState(false);
  const [tab, setTab] = useState("counts");
  const [focused, setFocused] = useState(false);
  const [copied, setCopied] = useState(false);
  const theme = dark ? DARK : LIGHT;
  const stats = useMemo(() => analyze(text), [text]);

  const copyText = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text]);

  const downloadTxt = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "text.txt"; a.click();
    URL.revokeObjectURL(url);
  }, [text]);

  const exportStats = useCallback(() => {
    const summary = [
      `Characters: ${stats.chars} (${stats.charsNoSpaces} without spaces)`,
      `Words: ${stats.words}`,
      `Sentences: ${stats.sentences}`,
      `Paragraphs: ${stats.paragraphs}`,
      `Lines: ${stats.lines}`,
      `Letters: ${stats.letters} | Digits: ${stats.digits} | Spaces: ${stats.spaces} | Punctuation: ${stats.punctuation}`,
      `Uppercase: ${stats.uppercase} | Lowercase: ${stats.lowercase}`,
      ``,
      `— Generated by ToolCraftKit.com`,
    ].join("\n");
    navigator.clipboard.writeText(summary);
  }, [stats]);

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
          }} title={dark ? "Light mode" : "Dark mode"}>
            {dark ? "☀" : "☾"}
          </button>
        </nav>
      </header>

      {/* MAIN */}
      <main style={{ maxWidth: 880, margin: "0 auto", padding: "24px 16px 60px" }}>

        {/* Breadcrumb */}
        <div style={{
          fontSize: 12, color: theme.textLight, marginBottom: 14,
          display: "flex", gap: 6, alignItems: "center",
        }}>
          <span style={{ cursor: "pointer", color: theme.textMuted }}>Home</span>
          <span>›</span>
          <span style={{ cursor: "pointer", color: theme.textMuted }}>Text Tools</span>
          <span>›</span>
          <span style={{ color: theme.primary, fontWeight: 500 }}>Character Counter</span>
        </div>

        <AdSlot position="header" theme={theme} />

        {/* Title */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{
            fontSize: 26, fontWeight: 800, margin: 0,
            letterSpacing: "-0.03em", lineHeight: 1.2,
          }}>Character Counter</h1>
          <p style={{
            fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5,
          }}>
            Count characters with and without spaces instantly. Check your text against platform limits for Twitter/X, Instagram, LinkedIn, Google, and more.
          </p>
        </div>

        {/* TEXTAREA */}
        <div style={{
          background: theme.surface, borderRadius: 12,
          border: `1.5px solid ${focused ? theme.primary : theme.border}`,
          overflow: "hidden", marginBottom: 16,
          transition: "border-color 0.2s ease",
          boxShadow: focused ? `0 0 0 3px ${dark ? "rgba(45,212,191,0.15)" : "rgba(13,148,136,0.1)"}` : theme.shadow,
        }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Start typing or paste your text here..."
            style={{
              width: "100%", minHeight: 200, padding: "16px 18px",
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
              <span><strong style={{ color: theme.text }}>{stats.chars.toLocaleString()}</strong> characters</span>
              <span><strong style={{ color: theme.text }}>{stats.charsNoSpaces.toLocaleString()}</strong> no spaces</span>
              <span><strong style={{ color: theme.text }}>{stats.words.toLocaleString()}</strong> words</span>
            </div>
            <div style={{ display: "flex", gap: 2 }}>
              {[
                { label: copied ? "✓ Copied" : "Copy", action: copyText, show: text.length > 0 },
                { label: "Download", action: downloadTxt, show: text.length > 0 },
                { label: "Export Stats", action: exportStats, show: stats.chars > 0 },
                { label: "Clear", action: () => setText(""), show: text.length > 0 },
              ].filter((b) => b.show).map((btn) => (
                <button key={btn.label} onClick={btn.action} style={{
                  background: "none", border: "none",
                  color: btn.label === "Clear" ? theme.danger : theme.textMuted,
                  fontSize: 12, cursor: "pointer", padding: "3px 8px", borderRadius: 5,
                  fontWeight: 500, transition: "color 0.15s ease",
                }}
                  onMouseOver={(e) => e.target.style.color = theme.primary}
                  onMouseOut={(e) => e.target.style.color = btn.label === "Clear" ? theme.danger : theme.textMuted}
                >{btn.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* TABS */}
        <div style={{
          display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap",
          background: theme.surfaceAlt, padding: 4, borderRadius: 10,
        }}>
          {[
            { key: "counts", label: "Counts" },
            { key: "breakdown", label: "Breakdown" },
            { key: "limits", label: "Platform Limits" },
          ].map((t) => (
            <TabBtn key={t.key} label={t.label} active={tab === t.key} onClick={() => setTab(t.key)} theme={theme} />
          ))}
        </div>

        {/* TAB CONTENT */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: "18px 18px",
          border: `1px solid ${theme.border}`, marginBottom: 20,
          boxShadow: theme.shadow, minHeight: 120,
        }}>
          {tab === "counts" && (
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                <StatCard label="Characters" value={stats.chars} sub="with spaces" theme={theme} />
                <StatCard label="Without Spaces" value={stats.charsNoSpaces} theme={theme} />
                <StatCard label="Words" value={stats.words} theme={theme} />
                <StatCard label="Sentences" value={stats.sentences} theme={theme} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                <StatCard label="Paragraphs" value={stats.paragraphs} theme={theme} />
                <StatCard label="Lines" value={stats.lines} theme={theme} />
                <StatCard label="Letters" value={stats.letters} theme={theme} />
                <StatCard label="Digits" value={stats.digits} theme={theme} />
              </div>
              <CharGoal current={stats.chars} theme={theme} />
            </div>
          )}

          {tab === "breakdown" && (
            <div>
              <div style={{
                fontSize: 12, color: theme.textMuted, marginBottom: 14, fontWeight: 500,
              }}>Character composition</div>
              <CharBreakdown stats={stats} theme={theme} />
            </div>
          )}

          {tab === "limits" && (
            <div>
              <div style={{
                fontSize: 12, color: theme.textMuted, marginBottom: 14, fontWeight: 500,
              }}>Your text vs. popular platform character limits</div>
              <PlatformLimits charCount={stats.chars} theme={theme} />
            </div>
          )}
        </div>

        <AdSlot position="middle" theme={theme} />

        {/* SEO CONTENT */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{
            fontSize: 20, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em",
          }}>How to Use This Character Counter</h2>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            Paste or type your text in the box above. The character count updates in real time, showing totals with and without spaces. The Counts tab gives you a complete overview including words, sentences, paragraphs, lines, letters, and digits.
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            Switch to the Breakdown tab to see the composition of your text — what percentage is letters, digits, spaces, and punctuation, plus the uppercase and lowercase split. The Platform Limits tab checks your text against character limits for 12 popular platforms including Twitter/X, Instagram, LinkedIn, YouTube, TikTok, and Google SEO fields.
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: 0 }}>
            Set a custom character limit to track your progress with a visual bar — perfect for writing tweets, meta descriptions, or any content with a strict character cap. Everything runs in your browser. No data is ever sent to a server.
          </p>
        </section>

        {/* LIMITS TABLE */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{
            fontSize: 20, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em",
          }}>Character Limits by Platform</h2>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 14px" }}>
            Every platform has different character limits. Use this reference to make sure your content fits before you post.
          </p>
          <LimitsTable theme={theme} />
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 20 }}>
          <h2 style={{
            fontSize: 20, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em",
          }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme}
            q="Do spaces count as characters?"
            a="It depends on the platform. Twitter/X counts spaces as characters. Google's meta description counts spaces too. This tool shows both counts — with and without spaces — so you can check against any platform's rules."
          />
          <FAQItem theme={theme}
            q="What is the Twitter/X character limit?"
            a="Twitter/X allows 280 characters per tweet for standard accounts. This includes letters, numbers, spaces, and punctuation. URLs are shortened to 23 characters regardless of their actual length."
          />
          <FAQItem theme={theme}
            q="What is the ideal meta description length?"
            a="Google typically displays 155-160 characters in search results. Going over means your description gets cut off with '...' which can reduce click-through rates. Aim for 150-155 characters to be safe."
          />
          <FAQItem theme={theme}
            q="How long can an Instagram caption be?"
            a="Instagram captions can be up to 2,200 characters. However, captions are truncated after 125 characters in the feed — users have to tap 'more' to read the rest. Front-load your most important message."
          />
          <FAQItem theme={theme}
            q="Does this tool count Unicode and emoji characters?"
            a="Yes. Each emoji counts as one or more characters depending on the emoji. Composed emoji (like family emoji or flag emoji) can count as multiple characters. This tool counts them the same way most platforms do."
          />
          <FAQItem theme={theme}
            q="What is the difference between characters and bytes?"
            a="One character can take 1 to 4 bytes depending on the encoding. Standard English letters take 1 byte in UTF-8, while emoji can take 4 bytes. Most platforms count characters, not bytes — and so does this tool."
          />
          <FAQItem theme={theme}
            q="Does this tool store my text?"
            a="No. Everything runs entirely in your browser. Your text is never uploaded, stored, or logged on any server. You can use this tool with complete privacy."
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
