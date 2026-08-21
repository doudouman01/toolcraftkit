"use client";
import { useState, useMemo, useCallback } from "react";

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
function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  if (hex.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(hex)) return null;
  return { r: parseInt(hex.slice(0, 2), 16), g: parseInt(hex.slice(2, 4), 16), b: parseInt(hex.slice(4, 6), 16) };
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("").toUpperCase();
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function rgbToCmyk(r, g, b) {
  if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 };
  const rr = r / 255, gg = g / 255, bb = b / 255;
  const k = 1 - Math.max(rr, gg, bb);
  return {
    c: Math.round(((1 - rr - k) / (1 - k)) * 100),
    m: Math.round(((1 - gg - k) / (1 - k)) * 100),
    y: Math.round(((1 - bb - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

function luminance(r, g, b) {
  const a = [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function contrastRatio(rgb1, rgb2) {
  const l1 = luminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = luminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function generateShades(hex, count) {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];
  const shades = [];
  for (let i = 0; i < count; i++) {
    const factor = 1 - (i / (count - 1));
    shades.push({
      hex: rgbToHex(Math.round(rgb.r * factor), Math.round(rgb.g * factor), Math.round(rgb.b * factor)),
      label: `${Math.round(factor * 100)}%`,
    });
  }
  return shades;
}

function generateTints(hex, count) {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];
  const tints = [];
  for (let i = 0; i < count; i++) {
    const factor = i / (count - 1);
    tints.push({
      hex: rgbToHex(
        Math.round(rgb.r + (255 - rgb.r) * factor),
        Math.round(rgb.g + (255 - rgb.g) * factor),
        Math.round(rgb.b + (255 - rgb.b) * factor)
      ),
      label: `+${Math.round(factor * 100)}%`,
    });
  }
  return tints;
}

/* ─── COPY BUTTON ─── */
function CopyBtn({ text, theme }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1200); }); };
  return (
    <button onClick={copy} style={{
      background: copied ? theme.success : theme.surfaceAlt,
      border: `1px solid ${copied ? theme.success : theme.border}`,
      color: copied ? "#fff" : theme.textMuted, fontSize: 11, fontWeight: 500,
      padding: "3px 8px", borderRadius: 5, cursor: "pointer", transition: "all 0.2s ease",
    }}>{copied ? "✓" : "Copy"}</button>
  );
}

/* ─── FORMAT ROW ─── */
function FormatRow({ label, value, theme }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 14px", borderBottom: `1px solid ${theme.border}`,
    }}>
      <span style={{ fontSize: 13, color: theme.textMuted, fontWeight: 500, width: 60 }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: "'Consolas', 'Monaco', monospace", flex: 1, marginLeft: 16 }}>{value}</span>
      <CopyBtn text={value} theme={theme} />
    </div>
  );
}

