"use client";
import { useState, useMemo } from "react";

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

/* ─── SYLLABLE COUNTER ─── */
function countSyllables(word: string): number {
  let w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  w = w.replace(/^y/, "");
  const m = w.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
}

function isComplexWord(word: string): boolean {
  return countSyllables(word) >= 3;
}

/* ─── ANALYSIS ENGINE ─── */
interface TextStats {
  words: number;
  sentences: number;
  paragraphs: number;
  syllables: number;
  complexWords: number;
  avgWordsPerSentence: number;
  avgSyllablesPerWord: number;
  readingTimeMin: number;
  fleschEase: number;
  fleschKincaid: number;
  gunningFog: number;
  colemanLiau: number;
  ari: number;
}

function analyze(text: string): TextStats | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const wordArr = trimmed.match(/\S+/g) || [];
  const wordCount = wordArr.length;
  if (wordCount === 0) return null;

  const sentenceArr = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = Math.max(sentenceArr.length, 1);

  const paragraphArr = trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const paragraphCount = Math.max(paragraphArr.length, 1);

  let totalSyllables = 0;
  let complexCount = 0;
  let totalCharsInWords = 0;

  for (const w of wordArr) {
    const syl = countSyllables(w);
    totalSyllables += syl;
    if (syl >= 3) complexCount++;
    totalCharsInWords += w.replace(/[^a-zA-Z0-9]/g, "").length;
  }

  const avgWPS = wordCount / sentenceCount;
  const avgSPW = totalSyllables / wordCount;

  // Flesch Reading Ease
  const fleschEase = Math.max(0, Math.min(100,
    Math.round((206.835 - 1.015 * avgWPS - 84.6 * avgSPW) * 10) / 10
  ));

  // Flesch-Kincaid Grade Level
  const fleschKincaid = Math.max(0,
    Math.round((0.39 * avgWPS + 11.8 * avgSPW - 15.59) * 10) / 10
  );

  // Gunning Fog Index
  const gunningFog = Math.max(0,
    Math.round((0.4 * (avgWPS + 100 * (complexCount / wordCount))) * 10) / 10
  );

  // Coleman-Liau Index
  const L = (totalCharsInWords / wordCount) * 100; // avg letters per 100 words
  const S = (sentenceCount / wordCount) * 100;     // avg sentences per 100 words
  const colemanLiau = Math.max(0,
    Math.round((0.0588 * L - 0.296 * S - 15.8) * 10) / 10
  );

  // Automated Readability Index
  const ariVal = 4.71 * (totalCharsInWords / wordCount) + 0.5 * avgWPS - 21.43;
  const ari = Math.max(0, Math.round(ariVal * 10) / 10);

  return {
    words: wordCount,
    sentences: sentenceCount,
    paragraphs: paragraphCount,
    syllables: totalSyllables,
    complexWords: complexCount,
    avgWordsPerSentence: Math.round(avgWPS * 10) / 10,
    avgSyllablesPerWord: Math.round(avgSPW * 100) / 100,
    readingTimeMin: wordCount / 250,
    fleschEase,
    fleschKincaid,
    gunningFog,
    colemanLiau,
    ari,
  };
}

/* ─── HELPERS ─── */
function gradeLabel(grade: number): string {
  if (grade <= 1) return "Kindergarten";
  if (grade <= 5) return `${Math.round(grade)}th Grade`;
  if (grade <= 6) return "6th Grade";
  if (grade <= 8) return "Middle School";
  if (grade <= 12) return "High School";
  if (grade <= 16) return "College Level";
  return "Graduate Level";
}

function fleschLabel(score: number): string {
  if (score >= 90) return "Very Easy";
  if (score >= 80) return "Easy";
  if (score >= 70) return "Fairly Easy";
  if (score >= 60) return "Standard";
  if (score >= 50) return "Fairly Hard";
  if (score >= 30) return "Hard";
  return "Very Hard";
}

type Theme = typeof LIGHT;

