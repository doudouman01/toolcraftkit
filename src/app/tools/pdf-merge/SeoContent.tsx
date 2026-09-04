"use client";
export default function SeoContent() {
  const h2 = { fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" } as React.CSSProperties;
  const p = { fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" } as React.CSSProperties;
  const ul = { paddingLeft: "20px", marginBottom: "16px" } as React.CSSProperties;
  const li = { fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" } as React.CSSProperties;
  const tip = { background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px" } as React.CSSProperties;
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={h2}>How to Merge PDF Files</h2>
      <p style={p}>Upload two or more PDF files by dragging them into the drop zone or clicking to browse. Use the arrow buttons to reorder files — the final PDF follows the order shown. Click Merge and download the combined document. Your files never leave your browser — all processing happens locally using the pdf-lib library.</p>
      <h2 style={h2}>Why Merge PDFs Online</h2>
      <p style={p}>Sending multiple PDF attachments is messy and unprofessional. Merging them into a single document makes sharing, printing, and archiving cleaner. Most desktop PDF editors charge $10 to $20 per month for this feature. This tool does it for free, instantly, and without installing any software.</p>
      <p style={p}>Unlike other online PDF tools, this merger processes everything in your browser. Your documents are never uploaded to a server, which means sensitive contracts, invoices, and reports stay private.</p>
      <h2 style={h2}>Common Use Cases</h2>
      <ul style={ul}>
        <li style={li}>Combining scanned documents into a single file for submission</li>
        <li style={li}>Merging separate invoice or receipt PDFs for expense reports</li>
        <li style={li}>Assembling report chapters or sections into one document</li>
        <li style={li}>Combining cover letter and resume into a single application PDF</li>
        <li style={li}>Creating document bundles for client deliverables</li>
      </ul>
      <div style={tip}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }}>Need to convert images to PDF first? Use our <a href="/tools/image-to-pdf" style={{ color: "#0D9488" }}>Image to PDF</a> converter, then merge with other documents here.</p>
      </div>
    </section>
  );
}
