"use client";
import { useState, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

/* ─── SCHEMA TYPES ─── */
const SCHEMA_TYPES = [
  "Article",
  "Product",
  "FAQ",
  "Organization",
  "LocalBusiness",
  "Person",
  "HowTo",
  "Event",
  "Recipe",
  "BreadcrumbList",
] as const;

type SchemaType = (typeof SCHEMA_TYPES)[number];

/* ─── STYLES (matching ToolCraftKit pattern) ─── */
const s = {
  page: { maxWidth: 760, margin: "0 auto", padding: "32px 20px 0" } as const,
  h1: { fontSize: 28, fontWeight: 700 as const, color: "#1C1917", marginBottom: 4, marginTop: 0 },
  sub: { fontSize: 14, color: "#78716C", marginBottom: 24, marginTop: 8 },
  card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
  cardTitle: { fontSize: 16, fontWeight: 600 as const, color: "#1C1917", marginBottom: 16, marginTop: 0 },
  label: { fontSize: 13, fontWeight: 600 as const, color: "#1C1917", marginBottom: 6, display: "block" as const },
  input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, color: "#1C1917", background: "#fff" },
  select: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, color: "#1C1917", background: "#fff", cursor: "pointer" as const },
  btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600 as const, cursor: "pointer" as const, width: "100%" },
  btnSecondary: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer" as const },
  btnSmall: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, fontWeight: 500 as const, cursor: "pointer" as const },
  btnDanger: { background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: 6, padding: "6px 14px", fontSize: 13, fontWeight: 500 as const, cursor: "pointer" as const },
  output: { background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
  pre: { width: "100%", minHeight: 300, border: "1px solid #E7E5E4", borderRadius: 8, padding: 16, fontSize: 13, lineHeight: 1.7, color: "#1C1917", fontFamily: "'Courier New', monospace", background: "#1C1917", overflow: "auto", boxSizing: "border-box" as const, whiteSpace: "pre-wrap" as const, wordBreak: "break-word" as const },
  required: { color: "#EF4444", marginLeft: 2 },
  grid2: { display: "grid" as const, gridTemplateColumns: "1fr 1fr", gap: 12 },
  tabs: { display: "flex" as const, flexWrap: "wrap" as const, gap: 6, marginBottom: 16 },
  tab: (active: boolean) => ({
    padding: "8px 16px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: active ? 600 : 400,
    border: active ? "none" : "1px solid #E7E5E4",
    background: active ? "#0D9488" : "#fff",
    color: active ? "#fff" : "#555",
    cursor: "pointer" as const,
    transition: "all 0.2s",
  }),
};

/* ─── HELPER: syntax-highlighted JSON ─── */
function highlightJson(json: string): string {
  return json
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?/g, (match) => {
      let cls = "#A5D6A7"; // string green
      if (match.endsWith(":")) {
        cls = "#90CAF9"; // key blue
        return `<span style="color:${cls}">${match.slice(0, -1)}</span>:`;
      }
      if (/^"https?:/.test(match)) cls = "#CE93D8"; // url purple
      return `<span style="color:${cls}">${match}</span>`;
    })
    .replace(/\b(true|false)\b/g, '<span style="color:#FFAB91">$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#FFE082">$1</span>');
}

/* ─── GENERATORS ─── */
function buildArticle(d: Record<string, string>) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: d.headline || "",
    author: { "@type": "Person", name: d.authorName || "" },
    publisher: { "@type": "Organization", name: d.publisherName || "" },
    datePublished: d.datePublished || "",
    dateModified: d.dateModified || "",
    image: d.image || undefined,
    description: d.description || "",
    mainEntityOfPage: { "@type": "WebPage", "@id": d.url || "" },
  };
}

function buildProduct(d: Record<string, string>) {
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: d.name || "",
    description: d.description || "",
    image: d.image || undefined,
    brand: { "@type": "Brand", name: d.brand || "" },
    sku: d.sku || undefined,
    offers: {
      "@type": "Offer",
      price: d.price || "0",
      priceCurrency: d.currency || "USD",
      availability: `https://schema.org/${d.availability || "InStock"}`,
    },
  };
  if (d.rating) {
    out.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: d.rating,
      bestRating: "5",
      ratingCount: d.ratingCount || "1",
    };
  }
  return out;
}

