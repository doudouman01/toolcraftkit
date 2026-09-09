import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE = "https://toolcraftkit.com";

// ── All 45 tools ──────────────────────────────────────────────
const tools = [
  // Text Tools (9)
  "word-counter",
  "character-counter",
  "text-case-converter",
  "lorem-ipsum-generator",
  "markdown-to-html",
  "remove-duplicates",
  "words-to-pages",
  "text-compare",
  "emoji-picker",
  // Business Tools (13)
  "percentage-calculator",
  "profit-margin-calculator",
  "discount-calculator",
  "roi-calculator",
  "loan-calculator",
  "invoice-generator",
  "compound-interest",
  "mortgage-calculator",
  "salary-calculator",
  "tax-calculator",
  "tip-calculator",
  "email-signature-generator",
  "barcode-generator",
  // Converter Tools (6)
  "unit-converter",
  "base64",
  "url-encoder",
  "timestamp-converter",
  "image-to-pdf",
  "text-to-pdf",
  // Image Tools (5)
  "hex-to-rgb",
  "color-palette",
  "image-compressor",
  "image-resizer",
  "color-picker",
  // PDF Tools (4)
  "pdf-merge",
  "pdf-compressor",
  "image-to-pdf",
  "text-to-pdf",
  // Developer Tools (7)
  "json-formatter",
  "password-generator",
  "regex-tester",
  "qr-code-generator",
  "random-number-generator",
  "css-gradient-generator",
  "favicon-generator",
  // Social Media Tools (1)
  "hashtag-generator",
  // Productivity Tools (2)
  "pomodoro-timer",
  "age-calculator",
];

// Deduplicate (image-to-pdf and text-to-pdf appear in both Converter and PDF)
const uniqueTools = [...new Set(tools)];

// ── Auto-discover all blog articles ───────────────────────────
function getBlogSlugs(): string[] {
  const blogDir = path.join(process.cwd(), "src", "app", "blog");
  try {
    return fs
      .readdirSync(blogDir, { withFileTypes: true })
      .filter((entry) => {
        if (!entry.isDirectory()) return false;
        if (entry.name === "components" || entry.name.startsWith("_")) return false;
        return fs.existsSync(path.join(blogDir, entry.name, "page.tsx"));
      })
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const blogSlugs = getBlogSlugs();

  return [
    // ── Homepage ──
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // ── Pricing ──
    {
      url: `${BASE}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // ── Tool pages (high priority) ──
    ...uniqueTools.map((slug) => ({
      url: `${BASE}/tools/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // ── Blog index ──
    {
      url: `${BASE}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // ── Blog articles (auto-discovered) ──
    ...blogSlugs.map((slug) => ({
      url: `${BASE}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    // ── Legal pages ──
    {
      url: `${BASE}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
