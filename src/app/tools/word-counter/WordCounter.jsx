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

/* ─── SYLLABLE COUNTER ─── */
function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  const m = word.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
}

/* ─── LANGUAGE DETECTION ─── */
function detectLanguage(text) {
  if (!text.trim() || text.trim().split(/\s+/).length < 5) return null;
  const sample = text.toLowerCase().slice(0, 2000);
  const langs = [
    { code: "EN", name: "English", markers: /\b(the|and|is|are|was|were|have|has|been|with|this|that|from|they|will|would|could|should|about|which|their|there|these|those|been|being|other|into|just|also|than|very|after|before|because|between|during)\b/g },
    { code: "FR", name: "Français", markers: /\b(les|des|une|est|sont|dans|pour|avec|qui|que|sur|pas|mais|plus|tout|cette|ces|elle|nous|vous|ils|ont|son|ses|aux|par|été|être|faire|comme|même|peut|aussi|leur|entre|après|encore|chez|depuis|donc|sans|vers|selon|sous|très)\b/g },
    { code: "DE", name: "Deutsch", markers: /\b(und|der|die|das|ist|ein|eine|den|dem|des|auf|für|mit|sich|von|als|nicht|sind|wird|aus|auch|hat|nach|bei|über|noch|nur|aber|wie|vor|bis|oder|wenn|dann|mehr|kann|sehr|alle|muss|kein|wir|ihr)\b/g },
    { code: "ES", name: "Español", markers: /\b(los|las|una|del|que|por|con|para|como|pero|más|todo|esta|son|fue|hay|está|desde|entre|cuando|sobre|también|hasta|donde|puede|todos|otro|otra|sin|ese|esa|muy|sus|nos|ese|cada|estos)\b/g },
    { code: "IT", name: "Italiano", markers: /\b(che|del|della|delle|dei|gli|una|per|con|sono|come|non|più|anche|questo|questa|stato|dalla|alla|nella|tutto|suo|sua|suoi|loro|fatto|dopo|ancora|solo|tra|fra|ogni|sempre|fino|molto|dove|già|così|poi|quale)\b/g },
    { code: "PT", name: "Português", markers: /\b(que|dos|das|uma|para|com|não|por|mais|como|mas|foi|são|tem|seu|sua|pela|pelo|nos|esta|esse|essa|isso|também|até|quando|muito|desde|onde|pode|aqui|entre|seus|suas|cada|outro|outra|depois|ainda|sobre)\b/g },
  ];
  let best = null, bestCount = 0;
  for (const lang of langs) {
    const matches = sample.match(lang.markers);
    const count = matches ? matches.length : 0;
    if (count > bestCount) { bestCount = count; best = lang; }
  }
  return bestCount >= 3 ? best : null;
}

/* ─── STOP WORDS ─── */
const STOP_WORDS = new Set([
  "the","a","an","and","or","but","in","on","at","to","for","of","with","by",
  "from","is","it","this","that","are","was","were","be","been","being","have",
  "has","had","do","does","did","will","would","shall","should","may","might",
  "can","could","i","you","he","she","we","they","me","him","her","us","them",
  "my","your","his","its","our","their","not","no","so","if","as","up","out",
  "about","into","than","then","just","also","very","much","more","most","all",
  "each","every","both","few","some","any","other","what","which","who","how",
  "when","where","why","there","here","new","one","two","only","even","back",
  "le","la","les","de","du","des","un","une","et","en","est","que","qui","dans",
  "pour","pas","sur","ce","se","son","sa","ses","au","aux","il","elle","nous",
  "vous","ils","ont","par","plus","ne","avec","mais","tout","je","tu",
]);

/* ─── PLATFORM LIMITS ─── */
const PLATFORMS = [
  { name: "X / Twitter", limit: 280, unit: "chars", icon: "𝕏" },
  { name: "Meta Description", limit: 160, unit: "chars", icon: "◎" },
  { name: "Google Title", limit: 60, unit: "chars", icon: "G" },
  { name: "Instagram Bio", limit: 150, unit: "chars", icon: "◷" },
  { name: "LinkedIn Post", limit: 3000, unit: "chars", icon: "in" },
];

