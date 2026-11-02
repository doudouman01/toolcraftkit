"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

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

/* ─── FAQ ITEM ─── */
function FAQItem({ q, a, theme }: { q: string; a: string; theme: typeof LIGHT }) {
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
function AdSlot({ position, theme }: { position: string; theme: typeof LIGHT }) {
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

/* ─── LANGUAGE NAMES MAP ─── */
function getLanguageDisplayName(langCode: string): string {
  const map: Record<string, string> = {
    "ar": "Arabic", "bg": "Bulgarian", "ca": "Catalan", "cs": "Czech",
    "da": "Danish", "de": "German", "el": "Greek", "en": "English",
    "es": "Spanish", "et": "Estonian", "fi": "Finnish", "fr": "French",
    "he": "Hebrew", "hi": "Hindi", "hr": "Croatian", "hu": "Hungarian",
    "id": "Indonesian", "it": "Italian", "ja": "Japanese", "ko": "Korean",
    "lt": "Lithuanian", "lv": "Latvian", "ms": "Malay", "nb": "Norwegian",
    "nl": "Dutch", "no": "Norwegian", "pl": "Polish", "pt": "Portuguese",
    "ro": "Romanian", "ru": "Russian", "sk": "Slovak", "sl": "Slovenian",
    "sv": "Swedish", "ta": "Tamil", "th": "Thai", "tr": "Turkish",
    "uk": "Ukrainian", "vi": "Vietnamese", "zh": "Chinese",
  };
  const base = langCode.split("-")[0].toLowerCase();
  return map[base] || langCode;
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export default function ClientPage() {
  const [text, setText] = useState("");
  const [dark, setDark] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [supported, setSupported] = useState(true);
  const [focused, setFocused] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const theme = dark ? DARK : LIGHT;

  /* ─── LOAD VOICES ─── */
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSupported(false);
      return;
    }

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) {
        setVoices(v);
        if (!selectedVoiceURI) {
          const defaultV = v.find((voice) => voice.default) || v[0];
          if (defaultV) setSelectedVoiceURI(defaultV.voiceURI);
        }
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  /* ─── GROUP VOICES BY LANGUAGE ─── */
  const availableLanguages = useMemo(() => {
    const langSet = new Map<string, string>();
    voices.forEach((v) => {
      const base = v.lang.split("-")[0].toLowerCase();
      if (!langSet.has(base)) {
        langSet.set(base, getLanguageDisplayName(base));
      }
    });
    return Array.from(langSet.entries())
      .sort((a, b) => a[1].localeCompare(b[1]));
  }, [voices]);

  const filteredVoices = useMemo(() => {
    if (languageFilter === "all") return voices;
    return voices.filter((v) => v.lang.split("-")[0].toLowerCase() === languageFilter);
  }, [voices, languageFilter]);

  const groupedVoices = useMemo(() => {
    const groups = new Map<string, SpeechSynthesisVoice[]>();
    filteredVoices.forEach((v) => {
      const langName = getLanguageDisplayName(v.lang);
      if (!groups.has(langName)) groups.set(langName, []);
      groups.get(langName)!.push(v);
    });
    return Array.from(groups.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filteredVoices]);

  /* ─── WORDS ARRAY FOR HIGHLIGHTING ─── */
  const words = useMemo(() => {
    return text.split(/(\s+)/).filter((w) => w.length > 0);
  }, [text]);

  /* ─── CLEANUP ON UNMOUNT ─── */
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  /* ─── PLAY ─── */
  const handlePlay = useCallback(() => {
    if (!text.trim()) return;
    if (!window.speechSynthesis) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.voiceURI === selectedVoiceURI);
    if (voice) utterance.voice = voice;
    utterance.rate = speed;
    utterance.pitch = pitch;

    utterance.onboundary = (event: SpeechSynthesisEvent) => {
      if (event.name === "word") {
        const charIndex = event.charIndex;
        let charCount = 0;
        for (let i = 0; i < words.length; i++) {
          charCount += words[i].length;
          if (charCount > charIndex) {
            setCurrentWordIndex(i);
            break;
          }
        }
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentWordIndex(-1);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentWordIndex(-1);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  }, [text, voices, selectedVoiceURI, speed, pitch, isPaused, words]);

  /* ─── PAUSE ─── */
  const handlePause = useCallback(() => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  }, []);

  /* ─── STOP ─── */
  const handleStop = useCallback(() => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentWordIndex(-1);
  }, []);

  /* ─── RENDER HIGHLIGHTED TEXT ─── */
  const renderHighlightedText = () => {
    if (currentWordIndex < 0 || (!isPlaying && !isPaused)) return null;
    return (
      <div style={{
        padding: "16px 18px", fontSize: 15, lineHeight: 1.7,
        fontFamily: "'Inter', system-ui, sans-serif", color: theme.text,
        whiteSpace: "pre-wrap", wordBreak: "break-word",
      }}>
        {words.map((word, i) => (
          <span key={i} style={{
            background: i === currentWordIndex ? (dark ? "rgba(45,212,191,0.25)" : "rgba(13,148,136,0.15)") : "transparent",
            color: i === currentWordIndex ? theme.primary : theme.text,
            borderRadius: i === currentWordIndex ? 3 : 0,
            padding: i === currentWordIndex ? "1px 2px" : 0,
            fontWeight: i === currentWordIndex ? 600 : 400,
            transition: "background 0.1s ease, color 0.1s ease",
          }}>{word}</span>
        ))}
      </div>
    );
  };

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div style={{
      minHeight: "100vh", background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <ToolSchema
        name="Text to Speech"
        description="Free online text to speech tool. Convert text to spoken audio using your browser. Multiple voices, languages, adjustable speed and pitch. No signup required."
        slug="text-to-speech"
        category="UtilitiesApplication"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://toolcraftkit.com" },
        { name: "Productivity Tools", url: "https://toolcraftkit.com/#productivity-tools" },
        { name: "Text to Speech", url: "https://toolcraftkit.com/tools/text-to-speech" },
      ]} />

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "24px 16px 60px" }}>

        {/* Ad slot: header */}
        <AdSlot position="header" theme={theme} />

        {/* ─── TITLE ─── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <h1 style={{
              fontSize: 26, fontWeight: 800, margin: 0,
              letterSpacing: "-0.03em", lineHeight: 1.2,
            }}>Text to Speech</h1>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: "3px 8px",
              borderRadius: 5, background: dark ? "rgba(45,212,191,0.15)" : "rgba(13,148,136,0.1)",
              color: theme.primary,
            }}>
              FREE
            </span>
          </div>
          <p style={{
            fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5,
          }}>
            Convert text to speech using your browser's built-in speech engine. Choose from multiple voices and languages, adjust speed and pitch.
          </p>
        </div>

        {/* ─── NOT SUPPORTED WARNING ─── */}
        {!supported && (
          <div style={{
            background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10,
            padding: "16px 20px", marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#DC2626", marginBottom: 4 }}>
              Browser Not Supported
            </div>
            <p style={{ fontSize: 13, color: "#991B1B", margin: 0, lineHeight: 1.6 }}>
              Your browser does not support the Web Speech API. Please try a modern browser like Chrome, Edge, Safari, or Firefox.
            </p>
          </div>
        )}

        {/* ─── TEXTAREA WITH HIGHLIGHT OVERLAY ─── */}
        <div style={{
          background: theme.surface, borderRadius: 12,
          border: `1.5px solid ${focused ? theme.primary : theme.border}`,
          overflow: "hidden", marginBottom: 16,
          transition: "border-color 0.2s ease",
          boxShadow: focused ? `0 0 0 3px ${dark ? "rgba(45,212,191,0.15)" : "rgba(13,148,136,0.1)"}` : theme.shadow,
        }}>
          {/* Show highlighted text overlay when speaking */}
          {(isPlaying || isPaused) && currentWordIndex >= 0 ? (
            renderHighlightedText()
          ) : (
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (isPlaying || isPaused) handleStop();
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Type or paste your text here to convert to speech..."
              style={{
                width: "100%", minHeight: 200, padding: "16px 18px",
                fontSize: 15, lineHeight: 1.7, color: theme.text,
                fontFamily: "'Inter', system-ui, sans-serif",
                border: "none", outline: "none", resize: "vertical",
                background: "transparent", boxSizing: "border-box",
              }}
            />
          )}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "8px 14px", background: theme.surfaceAlt,
            borderTop: `1px solid ${theme.border}`, fontSize: 12,
            flexWrap: "wrap", gap: 8,
          }}>
            <div style={{ display: "flex", gap: 14, color: theme.textLight }}>
              <span><strong style={{ color: theme.text }}>{charCount.toLocaleString()}</strong> characters</span>
              <span><strong style={{ color: theme.text }}>{wordCount.toLocaleString()}</strong> words</span>
            </div>
            <div style={{ display: "flex", gap: 2 }}>
              {text.length > 0 && (
                <button onClick={() => { setText(""); handleStop(); }} style={{
                  background: "none", border: "none", color: theme.danger,
                  fontSize: 12, cursor: "pointer", padding: "3px 8px", borderRadius: 5,
                  fontWeight: 500,
                }}>Clear</button>
              )}
            </div>
          </div>
        </div>

        {/* ─── CONTROLS ─── */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: "18px 18px",
          border: `1px solid ${theme.border}`, marginBottom: 16,
          boxShadow: theme.shadow,
        }}>
          {/* Voice + Language Filter Row */}
          <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            {/* Language Filter */}
            <div style={{ flex: "1 1 180px", minWidth: 0 }}>
              <label style={{
                fontSize: 12, fontWeight: 600, color: theme.text,
                marginBottom: 6, display: "block",
              }}>Language</label>
              <select
                value={languageFilter}
                onChange={(e) => {
                  setLanguageFilter(e.target.value);
                  if (isPlaying || isPaused) handleStop();
                }}
                style={{
                  width: "100%", padding: "9px 12px", fontSize: 13,
                  border: `1px solid ${theme.border}`, borderRadius: 8,
                  background: theme.inputBg, color: theme.text,
                  outline: "none", cursor: "pointer", boxSizing: "border-box",
                }}
              >
                <option value="all">All Languages</option>
                {availableLanguages.map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>

            {/* Voice Selector */}
            <div style={{ flex: "2 1 280px", minWidth: 0 }}>
              <label style={{
                fontSize: 12, fontWeight: 600, color: theme.text,
                marginBottom: 6, display: "block",
              }}>Voice</label>
              <select
                value={selectedVoiceURI}
                onChange={(e) => {
                  setSelectedVoiceURI(e.target.value);
                  if (isPlaying || isPaused) handleStop();
                }}
                style={{
                  width: "100%", padding: "9px 12px", fontSize: 13,
                  border: `1px solid ${theme.border}`, borderRadius: 8,
                  background: theme.inputBg, color: theme.text,
                  outline: "none", cursor: "pointer", boxSizing: "border-box",
                }}
              >
                {voices.length === 0 && (
                  <option value="">Loading voices...</option>
                )}
                {groupedVoices.map(([langName, langVoices]) => (
                  <optgroup key={langName} label={langName}>
                    {langVoices.map((v) => (
                      <option key={v.voiceURI} value={v.voiceURI}>
                        {v.name} ({v.lang}){v.default ? " - Default" : ""}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {/* Speed Slider */}
          <div style={{ marginBottom: 14 }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 6,
            }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: theme.text }}>
                Speed
              </label>
              <span style={{
                fontSize: 12, fontWeight: 600, color: theme.primary,
                background: dark ? "rgba(45,212,191,0.1)" : "rgba(13,148,136,0.08)",
                padding: "2px 8px", borderRadius: 4,
              }}>{speed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              style={{
                width: "100%", height: 6, cursor: "pointer",
                accentColor: theme.primary,
              }}
            />
            <div style={{
              display: "flex", justifyContent: "space-between", fontSize: 10,
              color: theme.textLight, marginTop: 2,
            }}>
              <span>0.5x</span>
              <span>1x</span>
              <span>2x</span>
            </div>
          </div>

          {/* Pitch Slider */}
          <div style={{ marginBottom: 18 }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 6,
            }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: theme.text }}>
                Pitch
              </label>
              <span style={{
                fontSize: 12, fontWeight: 600, color: theme.primary,
                background: dark ? "rgba(45,212,191,0.1)" : "rgba(13,148,136,0.08)",
                padding: "2px 8px", borderRadius: 4,
              }}>{pitch.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              style={{
                width: "100%", height: 6, cursor: "pointer",
                accentColor: theme.primary,
              }}
            />
            <div style={{
              display: "flex", justifyContent: "space-between", fontSize: 10,
              color: theme.textLight, marginTop: 2,
            }}>
              <span>0.5</span>
              <span>1.0</span>
              <span>2.0</span>
            </div>
          </div>

          {/* Play / Pause / Stop Buttons */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {!isPlaying ? (
              <button
                onClick={handlePlay}
                disabled={!supported || !text.trim()}
                style={{
                  flex: "1 1 140px", padding: "12px 24px", fontSize: 15, fontWeight: 700,
                  background: !supported || !text.trim() ? theme.border : theme.primary,
                  color: !supported || !text.trim() ? theme.textLight : "#FFFFFF",
                  border: "none", borderRadius: 10, cursor: !supported || !text.trim() ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "background 0.2s ease",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                {isPaused ? "Resume" : "Play"}
              </button>
            ) : (
              <button
                onClick={handlePause}
                style={{
                  flex: "1 1 140px", padding: "12px 24px", fontSize: 15, fontWeight: 700,
                  background: theme.accent, color: "#FFFFFF",
                  border: "none", borderRadius: 10, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "background 0.2s ease",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
                Pause
              </button>
            )}

            <button
              onClick={handleStop}
              disabled={!isPlaying && !isPaused}
              style={{
                flex: "0 0 auto", padding: "12px 24px", fontSize: 15, fontWeight: 700,
                background: theme.surface, color: !isPlaying && !isPaused ? theme.textLight : theme.text,
                border: `2px solid ${!isPlaying && !isPaused ? theme.border : theme.border}`,
                borderRadius: 10, cursor: !isPlaying && !isPaused ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "all 0.2s ease",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h12v12H6z"/>
              </svg>
              Stop
            </button>
          </div>

          {/* Status indicator */}
          {(isPlaying || isPaused) && (
            <div style={{
              marginTop: 12, padding: "8px 12px", borderRadius: 8,
              background: theme.surfaceAlt, fontSize: 12, color: theme.textMuted,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: isPlaying ? theme.success : theme.warning,
                display: "inline-block",
                animation: isPlaying ? "pulse 1.5s ease-in-out infinite" : "none",
              }} />
              <span>{isPlaying ? "Speaking..." : "Paused"}</span>
              <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
            </div>
          )}
        </div>

        {/* Ad slot: middle */}
        <AdSlot position="middle" theme={theme} />

        {/* ─── ABOUT SECTION ─── */}
        <section style={{
          background: theme.surface, borderRadius: 12, padding: "18px 18px",
          border: `1px solid ${theme.border}`, marginBottom: 20,
          boxShadow: theme.shadow,
        }}>
          <h2 style={{
            fontSize: 20, fontWeight: 700, margin: "0 0 12px", letterSpacing: "-0.02em",
            color: theme.text,
          }}>About This Tool</h2>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            This text-to-speech tool uses your browser's built-in speech synthesis engine (Web Speech API) to read text aloud. No data is ever sent to a server — everything happens locally in your browser.
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            The available voices depend on your operating system and browser. Chrome typically offers Google's high-quality voices, while Safari uses Apple's voices. Edge provides Microsoft's voices. You can filter by language and pick the voice that sounds best to you.
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: 0 }}>
            Adjust speed (0.5x to 2x) to slow down for language learning or speed up for quick reviews. The pitch slider lets you raise or lower the voice tone. The current word is highlighted as it's being spoken, making it easy to follow along.
          </p>
        </section>

        {/* ─── TIPS SECTION ─── */}
        <section style={{
          background: theme.surface, borderRadius: 12, padding: "18px 18px",
          border: `1px solid ${theme.border}`, marginBottom: 20,
          boxShadow: theme.shadow,
        }}>
          <h2 style={{
            fontSize: 20, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em",
            color: theme.text,
          }}>How to Use</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { step: "1", title: "Enter Text", desc: "Type or paste the text you want to hear spoken aloud." },
              { step: "2", title: "Choose Voice", desc: "Filter by language, then select a specific voice from the dropdown." },
              { step: "3", title: "Adjust Settings", desc: "Set your preferred speed and pitch using the sliders." },
              { step: "4", title: "Press Play", desc: "Hit the Play button to start listening. Pause or stop at any time." },
            ].map((item) => (
              <div key={item.step} style={{
                display: "flex", gap: 12, alignItems: "flex-start",
              }}>
                <span style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: dark ? "rgba(45,212,191,0.15)" : "rgba(13,148,136,0.1)",
                  color: theme.primary, fontSize: 12, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: 1,
                }}>{item.step}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: theme.text, marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ marginBottom: 20 }}>
          <h2 style={{
            fontSize: 20, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em",
          }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme}
            q="Is my text sent to a server?"
            a="No. This tool uses the Web Speech API built into your browser. Your text stays on your device and is never uploaded or stored anywhere. It's completely private."
          />
          <FAQItem theme={theme}
            q="Why don't I see many voices?"
            a="The available voices depend on your operating system and browser. Chrome on desktop typically offers the most voices. Mobile browsers may have fewer options. On macOS, you can add more voices in System Settings > Accessibility > Spoken Content."
          />
          <FAQItem theme={theme}
            q="Can I download the audio?"
            a="The Web Speech API plays audio in real-time through your speakers but does not provide a downloadable audio file. For audio file generation, you would need a cloud-based TTS service."
          />
          <FAQItem theme={theme}
            q="What languages are supported?"
            a="The supported languages depend on the voices installed on your system. Most modern browsers support English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Korean, and many more."
          />
          <FAQItem theme={theme}
            q="Why does the speech stop in the middle of long text?"
            a="Some browsers have a timeout for continuous speech synthesis. If this happens, try breaking your text into shorter paragraphs and playing them one at a time."
          />
          <FAQItem theme={theme}
            q="What is the word highlighting feature?"
            a="As the text is read aloud, the current word being spoken is highlighted in the text area. This uses the Web Speech API's boundary event to track which word is being spoken in real time."
          />
          <FAQItem theme={theme}
            q="Does this work on mobile?"
            a="Yes, text-to-speech works on most modern mobile browsers. However, the available voices and features may differ from the desktop version. iOS Safari and Android Chrome both support the Web Speech API."
          />
          <FAQItem theme={theme}
            q="Is this tool really free?"
            a="Yes, completely free with no limits. Since it uses your browser's built-in speech engine, there's no server cost involved. Use it as much as you want."
          />
        </section>

        {/* Ad slot: footer */}
        <AdSlot position="footer" theme={theme} />

        {/* ─── SEO CONTENT ─── */}
        <SeoContent />

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
