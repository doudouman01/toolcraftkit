"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the AI Disclosure Generator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Select your document type and the disclosure format you need (California SB 574, EU AI Act, or general). Check which AI tools you used and how you used them. Enter your name, the document title, and date. Click Generate to create a compliant disclosure statement ready to paste into your document.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why AI Disclosure Matters</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>As of January 1, 2027, California&apos;s SB 574 requires attorneys to verify and disclose AI-generated content in court filings. The EU AI Act mandates transparency for AI-assisted outputs in regulated industries. Academic institutions increasingly require AI disclosure in research papers and theses. A proper disclosure statement protects you legally, builds trust with your audience, and demonstrates responsible AI use.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Attorneys filing motions, briefs, or legal memoranda prepared with AI assistance</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Researchers and students submitting academic papers that used AI for drafting or analysis</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Businesses publishing reports, proposals, or white papers with AI-generated content</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Content creators and bloggers voluntarily disclosing AI assistance for transparency</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Pair your disclosure with a complete <a href='/tools/privacy-policy-generator' style='color:#0D9488'>Privacy Policy</a> and <a href='/tools/terms-of-service-generator' style='color:#0D9488'>Terms of Service</a> for full legal compliance on your website or business documents.` }} />
      </div>
    </section>
  );
}
