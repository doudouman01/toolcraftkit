"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Meta Tag Generator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Start by entering your page title and meta description in the Basic Meta Tags section. The character counters will guide you toward the recommended lengths — green means you are within the ideal range, red means you have exceeded it. Fill in your keywords, author name, and canonical URL as needed.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Next, customize the Open Graph fields to control how your page appears when shared on Facebook, LinkedIn, and other social platforms. If you leave OG Title or OG Description empty, they will automatically fall back to your page title and meta description.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Configure the Twitter Card section to set how your page looks when shared on X (Twitter). Choose between a compact summary card or a large image card depending on your content. The live preview updates in real time so you can see exactly how your page will appear in Google search results and on social media before copying the code.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Meta Tags Are Essential for SEO</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Meta tags serve as the first impression of your website in search engine results pages (SERPs). A well-written title tag can increase your click-through rate by 20-30%, directly impacting your organic traffic. Google uses the meta description as the snippet displayed under your title, making it your primary opportunity to convince searchers to click.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Social media meta tags (Open Graph and Twitter Cards) are equally important. When someone shares your URL on Facebook, LinkedIn, or X, these tags determine the image, title, and description that appear in the shared post. Pages without proper social meta tags often display broken previews, reducing engagement and shares.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Best Practices for Meta Tags</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Keep title tags between 50-60 characters and place primary keywords near the beginning</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Write meta descriptions of 150-160 characters with a clear call-to-action</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Use unique title and description tags for every page on your site</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Set a canonical URL to prevent duplicate content issues</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Use Open Graph images sized at 1200x630 pixels for optimal display</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Always test your meta tags with the live preview before deploying</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Include your brand name in the title tag, typically after a separator</li>
      </ul>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Web developers generating meta tags for new website pages and landing pages</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>SEO specialists optimizing existing pages for better search visibility</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Content marketers preparing blog posts with proper social sharing metadata</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>E-commerce managers setting up product page meta tags at scale</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Freelancers delivering SEO-ready HTML to clients</li>
      </ul>

      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `After generating your meta tags, validate them with Google's Rich Results Test and Facebook's Sharing Debugger. Pair this tool with our <a href='/tools/json-formatter' style='color:#0D9488'>JSON Formatter</a> for structured data or <a href='/tools/url-encoder' style='color:#0D9488'>URL Encoder</a> when building canonical URLs with query parameters.` }} />
      </div>
    </section>
  );
}
