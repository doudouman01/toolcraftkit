"use client";

const cs = {
  wrap: { maxWidth: 760, margin: "0 auto", padding: "48px 20px 32px" } as const,
  h2: { fontSize: 22, fontWeight: 700 as const, color: "#1C1917", marginBottom: 12, marginTop: 32 },
  h3: { fontSize: 17, fontWeight: 600 as const, color: "#1C1917", marginBottom: 8, marginTop: 24 },
  p: { fontSize: 15, color: "#44403C", lineHeight: 1.75, marginBottom: 12 },
  ul: { paddingLeft: 20, marginBottom: 16 },
  li: { fontSize: 15, color: "#44403C", lineHeight: 1.75, marginBottom: 6 },
};

export default function SeoContent() {
  return (
    <div style={cs.wrap}>
      <h2 style={{ ...cs.h2, marginTop: 0 }}>What Are Open Graph Tags?</h2>
      <p style={cs.p}>
        Open Graph (OG) meta tags are snippets of HTML code that control how your web pages appear when shared on social media platforms like Facebook, Twitter/X, LinkedIn, and Discord. They determine the title, description, and image that display in the link preview card.
      </p>
      <p style={cs.p}>
        Without Open Graph tags, social platforms try to guess what to show — often resulting in missing images, truncated titles, or irrelevant descriptions. By setting these tags explicitly, you control the first impression your content makes when someone shares it.
      </p>

      <h2 style={cs.h2}>Why Open Graph Tags Matter</h2>
      <p style={cs.p}>
        Links with well-configured Open Graph tags get significantly more clicks than those without. A compelling image, clear title, and concise description act as a mini advertisement for your content. Studies show that social posts with rich previews receive up to 2-3x more engagement than plain links.
      </p>

      <h3 style={cs.h3}>Essential Open Graph Tags</h3>
      <ul style={cs.ul}>
        <li style={cs.li}><strong>og:title</strong> — The title of your page as it should appear in the preview. Keep it under 60 characters for best display.</li>
        <li style={cs.li}><strong>og:description</strong> — A brief summary of the page content. Aim for 155 characters or fewer.</li>
        <li style={cs.li}><strong>og:image</strong> — The preview image URL. Use 1200 x 630 pixels for optimal display across all platforms.</li>
        <li style={cs.li}><strong>og:url</strong> — The canonical URL of the page.</li>
        <li style={cs.li}><strong>og:type</strong> — The type of content (website, article, or product).</li>
        <li style={cs.li}><strong>og:site_name</strong> — The name of your overall website or brand.</li>
      </ul>

      <h3 style={cs.h3}>Twitter Card Tags</h3>
      <p style={cs.p}>
        Twitter uses its own set of meta tags (<code>twitter:card</code>, <code>twitter:title</code>, etc.) but will fall back to Open Graph tags if Twitter-specific tags are not present. The <code>twitter:card</code> tag determines the card format: <code>summary</code> shows a small square image, while <code>summary_large_image</code> displays a wide banner image above the text.
      </p>

      <h2 style={cs.h2}>Best Practices</h2>
      <ul style={cs.ul}>
        <li style={cs.li}><strong>Always include an image.</strong> Posts with images get 2-3x more engagement. Use 1200x630 px for maximum compatibility.</li>
        <li style={cs.li}><strong>Keep titles concise.</strong> Under 60 characters ensures the full title displays without truncation.</li>
        <li style={cs.li}><strong>Write compelling descriptions.</strong> Treat them like ad copy — make people want to click.</li>
        <li style={cs.li}><strong>Test before sharing.</strong> Use platform debuggers (Facebook Sharing Debugger, Twitter Card Validator) to verify how your tags render.</li>
        <li style={cs.li}><strong>Use absolute URLs.</strong> Always provide full URLs including https:// for images and canonical links.</li>
        <li style={cs.li}><strong>Update cached previews.</strong> Platforms cache Open Graph data. After changing tags, use the platform debugger to refresh the cache.</li>
      </ul>

      <h2 style={cs.h2}>How Each Platform Uses Open Graph</h2>
      <p style={cs.p}>
        <strong>Facebook</strong> reads og:title, og:description, og:image, and og:url to build link preview cards. Images should be at least 600x315 px, but 1200x630 px is recommended.
      </p>
      <p style={cs.p}>
        <strong>Twitter/X</strong> prefers its own twitter: tags but falls back to OG tags. The twitter:card type controls whether the preview is compact (summary) or wide (summary_large_image).
      </p>
      <p style={cs.p}>
        <strong>LinkedIn</strong> uses OG tags to generate article previews. It supports og:title, og:description, og:image, and og:url. LinkedIn caches previews aggressively — use the Post Inspector tool to refresh.
      </p>
      <p style={cs.p}>
        <strong>Discord</strong> renders rich embeds using OG tags, including a colored sidebar, site name, title, description, and image. Discord also supports oEmbed for richer previews from supported providers.
      </p>
    </div>
  );
}
