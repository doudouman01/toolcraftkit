"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Terms of Service Generator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Fill in your website or app name, contact email, and select your jurisdiction. Check the boxes for any features your platform offers, such as user accounts, e-commerce, or API access. Click "Generate Terms of Service" and the tool instantly produces a comprehensive, numbered legal document tailored to your selections.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Once generated, copy the text to your clipboard or download it as a .txt file. Paste it into your website's Terms of Service page. The document includes jurisdiction-specific clauses for the United States, European Union, Canada, and Australia.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Every Website Needs Terms of Service</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Terms of Service (ToS) establish the legal agreement between your website or app and its users. They define acceptable use, limit your liability, protect your intellectual property, and set expectations for user behavior. Without ToS, you may have limited legal recourse if disputes arise.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Many app stores, payment processors, and advertising platforms require that you publish Terms of Service before they approve your application. Having professional ToS in place also builds trust with users and demonstrates that you take your platform seriously.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>What This Generator Covers</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Acceptance of terms and eligibility requirements</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>User accounts, registration, and security obligations</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>User-generated content policies and licensing</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>E-commerce, payments, refunds, and subscription terms</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>API access, rate limits, and developer obligations</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Intellectual property protections</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Limitation of liability and warranty disclaimers</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Jurisdiction-specific governing law clauses</li>
      </ul>

      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Pair this tool with our <a href='/tools/privacy-policy-generator' style='color:#0D9488'>Privacy Policy Generator</a> to cover both essential legal pages for your website. Most jurisdictions require both documents to be published and easily accessible.` }} />
      </div>
    </section>
  );
}
