import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free Online Tools for Teachers & Educators in 2026",
  description: "Free digital tools for classroom management, grading, content creation, and student engagement. No school IT required.",
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
        <h1 style={s.h1}>Best Free Online Tools for Teachers & Educators in 2026</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Teachers need practical, free tools that work instantly in a classroom environment. No lengthy setup, no school IT approval process, no student accounts to manage. These browser-based tools handle common teaching tasks from any device with a web browser.</p>

        <h2 style={s.h2}>Classroom Management</h2>
        <p style={s.p}>Random Number Generator picks students fairly for questions, group assignments, or presentation order. No one can claim bias when a computer selects randomly. QR Code Generator creates instant links to resources — put a QR code on worksheets linking to video explanations, or on the board linking to the day's materials.</p>

        <h2 style={s.h2}>Content Creation</h2>
        <p style={s.p}>Word Counter helps students meet assignment requirements and helps you check submissions. Image Compressor reduces file sizes for presentations and learning management systems. PDF Merge combines worksheets, rubrics, and instructions into a single handout document.</p>

        <h2 style={s.h2}>Assessment</h2>
        <p style={s.p}>Percentage Calculator converts raw scores to percentages for grading. Create randomized quiz question orders with the Random Number Generator. Image to PDF converts photographed student work into gradable documents for remote or hybrid classes.</p>

        <h2 style={s.h2}>Communication</h2>
        <p style={s.p}>QR codes on printed materials link to digital resources, videos, and forms. Text to PDF creates quick handouts from notes. Case Converter cleans up formatting for professional communications to parents and administrators.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Random Number Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/random-number" style={s.cta}>Open Random Number Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/qr-code" style={{ color: "#0D9488" }}>QR Code Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
