"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

/* ─── BRAND TOKENS ─── */
const LIGHT = {
  primary: "#0D9488", primaryLight: "#14B8A6",
  bg: "#FAFAF9", surface: "#FFFFFF", surfaceAlt: "#F5F5F4",
  border: "#E7E5E4", text: "#1C1917", textMuted: "#78716C", textLight: "#A8A29E",
  success: "#10B981", danger: "#EF4444",
  inputBg: "#FFFFFF", shadow: "0 1px 3px rgba(0,0,0,0.06)",
};
const DARK = {
  primary: "#2DD4BF", primaryLight: "#5EEAD4",
  bg: "#0C0A09", surface: "#1C1917", surfaceAlt: "#292524",
  border: "#3F3F46", text: "#FAFAF9", textMuted: "#A8A29E", textLight: "#78716C",
  success: "#34D399", danger: "#F87171",
  inputBg: "#292524", shadow: "0 1px 3px rgba(0,0,0,0.3)",
};

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog near the river bank. Bright sunlight filtered through the tall oak trees, casting long shadows across the winding path. A gentle breeze carried the scent of wildflowers as birds sang their morning melodies from hidden branches above. The peaceful scene was interrupted only by the distant sound of church bells ringing across the valley.",
  "Technology continues to reshape how we work and communicate in the modern world. Remote collaboration tools have made it possible for teams to connect across continents in real time. Cloud computing offers scalable solutions that were unimaginable just a decade ago. Artificial intelligence is automating repetitive tasks and freeing people to focus on creative problem solving and strategic thinking that drives innovation forward.",
  "Learning to type faster is one of the most practical skills you can develop for any career. Professional typists often exceed one hundred words per minute with near perfect accuracy. The key to improvement is consistent daily practice with proper finger placement on the home row keys. Focus on accuracy first and speed will follow naturally as your muscle memory develops over weeks of dedicated effort.",
  "Great writing begins with clear thinking and careful organization of ideas before touching the keyboard. Start with an outline that maps your main points and supporting evidence in a logical sequence. Each paragraph should focus on a single idea and transition smoothly into the next. Revision is where good writing becomes great writing, so always leave time to review and refine your drafts before sharing them.",
  "The ocean stretches endlessly beyond the rocky coastline, its deep blue surface shimmering under the afternoon sun. Waves crash rhythmically against the weathered cliffs, sending white spray high into the salty air. Seagulls circle overhead, their sharp cries echoing across the open water. A small fishing boat bobs gently near the horizon, its red sail a vivid contrast against the vast expanse of blue sky and water.",
];

const DURATIONS = [
  { label: "30s", value: 30 },
  { label: "60s", value: 60 },
  { label: "120s", value: 120 },
];

function FAQItem({ q, a, theme }: { q: string; a: string; theme: typeof LIGHT }) {
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
      {open && <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.65, marginTop: 10, marginBottom: 0, paddingRight: 30 }}>{a}</p>}
    </div>
  );
}

function SeoContent({ theme }: { theme: typeof LIGHT }) {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 0 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>How to Use the Typing Speed Test</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>Select your preferred test duration (30, 60, or 120 seconds), then start typing the displayed text. The timer begins automatically when you type the first character. Your words per minute and accuracy are tracked in real time. When the timer runs out, you will see your final results including WPM, accuracy percentage, and character breakdown.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>Why Typing Speed Matters</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>Faster typing directly translates to higher productivity in any role that involves a keyboard. Whether you are writing emails, coding, taking notes, or creating content, every extra word per minute saves measurable time over a workday. Professionals who type 60 WPM or above can complete text-heavy tasks significantly faster than the average typist.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>Tips for Improving Your Speed</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Keep your fingers on the home row (ASDF JKL;) and return to it after every keystroke</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Focus on accuracy first — speed comes naturally with muscle memory</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Practice for 10 to 15 minutes daily rather than one long session per week</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Avoid looking at the keyboard — use a typing tutor if needed</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Take breaks to prevent fatigue and maintain consistent accuracy</li>
      </ul>

      <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: theme.primary, marginBottom: "4px" }}>Related Tool</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: theme.textMuted, margin: 0 }}>
          Need to count words or characters in your writing? Try our <a href="/tools/word-counter" style={{ color: theme.primary }}>Word Counter</a> for instant word, character, sentence, and paragraph counts.
        </p>
      </div>
    </section>
  );
}

