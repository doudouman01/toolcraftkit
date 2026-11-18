"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

const CATEGORIES_MALE = [
  { label: "Essential Fat", min: 2, max: 5, color: "#3B82F6" },
  { label: "Athletes", min: 6, max: 13, color: "#10B981" },
  { label: "Fitness", min: 14, max: 17, color: "#22C55E" },
  { label: "Average", min: 18, max: 24, color: "#F59E0B" },
  { label: "Obese", min: 25, max: 50, color: "#EF4444" },
];

const CATEGORIES_FEMALE = [
  { label: "Essential Fat", min: 10, max: 13, color: "#3B82F6" },
  { label: "Athletes", min: 14, max: 20, color: "#10B981" },
  { label: "Fitness", min: 21, max: 24, color: "#22C55E" },
  { label: "Average", min: 25, max: 31, color: "#F59E0B" },
  { label: "Obese", min: 32, max: 50, color: "#EF4444" },
];

function calcBodyFat(gender: "male" | "female", heightCm: number, neckCm: number, waistCm: number, hipCm: number): number {
  if (gender === "male") {
    const bf = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    return Math.max(0, Math.min(60, bf));
  } else {
    const bf = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
    return Math.max(0, Math.min(60, bf));
  }
}

function inToCm(inches: number) { return inches * 2.54; }

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [gender, setGender] = useState<"male" | "female">("male");
  const [unit, setUnit] = useState<"metric" | "imperial">("imperial");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [weight, setWeight] = useState("");

  const toCm = (v: string) => unit === "metric" ? parseFloat(v) || 0 : inToCm(parseFloat(v) || 0);
  const heightCm = toCm(height);
  const neckCm = toCm(neck);
  const waistCm = toCm(waist);
  const hipCm = toCm(hip);
  const weightKg = unit === "metric" ? (parseFloat(weight) || 0) : (parseFloat(weight) || 0) * 0.453592;

  const valid = heightCm > 0 && neckCm > 0 && waistCm > 0 && (gender === "male" || hipCm > 0) && waistCm > neckCm;
  const bf = valid ? calcBodyFat(gender, heightCm, neckCm, waistCm, hipCm) : null;

  const categories = gender === "male" ? CATEGORIES_MALE : CATEGORIES_FEMALE;
  const category = bf !== null ? categories.find(c => bf >= c.min && bf < c.max) || categories[categories.length - 1] : null;

  const fatMass = bf !== null && weightKg > 0 ? weightKg * (bf / 100) : null;
  const leanMass = fatMass !== null && weightKg > 0 ? weightKg - fatMass : null;

  const unitLabel = unit === "metric" ? "cm" : "in";
  const weightLabel = unit === "metric" ? "kg" : "lbs";

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700 as const, color: "#1C1917", marginBottom: 4 },
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 },
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
    label: { fontSize: 13, fontWeight: 600 as const, color: "#1C1917", marginBottom: 6, display: "block" as const },
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const },
    pill: (active: boolean) => ({ background: active ? "#0D9488" : "#F5F5F4", color: active ? "#fff" : "#1C1917", border: active ? "1px solid #0D9488" : "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" as const, fontWeight: 500 as const }),
    resultCard: { background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 10, padding: 20, marginTop: 16 },
    row: { display: "flex" as const, gap: 8, marginBottom: 14, flexWrap: "wrap" as const },
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Body Fat Calculator" description="Calculate body fat percentage using the US Navy method with visual gauge and lean mass breakdown." slug="body-fat-calculator" category="Health & Fitness Tools" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Body Fat Calculator", url: "https://toolcraftkit.com/tools/body-fat-calculator" }]} />
      <h1 style={s.h1}>{t(`tools./tools/body-fat-calculator.name`) !== `tools./tools/body-fat-calculator.name` ? t(`tools./tools/body-fat-calculator.name`) : "Body Fat Calculator"}</h1>
      <p style={s.sub}>{t(`tools./tools/body-fat-calculator.desc`) !== `tools./tools/body-fat-calculator.desc` ? t(`tools./tools/body-fat-calculator.desc`) : "US Navy method. Enter your measurements and get your body fat percentage."}</p>

      <div style={s.card}>
        <div style={s.row}>
          {(["male", "female"] as const).map(g => (
            <button key={g} onClick={() => { setGender(g); if (g === "female" && !hip) setHip(unit === "metric" ? "95" : "37"); }} style={s.pill(gender === g)}>{g === "male" ? "Male" : "Female"}</button>
          ))}
          <div style={{ flex: 1 }} />
          {(["imperial", "metric"] as const).map(u => (
            <button key={u} onClick={() => setUnit(u)} style={s.pill(unit === u)}>{u === "imperial" ? "Imperial" : "Metric"}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div>
            <label style={s.label}>Height ({unitLabel})</label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder={unit === "metric" ? "170" : "67"} style={s.input} />
          </div>
          <div>
            <label style={s.label}>Neck ({unitLabel})</label>
            <input type="number" value={neck} onChange={e => setNeck(e.target.value)} placeholder={unit === "metric" ? "38" : "15"} style={s.input} />
          </div>
          <div>
            <label style={s.label}>Waist ({unitLabel})</label>
            <input type="number" value={waist} onChange={e => setWaist(e.target.value)} placeholder={unit === "metric" ? "85" : "33"} style={s.input} />
          </div>
          {gender === "female" && (
            <div>
              <label style={s.label}>Hip ({unitLabel})</label>
              <input type="number" value={hip} onChange={e => setHip(e.target.value)} placeholder={unit === "metric" ? "95" : "37"} style={s.input} />
            </div>
          )}
          <div>
            <label style={s.label}>Weight ({weightLabel}) <span style={{ fontWeight: 400, color: "#A8A29E" }}>optional</span></label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder={unit === "metric" ? "75" : "165"} style={s.input} />
          </div>
        </div>

        {bf !== null && (
          <div style={s.resultCard}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: "#57534E" }}>{toolUI.bodyFatPercentage}</div>
              <div style={{ fontSize: 42, fontWeight: 700, color: category?.color || "#0D9488" }}>{bf.toFixed(1)}%</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: category?.color }}>{category?.label}</div>
            </div>

            {/* Gauge bar */}
            <div style={{ position: "relative", marginBottom: 20 }}>
              <div style={{ display: "flex", height: 20, borderRadius: 10, overflow: "hidden" }}>
                {categories.map(c => (
                  <div key={c.label} style={{ flex: c.max - c.min, background: c.color, height: "100%" }} title={c.label} />
                ))}
              </div>
              {/* Marker */}
              <div style={{
                position: "absolute",
                top: -6,
                left: `${Math.min(98, Math.max(2, ((bf - categories[0].min) / (categories[categories.length - 1].max - categories[0].min)) * 100))}%`,
                transform: "translateX(-50%)",
                width: 4,
                height: 32,
                background: "#1C1917",
                borderRadius: 2,
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                {categories.map(c => (
                  <span key={c.label} style={{ fontSize: 10, color: "#78716C", textAlign: "center", flex: c.max - c.min }}>{c.label}</span>
                ))}
              </div>
            </div>

            {/* Lean vs fat mass */}
            {fatMass !== null && leanMass !== null && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ textAlign: "center", padding: 12, background: "#fff", borderRadius: 8, border: "1px solid #E7E5E4" }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#EF4444" }}>{fatMass.toFixed(1)} {weightLabel}</div>
                  <div style={{ fontSize: 12, color: "#78716C" }}>{toolUI.fatMass}</div>
                </div>
                <div style={{ textAlign: "center", padding: 12, background: "#fff", borderRadius: 8, border: "1px solid #E7E5E4" }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#0D9488" }}>{leanMass.toFixed(1)} {weightLabel}</div>
                  <div style={{ fontSize: 12, color: "#78716C" }}>{toolUI.leanMass}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <SeoContent />
    </div>
  );
}