function scoreColor(score: number, inverse: boolean, theme: Theme): string {
  // For Flesch Ease, higher = easier (green). For grade-based, lower = easier.
  if (inverse) {
    // grade-based: low = green, high = red
    if (score <= 6) return theme.success;
    if (score <= 12) return theme.warning;
    return theme.danger;
  }
  // Flesch ease: high = green
  if (score >= 60) return theme.success;
  if (score >= 30) return theme.warning;
  return theme.danger;
}

function formatReadingTime(min: number): string {
  if (min < 1) return `${Math.max(1, Math.round(min * 60))} sec`;
  const m = Math.floor(min);
  const s = Math.round((min - m) * 60);
  return s > 0 ? `${m} min ${s} sec` : `${m} min`;
}

/* ─── SCORE CARD ─── */
function ScoreCard({ label, score, subtitle, color, theme }: {
  label: string; score: number | string; subtitle: string; color: string; theme: Theme;
}) {
  return (
    <div style={{
      background: theme.surface, borderRadius: 10, padding: "16px 18px",
      border: `1px solid ${theme.border}`, flex: "1 1 160px", minWidth: 0,
      boxShadow: theme.shadow,
    }}>
      <div style={{
        fontSize: 28, fontWeight: 700, color, letterSpacing: "-0.02em", lineHeight: 1.2,
      }}>{score}</div>
      <div style={{
        fontSize: 13, fontWeight: 600, color: theme.text, marginTop: 4,
      }}>{label}</div>
      <div style={{
        fontSize: 11, color: theme.textMuted, marginTop: 3,
      }}>{subtitle}</div>
    </div>
  );
}

/* ─── STAT CARD ─── */
function StatCard({ label, value, theme }: { label: string; value: string | number; theme: Theme }) {
  return (
    <div style={{
      background: theme.surface, borderRadius: 10, padding: "14px 16px",
      border: `1px solid ${theme.border}`, flex: "1 1 120px", minWidth: 0,
      boxShadow: theme.shadow,
    }}>
      <div style={{
        fontSize: 24, fontWeight: 700, color: theme.text,
        letterSpacing: "-0.02em", lineHeight: 1.2,
      }}>{typeof value === "number" ? value.toLocaleString() : value}</div>
      <div style={{
        fontSize: 12, color: theme.textMuted, marginTop: 3, fontWeight: 500,
      }}>{label}</div>
    </div>
  );
}

