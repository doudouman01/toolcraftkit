"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Code Formatter</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Select the programming language from the dropdown, choose your preferred indentation (2 or 4 spaces), paste your code in the left panel, and click Format Code. The beautified output appears in the right panel, ready to copy. Supports JavaScript, TypeScript, JSON, HTML, CSS, Python, and SQL.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Code Formatting Matters</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Consistently formatted code is easier to read, debug, and maintain. In team environments, inconsistent formatting leads to unnecessary merge conflicts and slower code reviews. Properly indented code also makes it easier to spot logical errors — a misplaced bracket or a missing semicolon stands out when the structure is clean. Whether you&apos;re tidying up AI-generated code, cleaning up minified files, or standardizing code from different contributors, a formatter saves time and prevents errors.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Cleaning up AI-generated code from ChatGPT, Claude, or Copilot before committing</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Beautifying minified JavaScript or CSS for debugging</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Formatting JSON API responses for readability</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Standardizing indentation across code from multiple contributors</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Preparing code snippets for documentation, blog posts, or presentations</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Working with structured data? Use our <a href='/tools/json-formatter' style='color:#0D9488'>JSON Formatter</a> for advanced JSON validation and formatting, or test your patterns with the <a href='/tools/regex-tester' style='color:#0D9488'>Regex Tester</a>.` }} />
      </div>
    </section>
  );
}
