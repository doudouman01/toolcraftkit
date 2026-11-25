"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the NDA Generator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Choose between a mutual NDA (both parties share secrets) or a one-way NDA (one party discloses). Enter the party names, describe the purpose, select the duration and jurisdiction. Click Generate and get a complete, professional NDA ready to review and sign. You can copy it to your clipboard or download it as a text file.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why You Need an NDA</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>A Non-Disclosure Agreement protects your confidential business information when sharing it with potential partners, investors, contractors, or employees. Without an NDA, you have limited legal recourse if someone misuses your trade secrets, business plans, or proprietary data. NDAs are standard practice in business negotiations, hiring, and partnership discussions.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Startups sharing business plans with potential investors or advisors</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Businesses hiring freelancers or contractors who will access proprietary systems</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Companies exploring partnerships, mergers, or joint ventures</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Employers onboarding new employees with access to trade secrets</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Inventors or creators sharing ideas before filing patents or trademarks</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Build your complete legal document set: generate a <a href='/tools/privacy-policy-generator' style='color:#0D9488'>Privacy Policy</a> for your website and <a href='/tools/terms-of-service-generator' style='color:#0D9488'>Terms of Service</a> to protect your business operations.` }} />
      </div>
    </section>
  );
}
