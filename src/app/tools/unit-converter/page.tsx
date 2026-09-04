"use client";
import { useState, useMemo } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

const CATEGORIES: Record<string, { units: string[]; toBase?: Record<string, number>; custom?: boolean }> = {
  Length: { units: ["Meters","Kilometers","Centimeters","Millimeters","Miles","Yards","Feet","Inches"], toBase: { Meters:1,Kilometers:1000,Centimeters:0.01,Millimeters:0.001,Miles:1609.344,Yards:0.9144,Feet:0.3048,Inches:0.0254 } },
  Weight: { units: ["Kilograms","Grams","Milligrams","Pounds","Ounces","Stones","Metric Tons"], toBase: { Kilograms:1,Grams:0.001,Milligrams:0.000001,Pounds:0.453592,Ounces:0.0283495,Stones:6.35029,"Metric Tons":1000 } },
  Temperature: { units: ["Celsius","Fahrenheit","Kelvin"], custom: true },
  Area: { units: ["Square Meters","Square Kilometers","Square Feet","Square Yards","Acres","Hectares","Square Miles"], toBase: { "Square Meters":1,"Square Kilometers":1e6,"Square Feet":0.092903,"Square Yards":0.836127,Acres:4046.86,Hectares:10000,"Square Miles":2.59e6 } },
  Volume: { units: ["Liters","Milliliters","Gallons (US)","Quarts (US)","Pints (US)","Cups (US)","Fluid Ounces (US)","Cubic Meters"], toBase: { Liters:1,Milliliters:0.001,"Gallons (US)":3.78541,"Quarts (US)":0.946353,"Pints (US)":0.473176,"Cups (US)":0.236588,"Fluid Ounces (US)":0.0295735,"Cubic Meters":1000 } },
  Speed: { units: ["m/s","km/h","mph","knots","ft/s"], toBase: { "m/s":1,"km/h":0.277778,mph:0.44704,knots:0.514444,"ft/s":0.3048 } },
  Time: { units: ["Seconds","Minutes","Hours","Days","Weeks","Months (avg)","Years (avg)"], toBase: { Seconds:1,Minutes:60,Hours:3600,Days:86400,Weeks:604800,"Months (avg)":2629746,"Years (avg)":31556952 } },
  Data: { units: ["Bytes","Kilobytes","Megabytes","Gigabytes","Terabytes","Bits","Kilobits","Megabits","Gigabits"], toBase: { Bytes:1,Kilobytes:1024,Megabytes:1048576,Gigabytes:1073741824,Terabytes:1099511627776,Bits:0.125,Kilobits:128,Megabits:131072,Gigabits:134217728 } },
};

function convertTemp(v: number, from: string, to: string) {
  if (from === to) return v;
  let c: number;
  if (from === "Celsius") c = v; else if (from === "Fahrenheit") c = (v - 32) * 5 / 9; else c = v - 273.15;
  if (to === "Celsius") return c; if (to === "Fahrenheit") return c * 9 / 5 + 32; return c + 273.15;
}

function convert(v: number, from: string, to: string, cat: string) {
  const c = CATEGORIES[cat]; if (c.custom) return convertTemp(v, from, to);
  return (v * (c.toBase?.[from] || 1)) / (c.toBase?.[to] || 1);
}

function fmt(n: number) {
  if (Number.isNaN(n)) return "";
  if (Math.abs(n) >= 1e12 || (Math.abs(n) < 0.0001 && n !== 0)) return n.toExponential(6);
  return String(parseFloat(n.toPrecision(10)));
}

