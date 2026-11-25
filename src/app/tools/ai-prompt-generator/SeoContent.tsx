"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the AI Prompt Generator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Select a task type (writing, coding, marketing, research, or creative), choose a tone and response length, then describe what you want the AI to do. Add any context about your audience or requirements. Click Generate and get a structured, copy-ready prompt optimized for ChatGPT, Claude, Gemini, or any other AI assistant.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Good Prompts Matter</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>The quality of an AI&apos;s output is directly tied to the quality of the prompt. A well-structured prompt with a clear role, specific task, relevant context, and explicit format instructions consistently produces better results than a vague one-liner. Studies show that structured prompts can improve AI output quality by 40-60% compared to unstructured requests. This generator applies best practices in prompt engineering — role assignment, constraint setting, and format specification — so you get better results every time.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Writers crafting blog posts, articles, emails, and social media content</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Developers generating code, debugging, and writing documentation</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Marketers creating ad copy, landing pages, and campaign strategies</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Researchers summarizing papers, analyzing data, and generating hypotheses</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Students working on essays, study guides, and presentation outlines</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `After generating your prompt, check the AI's output with our <a href='/tools/ai-content-detector' style='color:#0D9488'>AI Content Detector</a> to verify originality, or use the <a href='/tools/paraphrasing-tool' style='color:#0D9488'>Paraphrasing Tool</a> to refine the results in your own voice.` }} />
      </div>
    </section>
  );
}
