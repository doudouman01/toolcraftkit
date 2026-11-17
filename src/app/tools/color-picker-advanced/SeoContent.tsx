"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 0 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Advanced Color Picker</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Use the Hue, Saturation, and Lightness sliders to pick any color. All four color formats (HEX, RGB, HSL, CMYK) update in real time. Click any value to copy it to your clipboard. Save colors to your history for quick reference.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Color Formats Explained</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}><strong>HEX</strong> &mdash; Hexadecimal color used in CSS and web design (#0D9488)</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}><strong>RGB</strong> &mdash; Red, Green, Blue values (0-255) used in screens and CSS</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}><strong>HSL</strong> &mdash; Hue, Saturation, Lightness model for intuitive color selection</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}><strong>CMYK</strong> &mdash; Cyan, Magenta, Yellow, Key (Black) used in print design</li>
      </ul>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Gradient Generator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>The gradient generator creates a CSS linear gradient between your picked color and a second color. Click the CSS code to copy it and paste it directly into your stylesheet.</p>
    </section>
  );
}
