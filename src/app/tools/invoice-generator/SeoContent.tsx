"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Create an Invoice</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Fill in your business details, client information, and line items (description, quantity, rate). The generator automatically calculates subtotals, tax, and the total amount due. Add your payment terms and due date, then download as PDF or print directly — no signup, no watermarks.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>What Makes a Professional Invoice</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>A professional invoice should include your business name and contact details, the client name and address, a unique invoice number, the invoice date and payment due date, itemized descriptions with quantities and rates, subtotal, applicable taxes, and the total amount due. Including payment terms and accepted payment methods reduces back-and-forth and speeds up payment.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Consistent, professional invoices build credibility with clients and make bookkeeping easier at tax time. Every invoice you generate here follows these best practices automatically.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Freelancers billing clients for completed projects</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Small business owners invoicing customers</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Consultants sending hourly or project-based invoices</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Contractors billing for services and materials</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Side hustlers managing informal business transactions</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Track your business profitability using our <a href='/tools/profit-margin-calculator' style='color:#0D9488'>Profit Margin Calculator</a> and <a href='/tools/roi-calculator' style='color:#0D9488'>ROI Calculator</a>.` }} />
      </div>
    </section>
  );
}
