"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Legal Disclaimer Generator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Enter your business or website name and URL. Select the type of disclaimer you need — general, medical, financial, fitness, affiliate, or legal advice. Toggle additional sections like external links, errors and omissions, personal views, or AI-generated content disclaimers. Click Generate and get a professional, ready-to-publish disclaimer.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Every Website Needs a Disclaimer</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Disclaimers protect you and your business from liability. If your website provides information — whether about health, finance, fitness, law, or anything else — a disclaimer clarifies that the content is not professional advice and limits your legal exposure. Affiliate disclaimers are required by the FTC if you earn commissions through product links. AI disclaimers are increasingly important as regulations like the EU AI Act and California SB 574 require transparency about AI-generated content.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Health and fitness blogs that share workout routines or nutrition advice</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Finance blogs, investment content, or personal finance websites</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Affiliate marketing sites that earn commissions through product links</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Websites using AI tools to generate or assist in content creation</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Law firm websites that publish legal guides or FAQs</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Complete your legal page suite with our <a href='/tools/privacy-policy-generator' style='color:#0D9488'>Privacy Policy Generator</a> and <a href='/tools/terms-of-service-generator' style='color:#0D9488'>Terms of Service Generator</a>. All three pages together give your website a professional, legally-compliant foundation.` }} />
      </div>
    </section>
  );
}
