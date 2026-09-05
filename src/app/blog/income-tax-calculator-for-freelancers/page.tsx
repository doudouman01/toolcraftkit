import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Income Tax Calculator for Freelancers & Self-Employed (2026 Guide)",
  description: "Estimate your self-employment tax, quarterly payments, and deductions. Tax calculator and guide for freelancers, contractors, and gig workers.",
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
        <h1 style={s.h1}>Income Tax Calculator for Freelancers & Self-Employed (2026 Guide)</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Freelancers pay more taxes than employees — and most do not realize it until their first tax bill arrives. As a self-employed worker, you pay both the employer and employee portions of Social Security and Medicare taxes (15.3% combined), plus your regular income tax. Understanding your tax obligations prevents nasty surprises in April.</p>

        <h2 style={s.h2}>Self-Employment Tax Explained</h2>
        <p style={s.p}>Employees pay 7.65% in FICA taxes, and their employer matches with another 7.65%. As a freelancer, you pay both halves — 15.3% on your first $168,600 of net earnings (2026 threshold). This is in addition to your income tax. You can deduct half of your SE tax from your adjusted gross income, but the full 15.3% still applies to your tax bill.</p>

        <h2 style={s.h2}>Quarterly Estimated Payments</h2>
        <p style={s.p}>The IRS expects freelancers to pay taxes quarterly — not once a year. Quarterly due dates are April 15, June 15, September 15, and January 15. If you owe more than $1,000 at tax time, you face underpayment penalties. A safe harbor is paying 100% of last year's tax liability (110% if income was over $150,000).</p>

        <h2 style={s.h2}>Common Deductions to Reduce Your Bill</h2>
        <p style={s.p}>Home office deduction: $5 per square foot (simplified) or actual expenses. Health insurance premiums: fully deductible for self-employed. Business equipment and software: deduct or depreciate. Vehicle expenses: standard mileage rate or actual costs. Professional development: courses, books, conferences. Internet and phone: business-use percentage.</p>

        <h2 style={s.h2}>How to Estimate Your Tax</h2>
        <p style={s.p}>A rough estimate for freelancers: set aside 25-30% of every payment you receive. This covers income tax and self-employment tax for most income levels. Use a tax calculator to get a more precise figure based on your actual income, filing status, and deductions. Adjust your savings percentage each quarter as income fluctuates.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Income Tax Calculator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/income-tax-calculator" style={s.cta}>Open Income Tax Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/salary-calculator" style={{ color: "#0D9488" }}>Salary Calculator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
