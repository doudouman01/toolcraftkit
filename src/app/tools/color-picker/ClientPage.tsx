"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";

function hexToRgb(hex: string) { const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16); return { r, g, b }; }
function rgbToHsl(r: number, g: number, b: number) { r /= 255; g /= 255; b /= 255; const max = Math.max(r, g, b), min = Math.min(r, g, b); let h = 0, s = 0; const l = (max + min) / 2; if (max !== min) { const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min); switch (max) { case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break; case g: h = ((b - r) / d + 2) / 6; break; case b: h = ((r - g) / d + 4) / 6; break; } } return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }; }

export default function ClientPage() {
  const [color, setColor] = useState("#0D9488");
  const [copied, setCopied] = useState("");

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const formats = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: "CSS Variable", value: `--color: ${color};` },
    { label: "Tailwind", value: `[${color}]` },
  ];

  const copy = (val: string) => { navigator.clipboard.writeText(val); setCopied(val); setTimeout(() => setCopied(""), 1000); };

  const shades = Array.from({ length: 9 }, (_, i) => {
    const factor = (i + 1) / 10;
    const r = Math.round(rgb.r * factor), g = Math.round(rgb.g * factor), b = Math.round(rgb.b * factor);
    return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
  });

  const tints = Array.from({ length: 9 }, (_, i) => {
    const factor = (i + 1) / 10;
    const r = Math.round(rgb.r + (255 - rgb.r) * factor), g = Math.round(rgb.g + (255 - rgb.g) * factor), b = Math.round(rgb.b + (255 - rgb.b) * factor);
    return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
  });

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    preview: { width: "100%", height: 120, borderRadius: 12, marginBottom: 16, border: "1px solid #E7E5E4" } as const,
    row: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#f9fafb", borderRadius: 8, marginBottom: 6, cursor: "pointer" } as const,
    swatchRow: { display: "flex", borderRadius: 8, overflow: "hidden", marginBottom: 8 } as const,
    swatch: { flex: 1, height: 40, cursor: "pointer" } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Color Picker" description="Pick any color, get HEX, RGB, HSL values. Generate shades and tints. Free online color tool." slug="color-picker" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Design Tools", url: "https://toolcraftkit.com/#design-tools" }, { name: "Color Picker", url: "https://toolcraftkit.com/tools/color-picker" }]} />
      <h1 style={s.h1}>Color Picker</h1>
      <p style={s.sub}>Pick a color and get it in every format. Generate shades and tints.</p>

      <div style={{ ...s.preview, background: color }} />

      <div style={s.card}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: 60, height: 48, border: "1px solid #E7E5E4", borderRadius: 8, cursor: "pointer", padding: 2 }} />
          <input type="text" value={color} onChange={(e) => { if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) setColor(e.target.value); }} style={{ flex: 1, border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 16, fontFamily: "monospace" }} />
        </div>

        {formats.map((f) => (
          <div key={f.label} style={s.row} onClick={() => copy(f.value)}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1C1917" }}>{f.label}</span>
            <span style={{ fontSize: 13, fontFamily: "monospace", color: copied === f.value ? "#0D9488" : "#57534E" }}>{copied === f.value ? "Copied!" : f.value}</span>
          </div>
        ))}
      </div>

      <div style={s.card}>
        <label style={s.label}>Shades (darker)</label>
        <div style={s.swatchRow}>
          {shades.map((c, i) => <div key={i} style={{ ...s.swatch, background: c }} title={c} onClick={() => { setColor(c); copy(c); }} />)}
        </div>
        <label style={{ ...s.label, marginTop: 12 }}>Tints (lighter)</label>
        <div style={s.swatchRow}>
          {tints.map((c, i) => <div key={i} style={{ ...s.swatch, background: c }} title={c} onClick={() => { setColor(c); copy(c); }} />)}
        </div>
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Pick any color and instantly get its HEX, RGB, HSL, CSS variable, and Tailwind values. Click any format to copy. Explore shades and tints of your chosen color. Perfect for designers, developers, and anyone working with color.</p>
      </div>
    </div>
  );
}
