import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paycheck Calculator: Understand Your Deductions & Take-Home Pay",
  description: "Learn what gets deducted from your paycheck and why. Understand federal taxes, state taxes, Social Security, Medicare, and how to calculate your net pay.",
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
        <h1 style={s.h1}>Paycheck Calculator: Understand Your Deductions & Take-Home Pay</h1>
        <p style={s.meta}>November 2026 · 6 min read</p>

        <p style={s.p}>Your gross salary and your take-home pay are very different numbers. Between federal income tax, state tax, Social Security, Medicare, and other deductions, the gap can be surprising — especially for people starting a new job or negotiating a raise. Understanding exactly where your money goes helps you budget accurately and make smarter financial decisions.</p>

        <h2 style={s.h2}>Federal Income Tax</h2>
        <p style={s.p}>The United States uses a progressive tax system, meaning different portions of your income are taxed at different rates. For 2026, the brackets range from 10 percent on the first portion of taxable income up to 37 percent on income above the highest threshold. Your effective tax rate — the overall percentage you actually pay — is always lower than your marginal rate. The amount withheld from each paycheck depends on the information you provided on your W-4 form, including your filing status and any adjustments for dependents or additional income.</p>

        <h2 style={s.h2}>State and Local Taxes</h2>
        <p style={s.p}>State income tax varies dramatically. Nine states — including Texas, Florida, and Washington — have no state income tax at all. Others, like California and New York, can add 10 percent or more to your tax burden. Some cities also impose local income taxes. When comparing job offers in different states, the difference in state tax alone can shift your effective salary by thousands of dollars per year.</p>

        <h2 style={s.h2}>Social Security and Medicare (FICA)</h2>
        <p style={s.p}>Every employee pays 6.2 percent of their gross wages toward Social Security, up to the annual wage base limit, and 1.45 percent toward Medicare with no income cap. If you earn above $200,000 as a single filer, an additional 0.9 percent Medicare surtax applies. Combined, FICA taxes take 7.65 percent from every paycheck for most workers. Your employer matches this amount, effectively doubling the contribution — but that employer portion doesn&apos;t appear on your pay stub.</p>

        <h2 style={s.h2}>Other Common Deductions</h2>
        <p style={s.p}>Beyond taxes, your paycheck may show deductions for health insurance premiums, retirement contributions like a 401(k) or 403(b), Health Savings Account contributions, life insurance, disability insurance, and union dues. Pre-tax deductions — like traditional 401(k) contributions and health insurance premiums — reduce your taxable income, which means they effectively cost less than their face value. Understanding which deductions are pre-tax versus post-tax helps you evaluate the true cost of your benefits.</p>

        <h2 style={s.h2}>Calculate Your Take-Home Pay</h2>
        <p style={s.p}>Our free <Link href="/tools/paycheck-calculator" style={{ color: "#0D9488" }}>Paycheck Calculator</Link> estimates your net pay after all deductions. Enter your gross salary, filing status, state, and pay frequency to see a detailed breakdown of federal tax, state tax, FICA, and your actual take-home amount per paycheck.</p>
        <Link href="/tools/paycheck-calculator" style={s.cta}>Open Paycheck Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Comparing job offers? Our <Link href="/tools/salary-calculator" style={{ color: "#0D9488" }}>Salary Calculator</Link> converts between hourly, monthly, and annual pay. Want to see how your investments could grow? Try our <Link href="/tools/compound-interest-calculator" style={{ color: "#0D9488" }}>Compound Interest Calculator</Link>.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