/* ─── ANALYSIS ENGINE ─── */
function analyze(text) {
  if (!text.trim()) {
    return {
      words: 0, chars: text.length, charsNoSpaces: 0, sentences: 0,
      paragraphs: 0, syllables: 0, readingTime: "0 sec",
      speakingTime: "0 sec", fleschScore: 0, fleschGrade: "—",
      topKeywords: [], uniqueWords: 0, avgWordLength: 0, language: null,
    };
  }
  const words = text.match(/\S+/g) || [];
  const wordCount = words.length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = sentences.length || 1;
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const paragraphCount = paragraphs.length || (text.trim() ? 1 : 0);

  const uniqueSet = new Set();
  let totalSyllables = 0;
  let totalWordLen = 0;
  words.forEach((w) => {
    totalSyllables += countSyllables(w);
    const clean = w.toLowerCase().replace(/[^a-z0-9'-]/g, "");
    if (clean) { uniqueSet.add(clean); totalWordLen += clean.length; }
  });

  const readMin = wordCount / 250;
  const speakMin = wordCount / 130;
  const fmt = (min) => {
    if (min < 1) return `${Math.max(1, Math.round(min * 60))} sec`;
    const m = Math.floor(min);
    const s = Math.round((min - m) * 60);
    return s > 0 ? `${m} min ${s} sec` : `${m} min`;
  };

  let fleschScore = 0;
  if (wordCount > 0) {
    fleschScore = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (totalSyllables / wordCount);
    fleschScore = Math.max(0, Math.min(100, Math.round(fleschScore * 10) / 10));
  }
  const getGrade = (s) => {
    if (s >= 90) return "Very Easy";
    if (s >= 80) return "Easy";
    if (s >= 70) return "Fairly Easy";
    if (s >= 60) return "Standard";
    if (s >= 50) return "Fairly Hard";
    if (s >= 30) return "Hard";
    return "Very Hard";
  };

  const freq = {};
  words.forEach((w) => {
    const clean = w.toLowerCase().replace(/[^a-z0-9'-]/g, "");
    if (clean.length > 1 && !STOP_WORDS.has(clean)) {
      freq[clean] = (freq[clean] || 0) + 1;
    }
  });
  const topKeywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word, count]) => ({
      word, count, density: ((count / wordCount) * 100).toFixed(1),
    }));

  return {
    words: wordCount, chars, charsNoSpaces, sentences: sentenceCount,
    paragraphs: paragraphCount, syllables: totalSyllables,
    readingTime: fmt(readMin), speakingTime: fmt(speakMin),
    fleschScore, fleschGrade: getGrade(fleschScore), topKeywords,
    uniqueWords: uniqueSet.size,
    avgWordLength: wordCount > 0 ? (totalWordLen / wordCount).toFixed(1) : 0,
    language: detectLanguage(text),
  };
}

/* ─── ANIMATED NUMBER ─── */
function AnimatedNumber({ value, theme }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef(null);
  useEffect(() => {
    const numVal = typeof value === "number" ? value : parseInt(value) || 0;
    const numDisp = typeof display === "number" ? display : parseInt(display) || 0;
    if (typeof value !== "number" || numVal === numDisp) { setDisplay(value); return; }
    const diff = numVal - numDisp;
    const steps = Math.min(Math.abs(diff), 12);
    if (steps === 0) { setDisplay(value); return; }
    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (step >= steps) { setDisplay(numVal); clearInterval(timer); }
      else { setDisplay(Math.round(numDisp + (diff * step) / steps)); }
    }, 25);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{typeof display === "number" ? display.toLocaleString() : display}</span>;
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
      }}><AnimatedNumber value={value} theme={theme} /></div>
      <div style={{
        fontSize: 12, color: theme.textMuted, marginTop: 3, fontWeight: 500,
      }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: theme.textLight, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

/* ─── WORD GOAL ─── */
function WordGoal({ current, theme }) {
  const [goal, setGoal] = useState("");
  const target = parseInt(goal) || 0;
  const pct = target > 0 ? Math.min(100, (current / target) * 100) : 0;
  const reached = target > 0 && current >= target;
  return (
    <div style={{
      background: theme.surface, borderRadius: 10, padding: "14px 16px",
      border: `1px solid ${theme.border}`, flex: "1 1 200px",
      boxShadow: theme.shadow,
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
      }}>
        <span style={{ fontSize: 12, color: theme.textMuted, fontWeight: 500 }}>Word Goal</span>
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. 1500"
          style={{
            width: 80, padding: "4px 8px", fontSize: 13, borderRadius: 6,
            border: `1px solid ${theme.border}`, background: theme.inputBg,
            color: theme.text, outline: "none", marginLeft: "auto",
          }}
          onFocus={(e) => e.target.style.borderColor = theme.primary}
          onBlur={(e) => e.target.style.borderColor = theme.border}
        />
      </div>
      <div style={{
        height: 8, borderRadius: 4, background: theme.surfaceAlt, overflow: "hidden",
      }}>
        <div style={{
          width: `${pct}%`, height: "100%", borderRadius: 4,
          background: reached ? theme.success : theme.primary,
          transition: "width 0.3s ease, background 0.3s ease",
        }} />
      </div>
      <div style={{
        fontSize: 11, marginTop: 6, fontWeight: 500,
        color: reached ? theme.success : theme.textLight,
      }}>
        {target > 0
          ? reached
            ? `✓ Goal reached! ${current.toLocaleString()} / ${target.toLocaleString()}`
            : `${current.toLocaleString()} / ${target.toLocaleString()} (${Math.round(pct)}%)`
          : "Set a target to track progress"
        }
      </div>
    </div>
  );
}

/* ─── PLATFORM LIMITS ─── */
function PlatformLimits({ charCount, theme }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 8,
    }}>
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
              fontSize: 10, fontWeight: 700, color: theme.textMuted,
              flexShrink: 0,
            }}>{p.icon}</span>
            <span style={{
              width: 110, color: theme.textMuted, fontWeight: 500, flexShrink: 0,
            }}>{p.name}</span>
            <div style={{
              flex: 1, height: 5, borderRadius: 3, background: theme.surfaceAlt,
              overflow: "hidden", minWidth: 60,
            }}>
              <div style={{
                width: `${pct}%`, height: "100%", borderRadius: 3,
                background: over ? theme.danger : pct > 80 ? theme.warning : theme.primary,
                transition: "width 0.3s ease",
              }} />
            </div>
            <span style={{
              minWidth: 65, textAlign: "right", fontWeight: 500, fontVariantNumeric: "tabular-nums",
              color: over ? theme.danger : theme.textLight,
            }}>
              {charCount} / {p.limit}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── FLESCH METER ─── */
