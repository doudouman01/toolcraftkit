"use client";
import { useState, useMemo } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

/* ─── STYLES ─── */
const s = {
  page: { maxWidth: 880, margin: "0 auto", padding: "32px 20px 60px" } as const,
  h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
  sub: { fontSize: 14, color: "#78716C", marginBottom: 28 } as const,
  card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
  sectionTitle: { fontSize: 16, fontWeight: 700, color: "#1C1917", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 } as const,
  label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 4, display: "block" } as const,
  hint: { fontSize: 12, color: "#78716C", marginBottom: 2 } as const,
  input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", color: "#1C1917", background: "#fff", boxSizing: "border-box" as const } as const,
  textarea: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", color: "#1C1917", background: "#fff", resize: "vertical" as const, minHeight: 72, boxSizing: "border-box" as const, lineHeight: 1.5 } as const,
  select: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", color: "#1C1917", background: "#fff", boxSizing: "border-box" as const, cursor: "pointer" } as const,
  row: { display: "grid" as const, gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 } as const,
  field: { marginBottom: 14 } as const,
  btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
  btnOutline: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
  code: { width: "100%", background: "#1C1917", color: "#E7E5E4", borderRadius: 8, padding: 16, fontSize: 13, fontFamily: "'Courier New', monospace", overflowX: "auto" as const, whiteSpace: "pre-wrap" as const, wordBreak: "break-all" as const, lineHeight: 1.7, border: "none" } as const,
};

/* ─── CHAR COUNTER BADGE ─── */
function CharBadge({ count, min, max }: { count: number; min: number; max: number }) {
  const color = count === 0 ? "#78716C" : count >= min && count <= max ? "#10B981" : "#EF4444";
  const bg = count === 0 ? "#F5F5F4" : count >= min && count <= max ? "#ECFDF5" : "#FEF2F2";
  return (
    <span style={{ fontSize: 12, fontWeight: 600, color, background: bg, borderRadius: 20, padding: "2px 10px", marginLeft: 8 }}>
      {count} / {max}
    </span>
  );
}

/* ─── SYNTAX HIGHLIGHTED HTML ─── */
function highlightHtml(html: string) {
  const parts: { text: string; color: string }[] = [];
  const regex = /(<\/?)([\w-]+)((?:\s+[\w-]+="[^"]*")*)\s*(\/?>)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: html.slice(lastIndex, match.index), color: "#E7E5E4" });
    }
    const [, bracket, tag, attrs, close] = match;
    parts.push({ text: bracket, color: "#78716C" });
    parts.push({ text: tag, color: "#EF4444" });
    if (attrs) {
      const attrRegex = /\s+([\w-]+)="([^"]*)"/g;
      let attrMatch;
      while ((attrMatch = attrRegex.exec(attrs)) !== null) {
        parts.push({ text: " ", color: "#E7E5E4" });
        parts.push({ text: attrMatch[1], color: "#FBBF24" });
        parts.push({ text: '="', color: "#78716C" });
        parts.push({ text: attrMatch[2], color: "#10B981" });
        parts.push({ text: '"', color: "#78716C" });
      }
    }
    parts.push({ text: close, color: "#78716C" });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < html.length) {
    parts.push({ text: html.slice(lastIndex), color: "#E7E5E4" });
  }
  return parts;
}

