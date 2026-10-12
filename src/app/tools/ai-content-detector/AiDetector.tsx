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

type Theme = typeof LIGHT;

/* ─── TRANSITION WORDS ─── */
const TRANSITION_WORDS = new Set([
  "however", "therefore", "moreover", "furthermore", "additionally", "consequently",
  "nevertheless", "meanwhile", "similarly", "conversely", "specifically", "notably",
  "importantly", "significantly", "essentially", "ultimately", "accordingly",
  "subsequently", "alternatively", "nonetheless", "likewise", "indeed", "thus",
  "hence", "overall", "evidently", "undoubtedly", "certainly", "clearly",
]);

/* ─── ANALYSIS ENGINE ─── */
interface SentenceResult {
  text: string;
  score: number; // 0-1, higher = more AI-like
  label: "human" | "uncertain" | "ai";
}

interface AnalysisResult {
  aiProbability: number; // 0-100
  classification: "Likely Human" | "Mixed" | "Likely AI";
  vocabDiversity: number; // type-token ratio 0-1
  sentenceUniformity: number; // 0-1, higher = more uniform (AI-like)
  transitionDensity: number; // transitions per sentence
  burstinessScore: number; // 0-1, lower = more uniform (AI-like)
  avgWordLength: number;
  avgSentenceLength: number;
  sentences: SentenceResult[];
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function getWords(text: string): string[] {
  return text.toLowerCase().match(/[a-z']+/g) || [];
}

function standardDeviation(arr: number[]): number {
  if (arr.length < 2) return 0;
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((sum, v) => sum + (v - mean) ** 2, 0) / arr.length;
  return Math.sqrt(variance);
}

function analyze(text: string): AnalysisResult | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const sentences = splitSentences(trimmed);
  if (sentences.length < 3) return null;

  const allWords = getWords(trimmed);
  if (allWords.length < 20) return null;

  // --- Vocabulary Diversity (Type-Token Ratio) ---
  const uniqueWords = new Set(allWords);
  // Normalize TTR for text length (use root TTR for longer texts)
  const vocabDiversity = allWords.length > 100
    ? uniqueWords.size / Math.sqrt(allWords.length)
    : uniqueWords.size / allWords.length;
  const normalizedVocab = Math.min(1, allWords.length > 100
    ? vocabDiversity / 10
    : vocabDiversity);

  // --- Sentence Length Uniformity ---
  const sentenceLengths = sentences.map((s) => getWords(s).length);
  const meanLen = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
  const stdLen = standardDeviation(sentenceLengths);
  const coefficientOfVariation = meanLen > 0 ? stdLen / meanLen : 0;
  // Low CV = uniform (AI-like), high CV = varied (human-like)
  const sentenceUniformity = Math.max(0, Math.min(1, 1 - coefficientOfVariation));

  // --- Sentence Starter Variety ---
  const starters = sentences.map((s) => {
    const w = getWords(s);
    return w.length > 0 ? w[0] : "";
  }).filter(Boolean);
  const uniqueStarters = new Set(starters);
  const starterRatio = starters.length > 0 ? uniqueStarters.size / starters.length : 1;

  // --- Transition Word Density ---
  let transitionCount = 0;
  for (const w of allWords) {
    if (TRANSITION_WORDS.has(w)) transitionCount++;
  }
  const transitionDensity = sentences.length > 0 ? transitionCount / sentences.length : 0;

  // --- Average Word Length Consistency ---
  const sentenceAvgWordLengths = sentences.map((s) => {
    const words = getWords(s);
    if (words.length === 0) return 0;
    return words.reduce((sum, w) => sum + w.length, 0) / words.length;
  });
  const wordLenStd = standardDeviation(sentenceAvgWordLengths);
  // Low std = consistent (AI-like)
  const wordLenUniformity = Math.max(0, Math.min(1, 1 - wordLenStd / 2));

  // --- Burstiness Score ---
  // Measures variation in sentence lengths. Human writing has higher burstiness.
  const burstiness = coefficientOfVariation;
  const normalizedBurstiness = Math.min(1, burstiness);

  // --- Paragraph Length Patterns ---
  const paragraphs = trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const paraLengths = paragraphs.map((p) => getWords(p).length);
  const paraCV = paraLengths.length > 1
    ? standardDeviation(paraLengths) / (paraLengths.reduce((a, b) => a + b, 0) / paraLengths.length || 1)
    : 0.5;
  const paraUniformity = Math.max(0, Math.min(1, 1 - paraCV));

  // --- Per-Sentence Scoring ---
  const sentenceResults: SentenceResult[] = sentences.map((s) => {
    const words = getWords(s);
    const wLen = words.length;
    // Sentence-level signals
    let score = 0;
    let signals = 0;

    // Length close to mean = AI-like
    if (meanLen > 0) {
      const deviation = Math.abs(wLen - meanLen) / meanLen;
      score += Math.max(0, 1 - deviation);
      signals++;
    }

    // Starts with transition word = slightly AI-like
    if (words.length > 0 && TRANSITION_WORDS.has(words[0])) {
      score += 0.7;
      signals++;
    }

    // Word length consistency within sentence
    if (words.length >= 3) {
      const avgWl = words.reduce((sum, w) => sum + w.length, 0) / words.length;
      const wlStd = standardDeviation(words.map((w) => w.length));
      const wlCV = avgWl > 0 ? wlStd / avgWl : 0;
      score += Math.max(0, 1 - wlCV);
      signals++;
    }

    const avg = signals > 0 ? score / signals : 0.5;
    const label: SentenceResult["label"] = avg < 0.45 ? "human" : avg < 0.65 ? "uncertain" : "ai";
    return { text: s, score: avg, label };
  });

  // --- Overall AI Probability ---
  // Weighted combination of all signals
  const weights = {
    sentenceUniformity: 0.25,
    vocabLow: 0.15,
    transitionHigh: 0.15,
    starterLow: 0.1,
    wordLenUniform: 0.1,
    burstiLow: 0.15,
    paraUniform: 0.1,
  };

  let aiScore = 0;
  aiScore += weights.sentenceUniformity * sentenceUniformity;
  aiScore += weights.vocabLow * (1 - normalizedVocab);
  aiScore += weights.transitionHigh * Math.min(1, transitionDensity / 0.8);
  aiScore += weights.starterLow * (1 - starterRatio);
  aiScore += weights.wordLenUniform * wordLenUniformity;
  aiScore += weights.burstiLow * (1 - normalizedBurstiness);
  aiScore += weights.paraUniform * paraUniformity;

  const aiProbability = Math.round(Math.max(0, Math.min(100, aiScore * 100)));

  const classification: AnalysisResult["classification"] =
    aiProbability < 35 ? "Likely Human" : aiProbability < 65 ? "Mixed" : "Likely AI";

  return {
    aiProbability,
    classification,
    vocabDiversity: Math.round(normalizedVocab * 100) / 100,
    sentenceUniformity: Math.round(sentenceUniformity * 100) / 100,
    transitionDensity: Math.round(transitionDensity * 100) / 100,
    burstinessScore: Math.round(normalizedBurstiness * 100) / 100,
    avgWordLength: Math.round((allWords.reduce((s, w) => s + w.length, 0) / allWords.length) * 10) / 10,
    avgSentenceLength: Math.round(meanLen * 10) / 10,
    sentences: sentenceResults,
  };
}

/* ─── METRIC CARD ─── */
function MetricCard({ label, value, subtitle, theme }: {
  label: string; value: string | number; subtitle: string; theme: Theme;
}) {
  return (
    <div style={{
      background: theme.surface, borderRadius: 10, padding: "16px 18px",
      border: `1px solid ${theme.border}`, flex: "1 1 180px", minWidth: 0,
      boxShadow: theme.shadow,
    }}>
      <div style={{
        fontSize: 24, fontWeight: 700, color: theme.primary, letterSpacing: "-0.02em", lineHeight: 1.2,
      }}>{value}</div>
      <div style={{
        fontSize: 13, fontWeight: 600, color: theme.text, marginTop: 4,
      }}>{label}</div>
      <div style={{
        fontSize: 11, color: theme.textMuted, marginTop: 3,
      }}>{subtitle}</div>
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

/* ─── GAUGE ─── */
function ProbabilityGauge({ value, theme }: { value: number; theme: Theme }) {
  const color = value < 35 ? theme.success : value < 65 ? theme.warning : theme.danger;
  const label = value < 35 ? "Likely Human" : value < 65 ? "Mixed" : "Likely AI";
  return (
    <div style={{
      background: theme.surface, borderRadius: 12, padding: "24px",
      border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
      textAlign: "center",
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 8 }}>
        AI Probability
      </div>
      <div style={{ fontSize: 48, fontWeight: 800, color, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
        {value}%
      </div>
      <div style={{
        display: "inline-block", marginTop: 8, padding: "4px 14px",
        borderRadius: 20, fontSize: 13, fontWeight: 600,
        background: color + "18", color,
      }}>
        {label}
      </div>
      {/* Bar */}
      <div style={{ marginTop: 16 }}>
        <div style={{
          height: 10, borderRadius: 5, overflow: "hidden",
          background: theme.surfaceAlt, position: "relative",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to right, ${theme.success}, ${theme.warning}, ${theme.danger})`,
            opacity: 0.25, borderRadius: 5,
          }} />
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: `${value}%`,
            width: 4, background: color, borderRadius: 2,
            transform: "translateX(-50%)", transition: "left 0.4s ease",
          }} />
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between",
          fontSize: 10, color: theme.textLight, marginTop: 4,
        }}>
          <span>Human (0%)</span>
          <span>AI (100%)</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export default function AiDetectorTool() {
  const [text, setText] = useState("");
  const [dark, setDark] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [snapshot, setSnapshot] = useState("");
  const theme = dark ? DARK : LIGHT;

  const result = useMemo(() => analyze(snapshot), [snapshot]);

  function handleAnalyze() {
    setSnapshot(text);
    setHasAnalyzed(true);
  }

  function handleClear() {
    setText("");
    setSnapshot("");
    setHasAnalyzed(false);
  }

  function sentenceColor(label: SentenceResult["label"]): string {
    if (label === "human") return theme.success;
    if (label === "uncertain") return theme.warning;
    return theme.danger;
  }

  function sentenceBg(label: SentenceResult["label"]): string {
    if (label === "human") return theme.success + "18";
    if (label === "uncertain") return theme.warning + "18";
    return theme.danger + "18";
  }

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
          <span style={{ color: theme.primary }}>AI Content Detector</span>
        </div>

        {/* ─── TITLE ─── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <h1 style={{
              fontSize: 26, fontWeight: 800, margin: 0,
              letterSpacing: "-0.03em", lineHeight: 1.2,
            }}>AI Content Detector</h1>
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
            Analyze text for AI-generated patterns. Get a confidence score, sentence-by-sentence highlights, and vocabulary metrics. Free, instant, private.
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
            placeholder="Paste or type your text here to analyze for AI-generated patterns... (minimum 20 words, 3 sentences)"
            style={{
              width: "100%", minHeight: 220, padding: "16px 18px",
              border: "none", outline: "none", resize: "vertical",
              fontFamily: "'Inter', system-ui, sans-serif", fontSize: 14,
              lineHeight: 1.7, color: theme.text, background: theme.inputBg,
            }}
          />
        </div>

        {/* ─── ACTIONS ─── */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          <button onClick={handleAnalyze} disabled={text.trim().length < 50} style={{
            background: text.trim().length < 50 ? theme.border : theme.primary,
            color: text.trim().length < 50 ? theme.textLight : "#fff",
            border: "none", borderRadius: 8, padding: "10px 24px",
            fontSize: 14, fontWeight: 600, cursor: text.trim().length < 50 ? "not-allowed" : "pointer",
            transition: "background 0.2s ease",
          }}>
            Analyze Text
          </button>
          {hasAnalyzed && (
            <button onClick={handleClear} style={{
              background: theme.surfaceAlt, color: theme.textMuted,
              border: `1px solid ${theme.border}`, borderRadius: 8,
              padding: "10px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer",
            }}>
              Clear
            </button>
          )}
          <div style={{ fontSize: 12, color: theme.textLight, alignSelf: "center" }}>
            {getWords(text).length} words
          </div>
        </div>

        {/* ─── RESULTS ─── */}
        {hasAnalyzed && result && (
          <>
            {/* Probability Gauge */}
            <section style={{ marginBottom: 24 }}>
              <ProbabilityGauge value={result.aiProbability} theme={theme} />
            </section>

            {/* Metrics Cards */}
            <section style={{ marginBottom: 24 }}>
              <h2 style={{
                fontSize: 18, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em",
              }}>Analysis Metrics</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <MetricCard
                  label="Vocabulary Diversity"
                  value={result.vocabDiversity.toFixed(2)}
                  subtitle="Type-token ratio (higher = more diverse)"
                  theme={theme}
                />
                <MetricCard
                  label="Sentence Uniformity"
                  value={`${Math.round(result.sentenceUniformity * 100)}%`}
                  subtitle="Higher = more uniform (AI-like)"
                  theme={theme}
                />
                <MetricCard
                  label="Transition Density"
                  value={result.transitionDensity.toFixed(2)}
                  subtitle="Transitions per sentence"
                  theme={theme}
                />
                <MetricCard
                  label="Burstiness Score"
                  value={result.burstinessScore.toFixed(2)}
                  subtitle="Sentence length variation (lower = AI-like)"
                  theme={theme}
                />
              </div>
            </section>

            {/* Text Stats Row */}
            <section style={{ marginBottom: 24 }}>
              <div style={{
                display: "flex", flexWrap: "wrap", gap: 10,
              }}>
                <div style={{
                  background: theme.surface, borderRadius: 10, padding: "12px 16px",
                  border: `1px solid ${theme.border}`, flex: "1 1 120px",
                  boxShadow: theme.shadow,
                }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: theme.text }}>{result.avgSentenceLength}</div>
                  <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>Avg Words / Sentence</div>
                </div>
                <div style={{
                  background: theme.surface, borderRadius: 10, padding: "12px 16px",
                  border: `1px solid ${theme.border}`, flex: "1 1 120px",
                  boxShadow: theme.shadow,
                }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: theme.text }}>{result.avgWordLength}</div>
                  <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>Avg Word Length</div>
                </div>
                <div style={{
                  background: theme.surface, borderRadius: 10, padding: "12px 16px",
                  border: `1px solid ${theme.border}`, flex: "1 1 120px",
                  boxShadow: theme.shadow,
                }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: theme.text }}>{result.sentences.length}</div>
                  <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>Sentences Analyzed</div>
                </div>
              </div>
            </section>

            {/* Ad slot: mid */}
            <AdSlot position="mid-results" theme={theme} />

            {/* Sentence-by-Sentence Highlights */}
            <section style={{ marginBottom: 24 }}>
              <h2 style={{
                fontSize: 18, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em",
              }}>Sentence-by-Sentence Analysis</h2>
              <div style={{
                display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap", fontSize: 12,
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: theme.success, display: "inline-block" }} />
                  <span style={{ color: theme.textMuted }}>Human-like</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: theme.warning, display: "inline-block" }} />
                  <span style={{ color: theme.textMuted }}>Uncertain</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: theme.danger, display: "inline-block" }} />
                  <span style={{ color: theme.textMuted }}>AI-like</span>
                </span>
              </div>
              <div style={{
                background: theme.surface, borderRadius: 10, padding: "18px",
                border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
                lineHeight: 2, fontSize: 14,
              }}>
                {result.sentences.map((s, i) => (
                  <span key={i} style={{
                    background: sentenceBg(s.label),
                    borderBottom: `2px solid ${sentenceColor(s.label)}`,
                    borderRadius: 3, padding: "2px 4px", marginRight: 2,
                    display: "inline",
                  }}>
                    {s.text}
                  </span>
                ))}
              </div>
            </section>

            {/* Disclaimer */}
            <div style={{
              background: dark ? "rgba(251,191,36,0.08)" : "#FFFBEB",
              border: `1px solid ${dark ? "rgba(251,191,36,0.2)" : "#FDE68A"}`,
              borderRadius: 8, padding: 14, marginBottom: 24,
              fontSize: 13, lineHeight: 1.6, color: theme.textMuted,
            }}>
              <strong style={{ color: theme.warning }}>Disclaimer:</strong> This is a heuristic analysis tool. Results are estimates based on statistical patterns and should not be used as definitive proof of AI-generated content. No detector is 100% accurate.
            </div>
          </>
        )}

        {hasAnalyzed && !result && (
          <div style={{
            background: theme.surface, borderRadius: 10, padding: 24,
            border: `1px solid ${theme.border}`, textAlign: "center",
            marginBottom: 24, color: theme.textMuted, fontSize: 14,
          }}>
            Not enough text to analyze. Please provide at least 20 words and 3 sentences.
          </div>
        )}

        {/* ─── FAQ ─── */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{
            fontSize: 20, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em",
          }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme}
            q="How does the AI content detector work?"
            a="The detector analyzes several statistical patterns in your text: sentence length uniformity, vocabulary diversity, transition word frequency, word length consistency, and paragraph structure. AI-generated text tends to be more uniform and predictable in these metrics compared to human writing, which naturally varies more."
          />
          <FAQItem theme={theme}
            q="How accurate is this tool?"
            a="This is a heuristic-based tool that identifies statistical patterns associated with AI-generated text. It is not a substitute for professional analysis and should be used as one data point among several. Accuracy varies depending on text length, subject matter, and the AI model used. Longer texts generally produce more reliable results."
          />
          <FAQItem theme={theme}
            q="What do the metrics mean?"
            a="Vocabulary Diversity measures how many unique words appear relative to total words (higher = more diverse, human-like). Sentence Uniformity measures how similar sentence lengths are (higher = more uniform, AI-like). Transition Density counts formal transition words per sentence (higher = more AI-like). Burstiness measures variation in sentence length (lower = more uniform, AI-like)."
          />
          <FAQItem theme={theme}
            q="Is my text stored or sent anywhere?"
            a="No. All analysis runs entirely in your browser using JavaScript. Your text never leaves your device — nothing is uploaded, stored, or logged on any server. You can use this tool with complete privacy."
          />
        </section>

        {/* ─── SEO CONTENT ─── */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{
            fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 16,
            borderBottom: `2px solid ${theme.primary}`, paddingBottom: 8,
          }}>How to Use the AI Content Detector</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: theme.textMuted, marginBottom: 12 }}>
            Paste any text into the input area above and click Analyze Text. The tool examines statistical patterns in your writing, including sentence structure, vocabulary diversity, and transition word usage. You will receive an overall AI probability score, a classification (Likely Human, Mixed, or Likely AI), and a sentence-by-sentence breakdown with color-coded highlights.
          </p>

          <h2 style={{
            fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 16,
            borderBottom: `2px solid ${theme.primary}`, paddingBottom: 8,
          }}>Why AI Detection Matters</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: theme.textMuted, marginBottom: 12 }}>
            As AI writing tools become more prevalent, educators, publishers, and content teams need ways to evaluate text authenticity. AI-generated content often shows telltale statistical patterns: overly consistent sentence lengths, heavy use of transition words, uniform paragraph structures, and limited vocabulary diversity. Understanding these patterns helps writers produce more natural, engaging content.
          </p>

          <h2 style={{
            fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 16,
            borderBottom: `2px solid ${theme.primary}`, paddingBottom: 8,
          }}>Tips for More Human-Like Writing</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: theme.textMuted, marginBottom: 12 }}>
            Vary your sentence length — mix short punchy sentences with longer, more complex ones. Use a diverse vocabulary and avoid over-relying on formal transition words like "moreover" and "furthermore." Let your paragraphs vary in length naturally. Add personal anecdotes, rhetorical questions, and conversational asides to increase burstiness and make your writing feel authentic.
          </p>

          <div style={{
            background: dark ? "rgba(45,212,191,0.08)" : "#f0fdfa",
            border: `1px solid ${dark ? "rgba(45,212,191,0.2)" : "#99f6e4"}`,
            borderRadius: 8, padding: 16, marginTop: 16, marginBottom: 16,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: theme.primary, marginBottom: 4 }}>Related Tools</div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: theme.textMuted, margin: 0 }}>
              Pair this tool with our{" "}
              <a href="/tools/readability-score" style={{ color: theme.primary }}>Readability Score Checker</a> to ensure your content is both authentic and accessible to your target audience.
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
            &copy; 2026 ToolCraftKit.com — Free tools for creators and entrepreneurs.
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
