"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";

function buildMap(upperStart: number, lowerStart: number, digitStart?: number): Record<string, string> {
  const m: Record<string, string> = {};
  for (let i = 0; i < 26; i++) {
    m[UPPER[i]] = String.fromCodePoint(upperStart + i);
    m[LOWER[i]] = String.fromCodePoint(lowerStart + i);
  }
  if (digitStart !== undefined) {
    for (let i = 0; i < 10; i++) m[DIGITS[i]] = String.fromCodePoint(digitStart + i);
  }
  return m;
}

function mapText(text: string, charMap: Record<string, string>): string {
  return text.split("").map((c) => charMap[c] || c).join("");
}

const BOLD = buildMap(0x1D400, 0x1D41A, 0x1D7CE);
const ITALIC = buildMap(0x1D434, 0x1D44E);
const BOLD_ITALIC = buildMap(0x1D468, 0x1D482);
const SCRIPT = buildMap(0x1D49C, 0x1D4B6);
const BOLD_SCRIPT = buildMap(0x1D4D0, 0x1D4EA);
const FRAKTUR = buildMap(0x1D504, 0x1D51E);
const DOUBLE_STRUCK = buildMap(0x1D538, 0x1D552, 0x1D7D8);
const MONOSPACE = buildMap(0x1D670, 0x1D68A, 0x1D7F6);
const SANS = buildMap(0x1D5A0, 0x1D5BA, 0x1D7E2);
const SANS_BOLD = buildMap(0x1D5D4, 0x1D5EE, 0x1D7EC);

// Circled letters
const circledMap: Record<string, string> = {};
for (let i = 0; i < 26; i++) {
  circledMap[UPPER[i]] = String.fromCodePoint(0x24B6 + i);
  circledMap[LOWER[i]] = String.fromCodePoint(0x24D0 + i);
}
for (let i = 0; i < 10; i++) circledMap[DIGITS[i]] = i === 0 ? "⓪" : String.fromCodePoint(0x2460 + i - 1);

// Squared letters (negative squared)
const squaredMap: Record<string, string> = {};
for (let i = 0; i < 26; i++) squaredMap[UPPER[i]] = String.fromCodePoint(0x1F130 + i);
for (let i = 0; i < 26; i++) squaredMap[LOWER[i]] = String.fromCodePoint(0x1F130 + i);

// Fullwidth
const fullwidthMap: Record<string, string> = {};
for (let i = 33; i <= 126; i++) fullwidthMap[String.fromCharCode(i)] = String.fromCodePoint(0xFF01 + i - 33);

// Small caps (approximate using Unicode)
const smallCapsMap: Record<string, string> = {};
const scLetters = "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀѕᴛᴜᴠᴡˣʏᴢ";
for (let i = 0; i < 26; i++) {
  smallCapsMap[UPPER[i]] = scLetters[i] || UPPER[i];
  smallCapsMap[LOWER[i]] = scLetters[i] || LOWER[i];
}

// Upside down
const upsideDownMap: Record<string, string> = {};
const udPairs = "aɐbqcɔdpeǝfɟgƃhɥiᴉjɾkʞlꞁmɯnuoopqdɹrsɈtʇunyʎzz";
for (let i = 0; i < udPairs.length; i += 2) upsideDownMap[udPairs[i]] = udPairs[i + 1];
const udUpper = "AɐBqCɔDpEǝFɟGƃHɥIᴉJɾKʞLꞁMɯNuOoPQdRɹSsT⊥UnVΛWMXxYʎZz";
for (let i = 0; i < udUpper.length; i += 2) upsideDownMap[udUpper[i]] = udUpper[i + 1];

function upsideDown(text: string): string {
  return text.split("").map((c) => upsideDownMap[c] || c).reverse().join("");
}

function strikethrough(text: string): string {
  return text.split("").map((c) => c + "̶").join("");
}

function underline(text: string): string {
  return text.split("").map((c) => c + "̲").join("");
}

interface FontStyle {
  name: string;
  transform: (text: string) => string;
}

