import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — ToolCraftKit",
  description: "Tips, guides, and tutorials on productivity, web tools, SEO, image optimization, PDF management, and more.",
};

const posts = [
  // ===== NEW BATCH — September 5, 2026 (20 articles) =====
  { slug: "how-to-merge-pdf-files-online", title: "How to Merge PDF Files Online for Free (No Software Needed)", date: "September 5, 2026", read: "5 min read" },
  { slug: "how-to-convert-images-to-pdf", title: "How to Convert Images to PDF in Seconds — Free Online Tool", date: "September 5, 2026", read: "4 min read" },
  { slug: "how-to-convert-text-to-pdf", title: "How to Convert Text to PDF Online — Simple & Free", date: "September 5, 2026", read: "4 min read" },
  { slug: "reduce-pdf-file-size", title: "5 Ways to Reduce PDF File Size Without Losing Quality", date: "September 5, 2026", read: "5 min read" },
  { slug: "combine-photos-into-one-pdf", title: "How to Combine Multiple Photos into One PDF (Step-by-Step)", date: "September 5, 2026", read: "4 min read" },
  { slug: "compress-images-for-website", title: "How to Compress Images for Website Speed Without Losing Quality", date: "September 5, 2026", read: "6 min read" },
  { slug: "resize-images-for-social-media", title: "How to Resize Images for Social Media (Exact Dimensions Guide 2026)", date: "September 5, 2026", read: "5 min read" },
  { slug: "png-vs-jpeg-vs-webp", title: "PNG vs JPEG vs WebP: Which Image Format Should You Use?", date: "September 5, 2026", read: "5 min read" },
  { slug: "optimize-images-for-seo", title: "How to Optimize Images for SEO (Complete Beginner Guide)", date: "September 5, 2026", read: "6 min read" },
  { slug: "create-qr-code-for-business", title: "How to Create a QR Code for Your Business (Free & Custom)", date: "September 5, 2026", read: "5 min read" },
  { slug: "free-invoice-template-guide", title: "Free Invoice Templates for Freelancers (Download & Customize)", date: "September 5, 2026", read: "5 min read" },
  { slug: "free-online-tools-for-freelancers", title: "Best Free Online Tools for Freelancers & Small Businesses in 2026", date: "September 5, 2026", read: "6 min read" },
  { slug: "generate-strong-passwords", title: "How to Generate Strong Passwords You Can Actually Remember", date: "September 5, 2026", read: "5 min read" },
  { slug: "remove-duplicate-lines-from-data", title: "How to Remove Duplicate Lines from Text or Data (Instant Cleaner)", date: "September 5, 2026", read: "4 min read" },
  { slug: "case-converter-guide", title: "Case Converter: How to Change Text to Uppercase, Lowercase or Title Case", date: "September 5, 2026", read: "4 min read" },
  { slug: "word-counter-character-counter-seo", title: "Free Word Counter & Character Counter — Why Word Count Matters for SEO", date: "September 5, 2026", read: "5 min read" },
  { slug: "regex-for-beginners", title: "Regex for Beginners: How to Test Regular Expressions Online", date: "September 5, 2026", read: "6 min read" },
  { slug: "base64-encoding-explained", title: "Base64 Encoding Explained: How to Encode and Decode Data Online", date: "September 5, 2026", read: "5 min read" },
  { slug: "lorem-ipsum-generator-guide", title: "Lorem Ipsum Generator: What It Is and When to Use Placeholder Text", date: "September 5, 2026", read: "4 min read" },
  { slug: "free-unit-converters-online", title: "Best Free Unit Converters Online: Length, Weight, Temperature & More", date: "September 5, 2026", read: "4 min read" },

  // ===== PREVIOUS BATCH — September 3, 2026 (11 articles) =====
  { slug: "how-compound-interest-works", title: "How Compound Interest Works (And Why It Matters for Your Savings)", date: "September 3, 2026", read: "5 min read" },
  { slug: "how-to-calculate-profit-margin", title: "How to Calculate Profit Margin (With Real Examples)", date: "September 3, 2026", read: "5 min read" },
  { slug: "how-to-calculate-mortgage-payments", title: "How to Calculate Mortgage Payments (Complete Guide)", date: "September 3, 2026", read: "5 min read" },
  { slug: "how-to-create-strong-password", title: "How to Create a Strong Password That Hackers Can't Crack", date: "September 3, 2026", read: "5 min read" },
  { slug: "how-to-convert-salary-to-hourly", title: "How to Convert Your Annual Salary to an Hourly Rate", date: "September 3, 2026", read: "4 min read" },
  { slug: "how-to-calculate-income-tax", title: "How to Calculate Income Tax (Simple Breakdown for 2026)", date: "September 3, 2026", read: "5 min read" },
  { slug: "how-to-create-professional-invoice", title: "How to Create a Professional Invoice (Free Template + Tips)", date: "September 3, 2026", read: "5 min read" },
  { slug: "how-to-calculate-percentages", title: "How to Calculate Percentages (3 Methods That Always Work)", date: "September 3, 2026", read: "4 min read" },
  { slug: "how-to-format-json", title: "How to Format JSON (And Why It Matters for Developers)", date: "September 3, 2026", read: "4 min read" },
  { slug: "understanding-color-codes", title: "Understanding Color Codes: HEX, RGB, and HSL Explained", date: "September 3, 2026", read: "5 min read" },
  { slug: "markdown-to-html-guide", title: "Markdown to HTML: A Complete Conversion Guide", date: "September 3, 2026", read: "5 min read" },

  // ===== ORIGINAL BATCH (5 articles) =====
  { slug: "how-many-pages-is-1000-words", title: "How Many Pages Is 1,000 Words?", date: "August 20, 2026", read: "3 min read" },
  { slug: "create-wifi-qr-code", title: "How to Create a WiFi QR Code for Your Home or Business", date: "August 20, 2026", read: "3 min read" },
  { slug: "how-to-calculate-loan-payments", title: "How to Calculate Monthly Loan Payments", date: "August 20, 2026", read: "4 min read" },
  { slug: "what-is-good-roi", title: "What Is a Good ROI? Benchmarks by Industry", date: "August 20, 2026", read: "4 min read" },
  { slug: "remove-duplicate-lines-guide", title: "How to Remove Duplicate Lines from Any Text", date: "August 20, 2026", read: "3 min read" },
];

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 24 } as const,
    card: { display: "block", textDecoration: "none", padding: "20px 0", borderBottom: "1px solid #F5F5F4" } as const,
    title: { fontSize: 17, fontWeight: 600, color: "#1C1917", marginBottom: 4 } as const,
    meta: { fontSize: 13, color: "#A8A29E" } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <h1 style={s.h1}>Blog</h1>
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} style={s.card}>
            <p style={s.title}>{p.title}</p>
            <p style={s.meta}>{p.date} · {p.read}</p>
          </Link>
        ))}
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