export default function ClientPage() {
  /* ─── STATE ─── */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [canonical, setCanonical] = useState("");
  const [robotsIndex, setRobotsIndex] = useState("index");
  const [robotsFollow, setRobotsFollow] = useState("follow");

  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [ogType, setOgType] = useState("website");
  const [ogSiteName, setOgSiteName] = useState("");

  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [twitterHandle, setTwitterHandle] = useState("");

  const [copied, setCopied] = useState(false);

  /* ─── GENERATED HTML ─── */
  const generatedHtml = useMemo(() => {
    const lines: string[] = [];
    lines.push("<!-- Basic Meta Tags -->");
    if (title) lines.push(`<title>${title}</title>`);
    lines.push(`<meta charset="UTF-8">`);
    lines.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0">`);
    if (description) lines.push(`<meta name="description" content="${description}">`);
    if (keywords) lines.push(`<meta name="keywords" content="${keywords}">`);
    if (author) lines.push(`<meta name="author" content="${author}">`);
    lines.push(`<meta name="robots" content="${robotsIndex}, ${robotsFollow}">`);
    if (canonical) lines.push(`<link rel="canonical" href="${canonical}">`);

    lines.push("");
    lines.push("<!-- Open Graph / Facebook -->");
    lines.push(`<meta property="og:type" content="${ogType}">`);
    if (ogTitle || title) lines.push(`<meta property="og:title" content="${ogTitle || title}">`);
    if (ogDescription || description) lines.push(`<meta property="og:description" content="${ogDescription || description}">`);
    if (ogImage) lines.push(`<meta property="og:image" content="${ogImage}">`);
    if (canonical) lines.push(`<meta property="og:url" content="${canonical}">`);
    if (ogSiteName) lines.push(`<meta property="og:site_name" content="${ogSiteName}">`);

    lines.push("");
    lines.push("<!-- Twitter Card -->");
    lines.push(`<meta name="twitter:card" content="${twitterCard}">`);
    if (ogTitle || title) lines.push(`<meta name="twitter:title" content="${ogTitle || title}">`);
    if (ogDescription || description) lines.push(`<meta name="twitter:description" content="${ogDescription || description}">`);
    if (ogImage) lines.push(`<meta name="twitter:image" content="${ogImage}">`);
    if (twitterHandle) lines.push(`<meta name="twitter:site" content="${twitterHandle.startsWith("@") ? twitterHandle : "@" + twitterHandle}">`);

    return lines.join("\n");
  }, [title, description, keywords, author, canonical, robotsIndex, robotsFollow, ogTitle, ogDescription, ogImage, ogType, ogSiteName, twitterCard, twitterHandle]);

  /* ─── ACTIONS ─── */
  const copyHtml = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadHtml = () => {
    const blob = new Blob([generatedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meta-tags.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ─── PREVIEW HELPERS ─── */
  const previewTitle = title || "Page Title";
  const previewUrl = canonical || "https://example.com/page";
  const previewDesc = description || "Your meta description will appear here. Write a compelling summary of your page content to improve click-through rates from search results.";
  const previewOgTitle = ogTitle || title || "Page Title";
  const previewOgDesc = ogDescription || description || "Your page description will appear here on social media cards.";

  /* ─── HIGHLIGHTED CODE ─── */
  const highlighted = useMemo(() => highlightHtml(generatedHtml), [generatedHtml]);

  return (
    <div style={s.page}>
      <ToolSchema
        name="Meta Tag Generator"
        description="Free meta tag generator. Create title, description, Open Graph, Twitter Card meta tags for SEO. Live Google preview, copy HTML code."
        slug="meta-tag-generator"
        category="DeveloperApplication"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Dev Tools", url: "https://toolcraftkit.com/#dev-tools" },
          { name: "Meta Tag Generator", url: "https://toolcraftkit.com/tools/meta-tag-generator" },
        ]}
      />

      <h1 style={s.h1}>Meta Tag Generator</h1>
      <p style={s.sub}>Generate SEO-optimized meta tags for your HTML pages. Live preview included.</p>

      {/* ═══════ BASIC META TAGS ═══════ */}
      <div style={s.card}>
        <div style={s.sectionTitle}>
          <span style={{ fontSize: 18 }}>&#128196;</span> Basic Meta Tags
        </div>

        <div style={s.field}>
          <label style={s.label}>
            Page Title
            <CharBadge count={title.length} min={50} max={60} />
          </label>
          <div style={s.hint}>Recommended: 50-60 characters</div>
          <input
            style={s.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Awesome Page — Brand Name"
            maxLength={120}
          />
        </div>

        <div style={s.field}>
          <label style={s.label}>
            Meta Description
            <CharBadge count={description.length} min={150} max={160} />
          </label>
          <div style={s.hint}>Recommended: 150-160 characters</div>
          <textarea
            style={s.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A compelling description of your page content that will appear in search engine results..."
            maxLength={320}
          />
        </div>

        <div style={s.row}>
          <div>
            <label style={s.label}>Keywords</label>
            <div style={s.hint}>Comma separated</div>
            <input
              style={s.input}
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="seo, meta tags, html"
            />
          </div>
          <div>
            <label style={s.label}>Author</label>
            <div style={s.hint}>Page author name</div>
            <input
              style={s.input}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="John Doe"
            />
          </div>
        </div>

        <div style={s.field}>
          <label style={s.label}>Canonical URL</label>
          <div style={s.hint}>The preferred URL for this page</div>
          <input
            style={s.input}
            value={canonical}
            onChange={(e) => setCanonical(e.target.value)}
            placeholder="https://example.com/my-page"
          />
        </div>

        <div style={s.row}>
          <div>
            <label style={s.label}>Robots — Indexing</label>
            <select style={s.select} value={robotsIndex} onChange={(e) => setRobotsIndex(e.target.value)}>
              <option value="index">index</option>
              <option value="noindex">noindex</option>
            </select>
          </div>
          <div>
            <label style={s.label}>Robots — Following</label>
            <select style={s.select} value={robotsFollow} onChange={(e) => setRobotsFollow(e.target.value)}>
              <option value="follow">follow</option>
              <option value="nofollow">nofollow</option>
            </select>
          </div>
        </div>
      </div>

      {/* ═══════ OPEN GRAPH ═══════ */}
      <div style={s.card}>
        <div style={s.sectionTitle}>
          <span style={{ fontSize: 18 }}>&#127760;</span> Open Graph (Facebook, LinkedIn)
        </div>

        <div style={s.row}>
          <div>
            <label style={s.label}>OG Title</label>
            <div style={s.hint}>Falls back to Page Title if empty</div>
            <input
              style={s.input}
              value={ogTitle}
              onChange={(e) => setOgTitle(e.target.value)}
              placeholder="Same as page title"
            />
          </div>
          <div>
            <label style={s.label}>OG Type</label>
            <select style={s.select} value={ogType} onChange={(e) => setOgType(e.target.value)}>
              <option value="website">website</option>
              <option value="article">article</option>
              <option value="product">product</option>
            </select>
          </div>
        </div>

        <div style={s.field}>
          <label style={s.label}>OG Description</label>
          <div style={s.hint}>Falls back to Meta Description if empty</div>
          <textarea
            style={{ ...s.textarea, minHeight: 56 }}
            value={ogDescription}
            onChange={(e) => setOgDescription(e.target.value)}
            placeholder="Same as meta description"
          />
        </div>

        <div style={s.row}>
          <div>
            <label style={s.label}>OG Image URL</label>
            <div style={s.hint}>Recommended: 1200x630px</div>
            <input
              style={s.input}
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label style={s.label}>OG Site Name</label>
            <input
              style={s.input}
              value={ogSiteName}
              onChange={(e) => setOgSiteName(e.target.value)}
              placeholder="My Website"
            />
          </div>
        </div>
      </div>

      {/* ═══════ TWITTER CARD ═══════ */}
      <div style={s.card}>
        <div style={s.sectionTitle}>
          <span style={{ fontSize: 18 }}>&#128038;</span> Twitter Card
        </div>

        <div style={s.row}>
          <div>
            <label style={s.label}>Card Type</label>
            <select style={s.select} value={twitterCard} onChange={(e) => setTwitterCard(e.target.value)}>
              <option value="summary">summary</option>
              <option value="summary_large_image">summary_large_image</option>
            </select>
          </div>
          <div>
            <label style={s.label}>Twitter Handle</label>
            <div style={s.hint}>e.g. @yourhandle</div>
            <input
              style={s.input}
              value={twitterHandle}
              onChange={(e) => setTwitterHandle(e.target.value)}
              placeholder="@yourhandle"
            />
          </div>
        </div>
      </div>

      {/* ═══════ LIVE PREVIEW ═══════ */}
      <div style={s.card}>
        <div style={s.sectionTitle}>
          <span style={{ fontSize: 18 }}>&#128065;</span> Live Preview
        </div>

        {/* Google Search Preview */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#78716C", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Google Search Result</div>
          <div style={{ background: "#FAFAF9", borderRadius: 8, padding: 16, border: "1px solid #E7E5E4" }}>
            <div style={{ fontSize: 12, color: "#202124", marginBottom: 4, fontFamily: "Arial, sans-serif" }}>
              {previewUrl.replace(/^https?:\/\//, "").split("/")[0]}
              <span style={{ color: "#5F6368" }}> &rsaquo; {previewUrl.replace(/^https?:\/\/[^/]+\/?/, "").split("/").filter(Boolean).join(" &rsaquo; ") || "..."}</span>
            </div>
            <div style={{ fontSize: 20, color: "#1A0DAB", fontFamily: "Arial, sans-serif", marginBottom: 4, cursor: "pointer", lineHeight: 1.3 }}>
              {previewTitle.length > 60 ? previewTitle.slice(0, 60) + "..." : previewTitle}
            </div>
            <div style={{ fontSize: 14, color: "#4D5156", fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>
              {previewDesc.length > 160 ? previewDesc.slice(0, 160) + "..." : previewDesc}
            </div>
          </div>
        </div>

        {/* Social Media Card Preview */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#78716C", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Social Media Card</div>
          <div style={{ background: "#FAFAF9", borderRadius: 8, border: "1px solid #E7E5E4", overflow: "hidden", maxWidth: 500 }}>
            {ogImage ? (
              <div style={{ width: "100%", height: twitterCard === "summary_large_image" ? 250 : 125, background: `url(${ogImage}) center/cover no-repeat`, borderBottom: "1px solid #E7E5E4" }} />
            ) : (
              <div style={{ width: "100%", height: twitterCard === "summary_large_image" ? 250 : 125, background: "linear-gradient(135deg, #E7E5E4 0%, #D6D3D1 100%)", borderBottom: "1px solid #E7E5E4", display: "flex", alignItems: "center", justifyContent: "center", color: "#A8A29E", fontSize: 14 }}>
                No image set
              </div>
            )}
            <div style={{ padding: 14 }}>
              <div style={{ fontSize: 12, color: "#78716C", marginBottom: 4 }}>
                {previewUrl.replace(/^https?:\/\//, "").split("/")[0]}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1C1917", marginBottom: 4, lineHeight: 1.3 }}>
                {previewOgTitle.length > 70 ? previewOgTitle.slice(0, 70) + "..." : previewOgTitle}
              </div>
              <div style={{ fontSize: 13, color: "#78716C", lineHeight: 1.4 }}>
                {previewOgDesc.length > 150 ? previewOgDesc.slice(0, 150) + "..." : previewOgDesc}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ GENERATED HTML ═══════ */}
      <div style={s.card}>
        <div style={s.sectionTitle}>
          <span style={{ fontSize: 18 }}>&#128187;</span> Generated HTML
        </div>

        <div style={s.code}>
          {highlighted.map((part, i) => (
            <span key={i} style={{ color: part.color }}>{part.text}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button onClick={copyHtml} style={s.btn}>
            {copied ? "Copied!" : "Copy HTML"}
          </button>
          <button onClick={downloadHtml} style={s.btnOutline}>
            Download .html
          </button>
        </div>
      </div>

      {/* ═══════ ABOUT SECTION ═══════ */}
      <div style={{ ...s.card, background: "#FAFAF9" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1C1917", marginBottom: 12 }}>About Meta Tags</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#78716C", marginBottom: 12 }}>
          Meta tags are snippets of HTML code that provide metadata about a web page. They don&apos;t appear on the page itself, but are read by search engines and social media platforms to understand your content. Well-crafted meta tags improve your search engine rankings, click-through rates, and how your pages appear when shared on social media.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#78716C", marginBottom: 0 }}>
          The <strong>title tag</strong> is the most important on-page SEO element. Keep it between 50-60 characters. The <strong>meta description</strong> should be 150-160 characters and include a clear call-to-action. <strong>Open Graph</strong> tags control how your page appears on Facebook and LinkedIn, while <strong>Twitter Cards</strong> control the appearance on X (Twitter).
        </p>
      </div>

      {/* ═══════ FAQ ═══════ */}
      <div style={s.card}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1C1917", marginBottom: 16 }}>Frequently Asked Questions</h2>

        {[
          {
            q: "What are meta tags and why do they matter for SEO?",
            a: "Meta tags are HTML elements placed in the <head> section of your page. They tell search engines what your page is about, influence how your page appears in search results, and control how it looks when shared on social media. While they don't directly boost rankings, good meta tags improve click-through rates significantly.",
          },
          {
            q: "What is the ideal length for a title tag?",
            a: "Google typically displays the first 50-60 characters of a title tag. Titles longer than 60 characters may be truncated with an ellipsis. Place your most important keywords at the beginning of the title for best results.",
          },
          {
            q: "How long should a meta description be?",
            a: "Aim for 150-160 characters. Google sometimes displays up to 320 characters for certain queries, but 155 characters is the safe standard. Always include a call-to-action and your primary keyword.",
          },
          {
            q: "What are Open Graph meta tags?",
            a: "Open Graph (OG) tags are a protocol created by Facebook that controls how your URL is displayed when shared on social media platforms like Facebook, LinkedIn, and Pinterest. They specify the title, description, image, and type of content.",
          },
          {
            q: "What is the difference between summary and summary_large_image Twitter cards?",
            a: "The 'summary' card shows a small square thumbnail next to the title and description. The 'summary_large_image' card displays a large, prominent image above the text content, taking up more visual space in the feed.",
          },
          {
            q: "Should I use noindex or nofollow?",
            a: "Use 'noindex' to prevent search engines from including a page in search results (e.g., thank-you pages, admin pages). Use 'nofollow' to tell search engines not to follow links on the page. Most public pages should use 'index, follow'.",
          },
        ].map((faq, i) => (
          <details key={i} style={{ marginBottom: 10, borderBottom: i < 5 ? "1px solid #E7E5E4" : "none", paddingBottom: 10 }}>
            <summary style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", cursor: "pointer", padding: "4px 0" }}>{faq.q}</summary>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#78716C", marginTop: 6, marginBottom: 0, paddingLeft: 4 }}>{faq.a}</p>
          </details>
        ))}
      </div>

      <SeoContent />
    </div>
  );
}
