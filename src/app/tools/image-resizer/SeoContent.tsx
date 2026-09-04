"use client";
export default function SeoContent() {
  const h2 = { fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" } as React.CSSProperties;
  const p = { fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" } as React.CSSProperties;
  const ul = { paddingLeft: "20px", marginBottom: "16px" } as React.CSSProperties;
  const li = { fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" } as React.CSSProperties;
  const tip = { background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px" } as React.CSSProperties;
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={h2}>How to Resize Images Online</h2>
      <p style={p}>Upload your image and set the new dimensions manually or choose from social media presets. The aspect ratio lock ensures your image does not get distorted — when you change the width, the height adjusts proportionally and vice versa. Unlock the aspect ratio for custom cropping dimensions.</p>
      <h2 style={h2}>Social Media Image Sizes</h2>
      <p style={p}>Every platform has optimal image dimensions. Instagram posts perform best at 1080×1080 pixels, while Stories need 1080×1920. Facebook cover photos require 820×312, and YouTube thumbnails are 1280×720. Using the wrong dimensions means your images get cropped or stretched, reducing engagement and looking unprofessional.</p>
      <p style={p}>This resizer includes presets for all major platforms, so you get pixel-perfect dimensions in one click without memorizing specs.</p>
      <h2 style={h2}>Common Use Cases</h2>
      <ul style={ul}>
        <li style={li}>Social media managers resizing content for Instagram, Facebook, Twitter, and LinkedIn</li>
        <li style={li}>Web developers preparing images at exact pixel dimensions for responsive layouts</li>
        <li style={li}>Online sellers resizing product photos to marketplace specifications</li>
        <li style={li}>Designers creating assets at specific dimensions for presentations and documents</li>
        <li style={li}>Job seekers resizing headshots for LinkedIn and professional profiles</li>
      </ul>
      <div style={tip}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }}>After resizing, reduce file size further with our <a href="/tools/image-compressor" style={{ color: "#0D9488" }}>Image Compressor</a>.</p>
      </div>
    </section>
  );
}
