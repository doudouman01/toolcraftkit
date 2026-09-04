import { MetadataRoute } from "next";

const BASE = "https://toolcraftkit.com";

// ── All 30 tools ──────────────────────────────────────────────
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
  // Image Tools (2)
  "hex-to-rgb",
  "color-palette",
  // Developer Tools (5)
  "json-formatter",
  "password-generator",
  "regex-tester",
  "qr-code-generator",
  "random-number-generator",
  // Life Tools (1)
  "age-calculator",
];

// ── All 16 blog articles ─────────────────────────────────────
const blogPosts = [
  // Original 5
  "how-many-pages-is-1000-words",
  "how-to-create-qr-code-for-wifi",
  "how-to-calculate-loan-payments",
  "what-is-a-good-roi",
  "how-to-remove-duplicate-lines-in-excel",
  // Added 11
  "how-to-convert-markdown-to-html",
  "what-is-compound-interest-and-how-to-calculate-it",
  "how-to-use-regex-for-beginners",
  "how-to-calculate-profit-margin",
  "best-free-online-json-formatter-tools",
  "how-to-create-strong-passwords",
  "how-to-calculate-mortgage-payments",
  "color-theory-hex-rgb-hsl-explained",
  "base64-encoding-explained",
  "how-to-calculate-percentage-discount",
  "how-to-convert-salary-to-hourly-rate",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

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

    // ── Blog articles ──
    ...blogPosts.map((slug) => ({
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
