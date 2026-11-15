import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://toolcraftkit.com";
  const tools = [
    "word-counter",
    "character-counter",
    "text-case-converter",
    "lorem-ipsum-generator",
    "percentage-calculator",
    "profit-margin-calculator",
    "hex-to-rgb",
    "json-formatter",
    "password-generator",
    "base64",
    "markdown-to-html",
    "unit-converter",
    "url-encoder",
    "discount-calculator",
    "timestamp-converter",
    "remove-duplicates",
    "regex-tester",
    "words-to-pages",
    "roi-calculator",
    "color-palette",
    "qr-code-generator",
    "age-calculator",
    "invoice-generator",
    "loan-calculator",
    "random-number-generator",
    "compound-interest",
    "mortgage-calculator",
    "salary-calculator",
    "tax-calculator",
    "tip-calculator",
  ];

  const blogPosts = [
    "how-many-pages-is-1000-words",
    "how-to-create-qr-code-for-wifi",
    "how-to-calculate-loan-payments",
    "what-is-a-good-roi",
    "how-to-remove-duplicate-lines-in-excel",
  ];

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...tools.map((tool) => ({
      url: `${base}/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    ...blogPosts.map((post) => ({
      url: `${base}/blog/${post}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];
}
