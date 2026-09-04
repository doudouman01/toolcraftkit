"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Word Counter</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Paste or type your text into the box above. The tool instantly counts words, characters (with and without spaces), sentences, and paragraphs. It also estimates reading time and speaking time based on average speeds.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>The keyword density feature shows which words appear most frequently in your text — useful for SEO content optimization and ensuring your writing stays focused on target topics.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Word Count Matters</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Whether you are writing a blog post, an academic essay, or social media copy, word count is a fundamental metric. Search engines tend to favor in-depth content (typically 1,500 to 2,500 words for competitive queries), while platforms like Twitter and Instagram enforce strict character limits.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Students need precise word counts for assignments. Freelance writers often get paid per word. Copywriters need to stay within ad character limits. This tool handles all of these use cases instantly, without any signup or software installation.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>SEO content writers checking article length and keyword density</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Students verifying essay word count for academic submissions</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Freelancers tracking deliverable length for client projects</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Social media managers checking character limits before posting</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Translators estimating project scope from source text length</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Combine this tool with our <a href='/tools/character-counter' style='color:#0D9488'>Character Counter</a> for platform-specific limits, or use <a href='/tools/words-to-pages' style='color:#0D9488'>Words to Pages</a> to estimate printed page count.` }} />
      </div>
    </section>
  );
}