export default function Page() {
  const [category, setCategory] = useState("Length");
  const [fromUnit, setFromUnit] = useState("Meters");
  const [toUnit, setToUnit] = useState("Feet");
  const [fromValue, setFromValue] = useState("1");
  const [copied, setCopied] = useState(false);

  const cat = CATEGORIES[category];
  const result = useMemo(() => { const v = parseFloat(fromValue); if (isNaN(v)) return ""; return fmt(convert(v, fromUnit, toUnit, category)); }, [fromValue, fromUnit, toUnit, category]);
  const allResults = useMemo(() => { const v = parseFloat(fromValue); if (isNaN(v)) return []; return cat.units.filter(u => u !== fromUnit).map(u => ({ unit: u, value: fmt(convert(v, fromUnit, u, category)) })); }, [fromValue, fromUnit, category, cat.units]);

  const copy = () => { if (!result) return; navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const swap = () => { setFromUnit(toUnit); setToUnit(fromUnit); setFromValue(result || "1"); };
  const changeCat = (c: string) => { setCategory(c); const u = CATEGORIES[c].units; setFromUnit(u[0]); setToUnit(u[1]); setFromValue("1"); };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    cats: { display: "flex" as const, gap: 6, flexWrap: "wrap" as const, marginBottom: 16 },
    catBtn: (a: boolean) => ({ padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", border: "1px solid", borderColor: a ? "#0D9488" : "#E7E5E4", borderRadius: 20, background: a ? "#0D9488" : "#FAFAF9", color: a ? "#fff" : "#78716C" }) as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    input: { width: "100%", padding: "10px 12px", fontSize: 18, fontWeight: 600, border: "1px solid #E7E5E4", borderRadius: 8, outline: "none", boxSizing: "border-box" as const },
    select: { width: "100%", padding: "10px 12px", fontSize: 14, border: "1px solid #E7E5E4", borderRadius: 8, outline: "none", boxSizing: "border-box" as const, background: "#fff", cursor: "pointer" },
    result: { fontSize: 28, fontWeight: 700, color: "#0D9488", fontFamily: "'Courier New', monospace", wordBreak: "break-all" } as const,
    grid: { display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "end", marginBottom: 16 } as const,
    swapBtn: { background: "#F5F5F4", border: "1px solid #E7E5E4", borderRadius: "50%", width: 40, height: 40, display: "flex" as const, alignItems: "center" as const, justifyContent: "center" as const, cursor: "pointer", fontSize: 18, marginBottom: 4 },
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "8px 14px", fontSize: 13, cursor: "pointer" } as const,
    allRow: { display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #F5F5F4", fontSize: 14 } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema
        name="Unit Converter"
        description="Convert between 60+ units: length, weight, temperature, volume, speed, and more."
        slug="unit-converter"
        category="UtilitiesApplication"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Converter Tools", url: "https://toolcraftkit.com/#converter-tools" },
          { name: "Unit Converter", url: "https://toolcraftkit.com/tools/unit-converter" },
        ]}
      />
      <h1 style={s.h1}>Unit Converter</h1>
      <p style={s.sub}>Convert between units of length, weight, temperature, area, volume, speed, time, and data.</p>
      <div style={s.card}>
        <div style={s.cats}>{Object.keys(CATEGORIES).map(c => <button key={c} style={s.catBtn(category === c)} onClick={() => changeCat(c)}>{c}</button>)}</div>
        <div style={s.grid}>
          <div><label style={s.label}>From</label><select style={s.select} value={fromUnit} onChange={e => setFromUnit(e.target.value)}>{cat.units.map(u => <option key={u} value={u}>{u}</option>)}</select></div>
          <button style={s.swapBtn} onClick={swap} title="Swap">&#8644;</button>
          <div><label style={s.label}>To</label><select style={s.select} value={toUnit} onChange={e => setToUnit(e.target.value)}>{cat.units.map(u => <option key={u} value={u}>{u}</option>)}</select></div>
        </div>
        <div style={{ marginBottom: 16 }}><label style={s.label}>Value</label><input type="number" style={s.input} value={fromValue} onChange={e => setFromValue(e.target.value)} /></div>
        <div style={{ background: "#FAFAF9", borderRadius: 8, padding: 16, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: "#78716C" }}>{fromValue} {fromUnit} =</span>
            <button onClick={copy} style={s.btnSm}>{copied ? "Copied" : "Copy"}</button>
          </div>
          <div style={s.result}>{result} {toUnit}</div>
        </div>
      </div>
      <div style={s.card}>
        <label style={{ ...s.label, marginBottom: 10 }}>All Conversions from {fromValue} {fromUnit}</label>
        {allResults.map(r => <div key={r.unit} style={s.allRow}><span style={{ color: "#78716C" }}>{r.unit}</span><span style={{ fontWeight: 600, fontFamily: "'Courier New', monospace", color: "#1C1917" }}>{r.value}</span></div>)}
      </div>
      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>This unit converter supports 8 categories with over 60 units. All conversions happen instantly in your browser.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Temperature conversions use standard formulas. Data storage units use binary prefixes where 1 Kilobyte equals 1024 Bytes.</p>
      </div>
          <SeoContent />
    </div>
  );
}
