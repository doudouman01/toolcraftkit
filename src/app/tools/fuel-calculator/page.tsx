"use client";

import React, { useState, useCallback } from "react";
import type { Metadata } from "next";
// ============================================================
// FUEL COST CALCULATOR — ToolCraftKit.com/fuel-calculator
// Cross-promotion tool for "Drive Smarter, Spend Less" ebook
// ============================================================

export default function FuelCalculatorPage() {
  // Inputs
  const [currentMpg, setCurrentMpg] = useState<string>("");
  const [epaMpg, setEpaMpg] = useState<string>("");
  const [annualMiles, setAnnualMiles] = useState<string>("13500");
  const [gasPrice, setGasPrice] = useState<string>("3.50");

  // Results
  const [results, setResults] = useState<null | {
    annualCost: number;
    efficiencyGap: number;
    gallonsPerYear: number;
    costPerMile: number;
    savings10: number;
    savings15: number;
    savings20: number;
    savings25: number;
    fiveYear20: number;
    tenYear20: number;
    improvedMpg20: number;
    improvedAnnualCost: number;
  }>(null);

  const calculate = useCallback(() => {
    const mpg = parseFloat(currentMpg);
    const epa = parseFloat(epaMpg);
    const miles = parseFloat(annualMiles);
    const price = parseFloat(gasPrice);

    if (!mpg || !miles || !price || mpg <= 0 || miles <= 0 || price <= 0) return;

    const gallonsPerYear = miles / mpg;
    const annualCost = gallonsPerYear * price;
    const costPerMile = price / mpg;
    const efficiencyGap = epa && epa > 0 ? ((epa - mpg) / epa) * 100 : 0;

    const savings10 = annualCost * 0.10;
    const savings15 = annualCost * 0.15;
    const savings20 = annualCost * 0.20;
    const savings25 = annualCost * 0.25;

    const improvedMpg20 = mpg * 1.20;
    const improvedAnnualCost = (miles / improvedMpg20) * price;
    const fiveYear20 = savings20 * 5;
    const tenYear20 = savings20 * 10;

    setResults({
      annualCost,
      efficiencyGap,
      gallonsPerYear,
      costPerMile,
      savings10,
      savings15,
      savings20,
      savings25,
      fiveYear20,
      tenYear20,
      improvedMpg20,
      improvedAnnualCost,
    });
  }, [currentMpg, epaMpg, annualMiles, gasPrice]);

  const reset = () => {
    setCurrentMpg("");
    setEpaMpg("");
    setAnnualMiles("13500");
    setGasPrice("3.50");
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtDec = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtNum = (n: number, d: number = 1) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "0.5rem" }}>
          ⛽ Fuel Cost Calculator
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#555", maxWidth: 600, margin: "0 auto" }}>
          Calculate your annual fuel costs, find your efficiency gap, and discover how much you could save with smarter driving habits.
        </p>
      </div>

      {/* Input Card */}
      <div style={{
        background: "#fff",
        borderRadius: 16,
        padding: "2rem",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        marginBottom: "1.5rem",
        border: "1px solid #e8e8e8",
      }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#1a1a2e", marginBottom: "1.5rem" }}>
          Your Driving Profile
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
          {/* Current MPG */}
          <div>
            <label style={labelStyle}>Your Current MPG *</label>
            <input
              type="number"
              placeholder="e.g. 25"
              value={currentMpg}
              onChange={(e) => setCurrentMpg(e.target.value)}
              style={inputStyle}
              min="1"
              max="150"
              step="0.1"
            />
            <span style={hintStyle}>Check your trip computer or calculate: miles ÷ gallons</span>
          </div>

          {/* EPA MPG */}
          <div>
            <label style={labelStyle}>EPA Combined MPG (optional)</label>
            <input
              type="number"
              placeholder="e.g. 32"
              value={epaMpg}
              onChange={(e) => setEpaMpg(e.target.value)}
              style={inputStyle}
              min="1"
              max="150"
              step="0.1"
            />
            <span style={hintStyle}>Look up at fueleconomy.gov</span>
          </div>

          {/* Annual Miles */}
          <div>
            <label style={labelStyle}>Annual Miles Driven *</label>
            <input
              type="number"
              placeholder="13500"
              value={annualMiles}
              onChange={(e) => setAnnualMiles(e.target.value)}
              style={inputStyle}
              min="1"
              max="200000"
              step="100"
            />
            <span style={hintStyle}>US average: 13,500 miles/year</span>
          </div>

          {/* Gas Price */}
          <div>
            <label style={labelStyle}>Price Per Gallon ($) *</label>
            <input
              type="number"
              placeholder="3.50"
              value={gasPrice}
              onChange={(e) => setGasPrice(e.target.value)}
              style={inputStyle}
              min="0.50"
              max="10"
              step="0.01"
            />
            <span style={hintStyle}>Check GasBuddy for your local price</span>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", justifyContent: "center" }}>
          <button onClick={calculate} style={btnPrimaryStyle}>
            Calculate My Fuel Costs
          </button>
          <button onClick={reset} style={btnSecondaryStyle}>
            Reset
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <>
          {/* Current Costs Card */}
          <div style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
            borderRadius: 16,
            padding: "2rem",
            marginBottom: "1.5rem",
            color: "#fff",
          }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "1.5rem", color: "#C4A265" }}>
              📊 Your Current Fuel Costs
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
              <div style={statCardDark}>
                <div style={statLabel}>Annual Fuel Cost</div>
                <div style={statValueBig}>{fmt(results.annualCost)}</div>
              </div>
              <div style={statCardDark}>
                <div style={statLabel}>Gallons Per Year</div>
                <div style={statValueBig}>{fmtNum(results.gallonsPerYear, 0)}</div>
              </div>
              <div style={statCardDark}>
                <div style={statLabel}>Cost Per Mile</div>
                <div style={statValueBig}>{fmtDec(results.costPerMile)}</div>
              </div>
            </div>

            {results.efficiencyGap > 0 && (
              <div style={{
                marginTop: "1.5rem",
                padding: "1rem",
                background: results.efficiencyGap > 20 ? "rgba(217, 74, 74, 0.15)" : results.efficiencyGap > 10 ? "rgba(196, 162, 101, 0.15)" : "rgba(93, 160, 93, 0.15)",
                borderRadius: 12,
                textAlign: "center",
              }}>
                <div style={{ fontSize: "0.85rem", color: "#aaa", marginBottom: "0.3rem" }}>Efficiency Gap vs EPA Rating</div>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: results.efficiencyGap > 20 ? "#e74c3c" : results.efficiencyGap > 10 ? "#C4A265" : "#5DA05D" }}>
                  {fmtNum(results.efficiencyGap, 1)}%
                </div>
                <div style={{ fontSize: "0.85rem", color: "#bbb" }}>
                  {results.efficiencyGap > 20
                    ? "Significant room for improvement — you could save hundreds per year"
                    : results.efficiencyGap > 10
                    ? "Moderate gap — good savings potential with better habits"
                    : "Your driving is already fairly efficient — fine-tuning can still save"}
                </div>
              </div>
            )}
          </div>

          {/* Savings Potential Card */}
          <div style={{
            background: "#fff",
            borderRadius: 16,
            padding: "2rem",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            marginBottom: "1.5rem",
            border: "1px solid #e8e8e8",
          }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#1a1a2e", marginBottom: "1.5rem" }}>
              💰 Your Savings Potential
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.8rem", marginBottom: "1.5rem" }}>
              {[
                { pct: "10%", val: results.savings10, color: "#3498db" },
                { pct: "15%", val: results.savings15, color: "#2ecc71" },
                { pct: "20%", val: results.savings20, color: "#C4A265" },
                { pct: "25%", val: results.savings25, color: "#e67e22" },
              ].map((s) => (
                <div key={s.pct} style={{
                  textAlign: "center",
                  padding: "1rem 0.5rem",
                  background: "#f8f9fa",
                  borderRadius: 12,
                  borderTop: `3px solid ${s.color}`,
                }}>
                  <div style={{ fontSize: "0.8rem", color: "#888", fontWeight: 600 }}>{s.pct} Improvement</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: s.color }}>{fmt(s.val)}</div>
                  <div style={{ fontSize: "0.75rem", color: "#aaa" }}>per year</div>
                </div>
              ))}
            </div>

            {/* Long-term projections */}
            <div style={{
              background: "linear-gradient(135deg, #f0f7f0 0%, #e8f5e8 100%)",
              borderRadius: 12,
              padding: "1.5rem",
            }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#2d5a2d", marginBottom: "1rem", textAlign: "center" }}>
                With 20% Improvement (conservative estimate)
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1rem", textAlign: "center" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#5a8a5a" }}>New MPG</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2d5a2d" }}>{fmtNum(results.improvedMpg20)}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#5a8a5a" }}>1 Year</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2d5a2d" }}>{fmt(results.savings20)}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#5a8a5a" }}>5 Years</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2d5a2d" }}>{fmt(results.fiveYear20)}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#5a8a5a" }}>10 Years</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2d5a2d" }}>{fmt(results.tenYear20)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Book CTA Card */}
          <div style={{
            background: "linear-gradient(135deg, #C4A265 0%, #a88b4a 100%)",
            borderRadius: 16,
            padding: "2rem",
            marginBottom: "1.5rem",
            textAlign: "center",
            color: "#fff",
          }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📖</div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Want to achieve these savings?
            </h3>
            <p style={{ fontSize: "0.95rem", marginBottom: "1rem", opacity: 0.95, maxWidth: 500, margin: "0 auto 1rem" }}>
              <em>Drive Smarter, Spend Less</em> — the complete fuel saving guide with 21 chapters of proven techniques, a 30-Day Challenge, and real case studies of drivers saving $500-$1,400 per year.
            </p>
            <a
              href="https://www.amazon.com/dp/B0HJ86J1YN"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: "#1a1a2e",
                color: "#FAF0E0",
                padding: "0.8rem 2rem",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Get the Book on Amazon →
            </a>
          </div>
        </>
      )}

      {/* SEO Content */}
      <div style={{
        background: "#f8f9fa",
        borderRadius: 16,
        padding: "2rem",
        marginTop: "2rem",
        color: "#444",
        lineHeight: 1.8,
      }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 600, color: "#1a1a2e", marginBottom: "1rem" }}>
          How to Use the Fuel Cost Calculator
        </h2>
        <p>
          This free fuel cost calculator helps you understand exactly how much you spend on gasoline each year — and how much you could save by improving your driving habits and vehicle maintenance. Simply enter your current miles per gallon (MPG), your annual driving distance, and your local gas price to get instant results.
        </p>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
          Why Your Fuel Economy Matters
        </h3>
        <p>
          The average American driver spends between $2,000 and $4,000 per year on fuel. Studies show that most drivers operate 10-25% below their vehicle's EPA fuel economy rating due to driving habits, deferred maintenance, and route choices. That gap represents hundreds of dollars in wasted fuel every year — money you could keep in your pocket with simple, proven changes.
        </p>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
          How to Find Your Current MPG
        </h3>
        <p>
          Most cars built after 2010 display average fuel economy on the dashboard trip computer. If yours doesn't, fill your tank completely, reset your trip odometer, and at your next fill-up divide the miles driven by the gallons pumped. For accuracy, repeat this over two or three tanks and average the results.
        </p>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
          What the Efficiency Gap Means
        </h3>
        <p>
          Your efficiency gap is the difference between your actual fuel economy and your car's EPA rating. A gap under 10% means you're driving fairly efficiently. A gap of 10-20% indicates moderate room for improvement. A gap over 20% suggests significant savings potential through better driving techniques, vehicle maintenance, and route optimization. You can look up your vehicle's EPA rating at <a href="https://fueleconomy.gov" target="_blank" rel="noopener noreferrer" style={{ color: "#C4A265" }}>fueleconomy.gov</a>.
        </p>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
          Common Use Cases
        </h3>
        <p>
          Use this calculator to compare the fuel cost of different vehicles before purchasing, to estimate road trip fuel expenses, to calculate the payback period of a hybrid or electric vehicle, to track your improvement after implementing fuel-saving techniques, or to understand the real cost difference between driving at different highway speeds.
        </p>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
          Pro Tip
        </h3>
        <p>
          The five fastest ways to improve your fuel economy are: check and correct your tire pressure (saves 1-3%), practice smooth acceleration (saves 10-15% in city driving), use cruise control on the highway (saves 7-14%), remove unnecessary weight from your vehicle (saves 1-2% per 100 lbs), and use a gas price app like GasBuddy to find cheaper fuel on your existing routes (saves $100-$200/year). Learn all 25 proven techniques in <a href="https://www.amazon.com/dp/B0HJ86J1YN" target="_blank" rel="noopener noreferrer" style={{ color: "#C4A265" }}><em>Drive Smarter, Spend Less</em></a>.
        </p>

        {/* Internal linking */}
        <p style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "#888" }}>
          More tools: <a href="/invoice-generator" style={{ color: "#C4A265" }}>Invoice Generator</a> · <a href="/qr-code-generator" style={{ color: "#C4A265" }}>QR Code Generator</a> · <a href="/word-counter" style={{ color: "#C4A265" }}>Word Counter</a> · <a href="/password-generator" style={{ color: "#C4A265" }}>Password Generator</a>
        </p>
      </div>
    </div>
  );
}

