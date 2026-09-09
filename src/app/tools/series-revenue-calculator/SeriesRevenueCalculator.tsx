"use client";

import React, { useState } from "react";

// ============================================================
// SERIES REVENUE CALCULATOR (PREMIUM)
// Projects total series revenue based on read-through rates
// ============================================================

export default function SeriesRevenueCalculator() {
  const [books, setBooks] = useState("3");
  const [pricePerBook, setPricePerBook] = useState("4.99");
  const [royaltyRate, setRoyaltyRate] = useState("70");
  const [deliveryCostPerBook, setDeliveryCostPerBook] = useState("0.10");
  const [readThroughPct, setReadThroughPct] = useState("60");
  const [book1Sales, setBook1Sales] = useState("100");
  const [kuPages, setKuPages] = useState("300");
  const [kuRate, setKuRate] = useState("0.0045");
  const [includeKu, setIncludeKu] = useState(true);

  const numBooks = parseInt(books) || 1;
  const price = parseFloat(pricePerBook) || 0;
  const royalty = parseFloat(royaltyRate) / 100 || 0.7;
  const delivery = parseFloat(deliveryCostPerBook) || 0;
  const readThrough = parseFloat(readThroughPct) / 100 || 0.6;
  const monthlyB1 = parseInt(book1Sales) || 0;
  const pages = parseInt(kuPages) || 0;
  const pageRate = parseFloat(kuRate) || 0.0045;

  // Calculate royalty per book sale
  const royaltyPerSale = (price * royalty) - delivery;
  const kuPerRead = pages * pageRate;

  // Calculate series data
  const seriesData = [];
  let totalSales = 0;
  let totalRevenue = 0;
  let totalKuRevenue = 0;
  let currentReaders = monthlyB1;

  for (let i = 1; i <= Math.min(numBooks, 20); i++) {
    const bookSales = i === 1 ? monthlyB1 : Math.round(currentReaders);
    const bookRevenue = bookSales * royaltyPerSale;
    const bookKuRevenue = includeKu ? bookSales * kuPerRead : 0;
    totalSales += bookSales;
    totalRevenue += bookRevenue;
    totalKuRevenue += bookKuRevenue;
    seriesData.push({
      book: i,
      readers: bookSales,
      salesRevenue: bookRevenue,
      kuRevenue: bookKuRevenue,
      totalRevenue: bookRevenue + bookKuRevenue,
      cumulativeRevenue: totalRevenue + totalKuRevenue,
      readThroughFromB1: i === 1 ? 100 : ((bookSales / monthlyB1) * 100),
    });
    currentReaders = bookSales * readThrough;
  }

  const revenuePerReader = monthlyB1 > 0 ? (totalRevenue + totalKuRevenue) / monthlyB1 : 0;
  const annualTotal = (totalRevenue + totalKuRevenue) * 12;

  const fmt = (n: number) => "$" + n.toFixed(2);
  const fmtInt = (n: number) => Math.round(n).toLocaleString();

  // Simple bar chart
  const maxRevenue = Math.max(...seriesData.map(d => d.totalRevenue), 1);

  return (
    <div style={{ maxWidth: 850, margin: "0 auto", padding: "2rem 1rem", fontFamily: "'Inter', -apple-system, sans-serif" }}>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ display: "inline-block", background: "#C4A265", color: "#fff", padding: "3px 12px", borderRadius: 12, fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.5rem" }}>PREMIUM TOOL</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "0.5rem" }}>
          Series Revenue Calculator
        </h1>
        <p style={{ fontSize: "1.05rem", color: "#555", maxWidth: 600, margin: "0 auto" }}>
          Project your total series revenue based on read-through rates, KU page reads, and sales per book.
        </p>
      </div>

      {/* Inputs */}
      <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "1.5rem", border: "1px solid #e8e8e8" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginBottom: "1.5rem" }}>Series Configuration</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.2rem" }}>
          <div>
            <label style={labelStyle}>Number of Books</label>
            <input type="number" value={books} onChange={e => setBooks(e.target.value)} style={inputStyle} min="1" max="20" />
          </div>
          <div>
            <label style={labelStyle}>Price Per Book ($)</label>
            <input type="number" value={pricePerBook} onChange={e => setPricePerBook(e.target.value)} style={inputStyle} min="0.99" step="0.01" />
          </div>
          <div>
            <label style={labelStyle}>Royalty Rate (%)</label>
            <select value={royaltyRate} onChange={e => setRoyaltyRate(e.target.value)} style={inputStyle}>
              <option value="70">70%</option>
              <option value="35">35%</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Delivery Cost/Book ($)</label>
            <input type="number" value={deliveryCostPerBook} onChange={e => setDeliveryCostPerBook(e.target.value)} style={inputStyle} min="0" step="0.01" />
          </div>
          <div>
            <label style={labelStyle}>Read-Through Rate (%)</label>
            <input type="number" value={readThroughPct} onChange={e => setReadThroughPct(e.target.value)} style={inputStyle} min="1" max="100" />
            <span style={hintStyle}>% of readers who buy the next book</span>
          </div>
          <div>
            <label style={labelStyle}>Book 1 Monthly Sales</label>
            <input type="number" value={book1Sales} onChange={e => setBook1Sales(e.target.value)} style={inputStyle} min="1" />
          </div>
        </div>

        {/* KU Section */}
        <div style={{ marginTop: "1.2rem", padding: "1rem", background: "#f8f9fa", borderRadius: 12 }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.9rem", marginBottom: "0.8rem" }}>
            <input type="checkbox" checked={includeKu} onChange={e => setIncludeKu(e.target.checked)} style={{ width: 18, height: 18, accentColor: "#0D9488" }} />
            <span style={{ fontWeight: 500 }}>Include Kindle Unlimited Page Reads</span>
          </label>
          {includeKu && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>KENP Pages Per Book</label>
                <input type="number" value={kuPages} onChange={e => setKuPages(e.target.value)} style={inputStyle} min="1" />
              </div>
              <div>
                <label style={labelStyle}>KU Rate Per Page ($)</label>
                <input type="number" value={kuRate} onChange={e => setKuRate(e.target.value)} style={inputStyle} min="0.001" step="0.0001" />
                <span style={hintStyle}>Average: ~$0.0045/page</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {monthlyB1 > 0 && price > 0 && (
        <>
          {/* Summary Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.8rem", marginBottom: "1.5rem" }}>
            {[
              { label: "Revenue/Reader", value: fmt(revenuePerReader), color: "#0D9488" },
              { label: "Monthly Total", value: fmt(totalRevenue + totalKuRevenue), color: "#C4A265" },
              { label: "Annual Total", value: fmt(annualTotal), color: "#8B5CF6" },
              { label: "Total Readers/Mo", value: fmtInt(totalSales), color: "#3B82F6" },
            ].map(c => (
              <div key={c.label} style={{ textAlign: "center", padding: "1.2rem 0.5rem", background: "#fff", borderRadius: 12, border: "1px solid #e8e8e8", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: "0.75rem", color: "#888", marginBottom: "0.3rem" }}>{c.label}</div>
                <div style={{ fontSize: "1.4rem", fontWeight: 700, color: c.color }}>{c.value}</div>
              </div>
            ))}
          </div>

          {/* Bar Chart */}
          <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "1.5rem", border: "1px solid #e8e8e8" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginBottom: "1rem" }}>Revenue Per Book</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {seriesData.map(d => (
                <div key={d.book} style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <div style={{ width: 60, fontSize: "0.8rem", fontWeight: 600, color: "#555", textAlign: "right" }}>Book {d.book}</div>
                  <div style={{ flex: 1, height: 28, background: "#f0f0f0", borderRadius: 6, overflow: "hidden", position: "relative" }}>
                    <div style={{
                      height: "100%", borderRadius: 6,
                      width: `${(d.totalRevenue / maxRevenue) * 100}%`,
                      background: `linear-gradient(90deg, #0D9488, #14B8A6)`,
                      minWidth: 2,
                    }} />
                  </div>
                  <div style={{ width: 70, fontSize: "0.8rem", fontWeight: 600, color: "#333", textAlign: "right" }}>{fmt(d.totalRevenue)}</div>
                  <div style={{ width: 50, fontSize: "0.7rem", color: "#888", textAlign: "right" }}>{d.readers} sales</div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Table */}
          <div style={{ background: "#fff", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "1.5rem", border: "1px solid #e8e8e8", overflowX: "auto" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginBottom: "1rem" }}>Detailed Breakdown</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e8e8e8" }}>
                  <th style={thStyle}>Book</th>
                  <th style={thStyle}>Readers</th>
                  <th style={thStyle}>Read-Through</th>
                  <th style={thStyle}>Sales Revenue</th>
                  {includeKu && <th style={thStyle}>KU Revenue</th>}
                  <th style={thStyle}>Book Total</th>
                  <th style={thStyle}>Cumulative</th>
                </tr>
              </thead>
              <tbody>
                {seriesData.map(d => (
                  <tr key={d.book} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={tdStyle}>Book {d.book}</td>
                    <td style={tdStyle}>{d.readers}</td>
                    <td style={tdStyle}>{d.readThroughFromB1.toFixed(0)}%</td>
                    <td style={tdStyle}>{fmt(d.salesRevenue)}</td>
                    {includeKu && <td style={tdStyle}>{fmt(d.kuRevenue)}</td>}
                    <td style={{ ...tdStyle, fontWeight: 600 }}>{fmt(d.totalRevenue)}</td>
                    <td style={{ ...tdStyle, fontWeight: 600, color: "#0D9488" }}>{fmt(d.cumulativeRevenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ROI Insight */}
          <div style={{ background: "linear-gradient(135deg, #f5f0ff, #efe8ff)", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #d8d0f0" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#6B4D8A", marginBottom: "0.5rem" }}>Series ROI Insight</h3>
            <p style={{ fontSize: "0.9rem", color: "#444", lineHeight: 1.6, margin: 0 }}>
              Each reader who starts your series generates {fmt(revenuePerReader)} in total revenue across {numBooks} books.
              {numBooks < 5 && ` Adding Book ${numBooks + 1} would capture ${Math.round(seriesData[seriesData.length - 1].readers * readThrough)} additional readers and add approximately ${fmt(seriesData[seriesData.length - 1].readers * readThrough * (royaltyPerSale + (includeKu ? kuPerRead : 0)))} in monthly revenue.`}
              {readThrough < 0.5 && ` Your read-through rate of ${readThroughPct}% is below average. Improving it to 60% by strengthening your book endings and series hooks would increase total series revenue by approximately ${fmt((totalRevenue + totalKuRevenue) * (0.6 / readThrough - 1))}/month.`}
            </p>
          </div>
        </>
      )}

      {/* SEO Content */}
      <div style={{ background: "#f8f9fa", borderRadius: 16, padding: "2rem", marginTop: "2rem", color: "#444", lineHeight: 1.8 }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 600, color: "#1a1a2e", marginBottom: "1rem" }}>How Series Revenue Works</h2>
        <p>For most indie authors, writing a series is the most profitable publishing strategy. Each new book in a series benefits from your existing readership: a percentage of readers who finished the previous book will buy the next one. This percentage is called the read-through rate, and it typically ranges from 40% to 80% depending on genre, book quality, and how well each book hooks readers into the next.</p>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Understanding Read-Through</h3>
        <p>Read-through rate measures the percentage of readers who buy each subsequent book in your series. A 60% read-through means that for every 100 readers who buy Book 1, about 60 buy Book 2, 36 buy Book 3, and 22 buy Book 4. Higher read-through rates compound dramatically across a long series, making each new book progressively more valuable as it captures revenue from the entire existing readership funnel.</p>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Revenue Per Reader</h3>
        <p>Revenue per reader is the total income generated across your entire series from a single reader who starts at Book 1. This metric helps you determine how much you can profitably spend on advertising to acquire a new reader. If your series generates $8.50 per reader and your ad cost per click-through sale is $3.00, you have a positive ROI of $5.50 per reader acquired.</p>

        <p style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "#888" }}>
          More author tools:{" "}
          <a href="/tools/kdp-royalty-calculator" style={{ color: "#0D9488" }}>KDP Royalty Calculator</a>{" · "}
          <a href="/tools/book-description-formatter" style={{ color: "#0D9488" }}>Book Description Formatter</a>{" · "}
          <a href="/tools/author-productivity-planner" style={{ color: "#0D9488" }}>Author Productivity Planner</a>
        </p>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#333", marginBottom: "0.4rem" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "0.7rem 1rem", fontSize: "1rem", border: "1px solid #ddd", borderRadius: 8, boxSizing: "border-box" as const };
const hintStyle: React.CSSProperties = { display: "block", fontSize: "0.75rem", color: "#999", marginTop: "0.3rem" };
const thStyle: React.CSSProperties = { padding: "0.5rem", textAlign: "left", fontWeight: 600, color: "#555" };
const tdStyle: React.CSSProperties = { padding: "0.5rem", color: "#333" };
