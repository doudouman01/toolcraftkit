"use client";
export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the AI Content Rewriter</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Paste your text in the left panel, select a rewriting mode (Simplify, Formal, Casual, Shorten, or Expand), and click Rewrite. The rewritten version appears in the right panel for easy comparison. Copy the result with one click. The word count tracker shows exactly how the text changed.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Rewriting Matters</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Different audiences need different tones. A business proposal requires formal language, while a social media post works best in a casual voice. The AI Content Rewriter lets you adapt a single piece of content for multiple contexts without starting from scratch. It also helps simplify complex writing for broader audiences or expand thin drafts into more detailed content.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Adapting business reports for executive summaries</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Converting academic writing to blog-friendly language</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Making technical documentation more accessible</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Repurposing content across formal and informal channels</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `After rewriting, check your text with our <a href='/tools/ai-content-detector' style='color:#0D9488'>AI Content Detector</a> and <a href='/tools/paraphrasing-tool' style='color:#0D9488'>Paraphrasing Tool</a> for a complete content workflow.` }} />
      </div>
    </section>
  );
}
