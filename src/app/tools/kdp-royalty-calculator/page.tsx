"use client";

import React, { useState } from "react";

// ============================================================
// KDP ROYALTY CALCULATOR
// Calculates Amazon KDP royalties at 35% and 70% for all marketplaces
// ============================================================

const MARKETPLACES = [
  { code: "com", name: "Amazon.com (US)", currency: "$", symbol: "USD", deliveryCost70: 0.06, minPrice70: 2.99, maxPrice70: 9.99, minPrice35: 0.99 },
  { code: "co.uk", name: "Amazon.co.uk (UK)", currency: "£", symbol: "GBP", deliveryCost70: 0.03, minPrice70: 1.99, maxPrice70: 6.99, minPrice35: 0.99 },
  { code: "de", name: "Amazon.de (Germany)", currency: "€", symbol: "EUR", deliveryCost70: 0.06, minPrice70: 2.99, maxPrice70: 9.99, minPrice35: 0.99 },
  { code: "fr", name: "Amazon.fr (France)", currency: "€", symbol: "EUR", deliveryCost70: 0.06, minPrice70: 2.99, maxPrice70: 9.99, minPrice35: 0.99 },
  { code: "es", name: "Amazon.es (Spain)", currency: "€", symbol: "EUR", deliveryCost70: 0.06, minPrice70: 2.99, maxPrice70: 9.99, minPrice35: 0.99 },
  { code: "it", name: "Amazon.it (Italy)", currency: "€", symbol: "EUR", deliveryCost70: 0.06, minPrice70: 2.99, maxPrice70: 9.99, minPrice35: 0.99 },
  { code: "nl", name: "Amazon.nl (Netherlands)", currency: "€", symbol: "EUR", deliveryCost70: 0.06, minPrice70: 2.99, maxPrice70: 9.99, minPrice35: 0.99 },
  { code: "co.jp", name: "Amazon.co.jp (Japan)", currency: "¥", symbol: "JPY", deliveryCost70: 1, minPrice70: 250, maxPrice70: 1250, minPrice35: 99 },
  { code: "com.br", name: "Amazon.com.br (Brazil)", currency: "R$", symbol: "BRL", deliveryCost70: 0.15, minPrice70: 5.99, maxPrice70: 24.99, minPrice35: 2.99 },
  { code: "ca", name: "Amazon.ca (Canada)", currency: "C$", symbol: "CAD", deliveryCost70: 0.06, minPrice70: 3.99, maxPrice70: 12.99, minPrice35: 1.29 },
  { code: "com.mx", name: "Amazon.com.mx (Mexico)", currency: "MX$", symbol: "MXN", deliveryCost70: 1, minPrice70: 49.00, maxPrice70: 199.00, minPrice35: 19.00 },
  { code: "com.au", name: "Amazon.com.au (Australia)", currency: "A$", symbol: "AUD", deliveryCost70: 0.06, minPrice70: 3.99, maxPrice70: 13.99, minPrice35: 1.49 },
  { code: "in", name: "Amazon.in (India)", currency: "₹", symbol: "INR", deliveryCost70: 1, minPrice70: 99, maxPrice70: 449, minPrice35: 49 },
];

