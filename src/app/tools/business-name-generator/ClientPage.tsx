"use client";
import { useState, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

const PREFIXES: Record<string, string[]> = {
  modern: ["Nova", "Apex", "Prime", "Flux", "Vex", "Lux", "Orb", "Arc", "Zen", "Neo", "Aura", "Halo"],
  creative: ["Dream", "Spark", "Bloom", "Ember", "Wild", "Muse", "Vivid", "Echo", "Luna", "Pixel", "Fable", "Whimsy"],
  professional: ["Elite", "Summit", "Core", "Sterling", "Atlas", "Pinnacle", "Crown", "Vertex", "Forge", "Merit", "Legacy", "Anchor"],
  techy: ["Byte", "Data", "Code", "Algo", "Cyber", "Digi", "Cloud", "Node", "Stack", "Proto", "Sync", "Logic"],
  fun: ["Pop", "Buzz", "Snap", "Fizz", "Jolly", "Happy", "Zippy", "Breezy", "Sunny", "Lucky", "Dandy", "Quirky"],
};

const SUFFIXES: Record<string, string[]> = {
  modern: ["ify", "ly", "io", "hub", "lab", "verse", "scape", "nest", "mint", "wave"],
  creative: ["craft", "works", "house", "studio", "co", "collective", "atelier", "press", "guild", "den"],
  professional: ["group", "partners", "solutions", "advisors", "capital", "global", "associates", "consulting", "dynamics", "enterprises"],
  techy: ["tech", "sys", "bit", "ware", "net", "dev", "ops", "grid", "base", "link"],
  fun: ["box", "spot", "zone", "land", "ville", "club", "crew", "gang", "tribe", "fest"],
};

const CONNECTORS = ["&", "+", "x", ""];

function capitalize(s: string) { return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(); }

function generateNames(keywords: string[], style: string): string[] {
  const prefixes = PREFIXES[style] || PREFIXES.modern;
  const suffixes = SUFFIXES[style] || SUFFIXES.modern;
  const names = new Set<string>();

  for (const kw of keywords) {
    const w = capitalize(kw.trim());
    if (!w) continue;

    // prefix + keyword
    for (let i = 0; i < prefixes.length && names.size < 50; i++) {
      names.add(prefixes[i] + w);
      names.add(prefixes[i] + " " + w);
    }
    // keyword + suffix
    for (let i = 0; i < suffixes.length && names.size < 50; i++) {
      names.add(w + suffixes[i]);
      names.add(w + " " + capitalize(suffixes[i]));
    }
    // prefix + suffix (no keyword)
    for (let i = 0; i < 4 && names.size < 50; i++) {
      const p = prefixes[Math.floor(Math.random() * prefixes.length)];
      const sx = suffixes[Math.floor(Math.random() * suffixes.length)];
      names.add(p + sx);
    }
  }

  // Multi-keyword combos
  if (keywords.length >= 2) {
    const a = capitalize(keywords[0].trim());
    const b = capitalize(keywords[1].trim());
    for (const c of CONNECTORS) {
      names.add(a + (c ? " " + c + " " : "") + b);
    }
  }

  const arr = Array.from(names).filter(n => n.length >= 3);
  // Shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, 24);
}

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [keywords, setKeywords] = useState("");
  const [style, setStyle] = useState("modern");
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = useCallback(() => {
    const kws = keywords.split(/[,\s]+/).filter(Boolean);
    if (kws.length === 0) return;
    setResults(generateNames(kws, style));
  }, [keywords, style]);

  const copyName = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  const styles = ["modern", "creative", "professional", "techy", "fun"];

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700 as const, color: "#1C1917", marginBottom: 4 },
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 },
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
    label: { fontSize: 13, fontWeight: 600 as const, color: "#1C1917", marginBottom: 6, display: "block" as const },
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const },
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer" },
    pill: (active: boolean) => ({ background: active ? "#0D9488" : "#F5F5F4", color: active ? "#fff" : "#1C1917", border: active ? "1px solid #0D9488" : "1px solid #E7E5E4", borderRadius: 20, padding: "6px 16px", fontSize: 13, cursor: "pointer" as const, fontWeight: 500 as const }),
    nameCard: { background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: 8, padding: "12px 14px", cursor: "pointer", display: "flex" as const, justifyContent: "space-between" as const, alignItems: "center" as const },
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Business Name Generator" description="Generate creative business name ideas from keywords and industry." slug="business-name-generator" category="Business Tools" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Business Name Generator", url: "https://toolcraftkit.com/tools/business-name-generator" }]} />
      <h1 style={s.h1}>{t(`tools./tools/business-name-generator.name`) !== `tools./tools/business-name-generator.name` ? t(`tools./tools/business-name-generator.name`) : "Business Name Generator"}</h1>
      <p style={s.sub}>{t(`tools./tools/business-name-generator.desc`) !== `tools./tools/business-name-generator.desc` ? t(`tools./tools/business-name-generator.desc`) : "Enter keywords, choose a style, and get 20+ creative name ideas."}</p>

      <div style={s.card}>
        <div style={{ marginBottom: 14 }}>
          <label style={s.label}>Keywords (comma or space separated)</label>
          <input value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="e.g. tech, cloud, digital" style={s.input} onKeyDown={e => e.key === "Enter" && generate()} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={s.label}>Style</label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {styles.map(st => (
              <button key={st} onClick={() => setStyle(st)} style={s.pill(style === st)}>{capitalize(st)}</button>
            ))}
          </div>
        </div>

        <button onClick={generate} style={s.btn}>Generate Names</button>
      </div>

      {results.length > 0 && (
        <div style={s.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#1C1917" }}>{results.length} Name Ideas</span>
            <button onClick={generate} style={{ ...s.btn, padding: "6px 14px", fontSize: 12 }}>Regenerate</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
            {results.map(name => (
              <div key={name} onClick={() => copyName(name)} style={s.nameCard}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#1C1917" }}>{name}</span>
                <span style={{ fontSize: 11, color: copied === name ? "#0D9488" : "#A8A29E" }}>{copied === name ? toolUI.copied : toolUI.copy}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: "#A8A29E" }}>Click a name to copy it. Check domain availability and trademarks before using.</div>
        </div>
      )}
      <SeoContent />
    </div>
  );
}
