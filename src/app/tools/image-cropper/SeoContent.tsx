"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Crop an Image Online</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Upload your image by dragging it onto the drop zone or clicking to browse. Once loaded, drag the crop rectangle to select the area you want to keep. Use the corner and edge handles to resize the selection. Choose a preset aspect ratio like 1:1 for Instagram, 16:9 for YouTube thumbnails, or 9:16 for Stories — or crop freeform. Click &quot;Crop Image&quot; and download your result as PNG or JPEG.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Supported Aspect Ratios</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}><strong>Free</strong> — No constraint, crop to any shape</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}><strong>1:1 (Square)</strong> — Perfect for profile pictures and Instagram posts</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}><strong>16:9</strong> — YouTube thumbnails, presentations, and widescreen displays</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}><strong>4:3</strong> — Standard photo prints and classic display format</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}><strong>9:16 (Story)</strong> — Instagram Stories, TikTok, and Reels</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}><strong>3:2</strong> — DSLR photos and standard print sizes (6x4, 12x8)</li>
      </ul>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Cropping product photos for online stores</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Preparing social media images with the right dimensions</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Trimming screenshots for documentation or presentations</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Creating profile pictures from larger photos</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Removing unwanted background or edges from images</li>
      </ul>

      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Privacy First</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }}>Your images never leave your device. All cropping is done locally in your browser using the Canvas API. No uploads, no server processing, no data collection.</p>
      </div>
    </section>
  );
}