/* ─── FAQ ITEM ─── */
function FAQItem({ q, a, theme }: { q: string; a: string; theme: Theme }) {
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
function AdSlot({ position, theme }: { position: string; theme: Theme }) {
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
export default function ReadabilityChecker() {
  const [text, setText] = useState("");
  const [dark, setDark] = useState(false);
  const [focused, setFocused] = useState(false);
  const theme = dark ? DARK : LIGHT;
  const stats = useMemo(() => analyze(text), [text]);

  return (
    <div style={{
      minHeight: "100vh", background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <main style={{ maxWidth: 880, margin: "0 auto", padding: "24px 16px 60px" }}>

        {/* Ad slot: header */}
        <AdSlot position="header" theme={theme} />

        {/* ─── BREADCRUMB ─── */}
        <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 16 }}>
          <a href="/" style={{ color: theme.primary, textDecoration: "none" }}>Home</a>
          {" > "}
          <span>Writing Tools</span>
          {" > "}
          <span style={{ color: theme.primary }}>Readability Score</span>
        </div>

        {/* ─── TITLE ─── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <h1 style={{
              fontSize: 26, fontWeight: 800, margin: 0,
              letterSpacing: "-0.03em", lineHeight: 1.2,
            }}>Readability Score Checker</h1>
            <button onClick={() => setDark(!dark)} aria-label="Toggle theme" style={{
              marginLeft: "auto", background: theme.surfaceAlt, border: `1px solid ${theme.border}`,
              borderRadius: 8, padding: "6px 12px", cursor: "pointer",
              fontSize: 13, color: theme.textMuted, fontWeight: 500,
            }}>
              {dark ? "Light" : "Dark"}
            </button>
          </div>
          <p style={{
            fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5,
          }}>
            Analyze readability with Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, Coleman-Liau, and ARI scores. Free, instant, private.
          </p>
        </div>

        {/* ─── TEXTAREA ─── */}
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
            placeholder="Paste or type your text here to analyze readability..."
            style={{
              width: "100%", minHeight: 220, padding: "16px 18px",
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
              <span><strong style={{ color: theme.text }}>{(text.match(/\S+/g) || []).length.toLocaleString()}</strong> words</span>
              <span><strong style={{ color: theme.text }}>{text.length.toLocaleString()}</strong> chars</span>
            </div>
            {text.length > 0 && (
              <button onClick={() => setText("")} style={{
                background: "none", border: "none", color: theme.danger,
                fontSize: 12, cursor: "pointer", padding: "3px 8px", borderRadius: 5,
                fontWeight: 500,
              }}>Clear</button>
            )}
          </div>
        </div>

        {/* ─── RESULTS ─── */}
        {stats && (
          <>
            {/* Readability Scores */}
            <section style={{ marginBottom: 24 }}>
              <h2 style={{
                fontSize: 18, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em",
              }}>Readability Scores</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <ScoreCard
                  label="Flesch Reading Ease"
                  score={stats.fleschEase}
                  subtitle={fleschLabel(stats.fleschEase)}
                  color={scoreColor(stats.fleschEase, false, theme)}
                  theme={theme}
                />
                <ScoreCard
                  label="Flesch-Kincaid Grade"
                  score={stats.fleschKincaid}
                  subtitle={gradeLabel(stats.fleschKincaid)}
                  color={scoreColor(stats.fleschKincaid, true, theme)}
                  theme={theme}
                />
                <ScoreCard
                  label="Gunning Fog Index"
                  score={stats.gunningFog}
                  subtitle={gradeLabel(stats.gunningFog)}
                  color={scoreColor(stats.gunningFog, true, theme)}
                  theme={theme}
                />
                <ScoreCard
                  label="Coleman-Liau Index"
                  score={stats.colemanLiau}
                  subtitle={gradeLabel(stats.colemanLiau)}
                  color={scoreColor(stats.colemanLiau, true, theme)}
                  theme={theme}
                />
                <ScoreCard
                  label="ARI"
                  score={stats.ari}
                  subtitle={gradeLabel(stats.ari)}
                  color={scoreColor(stats.ari, true, theme)}
                  theme={theme}
                />
              </div>
            </section>

            {/* Overall Reading Level */}
            <section style={{ marginBottom: 24 }}>
              <div style={{
                background: theme.surface, borderRadius: 10, padding: "18px 20px",
                border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 6 }}>
                  Overall Reading Level
                </div>
                <div style={{
                  fontSize: 22, fontWeight: 700,
                  color: scoreColor(stats.fleschKincaid, true, theme),
                }}>
                  {gradeLabel(Math.round((stats.fleschKincaid + stats.gunningFog + stats.colemanLiau + stats.ari) / 4))}
                </div>
                <div style={{ fontSize: 12, color: theme.textLight, marginTop: 4 }}>
                  Average across Flesch-Kincaid, Gunning Fog, Coleman-Liau, and ARI
                </div>
                {/* Flesch Ease Bar */}
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 6, fontWeight: 500 }}>
                    Flesch Reading Ease: {stats.fleschEase}/100
                  </div>
                  <div style={{
                    height: 8, borderRadius: 4, background: theme.surfaceAlt, overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%", borderRadius: 4,
                      width: `${stats.fleschEase}%`,
                      background: scoreColor(stats.fleschEase, false, theme),
                      transition: "width 0.4s ease",
                    }} />
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    fontSize: 10, color: theme.textLight, marginTop: 4,
                  }}>
                    <span>Very Hard (0)</span>
                    <span>Very Easy (100)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Text Statistics */}
            <section style={{ marginBottom: 24 }}>
              <h2 style={{
                fontSize: 18, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em",
              }}>Text Statistics</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <StatCard label="Words" value={stats.words} theme={theme} />
                <StatCard label="Sentences" value={stats.sentences} theme={theme} />
                <StatCard label="Paragraphs" value={stats.paragraphs} theme={theme} />
                <StatCard label="Syllables" value={stats.syllables} theme={theme} />
                <StatCard label="Complex Words" value={stats.complexWords} theme={theme} />
                <StatCard label="Avg Words / Sentence" value={stats.avgWordsPerSentence} theme={theme} />
                <StatCard label="Avg Syllables / Word" value={stats.avgSyllablesPerWord} theme={theme} />
                <StatCard label="Reading Time" value={formatReadingTime(stats.readingTimeMin)} theme={theme} />
              </div>
            </section>
          </>
        )}

        {/* ─── FAQ ─── */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{
            fontSize: 20, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em",
          }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme}
            q="What is a good readability score?"
            a="For general web content, aim for a Flesch Reading Ease score of 60-70 (standard difficulty) and a grade level of 6-8. Marketing copy and blog posts perform best at a 6th-8th grade reading level — clear and accessible to the widest audience."
          />
          <FAQItem theme={theme}
            q="What readability level should I target for different audiences?"
            a="For the general public: 6th-8th grade. For teenagers and young adults: 7th-9th grade. For academic papers: 12th grade to college level. For technical documentation: 10th-14th grade. For children's content: 3rd-5th grade. Lower grade levels are harder to write but reach more readers."
          />
          <FAQItem theme={theme}
            q="How do these readability formulas differ?"
            a="Flesch Reading Ease gives a 0-100 score (higher = easier). Flesch-Kincaid, Gunning Fog, Coleman-Liau, and ARI all output a U.S. grade level. They differ in what they measure: Flesch-Kincaid and Gunning Fog focus on sentence length and syllable complexity, Coleman-Liau uses character counts instead of syllables, and ARI uses characters per word and words per sentence."
          />
          <FAQItem theme={theme}
            q="Does this tool store my text?"
            a="No. All analysis runs entirely in your browser. Your text is never uploaded, stored, or logged on any server. You can use this tool with complete privacy."
          />
        </section>

        {/* ─── SEO CONTENT ─── */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{
            fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 16,
            borderBottom: `2px solid ${theme.primary}`, paddingBottom: 8,
          }}>How to Use the Readability Score Checker</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: theme.textMuted, marginBottom: 12 }}>
            Paste or type your text into the box above. The tool instantly calculates five industry-standard readability formulas and shows you detailed text statistics. Use it to ensure your writing matches your target audience before publishing.
          </p>
          <h2 style={{
            fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 16,
            borderBottom: `2px solid ${theme.primary}`, paddingBottom: 8,
          }}>Why Readability Matters for SEO</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: theme.textMuted, marginBottom: 12 }}>
            Search engines favor content that engages readers. Text that is too complex leads to higher bounce rates and lower dwell time — both signals that hurt rankings. Google recommends writing at a level your audience can easily understand. Checking readability before publishing helps you rank higher and keep visitors on your page longer.
          </p>
          <div style={{
            background: dark ? "rgba(45,212,191,0.08)" : "#f0fdfa",
            border: `1px solid ${dark ? "rgba(45,212,191,0.2)" : "#99f6e4"}`,
            borderRadius: 8, padding: 16, marginTop: 16, marginBottom: 16,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: theme.primary, marginBottom: 4 }}>Pro Tip</div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: theme.textMuted, margin: 0 }}>
              Combine this tool with our{" "}
              <a href="/tools/word-counter" style={{ color: theme.primary }}>Word Counter</a> for comprehensive text analysis, or check your{" "}
              <a href="/tools/character-counter" style={{ color: theme.primary }}>Character Counter</a> for platform-specific length limits.
            </p>
          </div>
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
