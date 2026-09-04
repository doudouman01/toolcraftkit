// ── JSON-LD Schema Components for SEO ──────────────────────────
// Usage:
//   import { WebsiteSchema, ToolSchema } from "@/app/components/JsonLd";
//
//   In layout.tsx:   <WebsiteSchema />
//   In tool page.tsx: <ToolSchema name="..." description="..." slug="..." category="..." />

const BASE = "https://toolcraftkit.com";

// ── Site-wide: Organization + WebSite (place in layout.tsx) ──
export function WebsiteSchema() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ToolCraftKit",
    url: BASE,
    logo: `${BASE}/icon.png`,
    description:
      "Free online tools for creators and entrepreneurs. No signup, no tracking.",
  };

  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ToolCraftKit",
    url: BASE,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />
    </>
  );
}

// ── Per-tool: WebApplication schema (place in each tool page.tsx) ──
export function ToolSchema({
  name,
  description,
  slug,
  category,
}: {
  name: string;
  description: string;
  slug: string;
  category: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${name} - ToolCraftKit`,
    description,
    url: `${BASE}/tools/${slug}`,
    applicationCategory: category,
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: "ToolCraftKit",
      url: BASE,
    },
    browserRequirements: "Requires JavaScript. Works in all modern browsers.",
    featureList: "Free, No signup required, Browser-based, Private",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Per-blog: Article schema (place in each blog page.tsx) ──
export function ArticleSchema({
  title,
  description,
  slug,
  datePublished,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${BASE}/blog/${slug}`,
    datePublished,
    dateModified: new Date().toISOString().split("T")[0],
    author: {
      "@type": "Organization",
      name: "ToolCraftKit",
      url: BASE,
    },
    publisher: {
      "@type": "Organization",
      name: "ToolCraftKit",
      url: BASE,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/blog/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── BreadcrumbList (place in tool and blog pages) ──
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
