"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Privacy Policy Generator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Enter your website name, URL, and contact email. Select which types of data your site collects — personal information, cookies, analytics, third-party services, email marketing, or payment processing. Choose the regulation that applies to your audience (general, GDPR, CCPA, or COPPA for children under 13). Click Generate and get a complete, professional privacy policy ready to publish.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Every Website Needs a Privacy Policy</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>A privacy policy is legally required in most jurisdictions if your website collects any personal data — including through cookies, analytics tools, or contact forms. The EU General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and many other laws mandate clear disclosure of what data you collect, how you use it, and how users can exercise their rights.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Beyond legal compliance, a visible privacy policy builds trust with your visitors. Users are more likely to share their information and engage with your site when they understand how their data is handled. Most advertising networks and app stores also require a privacy policy before you can monetize.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Blog owners and content creators who use Google Analytics or cookies</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>E-commerce stores collecting customer payment and shipping data</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>SaaS businesses handling user accounts and personal information</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Freelancers and small businesses launching a new website</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Mobile app developers meeting app store privacy requirements</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `After generating your privacy policy, create matching legal pages with our <a href='/tools/invoice-generator' style='color:#0D9488'>Invoice Generator</a> for your business documents, or use our <a href='/tools/email-signature-generator' style='color:#0D9488'>Email Signature Generator</a> to add a professional touch to your communications.` }} />
      </div>
    </section>
  );
}
