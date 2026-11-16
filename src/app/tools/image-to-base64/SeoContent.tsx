"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use Image to Base64</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Upload an image by clicking the drop zone or dragging a file onto it. The tool instantly converts your image to a Base64 encoded string. Copy the raw Base64 or the full data URI (which includes the MIME type prefix) with one click. The size comparison shows the original file size versus the Base64 output size.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>When to Use Base64 Images</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Embedding small images directly in HTML or CSS to reduce HTTP requests</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Including images in JSON payloads or API requests</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Embedding images in email templates</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Storing small icons or avatars in databases</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Note</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }}>Base64 encoding increases the data size by approximately 33%. It is best used for small images (icons, thumbnails). For larger images, hosting the file and linking to it is more efficient.</p>
      </div>
    </section>
  );
}