// ============================================================
// STYLES
// ============================================================
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "#333",
  marginBottom: "0.4rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.7rem 1rem",
  fontSize: "1rem",
  border: "1px solid #ddd",
  borderRadius: 8,
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const hintStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  color: "#999",
  marginTop: "0.3rem",
};

const btnPrimaryStyle: React.CSSProperties = {
  padding: "0.8rem 2rem",
  fontSize: "1rem",
  fontWeight: 600,
  color: "#fff",
  background: "linear-gradient(135deg, #C4A265, #a88b4a)",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
};

const btnSecondaryStyle: React.CSSProperties = {
  padding: "0.8rem 1.5rem",
  fontSize: "1rem",
  fontWeight: 500,
  color: "#666",
  background: "#f0f0f0",
  border: "1px solid #ddd",
  borderRadius: 8,
  cursor: "pointer",
};

const statCardDark: React.CSSProperties = {
  textAlign: "center",
  padding: "1rem",
  background: "rgba(255,255,255,0.06)",
  borderRadius: 12,
};

const statLabel: React.CSSProperties = {
  fontSize: "0.75rem",
  color: "#aab",
  fontWeight: 500,
  marginBottom: "0.3rem",
};

const statValueBig: React.CSSProperties = {
  fontSize: "1.6rem",
  fontWeight: 700,
  color: "#FAF0E0",
};
