import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pregnancy Due Date Calculator: How Due Dates Are Calculated",
  description: "Learn how pregnancy due dates are calculated using Naegele's rule. Understand gestational age, trimesters, and what your estimated due date really means.",
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
        <h1 style={s.h1}>Pregnancy Due Date Calculator: How Due Dates Are Calculated</h1>
        <p style={s.meta}>November 2026 · 5 min read</p>

        <p style={s.p}>One of the first questions every expectant parent asks is &quot;when is the baby due?&quot; While the answer involves some estimation, the methods behind due date calculations are well-established and remarkably reliable. Understanding how your due date is determined helps you plan ahead and set realistic expectations for your pregnancy timeline.</p>

        <h2 style={s.h2}>Naegele&apos;s Rule: The Standard Method</h2>
        <p style={s.p}>The most widely used method for calculating a due date is Naegele&apos;s Rule, developed by German obstetrician Franz Naegele in the early 1800s. The formula is simple: take the first day of your last menstrual period (LMP), add one year, subtract three months, and add seven days. This gives you an estimated due date 280 days (40 weeks) from the start of your last period. The calculation assumes a 28-day menstrual cycle with ovulation occurring on day 14 — which is why actual delivery dates can vary.</p>

        <h2 style={s.h2}>Gestational Age vs Fetal Age</h2>
        <p style={s.p}>Gestational age counts from the first day of the last menstrual period, even though conception typically occurs about two weeks later. This means that at &quot;two weeks pregnant,&quot; conception has just occurred. Fetal age, on the other hand, counts from the actual date of conception. Medical professionals use gestational age because the LMP date is usually more reliably known than the exact conception date. When your doctor says you&apos;re 12 weeks pregnant, that&apos;s gestational age — the fetus is actually about 10 weeks old.</p>

        <h2 style={s.h2}>Understanding Trimesters</h2>
        <p style={s.p}>Pregnancy is divided into three trimesters, each roughly 13 weeks long. The first trimester (weeks 1 through 12) covers the period of most critical development — major organs and systems form during this time. The second trimester (weeks 13 through 26) is often called the most comfortable period, as early symptoms typically ease. The third trimester (weeks 27 through 40) involves rapid fetal growth and preparation for birth. Knowing your trimester helps you anticipate what changes and milestones to expect.</p>

        <h2 style={s.h2}>How Accurate Are Due Dates?</h2>
        <p style={s.p}>Only about 4 percent of babies arrive on their exact due date. Most births occur within a window of two weeks before to two weeks after the estimated date. First pregnancies tend to go slightly longer on average. Factors that affect accuracy include irregular menstrual cycles, uncertainty about the LMP date, and natural variation in pregnancy length. Ultrasound dating in the first trimester can refine the estimate, and your healthcare provider may adjust your due date based on early ultrasound measurements if they differ significantly from the LMP calculation.</p>

        <h2 style={s.h2}>Calculate Your Due Date</h2>
        <p style={s.p}>Our free <Link href="/tools/pregnancy-calculator" style={{ color: "#0D9488" }}>Pregnancy Due Date Calculator</Link> uses Naegele&apos;s Rule to estimate your due date from the first day of your last period. It also shows your current gestational week, trimester, and key upcoming milestones — all instantly and privately in your browser.</p>
        <Link href="/tools/pregnancy-calculator" style={s.cta}>Open Due Date Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Planning your schedule around your due date? Our <Link href="/tools/date-calculator" style={{ color: "#0D9488" }}>Date Calculator</Link> helps you count days between dates, and the <Link href="/tools/countdown-timer" style={{ color: "#0D9488" }}>Countdown Timer</Link> can track the days until your big day.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
