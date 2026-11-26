import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free XML Sitemap Generator: Create a Sitemap for Google in Minutes | ToolCraftKit",
  description:
    "Generate a valid XML sitemap for your website in minutes. Set priority, changefreq, lastmod for each URL. Free, downloadable, Google-ready.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    ul: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14, paddingLeft: 24 } as const,
    code: { background: "#f5f5f4", padding: "2px 6px", borderRadius: 4, fontSize: 14, fontFamily: "monospace" } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>
          ← Back to Blog
        </Link>

        <h1 style={s.h1}>Free XML Sitemap Generator: Create a Sitemap for Google in Minutes</h1>
        <p style={s.meta}>November 25, 2026 · 8 min read</p>

        <p style={s.p}>
          You have published 50 pages on your website, submitted the domain to Google Search Console, and waited. Weeks
          later, only 12 pages are indexed. The others sit in a gray limbo labeled &quot;Discovered — currently not
          indexed.&quot; The fix is often embarrassingly simple: you need a <strong>sitemap</strong>. An XML sitemap is a
          file that tells search engines exactly which pages exist on your site, how important each one is, and when it
          was last updated. Without it, Googlebot has to discover your pages by crawling links — and if your internal
          linking has gaps, entire sections of your site can remain invisible.
        </p>

        <h2 style={s.h2}>What an XML Sitemap Actually Does</h2>
        <p style={s.p}>
          An XML sitemap is a structured file — usually hosted at <span style={s.code}>/sitemap.xml</span> — that lists
          every URL you want search engines to know about. It is not a ranking factor in itself; Google has been clear
          about that. But it is a <em>discovery</em> factor. If Googlebot cannot find a page through links, the sitemap
          is the safety net that ensures it gets crawled.
        </p>
        <p style={s.p}>
          Think of it this way: your internal links are the main roads on a map. The sitemap is the complete index of
          every street, alley, and cul-de-sac. Google does not need both, but having both means nothing gets missed.
        </p>

        <h2 style={s.h2}>Priority, Changefreq, and Lastmod Explained</h2>
        <p style={s.p}>
          Every URL in a sitemap can include three optional attributes. Here is what each one actually means and how
          search engines use them:
        </p>
        <ul style={s.ul}>
          <li>
            <strong>priority (0.0 to 1.0):</strong> Tells search engines how important this page is <em>relative to
            other pages on your site</em>. Your homepage might be 1.0, product pages 0.8, blog posts 0.6, and legal
            pages 0.3. Google has stated it largely ignores this field, but Bing and other engines may still use it as a
            crawl hint. Setting everything to 1.0 is the same as setting nothing — the signal only works when there is
            differentiation.
          </li>
          <li>
            <strong>changefreq:</strong> How often the page content changes — <span style={s.code}>always</span>,{" "}
            <span style={s.code}>hourly</span>, <span style={s.code}>daily</span>,{" "}
            <span style={s.code}>weekly</span>, <span style={s.code}>monthly</span>,{" "}
            <span style={s.code}>yearly</span>, or <span style={s.code}>never</span>. This is a hint, not a directive.
            Google may still crawl a &quot;yearly&quot; page daily if it detects frequent changes. Set it honestly:
            your blog index is probably &quot;daily,&quot; your about page is &quot;monthly,&quot; and your privacy
            policy is &quot;yearly.&quot;
          </li>
          <li>
            <strong>lastmod:</strong> The date the page was last meaningfully updated, in ISO 8601 format (
            <span style={s.code}>2026-11-25</span>). This is the most useful signal of the three. When Google sees a
            recent <span style={s.code}>lastmod</span> date, it is more likely to re-crawl the page quickly. But do not
            fake it — setting every page&apos;s lastmod to today&apos;s date every time you deploy trains Google to
            ignore the signal entirely.
          </li>
        </ul>

        <h2 style={s.h2}>Which Pages to Include (and Which to Exclude)</h2>
        <p style={s.p}>
          A common mistake is dumping every URL into the sitemap, including utility pages, paginated archives, and
          parameter variations. That dilutes the signal. Here is a practical rule:
        </p>
        <ul style={s.ul}>
          <li><strong>Include:</strong> Pages you want to rank in search — homepage, product pages, blog posts, service pages, landing pages, category pages.</li>
          <li><strong>Exclude:</strong> Pages blocked by <span style={s.code}>robots.txt</span> or <span style={s.code}>noindex</span> tags, login/admin pages, search result pages, 404 handlers, duplicate content, and URL parameters like <span style={s.code}>?sort=price</span>.</li>
        </ul>
        <p style={s.p}>
          If a URL returns anything other than a 200 status code, it should not be in the sitemap. Submitting 404s or
          redirects signals poor site maintenance and can slow down Googlebot&apos;s crawl of your important pages.
        </p>

        <h2 style={s.h2}>How to Create a Sitemap in 3 Steps</h2>
        <p style={s.p}>
          <strong>Step 1:</strong> Open the{" "}
          <Link href="/tools/sitemap-generator" style={{ color: "#0D9488" }}>Sitemap Generator</Link> on ToolCraftKit.
          No account needed.
        </p>
        <p style={s.p}>
          <strong>Step 2:</strong> Add your URLs one by one or paste them in bulk (one per line). For each URL, set the
          priority, change frequency, and last modified date. If you are unsure, the defaults work for most sites.
        </p>
        <p style={s.p}>
          <strong>Step 3:</strong> Click generate. Download the file as <span style={s.code}>sitemap.xml</span> and
          upload it to the root of your website. Then submit the URL in Google Search Console under Sitemaps.
        </p>

        <h2 style={s.h2}>Dynamic vs. Static Sitemaps</h2>
        <p style={s.p}>
          A static sitemap is a file you generate once and upload manually. It works for small sites with pages that
          rarely change. But if you publish blog posts regularly, add products, or update content frequently, a static
          sitemap goes stale quickly.
        </p>
        <p style={s.p}>
          A dynamic sitemap is generated automatically by your CMS or framework — WordPress plugins like Yoast do this,
          and frameworks like Next.js have built-in <span style={s.code}>sitemap.ts</span> support. The sitemap rebuilds
          on every deploy or on every request, ensuring it always reflects the current state of your site.
        </p>
        <p style={s.p}>
          For sites between static and dynamic — 20 to 200 pages with occasional updates — generating a sitemap with a
          tool and re-uploading it monthly is a reasonable middle ground.
        </p>

        <h2 style={s.h2}>Submitting Your Sitemap to Search Engines</h2>
        <p style={s.p}>
          Google Search Console is the primary destination. Navigate to Sitemaps in the left sidebar, enter the full URL
          of your sitemap (e.g., <span style={s.code}>https://yoursite.com/sitemap.xml</span>), and click Submit. Google
          will report the number of URLs discovered, how many are indexed, and any errors it encountered.
        </p>
        <p style={s.p}>
          Bing Webmaster Tools has a similar workflow. You can also add your sitemap URL to your{" "}
          <Link href="/tools/robots-txt-generator" style={{ color: "#0D9488" }}>robots.txt</Link> file with a{" "}
          <span style={s.code}>Sitemap: https://yoursite.com/sitemap.xml</span> directive, which lets any compliant
          crawler discover it automatically.
        </p>

        <h2 style={s.h2}>Pair It With Other SEO Tools</h2>
        <p style={s.p}>
          A sitemap works best alongside other SEO fundamentals. Use the{" "}
          <Link href="/tools/robots-txt-generator" style={{ color: "#0D9488" }}>Robots.txt Generator</Link> to control
          which paths search engines can crawl, the{" "}
          <Link href="/tools/meta-tag-generator" style={{ color: "#0D9488" }}>Meta Tag Generator</Link> to craft
          title and description tags, and the{" "}
          <Link href="/tools/json-ld-generator" style={{ color: "#0D9488" }}>JSON-LD Generator</Link> for structured
          data markup. For AI-powered SEO tools and strategies, visit{" "}
          <a href="https://aigradelab.com/en/blog/best-ai-tools-seo-2026" style={{ color: "#0D9488" }} target="_blank" rel="noopener">AIGradeLab&apos;s Best AI Tools for SEO</a>.
        </p>

        <Link href="/tools/sitemap-generator" style={s.cta}>
          Generate Your Sitemap Now — Free →
        </Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}>
        <Footer />
      </div>
    </>
  );
}