const STYLES: FontStyle[] = [
  { name: "Bold", transform: (t) => mapText(t, BOLD) },
  { name: "Italic", transform: (t) => mapText(t, ITALIC) },
  { name: "Bold Italic", transform: (t) => mapText(t, BOLD_ITALIC) },
  { name: "Script", transform: (t) => mapText(t, SCRIPT) },
  { name: "Bold Script", transform: (t) => mapText(t, BOLD_SCRIPT) },
  { name: "Fraktur", transform: (t) => mapText(t, FRAKTUR) },
  { name: "Double-Struck", transform: (t) => mapText(t, DOUBLE_STRUCK) },
  { name: "Monospace", transform: (t) => mapText(t, MONOSPACE) },
  { name: "Sans-Serif", transform: (t) => mapText(t, SANS) },
  { name: "Sans Bold", transform: (t) => mapText(t, SANS_BOLD) },
  { name: "Circled", transform: (t) => mapText(t, circledMap) },
  { name: "Squared", transform: (t) => mapText(t, squaredMap) },
  { name: "Fullwidth", transform: (t) => mapText(t, fullwidthMap) },
  { name: "Small Caps", transform: (t) => mapText(t, smallCapsMap) },
  { name: "Upside Down", transform: upsideDown },
  { name: "Strikethrough", transform: strikethrough },
  { name: "Underline", transform: underline },
];

export default function ClientPage() {
  const [text, setText] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copy = (val: string, idx: number) => {
    navigator.clipboard.writeText(val);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const s = {
    wrap: { maxWidth: "800px", margin: "0 auto", padding: "20px" } as React.CSSProperties,
    h1: { fontSize: "28px", fontWeight: 700, color: "#111827", marginBottom: "8px" } as React.CSSProperties,
    sub: { fontSize: "15px", color: "#6b7280", marginBottom: "24px" } as React.CSSProperties,
    card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", marginBottom: "20px" } as React.CSSProperties,
    textarea: { width: "100%", minHeight: 80, padding: 12, fontSize: 16, border: "1px solid #E7E5E4", borderRadius: 8, resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const, lineHeight: 1.6 },
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as React.CSSProperties,
    row: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "#f9fafb", borderRadius: "8px", marginBottom: "8px", gap: "12px" } as React.CSSProperties,
    styleName: { fontSize: "12px", fontWeight: 600, color: "#6b7280", minWidth: "100px", flexShrink: 0 } as React.CSSProperties,
    styleText: { fontSize: "16px", color: "#111827", flex: 1, overflowWrap: "break-word" as const, wordBreak: "break-all" as const } as React.CSSProperties,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" as const } as React.CSSProperties,
  };

  return (
    <div style={s.wrap}>
      <ToolSchema name="Fancy Font Generator" description="Generate fancy text in 15+ Unicode styles. Copy and paste anywhere." slug="font-generator" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Text Tools", url: "https://toolcraftkit.com/#text-tools" }, { name: "Font Generator", url: "https://toolcraftkit.com/tools/font-generator" }]} />

      <h1 style={s.h1}>Fancy Font Generator</h1>
      <p style={s.sub}>Type your text and see it in 17 Unicode font styles. Copy and paste anywhere.</p>

      <div style={s.card}>
        <label style={s.label}>Your Text</label>
        <textarea style={s.textarea} value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something here..." />
      </div>

      {text && (
        <div style={s.card}>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "12px" }}>Font Styles</div>
          {STYLES.map((style, idx) => {
            const result = style.transform(text);
            return (
              <div key={style.name} style={s.row}>
                <div style={s.styleName}>{style.name}</div>
                <div style={s.styleText}>{result}</div>
                <button style={{ ...s.btnSm, background: copiedIdx === idx ? "#0D9488" : "#F5F5F4", color: copiedIdx === idx ? "#fff" : "#1C1917" }} onClick={() => copy(result, idx)}>
                  {copiedIdx === idx ? "Copied!" : "Copy"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      <SeoContent />
    </div>
  );
}
