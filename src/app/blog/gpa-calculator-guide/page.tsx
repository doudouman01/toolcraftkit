import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate GPA: Complete Guide for College & High School Students",
  description: "Learn how to calculate your GPA on a 4.0 scale. Understand weighted vs unweighted GPA, credit hours, and what GPA you need for scholarships and grad school.",
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
        <h1 style={s.h1}>How to Calculate GPA: Complete Guide for College & High School Students</h1>
        <p style={s.meta}>September 24, 2026 · 5 min read</p>

        <p style={s.p}>Your GPA is a single number that summarizes your academic performance across all your courses. Whether you are applying for scholarships, targeting graduate school, or checking if you meet your major's requirements, knowing how to calculate and track your GPA is essential.</p>

        <h2 style={s.h2}>The GPA Formula</h2>
        <p style={s.p}>GPA = Total Quality Points ÷ Total Credit Hours. Quality points for each course equal the grade point value multiplied by the credit hours. An A (4.0) in a 3-credit course earns 12 quality points. Sum these across all courses, divide by total credits, and you have your GPA.</p>

        <h2 style={s.h2}>Standard Grade Points</h2>
        <p style={s.p}>On the 4.0 scale: A+ and A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, D- = 0.7, F = 0.0. Some schools use variations, but this is the standard most institutions follow.</p>

        <h2 style={s.h2}>Weighted vs Unweighted GPA</h2>
        <p style={s.p}>High schools often use weighted GPAs that go up to 5.0, giving extra points for AP or honors courses. An A in an AP class might count as 5.0 instead of 4.0. Colleges typically recalculate your GPA on their own scale during admissions, but your weighted GPA still matters for class rank and local scholarships.</p>

        <h2 style={s.h2}>Semester vs Cumulative GPA</h2>
        <p style={s.p}>Your semester GPA covers one term. Your cumulative GPA includes every graded course you have ever taken at the institution. One bad semester does not permanently destroy your cumulative GPA — it can be recovered over time with strong subsequent performance.</p>

        <h2 style={s.h2}>GPA Requirements to Know</h2>
        <p style={s.p}>Dean's List typically requires 3.0+. Most merit scholarships require 3.0 to 3.5. Graduate school admissions generally look for 3.0+ (competitive programs want 3.5+). Academic probation usually kicks in below 2.0. Knowing these thresholds lets you plan strategically.</p>

        <h2 style={s.h2}>Calculate Yours Instantly</h2>
        <p style={s.p}>Our free GPA Calculator lets you enter all your courses and see your GPA on the 4.0 scale in real time — add courses, change grades, and see the impact immediately.</p>
        <Link href="/tools/gpa-calculator" style={s.cta}>Open GPA Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Tracking your study time? Use our <Link href="/tools/pomodoro-timer" style={{ color: "#0D9488" }}>Pomodoro Timer</Link> to maximize focus sessions for better grades.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
