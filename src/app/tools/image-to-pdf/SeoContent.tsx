"use client";
export default function SeoContent() {
  const h2 = { fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" } as React.CSSProperties;
  const p = { fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" } as React.CSSProperties;
  const ul = { paddingLeft: "20px", marginBottom: "16px" } as React.CSSProperties;
  const li = { fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" } as React.CSSProperties;
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={h2}>How to Convert Images to PDF</h2>
      <p style={p}>Upload one or more images (JPEG or PNG). The converter places each image on its own page, centered with your chosen margin. Select portrait, landscape, or auto orientation (based on each image&apos;s dimensions). Click convert and download a single PDF containing all your images.</p>
      <h2 style={h2}>Why Convert Images to PDF</h2>
      <p style={p}>PDF is the universal document format. Converting images to PDF makes them easier to share, print, and archive. A folder of 20 receipt photos becomes one organized document. Design proofs, photo collections, and scanned pages are cleaner as PDFs than as loose image files.</p>
      <p style={p}>PDFs also preserve image quality regardless of the viewer&apos;s device or operating system, unlike images that may be re-compressed or displayed at wrong dimensions by different apps.</p>
      <h2 style={h2}>Common Use Cases</h2>
      <ul style={ul}>
        <li style={li}>Converting scanned documents and receipts into PDF files</li>
        <li style={li}>Creating photo portfolios and lookbooks as PDF documents</li>
        <li style={li}>Preparing design proofs and mockups for client review</li>
        <li style={li}>Converting whiteboard photos and handwritten notes to shareable PDFs</li>
        <li style={li}>Bundling product images into catalog pages</li>
      </ul>
    </section>
  );
}
