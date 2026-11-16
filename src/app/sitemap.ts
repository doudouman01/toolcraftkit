import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

function getSlugs(dir: string): string[] {
  const fullPath = path.join(process.cwd(), dir);
  try {
    return fs
      .readdirSync(fullPath, { withFileTypes: true })
      .filter((d) => d.isDirectory() && fs.existsSync(path.join(fullPath, d.name, "page.tsx")))
      .map((d) => d.name)
      .sort();
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://toolcraftkit.com";
  const tools = getSlugs("src/app/tools");
  const blogPosts = getSlugs("src/app/blog");

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
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];
}
