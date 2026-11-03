"use client";

const sc = {
  wrap: { maxWidth: 760, margin: "40px auto 0", padding: "0 0 48px" } as const,
  h2: { fontSize: 22, fontWeight: 700 as const, color: "#1C1917", marginBottom: 12, marginTop: 32 },
  h3: { fontSize: 17, fontWeight: 600 as const, color: "#1C1917", marginBottom: 8, marginTop: 24 },
  p: { fontSize: 15, color: "#44403C", lineHeight: 1.75, marginBottom: 14, marginTop: 0 },
  ul: { fontSize: 15, color: "#44403C", lineHeight: 1.75, paddingLeft: 24, marginBottom: 14 },
};

export default function SeoContent() {
  return (
    <div style={sc.wrap}>
      <h2 style={sc.h2}>What Is JSON-LD Structured Data?</h2>
      <p style={sc.p}>
        JSON-LD (JavaScript Object Notation for Linked Data) is a method of encoding structured data using JSON. It is the format recommended by Google, Microsoft, and other search engines for providing structured data on web pages. Structured data helps search engines understand the content on your page and can enable rich results — enhanced search listings with images, ratings, prices, FAQs, and more.
      </p>

      <h2 style={sc.h2}>Why Does Structured Data Matter for SEO?</h2>
      <p style={sc.p}>
        Adding JSON-LD structured data to your website can significantly improve your visibility in search results. Pages with structured data are eligible for rich results (also called rich snippets), which stand out in search results and typically receive higher click-through rates. According to Google, structured data helps their algorithms better understand your content and present it in useful ways to users.
      </p>

      <h3 style={sc.h3}>Benefits of Using JSON-LD</h3>
      <ul style={sc.ul}>
        <li>Qualify for Google rich results: FAQ dropdowns, product cards, recipe carousels, event listings, and more</li>
        <li>Improved click-through rates from search results pages</li>
        <li>Better understanding of your content by search engines</li>
        <li>Easy implementation: JSON-LD goes in a script tag and doesn&apos;t affect your visible HTML</li>
        <li>Recommended by Google over Microdata and RDFa alternatives</li>
      </ul>

      <h2 style={sc.h2}>Supported Schema Types</h2>
      <p style={sc.p}>
        This generator supports the most commonly used schema.org types for SEO:
      </p>

      <h3 style={sc.h3}>Article</h3>
      <p style={sc.p}>
        Used for blog posts, news articles, and editorial content. Helps Google display your articles with headline, author, date, and thumbnail in search results and Google News.
      </p>

      <h3 style={sc.h3}>Product</h3>
      <p style={sc.p}>
        Enables product rich results with price, availability, ratings, and reviews directly in search listings. Essential for e-commerce websites.
      </p>

      <h3 style={sc.h3}>FAQ</h3>
      <p style={sc.p}>
        Displays frequently asked questions directly in search results as expandable dropdowns. One of the most impactful schema types for increasing SERP real estate and click-through rates.
      </p>

      <h3 style={sc.h3}>Organization &amp; LocalBusiness</h3>
      <p style={sc.p}>
        Provides search engines with key information about your company or local business, including address, phone, logo, opening hours, and social profiles. Essential for appearing in Google&apos;s Knowledge Panel and local search results.
      </p>

      <h3 style={sc.h3}>HowTo &amp; Recipe</h3>
      <p style={sc.p}>
        Enables step-by-step rich results for tutorials and recipes, including estimated time, cost, and visual guides. Recipes can appear in Google&apos;s recipe carousel with images, ratings, and cook times.
      </p>

      <h3 style={sc.h3}>Event</h3>
      <p style={sc.p}>
        Displays event details including dates, location, and ticket information directly in search results. Helps your events appear in Google&apos;s event experience.
      </p>

      <h2 style={sc.h2}>How to Add JSON-LD to Your Website</h2>
      <p style={sc.p}>
        Adding JSON-LD to your website is straightforward. Simply copy the generated script tag and paste it into your HTML page, either inside the &lt;head&gt; section or before the closing &lt;/body&gt; tag. JSON-LD is non-intrusive — it doesn&apos;t change your visible content or layout, making it the cleanest way to add structured data to any web page.
      </p>

      <h2 style={sc.h2}>Validate Your Structured Data</h2>
      <p style={sc.p}>
        After adding JSON-LD markup to your site, always validate it using Google&apos;s Rich Results Test or the Schema Markup Validator. These tools check for errors, warnings, and confirm which rich result types your page qualifies for. Regular validation ensures your structured data stays effective as Google updates its requirements.
      </p>
    </div>
  );
}
