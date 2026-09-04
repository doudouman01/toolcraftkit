"use client";
export default function SeoContent() {
  const h2 = { fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" } as React.CSSProperties;
  const p = { fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" } as React.CSSProperties;
  const ul = { paddingLeft: "20px", marginBottom: "16px" } as React.CSSProperties;
  const li = { fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" } as React.CSSProperties;
  const tip = { background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px" } as React.CSSProperties;
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={h2}>How to Compress Images Online</h2>
      <p style={p}>Upload any JPEG, PNG, or WebP image and adjust the quality slider. Lower quality means smaller file size. The compressor uses your browser&apos;s built-in Canvas API — your images never leave your device, ensuring complete privacy.</p>
      <p style={p}>The before-and-after preview lets you visually compare quality at different compression levels. Most images can be compressed 50-80% without visible quality loss, especially photographs where minor detail reduction is imperceptible.</p>
      <h2 style={h2}>Why Image Compression Matters</h2>
      <p style={p}>Page load speed directly impacts user experience and SEO rankings. Google uses Core Web Vitals as a ranking factor, and large uncompressed images are the number one cause of slow pages. A 5 MB hero image that could be 200 KB costs you visitors and search rankings.</p>
      <p style={p}>Email providers limit attachment sizes (typically 25 MB for Gmail). Social media platforms re-compress uploaded images, often with poor results. Compressing before upload gives you control over quality and ensures your images look their best everywhere.</p>
      <h2 style={h2}>Common Use Cases</h2>
      <ul style={ul}>
        <li style={li}>Web developers optimizing images for faster page load speeds</li>
        <li style={li}>Bloggers reducing image sizes before uploading to WordPress or Ghost</li>
        <li style={li}>Email marketers keeping newsletter images under size limits</li>
        <li style={li}>E-commerce sellers optimizing product photos for faster store loading</li>
        <li style={li}>Social media managers preparing images for consistent quality across platforms</li>
      </ul>
      <div style={tip}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }}>Need to resize your images too? Use our <a href="/tools/image-resizer" style={{ color: "#0D9488" }}>Image Resizer</a> to set exact dimensions before compressing.</p>
      </div>
    </section>
  );
}
