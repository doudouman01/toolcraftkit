"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Remove Duplicate Lines</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Paste your text or data into the box above. The tool identifies and removes all duplicate lines, keeping only unique entries. You can also sort the results alphabetically, trim whitespace from each line, and ignore case differences when comparing.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Removing Duplicates Matters</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Duplicate data causes problems everywhere. In email lists, duplicates mean wasted sends and higher costs. In spreadsheets, they skew calculations and reports. In code, duplicate entries in configuration files cause unexpected behavior. In SEO, duplicate URLs in keyword lists waste crawl budget.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>This tool processes text line by line, making it perfect for cleaning up lists exported from Excel, CSV files, log outputs, database queries, and any text-based data where duplicates need to go.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Cleaning email lists before import into a CRM or marketing tool</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Removing duplicate lines from Excel data pasted as text</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Deduplicating keyword lists for SEO campaigns</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Cleaning up log files and server outputs</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Merging multiple lists and removing overlapping entries</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Working with regular expressions? Use our <a href='/tools/regex-tester' style='color:#0D9488'>Regex Tester</a> to find and filter patterns before deduplication.` }} />
      </div>
    </section>
  );
}
