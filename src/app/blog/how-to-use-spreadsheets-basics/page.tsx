import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spreadsheet Basics: Essential Formulas Everyone Should Know",
  description: "Master the spreadsheet formulas that handle 90% of everyday calculations: SUM, AVERAGE, IF, VLOOKUP, and basic formatting.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>Spreadsheet Basics: Essential Formulas Everyone Should Know</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>You do not need to be a data analyst to benefit from spreadsheets. Basic spreadsheet skills — a handful of formulas, some formatting, and simple organization — handle personal budgets, project tracking, inventory management, and dozens of other everyday tasks. Five formulas cover 90% of what most people need.</p>

        <h2 style={s.h2}>SUM and AVERAGE</h2>
        <p style={s.p}>=SUM(A1:A10) adds all values in cells A1 through A10. =AVERAGE(A1:A10) calculates the mean. These two formulas handle budgets, expense tracking, grade calculations, and any situation where you need a total or average. You can also sum non-contiguous cells: =SUM(A1,B3,C5).</p>

        <h2 style={s.h2}>IF — Conditional Logic</h2>
        <p style={s.p}>=IF(A1>100, "Over budget", "Within budget") checks a condition and returns different values based on the result. Use IF for grading (=IF(B2>=90,"A",IF(B2>=80,"B","C"))), flagging items, and any decision that depends on a value. Nested IFs handle multiple conditions.</p>

        <h2 style={s.h2}>COUNT and COUNTIF</h2>
        <p style={s.p}>=COUNT(A1:A100) counts how many cells contain numbers. =COUNTIF(A1:A100, ">50") counts cells meeting a condition. =COUNTIF(B1:B100, "Completed") counts how many tasks are marked complete. These formulas turn raw data into simple dashboards.</p>

        <h2 style={s.h2}>Formatting for Clarity</h2>
        <p style={s.p}>Bold headers in the first row. Freeze the top row (View {'>'} Freeze) so headers stay visible while scrolling. Use currency format for money, percentage format for rates, and date format for dates. Alternate row colors for readability in large tables. These formatting basics make any spreadsheet easier to read and less error-prone.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Percentage Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/percentage-calculator" style={s.cta}>Open Percentage Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/unit-converter" style={{ color: "#0D9488" }}>Unit Converter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