export default function TypingTest() {
  const [dark, setDark] = useState(false);
  const theme = dark ? DARK : LIGHT;

  const [duration, setDuration] = useState(60);
  const [sampleIndex, setSampleIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const sampleText = SAMPLE_TEXTS[sampleIndex];

  // Detect dark mode
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Pick a random sample on mount
  useEffect(() => {
    setSampleIndex(Math.floor(Math.random() * SAMPLE_TEXTS.length));
  }, []);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!started || finished) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer();
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return clearTimer;
  }, [started, finished, clearTimer]);

  // Also finish if user typed entire text
  useEffect(() => {
    if (started && typed.length >= sampleText.length && !finished) {
      clearTimer();
      setFinished(true);
    }
  }, [typed, sampleText, started, finished, clearTimer]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (finished) return;
    const val = e.target.value;
    if (!started && val.length > 0) {
      setStarted(true);
    }
    // Prevent typing beyond the sample length
    if (val.length > sampleText.length) return;
    setTyped(val);
  }, [started, finished, sampleText]);

  const handleRestart = useCallback(() => {
    clearTimer();
    setTyped("");
    setStarted(false);
    setFinished(false);
    setTimeLeft(duration);
    setSampleIndex(Math.floor(Math.random() * SAMPLE_TEXTS.length));
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [duration, clearTimer]);

  const handleDurationChange = useCallback((d: number) => {
    setDuration(d);
    setTimeLeft(d);
    setTyped("");
    setStarted(false);
    setFinished(false);
    clearTimer();
  }, [clearTimer]);

  // Compute stats
  const stats = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === sampleText[i]) correct++;
      else incorrect++;
    }
    const totalChars = typed.length;
    const accuracy = totalChars > 0 ? Math.round((correct / totalChars) * 100) : 100;
    const elapsed = duration - timeLeft;
    const minutes = elapsed / 60;
    const wordsTyped = correct / 5; // standard WPM: 5 chars = 1 word
    const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
    return { wpm, accuracy, correct, incorrect, totalChars, elapsed };
  }, [typed, sampleText, duration, timeLeft]);

  // Find current word boundaries
  const currentWordStart = useMemo(() => {
    const pos = typed.length;
    // Find the start of the word at the current typing position
    let start = pos;
    while (start > 0 && sampleText[start - 1] !== " ") start--;
    return start;
  }, [typed.length, sampleText]);

  const currentWordEnd = useMemo(() => {
    const pos = typed.length;
    let end = pos;
    while (end < sampleText.length && sampleText[end] !== " ") end++;
    return end;
  }, [typed.length, sampleText]);

  // Render the sample text with highlights
  const renderText = () => {
    const chars: React.ReactNode[] = [];
    for (let i = 0; i < sampleText.length; i++) {
      let bgColor = "transparent";
      let color = theme.textLight;

      if (i < typed.length) {
        // Already typed
        if (typed[i] === sampleText[i]) {
          color = theme.success;
          bgColor = "transparent";
        } else {
          color = "#fff";
          bgColor = theme.danger;
        }
      } else if (i >= currentWordStart && i < currentWordEnd && !finished) {
        // Current word highlight
        bgColor = dark ? "rgba(45,212,191,0.12)" : "rgba(13,148,136,0.08)";
        color = theme.text;
      }

      chars.push(
        <span key={i} style={{
          backgroundColor: bgColor,
          color,
          borderBottom: i === typed.length && !finished ? `2px solid ${theme.primary}` : "none",
          transition: "color 0.1s",
        }}>
          {sampleText[i]}
        </span>
      );
    }
    return chars;
  };

  const progressPct = duration > 0 ? ((duration - timeLeft) / duration) * 100 : 0;

  return (
    <div style={{
      minHeight: "100vh", background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <main style={{ maxWidth: 740, margin: "0 auto", padding: "24px 16px 60px" }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 12, color: theme.textLight, marginBottom: 14, display: "flex", gap: 6, alignItems: "center" }}>
          <a href="/" style={{ color: theme.textMuted, textDecoration: "none" }}>Home</a><span>›</span>
          <a href="/#education-tools" style={{ color: theme.textMuted, textDecoration: "none" }}>Education</a><span>›</span>
          <span style={{ color: theme.primary, fontWeight: 500 }}>Typing Speed Test</span>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.03em" }}>Typing Speed Test</h1>
          <p style={{ fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5 }}>
            Test your typing speed and accuracy. Start typing to begin the timer.
          </p>
        </div>

        {/* Duration selector */}
        <div style={{
          display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center",
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginRight: 4 }}>Duration:</span>
          {DURATIONS.map(d => (
            <button key={d.value} onClick={() => handleDurationChange(d.value)}
              disabled={started && !finished}
              style={{
                padding: "7px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                border: `1.5px solid ${duration === d.value ? theme.primary : theme.border}`,
                background: duration === d.value ? (dark ? "rgba(45,212,191,0.15)" : "rgba(13,148,136,0.08)") : theme.surfaceAlt,
                color: duration === d.value ? theme.primary : theme.text,
                cursor: started && !finished ? "default" : "pointer",
                opacity: started && !finished ? 0.6 : 1,
                transition: "all 0.15s",
              }}>
              {d.label}
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <div style={{
          display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap",
        }}>
          <div style={{
            flex: 1, minWidth: 100, background: theme.surface, borderRadius: 10,
            padding: "14px 16px", border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: theme.primary, fontFamily: "monospace" }}>
              {stats.wpm}
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>WPM</div>
          </div>
          <div style={{
            flex: 1, minWidth: 100, background: theme.surface, borderRadius: 10,
            padding: "14px 16px", border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: stats.accuracy >= 95 ? theme.success : stats.accuracy >= 80 ? theme.primary : theme.danger, fontFamily: "monospace" }}>
              {stats.accuracy}%
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Accuracy</div>
          </div>
          <div style={{
            flex: 1, minWidth: 100, background: theme.surface, borderRadius: 10,
            padding: "14px 16px", border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: theme.text, fontFamily: "monospace" }}>
              {timeLeft}s
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Time Left</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          width: "100%", height: 6, background: theme.border, borderRadius: 3,
          marginBottom: 20, overflow: "hidden",
        }}>
          <div style={{
            height: "100%", borderRadius: 3, transition: "width 1s linear",
            background: finished ? theme.success : theme.primary,
            width: progressPct + "%",
          }} />
        </div>

        {/* Text display */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: "24px 24px 20px",
          border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 16,
          cursor: finished ? "default" : "text",
          position: "relative",
        }}
          onClick={() => !finished && inputRef.current?.focus()}
        >
          <div style={{
            fontSize: 18, lineHeight: 1.8, fontFamily: "'Courier New', Courier, monospace",
            letterSpacing: "0.02em", wordBreak: "break-word",
            userSelect: "none",
          }}>
            {renderText()}
          </div>

          {/* Hidden textarea for capturing input */}
          <textarea
            ref={inputRef}
            value={typed}
            onChange={handleInput}
            disabled={finished}
            autoFocus
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            style={{
              position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
              opacity: 0, cursor: finished ? "default" : "text",
              resize: "none", border: "none", outline: "none",
            }}
            onPaste={e => e.preventDefault()}
          />

          {!started && !finished && (
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              background: dark ? "rgba(12,10,9,0.7)" : "rgba(250,250,249,0.7)",
              borderRadius: 12, backdropFilter: "blur(2px)",
            }}>
              <div style={{
                fontSize: 16, fontWeight: 600, color: theme.primary,
                background: theme.surface, padding: "12px 24px", borderRadius: 10,
                border: `1.5px solid ${theme.primary}`,
              }}>
                Click here and start typing...
              </div>
            </div>
          )}
        </div>

        {/* Restart button */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 24 }}>
          <button onClick={handleRestart} style={{
            background: theme.primary, color: "#fff", border: "none", borderRadius: 10,
            padding: "14px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer",
            transition: "opacity 0.15s",
          }}>
            Restart Test
          </button>
        </div>

        {/* Results card */}
        {finished && (
          <div style={{
            background: theme.surface, borderRadius: 12, padding: 28,
            border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
            textAlign: "center",
          }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 20px", color: theme.text }}>Test Results</h2>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
              <div style={{
                background: theme.surfaceAlt, borderRadius: 10, padding: "16px 24px", minWidth: 120,
              }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: theme.primary, fontFamily: "monospace" }}>{stats.wpm}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted }}>Words Per Minute</div>
              </div>
              <div style={{
                background: theme.surfaceAlt, borderRadius: 10, padding: "16px 24px", minWidth: 120,
              }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: stats.accuracy >= 95 ? theme.success : stats.accuracy >= 80 ? theme.primary : theme.danger, fontFamily: "monospace" }}>{stats.accuracy}%</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted }}>Accuracy</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", fontSize: 14, color: theme.textMuted }}>
              <span><strong style={{ color: theme.success }}>{stats.correct}</strong> correct</span>
              <span><strong style={{ color: theme.danger }}>{stats.incorrect}</strong> incorrect</span>
              <span><strong style={{ color: theme.text }}>{stats.totalChars}</strong> total chars</span>
              <span><strong style={{ color: theme.text }}>{stats.elapsed}s</strong> elapsed</span>
            </div>
          </div>
        )}

        {/* FAQ */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: 24,
          border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: theme.text }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme} q="What is a good typing speed?" a="The average typing speed is around 40 words per minute. A speed of 60 to 70 WPM is considered above average and sufficient for most office jobs. Professional typists and programmers often type between 80 and 120 WPM. Speed above 100 WPM is considered excellent." />
          <FAQItem theme={theme} q="How is WPM calculated?" a="WPM is calculated using the standard formula: one word equals five characters. The number of correctly typed characters is divided by five, then divided by the elapsed time in minutes. This standardized method ensures consistent results regardless of word length in the test passage." />
          <FAQItem theme={theme} q="How can I improve my typing speed?" a="Practice daily for at least 10 to 15 minutes using proper touch typing technique. Keep your fingers on the home row, avoid looking at the keyboard, and focus on accuracy over speed. Muscle memory builds naturally with consistent practice, and speed follows once your accuracy is consistently above 95 percent." />
          <FAQItem theme={theme} q="Does accuracy matter more than speed?" a="Yes. High speed with low accuracy means you spend extra time correcting mistakes, which negates the speed advantage. Aim for at least 95 percent accuracy before pushing for higher WPM. Most employers and typing certifications weight accuracy heavily alongside raw speed." />
        </div>

        <SeoContent theme={theme} />
      </main>
    </div>
  );
}