function buildFAQ(pairs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.filter((p) => p.q && p.a).map((p) => ({
      "@type": "Question",
      name: p.q,
      acceptedAnswer: { "@type": "Answer", text: p.a },
    })),
  };
}

function buildOrganization(d: Record<string, string>, socials: string[]) {
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: d.name || "",
    url: d.url || "",
    logo: d.logo || undefined,
    description: d.description || undefined,
    telephone: d.phone || undefined,
    email: d.email || undefined,
  };
  if (d.street || d.city) {
    out.address = {
      "@type": "PostalAddress",
      streetAddress: d.street || "",
      addressLocality: d.city || "",
      addressRegion: d.state || "",
      postalCode: d.zip || "",
      addressCountry: d.country || "",
    };
  }
  const filtered = socials.filter(Boolean);
  if (filtered.length) out.sameAs = filtered;
  return out;
}

function buildLocalBusiness(d: Record<string, string>) {
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": d.businessType || "LocalBusiness",
    name: d.name || "",
    telephone: d.phone || undefined,
    priceRange: d.priceRange || undefined,
    openingHours: d.openingHours || undefined,
  };
  if (d.street || d.city) {
    out.address = {
      "@type": "PostalAddress",
      streetAddress: d.street || "",
      addressLocality: d.city || "",
      addressRegion: d.state || "",
      postalCode: d.zip || "",
      addressCountry: d.country || "",
    };
  }
  if (d.lat && d.lng) {
    out.geo = { "@type": "GeoCoordinates", latitude: d.lat, longitude: d.lng };
  }
  return out;
}

function buildPerson(d: Record<string, string>) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: d.name || "",
    url: d.url || undefined,
    jobTitle: d.jobTitle || undefined,
    worksFor: d.worksFor ? { "@type": "Organization", name: d.worksFor } : undefined,
    image: d.image || undefined,
  };
}

function buildHowTo(d: Record<string, string>, steps: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: d.name || "",
    description: d.description || "",
    totalTime: d.totalTime || undefined,
    estimatedCost: d.estimatedCost ? { "@type": "MonetaryAmount", currency: "USD", value: d.estimatedCost } : undefined,
    step: steps.filter(Boolean).map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };
}

function buildEvent(d: Record<string, string>) {
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: d.name || "",
    startDate: d.startDate || "",
    endDate: d.endDate || undefined,
    description: d.description || undefined,
    image: d.image || undefined,
    location: d.location ? { "@type": "Place", name: d.location } : undefined,
    organizer: d.organizer ? { "@type": "Organization", name: d.organizer } : undefined,
  };
  if (d.offerPrice) {
    out.offers = {
      "@type": "Offer",
      price: d.offerPrice,
      priceCurrency: d.offerCurrency || "USD",
      availability: "https://schema.org/InStock",
    };
  }
  return out;
}

function buildRecipe(d: Record<string, string>, ingredients: string[], steps: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: d.name || "",
    description: d.description || "",
    image: d.image || undefined,
    author: { "@type": "Person", name: d.author || "" },
    prepTime: d.prepTime || undefined,
    cookTime: d.cookTime || undefined,
    recipeYield: d.recipeYield || undefined,
    recipeIngredient: ingredients.filter(Boolean),
    recipeInstructions: steps.filter(Boolean).map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };
}

function buildBreadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.filter((it) => it.name && it.url).map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/* ─── CLEAN UNDEFINED FROM OUTPUT ─── */
function cleanObj(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(cleanObj);
  if (obj && typeof obj === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      if (v !== undefined && v !== null && v !== "") out[k] = cleanObj(v);
    }
    return out;
  }
  return obj;
}

