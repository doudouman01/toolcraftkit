import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator for Official Documents, Visas & Insurance",
  description: "Calculate exact age for visa applications, insurance quotes, and legal documents. Understand age requirements and date-of-birth calculations.",
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
        <h1 style={s.h1}>Age Calculator for Official Documents, Visas & Insurance</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Official documents, visa applications, insurance forms, and legal proceedings often require your exact age on a specific date — not your current age, but your age on the date of application, the date of travel, or the date of an event. Getting this wrong can delay applications or void insurance coverage.</p>

        <h2 style={s.h2}>Visa and Passport Applications</h2>
        <p style={s.p}>Many visa categories have age requirements. Working Holiday visas typically require applicants to be under 31 at the time of application. Youth fares and passes may require being under 26 on the first day of travel. Some family reunion visas require dependent children to be under 18 or 21. Calculate your exact age on the relevant date — not today's date.</p>

        <h2 style={s.h2}>Insurance Age Calculations</h2>
        <p style={s.p}>Health insurance premiums change at specific age brackets. Life insurance rates increase dramatically at 40, 50, and 60. Some insurers calculate your age as of your nearest birthday (if you are closer to 35 than 34, they rate you as 35), while others use your actual age on the policy date. Know which method your insurer uses.</p>

        <h2 style={s.h2}>Legal Age Determinations</h2>
        <p style={s.p}>In legal proceedings, exact age on a specific date can be critical. Contracts signed by minors may be voidable. Age-related employment protections kick in at 40. Mandatory retirement ages exist in certain professions. An age calculator eliminates any ambiguity about whether an age threshold was met on a specific date.</p>

        <h2 style={s.h2}>Historical Date Calculations</h2>
        <p style={s.p}>How old was a person when a historical event occurred? How many years between two events? Date calculations across centuries must account for calendar reforms (the switch from Julian to Gregorian calendars in different countries at different times). An online calculator handles these complexities automatically.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Age Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/age-calculator" style={s.cta}>Open Age Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/unit-converter" style={{ color: "#0D9488" }}>Unit Converter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
