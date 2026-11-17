"use client";
import { useState, useEffect } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

const TOOL_SLUG = "font-generator";

function mapChars(text: string, upper: string[], lower: string[], digits?: string[]): string {
  return Array.from(text).map((c) => {
    const ui = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c);
    if (ui >= 0) return upper[ui] || c;
    const li = "abcdefghijklmnopqrstuvwxyz".indexOf(c);
    if (li >= 0) return lower[li] || c;
    if (digits) {
      const di = "0123456789".indexOf(c);
      if (di >= 0) return digits[di] || c;
    }
    return c;
  }).join("");
}

// Bold 𝐀-𝐙 𝐚-𝐳 𝟎-𝟗
const boldU = Array.from({length:26},(_,i)=>String.fromCodePoint(0x1D400+i));
const boldL = Array.from({length:26},(_,i)=>String.fromCodePoint(0x1D41A+i));
const boldD = Array.from({length:10},(_,i)=>String.fromCodePoint(0x1D7CE+i));

// Italic 𝐴-𝑍 𝑎-𝑧 (h exception: ℎ)
const italU = Array.from({length:26},(_,i)=>String.fromCodePoint(0x1D434+i));
const italL = Array.from({length:26},(_,i)=>{
  if(i===7) return "ℎ"; // h
  return String.fromCodePoint(0x1D44E+i);
});

// Bold Italic 𝑨-𝒁 𝒂-𝒛
const biU = Array.from({length:26},(_,i)=>String.fromCodePoint(0x1D468+i));
const biL = Array.from({length:26},(_,i)=>String.fromCodePoint(0x1D482+i));

// Script 𝒜-𝒵 𝒶-𝓏 (many exceptions)
const scriptU = Array.from({length:26},(_,i)=>{
  const exc: Record<number,string> = {1:"ℬ",4:"ℰ",5:"ℱ",7:"ℋ",8:"ℐ",11:"ℒ",12:"ℳ",17:"ℛ"};
  return exc[i] || String.fromCodePoint(0x1D49C+i);
});
const scriptL = Array.from({length:26},(_,i)=>{
  const exc: Record<number,string> = {4:"ℯ",6:"ℊ",14:"ℴ"};
  return exc[i] || String.fromCodePoint(0x1D4B6+i);
});

// Bold Script 𝓐-𝓩 𝓪-𝔃
const bsU = Array.from({length:26},(_,i)=>String.fromCodePoint(0x1D4D0+i));
const bsL = Array.from({length:26},(_,i)=>String.fromCodePoint(0x1D4EA+i));

// Fraktur 𝔄-𝔝 (exceptions: C H I R Z)
const frakU = Array.from({length:26},(_,i)=>{
  const exc: Record<number,string> = {2:"ℭ",7:"ℌ",8:"ℑ",17:"ℜ",25:"ℨ"};
  return exc[i] || String.fromCodePoint(0x1D504+i);
});
const frakL = Array.from({length:26},(_,i)=>String.fromCodePoint(0x1D51E+i));

// Double-Struck 𝔸-𝕫 (exceptions: C H N P Q R Z)
const dsU = Array.from({length:26},(_,i)=>{
  const exc: Record<number,string> = {2:"ℂ",7:"ℍ",13:"ℕ",15:"ℙ",16:"ℚ",17:"ℝ",25:"ℤ"};
  return exc[i] || String.fromCodePoint(0x1D538+i);
});
const dsL = Array.from({length:26},(_,i)=>String.fromCodePoint(0x1D552+i));
const dsD = Array.from({length:10},(_,i)=>String.fromCodePoint(0x1D7D8+i));

// Monospace 𝚨-𝚭 𝚊-𝚣 𝟶-𝟿
const monoU = Array.from({length:26},(_,i)=>String.fromCodePoint(0x1D670+i));
const monoL = Array.from({length:26},(_,i)=>String.fromCodePoint(0x1D68A+i));
const monoD = Array.from({length:10},(_,i)=>String.fromCodePoint(0x1D7F6+i));

// Sans-Serif
const sansU = Array.from({length:26},(_,i)=>String.fromCodePoint(0x1D5A0+i));
const sansL = Array.from({length:26},(_,i)=>String.fromCodePoint(0x1D5BA+i));
const sansD = Array.from({length:10},(_,i)=>String.fromCodePoint(0x1D7E2+i));

