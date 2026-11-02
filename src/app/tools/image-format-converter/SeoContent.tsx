"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Convert Image Formats</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Upload any image in PNG, JPG, WebP, BMP, GIF, SVG, AVIF, or TIFF format. Select your desired output format, adjust quality settings if needed, and click Convert. Your converted image is ready to download instantly — all processing happens in your browser, so your images never leave your device.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Choosing the Right Image Format</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}><strong>PNG</strong> is ideal for graphics with transparency, logos, screenshots, and images that need lossless quality. File sizes are larger but every pixel is preserved exactly.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}><strong>JPEG</strong> is best for photographs and complex images where small file size matters more than pixel-perfect accuracy. Adjusting the quality slider lets you balance size versus visual fidelity.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}><strong>WebP</strong> offers superior compression for both lossy and lossless images. It produces smaller files than JPEG and PNG at equivalent quality, making it the preferred format for web performance.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}><strong>BMP</strong> is an uncompressed format useful for Windows applications and when you need raw pixel data without any compression artifacts.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}><strong>GIF</strong> supports animation and transparency with a limited 256-color palette. Best for simple graphics, icons, and short animations.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Converting screenshots (PNG) to JPEG for smaller email attachments</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Converting photos to WebP for faster website loading</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Converting WebP images to PNG or JPEG for compatibility with older software</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Converting SVG vector graphics to rasterized PNG for social media uploads</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Converting BMP files to compressed formats to save disk space</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Preparing images in the right format for Amazon KDP book covers and interiors</li>
      </ul>

      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `For web publishing, WebP at quality 80-85 gives the best balance of file size and visual quality. Need to resize your images too? Try our <a href='/tools/image-resizer' style='color:#0D9488'>Image Resizer</a>.` }} />
      </div>
    </section>
  );
}
