"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Robots.txt Generator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Enter your sitemap URL, choose your default crawl policy, and add any paths you want to block. Enable the AI bot blocker to prevent AI training crawlers from scraping your content. Click Generate and download the file. Upload it to the root of your website (e.g., example.com/robots.txt).</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Every Website Needs a robots.txt</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>The robots.txt file tells search engines which parts of your site they can and cannot crawl. Without one, bots may index pages you don&apos;t want public — admin panels, staging pages, duplicate content, or API endpoints. A properly configured robots.txt also helps search engines prioritize your most important content, improving your SEO performance. With the rise of AI crawlers that scrape websites for model training, blocking unwanted bots has become a critical consideration for content creators and businesses.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Blocking admin, login, and staging pages from search engine indexing</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Preventing AI bots (GPTBot, CCBot, ClaudeBot) from scraping your content for training</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Pointing search engines to your sitemap for faster, more efficient crawling</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Setting crawl delays to reduce server load from aggressive bots</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Blocking image directories from appearing in Google Images when not desired</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Combine your robots.txt with optimized <a href='/tools/meta-tag-generator' style='color:#0D9488'>Meta Tags</a> and structured data from our <a href='/tools/json-ld-generator' style='color:#0D9488'>JSON-LD Generator</a> for a complete technical SEO foundation.` }} />
      </div>
    </section>
  );
}
