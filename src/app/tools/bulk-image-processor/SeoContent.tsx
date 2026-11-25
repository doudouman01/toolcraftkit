"use client";
export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Bulk Image Processor</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Drag and drop up to 20 images or click to browse. Set your desired width, height, output format, and quality level. Click Process to batch-process all images at once. Download individual results or all images together. All processing happens in your browser — your images are never uploaded to any server.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Batch Processing Saves Time</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Resizing or compressing images one at a time is tedious and slow. Product photographers, e-commerce managers, social media marketers, and web developers often need to process dozens of images for a single project. The Bulk Image Processor lets you apply the same settings to all images at once, cutting what used to take an hour down to seconds.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>E-commerce: resize all product photos to consistent dimensions</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Web development: compress images for faster page load times</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Social media: convert and resize images for platform requirements</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Photography: batch-convert RAW exports to web-ready formats</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `For single images that need more control, use our <a href='/tools/image-compressor' style='color:#0D9488'>Image Compressor</a> with before/after comparison or our <a href='/tools/image-resizer' style='color:#0D9488'>Image Resizer</a> with preset dimensions.` }} />
      </div>
    </section>
  );
}
