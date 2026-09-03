import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Tips, Guides & How-Tos",
  description: "Practical guides and tips for students, freelancers, and entrepreneurs. Learn how to use free online tools to work smarter.",
};

const posts = [
  { title: "How to Calculate Compound Interest (Formula + Examples)", slug: "compound-interest", desc: "Learn the compound interest formula, see real examples, and use our free calculator to see how your money grows over time.", date: "September 3, 2026" },
  { title: "How to Calculate Profit Margin (With Formula and Examples)", slug: "profit-margin-guide", desc: "Understand gross, net, and operating profit margin. Includes formulas, industry benchmarks, and a free calculator.", date: "September 3, 2026" },
  { title: "How to Calculate Mortgage Payments (2026 Guide + Calculator)", slug: "mortgage-payments-explained", desc: "Understand how mortgage payments work, what affects your monthly cost, and how extra payments save you thousands.", date: "September 3, 2026" },
  { title: "How to Create a Strong Password in 2026 (Best Practices)", slug: "strong-password-guide", desc: "How long it takes hackers to crack weak passwords, and best practices for creating secure passwords you can remember.", date: "September 3, 2026" },
  { title: "Annual Salary to Hourly Rate: How to Calculate Your Real Pay", slug: "salary-breakdown-guide", desc: "Convert your annual salary to hourly, weekly, and monthly rates. Understand take-home pay after taxes.", date: "September 3, 2026" },
  { title: "How Federal Income Tax Works: Brackets, Rates, and How to Pay Less", slug: "income-tax-guide", desc: "How US tax brackets actually work, marginal vs. effective rates, and practical strategies to legally reduce your taxes.", date: "September 3, 2026" },
  { title: "How to Create a Professional Invoice (Free Template + Tips)", slug: "create-professional-invoice", desc: "What every invoice must include, common mistakes that delay payment, and how to create invoices instantly.", date: "September 3, 2026" },
  { title: "How to Calculate Percentages: Every Formula You Need", slug: "percentage-calculations", desc: "Master percentage calculations — discounts, tips, tax, markup, percentage change. Simple formulas with real examples.", date: "September 3, 2026" },
  { title: "How to Format and Validate JSON (Quick Guide + Free Tool)", slug: "json-formatting-guide", desc: "Learn JSON syntax, fix common errors, and format or minify JSON data instantly with a free online tool.", date: "September 3, 2026" },
  { title: "HEX, RGB, HSL Explained: Color Codes for Designers and Developers", slug: "color-codes-guide", desc: "Understand the difference between HEX, RGB, and HSL. When to use each format and how to convert between them.", date: "September 3, 2026" },
  { title: "Markdown to HTML: A Quick Guide to Converting Your Content", slug: "markdown-to-html-guide", desc: "Learn Markdown syntax, why it's used for writing content, and how to convert Markdown to clean HTML instantly.", date: "September 3, 2026" },
  { title: "How Many Pages Is 1,000 Words? (With Calculator)", slug: "how-many-pages-is-1000-words", desc: "The definitive answer to the most common essay question — with a free calculator to check any word count.", date: "August 22, 2026" },
  { title: "How to Create a QR Code for Your WiFi Network (Free)", slug: "how-to-create-qr-code-for-wifi", desc: "Let guests connect to your WiFi by scanning a QR code. Step-by-step guide — no app needed.", date: "August 22, 2026" },
  { title: "How to Calculate Monthly Loan Payments (Formula + Calculator)", slug: "how-to-calculate-loan-payments", desc: "Understand the math behind loan payments and use our free calculator to plan your mortgage, car loan, or personal loan.", date: "August 22, 2026" },
  { title: "What Is a Good ROI? Benchmarks by Industry (2026)", slug: "what-is-a-good-roi", desc: "How to know if your investment is performing well. Industry benchmarks, formulas, and a free ROI calculator.", date: "August 22, 2026" },
  { title: "How to Remove Duplicate Lines from a List (3 Methods)", slug: "how-to-remove-duplicate-lines-in-excel", desc: "Clean up email lists, keyword lists, and data exports instantly. Three methods: online tool, Excel, and command line.", date: "August 22, 2026" },
];

export default function Page() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 }}>Blog</h1>
        <p style={{ fontSize: 14, color: "#78716C", marginBottom: 32 }}>Practical guides and tips to help you work smarter with free online tools.</p>

        <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{
              display: "block", padding: "20px 22px", background: "#fff",
              border: "1px solid #E7E5E4", borderRadius: 10, textDecoration: "none",
              transition: "border-color 0.2s",
            }}>
              <span style={{ fontSize: 12, color: "#A8A29E" }}>{post.date}</span>
              <h2 style={{ fontSize: 17, fontWeight: 600, color: "#1C1917", marginTop: 4, marginBottom: 6, lineHeight: 1.3 }}>{post.title}</h2>
              <p style={{ fontSize: 13, color: "#78716C", lineHeight: 1.5, margin: 0 }}>{post.desc}</p>
            </Link>
          ))}
        </div>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
