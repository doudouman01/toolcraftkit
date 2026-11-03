"use client";
import { useState, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

/* ─── TYPES ─── */
interface OgData {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName: string;
  type: "website" | "article" | "product";
  twitterCard: "summary" | "summary_large_image";
}

type TabMode = "editor" | "checker";

/* ─── META TAG GENERATOR ─── */
function generateMetaTags(og: OgData): string {
  const lines: string[] = [];
  lines.push(`<!-- Open Graph / Facebook -->`);
  lines.push(`<meta property="og:type" content="${og.type}" />`);
  if (og.siteName) lines.push(`<meta property="og:site_name" content="${og.siteName}" />`);
  if (og.title) lines.push(`<meta property="og:title" content="${og.title}" />`);
  if (og.description) lines.push(`<meta property="og:description" content="${og.description}" />`);
  if (og.url) lines.push(`<meta property="og:url" content="${og.url}" />`);
  if (og.image) lines.push(`<meta property="og:image" content="${og.image}" />`);
  lines.push(``);
  lines.push(`<!-- Twitter -->`);
  lines.push(`<meta name="twitter:card" content="${og.twitterCard}" />`);
  if (og.title) lines.push(`<meta name="twitter:title" content="${og.title}" />`);
  if (og.description) lines.push(`<meta name="twitter:description" content="${og.description}" />`);
  if (og.image) lines.push(`<meta name="twitter:image" content="${og.image}" />`);
  return lines.join("\n");
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url || "example.com";
  }
}

/* ─── STYLES ─── */
const s = {
  page: { maxWidth: 760, margin: "0 auto", padding: "32px 20px 0" } as const,
  h1: { fontSize: 28, fontWeight: 700 as const, color: "#1C1917", marginBottom: 4, marginTop: 0 },
  sub: { fontSize: 14, color: "#78716C", marginBottom: 24, marginTop: 8 },
  card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
  cardTitle: { fontSize: 16, fontWeight: 600 as const, color: "#1C1917", marginBottom: 16, marginTop: 0 },
  label: { fontSize: 13, fontWeight: 600 as const, color: "#1C1917", marginBottom: 6, display: "block" as const },
  input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, color: "#1C1917", background: "#fff" },
  select: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, color: "#1C1917", background: "#fff", cursor: "pointer" as const },
  textarea: { width: "100%", minHeight: 200, border: "1px solid #E7E5E4", borderRadius: 8, padding: 16, fontSize: 13, lineHeight: 1.7, color: "#1C1917", fontFamily: "'Courier New', monospace", background: "#fff", resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const },
  btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600 as const, cursor: "pointer" as const, width: "100%" },
  btnSecondary: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer" as const },
  output: { background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
  grid2: { display: "grid" as const, gridTemplateColumns: "1fr 1fr", gap: 12 },
  required: { color: "#EF4444", marginLeft: 2 },
};

