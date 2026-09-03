import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate Compound Interest (Formula + Examples)",
  description: "Learn the compound interest formula, see real examples, and use our free calculator to see how your money grows over time with monthly or yearly compounding.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
    table: { width: "100%", borderCollapse: "collapse" as const, marginBottom: 20, fontSize: 14 },
    th: { padding: "10px 12px", background: "#F5F5F4", textAlign: "left" as const, fontWeight: 600, fontSize: 13, borderBottom: "2px solid #E7E5E4" },
    td: { padding: "10px 12px", borderBottom: "1px solid #F5F5F4" },
    code: { background: "#F5F5F4", padding: "2px 8px", borderRadius: 4, fontSize: 14, fontFamily: "monospace" } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>How to Calculate Compound Interest (Formula + Examples)</h1>
        <p style={s.meta}>September 3, 2026 · 5 min read</p>

        <p style={s.p}>Compound interest is the reason a small investment can grow into a fortune — and the reason credit card debt spirals out of control. Unlike simple interest, which is calculated only on the principal, compound interest earns interest on your interest. Understanding how it works is one of the most valuable financial skills you can have.</p>

        <h2 style={s.h2}>The Compound Interest Formula</h2>
        <p style={s.p}>The standard formula is: <span style={s.code}>A = P × (1 + r/n)^(n×t)</span></p>
        <p style={s.p}>Where <strong>A</strong> is the final amount, <strong>P</strong> is the principal (starting amount), <strong>r</strong> is the annual interest rate (as a decimal), <strong>n</strong> is the number of times interest compounds per year, and <strong>t</strong> is the number of years.</p>

        <h2 style={s.h2}>Example: $10,000 at 7% for 20 Years</h2>
        <p style={s.p}>If you invest $10,000 at a 7% annual return compounded monthly, after 20 years you would have approximately $40,387. That means your money quadrupled — and $30,387 of that is pure interest earned on interest.</p>

        <h2 style={s.h2}>Compounding Frequency Matters</h2>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}>Compounding</th><th style={s.th}>$10,000 at 7% for 20 years</th></tr>
          </thead>
          <tbody>
            {[
              ["Annually", "$38,697"],
              ["Quarterly", "$39,927"],
              ["Monthly", "$40,387"],
              ["Daily", "$40,552"],
            ].map(([freq, amount], i) => (
              <tr key={i}><td style={s.td}>{freq}</td><td style={s.td}>{amount}</td></tr>
            ))}
          </tbody>
        </table>
        <p style={s.p}>The more frequently interest compounds, the more you earn — though the difference between monthly and daily compounding is relatively small.</p>

        <h2 style={s.h2}>The Power of Starting Early</h2>
        <p style={s.p}>Time is the most powerful variable in compound interest. Someone who invests $200 per month starting at age 25 will have significantly more at age 65 than someone who invests $400 per month starting at age 35 — even though the late starter contributes more total money. This is because the early investor has an extra decade for compounding to work.</p>

        <h2 style={s.h2}>Compound Interest on Debt</h2>
        <p style={s.p}>Compound interest works against you when you carry debt. A $5,000 credit card balance at 22% APR, with only minimum payments, can take over 20 years to pay off and cost you more than $10,000 in total interest. Understanding this is the first step to making smarter borrowing decisions.</p>

        <h2 style={s.h2}>The Rule of 72</h2>
        <p style={s.p}>A quick way to estimate how long it takes to double your money: divide 72 by your interest rate. At 7%, your money doubles in roughly 10.3 years. At 10%, it doubles in about 7.2 years. At 3%, it takes 24 years. This mental shortcut is surprisingly accurate for rates between 2% and 15%.</p>

        <h2 style={s.h2}>Tips to Maximize Compound Interest</h2>
        <p style={s.p}><strong>Start as early as possible</strong> — even small amounts benefit enormously from time. <strong>Reinvest your returns</strong> — dividends and interest should be reinvested, not withdrawn. <strong>Increase contributions over time</strong> — adding even $50 more per month makes a measurable difference over decades. <strong>Choose higher compounding frequency</strong> — when comparing savings accounts or investments, more frequent compounding is better.</p>

        <h2 style={s.h2}>Try It Yourself</h2>
        <p style={s.p}>Use our free Compound Interest Calculator to see exactly how your money will grow. Enter your principal, rate, contribution, and time period to get a detailed breakdown.</p>
        <Link href="/tools/compound-interest" style={s.cta}>Open Compound Interest Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Planning a mortgage or loan? Check our <Link href="/tools/mortgage-calculator" style={{ color: "#0D9488" }}>Mortgage Calculator</Link> and <Link href="/tools/loan-calculator" style={{ color: "#0D9488" }}>Loan Calculator</Link> for payment breakdowns.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
