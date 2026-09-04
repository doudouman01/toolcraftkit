"use client";
export default function SeoContent() {
  const h2 = { fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" } as React.CSSProperties;
  const p = { fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" } as React.CSSProperties;
  const ul = { paddingLeft: "20px", marginBottom: "16px" } as React.CSSProperties;
  const li = { fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" } as React.CSSProperties;
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={h2}>How to Convert Text to PDF</h2>
      <p style={p}>Paste or type your text, optionally add a title, choose a font size, and click convert. The tool generates a properly formatted PDF with automatic page breaks, margins, and word wrapping. Download the result instantly — no signup, no watermarks.</p>
      <h2 style={h2}>Why Convert Text to PDF</h2>
      <p style={p}>Plain text files look unprofessional when shared. They have no formatting, no margins, and display differently on every device. Converting to PDF gives your text a polished, consistent appearance that looks the same everywhere — on screen, in print, and across every operating system.</p>
      <p style={p}>PDFs are also harder to accidentally edit, making them ideal for contracts, agreements, meeting notes, and any text that should remain as-is after sharing.</p>
      <h2 style={h2}>Common Use Cases</h2>
      <ul style={ul}>
        <li style={li}>Converting meeting notes and memos to shareable PDF documents</li>
        <li style={li}>Creating simple text-based contracts and agreements</li>
        <li style={li}>Formatting code or log output as printable documents</li>
        <li style={li}>Converting chat transcripts and emails to archival PDFs</li>
        <li style={li}>Preparing plain text assignments as formatted submissions</li>
      </ul>
    </section>
  );
}
