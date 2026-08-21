"use client";
import { useState, useMemo, useCallback } from "react";

/* ─── BRAND TOKENS ─── */
const LIGHT = {
  primary: "#0D9488", primaryLight: "#14B8A6", primaryDark: "#0F766E",
  bg: "#FAFAF9", surface: "#FFFFFF", surfaceAlt: "#F5F5F4",
  border: "#E7E5E4", text: "#1C1917", textMuted: "#78716C", textLight: "#A8A29E",
  success: "#10B981", danger: "#EF4444",
  inputBg: "#FFFFFF", shadow: "0 1px 3px rgba(0,0,0,0.06)",
};
const DARK = {
  primary: "#2DD4BF", primaryLight: "#5EEAD4", primaryDark: "#14B8A6",
  bg: "#0C0A09", surface: "#1C1917", surfaceAlt: "#292524",
  border: "#3F3F46", text: "#FAFAF9", textMuted: "#A8A29E", textLight: "#78716C",
  success: "#34D399", danger: "#F87171",
  inputBg: "#292524", shadow: "0 1px 3px rgba(0,0,0,0.3)",
};

/* ─── LOREM IPSUM CORPUS ─── */
const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis quasi architecto beatae vitae dicta explicabo nemo ipsam quia voluptas aspernatur aut odit fugit consequuntur magni dolores eos ratione sequi nesciunt neque porro quisquam dolorem adipisci numquam eius modi tempora quaerat magnam aliquam quod minima nostrum exercitationem ullam corporis suscipit laboriosam nisi aliquid commodi consequatur autem vel illum blanditiis praesentium voluptatum deleniti atque corrupti quos quas molestias excepturi occaecati cupiditate provident similique mollitia animi distinctio nam libero tempore cum soluta nobis eligendi optio cumque nihil impedit quo minus maxime placeat facere possimus omnis assumenda repudiandae temporibus quibusdam officiis debitis rerum necessitatibus saepe eveniet voluptates repudiandae recusandae itaque earum hic tenetur sapiente delectus reiciendis voluptatibus maiores alias perferendis doloribus asperiores repellat".split(" ");

const CLASSIC_FIRST = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

function getRandomWords(count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }
  return result;
}

