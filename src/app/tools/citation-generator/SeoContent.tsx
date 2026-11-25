"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Citation Generator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Select your source type (book, journal article, website, or video) and citation format (APA 7th, MLA 9th, Chicago, or Harvard). Fill in the relevant fields — author names, title, year, publisher, and any additional details. Click Add Citation to generate a formatted reference. You can generate multiple citations and copy them all at once.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Proper Citations Matter</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Accurate citations give credit to original authors, allow readers to verify your sources, and demonstrate the depth of your research. Whether you are writing an academic paper, a research report, or a blog post, properly formatted references build credibility. Each citation style (APA, MLA, Chicago, Harvard) has specific rules for formatting — getting them right manually is tedious and error-prone.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Students writing research papers, essays, and dissertations</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Researchers compiling reference lists for journal submissions</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Bloggers and content creators citing sources in their articles</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Teachers preparing reading lists and course materials</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Authors building bibliographies for nonfiction books</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `After building your citations, check the readability of your paper with our <a href='/tools/readability-score' style='color:#0D9488'>Readability Score Checker</a>, or count your words with our <a href='/tools/word-counter' style='color:#0D9488'>Word Counter</a>.` }} />
      </div>
    </section>
  );
}
