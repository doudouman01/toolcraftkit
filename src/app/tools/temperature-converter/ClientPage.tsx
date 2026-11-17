"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

export default function ClientPage() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");
  const [kelvin, setKelvin] = useState("");
  const [lastEdited, setLastEdited] = useState<"c" | "f" | "k">("c");

  const fmt = (n: number) => (Number.isFinite(n) ? parseFloat(n.toFixed(4)).toString() : "");

  const fromC = (c: number) => {
    setFahrenheit(fmt(c * 9 / 5 + 32));
    setKelvin(fmt(c + 273.15));
  };
  const fromF = (f: number) => {
    const c = (f - 32) * 5 / 9;
    setCelsius(fmt(c));
    setKelvin(fmt(c + 273.15));
  };
  const fromK = (k: number) => {
    const c = k - 273.15;
    setCelsius(fmt(c));
    setFahrenheit(fmt(c * 9 / 5 + 32));
  };

  const handleC = (v: string) => { setCelsius(v); setLastEdited("c"); const n = parseFloat(v); if (!isNaN(n)) fromC(n); else { setFahrenheit(""); setKelvin(""); } };
  const handleF = (v: string) => { setFahrenheit(v); setLastEdited("f"); const n = parseFloat(v); if (!isNaN(n)) fromF(n); else { setCelsius(""); setKelvin(""); } };
  const handleK = (v: string) => { setKelvin(v); setLastEdited("k"); const n = parseFloat(v); if (!isNaN(n)) fromK(n); else { setCelsius(""); setFahrenheit(""); } };

  const formula = lastEdited === "c"
    ? "F = C × 9/5 + 32  |  K = C + 273.15"
    : lastEdited === "f"
    ? "C = (F − 32) × 5/9  |  K = C + 273.15"
    : "C = K − 273.15  |  F = C × 9/5 + 32";

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px", fontSize: 18, border: "1px solid #E7E5E4",
    borderRadius: 8, outline: "none", background: "#fff", color: "#1C1917", boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: "#57534E", marginBottom: 4, display: "block" };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "32px 20px 60px" }}>
      <ToolSchema name="Temperature Converter" description="Convert between Celsius, Fahrenheit, and Kelvin instantly." slug="temperature-converter" category="ConverterApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Converter Tools", url: "https://toolcraftkit.com/#converter-tools" }, { name: "Temperature Converter", url: "https://toolcraftkit.com/tools/temperature-converter" }]} />

      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1C1917", marginBottom: 6 }}>Temperature Converter</h1>
      <p style={{ fontSize: 15, color: "#78716C", marginBottom: 28 }}>Convert between Celsius, Fahrenheit, and Kelvin in real time.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label style={labelStyle}>Celsius (&deg;C)</label>
          <input type="number" value={celsius} onChange={(e) => handleC(e.target.value)} placeholder="0" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Fahrenheit (&deg;F)</label>
          <input type="number" value={fahrenheit} onChange={(e) => handleF(e.target.value)} placeholder="32" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Kelvin (K)</label>
          <input type="number" value={kelvin} onChange={(e) => handleK(e.target.value)} placeholder="273.15" style={inputStyle} />
        </div>
      </div>

      <div style={{ marginTop: 20, padding: "12px 16px", background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#0D9488", marginBottom: 4 }}>Formula Used</div>
        <code style={{ fontSize: 14, color: "#1C1917" }}>{formula}</code>
      </div>

      {/* Quick reference */}
      <div style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1C1917", marginBottom: 10 }}>Quick Reference</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#F5F5F4" }}>
              <th style={{ padding: "8px 12px", textAlign: "left", borderBottom: "1px solid #E7E5E4" }}>Description</th>
              <th style={{ padding: "8px 12px", textAlign: "right", borderBottom: "1px solid #E7E5E4" }}>&deg;C</th>
              <th style={{ padding: "8px 12px", textAlign: "right", borderBottom: "1px solid #E7E5E4" }}>&deg;F</th>
              <th style={{ padding: "8px 12px", textAlign: "right", borderBottom: "1px solid #E7E5E4" }}>K</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Absolute Zero", -273.15, -459.67, 0],
              ["Freezing Point", 0, 32, 273.15],
              ["Body Temperature", 37, 98.6, 310.15],
              ["Boiling Point", 100, 212, 373.15],
            ].map(([desc, c, f, k]) => (
              <tr key={String(desc)}>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #F5F5F4" }}>{desc}</td>
                <td style={{ padding: "8px 12px", textAlign: "right", borderBottom: "1px solid #F5F5F4" }}>{c}</td>
                <td style={{ padding: "8px 12px", textAlign: "right", borderBottom: "1px solid #F5F5F4" }}>{f}</td>
                <td style={{ padding: "8px 12px", textAlign: "right", borderBottom: "1px solid #F5F5F4" }}>{k}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SeoContent />
    </div>
  );
}