export default function KdpRoyaltyCalculator() {
  const [marketplace, setMarketplace] = useState(MARKETPLACES[0]);
  const [price, setPrice] = useState("");
  const [fileSize, setFileSize] = useState("1");
  const [isKdpSelect, setIsKdpSelect] = useState(true);

  const priceNum = parseFloat(price) || 0;
  const fileSizeMb = parseFloat(fileSize) || 1;

  // 35% royalty calculation
  const royalty35 = priceNum * 0.35;

  // 70% royalty calculation
  const deliveryCost = fileSizeMb * marketplace.deliveryCost70;
  const royalty70Gross = priceNum * 0.70;
  const royalty70Net = royalty70Gross - deliveryCost;
  const eligible70 = priceNum >= marketplace.minPrice70 && priceNum <= marketplace.maxPrice70 && isKdpSelect;

  // Best option
  const best35 = royalty35;
  const best70 = eligible70 ? royalty70Net : -1;
  const bestOption = best70 > best35 ? "70%" : "35%";
  const bestRoyalty = best70 > best35 ? best70 : best35;

  // Monthly/yearly projections
  const [salesPerDay, setSalesPerDay] = useState("3");
  const dailySales = parseInt(salesPerDay) || 0;
  const monthlyRevenue = bestRoyalty * dailySales * 30;
  const yearlyRevenue = bestRoyalty * dailySales * 365;

  const fmt = (n: number) => n.toFixed(2);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem", fontFamily: "'Inter', -apple-system, sans-serif" }}>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "0.5rem" }}>
          KDP Royalty Calculator
        </h1>
        <p style={{ fontSize: "1.05rem", color: "#555", maxWidth: 600, margin: "0 auto" }}>
          Calculate your Amazon KDP ebook royalties instantly. Compare 35% vs 70% options across all marketplaces.
        </p>
      </div>

      {/* Input Card */}
      <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "1.5rem", border: "1px solid #e8e8e8" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginBottom: "1.5rem" }}>Book Details</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
          {/* Marketplace */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Amazon Marketplace</label>
            <select
              value={marketplace.code}
              onChange={(e) => setMarketplace(MARKETPLACES.find(m => m.code === e.target.value) || MARKETPLACES[0])}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              {MARKETPLACES.map(m => (
                <option key={m.code} value={m.code}>{m.name} ({m.currency})</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label style={labelStyle}>List Price ({marketplace.currency})</label>
            <input
              type="number"
              placeholder={`e.g. ${marketplace.minPrice70}`}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={inputStyle}
              min="0"
              step="0.01"
            />
          </div>

          {/* File Size */}
          <div>
            <label style={labelStyle}>File Size (MB)</label>
            <input
              type="number"
              placeholder="1"
              value={fileSize}
              onChange={(e) => setFileSize(e.target.value)}
              style={inputStyle}
              min="0.1"
              max="650"
              step="0.1"
            />
            <span style={hintStyle}>Affects 70% delivery cost</span>
          </div>

          {/* KDP Select */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.9rem" }}>
              <input
                type="checkbox"
                checked={isKdpSelect}
                onChange={(e) => setIsKdpSelect(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: "#0D9488" }}
              />
              <span style={{ fontWeight: 500, color: "#333" }}>Enrolled in KDP Select</span>
              <span style={{ color: "#888", fontSize: "0.8rem" }}>(required for 70% royalty)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Results */}
      {priceNum > 0 && (
        <>
          {/* Royalty Comparison */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            {/* 35% Card */}
            <div style={{
              background: bestOption === "35%" ? "linear-gradient(135deg, #1a1a2e, #16213e)" : "#fff",
              color: bestOption === "35%" ? "#fff" : "#333",
              borderRadius: 16, padding: "1.5rem",
              border: bestOption === "35%" ? "2px solid #C4A265" : "1px solid #e8e8e8",
              position: "relative",
            }}>
              {bestOption === "35%" && (
                <div style={{ position: "absolute", top: -10, right: 16, background: "#C4A265", color: "#fff", padding: "2px 12px", borderRadius: 12, fontSize: "0.75rem", fontWeight: 600 }}>BEST OPTION</div>
              )}
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem", opacity: 0.8 }}>35% Royalty</h3>
              <div style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem", color: bestOption === "35%" ? "#C4A265" : "#333" }}>
                {marketplace.currency}{fmt(royalty35)}
              </div>
              <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>per sale</div>
              <div style={{ marginTop: "1rem", fontSize: "0.8rem", opacity: 0.7 }}>
                <div>List price: {marketplace.currency}{fmt(priceNum)}</div>
                <div>Delivery cost: None</div>
                <div>Min price: {marketplace.currency}{marketplace.minPrice35}</div>
                <div style={{ marginTop: 4 }}>Available on all marketplaces</div>
              </div>
            </div>

            {/* 70% Card */}
            <div style={{
              background: bestOption === "70%" && eligible70 ? "linear-gradient(135deg, #1a1a2e, #16213e)" : "#fff",
              color: bestOption === "70%" && eligible70 ? "#fff" : "#333",
              borderRadius: 16, padding: "1.5rem",
              border: bestOption === "70%" && eligible70 ? "2px solid #0D9488" : "1px solid #e8e8e8",
              position: "relative",
              opacity: eligible70 ? 1 : 0.5,
            }}>
              {bestOption === "70%" && eligible70 && (
                <div style={{ position: "absolute", top: -10, right: 16, background: "#0D9488", color: "#fff", padding: "2px 12px", borderRadius: 12, fontSize: "0.75rem", fontWeight: 600 }}>BEST OPTION</div>
              )}
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem", opacity: 0.8 }}>70% Royalty</h3>
              <div style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem", color: bestOption === "70%" && eligible70 ? "#0D9488" : "#333" }}>
                {eligible70 ? `${marketplace.currency}${fmt(royalty70Net)}` : "N/A"}
              </div>
              <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>per sale (after delivery)</div>
              <div style={{ marginTop: "1rem", fontSize: "0.8rem", opacity: 0.7 }}>
                <div>Gross: {marketplace.currency}{fmt(royalty70Gross)}</div>
                <div>Delivery: -{marketplace.currency}{fmt(deliveryCost)} ({fileSizeMb}MB × {marketplace.currency}{marketplace.deliveryCost70}/MB)</div>
                <div>Price range: {marketplace.currency}{marketplace.minPrice70} – {marketplace.currency}{marketplace.maxPrice70}</div>
                {!eligible70 && <div style={{ color: "#EF4444", fontWeight: 600, marginTop: 4 }}>
                  {!isKdpSelect ? "Requires KDP Select enrollment" : `Price must be ${marketplace.currency}${marketplace.minPrice70}–${marketplace.currency}${marketplace.maxPrice70}`}
                </div>}
              </div>
            </div>
          </div>

          {/* Revenue Projections */}
          <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "1.5rem", border: "1px solid #e8e8e8" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginBottom: "1rem" }}>Revenue Projections</h2>
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Estimated Sales Per Day</label>
              <input
                type="number"
                value={salesPerDay}
                onChange={(e) => setSalesPerDay(e.target.value)}
                style={{ ...inputStyle, maxWidth: 200 }}
                min="1"
                max="1000"
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.8rem" }}>
              {[
                { label: "Per Sale", value: bestRoyalty },
                { label: "Daily", value: bestRoyalty * dailySales },
                { label: "Monthly", value: monthlyRevenue },
                { label: "Yearly", value: yearlyRevenue },
              ].map(p => (
                <div key={p.label} style={{ textAlign: "center", padding: "1rem", background: "#f8f9fa", borderRadius: 12 }}>
                  <div style={{ fontSize: "0.8rem", color: "#888", marginBottom: "0.3rem" }}>{p.label}</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1a1a2e" }}>{marketplace.currency}{fmt(p.value)}</div>
                  <div style={{ fontSize: "0.7rem", color: "#aaa" }}>at {bestOption}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Strategy Tip */}
          <div style={{ background: "linear-gradient(135deg, #f0f7f7, #e8f5f0)", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #d0e8e0" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#0D9488", marginBottom: "0.5rem" }}>Pricing Insight</h3>
            <p style={{ fontSize: "0.9rem", color: "#444", lineHeight: 1.6, margin: 0 }}>
              {priceNum >= marketplace.minPrice70 && priceNum <= marketplace.maxPrice70
                ? `At ${marketplace.currency}${fmt(priceNum)}, the 70% royalty option earns you ${marketplace.currency}${fmt(royalty70Net - royalty35)} more per sale than 35%. Over ${dailySales} daily sales, that's ${marketplace.currency}${fmt((royalty70Net - royalty35) * dailySales * 30)} more per month.`
                : priceNum < marketplace.minPrice70
                  ? `Your price of ${marketplace.currency}${fmt(priceNum)} is below the 70% royalty threshold (${marketplace.currency}${marketplace.minPrice70}). Consider raising your price to ${marketplace.currency}${marketplace.minPrice70} — you'd earn ${marketplace.currency}${fmt(marketplace.minPrice70 * 0.70 - (fileSizeMb * marketplace.deliveryCost70))} per sale at 70% vs ${marketplace.currency}${fmt(priceNum * 0.35)} at your current price.`
                  : `Your price of ${marketplace.currency}${fmt(priceNum)} exceeds the 70% royalty cap (${marketplace.currency}${marketplace.maxPrice70}). Consider pricing at ${marketplace.currency}${marketplace.maxPrice70} for 70% royalty, or keep your price if the 35% royalty of ${marketplace.currency}${fmt(royalty35)} meets your revenue goals.`
              }
            </p>
          </div>
        </>
      )}

      {/* SEO Content */}
      <div style={{ background: "#f8f9fa", borderRadius: 16, padding: "2rem", marginTop: "2rem", color: "#444", lineHeight: 1.8 }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 600, color: "#1a1a2e", marginBottom: "1rem" }}>How Amazon KDP Royalties Work</h2>
        <p>Amazon KDP offers two royalty options for ebook authors: 35% and 70%. The 35% option is available at any price point with no delivery cost deducted. The 70% option is available for books priced between $2.99 and $9.99 (US), but Amazon deducts a delivery fee based on file size before calculating your royalty. Books must be enrolled in KDP Select to qualify for the 70% rate on most marketplaces.</p>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Which Royalty Rate Should You Choose?</h3>
        <p>For most ebooks priced between $2.99 and $9.99, the 70% royalty option earns significantly more per sale, even after the delivery fee. The 35% option makes more sense for books priced below $2.99 (like short reads or loss leaders) or above $9.99 (premium non-fiction). Use this calculator to compare both options for your specific price point and marketplace.</p>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginTop: "1.5rem", marginBottom: "0.5rem" }}>How to Reduce Delivery Costs</h3>
        <p>The delivery fee for the 70% royalty option is based on your ebook file size. To minimize this cost: compress images before adding them to your manuscript, use JPEG instead of PNG for photographs, avoid embedding fonts unnecessarily, and use Kindle Create or Calibre to optimize your final file. A typical fiction ebook without images is 0.5-2 MB, while a non-fiction book with images might be 3-10 MB.</p>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginTop: "1.5rem", marginBottom: "0.5rem" }}>International Marketplace Differences</h3>
        <p>Royalty rates and price ranges vary by marketplace. Some Amazon stores have different minimum and maximum prices for the 70% royalty option. This calculator includes accurate data for all major Amazon marketplaces worldwide, so you can optimize your pricing for each region independently.</p>

        <p style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "#888" }}>
          More author tools:{" "}
          <a href="/tools/book-description-formatter" style={{ color: "#0D9488" }}>Book Description Formatter</a>{" · "}
          <a href="/tools/series-revenue-calculator" style={{ color: "#0D9488" }}>Series Revenue Calculator</a>{" · "}
          <a href="/tools/author-productivity-planner" style={{ color: "#0D9488" }}>Author Productivity Planner</a>
        </p>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#333", marginBottom: "0.4rem",
};
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.7rem 1rem", fontSize: "1rem", border: "1px solid #ddd", borderRadius: 8, boxSizing: "border-box" as const,
};
const hintStyle: React.CSSProperties = {
  display: "block", fontSize: "0.75rem", color: "#999", marginTop: "0.3rem",
};
