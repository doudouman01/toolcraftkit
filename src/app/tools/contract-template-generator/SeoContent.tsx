"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Contract Template Generator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Select the type of contract you need — freelance, consulting, service agreement, or employment. Enter the names and addresses of both parties, describe the scope of work, set payment terms (amount, currency, schedule), and define the contract duration and termination notice period. Toggle optional clauses for confidentiality and intellectual property. Click Generate and get a complete, professional contract template ready to customize and sign.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Written Contracts Are Essential</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>A written contract protects both parties by clearly defining expectations, deliverables, payment terms, and what happens if things go wrong. Without a contract, disputes become difficult to resolve and you may have little legal recourse. Even for small projects, a simple agreement can prevent misunderstandings and establish professional credibility. Freelancers, consultants, and small businesses should always have a signed contract before starting work.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Freelancers defining project scope and payment terms with clients</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Consultants setting up engagement agreements with clear deliverables</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Small businesses creating service agreements for recurring clients</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Startups drafting employment contracts for new hires</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Agencies formalizing project-based work with subcontractors</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Need a standalone NDA? Use our <a href='/tools/nda-generator' style='color:#0D9488'>NDA Generator</a>. For billing, pair your contract with our <a href='/tools/invoice-generator' style='color:#0D9488'>Invoice Generator</a> to create professional invoices that reference your agreement.` }} />
      </div>
    </section>
  );
}