/* ─── TAB BUTTON ─── */
function TabBtn({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 24px",
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        color: active ? "#0D9488" : "#78716C",
        background: active ? "#F0FDFA" : "transparent",
        border: active ? "1px solid #0D9488" : "1px solid #E7E5E4",
        borderRadius: 8,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

/* ─── PREVIEW: FACEBOOK ─── */
function FacebookPreview({ og }: { og: OgData }) {
  const domain = extractDomain(og.url);
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: "#78716C", marginBottom: 8, marginTop: 0 }}>Facebook</p>
      <div style={{ border: "1px solid #DADDE1", borderRadius: 3, overflow: "hidden", background: "#F0F2F5", maxWidth: 500 }}>
        {og.image && (
          <div style={{ width: "100%", aspectRatio: "1200/630", background: `url(${og.image}) center/cover no-repeat`, backgroundColor: "#E4E6EB" }} />
        )}
        {!og.image && (
          <div style={{ width: "100%", aspectRatio: "1200/630", background: "#E4E6EB", display: "flex", alignItems: "center", justifyContent: "center", color: "#BCC0C4", fontSize: 14 }}>
            No image set
          </div>
        )}
        <div style={{ padding: "10px 12px", background: "#F0F2F5" }}>
          <p style={{ fontSize: 12, color: "#65676B", textTransform: "uppercase", margin: "0 0 4px", letterSpacing: "0.03em" }}>{domain}</p>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#1C1E21", margin: "0 0 4px", lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{og.title || "Page Title"}</p>
          <p style={{ fontSize: 14, color: "#65676B", margin: 0, lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{og.description || "Page description will appear here."}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── PREVIEW: TWITTER ─── */
function TwitterPreview({ og }: { og: OgData }) {
  const domain = extractDomain(og.url);
  const isLarge = og.twitterCard === "summary_large_image";
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: "#78716C", marginBottom: 8, marginTop: 0 }}>Twitter / X</p>
      <div style={{ border: "1px solid #CFD9DE", borderRadius: 16, overflow: "hidden", maxWidth: 500 }}>
        {isLarge && og.image && (
          <div style={{ width: "100%", aspectRatio: "2/1", background: `url(${og.image}) center/cover no-repeat`, backgroundColor: "#E4E6EB" }} />
        )}
        {isLarge && !og.image && (
          <div style={{ width: "100%", aspectRatio: "2/1", background: "#E4E6EB", display: "flex", alignItems: "center", justifyContent: "center", color: "#BCC0C4", fontSize: 14 }}>No image set</div>
        )}
        <div style={{ display: isLarge ? "block" : "flex", gap: isLarge ? 0 : 12 }}>
          {!isLarge && og.image && (
            <div style={{ width: 125, minHeight: 125, flexShrink: 0, background: `url(${og.image}) center/cover no-repeat`, backgroundColor: "#E4E6EB" }} />
          )}
          {!isLarge && !og.image && (
            <div style={{ width: 125, minHeight: 125, flexShrink: 0, background: "#E4E6EB", display: "flex", alignItems: "center", justifyContent: "center", color: "#BCC0C4", fontSize: 11 }}>No img</div>
          )}
          <div style={{ padding: "12px 14px" }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#0F1419", margin: "0 0 2px", lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{og.title || "Page Title"}</p>
            <p style={{ fontSize: 14, color: "#536471", margin: "0 0 4px", lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{og.description || "Page description will appear here."}</p>
            <p style={{ fontSize: 13, color: "#536471", margin: 0 }}>{domain}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PREVIEW: LINKEDIN ─── */
function LinkedInPreview({ og }: { og: OgData }) {
  const domain = extractDomain(og.url);
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: "#78716C", marginBottom: 8, marginTop: 0 }}>LinkedIn</p>
      <div style={{ border: "1px solid #E0DFDC", borderRadius: 2, overflow: "hidden", maxWidth: 500 }}>
        {og.image && (
          <div style={{ width: "100%", aspectRatio: "1200/627", background: `url(${og.image}) center/cover no-repeat`, backgroundColor: "#E4E6EB" }} />
        )}
        {!og.image && (
          <div style={{ width: "100%", aspectRatio: "1200/627", background: "#E9E5DF", display: "flex", alignItems: "center", justifyContent: "center", color: "#BCC0C4", fontSize: 14 }}>No image set</div>
        )}
        <div style={{ padding: "10px 16px 14px", background: "#EEF3F8" }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#000000E6", margin: "0 0 4px", lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{og.title || "Page Title"}</p>
          <p style={{ fontSize: 12, color: "#00000099", margin: 0 }}>{domain}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── PREVIEW: DISCORD ─── */
function DiscordPreview({ og }: { og: OgData }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: "#78716C", marginBottom: 8, marginTop: 0 }}>Discord</p>
      <div style={{ background: "#2F3136", borderRadius: 4, borderLeft: "4px solid #5865F2", padding: "12px 16px", maxWidth: 500 }}>
        {og.siteName && <p style={{ fontSize: 12, color: "#00AFF4", margin: "0 0 4px", fontWeight: 500 }}>{og.siteName}</p>}
        <p style={{ fontSize: 16, fontWeight: 600, color: "#00AFF4", margin: "0 0 6px", lineHeight: 1.3 }}>{og.title || "Page Title"}</p>
        <p style={{ fontSize: 14, color: "#DCDDDE", margin: "0 0 10px", lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const }}>{og.description || "Page description will appear here."}</p>
        {og.image && (
          <div style={{ width: "100%", maxWidth: 400, aspectRatio: "16/9", borderRadius: 4, background: `url(${og.image}) center/cover no-repeat`, backgroundColor: "#40444B" }} />
        )}
        {!og.image && (
          <div style={{ width: "100%", maxWidth: 400, aspectRatio: "16/9", borderRadius: 4, background: "#40444B", display: "flex", alignItems: "center", justifyContent: "center", color: "#72767D", fontSize: 13 }}>No image set</div>
        )}
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function ClientPage() {
  const [tab, setTab] = useState<TabMode>("editor");
  const [og, setOg] = useState<OgData>({
    title: "",
    description: "",
    image: "",
    url: "",
    siteName: "",
    type: "website",
    twitterCard: "summary_large_image",
  });
  const [metaTags, setMetaTags] = useState("");
  const [copied, setCopied] = useState(false);

  const update = (field: keyof OgData, value: string) => {
    setOg((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    setMetaTags(generateMetaTags(og));
  };

  const handleCopy = useCallback(() => {
    const text = metaTags || generateMetaTags(og);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [metaTags, og]);

  return (
    <div style={s.page}>
      <ToolSchema
        name="Open Graph Preview"
        description="Preview how your website looks when shared on Facebook, Twitter/X, LinkedIn, and Discord. Check and debug your Open Graph meta tags. Free, no signup."
        slug="open-graph-preview"
        category="WebApplication"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://toolcraftkit.com" },
        { name: "Dev Tools", url: "https://toolcraftkit.com/#dev-tools" },
        { name: "Open Graph Preview", url: "https://toolcraftkit.com/tools/open-graph-preview" },
      ]} />

      <h1 style={s.h1}>Open Graph Preview</h1>
      <p style={s.sub}>See exactly how your link will look when shared on social media. Edit your tags and preview in real time.</p>

      {/* ─── Tabs ─── */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <TabBtn active={tab === "editor"} label="Tag Editor" onClick={() => setTab("editor")} />
        <TabBtn active={tab === "checker"} label="URL Checker" onClick={() => setTab("checker")} />
      </div>

      {/* ═══════════ EDITOR MODE ═══════════ */}
      {tab === "editor" && (
        <>
          {/* ─── Input Fields ─── */}
          <div style={s.card}>
            <h2 style={s.cardTitle}>Open Graph Tags</h2>
            <label style={s.label}>og:title <span style={s.required}>*</span></label>
            <input type="text" value={og.title} onChange={(e) => update("title", e.target.value)} placeholder="My Awesome Page" style={s.input} />

            <label style={s.label}>og:description</label>
            <input type="text" value={og.description} onChange={(e) => update("description", e.target.value)} placeholder="A short description of your page content" style={s.input} />

            <label style={s.label}>og:image URL</label>
            <input type="text" value={og.image} onChange={(e) => update("image", e.target.value)} placeholder="https://example.com/image.jpg" style={s.input} />
            <p style={{ fontSize: 12, color: "#78716C", marginTop: -8, marginBottom: 12 }}>Recommended: 1200 x 630 pixels for best display across all platforms.</p>

            <div style={s.grid2}>
              <div>
                <label style={s.label}>og:url</label>
                <input type="text" value={og.url} onChange={(e) => update("url", e.target.value)} placeholder="https://example.com/page" style={s.input} />
              </div>
              <div>
                <label style={s.label}>og:site_name</label>
                <input type="text" value={og.siteName} onChange={(e) => update("siteName", e.target.value)} placeholder="My Website" style={s.input} />
              </div>
            </div>

            <div style={s.grid2}>
              <div>
                <label style={s.label}>og:type</label>
                <select value={og.type} onChange={(e) => update("type", e.target.value)} style={s.select}>
                  <option value="website">website</option>
                  <option value="article">article</option>
                  <option value="product">product</option>
                </select>
              </div>
              <div>
                <label style={s.label}>twitter:card</label>
                <select value={og.twitterCard} onChange={(e) => update("twitterCard", e.target.value)} style={s.select}>
                  <option value="summary_large_image">summary_large_image</option>
                  <option value="summary">summary</option>
                </select>
              </div>
            </div>
          </div>

          {/* ─── Live Previews ─── */}
          <div style={s.card}>
            <h2 style={s.cardTitle}>Live Preview</h2>
            <FacebookPreview og={og} />
            <TwitterPreview og={og} />
            <LinkedInPreview og={og} />
            <DiscordPreview og={og} />
          </div>

          {/* ─── Generate Meta Tags ─── */}
          <button onClick={handleGenerate} style={s.btn}>Generate Meta Tags</button>

          {metaTags && (
            <div style={{ ...s.output, marginTop: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", margin: 0 }}>Your Meta Tags</h2>
                <button onClick={handleCopy} style={s.btnSecondary}>
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </button>
              </div>
              <textarea value={metaTags} readOnly style={s.textarea} />
              <p style={{ fontSize: 12, color: "#78716C", marginTop: 10, marginBottom: 0 }}>
                Paste these tags inside the <code>&lt;head&gt;</code> section of your HTML page.
              </p>
            </div>
          )}
        </>
      )}

      {/* ═══════════ CHECKER MODE ═══════════ */}
      {tab === "checker" && (
        <div style={s.card}>
          <h2 style={s.cardTitle}>Check a Live URL</h2>
          <p style={{ fontSize: 14, color: "#78716C", marginTop: 0, marginBottom: 16, lineHeight: 1.6 }}>
            Due to browser security restrictions (CORS), client-side tools cannot fetch and parse meta tags from external URLs. Use the official platform debuggers below to check your live pages:
          </p>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
            <a
              href="https://developers.facebook.com/tools/debug/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", border: "1px solid #E7E5E4", borderRadius: 10, textDecoration: "none", color: "#1C1917", background: "#fff", transition: "border-color 0.2s" }}
            >
              <span style={{ fontSize: 24 }}>📘</span>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>Facebook Sharing Debugger</p>
                <p style={{ margin: 0, fontSize: 13, color: "#78716C" }}>See how your page appears when shared on Facebook. Clear cached data and preview updates.</p>
              </div>
            </a>

            <a
              href="https://cards-dev.twitter.com/validator"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", border: "1px solid #E7E5E4", borderRadius: 10, textDecoration: "none", color: "#1C1917", background: "#fff", transition: "border-color 0.2s" }}
            >
              <span style={{ fontSize: 24 }}>🐦</span>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>Twitter / X Card Validator</p>
                <p style={{ margin: 0, fontSize: 13, color: "#78716C" }}>Preview how your Twitter Card will look and validate your meta tags.</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/post-inspector/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", border: "1px solid #E7E5E4", borderRadius: 10, textDecoration: "none", color: "#1C1917", background: "#fff", transition: "border-color 0.2s" }}
            >
              <span style={{ fontSize: 24 }}>💼</span>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>LinkedIn Post Inspector</p>
                <p style={{ margin: 0, fontSize: 13, color: "#78716C" }}>Check how your URL renders on LinkedIn and refresh cached previews.</p>
              </div>
            </a>
          </div>

          <div style={{ marginTop: 20, padding: "14px 16px", background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 8 }}>
            <p style={{ margin: 0, fontSize: 13, color: "#0F766E", lineHeight: 1.6 }}>
              <strong>Tip:</strong> Use the Tag Editor tab above to create your Open Graph tags first, then validate them with the debuggers after deploying to your site.
            </p>
          </div>
        </div>
      )}

      {/* ─── SEO Content ─── */}
      <SeoContent />
    </div>
  );
}
