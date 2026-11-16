"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Paycheck Calculator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Enter your annual salary or hourly rate, select your pay frequency (weekly, bi-weekly, semi-monthly, or monthly), and optionally enter a state tax rate. The calculator shows your gross pay, federal income tax, Social Security, Medicare, state tax, and net take-home pay for each pay period.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Understanding Your Paycheck</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Every paycheck includes mandatory deductions for federal income tax, Social Security (6.2%), and Medicare (1.45%). Federal tax is calculated using progressive tax brackets, meaning different portions of your income are taxed at different rates. State taxes vary by location.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Job seekers comparing salary offers</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Employees budgeting monthly expenses</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Freelancers estimating tax obligations</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>HR professionals explaining pay breakdowns</li>
      </ul>
    </section>
  );
}
