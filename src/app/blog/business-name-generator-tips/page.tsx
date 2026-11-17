import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Name Generator: How to Choose a Great Business Name",
  description: "Learn how to choose the perfect business name. Tips on branding, domain availability, trademark checks, and using a business name generator effectively.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>Business Name Generator: How to Choose a Great Business Name</h1>
        <p style={s.meta}>November 2026 · 6 min read</p>

        <p style={s.p}>Your business name is the first thing customers see, the foundation of your brand identity, and something you&apos;ll live with for years. Choosing the right one matters more than most founders realize. A strong name is memorable, easy to spell, and communicates something about what you do or how you do it. Here&apos;s a practical framework for finding yours.</p>

        <h2 style={s.h2}>What Makes a Great Business Name</h2>
        <p style={s.p}>The best business names share several qualities. They are short — ideally two to three syllables. They are easy to pronounce and spell, which matters for word-of-mouth referrals and search engines. They are distinctive enough to stand out in your industry without being so abstract that nobody understands what you do. They work visually as a logo and sound good when spoken aloud. And critically, they have an available domain name and no trademark conflicts in your category.</p>

        <h2 style={s.h2}>Types of Business Names</h2>
        <p style={s.p}>Descriptive names tell customers what you do — like General Electric or PayPal. They&apos;re easy to understand but harder to trademark. Invented names like Google or Kodak are highly distinctive and easy to protect legally, but require more marketing effort to build recognition. Metaphorical names like Amazon or Apple borrow meaning from another context. Compound names combine two words, like Facebook or YouTube. Each approach has tradeoffs; the right choice depends on your budget, industry, and long-term vision.</p>

        <h2 style={s.h2}>Checking Domain and Trademark Availability</h2>
        <p style={s.p}>Before falling in love with a name, verify that the .com domain is available — or at minimum a credible alternative like .co or a country-specific extension. Search the USPTO trademark database (or your country&apos;s equivalent) to ensure nobody has registered the name in your business category. Also check social media handles across the platforms you plan to use. A name that&apos;s unavailable as a domain or already trademarked by a competitor will cost you far more to work around than to avoid from the start.</p>

        <h2 style={s.h2}>Using a Business Name Generator</h2>
        <p style={s.p}>Name generators are excellent brainstorming tools. They combine keywords, industry terms, and linguistic patterns to produce hundreds of options you might never think of on your own. The trick is to use them as a starting point, not a final answer. Enter your core keywords — what you sell, your industry, your values — and browse the results for inspiration. You might find the perfect name outright, or a suggestion might spark an idea that leads you to the right one with a small tweak.</p>

        <h2 style={s.h2}>Generate Names Now</h2>
        <p style={s.p}>Our free <Link href="/tools/business-name-generator" style={{ color: "#0D9488" }}>Business Name Generator</Link> creates unique, brandable names based on your keywords and industry. Get dozens of suggestions instantly and find the perfect name for your next venture.</p>
        <Link href="/tools/business-name-generator" style={s.cta}>Open Business Name Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Once you&apos;ve picked your name, create a <Link href="/tools/qr-code-generator" style={{ color: "#0D9488" }}>QR Code</Link> for your new business cards, or use our <Link href="/tools/invoice-generator" style={{ color: "#0D9488" }}>Invoice Generator</Link> to start billing under your new brand.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
