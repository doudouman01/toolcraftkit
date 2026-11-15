"use client";
import { useState } from "react";

const PRESETS = {
  essay: { fontSize: 12, spacing: "double", font: "Times New Roman", margin: 1 },
  novel: { fontSize: 12, spacing: "single", font: "Garamond", margin: 1 },
  report: { fontSize: 11, spacing: "1.5", font: "Arial", margin: 1 },
  academic: { fontSize: 12, spacing: "double", font: "Times New Roman", margin: 1 },
};

const WORDS_PER_PAGE: Record<string, Record<string, number>> = {
  "single": { "10": 500, "11": 450, "12": 400, "14": 300 },
  "1.5": { "10": 350, "11": 310, "12": 275, "14": 210 },
  "double": { "10": 250, "11": 225, "12": 200, "14": 150 },
};

export default function Page() {
  const [words, setWords] = useState("");
  const [fontSize, setFontSize] = useState(12);
  const [spacing, setSpacing] = useState("double");
  const [mode, setMode] = useState<"words" | "pages">("words");

  const w = parseInt(words) || 0;
  const key = String(fontSize) as string;
  const wpp = WORDS_PER_PAGE[spacing]?.[key] || WORDS_PER_PAGE[spacing]?.["12"] || 250;

  let pages = 0;
  let wordCount = 0;
  if (mode === "words") {
    pages = w / wpp;
    wordCount = w;
  } else {
    pages = w;
    wordCount = Math.round(w * wpp);
  }

  const readingTime = Math.ceil(wordCount / 238);
  const speakingTime = Math.ceil(wordCount / 150);
  const paragraphs = Math.round(wordCount / 100);
  const sentences = Math.round(wordCount / 15);

  const applyPreset = (key: keyof typeof PRESETS) => {
    const p = PRESETS[key];
    setFontSize(p.fontSize);
    setSpacing(p.spacing);
  };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    row: { display: "flex" as const, alignItems: "center" as const, gap: 8, marginBottom: 14, flexWrap: "wrap" as const },
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none" } as const,
    resultCard: { background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 10, padding: 20, marginTop: 16 } as const,
    resultRow: { display: "flex" as const, justifyContent: "space-between" as const, alignItems: "center" as const, padding: "8px 0", borderBottom: "1px solid #E0F2F1" },
    big: { fontSize: 32, fontWeight: 700, color: "#0D9488" } as const,
    stat: { textAlign: "center" as const, padding: "8px 16px" },
    statVal: { fontSize: 18, fontWeight: 700, color: "#1C1917" } as const,
    statLabel: { fontSize: 11, color: "#78716C" } as const,
  };

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Words to Pages Converter</h1>
      <p style={s.sub}>Estimate how many pages your word count fills, or how many words fit on a number of pages.</p>

      <div style={s.card}>
        <div style={s.row}>
          {(["words", "pages"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)} style={{ ...s.btnSm, background: mode === m ? "#0D9488" : "#F5F5F4", color: mode === m ? "#fff" : "#1C1917", border: mode === m ? "1px solid #0D9488" : "1px solid #E7E5E4", textTransform: "capitalize" }}>{m === "words" ? "Words → Pages" : "Pages → Words"}</button>
          ))}
        </div>

        <div style={s.row}>
          <span style={{ fontSize: 12, color: "#78716C" }}>Presets:</span>
          {(Object.keys(PRESETS) as (keyof typeof PRESETS)[]).map((k) => (
            <button key={k} onClick={() => applyPreset(k)} style={{ ...s.btnSm, textTransform: "capitalize" }}>{k}</button>
          ))}
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={s.label}>{mode === "words" ? "Number of Words" : "Number of Pages"}</label>
          <input type="number" value={words} onChange={(e) => setWords(e.target.value)} placeholder={mode === "words" ? "1000" : "5"} style={s.input} />
          {mode === "words" && (
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              {[250, 500, 1000, 2000, 3000, 5000, 10000].map((n) => (
                <button key={n} onClick={() => setWords(String(n))} style={{ ...s.btnSm, fontSize: 11, padding: "3px 8px" }}>{n >= 1000 ? (n/1000)+"K" : n}</button>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={s.label}>Font Size</label>
            <select value={fontSize} onChange={(e) => setFontSize(+e.target.value)} style={{ ...s.input, cursor: "pointer" }}>
              {[10, 11, 12, 14].map((n) => <option key={n} value={n}>{n}pt</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={s.label}>Line Spacing</label>
            <select value={spacing} onChange={(e) => setSpacing(e.target.value)} style={{ ...s.input, cursor: "pointer" }}>
              <option value="single">Single</option>
              <option value="1.5">1.5</option>
              <option value="double">Double</option>
            </select>
          </div>
        </div>

        {w > 0 && (
          <div style={s.resultCard}>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: "#57534E", marginBottom: 4 }}>{mode === "words" ? "Estimated Pages" : "Estimated Words"}</div>
              <div style={s.big}>{mode === "words" ? pages.toFixed(1) : wordCount.toLocaleString()}</div>
              <div style={{ fontSize: 12, color: "#78716C", marginTop: 4 }}>at {fontSize}pt, {spacing} spacing (~{wpp} words/page)</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
              <div style={s.stat}><div style={s.statVal}>{readingTime} min</div><div style={s.statLabel}>Reading Time</div></div>
              <div style={s.stat}><div style={s.statVal}>{speakingTime} min</div><div style={s.statLabel}>Speaking Time</div></div>
              <div style={s.stat}><div style={s.statVal}>~{paragraphs}</div><div style={s.statLabel}>Paragraphs</div></div>
              <div style={s.stat}><div style={s.statVal}>~{sentences}</div><div style={s.statLabel}>Sentences</div></div>
            </div>
          </div>
        )}
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>Quickly estimate how many pages a given word count will fill based on font size and line spacing. Perfect for students writing essays, authors planning manuscripts, or professionals preparing reports and presentations.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>The estimates are based on standard US Letter size pages (8.5 × 11 inches) with 1-inch margins. Actual page count may vary depending on font, paragraph formatting, images, and headings.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "How many words fit on one page?", a: "With 12pt font, double-spaced, approximately 250 words fit on one page. Single-spaced, it is about 400-500 words depending on the font." },
          { q: "How many pages is a 1000-word essay?", a: "A 1000-word essay is approximately 4 pages double-spaced or 2 pages single-spaced with standard 12pt font and 1-inch margins." },
          { q: "How many pages is a 5000-word report?", a: "A 5000-word report is approximately 20 pages double-spaced or 10 pages single-spaced with 12pt font." },
          { q: "Does this account for headings and images?", a: "No. This tool calculates based on plain body text only. Headings, images, charts, and extra whitespace will increase your page count." },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 4 }}>{faq.q}</h3>
            <p style={{ fontSize: 13, color: "#57534E", lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
