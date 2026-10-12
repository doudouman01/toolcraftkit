"use client";
import { useState, useEffect } from "react";

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

/* ─── COLOR UTILS ─── */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  if (hex.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(hex)) return null;
  return { r: parseInt(hex.slice(0, 2), 16), g: parseInt(hex.slice(2, 4), 16), b: parseInt(hex.slice(4, 6), 16) };
}

function luminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function contrastRatio(rgb1: { r: number; g: number; b: number }, rgb2: { r: number; g: number; b: number }): number {
  const l1 = luminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = luminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function normalizeHex(hex: string): string {
  hex = hex.replace("#", "").toUpperCase();
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  if (hex.length === 6 && /^[0-9A-F]{6}$/.test(hex)) return "#" + hex;
  return "";
}

/* ─── FAQ ─── */
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

/* ─── SEO CONTENT ─── */
function SeoContent({ theme }: { theme: typeof LIGHT }) {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>
        How to Use the Color Contrast Checker
      </h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>
        Pick a foreground (text) color and a background color using the color pickers or by entering hex values directly. The tool instantly calculates the contrast ratio and shows whether your combination passes WCAG AA and AAA standards for both normal and large text. Use the swap button to quickly reverse the colors and test readability both ways.
      </p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>
        Understanding WCAG Contrast Requirements
      </h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>
        The Web Content Accessibility Guidelines (WCAG) define minimum contrast ratios to ensure text is readable by people with visual impairments. AA level requires 4.5:1 for normal text and 3:1 for large text (18px bold or 24px regular). AAA level requires 7:1 for normal text and 4.5:1 for large text. Meeting at least AA is widely considered the baseline for accessible web design.
      </p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>
        Common Use Cases
      </h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Web designers verifying button and link colors against backgrounds</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Developers auditing existing UIs for accessibility compliance</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Brand teams ensuring logo text remains readable on brand backgrounds</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Content creators choosing accessible color schemes for presentations</li>
      </ul>

      <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: theme.primary, marginBottom: "4px" }}>Related Tools</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: theme.textMuted, margin: 0 }}>
          Need to convert color formats? Use our <a href="/tools/hex-to-rgb" style={{ color: theme.primary }}>Hex to RGB Converter</a>. Looking for color inspiration? Try the <a href="/tools/color-picker" style={{ color: theme.primary }}>Color Picker</a>.
        </p>
      </div>
    </section>
  );
}