function FAQItem({ q, a, theme }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${theme.border}`, padding: "13px 0" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        width: "100%", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left",
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, lineHeight: 1.4, paddingRight: 16 }}>{q}</span>
        <span style={{ fontSize: 18, color: theme.textMuted, flexShrink: 0, transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s ease", lineHeight: 1 }}>+</span>
      </button>
      {open && <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.65, marginTop: 10, marginBottom: 0, paddingRight: 30 }}>{a}</p>}
    </div>
  );
}

function AdSlot({ position, theme }) {
  return (
    <div style={{
      border: `1px dashed ${theme.border}`, borderRadius: 8, padding: "12px",
      textAlign: "center", color: theme.textLight, fontSize: 11, fontStyle: "italic",
      background: theme.surfaceAlt, margin: position === "header" ? "0 0 20px" : "20px 0", opacity: 0.5,
    }}>Ad Slot — {position}</div>
  );
}

/* ═══════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════ */
export default function HexToRgbConverter() {
  const [dark, setDark] = useState(false);
  const [hexInput, setHexInput] = useState("0D9488");
  const [pickerColor, setPickerColor] = useState("#0D9488");
  const theme = dark ? DARK : LIGHT;

  const rgb = useMemo(() => hexToRgb(hexInput), [hexInput]);
  const hsl = useMemo(() => rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null, [rgb]);
  const cmyk = useMemo(() => rgb ? rgbToCmyk(rgb.r, rgb.g, rgb.b) : null, [rgb]);
  const hexClean = rgb ? rgbToHex(rgb.r, rgb.g, rgb.b) : null;

  const contrastWhite = rgb ? contrastRatio(rgb, { r: 255, g: 255, b: 255 }).toFixed(2) : null;
  const contrastBlack = rgb ? contrastRatio(rgb, { r: 0, g: 0, b: 0 }).toFixed(2) : null;

  const shades = useMemo(() => hexClean ? generateShades(hexClean, 9) : [], [hexClean]);
  const tints = useMemo(() => hexClean ? generateTints(hexClean, 9) : [], [hexClean]);

  const handlePickerChange = (e) => {
    const val = e.target.value;
    setPickerColor(val);
    setHexInput(val.replace("#", ""));
  };

  const handleHexInput = (val) => {
    val = val.replace("#", "").replace(/[^0-9a-fA-F]/g, "").slice(0, 6);
    setHexInput(val);
    if (val.length === 6 && hexToRgb(val)) setPickerColor("#" + val);
  };

  const navItems = ["Text", "Writing", "Image", "Business", "Social", "Dev"];
  const valid = rgb !== null;

  return (
    <div style={{
      minHeight: "100vh", background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <header style={{
        background: theme.surface, borderBottom: `1px solid ${theme.border}`,
        padding: "0 20px", height: 54, display: "flex", alignItems: "center",
        justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: theme.shadow,
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
                color: item === "Image" ? theme.primary : theme.textMuted,
                background: item === "Image" ? (dark ? "rgba(45,212,191,0.1)" : "rgba(13,148,136,0.06)") : "transparent",
                cursor: "pointer",
              }}>{item}</span>
            ))}
          </div>
          <button onClick={() => setDark(!dark)} style={{
            width: 34, height: 34, borderRadius: 8, border: `1px solid ${theme.border}`,
            background: theme.surfaceAlt, cursor: "pointer", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 8, color: theme.textMuted,
          }}>{dark ? "☀" : "☾"}</button>
        </nav>
      </header>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "24px 16px 60px" }}>

        <div style={{ fontSize: 12, color: theme.textLight, marginBottom: 14, display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ cursor: "pointer", color: theme.textMuted }}>Home</span><span>›</span>
          <span style={{ cursor: "pointer", color: theme.textMuted }}>Image Tools</span><span>›</span>
          <span style={{ color: theme.primary, fontWeight: 500 }}>Hex to RGB Converter</span>
        </div>

        <AdSlot position="header" theme={theme} />

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.03em" }}>Hex to RGB Converter</h1>
          <p style={{ fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5 }}>
            Convert colors between HEX, RGB, HSL, and CMYK. Pick a color or type a hex code. Copy any format instantly.
          </p>
        </div>

        {/* INPUT */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: "20px",
          border: `1px solid ${theme.border}`, marginBottom: 16, boxShadow: theme.shadow,
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
            {/* Color picker */}
            <div style={{ position: "relative", width: 56, height: 56 }}>
              <input type="color" value={pickerColor} onChange={handlePickerChange}
                style={{
                  width: 56, height: 56, border: "none", borderRadius: 10, cursor: "pointer",
                  padding: 0, background: "none",
                }} />
            </div>

            {/* Hex input */}
            <div style={{ flex: "1 1 200px" }}>
              <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, display: "block", marginBottom: 6 }}>HEX Code</label>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 18, color: theme.textLight, fontWeight: 500 }}>#</span>
                <input
                  type="text" value={hexInput}
                  onChange={(e) => handleHexInput(e.target.value)}
                  placeholder="0D9488" maxLength={6}
                  style={{
                    width: "100%", padding: "10px 12px", fontSize: 18, borderRadius: 8,
                    border: `1.5px solid ${valid ? theme.border : theme.danger}`,
                    background: theme.inputBg, color: theme.text, outline: "none",
                    fontWeight: 700, fontFamily: "'Consolas', 'Monaco', monospace",
                    letterSpacing: "0.1em", boxSizing: "border-box",
                  }}
                  onFocus={(e) => e.target.style.borderColor = theme.primary}
                  onBlur={(e) => e.target.style.borderColor = valid ? theme.border : theme.danger}
                />
              </div>
            </div>

            {/* Color preview */}
            <div style={{
              width: 140, height: 80, borderRadius: 10,
              background: valid ? `#${hexInput}` : theme.surfaceAlt,
              border: `1px solid ${theme.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {valid && (
                <span style={{
                  fontSize: 13, fontWeight: 600,
                  color: luminance(rgb.r, rgb.g, rgb.b) > 0.5 ? "#000" : "#fff",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}>#{hexInput.toUpperCase()}</span>
              )}
            </div>
          </div>
        </div>

        {/* FORMAT OUTPUTS */}
        {valid && (
          <div style={{
            background: theme.surface, borderRadius: 12, overflow: "hidden",
            border: `1px solid ${theme.border}`, marginBottom: 16, boxShadow: theme.shadow,
          }}>
            <FormatRow label="HEX" value={hexClean} theme={theme} />
            <FormatRow label="RGB" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} theme={theme} />
            <FormatRow label="HSL" value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} theme={theme} />
            <FormatRow label="CMYK" value={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`} theme={theme} />
            <FormatRow label="CSS" value={`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`} theme={theme} />
            <div style={{ padding: "10px 14px" }}>
              <FormatRow label="Int" value={`${(rgb.r << 16) + (rgb.g << 8) + rgb.b}`} theme={theme} />
            </div>
          </div>
        )}

        {/* CONTRAST */}
        {valid && (
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16,
          }}>
            <div style={{
              flex: "1 1 200px", background: `#${hexInput}`, borderRadius: 10, padding: "16px 20px",
              border: `1px solid ${theme.border}`,
            }}>
              <span style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 600 }}>White Text</span>
              <span style={{ color: "#FFFFFF", fontSize: 12, float: "right", opacity: 0.8 }}>
                {contrastWhite}:1 {parseFloat(contrastWhite) >= 4.5 ? "✓ AA" : parseFloat(contrastWhite) >= 3 ? "~ AA Large" : "✗ Fail"}
              </span>
            </div>
            <div style={{
              flex: "1 1 200px", background: `#${hexInput}`, borderRadius: 10, padding: "16px 20px",
              border: `1px solid ${theme.border}`,
            }}>
              <span style={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Black Text</span>
              <span style={{ color: "#000000", fontSize: 12, float: "right", opacity: 0.6 }}>
                {contrastBlack}:1 {parseFloat(contrastBlack) >= 4.5 ? "✓ AA" : parseFloat(contrastBlack) >= 3 ? "~ AA Large" : "✗ Fail"}
              </span>
            </div>
          </div>
        )}

        {/* SHADES & TINTS */}
        {valid && (
          <div style={{
            background: theme.surface, borderRadius: 12, padding: "18px",
            border: `1px solid ${theme.border}`, marginBottom: 16, boxShadow: theme.shadow,
          }}>
            <div style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, marginBottom: 10 }}>Shades (darker)</div>
            <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", marginBottom: 16, height: 44 }}>
              {shades.map((s, i) => (
                <div key={i} onClick={() => { setHexInput(s.hex.replace("#", "")); setPickerColor(s.hex); }}
                  style={{
                    flex: 1, background: s.hex, cursor: "pointer",
                    display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4,
                  }}
                  title={s.hex}>
                  <span style={{ fontSize: 8, color: i < 5 ? "#fff" : "#000", opacity: 0.7 }}>{s.hex}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, marginBottom: 10 }}>Tints (lighter)</div>
            <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", height: 44 }}>
              {tints.map((t, i) => (
                <div key={i} onClick={() => { setHexInput(t.hex.replace("#", "")); setPickerColor(t.hex); }}
                  style={{
                    flex: 1, background: t.hex, cursor: "pointer",
                    display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4,
                  }}
                  title={t.hex}>
                  <span style={{ fontSize: 8, color: i > 4 ? "#000" : "#fff", opacity: 0.7 }}>{t.hex}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <AdSlot position="middle" theme={theme} />

        {/* SEO */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em" }}>How to Use This Color Converter</h2>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            Enter a hex color code or use the color picker. The tool instantly converts your color to RGB, HSL, CMYK, and CSS formats. Click Copy on any format to paste it into your code, design tool, or document.
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            The contrast checker shows how white and black text performs against your color for WCAG accessibility compliance. The shades and tints palette lets you explore darker and lighter versions of your color — click any swatch to load it.
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: 0 }}>
            Useful for web developers converting between CSS color formats, designers matching colors across tools, and anyone who needs to translate color values between different systems.
          </p>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme} q="What is a hex color code?" a="A hex color code is a 6-character string that represents a color using hexadecimal values. Each pair of characters represents the red, green, and blue components. For example, #FF0000 is pure red (FF=255 red, 00=0 green, 00=0 blue)." />
          <FAQItem theme={theme} q="What is the difference between HEX and RGB?" a="They represent the same colors in different formats. HEX uses base-16 (0-9, A-F) in a compact string like #0D9488. RGB uses decimal numbers 0-255 for each channel like rgb(13, 148, 136). Both are widely used in web development and design." />
          <FAQItem theme={theme} q="What is HSL?" a="HSL stands for Hue, Saturation, and Lightness. Hue is the color angle (0-360°), Saturation is the color intensity (0-100%), and Lightness is how bright or dark (0-100%). HSL is often more intuitive for adjusting colors than RGB or HEX." />
          <FAQItem theme={theme} q="What is WCAG contrast ratio?" a="WCAG (Web Content Accessibility Guidelines) recommends a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text. This ensures text is readable for people with visual impairments. The contrast checker on this page tests your color against white and black text." />
          <FAQItem theme={theme} q="When should I use CMYK?" a="CMYK (Cyan, Magenta, Yellow, Key/Black) is used for print design. Screens use RGB/HEX, printers use CMYK. If you are designing for print (business cards, flyers, packaging), convert your colors to CMYK to ensure accurate printing." />
          <FAQItem theme={theme} q="Can I convert RGB to HEX?" a="Yes. Enter your RGB values by selecting the color with the picker, and the HEX code appears automatically. You can also enter a hex code and get the RGB values. This tool converts in all directions." />
        </section>

        <AdSlot position="footer" theme={theme} />

        <footer style={{
          marginTop: 32, paddingTop: 20, borderTop: `1px solid ${theme.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8,
        }}>
          <span style={{ fontSize: 12, color: theme.textLight }}>© 2026 ToolCraftKit.com — Free tools for creators and entrepreneurs.</span>
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
