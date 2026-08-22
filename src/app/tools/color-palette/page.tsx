"use client";
import { useState, useCallback } from "react";

function hslToHex(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => { const k = (n + h / 30) % 12; const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); return Math.round(255 * color).toString(16).padStart(2, "0"); };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function luminance(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const f = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

type PaletteType = "analogous" | "complementary" | "triadic" | "split" | "monochromatic" | "random";

function generatePalette(baseHex: string, type: PaletteType): string[] {
  const [h, s, l] = hexToHsl(baseHex);
  switch (type) {
    case "analogous": return [baseHex, hslToHex((h + 30) % 360, s, l), hslToHex((h + 60) % 360, s, l), hslToHex((h - 30 + 360) % 360, s, l), hslToHex((h - 60 + 360) % 360, s, l)];
    case "complementary": return [baseHex, hslToHex((h + 180) % 360, s, l), hslToHex(h, Math.max(s - 20, 0), Math.min(l + 15, 95)), hslToHex((h + 180) % 360, Math.max(s - 20, 0), Math.min(l + 15, 95)), hslToHex(h, s, Math.max(l - 20, 5))];
    case "triadic": return [baseHex, hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l), hslToHex(h, Math.max(s - 15, 0), Math.min(l + 20, 95)), hslToHex((h + 120) % 360, Math.max(s - 15, 0), Math.min(l + 20, 95))];
    case "split": return [baseHex, hslToHex((h + 150) % 360, s, l), hslToHex((h + 210) % 360, s, l), hslToHex(h, s, Math.min(l + 25, 95)), hslToHex(h, s, Math.max(l - 25, 5))];
    case "monochromatic": return [hslToHex(h, s, 90), hslToHex(h, s, 70), baseHex, hslToHex(h, s, 30), hslToHex(h, s, 15)];
    case "random": return Array.from({ length: 5 }, () => hslToHex(Math.floor(Math.random() * 360), 50 + Math.floor(Math.random() * 40), 40 + Math.floor(Math.random() * 30)));
    default: return [baseHex];
  }
}

export default function Page() {
  const [baseColor, setBaseColor] = useState("#0D9488");
  const [paletteType, setPaletteType] = useState<PaletteType>("analogous");
  const [copied, setCopied] = useState("");
  const [locked, setLocked] = useState<Set<number>>(new Set());

  const palette = generatePalette(baseColor, paletteType);

  const copy = (val: string, key: string) => { navigator.clipboard.writeText(val); setCopied(key); setTimeout(() => setCopied(""), 1500); };
  const copyAll = () => { copy(palette.join(", "), "all"); };
  const copyCss = () => { const vars = palette.map((c, i) => `  --color-${i + 1}: ${c};`).join("\n"); copy(`:root {\n${vars}\n}`, "css"); };

  const randomize = useCallback(() => {
    setBaseColor(hslToHex(Math.floor(Math.random() * 360), 50 + Math.floor(Math.random() * 40), 40 + Math.floor(Math.random() * 30)));
  }, []);

  const types: { key: PaletteType; label: string }[] = [
    { key: "analogous", label: "Analogous" },
    { key: "complementary", label: "Complementary" },
    { key: "triadic", label: "Triadic" },
    { key: "split", label: "Split" },
    { key: "monochromatic", label: "Monochromatic" },
    { key: "random", label: "Random" },
  ];

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    row: { display: "flex" as const, alignItems: "center" as const, gap: 8, marginBottom: 14, flexWrap: "wrap" as const },
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
  };

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Color Palette Generator</h1>
      <p style={s.sub}>Generate beautiful color palettes from a base color using color theory.</p>

      <div style={s.card}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
          <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} style={{ width: 48, height: 48, border: "none", borderRadius: 8, cursor: "pointer", padding: 0 }} />
          <div style={{ flex: 1 }}>
            <label style={s.label}>Base Color</label>
            <input type="text" value={baseColor} onChange={(e) => { if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) setBaseColor(e.target.value); }} style={{ width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "8px 12px", fontSize: 14, fontFamily: "'Courier New', monospace", outline: "none" }} />
          </div>
          <button onClick={randomize} style={{ ...s.btnSm, fontSize: 18, padding: "8px 14px" }} title="Random color">🎲</button>
        </div>

        <div style={s.row}>
          {types.map((t) => (
            <button key={t.key} onClick={() => setPaletteType(t.key)} style={{ ...s.btnSm, background: paletteType === t.key ? "#0D9488" : "#F5F5F4", color: paletteType === t.key ? "#fff" : "#1C1917", border: paletteType === t.key ? "1px solid #0D9488" : "1px solid #E7E5E4" }}>{t.label}</button>
          ))}
        </div>

        <div style={{ display: "flex", borderRadius: 12, overflow: "hidden", marginBottom: 16, height: 120 }}>
          {palette.map((color, i) => (
            <div key={i} onClick={() => copy(color, "swatch" + i)} style={{ flex: 1, background: color, cursor: "pointer", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 8, transition: "flex 0.2s" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: luminance(color) > 0.4 ? "#1C1917" : "#fff", background: "rgba(0,0,0,0.15)", borderRadius: 4, padding: "2px 6px" }}>
                {copied === "swatch" + i ? "Copied!" : color.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {palette.map((color, i) => (
            <div key={i} style={{ flex: 1, minWidth: 100, background: "#FAFAF9", borderRadius: 8, padding: 10, textAlign: "center" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: color, margin: "0 auto 6px", border: "1px solid #E7E5E4" }} />
              <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "'Courier New', monospace", color: "#1C1917" }}>{color.toUpperCase()}</div>
              <div style={{ fontSize: 10, color: "#78716C" }}>HSL {hexToHsl(color).join(", ")}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button onClick={copyAll} style={s.btn}>{copied === "all" ? "Copied!" : "Copy All HEX"}</button>
          <button onClick={copyCss} style={s.btnSm}>{copied === "css" ? "Copied!" : "Copy as CSS"}</button>
          <button onClick={randomize} style={s.btnSm}>Randomize</button>
        </div>
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>Generate harmonious color palettes based on color theory. Pick a base color and choose from six palette types: analogous (neighboring hues), complementary (opposite hues), triadic (three evenly spaced hues), split-complementary, monochromatic (shades of one hue), or random.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Click any swatch to copy its hex code. Export the full palette as hex values or CSS custom properties. Everything runs in your browser.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "What is an analogous color palette?", a: "Analogous colors sit next to each other on the color wheel. They create harmonious, low-contrast palettes that feel natural and cohesive — great for backgrounds and branding." },
          { q: "What is a complementary color palette?", a: "Complementary colors are opposite each other on the color wheel (e.g. blue and orange). They create high contrast and visual energy — ideal for call-to-action elements and accents." },
          { q: "How do I use the CSS export?", a: "Click 'Copy as CSS' to get the palette as CSS custom properties (variables). Paste them into your stylesheet's :root block and reference them as var(--color-1), var(--color-2), etc." },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: i < 2 ? 14 : 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 4 }}>{faq.q}</h3>
            <p style={{ fontSize: 13, color: "#57534E", lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
