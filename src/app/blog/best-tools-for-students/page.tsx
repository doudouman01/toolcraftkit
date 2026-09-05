import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free Online Tools for Students in 2026",
  description: "Essential free tools for students: word counters, citation help, calculators, PDF tools, and more. All browser-based, no downloads.",
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
        <h1 style={s.h1}>Best Free Online Tools for Students in 2026</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Students need tools that are free, instant, and work on any device — including shared library computers and Chromebooks. These browser-based tools cover the most common student tasks without requiring downloads, subscriptions, or school IT department approval.</p>

        <h2 style={s.h2}>Writing Tools</h2>
        <p style={s.p}>Word Counter tracks your essay length against word limits. Words to Pages estimates how many printed pages your assignment will be. Case Converter fixes accidental Caps Lock or formats headings correctly. Lorem Ipsum Generator creates placeholder text for design assignments. These small tools save significant time across dozens of assignments each semester.</p>

        <h2 style={s.h2}>Math and Calculation</h2>
        <p style={s.p}>Percentage Calculator handles grade calculations (what score do I need on the final to get an A?). Compound Interest Calculator helps with economics assignments. Unit Converter handles physics and chemistry conversions. Loan Calculator supports personal finance coursework.</p>

        <h2 style={s.h2}>Document Management</h2>
        <p style={s.p}>PDF Merge combines multiple assignment files into one submission document. Image to PDF converts scanned handwritten work into uploadable documents. Text to PDF creates quick documents without opening Word. These solve the number one submission portal frustration — file format and single-file requirements.</p>

        <h2 style={s.h2}>Research and Development</h2>
        <p style={s.p}>QR Code Generator creates scannable links for presentations and posters. Regex Tester supports computer science coursework. Password Generator secures your accounts. Color Palette Generator helps design students with visual projects. All free, all browser-based, all available from any device.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Word Counter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/word-counter" style={s.cta}>Open Word Counter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/words-to-pages" style={{ color: "#0D9488" }}>Words to Pages</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