// Sans Bold
const sbU = Array.from({length:26},(_,i)=>String.fromCodePoint(0x1D5D4+i));
const sbL = Array.from({length:26},(_,i)=>String.fromCodePoint(0x1D5EE+i));
const sbD = Array.from({length:10},(_,i)=>String.fromCodePoint(0x1D7EC+i));

// Circled Ⓐ-Ⓩ ⓐ-ⓩ ⓪-⑨
const circU = Array.from({length:26},(_,i)=>String.fromCodePoint(0x24B6+i));
const circL = Array.from({length:26},(_,i)=>String.fromCodePoint(0x24D0+i));
const circD = ["⓪","①","②","③","④","⑤","⑥","⑦","⑧","⑨"];

// Squared 🄰-🅉
const sqU = Array.from({length:26},(_,i)=>String.fromCodePoint(0x1F170+i));
const sqL = Array.from({length:26},(_,i)=>String.fromCodePoint(0x1F170+i));

// Fullwidth
const fwMap = (text: string) => Array.from(text).map(c => {
  const code = c.charCodeAt(0);
  if (code >= 33 && code <= 126) return String.fromCodePoint(0xFF01 + code - 33);
  if (c === " ") return "　";
  return c;
}).join("");

// Small Caps
const scU = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
const scL = ["ᴀ","ʙ","ᴄ","ᴅ","ᴇ","ғ","ɢ","ʜ","ɪ","ᴊ","ᴋ","ʟ","ᴍ","ɴ","ᴏ","ᴘ","ǫ","ʀ","s","ᴛ","ᴜ","ᴠ","ᴡ","x","ʏ","ᴢ"];

// Upside Down
const udMap: Record<string, string> = {};
const udPairs: [string,string][] = [
  ["a","ɐ"],["b","q"],["c","ɔ"],["d","p"],["e","ǝ"],["f","ɟ"],["g","ƃ"],["h","ɥ"],
  ["i","ᴉ"],["j","ɾ"],["k","ʞ"],["l","ꞁ"],["m","ɯ"],["n","u"],["o","o"],["p","d"],
  ["q","b"],["r","ɹ"],["s","s"],["t","ʇ"],["u","n"],["v","ʌ"],["w","ʍ"],["x","x"],
  ["y","ʎ"],["z","z"],
  ["A","∀"],["B","ꓭ"],["C","Ɔ"],["D","ᗡ"],["E","Ǝ"],["F","Ⅎ"],["G","⅁"],["H","H"],
  ["I","I"],["J","ſ"],["K","ꓘ"],["L","˥"],["M","W"],["N","N"],["O","O"],["P","Ԁ"],
  ["Q","Ꝺ"],["R","ꓤ"],["S","S"],["T","⊥"],["U","∩"],["V","Λ"],["W","M"],["X","X"],
  ["Y","⅄"],["Z","Z"],
  ["1","Ɩ"],["2","ᄅ"],["3","Ɛ"],["4","ㄣ"],["5","ϛ"],["6","9"],["7","ㄥ"],["8","8"],["9","6"],["0","0"],
  [".","˙"],[",","'"],["'",","],["\"",",,"],["!","¡"],["?","¿"],["(",")"],[")","("],
  ["[","]"],["]","["],["<",">"],[">","<"],["{","}"],["}", "{"],["&","⅋"],["_","‾"],
];
for (const [a, b] of udPairs) udMap[a] = b;

function upsideDown(text: string): string {
  return Array.from(text).map(c => udMap[c] || c).reverse().join("");
}

function strikethrough(text: string): string {
  return Array.from(text).map(c => c + "̶").join("");
}

function underline(text: string): string {
  return Array.from(text).map(c => c + "̲").join("");
}

interface FontStyle { name: string; transform: (t: string) => string; }

