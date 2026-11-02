import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meta Tag Generator for SEO in 2026 | ToolCraftKit",
  description:
    "Generate perfect SEO meta tags, Open Graph tags, and Twitter Cards in seconds. Free meta tag generator with live preview — boost your click-through rate today.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    ul: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14, paddingLeft: 24 } as const,
    code: { background: "#F5F5F4", padding: "2px 6px", borderRadius: 4, fontSize: 13, fontFamily: "monospace", color: "#292524" } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link
          href="/blog"
          style={{
            fontSize: 13,
            color: "#0D9488",
            textDecoration: "none",
            marginBottom: 16,
            display: "block",
          }}
        >
          ← Back to Blog
        </Link>

        <h1 style={s.h1}>
          The SEO Meta Tags Checklist Every Page Needs in 2026
        </h1>
        <p style={s.meta}>November 1, 2026 · 8 min read</p>

        <p style={s.p}>
          You can write the most insightful article on the internet, but if your
          meta tags are wrong — or missing entirely — nobody will click on it.
          Meta tags are the first thing search engines read and the first thing
          users see in search results. A reliable{" "}
          <strong>meta tag generator</strong> takes the guesswork out of the
          process, but understanding what each tag does is what separates pages
          that rank from pages that rot on page five.
        </p>

        <h2 style={s.h2}>Why SEO Meta Tags Still Matter in 2026</h2>
        <p style={s.p}>
          Every few years someone declares meta tags "dead." They're wrong.
          Google confirmed — again — that the{" "}
          <span style={s.code}>&lt;title&gt;</span> tag and{" "}
          <span style={s.code}>meta description</span> directly influence
          click-through rates. And click-through rate is a ranking signal. When
          your <strong>SEO meta tags</strong> are sharp, you get more clicks from
          the same position in search results. More clicks, more traffic, more
          revenue — from tags that take 30 seconds to write well.
        </p>
        <p style={s.p}>
          Beyond Google, meta tags power how your pages appear on social media,
          in messaging apps, in Slack previews, in AI-generated answers, and in
          link aggregators. Skip them, and every platform that shares your link
          will display a broken, ugly preview card. That's a branding problem as
          much as an SEO problem.
        </p>

        <h2 style={s.h2}>
          The Complete Meta Tags Checklist for Every Page
        </h2>
        <p style={s.p}>
          Here's every meta tag your pages should have, in order of impact:
        </p>
        <p style={s.p}>
          <strong>1. Title tag</strong> — The single most important on-page SEO
          element. Keep it under 60 characters, front-load your primary keyword,
          and make it compelling enough to click. "Best Running Shoes 2026 —
          Expert Tested" beats "Running Shoes | OurStore.com" every time.
        </p>
        <p style={s.p}>
          <strong>2. Meta description</strong> — Your 150–160 character sales
          pitch. It doesn't directly affect rankings, but it massively affects
          CTR. Include your keyword naturally and end with a subtle call to
          action.
        </p>
        <p style={s.p}>
          <strong>3. Canonical URL</strong> — Tells search engines which version
          of a page is the "official" one. Essential if your content is
          accessible at multiple URLs (with and without trailing slashes, query
          parameters, etc.).
        </p>
        <p style={s.p}>
          <strong>4. Robots meta</strong> — Controls whether search engines
          index the page and follow its links. Default is{" "}
          <span style={s.code}>index, follow</span> — only change it for pages
          you genuinely want hidden (admin panels, thank-you pages, staging
          URLs).
        </p>
        <p style={s.p}>
          <strong>5. Viewport meta</strong> — Required for mobile-friendly
          rendering. Without{" "}
          <span style={s.code}>
            width=device-width, initial-scale=1
          </span>
          , your page fails Google's mobile usability test.
        </p>

        <h2 style={s.h2}>
          Open Graph Tags Generator — Control Your Social Previews
        </h2>
        <p style={s.p}>
          Open Graph (OG) tags were created by Facebook but are now used by
          LinkedIn, Pinterest, Discord, Slack, iMessage, and dozens of other
          platforms. When someone shares your URL, these tags determine the
          image, title, and description that appear in the preview card. Without
          them, platforms either guess (badly) or show nothing.
        </p>
        <p style={s.p}>
          An <strong>Open Graph tags generator</strong> should produce at minimum
          these four tags:
        </p>
        <ul style={s.ul}>
          <li>
            <span style={s.code}>og:title</span> — Can differ from your SEO
            title. Optimize it for social engagement, not search ranking.
          </li>
          <li>
            <span style={s.code}>og:description</span> — A conversational
            summary that makes people want to click in a social feed.
          </li>
          <li>
            <span style={s.code}>og:image</span> — Use a 1200x630px image.
            This is non-negotiable — a missing OG image cuts social
            click-throughs in half.
          </li>
          <li>
            <span style={s.code}>og:url</span> — The canonical URL of the
            page. Prevents duplicate share counts across URL variations.
          </li>
        </ul>
        <p style={s.p}>
          Pro tip: test your OG tags before publishing. Paste your URL into
          Facebook's Sharing Debugger or LinkedIn's Post Inspector. If the
          preview looks wrong, clear the cache and re-scrape. Our{" "}
          <Link href="/tools/open-graph-preview" style={{ color: "#0D9488" }}>
            Open Graph Preview Tool
          </Link>{" "}
          lets you check this without leaving ToolCraftKit.
        </p>

        <h2 style={s.h2}>
          Twitter Card Meta Tags — Maximize Engagement on X
        </h2>
        <p style={s.p}>
          <strong>Twitter card meta tags</strong> (still called that despite the
          rebrand to X) control how your links appear in tweets. There are two
          card types worth using: <span style={s.code}>summary</span> for
          standard posts and{" "}
          <span style={s.code}>summary_large_image</span> for visual content
          where the image is the hook.
        </p>
        <p style={s.p}>
          The key tags:{" "}
          <span style={s.code}>twitter:card</span>,{" "}
          <span style={s.code}>twitter:title</span>,{" "}
          <span style={s.code}>twitter:description</span>, and{" "}
          <span style={s.code}>twitter:image</span>. If you've already set
          Open Graph tags, Twitter will fall back to those — but dedicated
          Twitter cards let you customize the messaging for that specific
          audience. Your LinkedIn audience and your X audience react to different
          hooks. Use that.
        </p>

        <h2 style={s.h2}>
          Structured Data and Meta Tags — Working Together
        </h2>
        <p style={s.p}>
          Meta tags and structured data (JSON-LD) serve different purposes but
          complement each other. Meta tags control how your page appears in
          standard search results and social previews. Structured data earns you
          rich snippets — star ratings, FAQ dropdowns, recipe cards, event dates.
        </p>
        <p style={s.p}>
          For example, a product page should have optimized meta tags for search
          and social, plus Product schema markup for price, availability, and
          reviews. Our{" "}
          <Link href="/tools/json-ld-generator" style={{ color: "#0D9488" }}>
            JSON-LD Schema Generator
          </Link>{" "}
          handles the structured data side, while the meta tag generator covers
          the rest.
        </p>

        <h2 style={s.h2}>
          How to Generate Perfect Meta Tags in Seconds
        </h2>
        <p style={s.p}>
          The ToolCraftKit{" "}
          <Link href="/tools/meta-tag-generator" style={{ color: "#0D9488" }}>
            Meta Tag Generator
          </Link>{" "}
          produces every tag listed above in one step. Enter your page title,
          description, URL, and image — then toggle which tag groups you need
          (Basic SEO, Open Graph, Twitter Cards, or all three). The generator
          outputs clean, copy-ready HTML with a live preview showing exactly how
          your page will appear in Google search results, Facebook shares, and
          Twitter posts.
        </p>
        <p style={s.p}>
          No character-count guessing. No forgotten tags. No broken social
          previews. Just fill in four fields and copy the output into your{" "}
          <span style={s.code}>&lt;head&gt;</span>. If you're using Next.js,
          Astro, or any framework with a metadata API, the generator also
          exports a framework-ready format you can paste directly into your
          layout file.
        </p>

        <h2 style={s.h2}>Stop Losing Clicks to Bad Meta Tags</h2>
        <p style={s.p}>
          Every page you publish without proper meta tags is a page working
          against itself. The content might be outstanding, but searchers and
          social users judge your link by its preview — and that preview is
          controlled entirely by your meta tags. Get them right once, and every
          share, every search impression, and every link preview works harder for
          you. The generator takes 30 seconds. The impact lasts as long as the
          page does.
        </p>

        <Link href="/tools/meta-tag-generator" style={s.cta}>
          Generate Your Meta Tags Free →
        </Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}>
        <Footer />
      </div>
    </>
  );
}
