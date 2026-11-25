"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Sitemap Generator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Add your website URLs one at a time, or switch to bulk mode and paste them all at once — one URL per line. For each URL, set its priority (1.0 = most important, 0.0 = least), change frequency (how often the page typically updates), and last modified date. The tool generates a valid XML sitemap file that you can download and upload to your web server root or submit to Google Search Console.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why XML Sitemaps Matter for SEO</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>An XML sitemap tells search engines which pages on your site exist, how important they are, and when they were last updated. While Google can discover pages through links, a sitemap ensures that new, orphaned, or deep pages are found and crawled. For sites with hundreds or thousands of pages, a sitemap is essential for proper indexing. Google Search Console, Bing Webmaster Tools, and other search engines all support sitemap.xml submissions.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Creating sitemaps for new websites before submitting to Google Search Console</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Generating sitemaps for static sites that do not build one automatically</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Maintaining sitemaps for small business websites and portfolio sites</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Testing sitemap structure before implementing dynamic generation in code</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Quickly generating sitemaps for landing pages and marketing campaigns</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Pair your sitemap with a <a href='/tools/robots-txt-generator' style='color:#0D9488'>robots.txt file</a> that points to it, and optimize your page metadata with our <a href='/tools/meta-tag-generator' style='color:#0D9488'>Meta Tag Generator</a> for maximum SEO impact.` }} />
      </div>
    </section>
  );
}
