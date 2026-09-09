"use client";

import React, { useState } from "react";

// ============================================================
// AUTHOR PRODUCTIVITY PLANNER (PREMIUM)
// Calculates manuscript timeline, books/year, publication calendar
// ============================================================

export default function AuthorProductivityPlanner() {
  const [wordsPerDay, setWordsPerDay] = useState("2000");
  const [daysPerWeek, setDaysPerWeek] = useState("5");
  const [targetWordCount, setTargetWordCount] = useState("60000");
  const [editingWeeks, setEditingWeeks] = useState("4");
  const [publishingWeeks, setPublishingWeeks] = useState("2");
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [currentWords, setCurrentWords] = useState("0");

  const wpd = parseInt(wordsPerDay) || 0;
  const dpw = parseInt(daysPerWeek) || 0;
  const target = parseInt(targetWordCount) || 0;
  const editWks = parseInt(editingWeeks) || 0;
  const pubWks = parseInt(publishingWeeks) || 0;
  const current = parseInt(currentWords) || 0;
  const start = new Date(startDate);

  // Calculations
  const wordsPerWeek = wpd * dpw;
  const remainingWords = Math.max(target - current, 0);
  const writingWeeks = wordsPerWeek > 0 ? Math.ceil(remainingWords / wordsPerWeek) : 0;
  const totalWeeks = writingWeeks + editWks + pubWks;
  const writingDays = wordsPerWeek > 0 ? Math.ceil(remainingWords / wpd) : 0;

  // Dates
  const draftDate = new Date(start);
  draftDate.setDate(draftDate.getDate() + writingWeeks * 7);
  const editDate = new Date(draftDate);
  editDate.setDate(editDate.getDate() + editWks * 7);
  const publishDate = new Date(editDate);
  publishDate.setDate(publishDate.getDate() + pubWks * 7);

  // Books per year
  const weeksPerBook = totalWeeks;
  const booksPerYear = weeksPerBook > 0 ? Math.floor(52 / weeksPerBook) : 0;
  const booksPerYearDecimal = weeksPerBook > 0 ? (52 / weeksPerBook) : 0;

  // Progress
  const progressPct = target > 0 ? Math.min((current / target) * 100, 100) : 0;

  // Milestones
  const milestones = [
    { pct: 25, label: "25% — Act 1 complete", words: Math.round(target * 0.25) },
    { pct: 50, label: "50% — Midpoint", words: Math.round(target * 0.5) },
    { pct: 75, label: "75% — Act 3 begins", words: Math.round(target * 0.75) },
    { pct: 100, label: "100% — Draft complete!", words: target },
  ];

  const formatDate = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

  // Publication calendar for the year
  const pubCalendar = [];
  if (booksPerYear > 0) {
    let nextDate = new Date(publishDate);
    for (let i = 0; i < Math.min(booksPerYear, 12); i++) {
      pubCalendar.push({
        book: i + 1,
        date: new Date(nextDate),
      });
      nextDate.setDate(nextDate.getDate() + weeksPerBook * 7);
    }
  }

  return (
    <div style={{ maxWidth: 850, margin: "0 auto", padding: "2rem 1rem", fontFamily: "'Inter', -apple-system, sans-serif" }}>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ display: "inline-block", background: "#C4A265", color: "#fff", padding: "3px 12px", borderRadius: 12, fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.5rem" }}>PREMIUM TOOL</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "0.5rem" }}>
          Author Productivity Planner
        </h1>
        <p style={{ fontSize: "1.05rem", color: "#555", maxWidth: 600, margin: "0 auto" }}>
          Plan your manuscript timeline, track your progress, and build a realistic publication calendar.
        </p>
      </div>

      {/* Inputs */}
      <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "1.5rem", border: "1px solid #e8e8e8" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginBottom: "1.5rem" }}>Writing Goals</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.2rem" }}>
          <div>
            <label style={labelStyle}>Words Per Day</label>
            <input type="number" value={wordsPerDay} onChange={e => setWordsPerDay(e.target.value)} style={inputStyle} min="100" step="100" />
          </div>
          <div>
            <label style={labelStyle}>Writing Days / Week</label>
            <select value={daysPerWeek} onChange={e => setDaysPerWeek(e.target.value)} style={inputStyle}>
              {[1,2,3,4,5,6,7].map(d => <option key={d} value={d}>{d} day{d>1?"s":""}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Target Word Count</label>
            <input type="number" value={targetWordCount} onChange={e => setTargetWordCount(e.target.value)} style={inputStyle} min="1000" step="1000" />
            <span style={hintStyle}>Novel: 60-90K · Novella: 20-40K · Nonfiction: 25-50K</span>
          </div>
          <div>
            <label style={labelStyle}>Editing Time (weeks)</label>
            <input type="number" value={editingWeeks} onChange={e => setEditingWeeks(e.target.value)} style={inputStyle} min="0" max="52" />
          </div>
          <div>
            <label style={labelStyle}>Publishing Prep (weeks)</label>
            <input type="number" value={publishingWeeks} onChange={e => setPublishingWeeks(e.target.value)} style={inputStyle} min="0" max="52" />
            <span style={hintStyle}>Cover, formatting, upload</span>
          </div>
          <div>
            <label style={labelStyle}>Start Date</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} />
          </div>
        </div>

        {/* Current Progress */}
        <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#f8f9fa", borderRadius: 12 }}>
          <label style={labelStyle}>Current Word Count (if already started)</label>
          <input type="number" value={currentWords} onChange={e => setCurrentWords(e.target.value)} style={{ ...inputStyle, maxWidth: 250 }} min="0" step="100" />
        </div>
      </div>

      {/* Results */}
      {wpd > 0 && target > 0 && (
        <>
          {/* Progress Bar */}
          {current > 0 && (
            <div style={{ background: "#fff", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "1.5rem", border: "1px solid #e8e8e8" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#333" }}>Manuscript Progress</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0D9488" }}>{current.toLocaleString()} / {target.toLocaleString()} words ({progressPct.toFixed(1)}%)</span>
              </div>
              <div style={{ height: 20, background: "#f0f0f0", borderRadius: 10, overflow: "hidden", position: "relative" }}>
                <div style={{ height: "100%", width: `${progressPct}%`, background: "linear-gradient(90deg, #0D9488, #14B8A6)", borderRadius: 10, transition: "width 0.5s" }} />
                {milestones.map(m => (
                  <div key={m.pct} style={{ position: "absolute", left: `${m.pct}%`, top: 0, bottom: 0, width: 2, background: "rgba(0,0,0,0.15)" }} />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                {milestones.map(m => (
                  <span key={m.pct} style={{ fontSize: "0.65rem", color: current >= m.words ? "#0D9488" : "#ccc", fontWeight: current >= m.words ? 600 : 400 }}>
                    {m.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.8rem", marginBottom: "1.5rem" }}>
            {[
              { label: "Words / Week", value: wordsPerWeek.toLocaleString(), sub: `${wpd} × ${dpw} days`, color: "#3B82F6" },
              { label: "Draft Complete", value: formatDate(draftDate).split(",")[0], sub: `${writingWeeks} weeks (${writingDays} writing days)`, color: "#0D9488" },
              { label: "Publication Date", value: formatDate(publishDate).split(",")[0], sub: `${totalWeeks} total weeks`, color: "#C4A265" },
              { label: "Books / Year", value: booksPerYearDecimal.toFixed(1), sub: `Every ${weeksPerBook} weeks`, color: "#8B5CF6" },
            ].map(c => (
              <div key={c.label} style={{ textAlign: "center", padding: "1.2rem 0.5rem", background: "#fff", borderRadius: 12, border: "1px solid #e8e8e8", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: "0.75rem", color: "#888", marginBottom: "0.3rem" }}>{c.label}</div>
                <div style={{ fontSize: "1.3rem", fontWeight: 700, color: c.color }}>{c.value}</div>
                <div style={{ fontSize: "0.7rem", color: "#aaa", marginTop: "0.2rem" }}>{c.sub}</div>
              </div>
            ))}
          </div>

          {/* Timeline Visual */}
          <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "1.5rem", border: "1px solid #e8e8e8" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginBottom: "1.5rem" }}>Project Timeline</h2>
            <div style={{ display: "flex", gap: 0, height: 50, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ flex: writingWeeks, background: "linear-gradient(90deg, #0D9488, #14B8A6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.75rem", fontWeight: 600, minWidth: writingWeeks > 0 ? 60 : 0 }}>
                Writing ({writingWeeks}w)
              </div>
              <div style={{ flex: editWks, background: "linear-gradient(90deg, #F59E0B, #FBBF24)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.75rem", fontWeight: 600, minWidth: editWks > 0 ? 60 : 0 }}>
                Editing ({editWks}w)
              </div>
              <div style={{ flex: pubWks, background: "linear-gradient(90deg, #8B5CF6, #A78BFA)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.75rem", fontWeight: 600, minWidth: pubWks > 0 ? 60 : 0 }}>
                Publish ({pubWks}w)
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem", fontSize: "0.75rem", color: "#888" }}>
              <span>Start: {formatDate(start)}</span>
              <span>Draft: {formatDate(draftDate)}</span>
              <span>Publish: {formatDate(publishDate)}</span>
            </div>
          </div>

          {/* Publication Calendar */}
          {pubCalendar.length > 1 && (
            <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "1.5rem", border: "1px solid #e8e8e8" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginBottom: "1rem" }}>12-Month Publication Calendar</h2>
              <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "1rem" }}>At your current pace, you can publish {booksPerYear} book{booksPerYear > 1 ? "s" : ""} per year:</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.6rem" }}>
                {pubCalendar.map(p => (
                  <div key={p.book} style={{ padding: "0.8rem", background: "#f8f9fa", borderRadius: 10, borderLeft: "3px solid #C4A265", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "#C4A265", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 700, flexShrink: 0 }}>{p.book}</div>
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#333" }}>Book {p.book}</div>
                      <div style={{ fontSize: "0.75rem", color: "#888" }}>{formatDate(p.date)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Productivity Insight */}
          <div style={{ background: "linear-gradient(135deg, #fef9f0, #fdf0e0)", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #f0e0c0" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#B8860B", marginBottom: "0.5rem" }}>Productivity Insight</h3>
            <p style={{ fontSize: "0.9rem", color: "#444", lineHeight: 1.6, margin: 0 }}>
              At {wpd.toLocaleString()} words/day, {dpw} days/week, you produce {wordsPerWeek.toLocaleString()} words per week.
              {wpd < 1000 && ` Increasing to 1,500 words/day would cut your writing time from ${writingWeeks} weeks to ${Math.ceil(remainingWords / (1500 * dpw))} weeks — finishing ${writingWeeks - Math.ceil(remainingWords / (1500 * dpw))} weeks sooner.`}
              {booksPerYear >= 4 && ` At ${booksPerYear} books per year, you're in the rapid-release territory that Amazon's algorithm rewards with increased visibility.`}
              {booksPerYear < 4 && booksPerYear > 0 && ` Publishing ${booksPerYear} book${booksPerYear > 1 ? "s" : ""} per year is solid. To reach the rapid-release sweet spot of 4+ books/year, consider increasing to ${Math.ceil(target / (52/4 - editWks - pubWks) / dpw)} words/day.`}
            </p>
          </div>
        </>
      )}

      {/* SEO Content */}
      <div style={{ background: "#f8f9fa", borderRadius: 16, padding: "2rem", marginTop: "2rem", color: "#444", lineHeight: 1.8 }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 600, color: "#1a1a2e", marginBottom: "1rem" }}>How to Plan Your Writing Schedule</h2>
        <p>Consistent daily word count is the single most reliable predictor of publishing success for indie authors. Whether you write 500 words per day or 5,000, what matters is showing up regularly and tracking your progress. This planner helps you set realistic goals and see exactly when your manuscript will be complete.</p>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Typical Word Counts by Genre</h3>
        <p>Romance novels typically run 50,000-80,000 words. Fantasy and science fiction often reach 80,000-120,000 words. Thrillers and mysteries fall between 60,000-90,000 words. Non-fiction guides range from 25,000-50,000 words. Short reads and novellas are 15,000-40,000 words. Choose your target based on genre expectations and reader preferences in your market.</p>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginTop: "1.5rem", marginBottom: "0.5rem" }}>The Rapid Release Strategy</h3>
        <p>Publishing 4 or more books per year — ideally in a series with 30-60 day gaps between releases — signals to the Amazon algorithm that you are an active, productive author. This can result in increased visibility, better also-bought recommendations, and sustained Kindle Unlimited page reads. The publication calendar above shows whether your current pace supports a rapid release schedule.</p>

        <p style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "#888" }}>
          More author tools:{" "}
          <a href="/tools/kdp-royalty-calculator" style={{ color: "#0D9488" }}>KDP Royalty Calculator</a>{" · "}
          <a href="/tools/book-description-formatter" style={{ color: "#0D9488" }}>Book Description Formatter</a>{" · "}
          <a href="/tools/series-revenue-calculator" style={{ color: "#0D9488" }}>Series Revenue Calculator</a>
        </p>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#333", marginBottom: "0.4rem" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "0.7rem 1rem", fontSize: "1rem", border: "1px solid #ddd", borderRadius: 8, boxSizing: "border-box" as const };
const hintStyle: React.CSSProperties = { display: "block", fontSize: "0.75rem", color: "#999", marginTop: "0.3rem" };