function makeSentence(minWords, maxWords) {
  const count = minWords + Math.floor(Math.random() * (maxWords - minWords + 1));
  const words = getRandomWords(count);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function makeParagraph(minSentences, maxSentences) {
  const count = minSentences + Math.floor(Math.random() * (maxSentences - minSentences + 1));
  const sentences = [];
  for (let i = 0; i < count; i++) {
    sentences.push(makeSentence(8, 18));
  }
  return sentences.join(" ");
}

function generate(mode, count, startClassic, addPTags) {
  if (count < 1) return "";
  let result = [];

  if (mode === "paragraphs") {
    for (let i = 0; i < count; i++) {
      if (i === 0 && startClassic) {
        result.push(CLASSIC_FIRST + " " + makeParagraph(3, 5));
      } else {
        result.push(makeParagraph(4, 7));
      }
    }
    if (addPTags) {
      return result.map((p) => `<p>${p}</p>`).join("\n");
    }
    return result.join("\n\n");
  }

  if (mode === "sentences") {
    for (let i = 0; i < count; i++) {
      if (i === 0 && startClassic) {
        result.push(CLASSIC_FIRST);
      } else {
        result.push(makeSentence(8, 18));
      }
    }
    return result.join(" ");
  }

  if (mode === "words") {
    if (startClassic) {
      const classicWords = CLASSIC_FIRST.replace(".", "").split(" ");
      const remaining = count - classicWords.length;
      if (remaining <= 0) {
        return classicWords.slice(0, count).join(" ") + ".";
      }
      return classicWords.join(" ") + " " + getRandomWords(remaining).join(" ") + ".";
    }
    return getRandomWords(count).join(" ") + ".";
  }

  if (mode === "list") {
    for (let i = 0; i < count; i++) {
      result.push(makeSentence(5, 12));
    }
    if (addPTags) {
      return "<ul>\n" + result.map((s) => `  <li>${s}</li>`).join("\n") + "\n</ul>";
    }
    return result.map((s, i) => `${i + 1}. ${s}`).join("\n");
  }

  return "";
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

/* ═══════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════ */
export default function LoremIpsumGenerator() {
  const [dark, setDark] = useState(false);
  const [mode, setMode] = useState("paragraphs");
  const [count, setCount] = useState(3);
  const [startClassic, setStartClassic] = useState(true);
  const [addPTags, setAddPTags] = useState(false);
  const [copied, setCopied] = useState(false);
  const [seed, setSeed] = useState(0);
  const theme = dark ? DARK : LIGHT;

  const output = useMemo(() => generate(mode, count, startClassic, addPTags), [mode, count, startClassic, addPTags, seed]);

  const wordCount = output.replace(/<[^>]*>/g, "").match(/\S+/g)?.length || 0;
  const charCount = output.replace(/<[^>]*>/g, "").length;

  const copy = useCallback(() => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [output]);

  const download = useCallback(() => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = addPTags ? "lorem-ipsum.html" : "lorem-ipsum.txt"; a.click();
    URL.revokeObjectURL(url);
  }, [output, addPTags]);

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

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "24px 16px 60px" }}>

        <div style={{
          fontSize: 12, color: theme.textLight, marginBottom: 14,
          display: "flex", gap: 6, alignItems: "center",
        }}>
          <span style={{ cursor: "pointer", color: theme.textMuted }}>Home</span><span>›</span>
          <span style={{ cursor: "pointer", color: theme.textMuted }}>Text Tools</span><span>›</span>
          <span style={{ color: theme.primary, fontWeight: 500 }}>Lorem Ipsum Generator</span>
        </div>

        <AdSlot position="header" theme={theme} />

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.03em" }}>Lorem Ipsum Generator</h1>
          <p style={{ fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5 }}>
            Generate placeholder text for designs, mockups, and prototypes. Choose paragraphs, sentences, words, or lists.
          </p>
        </div>

        {/* CONTROLS */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: "18px",
          border: `1px solid ${theme.border}`, marginBottom: 16,
          boxShadow: theme.shadow,
        }}>
          {/* Mode selector */}
          <div style={{ display: "flex", gap: 4, marginBottom: 16, background: theme.surfaceAlt, padding: 4, borderRadius: 10 }}>
            {[
              { key: "paragraphs", label: "Paragraphs" },
              { key: "sentences", label: "Sentences" },
              { key: "words", label: "Words" },
              { key: "list", label: "List Items" },
            ].map((m) => (
              <button key={m.key} onClick={() => { setMode(m.key); setSeed((s) => s + 1); }} style={{
                padding: "7px 14px", fontSize: 13,
                fontWeight: mode === m.key ? 600 : 500,
                color: mode === m.key ? theme.primary : theme.textMuted,
                background: mode === m.key ? (dark ? "rgba(45,212,191,0.1)" : "rgba(13,148,136,0.08)") : "transparent",
                border: "none", borderRadius: 7, cursor: "pointer", flex: 1,
              }}>{m.label}</button>
            ))}
          </div>

          {/* Count + options */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <label style={{ fontSize: 13, color: theme.textMuted, fontWeight: 500 }}>
                {mode === "paragraphs" ? "Paragraphs:" : mode === "sentences" ? "Sentences:" : mode === "words" ? "Words:" : "Items:"}
              </label>
              <input
                type="number"
                value={count}
                onChange={(e) => { setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1))); setSeed((s) => s + 1); }}
                min="1" max="100"
                style={{
                  width: 60, padding: "6px 8px", fontSize: 14, borderRadius: 6,
                  border: `1px solid ${theme.border}`, background: theme.inputBg,
                  color: theme.text, outline: "none", textAlign: "center",
                }}
                onFocus={(e) => e.target.style.borderColor = theme.primary}
                onBlur={(e) => e.target.style.borderColor = theme.border}
              />
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: theme.textMuted, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={startClassic}
                onChange={(e) => { setStartClassic(e.target.checked); setSeed((s) => s + 1); }}
                style={{ accentColor: theme.primary }}
              />
              Start with "Lorem ipsum..."
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: theme.textMuted, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={addPTags}
                onChange={(e) => { setAddPTags(e.target.checked); setSeed((s) => s + 1); }}
                style={{ accentColor: theme.primary }}
              />
              Include HTML tags
            </label>

            <button onClick={() => setSeed((s) => s + 1)} style={{
              padding: "6px 14px", fontSize: 13, fontWeight: 500,
              color: theme.primary, background: dark ? "rgba(45,212,191,0.1)" : "rgba(13,148,136,0.08)",
              border: "none", borderRadius: 7, cursor: "pointer", marginLeft: "auto",
            }}>↻ Regenerate</button>
          </div>
        </div>

        {/* OUTPUT */}
        <div style={{
          background: theme.surface, borderRadius: 12,
          border: `1px solid ${theme.border}`, overflow: "hidden",
          marginBottom: 20, boxShadow: theme.shadow,
        }}>
          <div style={{
            padding: "18px", minHeight: 200, maxHeight: 500, overflowY: "auto",
          }}>
            <pre style={{
              fontSize: 14, lineHeight: 1.8, color: theme.text, margin: 0,
              fontFamily: addPTags ? "'Consolas', 'Monaco', monospace" : "'Inter', system-ui, sans-serif",
              whiteSpace: "pre-wrap", wordBreak: "break-word",
            }}>{output}</pre>
          </div>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "8px 14px", background: theme.surfaceAlt,
            borderTop: `1px solid ${theme.border}`, fontSize: 12, flexWrap: "wrap", gap: 8,
          }}>
            <div style={{ display: "flex", gap: 14, color: theme.textLight }}>
              <span><strong style={{ color: theme.text }}>{wordCount.toLocaleString()}</strong> words</span>
              <span><strong style={{ color: theme.text }}>{charCount.toLocaleString()}</strong> characters</span>
              <span><strong style={{ color: theme.text }}>{mode === "paragraphs" ? count : mode === "sentences" ? count : mode === "list" ? count : "—"}</strong> {mode}</span>
            </div>
            <div style={{ display: "flex", gap: 2 }}>
              <button onClick={copy} style={{
                background: "none", border: "none", color: copied ? theme.success : theme.textMuted,
                fontSize: 12, cursor: "pointer", padding: "3px 8px", borderRadius: 5, fontWeight: 500,
              }}>{copied ? "✓ Copied" : "Copy"}</button>
              <button onClick={download} style={{
                background: "none", border: "none", color: theme.textMuted,
                fontSize: 12, cursor: "pointer", padding: "3px 8px", borderRadius: 5, fontWeight: 500,
              }}>Download</button>
            </div>
          </div>
        </div>

        <AdSlot position="middle" theme={theme} />

        {/* SEO CONTENT */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            How to Use This Lorem Ipsum Generator
          </h2>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            Select your output type — paragraphs, sentences, words, or list items — and set the quantity you need. The generator creates placeholder text instantly. Click Regenerate to get different text with the same settings.
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            Enable "Start with Lorem ipsum" to begin with the classic opening phrase that designers and typesetters have used since the 1500s. Enable "Include HTML tags" to wrap output in paragraph or list tags, ready to paste directly into your code.
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: 0 }}>
            The word and character count updates automatically so you can generate the exact amount of placeholder text your layout needs. Copy the result or download it as a text file.
          </p>
        </section>

        {/* HISTORY */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            What Is Lorem Ipsum?
          </h2>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            Lorem Ipsum is placeholder text used in the printing and design industry since the 1500s. It originates from a work by Cicero written in 45 BC called "de Finibus Bonorum et Malorum" (On the Ends of Good and Evil). A printer scrambled parts of this text to create a type specimen book, and it has been the industry standard ever since.
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: 0 }}>
            Designers use Lorem Ipsum because it has a natural distribution of letters and word lengths that resembles real content, making layouts look realistic without the distraction of readable text. It helps clients and stakeholders focus on visual design rather than reading the copy.
          </p>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
            Frequently Asked Questions
          </h2>
          <FAQItem theme={theme}
            q="Why use Lorem Ipsum instead of real text?"
            a="Lorem Ipsum prevents readers from being distracted by the content when evaluating a design. Real text draws attention to what the words say rather than how the layout looks. Using placeholder text keeps the focus on typography, spacing, and visual hierarchy."
          />
          <FAQItem theme={theme}
            q="How much Lorem Ipsum do I need for a page?"
            a="A standard printed page holds about 250-300 words. A typical web page has 300-600 words of body content. For blog post mockups, use 3-5 paragraphs (roughly 600-1000 words). For card or UI components, 1-2 sentences is usually enough."
          />
          <FAQItem theme={theme}
            q="Is Lorem Ipsum copyrighted?"
            a="No. Lorem Ipsum is in the public domain. The original source text by Cicero is over 2,000 years old, and the scrambled version used as placeholder text has no copyright protection. You can use it freely in any project."
          />
          <FAQItem theme={theme}
            q="Can I use Lorem Ipsum in production?"
            a="Lorem Ipsum is intended for design and development only. Shipping a product with placeholder text looks unprofessional and can hurt credibility and SEO. Always replace it with real content before launch."
          />
          <FAQItem theme={theme}
            q="What are alternatives to Lorem Ipsum?"
            a="Some designers prefer real-language placeholder generators that use English (or other languages) to better approximate the look of final content. Others use 'Hipster Ipsum', 'Bacon Ipsum', or 'Cupcake Ipsum' for humor. The best alternative is often draft copy from the actual project."
          />
          <FAQItem theme={theme}
            q="Does this tool store my generated text?"
            a="No. The text is generated entirely in your browser using a built-in word bank. Nothing is sent to any server."
          />
        </section>

        <AdSlot position="footer" theme={theme} />

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
