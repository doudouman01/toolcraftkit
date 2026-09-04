"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Calculate ROI</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Enter your initial investment amount and the final value (or profit). The calculator shows your total return, ROI percentage, net profit, and annualized return (CAGR) if you specify the investment duration. CAGR lets you compare investments of different lengths on equal footing.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Understanding ROI and CAGR</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>ROI (Return on Investment) measures total return as a percentage of cost. A $10,000 investment that grows to $15,000 has a 50% ROI. Simple, but it ignores time. An investment that returns 50% in one year is very different from one that takes ten years.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>CAGR (Compound Annual Growth Rate) solves this by expressing the return as an equivalent annual rate. It answers the question: at what annual rate would my investment have grown to reach this final value? This makes comparing stocks, real estate, business investments, and savings accounts straightforward.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Investors comparing returns across different assets</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Business owners measuring marketing campaign effectiveness</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Real estate investors calculating property appreciation</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Entrepreneurs evaluating business expansion decisions</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Financial planners projecting retirement savings growth</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Planning a loan for your investment? Check the costs with our <a href='/tools/loan-calculator' style='color:#0D9488'>Loan Calculator</a>.` }} />
      </div>
    </section>
  );
}
