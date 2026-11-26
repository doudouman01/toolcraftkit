import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robots.txt Generator: Create the Perfect Robots.txt for SEO in 2026 | ToolCraftKit",
  description:
    "Generate a robots.txt file that helps search engines crawl your site correctly. Free tool with presets, custom rules, and sitemap integration.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    ul: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14, paddingLeft: 24 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>
          ← Back to Blog
        </Link>

        <h1 style={s.h1}>Robots.txt Generator: Create the Perfect Robots.txt for SEO in 2026</h1>
        <p style={s.meta}>November 25, 2026 · 8 min read</p>

        <p style={s.p}>
          Your <strong>robots.txt</strong> file is a 50-line text file that sits at the root of your website. It is also one of the most consequential files for your search engine performance. A correct robots.txt tells Google, Bing, and other crawlers exactly which pages to index and which to skip. A broken one can delist your entire site from search results. Despite its importance, most site owners either copy one from a tutorial without understanding it, or skip it entirely and hope for the best.
        </p>
        <p style={s.p}>
          A <strong>robots.txt generator</strong> removes the guesswork. You answer a few questions about how you want search engines to crawl your site, and the tool produces a correctly formatted file you can upload immediately.
        </p>

        <h2 style={s.h2}>What Robots.txt Actually Does</h2>
        <p style={s.p}>
          Robots.txt is a plain text file that follows the Robots Exclusion Protocol. When a search engine crawler (like Googlebot) arrives at your site, the first thing it checks is <code>yoursite.com/robots.txt</code>. The file contains directives that tell the crawler:
        </p>
        <ul style={s.ul}>
          <li><strong>User-agent:</strong> Which crawler the rule applies to (Googlebot, Bingbot, or * for all).</li>
          <li><strong>Disallow:</strong> Paths the crawler should not visit (e.g., /admin/, /api/, /private/).</li>
          <li><strong>Allow:</strong> Exceptions to disallow rules (e.g., allow /api/public/ even though /api/ is blocked).</li>
          <li><strong>Sitemap:</strong> The URL of your XML sitemap, so crawlers can discover all your pages efficiently.</li>
          <li><strong>Crawl-delay:</strong> How many seconds between requests (useful for small servers that cannot handle aggressive crawling).</li>
        </ul>
        <p style={s.p}>
          Important caveat: robots.txt is a <em>suggestion</em>, not a security mechanism. Well-behaved crawlers (Google, Bing) respect it. Malicious bots and scrapers ignore it completely. Never rely on robots.txt to protect sensitive content — use authentication or server-side access controls for that.
        </p>

        <h2 style={s.h2}>The 5 Robots.txt Mistakes That Kill Your SEO</h2>
        <p style={s.p}>
          These errors show up repeatedly, often on sites that have been live for years without anyone noticing:
        </p>
        <ul style={s.ul}>
          <li><strong>Blocking CSS and JavaScript.</strong> This was common advice in the 2010s. It is catastrophic today. Google renders your pages to understand them. If Googlebot cannot load your CSS or JS, it sees a broken page and ranks it accordingly. Never block your static assets.</li>
          <li><strong>Blocking the entire site accidentally.</strong> A single line — <code>Disallow: /</code> — tells every crawler to index nothing. This sometimes gets deployed to production by mistake from a staging environment. The result: your site disappears from Google within days.</li>
          <li><strong>No sitemap reference.</strong> Without a Sitemap directive, crawlers have to discover your pages by following links. Adding your sitemap URL to robots.txt ensures crawlers find every page, even orphaned ones with no internal links.</li>
          <li><strong>Blocking query parameters.</strong> Some sites block URLs with query strings (like search results or filter pages) to avoid duplicate content. But overly aggressive rules can block paginated content, filtered product pages, or UTM-tagged URLs that Google needs to process.</li>
          <li><strong>Using robots.txt to hide pages from search.</strong> If you do not want a page indexed, use a noindex meta tag, not robots.txt. Disallow prevents crawling, but if another site links to that page, Google may still index the URL — it just cannot see the content to give it a proper title or description.</li>
        </ul>

        <h2 style={s.h2}>Robots.txt for Common Platforms</h2>
        <p style={s.p}>
          Different site types need different configurations:
        </p>
        <p style={s.p}>
          <strong>WordPress:</strong> Block /wp-admin/ but allow /wp-admin/admin-ajax.php (needed for some plugins). Block /wp-includes/ unless your theme references assets there. Include your sitemap URL.
        </p>
        <p style={s.p}>
          <strong>Next.js / Vercel:</strong> Block /_next/data/ if you do not want API route responses indexed. Allow everything else. Your sitemap is typically at /sitemap.xml.
        </p>
        <p style={s.p}>
          <strong>eCommerce (Shopify, WooCommerce):</strong> Block /cart/, /checkout/, and /account/ pages. Block search result URLs to prevent duplicate content. Allow product and category pages.
        </p>
        <p style={s.p}>
          <strong>SaaS applications:</strong> Block /app/, /dashboard/, /settings/, and other authenticated routes. Allow marketing pages, blog, and documentation.
        </p>

        <h2 style={s.h2}>How to Generate a Robots.txt in 30 Seconds</h2>
        <p style={s.p}>
          <strong>Step 1:</strong> Open the{" "}
          <Link href="/tools/robots-txt-generator" style={{ color: "#0D9488" }}>
            Robots.txt Generator
          </Link>
          . No account needed.
        </p>
        <p style={s.p}>
          <strong>Step 2:</strong> Enter your sitemap URL (e.g., https://yoursite.com/sitemap.xml).
        </p>
        <p style={s.p}>
          <strong>Step 3:</strong> Choose your default crawl policy — allow all, block all, or custom.
        </p>
        <p style={s.p}>
          <strong>Step 4:</strong> Add specific paths to block (one per line), set user-agent targets if needed, and optionally add a crawl delay.
        </p>
        <p style={s.p}>
          <strong>Step 5:</strong> Click Generate. Copy the output and save it as <code>robots.txt</code> at the root of your website.
        </p>

        <h2 style={s.h2}>Testing Your Robots.txt</h2>
        <p style={s.p}>
          After deploying your robots.txt, test it immediately:
        </p>
        <ul style={s.ul}>
          <li><strong>Google Search Console:</strong> Use the URL Inspection tool to verify that Googlebot can access your important pages.</li>
          <li><strong>Direct check:</strong> Visit yoursite.com/robots.txt in a browser to confirm the file is accessible and correctly formatted.</li>
          <li><strong>Wait and monitor:</strong> Check Search Console coverage reports over the next few days. If indexed pages drop unexpectedly, your robots.txt may be blocking something it should not.</li>
        </ul>

        <h2 style={s.h2}>Pair With Other SEO Tools</h2>
        <p style={s.p}>
          Robots.txt is one part of your SEO infrastructure. ToolCraftKit also offers a{" "}
          <Link href="/tools/sitemap-generator" style={{ color: "#0D9488" }}>Sitemap Generator</Link>
          {" "}for creating XML sitemaps, a{" "}
          <Link href="/tools/meta-tag-generator" style={{ color: "#0D9488" }}>Meta Tag Generator</Link>
          {" "}for page-level SEO, and a{" "}
          <Link href="/tools/json-ld-generator" style={{ color: "#0D9488" }}>JSON-LD Generator</Link>
          {" "}for structured data markup — all free and browser-based.
        </p>
        <p style={s.p}>
          For AI tools that can help with SEO analysis and content strategy, visit{" "}
          <a href="https://aigradelab.com" style={{ color: "#0D9488" }}>AIGradeLab.com</a>
          {" "}for expert reviews and grades on 90+ AI platforms.
        </p>

        <h2 style={s.h2}>Final Thoughts</h2>
        <p style={s.p}>
          Robots.txt is one of the simplest files on your website and one of the easiest to get wrong. A misconfigured robots.txt can undo months of SEO work in a single deploy. A well-configured one ensures that search engines see exactly what you want them to see — no more, no less. Take the 30 seconds to generate one correctly. Your search rankings will thank you.
        </p>

        <Link href="/tools/robots-txt-generator" style={s.cta}>
          Generate Your Robots.txt Free →
        </Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}>
        <Footer />
      </div>
    </>
  );
}
