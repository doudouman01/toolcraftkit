import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE = "https://toolcraftkit.com";

// ── All 35 tools ──────────────────────────────────────────────
const tools = [
  // Text Tools (7)
  "word-counter",
  "character-counter",
  "text-case-converter",
  "lorem-ipsum",
  "markdown-to-html",
  "remove-duplicates",
  "words-to-pages",
  // Business Tools (11)
  "percentage-calculator",
  "profit-margin-calculator",
  "discount-calculator",
  "roi-calculator",
  "loan-calculator",
  "invoice-generator",
  "compound-interest-calculator",
  "mortgage-calculator",
  "salary-calculator",
  "income-tax-calculator",
  "tip-calculator",
  // Converter Tools (4)
  "unit-converter",
  "base64-encoder-decoder",
  "url-encoder",
  "timestamp-converter",
  // Image Tools (4)
  "hex-to-rgb",
  "color-palette",
  "image-compressor",
  "image-resizer",
  // Developer Tools (5)
  "json-formatter",
  "password-generator",
  "regex-tester",
  "qr-code-generator",
  "random-number-generator",
  // PDF Tools (3)
  "pdf-merge",
  "image-to-pdf",
  "text-to-pdf",
  // Life Tools (1)
  "age-calculator",
];

// ── Auto-discover all blog articles ───────────────────────────
function getBlogSlugs(): string[] {
  const blogDir = path.join(process.cwd(), "src", "app", "blog");
  try {
    return fs
      .readdirSync(blogDir, { withFileTypes: true })
      .filter((entry) => {
        // Only folders that contain a page.tsx (= real articles)
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

    // ── Tool pages (high priority) ──
    ...tools.map((slug) => ({
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
