"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the JSON to CSV Converter</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Paste a JSON array of objects into the input area or upload a .json file. Click Convert and the tool will flatten any nested properties using dot notation (for example, address.city) and produce a clean CSV output. You can preview the result in a table, copy it to your clipboard, or download the .csv file directly.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>To convert CSV back to JSON, switch to the CSV to JSON tab. Paste your CSV data or upload a .csv file, select your delimiter (comma, semicolon, or tab), and click Convert. The tool parses each row into a JSON object using the header row as keys.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Convert Between JSON and CSV</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>JSON is the standard data format for APIs, web applications, and configuration files, while CSV remains the most widely supported format for spreadsheets, databases, and data analysis tools. Converting between the two is one of the most common tasks in data workflows.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Many teams export data from REST APIs in JSON format but need to open it in Excel, Google Sheets, or import it into a SQL database. This tool handles the conversion instantly without uploading your data to any server.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Developers converting API responses to spreadsheet-friendly CSV</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Data analysts preparing JSON datasets for Excel or Google Sheets</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>QA engineers converting test data between formats</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Product managers exporting analytics data for reporting</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Database administrators converting CSV exports to JSON for API imports</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Nested JSON objects are automatically flattened using dot notation. For example, <code style="background:#e0f2fe;padding:2px 6px;border-radius:4px;font-size:13px">{"address":{"city":"Paris"}}</code> becomes the column <code style="background:#e0f2fe;padding:2px 6px;border-radius:4px;font-size:13px">address.city</code>. Need to encode data for URLs? Try our <a href='/tools/url-encoder' style='color:#0D9488'>URL Encoder</a>.` }} />
      </div>
    </section>
  );
}
