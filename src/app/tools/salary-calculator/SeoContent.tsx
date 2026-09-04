"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Salary Calculator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Enter any salary figure — annual, monthly, weekly, or hourly — and the calculator converts it to all other time periods. Customize work hours per week and weeks per year for accurate results. The breakdown shows daily, weekly, biweekly, semimonthly, monthly, and annual equivalents.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Salary Conversion Matters</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Job offers come in different formats. One company quotes $85,000 per year. Another offers $42 per hour. A freelance contract pays $7,000 per month. Comparing these requires converting to a common base. This calculator makes that instant.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Freelancers especially need this to set hourly rates. If you want to earn $100,000 per year working 48 weeks at 35 billable hours per week, your hourly rate needs to be $59.52 — not $48 as a simple division by 2,080 standard hours would suggest.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Job seekers comparing offers in different pay formats</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Freelancers calculating target hourly rates</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>HR professionals converting salaries for budgeting</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Contract workers understanding their annualized pay</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Part-time workers estimating yearly income</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Estimate your take-home pay after taxes with our <a href='/tools/income-tax-calculator' style='color:#0D9488'>Income Tax Calculator</a>.` }} />
      </div>
    </section>
  );
}
