import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Annual Salary to Hourly Rate: How to Calculate Your Real Pay",
  description: "Convert your annual salary to hourly, weekly, and monthly rates. Understand take-home pay after taxes and how to negotiate your worth with real numbers.",
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
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>Annual Salary to Hourly Rate: How to Calculate Your Real Pay</h1>
        <p style={s.meta}>September 3, 2026 · 4 min read</p>

        <p style={s.p}>Knowing your hourly rate is essential whether you are negotiating a raise, comparing job offers, freelancing, or just trying to understand what your time is actually worth. The conversion is straightforward but many people overlook the factors that change the real number — taxes, benefits, and actual hours worked.</p>

        <h2 style={s.h2}>Quick Salary Conversion Table</h2>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}>Annual Salary</th><th style={s.th}>Monthly</th><th style={s.th}>Weekly</th><th style={s.th}>Hourly (40h)</th></tr>
          </thead>
          <tbody>
            {[
              ["$30,000", "$2,500", "$577", "$14.42"],
              ["$40,000", "$3,333", "$769", "$19.23"],
              ["$50,000", "$4,167", "$962", "$24.04"],
              ["$60,000", "$5,000", "$1,154", "$28.85"],
              ["$75,000", "$6,250", "$1,442", "$36.06"],
              ["$100,000", "$8,333", "$1,923", "$48.08"],
              ["$120,000", "$10,000", "$2,308", "$57.69"],
              ["$150,000", "$12,500", "$2,885", "$72.12"],
            ].map(([annual, monthly, weekly, hourly], i) => (
              <tr key={i}><td style={s.td}>{annual}</td><td style={s.td}>{monthly}</td><td style={s.td}>{weekly}</td><td style={s.td}>{hourly}</td></tr>
            ))}
          </tbody>
        </table>
        <p style={s.p}>Based on 2,080 working hours per year (52 weeks × 40 hours). Your actual hourly rate may differ based on overtime, paid time off, and unpaid hours.</p>

        <h2 style={s.h2}>The Simple Formula</h2>
        <p style={s.p}>To convert annual salary to hourly rate, divide by 2,080 (the standard number of working hours in a year). To go from hourly to annual, multiply by 2,080. For monthly, divide annual by 12. For biweekly, divide annual by 26.</p>

        <h2 style={s.h2}>Why Your Real Hourly Rate Is Lower Than You Think</h2>
        <p style={s.p}><strong>Taxes</strong> take 20% to 35% depending on your bracket and location. A $60,000 salary might yield only $45,000 after federal, state, and payroll taxes — dropping your effective hourly rate from $28.85 to roughly $21.63.</p>
        <p style={s.p}><strong>Commute time</strong> is unpaid work. If you spend 1 hour commuting each way, you are effectively working 10-hour days for 8 hours of pay — reducing your real hourly rate by 20%.</p>
        <p style={s.p}><strong>Unpaid overtime</strong> is common for salaried employees. If you regularly work 50 hours per week instead of 40, your effective hourly rate is 20% lower than the standard calculation suggests.</p>

        <h2 style={s.h2}>Comparing Job Offers: Beyond the Salary Number</h2>
        <p style={s.p}>A job paying $70,000 with 4 weeks of paid vacation, full health insurance, and a 10-minute commute may be worth more than a job paying $85,000 with 2 weeks of vacation, no insurance, and a 1-hour commute. Convert everything to an effective hourly rate to compare apples to apples.</p>

        <h2 style={s.h2}>For Freelancers: Setting Your Rate</h2>
        <p style={s.p}>If you are freelancing, your hourly rate needs to cover more than just your desired salary. Add self-employment tax (roughly 15%), health insurance, retirement savings, unpaid time off, and non-billable hours (admin, marketing, invoicing). A common rule of thumb is to charge 2x to 3x what you would earn as an employee for the same work.</p>

        <h2 style={s.h2}>Calculate Your Salary Breakdown</h2>
        <p style={s.p}>Use our free Salary Calculator to instantly convert between annual, monthly, weekly, and hourly rates. See the breakdown in all time periods at once.</p>
        <Link href="/tools/salary-calculator" style={s.cta}>Open Salary Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Curious about your tax burden? Estimate your federal income tax with our <Link href="/tools/income-tax" style={{ color: "#0D9488" }}>Income Tax Calculator</Link>.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