/* ─── MAIN COMPONENT ─── */
export default function ClientPage() {
  const today = new Date().toISOString().split("T")[0];
  const [schemaType, setSchemaType] = useState<SchemaType>("Article");
  const [fields, setFields] = useState<Record<string, string>>({ datePublished: today, dateModified: today, currency: "USD", availability: "InStock", businessType: "LocalBusiness", offerCurrency: "USD" });
  const [faqPairs, setFaqPairs] = useState([{ q: "", a: "" }]);
  const [socials, setSocials] = useState([""]);
  const [howtoSteps, setHowtoSteps] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [recipeSteps, setRecipeSteps] = useState([""]);
  const [breadcrumbItems, setBreadcrumbItems] = useState([{ name: "", url: "" }]);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const upd = (k: string, v: string) => setFields((p) => ({ ...p, [k]: v }));

  /* ─── generate ─── */
  const handleGenerate = () => {
    setError("");
    let data: unknown;
    switch (schemaType) {
      case "Article":
        if (!fields.headline) { setError("Headline is required."); return; }
        data = buildArticle(fields);
        break;
      case "Product":
        if (!fields.name) { setError("Product name is required."); return; }
        data = buildProduct(fields);
        break;
      case "FAQ":
        if (!faqPairs.some((p) => p.q && p.a)) { setError("Add at least one Q&A pair."); return; }
        data = buildFAQ(faqPairs);
        break;
      case "Organization":
        if (!fields.name) { setError("Organization name is required."); return; }
        data = buildOrganization(fields, socials);
        break;
      case "LocalBusiness":
        if (!fields.name) { setError("Business name is required."); return; }
        data = buildLocalBusiness(fields);
        break;
      case "Person":
        if (!fields.name) { setError("Name is required."); return; }
        data = buildPerson(fields);
        break;
      case "HowTo":
        if (!fields.name) { setError("Title is required."); return; }
        data = buildHowTo(fields, howtoSteps);
        break;
      case "Event":
        if (!fields.name || !fields.startDate) { setError("Event name and start date are required."); return; }
        data = buildEvent(fields);
        break;
      case "Recipe":
        if (!fields.name) { setError("Recipe name is required."); return; }
        data = buildRecipe(fields, ingredients, recipeSteps);
        break;
      case "BreadcrumbList":
        if (!breadcrumbItems.some((it) => it.name && it.url)) { setError("Add at least one breadcrumb item."); return; }
        data = buildBreadcrumb(breadcrumbItems);
        break;
    }
    const cleaned = cleanObj(data);
    setOutput(JSON.stringify(cleaned, null, 2));
  };

  const handleCopy = useCallback(() => {
    const script = `<script type="application/ld+json">\n${output}\n</script>`;
    navigator.clipboard.writeText(script).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [output]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `schema-${schemaType.toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [output, schemaType]);

  /* ─── dynamic array helpers ─── */
  const addFaq = () => setFaqPairs((p) => [...p, { q: "", a: "" }]);
  const rmFaq = (i: number) => setFaqPairs((p) => p.filter((_, idx) => idx !== i));
  const updFaq = (i: number, k: "q" | "a", v: string) => setFaqPairs((p) => p.map((x, idx) => idx === i ? { ...x, [k]: v } : x));

  const addSocial = () => setSocials((p) => [...p, ""]);
  const rmSocial = (i: number) => setSocials((p) => p.filter((_, idx) => idx !== i));
  const updSocial = (i: number, v: string) => setSocials((p) => p.map((x, idx) => idx === i ? v : x));

  const addStep = () => setHowtoSteps((p) => [...p, ""]);
  const rmStep = (i: number) => setHowtoSteps((p) => p.filter((_, idx) => idx !== i));
  const updStep = (i: number, v: string) => setHowtoSteps((p) => p.map((x, idx) => idx === i ? v : x));

  const addIngredient = () => setIngredients((p) => [...p, ""]);
  const rmIngredient = (i: number) => setIngredients((p) => p.filter((_, idx) => idx !== i));
  const updIngredient = (i: number, v: string) => setIngredients((p) => p.map((x, idx) => idx === i ? v : x));

  const addRecipeStep = () => setRecipeSteps((p) => [...p, ""]);
  const rmRecipeStep = (i: number) => setRecipeSteps((p) => p.filter((_, idx) => idx !== i));
  const updRecipeStep = (i: number, v: string) => setRecipeSteps((p) => p.map((x, idx) => idx === i ? v : x));

  const addBreadcrumb = () => setBreadcrumbItems((p) => [...p, { name: "", url: "" }]);
  const rmBreadcrumb = (i: number) => setBreadcrumbItems((p) => p.filter((_, idx) => idx !== i));
  const updBreadcrumb = (i: number, k: "name" | "url", v: string) => setBreadcrumbItems((p) => p.map((x, idx) => idx === i ? { ...x, [k]: v } : x));

  /* ─── field renderer helper ─── */
  const F = (label: string, key: string, placeholder: string, required = false, type = "text") => (
    <div>
      <label style={s.label}>{label}{required && <span style={s.required}>*</span>}</label>
      <input type={type} value={fields[key] || ""} onChange={(e) => upd(key, e.target.value)} placeholder={placeholder} style={s.input} />
    </div>
  );

  /* ─── FORM for each type ─── */
  const renderForm = () => {
    switch (schemaType) {
      case "Article":
        return (
          <div style={s.card}>
            <h2 style={s.cardTitle}>Article Details</h2>
            {F("Headline", "headline", "Your article title", true)}
            <div style={s.grid2}>
              {F("Author Name", "authorName", "John Doe")}
              {F("Publisher Name", "publisherName", "My Blog")}
            </div>
            <div style={s.grid2}>
              {F("Date Published", "datePublished", "", false, "date")}
              {F("Date Modified", "dateModified", "", false, "date")}
            </div>
            {F("Image URL", "image", "https://example.com/image.jpg")}
            {F("Description", "description", "A brief summary of the article")}
            {F("Page URL", "url", "https://example.com/article")}
          </div>
        );

      case "Product":
        return (
          <div style={s.card}>
            <h2 style={s.cardTitle}>Product Details</h2>
            {F("Product Name", "name", "Widget Pro", true)}
            {F("Description", "description", "A great product")}
            {F("Image URL", "image", "https://example.com/product.jpg")}
            <div style={s.grid2}>
              {F("Brand", "brand", "Acme")}
              {F("SKU", "sku", "WP-001")}
            </div>
            <div style={s.grid2}>
              {F("Price", "price", "29.99")}
              <div>
                <label style={s.label}>Currency</label>
                <select value={fields.currency || "USD"} onChange={(e) => upd("currency", e.target.value)} style={s.select}>
                  <option value="USD">USD</option><option value="EUR">EUR</option><option value="GBP">GBP</option><option value="CAD">CAD</option><option value="BRL">BRL</option>
                </select>
              </div>
            </div>
            <div style={s.grid2}>
              <div>
                <label style={s.label}>Availability</label>
                <select value={fields.availability || "InStock"} onChange={(e) => upd("availability", e.target.value)} style={s.select}>
                  <option value="InStock">In Stock</option><option value="OutOfStock">Out of Stock</option><option value="PreOrder">Pre-Order</option>
                </select>
              </div>
              {F("Review Rating (1-5)", "rating", "4.5")}
            </div>
            {fields.rating && F("Rating Count", "ratingCount", "120")}
          </div>
        );

      case "FAQ":
        return (
          <div style={s.card}>
            <h2 style={s.cardTitle}>FAQ Pairs</h2>
            {faqPairs.map((pair, i) => (
              <div key={i} style={{ marginBottom: 16, padding: 12, background: "#FAFAF9", borderRadius: 8, border: "1px solid #E7E5E4" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#78716C" }}>Question {i + 1}</span>
                  {faqPairs.length > 1 && <button onClick={() => rmFaq(i)} style={s.btnDanger}>Remove</button>}
                </div>
                <input value={pair.q} onChange={(e) => updFaq(i, "q", e.target.value)} placeholder="What is your return policy?" style={s.input} />
                <label style={{ ...s.label, marginTop: 4 }}>Answer</label>
                <textarea value={pair.a} onChange={(e) => updFaq(i, "a", e.target.value)} placeholder="You can return any item within 30 days..." style={{ ...s.input, minHeight: 60, resize: "vertical" as const }} />
              </div>
            ))}
            <button onClick={addFaq} style={s.btnSmall}>+ Add Question</button>
          </div>
        );

      case "Organization":
        return (
          <div style={s.card}>
            <h2 style={s.cardTitle}>Organization Details</h2>
            {F("Organization Name", "name", "Acme Inc.", true)}
            <div style={s.grid2}>
              {F("Website URL", "url", "https://acme.com")}
              {F("Logo URL", "logo", "https://acme.com/logo.png")}
            </div>
            {F("Description", "description", "A leading company in...")}
            <div style={s.grid2}>
              {F("Phone", "phone", "+1-555-123-4567")}
              {F("Email", "email", "info@acme.com")}
            </div>
            <h3 style={{ ...s.cardTitle, fontSize: 14, marginTop: 8 }}>Address</h3>
            {F("Street", "street", "123 Main St")}
            <div style={s.grid2}>
              {F("City", "city", "New York")}
              {F("State", "state", "NY")}
            </div>
            <div style={s.grid2}>
              {F("ZIP Code", "zip", "10001")}
              {F("Country", "country", "US")}
            </div>
            <h3 style={{ ...s.cardTitle, fontSize: 14, marginTop: 8 }}>Social Profiles</h3>
            {socials.map((url, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <input value={url} onChange={(e) => updSocial(i, e.target.value)} placeholder="https://twitter.com/acme" style={{ ...s.input, marginBottom: 0, flex: 1 }} />
                {socials.length > 1 && <button onClick={() => rmSocial(i)} style={s.btnDanger}>Remove</button>}
              </div>
            ))}
            <button onClick={addSocial} style={s.btnSmall}>+ Add Profile</button>
          </div>
        );

      case "LocalBusiness":
        return (
          <div style={s.card}>
            <h2 style={s.cardTitle}>Local Business Details</h2>
            {F("Business Name", "name", "Joe's Pizza", true)}
            <div>
              <label style={s.label}>Business Type</label>
              <select value={fields.businessType || "LocalBusiness"} onChange={(e) => upd("businessType", e.target.value)} style={s.select}>
                <option value="LocalBusiness">Local Business (General)</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Store">Store</option>
                <option value="HealthAndBeautyBusiness">Health & Beauty</option>
                <option value="LodgingBusiness">Lodging</option>
                <option value="AutomotiveBusiness">Automotive</option>
                <option value="FinancialService">Financial Service</option>
                <option value="LegalService">Legal Service</option>
                <option value="MedicalBusiness">Medical</option>
              </select>
            </div>
            <div style={s.grid2}>
              {F("Phone", "phone", "+1-555-123-4567")}
              {F("Price Range", "priceRange", "$$")}
            </div>
            {F("Opening Hours", "openingHours", "Mo-Fr 09:00-17:00")}
            <h3 style={{ ...s.cardTitle, fontSize: 14, marginTop: 8 }}>Address</h3>
            {F("Street", "street", "456 Oak Ave")}
            <div style={s.grid2}>
              {F("City", "city", "San Francisco")}
              {F("State", "state", "CA")}
            </div>
            <div style={s.grid2}>
              {F("ZIP Code", "zip", "94102")}
              {F("Country", "country", "US")}
            </div>
            <h3 style={{ ...s.cardTitle, fontSize: 14, marginTop: 8 }}>Geo Coordinates (optional)</h3>
            <div style={s.grid2}>
              {F("Latitude", "lat", "37.7749")}
              {F("Longitude", "lng", "-122.4194")}
            </div>
          </div>
        );

      case "Person":
        return (
          <div style={s.card}>
            <h2 style={s.cardTitle}>Person Details</h2>
            {F("Full Name", "name", "Jane Doe", true)}
            {F("Website URL", "url", "https://janedoe.com")}
            <div style={s.grid2}>
              {F("Job Title", "jobTitle", "Software Engineer")}
              {F("Works For", "worksFor", "Acme Inc.")}
            </div>
            {F("Photo URL", "image", "https://janedoe.com/photo.jpg")}
          </div>
        );

      case "HowTo":
        return (
          <div style={s.card}>
            <h2 style={s.cardTitle}>HowTo Details</h2>
            {F("Title", "name", "How to change a tire", true)}
            {F("Description", "description", "Step-by-step guide to changing a flat tire")}
            <div style={s.grid2}>
              {F("Total Time (ISO 8601)", "totalTime", "PT30M")}
              {F("Estimated Cost (USD)", "estimatedCost", "15")}
            </div>
            <h3 style={{ ...s.cardTitle, fontSize: 14, marginTop: 8 }}>Steps</h3>
            {howtoSteps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "#78716C", minWidth: 20 }}>{i + 1}.</span>
                <input value={step} onChange={(e) => updStep(i, e.target.value)} placeholder={`Step ${i + 1}`} style={{ ...s.input, marginBottom: 0, flex: 1 }} />
                {howtoSteps.length > 1 && <button onClick={() => rmStep(i)} style={s.btnDanger}>Remove</button>}
              </div>
            ))}
            <button onClick={addStep} style={s.btnSmall}>+ Add Step</button>
          </div>
        );

      case "Event":
        return (
          <div style={s.card}>
            <h2 style={s.cardTitle}>Event Details</h2>
            {F("Event Name", "name", "Annual Tech Conference", true)}
            <div style={s.grid2}>
              {F("Start Date", "startDate", "", true, "datetime-local")}
              {F("End Date", "endDate", "", false, "datetime-local")}
            </div>
            {F("Location", "location", "Convention Center, NYC")}
            {F("Description", "description", "The biggest tech event of the year")}
            {F("Image URL", "image", "https://example.com/event.jpg")}
            {F("Organizer", "organizer", "Tech Corp")}
            <h3 style={{ ...s.cardTitle, fontSize: 14, marginTop: 8 }}>Ticket / Offer (optional)</h3>
            <div style={s.grid2}>
              {F("Price", "offerPrice", "99")}
              <div>
                <label style={s.label}>Currency</label>
                <select value={fields.offerCurrency || "USD"} onChange={(e) => upd("offerCurrency", e.target.value)} style={s.select}>
                  <option value="USD">USD</option><option value="EUR">EUR</option><option value="GBP">GBP</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "Recipe":
        return (
          <div style={s.card}>
            <h2 style={s.cardTitle}>Recipe Details</h2>
            {F("Recipe Name", "name", "Chocolate Chip Cookies", true)}
            {F("Description", "description", "Classic homemade cookies")}
            {F("Image URL", "image", "https://example.com/cookies.jpg")}
            {F("Author", "author", "Chef Julia")}
            <div style={{ ...s.grid2, gridTemplateColumns: "1fr 1fr 1fr" }}>
              {F("Prep Time (ISO)", "prepTime", "PT15M")}
              {F("Cook Time (ISO)", "cookTime", "PT25M")}
              {F("Yield", "recipeYield", "24 cookies")}
            </div>
            <h3 style={{ ...s.cardTitle, fontSize: 14, marginTop: 8 }}>Ingredients</h3>
            {ingredients.map((ing, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <input value={ing} onChange={(e) => updIngredient(i, e.target.value)} placeholder={`Ingredient ${i + 1}`} style={{ ...s.input, marginBottom: 0, flex: 1 }} />
                {ingredients.length > 1 && <button onClick={() => rmIngredient(i)} style={s.btnDanger}>Remove</button>}
              </div>
            ))}
            <button onClick={addIngredient} style={s.btnSmall}>+ Add Ingredient</button>
            <h3 style={{ ...s.cardTitle, fontSize: 14, marginTop: 16 }}>Steps</h3>
            {recipeSteps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "#78716C", minWidth: 20 }}>{i + 1}.</span>
                <input value={step} onChange={(e) => updRecipeStep(i, e.target.value)} placeholder={`Step ${i + 1}`} style={{ ...s.input, marginBottom: 0, flex: 1 }} />
                {recipeSteps.length > 1 && <button onClick={() => rmRecipeStep(i)} style={s.btnDanger}>Remove</button>}
              </div>
            ))}
            <button onClick={addRecipeStep} style={s.btnSmall}>+ Add Step</button>
          </div>
        );

      case "BreadcrumbList":
        return (
          <div style={s.card}>
            <h2 style={s.cardTitle}>Breadcrumb Items</h2>
            {breadcrumbItems.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "#78716C", minWidth: 20 }}>{i + 1}.</span>
                <input value={item.name} onChange={(e) => updBreadcrumb(i, "name", e.target.value)} placeholder="Page Name" style={{ ...s.input, marginBottom: 0, flex: 1 }} />
                <input value={item.url} onChange={(e) => updBreadcrumb(i, "url", e.target.value)} placeholder="https://example.com/page" style={{ ...s.input, marginBottom: 0, flex: 1 }} />
                {breadcrumbItems.length > 1 && <button onClick={() => rmBreadcrumb(i)} style={s.btnDanger}>Remove</button>}
              </div>
            ))}
            <button onClick={addBreadcrumb} style={s.btnSmall}>+ Add Item</button>
          </div>
        );
    }
  };

  return (
    <div style={s.page}>
      <ToolSchema
        name="JSON-LD Schema Generator"
        description="Generate JSON-LD structured data markup for your website. Support for Article, Product, FAQ, HowTo, Organization, LocalBusiness, and more. Free, no signup."
        slug="json-ld-generator"
        category="DeveloperApplication"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://toolcraftkit.com" },
        { name: "Dev Tools", url: "https://toolcraftkit.com/#dev-tools" },
        { name: "JSON-LD Schema Generator", url: "https://toolcraftkit.com/tools/json-ld-generator" },
      ]} />

      <h1 style={s.h1}>JSON-LD Schema Generator</h1>
      <p style={s.sub}>Generate structured data markup for Google rich results. 10 schema types supported. Free, no signup.</p>

      {/* ─── Schema Type Selector ─── */}
      <div style={s.card}>
        <h2 style={s.cardTitle}>Select Schema Type</h2>
        <div style={s.tabs}>
          {SCHEMA_TYPES.map((t) => (
            <button key={t} onClick={() => setSchemaType(t)} style={s.tab(schemaType === t)}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Dynamic Form ─── */}
      {renderForm()}

      {/* ─── Error ─── */}
      {error && (
        <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: "#DC2626" }}>
          {error}
        </div>
      )}

      {/* ─── Generate Button ─── */}
      <button onClick={handleGenerate} style={s.btn}>
        Generate JSON-LD
      </button>

      {/* ─── Output ─── */}
      {output && (
        <div style={{ ...s.output, marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", margin: 0 }}>Your JSON-LD Markup</h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={handleCopy} style={s.btnSecondary}>
                {copied ? "Copied!" : "Copy with <script> Tag"}
              </button>
              <button onClick={handleDownload} style={s.btnSecondary}>
                Download .json
              </button>
              <a
                href={`https://search.google.com/test/rich-results`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...s.btnSecondary, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                Test with Google ↗
              </a>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 11, color: "#78716C", marginBottom: 6 }}>
              Paste this inside your page&apos;s <code>&lt;head&gt;</code> or before <code>&lt;/body&gt;</code>:
            </div>
            <pre style={s.pre} dangerouslySetInnerHTML={{
              __html: `<span style="color:#78716C">&lt;script type="application/ld+json"&gt;</span>\n${highlightJson(output)}\n<span style="color:#78716C">&lt;/script&gt;</span>`
            }} />
          </div>

          <p style={{ fontSize: 12, color: "#78716C", marginTop: 10, marginBottom: 0, lineHeight: 1.6 }}>
            Tip: Use Google&apos;s Rich Results Test to validate your markup before deploying. JSON-LD is the recommended format by Google for structured data.
          </p>
        </div>
      )}

      {/* ─── SEO Content ─── */}
      <SeoContent />
    </div>
  );
}