const STYLES: FontStyle[] = [
  { name: "Bold", transform: t => mapChars(t, boldU, boldL, boldD) },
  { name: "Italic", transform: t => mapChars(t, italU, italL) },
  { name: "Bold Italic", transform: t => mapChars(t, biU, biL) },
  { name: "Script", transform: t => mapChars(t, scriptU, scriptL) },
  { name: "Bold Script", transform: t => mapChars(t, bsU, bsL) },
  { name: "Fraktur", transform: t => mapChars(t, frakU, frakL) },
  { name: "Double-Struck", transform: t => mapChars(t, dsU, dsL, dsD) },
  { name: "Monospace", transform: t => mapChars(t, monoU, monoL, monoD) },
  { name: "Sans-Serif", transform: t => mapChars(t, sansU, sansL, sansD) },
  { name: "Sans Bold", transform: t => mapChars(t, sbU, sbL, sbD) },
  { name: "Circled", transform: t => mapChars(t, circU, circL, circD) },
  { name: "Squared", transform: t => mapChars(t, sqU, sqL) },
  { name: "Fullwidth", transform: fwMap },
  { name: "Small Caps", transform: t => mapChars(t, scU, scL) },
  { name: "Upside Down", transform: upsideDown },
  { name: "Strikethrough", transform: strikethrough },
  { name: "Underline", transform: underline },
];

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const { user, isPro } = useAuth();
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [period, setPeriod] = useState("day");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    fetch("/api/usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool: TOOL_SLUG, action: "check" }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.usage !== undefined) setUsage(d.usage);
        if (d.limit !== undefined) setLimit(d.limit);
        if (d.period) setPeriod(d.period);
      })
      .catch(() => {});
  }, [user]);

  const trackUsage = async () => {
    if (isPro) return true;
    if (!user) return false;
    if (usage >= limit) { window.location.href = "/pricing"; return false; }
    try {
      const res = await fetch("/api/usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: TOOL_SLUG, action: "increment" }),
      });
      const d = await res.json();
      if (d.usage !== undefined) setUsage(d.usage);
      return d.allowed !== false;
    } catch { return false; }
  };

  const copy = async (val: string, idx: number) => {
    if (!user) { setError("Please sign in to copy text."); return; }
    const allowed = await trackUsage();
    if (!allowed) return;
    navigator.clipboard.writeText(val);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const s = {
    wrap: { maxWidth: 800, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    row: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "#FAFAF9", borderRadius: 8, marginBottom: 8, gap: 12 } as const,
    styleName: { fontSize: 12, fontWeight: 600, color: "#78716C", minWidth: 100, flexShrink: 0 } as const,
    styleText: { fontSize: 16, color: "#1C1917", flex: 1, overflowWrap: "break-word" as const, wordBreak: "break-all" as const } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" as const } as const,
  };

  return (
    <div style={s.wrap}>
      <ToolSchema name="Fancy Font Generator" description="Generate fancy text in 17 Unicode styles. Copy and paste anywhere." slug="font-generator" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Text Tools", url: "https://toolcraftkit.com/#text-tools" }, { name: "Font Generator", url: "https://toolcraftkit.com/tools/font-generator" }]} />

      <h1 style={s.h1}>{t(`tools./tools/font-generator.name`) !== `tools./tools/font-generator.name` ? t(`tools./tools/font-generator.name`) : "Fancy Font Generator"}</h1>
      <p style={s.sub}>{t(`tools./tools/font-generator.desc`) !== `tools./tools/font-generator.desc` ? t(`tools./tools/font-generator.desc`) : "Type your text and see it in 17 Unicode font styles. Copy and paste anywhere."}</p>
      <UsageBanner toolSlug={TOOL_SLUG} usage={usage} limit={limit} period={period} />
      {error && <div style={{ color: "#dc2626", fontSize: "14px", marginBottom: "16px", padding: "8px 12px", background: "#FEF2F2", borderRadius: "6px" }}>{error}</div>}

      <div style={s.card}>
        <label style={s.label}>Your Text</label>
        <textarea
          style={{ width: "100%", minHeight: 80, padding: 12, fontSize: 16, border: "1px solid #E7E5E4", borderRadius: 8, resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const, lineHeight: 1.6 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something here..."
        />
      </div>

      {text && (
        <div style={s.card}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Font Styles</div>
          {STYLES.map((style, idx) => {
            const result = style.transform(text);
            return (
              <div key={style.name} style={s.row}>
                <div style={s.styleName}>{style.name}</div>
                <div style={s.styleText}>{result}</div>
                <button
                  style={{ ...s.btnSm, background: copiedIdx === idx ? "#0D9488" : "#F5F5F4", color: copiedIdx === idx ? "#fff" : "#1C1917" }}
                  onClick={() => copy(result, idx)}
                >
                  {copiedIdx === idx ? toolUI.copied : toolUI.copy}
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