/* ─── PASS/FAIL BADGE ─── */
function Badge({ pass, theme }: { pass: boolean; theme: typeof LIGHT }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700,
      background: pass ? theme.success + "1A" : theme.danger + "1A",
      color: pass ? theme.success : theme.danger,
      border: `1px solid ${pass ? theme.success + "33" : theme.danger + "33"}`,
    }}>
      {pass ? "PASS" : "FAIL"}
    </span>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function ContrastChecker() {
  const [dark, setDark] = useState(false);
  const theme = dark ? DARK : LIGHT;

  const [fg, setFg] = useState("#1C1917");
  const [bg, setBg] = useState("#FFFFFF");
  const [fgInput, setFgInput] = useState("#1C1917");
  const [bgInput, setBgInput] = useState("#FFFFFF");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      setDark(mq.matches);
      const handler = (e: MediaQueryListEvent) => setDark(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  const handleFgHex = (val: string) => {
    setFgInput(val);
    const n = normalizeHex(val);
    if (n) setFg(n);
  };

  const handleBgHex = (val: string) => {
    setBgInput(val);
    const n = normalizeHex(val);
    if (n) setBg(n);
  };

  const handleFgPicker = (val: string) => {
    const upper = val.toUpperCase();
    setFg(upper);
    setFgInput(upper);
  };

  const handleBgPicker = (val: string) => {
    const upper = val.toUpperCase();
    setBg(upper);
    setBgInput(upper);
  };

  const swapColors = () => {
    setFg(bg);
    setBg(fg);
    setFgInput(bg);
    setBgInput(fg);
  };

  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);
  const ratio = fgRgb && bgRgb ? contrastRatio(fgRgb, bgRgb) : 1;
  const ratioStr = ratio.toFixed(2);

  const passAANormal = ratio >= 4.5;
  const passAALarge = ratio >= 3;
  const passAAANormal = ratio >= 7;
  const passAAALarge = ratio >= 4.5;

  const inputStyle = {
    padding: "10px 12px", fontSize: 15, borderRadius: 8,
    border: `1.5px solid ${theme.border}`, background: theme.inputBg,
    color: theme.text, outline: "none", fontWeight: 500 as const,
    fontVariantNumeric: "tabular-nums" as const, width: 110,
  };

  const cardStyle = {
    background: theme.surface, borderRadius: 12, padding: 24,
    border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
  };

  return (
    <div style={{
      minHeight: "100vh", background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <main style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px 60px" }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 12, color: theme.textLight, marginBottom: 14, display: "flex", gap: 6, alignItems: "center" }}>
          <a href="/" style={{ color: theme.textMuted, textDecoration: "none" }}>Home</a><span>›</span>
          <a href="/#dev-tools" style={{ cursor: "pointer", color: theme.textMuted, textDecoration: "none" }}>Dev Tools</a><span>›</span>
          <span style={{ color: theme.primary, fontWeight: 500 }}>Color Contrast Checker</span>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.03em" }}>Color Contrast Checker</h1>
          <p style={{ fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5 }}>
            Test foreground and background color combinations against WCAG AA and AAA accessibility standards.
          </p>
        </div>

        {/* Color Inputs */}
        <div style={cardStyle}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-end", justifyContent: "center" }}>
            {/* Foreground */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted }}>Text Color</label>
              <input
                type="color"
                value={fg}
                onChange={(e) => handleFgPicker(e.target.value)}
                style={{ width: 60, height: 48, border: `2px solid ${theme.border}`, borderRadius: 10, cursor: "pointer", padding: 2, background: theme.surface }}
              />
              <input
                type="text"
                value={fgInput}
                onChange={(e) => handleFgHex(e.target.value)}
                placeholder="#000000"
                maxLength={7}
                style={inputStyle}
              />
            </div>

            {/* Swap Button */}
            <div style={{ display: "flex", alignItems: "center", paddingBottom: 8 }}>
              <button onClick={swapColors} title="Swap colors" style={{
                width: 42, height: 42, borderRadius: "50%", border: `2px solid ${theme.border}`,
                background: theme.surface, cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 18, color: theme.primary, fontWeight: 700,
                transition: "all 0.2s",
              }}>
                ⇄
              </button>
            </div>

            {/* Background */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted }}>Background Color</label>
              <input
                type="color"
                value={bg}
                onChange={(e) => handleBgPicker(e.target.value)}
                style={{ width: 60, height: 48, border: `2px solid ${theme.border}`, borderRadius: 10, cursor: "pointer", padding: 2, background: theme.surface }}
              />
              <input
                type="text"
                value={bgInput}
                onChange={(e) => handleBgHex(e.target.value)}
                placeholder="#FFFFFF"
                maxLength={7}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Contrast Ratio Display */}
        <div style={{ ...cardStyle, textAlign: "center" as const }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 8, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
            Contrast Ratio
          </div>
          <div style={{
            fontSize: 48, fontWeight: 800, letterSpacing: "-0.03em",
            color: ratio >= 4.5 ? theme.success : ratio >= 3 ? theme.primary : theme.danger,
            lineHeight: 1.1,
          }}>
            {ratioStr}:1
          </div>
          <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 6 }}>
            {ratio >= 7 ? "Excellent contrast" : ratio >= 4.5 ? "Good contrast" : ratio >= 3 ? "Minimum for large text" : "Insufficient contrast"}
          </div>
        </div>

        {/* WCAG Compliance Grid */}
        <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "16px 24px 12px", borderBottom: `1px solid ${theme.border}` }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>WCAG Compliance</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {[
              { label: "AA Normal Text", sub: "4.5 : 1", pass: passAANormal },
              { label: "AA Large Text", sub: "3 : 1", pass: passAALarge },
              { label: "AAA Normal Text", sub: "7 : 1", pass: passAAANormal },
              { label: "AAA Large Text", sub: "4.5 : 1", pass: passAAALarge },
            ].map((item, i) => (
              <div key={item.label} style={{
                padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center",
                borderBottom: i < 2 ? `1px solid ${theme.border}` : "none",
                borderRight: i % 2 === 0 ? `1px solid ${theme.border}` : "none",
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: theme.textLight, marginTop: 2 }}>Min ratio: {item.sub}</div>
                </div>
                <Badge pass={item.pass} theme={theme} />
              </div>
            ))}
          </div>
        </div>

        {/* Live Preview */}
        <div style={cardStyle}>
          <div style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 14, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
            Live Preview
          </div>
          <div style={{
            background: bg, borderRadius: 10, padding: 24,
            border: `1px solid ${theme.border}`,
          }}>
            <p style={{ color: fg, fontSize: 24, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.3 }}>
              Large Text (24px)
            </p>
            <p style={{ color: fg, fontSize: 18, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.4 }}>
              Bold Large Text (18px bold)
            </p>
            <p style={{ color: fg, fontSize: 16, fontWeight: 400, margin: "0 0 8px", lineHeight: 1.6 }}>
              Normal body text at 16px. This is how your regular paragraph content would appear with the selected color combination.
            </p>
            <p style={{ color: fg, fontSize: 12, fontWeight: 400, margin: 0, lineHeight: 1.5 }}>
              Small text at 12px for captions or footnotes.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ ...cardStyle, marginTop: 8 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 12px", color: theme.text }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme}
            q="What is WCAG and why does contrast matter?"
            a="WCAG (Web Content Accessibility Guidelines) is an international standard for making web content accessible to people with disabilities. Sufficient color contrast ensures that text is readable by people with low vision or color deficiencies. Many countries require WCAG compliance by law."
          />
          <FAQItem theme={theme}
            q="What is the difference between AA and AAA compliance?"
            a="AA is the minimum recommended level for most web content. It requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. AAA is the highest level, requiring 7:1 for normal text and 4.5:1 for large text. AAA is recommended for critical content but may be difficult to achieve across an entire site."
          />
          <FAQItem theme={theme}
            q="What counts as large text in WCAG?"
            a="Large text is defined as at least 18 points (24px) regular weight, or at least 14 points (approximately 18.66px) bold weight. Large text has lower contrast requirements because bigger characters are inherently easier to read."
          />
          <FAQItem theme={theme}
            q="How is the contrast ratio calculated?"
            a="The contrast ratio is calculated using relative luminance values of the two colors, based on the WCAG 2.0 formula. Each color channel (red, green, blue) is linearized and weighted according to human perception. The ratio ranges from 1:1 (no contrast, same color) to 21:1 (maximum contrast, black on white)."
          />
        </div>
      </main>

      <SeoContent theme={theme} />
    </div>
  );
}
