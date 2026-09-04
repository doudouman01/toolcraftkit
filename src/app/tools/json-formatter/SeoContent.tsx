"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the JSON Formatter</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Paste raw JSON into the input field. The formatter validates your JSON, highlights syntax, and displays it with proper indentation. Switch between formatted (pretty-printed) and minified views. The structure stats show object depth, key count, and array sizes.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Formatting JSON Matters</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>API responses, configuration files, and database exports often come as minified JSON — a single unreadable line of text. Formatting it with proper indentation reveals the structure, making it possible to inspect values, find errors, and understand the data hierarchy.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Validation catches common JSON errors: missing commas, unquoted keys, trailing commas, and mismatched brackets. These errors are easy to make and hard to spot in raw text. The formatter highlights exactly where the error is.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>API developers inspecting and debugging response payloads</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>DevOps engineers editing JSON configuration files</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Data engineers validating JSON data before pipeline ingestion</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Frontend developers formatting API responses for documentation</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>QA testers verifying JSON structure in test responses</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Need to match patterns in your JSON data? Try our <a href='/tools/regex-tester' style='color:#0D9488'>Regex Tester</a>.` }} />
      </div>
    </section>
  );
}
