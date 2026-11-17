"use client";
import { useState, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => { const k = (n + h / 30) % 12; return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

function rgbToCmyk(r: number, g: number, b: number): [number, number, number, number] {
  const r1 = r / 255, g1 = g / 255, b1 = b / 255;
  const k = 1 - Math.max(r1, g1, b1);
  if (k === 1) return [0, 0, 0, 100];
  return [
    Math.round(((1 - r1 - k) / (1 - k)) * 100),
    Math.round(((1 - g1 - k) / (1 - k)) * 100),
    Math.round(((1 - b1 - k) / (1 - k)) * 100),
    Math.round(k * 100),
  ];
}

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [h, setH] = useState(180);
  const [s, setS] = useState(70);
  const [l, setL] = useState(50);
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState("");
  const [gradColor2H, setGradColor2H] = useState(30);
  const [gradColor2S, setGradColor2S] = useState(80);
  const [gradColor2L, setGradColor2L] = useState(55);

  const [r, g, b] = hslToRgb(h, s, l);
  const hex = rgbToHex(r, g, b);
  const [c, m, y, k] = rgbToCmyk(r, g, b);
  const hslStr = `hsl(${h}, ${s}%, ${l}%)`;
  const rgbStr = `rgb(${r}, ${g}, ${b})`;
  const cmykStr = `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;

  const [r2, g2, b2] = hslToRgb(gradColor2H, gradColor2S, gradColor2L);
  const hex2 = rgbToHex(r2, g2, b2);

  const addToHistory = useCallback(() => {
    setHistory((prev) => {
      const next = [hex, ...prev.filter((c) => c !== hex)];
      return next.slice(0, 10);
    });
  }, [hex]);

  const copyVal = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  };

  const sliderTrack = (bg: string): React.CSSProperties => ({
    width: "100%", height: 12, borderRadius: 6, appearance: "none" as const,
    background: bg, outline: "none", cursor: "pointer",
  });

  const valBox = (label: string, value: string) => (
    <div
      key={label}
      onClick={() => copyVal(value, label)}
      style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "10px 14px", background: "#F5F5F4", borderRadius: 8, cursor: "pointer",
        border: "1px solid #E7E5E4", fontSize: 14, transition: "background 0.15s",
      }}
    >
      <span style={{ fontWeight: 600, color: "#57534E" }}>{label}</span>
      <span style={{ color: "#1C1917", fontFamily: "monospace" }}>
        {value} {copied === label ? <span style={{ color: "#0D9488", marginLeft: 6 }}>{toolUI.copied}</span> : null}
      </span>
    </div>
  );

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px 60px" }}>
      <ToolSchema name="Color Picker Advanced" description="Advanced color picker with HSL sliders, HEX/RGB/HSL/CMYK values, gradient generator." slug="color-picker-advanced" category="DesignApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Image Tools", url: "https://toolcraftkit.com/#image-tools" }, { name: "Color Picker Advanced", url: "https://toolcraftkit.com/tools/color-picker-advanced" }]} />

      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1C1917", marginBottom: 6 }}>{t(`tools./tools/color-picker-advanced.name`) !== `tools./tools/color-picker-advanced.name` ? t(`tools./tools/color-picker-advanced.name`) : "Color Picker Advanced"}</h1>
      <p style={{ fontSize: 15, color: "#78716C", marginBottom: 28 }}>Pick colors with HSL sliders. Get HEX, RGB, HSL, and CMYK values.</p>

      {/* Color preview */}
      <div style={{ width: "100%", height: 100, borderRadius: 12, background: hex, border: "1px solid #E7E5E4", marginBottom: 24 }} />

      {/* HSL Sliders */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#57534E", marginBottom: 4, display: "block" }}>Hue: {h}&deg;</label>
          <input type="range" min={0} max={360} value={h} onChange={(e) => setH(Number(e.target.value))}
            style={sliderTrack("linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)")} />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#57534E", marginBottom: 4, display: "block" }}>Saturation: {s}%</label>
          <input type="range" min={0} max={100} value={s} onChange={(e) => setS(Number(e.target.value))}
            style={sliderTrack(`linear-gradient(to right, hsl(${h},0%,${l}%), hsl(${h},100%,${l}%))`)} />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#57534E", marginBottom: 4, display: "block" }}>Lightness: {l}%</label>
          <input type="range" min={0} max={100} value={l} onChange={(e) => setL(Number(e.target.value))}
            style={sliderTrack(`linear-gradient(to right, hsl(${h},${s}%,0%), hsl(${h},${s}%,50%), hsl(${h},${s}%,100%))`)} />
        </div>
      </div>

      {/* Add to history */}
      <button onClick={addToHistory} style={{
        padding: "10px 20px", fontSize: 14, fontWeight: 600, background: "#0D9488", color: "#fff",
        border: "none", borderRadius: 8, cursor: "pointer", marginBottom: 20, width: "100%",
      }}>
        Save to History
      </button>

      {/* Values */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        <p style={{ fontSize: 12, color: "#A8A29E", margin: "0 0 4px" }}>Click any value to copy</p>
        {valBox("HEX", hex)}
        {valBox("RGB", rgbStr)}
        {valBox("HSL", hslStr)}
        {valBox("CMYK", cmykStr)}
      </div>

      {/* Color History */}
      {history.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1C1917", marginBottom: 10 }}>Color History</h2>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {history.map((c) => (
              <div
                key={c}
                onClick={() => copyVal(c, c)}
                title={c}
                style={{
                  width: 36, height: 36, borderRadius: 8, background: c,
                  border: "1px solid #E7E5E4", cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Gradient Generator */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1C1917", marginBottom: 10 }}>Gradient Generator</h2>
        <p style={{ fontSize: 13, color: "#78716C", marginBottom: 12 }}>Gradient between current color and a second color.</p>
        <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
          <div>
            <label style={{ fontSize: 12, color: "#57534E", display: "block", marginBottom: 2 }}>Hue 2</label>
            <input type="range" min={0} max={360} value={gradColor2H} onChange={(e) => setGradColor2H(Number(e.target.value))}
              style={{ width: 140 }} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#57534E", display: "block", marginBottom: 2 }}>Sat 2</label>
            <input type="range" min={0} max={100} value={gradColor2S} onChange={(e) => setGradColor2S(Number(e.target.value))}
              style={{ width: 140 }} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#57534E", display: "block", marginBottom: 2 }}>Light 2</label>
            <input type="range" min={0} max={100} value={gradColor2L} onChange={(e) => setGradColor2L(Number(e.target.value))}
              style={{ width: 140 }} />
          </div>
        </div>
        <div style={{ width: "100%", height: 60, borderRadius: 10, background: `linear-gradient(to right, ${hex}, ${hex2})`, border: "1px solid #E7E5E4" }} />
        <div
          onClick={() => copyVal(`linear-gradient(to right, ${hex}, ${hex2})`, "gradient")}
          style={{ marginTop: 8, fontSize: 13, color: "#57534E", cursor: "pointer", fontFamily: "monospace" }}
        >
          linear-gradient(to right, {hex}, {hex2}) {copied === "gradient" && <span style={{ color: "#0D9488" }}>{toolUI.copied}</span>}
        </div>
      </div>

      <SeoContent />
    </div>
  );
}
