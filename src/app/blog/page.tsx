import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Tips, Guides & How-Tos",
  description: "Practical guides and tips for students, freelancers, and entrepreneurs. Learn how to use free online tools to work smarter.",
};

const posts = [
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
