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
  ];

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...tools.map((tool) => ({
      url: `${base}/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