function FleschMeter({ score, grade, theme }) {
  const c = score >= 70 ? theme.success : score >= 50 ? theme.warning : theme.danger;
  return (
    <div>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10,
      }}>
        <span style={{ fontSize: 12, color: theme.textMuted, fontWeight: 500 }}>Flesch Reading Ease</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: c }}>{grade}</span>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: theme.surfaceAlt, overflow: "hidden" }}>
        <div style={{
          width: `${score}%`, height: "100%", borderRadius: 4, background: c,
          transition: "width 0.4s ease, background 0.4s ease",
        }} />
      </div>
      <div style={{ fontSize: 11, color: theme.textLight, marginTop: 6 }}>Score: {score} / 100</div>
    </div>
  );
}

/* ─── KEYWORD TABLE ─── */
function KeywordTable({ keywords, theme }) {
  if (keywords.length === 0) {
    return <div style={{ fontSize: 13, color: theme.textLight, fontStyle: "italic", padding: "8px 0" }}>Start typing to see keyword density...</div>;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {keywords.map((kw, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
          <span style={{
            flex: 1, color: theme.text, fontWeight: 500,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>{kw.word}</span>
          <span style={{ color: theme.textMuted, minWidth: 30, textAlign: "right" }}>{kw.count}×</span>
          <div style={{
            width: 50, height: 5, borderRadius: 3, background: theme.surfaceAlt, overflow: "hidden", flexShrink: 0,
          }}>
            <div style={{
              height: "100%", borderRadius: 3, background: theme.primary,
              width: `${Math.min(100, parseFloat(kw.density) * 15)}%`,
            }} />
          </div>
          <span style={{ color: theme.textLight, fontSize: 12, minWidth: 38, textAlign: "right" }}>{kw.density}%</span>
        </div>
      ))}
    </div>
  );
}

/* ─── CONTENT STANDARDS TABLE ─── */
function ContentStandards({ theme }) {
  const data = [
    ["Blog Post (SEO)", "1,500 – 2,500"],
    ["Pillar Page / Guide", "3,000 – 5,000+"],
    ["Product Description", "150 – 300"],
    ["Meta Description", "150 – 160 chars"],
    ["Google Title Tag", "50 – 60 chars"],
    ["X / Twitter Post", "≤ 280 chars"],
    ["Instagram Caption", "≤ 2,200 chars"],
    ["LinkedIn Article", "1,500 – 2,500"],
    ["Email Newsletter", "200 – 500"],
    ["Academic Essay", "Per assignment"],
    ["Short Story", "1,000 – 7,500"],
    ["Novel Chapter", "3,000 – 5,000"],
  ];
  return (
    <div style={{
      borderRadius: 10, overflow: "hidden",
      border: `1px solid ${theme.border}`,
    }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        fontSize: 13,
      }}>
        <div style={{
          padding: "10px 14px", fontWeight: 600, color: theme.text,
          background: theme.surfaceAlt, borderBottom: `1px solid ${theme.border}`,
        }}>Content Type</div>
        <div style={{
          padding: "10px 14px", fontWeight: 600, color: theme.text,
          background: theme.surfaceAlt, borderBottom: `1px solid ${theme.border}`,
        }}>Ideal Word Count</div>
        {data.map(([type, count], i) => (
          <div key={i} style={{ display: "contents" }}>
            <div style={{
              padding: "9px 14px", color: theme.textMuted,
              borderBottom: i < data.length - 1 ? `1px solid ${theme.border}` : "none",
              background: theme.surface,
            }}>{type}</div>
            <div style={{
              padding: "9px 14px", color: theme.text, fontWeight: 500,
              borderBottom: i < data.length - 1 ? `1px solid ${theme.border}` : "none",
              background: theme.surface, fontVariantNumeric: "tabular-nums",
            }}>{count}</div>
          </div>
        ))}
      </div>
    </div>
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

/* ─── AD SLOT PLACEHOLDER ─── */
function AdSlot({ position, theme }) {
  return (
    <div style={{
      border: `1px dashed ${theme.border}`, borderRadius: 8,
      padding: "12px", textAlign: "center", color: theme.textLight,
      fontSize: 11, fontStyle: "italic", background: theme.surfaceAlt,
      margin: position === "header" ? "0 0 20px" : "20px 0",
      opacity: 0.5,
    }}>
      Ad Slot — {position}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export default function WordCounterV2() {
  const [text, setText] = useState("");
  const [dark, setDark] = useState(false);
  const [tab, setTab] = useState("counts");
  const [focused, setFocused] = useState(false);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = dark ? DARK : LIGHT;
  const stats = useMemo(() => analyze(text), [text]);

  /* session tracking */
  const prevWords = useRef(0);
  useEffect(() => {
    if (stats.words > prevWords.current) {
      setSessionTotal((t) => t + (stats.words - prevWords.current));
    }
    prevWords.current = stats.words;
  }, [stats.words]);

  /* copy text */
  const copyText = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text]);

  /* download txt */
  const downloadTxt = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "text.txt"; a.click();
    URL.revokeObjectURL(url);
  }, [text]);

  /* export stats */
  const exportStats = useCallback(() => {
    const summary = [
      `Words: ${stats.words}`,
      `Characters: ${stats.chars} (${stats.charsNoSpaces} without spaces)`,
      `Sentences: ${stats.sentences}`,
      `Paragraphs: ${stats.paragraphs}`,
      `Unique Words: ${stats.uniqueWords}`,
      `Avg Word Length: ${stats.avgWordLength} chars`,
      `Reading Time: ${stats.readingTime}`,
      `Speaking Time: ${stats.speakingTime}`,
      `Readability: ${stats.fleschScore}/100 (${stats.fleschGrade})`,
      stats.language ? `Language: ${stats.language.name}` : null,
      ``,
      `Top Keywords:`,
      ...stats.topKeywords.map((k) => `  ${k.word}: ${k.count}× (${k.density}%)`),
      ``,
      `— Generated by ToolCraftKit.com`,
    ].filter(Boolean).join("\n");
    navigator.clipboard.writeText(summary);
  }, [stats]);

  const navItems = ["Text", "Writing", "Image", "Business", "Social", "Dev"];

  return (
    <div style={{
      minHeight: "100vh", background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      {/* ─── HEADER ─── */}
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

        {/* Desktop nav */}
        <nav style={{
          display: "flex", gap: 6, alignItems: "center",
        }}>
          <div className="desktop-nav" style={{ display: "flex", gap: 4 }}>
            {navItems.map((item) => (
              <span key={item} style={{
                padding: "5px 10px", fontSize: 13, fontWeight: 500, borderRadius: 6,
                color: item === "Text" ? theme.primary : theme.textMuted,
                background: item === "Text" ? (dark ? "rgba(45,212,191,0.1)" : "rgba(13,148,136,0.06)") : "transparent",
                cursor: "pointer",
              }}>{item}</span>
            ))}
          </div>
          {/* Dark mode toggle */}
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

      {/* ─── MAIN ─── */}
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
          <span style={{ color: theme.primary, fontWeight: 500 }}>Word Counter</span>
        </div>

        {/* Ad slot: header */}
        <AdSlot position="header" theme={theme} />

        {/* Title + Language badge */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <h1 style={{
              fontSize: 26, fontWeight: 800, margin: 0,
              letterSpacing: "-0.03em", lineHeight: 1.2,
            }}>Word Counter</h1>
            {stats.language && (
              <span style={{
                fontSize: 11, fontWeight: 600, padding: "3px 8px",
                borderRadius: 5, background: dark ? "rgba(45,212,191,0.15)" : "rgba(13,148,136,0.1)",
                color: theme.primary,
              }}>
                {stats.language.name} detected
              </span>
            )}
            {sessionTotal > 0 && (
              <span style={{
                fontSize: 11, color: theme.textLight, marginLeft: "auto",
              }}>
                Session: {sessionTotal.toLocaleString()} words analyzed
              </span>
            )}
          </div>
          <p style={{
            fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5,
          }}>
            Count words, characters, sentences and paragraphs instantly. Includes readability scoring, keyword density, and platform character limits.
          </p>
        </div>

        {/* ─── TEXTAREA ─── */}
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
            borderTop: `1px solid ${theme.border}`, fontSize: 12,
            flexWrap: "wrap", gap: 8,
          }}>
            <div style={{ display: "flex", gap: 14, color: theme.textLight }}>
              <span><strong style={{ color: theme.text }}>{stats.words.toLocaleString()}</strong> words</span>
              <span><strong style={{ color: theme.text }}>{stats.chars.toLocaleString()}</strong> chars</span>
            </div>
            <div style={{ display: "flex", gap: 2 }}>
              {[
                { label: copied ? "✓ Copied" : "Copy", action: copyText, show: text.length > 0 },
                { label: "Download", action: downloadTxt, show: text.length > 0 },
                { label: "Export Stats", action: exportStats, show: stats.words > 0 },
                { label: "Clear", action: () => { setText(""); prevWords.current = 0; }, show: text.length > 0 },
              ].filter((b) => b.show).map((btn) => (
                <button key={btn.label} onClick={btn.action} style={{
                  background: "none", border: "none", color: btn.label === "Clear" ? theme.danger : theme.textMuted,
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

        {/* ─── TABS ─── */}
        <div style={{
          display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap",
          background: theme.surfaceAlt, padding: 4, borderRadius: 10,
        }}>
          {[
            { key: "counts", label: "Counts" },
            { key: "readability", label: "Readability" },
            { key: "keywords", label: "Keywords" },
            { key: "limits", label: "Limits" },
          ].map((t) => (
            <TabBtn key={t.key} label={t.label} active={tab === t.key} onClick={() => setTab(t.key)} theme={theme} />
          ))}
        </div>

        {/* ─── TAB CONTENT ─── */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: "18px 18px",
          border: `1px solid ${theme.border}`, marginBottom: 20,
          boxShadow: theme.shadow, minHeight: 120,
        }}>
          {tab === "counts" && (
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                <StatCard label="Words" value={stats.words} theme={theme} />
                <StatCard label="Characters" value={stats.chars} sub={`${stats.charsNoSpaces.toLocaleString()} no spaces`} theme={theme} />
                <StatCard label="Sentences" value={stats.sentences} theme={theme} />
                <StatCard label="Paragraphs" value={stats.paragraphs} theme={theme} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <StatCard label="Unique Words" value={stats.uniqueWords} sub={stats.words > 0 ? `${((stats.uniqueWords / stats.words) * 100).toFixed(0)}% vocabulary diversity` : undefined} theme={theme} />
                <StatCard label="Avg Word Length" value={stats.avgWordLength} sub="characters" theme={theme} />
                <StatCard label="Reading Time" value={stats.readingTime} sub="at 250 wpm" theme={theme} />
                <StatCard label="Speaking Time" value={stats.speakingTime} sub="at 130 wpm" theme={theme} />
              </div>
              <div style={{ marginTop: 12 }}>
                <WordGoal current={stats.words} theme={theme} />
              </div>
            </div>
          )}

          {tab === "readability" && (
            <div>
              <FleschMeter score={stats.fleschScore} grade={stats.fleschGrade} theme={theme} />
              <div style={{
                marginTop: 18, padding: "14px 16px", borderRadius: 8,
                background: theme.surfaceAlt, fontSize: 13, color: theme.textMuted, lineHeight: 1.6,
              }}>
                <strong style={{ color: theme.text }}>What this means:</strong>{" "}
                {stats.fleschScore >= 70
                  ? "Your text is easy to read. Most adults and younger readers will understand it without difficulty. Great for blog posts, emails, and general web content."
                  : stats.fleschScore >= 50
                  ? "Your text has moderate complexity. It's suitable for educated adults. Consider simplifying if you're targeting a broad audience."
                  : stats.words > 0
                  ? "Your text is complex and may be difficult for general audiences. Try shorter sentences and simpler words to improve readability."
                  : "Start typing to see your readability analysis."}
              </div>
              <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 10 }}>
                <StatCard label="Avg Sentence Length" value={stats.words > 0 ? (stats.words / stats.sentences).toFixed(1) : 0} sub="words/sentence" theme={theme} />
                <StatCard label="Avg Syllables/Word" value={stats.words > 0 ? (stats.syllables / stats.words).toFixed(1) : 0} sub="syllables" theme={theme} />
                <StatCard label="Total Syllables" value={stats.syllables} theme={theme} />
              </div>
            </div>
          )}

          {tab === "keywords" && (
            <div>
              <KeywordTable keywords={stats.topKeywords} theme={theme} />
              {stats.topKeywords.length > 0 && (
                <div style={{
                  marginTop: 14, padding: "12px 14px", borderRadius: 8,
                  background: theme.surfaceAlt, fontSize: 12, color: theme.textMuted, lineHeight: 1.6,
                }}>
                  Keyword density shows how often a word appears relative to total word count. For SEO, aim for 1-2% on your primary keyword. Above 3% may be considered keyword stuffing.
                </div>
              )}
            </div>
          )}

          {tab === "limits" && (
            <div>
              <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 14, fontWeight: 500 }}>
                Character count vs. popular platform limits
              </div>
              <PlatformLimits charCount={stats.chars} theme={theme} />
            </div>
          )}
        </div>

        {/* Ad slot: middle */}
        <AdSlot position="middle" theme={theme} />

        {/* ─── SEO CONTENT ─── */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{
            fontSize: 20, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em",
          }}>How to Use This Word Counter</h2>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            Paste your text into the box above or type directly. Every metric updates instantly as you write. The Counts tab shows words, characters, sentences, paragraphs, unique words, and average word length. Set a personal word goal to track your progress with a visual indicator.
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            Switch to the Readability tab for your Flesch Reading Ease score, average sentence length, and syllable analysis. The Keywords tab highlights your most-used terms with their density percentages. The Limits tab checks your text against character limits for Twitter/X, Google, Instagram, LinkedIn, and meta descriptions.
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: 0 }}>
            Everything runs in your browser. Your text is never sent to any server.
          </p>
        </section>

        {/* ─── WORD COUNT STANDARDS TABLE ─── */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{
            fontSize: 20, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em",
          }}>Word Count Standards by Content Type</h2>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 14px" }}>
            Ideal word counts vary by format and purpose. Use this reference to make sure your content hits the right length for your platform.
          </p>
          <ContentStandards theme={theme} />
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ marginBottom: 20 }}>
          <h2 style={{
            fontSize: 20, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em",
          }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme}
            q="How many pages is 1,000 words?"
            a="About 2 pages single-spaced or 4 pages double-spaced, using a standard 12pt font like Times New Roman with 1-inch margins. The exact count varies with formatting, font choice, and paragraph spacing."
          />
          <FAQItem theme={theme}
            q="What is a good word count for a blog post?"
            a="For SEO, 1,500 to 2,500 words is the sweet spot for most blog posts. Longer content (3,000+) works well for pillar pages and comprehensive guides. The right length depends on your topic, audience, and the depth of coverage required."
          />
          <FAQItem theme={theme}
            q="How is reading time calculated?"
            a="Reading time is based on the average silent reading speed of 250 words per minute. Speaking time uses 130 words per minute, the typical pace for conference talks and podcasts."
          />
          <FAQItem theme={theme}
            q="What is Flesch Reading Ease?"
            a="A readability formula that rates text on a 0-100 scale. Higher scores mean easier reading. Scores of 60-70 are considered standard for general audiences. It factors in average sentence length and syllables per word. Most web content should aim for 60 or above."
          />
          <FAQItem theme={theme}
            q="Does this tool store my text?"
            a="No. Everything runs entirely in your browser. Your text is never uploaded, stored, or logged on any server. You can use this tool with complete privacy."
          />
          <FAQItem theme={theme}
            q="Do contractions count as one word or two?"
            a="Contractions like 'don't' or 'it's' count as one word. This is the standard convention used by Microsoft Word and Google Docs."
          />
          <FAQItem theme={theme}
            q="What is keyword density and why does it matter?"
            a="Keyword density is the percentage of times a keyword appears relative to total word count. For SEO, aim for 1-2% on your primary keyword. Above 3% may trigger keyword stuffing penalties. This tool calculates it automatically."
          />
          <FAQItem theme={theme}
            q="How many words per minute is normal reading speed?"
            a="The average adult reads about 250 words per minute silently. Speaking speed for presentations is about 130 words per minute. Speed readers can reach 400-700 wpm, though comprehension typically decreases at higher speeds."
          />
        </section>

        {/* Ad slot: footer */}
        <AdSlot position="footer" theme={theme} />

        {/* ─── FOOTER ─── */}
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
