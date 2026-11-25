"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the GDPR Data Request Generator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Select whether your request falls under GDPR (EU) or CCPA (California). Choose the type of request — data access, deletion, rectification, portability, or objection. Enter your name, email, and the organization you are sending the request to. Add any specific details about the data you want addressed. Click Generate and get a formal, ready-to-send data subject request letter.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why You Might Need a Data Request</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Under the GDPR and CCPA, individuals have the right to know what personal data companies hold about them, request its deletion, correct inaccuracies, or receive it in a portable format. Organizations are legally required to respond within 30 days (GDPR) or 45 days (CCPA). A formal, well-structured request ensures your rights are taken seriously and creates a documented trail.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Requesting a company delete all your personal data after closing an account</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Asking a service to provide a copy of all data they hold about you</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Correcting inaccurate information in a company&apos;s records</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Objecting to your data being used for marketing or profiling</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Exporting your data from one platform to transfer to another</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Pair your data request with a compliant website by using our <a href='/tools/privacy-policy-generator' style='color:#0D9488'>Privacy Policy Generator</a>. If your business handles AI-generated content, our <a href='/tools/ai-disclosure-generator' style='color:#0D9488'>AI Disclosure Generator</a> helps you stay transparent.` }} />
      </div>
    </section>
  );
}
